---
name: curriculum-progress
description: Use when touching curriculum progress, localStorage persistence, or the category/topic/challenge unlock rules in the Dynamic Learning app - this data is a learner's real progress with no backup, so changes here need deliberate care and manual verification.
---

# Curriculum Progress & Unlocking

Progress is the only persistent state in the app. It lives in the browser, has
**no backend, no backup, and no export**. A bug here doesn't throw an error — it
silently erases or re-locks weeks of a child's work. Treat this code as the
highest-risk area in the repo.

## Where it lives

| File | Responsibility |
|---|---|
| `src/pages/curriculum/ProblemView.jsx` | **Writes** — records a completed challenge on `onComplete` |
| `src/pages/curriculum/CurriculumPage.jsx` | **Reads** — hydrates, saves, and computes all lock state |

The read/write logic is **duplicated across these two files**. They must agree on
the key and the shape exactly. If you change one, change the other in the same
edit — or better, extract the shared hook (idea #9 in `docs/PROJECT_IDEAS.md`).

## The data contract

Key: `` `${subject}Progress_year${year}` `` — e.g. `mathProgress_year2`.

```js
{
  [categoryId]: {
    topics: {
      [topicId]: { completedChallenges: [1, 2] }
    }
  }
}
```

Non-negotiables:

- `completedChallenges` holds **numbers**, not strings. `challengeId` arrives
  from the URL as a string, so `Number(challengeId)` is required on both write
  and comparison. A string `"1"` in this array breaks `includes()` and re-locks
  a completed challenge.
- IDs are the kebab-case values derived from curriculum titles. They are
  positional in the URL and the storage object simultaneously.
- Writes must **merge**, never replace. Spread the existing category, its
  `topics`, and the existing topic object — dropping any level wipes sibling
  progress for the whole category.
- Completing an already-completed challenge must be a no-op, not a duplicate
  entry — duplicates inflate the length check and can mark a topic complete early.

## The unlock rules

Implemented in `CurriculumPage.jsx`. Any change must preserve all of these:

- **Topic complete** ⟺ `completedChallenges.length === topic.challenges.length`.
- **Category complete** ⟺ every topic in it is complete.
- **Category unlocked** ⟺ it is the first category, or the previous category is
  complete.
- **Topic unlocked** ⟺ its category is unlocked, and it is the first topic or the
  previous topic in that category is complete.
- **Challenge unlocked** ⟺ its topic is unlocked, and it is either already
  completed (replayable) or the next uncompleted one in sequence.
- **A brand-new user** (empty progress object) sees only the first category
  unlocked.

Completed content stays **replayable** — never re-lock something a learner has
finished.

## Hydration ordering

`CurriculumPage` guards its save effect with a `hydrated` flag. This exists to
stop the initial empty state from being written over real saved progress on
mount. **Do not remove or reorder that guard.** If you add state that persists,
it needs the same protection.

The read effect also re-runs on `location.key`, so returning from a challenge
refreshes lock state. Preserve that if you refactor the effects.

## Rules for changing this code

- **Never clear the whole storage key** as a convenience during development.
  Use a browser devtools edit on your own machine, or add an explicit,
  clearly-labelled reset control — not an implicit wipe.
- **Renaming a curriculum title changes its ID** and orphans progress under the
  old key. If a rename is genuinely needed, write a migration that copies the old
  key's data to the new one; don't ship a silent reset.
- **Any change to the stored shape needs a version field and a migration.**
  There is no schema version today; adding one is worthwhile before the shape
  changes again.
- Guard every `JSON.parse` with try/catch — corrupt storage must degrade to an
  empty object, not a white screen.

## Verify before claiming completion

Manual verification is mandatory; there are no tests covering this. Confirm:

1. **Fresh user:** clear the key → only the first category is unlocked, only the
   first topic within it, only Challenge 1 within that.
2. **Single completion:** complete Challenge 1 → it shows ✅, Challenge 2 unlocks,
   Challenge 3 stays locked.
3. **Persistence:** hard-reload → all of the above survives.
4. **Topic cascade:** complete all 4 → the topic shows complete and the next
   topic unlocks.
5. **Category cascade:** complete every topic in a category → the next category
   unlocks.
6. **Replay:** re-open a completed challenge → it plays, shows the
   already-completed notice, and does not duplicate its entry in storage.
7. **Inspect the raw object** in devtools and confirm the shape and numeric types
   are intact — a passing UI can still be writing malformed data.

Then check the stored object against a *pre-existing* progress blob, not just one
you created after your change — that's how you catch backwards-incompatibility.

## Finally

If you change the shape, the keys, or the unlock rules, update §4.5 of
`docs/PROJECT_KNOWLEDGE.md` and the related debt entries in §6.
