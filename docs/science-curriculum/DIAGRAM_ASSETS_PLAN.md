# Year 3 Science: diagram assets plan

**Status: done 2026-10-03.** All five topics are illustrated; the style was
signed off on the Skeletons spike. What shipped differs from the plan below in
four places (see "What changed in delivery" at the end).
**Goal:** replace the hand-built diagrams in the anatomy and rocks topics with
real, child-friendly artwork. We take only the specific files we use from five
open-licensed sources and copy them into the repo. No source becomes a runtime
dependency. The current `*Figure.jsx` components stay as a fallback.

## Scope: topics and figures affected

| Topic | Current figure | Gets |
|---|---|---|
| Skeletons for Support and Protection | `SkeletonFigure` (human, dog, crab and beetle from basic shapes) | Real human bones (A), animal art (E) |
| Muscles and Movement | `MovementFigure` (arm as lines and ellipses) | Real arm bones in 3 poses (A), body muscle map (B), biceps art (E) |
| Comparing and Grouping Rocks | `RockFigure` (polygon with dots and lines) | Rock textures (C, D), rock and hammer art (E) |
| How Fossils Form | `FossilFormationFigure` (rectangles) | Rock layer textures (C, D), shell, bone, leaf and dinosaur art (E) |
| What Soil Is Made From | `SoilCompositionFigure` (boxes) | Soil and sediment textures (D), worm, leaf, droplet and mushroom art (E) |

Plants, light and forces are out of scope for this plan.

---

## The five sources: exactly what we take

### A. BodyParts3D bones, via [ashemag/human-atlas](https://github.com/ashemag/human-atlas) @ `1c38bf35c254`

- **Licence:** the data is CC BY 4.0 (© Database Center for Life Science);
  the viewer code is MIT.
- **We take:** the data only. The repo ships `public/models/atlas.json`
  (1.3 MB index) plus 15 binary chunks (94 MB). Each part records its chunk
  and the byte offsets of its positions, normals and indices, so individual
  bones can be pulled out without the rest.
- **We do not take:** the React, Three.js or shadcn viewer code, any other
  body system, or the chunks at runtime.

What Year 3 needs (counted from `atlas.json`):

| Group | Parts | Triangles | Used for |
|---|---|---|---|
| Skull (frontal, parietal, occipital, temporal, sphenoid, ethmoid, maxilla, mandible…) | ~10 | ~25k | "protects the brain" |
| Rib cage (24 ribs, sternum, xiphoid) | 27 | ~44k | "protects the heart and lungs" |
| Spine (vertebrae, sacrum, coccyx) | 48 | ~96k | support, the backbone |
| Pelvis | 2 | ~4k | whole-skeleton view |
| Arm bones (humerus, radius, ulna, scapula, clavicle) | ~10 | ~30k | the movement poses |
| Leg bones (femur, tibia, fibula, patella) | ~8 | ~22k | support |

The name matching needs tightening during the build; the first pass also
caught some muscles.

**How we use it.** A build-time script, `scripts/science-assets/render-bones.mjs`,
does this once and the outputs are committed:
1. It reads `atlas.json` and fetches only the chunks that hold the bones above.
2. It renders the bones in Playwright with Three.js, which is already a
   dependency. The look is flat, cartoon-style shading with an outline, on a
   transparent background.
3. It writes WebP images at 2× resolution, about 40–80 KB each:
   - whole skeleton, front;
   - skull close-up;
   - rib cage and spine;
   - arm bones straight, half bent and bent (the forearm meshes rotated
     about the elbow).
4. Alongside each image it writes a JSON file of **label anchors**: the
   centres of the bones, projected onto the image. These replace the
   hand-tuned `HUMAN_ANCHORS`, so a label is computed from the real bone
   rather than guessed.

**Shipped size:** about 7 images, under 500 KB in total, loaded only in these
two topics.

**What it doesn't cover:** dogs, birds and fish. BodyParts3D is human only.
Their cards use art from source E, and the dog's inside view keeps our own
simplified drawing.

### B. Muscle map, via [vulovix/body-muscles](https://github.com/vulovix/body-muscles) @ `15c8085ee97c`

- **Licence:** Apache-2.0. Keep the `LICENSE` and `NOTICE` files next to
  the copied data.
- **We take:** only the path data in `src/data/muscles.front.ts` and
  `muscles.back.ts` (24 KB raw), turned into a plain JS data module:
  `src/assets/science/body-muscles/muscles.js`.
- **We do not take:** `BodyChart.ts`, the colour-intensity logic, or the npm
  package. Our own small `MuscleMapFigure` draws the paths with theme tokens.
- **Regions we use:**
  - the whole-body outline (every region, drawn faint);
  - highlighted: `biceps-*`, `triceps-long-*`, `triceps-lateral-*`,
    `forearm-*`, `quads-*`, the hamstrings (back view), the calves (back
    view), `chest-*` and `abs-*`.
