# Formal and Informal Vocabulary — Year 6 english

Status: pilot implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---formal-language-and-sentence-choices` / `formal-and-informal-vocabulary`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Formal and Informal Vocabulary | `formal-and-informal-vocabulary` | Appendix 2, Year 6, Word: The difference between vocabulary typical of informal speech and vocabulary appropriate for formal speech and writing |

## Teaching plan (complete before writing questions)

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Recognise a precise formal replacement for an everyday phrase. | Choose | A visible everyday phrase and three alternatives. | Assuming a longer word is automatically formal; hint focuses on matching meaning first. |
| 2 | Sort formal and everyday alternatives with the same meaning. | Sort | Six visible words or phrases in two labelled bins. | Sorting by word length; hint names precise single-word choices as a useful clue, not a rule. |
| 3 | Build a formal notice or request. | Word tiles | The purpose and a complete formal sentence assembled from tiles. | Using the chatty alternative; hint asks which wording a notice would use. |
| 4 | Choose a register for a real reader and purpose. | Choose | A named situation and three complete candidate sentences. | Treating a friend and a council letter alike; hint asks who will read it. |

Content exclusions, factual sources and sound-off path: This topic does not teach passive voice, punctuation or the subjunctive; those have separate Year 6 topics. All wording is readable on screen; the optional read-aloud button is supplementary.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References:
- src/components/challenge/visual/EnglishQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/pages/skills/english/challenges/EnglishPracticeGame.jsx
- tests/components/questionVisuals.test.jsx
- tests/components/lessonFrame.test.jsx

For each slot, specify the illustrated teaching example and the question's model,
diagram, source picture or pictured interaction. Keep the same representation in
the explanation and task. Connect the new topic's own banks; references are not
registrations. Visuals show visible givens, not hidden answers, hint text or bin
assignments. Use accessible text equivalents, both themes and touch controls.
Shared Math/English visual fallbacks may return null: add an authored visual when
the teaching needs a representation the fallback does not support. Record any
deliberate text-only assessment, such as hidden dictation, and its reason.

## Verification record

- [ ] Four slots teach the mapped requirement with age-appropriate variety.
- [ ] Explanations teach what the questions ask; wrong options are clearly wrong.
- [ ] Illustrated introduction, worked example and question visuals preserve the built-year recipe; given quantities/labels agree and hidden answers are not exposed.
- [ ] Pure bank checks and real-control playthrough (wrong answer, hint, retry, completion once).
- [ ] npm run lint; npm test; npm run build.
- [ ] Layout/drag/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device speech/touch and owner/child feedback, where still outstanding.

Builder: src/data/challenges/authored/year6/english/formal-and-informal-vocabulary.js export buildFormalAndInformalVocabulary.
Focused check: npm run check:topic -- --year 6 --subject english --topic formal-and-informal-vocabulary --builder src/data/challenges/authored/year6/english/formal-and-informal-vocabulary.js --export buildFormalAndInformalVocabulary

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
