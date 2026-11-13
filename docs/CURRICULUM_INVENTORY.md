# Implemented curriculum inventory

Snapshot checked **2026-11-08**. The source is [curriculumRegistry.js](../src/data/curriculumRegistry.js),
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
| 6 | [Maths](../src/data/year6MathCurriculum.js) | 49 | 196 | Complete |
| 6 | [English](../src/data/year6EnglishCurriculum.js) | 31 | 124 | Complete |
| 6 | [History](../src/data/year6HistoryCurriculum.js) | 20 | 80 | Complete (content review pending) |
| 6 | [Geography](../src/data/year6GeographyCurriculum.js) | 16 | 64 | Complete (content review pending) |
| 6 | [Computing](../src/data/year6ComputingCurriculum.js) | 17 | 68 | Complete (content review pending) |
| 6 | [French](../src/data/year6FrenchCurriculum.js) | 17 | 68 | Complete (content review pending) |
| 6 | Other subjects | 0 | 0 | Not registered yet |
| **Total** | **39 complete pathways** | **923 planned / 923 built** | **3,692 planned / 3,692 built** | |

Year 5 adds Art & Design, Computing, Design & Technology, French, Music, PE
and Relationships & Health (`wellbeing`). Saved statutory programmes do not
establish playable implementation.

## Awards and introductions

[The registry](../src/data/curriculumRegistry.js) decides `countsTowardYear`
independently of playability. Year awards for Years 5 and 6 use Maths, English
and Science only (owner decisions). Geography in every year, History in Years 2,
4, 5 and 6, and every other Year 5–6 subject are excluded. Preserve existing
awards when adding pathways.

Maths Years 1–6 and English Years 3–5 use separately registered Bix lesson
screens. Other pathways have illustrated introductions inside their subject
games: History story cards, Geography notes and the Science/other-subject
adventure frame. A missing LessonFrame entry does not mean a pathway has no
introduction.

Outstanding content, device and owner review is listed in
[OPERATIONS.md](OPERATIONS.md); implementation counts do not close it.
