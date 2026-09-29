import "./styles.css";
import {createPartyState} from "./domain/state.js";
import {derivePlan} from "./domain/planning.js";
import {browserStorage,loadState,saveState,backupState,restoreBackup} from "./domain/persistence.js";
import {generatePrintableBundle,markPrintableGenerated,renderPrintableHtml} from "./domain/printables.js";

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
const app=document.querySelector("#app");

function persist(next){
 if(!storage){state=next;saveLabel="Local save unavailable";render();return;}
 const result=saveState(storage,next,{expectedRevision:state.revision});
 if(result.ok){state=result.state;saveLabel="Saved locally";}else{state=result.current;saveLabel="Save conflict — reloaded latest";}
 render();
}
function update(mutator){persist(mutator(structuredClone(state)));}

function issueList(p){
 const issues=[];
 for(const role of p.menu.missing)issues.push(`Menu missing: ${role.replace(/-/g," ")}`);
 for(const gap of p.dietaryCoverage.gaps.slice(0,4))issues.push(`${gap.name}: ${gap.status} ${gap.role} option`);
 if(p.table.seatShortage)issues.push(`${p.table.seatShortage} dining seats still needed`);
 if(p.table.chairShortage)issues.push(`${p.table.chairShortage} chairs still needed`);
 if(p.table.highChairShortage)issues.push(`${p.table.highChairShortage} high chairs still needed`);
 for(const zone of p.service.missingZones)issues.push(`Set up a ${zone.replace(/-/g," ")} zone`);
 if(p.timeline.issues.length)issues.push(`${p.timeline.issues.length} timeline conflict${p.timeline.issues.length===1?"":"s"}`);
 const buy=p.shopping.filter(x=>(x.remainingCanonical??0)>0).length;if(buy)issues.push(`${buy} shopping item${buy===1?"":"s"} still needed`);
 return issues;
}
function pageHeader(title,sub=""){return `<header class="pagehead"><div><p class="eyebrow">CROW & CROWN / THANKSGIVING</p><h1>${esc(title)}</h1></div>${sub?`<p class="page-sub">${esc(sub)}</p>`:""}</header>`;}
function stat(label,value,detail=""){return `<div class="stat"><span>${esc(label)}</span><strong>${esc(value)}</strong>${detail?`<small>${esc(detail)}</small>`:""}</div>`;}
function empty(text){return `<p class="empty">${esc(text)}</p>`;}

