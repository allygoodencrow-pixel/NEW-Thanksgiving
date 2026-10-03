# Connected planning map

The current implementation and regression tests define behavior. This is a module map, not a historical release-status report.

| Requirement | Implementation in `src/domain/` |
| --- | --- |
| Guest/planning population → food quantities | guests + recipes |
| Recipe → ingredients → consolidated shopping | ingredients + shopping |
| Pantry/purchase preservation and surplus | shopping ledger |
| Host/purchased/guest-provided responsibility | menu + prep |
| Role-aware food allocation and batch waves | recipes |
| Equipment/serving piece gaps | equipment + shopping |
| Oven/burner/host scheduling and conflicts | kitchen + schedule |
| Relative vs pinned timeline | schedule |
| Turkey required vs purchased tracking | turkey |
| Person-level dietary coverage | guests + coverage |
| Service style → required serving zones | service |
| Tables → capacity, chairs, settings, linen math | table |
| Seating uniqueness and displacement | seating |
| Optional measured room overlap checks | space |
| Activities → supplies/tasks/zones/printables | experience |
| Table/equipment/activity gaps → shopping | shopping |
| Estimated/committed/actual budget rollup | budget |
| Live printable data + stale revision detection | printables |
| Local versioned save/backup/restore/conflict detection | persistence |
| Reuse prior plan with event-specific reset | persistence |
| Cross-device account database | backend still required |
| Final curated content/assets | approved recipes/activities/products/assets required |

Budget forecasts depend on supplied prices. Cross-device customer storage and approved product/artwork content remain external dependencies. See [current project guidance](CANONICAL-APP.md).
