import {recipeForDish} from "./recipes.js";
import {deriveShoppingList} from "./shopping.js";
import {deriveTimeline} from "./schedule.js";
import {deriveSeatingPlan} from "./seating.js";
import {deriveExperiencePlan} from "./experience.js";
import {deriveEquipmentPlan} from "./equipment.js";

function escapeHtml(v){const map={"&":"&amp;","<":"&lt;",">":"&gt",'"':"&quot;","'":"&#39;"};return String(v??"").replace(/[&<>"']/g,c=>map[c]);}
function menuRows(state){return Object.entries(state.dishes||{}).filter(([,d])=>d?.on).map(([id])=>{const r=recipeForDish(state,id);return r?{id,title:r.title,role:r.mealRole||"",dietaryTags:r.dietaryTags||[],allergens:r.allergens||[],metadataReviewed:r.metadataReviewed===true,allergenReviewed:r.allergenReviewed===true}:null;}).filter(Boolean);}
function recipeCards(state){return Object.entries(state.dishes||{}).filter(([,d])=>d?.on).map(([dishId])=>{const r=recipeForDish(state,dishId);if(!r||r.recipeComplete!==true)return null;return {dishId,title:r.title,servings:r.baseServings,ingredients:r.ingredients.map(x=>({name:x.name,quantity:x.quantity,unit:x.unit})),instructions:r.instructions||[],makeAhead:r.makeAhead||"",storage:r.storage||"",reheat:r.reheat||""};}).filter(Boolean);}
export function generatePrintableBundle(state){
 const seating=deriveSeatingPlan(state),shopping=deriveShoppingList(state),timeline=deriveTimeline(state),experience=deriveExperiencePlan(state),menu=menuRows(state),equipment=deriveEquipmentPlan(state);
 const seatByPerson=new Map(Object.entries(seating.assignments).map(([seatId,personId])=>[personId,seatId]));
 const placeCards=seating.namedPeople.map(person=>({seatId:seatByPerson.get(person.personId)||null,personId:person.personId,name:person.name}));
 const seatedCards=placeCards.filter(x=>x.seatId);
 const drinks=menu.filter(x=>["alcohol","non-alcoholic-drink","coffee"].includes(x.role));
 const cards=recipeCards(state);
 const staging=menu.map(x=>{const r=recipeForDish(state,x.id);return {dishId:x.id,title:x.title,vessels:(r?.servingRequirements||[]).map(v=>v.name||v.id),equipment:(r?.equipment||[]).map(v=>v.name||v.id),makeAhead:r?.makeAhead||""};});
 const printables={
  menu:{type:"menu",title:"Thanksgiving Menu",rows:menu.map(x=>({title:x.title,role:x.role}))},
  "place-cards":{type:"place-cards",title:"Place Cards",rows:placeCards},
  "seating-chart":{type:"seating-chart",title:"Seating Chart",rows:seatedCards},
  "food-labels":{type:"food-labels",title:"Food Labels",rows:menu.map(x=>({title:x.title,dietaryTags:x.metadataReviewed?x.dietaryTags:[],allergens:x.allergenReviewed?x.allergens:[],status:x.metadataReviewed&&x.allergenReviewed?"reviewed":[!x.metadataReviewed&&"dietary review required",!x.allergenReviewed&&"allergen review required"].filter(Boolean).join("; ")}))},
  "shopping-checklist":{type:"shopping-checklist",title:"Shopping Checklist",rows:shopping.filter(x=>(x.remainingCanonical??x.stillNeed?.quantity??0)>0).map(x=>({name:x.name,quantity:x.purchaseRecommendation||x.stillNeed||{quantity:x.quantity,unit:x.unit},kind:x.kind,category:x.category||null}))},
  "kitchen-timeline":{type:"kitchen-timeline",title:"Kitchen Timeline",rows:timeline.tasks.map(x=>({title:x.title,startAt:x.startAt,startOffsetMinutes:x.startOffsetMinutes,owner:x.owner||"host",conflict:Boolean(x.conflict)}))},
  "recipe-cards":{type:"recipe-cards",title:"Recipe Cards",rows:cards},
  "kitchen-staging":{type:"kitchen-staging",title:"Kitchen Staging Sheet",rows:staging},
  "drinks-card":{type:"drinks-card",title:"Drinks + Bar Card",rows:drinks.map(x=>({title:x.title,role:x.role}))},
  "leftover-labels":{type:"leftover-labels",title:"Leftover Labels",rows:menu.filter(x=>!["alcohol","non-alcoholic-drink","coffee"].includes(x.role)).map(x=>({title:x.title,packedAt:"Write packed time",refrigerate:"Refrigerate promptly"}))}
 };
 for(const p of experience.printables){const a=state.activities?.[p.activityId]||{};printables[p.id]={type:p.type,title:String(a.title||p.type).replace(/-/g," "),rows:[{title:a.title||p.type,description:a.description||"",instructions:a.instructions||a.content||""}],activityId:p.activityId,ready:Boolean(a.title||a.description)};}
 return {revision:Math.max(0,Number(state.revision)||0),printables};
}
export function printableStatus(state,type){const record=state.printableOverrides?.[type];return {generated:Boolean(record?.generatedAt),stale:Boolean(record?.generatedAt&&Number(record.generatedRevision)!==Number(state.revision||0)),generatedRevision:record?.generatedRevision??null,currentRevision:Number(state.revision)||0};}
export function markPrintableGenerated(state,type){return {...state,printableOverrides:{...(state.printableOverrides||{}),[type]:{...(state.printableOverrides?.[type]||{}),generatedAt:new Date().toISOString(),generatedRevision:Number(state.revision)||0}}};}
function rowHtml(type,row){
 if(type==="menu"||type==="drinks-card")return `<div class="row"><b>${escapeHtml(row.title)}</b><span>${escapeHtml(row.role||"")}</span></div>`;
 if(type==="place-cards"||type==="seating-chart")return `<div class="row"><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.seatId)}</span></div>`;
 if(type==="food-labels"){const tags=(row.dietaryTags||[]).join(", "),allergens=(row.allergens||[]).join(", ");return `<div class="row"><b>${escapeHtml(row.title)}</b><span>${escapeHtml(row.status)}${tags?` · ${escapeHtml(tags)}`:""}${allergens?` · allergens: ${escapeHtml(allergens)}`:""}</span></div>`;}
 if(type==="shopping-checklist")return `<div class="row"><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.quantity?.quantity)} ${escapeHtml(row.quantity?.unit||"")}</span></div>`;
 if(type==="kitchen-timeline"){const when=row.startAt?new Date(row.startAt).toLocaleString():`${row.startOffsetMinutes} min from dinner`;return `<div class="row ${row.conflict?"warn":""}"><b>${escapeHtml(row.title)}</b><span>${escapeHtml(when)} · ${escapeHtml(row.owner||"host")}</span></div>`;}
 if(type==="recipe-cards")return `<section class="recipe"><h2>${escapeHtml(row.title)}</h2><p class="meta">Base yield: ${escapeHtml(row.servings)}</p><h3>Ingredients</h3><ul>${(row.ingredients||[]).map(x=>`<li>${escapeHtml(x.quantity)} ${escapeHtml(x.unit)} · ${escapeHtml(x.name)}</li>`).join("")}</ul><h3>Method</h3><ol>${(row.instructions||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ol>${row.makeAhead?`<p><b>Make ahead:</b> ${escapeHtml(row.makeAhead)}</p>`:""}${row.storage?`<p><b>Storage:</b> ${escapeHtml(row.storage)}</p>`:""}${row.reheat?`<p><b>Reheat:</b> ${escapeHtml(row.reheat)}</p>`:""}</section>`;
 if(type==="kitchen-staging")return `<div class="stack"><b>${escapeHtml(row.title)}</b><span>Serving: ${escapeHtml((row.vessels||[]).join(", ")||"review")}</span><span>Equipment: ${escapeHtml((row.equipment||[]).join(", ")||"none")}</span><small>${escapeHtml(row.makeAhead||"")}</small></div>`;
 if(type==="leftover-labels")return `<div class="label"><b>${escapeHtml(row.title)}</b><span>${escapeHtml(row.packedAt)}</span><small>${escapeHtml(row.refrigerate)}</small></div>`;
 return `<div class="row"><b>${escapeHtml(row.name||row.title||"")}</b><span>${escapeHtml(row.description||row.instructions||"")}</span></div>`;
}
export function renderPrintableHtml(printable){
 const rows=(printable.rows||[]).map(row=>rowHtml(printable.type,row)).join("");
 return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(printable.title)}</title><style>@page{margin:.55in}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;margin:0;color:#11110f;background:#fff;font-size:11pt}header{border-bottom:1px solid #111;padding-bottom:16px;margin-bottom:24px}.brand{font-size:9pt;letter-spacing:.24em}h1{font-size:28pt;font-weight:300;margin:10px 0 0}h2{font-size:17pt;font-weight:500}h3{font-size:9pt;text-transform:uppercase;letter-spacing:.12em}.row,.stack{display:flex;justify-content:space-between;gap:20px;padding:10px 0;border-bottom:1px solid #d7d7d2}.stack{flex-direction:column;gap:4px}.row span{color:#555;text-align:right}.warn{border-left:3px solid #111;padding-left:10px}.recipe{break-inside:avoid;border-top:1px solid #111;padding:18px 0;margin-bottom:20px}.recipe li{margin:0 0 6px}.meta,small{color:#666}.label{display:inline-flex;vertical-align:top;flex-direction:column;width:48%;min-height:120px;border:1px solid #111;padding:16px;margin:0 1% 12px 0}.label b{font-size:16pt;margin-bottom:18px}@media print{body{margin:0}}</style></head><body><header><div class="brand">CROW &amp; CROWN · THE THANKSGIVING EDIT</div><h1>${escapeHtml(printable.title)}</h1></header>${rows||'<p>No live entries yet.</p>'}</body></html>`;
}
