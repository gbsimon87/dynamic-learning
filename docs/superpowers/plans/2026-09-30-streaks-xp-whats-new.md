# Streaks, XP, levels & "what's new": implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Curriculum Mode learners XP, levels, forgiving daily streaks and a
Duolingo-style "something new" signal. They show in the navbar, the celebration
sequence, the home page, the Trophy Room and the parent area. First, close a live
bug where a failed rewards read can erase a child's badges.

**Architecture:** All new state lives in the child's existing **rewards document**,
migrated on read from v1 to v2. Progress documents are untouched. One pure module
per rule (shape, XP, streak, news) plus a pure `awardRun` that combines them for a
finished challenge. A new `RewardsProvider` holds the active child's single
in-memory rewards document for every screen. It writes at exactly two moments:
a challenge finished, and the child opening their own Trophy Room.

**Tech Stack:** React 19, Vite 7, plain CSS with `--light-*`/`--dark-*` tokens,
`node:test` for pure logic, Web Audio cues in `src/components/celebration/sound/`,
ffmpeg for sound processing, and the Playwright MCP for browser checks.

**Spec:** `docs/superpowers/specs/2026-09-30-streaks-xp-whats-new-design.md` (revision 2, approved 2026-09-30).

## Global Constraints

- Rewards `data.schemaVersion` goes 1 → **2**; the store's own document-level `schemaVersion: 1` stays as it is.
- **Progress documents are not read-modified-written by anything in this plan.**
- **XP:** first completion **+10**; practice replay **+5**, only for the **first 2 replays each local day**; each combo **+2**, practice included (within the cap); back-fill **10 per completed, built challenge**.
- **Levels:** Level 2 at 100 XP, each gap **+50**: 100, 250, 450, 700, 1,000, 1,350…
- **Freezes:** earned when `current` hits a multiple of **5**, **max 2** held, spent one per missed day; kept (not wasted) when a streak resets.
- **Day** = device local `YYYY-MM-DD`; gaps measured on UTC midnights.
- Capped lists: `streak.recent` and `streak.frozen` **14**; `recentStickers` **5**.
- **Sticker key** = `` `${year}/${subject}/${topicId}` ``.
- **Sounds:** level-up = **Mixkit #2984** at **-18 LUFS**; streak = **Mixkit #2317**, reusing the existing `badge.mp3`.
- Bix cheers on the level-up step (medium size, decorative).
- Celebration order: headline → progress → sticker → badge(s) → unlock → **level-up** → **streak** → certificate → next.
- Navbar ≤480px: the streak is a badge on the avatar chip and the level is not in the navbar.
- Both themes (tokens only), touch targets ≥44px, `prefers-reduced-motion` respected.
- `npm run lint`, `npm test` and `npm run build` pass at every commit.
- When done, update `docs/PROJECT_KNOWLEDGE.md` **and** `docs/sounds/README.md` (the user asked for both).

## Review Focus

1. **The rewards read fails** (API mode, dropped connection), then the child finishes a challenge → nothing is written and the stored document is unchanged. *Task 1, manual step.*
2. **Profile switch while rewards are loading or saving** → one child's rewards are never written into another's document. *Task 5, manual step.*
3. **The Trophy Room opens before rewards have loaded** → the ribbons reflect the real news once loaded, and news is cleared only after that. *Task 8, manual step.*
4. **The back-fill read fails** → `xpBackfilled` stays false, so the back-fill is still added on a later visit. *Task 4, unit test `pendingBackfill null`.*
5. **`onComplete` fires twice for one run** → XP is added once. *Task 5, `ProblemView` guard plus a manual double-call check.*

## File map

| File | Responsibility | Task |
|---|---|---|
| `src/hooks/useRewards.js` | Phase 0 guard; later a thin reader of the context | 1, 5 |
| `src/data/badges.js` | `earnBadges` stops setting the version; `emptyRewards` delegates | 1, 2 |
| `src/data/rewardsShape.js` (new) | `normaliseRewards`, `REWARDS_SCHEMA_VERSION` | 2 |
| `src/data/streak.js` (new) | Day maths, `recordDay`, `streakStatus`, `weekDots` | 3 |
| `src/data/xp.js` (new) | `xpForRun`, `backfillXp`, `levelFor`, `displayXp` | 4 |
| `src/data/news.js` (new) | `stickerKey`, `addNews`, `clearNews`, `hasNews` | 4 |
| `src/data/awardRun.js` (new) | One finished run → the next rewards doc + what to celebrate | 4 |
| `src/context/rewards-context.js`, `RewardsContext.jsx` (new) | `RewardsProvider`: load, back-fill, `award`, `clearNews` | 5 |
| `src/main.jsx` | Mount the provider | 5 |
| `src/components/challenge/ChallengeShell.jsx` | `onComplete({ combos })` | 5 |
| `src/pages/curriculum/ProblemView.jsx` | Call `award` once per run; pass results on | 5 |
| `src/data/celebrationSteps.js` | XP on headline; level-up and streak steps | 6 |
| `src/components/rewards/LevelBar.jsx/.css`, `WeekDots.jsx/.css` (new) | Shared displays | 6 |
| `src/components/celebration/steps/LevelUpStep.jsx`, `StreakStep.jsx` (new); `HeadlineStep.jsx`, `CompletionCelebration.jsx/.css` | Celebration UI | 6 |
| `src/components/celebration/sound/cues.js`, `public/sounds/level-up.mp3`, `docs/sounds/process-sounds.py` | New cues | 6 |
| `src/components/ui/Navbar.jsx/.css` | Streak, level, news dot | 7 |
| `src/pages/home/HomeAchievements.jsx/.css` (new), `Home.jsx` | Three home cards | 7 |
| `src/pages/trophies/TrophyRoom.jsx/.css`, `src/hooks/useTrophyData.js`, `src/hooks/useChildrenRewards.js`, `src/pages/auth/ParentArea.jsx/.css` | Ribbons, stats, grown-up read-only | 8 |
| `scripts/seedData.js`, `scripts/seed.js`, `scripts/seedData.test.js` | v2 seed | 9 |
| `docs/PROJECT_KNOWLEDGE.md`, `docs/sounds/README.md`, `.claude/skills/add-curriculum-challenge/SKILL.md`, `docs/PROJECT_IDEAS.md` | Docs | 10 |

---

### Task 1: Phase 0: a failed rewards read never leads to a write

**Files:**
- Modify: `src/hooks/useRewards.js`
- Modify: `src/data/badges.js` (`earnBadges` return)
- Test: `src/data/badges.test.js`

**Interfaces:**
- Consumes: nothing new.
- Produces: `earnBadges(rewards, earned, context)` now leaves `schemaVersion` as it was and keeps every field it doesn't own. `useRewards()` still returns `{ rewards, hydrated, award }`.

- [ ] **Step 1: Write the failing test** (append to `src/data/badges.test.js`)

```js
test("earnBadges keeps unknown fields and never touches schemaVersion", () => {
  const v2 = { schemaVersion: 2, badges: [], counts: {}, xp: 40, streak: { current: 3 } };
  const { rewards } = earnBadges(v2, ["challenge"], AT);
  assert.equal(rewards.schemaVersion, 2);
  assert.equal(rewards.xp, 40);
  assert.deepEqual(rewards.streak, { current: 3 });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --test src/data/badges.test.js`
Expected: FAIL, `1 !== 2` on `schemaVersion`.

- [ ] **Step 3: Implement.** In `src/data/badges.js`, change the `earnBadges` return:

```js
  // The tally moved even when no badge did, so this is always a new document.
  // The version belongs to rewardsShape.normaliseRewards, not to badges.
  return {
    rewards: { ...current, badges: log, counts },
    awarded,
  };
```

In `src/hooks/useRewards.js`, replace the load effect's `try/catch` and add a retry. The full new body of the hook, above `award`:

```js
  const loadedKeyRef = useRef(null);
  // Set when the read FAILED, as distinct from "this child has no rewards yet".
  // A failed read must never be followed by a write: the in-memory document
  // would be empty, and saving it would erase the real one.
  const failedRef = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [rewards, setRewards] = useState(emptyRewards());

  useEffect(() => {
    let cancelled = false;

    loadedKeyRef.current = null;
    failedRef.current = false;
    setHydrated(false);
    setRewards(emptyRewards());

    if (!childId) {
      setHydrated(true);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      let doc;
      try {
        doc = await store.getRewards(childId);
      } catch {
        // Stay un-hydrated: `award` refuses to write and asks for a re-read.
        if (!cancelled) failedRef.current = true;
        return;
      }
      if (cancelled) return;

      const data =
        doc?.data && typeof doc.data === "object"
          ? { ...emptyRewards(), ...doc.data }
          : emptyRewards();
      loadedKeyRef.current = childId;
      setRewards(data);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, attempt]);
```

And at the top of `award`:

```js
      if (failedRef.current) {
        // The last read failed: re-read, and award nothing this time rather
        // than overwrite the real document with an empty one.
        failedRef.current = false;
        setAttempt((n) => n + 1);
        return [];
      }
```

Delete the old catch comment ("we DO mark it loaded…"); it describes the bug.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: all pass, including the new test.

- [ ] **Step 5: Manual check (Review Focus 1).** `npm run dev`, sign in as the seed parent (the localStorage seed, see PROJECT_KNOWLEDGE §5), and pick Liam. In the Playwright MCP, run:

```js
async () => {
  const { store } = await import('/src/data/store/index.js');
  window.__before = localStorage.getItem('dl.rewards');
  store.getRewards = () => Promise.reject(new Error('offline'));
  return 'rewards reads now fail';
}
```

