import {planningContext} from "./guests.js";
import {aggregateIngredients} from "./ingredients.js";
import {derivePrepTasks} from "./prep.js";
import {deriveShoppingList} from "./shopping.js";

export function derivePlan(state){
 return {
   planning:planningContext(state),
   ingredients:aggregateIngredients(state),
   shopping:deriveShoppingList(state),
   prep:derivePrepTasks(state)
 };
}
