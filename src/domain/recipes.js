import {planningContext} from "./guests.js";
import {normalizeDishRecord} from "./menu.js";

export function normalizeIngredient(ingredient={}){
 const name=String(ingredient.name||ingredient.ingredient||"Ingredient").trim();
 const ingredientId=String(ingredient.ingredientId||ingredient.id||"").trim();
 return {...ingredient,name,ingredientId:ingredientId||undefined,quantity:Math.max(0,Number(ingredient.quantity)||0),unit:String(ingredient.unit||"each"),variant:String(ingredient.variant||"").trim(),optional:Boolean(ingredient.optional)};
}
export function normalizeRecipe(recipe={}){
 const id=String(recipe.id||recipe.recipeId||slug(recipe.title||recipe.name||"recipe"));
 const title=String(recipe.title||recipe.name||id);
 const baseServings=Math.max(1,Number(recipe.baseServings||recipe.servings)||1);
 const ingredients=Array.isArray(recipe.ingredients)?recipe.ingredients.map(normalizeIngredient):[];
 const prepTasks=Array.isArray(recipe.prepTasks)?recipe.prepTasks.map((task,index)=>typeof task==="string"?{id:`${id}:prep:${index}`,title:task}:({...task,id:String(task.id||`${id}:prep:${index}`),title:String(task.title||task.name||`Prep ${index+1}`)})):[];
 return {...recipe,id,title,baseServings,ingredients,prepTasks};
}
export function upsertRecipe(state,recipe){const normalized=normalizeRecipe(recipe);return {...state,recipes:{...(state.recipes||{}),[normalized.id]:normalized}};}
export function addRecipeToMenu(state,recipeOrId,options={}){
 let next=state;let recipeId;
 if(typeof recipeOrId==="string")recipeId=recipeOrId;else{const normalized=normalizeRecipe(recipeOrId);recipeId=normalized.id;next=upsertRecipe(next,normalized);}
 if(!next.recipes?.[recipeId]&&!options.allowMissingRecipe)throw new Error(`Unknown recipe: ${recipeId}`);
 const current=normalizeDishRecord(next.dishes?.[recipeId]||{});
 return {...next,dishes:{...(next.dishes||{}),[recipeId]:{...current,...options,on:true,recipeId,preparationMode:options.preparationMode||current.preparationMode||"homemade"}}};
}
export function removeDishFromMenu(state,dishId){const current=normalizeDishRecord(state.dishes?.[dishId]||{});return {...state,dishes:{...(state.dishes||{}),[dishId]:{...current,on:false}}};}
export function recipeForDish(state,dishId){const dish=normalizeDishRecord(state.dishes?.[dishId]||{});const recipeId=dish.recipeId||dishId;const recipe=state.recipes?.[recipeId]||dish.recipe;return recipe?normalizeRecipe({...recipe,id:recipe.id||recipeId}):null;}
export function requiredServingsForDish(state,dishId){
 const dish=normalizeDishRecord(state.dishes?.[dishId]||{});const recipe=recipeForDish(state,dishId);if(!recipe)return 0;
 if(Number.isFinite(Number(dish.servingsOverride))&&Number(dish.servingsOverride)>=0)return Number(dish.servingsOverride);
 const plan=planningContext(state);const strategy=recipe.servingStrategy||{};const basis=strategy.basis||"headcount";
 let diners=basis==="adults"?plan.planningAdults:basis==="children"?plan.planningChildren:basis==="fixed"?recipe.baseServings:plan.planningHeadcount;
 diners*=Math.max(0,Number(strategy.factor)||1);
 const recipeBuffer=Number(strategy.bufferPercent);const globalBuffer=Number(state.planning?.foodBufferPercent)||0;const buffer=Number.isFinite(recipeBuffer)?recipeBuffer:globalBuffer;
 return diners*(1+Math.max(0,buffer)/100);
}
function slug(value){return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"recipe";}
