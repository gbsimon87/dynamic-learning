# Ocean Explorer: full-screen world and natural detail

Date: 2026-11-11. Branch: `feat/ocean-explorer-immersive`, created from
`dev` at `163406c` with a clean working tree.

The owner requested a full-screen experience similar to Solar System and more
realistic elements, then explicitly deferred testing: “no tests required, just
build it, we will test after.”

## Implemented

- A viewport-filling scene, with route-scoped removal of the navbar and Skills
  back bar. The world supplies its own accessible Back to Skills link.
- A compact floating title, reef-tour action, Controls menu and keyboard hint.
  Existing pause, reset, return-to-start and help remain available. Discovery
  cards and controls have desktop, portrait and short-landscape CSS positions
  with device safe-area spacing. Joystick/GO hide during orbit.
- Continuous tapered fish, shark, whale, dolphin and swordfish bodies, physical
  eye materials, natural colours, procedural skin/scales, countershading, fins
  with thickness, gills, whale grooves, turtle scutes, swept ray wings, a curled
  seahorse tail, octopus arms with instanced suckers, and translucent jellyfish
  with curved trailing tentacles. Removed the porcupinefish's repeated inflation.
- Branching coral, open branched sea fans, grooved brain coral and hollow tube
  sponges. Stationary reef parts merge into six material batches per reef.
- Painted/metallic submarine materials, reflective glass, hull seams, ballast
  tanks, landing skids, instanced porthole bolts, lamp lenses and a headlight.
- A generated 128-pixel PMREM underwater reflection environment, released on
  disposal. More granular rock detail, broad sand colour variation, swaying
  seagrass, depth-softened caustics, softer haze/light shafts and a wider default
  camera view. Particle culling respects camera-relative shader placement.

No external visual assets, dependencies, species, discovery facts, saved-data
formats, learner-progress rules or curriculum registrations were added.
Existing pause, reduced-motion and hidden-tab handling governs the new grass
motion. The existing ocean travel/tour rules remain in place. Scenery sampling
is now bounded. Future travel expansion in idea #44 remains future work.

## Verification and review

| Area | Evidence / status |
| --- | --- |
| Implementation | Completed for both requested items; source reviewed. |
| Production compilation | `npm run build` passed; 70 public pages prerendered. |
| Source whitespace | `git diff --check` passed. |
| Build notices | Vite reported mixed JSON import attributes in the untouched City Spotlight module and large bundle chunks. Neither prevented compilation. Ocean Explorer's generated JS chunk is 87.06 kB (31.03 kB gzip). |
| Automated tests | Not authored or run, at the owner's request. Existing component/model assertions may need updates for the new layout and anatomy. |
| Lint | Deferred under the owner's build-only instruction. |
| Content review | Discovery text and species data were retained; no new content review claimed. |
| Browser / physical devices | Deferred; WebGL shader compilation, actual appearance, theme contrast, overlay positions, touch behaviour and performance have not been visually verified. No browser control tools were available in this session. |

Before merge/release, perform the deferred lint and test checks and review the
3D scene on desktop and physical touch devices in both themes, including pause,
reduced motion, driving, orbit/discovery cards, the reef tour and returning to
Skills. A successful production build does not verify WebGL appearance or runtime
shader compilation.
