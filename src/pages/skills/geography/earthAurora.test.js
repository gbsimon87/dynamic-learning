import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createAuroraGeometry, createEarthAurora } from './earthAurora.js';

test('curtains stay above both polar regions with fewer vertices on phones', () => {
    for (const hemisphere of [1, -1]) {
        const low = createAuroraGeometry(hemisphere, 'low');
        const standard = createAuroraGeometry(hemisphere, 'standard');
        assert.ok(low.attributes.position.count < standard.attributes.position.count);
        for (let i = 0; i < low.attributes.position.count; i++) {
            const p = new THREE.Vector3().fromBufferAttribute(low.attributes.position, i);
            assert.ok(p.length() > 1.02 && p.length() < 1.19);
            assert.ok(hemisphere * p.y / p.length() > 0.88);
        }
        low.dispose(); standard.dispose();
    }
});

test('auroras follow Earth, freeze with reduced motion and dispose owned resources', () => {
    const earth = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial());
    earth.position.set(10, 0, 30);
    earth.scale.setScalar(2);
    let time = 20;
    let calm = false;
    let quality = 'standard';
    const feature = createEarthAurora({ earthBody: earth, getTime: () => time, reducedMotion: () => calm, getQuality: () => quality });
    assert.equal(earth.children.length, 2);
    const mesh = earth.children[0];
    const uniforms = mesh.material.uniforms;
    feature.update();
    assert.equal(uniforms.uTime.value, 20);
    assert.deepEqual(uniforms.uEarthPosition.value.toArray(), [10, 0, 30]);
    calm = true;
    time = 50;
    feature.update();
    assert.equal(uniforms.uTime.value, 0);
    feature.update();
    assert.equal(uniforms.uTime.value, 0);
    calm = false;
    feature.update();
    assert.equal(uniforms.uTime.value, 50);
    const oldGeometry = mesh.geometry;
    let oldDisposed = false;
    oldGeometry.addEventListener('dispose', () => { oldDisposed = true; });
    quality = 'low';
    feature.resize();
    assert.equal(oldDisposed, true);
    assert.ok(mesh.geometry.attributes.position.count < oldGeometry.attributes.position.count);
    let materialDisposed = false;
    mesh.material.addEventListener('dispose', () => { materialDisposed = true; });
    feature.dispose();
    assert.equal(earth.children.length, 0);
    assert.equal(materialDisposed, true);
    assert.deepEqual(earth.scale.toArray(), [2, 2, 2]);
    earth.geometry.dispose(); earth.material.dispose();
});
