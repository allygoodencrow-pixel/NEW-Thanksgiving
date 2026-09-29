export const SCHEMA_VERSION=2;
export function createPartyState(overrides={}){
 const base={schemaVersion:SCHEMA_VERSION,event:{name:"Thanksgiving",guests:12,kids:0,service:"family",budget:0,burners:4,ovens:1},planning:{mode:"estimated",estimatedHeadcount:12,estimatedChildren:0,estimatedAdultDrinkers:0,customHeadcount:12,customChildren:0,customAdultDrinkers:0,foodBufferPercent:0},guests:[],recipes:{},dishes:{},menuResponsibilities:{},shoppingLedger:{},pantry:{},manualShoppingItems:[],tables:[],seats:{},inventory:{},spaceZones:{},actualSpendEntries:[],printableOverrides:{}};
 return deepMerge(base,overrides);
}
function deepMerge(target,source){if(!source||typeof source!=="object")return structuredClone(target);const out=structuredClone(target);for(const [key,value] of Object.entries(source)){if(value&&typeof value==="object"&&!Array.isArray(value)&&out[key]&&typeof out[key]==="object"&&!Array.isArray(out[key]))out[key]=deepMerge(out[key],value);else out[key]=structuredClone(value);}return out;}
