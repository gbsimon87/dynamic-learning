# History, Years 1–4: project tracker

**Start here to resume.** Branch: `feat/history-curriculum`.
**Last updated:** 2026-10-12.
**Current milestone:** Year 3 finalised, verified and included in its year award.
Year 4 is the next unbuilt year.
**Built:** Year 1: 14/14 topics, 56/56 challenges. Year 2: 17/17 topics, 68/68
challenges. Year 3: 22/22 topics, 88/88 challenges. Year 4: approved spec only.

## Resume point

**Year 3 finalised on 2026-10-12 at the owner’s request to finish it off.** All
Year 3 work and verification are complete, including the approved year-award
change. Saved in the local commit `feat(history): complete Year 3 History` on
`feat/history-curriculum`. No deployment was made. Year 4 remains unbuilt; start
it only on the owner’s next instruction.

The owner authorised **"let's complete all of year 3"** after the pilot.
[Plan 5](plans/2026-10-12-plan-5-complete-year-3-history.md) completes all remaining
21 topics in permanent dataset order, with four real wrappers per topic. All
22 topics / 88 challenges are implemented, with source images and certificate
statements. Next implementation: the approved Year 4 spec when requested.
Physical-device touch/read-aloud review remains useful; no further pilot gate
blocks Year 3 delivery.

The owner approved Year 3 History counting toward the overall Year 3 award on
2026-10-12. Year 3 now requires **Maths, English, Science and History**; the
`countsTowardYear: false` flag has been removed for Year 3. Year 1 already counts;
Year 2 remains outside its year award pending its own approval. Saved progress,
reward records and challenge unlocking are unchanged.

Things a successor must not miss:

- Topic titles become permanent progress keys once a year ships.
- Subject registration, profile allowlist and invalid-subject test updates are already done.
- Keep a new year's History outside its year award until fully built and the owner approves inclusion.
- Build topics strictly in dataset order and release a topic's four challenges together;
  an earlier slot added late can re-lock later progress.
- The engine reuses `DataChallenge` and `questionKinds.js`; don't build a parallel one.

## Years

| Year | Ages | Source | Units | Topics | Spec | Status |
|---|---|---|---|---|---|---|
| 1 ✅ | 5–6 | KS1 | Then and now, the first flight, explorers, kings and queens, clues around you | 14 | [year-1-design-spec.md](year-1-design-spec.md) | Complete; counts toward Year 1 award |
| 2 ✅ | 6–7 | KS1 | Living memory, Great Fire of London, nurses, people who changed things, days we remember, history near you | 17 | [year-2-design-spec.md](year-2-design-spec.md) | Complete; owner review pending |
| 3 | 7–8 | KS2 | Stone Age to Iron Age, Roman Britain, first civilisations and Ancient Egypt | 22 | [year-3-design-spec.md](year-3-design-spec.md) | Complete; counts toward Year 3 award |
| 4 | 8–9 | KS2 | Anglo-Saxons and Scots, Vikings and Anglo-Saxons | 18 | [year-4-design-spec.md](year-4-design-spec.md) | Spec approved |

## Documents

| Document | Purpose |
|---|---|
| [shared-design-spec.md](shared-design-spec.md) | Everything the years share: learning model, engine, tone, images, accuracy, registration, testing, delivery. |
| Year specs (table above) | Each year's units, topics, level design and age settings. |
| [Key stage 1 History source](../curriculum/key-stage-1-history.md) | Statutory text, verbatim. Its mapping section must record the Years 1–2 split. |
| [Key stage 2 History source](../curriculum/key-stage-2-history.md) | Statutory text, verbatim. Its mapping section must record the Years 3–6 split. |
| [Key stage 3 History source](../curriculum/key-stage-3-history.md) | Reference only: where these periods lead next. |
| [Project knowledge](../PROJECT_KNOWLEDGE.md) | Shared architecture and current implemented state. |
| [Year 3 Science tracker](../science-curriculum/y3-science-tracker.md) | Reference pattern for a full subject build. |

