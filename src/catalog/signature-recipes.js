// Crow & Crown original signature recipes.
// These are the supported, fully structured recipes used by the connected Thanksgiving planner.
// Price fields are planning estimates, not retailer quotes. Food-safety notes use USDA/FSIS guidance where applicable.
const reviewedAt='2026-09-29';
const priceUpdatedAt='2026-09-29';
const p=(ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,extra={})=>({
  ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,
  priceSource:'Crow & Crown planning estimate',priceUpdatedAt,...extra
});
const eq=(id,name,quantity=1,kind='equipment',extra={})=>({id,name,quantity,kind,...extra});
const task=(id,title,phase,durationMinutes,extra={})=>({id,title,phase,durationMinutes,...extra});

export const SIGNATURE_RECIPE_OVERRIDES={
 turkey:{
  id:'turkey',title:'Herb-roasted turkey',mealRole:'main',baseServings:12,
  servingStrategy:{basis:'headcount'},batchCapacityServings:16,parallelBatchCapacity:1,
  description:'Whole roast turkey with herb butter, aromatics and pan juices.',
  ingredients:[
   p('butter-unsalted','Unsalted butter',0.5,'lb','Dairy',1,'lb',5.99),
   p('kosher-salt','Kosher salt',3,'tbsp','Pantry',96,'tbsp',6.49),
   p('black-pepper','Black pepper',1,'tbsp','Pantry',12,'tbsp',5.49),
   p('fresh-sage','Fresh sage',0.5,'bunch','Produce',1,'bunch',2.49),
   p('fresh-thyme','Fresh thyme',0.5,'bunch','Produce',1,'bunch',2.49),
   p('fresh-rosemary','Fresh rosemary',0.5,'bunch','Produce',1,'bunch',2.49),
   p('yellow-onion','Yellow onions',2,'each','Produce',3,'each',4.99),
   p('lemon','Lemons',2,'each','Produce',4,'each',4.49),
   p('gluten-free-stock','Gluten-free turkey or chicken stock',4,'cup','Pantry',32,'floz',4.99)
  ],
  instructions:[
   'Thaw the turkey completely in the refrigerator and keep it at 40°F or below.',
   'Pat dry. Season all over with kosher salt and pepper; refrigerate uncovered on a rack overnight.',
   'Before roasting, soften the butter with chopped herbs. Rub over and under the breast skin where accessible.',
   'Heat the oven to 325°F. Put onion and lemon in the cavity, set the turkey on a rack in a shallow roasting pan, and add stock to the pan.',
   'Roast until a food thermometer reads at least 165°F in the thickest breast and the innermost thigh and wing.',
   'Rest at least 20 minutes before carving. Use the pan juices for gravy if desired.',
   'Carve onto a warm platter and serve promptly.'
  ],
  prepTasks:[
   task('dry-brine','Dry-brine the turkey','day-before',20,{handsOn:true,fixedStartOffsetMinutes:-1800}),
   task('season','Butter + season the turkey','before-guests',20,{handsOn:true,dependsOn:['dry-brine']}),
   task('roast','Roast turkey at 325°F','cook',210,{dependsOn:['season'],finishOffsetMinutes:-45,batchable:true,dynamicDuration:'turkey-roast',resourceRequirements:[{type:'oven',temperatureF:325,slots:1}]}),
   task('rest','Rest turkey','hold',30,{dependsOn:['roast'],handsOn:false}),
   task('carve','Carve turkey','serve',15,{dependsOn:['rest'],handsOn:true,finishOffsetMinutes:-5})
  ],
  makeAhead:'Dry-brine 24–36 hours before dinner. Thawing must begin earlier based on bird weight.',
  storage:'Keep raw turkey refrigerated at 40°F or below. Refrigerate cooked leftovers within 2 hours in shallow containers.',
  reheat:'Reheat carved leftovers to 165°F. For party-day service, avoid long warm holding that dries the meat.',
  substitutions:['Use olive oil instead of butter for a dairy-free version.','Use verified gluten-free stock when serving gluten-free guests.'],
  equipment:[eq('roasting-pan','Large roasting pan'),eq('roasting-rack','Roasting rack'),eq('food-thermometer','Food thermometer'),eq('carving-board','Carving board'),eq('carving-knife','Carving knife')],
  servingRequirements:[eq('turkey-platter','Large turkey platter',1,'serving'),eq('carving-set','Carving fork + knife',1,'serving')],
  dietaryTags:['gluten-free','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],
  allergens:['milk'],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe; turkey safety timing informed by USDA/FSIS'},
  sourceUrl:'https://www.foodsafety.gov/food-safety-charts/meat-poultry-charts',
  preparedPurchase:{estimatedUnitCost:12},
  isTurkey:true,turkeyRules:{poundsPerPerson:1.25,thawHoursPerPound:6,maxBirdWeightLb:20,minBirdWeightLb:10,restMinutes:30,ovenTemperatureF:325}
 },
 stuffing:{
  id:'stuffing',title:'Sage + onion stuffing',mealRole:'starch',baseServings:12,
  servingStrategy:{basis:'headcount',factor:0.85},batchCapacityServings:12,parallelBatchCapacity:2,
  description:'Crisp-edged herb stuffing with onion, celery and stock.',
  ingredients:[
   p('country-bread','Country bread',1.5,'lb','Bakery',1,'lb',5.99),
   p('butter-unsalted','Unsalted butter',0.5,'lb','Dairy',1,'lb',5.99),
   p('yellow-onion','Yellow onions',2,'each','Produce',3,'each',4.99),
   p('celery','Celery',6,'each','Produce',8,'each',2.99),
   p('fresh-sage','Fresh sage',0.5,'bunch','Produce',1,'bunch',2.49),
   p('fresh-parsley','Flat-leaf parsley',0.5,'bunch','Produce',1,'bunch',1.99),
   p('eggs-large','Large eggs',2,'each','Dairy + Eggs',12,'each',4.99),
   p('chicken-stock','Chicken or vegetable stock',4,'cup','Pantry',32,'floz',4.49),
   p('kosher-salt','Kosher salt',2,'tsp','Pantry',96,'tbsp',6.49),
   p('black-pepper','Black pepper',1,'tsp','Pantry',12,'tbsp',5.49)
  ],
  instructions:[
   'Cube the bread and dry it uncovered overnight, or toast it gently until dry but not deeply browned.',
   'Cook onion and celery in butter until soft. Stir in sage and parsley.',
   'Whisk eggs with stock, salt and pepper.',
   'Combine bread, vegetables and stock mixture until evenly moistened without crushing the bread.',
   'Transfer to a buttered casserole. Cover and refrigerate if assembling ahead.',
   'Bake at 350°F until hot throughout and crisp on top; uncover for the final portion of baking.'
  ],
  prepTasks:[
   task('dry-bread','Dry the bread cubes','days-ahead',10,{handsOn:true,fixedStartOffsetMinutes:-2880}),
   task('assemble','Cook aromatics + assemble stuffing','day-before',30,{handsOn:true,dependsOn:['dry-bread'],fixedStartOffsetMinutes:-1500,resourceRequirements:[{type:'burner',slots:1}]}),
   task('bake','Bake stuffing at 350°F','cook',45,{dependsOn:['assemble'],finishOffsetMinutes:-10,resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]})
  ],
  makeAhead:'Dry bread up to 2 days ahead. Assemble the casserole the day before and refrigerate.',
  storage:'Refrigerate assembled stuffing promptly. Keep cooked stuffing refrigerated within 2 hours.',
  reheat:'Reheat covered at 350°F until hot; uncover briefly to re-crisp the top.',
  substitutions:['Use vegetable stock for a vegetarian version.','Use a tested gluten-free loaf for a gluten-free version.'],
  equipment:[eq('large-skillet','Large skillet'),eq('large-mixing-bowl','Large mixing bowl'),eq('casserole-9x13','9×13 casserole dish')],
  servingRequirements:[eq('stuffing-casserole','Casserole or serving dish',1,'serving'),eq('serving-spoon','Large serving spoon',1,'serving')],
  dietaryTags:['nut-free','sesame-free','fish-free','shellfish-free'],allergens:['milk','egg','wheat'],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:3.5}
 },
 potatoes:{
  id:'potatoes',title:'Silky mashed potatoes',mealRole:'starch',baseServings:12,
  servingStrategy:{basis:'headcount',factor:0.9},batchCapacityServings:24,parallelBatchCapacity:1,
  description:'Creamy mashed potatoes designed to hold and reheat well.',
  ingredients:[
   p('yukon-potatoes','Yukon Gold potatoes',6,'lb','Produce',5,'lb',6.99),
   p('butter-unsalted','Unsalted butter',0.75,'lb','Dairy',1,'lb',5.99),
   p('heavy-cream','Heavy cream',2,'cup','Dairy',16,'floz',5.49),
   p('whole-milk','Whole milk',2,'cup','Dairy',64,'floz',3.99),
   p('kosher-salt','Kosher salt',1,'tbsp','Pantry',96,'tbsp',6.49)
  ],
  instructions:[
   'Peel if desired and cut potatoes into even chunks.',
   'Cover with cold salted water, bring to a gentle boil and cook until completely tender.',
   'Drain thoroughly and return to the warm pot briefly to steam off excess water.',
   'Warm butter, cream and milk separately.',
   'Rice or mash the potatoes, then fold in the warm dairy gradually. Season with salt.',
   'Hold covered over gentle heat or refrigerate for reheating.'
  ],
  prepTasks:[
   task('cut','Peel + cut potatoes','morning',25,{handsOn:true,fixedStartOffsetMinutes:-360}),
   task('boil','Boil potatoes','cook',30,{dependsOn:['cut'],handsOn:false,resourceRequirements:[{type:'burner',slots:1}]}),
   task('mash','Mash + enrich potatoes','finish',20,{dependsOn:['boil'],handsOn:true}),
   task('hold','Hold mashed potatoes warm','hold',20,{dependsOn:['mash'],handsOn:false,finishOffsetMinutes:-10})
  ],
  makeAhead:'Can be made the day before; cool promptly and refrigerate.',
  storage:'Refrigerate within 2 hours in a shallow covered container.',
  reheat:'Reheat gently on the stovetop or covered in the oven, adding a splash of milk or cream as needed.',
  substitutions:['Use olive oil and unsweetened dairy-free milk for a dairy-free version.'],
  equipment:[eq('large-stockpot','Large stockpot'),eq('potato-ricer','Potato ricer or masher'),eq('small-saucepan','Small saucepan')],
  servingRequirements:[eq('potato-bowl','Large serving bowl',1,'serving'),eq('serving-spoon','Large serving spoon',1,'serving')],
  dietaryTags:['vegetarian','gluten-free','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:['milk'],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:3}
 },
 gravy:{
  id:'gravy',title:'Pan gravy',mealRole:'sauce-condiment',baseServings:12,
  servingStrategy:{basis:'headcount',factor:1},batchCapacityServings:24,parallelBatchCapacity:1,
  description:'Classic stock-and-dripping gravy finished just before dinner.',
  ingredients:[
   p('butter-unsalted','Unsalted butter',0.25,'lb','Dairy',1,'lb',5.99),
   p('all-purpose-flour','All-purpose flour',0.25,'lb','Pantry',5,'lb',5.49),
   p('chicken-stock','Chicken or turkey stock',4,'cup','Pantry',32,'floz',4.49),
   p('kosher-salt','Kosher salt',1,'tsp','Pantry',96,'tbsp',6.49),
   p('black-pepper','Black pepper',0.5,'tsp','Pantry',12,'tbsp',5.49)
  ],
  instructions:[
   'Melt butter in a saucepan and whisk in flour. Cook until the roux smells nutty but remains light brown.',
   'Whisk in warm stock gradually until smooth.',
   'Simmer until the gravy coats a spoon. Season lightly.',
   'If using turkey pan drippings, skim excess fat and whisk the drippings into the finished gravy.',
   'Hold warm and thin with stock if necessary before serving.'
  ],
  prepTasks:[
   task('base','Make gravy base','day-before',25,{handsOn:true,fixedStartOffsetMinutes:-1440,resourceRequirements:[{type:'burner',slots:1}]}),
   task('finish','Reheat + finish gravy','finish',20,{dependsOn:['base'],handsOn:true,finishOffsetMinutes:-5,resourceRequirements:[{type:'burner',slots:1}]})
  ],
  makeAhead:'Make the stock-based gravy one day ahead; finish with drippings on Thanksgiving if desired.',
  storage:'Cool quickly and refrigerate covered.',
  reheat:'Bring to a simmer on the stovetop, whisking until smooth.',
  substitutions:['Use gluten-free flour blend or cornstarch slurry for a gluten-free version.','Use olive oil for a dairy-free version.'],
  equipment:[eq('medium-saucepan','Medium saucepan'),eq('whisk','Whisk')],
  servingRequirements:[eq('gravy-boat','Gravy boat',1,'serving'),eq('small-ladle','Small ladle',1,'serving')],
  dietaryTags:['nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:['milk','wheat'],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:1.5}
 },
 greens:{
  id:'greens',title:'Garlicky green beans',mealRole:'vegetable',baseServings:12,
  servingStrategy:{basis:'headcount',factor:0.85},batchCapacityServings:18,parallelBatchCapacity:1,
  description:'Blanched green beans finished with garlic, lemon and olive oil.',
  ingredients:[
   p('green-beans','Green beans',4,'lb','Produce',2,'lb',6.99),
   p('garlic','Garlic',1,'head','Produce',3,'head',2.49),
   p('lemon','Lemons',2,'each','Produce',4,'each',4.49),
   p('olive-oil','Extra-virgin olive oil',0.5,'cup','Pantry',25.5,'floz',11.99),
   p('kosher-salt','Kosher salt',2,'tsp','Pantry',96,'tbsp',6.49)
  ],
  instructions:[
   'Trim the beans.',
   'Blanch in well-salted boiling water until bright green and just tender; shock in ice water and dry thoroughly.',
   'Slice the garlic thinly.',
   'Shortly before dinner, warm olive oil in a wide skillet and cook garlic gently until fragrant.',
   'Add beans and toss until hot. Finish with lemon zest, lemon juice and salt.'
  ],
  prepTasks:[
   task('trim','Trim green beans','day-before',20,{handsOn:true,fixedStartOffsetMinutes:-1500}),
   task('blanch','Blanch + chill green beans','morning',20,{dependsOn:['trim'],handsOn:true,fixedStartOffsetMinutes:-360,resourceRequirements:[{type:'burner',slots:1}]}),
   task('finish','Sauté beans with garlic + lemon','finish',15,{dependsOn:['blanch'],handsOn:true,finishOffsetMinutes:-10,resourceRequirements:[{type:'burner',slots:1}]})
  ],
  makeAhead:'Trim the day before. Blanch the morning of and refrigerate once dry.',
  storage:'Keep blanched beans refrigerated and dry until finishing.',
  reheat:'Finish in a hot skillet just before serving rather than reheating for a long period.',
  substitutions:['Use shallot instead of garlic.'],
  equipment:[eq('large-pot','Large pot'),eq('ice-bath-bowl','Large bowl for ice bath'),eq('wide-skillet','Wide skillet')],
  servingRequirements:[eq('green-bean-platter','Long serving platter',1,'serving'),eq('serving-tongs','Serving tongs',1,'serving')],
  dietaryTags:['vegan','vegetarian','gluten-free','dairy-free','nut-free','egg-free','soy-free','sesame-free','fish-free','shellfish-free'],allergens:[],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:3}
 },
 cranberry:{
  id:'cranberry',title:'Cranberry + orange',mealRole:'sauce-condiment',baseServings:12,
  servingStrategy:{basis:'headcount',factor:1},batchCapacityServings:36,parallelBatchCapacity:1,
  description:'Bright cranberry sauce with fresh orange.',
  ingredients:[
   p('cranberries','Fresh cranberries',1.5,'lb','Produce',12,'oz',3.49),
   p('granulated-sugar','Granulated sugar',1,'lb','Pantry',4,'lb',4.49),
   p('orange','Oranges',2,'each','Produce',4,'each',5.49)
  ],
  instructions:[
   'Zest and juice the oranges.',
   'Combine cranberries, sugar, orange juice and 1/2 cup water in a saucepan.',
   'Bring to a simmer and cook until most berries burst and the sauce thickens.',
   'Stir in the orange zest and cool completely.',
   'Chill until serving.'
  ],
  prepTasks:[
   task('cook','Cook cranberry sauce','days-ahead',25,{handsOn:true,fixedStartOffsetMinutes:-4320,resourceRequirements:[{type:'burner',slots:1}]}),
   task('serve','Transfer cranberry sauce to serving bowl','serve',5,{dependsOn:['cook'],handsOn:true,finishOffsetMinutes:-10})
  ],
  makeAhead:'Make up to 3 days ahead.',
  storage:'Refrigerate covered.',
  reheat:'Serve chilled or at cool room temperature; reheating is not required.',
  substitutions:['Replace part of the orange juice with apple cider for a softer citrus note.'],
  equipment:[eq('medium-saucepan','Medium saucepan')],
  servingRequirements:[eq('cranberry-bowl','Small serving bowl',1,'serving'),eq('small-serving-spoon','Small serving spoon',1,'serving')],
  dietaryTags:['vegan','vegetarian','gluten-free','dairy-free','nut-free','egg-free','soy-free','sesame-free','fish-free','shellfish-free'],allergens:[],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:1.25}
 },
 rolls:{
  id:'rolls',title:'Warm dinner rolls',mealRole:'bread',baseServings:12,
  servingStrategy:{basis:'headcount',factor:1},batchCapacityServings:24,parallelBatchCapacity:2,
  description:'Soft, butter-brushed yeast rolls served warm.',
  ingredients:[
   p('all-purpose-flour','All-purpose flour',1.5,'lb','Bakery',5,'lb',5.49),
   p('whole-milk','Whole milk',1.5,'cup','Dairy',64,'floz',3.99),
   p('butter-unsalted','Unsalted butter',0.5,'lb','Dairy',1,'lb',5.99),
   p('instant-yeast','Instant yeast',2.25,'tsp','Pantry',6.75,'tsp',2.49),
   p('granulated-sugar','Granulated sugar',0.25,'cup','Pantry',8,'cup',4.49),
   p('kosher-salt','Kosher salt',2,'tsp','Pantry',96,'tbsp',6.49)
  ],
  instructions:[
   'Warm the milk until just warm, not hot.',
   'Mix flour, yeast, sugar and salt. Add milk and half the softened butter; knead until smooth and elastic.',
   'Let rise until doubled.',
   'Divide into 18 small rolls, arrange in a buttered baking dish and let rise again until puffy.',
   'Bake at 350°F until deep golden.',
   'Brush with the remaining butter while warm.'
  ],
  prepTasks:[
   task('mix','Mix + knead roll dough','day-before',20,{handsOn:true,fixedStartOffsetMinutes:-1560}),
   task('first-rise','First rise','day-before',75,{dependsOn:['mix'],handsOn:false}),
   task('shape','Shape rolls','day-before',20,{dependsOn:['first-rise'],handsOn:true}),
   task('proof','Proof rolls','before-guests',60,{dependsOn:['shape'],handsOn:false,finishOffsetMinutes:-60}),
   task('bake','Bake rolls at 350°F','cook',18,{dependsOn:['proof'],finishOffsetMinutes:-35,resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]}),
   task('brush','Brush rolls with butter','finish',5,{dependsOn:['bake'],handsOn:true,finishOffsetMinutes:-25})
  ],
  makeAhead:'Shape the rolls the day before and refrigerate; let them finish proofing before baking.',
  storage:'Store baked rolls covered at room temperature for one day or freeze.',
  reheat:'Warm covered at 300°F for 8–10 minutes.',
  substitutions:['Use plant milk and vegan butter for a dairy-free version.'],
  equipment:[eq('stand-mixer','Stand mixer or large mixing bowl'),eq('baking-dish-rolls','Large baking dish')],
  servingRequirements:[eq('bread-basket','Bread basket',1,'serving'),eq('bread-tongs','Bread tongs',1,'serving')],
  dietaryTags:['vegetarian','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:['milk','wheat'],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:1.5}
 },
 pie:{
  id:'pie',title:'Pumpkin pie',mealRole:'dessert',baseServings:8,
  servingStrategy:{basis:'headcount'},batchCapacityServings:8,parallelBatchCapacity:2,
  description:'Classic pumpkin pie with a crisp crust and spiced custard.',
  ingredients:[
   p('pie-crust','9-inch pie crusts',1,'each','Frozen',2,'each',5.99),
   p('pumpkin-puree','Pumpkin purée',15,'oz','Pantry',15,'oz',2.49),
   p('evaporated-milk','Evaporated milk',12,'floz','Dairy',12,'floz',2.19),
   p('eggs-large','Large eggs',2,'each','Dairy + Eggs',12,'each',4.99),
   p('brown-sugar','Brown sugar',0.75,'cup','Pantry',4,'cup',3.99),
   p('pumpkin-spice','Pumpkin pie spice',2,'tsp','Pantry',28,'tsp',5.49),
   p('kosher-salt','Kosher salt',0.5,'tsp','Pantry',96,'tbsp',6.49),
   p('heavy-cream','Heavy cream',1,'cup','Dairy',16,'floz',5.49,{optional:true,includeByDefault:true})
  ],
  instructions:[
   'Heat the oven to 425°F and fit the crust into a 9-inch pie plate.',
   'Whisk pumpkin, eggs, brown sugar, spice and salt until smooth; whisk in evaporated milk.',
   'Pour into the crust.',
   'Bake 15 minutes at 425°F, then reduce to 350°F and continue until the edges are set and the center still has a slight wobble.',
   'Cool completely on a rack before refrigerating.',
   'Whip the cream softly just before dessert, if using.'
  ],
  prepTasks:[
   task('assemble','Mix filling + assemble pumpkin pie','day-before',20,{handsOn:true,fixedStartOffsetMinutes:-1560}),
   task('hot-bake','Start pie at 425°F','cook',15,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:425,slots:1}]}),
   task('bake','Finish pie at 350°F','cook',40,{dependsOn:['hot-bake'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]}),
   task('cool','Cool pie completely','hold',120,{dependsOn:['bake'],handsOn:false}),
   task('serve','Slice + serve pumpkin pie','serve',10,{dependsOn:['cool'],handsOn:true,fixedStartOffsetMinutes:60})
  ],
  makeAhead:'Bake one day ahead and cool completely before refrigerating.',
  storage:'Refrigerate cooled custard pie.',
  reheat:'Serve cool or at room temperature; do not keep at room temperature for extended periods.',
  substitutions:['Use a verified gluten-free crust for a gluten-free version.'],
  equipment:[eq('pie-plate','9-inch pie plate'),eq('mixing-bowl','Mixing bowl'),eq('wire-rack','Wire cooling rack')],
  servingRequirements:[eq('cake-stand','Cake stand or pie plate',1,'serving'),eq('pie-server','Pie server',1,'serving')],
  dietaryTags:['vegetarian','nut-free','sesame-free','fish-free','shellfish-free'],allergens:['milk','egg','wheat'],
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown original recipe'},preparedPurchase:{estimatedUnitCost:4.5}
 },
 'sparkling-water':{
  id:'sparkling-water',title:'Still + sparkling water',mealRole:'non-alcoholic-drink',baseServings:1,servingStrategy:{basis:'headcount'},
  ingredients:[p('still-water','Still water',20,'floz','Beverages',33.8,'floz',2.49),p('sparkling-water','Sparkling water',12,'floz','Beverages',33.8,'floz',2.99)],
  instructions:['Chill water thoroughly.','Stage still and sparkling bottles or carafes where guests can self-serve.','Replenish cold bottles in small batches so the station stays clean.'],
  prepTasks:[task('chill','Chill still + sparkling water','day-before',5,{handsOn:true,fixedStartOffsetMinutes:-1440}),task('stage','Stage water station','before-guests',10,{handsOn:true,fixedStartOffsetMinutes:-60})],
  makeAhead:'Chill the day before.',storage:'Keep chilled until service.',reheat:'Not applicable.',substitutions:['Use filtered tap water in carafes for still water.'],
  equipment:[],servingRequirements:[eq('water-carafes','Water carafes or chilled bottles',2,'serving'),eq('water-glasses','Water glasses',1,'serving',{perPerson:true})],
  dietaryTags:['vegan','vegetarian','gluten-free','dairy-free','nut-free','egg-free','soy-free','sesame-free','fish-free','shellfish-free'],allergens:[],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'original',label:'Crow & Crown original beverage plan'}
 },
 wine:{
  id:'wine',title:'Wine for dinner',mealRole:'alcohol',baseServings:1,servingStrategy:{basis:'adult-drinkers'},
  ingredients:[p('wine-bottles','Wine bottles',0.4,'each','Beverages',1,'each',18)],
  instructions:['Choose a mix that fits the menu and your guests.','Chill white or sparkling wine in advance.','Open bottles gradually and keep water available alongside alcohol.'],
  prepTasks:[task('chill','Chill white + sparkling wine','day-before',5,{handsOn:true,fixedStartOffsetMinutes:-1440}),task('stage','Stage wine glasses + opener','before-guests',10,{handsOn:true,fixedStartOffsetMinutes:-60})],
  makeAhead:'Buy ahead and chill whites the day before.',storage:'Store unopened bottles according to label; refrigerate opened white wine.',reheat:'Not applicable.',substitutions:['Replace with additional non-alcoholic sparkling beverages.'],
  equipment:[eq('wine-opener','Wine opener')],servingRequirements:[eq('wine-glasses','Wine glasses',1,'serving',{perPerson:true})],
  dietaryTags:['vegetarian','gluten-free','dairy-free','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:[],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'original',label:'Crow & Crown original beverage plan'}
 },
 'signature-cocktail':{
  id:'signature-cocktail',title:'Signature cocktail',mealRole:'alcohol',baseServings:1,servingStrategy:{basis:'adult-drinkers'},
  ingredients:[p('cocktail-spirit','Cocktail spirit',3,'floz','Beverages',25.36,'floz',29.99),p('cocktail-mixer','Cocktail mixer',6,'floz','Beverages',33.8,'floz',4.99),p('cocktail-ice','Cocktail ice',0.75,'lb','Beverages',5,'lb',4.99)],
  instructions:['Batch non-carbonated spirit and mixer components ahead.','Chill the batch thoroughly.','Add ice and any sparkling component only when serving.'],
  prepTasks:[task('batch','Batch signature cocktail base','morning',20,{handsOn:true,fixedStartOffsetMinutes:-360}),task('ice','Stage cocktail ice + glassware','before-guests',10,{handsOn:true,fixedStartOffsetMinutes:-45})],
  makeAhead:'Batch the non-carbonated base the morning of.',storage:'Keep batched cocktail refrigerated until service.',reheat:'Not applicable.',substitutions:['Make a zero-proof version with the same garnish and glassware.'],
  equipment:[eq('cocktail-pitcher','Pitcher or drink dispenser'),eq('jigger','Jigger')],servingRequirements:[eq('cocktail-glasses','Cocktail glasses',1,'serving',{perPerson:true})],
  dietaryTags:['vegetarian','gluten-free','dairy-free','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:[],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'original',label:'Crow & Crown original beverage plan'}
 },
 'kids-cider':{
  id:'kids-cider',title:'Kids’ cider + juice',mealRole:'non-alcoholic-drink',baseServings:1,servingStrategy:{basis:'children'},
  ingredients:[p('apple-cider','Apple cider or juice',16,'floz','Beverages',64,'floz',4.99)],
  instructions:['Chill cider or juice.','Pour into a small kid-safe pitcher or individual cups.','Keep the kids’ drink station separate from alcoholic drinks.'],
  prepTasks:[task('chill','Chill kids’ cider + juice','day-before',5,{handsOn:true,fixedStartOffsetMinutes:-1440}),task('stage','Stage kid-safe cups + pitcher','before-guests',10,{handsOn:true,fixedStartOffsetMinutes:-45})],
  makeAhead:'Chill the day before.',storage:'Keep refrigerated until service.',reheat:'Not applicable.',substitutions:['Use diluted juice or water based on family preference.'],
  equipment:[],servingRequirements:[eq('kid-pitcher','Kid-safe pitcher',1,'serving'),eq('kid-cups','Kid-safe cups',1,'serving',{perPerson:true})],
  dietaryTags:['vegan','vegetarian','gluten-free','dairy-free','nut-free','egg-free','soy-free','sesame-free','fish-free','shellfish-free'],allergens:[],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'original',label:'Crow & Crown original beverage plan'}
 },
 'coffee-tea':{
  id:'coffee-tea',title:'Coffee + tea after dinner',mealRole:'coffee',baseServings:1,servingStrategy:{basis:'adults',factor:0.75},
  ingredients:[p('coffee-beans','Coffee',0.06,'lb','Beverages',12,'oz',12.99),p('tea-bags','Tea bags',0.5,'each','Beverages',20,'each',5.99),p('coffee-cream','Coffee cream',2,'floz','Dairy',16,'floz',4.99)],
  instructions:['Set mugs, tea, sugar and cream before dinner.','Brew coffee as dessert is cleared or plated.','Refresh hot water for tea and serve cream cold.'],
  prepTasks:[task('stage','Stage coffee + tea service','morning',15,{handsOn:true,fixedStartOffsetMinutes:-360}),task('brew','Brew coffee + heat tea water','serve',15,{handsOn:true,fixedStartOffsetMinutes:45,resourceRequirements:[{type:'burner',slots:1}]})],
  makeAhead:'Stage cups and shelf-stable items in the morning.',storage:'Keep dairy cream refrigerated until service.',reheat:'Brew fresh rather than reheating coffee.',substitutions:['Offer decaf and dairy-free creamer if needed.'],
  equipment:[eq('coffee-maker','Coffee maker'),eq('tea-kettle','Tea kettle')],servingRequirements:[eq('coffee-mugs','Coffee cups or mugs',1,'serving',{perPerson:true}),eq('teaspoons','Teaspoons',1,'serving',{perPerson:true})],
  dietaryTags:['vegetarian','gluten-free','nut-free','egg-free','sesame-free','fish-free','shellfish-free'],allergens:['milk'],metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,provenance:{type:'original',label:'Crow & Crown original beverage plan'}
 }
};

export const SUPPORTED_SIGNATURE_IDS=Object.freeze(Object.keys(SIGNATURE_RECIPE_OVERRIDES));