- **Used for:** "where are your muscles?" questions and finding the muscle
  pair. The bending-arm model (contract and relax) still comes from A's posed
  bones, with our own simplified muscle shapes drawn over them. A rigid mesh
  cannot show a muscle getting shorter, and the topic already says the model
  is simplified.

### C. US Geological Survey (FGDC) rock patterns, via [davenquinn/geologic-patterns](https://github.com/davenquinn/geologic-patterns) @ `7fdb820b0243`

- **Licence:** public domain (US Geological Survey work) and CC0, so nothing
  is owed. We credit it anyway.
- **We take:** about 7 of its 471 SVG tiles, for the rock types the other
  pattern set (D) lacks:

| Code | Pattern | Used for |
|---|---|---|
| 719 | Granite | a sample with **crystals** |
| 717 | Basaltic flows | a dark igneous sample |
| 703 | Slate | a sample with **bands** |
| 705 | Schist | crystals with bands (sample E) |
| 708 | Gneiss | an alternative for sample E |
| 629 | Fossiliferous clastic limestone | a sample with a **fossil** (sample D) |
| 652 | Fossiliferous rock | the layer holding the fossil in How Fossils Form |

- **Processing:** the tiles are 4–70 KB of black-stroke SVG. The import
  script runs SVGO and rewrites `stroke:#000000` to `currentColor`, so the
  theme tokens colour them in both light and dark mode. Expected total
  after processing: under 100 KB.

### D. Lithology patterns, via [equinor/lithology-patterns](https://github.com/equinor/lithology-patterns) @ `5e211ae92a80`

- **Licence:** MIT. Keep the `LICENSE`.
- **We take:** about 9 of its 74 tiles. They are already SVGO-optimised
  64×64 tiles of about 4 KB, coloured, and sedimentary only:

| Code | Pattern | Used for |
|---|---|---|
| 30000 | Sandstone | samples with **grains** (A, F) and sediment layers |
| 70000 | Limestone | fossil-formation layers |
| 78000 | Chalk | a soft white sample and layers |
| 65000 | Shale | the mud layer in How Fossils Form |
| 50000 | Mudstone | burial sediment |
| 10000 | Conglomerate | a pebbly sample and the soil's rock particles |
| 50090 | Paleosol | the soil profile |
| 60000 | Claystone | clay soil |
| 61000 | Sandy claystone | sandy soil |

- **We do not take:** the npm package, or the oil-industry variants (pyrite,
  glauconite, uranium and the like).
- **Processing:** each fixed colour is mapped to a new set of rock and soil
  tokens (`--sci-rock-*`, `--sci-soil-*`) with light and dark values, so C
  and D look like one family.

### E. Illustrations, via [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji) @ `1ffb34c752ec`

- **Licence:** MIT. Keep the `LICENSE`.
- **We take:** only the `Color` SVG of each asset below, about 18 files of
  3–37 KB each (about 400 KB raw, about 250 KB after SVGO). Each is imported
  per topic, so a topic loads only its own.
- **We do not take:** the 3D PNGs (large), the Flat, High Contrast and
  animated sets, or the other ~1,480 assets.

| Topic | Assets |
|---|---|
| Skeletons | Skull, Bone, Dog, Bird, Fish, Crab, Beetle, Snail, Worm (the 8 animals in `ANIMALS` all match) |
| Muscles | Flexed biceps (default skin tone) |
| Rocks | Rock, Hammer (the scratch test), Droplet (the water test), Magnifying glass |
| Fossils | Spiral shell, Bone, Fallen leaf, Fish, T-rex, Sauropod (as "who left this?" set dressing only, never as evidence) |
| Soil | Worm, Fallen leaf, Mushroom, Droplet, Wind face (air) |

---

## Pipeline: `scripts/science-assets/`

- **`sources.json`:** for each source, the repo, the pinned commit, the
  licence, the attribution text, and the exact list of files or parts to
  take.
- **`vendor.mjs`:** downloads only the listed files from
  `raw.githubusercontent.com` at the pinned commit (never a clone). It runs
  SVGO, rewrites the colours, and writes
  `src/assets/science/<source>/…`, a combined `manifest.json`, and each
  source's `LICENSE` / `NOTICE` / `ATTRIBUTION.md`. Re-running it changes
  nothing.
- **`render-bones.mjs`:** the source A render described above, written to
  `src/assets/science/bodyparts3d/`.
- **SVGO is the only new dependency**, a dev dependency. Everything is
  committed, so neither `npm run build` nor CI touches the network.

## Components

- **New:** `SkeletonIllustration`, `ArmMovementIllustration`,
  `MuscleMapFigure`, `RockSampleIllustration`, `FossilLayersIllustration`,
  `SoilIllustration`, and a shared `SciencePattern`, which defines SVG
  `<pattern>` fills from the tiles.
