# Engineering rules

Each rule comes from a real bug. Where current code, skills or
[AGENTS.md](../AGENTS.md) differ, they win.

**Already verified correct — don't re-investigate:** the REST Countries v5
endpoint and key (`v3.1` is deprecated); progress I/O try/catch and the
`hydrated` guard; the challenge loader's "not yet available" fallback; the
Leaflet lifecycle (no manual `L.map()`, `key={mode}` remounts); `writtenNumber`'s
`1…775840` range (a library limit).

## Logic

- **Never sample in an unbounded loop.** `while (arr.length < n) { pick random; keep if valid }`
  froze the browser three times: if the valid pool is smaller than `n`, it never
  ends. Enumerate the pool up front, or shuffle and slice.
- **Answer options are non-negative whole numbers.** Distractors are filtered to
  `>= 0`, so a negative or fractional answer makes an impossible question. Build
  expressions backwards from a chosen answer. Scale distractor spread with the
  answer; a fixed ±5 window gives away large answers by magnitude.
- **Check identity, not count.** Completion and "is everything before this done?"
  use a `Set` of IDs, never `completed.length`.
- **Only reveal on a correct answer.** Never mark a target found after a wrong
  answer.
- **Paired sliders clamp in state on commit** (see `MathPractice.handleMinChange`),
  never via reactive DOM `min`/`max`, which desyncs label, slider and state.
- **Never key anything by `Function.name`**: production minification renames
  it. Use explicit identifiers (`teacherPractice/year2Builders.js` uses `source`;
  `allYearsCoverage.test.js` minifies the adapter to prove it).
- **Every timer has a ref and a cleanup.** Store the handle, clear on unmount,
  supersede rather than stack, and never schedule inside a state updater
  (StrictMode runs it twice).

## Styling and themes

- **Theme classes go on `<body>`** (`body.dark`), set with `classList.add/remove`,
  never `className = ''` (it destroys Leaflet's body classes).
- **Inline styles use CSS-variable tokens**, defined as pairs in `App.css` (light
  in `:root`, dark in `body.dark`); inline literals cannot follow dark mode.
- **The accent colour is a background, never text.** Accent pink on light is
  2.66:1. Text on accent uses `--on-*-accent`; headings and copy use `--*-text`.
  Lighten accent hovers rather than darkening them.
- **Measure contrast from computed styles**, don't derive it from token values.
  Target WCAG AA 4.5:1.
- **CSS is global — scope it.** Classes like `.wrapper`, `.score`, `.prompt` exist
  in several files and the last bundled wins. Put every new rule under a unique
  root class. Retro-fit old files one at a time with visual checks (an automated
  regex pass once emptied `MathPractice.css`).
- **Full-viewport pages subtract the navbar:** `calc(100dvh - var(--navbar-height))`;
  the navbar publishes its measured height (63–76px).
- **Fixed heights and animation distances share one custom property** so they
  cannot drift apart on small phones.

## External data

- **REST Countries v5 pages 25 records by default.** Request `limit=100`, render
  usable pages progressively, follow `data.meta.more` with `offset`, pause ~120ms
  between pages (throttled responses lack CORS headers and surface as
  `TypeError: Failed to fetch`), and keep partial results.
