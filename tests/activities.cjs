const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const {activities,activitySupplies,activitySheet,printActivity}=require('../.qa/activities.cjs');
const {initial,dishes}=require('../.qa/app.cjs');
const {normalizeState,derivePlan,buildTimeline,printableCards}=require('../.qa/domain.cjs');
assert.equal(activities.length,10);assert.equal(new Set(activities.map(a=>a.name)).size,10);
for(const a of activities){assert(a.instructions.length>=3);assert(a.prompts.length>=6);assert(activitySheet(a).includes(a.prompts[0]));}
const s=normalizeState(structuredClone(initial),initial,dishes);Object.assign(s,{planningMode:'Custom',customHeadcount:18,customKids:4,customDrinkers:0,activities:['Gratitude cards','Kids’ table sheets','Thanksgiving charades'],selections:[]});
let p=derivePlan(s,dishes);assert.equal(p.shoppingEntries.find(x=>x.name==='Activity pencils').count,18);assert.equal(p.shoppingEntries.find(x=>x.name==='Activity printing paper').count,24);
let rows=buildTimeline(s,p);assert.equal(rows.find(x=>x[2]==='activity-Gratitude cards')[0],p.dinner-20);assert.equal(rows.find(x=>x[2]==='activity-Thanksgiving charades')[0],p.dinner+130);assert.equal(rows.find(x=>x[2]==='activity-Kids’ table sheets')[0],p.dinner-40);
const cards=printableCards(s,p,()=>[]);assert(cards.find(x=>x.id==='activity-Gratitude cards').desc.includes('A kindness I did not forget'));s.activities=[];p=derivePlan(s,dishes);assert(!p.shoppingEntries.some(x=>x.category==='Activities'));assert(!buildTimeline(s,p).some(x=>x[2].startsWith('activity-')));
assert.equal(activitySupplies(['Kids’ table sheets'],18,0).length,0);assert.equal(activitySupplies(['Gratitude cards'],200,0).find(x=>x.name==='Activity pencils').count,200);assert.equal(activitySupplies(['After-dinner game'],2,0).find(x=>x.name==='Activity printing paper').count,2);
console.log('PASS activity supplies scale, reusable pencils deduplicate, removal clears dependencies and timings match activity phases');
const dom=new JSDOM('<body></body>');global.document=dom.window.document;global.setTimeout=()=>0;const create=document.createElement.bind(document);document.createElement=(tag)=>{const el=create(tag);if(tag==='iframe'){const append=document.body.append.bind(document.body);document.body.append=(node)=>{append(node);node.contentWindow.focus=()=>{};node.contentWindow.print=()=>{};document.body.append=append;};}return el;};
printActivity(activities.find(x=>x.name==='Thanksgiving bingo'));let printed=document.querySelector('iframe').contentDocument;assert.equal(printed.querySelectorAll('.bingo .prompt').length,9);assert(printed.body.textContent.includes('Three in a row wins'));assert(!printed.body.textContent.includes('Write the nine prompts'));document.body.innerHTML='';
printActivity(activities.find(x=>x.name==='Kids’ table sheets'));printed=document.querySelector('iframe').contentDocument;assert.equal(printed.querySelectorAll('.worksheet .prompt').length,6);assert(printed.body.textContent.includes('Draw your perfect dinner plate'));
console.log('PASS printable bingo has a real nine-square board and children receive a six-prompt worksheet');
