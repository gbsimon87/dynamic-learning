# Year 3 Geography source pack

Implemented on 2026-10-13 following the owner's Year 3 build request.
The statutory mapping remains in `docs/curriculum/key-stage-2-geography.md`.
All 16 topic IDs follow the exact names in the Year 3 design spec and are now
permanent URL/progress identifiers.

## Authoring and evidence

The pure banks in `src/data/challenges/geography/year3/` contain 454 templates.
Each of the 64 slots draws five questions without replacement from at least
seven distinct templates. Notes have at most 60 words and sentences of at most
16 words. Every template keeps its evidence equivalent, supporting source IDs,
hint and answer together. Maps and evidence stay on the question page; reopening
notes preserves the current question and response.

`sources.js` records primary factual references. `manifest.json` records the
separate asset licences, dates, provenance, adaptations, alt text and SHA-256
checksums. Questions using hypothetical plans, dated land-use change or survey
counts identify them as example data. The practical survey remains optional and
untracked, with a paper recording prompt and a window-observation alternative.

## Map provenance

- Natural Earth **v5.1.2**, public domain: `ne_110m_admin_0_countries.geojson`
  for world overviews; `ne_10m_admin_0_countries.geojson` for regional country
  views; `ne_10m_admin_1_states_provinces.geojson` for Campania. The five
  provinces whose `region` is `Campania` are unioned into the regional outline.
  [Pinned upstream data](https://github.com/nvkelso/natural-earth-vector/tree/v5.1.2/geojson),
  [public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/).
- Lake District National Park: ONS geometry from
  [Planning Data entity 520011](https://www.planning.data.gov.uk/entity/520011).
  OGL v3; contains OS data © Crown copyright and database right 2026. Kendal is
  outside this boundary. Keswick and the studied lake/peak locations are inside.
- Source polygons are simplified for teaching and clipped to recorded extents.
  Maps preserve regional proportions with a local equirectangular projection.
  Region boundaries are dashed; neighbouring land and coastlines remain visible.
  Country/county markers locate selected examples rather than inventing county
  boundaries. County examples use the English ceremonial convention.
- Earthquake traces are original, approximate teaching lines checked against
  the USGS global setting map. They are labelled selected boundaries, not a
  complete plate atlas. Questions never require precise tracing or a tiny tap.

## Genuine OS extract and key

[OS 1:250 000 Scale Colour Raster](https://docs.os.uk/os-downloads/products/maps-and-imagery-portfolio/1-250-000-scale-colour-raster),
**June 2026**, downloaded through the public OS OpenData download API. Reuse
terms were checked against [OS OpenData guidance](https://www.ordnancesurvey.co.uk/products/product-support)
and [OGL v3](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

The bundled extract is from **NY.tif**, covering British National Grid
eastings **322000–330000** and northings **519000–527000**. The original tile is
4000 × 4000 pixels at 25 metres per pixel. Crop rectangle:
`(880, 2920, 1200, 3240)`, converted losslessly to WebP. The lesson adds a
labelled **1 km** grid; the original product's own coarse grid is not presented
as a four-figure practice grid. References identify squares within the stated
**NY** 100 km area. Interior markers avoid square boundaries.

The land and water keys are cropped from the **actual 2026 product legend**,
not invented symbols. The full original legend PDF is retained as
`src/assets/geography/os-legend-2026.pdf`. The extract and keys were visually
checked against the blue lake, green woodland, grey building areas and Keswick
label. All include the required OS attribution on screen and on `/credits`.

## Photographs and their licences

The shared spec prefers public-domain/OGL photographs. For these two source
views, documented alternatives were checked before bundling:

- [Sheep herding, Lake District](https://commons.wikimedia.org/wiki/File:Sheep_herding,_Lake_District.jpg),
  **Chrisdougpitt**, 18 July 2025, Gatesgarth Farm; **CC BY-SA 4.0**.
  Resized and converted to WebP; photographic content is unchanged. The image
  retains its attribution and share-alike licence. It shows sheep, farm buildings
  and mountain slopes, not every livelihood in the whole park.
- [Napoli-porto01](https://commons.wikimedia.org/wiki/File:Napoli-porto01.jpg),
  **Lance Mountain**, May 2006, Naples harbour; **CC BY 2.0**, confirmed by the
  Commons Flickr licence review. Resized and converted to WebP; content unchanged.
  Boats, waterfront buildings and the built hillside are visible. Neither this
  historical photograph nor an aerial roof alone proves every building's present use.

The licences apply to the credited assets. Their reuse does not change the
licence of the surrounding application code. No photographs or tiles are
fetched from third-party hosts during a learner's run.

## Matched climate records

NASA POWER monthly **MERRA-2** model data, **1991–2020**, requested at
**54.43°N, 2.96°W** (Ambleside area) and **40.85°N, 14.27°E** (Naples area).
Raw JSON responses and request URLs are retained in the asset source pack.
The returned model grid cells extend beyond the requested points; the lesson
explicitly treats them as two location examples, not whole-region averages.

January and July mean temperatures are averaged over 30 monthly values.
Mean precipitation in mm/day is multiplied by each month's day count before
averaging monthly totals. Displayed means are rounded to whole °C/mm:

| Location | January temperature / rain | July temperature / rain |
|---|---|---|
| Ambleside-area cell | 4°C / 123 mm | 15°C / 104 mm |
| Naples-area cell | 7°C / 76 mm | 25°C / 23 mm |

The pure tests independently recalculate these from the retained records.
Both records use the same period and measures. Sources:
[NASA POWER monthly methodology](https://power.larc.nasa.gov/docs/services/api/temporal/monthly/),
[NASA public-domain data statement](https://forum.earthdata.nasa.gov/viewtopic.php?t=82).

## Verification and limits

The Year 3 tracker records the final lint/test/build results and browser scope.
All 64 wrappers were played through actual controls in an isolated browser
context, with normal gating, numeric persisted completions, wrong-answer retry,
hints, notes reopening, reload and replay. Additional checks cover both themes
at 320/1280 px, source-image recovery, narration text and prior awards/progress.

Physical phone/tablet touch and audible voice review remains pending. The
browser speech checks inspect text and British language settings; they do not
claim device audio quality. Digital survey completion does not certify outdoor
fieldwork. Years 1, 2 and 4 Geography remain unimplemented; later KS2 breadth,
independent fieldwork and extended geographical explanations remain outside
this Year 3 digital path. No deployment is included in this build.
