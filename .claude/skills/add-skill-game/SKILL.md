---
name: add-skill-game
description: Use when adding a new standalone Skills Mode mini-game (math, english, geometry, or geography) to the Learn with Bix app - covers the two required registration points, folder placement, and the conventions that keep games consistent.
---

# Adding a Skills Mode Game

Skills Mode games are standalone, unlocked, untracked practice — the opposite of
Curriculum Mode. A learner reaches them from the Skills hub and can play any of
them at any time.

## The failure mode this prevents

A new game must be registered in **two separate files**. Miss the second and the
game works at its URL but is invisible to every learner:

1. `src/main.jsx` — the lazy route
2. `shared/skillsCatalog.js` — the game in the right subject group (the hub renders its `<Link>`)

Also add its public description, instructions and skill list to
`shared/skillGuides.js`. This creates `/learn/<game-slug>`, its metadata and its
sitemap entry through the shared SEO catalogue; the build rejects missing guide
content. See `docs/SEO_AUDIT.md` for public-page delivery and indexing policy.

Always do both, in the same change.

## Steps

### 1. Place the files

```
src/pages/skills/{subject}/{GameName}.jsx
src/pages/skills/{subject}/{GameName}.css
```

`{subject}` is one of `math`, `english`, `geography`. PascalCase component name,
co-located CSS with the identical base name.

> Geometry games currently live under `math/` (e.g. `ShapeExplorer.jsx`) but are
> surfaced in a separate "Shapes & Geometry" card on the Skills page. Follow the
> existing placement rather than inventing a `geometry/` folder.

### 2. Register the route

In `src/main.jsx`, add a lazy import route inside the correct Skills group, e.g.
`{ path: "new-game", lazy: () => import("./pages/skills/math/NewGame").then(m => ({ Component: m.default })) }`.
Routes are **flat and kebab-case** — `/word-builder`, not `/skills/english/word-builder`.

Keep the route short and child-guessable. Match the route to the name where
reasonable, and check `docs/PROJECT_IDEAS.md` (row 20 and `docs/notes_geography.md`) —
many games already have an intended route recorded there; reuse it rather than inventing a new one.

### 3. Register the link

In `shared/skillsCatalog.js`, add `{ to, icon, label }` inside the correct group's
`games` list. `SkillsPage.jsx` renders the direct-play and public-guide links.
Use the game's display name and keep both it and its guide content current.

### 4. Update the card description if needed

Add an accurate overview, play instructions and skill list in
`shared/skillGuides.js`, describing the implemented game without claiming new
statutory curriculum coverage.

## Component conventions

- Function component, default export, hooks only.
- **No `onComplete` prop** — that contract belongs to Curriculum challenges only.
- **No `localStorage` progress writes.** Skills Mode is deliberately untracked;
  don't add persistence without an explicit decision recorded in
  `docs/PROJECT_KNOWLEDGE.md`.
- Self-contained state, including its own randomisation and score/streak display
  if the game has one.
- Feedback pattern matches the rest of the app: ✅ correct, ❌ retry.
- If the game has modes (practice / multiple-choice / timed), make the mode
  switch **fully reset game state** — stale state across mode switches is the
  single most common bug in this codebase (see the Number Bonds and Counting
  Numbers entries in `docs/PROJECT_KNOWLEDGE.md` §6).

## Styling

- Plain CSS only. Colours from the CSS variables in `src/index.css`.
- Must render correctly in **both light and dark themes**.
- Large touch targets and legible type — the audience is 6–8 years old.
- Reuse `.skill-btn` and other existing shared classes rather than inventing
  parallel styles.

## Reuse before building

Check `src/components/` first. `ClockPanel`, `ReadingNumbersPanel`,
`DualLabelClock`, `MapGame`, `MultiplicationGrid` and `ShapeQuiz` already exist
and several are general enough to back a new game. A map-based game should build
on `MapGame` and the GeoJSON already in `public/`, not a fresh Leaflet setup.

**A question-and-answer game should start on `FreePlayShell`**
(`src/components/skills/`): it already gives levels, endless questions,
read-aloud, double-tap protection and the curriculum's right / combo /
milestone / retry feedback. Write a pure `makeQuestion(rng, level)` in
`src/data/freePlay/` and render the interaction with the challenge kit, as
`MoneyMatch.jsx` does. A game with its own loop can still use
`useAnswerFeedback` + `AnswerFeedbackLine` for the feedback alone.

## Verify before claiming completion

1. `npm run lint` passes.
2. The game loads at its route.
3. The link appears on `/skills` and navigates correctly.
4. Core loop works: correct answer, wrong answer, and mode switch if applicable.
5. Both themes render correctly.
6. `npm run build` passes and `npm run check:seo` verifies the public guide and
   sitemap after the build (the browser check needs local Chrome/CHROME_PATH).

## Finally

Add the game to the built-games list in §5 of `docs/PROJECT_KNOWLEDGE.md` and
update its row in `docs/PROJECT_IDEAS.md`.
