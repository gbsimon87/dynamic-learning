# Year 1 Geography — source pack

Checked 2026-10-13. Source ids live in
[`year1/sources.js`](../../src/data/challenges/geography/year1/sources.js).

| Topic | Evidence | Sources |
|---|---|---|
| Around Our School, Human and Physical Features, Maps from Above, Routes and Simple Maps | Original practice drawings (not a real school); example layouts are generated together with their answers | Learn with Bix drawings; DfE KS1 programme; OS MapZone; National Geographic "map" |
| Four Countries of the UK | Natural Earth map units (England, Scotland, Wales, Northern Ireland; Republic of Ireland drawn separately) | ONS UK geographies; Natural Earth; Lake District NPA (fells); VisitScotland (islands); Cadw (castles); National Trust (Giant's Causeway) |
| UK Capital Cities | Capital positions; one captioned landmark each | london.gov.uk; Scottish Parliament; Senedd; NI Assembly; UK Parliament (Big Ben); Edinburgh Castle; Principality Stadium; Belfast City Hall |
| Seas Around the UK | North Sea, Irish Sea, English Channel, Atlantic Ocean | NOAA ocean vs sea; National Geographic "coast" |
| Seven Continents, Five Oceans | Seven-continent model; five oceans; Pacific shown at both map edges | National Geographic "continent"; NOAA oceans |
| Hot and Cold Places | Equator, poles, broad warm/cold pattern | National Geographic Equator/poles; Met Office climate zones |
| Daily Weather, Seasons in the UK | Example (not real) weather records; UK season patterns | Met Office types of weather, rain and seasons |

Maps: `src/assets/geography/year1-maps.json`, built by
`scripts/geography-assets/build-year1-assets.mjs` from Natural Earth v5.1.2
(public domain): 50m map units and 110m countries. Russia is split at 60°E so
it shows in Europe and Asia; Oceania islands other than Australia are drawn
neutral; French Guiana is not drawn as Europe. All teaching maps are simplified.
No photographs or third-party images are used in Year 1.
