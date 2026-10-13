# Year 4 Geography — design spec

**Status:** implemented 2026-10-13 after the owner requested the Year 4 build: 16 topics / 64 challenges. IDs are permanent. See the [Year 4 source pack](YEAR4_SOURCE_PACK.md).
**Implementation tracker:** embedded in §7; read it first when resuming.
**Shared spec:** [shared-design-spec.md](shared-design-spec.md).
**Statutory source and proposed mapping:** [key-stage-2-geography.md](../curriculum/key-stage-2-geography.md).

## 1. Goal

A Curriculum Mode path for children aged 8–9: **5 categories, 16 topics and 64 planned challenges**.

Complete the proposed lower-KS2 progression with the Americas, a third regional study, connected river/climate/resource ideas and more precise mapping. Children reason from evidence and state what it cannot show. Entry recaps earlier knowledge; Year 3 completion is not required.

Success means a child can meet the outcomes below using pictures, maps,
notes and read-aloud support, and apply them to visible evidence. Future
challenge completion uses the existing progress/reward flow. Practical
observations are encouraged separately and are not marked complete by the app.

## 2. Allocation and content boundaries

This is the app's proposed Year 4 allocation within KS2, not a statutory year-by-year programme.
Requirement codes identify bullets in the shared spec §2 and source mapping.
Names, order and study choices are draft design decisions, not owner-approved
identifiers. Once shipped, titles derive permanent IDs via `toKebabCase()`.

Every KS2 strand is represented at an introductory level across Years 3–4. These two paths cannot certify the full Years 3–6 programme. Years 5–6 still need wider country/environmental-region coverage, fluent coordinates/grid references, deeper time-zone and process reasoning, connected trade/resource studies and independent measured fieldwork with digital presentation. No global capital memorisation, political dispute quiz, real-time disaster/weather feed or complex time arithmetic.

## 3. Topics and four-challenge briefs

Categories and topics below are in proposed release order. Each C1–C4 cell
is a challenge brief, developed into its own notes card and question bank
under shared spec §3. Maps/evidence remain visible while answering.

### North and South America

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 1 | North American Countries and Cities | K2-L1, K2-S1 | Locate Canada, USA, Mexico and Cuba as a starting sample, with Ottawa, Washington DC, Mexico City and Havana. North America includes Central America and Caribbean countries; do not equate it with the USA. Read labelled environmental-region examples including mountains, plains and northern cold areas; not every country/capital is assessed. |
| 2 | South American Countries and Cities | K2-L1, K2-S1 | Locate Brazil, Peru, Chile and Argentina as a starting sample, with Brasilia, Lima, Santiago and Buenos Aires. Read Amazon Basin, Andes and grassland examples; environmental regions cross country borders. A continent can contain many climates and landscapes. |
| 3 | Washington State | K2-P1, K2-L1, K2-Hp, K2-Hh, K2-S1 | Study Washington State within the USA: Pacific coast/Puget Sound, Cascade Mountains and inland contrasting land uses. Seattle is a major city; Olympia is the state capital; Washington DC is elsewhere. Include homes, farming, ports and varied climates using regional evidence, without implying the whole state is rainforest. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 1 | Locate North America and name the study countries. | Read country and city markers in an atlas map. | Match sourced environmental examples to locations. | Choose a description distinguishing continent, country and city. |
| 2 | Locate South America and name the study countries. | Read country, city and physical-region markers. | Compare mapped Amazon/Andes/grassland examples. | Choose evidence against a one-landscape view of the continent. |
| 3 | Meet the bounded region and its people/landscapes. | Locate the state and its labelled physical/human features. | Compare evidence from coastal and inland locations. | Choose a supported landscape and land-use connection. |

