import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { constellations } from './constellations.js';
import { SKY_RADIUS, constellationFrame, skyDirection } from './constellationSkyLayout.js';
import { badgePixelHeight, badgeWorldHeight } from './labelLayout.js';

/**
 * Catalogue directions on a teaching sky sphere, never actual stellar distances.
 * getDisplay() is null while "Constellations" is off, else a brightness level
 * ({ lines, stars, names }) for the whole sky behind the Solar System.
 */
export function createConstellationSky({ scene, camera, domElement, makeLabel, makeNameLabel = makeLabel, getQuality, reducedMotion, isHidden = () => false, getDisplay = () => null, createControls = (c, dom) => new OrbitControls(c, dom) }) {
  const root = new THREE.Group(); root.name = 'constellation-sky'; scene.add(root);
  const pole = skyDirection({ raHours: 0, decDeg: 90 });
  const north = new THREE.Vector3(pole.x, pole.y, pole.z);
  const groups = new Map();
  // OrbitControls takes its up axis from camera.up when built: orbit about
  // celestial north, so dragging past Polaris never rolls the view.
  const up = camera.up.clone(); camera.up.copy(north);
  const controls = createControls(camera, domElement);
  camera.up.copy(up);
  controls.enabled = false; controls.enableZoom = false; controls.enablePan = false;
  controls.enableDamping = false; controls.rotateSpeed = .35;
  controls.minDistance = .01; controls.maxDistance = .01;
  let saved = null, selected = null, transition = null, framing = null, trace = null;
  let size = { width: domElement.clientWidth, height: domElement.clientHeight };
  const anchor = new THREE.Vector3(), targetRotation = new THREE.Quaternion(), offset = new THREE.Vector3();
  const geometries = [], materials = [], labels = [], badges = [];
  for (const constellation of constellations) {
    const group = new THREE.Group(); group.name = constellation.id; root.add(group);
    const positions = new Map(constellation.stars.map(star => {
      const d = skyDirection(star); return [star.id, new THREE.Vector3(d.x, d.y, d.z).multiplyScalar(SKY_RADIUS)];
    }));
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(constellation.stars.flatMap(star => positions.get(star.id).toArray()), 3));
    starGeometry.setAttribute('brightness', new THREE.Float32BufferAttribute(constellation.stars.map(s => Math.max(.35, Math.min(1, 1 - s.magnitude / 7))), 1));
    const starMaterial = new THREE.ShaderMaterial({
      transparent: true, depthTest: false, depthWrite: false, toneMapped: false,
      uniforms: { pointScale: { value: 1 }, strength: { value: .5 } },
      vertexShader: 'attribute float brightness; varying float light; uniform float pointScale; void main(){light=brightness;gl_PointSize=(5.0+brightness*8.0)*pointScale;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying float light; uniform float strength; void main(){float r=length(gl_PointCoord-0.5)*2.0;if(r>1.0)discard;float glow=exp(-r*r*5.0);gl_FragColor=vec4(vec3(0.9,0.95,1.0),glow*strength);}',
    });
    const points = new THREE.Points(starGeometry, starMaterial); points.renderOrder = 100; group.add(points);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(constellation.lines.flatMap(([a,b]) => [positions.get(a), positions.get(b)]));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x90c9ff, transparent: true, opacity: .12, depthTest: false, depthWrite: false, toneMapped: false });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial); lines.renderOrder = 99; group.add(lines);
    const nameGroup = new THREE.Group(); nameGroup.visible = false; group.add(nameGroup);
    for (const star of constellation.stars.filter(s => s.label !== false)) {
      const label = makeLabel(star.name);
      label.position.copy(positions.get(star.id)).addScaledVector(north, star.labelPosition === 'below' ? -30 : 30);
      label.material.depthTest = false; label.material.depthWrite = false; label.renderOrder = 101;
      label.userData.skyStar = star; label.userData.skyPosition = positions.get(star.id).clone(); nameGroup.add(label); labels.push(label);
    }
    // The figure's name sits just south of its lowest star.
    const frame = constellationFrame(constellation.stars, 1, 1);
    const center = new THREE.Vector3(frame.center.x, frame.center.y, frame.center.z);
    const lowest = Math.min(...[...positions.values()].map(p => p.dot(north)));
    const badge = makeNameLabel(constellation.name);
    badge.userData.skyPosition = center.multiplyScalar(SKY_RADIUS).addScaledVector(north, lowest - center.dot(north));
    badge.material.depthWrite = false; badge.visible = false; group.add(badge); badges.push(badge);
    geometries.push(starGeometry, lineGeometry); materials.push(starMaterial, lineMaterial);
    groups.set(constellation.id, { group, nameGroup, points, lines, badge });
  }
  function setSize() {
    if (saved && selected) {
      const frame = constellationFrame(selected.stars, camera.aspect, size.height, { leftPanel: true });
      framing = frame;
      domElement.parentElement?.setAttribute('data-constellation-layout', frame.reservedLeft ? 'left' : frame.reservedX ? 'side' : 'bottom');
      camera.fov = trace === null ? frame.fov : Math.min(135, frame.fov * 1.12);
      camera.setViewOffset(size.width, size.height, (frame.reservedX - frame.reservedLeft) / 2, frame.reserved / 2, size.width, size.height);
      camera.updateProjectionMatrix();
    }
    for (const label of labels) {
      // Keep text readable at each framing angle without extra touch-device assets.
      const ratio = label.material.map.image.width / label.material.map.image.height;
      const height = 18 * 2 * SKY_RADIUS * Math.tan(camera.fov * Math.PI / 360) / Math.max(1, size.height);
      label.scale.set(height * ratio, height, 1);
      label.position.copy(label.userData.skyPosition).addScaledVector(north, (label.userData.skyStar.labelPosition === 'below' ? -1 : 1) * height * .8);
    }

  }
  const api = {
    setTrace(lineCount) {
      const reframing = (trace === null) !== (lineCount === null);
      trace = lineCount;
      if (reframing) setSize();
    },
    projectStar(id) {
      const star = selected?.stars.find(s => s.id === id);
      if (!saved || !star) return null;
      const direction = skyDirection(star);
      camera.updateMatrixWorld();
      const point = new THREE.Vector3(direction.x, direction.y, direction.z).multiplyScalar(SKY_RADIUS).add(root.position).project(camera);
      const x = (point.x + 1) * size.width / 2, y = (1 - point.y) * size.height / 2;
      return { x, y, visible: !transition && point.z < 1 && x > framing.reservedLeft + 24 && x < size.width - framing.reservedX - 24 && y > 24 && y < size.height - framing.reserved - 24 };
    },
    enter(id) {
      const constellation = constellations.find(c => c.id === id);
      if (!constellation) return false;
      if (!saved) {
        saved = { position: camera.position.clone(), quaternion: camera.quaternion.clone(), up: camera.up.clone(), fov: camera.fov, view: camera.view ? { ...camera.view } : null };
        anchor.copy(camera.position); root.position.copy(anchor); controls.target.copy(anchor);
      }
      selected = constellation;
      camera.up.copy(north);
      setSize();
      const frame = constellationFrame(selected.stars, camera.aspect, size.height, { leftPanel: true });
      const direction = new THREE.Vector3(frame.center.x, frame.center.y, frame.center.z);
      targetRotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(anchor.clone().addScaledVector(direction, -.01), anchor, north));
      transition = { from: camera.quaternion.clone(), t: 0 };
      controls.enabled = false;
      if (reducedMotion()) api.update(1);
      return true;
    },
    isActive: () => Boolean(saved),
    update(dt = 0, { active = false } = {}) {
      // Opened from the star chart, the sky shows whatever the drawer says.
      const display = saved ? null : getDisplay();
      root.visible = !active && !isHidden() && Boolean(saved || display);
      if (display) {
        // Centred on the camera, the figures sit at the same distance as a
        // real sky, so flying about never brings them closer.
        root.position.copy(camera.position);
        const height = badgeWorldHeight(badgePixelHeight(size.width), SKY_RADIUS, camera.fov, size.height);
        for (const badge of badges) {
          const ratio = badge.material.map.image.width / badge.material.map.image.height;
          badge.scale.set(height * ratio, height, 1);
          badge.position.copy(badge.userData.skyPosition).addScaledVector(north, -height * .8);
        }
      }
      for (const [id, item] of groups) {
        const focus = saved && id === selected.id;
        item.points.material.uniforms.strength.value = display ? display.stars : focus ? 1.8 : .6;
        item.points.material.uniforms.pointScale.value = getQuality() === 'low' ? 1.2 : 1;
        item.lines.material.opacity = display ? display.lines : focus ? .85 : .16;
        item.lines.geometry.setDrawRange(0, trace !== null && saved ? (focus ? trace * 2 : 0) : Infinity);
        item.nameGroup.visible = Boolean(focus && trace === null);
        item.badge.visible = Boolean(display);
        if (display) item.badge.material.opacity = display.names;
        // Behind the planets in the Solar System; on top of everything when opened.
        for (const [object, order] of [[item.lines, 99], [item.points, 100], [item.badge, 101]]) {
          object.material.depthTest = Boolean(display);
          object.renderOrder = display ? order - 200 : order;
        }
      }
      if (!saved || active) return;
      if (transition) {
        transition.t = reducedMotion() ? 1 : Math.min(1, transition.t + dt / .9);
        const t = transition.t * transition.t * (3 - 2 * transition.t);
        camera.quaternion.slerpQuaternions(transition.from, targetRotation, t);
        offset.set(0, 0, .01).applyQuaternion(camera.quaternion);
        camera.position.copy(anchor).add(offset);
        if (transition.t === 1) { transition = null; controls.enabled = true; controls.update(); }
      } else controls.update();
      camera.updateMatrixWorld();
      const occupied = [];
      const focusedLabels = groups.get(selected.id).nameGroup.children;
      for (const label of [...focusedLabels].sort((a,b) => a.userData.skyStar.magnitude - b.userData.skyStar.magnitude)) {
        const projected = offset.copy(label.position).add(root.position).project(camera);
        const halfWidth = 9 * label.scale.x / label.scale.y / size.width * 2;
        const halfHeight = 22 / size.height;
        const box = { x: projected.x, y: projected.y, w: halfWidth, h: halfHeight };
        label.visible = projected.z < 1 && projected.x > -1 + halfWidth + framing.reservedLeft / size.width * 2 && projected.x < 1 - halfWidth - framing.reservedX / size.width * 2 && projected.y < 1 - halfHeight
          && projected.y > -1 + framing.reserved / size.height * 2
          && !occupied.some(b => Math.abs(b.x-box.x) < b.w+box.w && Math.abs(b.y-box.y) < b.h+box.h);
        if (label.visible) occupied.push(box);
      }
    },
    resize(next) { size = next; setSize(); },
    exit() {
      if (!saved) return;
      controls.enabled = false; transition = null;
      camera.position.copy(saved.position); camera.quaternion.copy(saved.quaternion); camera.up.copy(saved.up); camera.fov = saved.fov;
      if (saved.view?.enabled) camera.setViewOffset(saved.view.fullWidth, saved.view.fullHeight, saved.view.offsetX, saved.view.offsetY, saved.view.width, saved.view.height);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      saved = null; selected = null; trace = null; root.position.set(0,0,0);
      domElement.parentElement?.removeAttribute('data-constellation-layout');
      api.update();
    },
    dispose() {
      api.exit(); controls.dispose(); root.removeFromParent();
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      [...labels, ...badges].forEach(label => { label.material.map?.dispose(); label.material.dispose(); });
    },
  };
  setSize();
  return api;
}
