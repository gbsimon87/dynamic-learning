# 💡 Project Ideas — Dynamic Learning App

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Nothing that is finished belongs in this file. When an idea ships, **delete its
> row** — do not mark it done and leave it behind — and record the outcome in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md), which is where history lives.
> The same goes for bugs: a fixed bug is deleted here and written up there.

**Last reviewed:** 2026-09-19

### Context for prioritisation
- The app ships **UK Year 2 Maths** complete in Curriculum Mode, plus standalone
  Skills Mode games. **UK Year 3 Maths** is laid out — 44 topics, 176 challenge
  slots. All seven categories and all 44 topics now have their 176 challenges,
  including Statistics (4 topics).
- Accounts and progress are served by a live backend, so ideas here can assume
  per-child persistence rather than device-local state.
- **Two kinds of account exist** as of 2026-09-19: a grown-up's, holding profiles
  for their children, and a **learner's**, an older child who signed up for
  themselves and owns their own profile. `accountType` distinguishes them and
  `isLearner` is exposed on the auth context. Any screen written for "the parent"
  now needs an answer for the learner case.
- **Progress is now readable from anywhere** (shipped 2026-09-19). Any new
  feature that needs "how far is this child?" should go through
  `curriculumProgressStats` (year / category / topic counts, built-only) and
  `curriculumResume` (most recently played curriculum, its breakdown, the next
  challenge) — via `useProgress` for the active child or `useChildrenProgress`
  for a list. Do not read the progress store directly; four screens agree today
  precisely because none of them does.
- **Nothing records per-attempt data.** The progress document stores completions
  only — no timestamps per challenge, no attempt counts, no wrong answers. #10
  and #11 both need that, and it is a new write path on the `onComplete`
  contract rather than a new view. Treat it as their shared prerequisite.
- Ideas are scoped to serve **both Year 2 and Year 3** where possible.

### Status key
| Status | Meaning |
|---|---|
| 🟡 Partial | Started; some of it exists |
| 🔵 Planned | Agreed as the next work, not started |
| ⚪ Idea | Captured, not yet committed to |

Ordered **easiest → hardest** to implement.

---

## 💡 Ideas

