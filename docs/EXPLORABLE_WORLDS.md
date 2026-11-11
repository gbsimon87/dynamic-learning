# Explorable worlds: Solar System and Ocean Explorer

How the 3D Skills Mode worlds are built, moved here from the Ocean Explorer
branch's notes when it was merged (2026-11-04). The Solar System roadmap is
[SOLAR_SYSTEM_IDEAS.md](SOLAR_SYSTEM_IDEAS.md); upcoming Ocean Explorer work is
idea #44 in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Owner review of the sea-life
facts and physical-device review are still pending.

## Ocean Explorer — animal surfaces and swimming (2026-11-11)

All twelve existing species now have more individual surface and motion detail:
scales for reef fish, smooth mammal/adult swordfish skin, shark denticles, ray
spots, bony seahorse/turtle skin ridges and octopus mottling. Fine relief and a
subtle Fresnel rim use the existing standard material pass; thin tissue gets
approximate sunlight backlighting. Caustics use the final morphed surface and
its upward-facing normal.

`oceanAnimalMotion.js` builds two relative position/normal morphs per flexible
mesh, blending a travelling wave on the GPU. Fish/sharks sweep laterally;
whales/dolphins flex vertically. Fin and tail roots follow the body. Rays flex
along each wing, turtle/whale flipper tips bend, octopus suckers move with the
arms, and jellyfish tentacles lag the bell pulse. Per-instance phases avoid
synchronised schools; hover motion lives below the unchanged discovery anchors.
The existing water pause/reduced-motion rules apply to all movement.

Static anatomy batches by material within each pivot. Fine details hide beyond
26 units and appendages update at most 15 Hz beyond 32 units; travel remains
smooth and existing 85-unit visibility culling remains. Full-detail models use
about 2,500–12,600 triangles, with no downloaded animal textures or extra
rendering passes. Real phone performance and WebGL appearance remain unverified.
See the [implementation and validation record](superpowers/2026-11-11-ocean-explorer-animal-realism.md).

## Ocean Explorer — camera views (2026-11-11)

Press **C** or use **Controls → Cockpit view** to toggle the outside camera and
a forward-facing 3D cockpit. `oceanCockpit.js` builds its bevelled pressure frame,
curved glass, lit metal consoles, twin articulated pilot sticks, throttle levers,
gauges and switch banks. Three telemetry screens show scene-relative depth,
heading, drive inputs and actual nearby discoveries; other hardware is decorative.
The separate camera follows the submarine, including tours
and orbits, while preserving the outside camera's viewing angle. Drag/zoom apply
to the outside view; driving works in both. No camera preference is persisted.
Fixed furniture is batched by material, screens refresh at most five times per
second, and the cabin is created only on first use. See the
[3D interior record](superpowers/2026-11-11-ocean-explorer-3d-cockpit.md) and
[camera-toggle record](superpowers/2026-11-11-ocean-explorer-camera.md).

## Ocean Explorer — full-screen world and natural detail (2026-11-11)

`/skills/ocean-explorer` now fills `100dvh`, with the navbar and shared Skills
back bar hidden on this route. An overlaid Back to Skills link, title, reef-tour
button and Controls menu replace the old page header and framed preview. The
menu retains pause, reset, return-to-start and keyboard/touch help. Discovery
cards, orbit controls, tour controls and touch steering have responsive overlay
positions; touch steering is hidden during orbit. Theme colours remain paired
in `App.css`.

`oceanModelDetail.js` supplies continuous tapered bodies, curved tapered tubes,
sculpted fins and procedural skin/scale/coral detail. The existing animals have
more natural colours and anatomy, including countershading, shark gills, whale
grooves, turtle scutes, pointed ray wings, curled octopus arms with instanced
suckers, and translucent jellyfish. Porcupinefish no longer inflate repeatedly
while swimming. `oceanReef.js` builds branching coral, open sea fans, grooved
brain coral and hollow sponges, baking stationary parts into material batches.

The submarine has reflective glass, painted and metallic materials, hull seams,
ballast tanks, skids, instanced porthole bolts and lamps. `oceanLighting.js`
bakes a small underwater reflection environment, disposed with the scene. Sand
has broad colour variation, rocks have mottling, seagrass sways with the water
clock, caustics soften with depth, and haze/light shafts have gentler falloff.
Existing pause/reduced-motion handling also holds the grass still. The default
camera sits farther back to show more habitat. No external assets are fetched.

Production build passed; tests, lint, browser and device checks were deferred
at the owner's request. See the [implementation record](superpowers/2026-11-11-ocean-explorer-immersive.md).
This section supersedes the original preview's layout/model descriptions below;
the discovery facts, routes and species distribution remain as previously authored.

## Ocean Explorer — Reef neighbours tour (2026-11-09)

**Start reef tour** takes the submarine on a short, optional assisted journey
through three existing discoveries: coral reef, parrotfish and green sea turtle.
Each arrival opens its normal orbit/card with a small age-appropriate narration.
The tour can be paused (which also holds its orbit), resumed, replayed/muted at a
stop, moved backward/forward and skipped without saving anything; free driving
and manual discovery remain unchanged. Reduced motion arrives straight at each
stop instead of animating the travel. Owner review of the existing sea-life facts
and physical-device review remain open.

