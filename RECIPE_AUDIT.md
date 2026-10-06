# Recipe completeness and planning audit

Checked October 6, 2026. Scope: the 54 linked publisher recipes and five built-in serving plans in the existing app. Each publisher page was opened and its original yield, measured ingredient list and method checked. These are original concise adaptations with links retained, not verbatim publisher reproductions or claims of kitchen testing. Personal recipe overrides remain customer-authored and are not replaced.

## Corrections

- Replaced the short planning summaries with ordered cooking instructions that include preparation, assembly, oven temperatures, doneness and applicable cooling. Supplied service instructions for the four drinks that previously lacked methods. Bakery rolls and four packaged drink plans are labelled serving plans.
- Added missing water for apple dough, starch slurry and egg wash; added egg-wash water to mushroom pie and measured turkey-breast seasonings. Added component allocation notes where aggregate groceries serve different stages.
- Apple pie now displays 540 minutes including dough chilling, maceration, baking and four-hour cooling. Sweet-potato mash total corrected to 170 minutes. Gratin allows warming, a full hour of infusion and assembly.
- Added turkey-breast bread drying as a 275°F oven stage. Added the gluten-free cornbread skillet preheat at 425°F before baking at 375°F; the ten-minute preheat reservation is a planning estimate, not a publisher-specified duration.
- Added dry brining twelve hours before turkey preparation, both roll rises, apple dough chilling/maceration/freezing, gratin infusion and mousse/mold chilling transitions to timed tasks. Cooking/oven/cooling durations never scale with guest count; additional pans/birds reserve their own source-size slots.
- Source seasonings, greasing and supplies now generate deduplicated, attributed pantry checks in Shopping. No quantity or price is invented for an unmeasured check. Missing stock can be added as a measured manual purchase.
- Recipes open directly from Prep. Ingredients, pantry checks, source-batch allocations and cooking steps appear in the same reader. Incomplete drinks can no longer bypass readiness and generate unsupported shopping/tasks.
- Poultry/stuffing instructions use the USDA 165°F thermometer check as a conservative adaptation instead of the publishers' lower-temperature methods. Components of stuffing may be prepared ahead, but egg-containing stuffing is assembled immediately before baking. Sources: [USDA temperature chart](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart), [USDA stuffing guidance](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/stuffing-and-food-safety).

## Verification

The frozen source-batch measurements in tests/fixtures/recipe-audit.json are checked against production records. Catalogue integration tests cover all 59 entries at exact and overflow yields, grocery conversion, batch reservations, prep/timeline IDs, purchased/guest-provided exclusions, deduplicated pantry requirements, brine/rise/cooling dependencies and missing drink methods. Existing tests cover headcount changes, dietary logic, manual shopping locks, account isolation, cloud conflicts and purchase/password code. React tests exercise actual readers, pantry rows and direct Prep access. These checks establish implementation behavior; they do not establish kitchen results, physical iPhone appearance or unresolved purchase-email delivery.

The separate unified recipe-library page and newer Home typography work on main were merged before publication. Do not restore the older duplicate library/serving grids while continuing this audit.

Ratings remain dated snapshots of publisher scores and review counts, not live ratings or an assertion of the highest score on the internet. Existing publisher choices, dietary labels and photos remain intact.

## Publisher records checked

