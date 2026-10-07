Warning: truncated output (original token count: 22319)
Total output lines: 443

# Crow & Crown Thanksgiving — continuation handoff

Updated October 5, 2026. Continue this existing implementation in GitHub. The owner authorized moving its hosting to Vercel and adding Supabase. Do not switch to a different Thanksgiving implementation.

- Project: `appgprj_6ab9b5c406b88191835e71782dd05346`
- Project link: `sites-project://appgprj_6ab9b5c406b88191835e71782dd05346`
- Production app: https://thanksgiving.thecrowandcrown.com/
- Vercel production alias: https://new-thanksgiving-hfo8.vercel.app/
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

Production is deployed at https://thanksgiving.thecrowandcrown.com/ on the existing Vercel project; https://new-thanksgiving-hfo8.vercel.app/ remains available.
Vercel project: new-thanksgiving-hfo8 / prj_CpGLBG93oh7q2Jx094n2jzpMCygQ.
The owner's manual GitHub import succeeded. In the migration session, explicit teamId queries returned no projects, while omitting teamId exposed the deployed projects. Use this exact project, not the other similarly named imports. Dashboard verification now confirms Vercel Authentication is enabled with Standard Protection. The production root is publicly reachable without a Vercel login; previews remain protected. No protection settings were changed.

Supabase Auth Site URL is now https://thanksgiving.thecrowandcrown.com/ and that exact URL is in the redirect allowlist. The existing hfo8 production alias remains allowed. Existing older migration redirects were preserved; no new wildcard was added. Custom SMTP is now enabled with Resend; live email delivery still needs verification. Confirmation, password recovery and cross-device saving still need live verification. Do not disable email confirmation to bypass setup.

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

1. Custom SMTP is configured with Resend and a verified sender domain. Keep credentials confined to the provider/Supabase dashboards; never request or paste them in chat. Verify live delivery next.
2. Verify signup confirmation delivery to an owner-approved external customer test inbox, then complete confirmation and email/password sign-in. Reference: https://supabase.com/docs/guides/auth/auth-smtp.
3. Verify password-reset delivery and the production recovery route. New password entry/submission must be completed by the owner through secure browser handoff.
4. Save and load one clearly identified disposable test party in two independent authenticated sessions/devices. Verify stale-revision protection and recovery without overwriting an actual customer's party. Record precise results here.
5. Complete mobile visual browser checks. Existing responsive and typography tests passed, but no iPhone visual check is claimed.

Production URL configuration, public access, Git deployment connection and desktop visual checks are verified. Customer email delivery, successful live customer sign-in/reset, authenticated cross-device saving and mobile visual browser checks remain unverified. Do not call the migration customer-ready until those checks pass.

## Custom domain and email continuation — October 5, 2026

The owner requested both an app domain and a separate authentication-email sending domain. These changes use the existing Vercel project and Supabase backend. Application code, Home, typography, photos, planning logic and database schema are unchanged.

Verified results:

- Shopify DNS management for `thecrowandcrown.com` is accessible. Added CNAME `thanksgiving` → `c1839bb0870d3c68.vercel-dns-017.com`. Vercel now shows Valid Configuration for this Production domain.
- https://thanksgiving.thecrowandcrown.com/ loads the existing Home over HTTPS. An independent request without authentication headers returned HTTP 200. Vercel Standard Protection was not changed.
- Created the sending domain `mail.thecrowandcrown.com` in the existing Resend account, region `us-east-1`. Resend domain ID: `e2b9137c-4af2-4f34-be6f-6fd54a7cda66`. The dashboard now reports Verified and “Your domain is ready to send emails.”
- Added provider-generated CNAME `rsend.mail` → `rsend.forge.rmta.net`, CNAME `send.mail` → `send.forge.rmta.net`, and TXT `resend._domainkey.mail` with the exact public DKIM value from Resend. All three saved values were checked in Shopify. Existing storefront root/www records, nameservers and Zoho mailbox MX records were preserved. Receiving remains disabled in Resend.
- Saved Supabase Auth Site URL as `https://thanksgiving.thecrowandcrown.com/` and added that exact redirect URL. Reloading the dashboard verified persistence: six redirect URLs, including the hfo8 alias and four older migration entries. No new wildcard was added.
- A new app origin requires sign-in; existing private cloud parties remain associated with their existing accounts. Device-local plans require explicit export/import.
- `npm test` and `npm run typecheck` passed again on the local application source. No application source was modified in this continuation.

Pending email connection:

The owner explicitly approved Resend’s READ + WRITE access for Auth and Projects across the selected existing Supabase organization. Authorize Resend was clicked. The subsequent return step was blocked by the cloud browser URL policy: “The requested URL protocol is not allowed. Allowed protocols: \"http:\", \"https:\".” Do not retry or circumvent that blocked protocol. An independent inspection of the already-open Resend dashboard still shows Connect to Supabase, and Supabase’s email page still requires custom SMTP. A saved integration and SMTP configuration are therefore NOT verified. The owner needs to complete the Resend connection in their own browser at https://resend.com/settings/integrations, using the existing organization/project and verified sender domain. Do not treat the earlier approval as missing or request the same grant approval again unless scope changes.