## Shared world kit (2026-10-29)

`src/components/worlds/` holds world-neutral pieces that Solar System and Ocean
Explorer both use: `discovery.js` (the card's data shape and `validateDiscovery`),
`WorldSections.jsx` (fold-out sections), `WorldOrbitControl.jsx` (Orbit / Leave
orbit), `orbitPilot.js` (`createOrbitPilot`, `nearestOrbitTarget`, `ORBIT_RATE`)
and `WorldInfoCard.jsx`. A world passes its rules as data: an orbit `profile(target)`
(entry distance, radius, camera rig, optional `level`), an `isSolid` obstacle filter,
the model's `forward` axis, and card slots. `solarPlanetOrbit.js` and `SolarInfoCard.jsx`
are thin wrappers; Solar keeps its `solar-info-card` styles through the card's
`baseClass`, so its DOM and tests are unchanged. Extract the next piece (search,
settings, tours, missions, trips) when a world needs it, moving Solar onto it in
the same change.

## Ocean Explorer — more species (2026-10-29)

Seven more species join the five reef animals: Caribbean reef shark (5), giant Pacific octopus
(6), humpback whale (3, drawn much smaller than real), swordfish (5), bottlenose dolphin (6),
porcupinefish (6) and moon jelly (8), 85 animals in all. Their models are in
`oceanMoreCreatures.js` (sharing `kit` from `oceanCreatures.js`); each has its own orbit profile
sized to the animal. They have no home loop: every one is placed across the ocean. Facts come
from NOAA, NOAA Fisheries, NPS, MBARI, the Florida Museum and Monterey Bay Aquarium pages listed
in each card; unverifiable claims (octopus blue blood) were left out. Owner review pending.

## Ocean Explorer — a busy ocean (2026-10-29)

`REEFS` (`oceanReef.js`) lists nine reefs: the original plus eight spread by best-candidate
sampling (1 to 1.2 times its size). `ANIMALS` (`oceanAnimals.js`) now has one entry per animal: 46
at first (parrotfish 14, clownfish 10, turtle 7, ray 7, seahorse 8). The first of each species keeps
its old home loop; extras are placed across the ocean by the same sampling, clear of every reef,
the start, the edge and each other, each with its own loop size, height, speed, direction and
starting point. A discovery has a unique `key` (what is in the water) and an `id` (which card
to show): the scene offers, orbits and tracks by `key`, while callbacks and the page still speak
`id`. Animals beyond 85 units from the submarine are hidden and not animated; `environment.focus`
shows them again, in the right place, as it nears. Not yet measured on real phones. See the
[Phase 4c plan](superpowers/plans/2026-10-29-ocean-explorer-phase-4c-busy-ocean.md).

## Ocean Explorer — bigger ocean (2026-10-29)

The drivable area is 20 times the first preview's: `STEERING.areaRadius` 22 → 100. The seabed
runs 80 units past the edge so fog ends the view. About 440 rocks and 820 seagrass patches are
spread evenly by area (`scatter` uses √random) out to 20 units past the edge and 28 light shafts are scattered across the
ocean. The sun and its ±24 shadow box follow the submarine (`followSun`), and the suspended
motes wrap in a 54-unit box around the camera in the vertex shader. Speed is unchanged, so the
edge is about 25 s from the start. 

## Ocean Explorer — Phase 4b more animals (2026-10-29)

`oceanAnimals.js` lists the reef's swimming animals (parrotfish, a clownfish group, green sea
turtle, spotted eagle ray, seahorse): each carries its discovery, orbit profile (with
`faceTravel`), target radius, circular swim loop and model builder (`oceanCreatures.js`).
`oceanEnvironment.js` builds and moves them all from that list, so a new animal is data plus a
model. `oceanAnimals.test.js` keeps loops clear of the reef, the start, the area edge and each
other. Facts are NOAA and Florida Museum sourced; owner review pending. See the
[Phase 4b plan](superpowers/plans/2026-10-29-ocean-explorer-phase-4b-more-animals.md).

## Ocean Explorer — Phase 4 parrotfish (2026-10-29)

`oceanFish.js` builds an original stylised parrotfish (about 1.8 long, no shadow) and
`fishPose(seconds)`, a 30-second circle of radius 5 around (−12, −3) at height 3.2,
starting on the side nearest the submarine and clear of the reef, the start and the
rocks. The environment moves it only while the water moves, so Pause ocean and
reduced motion hold it still. Every discovery carries its own `orbit` profile
(`FISH_ORBIT`: offered within 5.5, radius 3, a high camera so the hull never hides
the fish); the scene re-checks the offer as the fish swims past a parked submarine,
and the page picks the card by the orbited discovery's id. Facts come from NOAA and
the Florida Museum; owner review pending.

## Ocean Explorer — Phase 3 coral reef (2026-10-29)

