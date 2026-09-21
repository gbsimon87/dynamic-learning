/**
 * Turns catalogue sky coordinates into things that can be drawn.
 *
 * Right ascension arrives in hours (0-24) and declination in degrees, which is
 * how star catalogues quote them. Keeping the real coordinates in the data and
 * projecting here means the same numbers can later be hung on a celestial
 * sphere in the Three.js scene without touching constellations.js.
 */

const DEG = Math.PI / 180;
const HOURS_TO_DEGREES = 15;

// Dot sizes are fixed across every constellation rather than normalised per
// constellation, so a faint pattern still reads as faint once there are several.
const BRIGHTEST_MAGNITUDE = 1.5;
const FAINTEST_MAGNITUDE = 4.5;
const LARGEST_RADIUS = 2.6;
const SMALLEST_RADIUS = 0.9;

const mean = (values) => values.reduce((total, value) => total + value, 0) / values.length;

// Right ascension wraps at 24h. A circular mean keeps constellations near that
// seam together instead of incorrectly centring them on the opposite sky.
function meanRightAscension(stars) {
    const angles = stars.map((star) => star.raHours * HOURS_TO_DEGREES * DEG);
    const sinMean = mean(angles.map(Math.sin));
    const cosMean = mean(angles.map(Math.cos));
    return Math.atan2(sinMean, cosMean);
}

function starRadius(magnitude) {
    // Magnitude runs backwards: smaller number means brighter star.
    const span = FAINTEST_MAGNITUDE - BRIGHTEST_MAGNITUDE;
    const t = Math.min(Math.max((magnitude - BRIGHTEST_MAGNITUDE) / span, 0), 1);
    return LARGEST_RADIUS + (SMALLEST_RADIUS - LARGEST_RADIUS) * t;
}

/** A point on the unit celestial sphere, in the scene's y-up convention. */
export function raDecToUnitVector({ raHours, decDeg }) {
    const ra = raHours * HOURS_TO_DEGREES * DEG;
    const dec = decDeg * DEG;
    const cosDec = Math.cos(dec);
    return { x: cosDec * Math.cos(ra), y: Math.sin(dec), z: cosDec * Math.sin(ra) };
}

/**
 * Gnomonic (tangent-plane) projection about the mean position of the stars,
 * scaled to fit a padded box while preserving the constellation's real
 * proportions. Returns chart coordinates ready for an SVG viewBox.
 */
export function projectConstellation(stars, { padding = 8, box = 100 } = {}) {
    if (!Array.isArray(stars) || stars.length === 0) {
        return { points: [], width: box, height: box };
    }

    const ra0 = meanRightAscension(stars);
    const dec0 = mean(stars.map((star) => star.decDeg)) * DEG;
    const sinDec0 = Math.sin(dec0);
    const cosDec0 = Math.cos(dec0);

    const flat = stars.map((star) => {
        const ra = star.raHours * HOURS_TO_DEGREES * DEG;
        const dec = star.decDeg * DEG;
        const deltaRa = ra - ra0;
        const cosC = sinDec0 * Math.sin(dec) + cosDec0 * Math.cos(dec) * Math.cos(deltaRa);
        const east = (Math.cos(dec) * Math.sin(deltaRa)) / cosC;
        const north = (cosDec0 * Math.sin(dec) - sinDec0 * Math.cos(dec) * Math.cos(deltaRa)) / cosC;
        // East to the left (the sky seen from underneath) and north to the top
        // (SVG's y axis grows downward). Both negations are load-bearing.
        return { id: star.id, x: -east, y: -north, magnitude: star.magnitude };
    });

    const xs = flat.map((point) => point.x);
    const ys = flat.map((point) => point.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const spanX = Math.max(...xs) - minX;
    const spanY = Math.max(...ys) - minY;
    // One scale for both axes: stretching each to fill the box would destroy
    // the shape the child is meant to recognise.
    const scale = (box - padding * 2) / (Math.max(spanX, spanY) || 1);

    return {
        points: flat.map((point) => ({
            id: point.id,
            x: padding + (point.x - minX) * scale,
            y: padding + (point.y - minY) * scale,
            radius: starRadius(point.magnitude),
        })),
        width: spanX * scale + padding * 2,
        height: spanY * scale + padding * 2,
    };
}
