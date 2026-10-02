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
 const rows=deriveShoppingList(state).filter(row=>row.sources?.some(source=>source.dishId==='turkey'));
 const prepared=rows.find(row=>row.key==='prepared:turkey');
 assert.ok(prepared);
 assert.equal(prepared.required.quantity,200);
 assert.equal(rows.some(row=>row.key==='turkey:whole-bird'),false);
 assert.equal(rows.some(row=>row.kind==='ingredient'),false);
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

test('package shopping keeps recipe demand separate from what the host should buy',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'estimated',estimatedHeadcount:12}}));
 const row=deriveShoppingList(state).find(x=>x.name==='Unsweetened pumpkin purée');
 assert.ok(Math.abs(row.required.quantity-1.59375)<1e-9);
 assert.equal(row.required.unit,'lb');
 assert.equal(row.purchaseRecommendation.packages,2);
 assert.equal(row.purchaseRecommendation.quantity,30);
 assert.equal(row.purchaseRecommendation.unit,'oz');
 assert.equal(row.category,'Pantry');
});

test('owned tableware routes to inventory and resolves the actual shortage',()=>{
 let state=createPartyState({planning:{mode:'custom',customHeadcount:12},tables:[{id:'real',use:'dining',seatCapacity:12}]});
 state=setOwnedQuantity(state,'table:dinner-plates',13,'each');
 assert.equal(deriveTablePlan(state).placeSettings.find(x=>x.key==='dinner-plates').missing,0);
 assert.equal(state.pantry['table:dinner-plates'],undefined);
});

test('signature menu is backed by complete reviewed recipes',()=>{
 const state=withSignatureMenu(createPartyState({event:{dinnerAt:'2026-11-26T16:30:00-08:00'}}));
 const menu=deriveMenuCompleteness(state);
 assert.equal(menu.structureComplete,true);
 assert.equal(menu.complete,true);
 assert.equal(menu.incompleteRecipes.length,0);
 assert.equal(deriveTimeline(state).issues.filter(x=>x.type==='recipe-incomplete').length,0);
});

test('unseated named guests get place cards and reviewed signature labels may make reviewed claims',()=>{
 const state=withSignatureMenu(createPartyState({planning:{mode:'expected'},guests:[{guestId:'g1',name:'Alex',rsvp:'yes'}]}));
 const bundle=generatePrintableBundle(state).printables;
 assert.deepEqual(bundle['place-cards'].rows,[{personId:'g1',name:'Alex',seatId:null}]);
 assert.deepEqual(bundle['seating-chart'].rows,[]);
 assert.equal(bundle['food-labels'].rows[0].status,'reviewed');
 assert.ok(Array.isArray(bundle['food-labels'].rows[0].dietaryTags));
});
