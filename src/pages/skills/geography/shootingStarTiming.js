// Timing and hit-test maths for shooting stars (#8). No Three.js here, so it
// is unit-tested in node; shootingStars.js does the drawing.

export const WISH_LINE = "Make a wish!";

const MIN_DELAY = 20;
const MAX_DELAY = 40;
const FADE_IN = 0.1;
const FADE_OUT = 0.35;

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** Seconds to wait before the next streak: always in [20, 40). */
export function nextDelay(random = Math.random) {
    return MIN_DELAY + random() * (MAX_DELAY - MIN_DELAY);
}

/** Eased 0..1 progress of the streak's head `t` seconds in; clamped outside [0, duration]. */
export function streakProgress(t, duration) {
    const x = clamp01(t / duration);
    return 1 - (1 - x) * (1 - x); // ease-out: it flashes in fast, then glides
}

/** Opacity 0..1 of the streak: fades in quickly, fades out over the last part. */
export function streakFade(t, duration) {
    if (t <= 0 || t >= duration) return 0;
    const x = t / duration;
    return Math.min(clamp01(x / FADE_IN), clamp01((1 - x) / FADE_OUT));
}

/** True when two screen points (in pixels) are within `radiusPx` of each other. */
export function isNearScreenPoint(ax, ay, bx, by, radiusPx) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy <= radiusPx * radiusPx;
}
