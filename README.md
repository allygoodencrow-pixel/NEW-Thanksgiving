# CROW & CROWN — Thanksgiving

Clean rebuild created September 28, 2026.

## Source of truth
This repository is the only active Thanksgiving application repository.

The previous Thanksgiving repository/design is retired. Do not copy its HTML, CSS, navigation, imagery, or layout into this project.

## Recovery logic
The owner's `Thanksgiving_Code_and_Logic.zip` is the behavioral recovery source. It contains the historical 13 JavaScript files plus the mapping specification. The new app should preserve verified planning behavior while extracting domain logic away from rendering code.

### Core domains
- guests + RSVP/planning headcount
- menu + preparation responsibility
- scaled recipes + ingredients
- grocery list + pantry/purchase ledger
- turkey planning
- equipment + serving requirements
- oven/burner scheduling
- prep dependencies + timeline
- service style + seating + space zones
- decor/styling quantities
- projected/committed/actual budget
- favors/experience quantities
- live printables
- persistence + backup/restore

## Architecture rule
Domain logic lives under `src/domain`. UI components may call domain functions but must not own calculation rules.

## Current status
Clean runnable foundation. Recovery logic is being migrated module-by-module and tested before UI integration.
