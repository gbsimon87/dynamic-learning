import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createShootingStars } from './shootingStars.js';

test('sky focus hides an ambient streak and allows new streaks after returning', () => {
  const previous = globalThis.document;
  globalThis.document = { createElement: () => ({ getContext: () => ({ createRadialGradient: () => ({ addColorStop() {} }), fillRect() {} }) }) };
  try {
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50,1,.1,5000);
    camera.position.set(0,72,128); camera.lookAt(0,0,0); camera.updateMatrixWorld();
    let hidden = false;
    const stars = createShootingStars({ scene,camera,quality:'low',isHidden:()=>hidden });
    const tail = scene.children.find(p=>p.material.size===16);
    stars.update(41);
    assert.equal(tail.visible,true);
    hidden=true; stars.update(.1);
    assert.equal(tail.visible,false);
    stars.update(41); assert.equal(tail.visible,false);
    hidden=false; stars.update(41);
    assert.equal(tail.visible,true);
    stars.dispose(); assert.equal(scene.children.length,0);
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document=previous;
  }
});
