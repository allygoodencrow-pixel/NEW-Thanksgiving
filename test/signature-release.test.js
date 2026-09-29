import test from 'node:test';
import assert from 'node:assert/strict';
import {createPartyState} from '../src/domain/state.js';
import {withCatalog,withSignatureMenu,SIGNATURE_MENU,SUPPORTED_SIGNATURE_IDS,ORIGINAL_CATALOG,catalogRecipe} from '../src/catalog/thanksgiving.js';
import {deriveShoppingList} from '../src/domain/shopping.js';
import {deriveBudgetPlan} from '../src/domain/budget.js';
import {deriveTurkeyPlan} from '../src/domain/turkey.js';
import {deriveTimeline} from '../src/domain/schedule.js';

test('every selectable signature recipe is operationally complete',()=>{
 const state=withCatalog(createPartyState());
 assert.deepEqual([...SUPPORTED_SIGNATURE_IDS].sort(),[...SIGNATURE_MENU].sort());
 for(const id of SIGNATURE_MENU){
  const r=state.recipes[id];
  assert.equal(r.recipeComplete,true,id+' complete');
  assert.ok(r.baseServings>0,id+' yield');
  assert.ok(r.ingredients.length>0,id+' ingredients');
  assert.ok(r.instructions.length>=3,id+' instructions');
  assert.ok(r.prepTasks.length>0,id+' prep');
  assert.ok(r.equipment.length>0,id+' equipment');
  assert.ok(r.servingRequirements.length>0,id+' serving pieces');
  assert.equal(r.metadataReviewed,true,id+' dietary review');
  assert.equal(r.allergenReviewed,true,id+' allergen review');
  assert.ok(r.storage,id+' storage');
  assert.ok(r.reheat,id+' reheat');
  assert.ok(r.provenance?.label,id+' provenance');
 }
});

test('signature ingredient shopping preserves recipe demand and provides package recommendations when package data is compatible',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'estimated',estimatedHeadcount:12}}));
 const ingredients=deriveShoppingList(state).filter(x=>x.kind==='ingredient');
 assert.ok(ingredients.length>10);
 const pumpkin=ingredients.find(x=>x.name==='Pumpkin purée');
 assert.ok(pumpkin.requiredCanonical>0);
 assert.equal(pumpkin.purchaseRecommendation.packages,2);
 assert.equal(pumpkin.purchaseRecommendation.quantity,30);
 assert.equal(pumpkin.purchaseRecommendation.unit,'oz');
 const budget=deriveBudgetPlan(state);
 const foodLines=budget.lines.filter(x=>ingredients.some(i=>i.key===x.sourceKey));
 assert.equal(foodLines.filter(x=>x.unknownPrice).length,0);
});

test('200-person turkey plan becomes multiple birds and multiple oven waves instead of one fake roast',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'custom',customHeadcount:200},event:{ovens:1,dinnerAt:'2026-11-26T17:00:00-08:00'}}));
 const turkey=deriveTurkeyPlan(state);
 assert.equal(turkey.requiredWeightLb,250);
 assert.ok(turkey.birdCount>1);
 assert.ok(turkey.ovenWaves>1);
 assert.ok(turkey.cookMinutes>turkey.perWaveCookMinutes);
 const timeline=deriveTimeline(state);
 assert.ok(timeline.issues.some(x=>x.type==='capacity-review'&&x.resource==='oven'));
 assert.ok(timeline.tasks.some(x=>x.title.includes('refrigerator to thaw')));
});

test('recovered reference recipes remain explicitly incomplete until reviewed',()=>{
 const item=ORIGINAL_CATALOG.find(x=>!SUPPORTED_SIGNATURE_IDS.includes(x.id));
 assert.ok(item);
 const r=catalogRecipe(item);
 assert.equal(r.recipeComplete,false);
 assert.ok(r.unsupportedReason);
 assert.equal(r.metadataReviewed,false);
 assert.equal(r.allergenReviewed,false);
});
