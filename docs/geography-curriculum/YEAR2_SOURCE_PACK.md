# Year 2 Geography — evidence and asset decisions

Implementation authorised 2026-10-13. The 14 topic titles and five category
titles in the Year 2 spec are the permanent identifiers for this release.

## Asset licence decision (before bundling)

Prefer CC0 photographs of Whitby harbour and Kampong Peramu by Poliphilo and
Mx. Granger. For the genuine aerial photograph, use Chris's **Whitby Abbey:
aerial 2018**, Geograph 5913593, under **CC BY-SA 2.0**. This is the documented
alternative licence permitted by shared spec §4: preserve attribution and the
licence link in the manifest, photograph caption and credits; label conversion
to WebP; distribute the converted photograph under the same licence. It is
a photograph from an aircraft, looking obliquely down, rather than a vertical
plan. It shows the nearby church, abbey and sea; the abbey is an
adjacent landmark, not an expansion of the small-area study to all Whitby.

All files are bundled: no third-party fetch is needed while a child plays.
The manifest records per-file SHA-256, date, creator, source and alt text.

## Boundaries and evidence rules

Whitby: harbour and adjoining town-centre streets, England, UK. Reference:
[North Yorkshire Council harbour page](https://www.northyorks.gov.uk/roads-parking-and-travel/ports-and-harbours/roads-parking-and-travel/ports-and-harbours/whitby-harbour).
Kampong Peramu: neighbourhood and nearby river/walkways within Kampong Ayer,
Brunei, Asia. Reference: [Brunei Tourism trail, page 1](https://www.bruneitourism.com/wp-content/uploads/2025/03/Kg-Ayer-Walking-Trail_compressed_2.pdf).
Simplified local plans teach connections, not measured distances or exact
building outlines. Relative route exercises on practice maps are explicitly
fictional; they do not give visitors navigation instructions.

World/UK outlines reuse the recorded Natural Earth public-domain geometry.
Use seven continents (Australia, with a note about the wider Oceania grouping)
and five oceans. UK includes Northern Ireland, not the Republic of Ireland.
Weather facts use Met Office primary school resources. Example weather logs
and paired day records are invented teaching data, explicitly labelled, never
presented as measured weather or evidence of a whole country's climate.

Each authored template records source IDs and its exact visible supporting
evidence. Position tasks derive descriptions and drawings from the same data.
Read-aloud is optional; text equivalents preserve the geographical reasoning.
Fieldwork cards record no location, upload or completion; paper records stay
with the grown-up. A completed digital topic does not certify fieldwork.

## Verification

All 14 topic banks / 56 wrappers are built with 403 distinct templates, at
least seven per slot. `lintGeographyTopic` applies Year 2's 45-word notes and
12-word sentence limits; `lintBuild` exercises 60 seeds per slot. Independent
checks cover compass vectors and rotated orientation, route endpoints, weather
pictogram/tally counts, observation comparisons, wrapper IDs, outcomes, asset
hashes, unlock/reload/replay rules and local-store document isolation.

All 56 five-round runs completed in jsdom component tests, with retries,
hints, notes reopening, focus and once-only completion payloads. Additional
checks cover narration on request, four directions without KS2 grid labels,
image failure/retry and per-photo credits. Ordering control is mocked because
jsdom has no drag geometry. Light/dark theme classes are exercised; real
colour/layout verification is not inferred from jsdom.

`npm run lint`, `npm test` and `npm run build` passed: 1,772 unit and 323
component tests passed, with four database-dependent tests skipped. The
localhost API security test required sandbox escalation to bind its listener.
Vite's existing large-chunk warning remains. No deployment.

Browser controls are unavailable in this session; browser visual review and
physical-device voice/touch remain pending. All four source photographs were
inspected from local files against the captions and question evidence. The
Whitby ground view is at low tide and does not show boats; its uploader date
is 2013-01-29 but its camera EXIF date differs. No dated weather claim is made
from it. The aerial is an oblique aircraft view of nearby landmarks and sea,
not a vertical photograph or a harbour-wide view.

| Topics | Supporting references and evidence |
|---|---|
| Continents/oceans, UK location | Natural Earth public-domain atlas, DfE seven-continent/five-ocean requirement |
| UK landscapes | Labelled atlas markers, Council Whitby source, National Park Scafell Pike source; invented country feature-caption examples clearly identified |
| Compass/routes, keys, map construction | Original labelled practice plans/keys; paired positions and directions computed from the same feature/path data |
| Weather, Equator/poles | Met Office school resources; explicitly invented day logs, independent symbol/tally recounts |
| Whitby | Council harbour source, CC0 low-tide photograph and CC BY-SA aerial of adjacent landmarks |
| Kampong Peramu | Official Brunei Tourism trail page 1; CC0 home and prayer-hall photographs, captioned everyday building uses |
| Homes/journeys, two-place comparison | Paired small-area plans/photos, official walkway/boat information, invented dated weather examples; similarities and differences with limits |
| Aerial views | Genuine ground and aerial photographs of St Mary's Church; schematic landmark plan, Peramu ground/plan pairing and practice school plan |
| Grounds/local fieldwork | Original labelled example observation sheets, counts, routes, consistent categories; optional paper activities and window/home alternatives |

Year 2-specific lint, 24 unit tests and 20 component tests pass. The full
checks above describe the Year 2 checkpoint; concurrent work outside this task
affected repository-wide lint at that handoff. The owner instructed us to leave
that work alone and finish Year 2. Browser/device review remains pending.

## Bug/security review checkpoint — 2026-10-13

See [full review](YEAR2_BUG_SECURITY_REVIEW.md). Map key descriptions now name
shapes, tally options have spoken counts, positional questions specify direct
alignment, and the photographic arrangement sketch has no unsupported north
arrow. Year 2 also has safe invalid-ID/slot handling and run-reset/cancellation
checks. The topic IDs, 403-template count and stored progress are unchanged.

Latest verification: repository-wide lint, full tests (1,785 unit / 349
component, four DB tests skipped) and build pass; 29 unit / 32 component tests
focus on Year 2. Production npm audit reports zero known vulnerabilities.
Browser and device checks remain pending; jsdom ordering uses a mock control.
