const assert = require('node:assert/strict');
const {initial,dishes} = require('../.qa/app.cjs');
const {normalizeState,derivePlan,buildTimeline,timelineWarnings,reconcileState,recipeReady} = require('../.qa/domain.cjs');
const fixture = require('./fixtures/recipe-audit.json');
const near=(a,b,label)=>assert(Math.abs(a-b)<1e-7,`${label}: ${a} !== ${b}`);
const base=(ids,count)=>{const s=normalizeState(structuredClone(initial),initial,dishes);Object.assign(s,{planningMode:'Custom',customHeadcount:count,customKids:0,customDrinkers:count,leftovers:false,selections:ids,menuPlan:Object.fromEntries(ids.map(id=>[id,{owner:'Host',status:'Confirmed',preparation:'Homemade'}]))});return s;};
const measure=(q,u)=>['tbsp','tsp'].includes(u)?[q/(u==='tbsp'?16:48),'cup']:u==='lb'?[q*16,'oz']:[q,u];
for(const f of fixture.recipes){
 const d=dishes.find(d=>d.id===f.id);assert(d&&recipeReady(d),f.id);
 assert.equal(d.serves,f.serves,f.id);assert.equal(d.sourceUrl,f.sourceUrl,f.id);
 assert.deepEqual(d.ingredients.map(x=>[x[0],x[2],x[3]]),f.ingredients.map(x=>[x.name,x.unit,x.category]),f.id);
 for(const i of f.ingredients)near(d.ingredients.find(x=>x[0]===i.name)[1]*d.serves,i.quantity,`${d.id}/${i.name} source measurement`);
 assert(d.instructions.split('\n').length>=(d.servingPlan?2:3),d.id+' method');
 for(const count of [f.serves,f.serves+1]){
  const s=base([d.id],count);if(d.group==='Drink · Kids'){s.planningMode='Expected';s.guests=Array.from({length:count},(_,i)=>({guestId:'child-'+i,name:'Child',rsvp:'Attending',ageGroup:'Child',alcohol:false,kidBeverage:'',diet:'',dietaryNeeds:[],dish:'',status:'Not confirmed',note:''}));}
  const p=derivePlan(s,dishes);const scale=!f.batchMode?count/f.serves:f.batchMode==='whole'?Math.ceil(count/f.serves):Math.ceil(count/f.serves*2)/2;
  for(const i of f.ingredients){const qty=i.step?Math.ceil(i.quantity*scale/i.step-1e-9)*i.step:i.quantity*scale;const [q,u]=measure(qty,i.unit);const row=p.shoppingEntries.find(x=>x.name===i.name&&x.unit===u&&x.category===i.category);near(row?.count||0,q,`${d.id}/${i.name} for ${count} guests`);}
  const rows=buildTimeline(s,p);assert.equal(new Set(rows.map(x=>x[2])).size,rows.length,d.id+' stable timeline IDs');
  if(d.oven){const batches=Math.ceil(count/f.serves);assert.equal(p.schedule.slots.length,batches*(d.ovenStages?.length||1),d.id+' capacity');for(const slot of p.schedule.slots)assert.equal(slot.end-slot.start,d.ovenStages?.find(x=>x.label===slot.stage)?.minutes||d.oven,d.id+' unscaled bake duration');}
  else assert(rows.some(x=>x[2]==='recipe-prep-'+d.id),d.id+' preparation');
  s.menuPlan[d.id].preparation='Purchased';let outsourced=derivePlan(s,dishes);assert(!outsourced.shoppingEntries.some(x=>x.source===d.name&&x.unit==='check pantry'));assert.equal(outsourced.schedule.slots.length,0,d.id+' purchased');
  s.menuPlan[d.id]={owner:'Other',status:'Confirmed',preparation:'Homemade'};outsourced=derivePlan(s,dishes);assert(!outsourced.shoppingEntries.some(x=>x.source===d.name),d.id+' guest groceries');assert(!buildTimeline(s,outsourced).some(x=>/^recipe-(phase|advance)-/.test(x[2])),d.id+' guest prep');
 }
}
console.log('PASS all 59 source/serving records: exact and overflow shopping, batch capacity, preparation and outsourcing');
{
 const s=base(['mac','gravy'],8),p=derivePlan(s,dishes),checks=p.shoppingEntries.filter(x=>x.unit==='check pantry');assert.equal(checks.filter(x=>x.name==='Salt').length,1);assert.equal(checks.find(x=>x.name==='Salt').count,1);assert(checks.find(x=>x.name==='Salt').source.includes('Baked mac'));assert(checks.every(x=>x.cost===0));assert(!('Pantry checks' in p.estimates));s.unitPrices[checks[0].key]=1000;near(derivePlan(s,dishes).planned,p.planned,'unmeasured checks do not fabricate spend');
 console.log('PASS pantry checks deduplicate, retain recipe attribution and stay out of quantity/budget arithmetic');
}
{
 const s=base(['ba-parker-rolls','ba-dry-turkey','guide-apple','fn-gf-cornbread'],8),p=derivePlan(s,dishes),rows=buildTimeline(s,p);
 const first=p.schedule.slots.find(x=>x.taskId==='ba-dry-turkey-stage-0');assert.equal(first.start-rows.find(x=>x[2]==='recipe-advance-ba-dry-turkey-stage-0-0')[0],750);
 const rise=rows.find(x=>x[2]==='recipe-phase-ba-parker-rolls-3'),bake=rows.find(x=>x[2]==='oven-ba-parker-rolls');assert.equal(bake[0]-rise[0],60);
 const apple=dishes.find(x=>x.id==='guide-apple');assert.equal(apple.minutes,540);assert.equal(apple.restMinutes,240);assert.equal(p.schedule.slots.find(x=>x.dish.id==='fn-gf-cornbread'&&x.stage==='Preheat cast-iron skillet').temp,425);
 s.timelineOverrides[rise[2]]=1000;assert(timelineWarnings(s,derivePlan(s,dishes)).some(x=>x.includes('Second rise')));s.done=[rise[2]];s.selections=[];assert.equal(reconcileState(s,dishes).done.length,0);
 console.log('PASS dry-brine, dough rises, pie chilling/cooling and skillet preheating are scheduled with dependency checks');
}
{
 const d=dishes.find(x=>x.id==='wine'),s=base(['wine'],4);const p=derivePlan(s,[{...d,instructions:''}]);assert.equal(p.incompleteRecipes.length,1);assert(!p.shoppingEntries.some(x=>x.name==='Wine'));assert(!buildTimeline(s,p).some(x=>x[2]==='menu-wine'));console.log('PASS incomplete drinks cannot bypass recipe readiness');
}
console.log('RECIPE AUDIT: catalogue mapping checks passed');
