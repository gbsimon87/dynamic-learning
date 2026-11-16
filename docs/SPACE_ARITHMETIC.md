# Space Arithmetic — the Arithmetic Area inside Solar System

The Arithmetic Area is a feature of the **existing Solar System game**.
Fly there as you fly to TRAPPIST-1, using the same scene, rocket, trip HUD and
behind/cockpit cameras. Entry must not replace the explorer with a separate
renderer or navigate away from Solar. In the area the rocket flies itself and
the child only moves left and right. The area is fictional maths practice, not
a real star system.

Current references: [Explorable Worlds](EXPLORABLE_WORLDS.md),
[Skills Authoring](SKILLS_AUTHORING.md#space-arithmetic),
[remaining ideas](PROJECT_IDEAS.md#space-arithmetic-extensions-90) and
[review gaps](OPERATIONS.md#outstanding-review-and-known-limits).

## Entry, travel and return

- There is no gate inside the solar system. A gold signpost, “Space Arithmetic
  — pretend practice space this way”, stands past the home edge with the
  real-system signs: about 35° above the planets' plane, opposite the first
  real-system sign. Flying out of the edge heading within ~37° of it starts the
  warning and trip there (`activityTrips`); any other way still goes to the real
  system. More → Space Arithmetic flies the same trip by autopilot.
- Reuse both halves of `solarFreeFlight` travel, `tripTimeline`, warp streaks,
  `SolarTripHud` and the existing rocket. An activity trip completes within the
  scene instead of calling `onHandoff`/`loadSystem` or changing the route.
  Turn back works in both halves; reduced-motion travel uses existing calm cues.
- Show that this is a pretend journey; never invent a light-year distance or add
  the area to the real-system registry, map, facts or curriculum.
- On arrival, show arithmetic setup over the existing scene. Back to Solar System
  exits the activity to the home overview without replacing the renderer/rocket.
- `/skills/space-arithmetic` and its Maths card open the same Solar feature.
  The route sits outside the shared Skills back bar (like World Map): the scene
  fills exactly the screen under the navbar (`app-layout--space-arithmetic`), so
  the page never scrolls; the navbar and the card's back button are the way out.
  Keep the existing Arithmetic Practice game and real-system travel available.

## Maths and questions

Space Arithmetic offers **the same choices as Arithmetic Practice**
(`/skills/arithmetic-practice`), from the same code, with unlimited thinking
time and no fuel, timer, speed bonus, adaptation, persistent results or rewards:

- operations: addition, subtraction, multiplication and division, any
  combination (at least one; one is picked at random for each sum);
- mix operations in one question (two or more operations), e.g. `4 + (5 × 2)`,
  with brackets showing what to work out first;
- how many numbers: 2, 3 or 4;
- how big the numbers are: Up to 10 / 20 / 50 / 100, or any range from 1 to
  100 on the two-thumb slider. Default: addition, 2 numbers, 1 to 10;
- what to find: **Find the answer** (`3 + 4 = ?`, numbers in the rings) or
  **Find the sum** (`? = 7`, calculations in two rows of flying rings). Default: the answer.

The choices and their rules live in `math/practiceSettings.js` and the slider in
`components/skills/RangeSlider.jsx`; both games use them, so a change to the
options changes both. `makeSpaceQuestion(settings, previousKey)` wraps
Arithmetic Practice's `generateQuestion`: whole-number answers and steps by
construction, four unique non-negative options, at most a few tries to avoid
repeating the previous sum, and safe defaults for missing or old settings.
It returns `{ key, prompt, answer, options, parts }`; `parts` is `{ a,
operation, b }` for a one-operator sum, otherwise null. Option order is the
ring order (left to right for numbers; top left, top right, bottom left, bottom right for sums); never sort it. Long answers shrink to fit their ring.
Subtraction shows as `−`; speech goes through `mathToSpeech`.

Find the sum uses `generateReverseQuestion` (same settings): the target is a
generated calculation's value; the three wrong calculations are near misses
(one number nudged by 1–2), checked with `evaluateCalculation` so exactly one
option makes the target and every option is a whole number ≥ 0; bounded tries
then fresh calculations, then `target + k`. The question adds `reverse: true`
and `target`, `answer` is the right calculation and `parts` is null. Help says
to work out each sum without pointing at one; Hear says "Which sum makes 7?".
Calculations appear inside four wide oval flight rings in a two-by-two grid,
wrapping at spaces when needed. Arrow keys or WASD steer between rows and
columns; a directional pad provides the same steering on touchscreens. Edges
stop movement rather than wrapping. There are no tappable answer cards in
moving play. Still play uses two columns of calculation buttons that submit
directly.
Arithmetic Practice offers
the same choice (buttons show calculations; a miss reveals the right one).

### Modes and Laser Blast's question sets

Setup is one card that fits the screen without scrolling (360×800 and up, and
landscape phones): back, the mode's name, 🏆 best (Laser Blast) and Hear, then
four **mode tiles** (`SpaceModeTiles` in `SpaceControls.jsx`: an icon and one
word each — Blast, Collect, Balance, Share), that mode's few choices, one line
each (a short label, then segmented buttons), and Start fixed at the bottom.
There are no instruction paragraphs: Hear reads the mode's one-line `how`
(`SPACE_MATH_MODES`), and the station modes show a picture example and their
gate labels instead. On landscape phones (height ≤ 500px, width ≥ 600px) the
tiles, Hear and Start share one header row and the choices sit in three
columns; the still-view play card goes two-column (question left; tools, help
and answers right, help replacing the locked answers) and the steering becomes
a 2×2 pad at the bottom right.

**Laser Blast** is the only answer flight; do not add another flight mode that
only re-dresses the same questions. Its question sets (`data/freePlay/spaceMissions.js`,
ids kept so best streaks carry on) only change the questions and what the
answers ride on (`dressing`). Nothing is timed and nothing can be lost; misses
never undo progress. Only the best streak per set is stored (below).

| Set | Questions | Answers ride on |
|---|---|---|
| Sums (`blaster`) | Arithmetic Practice's | neon rings |
| Number bonds (`bonds`) | `a + ? = 10`, 20 or 100 (tens) — `makeBondQuestion` | gold stars |
| Count in steps (`skip`) | four terms in 2s/3s/4s/5s/10s from a multiple, one of the last three missing — `makeSkipQuestion` | neon rings |

Every set tours the planets (5 right answers per planet).

Make 10's wrong options are near misses and the given number itself; Skip-Count's
always include the next and previous terms. Help: Make 10 shows the given dots
with open circles up to 10 or 20 ("Count on to 10. How many jumps?"; tens for 100);
Skip-Count shows the jumps ("Each jump adds 5"), never the missing number.

Fire (💥 button, Space or F) shoots the answer in the rocket's lane; flying
through scores the same. `runner.fire()` answers early with the rocket's lane, once per wave
and only after the rings have faded in (`RUNNER.fireAfter`). A shot scores
exactly like a ring flown through (the same `crossing` event): a right shot
bursts the target and pops the other three (`clearOthers`, `fx.pop`); a wrong one
greys it and the same sum comes round again. Still view taps as usual.
Skip-Count's speech reads the gap as "blank". Calculation grids (Find the sum)
always fly in rings. The card's ✅ count is named Sums solved, Stars found (bonds)
or Numbers found (steps) for screen readers.

These are practice choices, not school-year claims. Teacher review of the
ranges and help remains required. Number range and operation settings never change flight speed.

### Maths modes

Every mode is played by steering the spaceship through destinations in the
existing Solar scene, and every mode has Turbo (hold Shift or ⚡ Turbo:
whatever is flying in closes in three times faster; letting go, pause, help or
setup stops it — `useSpaceTurbo`). In flight the station card is a small HUD that
never scrolls: back, ✅ count and Hear; the goal (Make 9, `4 + 3 = 5 + ?`,
Share 6 fairly); a picture of progress (a star meter, the two pans, the ship's
crystals and each alien's); a short line after a finished or missed activity;
and the 💡 ⏸ ⚙️ icon tools (named Show me, Pause/Resume, Settings). Help
replaces the progress picture with the one-line `how` and the worked example.
It has no cargo, sharing, undo, docking or answer controls.

- **Target Collector:** fly through stars labelled 1, 2 or 3 to build the
  target total. The fourth gate is Undo, which unloads the last star. Stars that
  would exceed the target leave the cargo unchanged. At the target, the next
  gates offer Dock or Undo; fly through Dock to complete the activity.
- **Balance the Space Station:** a physical balance above the flight lanes
  shows both expressions and their crystals. Fly through +1/+2 to deliver cargo,
  −1 to unload, and Dock to check equality. The beam tilts with the actual loads.
- **Alien Sharing Station:** fly through an alien's bay to deliver one crystal.
  Alien models show their current groups. When the ship is empty, equal groups
  complete the activity. Otherwise the bays switch to Pick up: fly to an alien
  to retrieve a crystal, then deliver it elsewhere. Spare lanes are Cruise gates.

All three offer numbers up to 10 or 20, worked examples and session-only counts.
Correct activities set off fireworks (`celebrate({ kind: 'activity' })`) and bring
the next activity straight into flight. Misses retain
all work for correction. Mode/settings changes reset the session. Round IDs
increase across mode changes to reject late scene events. Incidental stardust
is hidden in these modes so it cannot be confused with mathematical cargo.

`SpaceMathActivities.jsx` connects the pure `spaceMathActivities.js` state to
flight; `solarMathStation.js` supplies the world-space teaching models using the
existing scene, module lifecycle and animation loop. Reduced motion/no WebGL
retains a visible spaceship, models and gates in the world area: steer, then use
Fly through (or Space/F). There are no answer cards inside the panel.
Teacher, family and interactive device/visual review remains pending.

## Game within the scene

`SpaceArithmeticPanel` overlays the Solar scene; `solarArithmeticArea` owns four
world-space answer rings above the planetary orbits; `solarArithmeticRunner`
decides when they reach the rocket and which lane it is in.

**Setup:** the one-screen card above, with Laser Blast's set, then (Sums)
Arithmetic Practice's choices: Find, operations, Mix, how many numbers, how big.
No moving/still choice: reduced motion forces still.

**Moving play:** the rocket flies forward by itself. The four answer rings
start 110 units ahead and close in over 12 seconds for number answers, or
20 seconds for calculations
(`solarArithmeticRunner.js`, pure). The child only changes lane, with the big
◀ ▶ buttons, arrow keys or A/D for numbers; calculations add up/down
steering (↑ ↓ or W/S). The rocket glides horizontally and vertically between openings. Holding
Shift or the Turbo button (as Turbo in free flight) makes the rings close in
three times faster; letting go, pausing or opening help stops it. When the rings
reach the rocket, the lane it is in is its answer, reported once with the
round ID. There is no way to miss all four. The flight never stops: the next
rings fade in far ahead at once while the passed ones fly on behind and fade
(two ring sets take turns), the rocket keeps its lane and Turbo stays held.
Number rings come in like an opening text crawl in shape: far ahead they sit close
together near the middle (`CRAWL.farSpread` of their lane spacing) and fan out
along straight lines to the balanced, evenly spaced lanes as they reach the
rocket (`crawlSpread`); ring and label sizes follow the same spread so
neighbouring rings stay separate. Passed rings keep spreading. The ring flown through
reacts at once (`markPassed`): gold and swelling if right, softly dimmed if not.
Four light lanes (`LIGHT_LANES`) run under the exact paths the rings fly in
along, from just ahead of the rocket out to where the rings appear; the lane
the rocket is heading for glows brightest (`highlight`), so the child can see
where the rocket will go before the rings arrive.
**Show (`solarArithmeticFx.js`, looks only):** warp lines stream past, faster
on Turbo and a hot streak; a right answer bursts into round sparks, a wrong one into a small grey puff. Stardust (`STARDUST`): three
glowing orbs fly in one lane ahead of each set of number answers; steering
through takes them (`collectDust`) and the card counts ✨ for this flight only;
the equation grid has none. Reaching a planet on the tour sends that planet
sweeping past (`flyby`). The panel drives these through `setMission` and
`celebrate`; the scene owns the visuals and clears them on exit.
The rings are neon (`NEON`): a cyan tube with a soft additive halo. The ring
the rocket is heading for burns near-white with a stronger halo that pulses
gently; a right ring's halo turns gold as it passes, a wrong one's goes out.
The camera rides the rocket but looks at the middle of the ring group while it
is distant (`arithmeticCameraAim`), so the rings start centred on screen
whichever lane the rocket is in; near the rocket it follows the chosen opening.
The aim eases between the two, so a new wave never snaps the view.
Equation rings retain full grid spacing; their view frames the group below the
question card and widens its field of view as it approaches (capped at 85°).
Number play and exit restore the previous field of view.

**Streaks and records (nothing stops the flight):** a 🔥 chip counts
right-first-time answers in a row (the shared `answerStreak` rule, kept in the
reducer as `streak`); at 3 or more the rocket's flame burns big (`setHot`,
looks only). Streak power-ups (`STREAK_TIERS`): Blazing at 3, Lightning at 6
and Rainbow at 10 recolour the chip and the warp lines (`setTier`) and set off
fireworks when reached; any miss or Show me powers down. The best streak per
question set (`spaceArithmeticRecords.js`, `dl.spaceArithmeticRecords` version 1) is
kept in this browser only, like `dl.solarMissions`: not learner progress, never
sent to an account, and blocked storage just starts from zero. Bests saved under
the retired ring-mission ids (`free`, `meteor`, `comet`, `delivery`) load as the
Sums best (highest wins). Setup and the flight show 🏆 best; beating a previous best gets fireworks and "New best
streak" once a flight (`celebrate({ kind: 'record' })`). A planet tour (`spaceArithmeticJourney.js`) shows "Next stop" and
five dots; every five right answers reaches the next planet, Mercury to Neptune
and round again, shown with the result line. Like the milestone line, it is not
XP or a badge (PROJECT_IDEAS row 41).

**Card:** a narrow column at the top left, clear of the rings in the middle
(full width at the top on phones): back, ✅ count, streak/🏆/✨ chips and Hear,
then the sum (large; highlighted with its answer when correct), the planet
tour, the feedback line and the 💡 ⏸ ⚙️ icon tools (Show me, Pause/Resume,
Settings). Moving play always has 💥 Fire and ⚡ Turbo beside the steering. The card is the only place the sum
appears; the scene shows answer numbers or calculations in the flying rings.
Find the sum has four-way steering at bottom left. A compact camera toggle sits
at bottom right.

**Still play:** (reduced motion or no WebGL) freeze flight and show the four
options as large ring buttons in the card; a tap submits through the same
reducer. WebGL failure/context loss keeps the HUD, question and count.

**Feedback:** never stops the flight — after a correct answer the next sum
flies straight in and the completed sum shows briefly as a small line under it;
after a miss, gentle feedback while the same sum and options come round again.
Still play keeps a short feedback pause (`SPACE_FEEDBACK_MS`) before moving on.
No Next or Try again buttons.
“Sums solved: N” increments once per correct sum, including assisted ones.
Reuse `useAnswerFeedback`/`AnswerFeedbackLine`.

**Flight shape (`spaceArithmeticFlight.js`, nothing stored):** a flight lands
after `FLIGHT_GOAL` (10) right answers: the scene freezes with fireworks
(`celebrate({ kind: 'landing' })`) and the card shows a flight log (sums
solved, right first time, longest streak with "New best!", planets reached,
stardust) with **Keep flying** (ten more) and **New mission**. Comeback sums: a
sum that needed a second go or help is queued (`scheduleComeback`) and asked
again after a few other sums (`takeComeback`, `COMEBACK`), marked "🔁 Comeback
sum"; those cracked first time are listed in the log. Stuck: after
`STUCK_MISSES` (2) misses on one sum, Show me opens by itself once, led by
"Tricky one! Let’s work it out together."

**Help:** Show me fits the question, never stating the answer in words:
addition shows the two groups of dots and a counting-on prompt; subtraction
shows the dots with the taken-away ones crossed out and a counting-back prompt;
multiplication shows `a` rows of `b` (“3 groups of 4. Count up in 4s”);
division shows the dots in rows of the divisor (“How many groups of 3 make
12?”). Pictures appear only while they stay small (up to 40 dots for + and −,
ten rows for × and ÷). Longer or mixed sums get “work out the brackets first,
then go from left to right”.
Help freezes the rings until closed; closing returns focus to Show me.
Help marks the question assisted, without removing scoring eligibility.

**Pause and speech:** pause, hidden tab or window blur stop flight and input;
returning never resumes automatically. Resume preserves phase, question, count
and chosen answer without elapsed-time catch-up. Help/speech cannot resume a
manually paused run. Use `SpeakButton` and `mathToSpeech`, without playback
callbacks, while choosing/feedback. Speech is optional and cancelled on exit.
Settings and exit remain usable while paused. Change settings ends the run;
Start clears count and flags. No persistence/progress/account changes.

## State, ownership and lifecycle

The pure `spaceArithmeticRound` reducer owns setup → choosing → crossing →
feedback; Retry returns from wrong feedback with the same question, Next from
correct feedback with a new question. All round events carry the displayed
round ID; stale events and duplicate commits/completions are ignored.

State: phase, settings (Arithmetic Practice's settings plus `modeId: relaxed`), monotonically
increasing roundId, question, selectedLane, committedLane, elapsedSeconds, solved,
hadMiss, assisted, outcome, paused and helpOpen. The reducer calculates correctness
from the question's option value; callers never supply `isCorrect`.

START resets run flags/count; SELECT_LANE clamps integer selection (kept from
round to round); COMMIT locks a lane (still play); COMPLETE resolves it only while
crossing/unpaused. The rings reaching the rocket send PASS for that round: it
scores and starts the next round in one step (new question if right, the same
one if wrong), recording `lastOutcome` for the card; CLEAR_LAST hides it.
RETRY preserves miss/help flags; NEXT resets them. Settings exit invalidates old
events. Solved increments once; firstTry means no miss/help. Generate questions
in Start, the crossing callback and the still feedback timer, never in reducers or updaters.
Feedback effects deduplicate by outcome round ID under StrictMode.

`SolarSystemPage` hosts the panel and forwards lane/round crossing events.
It guards real-system handoffs during activity travel/play. `SolarSystem` owns
area visibility, arrival/exit, the runner and an activity API (prepareRound,
setLane, setTurbo, setHot, setState, leave). `solarFreeFlight` keeps the rocket and its camera
(`holdActivityLane`) and the trip; it has no routing timer. The existing Solar animation loop
is the only scene clock. No arithmetic RAF loop, second canvas or renderer exists.
Dispose the ring module with the Solar module host. Replace/dispose
digit textures when questions change and preserve the original scene teardown.

## Verification and handoff

Read AGENTS.md, PROJECT_KNOWLEDGE, the add-skill-game skill, Skills Authoring,
Engineering Rules, Explorable Worlds and Validation. Work on the current branch,
preserve unrelated changes and keep commands/results/remaining gaps in ignored
`.superpowers/space-arithmetic/plan.md`. Do not commit, merge or deploy.

Prove valid questions for every operation, term count, range and mix (answers
checked independently), unique options and old-settings fallback; stale IDs,
miss/help scoring, retry/reset/pause and duplicate completions. In jsdom test
each operation's help, the setup choices reaching the questions, still play, focus/help, lane keys/buttons, ring-arrival events,
flying straight on after right/wrong answers, kept lane and Turbo, Find the sum, pause holding the flight, context-loss fallback, production
direct route and original Solar controls/page/travel behaviour.

Controller tests must cover the runner (slow approach, one answer per round,
lane clamping/gliding, paused frames), flying out towards the sign versus any
other way, activity travel through both halves with no real-system handoff,
Turn back, same rocket identity and manual flight being off in the area. Keep real-system regressions.

Run focused checks during development and full lint/test/build at readiness;
public guide changes require check:seo. Browser checks follow AGENTS.md: only
remaining WebGL/layout gaps, one batched pass at 360×800, 768×1024 and 1280×800,
both themes, moving/reduced motion, edge-sign entry, arrival, wrong/retry/
correct lane answers, pause/resize, label fit, help/controls overlap and return.
Report unavailable browser verification explicitly; don't substitute jsdom for it.

Content review against these mathematical contracts is separate from teacher
sign-off, child/family comprehension and physical phone/tablet, keyboard/screen
reader, voice and memory checks. Keep outstanding review in OPERATIONS.md.
Fuel, adaptation and saved results beyond the best streak remain later work.

## Next steps

- Teacher, family and device review of all four operations, mixing and the help
  pictures at large ranges (Arithmetic Practice allows answers in the millions
  with 4 numbers × up to 100; consider capping what the rings show).
- Help for 3–4 number and mixed questions is a short prompt, without a picture.
- Teacher review of Number bonds and Count in steps (targets, steps, wrong options and
  help); family review of whether stardust, fireworks and fly-bys distract
  from the maths, and whether the best streak and
  power-ups encourage careful answers or rushing.
- Ideas not yet built: counting back in steps, a rocket colour choice.
