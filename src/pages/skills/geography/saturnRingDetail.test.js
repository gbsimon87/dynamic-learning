import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ringParticles, ringDetailBlend, SATURN_RING_BANDS, createSaturnRingDetail } from './saturnRingDetail.js';

test('seeded icy pieces fit their bands and leave the Cassini Division empty', () => {
    const particles = ringParticles(3200);
    assert.deepEqual(particles, ringParticles(3200));
    particles.forEach((p, i) => {
        const [inner, outer] = SATURN_RING_BANDS[i % SATURN_RING_BANDS.length];
        assert.ok(p.radius - p.size * 1.5 >= inner - 1e-10);
        assert.ok(p.radius + p.size * 1.5 <= outer + 1e-10);
        assert.ok(p.radius < 1.6 || p.radius > 1.66);
    });
    assert.equal(ringDetailBlend(7), 0);
    assert.equal(ringDetailBlend(2), 1);
    assert.equal(ringDetailBlend(4.5), 0.5);
});

test('near detail fades in, freezes with pause/reduced motion, changes tier and restores bands', () => {
    const axialGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const band = new THREE.Mesh(new THREE.RingGeometry(), new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true }));
    ringGroup.add(band); axialGroup.add(ringGroup);
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 0, 20);
    let time = 0, calm = false, quality = 'standard';
    const module = createSaturnRingDetail({ axialGroup, ringGroup, radius: 1, getCamera: () => camera, getOrbitTime: () => time, getQuality: () => quality, reducedMotion: () => calm });
    const root = axialGroup.getObjectByName('saturn-ring-chunks');
    module.update(); assert.equal(root.visible, false); assert.equal(band.material.opacity, 0.5);
    camera.position.z = 3;
    module.update(); assert.equal(root.visible, true); assert.ok(band.material.opacity < 0.1);
    const mesh = root.children[0];
    const before = mesh.instanceMatrix.array.slice();
    module.update(); assert.deepEqual(mesh.instanceMatrix.array, before);
    time = 10; module.update(); assert.notDeepEqual(mesh.instanceMatrix.array, before);
    calm = true; module.update(); const still = mesh.instanceMatrix.array.slice();
    time = 100; module.update(); assert.deepEqual(mesh.instanceMatrix.array, still);
    quality = 'low'; module.resize(); module.update(); assert.equal(root.children[0].count, 900);
    module.dispose(); assert.equal(axialGroup.children.length, 1); assert.equal(band.material.opacity, 0.5);
    band.geometry.dispose(); band.material.dispose();
});