The native integration remains unverified, but direct SMTP is now saved and enabled for `almqseeccuohdmlsjnhi` (see final verification below). Use the verified `mail.thecrowandcrown.com` sender domain and the existing free plan; do not copy keys into chat or repository files. Preserve email confirmation. Then verify delivery to an owner-approved external test inbox, confirmation/sign-in, password recovery and private cross-device saving. None of those live customer flows is claimed as verified.

Direct SMTP alternative prepared after the owner requested another attempt:

- Resend integration status was refreshed and still showed Connect to Supabase. Supabase SMTP was still disabled. The blocked authorization return was not retried or circumvented.
- Resend Settings → SMTP provides host `smtp.resend.com`, port `465` and username `resend`.
- Prepared an UNSAVED form in the existing Supabase project's Auth → Emails → SMTP Settings with sender `no-reply@mail.thecrowandcrown.com`, sender name `CROW & CROWN`, host `smtp.resend.com`, port `465`, username `resend`, and unchanged minimum interval 60 seconds. Password is blank. SMTP is not yet saved/enabled on the server.
- Secure manual handoff is required for the owner to enter the SMTP password directly from their Resend dashboard and save the form. Do not reveal/read/copy this credential in chat or repository files. This direct SMTP path does not require retrying the blocked OAuth return. Once saved, reload and verify SMTP settings before claiming email delivery is configured; external delivery, confirmation/reset and cross-device tests remain pending.

## Direct SMTP saved — October 5, 2026

The owner entered the Resend SMTP credential directly and saved the prepared Supabase form. A dashboard reload verified that custom SMTP remains enabled in the existing `almqseeccuohdmlsjnhi` project. Sender is `no-reply@mail.thecrowandcrown.com`, sender name `CROW & CROWN`, host `smtp.resend.com`, port `465`, username `resend`, minimum interval 60 seconds. Supabase displays “Stored password is hidden. Enter a new password to replace it.” Save changes is disabled after reload, confirming no unsaved form changes. The credential was not read, copied or exposed by the agent.

This saved direct SMTP configuration supersedes the earlier disabled/unsaved status. The blocked native OAuth return is no longer a prerequisite for sending through this SMTP configuration; do not retry it. Resend Emails currently shows “No sent emails yet” with Last 15 days selected. SMTP configuration is verified, but credential validity and successful external delivery are not established by a settings save. Signup confirmation, sign-in, password reset, authenticated cross-device saving and mobile visual verification still need their previously described live checks. Home, typography, planning engine and database schema are unchanged.


## Purchase accounts continuation — October 5, 2026

The owner requested automatic accounts and secure account email at purchase, chose a dedicated Thanksgiving app product, set USD 28.99 and requested a thumbnail. Shopify product `10788940677414` is saved as DRAFT with that price and the existing Home photograph (`IMG_0823.jpeg`) as its featured image. Keep it draft until delivery is verified.

A real signup attempt failed: Supabase Auth /signup returned 500 at 13:35:13 PDT with SMTP `535 Authentication credentials invalid`; Resend showed no sent emails. This supersedes the earlier credential-validity-unverified status. The owner must replace the SMTP credential directly in Supabase; never read or paste it through chat. Do not retry the blocked OAuth return.

Added a signed orders/paid handler in `supabase/functions/shopify-purchase`, private purchase receipt migration and purchase invitation/password setup in CloudApp. Home, photos, CSS, typography and all planning mappings are preserved. The purchase migration was applied in the existing Supabase project. Real database RLS/grant/lease/completed-order tests passed with transaction test data rolled back. The handler was deployed through the browser editor from the exact esbuild bundle of tested source. Product/store routing environment values were saved; signing secret remains owner-entry pending. Gateway JWT verification remains on pending the required security-setting confirmation; Shopify webhook registration, invite redirect/template setup and live delivery tests are not yet complete.

Read PURCHASE_SETUP.md for exact configuration, retry behavior and validation limits. App public signup UI is replaced with purchase-account sign-in/password recovery. This is account provisioning, not a paid-only entitlement gate. Local domain/UI/cloud/invite/purchase/responsive/Home tests, typecheck, build and Deno check passed. Do not call purchases or the migration customer-ready yet.


Further verified October 5: main application commit `f40bff5bdd1631883fa872f0a7c9963f3a884978` is live at the custom production origin. Reloaded Home and account dialog show the purchase-account sign-in copy and no public Create account option. Added and verified the exact `https://thanksgiving.thecrowandcrown.com/?setup=1` Auth redirect (seven total; existing entries preserved). Saved the Invite user email template with branded password-setup copy and the required `{{ .ConfirmationURL }}` token; dashboard confirmed Successfully updated email template. Magic-link branding remains pending. Signing-secret entry, one-endpoint gateway JWT confirmation, Shopify webhook registration, SMTP repair and end-to-end customer checks still remain. Do not launch the draft product yet.


Purchase connection verified October 5, 14:10 PDT: the owner approved replacing gateway JWT verification with the handler's Shopify HMAC verification for the shopify-purchase endpoint. Verify JWT with legacy secret is saved off; dashboard confirmed Successfully updated edge function. Shopify Notifications → Webhooks now contains Order payment → the existing Supabase shopify-purchase endpoint, JSON, selected API version 2026-10 (Latest). No test notification has been sent and no real paid delivery is claimed. SHOPIFY_WEBHOOK_SECRET remains missing, so the handler rejects processing with purchase_setup_incomplete until the owner enters it securely. Secure owner handoff is prepared for signing-secret entry; SMTP credential repair is also still required. Keep the product draft and do not claim customer-ready status.


