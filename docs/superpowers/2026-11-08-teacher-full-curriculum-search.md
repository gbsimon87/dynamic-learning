# Teacher search across the selected curriculum

Date: 2026-11-08. Branch: `feat/teacher-planning-playlists`.

## Delivered behaviour

“What does your class need help with?” now searches the complete selected
year/subject curriculum, rather than the earlier nine-focus whitelist. The
default Year 3 Maths context has 176 built challenges across 44 topics. Year and
subject selectors use the existing registry's 37 available pathways. Availability
still comes from actual challenge modules, independently of saved progress.

Search uses curriculum topic/category names, available challenge/lesson titles,
existing lesson text and classroom aliases. It tolerates bounded spelling edits,
adjacent transpositions and prefixes while the teacher types. Exact reviewed
phrases retain priority; numerical scope remains exact. Unknown searches produce
an explicit no-match state. Example searches include “perimter”, “weight”,
“colum addition”, “find missing side”, “fossils” and “fronted adverbeals”.

Matches show actual activity names, with a one-click add for the matching set
and an expandable choice of a particular challenge. Topic results are paginated
in groups of eight. The general resource finder and pasted-result review use the
same selected-course catalogue. The fixed nine-need entry limit is removed.

Confirmed matching resource IDs travel with the learning need into evidence and
the generated plan; a specific ruler or perimeter challenge is not replaced by
unrelated activities from the same topic. IDs are validated for the selected
learning focus and current availability. Plan snapshots copy the chosen IDs.
Where an existing Bix lesson is available, its notes and worked-example reference
provide the corresponding lesson's teaching prompts. Existing pilot teaching
guidance and representation boundaries remain intact.

Changing context with unsaved inputs or a plan requires an inline confirmation.
Cancelling keeps the inputs and edits; confirming starts the new curriculum with
empty state. The new plan and print view retain their own year, subject and
objective labels. All inputs remain in React state; no account, pupil record,
progress, reward or API contract changes. Closed lesson editors render on demand
to avoid repeatedly building thousands of hidden resource-picker options.

## Source and content limits

The catalogue derives from `curriculumRegistry`, each course's current dataset
and injected built availability. `lessons/index.js` supplies existing per-slot
notes/examples where available. The original twenty pilot curriculum activities
and Fraction Fun retain their additional reviewed teacher descriptions; there is
no duplicated list restricting the wider search to those resources.

Wider catalogue membership is not a claim that every challenge has a separately
reviewed teacher description or a question-bank preview. Resources without an
entry in the existing lesson index fall back to their real topic/challenge names
and explicitly say to inspect the activity; no interactions or prerequisites are
invented. Existing introductions are labelled as such. Their read-only worked
examples do not mount a challenge runner or record pupil progress. Other-year
fractions cannot accidentally use the Year 3 example builders.

This change reuses current teaching content and adds generic planning prompts;
it does not author new curriculum questions or alter statutory programmes,
curriculum IDs, access or year-award membership. Teacher review of vocabulary,
lesson order, source content and classroom workload remains necessary. The
pilot's reviewed fractions foundation order is preserved; ordering for other
topics follows the existing dataset, not a newly validated prerequisite graph.

## Verification

| Review | Evidence and limits |
|---|---|
| Implemented | Complete selected-course catalogue, year/subject controls with guarded context changes, fuzzy/prefix search through topic/lesson metadata, matching-activity summaries and direct challenge choices, shared import/finder scope, retained resource IDs and context-specific plans/printing. No new dependencies, public routes or progress/account writes. |
| Technically validated | Full lint and production build pass. Twenty focused pure tests cover the original planner/input/catalogue plus five new course-search checks. The coverage test compares every built wrapper in all 37 registered contexts with indexed URLs and checks course isolation. Twenty component workflows pass across the four teacher files; the full component suite passes all 103 files / 956 tests. Context tests cover non-pilot perimeter, direct money-challenge selection, preserved/cancelled unsaved work, Science generation and Year 4 English typo search/print labels. |
| Full suite limits | `npm test`: 2,797 Node tests pass, four MongoDB-dependent tests skip and three unchanged content tests fail: Year 6 English lesson formatting, expected six stories versus 18, and `mountain-hut` 86 words versus the 96–140 band. The failing sources/tests are unchanged from HEAD. Components ran separately because those Node failures stop the combined command. Logs: `/private/tmp/bix-curriculum-search-{lint,build,tests,unit,focused,components}.log`. |
| Browser/layout | One batched local Chrome pass at 1280, 768 and 360 pixels in both themes: exact perimeter challenge → guarded Science switch → Year 4 English typo search, generation and introduction preview. No horizontal overflow or page errors; sampled new text contrast exceeds 4.5:1; learner progress remains unchanged. Print includes all 15 lessons, even with closed editors unrendered, and the correct Year 4 English labels; an A4 PDF was generated. Artifacts: `/private/tmp/bix-curriculum-search-qa/`. |
| Remaining review | In-app Node REPL/browser tools were unavailable, so repository Playwright drove isolated local Chrome. Physical devices, assistive technology, teacher review and teaching effectiveness remain unverified. Challenge runners are unchanged and were not completed in this browser pass. Wider metadata is source-derived, not individually content-reviewed. Public SEO output is unchanged, so the earlier SEO script limitation was not rerun. |
