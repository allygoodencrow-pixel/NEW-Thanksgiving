import {planningContext} from "./guests.js";
import {recipeForDish} from "./recipes.js";
import {normalizeUnit,toCanonical} from "./units.js";
import {dishRequirementMode} from "./menu.js";

function ledgerPurchasedLb(state){const row=state.shoppingLedger?.["turkey:whole-bird"];if(!row)return null;const unit=normalizeUnit(row.unit||"lb");if(unit.dimension!=="mass")return null;return toCanonical(row.quantity||0,unit.id).quantity/453.59237;}
function roastMinutesForWeight(weightLb){
 const w=Math.max(0,Number(weightLb)||0);
 if(!w)return 0;
 if(w<=8)return 195;
 if(w<=12)return 180;
 if(w<=14)return 225;
 if(w<=18)return 255;
 if(w<=20)return 270;
 return 300;
}
export function deriveTurkeyPlan(state){
 const turkeyDishId=Object.entries(state.dishes||{}).find(([id,d])=>d?.on&&dishRequirementMode(id,state)==="ingredients"&&(recipeForDish(state,id)?.isTurkey||recipeForDish(state,id)?.turkeyRules))?.[0]||null;
 const recipe=turkeyDishId?recipeForDish(state,turkeyDishId):null;
 const rules=recipe?.turkeyRules||{};
 const poundsPerPerson=Math.max(0,Number(rules.poundsPerPerson??state.turkeyPlan?.poundsPerPerson)||1.25);
 const buffer=Math.max(0,Number(rules.bufferPercent??state.turkeyPlan?.bufferPercent)||0);
 const headcount=planningContext(state).planningHeadcount;
 const requiredWeightLb=turkeyDishId?headcount*poundsPerPerson*(1+buffer/100):0;
 const preferredBirdLb=Math.min(20,Math.max(10,Number(rules.preferredBirdWeightLb)||14));
 const birdCount=turkeyDishId&&requiredWeightLb>0?Math.max(1,Math.ceil(requiredWeightLb/preferredBirdLb)):0;
 const averageBirdWeightLb=birdCount?requiredWeightLb/birdCount:0;
 const maxBirdWeightLb=Math.min(24,Math.max(averageBirdWeightLb,Number(rules.maxBirdWeightLb)||20));
 const roastBirdWeightLb=Math.min(maxBirdWeightLb,Math.max(averageBirdWeightLb,0));
 const purchasedWeightLb=Math.max(0,Number(ledgerPurchasedLb(state)??state.turkeyPlan?.purchasedWeightLb)||0);
 const stillNeedLb=Math.max(0,requiredWeightLb-purchasedWeightLb),surplusLb=Math.max(0,purchasedWeightLb-requiredWeightLb);
 const thawHours=turkeyDishId?Math.ceil(roastBirdWeightLb/4)*24:null;
 const cookMinutes=turkeyDishId?roastMinutesForWeight(roastBirdWeightLb):null;
 const restMinutes=Math.max(20,Number(rules.restMinutes)||20);
 const issues=[];
 if(turkeyDishId&&birdCount>Math.max(1,Number(state.event?.ovens)||1))issues.push("turkey-oven-capacity-review");
 if(turkeyDishId&&roastBirdWeightLb>24)issues.push("turkey-bird-weight-too-large");
 return {dishId:turkeyDishId,recipeTitle:recipe?.title||"Turkey",headcount,poundsPerPerson,bufferPercent:buffer,requiredWeightLb,purchasedWeightLb,stillNeedLb,surplusLb,birdCount,averageBirdWeightLb,roastBirdWeightLb,thawHours,cookMinutes,restMinutes,ovenTemperatureF:325,safeMinimumInternalTemperatureF:165,issues};
}
