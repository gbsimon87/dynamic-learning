import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';

export const OCEAN_SURFACE_HEIGHT = 9;
const TAU = Math.PI * 2;
const hash = (x, y) => THREE.MathUtils.euclideanModulo(Math.sin(x * 127.1 + y * 311.7) * 43758.5453, 1);

function periodicNoise(u, v, cells, seed) {
  const x = u * cells, y = v * cells;
  const ix = Math.floor(x), iy = Math.floor(y);
  const smooth = (f) => f * f * f * (f * (f * 6 - 15) + 10);
  const fx = smooth(x - ix), fy = smooth(y - iy);
  const sample = (dx, dy) => hash((ix + dx) % cells + seed, (iy + dy) % cells + seed);
  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(sample(0, 0), sample(1, 0), fx), THREE.MathUtils.lerp(sample(0, 1), sample(1, 1), fx), fy);
}

// Original, seamless textures. Jittered cells break up the old repeating sine net.
function createWaterTextures() {
  const size = 256;
  const normals = new Uint8Array(size * size * 4);
  const caustics = new Uint8Array(size * size * 4);
  const sand = new Uint8Array(size * size * 4);
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let height = 0, weight = 0.55;
      for (let octave = 0; octave < 5; octave++) {
        height += periodicNoise(x / size, y / size, 4 * 2 ** octave, octave * 17) * weight;
        weight *= 0.5;
      }
      heights[y * size + x] = height;
    }
  }
  const heightAt = (x, y) => heights[((y + size) % size) * size + (x + size) % size];
  const normal = new THREE.Vector3();
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size * TAU, v = y / size * TAU;
      // A multi-scale height field avoids the long parallel sine-wave stripes.
      const dx = (heightAt(x + 1, y) - heightAt(x - 1, y)) * 9;
      const dy = (heightAt(x, y + 1) - heightAt(x, y - 1)) * 9;
      normal.set(-dx, -dy, 1).normalize();
      const index = (y * size + x) * 4;
      normals.set([(normal.x * 0.5 + 0.5) * 255, (normal.y * 0.5 + 0.5) * 255, (normal.z * 0.5 + 0.5) * 255, 255], index);
      const px = x / size * 8 + 0.24 * Math.sin(v * 2), py = y / size * 8 + 0.24 * Math.sin(u * 3);
      let first = Infinity, second = Infinity;
      for (let cy = Math.floor(py) - 1; cy <= Math.floor(py) + 1; cy++) {
        for (let cx = Math.floor(px) - 1; cx <= Math.floor(px) + 1; cx++) {
          const hx = THREE.MathUtils.euclideanModulo(cx, 8), hy = THREE.MathUtils.euclideanModulo(cy, 8);
          const distance = Math.hypot(px - cx - 0.2 - hash(hx, hy) * 0.6, py - cy - 0.2 - hash(hx + 19, hy + 7) * 0.6);
          if (distance < first) { second = first; first = distance; }
          else if (distance < second) second = distance;
        }
      }
      const ridge = Math.round(Math.exp(-(second - first) * 38) * 255);
      caustics.set([ridge, ridge, ridge, 255], index);
      const ripple = Math.sin(v * 24 + 1.4 * Math.sin(u * 3) + 0.6 * Math.sin(u * 7 + v * 2));
      const grain = hash(x, y);
      const value = Math.round(208 + ripple * 13 + grain * 22 + Math.sin(u * 3 + v * 2) * 6);
      sand.set([value, value, value, 255], index);
    }
  }
  const make = (data) => {
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  };
  return { normals: make(normals), caustics: make(caustics), sand: make(sand) };
}

