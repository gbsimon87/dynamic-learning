# Build a curriculum subject: the prompt and your steps

This is the one file to use when you want a subject built for a year. Copy the
prompt, change the year and subject, and paste it into a fresh session of any
AI coding tool. The AI takes it from there using the docs, scripts and
`docs/superpowers/` templates. Your own steps are below the prompt.

## The prompt

Change only `YEAR` and `SUBJECT` (for example `6` and `Maths`).

```text
Build YEAR SUBJECT for Learn with Bix.

Everything you need is in this repository. Read AGENTS.md, then follow
docs/AUTHORING.md: "New course integration", "Course builds with content agents"
and, if this year already has other subjects, "Adding another subject to a
registered year". Read the add-curriculum-year skill in .claude/skills/ as plain Markdown if
your tool does not load skills. Find the statutory text through
docs/curriculum/README.md and the award rules in
docs/CURRICULUM_INVENTORY.md ("Awards and introductions").

1. Create a branch for this build, then start the course timer:
   npm run course:timer -- start yearYEAR-SUBJECT (lower case).
   Pause it whenever you stop to wait for me, and resume it when I reply.
2. Propose the categories and topic titles, each mapped to its statutory
   requirement. Titles become permanent IDs. Stop and wait for my approval.
3. After approval, integrate the subject and build one strand completely as the
   model. Stop and tell me how to open it in the app so I can try it.
4. Write the remaining strands. If you can run subagents, use at most two,
   briefed with docs/superpowers/templates/strand-agent-brief.md. If you cannot,
   write them yourself one strand at a time.
5. Review the content, then run check:course, lint, the full tests and the
   build. Use one batched browser pass only for new hand-drawn figures.
6. Fill in docs/superpowers/templates/course-build.md as the course record, and
   update the inventory, changelog and Measured builds table. Stop the timer and
   add its report to the record.

Do not commit. Finish by telling me what to check by hand and asking me for the
token usage.
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
Build (or fix) the Learn with Bix topic TOPIC-ID in Year YEAR SUBJECT.
Read AGENTS.md and follow the building-curriculum-topics skill in .claude/skills/
(as plain Markdown if your tool does not load skills). Start with
npm run topic:context -- --year YEAR --subject SUBJECT --topic TOPIC-ID.
Run check:topic, lint, the full tests and the build. Do not commit; tell me
what to check by hand.
```
