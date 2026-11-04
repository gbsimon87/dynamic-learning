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

Records persist in `docs/authoring/timings/`; `report --json` provides millisecond
totals. Recorded work is unpaused wall time, including AI/tool/test waits.
Unrecorded breaks count as work. This is not CPU time or token usage, and cannot
reconstruct an earlier unrecorded build. No Year 6 record starts merely by
reading these instructions.

## OpenAI-documented token reporting

In **Codex CLI**, `/status` reports session configuration and token usage.
`/usage` provides account activity, with daily/weekly/cumulative views where
available. In the **app/IDE** command section, `/status` is described as chat ID,
context usage and rate limits. A context-capacity or rate-limit percentage is
not a measurement of all tokens spent building a course. See the
[official command reference](https://learn.chatgpt.com/docs/developer-commands).

For a future **non-interactive CLI run**, OpenAI documents saving the JSONL
event stream with `codex exec --json`. Completed-turn events carry a `usage`
object including input, cached input and output counts. Example (this launches
the actual requested work, not a monitor of an existing app conversation):

```sh
codex exec --sandbox workspace-write --json "<your curriculum-building request>" > /tmp/year6.jsonl
jq 'select(.type == "turn.completed") | .usage' /tmp/year6.jsonl
```

The first line is a documented CLI invocation, not a command to run merely to
check an already-running build. See [OpenAI's non-interactive-mode guide](https://learn.chatgpt.com/docs/non-interactive-mode).
Keep raw transcripts outside the public repository; put observed totals and
their scope/source in the course record. If a run is resumed, capture its
additional turns too. Count each recorded event once and retain failed or
missing-usage gaps; a failed turn without usage must not be reported as zero.

Keep input, cached input and output as separate columns. Total input plus output
is the overall token measure; cached input is an input breakdown, not an extra
quantity to add. Record all relevant sessions/subagent usage only when its
coverage is established, without duplicating aggregate and child totals.
The [OpenAI usage schema](https://developers.openai.com/api/reference/resources/responses/methods/create)
distinguishes totals from input/output breakdowns. Token counts alone do not
establish monetary cost or equal work across different models.

The app-server protocol also documents
[`thread/tokenUsage/updated`](https://learn.chatgpt.com/docs/app-server)
for a client integration. This project has no integration with that live event
stream; the local build timer does not collect app-session tokens. When the
current surface exposes no suitable totals/export, leave tokens **unknown**
rather than estimating from words, file sizes or context percentages.

## Build record

Use the [course template](superpowers/templates/course-build.md). Record timer
ID, observed token counters/source and coverage gaps, scope/model, corrections
after first implementation and final technical/content/device evidence.
Report time/tokens per verified topic when useful, while retaining the raw
totals. Implementation, content quality and review coverage must not shrink to
make a measured build appear cheaper.
