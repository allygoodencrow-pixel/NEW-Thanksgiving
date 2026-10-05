const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const dom=new JSDOM('<body></body>',{url:'http://localhost/'});
global.window=dom.window;global.document=dom.window.document;global.localStorage=dom.window.localStorage;global.HTMLElement=dom.window.HTMLElement;global.IS_REACT_ACT_ENVIRONMENT=true;
window.scrollTo=()=>{};
const React=require('react');
const {render,screen,act,fireEvent,waitFor,cleanup}=require('@testing-library/react');
const cloud=require('../.qa/cloud.cjs');
const {initial}=require('../.qa/app.cjs');
const clone=x=>JSON.parse(JSON.stringify(x));
const party={id:'party-a',user_id:'owner-a',name:'A dinner',state:clone(initial),revision:1,updated_at:new Date().toISOString()};
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return {promise,resolve,reject};};

(async()=>{
 let calls=[];const first=deferred();const statuses=[];
 const saver=new cloud.PartySaver(party,s=>statuses.push(s),async(p,state)=>{calls.push({revision:p.revision,state});if(calls.length===1)await first.promise;return {...p,state,revision:p.revision+1};});
 const one={...party.state,notes:'First'},two={...party.state,notes:'Second'};
 saver.enqueue(one);const saving=saver.flush();await Promise.resolve();saver.enqueue(two);first.resolve();assert.equal(await saving,true);
 assert.deepEqual(calls.map(c=>c.revision),[1,2]);assert.equal(calls[1].state.notes,'Second');assert.equal(saver.dirty,false);assert.equal(localStorage.getItem(cloud.pendingKey('owner-a','party-a')),null);saver.stop();
 console.log('PASS cloud saves serialize edits during an in-flight save with current revisions');

 let attempts=0;
 const retry=new cloud.PartySaver(party,()=>{},async(p,state)=>{if(++attempts===1)throw new Error('Offline');return {...p,state,revision:2};});
 retry.enqueue(one);assert.equal(await retry.flush(),false);assert.equal(retry.status,'Not saved to account — retry');assert.equal(JSON.parse(localStorage.getItem(cloud.pendingKey('owner-a','party-a'))).notes,'First');
 assert.equal(await retry.flush(),true);retry.stop();
 const conflict=new cloud.PartySaver(party,()=>{},async()=>null);conflict.enqueue(two);assert.equal(await conflict.flush(),false);assert.equal(conflict.status,'Changed on another device — review');assert.equal(conflict.party.revision,1);conflict.stop();
 console.log('PASS network errors retain retryable changes; stale devices cannot overwrite cloud data');

 assert.equal(cloud.retainRecovery(party),true);
 const fresh=new cloud.PartySaver(party,()=>{},async(p,state)=>({...p,state,revision:2}));fresh.enqueue(party.state);
 assert.equal(JSON.parse(localStorage.getItem(cloud.recoveryKey('owner-a','party-a'))).notes,'Second');
 assert.notEqual(cloud.pendingKey('owner-a','party-a'),cloud.pendingKey('owner-b','party-a'));fresh.stop();localStorage.clear();
 console.log('PASS reload preserves unsaved recovery backup; account caches are isolated');

 let authListener,currentUser=null;const rows=[];let failLoad=false;let writes=[];
 cloud.supabase.auth.onAuthStateChange=(fn)=>{authListener=fn;queueMicrotask(()=>fn('INITIAL_SESSION',null));return {data:{subscription:{unsubscribe(){}}}};};
 const session=id=>({user:{id,email:id+'@example.test'},access_token:'test',refresh_token:'test',expires_in:3600,token_type:'bearer'});
 cloud.supabase.auth.signInWithPassword=async()=>{currentUser='owner-a';const s=session(currentUser);authListener('SIGNED_IN',s);return {data:{session:s},error:null};};
 cloud.supabase.auth.signOut=async()=>{currentUser=null;authListener('SIGNED_OUT',null);return {error:null};};
 cloud.supabase.from=()=>{
  let operation='select',filters=[],body;
  const query={select(){return query},eq(k,v){filters.push([k,v]);return query},order(){return query},insert(v){operation='insert';body=v;return query},update(v){operation='update';body=v;return query},single(){return query},maybeSingle(){return query},then(resolve,reject){return Promise.resolve().then(()=>{
   if(failLoad&&operation==='select')return {data:null,error:new Error('Unavailable')};
   if(operation==='select')return {data:rows.filter(p=>p.user_id===currentUser&&filters.every(([k,v])=>p[k]===v)).map(clone),error:null};
   if(operation==='insert'){const row={...body,id:'party-'+rows.length,revision:1,updated_at:new Date().toISOString()};rows.push(clone(row));return {data:clone(row),error:null};}
   const row=rows.find(p=>p.user_id===currentUser&&filters.every(([k,v])=>p[k]===v));if(!row)return {data:null,error:null};Object.assign(row,body,{revision:row.revision+1});writes.push(clone(row));return {data:clone(row),error:null};
  }).then(resolve,reject)}};return query;
 };
 party.state.notes='Private account A';rows.push(clone(party));localStorage.setItem('cc-thanksgiving-v4',JSON.stringify({...initial,notes:'Device draft'}));
 const CloudApp=require('../.qa/cloud-app.cjs').default;
 render(React.createElement(CloudApp));
 await waitFor(()=>assert(screen.getByRole('button',{name:'Account and saved parties'})));
 fireEvent.click(screen.getByRole('button',{name:'Account and saved parties'}));
 fireEvent.change(screen.getByLabelText('EMAIL'),{target:{value:'a@example.test'}});fireEvent.change(screen.getByLabelText('PASSWORD'),{target:{value:'correct-password'}});
 fireEvent.submit(screen.getByLabelText('EMAIL').closest('form'));
 await waitFor(()=>assert(screen.getByRole('button',{name:/A dinner/})),{timeout:5000});
 await waitFor(()=>assert.equal(JSON.parse(localStorage.getItem(cloud.cacheKey('owner-a','party-a')))?.notes,'Private account A'),{timeout:5000});
 assert.equal(JSON.parse(localStorage.getItem('cc-thanksgiving-v4')).notes,'Device draft');
 fireEvent.click(screen.getByRole('button',{name:'SAVE DEVICE PLAN AS A PARTY'}));
 await waitFor(()=>assert(rows.some(p=>p.state.notes==='Device draft'&&p.user_id==='owner-a')));
 fireEvent.click(screen.getByRole('button',{name:'Account and saved parties'}));
 fireEvent.click(screen.getByRole('button',{name:'SIGN OUT',exact:true}));
 await waitFor(()=>assert.equal(currentUser,null));
 assert.equal(JSON.parse(localStorage.getItem('cc-thanksgiving-v4')).notes,'Device draft');
 await act(async()=>{failLoad=true;currentUser='owner-b';authListener('SIGNED_IN',session('owner-b'));});
 await waitFor(()=>assert(screen.getByText('Your saved parties could not be loaded. Retry before editing.')));
 assert.equal(document.querySelector('.shell'),null,'Failed account load must not expose old private plan or device draft');
 assert(!writes.some(p=>p.user_id==='owner-b'));
 cleanup();cloud.supabase.auth.stopAutoRefresh();
 console.log('PASS real React sign-in, cloud hydration, explicit device import, sign-out isolation and failed-load protection');
 // Supabase opens a BroadcastChannel for browser tabs. No pending assertions remain.
 process.exit(0);
})().catch(error=>{console.error(error);cleanup();cloud.supabase.auth.stopAutoRefresh();process.exit(1);});
