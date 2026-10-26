// What the galaxy map (#108) shows, level by level. No Three.js here, so it is
// unit-tested in node; galaxyMap.js draws it. Star systems come from the
// registry and events from the Beyond list, so adding either adds a marker.
// Owner rules: other galaxies are look-don't-land; star systems are real ones
// in the Milky Way.
import { skyDirection } from "./constellationSkyLayout.js";
import { positionLy } from "./systems/systemMath.js";

export const MAP_LEVELS = ["galaxies", "milky-way", "neighbourhood"];

export const GALAXIES = [
    { id: "milky-way", name: "Milky Way", distanceLy: 0, enterable: true,
        card: { what: "Our home galaxy, with hundreds of billions of stars.", fact: "The Sun is one of them, out in one of its spiral arms." } },
    { id: "andromeda", name: "Andromeda", distanceLy: 2.5e6, sky: { raHours: 0.712, decDeg: 41.27 }, look: "dont-land",
        card: { what: "The nearest big spiral galaxy to ours, with about a trillion stars.", fact: "On a very dark night you can see it without a telescope, as a faint smudge." } },
    { id: "triangulum", name: "Triangulum", distanceLy: 2.7e6, sky: { raHours: 1.564, decDeg: 30.66 }, look: "dont-land",
        card: { what: "A spiral galaxy, smaller than ours and Andromeda.", fact: "It is one of the farthest things people can see without a telescope." } },
    { id: "large-magellanic-cloud", name: "Large Magellanic Cloud", distanceLy: 160000, sky: { raHours: 5.392, decDeg: -69.76 }, look: "dont-land",
        card: { what: "A small galaxy that travels around the Milky Way.", fact: "From the southern half of the Earth it looks like a little cloud in the night sky." } },
    { id: "small-magellanic-cloud", name: "Small Magellanic Cloud", distanceLy: 200000, sky: { raHours: 0.877, decDeg: -72.83 }, look: "dont-land",
        card: { what: "Another small galaxy travelling around the Milky Way.", fact: "Both Magellanic Clouds are named after the voyage of the explorer Ferdinand Magellan." } },
];

// Events far beyond our galaxy (Space ripples: about 1.3 billion light-years)
// sit at this stand-in direction; nobody knows exactly where in the sky.
const EVENT_DISTANCE_LY = 1.3e9;
const EVENT_SKY = { raHours: 16, decDeg: 20 };

/** Map units on the galaxies level: distances squeezed to fit (shown as "Distances squeezed to fit"). */
export function mapDistance(ly) {
    return 40 * Math.log10(ly / 10000);
}

function at(sky, ly) {
    const d = skyDirection(sky), r = mapDistance(ly);
    return { x: d.x * r, y: d.y * r, z: d.z * r };
}

/** Markers for every level: `{ galaxies, events, systems }`, each with a `position` and `level`. */
export function mapCatalogue(registry, destinations) {
    return {
        galaxies: GALAXIES.map((galaxy) => ({
            ...galaxy, level: "galaxies",
            position: galaxy.sky ? at(galaxy.sky, galaxy.distanceLy) : { x: 0, y: 0, z: 0 },
        })),
        events: destinations.filter((destination) => destination.kind === "event").map((destination) => ({
            id: destination.id, name: destination.name, blurb: destination.blurb, level: "galaxies",
            label: destination.place.galaxyLabel, position: at(EVENT_SKY, EVENT_DISTANCE_LY),
        })),
        // One map unit per light-year, home at the centre.
        systems: registry.map((entry) => ({
            id: entry.id, name: entry.name, phrase: entry.phrase, spokenName: entry.spokenName ?? entry.phrase, home: Boolean(entry.home),
            mapCard: entry.mapCard ?? null, distanceLy: entry.position.distanceLy, level: "neighbourhood",
            position: positionLy(entry.position),
        })),
    };
}

/**
 * Nudges on-screen markers apart until each is at least `gap` pixels from
 * the ones before it, so neighbours in the sky (Andromeda and Triangulum,
 * the two Magellanic Clouds) are each big enough to tap. Pure.
 */
export function spreadMarkers(markers, gap = 52) {
    const placed = [];
    return markers.map((marker) => {
        if (!marker.visible) return marker;
        let { x, y } = marker;
        for (let tries = 0; tries < 24; tries++) {
            const near = placed.find((p) => Math.hypot(x - p.x, y - p.y) < gap);
            if (!near) break;
            let dx = x - near.x, dy = y - near.y;
            const length = Math.hypot(dx, dy);
            if (length < 1e-6) { dx = 0; dy = 1; } else { dx /= length; dy /= length; }
            x = near.x + dx * gap; y = near.y + dy * gap;
        }
        placed.push({ x, y });
        return x === marker.x && y === marker.y ? marker : { ...marker, x, y };
    });
}
