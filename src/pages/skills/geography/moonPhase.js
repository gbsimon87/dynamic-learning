export const MOON_PHASE_LINE = "The Moon travels around Earth. It turns once for each trip around Earth, so the same face stays towards us. This is called tidal locking. The Sun always lights half of the Moon. From Earth, we see different amounts of that bright half. These shapes are called phases. Earth's shadow does not cause the phases: it causes a lunar eclipse. A cycle of phases takes about a month. Our model moves faster and is not a forecast for tonight.";

const unit = (v) => {
    const length = Math.hypot(v.x, v.y, v.z);
    return length > 0 ? { x: v.x / length, y: v.y / length, z: v.z / length } : null;
};
const subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

/** North-up view from Earth; the drawing uses the actual model positions,
 * not elapsed time, so pause, speed changes and reset need no second clock.
 */
export function moonPhase(earth, moon, sun = { x: 0, y: 0, z: 0 }) {
    const observer = unit(subtract(earth, moon));
    const light = unit(subtract(sun, moon));
    if (!observer || !light) return null;
    const right = unit({ x: observer.z, y: 0, z: -observer.x });
    if (!right) return null;
    const up = {
        x: observer.y * right.z - observer.z * right.y,
        y: observer.z * right.x - observer.x * right.z,
        z: observer.x * right.y - observer.y * right.x,
    };
    const z = Math.max(-1, Math.min(1, dot(observer, light)));
    const fraction = (1 + z) / 2;
    const toSun = subtract(sun, earth);
    const toMoon = subtract(moon, earth);
    const waxing = toSun.z * toMoon.x - toSun.x * toMoon.z >= 0;
    let name;
    if (fraction < 0.01) name = "New Moon";
    else if (fraction > 0.99) name = "Full Moon";
    else if (Math.abs(fraction - 0.5) < 0.04) name = waxing ? "First quarter" : "Last quarter";
    else name = `${waxing ? 'Waxing' : 'Waning'} ${fraction < 0.5 ? 'crescent' : 'gibbous'}`;
    return { fraction, name, light: { x: dot(right, light), y: dot(up, light), z } };
}

export function drawMoonPhase(canvas, phase) {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !phase) return;
    const size = canvas.width;
    const image = ctx.createImageData(size, size);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const x = (col + 0.5 - size / 2) / (size * 0.46);
            const y = (size / 2 - row - 0.5) / (size * 0.46);
            const square = x * x + y * y;
            if (square > 1) continue;
            const z = Math.sqrt(1 - square);
            const sunlight = x * phase.light.x + y * phase.light.y + z * phase.light.z;
            const brightness = sunlight > 0 ? 150 + 90 * Math.sqrt(sunlight) : 22;
            const index = (row * size + col) * 4;
            image.data[index] = brightness;
            image.data[index + 1] = brightness;
            image.data[index + 2] = brightness + 5;
            image.data[index + 3] = 255;
        }
    }
    ctx.putImageData(image, 0, 0);
}
