# Advanced Mapping Matrix — Menu / Ingredients / Shopping / Prep Slice

| Requirement | Status | Implementation | Acceptance protection |
|---|---|---|---|
| Add recipe to menu once | VERIFIED COMPLETE | `src/domain/recipes.js` | duplicate add test |
| Custom recipes use same engine | VERIFIED COMPLETE | `upsertRecipe`, `addRecipeToMenu` | custom recipe scaling test |
| Guest/planning count rescales ingredients | VERIFIED COMPLETE | `requiredServingsForDish` | 18→24 serving test |
| Merge duplicate ingredients | VERIFIED COMPLETE | `aggregateIngredients` | cup + tbsp consolidation test |
| Keep incompatible units separate | VERIFIED COMPLETE | `src/domain/units.js` | mass vs volume test |
| Keep recipe source attribution | VERIFIED COMPLETE | ingredient source records | multi-source test |
| Required - have - purchased = still need | VERIFIED COMPLETE | `deriveShoppingList` | pantry/purchase test |
| Preserve purchased amount when demand changes | VERIFIED COMPLETE | shopping ledger independent of derived demand | demand decrease and increase tests |
| Report surplus/coverage | VERIFIED COMPLETE | `surplusCanonical` + display value | surplus assertion |
| Removing dish removes only its demand | VERIFIED COMPLETE | derived dependencies from active dishes only | shared ingredient removal test |
| Purchased dish replaces ingredient shopping | VERIFIED COMPLETE | prepared-food requirement mode | purchased-dish test |
| Confirmed guest contribution removes host shopping/prep | VERIFIED COMPLETE | `dishRequirementMode` gate | confirmed contribution test |
| Unconfirmed contribution remains host responsibility | VERIFIED COMPLETE | responsibility status gate | pending contribution test |
| Prep follows menu automatically | VERIFIED COMPLETE for recipe task propagation | `derivePrepTasks` | purchased/contribution tests |
| Full task dependency graph / timing | MISSING in this slice | next recovery phase | future scheduler tests |
| Role-aware smart portion allocation | MISSING in this slice | next food-planning phase | future multi-side allocation tests |

This matrix intentionally separates the now-complete recipe/ingredient/shopping propagation slice from later Thanksgiving-specific meal-share and scheduling logic.
