---
name: add-curriculum-year
description: Use when adding a new year group or subject to Curriculum Mode - notably the planned UK Year 3 - covering the dataset shape, the hard-coded import that must be generalised first, and how to avoid breaking existing Year 2 progress.
---

# Adding a Curriculum Year or Subject

The app currently ships **Year 2 Maths only**. Year 3 is the next planned year
group. This skill covers making the curriculum system multi-year, then
populating it.

## The blocker you must clear first

`src/pages/curriculum/CurriculumPage.jsx` accepts `year` and `subject` props and
defaults them to `2` / `"math"` — but then **hard-imports and renders
`year2MathCurriculum` regardless**. The props flow into URLs and storage keys
while the displayed tree is always Year 2.

So the very first task is not content, it is generalisation:

1. Create a curriculum registry that maps `year` + `subject` → dataset, e.g.
   `src/data/curriculumRegistry.js` exporting a lookup.
2. Make `CurriculumPage` resolve its dataset from its props via that registry.
3. Handle the unknown-combination case with a clear empty state rather than a
   crash or a silent Year 2 fallback.
4. Confirm Year 2 still renders and its saved progress still loads **before**
   adding any Year 3 content.

Ship and verify that refactor on its own. Mixing it with new content makes a
regression in existing progress very hard to attribute.

## Dataset shape

Match `src/data/year2MathCurriculum.js` exactly:

```js
const rawCurriculum = [
  {
    title: "Number - Number and Place Value",
    topics: [
      { id: "...", name: "Numbers and Counting" },
      // ...
    ],
  },
  // ...
];

export const year3MathCurriculum = rawCurriculum.map((category) => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map((topic) => ({
    id: toKebabCase(topic.name),
    name: topic.name,
    challenges: [
      { id: 1, title: "Challenge 1" },
      { id: 2, title: "Challenge 2" },
      { id: 3, title: "Challenge 3" },
      { id: 4, title: "Challenge 4" },
    ],
  })),
}));
```

Note the hand-written `id` fields in `rawCurriculum` are **ignored** — the export
recomputes every ID from the title/name via `toKebabCase()`. Don't rely on them.

### Titles are identifiers

IDs are derived from titles and are used in URLs **and** as `localStorage` keys.
Renaming a category or topic title silently orphans saved progress. Settle the
wording before shipping, and treat any later rename as a migration, not an edit.

## Authoring the content

- Source the topic list from the **UK National Curriculum programme of study**
  for that year — this app's whole premise is curriculum alignment, so don't
  invent a topic structure.
- Year 3 Maths broadly covers: numbers to 1000, mental and column addition and
  subtraction, the 3/4/8 multiplication tables, fractions including tenths,
  measurement in mm/cm/m, perimeter, time to the minute, right angles, and
  statistics with bar charts and tables.
- Mirror the Year 2 category naming style so the two years read as one system.
- Keep exactly 4 challenges per topic; the generator assumes it and
  `isTopicComplete` compares completed count against `topic.challenges.length`.

## Then: challenge files

Challenges live under the year-specific folder:

```
src/pages/skills/{subject}/challenges/year{year}/{topicId}/{PascalTopicId}Challenge{n}.jsx
```

Use the **add-curriculum-challenge** skill for each one — it owns the naming
convention and the `onComplete` contract. Topics with no files yet degrade
gracefully to "not yet available", so you can ship the dataset before the
challenges and fill in incrementally.

## Progress isolation

Storage keys are already namespaced: `` `${subject}Progress_year${year}` ``
(`mathProgress_year2`, `mathProgress_year3`). Years therefore do **not** clash,
and a learner's Year 2 progress must remain untouched by Year 3 work. Verify
this explicitly — load Year 2 with existing progress after the change.

## Learner-facing entry point

Adding a year raises a product question the code doesn't answer: how does a
learner choose one? Options are a year selector on `/curriculum`, a stored
learner profile, or year-specific routes. Decide it deliberately, then record the
decision in `docs/PROJECT_KNOWLEDGE.md` — don't let it be settled implicitly by a
default prop.

## Verify before claiming completion

1. `npm run lint` passes.
2. Year 2 renders unchanged and pre-existing Year 2 progress still loads.
3. The new year renders its full category/topic tree.
4. Locking cascades correctly from a clean `localStorage`.
5. A topic with no challenge files shows the "not yet available" fallback.
6. Both themes render correctly.

## Finally

Update `docs/PROJECT_KNOWLEDGE.md` — §4.2 (data model), §5 (what exists), §7 (the
add-a-year playbook, now that it is real rather than theoretical) — and move the
Year 3 rows in `docs/PROJECT_IDEAS.md` off 🔵 Planned.
