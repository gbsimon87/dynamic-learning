# Year 4 History bug and security review

Reviewed 2026-10-12 after completing the 18-topic / 72-challenge pathway.
Scope: all 505 authored templates and 72 story cards, wrappers and loader paths,
shared History rendering, source assets, question controls, completion callbacks,
progress/profile boundaries and certificate/year-award integration.

## Fixed findings

| Severity | Finding and trigger | Result |
| --- | --- | --- |
| Medium | Completing an excluded History subject while Maths, English and Science were complete could announce/award the year again. `ProblemView` checked only the other subjects, ignoring the current subject's `countsTowardYear: false`. | The completion screen now checks the registry's existing year-award eligibility. Years 2 and 4 History still earn their own subject awards; Year 3 History and Year 4 Science retain their year awards. No award requirements or stored IDs changed. |
| Low | Lindisfarne Challenge 2 asked what came after the monastery's founding; all three options occurred afterwards. | It now asks what was made, with one answer supported by the card. |
| Low | Lindisfarne Challenge 4's correct answer was the malformed phrase “an shocked Christian communities”. | The answer is “it shocked Christian communities”. |
| Low | Roman withdrawal Challenge 2 referred to faded bands that the UI displays as an “Earlier” line. | The story and prompt now describe the actual timeline. |
| Low | A known source image whose network request/decoding failed had no recovery control. | The shared source renderer now shows its description and a retry button, retaining credits. Changing sources resets the failure state. All History years benefit. |

## Security conclusions

No confirmed exploitable vulnerability was found in the Year 4 implementation.

- Questions, story lines, SVG labels and credits render through React text nodes;
  neither the new content nor its renderer uses HTML injection, evaluation or
  executable user content. A markup-shaped payload regression renders as text.
- Source images are bundled WebP files resolved through a build-time glob and
  manifest, not URLs supplied by a learner. The three new sources have pinned
  SHA-256 digests and permitted licences; the existing image tests check files,
  format, attribution and byte budgets. Runtime lesson content does not fetch
  the reference websites or remote museum images.
- Route parameters resolve through the static challenge-module map and the
  normal curriculum lock state. Wrappers have fixed topic/level props. Invalid
  and locked routes cannot write completions through the completion handler.
- The shared progress hook keeps hydration/document-identity guards and ordered,
  merging saves. Progress remains scoped by child, year and subject; replays
  remain idempotent. Completion timers are cleaned up on unmount; synchronous
  submission gating rejects duplicate advances.
- API progress routes retain session authentication and child ownership in the
  database query. API write-origin protection, JSON/prototype-key validation and
  production CSP remain unchanged and covered by existing security tests.
- `npm audit --json` returned **zero known dependency vulnerabilities** on
  2026-10-12. No dependency or lockfile update was needed.

Local mode remains a browser-owned data store, not a boundary against someone
who controls that browser. Live database ownership/concurrency was inspected in
code but not exercised against production or a MongoDB service.

## Verification

- `npm run lint`, `npm test` and `npm run build` pass: **1,670 unit tests** and
  **225 component tests**, zero failures. Four database-dependent checks skip
  because `MONGODB_URI` is unset. The existing large-chunk build warning remains.
- Exhaustive template checks cover all 505 authored questions, every wrong
  choice, incorrect sorting and reversed chronology, correct responses,
  shuffle endpoints and absence of mutations to shared topic data. Existing
  100-seed checks, permanent IDs, wrappers, progress cascades and certificates
  continue to pass.
- Component regressions verify rapid correct taps cannot skip questions or
  duplicate completion, leaving during the final success delay cancels the
  callback, wrong sort/order responses do not advance, and markup-shaped text
  cannot inject an image/event handler. Source failures retain descriptions
  and credits, retry successfully and reset when the source changes.
- Award integration tests exercise the real completion screen, progress hook,
  other-subject reads and milestone calculation. Excluded Years 2/4 History do
  not re-award the year; included Year 3 History and Year 4 Science still do.
  A separate Chrome run confirms the final History subject award when all three
  required Year 4 subjects are already complete, preserving those documents.
- Isolated Chrome played **all 72 real routes** in sequence with normal locks,
  wrong-answer retries/hints, story reopening, sorting and real keyboard
  ordering. Both themes at 320/390 px passed contrast/overflow checks; all source
  images decoded. Reload and replay retained exactly 72 numeric completions,
  with no duplicates, uncaught page errors or changes to pre-existing Maths.
- Additional real-browser checks reject eight locked, invalid, mismatched and
  prototype-key routes without writes; confirm wrong answers never advance;
  recover from a failed image with an inspected descriptive fallback in both
  320 px themes; switch to another child without inheriting progress/unlocks;
  and leave corrupt progress untouched across reload.
- A separate Chrome regression completes/reloads/replays the first History
  topic while preserving all **15 other implemented curriculum progress
  documents** unchanged. All browser fixtures use synthetic accounts in isolated
  storage, `VITE_USE_API=false`, `VITE_UNLOCK_ALL=false` and localhost-only
  requests. No seed script or live account/database was used.
- `git diff --check` passes. Changes preserve topic/category IDs, stored progress
  shape and keys, numeric completion IDs, unlock rules and year-award membership.

Physical-device touch and read-aloud voice review remain separate from this
desktop/headless-browser pass. No deployment or commit is part of this review.
