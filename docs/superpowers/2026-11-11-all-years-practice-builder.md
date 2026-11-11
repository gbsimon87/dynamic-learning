# Practice builder — Years 1–6 core subjects

## Agreed scope

The owner requested all remaining years, then narrowed the new scope to Maths,
English, Science and History. Extend the existing paper tool; do not register new
curriculum courses or change learner progress. Existing Year 3 Geography stays.

| Year | Maths | English | Science | History | Existing Geography | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 32 | 38 | 16 | 14 | — | 100 |
| 2 | 39 | 39 | 19 | 17 | — | 114 |
| 3 | 44 | 32 | 21 | 22 | 16 | 135 |
| 4 | 42 | 33 | 20 | 18 | — | 113 |
| 5 | 46 | 36 | 24 | 22 | — | 128 |
| 6 | 49 | 31 | 24 | 20 | — | 124 |
| Total | 252 | 209 | 124 | 113 | 16 | 714 |

579 additional topics; 25 year/subject collections in total. Computing, French,
Art & Design, Design & Technology, Music, PE and Relationships & Health are
outside this expansion. Geography in other years is also outside this scope.

## Implemented behaviour

- Year followed by Subject selectors, with year/subject-scoped topic search,
  briefings and print headings. All existing Year 3 links/worksheet keys remain
  compatible. Same-named topics in different years have separate transient keys.
- Up to three topics from different subjects in the same year. Cross-year topic
  combinations are rejected by the data API rather than mislabelled in print.
- Switching years keeps each year's draft in memory, including selected topics,
  generated/removed/reordered questions, edited title/instructions, count/mix,
  support settings and preview/print choice. Switching subject keeps selections.
  Refresh/navigation still discards drafts; no account or browser-store writes.
- Existing bounded authored banks supply Maths, English and Science; the History
  adapter supports all six authored story/source banks. Written equivalents
  translate sorting, ordering, word picking, sequences, building, shading,
  clock setting, plotting and reflection into paper tasks with aligned keys.
- Year 2 Maths retains its bespoke banks, with one practice and one application
  format per topic. The 2/5/10 table adapter enumerates products and matching bag
  stories. This paper tool does not claim to reproduce all four interactive slots
  or replace practical science, oral work, manipulatives or fieldwork.
- Read-only diagrams reuse the existing year/subject renderers, with paper sizing,
  white-paper theme overrides and grey printing. Sources, tables, passages and
  images/credits remain attached to their questions. Picture clues remain pictures;
  their spelling labels are not printed as text answers.
- Dictation is teacher-led on paper. Its full script stays in teacher guidance;
  pupil pages contain only the listening/writing task. Keys remain separate.
- Existing worked examples/reminders and vocabulary are looked up for the actual
  year/topic. Missing examples are omitted rather than replaced by unrelated ones.
- Pagination uses source length and diagram/table size, so short new-year tasks can share a page while longer extracts keep their space.
- Explicit source identifiers in Year 2 adapters survive production minification; a bundled/minified regression check covers every Year 2 Maths topic.
- Finite question pools never pad a worksheet with repeats. All 714 topics have
  both Practice and Apply & explain pools, although some small banks supply fewer
  than the requested 16 questions; the builder reports their actual count.

## Year 3 review resolutions

The historical [independent review](2026-11-11-year3-practice-review.md) records
its original findings. This expansion addresses all seven:

- R1: labelled `stage.evidence` retained in seed-dispersal observations.
- R2: specimen scratch/water test descriptions retained for rocks.
- R3: meaning/target retained for word-building prompts, including spare tiles.
- R4: explicit sunlight fact/sorting paper tasks retain the safety guidance.
- R5: fossil picture-letter ordering handled before generic conclusions.
- R6: omit optional improper-fraction bars unsupported by the Year 3 renderer;
  written comparisons remain answerable. No incorrect saturated bars are drawn.
- R7: component tests locate the selected chip / available browse results.

## Sources and content boundaries

Existing curriculum registries and challenge banks remain the content sources.
The expansion changes paper adapters and teacher controls, not statutory documents,
learner IDs, challenge modules, awards, progress stores or curriculum registration.
Relevant boundaries live in `docs/curriculum/year-{1,2,4,5,6}-maths.md`, the year
English/Science mappings, `year-3-and-4-english.md`, `year-5-and-6-english.md` and
`key-stage-{1,2}-history.md`. New Year 2 table/route wording stays within the
existing table, whole-number and right-angle movement boundaries.

