const assert=require('node:assert/strict');
const {inspectReceipt}=require('../.qa/etsy.cjs');
const r={receipt_id:12345,shop_id:66552482,is_paid:true,buyer_email:' Buyer@Example.test ',transactions:[{listing_id:4592268976}]};
assert.deepEqual(inspectReceipt(r),{kind:'paid',id:'12345',email:'buyer@example.test'});
assert.equal(inspectReceipt({...r,transactions:[{listing_id:123}]}).kind,'unrelated');
assert.throws(()=>inspectReceipt({...r,shop_id:123}),/invalid_receipt/);
assert.throws(()=>inspectReceipt({...r,buyer_email:null,payment_email:'somebody@example.test'}),/buyer_email_missing/);
for(const patch of [{is_paid:false},{is_canceled:true},{refunds:[{status:'success'}]}])assert.equal(inspectReceipt({...r,...patch}).kind,'revoke');
console.log('PASS Etsy receipts require the correct shop/product, paid checkout email and cancellation checks');
