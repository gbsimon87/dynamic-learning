# 💡 Project Ideas — Dynamic Learning App

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Nothing that is finished belongs in this file. When an idea ships, **delete its
> row** — do not mark it done and leave it behind — and record the outcome in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md), which is where history lives.
> The same goes for bugs: a fixed bug is deleted here and written up there.

**Last reviewed:** 2026-09-18

### Context for prioritisation
- The app ships **UK Year 2 Maths** complete in Curriculum Mode, plus standalone
  Skills Mode games. **UK Year 3 Maths** is laid out — 44 topics, 176 challenge
  slots — but no Year 3 challenges are built yet, so it all reads "Coming soon".
- Accounts and progress are served by a live backend, so ideas here can assume
  per-child persistence rather than device-local state.
- Ideas are scoped to serve **both Year 2 and Year 3** where possible.

### Status key
| Status | Meaning |
|---|---|
| 🔵 Planned | Agreed as the next work, not started |
| ⚪ Idea | Captured, not yet committed to |

Ordered **easiest → hardest** to implement.

---

## 💡 Ideas

| # | Idea | Description | Status |
|---|---|---|---|
| 1 | **Celebration moments (challenge, section, year)** | Every completion ends in the same quiet screen, so nothing marks the difference between finishing one challenge and finishing a whole year. Add three escalating celebrations: a light one per **challenge** (confetti burst / stamp / sound), a bigger one per **section** — topic and category — and a full-screen Duolingo-style moment for a **year**, with a summary of what was completed. Hooks into the `onComplete` contract so it can be one shared component rather than per-challenge code. Must honour `prefers-reduced-motion`, stay skippable, and never block the **Next challenge** action already on the completion panel. | ⚪ Idea |
| 2 | **Progress visibility (per year, per topic)** | A learner has no way to see how far through a year or a topic they are — the state sits in the progress store and is never surfaced. Start on `/profiles`, which already loads every child: percent complete per year on the profile card, then a per-category and per-topic breakdown when a profile is opened. Read through `useProgress` rather than touching storage directly. Grows into a fuller "my journey" view — stars/streaks per topic, percent complete per category, and a "what to play next" hint reusing `findNextChallenge` from `src/data/curriculumNavigation.js`. | ⚪ Idea |
| 3 | **Rewards & motivation system** | Badges, streaks, and unlockable avatars awarded on challenge and topic completion — the persistent layer beneath #1's momentary celebrations. Hooks into the same `onComplete` contract. | ⚪ Idea |
| 4 | **Automated component test setup** | Add Vitest + React Testing Library. The **unlock rules are now covered** by 37 pure `node:test` cases across `progressRules` / `curriculumLocks` / `curriculumNavigation` (2026-09-18), so the remaining gaps are all things pure tests can't reach: (a) `useProgress` hydration and save guards — the `hydrated` flag and the loaded-document ref that stop one child's progress overwriting another's, currently verified only by hand on irreplaceable data; (b) `Challenge.jsx`'s two failure paths, missing-module vs failed-fetch, and the per-attempt state reset; (c) `src/data/store/apiStore.js`, which has no `fetch`-mocked tests despite being the live data path. | ⚪ Idea |
| 5 | **Progress schema versioning & migration path** | The stored progress shape has no version field and no migration path, so renaming a category, topic, or challenge ID silently orphans a learner's completions. Add a versioned schema plus a migration step in the store layer (`src/data/store/`) so IDs can be renamed safely. Touches irreplaceable learner data — follow the `curriculum-progress` skill's verification checklist. | ⚪ Idea |
| 6 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. Makes #17 and #18 substantially cheaper. | ⚪ Idea |
| 7 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and a colour-contrast audit across both themes. No drag-and-drop interaction currently has a keyboard or screen-reader alternative. | ⚪ Idea |
| 8 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers aren't blocked by reading ability. Also the foundation for #12. | ⚪ Idea |
| 9 | **Parent / teacher view** | A summary screen showing time spent, topics mastered, and topics struggled with, plus a reset-progress control. Read-only. Distinct from #2, which is learner-facing. | ⚪ Idea |
| 10 | **Free-play Skills Mode games + Place Value Blocks** | Curriculum Mode locks its interactions into a fixed four-challenge structure. Wrap the existing challenge-kit components (`src/components/challenge/`) in free-play Skills Mode games — money, measurement, shapes, position and direction, statistics — so a learner can practise one skill without walking a topic. Also build the one interaction the kit lacks: **Place Value Blocks**, dragging tens and ones to build a number, scaling to hundreds for Year 3. Reuse the kit rather than building parallel components. | ⚪ Idea |
| 11 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. | ⚪ Idea |
| 12 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #8. Strengthens the English side, which is currently Skills-only. | ⚪ Idea |
| 13 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. | ⚪ Idea |
| 14 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. No manifest, service worker, or PWA plugin exists today. | ⚪ Idea |
| 15 | **Geography curriculum expansion** | Turn the geography backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) uses the REST Countries API and could filter by continent — "Which African country?" — enabling continent-focused topics. | ⚪ Idea |
| 16 | **Remember a learner's year group** | `/curriculum` already has a year picker (`CurriculumSelectPage`) and it offers Year 3 as of 2026-09-18 — what's missing is memory. The choice isn't stored, so every visit starts at the picker and a child can wander into the wrong year group. Store the year on the child profile and land them straight in it, with an obvious way to switch. Progress is already namespaced per `(childId, year, subject)`, so no storage change is needed. | ⚪ Idea |
| 17 | **English curriculum mode** | Extend Curriculum Mode beyond Maths — author a Year 2 English curriculum tree (phonics, spelling, grammar, comprehension) reusing the same category/topic/challenge machinery. Much cheaper after #6. | ⚪ Idea |
| 18 | **Year 3 Maths challenges** | Build challenges for Year 3 topics: numbers to 1000, column addition/subtraction, 3/4/8 times tables, tenths, mm/cm/m, perimeter, right angles, time to the minute. Depends on the Year 3 dataset (shipped 2026-09-18). Follow the `building-curriculum-topics` skill and compose the shared kit rather than copying challenges. | 🔵 Planned |

---

## 🎯 Suggested Order

1. **Close the motivation loop:** #1 (celebrations) → #2 (progress visibility) →
   #3 (rewards). All three build on the `onComplete` contract and the progress
   store, and are independent of Year 3. The next-challenge flow that opened this
   sequence shipped on 2026-09-18.
2. **Unblock quality:** #4 (component tests) and #5 (progress schema versioning),
   before more content multiplies the surface area.
3. **Unblock scale:** #6 (content authoring format) — makes #17 and #18 far cheaper.
4. **Open Year 3:** the dataset shipped 2026-09-18; next is #18 (Year 3 Maths
   challenges), with #16 (year selector) alongside it.
5. **Broaden and polish:** #7, #8, #9, #10 and beyond.
