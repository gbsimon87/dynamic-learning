# Dynamic Learning — agent guide

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
| Touch progress, persistence, or unlock rules | `curriculum-progress` |

Stack, architecture, commands and current state: `docs/PROJECT_KNOWLEDGE.md`.
Backlog: `docs/PROJECT_IDEAS.md`. Deployment: `docs/DEPLOYMENT.md`.

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
4. **Load the UI before calling it done** — a written file is not a working
   change. `npm run lint`, `npm test` and `npm run build` must pass.
