import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false,autoRefreshToken:false}});
const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,content-type,x-client-info','Cache-Control':'no-store'};
const fail=(status:number)=>new Response(JSON.stringify({error:status===401?'sign_in_required':'paid_access_required'}),{status,headers:{...headers,'Content-Type':'application/json'}});
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response(null,{headers});
 if(req.method!=='POST')return fail(405);
 const token=(req.headers.get('Authorization')??'').replace(/^Bearer\s+/i,'');
 const verified=await db.auth.getUser(token);if(verified.error||!verified.data.user)return fail(401);
 const granted=await db.from('cc_access_grants').select('source_id').eq('user_id',verified.data.user.id).eq('active',true).limit(1);
 if(granted.error)return fail(503);if(!granted.data?.length)return fail(403);
 let path:string;try{path=(await req.json()).path;}catch{return fail(400);}
 if(typeof path!=='string'||!/^(page-\d{2}\.(pdf|png)|thanksgiving-collection\.pdf)$/.test(path))return fail(400);
 const file=await db.storage.from('thanksgiving-printables').download(path);if(file.error||!file.data)return fail(404);
 return new Response(file.data,{headers:{...headers,'Content-Type':path.endsWith('.pdf')?'application/pdf':'image/png'}});
});

