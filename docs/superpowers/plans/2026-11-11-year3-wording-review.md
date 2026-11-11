# Year 3 wording review — plan and progress tracker

Started: 11 November 2026. Owner request: review every challenge and question set for language a seven-year-old can understand, in this order: Maths, English, History, Geography. This is a multi-session record.

## Workspace and resume instructions

- Worktree: `/Users/simoncordova/Desktop/Simon/dynamic-learning-year3-wording`
- Branch: `review/year3-wording`, based on `163406c`.
- The original checkout stays on `feat/ocean-explorer-immersive`. Its uncommitted Ocean Explorer changes are excluded from this workspace. Do all review edits and checks here; do not switch or clean the original checkout.
- Resume by reading this tracker, the project guide, the matching skill and the current diff. Continue the first incomplete subject/strand. Record exact files, findings, checks and remaining work before each handoff.
- Model switching is unavailable to the coordinating agent in this session. No model switch is claimed.

## Review standard

Read all four slots, all authored question records and all branches of generated question templates, including titles, prompts, hints, answer labels/options, accessible instructions and Bix introductions/worked examples. Check instructions against the actual controls and expected answer. Preserve the Year 3 mathematical/content demand while reducing unnecessary reading difficulty. Keep British English; use short sentences, familiar contexts, an explicit action and unambiguous references. Teach necessary subject vocabulary rather than removing it. Define equal-size wholes, start points, order direction and requested units where these matter.

Keep IDs, registered topic names, curriculum requirements, progress, completion and awards unchanged. Read the topic's statutory mapping before edits. Adult teacher notes and public guides are outside this learner-language pass unless a learner-facing question reuses their wording. Review worksheet reuse for changed question data, but a separate worksheet rewrite is outside scope.

A source review checks every finite item/template; generated numbers are not a finite list of all possible questions. Deterministic samples and existing tests check branches, answerability and controls. No automated readability score or test pass certifies that every seven-year-old understands the language. Owner/teacher and child/device review remain separate evidence.

## Work sequence

1. Inventory Maths and review the number/place-value strand first; fix clear wording issues and validate this pilot.
2. Review the remaining Maths strands in curriculum order, updating each topic row and evidence as it is completed.
3. Run relevant existing bank/component checks, then final lint, test and build once Maths is ready for merge. Record actual failures and any validation limits.
4. Continue English, then History, then Geography using the same complete-topic review and validation process. Do not mark future subjects reviewed based on sampling.
5. Keep this branch available across days. Integration/publication is a separate action; the Ocean Explorer worktree stays independent.

## Progress summary

| Order | Subject | Topics | Challenges | Wording review | Technical validation | Teacher/child/device review |
|---|---|---:|---:|---|---|---|
| 1 | Maths | 44 | 176 | 44/44 topics; 176/176 slots source-reviewed | Lint/build/components pass; 3 existing unit failures | Pending |
| 2 | English | 32 | 128 | Not started | Pending | Pending |
| 3 | History | 22 | 88 | Not started | Pending | Pending |
| 4 | Geography | 16 | 64 | Not started | Pending | Pending |

Overall source review: **44/114 topics (38.6%); 176/456 challenge slots**. This measures the agent wording pass, not teacher/child approval.

## Topic tracker

Legend: ☐ not reviewed; ◐ in progress; ✓ source wording review complete. The four challenge columns track review, not learner completion. “Lessons” includes all four introductions and examples. Tests and human/device review are recorded separately below.

### Maths

