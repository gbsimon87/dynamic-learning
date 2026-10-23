const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DEAD_ZONE = .12;

export function steerInput(stickX, stickY, keys) {
    const has = (...names) => names.some((n) => keys.has(n));
    let x = stickX;
    let y = stickY;
    if (has("ArrowLeft", "a")) x -= 1;
    if (has("ArrowRight", "d")) x += 1;
    if (has("ArrowUp", "w")) y += 1;
    if (has("ArrowDown", "s")) y -= 1;
    x = clamp(x, -1, 1);
    y = clamp(y, -1, 1);
    if (Math.hypot(x, y) < DEAD_ZONE) return { x: 0, y: 0 };
    return { x, y };
}

/**
 * Turn a pointer offset from the joystick centre into a stick value.
 * `dx`, `dy` are screen pixels (y down); `max` is how far the thumb may travel.
 * Returns the stick (y up) and the clamped thumb offset in pixels.
 */
export function stickVector(dx, dy, max) {
    const d = Math.hypot(dx, dy);
    if (d > max) {
        dx *= max / d;
        dy *= max / d;
    }
    return { x: dx / max, y: -dy / max, thumbX: dx, thumbY: dy };
}

