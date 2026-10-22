import * as THREE from "three";

// Teaching model: enlarged curtains around both poles, not a live forecast.
// Background: https://science.nasa.gov/sun/auroras/
export const AURORA_LINE = "These glowing curtains are auroras. Energy and tiny particles from the Sun help make gases high above Earth glow. Earth's magnetic field guides charged particles towards the polar regions. Oxygen can glow green, and nitrogen can glow pink. We call them northern lights in the north and southern lights in the south. Our model makes the lights bigger so you can see them. Real auroras are not always visible.";

export function createAuroraGeometry(hemisphere, quality) {
    const segments = quality === 'low' ? 32 : 96;
    const rows = quality === 'low' ? 3 : 6;
    const positions = [];
    const uvs = [];
    const indices = [];
    for (let row = 0; row <= rows; row++) {
        const v = row / rows;
        for (let col = 0; col <= segments; col++) {
            const u = col / segments;
            const angle = u * Math.PI * 2;
            const latitude = THREE.MathUtils.degToRad(67 + 2 * Math.sin(angle * 3) + Math.sin(angle * 7));
            const radius = 1.025 + v * 0.16;
            positions.push(radius * Math.cos(latitude) * Math.cos(angle), hemisphere * radius * Math.sin(latitude), radius * Math.cos(latitude) * Math.sin(angle));
            uvs.push(u, v);
            if (row < rows && col < segments) {
                const a = row * (segments + 1) + col;
                const b = a + segments + 1;
                indices.push(a, b, a + 1, b, b + 1, a + 1);
            }
        }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    return geometry;
}

const vertexShader = /* glsl */ `
    varying vec2 vAuroraUv;
    varying vec3 vAuroraWorld;
    void main() {
        vAuroraUv = uv;
        vec4 world = modelMatrix * vec4(position, 1.0);
        vAuroraWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
    }
`;
const fragmentShader = /* glsl */ `
    uniform float uTime;
    uniform vec3 uEarthPosition;
    varying vec2 vAuroraUv;
    varying vec3 vAuroraWorld;
    void main() {
        float angle = vAuroraUv.x * 6.28318530718;
        float height = vAuroraUv.y;
        float fold = sin(angle * 18.0 + sin(angle * 5.0 + uTime * 0.28) * 1.5 + uTime * 0.18);
        float threads = 0.35 + 0.65 * pow(0.5 + 0.5 * fold, 2.0);
        float top = 0.68 + 0.22 * sin(angle * 4.0 - uTime * 0.22);
        float edge = smoothstep(0.0, 0.12, height) * (1.0 - smoothstep(top - 0.3, top, height));
        vec3 radial = normalize(vAuroraWorld - uEarthPosition);
        float sunlight = dot(radial, normalize(-vAuroraWorld));
        float night = 1.0 - smoothstep(-0.2, 0.3, sunlight);
        // Pink nitrogen fringe lies below the green oxygen curtain.
        vec3 color = mix(vec3(1.0, 0.01, 0.25), vec3(0.015, 1.0, 0.10), smoothstep(0.08, 0.3, height));
        gl_FragColor = vec4(color, edge * threads * mix(0.06, 0.85, night));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`;

/** Two small child meshes follow Earth's tilt, spin, bounce and visibility.
 * Shader-only drift, with no new textures, particles or render passes.
 */
export function createEarthAurora({ earthBody, getTime, reducedMotion, getQuality }) {
    let quality = getQuality();
    const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uEarthPosition: { value: new THREE.Vector3() } },
        vertexShader, fragmentShader,
        transparent: true, depthWrite: false, side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    });
    const curtains = [1, -1].map((hemisphere) => {
        const mesh = new THREE.Mesh(createAuroraGeometry(hemisphere, quality), material);
        mesh.name = hemisphere === 1 ? 'northern-aurora' : 'southern-aurora';
        mesh.raycast = () => {};
        earthBody.add(mesh);
        return mesh;
    });
    return {
        update() {
            material.uniforms.uTime.value = reducedMotion() ? 0 : getTime();
            earthBody.getWorldPosition(material.uniforms.uEarthPosition.value);
        },
        resize() {
            const nextQuality = getQuality();
            if (quality === nextQuality) return;
            quality = nextQuality;
            curtains.forEach((mesh, i) => {
                mesh.geometry.dispose();
                mesh.geometry = createAuroraGeometry(i === 0 ? 1 : -1, quality);
            });
        },
        dispose() {
            curtains.forEach((mesh) => { mesh.removeFromParent(); mesh.geometry.dispose(); });
            material.dispose();
        },
    };
}
