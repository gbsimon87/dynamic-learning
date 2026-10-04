# Year 3 Science diagrams: review follow-ups

**Status: open, not started.** Found in the bug and security review of commits
`11c74a0`, `a792628`, `2de40f9` and `f4837d6` on 2026-10-04 (the illustrated
anatomy, rocks and plants diagrams; see `DIAGRAM_ASSETS_PLAN.md` and
`PLANT_DIAGRAMS_PLAN.md`). Nothing here is high severity, and nothing
affects learner progress. The shipped app had no security flaw; the security
items are in the offline asset scripts and the licence notices.

Tick items off as they are done. Run `npm run lint`, `npm test` and
`npm run build`, and check the affected topics in the browser in both themes.

## Bugs

- [ ] **1. Medium: the dog card shows no skeleton.**
  [SkeletonIllustration.jsx](../../src/components/challenge/SkeletonIllustration.jsx)
  (`animal !== "human"` branch, `AnimalPicture`).
  - The dog questions ask about its skull, rib cage and backbone (rows 26–28
    of `src/data/challenges/science/skeletonsForSupportAndProtection.js`,
    e.g. "A dog's rib cage surrounds its heart and lungs").
  - The illustrated card shows only the outside of a Fluent dog, with
    `alt="A dog"`. The classic `SkeletonFigure` drew those bones and
    described them for screen readers.
  - **Fix:** use `SkeletonFigure` for `dog`. Keep the emoji for the crab and
    beetle, whose skeleton is on the outside.
- [ ] **2. Low-medium: the leaf account draws a land plant underwater.**
  [FossilLayersIllustration.jsx](../../src/components/challenge/FossilLayersIllustration.jsx)
  (the water path in the `life` phase).
  - Account `lake-leaf` says "A leaf grows on a living plant near mud beside a
    lake", but the picture puts the plant inside the water.
  - **Fix:** draw the water only when `kind !== "leaf"`.
- [ ] **3. Low: the back muscle doesn't get longer from half-bent to bent.**
  [ArmMovementIllustration.jsx](../../src/components/challenge/ArmMovementIllustration.jsx).
  - Drawn lengths in SVG units, from the anchors in `bodyparts3d/arm.json`:

    | Pose | Front | Back |
    |---|---|---|
    | straight | 100.1 | 87.2 |
    | half | 87.3 | 93.2 |
    | bent | 72.2 | 92.6 |

  - `MOVEMENT_POSES` (`src/data/movementDiagram.js`) says the back muscle is
    "longer" when bent. Only the bulge width shows the change.
  - **Fix:** adjust the triceps attachment points (in `render-bones.html`,
    `renderArm`, then re-render), and add a test that each muscle's drawn
    length follows the `MOVEMENT_POSES` order.
- [ ] **4. Low: each muscle-map view says both muscles are coloured.**
  [MuscleMapFigure.jsx](../../src/components/challenge/MuscleMapFigure.jsx).
  - Both `<title>`s list "front of the upper arm, back of the upper arm",
    but the front view colours only the biceps and the back view only the
    triceps.
  - There is no visible "Front" or "Back" label.
  - **Fix:** build each title from the groups that match in that view, and
    show `view.label` as visible text.
- [ ] **5. Low (cosmetic): two labels.**
  - "Shell-shaped mould" overruns its card by about 8 px. `LayerLabel` in
    `FossilLayersIllustration.jsx` estimates width as `length * 7.4 + 12`;
    use about 8.3, or measure the text.
  - "Fossil imprint" in
    [RockSampleIllustration.jsx](../../src/components/challenge/RockSampleIllustration.jsx)
    sits partly on the pale rock, which is hard to read in dark mode. Move it
    to y ≈ 22, or give it a halo (`paint-order: stroke`).
- [ ] **6. Low (Plants).**
  - The woody plant always shows the same tree leaves, while its description
    names one of four leaf shapes (e.g. "narrow flat shapes"). No question
    asks about the leaf shape. Either render the tree per leaf shape, or word
    the woody descriptions without a shape.
  - The "hoverfly" pollinator uses Fluent's housefly picture
    (`POLLINATOR` in `FlowerLifeCycleIllustration.jsx`). Consider a drawn
    hoverfly, or caption it "A fly".

## Security and licences

- [ ] **7. Low: Chrome runs without its sandbox in the render scripts.**
  `scripts/science-assets/render-bones.mjs` and `render-trees.mjs`.
  - playwright-core turns the sandbox off unless told otherwise. The page also
    runs the downloaded ez-tree code and can reach any website.
  - **Fix:** pass `chromiumSandbox: true` to `chromium.launch`, and add
    `page.route("**", (r) => r.abort())` before the `render.local` route.
- [ ] **8. Low: downloads are pinned to a commit but not checksummed.**
  `vendor.mjs`, `render-bones.mjs`, `render-trees.mjs`.
  - GitHub serves commits that exist only in a fork under the original repo's
    name, and the `node_modules/.cache` copies are trusted without a check.
  - **Fix:** store a sha256 per file in `sources.json`, verify it on download
    and on cache reuse, and confirm each pinned commit is on the upstream
    default branch.
- [ ] **9. Low: a file path comes from downloaded data.** `render-bones.mjs`
  writes `atlas.chunks[id].url` (from the downloaded `atlas.json`) under the
  cache with `path.join`. A `../` in it would write outside the cache. It is
  safe with today's values.
  - **Fix:** accept only `/^\/models\/body-\d+\.bin$/`, or check the
    resolved path stays inside the cache folder.
- [ ] **10. Low: nothing strips scripts from future SVGs.** SVGO's
  `preset-default` in `vendor.mjs` does not remove scripts, and no test
  checks. All 29 current SVGs are clean.
  - **Fix:** add the `removeScripts` plugin, and a test in
    `src/data/scienceAssets.test.js` that rejects `<script`, `on*=`,
    `foreignObject`, `javascript:` and any href or `url()` that isn't `#…`.
- [ ] **11. Low: licence notices are incomplete in the built app.**
  - The CC BY 4.0 captions (Bioicons, BodyParts3D) give no licence link and
    don't say the art was adapted.
  - The MIT (Fluent, Equinor, ez-tree) and Apache-2.0 (body-muscles, with its
    NOTICE) licence texts are in the repo but not in `dist/`.
  - **Fix:** generate a third-party notices page from
    `src/assets/science/manifest.json` (licence texts, the NOTICE, licence
    URLs and "adapted" notes), and link it from the `.science-credit`
    captions. This is a small feature of its own.

## Checked and fine

- Every hook runs before any early return. The `failed` fallback resets for
  each question, because the rounds are keyed by question index. React 19.2
  fires `onError` on SVG `<image>`.
- React 19.2's `useId` ids (`_r_N_`) are safe in `url(#…)` and
  `aria-labelledby`.
- Every value the question banks produce has a picture.
- The vendored SVGs, the body-muscles data modules and the JSON files hold
  no scripts, event handlers or outside links.
- `playwright-core` and `svgo` are dev dependencies with no install scripts;
  nothing in `src` imports them or ez-tree.
- No user data reaches any image link, style or SVG path.
