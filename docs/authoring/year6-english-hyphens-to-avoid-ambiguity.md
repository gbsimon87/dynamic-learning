# Hyphens to Avoid Ambiguity — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---cohesion-layout-and-punctuation` / `hyphens-to-avoid-ambiguity`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Hyphens to Avoid Ambiguity | `hyphens-to-avoid-ambiguity` | how hyphens can be used to avoid ambiguity |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Choose the sentence with the stated meaning. | Choose | Both forms named in the supporting text. | Ignoring the hyphen; hint says to say both meanings aloud. |
| 2 | Sort meanings and sentences under the hyphenated and unhyphenated form. | Sort | Meaning and sentence cards. | Treating the two forms as identical. |
| 3 | Build the sentence for a stated meaning. | Word tiles | Hyphenated and unhyphenated tiles. | Using the wrong form. |
| 4 | Pick the rewrite that restores the intended meaning. | Choose | An unhyphenated draft. | Leaving the draft as it is. |

Content exclusions: Appendix 1 hyphens in prefix spellings such as co-ordinate (Hyphens in Words).

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

Builder: src/data/challenges/authored/year6/english/hyphens-to-avoid-ambiguity.js export buildHyphensToAvoidAmbiguity.
Focused check: npm run check:topic -- --year 6 --subject english --topic hyphens-to-avoid-ambiguity --builder src/data/challenges/authored/year6/english/hyphens-to-avoid-ambiguity.js --export buildHyphensToAvoidAmbiguity

Read docs/AUTHORING.md for the full workflow. This does not establish teaching quality.
