export type Receipt = {receipt_id?: unknown; shop_id?: unknown; is_paid?: unknown; is_canceled?: unknown; is_cancelled?: unknown; buyer_email?: unknown; transactions?: unknown; refunds?: unknown};
export function inspectReceipt(value: unknown) {
 const r=value as Receipt;
 if (!r || typeof r!=='object' || !/^[1-9]\d{0,19}$/.test(String(r.receipt_id)) || String(r.shop_id)!=='66552482') throw new Error('invalid_receipt');
 const transactions=Array.isArray(r.transactions)?r.transactions:[];
 if (!transactions.some(t=>t && String(t.listing_id)==='4592268976')) return {kind:'unrelated' as const};
 const id=String(r.receipt_id);
 if(r.is_canceled===true || r.is_cancelled===true || (Array.isArray(r.refunds) && r.refunds.some(x=>x && (x.status==='success' || x.status==='completed')))) return {kind:'revoke' as const,id};
 if(r.is_paid!==true) return {kind:'pending' as const,id};
 const email=typeof r.buyer_email==='string'?r.buyer_email.trim().toLowerCase():'';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>320) throw new Error('buyer_email_missing');
 return {kind:'paid' as const,id,email};
}

export function inspectEnvelope(value: unknown) {
 const body=value as {receipt?: Receipt; shop_id?: unknown};
 if(!body || typeof body!=='object' || !body.receipt || typeof body.receipt!=='object' || Array.isArray(body.receipt)) throw new Error('invalid_receipt');
 // Make's shop-scoped receipts response may omit shop_id. Never override a conflicting receipt or envelope scope.
 if(body.shop_id!==undefined && String(body.shop_id)!=='66552482') throw new Error('invalid_receipt');
 return inspectReceipt({...body.receipt,shop_id:body.receipt.shop_id??body.shop_id});
}
