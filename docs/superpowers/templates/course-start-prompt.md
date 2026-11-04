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

== Read first, in this order (read by line range; do not dump whole files) ==
1. AGENTS.md: the non-negotiables and the rules for browser checks and subagents.
2. docs/AUTHORING.md, sections "New course integration", "Course builds with
   content agents" and "Adding another subject to a registered year".
3. .claude/skills/add-curriculum-year/SKILL.md (plain Markdown if your tool does
   not load skills), and .claude/skills/curriculum-progress/SKILL.md before
   touching IDs, the registry's award flags or anything stored.
4. docs/curriculum/README.md, to find this subject's statutory file(s).
5. docs/CURRICULUM_INVENTORY.md, "Awards and introductions".
6. The worked example of a whole build: the Year 6 Science course record
   docs/superpowers/2026-11-04-year6-science-course-build.md, its bank files in
   src/data/challenges/year6Science/ and its test src/data/year6ScienceCurriculum.test.js.

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
- Topic and category titles become permanent URL and progress IDs.
- Learner progress is irreplaceable: never reset, migrate or rewrite stored data.
- Year awards: Years 5 and 6 count Maths, English and Science only. Register
  this subject with countsTowardYear: false. If it completes Maths, English and
  Science for this year, stop and ask me before switching those three to count.
- Subagents: at most two at once, on a cheaper capable model for writing banks;
  keep the stronger model for review. Browser checks only for what tests cannot
  show, in one batched pass.

== Steps ==
1. Create a branch from the current one: feat/yearYEAR-<subject id>. Start the
   timer: npm run course:timer -- start yearYEAR-<subject id>. Pause it
   (npm run course:timer -- pause <timer id>) whenever you stop to wait for me,
   and resume it when I reply.
2. Propose the categories and topic titles, each with its statutory
   requirement, and anything you will deliberately leave out. Stop for my
   approval.
3. Integrate the subject (dataset, registry, the lists in "Adding another
   subject to a registered year", certificate lines, public guide, ID test) and
   build one strand completely, with its pictures, lessons where the subject
   uses them, bank tests and a playthrough test. Stop and tell me the exact
   steps to try it with npm run dev.
4. Write the remaining strands, one bank file per strand. If you can run
   subagents, brief them with docs/superpowers/templates/strand-agent-brief.md.
   If you cannot, write the strands yourself one at a time.
5. Review every bank: facts, one defensible answer, safeguarding for sensitive
   topics, and the answer-length cue described in docs/AUTHORING.md.
6. Verify: npm run check:course -- --year YEAR --subject <subject id>, then
   npm run lint, npm test and npm run build. Report any unsupported checker
   adapter as a gap, not a pass. Use one batched browser pass only for new
   hand-drawn figures.
7. Record: fill in docs/superpowers/templates/course-build.md as
   docs/superpowers/<date>-yearYEAR-<subject id>-course-build.md. Add the
   statutory mapping table, and update docs/CURRICULUM_INVENTORY.md,
   docs/CHANGELOG.md and the inventory counts the docs quote. Stop the timer and
   paste its report into the record.

Do not commit. Finish with: what was built, the check results, what I must
check by hand, and a request for the token usage so you can add it to the
course record and the Measured builds table in docs/BUILD_MEASUREMENT.md.
Never estimate token usage.
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

6. **Record the token usage.**
   1. Open your AI tool's usage report or session export for this build,
      including any helper agents or extra sessions it used.
   2. Keep only the build: from the timer's start to its stop. The times are in
      the course record's timer report. Leave out anything you asked afterwards.
   3. Count each message once. Some logs repeat a message on several lines; a
      plain sum then counts it more than once.
   4. Note, for each model, the input, cached input (written and read) and
      output tokens, as your tool names them.
   5. Write "unknown" for anything your tool does not report. Never estimate.
   6. Paste the numbers into the session and ask the AI to add them to the
      course record and the Measured builds table in docs/BUILD_MEASUREMENT.md,
      with the tool and model names.
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
stored progress. Run npm run check:topic -- --year YEAR --subject SUBJECT
--topic TOPIC-ID, then npm run lint, npm test and npm run build. Do not commit;
tell me what changed, the check results and what to check by hand.
```
