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
  activities:{
   'gratitude-round':{name:'Gratitude round',title:'Gratitude round',description:'One line of thanks per guest before dinner.',supplies:[{key:'gratitude-cards',name:'Gratitude + conversation cards',quantityPerHousehold:1,estimatedUnitCost:8,unit:'each'}],tasks:[{id:'set-out',title:'Set out gratitude cards',phase:'before-guests',durationMinutes:5,handsOn:true}],zoneRequirement:'dining',printables:[{type:'gratitude-cards'}]},
   'kids-activity-kit':{name:'Kids activity kit',title:'Kids table activity kit',description:'Crayons and activity sheets for the kids table.',supplies:[{key:'crayons',name:'Crayons + coloring sets',fixedQuantity:4,estimatedUnitCost:9,unit:'each'},{key:'activity-sheets',name:'Printed activity sheets',quantityPerPerson:1,estimatedUnitCost:0.5,unit:'each'}],tasks:[{id:'set-kids-table',title:'Set up kids table activities',phase:'day-before',durationMinutes:10,handsOn:true}],zoneRequirement:'kids-area',printables:[{type:'kids-activities'}]},
   'guest-favors':{name:'Guest favors',title:'Guest favors',description:'A small favor bag per household.',supplies:[{key:'favor-bags',name:'Favor bags + tags',quantityPerHousehold:1,estimatedUnitCost:3,unit:'each'}],tasks:[{id:'pack-favors',title:'Pack + tag favors',phase:'day-before',durationMinutes:15,handsOn:true}],printables:[{type:'favor-tags'}]},
   'table-candles':{name:'Table candles',title:'Taper candles + holders',description:'Candlelight for the dining tables.',supplies:[{key:'taper-candles',name:'Taper candles',fixedQuantity:8,estimatedUnitCost:12,unit:'each'},{key:'candle-holders',name:'Candle holders',fixedQuantity:8,estimatedUnitCost:18,unit:'each'}],tasks:[{id:'set-candles',title:'Place candles + check holders',phase:'before-guests',durationMinutes:8,handsOn:true}],zoneRequirement:'dining',printables:[]},
   'fresh-flowers':{name:'Fresh flowers',title:'Centerpiece flowers',description:'Two arrangements from the market run.',supplies:[{key:'flowers',name:'Flowers for centerpieces',fixedQuantity:2,estimatedUnitCost:20,unit:'bunch'}],tasks:[{id:'trim-flowers',title:'Buy, trim + arrange flowers',phase:'morning',durationMinutes:25,handsOn:true}],zoneRequirement:'dining',printables:[]}
  },
  selectedActivities:{},

  budgetEntries:[],actualSpendEntries:[],
  printableOverrides:{}
 };
 return deepMerge(base,overrides);
}
export function bumpRevision(state){return {...state,schemaVersion:SCHEMA_VERSION,revision:Math.max(0,Number(state.revision)||0)+1};}
function deepMerge(target,source){if(!source||typeof source!=="object")return structuredClone(target);const out=structuredClone(target);for(const [key,value] of Object.entries(source)){if(value&&typeof value==="object"&&!Array.isArray(value)&&out[key]&&typeof out[key]==="object"&&!Array.isArray(out[key]))out[key]=deepMerge(out[key],value);else out[key]=structuredClone(value);}return out;}
