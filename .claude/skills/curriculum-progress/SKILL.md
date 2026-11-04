---
name: curriculum-progress
description: Preserve Learn with Bix learner progress when changing persistence, permanent curriculum IDs, completion, access rules or year-award membership across local and API stores.
---

# Curriculum Progress & Unlocking

Learner progress is irreplaceable. Production builds use the API + MongoDB
(`VITE_USE_API=true`); development defaults to the localStorage store. The
switch in `src/data/store/index.js` is build-time. Use the common store
interface and preserve both drivers; never assume a reset is safe. Accounts,
profiles and rewards persist too.

## Where it lives

| File | Responsibility |
|---|---|
| `src/data/progressRules.js` | **The rules** — pure predicates plus `completeChallenge` as a reducer. The single source of truth. |
| `src/data/curriculumLocks.js` | `buildLockState(...)` — every category/topic/challenge flagged `locked`/`complete`/`missing`, in one pass. |
| `src/data/curriculumNavigation.js` | `findNextChallenge(...)` — the next playable challenge after the one just finished. |
| `shared/progressDocument.js` | Version-aware document reading, monotonic merge and ID-copy migration helpers. |
| `src/data/progressPersistence.js` | Ordered progress persistence and failed-read protection. |
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

Stored via the store layer as one document per `(childId, year, subject)`, with
the tree under `data`. The local driver stores documents in `dl.progress`;
the API driver persists them in MongoDB. Documents carry `schemaVersion`
(currently 1); missing versions are treated as version 1 by the shared reader. The
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

- Write `completedChallenges` as **numbers**. URL IDs arrive as strings; use
  `Number(challengeId)` on new writes. Existing read/validation helpers deliberately
  tolerate legacy numeric strings. Preserve that compatibility rather than
  rejecting old documents or duplicating completion checks in a caller.
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
- **All categories, topics and built challenges are unlocked**, independently of
  saved progress. Missing modules remain unavailable. Completion still controls
  badges and awards, never access.
- **A brand-new user** can choose any built challenge in any category/topic.

Completed content stays **replayable** — never re-lock something a learner has
finished.

## Hydration ordering

`useProgress` guards its save effect with a `hydrated` flag. This exists to
stop the initial empty state from being written over real saved progress on
mount. **Do not remove or reorder that guard.** If you add state that persists,
it needs the same protection.

Failed reads must remain errors, never writable empty progress. Ordered saves
and monotonic merges preserve completions from stale snapshots or another
device. Keep save/retry errors visible without clearing valid state.

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
- **Any change to stored IDs or shape needs a numbered migration before shipping.**
  Use `shared/progressDocument.js`; preserve unknown fields and union completions
  on ID collisions. Version upgrades occur on the next successful real save,
  not as a side effect of reading. Test legacy unversioned documents too.
- Guard every `JSON.parse` with try/catch. Surface corrupt-storage/read errors
  without replacing saved progress or treating a failed read as writable empty data.

## Verify before claiming completion

Run `npm run lint`, `npm test` and `npm run build`.

`npm test` covers the pure rules, lock state and navigation, and
`tests/components/progress.test.jsx` covers hydration, persistence across a
remount, open access, out-of-order completion and sibling isolation. Extend those tests for any change
here.

Stored-shape/key changes require legacy fixtures and read/write/remount regression
tests through both store drivers, including migration and failure paths. Prove
these states in automated tests first. Use isolated accounts/fixtures, never live
learner data. Use a browser only for remaining driver/reload/interaction gaps
that those tests cannot show, following `AGENTS.md`; make it one batched pass.
If tooling is unavailable, finish the other checks and report the specific gap.
Confirm in tests and, where justified, the active browser store:

1. **Fresh user:** use an empty progress fixture → all built challenges are open.
2. **Single completion:** complete any challenge → it shows ✅; all others stay open.
3. **Persistence:** hard-reload → all of the above survives.
4. **Topic cascade:** complete all 4 → the topic shows complete and other topics stay open.
5. **Category cascade:** complete every topic in a category → other categories stay open.
6. **Replay:** re-open a completed challenge → it plays, shows the
   already-completed notice, and does not duplicate its entry in storage.
7. **Inspect the raw stored document** and confirm the shape and numeric types
   are intact — a passing UI can still be writing malformed data.

Then check the stored object against a *pre-existing* progress blob, not just one
you created after your change — that's how you catch backwards-incompatibility.

## Year awards

`countsTowardYear` in `curriculumRegistry.js` controls year certificates and
milestones. New unfinished curricula should explicitly use `countsTowardYear: false`.
Never include a new subject implicitly while building its topics: existing earned
year awards must remain earned. Test membership changes independently of open access.

## Finally

If you change the shape, keys, access or award rules, update current contracts
in `docs/ARCHITECTURE.md`, the §4.5 summary in `docs/PROJECT_KNOWLEDGE.md` and
relevant limitations in `docs/OPERATIONS.md`. Record delivered migrations and
verification in `docs/CHANGELOG.md`; leave dated archives unchanged.
