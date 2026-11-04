---
name: add-curriculum-year
description: Add or extend a Learn with Bix curriculum year or subject through the existing registry, preserving permanent IDs, child progress and year awards.
---

# Add a curriculum year or subject

The registry already exists in `src/data/curriculumRegistry.js`: years 1–6 (Year 6 has Science only so far) and 12 subject definitions. Availability varies by combination; inspect the requested entry instead of rebuilding the registry or assuming every topic has challenges.

Use `docs/AUTHORING.md` and the course record in `docs/superpowers/templates/course-build.md`. Read `../curriculum-progress/SKILL.md` before changing persistence, identifiers, completion or award rules.

## Establish scope and integration

1. Check `CURRICULUM_YEARS`, `CURRICULUM_SUBJECTS`, `CURRICULA`, `findCurriculum` and `loadCurriculum`. Reuse an adjacent dataset's current shape. Keep unknown combinations on their existing unavailable path, never silently fall back to another year.
2. Save the authoritative programme of study verbatim in `docs/curriculum/`, with attribution, then map each proposed topic to its requirement. Separate statutory requirements, non-statutory guidance and product choices. Use an existing programme file when it covers multiple years; do not invent year-specific statutory statements.
3. Settle category titles and topic names before shipping: exports commonly recompute IDs with `toKebabCase`, ignoring handwritten raw IDs. Those IDs become URL and persisted progress keys. Treat shipped IDs as permanent; a rename is a migration task.
4. Register the dataset with exactly four challenge slots per topic, following current dataset conventions. Add the appropriate data/registry tests and update year/profile/subject entry points only where the requested new combination needs it.
5. Make year-award participation explicit. A registered curriculum defaults to counting unless `countsTowardYear: false`; adding unfinished subjects must not revoke an earned year certificate or milestone. Use `false` for staged rollout and preserve existing award membership until the product decision to include it is in scope. Building a topic never implies changing this flag.
6. For a whole subject, follow "Course builds with content agents" in `docs/AUTHORING.md`: integrate and pilot one strand, then brief at most two content agents with `docs/superpowers/templates/strand-agent-brief.md`. Build one representative topic using `../building-curriculum-topics/SKILL.md`, review its content and interaction, then apply the proven recipe to remaining topics. No-file topics can remain unavailable during incremental rollout; report this honestly.

## Preserve progress and verify

Progress is per `(childId, year, subject)` through the selected store. Production uses API + MongoDB; local development defaults to localStorage. Do not restore obsolete `${subject}Progress_year${year}` keys, alter old IDs, reset data, or infer gating from completion.

Extend tests to prove the new tree/registry lookup, unavailable combinations and missing-module fallback; existing child/year/subject progress remains intact; all built challenges remain open; and existing year awards are preserved. Test any new navigation/profile options through the existing component tests.

Follow `docs/VALIDATION.md`: use scoped topic, bank/playthrough and integration checks at pilot/strand handoffs; run full lint/tests/build once before merge/release. Rerun affected checks after fixes, broaden immediately for shared/progress changes, and report pending final checks. Browser work is only for justified gaps under `AGENTS.md`, using both themes and relevant viewports in one pass. Record unreviewed teaching content or physical-device experience separately from automated validation. Update `docs/CURRICULUM_INVENTORY.md`, current architecture references and the short `PROJECT_KNOWLEDGE.md` entry point as needed; record delivered scope/evidence in `docs/CHANGELOG.md` and remove finished backlog work.
