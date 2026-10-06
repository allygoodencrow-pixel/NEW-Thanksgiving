import type { Dish } from './App';

// Original, concise cooking instructions checked against each linked publisher on
// 2026-10-06. Quantities live in the ingredient records, not in this prose.
// These are runnable adaptations; optional publisher variations are not selected.
const methods: Record<string, string[]> = {
  mac: [
    'Heat the oven to 350°F. Cook pasta in salted boiling water about 8 minutes; drain while still firm.',
    'For one source batch, melt 4 tablespoons butter. Whisk in flour; stir 3–5 minutes. Gradually whisk in milk, simmer until smooth, then melt in Cheddar and Parmesan. Add reserved milk if needed.',
    'Fold in pasta and transfer to an 8-inch baking dish. Brown breadcrumbs in the remaining butter; scatter over pasta with paprika.',
    'Bake about 30 minutes, until bubbling and golden. Rest briefly before serving.'
  ],
  app: [
    'Heat the oven to 375°F. Slice baguette, brush lightly with olive oil and toast 5–7 minutes, turning halfway, until crisp.',
    'Whip ricotta about 2 minutes until airy. Mix in olive oil, herbs, lemon zest, honey and salt to taste.',
    'Transfer to a serving bowl. Serve with toasted bread; keep ricotta refrigerated until service.'
  ],
  'ba-dry-turkey': [
    'Pat turkey dry. Rub the measured salt and brown sugar over it; refrigerate uncovered 12–48 hours.',
    'Heat oven to 450°F. For each bird, put 4 tablespoons butter beneath the skin and 4 outside. Place on a rack in a roasting pan; roast 30 minutes.',
    'Simmer vinegar, honey, Worcestershire, rosemary, garlic and orange zest with remaining butter for 5 minutes.',
    'Reduce oven to 300°F; brush with glaze every 30 minutes and add pan water as needed. Allow 65–85 minutes more; continue until breast, thigh and wing reach 165°F.',
    'Rest 30–60 minutes before carving.'
  ],
  'ba-simple-stuffing': [
    'Heat oven to 250°F. Tear bread onto trays; dry about 60 minutes, stirring occasionally. Cool.',
    'Cook onion and celery in butter about 10 minutes. Combine with bread, herbs, seasonings and half the broth; cool before adding eggs.',
    'Whisk eggs with remaining broth and fold into bread. Transfer to a buttered 9-by-13-inch dish; cover.',
    'Bake at 350°F for 35–40 minutes, then uncover for 35–45 minutes, until browned and the center reaches 165°F. Rest before serving.'
  ],
  'ba-mashed': [
    'Cover whole potatoes with cold salted water by an inch. Bring to a boil; simmer 30–35 minutes until tender. Drain, peel and rice while hot.',
    'Warm milk and cream with garlic and rosemary for about 5 minutes; strain out aromatics.',
    'Fold butter and measured salt into potatoes. Gradually fold in warm dairy until smooth; do not beat. Serve warm.'
  ],
  'ba-honey-brussels': [
    'Heat oven and a rimmed tray to 450°F. Trim and halve sprouts; toss with oil and salt to taste. Arrange cut sides down.',
    'Roast 20–25 minutes until deeply browned and tender.',
    'Bubble honey in a saucepan 3–4 minutes. Remove from heat before carefully adding vinegar; it may spit. Add butter and measured salt; simmer 3–4 minutes.',
    'Toss sprouts with glaze, scallions and lemon zest. Serve immediately.'
  ],
  'ba-greenbeans': [
    'Blanch trimmed beans in boiling salted water 2 minutes; rinse cold and drain.',
    'Fry sliced shallots in oil 6–8 minutes until golden. Lift out and drain; reserve the oil.',
    'Brown sliced mushrooms in the skillet about 8 minutes. Add butter, beans and seasoning; cook about 5 minutes until hot.',
    'Add vinegar and cook 1 minute. Finish with Parmesan and crisp shallots.'
  ],
  'ba-pumpkin-pie': [
    'Roll dough into a 14-inch round; fit a 9-inch plate, leaving a 1-inch overhang. Fold and crimp; chill 30 minutes.',
    'Line with parchment and pie weights. Bake at 425°F for 25–35 minutes. Remove weights; brush crust with one beaten egg. Bake at 350°F another 10–15 minutes; cool.',
    'Whisk pumpkin, dairy, maple syrup, vanilla, sugar, spices, salt, remaining whole eggs and extra yolk. Pour into crust.',
    'Bake at 325°F for 60–75 minutes until edges set and center gently jiggles. Cool at least 3 hours; refrigerate.'
  ],
  'ba-parker-rolls': [
    'Warm milk to about 110°F. Mix with yeast and half the sugar; wait 5 minutes until foamy.',
    'Add remaining sugar, egg, butter, salt and flour. Mix 2 minutes, then knead about 5 minutes until elastic.',
    'Cover and rise 1–2 hours until doubled. Divide into 14–16 rolls and arrange in a greased 9-by-13-inch pan.',
    'Cover and rise about 1 hour until puffy. Bake at 350°F for 20–25 minutes; rotate and tent with foil if browning early.',
    'Cool briefly before serving.'
  ],
  'ba-roasted-sweet': [
    'Heat oven to 425°F. Scrub or peel potatoes and cut into even cubes.',
    'Toss with oil and measured salt. Spread in a single layer on a rimmed tray.',
    'Roast 30–40 minutes, turning halfway, until browned outside and tender inside. Serve hot.'
  ],
  'ba-fancy-cranberry': [
    'Reserve a few cranberries for garnish. Sprinkle gelatin over warm water; stand 10 minutes.',
    'Simmer remaining berries with juice, most of the sugar, cardamom, bay leaves and a pinch of salt 10–12 minutes until berries burst.',
    'Remove bay and cardamom. Stir in gelatin until dissolved; pour into a lightly greased 4-cup mold.',
    'Refrigerate at least 12 hours. Dip mold briefly in warm water and invert onto a platter.',
    'Toss reserved berries with remaining sugar and orange zest; scatter on top.'
  ],
  'allrecipes-corn': [
    'Heat oven to 350°F. Grease a 9-inch square baking dish.',
    'Drain whole-kernel corn. Mix it with creamed corn, muffin mix, sour cream, melted butter and beaten eggs until combined.',
    'Spread into the dish. Bake about 45 minutes until golden and set in the center.',
    'Rest briefly; serve warm. If prepared ahead, refrigerate after cooling and reheat thoroughly before service.'
  ],
  'allrecipes-broccoli-cheese': [
    'Heat oven to 350°F. Grease a 9-by-13-inch baking dish.',
    'Mix condensed soup, mayonnaise, beaten egg and chopped onion. Separate frozen broccoli pieces and fold into the mixture with cheese.',
    'Spread evenly in the dish. Bake 45–60 minutes until bubbling and hot throughout.',
    'Rest briefly before serving.'
  ],
  'fn-vegan-greenbean': [
    'Heat oven to 400°F. Blanch trimmed beans in boiling salted water 5 minutes; chill in ice water and drain.',
    'Cook shallot and garlic in olive oil 2–3 minutes. Add sliced mushrooms; cook 3–4 minutes.',
    'Stir in flour for 1 minute. Gradually add broth and almond milk; cook 5–7 minutes until thickened. Season.',
    'Fold in beans and half the fried onions. Transfer to a baking dish, top with remaining onions and bake 15 minutes until bubbling.'
  ],
  'fn-gf-cornbread': [
    'Heat oven to 425°F with a 10-inch cast-iron skillet inside. Whisk cornmeal, gluten-free flour, sugar, baking powder, salt and xanthan gum if the flour blend lacks it.',
    'Whisk milk, eggs and oil, reserving 1 tablespoon oil per batch for the skillet. Stir wet into dry just until combined.',
    'Carefully oil the hot skillet and pour in batter. Reduce oven to 375°F; bake 25–30 minutes until a center tester comes out clean.',
    'Cool 10–15 minutes before cutting.'
  ],
  'ew-stuffed-squash': [
    'Simmer rice in broth, covered, about 45 minutes until tender. Heat oven to 400°F.',
    'Halve and seed squash. Brush cut surfaces with half the butter; season. Roast cut sides up 20 minutes.',
    'Cook onion in remaining butter; add celery, then diced apple, sage and thyme. Stir until softened.',
    'Mix vegetables with rice, walnuts, cranberries and parsley. Fill squash halves.',
    'Roast another 20 minutes until squash is tender and filling is hot.'
  ],
  'fn-citrus-cranberry': [
    'Bring water, orange juice and sugar to a boil, stirring to dissolve sugar.',
    'Add cranberries, orange zest and a pinch of salt. Simmer 10–12 minutes until berries burst and sauce thickens.',
    'Cool, then refrigerate until chilled. Stir before serving.'
  ],
  'signature-cocktail': [
    'Mix the sugars, cinnamon and half the nutmeg on a saucer. Moisten glass rims with lemon and dip in the mixture.',
    'Add apple cider, bourbon and remaining nutmeg to an ice-filled shaker. Shake vigorously about 10 seconds.',
    'Strain into the prepared glasses. One original batch makes two drinks; mix additional batches separately.'
  ],
  turkey: [
    'Heat oven to 450°F. Remove the backbone with poultry shears; flatten bird. Reserve backbone, neck and giblets.',
    'Spread two-thirds of vegetables and thyme in a tray beneath a rack. Oil and season turkey; roast on rack about 80 minutes, until breast, thigh and wing reach 165°F.',
    'Meanwhile brown reserved turkey pieces in remaining oil 5 minutes, add remaining vegetables for 5 minutes, then stock, remaining thyme and bay leaves; simmer 45 minutes and strain.',
    'Cook butter and flour 3 minutes; whisk in stock and reduce about 20 minutes. Rest turkey 20 minutes; add skimmed juices to gravy.'
  ],
  'guide-breast': [
    'Cube bread; dry on trays at 275°F about 50 minutes, tossing occasionally. Cool. Raise oven to 450°F.',
    'Cook sausage in 5 tablespoons butter per batch 8 minutes; add vegetables, garlic and half the sage for 10 minutes. Toss with bread, parsley and half the stock.',
    'Whisk eggs with remaining stock; fold into cooled bread. Spread in a buttered roasting pan.',
    'Rub breast with remaining butter, herbs and seasoning. Roast over stuffing 45 minutes, then on a rack 30 minutes more; check poultry reaches 165°F.',
    'Rest turkey 20 minutes. Meanwhile bake stuffing about 15 minutes more to 165°F. Carve and serve.'
  ],
  stuffing: [
    'Heat oven to 275°F. Cube bread; dry on trays about 50 minutes, tossing occasionally. Cool.',
    'Brown sausage in butter about 8 minutes. Cook onion, celery, garlic and sage with it about 10 minutes.',
    'Toss bread with sausage mixture, parsley and half the stock. Cool; whisk eggs with remaining stock and fold in. Season.',
    'Transfer to a buttered dish. Bake covered at 350°F for 45 minutes, then uncovered 15–20 minutes until crisp and center reaches 165°F.',
    'Rest 5 minutes. Prepare components ahead; assemble with eggs immediately before baking.'
  ],
  greens: [
    'Fry sliced shallots in oil until golden, about 20 minutes. Drain on towels and cool 45 minutes; reserve 2 tablespoons oil per batch.',
    'Cook chopped mushrooms in reserved oil and butter 6–10 minutes. Add garlic for 30 seconds and flour for 1–2 minutes.',
    'Add stock, cream, soy sauce and lemon; simmer about 5 minutes until thick.',
    'Blanch beans 5 minutes, chill in ice water and drain. Mix with sauce and half the shallots.',
    'Bake at 350°F for 15–20 minutes until bubbling; add remaining shallots.'
  ],
  cranberry: [
    'Bring water, sugar, orange juice, orange zest, cinnamon stick and a pinch of salt to a boil, stirring to dissolve.',
    'Add cranberries. Simmer about 10 minutes, stirring occasionally, until berries burst and sauce thickens.',
    'Remove cinnamon and zest strips. Transfer to a bowl; cool and refrigerate. Serve chilled or at room temperature.'
  ],
  potatoes: [
    'Peel potatoes, cut into 1–2-inch chunks and rinse until water runs clear. Cover with cold salted water; bring to a boil.',
    'Simmer about 15 minutes until completely tender. Drain, rinse briefly with hot water and let steam dry 1 minute.',
    'Rice potatoes while hot. Fold in butter, followed by warmed milk until smooth.',
    'Season and serve hot. Avoid beating or blending, which makes potatoes gummy.'
  ],
  gravy: [
    'Melt butter in a saucepan. Whisk in flour and cook about 2 minutes, stirring, until pale golden.',
    'Gradually whisk in stock so no lumps remain. Bring to a simmer and cook 10–15 minutes until thick enough to coat a spoon.',
    'Season with salt and pepper. Keep warm, stirring occasionally; thin with a little water if necessary.'
  ],
  salad: [
    'Finely shave sprouts. Massage half with salt for 2 minutes, add tangerine juice and refrigerate 15 minutes.',
    'Whisk zest, shallot, Dijon, vinegar and olive oil into a dressing.',
    'Toast hazelnuts about 4 minutes in a dry skillet; cool and crush.',
    'Squeeze excess liquid from marinated sprouts. Toss with remaining raw sprouts, dressing, nuts and cheese. Season and serve.'
  ],
  pie: [
    'Heat oven to 425°F. Fit crust to a pie plate, line and weight it. Bake 15 minutes; remove weights and bake 10 minutes more. Cool.',
    'Blend sugar, spices, cream cheese, pumpkin and butter until smooth. Add eggs; blend briefly, then strain filling.',
    'Reduce oven to 350°F. Pour filling into crust and tap to remove bubbles.',
    'Bake 30–35 minutes until edges set and center gently jiggles. Cool at least 1 hour; refrigerate once cooled.'
  ],
  'guide-roast-sprouts': [
    'Place a rimmed tray on an upper oven rack and heat oven to 500°F.',
    'Trim and halve sprouts. Toss with olive oil and salt and pepper.',
    'Carefully arrange cut sides down on the hot tray. Roast about 20 minutes until deeply browned and tender.',
    'Serve hot, adjusting seasoning to taste.'
  ],
  sweet: [
    'Peel sweet potatoes and cut evenly. Hold in a 160°F water bath about 1 hour; drain well.',
    'Heat oven to 400°F. Toss potatoes with half the oil and salt and pepper. Arrange in one layer.',
    'Roast about 30 minutes, turn, then roast 20 minutes more until browned and tender.',
    'Toss with remaining oil, parsley and honey. Serve warm.'
  ],
  'guide-apple': [
    'Cut cold butter into flour, sugar and salt; add vinegar and cold water to form dough. Divide, flatten, wrap and chill 2 hours.',
    'Slice apples; macerate with sugar, salt, spices and lemon 1 hour. Drain, reserving juice.',
    'Reduce cider with vanilla seeds and pod by two-thirds; remove pod. Add apple juice; reduce to half a cup per batch. Thicken with cornstarch mixed with water; cool.',
    'Roll dough; line pie plate. Add apples, syrup and butter; cover, seal and vent. Brush with egg and water; sprinkle demerara. Freeze 10 minutes.',
    'Bake at 375°F for 90–120 minutes until bubbling. Cool 4 hours.'
  ],
  'guide-sweet-mash': [
    'Wrap sweet potatoes with six thyme sprigs per batch in foil. Place in a cold oven; set to 300°F and roast 90–105 minutes until tender.',
    'Unwrap, increase to 400°F and roast about 30 minutes more. Cool 20 minutes, then peel.',
    'Brown butter in a saucepan about 10 minutes. Add maple syrup and remaining thyme.',
    'Mash potatoes with browned butter mixture; season. Serve warm.'
  ],
  'guide-gratin': [
    'Warm cream and milk with garlic, shallots, thyme and seasonings; cover off heat and steep 1 hour. Strain.',
    'Heat oven to 350°F. Slice peeled potatoes about 1/16 inch thick; toss immediately with warm dairy.',
    'Layer potatoes in a buttered dish with half the cheese. Pour remaining dairy over them; cover.',
    'Bake 60 minutes. Uncover, add remaining cheese and bake 15–20 minutes until browned and tender.',
    'Rest 30 minutes before cutting.'
  ],
  'guide-mushroom': [
    'Heat oven to 425°F. Toss fresh mushrooms with oil, salt and pepper; roast about 20 minutes.',
    'Microwave dried porcini in water 3–5 minutes until steaming; carefully blend into broth.',
    'Cook onion in butter 3–4 minutes; add root vegetables for 5 minutes, herbs and miso for 1 minute, then flour for 2 minutes.',
    'Stir in broth and milk; simmer 2 minutes. Add roasted mushrooms; transfer to a baking dish.',
    'Cover with rolled pastry; seal, vent and brush with egg mixed with water. Bake about 25 minutes until golden. Rest 5 minutes.'
  ],
  'guide-pecan': [
    'Cut cold crust butter into flour, sugar and salt; add cold water just until dough holds together. Wrap and chill while preparing filling.',
    'Whisk eggs, syrups, brown sugar, melted filling butter and a pinch of salt; stir in crushed nuts.',
    'Roll dough and fit a pie plate. Scatter chopped pecans in crust; pour in filling and arrange pecan halves on top.',
    'Bake at 350°F about 60 minutes until filling is set. Cool at least 1 hour before slicing.'
  ],
  'reviewed-honey-carrots': [
    'Heat oven to 350°F. Peel and trim carrots; arrange in a baking dish.',
    'Toss with oil and honey, coating evenly. Season with salt and pepper.',
    'Roast about 30 minutes until fork-tender. Larger carrots may take longer; turn for even coating.',
    'Serve warm with the pan juices.'
  ],
  'reviewed-asparagus': [
    'Heat oven to 425°F. Snap off woody asparagus ends and dry the spears.',
    'Toss with oil, garlic, Parmesan, salt and pepper. Arrange in one layer on a tray.',
    'Roast 12–15 minutes until tender; thinner spears finish sooner.',
    'Drizzle with lemon juice and serve immediately.'
  ],
  'reviewed-sausage-mushrooms': [
    'Heat oven to 350°F. Remove mushroom stems; chop stems and reserve caps.',
    'Cook sausage, onion and chopped stems 4–6 minutes until sausage is cooked. Drain excess fat.',
    'Stir in three-quarters of the Parmesan, breadcrumbs, garlic and parsley; cook 3–5 minutes until combined.',
    'Fill caps and arrange on a tray. Bake 12 minutes; top with remaining Parmesan and bake about 3 minutes more.',
    'Serve hot.'
  ],
  'reviewed-cranberry-brie': [
    'Heat oven to 375°F. Grease a 24-cup mini muffin pan; place a foil-lined tray underneath to catch drips.',
    'Roll pastry on a floured surface to 10 by 14 inches; cut 24 squares. Press into muffin cups.',
    'Cut brie into 24 pieces. Put a piece in each cup with prepared cranberry sauce, chopped pecans and small pinches of brown sugar and salt.',
    'Bake 18–20 minutes until pastry is golden and cheese melts. Cool 2–3 minutes before removing.',
    'This adaptation uses prepared cranberry sauce, not the optional homemade sauce.'
  ],
  'expanded-deviled-eggs': [
    'Use fully hard-boiled eggs. If starting raw, cover eggs with cold water, bring to a boil, cover off heat 12 minutes, then cool in ice water before peeling.',
    'Halve eggs lengthwise. Scoop yolks into a bowl and mash with mayonnaise, sugar, mustard, vinegar, finely chopped onion and celery until combined.',
    'Season with the measured salt; spoon or pipe the filling into the whites.',
    'Dust with paprika. Refrigerate until serving; arrange on a chilled platter.'
  ],
  'expanded-spinach-dip': [
    'Heat oven to 350°F. Thaw spinach and squeeze very dry. Drain and chop artichokes.',
    'Mix softened cream cheese, mayonnaise, Parmesan, Romano, garlic, basil, salt and pepper. Fold in spinach and artichokes.',
    'Spread into a small baking dish and scatter mozzarella over the top.',
    'Bake about 25 minutes until hot and lightly browned. Serve warm with the serving accompaniments listed in your plan.'
  ],
  'expanded-soup': [
    'Peel and seed squash; cube evenly. Chop onion, pepper and garlic.',
    'Combine vegetables with water, sugar and measured salt in a pot. Bring to a boil, cover and simmer about 35 minutes until squash is soft.',
    'Blend with an immersion blender until smooth. If using a jug blender, work in small batches and vent the lid.',
    'Stir in cream and thyme; heat gently to a simmer. Season with salt and pepper and serve hot.'
  ],
  'expanded-ham': [
    'Use a fully cooked ham and follow its reheating label. Heat oven to 325°F; line a roasting pan with foil.',
    'Score the ham and stud with cloves. Warm honey, butter and corn syrup in a double boiler until combined.',
    'Brush ham with glaze. Bake about 75 minutes, basting every 10–15 minutes, until reheated to the package-specified temperature.',
    'Broil 4–5 minutes to caramelize, watching constantly to prevent burning.',
    'Rest briefly, slice and serve with pan juices.'
  ],
  'expanded-sweet-casserole': [
    'Heat oven to 325°F. Boil peeled, cubed sweet potatoes 10–15 minutes until tender; drain and mash.',
    'Mix with eggs, white sugar, milk, vanilla, salt and filling butter. Spread into a baking dish.',
    'Combine brown sugar and flour; rub in topping butter, then stir in chopped pecans. Scatter over potatoes.',
    'Bake about 30 minutes until topping is golden and center is hot and set. Rest before serving.'
  ],
  'expanded-cauliflower': [
    'Heat oven to 450°F. Cut cauliflower into even florets; dry thoroughly.',
    'Toss with olive oil, garlic, salt and pepper. Spread in one layer on a rimmed tray.',
    'Roast about 25 minutes, turning halfway, until tender and browned.',
    'Add Parmesan and parsley. Broil 3–5 minutes, watching closely, until cheese colors. Serve hot.'
  ],
  'expanded-spinach': [
    'Heat olive oil in a large pot. Add spinach, cover 1 minute, then stir uncovered about 2 minutes until wilted.',
    'Drain, squeeze dry and chop. Cook shallot in butter 3–4 minutes until soft.',
    'Add cream, salt, pepper, cayenne and nutmeg; simmer about 5 minutes to reduce by half. Stir in lemon zest.',
    'Add spinach, heat 2 minutes and fold in Parmesan. Serve warm.'
  ],
  'expanded-almondine': [
    'Cook trimmed beans with water and measured salt in a covered skillet 4–5 minutes until crisp-tender. Drain.',
    'Melt butter in the skillet. Cook shallot and garlic 3–4 minutes until soft.',
    'Add almonds and brown sugar; stir 2–3 minutes until lightly toasted.',
    'Return beans and toss with lemon juice. Heat through, adjust seasoning and serve.'
  ],
  'expanded-rice-salad': [
    'Simmer wild rice in water with 3/4 teaspoon salt per batch 50–60 minutes until tender. Drain and cool.',
    'Toast pecans at 350°F for 6–10 minutes, watching closely; cool and chop.',
    'Whisk orange zest and juice with vinegar, honey, mustard, olive oil, pepper and remaining salt.',
    'Toss cooled rice with scallions, cranberries, pecans, parsley, diced celery and apple, pepitas and dressing. Adjust seasoning and serve at room temperature.'
  ],
  'expanded-muffins': [
    'Heat oven to 350°F. Line or grease a 12-cup muffin pan.',
    'Whisk flour, cornmeal, sugar, baking powder and salt. Separately whisk eggs, honey and milk.',
    'Add wet ingredients and cooled melted butter to dry ingredients; stir just until combined.',
    'Fill cups about three-quarters full. Bake 17–20 minutes until a center tester comes out clean.',
    'Cool a few minutes in the pan, then move to a rack.'
  ],
  'expanded-cranberry-bread': [
    'Heat oven to 375°F. Grease a 9-by-5-inch loaf pan. Halve cranberries and chop walnuts.',
    'Whisk flour, sugar, cinnamon, baking powder, baking soda and salt. Mix buttermilk, orange juice, melted butter, egg and zest separately.',
    'Stir wet into dry just until combined; fold in berries and nuts. Transfer to the pan.',
    'Bake 20 minutes, reduce to 350°F and bake about 45 minutes more, until a center tester comes out clean.',
    'Cool in pan 10 minutes, then on a rack at least 30 minutes before slicing.'
  ],
  'expanded-apple-crisp': [
    'Heat oven to 350°F. Peel, core and slice apples; spread in a baking dish.',
    'Mix white sugar, cinnamon and the filling portion of flour. Toss with apples; sprinkle water over them.',
    'Mix oats, brown sugar, remaining flour, baking powder, baking soda and melted butter into crumbs. Scatter evenly over apples.',
    'Bake about 45 minutes until topping is golden and apples are tender and bubbling.',
    'Rest before serving.'
  ],
  'expanded-bread-pudding': [
    'Heat oven to 350°F. Tear bread into an 8-inch square baking dish; drizzle melted butter over it and add raisins.',
    'Whisk eggs, milk, sugar, cinnamon and vanilla. Pour evenly over bread.',
    'Press bread gently into custard and let it absorb the liquid.',
    'Bake about 45 minutes until the center is set and springs back lightly when touched. Rest briefly before serving.'
  ],
  'expanded-cheesecake': [
    'Heat oven to 325°F. Beat softened cream cheese with sugar and vanilla until smooth. Add eggs one at a time; mix just until combined.',
    'Spread 1 cup plain batter per batch in the prepared 9-inch crumb crust.',
    'Mix pumpkin, cinnamon, nutmeg and cloves into remaining batter; spread over the plain layer.',
    'Bake 35–40 minutes until edges are set and center slightly jiggles.',
    'Cool 1–2 hours, then refrigerate at least 3 hours before slicing.'
  ],
  'expanded-mousse': [
    'Use pasteurized eggs; separate whites and yolks. Melt chocolate and butter in short microwave bursts; stir smooth and cool slightly.',
    'Whisk yolks into chocolate. Beat whites with cream of tartar, then white sugar, to stiff peaks; fold into chocolate.',
    'Whip half the cream with the larger sugar portion and vanilla to medium peaks. Fold gently into chocolate.',
    'Divide among six glasses per batch; refrigerate at least 2 hours.',
    'Whip remaining cream with remaining sugar for topping. Keep chilled until serving.'
  ],
  'expanded-hot-cider': [
    'Pour cider and maple syrup into a saucepan.',
    'Tie cinnamon sticks, cloves, allspice berries, orange peel and lemon peel inside cheesecloth with kitchen twine. Add the bundle to the cider.',
    'Heat gently 5–10 minutes until steaming; do not boil.',
    'Remove the spice bundle. Ladle into heatproof mugs and serve warm.'
  ],
  rolls: [
    'This is a serving plan for bakery rolls, not a dough recipe. Buy the quantity shown in the ingredient list.',
    'Store according to the bakery or package instructions. Warm just before dinner if directed by the package.',
    'Arrange in a lined basket; serve butter alongside. The plan reserves no baking time for dough.'
  ],
  'sparkling-water': [
    'Buy the planned water quantities and refrigerate before guests arrive.',
    'Set out still and sparkling water with glasses. Keep spare bottles chilled and replenish throughout dinner.'
  ],
  wine: [
    'Buy the planned wine quantities. Chill sparkling and white wine; store red wine cool.',
    'Open bottles at service and pour into appropriate glasses. Quantities follow the adult drinkers recorded in your guest plan.'
  ],
  'kids-cider': [
    'Buy the planned nonalcoholic cider or juice and chill until service.',
    'Pour into children’s cups. Guest-specific beverage preferences appear separately in shopping; this shared plan covers remaining children.'
  ],
  'coffee-tea': [
    'Buy the listed coffee, tea and accompaniments. Set out mugs, spoons and a safe place for the kettle or brewer.',
    'Brew coffee and steep tea according to their package instructions shortly before dessert. Serve milk and sweeteners separately.'
  ]
};

