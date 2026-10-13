# Year 3 Geography — design spec

**Status:** implemented locally, 2026-10-13 — 16 topics / 64 challenges.
The owner requested this Year 3 build after the documentation-only checkpoint.
Physical-device voice/touch review remains pending; no deployment was requested.
**Implementation tracker:** embedded in §7; read it first when resuming.
**Shared spec:** [shared-design-spec.md](shared-design-spec.md).
**Statutory source and proposed mapping:** [key-stage-2-geography.md](../curriculum/key-stage-2-geography.md).

## 1. Goal

A Curriculum Mode path for children aged 7–8: **5 categories, 16 topics and 64 planned challenges**.

Extend from UK and world awareness to regional geography, reference lines and explanations of physical processes. Compare a UK region with a European region while building more precise map skills. Year 3 includes recaps so completion of Year 2 is not a prerequisite.

Success means a child can meet the outcomes below using pictures, maps,
notes and read-aloud support, and apply them to visible evidence. Challenge completion uses the existing progress/reward flow. Practical
observations are encouraged separately and are not marked complete by the app.

## 2. Allocation and content boundaries

This is the app's proposed Year 3 allocation within KS2, not a statutory year-by-year programme.
Requirement codes identify bullets in the shared spec §2 and source mapping.
The build request adopts the listed names, order and study choices for Year 3.
Titles now derive permanent IDs via `toKebabCase()`; do not rename them silently.

This is the first half of an app-defined lower-KS2 sequence. Europe/Russia, selected UK counties/cities, globe lines, four physical processes and two regions receive focused study. North/South America, rivers, climate zones/biomes, resource/trade depth, six-figure references and time zones follow in Year 4. Latitude/longitude and the significance of the tropics/circles are introductory; mastery and breadth continue in Years 5–6.

## 3. Topics and four-challenge briefs

Categories and topics below are in proposed release order. Each C1–C4 cell
is a challenge brief, developed into its own notes card and question bank
under shared spec §3. Maps/evidence remain visible while answering.

### The UK and Europe

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 1 | Counties Cities and Regions | K2-L2, K2-S1 | Locate a manageable set of UK cities and regions, and selected counties on a clearly labelled map convention. England examples include Cumbria as a ceremonial county, North Yorkshire and Greater London; explain that UK nations use different administrative systems. Revisit the four capitals and locate Manchester, Birmingham and Newcastle upon Tyne. |
| 2 | UK Landscapes and Land Use | K2-L2, K2-Hp, K2-Hh, K2-S1 | Locate named hills/mountains, coasts and rivers including the Lake District, Pennines, River Thames and a North Yorkshire coast example. Identify settlement, farming, woodland and leisure land use from paired maps/photos. Introduce dated change; detailed change enquiry continues in Year 4. |
| 3 | Europe and Russia | K2-L1, K2-S1 | Locate UK, France, Spain, Italy, Germany, Norway, Poland, Greece and Russia as a representative starting set. Locate London, Paris, Rome, Berlin and Moscow as major cities. Russia spans Europe and Asia. Introduce northern, Mediterranean and mountain environmental examples using labelled evidence, not fixed stereotypes. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 1 | Distinguish country, region, county and city labels. | Locate selected counties and cities on the provided map. | Read map evidence about their relative locations. | Choose a correctly nested place description. |
| 2 | Name landforms and land-use categories. | Locate the selected physical features on UK maps. | Compare land use in two mapped local settings. | Choose a supported explanation of how land is used. |
| 3 | Locate Europe within the world. | Read country and major-city positions on an atlas map. | Match labelled environmental examples to map locations. | Explain from the map why Russia spans two continents. |

