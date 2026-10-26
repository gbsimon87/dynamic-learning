// Numbers shared by every star system definition (see validateSystem.js for
// the definition's shape). No Three.js here, so it is unit-tested in node.
import { skyDirection } from "../constellationSkyLayout.js";

const EARTH_DENSITY = 5.514; // g/cm³
const DAYS_PER_YEAR = 365.25;
// A system counts as "ahead" of the rocket within this angle of its heading.
const AHEAD_COS = Math.cos((30 * Math.PI) / 180);

/** Density in g/cm³ from mass and width in Earths. */
export function densityGcm3(massEarth, radiusEarth) {
    return (EARTH_DENSITY * massEarth) / radiusEarth ** 3;
}

/** Surface gravity, Earth = 1, from mass and width in Earths. */
export function surfaceGravity(massEarth, radiusEarth) {
    return massEarth / radiusEarth ** 2;
}

export function yearInEarthYears(periodDays) {
    return periodDays / DAYS_PER_YEAR;
}

/**
 * Where a system really is, in light-years, in the constellation sky's y-up
 * frame with home at the origin. The map, signposts and travel all use this.
 */
export function positionLy({ raHours, decDeg, distanceLy }) {
    if (!distanceLy) return { x: 0, y: 0, z: 0 };
    const d = skyDirection({ raHours, decDeg });
    return { x: d.x * distanceLy, y: d.y * distanceLy, z: d.z * distanceLy };
}

/** Unit vector from one position to another; zero when they are the same. */
export function directionBetween(from, to) {
    const x = to.x - from.x, y = to.y - from.y, z = to.z - from.z;
    const length = Math.hypot(x, y, z);
    if (length === 0) return { x: 0, y: 0, z: 0 };
    return { x: x / length, y: y / length, z: z / length };
}

/**
 * The system the rocket is heading towards from `fromId`, or null when none
 * lies within 30° of `heading` (a unit vector). Ready for when a third system
 * makes the destination depend on direction; with two systems the trip
 * always goes to the other one (owner).
 */
export function systemAhead(heading, fromId, entries) {
    const from = entries.find((entry) => entry.id === fromId);
    if (!from) return null;
    const origin = positionLy(from.position);
    let best = null, bestDot = AHEAD_COS;
    for (const entry of entries) {
        if (entry.id === fromId) continue;
        const d = directionBetween(origin, positionLy(entry.position));
        const dot = d.x * heading.x + d.y * heading.y + d.z * heading.z;
        if (dot >= bestDot) { best = entry.id; bestDot = dot; }
    }
    return best;
}
