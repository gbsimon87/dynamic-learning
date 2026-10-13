# Geography curriculum specifications — Years 1–4

**Status:** Year 3 implemented on 2026-10-13 after the owner requested a build:
16 topics / 64 verified challenges. Years 1, 2 and 4 remain draft specifications.
See the [Year 3 source pack](YEAR3_SOURCE_PACK.md) and tracker for checks and limits.

Read the [shared design spec](shared-design-spec.md), then the relevant year.
Every spec contains an implementation tracker; update it when work is resumed.

| Year | Age | Categories | Topics | Planned challenges | Spec and tracker |
|---|---|---:|---:|---:|---|
| 1 | 5–6 | 4 | 12 | 48 | [Year 1](year-1-design-spec.md) |
| 2 | 6–7 | 5 | 14 | 56 | [Year 2](year-2-design-spec.md) |
| 3 | 7–8 | 5 | 16 | 64 | [Year 3](year-3-design-spec.md) |
| 4 | 8–9 | 5 | 16 | 64 | [Year 4](year-4-design-spec.md) |
| **Total** | | **19** | **58** | **232** | **64 implemented (Year 3)** |

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
