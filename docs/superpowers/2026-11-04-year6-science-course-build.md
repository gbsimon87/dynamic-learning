# Course build: Year 6 Science

- Request and deliverable: a new course, the first Year 6 subject. The owner chose
  to build one subject end to end before deciding on the rest (2026-11-04).
- Timing record: timer `year6-science`, 23 min 21 s of work (report at the end).
  Token usage for Year 6 Science is in "Token usage" below.
- Statutory source: [year-6-science.md](../curriculum/year-6-science.md),
  verbatim. Its mapping table quotes the statutory bullet for each topic, and a
  script checked that every quoted bullet is in the file word for word.
- Registry/entry points:
  - `CURRICULUM_YEARS` and `CHILD_YEAR_GROUPS` now include 6.
  - Registry entry `{ year: 6, subject: "science" }`.
  - The public guide `year-6-science`.
  - Certificate lines `6/science/*`.
  - The year picker and signup offer Year 6 with Science only.
- Permanent IDs: 5 categories and 24 topics, chosen before shipping. They are
  locked in `curriculumIds.test.js`.
- Year-award participation (owner decision 2026-11-04): the Year 5 and Year 6
  awards are Maths, English and Science.
  - Year 5 History is now `countsTowardYear: false`. This only removes a
    requirement, so no child loses an earned award.
  - Year 6 Science stays `false` until Year 6 Maths and English exist. Year
    certificates are computed live, so a Science-only Year 6 award would
    otherwise be earned now and taken away later.
- Existing recipe: the Year 4/5 Science data engine (`buildTopic`, 5 questions ×
  4 levels) inside the adventure frame (`AdventureChallenge`), with Bix's notes
  and a topic picture.
- Visual baseline: the Year 5 Science figures, reused through
  `Year6ScienceVisual`, which hands every non-Year-6 type down to Years 5 and 4.
  The new figures are:
  - `circuitDiagram`: standard cell, bulb, buzzer, motor and switch symbols,
    never drawn lit.
  - `lightPath`: source → (object | mirror) → eye; rays always point at the eye.
  - `periscope`.
  - `shadow`: same-shaped shadow, or a "?" when asked.
  - `circulation`: the double loop.
- Pilot topic: Electricity (all four topics) was written first, then linted and
  checked for figures and repeats. The other four strands followed the same
  recipe in parallel.

| Strand | Topics | Four slots | Technical evidence | Content/device review remaining |
|---|---|---|---|---|
| Living things and their habitats | classifying-living-things, vertebrate-groups, invertebrate-groups, micro-organisms, classification-keys | 20 wrappers | bank lint, 20 seeds × 4 levels solvable, figure rules fire, course check | teacher read; keys followed by hand once |
| Animals, including humans | the-circulatory-system, the-heart-and-pulse, blood-and-blood-vessels, diet-exercise-and-health, drugs-medicines-and-lifestyle, transporting-nutrients-and-water | 24 wrappers | as above | safeguarding read of drugs-medicines-and-lifestyle by the owner |
| Evolution and inheritance | fossils-as-evidence, inheritance-and-variation, adaptation, adapting-to-extreme-places, evolution | 20 wrappers | as above | teacher read |
| Light | how-light-travels, how-we-see-things, mirrors-and-periscopes, shadow-shapes | 16 wrappers | as above | teacher read |
| Electricity | circuit-symbols, cells-and-brightness, comparing-components, switches-and-circuit-faults | 16 wrappers | as above, plus a jsdom playthrough | teacher read |

Validation:
- `check:course --year 6 --subject science --seeds 50`: 24 topics, 0 failed.
  It uses automatic bank adapters.
- `year6ScienceCurriculum.test.js`:
  - registry, mapping and certificate lines;
  - 96 wrapper files;
  - five fair, solvable, unrepeated questions per level;
  - figure types and rules;
  - circuits use only known symbols;
  - no parallel circuits;
  - award flags.
