---
name: add-skill-game
description: Add a standalone Learn with Bix Skills Mode game, including its shared loop, visual interaction, route, hub entry, public guide and verification.
model: sonnet
---

# Adding a Skills Mode Game

Skills Mode games are standalone practice without curriculum-completion tracking.
A learner reaches them from the Skills hub and can play any of them at any time.

The maintained project workflow is `docs/SKILLS_AUTHORING.md`; it can be read by
any AI tool or developer. This checklist complements that project guide.

## The failure mode this prevents

A new game needs **three registrations**. A working direct URL alone does not
establish hub or public-guide integration:

1. `src/main.jsx` — the lazy route
2. `shared/skillsCatalog.js` — the game in the right subject group (the hub renders its `<Link>`)
3. `shared/skillGuides.js` — its public guide, metadata and sitemap entry

Also add its public description, instructions and skill list to
`shared/skillGuides.js`. This creates `/learn/<game-slug>`, its metadata and its
sitemap entry through the shared SEO catalogue; the build rejects missing guide
content. See `docs/SEO.md` for public-page delivery and indexing policy.

Keep all three in the same change.

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
`{ path: "skills/new-game", lazy: () => import("./pages/skills/math/NewGame").then(m => ({ Component: m.default })) }`.
Current canonical routes are **`/skills/<kebab-case-name>`**, for example
`/skills/word-builder`. Older flat URLs redirect to these routes. Follow the
current `SkillGameLayout` route group in `src/main.jsx`.

Keep the route short and child-guessable. Match the route to the name where
reasonable, and check the shortlist in `docs/PROJECT_IDEAS.md` (#20) for the
intended game name.

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
  don't add persistence without an explicit in-scope decision recorded in the
  current architecture (`docs/ARCHITECTURE.md`).
- Self-contained state, including its own randomisation and score/streak display
  if the game has one.
- Feedback pattern matches the rest of the app: ✅ correct, ❌ retry.
- If the game has modes (practice / multiple-choice / timed), make the mode
  switch **fully reset game state** — stale state across mode switches is the
  recurring regression in this codebase (see `docs/ENGINEERING_RULES.md`).

## Styling

- Plain CSS only. Colours from the `--light-*` / `--dark-*` variables in `src/App.css`.
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

## Keep it lean

One game is one component plus three registrations. Build it in this session:
don't spawn subagents, and don't re-check the page after every tweak.

## Verify before claiming completion

Follow "Browser checks and subagents" in `AGENTS.md`: tests first, the browser
only when a test cannot show it.

1. Follow `docs/VALIDATION.md`: during development and intermediate handoffs,
   lint affected files and run relevant generator/playthrough/route/guide tests.
   Run full lint/tests/build once before merge/release; broaden immediately for
   shared shell, routing, accounts or persistence changes. Public route/catalogue/
   guide changes also require `npm run check:seo` before release. It already loads
   the public guide and sitemap in Chrome (local Chrome/CHROME_PATH required), so
   don't re-check those by hand. Report final checks not yet run.
   If required Chrome/browser tooling is unavailable, finish the other checks
   and report that explicit verification gap under `AGENTS.md`; do not change
   the app to work around missing AI/browser tooling.
2. A component test in `tests/components/` covers the core loop: a correct
   answer, a wrong answer, and a mode switch that fully resets state if the game
   has modes. Render it through its route to prove the route and the `/skills`
   link resolve.
3. Both themes: the CSS uses only the `src/App.css` theme variables, with no
   hard-coded colours.
4. Open the browser only if the game depends on canvas, maps, drag or real
   layout. Then make it one batched pass: the route, one right and one wrong
   answer, and one screenshot per theme.

## Finally

Keep the source catalogue and guide current and remove finished work from
`docs/PROJECT_IDEAS.md`.
Update the short `docs/PROJECT_KNOWLEDGE.md` entry point or focused references
only when current contracts change.
