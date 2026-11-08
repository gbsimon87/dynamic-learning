# Punctuation in Lists — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `punctuation-in-lists`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Punctuation in Lists | `punctuation-in-lists` | use of the colon to introduce a list and use of semi-colons within lists |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Choose the correctly punctuated list sentence. | Choose | The unpunctuated draft shown in a reading box. | Comma or semi-colon before the list; commas instead of semi-colons between complex items. |
| 2 | Sort correct lists from lists needing a fix. | Sort | Four sentences, two correct. | Missing colon or all commas. |
| 3 | Tap the gap for the colon or first semi-colon. | Tap a gap | The list word by word. | Putting the colon after a verb. |
| 4 | Choose the correct version of a draft note. | Choose | Draft in a reading box. | Repeating the S1 error patterns without the mark being named. |

Content exclusions: Bullet-point punctuation (separate topic).

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

Builder: src/data/challenges/authored/year6/english/punctuation-in-lists.js export buildPunctuationInLists.
Focused check: npm run check:topic -- --year 6 --subject english --topic punctuation-in-lists --builder src/data/challenges/authored/year6/english/punctuation-in-lists.js --export buildPunctuationInLists

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
