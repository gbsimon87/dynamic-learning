# Warp to Beyond (#113) and Space ripples (#94) — design

Skills Mode → Geography → Solar System (`/solar-system`).
Ideas: [SOLAR_SYSTEM_IDEAS.md](../../SOLAR_SYSTEM_IDEAS.md) #113, #94; later #108, #109.
Status: draft for owner approval, 2026-10-25. Build order: **#113 first, then #94.**

"Owner" marks a decision the owner made. "Builder's call" marks a choice made
while writing this document that the owner may still overturn.

## Why

Children have explored everything from the Sun to Pluto. #113 opens the first
place **outside** the Solar System and is the doorway every later deep-space
idea will use (#90 black hole, #91 nebula, #109 other star systems, #108
galaxy map). #94 is the first destination. Its one teaching idea, for
6–8 year olds: **space can stretch and wobble, like jelly.**

The owner's long-term picture: children fall into a (pretend) black hole and
come out somewhere new. Eventually they choose a galaxy, then a star system,
on a galaxy map (#108), and fly the rocket around it in Fly the rocket mode.

## Goals

1. A child can leave the Solar System, pick a destination, ride a warp through
   a black hole, arrive in a separate scene, and come home.
2. Space ripples (#94) is the first, and at launch the only, destination.
3. The warp and Beyond scenes are built so later work (flying in Beyond,
   more destinations, the galaxy map) adds to them rather than replacing them.

## Non-goals (this round)

- Flying the rocket inside Beyond. The structure must allow it later (see "Built for later").
- Galaxy map (#108), other star systems (#109), black hole with lensing (#90), nebula (#91).
- Sound effects or music (#27 is still undecided). Bix read-aloud only.
- Rewards, stamps or anything saved.
- Real-phone performance and child playtests. These stay open gates in the roadmap.

## Anti-goals (failure even if it works)

- **Scary.** Falling into a black hole must feel like an exciting slide, not
  danger. No crushing, stretching or alarming words. Bix stays cheerful.
- **Pretend passed off as real.** The doorway is pretend and the grid is a
  picture. Both must say so in plain words.
- **Breaking the Solar System.** Coming home must leave the Solar System
  exactly as usable as before. No stuck modes, no lost camera, no errors.
- **Touching saved data.** Nothing is written to storage. Curriculum progress
  and `dl.solarMissions` are untouched.

## Science rules (owner)

- The galaxy map will offer **real star systems in the Milky Way only**, with
  other galaxies shown from outside. No invented systems. (Shapes the data model now.)
- **A black hole as a doorway is pretend.** Real black holes lead nowhere we
  could travel. Bix calls the ride "a pretend space shortcut". *(Builder's call on wording.)*
- Ripples are based on the first detected event, GW150914. Two black holes
  (about 36 and 29 times the Sun's mass) merged about 1.3 billion light-years
  away, beyond our galaxy. LIGO detected the ripple on 14 September 2015. It
  changed LIGO's 4 km arms by far less than the width of an atom. Check these
  figures against LIGO/Caltech or NASA sources at build time and cite them in the doc.
- Real ripples are invisible, and the event is sped up. The card says
  "This is a picture to help us imagine" (owner wanted this label).

## #113 Warp to Beyond

### Ways in (owner: both)

1. **Beyond button.** The fifth button in the idle launch row (Tour, Fly,
   Constellations, Meteor, **Beyond**). This uses the toolbar's last allowed slot.
2. **Fly past Pluto.** In Fly the rocket mode, the ship stops at the outer
   boundary (`solarFreeFlight.js`, radius 1,350; Pluto's furthest point is about 1,250).
   Reaching the boundary shows a big **Warp to Beyond** button in the flight
   HUD. It does not warp on its own, so an accidental drift is harmless.
   *(Builder's call: offer, not automatic.)* The button hides again when the ship moves back in.

### Choosing (owner)

A destination picker of cards opens first. **Only destinations that really
exist are listed, so there are no "coming soon" cards.** At launch it has one
card, Space ripples, with a short line and the pretend label. Closing the
picker returns to where the child was.

### The ride (owner, with builder details)

Sequence: a black hole "doorway" appears ahead → the child holds the engine →
the rocket falls in → a swirling tunnel → a soft flash → the destination.

- **Look (owner):** the existing light streaks (`warpStreaks.js`) plus a new
  purple-blue swirl, with fewer streaks and a simpler swirl on the low tier (owner).
- **Hold to keep the engine going (owner):** a big hold button (48px+). The
  keyboard uses Space or Shift, matching flight boost. Releasing lets the rocket
  **drift slowly forward**. It never fails or reverses, and the ride still
  finishes, just more slowly. *(Builder's call: about 5 s held; the drift rate is the builder's to tune.)*
- Pointer capture loss, blur and page hiding count as release, as they do for flight boost.
- **Reduced motion:** no swirl and no streaks. Holding fills a calm progress
  bar, then a gentle fade into the destination. *(Builder's call.)*
- From Fly the rocket mode, the picker sits between GO and the warp, so a
  held GO cannot carry over. Instead the warp uses the same Space key as
  flight. *(Builder's call, revised while planning.)*

### Coming home (owner: overview)

A **Back to the Solar System** button. The return warp plays automatically
with no holding *(builder's call)* and lands at the **overview**. Free flight,
tour, orbit and selections are cleared, as Overview/Reset does today. Reloading
the page always starts in the Solar System, and Beyond is never remembered.

### Separate scene

Beyond destinations are their own scene with their own camera, drawn
**instead of** the Solar System. `lineUp.js` (#62) already does this inside
the same page, renderer and animate loop, so follow its pattern. The Solar
System is not drawn while away. *(Builder's call: whether its clock keeps running.)*
Each destination is a module (`update`, `resize`, `dispose`) built on entry and
disposed on exit, so it holds no GPU memory when not in use.

At launch the camera is fixed in place, with drag-to-look (rotate around the
view; no travelling). *(Owner: flying comes later.)*

### Built for later (owner requirement)

Children will eventually fly the rocket in Beyond destinations, and choose
galaxy → star system on #108. So:

- **Destination data** lives in one list, shaped as a place in a hierarchy:
  galaxy (or "beyond our galaxy") → star system or event → bodies. Each entry
  carries its name, card text, pretend/real labels, `canFly` (false for
  ripples), the rocket's start position, an edge-of-space radius, and the
  bodies a rocket could bump into. Ripples is an *event* beyond our galaxy, not
  a star system. The picker reads this list, and #108 will later read the same list.
- **The rocket and flight controls** must be reusable in another scene. Today
  `createSolarFreeFlight` adds the ship to the Solar System scene and takes
  Solar System bodies. This round does **not** need to refactor it, but must
  not add anything that ties Beyond to it. The warp sequence should treat "the
  rocket" as something it is handed, not something it creates. Record the
  needed refactor in the roadmap for #109.

## #94 Space ripples

### Scene (owner: glowing grid)

- A dark sky with faint stars, and a large **glowing grid** sheet stretched
  below/ahead of the camera. Low tier uses fewer grid lines (owner).
- **Two black holes** sit in the grid as dark dimples with a glowing ring
  around each, so children can see them. Real black holes in this event had no
  bright discs, which the "picture to help us imagine" label covers. They
  circle each other slowly while waiting.

### Play (owner)

1. On arrival, nothing dramatic happens until the child presses a big
   **Bring them together** button (owner). Bix's line invites them.
2. The pair spirals closer and faster. Each lap sends rings rolling outward
   across the grid, coming faster and taller (the real "chirp").
3. They merge in a soft flash into one larger black hole. A last big ripple
   rolls out past the camera and gives the view a gentle wobble.
4. The grid settles calm. **Replay** runs it again from the start (owner).
5. **Tap to ripple** (owner): tapping anywhere on the grid sends a small ring
   out from that spot, at any time. Pooled, with a few at once at most. Taps off the grid do nothing.

Total merge sequence about 10–15 s *(builder's call)*. **Reduced motion:** no
camera wobble, a softened flash, smaller and slower ripples, and the same
steps otherwise.

### Card (owner: small card, 2–3 facts, read-aloud, label)

Uses existing card styling (`solar-info-card`, theme tokens, 48px buttons) and
`speak` from `utils/speech.js`, respecting the navbar mute. Draft facts,
checked at build time:

1. "Space can stretch and squeeze, a bit like jelly. When two black holes spin
   together, they make ripples in space."
2. "In 2015, special machines on Earth called LIGO felt ripples like these.
   They had travelled for more than a billion years to reach us."
3. "The ripple was tiny. It squeezed the machine by much less than the width of an atom."

Label: **"This is a picture to help us imagine. Real space ripples are
invisible, and we've sped them up."** Also: "Getting here was a pretend space shortcut."

## Shared rules (owner)

- **Silent:** read-aloud only, no new effects audio.
- **Nothing saved:** no storage, no URL state, no rewards.
- **Phones:** must run on the low tier, with fewer streaks, a simpler swirl and fewer grid lines.
- **Branch:** keep working on `feat/solar-system`.
- Roadmap build rules apply: both themes for overlays, 48px targets,
  read-aloud, low tier at width <720 or coarse pointer, dispose everything owned,
  hide Solar System effects/UI that don't apply while in Beyond.

## Checks

- Unit tests for pure logic: warp progress (hold, release drift, completion,
  reduced motion), ripple timing/amplitude, destination list shape, boundary offer.
- Component tests: Beyond button, picker, hold button (pointer and keyboard),
  arrival UI, Bring them together → Replay, card read-aloud/mute, Back to the
  Solar System returning to the overview, and the fly-past-Pluto offer.
- Lint, all tests and build must pass.
- One batched browser pass (`scripts/checkSolarUi.js`) covering WebGL-only
  behaviour: tunnel, grid ripples, tap-to-ripple, return, at 1280×900,
  390×844 and 844×390 in both themes, with zero page/module errors. Say what was not checked.
- Update `SOLAR_SYSTEM_IDEAS.md` (statuses, Phase 6) and `PROJECT_KNOWLEDGE.md`.
  Keep device and playtest gates open.

## Left to the builder

File and module names, shader vs CPU grid displacement, exact timings and
counts, how the black hole doorway is drawn, swirl technique, picker card
layout within the roadmap's limits, and how the Solar System's state is held
while away (as long as the return lands cleanly at the overview).
