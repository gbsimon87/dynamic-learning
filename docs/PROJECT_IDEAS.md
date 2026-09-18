# 💡 Project Ideas — Dynamic Learning App

> **⚠️ AI-MAINTAINED DOCUMENT.**
> Keep this dashboard in sync with reality. When an idea is started, shipped, or
> dropped, update its **Status** row here and reflect the change in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md).

**Last reviewed:** 2026-09-15

### Context for prioritisation
- The app currently contains **only UK Year 2** education content.
- Curriculum Mode has challenges for **17 of 39 Year 2 Maths topics** — all of
  "Number and Place Value", "Addition and Subtraction" and "Multiplication and
  Division". Filling the remaining 22 topics is the single largest body of
  outstanding work.
- **UK Year 3** is the next planned year group and is not started.
- Ideas below are scoped so they can serve **both Year 2 and Year 3** where possible.

### Status key
| Status | Meaning |
|---|---|
| ✅ Done | Built and shipped |
| 🟡 Partial | Some of it exists; incomplete |
| 🔵 Planned | Agreed as the next work, not started |
| ⚪ Idea | Captured, not yet committed to |
| 🐞 Bug | Known defect awaiting a fix |

Both tables below are ordered **easiest → hardest** to implement.

---

## 🐞 Bugs

