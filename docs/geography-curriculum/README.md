# Geography curriculum specifications — Years 1–4

**Status:** Years 1–4 implemented on 2026-10-13 after owner requests:
Year 1 has 12 topics / 48 challenges (see its spec tracker and [source pack](YEAR1_SOURCE_PACK.md));
Year 2 has 14 topics / 56 challenges; Years 3 and 4 have 16 / 64 each.
Year 2 browser/device review is pending.
See the [Year 3](YEAR3_SOURCE_PACK.md) and [Year 4](YEAR4_SOURCE_PACK.md) source packs and trackers for checks and limits.

Read the [shared design spec](shared-design-spec.md), then the relevant year.
Every spec contains an implementation tracker; update it when work is resumed.

| Year | Age | Categories | Topics | Planned challenges | Spec and tracker |
|---|---|---:|---:|---:|---|
| 1 | 5–6 | 4 | 12 | 48 | [Year 1](year-1-design-spec.md) |
| 2 | 6–7 | 5 | 14 | 56 | [Year 2](year-2-design-spec.md) |
| 3 | 7–8 | 5 | 16 | 64 | [Year 3](year-3-design-spec.md) |
| 4 | 8–9 | 5 | 16 | 64 | [Year 4](year-4-design-spec.md) |
| **Total** | | **19** | **58** | **232** | **232 implemented (Years 1–4)** |

The statutory sources are [KS1](../curriculum/key-stage-1-geography.md) and
[KS2](../curriculum/key-stage-2-geography.md). Their mapping sections record
every proposed topic and the app's year split. The split and named place studies
are app design choices: the DfE specifies Geography by key stage, not by year.

Years 1–2 develop local observation, UK/world knowledge and a comparison of two
small areas. Years 3–4 develop regional comparisons, physical processes, human
geography and more precise mapping. KS2 spans Years 3–6; the Years 5–6 follow-on
work and practical coverage limits are recorded in the shared spec and source
mapping. No Year 5–6 feature or spec is included in this work.

Existing [Skills Mode ideas](../notes_geography.md) inform interaction choices.
They do not decide statutory content: flags, famous landmarks and space games
cannot replace a Geography curriculum path.

Documentation validation on 2026-10-13: all topic/brief/outcome/tracker counts,
proposed IDs and 97 local links/anchors agree. The statutory text, source
headers and source-fidelity notes in both programme files are byte-for-byte
unchanged. `npm run lint`, `npm test` (1,670 unit and 253 component tests passed;
four database-dependent tests skipped) and `npm run build` passed. Browser/Node
REPL controls were unavailable in this session; no UI was changed or visually
verified. These checks validate the repository after the documentation change;
all future implementation verification milestones remain not started.

Year 3 implementation verification supersedes the documentation-only checkpoint
above: lint, 1,697 unit and 274 component tests, and build pass. All 64 runs were
played through browser controls; both themes and phone/desktop layouts were
reviewed. Physical-device voice/touch remains pending. No deployment is included.

Year 4 implementation verification: lint, 1,748 unit and 303 component tests and
build pass; new drawings were inspected in a desktop browser (light and dark).
A full in-app playthrough and physical-device voice/touch review remain pending.
No deployment is included.

Year 2 implementation: all 14 topics / 56 slots and 403 templates are available
locally, with exact certificate outcomes and four optional grown-up activities.
Lint, 1,772 unit and 323 component tests, and build pass; four database-dependent
tests skipped. All 56 runs passed component playthroughs; drag is mocked in
jsdom. Browser controls were unavailable, so visual browser and physical-device
review remain pending. See the [Year 2 source pack](YEAR2_SOURCE_PACK.md) and
[tracker](year-2-design-spec.md#7-implementation-tracker). No deployment.

Year 2's [bug/security review](YEAR2_BUG_SECURITY_REVIEW.md) now exercises all
403 templates through controls and all 56 complete runs. Positional wording,
shape equivalents, tally speech, sketch orientation and invalid/run-change
handling are fixed. Latest repository-wide lint, 1,785 unit / 349 component
tests and build pass; four DB tests skipped. Year 2 has 29 unit / 32 component
tests. Production npm audit reports zero known vulnerabilities. Browser and
physical-device review remain pending.

Visual refresh (2026-10-13): Years 2–4 drawings now share the Year 1 picture
style via `src/components/challenge/geography/bright.css` (sky, sea, grass,
coloured symbols and pins, chip keys, striped tables, numbered step cards, and a
decorative picture strip on text-only evidence). Shapes, letters and words are
unchanged, so no answer depends on colour. All 184 Year 2–4 runs were
screenshotted (light desktop, dark phone); lint, tests and build pass.
