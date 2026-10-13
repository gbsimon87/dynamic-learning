# Year 1 Geography — design spec

**Status:** implemented 2026-10-13 (12 topics / 48 challenges); IDs now permanent. Physical-device review pending.
**Implementation tracker:** embedded in §7; read it first when resuming.
**Shared spec:** [shared-design-spec.md](shared-design-spec.md).
**Statutory source and proposed mapping:** [key-stage-1-geography.md](../curriculum/key-stage-1-geography.md).

## 1. Goal

A Curriculum Mode path for children aged 5–6: **4 categories, 12 topics and 48 planned challenges**.

Start with familiar places and pictures, then widen to the UK and the world. The path introduces all four KS1 strands; the sustained contrasting-place study belongs to Year 2.

Success means a child can meet the outcomes below using pictures, maps,
notes and read-aloud support, and apply them to visible evidence. Future
challenge completion uses the existing progress/reward flow. Practical
observations are encouraged separately and are not marked complete by the app.

## 2. Allocation and content boundaries

This is the app's proposed Year 1 allocation within KS1, not a statutory year-by-year programme.
Requirement codes identify bullets in the shared spec §2 and source mapping.
Names, order and study choices are draft design decisions, not owner-approved
identifiers. Once shipped, titles derive permanent IDs via `toKebabCase()`.

Year 1 introduces the full KS1 feature-word inventory through pictured examples, then revisits it across maps and weather. Recognising a picture once is not mastery. No country capitals outside the UK, coordinate numbers, eight-point compass, time zones, biome names or independent writing is assessed.

## 3. Topics and four-challenge briefs

Categories and topics below are in proposed release order. Each C1–C4 cell
is a challenge brief, developed into its own notes card and question bank
under shared spec §3. Maps/evidence remain visible while answering.

### Our Place

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 1 | Around Our School | K1-H2p, K1-H2h, K1-S4 | School grounds or a clearly labelled practice setting: buildings, paths, trees and soil. Notice features rather than naming a child's actual school. Introduce observation and a simple grown-up walk. |
| 2 | Human and Physical Features | K1-H2p, K1-H2h, K1-P1 | Physical features: beach, cliff, coast, forest, hill, mountain, sea, ocean, river, soil, valley and vegetation. Human features: city, town, village, factory, farm, house, office, port, harbour and shop. Spread this vocabulary across the year; use clear scenes and introduce small-area descriptions, with comparison developed in Year 2. |
| 3 | Maps from Above | K1-S3 | Compare an eye-level view, an aerial photograph and a simple plan of the same setting. Identify landmarks from above; introduce a plan showing a building and grounds. No compass rotation or scale calculation. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 1 | Name pictured buildings, paths and trees. | Locate features on a labelled grounds picture. | Sort a specified building and natural features. | Choose what to observe on a grown-up walk. |
| 2 | Match a few familiar feature words to pictures. | Find named features in two labelled scenes. | Sort clearly specified human and physical features. | Choose a supported similarity between two places. |
| 3 | Match a landmark across ground-level pictures. | Match the same landmark in an aerial view. | Choose the plan that matches the shown grounds. | Choose a simple symbol for a mapped feature. |

### The United Kingdom

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 4 | Four Countries of the UK | K1-L2, K1-S1 | England, Scotland, Wales and Northern Ireland on a correctly bounded UK map. Introduce one evidenced characteristic per country without national stereotypes. Locate the UK on a globe; distinguish the Republic of Ireland. |
| 5 | UK Capital Cities | K1-L2, K1-H2h, K1-S1 | London, Edinburgh, Cardiff and Belfast paired with their countries and labelled locations. A capital is a city; not every city is a capital. Use one captioned landmark per city, avoiding landmark trivia as the objective. |
| 6 | Seas Around the UK | K1-L2, K1-H2p, K1-S1 | Locate the North Sea, Irish Sea, English Channel and Atlantic Ocean around the UK. Explicitly call the Atlantic an ocean. Teach coast as where land meets sea; no detailed sea-boundary or tidal questions. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 4 | Name the four countries with labels and narration. | Locate each country using enlarged map markers. | Match pictured country features to provided captions. | Choose the UK outline including Northern Ireland. |
| 5 | Meet each capital on a labelled country card. | Find each capital using map markers. | Match each capital to its country. | Choose the country and capital for a pictured visit. |
| 6 | Distinguish land, coast and water on a picture. | Locate named waters on a labelled UK map. | Match a coastline picture to the provided map marker. | Choose which named water lies beside a shown coast. |

