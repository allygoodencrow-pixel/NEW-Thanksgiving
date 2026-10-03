# Crow & Crown — Thanksgiving

**Thanksgiving, already figured out.**

The active Thanksgiving app repository is [allygoodencrow-pixel/NEW-Thanksgiving](https://github.com/allygoodencrow-pixel/NEW-Thanksgiving), branch `main`.

## Work on the current app

Use the current `main` branch for development. Preserve the working planning engine; change calculation rules only to fix a verified defect or fulfill a new owner requirement. Older prototypes, ZIPs, recovery notes and commits are historical references.

[Project rules and release guidance](docs/CANONICAL-APP.md) identify the existing hosted app and required checks. [The mapping matrix](docs/ADVANCED-MAPPING-MATRIX.md) links the connected planning features to their modules.

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

Vite builds the app into `dist/`. GitHub Actions runs tests and builds on pull requests and pushes to `main`. `vercel.json` contains the Vite build settings; verify the current hosting configuration before changing deployments.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/app.js` | Customer screens and edit controls |
| `src/styles.css` | Current responsive interface styles |
| `src/domain/` | Guest counts, recipes, shopping, scheduling, table/seating, budget, printables and persistence |
| `src/catalog/` | Recipe content, starter menu and reviewed recipe definitions |
| `public/images/` | Photos referenced by the current interface and sharing metadata |
| `test/` | Domain, cascade, persistence and customer-screen regressions |

Adding or removing a dish recalculates its scaled ingredients, shopping needs, prep and timeline. Guest-count changes update dependent quantities while preserving pantry and purchase records.

## Persistence and release status

Plans save in the current browser with versioned backup/restore and revision checks. A private cross-device account database is not connected.

A passing repository build does not prove the hosted app is on the same version. Compare the intended source with the existing deployment and any saved draft before publishing. Printable generators provide current-plan browser print output; approved artwork remains a separate content dependency.
