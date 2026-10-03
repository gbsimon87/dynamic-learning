# Brief: Year 3 Science curriculum topics

**Design baseline:** 2026-10-03. **Branch:** `feat/year-3-science`.
**Status:** First four Plants topics implemented; remaining lesson designs planned within the approved 21-topic structure. See the tracker for verification and review.
**Second pass:** 2026-10-03; implementation safeguards refined without changing the approved titles or scope.

Read [the approved plan](IMPLEMENTATION_PLAN.md) and [the tracker](y3-science-tracker.md) first.
This brief is a handoff for one topic at a time; it is not a set of finished scientific questions.
Check scientific examples and image evidence against authoritative sources before authoring banks.

## Required background and source status

Read the repository `AGENTS.md`, `docs/PROJECT_KNOWLEDGE.md`,
and the matching skills in `.claude/skills/`: `building-curriculum-topics`,
`add-curriculum-challenge` and, for registration, `add-curriculum-year`.
Read `curriculum-progress` before touching progress, persistence or unlock logic.

[The supplied Year 3 Science programme](../curriculum/year-3-science.md) contains the substantive requirements,
shared Years 3–4 enquiry requirements and non-statutory guidance.
Its source header and app mapping were added during groundwork. Read the final topic mapping before writing each bank.
Requirement numbers below count the substantive bullets in each source section; references are our design shorthand,
not rewritten statutory wording.

Follow the live registry, loader and progress modules when older skill passages disagree:
the registry already exists, progress is per child/year/subject through the async store,
and completion predicates use identity and availability rather than array lengths.
Only an explicitly absent stored document means new progress: do not follow older advice that turns
corrupt JSON or a failed read into an empty writable object. Preserve live hydration/profile guards and retry queues.
Do not copy the English batch brief's parallel-agent restrictions; this work is sequential unless explicitly requested otherwise.

## Shared build and assessment rules

- Audience: UK Year 3 children, with short instructions and British English.
  Assess Science understanding rather than reading stamina, arithmetic speed or spelling.
- Four escalating challenge wrappers per topic, sharing one topic game and one pure builder.
  Use the computed IDs and Pascal names below; do not manually invent different file names.
- Builder: `src/data/challenges/science/<camelTopic>.js` and an adjacent `.test.js`,
  exporting `build<Pascal>Questions(level, rng)` and testable banks/validators.
  Game: `src/pages/skills/science/challenges/year3/<Pascal>Game.jsx`.
  Wrappers: `year3/<topic-id>/<Pascal>Challenge1.jsx` through `Challenge4.jsx`;
  each is a default export accepting and forwarding `onComplete` with the appropriate level.
  Release all four working slots of each topic together and in approved topic order; no placeholder wrappers.
  File presence makes a challenge available. Adding an earlier missing slot after a later topic was played can re-lock it.
- Use `ChallengeShell` for feedback and progression, memoise the run, key round components by index
  and pass `onComplete` directly so combo XP is retained.
  Every relevant control receives `disabled={locked}`.
- Reuse `ChoiceGrid`, `SortBins`, `DragToOrder`, `TileBuilder`, `DataTable`,
  `BarChart`, `ScaleReader`, `MeasureDrag`, `NumberInput`, `SpeakButton` and `HintNote`.
  Use numerical input only when interpreting/recording measurements, not as a replacement for a scientific explanation.
  New controlled boards and pure models are described in the plan.
  `DataTable` displays records and one blank; compose labelled inputs with controlled table values to collect several results.
  Do not assume it edits multiple cells. Existing choice/table/chart components need distinct option or row labels.
- Provide at least three meaningful interaction forms across each topic.
  The table below decides which slots have five short questions and which have three investigation rounds.
  Short levels need at least 15 meaningful items; investigation levels at least nine complete scenarios.
- An investigation is one shell question: prediction → assessable setup where applicable →
  observation/source stages → record → built conclusion.
  Staged process or source enquiries use a supplied setup rather than inventing an experimental factor.
  Asking relevant questions, secondary-source use and suggestions for further enquiries/improvements
  should appear in the appropriate topic scenarios; no isolated enquiry drill.
- Predictions are ungraded and never count as a wrong attempt.
  Correct intermediate setup/record checks advance only local stages; wrong assessed attempts call `submit(false)`.
  Call `submit(true)` once the round's assessed work is correct.
  Lock setup before observations. On a setup edit/reset, invalidate downstream observations, record values,
  selected conclusion and validation flags together, and increment the round revision.
  Use a pure stage reducer and synchronous transition guard; ignore duplicate or stale stage/setup/run callbacks.
  Final success requires the current revision's complete assessed record and conclusion.
  Keep observation stages available for comparison and do not make learners wait in real time.
