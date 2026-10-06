import type { Dish } from './App';
// Publisher quantities are normalized once to their stated planning yield.
const recipe=(id:string,name:string,group:string,serves:number,url:string,rating:string,ingredients:Dish['ingredients'],instructions:string,extra:Partial<Dish>):Dish=>({id,name,group,serves,sourceUrl:url,source:'Allrecipes',rating,recipeVerified:true,style:'reader-favorite',minutes:0,oven:0,temp:0,cost:0,easyCost:0,portion:'One serving per guest',vessel:'Serving platter + utensil',easier:`Prepared ${name}`,makeAhead:'Prepare ingredients ahead; cook near service.',finish:'Serve as directed in the source.',seasoning:'Check ingredient labels and pantry seasonings.',tags:[],ingredients:ingredients.map(([n,q,u,c])=>[n,q/serves,u,c]),instructions,...extra});
export const moreReviewedRecipes:Dish[]=[
recipe('reviewed-honey-carrots','Honey-roasted carrots','Fresh',4,'https://www.allrecipes.com/recipe/214079/honey-roasted-carrots/','4.7 ★ · 410 ratings',[
 ['Carrots',8,'each','Produce'],['Olive oil',3,'tbsp','Pantry'],['Honey',.25,'cup','Pantry']],
 'Coat peeled whole carrots in oil and honey. Season; roast at 350°F until tender, about thirty minutes.',
 {sourceYield:'4 side servings',minutes:40,prepMinutes:10,oven:30,temp:350,seasoning:'Salt and pepper to taste.',tags:['Vegetarian','Gluten-Free','Dairy-Free','Egg-Free','Nut-Free']}),
recipe('reviewed-asparagus','Garlic + Parmesan roasted asparagus','Fresh',4,'https://www.allrecipes.com/recipe/214931/oven-roasted-asparagus/','4.8 ★ · 3,345 ratings',[
 ['Asparagus',1,'bunch','Produce'],['Olive oil',3,'tbsp','Pantry'],['Parmesan',1.5,'tbsp','Dairy'],['Garlic',1,'clove','Produce'],['Sea salt',.25,'tsp','Pantry'],['Black pepper',.5,'tsp','Pantry'],['Lemon juice',1,'tbsp','Produce']],
 'Trim the spears, coat with oil and seasonings, then spread on a tray. Roast at 425°F for 12–15 minutes; finish with lemon.',
 {sourceYield:'4 side servings; source measures asparagus by bunch',minutes:25,prepMinutes:10,oven:15,temp:425,seasoning:'Optional source garlic, Parmesan and lemon are included in shopping.',tags:['Gluten-Free','Egg-Free','Nut-Free']}),
recipe('reviewed-sausage-mushrooms','Sausage-stuffed mushrooms','Appetizer',12,'https://www.allrecipes.com/recipe/234844/easy-sausage-stuffed-mushrooms/','4.7 ★ · 84 ratings',[
 ['Mushrooms',24,'each','Produce'],['Italian sausage',1,'lb','Meat'],['Onions',1,'each','Produce'],['Parmesan',4,'oz','Dairy'],['Italian bread crumbs',.25,'cup','Bakery'],['Garlic',1,'tsp','Produce'],['Parsley',1,'tsp','Produce']],
 'Brown sausage with onion and mushroom trimmings; drain. Combine with crumbs, garlic, parsley and most cheese. Fill caps; bake 350°F twelve minutes, then add remaining cheese and bake three minutes.',
 {sourceYield:'24 mushrooms; 12 appetizer portions of 2',portion:'2 stuffed mushrooms per guest',minutes:45,prepMinutes:30,oven:15,temp:350,batchMode:'whole',ingredientSteps:{Mushrooms:1},vessel:'Rimmed baking sheet + platter',seasoning:'Use fully cooked sausage filling; reserve 1 oz Parmesan for topping.'}),
recipe('reviewed-cranberry-brie','Cranberry + brie pastry bites','Appetizer',12,'https://www.melskitchencafe.com/cranberry-brie-bites/','4.87 ★ · 30 ratings',[
 ['Puff pastry',1,'sheet','Frozen'],['Brie',8,'oz','Dairy'],['Cranberry sauce',1.25,'cup','Pantry'],['Pecans',.25,'cup','Pantry']],
 'Cut thawed pastry into twenty-four squares and press into a mini muffin tin. Add brie, sauce, nuts and seasoning. Bake at 375°F for 18–20 minutes; cool briefly before lifting out.',
 {source:'Mel’s Kitchen Cafe',sourceYield:'24 bites; 12 appetizer portions of 2',portion:'2 bites per guest',minutes:48,prepMinutes:25,oven:20,temp:375,restMinutes:3,batchMode:'whole',vessel:'24 cup mini muffin tin + lined sheet pan',seasoning:'Pinches of brown sugar and kosher salt; cooking spray. Uses prepared cranberry sauce, a publisher-supported option. Contains pecans, wheat and dairy.',makeAhead:'Thaw pastry and portion ingredients ahead; assemble and bake near arrival.'}),
];
