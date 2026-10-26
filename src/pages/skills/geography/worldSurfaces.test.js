import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { HOME_SYSTEM } from './systems/home.js';
import { STAND_IN_SURFACES, WORLD_SURFACE_NAMES, worldSurfacePath } from './worldSurfaces.js';

const publicFile = (path) => new URL(`../../../../public${path}`, import.meta.url);

function jpegSize(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'not a JPEG');
  for (let i = 2; i < bytes.length;) {
    const marker = bytes.readUInt16BE(i);
    if (marker >= 0xffc0 && marker <= 0xffc2) {
      return { height: bytes.readUInt16BE(i + 5), width: bytes.readUInt16BE(i + 7) };
    }
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  throw new Error('no frame header');
}

test('every featured moon and Pluto has a surface map', () => {
  const moons = HOME_SYSTEM.planets.flatMap((planet) => planet.moons.map((moon) => moon.name));
  assert.ok(moons.length >= 24, `found ${moons.length} moons`);
  for (const name of [...moons.filter((n) => n !== 'Moon'), 'Pluto']) {
    assert.ok(worldSurfacePath(name), `${name} has no surface map`);
  }
});

test('each surface map is a 2:1 JPEG small enough for phones', () => {
  for (const name of WORLD_SURFACE_NAMES) {
    const bytes = readFileSync(publicFile(worldSurfacePath(name)));
    const { width, height } = jpegSize(bytes);
    assert.equal(width, height * 2, `${name} is ${width}x${height}`);
    assert.ok(width <= 1024, `${name} is ${width}px wide`);
    assert.ok(bytes.length < 250_000, `${name} is ${bytes.length} bytes`);
  }
});

test('stand-in pictures are only used for worlds without a real map', () => {
  assert.deepEqual(STAND_IN_SURFACES, ['Amalthea', 'Hyperion', 'Nereid']);
  for (const name of STAND_IN_SURFACES) assert.ok(worldSurfacePath(name));
  assert.equal(worldSurfacePath('Earth'), null);
});
