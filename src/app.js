import {createPartyState} from "./domain/state.js";
import {derivePlan} from "./domain/planning.js";
import {browserStorage,loadState,saveState,backupState,restoreBackup,DEFAULT_STORAGE_KEY} from "./domain/persistence.js";
import {generatePrintableBundle,markPrintableGenerated,printableStatus,renderPrintableHtml} from "./domain/printables.js";
import {addRecipeToMenu,removeDishFromMenu,requiredServingsForDish} from "./domain/recipes.js";
import {setDishPreparationMode} from "./domain/menu.js";
import {setPantryQuantity,recordPurchase} from "./domain/shopping.js";
import {assignSeat,unassignPerson} from "./domain/seating.js";

const storage=browserStorage();
let state=(storage&&loadState(storage))||createPartyState();
let active="home";
let saveLabel=storage?"Saved locally":"Local save unavailable";

const NAV=[
 ["home","HOME"],["party","PARTY PLAN"],["menu","MENU"],["prep","PREP"],["shopping","SHOPPING"],["table","TABLE"],
 ["space","SPACE + SEATING"],["timeline","TIMELINE"],["guests","GUESTS"],["experience","EXPERIENCE"],["budget","BUDGET"],["printables","PRINTABLES"]
];
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:2});
const qty=q=>q?`${fmt(q.quantity)} ${esc(q.unit||"")}`:"—";
const csv=v=>String(v||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
const localInput=v=>v?String(v).slice(0,16):"";
const app=document.querySelector("#app");

function persist(next,{bumpRevision=true}={}){
 if(!storage){state=next;saveLabel="Local save unavailable";render();return;}
 const result=saveState(storage,next,{expectedRevision:state.revision,bumpRevision});
 if(result.ok){state=result.state;saveLabel="Saved locally";}else{state=result.current;saveLabel="Save conflict — reloaded latest";}
 render();
}
function update(mutator,options){persist(mutator(structuredClone(state)),options);}
function inventoryNumber(value){return typeof value==="number"?value:Number(value?.quantity??value?.owned)||0;}
function shoppingInventoryKey(key){return String(key||"").replace(/^(equipment|table|activity):/,"");}
function pageHeader(title,sub=""){return `<header class="pagehead page-${esc(active)}"><div class="hero-copy"><p class="eyebrow">CROW & CROWN / THANKSGIVING</p><h1>${esc(title)}</h1>${sub?`<p class="page-sub">${esc(sub)}</p>`:""}</div><div class="hero-art" aria-hidden="true"><i></i><i></i><i></i><span>HOSTING SYSTEM</span></div></header>`;}
function stat(label,value,detail=""){return `<div class="stat"><span>${esc(label)}</span><strong>${esc(value)}</strong>${detail?`<small>${esc(detail)}</small>`:""}</div>`;}
function empty(text){return `<p class="empty">${esc(text)}</p>`;}

function issueList(p){
 const issues=[];
 for(const role of p.menu.missing)issues.push(`Menu missing: ${role.replace(/-/g," ")}`);
 for(const gap of p.dietaryCoverage.gaps.slice(0,5))issues.push(`${gap.name}: ${gap.status} ${gap.role} option`);
 if(p.table.seatShortage)issues.push(`${p.table.seatShortage} dining seats still needed`);
 if(p.table.chairShortage)issues.push(`${p.table.chairShortage} chairs still needed`);
 if(p.table.highChairShortage)issues.push(`${p.table.highChairShortage} high chairs still needed`);
 for(const zone of p.space.missingZones||[])issues.push(`Set up a ${zone.replace(/-/g," ")} zone`);
 if(p.timeline.issues.length)issues.push(`${p.timeline.issues.length} timeline conflict${p.timeline.issues.length===1?"":"s"}`);
 if(p.turkey.dishId)for(const issue of p.turkey.issues)issues.push(issue.replace(/-/g," "));
 const buy=p.shopping.filter(x=>(x.remainingCanonical??0)>0).length;
 if(buy)issues.push(`${buy} shopping item${buy===1?"":"s"} still needed`);
 if(p.budget.incompletePriceLines)issues.push(`${p.budget.incompletePriceLines} budget line${p.budget.incompletePriceLines===1?"":"s"} missing price data`);
 return issues;
}

function setupView(){
 return `<main class="setup-shell"><div class="setup-card">
 <section class="setup-hero"><p class="eyebrow">CROW & CROWN / THANKSGIVING</p><div class="setup-orbit" aria-hidden="true"><i></i><i></i></div><div class="setup-copy"><span class="setup-index">01 / SETUP</span><h1>Thanksgiving,<br>already figured out.</h1><p>One quiet setup. The rest of the plan follows.</p></div></section>
 <section class="setup-form-wrap"><div class="form-intro"><span>HOSTING PROFILE</span><h2>Build the room around the dinner.</h2><p>Start with the facts that change everything else.</p></div>
 <form id="setup-form" class="form-grid">
  <label>Planning for<input name="headcount" type="number" min="1" value="${state.planning.estimatedHeadcount||12}" required></label>
  <label>Dinner time<input name="dinnerAt" type="datetime-local" value="${localInput(state.event.dinnerAt)}"></label>
  <label>Service style<select name="service"><option value="family">Family style</option><option value="buffet">Buffet</option><option value="plated">Plated</option><option value="cocktail">Cocktail / grazing</option></select></label>
  <label>Budget<input name="budget" type="number" min="0" value="${state.event.budget||0}"></label>
  <label>Ovens<input name="ovens" type="number" min="0" value="${state.event.ovens??1}"></label>
  <label>Burners<input name="burners" type="number" min="0" value="${state.event.burners??4}"></label>
  <button class="primary" type="submit">Build my plan <span>→</span></button>
 </form></section></div></main>`;
}

function homeView(p){
 const issues=issueList(p);
 return pageHeader("Thanksgiving, already figured out.","One plan. Every change recalculates what depends on it.")+
 `<section class="metric-strip">${stat("Planning for",String(p.planning.planningHeadcount),"people")}${stat("Dinner",state.event.dinnerAt?new Date(state.event.dinnerAt).toLocaleString():"Set a time")}${stat("Budget",state.event.budget?`$${fmt(state.event.budget)}`:"Set budget")}${stat("Service",p.service.style.label)}</section>
 <section class="two-col">
  <div class="panel"><div class="section-title"><span>NEEDS ATTENTION</span><strong>${issues.length}</strong></div>${issues.length?`<ul class="issue-list">${issues.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:empty("No current exceptions.")}</div>
  <div class="panel"><div class="section-title"><span>CONNECTED PLAN</span></div><dl class="compact-list">
   <div><dt>Menu roles</dt><dd>${p.menu.present.length} resolved</dd></div>
   <div><dt>Shopping</dt><dd>${p.shopping.filter(x=>(x.remainingCanonical??0)>0).length} open</dd></div>
   <div><dt>Prep</dt><dd>${p.prep.length} tasks</dd></div>
   <div><dt>Seats</dt><dd>${p.table.seatCapacity}/${p.table.requiredSeats}</dd></div>
   <div><dt>Timeline</dt><dd>${p.timeline.tasks.length} scheduled</dd></div>
   <div><dt>Projected spend</dt><dd>$${fmt(p.budget.projectedFinal)}</dd></div>
  </dl></div>
 </section>`;
}

function partyView(p){
 return pageHeader("Party plan","Edit the event facts once; every dependent section uses them.")+
 `<form class="form-grid" id="party-form">
  <label>Planning mode<select name="mode"><option value="estimated" ${state.planning.mode==="estimated"?"selected":""}>Estimated</option><option value="expected" ${state.planning.mode==="expected"?"selected":""}>Expected guests</option><option value="confirmed" ${state.planning.mode==="confirmed"?"selected":""}>Confirmed guests</option><option value="custom" ${state.planning.mode==="custom"?"selected":""}>Custom</option></select></label>
  <label>Planning headcount<input name="headcount" type="number" min="0" value="${p.planning.planningHeadcount}"></label>
  <label>Dinner time<input name="dinnerAt" type="datetime-local" value="${localInput(state.event.dinnerAt)}"></label>
  <label>Service style<select name="service">${Object.entries({family:"Family style",buffet:"Buffet",plated:"Plated",cocktail:"Cocktail / grazing"}).map(([v,l])=>`<option value="${v}" ${state.event.service===v?"selected":""}>${l}</option>`).join("")}</select></label>
  <label>Budget<input name="budget" type="number" min="0" value="${state.event.budget||0}"></label>
  <label>Ovens<input name="ovens" type="number" min="0" value="${state.event.ovens??1}"></label>
  <label>Burners<input name="burners" type="number" min="0" value="${state.event.burners??4}"></label>
  <label>Cooking helpers<input name="helpers" type="number" min="0" value="${state.event.cookingHelpers||0}"></label>
  <label>Food buffer %<input name="foodBuffer" type="number" min="0" value="${state.planning.foodBufferPercent||0}"></label>
  <label>Place-setting spare %<input name="spare" type="number" min="0" value="${state.planning.placeSettingSparePercent||0}"></label>
  <label>Event time zone<input value="${esc(state.event.timeZone||Intl.DateTimeFormat().resolvedOptions().timeZone||"browser local")}" disabled></label>
  <button class="primary" type="submit">Update plan</button>
 </form>`;
}

function menuView(p){
 const rows=Object.entries(state.dishes||{}).filter(([,d])=>d?.on).map(([id,d])=>({id,d,recipe:state.recipes?.[d.recipeId||id]})).filter(x=>x.recipe);
 return pageHeader("Menu","Selections drive portions, ingredients, shopping, prep, equipment and timing.")+
 `<div class="section-title"><span>CURRENT MENU</span><strong>${rows.length}</strong></div>
 ${rows.length?`<div class="rows">${rows.map(({id,d,recipe:r})=>`<div class="row menu-row"><div><strong>${esc(r.title)}</strong><span>${esc(r.mealRole||"uncategorized")} · plan ${fmt(requiredServingsForDish(state,id))} servings</span></div><div class="inline-actions">
   <select data-dish-mode="${esc(id)}"><option value="homemade" ${d.preparationMode==="homemade"?"selected":""}>Homemade</option><option value="purchased" ${d.preparationMode==="purchased"?"selected":""}>Purchased</option><option value="guest-provided" ${d.preparationMode==="guest-provided"?"selected":""}>Guest provided</option></select>
   ${d.preparationMode==="guest-provided"?`<select data-contribution-status="${esc(id)}"><option value="pending" ${state.menuResponsibilities?.[id]?.status==="pending"||!state.menuResponsibilities?.[id]?"selected":""}>Contribution pending</option><option value="confirmed" ${state.menuResponsibilities?.[id]?.status==="confirmed"?"selected":""}>Contribution confirmed</option><option value="arrived" ${state.menuResponsibilities?.[id]?.status==="arrived"?"selected":""}>Dish arrived</option></select>`:""}
   <button class="text-button" data-action="remove-dish" data-id="${esc(id)}">Remove</button>
  </div></div>`).join("")}</div>`:empty("No recipes selected yet. Add a custom recipe below; curated content can be loaded later.")}
 <div class="panel slim"><b>Missing roles:</b> ${p.menu.missing.length?p.menu.missing.map(x=>esc(x)).join(", "):"None"}</div>
 <form id="recipe-form" class="form-grid compact">
  <label>Recipe title<input name="title" required></label>
  <label>Meal role<select name="role"><option value="main">Main</option><option value="secondary-main">Secondary main</option><option value="starch">Starch</option><option value="vegetable">Vegetable</option><option value="fresh">Salad / fresh</option><option value="bread">Bread</option><option value="sauce-condiment">Sauce / condiment</option><option value="appetizer">Appetizer</option><option value="dessert">Dessert</option><option value="non-alcoholic-drink">Non-alcoholic drink</option></select></label>
  <label>Original servings<input name="servings" type="number" min="1" value="8" required></label>
  <label>Portion logic<select name="basis"><option value="role-share">Share this meal role</option><option value="headcount">All planned guests</option><option value="adults">Adults only</option><option value="fixed">Fixed yield</option></select></label>
  <label>Dietary tags<input name="dietary" placeholder="vegetarian, gluten-free"></label>
  <label>Allergens<input name="allergens" placeholder="dairy, peanut"></label>
  <label><input name="reviewed" type="checkbox"> Ingredients/allergens reviewed</label>
  <label><input name="isTurkey" type="checkbox"> This is the whole turkey</label>
  <label>Turkey lb/person<input name="turkeyLb" type="number" min="0" step=".05" value="1.25"></label>
  <label>Thaw hours/lb<input name="thawHours" type="number" min="0" step=".1"></label>
  <label>Cook minutes/lb<input name="cookMinutes" type="number" min="0" step=".1"></label>
  <label class="span-2">Ingredients — one per line: quantity | unit | ingredient<textarea name="ingredients" rows="5" placeholder="2 | cup | butter&#10;5 | lb | potatoes"></textarea></label>
  <label class="span-2">Tasks — title | minutes | phase | resource | temp °F<textarea name="tasks" rows="5" placeholder="Prep turkey | 25 | prep | host&#10;Roast | 210 | cook | oven | 325"></textarea></label>
  <label class="span-2">Equipment — one per line: quantity | item<textarea name="equipment" rows="3" placeholder="1 | roasting pan&#10;1 | thermometer"></textarea></label>
  <label class="span-2">Serving pieces — one per line: quantity | item<textarea name="serving" rows="3" placeholder="1 | platter&#10;1 | carving knife"></textarea></label>
  <button class="primary" type="submit">Add to menu</button>
 </form>`;
}

function prepView(p){
 return pageHeader("Prep","Generated from current recipes, responsibility, activities and service setup.")+
 (p.prep.length?`<div class="rows">${p.prep.map(t=>`<div class="row"><div><strong>${esc(t.title)}</strong><span>${esc(t.recipeTitle||t.source||"manual")}</span></div><div>${t.durationMinutes?fmt(t.durationMinutes)+" min":t.needsDuration?"needs duration":""}</div></div>`).join("")}</div>`:empty("Prep tasks appear when recipes or activities are added."));
}

function shoppingView(p){
 return pageHeader("Shopping","Required − already have − purchased = still need. Purchases stay committed when the plan changes.")+
 (p.shopping.length?`<div class="shopping-head"><span>ITEM</span><span>REQUIRED</span><span>HAVE</span><span>PURCHASED</span><span>STILL NEED</span><span>COST</span></div><div class="shopping-rows">${p.shopping.map(x=>{
  const sources=(x.sources||[]).map(s=>s.recipeTitle||s.activityId||s.source).filter(Boolean);
  const canHave=!["prepared-food","turkey"].includes(x.kind);
  return `<form class="shopping-line" data-shopping-key="${esc(x.key)}" data-kind="${esc(x.kind||"")}"><div><strong>${esc(x.name||x.key)}</strong><span>${esc(x.kind||"")}</span>${sources.length?`<details><summary>Used for ${sources.length}</summary><small>${esc([...new Set(sources)].join(", "))}</small></details>`:""}</div>
   <div>${qty(x.required)}</div>
   <label class="mini-label">${canHave?`<input name="have" type="number" min="0" step="any" value="${fmt(x.alreadyHave?.quantity||0)}"><small>${esc(x.alreadyHave?.unit||x.unit||"")}</small>`:"—"}</label>
   <label class="mini-label"><input name="purchased" type="number" min="0" step="any" value="${fmt(x.purchased?.quantity||0)}"><small>${esc(x.purchased?.unit||x.unit||"")}</small></label>
   <div><b>${qty(x.stillNeed)}</b>${x.surplusCanonical>0?`<small>surplus ${qty(x.surplus)}</small>`:""}</div>
   <label class="mini-label"><small>Committed $</small><input name="committed" type="number" min="0" step=".01" value="${x.committedCost||""}"><small>Paid $</small><input name="actual" type="number" min="0" step=".01" value="${x.actualCost||""}"><button class="text-button" type="submit">Save</button></label>
  </form>`;
 }).join("")}</div>`:empty("No shopping requirements yet."))+
 `<form id="manual-shopping-form" class="form-grid compact"><label>Manual item<input name="name" required></label><label>Quantity<input name="quantity" type="number" min="0" step="any" value="1"></label><label>Unit<input name="unit" value="each"></label><button class="primary" type="submit">Add item</button></form>`;
}

function tableView(p){
 return pageHeader("Table","Dining capacity, chairs, place settings and linen fit share one inventory.")+
 `<section class="metric-strip">${stat("Seats required",String(p.table.requiredSeats))}${stat("Table capacity",String(p.table.seatCapacity))}${stat("Chairs missing",String(p.table.chairShortage))}${stat("Settings",String(p.table.placeSettingCount))}</section>
 <div class="section-title"><span>TABLES + ZONES</span><strong>${p.table.tables.length}</strong></div>
 ${p.table.tables.length?`<div class="rows">${p.table.tables.map(t=>{const l=p.table.linens.find(x=>x.tableId===t.id),r=l?.requirement||{};return `<div class="row"><div><strong>${esc(t.id)}</strong><span>${esc(t.use)} · ${esc(t.shape)} · seats ${t.seatCapacity}</span></div><div class="inline-actions">${t.use==="dining"?(t.shape==="round"?`<span>linen Ø ${fmt(r.diameterIn)}"</span>`:`<span>linen ${fmt(r.lengthIn)} × ${fmt(r.widthIn)}"</span>`):""}<button class="text-button" data-action="remove-table" data-id="${esc(t.id)}">Remove</button></div></div>`;}).join("")}</div>`:empty("Add a table or service zone below.")}
 <form id="inventory-form" class="form-grid compact">
  <label>Chairs owned / secured<input name="chairs" type="number" min="0" value="${inventoryNumber(state.inventory?.chairs)}"></label>
  <label>High chairs<input name="highchairs" type="number" min="0" value="${inventoryNumber(state.inventory?.["high-chairs"])}"></label>
  <label>Dinner plates<input name="plates" type="number" min="0" value="${inventoryNumber(state.inventory?.["dinner-plates"])}"></label>
  <label>Dessert plates<input name="dessert" type="number" min="0" value="${inventoryNumber(state.inventory?.["dessert-plates"])}"></label>
  <label>Forks<input name="forks" type="number" min="0" value="${inventoryNumber(state.inventory?.forks)}"></label>
  <label>Knives<input name="knives" type="number" min="0" value="${inventoryNumber(state.inventory?.knives)}"></label>
  <label>Glasses<input name="glasses" type="number" min="0" value="${inventoryNumber(state.inventory?.glasses)}"></label>
  <label>Napkins<input name="napkins" type="number" min="0" value="${inventoryNumber(state.inventory?.napkins)}"></label>
  <button class="primary" type="submit">Update inventory</button>
 </form>
 <form id="table-form" class="form-grid compact">
  <label>ID<input name="id" placeholder="dining-1"></label>
  <label>Use<select name="use"><option value="dining">Dining</option><option value="buffet">Buffet</option><option value="drinks">Drinks</option><option value="dessert">Dessert</option><option value="activity">Activity</option><option value="grazing">Grazing</option><option value="kitchen-staging">Kitchen staging</option></select></label>
  <label>Shape<select name="shape"><option value="rectangle">Rectangle</option><option value="round">Round</option></select></label>
  <label>Seats<input name="seats" type="number" min="0" value="8"></label>
  <label>Length in<input name="length" type="number" min="0" value="72"></label>
  <label>Width in<input name="width" type="number" min="0" value="36"></label>
  <label>Diameter in<input name="diameter" type="number" min="0"></label>
  <label>Linen drop in<input name="drop" type="number" min="0" value="12"></label>
  <button class="primary" type="submit">Add table / zone</button>
 </form>`;
}

function spaceView(p){
 const byPerson=new Map(p.seating.namedPeople.map(x=>[x.personId,x]));
 return pageHeader("Space + seating","Assign each named guest once. Projected unnamed guests remain visible as placeholders.")+
 `<section class="metric-strip">${stat("Seats",`${p.seating.availableSeatCount}/${p.table.requiredSeats}`)}${stat("Unassigned named",String(p.seating.unassigned.length))}${stat("Planning placeholders",String(p.seating.placeholderCount))}${stat("Layout",p.space.measurementStatus)}</section>
 <form id="room-form" class="form-grid compact"><label>Room width in<input name="width" type="number" min="0" value="${state.room?.widthIn||0}"></label><label>Room length in<input name="length" type="number" min="0" value="${state.room?.lengthIn||0}"></label><button class="primary" type="submit">Update room</button></form>
 <div class="section-title"><span>SEATS</span><strong>${p.seating.seatIds.length}</strong></div>
 ${p.seating.seatIds.length?`<div class="rows">${p.seating.seatIds.map(seatId=>{const personId=p.seating.assignments[seatId],person=byPerson.get(personId);return `<div class="row"><div><strong>${esc(seatId)}</strong><span>${person?esc(person.name):"Open"}</span></div><div class="inline-actions">${person?`<button class="text-button" data-action="unassign-seat" data-person="${esc(personId)}">Unassign</button>`:`<select data-seat-select="${esc(seatId)}"><option value="">Assign guest…</option>${p.seating.unassigned.map(x=>`<option value="${esc(x.personId)}">${esc(x.name)}</option>`).join("")}</select>`}</div></div>`;}).join("")}</div>`:empty("Add dining tables before assigning seats.")}
 <div class="two-col top-gap"><div class="panel"><div class="section-title"><span>ZONES</span></div>${p.space.zones.map(z=>`<div class="micro-row"><span>${esc(z.label||z.id)}</span><b>${esc(z.status||"defined")}</b></div>`).join("")||empty("No zones yet.")}</div><div class="panel"><div class="section-title"><span>SPACE ISSUES</span></div>${p.space.issues.length?p.space.issues.map(x=>`<div class="micro-row"><span>${esc(x.type)}</span><b>${esc((x.ids||[x.id]).filter(Boolean).join(", "))}</b></div>`).join(""):empty("No measured-space conflicts.")}</div></div>`;
}

function timelineView(p){
 return pageHeader("Timeline","Generated timing stays editable; fixed times remain fixed when dinner moves.")+
 (p.timeline.tasks.length?`<div class="rows timeline">${p.timeline.tasks.map(t=>`<form class="row ${t.conflict?"conflict":""}" data-task-form="${esc(t.taskId)}"><div><strong>${esc(t.title)}</strong><span>${esc(t.recipeTitle||t.source||"manual")} ${t.assignments?.length?`· ${esc(t.assignments.map(a=>a.resourceId).join(", "))}`:""}</span></div><div class="task-edit"><label>Minutes<input name="duration" type="number" min="0" value="${t.durationMinutes||0}"></label><label>Pin time<input name="fixed" type="datetime-local" value="${localInput(t.fixedStart||"")}"></label><button class="text-button" type="submit">Save</button></div></form>`).join("")}</div>`:empty("Timed recipe tasks appear here."))+
 `<form id="manual-task-form" class="form-grid compact"><label>Manual task<input name="title" required></label><label>Minutes<input name="duration" type="number" min="0" value="15"></label><label>Fixed time<input name="fixed" type="datetime-local"></label><button class="primary" type="submit">Add task</button></form>`;
}

function guestsView(){
 return pageHeader("Guests","RSVP, children, plus-ones, dietary needs and allergies feed the same plan.")+
 `<div class="section-title"><span>GUEST LIST</span><strong>${state.guests.length}</strong></div>
 ${state.guests.length?`<div class="rows">${state.guests.map((g,index)=>`<div class="row"><div><strong>${esc(g.name)}</strong><span>${esc(g.type||"adult")} · ${esc((g.dietaryRestrictions||[]).join(", ")||"no dietary notes")} ${(g.allergies||[]).length?`· allergies: ${esc(g.allergies.join(", "))}`:""}</span></div><div class="inline-actions"><select data-guest-rsvp="${index}"><option value="pending" ${g.rsvp==="pending"?"selected":""}>Pending</option><option value="yes" ${g.rsvp==="yes"?"selected":""}>Attending</option><option value="no" ${g.rsvp==="no"?"selected":""}>Not attending</option></select><button class="text-button" data-action="remove-guest" data-index="${index}">Remove</button></div></div>`).join("")}</div>`:empty("No named guests yet. Projected headcount still drives quantities.")}
 <form id="guest-form" class="form-grid compact">
  <label>Name<input name="name" required></label><label>RSVP<select name="rsvp"><option value="pending">Pending</option><option value="yes">Attending</option><option value="no">Not attending</option></select></label><label>Type<select name="type"><option value="adult">Adult</option><option value="child">Child</option></select></label>
  <label>Dietary needs<input name="dietary" placeholder="vegetarian, gluten-free"></label><label>Allergies<input name="allergies" placeholder="peanut, shellfish"></label>
  <label>Plus one<select name="plus"><option value="0">No</option><option value="1">Yes</option></select></label><label>+1 dietary needs<input name="plusDietary"></label><label>+1 allergies<input name="plusAllergies"></label>
  <label>Children in household<input name="kids" type="number" min="0" value="0"></label><label>High chairs<input name="highchairs" type="number" min="0" value="0"></label>
  <button class="primary" type="submit">Add guest</button>
 </form>`;
}

function experienceView(p){
 return pageHeader("Experience","Activities can add supplies, setup work, space needs and printables.")+
 `<section class="metric-strip">${stat("Selected",String(p.experience.selectedCount))}${stat("Households",String(p.experience.households))}${stat("Supplies",String(p.experience.supplies.length))}${stat("Printables",String(p.experience.printables.length))}</section>
 ${Object.keys(state.activities||{}).length?`<div class="rows">${Object.entries(state.activities).map(([id,a])=>`<div class="row"><div><strong>${esc(a.name||id)}</strong><span>${esc(a.zoneRequirement||"")}</span></div><button class="text-button" data-action="toggle-activity" data-id="${esc(id)}">${state.selectedActivities?.[id]?"Remove":"Add"}</button></div>`).join("")}</div>`:empty("No activities yet. Add one below.")}
 <form id="activity-form" class="form-grid compact"><label>Activity name<input name="name" required></label><label>Supply<input name="supply" placeholder="Conversation cards"></label><label>Supply per person<input name="perPerson" type="number" min="0" step="any" value="1"></label><label>Setup task<input name="task" placeholder="Set out cards"></label><label>Setup minutes<input name="minutes" type="number" min="0" value="10"></label><label>Zone<input name="zone" placeholder="dining"></label><button class="primary" type="submit">Add activity</button></form>`;
}

function budgetView(p){
 return pageHeader("Budget","Estimated, committed and paid amounts stay separate so purchases are not double-counted.")+
 `<section class="metric-strip">${stat("Target",p.budget.target?`$${fmt(p.budget.target)}`:"—")}${stat("Projected",`$${fmt(p.budget.projectedFinal)}`)}${stat("Committed",`$${fmt(p.budget.totalCommitted)}`)}${stat("Paid",`$${fmt(p.budget.totalActual)}`)}</section>
 ${p.budget.incompletePriceLines?`<div class="panel slim"><b>${p.budget.incompletePriceLines}</b> open item${p.budget.incompletePriceLines===1?"":"s"} still need price information.</div>`:""}
 ${p.budget.lines.length?`<div class="rows">${p.budget.lines.map(x=>`<div class="row"><div><strong>${esc(x.label||x.id)}</strong><span>${esc(x.category)}</span></div><div><small>est $ ${fmt(x.estimated)} · committed $ ${fmt(x.committed)} · paid $ ${fmt(x.actual)}</small><b> forecast $ ${fmt(x.forecast)}</b></div></div>`).join("")}</div>`:empty("Budget lines appear from shopping and manual entries.")}`;
}

function printablesView(){
 const bundle=generatePrintableBundle(state);
 return pageHeader("Printables","Generated from the current plan; changed plans mark older outputs stale.")+
 `<div class="print-grid">${Object.entries(bundle.printables).map(([type,item])=>{const status=printableStatus(state,type);return `<button class="print-card" data-action="print" data-type="${esc(type)}"><span>${esc(item.title)}</span><small>${status.stale?"Outdated — regenerate":status.generated?"Current":"Not generated"} · plan r${state.revision}</small></button>`;}).join("")}</div>
 <div class="backup-actions"><button class="secondary" data-action="backup">Download plan backup</button><label class="secondary file-label">Restore backup<input id="restore-input" type="file" accept="application/json"></label><button class="secondary danger" data-action="reset">Reset event</button></div>`;
}

function view(p){
 const views={home:()=>homeView(p),party:()=>partyView(p),menu:()=>menuView(p),prep:()=>prepView(p),shopping:()=>shoppingView(p),table:()=>tableView(p),space:()=>spaceView(p),timeline:()=>timelineView(p),guests:()=>guestsView(),experience:()=>experienceView(p),budget:()=>budgetView(p),printables:()=>printablesView()};
 return (views[active]||views.home)();
}

function render(){
 if(!state.setupCompleted){app.innerHTML=setupView();bind();return;}
 const p=derivePlan(state);
 app.innerHTML=`<div class="app-shell"><aside class="sidebar"><div class="brand-lockup"><span class="brand-mark">C+C</span><div><b>CROW & CROWN</b><span>THANKSGIVING</span></div></div><nav>${NAV.map(([id,label],index)=>`<button data-nav="${id}" class="${active===id?"active":""}"><span class="nav-no">${String(index+1).padStart(2,"0")}</span><span class="nav-label">${label}</span></button>`).join("")}</nav><div class="save-state"><i></i>${esc(saveLabel)}</div></aside><main class="workspace">${view(p)}</main></div>`;
 bind();
}

function bind(){
 app.querySelector("#setup-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);persist({...state,setupCompleted:true,event:{...state.event,service:f.get("service"),budget:Number(f.get("budget"))||0,dinnerAt:f.get("dinnerAt")||null,ovens:Math.max(0,Number(f.get("ovens"))||0),burners:Math.max(0,Number(f.get("burners"))||0),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone||null},planning:{...state.planning,mode:"estimated",estimatedHeadcount:Math.max(1,Number(f.get("headcount"))||1)}});});
 app.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.nav;render();}));
 app.querySelector("#party-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),mode=String(f.get("mode")),headcount=Math.max(0,Number(f.get("headcount"))||0);update(x=>({...x,event:{...x.event,service:f.get("service"),budget:Number(f.get("budget"))||0,dinnerAt:f.get("dinnerAt")||null,ovens:Math.max(0,Number(f.get("ovens"))||0),burners:Math.max(0,Number(f.get("burners"))||0),cookingHelpers:Math.max(0,Number(f.get("helpers"))||0),timeZone:x.event.timeZone||Intl.DateTimeFormat().resolvedOptions().timeZone||null},planning:{...x.planning,mode,[mode==="custom"?"customHeadcount":"estimatedHeadcount"]:headcount,foodBufferPercent:Math.max(0,Number(f.get("foodBuffer"))||0),placeSettingSparePercent:Math.max(0,Number(f.get("spare"))||0)}}));});
 app.querySelector("#recipe-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=`custom-${crypto.randomUUID()}`;
  const ingredients=String(f.get("ingredients")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[2]).map(([quantity,unit,name])=>({name,quantity:Number(quantity)||0,unit:unit||"each"}));
  const tasks=String(f.get("tasks")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[0]).map(([title,minutes,phase,resource,temp])=>({title,durationMinutes:Number(minutes)||0,phase:phase||"prep",resourceRequirements:resource?[{type:resource,temperatureF:temp?Number(temp):undefined}]:[]}));
  const equipment=String(f.get("equipment")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[1]).map(([quantity,name])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name,quantity:Number(quantity)||1}));
  const servingRequirements=String(f.get("serving")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[1]).map(([quantity,name])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name,quantity:Number(quantity)||1}));
  const isTurkey=f.get("isTurkey")==="on",thaw=Number(f.get("thawHours")),cook=Number(f.get("cookMinutes"));
  update(x=>addRecipeToMenu(x,{id,title:String(f.get("title")),mealRole:String(f.get("role")),baseServings:Math.max(1,Number(f.get("servings"))||1),servingStrategy:{basis:String(f.get("basis"))},ingredients,prepTasks:tasks,equipment,servingRequirements,dietaryTags:csv(f.get("dietary")),allergens:csv(f.get("allergens")),metadataReviewed:f.get("reviewed")==="on",allergenReviewed:f.get("reviewed")==="on",isTurkey,turkeyRules:isTurkey?{poundsPerPerson:Math.max(0,Number(f.get("turkeyLb"))||1.25),...(Number.isFinite(thaw)&&thaw>0?{thawHoursPerPound:thaw}:{}),...(Number.isFinite(cook)&&cook>0?{cookMinutesPerPound:cook}:{})}:undefined}));});
 app.querySelectorAll("[data-dish-mode]").forEach(el=>el.addEventListener("change",()=>update(x=>{let next=setDishPreparationMode(x,el.dataset.dishMode,el.value);if(el.value!=="guest-provided"){const responsibilities={...(next.menuResponsibilities||{})};delete responsibilities[el.dataset.dishMode];next={...next,menuResponsibilities:responsibilities};}return next;})));
 app.querySelectorAll("[data-contribution-status]").forEach(el=>el.addEventListener("change",()=>update(x=>({...x,menuResponsibilities:{...(x.menuResponsibilities||{}),[el.dataset.contributionStatus]:{ownerType:"guest",status:el.value}}}))));
 app.querySelectorAll('[data-action="remove-dish"]').forEach(b=>b.addEventListener("click",()=>update(x=>removeDishFromMenu(x,b.dataset.id))));
 app.querySelectorAll(".shopping-line").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(form),key=form.dataset.shoppingKey,kind=form.dataset.kind,row=derivePlan(state).shopping.find(x=>x.key===key),unit=row?.required?.unit||row?.unit||"each",have=Math.max(0,Number(f.get("have"))||0),purchased=Math.max(0,Number(f.get("purchased"))||0),committed=Math.max(0,Number(f.get("committed"))||0),actual=Math.max(0,Number(f.get("actual"))||0);update(x=>{let next=x;if(kind==="ingredient"||kind==="manual")next=setPantryQuantity(next,key,have,unit);else if(!["prepared-food","turkey"].includes(kind)){if(key.startsWith("table:linen:")&&row?.requirement){const id=`shopping-${key}`,linens=(next.inventory?.linens||[]).filter(item=>item.id!==id);if(have>0){const req=row.requirement;linens.push(req.shape==="round"?{id,shape:"round",diameterIn:req.diameterIn,quantity:Math.ceil(have)}:{id,shape:"rectangle",lengthIn:req.lengthIn,widthIn:req.widthIn,quantity:Math.ceil(have)});}next={...next,inventory:{...(next.inventory||{}),linens}};}else{const invKey=shoppingInventoryKey(key);next={...next,inventory:{...(next.inventory||{}),[invKey]:{quantity:have}}};}}return recordPurchase(next,key,purchased,unit,actual,committed);});}));
 app.querySelector("#manual-shopping-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(x=>({...x,manualShoppingItems:[...(x.manualShoppingItems||[]),{id:crypto.randomUUID(),name:String(f.get("name")),quantity:Math.max(0,Number(f.get("quantity"))||0),unit:String(f.get("unit")||"each")}]}));});
 app.querySelector("#inventory-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(x=>({...x,inventory:{...(x.inventory||{}),chairs:{quantity:Number(f.get("chairs"))||0},"high-chairs":{quantity:Number(f.get("highchairs"))||0},"dinner-plates":{quantity:Number(f.get("plates"))||0},"dessert-plates":{quantity:Number(f.get("dessert"))||0},forks:{quantity:Number(f.get("forks"))||0},knives:{quantity:Number(f.get("knives"))||0},glasses:{quantity:Number(f.get("glasses"))||0},napkins:{quantity:Number(f.get("napkins"))||0}}}));});
 app.querySelector("#table-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=String(f.get("id")||`table-${state.tables.length+1}`);update(x=>({...x,tables:[...x.tables,{id,use:String(f.get("use")||"dining"),shape:f.get("shape"),seatCapacity:Number(f.get("seats"))||0,lengthIn:Number(f.get("length"))||0,widthIn:Number(f.get("width"))||0,diameterIn:Number(f.get("diameter"))||0,linenDropIn:Number(f.get("drop"))||0}]}));});
 app.querySelectorAll('[data-action="remove-table"]').forEach(b=>b.addEventListener("click",()=>update(x=>({...x,tables:x.tables.filter(t=>String(t.id)!==b.dataset.id)}))));
 app.querySelector("#room-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(x=>({...x,room:{...x.room,widthIn:Number(f.get("width"))||0,lengthIn:Number(f.get("length"))||0}}));});
 app.querySelectorAll("[data-seat-select]").forEach(el=>el.addEventListener("change",()=>{if(el.value)update(x=>assignSeat(x,el.value,el.dataset.seatSelect));}));
 app.querySelectorAll('[data-action="unassign-seat"]').forEach(b=>b.addEventListener("click",()=>update(x=>unassignPerson(x,b.dataset.person))));
 app.querySelectorAll("[data-task-form]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(form),id=form.dataset.taskForm;update(x=>({...x,taskOverrides:{...(x.taskOverrides||{}),[id]:{...(x.taskOverrides?.[id]||{}),durationMinutes:Math.max(0,Number(f.get("duration"))||0),fixedStart:f.get("fixed")||null}}}));}));
 app.querySelector("#manual-task-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(x=>({...x,manualTasks:[...(x.manualTasks||[]),{id:`manual-${crypto.randomUUID()}`,title:String(f.get("title")),durationMinutes:Math.max(0,Number(f.get("duration"))||0),fixedStart:f.get("fixed")||null}]}));});
 app.querySelector("#guest-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(x=>({...x,guests:[...x.guests,{id:crypto.randomUUID(),name:String(f.get("name")),rsvp:f.get("rsvp"),type:f.get("type"),dietaryRestrictions:csv(f.get("dietary")),allergies:csv(f.get("allergies")),plus:Number(f.get("plus"))?1:0,plusDietaryRestrictions:csv(f.get("plusDietary")),plusAllergies:csv(f.get("plusAllergies")),kids:Math.max(0,Number(f.get("kids"))||0),highChairs:Math.max(0,Number(f.get("highchairs"))||0)}]}));});
 app.querySelectorAll("[data-guest-rsvp]").forEach(el=>el.addEventListener("change",()=>update(x=>{const guests=[...x.guests],i=Number(el.dataset.guestRsvp);guests[i]={...guests[i],rsvp:el.value};return {...x,guests};})));
 app.querySelectorAll('[data-action="remove-guest"]').forEach(b=>b.addEventListener("click",()=>update(x=>({...x,guests:x.guests.filter((_,i)=>i!==Number(b.dataset.index))}))));
 app.querySelectorAll('[data-action="toggle-activity"]').forEach(b=>b.addEventListener("click",()=>update(x=>{const selected={...(x.selectedActivities||{})};if(selected[b.dataset.id])delete selected[b.dataset.id];else selected[b.dataset.id]=true;return {...x,selectedActivities:selected};})));
 app.querySelector("#activity-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=`activity-${crypto.randomUUID()}`,supply=String(f.get("supply")||"").trim(),task=String(f.get("task")||"").trim();update(x=>({...x,activities:{...(x.activities||{}),[id]:{name:String(f.get("name")),supplies:supply?[{key:supply.toLowerCase().replace(/\s+/g,"-"),name:supply,quantityPerPerson:Math.max(0,Number(f.get("perPerson"))||0)}]:[],tasks:task?[{id:"setup",title:task,durationMinutes:Math.max(0,Number(f.get("minutes"))||0)}]:[],zoneRequirement:String(f.get("zone")||"").trim()||null,printables:[]}},selectedActivities:{...(x.selectedActivities||{}),[id]:true}}));});
 app.querySelectorAll('[data-action="print"]').forEach(b=>b.addEventListener("click",()=>{const bundle=generatePrintableBundle(state),item=bundle.printables[b.dataset.type];if(!item)return;const w=window.open("","_blank");if(w){w.document.write(renderPrintableHtml(item));w.document.close();w.focus();w.print();}update(x=>markPrintableGenerated(x,b.dataset.type),{bumpRevision:false});}));
 app.querySelector('[data-action="backup"]')?.addEventListener("click",()=>{const blob=new Blob([backupState(state)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="crow-crown-thanksgiving-backup.json";a.click();URL.revokeObjectURL(a.href);});
 app.querySelector("#restore-input")?.addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{persist(restoreBackup(await file.text()));}catch{saveLabel="Backup could not be restored";render();}});
 app.querySelector('[data-action="reset"]')?.addEventListener("click",()=>{if(confirm("Reset this event? Download a backup first if you want to keep it.")){storage?.removeItem?.(DEFAULT_STORAGE_KEY);state=createPartyState();saveLabel="Reset";active="home";render();}});
}

render();
