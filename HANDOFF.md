# Crow & Crown Thanksgiving — continuation handoff

Updated October 5, 2026. Continue this existing implementation in GitHub. The owner authorized moving its hosting to Vercel and adding Supabase. Do not switch to a different Thanksgiving implementation.

- Project: `appgprj_6ab9b5c406b88191835e71782dd05346`
- Project link: `sites-project://appgprj_6ab9b5c406b88191835e71782dd05346`
- Production app: https://new-thanksgiving-hfo8.vercel.app
- Original Site, retained for exporting device-local plans: https://crow-crown-thanksgiving-hosting.allygoodencrow.chatgpt.site
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

The owner authorized syncing this app into [allygoodencrow-pixel/NEW-Thanksgiving](https://github.com/allygoodencrow-pixel/NEW-Thanksgiving), then moving it to Vercel and adding Supabase on October 5. Other chats can continue in that repository. GitHub commits do not update the original Site. Vercel is connected to main; validated pushes publish to the existing production project. Keep the original Site available during migration so local plans can be exported.

CloudApp.tsx wraps the preserved planner: email/password sign-in, signup, password recovery, multiple named parties, explicit device-plan import and sign-out. cloud.ts serializes autosaves and compares server revisions so a stale device cannot overwrite another device. Account changes/load failures never fall back to a previous user's cached party. Unsaved changes retain user/party-specific recovery backups. Account UI uses the existing font families and sole typography owner.

Backend is the existing Supabase thanksgiving project almqseeccuohdmlsjnhi. cc_party_plans stores canonical planner JSON, preserving recipes, guests, assignments, quantities and overrides. Owner-only RLS covers every operation; anonymous access is revoked. Clients update only name/state; the server owns revision/timestamps/identity. src/supabase-config.ts contains public browser configuration only. Never add service-role keys, database passwords or management tokens there.

The schema is already applied through migration crow_crown_private_party_plans; supabase/schema.sql records it. Do not apply creation again blindly. supabase/verify-rls.sql passed on the real database: owner access, anonymous/cross-user denial, forged ownership rejection, immutable owner, revision increment and stale-save rejection. Test identities/data were rolled back. Security/performance advisors returned no notices. tests/cloud.cjs validates queued saves, retry/recovery, conflicts and the React account flow with a fake transport. Production email delivery and a live customer session remain unverified.

## Current hosting and remaining account setup

Production is now deployed at https://new-thanksgiving-hfo8.vercel.app.
Vercel project: new-thanksgiving-hfo8 / prj_CpGLBG93oh7q2Jx094n2jzpMCygQ.
The owner's manual GitHub import succeeded. In the migration session, explicit teamId queries returned no projects, while omitting teamId exposed the deployed projects. Use this exact project, not the other similarly named imports. Dashboard verification now confirms Vercel Authentication is enabled with Standard Protection. The production root is publicly reachable without a Vercel login; previews remain protected. No protection settings were changed.

Supabase Auth Site URL is now https://new-thanksgiving-hfo8.vercel.app/ and that exact URL is in the redirect allowlist. Existing older migration redirects were preserved; no new wildcard was added. Custom SMTP is disabled, so customer email delivery is blocked until a production email provider is configured. Confirmation, password recovery and cross-device saving still need live verification. Do not disable email confirmation to bypass setup.

October 5 responsive correction: planning content/navigation capped at 1120px (previously 1280px); recipe reader capped at 980px. Content heading scale is 36px/18px for larger screens. Phone titles remain 31px/16px, inputs remain 16px. Menu desktop photos are restrained. Home typography, photos and planning logic are unchanged. Browser visual review is still not claimed.

An old Site's local plan cannot be read from a new Vercel origin. Export it on the old app and import under Party plan → Plan settings while signed in on the new app.

October 5 explicit Home-title correction: owner says THANKSGIVING is too heavy. Only that title now uses genuine Metropolis Thin (100); its size, tracking, color and all other Home roles remain unchanged. Home regression permits this specific approved weight change.


## Verification continuation — October 5, 2026

The repository was updated by another chat during verification. Its compact-layout commit `faa2e05` and subsequent owner-approved Home-title correction `092749c` were fetched and preserved. This continuation changes only this handoff; it does not replace any interface, change recipes or reapply the database schema.

Verified:

- The production root returned HTTP 200 with no authentication headers or bypass URL. A fresh signed-out browser rendered Home, the account dialog and Menu without a Vercel sign-in wall.
- GitHub's `Vercel – new-thanksgiving-hfo8` deployment status is `success` for both the initial cloud commit `4dd12deb78250642efab7a118b3f8a82a1335488` and the newer Home-title commit `092749c`. The latter links to `https://vercel.com/muse-8194/new-thanksgiving-hfo8/7AziRkYRJ8zVgyeUkgk9mSdjKycA`. The authenticated dashboard also verified the Git connection to allygoodencrow-pixel/NEW-Thanksgiving and a Ready, current Production deployment from main at handoff-only commit `60c616729e0398eb6d4ef98640fa271e6544e2d7`: deployment `dpl_FEnwG9hjQQ2vF25gN8HhF3C3X2W6`, https://vercel.com/muse-8194/new-thanksgiving-hfo8/FEnwG9hjQQ2vF25gN8HhF3C3X2W6. Standard Protection remains enabled; the public production alias was verified separately without credentials.
- A build of latest checked main `092749c5c30dc8f4609e942c005913d71bb1b4d3` produced JavaScript `index-CdcEhzU3.js` and CSS `index-YUl_fobQ.css`; both were verified byte-for-byte identical to the live production assets. The responsive correction and owner-approved thin Home title are present in main and production; do not restore the earlier 1280px/44px layout.
- After reloading the latest publication, Home's THANKSGIVING title was verified as Metropolis weight 100 without horizontal overflow. Desktop Menu was inspected at 1363 × 936: Metropolis headings, loaded food photos and no horizontal overflow. This is limited visual verification, not owner approval or an iPhone browser test.
- The live Supabase Auth settings endpoint returned HTTP 200 with email enabled, signup enabled and `mailer_autoconfirm: false`; confirmation remains required. An anonymous request for one party ID returned HTTP 401 / Postgres `42501`, `permission denied for table cc_party_plans`. This verifies anonymous denial only; the earlier real-database ownership/revision checks were not repeated.

`npm test`, `npm run typecheck` and `npm run build` all passed on latest checked main, including domain/UI/cloud tests, responsive cascade, single typography ownership and the updated Home baseline. Cloud/account tests use a fake transport and do not establish live customer authentication.

Dashboard continuation, verified October 5, 2026:

- The owner approved browser dashboard fallback after the connectors failed. Secure browser sign-in reached the correct Vercel account `allygoodencrow-8547`, team `muse-8194`, and the correct Supabase organization/project. Dashboard administration is now accessible. The earlier connector errors are not hosting failures.
- Vercel's Git settings show `allygoodencrow-pixel/NEW-Thanksgiving` connected. The current deployment inspected in the dashboard is Ready, Production, from `main` at `60c6167`. No Vercel security settings were weakened or bypass secrets created.
- Supabase Auth Site URL was changed from the older `https://new-thanksgiving-muse-8194.vercel.app/` import to `https://new-thanksgiving-hfo8.vercel.app/`. The exact production URL was added to the redirect allowlist, and the dashboard showed “Successfully added 1 URL.” Existing four older migration entries remain; no new broad wildcard was added. Signup and recovery already send the origin plus `/`.
- Supabase Emails → SMTP Settings shows Enable custom SMTP off. The email templates page requires custom SMTP to edit templates. Customer confirmation/reset delivery is therefore not production-ready; the default SMTP service is restricted to organization members. Never disable confirmation as a workaround.
- No customer account, password, party or database schema was changed in this continuation. Application code, photos, typography and planning logic were preserved.

Earlier connector diagnostics, retained for troubleshooting:

- Initial Vercel calls used account `help-2458`, whose project/team lists were empty; the specified project/deployment returned 404. After a reconnect attempt, Vercel calls returned MCP `-32001: Unknown tool`.
- Supabase connector returned MCP `-32600: You do not have permission to perform this action` for `almqseeccuohdmlsjnhi`, and exposed only a different inactive project. The authenticated dashboard successfully accesses the intended project.

Remaining work, using only the existing projects:

1. Configure a production custom SMTP provider in the existing Supabase project. The owner must enter provider credentials securely in the dashboard; never request or paste passwords, API keys or access tokens in chat. Verify a sender address/domain with that provider before enabling customer mail.
2. Verify signup confirmation delivery to an owner-approved external customer test inbox, then complete confirmation and email/password sign-in. Reference: https://supabase.com/docs/guides/auth/auth-smtp.
3. Verify password-reset delivery and the production recovery route. New password entry/submission must be completed by the owner through secure browser handoff.
4. Save and load one clearly identified disposable test party in two independent authenticated sessions/devices. Verify stale-revision protection and recovery without overwriting an actual customer's party. Record precise results here.
5. Complete mobile visual browser checks. Existing responsive and typography tests passed, but no iPhone visual check is claimed.

Production URL configuration, public access, Git deployment connection and desktop visual checks are verified. Customer email delivery, successful live customer sign-in/reset, authenticated cross-device saving and mobile visual browser checks remain unverified. Do not call the migration customer-ready until those checks pass.
