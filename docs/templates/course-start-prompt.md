# Build a curriculum subject: the prompt and your steps

This is the one file to use when you want a subject built for a year. Copy the
prompt, change the year and subject, and paste it into a fresh session of any
AI coding tool. The AI takes it from there using the docs, scripts and
`docs/templates/`. Your own steps are below the prompt.

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

== Start ==
Inspect the branch/worktree first; preserve existing work and do not reset it.
Create feat/yearYEAR-<subject id> from the current branch. For a resumed build,
reuse its branch and working record.

== Read next, in this order (by line range; do not dump whole files) ==
1. AGENTS.md: the non-negotiables and the rules for browser checks and subagents.
2. docs/AUTHORING.md, sections "New course integration", "Counts and fixtures
   to update for another pathway" and "Course builds with content agents".
3. .claude/skills/add-curriculum-year/SKILL.md (plain Markdown if your tool does
   not load skills), and .claude/skills/curriculum-progress/SKILL.md before
   touching IDs, the registry's award flags or anything stored.
4. docs/curriculum/README.md, to find this subject's statutory file(s).
5. docs/CURRICULUM_INVENTORY.md, "Awards and introductions".
6. This subject's nearest built year: one representative bank, game/renderer,
   lesson and test. Load additional references only when needed for the
   current strand.

== Facts to get right ==
- Subject IDs: math, english, science, history, geography, art, computing,
  design (Design & Technology), french, music, pe, wellbeing (Relationships &
  Health). Use the ID in file names and the registry.
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
1. Create the working record from docs/templates/course-build.md at
   .superpowers/course-builds/yearYEAR-<subject id>.md. Keep completed work,
   owned files, commands/results and the next action there.
2. Propose the categories and topic titles, each with its statutory
   requirement, and anything you will deliberately leave out. Stop for my
   approval.
3. Integrate the subject (dataset, registry, the lists in "Counts and fixtures
   to update for another pathway", certificate lines, public guide, ID test) and
   build one strand completely, with its pictures, lessons where the subject
   uses them, bank tests and a playthrough test. Check signup/selector/guide
   counts, staged availability, future-year test fixtures, lesson reading limits
   and the generic bank adapter before scaling. Give exact file ownership to
   parallel agents. Follow docs/VALIDATION.md: use focused lint, bank/playthrough
   and integration checks for the pilot; report the final full checks as pending.
   Stop and tell me the exact steps to try it with npm run dev.
   Planned topics must stay unavailable and be described honestly in guides.
4. Write the remaining strands, one bank file per strand. If you can run
   subagents, brief them with docs/templates/strand-agent-brief.md.
   Include the accepted pilot corrections in each brief and use the subject's
   actual bank/lesson contracts, answer ranges and input capacity. Require one
   complete topic to pass scoped checks before each agent scales its strand.
   If agents are unavailable, write the strands yourself one at a time. Keep
   coordinator context small: agents return counts, checks and uncertainties;
   inspect every bank for review, not repeated whole-file context dumps.
5. Review every bank: facts, one defensible answer, safeguarding for sensitive
   topics, and the answer-length cue described in docs/AUTHORING.md. Independently
   recompute generated answers. Check that lesson examples match live controls,
   representation, ordering direction and rounding instructions.
6. When the complete implementation is ready for merge/release, run
   npm run check:course -- --year YEAR --subject <subject id>, then the full
   npm run lint, npm test and npm run build once. Reuse passing results for
   unchanged code; after fixes rerun affected checks, broadening when shared
   changes or failures warrant it. Progress/accounts/shared infrastructure need
   broader regression checks immediately. Keep verbose output in temporary logs;
   inspect failures and summaries. Report unsupported adapters as gaps. Use one
   batched browser pass only for what tests cannot show (including new figures).
7. Finish: add the statutory mapping table to the subject's docs/curriculum/
   file, update docs/CURRICULUM_INVENTORY.md and the counts the docs quote, and
   list remaining content/device/owner review under "Outstanding review" in
   docs/OPERATIONS.md. Apply reusable workflow lessons to docs/AUTHORING.md or
   the templates. Then discard the working record.

Do not commit. Finish with: what was built, check results, what I must check by
hand, and any next-build improvements you applied.
```

## Your steps

**Before you paste the prompt**

1. Open a **new session** in your AI tool. An old session re-sends its earlier
   conversation on every turn.

**While it works**

2. When it stops with the **topic list**, read the titles carefully. They become
   permanent web addresses and saved-progress keys. Approve or correct them.
3. When it stops with the **pilot**, run `npm run dev` and play one or two of
   its challenges. Correct the style now, before it is copied to every topic.
4. Do the checks only a person can do: read the questions as a teacher would,
   read sensitive topics (health, safety, relationships) yourself, try it on a
   phone or tablet, and, if you can, watch a child play it.
5. Commit and merge when you are happy.

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