### The Wider World

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 7 | Seven Continents | K1-L1, K1-S1 | Name and locate Africa, Antarctica, Asia, Europe, North America, South America and Australia. Use a simplified world map and globe; the UK is in Europe. Small labels use insets; never teach continent size from a distorted flat map. |
| 8 | Five Oceans | K1-L1, K1-H2p, K1-S1 | Name and locate Pacific, Atlantic, Indian, Arctic and Southern oceans with clear water markers. Show that the Pacific appears at both edges of some maps. Sea and ocean are water features; avoid exact ocean-boundary disputes. |
| 9 | Hot and Cold Places | K1-H1, K1-S1 | Introduce the Equator, North Pole and South Pole on a globe. Broadly warmer areas near the Equator and colder areas near the poles; not all places on a continent share one temperature. No latitude degrees or biome classification. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 7 | Match continent names to labelled shapes. | Choose continent markers on a world map. | Locate the UK within Europe on a globe view. | Match a globe view to the same continent on a map. |
| 8 | Name oceans with a labelled map. | Choose the marker for a named ocean. | Match ocean names between map and globe views. | Identify the same Pacific Ocean on both map edges. |
| 9 | Find the three labelled reference locations. | Locate example hot and cold areas on a globe. | Sort clearly labelled warm-area and polar scenes. | Choose a reason using distance from the Equator. |

### Weather and Exploring

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 10 | Daily Weather | K1-H1, K1-H2p, K1-S4 | Sunny, cloudy, rainy, windy and snowy weather, including combinations. Read simple example daily observations; what we observe differs from a forecast. Keep weather records with a grown-up; no current forecast feed. |
| 11 | Seasons in the UK | K1-H1, K1-H2p, K1-S4 | Spring, summer, autumn and winter as a repeating cycle in the UK. Typical changes in daylight, plants and weather; it can rain in any season and snow is not guaranteed. No Earth-tilt mechanism or rigid seasonal weather rules. |
| 12 | Routes and Simple Maps | K1-S2, K1-S3 | Near/far, left/right and North/South/East/West with a north arrow on a simple map. Follow a two-step route and choose symbols for a key. Left/right refers to a shown person's viewpoint; north is not automatically the top. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 10 | Match weather words to clear symbols. | Read the symbols in an example daily record. | Choose observations supported by a shown scene. | Choose what to record while looking outside. |
| 11 | Meet the four seasons with captioned pictures. | Order the seasons from a stated starting season. | Match observed plant/daylight clues to taught patterns. | Choose how to observe change at the same place. |
| 12 | Use near/far and left/right on an explicit view. | Follow one then two compass-direction steps. | Read simple symbols to find map features. | Choose features and symbols for a simple grounds map. |

## 4. Learning settings and example rounds

Use the shared notes-first model: **≤30-word notes cards**, sentences of
**≤10 words**, **4 rounds per run**, and **at least 6 distinct templates per slot**.
Offer two or three choices with pictured support.
Notes, prompts, map labels and choices have narration on request. The run
contains no timed task, spelling test or reward for guessing quickly.

**Example, Routes and Simple Maps C2:** north arrow points up; a school is at the centre and a tree at marker B one square east. Ask “Go east from the school. Which marker?” with A/B choices. Evidence: the compass and marker positions. Hint: “East follows the E arrow.” Narration describes the same positions.

**Example, Daily Weather C3:** a labelled record shows cloud and rain symbols together. Ask which description matches: “Cloudy and rainy” or “Sunny and dry”. The weather is example data; no actual outdoor task is inferred.

Topic authors record the evidence and any reasoning for the keyed answer.
Choice/sort/order/chart/build controls follow the existing kit. A map marker
choice uses ordinary answer buttons; direct map-tapping is not assumed.

## 5. Fieldwork and source pack

