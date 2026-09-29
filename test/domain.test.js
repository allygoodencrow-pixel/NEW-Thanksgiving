import test from "node:test";import assert from "node:assert/strict";
import {createPartyState} from "../src/domain/state.js";
import {guestPopulation,planningContext} from "../src/domain/guests.js";
import {dishRequirementMode,setDishPreparationMode} from "../src/domain/menu.js";
import {scaleQuantity,packageCount} from "../src/domain/quantities.js";
import {addRecipeToMenu,removeDishFromMenu,upsertRecipe} from "../src/domain/recipes.js";
import {aggregateIngredients} from "../src/domain/ingredients.js";
import {deriveShoppingList,recordPurchase,setPantryQuantity} from "../src/domain/shopping.js";
import {derivePrepTasks} from "../src/domain/prep.js";
import {derivePlan} from "../src/domain/planning.js";

test("confirmed planning only counts yes RSVPs",()=>{const guests=[{name:"A",rsvp:"yes",plus:1,kids:2},{name:"B",rsvp:"pending"},{name:"C",rsvp:"no"}];assert.deepEqual(guestPopulation(guests,"confirmed"),{headcount:4,adults:2,children:2,drinkers:0});});
test("estimated planning uses estimated values",()=>{const state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:20,estimatedChildren:5}});assert.equal(planningContext(state).planningAdults,15);});
test("confirmed guest contribution removes host requirement",()=>{const state=createPartyState({dishes:{pie:{on:true,preparationMode:"homemade"}},guests:[{guestId:"supplier",name:"Supplier",rsvp:"yes"}],menuResponsibilities:{pie:{ownerType:"guest",contributorGuestId:"supplier",status:"confirmed"}}});assert.equal(dishRequirementMode("pie",state),"none");});
test("purchased dish becomes prepared-food requirement",()=>{const state=createPartyState({dishes:{rolls:{on:true,preparationMode:"purchased"}}});assert.equal(dishRequirementMode("rolls",state),"prepared-food");});
test("quantity scaling and package rounding are deterministic",()=>{assert.equal(scaleQuantity(2,8,20),5);assert.equal(packageCount(5,2),3);});

test("custom recipe added twice remains one menu dish and scales with planning headcount",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:18}});
 const recipe={id:"mash",title:"Mashed Potatoes",baseServings:6,ingredients:[{ingredientId:"butter",name:"Butter",quantity:2,unit:"cup"}],prepTasks:["Peel potatoes","Mash potatoes"]};
 state=addRecipeToMenu(state,recipe);state=addRecipeToMenu(state,"mash");
 assert.equal(Object.values(state.dishes).filter(x=>x.on).length,1);
 assert.equal(aggregateIngredients(state)[0].quantity,6);
 state={...state,planning:{...state.planning,estimatedHeadcount:24}};
 assert.equal(aggregateIngredients(state)[0].quantity,8);
});

test("compatible units consolidate duplicate ingredients with source attribution",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8}});
 state=addRecipeToMenu(state,{id:"a",title:"A",baseServings:8,ingredients:[{ingredientId:"butter",name:"Butter",quantity:1,unit:"cup"}]});
 state=addRecipeToMenu(state,{id:"b",title:"B",baseServings:8,ingredients:[{ingredientId:"butter",name:"Butter",quantity:4,unit:"tbsp"}]});
 const butter=aggregateIngredients(state).find(x=>x.key==="butter");
 assert.equal(Math.round(butter.quantity*100)/100,1.25);assert.equal(butter.unit,"cup");assert.equal(butter.sources.length,2);
});

test("pantry and purchases subtract from live demand while purchase history survives demand changes",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:18}});
 state=addRecipeToMenu(state,{id:"mash",title:"Mash",baseServings:6,ingredients:[{ingredientId:"butter",name:"Butter",quantity:2,unit:"cup"}]});
 state=setPantryQuantity(state,"butter",1,"cup");state=recordPurchase(state,"butter",4,"cup",18);
 let butter=deriveShoppingList(state).find(x=>x.key==="butter");assert.equal(butter.stillNeed.quantity,1);assert.equal(butter.actualCost,18);
 state={...state,planning:{...state.planning,estimatedHeadcount:12}};butter=deriveShoppingList(state).find(x=>x.key==="butter");assert.equal(butter.stillNeed.quantity,0);assert.equal(butter.surplus.quantity,1);assert.equal(butter.purchased.quantity,4);
});

