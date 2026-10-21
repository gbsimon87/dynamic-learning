// Timing for the warp-in arrival (#1). No Three.js here, so it is unit-tested
// in node; warpIn.js does the drawing and moves the camera.

export const WARP_SECONDS = 2.6;
// sessionStorage, so the warp plays once per visit, not on every return to the page.
export const WARP_SEEN_KEY = "dl.solarWarpSeen";

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

/**
 * The warp `t` seconds in. `streaks` is the streaks' brightness, `speed` how
 * fast they rush past (both 0..1), and `camera` the eased 0..1 progress of the
 * swoop from deep space to the overview.
 */
export function warpFrame(t) {
    const x = clamp01((t - 0.1) / (WARP_SECONDS - 0.1));
    return {
        streaks: 1 - smoothstep(0.9, 1.8, t),
        speed: 1 - smoothstep(0.3, 1.8, t),
        camera: x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2,
        done: t >= WARP_SECONDS,
    };
}

/** Plays once per visit, never under reduced motion. Storage errors mean "play". */
export function shouldPlayWarp({ reducedMotion, storage = globalThis.sessionStorage }) {
    if (reducedMotion) return false;
    try {
        return storage?.getItem(WARP_SEEN_KEY) !== "1";
    } catch {
        return true;
    }
}

export function markWarpSeen(storage = globalThis.sessionStorage) {
    try {
        storage?.setItem(WARP_SEEN_KEY, "1");
    } catch {
        // Private mode: the warp may play again next time, which is harmless.
    }
}
