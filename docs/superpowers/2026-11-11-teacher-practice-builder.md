# Teacher practice sheet builder — initial Year 3 Maths pilot

Historical pilot record. The [all-subject expansion record](2026-11-11-year3-practice-expansion.md)
owns current scope and verification status. The passing checks below apply to
the eight-topic pilot revision, not to the later expansion.

Owner authorised implementation of idea #46 and suggested reusing the planner's
search. Route: `/teachers/practice`; entry points: teacher hub and supported
Year 3 Maths briefings. No account, pupil records, server calls or storage writes.

## Implemented

- Teacher setup beside a live, monochrome paper preview, using the adult teacher
  typeface and light/dark theme tokens for controls. Paper stays white in both
  themes to represent photocopied output. Mobile stacks settings above preview.
- Search reuses `searchLearningNeeds` and the planner's catalogue, aliases,
  prefix/typo and lesson-text matching, filtered to supported paper topics.
  Selection allows one to three topics, with clear empty/no-match states.
- Eight topics: counting in multiples of 4/8/50/100; 10/100 more or less;
  place value in three-digit numbers; mental addition/subtraction of ones,
  tens and hundreds; column addition; column subtraction; tenths; fractions
  of a set. Boundaries checked against their exact mapping rows in
  `docs/curriculum/year-3-maths.md` before adaptation.
- Choose 4/8/12/16 questions and practice, word problems or a balanced mixture.
  Multiple topics are interleaved. Counts are explicit rather than promising
  a fixed number of pages regardless of models/support. Actual pupil-page
  count updates as support and working space change.
- Titles/instructions are editable with length limits. Mathematical questions
  stay structured: replace, remove or move them. Replacing one retains all other
  questions; answers and numbering follow the current order automatically.
- Optional worked examples reuse Bix's existing lesson examples. Vocabulary is
  a strip of relevant terms; optional diagrams include number lines, base-ten
  blocks, column grids and grouped counters. Essential question pictures cannot
  be switched off. Fraction bars use hatching, never colour alone.
- Questions adapt existing pure builders/operands. Counting uses the existing
  bounded sequence generator; column stories reuse existing templates with
  checked operands. Additional counter sets enumerate exact divisions within
  the existing 8–20 objects / denominators 2–5 scope. Tenths use numerators 1–9.
  Banks and worksheet state are independent of challenge completion and awards.
- A finite question pool avoids repeated questions, and exhaustion returns a
  visible explanation. Mixed sheets alternate practice and application for each
  topic. Every supported topic can supply 16 questions in each question mix.
- Print pupil sheets, answer keys or both, independently of preview selection.
  Named A4 pages, explicit page breaks, bounded page budgets, question/model
  grouping and separate answer pages support browser print/save PDF. UI controls
  and app chrome are omitted. Answer pages include prompts, answers and checks.

## Verification

| Status | Evidence / remaining work |
|---|---|
| Implemented | Data/adapter and paginator: `src/data/teacherPractice/index.js`; builder, paper/model renderer and scoped print CSS: `src/pages/teachers/TeacherPractice*`, `PracticePaper.jsx`. Route/SEO registration, hub and briefing entry points included. |
| Technically validated | Focused lint passes. Twenty focused Node tests pass, including independent arithmetic/model checks, all-topic/all-mix 16-question capacity over seeded runs, replacement, pagination, shared planner search and SEO. Forty-nine focused teacher/parent-guide component tests pass. Full lint and production build pass (70 public pages prerendered). Full `npm test` unit stage: 2,832 passed, four skipped, eight failures: three previously recorded Year 6 English/story-content failures and five server tests blocked by `listen EPERM 127.0.0.1`. Components were therefore run separately: 996 of 997 pass, retaining the previously recorded Year 6 English cohesion/punctuation timeout. Both tests pass on an isolated rerun (4.33 seconds). `npm run check:seo` was blocked at sandbox local-port binding before HTTP/browser checks. |
| Content reviewed | Statutory mapping and numerical scope checked during implementation; exhaustive automated answer/picture checks pass. No independent teacher review or classroom-use claim. |
| Device reviewed | Browser controls remain unavailable in this session. Desktop/mobile layout, computed contrast, actual A4 preview/print pagination, PDF output and physical photocopies remain visually unverified. |
| Owner/learner review | Owner approved feature direction and build. Classroom usability, time saving and pupil suitability require observation with teachers. |

## Deliberate limits and follow-up

Other years/subjects and unsupported Year 3 topics are not offered. Maths text
is not freely editable, to keep each question, diagram and answer aligned.
No automatic marking or diagnosis. Drafts do not survive refresh; print/PDF is
the available way to keep them. Review teacher demand before adding accounts,
saved sheets, vocabulary definitions or additional export formats. Remaining
review/expansion work stays under #46 in `docs/PROJECT_IDEAS.md`.
