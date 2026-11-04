# Engineering rules

These patterns caused real bugs (most found in the 2026-08-21 audit), so they
are now rules. Apply current code, skills and [AGENTS.md](../AGENTS.md) where
they differ; for example, open curriculum access supersedes old gating, and
AGENTS.md decides when a browser check is justified.

**Checked in that audit and found correct**, so nobody re-investigates: the
REST Countries v5 endpoint and key (`v3.1` is deprecated); progress I/O
try/catch and the `hydrated` guard against a save-before-hydrate wipe; the
challenge loader's "not yet available" fallback; the Leaflet lifecycle (no
manual `L.map()`, `key={mode}` remounts); GeoJSON fetch error handling; every
`to="/…"` link resolving to a route; theme persistence; WordBuilder's
distractors and timers; `writtenNumber`'s full `1…775840` range (a library
limit); and every `while` loop in the repo accounted for.

## Never sample in an unbounded loop
`while (arr.length < n) { pick a random candidate; keep it if valid }` **froze the browser
three separate times** in this codebase, and was one data row from a fourth. If the valid
candidate pool can be smaller than `n`, the loop never ends.

**Instead:** enumerate the candidate pool up front, or shuffle-and-slice. Both are bounded by
construction.

Fixed instances: `generateQuestion.js`, `FindTheMissingNumber.jsx`,
`CountingForwardsAndBackwardsChallenge{3,4}.jsx`, `FlagFinder.jsx`.

## Answer options must be non-negative whole numbers
Distractors are filtered to `>= 0`, so a generator that can produce a negative or fractional
answer creates an impossible question. Build expressions **backwards from a chosen answer**
rather than generating-then-rejecting.

Distractor spread should also **scale with the answer** — a fixed ±5 window makes a 4-digit
product obvious by magnitude.

## Never drive a paired slider with a reactive DOM `min`/`max`
`min={otherValue + 1}` pushes the input's *rendered* value without updating state, so the
label, the slider and the state all disagree. **Clamp in state on commit instead** — see
`MathPractice.handleMinChange`.

## Progress unlocking must check identity, not count
`challengeIndex === completed.length` bricked the whole curriculum on any gap in the saved
array, with no repair UI. Ask "is everything *before* this complete?" using a `Set` of ids.
Likewise `completed.length === total` is not completion — check membership.

## Inline styles need CSS-variable tokens, not literals
Inline styles cannot carry `body.dark` overrides. Hardcoded colours left ShapeQuiz and the
World Map HUD light-only in dark mode. Define `--token` pairs in `App.css` (light in `:root`,
dark in `body.dark`) and reference them from the inline style.

## Theme classes go on `<body>`
Any stylesheet scoped to `.App.dark` was **dead** — that element no longer renders. Use
`body.dark`. And when setting the class, use `classList.remove(...)` / `add(...)`, never
`className = ''` (which destroys Leaflet's own body classes).

## The accent colour is a BACKGROUND, never body text
Found again 2026-09-15 on the new `/profiles` heading, which used
`color: var(--pf-accent)` and measured **2.66:1** in light theme — the exact figure
already documented in `App.css`. The accent pink only works as a *fill*, with
`--on-*-accent` ink on top. Reach for `--*-text` for headings and copy.

Both agents that wrote this screen computed contrast from the token values and believed
it passed; only measuring the live computed styles caught it. Measure, don't derive.

## Text on the accent colour must use `--on-*-accent`
`white` on `--light-accent` is only 3.17:1. The dark ink reaches 5.46:1 on the same pink. Also
**lighten** accent hovers rather than darkening them, or the ink falls below AA again.

## Every timer needs a ref and a cleanup
Untracked `setTimeout` fired after unmount, after mode switches, and twice per click when
scheduled *inside* a state updater (StrictMode runs updaters twice). Store the handle in a ref,
clear it on unmount, and supersede rather than stack.

## Full-viewport pages must subtract the navbar
`height: 100dvh` below a sticky navbar overflows and triggers hide-on-scroll jitter. The navbar
publishes its measured height as `--navbar-height`; use
`calc(100dvh - var(--navbar-height))`. Don't hardcode a pixel guess — it is 63–76px depending
on viewport.

## Fixed pixel heights and animation distances must share a variable
A hard `440px` field with `-460px` keyframes drifted apart and overflowed small phones. Drive
both from one custom property (`--field-h`).

## Only reveal on a correct answer
The World Map marked the target as "found" on wrong answers too, so a child could complete
every country having answered them all wrong.

## CSS is global — scope it
`.wrapper`, `.score`, `.prompt`, `.optionBtn` are each defined in several files; the last one
bundled wins app-wide, so screens render differently depending on visit order. New components
must scope every rule under a unique root class. ⚠️ Retro-fitting this is **still partly
outstanding** (§6 item 15) — and do it file by file with visual checks: an automated regex pass emptied
`MathPractice.css`.

## The REST Countries v5 API defaults to 25 records per page
Flag Finder was quizzing 25 of 254 countries. Request `limit=100` (supported on
the free plan), render usable pages progressively, and follow `data.meta.more` using `offset`, pause
~120ms between pages (bursts get rate-limited, and the throttled response carries **no CORS
headers**, surfacing as an opaque `TypeError: Failed to fetch`), and keep partial results rather
than failing the whole load.

## Verify in the browser, not just in the unit
Several bugs only appeared in the real app: the Word Sorter never re-dealt, the counting inputs
were invisible in dark mode, and the map scored wrong answers as found. Contrast in particular
must be **measured** from computed styles — the target is WCAG AA **4.5:1**.
