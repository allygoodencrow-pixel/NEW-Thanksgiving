import test from "node:test";import assert from "node:assert/strict";
import {createPartyState} from "../src/domain/state.js";
import {namedPlanningPeople} from "../src/domain/guests.js";
import {addRecipeToMenu} from "../src/domain/recipes.js";
import {dishRequirementMode,setDishPreparationMode} from "../src/domain/menu.js";
import {deriveEquipmentPlan} from "../src/domain/equipment.js";
import {deriveExperiencePlan} from "../src/domain/experience.js";
import {deriveSpacePlan} from "../src/domain/space.js";
import {deriveTablePlan} from "../src/domain/table.js";
import {deriveShoppingList,recordPurchase} from "../src/domain/shopping.js";
import {deriveBudgetPlan} from "../src/domain/budget.js";
import {assignSeat} from "../src/domain/seating.js";
import {generatePrintableBundle,markPrintableGenerated,printableStatus,renderPrintableHtml} from "../src/domain/printables.js";
import {memoryStorage,saveState} from "../src/domain/persistence.js";

test("idless legacy guests receive deterministic derived person ids",()=>{const s=createPartyState({planning:{mode:"confirmed"},guests:[{name:"Legacy Guest",rsvp:"yes"}]});assert.equal(namedPlanningPeople(s)[0].personId,"guest-1");assert.equal(namedPlanningPeople(s)[0].personId,namedPlanningPeople(s)[0].personId);});

test("purchased dishes do not require homemade cooking equipment but still require serving pieces",()=>{let s=createPartyState();s=addRecipeToMenu(s,{id:"mash",title:"Mash",baseServings:12,equipment:[{id:"pot",name:"Pot"}],servingRequirements:[{id:"bowl",name:"Serving bowl"}],ingredients:[]});s=setDishPreparationMode(s,"mash","purchased");const e=deriveEquipmentPlan(s);assert.equal(e.some(x=>x.key==="pot"),false);assert.equal(e.some(x=>x.key==="bowl"),true);});

test("one owned linen cannot cover two tables",()=>{const s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8},tables:[{id:"a",use:"dining",seatCapacity:4,lengthIn:72,widthIn:36,linenDropIn:12},{id:"b",use:"dining",seatCapacity:4,lengthIn:72,widthIn:36,linenDropIn:12}],inventory:{linens:[{id:"l",shape:"rectangle",lengthIn:96,widthIn:60,quantity:1}]}});const p=deriveTablePlan(s);assert.equal(p.linens.filter(x=>x.missing===0).length,1);assert.equal(p.linens.filter(x=>x.missing===1).length,1);});

test("rectangular linens can fit when rotated",()=>{const s=createPartyState({tables:[{id:"a",use:"dining",seatCapacity:6,lengthIn:72,widthIn:36,linenDropIn:12}],inventory:{linens:[{id:"l",shape:"rectangle",lengthIn:60,widthIn:96,quantity:1}]}});const p=deriveTablePlan(s);assert.equal(p.linens[0].missing,0);assert.equal(p.linens[0].orientation,"rotated");});

test("manual shopping items participate in pantry and purchase ledger",()=>{let s=createPartyState({manualShoppingItems:[{id:"ice",name:"Ice",quantity:4,unit:"each"}]});s=recordPurchase(s,"manual:ice",2,"each",6);const row=deriveShoppingList(s).find(x=>x.key==="manual:ice");assert.equal(row.required.quantity,4);assert.equal(row.purchased.quantity,2);assert.equal(row.stillNeed.quantity,2);assert.equal(row.actualCost,6);});

test("manual purchase actual cost replaces fulfilled estimate in budget",()=>{let s=createPartyState({manualShoppingItems:[{id:"ice",name:"Ice",quantity:2,unit:"each"}],costCatalog:{"manual:ice":{unitCost:5}}});s=recordPurchase(s,"manual:ice",2,"each",8);const b=deriveBudgetPlan(s);assert.equal(b.totalActual,8);assert.equal(b.projectedFinal,8);});

test("printable metadata can save without changing plan revision",()=>{const storage=memoryStorage();let s=saveState(storage,createPartyState()).state;const revision=s.revision;s=markPrintableGenerated(s,"menu");const saved=saveState(storage,s,{expectedRevision:revision,bumpRevision:false});assert.equal(saved.ok,true);assert.equal(saved.state.revision,revision);assert.equal(printableStatus(saved.state,"menu").stale,false);});

test("seating assignment rejects unknown people",()=>{const s=createPartyState({planning:{mode:"confirmed"},guests:[{id:"a",name:"A",rsvp:"yes"}],tables:[{id:"t",use:"dining",seatCapacity:1}]});assert.throws(()=>assignSeat(s,"not-a-person","t:seat:1"),/Unknown person/);});

test("printable HTML includes operational seating and timeline details",()=>{let s=createPartyState({event:{dinnerAt:"2026-11-26T17:00:00-08:00"},planning:{mode:"confirmed"},guests:[{id:"a",name:"Alex",rsvp:"yes"}],tables:[{id:"t",use:"dining",seatCapacity:1}],seats:{"t:seat:1":"a"},manualTasks:[{id:"host",title:"Light candles",durationMinutes:10,finishOffsetMinutes:-15}]});const bundle=generatePrintableBundle(s);const seating=renderPrintableHtml(bundle.printables["seating-chart"]);const timeline=renderPrintableHtml(bundle.printables["kitchen-timeline"]);assert.match(seating,/Alex/);assert.match(seating,/t:seat:1/);assert.match(timeline,/Light candles/);assert.match(timeline,/host/);});


