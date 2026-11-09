# Build time and token usage

Record one clear scope (for example all Year 6, or Year 6 Maths), model/reasoning
settings, delivered topics/bank sizes, visuals and verification. Compare work
only when those requirements are comparable. No earlier usage records means no
defensible historical saving percentage; the first measured build is a baseline.

## Time across sessions

The coordinating agent manages the timer when a course build begins:

```sh
npm run course:timer -- start year6
npm run course:timer -- pause year6
npm run course:timer -- resume year6
npm run course:timer -- stop year6
npm run course:timer -- report year6
```

Start once; pause when yielding/taking a break, resume when work continues, and
stop after the requested implementation and verification finish. Use another
ID for a different scope, such as `year6-math`. Never reset an old record or sum
overlapping coordinator/subagent timers. Finishing a timer does not approve content.

Records persist locally in `docs/authoring/timings/`, which is git-ignored: copy
the final report into the course record. `report --json` provides millisecond
totals. Recorded work is unpaused wall time, including AI/tool/test waits.
Unrecorded breaks count as work. This is not CPU time or token usage, and cannot
reconstruct an earlier unrecorded build. No Year 6 record starts merely by
reading these instructions.

## Token usage

Use `npm run course:usage` for local **Claude Code JSONL logs**. Other tools
must use their own reported counters/export; this helper does not interpret
Codex logs or infer missing usage. Run it yourself at completion rather than
asking the owner to assemble shell pipelines.

```sh
npm run course:timer -- stop year6-math
npm run course:usage -- --timer year6-math --branch feat/year6-math \
  --record docs/superpowers/2026-11-04-year6-math-course-build.md --topics 49 --write
```

Use the actual stopped timer, branch, record and number of **verified** topics.
The example is a command pattern, not a claim the current Maths pilot is complete.
Without `--write`, the command prints a read-only JSON summary. A paused timer
can provide an interim snapshot; only a stopped timer can write a measured-build
row. `--write` updates a managed usage block in the course record and inserts or
replaces its single row in the table below. It preserves existing manual notes.
Rerunning refreshes the same measurement rather than adding another build.

### Source discovery and coverage

- The default searches the current checkout's Claude project-log directory.
  It must find exactly one coordinator session with usage matching the branch
  and timer window. Older untouched session files are skipped.
- If discovery is ambiguous, use `--session /absolute/path/session.jsonl` for
  the intended coordinator file. Repeat `--session` for resumed sessions that
  belong to the same build. Each includes its adjacent `SESSION/subagents/*.jsonl`.
  Record known session filenames in the course record as you work. Never copy
  a previous build's session UUID, branch or timer into a new command.
- Missing/unreadable logs, malformed JSON and ambiguous sessions are reporting
  gaps. Complete the build, record usage as **unknown** with the reason, and ask
  only for the unavailable source/counters. Never substitute zero or scrape
  another tool's logs just because this repository was used in Claude before.
- Logs may not contain the current/final reply until it is flushed. Collect
  after verification and the timer stop, record the exact cutoff, and state that
  subsequent reporting is excluded. A later rerun can refresh the same block.
- Keep raw transcripts outside the public repository. The collector streams
  JSONL and prints counters/metadata only; do not `cat` full logs into AI context.

### Counting rule

Count globally by `message.id` across selected coordinator/subagent logs. For
repeated or cumulative streaming entries, retain the maximum observed value of
each usage counter once per message. Keep raw `input_tokens`,
`cache_creation_input_tokens`, `cache_read_input_tokens` and `output_tokens`
separate, grouped by logged model and coordinator/subagent role. Missing fields
remain unknown; a missing model is labelled unknown. These are reported counters,
not interchangeable token prices or a tool-independent total-input measure.

Only usage entries on the selected branch between the timer's `startedAt` and
`finishedAt` are included (paused snapshots use `updatedAt`). This **outer window
includes pauses**. Keep unrelated work on a separate branch/session. Work before
timer start, including the initiating request, and reporting after timer stop
are outside this measurement. Do not add aggregates to their constituent rows.
A context-window or rate-limit percentage is not usage; never estimate tokens
from words, file sizes or percentages.

### Why the owner's raw sum is not a build measurement

