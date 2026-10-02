import test from 'node:test';
import assert from 'node:assert/strict';
import {createPartyState} from '../src/domain/state.js';
import {withSignatureMenu} from '../src/catalog/thanksgiving.js';
import {derivePlan} from '../src/domain/planning.js';
import {deriveShoppingList,setPantryQuantity} from '../src/domain/shopping.js';
import {deriveTurkeyPlan} from '../src/domain/turkey.js';
import {deriveTimeline} from '../src/domain/schedule.js';
import {deriveTablePlan} from '../src/domain/table.js';
import {derivePrepTasks} from '../src/domain/prep.js';
import {requiredServingsForDish} from '../src/domain/recipes.js';
import {generatePrintableBundle} from '../src/domain/printables.js';

// The core cascade: change the guest count once and every dependent system
// recalculates — servings, turkey, beverages by segment, ingredients,
// packages, inventory, shopping, budget, prep batching, oven schedule,
// seating/tableware, printables and dashboard warnings.
test('changing 12 guests to 22 recalculates every dependent system',()=>{
 let state=withSignatureMenu(createPartyState({
  planning:{mode:'custom',customHeadcount:12,customChildren:3,customAdultDrinkers:5},
  event:{ovens:1,dinnerAt:'2026-11-26T17:00:00-08:00',service:'family',budget:300},
  tables:[{id:'t1',use:'dining',seatCapacity:12}]
 }));
 state={...state,dishes:{...state.dishes,
  wine:{on:true,recipeId:'wine'},
  'kids-cider':{on:true,recipeId:'kids-cider'},
  'sparkling-water':{on:true,recipeId:'sparkling-water'},
  'coffee-tea':{on:true,recipeId:'coffee-tea'}
 }};

 const before=derivePlan(state);
 assert.equal(before.planning.planningHeadcount,12);

 // ---- the one change: 12 -> 22 guests (segments change too) ----
 state={...state,planning:{...state.planning,customHeadcount:22,customChildren:4,customAdultDrinkers:9}};
 const after=derivePlan(state);

 // 1. planning headcount + recipe servings
 assert.equal(after.planning.planningHeadcount,22);
 assert.equal(requiredServingsForDish(state,'ba-dry-turkey'),22);

 // 2. turkey chain: weight, bird count, oven waves
 assert.ok(Math.abs(before.turkey.requiredWeightLb-16.2)<1e-9);   // 12 x 1.35
 assert.ok(Math.abs(after.turkey.requiredWeightLb-29.7)<1e-9);  // 22 x 1.35
 assert.equal(after.turkey.birdCount,3);
 assert.ok(after.turkey.ovenWaves>before.turkey.ovenWaves);
 assert.ok(after.turkey.issues.includes('turkey-oven-capacity-review'));

 // 3. beverages scale by their own guest segments, not raw headcount
 assert.equal(requiredServingsForDish(state,'wine'),9);       // adult drinkers
 assert.equal(requiredServingsForDish(state,'kids-cider'),4); // children
 assert.ok(requiredServingsForDish(state,'wine')>5);
 const wineBefore=before.shopping.find(x=>x.name==='Wine bottles');
 const wineAfter=after.shopping.find(x=>x.name==='Wine bottles');
 assert.ok(wineAfter.requiredCanonical>wineBefore.requiredCanonical);
 const ciderAfter=after.shopping.find(x=>x.name==='Apple cider or juice');
 const ciderBefore=before.shopping.find(x=>x.name==='Apple cider or juice');
 assert.ok(ciderAfter.requiredCanonical>ciderBefore.requiredCanonical);

 // 4. consolidated ingredient demand grows
 const butterBefore=before.shopping.find(x=>x.key==='butter-unsalted');
 const butterAfter=after.shopping.find(x=>x.key==='butter-unsalted');
 assert.ok(butterAfter.requiredCanonical>butterBefore.requiredCanonical);

 // 5. package quantities grow (pumpkin: 25.5 oz -> 46.75 oz, 2 -> 4 cans)
 const pumpkinBefore=before.shopping.find(x=>x.key==='pumpkin-puree');
 assert.equal(pumpkinBefore.purchaseRecommendation.packages,2);
 const pumpkinAfter=after.shopping.find(x=>x.key==='pumpkin-puree');
 assert.equal(pumpkinAfter.purchaseRecommendation.packages,4);
 assert.equal(pumpkinAfter.purchaseRecommendation.quantity,60);

 // 6. inventory subtraction reduces still-need without touching recipe demand
 state=setPantryQuantity(state,'pumpkin-puree',15,'oz');
 const withPantry=deriveShoppingList(state).find(x=>x.key==='pumpkin-puree');
 assert.equal(withPantry.requiredCanonical,pumpkinAfter.requiredCanonical);
 assert.ok(withPantry.remainingCanonical<pumpkinAfter.remainingCanonical);
 assert.equal(withPantry.purchaseRecommendation.packages,3);
 assert.equal(withPantry.stillNeed.quantity>0,true);

 // 7. budget follows the demand
 const budgetAfter=derivePlan(state).budget;
 assert.ok(budgetAfter.totalEstimated>before.budget.totalEstimated);
 assert.equal(budgetAfter.incompletePriceLines,0);

 // 8. prep batching: 3 turkey roasts become 3 oven waves of cook time
 const roastTask=derivePrepTasks(state).find(t=>t.dishId==='ba-dry-turkey'&&t.phase==='cook'&&t.title.includes('Lower'));
 const roastBefore=before.prep.find(t=>t.taskId===roastTask.taskId);
 assert.equal(roastBefore.batchWaves,2);   // 12 servings / 10 per batch
 assert.equal(roastTask.batchWaves,3);    // 22 servings / 10 per batch
 assert.ok(roastTask.durationMinutes>roastBefore.durationMinutes);

 // 9. timeline reacts: oven capacity review + more scheduled work
 const timeline=deriveTimeline(state);
 assert.ok(timeline.issues.some(x=>x.type==='capacity-review'&&x.resource==='oven'));
 assert.ok(timeline.tasks.length>=before.timeline.tasks.length);

 // 10. seating + tableware: seats, settings, shortages
 const table=deriveTablePlan(state);
 assert.equal(table.requiredSeats,22);
 assert.equal(table.seatShortage,10);                       // 12-seat table
 assert.equal(table.placeSettingCount,24);                  // ceil(22 x 1.05)

 // 11. printables reflect the new quantities
 const bundle=generatePrintableBundle(state);
 const pumpkinRow=bundle.printables['shopping-checklist'].rows.find(x=>x.name==='Unsweetened pumpkin purée');
 assert.equal(pumpkinRow.quantity.quantity,45);             // 3 x 15 oz with pantry

 // 12. dashboard-grade warnings now exist in derived data
 assert.ok(after.turkey.issues.length>0);
 assert.ok(table.seatShortage>0);
 assert.ok(timeline.issues.length>0);
});
