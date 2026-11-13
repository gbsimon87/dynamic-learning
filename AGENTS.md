**Model selection:** Always use the model most appropriate for the task, even
if it is not the strongest available model. Match capability and reasoning
effort to the task’s complexity and risk, balancing quality, speed and cost.
When model selection is available, choose accordingly; when it is not, state
that limitation rather than claiming to switch models.

# Learn with Bix — agent guide

React + Vite learning app for 6–8 year olds. Two modes: **Skills Mode**
(standalone, ungated mini-games) and **Curriculum Mode** (progress-tracked UK National Curriculum path; all built
challenges are open).

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

To build a subject for a year, the owner pastes the prompt in
`docs/templates/course-start-prompt.md`. Project workflows for any AI
tool: Curriculum courses/challenges in `docs/AUTHORING.md`; standalone Skills Mode games in `docs/SKILLS_AUTHORING.md`.

Start with `docs/PROJECT_KNOWLEDGE.md`, the short current guide. It links to
architecture, commands, inventory, maintained examples and task-specific sources;
load only the references needed. Docs hold only what is true now and what is
still to do: no changelogs, dated build records or trackers (git keeps history).
Upcoming work goes in `docs/PROJECT_IDEAS.md`. Deployment: `render.yaml` and
`docs/OPERATIONS.md`. Coding rules from past bugs: `docs/ENGINEERING_RULES.md`.

## Non-negotiables

1. **Learner progress is irreplaceable** — production uses the API + MongoDB;
   local development defaults to the browser store. Never assume a reset is safe.
   Never change the stored shape, the storage key, or an unlock rule without
   reading the `curriculum-progress` skill first.
2. **`docs/curriculum/` decides what we teach.** It holds the statutory
   programmes of study verbatim, with each of our topics mapped to the
   requirement it serves. Read a topic's row before writing its questions, and
   never paraphrase statutory text when saving a new programme of study.
3. **Both themes, large touch targets.** Colour comes from the `--light-*` /
   `--dark-*` tokens in `App.css`; the audience is 6–8 years old. Future topics
   retain the built years' visual teaching approach: illustrated introductions,
   worked examples and useful question models/manipulatives. Follow the
   project reference `docs/VISUAL_RECIPES.md` and the matching subject renderer.
4. **Prove the change at the right scope** — use focused checks during development
   and at intermediate handoffs. Run `npm run lint`, `npm test` and `npm run build`
   once when the final implementation is ready for merge/release; repeat only
   checks warranted by later changes, failures or unresolved risk. Progress,
   accounts and shared infrastructure need broader regression checks immediately.
   Follow `docs/VALIDATION.md`; report deferred final checks explicitly.

## Browser checks and subagents

**Browser (Playwright) checks are a last resort.** Use affected lint/tests first,
adding or extending a meaningful test where needed; build if the browser target
requires it. Follow `docs/VALIDATION.md` for when the full validation set is due.
`tests/components/` playthrough tests drive whole challenges in jsdom.
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

## Authoring records

Use `docs/templates/` for topic briefs, strand-agent briefs and the working
course record. Working notes for a build live in gitignored `.superpowers/` and
are discarded when it finishes; anything lasting goes into the reference it
belongs to (inventory, operations, architecture, authoring). Report what was
implemented, technically validated, content-reviewed and device-reviewed
separately. Automated checks cannot certify a child’s learning experience.
