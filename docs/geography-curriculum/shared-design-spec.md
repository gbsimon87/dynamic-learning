# Geography — shared design spec

**Status:** shared foundation implemented for Years 3 and 4, 2026-10-13.
Years 3 and 4: 16 topics / 64 slots each. Years 1 and 2 remain specifications.
**Year specs and trackers:** [Year 1](year-1-design-spec.md),
[Year 2](year-2-design-spec.md), [Year 3](year-3-design-spec.md),
[Year 4](year-4-design-spec.md).
**Sources:** [KS1 programme](../curriculum/key-stage-1-geography.md),
[KS2 programme](../curriculum/key-stage-2-geography.md).

## 1. Intended outcome and scope

Four Curriculum Mode Geography paths, each using the existing
category → topic → four challenges model. A child learns where places are,
what they are like, how physical and human features connect, and how to use
geographical evidence. Every topic has an observable learning outcome and four
challenge briefs in its year spec.

The initial delivery wrote documentation only. The subsequent owner request
authorised Year 3 implementation on the existing challenge kit, progress system,
rewards and certificates. Year 3 IDs are now permanent; other years remain draft.
The build adds bundled sources and wrappers, with no new dependencies, stored
progress fields, account model or feature flags.

## 2. Curriculum allocation

The source mapping sections are the authoritative topic-to-requirement crosswalk.
Requirement codes below are app reference labels, not DfE numbering. They point
to existing verbatim bullets; descriptive tables are our planning commentary.

### KS1 requirement codes

| Code | Bullet identified by heading and opening words |
|---|---|
| K1-L1 | Locational knowledge: name and locate the world's seven continents and five oceans |
| K1-L2 | Locational knowledge: name, locate and identify characteristics of the four countries and capital cities of the United Kingdom and its surrounding seas |
| K1-P1 | Place knowledge: understand geographical similarities and differences through studying … a small area of the United Kingdom … a contrasting non-European country |
| K1-H1 | Human and physical geography: identify seasonal and daily weather patterns … hot and cold areas … Equator … North and South Poles |
| K1-H2p | Human and physical geography, vocabulary: key physical features |
| K1-H2h | Human and physical geography, vocabulary: key human features |
| K1-S1 | Skills and fieldwork: use world maps, atlases and globes |
| K1-S2 | Skills and fieldwork: use simple compass directions … and locational and directional language |
| K1-S3 | Skills and fieldwork: use aerial photographs and plan perspectives … devise a simple map … symbols in a key |
| K1-S4 | Skills and fieldwork: use simple fieldwork and observational skills … school … surrounding environment |

### KS2 requirement codes

| Code | Bullet identified by heading and opening words |
|---|---|
| K2-L1 | Locational knowledge: locate the world's countries … Europe (including the location of Russia) and North and South America |
| K2-L2 | Locational knowledge: name and locate counties and cities … regions … topographical features … land-use patterns … changed over time |
| K2-L3 | Locational knowledge: identify the position and significance of latitude, longitude … hemispheres … tropics … circles … Meridian and time zones |
| K2-P1 | Place knowledge: understand geographical similarities and differences … a region of the United Kingdom … a European country … North or South America |
| K2-Hp | Human and physical geography: physical geography … climate zones, biomes and vegetation belts, rivers, mountains, volcanoes and earthquakes, and the water cycle |
| K2-Hh | Human and physical geography: human geography … settlement and land use … trade links … natural resources |
| K2-S1 | Skills and fieldwork: use maps, atlases, globes and digital/computer mapping |
| K2-S2 | Skills and fieldwork: eight points of a compass, four and six-figure grid references, symbols and key (including … Ordnance Survey maps) |
| K2-S3 | Skills and fieldwork: use fieldwork to observe, measure, record and present … sketch maps, plans and graphs, and digital technologies |

### Deliberate year split

| Strand | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---|---|---|---|
| Location | UK countries, capitals and seas; continents and oceans | Consolidate using connected maps, routes and UK landscapes | UK counties/cities/regions; Europe including Russia; globe reference lines | North and South America; consolidate globe lines through climate and time zones |
| Place | School/locality; vocabulary for describing places | Whitby harbour area and a bounded area of Kampong Ayer, Brunei | Lake District region and Campania region, Italy | Washington State, USA; compare all three KS2 regions |
| Physical | Features, daily/seasonal weather, hot/cold world areas | Weather records and explanations supported by place evidence | Mountains, volcanoes, earthquakes, water cycle | Climate, biomes, vegetation belts, rivers and landscape change |
| Human | Familiar buildings, settlements and uses | Homes, travel and work in the two small areas | Land use, farming, tourism and settlements in named regions | Settlement patterns, food/trade, energy/minerals/water and linked decisions |
| Skills | Aerial/plan views, four directions, simple maps/keys and observation | Construct maps/keys; local observation and weather records | Eight directions, four-figure references, OS symbols and land-use survey | Six-figure references, digital layers, measure/record/present an enquiry |

