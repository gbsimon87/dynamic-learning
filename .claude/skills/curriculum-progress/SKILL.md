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
| `src/data/progressRules.js` | **The rules** — pure predicates plus `completeChallenge` as a reducer. The single source of truth. |
| `src/data/curriculumLocks.js` | `buildLockState(...)` — every category/topic/challenge flagged `locked`/`complete`/`missing`, in one pass. |
| `src/data/curriculumNavigation.js` | `findNextChallenge(...)` — the next playable challenge after the one just finished. |
| `src/hooks/useProgress.js` | **Storage** — loads/saves the active child's document; binds the pure rules to that state. |
| `src/pages/curriculum/ProblemView.jsx` | **Writes** — records a completed challenge on `onComplete`, then offers the next one. |
| `src/pages/curriculum/CurriculumPage.jsx` | **Reads** — renders from `buildLockState`. |

Rules and storage are deliberately separate, and the rules are duplicated
nowhere: a second copy of gating logic is how a learner silently gets sent to a
locked challenge. Change `progressRules.js`, not a caller.

The pure modules take availability as an `isBuilt(topicId, challengeId)`
callback rather than importing `challengeAvailability`, which uses
`import.meta.glob` and cannot load under `node --test`. Keep it that way — it is
what makes these rules testable.

## The data contract

Stored via the store layer as one document per `(childId, year, subject)` in the
`dl.progress` collection, with the tree under that document's `data` field. The
pre-accounts key `` `${subject}Progress_year${year}` `` is **no longer read or
written**, and there is deliberately no migration path.

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

Computed by `buildLockState` in `src/data/curriculumLocks.js` and consumed by
both curriculum screens. Any change must preserve all of these:

- **Topic complete** ⟺ every *built* challenge in it is in `completedChallenges`.
  A membership check, never a length check: `[9,9,9,9]` must not complete a
  topic. Unbuilt challenges are excluded — counting them made a partially-built
  topic impossible to finish and so a permanent wall.
- **Category complete** ⟺ every topic in it with something built is complete.
- **Category unlocked** ⟺ every earlier category is *passable*. Passable and
  complete deliberately differ on an empty category: it must not block the
  chain, but must not be badged finished either.
- **Topic unlocked** ⟺ its category is unlocked, and it is the first topic or the
  previous topic in that category is complete.
- **Challenge unlocked** ⟺ its topic is unlocked, and it is either already
  completed (replayable) or the next uncompleted one in sequence.
- **A brand-new user** (empty progress object) sees only the first category
  unlocked.

Completed content stays **replayable** — never re-lock something a learner has
finished.

## Hydration ordering

`useProgress` guards its save effect with a `hydrated` flag. This exists to
stop the initial empty state from being written over real saved progress on
mount. **Do not remove or reorder that guard.** If you add state that persists,
it needs the same protection.

It also refuses to save unless the in-memory progress came from the document
currently loaded (tracked in a ref). Without that guard, switching profile
writes the *outgoing* child's progress into the *incoming* child's document.
Do not remove it.

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

`npm test` covers the pure rules, lock state and navigation. That is necessary
but NOT sufficient — the storage and hydration path has no automated coverage,
so manual verification is still mandatory. Confirm:

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
