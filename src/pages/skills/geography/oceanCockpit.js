import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const TAU = Math.PI * 2;
// Small engraved-style lettering, drawn directly into owned telemetry textures.
const GLYPHS = {
  A: '01110/10001/10001/11111/10001/10001/10001', B: '11110/10001/10001/11110/10001/10001/11110',
  C: '01111/10000/10000/10000/10000/10000/01111', D: '11110/10001/10001/10001/10001/10001/11110',
  E: '11111/10000/10000/11110/10000/10000/11111', F: '11111/10000/10000/11110/10000/10000/10000',
  G: '01111/10000/10000/10111/10001/10001/01111', H: '10001/10001/10001/11111/10001/10001/10001',
  I: '111/010/010/010/010/010/111', J: '00111/00010/00010/00010/10010/10010/01100',
  K: '10001/10010/10100/11000/10100/10010/10001', L: '10000/10000/10000/10000/10000/10000/11111',
  M: '10001/11011/10101/10101/10001/10001/10001', N: '10001/11001/10101/10011/10001/10001/10001',
  O: '01110/10001/10001/10001/10001/10001/01110', P: '11110/10001/10001/11110/10000/10000/10000',
  Q: '01110/10001/10001/10001/10101/10010/01101', R: '11110/10001/10001/11110/10100/10010/10001',
  S: '01111/10000/10000/01110/00001/00001/11110', T: '11111/00100/00100/00100/00100/00100/00100',
  U: '10001/10001/10001/10001/10001/10001/01110', V: '10001/10001/10001/10001/10001/01010/00100',
  W: '10001/10001/10001/10101/10101/11011/10001', X: '10001/10001/01010/00100/01010/10001/10001',
  Y: '10001/10001/01010/00100/00100/00100/00100', Z: '11111/00001/00010/00100/01000/10000/11111',
  0: '01110/10001/10011/10101/11001/10001/01110', 1: '00100/01100/00100/00100/00100/00100/01110',
  2: '01110/10001/00001/00010/00100/01000/11111', 3: '11110/00001/00001/01110/00001/00001/11110',
  4: '00010/00110/01010/10010/11111/00010/00010', 5: '11111/10000/10000/11110/00001/00001/11110',
  6: '01110/10000/10000/11110/10001/10001/01110', 7: '11111/00001/00010/00100/01000/01000/01000',
  8: '01110/10001/10001/01110/10001/10001/01110', 9: '01110/10001/10001/01111/00001/00001/01110',
  '.': '0/0/0/0/0/1/1', '-': '000/000/000/111/000/000/000', '/': '00001/00010/00010/00100/01000/01000/10000',
  '°': '010/101/010/000/000/000/000',
};

function display() {
  const width = 256, height = 160, pixels = new Uint8Array(width * height * 4);
  const texture = new THREE.DataTexture(pixels, width, height);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  const pixel = (x, y, color) => {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const offset = ((height - y - 1) * width + x) * 4;
    pixels.set([...color, 255], offset);
  };
  function line(x0, y0, x1, y1, color) {
    const steps = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)));
    for (let i = 0; i <= steps; i++) {
      const t = steps ? i / steps : 0;
      pixel(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, color);
    }
  }
  function text(value, x, y, color, scale = 1) {
    for (const char of value.toUpperCase()) {
      const rows = GLYPHS[char]?.split('/');
      rows?.forEach((row, cy) => [...row].forEach((bit, cx) => {
        if (bit !== '1') return;
        for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) pixel(x + cx * scale + dx, y + cy * scale + dy, color);
      }));
      x += ((rows?.[0].length ?? 3) + 1) * scale;
    }
  }
  function clear(background, grid) {
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) pixel(x, y, background);
    for (let x = 8; x < width; x += 16) line(x, 24, x, 141, grid);
    for (let y = 29; y < 145; y += 16) line(8, y, 247, y, grid);
  }
  return { texture, pixel, line, text, clear };
}

const rgb = (color) => {
  const hex = color.getHex(THREE.SRGBColorSpace);
  return [hex >> 16, (hex >> 8) & 255, hex & 255];
};

