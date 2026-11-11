import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Geometry is immutable after authoring. Each Mesh owns its animation weights;
// matching species can share the larger position/normal buffers on the GPU.
const waveGeometries = new WeakMap();

/** Two relative morphs describe a travelling wave exactly. The GPU blends them;
 * the CPU only changes two weights. Three's raycaster sees the same deformation. */
export function marineWave(mesh, { along = 'z', axis = 'x', start, end, amplitude, wavelength = 2.2, rate = 3, phase = 0 }) {
  const source = mesh.geometry;
  const key = JSON.stringify([along, axis, start, end, amplitude, wavelength, rate, phase]);
  if (!waveGeometries.has(source)) waveGeometries.set(source, new Map());
  const cache = waveGeometries.get(source);
  const span = end - start;
  const sample = (coordinate, seconds) => {
    const q = THREE.MathUtils.clamp((coordinate - start) / span, 0, 1);
    const angle = seconds * rate + phase - q * wavelength;
    return {
      offset: amplitude * q * q * Math.sin(angle),
      slope: q > 0 && q < 1 ? amplitude / span * (2 * q * Math.sin(angle) - q * q * wavelength * Math.cos(angle)) : 0,
    };
  };
  let geometry = cache.get(key);
  if (!geometry) {
    geometry = source.clone();
    const rest = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    geometry.morphAttributes.position = [];
    geometry.morphAttributes.normal = [];
    for (const time of [0, Math.PI / (2 * rate)]) {
      const target = geometry.clone();
      // An unindexed vertex or pole can be repeated: always deform from rest.
      const positions = rest.clone();
      target.setAttribute('position', positions);
      for (let i = 0; i < rest.count; i++) {
        const coordinate = rest[`get${along.toUpperCase()}`](i);
        positions[`set${axis.toUpperCase()}`](i, rest[`get${axis.toUpperCase()}`](i) + sample(coordinate, time).offset);
      }
      target.computeVertexNormals();
      const delta = positions.clone(), normalDelta = target.attributes.normal.clone();
      for (let i = 0; i < rest.array.length; i++) {
        delta.array[i] -= rest.array[i];
        normalDelta.array[i] -= normals.array[i];
      }
      geometry.morphAttributes.position.push(delta);
      geometry.morphAttributes.normal.push(normalDelta);
      target.dispose();
    }
    geometry.morphTargetsRelative = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    // Signed weights can combine the two extrema, beyond either target alone.
    geometry.boundingBox.expandByScalar(Math.abs(amplitude) * 2);
    geometry.boundingSphere.radius += Math.abs(amplitude) * 2;
    cache.set(key, geometry);
  }
  mesh.geometry = geometry;
  mesh.updateMorphTargets();
  const update = (seconds) => {
    mesh.morphTargetInfluences[0] = Math.cos(seconds * rate);
    mesh.morphTargetInfluences[1] = Math.sin(seconds * rate);
  };
  update(0);
  return { update, sample };
}

/** A continuous body wave meets the tail at the same offset and tangent. */
export function marineSpine(body, tail, options) {
  const wave = marineWave(body, options);
  const axis = options.axis ?? 'x';
  const rotation = axis === 'x' ? 'y' : 'x';
  const attachments = [tail, ...body.parent.children.filter((node) => node !== body && node.userData.followSpine)]
    .map((node) => {
      node.userData.marineAnimated = true;
      return { node, origin: node.position.clone(), angle: node.rotation[rotation] };
    });
  return (seconds) => {
    wave.update(seconds);
    for (const { node, origin, angle } of attachments) {
      const { offset, slope } = wave.sample(origin.z, seconds);
      node.position[axis] = origin[axis] + offset;
      node.rotation[rotation] = angle + Math.atan(slope) * (axis === 'x' ? 1 : -1);
    }
  };
}

/** Merge stationary anatomy within each pivot. Animated/morphed parts, eyes,
 * transparent layers and instanced suckers keep their own identities. */
export function prepareMarineModel(model) {
  if (model.userData.pose) return model;
  const detail = [];
  const visit = (parent) => {
    for (const child of [...parent.children]) if (!child.isMesh) visit(child);
    const batches = new Map();
    for (const child of parent.children) {
      if (!child.isMesh || child.isInstancedMesh || child.morphTargetInfluences || child.userData.marineAnimated || child.material.transparent || Array.isArray(child.material)) continue;
      const key = `${child.material.uuid}-${Boolean(child.userData.marineDetail)}`;
      if (!batches.has(key)) batches.set(key, []);
      batches.get(key).push(child);
    }
    for (const meshes of batches.values()) {
      if (meshes.length < 2) continue;
      const sources = meshes.map((mesh) => {
        mesh.updateMatrix();
        const source = mesh.geometry.clone().applyMatrix4(mesh.matrix);
        if (!source.index) return source;
        const expanded = source.toNonIndexed();
        source.dispose();
        return expanded;
      });
      const geometry = mergeGeometries(sources);
      sources.forEach((source) => source.dispose());
      if (!geometry) continue;
      const batch = new THREE.Mesh(geometry, meshes[0].material);
      batch.name = `${model.name}-anatomy`;
      batch.userData.marineDetail = meshes[0].userData.marineDetail;
      meshes.forEach((mesh) => parent.remove(mesh));
      parent.add(batch);
    }
  };
  visit(model);
  const pose = new THREE.Group();
  pose.name = `${model.name}-pose`;
  for (const child of [...model.children]) pose.add(child);
  model.add(pose);
  model.userData.pose = pose;
  model.traverse((node) => { if (node.userData.marineDetail) detail.push(node); });
  model.userData.detailMeshes = detail;
  return model;
}

/** Small anatomy fades out before it becomes subpixel; the main silhouette and
 * soft-body motion remain. Hidden detail is restored immediately on approach. */
export function setMarineDetail(model, distance) {
  const visible = distance < 26;
  for (const mesh of model.userData.detailMeshes ?? []) mesh.visible = visible;
  model.userData.animationInterval = distance < 32 ? 0 : 1 / 15;
}