### Lines on the Globe

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 4 | The Equator and Hemispheres | K2-L3, K2-S1 | Equator as zero latitude; Northern/Southern Hemispheres and places relative to it. Locate UK, Italy, Brazil and an Equator-crossing country on a labelled globe. A country can cross the Equator; no universal hemisphere weather rule. |
| 5 | Tropics and Polar Circles | K2-L3, K2-Hp, K2-S1 | Position Tropics of Cancer/Capricorn and Arctic/Antarctic Circles, above/below the Equator. Introduce their significance as boundaries associated with the overhead Sun and polar day/night, using a narrated diagram. Degrees are supplied labels, not a memory/calculation test; latitude alone does not determine climate. |
| 6 | Latitude and Longitude | K2-L3, K2-S1 | Latitude measures north/south position from the Equator; longitude east/west from the Prime/Greenwich Meridian. Introduce 0° labels and read simple supplied coordinates on a large grid. Lines can locate a place; do not confuse them with OS eastings/northings. Time-zone significance follows in Year 4. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 4 | Identify Equator and the two hemispheres. | Locate labelled places north or south of the Equator. | Interpret a country crossing the Equator. | Choose a globe description that uses both hemispheres. |
| 5 | Match the four named lines to a labelled globe. | Locate places relative to the marked reference lines. | Read a diagram of tropical and polar sunlight patterns. | Choose a supported reason these lines are useful. |
| 6 | Identify latitude, longitude and their zero lines. | Read a marked location on a labelled globe grid. | Distinguish north/south from east/west coordinates. | Choose the pair of given coordinates for a marked place. |

### Physical Processes

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 7 | Mountains and Valleys | K2-Hp, K2-L2, K2-S1 | Mountain, hill and valley; locate examples in UK and European regions. A simple diagram shows that some mountains form when plates push land up; mountains have different origins and not all are volcanoes. Introduce steep/gentle slopes without contour calculations. |
| 8 | Volcanoes | K2-Hp, K2-L1, K2-S1 | Crust, magma, vent, crater and lava in a simple cross-section. Magma is below ground; lava has reached the surface. Locate Vesuvius within Campania, Italy. Not all mountains are volcanoes; avoid current alert levels, eruption predictions and disaster narratives. |
| 9 | Earthquakes | K2-Hp, K2-S1 | Earthquake as ground shaking when energy is released by sudden movement along a fault. Introductory plate-boundary map and simple fault diagram; earthquakes can also occur away from boundaries. No magnitude arithmetic, current event feed or injury imagery. |
| 10 | The Water Cycle | K2-Hp | Evaporation, condensation, precipitation and collection/runoff in a repeating cycle; the Sun supplies energy. Clouds contain water droplets/ice, not visible water vapour. A cyclic process has no unique starting stage; name a starting point for ordering. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 7 | Identify mountain, hill, valley and slope features. | Locate examples in a labelled regional map. | Read a simple mountain-formation diagram. | Choose a supported link between slopes and land use. |
| 8 | Match volcano-part labels to a cross-section. | Locate Vesuvius through Europe, Italy and Campania. | Follow magma to lava on the diagram. | Choose a supported benefit or challenge of volcanic places. |
| 9 | Meet crust, plates, fault and shaking with diagrams. | Locate studied earthquake areas on a labelled map. | Read movement and energy release in a fault diagram. | Choose why scientists record earthquakes without predicting an exact date. |
| 10 | Match process words to diagram labels. | Trace a stated route of water through the diagram. | Order stages from an explicitly named starting point. | Choose how rainfall, runoff and evaporation connect. |

