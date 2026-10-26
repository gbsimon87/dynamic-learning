# Science desktop layout (Years 1–4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every Science challenge in Years 1, 2, 3 and 4 uses the "layout C" desktop arrangement (figure stage left ~60%, answering panel right ~40%) with one consistent question hierarchy.

**Architecture:** One new presentational component, `ScienceRound`, owns the slot order and the two-column grid. `ChallengeShell` gets an additive opt-in (`wide`) that widens the card and hands the feedback line to the round so it can sit beside Check. Year 3 games (21 hand-written files) fill the slots directly. Years 1, 2 and 4 all run through `DataChallenge`/`DataRound`, which gets a `layout="science"` opt-in, so three small game files cover them. Maths, English, geography and history never pass the opt-ins and are untouched.

**Tech Stack:** React 19 + Vite, Vitest + Testing Library (jsdom), plain CSS with the `--ck-*` kit variables.

**Spec:** `docs/superpowers/specs/2026-10-25-year3-science-desktop-layout-design.md`. The spec's scope line says Year 3 only; the user then widened it to Years 1–4 in chat. Everything else in the spec applies unchanged to all four years.

## Global Constraints

- Card width: about 1120px for science rounds with a figure; rounds with no figure use a centred single column at 760px. Every other subject keeps 760px.
- Two columns from 1024px wide; below that everything stacks.
- Right panel order: prompt (+ small 🔊 icon button + "Science words" chip) → evidence (only if the question has any) → answer area (instruction line becomes its label) → hint → Check → feedback.
- Left column: figure (large, sticky on desktop unless taller than the viewport), then caption and credits, then reference material. Only the figure sticks.
- One DOM order serves every width: prompt, figure, caption/credits, reference, evidence, answer, hint, Check, feedback.
- Read-aloud order: prompt, then evidence, then the answer's instruction. Each game keeps its current read-aloud content.
- `ChallengeShell` props and the `onComplete({ combos })` contract do not change; additions are optional and additive.
- No change to question content, generators, answer checking, stored progress, storage keys or unlock rules.
- Colours only via `--ck-*` / `--light-*` / `--dark-*` tokens; both themes; touch targets no smaller than today (48px controls).
- Commits only when the user asks. The working tree already holds unrelated edits (`src/data/brainBreaks.js`, `src/data/brainBreaks.test.js`); never `git add -A`.
- Browser checks are a last resort: exactly two batched layout passes (Task 2 pilot, Task 9 final), each covering 1440, 1024, 768 and 390px, light and dark. Say in the report what was not checked in a browser.

## Review Focus

- A round with no figure (text, tables, sorting only): single centred 760px column, no empty half. Pinned in Task 1.
- Feedback appears exactly once, directly after Check, and not a second time below the card, for wide shells. Pinned in Task 1.
- 390px phone: no horizontal scroll, the answer panel is full width, the figure comes before the answers. Pinned by the Task 2 and Task 9 browser passes.
- Dark theme: new CSS uses tokens only. Pinned in Task 1 by a test that fails on colour literals.
- Hint and Check stay adjacent after a wrong answer; Check stays disabled while locked or not ready. Pinned in Task 2 by the playthrough test.

## File Structure

- Create `src/components/challenge/ScienceRound.jsx`: slot layout and nothing else.
- Create `src/components/challenge/science-round.css`: grid, sticky figure, Science words chip, answer panel.
- Create `tests/components/scienceRound.test.jsx`: slot order, no-figure fallback, feedback placement, CSS token guard.
- Modify `src/components/challenge/ChallengeShell.jsx`: `wide` prop; `feedback` render argument.
- Modify `src/components/challenge/challenge-kit.css`: `.challenge-container.is-wide`.
- Modify `src/components/challenge/data/DataChallenge.jsx`: `layout` prop and science branch of `DataRound`.
- Modify `src/pages/skills/science/challenges/year1|year2|year4/Year{1,2,4}ScienceGame.jsx`.
- Modify the 21 files in `src/pages/skills/science/challenges/year3/*Game.jsx`.
- Modify `docs/PROJECT_KNOWLEDGE.md`: one note on the science layout.

---

### Task 1: ScienceRound and the shell opt-in

**Files:**
- Create: `src/components/challenge/ScienceRound.jsx`, `src/components/challenge/science-round.css`
- Create: `tests/components/scienceRound.test.jsx`
- Modify: `src/components/challenge/ChallengeShell.jsx`, `src/components/challenge/challenge-kit.css`