function homeView(p){
 const issues=issueList(p);
 return pageHeader("Thanksgiving, already figured out.","One plan. Every change recalculates what depends on it.")+
 `<section class="metric-strip">${stat("Planning for",String(p.planning.planningHeadcount),"people")}${stat("Dinner",state.event.dinnerAt?new Date(state.event.dinnerAt).toLocaleString():"Set a time")}${stat("Budget",state.event.budget?`$${fmt(state.event.budget)}`:"Set budget")}${stat("Service",p.service.style.label)}</section>
 <section class="two-col"><div class="panel"><div class="section-title"><span>NEEDS ATTENTION</span><strong>${issues.length}</strong></div>${issues.length?`<ul class="issue-list">${issues.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:empty("No current exceptions.")}</div>
 <div class="panel"><div class="section-title"><span>CONNECTED PLAN</span></div><dl class="compact-list"><div><dt>Menu roles</dt><dd>${p.menu.present.length} resolved</dd></div><div><dt>Shopping</dt><dd>${p.shopping.filter(x=>(x.remainingCanonical??0)>0).length} open</dd></div><div><dt>Prep</dt><dd>${p.prep.length} tasks</dd></div><div><dt>Seats</dt><dd>${p.table.seatCapacity}/${p.table.requiredSeats}</dd></div><div><dt>Timeline</dt><dd>${p.timeline.tasks.length} scheduled</dd></div></dl></div></section>`;
}
function partyView(p){return pageHeader("Party plan","Edit the event facts once; every dependent section uses them.")+
 `<form class="form-grid" id="party-form"><label>Planning headcount<input name="headcount" type="number" min="0" value="${p.planning.planningHeadcount}"></label><label>Dinner time<input name="dinnerAt" type="datetime-local" value="${state.event.dinnerAt?esc(String(state.event.dinnerAt).slice(0,16)):""}"></label><label>Service style<select name="service">${Object.entries({family:"Family style",buffet:"Buffet",plated:"Plated",cocktail:"Cocktail / grazing"}).map(([v,l])=>`<option value="${v}" ${state.event.service===v?"selected":""}>${l}</option>`).join("")}</select></label><label>Budget<input name="budget" type="number" min="0" value="${state.event.budget||0}"></label><label>Food buffer %<input name="foodBuffer" type="number" min="0" value="${state.planning.foodBufferPercent||0}"></label><label>Place-setting spare %<input name="spare" type="number" min="0" value="${state.planning.placeSettingSparePercent||0}"></label><button class="primary" type="submit">Update plan</button></form>`;
}
function menuView(p){const rows=Object.entries(state.dishes||{}).filter(([,d])=>d?.on).map(([id])=>state.recipes?.[state.dishes[id].recipeId||id]).filter(Boolean);return pageHeader("Menu","Selections drive portions, ingredients, prep, equipment and timing.")+`<div class="section-title"><span>CURRENT MENU</span><strong>${rows.length}</strong></div>${rows.length?`<div class="rows">${rows.map(r=>`<div class="row"><div><strong>${esc(r.title)}</strong><span>${esc(r.mealRole||"uncategorized")}</span></div><div>${fmt(r.baseServings)} base servings</div></div>`).join("")}</div>`:empty("No recipes are selected in this clean repository yet. Curated recipe content still needs to be loaded.")}<div class="panel slim"><b>Missing roles:</b> ${p.menu.missing.length?p.menu.missing.map(x=>esc(x)).join(", "):"None"}</div>`;}
function prepView(p){return pageHeader("Prep","Generated from current recipes, responsibility, activities and service setup.")+(p.prep.length?`<div class="rows">${p.prep.map(t=>`<div class="row"><div><strong>${esc(t.title)}</strong><span>${esc(t.recipeTitle||t.source||"manual")}</span></div><div>${t.durationMinutes?fmt(t.durationMinutes)+" min":t.needsDuration?"needs duration":""}</div></div>`).join("")}</div>`:empty("Prep tasks appear when recipes or activities are added."));}
function shoppingView(p){return pageHeader("Shopping","Required − already have − purchased = still need.")+(p.shopping.length?`<div class="rows">${p.shopping.map(x=>`<div class="row"><div><strong>${esc(x.name||x.key)}</strong><span>${esc(x.kind||"")}</span></div><div class="qty"><small>required ${qty(x.required)}</small><b>need ${qty(x.stillNeed)}</b></div></div>`).join("")}</div>`:empty("No shopping requirements yet."));}
function tableView(p){return pageHeader("Table","Dining capacity, chairs, place settings and linen fit share one inventory.")+
 `<section class="metric-strip">${stat("Seats required",String(p.table.requiredSeats))}${stat("Table capacity",String(p.table.seatCapacity))}${stat("Chairs missing",String(p.table.chairShortage))}${stat("Settings",String(p.table.placeSettingCount))}</section>
 <div class="section-title"><span>DINING TABLES</span><strong>${p.table.diningTables.length}</strong></div>${p.table.diningTables.length?`<div class="rows">${p.table.diningTables.map(t=>{const l=p.table.linens.find(x=>x.tableId===t.id);const r=l?.requirement||{};return `<div class="row"><div><strong>${esc(t.id)}</strong><span>${esc(t.shape)} · seats ${t.seatCapacity}</span></div><div>${t.shape==="round"?`linen Ø ${fmt(r.diameterIn)}"`:`linen ${fmt(r.lengthIn)} × ${fmt(r.widthIn)}"`}</div></div>`;}).join("")}</div>`:empty("Add a dining table to calculate seating and linens.")}
 <form id="table-form" class="form-grid compact"><label>ID<input name="id" placeholder="dining-1"></label><label>Shape<select name="shape"><option value="rectangle">Rectangle</option><option value="round">Round</option></select></label><label>Seats<input name="seats" type="number" min="0" value="8"></label><label>Length in<input name="length" type="number" min="0" value="72"></label><label>Width in<input name="width" type="number" min="0" value="36"></label><label>Diameter in<input name="diameter" type="number" min="0"></label><label>Linen drop in<input name="drop" type="number" min="0" value="12"></label><button class="primary" type="submit">Add table</button></form>`;
}
function spaceView(p){return pageHeader("Space + seating","Named guests assign to real seats; projected unnamed guests remain visible as placeholders.")+`<section class="metric-strip">${stat("Seats",`${p.seating.availableSeatCount}/${p.table.requiredSeats}`)}${stat("Unassigned named",String(p.seating.unassigned.length))}${stat("Planning placeholders",String(p.seating.placeholderCount))}${stat("Layout",p.space.measurementStatus)}</section><div class="two-col"><div class="panel"><div class="section-title"><span>ZONES</span></div>${p.space.zones.map(z=>`<div class="micro-row"><span>${esc(z.label||z.id)}</span><b>${esc(z.status||"defined")}</b></div>`).join("")||empty("No zones yet.")}</div><div class="panel"><div class="section-title"><span>SPACE ISSUES</span></div>${p.space.issues.length?p.space.issues.map(x=>`<div class="micro-row"><span>${esc(x.type)}</span><b>${esc((x.ids||[x.id]).filter(Boolean).join(", "))}</b></div>`).join(""):empty("No measured-space conflicts.")}</div></div>`;}
function timelineView(p){return pageHeader("Timeline","Built backward from dinner while respecting dependencies and kitchen resources.")+(p.timeline.tasks.length?`<div class="rows timeline">${p.timeline.tasks.map(t=>`<div class="row ${t.conflict?"conflict":""}"><div><strong>${esc(t.title)}</strong><span>${esc(t.recipeTitle||t.source||"")}</span></div><div>${t.startAt?new Date(t.startAt).toLocaleTimeString([], {hour:"numeric",minute:"2-digit"}):`${fmt(t.startOffsetMinutes)} min`}</div></div>`).join("")}</div>`:empty("Timed recipe tasks appear here."));}
function guestsView(){return pageHeader("Guests","Dietary needs, children and RSVP status feed planning and coverage.")+`<div class="section-title"><span>GUEST LIST</span><strong>${state.guests.length}</strong></div>${state.guests.length?`<div class="rows">${state.guests.map(g=>`<div class="row"><div><strong>${esc(g.name)}</strong><span>${esc(g.rsvp||"pending")} · ${esc(g.type||"adult")}</span></div><div>${esc((g.dietaryRestrictions||[]).join(", "))}</div></div>`).join("")}</div>`:empty("No named guests yet. Planning quantities can still use the projected headcount.")}
 <form id="guest-form" class="form-grid compact"><label>Name<input name="name" required></label><label>RSVP<select name="rsvp"><option value="pending">Pending</option><option value="yes">Attending</option><option value="no">Not attending</option></select></label><label>Type<select name="type"><option value="adult">Adult</option><option value="child">Child</option></select></label><label>Dietary needs<input name="dietary" placeholder="vegetarian, gluten-free"></label><button class="primary" type="submit">Add guest</button></form>`;}
function experienceView(p){return pageHeader("Experience","Activities can add supplies, setup work, space needs and printables.")+`<section class="metric-strip">${stat("Selected",String(p.experience.selectedCount))}${stat("Households",String(p.experience.households))}${stat("Supplies",String(p.experience.supplies.length))}${stat("Printables",String(p.experience.printables.length))}</section>${Object.keys(state.activities||{}).length?`<div class="rows">${Object.entries(state.activities).map(([id,a])=>`<div class="row"><div><strong>${esc(a.name||id)}</strong><span>${esc(a.zoneRequirement||"")}</span></div><button class="text-button" data-action="toggle-activity" data-id="${esc(id)}">${state.selectedActivities?.[id]?"Remove":"Add"}</button></div>`).join("")}</div>`:empty("No approved activity content has been loaded yet.")}`;}
function budgetView(p){return pageHeader("Budget","Actual purchases replace fulfilled estimates instead of being counted twice.")+`<section class="metric-strip">${stat("Target",p.budget.target?`$${fmt(p.budget.target)}`:"—")}${stat("Projected",`$${fmt(p.budget.projectedFinal)}`)}${stat("Actual",`$${fmt(p.budget.totalActual)}`)}${stat("Unknown prices",String(p.budget.incompletePriceLines))}</section>${p.budget.lines.length?`<div class="rows">${p.budget.lines.map(x=>`<div class="row"><div><strong>${esc(x.label||x.id)}</strong><span>${esc(x.category)}</span></div><div>$${fmt(x.forecast)}</div></div>`).join("")}</div>`:empty("Budget lines appear from shopping and manual entries.")}`;}
function printablesView(p){const bundle=generatePrintableBundle(state);return pageHeader("Printables","Generated from the current menu, guests, seating, shopping and timeline.")+`<div class="print-grid">${Object.entries(bundle.printables).map(([type,item])=>`<button class="print-card" data-action="print" data-type="${esc(type)}"><span>${esc(item.title)}</span><small>Generate from revision ${state.revision}</small></button>`).join("")}</div><div class="backup-actions"><button class="secondary" data-action="backup">Download plan backup</button><label class="secondary file-label">Restore backup<input id="restore-input" type="file" accept="application/json"></label></div>`;}
function view(p){return ({home:()=>homeView(p),party:()=>partyView(p),menu:()=>menuView(p),prep:()=>prepView(p),shopping:()=>shoppingView(p),table:()=>tableView(p),space:()=>spaceView(p),timeline:()=>timelineView(p),guests:()=>guestsView(),experience:()=>experienceView(p),budget:()=>budgetView(p),printables:()=>printablesView(p)})[active]?.()||homeView(p);}

function render(){
 const p=derivePlan(state);
 app.innerHTML=`<div class="app-shell"><aside class="sidebar"><div class="brand-lockup"><b>CROW & CROWN</b><span>THANKSGIVING</span></div><nav>${NAV.map(([id,label])=>`<button data-nav="${id}" class="${active===id?"active":""}">${label}</button>`).join("")}</nav><div class="save-state">${esc(saveLabel)} · r${state.revision}</div></aside><main class="workspace">${view(p)}</main></div>`;
 bind();
}
function bind(){
 app.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.nav;render();}));
 app.querySelector("#party-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);update(s=>({...s,event:{...s.event,service:f.get("service"),budget:Number(f.get("budget"))||0,dinnerAt:f.get("dinnerAt")||null},planning:{...s.planning,mode:"estimated",estimatedHeadcount:Math.max(0,Number(f.get("headcount"))||0),foodBufferPercent:Math.max(0,Number(f.get("foodBuffer"))||0),placeSettingSparePercent:Math.max(0,Number(f.get("spare"))||0)}}));});
 app.querySelector("#table-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),id=String(f.get("id")||`dining-${state.tables.length+1}`);update(s=>({...s,tables:[...s.tables,{id,use:"dining",shape:f.get("shape"),seatCapacity:Number(f.get("seats"))||0,lengthIn:Number(f.get("length"))||0,widthIn:Number(f.get("width"))||0,diameterIn:Number(f.get("diameter"))||0,linenDropIn:Number(f.get("drop"))||0}]}));});
 app.querySelector("#guest-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),dietary=String(f.get("dietary")||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);update(s=>({...s,guests:[...s.guests,{id:crypto.randomUUID(),name:String(f.get("name")),rsvp:f.get("rsvp"),type:f.get("type"),dietaryRestrictions:dietary}]}));});
 app.querySelectorAll('[data-action="toggle-activity"]').forEach(b=>b.addEventListener("click",()=>update(s=>{const selected={...(s.selectedActivities||{})};if(selected[b.dataset.id])delete selected[b.dataset.id];else selected[b.dataset.id]=true;return {...s,selectedActivities:selected};})));
 app.querySelectorAll('[data-action="print"]').forEach(b=>b.addEventListener("click",()=>{const bundle=generatePrintableBundle(state),item=bundle.printables[b.dataset.type];if(!item)return;const w=window.open("","_blank");if(w){w.document.write(renderPrintableHtml(item));w.document.close();w.focus();w.print();}update(s=>markPrintableGenerated(s,b.dataset.type));}));
 app.querySelector('[data-action="backup"]')?.addEventListener("click",()=>{const blob=new Blob([backupState(state)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="crow-crown-thanksgiving-backup.json";a.click();URL.revokeObjectURL(a.href);});
 app.querySelector("#restore-input")?.addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{persist(restoreBackup(await file.text()));}catch{saveLabel="Backup could not be restored";render();}});
}
render();
