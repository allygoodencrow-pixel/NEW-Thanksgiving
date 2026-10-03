import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {readFileSync} from 'node:fs';
import {startCustomerApp} from '../src/customer/app.js';
const wait=()=>new Promise(r=>setTimeout(r,20));
test('login, activation gate, own plan load and sign-out clear the previous customer',async()=>{
 const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://app.example.test'});
 Object.assign(globalThis,{window:dom.window,document:dom.window.document,FormData:dom.window.FormData,location:dom.window.location});
 let user=null,active=false,callback; const saves=[],mounts=[];
 const client={auth:{
  getUser:async()=>({data:{user}}),onAuthStateChange:cb=>{callback=cb;return {data:{subscription:{unsubscribe(){}}}}},
  signInWithPassword:async({email})=>{user={id:email,email};return {data:{user}}},
  signOut:async()=>{user=null;callback('SIGNED_OUT',null);return{}},
 },rpc:async(name,args)=>{
  if(name==='customer_has_access')return {data:active};
  if(name==='customer_redeem_access'){active=true;return {data:true}}
  if(name==='customer_save_plan'){saves.push({id:user.id,...args});return {data:{version:args.expected_version+1}}}
 },from:()=>({select:()=>({eq:(_key,id)=>({maybeSingle:async()=>{assert.equal(id,user.id);return {data:null}}})})})};
 const dispose=startCustomerApp({client,loadPlanner:async()=>({mountPlanner:(root,storage)=>{mounts.push(storage);root.textContent='Private plan';return()=>root.replaceChildren()}})});
 await wait(); assert.match(document.querySelector('#account').textContent,/Welcome back/);
 const form=document.querySelector('form');form.querySelector('[name="email"]').value='a@example.test';form.querySelector('[name="password"]').value='a-long-password';
 form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await wait();
 assert.equal(mounts.length,0);assert.match(document.querySelector('#account').textContent,/Your plan is waiting/);
 document.querySelector('[name="code"]').value='SINGLE-USE-ACCESS-CODE';document.querySelector('form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await wait();
 assert.equal(mounts.length,1);mounts[0].setItem('plan',JSON.stringify({schemaVersion:5,event:{name:'A'}}));await mounts[0].flush();
 assert.equal(saves[0].id,'a@example.test');document.querySelector('#sign-out').click();await wait();
 assert.equal(document.querySelector('#root').textContent,'');assert.equal(mounts[0].snapshot,null);assert.match(document.querySelector('#account').textContent,/Welcome back/);
 dispose();dom.window.close();
});
