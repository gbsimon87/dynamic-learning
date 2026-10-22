// Flight planning for the autopilot ship (#34). No Three.js here, so it is
// unit-tested in node; autopilotShip.js builds the ship and moves the camera.
// Points are plain { x, y, z } objects in scene units, with the Sun at the origin.

export const SHIP_LINE = "That's your spaceship! Tap a planet and it will fly you there.";
// The Sun's radius is 5 and its glow reaches further; flights stay outside this.
export const SUN_CLEARANCE = 14;
// Seconds the camera takes to swing in behind the ship as it sets off.
export const CHASE_IN_SECONDS = 0.9;
// The last part of the flight, as progress 0..1, where the camera hands over
// from chasing the ship to framing the planet.
const ARRIVE_FROM = 0.62;

function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const scale = (a, k) => ({ x: a.x * k, y: a.y * k, z: a.z * k });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const length = (a) => Math.sqrt(dot(a, a));

/** Longer trips take longer, but even Pluto is reached in under seven seconds. */
export function flightSeconds(distance) {
    return Math.min(6.5, Math.max(2, 1.8 + 0.9 * Math.log(1 + distance / 8)));
}

/**
 * The point the ship passes halfway, so the path arcs up out of the planets'
 * plane and bends round the Sun instead of flying through it.
 */
export function planWaypoint(start, end, sunClearance = SUN_CLEARANCE) {
    const span = sub(end, start);
    const distance = length(span);
    const mid = scale(add(start, end), 0.5);
    // A gentle climb, more for longer trips, so it reads as a flight.
    const lift = Math.min(distance * 0.12, 40);
    let waypoint = add(mid, { x: 0, y: lift, z: 0 });

    // Closest point to the Sun on the straight line: if it's too close, push
    // the waypoint out sideways, away from the Sun.
    const along = distance > 0 ? clamp01(-dot(start, span) / (distance * distance)) : 0;
    const closest = add(start, scale(span, along));
    const closestFlat = { x: closest.x, y: 0, z: closest.z };
    if (length(closestFlat) < sunClearance) {
        let away = closestFlat;
        if (length(away) < 1e-6) {
            // The line runs straight through the Sun: go round its side.
            away = { x: -span.z, y: 0, z: span.x };
            if (length(away) < 1e-6) away = { x: 1, y: 0, z: 0 };
        }
        // The curve only goes halfway to its control point, so aim past the clearance.
        const push = scale(away, (sunClearance * 1.25) / length(away));
        waypoint = { x: push.x, y: waypoint.y, z: push.z };
    }
    return waypoint;
}

/**
 * Where the ship is at progress `t` (0..1): a curve from `start` to `end`
 * that passes through `waypoint` halfway. `end` may move during the flight
 * (planets orbit), so it is passed in every frame.
 */
export function flightPoint(start, waypoint, end, t, sunClearance = SUN_CLEARANCE) {
    // The control point that makes a quadratic Bézier pass through the waypoint at t = 0.5.
    const control = sub(scale(waypoint, 2), scale(add(start, end), 0.5));
    const u = 1 - t;
    const point = add(add(scale(start, u * u), scale(control, 2 * u * t)), scale(end, t * t));
    // The curve can still cut the Sun's edge either side of the waypoint, so
    // push it out. The push fades at both ends, because Mercury orbits inside
    // the clearance and the ship has to reach it.
    const keepOut = sunClearance * smoothstep(0, 0.25, t) * smoothstep(0, 0.25, u);
    const flat = Math.hypot(point.x, point.z);
    if (flat >= keepOut || flat < 1e-6) return point;
    const k = keepOut / flat;
    return { x: point.x * k, y: point.y, z: point.z * k };
}

/**
 * The flight `age` seconds in. `progress` is how far along the path the ship
 * is (eased, so it speeds up and slows down), `chase` how far the camera has
 * swung in behind the ship, and `arrive` how far it has handed over to
 * framing the planet. All three are 0..1.
 */
export function flightFrame(age, seconds) {
    const x = clamp01(age / seconds);
    return {
        progress: Math.min(1, x * x * x * (x * (x * 6 - 15) + 10)),
        chase: smoothstep(0, Math.min(CHASE_IN_SECONDS, seconds * 0.4), age),
        arrive: smoothstep(ARRIVE_FROM, 1, x),
        done: age >= seconds,
    };
}