| # | Idea | Description | Status |
|---|---|---|---|
| 1 | **Fix Number Bonds match mode flip** | Confirmed and fixed on 2026-08-09: `.bonds-card-inner` lacked `transform-style: preserve-3d` (and `position: relative`), so the child `.bonds-card-back`'s own `rotateY(180deg)` composed with the parent's rotation in the same flattened plane, rendering the back face mirrored/illegible instead of upright — clicking a card looked like nothing happened beyond the flip animation. Added `position: relative; transform-style: preserve-3d;` to `.bonds-card-inner` in `NumberBonds.css`; verified in-browser that flipping, matching, and scoring all work correctly. | ✅ Done |
| 2 | **Rename Counting Numbers to Reading Numbers** | Closed 2026-08-09: the original subtraction-mode report never matched the component (it has no math operations, only min/max random generation with text/number display), so rather than build subtraction behaviour that was never in scope, the game was renamed everywhere to **Reading Numbers** — its actual purpose. Route `/counting-numbers` → `/reading-numbers`; `CountingNumbers.jsx`/`CountingNumbersPanel.jsx`/`.css` → `ReadingNumbers.jsx`/`ReadingNumbersPanel.jsx`/`.css`. Also capped the generated number range at **775,840** in JS (`MAX_ALLOWED`), noted in `PROJECT_KNOWLEDGE.md` §6 as a known limitation of the `written-number` package. | ✅ Done |
| 3 | **Fix Word Sorter removal** | Fixed 2026-08-09: root cause was that bucket tiles rendered as plain `<div>`s instead of `Draggable`s, and `handleDragEnd` only handled word-bank → bucket moves — so a sorted word had no drag handle and no code path to move it again. Wrapped bucket items in `Draggable` (same pattern as the word bank) and extended `handleDragEnd` to branch on source: bank → bucket (existing), bucket → bank, and bucket → bucket. Also guarded the round-completion `useEffect` with `!completed` so bucket-to-bucket moves after all 6 words are placed don't re-trigger scoring. Verified in-browser with real mouse-drag simulation: bank→bucket, bucket→bank, and bucket→bucket moves all work. | ✅ Done |
| 4 | ✅ **Fixed 2026-09-18. Numbers and Counting Challenge 3 rejects correct answers** | Found 2026-08-09 while manually verifying the `useProgress` hook extraction (idea #3): filling in every blank in `NumbersAndCountingChallenge3.jsx` with the visibly-correct sequence value still produces "❌ Not quite! Try again." — confirmed the file is unmodified vs `dev`, so this is pre-existing and unrelated to that refactor. Root cause not yet investigated; suspect the `missingIndices`/`sequence` `useMemo`s recomputing between render and submit, or a stale-closure issue in `handleSubmit`. **Root cause:** `handleSubmit` compared `answers[i] === sequence[i].toString()`, a STRING comparison, so any answer padded with a leading zero ("043" for 43) was rejected while looking correct on screen. Reproduced 2026-09-18 by filling one blank with a leading zero. Fixed by rebuilding the topic on the shared kit and comparing by value via `isCorrectNumber`, which is unit-tested. | ✅ Fixed |

---

## 💡 Ideas

| # | Idea | Description | Status |
|---|---|---|---|
| 1 | **Robust challenge registry** | ✅ **Done.** `Challenge.jsx` now resolves challenges via a static `import.meta.glob("../skills/*/challenges/year*/*/*Challenge*.jsx")` registry instead of a fully-dynamic `/* @vite-ignore */` import, so Vite can statically analyse and code-split challenges and missing files fail with a clear error. | ✅ Done |
| 2 | **Automated component test setup** | Add Vitest + React Testing Library and cover the highest-risk UI and React logic first: unlock rules, progress persistence, and the challenge loader. Pure Speed Reader logic now has dependency-free `node:test` coverage, but no component test environment exists. | ⚪ Idea |
| 3 | **Shared progress hook (`useProgress`)** | Done 2026-08-09: extracted the duplicated `localStorage` read/write logic out of `CurriculumPage` and `ProblemView` into `src/hooks/useProgress.js`. It owns the storage key, hydration guard, and the `isTopicComplete`/`isCategoryComplete`/`isChallengeComplete`/`completeChallenge` predicates; unlock-rule computation (`categoryLocked`/`topicLocked`/`challengeLocked`) stays in `CurriculumPage` since it's UI-adjacent, not storage. Stored shape and all behavior preserved exactly — verified against every check in the `curriculum-progress` skill's checklist (fresh user, single completion, persistence, topic cascade, category cascade, replay-without-duplication). **Deliberately deferred:** the versioned schema and ID-rename migration path mentioned in the original idea — that's a separate design decision with its own risk profile on irreplaceable learner data, tracked as its own follow-up rather than bundled into this extraction. | ✅ Done (extraction); versioning/migration deferred |
| 4 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. Would dramatically speed up ideas #6 and #8 below. | ⚪ Idea |
| 5 | **Place Value Blocks** | Drag tens and ones blocks to build a number. Backs the Year 2 *Place Value* topic and scales to hundreds for Year 3. | ⚪ Idea |
| 6 | **3D Shape Sorter** | Match 3D solids (cube, sphere, cone, pyramid) to names and to their 2D faces. Extends the existing Shape Explorer and backs the Year 2 *3-D Shapes* topic. | ⚪ Idea |
| 7 | **Money & Measurement games** | Coin recognition, "make 10p", give-change, plus length/weight/volume comparison. Directly backs the Year 2 *Measurement* category and extends to Year 3 mm/cm/m. | ⚪ Idea |
| 8 | **Statistics games (pictograms, tally, block diagrams)** | Read and build pictograms, tally charts and block diagrams. Covers the entire Year 2 *Statistics* category, which has no games at all today. | ⚪ Idea |
| 9 | **Position & Direction games** | Pattern completion, sequences, and quarter/half/right-angle turns with an animated character. Covers the Year 2 *Geometry – Position and Direction* category. | ⚪ Idea |
| 10 | **Rewards & motivation system** | Badges, streaks, and unlockable avatars awarded on challenge and topic completion. Hooks into the existing `onComplete` contract. | ⚪ Idea |
| 11 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. | ⚪ Idea |
| 12 | **Progress dashboard for learners** | A visual "my journey" page — stars/streaks per topic, percent complete per category, and what to play next. Turns invisible `localStorage` state into motivation. | ⚪ Idea |
| 13 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and colour-contrast audit across both themes. | ⚪ Idea |
| 14 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers and Year 2 learners aren't blocked by reading ability. Also a foundation for phonics games. | ⚪ Idea |
| 15 | **Parent / teacher view** | A summary screen showing time spent, topics mastered and topics struggled with, plus a reset-progress control. Read-only, still fully client-side. | ⚪ Idea |
| 16 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #14. Strengthens the English side, which is currently Skills-only. | ⚪ Idea |
| 17 | **Geography curriculum expansion** | Turn the existing geography ideas backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. The existing [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) uses the REST Countries API and could be easily expanded to filter by continent — e.g. "Which African country?" or "Which European flag?" — enabling continent-focused topics within the geography curriculum. | ⚪ Idea |
| 18 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. | ⚪ Idea |
| 19 | **English curriculum mode** | Extend Curriculum Mode beyond Maths — author a Year 2 English curriculum tree (phonics, spelling, grammar, comprehension) reusing the same category/topic/challenge machinery. | ⚪ Idea |
| 20 | **Complete Year 2 Maths curriculum** | Build challenges 1–4 for the remaining 22 Year 2 Maths topics (place value, addition/subtraction, multiplication/division, fractions, measurement, geometry, statistics). Biggest single body of work; unlocks the whole curriculum path. The three Number categories were completed 2026-09-18 on the shared challenge kit (`src/components/challenge/`); follow the `building-curriculum-topics` skill, composing the kit rather than copying a challenge and extending it when a topic needs an interaction it lacks. | 🟡 Partial (17/39 topics — all three Number categories complete) |
| 21 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. Not implemented in any form today — no manifest, service worker, or PWA plugin exists in the codebase. | ⚪ Idea |
| 22 | **UK Year 3 curriculum data model** | Author `year3MathCurriculum.js` from the UK National Curriculum programme of study, and generalise `CurriculumPage` to select a dataset by `year`/`subject` prop instead of the hard-coded Year 2 import. Prerequisite for all Year 3 content. | 🔵 Planned |
| 23 | **Year 3 Maths challenges** | Build challenges for Year 3 topics: numbers to 1000, column addition/subtraction, 3/4/8 times tables, tenths, mm/cm/m, perimeter, right angles, time to the minute. Depends on #22. | 🔵 Planned |
| 24 | **Year selector / learner profile** | Let a learner pick their year group (2 or 3) and remember it. Drives which curriculum is shown and keeps progress namespaced per year. Depends on #22. | 🔵 Planned |
| 25 | **MongoDB backend for accounts & progress** | 🟡 **Built 2026-09-15, not yet deployed.** Express + MongoDB Atlas API in `server/`, deployed as a single Render Web Service that serves both `/api/*` and the built SPA from one origin (so the session is an HTTP-only cookie, no CORS). Client driver `src/data/store/apiStore.js` implements the identical async store interface; `src/data/store/index.js` picks it when built with `VITE_USE_API=true`, defaulting to localStorage, so **no consuming component changed**. Atlas database `dynamic_learning` holds `parents`/`children`/`progress`. Verified end-to-end in a browser against a live server: signup, profile creation, completing a real curriculum challenge, sign-out, sign-in, progress intact — and 13 server authorization tests incl. a cross-account probe. **Remaining before it is live:** (a) deploy to Render and set `MONGODB_URI` + `SESSION_SECRET` there, (b) allow-list Render's outbound IPs in Atlas Network Access, (c) build with `VITE_USE_API=true` — note it is a BUILD-time switch, (d) add the two unique indexes (see `PROJECT_KNOWLEDGE.md` §6 item 8), (e) rotate the dev Atlas password. See [DEPLOYMENT.md](DEPLOYMENT.md). **No data migration** — dropped by decision; a Mongo-backed install starts empty. | 🟡 Deployment pending |
| 27 | **Parent accounts & child profiles (local)** | Done 2026-09-15. Parent signs up with email + password (PBKDF2-SHA-256, 150k iterations, Web Crypto, no dependency); child profiles are name + emoji avatar + colour, picked by tapping an avatar on `/profiles` — children never type a password. Curriculum Mode is gated behind `RequireChild`; Skills Mode stays open. Progress moved from the single `mathProgress_year2` key to one document per `(childId, year, subject)`. A legacy-progress migration was built and then **deliberately removed on 2026-09-15** — there is no migration path and new profiles start empty. **All storage is local** — see #25 for the outstanding backend. Built behind a deliberately async store interface (`src/data/store/`) so the backend swap is a driver change; see `PROJECT_KNOWLEDGE.md` §4.7. Verified in-browser: gating, profile isolation on switch, reload persistence, and measured AA contrast in both themes. | ✅ Done (local only) |
| 26 | **Speed Reader (spritz)** | Done 2026-09-10. English & Words game at `/speed-reader` with six built-in stories and comprehension questions plus custom text. Supports 1–3-word chunks, 60–300 WPM, pivot highlighting, punctuation-aware pacing, pause/step/live-speed controls, and a read-again-faster loop. Pure pacing and content-shape logic is covered by `node:test`. | ✅ Done |

---

## 🎯 Suggested Order

1. **Unblock quality:** Bugs #1–#3, then Ideas #2 and #3 (tests + shared progress hook).
2. **Unblock scale:** Idea #4 (content authoring format) — makes Ideas #20 and #23 far cheaper. Idea #1 (challenge registry) is already done.
3. **Fill Year 2:** Idea #20, supported by the topic-aligned games #5–#9.
4. **Open Year 3:** #22 → #23 → #24.
5. **Broaden and polish:** #14, #13, #12, #19 and beyond.

**Outstanding for Simon:** #25 (MongoDB backend) — accounts exist but are local-only
until that lands.