KS1 coverage is planned across both years, including every listed vocabulary
item. KS2 coverage is introductory across these two years, rather than a claim
that a Year 4 child has completed the Years 3–6 programme. Years 5–6 must revisit
and deepen environmental regions/cities across Europe and the Americas,
coordinate precision, grid-reference fluency, time-zone reasoning, connected
physical processes, resource distribution and trade, and independent fieldwork
with digital presentation. Those follow-on years are not yet specified.

Real first-hand observation, measuring outside, drawing an original map and
communicating an extended explanation cannot be certified by short digital
questions. Those coverage limits remain even if all 232 challenge files ship.

## 3. Learning and challenge design

Each challenge starts with a short **Bix's field notes** card: one geographical
idea, a map/photo/diagram or data source, taught vocabulary and narration on
request. It then runs a small question bank. The child can reopen the notes
without losing their current answer or round. Sources needed to answer a round
remain visible beside that round; a memory task must never masquerade as map
reading.

| Slot | Purpose | Typical response |
|---|---|---|
| 1 — Explore | Meet the place, feature or idea with explicit support | Picture/label choice, simple sort |
| 2 — Locate and read | Locate it or read the relevant map, diagram or record | Choice using map markers, order a route/process, read a chart |
| 3 — Use evidence | Apply a geographical skill to visible evidence | Classify features, read a key/grid, select a supported statement |
| 4 — Connect and explain | Compare, explain a relationship or plan an enquiry | Choose a reason, compare two sources, order an enquiry |

The year specs give the actual four tasks per topic; the slot labels do not
force an artificial map question into a weather/process topic. Four slots
represent increasing support-to-application, not arbitrary difficulty or speed.

| Setting | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---:|---:|---:|---:|
| Notes card maximum words | 30 | 45 | 60 | 70 |
| Maximum sentence words | 10 | 12 | 16 | 18 |
| Rounds per run | 4 | 5 | 5 | 5 |
| Minimum templates per slot | 6 | 7 | 7 | 7 |
| Choice options | 2–3 | 3 | 3 | 3 |
| Cards per sort/order round | 2–3 | 3–4 | 3–5 | 3–5 |

Labels/legends are separate from the prose word limit, but must fit the screen
and be narrated where needed. A minimum bank means distinct questions or
evidence uses, not six paraphrases of one question. Randomise without replacing
questions during a run; map geometry, references and answer keys remain paired.
Every answer cites the exact supporting source feature, label, record or taught
statement in authoring data. A reasoning round can derive an answer from two
explicit facts; it must record that derivation for review.

The existing `DataChallenge` supplies `choice`, `sort`, `order`, `chart` and
tile `build` controls. `renderVisual` is currently **read-only**. The initial
design therefore uses labelled markers A/B/C and normal answer buttons for map
questions. Children choose a location from the map rather than requiring a
precision tap on a small country. Map/key construction uses supported choices,
sorts and ordered instructions; unrestricted map drawing is a grown-up activity.
Direct interactive map construction would require a separately scoped control.

The Year 4 digital-mapping topic also needs a small bundled map explorer with
touch/keyboard controls for overview/detail extents and a pinned thematic layer.
That explorer sits in the Geography wrapper alongside the read-only question
visual; its controls do not replace the answer buttons or write progress. Give
each view a source, extent, legend and accessible equivalent. Reading screenshots
alone does not demonstrate using digital mapping; if the explorer is deferred,
record that part of K2-S1 as pending rather than claiming it is covered.

There is no timer, distance leaderboard or speed score. A wrong answer keeps
the round open; two misses reveal a useful hint under the existing kit rules.
Finishing the run invokes the current `onComplete` contract once; replay follows
existing completion and reward rules.

## 4. Maps, images and geographical accuracy

- Every real map has its extent, orientation and source recorded. Display a
  north arrow where direction is tested; rotated maps explicitly show it.
  Put a readable key on the same screen. Simplified teaching maps say so.
