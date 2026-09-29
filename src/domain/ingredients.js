import {dishRequirementMode} from "./menu.js";
import {recipeForDish,requiredServingsForDish} from "./recipes.js";
import {scaleQuantity} from "./quantities.js";
import {displayQuantity,normalizeUnit,toCanonical} from "./units.js";

export function ingredientIdentity(ingredient={}){
 if(ingredient.ingredientId)return String(ingredient.ingredientId).trim().toLowerCase();
 const name=String(ingredient.name||ingredient.ingredient||"ingredient").trim().toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 const variant=String(ingredient.variant||"").trim().toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 return variant?`${name}::${variant}`:name;
}
export function scaledIngredientsForDish(state,dishId){
 const dish=state.dishes?.[dishId];if(!dish?.on||dishRequirementMode(dishId,state)!=="ingredients")return [];
 const recipe=recipeForDish(state,dishId);if(!recipe)return [];
 const requiredServings=requiredServingsForDish(state,dishId);
 return recipe.ingredients.filter(x=>!x.optional||x.includeByDefault).map((ingredient,index)=>{
   const quantity=scaleQuantity(ingredient.quantity,recipe.baseServings,requiredServings,{increment:ingredient.scaleIncrement});
   const unit=normalizeUnit(ingredient.unit);const canonical=toCanonical(quantity,unit.id);
   return {key:ingredientIdentity(ingredient),name:ingredient.name,variant:ingredient.variant||"",quantity,unit:unit.id,dimension:canonical.dimension,canonicalQuantity:canonical.quantity,sourceDishId:dishId,sourceRecipeId:recipe.id,sourceRecipeTitle:recipe.title,sourceIngredientIndex:index};
 });
}
export function aggregateIngredients(state){
 const pools=new Map();
 for(const [dishId,dish] of Object.entries(state.dishes||{})){
   if(!dish?.on)continue;
   for(const req of scaledIngredientsForDish(state,dishId)){
     const poolKey=`${req.key}|${req.dimension}`;
     if(!pools.has(poolKey))pools.set(poolKey,{key:req.key,name:req.name,variant:req.variant,dimension:req.dimension,canonicalQuantity:0,sources:[]});
     const pool=pools.get(poolKey);pool.canonicalQuantity+=req.canonicalQuantity;pool.sources.push({dishId:req.sourceDishId,recipeId:req.sourceRecipeId,recipeTitle:req.sourceRecipeTitle,quantity:req.quantity,unit:req.unit,canonicalQuantity:req.canonicalQuantity});
   }
 }
 return [...pools.values()].map(pool=>({...pool,...displayQuantity(pool.canonicalQuantity,pool.dimension)}));
}