- Show a current-stage hint after two assessed misses in the whole question/round through the shell's `misses`.
  It does not count misses separately per stage; do not reset the shell when entering a new investigation stage.
  Resetting an investigation also retains shell misses/combo history and the fixed scenario rather than rerolling its results.
  Hints narrow or point back to evidence; they do not reveal the answer or eliminate the last distractor.
  Explain unfamiliar vocabulary at first use within each round, including applied slots.
  Speech is optional and tap-triggered; every question remains answerable with no voice.
- A valid alternative scientific answer must not be marked wrong.
  Accept equivalent tile arrangements where appropriate or author explicit constraints.
  Classifications need a stated criterion; comparisons need labelled conditions and units.
  Source cards must include the evidence needed to answer.
  Require the full non-empty set of known IDs and answers before validation; reject missing/unknown IDs,
  duplicate placements, blank answers and non-finite measurements. Empty collections never count as correct.
  A diagram target holds at most one label and each label occupies at most one target; remove before replacing.
- Random selection is bounded and uses injected RNGs.
  Use functional updates for accumulating state and step callbacks for repeated taps.
  No timers in state updaters; every timer/animation resource needs cleanup.
  Guard callbacks as well as rendered controls against shell locks and stale round revisions, including in-flight drag completion.
  No animation or speech promise may advance or complete a round after reset, navigation, a new question or a child switch.
- SVG/CSS diagrams and model outcomes must agree with the tested data.
  Images are local curated assets with provenance/licence records and accessible descriptions.
  Do not use colour alone for labels or pole identity.
  Use fixed catalogue raster image paths and reviewed JSX/SVG; render strings as React text.
  No injected HTML/downloaded SVG markup, route-derived asset paths or runtime fetches from specimen source URLs.
  Public assets must contain no development seed credentials, learner information or authentication data.
  If essential evidence cannot load, offer retry without substituting an answer or writing completion.
  Screen-reader descriptions and optional speech expose equivalent observations, not hidden solution labels.
  Clamp stage/model controls; reject invalid geometry and grade measurements at their displayed precision.
- Both themes, at least 44px interactive targets, keyboard operation and reduced motion are required.
  Scope styles; use existing theme tokens; do not copy kit CSS into each challenge.
- Optional grown-up activities never gate progress and never write completion.
  Validate their instructions and specific precautions when adding their catalogue entries.
  Display them only for the validated Year 3 Science topic after strict four-slot completion, including revisits.

## Implementation risk checks

The approved plan's bug/security section is part of this handoff. In particular:

- Test empty/partial submissions, unknown/duplicate IDs and valid equivalent arrangements.
- Test double taps, in-flight drag callbacks, stage skipping, reset after recorded results and stale async callbacks.
- Prove predictions never add misses and intermediate correctness never advances the shell; hints use round-wide misses.
- Prove resetting or changing setup clears the previous conclusion and cannot reuse a completed record.
- Test missing images, literal markup-like text, out-of-range stage indices, zero-distance geometry and rounding boundaries.
- Verify representative model cases independently of the generator/validator; a shared wrong rule can otherwise pass its own tests.
- Keep release-prefix availability tests compatible with incremental building; a final all-84-files assertion must not block the first topic.
- Check strict practical-card eligibility and unchanged shared rendering for subjects with no activity prop.
- Preserve fail-closed reads, save retries and child/run isolation; record API ownership verification as pending if database tests skip.

## Topic designs

The approved titles and ordering are fixed; the learning designs below are a concrete starting specification.
If content checking reveals ambiguity or a design needs to change, record the reason in the tracker and update this brief.
Do not silently change shipped identifiers or mislabel the current designs as owner-reviewed banks.

## 1. Plants

Category ID: `plants`.

### Parts of Flowering Plants

**Implemented 2026-10-03:** 16 authored observations, 16 structural diagram cases; five questions per slot. C2 matches one job to a lettered part, C3 records all four labels, C4 builds a fixed sentence starter with one function ending. Each C1/C2/C4 run includes all four parts. Vocabulary is an optional disclosure; browser and owner review pending.

- **Topic ID:** `parts-of-flowering-plants`; **Pascal ID:** `PartsOfFloweringPlants`.
- **Source crosswalk:** Plants requirement 1: parts and their functions.
- **Enquiry objective:** Observe and compare structure and function; record a labelled diagram.
- **Boundary:** Roots, stem/trunk, leaves and flowers. Teach their jobs; do not require photosynthesis chemistry.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a plant part from a supported diagram and job description. | 5 short questions |
| 2 | Match jobs to parts across different flowering-plant diagrams. | 5 short questions |
| 3 | Label a whole plant using the diagram board; labels can be moved and corrected. | 5 short questions |
| 4 | Use an observation card to build an explanation linking a plant part to its job. | 5 short questions |

