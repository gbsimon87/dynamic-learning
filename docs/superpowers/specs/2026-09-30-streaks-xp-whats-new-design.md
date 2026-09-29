# Streaks, XP, levels & "what's new" — design

**Date:** 2026-09-30 · **Status:** awaiting review · **Branch:** `feat/celebrations`

## Context

The celebration work (spec 2026-09-29) made single moments exciting, but nothing
carries a child from one day to the next, and nothing tells them something new is
waiting. This adds, for Curriculum Mode:

1. **XP and levels**: a running total that grows with every finished challenge.
2. **Daily streaks with freezes**: consecutive days played, forgiving of a missed day.
3. **"Something new"**: a Duolingo-style dot on the navbar 🏆, and "NEW" ribbons in the
   Trophy Room, until the child has looked.
4. **Home page achievements**: a "something new" card, a streak & level card, and a
   collection summary.

It is a **stored-data change** to learner rewards, so it follows the
`curriculum-progress` skill: versioned shape, lossless migration, idempotent
writes, and manual verification against a pre-existing document.

## Decisions (agreed with the user)

| Topic | Decision |
|---|---|
| XP earned | **Per challenge finished**, saved once, at the same moment as badges |
| Streak day | **Finish ≥1 challenge** that day; practice replays count |
| Missed day | **Streak freezes**: earned by keeping a streak, spent automatically |
| Levels | **Yes**, with a level-up step in the celebration |
| Existing children | **Back-fill XP** from past completions; streaks start fresh |
| Shown in | Navbar chip · celebration · home page · Trophy Room + parent area |
| "New" covers | **Badges and stickers**; stored **on the child's record** |
| Home page | "Something new" card · streak & level card · collection summary |

## The numbers

| Rule | Value | Notes |
|---|---|---|
| First completion of a challenge | **+10 XP** | |
| Practice replay | **+5 XP** | Rewards practice without making farming worthwhile |
| Each "3 in a row" combo in that run | **+2 XP** | Reported by the challenge shell |
| Back-fill | **10 XP per completed challenge** | Once per child, from existing progress |
| Level 2 | 100 XP | Then each gap is 50 XP bigger: L3 250, L4 450, L5 700, L6 1,000… |
| Freeze earned | **1 per 5 streak days** | Held at most **2** |
| Freeze spent | Automatically, one per missed day | A gap bigger than the freezes held resets the streak to 0 |
| Streak celebration | First completion of each local day | Streak milestones 3 / 7 / 14 / 30 get a bigger effect |

For scale: Year 2 has 156 challenges, so 1,560 XP from first completions, which is roughly Level 6.

"Day" is the **device's local calendar date** (`YYYY-MM-DD`), which is what a child means by "today".

## Data shape

Everything lives in the **rewards document** (one per child, across years).
**Progress documents are not touched.** The server already stores `data` opaquely,
so no server change.

```js
// rewards.data — schemaVersion 1 → 2
{
  schemaVersion: 2,
  badges: [...],          // unchanged
  counts: {...},          // unchanged
  xp: 0,                  // NEW: total, integer
  xpBackfilled: false,    // NEW: the one-off back-fill has been added
  streak: {               // NEW
    days: [],             //   local dates played, newest last, capped at 60
    freezes: 0,           //   held, 0–2
    frozen: [],           //   local dates a freeze covered (capped at 60)
    best: 0,              //   longest streak ever
  },
  seen: {                 // NEW: what the child has already looked at
    badges: [],           //   badge ids
    stickers: [],         //   "year/subject/topicId" keys
  },
}
```

**Migration is read-time and lossless.** `normaliseRewards(doc)` fills missing fields
with defaults and never removes or rewrites existing ones. A v1 document reads as v2
in memory, and is only written as v2 on its next real save. `earnBadges` already
spreads the current document, and a test proves unknown fields survive it.

**Seen, first time:** a child's **existing** badges and stickers count as seen when
`seen` is first created, so the dot doesn't light up for everything a child already
owns on the day this ships. A test covers this.

## Units

**Pure logic (`src/data/`, tested with `node:test`):**

- `xp.js`: `xpForRun({ firstTime, combos })`, `backfillXp(progressDocs, isBuilt)`
  (counts built, completed challenges), `levelFor(xp)` → `{ level, into, needed }`.
