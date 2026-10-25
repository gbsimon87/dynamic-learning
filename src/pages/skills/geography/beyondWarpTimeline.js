// Timing for the warp to Beyond (#113). No Three.js here, so it is unit-tested
// in node; beyondWarp.js does the drawing.
//
// The child holds the engine to ride through a pretend black-hole shortcut.
// Letting go never fails or reverses the ride: the rocket drifts on slowly
// and still arrives (owner). Under reduced motion there is no swirl and no
// streaks, only progress and a soft flash.

export const WARP_HOLD_SECONDS = 5;
// Released, the ride moves at a quarter speed, so about 20 s if never held.
export const WARP_DRIFT_SHARE = 0.25;
export const WARP_HOME_SECONDS = 3;
const CALM_FLASH = 0.3;

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

/**
 * The look of the warp at `progress` (0..1). `doorway` is how big the black
 * hole ahead looks, `swirl` the tunnel's strength, `streakSpeed` and
 * `streakBrightness` drive warpStreaks.js, and `flash` the exit flash.
 */
function warpLook(progress, calm) {
    const p = clamp01(progress);
    const fadeOut = 1 - smoothstep(0.9, 1, p);
    const swirl = smoothstep(0.1, 0.3, p) * fadeOut;
    const flash = smoothstep(0.9, 0.95, p) * (1 - smoothstep(0.95, 1, p));
    return {
        progress: p,
        stage: p >= 1 ? "done" : p >= 0.9 ? "flash" : p >= 0.2 ? "tunnel" : "doorway",
        doorway: smoothstep(0, 0.2, p),
        swirl: calm ? 0 : swirl,
        streakSpeed: calm ? 0 : smoothstep(0.15, 0.4, p) * fadeOut,
        streakBrightness: calm ? 0 : swirl,
        flash: calm ? flash * CALM_FLASH : flash,
        calm,
        done: p >= 1,
    };
}

/** The ride out, stepped each frame with whether the engine is held. */
export function createWarpRide({ reducedMotion }) {
    let progress = 0;
    return {
        step(dt, holding) {
            const rate = (holding ? 1 : WARP_DRIFT_SHARE) / WARP_HOLD_SECONDS;
            progress = clamp01(progress + Math.max(dt, 0) * rate);
            return warpLook(progress, reducedMotion());
        },
    };
}

/** The ride home plays by itself: no holding. */
export function homeRideFrame(t, reducedMotion) {
    return warpLook(t / WARP_HOME_SECONDS, reducedMotion);
}