October 5 signing-secret test: SHOPIFY_WEBHOOK_SECRET was saved by the owner at 14:12:49 PDT; name and timestamp verified without reading its value. Shopify Send test reached the deployed handler at 14:13:44 but returned HTTP 401. Added safe generic rejection diagnostics (core commit 7b503d1) and deployed the exact tested bundle. One diagnostic sample at 14:15:30 logged purchase_webhook_rejected invalid_signature: the store/topic checks passed, but HMAC did not validate. Gateway JWT remained off after this deployment. Do not weaken HMAC checks, use an arbitrary token or claim successful verification. Secure owner handoff is prepared to replace SHOPIFY_WEBHOOK_SECRET with the complete signing value from Shopify Notifications → Webhooks, with no label/quotes/extra whitespace. SMTP repair remains separately required; no buyer account/email or live paid-order delivery was verified. Product remains DRAFT.


October 5, 14:19 continuation: the owner's replacement SHOPIFY_WEBHOOK_SECRET save timestamp is 14:19:16 PDT. Sent another Shopify sample; the dashboard has not yet shown its invocation after several refreshes. Only the older failed samples are visible, so do not claim that the replacement validated or failed. No further signing-secret change is requested until the fresh result is available. Custom SMTP was reloaded and remains enabled, but the prior invalid-credential error is still unresolved. Saved the Magic link/OTP template with subject Open your CROW & CROWN Thanksgiving planner, branded existing-account sign-in copy and the required ConfirmationURL token. Save is disabled and Reset template is available after submission. Secure handoff is now prepared on SMTP Settings for the owner to replace its Password with a complete valid generated Resend API key and Save changes. No actual credential has been read/copied by the agent.



## Current continuation checkpoint — October 5, 2026, after 14:43 PDT

This section supersedes the 14:24 checkpoint where noted.

- The Supabase connector now successfully accesses the correct existing project `almqseeccuohdmlsjnhi` (name thanksgiving, ACTIVE_HEALTHY). Do not assume the earlier account/permission failure still applies.
- Fresh unified logs queried from 21:19:16 UTC onward show `purchase_webhook_rejected invalid_signature` at **2026-10-05 21:20:01.672 UTC / 14:20:01.672 PDT**, after the owner's 14:19:16 secret replacement. The replacement therefore did not pass that sample. This is a current result, not the older 14:15 failure.
- Read the deployed `shopify-purchase` function through the connector: ACTIVE, version 5, `verify_jwt: false`. Its code still verifies SHA-256 HMAC over raw body bytes using `SHOPIFY_WEBHOOK_SECRET`, before JSON parsing or purchase processing. No secret values were requested/read/copied, no authentication checks were weakened and no function deployment was made in this continuation.
- Shopify's live product read unexpectedly returned **ACTIVE** for `gid://shopify/Product/10788940677414`. Restored it to **DRAFT** under the owner's explicit keep-unpublished instruction; the successful update response verifies DRAFT. Price 28.99, thumbnail, description and existing product identity were preserved. The cause of the prior Active status was not established.
- Read-only database check confirmed `relrowsecurity: true` on both `cc_party_plans` and `cc_purchase_fulfillments`. This checks RLS enabled status only, not a repeat of the earlier ownership/revision tests.
- This chat's cloud browser has no continued dashboard authentication; the existing-project Supabase URL redirects to sign-in. A secure browser-auth sign-in is needed before dashboard-only SMTP/secret preparation. Do not request credentials in chat.
- No new SMTP success, external email delivery, password setup, live sign-in/reset or cross-device save is verified. The last known SMTP failure remains 535 Authentication credentials invalid. No app code, design, planning mapping or schema was changed.

Next: sign in securely to the existing Supabase dashboard; owner must enter/save corrected webhook and Resend SMTP credentials directly. Use the Shopify Notifications → Webhooks signing value for this manually registered webhook, not an API/access token. Preserve HMAC and this endpoint's existing gateway setting. Verify a fresh signed sample after correction. Complete owner-approved external inbox, account and two-session private saving tests; keep product Draft until verified.

## New-chat checkpoint — October 5, 2026, 14:24 PDT

Read this section first for current status; earlier sections are chronological and contain superseded settings.

