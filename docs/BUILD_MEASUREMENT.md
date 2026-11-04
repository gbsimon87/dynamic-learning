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

Token reporting depends on the AI tool and changes between versions, so this
project documents no tool-specific commands. Use whatever usage report or
export the tool you are using provides, and record in the course record which
tool, model and report the numbers came from.

- Keep input, cached input and output as separate columns where the tool
  reports them. Cached input is a breakdown of input, not an extra amount.
- Include subagent or resumed-session usage only when its coverage is known,
  and never count an aggregate and its parts twice.
- A context-window or rate-limit percentage is not a count of tokens spent.
- When no suitable total is available, record tokens as **unknown**. Never
  estimate from words, file sizes or context percentages, and never report a
  missing count as zero.
- Token counts alone do not establish cost or equal work across models.
- Keep raw transcripts outside the public repository.

### Counting from a session log

When the only source is a per-message log, apply these rules. The Year 6
Science count followed them.

- **Count each message once.** A log may write one reply as several entries
  that repeat the same usage. Group by the message's ID and keep one entry; a
  raw sum over entries counted the Year 6 Science build almost twice.
- **Use the build's window.** Keep messages from the build's branch between
  the timer's start and stop. Leave out earlier unrelated work in the same
  session and questions asked after the timer stopped.
- **Add subagent logs separately.** Check they do not repeat the coordinator's
  messages, then report coordinator and subagent rows by model.
- **Record the source, not the transcript.** Name the log files, the window and
  the counting rule in the course record.

## Measured builds

The first measured build is the baseline; compare only builds of similar scope.
Per-topic figures divide the totals by verified topics. Tools report usage
differently: leave a column blank or write "unknown" when a tool does not report
it, and never convert one tool's figures into another's.

| Build | Tool and models | Topics | Work time | Messages | Input | Cache write | Cache read | Output | Record |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| Year 6 Science (2026-11-04) | Claude Code: Opus 5.5 coordinator, two Sonnet 5.5 content agents | 24 | 23 min 21 s | 121 | 242 | 710,510 | 21,519,577 | 257,420 | [course record](superpowers/2026-11-04-year6-science-course-build.md) |

What the baseline showed:

| | Topics | Output per topic | Cache read per topic | Context re-sent per turn |
|---|---:|---:|---:|---|
| Coordinator (pilot strand, figures, integration, review, docs) | 4 | about 22k | about 4.7M | 206k on average, rising from 81k to 289k |
| Two content agents (one strand pair each) | 20 | about 8k | about 128k | 39k at the start, about 170k at the end |

Most of the cost was the coordinator re-sending a large context on every turn.
[Course builds with content agents](AUTHORING.md#course-builds-with-content-agents)
turns this into practice.

## Build record

Use the [course template](superpowers/templates/course-build.md). Record timer
ID, observed token counters/source and coverage gaps, scope/model, corrections
after first implementation and final technical/content/device evidence.
Report time/tokens per verified topic when useful, while retaining the raw
totals. Implementation, content quality and review coverage must not shrink to
make a measured build appear cheaper.
