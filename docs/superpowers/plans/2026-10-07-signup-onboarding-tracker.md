# Sign-up onboarding — implementation tracker

**Start here to resume.** Original branch: `feat/onboarding`. Follow-up: PROJECT_IDEAS #37.

| Document | What it is |
|---|---|
| [Spec](../specs/2026-10-07-signup-onboarding-design.md) | What we're building and why — screens, look and feel, server, errors, testing. |
| [Plan](2026-10-07-signup-onboarding.md) | Twelve tasks with the code, tests and commands for each. |
| This file | What's done, what's next, and every decision made along the way. |

**Last updated:** 2026-10-09 · **Status:** all 12 tasks and the review fix round implemented; automated/scoped review passes · **Next:** interactive browser checks below (browser tools unavailable in the fix session)

## ▶ Resume here

The original whole-branch review ([final review](2026-10-07-signup-onboarding-final-review.md)) said **"ready to merge with fixes"**. All code fixes below are now implemented in the working tree (2026-10-09); see the scoped re-review appended to that review. No merge or deployment was performed. Interactive verification still needs a session with browser tools.

| ID | Fix | Where | Test to add |
|---|---|---|---|
| **C1 (critical)** | The email-shape regex backtracks quadratically: one ~1 MB request can freeze the server for 20–30 min. Reject emails over 254 chars before the regex, and use a linear pattern, e.g. `/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/`. | `shared/emailAddress.js` | `"a@" + ".".repeat(50000) + "@"` returns false in a few ms; existing shape tests still pass. |
| **I1** | A failed send (502) keeps `lastSentAt = now`, so an immediate retry gets 429 "I've just sent one" although no email went out. In the hash-filtered failure update, restore `lastSentAt` to the value read (or `new Date(0)` for a first send); the send still counts towards 5/hour. | `server/routes/signup.js` (`/code` failure path) | Send fails → retry at once → 200. |
| **I2** | Code step has no **Try again** after a network error / `SIGNUP_FAILED` (spec §7). When six digits are filled, an error shows and the code wasn't marked wrong, show a 64 px "Try again" button that calls `complete(code)`. | `src/pages/auth/signup/steps.jsx` (`CodeBody`), `SignUpFlow.jsx` | Browser check. |
| M1 | After the hand-over, Back returns to a blank sign-up: `navigate(destinationFor(child), { replace: true })`. | `SignUpFlow.jsx` | — |
| M2 | Remove `autoFocus` from the email input (focus goes to the heading; it can flash the iOS keyboard). | `steps.jsx` | — |
| M5 | Resend `fetch` has no timeout: add `signal: AbortSignal.timeout(10_000)`. | `server/email.js` | Optional: a fetch that never resolves rejects. |

**Fix status:** C1/I1/I2/M1/M2/M5 implemented. Optional M3 (minute countdown) and M4 (shrinking code boxes) are also implemented. I1 additionally guards updates with the previously read count/hash to prevent stale failed retries rewinding the hourly count; losers inspect whether a usable code still exists before answering `CODE_RECENTLY_SENT`.

**I3 implemented:** verification is already live. `/code` now caps requests at ten per client per hour, using `req.ip` with one trusted proxy hop on Render and no trusted headers locally. Client keys are hashed, bounded and temporary. The Mongo-backed daily send-attempt budget defaults to 90 (`SIGNUP_EMAIL_DAILY_LIMIT`), resets at UTC midnight, counts failed/time-out calls and survives restarts/multiple workers. Separate production/dev databases have independent budgets; allocate their combined limits within the provider quota. Verification-off mode always warns at boot. Provider status is retained in diagnostics; raw error bodies were deliberately excluded because they may expose email addresses or codes.

**Route fixture repair completed separately:** rejected legacy progress payloads now use valid trees with numeric completions, and the logout check uses its own session so later child/reward tests stay authenticated. No production progress, rewards, storage shape or unlock rules changed. The database-backed route suite now passes.

**Validation, 2026-10-09:** lint and production build pass. Full `npm test` runs against disposable local MongoDB with no skips; final counts are recorded in the scoped review. Sign-up regressions cover hostile emails on both endpoints, failed first/resends, failed-send caps, stale retry races, proxy spoofing and budget denial. The budget suite covers parallel reservations, limiter recreation and day rollover. A stalled fake provider times out. Vite SSR loads and renders `CodeBody`, checking transient retry, invalid/expired exclusions, busy disabling and minute countdown. Built `/signup`, its JS asset and `/api/health` are checked over local HTTP. These are render/HTTP checks, not interactive browser evidence.

**Remaining interactive checks:** failed send → immediate retry; network completion error → retained digits → Try again; `SIGNUP_FAILED` retry → expired code → new code; client/hourly/daily limits; hand-over then browser Back; email/code heading focus and keyboard retry; 320/375/1440 px in light/dark themes. Browser and Node REPL controls are unavailable in this session. Existing Task 11 evidence below remains historical and does not close these new checks.