test("guest-provided dish keeps host backup until contribution is confirmed",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8}});s=addRecipeToMenu(s,{id:"pie",title:"Pie",baseServings:8,ingredients:[{name:"Sugar",quantity:1,unit:"cup"}]},{preparationMode:"guest-provided"});assert.equal(dishRequirementMode("pie",s),"ingredients");assert.equal(deriveShoppingList(s).some(x=>x.name==="Sugar"),true);s={...s,menuResponsibilities:{pie:{ownerType:"guest",status:"confirmed"}}};assert.equal(dishRequirementMode("pie",s),"none");assert.equal(deriveShoppingList(s).some(x=>x.name==="Sugar"),false);});

test("equipment purchases resolve both equipment gap and shopping need",()=>{let s=createPartyState();s=addRecipeToMenu(s,{id:"mash",title:"Mash",baseServings:12,equipment:[{id:"pot",name:"Pot",quantity:1}],ingredients:[]});let e=deriveEquipmentPlan(s).find(x=>x.key==="pot");assert.equal(e.missing,1);s=recordPurchase(s,"equipment:pot",1,"each",20);e=deriveEquipmentPlan(s).find(x=>x.key==="pot");assert.equal(e.missing,0);const row=deriveShoppingList(s).find(x=>x.key==="equipment:pot");assert.equal(row.required.quantity,1);assert.equal(row.purchased.quantity,1);assert.equal(row.stillNeed.quantity,0);});

test("chair purchases resolve table shortage and shopping need together",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8},tables:[{id:"t",use:"dining",seatCapacity:8}],inventory:{chairs:{quantity:4}}});assert.equal(deriveTablePlan(s).chairShortage,4);s=recordPurchase(s,"table:chairs",4,"each",80);assert.equal(deriveTablePlan(s).chairShortage,0);const row=deriveShoppingList(s).find(x=>x.key==="table:chairs");assert.equal(row.required.quantity,8);assert.equal(row.alreadyHave.quantity,4);assert.equal(row.purchased.quantity,4);assert.equal(row.stillNeed.quantity,0);});

test("linen purchase tied to a table resolves that table's linen gap",()=>{let s=createPartyState({tables:[{id:"t",use:"dining",seatCapacity:6,lengthIn:72,widthIn:36,linenDropIn:12}]});assert.equal(deriveTablePlan(s).linens[0].missing,1);s=recordPurchase(s,"table:linen:t",1,"each",30);assert.equal(deriveTablePlan(s).linens[0].missing,0);const row=deriveShoppingList(s).find(x=>x.key==="table:linen:t");assert.equal(row.stillNeed.quantity,0);});

test("activity dependencies and space zones remain connected",()=>{const s=createPartyState({activities:{cards:{name:"Cards",zoneRequirement:"activity",tasks:[{id:"prep",title:"Prep",durationMinutes:5},{id:"set",title:"Set",durationMinutes:5,dependsOn:["prep"]}]}},selectedActivities:{cards:true}});const exp=deriveExperiencePlan(s);const set=exp.tasks.find(x=>x.title==="Set");assert.deepEqual(set.dependsOn,["activity:cards:prep"]);assert.equal(deriveSpacePlan(s).missingZones.includes("activity"),true);});


test("whole turkey sizing is a real shopping requirement and ledger purchase drives turkey coverage",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:16}});s=addRecipeToMenu(s,{id:"turkey",title:"Herb Turkey",isTurkey:true,turkeyRules:{poundsPerPerson:1.25},baseServings:16,ingredients:[]});let row=deriveShoppingList(s).find(x=>x.key==="turkey:whole-bird");assert.equal(row.required.quantity,20);assert.equal(row.stillNeed.quantity,20);s=recordPurchase(s,"turkey:whole-bird",18,"lb",45);row=deriveShoppingList(s).find(x=>x.key==="turkey:whole-bird");assert.equal(row.purchased.quantity,18);assert.ok(Math.abs(row.stillNeed.quantity-2)<1e-9);});

test("shopping ledger distinguishes committed from paid cost",()=>{let s=createPartyState({manualShoppingItems:[{id:"rental",name:"Chair rental",quantity:10,unit:"each"}],costCatalog:{"manual:rental":{unitCost:4}}});s=recordPurchase(s,"manual:rental",10,"each",0,35);let row=deriveShoppingList(s).find(x=>x.key==="manual:rental");assert.equal(row.committedCost,35);assert.equal(row.actualCost,0);let budget=deriveBudgetPlan(s);assert.equal(budget.totalCommitted,35);assert.equal(budget.totalActual,0);assert.equal(budget.projectedFinal,35);s=recordPurchase(s,"manual:rental",10,"each",38,35);budget=deriveBudgetPlan(s);assert.equal(budget.totalCommitted,38);assert.equal(budget.totalActual,38);assert.equal(budget.projectedFinal,38);});
