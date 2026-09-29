# Streaks, XP, levels & "what's new": design

**Date:** 2026-09-30 · **Status:** revision 2, awaiting review · **Branch:** `feat/celebrations`

## What changed in revision 2

A second pass against the code found problems in revision 1:

| # | Revision 1 said | Problem | Revision 2 |
|---|---|---|---|
| R1 | Streak computed from a list of played days capped at 60 | Any streak longer than 60 days would silently show as 60 | Store `current`, `best` and `lastDay`; the capped list is only for the Mon–Sun dots |
| R2 | "Seen" lists, with existing items marked seen on first load | Working out "existing stickers" needs every progress document at load, and the navbar dot would need them too | A `news` list: items are **added when earned** and **cleared when the Trophy Room is opened**. Existing items are never in it, so no progress reads |
| R3 | `earnBadges` "already spreads the document" | It also hard-codes `schemaVersion: 1`, so every award would stamp a v2 document back to v1 | `earnBadges` stops setting the version; `normaliseRewards` owns it |
| R4 | Nothing | **A live bug:** if reading a child's rewards fails, `useRewards` carries on as if the child had none, and the next finished challenge **overwrites the saved document**, losing their badges. With XP and streaks, one bad connection could wipe everything | **Phase 0:** a failed read never leads to a write |
| R5 | "Back-fill from progress" | It didn't say where the progress comes from, or what the navbar shows before the first save | Read once when rewards load, only while `xpBackfilled` is false; shown straight away; stored on the next save |
| R6 | XP saved with badges | Badges can't be awarded twice, but XP is added, so a double award would count twice | One award per challenge run, guarded in `ProblemView` |
| R7 | Streak chip and level chip in the navbar | Measured at 360px wide: about **30px free**. They don't fit | On phones the streak is a small badge on the avatar chip and the level stays off the navbar |
| R8 | Nothing | The new streak and level-up steps have no sounds | Two new cues; the user picks from the audition page (open question) |
| R9 | Level-up step "with Bix" | The user chose Bix for combos and the Trophy Room only | Removed; offered as an open question |
| R10 | Home "latest sticker" | Stickers have no dates, so "latest" isn't knowable | A short `recentStickers` list, filled as stickers are earned |
| R11 | The Trophy Room reads rewards from the store | Right after an award the save may still be in progress, so it could show stale data | The child's own room reads the shared in-memory state |
| R12 | Order of the new celebration steps unspecified | — | Defined below |
| R13 | Seed script not mentioned | `npm run seed` builds v1 documents | The seed builds v2 |

## Context

The 2026-09-29 celebrations made single moments exciting, but nothing carries a
child from one day to the next, and nothing says that something new is waiting.
This adds, for Curriculum Mode:

1. **XP and levels**: a running total that grows with every finished challenge.
2. **Daily streaks with freezes**: consecutive days played, forgiving of a missed day.
3. **"Something new"**: a Duolingo-style dot on the navbar 🏆, and "NEW" ribbons in
   the Trophy Room, until the child has looked.
4. **Home page achievements**: a "something new" card, a streak and level card, and
   a collection summary.

It's a **stored-data change** to the learner's rewards document, so it follows the
`curriculum-progress` skill: versioned shape, lossless migration, guarded writes,
and manual verification against a pre-existing document.

## Decisions (agreed with the user)

| Topic | Decision |
|---|---|
| XP earned | **Per challenge finished**, saved once, with the badges |
| Streak day | **Finish ≥1 challenge** that day; practice replays count |
| Missed day | **Streak freezes**: earned by keeping a streak, spent automatically |
| Levels | **Yes**, with a level-up step in the celebration |
| Existing children | **Back-fill XP** from past completions; streaks start fresh |
| Shown in | Navbar · celebration · home page · Trophy Room + parent area |
| "New" covers | **Badges and stickers**, stored **on the child's record** |
| Home page | "Something new" card · streak and level card · collection summary |

## The rules

**XP**

| Event | XP |
|---|---|
| First completion of a challenge | +10 |
| Practice replay | +5 *(cap: open question Q1)* |
| Each "3 in a row" combo in the run, practice included | +2 |
| Back-fill, once per child | 10 per completed, built challenge in any year |

Levels: Level 2 at 100 XP, and each gap is 50 XP bigger than the one before: L3 250,
L4 450, L5 700, L6 1,000, L7 1,350… For scale, all 156 Year 2 challenges give
1,560 XP from first completions, which is roughly Level 6.

**Streak**

- A **day** is the device's local calendar date, `YYYY-MM-DD`. Gaps are counted by
  treating both dates as UTC midnight, which avoids daylight-saving bugs.
- `current` counts **days played** in a row. A frozen day bridges the gap but
  doesn't add to the count.
