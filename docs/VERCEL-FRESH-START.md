# Vercel fresh start

As of September 28, 2026, the connected Vercel team `muse` reports **zero projects**. There is no existing Thanksgiving Vercel project to preserve.

## Single source for deployment

Deploy only:

- GitHub: `allygoodencrow-pixel/NEW-Thanksgiving`
- Branch: `main`
- Framework: Vite
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

Do not reconnect an older Thanksgiving repository, deployment, or project.

## Clean project rule

The next Vercel project should be a new project imported from this repository only. No old environment variables, domains, aliases, project IDs, build overrides, or deployment settings should be copied unless a current requirement explicitly needs them.

The repository-level `vercel.json` is the deployment contract and intentionally contains only the minimum Vite settings needed for this application.

## Before production

1. Import `allygoodencrow-pixel/NEW-Thanksgiving` as a new Vercel project.
2. Confirm Vercel detects Vite and uses the repository root.
3. Confirm the production branch is `main`.
4. Run the deployment.
5. Verify onboarding plus all 12 planner destinations on the deployed URL.
6. Once the production domain is known, add the canonical link and og:url to index.html (see the comment in its head).
7. The GA4 tag in index.html currently uses the shop's measurement ID (G-B9JF1LJ1JT); swap it for a dedicated planner property if shop and planner traffic should be reported separately.
6. Verify local persistence, backup/restore, shopping propagation, seating assignment, timeline edits, and printables in the live browser.
7. Only after live QA, attach the final production domain.
