# Delivered changes

Record delivered outcomes here, newest first, with useful verification and
remaining review limits. Keep current architecture/scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and its focused references; upcoming
work belongs in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Older implementation history
is preserved in the [2026-11-03 archive](history/PROJECT_KNOWLEDGE_2026-11-03.md).
Do not append new work to that dated snapshot.

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
the archive. Read the [review record](authoring/2026-11-03-branch-review.md) for
scope, fixes and coverage limits.

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
separate. Detailed preceding work remains in the archive's
[authoring record](history/PROJECT_KNOWLEDGE_2026-11-03.md#questions-as-data-6-2026-10-10).
