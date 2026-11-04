# Course build: Year <N> <subject>

- Request and deliverable: <new course, rollout, or revision>
- Timing record: <timer ID, recorded work/paused/elapsed time from `npm run course:timer -- report ID`>
- Measurement setup: <tool, coordinator model/reasoning, actual branch, known coordinator/resumed session filenames; no transcript contents>
- Token usage: <run course:usage after the timer stop; managed per-model/role summary and Measured builds row, or unknown with reason and required source; preserve raw counter names and cutoff coverage>
- Statutory source: <verbatim programme file and topic mapping>
- Registry/entry points: <current combination or explicit additions>
- Permanent IDs: <chosen before shipping; existing IDs preserved>
- Year-award participation: <preserve existing membership; staged additions explicitly false>
- Existing recipe: <subject game/bank, lessons, tests>
- Visual baseline: <currently built subject/year; illustrated notes/worked examples, question diagrams/manipulatives, theme and accessibility evidence>
- Pilot topic: <representative interaction and evidence before scaling>

| Topic ID | Brief | Four slots / lessons implemented | Technical evidence | Content/device review remaining |
|---|---|---|---|---|
| | | | | |

Validation: <focused checks and their scope/revision; topic adapters/limitations and playthroughs; full lint/tests/build once before merge/release, or explicitly pending at intermediate handoffs; affected reruns after fixes; browser only for justified gaps>

Progress/award regression evidence: <existing children/year/subject data and earned awards preserved where integration changed>

Remaining manual work: <child experience, physical touch/speech devices, owner decisions that cannot be inferred; no routine checks deferred>

Final status: <implementation, technical validation, content review and device/owner review stated separately; missing/unavailable topics explicit>

Save durable records under `docs/authoring/` or `docs/superpowers/`; disposable `.superpowers/` and `.sdd/` logs are not the source of truth.

## Completion measurement and retrospective

Run `npm run course:usage -- --timer <id> --branch <branch> --record <this-path> --topics <verified-topic-count> --write` after stopping the timer.
Use known `--session` paths if discovery is ambiguous. A paused pilot may take a
read-only snapshot; do not enter an unfinished course as a completed baseline.

- Delivered scope: <planned / built / verified topics, lesson and visual coverage>
- Rework observed: <pilot corrections, failed checks and reruns, file collisions>
- Comparability: <which earlier build has comparable scope/model/review; unknown gaps>
- Next-build changes: <one or two concrete actions and the evidence for each>
- Applied to shared workflow: <prompt/brief/checklist files changed, or none needed>

The collector appends/replaces its own marked usage block. Keep manual notes and
review conclusions outside that block. Never estimate missing time/token values.
