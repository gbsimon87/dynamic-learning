import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { IRREGULAR_MOON_SHAPES, irregularMoonGeometry } from './moonShapes.js';

const extent = (geometry) => {
  geometry.computeBoundingBox();
  return geometry.boundingBox.getSize(new THREE.Vector3());
};

test('round moons keep the shared sphere', () => {
  assert.equal(irregularMoonGeometry('Io'), null);
  assert.equal(irregularMoonGeometry('Titan'), null);
});

test('lumpy moons stay inside their listed radius and keep their long axis along +X', () => {
  for (const name of Object.keys(IRREGULAR_MOON_SHAPES)) {
    const geometry = irregularMoonGeometry(name);
    const position = geometry.attributes.position, point = new THREE.Vector3();
    let longest = 0;
    for (let i = 0; i < position.count; i++) longest = Math.max(longest, point.fromBufferAttribute(position, i).length());
    assert.ok(longest <= 1 + 1e-6 && longest > 0.99, `${name} reaches ${longest}`);
    const size = extent(geometry);
    assert.ok(size.x > size.y && size.y > size.z, `${name} is ${size.toArray().map(v => v.toFixed(2))}`);
    const [, middle, short] = IRREGULAR_MOON_SHAPES[name].axes;
    assert.ok(Math.abs(size.y / size.x - middle) < 0.12, `${name} middle axis`);
    assert.ok(Math.abs(size.z / size.x - short) < 0.12, `${name} short axis`);
  }
});

test('shapes are stable between visits and have no shading seam', () => {
  const a = irregularMoonGeometry('Hyperion'), b = irregularMoonGeometry('Hyperion');
  assert.deepEqual(Array.from(a.attributes.position.array), Array.from(b.attributes.position.array));
  const position = a.attributes.position, normal = a.attributes.normal;
  const byPoint = new Map();
  for (let i = 0; i < position.count; i++) {
    const key = [position.getX(i), position.getY(i), position.getZ(i)].map(v => v.toFixed(5)).join(',');
    const n = [normal.getX(i), normal.getY(i), normal.getZ(i)];
    if (byPoint.has(key)) byPoint.get(key).forEach((v, k) => assert.ok(Math.abs(v - n[k]) < 1e-6, 'seam normals match'));
    else byPoint.set(key, n);
  }
});
