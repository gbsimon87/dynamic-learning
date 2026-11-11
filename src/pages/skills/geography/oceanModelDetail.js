import * as THREE from 'three';

const bodyGeometries = new Map();

/** Original procedural surfaces: one standard forward pass, no image assets,
 * extra lights, transmission targets or per-animal textures. */
export function marineMaterial(water, color, { pattern = 'skin', belly, roughness = 0.48, metalness = 0, tissue = 0, animal = false } = {}) {
  const material = new THREE.MeshStandardMaterial({ color, roughness, metalness, side: THREE.DoubleSide });
  material.forceSinglePass = true;
  water?.addCaustics(material);
  const caustics = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    caustics?.(shader, renderer);
    shader.uniforms.oceanBelly = { value: new THREE.Color(belly ?? color) };
    shader.uniforms.marineTissue = { value: tissue };
    shader.vertexShader = `varying vec3 vMarinePosition;\n${shader.vertexShader}`.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      vMarinePosition = position;
    `);
    shader.fragmentShader = `
      uniform vec3 oceanBelly;
      uniform float marineTissue;
      varying vec3 vMarinePosition;
      float marineNoise(vec3 p) {
        vec3 cell = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        vec4 n = vec4(dot(cell, vec3(127.1, 311.7, 74.7))) + vec4(0.0, 127.1, 311.7, 438.8);
        vec4 a = fract(sin(n) * 43758.5453);
        vec4 b = fract(sin(n + 74.7) * 43758.5453);
        return mix(mix(mix(a.x, a.y, f.x), mix(a.z, a.w, f.x), f.y),
          mix(mix(b.x, b.y, f.x), mix(b.z, b.w, f.x), f.y), f.z);
      }
      ${shader.fragmentShader}`.replace('#include <color_fragment>', `
      #include <color_fragment>
      vec3 marineP = vMarinePosition;
      // fwidth attenuates detail before distant fragments alias or sparkle.
      float marineFootprint = max(length(dFdx(marineP)), length(dFdy(marineP)));
      float marineDetail = 1.0 - smoothstep(0.012, 0.065, marineFootprint);
      float marineGrain = marineNoise(marineP * 38.0);
      float marineMottle = marineNoise(marineP * 7.0);
      ${belly ? 'diffuseColor.rgb = mix(oceanBelly, diffuseColor.rgb, smoothstep(-0.24, 0.22, marineP.y));' : ''}
      diffuseColor.rgb *= 0.91 + marineMottle * 0.15 + marineGrain * marineDetail * 0.035;
      float marineRelief = marineGrain * 0.001;
      ${pattern === 'scales' ? `
        vec2 scaleUV = vec2(atan(marineP.x, marineP.y) * 4.2, marineP.z * 12.0);
        scaleUV.x += mod(floor(scaleUV.y), 2.0) * 0.5;
        vec2 scaleCell = fract(scaleUV) - 0.5;
        float scaleEdge = abs(length(scaleCell * vec2(1.0, 0.7)) - 0.46);
        float scaleLine = 1.0 - smoothstep(0.025, 0.025 + max(fwidth(scaleEdge), 0.015), scaleEdge);
        diffuseColor.rgb *= 1.0 - scaleLine * marineDetail * 0.14;
        marineRelief += (1.0 - scaleLine) * 0.0018;
      ` : ''}
      ${pattern === 'clownfish' ? `
        float bandDistance = min(min(abs(marineP.z + 0.25), abs(marineP.z - 0.04)), abs(marineP.z - 0.31));
        float bandEdge = max(fwidth(marineP.z), 0.005);
        float band = 1.0 - smoothstep(0.038, 0.038 + bandEdge, bandDistance);
        float border = 1.0 - smoothstep(0.053, 0.053 + bandEdge, bandDistance);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.018, 0.023, 0.02), border);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.85, 0.74), band);
      ` : ''}
      ${pattern === 'denticles' ? `
        float denticle = sin(marineP.z * 170.0 + sin(marineP.y * 150.0) * 0.6) * sin(marineP.y * 150.0);
        marineRelief = denticle * 0.00065;
      ` : ''}
      ${pattern === 'ray' ? `
        vec2 spotUV = marineP.xz * 10.0;
        vec2 spotCell = floor(spotUV);
        vec2 jitter = vec2(marineNoise(vec3(spotCell, 1.0)), marineNoise(vec3(spotCell, 3.0))) * 0.45;
        float spotDistance = length(fract(spotUV) - 0.28 - jitter);
        float spots = 1.0 - smoothstep(0.075, 0.13 + fwidth(spotDistance), spotDistance);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.68, 0.72, 0.65), spots * 0.8);
      ` : ''}
      ${pattern === 'armor' ? `
        float ridge = pow(0.5 + 0.5 * sin(marineP.y * 92.0 + marineP.z * 12.0), 4.0);
        diffuseColor.rgb *= 1.0 - ridge * 0.16 * marineDetail;
        marineRelief += ridge * 0.0015;
      ` : ''}
      ${pattern === 'cephalopod' ? `
        float cells = smoothstep(0.52, 0.7, marineNoise(marineP * 34.0));
        diffuseColor.rgb *= 1.0 - cells * 0.22 * marineDetail;
        marineRelief += marineMottle * 0.002;
      ` : ''}
      ${pattern === 'fin' ? `
        float rays = sin((marineP.z + marineP.x * 0.6) * 88.0);
        diffuseColor.rgb *= 1.0 - (rays * 0.5 + 0.5) * marineDetail * 0.1;
        marineRelief = rays * 0.0007;
      ` : ''}
      ${pattern === 'coral' ? `
        float polyp = pow(max(0.0, sin(marineP.x * 65.0) * sin(marineP.y * 63.0) * sin(marineP.z * 61.0)), 3.0);
        diffuseColor.rgb *= 1.0 - polyp * 0.24;
      ` : ''}
      ${pattern === 'shell' ? 'diffuseColor.rgb *= 0.93 + sin(marineP.z * 35.0 + marineMottle * 4.0) * 0.06;' : ''}
    `);
    if (animal) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `
        #include <normal_fragment_maps>
        // Screen-space surface gradient: subtle micro-normal relief without
        // fetching another texture. Guard the determinant at grazing angles.
        vec3 marineDx = dFdx(-vViewPosition), marineDy = dFdy(-vViewPosition);
        vec3 marineR1 = cross(marineDy, normal), marineR2 = cross(normal, marineDx);
        float marineDet = dot(marineDx, marineR1);
        vec3 marineGradient = (dFdx(marineRelief) * marineR1 + dFdy(marineRelief) * marineR2)
          / max(abs(marineDet), 0.000001) * sign(marineDet);
        normal = normalize(normal - clamp(marineGradient, vec3(-0.16), vec3(0.16)) * marineDetail);
      `).replace('#include <emissivemap_fragment>', `
        #include <emissivemap_fragment>
        vec3 marineView = normalize(vViewPosition);
        float marineRim = pow(1.0 - clamp(dot(normal, marineView), 0.0, 1.0), 3.0);
        // Ambient-water rim is deliberately faint, so silhouettes don't glow.
        totalEmissiveRadiance += diffuseColor.rgb * marineRim * 0.075;
        // Single-pass approximation of light through thin tissue, not full SSS.
        // Use the scene's directional sunlight; no light means no scatter.
        #if NUM_DIR_LIGHTS > 0
          float marineBacklight = pow(max(0.0, dot(-directionalLights[0].direction, marineView)), 3.0);
          totalEmissiveRadiance += diffuseColor.rgb * directionalLights[0].color
            * marineTissue * marineBacklight * (0.35 + marineRim * 0.65) * 0.12;
        #endif
      `);
    }
  };
  material.customProgramCacheKey = () => `ocean-detail-v2-${pattern}-${Boolean(belly)}-${animal}`;
  return material;
}

/** A continuous, smoothly tapered body. Profiles run from the nose (−Z) to the tail. */
export function marineBody(profile, width, height) {
  const key = JSON.stringify([profile, width, height]);
  if (bodyGeometries.has(key)) return bodyGeometries.get(key);
  const curve = new THREE.CatmullRomCurve3(profile.map(([z, radius]) => new THREE.Vector3(radius, z, 0)), false, 'centripetal');
  const points = curve.getPoints(32).map((point) => new THREE.Vector2(Math.max(0.002, point.x), point.y));
  const geometry = new THREE.LatheGeometry(points, 20);
  geometry.rotateX(Math.PI / 2);
  geometry.scale(width, height, 1);
  bodyGeometries.set(key, geometry);
  return geometry;
}

/** A continuous arm, coral branch or curled tail, tapering to a rounded tip. */
export function taperedTube(points, radius, segments = 24, tip = 0.06) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geometry = new THREE.TubeGeometry(curve, segments, radius, 8, false);
  const positions = geometry.attributes.position;
  const centre = new THREE.Vector3();
  for (let ring = 0; ring <= segments; ring++) {
    const t = ring / segments;
    curve.getPointAt(t, centre);
    const taper = tip + (1 - tip) * (1 - t) ** 0.7;
    for (let side = 0; side <= 8; side++) {
      const index = ring * 9 + side;
      positions.setXYZ(index,
        centre.x + (positions.getX(index) - centre.x) * taper,
        centre.y + (positions.getY(index) - centre.y) * taper,
        centre.z + (positions.getZ(index) - centre.z) * taper);
    }
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** Thin sculpted fins catch light along their edges instead of looking like paper. */
export function sculptedFin(shape) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.008, bevelThickness: 0.008, curveSegments: 12 });
  geometry.translate(0, 0, -0.006);
  return geometry;
}