`oceanReef.js` builds a stylised reef (scaled ×1.45, radius about 4) at `REEF_SPOT`
(0, −11), straight ahead of the start; rocks and seagrass are scattered clear of
it and it is a steering obstacle. `oceanDiscoveries.js` holds `REEF_DISCOVERY`
(NOAA-sourced facts, owner review pending) and `REEF_ORBIT`. `oceanScene.js`
offers orbit within 11 units of an invisible anchor 4 above the reef base, circles
level at radius 7.5 with a high chase camera, ignores steering while orbiting and
hands steering back in place on leave; Back to start ends an orbit. The page shows
the Orbit control top-left and the card top-right (full width under 720px); the
card opens with each orbit, × keeps orbiting, and Escape leaves orbit.

## Ocean Explorer — Phase 1 preview (2026-10-29)

`/skills/ocean-explorer` is an ungated, lazy-loaded page using the shared Skills
back bar and normal navbar. `OceanExplorer.jsx`/`.css` provide the preview label,
viewing instructions, Reset view and loading/unavailable states.
`oceanSubmarine.js` builds an original static model from simple Three.js shapes;
`oceanScene.js` adds water-coloured fog, lighting, scenery and bounded
OrbitControls. Drag/pinch/wheel and focused arrow/+/-/Home keys change only the
view. The submarine stays stationary. Both themes refresh the scene palette
without resetting its camera. Pixel ratio is capped at 1.5, and resources and
listeners are released on unmount or context loss.

Water appearance follow-up (2026-10-29): `oceanWater.js` integrates the Three.js
Water addon with a 256×256 reflection target, original seamless DataTexture
normal/caustic/sand maps and paired surface/seabed colours. Its surface faces down
at scene height 9. The r181 fragment shader's normal is flipped for underside
lighting/Fresnel shading, with reduced base reflectance and stylised transmitted
daylight. Camera limits keep every view below the surface.
Review this small shader adaptation and reflection-target ownership when
upgrading Three.js. The seabed patterns are stylised light effects, not a
physical caustics simulation.

Environment detail follow-up (2026-10-29): `oceanEnvironment.js` adds a gently
undulating 220-unit sand terrain with fine ripple/bump texture, 38 instanced
rocks, 420 static seagrass blades and 150 faint suspended particles. Rocks and
sand share two projected, differently scaled caustic layers generated from
jittered cells, replacing the obvious repeating sine net. The scene uses a
distance haze, faint sunlight volumes, hemisphere lighting and ACES tone
mapping. One 1024×1024 directional shadow map updates once for the static
geometry, rather than on every water frame. Instanced buffers and shadow maps
are explicitly disposed alongside textures/materials/geometry. Decorations
leave the craft’s immediate space clear; camera fitting still uses the
submarine alone. These are visual details, with no new discoveries or controls.

Screenshot corrections (2026-10-29): removed the separate unfogged gradient
dome. Its different colour exposed the distant, fogged floor/surface boundaries
as a bright horizontal strip; the background now shares the fog colour. Water
normals now come from a seamless multi-scale noise height field, replacing
parallel sine-wave stripes. Rock positions are welded before recalculating
normals for rounded shading. Side porthole housings extend beyond the widest
part of the hull, keeping the whole rim visible; raycast coverage checks all
four rims. Appearance awaits the owner’s next screenshot; no browser checks.

Water and suspended-particle motion render at up to 30 frames/second, with a Pause/Resume ocean
control (it also stops the fish). Reduced motion forces a still ocean; changing the preference while
running also stops the effect. Hidden tabs, zero-sized containers, pause and
disposal cancel the animation; returning from a hidden tab does not jump time.
Paused/reduced-motion scenes render only on view/size/theme changes. The helper
explicitly disposes its generated textures and the addon's reflection target,
in addition to scene geometry/material cleanup. No renderer migration or
external texture download is required.

Phase 2 steering (2026-10-29): the submarine drives with the Solar System
free-flight scheme — `steerInput`/`stickVector` from `flightControls.js` and
an adapted joystick/GO (`OceanDriveControls.jsx`, touch/≤720px only, like
Solar). Arrows/WASD or the stick turn and rise/dive; hold GO or Space to move.
Keys are read on the focused canvas only; blur, window blur and hidden tabs
release them. Shift+arrows look around; +/−/Home still zoom/reset the view.
`oceanSteering.js` is pure: eased speed/turn/climb, a 22-unit area, seabed
clearance, a height limit below the surface and soft rock bumps (rock
footprints come from `oceanEnvironment.js` `obstacles`). Nothing damages or
times the child. `oceanScene.js` keeps the child's chosen camera offset in
the craft's yaw frame, so the view follows rigidly with no automatic swing.
Steering frames run at the display rate, water-only frames keep the 30 fps
cap, and the loop stops when the craft is idle and water is still. The
cached shadow map refreshes only while the craft moves. Back to start resets
the pose and view. `solarFreeFlight.js`/`solarFlightCamera.js` were not
reused: they are bound to planets/trips and replace drag-to-look.