Technical validation, content adaptation review and physical classroom review
are separate. The source banks' prior implementation does not certify every paper
adaptation. Independent teacher/content review of all formats remains outstanding.

## Validation evidence

| Check | Result |
|---|---|
| All-topic data/regression tests | All 23 pass, covering registration/search for every year/subject, every topic/mix, finite capacity, cross-year rejection, source/answer separation, Year 2 routes/products, minified production adapters, pagination and Year 3 source fixes. |
| Focused builder components | All 15 pass on the final controls, including all five new-year dictation links, no storage writes, editing/replacement/reorder/removal, mixed subjects, print controls and full draft restoration per year. |
| Teacher tools/briefings | All 28 tests in the focused builder/briefings/tools run pass. |
| Full lint | Pass. Affected lint also passes after final functional/test changes. |
| Production build | Pass; 70 public pages prerendered. Existing JSON import-attribute and large-chunk warnings remain. The practice route remains lazy-loaded. |
| Full `npm test` | Unit stage at the full-run checkpoint: 2,845 passed, 8 failed, 4 skipped; component stage is skipped when unit tests fail. Three failures are the pre-existing Year 6 English lesson lint / story count / story length defects in unchanged content. Five are sandbox localhost-port errors, cleared by the separate HTTP rerun below. Four final regression tests were added subsequently; all 23 practice data tests pass on the final code. |
| HTTP regression rerun | All 8 server security/SEO tests pass with local-port access. |
| Separate full component suite | 1,005 passed, one planner curriculum-search test timed out under concurrent build load (108 files / 1,006 tests). Its focused rerun with the builder passes all 21 tests; the final builder-only rerun passes all 15. The previously recorded Year 6 timeout passes in this full run. |
| Final all-model render audit | All 42,731 non-null models across the 50,929 adapted question records render under the router without exceptions, empty output or `NaN`/`undefined`/object-string output. This is structural evidence, not an answer oracle for every record. |
| SEO command | All 70 HTTP/public-page checks pass. Browser stage still stops at the existing `scripts/checkSeo.js:81` selector for `🔢 Number Bonds`; the unchanged page heading is `Number Bonds`. Later SEO browser assertions are not reached. |
| Whitespace | `git diff --check` passes. |

Logs: `/tmp/bix-years-*.log`. The full-suite checkpoint precedes the final
Year 2 source-identifier and pagination adjustments; their affected data,
component, lint, production-build and browser checks were repeated. No claim
is made that the full repository suite is green.

## Browser and A4/PDF evidence

The in-app Node REPL/browser controls were unavailable. The existing local
Chrome/Playwright setup was used with a temporary browser context and local
production server; no pupil accounts or application stores were changed.

An initial browser pass found a Year 2 adapter relying on `Function.name`, which
production minification renames. Explicit source identifiers replaced it, and a
new test bundles/minifies the adapter before exercising all 39 Year 2 Maths
topics. The corrected production build completes the representative batch.

The final pagination batch checks 12 sheets at 1280px and 360px in both themes:
Year 1 counting objects/alphabet, Year 2 shapes/plants, Year 4 reflection/myths,
Year 5 angles/materials, Year 6 viewpoints/circuit symbols/maps through time,
and a Year 5 Maths/Science/History mixed sheet. Default settings and all support
options were checked; pupil-only, answer-only and combined output works with the
answer preview selected. Across the 48 screen cases and 48 default-print checks:

- No horizontal document overflow, page errors, measured page overflow or footer
  overlap. All 48 generated desktop/light PDFs have the expected page count.
- Representative default and expanded-space question-page screenshots were
  visually inspected, including mixed-subject mobile/dark controls.
- Source length affects pagination: for example, eight Year 6 viewpoint tasks
  fit four default pupil pages; extra working space keeps more room per task.
- The search field's inherited padding was strengthened after screenshot review
  to keep its icon clear of the placeholder. A final four-case confirmation at both widths/themes measures 40px left padding, an 8px gap after the icon and no document overflow; the mobile/dark field screenshot was inspected. See `/tmp/bix-years-search-layout.log`.

Artifacts/script: `/tmp/bix-years-layout-final/`,
`/tmp/bix-years-layout-final.mjs`, `/tmp/bix-years-layout-final.log`.

Not browser-checked exhaustively: every topic/seed/model combination, physical
phones/tablets, screen-reader behaviour, or real photocopies. No teacher/classroom
content sign-off is claimed. The implementation is complete for the agreed scope;
independent content and physical print/device review remain separate follow-up work.