- On a finished challenge, the time between the `lastDay` played and today decides
  what happens:

  | Case | Result |
  |---|---|
  | Already played today | No change |
  | Today is earlier than `lastDay` (the clock went back) | No change |
  | First ever | `current = 1`, "streak started" |
  | Played yesterday | `current + 1`, "streak extended" |
  | Missed 1–2 days, with enough freezes held | Spend one freeze per missed day, `current + 1`, "a freeze saved your streak" |
  | Missed more days than freezes held | `current = 1`, "new streak". **Freezes are kept**, not wasted |

- **Freezes:** earned when `current` reaches a multiple of 5, holding at most 2.
- **Display** never writes. Between games, a streak shows as alive while the days
  missed before today are within the freezes held, with "play today to keep it"
  when today isn't played yet. Otherwise it shows 0 and "start a new streak today!".
- `best` is the highest `current` ever reached.

## Data shape

Everything goes in the **rewards document**: one per child, across years.
**Progress documents are not touched.** The server stores `data` as-is, so it
needs no change.

```js
// rewards.data: schemaVersion 1 → 2
{
  schemaVersion: 2,
  badges: [...],             // unchanged
  counts: {...},             // unchanged
  xp: 0,                     // total earned, integer
  xpBackfilled: false,       // the one-off back-fill has been stored
  streak: {
    current: 0,              // days in a row (frozen days bridge, don't count)
    best: 0,
    lastDay: null,           // "YYYY-MM-DD", last day played
    freezes: 0,              // held, 0–2
    recent: [],              // last 14 days played, for the Mon–Sun dots only
    frozen: [],              // last 14 days a freeze covered (🧊 on the dots)
  },
  news: {                    // earned but not yet looked at
    badges: [],              //   badge ids
    stickers: [],            //   "year/subject/topicId" (topic ids repeat across years)
  },
  recentStickers: [],        // "year/subject/topicId", newest last, at most 5
}
```

**Migration is on read and loses nothing.** `normaliseRewards(doc)` fills missing
fields with defaults and never removes or rewrites existing ones. A v1 document
reads as v2 in memory, and is only written as v2 on its next real save. Tests
prove that v1 → v2 keeps every original field byte-identical, and that
`earnBadges` keeps unknown fields and leaves the version alone.

## Units

**Pure logic (`src/data/`, tested with `node:test`):**

