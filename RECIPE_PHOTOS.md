# Recipe photo manifest

The built-in image generation tool produced 25 separate dish/drink illustrations, then a reference-led editorial revision of all 25. Existing suitable app photos are preserved; Home assets are untouched. No publisher recipe photographs are copied. Current editorial assets are local portrait JPEGs at 960px wide, without post-generation color/filter changes. The earlier square assets are retained as unused siblings for recovery.

Current generation brief (photorealistic-natural): one portrait 4:5 close editorial photograph of the named dish or drink. Use the owner’s rainbow-carrot and cast-iron chicken images as style references only: dark natural directional side light, rich shadows, intimate high-oblique crops, veined marble, imperfect stoneware/cast iron and restrained olive/slate linen. Center each dish for recognizable square thumbnail crops. Food dominates; avoid showroom kitchen panoramas, visible cabinetry handles, distant small bowls and excessive props. Preserve realistic irregular food texture, natural food colors and neutral whites. No text, people, collage, amber/sepia cast, beige filter, haze or global color grading. Each subject is generated separately; chicken must not appear in the turkey-breast illustration. These pictures illustrate the dish; publisher links provide the actual cooking authority. Exact per-image subject and prompt are recorded in RECIPE_PHOTO_PROMPTS.json.

| Catalog ID / subject | Final project path |
|---|---|
| turkey | public/resources/IMG_0835-1.jpeg |
| stuffing | public/resources/stuffing.png |
| potatoes | public/resources/mashed-potatoes.png |
| gravy | public/resources/pan-gravy.png |
| cranberry | public/resources/cranberry-sauce.png |
| rolls | public/resources/dinner-rolls.png |
| pie | public/resources/pumpkin-pie.png |
| mac | public/resources/mac-cheese.png |
| sweet | public/resources/sweet-potatoes.png |
| ba-dry-turkey | public/resources/IMG_0835-1.jpeg |
| ba-simple-stuffing | public/resources/stuffing.png |
| ba-mashed | public/resources/mashed-potatoes.png |
| ba-pumpkin-pie | public/resources/pumpkin-pie.png |
| ba-parker-rolls | public/resources/dinner-rolls.png |
| ba-roasted-sweet | public/resources/sweet-potatoes.png |
| fn-citrus-cranberry | public/resources/cranberry-sauce.png |
| greens | public/resources/recipes/green-bean-casserole-editorial.jpeg |
| fn-vegan-greenbean | public/resources/recipes/green-bean-casserole-editorial.jpeg |
| ba-greenbeans | public/resources/recipes/green-beans-mushrooms-editorial.jpeg |
| ba-honey-brussels | public/resources/recipes/brussels-sprouts-editorial.jpeg |
| guide-roast-sprouts | public/resources/recipes/brussels-sprouts-editorial.jpeg |
| allrecipes-corn | public/resources/recipes/corn-casserole-editorial.jpeg |
| allrecipes-broccoli-cheese | public/resources/recipes/broccoli-cheese-editorial.jpeg |
| fn-gf-cornbread | public/resources/recipes/skillet-cornbread-editorial.jpeg |
| ew-stuffed-squash | public/resources/recipes/stuffed-acorn-squash-editorial.jpeg |
| guide-apple | public/resources/recipes/apple-pie-editorial.jpeg |
| guide-sweet-mash | public/resources/recipes/sweet-potato-mash-editorial.jpeg |
| guide-gratin | public/resources/recipes/potato-gratin-editorial.jpeg |
| guide-mushroom | public/resources/recipes/mushroom-pot-pie-editorial.jpeg |
| guide-pecan | public/resources/recipes/pecan-pie-editorial.jpeg |
| guide-breast | public/resources/recipes/turkey-breast-editorial.jpeg |
| app | public/resources/recipes/ricotta-crostini-editorial.jpeg |
| signature-cocktail | public/resources/recipes/bourbon-cider-editorial.jpeg |
| kids-cider | public/resources/recipes/kids-cider-editorial.jpeg |
| sparkling-water | public/resources/recipes/water-editorial.jpeg |
| wine | public/resources/recipes/wine-editorial.jpeg |
| coffee-tea | public/resources/recipes/coffee-tea-editorial.jpeg |
| salad | public/resources/recipes/brussels-salad-editorial.jpeg |
| ba-fancy-cranberry | public/resources/recipes/jellied-cranberry-editorial.jpeg |
| reviewed-honey-carrots | public/resources/recipes/honey-carrots-editorial.jpeg |
| reviewed-asparagus | public/resources/recipes/roasted-asparagus-editorial.jpeg |
| reviewed-sausage-mushrooms | public/resources/recipes/sausage-mushrooms-editorial.jpeg |
| reviewed-cranberry-brie | public/resources/recipes/cranberry-brie-bites-editorial.jpeg |

Check every catalog photo path in tests/domain.cjs; custom image uploads retain precedence. Main image consumers are the selected menu, source library and recipe reader.


Recipe expansion adds 15 separate generated editorial illustrations, installed as `public/resources/recipes/*-expansion.jpeg`. The new spiced hot cider uses the existing matching cider illustration. No publisher photographs were copied, and none of these images establishes kitchen testing. Built-in image generation used close food crops, directional natural side light, neutral grey marble and tactile slate/olive linen with no amber/sepia grading. `RECIPE_EXPANSION_IMAGES.json` records each subject, installed path and shared prompt. Original images and Home remain unchanged.


## Editorial revision of the expansion images

Owner rejected the repeated centered cookbook composition of the 15 new illustrations. Edited those same dish images with the built-in image tool: asymmetrical crops, cropped plate edges, deliberate negative space, directional daylight/sculptural shadows, restrained ceramic/stone/metal materials, fewer cloths/ingredient bowls/herb props, and varied viewpoints per dish. Food identity remains recognizable; neutral whites/greys, natural food colors and deep blacks are preserved without amber/sepia grading. This does not change Home or the preceding 43 illustrations.

The recipe manifest uses versioned `*-expansion-editorial-v2.jpeg` assets. Earlier expansion images remain as recovery siblings. Exact per-image edit prompts and current installed paths are recorded in `RECIPE_EXPANSION_IMAGES.json`. These remain generated illustrations, not publisher photos or evidence of cooking.
