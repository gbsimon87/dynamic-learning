// Timing for a trip between star systems. No Three.js here, so it is
// unit-tested in node; solarFreeFlight.js moves the rocket and the scene
// draws the streaks. The leaving system plays the warning and the first half
// of the dash; the arriving system plays the second half (see the spec,
// "The trip is split across the rebuild").

export const WARNING_SECONDS = 3;
export const MAX_TRIP_SECONDS = 10;
// The warning starts this close to the system's edge.
export const EDGE_OFFER_MARGIN = 5;
// The rocket arrives (or turns back to) this far inside the edge.
export const ARRIVE_INSET = 20;
// Turning back mid-trip needs the rocket to face mostly backwards...
export const TURN_BACK_ALIGNMENT = -0.5;
// ...for this long, so a wobble on the stick never ends a trip by accident.
export const TURN_BACK_HOLD = 0.6;

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

/** Seconds of dash: about 6 s for nearby stars, never more than 7 s. */
export function dashSecondsFor(distanceLy) {
    return Math.min(7, 5 + 0.75 * Math.log10(Math.max(distanceLy, 1)));
}

/**
 * The trip `elapsed` seconds after the warning began. `previous` is last
 * frame's `elapsed`, so `handoff` is true on exactly one frame: the one that
 * crosses half the dash. `progress` (0..1) covers the dash.
 */
export function tripFrame({ elapsed, previous = elapsed, dashSeconds, calm }) {
    const start = WARNING_SECONDS, half = start + dashSeconds / 2, end = start + dashSeconds;
    const phase = elapsed < start ? "warning" : elapsed < half ? "departing" : elapsed < end ? "arriving" : "done";
    const rush = phase === "warning" || phase === "done" ? 0
        : phase === "departing" ? smoothstep(start, start + 1.2, elapsed) : 1 - smoothstep(end - 1.5, end, elapsed);
    const fromHalf = Math.abs(elapsed - half);
    // Calm trips hide the hand-over behind a fade; the streaks cover it otherwise.
    const fade = phase === "warning" || phase === "done" ? 0
        : calm ? 1 - smoothstep(0.4, 1.2, fromHalf) : 0.5 * (1 - smoothstep(0.1, 0.5, fromHalf));
    return {
        phase,
        progress: clamp01((elapsed - start) / dashSeconds),
        handoff: previous < half && elapsed >= half,
        streakSpeed: calm ? 0 : rush,
        streakBrightness: calm ? 0 : rush,
        fade,
    };
}

// Starting needs the rocket to face clearly outwards and really move that way;
// cancelling needs it to face back. The gap between them stops the warning
// flickering while the rocket coasts or wobbles at the edge.
export const WARN_ALIGNMENT = 0.3;
export const WARN_SPEED = 0.5;

/** Whether a rocket heading out past the edge should get the leaving warning. */
export function shouldWarn({ distance, edgeRadius, radialSpeed, alignmentWithOutward = 1, orbiting, autopilot, armed }) {
    return distance >= edgeRadius - EDGE_OFFER_MARGIN && radialSpeed > WARN_SPEED && alignmentWithOutward > WARN_ALIGNMENT
        && !orbiting && !autopilot && armed;
}

/** Facing back towards the star (alignment with "outwards" below zero) cancels the warning. */
export function warningCancelled(alignmentWithOutward) {
    return alignmentWithOutward < 0;
}

/** Turning back mid-trip: true once the rocket has faced backwards long enough. */
export function createTurnBackIntent() {
    let held = 0;
    return {
        update(dt, alignmentWithTrip) {
            held = alignmentWithTrip < TURN_BACK_ALIGNMENT ? held + dt : 0;
            return held >= TURN_BACK_HOLD;
        },
        reset() { held = 0; },
    };
}

/** Where an arriving rocket ends up: just inside the edge, on the side it came from, facing the star. */
export function arrivalPose(edgeRadius, directionToOrigin) {
    const r = edgeRadius - ARRIVE_INSET;
    const { x, y, z } = directionToOrigin;
    return { position: [x * r + 0, y * r + 0, z * r + 0], lookAt: [0, 0, 0] };
}
