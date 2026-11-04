# Start prompts for curriculum builds

Paste one of these into a fresh session of any AI coding tool, on a new branch.
Replace the angle brackets. The process around them is in
[AUTHORING.md](../../AUTHORING.md#course-builds-with-content-agents).

## A new subject for a year

```text
Build Year <N> <Subject> for Learn with Bix.

Read AGENTS.md, then in docs/AUTHORING.md the sections "New course integration",
"Course builds with content agents" and, for Year 6, "Adding another Year 6 subject".
Read the add-curriculum-year skill in .claude/skills/ as plain Markdown if your
tool does not load skills.

1. Start the course timer: npm run course:timer -- start year<N>-<subject>.
   Pause it whenever you stop and wait for me.
2. Propose the categories and topic titles, each mapped to the statutory text in
   docs/curriculum/<file>.md. Titles become permanent IDs. Stop and wait for my
   approval.
3. After approval, integrate the subject and build one strand completely as the
   model. Stop and tell me how to open the pilot in the app so I can try it.
4. Then write the remaining strands. If your tool can run subagents, use at most
   two, briefed with docs/superpowers/templates/strand-agent-brief.md. If it
   cannot, give me filled-in strand briefs to paste into fresh sessions.
5. Review the banks, run check:course, lint, the full tests and the build, and do
   one batched browser pass only for new figures.
6. Award membership: <countsTowardYear setting>.
7. Fill in docs/superpowers/templates/course-build.md as the course record and
   update the inventory and changelog. Stop the timer and add its report. Leave
   token usage for me to fill in.

Do not commit. Finish with what I must check by hand.
```

## One strand, in a separate session or with another model

Fill in [the strand agent brief](strand-agent-brief.md) (the coordinator can
produce it) and paste it as the whole prompt.

## One topic: new or fixed

```text
Build (or fix) the Learn with Bix topic <topic-id> in Year <N> <Subject>.
Read AGENTS.md and follow the building-curriculum-topics skill in .claude/skills/
(read it as plain Markdown if your tool does not load skills). Start with
npm run topic:context -- --year <N> --subject <subject> --topic <topic-id>.
Run check:topic, lint, the full tests and the build. Do not commit; tell me what
to check by hand.
```
