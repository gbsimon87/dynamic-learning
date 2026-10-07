# Sign-up onboarding — implementation tracker

**Start here to resume.** Branch: `feat/onboarding`. Backlog: PROJECT_IDEAS #21.

| Document | What it is |
|---|---|
| [Spec](../specs/2026-10-07-signup-onboarding-design.md) | What we're building and why — screens, look and feel, server, errors, testing. |
| [Plan](2026-10-07-signup-onboarding.md) | Twelve tasks with the code, tests and commands for each. |
| This file | What's done, what's next, and every decision made along the way. |

**Last updated:** 2026-10-07 · **Status:** plan written, awaiting review · **Next:** Task 1

## How to keep this file

After each task: set its status, paste the commit hash and date, and write anything that went differently from the plan under **Notes** (and in the decisions log if it changes a rule). Never delete a row — a skipped or reverted task says so. Update **Last updated**, **Status** and **Next** at the top.

Status values: ⬜ Not started · 🟡 In progress · ✅ Done · ⏸ Blocked · ↩︎ Reverted

## Tasks

| # | Task | Status | Commit | Date | Notes |
|---|---|---|---|---|---|
| 1 | Shared email helpers; `subjects` on child profiles; `normaliseNewChildren` | ⬜ | | | |
| 2 | Pure flow logic: `signupFlow`, `signupCopy`, `passwordStrength` | ⬜ | | | |
| 3 | Server codes (`signupCodes.js`) and mailer (`email.js`) | ⬜ | | | |
| 4 | `pendingSignups` + `POST /api/auth/signup/code` | ⬜ | | | |
| 5 | `POST /api/auth/signup/complete` | ⬜ | | | |
| 6 | Client data path: stores, `AuthContext`, `track()` | ⬜ | | | |
| 7 | Building blocks: Bix's mood, pickers, cards, wheel, code boxes, CSS | ⬜ | | | |
| 8 | The flow from birth year to summary | ⬜ | | | |
| 9 | Email, password and the code | ⬜ | | | |
| 10 | Hand-over; "Your pick" on the curriculum page | ⬜ | | | |
| 11 | Full browser verification + two-child regression | ⬜ | | | |
| 12 | Remove the old sign-up; env, `render.yaml`, docs | ⬜ | | | |

## Browser verification (Task 11)

Record pass/fail and the date. Screenshots go in the session scratchpad, not the repo.

| ID | Check | 375 px | 1440 px | Light | Dark | Notes |
|---|---|---|---|---|---|---|
| R0 | Seeded two-child account **before**: `/profiles`, `/parent`, a child's `/curriculum` and Trophy Room | | | | | |
| V1 | Grown-up, one child, Year 2, Maths → `/curriculum/year/2/math` | | | | | |
| V2 | Grown-up, 3 children, one "Not sure", add a 4th from the summary → "Who's playing first?" | | | | | |
| V3 | Learner born 2011 → no "Who" step, `learner` / `13-15` | | | | | |
| V4 | Born 2016 → gate; no request; no `pendingSignups` record | | | | | |
| V5 | Back keeps answers; Edit returns to summary; Year 3→2 drops Science | | | | | |
| V6 | Refresh on name, summary, code (→ account step, password empty) | | | | | |
| V7 | Paste "123 456"; wrong then right; resend after 31 s; 5 wrong → new code | | | | | |
| V8 | Keyboard only, start to finish | | | | | |
| V9 | Reduced motion: fades only, no confetti / flying faces / pulse | | | | | |
| V10 | Muted: silent throughout | | | | | |
| R1 | Seeded two-child account **after**: same as R0 | | | | | |

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
| 2026-10-07 | The code is claimed atomically (`findOneAndUpdate` on the matched hash). | Two racing requests create one account. |
| 2026-10-07 | The email has no images; Bix "speaks" in text. | Nothing to host, nothing for mail clients to block. |
| 2026-10-07 | The family row is decoration (a keyframe, no layout measuring); editing happens from the summary. | Editing mid-flow could skip unfinished learners. |
| 2026-10-07 | `track()` is a no-op with an allow-list until PostHog (#36). | The funnel is ready to measure the day analytics arrives. |

## Open items (not in this plan)

- **Buy a domain and verify it in Resend**, then set `RESEND_API_KEY` and `EMAIL_FROM` on Render. No code change. (PROJECT_KNOWLEDGE §6 item 17.)
- #35 the child's first-play intro with Bix — starts where the hand-over ends.
- #3 password reset — adds a second message to `server/email.js`.
- #36 PostHog — wire `track()` to `posthog.capture`.
