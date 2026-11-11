# Year 3 practice builder — independent review

Reviewed 2026-11-11. Scope: all modified and untracked files present at the
start of this review, including the original builder, 135-topic expansion,
teacher/parent reading layouts, signup styling, routing/SEO and tests/docs.
Implementation files were not edited. This review record is the only repository
file added by the review. Findings remain open.
Base HEAD: `0f1b247610b234221c40c20f758679ba7100140f`; reviewed changes were
uncommitted on top of that revision.

## Findings

### R1 · P1 · Seed-dispersal application questions omit their observations

`src/data/teacherPractice/science.js:60–66` handles several stage fields but
ignores `stage.evidence`, used by the seed-dispersal enquiry bank. All nine
enquiry examples consequently print only the generic setup, without the
features/movements of examples A and B. Their keys nevertheless require
different explanations of those examples. Preserve each labelled stage's
evidence in the pupil source, and test that both examples can be answered from
the printed material.

### R2 · P1 · Rock sorting/table questions omit the required test results

`src/data/teacherPractice/science.js:53` includes `specimenText(sample)`, which
describes visible grains/crystals/bands/fossils, but omits the existing
`testText(sample)` scratch/water observations. Level 2 questions asking pupils
to classify by scratch/water results, and level 3 tables using those columns,
therefore have no supplied evidence for the expected yes/no values. Include the
test results whenever the selected criterion/columns need them; appearance
cannot establish these physical properties.

### R3 · P2 · Word-building tasks lose the clue that determines the answer

`src/data/teacherPractice/english.js:126–129` discards the source's meaning and
sometimes its requested word. For example, Root Words prints only “Arrange the
word tiles to make a correct sentence or word” with `re / ing / agree / dis /
ment`, but the key lists only `disagree`; `agreement` and `agreeing` also fit
the printed instructions. Adding Prefixes and Word Families have similar
ambiguity. Preserve the source meaning/target and specify which tiles are to
be used, with marking guidance consistent with the resulting prompt.

### R4 · P2 · Sunlight protection has no practice questions

`src/data/teacherPractice/science.js:119–120` drops every level 1/2 sunlight
record because those source records do not have a `prompt` and no adapter
supplies one. Selecting this topic with Practice produces an empty sheet.
Add explicit written equivalents for the fact and action-classification tasks,
retaining the existing safety information. The new coverage test reproduces
the empty practice pool.

### R5 · P2 · Fossil ordering falls through the generic explanation adapter

`src/data/teacherPractice/science.js:100–104` catches level 3 fossil questions
through `correctConclusionIds` before their topic-specific branch at lines
114–117. Pupil sources omit the shuffled picture letters, while keys still
refer to “Picture A”, etc. Since those unseen letter permutations change the
answer and question fingerprint, visibly identical tasks survive deduplication.
With `count: 16`, `mix: "application"`, `rng: () => .37`, the fossil sheet has
16 IDs but only six distinct pupil prompt/source combinations. Run the fossil
ordering adapter before the generic explanation branch and verify deduplication
against the pupil-visible task as well as IDs.

### R6 · P2 · Fraction models truncate quantities greater than one

`src/pages/teachers/PracticeDataModel.jsx:17–19` always draws exactly
`bar.parts` cells, shading those whose index is below `bar.shaded`. The adapted
comparison pool contains 4/3 and 7/6, so their models draw only 3/3 and 6/6.
The optional diagrams contradict the written quantities and cannot justify the
key's answer. Render additional wholes for improper fractions, or omit an
unsupported model while retaining an answerable prompt. The new essential
maths-model test catches these two invalid bar records.

### R7 · P2 · Two component tests still assume the old unpaginated topic list

`tests/components/teacherPractice.test.jsx:16` and `:100` query the Column
Addition browse button immediately. It is outside the initial eight topics,
so both tests fail deterministically. For the deep link, assert the selected
topic chip or reveal the relevant browse results. For empty-state recovery,
search/reveal the topic before clicking. These are test defects, not evidence
that the working deep link or recovery UI crashes.

## Technical validation

| Check | Result |
|---|---|
| Full lint | Pass. |
| Production build | Pass; 70 public pages prerendered. Existing large-chunk warning remains. |
| Diff whitespace | Pass. |
| Focused Node tests from handoff | 25 passed, 2 failed: R4 and R6. |
| Focused teacher/parent/planner component tests from handoff | 50 passed, 2 failed: R7. |
| Full `npm test` | Unit stage: 2,837 passed, 10 failed, 4 skipped. It stops before components. Two failures are R4/R6, three are the previously recorded Year 6 English lesson/story-content failures in unchanged files, five are sandbox local-port errors. |
| Separate full component run | 997 passed, 3 failed: R7 twice and the previously recorded Year 6 English cohesion/punctuation timeout. |
| Targeted server rerun with local-port access | All 8 tests pass, including all five previously blocked checks. |
| Isolated Year 6 component rerun | Both tests pass. |
| SEO check with local-port access | HTTP verification passes for all 70 public URLs. Browser stage times out at `scripts/checkSeo.js:81`, expecting `🔢 Number Bonds`; the unchanged component renders `Number Bonds`. Later SEO browser assertions were not reached. |
| All question-model render audit | All 7,631 non-null models render without exceptions or `NaN`/`undefined` output under the router. This does not check semantic correctness. |

Logs are in `/tmp/bix-review-*.log` for this session. No existing failure was
treated as an expansion regression merely because it appeared in the full run.

## Content review

Reviewed adapter logic against its source schemas and relevant statutory topic
mapping rows. Independently audited every topic/mix for empty pools and broken
fields, and compared pupil-visible tasks for differing hidden answers. This
identified R1–R6. This is not an exhaustive teacher review of all 10,298 adapted
question records or certification of every answer/learning experience.

## Browser and print review

The in-app Node REPL/browser tools were unavailable. The existing repository
Playwright/Chrome setup worked with local-port access. One completed batched
pass covered Column Addition, Comparing Angles to a Right Angle, Poetry Forms,
Comparing and Grouping Rocks, How We Know About Prehistory, and Surveying Local
Land Use, at 1280px and 360px in both themes, with all support options enabled.

- All 24 screen cases had no horizontal document overflow and no page errors.
- Pupil-only, answer-only and combined print visibility worked with the answer
  preview selected; no measured page-content overflow in the checked sheets.
- All 18 generated desktop/light A4 PDFs matched the application's page counts.
- Representative screenshots and a rasterised PDF page were inspected.
- Artifacts: `/tmp/bix-review-layout/`; reproducible script:
  `/tmp/bix-review-layout.mjs`; measurements: `/tmp/bix-review-layout.log`.

Not browser-checked: every other topic/model combination, mixed-subject layout,
the changed parent-guide/briefing/signup layouts, exhaustive contrast, physical
devices or physical photocopies. Passing the representative layout checks does
not resolve the content findings or the incomplete SEO browser check.

## Disposition

Fix R1–R7 and rerun their affected checks before merge. Keep teacher/classroom
content review and physical print/device review separate from technical passes.

## Subsequent implementation

The [Years 1–6 expansion record](2026-11-11-all-years-practice-builder.md) records
implementation fixes and regression checks for R1–R7. The findings above describe
the original reviewed revision; they are retained as historical review evidence.
