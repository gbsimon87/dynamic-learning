# Speed Reader — Design

**Date:** 2026-09-10
**Mode:** Skills Mode → English & Words
**Route:** `/speed-reader`
**Status:** Approved design, not yet implemented

---

## 1. What This Is

A spritz-style ("rapid serial visual presentation") reading game. A story is
displayed one word at a time in a fixed screen position at a chosen speed, so the
reader's eyes never move. This trains reading fluency by removing saccades —
re-reading the same story faster is the core exercise.

**Audience: UK Year 2 learners, 6–8 years old.** Every design decision below
follows from that. A preset story library is the primary path; free text entry
exists for a parent or teacher and is deliberately secondary.

### Non-goals

- No progress persistence. Skills Mode is deliberately untracked
  (`PROJECT_KNOWLEDGE.md` §1) and this game adds no `localStorage` writes.
- No shared modal primitive. The overlay is local to this game (see §4).
- No test framework. The project has none; verification is manual (§9).

---

## 2. Screen Flow

```
Setup ──Start Reading──▶ [ Overlay: countdown → reading ] ──last word──▶ Questions ──▶ Finish
  ▲                                    │                                                │
  └────────── Pick another story ──────┴──── Esc / ✕ ─────────────────────────────────┘
                                                        Read again, faster ─────────────┘
```

The overlay closes when the last word passes, revealing the Questions screen
already rendered behind it — the setup form never flashes back into view.

**Departure from the original idea:** the first sketch had a Start CTA that then
revealed a second CTA to open the modal. That is a redundant tap. One
`Start Reading` button opens the overlay directly, and the 3-2-1 countdown inside
it does the job the second tap was reaching for.

---

## 3. Screens

### 3.1 Setup

```
⚡ Speed Reader
Words flash one at a time. Keep your eyes still and read!

Pick a story
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🐉 The   │ │ 🌊 Rock  │ │ 🚀 Moon  │
│  Lost Egg│ │  Pool    │ │  Picnic  │
│ 🟢 42 wds│ │ 🟡 71 wds│ │ 🔴 118wds│
└──────────┘ └──────────┘ └──────────┘   (6 total)

▸ Paste your own story          ← collapsed <details>

How fast?
[🐢 Slow] [🚶 Steady] [🐇 Fast] [🚀 Super]
   60         100        150       200
Fine-tune: ──────●────────  120 words a minute

Words at a time:  [1] [2] [3]
☑ Highlight the middle letter

        [ Start Reading ➡️ ]
```

- **Story tiles** are a radio group. Each shows emoji, title, derived word count
  and a difficulty band (🟢 easy / 🟡 medium / 🔴 longer).
- **Speed** is four named animal presets as the primary control, because a raw
  WPM number is meaningless to a six-year-old. The number appears small beneath
  each. A fine-tune slider (60–300) sits below for a parent who wants 135;
  tapping a preset moves the slider, so there is one source of truth.
- **Words at a time** (chunk size) is 1 / 2 / 3, default 1. A progression lever
  for a reader who has outgrown single words.
- **Highlight the middle letter** toggles the pivot letter, default on. It is the
  mechanism that makes the technique work, but it is a toggle because a
  differently-coloured letter mid-word can distract a beginning decoder.
- **Start** is disabled with an inline hint when the custom textarea is open and
  empty. No `alert`.

### 3.2 Reading overlay

Near-fullscreen, dimmed backdrop. Opens on `3 · 2 · 1 · Go!`.

The word sits on a fixed centre line with the pivot letter in the accent colour
and thin crosshair ticks above and below the pivot column, so the eye has a
target and never hunts. Type scales `clamp(2.5rem, 12vw, 5rem)`.

Below the word: a progress bar with `12 / 48 words`, then large-target controls
`⏮ ⏸/▶ ⏭`, plus `🐢 / 🚀` nudges that change speed **mid-read without
restarting** — the fastest way to find the right speed in one sitting.

Keyboard: `Space` pause/resume, `←` `→` step, `Esc` exit. Auto-pauses on tab
blur, so a child who looks away does not lose the story.

### 3.3 Questions

Three multiple-choice questions, presented one at a time, with the app's standard
✅ correct / ❌ retry feedback. Pasted custom text has no authored questions and
skips straight to Finish.

### 3.4 Finish

