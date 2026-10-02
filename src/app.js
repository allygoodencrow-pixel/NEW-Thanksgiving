import {createPartyState} from "./domain/state.js";
import {derivePlan} from "./domain/planning.js";
import {browserStorage,loadState,saveState,backupState,restoreBackup,DEFAULT_STORAGE_KEY} from "./domain/persistence.js";
import {generatePrintableBundle,markPrintableGenerated,printableStatus,renderPrintableHtml} from "./domain/printables.js";
import {addRecipeToMenu,removeDishFromMenu,requiredServingsForDish} from "./domain/recipes.js";
import {setDishPreparationMode} from "./domain/menu.js";
import {setPantryQuantity,setOwnedQuantity,recordPurchase} from "./domain/shopping.js";
import {assignSeat,unassignPerson} from "./domain/seating.js";
import {updateGuest,removeGuest} from "./domain/guests.js";
import {ORIGINAL_CATALOG,SIGNATURE_MENU,SUPPORTED_SIGNATURE_IDS,catalogRecipe,withCatalog,withSignatureMenu} from "./catalog/thanksgiving.js";

const storage=browserStorage();
let state=(storage&&loadState(storage))||createPartyState();
let active="home";
let saveLabel=storage?"Saved locally":"Local save unavailable";

const NAV=[["home","HOME"],["menu","MENU"],["shopping","SHOPPING"],["timeline","TIMELINE"],["guests","GUESTS"]];
const MORE=[["prep","Prep"],["table","Table"],["space","Seating"],["experience","Experience"],["budget","Budget"],["printables","Printables"],["party","Party settings"]];
const catalogImage=id=>id==="turkey"||id==="ba-dry-turkey"?"old-bird":id==="potatoes"||id==="ba-mashed"||id==="sweet"?"old-potatoes":id==="salad"||id==="app"?"old-salad":"old-feast";
let sheet=null;
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:2});
const qty=q=>q?`${fmt(q.quantity)} ${esc(q.unit||"")}`:"—";
const csv=v=>String(v||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
const localInput=v=>v?String(v).slice(0,16):"";
function suggestedDinner(){let year=new Date().getFullYear();const day=y=>1+(4-new Date(y,10,1).getDay()+7)%7+21;if(new Date(year,10,day(year),16,30)<new Date())year++;return `${year}-11-${String(day(year)).padStart(2,"0")}T16:30`;}
const app=document.querySelector("#app");
const YEAR=new Date().getFullYear();
const SHOP_URL="https://thecrowandcrown.com/";

function persist(next,{bumpRevision=true}={}){
 if(!storage){state=next;saveLabel="Local save unavailable";render();return;}
 const result=saveState(storage,next,{expectedRevision:state.revision,bumpRevision});
 if(result.ok){state=result.state;saveLabel="Saved locally";}else{state=result.current;saveLabel="Save conflict — reloaded latest";}
 render();
}
function update(mutator,options){persist(mutator(structuredClone(state)),options);}
function inventoryNumber(value){return typeof value==="number"?value:Number(value?.quantity??value?.owned)||0;}
function shoppingInventoryKey(key){return String(key||"").replace(/^(equipment|table|activity):/,"");}
function pageHeader(title,sub=""){return `<header class="pagehead page-${esc(active)}"><p class="eyebrow">THE ART OF HAVING PEOPLE OVER / ${YEAR}</p><h1>${esc(title)}</h1></header>`;}
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
  <label>Dinner time<input name="dinnerAt" type="datetime-local" value="${localInput(state.event.dinnerAt)||suggestedDinner()}"></label>
  <label>Service style<select name="service"><option value="family">Family style</option><option value="buffet">Buffet</option><option value="plated">Plated</option><option value="cocktail">Cocktail / grazing</option></select></label>
  <label>Budget<input name="budget" type="number" min="0" value="${state.event.budget||0}"></label>
  <label>Ovens<input name="ovens" type="number" min="0" value="${state.event.ovens??1}"></label>
  <label>Burners<input name="burners" type="number" min="0" value="${state.event.burners??4}"></label>
  <button class="primary" type="submit">Build my plan <span>→</span></button>
 </form></section></div></main>`;
}

function homeView(p){
 const issues=issueList(p);
 const dinner=state.event.dinnerAt?new Date(state.event.dinnerAt).toLocaleString(undefined,{month:"long",day:"numeric",hour:"numeric",minute:"2-digit"}):"Set dinner time";
 return `<section class="home-photo"><div class="photo-top">C | C <span>THE THANKSGIVING EDIT</span></div><div class="photo-title"><span>YOUR HOSTING PLAN</span><h1>Thanksgiving,<br>already figured out.</h1></div></section>
 <section class="home-sheet"><div class="sheet-handle"></div><p class="kicker">THE PLAN / AT A GLANCE</p><div class="home-event"><div><strong>${esc(dinner)}</strong><span>${p.planning.planningHeadcount} guests · ${esc(p.service.style.label)}</span></div><button class="circle-arrow" data-nav="party" aria-label="Edit party settings">↗</button></div>
 <div class="next-action"><span>NEXT UP</span><strong>${esc(issues[0]||"Your plan is looking good.")}</strong><button data-nav="${issues[0]?.startsWith("Menu")?"menu":"shopping"}">TAKE A LOOK →</button></div>
 <div class="quick-links"><button data-nav="menu"><span>01 / THE FOOD</span><b>Menu ↗</b></button><button data-nav="shopping"><span>02 / THE LIST</span><b>Shopping ↗</b></button><button data-nav="timeline"><span>03 / THE DAY</span><b>Timeline ↗</b></button></div>
 ${issues.length>1?`<div class="attention"><span>ALSO ON YOUR RADAR</span>${issues.slice(1,4).map(x=>`<p>${esc(x)}</p>`).join("")}</div>`:""}</section>`;
}

function partyView(p){
 return pageHeader("Party plan","Edit the event facts once; every dependent section uses them.")+
 `<form class="form-grid" id="party-form">
  <label>Planning mode<select name="mode"><option value="estimated" ${state.planning.mode==="estimated"?"selected":""}>Estimated</option><option value="expected" ${state.planning.mode==="expected"?"selected":""}>Expected guests</option><option value="confirmed" ${state.planning.mode==="confirmed"?"selected":""}>Confirmed guests</option><option value="custom" ${state.planning.mode==="custom"?"selected":""}>Custom</option></select></label>
  <label>Planning headcount<input name="headcount" type="number" min="0" value="${p.planning.planningHeadcount}"></label>
  <label>Dinner time<input name="dinnerAt" type="datetime-local" value="${localInput(state.event.dinnerAt)||suggestedDinner()}"></label>
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
 return pageHeader("The menu")+`<div class="editorial-lead"><span>${rows.length} DISHES IN YOUR PLAN</span><button class="pill dark" data-sheet="recipe">+ CUSTOM DISH</button></div><div class="feature-food"><div><span>ON THE TABLE</span><strong>Good food.<br>Good company.</strong></div></div><div class="pills"><span class="pill dark">THE EDIT · ${SUPPORTED_SIGNATURE_IDS.length} READY TO PLAN</span><span class="pill">${ORIGINAL_CATALOG.length-SUPPORTED_SIGNATURE_IDS.length} SOURCE REFERENCES</span></div>`+
 `<div class="section-title"><span>CURRENT MENU</span><strong>${rows.length}</strong></div>
 ${!rows.length?`<button class="pill dark signature-action" data-action="signature-menu">START WITH THE SIGNATURE MENU →</button>`:""}
 <div class="rows">${ORIGINAL_CATALOG.map((item,i)=>{const id=item.id,d=state.dishes?.[id],r=state.recipes?.[id]||catalogRecipe(item),on=!!d?.on,supported=SUPPORTED_SIGNATURE_IDS.includes(id);return `<div class="row menu-row ${supported?"":"reference-only"}"><div class="dish-photo" style="background-image:url('/images/${catalogImage(id)}.jpeg')"></div><div><small>${esc(item.group)}</small><strong>${esc(r.title)}</strong><span>${on?`${fmt(requiredServingsForDish(state,id))} servings · `:""}${esc(item.minutes)} min · $${esc(item.cost)} est.</span>${item.tags?.length?`<span>${esc(item.tags.slice(0,3).join(" · "))}</span>`:""}</div><button class="pill ${on?"selected":""}" data-action="toggle-catalog" data-id="${esc(id)}" ${!supported&&!on?"disabled":""}>${on?"✓ IN PLAN":supported?"+ ADD":"REFERENCE ONLY"}</button><details class="catalog-detail"><summary>VIEW RECIPE →</summary><p>${esc(item.portion||"")}</p><p>${esc(item.makeAhead||"")}</p><ul>${item.ingredients.map(([name,quantity,unit])=>`<li>${esc(name)} · ${fmt(quantity)} ${esc(unit)} per guest</li>`).join("")}</ul>${item.sourceUrl?`<a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">FULL RECIPE SOURCE ↗</a>`:""}</details>${on?`<div class="dish-edit"><div class="inline-actions">
   <select data-dish-mode="${esc(id)}"><option value="homemade" ${d.preparationMode==="homemade"?"selected":""}>Homemade</option><option value="purchased" ${d.preparationMode==="purchased"?"selected":""}>Purchased</option><option value="guest-provided" ${d.preparationMode==="guest-provided"?"selected":""}>Guest provided</option></select>
   ${d.preparationMode==="guest-provided"?`<select data-contribution-guest="${esc(id)}"><option value="">Choose contributor</option>${state.guests.filter(g=>g.rsvp==="yes").map(g=>`<option value="${esc(g.guestId||g.id)}" ${String(state.menuResponsibilities?.[id]?.contributorGuestId||"")===String(g.guestId||g.id)?"selected":""}>${esc(g.name)}</option>`).join("")}</select><select data-contribution-status="${esc(id)}"><option value="pending" ${state.menuResponsibilities?.[id]?.status==="pending"||!state.menuResponsibilities?.[id]?"selected":""}>Contribution pending</option><option value="confirmed" ${state.menuResponsibilities?.[id]?.status==="confirmed"?"selected":""}>Contribution confirmed</option><option value="arrived" ${state.menuResponsibilities?.[id]?.status==="arrived"?"selected":""}>Dish arrived</option></select>`:""}
   <button class="text-button" data-action="remove-dish" data-id="${esc(id)}">Remove</button>
  </div></div>`:""}</div>`;}).join("")}${rows.filter(x=>!ORIGINAL_CATALOG.some(item=>item.id===x.id)).map(({id,d,recipe:r})=>`<div class="row menu-row"><div><strong>${esc(r.title)}</strong><span>${esc(r.mealRole)}</span></div><button data-action="remove-dish" data-id="${esc(id)}">REMOVE</button></div>`).join("")}</div>
 <div class="panel slim"><b>Missing roles:</b> ${p.menu.missing.length?p.menu.missing.map(x=>esc(x)).join(", "):"None"}</div>
 <form id="recipe-form" class="form-grid compact advanced-form" ${sheet==="recipe"?"":"hidden"}>
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
 return pageHeader("The shopping list")+`<div class="editorial-lead"><span>${p.shopping.filter(x=>(x.remainingCanonical??0)>0).length} ITEMS TO GET</span><button class="pill dark" data-sheet="manual-shopping">+ ADD ITEM</button></div><p class="quiet-note">Your list follows the menu, even when the guest count changes.</p>`+
 (p.shopping.length?`<div class="shopping-head"><span>ITEM</span><span>REQUIRED</span><span>HAVE</span><span>PURCHASED</span><span>STILL NEED</span><span>COST</span></div><div class="shopping-rows">${p.shopping.map(x=>{
  const sources=(x.sources||[]).map(s=>s.recipeTitle||s.activityId||s.source).filter(Boolean);
  const canHave=!["prepared-food","turkey"].includes(x.kind);
  return `<form class="shopping-line" data-shopping-key="${esc(x.key)}" data-kind="${esc(x.kind||"")}"><div><strong>${esc(x.name||x.key)}</strong><span>${esc(x.kind||"")}</span>${sources.length?`<details><summary>Used for ${sources.length}</summary><small>${esc([...new Set(sources)].join(", "))}</small></details>`:""}</div>
   <div class="shopping-required">${qty(x.required)} required</div>
   <div class="shopping-need">${(x.remainingCanonical??0)>0?`${qty(x.stillNeed)} to get`:"Covered"}${x.purchaseRecommendation?.packages>0?`<small>BUY ${fmt(x.purchaseRecommendation.packages)} × ${fmt(x.purchaseRecommendation.packageQuantity||x.purchaseRecommendation.quantity)} ${esc(x.purchaseRecommendation.packageUnit||x.purchaseRecommendation.unit||"")}</small>`:""}${x.surplusCanonical>0?` · surplus ${qty(x.surplus)}`:""}</div>
   <details class="shopping-edit"><summary>${(x.purchased?.quantity||0)>0?"Update purchase":"Mark purchased"} · DETAILS</summary><div class="shopping-controls">
   <label class="mini-label">Already have${canHave?`<input name="have" type="number" min="0" step="any" value="${fmt(x.alreadyHave?.quantity||0)}"><small>${esc(x.alreadyHave?.unit||x.unit||"")}</small>`:"—"}</label>
   <label class="mini-label">Purchased<input name="purchased" type="number" min="0" step="any" value="${fmt(x.purchased?.quantity||0)}"><small>${esc(x.purchased?.unit||x.unit||"")}</small></label>
   <label class="mini-label">Committed $<input name="committed" type="number" min="0" step=".01" value="${x.committedCost||""}"></label><label class="mini-label">Paid $<input name="actual" type="number" min="0" step=".01" value="${x.actualCost||""}"></label><button class="pill dark" type="submit">SAVE ITEM</button></div></details>
  </form>`;
 }).join("")}</div>`:empty("No shopping requirements yet."))+
 `<form id="manual-shopping-form" class="form-grid compact advanced-form" ${sheet==="manual-shopping"?"":"hidden"}><label>Manual item<input name="name" required></label><label>Quantity<input name="quantity" type="number" min="0" step="any" value="1"></label><label>Unit<input name="unit" value="each"></label><button class="primary" type="submit">Add item</button></form>`;
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
 return pageHeader("Space + seating")+`<div class="editorial-lead"><span>${p.seating.unassigned.length} PEOPLE TO PLACE</span><button class="pill dark" data-nav="table">EDIT TABLES</button></div><p class="quiet-note">Tap an open seat to place a guest. Every name has one seat.</p>`+
 `<section class="metric-strip">${stat("Seats",`${p.seating.availableSeatCount}/${p.table.requiredSeats}`)}${stat("Unassigned named",String(p.seating.unassigned.length))}${stat("Planning placeholders",String(p.seating.placeholderCount))}${stat("Layout",p.space.measurementStatus)}</section>
 <form id="room-form" class="form-grid compact"><label>Room width in<input name="width" type="number" min="0" value="${state.room?.widthIn||0}"></label><label>Room length in<input name="length" type="number" min="0" value="${state.room?.lengthIn||0}"></label><button class="primary" type="submit">Update room</button></form>
 <div class="section-title"><span>SEATS</span><strong>${p.seating.seatIds.length}</strong></div>
 ${p.seating.seatIds.length?`<div class="seating-map">${p.table.tables.filter(t=>t.use==="dining").map(t=>`<section class="visual-table"><div class="table-surface ${esc(t.shape)}"><span>${esc(t.id)}</span><small>${t.seatCapacity} SEATS</small></div><div class="seat-ring">${p.seating.seatIds.filter(id=>id.startsWith(`${t.id}:`)).map(seatId=>{const personId=p.seating.assignments[seatId],person=byPerson.get(personId);return `<div class="seat-chip ${person?"occupied":""}"><span>${person?esc(person.name):"OPEN"}</span>${person?`<button data-action="unassign-seat" data-person="${esc(personId)}" aria-label="Remove ${esc(person.name)} from seat">×</button>`:`<select data-seat-select="${esc(seatId)}" aria-label="Assign ${esc(seatId)}"><option value="">+ PLACE</option>${p.seating.unassigned.map(x=>`<option value="${esc(x.personId)}">${esc(x.name)}</option>`).join("")}</select>`}</div>`;}).join("")}</div></section>`).join("")}</div>`:empty("Add dining tables before assigning seats.")}
 <div class="two-col top-gap"><div class="panel"><div class="section-title"><span>ZONES</span></div>${p.space.zones.map(z=>`<div class="micro-row"><span>${esc(z.label||z.id)}</span><b>${esc(z.status||"defined")}</b></div>`).join("")||empty("No zones yet.")}</div><div class="panel"><div class="section-title"><span>SPACE ISSUES</span></div>${p.space.issues.length?p.space.issues.map(x=>`<div class="micro-row"><span>${esc(x.type)}</span><b>${esc((x.ids||[x.id]).filter(Boolean).join(", "))}</b></div>`).join(""):empty("No measured-space conflicts.")}</div></div>`;
}

function timelineView(p){
 const tasks=p.timeline.tasks||[];
 const dinnerRaw=state.event.dinnerAt?new Date(state.event.dinnerAt):null;
 const dinner=dinnerRaw&&!Number.isNaN(dinnerRaw.getTime())?dinnerRaw:null;
 const localDayKey=value=>{
  if(!value)return "unscheduled";
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return "unscheduled";
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
 };
 const dayDate=key=>key==="unscheduled"?null:new Date(`${key}T12:00:00`);
 const dayLabel=key=>{
  const d=dayDate(key);
  if(!d)return "TO PLACE";
  if(dinner){
   const a=new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);
   const b=new Date(dinner.getFullYear(),dinner.getMonth(),dinner.getDate(),12);
   const diff=Math.round((b-a)/86400000);
   if(diff===0)return "DINNER DAY";
   if(diff===1)return "DAY BEFORE";
   if(diff>1&&diff<=14)return `${diff} DAYS BEFORE`;
   if(diff<0)return `${Math.abs(diff)} DAY${Math.abs(diff)===1?"":"S"} AFTER`;
  }
  return d.toLocaleDateString(undefined,{weekday:"long"}).toUpperCase();
 };
 const dayStamp=key=>{
  const d=dayDate(key);
  return d?d.toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"}).toUpperCase():"UNSCHEDULED";
 };
 const timeLabel=value=>{
  if(!value)return "TBD";
  const d=new Date(value);
  return Number.isNaN(d.getTime())?"TBD":d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
 };
 const grouped=new Map();
 for(const task of tasks){
  const key=localDayKey(task.startAt||task.fixedStart);
  if(!grouped.has(key))grouped.set(key,[]);
  grouped.get(key).push(task);
 }
 const groups=[...grouped.entries()].sort(([a],[b])=>a==="unscheduled"?1:b==="unscheduled"?-1:a.localeCompare(b));
 const conflicts=tasks.filter(t=>t.conflict).length;
 const dinnerText=dinner?dinner.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}):"TIME TO BE SET";
 const sequence=groups.map(([key,dayTasks],dayIndex)=>`<section class="timeline-day">
  <header class="timeline-day-head"><div><span class="timeline-day-index">${String(dayIndex+1).padStart(2,"0")} / ${esc(dayLabel(key))}</span><strong>${esc(dayStamp(key))}</strong></div><span>${dayTasks.length} STEP${dayTasks.length===1?"":"S"}</span></header>
  <div class="timeline-sequence">${dayTasks.map((t,index)=>{
   const context=t.recipeTitle||t.source||"Host task";
   const phase=t.phase?String(t.phase).replace(/-/g," ").toUpperCase():"";
   return `<form class="timeline-step ${t.conflict?"conflict":""}" data-task-form="${esc(t.taskId)}">
    <div class="timeline-step-time">${esc(timeLabel(t.startAt||t.fixedStart))}</div>
    <div class="timeline-step-copy"><span class="timeline-step-no">${String(index+1).padStart(2,"0")}</span><strong>${esc(t.title)}</strong><span class="timeline-step-context">${esc(context)}</span><div class="timeline-step-meta"><span>${fmt(t.durationMinutes||0)} MIN</span>${phase?`<span>${esc(phase)}</span>`:""}${t.fixedStart?`<span>PINNED</span>`:""}${t.conflict?`<span class="timeline-conflict">TIMING CONFLICT</span>`:""}</div></div>
    <details class="timeline-adjust"><summary>ADJUST</summary><div class="timeline-task-edit"><label>Duration<input name="duration" type="number" min="0" value="${t.durationMinutes||0}"></label><label>Pin time<input name="fixed" type="datetime-local" value="${localInput(t.fixedStart||"")}"></label><button class="text-button" type="submit">Save changes</button></div></details>
   </form>`;
  }).join("")}</div>
 </section>`).join("");
 return pageHeader("The timeline")+
 `<section class="timeline-overview"><div class="timeline-overview-copy"><span>DINNER TARGET</span><strong>${esc(dinnerText)}</strong><small>${tasks.length} cooking step${tasks.length===1?"":"s"}${conflicts?` &middot; ${conflicts} timing conflict${conflicts===1?"":"s"}`:" &middot; sequence clear"}</small></div><button class="pill timeline-add" data-sheet="task">+ ADD TASK</button></section>`+
 (!state.event.dinnerAt?`<div class="timeline-empty"><strong>Set dinner time to schedule these steps.</strong><p>The tasks are ready. One time anchors the whole sequence.</p><button class="pill dark" data-nav="party">SET DINNER TIME &rarr;</button></div>`:"")+
 `<p class="quiet-note timeline-note">This is your cooking order, grouped by day. Change dinner time and the sequence recalculates; pinned tasks stay where you put them.</p>`+
 (tasks.length?`<div class="timeline-days">${sequence}</div>`:`<div class="timeline-empty"><strong>No cooking steps yet.</strong><p>Choose dishes and the prep sequence will appear here.</p><button class="pill dark" data-action="signature-menu">USE SIGNATURE MENU &rarr;</button></div>`)+
 `<form id="manual-task-form" class="form-grid compact advanced-form" ${sheet==="task"?"":"hidden"}><label>Manual task<input name="title" required></label><label>Minutes<input name="duration" type="number" min="0" value="15"></label><label>Fixed time<input name="fixed" type="datetime-local"></label><button class="primary" type="submit">Add task</button></form>`;
}

function guestsView(){
 return pageHeader("The guest list")+`<div class="editorial-lead"><span>EVERYONE AT THE TABLE</span><button class="pill dark" data-sheet="guest">+ ADD GUEST</button></div>`+
 `<div class="section-title"><span>GUEST LIST</span><strong>${state.guests.length}</strong></div>
 ${state.guests.length?`<div class="rows">${state.guests.map((g,index)=>`<div class="row"><div><strong>${esc(g.name)}</strong><span>${esc(g.type||"adult")} · ${esc((g.dietaryRestrictions||[]).join(", ")||"no dietary notes")} ${(g.allergies||[]).length?`· allergies: ${esc(g.allergies.join(", "))}`:""}</span></div><div class="inline-actions"><select data-guest-rsvp="${index}"><option value="pending" ${g.rsvp==="pending"?"selected":""}>Pending</option><option value="yes" ${g.rsvp==="yes"?"selected":""}>Attending</option><option value="no" ${g.rsvp==="no"?"selected":""}>Not attending</option></select><button class="text-button" data-action="remove-guest" data-index="${index}">Remove</button></div></div>`).join("")}</div>`:empty("No named guests yet. Projected headcount still drives quantities.")}
 <form id="guest-form" class="form-grid compact advanced-form" ${sheet==="guest"?"":"hidden"}>
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
 `<section class="metric-strip">${stat("Target",p.budget.target?`$${fmt(p.budget.target)}`:"—")}${stat(p.budget.projectedComplete?"Projected":"Known projection",`${fmt(p.budget.projectedFinal)}`)}${stat("Committed",`$${fmt(p.budget.totalCommitted)}`)}${stat("Paid",`$${fmt(p.budget.totalActual)}`)}</section>
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
 const navButton=([id,label],desktop=false)=>`<button data-nav="${id}" class="${active===id?"active":""}">${desktop?`<span class="desktop-nav-no">${String(NAV.concat(MORE).findIndex(x=>x[0]===id)+1).padStart(2,"0")}</span>`:`<span class="nav-icon">${({home:"⌂",menu:"◇",shopping:"☷",timeline:"◷",guests:"♙"})[id]||"·"}</span>`}<span>${label}</span></button>`;
 app.innerHTML=`<div class="app-shell"><aside class="desktop-sidebar"><button class="desktop-brand" data-nav="home"><span class="desktop-wordmark">CROW & CROWN</span><span class="desktop-product">THANKSGIVING / THE HOSTING EDIT</span></button><p class="desktop-nav-label">YOUR EVENT</p><nav aria-label="Thanksgiving planning sections">${NAV.concat(MORE).map(x=>navButton(x,true)).join("")}</nav><div class="desktop-save"><i></i><span>${esc(saveLabel)}</span></div><a class="desktop-shop" href="${SHOP_URL}" target="_blank" rel="noopener">THE CROW &amp; CROWN SHOP ↗</a></aside><div class="app-main"><header class="topbar"><button data-sheet="more" aria-label="More sections">☰</button><span>C | C</span><button data-nav="party" aria-label="Party settings">⋯</button></header><header class="desktop-topbar"><span>THANKSGIVING / THE HOSTING EDIT</span><div><i></i>${esc(saveLabel)}<button data-nav="party" aria-label="Party settings">PARTY SETTINGS&nbsp; ↗</button></div></header><main class="workspace">${view(p)}</main><nav class="bottom-nav" aria-label="Primary mobile sections">${NAV.map(x=>navButton(x)).join("")}</nav></div>${sheet==="more"?`<div class="modal-backdrop" data-close-sheet><section class="more-sheet"><div class="sheet-handle"></div><p class="kicker">YOUR HOSTING PLAN</p>${MORE.map(([id,label])=>`<button data-nav="${id}">${label}<span>↗</span></button>`).join("")}<a href="${SHOP_URL}" target="_blank" rel="noopener">The Crow &amp; Crown shop<span>↗</span></a><button data-close-sheet>CLOSE</button></section></div>`:""}</div>`;
 bind();
}

function bind(){
 app.querySelector("#setup-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);persist(withSignatureMenu({...state,setupCompleted:true,event:{...state.event,service:f.get("service"),budget:Number(f.get("budget"))||0,dinnerAt:f.get("dinnerAt")||null,ovens:Math.max(0,Number(f.get("ovens"))||0),burners:Math.max(0,Number(f.get("burners"))||0),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone||null},planning:{...state.planning,mode:"estimated",estimatedHeadcount:Math.max(1,Number(f.get("headcount"))||1)}}));});
 app.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.nav;sheet=null;render();if(!window.navigator?.userAgent?.includes("jsdom"))window.scrollTo(0,0);}));
 app.querySelectorAll("[data-sheet]").forEach(b=>b.addEventListener("click",()=>{sheet=b.dataset.sheet;render();app.querySelector(".advanced-form:not([hidden])")?.scrollIntoView?.({block:"start"});}));
 app.querySelectorAll("[data-close-sheet]").forEach(b=>b.addEventListener("click",e=>{if(e.target===b){sheet=null;render();}}));
 app.querySelectorAll("[data-dish-detail]").forEach(b=>b.addEventListener("click",()=>{const el=b.closest(".menu-row").querySelector(".dish-edit");el.hidden=!el.hidden;}));
 app.querySelector("#party-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),mode=String(f.get("mode")),headcount=Math.max(0,Number(f.get("headcount"))||0);update(x=>({...x,event:{...x.event,service:f.get("service"),budget:Number(f.get("budget"))||0,dinnerAt:f.get("dinnerAt")||null,ovens:Math.max(0,Number(f.get("ovens"))||0),burners:Math.max(0,Number(f.get("burners"))||0),cookingHelpers:Math.max(0,Number(f.get("helpers"))||0),timeZone:x.event.timeZone||Intl.DateTimeFormat().resolvedOptions().timeZone||null},planning:{...x.planning,mode,[mode==="custom"?"customHeadcount":"estimatedHeadcount"]:headcount,foodBufferPercent:Math.max(0,Number(f.get("foodBuffer"))||0),placeSettingSparePercent:Math.max(0,Number(f.get("spare"))||0)}}));});
 app.querySelector("#recipe-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=`custom-${crypto.randomUUID()}`;
  const ingredients=String(f.get("ingredients")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[2]).map(([quantity,unit,name])=>({name,quantity:Number(quantity)||0,unit:unit||"each"}));
  const tasks=String(f.get("tasks")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[0]).map(([title,minutes,phase,resource,temp])=>({title,durationMinutes:Number(minutes)||0,phase:phase||"prep",resourceRequirements:resource?[{type:resource,temperatureF:temp?Number(temp):undefined}]:[]}));
  const equipment=String(f.get("equipment")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[1]).map(([quantity,name])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name,quantity:Number(quantity)||1}));
  const servingRequirements=String(f.get("serving")||"").split(/\n+/).map(line=>line.split("|").map(x=>x.trim())).filter(parts=>parts[1]).map(([quantity,name])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name,quantity:Number(quantity)||1}));
  const isTurkey=f.get("isTurkey")==="on",thaw=Number(f.get("thawHours")),cook=Number(f.get("cookMinutes"));
  update(x=>addRecipeToMenu(x,{id,title:String(f.get("title")),mealRole:String(f.get("role")),baseServings:Math.max(1,Number(f.get("servings"))||1),servingStrategy:{basis:String(f.get("basis"))},ingredients,prepTasks:tasks,equipment,servingRequirements,dietaryTags:csv(f.get("dietary")),allergens:csv(f.get("allergens")),metadataReviewed:f.get("reviewed")==="on",allergenReviewed:f.get("reviewed")==="on",isTurkey,turkeyRules:isTurkey?{poundsPerPerson:Math.max(0,Number(f.get("turkeyLb"))||1.25),...(Number.isFinite(thaw)&&thaw>0?{thawHoursPerPound:thaw}:{}),...(Number.isFinite(cook)&&cook>0?{cookMinutesPerPound:cook}:{})}:undefined}));});
 app.querySelectorAll("[data-dish-mode]").forEach(el=>el.addEventListener("change",()=>update(x=>{let next=setDishPreparationMode(x,el.dataset.dishMode,el.value);const responsibilities={...(next.menuResponsibilities||{})};if(el.value!=="guest-provided")delete responsibilities[el.dataset.dishMode];else responsibilities[el.dataset.dishMode]={ownerType:"guest",contributorGuestId:responsibilities[el.dataset.dishMode]?.contributorGuestId||null,status:responsibilities[el.dataset.dishMode]?.status||"pending"};return {...next,menuResponsibilities:responsibilities};})));
 app.querySelectorAll("[data-contribution-guest]").forEach(el=>el.addEventListener("change",()=>update(x=>{const id=el.dataset.contributionGuest,current=x.menuResponsibilities?.[id]||{};return {...x,menuResponsibilities:{...(x.menuResponsibilities||{}),[id]:{...current,ownerType:"guest",contributorGuestId:el.value||null,status:current.status||"pending"}}};})));
 app.querySelectorAll("[data-contribution-status]").forEach(el=>el.addEventListener("change",()=>update(x=>{const id=el.dataset.contributionStatus,current=x.menuResponsibilities?.[id]||{};return {...x,menuResponsibilities:{...(x.menuResponsibilities||{}),[id]:{...current,ownerType:"guest",status:el.value}}};})));
 app.querySelectorAll('[data-action="remove-dish"]').forEach(b=>b.addEventListener("click",()=>update(x=>removeDishFromMenu(x,b.dataset.id))));
 app.querySelectorAll('[data-action="toggle-catalog"]').forEach(b=>b.addEventListener("click",()=>{if(b.disabled)return;update(x=>x.dishes?.[b.dataset.id]?.on?removeDishFromMenu(x,b.dataset.id):addRecipeToMenu(x,catalogRecipe(ORIGINAL_CATALOG.find(item=>item.id===b.dataset.id))))}));
 app.querySelector('[data-action="signature-menu"]')?.addEventListener("click",()=>update(x=>withSignatureMenu(x)));
 app.querySelectorAll(".shopping-line").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(form),key=form.dataset.shoppingKey,kind=form.dataset.kind,row=derivePlan(state).shopping.find(x=>x.key===key),unit=row?.required?.unit||row?.unit||"each",have=Math.max(0,Number(f.get("have"))||0),purchased=Math.max(0,Number(f.get("purchased"))||0),committed=Math.max(0,Number(f.get("committed"))||0),actual=Math.max(0,Number(f.get("actual"))||0);update(x=>{let next=x;if(kind==="ingredient"||kind==="manual")next=setPantryQuantity(next,key,have,unit);else if(!["prepared-food","turkey"].includes(kind)){if(key.startsWith("table:linen:")&&row?.requirement){const id=`shopping-${key}`,linens=(next.inventory?.linens||[]).filter(item=>item.id!==id);if(have>0){const req=row.requirement;linens.push(req.shape==="round"?{id,shape:"round",diameterIn:req.diameterIn,quantity:Math.ceil(have)}:{id,shape:"rectangle",lengthIn:req.lengthIn,widthIn:req.widthIn,quantity:Math.ceil(have)});}next={...next,inventory:{...(next.inventory||{}),linens}};}else next=setOwnedQuantity(next,key,have,unit);}return recordPurchase(next,key,purchased,unit,actual,committed);});}));
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
 app.querySelectorAll("[data-guest-rsvp]").forEach(el=>el.addEventListener("change",()=>update(x=>{const i=Number(el.dataset.guestRsvp),g=x.guests[i],id=g?.guestId||g?.id;if(!id)return x;return updateGuest(x,id,{rsvp:el.value});})));
 app.querySelectorAll('[data-action="remove-guest"]').forEach(b=>b.addEventListener("click",()=>update(x=>{const g=x.guests[Number(b.dataset.index)],id=g?.guestId||g?.id;return id?removeGuest(x,id):x;})));
 app.querySelectorAll('[data-action="toggle-activity"]').forEach(b=>b.addEventListener("click",()=>update(x=>{const selected={...(x.selectedActivities||{})};if(selected[b.dataset.id])delete selected[b.dataset.id];else selected[b.dataset.id]=true;return {...x,selectedActivities:selected};})));
 app.querySelector("#activity-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=`activity-${crypto.randomUUID()}`,supply=String(f.get("supply")||"").trim(),task=String(f.get("task")||"").trim();update(x=>({...x,activities:{...(x.activities||{}),[id]:{name:String(f.get("name")),supplies:supply?[{key:supply.toLowerCase().replace(/\s+/g,"-"),name:supply,quantityPerPerson:Math.max(0,Number(f.get("perPerson"))||0)}]:[],tasks:task?[{id:"setup",title:task,durationMinutes:Math.max(0,Number(f.get("minutes"))||0)}]:[],zoneRequirement:String(f.get("zone")||"").trim()||null,printables:[]}},selectedActivities:{...(x.selectedActivities||{}),[id]:true}}));});
 app.querySelectorAll('[data-action="print"]').forEach(b=>b.addEventListener("click",()=>{const bundle=generatePrintableBundle(state),item=bundle.printables[b.dataset.type];if(!item)return;const w=window.open("","_blank");if(w){w.document.write(renderPrintableHtml(item));w.document.close();w.focus();w.print();}update(x=>markPrintableGenerated(x,b.dataset.type),{bumpRevision:false});}));
 app.querySelector('[data-action="backup"]')?.addEventListener("click",()=>{const blob=new Blob([backupState(state)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="crow-crown-thanksgiving-backup.json";a.click();URL.revokeObjectURL(a.href);});
 app.querySelector("#restore-input")?.addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{persist(restoreBackup(await file.text()));}catch{saveLabel="Backup could not be restored";render();}});
 app.querySelector('[data-action="reset"]')?.addEventListener("click",()=>{if(confirm("Reset this event? Download a backup first if you want to keep it.")){storage?.removeItem?.(DEFAULT_STORAGE_KEY);state=createPartyState();saveLabel="Reset";active="home";render();}});
}

render();