**Running the tests:** unit `npm test`; server tests need a MongoDB — the owner's `.env` has `MONGO_URI`, but the server reads `MONGODB_URI` (+ optional `MONGODB_DB`). A throwaway local one: `mongod --dbpath /tmp/dl-mongo --port 27018 --fork --logpath /tmp/dl-mongo.log` then `MONGODB_URI=mongodb://127.0.0.1:27018 node --test 'server/*.test.js'`.

## How to keep this file

After each task: set its status, paste the commit hash and date, and write anything that went differently from the plan under **Notes** (and in the decisions log if it changes a rule). Never delete a row — a skipped or reverted task says so. Update **Last updated**, **Status** and **Next** at the top.

Status values: ⬜ Not started · 🟡 In progress · ✅ Done · ⏸ Blocked · ↩︎ Reverted

## Tasks

| # | Task | Status | Commit | Date | Notes |
|---|---|---|---|---|---|
| 1 | Shared email helpers; `subjects` on child profiles; `normaliseNewChildren` | ✅ | c46bcd1 | 2026-10-07 | Existing "narrowed to writable fields" test gained `subjects` in its input (it compares against `EDITABLE_CHILD_FIELDS`). |
| 2 | Pure flow logic: `signupFlow`, `signupCopy`, `passwordStrength` | ✅ | 1f1bdc0, 90c7249 | 2026-10-07 | Review fix: added `withCursor` (clears the edit-return flag), the saved draft drops `birthYear` and is never written for under-13, a year change that empties subjects re-asks them. |
| 3 | Server codes (`signupCodes.js`) and mailer (`email.js`) | ✅ | 1a3e013 | 2026-10-07 | As planned. Hardening ideas (fetch timeout, boot log when off) left for the final review. |
| 4 | `pendingSignups` + `POST /api/auth/signup/code` | ✅ | 417add0, f7161b7 | 2026-10-07 | Review fix: the database write now decides who may send (10 parallel requests had sent 7 emails). Separate startup message if index creation fails. |
| 5 | `POST /api/auth/signup/complete` | ✅ | 291c75b, 923d447 | 2026-10-07 | Review fix: each guess reserves an attempt before the code is compared (parallel guesses had exceeded five, and could create a verified account). Rollback failures are logged; the rollback test now writes a child before failing. |
| 6 | Client data path: stores, `AuthContext`, `track()` | ✅ | 3032ef3 | 2026-10-07 | As planned. |
| 7 | Building blocks: Bix's mood, pickers, cards, wheel, code boxes, CSS | ✅ | 55630ef, b9dbd9d | 2026-10-07 | Review fix: pickers styled anywhere via `.pb-pickers`; code-box editing; wheel rows 64 px, focus ring and list-only scrolling; Bix sized with `zoom`; a11y polish. Not yet seen in a browser (Task 11). |
| 8 | The flow from birth year to summary | ✅ | 3ba3c14, 9f46a47 | 2026-10-07 | Review fix: backing out of "Add another child" removes the untouched blank child; the birth-year wheel commits only on Continue/Enter (type-ahead had passed through under-13 years and wiped the family). Checked in a browser at 375 and 1440 px. |
| 9 | Email, password and the code | ✅ | 7c24c95, 3570210 | 2026-10-07 | Review fix: the server's wait time drives the resend countdown, and "a code was just sent" goes to the code step. Only real code errors clear and shake the boxes; Back is disabled mid-request. Checked in a browser (API mode, log mailer). |
| 10 | Hand-over; "Your pick" on the curriculum page | ✅ | 7dc1d6e, e201194 | 2026-10-07 | "⭐ Your pick" sits top-left (bottom-right overlapped the Start button). Review fix: if picking the child fails, Bix says "Hmm, that didn't work. Tap again!". |
| 11 | Full browser verification + two-child regression | ✅ | ccbb32c, 4a5ff4b | 2026-10-07 | 11/11 checks pass after fixes: layout overflow, desktop card width, missing `chime` sound; all sign-up buttons 64 px; the wrong-code message isn't red. Code boxes are 64 px tall, 46 px wide on a 375 px phone (six must fit). |
| 12 | Remove the old sign-up; env, `render.yaml`, docs | ✅ | 544a776, b517042 | 2026-10-07 | Old wizard and `POST /api/auth/signup` removed (now 404). Its account-type/under-13 server tests were ported to the new route. `MONGODB_DB` documented. V1, V3 and the two-child regression re-run after removal: pass. |

## Browser verification (Task 11)

Record pass/fail and the date. Screenshots go in the session scratchpad, not the repo.

| ID | Check | 375 px | 1440 px | Light | Dark | Notes |
|---|---|---|---|---|---|---|
| R0 | Seeded two-child account **before**: `/profiles`, `/parent`, a child's `/curriculum` and Trophy Room | ✅ | ✅ | ✅ | – | Page text hashed for the after-check. |
| V1 | Grown-up, one child, Year 2, Maths → `/curriculum/year/2/math` | ✅ | ✅ | ✅ | ✅ | Failed first (code step / year cards overflowed; desktop card too narrow), fixed in ccbb32c. |
| V2 | Grown-up, 3 children, one "Not sure", add a 4th from the summary → "Who's playing first?" | ✅ | ✅ | ✅ | ✅ | Not-sure and Year 1 skip subjects; each child lands on their first subject. |
| V3 | Learner born 2011 → no "Who" step, `learner` / `13-15` | ✅ | ✅ | ✅ | ✅ | |
| V4 | Born 2016 → gate; no request; no `pendingSignups` record | ✅ | ✅ | ✅ | ✅ | Zero `/api` requests; nothing in session storage. |
| V5 | Back keeps answers; Edit returns to summary; Year 3→2 drops Science | ✅ | – | ✅ | – | |
| V6 | Refresh on name, summary, code (→ account step, password empty) | ✅ | – | ✅ | – | Saved draft has no password and no birth year. |
| V7 | Paste "123 456"; wrong then right; resend after 31 s; 5 wrong → new code | ✅ | – | ✅ | – | "Too many codes" (5 an hour) not driven in the browser. |
| V8 | Keyboard only, start to finish | – | ✅ | ✅ | – | |
| V9 | Reduced motion: fades only, no confetti / flying faces / pulse | ✅ | – | ✅ | – | |
| V10 | Muted: silent throughout | ✅ | – | ✅ | – | Found the `chime` sound was missing (silent); fixed in ccbb32c. |
| R1 | Seeded two-child account **after**: same as R0 | ✅ | ✅ | ✅ | – | Identical page text; seeded records untouched (no `subjects`, no `emailVerified` added). |

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-10-07 | One path for anyone old enough to hold the account (a grown-up or a 13+ learner); "Who's learning?" decides parent vs learner. | Owner's call: no separate grown-up/learner routes. |
| 2026-10-07 | Only 18+ sees "Who's going to learn?"; 13–17 is always "Me". | A 15-year-old shouldn't create a parent account. |
| 2026-10-07 | Year of birth on a scroll wheel, no pre-selection; age counted at the youngest possible; never stored — only the age band. | Neutral age gate; data minimisation. |
| 2026-10-07 | Ask the school year directly (with age hints), not the child's age. | Age→year depends on the time of year; and the age is then never collected. |
| 2026-10-07 | Questions: nickname, school year, picture + colour, subjects. No "time per day", no teacher option. | Only ask what the app uses. |
| 2026-10-07 | Verification: six-digit code typed in during sign-up, before the account exists. | Owner's choice (option B). |
| 2026-10-07 | Account and all profiles created in one request (`/signup/complete`), rolled back together on failure. | Nothing is saved until the code is accepted; no half-made accounts. |
| 2026-10-07 | Resend over `fetch`; no new dependency. | Simplest API; free tier is plenty. |
| 2026-10-07 | No domain yet: verification switches on only when `RESEND_API_KEY` **and** `EMAIL_FROM` are set; otherwise production skips it (`emailVerified: false`) and local dev logs the code. | Resend's test sender reaches only the account owner. PROJECT_KNOWLEDGE §6 item 17. |
| 2026-10-07 | Owner's personal email is not written in the repo. | The repo is public. |
| 2026-10-07 | Existing accounts: `emailVerified` absent = "never asked"; nothing gates on it. Existing profiles: `subjects` absent = `[]`. | No change for the account already in use. |
| 2026-10-07 | Hand-over goes to the first chosen subject, otherwise `/`. Subjects also tag "⭐ Your pick" on `/curriculum`. | The two v1 uses of `subjects`. |
| 2026-10-07 | Wrong code ×5 and a failed send set `codeHash: null` rather than deleting the record; `purgeAt` TTL. | Keeps the 5-sends-an-hour cap honest. |
| 2026-10-07 | Sending a code is gated by a conditional database write (insert on first send, update conditioned on `lastSentAt` after); the email goes out only if the write won. | The plan's read-then-write let parallel requests bypass the 30 s and 5-an-hour limits. |
| 2026-10-07 | Each code guess reserves an attempt atomically before the comparison; at most five guesses are ever compared per code. | The plan compared first and counted after, so parallel guesses beat the limit. |
| 2026-10-07 | The code is claimed atomically (`findOneAndUpdate` on the matched hash). | Two racing requests create one account. |
| 2026-10-07 | The email has no images; Bix "speaks" in text. | Nothing to host, nothing for mail clients to block. |
| 2026-10-07 | The family row is decoration (a keyframe, no layout measuring); editing happens from the summary. | Editing mid-flow could skip unfinished learners. |
| 2026-10-07 | The saved sign-up draft (sessionStorage) never holds the birth year, and nothing at all is saved for an under-13 answer. | "Never store a birth year" and "nothing is saved" for under-13. After a refresh the year wheel shows no selection. |
| 2026-10-07 | `track()` is a no-op with an allow-list until PostHog (#36). | The funnel is ready to measure the day analytics arrives. |

## Open items (not in this plan)

- **#37 interactive browser verification** remains open; code and automated review are complete (see Resume here).

- **Domain and Resend verification:** completed 2026-10-09; see PROJECT_KNOWLEDGE §6 item 17.
- #35 the child's first-play intro with Bix — starts where the hand-over ends.
- #3 password reset — adds a second message to `server/email.js`.
- #36 PostHog — wire `track()` to `posthog.capture`.
