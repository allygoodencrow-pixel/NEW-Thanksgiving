import { activities as activityLibrary, activityByName, activityPeople, activitySupplies, printActivity } from './activities';
import { completeRecipe } from './completeRecipes';
import { groupPrintables } from './printableCategories';
import { referenceRecipes } from './referenceRecipes';
import { guideRecipes } from './guideRecipes';
import { moreReviewedRecipes } from './moreReviewedRecipes';
import { expandedRecipes } from './expandedRecipes';
import { recipePhotos as dishThumb } from './recipePhotos';
import { auditedRecipes, pecanRecipe } from './auditedRecipes';
import { equipmentChecklist, advanceWindows, stationGuides, tableChecklist, guestJourney, guideLinks } from './hostingGuide';
import { normalizeState, planningContext, uid, nextThanksgiving, preparation, responsibility, derivePlan, dishPortions, recipeQuantityServings, recipeIngredientQuantity, formatRecipeAmount, recipeReady, completeMealCoverage, timelineWarnings, buildTimeline, parseIngredients, printOne, printableCards as selectPrintableCards, reconcileState } from './domain';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Plus,
  Printer,
  RotateCcw,
  X,
} from 'lucide-react';

export type Dish = {
  id: string;
  name: string;
  group: string;
  style: string;
  minutes: number;
  oven: number;
  temp: number;
  cost: number;
  portion: string;
  vessel: string;
  ingredients: [string, number, string, string][];
  easier: string;
  easyCost: number;
  makeAhead: string;
  finish: string;
  tags?: string[];
  kidFriendly?: boolean;
  source?: string;
  sourceUrl?: string;
  rating?: string;
  audience?: 'all' | 'adults' | 'kids';
  serves?: number;
  instructions?: string;
  image?: string;
  recipeVerified?: boolean;
  batchMode?: 'whole' | 'half';
  ingredientSteps?: Record<string, number>;
  seasoning?: string;
  servingPlan?: boolean;
  pantryChecks?: string[];
  ingredientNotes?: Record<string,string>;
  prepPhases?: { label: string; offsetMinutes: number }[];
  advanceTasks?: { label: string; minutesBeforeCooking: number }[];
  sourceYield?: string;
  prepMinutes?: number;
  restMinutes?: number;
  ovenStages?: { label:string; minutes:number; temp:number; waitBefore?:number; restAfter?:number }[];
};
const legacyDishes: Dish[] = [
  {
    id: 'turkey',
    name: 'Herb-roasted turkey',
    group: 'Main',
    style: 'classic',
    minutes: 210,
    oven: 210,
    temp: 325,
    cost: 95,
    portion: '1–1½ lb raw bone-in turkey per guest',
    vessel: 'Large platter + carving set',
    ingredients: [
      ['Turkey', 1.25, 'lb', 'Meat'],
      ['Butter', 0.08, 'lb', 'Dairy'],
      ['Fresh herbs', 0.08, 'bunch', 'Produce'],
    ],
    easier: 'Prepared turkey breast',
    easyCost: 155,
    makeAhead: 'Dry brine the day before',
    finish: 'Carve onto a warmed platter; finish with restrained herbs.',
  },
  {
    id: 'stuffing',
    name: 'Sage + onion stuffing',
    group: 'Starch',
    style: 'classic',
    minutes: 55,
    oven: 45,
    temp: 350,
    cost: 38,
    portion: '¾ cup prepared per guest',
    vessel: 'Large shallow baking dish + spoon',
    ingredients: [
      ['Bread cubes', 0.19, 'lb', 'Bakery'],
      ['Onions', 0.15, 'lb', 'Produce'],
      ['Stock', 0.18, 'cup', 'Pantry'],
    ],
    easier: 'Bakery stuffing',
    easyCost: 70,
    makeAhead: 'Assemble the day before',
    finish: 'Serve in its baking dish with a clean serving spoon.',
  },
  {
    id: 'potatoes',
    name: 'Silky mashed potatoes',
    group: 'Starch',
    style: 'classic',
    minutes: 45,
    oven: 0,
    temp: 0,
    cost: 32,
    portion: '½ lb potatoes per guest',
    vessel: 'Low stoneware bowl + large spoon',
    ingredients: [
      ['Potatoes', 0.5, 'lb', 'Produce'],
      ['Butter', 0.08, 'lb', 'Dairy'],
      ['Cream', 0.08, 'cup', 'Dairy'],
    ],
    easier: 'Prepared mashed potatoes',
    easyCost: 65,
    makeAhead: 'Up to 1 day ahead; refrigerate',
    finish:
      'Use a low stoneware bowl; finish with butter and a little fresh herb.',
  },
  {
    id: 'gravy',
    name: 'Pan gravy',
    group: 'Sauce',
    style: 'classic',
    minutes: 25,
    oven: 0,
    temp: 0,
    cost: 18,
    portion: '⅓ cup per guest',
    vessel: 'Gravy boat + ladle',
    ingredients: [
      ['Stock', 0.34, 'cup', 'Pantry'],
      ['Flour', 0.03, 'lb', 'Pantry'],
    ],
    easier: 'Upgraded prepared gravy',
    easyCost: 34,
    makeAhead: 'Base can be made 2 days ahead',
    finish: 'Transfer to a warmed gravy boat just before dinner.',
  },
  {
    id: 'greens',
    name: 'Garlicky green beans',
    group: 'Fresh',
    style: 'modern',
    minutes: 25,
    oven: 0,
    temp: 0,
    cost: 33,
    portion: '⅓ lb per guest',
    vessel: 'Long serving platter + tongs',
    ingredients: [
      ['Green beans', 0.33, 'lb', 'Produce'],
      ['Garlic', 0.05, 'head', 'Produce'],
    ],
    easier: 'Trimmed ready-to-cook beans',
    easyCost: 48,
    makeAhead: 'Trim and blanch the day before',
    finish: 'Arrange loosely on a long platter; add lemon at the end.',
  },
  {
    id: 'cranberry',
    name: 'Cranberry + orange',
    group: 'Fresh',
    style: 'modern',
    minutes: 20,
    oven: 0,
    temp: 0,
    cost: 16,
    portion: '¼ cup per guest',
    vessel: 'Small bowl + spoon',
    ingredients: [
      ['Cranberries', 0.13, 'lb', 'Produce'],
      ['Oranges', 0.11, 'each', 'Produce'],
      ['Sugar', 0.03, 'lb', 'Pantry'],
    ],
    easier: 'Prepared cranberry sauce',
    easyCost: 22,
    makeAhead: 'Up to 3 days ahead',
    finish: 'Serve chilled in a small bowl with orange zest.',
  },
  {
    id: 'rolls',
    name: 'Warm dinner rolls',
    group: 'Starch',
    style: 'classic',
    minutes: 15,
    oven: 12,
    temp: 350,
    cost: 20,
    portion: '1½ rolls per guest',
    vessel: 'Linen-lined basket + tongs',
    ingredients: [
      ['Dinner rolls', 1.5, 'each', 'Bakery'],
      ['Butter', 0.03, 'lb', 'Dairy'],
    ],
    easier: 'Bakery rolls, served at room temperature',
    easyCost: 28,
    makeAhead: 'Buy 1–2 days before',
    finish: 'Line a basket with a dark linen napkin.',
  },
  {
    id: 'pie',
    name: 'Pumpkin pie',
    group: 'Dessert',
    style: 'classic',
    minutes: 75,
    oven: 55,
    temp: 350,
    cost: 32,
    portion: '1 slice per guest',
    vessel: 'Cake stand + pie server',
    ingredients: [
      ['Pumpkin purée', 0.09, 'can', 'Pantry'],
      ['Pie crust', 0.13, 'each', 'Frozen'],
      ['Cream', 0.08, 'cup', 'Dairy'],
    ],
    easier: 'Bakery pumpkin pie',
    easyCost: 58,
    makeAhead: 'Bake 1–2 days ahead',
    finish: 'Present whole on a simple stand; cut when ready to serve.',
  },
  {
    id: 'salad',
    name: 'Bitter greens + pear salad',
    group: 'Fresh',
    style: 'modern',
    minutes: 20,
    oven: 0,
    temp: 0,
    cost: 38,
    portion: '1 small plate per guest',
    vessel: 'Wide shallow bowl + tongs',
    ingredients: [
      ['Salad greens', 0.15, 'lb', 'Produce'],
      ['Pears', 0.25, 'each', 'Produce'],
      ['Vinaigrette', 0.06, 'cup', 'Pantry'],
    ],
    easier: 'Market salad kit',
    easyCost: 48,
    makeAhead: 'Wash greens and make dressing the day before',
    finish: 'Dress lightly at the last moment; keep the bowl wide and low.',
  },
  {
    id: 'mac',
    name: 'Baked mac + cheese',
    group: 'Starch',
    style: 'big',
    minutes: 65,
    oven: 35,
    temp: 375,
    cost: 48,
    portion: '½ cup per guest',
    vessel: 'Baking dish + spoon',
    ingredients: [
      ['Pasta', 0.18, 'lb', 'Pantry'],
      ['Cheese', 0.15, 'lb', 'Dairy'],
      ['Milk', 0.12, 'cup', 'Dairy'],
    ],
    easier: 'Prepared mac + cheese',
    easyCost: 75,
    makeAhead: 'Assemble the day before',
    finish: 'Serve directly in an attractive baking dish.',
  },
  {
    id: 'sweet',
    name: 'Roasted sweet potatoes',
    group: 'Starch',
    style: 'modern',
    minutes: 50,
    oven: 40,
    temp: 400,
    cost: 30,
    portion: '⅓ lb per guest',
    vessel: 'Low platter + spoon',
    ingredients: [
      ['Sweet potatoes', 0.35, 'lb', 'Produce'],
      ['Olive oil', 0.04, 'cup', 'Pantry'],
    ],
    easier: 'Prepared sweet potatoes',
    easyCost: 55,
    makeAhead: 'Peel and cut the day before',
    finish: 'Keep the garnish spare; add flaky salt.',
  },
  {
    id: 'app',
    name: 'Whipped ricotta + crostini',
    group: 'Appetizer',
    style: 'modern',
    minutes: 25,
    oven: 10,
    temp: 350,
    cost: 28,
    portion: '2 pieces per guest',
    vessel: 'Board + spreader',
    ingredients: [
      ['Ricotta', 0.12, 'lb', 'Dairy'],
      ['Baguette', 0.13, 'each', 'Bakery'],
    ],
    easier: 'Assembled olives + cheese',
    easyCost: 32,
    makeAhead: 'Whip ricotta the day before',
    finish: 'Keep on the drinks station, clear of the dining table.',
  },
  {
    id: 'ba-dry-turkey',
    name: 'Dry-brined turkey + honey glaze',
    group: 'Main',
    style: 'editor-pick',
    minutes: 285,
    oven: 150,
    temp: 325,
    cost: 110,
    portion: 'Plan about 1–1½ lb raw turkey per adult-size portion',
    vessel: 'Large platter + carving set',
    ingredients: [
      ['Turkey', 1.25, 'lb', 'Meat'],
      ['Butter', 0.07, 'lb', 'Dairy'],
      ['Honey', 0.03, 'cup', 'Pantry'],
      ['Vinegar', 0.02, 'cup', 'Pantry'],
      ['Fresh rosemary', 0.04, 'bunch', 'Produce'],
    ],
    easier: '',
    easyCost: 110,
    makeAhead: 'Dry-brine 1–2 days before',
    finish: 'Rest well, carve, and glaze lightly before serving.',
    tags: ['Gluten-Free', 'Nut-Free', 'Egg-Free', 'Sesame-Free', 'Shellfish-Free'],
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/dry-rubbed-roast-turkey',
    rating: '4.6 ★ · 135 ratings',
  },
  {
    id: 'ba-simple-stuffing',
    name: 'Simple-Is-Best stuffing',
    group: 'Starch',
    style: 'editor-pick',
    minutes: 105,
    oven: 80,
    temp: 350,
    cost: 42,
    portion: 'About ¾ cup prepared per adult-size portion',
    vessel: 'Large casserole + serving spoon',
    ingredients: [
      ['Day-old bread', 0.14, 'lb', 'Bakery'],
      ['Onions', 0.08, 'lb', 'Produce'],
      ['Celery', 0.06, 'lb', 'Produce'],
      ['Stock', 0.28, 'cup', 'Pantry'],
      ['Fresh herbs', 0.03, 'bunch', 'Produce'],
    ],
    easier: '',
    easyCost: 42,
    makeAhead: 'Bake most of the way the day before; crisp before serving',
    finish: 'Serve from the casserole so the crisp top stays intact.',
    tags: ['Nut-Free', 'Sesame-Free', 'Shellfish-Free'],
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/simple-is-best-stuffing-dressing',
    rating: '4.6 ★ · 495 ratings',
  },
  {
    id: 'ba-mashed',
    name: 'BA’s Best mashed potatoes',
    group: 'Starch',
    style: 'editor-pick',
    minutes: 50,
    oven: 0,
    temp: 0,
    cost: 36,
    portion: 'About ½ lb potatoes per adult-size portion',
    vessel: 'Low bowl + large spoon',
    ingredients: [
      ['Yukon Gold potatoes', 0.5, 'lb', 'Produce'],
      ['Butter', 0.08, 'lb', 'Dairy'],
      ['Milk', 0.08, 'cup', 'Dairy'],
      ['Cream', 0.06, 'cup', 'Dairy'],
    ],
    easier: '',
    easyCost: 36,
    makeAhead: 'Can be made 1 day ahead and gently reheated',
    finish: 'Keep the top loose and glossy, not overworked.',
    tags: ['Vegetarian', 'Gluten-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/best-mashed-potatoes',
    rating: '4.6 ★ · 94 ratings',
  },
  {
    id: 'ba-honey-brussels',
    name: 'Charred Brussels sprouts + warm honey glaze',
    group: 'Fresh',
    style: 'editor-pick',
    minutes: 40,
    oven: 30,
    temp: 450,
    cost: 34,
    portion: 'About ¼ lb sprouts per adult-size portion',
    vessel: 'Wide platter + serving spoon',
    ingredients: [
      ['Brussels sprouts', 0.25, 'lb', 'Produce'],
      ['Honey', 0.03, 'cup', 'Pantry'],
      ['Butter', 0.03, 'lb', 'Dairy'],
      ['Lemon', 0.08, 'each', 'Produce'],
    ],
    easier: '',
    easyCost: 34,
    makeAhead: 'Trim sprouts and make glaze the day before',
    finish: 'Glaze at the end so the edges stay charred.',
    tags: ['Vegetarian', 'Gluten-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/roasted-brussels-sprouts-with-warm-honey-glaze',
    rating: '4.7 ★ · 159 ratings',
  },
  {
    id: 'ba-greenbeans',
    name: 'Green beans + mushrooms + crispy shallots',
    group: 'Fresh',
    style: 'editor-pick',
    minutes: 45,
    oven: 0,
    temp: 0,
    cost: 38,
    portion: 'About ¼ lb green beans per adult-size portion',
    vessel: 'Long platter + tongs',
    ingredients: [
      ['Green beans', 0.25, 'lb', 'Produce'],
      ['Mushrooms', 0.08, 'lb', 'Produce'],
      ['Shallots', 0.04, 'lb', 'Produce'],
      ['Butter', 0.03, 'lb', 'Dairy'],
    ],
    easier: '',
    easyCost: 38,
    makeAhead: 'Blanch beans and crisp shallots 1 day ahead',
    finish: 'Rewarm on the stovetop and add shallots at the last moment.',
    tags: ['Vegetarian', 'Gluten-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/green-beans-and-mushrooms-with-crispy-shallots',
    rating: '4.7 ★ · 51 ratings',
  },
  {
    id: 'ba-pumpkin-pie',
    name: 'BA’s Best pumpkin pie',
    group: 'Dessert',
    style: 'editor-pick',
    minutes: 105,
    oven: 60,
    temp: 350,
    cost: 38,
    portion: '1 slice per adult-size portion',
    vessel: 'Cake stand + pie server',
    ingredients: [
      ['Pumpkin purée', 0.09, 'can', 'Pantry'],
      ['Pie crust', 0.13, 'each', 'Frozen'],
      ['Sweetened condensed milk', 0.08, 'can', 'Dairy'],
      ['Warm spices', 0.02, 'jar', 'Pantry'],
    ],
    easier: '',
    easyCost: 38,
    makeAhead: 'Bake 1 day ahead and cool completely',
    finish: 'Serve whole and slice at dessert.',
    tags: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/best-pumpkin-pie',
    rating: '4.5 ★ · 64 ratings',
  },
  {
    id: 'ba-parker-rolls',
    name: 'Parker House rolls',
    group: 'Bread',
    style: 'editor-pick',
    minutes: 55,
    oven: 30,
    temp: 350,
    cost: 26,
    portion: '1–2 rolls per guest',
    vessel: 'Linen-lined bread basket',
    ingredients: [
      ['All-purpose flour', 0.12, 'lb', 'Bakery'],
      ['Milk', 0.06, 'cup', 'Dairy'],
      ['Butter', 0.03, 'lb', 'Dairy'],
      ['Yeast', 0.06, 'packet', 'Pantry'],
    ],
    easier: '',
    easyCost: 26,
    makeAhead: 'Shape and chill several hours ahead or freeze baked rolls',
    finish: 'Brush warm rolls lightly with butter before serving.',
    tags: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/bon-appetit/recipe/parker-house-rolls',
    rating: '576 reader ratings',
  },
  {
    id: 'ba-roasted-sweet',
    name: 'Roasted sweet potatoes',
    group: 'Starch',
    style: 'editor-pick',
    minutes: 50,
    oven: 45,
    temp: 450,
    cost: 28,
    portion: 'About ½ lb per adult-size portion',
    vessel: 'Low platter + spoon',
    ingredients: [
      ['Sweet potatoes', 0.5, 'lb', 'Produce'],
      ['Olive oil', 0.03, 'cup', 'Pantry'],
    ],
    easier: '',
    easyCost: 28,
    makeAhead: 'Can be roasted up to 3 days ahead',
    finish: 'Reheat uncovered so the edges stay browned.',
    tags: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/roasted-sweet-potatoes',
    rating: '4.0 ★ · 58 ratings',
  },
  {
    id: 'ba-fancy-cranberry',
    name: 'Fancy jellied cranberry sauce',
    group: 'Sauce',
    style: 'editor-pick',
    minutes: 30,
    oven: 0,
    temp: 0,
    cost: 22,
    portion: 'About ¼ cup per adult-size portion',
    vessel: 'Low plate or small serving bowl',
    ingredients: [
      ['Cranberries', 0.15, 'lb', 'Produce'],
      ['Sugar', 0.08, 'lb', 'Pantry'],
      ['Gelatin', 0.03, 'packet', 'Pantry'],
      ['Orange', 0.06, 'each', 'Produce'],
    ],
    easier: '',
    easyCost: 22,
    makeAhead: 'Make and chill 2 days ahead',
    finish: 'Unmold shortly before serving.',
    tags: ['Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    source: 'Bon Appétit',
    sourceUrl: 'https://www.bonappetit.com/recipe/fancy-cranberry-sauce',
    rating: '4.7 ★ · 26 ratings',
  },
  {
    id: 'allrecipes-corn',
    name: 'Creamy corn casserole',
    group: 'Starch',
    style: 'community-favorite',
    minutes: 60,
    oven: 50,
    temp: 350,
    cost: 28,
    portion: 'About ½ cup per guest',
    vessel: 'Casserole + serving spoon',
    ingredients: [
      ['Corn', 0.12, 'can', 'Pantry'],
      ['Creamed corn', 0.08, 'can', 'Pantry'],
      ['Corn muffin mix', 0.07, 'box', 'Bakery'],
      ['Sour cream', 0.05, 'cup', 'Dairy'],
      ['Butter', 0.03, 'lb', 'Dairy'],
    ],
    easier: '',
    easyCost: 28,
    makeAhead: 'Assemble ahead and refrigerate before baking',
    finish: 'Serve warm directly from the casserole.',
    tags: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Allrecipes',
    sourceUrl: 'https://www.allrecipes.com/our-most-popular-casseroles-of-all-time-11786905',
    rating: 'Allrecipes all-time popular',
  },
  {
    id: 'allrecipes-broccoli-cheese',
    name: 'Broccoli + cheese casserole',
    group: 'Fresh',
    style: 'community-favorite',
    minutes: 50,
    oven: 35,
    temp: 350,
    cost: 32,
    portion: 'About ½ cup per guest',
    vessel: 'Casserole + serving spoon',
    ingredients: [
      ['Broccoli', 0.22, 'lb', 'Produce'],
      ['Cheddar cheese', 0.08, 'lb', 'Dairy'],
      ['Cream of mushroom soup', 0.06, 'can', 'Pantry'],
    ],
    easier: '',
    easyCost: 32,
    makeAhead: 'Assemble earlier in the day',
    finish: 'Bake until hot and browned at the edges.',
    tags: ['Vegetarian', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Allrecipes',
    sourceUrl: 'https://www.allrecipes.com/our-most-popular-casseroles-of-all-time-11786905',
    rating: 'Allrecipes kid-favorite',
  },
  {
    id: 'fn-vegan-greenbean',
    name: 'Vegan green bean casserole',
    group: 'Fresh',
    style: 'dietary',
    minutes: 55,
    oven: 30,
    temp: 375,
    cost: 34,
    portion: 'About ½ cup per adult-size portion',
    vessel: 'Casserole + serving spoon',
    ingredients: [
      ['Green beans', 0.25, 'lb', 'Produce'],
      ['Mushrooms', 0.08, 'lb', 'Produce'],
      ['Plant milk', 0.08, 'cup', 'Dairy'],
      ['Crispy onions', 0.04, 'cup', 'Pantry'],
    ],
    easier: '',
    easyCost: 34,
    makeAhead: 'Prep sauce and beans the day before',
    finish: 'Bake close to dinner so the topping stays crisp.',
    tags: ['Vegan', 'Vegetarian', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Shellfish-Free'],
    source: 'Food Network Kitchen',
    sourceUrl: 'https://www.foodnetwork.com/thanksgiving/photos/vegan-thanksgiving-recipes',
    rating: 'Test-kitchen vegan pick',
  },
  {
    id: 'fn-gf-cornbread',
    name: 'Gluten-free skillet cornbread',
    group: 'Bread',
    style: 'dietary',
    minutes: 45,
    oven: 30,
    temp: 375,
    cost: 24,
    portion: '1 wedge per guest',
    vessel: 'Skillet or bread basket',
    ingredients: [
      ['Cornmeal', 0.08, 'lb', 'Bakery'],
      ['Gluten-free flour', 0.05, 'lb', 'Bakery'],
      ['Plant milk', 0.06, 'cup', 'Dairy'],
      ['Winter squash', 0.06, 'lb', 'Produce'],
    ],
    easier: '',
    easyCost: 24,
    makeAhead: 'Bake earlier in the day and rewarm',
    finish: 'Cut into wedges and serve warm.',
    tags: ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Food Network Kitchen',
    sourceUrl: 'https://www.foodnetwork.com/thanksgiving/photos/vegan-thanksgiving-recipes',
    rating: 'Gluten- + dairy-free pick',
  },
  {
    id: 'ew-stuffed-squash',
    name: 'Wild rice–stuffed acorn squash',
    group: 'Main',
    style: 'dietary',
    minutes: 80,
    oven: 55,
    temp: 400,
    cost: 46,
    portion: '½–1 squash per adult-size portion',
    vessel: 'Large platter',
    ingredients: [
      ['Acorn squash', 0.5, 'each', 'Produce'],
      ['Wild rice', 0.11, 'lb', 'Pantry'],
      ['Mushrooms', 0.08, 'lb', 'Produce'],
      ['Fresh herbs', 0.03, 'bunch', 'Produce'],
    ],
    easier: '',
    easyCost: 46,
    makeAhead: 'Cook filling 1 day ahead; roast and fill before serving',
    finish: 'Arrange cut-side up on a wide platter.',
    tags: ['Vegan', 'Vegetarian', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Shellfish-Free'],
    source: 'EatingWell',
    sourceUrl: 'https://www.eatingwell.com/gallery/8077409/vegan-thanksgiving-recipes-youll-want-to-make-forever/',
    rating: 'Top-rated vegan collection',
  },
  {
    id: 'fn-citrus-cranberry',
    name: 'Citrus cranberry sauce',
    group: 'Sauce',
    style: 'dietary',
    minutes: 30,
    oven: 0,
    temp: 0,
    cost: 20,
    portion: 'About ¼ cup per adult-size portion',
    vessel: 'Small serving bowl + spoon',
    ingredients: [
      ['Cranberries', 0.13, 'lb', 'Produce'],
      ['Oranges', 0.12, 'each', 'Produce'],
      ['Sugar', 0.05, 'lb', 'Pantry'],
    ],
    easier: '',
    easyCost: 20,
    makeAhead: 'Make up to 3 days ahead and chill',
    finish: 'Bring out just before dinner.',
    tags: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
    kidFriendly: true,
    source: 'Food Network',
    sourceUrl: 'https://www.foodnetwork.com/recipes/citrus-cranberry-sauce-recipe-1909012',
    rating: 'Allergy-friendly classic',
  },
  {
    id: 'sparkling-water',
    name: 'Still + sparkling water',
    group: 'Drink · Nonalcoholic',
    style: 'drink',
    minutes: 5,
    oven: 0,
    temp: 0,
    cost: 24,
    portion: '2–3 drinks per guest through dinner',
    vessel: 'Chilled bottles or carafes + water glasses',
    ingredients: [
      ['Still water', 1.25, 'servings', 'Beverages'],
      ['Sparkling water', 1.0, 'servings', 'Beverages'],
    ],
    easier: '',
    easyCost: 24,
    makeAhead: 'Chill the day before',
    finish: 'Set water where guests can serve themselves.',
    kidFriendly: true,
    audience: 'all',
  },
  {
    id: 'wine',
    name: 'Wine for dinner',
    group: 'Drink · Alcoholic',
    style: 'drink',
    minutes: 5,
    oven: 0,
    temp: 0,
    cost: 70,
    portion: 'About 2 glasses per adult',
    vessel: 'Wine glasses + opener',
    ingredients: [['Wine', 0.5, 'bottles', 'Beverages']],
    easier: '',
    easyCost: 70,
    makeAhead: 'Buy ahead; chill whites before guests arrive',
    finish: 'Open one bottle at a time so the station stays clean.',
    audience: 'adults',
  },
  {
    id: 'signature-cocktail',
    name: 'Signature cocktail',
    group: 'Drink · Alcoholic',
    style: 'drink',
    minutes: 20,
    oven: 0,
    temp: 0,
    cost: 85,
    portion: '1½ cocktails per adult',
    vessel: 'Cocktail glasses + pitcher or shaker',
    ingredients: [
      ['Cocktail base / spirits', 0.11, '750 ml bottles', 'Beverages'],
      ['Cocktail mixer', 0.18, 'bottles', 'Beverages'],
      ['Cocktail ice', 0.75, 'lb', 'Beverages'],
    ],
    easier: '',
    easyCost: 85,
    makeAhead: 'Batch the non-carbonated base the morning of',
    finish: 'Add ice and bubbles at serving time.',
    audience: 'adults',
  },
  {
    id: 'kids-cider',
    name: 'Kids’ cider + juice',
    group: 'Drink · Kids',
    style: 'drink',
    minutes: 5,
    oven: 0,
    temp: 0,
    cost: 18,
    portion: '2 drinks per child',
    vessel: 'Kid-safe cups',
    ingredients: [['Apple cider / juice', 2, 'servings', 'Beverages']],
    easier: '',
    easyCost: 18,
    makeAhead: 'Chill the day before',
    finish: 'Keep a small pitcher at the kids’ table.',
    kidFriendly: true,
    audience: 'kids',
  },
  {
    id: 'coffee-tea',
    name: 'Coffee + tea after dinner',
    group: 'Drink · After dinner',
    style: 'drink',
    minutes: 10,
    oven: 0,
    temp: 0,
    cost: 22,
    portion: '1½ hot drinks per adult',
    vessel: 'Coffee cups / mugs + teaspoons',
    ingredients: [
      ['Coffee', 0.08, 'lb', 'Beverages'],
      ['Tea bags', 0.5, 'each', 'Beverages'],
      ['Coffee cream', 0.08, 'cup', 'Dairy'],
    ],
    easier: '',
    easyCost: 22,
    makeAhead: 'Stage cups, tea and sugar before dinner',
    finish: 'Brew coffee when dessert comes out.',
    audience: 'adults',
  },
];
export const dishes: Dish[] = [...legacyDishes.filter(d=>!guideRecipes.some(r=>r.id===d.id)).map(d=>({...d,...auditedRecipes.find(r=>r.id===d.id)})), ...guideRecipes, pecanRecipe, ...moreReviewedRecipes, ...expandedRecipes].map(completeRecipe).concat(referenceRecipes).map(d=>({...d,image:d.image || dishThumb[d.id]}));
const presets: Record<string, string[]> = {
  'THE CLASSIC': [
    'turkey',
    'stuffing',
    'potatoes',
    'gravy',
    'greens',
    'cranberry',
    'rolls',
    'pie',
  ],
  'THE MODERN': [
    'turkey',
    'potatoes',
    'gravy',
    'salad',
    'sweet',
    'cranberry',
    'pie',
  ],
  'THE EASY HOST': [
    'turkey',
    'stuffing',
    'potatoes',
    'gravy',
    'greens',
    'rolls',
    'pie',
  ],
  'THE COCKTAIL THANKSGIVING': ['turkey', 'app', 'salad', 'rolls', 'pie'],
  'THE SMALL TABLE': ['turkey', 'potatoes', 'greens', 'gravy', 'pie'],
  'THE BIG HOUSE': [
    'turkey',
    'stuffing',
    'potatoes',
    'gravy',
    'greens',
    'mac',
    'salad',
    'rolls',
    'pie',
  ],
};
const primaryDestinations = [
  { label: 'PLAN', tab: 'PARTY PLAN', items: [{tab:'PARTY PLAN',label:'Party plan'}, {tab:'TABLE',label:'Tables + chairs'}, {tab:'EXPERIENCE',label:'Activities'}, {tab:'BUDGET',label:'Budget'}, {tab:'PRINTABLES',label:'Printables'}] },
  { label: 'PLAN MENU', tab: 'PLAN MENU', items: [{tab:'PLAN MENU',label:'Plan Menu'}, {tab:'MENU',label:'Menu'}, {tab:'SHOPPING',label:'Shopping'}] },
  { label: 'PEOPLE', tab: 'GUESTS', items: [{tab:'GUESTS',label:'Guests'}, {tab:'TABLE',label:'Seating'}] },
  { label: 'DAY OF', tab: 'PREP', items: [{tab:'PREP',label:'Prep'}, {tab:'TIMELINE',label:'Timeline'}] },
];
const planningSteps = [
  {tab:'PARTY PLAN', label:'Party plan', hint:'Set the date, dinner time and estimated headcount. Next, add your guests.', group:'PLAN'},
  {tab:'GUESTS', label:'Guests', hint:'Add names, RSVPs and dietary needs. Your chosen headcount updates recipe quantities.', group:'PEOPLE'},
  {tab:'PLAN MENU', label:'Plan Menu', hint:'Browse all recipes and add dishes to your party. Your selections update shopping and prep.', group:'PLAN MENU'},
  {tab:'MENU', label:'Menu', hint:'Review the dishes selected for your party, quantities and who is bringing each dish.', group:'PLAN MENU'},
  {tab:'SHOPPING', label:'Shopping', hint:'Check the list built from your menu and headcount. Mark what you have, then plan the prep.', group:'PLAN MENU'},
  {tab:'PREP', label:'Prep', hint:'Review what to make ahead and what to cook on the day. Then check the timing.', group:'DAY OF'},
  {tab:'TIMELINE', label:'Timeline', hint:'Review cooking, arrivals and activities together. Adjust times around dinner.', group:'DAY OF'},
];
const extraTools = [
  {tab:'EXPERIENCE',label:'Activities + drinks',group:'PLAN',hint:'Choose activities and drinks. Timed activities appear in your timeline.',returnTab:'TIMELINE'},
  {tab:'TABLE',label:'Seating + tables',group:'PLAN',hint:'Arrange seats and check your table and chair needs using your guest list.',returnTab:'GUESTS'},
  {tab:'BUDGET',label:'Budget',group:'PLAN',hint:'Review planned costs and add prices for unpriced ingredients.',returnTab:'SHOPPING'},
  {tab:'PRINTABLES',label:'Printables',group:'PLAN',hint:'Print the menu, shopping list or schedule from your current plan.',returnTab:'TIMELINE'},
];
const readAppRoute = () => {
  const route = window.location.hash.slice(1).replace(/-/g, ' ').toUpperCase();
  if(route==='RECIPES') return 'PLAN MENU';
  return ['HOME', ...planningSteps.map(x=>x.tab), ...extraTools.map(x=>x.tab)].includes(route) ? route : 'HOME';
};

export type Guest = {
  guestId: string;
  dietaryNeeds: string[];
  name: string;
  rsvp: 'Attending' | 'Pending' | 'Declined';
  ageGroup: 'Adult' | 'Child';
  alcohol: boolean | null;
  kidBeverage: string;
  diet: string;
  dish: string;
  status: 'Not confirmed' | 'Confirmed' | 'Arrived';
  note: string;
};
export type PlanningMode = 'Estimated' | 'Expected' | 'Confirmed' | 'Custom';
export type CustomShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};
export type PrepTask = {
  id: string;
  label: string;
  phase: 'DO FIRST' | '1–2 DAYS BEFORE' | 'THANKSGIVING DAY' | 'FINAL 60 MINUTES';
};
export type TimelineTask = {
  id: string;
  label: string;
  time: string;
  category: string;
};
export type State = {
  schemaVersion: number;
  eventDate: string;
  estimatedDrinkers: number;
  customKids: number;
  customDrinkers: number;
  childDrink: string;
  menuPlan: Record<string, {owner: string; status: 'Planned' | 'Confirmed' | 'Arrived'; preparation: 'Homemade' | 'Purchased'}>;
  shoppingOverrides: Record<string, {mode: 'adjustment' | 'locked'; value: number}>;
  hiddenShopping: string[];
  unitPrices: Record<string, number>;
  actualSpend: {id: string; label: string; amount: number}[];
  printableOverrides: Record<string, {name?: string; desc?: string}>;
  drafts: Record<string, any>;
  cocktailGlasses: number;
  coffeeMugs: number;
  adultCups: number;
  spoons: number;
  tablesOwned: number;
  timelineOverrides: Record<string, number>;

  count: number;
  planningMode: PlanningMode;
  customHeadcount: number;
  kids: number;
  appetite: string;
  time: string;
  budget: number;
  style: string;
  service: string;
  cook: string;
  location: string;
  fridge: string;
  outdoor: boolean;
  ovens: number;
  racks: number;
  chairs: number;
  plates: number;
  dessertPlates: number;
  forks: number;
  dessertForks: number;
  knives: number;
  waterGlasses: number;
  glasses: number;
  kidsCups: number;
  napkins: number;
  linens: number;
  platters: number;
  table: string;
  tableShape: string;
  tableCapacity: number;
  kidsTable: boolean;
  inspiration: string[];
  turkey: string;
  frozen: boolean;
  leftovers: boolean;
  selections: string[];
  easy: string[];
  customRecipes: Dish[];
  menuOwners: Record<string, string>;
  customShoppingItems: CustomShoppingItem[];
  shoppingQtyOverrides: Record<string, number>;
  customPrepTasks: PrepTask[];
  customTimelineItems: TimelineTask[];
  activities: string[];
  guests: Guest[];
  purchased: string[];
  done: string[];
  borrowed: string[];
  seating: Record<string, string>;
  notes: string;
  experience: string;
  drink: string;
  hostBuffer: string;
  dayMode: boolean;
};
export const initial: State = {
  schemaVersion: 4, eventDate: nextThanksgiving(), estimatedDrinkers: 0, customKids: 2, customDrinkers: 0, childDrink: 'Water',
  menuPlan: {pie:{owner:'guest-seed-0',status:'Confirmed',preparation:'Homemade'}}, shoppingOverrides: {}, hiddenShopping: [], unitPrices: {}, actualSpend: [], printableOverrides: {}, drafts: {},
  cocktailGlasses: 0, coffeeMugs: 0, adultCups: 0, spoons: 0, tablesOwned: 1, timelineOverrides: {},
  count: 18,
  planningMode: 'Expected',
  customHeadcount: 18,
  kids: 2,
  appetite: 'Standard',
  time: '17:30',
  budget: 1200,
  style: 'THE CLASSIC',
  service: 'Buffet',
  cook: 'Mostly homemade',
  location: 'At home',
  fridge: 'Moderate',
  outdoor: false,
  ovens: 1,
  racks: 2,
  chairs: 14,
  plates: 12,
  dessertPlates: 12,
  forks: 16,
  dessertForks: 12,
  knives: 16,
  waterGlasses: 12,
  glasses: 8,
  kidsCups: 2,
  napkins: 14,
  linens: 1,
  platters: 2,
  table: 'Espresso + Bone',
  tableShape: 'Rectangle',
  tableCapacity: 8,
  kidsTable: true,
  inspiration: [],
  turkey: 'Whole turkey',
  frozen: true,
  leftovers: true,
  selections: presets['THE CLASSIC'],
  easy: [],
  customRecipes: [],
  menuOwners: {},
  customShoppingItems: [],
  shoppingQtyOverrides: {},
  customPrepTasks: [],
  customTimelineItems: [],
  activities: ['Conversation cards'],
  guests: [
    {
      guestId: 'guest-seed-0', dietaryNeeds: [], name: 'Mom',
      rsvp: 'Attending',
      ageGroup: 'Adult',
      alcohol: false,
      kidBeverage: '',
      diet: '',
      dish: 'Pumpkin pie',
      status: 'Confirmed',
      note: '',
    },
    {
      guestId: 'guest-seed-1', dietaryNeeds: [], name: 'Sarah',
      rsvp: 'Attending',
      ageGroup: 'Adult',
      alcohol: true,
      kidBeverage: '',
      diet: 'Vegetarian',
      dish: 'Wine',
      status: 'Confirmed',
      note: '',
    },
    {
      guestId: 'guest-seed-2', dietaryNeeds: [], name: 'David',
      rsvp: 'Attending',
      ageGroup: 'Adult',
      alcohol: true,
      kidBeverage: '',
      diet: '',
      dish: 'Salad',
      status: 'Not confirmed',
      note: '',
    },
    {
      guestId: 'guest-seed-3', dietaryNeeds: [], name: 'Alex',
      rsvp: 'Pending',
      ageGroup: 'Adult',
      alcohol: false,
      kidBeverage: '',
      diet: 'Dairy-free',
      dish: 'Ice',
      status: 'Not confirmed',
      note: '',
    },
  ],
  purchased: [],
  done: [],
  borrowed: [],
  seating: {},
  notes: '',
  experience: 'Conversation cards',
  drink: 'Wine-focused',
  hostBuffer: '14:15',
  dayMode: false,
};
const timeToMin = (v: string) => {
  const [h, m] = v.split(':').map(Number);
  return h * 60 + m;
};
const clock = (m: number) => {
  const h = ((Math.floor(m / 60) % 24) + 24) % 24;
  return `${h % 12 || 12}:${String(((m % 60) + 60) % 60).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
const money = (n: number) => '$' + Math.round(n).toLocaleString();
const qty = (n: number) => (Math.round(n * 100) / 100).toString();

const asset = {
  cover: '/resources/IMG_0827.jpeg',
  hero: '/resources/IMG_0823.jpeg',
  table: '/resources/IMG_0821.jpeg',
  florals: '/resources/EEDBF85F-B0E1-4281-96F2-9E806DB6BF8D.jpeg',
  atmosphere: '/resources/IMG_0821.jpeg',
  bird: '/resources/IMG_0835-1.jpeg',
  stuffing: '/resources/IMG_0846.jpeg',
  potatoes: '/resources/IMG_0842.jpeg',
  gratin: '/resources/IMG_0842.jpeg',
  tableLight: '/resources/IMG_0844.jpeg',
  placeSetting: '/resources/IMG_0824.jpeg',
  feast: '/resources/IMG_0846.jpeg',
  salad: '/resources/IMG_0828.jpeg',
  stuffingDish: '/resources/stuffing.png',
  mashedDish: '/resources/mashed-potatoes.png',
  greenBeansDish: '/resources/green-beans.png',
  cranberryDish: '/resources/cranberry-sauce.png',
  dinnerRollsDish: '/resources/dinner-rolls.png',
  pumpkinPieDish: '/resources/pumpkin-pie.png',
  gravyDish: '/resources/pan-gravy.png',
  macDish: '/resources/mac-cheese.png',
  sweetDish: '/resources/sweet-potatoes.png',
  crostiniDish: '/resources/crostini.png',
};

const shopLooks = [
  {
    name: 'Espresso + Bone',
    palette: 'BROWN VELVET / PEARL IVORY / AMBER',
    image: asset.table,
    products: [
      ['OMMATO Brown Velvet Tablecloth', 'B0FPW85W14'],
      ['Efavormart Taupe Hammered Rim Chargers', 'B0C7HZW146'],
      ['OCCASIONS Pearl Ivory & Gold Dinnerware', 'B0G8LG8RHV'],
      ['PAW Beige Flatware Pocket Napkins', 'B0H2DLZQTS'],
      ['N9R Gold Wood-Grain Plastic Silverware', 'B0CPY8V141'],
      ['40-Pack Plastic Wine Glasses', 'B0FG7HJF9P'],
      ['Fyrstliyn Amber Glass Votive Holders', 'B0DJR221F9'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
  {
    name: 'Taupe + Black + Amber',
    palette: 'BEIGE / TAUPE / BLACK ACCENTS',
    image: asset.placeSetting,
    products: [
      ['Blue Orchards Beige Table Cover', 'B0H1QRQ6XQ'],
      ['Efavormart Clear Chargers with Black Scalloped Rim', 'B0GGDVBFMT'],
      ['LIYH Beige Scalloped Plate Set', 'B0DPMZDHGV'],
      ['IHR Linen/Black Cocktail Napkins', 'B07DFCDGDM'],
      ['SUT Silver Plastic Silverware', 'B0B6H9HZG9'],
      ['Jingmore Brown Ribbed Coupe Glasses', 'B0G39T283M'],
      ['Fyrstliyn Amber Glass Votive Holders', 'B0DJR221F9'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
  {
    name: 'Sage + Charcoal',
    palette: 'SAGE / DARK EDGE / IVORY',
    image: asset.florals,
    products: [
      ['Tableclothsfactory Ivory Velvet Tablecloth', 'B0DF5Q8YS4'],
      ['MAONAME Black & Gold Charger Plates', 'B0BNQ4H51Q'],
      ['LIYH Beige Scalloped Plate Set', 'B0DPMZDHGV'],
      ['Qilery Sage Green Dinner Napkins', 'B0G2XXH2VZ'],
      ['SUT Silver Plastic Silverware', 'B0B6H9HZG9'],
      ['Sage Green Plastic Champagne Flutes', 'B0F1TMTWQ5'],
      ['Home Crystal Brown Tealight Holders', 'B0DHRZCX8B'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
  {
    name: 'Amber After Dark',
    palette: 'ESPRESSO / BROWN GLASS / GOLD',
    image: asset.atmosphere,
    products: [
      ['OMMATO Brown Velvet Tablecloth', 'B0FPW85W14'],
      ['Jovono Round Leather Placemats', 'B0BXLCNG8K'],
      ['Rubtlamp Amber Plates with Gold Rim', 'B0FQ4T33W4'],
      ['N9R Gold Wood-Grain Plastic Silverware', 'B0CPY8V141'],
      ['Jingmore Brown Ribbed Coupe Glasses', 'B0G39T283M'],
      ['Fyrstliyn Amber Glass Votive Holders', 'B0DJR221F9'],
      ['Home Crystal Brown Tealight Holders', 'B0DHRZCX8B'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
  {
    name: 'Black + Bone Minimal',
    palette: 'IVORY / BLACK / A SINGLE WARM NOTE',
    image: asset.tableLight,
    products: [
      ['Tableclothsfactory Ivory Velvet Tablecloth', 'B0DF5Q8YS4'],
      ['Efavormart Clear Chargers with Black Scalloped Rim', 'B0GGDVBFMT'],
      ['OCCASIONS Pearl Ivory & Gold Dinnerware', 'B0G8LG8RHV'],
      ['IHR Linen/Black Cocktail Napkins', 'B07DFCDGDM'],
      ['SUT Silver Plastic Silverware', 'B0B6H9HZG9'],
      ['40-Pack Plastic Wine Glasses', 'B0FG7HJF9P'],
      ['Home Crystal Brown Tealight Holders', 'B0DHRZCX8B'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
  {
    name: 'Autumn Editorial',
    palette: 'BROWN / IVORY / DEEP GREEN',
    image: asset.hero,
    products: [
      ['Horaldaily Champagne Pearl Tablecloth', 'B0FX22QHD3'],
      ['Efavormart Taupe Hammered Rim Chargers', 'B0C7HZW146'],
      ['Exquisite Brown Dinnerware Set', 'B0DMBDJXPQ'],
      ['Qilery Sage Green Dinner Napkins', 'B0G2XXH2VZ'],
      ['WELLIFE Gold Plastic Silverware', 'B0FXX2FP6M'],
      ['Sage Green Plastic Champagne Flutes', 'B0F1TMTWQ5'],
      ['Fyrstliyn Amber Glass Votive Holders', 'B0DJR221F9'],
      ['KDG Cordless Table Lamp', 'B0FL7LWT8Q'],
    ],
  },
] as const;

const baseDishTags: Record<string, string[]> = {
  turkey: ['Gluten-Free', 'Nut-Free', 'Egg-Free', 'Sesame-Free', 'Shellfish-Free'],
  stuffing: ['Nut-Free', 'Sesame-Free', 'Shellfish-Free'],
  potatoes: ['Vegetarian', 'Gluten-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  gravy: ['Nut-Free', 'Egg-Free', 'Sesame-Free', 'Shellfish-Free'],
  greens: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  cranberry: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  rolls: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  pie: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  salad: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Shellfish-Free'],
  mac: ['Vegetarian', 'Nut-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  sweet: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Sesame-Free', 'Fish-Free', 'Shellfish-Free'],
  app: ['Vegetarian', 'Nut-Free', 'Fish-Free', 'Shellfish-Free'],
};

const kidDishIds = new Set(['potatoes', 'rolls', 'pie', 'mac', 'sweet', 'cranberry']);
const tagsForDish = (dish: Dish) => dish.tags || baseDishTags[dish.id] || [];
const isKidDish = (dish: Dish) => dish.kidFriendly ?? kidDishIds.has(dish.id);
const dietTagForNeed = (need: string) => {
  const value = need.toLowerCase();
  if (value.includes('vegan')) return 'Vegan';
  if (value.includes('vegetarian')) return 'Vegetarian';
  if (value.includes('gluten') || value.includes('wheat')) return 'Gluten-Free';
  if (value.includes('dairy') || value.includes('milk')) return 'Dairy-Free';
  if (value.includes('peanut') || value.includes('tree nut') || value.includes('nut allerg')) return 'Nut-Free';
  if (value.includes('egg')) return 'Egg-Free';
  if (value.includes('soy')) return 'Soy-Free';
  if (value.includes('sesame')) return 'Sesame-Free';
  if (value.includes('shellfish')) return 'Shellfish-Free';
  if (value.includes('fish')) return 'Fish-Free';
  return '';
};



type AppProps = {
  seed?: unknown;
  storageKey?: string;
  onPlanChange?: (state: State) => void;
  onAccount?: () => void;
  saveStatus?: string;
};

function App({seed, storageKey = 'cc-thanksgiving-v4', onPlanChange, onAccount, saveStatus}: AppProps = {}) {
  const [loadResult] = useState(() => {
    try { const raw = seed === undefined ? localStorage.getItem(storageKey) || (storageKey === 'cc-thanksgiving-v4' ? localStorage.getItem('cc-thanksgiving-v3') || localStorage.getItem('cc-thanksgiving-v1') : null) : null;
      return {state: normalizeState(seed ?? (raw ? JSON.parse(raw) : initial), initial, dishes), error: ''};
    } catch { return {state: normalizeState(initial, initial, dishes), error: 'Saved plan could not be read. The original saved data has been left untouched. Export this plan before making changes.'}; }
  });
  const [s, setS] = useState<State>(loadResult.state);
  const accountPlan = seed !== undefined;
  const [storageError, setStorageError] = useState(loadResult.error);
  const [canSave,setCanSave]=useState(!loadResult.error);
  const draft = s.drafts.recipe || {};
  const [tab, setTab] = useState(readAppRoute);
  const [openDish, setOpenDish] = useState<string | null>(null);
  const [recipeReplacement,setRecipeReplacement] = useState<string | null>(draft.replacement || null);
  const [customWhole,setCustomWhole]=useState(Boolean(draft.customWhole));
  const [customPrepMinutes,setCustomPrepMinutes]=useState(String(draft.customPrepMinutes||0));
  const [customRestMinutes,setCustomRestMinutes]=useState(String(draft.customRestMinutes||0));
  const [customStages,setCustomStages]=useState<NonNullable<Dish['ovenStages']>>(draft.customStages||[]);
  const menuView = tab==='PLAN MENU' ? 'browse' : 'plan';
  const setMenuView = (view:'plan'|'browse') => {
    navigate(view==='browse'?'PLAN MENU':'MENU','PLAN MENU');
    setOpenDish(null);
  };
  const [menuCategory,setMenuCategory]=useState('All');
  const menuCategoryFor=(d:Dish)=>d.group.startsWith('Drink')?'Drinks':d.group==='Main'?'Mains':d.group==='Dessert'?'Desserts':d.group==='Appetizer'?'Starters':'Sides';
  const [shoppingFilter, setShoppingFilter] = useState<'remaining'|'all'|'bought'>('remaining');
  const [customSource,setCustomSource] = useState<string>(draft.sourceUrl || '');
  const [customImage,setCustomImage] = useState<string>(draft.image || '');
  const [customInstructions,setCustomInstructions] = useState(draft.instructions || '');
  const [newActivity,setNewActivity] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [primarySection, setPrimarySection] = useState(() => primaryDestinations.find(g=>g.items.some(i=>i.tab===readAppRoute()))?.label || 'PLAN');
  useEffect(()=>{
    const restoreRoute=()=>{const next=readAppRoute();setTab(next);setPrimarySection(primaryDestinations.find(g=>g.items.some(i=>i.tab===next))?.label || 'PLAN');setMobileNav(false);setOpenDish(null);window.scrollTo({top:0,behavior:'instant'});};
    window.addEventListener('popstate',restoreRoute);window.addEventListener('hashchange',restoreRoute);
    return()=>{window.removeEventListener('popstate',restoreRoute);window.removeEventListener('hashchange',restoreRoute);};
  },[]);
  const [expandedGuest, setExpandedGuest] = useState<string | null>(null);
  const [expandedShopping, setExpandedShopping] = useState<string | null>(null);
  const [shoppingQuantityDraft, setShoppingQuantityDraft] = useState('');
  const [shoppingPriceDraft, setShoppingPriceDraft] = useState('');
  const [newGuest, setNewGuest] = useState(String(s.drafts.forms?.newGuest || ''));
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [customName, setCustomName] = useState(draft.customName ?? '');
  const [customGroup, setCustomGroup] = useState(draft.customGroup ?? 'Starch');
  const [customMinutes, setCustomMinutes] = useState(draft.customMinutes ?? '30');
  const [customServes, setCustomServes] = useState(draft.serves || String(Math.max(1, planningContext(s).planningHeadcount)));
  const [customIngredients, setCustomIngredients] = useState(draft.customIngredients ?? '');
  const recipeIngredientRows = customIngredients.split('\n').map((line:string)=>{const parts=line.split('|').map((x:string)=>x.trim());return [parts[0]||'',parts[1]||'',parts[2]||'',parts[3]||'Pantry'];});
  const changeRecipeIngredient = (index:number,field:number,value:string) => { const rows=recipeIngredientRows.map((row:string[])=>[...row]);rows[index][field]=value;setCustomIngredients(rows.map((row:string[])=>row.join(' | ')).join('\n')); };
  const [customTags, setCustomTags] = useState<string[]>(draft.customTags ?? []);
  const [customKid, setCustomKid] = useState<boolean>(draft.customKid ?? false);
  const [customOven, setCustomOven] = useState(draft.oven || '0');
  const [customTemp, setCustomTemp] = useState(draft.temp || '350');
  const [customCost, setCustomCost] = useState(draft.cost || '0');
  const [customAhead, setCustomAhead] = useState(draft.ahead || 'Prepare on the day');
  const [recipeError, setRecipeError] = useState('');
  const [spendLabel, setSpendLabel] = useState('');
  const [spendAmount, setSpendAmount] = useState('');
  const [manualItemName, setManualItemName] = useState(String(s.drafts.forms?.manualItemName ?? ''));
  const [manualItemQty, setManualItemQty] = useState(String(s.drafts.forms?.manualItemQty ?? '1'));
  const [manualItemUnit, setManualItemUnit] = useState(String(s.drafts.forms?.manualItemUnit ?? 'each'));
  const [manualItemCategory, setManualItemCategory] = useState(String(s.drafts.forms?.manualItemCategory ?? 'Custom'));
  const [newPrepTask, setNewPrepTask] = useState(String(s.drafts.forms?.newPrepTask ?? ''));
  const [newPrepPhase, setNewPrepPhase] = useState<PrepTask['phase']>('1–2 DAYS BEFORE');
  const [newTimelineLabel, setNewTimelineLabel] = useState(String(s.drafts.forms?.newTimelineLabel ?? ''));
  const [newTimelineTime, setNewTimelineTime] = useState(s.time);
  const [newTimelineCategory, setNewTimelineCategory] = useState('Activity');
  useEffect(() => {
    if (!canSave) return;
    try { localStorage.setItem(storageKey, JSON.stringify(s)); setStorageError(''); }
    catch { setStorageError(accountPlan ? 'Device backup is unavailable. Check your account save status before leaving.' : 'Changes are not saved: browser storage is unavailable or full. Export your plan now.'); }
    onPlanChange?.(s);
  }, [s,canSave,storageKey,onPlanChange,accountPlan]);
  useEffect(() => {
    if (!mobileNav) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const drawer = document.querySelector<HTMLElement>('.sidebar');
    drawer?.querySelector<HTMLElement>('button')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNav(false);
      if (event.key === 'Tab') {
        const controls = drawer?.querySelectorAll<HTMLElement>('button, a, input, select');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length-1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [mobileNav]);
  useEffect(()=>{
    if(!openDish)return;
    const previousFocus=document.activeElement as HTMLElement | null;
    const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
    const sheet=document.querySelector<HTMLElement>('.recipe-sheet');sheet?.querySelector<HTMLElement>('button')?.focus();
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpenDish(null);if(e.key==='Tab'){const items=sheet?.querySelectorAll<HTMLElement>('button,a,input,textarea,select');if(!items?.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};window.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=overflow;window.removeEventListener('keydown',key);if(previousFocus?.isConnected)previousFocus.focus();};
  },[openDish]);
  const update = <K extends keyof State>(key: K, value: State[K]) =>
    setS(v => reconcileState({...v, [key]: value}, dishes));
  useEffect(() => { if (!newTimelineLabel) setNewTimelineTime(s.time); }, [s.time]);
  useEffect(() => {
    setS(v => ({...v, drafts: {...v.drafts, recipe: {customName, customGroup, customMinutes, serves: customServes, customIngredients, customTags, customKid, oven: customOven, temp: customTemp, cost: customCost, ahead: customAhead, instructions: customInstructions, replacement: recipeReplacement, image: customImage, sourceUrl: customSource, customWhole, customPrepMinutes, customRestMinutes, customStages}}}));
  }, [customName, customGroup, customMinutes, customServes, customIngredients, customTags, customKid, customOven, customTemp, customCost, customAhead, customInstructions, recipeReplacement, customImage, customSource, customWhole, customPrepMinutes, customRestMinutes, customStages]);
  useEffect(()=>{setS(v=>({...v,drafts:{...v.drafts,forms:{newGuest,manualItemName,manualItemQty,manualItemUnit,manualItemCategory,newPrepTask,newTimelineLabel}}}));},[newGuest,manualItemName,manualItemQty,manualItemUnit,manualItemCategory,newPrepTask,newTimelineLabel]);
  const allDishes = [...dishes, ...s.customRecipes];
  const plan = derivePlan(s, allDishes);
  const { selected, guestProvidedSelected, hostPrepared, purchasedDishes, planningCount, kids, adults, foodGuests, adultDrinkers, planningGuests, expectedCount, confirmedCount, listDrivenHeadcount, bird, turkeyActive, thawText, dinner, schedule, tableSeats, mainTableCount, kidsTableCount, linenCount, mainTableGuests, kidsAtOwnTable, chairNeed, inventoryRows, estimates, estimated, planned, actual, shoppingEntries, seats, warnings: engineWarnings } = plan;
  const planRef = useRef(plan); planRef.current=plan;
  useEffect(()=>{const ctx=(document as any).modelContext;if(!ctx?.registerTool)return;const controller=new AbortController();try{Promise.resolve(ctx.registerTool({name:'read_thanksgiving_plan',description:'Read the current derived planning totals and unresolved warnings. Does not change the plan.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:(input:unknown)=>{if(input&&typeof input==='object'&&Object.keys(input).length)throw new Error('No parameters accepted');const p=planRef.current;return {headcount:p.planningCount,adults:p.adults,children:p.kids,adultDrinkers:p.adultDrinkers,shoppingItems:p.shoppingEntries.length,plannedCost:p.planned,warnings:p.warnings};}},{signal:controller.signal})).catch(()=>{});}catch{}return()=>controller.abort();},[]);
  const thanksgiving = new Date((s.eventDate||nextThanksgiving()) + 'T12:00:00');
  const ownerLabel = (d: Dish) => { const owner = responsibility(s,d).owner; return owner === 'Host' ? 'Host' : owner === 'Other' ? 'Someone else' : s.guests.find(g=>g.guestId === owner)?.name || 'Missing guest'; };
  const setResponsibility = (id: string, patch: Partial<State['menuPlan'][string]>) => setS(v=>reconcileState({...v,menuPlan:{...v.menuPlan,[id]:{...responsibility(v,{id} as Dish),...patch}}},dishes));
  const sourceRecipes = allDishes.filter(d=>d.recipeVerified);
  const shoppingQty = (key: string, automatic: number) => {
    const o=s.shoppingOverrides[key]; return Math.max(0,o ? o.mode === 'locked' ? o.value : automatic+o.value : automatic);
  };
  const adjustShoppingQty = (key: string, automatic: number, delta: number) => {
    const o=s.shoppingOverrides[key]; const next=Math.max(0,Math.round((shoppingQty(key,automatic)+delta)*100)/100);
    update('shoppingOverrides',{...s.shoppingOverrides,[key]:{mode:o?.mode || 'adjustment',value:o?.mode === 'locked' ? next : next-automatic}});
  };
  const addManualShoppingItem = () => {
    if (!manualItemName.trim()) return;
    const item: CustomShoppingItem = {
      id: uid('shopping'),
      name: manualItemName.trim(),
      quantity: Math.max(0.1, Number(manualItemQty) || 1),
      unit: manualItemUnit.trim() || 'each',
      category: manualItemCategory || 'Custom',
    };
    update('customShoppingItems', [...(s.customShoppingItems || []), item]);
    setManualItemName('');
    setManualItemQty('1');
    setManualItemUnit('each');
  };
  const addEquipmentToShopping = (name:string) => {
    if(!shoppingEntries.some(i=>i.name.toLowerCase()===name.toLowerCase())) update('customShoppingItems',[...s.customShoppingItems,{id:uid('equipment'),name,quantity:1,unit:'each',category:'Equipment'}]);
  };
  const addCustomPrepTask = () => {
    if (!newPrepTask.trim()) return;
    update('customPrepTasks', [
      ...(s.customPrepTasks || []),
      {
        id: uid('prep'),
        label: newPrepTask.trim(),
        phase: newPrepPhase,
      },
    ]);
    setNewPrepTask('');
  };
  const addCustomTimelineItem = () => {
    if (!newTimelineLabel.trim()) return;
    update('customTimelineItems', [
      ...(s.customTimelineItems || []),
      {
        id: uid('timeline'),
        label: newTimelineLabel.trim(),
        time: newTimelineTime || s.time,
        category: newTimelineCategory,
      },
    ]);
    setNewTimelineLabel('');
  };
  const removeGuest = (index: number) => setS(v=>reconcileState({...v,guests:v.guests.filter((_,i)=>i!==index)}, dishes));
  const toggleActivity = (name: string) => {
    if (name === 'No activity needed') {
      setS(v => ({ ...v, activities: [], experience: 'No activity needed' }));
      return;
    }
    const current = s.activities || [];
    const next = current.includes(name)
      ? current.filter(x => x !== name)
      : [...current, name];
    setS(v => ({
      ...v,
      activities: next,
      experience: next[0] || 'No activity needed',
    }));
  };
  const uncoveredDiets = s.guests.filter(g=>g.rsvp!=='Declined').flatMap(g=>{
    const needs=[...g.diet.split(/[,;\/]+/).map(x=>x.trim()).filter(Boolean),...g.dietaryNeeds];
    if(!needs.length)return[];
    const tags=[...new Set(needs.map(dietTagForNeed).filter(Boolean))];
    return needs.some(n=>!dietTagForNeed(n)) || !completeMealCoverage(tags,selected,tagsForDish)
      ? [g.name || 'Unnamed guest'] : [];
  });
  const planGaps: string[] = [];
  if (!selected.some(d => d.group === 'Main')) planGaps.push('Add a main dish');
  if (selected.filter(d => d.group === 'Starch').length < 2) {
    planGaps.push('Add another comforting side');
  }
  if (!selected.some(d => d.group === 'Fresh')) {
    planGaps.push('Add a vegetable or fresh side');
  }
  if (!selected.some(d => d.group === 'Sauce')) {
    planGaps.push('Add gravy or cranberry sauce');
  }
  if (!selected.some(d => d.group === 'Appetizer')) {
    planGaps.push('Add an appetizer');
  }
  if (!selected.some(d => d.group === 'Dessert')) {
    planGaps.push('Add a dessert');
  }
  if (!selected.some(d => d.group === 'Drink · Nonalcoholic')) {
    planGaps.push('Add water or another nonalcoholic drink');
  }
  if (s.drink !== 'No-alcohol-forward' && adults > 0 && !selected.some(d => d.group === 'Drink · Alcoholic')) {
    planGaps.push('Add the adult drink plan');
  }
  if (kids > 0 && !selected.some(d => d.group === 'Drink · Kids')) {
    planGaps.push('Add a kids’ drink');
  }
  if (kids > 0 && !selected.some(isKidDish)) {
    planGaps.push('Add at least one kid-friendly option');
  }
  [...new Set(uncoveredDiets)].forEach(name => planGaps.push(`Review a complete compatible meal for ${name}; verify ingredients and cross-contact directly.`));
  const prepAheadDishes = hostPrepared.filter(
    d => d.makeAhead && !/set your make-ahead plan/i.test(d.makeAhead)
  );
  const finalHourDishes = hostPrepared.filter(
    d =>
      d.group === 'Fresh' ||
      d.group === 'Sauce' ||
      d.group === 'Bread' ||
      d.id === 'turkey' ||
      d.id === 'ba-dry-turkey'
  );
  const planningLabel =
    s.planningMode === 'Expected'
      ? `Expected · ${expectedCount}`
      : s.planningMode === 'Confirmed'
        ? `Confirmed · ${confirmedCount}`
        : s.planningMode === 'Custom'
          ? `Custom · ${planningCount}`
          : `Estimated · ${s.count}`;
  const activeActivities = s.activities || [];
  const roomZones = [
    'Dining + serving',
    `${s.drink} drinks station`,
    'Dessert + coffee station',
    ...(activeActivities.length > 0 ? ['Activity area'] : []),
    ...(kids > 0 ? ['Kids area'] : []),
    'Coat + bag drop',
  ];
  const printableCards = selectPrintableCards(s,plan,tagsForDish);
  const warnings = [...engineWarnings, ...timelineWarnings(s,plan), ...(planningCount ? planGaps : [])];
  const checked = (key: string) => s.done.includes(key);
  const toggleDone = (key: string) =>
    update(
      'done',
      checked(key) ? s.done.filter(x => x !== key) : [...s.done, key]
    );
  const toggleSelection = (id: string) => setS(v=>{
    const removing=v.selections.includes(id); const menuPlan={...v.menuPlan};
    if(removing) delete menuPlan[id]; else if(!menuPlan[id]) menuPlan[id]={owner:'Host',status:'Confirmed',preparation:(/purchased|outsourc/i.test(v.cook))?'Purchased':'Homemade'};
    return reconcileState({...v,menuPlan,selections:removing?v.selections.filter(x=>x!==id):[...v.selections,id]},dishes);
  });
  const recipeMenuAction = (d:Dish, compact = false) => <div className="recipe-selection" data-included={s.selections.includes(d.id)}>{s.selections.includes(d.id) ? <>{!compact && <span className="recipe-added" role="status"><Check size={16}/> In your menu</span>}<button className="recipe-remove-button" aria-label="Remove from menu" onClick={()=>toggleSelection(d.id)}>{compact ? 'Remove' : 'Remove from menu'}</button></> : <button className="recipe-add-button" onClick={()=>toggleSelection(d.id)}><Plus size={17}/> Add to menu</button>}</div>;
  const navigate = (t: string, section?: string) => {
    if(t !== 'HOME') setPrimarySection(section || (primaryDestinations.find(g => g.label === primarySection && g.items.some(i => i.tab === t)) || primaryDestinations.find(g => g.items.some(i => i.tab === t)))?.label || 'PLAN');
    const nextHash='#'+t.toLowerCase().replace(/ /g,'-');
    if(window.location.hash!==nextHash)window.history.pushState(null,'',nextHash);
    setTab(t);
    if(t==='MENU'||t==='PLAN MENU'){setOpenDish(null);setMenuCategory('All');}
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const editFullRecipe = (d:Dish) => {
    const baseServings=Math.max(1,d.serves || planningCount);
    setOpenDish(null);setShowRecipeForm(true);setRecipeReplacement(d.id);setCustomName(d.name);setCustomWhole(d.batchMode==='whole');setCustomPrepMinutes(String(d.prepMinutes||0));setCustomRestMinutes(String(d.restMinutes||0));setCustomStages(d.ovenStages||[]);
    setCustomIngredients(d.ingredients.map(([name,n,unit,cat])=>`${name} | ${Number((n*baseServings).toFixed(4))} | ${unit} | ${cat}`).join('\n'));
    setCustomServes(String(baseServings));setCustomMinutes(String(d.minutes));setCustomOven(String(d.oven));setCustomTemp(String(d.temp));setCustomAhead(d.makeAhead);setCustomGroup(d.group);setCustomInstructions(d.instructions||'');setCustomCost(String(Number((d.cost*baseServings/18).toFixed(2))));setCustomImage(d.image || dishThumb[d.id] || asset.tableLight);setCustomSource(d.sourceUrl||'');setCustomTags(d.tags||[]);setCustomKid(Boolean(d.kidFriendly));setMenuView('plan');
    navigate('MENU','PLAN MENU');
  };
  const WorkflowNav = () => {
    const index = planningSteps.findIndex(step=>step.tab===tab);
    const step = planningSteps[index];
    const extra = extraTools.find(tool=>tool.tab===tab);
    const next = index>=0 ? planningSteps[index+1] : planningSteps.find(step=>step.tab===extra?.returnTab);
    return <section className="section-navigation guided-workflow" aria-label="Planning guide">
      <div className="guided-step-copy"><span className="guided-step-label">{step ? `STEP ${index+1} / ${planningSteps.length}` : 'MORE TO PLAN'}</span></div>
      {next && <button className="guided-next" onClick={()=>{navigate(next.tab,next.group);if(next.tab==='MENU')setMenuView('plan');}}>{step ? 'Next: ' : 'Return to '}{next.label} <span aria-hidden="true">→</span></button>}
    </section>;
  };
  const Section = ({
    eyebrow,
    title,
    children,
    aside,
    compact = false,
  }: {
    eyebrow: string;
    title: string;
    children: React.ReactNode;
    aside?: React.ReactNode;
    compact?: boolean;
  }) => (
    <>
    <div className="page-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {compact ? <p>{children}</p> : <details className="page-guide"><summary>Guide</summary><p>{children}</p></details>}
      </div>
      {aside}
    </div>
    {['SHOPPING','PREP','TIMELINE','BUDGET'].includes(tab) && plan.incompleteRecipes.length>0 && <div className="recipe-integrity-notice" role="status"><b>{plan.incompleteRecipes.length} homemade dishes need complete recipes</b><p>Shopping, budget and cooking schedules exclude these dishes: {plan.incompleteRecipes.map(d=>d.name).join(' · ')}.</p><button onClick={()=>navigate('MENU')}>REVIEW MENU</button></div>}
    {(tab==='TIMELINE' || tab==='PREP') && warnings.length>0 && <details className="warning-summary"><summary>{warnings.length} planning items to review</summary>{warnings.map((w,i)=><p key={i}>{w}</p>)}</details>}
    {tab==='BUDGET' && plan.unpricedRecipes.length>0 && <details className="recipe-integrity-notice" role="status"><summary>Ingredient prices needed · {plan.unpricedRecipes.length} recipes</summary><p>Enter unit prices below for {plan.unpricedRecipes.map(d=>d.name).join(' · ')}. These recipes currently contribute no assumed ingredient prices.</p></details>}
    </>
  );
  const SectionImage = ({
    image,
    alt,
    eyebrow,
    caption,
    position = 'center',
  }: {
    image: string;
    alt: string;
    eyebrow: string;
    caption: string;
    position?: string;
  }) => (
    <figure className="section-image">
      <img src={image} alt={alt} loading="lazy" style={{ objectPosition: position }} />
      <figcaption>
        <span className="eyebrow">{eyebrow}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
  const CheckRow = ({
    id,
    children,
    note,
  }: {
    id: string;
    children: React.ReactNode;
    note?: string;
  }) => (
    <button
      className={`check-row ${checked(id) ? 'completed' : ''}`}
      onClick={() => toggleDone(id)}
    >
      <span className="check-circle">{checked(id) && <Check size={13} />}</span>
      <span>
        {children}
        {note && <small>{note}</small>}
      </span>
    </button>
  );
  const input = (
    label: string,
    value: string | number,
    onChange: (v: string) => void,
    type = 'text'
  ) => (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
  const select = (
    label: string,
    value: string,
    options: string[],
    onChange: (v: string) => void
  ) => (
    <label className="field">
      <span>{label}</span>
      <span className="select-wrap">
        <select value={value} onChange={e => onChange(e.target.value)}>
          {options.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={15} />
      </span>
    </label>
  );

  return (
    <div className={`shell reference-shell ${tab !== 'HOME' || s.dayMode ? 'planning-active' : ''} page-${tab.toLowerCase().replace(/ /g, "-")}`}>
      <aside className={`sidebar ${mobileNav ? 'show' : ''}`} inert={!mobileNav} aria-hidden={!mobileNav}>
        <button className="brand" onClick={() => navigate('HOME')}>
C | C
        </button>
        <button
          className="sidebar-close"
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        >
          <X size={20} />
        </button>
        <nav aria-label="App navigation">
          <button className={tab === 'HOME' ? 'active nav-home' : 'nav-home'} onClick={() => navigate('HOME')}>HOME</button>
          <div className="nav-group"><p className="drawer-heading">PLAN IN ORDER</p><div className="drawer-subnav">{planningSteps.map((step,index)=><button key={step.tab} className={tab===step.tab?'active':''} aria-current={tab===step.tab?'page':undefined} onClick={()=>navigate(step.tab,step.group)}><span className="nav-index">{index+1}</span>{step.label}</button>)}</div></div>
          <div className="nav-group"><p className="drawer-heading">MORE TO PLAN</p><div className="drawer-subnav">{extraTools.map(tool=><button key={tool.tab} className={tab===tool.tab?'active':''} onClick={()=>navigate(tool.tab,tool.group)}>{tool.label}</button>)}</div></div>
          {(tab !== 'HOME' || s.dayMode) && <button className="drawer-day-mode" onClick={()=>{update('dayMode',!s.dayMode);setMobileNav(false);}}>{s.dayMode ? 'EXIT DAY MODE' : 'PARTY-DAY MODE'}</button>}
        </nav>
        <div className="sidebar-foot">
          {tab === 'HOME' && !s.dayMode ? <>THANKSGIVING<br />THE EDIT<br /><span>ALREADY FIGURED OUT.</span></> : <span>THANKSGIVING AT HOME</span>}
        </div>
      </aside>
      {mobileNav && (
        <button
          className="nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}
      {openDish && (()=>{const d=allDishes.find(x=>x.id===openDish);if(!d)return null;const included=s.selections.includes(d.id);return <div className="recipe-overlay" onClick={()=>setOpenDish(null)}><section className="recipe-sheet glass-light" role="dialog" aria-modal="true" aria-labelledby="recipe-reader-title" onClick={e=>e.stopPropagation()}>
        <header className="recipe-reader-header"><span>{included?'IN YOUR PLAN':'RECIPE PREVIEW · NOT IN YOUR PLAN'}</span><button aria-label="Close recipe" onClick={()=>setOpenDish(null)}><X size={22}/></button></header>
        <div className="recipe-reader-intro"><img src={d.image||dishThumb[d.id]||asset.tableLight} alt={d.name}/><div><span className="eyebrow">{d.group}</span><h2 id="recipe-reader-title">{d.name}</h2><dl className="recipe-facts"><div><dt>{included?'Planned portions':'Base servings'}</dt><dd>{included?qty(dishPortions(s,d)):d.serves||'—'}</dd></div><div><dt>Original yield</dt><dd>{d.sourceYield || (d.serves ? `${d.serves} servings` : 'Not recorded')}</dd></div><div><dt>Recipe time</dt><dd>{d.minutes} min</dd></div>{Boolean(d.oven)&&<div><dt>Oven</dt><dd>{d.temp}°F</dd></div>}</dl>{d.rating&&<p>{d.rating} · checked October 6, 2026</p>}<p className="recipe-source-label">{d.sourceUrl ? <a href={d.sourceUrl} target="_blank" rel="noreferrer">{d.source || 'Original recipe'} · View source →</a> : d.servingPlan ? 'Serving plan · package directions apply' : recipeReady(d) ? 'Your saved recipe' : 'Incomplete recipe'}</p><div className="recipe-reader-actions"><button className="recipe-plan-action" onClick={()=>toggleSelection(d.id)}>{included?'Remove from menu':'Add to menu'}</button><button className="recipe-edit-action" onClick={()=>editFullRecipe(d)}>EDIT RECIPE</button></div></div></div>
        <div className="recipe-reader-columns"><section className="recipe-ingredient-section"><div className="recipe-section-heading"><span>01</span><h3>Ingredients</h3></div><p className="recipe-scale-note">{included ? d.batchMode ? `${formatRecipeAmount(recipeQuantityServings(s,d)/(d.serves||1))} ${recipeQuantityServings(s,d)<=(d.serves||1)?'batch':'batches'} · capacity ${formatRecipeAmount(recipeQuantityServings(s,d))} servings for ${qty(dishPortions(s,d))} planned portions.` : `Amounts scaled to ${qty(dishPortions(s,d))} planned portions.` : 'Amounts for one original batch.'}</p>{!recipeReady(d)&&<p className="recipe-incomplete-note">Recipe incomplete. These quantities are not used in shopping.</p>}<ul className="reader-ingredients">{d.ingredients.map(([name,n,unit],i)=><li key={name+unit+i}><span>{name}{d.ingredientNotes?.[name]&&<small style={{display:'block'}}>{d.ingredientNotes[name]}</small>}</span><b>{formatRecipeAmount(included?recipeIngredientQuantity(s,d,name,n):n*(d.serves||1))} {unit}</b></li>)}</ul>{Boolean(d.pantryChecks?.length)&&<div className="recipe-seasoning"><b>Check pantry / supplies</b><ul>{d.pantryChecks!.map(item=><li key={item}>{item} · to taste or as needed</li>)}</ul><p>These checks also appear in Shopping; no guessed quantity is added.</p></div>}{d.seasoning&&<p className="recipe-seasoning">{d.seasoning}</p>}<details className="recipe-scaling-details"><summary>Quantity details</summary><p>{d.recipeVerified?'Source-checked quantities.':recipeReady(d)?'Saved quantities.':'Incomplete outline.'} Base yield: {d.sourceYield||d.serves||'not saved'}. {d.batchMode==='whole'?'Whole batches are rounded up.':d.batchMode==='half'?'Use half or full batches; eggs are rounded up as specified by the source.':''} {included?`Shopping: ${preparation(s,d)}.`:'Preview only — nothing added to shopping.'}</p></details></section>
        <section className="recipe-method-section"><div className="recipe-section-heading"><span>02</span><h3>Method</h3></div>{d.recipeVerified&&<p className="recipe-scale-note">Cooking steps adapted from the linked source. Quantities above are planned totals; divide them among source-size batches. Cooking and cooling times stay the same per batch. {d.sourceUrl&&<a href={d.sourceUrl} target="_blank" rel="noreferrer">Read the publisher’s recipe →</a>}</p>}{d.instructions?.trim()?<ol className="reader-method">{d.instructions.split(/\n+/).filter(Boolean).map((step,i)=><li key={i}><span>{step.replace(/^\s*\d+[.)]\s+/, '')}</span></li>)}</ol>:<div className="recipe-source-note"><p>{d.sourceUrl?'This record contains planning quantities and notes. Use the original recipe for the complete cooking method.':'A complete cooking method has not been saved for this dish.'}</p>{d.sourceUrl&&<a href={d.sourceUrl} target="_blank" rel="noreferrer">OPEN ORIGINAL RECIPE →</a>}<button onClick={()=>editFullRecipe(d)}>COMPLETE THIS RECIPE</button></div>}</section></div>
        {(d.makeAhead||d.finish||d.vessel)&&<div className="recipe-finishing-notes">{d.makeAhead&&<section><div className="recipe-section-heading"><span>03</span><h3>Make ahead</h3></div><p>{d.makeAhead}</p></section>}{(d.finish||d.vessel)&&<section><div className="recipe-section-heading"><span>04</span><h3>Serving</h3></div>{d.finish&&<p>{d.finish}</p>}{d.vessel&&<p className="recipe-vessel">{d.vessel}</p>}</section>}</div>}
        {d.sourceUrl&&d.instructions?.trim()&&<footer className="recipe-reader-footer"><a href={d.sourceUrl} target="_blank" rel="noreferrer">OPEN ORIGINAL RECIPE →</a></footer>}
      </section></div>})()}
      <main className="main" inert={mobileNav || Boolean(openDish)}>
        {(tab !== 'HOME' || s.dayMode) && <div className="planning-backdrop" aria-hidden="true"><img src="/resources/kitchen-editorial.png" alt="" /><div /></div>}
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="Open navigation" aria-expanded={mobileNav}
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <X size={22} /> : <span className="menu-lines" aria-hidden="true" />}<span>MENU</span>
          </button>
          <button className="header-monogram" aria-label="Crow and Crown home" onClick={() => navigate('HOME')}>C | C</button>
          <div className="top-actions">
            {onAccount && <button className="account-control" onClick={onAccount} aria-label="Account and saved parties">ACCOUNT</button>}
            {tab === 'HOME' && !s.dayMode && <button
              onClick={() => update('dayMode', !s.dayMode)}
              className={s.dayMode ? 'mode active' : 'mode'}
            >
              {s.dayMode ? 'EXIT DAY MODE' : 'PARTY-DAY MODE'}
            </button>}
            
          </div>
        </header>
        {storageError && <div role="alert" className="alert">{storageError}</div>}
        {!s.dayMode && tab !== 'HOME' && <WorkflowNav />}
        {s.dayMode && warnings.length>0 && <details className="warning-summary"><summary>{warnings.length} planning items to review</summary>{warnings.map((w,i)=><p key={i}>{w}</p>)}</details>}
        {s.dayMode ? (
          <div className="day-page">
            <span className="eyebrow">{thanksgiving.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</span>
            <h1>Today, you host.</h1>
            <p className="lede">
              Dinner at {clock(dinner)}. Only what matters now.
            </p>
            {turkeyActive && s.frozen && !checked('thaw') && (
              <div className="alert">
                TURKEY CHECK · Confirm it is completely thawed before cooking.{' '}
                <button onClick={() => toggleDone('thaw')}>MARK DONE</button>
              </div>
            )}
            {[...timelineItems()].map(([time, label, id]) => (
              <button
                key={id}
                className={`day-task ${checked(id) ? 'completed' : ''}`}
                onClick={() => toggleDone(id)}
              >
                <b>{clock(time)}{time<0?' · DAY BEFORE':''}</b>
                <span>{label}</span>
                <span className="check-circle">
                  {checked(id) && <Check size={18} />}
                </span>
              </button>
            ))}
            <div className="day-actions">
              <button
                onClick={() => {
                  update('dayMode', false);
                  navigate('PREP');
                }}
              >
                OPEN PREP + OVEN
              </button>
              <button
                onClick={() => {
                  update('dayMode', false);
                  navigate('TIMELINE');
                }}
              >
                FULL TIMELINE
              </button>
            </div>
          </div>
        ) : (
          <>
            {tab === 'HOME' && (
              <section className="hosting-canvas" aria-label="Your Thanksgiving gathering">
                <img className="hosting-photo" src="/resources/kitchen-editorial.png" alt="Organic modern kitchen with neutral marble, black cabinetry and natural daylight" />
                <div className="hosting-shade" />
                <div className="hosting-title">
                  <span className="eyebrow">AT HOME / CROW & CROWN</span>
                  <h1>THANKSGIVING</h1>
                  <p className="hosting-counts">{expectedCount} EXPECTED <span>·</span> {confirmedCount} CONFIRMED <span>·</span> {selected.length} DISHES</p>
                </div>
                <nav className="hosting-navigation" aria-label="Start planning">
                  {primaryDestinations.map((group,index) => <button key={group.label} onClick={() => navigate(group.tab,group.label)}><small>{String(index+1).padStart(2,'0')}</small><span>{group.label}</span></button>)}
                </nav>
                <div className="hosting-footer"><span>{thanksgiving.toLocaleDateString('en-US',{month:'long',day:'numeric'})} · DINNER {clock(dinner)}</span><span>PLAN FOR {planningCount}</span></div>
              </section>
            )}
            {tab === 'PARTY PLAN' && (
              <div className="content party-setup">
                <Section eyebrow="01 / START" title="Party plan">Set the date, dinner time and your starting guest count.</Section>
                <section className="panel glass-light setup-essentials" aria-label="Party basics">
                  <div className="form-grid">
                    {input('Date',s.eventDate,v=>update('eventDate',v),'date')}
                    {input('Dinner time',s.time,v=>update('time',v),'time')}
                    {input('Estimated guests',s.count,v=>update('count',Math.max(0,Number(v)||0)),'number')}
                    {input('Location',s.location,v=>update('location',v))}
                  </div>
                  <p className="setup-note">Start with an estimate. You can use your guest list for quantities once names and RSVPs are added.</p>
                </section>
                <details className="panel setup-details"><summary>Guest counts + drinks</summary>
                  <p>Expected includes Attending + Pending. Confirmed includes only Attending. Custom uses your own number.</p>
                  <div className="form-grid">
                    {select('Plan quantities for',s.planningMode,['Estimated','Expected','Confirmed','Custom'],v=>update('planningMode',v as PlanningMode))}
                    {s.planningMode==='Custom'&&input('Custom headcount',s.customHeadcount,v=>update('customHeadcount',Math.max(0,Number(v)||0)),'number')}
                    {!listDrivenHeadcount&&input('Children',kids,v=>update(s.planningMode==='Custom'?'customKids':'kids',Math.min(planningCount,Math.max(0,Number(v)||0))),'number')}
                    {!listDrivenHeadcount&&input('Adults drinking alcohol',adultDrinkers,v=>update(s.planningMode==='Custom'?'customDrinkers':'estimatedDrinkers',Math.min(adults,Math.max(0,Number(v)||0))),'number')}
                    {!listDrivenHeadcount&&input('Children’s drink',s.childDrink,v=>update('childDrink',v))}
                  </div>
                  <p className="setup-note">Currently planning quantities for {planningCount} people · {s.planningMode.toLowerCase()}.</p>
                </details>
                <details className="panel setup-details"><summary>Service + budget</summary><div className="form-grid">
                  {select('Service',s.service,['Buffet','Seated dinner','Cocktail-style'],v=>update('service',v))}
                  {select('Default for newly added dishes',s.cook,['Mostly homemade','A balanced mix','Mostly prepared'],v=>update('cook',v))}
                  {input('Total budget',s.budget,v=>update('budget',Math.max(0,Number(v)||0)),'number')}
                </div></details>
                <details className="panel setup-details"><summary>Kitchen + space</summary><div className="form-grid">
                  {input('Ovens',s.ovens,v=>update('ovens',Math.max(1,Number(v)||1)),'number')}
                  {input('Usable oven racks',s.racks,v=>update('racks',Math.max(1,Number(v)||1)),'number')}
                  {select('Fridge / freezer space',s.fridge,['Generous','Moderate','Limited'],v=>update('fridge',v))}
                  {select('Setting',s.outdoor?'Indoor / outdoor':'Indoor',['Indoor','Indoor / outdoor'],v=>update('outdoor',v==='Indoor / outdoor'))}
                </div>{s.fridge==='Limited'&&<p className="setup-note">Clear cold storage for turkey and prepared dishes before shopping.</p>}</details>
                <details className="panel setup-details"><summary>Notes</summary><label className="field"><span>Party notes</span><textarea value={s.notes} onChange={e=>update('notes',e.target.value)} placeholder="Anything to remember"/></label></details>
              </div>
            )}

            {(tab === 'MENU' || tab === 'PLAN MENU') && (
              <div className="content reference-menu menu-studio">
                <div className="menu-intro">
                  <Section compact eyebrow={menuView==='plan'?"03 / MENU":"03 / ALL RECIPES"} title={menuView==='plan'?"YOUR MENU":"PLAN MENU"}>
                    {menuView==='plan'?`${selected.length} dishes in your plan · quantities for ${planningCount}`:`${allDishes.length} dishes to explore · ${selected.length} in your menu`}
                  </Section>
                  <div className="kitchen-reference" role="img" aria-label="Neutral marble kitchen with dark cabinets and natural daylight" />

                </div>
                <div className="menu-actions">
                  {menuView==='plan' ? <button className="add-dish-action" onClick={()=>{setMenuView('browse');setMenuCategory('All');setShowRecipeForm(false);}}><Plus size={18}/> ADD A DISH</button> : <button className="add-dish-action" onClick={()=>setMenuView('plan')}>VIEW YOUR MENU · {selected.length} DISHES</button>}
                  <button
                    className="add-recipe-button"
                    onClick={() => {if(!showRecipeForm&&!customName)setCustomServes(String(Math.max(1,planningCount)));setShowRecipeForm(v=>!v);}}
                  >
                    <Plus size={15} />
                    {showRecipeForm ? 'CLOSE RECIPE EDITOR' : recipeReplacement ? 'CONTINUE RECIPE EDIT' : 'ADD YOUR OWN RECIPE'}
                  </button>
                </div>
                {showRecipeForm && (
                  <div className="custom-recipe-form input-panel">
                    <span className="input-kicker">YOUR INPUT</span>
                    <div className="form-grid">
                      <label className="field">
                        <span>Recipe name</span>
                        <input
                          value={customName}
                          onChange={e => setCustomName(e.target.value)}
                          placeholder="Grandma’s cornbread dressing"
                        />
                      </label>
                      <label className="field">
                        <span>Type</span>
                        <select
                          value={customGroup}
                          onChange={e => setCustomGroup(e.target.value)}
                        >
                          <option>Main</option>
                          <option>Starch</option>
                          <option>Fresh</option>
                          <option>Bread</option>
                          <option>Appetizer</option>
                          <option>Sauce</option>
                          <option>Dessert</option>
                          <option>Drink · Nonalcoholic</option>
                          <option>Drink · Alcoholic</option>
                          <option>Drink · Kids</option>
                          <option>Drink · After dinner</option>
                        </select>
                      </label>
                      <label className="field">
                        <span>Cook / prep minutes</span>
                        <input
                          type="number"
                          min="0"
                          value={customMinutes}
                          onChange={e => setCustomMinutes(e.target.value)}
                        />
                      </label>
                      <label className="field">
                        <span>Recipe serves</span>
                        <input
                          type="number"
                          min="1"
                          value={customServes}
                          onChange={e => setCustomServes(e.target.value)}
                        />
                      </label>
                      <div className="recipe-ingredients-input ingredient-editor"><h3>Ingredients + measurements</h3>{recipeIngredientRows.map((row:string[],i:number)=><div className="ingredient-editor-row" key={i}>
                        <label className="field"><span>Ingredient</span><input aria-label={`Ingredient ${i+1} name`} value={row[0]} onChange={e=>changeRecipeIngredient(i,0,e.target.value)}/></label>
                        <label className="field"><span>Amount</span><input aria-label={`Ingredient ${i+1} amount`} type="number" min="0" step="any" value={row[1]} onChange={e=>changeRecipeIngredient(i,1,e.target.value)}/></label>
                        <label className="field"><span>Unit</span><input aria-label={`Ingredient ${i+1} unit`} placeholder="cups, lb, each" value={row[2]} onChange={e=>changeRecipeIngredient(i,2,e.target.value)}/></label>
                        <label className="field"><span>Aisle</span><select aria-label={`Ingredient ${i+1} category`} value={row[3]} onChange={e=>changeRecipeIngredient(i,3,e.target.value)}>{['Pantry','Produce','Meat','Dairy','Bakery','Frozen','Beverages','Custom'].map(cat=><option key={cat}>{cat}</option>)}</select></label>
                        <button aria-label={`Remove ingredient ${i+1}`} onClick={()=>setCustomIngredients(recipeIngredientRows.filter((_:string[],j:number)=>j!==i).map((r:string[])=>r.join(' | ')).join('\n'))}><X size={16}/></button>
                      </div>)}<button className="text-link" onClick={()=>setCustomIngredients([...recipeIngredientRows,['','','','Pantry']].map(r=>r.join(' | ')).join('\n'))}>ADD INGREDIENT +</button></div>
                    </div>
                    <div className="form-grid">
                      <label className="field"><span>Oven minutes</span><input type="number" min="0" value={customOven} onChange={e=>setCustomOven(e.target.value)}/></label>
                      <label className="field"><span>Oven temperature °F</span><input type="number" min="0" value={customTemp} onChange={e=>setCustomTemp(e.target.value)}/></label>
                      <label className="field"><span>Cost for the whole recipe</span><input type="number" min="0" value={customCost} onChange={e=>setCustomCost(e.target.value)}/></label>
                      <label className="field"><span>Make-ahead instructions</span><input value={customAhead} onChange={e=>setCustomAhead(e.target.value)}/></label>
                    </div>
                    <label className="field"><span>Preparation minutes</span><input aria-label="Preparation minutes" type="number" min="0" value={customPrepMinutes} onChange={e=>setCustomPrepMinutes(e.target.value)}/></label>
                    <label className="field"><span>Cooling / resting minutes</span><input aria-label="Cooling / resting minutes" type="number" min="0" value={customRestMinutes} onChange={e=>setCustomRestMinutes(e.target.value)}/></label>
                    <label className="recipe-batch-field"><input type="checkbox" checked={customWhole} onChange={e=>setCustomWhole(e.target.checked)}/> Make whole batches · pies, whole birds, fixed-size pans</label>
                    <section className="recipe-stage-editor"><h3>Oven stages</h3><p className="fine">Enter each temperature and duration in cooking order. Stages feed the oven schedule; time between stages covers cooling or assembly.</p>{customStages.map((stage,i)=><div className="form-grid" key={i}>{(['label','minutes','temp','waitBefore'] as const).map(key=><label className="field" key={key}><span>{key==='label'?'Stage':key==='minutes'?'Oven minutes':key==='temp'?'Temperature °F':'Wait before this stage (minutes)'}</span><input aria-label={`Stage ${i+1} ${key}`} type={key==='label'?'text':'number'} min="0" value={stage[key]||''} onChange={e=>setCustomStages(v=>v.map((x,j)=>j===i?{...x,[key]:key==='label'?e.target.value:Number(e.target.value)}:x))}/></label>)}<button onClick={()=>setCustomStages(v=>v.filter((_,j)=>j!==i))}>REMOVE STAGE</button></div>)}<button className="text-link" onClick={()=>setCustomStages(v=>[...v,{label:'',minutes:0,temp:350}])}>ADD OVEN STAGE +</button></section>
                    <label className="field"><span>Original recipe link (optional)</span><input aria-label="Original recipe link" type="url" value={customSource} onChange={e=>setCustomSource(e.target.value)}/></label>
                    <label className="field recipe-method-input"><span>Full recipe instructions</span><textarea aria-label="Full recipe instructions" value={customInstructions} onChange={e=>setCustomInstructions(e.target.value)} placeholder="Enter the full method, one step per line." /></label>
                    <p className="fine">Enter ingredients for the recipe’s base servings. Quantities scale with your planning headcount. Your draft saves on this device.</p>
                    {recipeError && <p role="alert">{recipeError}</p>}
                    <div className="custom-recipe-options">
                      <span>Dietary fit</span>
                      <div className="tag-picker">
                        {[
                          'Vegetarian',
                          'Vegan',
                          'Gluten-Free',
                          'Dairy-Free',
                          'Nut-Free',
                          'Egg-Free',
                          'Soy-Free',
                          'Sesame-Free',
                          'Fish-Free',
                          'Shellfish-Free',
                        ].map(tag => (
                          <button
                            key={tag}
                            className={customTags.includes(tag) ? 'tag-chip active' : 'tag-chip'}
                            onClick={() =>
                              setCustomTags(v =>
                                v.includes(tag) ? v.filter(x => x !== tag) : [...v, tag]
                              )
                            }
                          >
                            {tag}
                          </button>
                        ))}
                        <button
                          className={customKid ? 'tag-chip active' : 'tag-chip'}
                          onClick={() => setCustomKid(v => !v)}
                        >
                          KID-FRIENDLY
                        </button>
                      </div>
                    </div>
                    <button
                      className="save-recipe-button"
                      onClick={() => {
                        if (!customName.trim()) {setRecipeError('Enter a recipe name.');return;}
                        if (!Number.isFinite(Number(customServes)) || Number(customServes)<=0) {setRecipeError('Enter the recipe’s exact base servings.');return;}
                        if (!customInstructions.trim()) {setRecipeError('Add the full cooking method before saving this recipe.');return;}
                        if(customStages.some(x=>!x.label.trim()||x.minutes<=0||x.temp<=0)){setRecipeError('Each oven stage needs a name, positive minutes and temperature.');return;}
                        const id = recipeReplacement?.startsWith('custom-') ? recipeReplacement : uid('custom');
                        let ingredients: Dish['ingredients'];
                        try { ingredients=parseIngredients(customIngredients.split('\n').filter((line:string)=>line.split('|').slice(0,3).some((x:string)=>x.trim())).join('\n'),Math.max(1,Number(customServes)||1));if(!ingredients.length)throw new Error('Add at least one ingredient.');setRecipeError(''); } catch(e) {setRecipeError((e as Error).message);return;}
                        const recipe: Dish = {
                          id,
                          name: customName.trim(),
                          group: customGroup,
                          style: 'custom',
                          minutes: Math.max(0, Number(customMinutes) || 0),
                          oven: customStages.length?customStages.reduce((n,x)=>n+x.minutes,0):Math.max(0,Number(customOven)||0),
                          batchMode:customWhole?'whole':allDishes.find(d=>d.id===recipeReplacement)?.batchMode==='half'?'half':undefined,ingredientSteps:allDishes.find(d=>d.id===recipeReplacement)?.ingredientSteps,prepMinutes:Math.max(0,Number(customPrepMinutes)||0),restMinutes:Math.max(0,Number(customRestMinutes)||0),ovenStages:customStages,pantryChecks:allDishes.find(d=>d.id===recipeReplacement)?.pantryChecks,ingredientNotes:allDishes.find(d=>d.id===recipeReplacement)?.ingredientNotes,prepPhases:customInstructions.trim()===allDishes.find(d=>d.id===recipeReplacement)?.instructions?.trim()&&Number(customPrepMinutes)===allDishes.find(d=>d.id===recipeReplacement)?.prepMinutes?allDishes.find(d=>d.id===recipeReplacement)?.prepPhases:undefined,advanceTasks:customInstructions.trim()===allDishes.find(d=>d.id===recipeReplacement)?.instructions?.trim()?allDishes.find(d=>d.id===recipeReplacement)?.advanceTasks:undefined,seasoning:allDishes.find(d=>d.id===recipeReplacement)?.seasoning,
                          temp: Math.max(0,Number(customTemp)||0),
                          cost: Math.max(0,Number(customCost)||0)*18/Math.max(1,Number(customServes)||1),
                          portion: `Recipe serves ${Math.max(1, Number(customServes) || Math.max(1, planningCount))}`,
                          serves: Math.max(1, Number(customServes) || Math.max(1, planningCount)),
                          vessel: 'Choose serving piece',
                          ingredients,
                          instructions: customInstructions.trim(),
                          image: customImage,
                          sourceUrl: /^https?:\/\//.test(customSource)?customSource:undefined,
                          easier: '',
                          easyCost: 0,
                          makeAhead: customAhead,
                          finish: 'Add your serving notes',
                          tags: customTags,
                          kidFriendly: customKid,
                        };
                        setS(v => reconcileState({
                          ...v,
                          customRecipes: [...(v.customRecipes || []).filter(d=>d.id!==recipeReplacement), recipe],
                          selections: [...v.selections.filter(old=>old!==recipeReplacement), id],
                          menuPlan: recipeReplacement && v.menuPlan[recipeReplacement] ? {...v.menuPlan,[id]:v.menuPlan[recipeReplacement]} : v.menuPlan,
                        },dishes));
                        setCustomName('');setCustomWhole(false);setCustomStages([]);setCustomPrepMinutes('0');setCustomRestMinutes('0');
                        setCustomIngredients('');
                        setCustomInstructions('');
                        setRecipeReplacement(null);
                        setCustomImage('');
                        setCustomSource('');
                        setMenuView('plan');
                        setCustomMinutes('30');
                        setCustomServes(String(Math.max(1, planningCount)));
                        setCustomGroup('Starch');
                        setCustomTags([]);
                        setCustomKid(false);
                        setShowRecipeForm(false);
                      }}
                    >
                      ADD RECIPE TO MENU
                    </button>
                  </div>
                )}
                {menuView === 'plan' && <div className="menu-composition">
                  <div className="menu-collection">
                    {s.selections.some(id=>allDishes.some(d=>d.id===id&&d.group==='Drink · Alcoholic')&&!selected.some(d=>d.id===id))&&<p className="fine">Alcohol menu items are paused because this plan has no alcohol drinkers or is set to no alcohol. They contribute no shopping, budget or schedule quantities. Change the drink settings to restore them.</p>}
                    <nav className="menu-categories" aria-label="Filter your dishes">{['All','Mains','Sides','Starters','Desserts','Drinks'].filter(c=>c==='All'||selected.some(d=>menuCategoryFor(d)===c)).map(c=><button key={c} aria-pressed={menuCategory===c} onClick={()=>setMenuCategory(c)}>{c}</button>)}</nav>
                    {plan.incompleteRecipes.length>0&&<button className="menu-recipe-status" onClick={()=>setOpenDish(plan.incompleteRecipes[0].id)}>{plan.incompleteRecipes.length} incomplete {plan.incompleteRecipes.length===1?'recipe':'recipes'} · Review <ArrowRight size={14}/></button>}
                    <div className="menu-dishes">
                      {selected.filter(d=>menuCategory==='All'||menuCategoryFor(d)===menuCategory).map(d => {
                        const owner = responsibility(s,d).owner;
                        return (
                          <div className="menu-dish" key={d.id}>
                            <img className="menu-dish-photo" src={d.image || dishThumb[d.id] || asset.tableLight} alt={d.name} loading="lazy" />
                            <div className="menu-dish-copy">
                              <span className="menu-dish-title">{d.name}</span>
                              <small className="menu-dish-meta">{d.group} · {qty(dishPortions(s,d))} planned portions</small>
                              <small className="menu-dish-source">{d.sourceUrl ? `${d.source || 'Source recipe'}${recipeReady(d) ? '' : ' · Recipe incomplete'}` : d.servingPlan ? 'Serving plan · package directions apply' : recipeReady(d) ? 'Your saved recipe' : 'Recipe incomplete'}</small>
                              <span className="menu-dish-status">{ownerLabel(d)} · {preparation(s,d)}</span>{!recipeReady(d)&&preparation(s,d)==='Homemade'&&<p className="recipe-blocker">RECIPE INCOMPLETE · Ingredients and cooking tasks are not generated. Complete this recipe or select a measured recipe from your guide.</p>}
                            </div>
                            <button className="menu-dish-recipe" aria-expanded={openDish === d.id} onClick={() => setOpenDish(openDish === d.id ? null : d.id)}>View recipe <ArrowRight size={14}/></button>
                            <details className="menu-dish-settings">
                              <summary>Manage dish</summary>
                            <div className="menu-dish-fields"><label>Responsible<select
                              aria-label={`Who is responsible for ${d.name}`}
                              value={owner}
                              onChange={e =>
                                setResponsibility(d.id,{owner:e.target.value,status:e.target.value==='Host'?'Confirmed':'Planned'})
                              }
                            >
                              <option value="Host">You (host)</option>
                              {s.guests
                                .filter(g => g.rsvp !== 'Declined')
                                .map(g => (
                                  <option key={g.guestId} value={g.guestId}>
                                    {g.name}
                                  </option>
                                ))}
                              <option value="Other">Someone else</option>
                            </select></label>
                            <div className="dish-controls">
                              <label>Preparation<select aria-label={`Preparation for ${d.name}`} value={responsibility(s,d).preparation} onChange={e=>setResponsibility(d.id,{preparation:e.target.value as 'Homemade'|'Purchased'})}><option>Homemade</option><option>Purchased</option></select></label>
                              {owner !== 'Host' && <label>Contribution<select aria-label={`Contribution status for ${d.name}`} value={responsibility(s,d).status} onChange={e=>setResponsibility(d.id,{status:e.target.value as 'Planned'|'Confirmed'|'Arrived'})}><option>Planned</option><option>Confirmed</option><option>Arrived</option></select></label>}
                              <small>{preparation(s,d)==='Guest-provided'?'Confirmed contribution. No host shopping.':owner!=='Host'?'Included in your shopping until confirmed.':preparation(s,d)==='Purchased'?'Prepared dish in your shopping.':'Recipe ingredients in your shopping.'}</small>
                            </div></div>
                            </details>
                            <div className="menu-dish-selection">{recipeMenuAction(d)}</div>
                          </div>
                        );
                      })}
                      {selected.length === 0 && (
                        <p className="fine">Your menu is empty. Choose Add a dish to browse recipes.</p>
                      )}
                    </div>
                    {guestProvidedSelected.length > 0 && (
                      <p className="menu-owner-note">
                        {guestProvidedSelected.length} menu item{guestProvidedSelected.length === 1 ? '' : 's'} are assigned to guests and are intentionally excluded from your grocery quantities.
                      </p>
                    )}
                  </div>
                  <aside className="menu-support" aria-label="Menu planning summary">
                  <div className="menu-totals">
                    <button onClick={()=>navigate('SHOPPING')}><span>Shopping</span><b>{shoppingEntries.filter(x => x.category !== 'House' && x.category !== 'Equipment').length} items</b><ArrowRight size={18}/></button>
                    <button onClick={()=>navigate('PREP')}><span>Prep</span><b>{hostPrepared.length + purchasedDishes.length} dishes</b><ArrowRight size={18}/></button>
                    <p>Updates with your menu and guest count</p>
                    <small>CROW & CROWN</small>
                  </div>
                  <section className="menu-library-entry" aria-label="Discover recipes"><span className="eyebrow">MORE TO COOK</span><h2>Recipe library</h2><p><b>{allDishes.length}</b> dishes to explore · {sourceRecipes.length} source recipes</p><p>Mains, sides, desserts and drinks. Add them here to build your menu.</p><button onClick={()=>{setMenuView('browse');setMenuCategory('All');setShowRecipeForm(false);window.scrollTo({top:0,behavior:'smooth'});}}>Browse all {allDishes.length} dishes <ArrowRight size={16}/></button></section>
                  <details className={planGaps.length ? 'menu-gaps has-gaps' : 'menu-gaps'}>
                    <summary><span>Menu checks</span><span>{planGaps.length ? `${planGaps.length} to review` : 'Meal covered'}</span></summary>
                    <div className="menu-check-content">
                    {planGaps.length ? (
                      planGaps.map(gap => (
                        <div className="menu-gap" key={gap}>
                          <span>+</span>
                          {gap}
                        </div>
                      ))
                    ) : (
                      <p className="fine">
                        You have a main, comforting sides, something fresh, sauce,
                        dessert, and the current dietary needs are represented.
                      </p>
                    )}
                    {s.guests.some(g=>g.rsvp!=='Declined'&&(g.diet.trim()||g.dietaryNeeds.length>0)) && (
                      <p className="allergy-note">
                        Allergy planning is a flag, not a safety guarantee. Verify
                        labels, ingredients, and cross-contact for each guest.
                      </p>
                    )}
                    </div>
                  </details>

                  </aside>
                </div>}
                {menuView==='plan' && selected.filter(d => d.group === 'Starch').length >= 4 && (
                  <div className="note-banner">
                    YOUR MENU IS HEAVY · {selected.filter(d => d.group === 'Starch').length} starch-heavy sides. Consider removing one.
                  </div>
                )}
                {menuView==='browse' && <section className="recipe-browser" aria-label="Recipe library">
                  <div className="library-recipe-grid">{allDishes.map(d=><article className="library-recipe-card" key={d.id}>
                    <img className="library-recipe-photo" src={d.image || dishThumb[d.id] || asset.tableLight} alt={d.name} loading="lazy" decoding="async" width={960} height={960}/>
                    <div className="library-recipe-copy">
                      <div className="library-recipe-kicker"><span className="eyebrow">{d.group}</span>{s.selections.includes(d.id)&&<span className="library-menu-status" role="status"><Check size={12}/> In your menu</span>}</div>
                      <h3>{d.name}</h3>
                      <p className="library-recipe-facts">{d.minutes} min{d.serves ? ` · ${d.serves} base ${d.serves===1?'serving':'servings'}` : ''}</p>
                      <p className="library-recipe-source">{d.source || (d.servingPlan ? 'Serving plan' : 'Your recipe')}</p>
                      {!d.recipeVerified&&!d.servingPlan&&!recipeReady(d)&&<span className="recipe-completeness">INCOMPLETE RECIPE</span>}
                    </div>
                    <div className="library-recipe-actions">
                      <button className="library-view-recipe" aria-label="Recipe & ingredients" onClick={()=>setOpenDish(d.id)}>View recipe <ArrowRight size={14}/></button>
                      {recipeMenuAction(d,true)}
                    </div>
                    {d.id.startsWith('custom-')&&<button className="remove-recipe-link" onClick={()=>setS(v=>reconcileState({...v,customRecipes:v.customRecipes.filter(r=>r.id!==d.id),selections:v.selections.filter(id=>id!==d.id)},dishes))}>Remove saved recipe</button>}
                  </article>)}</div>
                </section>}
              </div>
            )}
            {tab === 'PREP' && (
              <div className="content">
                <Section eyebrow="05 / PREP" title="Your prep plan">
                  Start with the plan, do everything possible ahead, then follow
                  the day-of list. The oven math is there only when you need it.
                </Section>
                <SectionImage image={asset.salad} alt="Thanksgiving food being prepared before guests arrive" eyebrow="BEFORE THEY ARRIVE" caption="The useful work happens before the doorbell: food, house reset, serving pieces, drinks and the details guests notice." position="center 55%" />

                <div className="prep-start-grid">
                  <button className="prep-start-card" onClick={() => navigate('MENU')}>
                    <span>01</span>
                    <div>
                      <b>Lock the menu</b>
                      <small>
                        {selected.length} dishes · {planGaps.length
                          ? `${planGaps.length} gap${planGaps.length === 1 ? '' : 's'} left`
                          : 'core plan covered'}
                      </small>
                    </div>
                    <ArrowRight size={17} />
                  </button>
                  <div className="prep-start-card">
                    <span>02</span>
                    <div>
                      <b>Prep ahead</b>
                      <small>{prepAheadDishes.length} selected dishes have make-ahead work</small>
                    </div>
                    <Check size={17} />
                  </div>
                  <div className="prep-start-card">
                    <span>03</span>
                    <div>
                      <b>Cook + serve</b>
                      <small>Dinner is planned for {clock(dinner)}</small>
                    </div>
                    <Check size={17} />
                  </div>
                </div>

                {planGaps.length > 0 && (
                  <div className="alert prep-alert">
                    FINISH THE FOOD PLAN FIRST
                    <small>{planGaps.join(' · ')}</small>
                    <button onClick={() => navigate('MENU')}>OPEN MENU</button>
                  </div>
                )}

                <div className="guided-prep-grid">
                  <div className="panel">
                    <span className="eyebrow">DO FIRST</span>
                    <h2>Get the decisions out of the way.</h2>
                    <CheckRow id="prep-order-turkey">
                      {turkeyActive ? `Order / confirm ${bird} lb of turkey` : "Confirm the main dish plan"}
                    </CheckRow>
                    <CheckRow id="prep-guests">
                      Confirm RSVPs, dietary restrictions + guest contributions
                    </CheckRow>
                    <CheckRow id="prep-serving">
                      Match a serving piece to each of your {selected.length} dishes
                    </CheckRow>
                    <CheckRow id="prep-supplies">
                      Check foil, ice, containers, trash bags + paper goods
                    </CheckRow>
                    <CheckRow id="prep-fridge-reset">Clear refrigerator space for selected food, drinks + make-ahead dishes</CheckRow>
                    <CheckRow id="prep-house-count">Confirm chairs, tables, serving pieces + kid seating are covered</CheckRow>
                    <CheckRow id="prep-bathroom-stock">Check toilet paper, hand soap, hand towels + guest bathroom supplies</CheckRow>
                    <CheckRow id="prep-coat-plan">Choose coat, bag + shoe drop zones away from the kitchen</CheckRow>
                    {uncoveredDiets.length > 0 && (
                      <div className="note-banner">
                        DIETARY CHECK · Still need an explicitly compatible dish for{' '}
                        {uncoveredDiets.join(' · ')}.
                      </div>
                    )}
                  </div>

                  <div className="panel">
                    <span className="eyebrow">1–2 DAYS BEFORE</span>
                    <h2>Do anything that will hold well.</h2>
                    {prepAheadDishes.map(d => (
                      <CheckRow key={d.id} id={`prep-ahead-${d.id}`} note={d.makeAhead}>
                        {d.name}
                      </CheckRow>
                    ))}
                    {prepAheadDishes.length === 0 && (
                      <p className="fine">No make-ahead recipe work is in the current plan.</p>
                    )}
                    <CheckRow id="prep-table">Set the table + stage serving pieces</CheckRow>
                    <CheckRow id="prep-drinks">Chill drinks + set up a separate drink station</CheckRow>
                    <CheckRow id="prep-bathroom-clean">Clean + reset the guest bathroom</CheckRow>
                    <CheckRow id="prep-floors">Vacuum / sweep high-traffic areas + dining space</CheckRow>
                    <CheckRow id="prep-entry">Clear the entry, coat area + guest surfaces</CheckRow>
                    <CheckRow id="prep-dishwasher">Empty the dishwasher and clear the sink</CheckRow>
                    <CheckRow id="prep-coffee-station">Stage coffee, filters, mugs, cream + sweetener</CheckRow>
                    <CheckRow id="prep-trash-station">Set fresh liners in trash + recycling bins</CheckRow>
                    {kids > 0 && <CheckRow id="prep-kids-zone">Set up the kids’ table / activity zone</CheckRow>}
                  </div>

                  <div className="panel">
                    <span className="eyebrow">THANKSGIVING DAY</span>
                    <h2>Cook from the plan, not from memory.</h2>
                    <CheckRow id="prep-day-house-reset">Do a quick house reset: counters clear, bathroom stocked, entry open</CheckRow>
                    <CheckRow id="prep-day-dishwasher">Run / empty the dishwasher so it is ready for cleanup</CheckRow>
                    <CheckRow id="prep-day-beverage">Fill ice, water + beverage stations</CheckRow>
                    <CheckRow id="prep-day-lighting">Set music, lamps + candles before the kitchen gets busy</CheckRow>
                    {[...purchasedDishes,...guestProvidedSelected].map(d=><CheckRow key={d.id} id={`receive-${d.id}`} note={ownerLabel(d)}>{preparation(s,d)==='Purchased'?'Collect / stage':'Receive from provider'} · {d.name}</CheckRow>)}
                    {hostPrepared.map(d => (
                      <div key={d.id}><CheckRow
                        key={d.id}
                        id={`prep-day-${d.id}`}
                        note={
                          d.oven
                            ? `${d.minutes} min total · ${d.oven} min oven at ${d.temp}°F`
                            : `${d.minutes} min total · no oven slot`
                        }
                      >
                        {d.name}
                      </CheckRow><button type="button" onClick={()=>setOpenDish(d.id)}>View cooking steps for {d.name}</button></div>
                    ))}
                    {buildTimeline(s,plan).filter(row=>/^recipe-(phase|advance)-/.test(row[2])).map(([time,label,id])=><CheckRow key={id} id={id} note={clock(time)}>{label}</CheckRow>)}
                  </div>
                  <div className="panel">
                    <span className="eyebrow">FINAL 60 MINUTES</span>
                    <h2>Finish, transfer, serve.</h2>
                    {finalHourDishes.map(d => (
                      <CheckRow key={d.id} id={`prep-finish-${d.id}`} note={d.finish}>
                        {d.name}
                      </CheckRow>
                    ))}
                    <CheckRow id="prep-counter">Clear one counter for finished dishes</CheckRow>
                    <CheckRow id="prep-bathroom-final">Refresh toilet paper, hand soap + hand towels</CheckRow>
                    <CheckRow id="prep-trash-final">Empty visible trash + replace liners</CheckRow>
                    <CheckRow id="prep-coffee-final">Put coffee + dessert service in position</CheckRow>
                    <CheckRow id="prep-atmosphere-final">Start music, dim lights + light candles</CheckRow>
                    <CheckRow id="prep-leftovers">Put leftover containers + labels where you can reach them</CheckRow>
                    <CheckRow id="prep-host">Stop cooking long enough to get yourself ready</CheckRow>
                  </div>
                </div>

                <div className="panel">
                  <span className="eyebrow">ADD YOUR OWN PREP</span>
                  <h2>Add anything specific to your house.</h2>
                  <div className="form-grid">
                    <label className="field">
                      <span>Task</span>
                      <input value={newPrepTask} onChange={e => setNewPrepTask(e.target.value)} placeholder="Put extra towels in powder room" />
                    </label>
                    <label className="field">
                      <span>When</span>
                      <select value={newPrepPhase} onChange={e => setNewPrepPhase(e.target.value as PrepTask['phase'])}>
                        <option>DO FIRST</option>
                        <option>1–2 DAYS BEFORE</option>
                        <option>THANKSGIVING DAY</option>
                        <option>FINAL 60 MINUTES</option>
                      </select>
                    </label>
                  </div>
                  <button className="save-recipe-button" onClick={addCustomPrepTask}><Plus size={14} /> ADD TO PLAN PREP TASK</button>
                  {(s.customPrepTasks || []).map(task => (
                    <div className="guest-provided-row" key={task.id}>
                      <span><small>{task.phase}</small><br />{task.label}</span>
                      <div>
                        <CheckRow id={`custom-${task.id}`}>DONE</CheckRow>
                        <button className="manual-remove" aria-label={`Remove ${task.label}`} onClick={() => update('customPrepTasks', (s.customPrepTasks || []).filter(x => x.id !== task.id))}><X size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <details className="prep-details">
                  <summary>Need the turkey + oven math? Open the detailed schedule.</summary>
                  <div className="two-col prep-detail-grid">
                    <div className="panel">
                      <h2>Turkey math</h2>
                      <div className="form-grid">
                        {select('Cut', s.turkey, ['Whole turkey', 'Turkey breast'], v => update('turkey', v))}
                        {select('Condition', s.frozen ? 'Frozen' : 'Fresh', ['Frozen', 'Fresh'], v => update('frozen', v === 'Frozen'))}
                        {select('Leftovers', s.leftovers ? 'Yes, please' : 'Just enough', ['Yes, please', 'Just enough'], v => update('leftovers', v === 'Yes, please'))}
                      </div>
                      <div className="big-callout">{turkeyActive?bird:0} <small>{turkeyActive?'LB RECOMMENDED':'NO HOST-PREPARED TURKEY'}</small></div>
                      {turkeyActive && s.frozen && (
                        <div className="alert">
                          MOVE TURKEY TO REFRIGERATOR BY {thawText.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="panel">
                      <h2>Oven schedule</h2>
                      <p className="fine">{s.ovens} oven{s.ovens > 1 ? 's' : ''} · {s.racks} rack{s.racks > 1 ? 's' : ''} · dinner {clock(dinner)}</p>
                      {turkeyActive && !hostPrepared.some(d=>d.recipeVerified&&(d.id==='turkey'||d.id==='guide-breast')) && (
                        <div className="schedule-row">
                          <b>{clock(schedule.turkeyIn)}–{clock(schedule.turkeyOut)}</b>
                          <span>Roast turkey · 325°F</span>
                        </div>
                      )}
                      {schedule.slots.map(x => (
                        <div className="schedule-row" key={x.taskId}>
                          <b>{clock(x.start)}–{clock(x.end)}</b>
                          <span>{x.dish.name}{x.stage?' · '+x.stage:''}{x.batch?' · batch '+(x.batch+1):''} · {x.temp}°F · oven {x.oven}</span>
                        </div>
                      ))}
                      {schedule.conflicts.length > 0 && (
                        <div className="alert">
                          OVEN CONFLICT
                          <small>{schedule.conflicts.map(x => x.dish.name).join(', ')} needs a schedule adjustment or safe holding plan. Review the resource warnings.</small>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              </div>
            )}
            {tab === 'SHOPPING' && (
              <div className="content shopping-workspace">
                <Section eyebrow="04 / SHOPPING" title="Shopping list">
                  Ingredients and supplies for your plan. Check off purchases or open an item to adjust it.
                </Section>
                <p className="shopping-plan-note">Quantities use {planningCount} people · {s.planningMode.toLowerCase()}. <button className="text-link" onClick={()=>navigate('GUESTS')}>Manage guests →</button></p>
                <div className="shopping-list-toolbar"><div><p><b>{shoppingEntries.filter(item=>!s.purchased.includes(item.key)).length}</b> to buy <span>· {shoppingEntries.filter(item=>s.purchased.includes(item.key)).length} bought</span></p></div><div className="shopping-list-filters" aria-label="Shopping list view">{(['remaining','all','bought'] as const).map(view=><button key={view} aria-pressed={shoppingFilter===view} onClick={()=>setShoppingFilter(view)}>{view==='remaining'?'To buy':view==='all'?'All items':'Bought'}</button>)}</div></div>
                <div className="two-col shopping-layout">
                  <div className="panel glass-light shopping-list-panel">
                    {s.hiddenShopping.length>0&&<button className="text-link" onClick={()=>update('hiddenShopping',[])}>RESTORE {s.hiddenShopping.length} HIDDEN ITEMS</button>}
                    <div className="shopping-column-head"><span>ITEM</span><span>QUANTITY · EDIT ITEM</span></div>
                    {shoppingEntries.filter(item=>shoppingFilter==='all'||(shoppingFilter==='bought')===s.purchased.includes(item.key)).length===0&&<p className="shopping-empty">{shoppingFilter==='bought'?'No purchases checked off yet.':shoppingEntries.length?'Everything on your list is bought.':'Add dishes to your menu or add an item below to start your list.'}</p>}
                    {[...new Set(shoppingEntries.map(x=>x.category))].map(cat => {
                      const categoryItems = shoppingEntries.filter(item => item.category === cat);
                      const items = categoryItems.filter(item=>shoppingFilter==='all'||(shoppingFilter==='bought')===s.purchased.includes(item.key));
                      return items.length ? (
                        <div className="shop-group" key={cat}>
                          <div className="shopping-category-heading"><h3>{cat}</h3><span>{items.length} {items.length===1?'item':'items'}</span></div>
                          {cat==='Pantry checks'&&<p>Unmeasured additions and supplies. Check stock; add an item with a quantity if you need to buy it.</p>}
                          {items.map(item => {
                            const currentQty = shoppingQty(item.key, item.count);
                            const saveQuantity = () => {
                              const value=Number(shoppingQuantityDraft);
                              if(shoppingQuantityDraft.trim()===''||!Number.isFinite(value)||value<0){setShoppingQuantityDraft(String(currentQty));return;}
                              const mode=s.shoppingOverrides[item.key]?.mode||'adjustment';
                              update('shoppingOverrides',{...s.shoppingOverrides,[item.key]:{mode,value:mode==='locked'?value:value-item.count}});
                            };
                            const savePrice = () => {
                              const value=Number(shoppingPriceDraft);
                              if(shoppingPriceDraft.trim()!==''&&Number.isFinite(value)&&value>=0)update('unitPrices',{...s.unitPrices,[item.key]:value});
                            };
                            const step = item.unit.includes('lb') || item.unit.includes('cup') || item.unit.includes('bottle')
                              ? 0.5
                              : 1;
                            if(item.unit==='check pantry')return <div className={`shop-item shop-item-smart ${s.purchased.includes(item.key)?'completed':''}`} key={item.key}>
                              <button className="check-circle" aria-label={`${s.purchased.includes(item.key)?'Mark unchecked':'Mark checked'}: ${item.name}`} aria-pressed={s.purchased.includes(item.key)} onClick={()=>update('purchased',s.purchased.includes(item.key)?s.purchased.filter(x=>x!==item.key):[...s.purchased,item.key])}>{s.purchased.includes(item.key)&&<Check size={13}/>}</button>
                              <span className="shop-item-name">{item.name}<small>{item.source}</small></span><span>Check stock · as needed</span>
                            </div>;
                            return (
                              <div
                                className={`shop-item shop-item-smart ${s.purchased.includes(item.key) ? 'completed' : ''}`}
                                key={item.key}
                              >
                                <button
                                  className="check-circle"
                                  aria-label={`${s.purchased.includes(item.key)?'Mark unpurchased':'Mark purchased'}: ${item.name}`}
                                  aria-pressed={s.purchased.includes(item.key)}
                                  onClick={() =>
                                    update(
                                      'purchased',
                                      s.purchased.includes(item.key)
                                        ? s.purchased.filter(x => x !== item.key)
                                        : [...s.purchased, item.key]
                                    )
                                  }
                                >
                                  {s.purchased.includes(item.key) && <Check size={13} />}
                                </button>
                                <button className="shopping-edit-trigger" aria-label={`Edit quantity and details for ${item.name}`} aria-expanded={expandedShopping===item.key} aria-controls={`shopping-editor-${encodeURIComponent(item.key)}`} onClick={()=>{setShoppingQuantityDraft(String(currentQty));setShoppingPriceDraft(String(s.unitPrices[item.key] ?? Math.round((item.count?item.cost/item.count:0)*100)/100));setExpandedShopping(expandedShopping===item.key?null:item.key);}}>
                                  <span className="shop-item-name">{item.name}{s.shoppingOverrides?.[item.key]?.mode==='locked'&&<small>Quantity locked</small>}</span>
                                  <span className="shopping-edit-quantity"><span className="shopping-row-quantity">{qty(currentQty)} <small>{item.unit}</small></span><small>{expandedShopping===item.key?'Close':'Edit'}</small></span>
                                </button>
                                {currentQty<item.count&&<small className="shopping-quantity-warning" role="alert">Below planned amount: {qty(item.count)} {item.unit}</small>}
                                {expandedShopping===item.key&&<div id={`shopping-editor-${encodeURIComponent(item.key)}`} className="shopping-item-editor"><p className="shopping-item-origin">{item.auto?'Scaled from your plan':'Added by you'} · planned amount {qty(item.count)} {item.unit}</p><div className="shopping-quantity-edit"><span>Quantity</span><div className="qty-stepper">
                                  <button onClick={() => {adjustShoppingQty(item.key, item.count, -step);setShoppingQuantityDraft(String(Math.max(0,Math.round((currentQty-step)*100)/100)));}} aria-label={`Decrease ${item.name}`}>−</button>
                                  <input aria-label={`Quantity for ${item.name}`} type="number" min="0" step="any" value={shoppingQuantityDraft} onChange={e=>setShoppingQuantityDraft(e.target.value)} onBlur={saveQuantity} onKeyDown={e=>{if(e.key==='Enter'){saveQuantity();setExpandedShopping(null);}}}/>
                                  <button onClick={() => {adjustShoppingQty(item.key, item.count, step);setShoppingQuantityDraft(String(Math.round((currentQty+step)*100)/100));}} aria-label={`Increase ${item.name}`}>+</button>
                                </div>
                                </div>
                                {s.shoppingOverrides?.[item.key] !== undefined && (
                                  <button
                                    className="qty-reset"
                                    onClick={() => {
                                      const next = { ...(s.shoppingOverrides || {}) };
                                      delete next[item.key];
                                      update('shoppingOverrides', next);
                                      setShoppingQuantityDraft(String(item.count));
                                    }}
                                  >
                                    RESET QUANTITY
                                  </button>
                                )}
                                <div className="shopping-controls">
                                  <label>Unit price $<input type="number" min="0" step="0.01" aria-label={`Unit price for ${item.name}`} value={shoppingPriceDraft} onChange={e=>setShoppingPriceDraft(e.target.value)} onBlur={savePrice}/></label>
                                  <select aria-label={`Quantity mode for ${item.name}`} value={s.shoppingOverrides[item.key]?.mode||'adjustment'} onChange={e=>update('shoppingOverrides',{...s.shoppingOverrides,[item.key]:{mode:e.target.value as 'locked'|'adjustment',value:e.target.value==='locked'?currentQty:currentQty-item.count}})}><option value="adjustment">Automatic + adjustment</option><option value="locked">Locked quantity</option></select>
                                  {currentQty<item.count&&<small className="shopping-edit-note">Automatic amount: {qty(item.count)} {item.unit}</small>}
                                  {item.auto&&<button onClick={()=>update('hiddenShopping',[...s.hiddenShopping,item.key])}>ALREADY HAVE THIS</button>}
                                </div>
                                <button className="shopping-save" onClick={()=>{saveQuantity();savePrice();setExpandedShopping(null);}}>Done</button>
                                {!item.auto && 'id' in item && (
                                  <button
                                    className="manual-remove"
                                    aria-label={`Remove ${item.name}`}
                                    onClick={() =>
                                      update(
                                        'customShoppingItems',
                                        (s.customShoppingItems || []).filter(x => x.id !== item.id)
                                      )
                                    }
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                                </div>}
                              </div>
                            );
                          })}
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="shopping-support">
                    <details className="panel custom-shopping-panel input-panel shopping-support-row"><summary>Add an item <Plus size={16}/></summary>
                      <p className="fine">Toilet paper, foil, extra ice, flowers, batteries—anything you do not want to forget.</p>
                      <label className="field">
                        <span>Item</span>
                        <input value={manualItemName} onChange={e => setManualItemName(e.target.value)} placeholder="Toilet paper" />
                      </label>
                      <div className="manual-item-grid">
                        <label className="field">
                          <span>Quantity</span>
                          <input type="number" min="0.1" step="0.5" value={manualItemQty} onChange={e => setManualItemQty(e.target.value)} />
                        </label>
                        <label className="field">
                          <span>Unit</span>
                          <input value={manualItemUnit} onChange={e => setManualItemUnit(e.target.value)} placeholder="rolls" />
                        </label>
                      </div>
                      {select('Category', manualItemCategory, ['Hosting', 'Beverages', 'Tabletop', 'Florals', 'Custom'], setManualItemCategory)}
                      <button className="save-recipe-button" onClick={addManualShoppingItem}>
                        <Plus size={14} /> ADD TO LIST
                      </button>
                    </details>
                {hostPrepared.some(d=>d.seasoning)&&<details className="panel"><summary>Recipe pantry checks</summary><p>Check the unmeasured seasonings and kitchen ingredients alongside your quantified grocery list.</p>{hostPrepared.filter(d=>d.seasoning).map(d=><CheckRow key={d.id} id={`recipe-pantry-${d.id}`} note={d.seasoning}>{d.name}</CheckRow>)}</details>}

                    {guestProvidedSelected.length > 0 && (
                      <details className="panel shopping-support-row"><summary>Provided by guests <span>{guestProvidedSelected.length}</span></summary>
                        {guestProvidedSelected.map(d => (
                          <div className="guest-provided-row" key={d.id}>
                            <span>{d.name}</span>
                            <b>{ownerLabel(d)}</b>
                          </div>
                        ))}
                      </details>
                    )}
                    <details className="panel shopping-support-row"><summary>When to shop</summary>
                      <div className="timeline-simple">
                        <b>BUY NOW</b>
                        <p>Shelf-stable items, drinks, candles, paper goods and anything you are missing for the table.</p>
                        <b>BUY THIS WEEK</b>
                        <p>Turkey, dairy and longer-lasting produce.</p>
                        <b>1–2 DAYS BEFORE</b>
                        <p>Fresh herbs, bread, flowers, ice and bakery items.</p>
                      </div>
                    </details>
                  </div>
                </div>
                <details className="panel equipment-guide shopping-support-row"><summary>Equipment + kitchen inventory</summary><p>Check what you already have, then add only the gaps.</p>{equipmentChecklist.map((item,i)=><div className="equipment-guide-row" key={item}><CheckRow id={`guide-equipment-${i}`}>I have {item.toLowerCase()}</CheckRow><button disabled={checked(`guide-equipment-${i}`)||shoppingEntries.some(x=>x.name.toLowerCase()===item.toLowerCase())} onClick={()=>addEquipmentToShopping(item)}>{checked(`guide-equipment-${i}`)?'OWNED':shoppingEntries.some(x=>x.name.toLowerCase()===item.toLowerCase())?'ON LIST':'ADD TO SHOPPING'}</button></div>)}</details>
              </div>
            )}
            {tab === 'TABLE' && (
              <div className="content">
                <Section eyebrow="SEATING / TABLES" title="Seating + tables">
                  Set the room around the guest count, see exactly how many chairs and
                  place-setting pieces you need, then shop only the gaps.
                </Section>

                <div className="table-planner-grid">
                  <div className="panel">
                    <span className="eyebrow">ROOM LOGIC</span>
                    <h2>{planningCount} people · {adults} adults · {kids} kids</h2>
                    <details className="room-settings inline-editor"><summary>Edit room settings</summary><div className="form-grid">
                      {select(
                        'Plan quantities for',
                        s.planningMode,
                        ['Estimated', 'Expected', 'Confirmed', 'Custom'],
                        v => update('planningMode', v as PlanningMode)
                      )}
                      {s.planningMode === 'Estimated' &&
                        input('Estimated headcount', s.count, v => update('count', Math.max(0, Number(v) || 0)), 'number')}
                      {s.planningMode === 'Custom' &&
                        input('Custom headcount', s.customHeadcount, v => update('customHeadcount', Math.max(0, Number(v) || 0)), 'number')}
                      {!listDrivenHeadcount &&
                        input('Kids', kids, v => update(s.planningMode==='Custom'?'customKids':'kids', Math.min(planningCount, Math.max(0, Number(v) || 0))), 'number')}
                      {listDrivenHeadcount && (
                        <div className="derived-field">
                          <span>Guest-list headcount</span>
                          <b>{planningCount} total · {kids} kids</b>
                          <small>Change RSVP or Adult / Child on the Guests screen.</small>
                        </div>
                      )}
                      {select('Table shape', s.tableShape, ['Rectangle', 'Round', 'Square'], v => update('tableShape', v))}
                      {input('Seats per table', tableSeats, v => update('tableCapacity', Math.max(2, Number(v) || 2)), 'number')}
                      {select('Food amount', s.appetite, ['Lighter', 'Standard', 'Generous'], v => update('appetite', v))}
                      <label className="field toggle-field">
                        <span>Kids’ table</span>
                        <button
                          className={s.kidsTable ? 'pill active' : 'pill'}
                          onClick={() => update('kidsTable', !s.kidsTable)}
                        >
                          {s.kidsTable ? 'YES · SEPARATE KIDS TABLE' : 'NO · SEAT TOGETHER'}
                        </button>
                      </label>
                    </div>
                    </details>
                    <div className="room-math">
                      <div><b>{mainTableCount}</b><span>{s.tableShape.toUpperCase()} MAIN TABLE{mainTableCount === 1 ? '' : 'S'}</span></div>
                      <div><b>{kidsTableCount}</b><span>KIDS TABLE{kidsTableCount === 1 ? '' : 'S'}</span></div>
                      <div><b>{linenCount}</b><span>LINEN{linenCount === 1 ? '' : 'S'}</span></div>
                      <div><b>{planningCount}</b><span>PLACE SETTINGS</span></div>
                    </div>
                    <div className="room-zones">
                      <span className="eyebrow">ROOM ZONES FROM YOUR PLAN</span>
                      <p className="fine">
                        Experience choices now shape the room before Shopping is built.
                      </p>
                      <div className="room-zone-list">
                        {roomZones.map(zone => (
                          <span className="room-zone" key={zone}>{zone}</span>
                        ))}
                      </div>
                    </div>
                    <div className="table-visual">
                      {Array.from({ length: mainTableCount }).map((_, i) => (
                        <div className={`table-shape ${s.tableShape.toLowerCase()}`} key={`main-${i}`}>
                          <span>TABLE {i + 1}</span>
                          <small>up to {tableSeats}</small>
                        </div>
                      ))}
                      {Array.from({ length: kidsTableCount }).map((_, i) => (
                        <div className="table-shape kids" key={`kids-${i}`}>
                          <span>KIDS</span>
                          <small>up to 6</small>
                        </div>
                      ))}
                    </div>
                    <div className="note-banner">
                      FOOD SCALE · Planning for about {qty(foodGuests)} adult-size
                      portions. Kids count at roughly 65% of an adult portion, then
                      your {s.appetite.toLowerCase()} food setting adjusts every
                      recipe and grocery quantity.
                    </div>
                    {uncoveredDiets.length > 0 && (
                      <div className="alert">
                        DIETARY GAP · Add a recipe that covers: {uncoveredDiets.join(' · ')}
                        <button onClick={() => navigate('MENU')}>FIX MENU</button>
                      </div>
                    )}
                  </div>

                  <div className="panel inventory-panel">
                    <span className="eyebrow">WHAT YOU NEED</span>
                    <h2>Inventory, calculated for {planningCount} guests.</h2>
                    <p className="fine">Plates, cutlery, glasses and napkins include a 10% working buffer. Chairs are based on your service style. Any shortage is automatically added to Shopping.</p>
                    <div className="chair-logic">
                      <div>
                        <b>{mainTableGuests}</b>
                        <span>MAIN-TABLE CHAIRS</span>
                      </div>
                      <div>
                        <b>{kidsAtOwnTable}</b>
                        <span>KIDS-TABLE CHAIRS</span>
                      </div>
                      <div>
                        <b>{chairNeed}</b>
                        <span>TOTAL CHAIRS NEEDED</span>
                      </div>
                    </div>
                    <div className="inventory-table">
                      <div className="inventory-head"><span>ITEM</span><span>NEED</span><span>HAVE</span><span>MISSING</span></div>
                      {inventoryRows.map(row => (
                        <div className={row.missing > 0 ? 'inventory-row missing' : 'inventory-row'} key={row.key}>
                          <span>{row.label}</span>
                          <b>{row.need}</b>
                          <input
                            type="number"
                            min="0"
                            value={row.have}
                            aria-label={`How many ${row.label} you have`}
                            onChange={e =>
                              update(
                                row.key as 'chairs' | 'plates' | 'dessertPlates' | 'forks' | 'dessertForks' | 'knives' | 'waterGlasses' | 'glasses' | 'kidsCups' | 'napkins' | 'linens' | 'platters',
                                Math.max(0, Number(e.target.value) || 0)
                              )
                            }
                          />
                          <strong>{row.missing > 0 ? `+${row.missing}` : 'COVERED'}</strong>
                        </div>
                      ))}
                    </div>
                    <button className="text-link" onClick={() => navigate('SHOPPING')}>
                      OPEN SHOPPING LIST <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="panel"><h2>Seating</h2><p className="fine">Assign each person to one seat. Table and seat IDs stay stable when names change. Declined guests release their seats.</p><div className="seat-grid">
                  {planningGuests.slice(0,planningCount).map(g=><label className="seat" key={g.guestId}><span>{g.name || 'Unnamed guest'} · {g.ageGroup}</span><select aria-label={`Seat for ${g.name}`} value={s.seating[g.guestId]||''} onChange={e=>update('seating',{...s.seating,[g.guestId]:e.target.value})}><option value="">Unassigned</option>{seats.filter(x=>!s.kidsTable||x.kind===(g.ageGroup==='Child'?'kids':'main')).map(x=><option key={x.id} value={x.id} disabled={Object.entries(s.seating).some(([id,seat])=>id!==g.guestId&&seat===x.id)}>{x.label}</option>)}</select>{g.note&&<small>{g.note}</small>}</label>)}
                </div>{planningGuests.length===0&&<p>Add guests to assign seats.</p>}</div>
                <div className="shop-look-grid">
                  {shopLooks.map(look => (
                    <button
                      key={look.name}
                      className={s.table === look.name ? 'shop-look-card active' : 'shop-look-card'}
                      onClick={() => update('table', look.name)}
                    >
                      <img src={look.image} alt={look.name} />
                      <span className="eyebrow">{look.palette}</span>
                      <h3>{look.name}</h3>
                      <small>{look.products.length} SHOPPABLE PIECES</small>
                    </button>
                  ))}
                </div>

                <details className="panel glass-light"><summary>Tablescape + service layout</summary>{tableChecklist.map((item,i)=><CheckRow key={item} id={`guide-table-${i}`}>{item}</CheckRow>)}<div className="station-guide-list">{stationGuides.map(station=><section key={station.title}><h3>{station.title}</h3><p>{station.notes}</p></section>)}</div></details>
                <details className="panel glass-light"><summary>Kitchen staging sheet · {selected.length} dishes</summary><p>Stage these empty serving pieces before the gathering. Assign a utensil and check the source recipe’s exact yield.</p><div className="staging-sheet">{selected.map(d=><div key={d.id}><b>{d.name}</b><span>{ownerLabel(d)} · {qty(dishPortions(s,d))} planned servings</span><span>{d.vessel}</span><span>{d.makeAhead}</span>{d.sourceUrl&&<a href={d.sourceUrl} target="_blank" rel="noreferrer">RECIPE SOURCE →</a>}</div>)}</div></details>
                <div className="panel inspiration-board">
                  <div className="inspiration-head">
                    <div>
                      <span className="eyebrow">YOUR INSPIRATION</span>
                      <h2>Save the things you want to remember.</h2>
                    </div>
                    <label className="upload-inspiration">
                      <Plus size={15} /> ADD PHOTOS
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => {
                          const files = Array.from(e.target.files || []).slice(0, 8);
                          files.forEach(file => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                setS(v => ({
                                  ...v,
                                  inspiration: [...(v.inspiration || []), reader.result as string].slice(-12),
                                }));
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                          e.currentTarget.value = '';
                        }}
                      />
                    </label>
                  </div>
                  <div className="inspiration-grid">
                    {(s.inspiration || []).length === 0 ? (
                      <div className="inspiration-empty">Add screenshots, Pinterest saves, florals, linens or rooms you love.</div>
                    ) : (
                      (s.inspiration || []).map((src, i) => (
                        <figure key={`${src.slice(0, 30)}-${i}`}>
                          <img src={src} alt={`Inspiration ${i + 1}`} />
                          <button
                            aria-label="Remove inspiration"
                            onClick={() => update('inspiration', s.inspiration.filter((_, j) => j !== i))}
                          >
                            <X size={14} />
                          </button>
                        </figure>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {tab === 'TIMELINE' && (
              <div className="content">
                <Section eyebrow="06 / TIMELINE" title="Timeline">
                  Built from your menu, house prep, activities, guest flow and dinner at {clock(dinner)}. Add anything else and it joins the same schedule.
                </Section>
                <details className="panel glass-light advance-guide"><summary>Before the day · planning calendar</summary><p>These are advance planning windows. The timed run below uses your actual dinner hour and selected dishes.</p>{advanceWindows.map((window,i)=><section key={window.when}><h3>{window.when}</h3>{window.tasks.map((task,j)=><CheckRow key={task} id={`guide-advance-${i}-${j}`}>{task}</CheckRow>)}</section>)}<div className="guide-source-links">{guideLinks.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} →</a>)}</div></details>
                <details className="panel input-panel inline-editor">
                  <summary>Add an event</summary>
                  <div className="form-grid">
                    <label className="field">
                      <span>What happens</span>
                      <input value={newTimelineLabel} onChange={e => setNewTimelineLabel(e.target.value)} placeholder="Family photo before dinner" />
                    </label>
                    <label className="field">
                      <span>Time</span>
                      <input type="time" value={newTimelineTime} onChange={e => setNewTimelineTime(e.target.value)} />
                    </label>
                    <label className="field">
                      <span>Type</span>
                      <select value={newTimelineCategory} onChange={e => setNewTimelineCategory(e.target.value)}>
                        <option>Activity</option>
                        <option>House</option>
                        <option>Guest</option>
                        <option>Dessert</option>
                        <option>Drink</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>
                  <button className="save-recipe-button" onClick={addCustomTimelineItem}><Plus size={14} /> ADD TO SCHEDULE</button>
                  {(s.customTimelineItems || []).map(item => (
                    <div className="guest-provided-row" key={item.id}>
                      <span><small>{item.category} · {clock(timeToMin(item.time))}</small><br />{item.label}</span>
                      <button className="manual-remove" aria-label={`Remove ${item.label}`} onClick={() => update('customTimelineItems', (s.customTimelineItems || []).filter(x => x.id !== item.id))}><X size={14} /></button>
                    </div>
                  ))}
                </details>
                <div className="timeline-layout">
                  <div className="panel">
                    <h2>Thanksgiving Day</h2>
                    {timelineItems().map(([time, label, id]) => (
                      <div className="timeline-row" key={id}>
                        <span>{clock(time)}{time<0&&<small> · DAY BEFORE</small>}<input aria-label={`Minutes adjustment for ${id}`} type="number" value={s.timelineOverrides[id]||0} onChange={e=>update('timelineOverrides',{...s.timelineOverrides,[id]:Number(e.target.value)||0})}/><small>minutes adjustment</small></span>
                        <CheckRow id={id}>{label}</CheckRow>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="panel warm">
                      <span className="eyebrow">HOST BUFFER</span>
                      <h2>You have time to get ready.</h2>
                      <p>
                        We protect 45 minutes before guests settle in. Step away
                        from the kitchen.
                      </p>
                      {input(
                        'Get ready starts',
                        s.hostBuffer,
                        v => update('hostBuffer', v),
                        'time'
                      )}
                      <p className="fine">
                        {clock(timeToMin(s.hostBuffer))}–
                        {clock(timeToMin(s.hostBuffer) + 45)}
                      </p>
                    </div>
                    <div className="panel">
                      <h2>Serving checklist</h2>
                      {selected.map(d => (
                        <div className="serving-row" key={d.id}>
                          <b>{d.name}</b>
                          <span>{d.vessel}</span>
                          <small>
                            {d.group === 'Fresh' && d.id === 'cranberry'
                              ? 'Chilled'
                              : 'Serve warm'}{' '}
                            ·{' '}
                            {s.service === 'Buffet'
                              ? 'Buffet'
                              : 'Table / sideboard'}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === 'GUESTS' && (
              <div className="content guests-workspace">
                <Section
                  eyebrow="02 / GUESTS"
                  title="Guests"
                >
                  Add a name, choose their RSVP, then open details for dietary needs or what they’re bringing.
                </Section>
                <section className="panel guest-entry" aria-label="Add a guest"><span className="eyebrow">ADD A GUEST</span>
                  <div className="guest-add">
                    <input
                      aria-label="New guest name" placeholder="Add a guest name"
                      value={newGuest}
                      onChange={e => setNewGuest(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newGuest.trim()) {
                          update('guests', [
                            ...s.guests,
                            {
                              guestId: uid('guest'), dietaryNeeds: [], name: newGuest.trim(),
                              rsvp: 'Pending',
                              ageGroup: 'Adult',
                              alcohol: null,
                              kidBeverage: '',
                              diet: '',
                              dish: '',
                              status: 'Not confirmed',
                              note: '',
                            },
                          ]);
                          setNewGuest('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (!newGuest.trim()) return;
                        update('guests', [
                          ...s.guests,
                          {
                            guestId: uid('guest'), dietaryNeeds: [], name: newGuest.trim(),
                            rsvp: 'Pending',
                            ageGroup: 'Adult',
                            alcohol: null,
                            kidBeverage: '',
                            diet: '',
                            dish: '',
                            status: 'Not confirmed',
                            note: '',
                          },
                        ]);
                        setNewGuest('');
                      }}
                    >
                      <Plus size={16} /> ADD GUEST
                    </button>
                  </div>
                </section>
                <p className="guest-count-line"><span>{confirmedCount} attending</span><span>{expectedCount-confirmedCount} awaiting reply</span><span>{s.guests.filter(g=>g.rsvp==='Declined').length} declined</span></p>
                {s.planningMode==='Estimated' && <p className="guest-estimate-note">Food quantities currently use your estimate of {planningCount}. Choose Expected in the settings below to use Attending + Pending guests.</p>}
                <section className="panel input-panel glass-light guest-list-panel" aria-label="Guest list">
                  <header className="guest-list-heading"><h2>Your guest list</h2><span>{s.guests.length} names</span></header>
                  
                  {!s.guests.length && <p className="guest-empty">Start with the people you’re inviting. Add each person separately so their preferences and seat stay connected.</p>}
                  <div className="guest-list">
                    {s.guests.map(g => {
                      const patch = (values: Partial<Guest>) => update('guests',s.guests.map(x => x.guestId===g.guestId ? {...x,...values} : x));
                      const expanded=expandedGuest===g.guestId;
                      return <article className={`guest-card ${expanded?'expanded':''}`} key={g.guestId}>
                        <div className="guest-core">
                          <div className="guest-identity"><input aria-label="Guest name" value={g.name} onChange={e=>patch({name:e.target.value})}/><small>{g.ageGroup}{g.dietaryNeeds.length?` · ${g.dietaryNeeds.join(', ')}`:g.diet?' · Dietary notes saved':''}{selected.some(d=>responsibility(s,d).owner===g.guestId)?' · Bringing a dish':''}</small></div>
                          <label className="guest-rsvp"><span>RSVP</span><select aria-label={`RSVP for ${g.name}`} value={g.rsvp} onChange={e=>patch({rsvp:e.target.value as Guest['rsvp']})}><option>Attending</option><option>Pending</option><option>Declined</option></select></label>
                          <button className="guest-details-toggle" aria-label={`Details for ${g.name}`} aria-expanded={expanded} aria-controls={`guest-profile-${g.guestId}`} onClick={()=>setExpandedGuest(expanded?null:g.guestId)}>{expanded?'Close details':'Details'} <span aria-hidden="true">{expanded?'−':'+'}</span></button>
                        </div>
                        {expanded && <div className="guest-profile" id={`guest-profile-${g.guestId}`}>
                          <h3>Preferences</h3>
                          <div className="form-grid">
                            <label className="field"><span>Adult or child</span><select aria-label={`Adult or child for ${g.name}`} value={g.ageGroup} onChange={e=>patch({ageGroup:e.target.value as Guest['ageGroup'],alcohol:e.target.value==='Child'?false:g.alcohol})}><option>Adult</option><option>Child</option></select></label>
                            {g.ageGroup==='Adult'?<label className="field"><span>Alcohol preference</span><select aria-label={`Alcohol preference for ${g.name}`} value={g.alcohol===null?'Not answered':g.alcohol?'Drinks alcohol':'No alcohol'} onChange={e=>patch({alcohol:e.target.value==='Not answered'?null:e.target.value==='Drinks alcohol'})}><option>Not answered</option><option>Drinks alcohol</option><option>No alcohol</option></select></label>:<label className="field"><span>Child’s beverage</span><input aria-label={`Kids beverage for ${g.name}`} value={g.kidBeverage} onChange={e=>patch({kidBeverage:e.target.value})}/></label>}
                          </div>
                          <label className="field"><span>Dietary / allergy notes</span><input aria-label={`Dietary needs for ${g.name}`} value={g.diet} placeholder="Any details the host needs" onChange={e=>patch({diet:e.target.value})}/></label>
                          <details className="dietary-picker"><summary>Dietary requirements · {g.dietaryNeeds.length} selected</summary><fieldset className="dietary-options"><legend>Choose all that apply</legend>{['Vegetarian','Vegan','Gluten-Free','Dairy-Free','Nut-Free','Egg-Free','Soy-Free','Sesame-Free','Fish-Free','Shellfish-Free'].map(tag=><label key={tag}><input type="checkbox" checked={g.dietaryNeeds.includes(tag)} onChange={e=>patch({dietaryNeeds:e.target.checked?[...g.dietaryNeeds,tag]:g.dietaryNeeds.filter(t=>t!==tag)})}/>{tag}</label>)}</fieldset></details>
                          <div className="guest-contribution"><h3>What they’re bringing</h3>{selected.filter(d=>responsibility(s,d).owner===g.guestId).map(d=><label key={d.id} className="field"><span>{d.name}</span><select aria-label={`Contribution from ${g.name} for ${d.name}`} value={responsibility(s,d).status} onChange={e=>setResponsibility(d.id,{status:e.target.value as 'Planned'|'Confirmed'|'Arrived'})}><option>Planned</option><option>Confirmed</option><option>Arrived</option></select></label>)}
                          <select aria-label={`Assign a dish to ${g.name}`} value="" onChange={e=>{if(e.target.value)setResponsibility(e.target.value,{owner:g.guestId,status:'Planned'});}}><option value="">Assign a dish from your menu…</option>{selected.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select>
                          {g.dish && <small>Previous contribution note: {g.dish}</small>}</div>
                          <label className="field"><span>Seating / arrival notes</span><input aria-label={`Seating note for ${g.name}`} value={g.note} onChange={e=>patch({note:e.target.value})}/></label>
                          <button className="guest-remove" aria-label={`Remove ${g.name}`} onClick={()=>removeGuest(s.guests.findIndex(x=>x.guestId===g.guestId))}>REMOVE GUEST</button>
                        </div>}
                      </article>;
                    })}
                  </div>
                </section>
                <details className="panel guest-headcount-settings"><summary>Quantities for {planningCount} people · {s.planningMode.toLowerCase()} <span>Change</span></summary><p>Use an estimate before your guest list is ready. Expected includes Attending + Pending; Confirmed includes only Attending. Custom uses the number you enter.</p>
                  <div className="guest-planning-controls">
                    {select(
                      'Plan quantities for',
                      s.planningMode,
                      ['Estimated', 'Expected', 'Confirmed', 'Custom'],
                      v => update('planningMode', v as PlanningMode)
                    )}
                    {s.planningMode === 'Custom' &&
                      input(
                        'Custom headcount',
                        s.customHeadcount,
                        v => update('customHeadcount', Math.max(0, Number(v) || 0)),
                        'number'
                      )}
                  </div>
                  <div className="planning-source-note">
                    <b>{planningLabel}</b>
                    <span>Food, seating, shopping and print quantities use this headcount.</span>
                  </div>
                </details>
                {s.guests.filter(g => /pie|dessert/i.test(g.dish)).length >=
                  3 && (
                  <div className="note-banner">
                    THREE DESSERT CONTRIBUTIONS · Consider assigning bread or
                    ice instead.
                  </div>
                )}
                {s.guests.filter(g => g.diet).length > 0 && (
                  <div className="note-banner">
                    DIETARY CHECK ·{' '}
                    {s.guests
                      .filter(g => g.diet)
                      .map(g => `${g.name}: ${g.diet}`)
                      .join(' · ')}
                    . Review ingredients before serving.
                  </div>
                )}
              </div>
            )}
            {tab === 'EXPERIENCE' && (
              <div className="content">
                <Section eyebrow="ACTIVITIES" title="Activities">
                  Choose a game, a conversation or something for the kids. Open an activity for the instructions and print sheet.
                </Section>
                <div className="panel glass-light activity-plan">
                  <h2>Your activity plan</h2>
                  {s.activities.length ? s.activities.map(name=>{const activity=activityByName(name);return <div className="activity-plan-row" key={name}><div><h3>{name}</h3><p>{activity ? `${activity.duration} · ${activity.when}` : 'Your own activity'}</p></div><button aria-label={`Remove activity ${name}`} onClick={()=>toggleActivity(name)}>REMOVE</button></div>}) : <p>Choose an activity below, or let dinner be enough.</p>}
                  <details className="inline-editor activity-custom"><summary>Add your own activity</summary><div className="guest-add"><input aria-label="Custom activity" placeholder="Add your own activity" value={newActivity} onChange={e=>setNewActivity(e.target.value)}/><button onClick={()=>{const name=newActivity.trim();if(name&&!s.activities.includes(name)){update('activities',[...s.activities,name]);setNewActivity('');}}}>ADD ACTIVITY</button></div></details>
                  <div className="activity-plan-actions"><button className="text-link" onClick={()=>navigate('TIMELINE','DAY OF')}>VIEW TIMELINE</button><button className="text-link" onClick={()=>navigate('PRINTABLES')}>VIEW PRINTABLES</button>{s.activities.length>0&&<button className="text-link" onClick={()=>toggleActivity('No activity needed')}>CLEAR ACTIVITIES</button>}</div>
                  {activitySupplies(s.activities,adults,kids).length>0&&<details className="activity-supplies inline-editor"><summary>Supplies for your group</summary>{activitySupplies(s.activities,adults,kids).map(item=><p key={item.name}>{item.count} {item.unit} · {item.name}</p>)}<p className="fine">These supplies are also in Shopping. Pencils are reused between games.</p></details>}
                </div>
                <div className="experience-grid activity-library">
                  {activityLibrary.map(activity=>{const added=activeActivities.includes(activity.name),people=activityPeople(activity,adults,kids);return <article key={activity.name} className={`experience-card activity-card ${added?'selected':''}`}>
                    <span className="eyebrow">{activity.audience} · {activity.duration}</span>
                    <h2>{activity.name}</h2><p>{activity.description}</p><p className="fine">{activity.when}{people ? ` · ${people} participants planned` : activity.audience==='Kids' ? ' · Add children in Guests to calculate supplies' : ''}</p>
                    <button className="activity-toggle" aria-pressed={added} aria-label={`${added?'Remove':'Add'} ${activity.name}${added?' from':' to'} your plan`} onClick={()=>toggleActivity(activity.name)}>{added?'IN YOUR PLAN · REMOVE':'ADD TO YOUR PLAN'}</button>
                    <details className="activity-details"><summary>How to play + prompts</summary><ol>{activity.instructions.map(step=><li key={step}>{step}</li>)}</ol><h3>{activity.name==='Thanksgiving bingo'?'Bingo squares':'Prompts'}</h3><ul>{activity.prompts.map(prompt=><li key={prompt}>{prompt}</li>)}</ul><h3>What you need</h3>{activity.supplies.map(supply=><p key={supply.name}>{people?supply.quantity(people):'—'} {supply.unit} · {supply.name}</p>)}<button className="text-link" onClick={()=>printActivity(activity)}><Printer size={14}/> PRINT ACTIVITY</button></details>
                  </article>})}
                </div>
                <details className="panel glass-light"><summary>Guest flow + host handoff</summary><ol className="guest-journey">{guestJourney.map(step=><li key={step}>{step}</li>)}</ol><CheckRow id="guide-water-refill">Assign someone to refill water</CheckRow><CheckRow id="guide-coffee-helper">Assign someone to make coffee</CheckRow><CheckRow id="guide-contribution-heat">Ask contributors whether dishes arrive hot, cold, or needing oven space</CheckRow><CheckRow id="guide-label-allergens">Check labels and ingredients before marking finished dishes for dietary needs</CheckRow></details>
                <div className="two-col">
                  <div className="panel">
                    <h2>Arrival plan</h2>
                    {[
                      'Choose a visible place for coats.',
                      'Set drinks away from the food line.',
                      'Put a small appetizer near the drinks station.',
                      'Keep the dining table clear while setting it.',
                      'Give guests a clear place to gather outside the kitchen.',
                    ].map((x, i) => (
                      <div className="numbered" key={x}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        {x}
                      </div>
                    ))}
                  </div>
                  <div className="panel">
                    <h2>Drinks</h2>
                    {select(
                      'Approach',
                      s.drink,
                      [
                        'Wine-focused',
                        'Full bar',
                        'Signature cocktail',
                        'No-alcohol-forward',
                        'Mixed',
                      ],
                      v => update('drink', v)
                    )}
                    <p className="fine">
                      Plan water, sparkling water and ice for everyone. Coffee
                      and tea belong beside dessert.
                    </p>
                    <div className="big-callout">
                      {s.drink === 'No-alcohol-forward' ? 0 : selected.some(d=>d.group==='Drink · Alcoholic'&&/wine/i.test(d.name))?Math.ceil(adultDrinkers * 0.5):0}{' '}
                      <small>APPROX. WINE / SPARKLING BOTTLES FOR DRINKERS</small>
                    </div>
                    <CheckRow id="coffee">
                      Set up coffee before dessert
                    </CheckRow>
                  </div>
                </div>
              </div>
            )}
            {tab === 'BUDGET' && (
              <div className="content">
                <Section eyebrow="BUDGET / SPEND" title="Your budget">
                  A clear estimate that changes as the plan changes.
                </Section>
                <div className="panel"><div className="budget-head"><div><span>RULE ESTIMATE</span><b>{money(estimated)}</b></div><div><span>ACTUAL SPEND</span><b>{money(actual)}</b></div></div><details className="inline-editor"><summary>Record actual spending</summary><div className="form-grid"><label className="field"><span>Purchase</span><input value={spendLabel} onChange={e=>setSpendLabel(e.target.value)}/></label><label className="field"><span>Amount paid</span><input type="number" min="0" step="0.01" value={spendAmount} onChange={e=>setSpendAmount(e.target.value)}/></label></div><button className="save-recipe-button" onClick={()=>{if(!spendLabel.trim()||!Number.isFinite(Number(spendAmount))||Number(spendAmount)<0)return;update('actualSpend',[...s.actualSpend,{id:uid('spend'),label:spendLabel,amount:Number(spendAmount)}]);setSpendLabel('');setSpendAmount('');}}>ADD PURCHASE</button></details>{s.actualSpend.map(x=><div className="budget-line" key={x.id}><span>{x.label}</span><b>{money(x.amount)}</b><button aria-label={`Remove purchase ${x.label}`} onClick={()=>update('actualSpend',s.actualSpend.filter(i=>i.id!==x.id))}>REMOVE</button></div>)}</div>
                <div className="budget-head">
                  <div>
                    <span className="eyebrow">TOTAL BUDGET</span>
                    <b>{money(s.budget)}</b>
                  </div>
                  <div>
                    <span className="eyebrow">PLANNED PURCHASES</span>
                    <b>{money(planned)}</b>
                  </div>
                  <div>
                    <span className="eyebrow">REMAINING</span>
                    <b className={planned > s.budget ? 'over' : ''}>
                      {money(s.budget - planned)}
                    </b>
                  </div>
                </div>
                <div className="two-col">
                  <div className="panel">
                    <h2>Where it goes</h2>
                    {Object.entries(estimates).map(([name, amount]) => (
                      <div className="budget-line" key={name}>
                        <span>{name}</span>
                        <div>
                          <span
                            style={{
                              width: `${Math.min(100, (amount / Math.max(planned, 1)) * 100)}%`,
                            }}
                          />
                        </div>
                        <b>{money(amount)}</b>
                      </div>
                    ))}
                    <p className="fine">
                      Illustrative estimates, not live store prices. Adjust for
                      local pricing and what you already own.
                    </p>
                  </div>
                  <div>
                    <div className="panel">
                      <h2>Save money</h2>
                      <p>
                        Borrow missing chairs instead of renting. Make the table
                        with existing glassware. Drop an extra appetizer if the
                        menu feels heavy.
                      </p>
                      <button
                        className="text-link"
                        onClick={() => navigate('SHOPPING')}
                      >
                        REVIEW WHAT YOU OWN <ArrowRight size={16} />
                      </button>
                    </div>
                    <div className="panel">
                      <h2>Spend it better</h2>
                      <p>
                        {s.budget - planned > 100
                          ? 'You have room for one stronger detail: better linens, a more generous floral arrangement, or a turkey upgrade.'
                          : 'Keep the edit tight. Candlelight and a clean serving plan will carry the room.'}
                      </p>
                      <button
                        className="text-link"
                        onClick={() => navigate('TABLE')}
                      >
                        REFINE THE TABLE <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === 'PRINTABLES' && (
              <div className="content">
                <Section eyebrow="09 / PRINTABLES" title="Printables">
                  Browse the complete collection by printable type. Original designs are ready to download; personalized items below use your plan. Print at 100% / actual size. The complete PDF includes full-quality artwork and cutting guides.
                </Section>
                <div className="panel printable-collection-intro">
                  <p>76 original designs · Print at actual size.</p>
                  <a className="text-link" href="/resources/printables/collection/thanksgiving-collection.pdf" download="Crow-Crown-Thanksgiving-Collection.pdf">DOWNLOAD THE COMPLETE COLLECTION <ArrowRight size={16} /></a>
                </div>
                <details className="panel glass-light"><summary>Print + staging checklist</summary><p>Print menus after dishes are confirmed. Place cards use guest names. Dish labels should show the actual dish and ingredient-checked allergens.</p><CheckRow id="guide-print-menu">Confirm the menu before printing</CheckRow><CheckRow id="guide-print-labels">Check ingredients before adding dietary labels</CheckRow><CheckRow id="guide-print-leftovers">Prepare leftover labels with dish, packed date/time and relevant allergens</CheckRow><CheckRow id="guide-print-run-sheet">Keep the kitchen run sheet private for the host and helpers</CheckRow></details>
                <div className="printable-categories">
                  {groupPrintables(printableCards).map(category => (
                    <details className="panel printable-category" key={category.id}>
                      <summary>
                        <img className="printable-thumbnail" src={category.src} alt={`${category.name} · collection preview`} width={1254} height={1254} loading="lazy" decoding="async" />
                        <div className="printable-category-copy">
                          <h2>{category.name}</h2>
                          <p className="fine">{category.description}</p>
                          <span className="eyebrow">{category.designs.length ? `${category.designs.length} design sheets` : 'Personalized from your guest list'}{category.cards.length ? ` · ${category.cards.length} from your plan` : ''}</span>
                        </div>
                        <ChevronDown className="printable-category-chevron" size={20} aria-hidden="true" />
                      </summary>
                      {category.designs.length > 0 && <div className="print-grid printable-design-grid">
                        {category.designs.map(item => (
                          <article className="print-card printable-design" key={item.page}>
                            <img src={item.src} alt={`${item.name} · original sheet ${item.page}`} width={218} height={286} loading="lazy" decoding="async" />
                            <h3>{item.name}</h3>
                            <p className="fine">Collection sheet {item.page} · Original artwork</p>
                            <a className="text-link" href={item.pdf} download={`Crow-Crown-${item.name.replace(/[^a-z0-9]+/gi,'-')}-${item.page}.pdf`}>DOWNLOAD PDF <ArrowRight size={16} /></a>
                          </article>
                        ))}
                      </div>}
                      {category.cards.length > 0 && <>
                        <h3 className="printable-plan-heading">Personalized from your plan</h3>
                        <p className="fine">Edit the details below, then print your personalized card. These use your current menu and guests.</p>
                        <div className="print-grid">
                          {category.cards.map(({ id, name, desc }) => (
                    <article className="print-card" key={id}>
                      <div className="paper">
                        <span>CROW & CROWN</span>
                        <h3>{name}</h3>
                        <p>{desc}</p>
                        <small>THANKSGIVING AT HOME · {thanksgiving.getFullYear()}</small>
                      </div>
                      <label className="field"><span>Title override</span><input aria-label={`Title for ${id}`} value={name} onChange={e=>update('printableOverrides',{...s.printableOverrides,[id]:{...s.printableOverrides[id],name:e.target.value}})}/></label>
                      <label className="field"><span>Detail override</span><textarea aria-label={`Detail for ${id}`} value={desc} onChange={e=>update('printableOverrides',{...s.printableOverrides,[id]:{...s.printableOverrides[id],desc:e.target.value}})}/></label>
                      <button onClick={()=>{const next={...s.printableOverrides};delete next[id];update('printableOverrides',next);}}>RESET TO PLAN</button>
                      <button onClick={() => printOne({name,desc})}>
                        <Printer size={16} /> PRINT / SAVE PDF
                      </button>
                    </article>
                          ))}
                        </div>
                      </>}
                      {category.id === 'places' && !category.cards.length && <p className="fine">Add guests in Guests to create your place cards.</p>}
                    </details>
                  ))}
                </div>
                <details className="panel printable-wrap-up">
                  <summary>After-party checklist</summary>
                  <div className="two-col">
                    <div>
                      <span className="eyebrow">PACKING + STORAGE</span>
                      {[
                        'Pack turkey and sides into shallow containers',
                        'Send guest portions home',
                        'Label what goes into the fridge or freezer',
                      ].map(x => (
                        <CheckRow key={x} id={x}>
                          {x}
                        </CheckRow>
                      ))}
                    </div>
                    <div>
                      <span className="eyebrow">FRIDAY MORNING</span>
                      {[
                        'Return borrowed pieces',
                        'Check rental pickup',
                        'Wash linens',
                        'Save favorite recipes for next year',
                      ].map(x => (
                        <CheckRow key={x} id={x}>
                          {x}
                        </CheckRow>
                      ))}
                    </div>
                  </div>
                  <p className="fine">
                    Refrigerate perishable food within two hours. Use a food
                    thermometer when reheating leftovers.
                  </p>
                  <button
                    className="text-link"
                    onClick={() => {
                      try {localStorage.setItem('cc-thanksgiving-archive',JSON.stringify(s));alert('Party saved on this device. Export the plan for a portable backup.');} catch {setStorageError('Party archive could not be saved. Export your plan.');}
                    }}
                  >
                    SAVE THIS PARTY <ArrowRight size={16} />
                  </button>
                  <button
                    className="text-link secondary"
                    onClick={() => {
                      try {const old=localStorage.getItem('cc-thanksgiving-archive');if(!old){alert('Save a party first.');return;}if(!confirm('Use the saved party as your current plan? Export your current plan first to keep it.'))return;setS({...normalizeState(JSON.parse(old),initial,dishes),dayMode:false});navigate('PARTY PLAN');}catch{setStorageError('Saved party could not be restored. The current plan was not changed.');}
                    }}
                  >
                    <RotateCcw size={16} /> USE SAVED PARTY
                  </button>
                </details>
              </div>
            )}
          </>
        )}
        {(tab === 'PARTY PLAN' || s.dayMode) && <details className="plan-settings"><summary>PLAN SETTINGS · IMPORT / EXPORT</summary><div className="plan-utility"><span>{s.planningMode}: {planningCount} people · {adults} adults · {kids} children · {adultDrinkers} drinkers</span><span>{saveStatus || (storageError ? 'NOT SAVED' : 'Saved on this device')}</span>
          <button onClick={() => {const blob=new Blob([JSON.stringify(s,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Crow-Crown-Thanksgiving-Plan.json';a.click();URL.revokeObjectURL(a.href);}}>EXPORT PLAN</button>
          <label className="import-plan">IMPORT PLAN<input type="file" accept=".json" onChange={async e=>{const f=e.target.files?.[0];if(!f)return;try {const restored=normalizeState(JSON.parse(await f.text()),initial,dishes);if(confirm('Replace this device’s current plan with the imported plan? Export your current plan first if you want to keep it.')){setS(restored);setCanSave(true);setStorageError('');}}catch {setStorageError('Import failed. Your current plan was not changed. Use a valid plan JSON file.');}e.target.value='';}} /></label>
        </div></details>}
      </main>
    </div>
  );

  function timelineItems(): [number, string, string][] { return buildTimeline(s, plan); }

}

export default App;