Then switch profile away and back to Liam, so the hook re-reads and fails. Finish a not-yet-completed challenge using the fiber `submit(true)` driver (the `building-curriculum-topics` skill's browser recipe). Then check:

```js
() => window.__before === localStorage.getItem('dl.rewards')
```

Expected: `true`. The document is unchanged, and the celebration shows no badge.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useRewards.js src/data/badges.js src/data/badges.test.js
git commit -m "fix: a failed rewards read can no longer erase a child's badges"
```

---

### Task 2: The v2 rewards shape

**Files:**
- Create: `src/data/rewardsShape.js`
- Modify: `src/data/badges.js` (`emptyRewards`)
- Test: `src/data/rewardsShape.test.js`

**Interfaces:**
- Produces: `REWARDS_SCHEMA_VERSION = 2`, `normaliseRewards(data) → RewardsV2` with the exact fields in the spec's Data shape. `emptyRewards()` returns `normaliseRewards(null)`.

- [ ] **Step 1: Write the failing tests** in `src/data/rewardsShape.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { REWARDS_SCHEMA_VERSION, normaliseRewards } from "./rewardsShape.js";

const V1 = {
  schemaVersion: 1,
  badges: [{ id: "first-steps", level: "challenge", earnedAt: "2026-09-19T10:00:00.000Z", year: 2, subject: "math" }],
  counts: { challenge: 14, topic: 2 },
};

test("a v1 document reads as v2 and keeps every original field byte-identical", () => {
  const out = normaliseRewards(structuredClone(V1));
  assert.equal(out.schemaVersion, REWARDS_SCHEMA_VERSION);
  assert.equal(JSON.stringify(out.badges), JSON.stringify(V1.badges));
  assert.equal(JSON.stringify(out.counts), JSON.stringify(V1.counts));
});

test("missing fields get defaults", () => {
  const out = normaliseRewards(V1);
  assert.equal(out.xp, 0);
  assert.equal(out.xpBackfilled, false);
  assert.deepEqual(out.streak, { current: 0, best: 0, lastDay: null, freezes: 0, recent: [], frozen: [] });
  assert.deepEqual(out.news, { badges: [], stickers: [] });
  assert.deepEqual(out.recentStickers, []);
  assert.deepEqual(out.practice, { day: null, count: 0 });
});

test("garbage degrades to defaults and never throws", () => {
  for (const bad of [null, undefined, 7, "x", [], { xp: "lots", streak: 3, news: null, badges: "no" }]) {
    const out = normaliseRewards(bad);
    assert.equal(out.xp, 0);
    assert.ok(Array.isArray(out.badges));
    assert.equal(out.streak.lastDay, null);
  }
});

test("freezes are clamped to 0–2 and bad dates are dropped", () => {
  const out = normaliseRewards({ streak: { freezes: 9, lastDay: "yesterday", recent: ["2026-09-29", "nope"] } });
  assert.equal(out.streak.freezes, 2);
  assert.equal(out.streak.lastDay, null);
  assert.deepEqual(out.streak.recent, ["2026-09-29"]);
});

test("unknown top-level fields survive, so a newer app's data is never lost", () => {
  assert.equal(normaliseRewards({ futureThing: 1 }).futureThing, 1);
});
```

- [ ] **Step 2: Run and confirm they fail**

Run: `node --test src/data/rewardsShape.test.js`
Expected: FAIL, cannot find module `./rewardsShape.js`.

- [ ] **Step 3: Implement** `src/data/rewardsShape.js`

```js
/**
 * The rewards document's shape, and the one place it is migrated.
 *
 * Read-time and lossless: `normaliseRewards` fills in anything missing with a
 * default and never drops a field it does not know, so a v1 document (badges
 * and counts only) reads as v2 in memory and is written as v2 only on its next
 * real save. Nothing here throws: corrupt data degrades to defaults.
 *
 * v1 (2026-09-19): badges, counts.
 * v2 (2026-09-30): + xp, xpBackfilled, streak, news, recentStickers, practice.
 */
export const REWARDS_SCHEMA_VERSION = 2;

const DAY = /^\d{4}-\d{2}-\d{2}$/;

function obj(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function list(value) {
  return Array.isArray(value) ? value : [];
}
function int(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
}
function day(value) {
  return typeof value === "string" && DAY.test(value) ? value : null;
}
const isDay = (value) => day(value) !== null;

export function normaliseRewards(data) {
  const source = obj(data);
  const streak = obj(source.streak);
  const news = obj(source.news);
  const practice = obj(source.practice);

  return {
    ...source,
    schemaVersion: REWARDS_SCHEMA_VERSION,
    badges: list(source.badges),
    counts: obj(source.counts),
    xp: int(source.xp),
    xpBackfilled: source.xpBackfilled === true,
    streak: {
      ...streak,
      current: int(streak.current),
      best: int(streak.best),
      lastDay: day(streak.lastDay),
      freezes: int(streak.freezes, 0, 2),
      recent: list(streak.recent).filter(isDay),
      frozen: list(streak.frozen).filter(isDay),
    },
    news: { ...news, badges: list(news.badges), stickers: list(news.stickers) },
    recentStickers: list(source.recentStickers),
    practice: { day: day(practice.day), count: int(practice.count) },
  };
}
```

In `src/data/badges.js`, add `import { normaliseRewards } from "./rewardsShape.js";` and replace `emptyRewards`:

```js
/** The empty document, in the current shape (see rewardsShape.js). */
export function emptyRewards() {
  return normaliseRewards(null);
}
```

Keep the existing comment above it about `counts` versus badges held.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: all pass. The `badges.test.js` tests don't pin the empty shape.

- [ ] **Step 5: Commit**

```bash
git add src/data/rewardsShape.js src/data/rewardsShape.test.js src/data/badges.js
git commit -m "feat: rewards document v2 shape with lossless read-time migration"
```

---

### Task 3: Streak rules

**Files:**
- Create: `src/data/streak.js`
- Test: `src/data/streak.test.js`

**Interfaces:**
- Consumes: the `streak` object shape from Task 2.
- Produces:
  - `localDay(date?) → "YYYY-MM-DD"`, `daysBetween(a, b) → int`, `addDays(day, n) → day`
  - `MAX_FREEZES = 2`, `FREEZE_EVERY = 5`, `STREAK_MILESTONES = [3, 7, 14, 30]`
  - `recordDay(streak, today) → { streak, outcome: "none"|"started"|"extended"|"saved"|"restarted", usedFreezes: int, earnedFreeze: bool }`
  - `streakStatus(streak, today) → { current, alive, playedToday, atRisk }`
  - `weekDots(streak, today) → Array<{ day, state: "played"|"frozen"|"today"|"empty" }>` (Mon–Sun)

- [ ] **Step 1: Write the failing tests** in `src/data/streak.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { addDays, daysBetween, recordDay, streakStatus, weekDots } from "./streak.js";
import { normaliseRewards } from "./rewardsShape.js";

const fresh = () => normaliseRewards(null).streak;
/** Plays on each given day in order; returns the final result. */
function play(days, start = fresh()) {
  let streak = start, last;
  for (const d of days) {
    last = recordDay(streak, d);
    streak = last.streak;
  }
  return last;
}

test("day maths ignores daylight saving", () => {
  assert.equal(daysBetween("2026-03-28", "2026-03-30"), 2); // UK clocks change 29 March
  assert.equal(addDays("2026-10-24", 2), "2026-10-26");
});

test("first ever day starts a streak", () => {
  const r = recordDay(fresh(), "2026-09-01");
  assert.equal(r.outcome, "started");
  assert.equal(r.streak.current, 1);
});

test("playing twice the same day changes nothing", () => {
  const once = play(["2026-09-01"]);
  const again = recordDay(once.streak, "2026-09-01");
  assert.equal(again.outcome, "none");
  assert.equal(again.streak, once.streak);
});

test("consecutive days extend", () => {
  const r = play(["2026-09-01", "2026-09-02", "2026-09-03"]);
  assert.equal(r.outcome, "extended");
  assert.equal(r.streak.current, 3);
});

test("a freeze is earned at 5 days, capped at 2", () => {
  const ten = Array.from({ length: 15 }, (_, i) => addDays("2026-09-01", i));
  assert.equal(play(ten.slice(0, 5)).streak.freezes, 1);
  assert.equal(play(ten.slice(0, 10)).streak.freezes, 2);
  assert.equal(play(ten).streak.freezes, 2);
});

test("a missed day is covered by a freeze; frozen days bridge but don't count", () => {
  const five = Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i)); // ends 09-05, 1 freeze
  const r = play([...five, "2026-09-07"]);
  assert.equal(r.outcome, "saved");
  assert.equal(r.usedFreezes, 1);
  assert.equal(r.streak.current, 6);
  assert.equal(r.streak.freezes, 0);
  assert.deepEqual(r.streak.frozen, ["2026-09-06"]);
});

test("a gap bigger than the freezes restarts the streak and keeps the freezes", () => {
  const five = Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i));
  const r = play([...five, "2026-09-09"]); // missed 3 days, holds 1
  assert.equal(r.outcome, "restarted");
  assert.equal(r.streak.current, 1);
  assert.equal(r.streak.freezes, 1);
  assert.equal(r.streak.best, 5);
});

test("a 100-day streak shows 100 (the day lists are capped at 14, the count is not)", () => {
  const days = Array.from({ length: 100 }, (_, i) => addDays("2026-01-01", i));
  const r = play(days);
  assert.equal(r.streak.current, 100);
  assert.equal(r.streak.recent.length, 14);
});

test("a clock that goes backwards changes nothing", () => {
  const r = play(["2026-09-05"]);
  assert.equal(recordDay(r.streak, "2026-09-04").outcome, "none");
});

test("display: alive today, at risk tomorrow, alive through a freeze, broken beyond", () => {
  const five = play(Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i))).streak; // last 09-05, 1 freeze
  assert.deepEqual(streakStatus(five, "2026-09-05"), { current: 5, alive: true, playedToday: true, atRisk: false });
  assert.deepEqual(streakStatus(five, "2026-09-06"), { current: 5, alive: true, playedToday: false, atRisk: true });
  assert.deepEqual(streakStatus(five, "2026-09-07"), { current: 5, alive: true, playedToday: false, atRisk: true });
  assert.deepEqual(streakStatus(five, "2026-09-08"), { current: 0, alive: false, playedToday: false, atRisk: false });
  assert.equal(streakStatus(fresh(), "2026-09-08").current, 0);
});

test("week dots run Monday to Sunday", () => {
  const s = play(["2026-09-28", "2026-09-29"]).streak; // Mon, Tue
  const dots = weekDots(s, "2026-09-30"); // Wednesday
  assert.equal(dots.length, 7);
  assert.equal(dots[0].day, "2026-09-28");
  assert.deepEqual(dots.slice(0, 3).map((d) => d.state), ["played", "played", "today"]);
  assert.equal(dots[6].state, "empty");
});
```

- [ ] **Step 2: Run and confirm they fail**

Run: `node --test src/data/streak.test.js`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement** `src/data/streak.js`

```js
/**
 * Daily streaks, with forgiving freezes. Pure: `today` is always passed in.
 *
 * A day is the device's local calendar date ("YYYY-MM-DD"). Gaps are measured
 * on UTC midnights so a daylight-saving change can never make a day vanish.
 * `current` counts days PLAYED in a row; a frozen day bridges a gap but does
 * not add to it. `recent`/`frozen` are capped lists for the Mon–Sun dots only.
 */
