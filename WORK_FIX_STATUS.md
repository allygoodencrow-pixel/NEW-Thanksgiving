# Work fix checklist — implementation status

Updated October 13, 2026. Existing app: https://thanksgiving.thecrowandcrown.com/
Work branch: `codex/sale-readiness-2026-10-10`; integrates the relevant planning fixes from PR #13 with current main `81f2e8f9a2af21ba47b9fe74ade24f7b7e2c7e2b`.

The fixes below are implemented and pass automated checks. They remain **In progress** until the appropriate browser/device/output acceptance checks pass. Production has not received this fix branch. The latest main purchase-account implementation and its documentation are preserved, including the current paid-access gate, 63-record library and private original-printable delivery.

| Task | Priority / dependency | Status | Implementation and automated evidence | Remaining verification |
|---|---|---|---|---|
| T00 baseline | First / none | In progress | Correct repository and existing projects confirmed; required instructions read; desktop Home baseline captured; source/rendered typography baseline checks pass at six widths | Phone before/after visual evidence |
| T01 durations | P0 / T00 | In progress | Shifted starts propagate cooking endpoints, prep/rest and dependent stages; required duration and oven conflicts checked; domain regressions pass | Edited schedule and refresh in preview |
| T02 advance work / holding | P0 / T01 | In progress | Explicit full/prep/stage metadata; completed full work removes duplicate cooking; staged dressing retains final bake; cold casserole finishing retained; early hot dishes require a concrete holding resolution | Full one-oven hosting scenario; unresolved holding must remain visible |
| T03 host buffer | P0 / T01–02 | In progress | Requested buffer reports unchecked overlapping tasks rather than promising protection; regression checks pass | Change buffer and complete tasks in preview |
| T04 serving | P1 / T02 | In progress | Verified recipes use explicit hot/chilled/room service metadata; missing instructions are identified | Prep/timeline/helper output inspection |
| T05 actual budget | P0 / T00 | In progress | Actual remaining separated from planned balance; linked partial receipts reconcile forecast; unknown prices suppress upgrade advice; overspend tests pass | Receipt editing and persistence in preview |
| T06 category totals | P0 / T05 | In progress | Totals share effective shopping quantities/prices; pricing route and denominations clarified; decimal/category regressions pass | Shopping-to-budget journey |
| T07 recipe readiness | P0 / T00 | In progress | Incomplete homemade ideas visibly blocked with purchased/complete alternatives; suggested rolls are purchased; operational counts distinct | Menu/library resolution journey |
| T08 dietary data | P0 / T00 | In progress | Shared legacy-plus-checkbox representation; declined guests excluded; summary and output regressions pass | Printed/current-plan dietary review |
| T09 controls/mobile | P0 / T00 | In progress | Scoped contrast styles, purchased rows readable, single-line guest input and compact phone shopping; 16px input and zoom checks pass | Actual background contrast, focus/touch and phone screenshots |
| T10 first use | P1 / T07,09 | In progress | Blank/suggested/explicit sample choices, accessible setup dialog, current headcount explanation; first-use and legacy-plan UI tests pass | First-use full hosting journey |
| T11 library/default gravy | P1 / T07 | In progress | Unified searchable collection; all 63 current records remain visible; selection synchronized; suggested plan removes redundant gravy; UI/domain tests pass | Search and recipe selection in preview |
| T12 practical buying | P1 / T06 | In progress | Exact requirements preserved; whole-buy guidance and package-size/package-price conversion; decimal locks/adjustments retained | Price-entry workflow and edge cases in browser |
| T13 households/highchairs | P1 / T08,10 | In progress | Stable guest-ID household links and child highchair needs; active chair shortages reconcile; normalization/domain checks pass | Independent RSVP/diet and saved guest journey |
| T14 seating/room | P1 / T13 | In progress | Names at seats, table-specific capacities/dimensions, room placement with drag/keyboard/numeric alternatives and bounds/overlap warnings | Phone touch, keyboard movement and refresh |
| T15 linens | P1 / T14 | In progress | Cloth dimensions include drop; quantities and owned inventory feed shortages; geometry/count tests pass | Shape/dimension edits in preview |
| T16 products | P1 / T12,15 | In progress | 27 verified owner-source products with exact titles/ASIN URLs; 17 destinations retrieved, 10 explicitly unverified; five source placeholders excluded; pack/owned allocation avoids duplicates | Product display and destination checks; live prices/stock are not claimed |
| T17 drinks | P1 / T07,12,13 | In progress | Direct drink selection from Activities + drinks; approach/adult drinkers explained; existing zero-drinker alcohol pause retained | Menu/shopping/staging journey |
| T18 activities | P1 / T13 | In progress | Real questions, games, kids prompts and materials; selections feed shopping/timeline/outputs; targeted domain checks pass | Content/output visual review |
| T19 print products | P1 / T08,14,18 | In progress | Individual/batch print-to-PDF and PNG; physical tent/fold/letter dimensions, local fonts, overflow handling and 300-DPI PNG metadata; structural tests pass | Native print/PDF, PNG downloads, font/layout clipping and physical-size print check |
| T20 accessibility | P1 / T09 | In progress | Completion toggles expose pressed state; focus styles, labelled controls and setup focus cycle; UI/cascade checks pass | Keyboard end-to-end, measured contrast and screen reader |
| T21 save status | P1 / T00 | In progress | Local/cloud/pending/error destination exposed; existing queued saves/revision/recovery/isolation preserved; fake transport tests pass | Live authenticated save and recovery |
| T22 next action | P2 / T01–10,21 | In progress | Party plan links unresolved work; existing Home utility labels are preserved; approved composition/fonts/photos preserved; Home regression passes | Before/after Home visual comparison |
| T23 day mode | P2 / T01–04,18,20 | In progress | Event-date local clock, effective adjusted now/next and explicit future-event preview; UI checks pass | Phone day execution and refresh |
| T24 customer email | P0 / T00 | In progress | Current Supabase auth logs show successful October 10 QA signup/login/deletion and owner recovery request. Current Shopify and Etsy custom-auth handlers are deployed. Historical October 5 SMTP/signature failures are not current evidence | Confirm buyer delivery, password setup/recovery and returning-buyer access with a real checkout; verify live paid-checkout delivery through Crow Make |
| T25 release journey | Gate / all applicable | Blocked | October 10 combined branch passes typecheck, full tests and production build. Live custom-domain signed-out access gate verified | Authenticated browser, actual phone, native print/download, live purchase and two-device persistence acceptance |

