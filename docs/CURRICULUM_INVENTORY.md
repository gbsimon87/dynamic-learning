# Implemented curriculum inventory

Snapshot checked **2026-11-04**. The source is [curriculumRegistry.js](../src/data/curriculumRegistry.js),
its datasets and the challenge files. Update this table when implementations change.
“Complete” means all four planned challenge files exist for each listed topic;
it does not certify full statutory coverage, teaching accuracy or device review.

| Year | Subject / topic inventory | Topics | Challenges | Status |
|---|---|---:|---:|---|
| 1 | [Maths](../src/data/year1MathCurriculum.js) | 32 | 128 | Complete |
| 1 | [English](../src/data/year1EnglishCurriculum.js) | 38 | 152 | Complete |
| 1 | [Science](../src/data/year1ScienceCurriculum.js) | 16 | 64 | Complete |
| 1 | [History](../src/data/year1HistoryCurriculum.js) | 14 | 56 | Complete |
| 1 | [Geography](../src/data/year1GeographyCurriculum.js) | 12 | 48 | Complete |
| 2 | [Maths](../src/data/year2MathCurriculum.js) | 39 | 156 | Complete |
| 2 | [English](../src/data/year2EnglishCurriculum.js) | 39 | 156 | Complete |
| 2 | [Science](../src/data/year2ScienceCurriculum.js) | 19 | 76 | Complete |
| 2 | [History](../src/data/year2HistoryCurriculum.js) | 17 | 68 | Complete |
| 2 | [Geography](../src/data/year2GeographyCurriculum.js) | 14 | 56 | Complete |
| 3 | [Maths](../src/data/year3MathCurriculum.js) | 44 | 176 | Complete |
| 3 | [English](../src/data/year3EnglishCurriculum.js) | 32 | 128 | Complete |
| 3 | [Science](../src/data/year3ScienceCurriculum.js) | 21 | 84 | Complete |
| 3 | [History](../src/data/year3HistoryCurriculum.js) | 22 | 88 | Complete |
| 3 | [Geography](../src/data/year3GeographyCurriculum.js) | 16 | 64 | Complete |
| 4 | [Maths](../src/data/year4MathCurriculum.js) | 42 | 168 | Complete |
| 4 | [English](../src/data/year4EnglishCurriculum.js) | 33 | 132 | Complete |
| 4 | [Science](../src/data/year4ScienceCurriculum.js) | 20 | 80 | Complete |
| 4 | [Geography](../src/data/year4GeographyCurriculum.js) | 16 | 64 | Complete |
| 4 | [History](../src/data/year4HistoryCurriculum.js) | 18 | 72 | Complete |
| 5 | [Maths](../src/data/year5MathCurriculum.js) | 46 | 184 | Complete |
| 5 | [English](../src/data/year5EnglishCurriculum.js) | 36 | 144 | Complete |
| 5 | [Science](../src/data/year5ScienceCurriculum.js) | 24 | 96 | Complete |
| 5 | [History](../src/data/year5HistoryCurriculum.js) | 22 | 88 | Complete |
| 5 | [Geography](../src/data/year5GeographyCurriculum.js) | 16 | 64 | Complete |
| 5 | [Art & Design](../src/data/year5ArtCurriculum.js) | 14 | 56 | Complete |
| 5 | [Computing](../src/data/year5ComputingCurriculum.js) | 17 | 68 | Complete |
| 5 | [Design & Technology](../src/data/year5DesignCurriculum.js) | 14 | 56 | Complete |
| 5 | [French](../src/data/year5FrenchCurriculum.js) | 17 | 68 | Complete |
| 5 | [Music](../src/data/year5MusicCurriculum.js) | 14 | 56 | Complete |
| 5 | [PE](../src/data/year5PeCurriculum.js) | 12 | 48 | Complete |
| 5 | [Relationships & Health](../src/data/year5WellbeingCurriculum.js) | 13 | 52 | Complete |
| 6 | [Science](../src/data/year6ScienceCurriculum.js) | 24 | 96 | Complete |
| 6 | Other subjects | 0 | 0 | Not registered yet |
| **Total** | **33 complete pathways** | **773 built** | **3,092 built** | |

Years 1–4 have Maths, English, Science, History and Geography. Year 5 adds Art &
Design, Computing, Design & Technology, French, Music, PE and Relationships &
Health (`wellbeing`). Year 6 has Science only so far; its other subjects are
built one at a time and stay unregistered until built. Saved statutory
programmes and subject specs do not establish playable implementation.

## Awards and introductions

[The registry](../src/data/curriculumRegistry.js) decides `countsTowardYear` independently
of playability. Geography stays outside overall year awards; Years 2 and 4 History
also remain excluded. The Year 5 award uses Maths, English and Science (owner
decision 2026-11-04: Year 5 History and the other Year 5 subjects are excluded).
The Year 6 award will use Maths, English and Science; Year 6 Science stays
excluded until Year 6 Maths and English exist, so a Science-only award is never
earned and later taken away. Preserve existing awards when adding pathways.

Maths Years 1–5 and English Years 3–5 use separately registered Bix lesson screens.
Other pathways can have illustrated introductions inside their subject games:
History story cards, Geography notes and the Science/other-subject adventure frame.
Read the [visual recipes](VISUAL_RECIPES.md)
and [authoring guide](AUTHORING.md); a missing LessonFrame entry alone does not mean
that a pathway has no introduction.

## Review evidence

Use the subject trackers/source packs, plus [operations and outstanding review](OPERATIONS.md),
for current follow-up. Implementation counts do not close owner, content,
physical-device, speech or browser-layout checks.

- [English tracker](english-curriculum/IMPLEMENTATION_TRACKER.md)
- [Science tracker](science-curriculum/IMPLEMENTATION_PLAN.md)
- [History tracker](history-curriculum/HISTORY_TRACKER.md)
- [Geography specs and source packs](geography-curriculum/README.md)
- [Current architecture](ARCHITECTURE.md) and [changelog](CHANGELOG.md)
