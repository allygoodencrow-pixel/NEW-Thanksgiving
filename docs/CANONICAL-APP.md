# Canonical Thanksgiving App

## Permanent source-of-truth rule

There is ONE Crow & Crown Thanksgiving application.

### Canonical deployed app
- Platform: AppDeploy
- App ID: `crow-crown-thanksgiving-ejawvv`
- Live URL: https://crow-crown-thanksgiving-ejawvv.v2.appdeploy.ai/

Do not create a second Thanksgiving AppDeploy app unless the owner explicitly orders a replacement.

### Protected logic baseline
The protected functional baseline is Git commit:

`bfdc9fe4256d22e997e234c03fa8344ed351efa4`

This baseline contains the recovered Thanksgiving planning engine, recipe catalog, persistence, and current UI shell.

## Protected functional systems

These systems must not be removed, simplified away, or silently rewritten during visual redesign work:

- planning headcount and planning modes
- permanent guest identity and RSVP-derived counts
- adult / child / drinker distinctions
- recipe catalog and menu selection
- recipe scaling
- menu -> ingredient -> shopping dependency mapping
- pantry / already-have quantities
- purchase ledger and purchase persistence
- manual shopping items
- prep generation
- dinner-relative timeline scheduling
- pinned/fixed timeline tasks
- equipment and resource conflict logic
- table / chair / seating calculations
- space and activity logic
- budget logic
- printables generation
- saved-state migration / persistence behavior

## Redesign rule

Visual redesigns are presentation-layer work.

Unless the owner explicitly requests a logic change:
1. preserve the domain and catalog behavior;
2. do not replace working logic with mocked data;
3. do not delete existing workflows because they are visually inconvenient;
4. keep existing saved-data compatibility;
5. update the SAME AppDeploy app ID;
6. regression-check menu -> shopping, headcount scaling, purchases, timeline, guests, and persistence before accepting the update.

## Deployment discipline

Before any substantial update:
- inspect the current AppDeploy snapshot;
- preserve a recoverable version;
- make only the intended changes;
- test the core dependency flows;
- deploy to `crow-crown-thanksgiving-ejawvv`, never a new app;
- confirm the deployment reaches ready status with no reported frontend/network errors.

GitHub is source control and backup. It is not a second customer-facing app.