**Interfaces:**
- Produces:
  - `ScienceRound({ prompt, speak, gloss, figure, reference, evidence, answerLabel, children, hint, check, feedback }): JSX`
    - `prompt: ReactNode`, `speak?: string` (read-aloud text, rendered as `<SpeakButton compact label="Hear the question" />` beside the prompt), `gloss?: string` (rendered as a `<details>` chip labelled "Science words" beside the prompt), `figure?: ReactNode` (figure plus its caption and credits), `reference?: ReactNode`, `evidence?: ReactNode`, `answerLabel?: string` (visible label above the answer area), `children: ReactNode` (the answer area), `hint?: ReactNode`, `check: { label: string, disabled: boolean, onClick: () => void }`, `feedback?: ReactNode`.
    - Root class `science-round`; adds `has-figure` when `figure` is given, otherwise `is-single`.
  - `ChallengeShell` new optional prop `wide?: boolean`. New render argument `feedback: ReactNode` (always passed). When `wide` is true the shell adds class `is-wide` to `.challenge-container` and does not render its own feedback paragraph; the round must place `feedback`.
- Consumes: `SpeakButton` (existing, supports `compact`, `text`, `label`).

- [ ] **Step 1: Write failing tests** in `tests/components/scienceRound.test.jsx`:
  - `renders slots in the spec's DOM order`: render with every slot filled; assert `compareDocumentPosition` order prompt < figure < reference < evidence < answer label < hint < Check button < feedback.
  - `a round with no figure is a single column`: no `figure`; root has class `is-single` and not `has-figure`.
  - `a round with a figure has the two-column class`: root has `has-figure`.
  - `science words chip only renders with gloss`: summary text "Science words" present only when `gloss` is given.
  - `Check calls onClick and honours disabled`.
  - `a wide ChallengeShell renders feedback once, after Check`: render `ChallengeShell wide` with `render={({ submit, feedback }) => <ScienceRound ... feedback={feedback} check={{ label: "Check", disabled: false, onClick: () => submit(false) }}>…</ScienceRound>}`, click Check, assert exactly one `role="status"` element, and that it follows the Check button in the DOM.
  - `a non-wide ChallengeShell keeps its own feedback and no is-wide class`.
  - `science-round.css uses no colour literals`: read the file with `fs`, assert no match for `/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/`.
- [ ] **Step 2: Run** `npx vitest run tests/components/scienceRound.test.jsx`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement `ScienceRound`** per the Interfaces block. The answer area sits in a bordered panel (`science-round-panel`); the hint, Check and feedback live inside that panel. Science words chip: a `<details className="science-round-words">` whose summary is a pill with `min-height: 48px`, and whose open panel is absolutely positioned under the prompt so it never pushes the layout.
- [ ] **Step 4: Implement `ChallengeShell` changes.** Build the existing feedback `<p>` (with its `feedbackRef`, `role="status"`, `aria-live`) once as a `feedbackNode`; pass it to `render` as `feedback`; render it after the render output only when `!wide`.
- [ ] **Step 5: CSS.** `.challenge-container.is-wide { max-width: 1120px; }` in `challenge-kit.css`. In `science-round.css`: at `min-width: 1024px`, `.science-round.has-figure` is a grid `minmax(0, 3fr) minmax(0, 2fr)` with a gap; the figure cell is `position: sticky; top: 1rem; align-self: start` with `max-height: calc(100vh - 2rem)`; `.is-single` is `max-width: 760px; margin: 0 auto`. Below 1024px a single column in DOM order. Use only `--ck-*` tokens.
- [ ] **Step 6: Run** `npx vitest run tests/components/scienceRound.test.jsx` (PASS), then `npm run lint` and `npm test` (existing suites unchanged and passing).

### Task 2: Pilot on Parts of flowering plants

**Files:**
- Modify: `src/pages/skills/science/challenges/year3/PartsOfFloweringPlantsGame.jsx`
- Test: the existing playthrough tests that cover it (find with `grep -rl "parts-of-flowering-plants\|PartsOfFloweringPlants" tests src --include=*.test.*`); extend one, or add `tests/components/year3ScienceLayout.test.jsx`.

**Interfaces:**
- Consumes: `ScienceRound`, `ChallengeShell wide` and its `feedback` render argument (Task 1).
- Produces: the mapping recipe every later Year 3 task follows:
  - `prompt` ← the game's `challenge-prompt` text; `speak` ← its existing `SpeakButton` text; `gloss` ← its `science-gloss` text.
  - `figure` ← the main illustration or diagram, with its caption and credit. For label-dragging games, the figure is the `diagram` part of the board and the label tray stays in the answer.
  - `reference` ← standing reference tables (`science-rule`). `evidence` ← the information the child must read to answer (`science-observation`, practical activity card, information card, results table that is given rather than filled in).
  - Answer area ← controls; the "Use one ending…" style instruction becomes `answerLabel`.
  - `hint` ← the existing `HintNote`; `check` ← the existing Check button's label, disabled state and handler.
  - `ChallengeShell` gets `wide`; `render` forwards `feedback`.
  - A game keeps its question logic, `accepted` ref and `check()` untouched.