- Existing repository main: allygoodencrow-pixel/NEW-Thanksgiving. App code purchase flow commit f40bff5; safe HMAC rejection diagnostics commit 7b503d1. Latest handoff before this checkpoint: 771edae76b31fb888f3cbd2b0296bcfcb3a8c4b0.
- Existing live app: https://thanksgiving.thecrowandcrown.com/; existing Vercel project new-thanksgiving-hfo8 / prj_CpGLBG93oh7q2Jx094n2jzpMCygQ. Git deployment works, public production loads, Home/design/planning mappings preserved.
- Shopify store skt1ik-hi, canonical skt1ik-hi.myshopify.com. Product gid://shopify/Product/10788940677414, first variant gid://shopify/ProductVariant/54029078724902. Saved USD 28.99, DRAFT, thumbnail copied from the existing app IMG_0823.jpeg. Do not create a replacement product or publish before delivery testing.
- Existing Supabase project almqseeccuohdmlsjnhi. cc_party_plans already has owner RLS/revision protections. Additive cc_purchase_fulfillments migration is applied; live RLS/grant/lease/completed-order checks passed and transaction test rows rolled back.
- Edge Function shopify-purchase is deployed from the exact esbuild bundle of repository source. It accepts only orders/paid from the selected store/product and authenticates raw-body HMAC. Shopify Order payment webhook is saved to https://almqseeccuohdmlsjnhi.supabase.co/functions/v1/shopify-purchase, JSON, API 2026-10.
- The owner approved turning gateway JWT verification off for this one endpoint; it is saved off and remained off after the diagnostics deployment. Preserve HMAC checks. Store and product environment settings saved. SHOPIFY_WEBHOOK_SECRET was owner-entered, then replaced at 14:19:16 PDT. Its value must never be read or copied into chat/source.
- Initial samples returned 401; generic logs show invalid_signature at 14:15:30. A fresh sample was requested after the replacement, but its invocation did not appear during the last checks. Do not infer the replacement works or fails from older results. Check newest invocation timestamps first; if needed send one fresh Shopify sample and verify current response and generic rejection logs without displaying credentials.
- Auth Site URL is the custom production root. Exact invite redirect https://thanksgiving.thecrowandcrown.com/?setup=1 is saved; seven total redirects, older entries preserved. New buyers get an invitation and choose their password in the existing app. Returning buyers get a sign-in link without password reset.…7319 tokens truncated…that layout, not just font scale, became clunky compared with Home. Removed the extra phone Menu frame (border/background/shadow/blur), retaining the photo/detail cards and horizontal category selection. Converted prep overview steps, non-light supporting disclosures, printable collection introduction/category wrappers and nested non-light panels to simple divided rows. The workflow strip is unboxed with a fine lower divider. Main working panels, the distinct light shopping/guest surfaces, photo cards, all controls and data logic remain. All changes are phone-only; Home/desktop composition and typography are unchanged.

Full tests/typecheck/build pass before publication. Rendered mobile QA still requires the scheduled deployment; local file preview is prohibited by browser URL policy and no workaround is authorized. Existing hfo8 deployment of font/layout commit 26be2b6 returned build-rate-limit. Publish latest main to the same project and visually inspect mobile hierarchy/spacing, drawer, photos and working controls before claiming resolution.


## Recipe image coverage and reviewed additions — October 5 evening PDT / October 6 UTC

Audited all 39 prior catalog entries. Several source recipes and drinks fell back to a table photo; others reused unrelated gratin, roll or plain-bean images. Added a centralized local image manifest (src/recipePhotos.ts), with suitable existing images preserved and new dish-specific generated illustrations under public/resources/recipes. All 43 catalog entries now have explicit local photo paths; recipe reader, library and selected menu use the same image, while saved custom images keep precedence. Home assets are unchanged. RECIPE_PHOTOS.md records the neutral natural-color generation brief and asset subjects.

Added four measured reader-reviewed recipes in src/moreReviewedRecipes.ts: honey-roasted carrots (4.7/410 ratings), garlic-Parmesan asparagus (4.8/3,345), sausage-stuffed mushrooms (4.7/84), and cranberry-brie bites (4.87/30). Publisher pages and sample sizes were checked directly. RECIPE_AUDIT.md records links, yield interpretations and timing. Appetizer batches use the existing whole-batch scheduling/arrival deadlines, and all additions use the existing ingredient scaling/shopping/prep/timeline engine. Existing IDs, choices, overrides and Home/layout/type fixes are preserved. No costs or publisher photos were invented or copied; new generated photos are illustrative.

The source-library cards previously rendered no image at all; they now show the same dish photo as the menu/reader, with compact photo/text pairs on phones and restrained photos on desktop. No new font declarations were introduced. Full npm test, npm run typecheck and npm run build passed, including 51 domain cases, real React library image/selection checks, account/purchase regressions, responsive cascade and frozen Home baseline. All 25 new generated photos were visually inspected; uploaded Git blobs match local image bytes. Source-card mobile browser appearance remains unverified pending production publication. Image asset coverage and exact/overflow appetizer ingredients/oven timing have regression checks, with React library checks for photo paths and highly-rated additions. Publication remains subject to the existing Vercel build quota; the scheduled retry must deploy newest main containing this task as well as prior font/layout/printable fixes, then verify public recipe photos and selection flows. Do not claim this update live from a saved source commit alone.


## Reference-led recipe photo correction — October 6, 2026

Owner requested photos like the two supplied editorial references: whole rainbow carrots on pale speckled stoneware and roast chicken in black cast iron. Revised the 25 newly generated recipe/drink assets with dark natural directional side light, close food crops, deep shadows, veined grey marble and tactile olive/slate linen. No amber/sepia filter or bright showroom-kitchen panorama. New assets use versioned -editorial.jpeg filenames and src/recipePhotos.ts points to them; previous square illustrations remain as unused recovery siblings. Existing suitable app food images, Home, typography, composition, all recipe IDs/data, custom-image precedence and planning/auth engine are untouched. These are generated illustrations, not publisher photos. RECIPE_PHOTOS.md records installed paths and RECIPE_PHOTO_PROMPTS.json records exact per-subject prompts.

All 25 final assets were visually inspected, including square center crops. Corrected the wild-rice/walnut squash filling and regenerated the wine image to remove an unrelated entrée. Full npm test (51 domain cases plus UI/auth/purchase/styles/Home regression checks), npm run typecheck and npm run build passed. No browser-rendered production checks are claimed. Production publication still requires a READY deployment of newest main on the existing hfo8 project; never infer live status from a source commit alone.


