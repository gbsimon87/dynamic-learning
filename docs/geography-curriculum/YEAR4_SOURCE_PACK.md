# Year 4 Geography source pack

Implemented on 2026-10-13 following the owner's Year 4 build request.
Topic IDs follow the exact names in the [Year 4 design spec](year-4-design-spec.md)
and are now permanent URL/progress identifiers.

## Authoring and evidence

The pure banks in `src/data/challenges/geography/year4/` contain 582 templates
(at least seven per slot, 16 topics). Notes have at most 70 words and sentences
at most 18 words; each run draws five questions without replacement. Every
template keeps its evidence, supporting source IDs, hint and answer together.
`lintGeographyTopic` applies the Year 4 limits (`GEOGRAPHY_AGES`). Sources are in
`year4/sources1.js`–`sources5.js` (prefixes `g1_`–`g5_`), merged with the Year 3
registry in `year4/index.js`. Agents recorded in their hand-backs the claims
they could not verify and left out; several secondary sources (Wikipedia,
Oak National Academy, Cascade PBS, HistoryLink, Pew) stand in where primary
pages were not fetchable. Swapping in primary sources is future work.
Hypothetical land-use grids, food journeys, resource maps, time-zone offsets
and fieldwork data are labelled **example data** (source id `example`).

## Maps and records

- Natural Earth **v5.1.2** (public domain): 50m countries for the
  `northAmerica` and `southAmerica` views, 10m admin-1 states for the
  `washington` view (Washington, Oregon, Idaho, Montana, British Columbia), and
  10m rivers/lake centerlines for the Thames, Severn and Trent (`uk`) and the
  Columbia (`washington`; the Snake arm was removed). Simplified with
  Douglas–Peucker. Rebuild with `node scripts/geography-assets/build-year4-assets.mjs`.
- Climate: NASA POWER climatology API v2.10.1, MERRA-2, January 2001–December
  2025, retrieved 2026-10-13, for 12 example places (`records/year4-climate-2001-2025.json`).
  Temperatures and rainfall (mm per day × days in month) are rounded model
  grid-cell values, location examples rather than whole-region averages.
- The OS six-figure rounds reuse the June 2026 OS 1:250 000 NY extract and
  keys bundled for Year 3 (see [Year 3 source pack](YEAR3_SOURCE_PACK.md)), with
  an added 1 km grid and a tenths overlay.
- No new photographs: all other drawings (rivers, day/night, land use, tables,
  explorer) are original SVG, so there is no new licence to record.

## Drawings added

`river` (features/processes/route, optional letters), `daynight`, `landuse`,
`table`, paired dated sources through `maps`, `explorer` (overview/detail plus one
thematic layer, buttons named "Map view: …" / "Map layer: …"), and `tenths` and
`window` options on `grid`. Tenths grids describe each marker's tenths
for screen readers (`geographyVisualDescription`).

## Known limits

- Tenths labels 1–9 appear on the first square only; the lines tell the child
  to count from the lower-left corner of the marker's square.
- Explorer layer markers must fit every view's extent (shared test rule).
- Years 3–4 together cover KS2 only at an introductory level; Years 5–6,
  independent measured fieldwork and live digital mapping remain future work.

## Review pass (2026-10-13)

A security and bug review covered the shared drawings and all 16 banks (three
independent content reviewers, plus recomputation of every data-driven answer).
Fixed: the on-screen Sources panel looked ids up in the Year 3 list only, so every
Year 4 source read "Source unavailable" (now `allSources.js`, with a test over all
questions); NASA model-cell heights were shown as true place heights (Quito 1,863 m
against about 2,850 m in reality) and are now labelled "data height"; a wrong-keyed
"furthest north" (Spokane is north of Seattle); a Port Angeles line wrongly placed
inside Olympic National Park; Madrid as a temperate-forest example and cacti in Egypt;
a March rainfall question with no March row; a day/night marker at 0° that made London
"west" of Greenwich; river labels contradicting the drawn lines; example-river
places that existed only in hidden alt text; hints and prompts that leaked answers;
and answer-position tells (wrong options full of always/never/only: 81 down to 44;
answer-is-longest 31% down to 25%, near chance). Day/night geometry and river
processes markers were realigned.

Remaining known limits: some wrong options still lean on hedging words; Wikipedia
stands in for a primary source for the continent definition; `g1_amazon` is
defined but not cited; no browser playthrough of every slot; physical-device review.
No security issues were found: all text renders through React, links require
HTTPS, images load only from bundled files, the asset script is dev-only, the
server accepts any year/subject for progress and no stored shape changed.
