# Course build: Year 6 English

- Request and deliverable: Build the complete Year 6 English Curriculum Mode pathway for Learn with Bix (31 topics and 124 challenge slots). An initial count of 32 was corrected before implementation: the approved five strands total 31.
- Timing record: `year6-english`; paused after the second built topic on 2026-11-05 with 21m 18s recorded work (three sessions; 10m 39s paused time; 31m 57s elapsed at report).
- Measurement setup: Codex coordinator (GPT-5; reasoning setting not exposed), branch `feat/year6-english`; Codex session usage is not supported by `course:usage`, so final token usage will be recorded as unknown with that coverage limitation.
- Token usage: Pending timer stop. `course:usage` is for Claude Code JSONL only and must not be used to infer Codex usage.
- Statutory source: `docs/curriculum/year-5-and-6-english.md`, the Years 5/6 English programme, Appendix 2 and its documented Year 5/Year 6 split; `docs/curriculum/english-appendix-1-years-5-and-6.md`; spoken language requirements in `docs/curriculum/english-spoken-language-years-1-to-6.md`.
- Registry/entry points: Year 6 English is registered in `curriculumRegistry.js`, child/signup and selector lists, certificate skills and the public guide. The guide labels unbuilt topics “Coming soon”.
- Permanent IDs: Approved and locked in `curriculumIds.test.js`; the 31-topic statutory mapping is in `docs/curriculum/year-5-and-6-english.md`.
- Year-award participation: Preserve the existing Year 6 award membership while staged. The new registry entry will be explicit `countsTowardYear: false`; do not enable it without an owner decision once Maths, English and Science are all complete.
- Existing recipe: Year 5 English dataset, English lessons, English game/bank contract and tests (to inspect before the pilot).
- Visual baseline: Year 5 English illustrated Bix lessons, worked examples and English question visuals; both themes, large touch targets and sound-off play.
- Initial pilot topic: `formal-and-informal-vocabulary`: four generic English visual/control wrappers, an authored four-slot bank, four Bix lessons and a retry/hint/completion playthrough.

| Topic ID | Brief | Four slots / lessons implemented | Technical evidence | Content/device review remaining |
|---|---|---|---|---|
| `formal-and-informal-vocabulary` | [Pilot brief](../authoring/year6-english-formal-and-informal-vocabulary.md) | Yes / 4 lessons | Topic checker, bank lint over 30 seeds, four wrappers, retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| `adding-endings-to-fer` | [Topic brief](../authoring/year6-english-adding-endings-to-fer.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), focused lint, bank test and retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| Other 29 approved IDs | Mapping complete | No; unavailable | Registry/ID/certificate/guide coverage only | All implementation and review |

Validation: focused lint passed for all changed source/test files; `npm run check:topic -- --year 6 --subject english --topic formal-and-informal-vocabulary --builder src/data/challenges/authored/year6/english/formal-and-informal-vocabulary.js --export buildFormalAndInformalVocabulary` passed (four slots × 50 seeds); focused Node suites passed (59 tests) and focused Vitest suites passed (47 tests). `git diff --check` passed. Full lint, full test, build and `check:course` remain pending until the complete course is ready.

Progress/award regression evidence: No progress, persistence, unlock or award code changed. The new curriculum is explicit `countsTowardYear: false`; registry, signup and selector tests prove Year 6 now offers Maths, English and Science without changing the award membership.

Remaining manual work: Owner pilot playthrough; later child-experience, physical-touch/speech-device and content review for every topic.

Final status: Two Year 6 English topics are playable; 29 topics remain explicitly unavailable. Focused technical checks pass; content and device review remain open.

## Completion measurement and retrospective

- Delivered scope: 31-topic registered/mapped course; 1 built pilot with four lessons and four slots.
- Rework observed: A focused bank test caught identical sort/build prompt wording; prompts were made distinct before the pilot check passed.
- Comparability: The Year 6 Science record is a useful workflow reference, but it is not a like-for-like English build.
- Next-build changes: Pending pilot evidence.
- Applied to shared workflow: None needed yet.
