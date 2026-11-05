# Operations and outstanding review

Updated **2026-11-03** by reading repository configuration and source. This is
an operating reference, not evidence that the checked-out code is deployed.
No hosting dashboards, live databases, DNS, email delivery or physical devices
were inspected for this update. No runtime or persistence changes are required
by this documentation work.

## Deployment invariants

[render.yaml](../render.yaml) defines two Node Web Services in Frankfurt. Each
serves the built React app and `/api` from one origin; the API uses an HTTP-only
session cookie. Preserve that same-origin arrangement.

| Configuration | Production | Development |
|---|---|---|
| Blueprint service name | `dynamic-learning` | `dynamic-learning-dev` |
| Code branch | `main` | `dev` |
| Plan | **Starter** | Free |
| Database | `dynamic_learning` (server default) | explicit `dynamic_learning_dev` |
| `VITE_USE_API` | `true` | `true` |
| `SEO_INDEXABLE` | `true` | `false` |
| `PUBLIC_APP_URL` | `https://learnwithbix.com` | dashboard-supplied dev origin |

Both use Node `22.23.4`, `npm ci --include=dev && npm run build`,
`node server/index.js`, and health check `/`. Keep `--include=dev`: Vite is a
dev dependency but Render sets `NODE_ENV=production`. Render supplies `PORT`.
The signed-out `/api/auth/me` returns 401 and is unsuitable as a health check.

**Recorded hosting state, 2026-10-09/10; not rechecked:** Blueprint “DEV DL”
auto-syncs configuration from **`dev`**, while production code deploys from
**`main`**. Therefore pushing `render.yaml` to dev can change production's
plan/branch. Preserve production **Starter + main**. Recorded dashboard
services are `dynamic-learning-zkww` and `dynamic-learning-dev-zkww`; the
old `dynamic-learning-n72m.onrender.com` static site is retired/suspended and
must not receive new configuration. Its retained name historically caused a
misleading Blueprint type/region validation warning. Confirm current dashboard
state before acting on that warning.

The same dated record identifies Namecheap DNS, apex A `216.24.57.1`, `www`
CNAME `dynamic-learning-zkww.onrender.com`, and a Render www-to-apex redirect.
Preserve website and Resend DNS records when editing DNS; validate current
records rather than assuming this snapshot remains live. Infrastructure names
deliberately retain “dynamic-learning” so accounts and progress do not move.

## Environment and email

Use [.env.example](../.env.example) for variable names and local setup; keep
actual credentials out of source, documentation, browser bundles and logs.
`MONGODB_URI`, `SESSION_SECRET` and `RESEND_API_KEY` are server secrets.
`EMAIL_FROM` configures the sender; set it together with `RESEND_API_KEY`.
Local/dev credentials and session secrets must be separate from production's;
rotating `SESSION_SECRET` signs users out. Never expose secrets behind `VITE_`:
those values are public build inputs.

`PUBLIC_APP_URL` is the trusted origin for recovery links and absolute SEO
URLs. Production recovery requires a valid HTTPS origin; never derive reset
links from request hosts. Confirm the dev service uses its own origin.
`SEO_INDEXABLE` and the public origin affect build/runtime output; rebuild
after configuration changes. Follow [SEO_NEXT_STEPS.md](SEO_NEXT_STEPS.md) for
indexing decisions, dev/production rollout, live HTTP checks, Search Console
and phone performance evidence. Repository implementation alone closes none
of those external checks.

[server/email.js](../server/email.js) sends through Resend when both mail
variables are set. With neither set outside production it logs codes/links;
production without both configured skips verification. Incomplete mail
configuration also disables sending. Do not interpret a successful signup as
proof that verification ran. Real signup-code delivery was recorded on
2026-10-09; delivery today was not tested. The dated record says keys are
sending-only, so sent-mail inspection belongs in the Resend dashboard.

