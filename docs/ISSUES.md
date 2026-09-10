# 🐞 Open Issues — Full Application Audit

**Audit date:** 2026-08-21
**Scope:** whole application **except** `/solar-system` (excluded by request).
**Method:** static reading of every in-scope source file, plus live verification in a
real browser (Playwright) and standalone Node reproductions. Contrast ratios are
measured from computed styles, not estimated.

Legend — **Status:** 🔴 open · 🟡 in progress · ✅ done & verified · ⏸️ blocked (needs a decision)
**Verified:** ✔︎ reproduced live/by script · ○ code-read only (mechanism confirmed, not yet triggered)

---

## ⚡ At a glance — implementation status

> **Keep this table current.** Update the Status and Notes cell in the same change that
> touches the code. This is the hand-off record: if work stops, this table alone should tell
> the next person what is done, what is safe to pick up, and what is waiting on a decision.

**Progress:** 42 of 44 done · 1 blocked on a decision · 1 partial

### Requested features & fixes

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [R1](#r1--word-sorter-restart-with-a-new-set-of-words-) | Word Sorter: restart with new words | English | ✅ done | Balanced 2/2/2 deal + "New words" button; **auto-advance timer was never firing** — fixed |
| [R2](#r2--arithmetic-raising-min-must-not-drag-max-down-) | Min slider must not drag Max | Math | ✅ done | Clamp in state, not via DOM `min`; both sliders share one track |
| [R3](#r3--arithmetic-multiple-operations-and-mixed-operations-per-problem-) | Multi + mixed operations | Math | ✅ done | Multi-select + mixing with explicit brackets; complexity capped for Year 2 |
| [R4](#r4--sentence-builder-select-minmax-word-count-) | Sentence Builder word-count range | English | ✅ done | Bank 10 → 38 sentences (3–11 words, no gaps); min/max sliders + live pool count |
| [R5](#r5--city-spotlight-uniform-image-size-mobile-friendly-) | City images uniform + mobile | Geography | ✅ done | Fixed 4:3 box at all breakpoints; CSS also scoped (removes it from [I26](#i26)) |
| [R6](#r6--flag-finder-filter-by-continent-or-whole-planet-) | Flag Finder continent filter | Geography | ✅ done | Picker with live counts; done together with [I5](#i5) |
| [R7](#r7--counting-challenge-visual-polish-fewer-words-visible-input-text-) | Counting challenge visuals | Curriculum | ✅ done | All 4 challenges: contrast now 11.18–17.28 both themes; wording cut |

### Critical bugs

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [I1](#i1) | Freeze in Find the Missing Number | Math | ✅ done | Candidate pool enumerated up front; verified 144k sets |
| [I2](#i2) | Progress gap locks whole curriculum | Curriculum | ✅ done | Unlock is now gap-tolerant (identity, not count); recovery possible |
| [I3](#i3) | 140/148 challenges are dead links | Curriculum | ✅ done | Marked 🚧 and no longer block progression; 8/8 categories reachable |
| [I4](#i4) | Wrong answers count as "found" | Geography | ✅ done | Only correct answers reveal; StrictMode double-timer also fixed |
| [I5](#i5) | Only 25 of 254 countries loaded | Geography | ✅ done | Now pages via `offset`; **250 playable** countries loaded |
| [I6](#i6) | Unclamped grid → 251k cells | Math | ✅ done | Clamped to 1–20; `500`/`9999`/empty all safe |

### Wrong content shown to a child

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [I7](#i7--opposite-match-duplicate-old-creates-an-unfinishable-round-) | Duplicate `old` → unfinishable round | English | ✅ done | Rounds never draw two pairs sharing a word; 200k verified |
| [I8](#i8--synonym-safari-hotwarm-is-wrong-and-contradicts-opposite-match-) | `hot`/`warm` not synonyms | English | ✅ done | Now `hot`/`boiling` |
| [I9](#i9--world-map-asks-seven-seas-open-ocean-as-a-continent-) | "Seven seas" asked as a continent | Geography | ✅ done | Excluded from targets and dropdown |
| [I10](#i10--counting-challenge-4-asks-a-year-2-child-for--1-) | Sequence reaches `-1` | Curriculum | ✅ done | `start:15`→`19`; sequence ends at 3 |
| [I11](#i11) | Reading Numbers ignores range | Math | ✅ done | Bounds clamp each other; never out of range or < 1 |
| [I12](#i12--dual-label-clock-shows-12--0-instead-of-12--24-) | Clock shows `12 / 0` | Math | ✅ done | Now `12 / 24` |
| [I13](#i13--number-bonds-silently-fewer-pairs-than-advertised-) | Fewer pairs than advertised | Math | ✅ done | Honest pair count + warning; input controlled & clamped |
| [I14](#i14--fraction-fun-accepts-any-n-segments-ignoring-which-) | Any N segments accepted | Math | ⏸️ needs decision | Bar model vs set model — pedagogy call |

### Theming & invisible text

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [I15](#i15--all-appdark-rules-are-dead-404-buttons-are-invisible-) | All `.App.dark` rules dead | Global | ✅ done | `body.dark` across 4 files; 404 buttons 1.00 → 14.52 |
| [I16](#i16--root-forces-white-on-dark-globally-and-causes-a-theme-flash-) | `:root` fights the theme | Global | ✅ done | Unconditional colours removed; `<html>` follows the theme |
| [I17](#i17--shapequiz-hardcodes-light-only-colours-) | ShapeQuiz light-only | Geometry | ✅ done | CSS-variable tokens; 14.52 both themes |
| [I18](#i18--world-map-headerhud-are-light-only-) | World Map header/HUD light-only | Geography | ✅ done | Map tokens; worst case 3.01 → 8.25 |
| [I19](#i19--readingnumberspanel-output-box-has-no-light-mode-background-) | Output box has no light bg | Math | ✅ done | Panel background + accent border |

### Mobile & accessibility

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [I20](#i20--world-map-overflows-the-viewport-on-a-phone-) | World Map overflows phone | Geography | ✅ done | Navbar height measured at runtime; 0 excess scroll at 4 sizes |
| [I21](#i21--light-theme-buttons-fail-wcag-aa-contrast-) | Light buttons fail AA | Global | ✅ done | `--on-*-accent` token; all states ≥ 4.5 both themes |
| [I22](#i22--sight-word-pop-fixed-440px-field-wrong-clamp-reference-) | Fixed 440px bubble field | English | ✅ done | Field + animation share `--field-h`; no scroll on iPhone SE |
| [I23](#i23--map-game-is-keyboard-inaccessible-colour-is-the-only-signal-) | Map keyboard-inaccessible | Geography | ✅ done | All 177 paths focusable + named; Enter verified |
| [I24](#i24--navbar-unlabelled-toggle-and-no-way-to-reach-the-hubs-) | Navbar a11y + no hub links | Global | ✅ done | Skills + Curriculum links, `aria-label`, 44px targets |
| [I25](#i25--clock-is-a-fixed-250px-with-065rem-labels-) | Clock fixed 250px, tiny labels | Math | ✅ done | `clamp()` size measured via ResizeObserver; labels scale |

### Structural / latent

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [I26](#i26) | Global CSS collisions | Global | 🟡 partial | CitySpotlight scoped + CFB1 self-contained; 4 files + challenge CSS remain |
| [I27](#i27--sight-word-pop-spawn-cadence-is-unstable-) | Spawn cadence unstable | English | ✅ done | 22 spawns/20s vs 22 expected; 0 lane collisions |
| [I28](#i28--untracked-settimeout-across-several-games-) | Untracked `setTimeout` ×4 | Several | ✅ done | All four tracked in refs and cleared on unmount |
| [I29](#i29--oncomplete-can-fire-twice-on-double-click-) | `onComplete` fires twice | Curriculum | ✅ done | `locked` guard + idempotent `handleComplete` |
| [I30](#i30--istopiccomplete-is-a-length-check-not-a-membership-check-) | Length ≠ membership check | Curriculum | ✅ done | Fixed with [I2](#i2); `[9,9,9,9]` no longer completes a topic |
| [I31](#i31--latent-freeze-generatesequence-is-one-data-row-from-hanging-) | Latent freeze ×2 | Curriculum | ✅ done | Shuffle-and-slice; cannot loop regardless of data |
| [I32](#i32--blank-input-accepted-as-0-) | Blank input reads as `0` | Curriculum | ✅ done | Empty/whitespace rejected before `Number()` |
| [I33](#i33--duplicate-numbers-make-drag-ordering-ambiguous-) | Duplicate drag numbers | Curriculum | ✅ done | Distinct numbers; `draggableId` now stable |
| [I34](#i34--react-duplicate-key-error-on-the-world-map-) | Duplicate React key | Geography | ✅ done | 9 errors → **0** |
| [I35](#i35--documentbodyclassname---clobbers-other-classes-) | `body.className=''` clobbers | Global | ✅ done | Uses `classList.remove('light','dark')` |
| [I36](#i36--dead-code-and-orphans-) | Dead code & orphans | Global | ✅ done | Deleted `App.jsx` + empty geojson; dead CSS & imports removed |
| [I37](#i37--two-pre-existing-lint-problems-) | 2 pre-existing lint problems | Math | ✅ done | Fixed alongside R2; project 12 → 10 problems |

### Done ✅

| # | Item | Area | Status | Notes |
|---|---|---|---|---|
| [F1](#part-7--already-fixed-this-session) | **Arithmetic freeze** (reported bug) | Math | ✅ done | Unbounded distractor loop; hit 27.9% of subtraction questions |
| F2 | Negative subtraction answers | Math | ✅ done | Subtrahends built first; answer never negative |
| F3 | Subtraction dropped requested terms | Math | ✅ done | Always yields the requested term count |
| F4 | Division dividend exceeded max | Math | ✅ done | Quotient capped so dividend fits max |
| F5 | 3 `no-case-declarations` lint errors | Math | ✅ done | Braced the switch cases |

**Verification for F1–F5:** 252,000 generated questions across every settings combination
plus 40 questions driven through the real browser UI, 0 console errors. See
[Part 7](#part-7--already-fixed-this-session).

**Known follow-ups in that same game (pre-existing, not part of the reported bug):**
multiplication distractors are trivially guessable, and division ignores the operand slider
while skewing to `n ÷ n = 1`. See [Part 7](#known-remaining-quality-issues-in-the-same-game-).

---

## Table of contents

- [⚡ At a glance — implementation status](#-at-a-glance--implementation-status)
- [Part 1 — Requested features & fixes](#part-1--requested-features--fixes)
- [Part 2 — Critical bugs found by the audit](#part-2--critical-bugs-found-by-the-audit)
- [Part 3 — Wrong content shown to a child](#part-3--wrong-content-shown-to-a-child)
- [Part 4 — Theming & invisible text](#part-4--theming--invisible-text)
- [Part 5 — Mobile & accessibility](#part-5--mobile--accessibility)
- [Part 6 — Structural / latent](#part-6--structural--latent)
- [Part 7 — Already fixed this session](#part-7--already-fixed-this-session)
- [Appendix — Verified NOT broken](#appendix--verified-not-broken)

---

## Part 1 — Requested features & fixes

These are the seven items specifically requested, each with the root cause found.

### R1 — Word Sorter: restart with a new set of words ✅

**File:** [src/pages/skills/english/WordSorter.jsx](../src/pages/skills/english/WordSorter.jsx) · **Verified:** ✔︎

**Three defects, all fixed.** The most serious was not in the original report — while
verifying the fix in the browser I found the round **never re-dealt at all**:

1. **Auto-advance timer could never fire.** The completion effect called `setCompleted(true)`
   *and* scheduled its 2s `setTimeout` in the same pass. That state change re-ran the effect,
   whose cleanup called `clearTimeout`, and the `!completed` guard then blocked a new timer.
   The round hung on the feedback message forever. Fixed by moving the timer into its own
   effect keyed on `completed`.
2. **Unbalanced deal.** `generateSet()` took a flat `slice(0, 6)` from the 36-word bank, so a
   round could deal six nouns and leave two buckets unfillable. Now deals exactly
   `PER_TYPE` (2) of each type, then shuffles.
3. **No manual restart.** Added a "🔄 New words" button (disabled during the feedback
   window) so a round can be abandoned and re-dealt at any time.

Also hardened `getTypeOfBucket` to match on **word value** rather than object identity — it
previously worked only because the same object reference happened to be moved between
arrays, and would have silently scored everything wrong if a word were ever cloned.

**Verification:** 200,000 generated deals — every one exactly 2 nouns / 2 verbs /
2 adjectives with no duplicate words. Then driven through the real UI: completing a round
auto-deals 6 fresh words after 2s with feedback cleared, and "New words" resets a
part-finished round. Build passes; the file contributes **0** lint problems (project total
unchanged at 12, all pre-existing).

### R2 — Arithmetic: raising Min must not drag Max down ✅

**File:** [src/pages/skills/math/MathPractice.jsx](../src/pages/skills/math/MathPractice.jsx) · **Verified:** ✔︎

The Max slider was rendered with a **reactive DOM `min`** (`min={settings.min + 1}`). Raising
Min pushed the Max input's rendered value up without ever updating `settings.max`, so the
label, the slider position and the state used to generate questions all disagreed:

| Action | Label said | Slider value | `settings.max` |
|---|---|---|---|
| initial | 10 | 10 | 10 |
| set Min=20 | **10** | **21** | 10 |
| set Min=49 | **10** | **50** | 10 |

**Fix:** both sliders now share one full `1…100` track, and clamping happens in state on
commit via `handleMinChange` / `handleMaxChange` — Max is nudged only when Min would
overtake it, and vice versa. Nothing is pushed behind the state's back.

**Verified live:**

| Action | Min | Max | Correct? |
|---|---|---|---|
| Min 1 → 5 → 9 | 9 | **10 (unmoved)** | ✔︎ was the reported bug |
| Min → 20 / 40 / 60 | 60 | 60 (follows only when overtaken) | ✔︎ |
| Max → 15 | 15 (follows down) | 15 | ✔︎ |
| Max → 80 | **15 (unmoved)** | 80 | ✔︎ |

Then set Min=30 / Max=40 and generated 8 questions: every operand fell inside 30–40.

Also resolved [I37](#i37--two-pre-existing-lint-problems-) in the same file while here —
removed the unused `isWrong` and added the missing `settings` effect dependency (safe: the
sliders only exist on the pre-start screen, so `settings` cannot change mid-run).
**MathPractice.jsx is now lint-clean; project total 12 → 10 problems.**

### R3 — Arithmetic: multiple operations, and mixed operations per problem ✅

**Files:** [generateQuestion.js](../src/pages/skills/math/generateQuestion.js),
[MathPractice.jsx](../src/pages/skills/math/MathPractice.jsx) · **Verified:** ✔︎

Implemented both parts. The two open design questions were resolved as follows — recorded
here because they are pedagogy calls, not technical ones:

**Decision 1 — precedence: explicit brackets.** Mixed questions render as `5 + (4 × 5) - 4`
rather than relying on BIDMAS, which Year 2 has not been taught. The bracket shows what to
work out first, so the question is unambiguous without prior knowledge of precedence rules.

**Decision 2 — invariants by construction, never by rejection.** Every question satisfies
*both* "the answer is a non-negative whole number" *and* "so is every intermediate result".
This is enforced structurally: subtraction never takes more than the running total, division
only ever divides by a factor of it. There is **no reject-and-retry loop** — that pattern is
what froze this very file before ([Part 7](#part-7--already-fixed-this-session)).

**Complexity capped for the audience.** The first working version produced
`1 + (6 × 6) + (9 × 7) + (10 × 7) = 170` and nested forms like `(3 ÷ 3 + (7 × 5)) ÷ 4` — valid
arithmetic, but hopeless for a 6-year-old. Now: at most **one** bracketed group per question,
**never nested**, and factors inside a bracketed product capped at 5. Measured over 50,000
mixed questions (4 operands, range 1–10): max answer **54**, mean **12.2**, and **zero**
questions with nested or multiple bracket groups.

**UI:** the single `<select>` became four checkboxes plus a "Mix operations in one problem"
toggle. The last selected operation cannot be deselected (an empty set has no questions), and
the mix toggle is disabled with a hint until two or more operations are chosen.

**Verification:** **189,000** questions across all 15 non-empty operation subsets × mixed and
single × 2–4 operands × 7 ranges, each validated against an **independent BIDMAS-and-bracket
parser** of the rendered text — no negative or fractional answers or options, no duplicate
options, no missing answers, no unparseable output. Then driven through the real UI in both
mixed and single-operation modes.

#### Also fixed here — the two follow-ups from Part 7

- **Distractors now scale with the answer.** Was a fixed ±5 window, so `4 × 8 × 9 × 5 = 1440`
  offered `[1437, 1438, 1439, 1440]` — obvious by magnitude. Now ±15% (floor 3):
  `5 × 6 × 6 × 8 = 1440` offers `[1268, 1280, 1440, 1469]`.
- **Division no longer skews to `n ÷ n = 1`.** Picking the divisor first and capping the
  quotient at `max/divisor` meant a divisor near `max` forced a quotient of 1 — observed 6 of
  10 questions as `7÷7`, `6÷6`, `10÷10`. The divisor now comes from the lower half of the
  range so a real quotient always exists. Measured over 20,000 questions per range:
  **0.0%** have a quotient of 1 (was the majority), and range 1–10 yields 36 distinct
  questions. Note the dividend can exceed `max` (up to `divisor × max`) — unavoidable for
  division, and distinct from the old `max²` runaway that produced `100 ÷ 10` at max=10.

### R4 — Sentence Builder: select min/max word count ✅

**File:** [src/pages/skills/english/SentenceBuilder.jsx](../src/pages/skills/english/SentenceBuilder.jsx) · **Verified:** ✔︎

The blocker was the sentence bank, so that was fixed first: **10 sentences → 38**, spanning
**3–11 words** with every length represented.

| Words | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|
| Count | 4 | 5 | 9 | 5 | 3 | 4 | 3 | 3 | 2 |

Checked programmatically: **no min/max combination yields an empty pool**, no duplicate
sentences, and every sentence sits under a correctly-labelled length group (two were
miscounted while writing them — caught and moved).

**Added a settings screen** with "Shortest sentence" and "Longest sentence" sliders bounded
to the bank's real range, a live "N sentences to practise" count, and a ⚙ Settings button to
return mid-game. The sliders clamp in state on commit — the same approach as
[R2](#r2--arithmetic-raising-min-must-not-drag-max-down-), avoiding the reactive-DOM-`min` bug.
Start is disabled if a pool is ever empty, and `generateQuestion` returns `null` rather than
crashing on an empty array.

Also hardened the scramble: it now re-shuffles (bounded, max 10 attempts) if the shuffle
happens to reproduce the original order, which previously showed the learner an
already-solved question.

**Verified live:** min=9 pushed max to 9 (3 sentences); max lowered to 4 pulled min down to
4; a round at 3–4 words produced only 3- and 4-word sentences across 5 questions.

### R5 — City Spotlight: uniform image size, mobile-friendly ✅

**Files:** [CitySpotlight.css](../src/pages/skills/geography/CitySpotlight.css),
[CitySpotlight.jsx](../src/pages/skills/geography/CitySpotlight.jsx) · **Verified:** ✔︎

**Cause:** `.cityImage` capped height at `15rem` on mobile but
`@media (min-width: 768px)` set **`max-height: none`**, so on desktop every image fell back
to its own natural aspect ratio — and the sources range from **2.12:1** (Sydney 500×236) to
**0.75:1** (portrait Tokyo 500×667). The card height jumped between questions.

**Fix:** a fixed `aspect-ratio: 4 / 3` box with `object-fit: cover` at **every** breakpoint,
and the desktop `max-height` override deleted. `aspect-ratio` also reserves the space before
the image loads, so the layout no longer shifts on load. Added a panel-coloured background so
the box looks intentional while loading.

**Verified live** at three viewports, 8 questions each, pointer parked away from the card
(the `:hover` `scale(1.03)` was inflating my first measurements — a hover effect, not a
sizing bug):

| Viewport | Rendered box | Ratio | Distinct sources | All identical? | Page overflow |
|---|---|---|---|---|---|
| iPhone SE 375×667 | 311×233 | 1.33 | 7–8 | ✔︎ **yes** | none |
| Tablet 820×1180 | 500×375 | 1.33 | 7–8 | ✔︎ **yes** | none |
| Desktop 1440×900 | 500×375 | 1.33 | 8 | ✔︎ **yes** | none |

Map mode also checked at 375px: 300px-tall container, no horizontal overflow.

**Bonus — CSS scoping.** This file was one of the six defining generic `.wrapper` / `.score` /
`.prompt` / `.optionBtn` / bare `select` rules globally ([I26](#i26)).
Every rule is now scoped under a `.city-spotlight` root. Verified: after visiting City
Spotlight, Arithmetic Practice's `.wrapper` keeps its own `max-width: 600px` / `text-align:
start` instead of inheriting City Spotlight's `700px` / `center`.

**Not done (needs image tooling, not available here):** `greece_ruins` (2054×1462, 308 KB)
and `beijing_palace` (244 KB) are still served at full size to phones, and Rio is still the
only `.jpg` among 15 files. Neither affects correctness — `object-fit: cover` renders them
identically and `.jpg` is universally supported — but downscaling would cut mobile transfer
significantly.

### R6 — Flag Finder: filter by continent, or whole planet ✅

**File:** [src/pages/skills/geography/FlagFinder.jsx](../src/pages/skills/geography/FlagFinder.jsx) · **Verified:** ✔︎

Added a "Where in the world?" picker offering **🌍 The whole planet** plus each continent,
each showing its live country count. Switching resets the score. `continents` was added to the
existing `response_fields`, so no extra request is needed.

Fixed together with [I5](#i5) (pagination) since both live in the same fetch. Verified counts
match the API exactly:

| Scope | Countries | | Scope | Countries |
|---|---|---|---|---|
| 🌍 Whole planet | 250 | | North America | 41 |
| Africa | 58 | | Oceania | 27 |
| Europe | 55 | | South America | 14 |
| Asia | 53 | | | |

**Antarctica is deliberately excluded** — its 5 entries are research territories, not
countries a Year 2 child should be asked to name.

**Verified live:** Oceania rounds returned only Oceanian countries (Tonga, Kiribati, French
Polynesia, New Caledonia, Cook Islands…); whole-planet rounds spanned initials A–U.

Also made question generation **structurally freeze-proof**: distractors are now picked by
shuffling a de-duplicated pool instead of `while (options.length < 4)` rejection sampling,
which could never terminate on a pool with fewer than 4 distinct names. It returns `null` and
the UI shows "Not enough flags for X" rather than hanging — relevant now that continent
filters can shrink the pool.

### R7 — Counting challenge: visual polish, fewer words, visible input text ✅

**Files:** all four `CountingForwardsAndBackwardsChallenge*.css` +
`Challenge1.jsx`, `Challenge2.jsx` · **Verified:** ✔︎

**The invisible-text symptom had three separate causes**, one per file. All were inputs (or a
prompt) that set a background but **never declared a `color`**, so the text inherited whatever
the theme happened to set. Measured before and after:

| Challenge | Element | Before | After (light / dark) |
|---|---|---|---|
| 1 | typed answer | **1.22:1** | **17.28 / 11.18** |
| 3, 4 | typed answer | **1.05:1** | **17.28 / 11.18** |
| 2 | **the whole question** | **1.00:1** | **14.52 / 14.52** |
| 1 | number line | (unstyled) | 17.28 / 11.18 |
| 2 | option buttons | — | 17.28 / 11.18 |

Every element in all four challenges now clears the WCAG AA 4.5:1 threshold in **both**
themes, measured from computed styles.

Fixes applied:
- Explicit `color` **and** `background-color` on every input, in both themes, plus a visible
  focus ring.
- `.dark` / `[data-theme="dark"]` selectors replaced with **`body.dark`** — the old ones never
  matched anything, since the theme class goes on `<body>`.
- Challenge 3/4's hardcoded `#f1f1f1` box replaced with `var(--light-panel)` / `var(--dark-panel)`.
- **Challenge 1 no longer borrows `.number-box` / `.number-input` from another topic's
  stylesheet** (part of [I26](#i26)) — it
  now defines its own, so loading straight into it renders correctly instead of as bare text.

**Fewer words:**
- Challenge 1 stated "Start at 27 and count back N:" on **all six rows**. Now a single
  heading "Count back from 27" + "Use the number line to help you.", with each row reading
  just "back 6".
- Challenge 2's word problem was 20 words, mixed the numeral "26" with the word "Five", and
  used negative framing that inverted the arithmetic ("how many are **not** hiding in
  weeds?"). Now: *"26 fish are in a pond. 5 swim away. How many are left?"*

**Layout:** the number line was wrapping 8/8/4; now a deliberate 10 per row (11–20 / 21–30,
5 per row under 480px) and the answer rows are properly centred. No horizontal overflow at
375px. Verified by completing Challenge 1 end to end in dark mode — typed answers visible,
correct feedback, navigation on completion.

---

## Part 2 — Critical bugs found by the audit

### I1 — Second unbounded `while` loop: freezes Find the Missing Number ✅ {#i1}

**File:** [src/pages/skills/math/FindTheMissingNumber.jsx](../src/pages/skills/math/FindTheMissingNumber.jsx) · **Verified:** ✔︎

**This was the same freeze the user reported on `/arithmetic-practice`, in a second game.**

`delta` was drawn from only `{-2,-1,0,1,2}`; `delta === 0` was rejected, and with
`correctAnswer === 1` the `wrong > 0` filter eliminated the rest, leaving just `{2, 3}` —
**two candidates for a loop demanding three.** It spun forever at 100% CPU.
Reachable when `start === 1` and `missingIndex === 0`: **~1.25% of questions**, at every skip
setting.

**Fix:** the same shape as the original — enumerate the candidate pool up front, widen upward
if it can't supply 3, then shuffle and slice. Structurally cannot loop forever.

**Verification:** **144,000** distractor sets covering *every reachable* `correctAnswer`
(6 skip settings × 20 start values × 4 missing indices × 300 samples) — zero wrong counts,
zero duplicates, zero non-positive options, never includes the answer. Then 40 rounds played
in the real UI with no freeze, and the exact former-hang case (`correctAnswer = 1`) checked in
the browser engine with an iteration guard: returns `[2, 4, 3]`.

Also removed a pre-existing unused `isWrong` binding in this file (same dead code as
[I37](#i37--two-pre-existing-lint-problems-)); the file is now lint-clean.

### I2 — Curriculum: one gap in progress locks the entire curriculum forever ✅ {#i2}

**Files:** [useProgress.js](../src/hooks/useProgress.js),
[CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx) · **Verified:** ✔︎

Unlocking was **count-based** (`challengeIndex === completedChallenges.length`), so any gap in
the saved array bricked the curriculum permanently: with `[1, 3]` the count is 2, so index 2
(challenge 3) "unlocked" — but it was already done, while challenges 2 **and** 4 stayed locked.
The topic could never reach completion → next topic never unlocked → next category never
unlocked, with no repair or reset UI. This is a real child's progress with no backup.

**Fix:** a new `isChallengeUnlocked(categoryId, topicId, topic, index)` in the hook implements
the correct rule — *a challenge is open once every challenge before it is complete* — by
**identity**, not count. A gap is now always fillable.

A follow-up pass found the lock did not **propagate**: each category only checked its
immediate predecessor, and an empty category reports "passable", so a gap in category 1 left
categories 3-8 open. Gating now requires *every* earlier category to be passable, and an
unbuilt challenge no longer blocks the ones after it within a topic.

**Verified live** by seeding `localStorage` with each scenario:

| Saved `completedChallenges` | Before | After |
|---|---|---|
| `[1, 2]` | ch1-3 open, ch4 locked | ✔︎ same (correct) |
| **`[1, 3]`** | **ch2 and ch4 locked forever — bricked** | ✔︎ **ch2 open** (gap fillable), ch4 locked |
| **`[2]`** | **ch1 locked** | ✔︎ **ch1 open** — child can go back |
| **`[9,9,9,9]`** | **topic marked complete, child skipped ahead** | ✔︎ topic incomplete, only ch1 open |
| `[1,2,3,4]` | complete | ✔︎ complete |
| fresh | ch1 only | ✔︎ ch1 only |

Category gating, re-verified after the propagation fix — `oLLLLLLL` for fresh, for a gap, and
for one-topic-done; `oooooooo` only once both built topics are complete.

### I3 — Curriculum: 140 of 148 challenges are dead links; topic 3 is a hard wall ✅ {#i3}

**Files:** [challengeAvailability.js](../src/data/challengeAvailability.js) (new),
[CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx),
[useProgress.js](../src/hooks/useProgress.js) · **Verified:** ✔︎

The dataset gives all 37 topics 4 challenges each, but only **8 are built**. The UI linked to
all 148; a child reached an unbuilt one, saw "not yet available", got redirected, and — since
`onComplete` never fired — could never pass it. **Topic 3 was an absolute wall: 7 of 8
categories were unreachable forever.**

**Approach (scope decision):** rather than write 140 challenges, make the app honest about
what exists and stop missing work from blocking progression.

- New `challengeAvailability.js` derives what's implemented from the **`import.meta.glob` key
  set** — the same source of truth the loader uses — so it can't drift from reality.
- Unbuilt challenges render as disabled **🚧** buttons instead of links to a dead page.
- Topics with nothing built are badged **🚧 Coming soon** and **do not gate the next topic**.
- Categories with nothing built don't gate the next category.

Needed one careful distinction, added to the hook: `isCategoryComplete` (for the ✅ badge) vs
**`isCategoryPassable`** (for gating). Conflating them badged every empty category as
"Completed" — the first version of this fix did exactly that.

**Verified live:**

| State | Categories unlocked | Falsely "Completed" |
|---|---|---|
| fresh | 1 / 8 (correct gating) | 0 |
| both built topics done | **8 / 8** (was 1) | 0 — only the genuinely finished one is badged |

**Still true:** 140 challenges remain unwritten. This makes that visible and non-blocking
rather than a silent dead end; the content itself is future work.

### I4 — World Map: wrong answers count as "found" ✅ {#i4}

**File:** [src/components/MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

The incorrect branch ran `setRevealed(prev => new Set(prev).add(currentTarget))` — byte-identical
to the correct branch. A wrong guess permanently retired the target, so a child could "find"
all 177 countries having answered every one wrong and still be congratulated.

**Fix:** the target is added to `revealed` **only** when the answer is correct, in both country
and continent mode. The feedback message now also names the right answer ("Not quite — that is
X. Try again!") and holds slightly longer (1200 ms vs 700 ms) so it can be read.

**Verified live:** 7 deliberately wrong clicks in a row → green "found" fills stayed at
**0** (previously climbed 0→1→2→3→4) and the score stayed 0.

**Second defect, same file:** `setTimeout` was called *inside* the `setRevealed` updater.
StrictMode invokes updaters twice, scheduling **two** timers per click and double-advancing the
round. Timers now live outside the updater in a single tracked `advanceTimerRef`, cleared on
the next click, on unmount, and superseded rather than stacked. Verified: the round advances by
exactly 1 per click.

### I5 — Flag Finder quizzes only 25 of 254 countries ✅ {#i5}

**File:** [src/pages/skills/geography/FlagFinder.jsx](../src/pages/skills/geography/FlagFinder.jsx) · **Verified:** ✔︎

The REST Countries v5 endpoint pages at 25 records and reports the truth in `data.meta`
(`{total: 254, count: 25, more: true}`), which the app ignored — so the game only ever asked
about countries from **Abkhazia to Bermuda**.

Now pages via the `offset` parameter until `meta.more` is false. Loads **250 playable
countries** (of 254; the 4 dropped — Abkhazia, Northern Cyprus, Somaliland, South Ossetia —
have an empty `flag.url_png` and were already filtered).

**One real complication found while testing:** the API **rate-limits rapid sequential
paging**, and the throttled response carries **no CORS headers**, so the browser surfaces an
opaque `TypeError: Failed to fetch`. The first implementation threw on that and showed
"Unable to load flags." — worse than the bug it replaced. Fixed two ways: a 120 ms pause
between pages to stay under the limit, and a per-page `try/catch` that **keeps the pages
already fetched** instead of discarding a usable pool. The game needs only 4 countries, so a
partial world always beats an error screen. Loads in ~4.3 s.

### I6 — Multiplication grid: unclamped size renders a quarter-million cells ✅ {#i6}

**File:** [src/components/MultiplicationGrid.jsx](../src/components/MultiplicationGrid.jsx) · **Verified:** ✔︎

`onChange` wrote the raw input value to state. The HTML `max` attribute is only a spinner
hint, so typing or pasting `500` was accepted and the nested render loops built
`501 × 501 = 251,001` `<td>` elements, locking the main thread. Clearing the field gave
`parseInt('') === NaN`, and `r <= NaN` is false, so the table silently rendered as a blank box.

A single `clampSize()` now handles both, applied to rows and columns.

| Typed | Resulting value | Cells | Page |
|---|---|---|---|
| `500` | 20 | 200 | responsive |
| `9999` | 20 | 200 | responsive |
| `0`, `-5`, empty | 1 | 10 | responsive |
| `3` | 3 | 30 | responsive |

Max possible is now 20 × 20 = 400 cells. Also removed two `console.log` calls that fired on
every render, and made the hover readout test `!== null` rather than relying on truthiness.

---

## Part 3 — Wrong content shown to a child

### I7 — Opposite Match: duplicate `old` creates an unfinishable round ✅ {#i7}

**File:** [src/pages/skills/english/OppositeMatch.jsx](../src/pages/skills/english/OppositeMatch.jsx) · **Verified:** ✔︎

`old` is the right-hand word of both `['young','old']` and `['new','old']`. When a round drew
both, `rightWords` contained "old" twice — and that word is used as the React key **and** the
dnd `droppableId`, which must be globally unique. One drop zone went inert; matching was done
by value, so dropping on either marked **both** matched while `matches` only reached length 1;
the round could never complete and there was no restart control. **A dead end, ~1.1% of rounds.**

**Fix:** round selection now skips any pair sharing a word with one already chosen, so the
collision is structurally impossible — while keeping both pairs (each is individually correct)
in the bank. Also replaced the two `sort(() => Math.random() - 0.5)` shuffles with a proper
Fisher–Yates, since comparator-based shuffling is biased.

**Verified:** 200,000 generated rounds — **0** with a duplicate word, **0** with fewer than the
full 5 pairs.

### I8 — Synonym Safari: `['hot','warm']` is wrong, and contradicts Opposite Match ✅

**File:** [src/pages/skills/english/SynonymSafari.jsx:18](../src/pages/skills/english/SynonymSafari.jsx#L18) · **Verified:** ✔︎

`hot` and `warm` are adjacent points on a temperature scale, not synonyms — and Opposite Match
teaches `hot`/`cold` **and** `warm`/`cool`, so the app contradicted itself. Changed to
`['hot', 'boiling']`.

### I9 — World Map asks "Seven seas (open ocean)" as a continent ✅

**File:** [src/components/MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

`possibleTargets` was built from raw `CONTINENT` values in `countries.geojson`, which include
`"Seven seas (open ocean)"` (1 feature) and `"Antarctica"` (1 feature) — so the game asked
*"Tap the correct continent: Seven seas (open ocean)"*, a prompt that is both nonsense and
near-impossible to tap (scattered ocean specks).

Both are now in an `EXCLUDED_CONTINENTS` set, filtered out of **targets and the dropdown**.
Verified live — the dropdown now reads exactly: *All, Africa, Asia, Europe, North America,
Oceania, South America*.

### I10 — Counting Challenge 4 asks a Year 2 child for `-1` ✅

**File:** [CountingForwardsAndBackwardsChallenge4.jsx](../src/pages/skills/math/challenges/year2/counting-forwards-and-backwards/CountingForwardsAndBackwardsChallenge4.jsx) · **Verified:** ✔︎

`{ start: 15, step: 2, length: 9 }` generated `15, 13, 11, 9, 7, 5, 3, 1, -1`. Negative numbers
are Year 4+ content, and the `type="number"` input made the minus sign awkward.

Changed to `start: 19`, giving `19, 17, 15, 13, 11, 9, 7, 5, 3` — same step, same length, all
non-negative. Verified by computing the full sequence.

### I11 — Reading Numbers ignores the range when `min > max` ✅ {#i11}

**Files:** [ReadingNumbersPanel.jsx](../src/components/ReadingNumbersPanel.jsx),
[ReadingNumbersPanel.css](../src/components/ReadingNumbersPanel.css) · **Verified:** ✔︎

Nothing enforced `min <= max`. With min=500/max=100, `Math.random() * (100 - 500 + 1)` landed
in `[-399, 0]`, so the generated number silently ignored the stated range — and pushed far
enough, went negative, where `writtenNumber(-5)` returns an empty string, i.e. a blank card.
Separately `parseInt('', 10) || 0` meant clearing the Min field set it to **0**, contradicting
the advertised `min="1"` and serving "0 / zero".

**Fix:** the two bounds clamp each other on commit (as in
[R2](#r2--arithmetic-raising-min-must-not-drag-max-down-)); `clampBound` returns 1 rather than 0
for empty/invalid input; and `handleGenerate` orders `lo`/`hi` defensively so even inconsistent
state can't produce an out-of-range value.

**Verified** across 7 transition cases × 5,000 draws each: **0** values outside the range or
below 1. `min=500` now pulls max up to 500; `9999999` clamps to the library's 775,840 ceiling.

Also fixed [I19](#i19--readingnumberspanel-output-box-has-no-light-mode-background-) here — the
`.output-box` had a dark-mode background but none in light mode, so the answer card rendered on
the bare page. It now uses the panel colour with an accent border in both themes.

### I12 — Dual-label clock shows `12 / 0` instead of `12 / 24` ✅

**File:** [src/components/DualLabelClock.jsx:18](../src/components/DualLabelClock.jsx#L18) · **Verified:** ✔︎

`(i + 12) % 24` was correct for i=1…11 (13…23) but turned i=12 into **0**, so the clock read
`12 / 0` where every teaching resource shows `12 / 24`. The modulo served no other purpose, so
it's now simply `i + 12`.

### I13 — Number Bonds: silently fewer pairs than advertised ✅

**File:** [src/pages/skills/math/NumberBonds.jsx](../src/pages/skills/math/NumberBonds.jsx) · **Verified:** ✔︎

Three defects, all fixed:

1. **`slice(0, 6)` assumed 6 pairs always existed.** Target 5 has only 2 and targets 2–3 have
   just 1, so "Target: 5" — an offered preset — silently produced a 4-card game, and a custom
   target of 2 produced a 2-card game that auto-completed on the first flip. Now capped by
   what actually exists, with a plain-language notice when a target has fewer than 3 pairs.
2. **The custom-target input was uncontrolled and committed on every keystroke.** Typing `100`
   regenerated the board three times (target 1 → 10 → 100) and the practice question visibly
   flickered. Now a controlled draft committed on blur/Enter.
3. **`min`/`max` were unenforced**, so `9999` was accepted. Now clamped to 2–100.

**Verified live:** target 5 → "Pairs: 0 / 2" with the notice; typing "100" caused **no**
intermediate regeneration (stayed at 6 pairs throughout); `9999` clamped to 100 and `1` to 2.
Checked across targets 2–100 that every card pair sums to the target.

### I14 — Fraction Fun accepts any N segments, ignoring which ⏸️

**File:** [src/pages/skills/math/FractionFun.jsx:26-28](../src/pages/skills/math/FractionFun.jsx#L26-L28) · **Verified:** ○

Correctness is `selected.size === fraction.numerator` — the check never looks at *which*
segments are shaded. A scattered, non-contiguous shading gets "✅ Correct!" for a prompt like
"Shade 3/8 of the bar".

⏸️ **Left open deliberately — this is a teaching decision, not a bug to patch:**

- **If the intent is *fractions of a set*** (3 of these 8 things), the current behaviour is
  **already correct** and only the prompt wording should change.
- **If the intent is a *bar model*** (the standard Year 2 representation), shading must be
  contiguous from one end, and the check needs to require adjacency.

Both are one small change; picking the wrong one teaches the wrong idea, so it needs your call.
Everything else in the file is sound — the fraction is always proper, no division by zero, and
the comparison is integer-based with no floating-point risk.

---

## Part 4 — Theming & invisible text

### I15 — All `.App.dark` rules are dead; 404 buttons are invisible ✅ {#i15}

**Files:** [NotFound.css](../src/pages/NotFound.css), [App.css](../src/App.css),
`ProblemView.css`, `Challenge.css` · **Verified:** ✔︎

`ThemeContext` writes the theme class onto **`document.body`**, but these stylesheets scoped
their dark rules to **`.App.dark`**. The only element with `className="App"` lived in
`src/App.jsx` — which was **never imported**. Every `.App.dark` rule in the project was dead.

Measured on `/404` in dark mode before the fix: the "📘 Curriculum" and "🎮 Skills" buttons were
`rgb(34,24,28)` on `rgb(34,24,28)` — **contrast 1.00, literally invisible**.

**Fix:** `.App.dark` → `body.dark` across all four files. The orphaned `App.jsx` was deleted
([I36](#i36)), along with the now-unreachable `.App`, `.App.light`, `.app-header`, `.app-title`
and `.theme-toggle` rules.

**Verified:** those buttons now measure **14.52** in both themes, and the title 2.66 → 10.79 in
dark. The primary button's light-mode contrast was fixed under
[I21](#i21--light-theme-buttons-fail-wcag-aa-contrast-).

### I16 — `:root` forces white-on-dark globally and causes a theme flash ✅

**File:** [src/index.css](../src/index.css) · **Verified:** ✔︎

`:root` unconditionally set `color: rgba(255,255,255,0.87)` and `background-color: #242424`
while `App.css` only repainted `body.light` / `body.dark`. Confirmed live: the document element
computed to near-white on `rgb(36,36,36)` **while `body.className === "light"`**. Anything
escaping the body cascade inherited white text, and the dark `:root` painted before
ThemeContext's effect ran — a flash stretched to a visible 300ms by App.css's transition.

**Fix:** the unconditional `color`/`background-color` are gone. `<html>` now paints from
`prefers-color-scheme` for the first frame and follows the explicit choice via
`html:has(body.light)` / `html:has(body.dark)`, so the area behind the body can never
contradict the theme. `color-scheme: light dark` was also removed — it made native `<select>`
and number inputs follow the OS rather than the app.

### I17 — ShapeQuiz hardcodes light-only colours ✅

**File:** [src/components/ShapeQuiz.jsx](../src/components/ShapeQuiz.jsx) · **Verified:** ✔︎

The component never read `ThemeContext`; `#ffffff` backgrounds and `#22181C` text were inline
literals. In dark mode the score and "What shape is this?" heading were near-invisible
dark-on-dark while the shape stage and buttons stayed glaring white.

**Fix:** the literals became `var(--sq-text)` / `var(--sq-panel)`, defined in `App.css` and
swapped under `body.dark`. Inline styles can't carry `body.dark` overrides, but they *can* read
CSS variables — so no ThemeContext plumbing was needed through every style object.

**Verified:** **14.52 in both themes** (was dark-on-dark).

### I18 — World Map header/HUD are light-only ✅

**Files:** [WorldMap.jsx](../src/pages/skills/geography/WorldMap.jsx),
[MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

Hardcoded `#eee` borders, `#666` muted text, `#eee`/`#333` inactive buttons and an
`rgba(255,255,255,0.95)` HUD stayed light in dark mode — `#666` on the dark background measured
**3.01:1**, below AA for instructions a child must read.

Replaced with a `--map-*` token set (border, muted, text, chip, accent, on-accent, hud) defined
for both themes in `App.css`.

**Verified live** — worst case per theme: light **5.46**, dark **8.25** (was 3.01). Subtitle,
both mode buttons and the HUD message all pass.

### I19 — `ReadingNumbersPanel` output box has no light-mode background ✅

**File:** [ReadingNumbersPanel.css](../src/components/ReadingNumbersPanel.css) · **Verified:** ✔︎

`body.dark .output-box` set a background but the base rule declared only `color`, so in light
mode the answer card rendered on the bare page with no panel — inconsistent with every other
panel in the app. It now uses `--light-panel` with an accent border. Fixed alongside
[I11](#i11).

---

## Part 5 — Mobile & accessibility

### I20 — World Map overflows the viewport on a phone ✅

**Files:** [WorldMap.jsx](../src/pages/skills/geography/WorldMap.jsx),
[WorldMap.css](../src/pages/skills/geography/WorldMap.css) (new),
[Navbar.jsx](../src/components/ui/Navbar.jsx), [MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

The wrapper was `height: 100dvh` but sits **below** the sticky navbar, so the document became
`navbar + 100dvh` → the page scrolled, which then triggered the navbar's hide-on-scroll and
made the map jitter.

**Fix:** `height: calc(100dvh - var(--navbar-height))`. The navbar **measures itself** with a
`ResizeObserver` and publishes `--navbar-height` — my first attempt hardcoded 56px and was
wrong: the bar is actually 63–76px, and taller once it wraps. The nav is also kept to a single
row on small screens.

The HUD was absolutely positioned with no width or height cap, so it wrapped to 5–6 rows on a
phone and covered the area the child must tap. Now capped at
`min(calc(100% - 24px), 640px)` wide and `40%` tall with internal scrolling.

**Verified live** — page overflow at four viewports:

| Viewport | Navbar | Shell height | Excess scroll | H-overflow |
|---|---|---|---|---|
| iPhone SE 375×667 | 73px | 594 | **0** | none |
| iPhone 11 414×896 | 63px | 833 | **0** | none |
| Tablet 820×1180 | 76px | 1104 | **0** | none |
| Desktop 1440×900 | 76px | 824 | **0** | none |

HUD on mobile: within the viewport, 34% of map height (was blanketing it).

### I21 — Light-theme buttons fail WCAG AA contrast ✅

**Files:** [App.css](../src/App.css), [SkillsPage.css](../src/pages/skills/SkillsPage.css),
[Home.css](../src/pages/home/Home.css), [NotFound.css](../src/pages/NotFound.css),
[CurriculumPage.css](../src/pages/curriculum/CurriculumPage.css) · **Verified:** ✔︎

`white` on `--light-accent` measured **3.17:1** and `--light-bg` on it **2.66:1** — both below
the AA 4.5:1 minimum.

**Approach:** rather than change the brand pink, added an **`--on-light-accent` /
`--on-dark-accent`** token. The dark ink already reaches **5.46:1** on the same `#EF626C`, so
the palette is preserved and only the label colour changes. Hover states were *darkening* to
`#d44e58`, which fails either way (4.14/4.17), so they now **lighten** to `#F2757E` — dark ink
there is 6.27:1. The "Completed" badge went from `#4caf50` (white at 2.78:1) to `#2e7d32`
(5.13:1), and locked / coming-soon buttons from `gray` with inherited ink to `#5f5f5f` with
explicit white (6.39:1) — muted by colour rather than `opacity`, which had dragged the label
below the floor.

**Verified live, worst-case per page:**

| Page | Light | Dark |
|---|---|---|
| Skills | 5.46 ✔︎ | 10.79 ✔︎ |
| Home | 5.46 ✔︎ | 10.79 ✔︎ |
| 404 | 5.46 ✔︎ | 10.79 ✔︎ |
| Curriculum (all button states) | 5.46 ✔︎ | 6.39 ✔︎ |

### I22 — Sight Word Pop: fixed 440px field, wrong clamp reference ✅

**Files:** [SightWordPop.css](../src/pages/skills/english/SightWordPop.css),
[SightWordPop.jsx](../src/pages/skills/english/SightWordPop.jsx) · **Verified:** ✔︎

`.bubbleField` was a hard `440px`, so on a 667px-tall phone the header plus field forced page
scroll and the top of the field — where bubbles are about to pop — sat off-screen. The
`floatUp` keyframes translated a fixed `-430/-460px`, unrelated to the container height.

Both now derive from a single `--field-h: clamp(260px, 52vh, 440px)`, so the animation can
never drift from the field size. The bubble start offset is likewise proportional.

Also fixed the clamp reference: `bubbleHalfPct` divided by **`window.innerWidth`** while the
bubble is positioned inside `.bubbleField` (capped at 600px), so it under-corrected on wide
screens and long words still clipped in the outer lanes. It now measures the field element.

**Verified:** iPhone SE → field 347px, fully in view, **no page scroll** (was scrolling);
iPhone 11 and desktop → 440px, no scroll. `--field-h` correctly inherits to `.bubbleBtn`.

### I23 — Map game is keyboard-inaccessible; colour is the only signal ✅

**File:** [src/components/MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

GeoJSON paths had click handlers only — no `tabIndex`, no key handling — so the game was
unplayable by keyboard, and correct/wrong was conveyed by fill colour alone.

A `makeAccessible` helper now gives every path `tabindex="0"`, `role="button"`, an
`aria-label` with the country/continent name, Enter/Space activation, and a focus outline.

**Two wrong turns worth recording:** `layer.getElement()` returns `null` inside
`onEachFeature` (the path doesn't exist until the layer renders), and individual GeoJSON child
layers never emit their own `add` event — react-leaflet adds the parent group. The attributes
apply on the next animation frame instead.

**Verified live:** **177 of 177** paths focusable and labelled (e.g. "Fiji", "United Republic
of Tanzania"). Focusing the current target and pressing **Enter** with no mouse produced a
correct answer — the country turned green exactly as a click would. This also confirmed
[I4](#i4)'s correct-answer branch, which the mouse-driven tests couldn't reach.

### I24 — Navbar: unlabelled toggle, and no way to reach the hubs ✅

**Files:** [Navbar.jsx](../src/components/ui/Navbar.jsx),
[Navbar.css](../src/components/ui/Navbar.css) · **Verified:** ✔︎

The emoji theme toggle had no `aria-label` (a screen reader announced only "moon") and was the
**only** control in the bar — so from any game the only route back to a hub was the browser
Back button.

Added **🎮 Skills** and **📘 Curriculum** links with an `active` state for the current route,
plus a descriptive `aria-label`/`title` on the toggle that names the target theme. All three
controls have 44px minimum tap targets, and the bar stays on one row on small screens.

### I25 — Clock is a fixed 250px with 0.65rem labels ✅

**Files:** [DualLabelClock.jsx](../src/components/DualLabelClock.jsx),
[DualLabelClock.css](../src/components/DualLabelClock.css) · **Verified:** ✔︎

`.clock-wrapper` was a hard 250px square with `size={250}` hardcoded, and the stacked dual
labels sat at `0.65rem` (~10.4px) — below the legible floor for a 6-year-old, and unable to
grow on a tablet.

The wrapper is now `clamp(250px, 60vmin, 420px)` and the component measures itself with a
`ResizeObserver` to pass the right pixel size to `react-clock`. The hour labels were already
positioned in **percentages**, so they scale for free; their font is now
`clamp(0.72rem, 2.2vmin, 0.95rem)`. Also removed two `console.log` calls that fired on every
render.

---

## Part 6 — Structural / latent

### I26 — Global CSS collisions: styling depends on visit order 🟡 partial {#i26}

**Verified:** ✔︎

All CSS is imported globally, and generic class names are redefined across files, so whichever
the bundler emits last wins app-wide — the same screen can render differently depending on
which games were visited first, and differently again in a production build.

**Done:**
- **CitySpotlight fully scoped** under a `.city-spotlight` root ([R5](#r5--city-spotlight-uniform-image-size-mobile-friendly-)).
  Verified: after visiting City Spotlight, Arithmetic Practice's `.wrapper` keeps its own
  `max-width: 600px` / `text-align: start` instead of inheriting `700px` / `center`.
- **Counting Challenge 1 made self-contained** ([R7](#r7--counting-challenge-visual-polish-fewer-words-visible-input-text-)) —
  it had been borrowing `.number-box` / `.number-input` from *another topic's* stylesheet, so
  loading straight into it rendered unstyled bare text.
- A live instance found and fixed while doing [I21](#i21--light-theme-buttons-fail-wcag-aa-contrast-):
  `.skill-btn` is defined in **both** `SkillsPage.css` and `CurriculumPage.css`, and the
  curriculum copy was overriding the skills one. Both now use the accent token.

**Still open:** `.wrapper` / `.score` / `.prompt` / `.optionBtn` / `.startBtn` remain global in
`MathPractice.css`, `FindTheMissingNumber.css`, `WordBuilder.css`, `SightWordPop.css`, plus
`.challenge-container` across the 9 challenge stylesheets, and a bare `select { }` in
`FindTheMissingNumber.css`.

⚠️ **Note for whoever picks this up:** I attempted an automated scoping pass and it **emptied
`MathPractice.css`** — recovered from git, and the R3 styles were re-applied by hand. Scope
these files one at a time with a visual check after each, or convert to CSS Modules properly.
Do not batch-rewrite them with a regex.

### I27 — Sight Word Pop: spawn cadence is unstable ✅

**File:** [SightWordPop.jsx](../src/pages/skills/english/SightWordPop.jsx) · **Verified:** ✔︎

The spawn effect listed `timeLeft` in its dependency array, but `timeLeft` decrements every
1000ms while the spawn interval is 900ms — so the interval was torn down and rebuilt every
second, firing at most once per cycle. `targetsShown`, `targetWord` and `settings` were in the
same array, resetting it again on every pop.

*(The earlier audit claimed the game was unplayable and always scored 0. That was wrong —
900ms < 1000ms, so it did fire once per second. The real defect was the degraded, uneven
cadence.)*

**Fix:** those three volatile values are read through refs, so the interval survives their
changes and only `started`/`settings` rebuild it.

**Two related bugs fixed in the same file:**
- `scheduleRemove` fired an untracked `setTimeout` per bubble, leaving up to 3 live timers
  calling `setBubbles` after unmount. Now tracked in a `Map` and cleared on unmount and on
  early pop.
- **Lane double-free:** popping a bubble freed its lane immediately, then the bubble's own
  pending timeout freed it *again* — releasing a lane a newer bubble had taken, so two bubbles
  could stack in one lane. Lanes are now keyed by owning bubble id and only released by their
  owner.

**Verified live:** **22 spawns in 20s against 22 expected** at the configured 900ms cadence
(was ~1/sec), max 4 concurrent bubbles, and **0 lane collisions**.

### I28 — Untracked `setTimeout` across several games ✅

**Verified:** ✔︎ (build + lint; behaviour reasoned per site)

All four now hold their timer in a ref, clear it on unmount, and supersede rather than stack:

| File | Was |
|---|---|
| [ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) | Navigated the child away 1s after they pressed Back |
| [NumberBonds.jsx](../src/pages/skills/math/NumberBonds.jsx) | Fired into Match Mode after switching from Practice; the timer is now cleared on unmount and whenever target/mode changes |
| [FractionFun.jsx](../src/pages/skills/math/FractionFun.jsx) | Same pattern, two sites |
| [SightWordPop.jsx](../src/pages/skills/english/SightWordPop.jsx) | See [I27](#i27--sight-word-pop-spawn-cadence-is-unstable-) |

### I29 — `onComplete` can fire twice on double-click ✅

**Files:** `CountingForwardsAndBackwardsChallenge3.jsx`, `Challenge4.jsx`,
[ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) · **Verified:** ✔︎

The Submit button had no `disabled` and no guard during the 1000ms feedback window, so two
rapid clicks fired `onComplete()` twice and scheduled two `navigate` timers.

Both challenges now use a `locked` state (matching what Challenge 2 already did correctly),
and the button is disabled while locked. `ProblemView.handleComplete` is additionally
**idempotent** — it returns early if a navigation is already pending — so a double-submit
cannot double-navigate even if a challenge misbehaves.

### I30 — `isTopicComplete` is a length check, not a membership check ✅

**File:** [src/hooks/useProgress.js](../src/hooks/useProgress.js) · **Verified:** ✔︎

`completedChallenges?.length === topic.challenges.length` meant `[9,9,9,9]` — four ids that
don't exist — marked a topic complete and unlocked the next one. `completeChallenge` dedupes so
the app wouldn't produce that itself, but a hand-edit or future schema change would.

Now a genuine membership check: every challenge id in the topic must be present. Fixed
alongside [I2](#i2) since both stemmed from counting entries instead of checking identity.
Verified: `[9,9,9,9]` now leaves the topic incomplete with only challenge 1 open.

### I31 — Latent freeze: `generateSequence` is one data row from hanging ✅ {#i31}

**Files:** `CountingForwardsAndBackwardsChallenge3.jsx:7`, `Challenge4.jsx:7` · **Verified:** ✔︎

```js
while (missing.size < 3) { missing.add(Math.floor(Math.random() * length)); }
```

This terminated **only** because every current `SEQUENCES` row happens to have `length >= 6`.
Adding any row with `length < 3` would have frozen the tab instantly — the same shape as
[I1](#i1) and the originally-reported bug.

Replaced with a shuffle-and-slice (`Math.min(3, length)`), so it cannot loop regardless of what
data anyone adds later.

### I32 — Blank input accepted as `0` ✅

**Files:** `CountingForwardsAndBackwardsChallenge3.jsx`, `Challenge4.jsx` · **Verified:** ✔︎

`Number(inputs[idx]) !== item.value` correctly rejected an untouched box (`undefined` → `NaN`),
but a box that was typed into **and then cleared** is `''`, and `Number('') === 0` — so any
sequence whose missing value is 0 would pass on a blank.

`handleSubmit` now rejects `undefined` and whitespace-only values before comparing, so every
blank must actually be filled. Latent rather than live (no current sequence reaches 0), but it
would have become real the moment one was added — and [I10](#i10--counting-challenge-4-asks-a-year-2-child-for--1-)
shows the sequence data does get edited.

### I33 — Duplicate numbers make drag ordering ambiguous ✅

**Files:** `NumbersAndCountingChallenge1.jsx`, `Challenge2.jsx` · **Verified:** ✔︎

Five independent draws of `Math.random() * 100` repeated a value ~10% of the time. Validation
still passed (it compares against a sorted copy), but two identical tiles are indistinguishable
to a child, and `draggableId={num + "-" + index}` **changed whenever the index changed**,
violating the dnd library's requirement for stable ids.

A `pickDistinctNumbers` helper now takes 5 values from a shuffled 1–100 pool — distinct by
construction, bounded, no re-rolling. With values unique, `draggableId={String(num)}` is both
stable and unique.

### I34 — React duplicate-key error on the World Map ✅ {#i34}

**File:** [src/components/MapGame.jsx](../src/components/MapGame.jsx) · **Verified:** ✔︎

`key={mode}` was set on two sibling elements (`TileLayer` and `GeoJSON`), so in country mode
both rendered `key="countries"` — 9 console errors on every load. The tile layer now uses
`key={`tiles-${mode}`}`.

**Verified:** loading the map, switching to continents, and switching back produces **0**
console errors (was 9). Also removed the unused `import L from 'leaflet'` in the same file
(part of [I36](#i36--dead-code-and-orphans-)).

### I35 — `document.body.className = ''` clobbers other classes ✅

**File:** [src/context/ThemeContext.jsx](../src/context/ThemeContext.jsx) · **Verified:** ✔︎

Assigning the whole `className` destroyed classes set by other code — Leaflet puts
`leaflet-dragging` on `<body>` while panning. Now `classList.remove('light', 'dark')` followed
by `add(theme)`, touching only our own classes.

### I36 — Dead code and orphans ✅ {#i36}

**Verified:** ✔︎

| Item | Action |
|---|---|
| `src/App.jsx` | **Deleted.** Never imported; held a duplicate theme state superseded by `ThemeContext`, and its `.App` class was what every dead selector in [I15](#i15) targeted. |
| `src/App.css` dead rules | Removed `.App`, `.App.light`, `.app-header`, `.app-title`, `.theme-toggle` — all unreachable once `App.jsx` went. |
| `public/continents.geojson` | **Deleted.** 0 bytes and unreferenced; continents are built client-side via `turf.combine`. |
| `MapGame.jsx` unused `import L` | Removed. |
| `SightWordPop.jsx` unused `shuffle()` | Removed. |
| `MultiplicationGrid.jsx` / `ReadingNumbersPanel.jsx` / `DualLabelClock.jsx` debug logs | Removed (5 `console.log` calls firing on every render). |
| Dead `isWrong` bindings | Removed from `MathPractice`, `FindTheMissingNumber`, `ShapeQuiz`, `WordBuilder`. |

**Still open (deliberately):** `SynonymSafari.jsx`'s unnamespaced `'difficulty'` localStorage
key (no live collision), its one-directional match test (works because both directions are
always emitted), and `.skills-grid`'s unreachable `max-width: 1400px` inside a 1200px parent.
`FractionFun.css`'s duplicate `padding` was left as-is — harmless, and the file was otherwise
untouched.

### I37 — Two pre-existing lint problems ✅

**Verified:** ✔︎ (`npm run lint`)

Both were in `MathPractice.jsx` and were fixed alongside [R2](#r2--arithmetic-raising-min-must-not-drag-max-down-):

- `'isWrong' is assigned a value but never used` — removed the dead binding.
- `useEffect` missing dependency `settings` — added. Safe because the settings sliders only
  render on the pre-start screen, so `settings` cannot change while a run is in progress.

`MathPractice.jsx` is now lint-clean. **Project total: 12 → 10 problems** (the remaining 10
are in other files and pre-date this work).

---

## Part 7 — Already fixed this session

`/arithmetic-practice` froze after the second or third subtraction question. Root cause and
fixes, all verified:

| Bug | Cause | Fix |
|---|---|---|
| **Freeze** | Distractor `while` loop sampled `delta` from -5..4 and required `wrong >= 0`; when the answer was ≤ -3 **no candidate could ever qualify** → infinite loop. Hit **27.9%** of default subtraction questions. | Enumerate the candidate pool up front, widen upward if under 3, shuffle. Cannot loop forever. |
| Negative subtraction answers | Operands used in draw order, so `3 - 8 = -5`, contradicting the non-negative options guard. | Build subtrahends first; first term = their sum + answer. |
| Subtraction dropped terms | An early-stop workaround emitted `10 - 10` when 3-4 terms were requested. | Same rewrite always yields the requested term count. |
| Division dividend exceeded max | `divisor * quotient` reached max² — `100 ÷ 10` with max=10. | Cap the quotient so the dividend fits max. |
| 3 lint errors | `no-case-declarations` in the switch. | Braced the case blocks. |

Logic was extracted to [src/pages/skills/math/generateQuestion.js](../src/pages/skills/math/generateQuestion.js)
so it can be exercised directly without breaking fast refresh.

**Verification:** 252,000 generated questions (4 types × 3 operand counts × 7 ranges × 3,000
samples) with answers checked against an independent evaluation of the rendered text — no
negative options, no wrong answers, no duplicate options, no zero terms, no freezes. Plus 40
questions driven through the real browser UI across all four operations, 0 console errors.

### Known remaining quality issues in the same game ✅

Both were surfaced by the freeze verification, were **pre-existing**, and are now fixed as
part of [R3](#r3--arithmetic-multiple-operations-and-mixed-operations-per-problem-):

- **Multiplication distractors were trivially guessable** — a fixed ±5 window beside a
  4-digit product. Now scaled to ±15% of the answer (floor 3).
- **Division skewed to `n ÷ n = 1`** and ignored the operand slider. The quotient-capping
  logic was the cause; fixed by drawing the divisor from the lower half of the range.
  Measured: 0.0% of 20,000 questions per range now have a quotient of 1.

The operand slider still has no effect in division mode — division deliberately renders as a
single `dividend ÷ divisor` pair, since a chained `a ÷ b ÷ c` is not Year 2 material.

---

## Appendix — Verified NOT broken

Checked and found correct, so nobody re-investigates:

- **REST Countries endpoint and key are right.** `api.restcountries.com/countries/v5` with
  `VITE_REST_COUNTRIES_API_KEY` returns 200. The older `restcountries.com/v3.1` is
  **deprecated** and returns an error telling you to migrate to v5. The pagination limit
  ([I5](#i5)) is the only fetch bug.
- **`localStorage` progress I/O is safe.** `useProgress.js:25-51` has `try/catch` on reads and
  writes (including quota), and `saved || {}` handles `JSON.parse("null")`. The `hydrated`
  guard correctly prevents a save-before-hydrate wipe, including under StrictMode.
- **The dynamic challenge loader degrades gracefully.** `Challenge.jsx:16-18` uses a static
  `import.meta.glob`; missing modules throw, are caught, and show "not yet available" + a 3s
  redirect, with an `isMounted` guard. No crash, no hang. All 37 kebab-case topic ids match
  the naming convention.
- **Leaflet lifecycle is sound.** No manual `L.map()`, so no "Map container is already
  initialized"; `key={mode}` correctly forces remount rather than leaking layers (though see
  [I34](#i34) for the duplicate-key side effect).
- **GeoJSON fetch has real error handling** — `WorldMap.jsx:11-25` checks `res.ok`, validates
  `features.length`, and renders an error branch.
- **Routing is clean.** Every `to="/…"` in Home, SkillsPage and NotFound resolves to a route
  registered in `main.jsx`. No dead links; no orphaned routes beyond the intentionally
  deep-linked curriculum paths. `NotFound` correctly branches on `isRouteErrorResponse`.
- **Theme persistence round-trips** correctly via `localStorage`.
- **WordBuilder is clean** — distractors exclude then re-add the answer exactly once (no
  duplicate options, no key collisions), the timeout is cleaned up, the click/timer race is
  guarded, and all 10 CVC words are spelled correctly.
- **No page-body horizontal overflow** on Home/Skills at 1200px; both grids use
  `auto-fit`/`minmax` correctly.
- **Counting challenge answers are correct** — CFB1: `27 - [6,9,10,13,16,11]` =
  `21,18,17,14,11,16`, all present on the rendered 11-30 number line. CFB2: all 10 correct and
  every answer appears in its own options.
- **Other word data is correct** — the remaining 35 Opposite Match pairs and 14 Synonym
  Safari pairs check out; no word other than `old` ([I7](#i7)) appears in more than one pair.
- **`writtenNumber` handles its full `1…775840` range**; `MAX_ALLOWED` is a real library
  limit, not an arbitrary cap.
- **No other unbounded `while` loops.** All five in the repo are accounted for:
  [I1](#i1) (live freeze), [I31](#i31) (latent ×2), `FlagFinder.jsx:22` (safe — needs 4 of 25+
  countries), and the already-fixed `generateQuestion.js`.
