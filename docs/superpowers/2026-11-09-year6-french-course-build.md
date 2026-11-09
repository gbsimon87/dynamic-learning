# Course build: Year 6 French

- Request and deliverable: new course; owner delegated every decision (quest names, topics, content) to the agent on 2026-11-09
- Timing record: timer `year6-french` (see final status)
- Measurement setup: Claude Code (VS Code), coordinator Opus 5.5, two Sonnet content agents, branch `feat/year6-french` @ f559e09; another AI session worked on unrelated files on the same branch at the same time
- Statutory source: docs/curriculum/key-stage-2-languages.md (KS2, no year split; Year 6 mapping table added)
- Registry/entry points: added `{ year: 6, subject: "french", countsTowardYear: false }`
- Permanent IDs: chosen 2026-11-09 by the agent under owner delegation; locked in src/data/curriculumIds.test.js
- Year-award participation: false (Year 6 award stays Maths, English, Science)
- Existing recipe: Year 5 French banks, shared `fr`/`vocab` helpers and Year5FrenchVisual renderer (reused)
- Visual baseline: Year 5 French scene pictures
- Pilot topic: Listening and Sounds strand (3 topics, 12 slots)

## Topic choice

Year 6 picks up the KS2 bullets Year 5 recorded as "left for Year 6": listening and joining in, songs/rhymes/poems, pronunciation and intonation, presenting, dictionary use, describing in writing and comparing French with English grammar, plus high-frequency verbs (vouloir, pouvoir, devoir, aller + infinitive) and possessives. Speaking aloud cannot be assessed on screen; those bullets are served by choosing sounds, tunes and sentences, with an optional French voice.

## Progress log

- 2026-11-09: integrated dataset, registry, certificate lines, public guide, mapping table, ID/signup/select/guide counts, 68 wrappers, subject test and playthrough test. Built the Listening and Sounds pilot (bank lint and figure checks pass). Briefed two Sonnet agents: Conversations + Describing; Grammar + Reading and Writing.
- 2026-11-09: agents returned all 14 topics. Coordinator review: corrected two lines of "Il pleut, il pleut, bergère" (sur le feuillage; Voilà l'éclair qui luit); answer-length cue 0–30% per topic (reading-longer-texts highest at 30%, matching earlier baselines); one unused-variable lint fix.
  - Checks: check:course 17/17 PASS; Year 6 French node tests 5/5; vitest year6French, curriculumSelect, curriculumGuides 51/51; npm run lint PASS (after fix); npm run build PASS; npm test 2789 pass / 3 fail — the same Year 6 English lesson-lint and two stories.test.js failures recorded before this build.
- 2026-11-09 (second pass): coordinator reread every generated question and the reading texts. Fixed: an ambiguous typed answer (vous vs tu form) in following-instructions, a broken English prompt ("Your classmates all open your books"), "Ding, daing, dong" to "Ding, dang, dong", "The letters gn says" grammar, and an ambiguous Il/Elle build ("un chat … Elle") in writing-about-myself. Rechecked: Year 6 French node tests 5/5, check:course 17/17, eslint clean.

## Final status

- Timer `year6-french`: recorded work 0h 20m 31s, paused 0h 0m 0s, elapsed 0h 20m 31s.
- Implementation: complete, 17 topics / 68 challenges.
- Technical validation: as above. No browser pass: no new figure types (the Year 5 French renderer is reused).
- Content review: pending (French teacher review of all banks, especially texts and dictionary entries).
- Device review: pending.

<!-- course-usage:start -->
## Recorded token usage

Tool: Claude Code. Branch: `feat/year6-french`.
Window: 2026-11-09T13:04:57.442Z to 2026-11-09T13:25:29.129Z (UTC).
Source files: `30c4876b-4532-4029-a7f1-8bd574068034.jsonl`, `30c4876b-4532-4029-a7f1-8bd574068034/subagents/agent-a184ab52ba3e449d0.jsonl`, `30c4876b-4532-4029-a7f1-8bd574068034/subagents/agent-aa0b5029bb8022f9d.jsonl`.
Counting: 175 usage rows → 93 unique messages; 82 duplicate rows removed.
Branch-filtered usage entries within the timer start/end window; global message-ID deduplication; per-counter maximum snapshot. Missing counters are unknown. No cost inferred.

| Model | Role | Messages | Input | Cache write | Cache read | Output |
|---|---|---:|---:|---:|---:|---:|
| claude-opus-5-5 | coordinator | 35 | 70 | 66,660 | 4,299,049 | 35,989 |
| claude-sonnet-5-5 | subagent | 58 | 116 | 436,808 | 6,955,179 | 229,008 |
| **Total** | | **93** | 186 | 503,468 | 11,254,228 | 264,997 |

- Only messages flushed to these logs by collection time are included.
- Messages before timer start, final reporting after timer stop, and unlogged activity are excluded.
- The outer timer window includes pauses; separate unrelated work onto another branch/session.
- Raw field values are kept separate; input/cache counters are not converted into costs or compared across tools.
<!-- course-usage:end -->
