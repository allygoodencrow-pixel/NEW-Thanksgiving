# Crow & Crown — Thanksgiving at Home

This is the current Crow & Crown Thanksgiving implementation, synchronized from Sites and extended with Supabase accounts/private cloud plans at the owner's request. Continue this implementation; do not revive older code.

- Existing Site project: `appgprj_6ab9b5c406b88191835e71782dd05346`
- Live app: https://crow-crown-thanksgiving-hosting.allygoodencrow.chatgpt.site
- Synced Site source: `2db787cf0541eb82f5743818b659ae3425630a25` (version 45)
- GitHub development: `allygoodencrow-pixel/NEW-Thanksgiving`, branch `main`

Read `HANDOFF.md`, `AGENTS.md` and `DESIGN_DIRECTION.md` before edits. Home supplies the approved typography reference. Preserve recipe, guest, shopping, budget, prep and timeline mappings and saved overrides.

## Run

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run typecheck
npm run build
```

The app uses React, TypeScript and Vite. Source is in `src/`, all images and fonts are in `public/`, and generated output is in `dist/`. The typography regression baseline is bundled in `tests/fixtures/` so fresh checkouts do not require the original Sites Git history.

## Continue from another chat

Enable GitHub and provide this repository link. Ask the chat to edit main and read HANDOFF.md first. The owner authorized migrating hosting to Vercel. Once a Git-linked project exists, validated main pushes can publish there. GitHub does not update the original Site automatically.

## Accounts and persistence

Signed-out plans still save locally under cc-thanksgiving-v4. Account adds email/password sign-in, signup, password recovery, multiple named parties, explicit device-plan import and cloud autosaving. Supabase ownership policies keep each account's parties private. Revision comparisons prevent silent cross-device overwrites; failures have retry/export/recovery controls.

Backend is the existing thanksgiving Supabase project almqseeccuohdmlsjnhi. Browser configuration contains only a public publishable key. supabase/schema.sql records the already-applied schema; supabase/verify-rls.sql verifies privacy/revision rules with rolled-back fixtures. Never put an admin/service-role key in browser code.

## Hosting

Current Vercel app: https://new-thanksgiving-hfo8.vercel.app
Project: new-thanksgiving-hfo8 (prj_CpGLBG93oh7q2Jx094n2jzpMCygQ).
The owner's GitHub import succeeded; Vercel sign-in protection remains enabled. Configure Supabase Auth redirects to this URL and verify customer email delivery/sign-in/password recovery before launch.

Device-local plans do not transfer across origins automatically. Export from the old app, then import under Party plan → Plan settings in the new signed-in app. Keep the original Site available during migration.
