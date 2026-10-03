import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlanStorage} from '../src/customer/plan-storage.js';
const state = name => JSON.stringify({schemaVersion:5,event:{name}});
test('serializes queued saves and sends the new database version',async()=>{
  const calls=[]; let release;
  const storage=createPlanStorage({save:async(s,v)=>{calls.push([s.event.name,v]);if(calls.length===1) await new Promise(r=>release=r); return {version:v+1};}});
  storage.setItem('plan',state('first')); await new Promise(r=>setTimeout(r,0));
  storage.setItem('plan',state('second'));storage.setItem('plan',state('latest'));
  release();await storage.flush();assert.deepEqual(calls,[['first',0],['latest',1]]);assert.equal(storage.dirty,false);
});
test('failed saves preserve the latest draft, freeze edits, and cannot report success',async()=>{
  const labels=[]; const error=new Error('offline');
  const storage=createPlanStorage({save:async()=>{throw error},onStatus:s=>labels.push(s)});
  storage.setItem('plan',state('unsaved'));await assert.rejects(storage.flush(),/offline/);
  assert.equal(JSON.parse(storage.snapshot).event.name,'unsaved');assert.equal(storage.dirty,true);
  assert.throws(()=>storage.setItem('plan',state('next')),/paused/);assert.equal(labels.at(-1),'Not saved');
});
test('disposing an account clears its draft and stops queued writes',async()=>{
  let calls=0,release;
  const a=createPlanStorage({save:async()=>{calls++;await new Promise(r=>release=r);return {version:1}}});
  a.setItem('plan',state('private A'));await new Promise(r=>setTimeout(r,0));a.setItem('plan',state('queued A'));a.dispose();release();
  await new Promise(r=>setTimeout(r,0));assert.equal(calls,1);assert.equal(a.snapshot,null);
  const b=createPlanStorage({save:async()=>({version:1})});assert.equal(b.getItem('plan'),null);
});
