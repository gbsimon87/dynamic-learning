# Final whole-branch review: sign-up onboarding (450a09c..b517042)

Reviewed in three passes over `final-code.diff`, reading the HEAD files where needed: (1) server, (2) shared/data/stores, (3) client UI. I ran the following myself:
- `npm test`: 1249 tests, 1247 pass, 0 fail, 2 skipped.
- `npm run lint`: clean.
- `server/signup.test.js`, `email.test.js` and `signupCodes.test.js` against mongod :27018: all pass.
- `server/routes.test.js`: the same 10 pre-existing failures.
- Two scratch-DB probes. Both databases were dropped afterwards.

I did not run `npm run build` because it writes `dist/` and this review is read-only. I also did not repeat the browser checks. Client findings come from reading the code.

### Strengths

- **The code send and the code check are atomic.**
  - `/code` decides who may send by a conditional write: `insertOne`, where the unique `email` index makes it an E11000 race; or `updateOne` filtered on the `lastSentAt` that was read. Only the request whose write wins sends the email.
  - `/complete` reserves an attempt with `findOneAndUpdate({codeHash ≠ null, attempts < 5, expiresAt > now}, $inc)` before comparing the code. It claims the code with a filter on the reserved hash, so the code works only once.
  - Both have parallel tests, and both pass.
- **Codes are handled safely.** Codes are HMAC-SHA256 keyed on the email and `SESSION_SECRET`, compared with `timingSafeEqual`, and never stored. `emailMode` can never return `log` in production.
- **A bad profile never spends an attempt.** All validation runs before the code is touched: the account fields, the children as a set (`normaliseNewChildren`), and 1 profile for a learner or 1–6 for a parent.
- **Rollback deletes children before the parent.** It is tested by writing one child and then failing.
- **Nothing extra is stored (probe).** `/complete` was sent a body with `birthYear` and `age` at the top level and inside a child. The stored documents had exactly:
  - parents: `email, passwordHash, passwordSalt, iterations, accountType, ageBand, createdAt, emailVerified, emailVerifiedAt`
  - children: `parentId, name, avatar, colour, yearGroup, subjects, createdAt`
  - pendingSignups: hashes, dates and counts only, and `codeHash` is null after use.
- **On the client, the under-13 rule holds.**
  - `serialiseDraft` drops `birthYear` and returns null for a gated draft. The hook then removes the saved copy.
  - `parseDraft` rejects GATED drafts.
  - `signupBody` has no birth year.
  - The wheel commits only on Continue, so type-ahead never passes through an under-13 year.
  - On the server, `normaliseAccountFields` still refuses `under-13` for a learner, and a parent account never carries an age band.
- **The flow logic is pure and well tested.** `signupFlow.js` is the step machine and `signupCopy.js` holds the copy. The Review Focus cases 1–5 are each covered by a test.
- **The old route is removed cleanly.** POST `/api/auth/signup` now returns 404 `NOT_FOUND`, and there is a test for that. Its account-type and age-band tests were moved to the new route.
- **Existing data is untouched.** No progress route, storage key or unlock rule changed. Existing parents and children only gain fields when new ones are created.

### Issues

#### Critical (Must Fix)

**C1. One unauthenticated request can freeze the whole server: the email shape regex backtracks quadratically.**
- **Where:** `shared/emailAddress.js:12-16`. `SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/`, reached from `readEmail` (`server/routes/signup.js:43-54`) on both `/code` and `/complete`.
- **What goes wrong:** `[^\s@]` also matches `.`. On input like `"a@" + ".".repeat(n) + "@"` the engine tries every split point for the `\.` and backtracks the trailing `+` each time. The cost grows as n². `trim()` does not help, because the input ends in `@`, not whitespace.
- **Measured:**

  | Input length (chars) | Time |
  |---|---|
  | 5,000 | 0.05 s |
  | 10,000 | 0.18 s |
  | 20,000 | 0.78 s |
  | 40,000 | 3.0 s |

  With the server in its own process, one 40k-character request held `/api/health` for 1.2 s.
