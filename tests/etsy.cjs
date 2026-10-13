const assert=require('node:assert/strict');
const {inspectReceipt,inspectEnvelope}=require('../.qa/etsy.cjs');
const r={receipt_id:12345,shop_id:66552482,is_paid:true,buyer_email:' Buyer@Example.test ',transactions:[{listing_id:4592268976}]};
assert.deepEqual(inspectReceipt(r),{kind:'paid',id:'12345',email:'buyer@example.test'});
assert.equal(inspectReceipt({...r,transactions:[{listing_id:123}]}).kind,'unrelated');
assert.throws(()=>inspectReceipt({...r,shop_id:123}),/invalid_receipt/);
assert.throws(()=>inspectReceipt({...r,buyer_email:null,payment_email:'somebody@example.test'}),/buyer_email_missing/);
for(const patch of [{is_canceled:true},{refunds:[{status:'success'}]}])assert.equal(inspectReceipt({...r,...patch}).kind,'revoke');
console.log('PASS Etsy receipts require the correct shop/product, paid checkout email and cancellation checks');

assert.equal(inspectReceipt({...r,is_paid:false}).kind,'pending');
assert.equal(inspectReceipt({...r,refunds:[null,{status:'pending'}]}).kind,'paid');
const {shop_id,...withoutShop}=r;
assert.equal(inspectEnvelope({shop_id,receipt:withoutShop}).kind,'paid');
assert.throws(()=>inspectEnvelope({shop_id:1,receipt:r}),/invalid_receipt/);
assert.throws(()=>inspectEnvelope({shop_id,receipt:{...r,shop_id:1}}),/invalid_receipt/);
assert.throws(()=>inspectEnvelope({receipt:withoutShop}),/invalid_receipt/);
console.log('PASS authenticated Etsy envelope preserves shop scope; unpaid orders remain retryable without revocation');
