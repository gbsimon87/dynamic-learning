# Teacher class input and automatic planning

Date: 2026-11-08. Branch: `feat/teacher-planning-playlists`.

Follow-up: the fixed Year 3 pilot catalogue and nine-focus limit described below
were subsequently replaced by [search across the selected curriculum](2026-11-08-teacher-full-curriculum-search.md).
Inputs and plans now support all registered year/subject contexts, with matching
challenge IDs retained. The sections below record the earlier input milestone.

## Delivered workflow

`/teachers/planning` now starts with **Tell us about your class**, with no
fictional evidence selected by default. The Year 3 maths pilot offers:

1. **Quick class overview:** describe one learning need, confirm the intended
   focus, and choose needs teaching / needs practice / confident / not checked.
   Add more needs, optionally supply class size, then use those needs.
2. **Paste topic results:** paste spreadsheet TSV or CSV, review its counts and
   objective mappings, confirm ambiguous or fuzzy matches, then use the results.
3. **Try fictional sample:** an explicit opt-in to the original eight-pupil demo.

Applying input proposes selected priorities; the teacher can review them and
generate an editable three-week plan with existing Bix resources. Pasted
question-response totals cannot establish individual pupil support groups.
This implementation accepts class-level needs/counts, not named pupil records.

Input remains in React state in this tab. It is not uploaded or written to
localStorage, accounts, assessment collections, progress or rewards. Refreshing
clears it; the page states this and offers the existing full-plan print/PDF.
Teacher accounts and saved/reopened planning remain outstanding. This is not a
live Bix assessment or a complete school pupil-data service.

## Search and mapping decisions

The reviewed catalogue now supports bounded Damerau–Levenshtein spelling
suggestions, including transpositions, in addition to classroom aliases and
whole-word matching. Common contextual words are ignored for topic matching;
search does not infer whether pupils are confident or struggling. Teachers
supply that separately. Numbers and short words require exact matches.

Exact reviewed phrases take priority. Other word matches precede spelling
suggestions; close spelling candidates favour the more specific phrase.
Fuzzy matches require a deliberate focus choice before recommending resources
or applying a pasted row. Unknown concepts remain unmatched. Ambiguous halves
still require a representation choice. This is catalogue search, not an external
AI interpretation or a percentage confidence claim.

## Results contract and evidence rules

Required import headers: `Topic,Correct,Answered`; optional `Expected,Skipped`,
in any order. Counts refer to question responses. Quoted CSV cells and spreadsheet
tabs are supported. Other headers, incomplete/invalid counts, percentages,
negative counts, correct greater than answered and expected smaller than known
responses are rejected. Review is atomic: malformed rows do not silently vanish
into an otherwise applied import. Repeated learning focuses must be combined
before import; distinct representations of one broad objective can coexist.

Limits: 20,000 pasted characters, 50 rows to review, 160 characters per topic,
counts up to 100,000, and nine distinct confirmed learning focuses. Optional class
size is a positive integer up to 1,000; it is not used to invent response coverage.

Teacher judgement produces explicit priorities without invented scores.
Pasted counts use visible provisional heuristics: fewer than two answers, or
known coverage below 75%, suggests checking; otherwise under 60% correct suggests
teaching, 60–79% practice and at least 80% retrieval. Unknown coverage stays
unknown. Missing responses can only be separated from skips when Expected and
Skipped are both supplied. These rules are teaching prompts, not validated
diagnostic or mastery thresholds.

When one broad objective has several representations, its summary retains each
representation and its reason. Strong shape results cannot average away weak
number-line results. No fictional evidence fills gaps in real input.

## Automatic plan behaviour

The generator uses applied evidence explicitly; its default is empty evidence.
Confirmed learning focuses narrow resource selection and teaching/practical/
checkpoint prompts to their representation. A number-line need uses the pilot's
number-line activities; shape practice is not silently substituted. When no
matching resource is built, teacher-led activity remains available.

Selected focuses each receive a teaching slot where capacity allows. Remaining
teaching slots favour teaching over consolidation over checks (weights 3:2:1),
while retaining foundational objective order. The final part of the sequence
revisits selected focuses. Confident unselected objectives provide retrieval
starters. Question-bank order is not a claim of difficulty progression; scope
and repeat-bank limitations remain visible in resource descriptions.

Plans freeze evidence source, revision, reasons and per-focus evidence. Applying
new inputs never overwrites lesson edits. Unapplied changes block generation;
an older draft is labelled as using earlier evidence until the teacher explicitly
replaces it. Print uses the plan's original evidence source and resource context,
even if the current input has since changed.

## Verification

| Review | Evidence and limits |
|---|---|
| Implemented | Empty-by-default class entry, quick needs/status input, reviewed CSV/TSV totals, optional class size, opt-in demo, fuzzy spelling confirmation, representation-specific resource/teaching selection, weighted scheduling, evidence/source snapshots, pending-change guards and preserved edits. No API, account, pupil-record or progress writes. |
| Technically validated | Full lint and final production build pass. Fifteen focused pure tests pass across planner, catalogue and input; all 102 component files / 952 tests pass. Final focused component checks (three files / 16 workflows) and affected lint pass after mobile layout/vocabulary refinements. Coverage includes malformed/partial counts, synonyms/typos, numeric-scope boundaries, ambiguous mappings, no fictional leakage, weighted allocation, representation filtering, frozen evidence, preserved edits and no input storage writes. |
| Full suite limits | `npm test`: 2,792 Node tests pass, four MongoDB-dependent tests skip and three unchanged content checks fail: Year 6 English lesson formatting, expected six stories versus 18, and `mountain-hut` 86 words versus its 96–140 band. The failing source/test files are unchanged from HEAD. Components ran separately because the Node failure stops the combined command. Logs: `/private/tmp/bix-class-input-{lint,build,tests,unit,focused,components}.log`. |
| Browser/layout | Batched local Chrome at 1280, 768 and 360 pixels in both themes covers typo confirmation → teacher-judgement plan → reviewed import → explicit replacement. No horizontal overflow; sampled text contrast exceeds 4.5:1; existing notes and stored learner progress are preserved; no page errors. A confirmation pass follows mobile refinements that collapse the browse list and prevent clipped status controls. Print includes all 15 lessons and supplied evidence, with the correct source and no fictional sample; an A4 PDF was generated. Artifacts: `/private/tmp/bix-class-input-qa/`. |
| Tooling and unverified scope | In-app Node REPL/browser tools were unavailable, so repository Playwright drove isolated local Chrome. Actual challenge runners are unchanged and were not completed in this browser check. Physical devices, assistive technology, teacher review and effectiveness remain unverified. No public routes, public catalogues or SEO output changed, so SEO validation was not repeated; its earlier stale Number Bonds assertion remains recorded in the preview milestone. |

Teacher review of vocabulary, priority rules, teaching prompts and real workload
is pending. Physical devices and assistive technology need separate evidence.