- **Why it matters:** `express.json` accepts up to 1 MB (`server/app.js`), about a million characters. Extrapolated, one request blocks the event loop for roughly 20–30 minutes. That stops every route for every user, including progress saves. The throttle does not prevent it, because one request is enough. This is new on this branch: the old `/signup` had no shape check.
- **Fix:**
  - In `isEmailShaped` (and therefore in `readEmail`), reject anything longer than 254 characters before testing the regex.
  - Make the regex linear by using disjoint character classes, e.g. `/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/`.
  - Add a test that the adversarial string returns `false` within a few milliseconds.

#### Important (Should Fix)

**I1. After "I couldn't send the email", Try again tells the user a code is on its way when none was sent.**
- **Where:** `server/routes/signup.js:117-125`, and on the client `SignUpFlow.jsx:177-190`.
- **What goes wrong (confirmed by probe):** a failed send answers 502 `EMAIL_SEND_FAILED`, but the record keeps `lastSentAt = now`. An immediate retry gets 429 `CODE_RECENTLY_SENT`. The client then moves to the code step with "I've just sent one — give it a moment." The Task 9 ruling assumed "a code exists" here, which is false after a failed send.
- **Why it matters:** this is a spec §7 error path. If Resend rejects (for example `EMAIL_FROM=onboarding@resend.dev` sending to anyone but the owner), every user is told to wait for an email that will never arrive. Each retry also uses up one of the five sends allowed per hour. Task 11 did not exercise this path in the browser.
- **Fix (server):** in the same hash-filtered failure update, restore `lastSentAt` to the previously read value (`record?.lastSentAt ?? new Date(0)`). The send count still counts, so the five-an-hour cap holds. Add a test: fail, then retry immediately, and expect 200.

**I2. The code step has no "Try again" after a network error or `SIGNUP_FAILED` (spec §7 requires one).**
- **Where:** `src/pages/auth/signup/steps.jsx:208-220`, and on the client `SignUpFlow.jsx:126-135`.
- **What goes wrong:** after a non-code error the six digits stay filled. The message says "Try again?" but no control does that, and focus was lost when the boxes were disabled. The only way to resubmit is to delete and retype a digit. This was deferred in Task 9; spec §7 lists **Try again** as the action for this error.
- **Fix:** when `code.length === 6 && codeError && !codeInvalid`, render a 64 px "Try again" button that calls `complete(code)`. For `SIGNUP_FAILED` the server has already claimed the code, so a retry will answer `CODE_EXPIRED`. That then correctly offers "Send a new code".

**I3. Anyone can make the server email any address. Plan-level issue; this blocks switching verification on, not merging.**
- **Where:** `server/routes/signup.js:56`, where `/code` uses only `createAuthThrottle`.
- **What goes wrong:** the throttle limits each email address and the process as a whole (120 requests a minute). It has no per-client limit. With verification on, one script can send about 120 code emails a minute to 120 different addresses.
- **Why it matters:** this is enough to email-bomb third parties, use up Resend's quota (the free tier allows 100 a day, so sign-up then fails for everyone with `EMAIL_SEND_FAILED`), and damage the new domain's sender reputation. It follows the spec ("uses the existing auth throttle"), so the gap is in the plan.
- **Fix:** before setting `RESEND_API_KEY`, add a process-wide send budget sized to the Resend plan, plus a per-IP cap on `/code` (`app.set("trust proxy", 1)` on Render). Record this in the tracker's open items next to "buy a domain".

#### Minor (Nice to Have)

**M1. After the hand-over, Back lands on a blank sign-up page while signed in.**
- **Where:** `SignUpFlow.jsx:223`, `navigate(destinationFor(child))` without `replace`.
- **What goes wrong:** the old wizard used `{ replace: true }`. Now a child who swipes back from their first lesson sees "What year were you born?" while signed in. A refresh on the hand-over shows the same screen, because the draft has been cleared and `created` lived only in memory.
- **Fix:** `navigate(dest, { replace: true })`.

