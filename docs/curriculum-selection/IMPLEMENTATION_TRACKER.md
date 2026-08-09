# Curriculum Year & Subject Selection — Implementation Tracker

**Branch:** `feature/curriculum-year-subject-selection` (from `dev`)
**Started:** 2026-08-09
**Status:** ✅ Implementation complete, manually verified in browser

---

## 1. Problem

On the Home page, both **View Curriculum** and **Start Curriculum Journey** dropped the
learner straight into the Year 2 Maths curriculum. The year and subject were hard-coded:
`CurriculumPage` took `year = 2, subject = "math"` as default props and imported
`year2MathCurriculum` directly, so there was no way to reach any other curriculum and no
place to add one.

## 2. Goal

Let the learner choose **which year group** and **which subject** before entering a
curriculum, and make adding a new curriculum (e.g. Year 3 Maths) a data-only change.

## 3. Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Unavailable combinations | Shown, greyed out with "🔒 Coming soon" | Shows the learner the roadmap; avoids a picker with a single option |
| Selection flow | One page, two steps (year → subject) | Fewest clicks while keeping the two choices visually distinct |
| Remember last choice | No — always pick | Keeps behaviour predictable; explicitly chosen |
| Years listed | 1, 2, 3 | Matches the near-term roadmap (Year 3 is the planned next dataset) |
| Subjects listed | Maths, English, Geography, Science | Mirrors the subjects already present in Skills Mode |

## 4. Architecture

### Routes

| Route | Component | Notes |
| --- | --- | --- |
| `/curriculum` | `CurriculumSelectPage` | New picker. Home buttons point here (unchanged URL) |
| `/curriculum/year/:year/:subject` | `CurriculumPage` | New; reads params instead of hard-coded props |
| `/year/:year/:subject/problem/:categoryId/:topicId/:challengeId` | `ProblemView` | **Unchanged** — challenge links and progress keys keep working |

An unknown or not-yet-built `:year`/`:subject` pair redirects (`<Navigate replace>`) back
to `/curriculum`.

### Registry — `src/data/curriculumRegistry.js`

Single source of truth for which curricula exist. Exports:

- `CURRICULUM_YEARS` — `[1, 2, 3]`
- `CURRICULUM_SUBJECTS` — id / display name / icon
- `findCurriculum`, `isCurriculumAvailable`, `isYearAvailable`
- `loadCurriculum(year, subject)` — returns the dataset array, or `null`
- `getSubjectName(subjectId)` — display name

Only `{ year: 2, subject: "math" }` is currently marked `available: true`.

### Progress safety

The localStorage key was already parameterised as `` `${subject}Progress_year${year}` ``.
Since Year 2 Maths still resolves to `year: 2, subject: "math"`, the key is byte-identical
to before and **existing learner progress is untouched**. No migration was needed.

## 5. Adding a new curriculum later

1. Create the dataset file in `src/data/` (same shape as `year2MathCurriculum.js`).
2. Add one entry to `CURRICULA` in `curriculumRegistry.js` with `available: true` and a
   `load` function.

Nothing else in the app needs to change — the picker un-greys the card automatically.

---

## 6. Status Dashboard

| # | Task | Area | Status | Notes |
| --- | --- | --- | --- | --- |
| 1 | Create feature branch from `dev` | Git | ✅ Done | `feature/curriculum-year-subject-selection` |
| 2 | Build curriculum registry | `src/data/curriculumRegistry.js` | ✅ Done | Years 1–3 × 4 subjects; Year 2 Maths available |
| 3 | Build `CurriculumSelectPage` | `src/pages/curriculum/` | ✅ Done | Two-step year → subject picker |
| 4 | Style the picker | `CurriculumSelectPage.css` | ✅ Done | Reuses existing card/badge/dark-mode tokens |
| 5 | Make `CurriculumPage` param-driven | `CurriculumPage.jsx` | ✅ Done | `useParams` + registry lookup, replaces hard-coded import |
| 6 | Add invalid-combo redirect guard | `CurriculumPage.jsx` | ✅ Done | Placed after hooks so hook order stays stable |
| 7 | Add "Change year or subject" link | `CurriculumPage.jsx` | ✅ Done | Returns to the picker |
| 8 | Register new routes | `src/main.jsx` | ✅ Done | Picker + `curriculum/year/:year/:subject` |
| 9 | Fix post-challenge redirects | `ProblemView.jsx`, `Challenge.jsx` | ✅ Done | Were `/curriculum` (picker); now return to the learner's own curriculum |
| 10 | Update Home page copy | `Home.jsx` | ✅ Done | "Begin Your Journey →"; links unchanged |
| 11 | Verify production build | Build | ✅ Done | `npm run build` succeeds |
| 12 | Verify picker in browser | Manual QA | ✅ Done | Years 1/3 and non-Maths subjects greyed and unclickable |
| 13 | Verify Year 2 Maths still works | Manual QA | ✅ Done | Renders "Year 2 Maths"; lock/unlock state preserved |
| 14 | Verify invalid-combo redirect | Manual QA | ✅ Done | `/curriculum/year/3/english` → `/curriculum` |

### Known / out of scope

| Item | Status | Notes |
| --- | --- | --- |
| Empty `catch {}` lint error in `CurriculumPage.jsx` | ⚠️ Pre-existing | Confirmed present on `dev` before this branch; left untouched |
| Year 1 / Year 3 datasets | 🔲 Not started | Follow the "Adding a new curriculum later" steps above |
| English / Geography / Science curricula | 🔲 Not started | Placeholder cards only |
