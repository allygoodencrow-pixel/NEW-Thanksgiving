# Full-system audit — September 29, 2026

## Audited scope
Repository structure, connected domain rules, cross-domain recalculation, customer-operable controls, local persistence, backup/restore, printables, CI tests, and production build.

## Defects found and repaired
- unstable IDs for legacy guests without stored IDs
- purchased dishes incorrectly requiring homemade cooking equipment
- one linen inventory item being reused across multiple tables
- rectangular linen rotation not recognized
- manual shopping items bypassing pantry/purchase accounting
- printable-generation metadata incrementing the plan revision and becoming stale immediately
- seating accepting unknown people
- printable output omitting operational seating/timeline detail
- guest-provided dishes dropping the host backup before the contribution was confirmed
- equipment/table purchases resolving Shopping but not the source Equipment/Table shortage
- activity task dependencies losing their local dependency IDs
- activity space requirements not reaching Space + Seating
- customer-facing views missing write controls for recipes, purchases, seating, task overrides, richer guest data and activities
- an earlier text patch accidentally removed several navigation view functions despite a successful compile
- whole-turkey requirement existing outside Shopping
- Budget not separating committed cost from paid/actual cost

## Current verified behavior
- menu changes propagate to ingredients, shopping, prep, equipment and timeline
- planning-count changes rescale live demand without erasing purchases
- ingredient consolidation and compatible unit conversion
- pantry, purchased, remaining and surplus quantities remain separate
- unconfirmed guest contributions retain host backup requirements
- confirmed contributions remove host food prep/shopping while retaining defined receive/reheat/serve work
- purchased dishes replace homemade ingredients/prep and do not consume homemade cooking equipment
- whole-turkey sizing is represented as a Shopping requirement
- equipment, chairs, settings and linens reconcile owned + purchased quantities
- table linen inventory is allocated once per physical linen
- role-aware portions and batch waves
- person-level dietary coverage with unresolved metadata kept unresolved
- oven/burner/host resource scheduling and pinned task behavior
- service-style and activity zones flow into the space plan
- unique seat assignment and displacement when capacity shrinks
- budget distinguishes estimate, committed and paid/actual
- printables derive from current plan and stale outputs are detectable
- versioned local save, conflict detection, backup/restore, reset and prior-plan duplication

## Launch boundaries that remain
1. **No connected production deployment.** The connected Vercel account currently has no project for this repository, so runtime verification is limited to repository tests/build rather than a live customer URL.
2. **No private cross-device account database.** Current persistence is versioned local storage + backup/restore. This must not be described as account-based or cross-device persistence.
3. **Event timezone storage is captured, but full cross-timezone wall-clock conversion is not yet a backend-level guarantee.** With local-only persistence, the browser local clock is the operative runtime.
4. **Curated production content is not loaded.** The engine supports custom recipes/activities, but approved recipe catalog, verified product links, final images and final printable artwork are separate content dependencies.
5. **Browser-printable outputs are functional data outputs, not the final approved designed PDF template set.**
6. **Room fit checks cover measured bounds/overlap, not a complete circulation-clearance model.**

## Release rule
Do not call the product production-ready until the deployment, private persistence/account boundary, curated content/assets, final printable templates, and live browser QA are completed.
