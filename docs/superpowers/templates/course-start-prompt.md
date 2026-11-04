# Build a curriculum subject: the prompt and your steps

This is the one file to use when you want a subject built for a year. Copy the
prompt, change the year and subject, and paste it into a fresh session of any
AI coding tool. The AI takes it from there using the docs, scripts and
`docs/superpowers/` templates. Your own steps are below the prompt.

## The prompt

Change only `YEAR` and `SUBJECT` (for example `6` and `Maths`). The prompt
carries everything a fresh session needs; the files it names hold the detail.

```text
Build Year YEAR SUBJECT for Learn with Bix.

== What this is ==
Learn with Bix is a React + Vite learning app (repository: the current working
directory). Curriculum Mode teaches the UK National Curriculum, year by year and
subject by subject. A "subject" here is one year/subject pathway: categories
(strands), each with topics, each topic with exactly four challenges. Write for
children of that year group (Year 6 is ages 10–11), in British English.

== Start and measure ==
Inspect the branch/worktree first; preserve existing work and do not reset it.
Create feat/yearYEAR-<subject id> from the current branch. Start
npm run course:timer -- start yearYEAR-<subject id> before substantial reading.
For a resumed build, reuse its recorded branch/timer and resume it; never restart
or overwrite a timer. Pause before yielding to me; resume immediately on my reply.
Record the AI tool, coordinator model/reasoning, build branch and known session
filenames in the course record. Read docs/BUILD_MEASUREMENT.md's Token usage
section; at completion run course:usage yourself for this build's Claude logs.
Do not use another session/tool's logs to fill missing counters.

== Read next, in this order (by line range; do not dump whole files) ==
1. AGENTS.md: the non-negotiables and the rules for browser checks and subagents.
2. docs/AUTHORING.md, sections "New course integration", "Course builds with
   content agents" and "Adding another subject to a registered year".
3. .claude/skills/add-curriculum-year/SKILL.md (plain Markdown if your tool does
   not load skills), and .claude/skills/curriculum-progress/SKILL.md before
   touching IDs, the registry's award flags or anything stored.
4. docs/curriculum/README.md, to find this subject's statutory file(s).
5. docs/CURRICULUM_INVENTORY.md, "Awards and introductions".
6. This subject's nearest built year: one representative bank, game/renderer,
   lesson and test. Use the Year 6 Science course record for workflow evidence
   only; do not load all its banks for a Maths/English or other-subject build.
   Load additional references only when needed for the current strand.

== Facts to get right ==
- Subject IDs: math, english, science, history, geography, art, computing,
  design (Design & Technology), french, music, pe, wellbeing (Relationships &
  Health). Use the ID in file names, the registry and the timer.
- Statutory text in docs/curriculum/ is the teaching boundary. Quote it
  verbatim in the mapping; never paraphrase it. Key stage files cover several
  years: follow any year split they record. If none is recorded for this year,
  propose one with the topic list.
- Model the build on this subject's nearest built year (usually Year YEAR-1):
  its dataset, game or engine, picture renderer, lessons and tests. Maths and
  English also have separate Bix lesson screens in src/data/lessons/<subject>/.
  Aim for a similar number of topics to that year unless the statutory text
  needs more or fewer.
- Settle topic/category titles before building. Check the actual toKebabCase
  output; titles become permanent URL and progress IDs. Every displayed quest
  name, including the text after a Number/Geometry prefix, starts with a capital.
- Learner progress is irreplaceable: never reset, migrate or rewrite stored data.
- Year awards: Years 5 and 6 count Maths, English and Science only. Register
  this subject with countsTowardYear: false. If it completes Maths, English and
  Science for this year, stop and ask me before switching those three to count.
- Subagents: at most two at once, on a cheaper capable model for writing banks;
  keep the stronger model for review. Browser checks only for what tests cannot
  show, in one batched pass.

== Steps ==
1. Create the durable course record from docs/superpowers/templates/course-build.md.
   Keep a compact list of completed work, owned files, commands/results and next
   action there so resumed sessions do not have to rediscover the build.
2. Propose the categories and topic titles, each with its statutory
   requirement, and anything you will deliberately leave out. Stop for my
   approval.
3. Integrate the subject (dataset, registry, the lists in "Adding another
   subject to a registered year", certificate lines, public guide, ID test) and
   build one strand completely, with its pictures, lessons where the subject
   uses them, bank tests and a playthrough test. Check signup/selector/guide
   counts, staged availability, future-year test fixtures, lesson reading limits
   and the generic bank adapter before scaling. Give exact file ownership to
   parallel agents. Follow docs/VALIDATION.md: use focused lint, bank/playthrough
   and integration checks for the pilot; report the final full checks as pending.
   Stop and tell me the exact steps to try it with npm run dev.
   Planned topics must stay unavailable and be described honestly in guides.
4. Write the remaining strands, one bank file per strand. If you can run
   subagents, brief them with docs/superpowers/templates/strand-agent-brief.md.
   Include the accepted pilot corrections in each brief and use the subject's
   actual bank/lesson contracts, answer ranges and input capacity. Require one
   complete topic to pass scoped checks before each agent scales its strand.
   If agents are unavailable, write the strands yourself one at a time. Keep
   coordinator context small: agents return counts, checks and uncertainties;
   inspect every bank for review, not repeated whole-file context dumps.
5. Review every bank: facts, one defensible answer, safeguarding for sensitive
   topics, and the answer-length cue described in docs/AUTHORING.md. Independently
   recompute generated answers. Check that lesson examples match live controls,
   representation, ordering direction and rounding instructions. Track corrections
   and test reruns in the record; do not estimate time/token savings.
6. When the complete implementation is ready for merge/release, run
   npm run check:course -- --year YEAR --subject <subject id>, then the full
   npm run lint, npm test and npm run build once. Reuse passing results for
   unchanged code; after fixes rerun affected checks, broadening when shared
   changes or failures warrant it. Progress/accounts/shared infrastructure need
   broader regression checks immediately. Keep verbose output in temporary logs;
   inspect failures and summaries. Report unsupported adapters as gaps. Use one
   batched browser pass only for what tests cannot show (including new figures).
7. Record: fill in docs/superpowers/templates/course-build.md as
   docs/superpowers/<date>-yearYEAR-<subject id>-course-build.md. Add the
   statutory mapping table, and update docs/CURRICULUM_INVENTORY.md,
   docs/CHANGELOG.md and the inventory counts the docs quote. Stop the timer and
   paste its report into the record.
8. Collect usage automatically after stopping the timer:
   npm run course:usage -- --timer <timer-id> --branch <build-branch> --record <course-record-path> --topics <verified-topic-count> --write
   It discovers one Claude session plus its agents, deduplicates message IDs and
   filters the timer window; it updates both the record and Measured builds table.
   If discovery is ambiguous, use known --session paths (repeat for resumed
   sessions). Never hardcode another build's UUID or branch. With unavailable
   logs/another tool, record unknown and the reason; ask me only for the missing
   usage source. Never estimate, treat missing usage as zero, or add a raw sum.
9. Add the retrospective: scope/review coverage, observed rework and check reruns,
   comparable measurements, and one or two evidence-backed improvements for the
   next build. Apply those improvements to the shared prompt/brief when reusable.

Do not commit. Finish with: what was built, check results, what I must check by
hand, recorded duration and usage with coverage limits, and the next-build
improvements. Ask for usage only when automatic collection is unavailable.
```