| [Plan 1](plans/2026-10-12-plan-1-foundation-and-year-1-pilot.md) | Register History, engine, image pipeline, Year 1 dataset, pilot topic Toys Then and Now. |
| [Plan 2](plans/2026-10-12-plan-2-year-1-topics-2-to-14.md) | Year 1 topics 2–14, with the [authoring brief](plans/year-1-topic-authoring-brief.md). |

| [Plan 3](plans/2026-10-12-plan-3-year-2-history.md) | Complete Year 2: 17 topics, 68 challenges, sources, chronology and local activities. |

| [Plan 4](plans/2026-10-12-plan-4-year-3-foundation-and-pilot.md) | Year 3 foundation and How We Know About Prehistory pilot. |
| [Plan 5](plans/2026-10-12-plan-5-complete-year-3-history.md) | Complete the remaining 21 Year 3 topics and all 88 challenges. |

Later plans: Year 4.

## Decisions locked on 2026-10-12

- **Scope:** History for Years 1, 2, 3 and 4. All four specs before any implementation plan.
- **KS1 split:** every statutory strand in both Years 1 and 2, Year 2 deeper. Local
  history is taught as "how to find history near you", since the app can't know where a
  child lives. Bruegel and Lowry are not used (Lowry's paintings are in copyright).
- **KS2 split:** Year 3: Stone Age to Iron Age; Roman Britain; earliest civilisations
  (overview plus Ancient Egypt). Year 4: Anglo-Saxons and Scots; the Viking and
  Anglo-Saxon struggle. Greece, a non-European society, the local study and the
  "beyond 1066" theme are left for Years 5–6, which aren't planned.
- **Specs:** shared spec and all four year specs approved, including every topic list
  (Y1 14, Y2 17, Y3 22, Y4 18) and every tone sentence.
- **Visuals:** CC0 or public-domain images only, with every licence recorded, plus drawn
  SVG scenes, maps, timelines and portraits.
- **Teaching model:** every challenge opens with a "Bix explains" story card, read aloud,
  and every question can be answered from it.
- **Tone:** honest but gentle; hard things named plainly in one short sentence, no
  gore, no graphic images, "how do we know?" framing.
- **Build approach:** one shared engine: a story-card phase in front of the existing
  `DataChallenge`, with topics authored as data. (Refined 2026-10-12 from a planned
  standalone engine after finding `DataChallenge` already covers choice, sort and order.)
- **Tracker:** this file is kept current after each topic and at every pause.

These decisions are approved. Ask again only when new evidence creates a material change.

## Open for owner review

Nothing open. All specs approved 2026-10-12.

## Milestones

| Milestone | Status | Evidence / next action |
|---|---|---|
| Source documents | Complete | KS1, KS2 and KS3 History checked word for word against the DfE PDFs and the gov.uk page. KS2 structure fixed; KS3 added. |
| Shared spec | Approved 2026-10-12 | |
| Year 1 spec | Approved 2026-10-12 | |
| Year 2 spec | Approved 2026-10-12 | |
| Year 3 spec | Approved 2026-10-12 | |
| Year 4 spec | Approved 2026-10-12 | |
| Implementation plans | Plans 1–5 implemented | Years 1–3 complete. Year 4 remains. |
| History registration and engine | Implemented | Subject, profile allowlist, looks, story-card engine with answerability lint, image pipeline, credits. Unit + component tests. |
| Year 1 build | Complete; owner review pending | Plan 2 (2026-10-12): 13 more topics written to the [authoring brief](plans/year-1-topic-authoring-brief.md), 8 more public-domain pictures. Headless Chrome played all 56 in order from fresh progress, both themes, 320 px, no console errors, 56 numeric completions saved. Earlier pilot evidence: | Dataset (14 topics), KS1 mapping, certificate lines; Toys Then and Now 4/4 challenges. Browser: all four played in headless Chrome through the real controls (2026-10-12): story reopen, hint after two misses, completion, saved progress, both themes, 320 px; no console errors. |
| Year 2 build | Complete; owner/device review pending | All 17 topic banks, 68 wrappers, certificate lines and KS1 mapping. Five public-domain source images, three original SVG practice visuals, timeline bands and untracked local activities. |
| Year 3 build | Complete; device review pending | 22 authored topic banks, 88 wrappers, KS2 crosswalk, certificate statements and licensed sources. See verification below. |
| Year 4 build | Not started | |
| Full regression and browser verification | Passed for Years 1–3 | Year 3: lint, full tests and build; all 88 challenges completed through actual controls, both themes and phone widths, reload/replay and unchanged pre-existing Maths progress. Year 2: lint, tests and build; all 68 challenges played through the real controls in Chrome, light/dark and 320/390 px, reload, idempotent replay and an unchanged pre-existing Maths progress document. Physical-device touch/voice review pending. |

## Year 2 topic delivery

All four challenges are implemented for every topic, in dataset order. Each level
has five questions, at least seven templates, three choice options and story/source
answerability checks. Unit validation uses 100 seeds per level; component tests play
all 68 runs including retries, hints, story reopening and the completion payload.

| Category | Topics | Challenges | State |
|---|---:|---:|---|
| Changes Within Living Memory | 2 | 8 | Built |
| The Great Fire of London | 4 | 16 | Built |
| Nurses Who Made a Difference | 4 | 16 | Built |
| People Who Changed Things | 3 | 12 | Built |
| Days We Remember | 2 | 8 | Built |
| History Near You | 2 | 8 | Built |

## Year 2 verification (2026-10-12)

- `npm run lint` and `npm run build` passed. Build retains the existing large-chunk warning.
- `npm test`: 1,648 unit tests and 173 component tests passed, zero failed.
  Four MongoDB-dependent suites skipped because `MONGODB_URI` was unset.
- Every topic passes the History story/evidence lint and the question-kind lint
  over 100 seeds per level. Dataset IDs, all 68 loader paths, three choices,
  retry hints, completion payload, locks and protected year-award membership tested.
- Isolated headless Chrome, browser-only local store, no live backend or seed:
  all 68 real challenge routes completed using answer buttons, sorting and keyboard
  reordering; wrong answers stay on the question, two misses reveal hints, story
  reopening retains answers. Themes alternate, with 320/390 px checks and source
  screenshots reviewed. All 68 numeric completions saved; reload preserved them;
  replay did not duplicate progress; the existing Maths document stayed byte-for-byte
  unchanged. No uncaught page errors.
- Practice maps and plaque inspected in both themes. Their figures render once
  when the story reopens. New images inspected against their captions and alt text.
- Live contrast measured in Chrome: story text 17.28:1 light / 11.18:1 dark;
  start-button text 5.46:1 light / 10.79:1 dark. Timeline has no page overflow at 320 px.
- Pending: physical-device touch and read-aloud voices, owner content review,
  and a decision on including History in the Year 2 year award.

## Year 3 delivery

| Category | Planned topics | Topics built | Challenges built |
|---|---:|---:|---:|
| Stone Age to Iron Age | 6 | 6 | 24/24 |
| Roman Britain | 8 | 8 | 32/32 |
| The First Civilisations | 8 | 8 | 32/32 |

All 22 topics are implemented in permanent dataset order. There are **88 story
cards and 617 authored templates**, using five rounds per run, at least seven
per-level templates, choices/sorting/vertical ordering and source detective work.
The four levels develop key facts, chronology, source limits and historical
reasoning. British period bands and event labels avoid date arithmetic. The
civilisation overview orders beginnings without claiming the civilisations ran
one after another; their developments overlapped.

The pilot's CC0 flint hand axe is joined by 16 inspected, pinned CC0/public-domain
images: museum artefacts, four British site photos and Harry Burton's 1922 tomb
photo. Site photos are modern; foreign finds are labelled with their origins;
royal art cannot represent everyone's life. No uncovered bodies are shown.
The existing image pipeline verifies hashes, encodes ≤800 px / ≤120 KB WebPs,
and preserves unrelated assets with targeted downloads. Credits use the manifest.

Automated checks pass: all topic banks over seeded runs, all 88 computed wrappers,
all 88 complete component runs, retries/hints and exactly-once completion payloads,
plus numeric progression, category cascades and idempotent replay. The full suite
passes **1,658 unit tests** (four MongoDB-dependent skips) and **197 component tests**.
Lint and production build pass. See the full-year verification below.
Physical-device touch/read-aloud review remains pending. Year 3 year-award
inclusion was approved and applied on 2026-10-12.

## Year 3 full-year verification (2026-10-12)

- `npm run lint`, `npm test` and `npm run build` passed: 1,659 unit tests and
  197 component tests passed; four MongoDB-dependent tests skipped because
  `MONGODB_URI` was unset. The existing large-chunk build warning remains.
- Story/evidence and question-kind validation covers every bank over 100 seeds
  per level. All 88 loader paths and complete component runs pass, including
  hints, retries, story reopening and exactly-once completion. Progress tests
  cover numeric completions, all three unit cascades, replay and protected awards.
- All 22 source cards loaded in both actual app themes at 390/320 px, with decoded
  images and no horizontal page overflow. Source screenshots were reviewed for
  readability, image detail, credits and gentle treatment of burial beliefs.
- The Trophy Room exposes 22 topic certificates, three quest certificates and
  the Year 3 History subject certificate. All topic and subject dialogs opened
  with populated achievement statements and no page errors; the pre-existing
  Maths progress document remained unchanged.
- All 88 real challenge routes completed in dataset order through actual choice
  buttons, sort bins and keyboard ordering, with normal curriculum locks enabled.
  Isolated browser storage and localhost-only requests kept the live backend and
  real learner data untouched (`VITE_USE_API=false`, `VITE_UNLOCK_ALL=false`).
  The browser run resumed from 29 verified completions after increasing keyboard
  automation waits to allow drag animations to finish; no app workaround was needed.
- Checks covered two wrong answers and hints, story reopening without losing an
  answer, source/timeline rendering, 320/390 px and both themes, no horizontal
  page overflow and no uncaught page errors. Measured story contrast was 17.28:1
  light / 11.18:1 dark; start-button text 5.46:1 light / 10.79:1 dark.
- A complete replay of Challenge 1 added no duplicate completion. Reload preserved
  exactly 88 numeric completions (`[1, 2, 3, 4]` for every topic); the pre-existing
  Year 2 Maths progress document remained unchanged throughout.
- Physical-device touch and read-aloud voices remain for device review.

## Year 3 pilot verification (2026-10-12)

- `npm run lint`, `npm test` and `npm run build` passed. Tests: 1,658 unit
  and 176 component tests passed; four MongoDB-dependent suites skipped because
  `MONGODB_URI` was unset. Existing large-chunk build warning remains.
- Story/evidence and question-kind lints over 100 seeds per level; ID locks,
  all 22 mapping rows, certificate lines, the four loader paths, missing later
  wrappers, locks, numeric completions and protected year awards tested.
- Component tests open all four wrappers and play every full pilot run, with
  wrong answers, hints, story reopening and exactly one completion payload.
  The component order control is mocked for jsdom; real keyboard order is
  covered by Chrome.
- In-app Node/browser controls were unavailable. The installed Playwright/Chrome
  tooling loaded the actual routes in isolated browser storage, with only local
  requests allowed, `VITE_USE_API=false` and `VITE_UNLOCK_ALL=false`. All four
  challenges were completed through actual buttons, sort bins and keyboard
  reordering; themes alternate at 320/390 px. Wrong answers do not advance;
  two misses reveal hints; story reopening retains selected answers. No page
  overflow or uncaught page errors. Source and timeline screenshots inspected.
- Reload preserved all four numeric completions; a full replay of Challenge 1
  did not duplicate progress. A pre-existing Year 2 Maths document stayed unchanged.
  Later topics show Coming soon. Both timeline/source themes were screenshot-reviewed.
- Live Chrome contrast: story text 17.28:1 light / 11.18:1 dark; start-button
  text 5.46:1 light / 10.79:1 dark, above the 4.5:1 target.
- Pilot review gate superseded by the owner’s instruction to complete Year 3.
  The remaining 21 topics are now complete under Plan 5. Physical-device touch,
  read-aloud voices remain for device review; Year 3 year-award inclusion is
  now approved and applied.

## Log

- **2026-10-12** Owner requested “finish it off” after the pause. Finalised the
  Year 3 handoff and saved the completed curriculum, sources, tests, approved
  award inclusion and documentation in `feat(history): complete Year 3 History`.
  All checks remain green; no application code changed after verification.
  No deployment or Year 4 implementation was made.

- **2026-10-12** Owner explicitly approved History counting toward the overall
  Year 3 award. Removed only Year 3 History’s `countsTowardYear: false` flag.
  The Year 3 certificate and year-completion milestone now require Maths,
  English, Science and History. Saved progress, existing reward records and
  unlock rules are unchanged; Year 2’s separate exclusion remains.
  Verified the final History completion in isolated Chrome: the unfinished
  subject blocked the year certificate; finishing it earned the year badge/count
  and a certificate naming all four subjects. Reload and replay preserved 88
  numeric History completions and exactly one year award; earlier Maths and
  other subjects stayed unchanged. Lint and build passed; the full suite passed
  1,659 unit and 197 component tests (four database-dependent skips).
  Owner then requested a pause; no Year 4 work has started.

- **2026-10-12 — pause/resume checkpoint:** Plan 5 is complete. All Year 3
  History topics and challenges are built and verified; no Year 3 implementation
  or automated/browser checks remain. Resume from this tracker and
  `docs/PROJECT_KNOWLEDGE.md`. The next unbuilt year is Year 4, whose spec is
  approved; begin its implementation only when requested. Device touch/read-aloud
  review and explicit Year 2 year-award inclusion remain separate review items.
  Year 3 History now counts toward its year award on the owner’s approval.
  Changes are in the working tree; no commit or deployment was made.
- **2026-10-12** Plan 5: owner authorised all of Year 3. Completed the remaining
  21 topic banks and 84 wrappers, bringing Year 3 to 22/22 topics and 88/88
  challenges. Added 16 licensed, inspected source images alongside the pilot
  hand axe; 88 story cards and 617 templates. Updated the KS2 crosswalk,
  certificate statements, project knowledge and backlog. Full tests passed
  (1,658 unit, 197 component; four database-dependent skips), lint and build
  passed. Chrome completed every challenge, verified all source cards in both
  actual themes, checked certificates, replay and reload. Existing Maths progress
  and year-award requirements are preserved.

- **2026-10-12** Plan 4: Year 3 foundation and How We Know About Prehistory pilot
  built on the owner's instruction to start Year 3. All 22 approved titles mapped
  and locked; first topic 4/4 real wrappers, later topics Coming soon. Added the
  explicitly Egyptian CC0 flint hand axe and named KS2 period bands. Added targeted
  image rebuilds after Wikimedia rate-limited an unrelated old source; older
  asset files and manifest entries are unchanged. Owner pilot review is the next
  delivery step under shared spec §10, then Stone Age Hunter-Gatherers.

- **2026-10-12** Plan 3: all Year 2 topics built using the existing History engine.
  Keeping in Touch Then and Now is the pilot; all 68 wrappers load and all 68
  component runs complete. Added five pinned public-domain sources; checked their
  actual visible details (Edith's portrait has a lace collar, not a nurse cap).
  Original maps and plaque are explicitly practice drawings. Local activities also
  appear after topic completion and never gate progress. Year 2 remains outside its
  year award pending owner review. The 320 px Chrome check reproduced the existing
  navbar overflow; controls now wrap at the narrowest width at their full touch size,
  and the hidden offset uses the measured navbar height.

- **2026-10-12** Owner decisions: Year 1 History counts toward the Year 1 certificate
  (`countsTowardYear: false` removed; the mechanism stays for Years 2–4 while each is
  partly built); photo credits keep their dates. Quick pass: no years or false
  absolutes in Year 1 content; fixed the photo showing twice when the story is reopened
  on a photo round, focus falling to the top of the page after "Let's go!", and story
  lines keyed by text.

- **2026-10-12** Plan 2: Year 1 finished on the owner's instruction (no separate pilot
  review). Topics 2–14 written by four parallel agents to the authoring brief, each
  passing `scripts/check-history-topic.mjs`; reviewed for truth and tone. Time bands
  aligned to the spec (Victorian = "long ago"; Elizabeth I and Columbus = "long, long
  ago"), including the toys pilot's level 4. All tests, lint and build green; all 56
  challenges played in headless Chrome. `countsTowardYear: false` kept until the owner
  decides (see Plan 2). Photo credits under pictures show dates (e.g. "about 1588"),
  although Year 1 teaching text has none; flagged for the owner.

- **2026-10-12** Final review fixes: (1) Year 1 History is registered with
  `countsTowardYear: false`, so children who finished Year 1 Maths, English and Science
  keep their year certificate and award; **remove the flag when all 14 Year 1 topics
  ship** (same for each later year). (2) Toys Then and Now rewritten: today's
  grandparents had plastic and battery toys, so levels 1–2 now contrast wood, tin and
  marbles with apps and screens, and order toy trains by kind (wind-up, battery, app);
  level 4 compares with the 1850s photos. (3) "Read it to me" no longer reads photo credits.

- **2026-10-12** Plan 1 built on `feat/history-curriculum` (7 tasks, tests green). Browser
  check in headless Chrome with the local store and locks on (the `.env` points at the real
  MongoDB, so neither the API nor the seed was used): all four pilot challenges played,
  progress saved across reload, photos and credits shown, dark theme and 320 px checked, no
  console errors. At 320 px the page scrolls sideways by 13 px, caused by the navbar on
  every page (same on Science and /curriculum), not by History; left for a separate fix.

- **2026-10-12** Plan 1 written. Findings while planning: Year 1 Science's `makeQuestion` is
  reused for rounds; `sips` cannot write WebP, so images are encoded in headless Chrome
  (the Science scripts' pattern); the Met API is offline (HTTP 410), Cleveland Museum of
  Art open access works; registering History for a year makes that year's award wait for
  History too (existing rule, as when Science was added).

- **2026-10-12** Owner approved everything: shared spec, all four year specs, topic lists and
  tone sentences. Moving to implementation planning.

- **2026-10-12** Year 1 and Year 4 specs drafted. Added the plain-letters rule for titles
  (`toKebabCase()` would turn "Æthelred" into `thelred`). All 71 proposed titles checked
  for clean, unique IDs.

- **2026-10-12** Scope widened to Years 1–4, all specs before plans. KS1 split and
  Year 4 units approved. Found `DataChallenge` already provides the round types, so
  the engine is now a story-card phase in front of it. Split shared material into
  `shared-design-spec.md`; slimmed the Year 3 spec; drafted the Year 2 spec. Tracker
  renamed from `y3-history-tracker.md` and Year 3 spec from `DESIGN_SPEC.md`.
- **2026-10-12** Owner approved approach A (shared engine) and the 22 Year 3 topics.
  Year 3 spec written.
- **2026-10-12** Checked the History sources before starting. KS1 was correct. KS2 had
  the right words but five statutory requirements sat inside non-statutory example lists
  and the last three had lost their bullets; rebuilt and re-verified against the PDF.
  Added KS3 for reference. Owner chose the Year 3 units, visuals, story-card model and
  tone, and asked for this tracker.