### What Plants Need to Grow

**Implemented 2026-10-03:** 15 tasks per short level; nine authored investigation scenarios (water, soil nutrients and space).
C1–C3 runs cover all five requirements; C4 has one scenario for each of its three factors. Observations are illustrative,
with A/B differences and equal growth; conclusions remain limited to that comparison. FairTestBoard / ObservationSequence
use a pure revision/version state machine. Prediction → setup → observe → record → explain; reset clears local work and keeps shell misses/scenario.
Optional care-label activity added. Automated/render checks passed; interactive browser and owner review pending.

- **Topic ID:** `what-plants-need-to-grow`; **Pascal ID:** `WhatPlantsNeedToGrow`.
- **Source crosswalk:** Plants requirement 2: requirements for life and growth and variation between plants.
- **Enquiry objective:** Ask a relevant question; set up a fair comparison; record measurements and draw a conclusion.
- **Boundary:** Include air, light, water, nutrients from soil and room to grow, and differences between plants. Avoid implying that one care schedule suits every plant.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a requirement using a picture and a short explanation. | 5 short questions |
| 2 | Compare supplied plant-care observations, including different plant needs. | 5 short questions |
| 3 | Build a fair plant-growth comparison by selecting the changed factor and what stays the same. | 5 short questions |
| 4 | Predict without grading, advance staged growth observations, record results and build a conclusion. | 3 investigations |

### Water Transport in Plants

**Implemented 2026-10-03:** 15 tasks per short bank, nine authored process enquiries. C1 rooted/cut-stem routes;
C2 before/after evidence; C3 ordered routes and observation sequences; C4 predicts, observes, records visible dye,
and builds a supported explanation. C4 samples one cut flower, one leafy stalk and one inspected-stem scenario.
Supplied setup replaces a graded changed-factor stage. Root uptake and cut-end uptake are distinguished; unobserved
leaf changes cannot be inferred from stem-only evidence. Dots/text show dye, with explicitly cut-away stem views.
ObservationSequence supports custom content while growth defaults remain intact. Guarded resets retain shell misses/scenario.
Optional grown-up carnation activity added; examples checked against RHS water-transport teaching guidance.
Automated and initial-render checks passed; interactive browser and owner review pending.

- **Topic ID:** `water-transport-in-plants`; **Pascal ID:** `WaterTransportInPlants`.
- **Source crosswalk:** Plants requirement 3: investigate water transport.
- **Enquiry objective:** Observe changes over time; record findings; explain using evidence.
- **Boundary:** Water transport through the plant, supported by the source guidance's coloured-water observation. No advanced cellular mechanisms.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose the route of water in a supported plant diagram. | 5 short questions |
| 2 | Compare labelled before/after observations of a coloured-water investigation. | 5 short questions |
| 3 | Build the sequence or labelled route from the supplied observations. | 5 short questions |
| 4 | Predict without grading, advance observation stages and build an explanation supported by the changes seen. | 3 investigations |

### Pollination and Seed Formation

**Implemented 2026-10-03:** 15 tasks per short bank; nine supplied-source enquiries across insects, wind and life-cycle evidence.
C1 flower/pollen/seed roles; C2 evidence comparisons; C3 ordered life-cycle/process sequences; C4 predicts, observes, records
whether pollen transfer/new seed formation are shown, and builds a supported explanation. Existing seeds at the start do not
count as new seed formation; pollen transfer alone does not prove seeds formed. No advanced reproductive terms are assessed.
Reviewed local SVG supplies equivalent visual/text evidence. Uses reusable processEnquiry / useProcessEnquiry guards with
current-round record validation; resets keep scenario and shell misses. Optional distant flower-visitor activity added.
Automated and initial-render checks passed; browser and owner review pending.

- **Topic ID:** `pollination-and-seed-formation`; **Pascal ID:** `PollinationAndSeedFormation`.
- **Source crosswalk:** Plants requirement 4: flowers in the flowering-plant life cycle (pollination and seed formation).
- **Enquiry objective:** Observe life-cycle stages; sequence evidence; communicate a simple explanation.
- **Boundary:** Flowers, pollination and seed formation at Year 3 depth. Keep seed dispersal in the next topic and do not assess advanced reproductive terminology.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose the flower's role using a supported life-cycle picture. | 5 short questions |
| 2 | Compare pollination and seed-formation observations using glossed vocabulary. | 5 short questions |
| 3 | Sequence an illustrated flowering-plant life cycle with supported stage labels. | 5 short questions |
| 4 | Use staged observations to build an evidence-based explanation of how the flower leads to seeds. | 3 investigations |

