# Canonical Thanksgiving App

## Permanent source-of-truth rule

There is ONE Crow & Crown Thanksgiving application.

### Canonical deployed app
- Platform: AppDeploy
- App ID: `crow-crown-thanksgiving-gm970n`
- Live URL: https://crow-crown-thanksgiving-gm970n.v2.appdeploy.ai/

Do not create a second Thanksgiving AppDeploy app unless the owner explicitly orders a replacement.

### Protected planning engine
The application uses the preserved planning-engine baseline pinned to Git commit:

`bfdc9fe4256d22e997e234c03fa8344ed351efa4`

GitHub is the protected logic source and backup. It is not a second customer-facing app.

## Protected functional systems

Do not remove, simplify away, or silently rewrite these systems during visual work:

- planning headcount and Estimated / Expected / Confirmed / Custom modes
- stable guest identity and RSVP-derived counts
- adult / child / drinker distinctions
- 32-recipe catalog and menu selection
- recipe scaling
- menu -> ingredient -> shopping dependency mapping
- pantry / already-have quantities
- purchase ledger and purchase persistence
- manual and household shopping items
- prep generation
- dinner-relative timeline scheduling
- pinned/fixed timeline tasks
- equipment and resource conflict logic
- table / chair / seating calculations
- experience/activity dependencies
- budget estimate / committed / paid
- live printables
- schema-versioned persistence
- backup / restore

## Design system

The current UI direction is a fresh Crow & Crown build, not a recovery of any old approved app.

- modern editorial, moody and high contrast
- cooler ivory, charcoal, muted olive / stone
- rounded corners and translucent glass-like surfaces
- strong food/table photography
- clear negative space and thin editorial typography
- compact five-tab mobile navigation
- primary screens stay simple; advanced controls sit behind details
- no generic SaaS dashboard, beige luxury, wedding-planner styling, clutter, or raw engine controls

## Update discipline

For every future change:

1. Inspect the current AppDeploy snapshot first.
2. Update `crow-crown-thanksgiving-gm970n`; do not create another app.
3. Treat design changes as presentation-layer changes unless the owner explicitly asks for logic changes.
4. Regression-check guest/headcount -> menu -> quantities -> shopping -> prep/timeline -> seating -> printables.
5. Confirm the deployment reaches ready status with no reported frontend/network errors.
