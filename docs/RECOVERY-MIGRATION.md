# Thanksgiving recovery migration

The connected planning engine is now recovered in the new repository across guests, menu, recipes, ingredients, shopping, prep, turkey, equipment, kitchen scheduling, service style, tables, seating, space, activities, budget, printables, and versioned local persistence.

## Important boundaries
- Local save/backup/restore is implemented and versioned. It is not represented as cross-device account persistence.
- Cross-device/private-customer storage still requires a backend/database connection.
- Printable generators now produce live plan data and browser-printable output; final approved visual templates/assets remain a content/design dependency.
- Product links, prices, imagery, and exact approved printable artwork are never invented by the planning engine.
- Measured space checks run only when dimensions/positions are supplied; otherwise the layout is explicitly approximate.

## Regression protections
The repository includes tests for the recovered meal engine, cooking scheduler, table/linen/chair calculations, seating uniqueness, service-style switching, activities, budget reconciliation, printable staleness, backups, revision conflicts, and prior-plan duplication.
