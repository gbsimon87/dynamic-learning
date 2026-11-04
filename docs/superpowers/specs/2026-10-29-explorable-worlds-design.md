# Explorable worlds — design

Date: 2026-10-29  
Status: Direction agreed. The first five shared pieces are built (Ocean Explorer Phase 3).  
Audience: children aged 6–8.

## The idea

The Solar System skill is the model for a family of explorable 3D worlds. Each
world reuses the Solar System's concept and differs in setting, mover and
content. The child moves around a scene, gets close to something, chooses
**Orbit**, circles it and reads its information card, then carries on
exploring. Over time each world gains the same set of features as the Solar
System: guided tours, missions, search, a settings drawer and trips between
areas.

Ocean Explorer is the second world. The submarine plays the part of the
spaceship, and reefs and sea creatures play the part of the planets.

## Future worlds

These are the intended direction, not a commitment to build them.

| World | What children could explore and learn |
|---|---|
| **Dinosaur valley** | Walk among dinosaurs, compare their sizes, examine footprints and uncover fossils. |
| **Garden safari** | Shrink to insect size and explore flowers, roots, soil, bees and an underground ant nest. Learn about plants and habitats. |
| **Inside the human body** | Travel through simplified body systems, follow food through digestion or watch the heart pump blood. |
| **Journey inside Earth** | Explore mountains, caves, volcanoes and Earth’s layers. Watch a gentle demonstration of an eruption. |
| **Castle and village** | Explore a castle, market, farm and workshop. Discover how people lived and how everyday objects were made. |
| **Rainforest expedition** | Travel from the forest floor to the canopy, spotting animals and discovering how different layers support life. |
| **Water-cycle adventure** | Follow a droplet through rivers, clouds, rain and groundwater, with changes visible around the child. |
| **Working farm** | Explore crops, animals and machinery, following familiar foods from field to plate. |
| **Shape city** | Explore buildings made from 3D shapes, inspect their faces and edges, and build simple structures. |
| **Weather station** | Explore clouds, wind, rain and snow, changing conditions to see how the landscape responds. |

## The mover

Each world has one mover: a spaceship, a submarine, a walker or a tiny
explorer. Some worlds are explored on foot. Every mover uses the same
controls: joystick, GO and keyboard, already shared through
`flightControls.js`. Only the mover's feel changes. A submarine glides and
rises, while a walker stays on the ground. Orbiting works for every mover.

## The shared kit

Shared pieces live in `src/components/worlds/` (a builder's call; moving
them later is cheap) and carry no Solar System or ocean names. A world supplies its scene, its mover and its content. The kit
supplies the discovery flow and the interface around it.

The kit grows from real use. A piece is extracted when a world needs it, and
the Solar System moves onto it in the same change, so every shared piece is
proven by two worlds from the start. Nothing is extracted in advance on a
guess.

| Piece | Solar System source today | Extracted in |
|---|---|---|
| Discovery data shape (what a card knows about a thing) | `systems/bodyInfo.js` | Ocean Phase 3 |
| Fold-out card sections | `SolarSections.jsx` | Ocean Phase 3 |
| Orbit / Leave orbit button | `SolarOrbitControl.jsx` | Ocean Phase 3 |
| Orbit pilot (circling, when Orbit is offered) | `solarPlanetOrbit.js` | Ocean Phase 3 |
| Information card | `SolarInfoCard.jsx` (Solar keeps its `solar-info-card` styles, which its tests rely on; the kit ships a default `world-card` look) | Ocean Phase 3 |
| Search | `solarSearch.js` | When a world needs it |
| Settings drawer, More menu | `SolarSettingsDrawer.jsx`, `SolarToolbarMenu.jsx` | When a world needs it |
| Guided tours | inside `SolarSystem.jsx` | Ocean Phase 5 |
| Missions | `SolarMissions.jsx`, `solarMissions.js` | When a world needs it |
| Trips between areas, area map | `SolarTripHud.jsx`, `GalaxyMapPanel.jsx`, `systems/registry.js` | Ocean Phase 6 |

Space-only content stays in the Solar System: planets, moons, comets, belts,
constellations, star-system data, Play & compare, moon phases, auroras and
Saturn's rings.

## Rules for shared pieces

- **The Solar System must not change.** Moving it onto a shared piece is a
  refactor. Children see the same buttons, words, cards, motion and layout
  as before. The existing Solar System tests must keep passing unchanged,
  apart from import paths.
- **What a world decides is data, not code in the kit.** For example, what
  can be orbited, how close Orbit is offered, the orbit's size and camera,
  the facts heading ("planet facts", "reef facts") and extra card sections.
  The kit contains no `kind === 'moon'` or `name === 'Saturn'` checks.
- **Leave `SolarSystem.jsx`'s main scene setup alone** beyond swapping
  imports and passing the new data. It is one very large effect, and
  restructuring it is not part of any extraction.
- **Each world's progress stays separate.** Missions or saved settings use a
  storage key per world.
- Both themes, large touch targets, keyboard access and reduced motion apply
  to every shared piece, as they do today.

## Related documents

- [Ocean Explorer design](2026-10-29-ocean-explorer-design.md), the first world
  built on the kit.