export const MAX_FREEZES = 2;
export const FREEZE_EVERY = 5;
export const STREAK_MILESTONES = [3, 7, 14, 30];
const KEEP = 14;

export function localDay(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function utc(day) {
  const [y, m, d] = day.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function daysBetween(from, to) {
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

export function addDays(day, n) {
  return new Date(utc(day) + n * 86_400_000).toISOString().slice(0, 10);
}

const keep = (days, day) => [...days, day].slice(-KEEP);

export function recordDay(streak, today) {
  if (streak.lastDay && daysBetween(streak.lastDay, today) <= 0) {
    return { streak, outcome: "none", usedFreezes: 0, earnedFreeze: false };
  }

  let current;
  let outcome;
  let usedFreezes = 0;
  let freezes = streak.freezes;
  let frozen = streak.frozen;

  if (!streak.lastDay) {
    current = 1;
    outcome = "started";
  } else {
    const missed = daysBetween(streak.lastDay, today) - 1;
    if (missed === 0) {
      current = streak.current + 1;
      outcome = "extended";
    } else if (missed <= freezes) {
      usedFreezes = missed;
      freezes -= missed;
      for (let i = 1; i <= missed; i++) frozen = keep(frozen, addDays(streak.lastDay, i));
      current = streak.current + 1;
      outcome = "saved";
    } else {
      // Too long a gap: a fresh start, and the freezes are kept, not wasted.
      current = 1;
      outcome = "restarted";
    }
  }

  const earnedFreeze = current % FREEZE_EVERY === 0 && freezes < MAX_FREEZES;
  if (earnedFreeze) freezes += 1;

  return {
    streak: {
      ...streak,
      current,
      best: Math.max(streak.best, current),
      lastDay: today,
      freezes,
      recent: keep(streak.recent, today),
      frozen,
    },
    outcome,
    usedFreezes,
    earnedFreeze,
  };
}

/** For display only: what the streak looks like right now, without writing. */
export function streakStatus(streak, today) {
  if (!streak.lastDay) return { current: 0, alive: false, playedToday: false, atRisk: false };
  const gap = daysBetween(streak.lastDay, today);
  if (gap <= 0) return { current: streak.current, alive: true, playedToday: true, atRisk: false };
  if (gap - 1 <= streak.freezes) {
    return { current: streak.current, alive: true, playedToday: false, atRisk: true };
  }
  return { current: 0, alive: false, playedToday: false, atRisk: false };
}

/** The Monday-to-Sunday week containing `today`, each day's dot state. */
export function weekDots(streak, today) {
  const mondayOffset = (new Date(utc(today)).getUTCDay() + 6) % 7;
  const monday = addDays(today, -mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(monday, i);
    const state = streak.recent.includes(day)
      ? "played"
      : streak.frozen.includes(day)
        ? "frozen"
        : day === today
          ? "today"
          : "empty";
    return { day, state };
  });
}
```

- [ ] **Step 4: Run the tests**

Run: `node --test src/data/streak.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/streak.js src/data/streak.test.js
git commit -m "feat: daily streak rules with freezes"
```

---

### Task 4: XP, levels, news, and one pure award for a finished run

**Files:**
- Create: `src/data/xp.js`, `src/data/news.js`, `src/data/awardRun.js`
- Test: `src/data/xp.test.js`, `src/data/news.test.js`, `src/data/awardRun.test.js`

**Interfaces:**
- Consumes: `normaliseRewards` (Task 2), `recordDay` (Task 3), `earnBadges` (Task 1), and `getTopicStats` from `src/data/curriculumProgressStats.js`.
- Produces:
  - `XP = { first: 10, practice: 5, combo: 2, backfill: 10 }`, `PRACTICE_XP_PER_DAY = 2`
  - `xpForRun({ firstTime, combos, practice, today }) → { xp, practice, practiceCapped }`
  - `backfillXp(candidates) → int` (candidates in `loadResumeCandidates`' shape)
  - `levelFor(xp) → { level, into, needed }`
  - `displayXp(rewards, pendingBackfill) → int`
  - `stickerKey(year, subject, topicId) → string`, `addNews(rewards, { badges, sticker })`, `clearNews(rewards)`, `hasNews(rewards)`
  - `awardRun(rewards, input) → { rewards, awarded, xpGained, xpTotal, practiceCapped, levelBefore, levelAfter, streakOutcome, streak, usedFreezes, earnedFreeze }`, where `input = { earned, firstTime, combos, sticker, today, at, year, subject, pendingBackfill }` and `pendingBackfill` is `number | null` (`null` = not known yet)

- [ ] **Step 1: Write the failing tests.**

`src/data/xp.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { backfillXp, displayXp, levelFor, xpForRun } from "./xp.js";
import { normaliseRewards } from "./rewardsShape.js";

const P0 = { day: null, count: 0 };

test("first completion is 10, plus 2 per combo", () => {
  assert.equal(xpForRun({ firstTime: true, combos: 2, practice: P0, today: "2026-09-30" }).xp, 14);
});

test("practice earns 5 for the first 2 replays a day, then nothing", () => {
  let practice = P0;
  const got = [];
  for (let i = 0; i < 3; i++) {
    const r = xpForRun({ firstTime: false, combos: 1, practice, today: "2026-09-30" });
    got.push([r.xp, r.practiceCapped]);
    practice = r.practice;
  }
  assert.deepEqual(got, [[7, false], [7, false], [0, true]]);
  assert.equal(xpForRun({ firstTime: false, combos: 0, practice, today: "2026-10-01" }).xp, 5);
});

test("level curve: 100, 250, 450, 700, 1000, 1350", () => {
  assert.deepEqual(levelFor(0), { level: 1, into: 0, needed: 100 });
  assert.equal(levelFor(99).level, 1);
  assert.equal(levelFor(100).level, 2);
  assert.deepEqual(levelFor(260), { level: 3, into: 10, needed: 200 });
  for (const [xp, level] of [[450, 4], [700, 5], [1000, 6], [1349, 6], [1350, 7]]) {
    assert.equal(levelFor(xp).level, level, `${xp} XP`);
  }
});

test("back-fill counts only completed, built challenges", () => {
  const curriculum = [{ id: "c", topics: [{ id: "t", challenges: [{ id: 1 }, { id: 2 }, { id: 3 }] }] }];
  const candidates = [{
    curriculum,
    progress: { c: { topics: { t: { completedChallenges: [1, 2, 3, 9] } } } },
    isBuilt: (topicId, challengeId) => Number(challengeId) !== 3,
  }];
  assert.equal(backfillXp(candidates), 20);
  assert.equal(backfillXp([]), 0);
});

test("displayed XP includes a pending back-fill until it is stored", () => {
  const r = normaliseRewards({ xp: 5 });
  assert.equal(displayXp(r, 40), 45);
  assert.equal(displayXp(r, null), 5);
  assert.equal(displayXp({ ...r, xpBackfilled: true }, 40), 5);
});
```

`src/data/news.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { addNews, clearNews, hasNews, stickerKey } from "./news.js";
import { normaliseRewards } from "./rewardsShape.js";

test("new badges and a sticker become news, without duplicates", () => {
  const key = stickerKey(2, "math", "place-value");
  let r = addNews(normaliseRewards(null), { badges: [{ id: "topic-finisher" }], sticker: key });
  r = addNews(r, { badges: ["topic-finisher"], sticker: key });
  assert.deepEqual(r.news, { badges: ["topic-finisher"], stickers: ["2/math/place-value"] });
  assert.equal(hasNews(r), true);
});

test("recent stickers keep the newest 5, newest last", () => {
  let r = normaliseRewards(null);
  for (let i = 1; i <= 7; i++) r = addNews(r, { sticker: `2/math/t${i}` });
  assert.deepEqual(r.recentStickers, ["2/math/t3", "2/math/t4", "2/math/t5", "2/math/t6", "2/math/t7"]);
});

test("clearing news empties it, and is the same object when there was none", () => {
  const empty = normaliseRewards(null);
  assert.equal(clearNews(empty), empty);
  const cleared = clearNews(addNews(empty, { badges: ["first-steps"] }));
  assert.equal(hasNews(cleared), false);
});
```

`src/data/awardRun.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { awardRun } from "./awardRun.js";
import { normaliseRewards } from "./rewardsShape.js";

const base = { at: "2026-09-30T10:00:00.000Z", year: "2", subject: "math", combos: 0, sticker: null };
const V1 = { schemaVersion: 1, badges: [{ id: "first-steps", level: "challenge" }], counts: { challenge: 3 } };

test("a first completion adds XP, starts a streak and stores v2 without losing v1 data", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 30 });
  assert.equal(r.rewards.schemaVersion, 2);
  assert.equal(JSON.stringify(r.rewards.badges), JSON.stringify(V1.badges));
  assert.equal(r.rewards.counts.challenge, 4);
  assert.equal(r.xpGained, 10);
  assert.equal(r.rewards.xp, 40); // 30 back-fill + 10
  assert.equal(r.rewards.xpBackfilled, true);
  assert.equal(r.streakOutcome, "started");
});

test("pendingBackfill null (the progress read failed) leaves the back-fill for later", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: null });
  assert.equal(r.rewards.xp, 10);
  assert.equal(r.rewards.xpBackfilled, false);
});

test("the back-fill alone never counts as a level-up", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 300 });
  assert.equal(r.levelBefore, 3); // 300 XP
  assert.equal(r.levelAfter, 3); // 310 XP
});

test("crossing a level boundary is a level-up", () => {
  const start = normaliseRewards({ xp: 95, xpBackfilled: true });
  const r = awardRun(start, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 0 });
  assert.deepEqual([r.levelBefore, r.levelAfter], [1, 2]);
});

test("new badges and an earned sticker become news", () => {
  const r = awardRun(normaliseRewards(null), {
    ...base, earned: ["challenge", "topic"], firstTime: true, today: "2026-09-30",
    sticker: "2/math/numbers-and-counting", pendingBackfill: 0,
  });
  assert.deepEqual(r.rewards.news.stickers, ["2/math/numbers-and-counting"]);
  assert.ok(r.rewards.news.badges.includes("first-steps"));
  assert.ok(r.rewards.news.badges.includes("topic-finisher"));
});

