---
name: add-curriculum-challenge
description: Add or fix one Learn with Bix curriculum challenge, preserving the dynamic loader path, shared completion contract and learner progress.
---

# Add or fix a curriculum challenge

Use `docs/AUTHORING.md` for the shared workflow. For all four slots, use `../building-curriculum-topics/SKILL.md` too.

## Find the exact target

Run `npm run topic:context -- --year N --subject SUBJECT --topic TOPICID`. Confirm the current registry topic, its exact statutory mapping, existing wrappers and lesson files. A missing registry topic is a curriculum-data task first, covered by `../add-curriculum-year/SKILL.md`.

The loader in `src/pages/curriculum/Challenge.jsx` resolves:

```text
src/pages/skills/{subject}/challenges/year{year}/{topicId}/{PascalTopicId}Challenge{n}.jsx
```

Slots are 1–4. `PascalTopicId` is calculated by the loader's `capitalizeTopicId`, including numeric segments (`2-d-shapes` → `2DShapes`). A digit-leading filename is valid; use a different function identifier if necessary. Use context/scaffold output rather than reconstructing IDs. Category titles and topic names often derive permanent URL and progress IDs via `toKebabCase`; renaming them requires the progress skill and a migration.

## Use the shared contract

Follow the project [visual recipes](../../../docs/VISUAL_RECIPES.md): preserve the current subject's illustrated introduction, question renderer and interactive models. Prefer a thin default-exported wrapper around its existing game; use `DataChallenge` with the matching visual renderer only when it preserves that experience:

```jsx
export default function MyTopicChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildMyTopic} titles={TITLES}
    renderVisual={question => <MyTopicVisual question={question} />}
    illustrate onComplete={onComplete} />;
}
```

- Pass `onComplete` through unchanged: `ChallengeShell` sends `{ combos }` for XP. Never wrap it as `() => onComplete()`.
- Let the shell own question index, feedback, success delay and completion after the whole run. A correct single answer must not complete a multi-question challenge.
- Report attempts through `submit(isCorrect)` in a custom shell-based game. Wrong answers retry without advancing or completing.
- Challenges never write progress/storage and need no new route. `ProblemView.jsx` owns completion persistence.
- Pure banks accept `rng`; build once per mount. Keep answers unique, distractors plausible, ranges and wording inside the mapped requirement. Review visuals against independently recomputed answers.
- Reuse shared interaction components and their styles. Add CSS only where needed, using `App.css` theme tokens and large touch targets in both themes. Accumulating controls emit steps and use functional state updates so rapid taps are not lost.
- Science uses `DataChallenge layout="science"`, or `ChallengeShell wide` with `ScienceRound` for custom games. Preserve its DOM order: prompt → figure/reference → evidence → answer → hint → Check → feedback; the desktop grid places the figure to the left.
- Update the matching Bix lesson where the subject supports lessons; its representation must match the challenge.

All built challenges are open. Missing modules remain unavailable; completion controls awards, never access. Do not seed fake progress to unlock a new challenge.

## Prove the change

Run `npm run check:topic -- --year N --subject SUBJECT --topic TOPICID` and inspect reported unsupported bank/interaction checks. Add or extend the relevant bank test and jsdom playthrough (for example `tests/components/year4MathPlaythrough.test.jsx`) for wrong-answer retry and full completion, preserving the callback payload. Run `npm run lint`, `npm test` and `npm run build`.

Browser work follows `AGENTS.md`: only use it for gaps such as real layout, drag or canvas, with both themes and required viewports in one batched pass. Authenticated curriculum routes require a selected child; local development defaults to localStorage unless built with `VITE_USE_API=true`.

Report implementation and technical evidence separately from content/device review. Update `docs/CURRICULUM_INVENTORY.md` and current architecture references when needed, record delivered outcomes in `docs/CHANGELOG.md`, and remove completed backlog rows from `PROJECT_IDEAS.md`. Keep the short `PROJECT_KNOWLEDGE.md` entry point current without appending a chronology. Do not invent a manual approval gate for routine work.