### Two European Regions

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 11 | The Lake District | K2-P1, K2-L2, K2-Hp, K2-Hh, K2-S1 | Study the bounded Lake District National Park region in England: mountains, valleys, lakes and settlements; farming and tourism as evidenced land uses. Use Kendal as a nearby location where appropriate, without implying it lies inside the park. Include local lives as well as scenery; no changing visitor totals. |
| 12 | Campania | K2-P1, K2-L1, K2-Hp, K2-Hh, K2-S1 | Study the administrative region of Campania in Italy, including Naples, coast, uplands and Vesuvius. Use evidence about homes, port activity, farming and tourism. Vesuvius/Naples are case locations within the region, not the whole region. Provide dated/example climate records with sources. |
| 13 | Comparing Two Regions | K2-P1, K2-Hp, K2-Hh, K2-S1 | Compare Lake District and Campania through the same dimensions: relief/water, settlements, land use and supplied climate summaries. At least two supported similarities and differences; compare like scales and equivalent time periods. A UK/Italy country-level fact is not regional evidence. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 11 | Meet the region through map and photo captions. | Locate the park, landforms and selected settlements. | Read farming and tourism evidence in the source pack. | Choose a connection between landscape and livelihoods. |
| 12 | Meet the region and its main mapped features. | Locate Campania, Naples and Vesuvius within Italy. | Read human/physical evidence from maps and photographs. | Choose a supported relationship between land and work. |
| 13 | Retrieve the two regional extents and features. | Read paired maps and equivalent climate summaries. | Select evidence for regional similarities/differences. | Choose a comparison connecting physical and human features. |

### Maps and Local Surveys

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 14 | Eight Compass Points | K2-S2, K2-S1 | N, NE, E, SE, S, SW, W and NW, with directions read from a shown north arrow. Describe one feature relative to another; rotate only explicitly oriented practice maps. No compass bearings in degrees. |
| 15 | Four Figure Grid References | K2-S2, K2-S1 | Read eastings before northings; four figures identify a square by its lower-left corner lines. Use large numbered practice grids plus a genuinely licensed OS extract and its symbols/key. A point on a boundary is excluded from single-answer tasks; six figures belong to Year 4. |
| 16 | Surveying Local Land Use | K2-S3, K2-Hh, K2-L2, K2-S1 | Enquiry: how is land used around a familiar place? Choose consistent categories, marked observation sites, a tally and sketch map. Present a simple graph from labelled example data; grown-up fieldwork collects real observations. An aerial photo alone cannot prove a building's current use. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 14 | Match the eight points to their spoken names. | Read a direction between two labelled features. | Follow a short route using cardinal/diagonal steps. | Choose the route description matching a mapped journey. |
| 15 | Read numbered lines and common symbols using a key. | Locate a square by eastings then northings. | Read a feature in a referenced square on an OS extract. | Choose the correct square reference for an interior marker. |
| 16 | Choose an observable land-use question. | Read sites and categories on a survey plan. | Interpret a practice tally, sketch map and graph. | Choose a supported conclusion and a useful next observation. |

## 4. Learning settings and example rounds

Use the shared notes-first model: **≤60-word notes cards**, sentences of
**≤16 words**, **5 rounds per run**, and **at least 7 distinct templates per slot**.
Offer three choices with pictured or source support.
Notes, prompts, map labels and choices have narration on request. The run
contains no timed task, spelling test or reward for guessing quickly.

**Example, Four Figure Grid References C4:** a tree marker lies clearly inside the square bounded by eastings 23–24 and northings 41–42. Ask for its square reference: 2341, 4123 or 2442. Evidence is the displayed numbered grid; hint: “Along first, then up.” Alt text gives the same square boundaries.

**Example, The Water Cycle C3:** start explicitly with evaporation. Order evaporation → condensation → precipitation → collection. The notes state that water keeps moving and can take other routes; do not imply this is a cycle's only starting point.

Topic authors record the evidence and any reasoning for the keyed answer.
Choice/sort/order/chart/build controls follow the existing kit. A map marker
choice uses ordinary answer buttons; direct map-tapping is not assumed.

## 5. Fieldwork and source pack

With a grown-up, choose a familiar site and ask how its land is used. Select two observation points, use the same categories at both, tally visible uses and sketch a keyed map. Record uncertainty when a building's use is not visible. Present the tally as a paper graph or a grown-up-assisted digital chart; compare only the sampled points.

Each relevant topic has a collapsed grown-up activity card available after
completion and on replay: materials, steps, paper recording prompts and an
accessible alternative. No address, school name, GPS, photos or fieldwork
completion is collected. Digital practice and real observation stay distinct.

