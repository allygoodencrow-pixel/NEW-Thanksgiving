# Advanced Mapping Matrix

| Requirement | Status | Domain implementation | Regression coverage |
|---|---|---|---|
| Recipe → scaled ingredients → shopping/prep | VERIFIED COMPLETE | recipes / ingredients / shopping / prep | existing domain tests |
| Multiple dishes share a meal-role demand | VERIFIED COMPLETE | role-share serving strategy | advanced cooking test |
| More portions require batches rather than multiplied cook time | VERIFIED COMPLETE | deriveBatchPlanForDish | advanced cooking test |
| Equipment + serving-piece inventory gaps | VERIFIED COMPLETE | equipment.js + shopping.js | advanced cooking test |
| Guest contribution retains receive/serve work | VERIFIED COMPLETE | prep task mode filtering | advanced cooking test |
| Oven/burner/host resource reservations | VERIFIED COMPLETE | kitchen.js + schedule.js | advanced cooking tests |
| Incompatible temperatures in one oven | VERIFIED COMPLETE | resource conflict/earlier placement | flexible + fixed tests |
| Dinner-time changes move relative tasks | VERIFIED COMPLETE | schedule anchor offsets | pinned-time test |
| Fixed/pinned task survives dinner-time change | VERIFIED COMPLETE | fixedStart | pinned-time test |
| Turkey required vs purchased quantity | VERIFIED COMPLETE | turkey.js | turkey purchase test |
| Turkey thaw/cook rules missing | VERIFIED COMPLETE as explicit unresolved state | turkey issues | domain behavior |
| Menu completeness by meal role | VERIFIED COMPLETE | coverage.js | advanced cooking test |
| Person-level dietary coverage | VERIFIED COMPLETE | namedPlanningPeople + coverage.js | advanced cooking test |
| Unreviewed recipe metadata is not declared safe | VERIFIED COMPLETE | unresolved coverage state | advanced cooking test |
| Service style → serving/table/space changes | MISSING | next domain layer | pending |
| Table/seating/linen/space propagation | MISSING | next domain layer | pending |
| Unified budget projection/commitment/actual | PARTIAL | purchases retain actual cost; full rollup pending | pending |
| Printables follow live plan | MISSING in new repo | pending | pending |
| Persistent save/backup/restore | MISSING in new repo | pending | pending |