## Recipe audit production verification — October 5, 2026, 23:34 PDT continuation

The original recipe audit commit `e8ea95f2c7ab0f846f8dc4a27e4c6ca3730dbac4` was verified READY in the existing hfo8 project as deployment `dpl_66vnED2T2heYGfeLJNXwT26uADqp`; this supersedes that recipe section's pending-publication statement. A fresh public browser check in this continuation confirmed https://thanksgiving.thecrowandcrown.com/#menu still serves the 39-entry catalogue with 34 measured source recipes. HIGHLY RATED displayed 19 rated source recipes and zero serving plans. Classic pecan pie's reader showed 4.7/5 from 720 ratings, all measured crust/filling ingredients, the source's 12-slice yield versus 8 planned larger slices, 350°F, method/make-ahead/serving guidance and direct Allrecipes links. No menu selections, shopping overrides or account data were changed during this check.

This verifies the original recipe audit on production, not the later 43-entry/image/mobile/printable updates recorded above. Preserve those newer main changes; their production status must be verified separately. The original recipe deployment also included the earlier password-setup correction through Git history, but successful owner password save/sign-in, cross-device saving and the signed Shopify purchase flow remain separately unverified. Keep the Shopify product Draft.


## Recipe collection expansion — October 5 evening PDT / October 6 UTC

Owner said the library needed more recipes. Added 16 researched, measured, numerically rated recipes in src/expandedRecipes.ts across starters, main, sides, bread, desserts and alcohol-free cider. Saved catalogue is 59 entries, including 54 source recipes. RECIPE_AUDIT.md records ratings/samples, yields, timing and limitations. Existing 43 entries and all newer main changes are preserved. Original planning summaries link to full publisher methods; no prices or ratings were invented.

Fixed-size batches, staged cranberry bread, extended cheesecake/mousse chilling, separate egg boiling, ingredient scaling, dietary labels and prepared/guest exclusions are covered in domain/UI checks. Matching generated illustrations accompany the additions; existing spiced-cider illustration is reused for the new hot cider. Home, existing typography/layout, printables, Supabase/auth and Shopify purchase logic are unchanged. No account, credentials or schema changes. Product remains Draft. Tests/typecheck/build and production publication results are recorded below when verified.

Validation completed: full npm test passed (56 domain regressions, real React UI/library, cloud/password, purchase HMAC, responsive cascade and frozen Home at six widths). npm run typecheck and npm run build passed. All 15 new illustrations were visually inspected; installed assets have explicit paths across the menu/library/reader. Production verification follows publication; do not infer live status from this source commit.

Publication blocked: source commit `f71d751da44e888572af72186171aa1570b6908a` contains all 16 additions and 15 images; its tree `cd36bbc6b19466ca8f5f5ba93ec183d45bdf1875` exactly matched the locally tested git tree. GitHub status for `Vercel – new-thanksgiving-hfo8` returned FAILURE with target `https://vercel.com/muse-8194?upgradeToPro=build-rate-limit`; the project had no deployment for this SHA. The public app observed during this attempt had 43 entries / 38 source recipes, not the new 59 / 54. Do not claim these additions are live until a READY deployment of latest main and public library/reader/photo verification. Preserve all newer main work and use only existing hfo8 project; no plan upgrade or alternate app was created. The older 39-entry verification above was superseded by READY main deployment `dpl_AtBPiTnk5hamYsbiRGH3s7b3xMZZ` at `0d6cb27d202fc47269461d7fd7227aaa5f8153ed`, which also published the intervening 43-entry/illustration/printable/mobile source changes. This attempt only inspected the Menu; no rendered mobile or printable QA is claimed.

Prior notes refer to a scheduled retry, but the current connected automation inventory contained no enabled deployment retry. Do not promise one is running. Next action: deploy latest main to the existing project once builds are available, verify 59 entries / 54 source recipes, the rating filter and the new recipe reader/photos, then record results. Credentials and customer delivery checks remain separate; Shopify stays Draft.

## Mobile inheritance and cascade correction — October 6, 2026

Owner reported inconsistent mobile typography, shapes and overlaps. Fixed body text inside action/disclosure containers inheriting uppercase transforms and wide utility tracking. Headings/actions keep their approved uppercase roles; body copy now explicitly uses natural case and zero tracking. Font files, all role sizes, Home and planning/auth data remain unchanged.

Component geometry now loads before responsive-app.css; typography.css remains last and is still the sole font owner. Consolidated repeated phone media blocks in the menu/responsive owners instead of adding another stylesheet. Mobile headings no longer reserve legacy minimum heights; their inner columns use block flow. Personalized printable previews now grow with wrapped titles/details rather than a fixed box and clipped text. Recipe-library toolbar wraps in normal flow on phones. Header grid children can shrink with restrained action widths.

Regression checks include summary body text versus uppercase utility labels, intrinsic heading/preview heights at 320–767px, existing typography at ten widths and frozen Home. Source cascade checks do not establish physical iPhone rendering. Run full tests/typecheck/build and verify production before reporting live.


## All recipes visible and editorial image revision — October 6, 2026 PDT

