import * as THREE from 'three';

/** A small, baked underwater light field for glass, wet skin and painted metal. */
export function createOceanLighting(renderer) {
  const sky = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(30, 24, 16);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      deep: { value: new THREE.Color('#173f4b') },
      daylight: { value: new THREE.Color('#b9deda') },
      sun: { value: new THREE.Color('#f0e8d3') },
    },
    vertexShader: `varying vec3 vDirection;
      void main() { vDirection = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 deep; uniform vec3 daylight; uniform vec3 sun; varying vec3 vDirection;
      void main() {
        vec3 direction = normalize(vDirection);
        float height = smoothstep(-0.55, 1.0, direction.y);
        float disc = pow(max(dot(direction, normalize(vec3(-0.4, 0.85, -0.3))), 0.0), 64.0);
        gl_FragColor = vec4(mix(deep, daylight, height) + sun * disc * 2.0, 1.0);
      }`,
  });
  sky.add(new THREE.Mesh(geometry, material));
  const generator = new THREE.PMREMGenerator(renderer);
  try {
    return generator.fromScene(sky, 0.045, 0.1, 60, { size: 128 });
  } finally {
    generator.dispose();
    geometry.dispose();
    material.dispose();
  }
}
