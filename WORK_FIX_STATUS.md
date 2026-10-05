# Work fix checklist — implementation status

Updated October 5, 2026. Existing app: https://thanksgiving.thecrowandcrown.com/
Work branch: `codex/work-fix-checklist`; draft PR: https://github.com/allygoodencrow-pixel/NEW-Thanksgiving/pull/13

The fixes below are implemented and pass automated checks. They remain **In progress** until the appropriate browser/device/output acceptance checks pass. Production has not received this fix branch. The latest main purchase-account implementation and its documentation are preserved, including main `0b72e13e1cf6d5100495acb18b6e7a730d9d5915`.

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
| T11 library/default gravy | P1 / T07 | In progress | Unified search/filter collection; selection synchronized; suggested plan removes redundant gravy; UI/domain tests pass | Search and recipe selection in preview |
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
| T22 next action | P2 / T01–10,21 | In progress | Party plan links unresolved work; existing Home utility labels show review count/readiness; approved composition/fonts/photos preserved; Home regression passes | Before/after Home visual comparison |
| T23 day mode | P2 / T01–04,18,20 | In progress | Event-date local clock, effective adjusted now/next and explicit future-event preview; UI checks pass | Phone day execution and refresh |
| T24 customer email | P0 / T00 | Blocked | Latest main retains purchase invitations/password setup and signed order handler; purchase/account tests pass. Latest handoff records real SMTP 535 invalid credentials | Secure owner SMTP credential and Shopify signing-secret entry, external delivery/password setup/recovery and returning-buyer checks; latest main handoff records gateway/webhook configuration completed; follow PURCHASE_SETUP.md |
| T25 release journey | Gate / all applicable | Blocked | Combined latest main plus fix branch passes `npm run typecheck`, `npm test`, `npm run build`; purchase, cloud, domain, UI, print structure, responsive and Home checks included | Protected preview sign-in was canceled; browser hosting journey, actual phones, native outputs, live accounts/two-device persistence remain unverified |

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

Next work: review the same branch on the correct existing Vercel preview, complete browser/mobile/output acceptance checks, and repair/verify customer email. Keep the PR draft and the Shopify product draft until their release gates pass. No new app, hosting project or backend was created for these fixes. No preview protection was weakened.