/** Camera-local cabin. The ocean stays visible through its open pressure frame. */
export function createOceanCockpit(initialPalette) {
  const group = new THREE.Group();
  group.name = 'ocean-cockpit-interior';
  group.visible = false;
  const frame = new THREE.Group(), console = new THREE.Group();
  group.add(frame, console);
  const textures = [display(), display(), display()];
  const material = (key, properties = {}) => {
    const result = new THREE.MeshPhysicalMaterial({ color: initialPalette[key], roughness: 0.38, metalness: 0.65, fog: false, ...properties });
    result.userData.cabinColor = key;
    return result;
  };
  const paint = material('cabin', { clearcoat: 0.65, clearcoatRoughness: 0.32 });
  const bezel = material('bezel', { roughness: 0.6, metalness: 0.25 });
  const steel = material('steel', { roughness: 0.24, metalness: 0.9 });
  const rubber = material('bezel', { roughness: 0.92, metalness: 0 });
  const glow = material('glow', { emissive: initialPalette.glow, emissiveIntensity: 2, metalness: 0.15 });
  const amber = material('amber', { emissive: initialPalette.amber, emissiveIntensity: 1.2, metalness: 0.2 });
  const signal = material('signal', { roughness: 0.45, metalness: 0.3 });
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const sphere = new THREE.SphereGeometry(1, 16, 10);
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 16);
  const ring = new THREE.TorusGeometry(1, 0.08, 6, 40);
  const mesh = (geometry, mat, parent, position, scale = [1, 1, 1]) => {
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(...position);
    object.scale.set(...scale);
    parent.add(object);
    return object;
  };
  const box = (parent, mat, position, scale) => mesh(cube, mat, parent, position, scale);
  const rod = (parent, mat, position, radius, length) => mesh(cylinder, mat, parent, position, [radius, length, radius]);
  const bolts = [];
  const bolt = (parent, x, y, z, size = 0.014) => bolts.push({ parent, x, y, z, size });

  // A bevelled, oval pressure bulkhead with a genuinely open centre.
  const wall = new THREE.Shape();
  wall.moveTo(-4, -3); wall.lineTo(4, -3); wall.lineTo(4, 3); wall.lineTo(-4, 3); wall.closePath();
  const opening = new THREE.Path();
  opening.absellipse(0, 0.16, 2.08, 1.05, 0, TAU, true);
  wall.holes.push(opening);
  mesh(new THREE.ExtrudeGeometry(wall, { depth: 0.14, steps: 1, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.025, bevelThickness: 0.025, curveSegments: 64 }), paint, frame, [0, 0, -1.98]);
  for (const [radius, thickness, mat, z] of [[2.08, 0.035, steel, -1.79], [2.015, 0.022, bezel, -1.78], [2.15, 0.012, glow, -1.80]]) {
    const tube = new THREE.EllipseCurve(0, 0.16, radius, radius * 1.05 / 2.08).getPoints(96);
    const path = new THREE.CatmullRomCurve3(tube.map((p) => new THREE.Vector3(p.x, p.y, z)), true);
    mesh(new THREE.TubeGeometry(path, 96, thickness, 8, true), mat, frame, [0, 0, 0]);
  }
  for (let i = 0; i < 44; i++) {
    const angle = i / 44 * TAU;
    bolt(frame, Math.cos(angle) * 2.18, 0.16 + Math.sin(angle) * 1.10, -1.77, 0.021);
  }

  // The glass is shallowly bowed; restrained transparency keeps the habitat clear.
  const glassGeometry = new THREE.PlaneGeometry(4.1, 2.05, 40, 16);
  const vertices = glassGeometry.attributes.position;
  for (let i = 0; i < vertices.count; i++) vertices.setZ(i, 0.10 * (vertices.getX(i) / 2.05) ** 2);
  glassGeometry.computeVertexNormals();
  const glass = new THREE.MeshPhysicalMaterial({ color: initialPalette.glow, metalness: 0.05, roughness: 0.12, clearcoat: 1, transparent: true, opacity: 0.035, depthWrite: false, side: THREE.DoubleSide, fog: false });
  glass.userData.cabinColor = 'glow';
  mesh(glassGeometry, glass, frame, [0, 0.16, -1.88]);

  box(console, paint, [0, -0.79, -1.37], [3.24, 0.46, 0.58]);
  box(console, steel, [0, -0.55, -1.27], [3.15, 0.024, 0.055]);
  function screen(index, x, y, width, height) {
    const housing = new THREE.Group();
    housing.position.set(x, y, -1.53);
    housing.rotation.x = -0.12;
    console.add(housing);
    box(housing, paint, [0, 0, 0], [width + 0.065, height + 0.065, 0.10]);
    box(housing, bezel, [0, 0, 0.058], [width + 0.024, height + 0.024, 0.025]);
    const mat = new THREE.MeshBasicMaterial({ map: textures[index].texture, toneMapped: false, fog: false });
    const face = mesh(new THREE.PlaneGeometry(width, height), mat, housing, [0, 0, 0.073]);
    face.name = `ocean-cockpit-display-${index}`;
    for (const side of [-1, 1]) for (const end of [-1, 1]) bolt(housing, side * (width / 2 + 0.02), end * (height / 2 + 0.02), 0.065, 0.009);
    for (let i = 0; i < 6; i++) box(housing, i === 4 ? amber : steel, [(i - 2.5) * width / 7, -height / 2 - 0.018, 0.059], [width / 11, 0.009, 0.014]);
  }
  screen(0, -1.02, -0.37, 0.68, 0.40);
  screen(1, 0, -0.46, 1.12, 0.47);
  screen(2, 1.02, -0.37, 0.68, 0.40);

  function switchBank(parent, x, y, columns, rows) {
    for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
      const sx = x + col * 0.09, sy = y - row * 0.10;
      box(parent, bezel, [sx, sy, 0.02], [0.065, 0.075, 0.02]);
      const stem = rod(parent, steel, [sx, sy + 0.008, 0.047], 0.008, 0.041);
      stem.rotation.x = (col + row) % 3 === 0 ? 0.8 : -0.6;
      mesh(sphere, (col + row) % 5 === 0 ? amber : steel, parent, [sx, sy + 0.025, 0.06], [0.013, 0.014, 0.013]);
      box(parent, (col + row) % 4 === 0 ? amber : glow, [sx, sy - 0.025, 0.034], [0.026, 0.007, 0.008]);
    }
  }
  function dial(parent, x, y, index) {
    const face = mesh(cylinder, bezel, parent, [x, y, 0.055], [0.066, 0.024, 0.066]);
    face.rotation.x = Math.PI / 2;
    mesh(ring, steel, parent, [x, y, 0.075], [0.063, 0.063, 0.063]);
    for (let i = 0; i < 9; i++) {
      const angle = -Math.PI * 0.75 + i * Math.PI * 1.5 / 8;
      const tick = box(parent, glow, [x + Math.sin(angle) * 0.047, y + Math.cos(angle) * 0.047, 0.079], [0.003, 0.009, 0.003]);
      tick.rotation.z = -angle;
    }
    const needle = box(parent, amber, [x + 0.01, y + 0.01, 0.081], [0.004, 0.065, 0.004]);
    needle.rotation.z = index % 2 ? 0.7 : -0.5;
    mesh(sphere, steel, parent, [x, y, 0.086], [0.009, 0.009, 0.008]);
  }
  for (const side of [-1, 1]) {
    const wing = new THREE.Group();
    wing.position.set(side * 1.55, -0.70, -1.00);
    wing.rotation.set(-0.45, side * -0.42, side * -0.10);
    console.add(wing);
    box(wing, paint, [0, 0, 0], [0.68, 0.58, 0.10]);
    box(wing, steel, [0, 0.29, 0.025], [0.69, 0.018, 0.08]);
    switchBank(wing, -0.23, 0.09, 6, 3);
    dial(wing, -0.16, 0.20, 0); dial(wing, 0.02, 0.20, 1); dial(wing, 0.20, 0.20, 2);
    for (const x of [-0.29, 0.29]) for (const y of [-0.25, 0.25]) bolt(wing, x, y, 0.06);
    // Guarded rocker switches and recessed ventilation slots.
    for (let i = 0; i < 3; i++) box(wing, i === 1 ? signal : amber, [-0.18 + i * 0.18, -0.26, 0.068], [0.09, 0.045, 0.055]);
    box(frame, bezel, [side * 1.82, 0.42, -1.70], [0.14, 0.39, 0.13]);
    box(frame, amber, [side * 1.82, 0.42, -1.62], [0.075, 0.29, 0.055]);
    for (let i = 0; i < 5; i++) box(frame, steel, [side * 1.82, 0.30 + i * 0.06, -1.58], [0.11, 0.009, 0.016]);
  }
  const overhead = new THREE.Group();
  overhead.position.set(0, 1.04, -1.62);
  frame.add(overhead);
  box(overhead, paint, [0, 0, 0], [1.0, 0.17, 0.21]);
  box(overhead, amber, [0, -0.045, 0.115], [0.53, 0.025, 0.012]);
  for (let i = 0; i < 8; i++) box(overhead, i % 3 ? glow : amber, [(i - 3.5) * 0.10, 0.035, 0.113], [0.025, 0.018, 0.013]);
  for (let i = 0; i < 12; i++) box(console, bezel, [(i - 5.5) * 0.10, -0.72, -1.07], [0.06, 0.011, 0.012]);

  const sticks = [];
  for (const side of [-1, 1]) {
    const base = new THREE.Group();
    base.name = side < 0 ? 'ocean-cockpit-stick-left' : 'ocean-cockpit-stick-right';
    base.position.set(side * 0.72, -0.84, -0.96);
    group.add(base);
    box(base, paint, [0, -0.055, 0], [0.33, 0.11, 0.34]);
    rod(base, steel, [0, 0.012, 0], 0.12, 0.035);
    for (let i = 0; i < 5; i++) rod(base, rubber, [0, 0.035 + i * 0.013, 0], 0.095 - i * 0.009, 0.012);
    const grip = new THREE.Group();
    grip.position.y = 0.08;
    base.add(grip);
    rod(grip, steel, [0, 0.06, 0], 0.024, 0.13);
    const handle = mesh(sphere, rubber, grip, [side * 0.012, 0.18, -0.012], [0.058, 0.11, 0.052]);
    handle.rotation.z = side * -0.12;
    const crown = mesh(sphere, paint, grip, [0, 0.255, -0.028], [0.10, 0.047, 0.075]);
    crown.rotation.x = -0.3;
    rod(grip, steel, [-0.035, 0.292, -0.027], 0.023, 0.016);
    rod(grip, signal, [0.038, 0.29, -0.025], 0.016, 0.016);
    rod(grip, glow, [0.007, 0.294, -0.065], 0.009, 0.012);
    box(grip, signal, [side * 0.055, 0.215, -0.05], [0.019, 0.055, 0.023]);
    for (let i = 0; i < 6; i++) box(grip, paint, [0, 0.13 + i * 0.018, 0.039], [0.061, 0.006, 0.012]);
    sticks.push({ base, grip, side });
  }
  const throttle = new THREE.Group();
  throttle.position.set(0, -0.69, -0.88);
  group.add(throttle);
  box(throttle, paint, [0, 0, 0], [0.43, 0.14, 0.49]);
  const levers = [];
  for (const side of [-1, 1]) {
    box(throttle, bezel, [side * 0.085, 0.079, 0], [0.045, 0.012, 0.35]);
    const lever = new THREE.Group();
    lever.position.set(side * 0.085, 0.08, 0.02);
    throttle.add(lever);
    rod(lever, steel, [0, 0.10, 0], 0.012, 0.20);
    const knob = rod(lever, rubber, [0, 0.20, 0], 0.027, 0.095);
    knob.rotation.z = Math.PI / 2;
    levers.push(lever);
  }
  // Shared, instanced fasteners keep the detailed frame and panel hardware cheap.
  for (const parent of new Set(bolts.map((entry) => entry.parent))) {
    const entries = bolts.filter((entry) => entry.parent === parent);
    const fasteners = new THREE.InstancedMesh(cylinder, steel, entries.length);
    const transform = new THREE.Object3D();
    entries.forEach(({ x, y, z, size }, i) => {
      transform.position.set(x, y, z);
      transform.rotation.x = Math.PI / 2;
      transform.scale.set(size, size * 0.35, size);
      transform.updateMatrix();
      fasteners.setMatrixAt(i, transform.matrix);
    });
    parent.add(fasteners);
  }
  // Bake fixed furniture by material while retaining articulated grips/levers.
  const originals = new Set();
  group.traverse((object) => { if (object.geometry) originals.add(object.geometry); });
  const articulated = new Set([...sticks.map(({ grip }) => grip), ...levers]);
  function batchStatic(root) {
    root.updateWorldMatrix(true, true);
    const inverse = root.matrixWorld.clone().invert(), batches = new Map();
    const candidates = [];
    function visit(object) {
      if (object !== root && articulated.has(object)) return;
      if (object.isMesh && !object.isInstancedMesh && !object.name) candidates.push(object);
      for (const child of object.children) visit(child);
    }
    visit(root);
    for (const object of candidates) {
      const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
      geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld));
      if (!batches.has(object.material)) batches.set(object.material, []);
      batches.get(object.material).push(geometry);
      object.removeFromParent();
    }
    for (const [mat, geometries] of batches) {
      const combined = new THREE.Mesh(mergeGeometries(geometries), mat);
      root.add(combined);
      for (const geometry of geometries) geometry.dispose();
    }
  }
  for (const { base, grip } of sticks) { batchStatic(grip); batchStatic(base); }
  for (const lever of levers) batchStatic(lever);
  for (const root of [frame, console, throttle]) batchStatic(root);
  const retained = new Set();
  group.traverse((object) => { if (object.geometry) retained.add(object.geometry); });
  for (const geometry of originals) if (!retained.has(geometry)) geometry.dispose();
  const warmLight = new THREE.PointLight(initialPalette.amber, 2.0, 3.2, 2);
  warmLight.position.set(-0.8, 0.35, -0.6);
  const coolLight = new THREE.PointLight(initialPalette.glow, 1.4, 2.5, 2);
  coolLight.position.set(0.6, -0.16, -0.7);
  for (const light of [warmLight, coolLight]) light.userData.cabinLight = true;
  group.add(warmLight, coolLight);
  group.traverse((object) => object.layers.set(1));

  let palette = initialPalette, lastKey = '', lastRefresh = -Infinity;
  let ink, grid, background, bright, warm;
  function setPalette(next) {
    palette = next;
    group.traverse((object) => {
      const mat = object.material;
      const key = mat?.userData.cabinColor;
      if (!key) return;
      mat.color.copy(palette[key]);
      if (mat === glow || mat === amber) mat.emissive.copy(palette[key]);
    });
    warmLight.color.copy(palette.amber); coolLight.color.copy(palette.glow);
    ink = rgb(palette.ink); background = rgb(palette.screen);
    bright = rgb(palette.glow); warm = rgb(palette.amber);
    grid = rgb(palette.screen.clone().lerp(palette.glow, 0.14));
    lastKey = ''; lastRefresh = -Infinity;
  }
  setPalette(initialPalette);
  const point = new THREE.Vector3();
  function update({ position, yaw, depth, turn = 0, lift = 0, throttle: power = 0, mode = 'MANUAL', discoveries = [], now = performance.now() }) {
    for (const { grip } of sticks) { grip.rotation.set(lift * -0.18, 0, turn * -0.20); }
    for (const lever of levers) lever.rotation.x = -0.15 - power * 0.6;
    const heading = ((-THREE.MathUtils.radToDeg(yaw) % 360) + 360) % 360;
    const contacts = [];
    for (const discovery of discoveries) {
      if (!discovery.object3d.visible) continue;
      discovery.object3d.getWorldPosition(point);
      const dx = point.x - position.x, dz = point.z - position.z;
      if (Math.hypot(dx, dz) > 30) continue;
      contacts.push([Math.round((dx * Math.cos(yaw) - dz * Math.sin(yaw)) * 3), Math.round((dx * Math.sin(yaw) + dz * Math.cos(yaw)) * 3)]);
    }
    const value = `${depth.toFixed(1)} ${Math.round(heading)} ${Math.round(power * 100)} ${mode} ${Math.round(turn * 100)} ${Math.round(lift * 100)}`;
    const key = `${value} ${contacts.flat().join(',')}`;
    if (key === lastKey || now - lastRefresh < 200) return;
    lastKey = key; lastRefresh = now;
    for (const screen of textures) screen.clear(background, grid);
    const [nav, sonar, systems] = textures;
    nav.text('NAVIGATION', 12, 9, ink, 2);
    nav.text('DEPTH', 15, 36, bright); nav.text(`${depth.toFixed(1)} M`, 15, 51, ink, 3);
    nav.text('HEADING', 15, 91, bright); nav.text(`${Math.round(heading) % 360}`.padStart(3, '0'), 15, 106, ink, 3);
    nav.text('°', 72, 104, ink, 2);
    // Compass dial: N stays up, the amber needle points where the sub is heading.
    const cx = 190, cy = 86, r = 44, bearing = THREE.MathUtils.degToRad(heading);
    for (let y = -r; y <= r; y++) { const w = Math.sqrt(r * r - y * y); nav.line(cx - w, cy + y, cx + w, cy + y, background); }
    for (let i = 0; i < 120; i++) {
      const a = i / 120 * TAU, b = (i + 1) / 120 * TAU;
      nav.line(cx + Math.sin(a) * r, cy - Math.cos(a) * r, cx + Math.sin(b) * r, cy - Math.cos(b) * r, bright);
    }
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU, inner = i % 3 ? r - 5 : r - 9;
      nav.line(cx + Math.sin(a) * inner, cy - Math.cos(a) * inner, cx + Math.sin(a) * r, cy - Math.cos(a) * r, bright);
    }
    nav.text('N', cx - 4, cy - r + 12, warm, 2);
    nav.text('S', cx - 4, cy + r - 25, ink, 2); nav.text('E', cx + r - 23, cy - 6, ink, 2); nav.text('W', cx - r + 13, cy - 6, ink, 2);
    const tip = r - 13, sx = Math.sin(bearing), sy = -Math.cos(bearing);
    for (let o = -4; o <= 4; o += 0.5) {
      for (const t of [-0.5, 0, 0.5]) nav.line(cx - sy * o, cy + sx * o, cx + sx * tip - sy * t, cy + sy * tip + sx * t, warm);
      nav.line(cx - sy * o, cy + sx * o, cx - sx * tip * 0.45, cy - sy * tip * 0.45, ink);
    }
    for (let y = -3; y <= 3; y++) nav.line(cx - 3, cy + y, cx + 3, cy + y, ink);
    nav.text(mode, 15, 147, warm);
    sonar.text('NEARBY / 30 M', 12, 9, ink, 2);
    for (const radius of [18, 36, 54]) {
      for (let i = 0; i < 96; i++) {
        const a = i / 96 * TAU, b = (i + 1) / 96 * TAU;
        sonar.line(128 + Math.cos(a) * radius, 87 + Math.sin(a) * radius, 128 + Math.cos(b) * radius, 87 + Math.sin(b) * radius, bright);
      }
    }
    sonar.line(74, 87, 182, 87, grid); sonar.line(128, 33, 128, 141, grid);
    sonar.line(124, 90, 128, 81, ink); sonar.line(128, 81, 132, 90, ink);
    for (const [x, y] of contacts) {
      const sx = 128 + x * 0.6, sy = 87 + y * 0.6;
      sonar.line(sx - 2, sy, sx + 2, sy, warm); sonar.line(sx, sy - 2, sx, sy + 2, warm);
    }
    sonar.text('OCEAN EXPLORER', 12, 148, bright);
    systems.text('DRIVE CONTROL', 12, 9, ink, 2);
    for (const [index, label, amount] of [[0, 'THRUST', power], [1, 'TURN', Math.abs(turn)], [2, 'LIFT', Math.abs(lift)]]) {
      const y = 39 + index * 32;
      systems.text(label, 13, y, bright);
      systems.text(`${Math.round(amount * 100)}`, 185, y, ink, 2);
      systems.line(13, y + 19, 242, y + 19, grid);
      for (let i = 0; i < Math.round(amount * 22); i++) for (let h = 0; h < 6; h++) systems.line(13 + i * 10, y + 15 + h, 19 + i * 10, y + 15 + h, index ? bright : warm);
    }
    systems.text(mode, 13, 148, warm);
    for (const screen of textures) screen.texture.needsUpdate = true;
  }
  function resize(aspect) {
    frame.scale.x = aspect / 1.6;
    console.scale.x = Math.max(0.55, Math.min(1.3, aspect / 1.6));
    for (const { base, side } of sticks) base.position.x = side * Math.min(0.72, aspect * 0.40);
    throttle.scale.x = aspect < 1 ? 0.70 : 1;
  }
  let released = false;
  function disposeTextures() {
    if (released) return;
    released = true;
    for (const { texture } of textures) texture.dispose();
  }
  return { group, update, resize, setPalette, disposeTextures };
}
