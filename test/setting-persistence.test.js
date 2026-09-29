import test from "node:test";import assert from "node:assert/strict";
import {createPartyState} from "../src/domain/state.js";
import {deriveTablePlan,linenRequirement} from "../src/domain/table.js";
import {assignSeat,deriveSeatingPlan} from "../src/domain/seating.js";
import {deriveServicePlan} from "../src/domain/service.js";
import {deriveSpacePlan} from "../src/domain/space.js";
import {deriveExperiencePlan} from "../src/domain/experience.js";
import {deriveShoppingList,recordPurchase} from "../src/domain/shopping.js";
import {deriveBudgetPlan} from "../src/domain/budget.js";
import {generatePrintableBundle,markPrintableGenerated,printableStatus} from "../src/domain/printables.js";
import {backupState,duplicateForNewEvent,loadState,memoryStorage,restoreBackup,saveState} from "../src/domain/persistence.js";
import {derivePlan} from "../src/domain/planning.js";

test("one dining table becoming two updates capacity linens and seating",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:10},tables:[{id:"t1",shape:"rectangle",use:"dining",seatCapacity:6,lengthIn:72,widthIn:36,linenDropIn:12}]});let p=deriveTablePlan(s);assert.equal(p.seatShortage,4);assert.equal(p.linens.length,1);s={...s,tables:[...s.tables,{id:"t2",shape:"rectangle",use:"dining",seatCapacity:4,lengthIn:60,widthIn:30,linenDropIn:12}]};p=deriveTablePlan(s);assert.equal(p.seatShortage,0);assert.equal(p.linens.length,2);assert.equal(deriveSeatingPlan(s).availableSeatCount,10);});

test("72 by 36 rectangular table with 12 inch drop requires 96 by 60 linen",()=>{assert.deepEqual(linenRequirement({shape:"rectangle",lengthIn:72,widthIn:36,linenDropIn:12}),{shape:"rectangle",lengthIn:96,widthIn:60,dropIn:12});});

test("seat assignment never duplicates a person and reduced capacity exposes displacement",()=>{let s=createPartyState({planning:{mode:"confirmed"},guests:[{id:"a",name:"A",rsvp:"yes"},{id:"b",name:"B",rsvp:"yes"}],tables:[{id:"t",use:"dining",seatCapacity:2}]});s=assignSeat(s,"a","t:seat:1");s=assignSeat(s,"a","t:seat:2");assert.deepEqual(Object.values(s.seats),["a"]);s=assignSeat(s,"b","t:seat:1");assert.equal(Object.values(s.seats).length,2);s={...s,tables:[{id:"t",use:"dining",seatCapacity:1}]};const p=deriveSeatingPlan(s);assert.equal(Object.keys(p.assignments).length,1);assert.equal(p.displaced.length,1);});

test("switching family style to buffet creates a buffet zone requirement without removing seats",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:8},tables:[{id:"t",use:"dining",seatCapacity:8}]});assert.deepEqual(deriveServicePlan(s).missingZones,[]);s={...s,event:{...s.event,service:"buffet"}};assert.deepEqual(deriveServicePlan(s).missingZones,["buffet"]);assert.equal(deriveTablePlan(s).requiredSeats,8);});

test("space plan is honest when unmeasured and reports overlap when measured",()=>{let s=createPartyState({tables:[{id:"a",use:"dining",seatCapacity:4,lengthIn:72,widthIn:36,xIn:0,yIn:0},{id:"b",use:"dining",seatCapacity:4,lengthIn:72,widthIn:36,xIn:20,yIn:10}]});assert.equal(deriveSpacePlan(s).measurementStatus,"approximate");s={...s,room:{widthIn:200,lengthIn:200}};const p=deriveSpacePlan(s);assert.equal(p.measurementStatus,"measured");assert.equal(p.issues.some(x=>x.type==="table-overlap"),true);});

