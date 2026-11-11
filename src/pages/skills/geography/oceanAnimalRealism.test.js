import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ANIMALS } from './oceanAnimals.js';
import { marineWave, marineSpine, prepareMarineModel, setMarineDetail } from './oceanAnimalMotion.js';
import { marineMaterial } from './oceanModelDetail.js';
import { createOceanEnvironment } from './oceanEnvironment.js';
import { createOceanWater } from './oceanWater.js';

const species = ANIMALS.filter((animal) => animal.key === animal.id);
const meshesOf = (model) => {
  const meshes = [];
  model.traverse((node) => { if (node.isMesh) meshes.push(node); });
  return meshes;
};
const shaderFor = (material) => {
  const shader = { uniforms: {}, vertexShader: THREE.ShaderLib.standard.vertexShader, fragmentShader: THREE.ShaderLib.standard.fragmentShader };
  material.onBeforeCompile(shader, null);
  return shader;
};

test('two GPU morphs reproduce a travelling wave, anchor its root and update raycasting', () => {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 2, 4, 12), new THREE.MeshStandardMaterial());
  mesh.geometry.translate(0, -1, 0);
  const wave = marineWave(mesh, { along: 'y', axis: 'z', start: 0, end: -2, amplitude: 0.3, wavelength: 2, rate: 2.4, phase: 0.7 });
  const point = new THREE.Vector3();
  for (const seconds of [0, 0.1, 0.8, 2, 13, 100]) {
    wave.update(seconds);
    const positions = mesh.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      mesh.getVertexPosition(i, point);
      const y = positions.getY(i);
      const expected = 0.3 * (y / -2) ** 2 * Math.sin(seconds * 2.4 + 0.7 - y / -2 * 2);
      assert.ok(Math.abs(point.z - expected) < 1e-7);
      assert.ok(mesh.geometry.boundingSphere.containsPoint(point), 'signed morphs stay inside culling bounds');
    }
    mesh.updateMatrixWorld(true);
    const ray = new THREE.Raycaster(new THREE.Vector3(0, -1, 3), new THREE.Vector3(0, 0, -1));
    const hit = ray.intersectObject(mesh)[0];
    assert.ok(hit, 'deformed mesh remains tappable');
    assert.ok(Math.abs(hit.point.z - wave.sample(-1, seconds).offset) < 1e-6, 'ray hits the visible surface');
  }
});

test('tail and fin attachments follow the same body offset and tangent without drift', () => {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2, 8, 8), new THREE.MeshStandardMaterial());
  body.geometry.rotateX(Math.PI / 2);
  const tail = new THREE.Group(), fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.2));
  tail.position.z = 0.8;
  fin.position.set(0.1, 0.2, 0.5);
  fin.rotation.y = 0.3;
  fin.userData.followSpine = true;
  group.add(body, tail, fin);
  const swim = marineSpine(body, tail, { start: -0.4, end: 1, amplitude: 0.2, rate: 3 });
  swim(0.7);
  const first = tail.position.clone(), angle = tail.rotation.y;
  assert.notEqual(first.x, 0);
  assert.notEqual(fin.position.x, 0.1);
  prepareMarineModel(group);
  assert.ok(group.getObjectById(fin.id), 'batching preserves animated attachment');
  swim(12);
  swim(0.7);
  assert.ok(tail.position.distanceTo(first) < 1e-12);
  assert.equal(tail.rotation.y, angle);
});

test('matching animals share immutable morph buffers while retaining independent animation weights', () => {
  const animal = species.find((entry) => entry.id === 'octopus');
  const first = animal.create(), second = animal.create();
  const firstArm = first.userData.arms[0].node.children[0];
  const secondArm = second.userData.arms[0].node.children[0];
  assert.equal(firstArm.geometry, secondArm.geometry);
  assert.notEqual(firstArm.morphTargetInfluences, secondArm.morphTargetInfluences);
  animal.animate(first, 1);
  const weights = [...firstArm.morphTargetInfluences];
  animal.animate(second, 3);
  assert.deepEqual(firstArm.morphTargetInfluences, weights);
  assert.notDeepEqual(firstArm.morphTargetInfluences, secondArm.morphTargetInfluences);
});

test('all twelve animals animate finite geometry within a bounded model budget', () => {
  for (const animal of species) {
    const model = prepareMarineModel(animal.create());
    const meshes = meshesOf(model);
    let triangles = 0;
    for (const mesh of meshes) {
      const geometry = mesh.geometry;
      triangles += (geometry.index?.count ?? geometry.attributes.position.count) / 3;
      assert.ok(Array.from(geometry.attributes.position.array).every(Number.isFinite), animal.id);
      assert.ok(Array.from(geometry.attributes.normal.array).every(Number.isFinite), animal.id);
      assert.equal(mesh.material.transmission ?? 0, 0, 'no offscreen transmission pass');
      assert.equal(mesh.material.normalMap, null, 'no per-animal texture download');
      if (mesh.morphTargetInfluences) {
        assert.equal(mesh.morphTargetInfluences.length, 2);
        assert.equal(geometry.morphAttributes.normal.length, 2);
      }
    }
    assert.ok(triangles < 13000, `${animal.id}: ${triangles} triangles`);
    assert.ok(meshes.length <= 22, `${animal.id}: ${meshes.length} draw calls before shadows`);
    for (const time of [0, 0.2, 1, 1000]) {
      animal.animate(model, time);
      model.updateMatrixWorld(true);
      for (const mesh of meshes) {
        assert.ok(mesh.matrixWorld.elements.every(Number.isFinite), animal.id);
        assert.ok((mesh.morphTargetInfluences ?? []).every(Number.isFinite), animal.id);
      }
    }
  }
});