Owner explicitly requested all meals/recipes visible, with no hidden recipes. Menu now renders the entire recipe library in both plan and browse views: all 54 measured source recipes plus 5 serving plans, and saved personal recipes. Removed the recipe rating/dietary filters that could hide collection cards; dietary logic and badges still serve planning. Additional publisher references are a visible section rather than a closed disclosure. Unselected serving plans no longer receive the muted class. Selected dishes still alone feed groceries/prep/budget; displaying the collection never silently adds dishes. Recipe ingredients/methods remain accessible in the existing spacious reader.

Revised all 15 expansion illustrations with intentional asymmetrical framing, closer tactile food detail, neutral daylight, defined shadows and fewer generic rustic props. Versioned -expansion-editorial-v2.jpeg assets are installed and mapped consistently across reader/library/selected menu; earlier images remain recovery siblings. RECIPE_EXPANSION_IMAGES.json records exact edit prompts and current/original paths. All 15 illustrations were visually inspected. Home imagery, typography, recipe measurements, saved choices/overrides, and the concurrent mobile inheritance/cascade correction at 1dbdc01 are preserved.

Validation: full npm test passed including 56 domain cases, actual React checks for 54 source cards + 5 serving-plan cards on initial Menu and continued visibility in both views, explicit add/remove and recipe reader, cloud/password/purchase protections, responsive cascade and frozen Home. Typecheck and production build passed. Source visibility tests establish rendered React presence, not production publication or physical iPhone appearance. Deployment results must be recorded after publishing this change. Previous instructions to check the rating filter are superseded: the owner requested no hidden recipes, so the collection has no hiding filters. Shopify remains Draft; purchase/password delivery verification is a separate unfinished task.


Publication result for the all-visible/editorial revision: main commit `0fed332b1226b6ebb812a7e0afd9cf5362a9ed3a`, tree `85a2048b07467e3433efbadc7b6856241307ef75`, exactly matched the locally tested tree including all 15 uploaded image blobs. GitHub's hfo8 deployment status returned FAILURE / build-rate-limit, with zero deployments for this SHA. Direct redeployment of the existing production deployment with latest main returned Vercel 402 payment_required: api-deployments-free-per-day, total 100, remaining 0, reset timestamp 1791356905102. An explicit connected-team request returned 404 deployment_not_found; unscoped request reached the quota rejection. No new app, alternate project or plan upgrade was created. Latest READY production remains dpl_AtBPiTnk5hamYsbiRGH3s7b3xMZZ at 0d6cb27, so the all-visible change and 59-entry expansion are saved, not live. Once the existing project can deploy, publish latest main and verify all 59 entries without hiding filters, expanded source references, new images and recipe readers in the public Menu. No enabled retry is asserted. 

## 2026-10-06 Restore mobile visual structure
User explicitly requested fixing the lost structure. Removed the mobile surface-flattening rules introduced by b96ea937: Menu frame, grouped disclosures/printable categories, guided workflow and prep cards now retain their existing frosted surfaces, borders and gaps. Mobile Menu container geometry has one owner in responsive-app.css. Kept 1dbdc01 typography/inheritance, intrinsic height and overlap fixes; Home, desktop composition, all 59 visible recipes, revised thumbnails and planning/account logic remain intact. Regression coverage now asserts mobile framed surfaces and section gaps alongside existing type and layout checks.
Deployment correction: 1dbdc01 was verified READY on production as dpl_74J5YGuGu28AyBMQZNEZyS6NAgqq; earlier notes identifying 0d6 as latest are stale. This restoration needs its own deployment verification. Source cascade tests do not establish physical iPhone rendering.

## October 6 — Separate selected menu from unified recipe library
Owner requested all dishes together and a separate place for the selected menu because inclusion was unclear. This supersedes the prior instruction to render the library below the plan. #menu now contains only selected dishes and planning support. Add a dish/Browse all opens #recipes, a separate view with all 59 built-ins plus personal recipes in one consistent card grid; source recipes and serving plans are no longer separate collections. Every card retains explicit Add to menu or In your menu / Remove from menu actions. Direct reload and history restore the correct view. Recipe methods, ingredients, guest scaling and saved selections remain the same. Home and shared typography are unchanged.
Previous restoration 4dab673 was published READY as dpl_2tsNK1USJVx1XEuKCrVRGKdBTiGD on thanksgiving.thecrowandcrown.com; this entry requires its own deployment verification.


## October 6 — Correct shared type hierarchy against actual Home
Owner again reported type mismatch. Live computed styles confirmed correct local fonts but a mismatched system: Home display weight100 versus planning weight200, Home eyebrow Metropolis 10/8px versus planning Lato11px, desktop planning title36px and independent reader30px. Corrected existing typography.css roles: primary display100, titles28 desktop/24 phone, card/section18 desktop/14 phone, body13/12, eyebrow10/8, utility9 and controls11/10. Recipe body descriptions retain body size rather than utility size. Reader title uses one responsive token instead of independent desktop/phone overrides. Removed generic heading selectors also targeting functional disclosures. Home CSS stays byte-for-byte unchanged. This is a shared hierarchy correction, not evidence of missing fonts or an external stylesheet overriding them. Preserve separated #menu / #recipes and all current planning data.

Focused role regression found a real specificity conflict: the grouped utility selector included .field>span:first-child, raising specificity for every selector in its :is() list and defeating the eyebrow font/size role. Converted that utility group to :where() so named roles win predictably. Phone card checks cover the actual winning title, eyebrow, description and control roles, alongside frozen Home.

