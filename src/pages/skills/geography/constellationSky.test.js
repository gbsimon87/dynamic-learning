import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { constellations } from './constellations.js';
import { skyDirection, constellationFrame, SKY_RADIUS } from './constellationSkyLayout.js';
import { createConstellationSky } from './constellationSky.js';
const vector = p => new THREE.Vector3(p.x, p.y, p.z);

test('sky directions preserve angular separation and show east to the left from inside', () => {
  const a = skyDirection({ raHours: 0, decDeg: 0 }), b = skyDirection({ raHours: 6, decDeg: 0 });
  assert.ok(Math.abs(vector(a).dot(vector(b))) < 1e-10);
  const camera = new THREE.PerspectiveCamera();
  camera.up.copy(vector(skyDirection({ raHours: 0, decDeg: 90 })));
  camera.lookAt(vector(a)); camera.updateMatrixWorld();
  const east = vector(skyDirection({ raHours: .1, decDeg: 0 })).project(camera);
  assert.ok(east.x < 0, 'east is left, matching the existing chart');
  for (const c of constellations) for (const s of c.stars) assert.ok(Math.abs(vector(skyDirection(s)).length()-1) < 1e-10);
});

test('all five figures fit above the reserved controls on desktop and phone', () => {
  for (const [width,height] of [[1200,760],[390,756],[844,302]]) {
    for (const c of constellations) {
      const frame = constellationFrame(c.stars, width/height, height);
      const camera = new THREE.PerspectiveCamera(frame.fov, width/height, .1, 5000);
      camera.up.copy(vector(skyDirection({ raHours: 0, decDeg: 90 })));
      camera.lookAt(vector(frame.center));
      camera.setViewOffset(width,height,frame.reservedX/2,frame.reserved/2,width,height);
      camera.updateMatrixWorld();
      for (const star of c.stars) {
        const p = vector(skyDirection(star)).multiplyScalar(SKY_RADIUS).project(camera);
        assert.ok(p.x > -1 && p.x < 1 - frame.reservedX / width * 2 && p.y<1 && p.y > -1 + frame.reserved / height * 2, `${c.id}/${star.id} clipped at ${width}: ${p.toArray()}`);
      }
    }
  }
});

test('scene lifecycle frames selections, resizes, restores the camera and disposes resources', () => {
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1200/760,.1,5000);
  camera.position.set(0,72,128); camera.lookAt(0,0,0);
  const pose = camera.position.clone(), rotation = camera.quaternion.clone(), up = camera.up.clone();
  let calm=false, hidden=false, controlsDisposed=false;
  const controls = { target: new THREE.Vector3(), update() {}, dispose() { controlsDisposed=true; } };
  const sky = createConstellationSky({ scene,camera,domElement:{clientWidth:1200,clientHeight:760},
    makeLabel: () => new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture({width:160,height:50}) })),
    getQuality:()=> 'low', reducedMotion:()=>calm, isHidden:()=>hidden, createControls:()=>controls });
  const root=scene.getObjectByName('constellation-sky');
  assert.equal(root.children.length,5);
  assert.equal(sky.enter('invalid'),false); assert.equal(sky.isActive(),false);
  assert.equal(sky.enter('ursa-major'),true); sky.update(.2); assert.equal(controls.enabled,false);
  calm=true; sky.update(.1); assert.equal(controls.enabled,true);
  assert.ok(camera.view.enabled);
  sky.enter('orion'); sky.resize({width:390,height:756}); sky.update();
  assert.equal(root.getObjectByName('orion').children[2].visible,true);
  hidden=true; sky.update(); assert.equal(root.visible,false);
  sky.exit(); assert.ok(camera.position.equals(pose)); assert.ok(camera.up.equals(up));
  assert.ok(camera.quaternion.angleTo(rotation)<1e-7); assert.equal(camera.fov,50); assert.equal(camera.view.enabled,false);
  assert.equal(sky.isActive(),false); sky.dispose(); assert.equal(root.parent,null); assert.equal(controlsDisposed,true);
});

test('the sky layer shows every figure, with names, only while switched on', () => {
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 390/756,.1,5000);
  camera.position.set(10,72,128); camera.lookAt(0,0,0); camera.updateMatrixWorld();
  let display = null;
  const label = () => new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture({width:160,height:50}) }));
  const controls = { target: new THREE.Vector3(), update() {}, dispose() {} };
  const sky = createConstellationSky({ scene,camera,domElement:{clientWidth:390,clientHeight:756}, makeLabel: label, makeNameLabel: label,
    getQuality:()=> 'high', reducedMotion:()=>true, getDisplay:()=>display, createControls:()=>controls });
  const root = scene.getObjectByName('constellation-sky'), orion = root.getObjectByName('orion');
  const [points, lines, starNames, badge] = orion.children;
  sky.update(); assert.equal(root.visible,false,'off by default: not even faint lines');
  display = { lines:.55, stars:1.5, names:.75 }; sky.update();
  assert.equal(root.visible,true); assert.ok(root.position.equals(camera.position),'centred on the camera, like a real sky');
  assert.equal(lines.material.opacity,.55); assert.equal(points.material.uniforms.strength.value,1.5);
  assert.equal(lines.material.depthTest,true,'planets pass in front of the figures');
  assert.equal(badge.visible,true); assert.equal(badge.material.opacity,.75); assert.equal(starNames.visible,false);
  const px = badge.scale.y / (2 * SKY_RADIUS * Math.tan(25 * Math.PI / 180)) * 756;
  assert.ok(px > 15 && px < 30, `name badge is badge-sized on a phone: ${px}px`);
  sky.enter('orion'); sky.update();
  assert.equal(badge.visible,false,'the card names the open figure'); assert.equal(starNames.visible,true);
  assert.equal(lines.material.depthTest,false);
  sky.exit(); display = null; sky.update(); assert.equal(root.visible,false);
  sky.dispose();
});

test('the sky controls orbit about celestial north, and the camera keeps its own up', () => {
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, .1, 5000);
  const before = camera.up.clone(); let upAtCreate = null;
  const label = () => new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture({width:160,height:50}) }));
  const sky = createConstellationSky({ scene, camera, domElement:{clientWidth:400,clientHeight:0}, makeLabel: label,
    getQuality:()=> 'high', reducedMotion:()=>true, getDisplay:()=>({ lines:.5, stars:1, names:.5 }),
    createControls:(c)=>{ upAtCreate = c.up.clone(); return { target: new THREE.Vector3(), update() {}, dispose() {} }; } });
  assert.ok(upAtCreate.distanceTo(vector(skyDirection({ raHours: 0, decDeg: 90 }))) < 1e-9);
  assert.ok(camera.up.equals(before));
  sky.update();
  const badge = scene.getObjectByName('orion').children[3];
  assert.ok(Number.isFinite(badge.scale.y) && Number.isFinite(badge.position.x), 'a 0px-tall mount gives finite badges');
  sky.dispose();
});
