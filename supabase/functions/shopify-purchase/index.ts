import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
import {createPurchaseHandler, type Lease, type Purchase} from './core.ts';

declare const EdgeRuntime: {waitUntil(task: Promise<unknown>): void};

const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: {autoRefreshToken: false, persistSession: false, detectSessionInUrl: false},
});
const appUrl = 'https://thanksgiving.thecrowandcrown.com/';
const handler = createPurchaseHandler({
  secret: Deno.env.get('SHOPIFY_WEBHOOK_SECRET') ?? '',
  shop: (Deno.env.get('SHOPIFY_STORE_DOMAIN') ?? '').trim().toLowerCase(),
  products: new Set((Deno.env.get('THANKSGIVING_PRODUCT_IDS') ?? '').split(',').map(value => value.trim()).filter(value => /^[1-9]\d{0,19}$/.test(value))),
  appUrl,
  allowTestOrders: Deno.env.get('ALLOW_TEST_ORDERS') === 'true',
}, {
  async enqueue(purchase: Purchase) {
    const {error} = await client.from('cc_purchase_fulfillments').upsert({shop_domain: purchase.shop, order_id: purchase.order, email: purchase.email, product_ids: purchase.products}, {onConflict: 'shop_domain,order_id', ignoreDuplicates: true});
    if (error) throw error;
    const result = await client.from('cc_purchase_fulfillments').select('status').eq('shop_domain', purchase.shop).eq('order_id', purchase.order).single();
    if (result.error) throw result.error;
    return result.data.status === 'complete' ? 'complete' : 'pending';
  },
  async claim(purchase: Purchase): Promise<Lease | null> {
    const token = crypto.randomUUID();
    const {data, error} = await client.rpc('cc_claim_purchase', {p_shop: purchase.shop, p_order: purchase.order, p_token: token});
    if (error) throw error;
    const row = data?.[0];
    return row ? {shop: row.shop_domain, order: row.order_id, email: row.email, products: row.product_ids, token} : null;
  },
  async invite(email, redirect) {
    const {data, error} = await client.auth.admin.inviteUserByEmail(email, {redirectTo: redirect});
    if (error) throw error;
    if (!data.user) throw new Error('invite_user_missing');
    return data.user.id;
  },
  async existingAccount(email, redirect) {
    // Generate-only resolves the existing user's ID server-side; its unused action
    // link is never persisted or returned. OTP sends through the configured SMTP.
    const {data, error} = await client.auth.admin.generateLink({type: 'magiclink', email, options: {redirectTo: redirect}});
    if (error) throw error;
    if (!data.user) throw new Error('existing_user_missing');
    const sent = await client.auth.signInWithOtp({email, options: {shouldCreateUser: false, emailRedirectTo: redirect}});
    if (sent.error) throw sent.error;
    return data.user.id;
  },
  async complete(lease, user) {
    const {data, error} = await client.from('cc_purchase_fulfillments').update({status: 'complete', user_id: user, email_sent_at: new Date().toISOString(), lease_token: null, lease_until: null, last_error_code: null})
      .eq('shop_domain', lease.shop).eq('order_id', lease.order).eq('lease_token', lease.token).select('order_id').single();
    if (error || !data) throw error ?? new Error('purchase_lease_lost');
  },
  async fail(lease, code) {
    const {error} = await client.from('cc_purchase_fulfillments').update({status: 'failed', last_error_code: code, lease_token: null, lease_until: null})
      .eq('shop_domain', lease.shop).eq('order_id', lease.order).eq('lease_token', lease.token);
    if (error) throw error;
  },
}, task => EdgeRuntime.waitUntil(task));

Deno.serve(handler);
