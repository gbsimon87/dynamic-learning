# Year 3 Science: plant diagrams plan

**Status: done 2026-10-04.** All five Plants topics are illustrated. What
shipped differs from the plan below in a few places (see "What changed in
delivery" at the end).
**Goal:** replace the hand-built diagrams in the five Plants topics with real,
child-friendly artwork, the same way the anatomy and rocks topics were done
(`DIAGRAM_ASSETS_PLAN.md`). We take only the specific files we use from three
open-licensed sources and commit them. No source becomes a runtime
dependency. The classic `*Figure.jsx` components stay as the fallback, behind
the same `DIAGRAM_STYLE` switch.

## Scope: topics and figures affected

| Topic | Current figure | Gets |
|---|---|---|
| Parts of Flowering Plants | `PlantFigure` (lines, ellipse petals) | Real root system (B), Fluent bloom (A), rendered blossom tree for the woody form (C), shaded stem and leaves drawn by us |
| What Plants Need to Grow | emoji in the needs guide | Fluent sun, droplet, wind, seedling and potted plant (A) |
| Water Transport in Plants | `WaterTransportFigure` | The same plant art as above (A, B, C); a drawn glass jar and coloured water |
| Pollination and Seed Formation | `FlowerLifeCycleFigure` | A real cut-open flower (B); Fluent bee, butterfly, fly, wind and seedling (A); shaded seed cases drawn by us |
| Seed Dispersal | `SeedDispersalFigure` | Fluent coconut and cherries (A); dandelion tuft, sycamore wing, hooked burr, dry pod and cut fruit redrawn by us in the shaded rock-specimen style |

## The three sources: exactly what we take

### A. Fluent Emoji, [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji) @ `1ffb34c752ec` (already pinned)

- **Licence:** MIT; the `LICENSE` is already beside the files.
- **We add** the `Color` SVG of: Blossom, Seedling, Potted plant, Sun,
  Honeybee, Butterfly, Fly, Coconut, Cherries, Water wave.
  Droplet, Wind face and Herb are already vendored.
- **Not used:** the seed and fruit emoji that would *show the method*
  (e.g. a bird with a cherry). A dispersal picture shows features only; the
  method comes from the supplied observation.

### B. Bioicons, [duerrsimon/bioicons](https://github.com/duerrsimon/bioicons) @ `d29e766ea758`

- **Licence:** CC BY 4.0, by Frédéric Bouché. We copy the folder's
  `static/icons/cc-by-4.0/LICENSE` and credit the author in the caption.
- **We take 2 of its ~3,000 files:**

| File | Used for |
|---|---|
| `Plants_Algae/Frédéric_Bouché/Arabidopsis_Flower.svg` | Pollination: a flower cut open. The yellow tips are the "pollen-making part"; the central tip is the "receiving part". The labels now point at real anatomy, not at dots. |
| `Plants_Algae/Frédéric_Bouché/Arabidopsis_plant.svg` | Parts of Flowering Plants and Water Transport: a real tap root with side roots, shown below the soil line. Only the roots are shown (the leaves above are clipped away). |

- **Processing:** `vendor.mjs` removes the flower's grey frame
  (`transform: "strip-frame"`), then runs SVGO.

### C. ez-tree, [dgreenheck/ez-tree](https://github.com/dgreenheck/ez-tree) @ `dcf309bd86bd`

- **Licence:** MIT. The `LICENSE` is copied beside the images.
- **We take:** only `src/lib/` (`tree.js`, `options.js`, `branch.js`,
  `enums.js`, `rng.js`, `trellis.js`, about 50 KB), fetched at render time into
  `node_modules/.cache` and never committed or bundled. Not the demo app,
  textures, audio or presets loader.
- **How we use it:** `scripts/science-assets/render-trees.mjs` grows one
  flowering tree (fixed seed) in the system Chrome with Three.js, in the same
  flat toon look and outline as the bones, with leaf-and-blossom sprigs as
  the leaves. It writes `src/assets/science/ez-tree/tree-blossom.webp` and
  `tree.json` with label anchors (trunk, leaves, blossom) measured from the
  tree itself.
- **Used for:** the `woody` plant form in Parts of Flowering Plants and the
  rooted `tree` model in Water Transport, where dye dots run up the trunk.

## Components

All take the same props as the figure they replace, keep a matching
`<title>`/`<desc>`, and fall back to the classic figure if an image fails.

| New | Replaces | Notes |
|---|---|---|
| `PlantIllustration` | `PlantFigure` | Drawn shaded stem (4 forms) and leaves (4 shapes), Fluent bloom, Bioicons roots; ez-tree for `woody`. Label anchors come from the same geometry. |
| `WaterTransportIllustration` | `WaterTransportFigure` | Rooted models reuse the plant art; cut stems stand in a drawn glass jar. Dye stays dots **and** words, never colour alone. |
| `FlowerLifeCycleIllustration` | `FlowerLifeCycleFigure` | Bioicons flower with the two part labels; Fluent pollinators; drawn shaded seed and cut-away cases (the same seed shape in every stage). |
| `SeedDispersalIllustration` | `SeedDispersalFigure` | Features only, never the method. |
| Needs guide pictures | emoji in `NEEDS` | `WhatPlantsNeedToGrowGame` swaps the emoji for Fluent pictures when illustrated. |

## Checks

- Unit tests (`scienceAssets.test.js`): new files in the manifest, licences
  present, the size budget, tree anchors inside the image and in order
  (blossom and leaves above the trunk).
- The question builders do not change, so their tests pass untouched.
- Browser: every level of the five topics in light and dark, at 375 px,
  and with a blocked image to show the fallback.
- `npm run lint`, `npm test` and `npm run build`.

---

## What changed in delivery (2026-10-04)

1. **Fluent list trimmed.** The Coconut (drawn split open, which contradicts
   "a thick outer case surrounds a seed") and Water wave (not needed) were
   dropped. Cherries became **Chestnut** for the "falls from its stalk"
   example: cherries suggest being eaten, which would hint at a method.
   Shipped Fluent additions: Blossom, Seedling, Potted plant, Sun, Honeybee,
   Butterfly, Fly, Chestnut.
2. **The husked floating fruit is drawn**, like the tuft, wing, burr, dry pod
   and cut fruit.
3. **Roots** are cropped from the Bioicons plant (its rosette leaves are
   clipped off) and given a soft light edge so they read on dark soil.
4. **Tree:** leaf sprigs and blossoms are drawn on canvas in the render page;
   the anchors (trunk, leaves, blossom, base, fork) are measured from the
   generated tree. The blossom is taken from the upper crown and the leaves
   from the lower crown, so their labels sit apart.

**What shipped:**

| Topic | Component | Uses |
|---|---|---|
| Parts of Flowering Plants | `PlantIllustration` | Bioicons roots, Fluent blossom, drawn stem and leaves; ez-tree tree for `woody` |
| What Plants Need to Grow | needs guide in `WhatPlantsNeedToGrowGame` | Fluent wind, sun, droplet, seedling, potted plant |
| Water Transport in Plants | `WaterTransportIllustration` | Plant art above; drawn glass jar for cut stems |
| Pollination and Seed Formation | `FlowerLifeCycleIllustration` | Bioicons cut-open flower; Fluent bee, butterfly, fly, wind, seedling; drawn seeds and cases |
| Seed Dispersal | `SeedDispersalIllustration` | Drawn specimens; Fluent chestnut |

**Re-running the pipeline:**

```sh
node scripts/science-assets/render-trees.mjs   # tree image and anchors (needs Google Chrome)
node scripts/science-assets/vendor.mjs         # SVGs and licences; rebuilds manifest.json
```

New artwork is about 320 KB in total; each topic loads only its own.