| Strand / topic | C1 | C2 | C3 | C4 | Lessons | Findings / evidence |
|---|---|---|---|---|---|---|
| Number - Number and Place Value / Counting in Multiples of 4, 8, 50 and 100 | ✓ | ✓ | ✓ | ✓ | ✓ | C4 now counts explicit jumps from 0; lesson matches. |
| Number - Number and Place Value / Finding 10 or 100 More or Less | ✓ | ✓ | ✓ | ✓ | ✓ | C1 states jump size; clearer jump instructions; lesson handles boundary crossings. |
| Number - Number and Place Value / Place Value in 3-Digit Numbers | ✓ | ✓ | ✓ | ✓ | ✓ | All block, digit and partition prompts reviewed; retained. |
| Number - Number and Place Value / Comparing and Ordering Numbers to 1000 | ✓ | ✓ | ✓ | ✓ | ✓ | Clearer symbol instruction, story asks and matching lesson example. |
| Number - Number and Place Value / Representing and Estimating Numbers | ✓ | ✓ | ✓ | ✓ | ✓ | Shorter full-box/pack stories; retained block and line tasks. |
| Number - Number and Place Value / Reading and Writing Numbers to 1000 | ✓ | ✓ | ✓ | ✓ | ✓ | Say “using digits”; reviewed all six generated story contexts. |
| Number - Number and Place Value / Number and Place Value Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Shorter row/ferry stories; reviewed all clue kinds and digit-card tasks. |
| Number - Addition and Subtraction / Adding and Subtracting Ones, Tens and Hundreds | ✓ | ✓ | ✓ | ✓ | ✓ | Removed general “just one digit changes” lesson rule. |
| Number - Addition and Subtraction / Column Addition | ✓ | ✓ | ✓ | ✓ | ✓ | All four slots and six application stories reviewed; lesson avoids keyword-only rule. |
| Number - Addition and Subtraction / Column Subtraction | ✓ | ✓ | ✓ | ✓ | ✓ | All four slots and six application stories reviewed; lesson avoids keyword-only rule. |
| Number - Addition and Subtraction / Estimating and Checking Answers | ✓ | ✓ | ✓ | ✓ | ✓ | States which rounding to use; explains opposite calculation. |
| Number - Addition and Subtraction / Missing Number Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Both-blank instruction and all six missing-start/taken stories reviewed; retained. |
| Number - Addition and Subtraction / Addition and Subtraction Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Reviewed all 18 generated two-step contexts; clearer stock changes and subjects. |
| Number - Multiplication and Division / 3 and 4 Times Tables | ✓ | ✓ | ✓ | ✓ | ✓ | All array, recall, triangle and six story variants reviewed; retained. |
| Number - Multiplication and Division / The 8 Times Table | ✓ | ✓ | ✓ | ✓ | ✓ | Doubling, recall, equal sharing and six story variants reviewed; retained. |
| Number - Multiplication and Division / Multiplying and Dividing Two-Digit Numbers | ✓ | ✓ | ✓ | ✓ | ✓ | Simpler partition instructions; all six story variants reviewed. |
| Number - Multiplication and Division / Scaling and Correspondence Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Restored missing “as”; realistic contexts; explicit one-of-each pairings. |
| Number - Multiplication and Division / Multiplication and Division Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Equal sharing between pencil pots now explicit; reviewed singular/plural branches. |
| Number - Fractions / Tenths | ✓ | ✓ | ✓ | ✓ | ✓ | Sharing task explicitly requests the missing top number. |
| Number - Fractions / Fractions of a Set of Objects | ✓ | ✓ | ✓ | ✓ | ✓ | Lesson for C3 now teaches the requested top number, rather than object total. |
| Number - Fractions / Fractions as Numbers | ✓ | ✓ | ✓ | ✓ | ✓ | Beyond-one story requests a fraction blank; introduction matches the ribbon task. |
| Number - Fractions / Equivalent Fractions | ✓ | ✓ | ✓ | ✓ | ✓ | Shading versus typing instructions explicit; equivalent shading keeps the same amount. |
| Number - Fractions / Adding and Subtracting Fractions | ✓ | ✓ | ✓ | ✓ | ✓ | Choice and shade captions match controls; denominator introduced in lesson. |
| Number - Fractions / Comparing and Ordering Fractions | ✓ | ✓ | ✓ | ✓ | ✓ | Cake comparison states equal-size cakes; all pair/order variants reviewed. |
| Number - Fractions / Fraction Problems | ✓ | ✓ | ✓ | ✓ | ✓ | Replaced malformed fraction-unit names with explicit fraction blanks. |
| Measurement / Measuring Length in mm, cm and m | ✓ | ✓ | ✓ | ✓ | ✓ | Ruler prompt names millimetres; all six stories and comparisons reviewed. |
| Measurement / Measuring Mass | ✓ | ✓ | ✓ | ✓ | ✓ | Scale asks for grams; simpler weigh/left language and definite flour starting amount. |
| Measurement / Measuring Volume and Capacity | ✓ | ✓ | ✓ | ✓ | ✓ | Distinguishes water present from capacity; all six stories reviewed. |
| Measurement / Adding and Subtracting Measurements | ✓ | ✓ | ✓ | ✓ | ✓ | Mixed-unit tasks/controls reviewed; water-present context made explicit. |
| Measurement / Perimeter of 2-D Shapes | ✓ | ✓ | ✓ | ✓ | ✓ | Defines perimeter in prompt; frame/card explicitly rectangular. |
| Measurement / Money and Giving Change | ✓ | ✓ | ✓ | ✓ | ✓ | Missing C2 story supplied; separate £ and p across stories/options/coin totals. |
| Measurement / Telling the Time to the Minute | ✓ | ✓ | ✓ | ✓ | ✓ | Clock-reading action explicit; all six time stories reviewed. |
| Measurement / Roman Numerals and 24-Hour Clocks | ✓ | ✓ | ✓ | ✓ | ✓ | Choice/button instructions explicit; noon and midnight exceptions corrected. |
| Measurement / Units of Time and Durations | ✓ | ✓ | ✓ | ✓ | ✓ | Plain-language duration instructions; avoids undefined “normal year”. |
| Geometry – Properties of Shapes / Drawing 2-D Shapes | ✓ | ✓ | ✓ | ✓ | ✓ | Lesson distinguishes flat shapes from straight-sided examples; all clues reviewed. |
| Geometry – Properties of Shapes / Making and Recognising 3-D Shapes | ✓ | ✓ | ✓ | ✓ | ✓ | Clues explicitly ask which solid; distinguishes faces from curved surfaces. |
| Geometry – Properties of Shapes / Angles as Turns | ✓ | ✓ | ✓ | ✓ | ✓ | All amount/direction/order/story variants and lessons reviewed; retained. |
| Geometry – Properties of Shapes / Right Angles | ✓ | ✓ | ✓ | ✓ | ✓ | Singular/plural right-angle instruction corrected; all variants reviewed. |
| Geometry – Properties of Shapes / Comparing Angles to a Right Angle | ✓ | ✓ | ✓ | ✓ | ✓ | Equality allowed explicitly; obtuse description bounded by a half turn. |
| Geometry – Properties of Shapes / Horizontal, Vertical, Parallel and Perpendicular Lines | ✓ | ✓ | ✓ | ✓ | ✓ | Marked-line instructions give available relationships, including neither. |
| Statistics / Bar Charts | ✓ | ✓ | ✓ | ✓ | ✓ | Clearer chart-reading and two-part comparisons; all six datasets reviewed. |
| Statistics / Scaled Pictograms | ✓ | ✓ | ✓ | ✓ | ✓ | Key use and +/− picture controls explicit; all six datasets reviewed. |
| Statistics / Tables | ✓ | ✓ | ✓ | ✓ | ✓ | Row/column instruction explicit; shorter two-column comparison story. |
| Statistics / One-Step and Two-Step Questions | ✓ | ✓ | ✓ | ✓ | ✓ | All three generated table-question shapes split into short instructions. |