- Country, continent and ocean questions use checked boundaries and label
  positions, not emoji silhouettes. For a tiny region, use an inset or an
  enlarged labelled marker. Never grade distance from a child's fingertip.
- Use the seven-continent model: Africa, Antarctica, Asia, Europe, North
  America, South America, Australia. Explain that some atlases use Oceania for
  the wider region. The five oceans are Pacific, Atlantic, Indian, Arctic and
  Southern. Use a checked curriculum continent list: the existing Skills Mode
  `MapGame` uses an Oceania country grouping and excludes Antarctica from its
  targets. Reusing that target list would omit a statutory continent. Explain
  the different grouping labels when reusing geometry; include Antarctica in
  curriculum content without changing the standalone game's behaviour here.
- Distinguish the UK, Great Britain and England. Northern Ireland belongs to
  the UK; the Republic of Ireland does not. Capital labels are London,
  Edinburgh, Cardiff and Belfast. The surrounding waters taught are the North
  Sea, Irish Sea, English Channel and Atlantic Ocean; say that the last is an
  ocean. A map also shows other coastlines correctly.
- Russia spans Europe and Asia. North America includes more than the USA;
  South America is a continent, not a country. Washington State is different
  from Washington, DC. Country maps avoid disputed-boundary quiz questions.
- Aerial photographs, plans and oblique photographs are distinguished.
  A plan is a view from above, not any picture showing several buildings.
- Use administrative labels/dates carefully: UK county systems differ. Name
  the convention used for each map and never mix ceremonial, historic and
  current administrative boundaries as if they were one system.
- Hot/cold near the Equator/poles is a broad pattern, not a universal rule.
  Climate is a long-term pattern; one wet day does not identify a climate.
  Earth's tilt explains seasons; rotation explains day/night. Clouds consist
  of droplets or ice, rather than visible gaseous water vapour.
- Mountains need not be volcanoes. Rivers flow downhill, not always south.
  A settlement, coast or managed woodland can involve both human and physical
  geography; give the particular feature/context when a sort needs one answer.
- World reference lines are imaginary. Four-figure references name squares;
  six-figure references specify a position within a square at greater precision.
  Read eastings, then northings. OS National Grid references are not latitude
  and longitude. Grid visuals and keyed answers must be generated together.
- Time-zone tasks use dated, explicit UTC offsets. Greenwich Meridian, UTC,
  GMT and British Summer Time are distinguished in author notes; do not assert
  that Britain uses GMT all year. Political time-zone borders need not follow
  longitude lines. No live clock or daylight-saving lookup is required.

### Assets and sources

Prefer original SVG diagrams with paired theme tokens. For photographs/aerial
views use CC0, public domain or explicitly compatible OGL material, with a
per-asset record: title, place, creator, source URL, licence URL, date,
retrieved date, checksum and child-friendly alt text. A publicly accessible
photo is not automatically reusable. Source facts and asset permissions are
separate checks. Any alternative licence must be documented before asset use.

An OS exercise must include a genuinely licensed OS extract and its actual key,
alongside simplified practice grids; otherwise the OS part of K2-S2 remains a
gap. Verify the chosen OS product's reuse terms before pinning an extract.
Do not assume existing country GeoJSON or map tiles have suitable rights.
Record their provenance if reused. Downloaded images are bundled, optimised,
credited on `/credits`, and inspected against every question they support.
No child-facing third-party image fetch, live map-tile dependency or precise
geolocation is required for these paths.

Named study choices are proposed defaults. They require a bounded study map,
photographs of everyday life, physical/human features, and balanced captions:

