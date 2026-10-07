# Sign-up onboarding with email verification — design

**Date:** 2026-10-07 · **Backlog:** PROJECT_IDEAS #21 · **Status:** awaiting review

## 1. Goal

Replace today's `/signup` wizard with one short, playful path that asks a
question per screen, builds the whole family before asking for credentials,
proves the email address with a six-digit code, and creates the account and
every profile in a single request. It must feel easy and delightful on a phone
and on a desktop, for a grown-up or an older learner.

**Success looks like:**
- A grown-up with two children goes from `/signup` to a child playing in about
  two minutes, without reading anything longer than a sentence.
- Nothing is saved until the code is accepted; abandoning midway leaves no
  account behind.
- Existing accounts, profiles, progress and rewards are untouched.

**Out of scope:** password reset (#3, which will reuse the mailer built here),
asking existing accounts to verify, the child's first-play intro (#35),
analytics wiring (#36 — only a no-op `track()` is added), a teacher option, a
"time per day" question.

## 2. Decisions already made

| Decision | Choice |
|---|---|
| Paths | **One path**, for whoever is old enough to hold the account: a grown-up or a learner aged 13+. |
| Verification | **Six-digit code typed in during sign-up**, before the account exists. |
| Account creation | **Two new routes**; the account and all profiles are created in one request (`/signup/complete`). |
| Email provider | **Resend**, over its HTTP API with `fetch` — no new dependency. |
| Until a domain exists | The code step switches on only when `RESEND_API_KEY` **and** `EMAIL_FROM` are set. Production without them skips the code and stores `emailVerified: false`. Locally without a key, the code is logged to the terminal. See PROJECT_KNOWLEDGE §6 item 17. |
| Questions | Year of birth (wheel), who's learning, how many children, then per learner: nickname, school year, picture and colour, subjects. |
| Personal data | Ask only what the app uses. Year of birth and age are **never stored** — only the existing age band. Nicknames welcome; no surname is asked for. No social sign-in. |
| Animation | Existing tools only: `Mascot` (Bix), `playEffect` (canvas-confetti), sound cues, `AuthShell` sky, CSS keyframes. |

## 3. The screens

One question per screen. Single-choice answers advance by themselves ~400 ms
after the tap (the check mark has time to pop); multi-choice and text screens
have a Continue button. Every screen has Back, which keeps all answers.

| # | Screen | Bix says | Notes |
|---|---|---|---|
| 1 | **What year were you born?** | "Hi! I'm Bix. Let's get you set up!" | Scroll wheel of years, **no pre-selection** (a pre-set adult year would nudge). Continue enabled once a year is chosen. |
| 1x | **Gate** (under 13) | "You'll need a grown-up for this bit!" | Friendly dead end: "Ask a grown-up to sign up for you." Nothing is saved; no request is made. A "Start again" link clears the draft. |
| 2 | **Who's going to learn?** — Me / My children | "Who am I going to meet?" | Shown only when the age band is **18+**. Under 18 is always "Me". Sets `accountType`: Me → `learner`, My children → `parent`. |
| 3 | **How many children?** — 1 / 2 / 3 / 4+ | "How many friends will I make?" | Parent only. 4+ starts four cards; "Add another" on the summary allows up to **6**. |
| 4a | **What should Bix call them?** | "What's their name? A nickname is fine!" | Text, max 20 chars, trimmed, required. For "Me": "What should I call you?" Bix echoes it as typed: "Hi Maya! 👋". |
| 4b | **Which school year is Maya in?** | "Which class is Maya in?" | Cards Year 1–4, each with an age hint ("usually 6–7"), plus **Not sure** (`yearGroup: null`). For "Me": "Which year's work would you like to start with?" |
| 4c | **Pick a picture and a colour** | "Ooh, good choice!" (on pick) | Existing avatar and colour pickers. Cheer burst + `chime` on pick. |
| 4d | **What would Maya like to do?** | Per subject: "Numbers are my favourite!", "I love stories!", "Ooh, I love magnets!" | Multi-select. Only subjects available for that year (from `curriculumRegistry`), plus **Just exploring** (exclusive). **Skipped** when the year has none or is "Not sure"; stored as `[]`. |
| 5 | **Summary** | "Look at your crew!" / "Looking good!" | One card per learner: avatar, name, year, subjects, **Edit** (jumps to that learner's 4a with Back returning here). "Add another" (parent, < 6). |
| 6 | **Your email and a password** | "Nearly there!" | Email (`type=email`, `autocomplete=email`), password + confirm (`autocomplete=new-password`), show/hide, the existing live strength hint. Continue calls `/signup/code`. |
| 7 | **Enter the code** | "I sent a code to a…@gmail.com" | Six large digit boxes, `inputmode=numeric`, `autocomplete=one-time-code`, paste of all six fills every box. Submits on the sixth digit → `/signup/complete`. "Resend code" (enabled after 30 s, with a countdown), "Change email" (back to 6). **Skipped** when verification is off: Continue on 6 goes straight to `/signup/complete`. |
| 8 | **Hand-over** | — | Full-screen. One child: avatar large, "Hand the device to Maya!", big pulsing **"I'm Maya!"**. Several: "Who's playing first?" with one big button per child. Learner: "Let's go!". Tap → confetti + `levelUp` → `selectChild` → destination. Rendered in the wide `AuthShell` card, enlarged. |

**Hand-over destination:** the child's first chosen subject,
`/curriculum/year/:year/:subject`; otherwise `/` (Just exploring, Not sure, or a
year with no curriculum yet). Subjects are also shown on `CurriculumSelectPage` as a small
"⭐ Your pick" tag on matching subject cards — the only other v1 use.

**Age rule:** age is counted at the youngest it could be,
`age = currentYear − birthYear − 1`, so a 2013 birth in 2026 counts as 12 and is
gated. Bands: < 13 gated; 13–15; 16–17; 18+ — the existing `AGE_BANDS`.

**The draft** (`dl.signupDraft` in `sessionStorage`) holds every answer except
the password and confirm, plus the current step. A refresh or an accidental
tab reload resumes where they were. It is cleared on success and by "Start
again". If it fails to parse it is discarded, never trusted.

## 4. Look and feel

- **Bix guides.** A new `BixGuide` component wraps `Mascot` with a speech
  bubble: beside the card on wide screens, above it on phones. One short line per
  screen (table above), announced through an `aria-live="polite"` region.
  `Mascot` gains a `mood` prop — `"idle"` (default), `"puzzled"` (head tilt) —
  alongside its existing `cheerOn` burst. Nothing else in `Mascot` changes.
- **Answers feel physical.** Cards press in (`scale(0.96)`) on pointer-down and
  spring back; the chosen card's check mark pops in. Steps keep the existing
  `su-step-in` / `su-step-in-back` slides.
- **The family builds up.** Each finished learner's avatar flies into a row at the
  top of the card (a keyframe rising from below the card and settling — no
  layout measuring), so a grown-up watches the family assemble. The row is
  decoration; editing happens from the summary.
- **Progress dots** fill with a small star as steps complete.
- **Wrong code:** the existing `auth-shake` on the digit boxes only, Bix
  `puzzled`, "Hmm, let's try that again — 3 tries left." Nothing turns red.
- **Code accepted:** Bix cheers, confetti (`playEffect`), `success` sound, then
  the hand-over.
- **Layout.** Phone: one column, answer cards stacked, Continue pinned to the
  bottom inside the safe area. Desktop: cards 2–3 across, Bix beside the card.
  Every target ≥ 64 px. Colours from `--light-*` / `--dark-*` tokens only.
- **Keyboard.** Every screen is operable without a pointer: arrow keys move
  between cards, Enter/Space chooses, Enter continues, Escape goes back. Focus
  moves to each new screen's heading. The year wheel is a `listbox` with
  arrow/Page/Home/End keys and type-ahead of digits.
- **Reduced motion:** springs and slides become fades, no confetti, no flying
  avatars. **Muted:** silent, using `useSoundMuted`; no sound before the first
  tap.

**The email** — subject `Your Dynamic Learning code: 482913`; body (no images, so
nothing to host or block): "Bix says hi! 👋", "Here's your code", the code large and spaced, "It works for 10 minutes", "If you didn't
ask for this, you can ignore this email." Plain-text alternative included.

## 5. Server

### 5.1 Configuration

| Env var | Meaning |
|---|---|
| `RESEND_API_KEY` | Resend API key. Server-only. |
| `EMAIL_FROM` | e.g. `Dynamic Learning <hello@example.com>`. Until a domain is verified: `onboarding@resend.dev`, which only delivers to the Resend account owner. |

Mode, decided once at boot by `server/email.js`:
- both set → **send** (verification on);
- neither, and `NODE_ENV !== "production"` → **log** (verification on; code
  printed as `[email] signup code for a…@…: 482913`);
- otherwise → **off** (verification skipped). One set without the other is a
  misconfiguration: log a warning at boot and treat as **off**.

`createMailer({ apiKey, from, mode, fetch })` returns
`{ verification: "on" | "off", sendSignupCode(email, code) }`. `createApp`
accepts an optional `mailer` so tests inject a fake.

### 5.2 `pendingSignups` collection

```
{ email, codeHash, expiresAt: Date, attempts, sendCount, sendWindowStart: Date,
  lastSentAt: Date, purgeAt: Date }
```
- One document per email (unique index on `email`); a TTL index on `purgeAt`
  (the later of the send window's end and the code's expiry) removes old ones. Indexes are created at boot, idempotently.
- `codeHash = HMAC-SHA256(SESSION_SECRET, email + ":" + code)`. The code itself
  is never stored. Codes come from `crypto.randomInt(0, 1_000_000)`, zero-padded.

### 5.3 `POST /api/auth/signup/code` — `{ email }`

Uses the existing auth throttle. Then:
1. Normalise the email; 400 `EMAIL_REQUIRED` / `EMAIL_INVALID`.
2. 409 `EMAIL_TAKEN` if a parent has it (the old `/signup` already reveals this;
   the screen offers "Sign in instead").
3. Verification off → 200 `{ verification: "off" }`, nothing stored.
4. If a pending record was sent < 30 s ago → 429 `CODE_RECENTLY_SENT` with
   `Retry-After`. If ≥ 5 sends inside its one-hour window → 429
   `TOO_MANY_CODES` with `Retry-After`.
5. Upsert the record with a fresh code, `expiresAt` = now + 10 min,
   `attempts: 0`, incremented `sendCount`, `lastSentAt` = now.
6. Send. On failure, set `codeHash: null` (so no code verifies, while the send
   count still counts) and answer 502 `EMAIL_SEND_FAILED`.
7. 200 `{ verification: "on", expiresInSeconds: 600, resendInSeconds: 30 }`.

### 5.4 `POST /api/auth/signup/complete`

Body: `{ email, code?, password, accountType, ageBand, children: [{ name,
avatar, colour, yearGroup, subjects }] }`. Uses the existing auth throttle.

1. **Validate everything before touching the code** (so a typo in a profile
   never burns an attempt): email; password non-empty;
   `normaliseAccountFields`; `children` length 1–6 for a parent, exactly 1 for a
   learner (else 400 `INVALID_CHILDREN`); each child through
   `normaliseChildPatch` with `name` required.
2. 409 `EMAIL_TAKEN` if a parent has the email.
3. **Verification on:** load the pending record. Missing, expired or `codeHash: null` →
   400 `CODE_EXPIRED`. Compare hashes with `timingSafeEqual`. Wrong → increment
   `attempts` atomically (`$inc`); at 5 set `codeHash: null` (keeping the record,
   so the hourly send cap still holds) and answer 400 `CODE_ATTEMPTS_EXCEEDED`,
   otherwise 400 `CODE_INCORRECT` with `{ attemptsLeft }`. Right → claim it
   atomically by setting `codeHash: null` where it still equals the matched
   hash (single use: of two concurrent requests, only one claims it; the other
   gets `CODE_EXPIRED`).
4. Create the parent exactly as `/signup` does today (hash, the duplicate-race
   check) plus `emailVerified` (`true` when verified, `false` when off) and
   `emailVerifiedAt` (ISO string or `null`).
5. Insert the children with `insertMany`. On any failure, delete the parent and
   any children with its `parentId`, then answer 500 `SIGNUP_FAILED`. The
   pending record is already gone, so the user requests a new code — accepted
   as rare.
6. Set the session cookie; 201 `{ parent, children }` via `publicParent` /
   `publicChild`.

`publicParent` already strips credentials; `emailVerified` and
`emailVerifiedAt` pass through. **Existing accounts lack both fields, which
means "never asked"** — nothing reads them to gate or nag in this work.

The old `POST /api/auth/signup` stays until the new screens ship, then is
removed in the same plan with its client caller.

## 6. Shared and client code

- **`src/data/childFields.js`:** `subjects` joins `EDITABLE_CHILD_FIELDS`.
  `normaliseChildPatch` accepts an array of subject ids, de-duplicated, each
  one of `CURRICULUM_SUBJECTS` ids; `"exploring"` is not stored — Just exploring
  is `[]`. Invalid → `INVALID_SUBJECTS`. `null` / absent behave as today. The
  existing `POST /api/children` and `/parent` editing keep working; a profile
  without `subjects` reads as `[]`.
- **`src/data/signupFlow.js`** (new, pure, no React): the step list and which
  steps a draft skips; `ageBandForBirthYear(year, currentYear)`;
  `subjectsForYear(year)` from the registry; `validateDraft` per step; the
  request body from a draft; `destinationFor(child)`; parse/serialise the
  session draft.
- **`src/data/store/`:** both drivers gain `requestSignupCode(email)` and
  `completeSignup(body)`. The API driver calls the two routes. The
  localStorage driver returns `{ verification: "off" }` and creates the account
  and profiles locally with the same validation, `emailVerified: false`.
- **`AuthContext`:** `requestSignupCode` and `completeSignup`;
  `completeSignup` sets the parent and profiles and writes `dl.lastAccount`
  as `signUp` + `addChild` do today, but does **not** select a child — the
  hand-over does. `signUp` is removed when the old route goes.
- **`src/utils/analytics.js`:** `track(event, props)` — a no-op until #36.
  Events: `signup_step_viewed {step}`, `signup_gated`,
  `signup_code_sent`, `signup_completed {learners, verification}`. Props are
  counts and step names only; never names, emails or birth years.
- **Screens:** `src/pages/auth/signup/` — one small component per step,
  `SignUpFlow.jsx` as the state machine driven by `signupFlow.js`, plus
  `BixGuide`, `ChoiceCards`, `YearWheel`, `CodeInput`, `FamilyRow`,
  `HandOver`. The avatar and colour pickers are reused from `ProfileBuilder`,
  extracted into their own components if they are not already. `SignUp.jsx`
  becomes a thin route wrapper. `AuthShell` keeps the sky and card; the
  hand-over uses the wide card, enlarged.

## 7. Errors the user can see

All in Bix's voice, on the screen where they happen, with answers kept.

| Code | Screen | Message and action |
|---|---|---|
| `EMAIL_TAKEN` | 6 | "That email already has an account." **Sign in instead** link. |
| `EMAIL_INVALID` | 6 | "That email doesn't look quite right." |
| `CODE_RECENTLY_SENT` | 7 | Resend button shows its countdown. |
| `TOO_MANY_CODES` | 6/7 | "Let's take a break — try again in N minutes." |
| `EMAIL_SEND_FAILED` | 6 | "I couldn't send the email." **Try again** / change email. |
| `CODE_INCORRECT` | 7 | Shake, "Let's try that again — N tries left." Boxes cleared, first focused. |
| `CODE_EXPIRED` | 7 | "That code has run out." **Send a new code**. |
| `CODE_ATTEMPTS_EXCEEDED` | 7 | "Too many tries — I'll send a fresh code." **Send a new code**. |
| `TOO_MANY_ATTEMPTS` (existing throttle, 429) | any | "Let's take a break — try again in N minutes." |
| `SIGNUP_FAILED` / network | 7 or 6 | "Something went wrong — nothing was saved." **Try again**. |
| `INVALID_*` | — | Should be unreachable (the client validates the same rules); shown generically and logged. |

## 8. Compatibility

- `/login`, `/profiles`, `/parent`, progress, rewards, unlock rules: unchanged.
  No progress document, storage key or unlock rule is touched, so the
  `curriculum-progress` checklist is not triggered — but the seeded two-child
  account is checked before and after (§9).
- Existing children without `subjects` read as `[]`; existing parents without
  `emailVerified` are never asked.
- The localStorage driver keeps working end to end, with no code step.

## 9. Testing

- **Pure (`node:test`):** `signupFlow` — step order and skips (learner, parent,
  Not sure, year with no curriculum), `ageBandForBirthYear` at the edges (2013
  vs 2012 in 2026; 13/15/16/17/18), `subjectsForYear` per registry year, draft
  parse/serialise including a corrupt draft, request body, `destinationFor`.
  `childFields` — `subjects` valid, duplicate, unknown, `null`, absent.
  `email.js` — mode selection for each env combination.
- **Server (`routes.test.js` style, live Mongo, skipped without
  `MONGODB_URI`, fake mailer):** code sent and stored hashed; resend cooldown;
  five-an-hour cap; email taken at both routes; correct code creates parent +
  children + cookie; wrong code counts down; fifth wrong code deletes the
  record; expired code; reused code; a failing child insert leaves no parent and
  no children; verification off creates `emailVerified: false`; learner with
  two children rejected; invalid child rejected without spending an attempt.
- **Browser (Playwright, API mode, local log mailer reading the code from the
  server log):** the full flow with one child, three children and "Me"; the
  under-13 gate; Back keeps answers; refresh mid-flow resumes; pasting the
  code; a wrong code then the right one; keyboard-only run; widths 375 px and
  1440 px; both themes; reduced motion. Screenshots of every screen for review.
  **Regression:** sign in to the `npm run seed` two-child account before and
  after — same profiles, progress and `/parent`.
- `npm run lint`, `npm test`, `npm run build` pass.

## 10. Docs to update on ship

PROJECT_KNOWLEDGE §5 "Accounts" (new flow, routes, collection, fields) and §6
item 17; DEPLOYMENT §2 and `.env.example` (`RESEND_API_KEY`, `EMAIL_FROM`);
`render.yaml` (`sync: false` for both); PROJECT_IDEAS — delete #21, point #3 at
the mailer.
