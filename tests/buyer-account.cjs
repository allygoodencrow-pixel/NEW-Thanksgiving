const assert = require('node:assert/strict');
const {sendExistingBuyerSetup} = require('../.qa/buyer-account.cjs');
(async () => {
 const calls = [], sent = [];
 const auth = {admin: {
  async listUsers(options) {calls.push(options); return {data: {users: [{id: 'buyer', email: 'Buyer@Example.test'}]}, error: null};},
  async generateLink() {throw new Error('Lookup must not generate an auth link');},
 }, async resetPasswordForEmail(email, options) {sent.push({email, options}); return {error: null};}};
 assert.equal(await sendExistingBuyerSetup(auth, ' buyer@example.test ', 'https://example.test/?setup=1'), 'buyer');
 assert.deepEqual(calls, [{page: 1, perPage: 1000}]);
 assert.deepEqual(sent, [{email: 'buyer@example.test', options: {redirectTo: 'https://example.test/?setup=1'}}]);
 const pages = [];
 auth.admin.listUsers = async options => {pages.push(options.page); return {data: {users: options.page === 1 ? Array.from({length: 1000}, (_, i) => ({id: String(i), email: 'other-' + i + '@example.test'})) : [{id: 'buyer', email: 'buyer@example.test'}]}, error: null};};
 assert.equal(await sendExistingBuyerSetup(auth, 'buyer@example.test', 'https://example.test/?setup=1'), 'buyer');
 assert.deepEqual(pages, [1, 2]); assert.equal(sent.length, 2);
 auth.admin.listUsers = async () => ({data: {users: []}, error: null});
 await assert.rejects(sendExistingBuyerSetup(auth, 'missing@example.test', 'https://example.test/?setup=1'), /existing_user_missing/);
 assert.equal(sent.length, 2);
 const providerError = {code: 'over_email_send_rate_limit'};
 auth.admin.listUsers = async () => ({data: {users: [{id: 'buyer', email: 'buyer@example.test'}]}, error: null});
 auth.resetPasswordForEmail = async () => ({error: providerError});
 await assert.rejects(sendExistingBuyerSetup(auth, 'buyer@example.test', 'https://example.test/?setup=1'), error => error === providerError);
 console.log('PASS existing checkout account lookup sends one setup email without token-generation cooldown; pagination and failures remain correct');
})().catch(error => {console.error(error); process.exitCode = 1;});
