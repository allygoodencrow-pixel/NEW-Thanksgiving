# Thanksgiving app design constraints

The Home screen is the user-confirmed typography reference. Preserve its layout and source fonts.

For continuation in another chat, read `HANDOFF.md` and `DESIGN_DIRECTION.md` and inspect the current source before editing. Continue the project identified in `.openai/hosting.json`; do not create a replacement app.

`src/typography.css` is the sole owner of screen font families, sizes, weights, line heights and tracking. Do not put font declarations in component/layout CSS or React inline styles. The regression suite enforces this. Print-only rules may remain separate.

Home retains its existing Metropolis display and Lato functional fonts. Every planning screen follows Home: Metropolis 200 headings and Lato 300 functional text. Uppercase headings and utility labels use the shared tracking and role scale in typography.css. Page titles use the compact Home display scale appropriate to content pages; the oversized Home hero remains a hero only. Do not add one-off page scales or competing overrides. Keep mobile input text at 16px to prevent Safari focus zoom. Preserve browser zoom and 100% text-size adjustment.

Run npm test and npm run typecheck before publication. Source cascade checks do not prove rendered browser appearance. Preserve recipe, guest, shopping, budget and timeline mappings and saved overrides.
