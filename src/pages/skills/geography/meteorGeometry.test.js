import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEarthFragmentData, buildApproachPath, sampleApproachPath, fitShotDistance, createFragmentMotion } from './meteorGeometry.js';

const magnitude = (p) => Math.hypot(p.x, p.y, p.z);

test('both fragment tiers reconstruct a textured sphere with closed, finite triangles', () => {
  for (const columns of [4, 8]) {
    const pieces = buildEarthFragmentData({ columns });
    assert.equal(pieces.length, columns * 4);
    let outerVertices = 0;
    for (const part of pieces) {
      assert.equal(part.positions.length, part.normals.length);
      assert.equal(part.uvs.length, part.positions.length / 3 * 2);
      assert.ok(part.positions.every(Number.isFinite));
      assert.ok(part.normals.every(Number.isFinite));
      assert.ok(part.uvs.every(Number.isFinite));
      assert.ok(part.indices.every((index) => index >= 0 && index < part.positions.length / 3));
      const outerCount = part.groups[0].count;
      assert.ok(outerCount > 0 && part.groups[1].count > 0);
      outerVertices += outerCount;
      for (let i = 0; i < part.positions.length; i += 3) {
        const p = { x: part.positions[i] + part.pivot.x, y: part.positions[i + 1] + part.pivot.y, z: part.positions[i + 2] + part.pivot.z };
        const normal = { x: part.normals[i], y: part.normals[i + 1], z: part.normals[i + 2] };
        assert.ok(Math.abs(magnitude(normal) - 1) < 1e-6);
        if (i < outerCount * 3) {
          assert.ok(Math.abs(magnitude(p) - 1) < 1e-6);
          assert.ok(p.x * normal.x + p.y * normal.y + p.z * normal.z > 0.99);
        }
      }
      for (let i = 0; i < part.indices.length; i += 3) {
        const p = part.positions;
        const a = part.indices[i] * 3, b = part.indices[i + 1] * 3, c = part.indices[i + 2] * 3;
        const ab = [p[b]-p[a],p[b+1]-p[a+1],p[b+2]-p[a+2]];
        const ac = [p[c]-p[a],p[c+1]-p[a+1],p[c+2]-p[a+2]];
        const area2 = Math.hypot(ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]);
        assert.ok(area2 > 1e-8);
      }
    }
    assert.ok(outerVertices > 5000);
  }
});

test('approach ends at meteor contact and stays clear until arrival', () => {
  for (const aspect of [320/844,390/844,844/390,768/1024,1440/900]) {
    const path = buildApproachPath({ radius: 1, aspect });
    assert.ok(Math.abs(magnitude(path.end) - 1.14) < 1e-12);
    for (let i = 0; i < 200; i++) assert.ok(magnitude(sampleApproachPath(path, i / 200)) > 1.14);
    assert.deepEqual(sampleApproachPath(path, 1), path.end);
  }
});

test('framing and seeded movement remain finite and repeatable', () => {
  const path = buildApproachPath({ radius: 1, aspect: 390/844 });
  const samples = [0,0.25,0.5,0.75,1].map((t) => ({ position: sampleApproachPath(path,t), radius: 0.14 }));
  for (const [width,height] of [[390,844],[844,390],[768,1024],[1440,900]]) {
    const d = fitShotDistance({ samples, fovDegrees: 50, width, height, reservedBottomPx: 130, near: 0.1 });
    assert.ok(Number.isFinite(d) && d > 1);
  }
  assert.equal(fitShotDistance({ samples, fovDegrees: 50, width: 0, height: 0 }), null);
  const parts = buildEarthFragmentData({ columns: 4 });
  const a = createFragmentMotion(parts, { seed: 123 });
  const b = createFragmentMotion(parts, { seed: 123 });
  assert.deepEqual(a,b);
  assert.notDeepEqual(a,createFragmentMotion(parts,{ seed: 124 }));
});