A grown-up walk around familiar grounds: notice one building, one path and one growing thing; draw them from above using two chosen symbols. Repeat a view from a window to note weather or seasonal change. Digital grounds pictures rehearse observation and do not claim to be the child's own school.

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
| 1 | Around Our School | I can describe features around a familiar place. |
| 2 | Human and Physical Features | I can name human and physical features. |
| 3 | Maps from Above | I can recognise a familiar place from above. |
| 4 | Four Countries of the UK | I can name and locate the four UK countries. |
| 5 | UK Capital Cities | I can match each UK country to its capital. |
| 6 | Seas Around the UK | I can locate waters around the UK. |
| 7 | Seven Continents | I can name and locate the seven continents. |
| 8 | Five Oceans | I can name and locate the five oceans. |
| 9 | Hot and Cold Places | I can locate the Equator and the two poles. |
| 10 | Daily Weather | I can describe and record daily weather. |
| 11 | Seasons in the UK | I can describe typical changes across UK seasons. |
| 12 | Routes and Simple Maps | I can follow a simple route and use a map key. |

Future dataset: `src/data/year1GeographyCurriculum.js`.
Future topic banks: `src/data/challenges/geography/year1/`.
Future wrappers: `src/pages/skills/geography/challenges/year1/<topic-id>/<Pascal>Challenge1–4.jsx`.
Follow shared spec §§7–8 for registry, stable IDs, certificates, assets and
verification. Keep the future Geography entry outside the overall year award
using the existing `countsTowardYear: false` mechanism. Release each complete
topic in the listed order; preserve all prior subject/year progress.

## 7. Implementation tracker

**Checkpoint:** 2026-10-13 — all 12 topics built and verified in automated checks and browser screenshots.
**Totals:** 12/12 topics built; 48/48 challenges built and verified (automated + browser render).
**Next:** physical phone/tablet voice and touch review.
**Resume:** read the shared spec, this tracker and the source mapping before
editing. Build in category/topic order and release all four slots together.

In the table, **— means not started**. Record C1–C4 independently as Built
then Verified; use the evidence column for check results, review notes and
release state. A drafted brief does not mean a built challenge.

| # | Topic | Brief | C1 | C2 | C3 | C4 | Verification / release evidence |
|---|---|---|---|---|---|---|---|
| 1 | Around Our School | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 2 | Human and Physical Features | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 3 | Maps from Above | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 4 | Four Countries of the UK | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 5 | UK Capital Cities | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 6 | Seas Around the UK | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 7 | Seven Continents | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 8 | Five Oceans | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 9 | Hot and Cold Places | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 10 | Daily Weather | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 11 | Seasons in the UK | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |
| 12 | Routes and Simple Maps | Drafted | Verified | Verified | Verified | Verified | Lint, unit/component playthrough, light+dark screenshots |

| Milestone | Status | Required evidence |
|---|---|---|
| Spec and statutory crosswalk | Drafted | Year allocation, topic boundaries and four-slot briefs present |
| Shared engine and asset foundation | Done | Shared spec tracker complete enough for the pilot |
| Dataset, registry and certificate outcomes | Done | 12 topics / 48 slots, locked IDs and certificate coverage |
| First topic pilot | Done | All four runs, notes, hints, map access, reload/replay and both themes |
| Remaining topics | Done | Per-topic C1–C4 rows built and verified in order |
| Lint, full tests and build | Passed | All three required commands pass for the implementation |
| Browser and progress regression | Browser render passed; progress regression by unit tests | Desktop/phone, both themes, other subjects/years and profile switching |
| Physical-device voice and touch | Not started | Phone/tablet review, distinct from simulated viewports |
| Subject release | Registered (no deployment) | Verified topics, docs updated and remaining coverage limits recorded |

### Log

- **2026-10-13:** Drafted the spec, four challenge briefs per topic,
  outcome lines and statutory mapping. Implementation is intentionally
  unstarted under the owner’s specs-only request.
- **2026-10-13:** Implemented all 48 challenges on the owner's request using
  the briefs above: 352 templates, a new `y1` picture system
  (Year1Drawing/Year1Sprites, four-nations UK map, continent world map and
  globe from Natural Earth), grown-up activities for four topics and the
  Geography start/notes redesign. `npm run lint`, `npm test` and `npm run build`
  pass; every challenge was rendered in light (900 px) and dark (390 px) with no
  horizontal overflow. Country features use one sourced example each (Lake
  District fells, Scottish islands, Welsh castles, Giant's Causeway).
