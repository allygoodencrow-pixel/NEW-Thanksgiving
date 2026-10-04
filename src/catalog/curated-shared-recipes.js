// Curated operational recipes added from the owner's Thanksgiving recipe collection.
// These are Crow & Crown planning recipes: structured for scaling, shopping, prep and timeline.
// Publisher links from the collection remain reference links; instructions below are concise planning methods.
const reviewedAt='2026-10-04';
const priceUpdatedAt='2026-10-04';
const p=(ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,extra={})=>({
  ingredientId,name,quantity,unit,category,packageQuantity,packageUnit,estimatedPackagePrice,
  priceSource:'Crow & Crown planning estimate',priceUpdatedAt,...extra
});
const eq=(id,name,quantity=1,kind='equipment',extra={})=>({id,name,quantity,kind,...extra});
const task=(id,title,phase,durationMinutes,extra={})=>({id,title,phase,durationMinutes,...extra});
const complete=(extra={})=>({
  metadataReviewed:true,allergenReviewed:true,reviewedAt,recipeComplete:true,
  provenance:{type:'original',label:'Crow & Crown operational recipe from the curated Thanksgiving menu collection'},
  ...extra
});

export const CURATED_SHARED_RECIPES={
 'cc-feta-olives':{
  id:'cc-feta-olives',title:'Warm feta + citrus olives',mealRole:'appetizer',baseServings:8,
  servingStrategy:{basis:'headcount',factor:0.6},batchCapacityServings:16,parallelBatchCapacity:2,
  description:'Warm feta and mixed olives with citrus, herbs and olive oil.',
  ingredients:[
   p('feta','Feta',12,'oz','Dairy',8,'oz',5.49),p('mixed-olives','Mixed olives',2,'cup','Pantry',10,'oz',5.99),
   p('olive-oil','Extra-virgin olive oil',3,'tbsp','Pantry',25.5,'floz',11.99),p('orange','Orange',1,'each','Produce',4,'each',5.49),
   p('fresh-thyme','Fresh thyme',0.25,'bunch','Produce',1,'bunch',2.49),p('crackers','Seeded crackers',8,'oz','Bakery',8,'oz',5.99)
  ],
  instructions:['Heat the oven to 375°F.','Arrange feta and drained olives in a small baking dish with olive oil, thyme and strips of orange zest.','Bake until the feta is hot and softened, about 15–20 minutes.','Finish with a squeeze of orange juice and serve warm with crackers.'],
  prepTasks:[task('assemble','Assemble feta + olives','before-guests',10),task('bake','Warm feta + olives','finish',18,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:375,slots:1}],finishOffsetMinutes:-25})],
  makeAhead:'Assemble the dish earlier in the day and refrigerate.',storage:'Keep feta refrigerated until baking; refrigerate leftovers promptly.',reheat:'Warm gently at 325°F until hot.',
  equipment:[eq('small-baker','Small baking dish')],servingRequirements:[eq('appetizer-board','Small board or tray',1,'serving'),eq('small-spreader','Small spreader',1,'serving')],
  dietaryTags:['vegetarian','gluten-free-option'],allergens:['milk','wheat'],referenceUrl:'https://www.bonappetit.com/gallery/best-thanksgiving-appetizers',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-sweet-potato-hummus':{
  id:'cc-sweet-potato-hummus',title:'Sweet potato hummus',mealRole:'appetizer',baseServings:8,
  servingStrategy:{basis:'headcount',factor:0.6},batchCapacityServings:16,parallelBatchCapacity:2,
  description:'Smooth sweet potato and chickpea dip with tahini, lemon and cumin.',
  ingredients:[
   p('sweet-potatoes','Sweet potatoes',1.5,'lb','Produce',3,'lb',4.99),p('chickpeas','Chickpeas',15,'oz','Pantry',15,'oz',1.49),
   p('tahini','Tahini',0.33,'cup','Pantry',16,'oz',7.99),p('lemon','Lemon',1,'each','Produce',4,'each',4.49),
   p('garlic','Garlic',2,'clove','Produce',3,'head',2.49),p('olive-oil','Extra-virgin olive oil',2,'tbsp','Pantry',25.5,'floz',11.99),
   p('cumin','Ground cumin',0.5,'tsp','Pantry',2,'oz',3.99),p('crackers','Seeded crackers',8,'oz','Bakery',8,'oz',5.99)
  ],
  instructions:['Cook peeled sweet potato pieces until very tender; drain and cool slightly.','Blend sweet potato, chickpeas, tahini, lemon juice, garlic, olive oil and cumin until smooth.','Thin with cold water a little at a time until creamy.','Season to taste and serve in a shallow bowl with crackers.'],
  prepTasks:[task('cook','Cook sweet potatoes','day-before',20,{resourceRequirements:[{type:'burner',slots:1}]}),task('blend','Blend sweet potato hummus','day-before',15,{dependsOn:['cook']}),task('serve','Plate hummus + crackers','before-guests',10,{dependsOn:['blend'],finishOffsetMinutes:-30})],
  makeAhead:'Make up to 1 day ahead.',storage:'Refrigerate covered.',reheat:'Serve cool or at cool room temperature.',
  equipment:[eq('medium-pot','Medium pot'),eq('food-processor','Food processor')],servingRequirements:[eq('dip-bowl','Shallow dip bowl',1,'serving'),eq('small-spoon','Small serving spoon',1,'serving')],
  dietaryTags:['vegan','vegetarian','dairy-free','egg-free'],allergens:['sesame','wheat'],referenceUrl:'https://www.bonappetit.com/gallery/best-thanksgiving-appetizers',preparedPurchase:{estimatedUnitCost:3.5},...complete()
 },
 'cc-turkey-breast-stuffing':{
  id:'cc-turkey-breast-stuffing',title:'Herb-roasted turkey breast + stuffing',mealRole:'main',baseServings:6,
  servingStrategy:{basis:'headcount'},batchCapacityServings:8,parallelBatchCapacity:2,
  description:'A smaller-table turkey centerpiece roasted over a simple herb stuffing.',
  ingredients:[
   p('turkey-breast','Bone-in turkey breast',6,'lb','Meat',6,'lb',28.99),p('butter-unsalted','Unsalted butter',6,'oz','Dairy',1,'lb',5.99),
   p('country-bread','Country bread',1,'lb','Bakery',1,'lb',5.99),p('yellow-onion','Yellow onion',1,'each','Produce',3,'each',4.99),
   p('celery','Celery stalks',4,'each','Produce',8,'each',2.99),p('chicken-stock','Chicken or turkey stock',2,'cup','Pantry',32,'floz',4.49),
   p('fresh-sage','Fresh sage',0.25,'bunch','Produce',1,'bunch',2.49),p('fresh-thyme','Fresh thyme',0.25,'bunch','Produce',1,'bunch',2.49),
   p('kosher-salt','Kosher salt',2,'tbsp','Pantry',96,'tbsp',6.49),p('black-pepper','Black pepper',1,'tsp','Pantry',12,'tbsp',5.49)
  ],
  instructions:['Salt the turkey breast and refrigerate uncovered overnight.','Dry or toast the bread. Cook onion and celery in part of the butter; combine with bread, herbs and enough stock to moisten.','Heat the oven to 350°F. Put stuffing in a roasting dish and set the seasoned turkey breast above or beside it so juices do not leave any stuffing undercooked.','Roast until the turkey breast reaches at least 165°F in the thickest part and the stuffing is hot throughout.','Rest the turkey 20 minutes before slicing; serve stuffing separately.'],
  prepTasks:[task('brine','Season turkey breast','day-before',10,{fixedStartOffsetMinutes:-1440}),task('stuffing','Assemble stuffing','day-before',25,{resourceRequirements:[{type:'burner',slots:1}]}),task('roast','Roast turkey breast + stuffing','cook',95,{dependsOn:['brine','stuffing'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}],finishOffsetMinutes:-35}),task('rest','Rest turkey breast','hold',20,{dependsOn:['roast'],handsOn:false}),task('slice','Slice turkey breast','serve',10,{dependsOn:['rest'],finishOffsetMinutes:-5})],
  makeAhead:'Season turkey and assemble stuffing the day before.',storage:'Keep turkey at 40°F or below. Refrigerate leftovers within 2 hours.',reheat:'Reheat leftovers to 165°F.',
  equipment:[eq('roasting-dish','Roasting dish'),eq('food-thermometer','Food thermometer'),eq('large-skillet','Large skillet')],servingRequirements:[eq('turkey-platter','Long turkey platter',1,'serving'),eq('stuffing-bowl','Stuffing serving bowl',1,'serving')],
  dietaryTags:['nut-free'],allergens:['milk','wheat'],referenceUrl:'https://www.seriouseats.com/thanksgiving-meal-for-two-8748303',preparedPurchase:{estimatedUnitCost:10},...complete()
 },
 'cc-mushroom-pot-pie':{
  id:'cc-mushroom-pot-pie',title:'Mushroom pot pie',mealRole:'main',baseServings:8,
  servingStrategy:{basis:'headcount'},batchCapacityServings:8,parallelBatchCapacity:2,
  description:'Deep mushroom and herb filling under a crisp pastry lid.',
  ingredients:[
   p('mushrooms','Mixed mushrooms',2.5,'lb','Produce',1,'lb',7.99),p('yellow-onion','Yellow onion',1,'each','Produce',3,'each',4.99),
   p('carrots','Carrots',0.75,'lb','Produce',2,'lb',3.49),p('celery','Celery stalks',4,'each','Produce',8,'each',2.99),
   p('butter-unsalted','Unsalted butter',5,'tbsp','Dairy',1,'lb',5.99),p('all-purpose-flour','All-purpose flour',0.33,'cup','Bakery',5,'lb',5.49),
   p('vegetable-stock','Vegetable stock',3,'cup','Pantry',32,'floz',4.49),p('heavy-cream','Heavy cream',1,'cup','Dairy',16,'floz',5.49),
   p('fresh-thyme','Fresh thyme',0.25,'bunch','Produce',1,'bunch',2.49),p('puff-pastry','Puff pastry',1,'sheet','Frozen',2,'sheet',6.99)
  ],
  instructions:['Brown sliced mushrooms in batches so they color instead of steaming.','Cook onion, carrot and celery in butter; stir in flour, then gradually add stock and cream.','Return mushrooms with thyme and simmer until the filling coats a spoon. Cool slightly.','Transfer to a baking dish, top with chilled pastry and cut vents.','Bake at 400°F until deeply golden and bubbling; rest 15 minutes before serving.'],
  prepTasks:[task('filling','Cook mushroom filling','day-before',35,{resourceRequirements:[{type:'burner',slots:1}]}),task('assemble','Assemble pot pie','day-before',15,{dependsOn:['filling']}),task('bake','Bake mushroom pot pie','cook',40,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:400,slots:1}],finishOffsetMinutes:-25}),task('rest','Rest pot pie','hold',15,{dependsOn:['bake'],handsOn:false})],
  makeAhead:'Make filling and assemble up to 1 day ahead.',storage:'Refrigerate assembled pie and cooked leftovers.',reheat:'Reheat uncovered at 350°F until hot.',
  equipment:[eq('large-skillet','Large skillet'),eq('deep-baker','Deep baking dish')],servingRequirements:[eq('pie-server','Wide serving spoon',1,'serving')],
  dietaryTags:['vegetarian','nut-free'],allergens:['milk','wheat'],referenceUrl:'https://www.seriouseats.com/november-recipe-recommendations-8738042',preparedPurchase:{estimatedUnitCost:6},...complete()
 },
 'cc-sausage-dressing':{
  id:'cc-sausage-dressing',title:'Sage + sausage dressing',mealRole:'starch',baseServings:10,
  servingStrategy:{basis:'headcount',factor:0.85},batchCapacityServings:12,parallelBatchCapacity:2,
  description:'Savory bread dressing with browned sausage, sage, onion and crisp edges.',
  ingredients:[
   p('country-bread','Country bread',1.5,'lb','Bakery',1,'lb',5.99),p('sausage','Italian sausage',1,'lb','Meat',1,'lb',6.99),
   p('yellow-onion','Yellow onion',2,'each','Produce',3,'each',4.99),p('celery','Celery stalks',5,'each','Produce',8,'each',2.99),
   p('butter-unsalted','Unsalted butter',6,'tbsp','Dairy',1,'lb',5.99),p('fresh-sage','Fresh sage',0.5,'bunch','Produce',1,'bunch',2.49),
   p('chicken-stock','Chicken stock',3,'cup','Pantry',32,'floz',4.49),p('eggs-large','Large eggs',2,'each','Dairy + Eggs',12,'each',4.99)
  ],
  instructions:['Dry the bread cubes overnight or in a low oven.','Brown the sausage and transfer it to a bowl. Cook onion and celery in butter until soft; add sage.','Combine bread, sausage and vegetables. Mix eggs with stock and fold in until evenly moist.','Transfer to a buttered casserole and bake at 350°F until hot with a crisp golden top.'],
  prepTasks:[task('bread','Dry bread cubes','days-ahead',10,{fixedStartOffsetMinutes:-2880}),task('assemble','Cook sausage + assemble dressing','day-before',30,{dependsOn:['bread'],resourceRequirements:[{type:'burner',slots:1}]}),task('bake','Bake sage + sausage dressing','cook',45,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}],finishOffsetMinutes:-10})],
  makeAhead:'Assemble the day before.',storage:'Refrigerate assembled dressing and cooked leftovers.',reheat:'Reheat covered at 350°F, then uncover to re-crisp.',
  equipment:[eq('large-skillet','Large skillet'),eq('casserole-9x13','9×13 casserole')],servingRequirements:[eq('serving-spoon','Serving spoon',1,'serving')],
  dietaryTags:['nut-free'],allergens:['milk','egg','wheat'],referenceUrl:'https://www.seriouseats.com/classic-sage-and-sausage-stuffing-or-dressing-recipe',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-green-bean-casserole':{
  id:'cc-green-bean-casserole',title:'Homemade green bean casserole',mealRole:'vegetable',baseServings:10,
  servingStrategy:{basis:'headcount',factor:0.8},batchCapacityServings:12,parallelBatchCapacity:2,
  description:'Fresh green beans in mushroom cream sauce with crisp shallots.',
  ingredients:[
   p('green-beans','Green beans',2,'lb','Produce',2,'lb',6.99),p('mushrooms','Mushrooms',1,'lb','Produce',1,'lb',7.99),
   p('shallots','Shallots',4,'each','Produce',4,'each',4.99),p('butter-unsalted','Unsalted butter',4,'tbsp','Dairy',1,'lb',5.99),
   p('all-purpose-flour','All-purpose flour',0.25,'cup','Bakery',5,'lb',5.49),p('whole-milk','Whole milk',2,'cup','Dairy',64,'floz',3.99),
   p('vegetable-oil','Vegetable oil',1,'cup','Pantry',48,'floz',6.99)
  ],
  instructions:['Blanch green beans until crisp-tender, chill and drain thoroughly.','Fry thinly sliced shallots until crisp; drain.','Brown mushrooms in butter, stir in flour, then whisk in milk and simmer until thick.','Fold beans into the mushroom sauce and transfer to a casserole.','Bake at 375°F until bubbling; add crisp shallots for the final few minutes.'],
  prepTasks:[task('beans','Blanch green beans','day-before',15,{resourceRequirements:[{type:'burner',slots:1}]}),task('shallots','Fry shallots','day-before',15,{resourceRequirements:[{type:'burner',slots:1}]}),task('sauce','Make mushroom sauce + assemble','day-before',25,{dependsOn:['beans'],resourceRequirements:[{type:'burner',slots:1}]}),task('bake','Bake green bean casserole','cook',30,{dependsOn:['sauce','shallots'],resourceRequirements:[{type:'oven',temperatureF:375,slots:1}],finishOffsetMinutes:-15})],
  makeAhead:'Prepare beans, shallots and casserole base the day before.',storage:'Refrigerate casserole covered; keep fried shallots dry.',reheat:'Bake until hot; add shallots near the end.',
  equipment:[eq('medium-pot','Medium pot'),eq('large-skillet','Large skillet'),eq('casserole','Shallow casserole')],servingRequirements:[eq('serving-spoon','Serving spoon',1,'serving')],
  dietaryTags:['vegetarian','nut-free'],allergens:['milk','wheat'],referenceUrl:'https://www.seriouseats.com/homemade-green-bean-casserole-recipe',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-tarragon-green-beans':{
  id:'cc-tarragon-green-beans',title:'Tarragon green beans',mealRole:'vegetable',baseServings:8,
  servingStrategy:{basis:'headcount',factor:0.75},batchCapacityServings:16,parallelBatchCapacity:1,
  description:'Bright stovetop green beans with lemon, butter and fresh tarragon.',
  ingredients:[
   p('green-beans','Green beans',2,'lb','Produce',2,'lb',6.99),p('butter-unsalted','Unsalted butter',4,'tbsp','Dairy',1,'lb',5.99),
   p('lemon','Lemon',1,'each','Produce',4,'each',4.49),p('fresh-tarragon','Fresh tarragon',0.25,'bunch','Produce',1,'bunch',2.99),
   p('kosher-salt','Kosher salt',1,'tsp','Pantry',96,'tbsp',6.49)
  ],
  instructions:['Trim the beans and blanch in salted water until crisp-tender.','Drain well and return to a wide skillet with butter.','Toss over medium heat until glossy and hot.','Finish with lemon zest, lemon juice and chopped tarragon just before serving.'],
  prepTasks:[task('blanch','Blanch green beans','day-before',12,{resourceRequirements:[{type:'burner',slots:1}]}),task('finish','Finish tarragon green beans','finish',8,{dependsOn:['blanch'],resourceRequirements:[{type:'burner',slots:1}],finishOffsetMinutes:-8})],
  makeAhead:'Blanch beans the day before.',storage:'Refrigerate blanched beans dry.',reheat:'Finish in a skillet immediately before dinner.',
  equipment:[eq('large-pot','Large pot'),eq('large-skillet','Large skillet')],servingRequirements:[eq('green-bean-platter','Long platter',1,'serving'),eq('serving-tongs','Serving tongs',1,'serving')],
  dietaryTags:['vegetarian','gluten-free','nut-free','egg-free'],allergens:['milk'],referenceUrl:'https://www.marthastewart.com/1532456/classic-thanksgiving-dinner-menu',preparedPurchase:{estimatedUnitCost:3},...complete()
 },
 'cc-potato-gratin':{
  id:'cc-potato-gratin',title:'Rich potato gratin',mealRole:'starch',baseServings:10,
  servingStrategy:{basis:'headcount',factor:0.85},batchCapacityServings:12,parallelBatchCapacity:2,
  description:'Thinly sliced potatoes baked in cream with garlic and a browned top.',
  ingredients:[
   p('yukon-potatoes','Yukon Gold potatoes',4,'lb','Produce',5,'lb',6.99),p('heavy-cream','Heavy cream',3,'cup','Dairy',16,'floz',5.49),
   p('whole-milk','Whole milk',1,'cup','Dairy',64,'floz',3.99),p('garlic','Garlic',3,'clove','Produce',3,'head',2.49),
   p('gruyere','Gruyère',8,'oz','Dairy',8,'oz',9.99),p('butter-unsalted','Unsalted butter',2,'tbsp','Dairy',1,'lb',5.99)
  ],
  instructions:['Heat oven to 350°F and butter a shallow baking dish.','Slice potatoes very thinly and layer them evenly.','Warm cream, milk and garlic; season, then pour over potatoes.','Cover and bake until nearly tender. Uncover, add cheese and continue baking until browned and fully tender.','Rest 15 minutes before cutting.'],
  prepTasks:[task('slice','Slice potatoes + assemble gratin','day-before',25),task('covered','Bake gratin covered','cook',55,{dependsOn:['slice'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}]}),task('brown','Brown gratin uncovered','finish',25,{dependsOn:['covered'],resourceRequirements:[{type:'oven',temperatureF:350,slots:1}],finishOffsetMinutes:-20}),task('rest','Rest gratin','hold',15,{dependsOn:['brown'],handsOn:false})],
  makeAhead:'Assemble earlier the same day or bake most of the way ahead.',storage:'Refrigerate cooled gratin covered.',reheat:'Reheat covered at 350°F, then uncover to refresh the top.',
  equipment:[eq('gratin-dish','Shallow gratin dish'),eq('mandoline','Mandoline or sharp knife')],servingRequirements:[eq('gratin-server','Flat serving spoon',1,'serving')],
  dietaryTags:['vegetarian','gluten-free','nut-free','egg-free'],allergens:['milk'],referenceUrl:'https://www.seriouseats.com/make-ahead-thanksgiving-sides-11847103',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-brown-butter-sweet-potatoes':{
  id:'cc-brown-butter-sweet-potatoes',title:'Brown-butter mashed sweet potatoes',mealRole:'starch',baseServings:8,
  servingStrategy:{basis:'headcount',factor:0.75},batchCapacityServings:16,parallelBatchCapacity:1,
  description:'Savory mashed sweet potatoes with brown butter, thyme and restrained sweetness.',
  ingredients:[
   p('sweet-potatoes','Sweet potatoes',4,'lb','Produce',3,'lb',4.99),p('butter-unsalted','Unsalted butter',8,'tbsp','Dairy',1,'lb',5.99),
   p('heavy-cream','Heavy cream',1,'cup','Dairy',16,'floz',5.49),p('fresh-thyme','Fresh thyme',0.25,'bunch','Produce',1,'bunch',2.49),
   p('pecans','Pecans',0.5,'cup','Pantry',8,'oz',7.99),p('kosher-salt','Kosher salt',1,'tsp','Pantry',96,'tbsp',6.49)
  ],
  instructions:['Cook peeled sweet potato pieces until very tender and drain well.','Brown the butter in a small saucepan until nutty and amber.','Mash sweet potatoes with warm cream, most of the brown butter and salt.','Spoon into a shallow serving bowl and finish with thyme, remaining brown butter and toasted pecans.'],
  prepTasks:[task('cook','Cook sweet potatoes','day-before',25,{resourceRequirements:[{type:'burner',slots:1}]}),task('brown-butter','Brown butter','day-before',8,{resourceRequirements:[{type:'burner',slots:1}]}),task('mash','Mash sweet potatoes','day-before',15,{dependsOn:['cook','brown-butter']}),task('reheat','Reheat + finish sweet potatoes','finish',15,{dependsOn:['mash'],resourceRequirements:[{type:'burner',slots:1}],finishOffsetMinutes:-20})],
  makeAhead:'Make up to 1 day ahead.',storage:'Refrigerate covered.',reheat:'Reheat gently with a splash of cream.',
  equipment:[eq('large-pot','Large pot'),eq('small-saucepan','Small saucepan'),eq('potato-masher','Potato masher')],servingRequirements:[eq('sweet-potato-bowl','Shallow serving bowl',1,'serving')],
  dietaryTags:['vegetarian','gluten-free','egg-free'],allergens:['milk','tree-nut'],referenceUrl:'https://www.seriouseats.com/make-ahead-thanksgiving-sides-11847103',preparedPurchase:{estimatedUnitCost:3.5},...complete()
 },
 'cc-brussels-salad':{
  id:'cc-brussels-salad',title:'Shaved Brussels salad + hazelnuts',mealRole:'fresh',baseServings:8,
  servingStrategy:{basis:'headcount',factor:0.7},batchCapacityServings:16,parallelBatchCapacity:1,
  description:'Crisp shaved Brussels sprouts with pear, goat cheese and toasted hazelnuts.',
  ingredients:[
   p('brussels-sprouts','Brussels sprouts',1.5,'lb','Produce',2,'lb',7.99),p('pears','Pears',2,'each','Produce',4,'each',5.49),
   p('goat-cheese','Goat cheese',5,'oz','Dairy',5,'oz',5.99),p('hazelnuts','Hazelnuts',0.5,'cup','Pantry',8,'oz',7.99),
   p('lemon','Lemon',1,'each','Produce',4,'each',4.49),p('olive-oil','Extra-virgin olive oil',0.25,'cup','Pantry',25.5,'floz',11.99),
   p('dijon','Dijon mustard',1,'tbsp','Pantry',12,'oz',4.49)
  ],
  instructions:['Shave the Brussels sprouts very thinly and refrigerate until needed.','Whisk lemon juice, olive oil, Dijon, salt and pepper into a sharp dressing.','Slice pears just before service.','Toss sprouts lightly with dressing, then scatter pear, crumbled goat cheese and toasted hazelnuts over the top.'],
  prepTasks:[task('shave','Shave Brussels sprouts','day-before',20),task('dressing','Make lemon-Dijon dressing','day-before',8),task('finish','Toss Brussels salad','finish',10,{dependsOn:['shave','dressing'],finishOffsetMinutes:-5})],
  makeAhead:'Shave sprouts and make dressing the day before.',storage:'Keep sprouts dry and chilled; store dressing separately.',reheat:'Serve cold; do not reheat.',
  equipment:[eq('mandoline','Mandoline or sharp knife'),eq('mixing-bowl','Large mixing bowl')],servingRequirements:[eq('salad-bowl','Wide low bowl',1,'serving'),eq('salad-tongs','Salad tongs',1,'serving')],
  dietaryTags:['vegetarian','gluten-free','egg-free'],allergens:['milk','tree-nut'],referenceUrl:'https://www.seriouseats.com/thanksgiving-meal-for-two-8748303',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-apple-galette':{
  id:'cc-apple-galette',title:'Salted-butter apple galette',mealRole:'dessert',baseServings:8,
  servingStrategy:{basis:'headcount'},batchCapacityServings:8,parallelBatchCapacity:2,
  description:'Rustic apple galette with visible fruit, crisp pastry and lightly salted butter.',
  ingredients:[
   p('pie-dough','Pie dough',1,'each','Frozen',2,'each',5.99),p('apples','Apples',2.5,'lb','Produce',3,'lb',5.99),
   p('granulated-sugar','Sugar',0.33,'cup','Pantry',4,'lb',4.49),p('cornstarch','Cornstarch',1,'tbsp','Pantry',16,'oz',3.99),
   p('lemon','Lemon',1,'each','Produce',4,'each',4.49),p('butter-unsalted','Unsalted butter',3,'tbsp','Dairy',1,'lb',5.99),
   p('flaky-salt','Flaky salt',0.25,'tsp','Pantry',4,'oz',5.99)
  ],
  instructions:['Heat oven to 400°F and roll chilled dough into a rough 12-inch circle on parchment.','Thinly slice apples and toss with sugar, cornstarch and lemon juice.','Arrange apples over the dough, leaving a wide border; fold the border over the fruit and dot with butter.','Bake until the pastry is deeply golden and the fruit is tender.','Finish with a small pinch of flaky salt and cool at least 20 minutes before slicing.'],
  prepTasks:[task('assemble','Assemble apple galette','day-before',25),task('bake','Bake apple galette','cook',40,{dependsOn:['assemble'],resourceRequirements:[{type:'oven',temperatureF:400,slots:1}]}),task('cool','Cool galette','hold',20,{dependsOn:['bake'],handsOn:false})],
  makeAhead:'Bake the day before if desired.',storage:'Cover loosely at cool room temperature for same-day service or refrigerate longer.',reheat:'Warm briefly at 325°F if desired.',
  equipment:[eq('rimmed-sheet','Rimmed baking sheet'),eq('parchment','Parchment paper')],servingRequirements:[eq('dessert-board','Dessert board or platter',1,'serving'),eq('pie-server','Pie server',1,'serving')],
  dietaryTags:['vegetarian','nut-free'],allergens:['milk','wheat'],referenceUrl:'https://www.bonappetit.com/recipes/holidays-recipes/article/apple-galette-thanksgiving',preparedPurchase:{estimatedUnitCost:4},...complete()
 },
 'cc-apple-pear-spritz':{
  id:'cc-apple-pear-spritz',title:'Apple + pear cider spritz',mealRole:'non-alcoholic-drink',baseServings:6,
  servingStrategy:{basis:'headcount'},batchCapacityServings:24,parallelBatchCapacity:1,
  description:'A bright alcohol-free pitcher with apple cider, pear juice, citrus and sparkling water.',
  ingredients:[
   p('apple-cider','Apple cider',24,'floz','Beverages',64,'floz',4.99),p('pear-juice','Pear juice',12,'floz','Beverages',32,'floz',4.99),
   p('sparkling-water','Sparkling water',36,'floz','Beverages',33.8,'floz',1.99),p('lemon','Lemon',1,'each','Produce',4,'each',4.49),
   p('ice','Ice',3,'lb','Beverages',5,'lb',4.99)
  ],
  instructions:['Chill the cider, pear juice and sparkling water thoroughly.','Combine cider and pear juice in a pitcher and add fresh lemon juice to taste.','Immediately before serving, add sparkling water and stir gently.','Serve over ice and label clearly as alcohol-free.'],
  prepTasks:[task('chill','Chill cider spritz ingredients','day-before',5,{fixedStartOffsetMinutes:-1440}),task('batch','Mix cider + pear base','before-guests',8,{finishOffsetMinutes:-45}),task('finish','Add sparkling water + ice','serve',5,{dependsOn:['batch'],finishOffsetMinutes:-5})],
  makeAhead:'Chill everything the day before; mix the still base shortly before guests arrive.',storage:'Keep all components refrigerated.',reheat:'Not applicable.',
  equipment:[eq('drink-pitcher','Large pitcher')],servingRequirements:[eq('water-glasses','Water glasses',1,'serving',{perPerson:true})],
  dietaryTags:['vegan','vegetarian','gluten-free','dairy-free','nut-free','egg-free','soy-free','sesame-free','fish-free','shellfish-free'],allergens:[],preparedPurchase:{estimatedUnitCost:2},...complete()
 }
};

