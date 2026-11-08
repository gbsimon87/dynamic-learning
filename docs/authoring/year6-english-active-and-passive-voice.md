# Active and Passive Voice — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---formal-language-and-sentence-choices` / `active-and-passive-voice`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Active and Passive Voice | `active-and-passive-voice` | use of the passive to affect the presentation of information in a sentence; using passive verbs to affect the presentation of information in a sentence |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Recognise the passive version of the same event. | Choose | Active/passive pairs with the affected thing visibly moved first. | Treating any sentence with *was* as passive; hint asks what comes first. |
| 2 | Sort sentences by the information they foreground. | Sort | Matched active and passive event cards. | Looking only for a familiar noun; hint asks whether it acts or is acted on. |
| 3 | Build a passive report from an active sentence. | Word tiles | Original active sentence, requested focus and the full passive wording. | Keeping the doer first; hint names the affected thing. |
| 4 | Select voice to suit a news focus. | Choose | A named report focus plus competing active/passive sentences. | Believing passive is always better; hint says to foreground the requested information. |

Content exclusions: perfect verb forms and passive voice as a separate writing topic. Each pair retains the same event and agent, so the learner is choosing presentation, not guessing facts. The text-only model is deliberate: word order is the representation being taught; all controls work without audio.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References:
- src/components/challenge/visual/EnglishQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/pages/skills/english/challenges/EnglishPracticeGame.jsx
- tests/components/questionVisuals.test.jsx
- tests/components/lessonFrame.test.jsx

The lesson uses the same before/after active/passive sentence pairs, a focus table and a worked report rewrite. Practice uses shared choice, sort and tile controls. A picture would not show the grammatical presentation, so the visible sentence pair and named focus are the learning model.

## Verification record

- [x] Four slots teach the mapped requirement with age-appropriate variety.
- [x] Explanations teach what the questions ask; wrong options preserve a single matching event or are unrelated.
- [x] Lesson and challenge use the same sentence-pair/focus representation.
- [x] Pure bank checks and real-control playthrough cover wrong answer, hint, retry and completion once.
- [ ] npm run lint; npm test; npm run build (due once for the whole course).
- [ ] Layout/drag/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device speech/touch and owner/child feedback, where still outstanding.

Builder: src/data/challenges/authored/year6/english/active-and-passive-voice.js export buildActiveAndPassiveVoice.
Focused check: npm run check:topic -- --year 6 --subject english --topic active-and-passive-voice --builder src/data/challenges/authored/year6/english/active-and-passive-voice.js --export buildActiveAndPassiveVoice

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
