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

These are practice choices, not school-year claims. Teacher review of the
ranges and help remains required. Number range and operation settings never change flight speed.

## Game within the scene

`SpaceArithmeticPanel` overlays the Solar scene; `solarArithmeticArea` owns four
world-space answer rings above the planetary orbits; `solarArithmeticRunner`
decides when they reach the rocket and which lane it is in.

**Setup:** one line of instructions, then Arithmetic Practice's choices
(operations, mix, how many numbers, how big) and Start flight, in a slightly
wider left-hand card. No moving/still choice: reduced motion forces still.

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
Equation rings retain full grid spacing. Their camera looks towards the group
while it is distant, framing it below the question card, and widens its field
of view as it approaches (capped at 85°). Near the rocket it follows the chosen
opening. Number play and exit restore the previous field of view.

**Session fun (nothing stored, nothing stops the flight):** a 🔥 chip counts
right-first-time answers in a row (the shared `answerStreak` rule, kept in the
reducer as `streak`); at 3 or more the rocket's flame burns big (`setHot`,
looks only). A planet tour (`spaceArithmeticJourney.js`) shows "Next stop" and
five dots; every five right answers reaches the next planet, Mercury to Neptune
and round again, shown with the result line. Like the milestone line, it is not
XP or a badge (PROJECT_IDEAS row 41).

**Card:** a narrow column at the top left, clear of the rings in the middle
(full width at the top on phones): back, Sums solved and Hear, then the sum
(large; highlighted with its answer when correct), the feedback line and
Show me, Pause/Resume and Settings. The card is the only place the sum
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
Fuel, stories, adaptation and saved results remain later work.

## Next steps

- Teacher, family and device review of all four operations, mixing and the help
  pictures at large ranges (Arithmetic Practice allows answers in the millions
  with 4 numbers × up to 100; consider capping what the rings show).
- Help for 3–4 number and mixed questions is a short prompt, without a picture.
