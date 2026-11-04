# Ocean Explorer — Phase 4b (fill the area with animals) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Four more animals swim in the reef area, each orbitable with its own card: a clownfish group, a green sea turtle, a spotted eagle ray and a seahorse, joining the parrotfish.

**Architecture:** Phase 4 made every discovery carry its own `orbit` profile, so animals are data. `oceanAnimals.js` holds a list `ANIMALS` (discovery, orbit profile, radius, swim loop, model builder, animate function). The environment builds and moves every animal from that list. The scene and page already offer, orbit and show cards for any discovery, so they need only generic tests. New models live in `oceanCreatures.js`; the loop maths is `loopPose` in `oceanFish.js`.

**Tech Stack:** React 19, Three.js, `node:test`, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-29-ocean-explorer-design.md` (row 4 "introduce more animals gradually using the same discovery experience"; "Choose animals appropriate to their area").

## Decisions this plan makes (owner to confirm)

- **Cast, all fitting a warm coral reef:** clownfish (a loose group of three, one target), green sea turtle, spotted eagle ray, seahorse. Real habitats differ in detail, so each card's honesty note says this ocean is a made-up mix.
- **Clownfish have no anemone** in the scene, so their card says so rather than imply one is there.
- **Animals are not solid** and cast no shadows, as with the parrotfish.
- **Every animal swims a circle** at its own pace, laid out so loops never overlap the reef, the start, each other or the area edge.
- **Facts come from NOAA and Florida Museum pages** listed in each card's `sources`; the owner reviews the wording.

## Global Constraints

As Phase 4: Solar System and the kit unchanged; no ocean names in the kit; both themes; touch targets; reduced motion holds animals still; no commits until the owner allows them.

## Review Focus

1. Overlapping offers when two animals are in range. → `every animal can be offered, orbited, followed and left` (nearest wins).
2. An animal loop reaching the reef, the start, rocks' height, the surface or another loop. → `animal loops stay clear` in `oceanAnimals.test.js`.
3. The hull hiding any animal while orbiting. → the clearance check inside the scene test.
4. Card shows the right animal and facts noun. → page test over every discovery.
5. Animals that are not in view at the start must still be findable. → help text names animals; owner checks in browser.

---

### Task 1: Animal data, loops and models

**Files:** Modify `oceanFish.js`, `oceanDiscoveries.js`, `oceanDiscoveries.test.js`; Create `oceanCreatures.js`, `oceanAnimals.js`, `oceanAnimals.test.js`.

**Interfaces:**
- `loopPose(loop, seconds) -> {x, y, z, heading}`; `fishPose = seconds => loopPose(FISH_LOOP, seconds)`.
- `ANIMALS: { id, discovery, orbit, radius, loop, create(water), animate(model, seconds) }[]` in order parrotfish, clownfish, sea-turtle, eagle-ray, seahorse.
- Discoveries `CLOWNFISH_DISCOVERY`, `TURTLE_DISCOVERY`, `RAY_DISCOVERY`, `SEAHORSE_DISCOVERY`; `OCEAN_DISCOVERIES` lists all six.

- [ ] Failing tests first: every discovery validates, is sourced and opens with one sentence; every loop is clear of the reef, the start, rocks' height, the surface, the area edge and every other loop; each loop closes after its lap and faces where it goes.
- [ ] Implement data, `loopPose`, models and the list; tests pass.

### Task 2: Scene and page

**Files:** Modify `oceanEnvironment.js`; Tests `oceanScene.test.jsx`, `oceanExplorer.test.jsx`; Modify `OceanExplorer.jsx`, `shared/skillGuides.js`, docs.

- [ ] Failing tests first: every animal exists in the scene and swims; each is offered, orbited, followed with the hull clear and the right distance, and left; the card follows every discovery.
- [ ] Environment builds and moves animals from `ANIMALS`; `discoveries` lists the reef then all animals. Page help and guide name the animals.
- [ ] Full suite (lint, `npm test`, vitest, build, seo), one batched browser pass, review.
