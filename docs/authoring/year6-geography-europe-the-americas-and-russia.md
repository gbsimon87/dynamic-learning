# Europe the Americas and Russia — Year 6 geography

Status: implemented: four sourced evidence-card lessons and routed challenge wrappers are complete; browser and physical-device review remain pending.
Permanent category/topic: `regions-and-comparison` / `europe-the-americas-and-russia`.

## Curriculum boundary

Source: docs/curriculum/key-stage-2-geography.md. Read the original statutory bullet and notes there.
| 6 | Regions and Comparison | Europe the Americas and Russia | `europe-the-americas-and-russia` | K2-L1, K2-L3, K2-S1 |

## Teaching plan (complete before writing questions)

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Explore the topic vocabulary and visible facts | Evidence-card choice | Bix’s field notes | Read the matching note |
| 2 | Locate or read geographical evidence | Evidence-card choice | Labelled field notes | Read the matching note |
| 3 | Use evidence about the topic | Evidence-card choice | Labelled field notes | Read the matching note |
| 4 | Connect evidence to a geographical decision | Evidence-card choice | Labelled field notes | Read the matching note |

The source boundary is the mapped KS2 requirement; cards use visible text evidence, British English and the existing sound-off Geography path.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References (Year 6):
- src/pages/skills/geography/challenges/year6/Year6GeographyGame.jsx
- src/components/challenge/geography/GeographyChallenge.jsx
- src/components/challenge/geography/GeographyVisual.jsx
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

Builder: src/pages/skills/geography/challenges/year6/Year6GeographyGame.jsx (topicId=europe-the-americas-and-russia).

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