- **Unchanged contract:** each new component takes the same props as the
  figure it replaces, and keeps its `<title>`/`<desc>` text alternative and
  caption wording.
- **Fallback:** `src/data/scienceDiagrams.js` exports
  `DIAGRAM_STYLE = "illustrated" | "classic"`. Each topic's game picks the
  component through it. An image that fails to load falls back to the
  classic `*Figure`.
- **Credit:** the caption carries one short credit line, e.g. "Bones:
  BodyParts3D © DBCLS, CC BY 4.0". `/parent` gets a full "Picture credits"
  list read from `manifest.json`.

## Phases

1. **Spike:** Skeletons for Support and Protection, end to end (A and E).
   Review the look with you **before** going further.
2. **Pipeline:** `sources.json`, `vendor.mjs`, the licence files and
   `manifest.json`, with tests.
3. **Anatomy:** Skeletons and Muscles and Movement (A, B, E).
4. **Rocks:** Comparing and Grouping Rocks, How Fossils Form, What Soil Is
   Made From (C, D, E).
5. **Docs:** `PROJECT_KNOWLEDGE.md` and the science tracker. The classic
   figures stay, documented as the fallback.

## Checks

- **Unit tests:**
  - every file in `manifest.json` exists, and every asset a component uses is
    in the manifest;
  - every source folder has its licence or notice file;
  - each label anchor lies inside its bone's projected bounds;
  - size budget: each file ≤ 120 KB, and all science assets together ≤ 1.5 MB.
- **Existing tests:** the question builders don't change, so their tests
  should still pass untouched.
- **Browser:**
  - every challenge in the five topics, in light and dark themes, at 375 px
    and desktop widths;
  - with reduced motion on;
  - with a blocked image, to show the classic fallback;
  - with a screen reader, checking `<desc>` text still matches what is drawn.
- `npm run lint`, `npm test` and `npm run build`.

## Questions to settle in the spike

- The bone look: flat cartoon shading with an outline (proposed), or softer
  shaded 3D.
- Whether to add an optional "spin the skeleton" 3D view later. It would
  ship about 1 MB of decimated meshes, loaded on demand; not in this plan.

---

## What changed in delivery (2026-10-03)

1. **US Geological Survey (FGDC) patterns (source C): dropped.** Seen at
   full size, they are map-symbol conventions rather than pictures of rock.
   Limestone's "brick" lines read as **bands**, and granite's dashes do not
   look like crystals. Comparing and Grouping Rocks asks children to spot
   exactly those features, so these tiles would have suggested wrong
   answers. That topic's `RockSampleIllustration` is drawn by hand instead:
   - a shaded rock body with no texture of its own;
   - every mark on it is a real feature: shaded pebble grains, faceted
     crystals, coloured bands, an embossed fossil.
2. **Equinor patterns (source D): three tiles only** (sandstone 30000, shale
   65000, limestone 70000), used only for the How Fossils Form layers.
   `vendor.mjs` removes each tile's map-colour background
   (`transform: "pattern-lines"`), and the lines sit over natural rock
   colours. The soil topic uses Fluent pictures instead of a soil pattern.
3. **The arm model** (Muscles and Movement) is BodyParts3D arm bones from
   the side, bent at the elbow (`render-bones.mjs`, `renderArm`). The muscle
   pair is drawn over the bones as lenses (`lensPath`), because a rigid mesh
   cannot show a muscle shortening. The body-muscles map sits in the topic's
   "How this arm model works" card.
4. **Tooling:** `playwright-core` was added as a dev dependency. It drives the
   installed Google Chrome to render the bones once; no browser is
   downloaded.

**What shipped:**

| Topic | Component | Uses |
|---|---|---|
| Skeletons | `SkeletonIllustration` | BodyParts3D skeleton in 3 poses; Fluent animal pictures |
| Muscles and Movement | `ArmMovementIllustration`, `MuscleMapFigure` | BodyParts3D arm in 3 poses; body-muscles map |
| Comparing and Grouping Rocks | `RockSampleIllustration` | hand-drawn specimen; Fluent magnifier |
| How Fossils Form | `FossilLayersIllustration` | Equinor layers; Fluent shell, fish, herb |
| What Soil Is Made From | `SoilIllustration` | Fluent rock, leaf, wind and droplet pictures |

All of them follow `DIAGRAM_STYLE` (`src/data/scienceDiagrams.js`) and fall
back to the classic `*Figure` components.

**Re-running the pipeline:**

```sh
node scripts/science-assets/vendor.mjs         # SVGs and licences; rebuilds manifest.json
node scripts/science-assets/render-bones.mjs   # bone images and anchors (needs Google Chrome)
```

Run `vendor.mjs` again after `render-bones.mjs` so the manifest lists the
images. Shipped artwork is about 0.5 MB in total, licences included, and each topic loads only
its own.
