# Course build: Year 6 computing

- Request and deliverable: new course (first of Computing → French → Music for Year 6)
- Timing record: timer `year6-computing`: recorded work 0h 11m 2s, paused 0h 3m 31s, elapsed 0h 14m 33s, 3 work sessions
- Measurement setup: Claude Code (VS Code), coordinator Opus 5.5, branch `feat/year6-computing` from `dev` @ bcac475
- Token usage: collected by course:usage (marked block below); input 124, cache write 143,479, cache read 9,045,212, output 67,061
- Statutory source: docs/curriculum/key-stage-2-computing.md (KS2, no year split; Year 5 mapping already recorded there)
- Registry/entry points: add `{ year: 6, subject: "computing", countsTowardYear: false }`
- Permanent IDs: approved 2026-11-09; locked in src/data/curriculumIds.test.js
- Year-award participation: false (Year 6 award stays Maths, English, Science)
- Existing recipe: src/data/year5ComputingCurriculum.js and its banks/tests
- Visual baseline: Year 5 Computing
- Pilot topic: Programming Projects strand (4 topics, 16 slots), renderer reused from Year 5 (Year5ComputingVisual)

## Progress log

- 2026-11-09: branch + timer created; Year 5 topics and KS2 gaps reviewed; topic list proposed; waiting for approval.

- 2026-11-09: owner approved topic list. Integrated dataset, registry (countsTowardYear: false), certificate lines (all 17), public guide (unbuilt areas say "Coming soon"), Year 6 mapping table in key-stage-2-computing.md, ID test, guide/select/signup counts. Built Programming Projects pilot.
  - Owned files: src/data/year6Computing*.js, src/data/challenges/year6Computing/{index,figures,programming}.js, src/pages/skills/computing/challenges/year6/**, tests/components/year6Computing.test.jsx.
  - Pilot corrections: sort cards must have unique trimmed labels (duplicate "turn fan off" left a bin empty); removed an Odd/Even bug with two defensible fixes; no blank lines in programs.
  - Checks: node --test year6ComputingCurriculum/curriculumIds/curriculumGuides/signupFlow/curriculumRegistry pass; vitest year6Computing, curriculumSelect, curriculumGuides, year5Adventure pass (52); check:topic PASS x4; eslint on touched files clean. Full lint/test/build pending.

- 2026-11-09: built the remaining 13 topics (physical.js, algorithms.js, data.js, online.js); 52 slots of wrappers added.
  - Corrections: 3 level-3 pools had too few distinct questions (controlling, databases, searching), so I added templates; the code-picture rule now applies only to topics that show programs; the sensor prompt was reworded; an unsafe-message order was simplified so it has one clear sequence (stop, tell an adult, block and report together).
  - Checks: check:course 17/17 PASS; npm run lint PASS; npm run build PASS; npm test 2782 pass / 3 fail. All 3 failures already fail on dev: the Year 6 English year-6-word-list-part-1 lesson lint and 2 tests in src/data/stories.test.js.
  - Docs: CURRICULUM_INVENTORY (38 pathways / 906 topics / 3,624 slots), PROJECT_IDEAS, PROJECT_KNOWLEDGE, CHANGELOG. Note: docs/CHANGELOG.md already contained committed stash-conflict markers from bcac475; I left them in place.

## Final status

- Implementation: complete, 17/17 topics and 68/68 slots.
- Technical validation: complete, apart from the 3 failures that already exist on dev.
- Content review: not done. A teacher should read every bank, especially the Online World safety topics.
- Browser/device review: not done. Program-block pictures for longer programs and the text tables in Databases and Spreadsheets have not been seen in a real browser.

## Retrospective

- Delivered scope: 17 planned, 17 built, 17 verified automatically.
- Rework observed: duplicate trimmed sort-card labels left a bin empty; too few level-3 templates in 3 topics; figure rules that never fired. Each was caught by the bank and figure tests and fixed in one rerun.
- Comparability: Year 5 Computing is the nearest build (same engine). This build used no subagents.
- Next-build changes: (1) add at least 6 templates at level 3 before running the tests, because 3 of 13 topics had too few; (2) give a figure rule only to topics whose questions show programs.
- Applied to shared workflow: none.

## Recorded token usage

Tool: Claude Code. Branch: `feat/year6-computing`.
Window: 2026-11-09T11:28:41.424Z to 2026-11-09T11:43:15.349Z (UTC).
Source files: `fe32214f-d222-41de-aaa7-3fb9d8148f8a.jsonl`.
Counting: 123 usage rows → 62 unique messages; 61 duplicate rows removed.
Branch-filtered usage entries within the timer start/end window; global message-ID deduplication; per-counter maximum snapshot. Missing counters are unknown. No cost inferred.

| Model | Role | Messages | Input | Cache write | Cache read | Output |
|---|---|---:|---:|---:|---:|---:|
| claude-opus-5-5 | coordinator | 62 | 124 | 143,479 | 9,045,212 | 67,061 |
| **Total** | | **62** | 124 | 143,479 | 9,045,212 | 67,061 |

- Only messages flushed to these logs by collection time are included.
- Messages before timer start, final reporting after timer stop, and unlogged activity are excluded.
- The outer timer window includes pauses; separate unrelated work onto another branch/session.
- Raw field values are kept separate; input/cache counters are not converted into costs or compared across tools.
<!-- course-usage:end -->