`SIGNUP_EMAIL_DAILY_LIMIT` defaults to 90 attempts per UTC day per database,
including failed sends. The example records production/dev budgets of 80/20
sharing one Resend account; those dashboard overrides and the provider's
current quota were not checked. See
[server/signupEmailLimits.js](../server/signupEmailLimits.js).

## Protect learner data

[server/db.js](../server/db.js) defaults to **production** `dynamic_learning`
if `MONGODB_DB` is missing; a URI's database component does not override that
explicit selection. Locally set `MONGODB_DB=dynamic_learning_dev` before any
database operation. Never assume a reset is safe or run a seed/purge against
real learners. [scripts/seed.js](../scripts/seed.js) writes accounts/progress;
`--purge` deletes collections. Its name-based production guard is not a
substitute for verifying the target (`dynamic_learning` lacks “prod”).

The store defaults to browser storage unless `VITE_USE_API=true` at build time
([store selection](../src/data/store/index.js)); the example opts into API
mode. Browser-only accounts provide no device-level security boundary or
cross-device sync, and clearing site data loses learning. Do not use production
children's data for demonstrations.

Before changing progress shape, keys, IDs or access/award rules, read the
[curriculum-progress skill](../.claude/skills/curriculum-progress/SKILL.md).
Preserve existing learner IDs and completions; future renames need numbered
migrations and fixtures. Audit commands are **read-only**, not migrations:

```sh
MONGODB_DB=dynamic_learning npm run audit:accounts
MONGODB_DB=dynamic_learning npm run audit:progress
```

Only run against an intentionally selected database with authorized credentials.
The [account audit](../scripts/auditAccountIndexes.js) prints indexes and
duplicate-group counts; expect zero duplicate groups. The
[progress audit](../scripts/auditProgress.js) checks documents through the
version-aware reader and reports failure counts without writing them.
By contrast, server startup calls
[ensureAccountIndexes](../server/accountIndexes.js), which creates/converts
unique indexes and refuses duplicates without deleting a winner. Existing-index
conversion uses `collMod`; a dated production boot needed `dbAdmin` permission.
Do not treat startup as a read-only audit or broaden database privileges blindly.

## Outstanding work and evidence limits

Use [PROJECT_IDEAS.md](PROJECT_IDEAS.md) for upcoming work and the
[privacy/safeguarding review brief](safeguarding/REVIEW_BRIEF.md) for consent,
age assurance, retention, supplier agreements and qualified-review questions.
Its 2026-10-15 snapshot reports backups inactive in 2026-10-10 notes; backup
status, regions and supplier settings need dashboard confirmation.

Source-confirmed on **2026-11-03**:

- Global selectors remain in [MathPractice.css](../src/pages/skills/math/MathPractice.css),
  [FindTheMissingNumber.css](../src/pages/skills/math/FindTheMissingNumber.css)
  and [SightWordPop.css](../src/pages/skills/english/SightWordPop.css), including
  bare `select` rules in the two Maths files. Scope changes one file at a time
  with visual checks.
- [Reward merging](../shared/mergeRewards.js) uses conservative maxima/unions;
  simultaneous distinct activity can undercount. It is not an exact
  cross-device attempt ledger.
- The old blanket claim that corrupt local collections always read empty and
  overwrite is too broad: [localStorageStore.js](../src/data/store/localStorageStore.js)
  now uses strict reads for progress/rewards and account creation. Some other
  collection reads remain permissive; no complete corruption audit was run.

Previously reported, **not rechecked**: whole-app keyboard/screen-reader and
both-theme contrast review; owner/content and physical-device teaching review;
meteor/constellation phone/tablet benchmarks; real-device speech quality; the
10-XP backfill/save-failure edge case; Reading Numbers' reported 775,840 cap;
and the unreachable Skills-grid width rule. Consult the relevant backlog and
subject trackers before treating implementation or automated checks as closure.

The historical “account-protection rollout pending” item was superseded by a
**2026-10-10 deployed** record confirming unique indexes and valid progress.
That is historical deployment evidence, not a fresh live audit. Closed bugs
and obsolete audit findings are in git history; do not reopen them without
checking current source.
