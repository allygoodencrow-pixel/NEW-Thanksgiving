import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
import {inspectReceipt} from './core.ts';
const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false,autoRefreshToken:false}});
const redirect='https://thanksgiving.thecrowandcrown.com/?setup=1';
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 if(req.method!=='POST') return json({error:'method_not_allowed'},405);
 const key=req.headers.get('X-CC-Automation-Key')??'';
 if(key.length<40 || key.length>200) return json({error:'unauthorized'},401);
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key)))).map(x=>x.toString(16).padStart(2,'0')).join('');
 const access=await db.from('cc_automation_keys').select('name').eq('name','etsy-purchase').eq('key_hash',hash).eq('enabled',true).maybeSingle();
 if(access.error || !access.data) return json({error:'unauthorized'},401);
 let id:string|undefined,lease:string|undefined;
 try {
 const body=await req.json();
 if(body.action==='health') return json({ready:true,shop_id:'66552482',listing_id:'4592268976'});
 const receipt=inspectReceipt(body.receipt);
 if(receipt.kind==='unrelated') return json({status:'ignored'});
 id=receipt.id;
 if(receipt.kind==='revoke') {
  const revoked=await db.rpc('cc_revoke_etsy',{p_receipt:id});if(revoked.error)throw revoked.error;
  return json({status:'revoked'});
 }
 const queued=await db.from('cc_etsy_orders').upsert({receipt_id:id,email:receipt.email},{onConflict:'receipt_id',ignoreDuplicates:true});if(queued.error)throw queued.error;
 lease=crypto.randomUUID();
 const claim=await db.rpc('cc_claim_etsy',{p_receipt:id,p_token:lease});if(claim.error)throw claim.error;
 if(!claim.data?.[0]) {
  const state=await db.from('cc_etsy_orders').select('status').eq('receipt_id',id).single();
  if(state.error)throw state.error;
  return json({status:state.data.status},state.data.status==='complete'||state.data.status==='revoked'?200:409);
 }
 // Stored checkout email is immutable across retries; credentials are never returned.
 const email=claim.data[0].email;
 const invited=await db.auth.admin.inviteUserByEmail(email,{redirectTo:redirect});
 let user=invited.data?.user;
 if(invited.error) {
  if(!['email_exists','user_already_exists'].includes(invited.error.code??''))throw invited.error;
  const existing=await db.auth.admin.generateLink({type:'magiclink',email,options:{redirectTo:redirect}});if(existing.error)throw existing.error;
  user=existing.data.user;
  const sent=await db.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:redirect}});if(sent.error)throw sent.error;
 }
 if(!user)throw new Error('missing_account');
 // The order lock makes entitlement creation atomic with completion/cancellation.
 const done=await db.rpc('cc_finish_etsy',{p_receipt:id,p_token:lease,p_user:user.id});
 if(done.error||!done.data)throw new Error('completion_failed');
 return json({status:'complete'});
 }catch(err){
 const code=(err as {code?:string})?.code??(err instanceof Error&&['invalid_receipt','buyer_email_missing','lease_lost','completion_failed'].includes(err.message)?err.message:'fulfillment_failed');
 if(id&&lease)await db.from('cc_etsy_orders').update({status:'failed',last_error_code:code,lease_token:null,lease_until:null}).eq('receipt_id',id).eq('lease_token',lease);
 return json({error:code},code==='invalid_receipt'||code==='buyer_email_missing'?422:503);
 }
});

