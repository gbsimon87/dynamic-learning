# Year 2 Geography — design spec

**Status:** draft, 2026-10-13; specifications only, implementation not started.
**Implementation tracker:** embedded in §7; read it first when resuming.
**Shared spec:** [shared-design-spec.md](shared-design-spec.md).
**Statutory source and proposed mapping:** [key-stage-1-geography.md](../curriculum/key-stage-1-geography.md).

## 1. Goal

A Curriculum Mode path for children aged 6–7: **5 categories, 14 topics and 56 planned challenges**.

Consolidate world and UK location, then use named small areas to compare human and physical geography. Make map-reading and local observation increasingly purposeful. A child can enter Year 2 directly; its first topics recap Year 1 knowledge.

Success means a child can meet the outcomes below using pictures, maps,
notes and read-aloud support, and apply them to visible evidence. Future
challenge completion uses the existing progress/reward flow. Practical
observations are encouraged separately and are not marked complete by the app.

## 2. Allocation and content boundaries

This is the app's proposed Year 2 allocation within KS1, not a statutory year-by-year programme.
Requirement codes identify bullets in the shared spec §2 and source mapping.
Names, order and study choices are draft design decisions, not owner-approved
identifiers. Once shipped, titles derive permanent IDs via `toKebabCase()`.

Together with Year 1, the path plans all KS1 bullets and listed vocabulary. Small-area study is sustained across four topics rather than replaced by country facts. Independent map drawing and first-hand fieldwork remain practical requirements outside automatic completion. No eight-point compass, numeric grid references, broad national generalisations or climate-zone classification.

## 3. Topics and four-challenge briefs

Categories and topics below are in proposed release order. Each C1–C4 cell
is a challenge brief, developed into its own notes card and question bank
under shared spec §3. Maps/evidence remain visible while answering.

### World and UK Knowledge

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 1 | Continents and Oceans Together | K1-L1, K1-S1 | Retrieve all seven continents and five oceans using world maps, atlases and globe views. Locate the UK and Brunei within their continents; distinguish country, continent and ocean. No blanket “which ocean surrounds a continent” questions with multiple answers. |
| 2 | UK Places and Landscapes | K1-L2, K1-H2p, K1-H2h, K1-S1 | Consolidate countries, capitals and surrounding waters. Locate captioned UK coast, hill, mountain, valley, forest, river and settlement examples. Revisit farm, factory, office, port and harbour without implying they occur in only one country. |
| 3 | Compass Directions and Routes | K1-S2 | Use N/S/E/W and near/far, left/right to describe relative location and follow up to three steps on a simple map. Read an explicit north arrow, including a rotated practice view. No diagonal compass points or distance scales. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 1 | Retrieve continent and ocean names. | Locate places across map, atlas and globe views. | Classify named continent, country and ocean examples. | Read a labelled journey between continent markers. |
| 2 | Retrieve countries, capitals and waters. | Locate labelled landscape examples on a UK map. | Identify human and physical features in UK scenes. | Choose a country description supported by its evidence. |
| 3 | Read four directions on a compass rose. | Locate a feature relative to a named starting point. | Follow a route using the displayed orientation. | Choose directions that reach the shown destination. |

### Weather and World Patterns

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 4 | Weather Records | K1-H1, K1-S4 | Read and compare a five-day UK example weather log and a simple tally/pictogram. Distinguish weather on a day from typical seasonal patterns. Records may contain several weather observations per day, so ask clear questions. |
| 5 | The Equator and the Poles | K1-H1, K1-S1 | Retrieve Equator and poles and apply the broad hot/cold pattern to located examples. Brunei is near the Equator; the UK is farther north. Explain that a place can be wet and warm; no hemispheric season reversal assessment yet. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 4 | Match recorded weather to its symbol. | Read an example five-day weather log. | Compare counts from a labelled tally/pictogram. | Choose a consistent way to keep a short weather log. |
| 5 | Locate Equator, North Pole and South Pole. | Place UK and Brunei markers on a labelled globe. | Use location to interpret taught hot/cold examples. | Reject a claim that all of Asia has the same weather. |

