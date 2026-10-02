// Selected publisher recipes restored as the operational recipe source of truth.
// Recipe methods are concise planning summaries; sourceUrl links to the publisher's full recipe.
const reviewedAt='2026-09-29';
const priceUpdatedAt='2026-09-29';
const p=(ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,extra={})=>({ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,priceSource:'Crow & Crown planning estimate',priceUpdatedAt,...extra});
const eq=(id,name,quantity=1,kind='equipment',extra={})=>({id,name,quantity,kind,...extra});
const task=(id,title,phase,durationMinutes,extra={})=>({id,title,phase,durationMinutes,...extra});
const ba=(extra={})=>({metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'publisher',publisher:'Bon Appétit',label:'Bon Appétit recipe selected for the Crow & Crown Thanksgiving menu'},...extra});

export const SELECTED_PUBLISHER_RECIPES={
 'ba-dry-turkey':{
  id:'ba-dry-turkey',title:'Dry-Brined Turkey With Tangy Honey Glaze',mealRole:'main',baseServings:9,
  servingStrategy:{basis:'headcount'},batchCapacityServings:10,parallelBatchCapacity:1,
  description:'Bon Appétit dry-brined roast turkey finished with a tangy honey glaze.',
  ingredients:[
   p('kosher-salt','Kosher salt',0.5,'cup','Pantry',3,'cup',6.49),
   p('brown-sugar','Light brown sugar',1,'tbsp','Pantry',4,'cup',3.99),
   p('whole-turkey','Whole turkey',13,'lb','Meat',13,'lb',32),
   p('butter-unsalted','Unsalted butter',6,'oz','Dairy',1,'lb',5.99),
   p('sherry-vinegar','Sherry or red wine vinegar',0.25,'cup','Pantry',16,'floz',6.99),
   p('honey','Honey',1.5,'oz','Pantry',12,'oz',5.99),
   p('worcestershire','Worcestershire sauce',4,'tsp','Pantry',10,'floz',4.49),
   p('fresh-rosemary','Fresh rosemary',0.75,'bunch','Produce',1,'bunch',2.49),
   p('garlic','Garlic cloves',0.3,'head','Produce',3,'head',2.49),
   p('orange','Orange',1,'each','Produce',4,'each',5.49)
  ],
  instructions:[
   'Combine the salt and brown sugar and dry-brine the turkey all over; refrigerate uncovered for at least 12 hours and up to 2 days.',
   'Before roasting, let the turkey lose its refrigerator chill, then butter beneath and over the breast skin.',
   'Begin roasting at high heat to brown the skin, then lower the oven temperature for the remainder of the cook.',
   'Simmer vinegar, honey, Worcestershire, rosemary, garlic, orange zest and butter into the glaze.',
   'Brush with glaze during the lower-temperature roast and continue until the turkey reaches the recipe target temperature.',
   'Rest the turkey for at least 30 minutes before carving.'
  ],
  prepTasks:[
   task('dry-brine','Dry-brine turkey','days-ahead',20,{handsOn:true,fixedStartOffsetMinutes:-2880}),
   task('temper','Bring turkey toward room temperature','before-guests',150,{dependsOn:['dry-brine'],handsOn:false}),
   task('butter','Butter and prepare turkey for roasting','cook',15,{dependsOn:['temper'],handsOn:true}),
   task('high-roast','Initial high-heat roast','cook',30,{dependsOn:['butter'],resourceRequirements:[{type:'oven',temperatureF:450,slots:1}]}),
   task('glaze','Make tangy honey glaze','cook',10,{dependsOn:['butter'],handsOn:true,resourceRequirements:[{type:'burner',slots:1}]}),
   task('low-roast','Lower-temperature roast + glaze','cook',85,{dependsOn:['high-roast','glaze'],resourceRequirements:[{type:'oven',temperatureF:300,slots:1}]}),
   task('rest','Rest turkey','hold',30,{dependsOn:['low-roast'],handsOn:false}),
   task('carve','Carve turkey','serve',15,{dependsOn:['rest'],handsOn:true,finishOffsetMinutes:-5})
  ],
  makeAhead:'Dry-brine 12–48 hours ahead.',storage:'Keep raw turkey refrigerated until the tempering period; refrigerate leftovers promptly.',reheat:'Reheat carved leftovers until steaming hot.',
  equipment:[eq('wire-rack','Wire rack'),eq('rimmed-sheet','Rimmed baking sheet'),eq('small-saucepan','Small saucepan'),eq('food-thermometer','Instant-read thermometer'),eq('carving-knife','Carving knife')],
  servingRequirements:[eq('turkey-platter','Large turkey platter',1,'serving'),eq('carving-set','Carving set',1,'serving')],
  dietaryTags:['nut-free','egg-free','sesame-free'],allergens:['milk','fish'],sourceUrl:'https://www.bonappetit.com/recipe/dry-rubbed-roast-turkey',sourceRating:'4.6 · 135 ratings',preparedPurchase:{estimatedUnitCost:12},isTurkey:true,turkeyRules:{poundsPerPerson:1.35,thawHoursPerPound:6,maxBirdWeightLb:14,minBirdWeightLb:12,restMinutes:30,ovenTemperatureF:300},...ba()
 },
 'ba-simple-stuffing':{
  id:'ba-simple-stuffing',title:'Simple-Is-Best Stuffing',mealRole:'starch',baseServings:9,servingStrategy:{basis:'headcount',factor:0.85},batchCapacityServings:10,parallelBatchCapacity:2,
  description:'Bon Appétit classic herb stuffing with crisp top and tender center.',
  ingredients:[
   p('butter-unsalted','Unsalted butter',6,'oz','Dairy',1,'lb',5.99),p('white-bread','Day-old white bread',1,'lb','Bakery',1,'lb',5.99),
   p('yellow-onion','Yellow onions, chopped',2.5,'each','Produce',3,'each',4.99),p('celery','Celery, sliced',0.5,'bunch','Produce',1,'bunch',2.99),
   p('fresh-parsley','Flat-leaf parsley',0.5,'bunch','Produce',1,'bunch',1.99),p('fresh-sage','Fresh sage',0.25,'bunch','Produce',1,'bunch',2.49),
   p('fresh-rosemary','Fresh rosemary',0.25,'bunch','Produce',1,'bunch',2.49),p('fresh-thyme','Fresh thyme',0.25,'bunch','Produce',1,'bunch',2.49),
   p('kosher-salt','Kosher salt',2,'tsp','Pantry',3,'cup',6.49),p('black-pepper','Black pepper',1,'tsp','Pantry',12,'tbsp',5.49),
   p('chicken-stock','Low-sodium chicken broth',2.5,'cup','Pantry',32,'floz',4.49),p('eggs-large','Large eggs',2,'each','Dairy + Eggs',12,'each',4.99)
  ],
  instructions:['Dry the torn bread in a low oven and cool.','Cook onion and celery in butter until lightly browned; combine with bread and fresh herbs.','Moisten with part of the broth and cool.','Fold in beaten eggs and remaining broth, transfer to a buttered casserole, cover and bake.','Uncover and continue baking until the top is deeply golden and crisp.'],
  prepTasks:[task('dry-bread','Dry bread','day-before',60,{resourceRequirements:[{type:'oven',temperatureF:250,slots:1}]}),task('aromatics','Cook aromatics + herbs','day-before',15,{dependsOn:['dry-bread'],resourceRequirements:[{type:'burner',slots:1}]}),task('assemble','Assemble stuffing','day-before',15,{dependsOn:['aromatics']}),task('covered-bake','Covered bake','cook',40,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]}),task('crisp','Uncover + crisp stuffing','finish',40,{dependsOn:['covered-bake'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]})],
  makeAhead:'Bake through the first stage up to 1 day ahead, then crisp before serving.',storage:'Cool and refrigerate covered.',reheat:'Finish uncovered at 350°F until hot and crisp.',
  equipment:[eq('baking-dish-13x9','13×9 baking dish'),eq('rimmed-sheet','Rimmed baking sheet'),eq('large-skillet','Large skillet'),eq('large-bowl','Large mixing bowl')],
  servingRequirements:[eq('stuffing-dish','Serving casserole',1,'serving'),eq('serving-spoon','Serving spoon',1,'serving')],dietaryTags:['nut-free'],allergens:['milk','wheat','egg'],sourceUrl:'https://www.bonappetit.com/recipe/simple-is-best-stuffing-dressing',sourceRating:'4.6 · 495 ratings',preparedPurchase:{estimatedUnitCost:4},...ba()
 },
 'ba-mashed':{
  id:'ba-mashed',title:'BA’s Best Mashed Potatoes',mealRole:'starch',baseServings:8,servingStrategy:{basis:'headcount',factor:0.9},batchCapacityServings:16,parallelBatchCapacity:1,
  description:'Bon Appétit Yukon Gold mashed potatoes with garlic-rosemary dairy.',
  ingredients:[p('yukon-potatoes','Yukon Gold potatoes',4,'lb','Produce',5,'lb',6.99),p('kosher-salt','Kosher salt',4,'tsp','Pantry',3,'cup',6.49),p('whole-milk','Whole milk',1.5,'cup','Dairy',64,'floz',3.99),p('heavy-cream','Heavy cream',0.5,'cup','Dairy',16,'floz',5.49),p('garlic','Garlic',1,'head','Produce',3,'head',2.49),p('fresh-rosemary','Fresh rosemary',0.75,'bunch','Produce',1,'bunch',2.49),p('butter-unsalted','Unsalted butter',8,'oz','Dairy',1,'lb',5.99),p('black-pepper','Black pepper',1,'tsp','Pantry',12,'tbsp',5.49)],
  instructions:['Simmer whole scrubbed Yukon Gold potatoes in well-salted water until very tender; drain and dry briefly.','Warm milk and cream with garlic and rosemary, then strain.','Rice the hot potatoes and incorporate room-temperature butter and salt.','Gradually fold in the warm infused dairy until silky; finish with black pepper.'],
  prepTasks:[task('boil','Boil potatoes','cook',35,{resourceRequirements:[{type:'burner',slots:1}]}),task('infuse','Infuse milk + cream','cook',8,{resourceRequirements:[{type:'burner',slots:1}]}),task('rice','Rice hot potatoes','finish',10,{dependsOn:['boil']}),task('finish','Fold in butter + infused dairy','finish',10,{dependsOn:['rice','infuse'],finishOffsetMinutes:-15})],
  makeAhead:'Can be made 1 day ahead.',storage:'Cover and chill.',reheat:'Reheat gently, loosening with milk or stock as needed.',
  equipment:[eq('large-pot','Large pot'),eq('potato-ricer','Potato ricer or food mill'),eq('small-saucepan','Small saucepan'),eq('fine-sieve','Fine-mesh sieve')],
  servingRequirements:[eq('potato-bowl','Low serving bowl',1,'serving'),eq('serving-spoon','Large serving spoon',1,'serving')],dietaryTags:['vegetarian','gluten-free','nut-free'],allergens:['milk'],sourceUrl:'https://www.bonappetit.com/recipe/best-mashed-potatoes',sourceRating:'4.6 · 94 ratings',preparedPurchase:{estimatedUnitCost:3},...ba()
 },
 'ba-greenbeans':{
  id:'ba-greenbeans',title:'Green Beans and Mushrooms With Crispy Shallots',mealRole:'vegetable',baseServings:8,servingStrategy:{basis:'headcount',factor:0.8},batchCapacityServings:12,parallelBatchCapacity:1,
  description:'Bon Appétit stovetop green beans with browned mushrooms, butter and crisp shallots.',
  ingredients:[p('green-beans','Green beans',1.5,'lb','Produce',2,'lb',6.99),p('kosher-salt','Kosher salt',1.5,'tsp','Pantry',3,'cup',6.49),p('vegetable-oil','Vegetable oil',0.333,'cup','Pantry',48,'floz',6.99),p('shallots','Large shallots',3,'each','Produce',3,'each',3.99),p('mushrooms','Mushrooms',1,'lb','Produce',1,'lb',7.99),p('butter-unsalted','Unsalted butter',2,'oz','Dairy',1,'lb',5.99),p('sherry-vinegar','Sherry or red wine vinegar',2,'tbsp','Pantry',16,'floz',6.99),p('black-pepper','Black pepper',1,'tsp','Pantry',12,'tbsp',5.49),p('parmesan','Parmesan',2,'oz','Dairy',8,'oz',6.99)],
  instructions:['Blanch green beans briefly in salted water, cool, and drain well.','Fry sliced shallots until crisp; reserve them for the finish.','Brown mushrooms in the same skillet, then add butter and the blanched beans.','Finish with vinegar and pepper, transfer to a platter, and top with Parmesan and crispy shallots.'],
  prepTasks:[task('blanch','Blanch green beans','day-before',10,{resourceRequirements:[{type:'burner',slots:1}]}),task('shallots','Crisp shallots','day-before',10,{resourceRequirements:[{type:'burner',slots:1}]}),task('mushrooms','Brown mushrooms','finish',10,{resourceRequirements:[{type:'burner',slots:1}]}),task('finish','Finish beans + mushrooms','finish',8,{dependsOn:['blanch','shallots','mushrooms'],resourceRequirements:[{type:'burner',slots:1}],finishOffsetMinutes:-10})],
  makeAhead:'Blanch beans 1 day ahead; crispy shallots can also be prepared ahead.',storage:'Chill blanched beans dry; keep crispy shallots loosely covered at room temperature.',reheat:'Finish on the stovetop shortly before dinner.',
  equipment:[eq('medium-pot','Medium pot'),eq('colander','Colander'),eq('large-skillet','Large skillet'),eq('slotted-spoon','Slotted spoon')],
  servingRequirements:[eq('green-bean-platter','Long platter',1,'serving'),eq('serving-tongs','Serving tongs',1,'serving')],dietaryTags:['vegetarian','gluten-free','nut-free'],allergens:['milk'],sourceUrl:'https://www.bonappetit.com/recipe/green-beans-and-mushrooms-with-crispy-shallots',sourceRating:'4.7 · 51 ratings',preparedPurchase:{estimatedUnitCost:4},...ba()
 },
 'ba-honey-brussels':{
  id:'ba-honey-brussels',title:'Charred Brussels Sprouts With Warm Honey Glaze',mealRole:'vegetable',baseServings:4,servingStrategy:{basis:'headcount',factor:0.75},batchCapacityServings:8,parallelBatchCapacity:1,
  description:'Bon Appétit deeply charred Brussels sprouts with a warm sweet-tangy glaze.',
  ingredients:[p('brussels-sprouts','Brussels sprouts',1.5,'lb','Produce',2,'lb',7.99),p('olive-oil','Extra-virgin olive oil',0.25,'cup','Pantry',25.5,'floz',11.99),p('kosher-salt','Kosher salt',0.5,'tsp','Pantry',3,'cup',6.49),p('black-pepper','Black pepper',0.5,'tsp','Pantry',12,'tbsp',5.49),p('honey','Honey',0.25,'cup','Pantry',12,'oz',5.99),p('sherry-vinegar','Sherry or red wine vinegar',0.333,'cup','Pantry',16,'floz',6.99),p('red-pepper-flakes','Crushed red pepper',0.75,'tsp','Pantry',2,'oz',3.99),p('butter-unsalted','Unsalted butter',3,'tbsp','Dairy',1,'lb',5.99),p('scallions','Scallions',3,'each','Produce',1,'bunch',1.49),p('lemon','Lemon',1,'each','Produce',4,'each',4.49)],
  instructions:['Preheat a rimmed sheet pan in a hot oven and season the halved sprouts with oil, salt and pepper.','Roast cut-side down until deeply browned and tender.','Cook honey until amber, then carefully whisk in vinegar, chile, butter and salt to form the glaze.','Toss the roasted sprouts with glaze and scallions; finish with lemon zest.'],
  prepTasks:[task('prep','Trim + halve Brussels sprouts','before-guests',15),task('roast','Char Brussels sprouts','cook',25,{dependsOn:['prep'],resourceRequirements:[{type:'oven',temperatureF:450,slots:1}]}),task('glaze','Make warm honey glaze','cook',10,{resourceRequirements:[{type:'burner',slots:1}]}),task('finish','Glaze + finish sprouts','finish',5,{dependsOn:['roast','glaze'],finishOffsetMinutes:-10})],
  makeAhead:'Trim sprouts ahead; roast and glaze close to service.',storage:'Refrigerate trimmed sprouts.',reheat:'Best finished immediately after roasting.',
  equipment:[eq('rimmed-sheet','Rimmed baking sheet'),eq('small-saucepan','Small saucepan'),eq('tongs','Tongs'),eq('microplane','Microplane')],
  servingRequirements:[eq('brussels-platter','Wide platter',1,'serving'),eq('serving-spoon','Serving spoon',1,'serving')],dietaryTags:['vegetarian','gluten-free','nut-free'],allergens:['milk'],sourceUrl:'https://www.bonappetit.com/recipe/roasted-brussels-sprouts-with-warm-honey-glaze',sourceRating:'4.7 · 159 ratings',preparedPurchase:{estimatedUnitCost:4},...ba()
 },
 'ba-fancy-cranberry':{
  id:'ba-fancy-cranberry',title:'Fancy Jellied Cranberry Sauce',mealRole:'sauce-condiment',baseServings:9,servingStrategy:{basis:'headcount',factor:1},batchCapacityServings:18,parallelBatchCapacity:1,
  description:'Bon Appétit sliceable cranberry sauce with cardamom, bay and orange.',
  ingredients:[p('gelatin','Unflavored powdered gelatin',0.5,'oz','Pantry',1,'oz',3.99),p('cranberries','Fresh or frozen cranberries',1.5,'lb','Produce',12,'oz',3.49),p('cardamom','Cardamom pods',0.1,'oz','Pantry',1,'oz',5.99),p('bay-leaves','Fresh bay leaves',0.1,'bunch','Produce',1,'bunch',2.99),p('kosher-salt','Kosher salt',0.25,'tsp','Pantry',3,'cup',6.49),p('cranberry-juice','Unsweetened cranberry juice',1,'cup','Beverages',32,'floz',4.99),p('granulated-sugar','Sugar',0.75,'lb','Pantry',4,'lb',4.49),p('orange','Orange',1,'each','Produce',4,'each',5.49)],
  instructions:['Bloom gelatin in warm water and lightly oil the mold.','Cook cranberries with cardamom, bay, salt, juice and most of the sugar until burst and syrupy.','Remove the whole spices and dissolve the bloomed gelatin into the hot cranberry mixture.','Pour into the mold and chill until fully set.','Unmold and finish with sugared orange zest and reserved cranberries.'],
  prepTasks:[task('cook','Cook cranberry base','days-ahead',20,{resourceRequirements:[{type:'burner',slots:1}]}),task('chill','Chill cranberry mold','days-ahead',720,{dependsOn:['cook'],handsOn:false}),task('unmold','Unmold + garnish cranberry sauce','serve',10,{dependsOn:['chill'],finishOffsetMinutes:-20})],
  makeAhead:'Make up to 2 days ahead and keep chilled.',storage:'Keep chilled in its mold until serving.',reheat:'Serve chilled; do not reheat.',
  equipment:[eq('saucepan','Large saucepan'),eq('cranberry-mold','4-cup mold or Bundt pan')],
  servingRequirements:[eq('cranberry-platter','Small platter',1,'serving'),eq('small-serving-spoon','Small serving spoon',1,'serving')],dietaryTags:['gluten-free','dairy-free','nut-free','egg-free'],allergens:[],sourceUrl:'https://www.bonappetit.com/recipe/fancy-cranberry-sauce',sourceRating:'4.7 · 26 ratings',preparedPurchase:{estimatedUnitCost:2},...ba()
 },
 'ba-parker-rolls':{
  id:'ba-parker-rolls',title:'Parker House Rolls',mealRole:'bread',baseServings:18,servingStrategy:{basis:'headcount',factor:1.5},batchCapacityServings:36,parallelBatchCapacity:1,
  description:'Bon Appétit buttery folded Parker House rolls.',
  ingredients:[p('active-dry-yeast','Active dry yeast',2.25,'tsp','Pantry',6.75,'tsp',2.49),p('whole-milk','Whole milk',1,'cup','Dairy',64,'floz',3.99),p('vegetable-shortening','Vegetable shortening',0.12,'lb','Pantry',16,'oz',5.49),p('granulated-sugar','Sugar',0.08,'lb','Pantry',4,'lb',4.49),p('kosher-salt','Kosher salt',1.5,'tsp','Pantry',3,'cup',6.49),p('eggs-large','Large egg',1,'each','Dairy + Eggs',12,'each',4.99),p('all-purpose-flour','All-purpose flour',1.56,'lb','Bakery',5,'lb',5.49),p('butter-unsalted','Unsalted butter',2,'oz','Dairy',1,'lb',5.99),p('flaky-salt','Flaky sea salt',0.2,'oz','Pantry',4,'oz',5.99)],
  instructions:['Proof the yeast in warm water.','Warm the milk and combine it with shortening, sugar and salt; add egg, yeast and flour to form a soft dough.','Knead until smooth, let rise, then roll, cut and fold the pieces with melted butter.','Arrange in a buttered 9×13 dish and chill for at least 30 minutes.','Bake at 350°F until puffed and golden; brush with butter and finish with flaky salt.'],
  prepTasks:[task('mix','Mix + knead roll dough','day-before',20),task('rise','First rise','day-before',60,{dependsOn:['mix'],handsOn:false}),task('shape','Shape + butter rolls','day-before',25,{dependsOn:['rise']}),task('chill','Chill shaped rolls','before-guests',30,{dependsOn:['shape'],handsOn:false}),task('bake','Bake Parker House rolls','cook',30,{dependsOn:['chill'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]}),task('finish','Butter + salt rolls','finish',5,{dependsOn:['bake'],finishOffsetMinutes:-20})],
  makeAhead:'Shaped rolls can chill for several hours before baking.',storage:'Cover and refrigerate shaped rolls; store baked leftovers airtight.',reheat:'Warm briefly before serving.',
  equipment:[eq('large-bowl','Large mixing bowl'),eq('small-saucepan','Small saucepan'),eq('baking-dish-13x9','9×13 baking dish')],
  servingRequirements:[eq('bread-basket','Bread basket',1,'serving'),eq('bread-tongs','Bread tongs',1,'serving')],dietaryTags:['vegetarian','nut-free'],allergens:['milk','egg','wheat'],sourceUrl:'https://www.bonappetit.com/bon-appetit/recipe/parker-house-rolls',sourceRating:'576 reader ratings',preparedPurchase:{estimatedUnitCost:1.5},...ba()
 },
 'ba-pumpkin-pie':{
  id:'ba-pumpkin-pie',title:'BA’s Best Pumpkin Pie',mealRole:'dessert',baseServings:8,servingStrategy:{basis:'headcount'},batchCapacityServings:8,parallelBatchCapacity:2,
  description:'Bon Appétit pumpkin pie with condensed milk, maple and individual warm spices.',
  ingredients:[p('pie-crust','9-inch pie crust',1,'each','Frozen',2,'each',5.99),p('eggs-large','Large eggs',3,'each','Dairy + Eggs',12,'each',4.99),p('egg-yolk','Egg yolk',1,'each','Dairy + Eggs',12,'each',4.99),p('granulated-sugar','Sugar',0.15,'lb','Pantry',4,'lb',4.49),p('cinnamon','Ground cinnamon',0.1,'oz','Pantry',2,'oz',3.99),p('kosher-salt','Kosher salt',0.75,'tsp','Pantry',3,'cup',6.49),p('ground-ginger','Ground ginger',0.05,'oz','Pantry',2,'oz',3.99),p('ground-cloves','Ground cloves',0.02,'oz','Pantry',2,'oz',3.99),p('ground-nutmeg','Ground nutmeg',0.02,'oz','Pantry',2,'oz',3.99),p('pumpkin-puree','Unsweetened pumpkin purée',17,'oz','Pantry',15,'oz',2.49),p('condensed-milk','Sweetened condensed milk',8.8,'oz','Dairy',14,'oz',2.79),p('heavy-cream','Heavy cream',0.333,'cup','Dairy',16,'floz',5.49),p('maple-syrup','Maple syrup',2,'tbsp','Pantry',12,'floz',8.99),p('vanilla','Vanilla extract',2,'tsp','Pantry',4,'floz',8.99)],
  instructions:['Shape and chill the pie crust, then blind-bake it until set and lightly browned.','Whisk the eggs, yolk, sugar and spices, then combine with pumpkin, condensed milk, cream, maple and vanilla.','Pour the filling into the cooled crust and bake at 325°F until the edges are set and the center still has a gentle wobble.','Cool completely before slicing; serve with whipped cream if desired.'],
  prepTasks:[task('shape','Shape + chill pie crust','day-before',30),task('blind-bake','Blind-bake crust','day-before',45,{dependsOn:['shape'],resourceRequirements:[{type:'oven',temperatureF:425,slots:1}]}),task('fill','Mix pumpkin filling','day-before',15,{dependsOn:['blind-bake']}),task('bake','Bake pumpkin pie','day-before',70,{dependsOn:['fill'],resourceRequirements:[{type:'oven',temperatureF:325,slots:1}]}),task('cool','Cool pie completely','day-before',180,{dependsOn:['bake'],handsOn:false})],
  makeAhead:'Bake 1 day ahead.',storage:'Wrap and chill after cooling.',reheat:'Serve at room temperature or gently warmed.',
  equipment:[eq('pie-dish','9-inch pie dish'),eq('mixing-bowl','Large mixing bowl'),eq('whisk','Whisk'),eq('wire-rack','Wire cooling rack')],
  servingRequirements:[eq('cake-stand','Cake stand or pie plate',1,'serving'),eq('pie-server','Pie server',1,'serving')],dietaryTags:['vegetarian','nut-free'],allergens:['milk','egg','wheat'],sourceUrl:'https://www.bonappetit.com/recipe/best-pumpkin-pie',sourceRating:'4.5 · 64 ratings',preparedPurchase:{estimatedUnitCost:3},...ba()
 }
};