Use the shared spec §4 named study extents, accuracy rules and source/licence
contract. Topic banks need references for every factual assertion, paired
maps/photos/records that actually support their questions, and reviewed alt
equivalents. Example data is labelled; real records carry place and date.

## 6. Certificate outcomes and build handoff

These are proposed topic-certificate “I can…” lines. They describe the digital
outcome; they do not certify the child performed outdoor fieldwork.

| # | Topic | Outcome |
|---|---|---|
| 1 | Counties Cities and Regions | I can locate selected UK counties, cities and regions. |
| 2 | UK Landscapes and Land Use | I can describe UK landscapes and how land is used. |
| 3 | Europe and Russia | I can locate selected European countries including Russia. |
| 4 | The Equator and Hemispheres | I can locate the Equator and identify hemispheres. |
| 5 | Tropics and Polar Circles | I can identify the tropics and polar circles on a globe. |
| 6 | Latitude and Longitude | I can use latitude and longitude lines to describe position. |
| 7 | Mountains and Valleys | I can describe mountains and valleys using a diagram. |
| 8 | Volcanoes | I can describe a volcano and locate a studied example. |
| 9 | Earthquakes | I can explain a simple cause of earthquake shaking. |
| 10 | The Water Cycle | I can describe how water moves through the water cycle. |
| 11 | The Lake District | I can describe the human and physical geography of the Lake District. |
| 12 | Campania | I can describe the human and physical geography of Campania. |
| 13 | Comparing Two Regions | I can use evidence to compare a UK and a European region. |
| 14 | Eight Compass Points | I can use the eight compass points on a map. |
| 15 | Four Figure Grid References | I can use a four-figure grid reference and map key. |
| 16 | Surveying Local Land Use | I can plan and read a local land-use survey. |

Dataset: `src/data/year3GeographyCurriculum.js`.
Topic banks: `src/data/challenges/geography/year3/`.
Wrappers: `src/pages/skills/geography/challenges/year3/<topic-id>/<Pascal>Challenge1–4.jsx`.
Follow shared spec §§7–8 for registry, stable IDs, certificates, assets and
verification. Keep the Geography entry outside the overall year award
using the existing `countsTowardYear: false` mechanism. Release each complete
topic in the listed order; preserve all prior subject/year progress.

## 7. Implementation tracker

**Checkpoint:** 2026-10-13 — all 16 topics implemented in spec order, all 64 slots verified.
**Totals:** 16/16 topics built; 64/64 challenges built and verified.
**Banks:** 454 templates; at least seven per slot, five rounds drawn without replacement.
**Pilot:** Counties Cities and Regions completed before the remaining topics.
**Source pack:** [assets, factual references and verification limits](YEAR3_SOURCE_PACK.md).
**Resume:** review physical phone/tablet speech and touch. Read this tracker and
the source mapping before extending content; preserve the now-locked topic IDs.

In the table, **— means not started**. Record C1–C4 independently as Built
then Verified; use the evidence column for check results, review notes and
release state. A drafted brief does not mean a built challenge.

| # | Topic | Brief | C1 | C2 | C3 | C4 | Verification / release evidence |
|---|---|---|---|---|---|---|---|
| 1 | Counties Cities and Regions | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 2 | UK Landscapes and Land Use | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 3 | Europe and Russia | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 4 | The Equator and Hemispheres | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 5 | Tropics and Polar Circles | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 6 | Latitude and Longitude | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 7 | Mountains and Valleys | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 8 | Volcanoes | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 9 | Earthquakes | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 10 | The Water Cycle | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 11 | The Lake District | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 12 | Campania | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 13 | Comparing Two Regions | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 14 | Eight Compass Points | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 15 | Four Figure Grid References | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |
| 16 | Surveying Local Land Use | Implemented | Verified | Verified | Verified | Verified | Automated bank checks; complete browser runs; see log below |

