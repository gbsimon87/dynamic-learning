// Real orbit shapes: J2000 mean elements (JPL, Standish), angles in degrees
// relative to the ecliptic. Sizes come from each planet's `distance` (its
// semi-major axis in scene units) and the clock from its `speed`, so the
// shapes, tilts and directions are real while the timing stays compressed.
// `meanLongitude` places each planet where it was on 1 January 2000.
export const PLANET_ORBITS = {
    Mercury: { eccentricity: 0.20563, inclination: 7.005, ascendingNode: 48.331, perihelionLongitude: 77.458, meanLongitude: 252.251 },
    Venus: { eccentricity: 0.00677, inclination: 3.395, ascendingNode: 76.680, perihelionLongitude: 131.602, meanLongitude: 181.979 },
    Earth: { eccentricity: 0.01671, inclination: 0, ascendingNode: 0, perihelionLongitude: 102.938, meanLongitude: 100.465 },
    Mars: { eccentricity: 0.09339, inclination: 1.850, ascendingNode: 49.560, perihelionLongitude: 336.056, meanLongitude: 355.447 },
    Jupiter: { eccentricity: 0.04839, inclination: 1.304, ascendingNode: 100.474, perihelionLongitude: 14.728, meanLongitude: 34.396 },
    Saturn: { eccentricity: 0.05386, inclination: 2.486, ascendingNode: 113.662, perihelionLongitude: 92.599, meanLongitude: 49.955 },
    Uranus: { eccentricity: 0.04726, inclination: 0.773, ascendingNode: 74.017, perihelionLongitude: 170.954, meanLongitude: 313.238 },
    Neptune: { eccentricity: 0.00859, inclination: 1.770, ascendingNode: 131.784, perihelionLongitude: 44.965, meanLongitude: 304.880 },
    Pluto: { eccentricity: 0.24883, inclination: 17.142, ascendingNode: 110.304, perihelionLongitude: 224.069, meanLongitude: 238.929 },
};

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

/** Eccentric anomaly for mean anomaly `mean` (Newton's method on Kepler's equation). */
export function solveKepler(mean, eccentricity) {
    const m = ((mean % TAU) + TAU) % TAU;
    let anomaly = eccentricity < 0.8 ? m : Math.PI;
    for (let i = 0; i < 12; i++) {
        const step = (anomaly - eccentricity * Math.sin(anomaly) - m) / (1 - eccentricity * Math.cos(anomaly));
        anomaly -= step;
        if (Math.abs(step) < 1e-12) break;
    }
    return anomaly;
}

/**
 * Scene position on an ellipse with the Sun at one focus, from the eccentric
 * anomaly. Ecliptic north is scene +y; ecliptic X/Y map to scene z/x, which
 * keeps the model's anticlockwise-from-above direction.
 */
export function orbitPointAt(distance, orbit, eccentricAnomaly) {
    const e = orbit.eccentricity;
    const px = distance * (Math.cos(eccentricAnomaly) - e);
    const py = distance * Math.sqrt(1 - e * e) * Math.sin(eccentricAnomaly);
    const node = orbit.ascendingNode * DEG;
    const tilt = orbit.inclination * DEG;
    const perihelion = (orbit.perihelionLongitude - orbit.ascendingNode) * DEG;
    const cosN = Math.cos(node), sinN = Math.sin(node);
    const cosW = Math.cos(perihelion), sinW = Math.sin(perihelion);
    const cosI = Math.cos(tilt), sinI = Math.sin(tilt);
    const X = (cosN * cosW - sinN * sinW * cosI) * px + (-cosN * sinW - sinN * cosW * cosI) * py;
    const Y = (sinN * cosW + cosN * sinW * cosI) * px + (-sinN * sinW + cosN * cosW * cosI) * py;
    const Z = sinW * sinI * px + cosW * sinI * py;
    return { x: Y, y: Z, z: X };
}

/** Where a planet is at `orbitTime`: faster near the Sun, slower far away. */
export function orbitPosition({ distance, speed, orbit }, orbitTime) {
    const startMean = (orbit.meanLongitude - orbit.perihelionLongitude) * DEG;
    return orbitPointAt(distance, orbit, solveKepler(startMean + speed * orbitTime, orbit.eccentricity));
}

/** Closed loop of points for drawing the orbit line. */
export function orbitPathPoints(distance, orbit, segments = 256) {
    return Array.from({ length: segments }, (_, i) => orbitPointAt(distance, orbit, (i / segments) * TAU));
}
