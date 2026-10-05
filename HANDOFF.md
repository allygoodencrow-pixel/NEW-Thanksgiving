# Crow & Crown Thanksgiving — continuation handoff

Updated October 5, 2026. Continue this existing implementation in GitHub. The owner authorized moving its hosting to Vercel and adding Supabase. Do not switch to a different Thanksgiving implementation.

- Project: `appgprj_6ab9b5c406b88191835e71782dd05346`
- Project link: `sites-project://appgprj_6ab9b5c406b88191835e71782dd05346`
- Published app: https://crow-crown-thanksgiving-hosting.allygoodencrow.chatgpt.site
- Read `AGENTS.md` and `DESIGN_DIRECTION.md` before editing. Open the current source in allygoodencrow-pixel/NEW-Thanksgiving; GitHub now contains newer account integration than the original Site.

## Owner's design requirements

Home is the approved typography reference. Keep its existing design. All other pages follow its thin Metropolis headings, Lato functional text, uppercase utility labels, restrained scale and intentional negative space. `src/typography.css` is the single owner of screen typography. Keep mobile inputs at 16px and preserve browser zoom.

Menu uses neutral smoky translucent cards, light text, fine borders and black translucent buttons. Shopping uses a distinct light translucent list sheet with black controls. No green buttons/boxes, amber grading, gold accents or new font substitutions. Keep the photographic background and food photos. Mobile and desktop use distinct layouts; do not merely shrink the desktop surface.

## Current implementation

The app is React/Vite. `src/App.tsx` owns the interface; `src/domain.ts` derives the plan; `src/guideRecipes.ts` holds source recipes. Preserve permanent guest IDs, recipe yields/batch rules, responsibility, purchased-versus-homemade status and saved overrides.

Expected counts Attending + Pending; Confirmed counts Attending. Estimated and Custom intentionally use their own numbers. Recipe ingredients, supplies and timelines derive from the active planning headcount. Locked shopping quantities stay locked; adjustments follow automatic quantities.

Shopping rows have a full-row Edit control, a direct quantity field, decimal quantity/price drafts, stepper controls, reset, quantity mode and Done. Guest entry is a labelled section immediately under the Guests heading. The guest-name font exception was removed because it defeated mobile input sizing. Quantity displays preserve decimals rather than rounding amounts above ten to whole numbers.

The original Site saves locally in cc-thanksgiving-v4. The newer GitHub source adds Supabase accounts and private cloud plans. A device-local plan does not transfer automatically across origins.

## Validation and limits

The last application change was published as version 44, source `f64e49f5368ee3faac9d98c489ec0e25bf4aa95e`. Domain, UI, responsive cascade, Home baseline, type checks and production build passed. UI checks include adding/declining a guest and observing changed mapped shopping ingredients, decimal quantity/price editing and menu/library selection synchronization.

Visual browser review was unavailable in that session. Do not claim screenshot verification or owner approval of the newest styling. Preserve Home and investigate concrete reported issues before adding more style overrides. Run required checks before deployment.

## GitHub and cloud continuation

The owner authorized syncing this app into [allygoodencrow-pixel/NEW-Thanksgiving](https://github.com/allygoodencrow-pixel/NEW-Thanksgiving), then moving it to Vercel and adding Supabase on October 5. Other chats can continue in that repository. GitHub commits do not update the original Site. Once Vercel is connected to main, validated pushes should publish there. Keep the original Site available during migration so local plans can be exported.

CloudApp.tsx wraps the preserved planner: email/password sign-in, signup, password recovery, multiple named parties, explicit device-plan import and sign-out. cloud.ts serializes autosaves and compares server revisions so a stale device cannot overwrite another device. Account changes/load failures never fall back to a previous user's cached party. Unsaved changes retain user/party-specific recovery backups. Account UI uses the existing font families and sole typography owner.

Backend is the existing Supabase thanksgiving project almqseeccuohdmlsjnhi. cc_party_plans stores canonical planner JSON, preserving recipes, guests, assignments, quantities and overrides. Owner-only RLS covers every operation; anonymous access is revoked. Clients update only name/state; the server owns revision/timestamps/identity. src/supabase-config.ts contains public browser configuration only. Never add service-role keys, database passwords or management tokens there.

The schema is already applied through migration crow_crown_private_party_plans; supabase/schema.sql records it. Do not apply creation again blindly. supabase/verify-rls.sql passed on the real database: owner access, anonymous/cross-user denial, forged ownership rejection, immutable owner, revision increment and stale-save rejection. Test identities/data were rolled back. Security/performance advisors returned no notices. tests/cloud.cjs validates queued saves, retry/recovery, conflicts and the React account flow with a fake transport. Production email delivery and a live customer session remain unverified.

## Current hosting and remaining account setup

Production is now deployed at https://new-thanksgiving-hfo8.vercel.app.
Vercel project: new-thanksgiving-hfo8 / prj_CpGLBG93oh7q2Jx094n2jzpMCygQ.
The owner's manual GitHub import succeeded. Explicit teamId queries incorrectly returned no projects; omitting teamId exposed the deployed projects. Use this exact project, not the other similarly named imports. Vercel sign-in protection remains enabled.

Finish Supabase Auth Site URL/allowed redirects and verify confirmation, password recovery, customer email delivery and cross-device saving. These live flows remain unverified. Current Supabase tools do not expose Auth configuration. Do not disable email confirmation to bypass setup.

October 5 responsive correction: planning content/navigation capped at 1120px (previously 1280px); recipe reader capped at 980px. Content heading scale is 36px/18px for larger screens. Phone titles remain 31px/16px, inputs remain 16px. Menu desktop photos are restrained. Home typography, photos and planning logic are unchanged. Browser visual review is still not claimed.

An old Site's local plan cannot be read from a new Vercel origin. Export it on the old app and import under Party plan → Plan settings while signed in on the new app.

October 5 explicit Home-title correction: owner says THANKSGIVING is too heavy. Only that title now uses genuine Metropolis Thin (100); its size, tracking, color and all other Home roles remain unchanged. Home regression permits this specific approved weight change.