### Climate and the Globe

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 4 | Climate Zones | K2-Hp, K2-L3, K2-S1 | Distinguish daily weather from long-term climate. Use a stated simplified scheme of tropical, dry, temperate and polar zones; mountain climate is discussed as an influence rather than forced into one universal zone scheme. Read supplied monthly summaries; patterns depend on latitude, altitude and other factors. |
| 5 | Biomes and Vegetation Belts | K2-Hp, K2-L1, K2-L3, K2-S1 | Introduce tropical rainforest, desert, grassland, temperate forest, boreal forest and tundra as broad examples. Vegetation belts show broad plant distributions connected to climate; boundaries vary by classification and land use. Locate studied examples; no animal-to-continent stereotypes or ecosystem food-chain assessment. |
| 6 | Day Night and Time Zones | K2-L3, K2-S1 | Earth rotates; the side facing the Sun has daytime. Identify the Prime/Greenwich Meridian and use supplied dated UTC offsets to explain different local times. Use whole-hour daytime examples without crossing midnight; no live-time fetch, daylight-saving calculations or claims that every time zone is an equal-width strip. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 4 | Distinguish weather observations from climate summaries. | Locate simplified zones using a labelled world map. | Compare equivalent monthly temperature/rainfall records. | Choose why latitude alone does not explain every place. |
| 5 | Match biome names to captioned vegetation examples. | Locate the examples on a sourced world map. | Compare climate records and their vegetation evidence. | Choose a relationship while recognising human land-use change. |
| 6 | Read sunlight and rotation on a globe diagram. | Locate the Greenwich Meridian and labelled time zones. | Compare simple local times using supplied UTC offsets. | Choose why local times differ and Britain can use BST. |

### Rivers and Changing Landscapes

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 7 | River Journeys | K2-Hp, K2-L2, K2-S1 | Source, tributary, confluence, channel and mouth; downhill movement linked to the water cycle. Introduce erosion, transport and deposition using a simple river diagram. Locate a UK river example and the Columbia in the Washington study; rivers need not flow south or end in the sea. |
| 8 | Rivers and People | K2-Hp, K2-Hh, K2-L2, K2-P1 | Water supply, transport, farming and energy alongside flooding as a possible challenge. Use calm local diagrams and evidenced regional examples, not disaster photos. Compare uses upstream/downstream; a river can connect settlements with different needs. |
| 9 | Changing UK Landscapes | K2-L2, K2-Hp, K2-Hh, K2-S1 | Use two dated maps or aerial views of the same bounded UK area at comparable scale to examine settlement, land use, coast or river change. Separate what changed from why: a map alone may not show cause. Include both human and physical changes across the bank. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 7 | Identify river features on a diagram. | Trace a shown route from source towards mouth. | Read examples of erosion, transport and deposition. | Choose how rivers and the water cycle connect. |
| 8 | Name evidenced uses of river water and land. | Read upstream/downstream uses on a mapped river. | Compare needs shown in a simple case-study record. | Choose a reasoned action using given benefits and limits. |
| 9 | Identify dates, keys and the same study extent. | Locate changed and unchanged features in paired sources. | Sort observations from possible explanations. | Choose a supported account and identify missing evidence. |

### Settlements and Resources

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 10 | Settlements and Land Use | K2-Hh, K2-L2, K2-P1, K2-S1 | Village, town and city as types of settlement, plus dispersed/nucleated/linear patterns where shown. Read residential, farming, industry, transport and recreation land uses in the three studied regions. Population cut-offs are not universal; settlement location can have several reasons. |
| 11 | Food and Trade Links | K2-Hh, K2-L1, K2-P1, K2-S1 | Trade as buying/selling; producer, consumer, import and export in explicit contexts. Trace a sourced or clearly labelled example food journey between countries and regions. Farming depends on physical conditions and decisions; do not infer all of a country's exports from one product or use current rankings. |
| 12 | Energy Minerals and Water | K2-Hh, K2-Hp, K2-L1, K2-S1 | Distribution and uses of natural resources: energy sources, minerals, food and water. Distinguish a resource from a product and renewable from finite examples, with trade-offs stated. Read sourced or labelled example resource maps; no claim that every place has equal access or that renewable energy has no impacts. |
| 13 | Comparing Three Regions | K2-P1, K2-Hp, K2-Hh, K2-S1 | Compare Lake District, Campania and Washington State through location, relief/water, equivalent climate summaries, settlements, land use and livelihoods. A complete comparison needs all three extents and human plus physical evidence. Different area sizes and within-region variation limit generalisation. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 10 | Identify settlement types and mapped patterns. | Read land-use evidence in regional maps. | Compare settlement locations with relief/water/route evidence. | Choose one supported reason without claiming it is the only reason. |
| 11 | Meet farming, producer, consumer and trade words. | Trace a supplied food journey on a labelled map. | Read transport and import/export from a stated viewpoint. | Choose how a change at one stage can affect another. |
| 12 | Match named resources to stated uses. | Read a map showing selected resource locations. | Compare availability and uses in a supplied record. | Choose a reason for resource movement or careful use. |
| 13 | Retrieve the three regions and their countries. | Read matching dimensions in a regional evidence table. | Select evidence for similarities and differences. | Choose a supported three-region comparison with a limit. |

