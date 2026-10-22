// Pure maths for the International Space Station (#50). No three import, so it
// can be tested in node.

export const ISS_LINE =
    "That's the International Space Station! Astronauts live there, and it goes round the Earth 16 times a day.";

// The world's orbit clock (solarSimulation.js) advances by dt × orbit speed,
// so at the default speed of 1 it counts real seconds. 12 of them per lap makes
// the station zip round Earth. (The real one takes about 92 minutes.)
export const ISS_LAP_SECONDS = 12;

// The real orbit is tilted 51.6° to the equator.
export const ISS_INCLINATION = (51.6 * Math.PI) / 180;

/** Angle round the orbit, in radians, for a given orbit-clock time. */
export function issAngle(orbitTime) {
    return (orbitTime / ISS_LAP_SECONDS) * Math.PI * 2;
}

/** Station centre relative to Earth's centre, on an inclined circle. */
export function issPosition(orbitTime, orbitRadius) {
    const a = issAngle(orbitTime);
    const flat = Math.sin(a) * orbitRadius;
    return {
        x: Math.cos(a) * orbitRadius,
        y: flat * Math.sin(ISS_INCLINATION),
        z: flat * Math.cos(ISS_INCLINATION),
    };
}

/** Unit vector of travel at a given time (the way the truss should point). */
export function issDirection(orbitTime) {
    const a = issAngle(orbitTime);
    const x = -Math.sin(a);
    const flat = Math.cos(a);
    return {
        x,
        y: flat * Math.sin(ISS_INCLINATION),
        z: flat * Math.cos(ISS_INCLINATION),
    };
}