## Recipe completeness and planning mapping — October 6, 2026 PDT

Owner reported incomplete methods and asked for accurate mapping into prep and shopping. Read all 54 linked publisher pages; all 59 built-in entries now have ordered cooking or serving steps. `src/completeRecipes.ts` supplies the reviewed adaptations, pantry checks, ingredient allocation notes and advance/prep phases; the existing measurements remain the base, with missing water and breast seasoning corrected. Five packaged-food/drink records are explicit serving plans. `RECIPE_AUDIT.md` lists sources and scope; `tests/fixtures/recipe-audit.json` freezes checked batch measurements independently of production records. No kitchen-testing claim is made. Customer overrides remain intact.

Shopping includes visible, deduplicated pantry/supply checks with recipe attribution and no guessed quantities or spend. Incomplete custom drinks no longer bypass readiness. Prep opens the cooking reader and displays timed brining, dough rises, chilling, maceration, infusion and freezing tasks; Timeline checks their dependencies. Turkey-breast bread drying and gluten-free skillet preheating are oven stages. Apple-pie total now includes four-hour cooling; mashed-sweet-potato/gratin totals and prep allowances corrected. Poultry/stuffing instructions use USDA 165°F checks as a documented conservative adaptation; cook times are estimates. Whole pans/birds retain source-size durations and separate reservations.

Concurrent main changes `0122db4`, `7654865` and `ef92770` were preserved: Menu shows selected dishes, the separate #recipes page contains all 59 records without hiding filters, and newer Home typography/single preloads remain. Conflicts were resolved around the new unified recipe library; no older duplicate grid was restored. Public domain was verified READY at `ef92770` before recipe publication.

Validation passed before production publication: full regression suite (including 56 original domain tests, all-catalogue exact/overflow shopping/capacity/ownership checks, actual React reader/pantry/Prep checks, cloud/purchase and typography/Home protections), typecheck and production build passed. Record deployment result below; do not infer live from a GitHub commit. Shopify stays Draft; unresolved purchase-email/password delivery is separate from this recipe correction.

## October 6 — Mobile legibility correction after owner rejection
Owner confirmed the remaining issue is on mobile. The previous hierarchy pass wrongly extended Home's hero Thin weight to small card and section headings and left recipe details at 9px. Large page/reader titles retain Thin; shared small headings return to ExtraLight 200. Phone roles are now 24px title, 16px section/card, 14px tertiary, 13px body, 11px recipe metadata/actions, 10px field/utility labels, with Home's 8px eyebrow retained. Card tracking is restrained to .045em so long uppercase recipe names wrap coherently. Home stays exact.
Found a second real conflict: light-fill text color on Add a dish was winning while menu-studio.css had changed its surface to black frost. Dark Menu controls now explicitly retain white ink. Mobile primary menu actions have full-width rows, and menu photo columns adapt to available width rather than reserving 108px on every phone. One owner remains for font declarations; no ingredient/guest/shopping/account changes. Cascade tests include 320px, metadata legibility, light text on dark add controls and action width. Live desktop browser inspection is possible; local phone-width iframe QA was blocked by the browser's localhost policy, so physical iPhone appearance is not claimed.


## October 6 — Replace internal reference list with complete customer recipes
Owner pointed to “More recommendations from your file” in #recipes and requested real recipes. Removed the internal source-reference UI and its obsolete list. Existing imported recipes cover the repeated turkey breast, spatchcock turkey, mushroom pot pie, stuffing, green beans, cranberry, pies, appetizers and stuffed squash ideas; their existing IDs/data remain. Added four complete cards in src/referenceRecipes.ts: classic brined roast turkey, mushroom/pecan vegetarian dressing, tarragon green beans, salted-butter apple galette with maple cream. Library now has 63 built-ins (58 measured recipes and 5 serving plans), with unchanged explicit Add/Remove actions. New generated dish illustrations are installed locally.

Sources are direct Alton Brown brined turkey, Serious Eats vegan stuffing, Frosted Kale's reproduced Martha Stewart tarragon recipe (the old Martha link now redirects to a different recipe), and Bon Appétit's galette plus full homemade tart dough. Brined turkey uses the complete Alton formula rather than the old incomplete Martha brine outline, with conservative 165°F checks, no raw-poultry rinsing and refrigerated brining. Dressing plans ready-to-use vegetable stock. Galette includes dough/glaze eggs and separate salted/unsalted butter; cream is separate at serving. Numeric galette rating is shown truthfully as 4.0, never promoted as a high-rated pick. New records use whole bird/casserole/galette batches, quantitative groceries, cooking/resting/brining/chilling tasks and guest/purchased exclusions. Domain recognizes the brined turkey for thaw/capacity/carving. Existing customer selections, overrides, Home, shared typography and accounts remain untouched.

Validation: full npm test, npm run typecheck and production build passed. Checks cover 63 visible cards, removed internal references, overflow batches, brining/chilling timeline entries and guest contributions; existing account/purchase/typography/Home protections passed. Production publication must be confirmed for this commit before calling it live.


## October 6 — Complete Activities (#experience)
Owner reported Activities had no usable content. Replaced generic option buttons with 10 full activity cards: six existing named options retain their IDs, plus Who knows the room, Thanksgiving charades, kids’ scavenger hunt and bingo. Each includes audience, timing, actual instructions/prompts, scaled supplies, explicit Add/Remove state and print action. The selected plan is above the library; custom activities remain supported. Activity names remain the saved state keys, preserving previous selections and timeline/print overrides.