test("a third practice replay today earns no XP but still counts for the streak", () => {
  let r = normaliseRewards({ xpBackfilled: true });
  let out;
  for (let i = 0; i < 3; i++) {
    out = awardRun(r, { ...base, earned: [], firstTime: false, today: "2026-09-30", pendingBackfill: 0 });
    r = out.rewards;
  }
  assert.equal(out.xpGained, 0);
  assert.equal(out.practiceCapped, true);
  assert.equal(r.xp, 10);
  assert.equal(r.streak.current, 1);
});
```

- [ ] **Step 2: Run and confirm they fail**

Run: `node --test src/data/xp.test.js src/data/news.test.js src/data/awardRun.test.js`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement.**

`src/data/xp.js`:

```js
/**
 * XP and levels. Pure.
 *
 * XP is earned per FINISHED challenge (saved once, with the badges), never
 * per answer. Practice replays earn a little, but only the first
 * PRACTICE_XP_PER_DAY of them each day, so replaying the easiest challenge
 * is not a way to level up.
 */
import { getTopicStats } from "./curriculumProgressStats.js";

export const XP = { first: 10, practice: 5, combo: 2, backfill: 10 };
export const PRACTICE_XP_PER_DAY = 2;

export function xpForRun({ firstTime, combos = 0, practice, today }) {
  const comboXp = Math.max(0, Math.floor(Number(combos) || 0)) * XP.combo;
  if (firstTime) return { xp: XP.first + comboXp, practice, practiceCapped: false };

  const count = practice.day === today ? practice.count : 0;
  if (count >= PRACTICE_XP_PER_DAY) {
    return { xp: 0, practice: { day: today, count }, practiceCapped: true };
  }
  return { xp: XP.practice + comboXp, practice: { day: today, count: count + 1 }, practiceCapped: false };
}

/** 10 XP for each completed, BUILT challenge across every curriculum. */
export function backfillXp(candidates) {
  let completed = 0;
  for (const { curriculum, progress, isBuilt } of candidates ?? []) {
    for (const category of curriculum ?? []) {
      for (const topic of category.topics) {
        completed += getTopicStats(progress, category.id, topic, isBuilt).completed;
      }
    }
  }
  return completed * XP.backfill;
}

/** Level 2 at 100 XP; each next gap is 50 XP bigger than the last. */
export function levelFor(xp) {
  let level = 1;
  let floor = 0;
  let gap = 100;
  while (xp >= floor + gap) {
    floor += gap;
    level += 1;
    gap += 50;
  }
  return { level, into: xp - floor, needed: gap };
}

/** What to show before a pending back-fill has been stored. */
export function displayXp(rewards, pendingBackfill) {
  const pending = !rewards.xpBackfilled && Number.isFinite(pendingBackfill) ? pendingBackfill : 0;
  return rewards.xp + pending;
}
```

`src/data/news.js`:

```js
/**
 * "Something new": badges and stickers earned but not yet looked at.
 *
 * Items are ADDED when earned and CLEARED when the child opens their own
 * Trophy Room, so anything a child owned before this shipped is never
 * "new", and nothing needs every progress document to work it out.
 */
const RECENT = 5;

export const stickerKey = (year, subject, topicId) => `${year}/${subject}/${topicId}`;

export function addNews(rewards, { badges = [], sticker = null } = {}) {
  const ids = badges.map((badge) => (typeof badge === "string" ? badge : badge.id));
  const news = {
    ...rewards.news,
    badges: [...new Set([...rewards.news.badges, ...ids])],
    stickers: sticker ? [...new Set([...rewards.news.stickers, sticker])] : rewards.news.stickers,
  };
  const recentStickers = sticker
    ? [...rewards.recentStickers.filter((key) => key !== sticker), sticker].slice(-RECENT)
    : rewards.recentStickers;
  return { ...rewards, news, recentStickers };
}

export function hasNews(rewards) {
  return rewards.news.badges.length + rewards.news.stickers.length > 0;
}

export function clearNews(rewards) {
  if (!hasNews(rewards)) return rewards;
  return { ...rewards, news: { ...rewards.news, badges: [], stickers: [] } };
}
```

`src/data/awardRun.js`:

```js
/**
 * Everything one finished challenge changes, in one pure step: badges (via
 * earnBadges, unchanged), XP (plus any pending back-fill), the streak, and
 * news. The RewardsProvider saves the result; the celebration shows it.
 *
 * `pendingBackfill` is a number once the progress documents have been read,
 * or null if that read has not happened or failed, in which case the
 * back-fill waits for a later run.
 */
import { earnBadges } from "./badges.js";
import { normaliseRewards } from "./rewardsShape.js";
import { recordDay } from "./streak.js";
import { levelFor, xpForRun } from "./xp.js";
import { addNews } from "./news.js";

