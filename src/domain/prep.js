import {dishRequirementMode} from "./menu.js";
import {recipeForDish} from "./recipes.js";
export function derivePrepTasks(state){
 const tasks=[];
 for(const [dishId,dish] of Object.entries(state.dishes||{})){
   if(!dish?.on||dishRequirementMode(dishId,state)!=="ingredients")continue;
   const recipe=recipeForDish(state,dishId);if(!recipe)continue;
   for(const task of recipe.prepTasks)tasks.push({...task,dishId,recipeId:recipe.id,recipeTitle:recipe.title,derived:true});
 }
 return tasks;
}
