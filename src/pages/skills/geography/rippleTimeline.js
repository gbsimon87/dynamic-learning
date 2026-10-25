// Timing and wave shapes for Space ripples (#94). No Three.js here, so it is
// unit-tested in node; spaceRipples.js does the drawing.
//
// Based on GW150914: two black holes spiral in, whirling faster as they close
// (the "chirp"), merge, and the last big ripple rolls out. Real ripples are
// invisible; the grid is a picture to help us imagine, and time is sped up.

export const MERGE_SECONDS = 12;
export const MAX_RIPPLES = 8;
// Generous for children's fingers, which wobble and press longer.
export const TAP_SLOP_PX = 10;
const TAP_MAX_MS = 700;
// The spiral takes this long, leaving the rest of MERGE_SECONDS for the flash,
// the wobble and the grid settling.
const INSPIRAL_SECONDS = 9;
const MERGE_SEPARATION = 0.15;
const MERGE_AT = INSPIRAL_SECONDS * (1 - MERGE_SEPARATION ** 4);
const BASE_SPIN = 2.5; // radians a second while still far apart
const CALM_FLASH = 0.3;
const RIPPLE_LIFE = 6;
export const WAVELENGTH = 4;
export const RIPPLE_PACKET = WAVELENGTH * 3; // how far behind its front a ring still moves the grid

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

// u = 1 - t / INSPIRAL_SECONDS. Separation shrinks as u^(1/4), the real
// inspiral shape, and spin grows as separation^-1.5 (Kepler), so the angle is
// the integral of BASE_SPIN * u^(-3/8).
function inspiralAngle(t) {
    const u = 1 - Math.min(t, MERGE_AT) / INSPIRAL_SECONDS;
    const angle = BASE_SPIN * INSPIRAL_SECONDS * (1 - u ** 0.625) / 0.625;
    // After the merge the one black hole keeps turning gently.
    return angle + Math.max(0, t - MERGE_AT) * BASE_SPIN;
}

/**
 * The merge `t` seconds after "Bring them together". `previousT` is the last
 * frame's time: `emitRing` is true when a ring should leave between the two,
 * once per half-turn (each black hole sends one) and once for the merge.
 */
export function mergeFrame(t, reducedMotion, previousT = null) {
    const merged = t >= MERGE_AT;
    const separation = merged ? 0 : (1 - t / INSPIRAL_SECONDS) ** 0.25;
    const angle = inspiralAngle(t);
    let emitRing = false;
    let ringStrength = 0.35 + 0.65 * (1 - separation);
    if (previousT !== null && previousT < t) {
        if (previousT < MERGE_AT && merged) {
            emitRing = true;
            ringStrength = 1.6;
        } else if (!merged) {
            emitRing = Math.floor(angle / Math.PI) > Math.floor(inspiralAngle(previousT) / Math.PI);
        }
    }
    const since = t - MERGE_AT;
    const flash = merged ? Math.exp(-since * 3) : 0;
    const wobble = merged ? Math.exp(-since * 1.5) : 0;
    return {
        separation,
        angle,
        emitRing,
        ringStrength,
        flash: reducedMotion ? flash * CALM_FLASH : flash,
        wobble: reducedMotion ? 0 : wobble,
        merged,
        done: t >= MERGE_SECONDS,
    };
}

/**
 * Rings travelling outward over the grid. Each one is a short wave packet
 * behind its front, flat ahead of it, that fades out by RIPPLE_LIFE seconds.
 * Full, `add` drops the oldest, so tapping fast never piles up work, but never
 * a ring marked `keep` (the merge's big ring) while there is another to drop.
 */
export function createRipplePool(max = MAX_RIPPLES) {
    let ripples = [];
    return {
        add({ x, z, amplitude, speed, keep = false }) {
            ripples.push({ x, z, amplitude, speed, keep, age: 0 });
            while (ripples.length > max) {
                const oldest = ripples.findIndex((ripple) => !ripple.keep);
                ripples.splice(oldest === -1 ? 0 : oldest, 1);
            }
        },
        update(dt) {
            for (const ripple of ripples) ripple.age += dt;
            ripples = ripples.filter((ripple) => ripple.age < RIPPLE_LIFE);
        },
        /** Each ring's centre, how far its front has run, and its faded strength. */
        waves() {
            return ripples.map(({ x, z, amplitude, speed, age }) => ({
                x, z, front: speed * age,
                strength: amplitude * (1 - clamp01((age - RIPPLE_LIFE * 0.6) / (RIPPLE_LIFE * 0.4))),
            }));
        },
        // spaceRipples.js's grid shader draws this same shape on the GPU.
        heightAt(x, z) {
            let height = 0;
            for (const { x: rx, z: rz, front, strength } of this.waves()) {
                const r = Math.hypot(x - rx, z - rz);
                const behind = front - r;
                if (behind < 0 || behind > RIPPLE_PACKET) continue;
                height += strength * Math.sin(behind * 2 * Math.PI / WAVELENGTH) * Math.exp(-behind / 6) / (1 + r * 0.03);
            }
            return height;
        },
        list: () => ripples,
        clear() { ripples = []; },
    };
}

/** A tap barely moves and is short; anything else is a drag to look around. */
export function isTap(down, up) {
    if (!down || !up) return false;
    return Math.hypot(up.x - down.x, up.y - down.y) < TAP_SLOP_PX && up.time - down.time < TAP_MAX_MS;
}
