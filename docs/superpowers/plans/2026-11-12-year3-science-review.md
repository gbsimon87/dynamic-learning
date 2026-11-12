# Year 3 Science review — plan and progress tracker

Started: 12 November 2026. Owner request: go through the whole Year 3 Science
curriculum, make every challenge easy for a seven-year-old to understand, and
improve the look and feel of the question card (screenshot reference:
`/year/3/science/problem/plants/water-transport-in-plants/1`).

## Workspace

- Worktree: `.claude/worktrees/year3-science-review` (inside the main checkout,
  git-excluded). Branch `review/year3-science`, based on local `dev` at `45d2047`.
- The original checkout stays on `ideas/curriculum-introductions-mastery` with its
  uncommitted work untouched.
- Model switching is not available to the coordinating agent; the two wording
  strands ran as Sonnet subagents, the layout strand in the coordinating session.

## Strand 1 — question card layout (shared `ScienceRound`)

Owner findings: card elements not aligned; answer buttons of different widths;
hard to read; the question sits far from the answers.

Decision: one reading rule for every science round —
**picture → clue card → question → answers → Check**. The question always sits
directly above the answers it asks about. Answers are full-width, equal, left-
aligned rows with a selection marker. All panel text is left-aligned. The clue
card (`evidence`) is a tinted "Look and remember" card, not a second bordered box.
`ScienceRound` is shared with Year 1 and Year 2 Science `DataChallenge` rounds,
so they receive the same layout.

## Strand 2 — wording for a seven-year-old

Review standard (applies to every learner-facing string): titles, prompts,
options, clue/evidence text, answer labels, hints, feedback, Science-words gloss,
spoken (`speak`) text, figure captions/labels, stage instructions and sort/tile
labels, in all four slots and every authored or generated branch.

- Short sentences (aim ≤ 12 words), one idea each, an explicit action
  ("Tap…", "Choose…", "Sort…"). British English. Familiar contexts.
- Keep the science demand and the statutory requirement. Teach necessary
  vocabulary (stem, pollen, reflect, opaque, pole, attract, repel…) — don't
  remove it; explain it once in plain words.
