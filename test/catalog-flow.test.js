import test from 'node:test';
import assert from 'node:assert/strict';
import {createPartyState} from '../src/domain/state.js';
import {ORIGINAL_CATALOG,withSignatureMenu,catalogRecipe} from '../src/catalog/thanksgiving.js';
import {derivePlan} from '../src/domain/planning.js';
import {addRecipeToMenu,removeDishFromMenu} from '../src/domain/recipes.js';
import {setPantryQuantity,recordPurchase} from '../src/domain/shopping.js';

test('recovered catalog drives menu, shopping and timeline without losing purchase history',()=>{
 assert.equal(ORIGINAL_CATALOG.length,44);
 let state=withSignatureMenu(createPartyState({planning:{estimatedHeadcount:18},event:{dinnerAt:'2026-11-26T16:30:00-08:00'}}));
 let plan=derivePlan(state);
 assert.equal(Object.values(state.dishes).filter(x=>x.on).length,8);
 assert.equal(plan.turkey.requiredWeightLb,24.3);
 assert.ok(plan.shopping.some(x=>x.name==='Yukon Gold potatoes'));
 assert.ok(plan.timeline.tasks.some(x=>x.title.includes('turkey')));
 const potato=plan.shopping.find(x=>x.name==='Yukon Gold potatoes');
 state=setPantryQuantity(state,potato.key,2,'lb');
 state=recordPurchase(state,potato.key,3,'lb',8,8);
 state={...state,planning:{...state.planning,estimatedHeadcount:20}};
 plan=derivePlan(state);
 assert.equal(plan.turkey.requiredWeightLb,27);
 assert.ok(plan.shopping.find(x=>x.key===potato.key).purchased.quantity>0);
 state=removeDishFromMenu(state,'ba-mashed');
 assert.ok(!derivePlan(state).shopping.some(x=>x.name==='Yukon Gold potatoes'));
 state=addRecipeToMenu(state,catalogRecipe(ORIGINAL_CATALOG.find(x=>x.id==='ba-mashed')));
 assert.ok(derivePlan(state).shopping.find(x=>x.key===potato.key).purchased.quantity>0);
});