## October 13 production release

PR #14 was merged at `f65cfd79e5694dcaecec1f6835c322d1a69de04f`. Vercel production deployment `dpl_tATKsTGSwxLfrLsDbJMHQcA8NQK9` is READY, and the custom domain resolves to that deployment. The fixes are now production; the earlier branch-only statements below describe the October 10 audit.

Re-ran full npm test, typecheck and production build successfully. Live opening screen shows SET UP YOUR LOGIN; anonymous paid-printable POST returns 401 sign_in_required, and the printable storage bucket remains private. Crow Make fulfillment scenario 6585181 is active with no incomplete executions; current run 4f8440443354459f8c18b1418a4e102b succeeded. That receipt scan does not certify a real paid app order.

The secure browser sign-in submission returned Invalid login credentials. Authenticated browser, second-device recovery, native print/download and actual paid order-to-email acceptance remain unverified. No owner password or party was changed. Commerce release readiness remains BLOCKED.

The repository is still public. The prepared GitHub privacy confirmation explicitly warns that Advanced Security and custom Dependabot alert rules will be disabled and existing forks remain public. The privacy change was not submitted; it requires action-time confirmation because it disables security monitoring.

## Audit coverage

All 32 findings are assigned; none is declared fully verified solely from source edits or automated tests.

