# Space explorer: chapters, the asteroid-belt run and learning checks — design

Date: 2026-10-27 · Roadmap: #84 (asteroid-belt run), #83 (free flight), #81 (badges)
Page: Skills Mode → Geography → Solar System → **Fly the rocket**

## Why

Children already like the Space explorer clue game ("Find the planet with a
giant storm called the Great Red Spot."). The owner reports two problems:
**they sometimes finish too fast**, and **it could be more exciting overall**.
The owner's rule: **it must teach, not just be a game.** Improve the existing
game rather than add a separate one. The asteroid-belt run (#84) becomes part
of it, not a race.

Today, one adventure is a shuffled deck of 25 clues. A child can skip reading by
opening **Where to? → Point rocket here** or **Hint → Help me steer**, which aim
the rocket at the answer; then GO finishes the clue. Every clue has the same
shape, and nothing builds up except badges.

## What gets built (owner chose: everything except arrival moments)

1. **Earn the autopilot** — aiming help unlocks only after the child has tried.
2. **Chapters** — short themed missions replace the single long deck.
3. **Two-step clues** — some clues continue into a second, linked find.
4. **The asteroid-belt run** — a chapter that sends the child through the belt
   to real asteroids, weaving between rocks that only wobble the rocket.
5. **A quick question after a find** — big-button question about what they
   just found, gently corrected, never scored down.

**Not built:** arrival moments (effects on finding a world) — owner declined.

## Goals

- A child reads and thinks about every clue before help appears.
- A play session has natural "one more" points (chapter ends) and more to do.
- Every find teaches one true idea and, often, checks it with one question.
- The belt feels like a place to fly through, and teaches what the belt really is.

## Non-goals

- No timers, scores against the clock, lives or failure states.
- No saved progress. Chapters, stars and badges last for this flight only, as
  today. Mission stamps (`dl.solarMissions`) and curriculum progress are untouched.
- No new sound effects (the #27 audio decision is still open).
- No change to TRAPPIST-1's content beyond what the shared mechanics require
  (see "Other systems").

## Anti-goals (would make this a failure even if it works)

- Questions that feel like a test: red crosses, lost stars, "wrong!" language.
- Help that is hidden so long a 6-year-old gives up.
- Asteroids so dense the belt looks like a wall, or claims that the real belt
  is crowded. The real belt is mostly empty space and must be said so.
- Facts that are not true, or that rely on changing counts.

## 1. Earn the autopilot

- **Where to? → Point rocket here** and **Hint → Help me steer** are locked for
  a new clue. They unlock when **either** the child has flown for **20 seconds**
  of engine time on this clue, **or** the child has opened **Hint** and read it
  (opening Hint shows the hint text at once, as today, and starts a
  **10-second** countdown to "Help me steer").
- While locked, the buttons show as disabled with a short reason a child can
  read aloud: "Read the clue and try first — help is coming!" plus a small
  progress ring or bar. Never hidden.
- **Skip clue** stays available at all times (a stuck child must always have a
  way on). Skipping gives no star, as today.
- Second step of a two-step clue: the same rule restarts.
- Numbers (20 s, 10 s) are builder defaults to tune after a playtest; keep them
  as named constants.

## 2. Chapters

- An adventure is now a **chapter**: about **5 finds** (a two-step clue counts
  as 2), in a fixed theme. When a chapter ends, a **chapter card** shows: the
  chapter's stars, what they found (with one-line facts), and big buttons for
  **every other chapter** plus **Play this chapter again**. Finishing a chapter
  gives a chapter badge for this flight.
- On first opening Fly the rocket, a **chapter picker** appears inside the
  flight panel (not a separate screen): one big card per chapter with icon,
  name, one-line promise, and a ✓ if finished this flight. A suggested first
  chapter is highlighted (Rocky planets). The child can also change chapter from
  **☰ More** in the flight panel.
- **Home chapters** (builder may rebalance clues between them; every current
  home clue must live in at least one chapter):
  - 🪨 **Rocky planets** — Mercury, Venus, Earth, Mars, the Moon, ISS.
  - 🪐 **Giant planets** — Jupiter (incl. the Great Red Spot), Saturn,
    Uranus, Neptune.
  - 🌙 **Moon hunters** — Io, Europa, Ganymede, Callisto, Titan, Enceladus,
    Triton, Phobos/Deimos (two-step clues live here mostly).
  - ☄️ **Asteroid-belt run** — see section 4.
  - ❄️ **Icy edge** — Pluto, Charon, Halley's Comet, the Sun as the way home.
- Within a chapter, clues are shuffled from that chapter's pool so replays
  differ; pools are larger than 5 where content allows.
- The whole-flight badges (1/5/10/20/25 stars) stay, counted across chapters.

## 3. Two-step clues

- A clue may have a `then` step: after finding step 1, the reward card shows
  the fact, and instead of "Next clue" says **"Keep going →"** with the follow-on
  clue, e.g. "You found Jupiter! Now find its moon with volcanoes." (Io).
- Each step gives its own star and fact. Step 2 targets something near step 1
  so the extra flying is a short hop, not a cross-system trek.
- At least **4** two-step clues at home (e.g. Jupiter → Io, Saturn → Titan,
  Earth → Moon, Mars → Phobos, Pluto → Charon, Neptune → Triton). Builder picks.

## 4. Asteroid-belt run (chapter)

- **Real asteroids added to the home scene** as findable, tappable bodies:
  **Ceres** (dwarf planet), **Vesta**, **Psyche**, and **Bennu**. Shapes are
  lumpy procedural rocks (Ceres round), textures procedural or credited, sizes
  exaggerated and labelled pretend-scale like the rest of the scene. Positions:
  Ceres, Vesta and Psyche inside the main belt band; Bennu is a near-Earth
  asteroid and sits near Earth's path, with its clue saying so.
- Each gets a card in the planet info card style with 2–3 true facts, and joins
  search and "Where to?". Facts from NASA (sources go in SOLAR_SYSTEM_IDEAS.md).
  Example facts the builder must verify before use: Ceres is the largest object
  in the asteroid belt and is called a dwarf planet; Vesta is one of the
  biggest asteroids and was visited by the Dawn spacecraft (as was Ceres);
  Psyche may be made largely of metal and NASA's Psyche spacecraft is flying
  there; OSIRIS-REx brought a sample from Bennu back to Earth in 2023.
- **Chapter clues** (about 5–6 in the pool): the belt band itself (existing
  `rocky-belt`), each named asteroid, and the belt's neighbours already drawn
  by `smallBodyRegions` (Jupiter's Trojans, the Hildas) if they can be made
  findable regions; otherwise skip them.
- **Weaving through rocks:** while the ship is inside the belt region, a small
  **pool of nearby rocks** (local obstacles around the ship, recycled as it
  moves) appears in front of and around the rocket so there is something to
  weave past. The existing instanced belt stays as the far view. Bumping a rock
  **wobbles the rocket** (a short shake and a nudge sideways, the rock drifts
  away); speed drops briefly; nothing is lost, no star or progress is affected.
  Reduced motion: no shake; a gentle slowdown and a soft glow instead.
  Low quality tier: fewer rocks.
- **Honesty line** on the chapter card and first belt clue: "Rocks squished
  together so you can play — the real belt is mostly empty space, with rocks
  usually far apart." The existing `rocky-belt` fact already says this.
- **Optional crystals:** not built. (Owner moved away from collecting; keep the
  chapter about finding real places.)

## 5. A quick question after a find

- After some finds (target: about **every other** find, and always after the
  last find of a chapter), the reward card shows one **question** under the
  fact: a short question with **2–3 big answer buttons** (48px+), read aloud
  when not muted, with a "Read question" button.
- Right answer: "Yes! …" plus a one-line reason; a small extra sparkle ⭐ shown
  but **no extra star count** (keeps stars meaning "finds").
  Wrong answer: "Not quite — …" with the right answer explained, then the
  correct button highlights. No penalty, no retry loop needed.
- Questions are about what was just found or its fact, e.g. after Jupiter: "Is
  Jupiter bigger or smaller than Earth?" After Psyche: "What might Psyche be
  made of? Metal / Ice / Gas." Every question needs its answer stated in a fact
  the child has seen.
- **Next clue / Keep going** stays available while a question is shown; the
  question can be skipped by moving on.

## Other systems (TRAPPIST-1 and future ones)

- The mechanics (earn autopilot, chapters, two-step, questions) are generic and
  driven by the system definition's `flight` data.
- A system that defines no chapters gets **one chapter containing all its
  clues**, so TRAPPIST-1 keeps working unchanged apart from earn-autopilot.
  (Builder may split TRAPPIST-1 into 2 chapters and add questions if cheap.)
- Update `validateSystem.js` and the `add-star-system` skill so new systems can
  define chapters, two-step clues and questions, with the same validation
  (every target exists; every question answer is among its options).

## Constraints (from the project)

- Ages 6–8: 48px targets, read-aloud only when not muted, both themes via the
  `--light-*`/`--dark-*` tokens, plain short words.
- Lives in the existing flight HUD (`SolarFlightControls.jsx`, capped at 340px,
  collapsible) and `flightClues.js`; the picker and chapter card fit there.
- Nothing saved; stored progress shape and keys untouched.
- New scene pieces use `solarModules.js` (`update`/`resize`/`dispose`), the
  shared clock, quality tiers and reduced motion. Pool rocks; dispose them.
- Arrival detection rules stay (real proximity, held 0.45 s; no award from
  Back to start or an already-near target).
- `npm run lint`, `npm test`, `npm run build`; component tests for the HUD
  flows; unit tests for round logic, unlock timing and the rock pool; one
  batched browser pass (belt rocks, picker and cards at phone and desktop, both
  themes) then at most one confirm pass.

## Left to the builder

- Exact clue/question wording (true, short, read-aloud friendly) and which
  clues go in which chapter beyond the lists above.
- Rock pool size, spacing, wobble feel, asteroid looks and exact positions.
- Layout details of the picker and chapter card within the HUD.
- Whether Trojans/Hildas become findable.

## Open checks after building

- Child playtest: do they read clues before help unlocks? Is 20 s right?
- Physical phone performance with the rock pool.

## Settled after the builder check (designer's calls unless marked)

- **Moons, ISS and Halley's Comet are already findable** (answered by the code):
  current clues target `Jupiter/Io`, `ISS`, `halleys-comet` etc., with moving-
  target arrival already working. Only the four asteroids are new scene work.
- **Unlock timer (call):** "engine time" = seconds with GO or Turbo held while
  the ship is moving; holding still doesn't count. Gaming it by flying anywhere
  is acceptable: it still means trying. The timer and the Hint countdown reset
  for each new clue or step (Next, Keep going, Skip, chapter change, replay).
  Closing Hint does not reset its countdown once started.
- **Default chapters (call):** a system without chapters has its clues split
  into shuffled chapters of about 5 ("Part 1", "Part 2"…), so TRAPPIST-1 also
  gets "one more" points this pass. Named chapters for TRAPPIST-1 can come later.
- **Question schema (call):** a question belongs to a clue (or step):
  `question: { text, options: [2–3 strings], answer, why }`. Validation checks
  `answer` is in `options`; "answer stated in a seen fact" is a content rule
  checked by tests that the answer word appears in that clue's fact. Options are
  shuffled per show. "About every other find" means about half the clues carry
  a question (fixed in data), plus every chapter's last clue.
- **Where state lives (call):** chapters, finished ticks, stars and badges last
  while the child stays on the Solar System page in this system: closing and
  reopening the flight panel keeps them; changing system, leaving the page or
  reloading clears them. Kept in the scene component, not saved anywhere.
- **Rock pool scope (call):** main belt band only (not Trojans/Hildas), only
  while the child is steering (not during autopilot, trips between systems,
  Back to start, warps or orbit). Bumps never block, delay or award a find;
  arrival detection ignores rocks.
- **Facts (call):** the builder checks each asteroid fact against a NASA page
  and records the link in SOLAR_SYSTEM_IDEAS.md; any fact that can't be checked
  is left out.
