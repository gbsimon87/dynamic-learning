# Formal Structures and the Subjunctive — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---formal-language-and-sentence-choices` / `formal-structures-and-the-subjunctive`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Formal Structures and the Subjunctive | `formal-structures-and-the-subjunctive` | the difference between structures typical of informal speech and structures appropriate for formal speech and writing; recognising vocabulary and structures that are appropriate for formal speech and writing, including subjunctive forms |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Choose a direct formal structure instead of a chatty question tag. | Choose | A named formal setting and same-message alternatives. | Thinking formal means only longer words; hint points to the structure. |
| 2 | Sort conversational and formal sentence structures. | Sort | Paired cards, including question tags. | Missing a question tag; hint lists its clues. |
| 3 | Build a formal subjunctive sentence. | Word tiles | An imagined, essential or formal-possibility context. | Changing *were* to *was* or adding an -s after *that*. |
| 4 | Recognise a subjunctive structure in application. | Choose | The same context with one formal subjunctive form. | Choosing a merely formal sentence instead of the required form. |

Content exclusions: formal vocabulary (a separate topic), passive voice and free-writing assessment. The bank only uses clear, taught forms: *If I were*, *It is essential that…*, and *Were … to…*. All evidence is visible and sound is optional.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References:
- src/components/challenge/visual/EnglishQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/pages/skills/english/challenges/EnglishPracticeGame.jsx
- tests/components/questionVisuals.test.jsx
- tests/components/lessonFrame.test.jsx

The lesson models one direct formal notice, a chatty/formal table and a worked *If I were* correction. Practice keeps the sentence itself visible because the word order and verb form are the learning model; shared controls provide the large touch targets.

## Verification record

- [x] Four slots cover informal/formal structures and the specified subjunctive forms.
- [x] Explanations teach the same direct-form, question-tag and subjunctive representations used in practice.
- [x] Pure bank checks and real-control playthrough cover wrong answer, hint, retry and completion once.
- [ ] npm run lint; npm test; npm run build (due once for the whole course).
- [ ] Layout/drag/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device speech/touch and owner/child feedback, where still outstanding.

Builder: src/data/challenges/authored/year6/english/formal-structures-and-the-subjunctive.js export buildFormalStructuresAndTheSubjunctive.
Focused check: npm run check:topic -- --year 6 --subject english --topic formal-structures-and-the-subjunctive --builder src/data/challenges/authored/year6/english/formal-structures-and-the-subjunctive.js --export buildFormalStructuresAndTheSubjunctive

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
