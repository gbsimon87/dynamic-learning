# Build a standalone Skills Mode game

This guide describes the app's **Skills Mode games**, not AI-agent skills.
It is plain project documentation for any developer or AI tool. Start with
[AGENTS.md](../AGENTS.md) and [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md).
For progress-tracked Curriculum courses instead, use [AUTHORING.md](AUTHORING.md).

## Scope and maintained example

Skills Mode offers standalone, ungated practice from `/skills`. Games usually
have endless rounds and selectable practice levels; they do not have a topic's
four completion slots. They do not write curriculum progress, unlock content or
award curriculum certificates. Preserve the sound-off path, both themes, large
touch targets and readable instructions; keep ranges/text appropriate for the
intended age. Check [PROJECT_IDEAS.md](PROJECT_IDEAS.md) for the requested scope.

Read this working vertical slice before creating another quiz-style game:

| Part | Maintained source |
|---|---|
| Game and visual interaction | [MoneyMatch.jsx](../src/pages/skills/math/MoneyMatch.jsx) |
| Pure question generator | [money.js](../src/data/freePlay/money.js), [tests](../src/data/freePlay/money.test.js) |
| Endless round/level/feedback loop | [FreePlayShell.jsx](../src/components/skills/FreePlayShell.jsx) |
| Interaction/playthrough checks | [freePlay.test.jsx](../tests/components/freePlay.test.jsx) |
| Route, hub and public guide | [main.jsx](../src/main.jsx), [skillsCatalog.js](../shared/skillsCatalog.js), [skillGuides.js](../shared/skillGuides.js) |

## Build on the shared loop

Put the default-exported page in `src/pages/skills/<subject>/<GameName>.jsx`
with scoped co-located CSS when needed. Geometry games currently live under
`math/`; use the current source catalogue to choose the right hub group.

For question-and-answer practice, use `FreePlayShell`. Give it a pure
`makeQuestion(rng, level)` returning a stable `key`, visible `prompt`, optional
`speech` and interaction data. Its render callback receives
`{ question, submit, locked, level, misses }`; controls report
`submit(isCorrect)` and honour `locked`. The shell handles question changes,
retry feedback, double-tap protection, levels, read-aloud and celebrations.
There is **no `onComplete` callback** or fixed curriculum run.

Use bounded generators with deterministic seeded tests. Require a defensible
answer, plausible distractors and no tied ordering. On every round, mode or
level change, reset selected answers, tiles, feedback and pending timers through
the established shell/game pattern. Test fast repeated taps and switching mode
during a success pause when those states exist.

For a game with a different loop (map, explorer, matching board), retain that
interaction and reuse [useAnswerFeedback](../src/components/skills/useAnswerFeedback.js)
and [AnswerFeedbackLine](../src/components/skills/AnswerFeedbackLine.jsx) rather
than rebuilding celebration logic. Existing clock/map/shape/3D components may
already provide the needed visual controls.

## Preserve visual learning

Use [VISUAL_RECIPES.md](VISUAL_RECIPES.md) and a matching built game as the visual
reference. Reuse the challenge kit's coins, clocks, fraction bars, charts,
number lines, tiles or labelled SVG/CSS models where they help the skill.
Pictures must agree with visible givens and moved cards; keep the unknown
unknown. Shared fallback renderers can return null, so verify the actual output.
Use paired `App.css` theme tokens, accessible control names, text equivalents
and keyboard/touch interaction. A deliberately text-only reading assessment
can be appropriate; do not illustrate a hidden spelling answer.

## Register all three entry points

1. Add the lazy route under `SkillGameLayout` in
   [main.jsx](../src/main.jsx), using `/skills/<kebab-case-name>`. Existing old
   flat URLs are redirects, not the pattern for new games.
2. Add `{ to, icon, label }` to the right group in
   [skillsCatalog.js](../shared/skillsCatalog.js), so the hub exposes the game.
3. Add its accurate description, instructions and practice list to
   [skillGuides.js](../shared/skillGuides.js). The SEO catalogue uses this for
   the public `/learn/<slug>` guide, metadata and sitemap; the build checks
   catalogue/guide agreement. Follow the current slug conventions and avoid
   unsupported claims about statutory coverage.

A working direct URL alone does not establish hub or public-guide integration.
Use the existing [SEO catalogue tests](../shared/seo.test.js),
[guide renders](../tests/components/seo.test.jsx) and
[Skills layout tests](../tests/components/skillGameLayout.test.jsx), alongside
the source registrations, to verify all three paths.

## Verify and record

Add meaningful pure-generator tests and a component playthrough for correct
and wrong attempts, retry, level/mode reset and relevant locked controls.
Check the route/hub/guide registration as well as the component in isolation.

Follow [the shared validation policy](VALIDATION.md): during development and at
intermediate handoffs, lint affected files and run the relevant generator,
playthrough, route/hub and guide tests. A cosmetic edit normally reuses existing
tests rather than adding new ones. Broaden immediately for shared shell, routing,
account or persistence changes.

When the final implementation is ready for merge/release, run `npm run lint`,
`npm test` and `npm run build` once. Public route/catalogue/guide or SEO changes
also require `npm run check:seo` before release. Rerun only checks warranted by
subsequent changes/failures, and report pending final checks at intermediate
handoffs. Redirect verbose output to temporary logs; inspect failures/summaries.

The SEO check uses the built Express app and local Chrome; see [SEO.md](SEO.md).
Browser work beyond that follows `AGENTS.md`. Never use live learner accounts as
fixtures.

Remove finished backlog work from [PROJECT_IDEAS.md](PROJECT_IDEAS.md) and update
current architecture only when it changes. Physical-device touch/voice and a
child's comprehension/enjoyment remain distinct from automated checks.