**M2. `autoFocus` on the email field is overridden at once by the heading-focus effect.**
- **Where:** `steps.jsx:167`, and on the client `SignUpFlow.jsx:58-62`.
- **What goes wrong:** the field is focused during commit, then the passive effect moves focus to the `h1`. On iOS this can flash the keyboard open and shut.
- **Fix:** drop the email `autoFocus`, as Task 8 already did for the nickname.

**M3. After `TOO_MANY_CODES` the resend button counts down in seconds.**
- **Where:** `steps.jsx:215`.
- **What goes wrong:** the button reads "Send a new code in 3540s", sitting next to a message that says "59 minutes". It also re-renders every second for an hour.

**M4. Six code boxes need 296 px, and some phones have less.**
- **Where:** `SignUpFlow.css:86`, where each box has `min-width: 44px` with a gap of `0.4rem`.
- **What goes wrong:** the card's content width is about 293 px at 360 px and about 253 px at 320 px (calculated, not checked in a browser). At 360 px that is a 3 px overflow into the card padding, which is harmless. At 320 px it is about 40 px and visibly spills outside the card. `.auth-page { overflow: hidden }` prevents horizontal page scroll in both cases.
- **Fix:** `min-width: 38px` or `gap: 0.3rem`.

**M5. The Resend `fetch` has no timeout.**
- **Where:** `server/email.js:54-58`.
- **What goes wrong:** if Resend hangs, the user sits on "Sending…" with Back disabled until undici's default (about 300 s) gives up.
- **Fix:** add `signal: AbortSignal.timeout(10_000)`. See the triage below.

### Recommendations

