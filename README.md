# Crow & Crown — Thanksgiving

**Thanksgiving, already figured out.**

## Current working app

The canonical working Thanksgiving app is now:

- Live app: https://crow-crown-thanksgiving-at-home.glassy-snow-7815.chatgpt.site
- ChatGPT Site project: `appgprj_6ac2b2b392608191a82a98bc16043eca`
- Site source version: `8`
- Site projection revision: `16`
- GitHub repository: `allygoodencrow-pixel/NEW-Thanksgiving`
- Development branch: `main`

Treat the live **Thanksgiving at Home** Site as the current product/interface reference. Do not revive an older interface or overwrite the current Site from an older GitHub snapshot without first reconciling the differences.

[Canonical app rules](docs/CANONICAL-APP.md) define the current working target and preservation rules.

## Work on the current app

Use `main` for the connected planning engine and repository history. Preserve working guest, menu, recipe, shopping, prep, timeline, seating, budget and printable logic. Change calculation rules only to fix a verified defect or fulfill a new owner requirement.

The current ChatGPT Site and GitHub source may not be byte-for-byte identical. Before publishing from GitHub, reconcile the repository against the canonical Site instead of assuming one already contains the other.

## Run locally

Requires Node.js 22.12 or later and npm.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

Vite builds the app into `dist/`. GitHub Actions runs tests and builds on pull requests and pushes to `main`.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/app.js` | Customer screens and edit controls |
| `src/styles.css` | Current responsive interface styles in the repository |
| `src/domain/` | Guest counts, recipes, shopping, scheduling, table/seating, budget, printables and persistence |
| `src/catalog/` | Recipe content, starter menu and reviewed recipe definitions |
| `public/images/` | Photos referenced by the repository interface and sharing metadata |
| `test/` | Domain, cascade, persistence and customer-screen regressions |

Adding or removing a dish must recalculate scaled ingredients, shopping needs, prep and timeline. Guest-count changes must update dependent quantities while preserving pantry and purchase records.

## Persistence and release status

Plans save in the current browser with versioned backup/restore and revision checks. A private cross-device account database is not connected to this Site.

A passing repository build does not prove the live Site is on the same source. The live Site above is the current working reference until the source is explicitly reconciled and verified.
