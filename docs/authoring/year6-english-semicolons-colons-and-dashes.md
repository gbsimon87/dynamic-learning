# Semicolons, Colons and Dashes — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `semicolons-colons-and-dashes`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Semicolons, Colons and Dashes | `semicolons-colons-and-dashes` | use of the semi-colon, colon and dash to mark the boundary between independent clauses |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Choose the sentence that joins two independent clauses with the named mark. | Choose | The two clauses shown beside the choice. | Comma splice, missing mark or a misplaced mark. |
| 2 | Sort correctly joined sentences from those needing a fix. | Sort | Four sentences, two correct. | Thinking a comma is enough. |
| 3 | Tap the gap where the mark belongs. | Tap a gap | Clauses laid out word by word with tappable gaps. | Placing the mark one word too early or late. |
| 4 | Choose the correctly punctuated sentence from a described relationship. | Choose | The relationship in words. | Choosing the comma splice. |

Content exclusions: Colons and semi-colons in lists (separate topic) and hyphens. Capital letters after the mark are not tested.

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

Builder: src/data/challenges/authored/year6/english/semicolons-colons-and-dashes.js export buildSemicolonsColonsAndDashes.
Focused check: npm run check:topic -- --year 6 --subject english --topic semicolons-colons-and-dashes --builder src/data/challenges/authored/year6/english/semicolons-colons-and-dashes.js --export buildSemicolonsColonsAndDashes

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