test("activity selection adds supplies tasks zone and printable and removing it removes only those derived items",()=>{let s=createPartyState({planning:{mode:"estimated",estimatedHeadcount:10,estimatedHouseholds:4},activities:{gratitude:{name:"Gratitude cards",supplies:[{key:"cards",name:"Cards",quantityPerPerson:1,estimatedUnitCost:.5}],tasks:[{id:"set",title:"Set cards",durationMinutes:10}],zoneRequirement:"dining",printables:[{type:"gratitude-cards"}]}},selectedActivities:{gratitude:true}});let p=deriveExperiencePlan(s);assert.equal(p.supplies[0].quantity,10);assert.equal(p.tasks.length,1);assert.equal(p.printables.length,1);assert.equal(deriveShoppingList(s).some(x=>x.key==="activity:cards"),true);s={...s,selectedActivities:{}};p=deriveExperiencePlan(s);assert.equal(p.supplies.length,0);assert.equal(deriveShoppingList(s).some(x=>x.key==="activity:cards"),false);});

test("printables are live plan data and become stale after revision changes",()=>{let s=createPartyState({revision:3});const bundle=generatePrintableBundle(s);assert.ok(bundle.printables.menu);s=markPrintableGenerated(s,"menu");assert.equal(printableStatus(s,"menu").stale,false);s={...s,revision:4};assert.equal(printableStatus(s,"menu").stale,true);});

test("actual purchase cost replaces fulfilled estimate instead of double counting",()=>{let s=createPartyState({manualShoppingItems:[{id:"ice",name:"Ice",quantity:2,unit:"each",stillNeed:{quantity:2,unit:"each"}}],costCatalog:{"manual:ice":{unitCost:5}}});let b=deriveBudgetPlan(s);assert.equal(b.projectedFinal,10);s=recordPurchase(s,"manual:ice",2,"each",8);s={...s,manualShoppingItems:[{id:"ice",name:"Ice",quantity:2,unit:"each",stillNeed:{quantity:0,unit:"each"},required:{quantity:2,unit:"each"},actualCost:8,key:"manual:ice"}]};b=deriveBudgetPlan(s);assert.equal(b.projectedFinal,8);});

test("save detects stale revision and backup restore preserves the plan",()=>{const storage=memoryStorage();let s=createPartyState({event:{name:"My Thanksgiving"},tables:[{id:"t",use:"dining",seatCapacity:8}]});const first=saveState(storage,s);assert.equal(first.ok,true);assert.equal(first.state.revision,1);const stale=saveState(storage,s,{expectedRevision:0});assert.equal(stale.conflict,true);const backup=backupState(first.state),restored=restoreBackup(backup);assert.equal(restored.event.name,"My Thanksgiving");assert.equal(restored.tables.length,1);assert.equal(loadState(storage).revision,1);});

test("use last year's plan retains reusable structure but resets event-specific work",()=>{const s=createPartyState({event:{name:"2026",dinnerAt:"2026-11-26T17:00:00-08:00"},guests:[{id:"a",name:"A",rsvp:"yes",dietaryRestrictions:["vegetarian"]}],shoppingLedger:{butter:{quantity:2,unit:"cup"}},seats:{"t:seat:1":"a"},tables:[{id:"t",use:"dining",seatCapacity:4}],recipes:{x:{id:"x",title:"X",baseServings:4}},dishes:{x:{on:true,recipeId:"x",preparationMode:"homemade"}}});const n=duplicateForNewEvent(s,{name:"2027",dinnerAt:"2027-11-25T17:00:00-08:00"});assert.equal(n.event.name,"2027");assert.equal(n.guests[0].rsvp,"pending");assert.deepEqual(n.shoppingLedger,{});assert.deepEqual(n.seats,{});assert.equal(n.tables.length,1);assert.ok(n.recipes.x);});

test("derivePlan exposes the remaining connected domains",()=>{const p=derivePlan(createPartyState());for(const key of ["service","table","seating","space","experience","budget","printables"])assert.ok(p[key]);});