| # | Idea | Description | Status |
|---|---|---|---|
| 1 | **Remember a learner's year group** | `/curriculum` has a year picker (`CurriculumSelectPage`) offering Year 2 and Year 3 — what's missing is memory. The choice isn't stored anywhere, so every visit starts at the picker and a child can wander into the wrong year group. Store the year on the child profile and land them straight in it, with an obvious way to switch. Progress is already namespaced per `(childId, year, subject)`, so no storage change is needed — only a field on the child document and a default route. | ⚪ Idea |
| 2 | **Rewards & motivation system** | Badges, streaks, and unlockable avatars awarded on challenge and topic completion — the persistent layer beneath the shipped momentary celebrations (`completionMilestones.js`). Hooks into the same `onComplete` contract. | ⚪ Idea |
| 3 | **Automated component test setup** | Add Vitest + React Testing Library; neither is in `package.json` today. The **pure logic is well covered** by `node:test` — unlock rules, progress rules, curriculum navigation, account types, the `dl.lastAccount` record — so the remaining gaps are all things pure tests can't reach: (a) `useProgress` hydration and save guards — the `hydrated` flag and the loaded-document ref that stop one child's progress overwriting another's, currently verified only by hand on irreplaceable data; (b) `Challenge.jsx`'s two failure paths, missing-module vs failed-fetch, and the per-attempt state reset; (c) `src/data/store/apiStore.js`, which has no `fetch`-mocked tests despite being the live data path; (d) the signup wizard's branch logic, including the under-13 dead end. | ⚪ Idea |
| 4 | **Password reset & account recovery** | There is no way back into an account whose password is forgotten — no reset, no email verification, and an email address that is never proved to belong to anyone. That was survivable when only grown-ups held accounts; now that children hold their own it is the likeliest way someone loses their progress for good. Needs an email transport on the server (none exists), a single-use token with an expiry, and two screens. | ⚪ Idea |
| 5 | **Progress schema versioning & migration path** | Progress documents carry `schemaVersion: 1` but there is **no migration step that reads it**, so renaming a category, topic, or challenge ID still silently orphans a learner's completions. Add the migration hook in the store layer (`src/data/store/`) so IDs can be renamed safely, and a test per version bump. Touches irreplaceable learner data — follow the `curriculum-progress` skill's verification checklist. | ⚪ Idea |
| 6 | **Free-play Skills Mode games from the challenge kit** | Curriculum Mode locks its interactions into a fixed four-challenge structure. Wrap the existing challenge-kit components (`src/components/challenge/` — 39 of them) in free-play Skills Mode games — money (`CoinTray`), measurement (`ScaleReader`, `MeasureDrag`), position and direction (`RobotGrid`, `PositionBoard`), statistics (`BarChart`, `PictogramChart`, `TallyChart`) — so a learner can practise one skill without walking a topic. Skills Mode currently exposes none of the kit. **`PlaceValueBlocks` is built** and used by five Year 3 challenges, including hundreds, so that gap is closed — this is now purely about free-play wrappers. | 🟡 Partial |
| 7 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. The per-topic generator modules in `src/data/challenges/` are a step in this direction already. Makes #17 and future curriculum years substantially cheaper. | ⚪ Idea |
| 8 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and a colour-contrast audit across both themes. **One of 39 kit components handles keys at all** (`MeasureDrag`), so every other drag interaction is mouse- and touch-only. Contrast has been measured per-screen as pages were built, but never swept as a whole. | ⚪ Idea |
| 9 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers aren't blocked by reading ability. `SolarSystem.jsx` is the only place `speechSynthesis` is used today, and it is a fair template. Also the foundation for #13. | ⚪ Idea |
| 10 | **Parent / teacher summary view** | `/parent` now shows a per-child breakdown — year figure, category bars, topic counts (shipped 2026-09-19) — so the surface and its data path exist. What it still lacks is everything time-based and judgemental: **time spent**, **topics struggled with** (needs per-attempt data, which nothing records today — progress stores completions only), and a **reset-progress control**. The first two need a new write path on the challenge `onComplete` contract, not just a new view. Note a learner account sees this screen too, titled "My account". | 🟡 Partial |
| 11 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. The pure-generator pattern in `src/data/challenges/` is what makes this tractable — difficulty is already a parameter in most generators. | ⚪ Idea |
| 12 | **Verifiable parental consent** | The under-13 gate on signup is an honest speed bump, not a compliance implementation: a child can simply tap an older age. Fine for a family project; **not sufficient if this is ever published**, where UK AADC and COPPA both expect verifiable consent. Would build on #4's email transport: a grown-up's address, a confirmation round trip, and a record of it on the account. Revisit before any public launch, not before. | ⚪ Idea |
| 13 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #9. Strengthens the English side, which is currently Skills-only. | ⚪ Idea |
| 14 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. `stories.json` exists but feeds `SpeedReader` only — it is reading material, not a story-building format, so this needs its own content shape. | ⚪ Idea |
| 15 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. No manifest, service worker, or PWA plugin exists today. Note this interacts with the API store: offline progress would need a queue and a conflict rule. | ⚪ Idea |
| 16 | **Geography curriculum expansion** | Turn the geography backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) uses the REST Countries API and could filter by continent — "Which African country?" — enabling continent-focused topics. | ⚪ Idea |
| 17 | **English curriculum mode** | Extend Curriculum Mode beyond Maths — author a Year 2 English curriculum tree (phonics, spelling, grammar, comprehension) reusing the same category/topic/challenge machinery. Much cheaper after #7. | ⚪ Idea |

---

## 🎯 Suggested Order

1. **Cheapest real win first:** #1 (remember the year group). Year 3's 176
   challenges are built; nothing else makes them easier to return to.
2. **Close the motivation loop:** #2 (rewards). Progress visibility shipped
   2026-09-19, so the figures a badge would celebrate are now on screen and
   read from `curriculumResume` / `curriculumProgressStats`.
3. **Unblock quality:** #3 (component tests) and #5 (progress schema migration),
   before more content multiplies the surface area.
4. **Close the account gap:** #4 (password reset). Children now hold their own
   accounts, and there is currently no way back into a locked-out one.
5. **Unblock scale:** #7 (content authoring format) — makes #17 and future
   curriculum years far cheaper.
6. **Broaden and polish:** #6, #8, #9, #10 and beyond.