### English

| Strand / topic | C1 | C2 | C3 | C4 | Lessons | Findings / evidence |
|---|---|---|---|---|---|---|
| Spelling - Prefixes and Suffixes / Adding Prefixes | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Prefixes and Suffixes / The Prefixes Super, Anti and Auto | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Prefixes and Suffixes / The Suffixes ation and ly | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Prefixes and Suffixes / Doubling Before a Suffix | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Words and Meanings / Root Words | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Words and Meanings / Exception Words | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Words and Meanings / Using a Dictionary | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Words and Meanings / Words in Context | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Words / A or An | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Words / Word Families | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Stories / Does It Make Sense? | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Stories / Characters' Feelings | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Stories / Predicting What Happens Next | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Stories / Fairy Stories, Myths and Legends | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Sounds and Homophones / The sure and ture Endings | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Sounds and Homophones / Tricky Sounds y and ou | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Sounds and Homophones / Homophones | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Spelling - Sounds and Homophones / Words Often Misspelt | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Sentences / Conjunctions | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Sentences / Time and Cause Words | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Sentences / The Present Perfect | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Grammar - Sentences / Inverted Commas | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Non-Fiction and Poetry / Finding Information | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Non-Fiction and Poetry / Asking Questions about a Text | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Non-Fiction and Poetry / Kinds of Writing | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Non-Fiction and Poetry / Words That Spark the Imagination | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Reading - Non-Fiction and Poetry / Poetry Forms | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Writing - Composition / Paragraphs | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Writing - Composition / Headings and Sub-headings | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Writing - Composition / Settings, Characters and Plot | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Writing - Composition / Proofreading | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Writing - Composition / Dictation | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |

