import {recipeForDish} from "./recipes.js";
export const SERVICE_STYLES={
 family:{id:"family",label:"Family style",servingPlacement:"table",requiredZones:["dining"]},
 buffet:{id:"buffet",label:"Buffet",servingPlacement:"buffet",requiredZones:["dining","buffet"]},
 plated:{id:"plated",label:"Plated",servingPlacement:"kitchen-staging",requiredZones:["dining","kitchen-staging"]},
 cocktail:{id:"cocktail",label:"Cocktail / grazing",servingPlacement:"grazing",requiredZones:["dining","grazing"]}
};
export function serviceStyle(state){return SERVICE_STYLES[state.event?.service]||SERVICE_STYLES.family;}
export function deriveServicePlan(state){
 const style=serviceStyle(state);const zones=new Set(style.requiredZones);const dishes=[];
 for(const [dishId,dish] of Object.entries(state.dishes||{})){if(!dish?.on)continue;const recipe=recipeForDish(state,dishId);if(!recipe)continue;dishes.push({dishId,title:recipe.title,placement:style.servingPlacement,servingRequirements:recipe.servingRequirements||[]});}
 const existing=new Set(Object.keys(state.spaceZones||{}));for(const t of state.tables||[])if(t?.use)existing.add(String(t.use));
 const missingZones=[...zones].filter(z=>!existing.has(z)&&z!=="dining");
 return {style,requiredZones:[...zones],missingZones,dishes,tasks:missingZones.map(zone=>({id:`service-zone:${zone}`,title:`Set up ${zone.replace(/-/g," ")} zone`,phase:"setup",durationMinutes:0,needsDuration:true,derived:true,source:"service-style"}))};
}