| Record | Recipe source |
| --- | --- |
| mac | [Baked mac + cheese](https://www.allrecipes.com/recipe/11679/homemade-mac-and-cheese/) |
| app | [Whipped ricotta + crostini](https://www.forkinthekitchen.com/whipped-ricotta-with-herbs-and-honey/) |
| ba-dry-turkey | [Dry-brined turkey + honey glaze](https://www.bonappetit.com/recipe/dry-rubbed-roast-turkey) |
| ba-simple-stuffing | [Simple-Is-Best stuffing](https://www.bonappetit.com/recipe/simple-is-best-stuffing-dressing) |
| ba-mashed | [BA’s Best mashed potatoes](https://www.bonappetit.com/recipe/best-mashed-potatoes) |
| ba-honey-brussels | [Charred Brussels sprouts + warm honey glaze](https://www.bonappetit.com/recipe/roasted-brussels-sprouts-with-warm-honey-glaze) |
| ba-greenbeans | [Green beans + mushrooms + crispy shallots](https://www.bonappetit.com/recipe/green-beans-and-mushrooms-with-crispy-shallots) |
| ba-pumpkin-pie | [BA’s Best pumpkin pie](https://www.bonappetit.com/recipe/best-pumpkin-pie) |
| ba-parker-rolls | [Soft homemade dinner rolls](https://sallysbakingaddiction.com/soft-dinner-rolls/) |
| ba-roasted-sweet | [Roasted sweet potatoes](https://cookieandkate.com/roasted-sweet-potatoes-recipe/) |
| ba-fancy-cranberry | [Fancy jellied cranberry sauce](https://www.bonappetit.com/recipe/fancy-cranberry-sauce) |
| allrecipes-corn | [Creamy corn casserole](https://www.allrecipes.com/recipe/18906/awesome-and-easy-creamy-corn-casserole/) |
| allrecipes-broccoli-cheese | [Broccoli + cheese casserole](https://www.allrecipes.com/recipe/13606/awesome-broccoli-cheese-casserole/) |
| fn-vegan-greenbean | [Vegan green bean casserole](https://minimalistbaker.com/vegan-green-bean-casserole/) |
| fn-gf-cornbread | [Gluten-free skillet cornbread](https://www.dishbydish.net/gluten-free-skillet-cornbread/) |
| ew-stuffed-squash | [Wild rice–stuffed acorn squash](https://www.budgetbytes.com/wild-rice-stuffed-acorn-squash/) |
| fn-citrus-cranberry | [Citrus cranberry sauce](https://www.onceuponachef.com/recipes/cranberry-sauce.html) |
| signature-cocktail | [Apple cider bourbon cocktail](https://www.pookspantry.com/apple-cider-bourbon-cocktail/) |
| turkey | [Spatchcocked turkey + gravy](https://www.seriouseats.com/butterfiled-roast-turkey-with-gravy-recipe) |
| guide-breast | [Herb-roasted turkey breast + stuffing](https://www.seriouseats.com/roast-turkey-breast-stuffing-recipe) |
| stuffing | [Sage and sausage dressing](https://www.seriouseats.com/classic-sage-and-sausage-stuffing-or-dressing-recipe) |
| greens | [Homemade green bean casserole](https://www.seriouseats.com/homemade-green-bean-casserole-recipe) |
| cranberry | [Cranberry sauce](https://www.seriouseats.com/the-food-lab-thanksgiving-special-the-worlds-easiest-cranberry-sauce) |
| potatoes | [Ultra-fluffy mashed potatoes](https://www.seriouseats.com/ultra-fluffy-mashed-potatoes-recipe) |
| gravy | [Basic turkey gravy](https://www.seriouseats.com/basic-turkey-gravy-thanksgiving-recipe) |
| salad | [Shaved Brussels salad with hazelnuts + goat cheese](https://www.seriouseats.com/salt-wilted-brussels-sprout-salad-recipe-8746808) |
| pie | [Extra-smooth pumpkin pie](https://www.seriouseats.com/extra-smooth-pumpkin-pie-recipe) |
| guide-roast-sprouts | [Roasted Brussels sprouts](https://www.seriouseats.com/easy-roasted-brussels-sprouts-food-lab-recipe) |
| sweet | [Roasted sweet potatoes](https://www.seriouseats.com/the-best-roasted-sweet-potatoes-thanksgiving-sides-the-food-lab-recipe) |
| guide-apple | [BA’s Best Apple Pie](https://www.bonappetit.com/recipe/best-apple-pie) |
| guide-sweet-mash | [Brown-butter mashed sweet potatoes](https://www.seriouseats.com/the-best-mashed-sweet-potatoes-recipe) |
| guide-gratin | [Rich and silky potato gratin](https://www.seriouseats.com/classic-potato-gratin-recipe) |
| guide-mushroom | [Vegetarian mushroom pot pie](https://www.seriouseats.com/vegetarian-mushroom-pot-pie-recipe-11847075) |
| guide-pecan | [Classic pecan pie](https://www.allrecipes.com/recipe/18433/irresistible-pecan-pie/) |
| reviewed-honey-carrots | [Honey-roasted carrots](https://www.allrecipes.com/recipe/214079/honey-roasted-carrots/) |
| reviewed-asparagus | [Garlic + Parmesan roasted asparagus](https://www.allrecipes.com/recipe/214931/oven-roasted-asparagus/) |
| reviewed-sausage-mushrooms | [Sausage-stuffed mushrooms](https://www.allrecipes.com/recipe/234844/easy-sausage-stuffed-mushrooms/) |
| reviewed-cranberry-brie | [Cranberry + brie pastry bites](https://www.melskitchencafe.com/cranberry-brie-bites/) |
| expanded-deviled-eggs | [Classic deviled eggs](https://www.allrecipes.com/recipe/222589/simple-deviled-eggs/) |
| expanded-spinach-dip | [Hot spinach + artichoke dip](https://www.allrecipes.com/recipe/26819/hot-artichoke-and-spinach-dip-ii/) |
| expanded-soup | [Butternut squash soup](https://www.onceuponachef.com/recipes/butternut-squash-soup.html) |
| expanded-ham | [Honey-glazed ham](https://www.allrecipes.com/recipe/14745/honey-glazed-ham/) |
| expanded-sweet-casserole | [Sweet potato + pecan casserole](https://www.allrecipes.com/recipe/21261/yummy-sweet-potato-casserole/) |
| expanded-cauliflower | [Garlic + Parmesan cauliflower](https://www.allrecipes.com/recipe/54675/roasted-garlic-cauliflower/) |
| expanded-spinach | [Lemon + nutmeg creamed spinach](https://www.allrecipes.com/recipe/234938/fast-and-easy-creamed-spinach/) |
| expanded-almondine | [Green beans almondine](https://www.melskitchencafe.com/easy-green-beans-almondine/) |
| expanded-rice-salad | [Wild rice + cranberry apple salad](https://www.onceuponachef.com/recipes/wild-rice-salad-with-dried-cranberries-apples-orange-vinaigrette.html) |
| expanded-muffins | [Honey cornbread muffins](https://www.onceuponachef.com/recipes/cornbread-muffins.html) |
| expanded-cranberry-bread | [Cranberry orange + walnut bread](https://www.onceuponachef.com/recipes/cranberry-nut-bread.html) |
| expanded-apple-crisp | [Apple + oat crisp](https://www.allrecipes.com/recipe/12409/apple-crisp-ii/) |
| expanded-bread-pudding | [Cinnamon vanilla bread pudding](https://www.allrecipes.com/recipe/7177/bread-pudding-ii/) |
| expanded-cheesecake | [Double-layer pumpkin cheesecake](https://www.allrecipes.com/recipe/13477/double-layer-pumpkin-cheesecake/) |
| expanded-mousse | [Chocolate mousse cups](https://www.onceuponachef.com/recipes/chocolate-mousse.html) |
| expanded-hot-cider | [Maple + citrus spiced cider](https://www.allrecipes.com/recipe/9501/hot-apple-cider/) |

Five source-free serving plans: rolls, sparkling-water, wine, kids-cider, coffee-tea. They retain per-person quantities and explicitly defer package/brewing directions where product-specific details vary.


### Completed reference ideas — October 6
Four additional operational recipes live in referenceRecipes.ts; previously imported ideas are retained once in the unified library. Ingredient measurements were checked against the linked publisher recipes on October 6. Recipe prose is a concise original adaptation, not copied publisher directions. Whole batches retain source-size oven durations; source yield, equipment, dietary labels, pantry checks and advance phases are included. Illustrations are generated dish depictions, not publisher photographs. No kitchen-testing claim.

- Brined roast turkey: https://altonbrown.com/recipes/good-eats-roast-thanksgiving-turkey/ — one 14–16 lb turkey/10 planned servings; full diluted brine; poultry adaptation to 165°F. Source method's cinnamon is omitted because not in its ingredient list. Brine times sit outside the 210-minute day-of estimate.
- Vegetarian dressing: https://www.seriouseats.com/best-vegan-stuffing-thanksgiving-recipe-vegetarian — 10 planned servings; source 10–14; pecans/wheat flagged; ready-made vegetable stock selected as adaptation. Oven drying and final casserole baking are separate stages.
- Tarragon beans: https://frostedkale.com/tarragon-green-beans/ — 8 side servings; attribution retained to reproduced Martha Stewart recipe. Original Martha menu's green-bean link currently redirects to caramelized shallots, which is not this dish.
- Galette: https://www.bonappetit.com/recipe/salted-butter-apple-galette-with-maple-whipped-cream plus https://www.bonappetit.com/recipe/basic-tart-dough — one galette/8 servings; 4.0/405 ratings checked; dough included and 2-hour chilling scheduled.
