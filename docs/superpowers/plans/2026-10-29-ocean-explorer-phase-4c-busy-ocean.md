# Ocean Explorer — Phase 4c (a busy ocean) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Animals and reefs everywhere in the 20×-area ocean, so the water feels busy wherever the submarine goes.

**Architecture:** A discovery now has a unique `key` (one per thing in the water) beside its `id` (which card to show). The scene offers, orbits and tracks by `key`; callbacks and the page still speak `id`, so the card code is unchanged. `oceanReef.js` generates a list of reef spots, and `oceanAnimals.js` turns each species into many instances placed deterministically, evenly spread (best-candidate sampling) and clear of reefs, the start, the edge and each other. Models beyond 85 units from the submarine are hidden and not animated.

**Tech Stack:** React 19, Three.js, `node:test`, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-29-ocean-explorer-design.md` (row 4: "introduce more animals gradually using the same discovery experience"), `2026-10-29-explorable-worlds-design.md`.

## Decisions this plan makes (owner to confirm)

- **Population:** 9 reefs (the original plus 8, sizes 1.0 to 1.2) and 46 animals: parrotfish 14, clownfish 10, green sea turtle 7, spotted eagle ray 7, seahorse 8. The first of each species stays where it was.
- **Same card for every one of a species.** Facts do not change per animal.
- **Variety:** each extra animal gets its own loop size, height, speed, direction and starting point.
- **Performance:** models farther than 85 units are hidden (fog already hides them). Not measured on real phones.
- **Start area is unchanged.**

## Global Constraints

As Phase 4: Solar System and the kit unchanged; no ocean names in the kit; reduced motion holds animals still; both themes; no commits until the owner allows them.

## Review Focus

1. Two of one species in range: the offer, the button and the orbit must refer to the same one. → scene test orbits a far instance and checks distance to that instance.
2. Hidden animals must reappear in the right place when the submarine approaches, including with a paused ocean. → scene test on visibility and pose.
3. Loops never reach a reef, the start, the edge or each other; coverage is even. → `oceanAnimals.test.js`.
4. Rocks and seagrass stay clear of every reef. → scene test.
5. Frame cost. → browser frame-rate sample.

---

### Task 1: Reef list and animal population (pure data)

**Files:** Modify `oceanFish.js`, `oceanReef.js`, `oceanAnimals.js`; Tests `oceanAnimals.test.js`, new `oceanReef.test.js`.

**Interfaces:**
- `loopPose(loop, seconds)` honours optional `loop.direction` (±1, default 1) and `loop.phase` (seconds, default 0).
- `REEFS: { key, x, z, size, radius }[]`, first is `{ key: 'coral-reef', x: REEF_SPOT.x, z: REEF_SPOT.z, size: 1 }`; `createOceanReef(water, size = 1)`.
- `ANIMALS: { key, id, discovery, orbit, radius, loop, create, animate }[]`; the first five keep their old keys (`parrotfish`, …) and loops.

- [ ] Tests first (population counts, unique keys, clear loops incl. every reef, even coverage, reef list rules), watch them fail, implement, pass.

### Task 2: Scene and environment

**Files:** Modify `oceanEnvironment.js`, `oceanScene.js`; Tests `oceanScene.test.jsx`.

- [ ] Tests first: every reef and animal present; far ones hidden and shown on approach; offer/orbit by key on a far instance; scenery clear of every reef; offers still report `{ id, name }`.
- [ ] Implement `key` tracking and distance hiding; docs; full suite; one batched browser pass; review.