```
🎉 Great reading!
48 words · 24 seconds · 120 words a minute
Questions: 2 / 3 ✅

[ ⚡ Read it again, faster → 150 wpm ]
[ 📖 Pick another story ]
```

`Read it again, faster` bumps the speed and replays the same story. Same text,
less time, is how fluency is actually trained.

The bump is defined precisely, because the fine-tune slider means the current
speed is often not on a preset:

- Target the **lowest preset strictly greater than the current wpm** (60, 100,
  150, 200). From 120 that is 150; from 100 it is 150.
- At or above the top preset (200), add 25, capped at the 300 slider maximum.
- At 300 the button reads `Read it again` and keeps the speed.

"Current wpm" means the setting **in effect when the story ended**, which
includes any mid-read 🐢/🚀 nudges. The reported WPM on the same screen is
measured separately from words ÷ `elapsedMs`, so the two numbers can legitimately
differ — one is the setting, the other is what actually happened.

---

## 4. Architecture

Approach C of three considered: extract the timing engine, keep the overlay local.

```
src/data/stories.json                        content + comprehension questions
src/hooks/useSpritzReader.js                 timing engine (the only tricky part)
src/pages/skills/english/SpeedReader.jsx     screen orchestration
src/pages/skills/english/SpeedReader.css
src/pages/skills/english/ReaderOverlay.jsx   dumb overlay: children + onClose
```

`SpeedReader.jsx` owns one `screen` state (`setup | reading | questions | finish`)
plus the chosen story, settings and quiz results. It holds **no reading timer** —
that belongs to the hook.

The 3-2-1 countdown is a second, separate timer. It lives in the reading view
inside the overlay, owns its own `setTimeout` chain and its own cleanup, and calls
the hook's `play()` when it reaches zero. Keeping it out of `useSpritzReader`
leaves that hook with exactly one timer and one teardown path, which is its whole
reason for existing.

`ReaderOverlay.jsx` takes only `children` and `onClose` and knows nothing about
reading. Promoting it to `src/components/ui/Modal.jsx` when a second game needs a
modal is then a file move, not a rewrite.

**Why the overlay is not a shared primitive yet.** Six planned games in
`PROJECT_IDEAS.md` would plausibly want a modal, and an accessible one is fiddly
enough to be tempting to generalise. But designing a general API against a single
real consumer usually produces the wrong API. Extract on the second use.

**Why the engine is a hook and not inline.** `SightWordPop.jsx` is the house
precedent for one large self-contained file, and its elaborate timer-cleanup
machinery is scar tissue from real bugs. Isolating the scheduler gives one
teardown path instead of several, and makes the delay and pivot functions pure
and directly testable.

---

## 5. The Timing Engine

```js
useSpritzReader({ text, wpm, chunkSize })
  → { index, current, total, isPlaying, isFinished, elapsedMs,
      play, pause, toggle, next, prev, restart }
```

### Tokenizing

Memoised on `(text, chunkSize)`. Split on whitespace, group into chunks of
`chunkSize`, and record per chunk: display text, character count, whether it ends
a clause (`,` `;` `:`) and whether it ends a sentence (`.` `!` `?`).

### Per-chunk delay

All four constants are named at the top of the file so they are tunable.

```
base   = 60000 / wpm
delay  = base * chunkSize
delay *= min(1.6, 1 + max(0, longestWordChars - 6) * 0.04)   // long words get more time
delay += base * 0.5                                           // if chunk ends a clause
delay += base * 1.0                                           // if chunk ends a sentence
```

`longestWordChars` is the length of the **longest single word in the chunk**, not
the chunk's total character count. Summing characters would double-count at
`chunkSize` 2 or 3 and inflate every multi-word delay; recognition is gated by the
hardest word, so that is the one that sets the stretch. The factor is explicitly
clamped at 1.6× (reached at 21 characters).

### Pivot index

Standard spritz table by word length: 1 → 0, 2–5 → 1, 6–9 → 2, 10–13 → 3,
14+ → 4.

### Scheduler

A recursive `setTimeout`, **not** `setInterval` — per-chunk delays vary, so each
tick must schedule the next using that chunk's own computed delay. One
`timerRef`, and exactly one `clearTimer` helper that `pause`, `next`, `prev`,
`restart` and unmount all call. `visibilitychange` auto-pause lives here, because
the hook owns the timer.

