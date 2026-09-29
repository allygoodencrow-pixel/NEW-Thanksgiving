# CROW & CROWN — Thanksgiving

Clean rebuild created September 28, 2026.

## Source of truth
This repository is the only active Thanksgiving application repository. Earlier Thanksgiving repositories and prototypes are retired implementation sources.

## Architecture
Domain logic lives under `src/domain`. UI components read derived results and do not own calculation rules.

## Recovered connected engine
The current main branch includes:
- guest/planning population and dietary coverage
- menu responsibility and recipe scaling
- ingredient normalization, grocery consolidation, pantry/purchase accounting
- role-aware portions and batch capacity
- turkey requirement tracking
- equipment/serving requirements
- oven/burner/host scheduling and dependency-based timeline
- service-style zones
- tables, chairs, place settings, linen sizing
- unique seating assignments and capacity reconciliation
- optional measured room conflict checks
- activity supplies/tasks/zones/printables
- budget projection/actual reconciliation
- live printable data and browser print output
- versioned local save, backup/restore, conflict detection, and prior-plan duplication

## Interface
The app exposes the requested destinations:
HOME / PARTY PLAN / MENU / PREP / SHOPPING / TABLE / SPACE + SEATING / TIMELINE / GUESTS / EXPERIENCE / BUDGET / PRINTABLES

The visual shell is intentionally image-light while planning behavior is stabilized.

## Persistence boundary
Local versioned persistence and backups are implemented. A real cross-device private customer database is not yet connected and must not be represented as complete until a backend is configured.

## Verification
Regression tests live under `test/`. CI is configured to run `npm test` and `npm run build` on pushes to main.
