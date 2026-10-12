# History, Years 1–4: project tracker

**Start here to resume.** Branch: not created yet (all work so far is docs on `dev`, uncommitted).
**Last updated:** 2026-10-12.
**Current milestone:** Year 1 History complete (Plan 2) and counted toward the Year 1 certificate. Next: the Year 2 plan.
**Built:** Year 1: 14 of 14 topics, 56 of 56 challenges. Years 2–4: specs only. Branch `feat/history-curriculum`.

## Resume point

Next: owner plays Year 1 → History → Then and Now → Toys Then and Now (all four
challenges) and reviews it. Then write Plan 2 (Year 1 topics 2–14) from what the review
changes. No product code before a plan is approved.

Things a successor must not miss:

- Topic titles become permanent progress keys once a year ships.
- `history` must be added to `CHILD_SUBJECTS` (`src/data/childFields.js`) as well as
  `CURRICULUM_SUBJECTS`, and `server/signup.test.js` uses `"history"` as its
  invalid-subject example, which has to change.
- Each year is registered with `countsTowardYear: false` until all its topics ship;
  remove the flag in the plan that finishes the year.
- Build topics strictly in dataset order and release a topic's four challenges together;
  an earlier slot added late can re-lock later progress.
- The engine reuses `DataChallenge` and `questionKinds.js`; don't build a parallel one.

## Years

| Year | Ages | Source | Units | Topics | Spec | Status |
|---|---|---|---|---|---|---|
| 1 ✅ | 5–6 | KS1 | Then and now, the first flight, explorers, kings and queens, clues around you | 14 | [year-1-design-spec.md](year-1-design-spec.md) | Spec approved |
| 2 | 6–7 | KS1 | Living memory, Great Fire of London, nurses, people who changed things, days we remember, history near you | 17 | [year-2-design-spec.md](year-2-design-spec.md) | Spec approved |
| 3 | 7–8 | KS2 | Stone Age to Iron Age, Roman Britain, first civilisations and Ancient Egypt | 22 | [year-3-design-spec.md](year-3-design-spec.md) | Spec approved |
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

Later plans: Plan 2 (Year 1 topics 2–14), then one per year, each after the previous pilot review.

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
| Implementation plans | In progress | Plan 1 approved and built 2026-10-12. Plan 2 after the pilot review. |
| History registration and engine | Implemented | Subject, profile allowlist, looks, story-card engine with answerability lint, image pipeline, credits. Unit + component tests. |
| Year 1 build | Complete; owner review pending | Plan 2 (2026-10-12): 13 more topics written to the [authoring brief](plans/year-1-topic-authoring-brief.md), 8 more public-domain pictures. Headless Chrome played all 56 in order from fresh progress, both themes, 320 px, no console errors, 56 numeric completions saved. Earlier pilot evidence: | Dataset (14 topics), KS1 mapping, certificate lines; Toys Then and Now 4/4 challenges. Browser: all four played in headless Chrome through the real controls (2026-10-12): story reopen, hint after two misses, completion, saved progress, both themes, 320 px; no console errors. |
| Year 2 build | Not started | |
| Year 3 build | Not started | |
| Year 4 build | Not started | |
| Full regression and browser verification | Not started | `npm run lint`, `npm test`, `npm run build`, both themes, phone width, saved progress. |

## Log

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
