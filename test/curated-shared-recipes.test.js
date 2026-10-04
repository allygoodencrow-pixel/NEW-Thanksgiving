import test from 'node:test';
import assert from 'node:assert/strict';
import {createPartyState} from '../src/domain/state.js';
import {deriveShoppingList} from '../src/domain/shopping.js';
import {derivePrepPlan} from '../src/domain/prep.js';
import {CURATED_SHARED_RECIPES,CURATED_SHARED_CATALOG} from '../src/catalog/curated-shared-recipes.js';
import {withCatalog,SUPPORTED_SIGNATURE_IDS} from '../src/catalog/thanksgiving.js';

test('shared curated recipe collection is selectable and operational',()=>{
 assert.equal(Object.keys(CURATED_SHARED_RECIPES).length,12);
 assert.equal(CURATED_SHARED_CATALOG.length,12);
 for(const recipe of Object.values(CURATED_SHARED_RECIPES)){
  assert.ok(SUPPORTED_SIGNATURE_IDS.includes(recipe.id),recipe.id);
  assert.equal(recipe.recipeComplete,true,recipe.id);
  assert.ok(recipe.baseServings>0,recipe.id);
  assert.ok(recipe.ingredients.length>=4,recipe.id);
  assert.ok(recipe.instructions.length>=3,recipe.id);
  assert.ok(recipe.prepTasks.length>=2,recipe.id);
  assert.ok(recipe.equipment.length>=1,recipe.id);
  assert.ok(recipe.servingRequirements.length>=1,recipe.id);
 }
});

test('shared curated recipes scale into shopping and prep',()=>{
 for(const count of [2,12,47,200]){
  let state=withCatalog(createPartyState({planning:{mode:'custom',customHeadcount:count},event:{dinnerAt:'2026-11-26T17:00:00-08:00',ovens:2,burners:4}}));
  for(const id of Object.keys(CURATED_SHARED_RECIPES)){
   state={...state,dishes:{...state.dishes,[id]:{on:true,recipeId:id,preparationMode:'homemade'}}};
  }
  const shopping=deriveShoppingList(state);
  const prep=derivePrepPlan(state);
  assert.ok(shopping.some(x=>x.name==='Feta'));
  assert.ok(shopping.some(x=>x.name==='Bone-in turkey breast'));
  assert.ok(shopping.some(x=>x.name==='Apple cider'));
  assert.ok(prep.some(x=>x.recipeId==='cc-mushroom-pot-pie'));
  assert.ok(prep.some(x=>x.recipeId==='cc-apple-galette'));
  assert.ok(shopping.every(x=>Number.isFinite(x.requiredCanonical??0)));
 }
});
