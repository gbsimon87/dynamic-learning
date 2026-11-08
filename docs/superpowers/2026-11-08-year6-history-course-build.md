# Course build: Year 6 History

- Request and deliverable: new course, Year 6 History — a local history study and a British-history theme beyond 1066 (crime and punishment), plus change/cause/significance skills (owner chose History as the next subject, 2026-11-08). 20 topics / 80 challenges.
- Timing record: timer `year6-history` (`docs/authoring/timings/year6-history.json`): 15 min 38 s recorded work, 1 min 2 s paused, 16 min 41 s elapsed, 2 work sessions (wall time including AI/tool/test waits; not CPU or tokens).
- Measurement setup: Claude Code (VS Code extension). Coordinator model Sonnet 5.5; two Sonnet content subagents (strands A and B). Branch `feat/year6-history` (from `feat/year6-english`). A separate Claude session was building Year 6 Geography in the same working tree at the same time, so shared test/registry files were edited by both.
- Token usage: see the managed block at the end (collected with `course:usage`).
- Statutory source: [key-stage-2-history.md](../curriculum/key-stage-2-history.md), verbatim; the "Year 6 topic crosswalk" maps each topic to the statutory bullet ("a local history study"; "a study of an aspect or theme in British history that extends pupils’ chronological knowledge beyond 1066"; the aims' historical concepts).
- Registry/entry points: `{ year: 6, subject: "history", available: true, countsTowardYear: false }`; public guide `year-6-history` (guide count now includes it); certificate lines `6/history/*`; `HISTORY_AGE[6]` and `HISTORY_TITLES[6]` in the History engine; category icons in `CurriculumPage.jsx`; permanent IDs in `curriculumIds.test.js`.
- Permanent IDs: 5 categories / 20 topics (see test); Year 6 History titles approved by the owner's "do everything" instruction after the topic list was shown.
- Year-award participation: **owner decision 2026-11-08: Year 6 Maths, English and Science now count** (their `countsTowardYear: false` removed). Year 6 History stays `false`. No earned award can be lost: no Year 6 award could have been earned while all three were excluded. Tests updated (`curriculumRegistry.test.js`, Year 6 Maths/English/Science dataset tests).
- Existing recipe: Year 3–5 History data engine (`buildHistoryTopic`, story card + 5 rounds, answeredBy lint) with `lesson`/`detective`/`sort`/`order` helpers in `challenges/history/year6/authoring.js`.
- Visual baseline: illustrated story cards (emoji picture + label), timelines (`LOCAL_TIMELINE`, `CRIME_TIMELINE`, `BRITAIN_TIMELINE`) and pictured evidence cards. No new figure types or photographs; no hand-drawn scenes were added.
- Pilot topic: `what-is-local-history` (written by the coordinator, then used as the model in both agent briefs).

| Topic ID | Brief | Four slots implemented | Technical evidence | Content/device review remaining |
|---|---|---|---|---|
| what-is-local-history | local history method intro | 4/4 | lint, bank test, playthrough | content, device |
| maps-through-time | old/new maps (made-up Millbrook) | 4/4 | same | content, device |
| buildings-and-streets-as-evidence | building/street clues | 4/4 | same | content, device |
| census-photos-and-memories | census, photos, oral history | 4/4 | same | content, device |
| planning-a-local-study | enquiry steps | 4/4 | same | content, device |
| jarrow-and-the-venerable-bede | Jarrow worked example, AD 681–735 | 4/4 | same | **fact check**, content, device |
| palmers-shipyard-and-the-iron-ships | Jarrow worked example, 1851–1934 | 4/4 | same | **fact check**, content, device |
| the-jarrow-march-1936 | Jarrow worked example, 1936 | 4/4 | same | **fact check**, content, device |
| law-and-order-before-1066 | theme start, builds on Year 4 | 4/4 | same | content, device |
| norman-law-and-the-forest | Normans, Forest Law | 4/4 | same | content, device |
| magna-carta-and-trial-by-jury | 1215 | 4/4 | same | content, device |
| vagabonds-plots-and-the-poor-law | Tudor/Stuart | 4/4 | same | **sensitive**, content, device |
| highwaymen-and-the-bloody-code | 1700s | 4/4 | same | **sensitive**, content, device |
| transportation-to-australia | 1788–1868 | 4/4 | same | **sensitive**, content, device |
| peels-police | 1829 | 4/4 | same | content, device |
| prisons-and-reformers | prisons 1777–1908 | 4/4 | same | content, device |
| crime-fighting-today | fingerprints, DNA, courts | 4/4 | same | **sensitive** (death penalty), content, device |
| change-and-continuity | skills | 4/4 | same | content, device |
| cause-and-consequence | skills | 4/4 | same | content, device |
| who-and-what-mattered | skills | 4/4 | same | content, device |

Validation (final, one run after all content existed):
- `npm run lint`: pass.
- `npm run test:unit` (node --test): 2,738 of 2,743 pass; the 1 failure is `english Year 6: every topic has four lessons that pass the lint` (`src/data/lessons/lessons.test.js`) in the other session's Year 6 English lessons (title/sentence length limits), not in History.
- `npm run test:components` (vitest): all pass after the `curriculumSelect` Year 6 subject order was corrected (registry order is Maths, English, Geography, Science, History); the new `tests/components/year6History.test.jsx` (25 tests) plays all 20 topics × 4 levels with a wrong-answer retry, completion payload, rapid-tap and reopen checks.
- `npm run check:course -- --year 6 --subject history`: 20 topics, 0 failed.
- `npm run build`: pass.
- Browser: not used. There are no new figures or layouts; nothing was checked in a browser or on a device.

Progress/award regression evidence: no stored shape, key, ID or unlock rule changed. Award membership changed only by removing `countsTowardYear: false` from three Year 6 entries (asserted in tests); all built challenges stay open.

Remaining manual work: read the 20 banks as a teacher; fact-check the Jarrow topics and the reference URLs (written from memory, not fetched); read the sensitive topics (punishment, transportation, death penalty) yourself; try a topic on a phone/tablet. Wrong options in a few places read slightly padded or silly (added to counter answer-length bias). Both agents flagged: the four made-up example places/dates in the method topics are labelled as made up in the text.

Final status: implementation complete; technical validation passed except one unrelated Year 6 English lesson lint; content review, fact check and device review not done.

AI content and fact pass (2026-11-08, from model knowledge; no sources fetched, reference URLs not checked): all 20 banks read. Fixed: "juries began after 1215" (presentment juries date from 1166; trial juries replaced ordeals after 1215); Charles Palmer offered as a wrong answer to "Who was Jarrow's MP?" (he was its MP 1885–1907, so the question now says "in 1936"); Elizabeth Fry as a wrong answer to "visited many prisons and wrote a book" (she did both); "help for the poor depended on charity before 1601" (earlier Tudor poor laws existed); "Georgian houses came next" after Tudor (Stuart came between); Forest Law made hunting in royal Forests, not all hunting, a crime; jury of twelve limited to England and Wales; "last year's census" (none in 2025); Jarrow work returned through preparation for war, not "new ships". Plain-language glosses added for ordeal, trial by combat, Fourth Lateran Council, clause, parish, magistrate, ticket of leave, Home Secretary, Borstal, juvenile courts, beyond reasonable doubt, dedication, screw collier, Great Depression and petition. No security-relevant code: references are not rendered, no HTML injection, no progress shape changed. Teacher read and device review still outstanding.

## Completion measurement and retrospective

- Delivered scope: 20 / 20 topics built and checked; no lessons screens (History has none); picture-and-timeline recipe reused.
- Rework observed: one test-name regex missed "?"; the shared-test expectations for Year 6 subject order (written concurrently by the Geography session) needed correcting; one over-strong Forest Law claim softened; the Year 4-specific parts of the copied playthrough test were rewritten.
- Comparability: Year 5 History (22 topics) is the nearest; this build used the same engine with Sonnet agents.
- Next-build changes: (1) brief agents to avoid padding wrong options, since the longest-answer checker pushed them to add silly distractors; (2) when another session works in the same tree, run the shared-file tests early and agree who edits registry/count tests.
- Applied to shared workflow: none.

<!-- course-usage:start -->
## Recorded token usage

Tool: Claude Code. Branch: `feat/year6-history`.
Window: 2026-11-08T18:14:42.182Z to 2026-11-08T18:31:23.222Z (UTC).
Source files: `f308a263-e618-4e0e-ab28-3d101293f5b0.jsonl`, `f308a263-e618-4e0e-ab28-3d101293f5b0/subagents/agent-a6b92d5dddec7d5a9.jsonl`, `f308a263-e618-4e0e-ab28-3d101293f5b0/subagents/agent-a8b5472c421c87c69.jsonl`.
Counting: 215 usage rows → 109 unique messages; 106 duplicate rows removed.
Branch-filtered usage entries within the timer start/end window; global message-ID deduplication; per-counter maximum snapshot. Missing counters are unknown. No cost inferred.

| Model | Role | Messages | Input | Cache write | Cache read | Output |
|---|---|---:|---:|---:|---:|---:|
| claude-sonnet-5-5 | coordinator | 74 | 148 | 166,054 | 12,450,852 | 64,609 |
| claude-sonnet-5-5 | subagent | 35 | 70 | 259,431 | 3,337,222 | 141,441 |
| **Total** | | **109** | 218 | 425,485 | 15,788,074 | 206,050 |

- Only messages flushed to these logs by collection time are included.
- Messages before timer start, final reporting after timer stop, and unlogged activity are excluded.
- The outer timer window includes pauses; separate unrelated work onto another branch/session.
- Raw field values are kept separate; input/cache counters are not converted into costs or compared across tools.
<!-- course-usage:end -->