test('T8 patches tile the globe with continuous positions and matching seam UVs', () => {
  for (const columns of [4, 8]) {
    const pieces = buildEarthFragmentData({ columns });
    const shared = new Map();
    for (const part of pieces) {
      const outerVertexCount = part.groups[0].count;
      for (let i = 0; i < outerVertexCount; i++) {
        const k = i * 3;
        const p = { x: part.positions[k] + part.pivot.x, y: part.positions[k + 1] + part.pivot.y, z: part.positions[k + 2] + part.pivot.z };
        const key = [p.x, p.y, p.z].map((v) => Math.round(v * 1e6) / 1e6).join(',');
        if (!shared.has(key)) shared.set(key, []);
        shared.get(key).push({ id: part.id, u: part.uvs[i * 2], v: part.uvs[i * 2 + 1] });
      }
    }
    let seamPoints = 0;
    for (const [, hits] of shared) {
      const owners = new Set(hits.map((h) => h.id));
      if (owners.size < 2) continue;
      seamPoints++;
      const isPole = Math.abs(Math.abs(hits[0].v - 0.5) - 0.5) < 1e-9;
      for (const hit of hits) {
        // A shared surface point must carry the same latitude in every patch.
        assert.ok(Math.abs(hit.v - hits[0].v) < 1e-9);
        // Longitude may differ by a whole wrap at the 0/360 seam, never otherwise.
        if (isPole) continue;
        const delta = Math.abs(hit.u - hits[0].u);
        assert.ok(Math.abs(delta - Math.round(delta)) < 1e-9);
        assert.ok(Math.round(delta) === 0 || Math.round(delta) === 1);
      }
    }
    // Every patch boundary is shared, so tiling leaves no gap between neighbours.
    assert.ok(seamPoints >= columns * 4);
    for (const part of pieces) {
      // Latitude always stays in range; longitude may overshoot by the half-texel
      // pole offset that the installed SphereGeometry uses, and nothing more.
      const halfTexel = 0.5 / 32;
      for (let i = 0; i < part.uvs.length; i += 2) {
        assert.ok(part.uvs[i] >= -halfTexel - 1e-9 && part.uvs[i] <= 1 + halfTexel + 1e-9);
        assert.ok(part.uvs[i + 1] >= -1e-9 && part.uvs[i + 1] <= 1 + 1e-9);
      }
      assert.ok(Math.abs(magnitude(part.direction) - 1) < 1e-12);
      assert.ok(part.boundRadius > 0 && Number.isFinite(part.boundRadius));
    }
  }
});

test('T9 contact survives uniform scale and any rigid placement of Earth', () => {
  const aspect = 390 / 844;
  const unit = buildApproachPath({ radius: 1, aspect });
  for (const radius of [0.45, 3, 128.5]) {
    const scaled = buildApproachPath({ radius, aspect });
    // The path is defined in Earth radii, so a uniform scale just rescales it.
    for (const key of ['start', 'control', 'end', 'contact']) {
      for (const axis of ['x', 'y', 'z']) {
        assert.ok(Math.abs(scaled[key][axis] - unit[key][axis] * radius) < 1e-9);
      }
    }
    assert.ok(Math.abs(magnitude(scaled.contact) - radius) < 1e-9);
    assert.ok(Math.abs(magnitude(scaled.end) - (radius + scaled.meteorRadius)) < 1e-9);
    for (let i = 0; i < 128; i++) {
      assert.ok(magnitude(sampleApproachPath(scaled, i / 128)) > radius);
    }
  }
  // Earth translated and rotated away from the origin keeps the same clearance.
  const angle = 0.9, radius = 2.5;
  const centre = { x: -41.2, y: 6.5, z: 18.75 };
  const place = (p) => ({
    x: centre.x + (p.x * Math.cos(angle) - p.z * Math.sin(angle)),
    y: centre.y + p.y,
    z: centre.z + (p.x * Math.sin(angle) + p.z * Math.cos(angle)),
  });
  const path = buildApproachPath({ radius, aspect });
  const placedContact = place(path.contact);
  assert.ok(Math.abs(magnitude({ x: placedContact.x - centre.x, y: placedContact.y - centre.y, z: placedContact.z - centre.z }) - radius) < 1e-9);
  for (let i = 0; i < 128; i++) {
    const s = place(sampleApproachPath(path, i / 128));
    const offset = { x: s.x - centre.x, y: s.y - centre.y, z: s.z - centre.z };
    assert.ok(magnitude(offset) > radius);
  }
});

test('T10 the fitted shot projects Earth and the whole path inside the usable frame', () => {
  const fov = 50;
  for (const [width, height] of [[320, 844], [390, 844], [844, 390], [768, 1024], [1440, 900]]) {
    const path = buildApproachPath({ radius: 1, aspect: width / height });
    const samples = [{ position: { x: 0, y: 0, z: 0 }, radius: 1 }];
    for (let i = 0; i <= 32; i++) samples.push({ position: sampleApproachPath(path, i / 32), radius: path.meteorRadius * 1.7 });
    for (const reservedBottomPx of [0, 130, 220]) {
      const distance = fitShotDistance({ samples, fovDegrees: fov, width, height, reservedBottomPx, near: 0.1 });
      assert.ok(Number.isFinite(distance) && distance > 0);
      const tanY = Math.tan((fov * Math.PI) / 360);
      const tanX = (tanY * width) / height;
      const usableX = 1 - 32 / width;
      const usableY = 1 - (reservedBottomPx + 32) / height;
      for (const { position: p, radius: r } of samples) {
        const depth = distance - p.z;
        // In front of the camera, clear of the near plane.
        assert.ok(depth > r && depth > 0.1);
        assert.ok((Math.abs(p.x) + r) / (depth * tanX) <= usableX + 1e-9);
        assert.ok((Math.abs(p.y) + r) / (depth * tanY) <= usableY + 1e-9);
      }
    }
  }
});
