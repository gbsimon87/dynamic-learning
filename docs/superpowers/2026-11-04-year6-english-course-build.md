# Course build: Year 6 English

- Request and deliverable: Build the complete Year 6 English Curriculum Mode pathway for Learn with Bix (31 topics and 124 challenge slots). An initial count of 32 was corrected before implementation: the approved five strands total 31.
- Timing record: earlier `year6-english` evidence was unavailable on 2026-11-06. This resumed build used fresh timer `year6`, now finished at 10m 37s (`docs/authoring/timings/year6.json`). Previously reported 21m 18s remains historical evidence; do not sum discontinuous records.
- Measurement setup: Codex coordinator (GPT-5; reasoning setting not exposed), branch `feat/year6-english`; Codex session usage is not supported by `course:usage`, so final token usage will be recorded as unknown with that coverage limitation.
- Token usage: Unknown. `course:usage` is for Claude Code JSONL only and must not be used to infer Codex usage.
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
| `hyphens-in-words` | [Topic brief](../authoring/year6-english-hyphens-in-words.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), focused lint, bank test and retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| `synonyms-and-antonyms` | [Topic brief](../authoring/year6-english-synonyms-and-antonyms.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), focused lint, bank test and four-slot playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `active-and-passive-voice` | [Topic brief](../authoring/year6-english-active-and-passive-voice.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test and retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| `formal-structures-and-the-subjunctive` | [Topic brief](../authoring/year6-english-formal-structures-and-the-subjunctive.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test and retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| `expanded-noun-phrases-for-information` | [Topic brief](../authoring/year6-english-expanded-noun-phrases-for-information.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test and retry/hint/completion playthrough | Browser layout, touch device and content/owner review |
| `the-letter-string-ough` | [Topic brief](../authoring/year6-english-the-letter-string-ough.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test against Appendix 1 data and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `confusing-word-pairs` | [Topic brief](../authoring/year6-english-confusing-word-pairs.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test against the Year 6 homophone pairs and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `year-6-word-list-part-1` | [Topic brief](../authoring/year6-english-year-6-word-list-part-1.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test of every word against the statutory list and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `year-6-word-list-part-2` | [Topic brief](../authoring/year6-english-year-6-word-list-part-2.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), bank test of every word against the statutory list and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `cohesive-devices-across-paragraphs` | [Topic brief](../authoring/year6-english-cohesive-devices-across-paragraphs.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `ellipsis` | [Topic brief](../authoring/year6-english-ellipsis.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `layout-devices` | [Topic brief](../authoring/year6-english-layout-devices.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `semicolons-colons-and-dashes` | [Topic brief](../authoring/year6-english-semicolons-colons-and-dashes.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `punctuation-in-lists` | [Topic brief](../authoring/year6-english-punctuation-in-lists.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `bullet-point-punctuation` | [Topic brief](../authoring/year6-english-bullet-point-punctuation.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| `hyphens-to-avoid-ambiguity` | [Topic brief](../authoring/year6-english-hyphens-to-avoid-ambiguity.md) | Yes / 4 lessons | Topic checker (four slots × 50 seeds), semantic bank test and four-slot completion playthroughs (retry/hint on slot 1) | Browser layout, touch device and content/owner review |
| Composition and Editing (6 topics) | [Group brief](../authoring/year6-english-composition-and-editing.md) | Yes / 24 lessons | Five deterministic 30-seed topic checks, specialised dictation bank test/structure check and choice/sort/tile/sound-off focused playthroughs | Browser layout, touch device and content/owner review |

Validation: focused lint passed for all changed source/test files. Every built topic's bank passes its deterministic four-slot validation; the composition quest passed five explicit 30-seed topic checks, its bank and registration tests, a choice/sort/tile retry-hint-completion playthrough, and a sound-off dictation-route check. Dictation's specialised response model has its own bank test; the generic checker is explicitly structure-only for that topic. `git diff --check` passed. Full lint, full test and build were run after the course became complete; broader existing API/public-page test failures must be resolved separately before release.

Progress/award regression evidence: No progress, persistence, unlock or award code changed. The new curriculum is explicit `countsTowardYear: false`; registry, signup and selector tests prove Year 6 now offers Maths, English and Science without changing the award membership.

Remaining manual work: Owner pilot playthrough; later child-experience, physical-touch/speech-device and content review for every topic.

Final status: All 31 Year 6 English topics and 124 slots are playable. Progress, persistence, unlock rules and the staged Year 6 award exclusion are unchanged. Technical, content and device review limits remain open.

## Completion measurement and retrospective

- Delivered scope: 31-topic registered/mapped course; 11 built topics, each with four lessons and four slots.
- Rework observed: A focused bank test caught identical sort/build prompt wording; prompts were made distinct before the pilot check passed.
- Comparability: The Year 6 Science record is a useful workflow reference, but it is not a like-for-like English build.
- Next-build changes: Pending pilot evidence.
- Applied to shared workflow: None needed yet.
