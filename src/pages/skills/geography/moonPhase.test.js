import test from 'node:test';
import assert from 'node:assert/strict';
import { moonPhase, drawMoonPhase } from './moonPhase.js';

const earth = { x: 0, y: 0, z: 1000 };
const near = (actual, expected, tolerance = 0.002) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≈ ${expected}`);

test('new and full Moon follow Sun–Earth–Moon geometry', () => {
    const newMoon = moonPhase(earth, { x: 0, y: 0, z: 990 });
    assert.equal(newMoon.name, 'New Moon');
    near(newMoon.fraction, 0);
    const full = moonPhase(earth, { x: 0, y: 0, z: 1010 });
    assert.equal(full.name, 'Full Moon');
    near(full.fraction, 1);
});

test('quarter phases distinguish waxing and waning and light the correct side', () => {
    const first = moonPhase(earth, { x: -10, y: 0, z: 1000 });
    const last = moonPhase(earth, { x: 10, y: 0, z: 1000 });
    assert.equal(first.name, 'First quarter');
    assert.equal(last.name, 'Last quarter');
    near(first.fraction, 0.5, 0.01);
    assert.ok(first.light.x > 0.99);
    assert.ok(last.light.x < -0.99);
});

test('crescent and gibbous phases follow an orbit; repeated positions stay unchanged', () => {
    for (const [x, z, name] of [[-7, 993, 'Waxing crescent'], [-7, 1007, 'Waxing gibbous'], [7, 1007, 'Waning gibbous'], [7, 993, 'Waning crescent']]) {
        const moon = { x, y: 0, z };
        const phase = moonPhase(earth, moon);
        assert.equal(phase.name, name);
        assert.deepEqual(phase, moonPhase(earth, moon));
        near(Math.hypot(phase.light.x, phase.light.y, phase.light.z), 1);
    }
    assert.equal(moonPhase(earth, earth), null);
});

test('2D drawing lights roughly the predicted area of the lunar disc', () => {
    for (const moon of [{ x: 0, y: 0, z: 990 }, { x: -10, y: 0, z: 1000 }, { x: 0, y: 0, z: 1010 }]) {
        const phase = moonPhase(earth, moon);
        let pixels;
        const canvas = { width: 128, getContext: () => ({
            createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
            putImageData: (image) => { pixels = image.data; },
        }) };
        drawMoonPhase(canvas, phase);
        let disc = 0;
        let lit = 0;
        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3]) { disc++; if (pixels[i] > 100) lit++; }
        }
        near(lit / disc, phase.fraction, 0.015);
    }
});