export function awardRun(rewards, input) {
  const { earned = [], firstTime, combos = 0, sticker = null, today, at, year, subject } = input;
  const pendingBackfill = Number.isFinite(input.pendingBackfill) ? input.pendingBackfill : null;

  let next = normaliseRewards(rewards);
  const backfill = !next.xpBackfilled && pendingBackfill !== null ? pendingBackfill : 0;
  const levelBefore = levelFor(next.xp + backfill).level;

  const badges = earnBadges(next, earned, { at, year, subject });
  next = badges.rewards;

  const run = xpForRun({ firstTime, combos, practice: next.practice, today });
  const day = recordDay(next.streak, today);

  next = {
    ...next,
    xp: next.xp + backfill + run.xp,
    xpBackfilled: next.xpBackfilled || pendingBackfill !== null,
    practice: run.practice,
    streak: day.streak,
  };
  next = addNews(next, { badges: badges.awarded, sticker });

  return {
    rewards: next,
    awarded: badges.awarded,
    xpGained: run.xp,
    xpTotal: next.xp,
    practiceCapped: run.practiceCapped,
    levelBefore,
    levelAfter: levelFor(next.xp).level,
    streakOutcome: day.outcome,
    streak: day.streak,
    usedFreezes: day.usedFreezes,
    earnedFreeze: day.earnedFreeze,
  };
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/xp.js src/data/xp.test.js src/data/news.js src/data/news.test.js src/data/awardRun.js src/data/awardRun.test.js
git commit -m "feat: XP, levels, news and a pure award for a finished run"
```

---

### Task 5: `RewardsProvider`, the combo hand-off, and one award per run

**Files:**
- Create: `src/context/rewards-context.js`, `src/context/RewardsContext.jsx`
- Modify: `src/hooks/useRewards.js` (becomes a reader), `src/main.jsx`, `src/components/challenge/ChallengeShell.jsx`, `src/pages/curriculum/ProblemView.jsx`

**Interfaces:**
- Consumes: `awardRun`, `backfillXp`, `displayXp`, `levelFor`, `clearNews`, `hasNews`, `normaliseRewards`, `stickerKey`, `localDay`, `weekDots`, `loadResumeCandidates` (`src/data/resumeCandidates.js`), and `isChallengeImplemented` (`src/data/challengeAvailability.js`).
- Produces: `useRewards() → { rewards, status: "idle"|"loading"|"ready"|"failed", hydrated, xp, pendingBackfill, award(input) → AwardResult|null, clearNews() }`. `xp` is the displayed XP; `AwardResult` is `awardRun`'s return. `ChallengeShell` calls `onComplete({ combos })`.

- [ ] **Step 1: Create `src/context/rewards-context.js`**

```js
import { createContext } from "react";

/** Split from RewardsContext.jsx for Fast Refresh, like auth-context.js. */
export const RewardsContext = createContext(null);
```

- [ ] **Step 2: Create `src/context/RewardsContext.jsx`**

```jsx
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./auth-context";
import { RewardsContext } from "./rewards-context";
import { store } from "../data/store";
import { normaliseRewards } from "../data/rewardsShape";
import { awardRun } from "../data/awardRun";
import { backfillXp, displayXp } from "../data/xp";
import { clearNews as clearNewsFrom, hasNews } from "../data/news";
import { loadResumeCandidates } from "../data/resumeCandidates";
import { isChallengeImplemented } from "../data/challengeAvailability";

/**
 * The ACTIVE child's rewards, one in-memory document shared by every screen
 * (challenge page, navbar, home, Trophy Room), so the "something new" dot
 * moves the instant a sticker is won.
 *
 * Writes at exactly two moments: `award` (a challenge finished) and
 * `clearNews` (the child opened their own Trophy Room). Guards, as in
 * useProgress:
 *   - `loadedKeyRef`: never write one child's rewards into another's document
 *   - a FAILED read stays `failed`, never `ready`, so it can never be followed
 *     by a write that would erase the real document; `award` asks for a re-read
 *   - `latestRef` holds the newest document, so two writes in a row never
 *     build on a stale copy
 */
export function RewardsProvider({ children }) {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  const loadedKeyRef = useRef(null);
  const latestRef = useRef(normaliseRewards(null));
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    status: "idle",
    rewards: latestRef.current,
    pendingBackfill: null,
  });

  useEffect(() => {
    let cancelled = false;
    loadedKeyRef.current = null;
    latestRef.current = normaliseRewards(null);
    setState({ status: childId ? "loading" : "idle", rewards: latestRef.current, pendingBackfill: null });
    if (!childId) return () => {
      cancelled = true;
    };

    (async () => {
      let doc;
      try {
        doc = await store.getRewards(childId);
      } catch {
        if (!cancelled) setState((s) => ({ ...s, status: "failed" }));
        return;
      }
      if (cancelled) return;

      const rewards = normaliseRewards(doc?.data);
      loadedKeyRef.current = childId;
      latestRef.current = rewards;
      setState({ status: "ready", rewards, pendingBackfill: null });

      // The one-off back-fill needs every progress document. Read-only; a
      // failure leaves it null, and awardRun then leaves it for a later visit.
      if (!rewards.xpBackfilled) {
        try {
          const candidates = await loadResumeCandidates(store, childId, isChallengeImplemented);
          if (!cancelled) setState((s) => ({ ...s, pendingBackfill: backfillXp(candidates) }));
        } catch {
          // Next visit.
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, attempt]);

  const save = useCallback(
    (next) => {
      latestRef.current = next;
      setState((s) => ({ ...s, rewards: next }));
      store.saveRewards(childId, next).catch(() => {
        // Kept in memory for this visit; the next successful save includes it.
      });
    },
    [childId]
  );

  const award = useCallback(
    (input) => {
      if (state.status === "failed") {
        setAttempt((n) => n + 1);
        return null;
      }
      if (state.status !== "ready" || loadedKeyRef.current !== childId) return null;
      const result = awardRun(latestRef.current, { ...input, pendingBackfill: state.pendingBackfill });
      save(result.rewards);
      return result;
    },
    [state.status, state.pendingBackfill, childId, save]
  );

  const clearNews = useCallback(() => {
    if (state.status !== "ready" || loadedKeyRef.current !== childId) return;
    if (!hasNews(latestRef.current)) return;
    save(clearNewsFrom(latestRef.current));
  }, [state.status, childId, save]);

  const value = useMemo(
    () => ({
      rewards: state.rewards,
      status: state.status,
      hydrated: state.status === "ready",
      pendingBackfill: state.pendingBackfill,
      xp: displayXp(state.rewards, state.pendingBackfill),
      award,
      clearNews,
    }),
    [state, award, clearNews]
  );

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}
```

- [ ] **Step 3: Replace `src/hooks/useRewards.js`** with a reader (Task 1's guard now lives in the provider):

```js
import { useContext } from "react";
import { RewardsContext } from "../context/rewards-context";
import { normaliseRewards } from "../data/rewardsShape";

const INERT = {
  rewards: normaliseRewards(null),
  status: "idle",
  hydrated: false,
  pendingBackfill: null,
  xp: 0,
  award: () => null,
  clearNews: () => {},
};

/**
 * The active child's rewards, from RewardsProvider (src/context/). Outside the
 * provider it is inert: never a read, never a write.
 */
export function useRewards() {
  return useContext(RewardsContext) ?? INERT;
}
```

- [ ] **Step 4: Mount the provider** in `src/main.jsx`. Add `import { RewardsProvider } from "./context/RewardsContext";` and wrap:

```jsx
      <AuthProvider>
        <RewardsProvider>
          <RouterProvider router={router} />
        </RewardsProvider>
      </AuthProvider>
```

- [ ] **Step 5: Report combos from `ChallengeShell`.** Add `const combosRef = useRef(0);` beside `streakRef`. In `submit`, after `const { streak, combo } = nextStreak(...)`, add `if (combo) combosRef.current += 1;`. Change the timer's final call to:

```js
      if (isLast) {
        onComplete({ combos: combosRef.current });
        return;
      }
```

Update the doc comment's contract line to: "`onComplete({ combos })` once the last question is right; `combos` counts '3 in a row' bursts this run."

- [ ] **Step 6: Award once per run in `ProblemView`.** Replace `const { award } = useRewards();` and the `award(...)` line. The new imports are `useRef`, `localDay`/`weekDots` from `../../data/streak`, and `stickerKey` from `../../data/news`.

```js
  const { award } = useRewards();
  // One award per run: XP is additive, so a second call must never count.
  // A ref, not state: two calls in the same tick would both see stale state.
  // It resets whenever the challenge changes, so Next → Back → play again is
  // a genuine new run and is awarded.
  const awardedKeyRef = useRef(null);
  useEffect(() => {
    awardedKeyRef.current = null;
  }, [positionKey]);
```

In `handleComplete(run = {})`, first lines after `if (!hydrated) return;`:

```js
    if (awardedKeyRef.current === positionKey) return;
    awardedKeyRef.current = positionKey;
```

Compute `extras` exactly as today (the sticker and year stats). **Before** the award, determine the sticker key:

```js
    const stickerWon =
      result.earned.includes("topic") && extras.sticker?.earned
        ? stickerKey(year, subject, topicId)
        : null;

    const today = localDay();
    const gained = award({
      earned: result.earned,
      firstTime: result.earned.length > 0,
      combos: run?.combos ?? 0,
      sticker: stickerWon,
      today,
      at: new Date().toISOString(),
      year,
      subject,
    });

    setCompletion({
      positionKey,
      result,
      badges: gained?.awarded ?? [],
      ...extras,
      xp: gained && {
        gained: gained.xpGained,
        total: gained.xpTotal,
        capped: gained.practiceCapped,
      },
      levelUp: gained && gained.levelAfter > gained.levelBefore ? gained.levelAfter : null,
      streak:
        gained && gained.streakOutcome !== "none"
          ? {
              outcome: gained.streakOutcome,
              current: gained.streak.current,
              usedFreezes: gained.usedFreezes,
              dots: weekDots(gained.streak, today),
            }
          : null,
    });
```

Pass the new fields to `CompletionCelebration`: `xp={completion.xp}`, `levelUp={completion.levelUp}`, `streak={completion.streak}`.

While a run's celebration is showing, `ProblemView` renders the celebration rather than the challenge, so the same position can't be played again until `positionKey` changes, which resets the ref.

- [ ] **Step 7: Run the checks**

Run: `npm run lint && npm test && npm run build`
Expected: all pass. The celebration ignores the new props until Task 6.

- [ ] **Step 8: Manual checks (Review Focus 2 and 5).**
  - **Profile switch:** start a challenge as Liam, switch to Demi on `/profiles` mid-load, finish a challenge as Demi, then compare both children's `dl.rewards` entries. Only Demi's document changed.
  - **Double call:** in the Playwright MCP, find `ProblemView`'s `handleComplete` via the fiber of `.problem-page`, call it twice in one tick, and confirm `xp` in `dl.rewards` rose by exactly one run's XP.

- [ ] **Step 9: Commit**

```bash
git add src/context/rewards-context.js src/context/RewardsContext.jsx src/hooks/useRewards.js src/main.jsx src/components/challenge/ChallengeShell.jsx src/pages/curriculum/ProblemView.jsx
git commit -m "feat: one shared rewards provider; XP, streak and news awarded once per run"
```

---

### Task 6: Celebration: XP, level-up (with Bix) and streak steps, plus sounds

**Files:**
- Modify: `src/data/celebrationSteps.js`, `src/data/celebrationSteps.test.js`, `src/components/celebration/CompletionCelebration.jsx`, `src/components/celebration/CompletionCelebration.css`, `src/components/celebration/steps/HeadlineStep.jsx`, `src/components/celebration/sound/cues.js`, `src/components/celebration/sound/cues.test.js`, `docs/sounds/process-sounds.py`
- Create: `src/components/rewards/LevelBar.jsx`, `LevelBar.css`, `WeekDots.jsx`, `WeekDots.css`, `src/components/celebration/steps/LevelUpStep.jsx`, `StreakStep.jsx`, `public/sounds/level-up.mp3`

**Interfaces:**
- Consumes: `levelFor` (Task 4), `STREAK_MILESTONES` (Task 3), `Mascot` (`src/components/mascot/Mascot.jsx`: `className`, `cheerOn`, `decorative`), and the `completion.xp/levelUp/streak` fields (Task 5).
- Produces: `buildCelebrationSteps({ …existing, xp, levelUp, streak })`; steps of type `"levelUp"` (`{ level }`) and `"streak"` (`{ outcome, current, usedFreezes, dots }`); cues `levelUp` and `streak`; `<LevelBar xp />` and `<WeekDots dots />`, both reused by Tasks 7 and 8.

- [ ] **Step 1: Write the failing tests** (append to `src/data/celebrationSteps.test.js`)

```js
const streakInfo = { outcome: "extended", current: 4, usedFreezes: 0, dots: [] };

test("the day's first plain challenge becomes headline, streak, next", () => {
  const steps = buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: streakInfo });
  assert.deepEqual(types(steps), ["headline", "streak", "next"]);
});

test("a practice replay that is the day's first also gets the streak step", () => {
  const steps = buildCelebrationSteps({ level: "practice", streak: { ...streakInfo, outcome: "started", current: 1 } });
  assert.deepEqual(types(steps), ["headline", "streak", "next"]);
});

test("level-up comes after the unlock and before the streak and certificate", () => {
  const steps = buildCelebrationSteps({
    level: "year",
    earned: ["challenge", "topic", "category", "subject", "year"],
    badges: [getBadge("topic-finisher")],
    sticker,
    yearBefore: before,
    yearAfter: after,
    levelUp: 6,
    streak: streakInfo,
  });
  assert.deepEqual(types(steps), [
    "headline", "progress", "sticker", "badge", "unlock", "levelUp", "streak", "certificate", "next",
  ]);
});

test("the XP gain rides on the headline", () => {
  const [headline] = buildCelebrationSteps({ level: "challenge", earned: ["challenge"], xp: { gained: 12, total: 112, capped: false } });
  assert.deepEqual(headline.xp, { gained: 12, total: 112, capped: false });
});

test("streak milestones get the bigger effect", () => {
  const at = (current) =>
    buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: { ...streakInfo, current } })[1].effect;
  assert.equal(at(4), "burst");
  assert.equal(at(7), "confettiStars");
});

test("no streak step when the streak didn't move (second game today)", () => {
  assert.deepEqual(types(buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: null })), ["headline"]);
});
```

In `src/components/celebration/sound/cues.test.js`, add `levelUp: 6, streak: { outcome: "extended", current: 2, usedFreezes: 0, dots: [] },` to the `buildCelebrationSteps` input in the third test, so `levelUp` and `streak` are checked to exist.

- [ ] **Step 2: Run and confirm they fail**

Run: `node --test src/data/celebrationSteps.test.js src/components/celebration/sound/cues.test.js`
Expected: FAIL. The step types are missing, and there are no cues named `levelUp`/`streak`.

- [ ] **Step 3: Implement `buildCelebrationSteps`.** Add `import { STREAK_MILESTONES } from "./streak.js";` and change the signature and body:

```js
const STREAK_STEPS = new Set(["started", "extended", "saved", "restarted"]);

