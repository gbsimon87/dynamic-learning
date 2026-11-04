# Course-building branch review — 2026-11-03

## Scope

Reviewed `feat/improve-course-builds` against `dev`, including every tracked
dirty file and untracked addition. The branch starts at `fd4bc37` with no
additional commits; the feature work is in the working tree. Code/tooling and
documentation had separate read-only review passes, followed by fixes and
regression checks. No commit, deployment, learner-data change or new course was
performed by this review.

## Corrections delivered

- History image validation now uses `src/assets/history/images/`, matching the
  real renderer. The previous path falsely rejected 42 existing topics. Tests
  now cover a real topic with museum images and both missing/present fixture assets.
- Game scaffolding supports `--topic-key` for internal aliases such as Maths
  `place`, separate from permanent curriculum IDs. Generic scaffolding rejects
  story/envelope results and custom answer/control models that need their game.
- The English bank adapter preserves the existing Year 5 suite's narrow
  statutory `licence/license` exception without suppressing other spelling errors.
  Dictation is explicitly outside the generic response model.
- Corrected guidance on tolerant legacy progress reads, test-first persistence
  verification and superseded deployment findings. Current-maintained roadmap
  and source comments now route history/operations to their focused documents.
- Added a platform-neutral [Skills game workflow](../SKILLS_AUTHORING.md) and
  [visual recipe reference](../VISUAL_RECIPES.md). Expanded
  [Curriculum authoring](../AUTHORING.md#new-course-integration) with the actual
  year/subject/profile/public-guide/certificate integration points. The old
  agent visual-reference path remains as a small compatibility link.

## Entry guide and preservation

[PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md) is the first-context guide for any
developer/AI tool. Its 1,590 words route explicitly to Curriculum courses and
standalone Skills Mode games, their code examples, visual approach, statutory
requirements and checks. The earlier 45,713-word file is preserved in the
[dated archive](../history/PROJECT_KNOWLEDGE_2026-11-03.md). Comparing normalized
links confirmed every line from the branch's original committed document
survives, along with the earlier-session additions. New outcomes belong in the
changelog; current references remain separate from historical evidence.

## Validation and limits

- `npm run lint`: passed.
- `npm test`: 2,627 unit/API passes, four existing skips, 655 component passes.
- `npm run build`: passed; 62 public pages prerendered.
- All 32 registered pathways / 749 topics / 2,996 wrapper files were swept.
  609 topics passed supported bank validators, four slots × 50 seeds plus
  deterministic replay and available subject checks. 140 topics passed
  structural checks only, with no unexpected failures.

| Generic bank-adapter gap | Topics | Required evidence |
|---|---:|---|
| Years 2–3 Maths | 83 | Existing bespoke bank/game suites and playthroughs |
| Year 3 English, including dictation | 32 | Existing authored-bank/game tests |
| Year 3 Science | 21 | Existing enquiry/diagram/game tests |
| Dictation in Years 1, 2, 4 and 5 | 4 | Memory-game response-model tests |

These are declared tool-coverage limits, not new gameplay failures. The focused
checker must not report these as bank validation passes. Common Maths structure
checks also do not replace custom answer-acceptance or interaction tests.
This review added no learner-facing layout; no browser/device pass was needed.
It does not certify every authored fact, statutory coverage, physical-device
speech/touch, accessibility audit or live deployment. See subject trackers and
[operations](../OPERATIONS.md) for those outstanding evidence requirements.
