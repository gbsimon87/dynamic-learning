# Year 4 Science implementation and review

Implemented 2026-10-11. Source/mapping: [Year 4 programme](../curriculum/year-4-science.md).
Dataset: [year4ScienceCurriculum.js](../../src/data/year4ScienceCurriculum.js).

| Strand | Topics | Implemented challenges |
|---|---:|---:|
| Living things and their habitats | 3 | 12/12 |
| Animals, including humans | 3 | 12/12 |
| States of matter | 4 | 16/16 |
| Sound | 5 | 20/20 |
| Electricity | 5 | 20/20 |
| Total | 20 | 80/80 |

All titles/IDs are locked in the dedicated dataset test. Registration and
certificate statements are additive; Year 2 Science is being built independently
and its files are not part of this implementation. Shared files are edited
to add Year 4 entries and update Year 4 availability expectations. The shared
`DataChallenge` also forwards an optional subject validator to its existing
`DataRound` hook; other challenges keep the default checker.

## Verification

- Seeded validation: all levels of all 20 topics over 50 seeds, five questions
  per run, no repeated task, valid options, correct/rejected
  responses, deterministic replay variation and unchanged source banks.
- Content checks: classification-key routes, producer-to-consumer chains,
  independent calculations from supplied evidence, depicted complete/open
  loops and switch positions, distinct pitch/volume and gas/droplet concepts.
- Integration: all 80 dynamic-loader files, fresh-user locks, every sequential
  completion and cascade, replay, numeric persistence round trips, strict
  Science and three-subject Year 4 awards.
- Component renders: all 80 real wrappers in both themes; wrong answers retry,
  hints appear after two misses; completion passes combos exactly once;
  classification and sentence-building controls; evidence tables and switches.
- Headless Chrome: all 80 real challenge routes played through their controls
  (400 questions), including classification, sentence building, number entry
  and keyboard ordering. Wrong answers retry, hints appear, completion triggers,
  reloading preserves the first saved completion and replay does not duplicate
  saved slots. A separate pre-existing Year 2 Science document remained exactly
  unchanged. An isolated temporary browser profile was used.
- Layout review: 36 desktop/phone-width screenshots across nine representative
  topics, both light/dark themes and 1280/390 px viewports; no horizontal overflow
  or browser errors. Diagrams and evidence tables were inspected after entry
  animations settled. Cell-terminal marks use the contrasting on-accent tokens.
- `npm run lint`, `npm test`, `npm run build`: passed. Final full suite:
  See the full-pass results below for the latest suite counts.
  The production build retains its existing large-chunk warning.

## Full pass — 2026-10-11

Reviewed all 497 authored tasks against the topic mappings and current rendering
and progress code. Fixed:

- Sentence marking: 12 tasks now accept 27 explicitly reviewed alternatives,
  including list orders, paired verbs and relocated clauses. Scientific sentence
  comparison ignores case, commas and full stops. Every tile must appear once;
  unknown/repeated/missing tiles and reversed scientific relationships fail.
- Arbitrary ordering: circuit inspection is now classification of useful checks.
  The puddle task orders a timed observation record. The key task states its
  starting point.
- Observation wording: gas examples describe spreading through available space;
  pitch comparisons specify matching strings at equal tightness and distinguish
  ruler observations. Replaced a question about the app's lack of audio with
  a scientific vibration-evidence question.
- Diagrams: circuit wires physically terminate at the bulb's separate contacts,
  with no masked wire bypass. The digestive route now joins the stomach, coiled
  small intestine, surrounding large intestine and waste exit; its accessible
  description agrees with the drawing.
- Integration checks: the Year 4 award test checks actual Maths/English/Science
  files; all 20 topic certificates resolve their own authored science statement.

The anatomy review used [NIDDK's digestive-system reference](https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works).
Sound definitions were checked against [Science Learning Hub's sound reference](https://www.sciencelearn.org.nz/image_maps/115-exploring-sound).
Tooth-care wording agrees with [NHS children's teeth guidance](https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/).

Fresh-progress Chrome verification completed all 80 challenges sequentially plus
one replay (405 questions), without pre-completing Science. Each run included
two wrong attempts, hint display and recovery. Verified every numeric saved
completion, next-challenge destination, all 20 topic and five category awards,
and the final Science/year awards with the other two subjects already complete.
Replay preserved completions and milestone totals. Existing Year 2 Science,
Year 4 Maths and Year 4 English documents stayed exactly unchanged.

160 screenshots cover every topic at levels 3 and 4 in both themes at 1280/390 px;
no horizontal overflow or page errors. After the final wording refinements,
all four levels of both affected topics were replayed (40 questions, plus a
five-question fresh-progress check). A further 32 screenshots cover those
topics and the digestive, water-cycle, open-circuit and switch diagrams.
Representative screenshots were visually inspected after animations settled.

Final checks: `npm run lint`, `npm test`, `npm run build` passed; 1,596 unit tests
and 132 component tests passed, with four existing unit skips. The existing
large production-chunk warning remains.

## Remaining review

Owner play-test, real-device touch and the installed British read-aloud voice.
Digital completion records challenge performance, not completion of physical
experiments or full statutory practical teaching. Hands-on work remains a
classroom/grown-up activity, as documented in the source mapping.