- `streak.js`: `recordDay(streak, today)` → `{ streak, extended, started, usedFreeze, earnedFreeze }`
  applies freezes for gap days, then adds today. `currentStreak(streak, today)` is for
  display. A streak still counts if today isn't played yet but yesterday was.
  `weekDots(streak, today)` gives the home page's Mon–Sun row.
- `rewardsShape.js`: `normaliseRewards`, `REWARDS_SCHEMA_VERSION = 2`.
- `whatsNew.js`: `unseen(rewards, stickerGroupsByCurriculum)` → `{ badges, stickers }`,
  and `markAllSeen(rewards, …)`.
- `celebrationSteps.js`: gains `xpGained`, `levelUp`, `streak` inputs. It adds "+N XP"
  to the headline, a **streak step** on the day's first completion, and a **level-up
  step**.

**State:**

- **`RewardsProvider`** (new, in `src/context/`) replaces the per-component
  `useRewards` state. There is **one** in-memory rewards document for the active
  child, shared by the challenge page, the navbar, the home page and the Trophy Room.
  Without it, the navbar dot would go stale after an award. It keeps `useRewards`'
  existing `loadedKeyRef` / `hydrated` guards exactly. `useRewards()` becomes a thin
  reader of the context, so its callers don't change.
- Write moments (the only ones):
  1. **Challenge finished**: `award(earned, { combos, firstTime, today })`. One save:
     badges + XP (+ back-fill if not yet done) + streak.
  2. **Trophy Room opened by its own child**: `markSeen(...)`. One save, skipped when
     nothing is unseen.
- The grown-up Trophy Room view and `/parent` stay **read-only**.

**Contract change:** `ChallengeShell` calls `onComplete({ combos })`. All 342 challenge
files pass `onComplete` straight through (checked), so none change. The
`add-curriculum-challenge` skill gets updated to match.

**UI:**

- **Navbar:** a `🔥 4` streak chip and `Lv 3` beside the child's name, plus a dot on
  🏆 when anything is unseen. Screen-reader text: "4-day streak, level 3, new trophies".
- **Celebration:** "+15 XP" chip on the headline with a filling level bar. A **streak
  step** ("🔥 4-day streak!", "A freeze saved your streak! 🧊", or "New streak started!"),
  and a **level-up step** with Bix.
- **Home:** a "Something new!" card (shown only when something is unseen); a streak &
  level card (streak, Mon–Sun dots, level + XP bar, freezes held); and a collection
  summary (badges x/5, stickers n, latest sticker).
- **Trophy Room:** "NEW" ribbons on unseen items, best streak, total XP and level.
- **Parent area / grown-up room:** streak, best streak, level and XP per child.

## Error handling

- The rewards save fails → the in-memory state keeps the gain for the session. It
  isn't retried automatically, which is the same as badges today.
- A corrupt or missing field → `normaliseRewards` defaults it. It never throws.
- Clock oddities (a device date moving backwards) → `recordDay` ignores a `today`
  earlier than the last recorded day, so the streak can't be broken or double-counted.
- Child switch mid-load → `RewardsProvider` keeps `loadedKeyRef`: no cross-child write.

## Testing & verification

- **Unit:** XP per run; the back-fill counts only built and completed challenges;
  level boundaries; streaks for consecutive days, gaps covered by 1 and 2 freezes, a
  gap too big to cover, the freeze cap, best-ever, a backwards clock, and 60-day
  capping; normalise v1→v2 losslessly; `earnBadges` keeps unknown fields; first-time
  seen marks existing items; unseen after a new award.
- **Browser (seed accounts):**
  - A v1 document loads, the back-fill appears, and the stored doc is v2 only after
    the next completion, with badges and counts byte-identical.
  - The streak step on the first completion of the day, and not on the second.
  - A simulated missed day with a freeze held.
  - Level-up.
  - The dot appears after a new sticker and clears after opening the Trophy Room.
  - A sibling's room viewed from `/parent` never marks anything seen.
  - Both themes, 390px and 1280px, reduced motion.
- `npm run lint`, `npm test`, `npm run build`.

## Out of scope

Leaderboards, XP for Skills Mode, streak reminders or notifications, a
parent-chosen daily goal, and buying freezes.
