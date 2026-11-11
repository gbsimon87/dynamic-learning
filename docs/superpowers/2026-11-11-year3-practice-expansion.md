# Practice builder — all existing Year 3 subjects

## Owner scope and verification instruction

The owner requested completion across all Year 3 subjects and said the tests
would be run with a different model. Scope is the five existing Year 3 courses: Maths, English, Science, History
and Geography. No new curriculum courses are registered.

**No tests were executed during this expansion.** Test files were extended for
the subsequent independent-model pass. Lint/build results are recorded separately
below; they do not establish answer correctness or runtime coverage.

## Implemented scope

| Existing course | Registered paper topics |
|---|---:|
| Maths | 44 |
| English | 32 |
| Science | 21 |
| History | 22 |
| Geography | 16 |
| Total | 135 |

- Keeps the original eight Maths adapters, split into `mathPilot.js`, and adds
  number/arithmetic, fractions, measurement, geometry/statistics adapters using
  existing pure Year 3 builders. Number estimates have an explicit nearest-100
  target. Money stories record pounds/pence separately. Unknowns in essential
  diagrams remain unlabelled; marks, scales, hands and geometry are drawn from
  the same structured data as their questions.
- Adds paper models for clocks (including Roman numerals and blank faces),
  rulers, weighing dials, jugs, number lines, arrays, fraction bars, angles,
  turns, polygons, wireframe solids, drawing grids, perimeters, bar charts,
  pictograms and tables. The paper still uses monochrome ink and hatching.
- English reuses all 32 existing topic builders. Reading passages, clues,
  contents/index entries, sorting headings and sentence/word tiles are retained
  as source material. Audio dictation is adapted to teacher-read sentences;
  the spoken script appears only in teacher answer guidance. Vocabulary terms
  are topic-specific and light metadata lives separately from full banks.
- Science adapts supplied observations, care cards, fair-comparison prompts,
  source explanations, classification records and bounded conclusions. It does
  not claim a pupil has performed a live experiment. Existing safety wording
  for sunlight is retained in marking guidance.
- History uses the existing authored story/source banks, chronological ordering
  and classification tasks. Geography retains its authored evidence and static
  map, globe, plan, grid, process, chart and photographic renderers. Image
  credits stay with sources. This is paper preparation, not a replacement for
  physical fieldwork or practical investigation.
- Subject-scoped topic IDs exist only in transient worksheet state; shipped
  curriculum IDs and learner records remain unchanged. Switching the search
  subject retains selected topics, worksheet questions and teacher edits. Up to
  three topics can be combined across subjects. Browse starts with eight topics.
- The practice/application selector now says “Apply & explain” so that writing,
  inference, evidence and drawing tasks are described honestly. A question that
  is present at several levels retains its membership in both mixes. Repeated
  source templates are deduplicated; finite pools show their actual available
  count rather than padding a sheet with repeats.
- Content-aware answer pagination replaces fixed six-entry pages. Numbering
  follows the current worksheet after reorder/remove. Examples/reminders are
  only printed where existing introductions or briefing reminders are available.
- Every Year 3 briefing links into the matching subject/topic in the builder.
  The hub description now covers the five subjects. Unrelated signup work in
  the shared checkout was left untouched.

## Source boundaries reviewed

The task extends a teacher paper tool, not the curriculum games or registrations.
Statutory source text remains untouched. Topic rows and boundaries were read in:

- `docs/curriculum/year-3-maths.md`
- `docs/curriculum/year-3-and-4-english.md` (Year 3 mapping and boundaries)
- `docs/curriculum/year-3-science.md` (including enquiry and topic mapping)
- `docs/curriculum/key-stage-2-history.md` (Year 3 allocation/crosswalk)
- `docs/curriculum/key-stage-2-geography.md` (Year 3 mapping)

Adapters retain the existing sources, values and explanations. Some screen
interactions have deliberate written equivalents; this does not claim that each
paper reproduces all four interactive challenge slots or meets every practical
curriculum requirement.

## Verification status

| Evidence type | Status |
|---|---|
| Implementation | Adapters/metadata for the 135 registered topics, subject UI, essential paper renderers and print styling written. |
| Static lint | Full `npm run lint` passes; affected-source follow-up lint also passes after the final source/evidence adjustments. `git diff --check` passes. |
| Production compilation | Final `npm run build` passes (33.35 seconds; 70 public pages prerendered). Existing JSON-import-attribute and large-chunk warnings remain. This is compilation/prerender evidence, not worksheet runtime or print verification. |
| Automated tests | **Deferred at owner request.** The pilot results in the earlier record apply to the pilot revision only. No expanded-coverage test pass is claimed. |
| Content review | Statutory boundaries/source schemas considered during adaptation. Independent teacher review and per-format answer/evidence review are pending. |
| Browser/device/print review | Browser controls unavailable. Real desktop/mobile layouts, both themes, A4/PDF pagination, essential diagram readability and photocopies are unverified. |

## Next-model validation handoff

Run focused checks first, then the full set once fixes are final:

```sh
node --test src/data/teacherPractice/practice.test.js src/data/teacherPractice/year3Coverage.test.js src/data/teacherCurriculumSearch.test.js shared/seo.test.js
npx vitest run tests/components/teacherPractice.test.jsx tests/components/teacherBriefings.test.jsx tests/components/teacherTools.test.jsx tests/components/teacherPlanning.test.jsx tests/components/teacherResources.test.jsx tests/components/teacherCurriculumSearch.test.jsx tests/components/teacherClassInput.test.jsx
npm run lint
npm test
npm run build
npm run check:seo
```

Prior suite failures: Year 6 English lesson content, two story-content checks,
five sandbox-blocked server tests, and an intermittent Year 6 English cohesion/
punctuation component timeout. The final pilot record has their exact evidence;
new failures must not be assumed to be those existing failures.

The new coverage suite checks registration, nonempty pools per mix, deduplication,
broken text/model fields, mixed-subject preservation, essential maths diagrams,
print-only dictation scripts and answer-page numbering. **Extend independent
answer oracles across new maths types and review all adapted English/Science
prompts and answer formats.** Exercise source-dependent questions, especially
multi-stage science records, full passages, diagram labels and chart drawing.

Where browser controls are available, batch representative long/short sheets,
all essential model types, pupil/answers/both print choices, both themes and
mobile/desktop widths. Inspect PDF page boundaries, source visibility and image
credits. Large passages or source-heavy questions may need pagination adjustment;
compilation and abstract page budgets cannot certify physical print layout.