| Milestone | Status | Required evidence |
|---|---|---|
| Spec and statutory crosswalk | Implemented | All 16 stable IDs mapped; statutory text preserved |
| Shared engine and asset foundation | Verified | Geography wrapper, evidence visuals, licensed sources, accessible equivalents |
| Dataset, registry and certificate outcomes | Verified | 16 topics / 64 wrappers; certificate coverage; `countsTowardYear: false` |
| First topic pilot | Verified | All four actual runs, retries, hints, notes reopening and reload/replay |
| Remaining topics | Verified | All 60 remaining slots completed through actual controls |
| Lint, full tests and build | Passed | Lint, 1,700 unit + 280 component tests; build passes; four DB tests skipped |
| Browser and progress regression | Passed | 64 runs, 52 extra layout checks, existing awards/progress and profile switching |
| Physical-device voice and touch | Pending | Real phone/tablet review; browser text/viewport checks do not replace this |
| Subject release | Implemented locally | All topics registered and playable; docs updated; deployment not requested |

### Log

- **2026-10-13:** Drafted the spec, four challenge briefs per topic,
  outcome lines and statutory mapping. Implementation is intentionally
  unstarted under the owner’s specs-only request.

- **2026-10-13 — implementation:** Built the five categories, all 16 banks and
  64 wrappers after the owner requested Year 3. Added a Geography-specific notes
  wrapper, map/globe/coordinate/grid/process/compass visuals, genuine OS extract
  and key, photographs, matched NASA POWER records and optional paper survey.
  Registry, awards, certificates and existing progress use the current flow.
- **2026-10-13 — checks:** `npm run lint`, `npm test` and `npm run build` pass.
  Full tests: 1,697 unit tests and 274 component tests; four database-dependent
  tests skipped. Unit checks lock IDs and wrapper paths, validate every bank over
  60 seeds per slot, recalculate climate values, check map interiors, directions
  and reference squares, and verify asset checksums and source references.
- **2026-10-13 — browser:** Played all 64 five-round runs with normal gating
  and isolated local profiles: C1/C3 at light desktop, C2/C4 at dark 320 px.
  Checked two wrong answers, hints, notes reopening without losing the answer,
  actual keyboard ordering, numeric saved completions, reload and replay.
  Reviewed 13 representative map/globe/diagram/photo/chart/route/grid slots in
  both themes at both 320 and 1280 px (52 additional layouts). Checked source
  image failure/retry, requested narration text with `en-GB`, prior Year 3
  certificate availability before Geography starts, existing Year 2 Maths
  progress, the completed optional activity, and profile switching. Browser
  contexts had no access to production accounts or third-party image hosts.
- **Limits:** Physical-device audible speech and touch remain pending. Completing
  the digital survey does not certify outdoor fieldwork. Country/region/process
  coverage is introductory KS2; Years 4–6 depth and extended explanations remain
  later work. Build retains Vite's large-chunk warning; no deployment was made.

- **Final content review:** Corrected European example markers to Tromsø-area
  coast, Italian Alps and Alicante-area Mediterranean coast, with primary place
  references. C2 grid references now locate a marker from a supplied reference;
  C4 reads a reference from an interior marker. Both revised five-round runs
  were replayed through real browser controls after the changes.

- **2026-10-13 — security and bug review:** Fixed read-aloud to follow the live
  ordering and sorting response. Image retries now bypass cached failures;
  unknown asset/map/source references preserve text equivalents, and a new photo
  resets image-error state. Lookups reject inherited IDs and source links require
  HTTPS. Validation reports malformed banks/visuals, unknown kinds/views, invalid
  chart data and non-finite/out-of-range grid coordinates. Added nine regression
  cases, including literal HTML rendering; production dependency audit reported
  zero known vulnerabilities. No progress storage, gating or award changes.
  Final lint, build and full tests passed (1,700 unit, 280 component; four DB
  tests skipped). Isolated browser checks verified live ordering narration in
  both themes at 320/1280 px, sorting narration, actual photo/OS image network
  failures and fresh-URL recovery. No browser errors; earlier Maths and the
  other child's progress remained unchanged.
