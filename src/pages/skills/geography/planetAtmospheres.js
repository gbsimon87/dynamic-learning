import * as THREE from "three";

// Halo colour, halo thickness (shell radius ÷ planet radius) and strength.
const ATMOSPHERES = {
    Earth: { color: 0x5fa8ff, shell: 1.12, strength: 1.0 },
    Venus: { color: 0xffd98a, shell: 1.14, strength: 0.9 },
    Mars: { color: 0xffa08a, shell: 1.08, strength: 0.9 },
};
const CLOUD_SHELL = 1.012;
// Clouds turn a little faster than the ground, so they drift across it.
const CLOUD_DRIFT = 0.04;

const vertexShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vToCamera;
    varying vec3 vToSun;
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(mat3(modelMatrix) * normal);
        vToCamera = cameraPosition - world.xyz;
        // The Sun sits at the origin.
        vToSun = -world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
    }
`;

// Back faces of a slightly larger shell: brightest at the planet's edge,
// fading to nothing at the shell's edge. Front faces add a thin haze over the
// planet's rim. Both are dimmer on the night side.
const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uStrength;
    uniform float uEdge;
    uniform bool uHalo;
    varying vec3 vNormal;
    varying vec3 vToCamera;
    varying vec3 vToSun;
    void main() {
        vec3 n = normalize(vNormal);
        vec3 v = normalize(vToCamera);
        float facing = dot(n, v);
        float glow = uHalo
            ? pow(clamp(-facing / uEdge, 0.0, 1.0), 3.0)
            : pow(1.0 - clamp(facing, 0.0, 1.0), 4.0) * 0.6;
        float daylight = 0.08 + 0.92 * smoothstep(-0.3, 0.4, dot(n, normalize(vToSun)));
        gl_FragColor = vec4(uColor * glow * daylight * uStrength, 1.0);
    }
`;

function makeShell(geometry, { color, shell, strength }, halo) {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color(color) },
            uStrength: { value: strength },
            // How far round the back of the shell the planet's edge sits.
            uEdge: { value: Math.sqrt(1 - 1 / (shell * shell)) },
            uHalo: { value: halo },
        },
        vertexShader,
        fragmentShader,
        side: halo ? THREE.BackSide : THREE.FrontSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(halo ? shell : 1.004);
    mesh.raycast = () => {};
    return mesh;
}

/**
 * Earth's drifting clouds (#11) and the glow round Earth, Venus and Mars
 * (#12). Everything is a child of the planet's body, so it tilts, spins,
 * bounces and hides with the planet (the meteor hides Earth when it breaks).
 * Children never affect `body.scale`, which the meteor checks.
 *
 * A module for solarModules.js. `bodies` maps planet names to body meshes;
 * `getSpinTime` is the world's spin clock, so clouds stop with ⏸.
 */
export function createPlanetAtmospheres({ bodies, cloudTexture, getSpinTime }) {
    const geometry = new THREE.SphereGeometry(1, 48, 32);
    const disposables = [geometry];
    const added = [];

    for (const [name, settings] of Object.entries(ATMOSPHERES)) {
        const body = bodies[name];
        if (!body) continue;
        for (const halo of [true, false]) {
            const shell = makeShell(geometry, settings, halo);
            body.add(shell);
            added.push(shell);
            disposables.push(shell.material);
        }
    }

    let clouds = null;
    if (bodies.Earth && cloudTexture) {
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            alphaMap: cloudTexture,
            transparent: true,
            depthWrite: false,
            roughness: 1,
            metalness: 0,
        });
        clouds = new THREE.Mesh(geometry, material);
        clouds.scale.setScalar(CLOUD_SHELL);
        clouds.raycast = () => {};
        bodies.Earth.add(clouds);
        added.push(clouds);
        disposables.push(material, cloudTexture);
    }

    return {
        update() {
            if (clouds) clouds.rotation.y = getSpinTime() * CLOUD_DRIFT;
        },
        dispose() {
            for (const mesh of added) mesh.removeFromParent();
            for (const item of disposables) item.dispose();
        },
    };
}