export function buildCelebrationSteps({
  level,
  earned = [],
  badges = [],
  sticker = null,
  yearBefore = null,
  yearAfter = null,
  xp = null,
  levelUp = null,
  streak = null,
}) {
  const tier = TIERS[level] ?? TIERS.challenge;
  const headline = { type: "headline", level, ...tier, xp };
  const middle = [];
  // …progress, sticker, badges/unlock exactly as now…

  if (levelUp) {
    middle.push({ type: "levelUp", level: levelUp, effect: "confettiStars", cue: "levelUp" });
  }
  if (streak && STREAK_STEPS.has(streak.outcome)) {
    const milestone = STREAK_MILESTONES.includes(streak.current);
    middle.push({ type: "streak", ...streak, effect: milestone ? "confettiStars" : "burst", cue: "streak" });
  }

  if (earned.includes("year")) {
    middle.push({ type: "certificate", effect: "confetti", cue: "certificate" });
  }

  if (middle.length === 0) return [{ ...headline, final: true }];
  return [headline, ...middle, { type: "next", final: true }];
}
```

- [ ] **Step 4: The sounds.**
  1. Download the original: `curl -sSL -o /tmp/2984.wav https://assets.mixkit.co/active_storage/sfx/2984/2984.wav`, and fetch the other 13 originals into the same folder using the commands at the top of `docs/sounds/process-sounds.py`.
  2. In `process-sounds.py`'s `PLAN`, add `("level-up", 2984, -18),` and the download id `2984` to its header comment.
  3. Run `python3 docs/sounds/process-sounds.py /tmp`.
  4. Confirm the printout: `level-up` within ±1 LU of -18. The other 13 files must be **byte-identical** to before (`md5 -q public/sounds/*.mp3` before and after, excluding `level-up.mp3`).
  5. In `cues.js`, add to `CUES`:

```js
  /** The level-up step. Mixkit #2984 "Funny melody audio logo". */
  levelUp: { src: file("level-up"), synth: SYNTH.fanfare.synth },
  /** The day's-first streak step. Mixkit #2317, the same file as `badge`, by choice. */
  streak: { src: file("badge"), synth: SYNTH.reveal.synth },
```

- [ ] **Step 5: Shared displays.**

`src/components/rewards/LevelBar.jsx`:

```jsx
import { levelFor } from "../../data/xp";
import "./LevelBar.css";

/** "Lv 3 ▓▓▓░░ 40/200 XP". The one level display, shared by four screens. */
export default function LevelBar({ xp, className = "" }) {
  const { level, into, needed } = levelFor(xp);
  return (
    <div className={`level-bar ${className}`}>
      <span className="level-bar-level">Lv {level}</span>
      <span
        className="level-bar-track"
        role="progressbar"
        aria-label={`Level ${level}: ${into} of ${needed} XP to level ${level + 1}`}
        aria-valuemin={0}
        aria-valuemax={needed}
        aria-valuenow={into}
      >
        <span className="level-bar-fill" style={{ width: `${(into / needed) * 100}%` }} />
      </span>
      <span className="level-bar-count">{into}/{needed} XP</span>
    </div>
  );
}
```

`src/components/rewards/LevelBar.css`:

```css
.level-bar {
  --lb-ink: var(--light-text);
  --lb-track: rgba(34, 24, 28, 0.1);
  --lb-fill: var(--light-accent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--lb-ink);
  font-weight: 700;
}
body.dark .level-bar {
  --lb-ink: var(--dark-text);
  --lb-track: rgba(246, 232, 234, 0.14);
  --lb-fill: var(--dark-accent);
}
.level-bar-track {
  flex: 1;
  height: 12px;
  min-width: 80px;
  border-radius: 999px;
  background: var(--lb-track);
  overflow: hidden;
}
.level-bar-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--lb-fill);
  transition: width 900ms cubic-bezier(0.2, 0.9, 0.3, 1);
}
.level-bar-count { font-size: 0.85rem; opacity: 0.8; white-space: nowrap; }
@media (prefers-reduced-motion: reduce) { .level-bar-fill { transition: none; } }
```

`src/components/rewards/WeekDots.jsx`:

```jsx
import "./WeekDots.css";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const WORDS = { played: "played", frozen: "saved by a freeze", today: "today", empty: "not played" };

/** Mon–Sun: 🔥 played, 🧊 frozen, a ring for today. From streak.weekDots. */
export default function WeekDots({ dots }) {
  return (
    <ol className="week-dots" aria-label="This week">
      {dots.map((dot, i) => (
        <li key={dot.day} className={`week-dot is-${dot.state}`}>
          <span className="week-dot-mark" aria-hidden="true">
            {dot.state === "played" ? "🔥" : dot.state === "frozen" ? "🧊" : ""}
          </span>
          <span className="week-dot-day" aria-hidden="true">{LETTERS[i]}</span>
          <span className="sr-only">{`${dot.day}: ${WORDS[dot.state]}`}</span>
        </li>
      ))}
    </ol>
  );
}
```

`src/components/rewards/WeekDots.css`:

```css
.week-dots {
  --wd-ink: var(--light-text);
  --wd-empty: rgba(34, 24, 28, 0.08);
  --wd-ring: var(--light-accent);
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin: 0.8rem 0 0;
  padding: 0;
  list-style: none;
  color: var(--wd-ink);
}
body.dark .week-dots {
  --wd-ink: var(--dark-text);
  --wd-empty: rgba(246, 232, 234, 0.12);
  --wd-ring: var(--dark-accent);
}
.week-dot { display: grid; justify-items: center; gap: 0.2rem; font-size: 0.75rem; font-weight: 700; }
.week-dot-mark {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--wd-empty);
  font-size: 1.05rem;
}
.week-dot.is-today .week-dot-mark { box-shadow: inset 0 0 0 3px var(--wd-ring); }
.week-dots .sr-only {
  position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}
```

- [ ] **Step 6: The steps.**

`src/components/celebration/steps/LevelUpStep.jsx`:

```jsx
import Mascot from "../../mascot/Mascot";

/** A new level, with Bix cheering it in. */
export default function LevelUpStep({ step, headingRef, focalRef }) {
  return (
    <>
      <p className="completion-celebration-eyebrow">You levelled up</p>
      <h2 ref={headingRef} tabIndex={-1}>Level {step.level}!</h2>
      <div className="celebration-levelup" ref={focalRef}>
        <Mascot className="mascot-medium" cheerOn={step.level} decorative />
        <span className="celebration-level-badge" aria-hidden="true">{step.level}</span>
      </div>
      <p className="completion-celebration-message">Every challenge makes you stronger. Keep going!</p>
    </>
  );
}
```

`src/components/celebration/steps/StreakStep.jsx`:

```jsx
import WeekDots from "../../rewards/WeekDots";

function words({ outcome, current }) {
  switch (outcome) {
    case "saved":
      return ["A freeze saved your streak!", `🧊 Your ${current}-day streak is safe. Welcome back!`];
    case "restarted":
      return ["New streak started!", "Every day you play makes it grow."];
    case "started":
      return ["Streak started!", "Come back tomorrow to make it 2 days."];
    default:
      return [`${current}-day streak!`, "You played again today. Brilliant!"];
  }
}

/** The day's first finished challenge: the streak, and this week's dots. */
export default function StreakStep({ step, headingRef, focalRef }) {
  const [title, line] = words(step);
  return (
    <>
      <p className="completion-celebration-eyebrow">Your streak</p>
      <h2 ref={headingRef} tabIndex={-1}>{title}</h2>
      <div className="celebration-streak" ref={focalRef} aria-hidden="true">
        <span className="celebration-streak-flame">🔥</span>
        <span className="celebration-streak-count">{step.current}</span>
      </div>
      <p className="completion-celebration-message">{line}</p>
      {step.dots?.length > 0 && <WeekDots dots={step.dots} />}
    </>
  );
}
```

In `CompletionCelebration.jsx`:
- Import both steps and register them: `levelUp: LevelUpStep, streak: StreakStep`.
- Accept `xp = null, levelUp = null, streak = null`, and pass them into `buildCelebrationSteps` (and its `useMemo` deps).
- Pass `step` to `HeadlineStep` (already done).

In `HeadlineStep.jsx`, after the message paragraph, add:

```jsx
      {step.xp && (
        step.xp.capped ? (
          <p className="celebration-chip">Practice XP done for today — great practice though!</p>
        ) : step.xp.gained > 0 && (
          <div className="celebration-xp">
            <p className="celebration-chip celebration-xp-gain">+{step.xp.gained} XP</p>
            <LevelBar xp={step.xp.total} />
          </div>
        )
      )}
```

with `import LevelBar from "../../rewards/LevelBar";`.

Append to `CompletionCelebration.css`:

```css
.celebration-xp { display: grid; gap: 0.5rem; max-width: 340px; margin: 0.8rem auto 0; }
.celebration-xp-gain { margin: 0 auto; font-size: 1.1rem; animation: completion-medal-in 520ms 200ms cubic-bezier(.2, 1.5, .5, 1) both; }

.celebration-levelup { position: relative; display: grid; place-items: center; margin: 1rem auto 0.4rem; }
.celebration-level-badge {
  position: absolute;
  right: calc(50% - 90px);
  top: 0;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 4px solid var(--celebration-surface);
  border-radius: 50%;
  background: var(--celebration-accent);
  color: var(--celebration-on-accent);
  font-size: 1.5rem;
  font-weight: 800;
  animation: completion-medal-in 580ms 300ms cubic-bezier(.2, 1.5, .5, 1) both;
}

.celebration-streak { display: flex; align-items: center; justify-content: center; gap: 0.3rem; margin: 1rem auto 0.4rem; }
.celebration-streak-flame { font-size: clamp(4rem, 12vw, 5.5rem); line-height: 1; animation: completion-medal-in 580ms cubic-bezier(.2, 1.5, .5, 1) both; }
.celebration-streak-count { font-size: clamp(3rem, 9vw, 4.2rem); font-weight: 800; color: var(--celebration-ink); }

@media (prefers-reduced-motion: reduce) {
  .celebration-xp-gain, .celebration-level-badge, .celebration-streak-flame { animation: celebration-fade 300ms ease both; }
}
```

- [ ] **Step 7: Run the checks**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 8: Browser check.** Using the seed account and a fresh test profile:
  1. The first completion of the day shows headline (+10 XP, level bar) → streak "Streak started!" → next.
  2. A second completion shows one screen with +10 XP and no streak step.
  3. Set `xp` to 95 in that child's `dl.rewards` and reload. The next completion shows a level-up step with Bix cheering and `level-up.mp3` playing (record it with the `AudioBufferSourceNode.prototype.start` instrumentation used for the sound work).
  4. Replay a finished challenge three times. The third shows "Practice XP done for today".
  5. Check at 360px and 1280px, in both themes, and with reduced motion.

- [ ] **Step 9: Commit**

```bash
git add -A src/data/celebrationSteps.js src/data/celebrationSteps.test.js src/components public/sounds/level-up.mp3 docs/sounds/process-sounds.py
git commit -m "feat: XP on the headline, level-up step with Bix, streak step, and their sounds"
```

---

### Task 7: Navbar streak and level, and the home page cards

