# History, Years 1–4: project tracker

**Start here to resume.** Branch: not created yet (all work so far is docs on `dev`, uncommitted).
**Last updated:** 2026-10-12.
**Current milestone:** Plan 1 written (foundation + Year 1 pilot); awaiting owner review of the plan. All five specs approved 2026-10-12.
**Built:** 0 years, 0 topics, 0 challenges. History is not registered as a subject yet.

## Resume point

Next: write the implementation plan(s), get owner approval, then build. No product code
before a plan is approved.

Things a successor must not miss:

- Topic titles become permanent progress keys once a year ships.
- `history` must be added to `CHILD_SUBJECTS` (`src/data/childFields.js`) as well as
  `CURRICULUM_SUBJECTS`, and `server/signup.test.js` uses `"history"` as its
  invalid-subject example, which has to change.
- Build topics strictly in dataset order and release a topic's four challenges together;
  an earlier slot added late can re-lock later progress.
- The engine reuses `DataChallenge` and `questionKinds.js`; don't build a parallel one.

## Years

| Year | Ages | Source | Units | Topics | Spec | Status |
|---|---|---|---|---|---|---|
| 1 | 5–6 | KS1 | Then and now, the first flight, explorers, kings and queens, clues around you | 14 | [year-1-design-spec.md](year-1-design-spec.md) | Spec approved |
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

| [Plan 1](plans/2026-10-12-plan-1-foundation-and-year-1-pilot.md) | Register History, engine, image pipeline, Year 1 dataset, pilot topic Toys Then and Now. Stops for owner review. |

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
| Implementation plans | In progress | Plan 1 written 2026-10-12; awaiting owner review. |
| History registration and engine | Not started | Done with whichever year is built first. |
| Year 1 build | Not started | |
| Year 2 build | Not started | |
| Year 3 build | Not started | |
| Year 4 build | Not started | |
| Full regression and browser verification | Not started | `npm run lint`, `npm test`, `npm run build`, both themes, phone width, saved progress. |

## Log

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
