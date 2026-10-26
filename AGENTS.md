**Model selection:** Always use the model most appropriate for the task, even
if it is not the strongest available model. Match capability and reasoning
effort to the task’s complexity and risk, balancing quality, speed and cost.
When model selection is available, choose accordingly; when it is not, state
that limitation rather than claiming to switch models.

# Learn with Bix — agent guide

React + Vite learning app for 6–8 year olds. Two modes: **Skills Mode**
(standalone, ungated mini-games) and **Curriculum Mode** (gated, progress-tracked
UK National Curriculum path).

The working guides are the skills in `.claude/skills/`. Claude Code loads them on
demand; other agents (Codex, Cursor, Copilot, Gemini) should read the `SKILL.md`
as plain Markdown. **Read the matching one before starting — this file
deliberately does not repeat them.**

| Task | Skill |
|---|---|
| Build all 4 challenges for a curriculum topic | `building-curriculum-topics` |
| Add or fix a single curriculum challenge | `add-curriculum-challenge` |
| Add a new year group or subject | `add-curriculum-year` |
| Add a Skills Mode mini-game | `add-skill-game` |
| Add another real star system to the Solar System page | `add-star-system` |
| Touch progress, persistence, or unlock rules | `curriculum-progress` |

Stack, architecture, commands and current state: `docs/PROJECT_KNOWLEDGE.md`.
Backlog: `docs/PROJECT_IDEAS.md`. Deployment: `render.yaml` and `docs/PROJECT_KNOWLEDGE.md` §6 item 17.

## Non-negotiables

1. **Learner progress is irreplaceable** — browser-only, no backup, no export.
   Never change the stored shape, the storage key, or an unlock rule without
   reading the `curriculum-progress` skill first.
2. **`docs/curriculum/` decides what we teach.** It holds the statutory
   programmes of study verbatim, with each of our topics mapped to the
   requirement it serves. Read a topic's row before writing its questions, and
   never paraphrase statutory text when saving a new programme of study.
3. **Both themes, large touch targets.** Colour comes from the `--light-*` /
   `--dark-*` tokens in `App.css`; the audience is 6–8 years old.
4. **Prove it works before calling it done** — a written file is not a working
   change. `npm run lint`, `npm test` and `npm run build` must pass; see
   "Browser checks and subagents" for when a browser pass is needed too.

## Browser checks and subagents

**Browser (Playwright) checks are a last resort.** Prove a change with lint,
tests and the build first, and add or extend a test before reaching for a
browser. `tests/components/` playthrough tests drive whole challenges in jsdom.
Open the browser only for what jsdom cannot show: canvas, WebGL and 3D scenes,
real layout or overlap, drag, maps. Then make it one batched pass, with every
viewport and both themes in one script. Fix everything it shows, confirm with
at most one more pass, and say in the report what was not checked in a browser.

**Subagents only when they pay for themselves:** independent work that can run
in parallel, or a broad search whose file dumps you don't need. Never for work
you can do in a handful of tool calls. Give each the cheapest model that can do
it well: haiku for search and lookup, sonnet for routine building and checks,
opus only for hard reasoning, or a review where a miss is costly. At most 2 at
once.

# Browser Inspection

When working on frontend tasks, use browser inspection or browser automation only if those tools are actually available in the current VS Code AI session.

If browser tooling, Node REPL controls, or an in-app browser control surface are unavailable:

Do not stop the task.
Do not treat it as an application error.
Do not modify the project purely to work around the missing AI/browser tooling.
Continue using the codebase, terminal, tests, linting, type checks, and build output.
If visual verification is still needed, state that browser verification could not be completed in this session.

Do not repeatedly retry unavailable browser tooling unless explicitly asked.