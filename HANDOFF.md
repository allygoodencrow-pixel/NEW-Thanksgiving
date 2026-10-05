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