### Seed Dispersal

- **Topic ID:** `seed-dispersal`; **Pascal ID:** `SeedDispersal`.
- **Source crosswalk:** Plants requirement 4: seed dispersal.
- **Enquiry objective:** Observe features; classify; notice patterns; use evidence to support predictions.
- **Boundary:** Relate seed/fruit features to dispersal. Do not repeat pollination or seed formation as the main assessed skill.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a dispersal method from a supported illustrated example. | 5 short questions |
| 2 | Sort seed/fruit examples by supplied dispersal evidence. | 5 short questions |
| 3 | Match specimen features to built explanations of how dispersal happens. | 5 short questions |
| 4 | Compare unfamiliar examples, make an ungraded prediction and justify a dispersal explanation from visible features. | 3 investigations |

**Implemented 2026-10-03:** 15 tasks per short bank and nine enquiry scenarios.
C1 uses movement choices, C2 three-specimen sorting, C3 one built explanation,
C4 three guarded comparison enquiries with ungraded predictions. Local schematic
SVG shows hairs, wings, hooks, seed-containing fruits/cases and water surfaces;
examples are authored and not species identifications. Assess the supplied movement:
shape alone is not proof, and a seed may disperse in multiple ways. Optional practical
observation is gated only by strict topic completion. Automated/render checks passed;
browser and owner review pending. Plants now has all twenty challenges implemented.

## 2. Animals, including humans

Category ID: `animals-including-humans`.

### Nutrition for Animals and Humans

- **Topic ID:** `nutrition-for-animals-and-humans`; **Pascal ID:** `NutritionForAnimalsAndHumans`.
- **Source crosswalk:** Animals requirement 1: right types and amounts of nutrition; food as the source.
- **Enquiry objective:** Use supplied secondary sources; compare diets; classify and report findings.
- **Boundary:** Include both nutrition type and amount; animals obtain nutrition from what they eat. Food/diet tasks must use explicit source cards and accept all supported combinations.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a nutrition fact from a supported food or animal information card. | 5 short questions |
| 2 | Sort or match animal diets and nutrition examples using supplied evidence. | 5 short questions |
| 3 | Build a suitable meal/diet from explicit requirements on an information card. | 5 short questions |
| 4 | Research a short set of supplied fact cards, compare examples and build a supported nutrition explanation. | 3 investigations |

**Implemented 2026-10-03:** 18 source-supported fact questions, 15 three-card sorting
sets, 15 model-menu cases and nine source-research enquiries. C1–C3 use five tasks;
C4 uses three rounds covering food sources, types and amounts. Attributed NHS/wildlife
cards support findings. Meal-building accepts every combination/order meeting explicit
food-group counts; card counts are a teaching model, not real portions or a complete diet.
Claims require evidence, and precise portions cannot be inferred from cards without amounts.
Optional grown-up source research never gates progress. Automated/render checks passed;
interactive browser and owner review pending.

### Skeletons for Support and Protection

- **Topic ID:** `skeletons-for-support-and-protection`; **Pascal ID:** `SkeletonsForSupportAndProtection`.
- **Source crosswalk:** Animals requirement 2: skeletons (support and protection).
- **Enquiry objective:** Compare diagrams; group using stated criteria; link structure to function.
- **Boundary:** Support and protection, using humans and suitable animal examples. Check how the grouping criterion treats different types of skeleton; movement mechanisms belong to the next topic.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose support or protection jobs using a supported skeleton diagram. | 5 short questions |
| 2 | Compare and group examples by an explicitly stated skeleton criterion. | 5 short questions |
| 3 | Label supported skeleton/body diagrams and match structures to their jobs. | 5 short questions |
| 4 | Use observations or source cards to build an explanation of support and protection. | 5 short questions |

**Implemented 2026-10-03:** 15 authored cases per slot; five tasks in all four challenges.
C1 uses supported jobs, C2 groups three animal cards by an explicit backbone or
shell/exoskeleton criterion, C3 labels four human structures and matches a job, C4
builds a supported explanation. Local human/dog/internal and crab/beetle/external
SVG supports source cards; human arm layouts and callout letters vary. No-backbone
animals may still have support/protection. Optional grown-up diagram comparison never
gates progress. Automated/render checks passed; browser and owner review pending.

### Muscles and Movement