### Two Small Places

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 6 | Whitby by the Sea | K1-P1, K1-H2p, K1-H2h, K1-S1, K1-S3 | Bound the study to the harbour and adjoining town-centre streets in Whitby, England. Locate UK → England → Whitby → study area. Read maps/photos of sea, coast, river, harbour, homes and shops; not a study of all England. |
| 7 | Kampong Ayer by the River | K1-P1, K1-H2p, K1-H2h, K1-S1, K1-S3 | Bound the study to Kampong Peramu and nearby river/walkways within Kampong Ayer, Brunei, Asia. Use the official trail to define the area. Study homes, walkways, river and boat journeys. Include everyday life and varied buildings; no claim that all Bruneians live on water. |
| 8 | Homes and Journeys in Two Places | K1-P1, K1-H2h, K1-S2 | Compare evidenced homes and journeys in the same two bounded areas. Both have homes and routes; some local journeys use boats and some walkways/roads. Describe photographed examples without assuming everyone travels the same way. |
| 9 | Comparing Two Small Places | K1-P1, K1-H2p, K1-H2h, K1-H1 | Bring together human features, physical features and dated weather evidence for Whitby and the Kampong Peramu study area. At least two similarities and two differences with visible evidence; one photo or daily record cannot describe an entire country or climate. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 6 | Meet the bounded place through captioned views. | Locate Whitby and read the study-area map. | Identify features visible in an aerial view and photos. | Choose a supported connection between water and work. |
| 7 | Meet the neighbourhood through captioned views. | Locate Asia, Brunei and the bounded study area. | Read mapped river, homes and walkway features. | Choose what the evidence tells us and cannot tell us. |
| 8 | Name shared needs shown in both places. | Read a short journey on each local map. | Sort supported similarities and differences. | Choose a reason connecting a route to surrounding water. |
| 9 | Retrieve the named places and their features. | Read paired maps/photos and weather records. | Choose statements supported by the paired evidence. | Choose a short comparison with a reason and a limit. |

### Making and Reading Maps

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 10 | Aerial Views and Landmarks | K1-S3 | Match familiar landmarks between ground photos, true aerial views and plans; distinguish all three. Include the two small-area studies and a practice school. No identification from tiny blurry photographs. |
| 11 | Symbols and Map Keys | K1-S3, K1-S2 | Read and construct a basic key with a unique symbol for each feature, using supported choices/sorts. Include house, shop, trees, path and water. Use shape and label as well as colour; advanced OS symbols belong to KS2. |
| 12 | Making a Simple Map | K1-S3, K1-S2 | Plan a map of a shown practice area: choose landmarks, match plan arrangements, add a key and describe a route. Digital tasks are supported construction, not an unrestricted drawing tool. Original sketching belongs to the grown-up activity. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 10 | Identify ground, aerial and plan views. | Match a visible landmark across two views. | Locate human and physical features from above. | Choose a plan matching the same arrangement. |
| 11 | Match simple symbols to feature labels. | Find map features using the displayed key. | Match proposed symbols to make a consistent key. | Choose a corrected key for a mismatched symbol. |
| 12 | Choose useful landmarks from the shown area. | Choose a plan preserving their relative positions. | Construct a matching key through supported choices. | Choose a map and route that another person can follow. |

### Local Fieldwork

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 13 | Observing Our School Grounds | K1-S4, K1-H2p, K1-H2h, K1-S3 | Observe human/physical features, use a simple tally and sketch a map/key. Screen tasks use a labelled practice setting; the grown-up card offers real school/home grounds or a window view. No school-name entry or uploads. |
| 14 | Exploring Our Local Area | K1-S4, K1-H2p, K1-H2h, K1-S2, K1-S3 | A grown-up-led familiar route to notice buildings, vegetation, land use and route landmarks. Compare two practice observation points and present findings with a simple map/key. Road or waterside observations stay with the grown-up from an appropriate place. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 13 | Choose features that can be observed. | Read a practice observation sheet and plan. | Choose a consistent tally and matching map key. | Order observe, record, map and describe steps. |
| 14 | Identify a sensible local observation question. | Read landmarks and directions on a practice route. | Compare observations from two marked points. | Choose a map and short account supported by the record. |

## 4. Learning settings and example rounds

Use the shared notes-first model: **≤45-word notes cards**, sentences of
**≤12 words**, **5 rounds per run**, and **at least 7 distinct templates per slot**.
Offer three choices with pictured or source support.
Notes, prompts, map labels and choices have narration on request. The run
contains no timed task, spelling test or reward for guessing quickly.

**Example, Comparing Two Small Places C3:** two captioned study-area photos each show homes beside water; one shows a walkway and another a street. Ask which similarity is supported: “Both have homes near water”, “Every home is on stilts”, or “Nobody uses roads”. Evidence is the two views, not an assumption about the countries.

**Example, Weather Records C2:** an example five-day log shows rain on Monday and Thursday. Ask “Which pair of days had rain?” with three distinct day-pair choices; keep the log visible. Hint identifies the rain symbol. Do not call two rainy days the town's climate.

Topic authors record the evidence and any reasoning for the keyed answer.
Choice/sort/order/chart/build controls follow the existing kit. A map marker
choice uses ordinary answer buttons; direct map-tapping is not assumed.

## 5. Fieldwork and source pack

