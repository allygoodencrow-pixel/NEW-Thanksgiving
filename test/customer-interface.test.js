import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {readFileSync} from 'node:fs';
import {createPlanStorage} from '../src/customer/plan-storage.js';
const wait = () => new Promise(resolve => setTimeout(resolve,60));
test('selected interface starts empty, sets up a private plan, and navigates without sample guests',async()=>{
 const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'http://localhost/'});
 Object.assign(globalThis,{window:dom.window,document:dom.window.document,FormData:dom.window.FormData,localStorage:dom.window.localStorage});
 Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
 window.scrollTo=()=>{};
 const writes=[]; const storage=createPlanStorage({save:async(s,v)=>{writes.push(s);return {version:v+1}}});
 const {mountPlanner}=await import('../src/selected-interface.js');
 const stop=mountPlanner(document.getElementById('root'),storage);await wait();
 assert.ok(document.querySelector('.setup'),'new customer gets setup');
 const form=document.querySelector('.setup form');assert.ok(form);
 form.querySelector('[name="headcount"]').value='8';
 form.querySelector('[name="dinnerAt"]').value='2026-11-26T17:00';
 form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await wait();await storage.flush();
 assert.equal(writes.at(-1).guests.length,0);assert.equal(writes.at(-1).planning.estimatedHeadcount,8);
 assert.ok(!document.body.textContent.includes('SAMPLE PLAN'));
 for (const label of ['Guests','Menu','Shopping','Prep checklist','Timeline','Table & seating','Experience','Budget','Printables','Party day']) {
   const button=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===label);
   assert.ok(button,`${label} navigation exists`);button.click();await wait();assert.ok(document.querySelector('main'));
 }
 stop();storage.dispose();dom.window.close();
});