test('ray wings keep their roots attached while the tips flex, including the underside', () => {
  const model = species.find((animal) => animal.id === 'eagle-ray').create();
  const { animate } = species.find((animal) => animal.id === 'eagle-ray');
  const wings = model.userData.wings;
  animate(model, 0.1);
  for (const { node } of wings) {
    const [top, bottom] = node.children;
    const root = new THREE.Vector3(), tip = new THREE.Vector3(), below = new THREE.Vector3();
    const positions = top.geometry.attributes.position;
    let rootIndex = 0, tipIndex = 0;
    for (let i = 0; i < positions.count; i++) {
      if (positions.getX(i) < positions.getX(rootIndex)) rootIndex = i;
      if (positions.getX(i) > positions.getX(tipIndex)) tipIndex = i;
    }
    top.getVertexPosition(rootIndex, root);
    top.getVertexPosition(tipIndex, tip);
    bottom.getVertexPosition(tipIndex, below);
    assert.ok(Math.abs(root.y - positions.getY(rootIndex)) < 1e-8);
    assert.ok(Math.abs(tip.y - positions.getY(tipIndex)) > 0.1);
    assert.ok(tip.distanceTo(below) < 1e-7, 'upper and lower wing surfaces flex together');
  }
});

test('stationary anatomy batches and distance detail restores without losing soft-body animation', () => {
  const shark = species.find((animal) => animal.id === 'reef-shark').create();
  const before = meshesOf(shark).length;
  prepareMarineModel(shark);
  assert.ok(meshesOf(shark).length < before);
  assert.ok(shark.userData.detailMeshes.length > 0);
  const bend = meshesOf(shark).find((mesh) => mesh.morphTargetInfluences);
  setMarineDetail(shark, 60);
  assert.ok(shark.userData.detailMeshes.every((mesh) => !mesh.visible));
  assert.equal(bend.visible, true);
  assert.equal(shark.userData.animationInterval, 1 / 15);
  setMarineDetail(shark, 8);
  assert.ok(shark.userData.detailMeshes.every((mesh) => mesh.visible));
  assert.equal(shark.userData.animationInterval, 0);
});

test('materials distinguish smooth mammal skin, shark denticles, ray spots and thin fins', () => {
  const bodyShader = (id) => {
    const model = species.find((animal) => animal.id === id).create();
    return shaderFor(meshesOf(model)[0].material);
  };
  assert.match(bodyShader('reef-shark').fragmentShader, /float denticle/);
  assert.match(bodyShader('eagle-ray').fragmentShader, /vec2 spotUV/);
  assert.doesNotMatch(bodyShader('dolphin').fragmentShader, /vec2 scaleUV|float denticle/);
  assert.doesNotMatch(bodyShader('humpback-whale').fragmentShader, /vec2 scaleUV|float denticle/);
  assert.match(bodyShader('clownfish').fragmentShader, /marineP.z - 0.31/, 'third pale band');
  const thin = shaderFor(marineMaterial(null, '#778899', { pattern: 'fin', animal: true, tissue: 0.65 }));
  assert.equal(thin.uniforms.marineTissue.value, 0.65);
  assert.match(thin.fragmentShader, /marineBacklight/);
  assert.match(thin.fragmentShader, /normal = normalize\(normal - clamp/);
});

test('animal surfaces retain projected caustics after morphing with upward-facing attenuation', () => {
  const sand = new THREE.MeshStandardMaterial();
  const water = createOceanWater(sand);
  try {
    const material = marineMaterial(water, '#778899', { animal: true, pattern: 'scales', belly: '#cccccc' });
    const shader = shaderFor(material);
    assert.ok(shader.uniforms.oceanCaustics.value.isTexture);
    assert.ok(shader.vertexShader.indexOf('vOceanPosition =') > shader.vertexShader.indexOf('#include <morphtarget_vertex>'));
    assert.match(shader.fragmentShader, /depthFade \* upward/);
    assert.match(shader.fragmentShader, /marineRim/);
    assert.match(shader.fragmentShader, /marineDetail/);
  } finally {
    water.dispose();
  }
});

test('environment uses independent phases, pauses exactly and restores near detail at the current time', () => {
  const water = { addCaustics() {} };
  const environment = createOceanEnvironment(water, new THREE.MeshStandardMaterial());
  const animals = environment.discoveries.filter((discovery) => discovery.id !== 'coral-reef');
  const first = animals.find((animal) => animal.key === 'parrotfish');
  environment.focus(first.object3d.position.clone());
  environment.advance(0.8);
  const model = first.object3d;
  const morph = meshesOf(model).find((mesh) => mesh.morphTargetInfluences);
  const weights = [...morph.morphTargetInfluences];
  const position = model.position.clone(), bob = model.userData.pose.position.clone();
  environment.advance(0);
  assert.deepEqual(morph.morphTargetInfluences, weights);
  assert.ok(model.position.equals(position));
  assert.ok(model.userData.pose.position.equals(bob));
  environment.focus(new THREE.Vector3(250, 3, 250));
  assert.equal(model.visible, false);
  environment.advance(3);
  environment.focus(new THREE.Vector3(-12, 3, -3));
  assert.equal(model.visible, true);
  assert.notDeepEqual(morph.morphTargetInfluences, weights);
  assert.ok(model.userData.detailMeshes.every((mesh) => mesh.visible));
  const clones = animals.filter((animal) => animal.id === 'clownfish');
  assert.notEqual(clones[0].object3d.userData.tails[0].rotation.y, clones[1].object3d.userData.tails[0].rotation.y);
});
