export const SCHEMA_VERSION=5;
export const DEFAULT_ROLE_SERVING_TARGETS={main:1,"secondary-main":.5,starch:1,vegetable:1,fresh:.5,bread:.75,"sauce-condiment":.25,appetizer:.75,dessert:1,"non-alcoholic-drink":1,alcohol:1,coffee:1};
export function createPartyState(overrides={}){
 const base={
  schemaVersion:SCHEMA_VERSION,revision:0,setupCompleted:false,
  event:{name:"Thanksgiving",guests:12,kids:0,service:"family",budget:0,burners:4,ovens:1,dinnerAt:null,arrivalAt:null,timeZone:null,cookingHelpers:0},
  planning:{mode:"estimated",estimatedHeadcount:12,estimatedChildren:0,estimatedAdultDrinkers:0,estimatedHouseholds:0,customHeadcount:12,customChildren:0,customAdultDrinkers:0,customHouseholds:0,foodBufferPercent:0,placeSettingSparePercent:5,roleServingTargets:DEFAULT_ROLE_SERVING_TARGETS,requiredMenuRoles:["main","starch","vegetable","dessert"],dietaryRequiredRoles:["main","starch","vegetable"]},
  guests:[],recipes:{},dishes:{},menuResponsibilities:{},
  shoppingLedger:{},pantry:{},manualShoppingItems:[],costCatalog:{},
  kitchenResources:{ovens:[],burners:[],hosts:[]},taskOverrides:{},manualTasks:[],
  turkeyPlan:{poundsPerPerson:1.25,bufferPercent:0,purchasedWeightLb:0},
  housePrep:{enabled:true},
  tables:[],seats:{},inventory:{},room:{},spaceZones:{},
  activities:{},selectedActivities:{},
  budgetEntries:[],actualSpendEntries:[],
  printableOverrides:{}
 };
 return deepMerge(base,overrides);
}
export function bumpRevision(state){return {...state,schemaVersion:SCHEMA_VERSION,revision:Math.max(0,Number(state.revision)||0)+1};}
function deepMerge(target,source){if(!source||typeof source!=="object")return structuredClone(target);const out=structuredClone(target);for(const [key,value] of Object.entries(source)){if(value&&typeof value==="object"&&!Array.isArray(value)&&out[key]&&typeof out[key]==="object"&&!Array.isArray(out[key]))out[key]=deepMerge(out[key],value);else out[key]=structuredClone(value);}return out;}
