# Thanksgiving recovery migration

## Authority
The 2026-09-28 recovery specification remains the behavioral reference. Prior interface code is not design authority.

## Recovered and protected
- [x] canonical event/planning state
- [x] guest and planning-population logic
- [x] recipe/custom-recipe menu integration
- [x] live ingredient scaling and compatible-unit consolidation
- [x] pantry and committed-purchase accounting
- [x] host/purchased/guest-contribution responsibility rules
- [x] prep propagation
- [x] role-aware menu portion sharing
- [x] batch/pan capacity and sequential-wave calculation
- [x] menu-role completeness
- [x] person-level dietary coverage with unresolved metadata state
- [x] recipe equipment and serving-piece requirements
- [x] equipment inventory gaps flowing to hosting-supply shopping
- [x] turkey requirement vs purchased-weight tracking
- [x] dependency-aware prep task graph
- [x] oven/burner/host resource scheduling
- [x] incompatible oven-temperature conflict handling
- [x] relative dinner-time scheduling with fixed/pinned task preservation
- [x] one derived plan exposing menu, dietary coverage, turkey, ingredients, shopping, equipment, prep, and timeline

## Intentional safeguards
- Cooking duration does not multiply directly with guest count.
- Extra duration appears only when recipe batch capacity forces sequential waves.
- Missing turkey thaw/cook rules are surfaced as missing data; the engine does not invent universal timing guidance.
- Unreviewed dietary/allergen metadata remains unresolved rather than being called safe.
- Confirmed guest-provided dishes can stop host cooking/shopping while still retaining receiving, reheating, finishing, and serving tasks where the recipe defines them.

## Still outside this recovery slice
- [ ] service-style propagation across table/buffet/plated requirements
- [ ] table geometry, chairs, linen fit, and space zones
- [ ] projected/committed/actual budget rollup across every domain
- [ ] activities/experience quantity mapping
- [ ] printable data generators
- [ ] persistence/schema migration/backup-restore recovery in the new repository
- [ ] final customer UI wiring for every derived issue and control