**Implementation (2026-10-03):** All four slots built. Fifteen cases per short bank,
nine enquiries; C4 runs bending, straightening and bending/return once each. New
MovementFigure shows fixed-length bones turning at the elbow and opposing muscle
length changes, with equivalent labelled text. This is a supplied schematic pair,
not a live anatomical simulation. Explanations link muscle action, pull and observed
movement in three clauses. Optional grown-up picture research never gates progress.
Automated and SSR checks passed; interactive/both-theme and owner review pending.


- **Topic ID:** `muscles-and-movement`; **Pascal ID:** `MusclesAndMovement`.
- **Source crosswalk:** Animals requirement 2: skeletons and muscles (movement).
- **Enquiry objective:** Compare movement observations; identify changes; explain with evidence.
- **Boundary:** Show skeleton and muscles working together for movement. No advanced anatomy or memorisation of long muscle-name lists.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a muscle's role from a supported body diagram. | 5 short questions |
| 2 | Compare staged movement pictures and identify what changes. | 5 short questions |
| 3 | Build a supported explanation linking muscles, skeleton and movement. | 5 short questions |
| 4 | Predict without grading, inspect a movement sequence and construct an explanation using the observed change. | 3 investigations |

## 3. Rocks

Category ID: `rocks`.

### Comparing and Grouping Rocks

**Implementation (2026-10-03):** All four slots built: 18 visible-feature tasks,
15 sort sets, 15 three-row/two-criterion classification tables and nine supplied-test
investigations. New RockFigure and controlled ClassificationTable; C4 compares scratch,
water taken in and rubbing, requiring a fair plan, ungraded prediction, all observations,
records and a supported explanation. Results describe unnamed authored samples only;
no rock-name guessing or property inference from colour/appearance. Optional picture
observation never gates progress. Automated/SSR passed; interactive and owner review pending.


- **Topic ID:** `comparing-and-grouping-rocks`; **Pascal ID:** `ComparingAndGroupingRocks`.
- **Source crosswalk:** Rocks requirement 1: appearance and simple physical properties.
- **Enquiry objective:** Observe specimens; classify by explicit criteria; compare test evidence.
- **Boundary:** Assess visible or supplied properties, not unsupported guesses from appearance. Rock-name memorisation is not the objective.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a visible feature from a labelled specimen view. | 5 short questions |
| 2 | Sort specimens using an explicit appearance/property criterion. | 5 short questions |
| 3 | Build a classification table from supplied specimen observations. | 5 short questions |
| 4 | Choose a fair property comparison, inspect supplied results and justify a grouping using evidence. | 3 investigations |

### How Fossils Form

**Implementation (2026-10-03):** All four slots built. Fifteen tasks per short bank,
nine source-based enquiries; C4 covers shell moulds, mineral-preserved bones and leaf
imprints once each per run. Local FossilFormationFigure provides equivalent cutaway
stage descriptions. C2 sorts evidence claims; C3 orders four letter-linked pictures;
C4 requires ungraded prediction, four source cards, both records and explanation.
Burial does not guarantee a fossil; later exposure reveals earlier preserved evidence.
Optional grown-up picture research never gates progress. Automated/SSR passed;
interactive/both-theme and owner review pending.


- **Topic ID:** `how-fossils-form`; **Pascal ID:** `HowFossilsForm`.
- **Source crosswalk:** Rocks requirement 2: fossil formation in simple terms.
- **Enquiry objective:** Use supplied secondary sources; sequence stages; explain a process.
- **Boundary:** A simple account of once-living things preserved in rock. Do not assess geological time calculations or advanced rock-cycle processes.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a simple fossil-formation fact from a supported picture. | 5 short questions |
| 2 | Compare stage descriptions and distinguish relevant evidence. | 5 short questions |
| 3 | Order the illustrated stages of a simple fossil-formation account. | 5 short questions |
| 4 | Inspect staged source material and build an explanation linking the evidence to fossil formation. | 3 investigations |

### What Soil Is Made From

**Implemented 2026-10-03:** all four slots; 20 identification tasks, 15 sorting
cases, 15 diagram labelling cases and nine supplied-observation enquiries.
Runs use five short tasks or three investigations. Every identification run includes
rock particles, organic matter, air and water. Five authored samples and local SVG
models support evidence by labelled notes, not colour or universal percentages.
C2 groups two solid components by origin; C3 labels four components at shuffled
letter positions. C4 reads three observation stages, checks two evidence claims and
builds a supported explanation; ungraded prediction and guarded restart retained.
Science concepts verified against British Society of Soil Science; no live experiment.
Automated and SSR checks passed; browser/both-theme visual checks pending.