## Your steps

**Before you paste the prompt**

1. Open a **new session** in your AI tool. An old session re-sends its earlier
   conversation on every turn, which was most of the cost of the first build.
2. Note which tool and models you are using; the record needs them.

**While it works**

3. When it stops with the **topic list**, read the titles carefully. They become
   permanent web addresses and saved-progress keys. Approve or correct them.
4. When it stops with the **pilot**, run `npm run dev` and play one or two of
   its challenges. Correct the style now, before it is copied to every topic.
5. If you step away for a while, tell it to pause the timer (or run
   `npm run course:timer -- pause <id>`, then `resume <id>`). Time you forget
   to pause counts as work.

**When it says it has finished**

6. **Check the recorded usage.** The agent should run `course:usage` and update
   the course record and Measured builds table automatically for Claude Code.
   Check the source sessions, branch and window. If it reports a missing source,
   give the exact coordinator JSONL path (and any resumed sessions), or provide
   your other tool's exported usage with its coverage. The agent must count
   messages once and keep unavailable counters unknown. A raw `cat | jq -s` sum
   can double-count replies and include unrelated work. Do not paste transcripts.
7. Do the checks only a person can do: read the questions as a teacher would,
   read sensitive topics (health, safety, relationships) yourself, try it on a
   phone or tablet, and, if you can, watch a child play it.
8. Commit and merge when you are happy.

## Only fixing or adding one topic

Use this shorter prompt instead:

```text
Build (or fix) the Learn with Bix topic TOPIC-ID in Year YEAR SUBJECT
(SUBJECT as its ID: math, english, science, history, geography, art, computing,
design, french, music, pe or wellbeing).
Read AGENTS.md and follow .claude/skills/building-curriculum-topics/SKILL.md
(as plain Markdown if your tool does not load skills). Start with
npm run topic:context -- --year YEAR --subject SUBJECT --topic TOPIC-ID and keep
inside the statutory requirement it shows. Never change the topic's ID or any
stored progress. Follow docs/VALIDATION.md: lint affected files, run relevant
bank/playthrough/integration tests and npm run check:topic -- --year YEAR
--subject SUBJECT --topic TOPIC-ID. Add tests for meaningful behavioural risks,
not cosmetic wording. Full lint/tests/build runs once before merge/release;
broaden immediately for shared/progress changes. Do not commit; tell me what
changed, check results, pending final checks and what to check by hand.
```