The owner's `jq -s` example summed every usage row on `feat/year-6`, including
repeated messages and all dates. It reported input 580, cache write 1,636,989,
cache read 58,986,318 and output 640,726. Preserve these only as an **unscoped raw
sum**, not as a new measured build or as a replacement for the Science baseline.

A read-only collector check of that same session and its agents using the
Science timer's exact window (00:24:39.965–00:48:01.037 UTC, 2026-11-04) found
118 unique messages: input 236, cache write 694,289, cache read 21,266,376 and
output 256,457. The original baseline below starts at branch creation
(00:24:29) and includes three additional messages. Its original provenance is
preserved; do not compare these two windows as an efficiency improvement.

## Measured builds

The first measured build is the baseline; compare only builds of similar scope.
Per-topic figures divide the totals by verified topics. Tools report usage
differently: leave a column blank or write "unknown" when a tool does not report
it, and never convert one tool's figures into another's.

| Build | Tool and models | Topics | Work time | Messages | Input | Cache write | Cache read | Output | Record |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| Year 6 Science (2026-11-04) | Claude Code: Opus 5.5 coordinator, two Sonnet 5.5 content agents | 24 | 23 min 21 s | 121 | 242 | 710,510 | 21,519,577 | 257,420 | [course record](superpowers/2026-11-04-year6-science-course-build.md) |
| Year 6 Geography | Claude Code: claude-sonnet-5-5 | 16 | 0h 12m 43s | 84 | 168 | 353,035 | 12,275,214 | 191,548 | [course record](superpowers/2026-11-08-year6-geography-course-build.md) |
| Year 6 History | Claude Code: claude-sonnet-5-5 | 20 | 0h 15m 38s | 109 | 218 | 425,485 | 15,788,074 | 206,050 | [course record](superpowers/2026-11-08-year6-history-course-build.md) |
| Year 6 computing | Claude Code: claude-opus-5-5 | 17 | 0h 11m 2s | 62 | 124 | 143,479 | 9,045,212 | 67,061 | [course record](superpowers/2026-11-09-year6-computing-course-build.md) |

What the baseline showed:

| | Topics | Output per topic | Cache read per topic | Context re-sent per turn |
|---|---:|---:|---:|---|
| Coordinator (pilot strand, figures, integration, review, docs) | 4 | about 22k | about 4.7M | 206k on average, rising from 81k to 289k |
| Two content agents (one strand pair each) | 20 | about 8k | about 128k | 39k at the start, about 170k at the end |

Most of the cost was the coordinator re-sending a large context on every turn.
[Course builds with content agents](AUTHORING.md#course-builds-with-content-agents)
turns this into practice.

## Build record

The completion workflow and owner fallback steps are in
[the course start prompt](superpowers/templates/course-start-prompt.md#your-steps).

Use the [course template](superpowers/templates/course-build.md). Record timer
ID, observed token counters/source and coverage gaps, scope/model, corrections
after first implementation and final technical/content/device evidence.
Report time/tokens per verified topic when useful, while retaining the raw
totals. Implementation, content quality and review coverage must not shrink to
make a measured build appear cheaper.

## Learn from each build

Before finishing, add a short retrospective to its course record:

- Scope and quality: built/verified topics, questions or generator cases, lessons,
  new visuals, content review and device review. Keep planned and playable counts separate.
- Rework: failures/corrections after the pilot, repeated full checks, unclear
  briefs or overlapping file ownership. Use observed events, not estimated savings.
- Measurement: per-model counters, exact source/window, missing coverage and whether
  it is comparable to an earlier build. Keep unknown values unknown.
- Next build: one or two concrete changes to the prompt/brief/checklist, with the
  evidence that prompted them. Apply reusable fixes to those source files now.

Early Year 6 Maths pilot lessons: check all integration fixtures before the final
suite (including public-guide availability and future-year references); ensure
lesson examples use the live task's representation/direction; capitalise displayed
quest names before the pilot; give parallel tasks exclusive filenames. These are
process observations, not measured token savings.

Validation efficiency policy: [VALIDATION.md](VALIDATION.md) uses focused checks
at pilot/strand/cosmetic handoffs and one full lint/tests/build pass before merge
or release. Broader regressions run immediately for shared/progress changes.
Record check scope, failures/reruns and any pending final checks; keep long logs
out of the conversation. This policy reduces repeated work without claiming
unmeasured time or token savings.