**Files:**
- Modify: `src/components/ui/Navbar.jsx`, `src/components/ui/Navbar.css`, `src/pages/home/Home.jsx`
- Create: `src/pages/home/HomeAchievements.jsx`, `src/pages/home/HomeAchievements.css`

**Interfaces:**
- Consumes: `useRewards()` (Task 5), `streakStatus`/`weekDots`/`localDay` (Task 3), `levelFor` (Task 4), `hasNews` (Task 4), `LevelBar`/`WeekDots` (Task 6), `useTrophyData` (candidates only), `topicStickers`/`countStickers` (`src/data/stickers.js`), and `BADGES`/`heldBadgeIds` (`src/data/badges.js`).
- Produces: `<HomeAchievements />`, rendered only while a child is active.

- [ ] **Step 1: Navbar.** In `Navbar.jsx`, add:

```jsx
import { useRewards } from '../../hooks/useRewards';
import { streakStatus, localDay } from '../../data/streak';
import { levelFor } from '../../data/xp';
import { hasNews } from '../../data/news';
```

and in the component:

```jsx
  const { rewards, hydrated, xp } = useRewards();
  const streak = hydrated ? streakStatus(rewards.streak, localDay()) : null;
  const level = hydrated ? levelFor(xp).level : null;
  const news = hydrated && hasNews(rewards);
```

In the 🏆 link, after the label span, add
`{news && <span className="navbar-news-dot" aria-hidden="true" />}`, and make the label read
`{news ? 'Trophy Room, new trophies to see' : 'Trophy Room'}`.

Before the avatar chip (only when `status === 'ready' && hydrated`):

```jsx
          <span className="navbar-stats" aria-label={`${streak.current}-day streak, level ${level}`}>
            <span aria-hidden="true">🔥 {streak.current}</span>
            <span aria-hidden="true">Lv {level}</span>
          </span>
```

Inside the avatar chip, after the emoji span:

```jsx
            {child && streak?.current > 0 && (
              <span className="navbar-streak-badge" aria-hidden="true">🔥{streak.current}</span>
            )}
```

Append to `Navbar.css`:

```css
/* Streak, level and news. The dot and the phone badge are absolutely
   positioned, so they add no width to a bar with ~30px spare at 360px. */
.navbar-link { position: relative; }
.navbar-news-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 11px;
  height: 11px;
  border: 2px solid var(--light-bg);
  border-radius: 50%;
  background: var(--light-accent);
}
body.dark .navbar-news-dot { border-color: var(--dark-bg); background: var(--dark-accent); }

.navbar-stats {
  display: inline-flex;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 800;
  white-space: nowrap;
}
.navbar-stats > span {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: var(--map-chip);
  color: var(--map-text);
}

.navbar-avatar-chip { position: relative; }
.navbar-streak-badge {
  display: none;
  position: absolute;
  bottom: -6px;
  right: -6px;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--light-accent);
  color: var(--on-light-accent);
  font-size: 0.7rem;
  font-weight: 800;
  line-height: 1.5;
}
body.dark .navbar-streak-badge { background: var(--dark-accent); color: var(--on-dark-accent); }

@media (max-width: 480px) {
  .navbar-stats { display: none; }
  .navbar-streak-badge { display: inline-block; }
}
```

- [ ] **Step 2: Home cards.** Create `src/pages/home/HomeAchievements.jsx`:

```jsx
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useRewards } from "../../hooks/useRewards";
import { useTrophyData } from "../../hooks/useTrophyData";
import { localDay, streakStatus, weekDots } from "../../data/streak";
import { hasNews } from "../../data/news";
import { BADGES, heldBadgeIds } from "../../data/badges";
import { countStickers, topicStickers } from "../../data/stickers";
import LevelBar from "../../components/rewards/LevelBar";
import WeekDots from "../../components/rewards/WeekDots";
import "./HomeAchievements.css";

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

/** The home page's three achievement cards, for the child who is playing. */
export default function HomeAchievements() {
  const { child } = useContext(AuthContext);
  const { rewards, hydrated, xp } = useRewards();
  const { candidates } = useTrophyData(child?._id); // progress, for sticker totals
  if (!child || !hydrated) return null;

  const today = localDay();
  const streak = streakStatus(rewards.streak, today);
  const stickers = candidates.reduce(
    (sum, c) => {
      const n = countStickers(topicStickers(c.curriculum, c.progress, c.isBuilt));
      return { earned: sum.earned + n.earned, total: sum.total + n.total };
    },
    { earned: 0, total: 0 }
  );
  const latest = rewards.recentStickers.at(-1);
  const latestSticker = latest && (() => {
    const [year, subject, topicId] = latest.split("/");
    const c = candidates.find((x) => String(x.year) === year && x.subject === subject);
    return c && topicStickers(c.curriculum, c.progress, c.isBuilt)
      .flatMap((g) => g.stickers)
      .find((s) => s.topicId === topicId);
  })();
  const newBadges = rewards.news.badges.length;
  const newStickers = rewards.news.stickers.length;

  return (
    <section className="home-section home-achievements" aria-labelledby="home-achievements-title">
      <h2 className="home-section-title" id="home-achievements-title">Your adventure</h2>

      {hasNews(rewards) && (
        <Link className="home-ach-card home-ach-news" to="/trophies">
          <span className="home-ach-news-icon" aria-hidden="true">🎁</span>
          <span>
            <strong>Something new!</strong>{" "}
            You earned {[newBadges && plural(newBadges, "new badge", "new badges"), newStickers && plural(newStickers, "sticker", "stickers")].filter(Boolean).join(" and ")}.
          </span>
          <span className="home-ach-go">Open your trophies <span aria-hidden="true">→</span></span>
        </Link>
      )}

      <div className="home-ach-grid">
        <div className="home-ach-card">
          <p className="home-ach-eyebrow">Streak</p>
          <p className="home-ach-big">
            <span aria-hidden="true">🔥 </span>
            {streak.current > 0 ? plural(streak.current, "day", "days") : "Start a streak today!"}
          </p>
          {streak.atRisk && <p className="home-ach-note">Play today to keep it going!</p>}
          {rewards.streak.freezes > 0 && (
            <p className="home-ach-note">🧊 {plural(rewards.streak.freezes, "freeze", "freezes")} saved up</p>
          )}
          <WeekDots dots={weekDots(rewards.streak, today)} />
          <LevelBar xp={xp} className="home-ach-level" />
        </div>

        <Link className="home-ach-card home-ach-collection" to="/trophies">
          <p className="home-ach-eyebrow">Collection</p>
          <p className="home-ach-big">
            {heldBadgeIds(rewards).size} of {BADGES.length} badges
          </p>
          <p className="home-ach-note">{stickers.earned} of {stickers.total} stickers</p>
          {latestSticker && (
            <p className="home-ach-latest">
              <span className="home-ach-sticker" aria-hidden="true">{latestSticker.icon}</span>
              Latest: {latestSticker.name}
            </p>
          )}
        </Link>
      </div>
    </section>
  );
}
```

Create `src/pages/home/HomeAchievements.css` (tokens from `.home-page`, which wraps this section):

```css
.home-achievements { padding: 0 16px; }
.home-ach-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.home-ach-card {
  display: grid;
  align-content: start;
  gap: 0.35rem;
  padding: 1.1rem 1.2rem;
  border: 2px solid var(--home-card-edge);
  border-radius: 22px;
  background: var(--home-card);
  color: var(--home-ink);
  text-decoration: none;
  box-shadow: 0 6px 18px var(--panel-shadow);
}
a.home-ach-card:focus-visible { outline: 3px solid var(--home-focus); outline-offset: 3px; }
.home-ach-news {
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  border-color: var(--home-accent);
}
.home-ach-news-icon { font-size: 2.2rem; animation: home-ach-wiggle 1.6s ease-in-out infinite; }
.home-ach-go { font-weight: 800; white-space: nowrap; }
.home-ach-eyebrow { margin: 0; color: var(--home-muted); font-weight: 700; letter-spacing: 0.04em; }
.home-ach-big { margin: 0; font-size: 1.5rem; font-weight: 800; }
.home-ach-note { margin: 0; color: var(--home-muted); }
.home-ach-level { margin-top: 0.6rem; }
.home-ach-latest { display: flex; align-items: center; gap: 0.5rem; margin: 0.4rem 0 0; font-weight: 700; }
.home-ach-sticker { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--home-card-edge); font-size: 1.5rem; }
@keyframes home-ach-wiggle { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-10deg) scale(1.08); } }
@media (max-width: 560px) {
  .home-ach-news { grid-template-columns: auto 1fr; }
  .home-ach-go { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) { .home-ach-news-icon { animation: none; } }
```

In `Home.jsx`, import `HomeAchievements` and render `<HomeAchievements />` between the hero `</section>` and the "SUBJECT LAUNCHPAD" section.

- [ ] **Step 3: Run the checks**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 4: Browser check.**
  - At 360px the navbar doesn't overflow: `nav.scrollWidth <= nav.clientWidth`. The streak badge sits on the avatar chip, and there are no level chips.
  - At 1280px the `🔥 n` and `Lv n` chips show.
  - Earn a sticker: the 🏆 dot and the "Something new!" card appear.
  - The streak card shows the dots and the level bar.
  - Check both themes.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Navbar.jsx src/components/ui/Navbar.css src/pages/home/HomeAchievements.jsx src/pages/home/HomeAchievements.css src/pages/home/Home.jsx
git commit -m "feat: streak and level in the navbar, news dot, home achievement cards"
```

---

### Task 8: Trophy Room ribbons and stats; read-only grown-up views

**Files:**
- Modify: `src/pages/trophies/TrophyRoom.jsx`, `src/pages/trophies/TrophyRoom.css`, `src/hooks/useTrophyData.js`, `src/hooks/useChildrenRewards.js`, `src/pages/auth/ParentArea.jsx`, `src/pages/auth/ParentArea.css`

**Interfaces:**
- Consumes: `useRewards()` (Task 5), `normaliseRewards` (Task 2), `stickerKey` (Task 4), `streakStatus`/`localDay` (Task 3), and `LevelBar` (Task 6).
- Produces: nothing new for later tasks.

- [ ] **Step 1: Normalise the read-only hooks.** In `useTrophyData.js` and `useChildrenRewards.js`, wrap every rewards document in `normaliseRewards(doc?.data)` in place of the `{ ...emptyRewards(), ...data }` merge, so v1 documents display v2 defaults.

- [ ] **Step 2: The child's own room reads the provider; ribbons from a snapshot.** In `TrophyCabinet`:

```jsx
  const own = useRewards();
  const stored = useTrophyData(viewed?._id); // grown-up: rewards + progress; child: progress only
  const rewards = grownUp ? stored.rewards : own.rewards;
  const loading = grownUp ? stored.loading : stored.loading || !own.hydrated;
  const { candidates } = stored;

  // What was new when this visit began: the ribbons show it for the whole
  // visit, while the stored news is cleared once, after the rewards load.
  const [fresh, setFresh] = useState(null);
  useEffect(() => {
    if (grownUp || !own.hydrated || fresh) return;
    setFresh({ badges: new Set(own.rewards.news.badges), stickers: new Set(own.rewards.news.stickers) });
    own.clearNews();
  }, [grownUp, own.hydrated, own.rewards, own.clearNews, fresh]);
