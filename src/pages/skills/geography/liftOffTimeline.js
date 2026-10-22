// Timing for the lift-off that starts the tour (#35). No Three.js here, so it
// is unit-tested in node; liftOff.js draws the smoke.

// The countdown takes this long; the ship leaves on "Lift off!".
export const COUNTDOWN_SECONDS = 3;
// "Lift off!" stays on screen this long after the ship leaves.
export const CHEER_SECONDS = 1.2;
export const COUNT_WORDS = { 3: "Three", 2: "Two", 1: "One", 0: "Lift off!" };

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

/**
 * The lift-off `t` seconds in. `count` is the number on screen (3, 2, 1, then
 * 0 for "Lift off!", then null when it's gone), `ignition` how hard the engine
 * is burning before the ship leaves (0..1), `smoke` how many puffs a second to
 * make, and `launch` true from the moment the ship should leave.
 */
export function liftOffFrame(t) {
    const launch = t >= COUNTDOWN_SECONDS;
    let count = null;
    if (!launch) count = 3 - Math.floor(t);
    else if (t < COUNTDOWN_SECONDS + CHEER_SECONDS) count = 0;
    const ignition = launch ? 1 : 0.15 + 0.85 * clamp01(t / COUNTDOWN_SECONDS) ** 2;
    return {
        count,
        ignition,
        smoke: launch ? 0 : 6 + 34 * ignition,
        launch,
        done: t >= COUNTDOWN_SECONDS + CHEER_SECONDS,
    };
}
