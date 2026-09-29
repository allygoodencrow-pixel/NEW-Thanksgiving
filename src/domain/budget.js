import {deriveShoppingList} from "./shopping.js";
function n(v){return Math.max(0,Number(v)||0);}
export function deriveBudgetPlan(state){
 const lines=[];let incomplete=0;
 for(const row of deriveShoppingList(state)){
  const catalog=state.costCatalog?.[row.key]||{};const unitCost=Number(catalog.unitCost??row.estimatedUnitCost);
  const requiredQty=Number(row.required?.quantity??row.quantity??0)||0;const remainingQty=Number(row.stillNeed?.quantity??0)||0;const actual=n(row.actualCost);const hasEstimate=Number.isFinite(unitCost);
  const estimate=Number(catalog.estimatedTotal);const requiredEstimate=Number.isFinite(estimate)?n(estimate):(hasEstimate?requiredQty*unitCost:0);const remainingEstimate=hasEstimate?remainingQty*unitCost:Math.max(0,requiredEstimate-actual);
  if(!hasEstimate&&!Number.isFinite(estimate)&&remainingQty>0)incomplete++;
  lines.push({id:`shopping:${row.key}`,category:row.kind||"shopping",label:row.name||row.key,estimated:requiredEstimate,committed:actual,actual,remainingEstimate,forecast:actual+remainingEstimate,sourceKey:row.key});
 }
 for(const entry of state.budgetEntries||[]){const estimated=n(entry.estimated),committed=n(entry.committed),actual=n(entry.actual),forecast=actual>0?actual:committed>0?committed:estimated;lines.push({...entry,id:String(entry.id||`manual:${lines.length}`),category:entry.category||"other",estimated,committed,actual,remainingEstimate:Math.max(0,forecast-actual),forecast});}
 const totalEstimated=lines.reduce((s,x)=>s+x.estimated,0),totalCommitted=lines.reduce((s,x)=>s+x.committed,0),totalActual=lines.reduce((s,x)=>s+x.actual,0),projectedFinal=lines.reduce((s,x)=>s+x.forecast,0),target=n(state.event?.budget);
 return {target,totalEstimated,totalCommitted,totalActual,projectedFinal,remainingToTarget:target?target-projectedFinal:null,incompletePriceLines:incomplete,lines};
}
