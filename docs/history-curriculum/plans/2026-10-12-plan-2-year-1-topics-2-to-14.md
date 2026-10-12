# History Plan 2: Year 1 topics 2–14

**Goal:** finish Year 1 History: the remaining 13 topics (52 challenges), so all 14
topics and 56 challenges are playable.

**Spec:** [shared-design-spec.md](../shared-design-spec.md),
[year-1-design-spec.md](../year-1-design-spec.md). Builds on Plan 1's engine, image
pipeline and pilot. Owner instruction (2026-10-12): finish Year 1 on the current branch,
`feat/history-curriculum`.

## Tasks

1. **Pictures.** Pin eight public-domain images from Wikimedia Commons (Library of
   Congress Photochrom prints, the 1903 first-flight photo, NASA Apollo 11 photos,
   portraits of Elizabeth I and Queen Victoria) in `scripts/history-assets/sources.json`;
   run the pipeline; `historyImages.test.js` must pass. Homes, School, Street Names and
   Columbus use drawn (emoji) pictures: there is no open-licence photo, and the 1960s–70s
   "then" objects are still in copyright.
2. **Per-topic check script.** `scripts/check-history-topic.mjs <file>` runs the History
   lint, `lintBuild` over 100 seeds, answer acceptance and no-repeat checks on one file.
3. **Content.** Write the 13 topic files under `src/data/challenges/history/year1/` to
   [year-1-topic-authoring-brief.md](year-1-topic-authoring-brief.md), in four parallel
   groups (Then and Now; flight and the Moon; explorers and local clues; kings and
   queens). Each file passes the check script and ESLint.
4. **Review the content.** Read every story card and question for truth, tone and
   whether the named words really answer it; fix in place.
5. **Register.** Add all 13 to `src/data/challenges/history/year1/index.js` in dataset
   order; generate the 52 wrappers with the computed names; extend
   `year1History.test.js` so every dataset topic must have a builder; extend the
   component test to load all 56 wrappers.
6. **Verify.** `npm run lint`, `npm test`, `npm run build`; headless Chrome plays all 56
   challenges from fresh progress through the real controls, both themes, 320 px; no
   console errors.
7. **Record.** Tracker, `PROJECT_KNOWLEDGE.md`, `PROJECT_IDEAS.md`; commit.

## Decision left to the owner

`countsTowardYear: false` on Year 1 History was to be removed when all 14 topics ship
(Plan 1 review fix). Removing it makes the Year 1 certificate need History, so a child
who already finished Maths, English and Science would see that certificate disappear
until they finish History. The flag stays until the owner chooses.
