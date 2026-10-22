import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createEarthDayNight } from './earthDayNight.js';

test('Earth shader uses world-space lighting and restores material on disposal', () => {
    const material = new THREE.MeshStandardMaterial();
    const original = material.onBeforeCompile;
    const texture = new THREE.Texture();
    let disposed = false;
    texture.addEventListener('dispose', () => { disposed = true; });
    const feature = createEarthDayNight({ material, nightTexture: texture });
    const shader = {
        uniforms: {},
        vertexShader: THREE.ShaderLib.standard.vertexShader,
        fragmentShader: THREE.ShaderLib.standard.fragmentShader,
    };
    material.onBeforeCompile(shader);
    assert.equal(shader.uniforms.earthNightMap.value, texture);
    assert.match(shader.vertexShader, /vEarthWorldPosition = \(modelMatrix/);
    assert.match(shader.fragmentShader, /earthCities \* \(1.0 - earthDay\)/);
    assert.equal(texture.colorSpace, THREE.SRGBColorSpace);
    feature.dispose();
    assert.equal(material.onBeforeCompile, original);
    assert.equal(disposed, true);
    material.dispose();
});