Shared src/activities.ts provides original game content, paper/pencil quantities, timeline offsets and printable content. Shopping now includes selected activity supplies; reusable pencils use the largest requirement, paper adds across activities, and kids-only supplies use child count. Supplies intentionally have no invented prices. Timelines place arrival/pre-dinner/dinner/dessert games appropriately; custom games retain the old fallback timing. Selected activity printables contain real prompts instead of filler. Printing renders modern black/white instruction pages, cut-apart prompt cards or kids’ writing/drawing areas; bingo has a real shuffled 3 × 3 board. Personalized printable overrides remain intact.

The unhelpful large photo was removed from this working page; frosted surfaces, responsive one/two-column cards and shared typography remain. No Home, recipe, account or purchase changes. Full npm test, typecheck and production build passed, including real React add/remove controls and independent quantity/timeline/print output checks. Source tests do not establish physical iPhone rendering. Production publication must be confirmed for this commit.

Previous recipe correction 2e92e939 was verified READY as dpl_7HPUELGvQUsjnYRQW7M3zwPDE7gu; public JS matched the tested build and all four new photo bytes matched.

## October 6 — Plan Menu and selected Menu navigation
Owner requested Plan Menu with all recipes and a separate Menu tab. Home's menu destination and the guided drawer now open Plan Menu (#plan-menu), containing the entire recipe catalogue including personal recipes. Menu (#menu) is a distinct guided navigation destination containing only selected dishes, quantities and responsibility. Legacy #recipes links still open Plan Menu. The view derives from the active tab so reload, back and forward share one route state. Explicit Add/In your menu/Remove controls and existing shopping/prep scaling are retained. No CSS, font or photography changes. UI coverage verifies both drawer destinations, the 63-dish catalogue, synchronized add/remove controls and route reload/history.

## October 7 — compact composition correction

Home remains frozen. The earlier font-only adjustments did not resolve the owner's complaint. Menu and Plan Menu now use one consolidated composition sheet (`menu-studio.css`), lighter neutral glass borders, smaller photos, consistent spacing, and two actions per library card. Library cards show category, title, concise time/base-yield facts, publisher, and explicit selected status; detailed original yield, ratings and methods remain in the reader. All 63 dishes and planning mappings remain intact. Mobile uses a single column; desktop uses two catalogue columns and a selected-menu support column.

Typography remains exclusively in `typography.css`: the shared card role is 14px phone / 16px desktop, below section headings, with Metropolis 200; large page titles retain Metropolis 100 and functional text retains Lato 300. Action tracking is reduced to .09em for cleaner wrapping. Do not stack new font overrides onto component styles. Desktop page descriptions now stay with their headings.

`/resources/layout-review.html` is a noindex visual QA page embedding the real app at 320, 390 and 430 CSS pixels. It is not linked in customer navigation. Use it to inspect actual narrow rendered layouts when the review browser cannot resize; source cascade tests alone are insufficient. This is viewport review, not physical iOS device verification.

Live narrow-width review identified two additional conflicts: a high-specificity grouped button selector defeated phone padding and quiet secondary actions, and a 160px flex basis became the guest field's height when its parent switched to a column. The grouped control selector is corrected at its source; phone guest entry now uses an explicit one-column grid with a normal field height. The old light-background `!important` guest-button rule was removed so the existing dark primary control can apply. Selected-menu thumbnails are 72px on phones to leave room for full title words. Browser review confirmed Shopping's item editor opens. Full regression, Home baseline, typecheck and production build pass; continue live viewport verification after deployment.

## October 7 — app-wide restraint
Shared planning headers now keep instructional prose behind a How it works disclosure; menu counts remain visible. Guided progress has one step indicator and next action without repeated save/navigation copy or a surrounding box. Menu's outer nested frame and decorative header photo are removed; actual recipe photos remain. All planning surfaces use intrinsic height, compact shared header spacing and 20px desktop / 16px phone internal padding. Guest entry is an unboxed action row; Prep's photo is a restrained strip. Home and the sole typography owner are untouched. Review every route, not only Menu.

Live all-page review found grid gaps doubling field margins, an expanded Budget notice preceding the title, and light-sheet text inheriting into the unboxed guest input. Field margins are removed inside grids, Budget keeps a concise closed price disclosure, and guest entry no longer inherits light-sheet text. Printable download instructions move into the page guide; the collection action is unboxed. Party-Day is a mode button, not a hash route.

## October 7 — remove remaining repeated UI
Owner rejected the earlier completion claim. Page Guide now sits beside the small chapter label rather than taking an entire row below the title. Selected Menu no longer repeats Your dishes and PLAN FOR below its own heading/counts; filters lead directly to dishes. Library's repeated instructional sentence and Guests' repeated RSVP paragraph are removed; instructions remain in the Guide. Shopping has one headcount context. Budget statistics are a compact row with no nested boxes. Closed transparent integrity notices apply only to details, preserving the pale background and contrast of always-visible missing-data notices.
# Seating mobile verification
The final rendered review found the legacy four-column room statistics overriding its earlier phone breakpoint. The responsive owner now explicitly uses two bounded columns below 768px, preventing place-setting totals from overflowing at 320px and 390px.