// Unmeasured source additions are explicit checks, never invented quantities.
const pantry: Record<string, string[]> = {
  mac: ['Salt', 'Black pepper', 'Paprika'], app: ['Salt', 'Black pepper', 'Olive oil for bread'],
  'ba-dry-turkey': ['Water for roasting pan'],
  'ba-simple-stuffing': ['Butter for greasing'],
  'ba-mashed': ['Salt for boiling water', 'Black pepper'],
  'ba-honey-brussels': ['Salt for roasting', 'Black pepper'],
  'ba-greenbeans': ['Salt', 'Black pepper'],
  'ba-pumpkin-pie': ['Flour for rolling'],
  'ba-parker-rolls': ['Butter for greasing', 'Oil for bowl', 'Flour for kneading'],
  'ba-fancy-cranberry': ['Oil for mold', 'Salt'],
  'allrecipes-corn': ['Butter for greasing'],
  'allrecipes-broccoli-cheese': ['Butter for greasing', 'Salt', 'Black pepper', 'Paprika'],
  'fn-vegan-greenbean': ['Salt', 'Black pepper'],
  'fn-citrus-cranberry': ['Salt'],
  'signature-cocktail': ['Ice'],
  turkey: ['Salt', 'Black pepper'], 'guide-breast': ['Butter for greasing'],
  stuffing: ['Salt', 'Black pepper', 'Butter for greasing'],
  greens: ['Salt', 'Black pepper'], cranberry: ['Salt'],
  potatoes: ['Salt', 'Black pepper'], gravy: ['Salt', 'Black pepper'],
  salad: ['Salt', 'Black pepper'], pie: [],
  'guide-roast-sprouts': ['Salt', 'Black pepper'], sweet: ['Salt', 'Black pepper'],
  'guide-apple': ['Flour for rolling', 'Demerara sugar'],
  'guide-sweet-mash': [],
  'guide-gratin': [], 'guide-mushroom': ['Flour for rolling'],
  'guide-pecan': ['Salt', 'Flour for rolling'],
  'reviewed-honey-carrots': ['Salt', 'Black pepper'],
  'reviewed-asparagus': [], 'reviewed-sausage-mushrooms': [],
  'reviewed-cranberry-brie': ['Oil for greasing', 'Flour for rolling', 'Brown sugar', 'Salt'],
  'expanded-deviled-eggs': ['Paprika'],
  'expanded-spinach-dip': ['Salt', 'Black pepper', 'Oil for greasing', 'Bread or crackers for serving'], 'expanded-soup': [],
  'expanded-ham': [], 'expanded-sweet-casserole': [],
  'expanded-cauliflower': ['Salt', 'Black pepper', 'Oil for greasing'],
  'expanded-spinach': ['Salt', 'Black pepper', 'Cayenne', 'Nutmeg'], 'expanded-almondine': [],
  'expanded-rice-salad': [], 'expanded-muffins': ['Muffin liners or oil for greasing'],
  'expanded-cranberry-bread': ['Oil for greasing'], 'expanded-apple-crisp': [],
  'expanded-bread-pudding': [], 'expanded-cheesecake': ['Nutmeg', 'Cloves'],
  'expanded-mousse': [], 'expanded-hot-cider': ['Cheesecloth', 'Kitchen twine']
};
const phases: Record<string, NonNullable<Dish['prepPhases']>> = {
  'ba-parker-rolls': [
    { label: 'Mix and knead dough', offsetMinutes: 0 },
    { label: 'First rise · allow up to 2 hours, until doubled', offsetMinutes: 15 },
    { label: 'Shape rolls', offsetMinutes: 135 },
    { label: 'Second rise · 1 hour, until puffy', offsetMinutes: 145 }
  ],
  'guide-apple': [
    { label: 'Make dough; refrigerate 2 hours', offsetMinutes: 0 },
    { label: 'Slice and macerate apples 1 hour', offsetMinutes: 30 },
    { label: 'Reduce cider and apple juices; cool syrup', offsetMinutes: 90 },
    { label: 'Roll, fill and seal pie', offsetMinutes: 150 },
    { label: 'Freeze assembled pie 10 minutes', offsetMinutes: 170 }
  ],
  'guide-gratin': [
    { label: 'Infuse dairy with aromatics · steep 1 hour', offsetMinutes: 0 },
    { label: 'Slice potatoes and assemble gratin', offsetMinutes: 70 }
  ],
  sweet: [
    { label: 'Prepare sweet potatoes; hold in 160°F water 1 hour', offsetMinutes: 0 },
    { label: 'Drain and coat potatoes for roasting', offsetMinutes: 60 }
  ],
  'ba-fancy-cranberry': [
    { label: 'Bloom gelatin; cook cranberries and juice', offsetMinutes: 0 },
    { label: 'Fill mold; begin 12-hour refrigeration', offsetMinutes: 30 }
  ],
  'expanded-mousse': [
    { label: 'Prepare chocolate and pasteurized eggs; whip and fold', offsetMinutes: 0 },
    { label: 'Portion mousse; begin 2-hour refrigeration', offsetMinutes: 20 }
  ]
};

