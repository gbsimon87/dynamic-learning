# 💡 Project Ideas — Dynamic Learning App

> **⚠️ AI-MAINTAINED DOCUMENT.**
> Keep this dashboard in sync with reality. When an idea is started, shipped, or
> dropped, update its **Status** row here and reflect the change in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md).

**Last reviewed:** 2026-08-09

### Context for prioritisation
- The app currently contains **only UK Year 2** education content.
- Curriculum Mode has challenges for **2 of 35 Year 2 Maths topics** — filling
  the remaining 33 topics is the single largest body of outstanding work.
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

---

## 📊 Status Dashboard

| # | Idea | Description | Status |
|---|---|---|---|
| 1 | **Complete Year 2 Maths curriculum** | Build challenges 1–4 for the remaining 33 Year 2 Maths topics (place value, addition/subtraction, multiplication/division, fractions, measurement, geometry, statistics). Biggest single body of work; unlocks the whole curriculum path. | 🟡 Partial (2/35 topics) |
| 2 | **UK Year 3 curriculum data model** | Author `year3MathCurriculum.js` from the UK National Curriculum programme of study, and generalise `CurriculumPage` to select a dataset by `year`/`subject` prop instead of the hard-coded Year 2 import. Prerequisite for all Year 3 content. | 🔵 Planned |
| 3 | **Year 3 Maths challenges** | Build challenges for Year 3 topics: numbers to 1000, column addition/subtraction, 3/4/8 times tables, tenths, mm/cm/m, perimeter, right angles, time to the minute. Depends on #2. | 🔵 Planned |
| 4 | **Year selector / learner profile** | Let a learner pick their year group (2 or 3) and remember it. Drives which curriculum is shown and keeps progress namespaced per year. Depends on #2. | 🔵 Planned |
| 5 | **Fix Counting Numbers subtraction bug** | Subtraction mode blocks the learner from advancing. Reported in `notes.md`. | 🐞 Bug |
| 6 | **Fix Number Bonds mode switch** | Cards stop flipping after switching game mode. Reported in `notes.md`. | 🐞 Bug |
| 7 | **Fix Word Sorter removal** | A word dropped into a category cannot be taken back out. Reported in `notes.md`. | 🐞 Bug |
| 8 | **Automated test setup** | Add Vitest + React Testing Library and cover the highest-risk logic first: unlock rules, progress persistence, and the challenge dynamic loader. Zero tests exist today. | ⚪ Idea |
| 9 | **Shared progress hook (`useProgress`)** | Extract the duplicated `localStorage` read/write logic out of `CurriculumPage` and `ProblemView` into one hook with a versioned schema and a migration path for renamed IDs. | ⚪ Idea |
| 10 | **Robust challenge registry** | Replace the `@vite-ignore` fully-dynamic import in `Challenge.jsx` with an `import.meta.glob` registry so Vite can statically resolve and code-split challenges, and so missing files are detectable at build time. | ⚪ Idea |
| 11 | **Progress dashboard for learners** | A visual "my journey" page — stars/streaks per topic, percent complete per category, and what to play next. Turns invisible `localStorage` state into motivation. | ⚪ Idea |
| 12 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers and Year 2 learners aren't blocked by reading ability. Also a foundation for phonics games. | ⚪ Idea |
| 13 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and colour-contrast audit across both themes. | ⚪ Idea |
| 14 | **Money & Measurement games** | Coin recognition, "make 10p", give-change, plus length/weight/volume comparison. Directly backs the Year 2 *Measurement* category and extends to Year 3 mm/cm/m. | ⚪ Idea |
| 15 | **Place Value Blocks** | Drag tens and ones blocks to build a number. Backs the Year 2 *Place Value* topic and scales to hundreds for Year 3. | ⚪ Idea |
| 16 | **Statistics games (pictograms, tally, block diagrams)** | Read and build pictograms, tally charts and block diagrams. Covers the entire Year 2 *Statistics* category, which has no games at all today. | ⚪ Idea |
| 17 | **Position & Direction games** | Pattern completion, sequences, and quarter/half/right-angle turns with an animated character. Covers the Year 2 *Geometry – Position and Direction* category. | ⚪ Idea |
| 18 | **3D Shape Sorter** | Match 3D solids (cube, sphere, cone, pyramid) to names and to their 2D faces. Extends the existing Shape Explorer and backs the Year 2 *3-D Shapes* topic. | ⚪ Idea |
| 19 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #12. Strengthens the English side, which is currently Skills-only. | ⚪ Idea |
| 20 | **English curriculum mode** | Extend Curriculum Mode beyond Maths — author a Year 2 English curriculum tree (phonics, spelling, grammar, comprehension) reusing the same category/topic/challenge machinery. | ⚪ Idea |
| 21 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. | ⚪ Idea |
| 22 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. | ⚪ Idea |
| 23 | **Geography curriculum expansion** | Turn the existing geography ideas backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. | ⚪ Idea |
| 24 | **Parent / teacher view** | A summary screen showing time spent, topics mastered and topics struggled with, plus a reset-progress control. Read-only, still fully client-side. | ⚪ Idea |
| 25 | **Cloud sync & multi-device profiles** | Optional accounts so progress follows the learner across devices, replacing `localStorage` as the only store. Requires the first backend — significant architectural change. | ⚪ Idea |
| 26 | **Rewards & motivation system** | Badges, streaks, and unlockable avatars awarded on challenge and topic completion. Hooks into the existing `onComplete` contract. | ⚪ Idea |
| 27 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. Would dramatically speed up ideas #1 and #3. | ⚪ Idea |
| 28 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. | ⚪ Idea |

---

## 🎯 Suggested Order

1. **Unblock quality:** #5, #6, #7 (bugs), then #8 and #9 (tests + shared progress hook).
2. **Unblock scale:** #27 (content authoring format) and #10 (challenge registry) — these make #1 and #3 far cheaper.
3. **Fill Year 2:** #1, supported by the topic-aligned games #14–#18.
4. **Open Year 3:** #2 → #3 → #4.
5. **Broaden and polish:** #12, #13, #11, #20 and beyond.