- Fix C1, I1, I2, M1 and M5 in one small fix round. Each is a few lines, plus a test for C1 and for I1.
- Add I3 (send budget and per-IP cap), together with deferred Task 3 minors 2 (log Resend's error body) and 3 (log at boot when verification is off), to the tracker's "Open items" as a gate on setting `RESEND_API_KEY`.
- Flag the 10 pre-existing `routes.test.js` failures to the owner, as the ledger ruling says. The new `childA.subjects` assertion does run, because it comes before the failing sub-tests.

### Declined to judge

- Email enumeration via 409 `EMAIL_TAKEN` on `/code` and `/complete`: accepted by the spec.
- An under-13 can go Back from the gate and pick an older year. The spec designs a neutral gate with "Start again", not a sticky one.
- Production in "off" mode lets anyone register any address without verification: a spec decision until a domain exists.
- The process-wide 120-a-minute limit is shared by every sign-up, so one client can lock everyone out for a minute. This is the pre-existing design of `createAuthThrottle` (which avoids trusting proxy headers). I3 is the part specific to email.
- The server enforces no minimum password length. This predates the branch; the old `/signup` did the same.
- `avatar` and `colour` accept any string up to the 1 MB body limit (deferred Task 1 minor). `POST /api/children` already allowed the same.
- The pending record keeps the email for up to about 1 h after success, until `purgeAt`. This is the spec's design.
- Focus goes to the heading rather than the first code box on arriving at the code step. The spec says heading.
- `npm run build` and the browser checks were not re-run by me. I relied on the Task 11 and 12 records.

### Deferred minors and rulings: triage

| Task | Deferred minor | Call | Why |
|---|---|---|---|
| T1 | No route test of POST `/api/children` with subjects / store persistence | fine to leave | `childA.subjects` is asserted in `routes.test.js`; the local store test covers `subjects`. |
| T1 | `normaliseNewChildren` accepts any-length avatar/colour | fine to leave | Already possible via `POST /api/children`. Allow-list both routes together as a follow-up. |
| T1 | `maskEmail` returns the input unmasked without `@` | fine to leave | Only ever called on validated addresses. |
| T2 | `parseDraft` accepts code/handover/gate cursors | fine to leave | Code/handover now resume at the account step. A gate cursor only appears in a tampered draft and offers "Start again". |
| T2 | `addLearner` leaves a blank learner on back-out | fine to leave | Already fixed by `dropBlankLearner` in Task 8. |
| T2 | Test gaps (`sameCursor`, `withLearnFor` children-after-me, `cleanLearner`); `EMAIL_REQUIRED` copy unused | fine to leave | Low risk; covered indirectly. |
| T2 | Gate cursor for a non-gated draft | fine to leave | Tampered drafts only. |
| T3 | Resend fetch has no timeout | **fix before merge** | One line. It is the only thing between a Resend outage and a frozen "Sending…" screen with Back disabled (M5). |
| T3 | Send error drops Resend's response body | fine to leave | Do it with the domain switch-on (I3 checklist). |
| T3 | Production with neither var is silently "off" | fine to leave | Intended state today and documented. Add a boot log with the I3 work. |
| T3 | `createMailer` with an unknown mode reports "on" | fine to leave | Mode always comes from `emailMode`. |
| T3 | `sendDecision` on a malformed record; no 4→5 boundary test | fine to leave | The route always writes all fields; the five-an-hour cap is tested end to end. |
| T4 | Parallel test covers only the insert branch | fine to leave | The `updateOne` filter is simple and visible. The I1 test will cover the hash-conditional cleanup. |
| T4 | 2 s fallback timers not cleared | fine to leave | Harmless. |
| T5 | Rollback log noise; no test for reusing a claimed code without an account | fine to leave | The racing test covers single use. |
| T5 | Concurrency test may flake (150 ms) | fine to leave | Passed here. Revisit only if it flakes. |
| T5 | Losing the 5th-miss race answers `CODE_EXPIRED` | fine to leave | Wording only; the client offers a new code for both. |
| T5 | A failed children `deleteMany` skips the parent delete | fine to leave | Logged with the id. The leftover account is usable by its owner. |
| T6 | `completeSignup` should throw when a 201 lacks `parent` | fine to leave | The server always returns `parent`. |
| T6 | Empty/invalid email codes differ between drivers | fine to leave | The UI validates before either is called. |
| T6 | Local rollback untested; could mask the original error | fine to leave | Browser-only mode, rare. |
| T6 | `track(event, null)` throws; API driver untested | fine to leave | No caller passes null; no fetch-mock harness yet (#2). |
| T7 | `aria-pressed` vs radio; infinite pulse; middle-box edit drops later digits | fine to leave | Plan design. The pulse is off under reduced motion. |
| T7 | `raw.replace` has no length guard | fine to leave | Already fixed in Task 9 (`raw.length === digit.length + 1`). |
| T7 | Wheel focus ring fades; boxes need ≥296 px | fine to leave | See M4: cosmetic at 360 px, and very small phones are rare. |
| T8 | Edit-from-summary slides "back"; `mood` unused | fine to leave | Cosmetic; `mood` is now used. |
| T9 | No unit tests for error routing / CodeInput | fine to leave | No component framework (#2). I1 shows the routing needs a test once one exists. |
| T9 | Kept code loses focus after a transient failure | **fix before merge** | This is I2: spec §7's **Try again** action is missing. |
| T9 | `TOO_MANY_CODES` countdown in raw seconds | fine to leave | Rare path; the message beside it gives minutes (M3). |
| T10 | Cue/confetti after the await; tags tight at 190 px; no HandOver tests | fine to leave | Still caused by the tap; the layout was checked. |
| T11 | Not every check at every width/theme; `TOO_MANY_CODES` / `EMAIL_SEND_FAILED` not driven in the browser | **fix before merge** (the `EMAIL_SEND_FAILED` part) | That is the path where I1 lives. Drive it once after the fix. |
| T11 | `cues.test` list hand-maintained; 2+2+1 year cards at ≥900 px | fine to leave | Low risk. |
| T12 | `routes.test.js` banner still says "signup" | fine to leave | Cosmetic. |

**Rulings.** I agree with every ruling except one premise in Task 9: "`CODE_RECENTLY_SENT` on the account step moves to the code step **since a code exists**". After a failed send no code exists (I1). The server-side fix in I1 makes the ruling's premise true again without changing the client.

### Assessment

**Ready to merge?** With fixes

**Reasoning:** The atomic code gates, single-use claim, rollback, data minimisation and the under-13 handling are solid and tested. Everything persisted matches the constraints. But C1 is a one-request denial of service on an unauthenticated route and must be fixed first. I1 and I2 are small fixes to the error paths the spec names.
