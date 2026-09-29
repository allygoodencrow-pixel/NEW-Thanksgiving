import test from 'node:test';
import assert from 'node:assert/strict';
import {createPartyState} from '../src/domain/state.js';
import {withSignatureMenu,withCatalog} from '../src/catalog/thanksgiving.js';
import {setDishPreparationMode,dishRequirementMode} from '../src/domain/menu.js';
import {requiredServingsForDish} from '../src/domain/recipes.js';
import {deriveShoppingList,setOwnedQuantity} from '../src/domain/shopping.js';
import {deriveTablePlan} from '../src/domain/table.js';
import {deriveMenuCompleteness} from '../src/domain/coverage.js';
import {deriveTimeline} from '../src/domain/schedule.js';
import {generatePrintableBundle} from '../src/domain/printables.js';

test('prepared turkey is one prepared order, not a raw bird too',()=>{
 let state=withSignatureMenu(createPartyState({planning:{mode:'custom',customHeadcount:200}}));
 state=setDishPreparationMode(state,'turkey','purchased');
 const turkey=deriveShoppingList(state).filter(row=>row.sources?.some(source=>source.dishId==='turkey'));
 assert.deepEqual(turkey.map(row=>row.key),['prepared:turkey']);
 assert.equal(turkey[0].required.quantity,200);
});

test('unverified, missing, or declined contribution does not remove host fallback',()=>{
 let state=withSignatureMenu(createPartyState());
 state=setDishPreparationMode(state,'potatoes','guest-provided');
 state={...state,menuResponsibilities:{potatoes:{ownerType:'guest',contributorGuestId:'missing',status:'confirmed'}}};
 assert.equal(dishRequirementMode('potatoes',state),'ingredients');
 state={...state,guests:[{guestId:'g1',name:'Guest',rsvp:'no'}],menuResponsibilities:{potatoes:{ownerType:'guest',contributorGuestId:'g1',status:'confirmed'}}};
 assert.equal(dishRequirementMode('potatoes',state),'ingredients');
 state={...state,guests:[{guestId:'g1',name:'Guest',rsvp:'pending'}]};
 assert.equal(dishRequirementMode('potatoes',state),'ingredients');
 state={...state,guests:[{guestId:'g1',name:'Guest',rsvp:'yes'}]};
 assert.equal(dishRequirementMode('potatoes',state),'none');
});

test('drinks use eligible segments and roles are not misclassified',()=>{
 let state=withCatalog(createPartyState({planning:{mode:'custom',customHeadcount:12,customChildren:2,customAdultDrinkers:2}}));
 state={...state,dishes:{wine:{on:true,recipeId:'wine'},'kids-cider':{on:true,recipeId:'kids-cider'},gravy:{on:true,recipeId:'gravy'}}};
 assert.equal(requiredServingsForDish(state,'wine'),2);
 assert.equal(requiredServingsForDish(state,'kids-cider'),2);
 assert.equal(state.recipes.wine.mealRole,'alcohol');
 assert.equal(state.recipes.gravy.mealRole,'sauce-condiment');
 assert.ok(deriveMenuCompleteness(state).missing.includes('vegetable'));
});

test('count shopping offers buyable units without changing recipe demand',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'estimated',estimatedHeadcount:12}}));
 const row=deriveShoppingList(state).find(x=>x.name==='Pumpkin purée');
 assert.equal(row.required.quantity,1.08);
 assert.deepEqual(row.purchaseRecommendation,{quantity:2,unit:'can',packages:2,packageSize:1});
 assert.equal(row.category,'Pantry');
});

test('owned tableware routes to inventory and resolves the actual shortage',()=>{
 let state=createPartyState({planning:{mode:'custom',customHeadcount:12},tables:[{id:'real',use:'dining',seatCapacity:12}]});
 state=setOwnedQuantity(state,'table:dinner-plates',13,'each');
 assert.equal(deriveTablePlan(state).placeSettings.find(x=>x.key==='dinner-plates').missing,0);
 assert.equal(state.pantry['table:dinner-plates'],undefined);
});

test('incomplete recovered recipes cannot produce a clear or complete plan',()=>{
 const state=withSignatureMenu(createPartyState({event:{dinnerAt:'2026-11-26T16:30:00-08:00'}}));
 const menu=deriveMenuCompleteness(state);
 assert.equal(menu.structureComplete,true);
 assert.equal(menu.complete,false);
 assert.equal(menu.incompleteRecipes.length,8);
 assert.equal(deriveTimeline(state).issues.filter(x=>x.type==='recipe-incomplete').length,8);
});

test('unseated named guests get place cards and unreviewed labels do not claim safety',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'expected'},guests:[{guestId:'g1',name:'Alex',rsvp:'yes'}]}));
 const bundle=generatePrintableBundle(state).printables;
 assert.deepEqual(bundle['place-cards'].rows,[{personId:'g1',name:'Alex',seatId:null}]);
 assert.deepEqual(bundle['seating-chart'].rows,[]);
 assert.match(bundle['food-labels'].rows[0].status,/review required/);
 assert.deepEqual(bundle['food-labels'].rows[0].dietaryTags,[]);
});
