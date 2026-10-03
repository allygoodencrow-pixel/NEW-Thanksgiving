import {SCHEMA_VERSION,createPartyState} from "./state.js";
export const DEFAULT_STORAGE_KEY="crow-crown-thanksgiving:event";
const MODES=new Set(["estimated","expected","confirmed","custom"]);
const RSVPS=new Set(["yes","no","pending"]);
const object=v=>v&&typeof v==="object"&&!Array.isArray(v)?v:{};
const array=v=>Array.isArray(v)?v:[];
const num=(v,fallback=0)=>Number.isFinite(Number(v))?Number(v):fallback;

function migrate1to2(s){const next={...s};if(next.event?.guests!=null&&!next.planning){next.planning={mode:"estimated",estimatedHeadcount:num(next.event.guests,12)};}return {...next,schemaVersion:2};}
function migrate2to3(s){const next={...s};if(next.menu&&!next.dishes)next.dishes=next.menu;if(next.shopping&&!next.shoppingLedger)next.shoppingLedger=next.shopping;return {...next,schemaVersion:3};}
function migrate3to4(s){const next={...s};if(next.event?.dinnerTime&&!next.event?.dinnerAt)next.event={...next.event,dinnerAt:next.event.dinnerTime};return {...next,schemaVersion:4};}
function migrate4to5(s){return {...s,housePrep:object(s.housePrep),schemaVersion:5};}
const MIGRATIONS={1:migrate1to2,2:migrate2to3,3:migrate3to4,4:migrate4to5};

function sanitizeGuest(g,index){const raw=object(g),rsvp=RSVPS.has(raw.rsvp)?raw.rsvp:"pending";return {...raw,guestId:String(raw.guestId||raw.id||`guest-${index+1}`),name:String(raw.name||"Guest"),type:raw.type==="child"?"child":"adult",rsvp,dietaryRestrictions:array(raw.dietaryRestrictions),allergies:array(raw.allergies),kids:Math.max(0,Math.floor(num(raw.kids))),highChairs:Math.max(0,Math.floor(num(raw.highChairs)))};}
function sanitizeState(source){
 const merged=createPartyState(object(source));
 merged.planning={...merged.planning,mode:MODES.has(merged.planning?.mode)?merged.planning.mode:"estimated"};
 merged.guests=array(merged.guests).map(sanitizeGuest);
 merged.recipes=object(merged.recipes);merged.dishes=object(merged.dishes);merged.menuResponsibilities=object(merged.menuResponsibilities);
 merged.shoppingLedger=object(merged.shoppingLedger);merged.pantry=object(merged.pantry);merged.costCatalog=object(merged.costCatalog);
 merged.manualShoppingItems=array(merged.manualShoppingItems);merged.manualTasks=array(merged.manualTasks);merged.tables=array(merged.tables);
 merged.seats=object(merged.seats);merged.inventory=object(merged.inventory);merged.room=object(merged.room);merged.spaceZones=object(merged.spaceZones);
 merged.activities=object(merged.activities);merged.selectedActivities=object(merged.selectedActivities);merged.taskOverrides=object(merged.taskOverrides);
 merged.budgetEntries=array(merged.budgetEntries);merged.actualSpendEntries=array(merged.actualSpendEntries);merged.printableOverrides=object(merged.printableOverrides);
 merged.housePrep={enabled:merged.housePrep?.enabled!==false};
 merged.kitchenResources={...object(merged.kitchenResources),ovens:array(merged.kitchenResources?.ovens),burners:array(merged.kitchenResources?.burners),hosts:array(merged.kitchenResources?.hosts)};
 for(const k of ["estimatedHeadcount","estimatedChildren","estimatedAdultDrinkers","customHeadcount","customChildren","customAdultDrinkers"]){merged.planning[k]=Math.max(0,num(merged.planning[k]));}
 merged.schemaVersion=SCHEMA_VERSION;merged.revision=Math.max(0,num(source?.revision,merged.revision));
 return merged;
}
export function migrateState(raw){
 const wrapped=raw?.state&&raw.schemaVersion!=null?raw.state:raw||{};
 let work=structuredClone(object(wrapped));
 let version=Math.max(1,Math.floor(num(raw?.schemaVersion??work.schemaVersion,1)));
 while(version<SCHEMA_VERSION){const migrate=MIGRATIONS[version];work=migrate?migrate(work):{...work,schemaVersion:version+1};version++;}
 return sanitizeState(work);
}
export function loadState(storage,key=DEFAULT_STORAGE_KEY){const text=storage?.getItem?.(key);if(!text)return null;try{return migrateState(JSON.parse(text));}catch{return null;}}
export function saveState(storage,state,{key=DEFAULT_STORAGE_KEY,expectedRevision=null,bumpRevision=true}={}){const current=loadState(storage,key);if(expectedRevision!=null&&current&&Number(current.revision)!==Number(expectedRevision))return {ok:false,conflict:true,current};const revision=bumpRevision?Math.max(Number(current?.revision)||0,Number(state.revision)||0)+1:Math.max(Number(current?.revision)||0,Number(state.revision)||0);const next={...migrateState(state),revision,savedAt:new Date().toISOString()};storage.setItem(key,JSON.stringify(next));return {ok:true,state:next};}
export function backupState(state){return JSON.stringify({format:"crow-crown-thanksgiving-backup",schemaVersion:SCHEMA_VERSION,exportedAt:new Date().toISOString(),state:migrateState(state)},null,2);}
export function restoreBackup(text){const parsed=typeof text==="string"?JSON.parse(text):text;if(parsed?.format!=="crow-crown-thanksgiving-backup"&&!parsed?.state)throw new Error("Invalid backup");return migrateState(parsed.state||parsed);}
export function browserStorage(){try{return typeof localStorage!=="undefined"?localStorage:null;}catch{return null;}}
export function memoryStorage(seed={}){const map=new Map(Object.entries(seed));return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};}
export function duplicateForNewEvent(state,{name=state.event?.name||"Thanksgiving",dinnerAt=null}={}){const next=migrateState(state);return {...next,revision:0,event:{...next.event,name,dinnerAt},guests:(next.guests||[]).map(g=>({...g,rsvp:"pending"})),seats:{},shoppingLedger:{},taskOverrides:{},manualTasks:(next.manualTasks||[]).map(t=>({...t,completed:false})),actualSpendEntries:[],printableOverrides:{}};}
