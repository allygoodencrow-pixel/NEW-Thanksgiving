# Crow & Crown Thanksgiving — continuation handoff

Updated October 5, 2026. Continue this existing Sites project; do not create or switch to another Thanksgiving app.

- Project: `appgprj_6ab9b5c406b88191835e71782dd05346`
- Project link: `sites-project://appgprj_6ab9b5c406b88191835e71782dd05346`
- Published app: https://crow-crown-thanksgiving-hosting.allygoodencrow.chatgpt.site
- Read `AGENTS.md` and `DESIGN_DIRECTION.md` before editing. Open the current project source through Sites; do not assume this handoff describes a later version.

## Owner's design requirements

Home is the approved typography reference. Keep its existing design. All other pages follow its thin Metropolis headings, Lato functional text, uppercase utility labels, restrained scale and intentional negative space. `src/typography.css` is the single owner of screen typography. Keep mobile inputs at 16px and preserve browser zoom.

Menu uses neutral smoky translucent cards, light text, fine borders and black translucent buttons. Shopping uses a distinct light translucent list sheet with black controls. No green buttons/boxes, amber grading, gold accents or new font substitutions. Keep the photographic background and food photos. Mobile and desktop use distinct layouts; do not merely shrink the desktop surface.

## Current implementation

The app is React/Vite. `src/App.tsx` owns the interface; `src/domain.ts` derives the plan; `src/guideRecipes.ts` holds source recipes. Preserve permanent guest IDs, recipe yields/batch rules, responsibility, purchased-versus-homemade status and saved overrides.

Expected counts Attending + Pending; Confirmed counts Attending. Estimated and Custom intentionally use their own numbers. Recipe ingredients, supplies and timelines derive from the active planning headcount. Locked shopping quantities stay locked; adjustments follow automatic quantities.

Shopping rows have a full-row Edit control, a direct quantity field, decimal quantity/price drafts, stepper controls, reset, quantity mode and Done. Guest entry is a labelled section immediately under the Guests heading. The guest-name font exception was removed because it defeated mobile input sizing. Quantity displays preserve decimals rather than rounding amounts above ten to whole numbers.

Plans currently save on the same browser/device in localStorage (`cc-thanksgiving-v4`). Project-source access in another chat does not transfer a person's saved plan or provide cross-device account storage.

## Validation and limits

The last application change was published as version 44, source `f64e49f5368ee3faac9d98c489ec0e25bf4aa95e`. Domain, UI, responsive cascade, Home baseline, type checks and production build passed. UI checks include adding/declining a guest and observing changed mapped shopping ingredients, decimal quantity/price editing and menu/library selection synchronization.

Visual browser review was unavailable in that session. Do not claim screenshot verification or owner approval of the newest styling. Preserve Home and investigate concrete reported issues before adding more style overrides. Run the required checks after application changes and publish back to this same project.

## GitHub continuation

The owner authorized syncing this exact app into `allygoodencrow-pixel/NEW-Thanksgiving` on October 5. GitHub main now carries the application source, assets and standalone regression fixtures. GitHub chats can edit that repository after reading these instructions. Publishing to the existing Site still requires Sites access; GitHub commits do not automatically publish this Site. Do not create another app to bypass the Sites access problem.
