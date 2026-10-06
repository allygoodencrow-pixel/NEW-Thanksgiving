import type { Dish } from './App';

// Completed recipe ideas. Publisher measurements are normalized once; fixed
// birds and pastries scale in whole batches through the existing plan engine.
const recipe = (id:string,name:string,group:string,serves:number,source:string,sourceUrl:string,ingredients:Dish['ingredients'],steps:string[],extra:Partial<Dish>):Dish => ({
  id,name,group,serves,source,sourceUrl,style:'recipe',recipeVerified:true,
  minutes:0,oven:0,temp:0,cost:0,easyCost:0,portion:'One portion per guest',
  vessel:'Serving dish + utensil',easier:`Prepared ${name}`,
  makeAhead:'Prepare components ahead; finish near serving.',finish:'Serve after the final cooking step.',
  ingredients:ingredients.map(([n,q,u,c])=>[n,q/serves,u,c]),instructions:steps.join('\n'),
  tags:[],pantryChecks:[],...extra,
});
export const referenceRecipes:Dish[] = [
  recipe('reference-brined-turkey','Classic brined roast turkey','Main',10,'Alton Brown','https://altonbrown.com/recipes/good-eats-roast-thanksgiving-turkey/',[
    ['Turkey',1,'14–16 lb bird','Meat'],['Vegetable broth',16,'cup','Pantry'],['Kosher salt',1,'cup','Pantry'],['Brown sugar',.5,'cup','Pantry'],['Black peppercorns',1,'tbsp','Pantry'],['Allspice berries',1.5,'tsp','Pantry'],['Candied ginger',1.5,'tsp','Pantry'],['Water',17,'cup','Kitchen'],['Apples',1,'each','Produce'],['Onions',.5,'each','Produce'],['Rosemary',4,'sprig','Produce'],['Sage',6,'leaf','Produce'],
  ],[
    'Thaw first. Boil broth with salt, sugar, peppercorns, allspice and ginger; cool, then refrigerate until cold.',
    'Add 16 cups iced water per bird. Submerge in a food-safe container; refrigerate 12 hours, turning halfway. Keep at or below 40°F.',
    'Discard brine; pat dry. Heat oven to 500°F. Microwave apple, onion and remaining water 5 minutes; drain. Place aromatics and herbs in cavity; oil skin lightly.',
    'Roast 30 minutes, shield breast with foil, reduce to 350°F and allow 90–120 minutes more. Check breast, inner thigh and wing for 165°F; continue if needed.',
    'Rest 30 minutes before carving. Do not scale cooking time with guest count; roast additional source-size birds in separate batches.',
  ],{sourceYield:'10–12 servings; one 14–16 lb bird',minutes:210,prepMinutes:30,oven:150,temp:350,restMinutes:30,batchMode:'whole',vessel:'Food-safe brining container + roasting rack + thermometer + carving platter',pantryChecks:['Canola oil','Ice','Foil'],seasoning:'Water: 16 cups for diluted brine + 1 cup for aromatics per bird. Do not brine a pre-salted or injected turkey. Conservative adaptation uses 165°F and omits rinsing raw poultry.',makeAhead:'Make and chill brine ahead; refrigerate turkey in brine for 12 hours before roasting.',advanceTasks:[{label:'Make brine and refrigerate until fully chilled',minutesBeforeCooking:24*60},{label:'Submerge thawed turkey in cold brine; refrigerate 12 hours',minutesBeforeCooking:12*60+30}],ovenStages:[{label:'Initial roast',minutes:30,temp:500},{label:'Shield breast; finish roasting to 165°F',minutes:120,temp:350}],image:'/resources/recipes/reference-brined-turkey.jpeg'}),
  recipe('reference-vegetarian-dressing','Mushroom + pecan vegetarian dressing','Starch',10,'Serious Eats','https://www.seriouseats.com/best-vegan-stuffing-thanksgiving-recipe-vegetarian',[
    ['Vegan white bread',2.5,'lb','Bakery'],['Mushrooms',1,'lb','Produce'],['Toasted pecans',6,'oz','Pantry'],['Olive oil',.5,'cup','Pantry'],['Sage',.5,'cup','Produce'],['Onions',1,'each','Produce'],['Leeks',1,'each','Produce'],['Celery',4,'stalk','Produce'],['Garlic',2,'clove','Produce'],['Vegetable stock',4,'cup','Pantry'],['Parsley',.25,'cup','Produce'],
  ],[
    'Dry cubed bread at 275°F for 50 minutes, rotating trays; cool.',
    'Chop mushrooms and pecans separately. Brown mushrooms in oil with half the sage. Soften onion, leek, celery, garlic and remaining sage.',
    'Add stock, pecans and half the parsley; boil. Fold in bread and season.',
    'Bake in greased 9 × 13 inch dish: covered 30 minutes at 350°F, uncovered 10. Rest 5 minutes; add remaining parsley.',
  ],{sourceYield:'10–14 servings; one 9 × 13 inch casserole',minutes:145,prepMinutes:10,oven:90,temp:350,restMinutes:5,batchMode:'whole',ovenStages:[{label:'Dry bread cubes',minutes:50,temp:275},{label:'Bake dressing, covered then uncovered',minutes:40,temp:350,waitBefore:40}],tags:['Vegan','Vegetarian','Dairy-Free','Egg-Free'],vessel:'Two sheet pans + Dutch oven + 9 × 13 inch baker',pantryChecks:['Salt','Black pepper','Oil for greasing'],makeAhead:'Dry bread and chop vegetables ahead; use ready-to-use vegetable stock. Refrigerate cooked components until assembling.',seasoning:'Contains pecans and wheat. Use vegan bread and vegetable stock; no poultry stock or butter. Ready-made stock is the planning adaptation.',image:'/resources/recipes/reference-vegetarian-dressing.jpeg'}),
  recipe('reference-tarragon-beans','Tarragon green beans','Fresh',8,'Frosted Kale · Martha Stewart recipe','https://frostedkale.com/tarragon-green-beans/',[
    ['Salted butter',3,'tbsp','Dairy'],['Shallots',1,'each','Produce'],['Green beans',2,'lb','Produce'],['Dry white wine',.5,'cup','Beverages'],['Tarragon',2,'tbsp','Produce'],
  ],[
    'Trim beans, mince shallot and chop tarragon.',
    'Melt butter in a deep skillet. Soften shallot for 2–3 minutes, then toss in beans and cook 2 minutes.',
    'Pour in wine; raise heat and stir frequently for 12 minutes. Lower heat and cook 3–5 minutes more until tender.',
    'Stir in tarragon, season with salt and pepper and transfer to a warmed platter.',
  ],{sourceYield:'8 side servings',minutes:30,prepMinutes:30,tags:['Vegetarian','Gluten-Free','Egg-Free','Nut-Free'],vessel:'Deep skillet + platter + tongs',pantryChecks:['Salt','Black pepper'],makeAhead:'Trim beans and chop shallot the day before; cook near dinner.',image:'/resources/recipes/reference-tarragon-beans.jpeg'}),
  recipe('reference-apple-galette','Salted-butter apple galette + maple cream','Dessert',8,'Bon Appétit','https://www.bonappetit.com/recipe/salted-butter-apple-galette-with-maple-whipped-cream',[
    ['Flour',1,'cup','Pantry'],['Sugar',2,'tbsp','Pantry'],['Kosher salt',.5,'tsp','Pantry'],['Unsalted butter',6,'tbsp','Dairy'],['Salted butter',4,'tbsp','Dairy'],['Eggs',2,'each','Dairy'],['Vanilla bean',.5,'each','Pantry'],['Apples',1,'lb','Produce'],['Brown sugar',3,'tbsp','Pantry'],['Heavy cream',2,'cup','Dairy'],['Maple syrup',2,'tbsp','Pantry'],['Water',1,'tsp','Kitchen'],
  ],[
    'Rub unsalted butter into flour, half the sugar and salt; mix in one beaten egg. Shape and chill 2 hours.',
    'Brown salted butter with vanilla; discard pod. Roll dough, arrange thin apple slices with a border; add brown butter and brown sugar.',
    'Fold edges inward; brush with remaining egg beaten with water. Sprinkle remaining sugar. Bake 375°F for 40–50 minutes; cool slightly.',
    'Whip cream to soft peaks, fold in maple syrup and serve separately.',
  ],{sourceYield:'8 servings; one 14 × 10 inch galette',rating:'4.0 ★ · 405 ratings',minutes:225,prepMinutes:160,oven:50,temp:375,restMinutes:15,batchMode:'whole',tags:['Vegetarian','Nut-Free'],vessel:'Sheet pan + parchment + saucepan + mixing bowl',pantryChecks:['Flour for rolling','Parchment'],ingredientNotes:{Sugar:'Per galette: 1 tbsp dough + 1 tbsp crust finish.',Eggs:'Per galette: 1 egg in dough + 1 for glaze.',Butter:'Unsalted butter is for dough; salted butter is for the apples.'},prepPhases:[{label:'Mix tart dough',offsetMinutes:0},{label:'Chill dough 2 hours',offsetMinutes:20},{label:'Brown butter; roll dough and arrange apples',offsetMinutes:140}],makeAhead:'Dough can chill up to 2 days. Bake galette ahead; refrigerate whipped cream separately.',seasoning:'Homemade dough ingredients are included; source dough: https://www.bonappetit.com/recipe/basic-tart-dough. Contains wheat, eggs and dairy.',image:'/resources/recipes/reference-apple-galette.jpeg'}),
];