/** WebGL Water addon, oriented and shaded for a camera below the surface. */
export function createOceanWater(seabedMaterial) {
  const textures = createWaterTextures();
  const time = { value: 0 };
  const surface = new Water(new THREE.PlaneGeometry(1000, 1000), {
    textureWidth: 256,
    textureHeight: 256,
    waterNormals: textures.normals,
    sunDirection: new THREE.Vector3(-0.4, -0.85, -0.3).normalize(),
    distortionScale: 0.65,
    fog: true,
  });
  surface.name = 'ocean-water-surface';
  surface.position.y = OCEAN_SURFACE_HEIGHT;
  // Water renders its reflection only from the plane's front. Face it down.
  surface.rotation.x = Math.PI / 2;
  surface.material.uniforms.size.value = 22;
  // r181 assumes an upward normal and only reflected light. Adapt its Fresnel
  // calculation and add stylised transmitted daylight for viewing from below.
  // These exact shader hooks must be reviewed when upgrading Three.js.
  surface.material.fragmentShader = surface.material.fragmentShader
    .replace('vec3 diffuseLight = vec3(0.0);', 'surfaceNormal.y = -abs(surfaceNormal.y);\n vec3 diffuseLight = vec3(0.0);')
    .replace('float rf0 = 0.3;', 'float rf0 = 0.08;')
    .replace('vec3 outgoingLight = albedo;', `
      float daylight = pow(max(dot(-eyeDirection, normalize(vec3(-0.4, 0.85, -0.3))), 0.0), 12.0);
      float ripples = 0.88 + noise.x * 0.22 + noise.z * 0.18;
      vec3 transmitted = waterColor * ripples * 0.85 + sunColor * daylight * 0.38;
      vec3 outgoingLight = mix(transmitted, albedo, 0.25 + reflectance * 0.4);
    `);
  textures.sand.repeat.set(32, 32);
  seabedMaterial.map = textures.sand;
  seabedMaterial.bumpMap = textures.sand;
  seabedMaterial.bumpScale = 0.065;

  // Project two differently scaled/drifting layers in world space, so rocks and
  // dunes share the same light field without stretching it with their own UVs.
  function addCaustics(material) {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.oceanTime = time;
      shader.uniforms.oceanCaustics = { value: textures.caustics };
      shader.vertexShader = `varying vec3 vOceanPosition;\n${shader.vertexShader}`.replace('#include <begin_vertex>', `
        #include <begin_vertex>
        vec4 oceanPosition = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          oceanPosition = instanceMatrix * oceanPosition;
        #endif
        vOceanPosition = (modelMatrix * oceanPosition).xyz;
      `);
      shader.fragmentShader = `uniform float oceanTime;\nuniform sampler2D oceanCaustics;\nvarying vec3 vOceanPosition;\n${shader.fragmentShader}`.replace('#include <color_fragment>', `
        #include <color_fragment>
        vec2 projected = vOceanPosition.xz + vOceanPosition.y * vec2(0.3, 0.2);
        float causticA = texture2D(oceanCaustics, projected * 0.055 + oceanTime * vec2(0.009, 0.004)).r;
        float causticB = texture2D(oceanCaustics, projected * 0.083 + oceanTime * vec2(-0.004, 0.006)).r;
        float shimmer = min(causticA, causticB) * 1.8 + max(causticA, causticB) * 0.3;
        diffuseColor.rgb *= 0.94 + shimmer * 0.48;
      `);
    };
    material.customProgramCacheKey = () => 'ocean-caustics-r181-v2';
  }
  addCaustics(seabedMaterial);
  const reflectionTarget = surface.material.uniforms.mirrorSampler.value.renderTarget;
  let disposed = false;
  return {
    surface,
    addCaustics,
    setPalette(palette) {
      surface.material.uniforms.waterColor.value.copy(palette.surface);
      surface.material.uniforms.sunColor.value.copy(palette.light);
    },
    advance(seconds) {
      time.value += seconds;
      surface.material.uniforms.time.value += seconds * 0.6;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      Object.values(textures).forEach((texture) => texture.dispose());
      reflectionTarget.dispose();
    },
  };
}