| Findings | Tasks |
|---|---|
| 01 | T01 |
| 02, 11, 12 | T02 |
| 03 | T03 |
| 04 | T05 |
| 05, 17 | T06 |
| 06 | T07 |
| 07 | T08, T19 |
| 08, 20, 21 | T09, T20 |
| 09 | T24, T25 |
| 10 | T10 |
| 13 | T04 |
| 14, 15, 16 | T07, T11 |
| 18, 19 | T12 |
| 22 | T13 |
| 23 | T14 |
| 24 | T15 |
| 25 | T16 |
| 26 | T18, T19 |
| 27 | T17 |
| 28 | T19 |
| 29 | T20 |
| 30 | T21 |
| 31 | T22 |
| 32 | T23 |

## October 10 live commerce audit

- Correct Vercel production is READY at main `81f2e8f9a2af21ba47b9fe74ade24f7b7e2c7e2b`; this branch is not production.
- Supabase connector is working; paid-printable and Etsy fulfillment functions are deployed. Service-only tables intentionally have no client RLS policies.
- Shopify app product `10788940677414` remains DRAFT at $28.99. Zero-price duplicate `10788930289958` archived. Existing printable-only product was preserved.
- Etsy app listing `4592268976` remains DRAFT at $39; listing has its Start Here PDF. Crow Make Etsy API verified live and shop receipts returned count 0. No real paid Etsy fulfillment can yet be certified.
- User selected Crow Make account. Hourly scenario `6585181` is active, using saved HTTP credential `11622828`. Secure health, empty receipt scan, and unpaid/irrelevant fixture mapping passed; live paid-checkout delivery remains unverified.
- Repository is public: original-art historical access must be removed by making the repository private before claiming exclusive paid delivery.

Release gate: verify live fulfillment, review the existing Vercel preview with a paid account, verify purchase-to-email-to-login-to-private-download, saved-party recovery and native print output. Keep commerce listings draft until these gates pass. No new app, hosting project or backend was created; preview protection remains enabled.

## October 13 email-link sign-in recovery

After repeated invalid-credentials responses, verified the owner account is confirmed and not banned. Added EMAIL ME A SIGN-IN LINK / SEND SIGN-IN LINK to the existing account form. The client uses signInWithOtp with shouldCreateUser:false and the existing app origin; sending a link does not bypass purchase grants, change a password, or replace parties. The password flow and invitation/password-recovery flows remain available.

Full npm test passed, including the new real React email-link request regression, unpaid-access gate, account isolation and saved-party cases. Typecheck and production build passed. Live OTP request for the owner succeeded; the branded email arrived in the approved owner inbox at 2026-10-13T07:19:20Z with subject Open your CROW & CROWN Thanksgiving planner. Authentication by opening that link, two-device saving and paid checkout remain acceptance checks, not completed evidence. Source commit: 0a6e157975b296dac54343a108f32cb9082adc36.

## October 13 purchase password setup correction

Owner rejected passwordless login as the buyer onboarding flow. PR #15 was merged at 218f5f0bce36dc0b585deb8203ddec88276a765f. The earlier EMAIL ME A SIGN-IN LINK shortcut is removed. Invite, recovery and historic magic-link arrivals stop at password setup; the setup dialog has no dismiss or party controls. Shopify existing-account delivery now keeps ?setup=1. Both commerce handlers send password recovery/setup mail for an existing account; first-time buyers retain individual invitations. Existing passwords are not changed by sending mail, and saved parties/access grants are preserved.

Full npm test, typecheck and production build passed, including setup-intent capture after SDK URL consumption, required setup controls, checkout-email routing, account reuse, duplicate protection and existing saved parties. Shopify function v8 and Etsy function v3 are deployed ACTIVE. A fresh owner setup-email request could not be verified because the execution environment canceled network approval; only the earlier passwordless test email was found in the inbox. Do not call that previous sign-in email a purchase invitation or claim a fresh paid checkout passed. Confirm actual buyer purchase-to-setup-email-to-password and two-device persistence before sale readiness.