- **Topic ID:** `what-soil-is-made-from`; **Pascal ID:** `WhatSoilIsMadeFrom`.
- **Source crosswalk:** Rocks requirement 3: rocks and organic matter in soil.
- **Enquiry objective:** Observe components; compare samples; record and explain findings.
- **Boundary:** Soil contains material from rocks and organic matter. Use labelled specimen evidence; do not assess Year 4 habitat content as a prerequisite.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a soil component from a supported specimen view. | 5 short questions |
| 2 | Sort or compare components using supplied observations. | 5 short questions |
| 3 | Build a labelled soil-composition diagram or observation table. | 5 short questions |
| 4 | Inspect staged soil observations, record findings and build an explanation of its components. | 3 investigations |

## 4. Light

Category ID: `light`.

### Light and Darkness

**Implemented 2026-10-03:** 15 supported scene tasks, 15 three-observation
comparisons, 15 built explanations and nine controlled investigations.
Runs use five short tasks or three enquiries, with both lighting conditions in C1.
Five non-luminous objects and three labelled sources in a windowless box with no
other incoming light. Local SVG hides the object in dark observations but captions
keep it present; lit shapes remain readable in both theme token sets. C2 records
three observations; C3 builds condition/eyes/seeing in First/Next/So order; C4
requires three inspected stages, three records and the final-observation explanation.
Predictions ungraded; guarded reset retained. BBC Teach concepts verified 2026-10-03.
Automated and SSR checks passed; browser and both-theme visual checks pending.

- **Topic ID:** `light-and-darkness`; **Pascal ID:** `LightAndDarkness`.
- **Source crosswalk:** Light requirement 1: seeing needs light; dark is the absence of light.
- **Enquiry objective:** Compare conditions; ask a testable question; explain from observations.
- **Boundary:** Seeing requires light. Dark is the absence of light; avoid treating darkness as a substance.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose whether a supported scene has the light needed to see. | 5 short questions |
| 2 | Compare the same scene under supplied lighting conditions. | 5 short questions |
| 3 | Build a diagram/explanation linking light and seeing. | 5 short questions |
| 4 | Predict without grading, compare controlled lighting observations and conclude using evidence. | 3 investigations |

### Reflected Light

**Implemented 2026-10-03:** 18 supported facts, 15 distinct surface-pair comparisons, 18 lettered diagrams and nine enquiries. Six supplied surfaces all reflect light, including those with no clear image. C4 records both samples before building source/reflection/image-evidence tiles; both/neither/differing clarity scenarios appear each run.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `reflected-light`; **Pascal ID:** `ReflectedLight`.
- **Source crosswalk:** Light requirement 2: light reflected from surfaces.
- **Enquiry objective:** Compare observations; identify patterns; explain using evidence.
- **Boundary:** Reflection from surfaces at Year 3 depth. No assessed numerical angles, refraction or lens optics.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose an example of reflected light from a supported scene. | 5 short questions |
| 2 | Compare supplied observations of different surfaces. | 5 short questions |
| 3 | Build a simple labelled source/surface/seeing diagram. | 5 short questions |
| 4 | Inspect a controlled surface comparison and construct a reflection explanation from its results. | 3 investigations |

### Protecting Our Eyes from Sunlight

**Implemented 2026-10-03:** 15 authored everyday situations in each bank; all four challenges use five tasks, covering direct-viewing, UV-label checking and lens-darkness misconceptions each run. C4 requires both advice and its built explanation. NEI concepts verified; warnings are always visible. No sun-viewing practical card.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `protecting-our-eyes-from-sunlight`; **Pascal ID:** `ProtectingOurEyesFromSunlight`.
- **Source crosswalk:** Light requirement 3: sunlight can be dangerous; eye protection.
- **Enquiry objective:** Use supplied information; compare choices; communicate evidence-based advice.
- **Boundary:** Follow the source warning: never look directly at the sun, including through dark glasses. No practical activity asks learners to test sun viewing.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose safe eye-protection behaviour using a supported information card. | 5 short questions |
| 2 | Sort clearly specified safe and unsafe scenarios. | 5 short questions |
| 3 | Build a short eye-protection message from tiles. | 5 short questions |
| 4 | Use supplied evidence to choose and explain safe behaviour in everyday scenarios. | 5 short questions |

### How Shadows Form

