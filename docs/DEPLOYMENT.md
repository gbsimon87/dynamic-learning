# Deployment — actions to take

What is still to do to ship the account-protection release to production. Current
setup (2026-10-09): production `dynamic-learning-zkww` (Starter, `main`,
https://learnwithbix.com, database `dynamic_learning`); dev
`dynamic-learning-dev-zkww` (Free, `dev`, database `dynamic_learning_dev`);
Blueprint **DEV DL** reads `render.yaml` from `main`. The full setup reference
is in this file's git history.

The release:

- Password recovery keeps existing accounts and learning, and signs out old sessions.
- Concurrent saves merge completions and protect earned rewards.
- Database startup enforces unique accounts, progress and rewards.
- Progress migrations (read-time only) and new component/API regression tests.

Learner progress has no backup. Every check against production below is
read-only; never delete or edit accounts, progress or rewards to make a step pass.

---

## 1. Ship the code to dev

- [ ] Commit the uncommitted work (recovery, account indexes, learning writes,
      progress migrations, `render.yaml`, `.env.example`) on `dev`.
- [ ] `npm run lint`, `npm test` and `npm run build` pass.
- [ ] Push `dev`.

## 2. Configure the dev service

Render → `dynamic-learning-dev-zkww` → **Environment**:

- [ ] `PUBLIC_APP_URL` = `https://dynamic-learning-dev-zkww.onrender.com`
      (reset links point here; it is `sync: false`, so the Blueprint won't set it).
- [ ] `SIGNUP_EMAIL_DAILY_LIMIT` = `20` (production gets `80`; together they
      must fit the one shared Resend account's daily quota).
- [ ] `VITE_REST_COUNTRIES_API_KEY` = the REST Countries key (FlagFinder; read at
      build time, so save with **rebuild and deploy**).

## 3. Test on dev

- [ ] Boot log shows no `DUPLICATE_ACCOUNT_DATA_REQUIRES_REVIEW`.
- [ ] **Recovery:** request a reset for a test account → the email arrives → the
      link sets a new password → the new password works, the old one doesn't, and
      a second browser that was signed in is signed out.
- [ ] After recovery, the account's children, progress and rewards are unchanged.
- [ ] A reused link and an expired link are both refused.
- [ ] **Concurrent saves:** the same child open in two tabs, a different challenge
      completed in each → after reload both completions are there and no earned
      reward is lost.
- [ ] Recovery screens in light and dark theme, by touch and by keyboard.

## 4. Check production data (read-only), right before deploying

- [ ] `MONGODB_DB=dynamic_learning npm run audit:accounts` → zero duplicate
      groups for `parents.email`, `progress(childId,year,subject)` and
      `rewards.childId`. (Zero on 2026-10-09; rerun, sign-ups continue.) If any
      exist, **stop** — they need a backed-up, reviewed reconciliation plan.
- [ ] Every production progress document passes `isProgressData`. The read path
      now throws `INVALID_PROGRESS` on one that doesn't, which would stop that
      child's progress loading. There is no script for this yet — write a
      read-only one before deploying.

## 5. Configure production

Render → `dynamic-learning-zkww` → **Environment**:

- [ ] `SIGNUP_EMAIL_DAILY_LIMIT` = `80`.
- [ ] `VITE_REST_COUNTRIES_API_KEY` = the REST Countries key.
- [ ] `PUBLIC_APP_URL` comes from `render.yaml` (`https://learnwithbix.com`) on the
      next Blueprint sync; confirm it is there after step 6.

## 6. Deploy

- [ ] Merge `dev` into `main`; push.
- [ ] **Blueprints → DEV DL → Manual Sync.** The preview must show updates to the
      two existing services and no new service; production's plan stays Starter.
      This also clears the Blueprint's old "Failed sync".
- [ ] If the boot log shows `DUPLICATE_ACCOUNT_DATA_REQUIRES_REVIEW`, the new
      version doesn't start and Render keeps the previous one live. Change nothing
      in the data; go back to step 4.

## 7. Verify production

- [ ] `MONGODB_DB=dynamic_learning npm run audit:accounts` → the three indexes are
      now `unique: true`.
- [ ] An existing child's progress and rewards still load.
- [ ] Recovery on a controlled real account: email arrives from
      `hello@learnwithbix.com`, link goes to `https://learnwithbix.com`, new
      password works, old sessions are signed out, children/progress/rewards
      unchanged.

---

## Housekeeping

- [ ] Rotate the secrets pasted into chat on 2026-10-09: Atlas `dev_user`
      password (then `MONGODB_URI` in `.env` and on any Render service using it),
      the `dynamic-learning-local` Resend key, the local `SESSION_SECRET`, the
      REST Countries key.
- [ ] Add `MONGODB_DB=dynamic_learning_dev` and `VITE_REST_COUNTRIES_API_KEY=` to
      `.env.example`.
- [ ] Optional: in Atlas → **Network Access**, replace `0.0.0.0/0` (if used) with
      Render's outbound IPs for Frankfurt (Render → service → **Connect** →
      *Outbound*).