- [ ] **Step 1: Write the failing test** `parts of flowering plants challenge 4 puts the observation between the prompt and the tiles`: render the game at level 4 through `ChallengeShell`, assert DOM order prompt < observation card < tile buttons < Check, and that `Science words` is a `<details>` summary, not a standalone paragraph. Add `a wrong answer shows the hint and feedback directly around Check` and `Check is disabled until one tile is placed`.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Convert `PartsOfFloweringPlantsGame`** following the recipe, covering all four levels (level 1 shows the parts table as `reference`; level 3 uses the label board with the diagram as `figure`).
- [ ] **Step 4: Run** the new test (PASS), then `npm run lint`, `npm test`, `npm run build`.
- [ ] **Step 5: Browser pass 1 (batched).** One Playwright script on `/year/3/science/problem/plants/parts-of-flowering-plants/{1,3,4}` at 1440, 1024, 768 and 390px, light and dark. Check: two columns at 1440 and 1024 with the figure left; stacked at 768 and 390; no horizontal scroll; sticky figure; the answer panel readable at 1024; Science words pop-over does not clip. Fix what it shows and confirm with at most one more pass.

### Task 3: Years 1, 2 and 4 through DataChallenge

**Files:**
- Modify: `src/components/challenge/data/DataChallenge.jsx`, `src/pages/skills/science/challenges/year1/Year1ScienceGame.jsx`, `year2/Year2ScienceGame.jsx`, `year4/Year4ScienceGame.jsx`
- Test: `tests/components/year1Science.test.jsx`, `year2Science.test.jsx`, `year4Science.test.jsx` (extend), `tests/components/challenge.test.jsx` (must stay green: other subjects unchanged).

**Interfaces:**
- Consumes: `ScienceRound`, `ChallengeShell wide`/`feedback` (Task 1).
- Produces: `DataChallenge` and `DataRound` accept `layout?: "science"`. Absent means today's flat rendering, byte-for-byte in DOM order.

- [ ] **Step 1: Write failing tests.** In each of the three science test files: `a science round puts the figure before the prompt's answer and Check last` (visual present: DOM order prompt < visual < answer control < Check < feedback). In `challenge.test.jsx` or a Maths/English `DataChallenge` test: `a DataChallenge without layout keeps the flat structure` (no `.science-round`, no `.is-wide`).
- [ ] **Step 2: Run them.** Expected: FAIL on the science assertions.
- [ ] **Step 3: Implement the science branch in `DataRound`.** Mapping: `figure` ← `renderVisual?.(q)`; `prompt` ← `q.prompt`; `speak` ← `q.speak`; `evidence` ← every other optional block that exists today (`q.rule`, `q.picture`, `q.passage`, `q.text`, `q.equation`, `q.sentence`) in their current order; `hint` ← `q.hint` when `hint`; answer ← `KindControl`; `check` ← label "Check my answer". `DataChallenge` passes `wide` and forwards `feedback` only when `layout === "science"`. Years 1, 2 and 4 keep the shell's own "Read it to me" button in the progress row (they already pass `readAloud`); do not add a second 🔊 for them unless `q.speak` exists.
- [ ] **Step 4: Pass `layout="science"`** in the three game files.
- [ ] **Step 5: Run** `npm run lint`, `npm test`, `npm run build`.

### Task 4: Year 3, plants and soil

**Files:** Modify in `src/pages/skills/science/challenges/year3/`: `WhatPlantsNeedToGrowGame.jsx`, `WaterTransportInPlantsGame.jsx`, `PollinationAndSeedFormationGame.jsx`, `SeedDispersalGame.jsx`, `WhatSoilIsMadeFromGame.jsx`.
**Test:** `tests/components/year3ScienceLayout.test.jsx` (created in Task 2, extended here).

**Interfaces:** Consumes the Task 2 mapping recipe and `ScienceRound`.

