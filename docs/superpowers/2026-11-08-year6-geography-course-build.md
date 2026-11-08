# Course build: Year 6 Geography

- Request and deliverable: complete Year 6 Geography Curriculum Mode pathway (16 topics, 64 challenge slots) on the current `feat/year6-history` branch.
- Timing record: `year6-geography` (`docs/authoring/timings/year6-geography.json`), finished with 0h 12m 43s recorded work.
- Measurement setup: Codex, current branch `feat/year6-history`; no branch was created because the owner explicitly asked to use the current branch.
- Token usage: unknown. The course-usage collector only found another agent's Claude Code logs on the shared branch; that result was discarded rather than attributing it to this Codex build.
- Statutory source: [key-stage-2-geography.md](../curriculum/key-stage-2-geography.md), whose Year 6 allocation is now made concrete below.
- Registry/entry points: new `(6, geography)` dataset and its normal curriculum selector, certificate and guide entries.
- Permanent IDs: settled before implementation; recorded in the statutory mapping.
- Year-award participation: `countsTowardYear: false` by owner instruction, preserving all existing awards.
- Existing recipe: Year 5 Geography's `GeographyChallenge`, pure sourced banks and illustrated evidence records.
- Visual baseline: illustrated field notes and visible map/data/evidence cards; large, sound-off controls in both themes.

| Topic ID | Four slots / lessons implemented | Technical evidence | Content/device review remaining |
|---|---|---|---|
| All 16 Year 6 topics | 64 wrappers, four evidence-card lessons each | Data bank, course and component checks pass | Physical touch, browser layout and child review |

Validation: `npm run lint` passes. `node --test src/data/year6GeographyCurriculum.test.js`, `npm run check:course -- --year 6 --subject geography --seeds 20`, `npx vitest run tests/components/year6Geography.test.jsx` and the affected registry/signup/award Node tests pass. `npm run build` passes and prerenders 68 public pages. The full `npm test` run has no Geography failure: five local HTTP tests cannot bind `127.0.0.1` in this sandbox, and the concurrently built Year 6 English lessons have existing lint failures. Those failures are outside this course's files.

Progress/award regression evidence: no stored shape, key, completion or unlock rule is changed; the new subject is explicitly outside the Year 6 award.

Remaining manual work: browser layout in both themes, child comprehension/enjoyment and physical-device touch/speech checks. The course uses the established Geography challenge layout; no new canvas, drag or map interaction was introduced.

Final status: implemented and technically validated at course scope. Content review checked the topic boundaries and evidence statements in the authored banks; specialist and owner/learner review remain pending. Device review remains pending.
