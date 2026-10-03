# Current Thanksgiving app

## Source and ownership

There is one Crow & Crown Thanksgiving application.

- Repository: `allygoodencrow-pixel/NEW-Thanksgiving`
- Development branch: `main`
- Existing AppDeploy app ID: `crow-crown-thanksgiving-gm970n`
- Existing hosted URL: https://crow-crown-thanksgiving-gm970n.v2.appdeploy.ai/

Do not create another Thanksgiving repository, app, prototype or parallel implementation.

Use the newest explicit owner instruction first, then verified current source/deployment data, the current master knowledge file and approved customer files. Older files and conversation history are historical references. Do not restore an old snapshot over newer working code.

The hosted interface, GitHub source and a saved preview may be different versions. Verify their relationship before a release; do not infer that a preview or a GitHub commit has already been published.

## Preserve the connected planning engine

The current engine lives in `src/domain/`, with recipe content in `src/catalog/`. Preserve its working interfaces and regression tests. Do not pin ongoing development to a superseded historical commit or rebuild working features without a verified defect.

- Estimated, expected, confirmed and custom planning counts; stable guests, RSVP, +1s, children and drinkers.
- Dietary/allergen coverage and confirmed vs. pending dish contributions.
- Recipe and portion scaling; shared ingredient consolidation and compatible unit conversion.
- Pantry, purchases, manual shopping items, prepared dishes and whole-turkey requirements.
- Prep generation, dinner-relative and pinned timeline steps, dependencies and kitchen resource conflicts.
- Table, chair, high-chair, place-setting and linen calculations; unique seating and optional measured room checks.
- Activity supplies/tasks/zones; estimated, committed and paid budget totals.
- Current-plan printables and staleness checks; versioned local saving, backup/restore and revision-conflict handling.

The catalog includes source references alongside selectable, reviewed recipes. `SUPPORTED_SIGNATURE_IDS` determines which catalog recipes are selectable. Preserve incomplete-reference safeguards and saved recipe IDs.

## Current interface direction

Follow the owner's latest UI instructions:

- A clean mobile app with a compact Home screen and clear sections.
- Pull-out side navigation, bottom buttons and a top section switcher.
- Simple first-time setup, with details editable later.
- Clear Plan, Guests and Menu flows; concise recipe guidance and obvious add/remove actions.
- Thin, straight sans-serif typography, high contrast neutral surfaces and moody organic modern imagery.
- Neutral, true-to-life image colors; no global color filters unless explicitly requested.

These are requirements for interface work, not a claim that every requirement is already present in the current repository build. Do not use an older design note as approval for a rejected visual shell.

## Checks and publishing

1. Read current `main` and the current target deployment/draft before editing.
2. Keep routine UI changes in the presentation layer. Repair domain behavior only with evidence of the defect.
3. Run `npm test` and `npm run build`.
4. Verify guest count → menu → ingredients/shopping → prep/timeline → seating/budget/printables. Include add/remove, pantry/purchases, task edits, backups and reloads when those paths change.
5. Check phone and desktop screens when changing the interface or its assets.
6. Publish to the existing target only after reconciling intervening changes. Confirm the deployed source/version and check the live app for frontend and network errors.

`vercel.json` specifies a Vite build with output `dist/`. It does not prove that a Vercel project exists, identify its current settings or authorize creating a replacement. Inspect the current project before a hosting change.

## Implementation boundaries

- Persistence is local to the browser plus backups; there is no connected private cross-device account database.
- Browser local time governs the local-only runtime; stored event time zone is not a full cross-device conversion guarantee.
- Printables generate functional current-plan browser print output; approved artwork/templates are a separate dependency.
- Room checks require supplied dimensions/positions and cover bounds/overlap, not a full circulation model.
- Product links, prices and approved artwork must be verified; do not invent them.

Removed one-time recovery and outdated deployment reports remain available in Git history. Use current source and fresh verification for current status.