### Mapping and Fieldwork Enquiries

| # | Topic | Requirement codes | Content boundary |
|---|---|---|---|
| 14 | Six Figure Grid References | K2-S2, K2-S1 | Recap four-figure squares, then subdivide a square into tenths to specify a six-figure position: three easting digits before three northing digits. Use unambiguous interior positions on practice grids and a licensed OS extract. State the main grid spacing; accuracy differs by map scale and observation. |
| 15 | Maps Atlases and Digital Mapping | K2-S1, K2-S2, K2-L1, K2-L2 | Choose map, atlas, globe or digital map for a purpose; read keys, eight directions, scale and layers. Use the bundled explorer to switch source-backed overview/detail extents and a thematic layer, with touch/keyboard controls and no live tiles. Simple whole-number distances use a stated scale bar; no Mercator area claims or assumption zoom changes the real size of a place. |
| 16 | Local Fieldwork Enquiry | K2-S3, K2-Hh, K2-L2, K2-S1 | Ask a local human/physical geography question; plan comparable observation sites and a simple measure such as path width or vegetation cover. Record in a table/tally and sketch map, then interpret a graph and proposed digital presentation. Practice data cannot prove real fieldwork; small samples and timings limit conclusions. |

| # | C1 — Explore | C2 — Locate and read | C3 — Use evidence | C4 — Connect and explain |
|---|---|---|---|---|
| 14 | Read a four-figure square and its OS key. | Locate tenths across then up within a square. | Choose a six-figure reference for an interior position. | Compare square-level and within-square precision. |
| 15 | Choose a map source for a stated purpose. | Read features, directions and a simple scale bar. | Switch overview/detail and thematic layers to read digital-map evidence. | Choose and use the source/layer that answers an enquiry. |
| 16 | Choose an observable enquiry and suitable measure. | Read consistent sampling sites and recording steps. | Interpret the practice map, table and graph together. | Choose a supported conclusion, limitation and next step. |

## 4. Learning settings and example rounds

Use the shared notes-first model: **≤70-word notes cards**, sentences of
**≤18 words**, **5 rounds per run**, and **at least 7 distinct templates per slot**.
Offer three choices with pictured or source support.
Notes, prompts, map labels and choices have narration on request. The run
contains no timed task, spelling test or reward for guessing quickly.

**Example, Six Figure Grid References C3:** grid lines are 1 km apart. A marked point is 0.3 km east of easting 23 and 0.6 km north of northing 41. Its reference is 233416; offer 233416, 416233 and 236413. Provide the square and tenth subdivisions visibly; no boundary-point ambiguity.

**Example, Day Night and Time Zones C3:** an explicitly labelled example gives location A UTC+0 and location B UTC+2 on the same stated date. If A is 10:00, choose 12:00 for B from 08:00/10:00/12:00. Offsets are supplied; do not imply these are London's year-round offsets.

Topic authors record the evidence and any reasoning for the keyed answer.
Choice/sort/order/chart/build controls follow the existing kit. A map marker
choice uses ordinary answer buttons; direct map-tapping is not assumed.

## 5. Fieldwork and source pack

With a grown-up, ask a question such as “How do paths and planted areas differ at two familiar sites?” Choose comparable observation areas and the same units/method, measure safe features, record a table and sketch map, and present a graph. A grown-up can help make a digital chart locally. Describe the sample limit and one useful repeat observation; use a window/tabletop-map alternative where outside access is limited.

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
| 1 | North American Countries and Cities | I can locate selected North American countries and cities. |
| 2 | South American Countries and Cities | I can locate selected South American countries and regions. |
| 3 | Washington State | I can describe a region within North America. |
| 4 | Climate Zones | I can describe broad climate patterns using evidence. |
| 5 | Biomes and Vegetation Belts | I can connect climate and vegetation in studied biomes. |
| 6 | Day Night and Time Zones | I can explain day and night and use given time-zone information. |
| 7 | River Journeys | I can describe a river journey and simple river processes. |
| 8 | Rivers and People | I can explain ways rivers connect people and places. |
| 9 | Changing UK Landscapes | I can use dated maps to describe landscape change. |
| 10 | Settlements and Land Use | I can describe settlement patterns and land use. |
| 11 | Food and Trade Links | I can trace a food journey and describe a trade link. |
| 12 | Energy Minerals and Water | I can describe resources and why their distribution matters. |
| 13 | Comparing Three Regions | I can compare UK, European and North American regions. |
| 14 | Six Figure Grid References | I can locate a position with a six-figure grid reference. |
| 15 | Maps Atlases and Digital Mapping | I can choose and interpret maps for a geographical question. |
| 16 | Local Fieldwork Enquiry | I can plan, interpret and present a local geographical enquiry. |

