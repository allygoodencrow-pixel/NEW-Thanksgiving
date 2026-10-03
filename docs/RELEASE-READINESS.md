# Release readiness — 2026-10-03

Status: **not cleared for customer sales**. This is a tested GitHub release candidate, not a verified production release.

## Verified and repaired

- 72 automated tests pass; production Vite build passes.
- Recipe details use the same scaled ingredient calculation as shopping and expose the structured recipe instructions. Reference-only entries remain unavailable for automatic planning.
- Mobile top section switcher and side drawer expose all 13 destinations; the existing bottom navigation remains available.
- Save failures retain edits in memory and show a backup action. Local-browser storage limitations are explained during setup.
- Blocked print windows do not mark printables as generated.
- Home next-action links route to the relevant planning area.
- Thin sans-serif display typography follows the repository's owner requirements.
- Removed the unverified zero-dollar offer from search metadata. CI uses the committed dependency lockfile.

## Release blockers

1. **Reconcile production source.** The documented live AppDeploy app `crow-crown-thanksgiving-gm970n` reports ready, but its applied snapshot `1790964283245` contains `src/App.tsx`, `src/ingredient-identity.js`, `src/recipe-handoffs.js`, and `src/shopping-display.js`. GitHub uses `src/app.js` and `src/domain/`. These are different implementations. Do not overwrite the live app or migrate customer data until the source and saved-data differences have been reviewed.
2. **Real-browser mobile/desktop verification.** DOM interaction regressions pass. Browser installation failed because the Chrome download endpoint returned a certificate-chain error in this execution environment. No visual QA pass is claimed.
3. **Verify purchase and delivery.** No test Shopify order, delivery link, buyer access, refund behavior, or customer support journey was verified in this GitHub task. The app uses browser-local saving and backups; do not advertise cross-device accounts or automatic access revocation.
4. **Verify the final customer package.** Confirm current approved artwork, product description, price and included printables against the actual delivered product. The browser-generated planning printables are not proof that the separately sold artwork is included.

Do not create another repository or app to resolve these items. Keep the existing planning engine and reconcile the existing deployment.
