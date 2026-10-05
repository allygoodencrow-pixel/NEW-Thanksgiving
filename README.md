# Crow & Crown — Thanksgiving at Home

This repository contains the exact application implementation synced from the existing Crow & Crown Thanksgiving Site on October 5, 2026. Continue this app; do not create a replacement.

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

Enable GitHub and provide this repository link. Ask the chat to edit `main` and read the handoff first. GitHub access permits source editing; it does not by itself fix the separate Sites project access error or publish edits to the live app. Publish only to the existing Site after resolving that access and verifying the source. Do not deploy a new app as a workaround.

## Persistence

Party plans save in the current browser/device under `cc-thanksgiving-v4`. Export/import moves saved plans between browsers. Source synchronization does not transfer a person's local plan or add cloud account storage.

Prior repository implementations remain in Git history. The previous README's different Site is superseded by the exact project above for this owner-authorized synchronization.
