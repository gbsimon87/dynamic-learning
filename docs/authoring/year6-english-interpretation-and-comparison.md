# Topic briefs: Year 6 English — Interpretation and Comparison

- Registry identities: Year 6 / English / `reading---interpretation-and-comparison` / the seven permanent topic IDs below.
- Source: `docs/curriculum/year-5-and-6-english.md:383-389`, based on the Years 5–6 English programme. Each topic stays within its mapped reading requirement; none asks learners to write a free response.
- Recipe: a pure authored bank per topic, the shared text-first `ReadingInterpretationChallenge`, four dynamic-loader wrappers, and `YEAR6_READING_INTERPRETATION_LESSONS`. The intentionally text-first presentation leaves the evidence on screen; `EnglishQuestionVisual` adds only a useful existing visual and otherwise does not decorate reading evidence.
- Progress: no stored IDs, progress, unlocking or award membership changed.

| Topic | Statutory focus | Four slots and representation | Key misconception / retry support |
|---|---|---|---|
| Exploring Meaning in Context | Explore word meaning in context | context choice → supported/unsupported meaning sort → response tiles → independent context choice | A familiar-looking word is not automatically the right meaning; reread the full sentence. |
| Predicting from Details | Predict from stated and implied detail | clue-based prediction choice → evidence sort → response tiles → independent prediction | A prediction needs a visible clue, not a wild guess. |
| Summarising across Paragraphs | Main ideas and supporting details across paragraphs | two-paragraph summary choice → claim sort → summary tiles → independent summary | A summary joins main ideas; it is not one small detail. |
| Figurative Language and its Effect | Evaluate figurative language and its impact | language/effect choice → effect sort → explanation tiles → independent effect choice | Do not read imagery literally; explain the picture or feeling it creates. |
| Comparing Accounts and Viewpoints | Compare accounts of the same event and viewpoints | fair-comparison choice → claim sort → comparison tiles → independent comparison | Use evidence from both writers rather than choosing one account. |
| Themes and Conventions | Identify themes and conventions across writing | identify idea/pattern → supported sort → explanation tiles → independent application | A theme is a message; a convention is a familiar form feature. |
| Asking Questions about Texts | Ask questions to improve understanding | helpful-question choice → question sort → question tiles → independent question choice | Helpful questions relate to evidence, meaning, reasons or effects. |

## Review record

| Status | Evidence / remaining work |
|---|---|
| Implemented | Seven topics, 28 Curriculum slots and 28 matching Bix lesson entries. Each bank has 15 authored templates per slot and samples five deterministically. |
| Technically validated | Bank test runs `lintBuild` over all seven banks; shared component playthrough covers wrong-answer retry, hint, choice, sort, tile build and completion callback. Topic loader/bank checking was run for the first topic; final full-suite results are recorded in the course handoff. |
| Content reviewed | Mapping rows and all authored variants were checked for one defensible supported response, British spelling and no hidden evidence. A teacher/owner review remains required. |
| Device reviewed | No new bespoke control, CSS, canvas, drag or visual renderer was introduced; browser/device layout has not been rechecked. Physical touch and voice review remain required. |
| Owner/learner review | Observe whether children can read the evidence independently and whether the text length and response-tile wording feel manageable. |
