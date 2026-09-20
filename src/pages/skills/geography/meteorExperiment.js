import * as THREE from 'three';
import { createMeteorState, launchMeteor, advanceMeteor, resetMeteor, getPhaseDuration } from './meteorTimeline.js';
import { buildApproachPath, sampleApproachPath, fitShotDistance, buildEarthFragmentData, createFragmentMotion } from './meteorGeometry.js';

const v = (p) => new THREE.Vector3(p.x, p.y, p.z);
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const unitZ = new THREE.Vector3(0, 0, 1);
const drawingBuffer = new THREE.Vector2();

// Small xorshift so every run of the effect looks identical.
const seeded = (seed) => {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
};

// Ember ramp: 0 is the white-hot core, 1 is a cooled red ember.
function fireColour(k, out) {
  const t = clamp01(k);
  if (t < 0.5) {
    const u = t / 0.5;
    out[0] = 1; out[1] = 0.97 - 0.33 * u; out[2] = 0.86 - 0.73 * u;
  } else {
    const u = (t - 0.5) / 0.5;
    out[0] = 1 - 0.28 * u; out[1] = 0.64 - 0.5 * u; out[2] = 0.13 - 0.11 * u;
  }
}

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable for meteor glow');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,253,1)');
  g.addColorStop(0.12, 'rgba(255,240,196,0.94)');
  g.addColorStop(0.32, 'rgba(255,172,54,0.52)');
  g.addColorStop(0.62, 'rgba(255,98,16,0.17)');
  g.addColorStop(1, 'rgba(170,38,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Overlapping lobes read as a puff; a radial mask keeps the quad edges invisible.
function makeSmokeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable for meteor smoke');
  const random = seeded(90210);
  for (let i = 0; i < 10; i++) {
    const cx = 64 + (random() - 0.5) * 44;
    const cy = 64 + (random() - 0.5) * 44;
    const r = 24 + random() * 32;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, 'rgba(255,255,255,0.30)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.12)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  const mask = ctx.createRadialGradient(64, 64, 22, 64, 64, 64);
  mask.addColorStop(0, 'rgba(0,0,0,0)');
  mask.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, 128, 128);
  ctx.globalCompositeOperation = 'source-over';
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeRockTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable for meteor rock');
  ctx.fillStyle = '#6d5e52';
  ctx.fillRect(0, 0, 128, 128);
  const random = seeded(4711);
  for (let i = 0; i < 850; i++) {
    const x = random() * 128;
    const y = random() * 128;
    const r = 1 + random() * 6;
    const shade = 58 + Math.floor(random() * 78);
    ctx.fillStyle = `rgba(${shade},${Math.floor(shade * 0.9)},${Math.floor(shade * 0.8)},0.5)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// A soft gradient ring. Hard-edged RingGeometry reads as a solid tan band.
function makeShockTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable for meteor shockwave');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.58, 'rgba(255,255,255,0)');
  g.addColorStop(0.78, 'rgba(255,228,180,0.32)');
  g.addColorStop(0.88, 'rgba(255,252,240,0.85)');
  g.addColorStop(0.94, 'rgba(255,164,72,0.28)');
  g.addColorStop(1, 'rgba(255,110,30,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Per-particle size, colour and alpha. PointsMaterial can only carry one size
// and one colour for a whole system, which is what made the old effects flat.
function makePointsMaterial(map, additive) {
  return new THREE.ShaderMaterial({
    uniforms: { uMap: { value: map }, uPixelScale: { value: 300 } },
    vertexShader: `
      attribute float aSize;
      attribute vec3 aColor;
      attribute float aAlpha;
      uniform float uPixelScale;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = aColor;
        vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelScale / max(0.0001, -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec4 tex = texture2D(uMap, gl_PointCoord);
        float a = tex.a * vAlpha;
        if (a <= 0.002) discard;
        gl_FragColor = vec4(vColor, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
}

export function createMeteorExperiment({ scene, camera, earthBody, earthTexture, quality, onPhaseChange }) {
  let state = createMeteorState();
  let disposed = false;
  const low = quality === 'low';
  const ownedGeometries = new Set();
  const ownedMaterials = new Set();
  const ownedTextures = new Set();
  const ownGeometry = (g) => { ownedGeometries.add(g); return g; };
  const ownMaterial = (m) => { ownedMaterials.add(m); return m; };
  const root = new THREE.Group();
  root.name = 'MeteorExperiment';
  root.userData.isMeteorEffect = true;
  root.visible = false;
  scene.add(root);
  const earthOriginalVisible = earthBody.visible;
  let radius = 0.45;
  const centre = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const worldScale = new THREE.Vector3();
  const n = new THREE.Vector3();
  const U = new THREE.Vector3();
  const V = new THREE.Vector3();
  const contact = new THREE.Vector3();
  const impactNormal = new THREE.Vector3();
  const meteorContact = new THREE.Vector3();
  const prepCamera = new THREE.Vector3();
  const prepTarget = new THREE.Vector3();
  const shotCamera = new THREE.Vector3();
  const shotTarget = new THREE.Vector3();
  const breakupCamera = new THREE.Vector3();
  const breakupTarget = new THREE.Vector3();
  const shotPoint = new THREE.Vector3();
  // Scratch vectors reused every frame so the loop never allocates.
  const headPoint = new THREE.Vector3();
  const tailPoint = new THREE.Vector3();
  const curvePoint = new THREE.Vector3();
  const driftPoint = new THREE.Vector3();
  const projectA = new THREE.Vector3();
  const projectB = new THREE.Vector3();
  const rgb = [0, 0, 0];
  const frame = { width: 0, height: 0, reservedBottomPx: 0 };
  let path = null;
  let assets = null;

  function toWorld(p, target = new THREE.Vector3()) {
    return target.copy(centre).addScaledVector(U, p.x).addScaledVector(V, p.y).addScaledVector(n, p.z);
  }

  // Evaluate the approach curve straight into a world-space scratch vector.
  function curveToWorld(t, target) {
    const s = 1 - t;
    const x = s * s * path.start.x + 2 * s * t * path.control.x + t * t * path.end.x;
    const y = s * s * path.start.y + 2 * s * t * path.control.y + t * t * path.end.y;
    const z = s * s * path.start.z + 2 * s * t * path.control.z + t * t * path.end.z;
    return target.copy(centre).addScaledVector(U, x).addScaledVector(V, y).addScaledVector(n, z);
  }

  function allocateAssets() {
    if (assets) return assets;
    const glowTexture = makeGlowTexture();
    const smokeTexture = makeSmokeTexture();
    const rockTexture = makeRockTexture();
    const shockTexture = makeShockTexture();
    ownedTextures.add(glowTexture);
    ownedTextures.add(smokeTexture);
    ownedTextures.add(rockTexture);
    ownedTextures.add(shockTexture);

    const outer = ownMaterial(new THREE.MeshStandardMaterial({ map: earthTexture, roughness: 0.55, side: THREE.DoubleSide }));
    const inner = ownMaterial(new THREE.MeshStandardMaterial({ color: 0x6d6a66, emissive: 0xff4a10, emissiveIntensity: 0.04, roughness: 0.95, side: THREE.DoubleSide }));
    const fragmentGroup = new THREE.Group();
    root.add(fragmentGroup);
    // A thinner shell keeps the cut faces narrow, so the pieces read as crust
    // shards rather than thick wedges banding the globe.
    const data = buildEarthFragmentData({ columns: low ? 4 : 8, innerRadius: 0.88 });
    const fragments = data.map((item) => {
      const geometry = ownGeometry(new THREE.BufferGeometry());
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(item.positions, 3));
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(item.normals, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(item.uvs, 2));
      geometry.setIndex(item.indices);
      item.groups.forEach((g) => geometry.addGroup(g.start, g.count, g.materialIndex));
      const mesh = new THREE.Mesh(geometry, [outer, inner]);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.position.copy(v(item.pivot));
      fragmentGroup.add(mesh);
      return { mesh, item, pivotVector: v(item.pivot) };
    });
    fragmentGroup.visible = false;

    // An irregular lumpy rock rather than a faceted ball.
    const meteorGeometry = ownGeometry(new THREE.IcosahedronGeometry(1, low ? 1 : 2));
    {
      const position = meteorGeometry.attributes.position;
      const random = seeded(20260920);
      const lobes = [];
      for (let i = 0; i < 7; i++) {
        lobes.push({
          dir: new THREE.Vector3(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1).normalize(),
          amp: 0.14 + random() * 0.2,
          tight: 1.5 + random() * 2.4,
        });
      }
      const point = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i).normalize();
        let scale = 1;
        for (const lobe of lobes) scale -= lobe.amp * Math.pow(Math.max(0, point.dot(lobe.dir)), lobe.tight);
        scale += 0.045 * Math.sin(point.x * 9.3) * Math.cos(point.y * 7.7) * Math.sin(point.z * 8.1);
        position.setXYZ(i, point.x * scale, point.y * scale, point.z * scale);
      }
      meteorGeometry.computeVertexNormals();
    }
    const meteorMaterial = ownMaterial(new THREE.MeshStandardMaterial({
      map: rockTexture, roughness: 0.94, metalness: 0.04,
      emissive: 0xff5410, emissiveIntensity: 0.2,
    }));
    const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
    root.add(meteor);

    const sprite = (map) => {
      const material = ownMaterial(new THREE.SpriteMaterial({ map, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
      const item = new THREE.Sprite(material);
      item.visible = false;
      root.add(item);
      return item;
    };
    const meteorGlow = sprite(glowTexture);
    // Stretched along travel in screen space: cheap, convincing motion blur.
    const meteorStreak = sprite(glowTexture);
    const impactGlow = sprite(glowTexture);
    const flash = sprite(glowTexture);
    // Earth's surface heating up under the incoming rock.
    const heatSpot = sprite(glowTexture);

    const shockPlane = ownGeometry(new THREE.PlaneGeometry(2, 2));
    const ringMaterial = ownMaterial(new THREE.MeshBasicMaterial({ map: shockTexture, color: 0xfff1d6, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
    const ring = new THREE.Mesh(shockPlane, ringMaterial);
    root.add(ring);
    const ringSlowMaterial = ownMaterial(new THREE.MeshBasicMaterial({ map: shockTexture, color: 0xff7a2e, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
    const ringSlow = new THREE.Mesh(shockPlane, ringSlowMaterial);
    root.add(ringSlow);

    const makePoints = (count, map, additive) => {
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const colors = new Float32Array(count * 3);
      const alphas = new Float32Array(count);
      const geometry = ownGeometry(new THREE.BufferGeometry());
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
      const material = ownMaterial(makePointsMaterial(map, additive));
      const points = new THREE.Points(geometry, material);
      points.frustumCulled = false;
      // Keeps gl_PointSize in real pixels whatever the DPR or viewport.
      points.onBeforeRender = (renderer) => {
        renderer.getDrawingBufferSize(drawingBuffer);
        material.uniforms.uPixelScale.value = drawingBuffer.y * 0.5;
      };
      root.add(points);
      return { points, geometry, material, positions, sizes, colors, alphas, count };
    };

    const trail = makePoints(low ? 32 : 64, glowTexture, true);
    const trailSmoke = makePoints(low ? 24 : 48, smokeTexture, false);
    const sparks = makePoints(low ? 24 : 48, glowTexture, true);
    const dust = makePoints(low ? 80 : 160, smokeTexture, false);

    // Frozen per-particle character so every replay matches.
    const random = seeded(51413);
    const scatter = (count) => {
      const params = { dir: new Float32Array(count * 3), speed: new Float32Array(count), size: new Float32Array(count), life: new Float32Array(count) };
      for (let i = 0; i < count; i++) {
        const lift = random() * 2 - 1;
        const horizontal = Math.sqrt(Math.max(0, 1 - lift * lift));
        const angle = random() * Math.PI * 2;
        params.dir[i * 3] = Math.cos(angle) * horizontal;
        params.dir[i * 3 + 1] = lift;
        params.dir[i * 3 + 2] = Math.sin(angle) * horizontal;
      }
      return params;
    };
    const sparkParams = scatter(sparks.count);
    for (let i = 0; i < sparks.count; i++) {
      sparkParams.speed[i] = 1.5 + random() * 3.4;
      sparkParams.size[i] = 0.018 + random() * 0.05;
      sparkParams.life[i] = 0.7 + random() * 1.1;
    }
    const dustParams = scatter(dust.count);
    for (let i = 0; i < dust.count; i++) {
      dustParams.speed[i] = 0.35 + random() * 0.95;
      dustParams.size[i] = 0.1 + random() * 0.26;
      dustParams.life[i] = 2.4 + random() * 2.2;
    }
    const smokeAngles = new Float32Array(trailSmoke.count);
    const smokeSpread = new Float32Array(trailSmoke.count);
    for (let i = 0; i < trailSmoke.count; i++) {
      smokeAngles[i] = random() * Math.PI * 2;
      smokeSpread[i] = 0.5 + random() * 1.1;
    }

    const light = new THREE.PointLight(0xffc89a, 0, 6, 2);
    root.add(light);

    const crackGroup = new THREE.Group();
    root.add(crackGroup);
    const crackMaterial = ownMaterial(new THREE.MeshBasicMaterial({ color: 0xff8f3a, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }));
    for (let k = 0; k < (low ? 6 : 10); k++) {
      const angle = k * Math.PI * 2 / (low ? 6 : 10);
      const points = [];
      for (let i = 0; i <= 11; i++) {
        const theta = 0.05 + i * 0.09;
        const turn = angle + Math.sin(i * 1.7 + k) * 0.07;
        points.push(new THREE.Vector3(Math.sin(theta) * Math.cos(turn), Math.sin(theta) * Math.sin(turn), Math.cos(theta)).multiplyScalar(1.009));
      }
      const tube = new THREE.Mesh(ownGeometry(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 22, 0.0062, 3, false)), crackMaterial);
      crackGroup.add(tube);
    }
    crackGroup.visible = false;

    assets = {
      fragmentGroup, fragments, meteor, meteorMaterial, meteorGlow, meteorStreak,
      impactGlow, flash, heatSpot, ring, ringSlow, trail, trailSmoke, sparks, dust,
      sparkParams, dustParams, smokeAngles, smokeSpread,
      light, crackGroup, crackMaterial, motion: null, finalBound: 3,
    };
    return assets;
  }

  const flush = (system) => {
    system.geometry.attributes.position.needsUpdate = true;
    system.geometry.attributes.aSize.needsUpdate = true;
    system.geometry.attributes.aColor.needsUpdate = true;
    system.geometry.attributes.aAlpha.needsUpdate = true;
  };

  const clearPoints = (system) => {
    if (!system.alphas.some((a) => a !== 0)) return;
    system.alphas.fill(0);
    system.geometry.attributes.aAlpha.needsUpdate = true;
  };

  function fitCamera() {
    if (!path || frame.width <= 0 || frame.height <= 0) return;
    const samples = [{ position: { x: 0, y: 0, z: 0 }, radius }];
    for (let i = 0; i <= 32; i++) samples.push({ position: sampleApproachPath(path, i / 32), radius: path.meteorRadius * 1.7 });
    const d = fitShotDistance({ samples, fovDegrees: camera.fov, ...frame, near: camera.near });
    if (d !== null) {
      const verticalShift = d * Math.tan(camera.fov * Math.PI / 360) * frame.reservedBottomPx / frame.height;
      shotTarget.copy(centre).addScaledVector(V, -verticalShift);
      shotCamera.copy(shotTarget).addScaledVector(n, d);
    }
    const aftermath = fitShotDistance({ samples: [{ position: { x: 0, y: 0, z: 0 }, radius: assets?.finalBound * radius || 3 * radius }], fovDegrees: camera.fov, ...frame, near: camera.near });
    if (aftermath !== null) {
      const distance = Math.max(d ?? 0, aftermath);
      const verticalShift = distance * Math.tan(camera.fov * Math.PI / 360) * frame.reservedBottomPx / frame.height;
      breakupTarget.copy(centre).addScaledVector(V, -verticalShift);
      // Pulling straight back crosses Venus's orbit when the planets line up.
      // Rise above the orbital plane while widening the destruction shot.
      breakupCamera.copy(breakupTarget).addScaledVector(n, distance).addScaledVector(V, Math.max(2.5, distance * 0.42));
    }
  }

  function launch({ reducedMotion = false, cameraTarget } = {}) {
    if (disposed || state.phase !== 'ready') return false;
    const a = allocateAssets();
    earthBody.updateWorldMatrix(true, false);
    earthBody.getWorldPosition(centre);
    earthBody.getWorldQuaternion(rotation);
    earthBody.getWorldScale(worldScale);
    radius = worldScale.x;
    if (!Number.isFinite(radius) || radius <= 0 || Math.abs(worldScale.y - radius) > 1e-5 || Math.abs(worldScale.z - radius) > 1e-5) throw new Error('Earth scale is unavailable');
    n.copy(centre).multiplyScalar(-1).add(new THREE.Vector3(0, 0.55, 0)).normalize();
    if (n.lengthSq() < 0.1) n.set(0, 0.35, 1).normalize();
    U.crossVectors(new THREE.Vector3(0, 1, 0), n).normalize();
    if (U.lengthSq() < 0.1) U.set(1, 0, 0);
    V.crossVectors(n, U).normalize();
    path = buildApproachPath({ radius, aspect: frame.width / (frame.height || 1) });
    toWorld(path.contact, contact);
    impactNormal.copy(contact).sub(centre).normalize();
    toWorld(path.end, meteorContact);
    prepCamera.copy(camera.position);
    prepTarget.copy(cameraTarget ?? centre);
    a.fragmentGroup.position.copy(centre);
    a.fragmentGroup.quaternion.copy(rotation);
    a.fragmentGroup.scale.setScalar(radius);
    a.crackGroup.position.copy(centre);
    a.crackGroup.quaternion.copy(rotation);
    a.crackGroup.scale.setScalar(radius);
    const localContactNormal = impactNormal.clone().applyQuaternion(rotation.clone().invert());
    a.crackGroup.quaternion.setFromUnitVectors(unitZ, localContactNormal);
    a.crackGroup.quaternion.premultiply(rotation);
    a.motion = createFragmentMotion(a.fragments.map((f) => f.item), { contactNormal: { x: localContactNormal.x, y: localContactNormal.y, z: localContactNormal.z } });
    a.motion.forEach((motion) => {
      motion.directionVector = v(motion.direction);
      motion.axisVector = v(motion.rotationAxis);
    });
    a.finalBound = Math.max(...a.fragments.map((f, i) => f.item.pivot && v(f.item.pivot).addScaledVector(v(a.motion[i].direction), a.motion[i].maximumDisplacement).length() + f.item.boundRadius));
    a.ring.position.copy(contact).addScaledVector(impactNormal, radius * 0.01);
    a.ring.quaternion.setFromUnitVectors(unitZ, impactNormal);
    a.ringSlow.position.copy(a.ring.position);
    a.ringSlow.quaternion.copy(a.ring.quaternion);
    a.impactGlow.position.copy(contact);
    a.flash.position.copy(contact);
    a.heatSpot.position.copy(contact);
    a.light.distance = radius * 16;
    a.light.position.copy(contact).addScaledVector(impactNormal, radius * 0.5);
    root.visible = true;
    earthBody.visible = true;
    a.fragmentGroup.visible = false;
    a.crackGroup.visible = false;
    fitCamera();
    state = launchMeteor(state, { reducedMotion }).state;
    onPhaseChange?.(state.phase);
    updateVisuals();
    return true;
  }

  // Plasma head plus the cooling, widening smoke column left behind it.
  function updateTrail(a, travel, heat) {
    const span = 0.3;
    for (let i = 0; i < a.trail.count; i++) {
      const k = i / (a.trail.count - 1);
      const t = travel - k * span;
      const j = i * 3;
      if (t <= 0) { a.trail.alphas[i] = 0; continue; }
      curveToWorld(t, curvePoint);
      a.trail.positions[j] = curvePoint.x;
      a.trail.positions[j + 1] = curvePoint.y;
      a.trail.positions[j + 2] = curvePoint.z;
      a.trail.sizes[i] = path.meteorRadius * (1.55 - 1.15 * k) * (0.5 + heat * 0.7);
      fireColour(k * 1.05, rgb);
      a.trail.colors[j] = rgb[0];
      a.trail.colors[j + 1] = rgb[1];
      a.trail.colors[j + 2] = rgb[2];
      a.trail.alphas[i] = Math.pow(1 - k, 1.6) * (0.3 + heat * 0.7);
    }
    flush(a.trail);

    for (let i = 0; i < a.trailSmoke.count; i++) {
      const k = i / (a.trailSmoke.count - 1);
      const age = 0.05 + k * 0.52;
      const t = travel - age;
      const j = i * 3;
      if (t <= 0) { a.trailSmoke.alphas[i] = 0; continue; }
      curveToWorld(t, curvePoint);
      const drift = age * radius * 0.7 * a.smokeSpread[i];
      driftPoint.copy(U).multiplyScalar(Math.cos(a.smokeAngles[i])).addScaledVector(V, Math.sin(a.smokeAngles[i]));
      a.trailSmoke.positions[j] = curvePoint.x + driftPoint.x * drift;
      a.trailSmoke.positions[j + 1] = curvePoint.y + driftPoint.y * drift;
      a.trailSmoke.positions[j + 2] = curvePoint.z + driftPoint.z * drift;
      a.trailSmoke.sizes[i] = path.meteorRadius * (1.5 + age * 6.5);
      const tone = 0.52 - k * 0.3;
      a.trailSmoke.colors[j] = tone + 0.1;
      a.trailSmoke.colors[j + 1] = tone * 0.92;
      a.trailSmoke.colors[j + 2] = tone * 0.84;
      a.trailSmoke.alphas[i] = clamp01(age * 7) * Math.max(0, 1 - age / 0.58) * 0.2 * heat;
    }
    flush(a.trailSmoke);
  }

  function updateSparks(a, age) {
    const p = a.sparkParams;
    for (let i = 0; i < a.sparks.count; i++) {
      const life = clamp01(age / p.life[i]);
      const j = i * 3;
      if (life >= 1) { a.sparks.alphas[i] = 0; continue; }
      // Drag, then a gentle pull back toward the surface.
      const travelled = p.speed[i] * (1 - Math.exp(-age * 2.6)) / 2.6 * radius;
      const fall = age * age * 0.5 * radius;
      a.sparks.positions[j] = contact.x + p.dir[j] * travelled - impactNormal.x * fall;
      a.sparks.positions[j + 1] = contact.y + p.dir[j + 1] * travelled - impactNormal.y * fall;
      a.sparks.positions[j + 2] = contact.z + p.dir[j + 2] * travelled - impactNormal.z * fall;
      a.sparks.sizes[i] = p.size[i] * (1 - life * 0.55);
      fireColour(life * 1.1, rgb);
      a.sparks.colors[j] = rgb[0];
      a.sparks.colors[j + 1] = rgb[1];
      a.sparks.colors[j + 2] = rgb[2];
      a.sparks.alphas[i] = Math.pow(1 - life, 1.4);
    }
    flush(a.sparks);
  }

  function updateDust(a, age) {
    const p = a.dustParams;
    for (let i = 0; i < a.dust.count; i++) {
      const life = clamp01(age / p.life[i]);
      const j = i * 3;
      if (life >= 1) { a.dust.alphas[i] = 0; continue; }
      const travelled = p.speed[i] * (1 - Math.exp(-age * 1.15)) / 1.15 * radius * 1.25;
      a.dust.positions[j] = contact.x + p.dir[j] * travelled;
      a.dust.positions[j + 1] = contact.y + p.dir[j + 1] * travelled;
      a.dust.positions[j + 2] = contact.z + p.dir[j + 2] * travelled;
      a.dust.sizes[i] = p.size[i] * (0.35 + life * 1.2) * radius * 0.95;
      // Warm near the impact, cooling to grey ash.
      const warm = Math.max(0, 1 - age * 1.6);
      a.dust.colors[j] = 0.42 + warm * 0.5;
      a.dust.colors[j + 1] = 0.37 + warm * 0.22;
      a.dust.colors[j + 2] = 0.33 + warm * 0.05;
      a.dust.alphas[i] = clamp01(age * 4) * Math.pow(1 - life, 1.5) * 0.3;
    }
    flush(a.dust);
  }

  function updateVisuals() {
    if (!assets || state.phase === 'ready') return;
    const a = assets;
    const phase = state.phase;
    const reduced = state.reducedMotion;
    const progress = (name) => Math.min(1, state.phaseElapsed / (getPhaseDuration(name, reduced) || 1));
    if (phase === 'preparing') {
      const p = reduced ? 1 : smooth(progress('preparing'));
      camera.position.lerpVectors(prepCamera, shotCamera, p);
      shotPoint.lerpVectors(prepTarget, shotTarget, p);
      camera.lookAt(shotPoint);
    } else if (phase === 'breaking') {
      camera.position.lerpVectors(shotCamera, breakupCamera, smooth(progress('breaking')));
      camera.lookAt(shotPoint.lerpVectors(shotTarget, breakupTarget, smooth(progress('breaking'))));
    } else if (phase === 'aftermath') {
      camera.position.copy(breakupCamera);
      camera.lookAt(breakupTarget);
    } else {
      camera.position.copy(shotCamera);
      camera.lookAt(shotTarget);
    }

    const approach = phase === 'approaching' && !reduced;
    a.meteor.visible = approach;
    a.meteorGlow.visible = approach;
    a.meteorStreak.visible = approach;
    if (approach) {
      const p = progress('approaching');
      const travel = p * p;
      const heat = Math.pow(travel, 0.7);
      curveToWorld(travel, headPoint);
      curveToWorld(Math.max(0, travel - 0.035), tailPoint);
      a.meteor.position.copy(headPoint);
      a.meteor.scale.setScalar(path.meteorRadius);
      a.meteor.rotation.set(p * 4, p * 6, p * 2);
      a.meteorMaterial.emissiveIntensity = 0.04 + heat * 0.16;

      a.meteorGlow.position.copy(headPoint);
      a.meteorGlow.scale.setScalar(path.meteorRadius * (1.7 + heat * 1.9));
      a.meteorGlow.material.opacity = 0.32 + heat * 0.34;

      // Stretch the blur along the on-screen direction of travel.
      projectA.copy(headPoint).project(camera);
      projectB.copy(tailPoint).project(camera);
      const dx = (projectA.x - projectB.x) * Math.max(1, frame.width);
      const dy = (projectA.y - projectB.y) * Math.max(1, frame.height);
      if (dx * dx + dy * dy > 1e-9) a.meteorStreak.material.rotation = Math.atan2(-dx, dy);
      a.meteorStreak.position.copy(headPoint).lerp(tailPoint, 0.34);
      a.meteorStreak.scale.set(path.meteorRadius * (1.1 + heat * 0.7), path.meteorRadius * (4.5 + heat * 14), 1);
      a.meteorStreak.material.opacity = 0.16 + heat * 0.4;

      updateTrail(a, travel, heat);

      // One light does the whole job: it rides in with the rock, then flashes.
      a.light.position.copy(headPoint);
      a.light.intensity = heat * heat * 0.25;

      a.heatSpot.visible = heat > 0.45;
      a.heatSpot.scale.setScalar(radius * (0.18 + heat * 0.46));
      a.heatSpot.material.opacity = Math.max(0, (heat - 0.45) / 0.55) * 0.3;
    } else {
      clearPoints(a.trail);
      clearPoints(a.trailSmoke);
      a.heatSpot.visible = false;
      if (phase === 'preparing') a.light.intensity = 0;
    }

    const afterImpact = phase === 'impact' || phase === 'breaking' || phase === 'aftermath';
    const impactAge = afterImpact ? state.elapsed - getPhaseDuration('preparing', reduced) - getPhaseDuration('approaching', reduced) : 0;
    const impactP = phase === 'impact' ? progress('impact') : 1;

    a.flash.visible = afterImpact && !reduced && impactAge < 0.22;
    if (a.flash.visible) {
      const f = impactAge / 0.22;
      a.flash.scale.setScalar(radius * (0.5 + f * 3.6));
      a.flash.material.opacity = Math.pow(1 - f, 1.8);
    }

    a.impactGlow.visible = afterImpact;
    a.impactGlow.scale.setScalar(radius * (0.45 + impactP * 1.5));
    a.impactGlow.material.opacity = reduced ? (phase === 'impact' ? 0.36 : 0) : Math.max(0, 0.8 - impactAge * 0.75);

    // Shockwaves decelerate as they spread, which reads far better than linear.
    a.ring.visible = afterImpact && !reduced && impactAge < 0.95;
    if (a.ring.visible) {
      const e = Math.sqrt(impactAge / 0.95);
      a.ring.scale.setScalar(radius * (0.2 + e * 0.85));
      a.ring.material.opacity = Math.max(0, 0.7 * (1 - e * e));
    } else {
      a.ring.material.opacity = 0;
    }
    a.ringSlow.visible = afterImpact && !reduced && impactAge < 1.5;
    if (a.ringSlow.visible) {
      const e = Math.sqrt(impactAge / 1.5);
      a.ringSlow.scale.setScalar(radius * (0.16 + e * 1.25));
      a.ringSlow.material.opacity = Math.max(0, 0.26 * (1 - e));
    } else {
      a.ringSlow.material.opacity = 0;
    }

    if (afterImpact) {
      a.light.position.copy(contact).addScaledVector(impactNormal, radius * 0.5);
      a.light.intensity = reduced ? 0 : Math.max(0.16, 3 - impactAge * 2.4);
    }

    a.crackGroup.visible = phase === 'impact' && !reduced;
    if (a.crackGroup.visible) {
      a.crackMaterial.opacity = 0.3 + 0.35 * Math.sin(Math.min(1, impactP) * Math.PI);
      a.crackGroup.children.forEach((child, i) => { child.visible = impactP > i / a.crackGroup.children.length; });
    }

    const broken = phase === 'breaking' || phase === 'aftermath';
    earthBody.visible = !broken;
    a.fragmentGroup.visible = broken;
    if (broken) {
      const p = phase === 'breaking' && !reduced ? smooth(progress('breaking')) : 1;
      a.fragments.forEach(({ mesh, pivotVector }, i) => {
        const motion = a.motion[i];
        mesh.position.copy(pivotVector).addScaledVector(motion.directionVector, motion.maximumDisplacement * p);
        mesh.quaternion.setFromAxisAngle(motion.axisVector, motion.maximumAngle * p);
      });
    }

    const particleAge = Math.max(0, impactAge - getPhaseDuration('impact', reduced) * 0.35);
    if (afterImpact && !reduced) {
      updateSparks(a, particleAge);
      updateDust(a, particleAge);
    } else {
      clearPoints(a.sparks);
      clearPoints(a.dust);
    }
  }

  function update(dt) {
    if (disposed || state.phase === 'ready') return;
    const result = advanceMeteor(state, dt);
    state = result.state;
    if (result.entered.length) for (const phase of result.entered) onPhaseChange?.(phase);
    updateVisuals();
  }

  function reset() {
    if (disposed) return;
    state = resetMeteor(state).state;
    earthBody.visible = earthOriginalVisible;
    root.visible = false;
    if (assets) {
      clearPoints(assets.trail);
      clearPoints(assets.trailSmoke);
      clearPoints(assets.sparks);
      clearPoints(assets.dust);
      assets.light.intensity = 0;
      assets.fragmentGroup.visible = false;
      assets.crackGroup.visible = false;
      assets.meteor.visible = false;
      assets.meteorGlow.visible = false;
      assets.meteorStreak.visible = false;
      assets.impactGlow.visible = false;
      assets.flash.visible = false;
      assets.heatSpot.visible = false;
      assets.ring.visible = false;
      assets.ringSlow.visible = false;
      assets.meteorMaterial.emissiveIntensity = 0.2;
    }
    onPhaseChange?.('ready');
  }

  function dispose() {
    if (disposed) return;
    reset();
    disposed = true;
    scene.remove(root);
    ownedGeometries.forEach((g) => g.dispose());
    ownedMaterials.forEach((m) => m.dispose());
    ownedTextures.forEach((t) => t.dispose());
    assets = null;
  }

  function resize(next) {
    Object.assign(frame, next);
    fitCamera();
    if (state.phase !== 'ready') updateVisuals();
  }

  return { launch, update, resize, reset, dispose, isActive: () => state.phase !== 'ready', getPhase: () => state.phase };
}