### History

| Strand / topic | C1 | C2 | C3 | C4 | Lessons | Findings / evidence |
|---|---|---|---|---|---|---|
| Stone Age to Iron Age / How We Know About Prehistory | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Stone Age to Iron Age / Stone Age Hunter-Gatherers | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Stone Age to Iron Age / The First Farmers and Skara Brae | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Stone Age to Iron Age / Stonehenge and the Bronze Age | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Stone Age to Iron Age / Iron Age Hill Forts | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Stone Age to Iron Age / From Stone to Iron | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / The Roman Empire and Its Army | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Julius Caesar Tries to Invade | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Claudius Conquers Britain | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Boudica Fights Back | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Hadrian's Wall | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Roman Towns, Roads and Baths | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / Roman Gods and Early Christianity | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Roman Britain / How the Romans Changed Britain | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Where the First Civilisations Began | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / What the First Civilisations Gave Us | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / The River Nile | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Pharaohs and Pyramids | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Hieroglyphs | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Egyptian Gods and Mummies | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Everyday Life in Ancient Egypt | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The First Civilisations / Tutankhamun's Tomb | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |

### Geography

| Strand / topic | C1 | C2 | C3 | C4 | Lessons | Findings / evidence |
|---|---|---|---|---|---|---|
| The UK and Europe / Counties Cities and Regions | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The UK and Europe / UK Landscapes and Land Use | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| The UK and Europe / Europe and Russia | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Lines on the Globe / The Equator and Hemispheres | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Lines on the Globe / Tropics and Polar Circles | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Lines on the Globe / Latitude and Longitude | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Physical Processes / Mountains and Valleys | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Physical Processes / Volcanoes | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Physical Processes / Earthquakes | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Physical Processes / The Water Cycle | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Two European Regions / The Lake District | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Two European Regions / Campania | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Two European Regions / Comparing Two Regions | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Maps and Local Surveys / Eight Compass Points | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Maps and Local Surveys / Four Figure Grid References | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |
| Maps and Local Surveys / Surveying Local Land Use | ☐ | ☐ | ☐ | ☐ | ☐ | Pending |

## Review log and evidence

### 11 November 2026 — setup

- Separate worktree created from committed HEAD. Original checkout's edits left in place.
- Read project knowledge, validation/engineering rules, challenge/topic skills and the saved Year 3 Maths statutory programme and all 44 topic mappings.
- Implementation: review plan and full four-subject topic tracker created.
- Technical validation: documentation diff/link review pending.
- Content review: Maths source review starting; no subject is complete yet.
- Device/teacher/child review: not performed.

### 11 November 2026 — Maths source review

- Reviewed all 44 topic mappings, 176 challenge slots and 176 Bix introductions/examples. Read the bespoke place-value/arithmetic wrappers plus shared Year 3 games, their authored banks and every prompt-producing template branch. Unchanged, clear tasks are marked reviewed in the topic table rather than rewritten for its own sake.
- Review scope includes all finite records in `countingInMultiples`, `finding10Or100MoreOrLess`, `placeValue3Digit`, `comparingNumbers1000`, `representingNumbers`, `readingAndWritingNumbers1000`, `numberAndPlaceValueProblems`, `addingAndSubtractingPlaces`, `columnAddition3Digit`, `columnSubtraction3Digit`, `estimatingAndChecking`, `missingNumber3Digit`, `additionSubtractionProblems3Digit`, and the five `year3{MulDiv,Fractions,Measurement,Shapes,Statistics}` banks. Generated numbers remain variable; this does not claim to have played every possible numeric instance.
- Reviewed shared control wording used by these games. Two optional presentation props preserve existing defaults: `FractionEquationBoard.caption` and `CoinTray.formatAmount`. Year 3 uses matching choice/shade instructions and separate pounds/pence; other callers retain their existing presentation.
- All topic titles/IDs, statutory source documents, storage, rewards and completion contracts remain unchanged.

