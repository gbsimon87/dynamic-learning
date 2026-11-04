# Delivered changes

Record delivered outcomes here, newest first, with useful verification and
remaining review limits. Keep current architecture/scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and its focused references; upcoming
work belongs in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Implementation history before
2026-11-03 is in git history (`docs/PROJECT_KNOWLEDGE.md` at commit `fd4bc37`).

## 2026-11-04 — Ocean Explorer merged into dev

The `feat/underwater` branch (built 2026-10-29) is merged. Ocean Explorer is a
3D Skills Mode world at `/skills/ocean-explorer`, with its preview guide at
`/learn/ocean-explorer`. It is the second explorable world on the Solar System's
concept, sharing the new world kit in `src/components/worlds/`:

- **Phase 1:** a stationary submarine you can view, zoom and reset.
- **Phase 2:** manual steering with the Solar System's joystick and keys.
- **Phase 3:** orbit a coral reef and read its card.
- **Phase 4:** swimming sea life, now 12 species and 85 animals across nine reefs.

How it works is in [EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md); the
[design](superpowers/specs/2026-10-29-ocean-explorer-design.md) and phase plans
are in `docs/superpowers/`. Remaining work is idea #44. The course-checker
backlog item it collided with is now #45. Owner review of the sea-life facts and
physical-device review are pending.

## 2026-11-04 — Year 6 Science, and Years 5–6 award membership

- Registered Year 6 (Science only so far): 5 strands, 24 topics, 96 challenges
  in the Science adventure frame, mapped verbatim in
  [year-6-science.md](curriculum/year-6-science.md). New figures: circuit
  diagrams with standard symbols, light paths, a periscope, shadows and the
  circulatory system. Year 6 is offered in profiles, signup and the picker, with
  a public guide. [Course record](superpowers/2026-11-04-year6-science-course-build.md).
- Year awards (owner decision): Years 5 and 6 count Maths, English and Science.
  Year 5 History no longer counts, which removes a requirement and revokes
  nothing. Year 6 Science stays excluded until Year 6 Maths and English exist.
- Lint, full tests (2,634 unit/API and 662 component passes; four existing
  skips), build and `check:course --year 6 --subject science` (24/24) passed.
  The new figures had one batched browser pass, at desktop and phone widths in
  both themes. No teacher content review, safeguarding read or device review yet.
- Token usage was counted from the session logs, one entry per message. It is
  recorded in the course record and as the first row of
  [Measured builds](BUILD_MEASUREMENT.md#measured-builds). From it,
  [AUTHORING.md](AUTHORING.md#course-builds-with-content-agents) gained a
  recipe for building a course with content agents and a checklist for adding
  another Year 6 subject. There is also a reusable
  [strand agent brief](superpowers/templates/strand-agent-brief.md).

## 2026-11-04 — Authoring follow-ups

- `BUILD_MEASUREMENT.md` now gives tool-neutral token-recording rules instead
  of OpenAI/Codex-specific commands.
- Course timer records in `docs/authoring/timings/` are git-ignored; final
  totals go in the course record.
- Removed the skill's `references/visual-recipes.md` pointer; links now go
  straight to `docs/VISUAL_RECIPES.md`.
- Backlog #45 tracks bank-checker adapters for the 140 structure-only topics.
- Removed the dated `docs/history/` project-knowledge archive and the branch
  review record; links now point to current docs. The archive's still-current
  coding rules moved to `ENGINEERING_RULES.md`. Earlier detail remains in git
  history (`docs/PROJECT_KNOWLEDGE.md` at `fd4bc37`).

## 2026-11-03 — Full course-building branch review

Reviewed all tracked and untracked work on `feat/improve-course-builds` against
`dev`. Fixed History image-root false failures, internal game-topic aliases,
incompatible envelope/custom-control scaffolds and the existing statutory
licence/license spelling exception. Added regression coverage and corrected
stale progress/deployment guidance.

The first-context guide now has direct, AI-tool-neutral paths for Curriculum
courses and standalone Skills Mode games. Added `SKILLS_AUTHORING.md`, promoted
the visual catalogue into `VISUAL_RECIPES.md`, and documented complete new-course
integration. The entry guide is 1,590 words; the full earlier content remains in
the archive. Bank-checker coverage gaps are tracked as backlog #45.

Lint, full tests (2,627 unit/API and 655 component passes; four existing skips)
and build passed. All 749 topics were swept: 609 passed bank checks over 50
seeds per slot; 140 bespoke topics passed structural checks with their generic
bank-coverage limits explicit. No unexpected failures remained. Source comments
changed in `render.yaml`/`server/email.js`; runtime configuration/behaviour did
not. No commit, deployment, live-data write or new browser/device review occurred.

## 2026-11-03 — Focused project knowledge and build measurement

- Replaced the 45,713-word project knowledge file with a 1,457-word current
  builder guide. Preserved the complete earlier content, with relative links
  rebased, in a clearly labelled historical archive. Split out current
  architecture, curriculum inventory and operations/outstanding review.
- Added direct routes to subject skills, maintained implementation examples,
  visual teaching recipes, commands and exact statutory context. Updated
  maintenance instructions so future outcomes go here instead of growing the
  entry guide into a chronology again.
- Documented official OpenAI token reporting: CLI session/account commands,
  completed-turn JSON usage events, app/IDE context-versus-token distinctions
  and the limits of the local duration timer. No previous or current unobserved
  token counts were inferred.
- Documentation/source review only; no app behaviour, learner records,
  deployment settings or live services changed. Full pre-split content was
  checked against the archive after declared link rebasing; local guide links
  and anchors resolve, and all 32 pathways/749 topics/2,996 slots match the
  current source inventory. Six skill frontmatters are valid. Lint, the full
  suite (2,625 unit/API and 655 component passes, four existing skips) and the
  build (62 public pages prerendered) passed. No browser pass was needed for
  documentation-only changes; live services and physical devices were not checked.

## 2026-11-03 — Curriculum authoring workflow and tools

The authoring work immediately preceding the documentation split delivered
`topic:context`, `scaffold:topic`, `check:topic`, `check:course` and `course:timer`.
The matching skills, compact topic/course templates and visual recipes now guide
future builds through existing subject engines and current illustrated teaching.
Scaffolds preview first, refuse overwrites and preserve subject visuals; empty
generic banks fail tests. Bank adapters reuse available subject validators;
unsupported checks and remaining review gaps are explicit.

The timer persists work/pause intervals across sessions without claiming token
usage. An existing Opposite Match test was made deterministic after a random
positional assumption produced a false failure. Immediately before this split,
lint, build and the full suite passed: 2,625 unit/API checks, four existing skips
and 655 component checks. All 749 topic mappings were found, representative
Year 5 checks covered twelve subjects, and a full Year 5 Science check passed.
No browser pass was needed for tooling/docs; course device/content review is
separate. The current workflow is in [AUTHORING.md](AUTHORING.md).