Future dataset: `src/data/year4GeographyCurriculum.js`.
Future topic banks: `src/data/challenges/geography/year4/`.
Future wrappers: `src/pages/skills/geography/challenges/year4/<topic-id>/<Pascal>Challenge1–4.jsx`.
Follow shared spec §§7–8 for registry, stable IDs, certificates, assets and
verification. Keep the future Geography entry outside the overall year award
using the existing `countsTowardYear: false` mechanism. Release each complete
topic in the listed order; preserve all prior subject/year progress.

## 7. Implementation tracker

**Checkpoint:** 2026-10-13 — all 16 topics built and verified locally.
**Totals:** 16/16 topics built; 64/64 challenges built; 582 templates.
**Remaining:** physical-device voice/touch review; an owner review of content and sources;
swap secondary sources for primary ones where noted in the source pack.
**Resume:** read the shared spec, the [source pack](YEAR4_SOURCE_PACK.md) and the
Year 3 tracker before changing banks. IDs and wrapper paths are locked by
`src/data/year4GeographyCurriculum.test.js`.

| # | Topic | C1 | C2 | C3 | C4 | Verification / release evidence |
|---|---|---|---|---|---|---|
| 1 | North American Countries and Cities | Verified | Verified | Verified | Verified | Lint, 60-seed runs, marker geometry, jsdom run |
| 2 | South American Countries and Cities | Verified | Verified | Verified | Verified | Same; climate answers computed from records |
| 3 | Washington State | Verified | Verified | Verified | Verified | Same; Seattle/Spokane contrasts asserted |
| 4 | Climate Zones | Verified | Verified | Verified | Verified | Same; zone/derived answers asserted |
| 5 | Biomes and Vegetation Belts | Verified | Verified | Verified | Verified | Same |
| 6 | Day Night and Time Zones | Verified | Verified | Verified | Verified | Same; offsets and day/night side asserted |
| 7 | River Journeys | Verified | Verified | Verified | Verified | Same; river directions asserted |
| 8 | Rivers and People | Verified | Verified | Verified | Verified | Same |
| 9 | Changing UK Landscapes | Verified | Verified | Verified | Verified | Same; counts recomputed |
| 10 | Settlements and Land Use | Verified | Verified | Verified | Verified | Same |
| 11 | Food and Trade Links | Verified | Verified | Verified | Verified | Same |
| 12 | Energy Minerals and Water | Verified | Verified | Verified | Verified | Same |
| 13 | Comparing Three Regions | Verified | Verified | Verified | Verified | Same |
| 14 | Six Figure Grid References | Verified | Verified | Verified | Verified | Same; references generated in code |
| 15 | Maps Atlases and Digital Mapping | Verified | Verified | Verified | Verified | Same; explorer controls tested |
| 16 | Local Fieldwork Enquiry | Verified | Verified | Verified | Verified | Same; optional grown-up card |

| Milestone | Status | Evidence |
|---|---|---|
| Spec and statutory crosswalk | Done | Crosswalk IDs match the dataset (tested) |
| Shared engine and asset foundation | Done | Year 4 limits, new drawings, maps and records |
| Dataset, registry and certificate outcomes | Done | 16 topics / 64 slots; excluded from year awards |
| Topic banks | Done | 582 templates; every slot ≥ 7 |
| Lint, full tests and build | Passed | lint clean; 1,748 unit (4 skipped) and 303 component tests; build passes |
| Browser check | Partial | New drawings (maps, rivers, day/night, tenths grids, explorer) inspected in a desktop browser, light and dark; all 64 runs played through real controls in jsdom only. A full in-app playthrough remains |
| Physical-device voice and touch | Not started | Phone/tablet review |

### Log

- **2026-10-13:** Drafted the spec and briefs.
- **2026-10-13:** Implemented Year 4 (owner request): shared drawings and maps,
  582 templates, registry, certificates, tests and credits.