```

Pass `fresh` to `BadgeShelf` and `StickerBook`. Show a ribbon when `fresh?.badges.has(badge.id)` or `fresh?.stickers.has(stickerKey(year, subject, sticker.topicId))`:

```jsx
{isNew && <span className="trophy-new">NEW</span>}
```

Add a stats row under the summary chips:

```jsx
          <div className="trophy-stats">
            <LevelBar xp={grownUp ? displayXp(rewards, null) : own.xp} />
            <p>
              <span aria-hidden="true">🔥 </span>
              {streakStatus(rewards.streak, localDay()).current}-day streak · best {rewards.streak.best}
            </p>
          </div>
```

(`displayXp` from `../../data/xp`. A grown-up sees stored XP only; the back-fill appears after the child's next completion.)

Append to `TrophyRoom.css`:

```css
.trophy-badge, .trophy-sticker { position: relative; }
.trophy-new {
  position: absolute;
  top: -8px;
  right: -6px;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: var(--tr-accent);
  color: var(--tr-on-accent);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  animation: trophy-new-pop 700ms cubic-bezier(.2, 1.6, .5, 1) both;
}
@keyframes trophy-new-pop { from { transform: scale(0.3); opacity: 0; } to { transform: none; opacity: 1; } }
.trophy-stats { display: grid; gap: 0.4rem; max-width: 420px; margin: 1rem auto 0; text-align: center; }
.trophy-stats p { margin: 0; font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .trophy-new { animation: none; } }
```

- [ ] **Step 3: Parent area.** In `ChildRewards`, under the badges row, add:

```jsx
      <p className="parent-area-stats">
        Level {levelFor(r.xp).level} · {r.xp} XP · 🔥 {streakStatus(r.streak, localDay()).current}-day
        streak (best {r.streak.best})
      </p>
```

where `const r = normaliseRewards(rewards);`. Add:

```css
.parent-area-page .parent-area-stats { font-size: 0.95rem; color: var(--pa-muted); margin: 0.2rem 0 0.6rem; }
```

- [ ] **Step 4: Run the checks**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Manual checks (Review Focus 3).**
  - Throttle the network in API mode, or delay `store.getRewards` with the Task 1 monkeypatch pattern returning a 2s-delayed promise, then open `/trophies`. The ribbons appear once loaded, and `news` in storage is emptied only after that.
  - Reload `/trophies`: no ribbons, and no dot in the navbar.
  - Open `/parent/trophies/<siblingId>`: it shows that child's stats, and neither child's `news` or rewards document changes.

- [ ] **Step 6: Commit**

```bash
git add src/pages/trophies src/hooks/useTrophyData.js src/hooks/useChildrenRewards.js src/pages/auth/ParentArea.jsx src/pages/auth/ParentArea.css
git commit -m "feat: NEW ribbons, streak and level in the Trophy Room and parent area"
```

---

### Task 9: A v2 seed

**Files:**
- Modify: `scripts/seedData.js`, `scripts/seed.js`
- Test: `scripts/seedData.test.js`

**Interfaces:**
- Consumes: `normaliseRewards`, `addDays` (Tasks 2 and 3), and `XP.backfill` (Task 4).
- Produces: `buildRewards(...)` now returns v2 with `xp = completions × 10` and `xpBackfilled: true`; `withSeedStreak(rewards, days, today) → rewards`.

- [ ] **Step 1: Write the failing tests** (append to `scripts/seedData.test.js`, and add `withSeedStreak` to its import)

```js
test("seeded rewards are v2 with XP matching the completions", () => {
  const rewards = buildRewards([{ curriculum: year2MathCurriculum, isBuilt: () => true, count: 7, year: 2, subject: "math" }]);
  assert.equal(rewards.schemaVersion, 2);
  assert.equal(rewards.xp, 70);
  assert.equal(rewards.xpBackfilled, true);
});

test("withSeedStreak builds a streak of N days ending yesterday", () => {
  const out = withSeedStreak(buildRewards([]), 4, "2026-09-30");
  assert.equal(out.streak.current, 4);
  assert.equal(out.streak.lastDay, "2026-09-29");
  assert.deepEqual(out.streak.recent, ["2026-09-26", "2026-09-27", "2026-09-28", "2026-09-29"]);
  assert.equal(withSeedStreak(buildRewards([]), 0, "2026-09-30").streak.current, 0);
});
```

(If `year2MathCurriculum` isn't already imported in that test file, add `import { year2MathCurriculum } from "../src/data/year2MathCurriculum.js";`.)

- [ ] **Step 2: Run and confirm they fail**

Run: `node --test scripts/seedData.test.js`
Expected: FAIL. `xp` is undefined, and `withSeedStreak` isn't exported.

- [ ] **Step 3: Implement.** In `scripts/seedData.js`, import `normaliseRewards`, `addDays` and `XP`. At the end of `buildRewards`, replace `return rewards;`. (Replace that return with the exact version below.) Declare `let completedTotal = 0;` beside `let rewards = startRewards;`, increment it on the line after `done += 1;` (`completedTotal += 1;`), and end the function with:

```js
  // Seeded children earned their XP the way a real child would: 10 per first
  // completion. Marked back-filled so the app never adds it again.
  return { ...normaliseRewards(rewards), xp: completedTotal * XP.backfill, xpBackfilled: true };
```

Add:

```js
/** A demo streak of `days` played days in a row, ending yesterday. */
export function withSeedStreak(rewards, days, today) {
  if (!days) return rewards;
  const recent = Array.from({ length: days }, (_, i) => addDays(today, i - days)).slice(-14);
  return {
    ...rewards,
    streak: { ...rewards.streak, current: days, best: days, lastDay: addDays(today, -1), freezes: Math.min(2, Math.floor(days / 5)), recent, frozen: [] },
  };
}
```

In `SEED_CHILDREN`, add `streakDays: 4` to Demi and `streakDays: 0` to Liam. In `scripts/seed.js`, change `const rewards = buildRewards(years);` to:

```js
    const rewards = withSeedStreak(buildRewards(years), child.streakDays ?? 0, localDay());
```

importing `withSeedStreak` from `./seedData.js` and `localDay` from `../src/data/streak.js`.

- [ ] **Step 4: Run the tests**

Run: `npm test && npm run seed -- --dry`
Expected: all pass, and the dry run prints both children without writing.

- [ ] **Step 5: Commit**

```bash
git add scripts/seedData.js scripts/seed.js scripts/seedData.test.js
git commit -m "chore: seed v2 rewards with XP and a demo streak"
```

---

### Task 10: Docs, the challenge skill, and the final verification

**Files:**
- Modify: `docs/PROJECT_KNOWLEDGE.md`, `docs/sounds/README.md`, `.claude/skills/add-curriculum-challenge/SKILL.md`, `docs/PROJECT_IDEAS.md`, and the spec's status line.

- [ ] **Step 1: `docs/PROJECT_KNOWLEDGE.md`** (the user asked for this explicitly):
  - §3 folder tree: `context/RewardsContext.jsx` + `rewards-context.js`; `data/rewardsShape.js`, `streak.js`, `xp.js`, `news.js`, `awardRun.js`; `components/rewards/`; `pages/home/HomeAchievements.jsx`.
  - §4.5 "Celebrations": the XP chip, level-up (Bix) and streak steps, and the full step order.
  - §5 "Badges": rename it to "Badges, XP & streaks" and document:
    - the v2 shape table, and that migration happens on read
    - the Phase 0 rule: a failed read is never followed by a write
    - `RewardsProvider` as the single writer, with its two write moments
    - the XP/level/freeze numbers
    - the news list
    - the whole-document "last save wins" limit for one child on two devices
  - Remove the "streaks did not, deliberately" framing wherever it appears, and note which spec superseded it.
  - Known issues (§6): note that in localStorage mode a corrupt collection reads as empty and the next save replaces it. That's existing behaviour for every collection, not changed here.

- [ ] **Step 2: `docs/sounds/README.md`** (the user asked for this explicitly). Add rows to the scenario table:

```
| 15 | Level-up step (with Bix) | `levelUp` | `level-up.mp3` | 2984 | Funny melody audio logo |
| 16 | Streak step (the day's first finished challenge) | `streak` | `badge.mp3` | 2317 | Uplifting flute notification *(shares #9, by choice)* |
```

Add `level-up` to the Rewards tier in the loudness table. Update "13 sound files" to **14**, and the download id list in "Changing a sound". Add a note that #2317 now plays for both badges and streaks, so a day with both hears it twice, and swapping `streak`'s `src` is a one-line change.

- [ ] **Step 3: The `add-curriculum-challenge` skill.** Where it describes the `onComplete` contract, add: "`ChallengeShell` calls `onComplete({ combos })`. Pass `onComplete` straight through — never wrap it as `() => onComplete()`, which would drop the combo count and its XP."

- [ ] **Step 4: `docs/PROJECT_IDEAS.md` and the spec.** Mark streaks/XP as shipped in PROJECT_IDEAS. Set the spec's status to "implemented 2026-MM-DD".

- [ ] **Step 5: The final verification.**
  - Run `npm run lint && npm test && npm run build`.
  - With a pre-existing **v1** document (restore `dev-seed.json`'s rewards with `schemaVersion: 1` and no `xp`), confirm:
    - the navbar shows the back-filled level at once
    - after one completion, the stored document is v2 with `badges` and `counts` byte-identical to before plus that run's award
    - `xpBackfilled` is true
  - Check 360px and 1280px, both themes, reduced motion, and the console has no errors.

- [ ] **Step 6: Commit**

```bash
git add docs .claude/skills/add-curriculum-challenge/SKILL.md
git commit -m "docs: streaks, XP, levels and what's new"
```
