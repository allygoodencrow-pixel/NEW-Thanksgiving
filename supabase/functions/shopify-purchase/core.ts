export type Purchase = {shop: string; order: string; email: string; products: string[]};
export type Lease = Purchase & {token: string};
export type PurchaseConfig = {secret: string; shop: string; products: ReadonlySet<string>; appUrl: string; allowTestOrders?: boolean; timeoutMs?: number};
export type PurchaseDependencies = {
  enqueue(purchase: Purchase): Promise<'complete' | 'pending'>;
  claim(purchase: Purchase): Promise<Lease | null>;
  invite(email: string, redirect: string): Promise<string>;
  existingAccount(email: string, redirect: string): Promise<string>;
  complete(lease: Lease, user: string): Promise<void>;
  fail(lease: Lease, code: string): Promise<void>;
};

const json = (status: number, result: string) => new Response(JSON.stringify({result}), {
  status, headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...(status === 503 ? {'Retry-After': '5'} : {})},
});
const id = (value: unknown) => typeof value === 'string' && /^[1-9]\d{0,19}$/.test(value) ? value
  : typeof value === 'number' && Number.isSafeInteger(value) && value > 0 ? String(value) : null;

async function readBody(request: Request): Promise<Uint8Array> {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = []; let length = 0;
  try {
    while (true) {
      const {done, value} = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > 1024 * 1024) {await reader.cancel(); throw new Error('body_too_large');}
      chunks.push(value);
    }
  } finally {reader.releaseLock();}
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) {bytes.set(chunk, offset); offset += chunk.length;}
  return bytes;
}

export async function verifySignature(bytes: Uint8Array, signature: string | null, secret: string): Promise<boolean> {
  if (!secret || !signature || !/^[A-Za-z0-9+/]{43}=$/.test(signature)) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['verify']);
  // Web Crypto verifies the raw-byte HMAC without a timing-sensitive string comparison.
  const decoded = Uint8Array.from(atob(signature), character => character.charCodeAt(0));
  return crypto.subtle.verify('HMAC', key, decoded, Uint8Array.from(bytes));
}

export function selectPurchase(body: unknown, config: PurchaseConfig): Purchase | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid_order');
  const order = body as Record<string, unknown>;
  if (order.financial_status !== 'paid' || order.cancelled_at || (order.test && !config.allowTestOrders)) return null;
  if (!Array.isArray(order.line_items)) throw new Error('invalid_order');
  const products = [...new Set(order.line_items.flatMap(item => {
    if (!item || typeof item !== 'object') return [];
    const product = id(item.product_id);
    return product && config.products.has(product) && Number.isSafeInteger(item.quantity) && item.quantity > 0 ? [product] : [];
  }))];
  if (!products.length) return null;
  const orderId = id(order.id);
  const rawEmail = order.email || order.contact_email;
  const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
  if (!orderId || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('missing_purchase_identity');
  return {shop: config.shop, order: orderId, email, products};
}

async function fulfil(purchase: Purchase, config: PurchaseConfig, dependencies: PurchaseDependencies): Promise<boolean> {
  if (await dependencies.enqueue(purchase) === 'complete') return true;
  const lease = await dependencies.claim(purchase);
  if (!lease) return false;
  try {
    let user: string;
    try {
      const setup = new URL(config.appUrl); setup.searchParams.set('setup', '1');
      user = await dependencies.invite(lease.email, setup.href);
    } catch (failure) {
      const code = failure && typeof failure === 'object' && 'code' in failure ? failure.code : null;
      // SMTP failures must remain retryable, never be mistaken for an existing buyer.
      if (code !== 'email_exists' && code !== 'user_already_exists') throw failure;
      user = await dependencies.existingAccount(lease.email, config.appUrl);
    }
    await dependencies.complete(lease, user);
    return true;
  } catch {
    // Never persist provider errors, email content, passwords, or access links in logs.
    try {await dependencies.fail(lease, 'account_email_failed');} catch { /* Lease expiry makes a later retry possible. */ }
    return false;
  }
}

export function createPurchaseHandler(config: PurchaseConfig, dependencies: PurchaseDependencies,
  waitUntil: (task: Promise<unknown>) => void = () => {}) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') return json(405, 'method_not_allowed');
    if (!config.secret || !config.shop || !config.products.size) return json(503, 'purchase_setup_incomplete');
    if (request.headers.get('x-shopify-topic') !== 'orders/paid' || request.headers.get('x-shopify-shop-domain')?.toLowerCase() !== config.shop) return json(401, 'invalid_source');
    let bytes: Uint8Array;
    try {bytes = await readBody(request);} catch {return json(413, 'body_too_large');}
    if (!await verifySignature(bytes, request.headers.get('x-shopify-hmac-sha256'), config.secret)) return json(401, 'invalid_signature');
    let purchase: Purchase | null;
    try {purchase = selectPurchase(JSON.parse(new TextDecoder().decode(bytes)), config);} catch {return json(400, 'invalid_order');}
    if (!purchase) return json(200, 'not_app_purchase');
    // 200 means delivery completed, not merely queued. A timeout/failure asks Shopify
    // to retry. Work may finish in the background; the durable lease prevents overlap.
    const work = fulfil(purchase, config, dependencies).catch(() => false);
    waitUntil(work);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const result = await Promise.race([work, new Promise<boolean>(resolve => {timer = setTimeout(() => resolve(false), config.timeoutMs ?? 4000);})]);
    clearTimeout(timer);
    return result ? json(200, 'account_email_sent') : json(503, 'purchase_delivery_pending');
  };
}
