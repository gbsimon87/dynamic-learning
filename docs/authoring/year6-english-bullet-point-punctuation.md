# Bullet Point Punctuation — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `bullet-point-punctuation`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Bullet Point Punctuation | `bullet-point-punctuation` | punctuation of bullet points to list information |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Decide how bullets are punctuated for phrases and for sentences. | Choose | A bulleted list in a reading box. | Capital and full stop on phrases, or none on sentences. |
| 2 | Sort correct bullets from those needing fixing. | Sort | Bullet cards under a visible lead-in. | Inconsistent bullet style. |
| 3 | Tap the bullet punctuated differently. | Tap a line | A lead-in and three bullets. | Tapping the lead-in or a correct bullet. |
| 4 | Choose the fully correct list. | Choose | Complete lists with bullets shown by •. | Inconsistency, wrong style or a comma after the lead-in. |

Content exclusions: The statutory text names the skill but not one convention. This topic teaches one clear, consistent convention (colon lead-in; lower-case with no full stop for phrases; capital and full stop for sentences) and rejects only inconsistency, so owner review of that convention is recommended.

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

Builder: src/data/challenges/authored/year6/english/bullet-point-punctuation.js export buildBulletPointPunctuation.
Focused check: npm run check:topic -- --year 6 --subject english --topic bullet-point-punctuation --builder src/data/challenges/authored/year6/english/bullet-point-punctuation.js --export buildBulletPointPunctuation

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
