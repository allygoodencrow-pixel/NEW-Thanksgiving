# Verification — Thanksgiving Hosting integration

## Passed in this run

- TypeScript type check.
- Production Vite build.
- 29 domain regression cases in `tests/domain.cjs`: migrations, invalid records, canonical RSVP counts and composition, zero headcount, duplicate names/renames, seat collisions and release, seeded and changed contributions, purchased food, removed turkey, dessert gating, no-alcohol planning, child beverages, custom ingredient scaling, shopping adjustments/locks, actual and planned costs, orphan cleanup, oven capacity, stable timeline identity, impossible dependencies, drafts/printable overrides, and outdoor/transport requirements.
- React integration tests in a simulated DOM: guest addition and full-name editing; purchased-food control and shopping output; hosting essentials; seating reachable from Table; purchased-food prep; schedule; printable controls; Party-Day mode; autosave and remount persistence.
- Screenshot-referenced rounded home composition and mobile Menu imagery are present in source. The initial four named guests drive the opening headcount. A simulated DOM assertion checks home section hierarchy and three dish/photo mappings, but does not measure pixels.

## Not verified here

The supervised app preview started, but the cloud browser refused the internal preview address (`ERR_BLOCKED_BY_CLIENT`). Real desktop/mobile visual inspection, image decoding in that browser, the operating-system print dialog, and physical printing could not be verified. The React integration tests are not a substitute for layout checks on an iPhone.

The read-only optional WebMCP planning summary is feature-detected. A supported WebMCP browser context was unavailable, so registration is unverified.

## Practical limits

This is a browser-local working planner, not a customer account/billing platform. Food quantities, costs, refrigerator units and cooking times are planning estimates. External recipe/product destinations are retained from the approved source and were not revalidated as part of this correction.

Original planning data at a different hosted address must be exported there and imported here. Browser origin isolation prevents automatic transfer.