- `rewardsShape.js`: `normaliseRewards`, `REWARDS_SCHEMA_VERSION = 2`.
- `xp.js`: `xpForRun({ firstTime, combos })`, `backfillXp(candidates)` (counts
  completed, built challenges in `loadResumeCandidates`' shape), and
  `levelFor(xp)` → `{ level, into, needed }`.
- `streak.js`: `recordDay(streak, today)` → `{ streak, outcome, usedFreezes, earnedFreeze }`,
  where `outcome` is `none | started | extended | saved | restarted`.
  `streakStatus(streak, today)` → `{ current, alive, playedToday, atRisk }` for
  display. `weekDots(streak, today)` gives Mon–Sun, each `played | frozen | today | empty`.
- `news.js`: `addNews(rewards, { badges, sticker })`, `clearNews(rewards)`,
  `hasNews(rewards)`.
- `celebrationSteps.js` gains `xpGained`, `levelBefore/After` and `streakOutcome`
  inputs.

**Shared state:**

- **`RewardsProvider`** (new, `src/context/`), mounted inside `AuthProvider`. It
  holds **one** in-memory rewards document for the active child, shared by the
  challenge page, navbar, home page and Trophy Room. `useRewards()` becomes a thin
  reader of it, so its one caller doesn't change. It keeps `useRewards`' existing
  `loadedKeyRef`/`hydrated` protections exactly.
- **Loading:** read the rewards. Then, only while `xpBackfilled` is false, read the
  progress documents (`loadResumeCandidates`, which is read-only) and hold
  `pendingBackfill` in memory. Displayed XP is `xp + pendingBackfill` straight away.
  The next save stores it and sets `xpBackfilled`. If the progress read fails, the
  back-fill waits for the next visit.
- **The only two writes:**
  1. **Challenge finished:** `award({ earned, firstTime, combos, sticker, today })`.
     One save covering badges, XP (plus any pending back-fill), streak, news and
     recent stickers. It returns
     `{ badges, xpGained, levelBefore, levelAfter, streakOutcome, streak }` for the
     celebration.
  2. **The child opens their own Trophy Room:** `clearNews()`. One save, skipped
     when there's no news. The room shows its NEW ribbons from what was new at the
     start of that visit, so they don't vanish while the child is looking.
- The grown-up room (`/parent/trophies/:childId`) and `/parent` read from the store,
  normalised, and **never write**.

**Phase 0: guard the existing data (do first):**

- On a failed rewards read, stay **not loaded**. `award` and `clearNews` then write
  nothing, and the read is retried on the next award. Only a document that
  genuinely doesn't exist (`null`) counts as "no rewards yet". This also closes the
  bug for badges today.
- `earnBadges` stops setting `schemaVersion`.

**The hand-off from the challenge shell:** `ChallengeShell` calls
`onComplete({ combos })`. `Challenge.jsx` passes `onComplete` straight to the
challenge, and all 342 challenge files pass it straight to the shell (checked), so
none change. `ProblemView` awards **once per run**, using a ref keyed to that run.
The `add-curriculum-challenge` skill gets updated to describe the payload.

## UI

**Celebration order:**
headline (with **+N XP** and a filling level bar) → progress → sticker → badge(s) →
unlock → **level-up** → **streak** (only on the day's first finished challenge) →
certificate → next.

A plain challenge, or a practice replay, that is the day's first becomes
**headline → streak → next**. Otherwise they stay one screen. The streak step
reads "🔥 4-day streak!", "🧊 A freeze saved your streak!", "New streak started!"
or "Streak started!". Streaks of 3, 7, 14 and 30 get a bigger effect.

**Navbar:**

- Wider than 480px: `🔥 4` and `Lv 3` chips beside the child's name.
- 480px and narrower: a small `🔥4` badge on the corner of the avatar chip, which
  adds no width. The level lives on the home page and in the Trophy Room.
- A dot on 🏆 whenever there's news. It's positioned over the icon and adds no
  width either.
- Screen-reader text, e.g. "4-day streak, level 3, new trophies to see".

**Home page** (only while a child is playing):

- A "Something new!" card, shown only when there's news: "You earned 2 new badges
  and a sticker!" with a button to the Trophy Room.
- A streak and level card: the streak (or "start a streak today!"), "play today to
  keep it" when at risk, the Mon–Sun dots, the level with an XP bar, and freezes held.
- A collection summary: badges x of 5, stickers n of total, and the latest sticker
  from `recentStickers` (hidden when there are none yet).

**Trophy Room:** NEW ribbons, best streak, level and total XP.

**Parent area and grown-up room:** streak, best, level and XP for each child.

**Sounds:** two new cues, `streak` and `levelUp`, picked by the user from
`docs/sounds/mixkit-audition.html` (Q2). Until then they reuse the
`combo.mp3` and `quest.mp3` files. They're processed with
`docs/sounds/process-sounds.py` in the rewards tier (-18 LUFS).

## Error handling & known limits

- **A failed save:** the gain stays in memory for the visit and is included in the
  next successful save, since the whole document is saved each time. It isn't
  retried on its own, the same as badges today.
- **A failed read:** no writes at all (Phase 0).
- **A corrupt or missing field:** `normaliseRewards` fills in a default and never
  throws.
- **The clock going backwards:** ignored by `recordDay`.
- **Switching child mid-load:** `loadedKeyRef` stops any cross-child write.
- **Known limit:** each save replaces the whole rewards document. If the same child
  plays on **two devices or two tabs at once**, the last save wins and the other's
  gains are lost. That's rare for one child; the proper fix, merging on the server,
  is out of scope.

## Testing & verification

- **Unit:**
  - XP per run.
  - The back-fill counts only completed, built challenges.
  - Level boundaries.
  - Streaks: every row of the rules table; the freeze cap; freezes kept on a reset;
    a 100-day streak shows 100; the backwards clock; the 14-day list caps; display
    alive, at risk and broken.
  - `normaliseRewards` v1 → v2 loses nothing.
  - `earnBadges` keeps unknown fields and doesn't touch the version.
  - `addNews`/`clearNews`.
  - Celebration step order for plain, practice, topic and year runs, day-first and not.
- **Browser, on the seed account:**
  - A v1 document loads and the back-fill shows at once. After the next completion
    the stored document is v2, with badges and counts byte-identical.
  - The streak step appears on the day's first completion and not on the second.
  - A simulated missed day with a freeze held, and without one.
  - Level-up.
  - The dot appears after a new sticker and clears after opening the Trophy Room;
    the ribbons stay for that visit.
  - A sibling's room viewed from `/parent` never writes.
  - **Phase 0:** make the rewards read fail, finish a challenge, and confirm the
    stored document is unchanged.
  - Both themes, 360px and 1280px, reduced motion.
- `npm run lint`, `npm test`, `npm run build`.

## Also updated

`scripts/seedData.js` (v2 documents, with a sample streak so the demo children
differ); `docs/PROJECT_KNOWLEDGE.md` §5 "Badges" (the rewards shape) and §4.5
"Celebrations"; the `add-curriculum-challenge` skill (the `onComplete` payload);
`docs/sounds/README.md` (the two new cues).

## Open questions

- **Q1: practice XP cap.** Without one, a child could replay their easiest challenge
  for levels. Recommendation: practice XP counts only for the first 5 replays each
  day (25 XP), shown as "Practice XP maxed for today" after that.
  It needs one more field: `practice: { day, count }`.
- **Q2: sounds** for the streak and level-up steps. Pick them now, or reuse existing
  files for now.
- **Q3: Bix on the level-up step.** Revision 1 assumed it; you'd chosen combos and
  the Trophy Room only.

## Out of scope

Leaderboards, XP for Skills Mode, streak reminders or notifications, a
parent-chosen daily goal, buying freezes, and merging saves from two devices.
