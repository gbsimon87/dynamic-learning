# Miles and Kilometres — Year 6 math

Status: implemented in the shared Year 6 Maths bank and lesson set; technical, content and device review are recorded in docs/superpowers/2026-11-04-year6-math-course-build.md.
Permanent category/topic: `measurement` / `miles-and-kilometres`.

## Curriculum boundary

Source: docs/curriculum/year-6-maths.md. Read the original statutory bullet and notes there.
| Miles and Kilometres | `miles-and-kilometres` | convert between miles and kilometres |

## Teaching-plan scaffold

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | To author | To choose | To author | To author |
| 2 | To author | To choose | To author | To author |
| 3 | To author | To choose | To author | To author |
| 4 | To author | To choose | To author | To author |

The statutory boundary and exclusions are in the course record; the shared Year 6 Maths frame keeps sound-off controls and large touch targets.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References (Year 6):
- src/pages/skills/math/challenges/year6/Year6MathGame.jsx
- src/pages/skills/math/challenges/year6/Year6MathVisual.jsx
- src/components/challenge/visual/MathQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/components/challenge/lesson/LessonDiagram.jsx
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

Builder: src/pages/skills/math/challenges/year6/Year6MathGame.jsx (topic=miles-and-kilometres).

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