**Implemented 2026-10-03:** 15 facts, 15 controlled comparisons, 15 lettered diagrams and nine enquiries. Blocker removed/replaced and lamp switched off/on are tested separately; an unlit screen is distinguished from a cast shadow. Edge-on diagrams label source, opaque object and shadow on the screen. Predictions ungraded; all three records required.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `how-shadows-form`; **Pascal ID:** `HowShadowsForm`.
- **Source crosswalk:** Light requirement 4: an opaque object blocks light to form a shadow.
- **Enquiry objective:** Compare controlled observations; identify a cause; record a diagram.
- **Boundary:** Source, opaque object and shadow. Shadow-size comparisons are the next topic; avoid advanced optical calculations.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose the cause of a shadow using a supported diagram. | 5 short questions |
| 2 | Compare supplied scenes with and without a blocking opaque object. | 5 short questions |
| 3 | Build or label a source/object/shadow arrangement. | 5 short questions |
| 4 | Predict without grading, test a controlled arrangement and explain the observed shadow. | 3 investigations |

### Changing Shadow Size

**Implemented 2026-10-03:** 15 comparison tasks, 15 three-position patterns, 15 numeric-table tasks and nine enquiries. A shared point-source geometry model draws and measures the shadow on a fixed screen; displayed/graded heights use whole cm. C3 uses controlled positions plus keypad/table records; C4 requires five-factor fair setup, all three positions, measurement records and a bounded evidence explanation. Source movement and object movement are separate comparisons.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `changing-shadow-size`; **Pascal ID:** `ChangingShadowSize`.
- **Source crosswalk:** Light requirement 5: patterns in changing shadow size.
- **Enquiry objective:** Fair comparison; measurement; recording; prediction and conclusion.
- **Boundary:** Explore one distance change at a time with the other geometry fixed. Treat the model as a simplified digital observation, not a universal rule for every outdoor shadow.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose the larger shadow from a supported comparison. | 5 short questions |
| 2 | Compare distance and shadow observations while reading labelled conditions. | 5 short questions |
| 3 | Record or build a table/chart from a fixed-screen shadow model. | 5 short questions |
| 4 | Make an ungraded prediction, change a controlled distance, record measurements and explain the pattern. | 3 investigations |

## 5. Forces and magnets

Category ID: `forces-and-magnets`.

### Movement on Different Surfaces

**Implemented 2026-10-03:** 15 supplied surface comparisons per short bank and nine enquiries. C1 chooses the further run, C2 sorts measured travel evidence, C3 requires a complete fair plan before keypad/table records, and C4 uses prediction/fair setup/staged stops/records/bounded explanation. Same toy, ramp release, level track and cm measuring method within a comparison. APS friction concepts verified; supplied distances are original examples, not universal predictions.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `movement-on-different-surfaces`; **Pascal ID:** `MovementOnDifferentSurfaces`.
- **Source crosswalk:** Forces requirement 1: compare movement on different surfaces.
- **Enquiry objective:** Set up a fair comparison; measure; record and conclude.
- **Boundary:** Compare observed movement under a fixed start/push and otherwise matched conditions. No force equations or unsupported universal ranking of surfaces.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a movement observation from a supported surface comparison. | 5 short questions |
| 2 | Compare supplied travel-distance records. | 5 short questions |
| 3 | Build a fair surface test and record results in a table. | 5 short questions |
| 4 | Predict without grading, inspect staged surface-test results and build a conclusion supported by measurements. | 3 investigations |

### Contact and Magnetic Forces

**Implemented 2026-10-03:** 15 supported contact/magnetic cases, 15 three-observation sorts, 15 lettered diagrams and nine controlled enquiries. Contact pushes/pulls require touching; supplied magnetic interactions retain a visible gap while a force acts. Before-force observations are distinct from contact/non-contact force evidence. IOP concepts verified; no claim that every non-contact force is magnetic.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `contact-and-magnetic-forces`; **Pascal ID:** `ContactAndMagneticForces`.
- **Source crosswalk:** Forces requirement 2: contact forces and magnetic force at a distance.
- **Enquiry objective:** Compare cases; classify interactions; explain with evidence.
- **Boundary:** Contact versus action at a distance through the source's everyday examples. Magnetic materials and pole rules have their own topics.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose whether contact is needed in a supported example. | 5 short questions |
| 2 | Sort explicit examples into contact and magnetic interactions. | 5 short questions |
| 3 | Build a labelled diagram showing whether objects touch. | 5 short questions |
| 4 | Predict without grading, inspect a controlled interaction and explain whether contact was needed. | 3 investigations |

### Magnetic Materials

