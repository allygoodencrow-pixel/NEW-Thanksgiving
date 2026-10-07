# Thanksgiving app design constraints

The Home screen is the user-confirmed typography reference. Preserve its layout and source fonts.

For continuation in another chat, read `HANDOFF.md` and `DESIGN_DIRECTION.md` and inspect the current source before editing. Continue `allygoodencrow-pixel/NEW-Thanksgiving`. The owner authorized moving this same implementation to Vercel and adding Supabase on October 5, 2026. `.openai/hosting.json` identifies the original Site; it is not a requirement to keep hosting there. Do not create a different Thanksgiving implementation.

`src/typography.css` is the sole owner of screen font families, sizes, weights, line heights and tracking. Do not put font declarations in component/layout CSS or React inline styles. The regression suite enforces this. Print-only rules may remain separate.

Home retains its existing Metropolis display and Lato functional fonts. Every planning screen follows Home: Metropolis 100 large page titles (matching Home’s thin display), Metropolis 200 section/card/tertiary headings and Lato 300 functional text. Uppercase headings and utility labels use the shared tracking and role scale in typography.css. Page titles use the compact Home display scale appropriate to content pages; the oversized Home hero remains a hero only. Do not add one-off page scales or competing overrides. Keep mobile input text at 16px to prevent Safari focus zoom. Preserve browser zoom and 100% text-size adjustment.

Run npm test and npm run typecheck before publication. Source cascade checks do not prove rendered browser appearance. Preserve recipe, guest, shopping, budget and timeline mappings and saved overrides.

`src/app-layout.css` is the sole screen layout stylesheet. Home and planning layouts share that source; `src/typography.css` remains the sole typography owner. Do not re-import the removed index/reference/planning-glass/clarity/workspace/recipe-layout/shopping-layout/menu-studio/account/responsive-app sheets or add an override sheet. Correct the owning rule in app-layout.css. Inspect each real route at full phone and web size; scaled overview screenshots alone do not establish proportions.
