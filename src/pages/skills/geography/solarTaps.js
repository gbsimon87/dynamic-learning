// Tap feedback for the 3D Solar System: the squishy bounce (#26) and the
// Sun's tap counter (#24 sneeze, #25 safety tip). No Three.js here, so it is
// unit-tested in node; anything with a `scale.set(x, y, z)` can bounce.

export const SUN_SAFETY_LINE = "Never look at the real Sun. It can hurt your eyes!";
export const SUN_SNEEZE_LINE = "A-a-achoo! The Sun sneezed out a solar flare!";

const BOUNCE_SECONDS = 0.9;

/** Squash amount `t` seconds into a bounce: starts at 0, wobbles, dies away. */
export function bounceSquash(t, amplitude) {
    if (t <= 0 || t >= BOUNCE_SECONDS) return 0;
    return amplitude * Math.exp(-5 * t) * Math.sin(t * 20);
}

/**
 * Squishy bounces, as a module for solarModules.js. `bounce(object)` squashes
 * it vertically and stretches it sideways, then settles back to the uniform
 * scale it had. `settle()` ends every bounce at once: the meteor checks that
 * Earth's scale is exactly its radius before it launches.
 */
export function createBounces() {
    const active = new Map(); // object → { base, t, amplitude }

    function apply(object, base, squash) {
        object.scale.set(base * (1 + squash / 2), base * (1 - squash), base * (1 + squash / 2));
    }

    return {
        bounce(object, amplitude = 0.18) {
            const running = active.get(object);
            active.set(object, { base: running ? running.base : object.scale.x, t: 0, amplitude });
        },
        isBouncing: (object) => active.has(object),
        update(dt) {
            for (const [object, state] of active) {
                state.t += dt;
                if (state.t >= BOUNCE_SECONDS) {
                    object.scale.set(state.base, state.base, state.base);
                    active.delete(object);
                } else {
                    apply(object, state.base, bounceSquash(state.t, state.amplitude));
                }
            }
        },
        settle() {
            for (const [object, state] of active) object.scale.set(state.base, state.base, state.base);
            active.clear();
        },
        dispose() {
            this.settle();
        },
    };
}

/**
 * Counts taps on the Sun. The first tap of a visit gives the safety tip; five
 * taps within `windowMs` make it sneeze. The first tap counts towards the five.
 */
export function createSunTapCounter({ needed = 5, windowMs = 3000 } = {}) {
    let warned = false;
    let taps = [];
    return {
        tap(nowMs) {
            taps = taps.filter((time) => nowMs - time < windowMs);
            taps.push(nowMs);
            if (taps.length >= needed) {
                taps = [];
                return "sneeze";
            }
            if (!warned) {
                warned = true;
                return "safety";
            }
            return null;
        },
    };
}