**Implemented 2026-10-03:** 15 supported material tests, 15 three-sample classifications, 15 fair-test/result-table tasks and nine enquiries. Named iron/ordinary steel samples are attracted; aluminium/copper and selected non-metals show no noticeable attraction in these supplied classroom tests. Records rely on supplied evidence, not appearance; not all metals are magnetic. Magnet, gap, sample size and testing method are fixed within comparisons.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `magnetic-materials`; **Pascal ID:** `MagneticMaterials`.
- **Source crosswalk:** Forces requirements 3 and 4: some materials are attracted; compare and group magnetic materials.
- **Enquiry objective:** Classify from test evidence; select a fair comparison; record and conclude.
- **Boundary:** Cover material attraction and non-attraction, including the misconception that all metals are magnetic. Do not ask children to infer magnetism from a specimen's appearance.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose a material outcome from a supported magnet-test record. | 5 short questions |
| 2 | Sort materials using supplied attraction observations. | 5 short questions |
| 3 | Build a materials/results table from controlled digital tests. | 5 short questions |
| 4 | Predict without grading, compare material tests and justify a classification using results. | 3 investigations |

### Magnets and Their Poles

**Implemented 2026-10-03:** 16 supported pole facts, 15 supplied facing-pole comparisons, 15 label-and-record tasks and nine turning/repeating observation enquiries. Bar magnets have both N and S poles; all four facing pairs have supplied outcomes. Same poles repel; different poles attract. N/S identity is labelled, never inferred from colour. IOP concepts verified; numerical strength/field calculations excluded.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `magnets-and-their-poles`; **Pascal ID:** `MagnetsAndTheirPoles`.
- **Source crosswalk:** Forces requirements 3 and 5: observe magnet interactions; describe two poles.
- **Enquiry objective:** Observe and compare; label structures; record patterns.
- **Boundary:** Two poles and observable magnet-to-magnet interactions. Supply observations/support here; independent orientation predictions belong to the next topic.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Choose or identify the two poles on a supported magnet diagram. | 5 short questions |
| 2 | Compare observed interactions across labelled pole arrangements. | 5 short questions |
| 3 | Label magnets and build a table of supplied interaction results. | 5 short questions |
| 4 | Observe controlled pole arrangements and build a description of the pattern. | 3 investigations |

### Predicting Attraction and Repulsion

**Implemented 2026-10-03:** 16 rule-supported predictions, 15 multi-pair records, 15 target-arrangement construction tasks and nine model enquiries. Native controls turn either magnet; equivalent successful arrangements are accepted. A pure two-pole model computes attraction/repulsion and drawings. Predictions ungraded in C4; run/turn observations precede records and a bounded explanation. Reset clears evidence and rejects stale callbacks; no timers or continuous physics.
Automated and initial render checks passed; interactive browser and owner review pending.

- **Topic ID:** `predicting-attraction-and-repulsion`; **Pascal ID:** `PredictingAttractionAndRepulsion`.
- **Source crosswalk:** Forces requirement 6: predict interactions from facing poles.
- **Enquiry objective:** Predict without penalty; test; use observed patterns as evidence.
- **Boundary:** Apply facing-pole rules rather than repeat pole naming. Do not assess numerical magnetic strength, field equations or a continuous physics simulation.

| Challenge | Intended interaction and learning task | Rounds |
|---|---|---|
| 1 | Use a stated rule to choose what a labelled pole arrangement will do. | 5 short questions |
| 2 | Compare several facing-pole arrangements and match supported outcomes. | 5 short questions |
| 3 | Build or rotate an arrangement to obtain a specified interaction. | 5 short questions |
| 4 | Record an ungraded prediction, run the discrete magnet model and build an evidence-based explanation. | 3 investigations |

## Acceptance and review report per topic

1. Run the topic's pure tests, including meaningful bank sizes and all levels under multiple seeds and constant RNGs.
   Check correct-answer availability, valid alternative arrangements and consistency between observations and conclusions.
2. Check all four computed filenames, default exports and completion callback forwarding.
3. Run `npm run lint`, `npm test` and `npm run build`.
4. When browser tools exist, play wrong attempts, hints and complete runs. Verify completion, reload and replay on a disposable profile.
   For investigations, prove that a wrong prediction earns no miss and a correct intermediate stage cannot complete the round.
5. Inspect phone/desktop layout, both themes, keyboard use, reduced motion, absent speech and relevant image loading.
   Read measurements/labels from the rendered visual rather than trusting the bank's own answer.
6. Review the topic with the owner before continuing. Report bank sizes, four interactions, content boundaries,
   files changed, checks actually run, browser-driving clues and remaining issues.
7. Update the tracker, this brief if design changed, and project knowledge.
   If tools are unavailable, mark browser verification pending; implementation and passing terminal checks are not a browser pass.
