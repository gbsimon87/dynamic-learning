# Layout Devices — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `layout-devices`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Layout Devices | `layout-devices` | Appendix 2, Year 6, Text: layout devices [for example, headings, sub-headings, columns, bullets, or tables, to structure text] |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Match a reader's need to a layout device. | Choose | The need in words with a gloss. | Mixing heading and sub-heading, or table and columns; hint asks what the reader must do. |
| 2 | Sort jobs by device family. | Sort | Three labelled bins. | Confusing lists with tables. |
| 3 | Tap the sub-heading for a named part of a leaflet. | Tap a line | A leaflet laid out as a main heading, two sub-headings and text. | Tapping the main heading. |
| 4 | Explain which device finds a section and why bullets are used. | Choose | A formatted leaflet extract with headings and bullets. | Thinking bullets name the whole text. |

Content exclusions: A table cannot be drawn in the reading box, so tables are taught in the lesson and by description in questions; physical layout design is not assessed.

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

Builder: src/data/challenges/authored/year6/english/layout-devices.js export buildLayoutDevices.
Focused check: npm run check:topic -- --year 6 --subject english --topic layout-devices --builder src/data/challenges/authored/year6/english/layout-devices.js --export buildLayoutDevices

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
