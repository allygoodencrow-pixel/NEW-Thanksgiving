# Current Thanksgiving app

## Canonical working target

There is one current Crow & Crown Thanksgiving working app.

- Repository: `allygoodencrow-pixel/NEW-Thanksgiving`
- Development branch: `main`
- Canonical live app: https://crow-crown-thanksgiving-at-home.glassy-snow-7815.chatgpt.site
- ChatGPT Site project ID: `appgprj_6ac2b2b392608191a82a98bc16043eca`
- Current recorded Site source version: `8`
- Current recorded projection revision: `16`
- Canonical designation updated: 2026-10-04

The **Thanksgiving at Home** Site is the current product/interface reference. The previous AppDeploy Thanksgiving apps and older interface snapshots are historical references unless the owner explicitly asks to recover something from them.

Do not create another Thanksgiving repository or parallel product implementation. Do not overwrite the current Site with an older GitHub interface simply because the repository build is newer, older, or easier to access.

## Source relationship

GitHub remains the long-term development and logic repository, but the current Site and `main` are not assumed to be byte-for-byte identical.

Before a GitHub-driven release:

1. Compare the intended change against the canonical Site.
2. Preserve the Site's current approved navigation, menu flow and visual direction unless the owner explicitly changes them.
3. Reconcile logic and interface differences instead of restoring an old shell.
4. Run the repository tests and production build.
5. Verify both mobile and desktop before replacing the canonical Site.

The canonical Site must not be treated as disposable preview output.

## Preserve the connected planning engine

Preserve working behavior across:

- Estimated, expected, confirmed and custom planning counts.
- Stable guests, RSVP state, children, drinkers and dietary needs.
- Menu selection and recipe scaling.
- Consolidated ingredients and shopping demand.
- Pantry and purchase records.
- Prep generation and dinner-relative timeline behavior.
- Table, seating and place-setting calculations.
- Budget and printable derivation.
- Local saving, backup/restore and revision checks.

The customer should enter a fact once and dependent systems should update from that fact.

## Current interface requirements

Use the canonical Site as the visual reference. Current owner requirements include:

- Mobile and desktop versions of the same app.
- Clean, compact, structured navigation.
- Menu and Shopping as separate sections.
- Add-a-dish choices integrated into the existing Menu page rather than replacing it with a competing screen.
- Clear recipe add/remove state.
- Menu choices connected to scaled shopping, prep and timeline logic.
- Thin, modern sans-serif typography with restrained hierarchy.
- Moody organic-modern imagery with neutral, true-to-reference color.
- Clean dark surfaces and selective frosted-glass UI rather than stacked generic cards.
- No global warm, sepia, amber or cinematic color grading unless explicitly requested.

## Publishing rule

The canonical app URL above is the current working target. Old AppDeploy URLs, older ZIPs, screenshots and historical GitHub commits are references only.

If a future change is made in GitHub, do not call it the working app until it has been reconciled with the canonical Site, tested, and explicitly promoted.