- `tests/components/year6Science.test.jsx`:
  - all 96 challenges open on Bix's notes with a picture and start their rounds, in both themes;
  - figure rendering, including the hidden shadow;
  - a full round with two wrong tries, a hint and a single `{ combos }` completion;
  - a sort through the real controls.
- Full `npm run lint`, `npm test` and `npm run build` pass. The build
  prerenders 63 public pages.
- One batched browser pass rendered the new figures and the topic pictures at
  1280 and 390 px wide, in both themes, then one confirmation pass. It fixed
  three things:
  - crowded switch labels;
  - a light-grey shadow in dark theme;
  - periscope walls crossing the ray.

  The challenge screens themselves were not opened in a browser.
- About 30% of choice answers are clearly the longest option, against 28% for
  Year 5 Science.

Progress/award regression evidence:
- Existing ID tests for all earlier pathways pass.
- Year 1–5 progress, stores and certificate tests pass unchanged.
- Tests that used Year 6 as "no curriculum" now use Year 7.

Remaining manual work:
- A teacher read of all 24 banks. The subagents flagged these simplifications:
  - a resting pulse of about 80 bpm;
  - pulse bands in the walking/running sort;
  - artery/vein direction without the pulmonary exception;
  - the textbook giraffe-neck story;
  - Wallace's study regions;
  - camel eyelashes and polar bear camouflage.
- An owner safeguarding read of *Drugs, Medicines and Lifestyle*: no illegal
  drugs, doses or methods; "tell a trusted adult" answers.
- Touch, speech and layout on physical devices.
- A child's experience.

Final status:
- **Implemented:** 24/24 topics, 96/96 challenges.
- **Technically validated:** as above.
- **Content reviewed:** coordinator spot review only (the drugs topic in full;
  heart and blood facts; answer-length cue); not a full teacher review.
- **Device reviewed:** no.
- Year 6 Maths, English and the other subjects are not registered.

## Token usage (Year 6 Science)

Source: Claude Code's local session logs (`~/.claude/projects/…/e6b2961a-5eb8-4aaf-bb8b-9800ec9d9ac5.jsonl`
and its two `subagents/*.jsonl`), not copied into the repository. Counted:

- entries on branch `feat/year-6` with a `message.usage`;
- from 00:24:29 to 00:48:01 UTC on 2026-11-04 (branch created; timer stopped).

The logs write one reply as several lines with identical usage. The raw sum
(238 lines) therefore counted most replies twice; each message ID is counted
once here (121 messages). The subagent logs do not overlap the main log.

| Model | Role | Messages | Input | Cache write | Cache read | Output |
|---|---|---:|---:|---:|---:|---:|
| claude-opus-5-5 | Coordinator: Electricity pilot, figures, integration, review, docs | 93 | 186 | 209,702 | 18,960,268 | 90,081 |
| claude-sonnet-5-5 | Two content agents: Living/Animals and Evolution/Light | 28 | 56 | 500,808 | 2,559,309 | 167,339 |
| **Total** | | **121** | **242** | **710,510** | **21,519,577** | **257,420** |

How to read these numbers:

- Input, cache write and cache read are preserved as separate raw log counters;
  no tool-independent total-input or cost figure is inferred from them.
- Opus and Sonnet tokens are not equal in cost.
- Excluded: the earlier `feat/improve-course-builds` docs work in the same
  session, and 8 later messages about usage reporting (16 input, 7,597 cache
  write, 2,336,684 cache read, 5,181 output).
- Covered: 24 verified topics (96 challenges).
- Not covered: the subagents' tool processes themselves, and any usage that is
  not logged per message.

## Timer report

```text
year6-science: finished
Recorded work: 0h 23m 21s
Paused time: 0h 0m 0s
Total elapsed: 0h 23m 21s
Work sessions: 1
Record: docs/authoring/timings/year6-science.json
Recorded unpaused wall time, including AI/tool/test waits; unrecorded breaks count as work. Not CPU time or token usage.
```