| Study | Extent and role | Starting primary reference |
|---|---|---|
| Whitby | Harbour and adjoining town-centre streets; KS1 UK small area | [North Yorkshire Council: Whitby Harbour](https://www.northyorks.gov.uk/roads-parking-and-travel/ports-and-harbours/roads-parking-and-travel/ports-and-harbours/whitby-harbour) |
| Kampong Ayer | Kampong Peramu neighbourhood and nearby river/walkways, located within Kampong Ayer and Brunei; KS1 contrasting small area | [Brunei Tourism: Kampong Ayer](https://www.bruneitourism.com/places/kampong-ayer/), [official neighbourhood trail](https://www.bruneitourism.com/wp-content/uploads/2025/03/Kg-Ayer-Walking-Trail_compressed_2.pdf) |
| Lake District | National Park boundary, England; KS2 UK region | [National Park Authority: facts and figures](https://lakedistrict.gov.uk/authority/contact-us/media-centre/facts-and-figures/) |
| Campania | Administrative region of Italy, with Naples and Vesuvius as case locations; KS2 European region | [UNESCO: Naples](https://whc.unesco.org/en/list/726/), [INGV: Campania volcanoes](https://www.ingv.it/en/monitoraggio-e-infrastrutture/sorveglianza/servizio-sorveglianza-vulcani-attivi/la-sorveglianza-dei-vulcani-attivi-della-campania) |
| Washington State | USA state boundary; coastal lowlands, Cascades and inland examples; KS2 North American region | [Washington State Parks: cross-state landscapes](https://parks.wa.gov/about/news-center/field-guide-blog/palouse-cascades-state-park-trail-history) |

Starting references checked on 2026-10-13 establish the choice of study, not a
finished question bank or an asset licence. At implementation, source every
additional fact, verify map bounds, and date all weather, land-use and trade
records. Practice records say **example data**; real observations state when
and where they were collected. Avoid changing population totals and rankings.
The Met Office, OS, BGS, USGS, national park/local authorities and relevant
national statistical/geographical agencies are appropriate primary references.

Show similarities as well as contrasts: people learn, work, travel and live
in varied homes in both places. Kampong Ayer does not represent all homes in
Brunei, and one view of Washington does not represent all American landscapes.
Avoid costume/food stereotypes or presenting places as exotic or inferior.
Natural hazards use calm diagrams, no disaster imagery or injury stories.

## 5. Fieldwork and privacy

Each fieldwork topic includes an optional grown-up activity card available at
the end and on replay: enquiry question, materials, steps, a paper recording
template and a prompt to describe findings. It never gates digital completion.
Suitable alternatives cover home learning, children without school grounds,
limited mobility, and observing through a window with a grown-up.

KS1: observe familiar grounds, note human/physical features, sketch a map/key,
and keep a short weather record. KS2: ask a local question, choose a consistent
sampling method, observe/measure, record with a tally/table and sketch map,
and present a graph or a grown-up-created digital chart. Year 4 adds comparing
sites and acknowledging a small sample. Display that digital practice prepares
for fieldwork; the app does not mark the outdoor task as done.

Use a grown-up's chosen familiar place; never ask a child for their address,
school name, GPS location, photograph, upload or lone trip. Activities involving
roads or water are observation from an appropriate place with a grown-up.
Recordings stay on paper or the grown-up's device; no new learner storage field.

## 6. Accessibility and presentation acceptance criteria

- Both light and dark themes use `--light-*` / `--dark-*` tokens, including
  map labels, boundaries, legends, data series and focus states.
- Controls have at least 44 × 44 CSS-pixel touch targets, clear spacing and
  visible keyboard focus. Answer controls fit 320 px phone width without
  page-wide horizontal overflow. A deliberately pannable map also has an
  equivalent full answer view that does not require panning.
- All rounds work with tap and keyboard. Drag interactions use the existing
  keyboard controls or tap alternatives. No hover-only label or colour-only
  correct answer; pair colour with names, patterns or letters.
- Narration is available for notes, instructions, labels and choices, on
  request, never autoplay. Use British English; speech for NE says
  "north-east", not individual letters unless appropriate.
- Give a screen-reader equivalent for every map/diagram/data question that
  preserves the same reasoning: relative positions, features and data are
  described consistently, without injecting an extra explicit answer key.
- Focus moves into rounds after starting and returns sensibly after notes
  close. Reduced-motion settings apply to any globe/process animation.
- Missing images show an informative fallback and retry. A round whose answer
  requires an unavailable visual must not continue as an unanswerable quiz.

## 7. Proposed implementation shape

Years 2–4 now use this shape; Year 1 remains a future file location:

```text
src/data/year<N>GeographyCurriculum.js
src/data/year<N>GeographyCertificateSkills.js
src/data/challenges/geography/year<N>/<topic>.js
src/data/challenges/geography/year<N>/index.js
src/data/challenges/geography/engine.js
src/components/challenge/geography/GeographyChallenge.jsx
src/components/challenge/geography/FieldNotesCard.jsx
src/components/challenge/geography/GeographyVisual.jsx
src/assets/geography/manifest.json
src/assets/geography/images/
src/pages/skills/geography/challenges/year<N>/<topic-id>/<Pascal>Challenge1–4.jsx
```

Use a geography-specific notes wrapper and visual switch over `DataChallenge`.
Reuse existing generic primitives when they fit; do not import a History
component merely to change its heading. Memoise the built notes/questions once
per run and give `DataChallenge` a stable builder for those questions. Notes
reopening must not regenerate the bank. Keep response and progress writes in
the existing shell/`ProblemView` flow.

Geography already exists in `CURRICULUM_SUBJECTS` and `CHILD_SUBJECTS`; no new
subject enum or signup validation change is needed. Years 2–4 now have Geography `CURRICULA` entries; Year 1 remains unavailable. Add each future dataset explicitly; register
with `countsTowardYear: false` so existing year certificates remain available.
Whether Geography should count toward a completed year's award is a separate
future product decision; this spec does not make it. Subject/topic certificates
use the existing flow and the year specs' outcome lines.

Progress remains the existing numeric-completion tree in the per-child
`(childId, year, "geography")` document, with the current local/API store drivers.
Do not introduce passport/attempt/fieldwork state. The progress skill contains
historical browser-only wording; its current data contract and the project
knowledge describe the present store. Read it again before implementation.
No progress shape, document-key or unlock-rule change is needed.

Lock category/topic IDs before the first release, using `toKebabCase()` on the
exact titles in the year spec. Wrappers follow the current loader convention.
Release complete topics in spec order, all four real wrappers together, after
the year dataset is registered. Missing topics retain the existing unavailable
state; no fake completion wrappers. A child need not complete another year to
open a registered Geography year.

## 8. Verification and definition of done for a future build

Automated checks must cover dataset counts/four slots/stable IDs, registry and
certificate coverage, wrapper paths, question validity, source/asset references,
notes limits, supported answers and non-ambiguous distractors. Pure map/grid
tests must verify marker positions, eastings-before-northings and labelled
answer coordinates; process orderings must avoid implying one unique starting
point for a cycle. Use deterministic seeds to check varied banks. Reuse
`lintBuild` and the existing question validators; add only meaningful Geography
checks.

Run `npm run lint`, `npm test` and `npm run build`. Load the UI when browser
tools are available: pilot first, then all slots through actual controls, both
themes and phone/desktop sizes. Check wrong answers, hints, read-aloud,
notes reopening, map/alt equivalents, image failure, completion, next-topic
unlock, reload and replay. Check prior progress and awards in other subjects
and years, plus child/year switching, without clearing real learner data.

Record exact automated results, browser scope and outstanding physical-device
voice/touch checks in each year's tracker. If browser tools are unavailable,
say so and leave visual verification pending. A built file alone is not a
verified topic; classroom fieldwork is never inferred from challenge completion.

## 9. Shared implementation tracker

**Checkpoint:** 2026-10-13 — shared foundation and Years 2–4 implemented:
3 datasets, 46 topic banks and 184 Geography curriculum challenges.
**Next action:** Year 2 browser review and physical-device review for Years 2–4.
Year 1 remains future work. See the [Year 3](YEAR3_SOURCE_PACK.md) and [Year 4](YEAR4_SOURCE_PACK.md) source packs.

| Work package | Status | Completion evidence required |
|---|---|---|
| Shared/year specs and statutory crosswalks | Drafted | All 58 topics mapped; year split and limits documented |
| Shared notes/visual wrapper and source data contract | Verified for Year 3 | 64 runs; notes state, sources, hints and validators pass |
| Map/globe/grid/diagram primitives | Verified for Year 3 | Pure geometry tests, 52 layout checks; genuine OS map/key and equivalents |
| Named place evidence packs and licensed assets | Year 3 ready | Lake District/Campania sources and credits; other study packs pending |
| Fieldwork cards and paper recording templates | Year 3 ready | Optional land-use survey, paper prompts and accessible alternative |
| Year registration/certificate wiring | Year 3 ready | One dataset; 16 outcomes; excluded from overall year awards |
| Regression and physical-device checks | Browser passed; devices pending | Existing progress/awards and switching preserved; real devices still needed |

The year specs track each topic's C1–C4 implementation and verification
separately. Update the shared row when its common foundation is ready, and
each year row after every topic or pause. **Drafted**, **built**, **verified**
and **released** are different statuses. No release or deployment is requested.

Year 2 adds age limits (45-word notes, 12-word sentences), KS1 plans and a
four-direction compass with explicit rotated north arrow. Four bundled licensed
photographs show the two small-area studies and a genuine aerial view. Its
fieldwork/map/weather activities reuse read-only enrichment and write no new
progress data. Year 2 component playthroughs and pure checks pass; browser
verification is pending because tools were unavailable. See its source pack
and year tracker for the exact scope.
