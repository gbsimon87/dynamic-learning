# Years 3–4 English: bug and security review

Reviewed 2026-10-01: the branch's English implementation, its shared challenge,
speech, routing and progress paths, API ownership checks and dependency lockfile.

## Fixed findings

| Severity | Finding and trigger | Fix |
| --- | --- | --- |
| High | A failed progress read became an empty, hydrated document. The next completion could overwrite existing learner progress. | Fail closed, show a retry control, and refuse completion writes until a successful read. Only an explicit missing document starts empty. |
| High | Malformed successful API responses and unreadable local storage were treated as missing progress. Local quota failures were silently acknowledged. | Reject invalid JSON/documents, preserve corrupt collection contents, and surface save failures with retry. |
| High | Overlapping asynchronous saves could finish in reverse order, removing newer completions. A remount could read before the previous save finished. | Queue writes per child/year/subject within this app instance and await queued writes before reading. |
| Medium | API progress updates accepted missing or malformed data, including arrays and non-array completion fields. | Shared validation rejects malformed updates with HTTP 400 and validates reads. Unknown fields and historical numeric-string ids remain supported. No storage migration or unlock-rule change. |
| Medium | A direct challenge URL bypassed picker locks. Route or profile changes could briefly reuse an old challenge/completion panel. | Resolve access from the same existing lock state; key each run by child and route so old timers are cleaned up. |
| Medium | Rapid correct submissions in one React batch could schedule two advances and skip a question. | A synchronous submission gate rejects duplicate correct submissions and stale handlers. |
| Medium | Dictation required apostrophes without an apostrophe key. Hidden look-cover-write inputs still accepted physical keyboard events. | Enable apostrophe input and disable the answer while its model sentence is shown. |
| Medium | “girls’” versus “girl’s” sounded identical and both fitted the dictated sentence. Word-count hints counted comma/quote tiles as words. | Display explicit two-girl ownership context at every level and count word tiles independently of punctuation. |
| Medium | Real words such as “inpatient”, “vane” and “strait” were labelled misspelt in isolated sorting rounds. Valid adverb variants were also distractors. | Sort full sentences with explicit meanings; replace “franticly” and “publically” distractors. |
| Low | Some browsers emit no speech completion event on cancellation, leaving speech promises pending. Older speech requests could clear a newer button state. | Resolve cancellation explicitly and guard button updates by request identity. |
| Medium | `VITE_UNLOCK_ALL=true` also enabled the development bypass in production. | Require Vite's boolean `DEV` flag as well as the opt-in switch. |
| High/Moderate/Low | npm audit identified 15 affected packages: 11 high, 3 moderate, 1 low. Severity reflects published advisories, not demonstrated application exploitability. | Compatible updates via `npm audit fix --ignore-scripts`; no forced major upgrades or new application dependencies. Audit now reports zero known vulnerabilities. Vite is 7.3.6, React Router 7.18.4, Rollup 4.63.6. |
| Medium | Render pinned Node 22.11.0, below Vite's supported Node 22.12 minimum. | Pin [Node 22.23.3 LTS](https://nodejs.org/en/blog/release/v22.23.3) in Render and deployment instructions. No deployment performed. |

## Follow-up pass

A second pass found and fixed further cases in the existing shared paths:

| Severity | Finding and trigger | Fix |
| --- | --- | --- |
| High | Navigating away after a failed progress save discarded the hook's only copy. Switching child profiles could also discard failed or queued rewards snapshots. | Progress and rewards retain unacknowledged snapshots in session queues. Reopening a document retries its snapshot before reading older stored data. Queues are independent per document/child; no storage keys or document shapes were added. |
| High | Rewards still accepted missing or malformed API payloads as new documents, and local corruption/quota errors were silently ignored. A rewards HTTP 404 means an unavailable child, not a missing rewards document. | Require explicit `rewards:null` for a fresh document; reject malformed reads, acknowledgements and 404s. Local rewards reads/writes preserve unreadable collections and surface write failures. Server updates require an object payload. Historical v1/v2 rewards and unknown fields remain supported. |
| Medium | Failed remote logout was swallowed, making the app appear signed out while the HTTP-only cookie remained usable. | End the remote session before clearing local identity. A failure leaves the account visibly signed in and displays a retry message. The button is disabled during the request. Local mode retains its existing no-server sign-out behaviour. |
| Medium | Login/signup had no throttling before credential lookup or password hashing. | Shared per-account budget of 20 attempts per 15 minutes and per-process budget of 120 attempts per minute; HTTP 429 with `Retry-After`. Bounded hashed account keys, no dependency on forwarded IP headers, and readable retry messages on both auth pages. |

## Remaining backend risks

These application-wide concerns remain open:

- **Medium — distributed authentication abuse:** throttling is in memory per
  server process. Multiple instances and restarts do not share counters. Add
  coordinated service/proxy throttling before scaling public access; the
  application limiter is not a distributed denial-of-service defence.
- **Medium — concurrent documents and snapshots:** progress is still saved as
  whole snapshots. Separate browser tabs/devices can overwrite one another;
  this review's queue only orders writes inside one app instance. Progress
  upserts also lack a unique child/year/subject index in repository setup.
  The parent email index is explicitly non-unique. Audit existing duplicates
  before adding uniqueness constraints, and implement server-side completion
  merging or revision checks for simultaneous clients. No live database was
  modified during this review.
- **Boundary — local mode:** localStorage account data is controlled by anyone
  with browser access; it is not an authorization boundary. API mode checks the
  signed-in parent and child ownership before reading/writing child progress.

## Verification and limits

- ESLint, `npm test` and production build pass: **1016 tests pass, 1 skips**.
- All **260** English challenge components load and render through Vite/React
  without speech support. Dictation rendering explicitly checks that the
  apostrophe key exists and the hidden keyboard is disabled.
- Regression tests cover duplicate/stale submissions, speech cancellation and
  native errors, failed/malformed reads, ordered writes/remount reads, retries,
  storage corruption/quota, rewards response validation, navigation/profile
  retry retention, failed logout ordering, bounded authentication throttling,
  progress schema validation, contextual distractors,
  plural dictation context and production bypass prevention.
- Login, SignUp and ParentArea also load/render through Vite and React.
- Route regression coverage for malformed progress and rewards updates was added to the existing
  MongoDB suite. That suite is the skipped test because `MONGODB_URI` is unset;
  live database authorization/concurrency was not exercised.
- Terminal checks ran with the session's Node 25.9.0. The updated Render pin
  was checked against dependency engines and the official Node release;
  deployment and execution under that pinned runtime remain unverified.
- Browser tooling is unavailable. Both-theme visual review, real touch/keyboard
  playthroughs, route redirects, profile switching, hard-reload persistence and
  real-device speech need browser verification. Server rendering is an initial
  UI check, not an interactive browser pass.
- Unacknowledged snapshots are retained only for the current app session;
  closing/reloading the app before a successful save can still lose that work.
- The build retains its existing large main-bundle warning. An audit reporting
  zero known dependency advisories is not a guarantee of application security.
