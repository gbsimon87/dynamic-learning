# Cohesive Devices across Paragraphs — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `cohesive-devices-across-paragraphs`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Cohesive Devices across Paragraphs | `cohesive-devices-across-paragraphs` | Appendix 2, Year 6, Text: linking ideas across paragraphs using a wider range of cohesive devices |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Choose a linking adverbial (contrast or result) or a repeated key phrase for paragraph 2. | Choose | Paragraph 1 in a labelled reading box and an opener with a gap. | Picking a link that does not fit the meaning; hint asks what paragraph 2 must do. |
| 2 | Sort linking phrases into contrast and result. | Sort | Phrase cards with plain-English bin labels. | Mixing the two relationships; hint contrasts 'different' with 'because of'. |
| 3 | Build paragraph 2's first sentence with the right link. | Word tiles | Paragraph 1 and tiles, including tempting wrong links. | Using a link that reverses the meaning. |
| 4 | Pick the best opener without being told the device. | Choose | Paragraph 1 and four whole openers. | Choosing a pronoun or unrelated opener instead of the repeated phrase or fitting adverbial. |

Content exclusions: Ellipsis (separate topic), layout devices and free writing.

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

Builder: src/data/challenges/authored/year6/english/cohesive-devices-across-paragraphs.js export buildCohesiveDevicesAcrossParagraphs.
Focused check: npm run check:topic -- --year 6 --subject english --topic cohesive-devices-across-paragraphs --builder src/data/challenges/authored/year6/english/cohesive-devices-across-paragraphs.js --export buildCohesiveDevicesAcrossParagraphs

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
