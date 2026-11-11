import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { OCEAN_SURFACE_HEIGHT } from './oceanWater.js';
import { REEFS, REEF_HEIGHT, createOceanReef } from './oceanReef.js';
import { REEF_DISCOVERY, REEF_ORBIT } from './oceanDiscoveries.js';
import { STEERING } from './oceanSteering.js';
import { loopPose } from './oceanFish.js';
import { ANIMALS } from './oceanAnimals.js';
import { marineMaterial } from './oceanModelDetail.js';
import { prepareMarineModel, setMarineDetail } from './oceanAnimalMotion.js';

// The submarine circles this high above the reef's base.
const REEF_ORBIT_HEIGHT = 4;

// Shared by the terrain and decorations, keeping every patch rooted in sand.
export function oceanFloorHeight(x, z) {
  return -0.35 + Math.sin(x * 0.19 + z * 0.08) * 0.32
    + Math.cos(z * 0.23 - x * 0.06) * 0.24
    + Math.sin(x * 0.55 + z * 0.37) * 0.07;
}

/** Modest, deterministic scenery: one terrain mesh and instanced decorations. */
export function createOceanEnvironment(water, sand) {
  const group = new THREE.Group();
  group.name = 'ocean-environment';
  const time = { value: 0 };
  const lightColor = { value: new THREE.Color() };
  let seed = 71;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  // Bounded placement, leaving every reef clear.
  const scatter = (near, range, clear) => {
    for (let attempt = 0; attempt < 96; attempt++) {
      // sqrt spreads them evenly by area rather than crowding the middle.
      const angle = random() * Math.PI * 2, distance = near + Math.sqrt(random()) * range;
      const x = Math.cos(angle) * distance, z = Math.sin(angle) * distance;
      if (REEFS.every(reef => Math.hypot(x - reef.x, z - reef.z) > reef.radius + clear)) return [x, z];
    }
    // The outer decoration ring is beyond all reef footprints.
    return [near + range, 0];
  };
  const material = (key, options = {}) => {
    const result = new THREE.MeshStandardMaterial({ roughness: 0.95, ...options });
    result.userData.oceanColor = key;
    return result;
  };
  // The sand runs well past the edge so the fog, not a cliff, ends the view.
  const floorSize = (STEERING.areaRadius + 80) * 2;
  const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, 220, 220);
  floorGeometry.rotateX(-Math.PI / 2);
  const positions = floorGeometry.attributes.position;
  const sandColors = [];
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), z = positions.getZ(i), height = oceanFloorHeight(x, z);
    positions.setY(i, height);
    const shade = 0.9 + height * 0.06 + Math.sin(x * 0.68 + Math.cos(z * 0.31)) * 0.035;
    sandColors.push(shade, shade, shade * 0.97);
  }
  floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(sandColors, 3));
  sand.vertexColors = true;
  floorGeometry.computeVertexNormals();
  const seabed = new THREE.Mesh(floorGeometry, sand);
  seabed.name = 'ocean-seabed';
  seabed.receiveShadow = true;
  group.add(seabed);

  const rockMaterial = marineMaterial(water, '#ffffff', { pattern: 'rock', roughness: 0.95 });
  rockMaterial.userData.oceanColor = 'rock';
  // Weld shared positions before recomputing normals, avoiding flat triangle faces.
  const rockGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, 3).deleteAttribute('normal').deleteAttribute('uv'));
  const vertices = rockGeometry.attributes.position;
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i), y = vertices.getY(i), z = vertices.getZ(i);
    const scale = 1 + Math.sin(x * 8 + y * 5) * Math.cos(z * 7 - y * 3) * 0.12;
    vertices.setXYZ(i, x * scale, y * scale, z * scale);
  }
  rockGeometry.computeVertexNormals();
  // Spread at the first preview's density across the whole ocean and a little past its edge, so the view never ends in bare sand.
  const reach = STEERING.areaRadius + 20;
  const rocks = new THREE.InstancedMesh(rockGeometry, rockMaterial, 440);
  rocks.name = 'ocean-rocks';
  rocks.castShadow = rocks.receiveShadow = true;
  const transform = new THREE.Object3D();
  const tint = new THREE.Color();
  // Footprints the submarine bumps against; 1.1 covers the rocks' surface noise.
  const obstacles = [];
  for (let i = 0; i < rocks.count; i++) {
    const [x, z] = scatter(8, reach, 3);
    const size = 0.4 + random() * 1.4;
    transform.position.set(x, oceanFloorHeight(x, z) + size * 0.18, z);
    transform.scale.set(size * (0.8 + random()), size * 0.6, size);
    transform.rotation.set(random() * 0.3, random() * Math.PI, random() * 0.25);
    transform.updateMatrix();
    rocks.setMatrixAt(i, transform.matrix);
    obstacles.push({ x, z, radius: Math.max(transform.scale.x, transform.scale.z) * 1.1, top: transform.position.y + transform.scale.y * 1.1 });
    rocks.setColorAt(i, tint.setScalar(0.72 + random() * 0.4));
  }
  group.add(rocks);

  // Tapered, curved ribbons, with vertex shading darker at the roots.
  const bladeGeometry = new THREE.PlaneGeometry(0.18, 1, 1, 5);
  const bladePositions = bladeGeometry.attributes.position;
  const colors = [];
  for (let i = 0; i < bladePositions.count; i++) {
    const height = bladePositions.getY(i) + 0.5;
    bladePositions.setXYZ(i, bladePositions.getX(i) * (1 - height * 0.94) + height * height * 0.22, height, height * height * 0.14);
    colors.push(0.42 + height * 0.58, 0.42 + height * 0.58, 0.42 + height * 0.58);
  }
  bladeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  bladeGeometry.computeVertexNormals();
  const grassMaterial = material('grass', { side: THREE.DoubleSide, vertexColors: true });
  water.addCaustics(grassMaterial);
  const grassCaustics = grassMaterial.onBeforeCompile;
  grassMaterial.onBeforeCompile = (shader, renderer) => {
    grassCaustics(shader, renderer);
    shader.vertexShader = `uniform float oceanTime;\n${shader.vertexShader}`.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float grassPhase = oceanTime * 0.8;
      #ifdef USE_INSTANCING
        grassPhase += dot(instanceMatrix[3].xz, vec2(0.31, 0.21));
      #endif
      transformed.x += sin(grassPhase + position.y * 1.8) * position.y * position.y * 0.08;
      transformed.z += cos(grassPhase * 0.7 + position.y) * position.y * position.y * 0.045;
    `);
  };
  grassMaterial.customProgramCacheKey = () => 'ocean-seagrass-current-v1';
  const patches = 820;
  const grass = new THREE.InstancedMesh(bladeGeometry, grassMaterial, patches * 6);
  grass.name = 'ocean-seagrass';
  grass.receiveShadow = true;
  for (let patch = 0; patch < patches; patch++) {
    const [px, pz] = scatter(6, reach, 2.2);
    for (let blade = 0; blade < 6; blade++) {
      const x = px + (random() - 0.5) * 1.1, z = pz + (random() - 0.5) * 1.1;
      transform.position.set(x, oceanFloorHeight(x, z), z);
      transform.rotation.set(0, random() * Math.PI * 2, (random() - 0.5) * 0.3);
      transform.scale.setScalar(0.45 + random() * 0.8);
      transform.updateMatrix();
      grass.setMatrixAt(patch * 6 + blade, transform.matrix);
    }
  }
  group.add(grass);

  // Every reef is steered around, and orbited around an invisible point level with the submarine's usual depth.
  const reefs = REEFS.map((spot) => {
    const floor = oceanFloorHeight(spot.x, spot.z);
    const model = createOceanReef(water, spot.size);
    model.position.set(spot.x, floor, spot.z);
    model.userData.key = spot.key;
    group.add(model);
    obstacles.push({ x: spot.x, z: spot.z, radius: spot.radius, top: floor + REEF_HEIGHT * spot.size });
    const anchor = new THREE.Object3D();
    anchor.name = 'ocean-reef-anchor';
    anchor.position.set(spot.x, floor + REEF_ORBIT_HEIGHT, spot.z);
    group.add(anchor);
    return { ...REEF_DISCOVERY, key: spot.key, object3d: anchor, radius: spot.radius, orbit: REEF_ORBIT };
  });
  const reef = reefs[0];

  // The animals swim only while the water moves, so pausing or reduced motion holds them still.
  // Ones too far away to see through the fog are hidden and left alone until the submarine nears them.
  const VISIBLE_RANGE = 85;
  let swum = 0;
  const swimmers = ANIMALS.map((animal, index) => {
    const model = prepareMarineModel(animal.create(water));
    model.userData.key = animal.key;
    model.visible = false;
    group.add(model);
    return { animal, model, phase: index * 1.37 + (animal.loop.phase ?? 0), lastAnimated: -Infinity, discovery: { ...animal.discovery, key: animal.key, object3d: model, radius: animal.radius, orbit: animal.orbit } };
  });
  const swim = (swimmer, force = false) => {
    const { animal, model, phase } = swimmer;
    const { x, y, z, heading } = loopPose(animal.loop, swum);
    const localTime = swum + phase;
    const hover = animal.id === 'jellyfish' ? 0.1 : animal.id === 'seahorse' ? 0.035 : 0.015;
    model.position.set(x, y, z);
    // Discovery/orbit anchors keep their exact loop pose; only the animal bobs.
    model.userData.pose.position.y = Math.sin(localTime * 1.2) * hover;
    model.rotation.y = heading;
    // Travel stays smooth even when small distant appendages update less often.
    if (force || swum - swimmer.lastAnimated >= (model.userData.animationInterval ?? 0)) {
      animal.animate(model, localTime);
      swimmer.lastAnimated = swum;
    }
  };
  // Hidden animals still wait where they swim, never at the origin.
  swimmers.forEach((swimmer) => swim(swimmer, true));
  /** Shows the animals within sight of `position`, putting each newly seen one where it is by now. */
  const focus = (position) => {
    for (const swimmer of swimmers) {
      const { loop } = swimmer.animal;
      const near = Math.hypot(loop.x - position.x, loop.z - position.z) < VISIBLE_RANGE;
      if (near) {
        const distance = swimmer.model.position.distanceTo(position);
        const wasDistant = swimmer.model.userData.animationInterval > 0;
        setMarineDetail(swimmer.model, distance);
        if (!swimmer.model.visible || (wasDistant && distance < 32)) swim(swimmer, true);
      }
      swimmer.model.visible = near;
    }
  };

  // The distant background must use exactly the scene's fog colour. A separate
  // unfogged dome exposed the clipped surface/floor edges as a horizontal band.

  const particleGeometry = new THREE.BufferGeometry();
  const motes = [];
  for (let i = 0; i < 150; i++) motes.push((random() - 0.5) * 54, random() * 8, (random() - 0.5) * 54);
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(motes, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.ShaderMaterial({
    uniforms: { oceanTime: time, lightColor }, transparent: true, depthWrite: false,
    vertexShader: `uniform float oceanTime; varying float vFade;
      void main() {
        vec3 p = position;
        // A 54-unit box of motes that wraps around the camera, so they fill the whole ocean.
        p.xz = cameraPosition.xz + mod(p.xz - cameraPosition.xz + 27.0, 54.0) - 27.0;
        p.y = mod(p.y + oceanTime * 0.035, 8.0);
        p.x += sin(oceanTime * 0.15 + p.z) * 0.12;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        vFade = smoothstep(0.0, 1.2, p.y) * (1.0 - smoothstep(6.5, 8.0, p.y)) * exp(-length(view.xyz) * 0.055);
        gl_PointSize = clamp(26.0 / max(1.0, -view.z), 1.0, 3.0);
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader: `uniform vec3 lightColor; varying float vFade;
      void main() {
        float radius = length(gl_PointCoord - 0.5);
        gl_FragColor = vec4(lightColor, (1.0 - smoothstep(0.1, 0.5, radius)) * vFade * 0.28);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  particles.name = 'ocean-suspended-particles';
  // Their shader wraps around the camera, beyond the geometry's original bounds.
  particles.frustumCulled = false;
  group.add(particles);

  // Faint open volumes suggest scattered sunlight; no postprocessing passes.
  const shaftGeometry = new THREE.CylinderGeometry(0.25, 2.4, 9, 24, 1, true);
  const shaftMaterial = new THREE.ShaderMaterial({
    uniforms: { lightColor }, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `varying vec3 vNormal; varying vec3 vView; varying vec2 vUv;
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal); vView = -view.xyz; vUv = uv;
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader: `uniform vec3 lightColor; varying vec3 vNormal; varying vec3 vView; varying vec2 vUv;
      void main() {
        float facing = pow(abs(dot(normalize(vNormal), normalize(vView))), 2.0);
        float fade = smoothstep(0.0, 0.35, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
        gl_FragColor = vec4(lightColor, facing * fade * exp(-length(vView) * 0.035) * 0.026);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  for (let i = 0; i < 28; i++) {
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    const angle = random() * Math.PI * 2, distance = 6 + random() * (STEERING.areaRadius - 10);
    shaft.position.set(Math.cos(angle) * distance, OCEAN_SURFACE_HEIGHT - 4.5, Math.sin(angle) * distance);
    shaft.rotation.z = -0.22;
    shaft.name = 'ocean-sun-shaft';
    group.add(shaft);
  }
  return {
    group, seabed, obstacles, reef, focus, discoveries: [...reefs, ...swimmers.map(({ discovery }) => discovery)],
    advance(seconds) { time.value += seconds; swum += seconds; swimmers.forEach((swimmer) => { if (swimmer.model.visible) swim(swimmer); }); },
    setPalette(palette) {
      lightColor.value.copy(palette.light);
    },
  };
}