test("removing one recipe removes only its ingredient demand and leaves purchases intact",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8}});
 state=addRecipeToMenu(state,{id:"a",title:"A",baseServings:8,ingredients:[{ingredientId:"butter",name:"Butter",quantity:1,unit:"cup"}]});
 state=addRecipeToMenu(state,{id:"b",title:"B",baseServings:8,ingredients:[{ingredientId:"butter",name:"Butter",quantity:.5,unit:"cup"}]});
 state=recordPurchase(state,"butter",1,"cup",5);state=removeDishFromMenu(state,"a");
 const butter=deriveShoppingList(state).find(x=>x.key==="butter");assert.equal(butter.required.quantity,.5);assert.equal(butter.purchased.quantity,1);assert.equal(butter.surplus.quantity,.5);
});

test("mass and volume demands never invent a conversion",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:4}});
 state=addRecipeToMenu(state,{id:"a",title:"A",baseServings:4,ingredients:[{ingredientId:"flour",name:"Flour",quantity:1,unit:"cup"}]});
 state=addRecipeToMenu(state,{id:"b",title:"B",baseServings:4,ingredients:[{ingredientId:"flour",name:"Flour",quantity:8,unit:"oz"}]});
 const flour=aggregateIngredients(state).filter(x=>x.key==="flour");assert.equal(flour.length,2);assert.notEqual(flour[0].dimension,flour[1].dimension);
});

test("purchased preparation removes homemade ingredients and prep and creates prepared-food shopping",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:10}});
 state=addRecipeToMenu(state,{id:"rolls",title:"Dinner Rolls",baseServings:10,ingredients:[{ingredientId:"flour",name:"Flour",quantity:3,unit:"cup"}],prepTasks:["Mix dough","Bake"]});
 state=setDishPreparationMode(state,"rolls","purchased");
 assert.equal(aggregateIngredients(state).length,0);assert.equal(derivePrepTasks(state).length,0);
 const row=deriveShoppingList(state).find(x=>x.key==="prepared:rolls");assert.equal(row.required.quantity,10);assert.equal(row.unit,"serving");
});

test("unconfirmed guest contribution remains host requirement until confirmed",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8}});
 state=addRecipeToMenu(state,{id:"pie",title:"Pie",baseServings:8,ingredients:[{ingredientId:"sugar",name:"Sugar",quantity:1,unit:"cup"}],prepTasks:["Bake pie"]});
 state={...state,menuResponsibilities:{pie:{ownerType:"guest",status:"pending"}}};assert.equal(deriveShoppingList(state).some(x=>x.key==="sugar"),true);assert.equal(derivePrepTasks(state).length,1);
 state={...state,guests:[{guestId:"supplier",name:"Supplier",rsvp:"yes"}],menuResponsibilities:{pie:{ownerType:"guest",contributorGuestId:"supplier",status:"confirmed"}}};assert.equal(deriveShoppingList(state).some(x=>x.key==="sugar"),false);assert.equal(derivePrepTasks(state).length,0);
});

test("manual shopping items survive recipe recalculation",()=>{
 let state=createPartyState({manualShoppingItems:[{id:"ice",name:"Ice",quantity:2,unit:"bag"}],planning:{mode:"estimated",estimatedHeadcount:8}});
 state=upsertRecipe(state,{id:"a",title:"A",baseServings:8,ingredients:[]});state=addRecipeToMenu(state,"a");state={...state,planning:{...state.planning,estimatedHeadcount:20}};
 assert.equal(deriveShoppingList(state).find(x=>x.key==="manual:ice").name,"Ice");
});

test("one canonical state recalculates shopping and prep without mutating purchases",()=>{
 let state=createPartyState({planning:{mode:"estimated",estimatedHeadcount:6}});
 state=addRecipeToMenu(state,{id:"gravy",title:"Gravy",baseServings:6,ingredients:[{ingredientId:"stock",name:"Stock",quantity:3,unit:"cup"}],prepTasks:["Make gravy"]});
 state=recordPurchase(state,"stock",3,"cup",9);
 let plan=derivePlan(state);assert.equal(plan.shopping.find(x=>x.key==="stock").stillNeed.quantity,0);assert.equal(plan.prep.length,1);
 state={...state,planning:{...state.planning,estimatedHeadcount:12}};
 plan=derivePlan(state);assert.equal(plan.shopping.find(x=>x.key==="stock").stillNeed.quantity,3);assert.equal(plan.shopping.find(x=>x.key==="stock").purchased.quantity,3);assert.equal(plan.prep.length,1);
});