const GROUPS={main:'Main',appetizer:'Appetizer',starch:'Starch',vegetable:'Fresh',fresh:'Fresh',dessert:'Dessert','non-alcoholic-drink':'Drink · Nonalcoholic'};
export const CURATED_SHARED_CATALOG=Object.values(CURATED_SHARED_RECIPES).map(r=>({
  id:r.id,name:r.title,group:GROUPS[r.mealRole]||'Other',style:'curated',minutes:(r.prepTasks||[]).reduce((sum,t)=>sum+(t.durationMinutes||0),0),
  oven:(r.prepTasks||[]).filter(t=>(t.resourceRequirements||[]).some(x=>x.type==='oven')).reduce((sum,t)=>sum+(t.durationMinutes||0),0),
  temp:(r.prepTasks||[]).flatMap(t=>t.resourceRequirements||[]).find(x=>x.type==='oven')?.temperatureF||0,
  cost:Math.round((r.ingredients||[]).reduce((sum,x)=>sum+(x.estimatedPackagePrice||0),0)),
  portion:r.description||'',vessel:(r.servingRequirements||[]).map(x=>x.name).join(' + '),
  ingredients:(r.ingredients||[]).map(x=>[x.name,x.quantity/r.baseServings,x.unit,x.category]),
  easier:'',easyCost:0,makeAhead:r.makeAhead||'',finish:r.reheat||'',tags:r.dietaryTags||[],
  source:'Crow & Crown',sourceUrl:r.referenceUrl||null
}));