Keep a five-day weather log with a grown-up. For grounds/local-area topics, ask “Which features can we see here?”, follow a familiar supervised route, tally selected features, draw a plan and invent a consistent key. Offer a home/window alternative, and describe how a smaller viewing area changes the findings.

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
| 1 | Continents and Oceans Together | I can use maps to locate continents and oceans. |
| 2 | UK Places and Landscapes | I can describe UK places using geographical words. |
| 3 | Compass Directions and Routes | I can describe places and routes using four directions. |
| 4 | Weather Records | I can use a weather record to describe a pattern. |
| 5 | The Equator and the Poles | I can relate hot and cold areas to the Equator and poles. |
| 6 | Whitby by the Sea | I can describe human and physical features in Whitby. |
| 7 | Kampong Ayer by the River | I can describe features in a small area of Brunei. |
| 8 | Homes and Journeys in Two Places | I can compare homes and journeys in two small places. |
| 9 | Comparing Two Small Places | I can use evidence to compare two small places. |
| 10 | Aerial Views and Landmarks | I can recognise landmarks in aerial views and plans. |
| 11 | Symbols and Map Keys | I can read and choose symbols for a map key. |
| 12 | Making a Simple Map | I can plan a simple map with landmarks and a key. |
| 13 | Observing Our School Grounds | I can plan observations and a map of familiar grounds. |
| 14 | Exploring Our Local Area | I can plan a local walk and describe observed features. |

Future dataset: `src/data/year2GeographyCurriculum.js`.
Future topic banks: `src/data/challenges/geography/year2/`.
Future wrappers: `src/pages/skills/geography/challenges/year2/<topic-id>/<Pascal>Challenge1–4.jsx`.
Follow shared spec §§7–8 for registry, stable IDs, certificates, assets and
verification. Keep the future Geography entry outside the overall year award
using the existing `countsTowardYear: false` mechanism. Release each complete
topic in the listed order; preserve all prior subject/year progress.

## 7. Implementation tracker

**Checkpoint:** 2026-10-13 — spec and crosswalk drafted; no feature work started.
**Totals:** 0/14 topics built; 0/56 challenges built or verified.
**First future pilot:** Continents and Oceans Together. Start only after a request to implement.
**Resume:** read the shared spec, this tracker and the source mapping before
editing. Build in category/topic order and release all four slots together.

In the table, **— means not started**. Record C1–C4 independently as Built
then Verified; use the evidence column for check results, review notes and
release state. A drafted brief does not mean a built challenge.

| # | Topic | Brief | C1 | C2 | C3 | C4 | Verification / release evidence |
|---|---|---|---|---|---|---|---|
| 1 | Continents and Oceans Together | Drafted | — | — | — | — | Pending |
| 2 | UK Places and Landscapes | Drafted | — | — | — | — | Pending |
| 3 | Compass Directions and Routes | Drafted | — | — | — | — | Pending |
| 4 | Weather Records | Drafted | — | — | — | — | Pending |
| 5 | The Equator and the Poles | Drafted | — | — | — | — | Pending |
| 6 | Whitby by the Sea | Drafted | — | — | — | — | Pending |
| 7 | Kampong Ayer by the River | Drafted | — | — | — | — | Pending |
| 8 | Homes and Journeys in Two Places | Drafted | — | — | — | — | Pending |
| 9 | Comparing Two Small Places | Drafted | — | — | — | — | Pending |
| 10 | Aerial Views and Landmarks | Drafted | — | — | — | — | Pending |
| 11 | Symbols and Map Keys | Drafted | — | — | — | — | Pending |
| 12 | Making a Simple Map | Drafted | — | — | — | — | Pending |
| 13 | Observing Our School Grounds | Drafted | — | — | — | — | Pending |
| 14 | Exploring Our Local Area | Drafted | — | — | — | — | Pending |

| Milestone | Status | Required evidence |
|---|---|---|
| Spec and statutory crosswalk | Drafted | Year allocation, topic boundaries and four-slot briefs present |
| Shared engine and asset foundation | Not started | Shared spec tracker complete enough for the pilot |
| Dataset, registry and certificate outcomes | Not started | 14 topics / 56 slots, locked IDs and certificate coverage |
| First topic pilot | Not started | All four runs, notes, hints, map access, reload/replay and both themes |
| Remaining topics | Not started | Per-topic C1–C4 rows built and verified in order |
| Lint, full tests and build | Not started | All three required commands pass for the implementation |
| Browser and progress regression | Not started | Desktop/phone, both themes, other subjects/years and profile switching |
| Physical-device voice and touch | Not started | Phone/tablet review, distinct from simulated viewports |
| Subject release | Not started | Verified topics, docs updated and remaining coverage limits recorded |

### Log

- **2026-10-13:** Drafted the spec, four challenge briefs per topic,
  outcome lines and statutory mapping. Implementation is intentionally
  unstarted under the owner’s specs-only request.
