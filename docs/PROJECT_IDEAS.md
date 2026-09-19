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
  slots. Six categories are complete — Number and Place Value (7), Addition
  and Subtraction (6), Multiplication and Division (5), Fractions (7),
  Measurement (9), and Properties of Shapes (6) — so 40 of 44 topics have
  challenges; the other 4 still read "Coming soon".
- Accounts and progress are served by a live backend, so ideas here can assume
  per-child persistence rather than device-local state.
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
| 1 | **Progress visibility (per year, per topic)** | A learner has no way to see how far through a year or a topic they are — the state sits in the progress store and is never surfaced. Start on `/profiles`, which already loads every child: percent complete per year on the profile card, then a per-category and per-topic breakdown when a profile is opened. Read through `useProgress` rather than touching storage directly. Grows into a fuller "my journey" view — stars/streaks per topic, percent complete per category, and a "what to play next" hint reusing `findNextChallenge` from `src/data/curriculumNavigation.js`. | ⚪ Idea |
| 2 | **Rewards & motivation system** | Badges, streaks, and unlockable avatars awarded on challenge and topic completion — the persistent layer beneath the shipped momentary celebrations. Hooks into the same `onComplete` contract. | ⚪ Idea |
| 3 | **Automated component test setup** | Add Vitest + React Testing Library. The **unlock rules are now covered** by 37 pure `node:test` cases across `progressRules` / `curriculumLocks` / `curriculumNavigation` (2026-09-18), so the remaining gaps are all things pure tests can't reach: (a) `useProgress` hydration and save guards — the `hydrated` flag and the loaded-document ref that stop one child's progress overwriting another's, currently verified only by hand on irreplaceable data; (b) `Challenge.jsx`'s two failure paths, missing-module vs failed-fetch, and the per-attempt state reset; (c) `src/data/store/apiStore.js`, which has no `fetch`-mocked tests despite being the live data path. | ⚪ Idea |
| 4 | **Progress schema versioning & migration path** | The stored progress shape has no version field and no migration path, so renaming a category, topic, or challenge ID silently orphans a learner's completions. Add a versioned schema plus a migration step in the store layer (`src/data/store/`) so IDs can be renamed safely. Touches irreplaceable learner data — follow the `curriculum-progress` skill's verification checklist. | ⚪ Idea |
| 5 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. Makes #16 and #17 substantially cheaper. | ⚪ Idea |
| 6 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and a colour-contrast audit across both themes. No drag-and-drop interaction currently has a keyboard or screen-reader alternative. | ⚪ Idea |
| 7 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers aren't blocked by reading ability. Also the foundation for #11. | ⚪ Idea |
| 8 | **Parent / teacher view** | A summary screen showing time spent, topics mastered, and topics struggled with, plus a reset-progress control. Read-only. Distinct from #1, which is learner-facing. | ⚪ Idea |
| 9 | **Free-play Skills Mode games + Place Value Blocks** | Curriculum Mode locks its interactions into a fixed four-challenge structure. Wrap the existing challenge-kit components (`src/components/challenge/`) in free-play Skills Mode games — money, measurement, shapes, position and direction, statistics — so a learner can practise one skill without walking a topic. Also build the one interaction the kit lacks: **Place Value Blocks**, dragging tens and ones to build a number, scaling to hundreds for Year 3. Reuse the kit rather than building parallel components. | ⚪ Idea |
| 10 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. | ⚪ Idea |
| 11 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #7. Strengthens the English side, which is currently Skills-only. | ⚪ Idea |
| 12 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. | ⚪ Idea |
| 13 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. No manifest, service worker, or PWA plugin exists today. | ⚪ Idea |
| 14 | **Geography curriculum expansion** | Turn the geography backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) uses the REST Countries API and could filter by continent — "Which African country?" — enabling continent-focused topics. | ⚪ Idea |
| 15 | **Remember a learner's year group** | `/curriculum` already has a year picker (`CurriculumSelectPage`) and it offers Year 3 as of 2026-09-18 — what's missing is memory. The choice isn't stored, so every visit starts at the picker and a child can wander into the wrong year group. Store the year on the child profile and land them straight in it, with an obvious way to switch. Progress is already namespaced per `(childId, year, subject)`, so no storage change is needed. | ⚪ Idea |
| 16 | **English curriculum mode** | Extend Curriculum Mode beyond Maths — author a Year 2 English curriculum tree (phonics, spelling, grammar, comprehension) reusing the same category/topic/challenge machinery. Much cheaper after #5. | ⚪ Idea |
| 17 | **Year 3 Maths challenges** | **40 of 44 topics built** — six categories are complete: Number and Place Value (7 topics), Number - Addition and Subtraction (6), Number - Multiplication and Division (5), Fractions (7), Measurement (9), and Geometry - Properties of Shapes (6), for 160 challenges. Properties of Shapes landed 2026-09-19 without a new kit component: it extends and composes `ShapeFigure`, `SolidFigure`, `AngleExplorer`, `RotationDial`, and `DragToOrder`, with seeded geometry checks across all six topics. Only the four Statistics topics remain. They should follow the same shape: a pure generator, then four challenges that escalate — stated rule, inferred rule, whole-structure work, applied. | 🟡 Partial |

---

## 🎯 Suggested Order

1. **Close the motivation loop:** #1 (progress visibility) → #2 (rewards).
   Celebrations and the next-challenge flow shipped on 2026-09-18; these next
   steps build on the same `onComplete` contract and progress store.
2. **Unblock quality:** #3 (component tests) and #4 (progress schema versioning),
   before more content multiplies the surface area.
3. **Unblock scale:** #5 (content authoring format) — makes #16 and #17 far cheaper.
4. **Open Year 3:** the dataset shipped 2026-09-18; next is #17 (Year 3 Maths
   challenges), with #15 (year selector) alongside it.
5. **Broaden and polish:** #6, #7, #8, #9 and beyond.
