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
   const packageUnit=ingredient.packageUnit||ingredient.unit;const packageQuantity=Math.max(0,Number(ingredient.packageQuantity??ingredient.packageSize)||0);const packageCanonical=packageQuantity?toCanonical(packageQuantity,packageUnit):null;return {key:ingredientIdentity(ingredient),name:ingredient.name,variant:ingredient.variant||"",category:ingredient.category||null,packageQuantity:packageQuantity||null,packageUnit:packageQuantity?packageUnit:null,packageCanonicalQuantity:packageCanonical?.dimension===canonical.dimension?packageCanonical.quantity:null,estimatedPackagePrice:Number.isFinite(Number(ingredient.estimatedPackagePrice))?Number(ingredient.estimatedPackagePrice):null,priceSource:ingredient.priceSource||null,priceUpdatedAt:ingredient.priceUpdatedAt||null,quantity,unit:unit.id,dimension:canonical.dimension,canonicalQuantity:canonical.quantity,sourceDishId:dishId,sourceRecipeId:recipe.id,sourceRecipeTitle:recipe.title,sourceIngredientIndex:index};
 });
}
export function aggregateIngredients(state){
 const pools=new Map();
 for(const [dishId,dish] of Object.entries(state.dishes||{})){
   if(!dish?.on)continue;
   for(const req of scaledIngredientsForDish(state,dishId)){
     const poolKey=`${req.key}|${req.dimension}`;
     if(!pools.has(poolKey))pools.set(poolKey,{key:req.key,name:req.name,variant:req.variant,category:req.category,packageQuantity:req.packageQuantity,packageUnit:req.packageUnit,packageCanonicalQuantity:req.packageCanonicalQuantity,estimatedPackagePrice:req.estimatedPackagePrice,priceSource:req.priceSource,priceUpdatedAt:req.priceUpdatedAt,dimension:req.dimension,canonicalQuantity:0,sources:[]});
     const pool=pools.get(poolKey);pool.canonicalQuantity+=req.canonicalQuantity;if(pool.category!==req.category)pool.category=null;if(pool.packageCanonicalQuantity!==req.packageCanonicalQuantity||pool.packageUnit!==req.packageUnit){pool.packageQuantity=null;pool.packageUnit=null;pool.packageCanonicalQuantity=null;}if(pool.estimatedPackagePrice!==req.estimatedPackagePrice)pool.estimatedPackagePrice=null;pool.sources.push({dishId:req.sourceDishId,recipeId:req.sourceRecipeId,recipeTitle:req.sourceRecipeTitle,quantity:req.quantity,unit:req.unit,canonicalQuantity:req.canonicalQuantity});
   }
 }
 return [...pools.values()].map(pool=>({...pool,...displayQuantity(pool.canonicalQuantity,pool.dimension)}));
}
