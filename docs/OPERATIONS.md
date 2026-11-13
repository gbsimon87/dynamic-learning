# Operations and outstanding review

Operating reference from repository configuration and source. Hosting
dashboards, DNS and live databases are not visible from the repo: confirm them
before acting.

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

**Hosting (last recorded October 2026):** Blueprint “DEV DL” auto-syncs
configuration from **`dev`**, while production code deploys from **`main`**, so
pushing `render.yaml` to dev can change production's plan/branch. Preserve
production **Starter + main**. Dashboard services are `dynamic-learning-zkww`
and `dynamic-learning-dev-zkww`; the old `dynamic-learning-n72m` static site is
retired and must not receive configuration.

DNS is at Namecheap: apex A `216.24.57.1`, `www` CNAME
`dynamic-learning-zkww.onrender.com`, Render www-to-apex redirect. Preserve
website and Resend records when editing DNS. Infrastructure names deliberately
keep “dynamic-learning” so accounts and progress do not move.

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
after configuration changes. See [SEO.md](SEO.md) for the indexing policy and
open live checks.

[server/email.js](../server/email.js) sends through Resend when both mail
variables are set. With neither set outside production it logs codes/links;
production without both configured skips verification. Incomplete mail
configuration also disables sending. Do not interpret a successful signup as
proof that verification ran. Keys are sending-only; inspect sent mail in the
Resend dashboard.

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
conversion uses `collMod`, which needs `dbAdmin` permission.
Do not treat startup as a read-only audit or broaden database privileges blindly.

### Curriculum introductions and quizzes

Live in production. Two rollback switches, on unless set to `"false"` (both
`"true"` in [render.yaml](../render.yaml) and [.env.example](../.env.example)):
`VITE_ENABLE_CURRICULUM_JOURNEY` (client, build time) and
`ENABLE_CURRICULUM_JOURNEY` (server). Change **both together**; keep
`npm run check:journey -- --all` passing before each release.
With the server switch off, `/api/curriculum-journey/*` authenticates and checks
ownership, then answers `503 JOURNEY_DISABLED`.

Startup adds two collections and new indexes only (`curriculumJourney` unique
`(childId, year, subject)`; `curriculumAssessments` unique `(childId, sessionId)`
plus a history index). Existing progress/reward documents and indexes are
unchanged. Records are kept with the child until child or account deletion,
which removes them; there is no automatic expiry and no approved retention
period yet (see the review brief). **Rollback:** set both flags to `"false"`
and redeploy. Never drop these collections or clear storage to roll back.
Local development keeps them under `dl.curriculumJourney` and
`dl.curriculumAssessments`.

## Outstanding review and known limits

Upcoming work is in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Delete a line here
when it is resolved.

**Privacy and safeguarding.** The [review brief](safeguarding/REVIEW_BRIEF.md)
holds the open consent, age-assurance, retention, supplier-agreement and
qualified-review questions. Backup status, regions and supplier settings need
dashboard confirmation.

**Curriculum journey release.** Live in production. All 39 pathways
pass `check:journey --all` and have had an independent model answer review; no
human content review has been done. Print answer-key packs with
`npm run journey:review -- --all`. Read-aloud text is generated (Maths through
`mathToSpeech`) but has not been heard on real devices. One browser pass ran the
full Year 3 Maths, Year 5 French and Year 5 Music final tests at 390px and
1280px in both themes. Owner/teacher, device and learner review are still
needed; fix findings in content, or set both switches to `"false"` if a
pathway must come down.

**Family Friday Quiz.** Owner/parent content review, real-device touch/read-aloud
checks and a family playtest of the five-minute target remain pending; see
[FAMILY_FRIDAY.md](FAMILY_FRIDAY.md).

**Content and device review.** Owner/teacher content review is pending for Year 6
History (Jarrow facts, sensitive topics, reference URLs never fetched), Year 6
Geography, Year 6 Computing (Online World safety topics), Year 6 French (all
banks, especially texts and dictionary entries), Year 5 History, the teacher
notes, parent explainers and practice-sheet builder. Year 3 wording review: Maths
and Science done; English, History and Geography not started. Physical-device, touch, speech,
whole-app keyboard/screen-reader and both-theme contrast review has not been
done for any course. Ocean Explorer sea-life facts await owner review. Meteor
and constellation scenes have no phone/tablet benchmarks (targets in
[EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md)).

**Known limits in source:**

- Auth throttling ([authThrottle.js](../server/authThrottle.js)) is an in-memory
  map per process: not shared across instances or restarts. Coordinate it
  before scaling out.
- Database-dependent tests (ownership, signup, index conversion) skip when
  `MONGODB_URI` is unset; a skip is not database coverage. Their cleanup needs
  `dropDatabase` and index conversion needs `collMod`.
- [Reward merging](../shared/mergeRewards.js) uses conservative maxima/unions;
  simultaneous activity on two devices can undercount.
- [localStorageStore.js](../src/data/store/localStorageStore.js) reads
  progress/rewards and account creation strictly; some other collection reads
  remain permissive.
- Global selectors remain in [MathPractice.css](../src/pages/skills/math/MathPractice.css),
  [FindTheMissingNumber.css](../src/pages/skills/math/FindTheMissingNumber.css)
  and [SightWordPop.css](../src/pages/skills/english/SightWordPop.css), including
  bare `select` rules. Scope one file at a time with visual checks.

**Reported, not rechecked:** the 10-XP backfill/save-failure edge case, Reading
Numbers' reported 775,840 cap and an unreachable Skills-grid width rule. Check
current source before working on them.