export function completeRecipe(d: Dish): Dish {
  if (!methods[d.id]) throw new Error(`Built-in recipe lacks an audited method: ${d.id}`);
  const next: Dish = { ...d, instructions: methods[d.id].join('\n'), pantryChecks: pantry[d.id] || [], prepPhases: phases[d.id] };
  if (['rolls','sparkling-water','wine','kids-cider','coffee-tea'].includes(d.id)) {
    next.servingPlan = true;
    next.serves = d.serves || 1;
  }
  if (d.id === 'guide-apple') {
    next.minutes = 540; // 180 prep, 120 baking, 240 cooling; maceration overlaps dough chilling.
    next.ingredients = [...d.ingredients, ['Water', (.5 + 1/16 + 3/16 + 1/48)/(d.serves || 1), 'cup', 'Pantry']];
  }
  if (d.id === 'guide-mushroom') next.ingredients = [...d.ingredients, ['Water for egg wash', 1/(d.serves || 1), 'tsp', 'Pantry']];
  if (d.id === 'guide-breast') { next.ovenStages = [{label:'Dry bread',minutes:50,temp:275},{label:'Roast breast over stuffing',minutes:45,temp:450,waitBefore:30},{label:'Move breast to rack; finish roasting',minutes:30,temp:450,restAfter:20},{label:'Reheat stuffing with juices',minutes:15,temp:450}]; next.oven = 140; next.minutes = 205; }
  if (d.id === 'guide-breast') next.ingredients = [...d.ingredients,
    ['Kosher salt', 1/(d.serves || 1), 'tbsp', 'Pantry'], ['Black pepper', .5/(d.serves || 1), 'tsp', 'Pantry']];
  if (d.id === 'ba-dry-turkey') next.advanceTasks = [{ label: 'Dry-brine turkey; refrigerate uncovered at least 12 hours (up to 48)', minutesBeforeCooking: 12*60 + (d.prepMinutes || 0) }];
  const ingredientNotes: Record<string, Record<string,string>> = {
    'guide-apple': {
      'Flour': 'All flour is for the double-crust dough; extra rolling flour is a pantry check.',
      'Sugar': 'Per original pie: 2 tbsp dough + 1/4 cup filling.',
      'Kosher salt': 'Per original pie: 1 1/2 tsp dough + 1/2 tsp filling; amounts use Diamond Crystal.',
      'Butter': 'Per original pie: 1 1/2 cups cold butter for dough + 2 tbsp to dot filling.',
      'Water': 'Per original pie: 1/2 cup + 1 tbsp dough, 3 tbsp cornstarch slurry, 1 tsp egg wash.'
    },
    'expanded-mousse': {
      'Sugar': 'Per original six servings: 1/4 cup for whites, 2 tbsp for folding cream, 2 tsp for topping.',
      'Heavy cream': 'Per original six servings: 1/2 cup folded into mousse + 1/2 cup whipped for topping.'
    },
    'guide-pecan': {'Butter':'Per original pie: 8 tbsp cold butter for crust + 3 tbsp melted for filling.'},
    'ba-fancy-cranberry': {'Sugar':'Per original mold: 1 1/2 cups for sauce + 3 tbsp for sugared garnish.'},
    'signature-cocktail': {'Nutmeg':'Half goes into the drink; half goes into the sugar rim.'},
    'expanded-apple-crisp': {'Flour':'Per original dish: 1 tbsp in the filling + 1 cup in the crumb topping.'},
    'guide-gratin': {'Kosher salt':'Use Diamond Crystal; table salt needs half this volume.'},
    'guide-breast': {'Sage':'Half in stuffing; half on turkey.', 'Butter':'Per original batch: 5 tbsp in stuffing + 3 tbsp on turkey.'}
  };
  next.ingredientNotes = ingredientNotes[d.id];
  if(d.id === 'guide-apple') next.seasoning = 'Salt quantities use Diamond Crystal; source Morton amounts differ. Rolling flour and demerara are pantry checks. Water is now quantified.';
  if(d.id === 'guide-mushroom') next.seasoning = 'Rolling flour is a pantry check; egg-wash water is included above.';
  if (d.id === 'guide-gratin') next.prepMinutes = 80;
  if (d.id === 'guide-sweet-mash') next.minutes = 170;
  if (d.id === 'rolls') { next.oven = 0; next.prepMinutes = 15; next.seasoning = 'Package warming directions vary; add an oven reservation if yours requires warming.'; }
  if (d.id === 'fn-gf-cornbread') { next.ovenStages = [{label:'Preheat cast-iron skillet',minutes:10,temp:425},{label:'Bake cornbread',minutes:30,temp:375}]; next.minutes = 85; }
  if (d.id === 'stuffing' || d.id === 'ba-simple-stuffing' || d.id === 'guide-breast') next.makeAhead = 'Dry bread and prepare components ahead; refrigerate cooked components separately. Assemble with eggs immediately before baking. Cook stuffing to 165°F.';
  if (d.id === 'ba-dry-turkey' || d.id === 'turkey' || d.id === 'guide-breast') next.finish = 'Use a thermometer: poultry and stuffing must reach 165°F. Oven times are estimates; continue cooking if needed. Rest before carving.';
  return next;
}
