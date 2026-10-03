# Year 3 Science: final bug and security review

**Date:** 2026-10-03. **Scope:** the dirty Year 3 Science implementation, its
shared components, generators, enquiry reducers/hooks, 84 wrappers, registration,
practical activities and changes to the curriculum and celebration screens.
The other untracked curriculum reference documents contain no executable changes.

No confirmed exploitable security vulnerability was found in these changes.
`npm audit --json` reported **zero known vulnerabilities** across the installed
dependency tree. No dependency upgrade was required.

## Findings fixed

The five initial regression groups failed against the reviewed code and passed
after the fixes. A follow-up review also fixed the rock reset race below. These are validation and authored-data defects; the malformed array
cases exercise inputs that the current tile controls do not normally generate.

| Finding | Risk and reproduced behaviour | Fix |
|---|---|---|
| Sparse ordering answers | Low: `Array(n)` or an answer with a deleted index passed `every`, accepting missing tiles in Water Transport, Pollination, Muscles, Fossils and Sunlight message validators. | Validate every index using a dense copy. Reject holes, missing tiles, wrong order and unknown IDs. |
| Malformed surface samples | Low: a C3 task with duplicated sample A accepted an A record and an unrelated second key. Sorting also depended on the authored A/B order. | Require exactly one A and one B with whole measurements in the supported 0–60 cm range; determine the further sample by its actual ID. Reject array records. Reordering the samples preserves correct results. |
| Alternate plant-height syntax | Low: hexadecimal and exponent strings passed decimal-height recording through `Number(...)`. | Require decimal notation matching the supplied whole-cm measurement. Retain equivalent decimal values, positive signs, numeric values and surrounding whitespace; the existing three-character input limit remains. Reject array records. |
| Unused pole enquiry text | Low: C1–3 generated an unused explanation mentioning an “undefined magnet”. | Generate enquiry tiles and conclusion IDs only for C4. |
| Array-shaped magnet construction | Low: an array with named `left`/`right` properties passed the requested-arrangement checker. | Require an object record and reject arrays. Equivalent valid pole arrangements remain accepted. |
| Rock enquiry plan/reset race | Medium: the enquiry reducer rejected a stale reset, but the caller unconditionally cleared separate fair-plan flags. Plan state and observed/checked evidence could become inconsistent. | Put the fair plan and all enquiry stages in one revision/version-guarded reducer. Reset clears both atomically; stale callbacks preserve both; final completion requires the current approved plan. |

Regression coverage: [scienceReview.test.js](../../src/data/challenges/science/scienceReview.test.js), [rocksEnquiry.test.js](../../src/data/challenges/science/rocksEnquiry.test.js) and the existing rock enquiry tests, now using the actual runtime reducer.

## Security and progress checks

- Science content renders as React text and authored local SVG. Reviewed additions
  contain no injected HTML, evaluated strings, runtime source fetches or remote
  asset loading. Information-card markup payloads render as escaped text;
  existing Forces diagram checks also exercise literal markup in descriptions.
- Source URLs are metadata. Practical activities render authored text and require
  validated Year 3 Science identity plus strict all-four-slot completion.
- Challenge loading uses the existing build-time module whitelist; route parameters
  do not introduce arbitrary module or asset loading.
- The enquiry reducers and hooks retain prediction/observation/record/conclusion
  gates, revision/version guards, reset invalidation and single final submission.
  Existing tests cover rejected wrong answers, missing evidence, duplicate and stale
  transitions, resets, frozen completed work and equivalent valid constructions.
- Progress shape, identifiers, storage keys, hydration/profile guards, authentication,
  server ownership controls, reward authority and unlock rules are unchanged.
  Host screens remain the progress/reward writers. Regression tests cover the full
  Science path, numeric/idempotent completion, replay, earlier-category preservation,
  strict subject completion and Year 3 completion requiring Maths and English.

## Verification

| Check | Result |
|---|---|
| `npm run lint` | Passed. |
| `npm test` | **1,183 passed**, zero failures, one database-dependent skip (1,184 total). |
| `npm run build` | Passed; existing Vite large-chunk warning remains. |
| `npm audit --json` | Zero known vulnerabilities. |
| Actual Vite availability and original wrapper/shell renders | All **84** Science wrappers loaded and initially rendered without premature completion. |
| Enquiry-stage render matrix | **6,960** cases passed, with 9,720 reducer-prepared stage fixtures. Includes prediction, setup, individual observations, records, explanations, hints and locked controls. |
| Forces model renders | **677** distinct diagrams passed measurement/outcome and escaped-text checks. |
| Whitespace check | `git diff --check` passed. |

Repeat the stage and initial-render checks with:

```sh
node scripts/checkScienceChallenges.js
```

The [render script](../../scripts/checkScienceChallenges.js) uses real reducers
to prepare legitimate intermediate states and a temporary Vite SSR transform
to inject them into the hooks. It renders every question in each sampled run.
The Rocks fixture now passes a fair plan through the actual rock enquiry reducer;
it also renders the unapproved-plan stage. It writes diagnostic
HTML and errors to a new temporary directory and reports its path. It neither
reads nor writes learner data or calls application APIs. These fixtures check
rendering; they do not establish real event, timer or persistence behaviour.

Session logs: `/tmp/science-review-{lint,tests,build}.log`,
`/tmp/science-review-audit.json`, `/tmp/science-review-before.log`,
`/tmp/science-review-repeatable-render.log`,
`/tmp/science-review-initial-render.log`. Latest follow-up results:
`/tmp/science-review-followup-{lint,tests,build,render}.log`.

## Remaining verification

Browser controls were unavailable. Full playthroughs, keyboard/touch interaction,
phone layout, both themes, success timers, actual saves/reload/replay and profile
switches still need an interactive pass using disposable profiles.
The database-dependent ownership integration test skipped because `MONGODB_URI`
was unset; its authorization behaviour was not verified against a database in
this session. The review covers these changes and does not establish security
of the complete deployed application.

No commit, push or deployment was performed.
