# Ellipsis — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `ellipsis`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Ellipsis | `ellipsis` | Appendix 2, Year 6, Text: linking ideas across paragraphs using a wider range of cohesive devices, including ellipsis |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Name the word left out when a sentence uses ellipsis. | Choose | Full wording beside the shorter sentence. | Picking a word that is still present; hint says to compare the two versions. |
| 2 | Sort ellipsis sentences from full-wording sentences. | Sort | Paired shorter and full sentences. | Treating any short sentence as ellipsis. |
| 3 | Build the shortened sentence from the full wording. | Word tiles | Full wording visible, with the omitted word as a tempting tile. | Leaving the repeated word in. |
| 4 | Choose the rewrite that keeps the meaning. | Choose | A draft shown in a reading box. | Choosing a different sentence that is also short. |

Content exclusions: Ellipsis as the punctuation mark (…) for trailing off is not taught; only the cohesive omission of words the reader can recover.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References:
- src/components/challenge/visual/EnglishQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/pages/skills/english/challenges/EnglishPracticeGame.jsx
- tests/components/questionVisuals.test.jsx
- tests/components/lessonFrame.test.jsx

Bix's lesson models the idea with a worked sentence, a comparison table, a repaired example and a short checklist. Practice keeps the sentence or text visible because wording and punctuation are the learning model; shared controls provide the large touch targets.

## Verification record

- [x] Four slots, each with 15 authored templates, cover the mapped requirement.
- [x] Explanations use the same representations as practice.
- [x] Pure bank checks, semantic bank tests and real-control playthroughs cover wrong answer, hint, retry and completion.
- [ ] npm run lint; npm test; npm run build (due once for the whole course).
- [ ] Layout/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device touch and owner/child feedback, where still outstanding.

Builder: src/data/challenges/authored/year6/english/ellipsis.js export buildEllipsis.
Focused check: npm run check:topic -- --year 6 --subject english --topic ellipsis --builder src/data/challenges/authored/year6/english/ellipsis.js --export buildEllipsis

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