`elapsedMs` accumulates real reading time only, summing on each pause, so the
Finish screen's WPM reflects actual reading rather than wall clock. It starts at
the first word, **not** at the countdown — three seconds of "3 · 2 · 1" would
otherwise drag a 40-word story's reported speed down by a third.

**Resume re-shows the current word for its full duration** rather than the
leftover milliseconds. Simpler to reason about, and better for a child who just
looked up.

---

## 6. Data Shape

`src/data/stories.json` — six original stories: two easy (~40 words), two medium
(~70), two longer (~120).

```json
[
  {
    "id": "lost-egg",
    "title": "The Lost Egg",
    "emoji": "🐉",
    "band": "easy",
    "text": "Mia found a big blue egg under the old oak tree. …",
    "questions": [
      {
        "q": "What did Mia find?",
        "options": ["An egg", "A rock", "A shoe"],
        "answer": 0
      }
    ]
  }
]
```

`answer` is an index into `options`. Word counts are derived at render, never
stored, so they cannot drift from the text.

---

## 7. Edge Cases

| Case | Behaviour |
|---|---|
| Empty / whitespace-only textarea | Start disabled, inline hint. No `alert`. |
| Very long pasted text | Capped at 500 words with a visible notice. |
| Text with no spaces | Works — one token. |
| `chunkSize` > words remaining | Final chunk is short. Fine. |
| Unmount mid-read (browser back) | Hook teardown clears the timer. |
| Pasted text at Finish | Questions screen skipped entirely. |
| `prefers-reduced-motion` | Countdown and progress transitions become instant. The word flashing stays — it is the content, not decoration. |
| Max speed | Slider capped at 300 wpm (5 words/sec). Text substitution is not a luminance flash so WCAG 2.3.1 does not apply, but there is no reason to go higher. |

---

## 8. Styling and Theming

Plain CSS, co-located, colours from the existing tokens in `App.css`. Must render
correctly in both light and dark themes, with large touch targets and legible
type for a 6–8-year-old.

**One specific contrast risk.** `App.css` already documents that white on
`--light-accent` measures 3.17:1 and fails WCAG AA, which is why
`--on-light-accent` exists. The pivot letter is accent-coloured text on the panel
background — the inverse pairing — so it needs its own measurement rather than an
assumption that the token is safe. If it fails, darken the pivot for light theme
via a dedicated token rather than reusing the accent directly.

The overlay backdrop gets its own token pair (`--reader-backdrop`) defined in the
game's CSS with a `body.dark` override, following the `--map-*` precedent.

---

## 9. Verification

No test framework exists (`PROJECT_KNOWLEDGE.md` §2; Vitest is `PROJECT_IDEAS.md`
idea #2, unstarted). Verification is manual, per the `add-skill-game` checklist:

1. `npm run lint` passes.
2. The game loads at `/speed-reader`.
3. The link appears on `/skills` in the English & Words card and navigates.
4. Core loop: pick story → countdown → words advance → questions → finish.
5. Controls: pause, resume, step back, step forward, mid-read speed change.
6. `Esc` and `✕` both exit and return to setup.
7. Custom text path: paste, read, skip questions, reach finish.
8. `Read it again, faster` replays the same story one band up.
9. Both light and dark themes render correctly.
10. Tab away mid-read → auto-paused on return.
11. Navigate away mid-read → no console errors, no stray timer.

The delay and pivot functions are pure and would make the project's ideal first
unit tests. Deliberately **not** bundled into this work — adding a test framework
is its own decision.

---

## 10. Registration

The `add-skill-game` skill's central warning is that a new game needs two
registrations and missing the second makes it invisible to learners. Both, in the
same change:

1. `src/main.jsx` — import under `// === SKILLS: English ===`, route
   `{ path: "speed-reader", element: <SpeedReader /> }` under
   `// === English Skills ===`.
2. `src/pages/skills/SkillsPage.jsx` — `<Link to="/speed-reader"
   className="skill-btn">Speed Reader</Link>` in the English & Words card.

The English card summary already ends "and more!", so it needs no edit.

**Docs to update as part of done:** `PROJECT_KNOWLEDGE.md` §5 English list, and a
new row in `PROJECT_IDEAS.md`.
