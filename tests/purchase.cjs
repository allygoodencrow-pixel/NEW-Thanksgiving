const assert = require('node:assert/strict');
const {createHmac, randomUUID, webcrypto} = require('node:crypto');
global.crypto = webcrypto;
const {createPurchaseHandler, selectPurchase} = require('../.qa/purchase.cjs');
const config = {secret: 'test-webhook-secret', shop: 'test-store.myshopify.com', products: new Set(['100']), appUrl: 'https://thanksgiving.thecrowandcrown.com/'};
const order = {id: 200, email: 'Buyer@Example.test', financial_status: 'paid', test: false, cancelled_at: null, line_items: [{product_id: 100, quantity: 1}]};
const request = (body = order, overrides = {}, signatureBody) => {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request('https://example.test/shopify-purchase', {method: 'POST', body: raw, headers: {
    'x-shopify-topic': 'orders/paid', 'x-shopify-shop-domain': config.shop,
    'x-shopify-hmac-sha256': createHmac('sha256', config.secret).update(signatureBody ?? raw).digest('base64'), ...overrides,
  }});
};
const memory = () => {
  const jobs = new Map(); const emails = []; let inviteError = null; let delay = null;
  const dependencies = {
    async enqueue(p) {const key = p.shop + ':' + p.order; if (!jobs.has(key)) jobs.set(key, {...p, status: 'pending'}); return jobs.get(key).status === 'complete' ? 'complete' : 'pending';},
    async claim(p) {const job = jobs.get(p.shop + ':' + p.order); if (job.status === 'processing' || job.status === 'complete') return null; job.status = 'processing'; job.token = randomUUID(); return {...job};},
    async invite(email, redirect) {if (delay) await delay; if (inviteError) throw inviteError; emails.push({type: 'invite', email, redirect}); return 'new-user';},
    async existingAccount(email, redirect) {emails.push({type: 'existing', email, redirect}); return 'existing-user';},
    async complete(lease, user) {const job = jobs.get(lease.shop + ':' + lease.order); assert.equal(job.token, lease.token); Object.assign(job, {status: 'complete', user});},
    async fail(lease, code) {Object.assign(jobs.get(lease.shop + ':' + lease.order), {status: 'failed', error: code});},
  };
  return {jobs, emails, dependencies, setError(value) {inviteError = value;}, setDelay(value) {delay = value;}};
};

(async () => {
  const m = memory(); const handler = createPurchaseHandler(config, m.dependencies);
  for (const headers of [{'x-shopify-hmac-sha256': ''}, {'x-shopify-hmac-sha256': 'invalid'}, {'x-shopify-shop-domain': 'another.myshopify.com'}, {'x-shopify-topic': 'orders/create'}]) {
    assert.equal((await handler(request(order, headers))).status, 401);
  }
  assert.equal((await handler(request({...order, email: 'attacker@example.test'}, {}, JSON.stringify(order)))).status, 401);
  assert.equal(m.jobs.size, 0);
  assert.equal((await handler(new Request('https://example.test/'))).status, 405);
  assert.equal((await createPurchaseHandler({...config, products: new Set()}, m.dependencies)(request())).status, 503);
  console.log('PASS purchase HMAC rejects tampered bodies, incorrect stores/topics and missing configuration before writes');

  for (const body of [{...order, financial_status: 'pending'}, {...order, cancelled_at: '2026-10-05'}, {...order, test: true}, {...order, line_items: [{product_id: 101, quantity: 1}]}, {...order, line_items: [{product_id: 100, quantity: 0}]}]) {
    assert.equal((await handler(request(body))).status, 200);
  }
  assert.equal(m.jobs.size, 0);
  assert.equal((await handler(request({...order, email: ''}))).status, 400);
  assert.equal((await handler(request('{broken'))).status, 400);
  assert.equal((await handler(request({...order, id: Number.MAX_SAFE_INTEGER + 1}))).status, 400);
  assert.equal(selectPurchase({...order, test: true}, {...config, allowTestOrders: true}).email, 'buyer@example.test');
  console.log('PASS only the selected paid product provisions accounts; unpaid, cancelled, unrelated and disabled test orders are ignored');

  assert.equal((await handler(request())).status, 200);
  assert.equal(m.emails[0].email, 'buyer@example.test');
  assert.equal(m.emails[0].redirect, config.appUrl + '?setup=1');
  assert.equal((await handler(request())).status, 200);
  assert.equal(m.emails.length, 1);
  console.log('PASS new purchases invite the checkout email; completed-order retries do not send duplicate invitations');

  const concurrent = memory(); let release; concurrent.setDelay(new Promise(resolve => {release = resolve;}));
  const concurrentHandler = createPurchaseHandler(config, concurrent.dependencies);
  const first = concurrentHandler(request());
  await new Promise(resolve => setImmediate(resolve));
  assert.equal((await concurrentHandler(request())).status, 503);
  release(); assert.equal((await first).status, 200); assert.equal(concurrent.emails.length, 1);
  console.log('PASS concurrent deliveries use a single lease and do not provision the same purchase twice');

  const existing = memory(); existing.setError({code: 'email_exists'});
  assert.equal((await createPurchaseHandler(config, existing.dependencies)(request())).status, 200);
  assert.equal(existing.emails[0].type, 'existing');
  assert.equal(existing.emails[0].redirect, config.appUrl);
  assert.equal([...existing.jobs.values()][0].user, 'existing-user');
  console.log('PASS returning buyers reuse their account without resetting its password or replacing saved parties');

  const failed = memory(); failed.setError({code: 'unexpected_failure', message: 'SMTP 535 secret data must not be stored'});
  const failedHandler = createPurchaseHandler(config, failed.dependencies);
  assert.equal((await failedHandler(request())).status, 503);
  assert.equal([...failed.jobs.values()][0].error, 'account_email_failed');
  assert.equal(failed.emails.length, 0);
  failed.setError(null); assert.equal((await failedHandler(request())).status, 200);
  console.log('PASS SMTP failure remains retryable, stores only a safe error code and is not acknowledged as fulfilled');

  const timed = memory(); let finish; timed.setDelay(new Promise(resolve => {finish = resolve;}));
  const background = []; const timedHandler = createPurchaseHandler({...config, timeoutMs: 1}, timed.dependencies, task => background.push(task));
  assert.equal((await timedHandler(request())).status, 503);
  finish(); await background[0];
  assert.equal((await timedHandler(request())).status, 200); assert.equal(timed.emails.length, 1);
  console.log('PASS a slow delivery returns retryable status while background work finishes; later retries observe completion');
})().catch(error => {console.error(error); process.exitCode = 1;});