- [ ] **Step 1: Extend the layout test** with one case per game: render level 1 (and the highest level for games with a different control, e.g. a label board) through its game component; assert it renders `.science-round`, the prompt precedes the answer controls, Check is the last control before feedback, and at most one evidence block sits between prompt and answer area.
- [ ] **Step 2: Run it.** Expected: FAIL for these five.
- [ ] **Step 3: Convert the five games** per the recipe. Water transport has a two-up comparison figure: both stay in `figure`. Games whose `figure` is `null` at some level use no `figure` (single column).
- [ ] **Step 4: Run** the layout test, then `npm run lint` and `npm test`.

### Task 5: Year 3, rocks and fossils

**Files:** `ComparingAndGroupingRocksGame.jsx`, `HowFossilsFormGame.jsx` (same folder). **Test:** `tests/components/year3ScienceLayout.test.jsx`.
**Interfaces:** as Task 4. The rock classification table is an answer control (it is filled in), not evidence; a given sample figure is `figure`.

- [ ] **Step 1: Extend the layout test** with a case per game (as Task 4 Step 1). **Step 2:** run, expect FAIL. **Step 3:** convert both games. **Step 4:** `npm run lint`, `npm test`.

### Task 6: Year 3, light and shadows

**Files:** `LightAndDarknessGame.jsx`, `ReflectedLightGame.jsx`, `HowShadowsFormGame.jsx`, `ChangingShadowSizeGame.jsx`, `ProtectingOurEyesFromSunlightGame.jsx`. **Test:** `tests/components/year3ScienceLayout.test.jsx`.
**Interfaces:** as Task 4. Explorer controls (shadow explorer, rotation dial, sliders) stay in the answer area with the figure in `figure`; the figure must keep updating from the controls' state.

- [ ] **Step 1:** extend the layout test per game. **Step 2:** run, expect FAIL. **Step 3:** convert the five games, keeping explorer state in the game component so figure and controls stay in sync. **Step 4:** `npm run lint`, `npm test`.

### Task 7: Year 3, forces and magnets

**Files:** `ContactAndMagneticForcesGame.jsx`, `MagneticMaterialsGame.jsx`, `MagnetsAndTheirPolesGame.jsx`, `PredictingAttractionAndRepulsionGame.jsx`, `MovementOnDifferentSurfacesGame.jsx`. **Test:** `tests/components/year3ScienceLayout.test.jsx`.
**Interfaces:** as Task 4. In `MagnetsAndTheirPolesGame`, the grid of stage figures (`science-life-cards`) is `figure`, and the label board's diagram part joins it at level 3. Fair-test boards and result tables the child fills in are answer controls.

- [ ] **Step 1:** extend the layout test per game. **Step 2:** run, expect FAIL. **Step 3:** convert the five games. **Step 4:** `npm run lint`, `npm test`.

### Task 8: Year 3, animals and bodies

**Files:** `NutritionForAnimalsAndHumansGame.jsx`, `SkeletonsForSupportAndProtectionGame.jsx`, `MusclesAndMovementGame.jsx`. **Test:** `tests/components/year3ScienceLayout.test.jsx`.
**Interfaces:** as Task 4. The animal picture and skeleton or muscle figure are `figure`; information cards are `evidence`.

- [ ] **Step 1:** extend the layout test per game. **Step 2:** run, expect FAIL. **Step 3:** convert the three games. **Step 4:** `npm run lint`, `npm test`.

### Task 9: Whole-change verification and notes

**Files:** Modify `docs/PROJECT_KNOWLEDGE.md` (a short note under the science section: the `ScienceRound` slots, the `wide`/`feedback` shell addition, `layout="science"` on `DataChallenge`, the 1024px breakpoint). Update the `add-curriculum-challenge` skill (`.claude/skills/add-curriculum-challenge/SKILL.md`) with one paragraph telling future science games to use `ScienceRound`.

- [ ] **Step 1: Coverage check.** `grep -L "ScienceRound" src/pages/skills/science/challenges/year3/*Game.jsx` must list nothing; `grep -L 'layout="science"' src/pages/skills/science/challenges/year{1,2,4}/Year*ScienceGame.jsx` must list nothing.
- [ ] **Step 2: Run** `npm run lint`, `npm test`, `npm run build`. Expected: all pass.
- [ ] **Step 3: Browser pass 2 (batched).** One script that opens level 1 and the highest level of one topic from each Year 3 group (Tasks 4–8) and one topic each from Years 1, 2 and 4, at 1440, 1024, 768 and 390px, light and dark. Check the same things as Task 2, plus: no empty right half on figure-less rounds; Year 1/2/4 "Read it to me" still in the progress row; dragging still works in label-board and sort rounds at 1024. Fix what it shows and confirm with at most one more pass.
- [ ] **Step 4: Report** what was checked in a browser (topics and widths) and what was not.
