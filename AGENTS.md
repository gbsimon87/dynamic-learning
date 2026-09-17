# Dynamic Learning — agent guide

A React + Vite learning app for 6–8 year olds. Two modes: **Skills Mode**
(standalone, ungated mini-games) and **Curriculum Mode** (gated, progress-tracked
UK National Curriculum path).

This file is for agents that do not load Claude Code skills (Codex, Cursor,
Copilot, Gemini). The canonical, longer guides live in `.claude/skills/*/SKILL.md`
and are plain Markdown — **read the relevant one before starting**:

| Task | Read |
|---|---|
| Build all 4 challenges for a curriculum topic | `.claude/skills/building-curriculum-topics/SKILL.md` |
| Add or fix a single curriculum challenge | `.claude/skills/add-curriculum-challenge/SKILL.md` |
| Add a new year group or subject | `.claude/skills/add-curriculum-year/SKILL.md` |
| Add a Skills Mode mini-game | `.claude/skills/add-skill-game/SKILL.md` |
| Touch progress, persistence, or unlock rules | `.claude/skills/curriculum-progress/SKILL.md` |

Background on architecture and current state: `docs/PROJECT_KNOWLEDGE.md`.
Backlog: `docs/PROJECT_IDEAS.md`.
**Curriculum content: `docs/curriculum/` — the statutory programmes of study,
verbatim, with each of our topics mapped to the requirement it serves.**

## Non-negotiables

1. **Learner progress is irreplaceable.** There is no backup. Never change the
   stored progress shape, the storage key, or an unlock rule without reading
   the `curriculum-progress` skill first.
2. **Challenge files are resolved by path convention, not routing.** A wrong
   filename fails silently — the learner sees "not yet available", with no build
   error. Compute the name (see the topic skill); never spell it by hand.
3. **A challenge never writes to storage.** It calls `onComplete()` and nothing
   else. `ProblemView` owns persistence.
4. **Compose the shared kit** in `src/components/challenge/` rather than copying
   an existing challenge. Per-challenge CSS for something the kit already styles
   is how 140 files drift apart.
5. **Both themes, every time.** Drive colour from the `--light-*` / `--dark-*`
   tokens in `App.css` and check light and dark before calling anything done.
6. **Touch targets are large.** The audience is 6–8 years old.
7. **Teach what the curriculum actually says.** Before writing questions for a
   topic, read its row in `docs/curriculum/year-<n>-<subject>.md`. The statutory
   wording sets the boundary — steps of 2, 3 and 5 start from 0; Year 2 fractions
   are 1/3, 1/4, 2/4, 3/4 only; time is told to five minutes, not the minute.
   Never paraphrase the statutory text when saving a new programme of study.

## Commands

```bash
npm run dev      # Vite dev server (may land on 5174 if 5173 is taken)
npm test         # node --test — pure logic only, no component test runner
npm run lint     # eslint
npm run build    # must pass before you call a change done
```

Tests are plain `node:test` + `node:assert/strict`. Keep logic that needs
testing in pure modules free of React and `import.meta` so it loads outside Vite.

## Verifying UI work

Curriculum routes sit behind `RequireChild`, so a child profile must be selected.
The store defaults to localStorage, so no backend is needed unless built with
`VITE_USE_API=true`. Challenge URL:

```
/year/{year}/{subject}/problem/{categoryId}/{topicId}/{challengeId}
```

Don't claim a UI change works because the file was written. Load it.
