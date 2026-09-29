import {deriveShoppingList} from "./shopping.js";
function n(v){return Math.max(0,Number(v)||0);}
function finiteValue(v){return v!==null&&v!==undefined&&v!==""&&Number.isFinite(Number(v))?Number(v):null;}
function packageEstimate(row,canonicalAmount){
 const packageCanonical=finiteValue(row.packageCanonicalQuantity),price=finiteValue(row.estimatedPackagePrice);
 if(packageCanonical===null||packageCanonical<=0||price===null)return null;
 return Math.ceil(Math.max(0,canonicalAmount)/packageCanonical)*price;
}
export function deriveBudgetPlan(state){
 const lines=[];let incomplete=0;
 for(const row of deriveShoppingList(state)){
  const catalog=state.costCatalog?.[row.key]||{};
  const unitCost=finiteValue(catalog.unitCost??row.estimatedUnitCost);
  const catalogEstimate=finiteValue(catalog.estimatedTotal);
  const actual=n(row.actualCost),committed=Math.max(actual,n(row.committedCost));
  const requiredCanonical=n(row.requiredCanonical),haveCanonical=n(row.haveCanonical),purchasedCanonical=n(row.purchasedCanonical),remainingCanonical=n(row.remainingCanonical);
  const requiredQty=n(row.required?.quantity??row.quantity),remainingQty=n(row.stillNeed?.quantity),purchasedQty=n(row.purchased?.quantity);
  const totalToAcquireCanonical=Math.max(0,requiredCanonical-haveCanonical);
  const packageTotal=packageEstimate(row,totalToAcquireCanonical),packageRemaining=packageEstimate(row,remainingCanonical);
  const hasEstimate=catalogEstimate!==null||packageTotal!==null||unitCost!==null;
  const requiredEstimate=catalogEstimate!==null?n(catalogEstimate):packageTotal!==null?n(packageTotal):unitCost!==null?requiredQty*unitCost:0;
  const purchasedForecast=actual>0?actual:committed>0?committed:unitCost!==null?purchasedQty*unitCost:0;
  const remainingEstimate=packageRemaining!==null?n(packageRemaining):unitCost!==null?remainingQty*unitCost:Math.max(0,requiredEstimate-purchasedForecast);
  const needsPrice=remainingCanonical>0||(purchasedCanonical>0&&!committed&&!actual);
  const unknownPrice=!hasEstimate&&needsPrice;
  if(unknownPrice)incomplete++;
  lines.push({id:`shopping:${row.key}`,category:row.kind||"shopping",label:row.name||row.key,estimated:requiredEstimate,committed,actual,remainingEstimate,forecast:purchasedForecast+remainingEstimate,sourceKey:row.key,unknownPrice,priceSource:catalog.priceSource||row.priceSource||null,priceUpdatedAt:catalog.priceUpdatedAt||row.priceUpdatedAt||null});
 }
 for(const entry of state.budgetEntries||[]){
  const estimated=n(entry.estimated),actual=n(entry.actual),committed=Math.max(actual,n(entry.committed)),remainingEstimate=Math.max(0,estimated-committed),forecast=actual>0?Math.max(actual,committed)+remainingEstimate:committed>0?committed+remainingEstimate:estimated;
  lines.push({...entry,id:String(entry.id||`manual:${lines.length}`),category:entry.category||"other",estimated,committed,actual,remainingEstimate,forecast,unknownPrice:false});
 }
 const totalEstimated=lines.reduce((s,x)=>s+x.estimated,0),totalCommitted=lines.reduce((s,x)=>s+x.committed,0),totalActual=lines.reduce((s,x)=>s+x.actual,0),projectedFinal=lines.reduce((s,x)=>s+x.forecast,0),target=n(state.event?.budget);
 return {target,totalEstimated,totalCommitted,totalActual,projectedFinal,projectedComplete:incomplete===0,remainingToTarget:target?target-projectedFinal:null,incompletePriceLines:incomplete,lines};
}