Technical evidence so far:

- All 44 topics pass `check:course -- --year 3 --subject math --structure-only` (176 wrapper paths). This is structure-only evidence.
- The automatic bank-adapter course check reports all 44 banks unsupported; it is **not a bank-validation pass**. Existing Year 3 bank tests provide the independent answer checks instead.
- All 176 wrappers mount in jsdom without broken interpolations. Targeted full runs exercise explicit jump counting (including wrong-answer retry), mass readings, change stories (including retry), fraction choice/shade arithmetic, equivalent-fraction typing and beyond-one fraction typing. Other challenge formats retain existing bank/control coverage; a mount check is not a complete playthrough.
- Focused components: 52 tests passed across eight files (`year3MathWording`, shared challenge/fraction/column controls, Year 2 measurement/geometry consumers, teacher practice and lesson frame).
- Initial focused Node run: 193 passed, two failed. Updated the statistics test's prompt parser to independently read the rewritten three table-question shapes; its eight tests now pass. The other failure is the existing unchanged Year 6 English lesson-lint issue. Year 3 Maths lesson lint is clean.
Final technical results:

| Check | Result |
|---|---|
| `npm run lint` | Passed. Two final lesson-line clarifications subsequently passed affected ESLint and the scoped lesson check. |
| `npm test` | Unit stage: 2,854 passed, 3 failed, 4 skipped (2,861 total). Components did not run through this command because unit failures stop the chain. |
| `npm run test:components` | All 1,018 tests passed across 109 files, including all 12 new wording/control regression tests. |
| `npm run build` | Passed: Vite built in 42.69 seconds and prerendered 70 public pages. Existing JSON-import-attribute and chunk-size warnings remain. Two final changes afterwards were lesson text only and passed scoped lint/lesson checks; compilation was not repeated for those strings. |
| Year 3 Maths lesson check | Passed for all 176 introductions/examples, including the final equivalent-fraction and am/pm clarifications. |
| Structure-only course check | Passed for all 44 topics. Automatic bank-adapter coverage remains unsupported. |
| `git diff --check` | Passed. |

The three unit failures are in unchanged content/files, also recorded in the earlier practice-builder review:

1. `src/data/lessons/lessons.test.js`: Year 6 English lesson lint (length/marked-text requirements).
2. `src/data/stories.test.js`: expects six stories; the existing bank has eighteen.
3. `src/data/stories.test.js`: `mountain-hut` has 86 words, outside its advertised 96–140 range.

Verified no diff in the Year 6 English lesson files or story source/test. The local-port server tests ran with the required access and passed. No failure was dismissed as pre-existing merely because a prior record mentioned it.

Session logs: `/tmp/bix-year3-wording-{lint,full-test,full-components,build,focused-components,structure,course,lessons}.log`. These are temporary diagnostic files; this tracker contains the durable results.

Content evidence: agent source wording and lesson alignment review complete for Maths. This is not independent teacher approval or a child comprehension study. Teacher review and child playtesting are pending.

Device evidence: no browser pass performed. This pass changes wording and optional text presentation; existing jsdom checks cover the changed interactions. Real layout/overlap, both themes, physical dragging, devices, printing and narration have not been rechecked.

## Next action

Maths wording changes and checks are recorded. Next subject: English, starting with its statutory Year 3 mapping and all four slots of the first topic. Keep History and Geography queued in that order.


## Handoff

- Open `year3-wording.code-workspace` in the separate worktree to continue. Changes are local on `review/year3-wording`; no merge, push or deployment was performed.
- Maths source review and implementation are complete. The three unrelated unit failures prevent an all-green full test claim; they remain recorded for integration.
- Continue English, then History, then Geography. Teacher/child comprehension and device checks remain pending for each subject.