- No double negatives, no meta language ("authored example observations",
  "supplied setup", "not graded"), no abstract phrasing ("Roots that are not
  there.").
- Options in one question: similar length and grammar, one clearly correct,
  distractors plausible to a child. Keep answers unique.
- The clue card now appears **before** the question, so clue text must read as
  a short fact or setup, and the question must stand on its own.
- `speak` text must match the visible words.
- Keep IDs, topic names, answer-checking logic, question counts, completion and
  progress unchanged.

## Topic tracker

Legend: ☐ not reviewed; ✓ reviewed and updated.

| Category / topic | C1 | C2 | C3 | C4 | Findings |
|---|---|---|---|---|---|
| Plants / Parts of Flowering Plants | ✓ | ✓ | ✓ | ✓ | Captions and clue cards rewritten with plain words (leaves, stem); the L2 question now asks 'Which letter shows the part that...'; jobs table and hints shortened. |
| Plants / What Plants Need to Grow | ✓ | ✓ | ✓ | ✓ | Care cards, options and fair-test prompts simplified; 'requirement' and 'forecast' language removed. Fixed an A/B mix-up: on odd investigations the text named the wrong plant as the well-cared-for one. |
| Plants / Water Transport in Plants | ✓ | ✓ | ✓ | ✓ | Options shortened with no full stops; 'roots that are not there' removed; captions and 'supplied setup / authored' text removed. Shared SortBins and ObservationSequence left alone. |
| Plants / Pollination and Seed Formation | ✓ | ✓ | ✓ | ✓ | Life-cycle steps, evidence captions and Science words plainer; 'supplied source observations' removed. Figure labels 'Pollen-making part' and 'Receiving part' kept. |
| Plants / Seed Dispersal | ✓ | ✓ | ✓ | ✓ | Feature and movement captions rewritten in everyday words; 'supplied evidence' language removed; sort cards no longer prefixed 'Observation:'. |
| Animals, including humans / Nutrition for Animals and Humans | ✓ | ✓ | ✓ | ✓ | Information cards, options and claims simplified; options no longer end in full stops; menu rules shortened. NHS source attributions left unchanged. |
| Animals, including humans / Skeletons for Support and Protection | ✓ | ✓ | ✓ | ✓ | Options are bare verb phrases that work in L1 and in the L4 'This part can...' sentence; sorting rules and captions plainer. |
| Animals, including humans / Muscles and Movement | ✓ | ✓ | ✓ | ✓ | 'Contract' kept and explained; guidance card and diagram captions shortened ('simplified model', 'schematic' removed); prompts and hints plainer. |
| Rocks / Comparing and Grouping Rocks | ✓ | ✓ | ✓ | ✓ | Sample descriptions ('can be seen'), sort rules, fair-test plans and table caption rewritten; 'observation / classification / authored' wording removed. |
| Rocks / How Fossils Form | ✓ | ✓ | ✓ | ✓ | Story cards, claims, Science words and captions plainer; sort bins now 'The story agrees / does not agree'. Test-pinned phrases kept. |
| Rocks / What Soil Is Made From | ✓ | ✓ | ✓ | ✓ | Specimen notes, sort and label prompts, claims and captions rewritten; 'component', 'supplied', 'identified' removed. Test-pinned phrase 'Amounts are not measured' kept. |
| Light / Light and Darkness | ✓ | ✓ | ✓ | ✓ | "Observer" became "the child"; options and tiles shortened; stage steps, buttons and meta text simplified; test regexes updated. |
| Light / Reflected Light | ✓ | ✓ | ✓ | ✓ | Samples became "surfaces", "reflected image" became "clear reflection", plain gloss; reflection-tile claim now matches the evidence. Concern: in "both clear" enquiries the "a clear reflection is not needed" idea is not shown by the evidence. |
| Light / Protecting Our Eyes from Sunlight | ✓ | ✓ | ✓ | ✓ | Rules, situations and sort cards rewritten short; UVA/UVB percentages dropped (beyond Year 3); safety warning kept first-class; tests updated. |
| Light / How Shadows Form | ✓ | ✓ | ✓ | ✓ | Observation notes, options and bins rewritten; "cast" and "darker patch" language removed; tests updated. |
| Light / Changing Shadow Size | ✓ | ✓ | ✓ | ✓ | "Source" became "lamp"; pattern sentences made parallel; fair-test cards in plain words; "Step n" labels. |
| Forces and magnets / Movement on Different Surfaces | ✓ | ✓ | ✓ | ✓ | "Sample" became "surface"; "supplied/authored" removed; fair-test cards and tiles simplified; tests updated. Left alone: shared FairTestBoard (also used by Plants). |
| Forces and magnets / Contact and Magnetic Forces | ✓ | ✓ | ✓ | ✓ | "Bodies" became "things"; stage notes, bins and options simplified; figure label and caption cut. |
| Forces and magnets / Magnetic Materials | ✓ | ✓ | ✓ | ✓ | "Sample" became "piece"; "noticeable attraction" became "attracted"; setup cards and tiles simplified; tests updated. |
| Forces and magnets / Magnets and Their Poles | ✓ | ✓ | ✓ | ✓ | Outcome text fixed ("showed attract" became "attracted"); options, targets and test notes simplified. |
| Forces and magnets / Predicting Attraction and Repulsion | ✓ | ✓ | ✓ | ✓ | Rule and missions rewritten; "arrangement/model" removed; build-round controls and tiles simplified. |

## Evidence

Implementation, technical validation, content review and device review are
recorded separately. Automated checks cannot certify that a seven-year-old
understands the language.

| Evidence | Status |
|---|---|
| Implementation | In progress |
| Technical validation | Pending |
| Owner/teacher content review | Pending |
| Child/device review | Pending |
