import * as THREE from "three";
import { cometPose, cometTailPoint } from "./cometOrbit.js";

/** The invisible tap sphere's radius; SolarSystem.jsx grows it with distance. */
export const COMET_HIT_RADIUS = 1.2;

function makeGlow() {
    const size = 32;
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const radius = Math.hypot((x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1);
        const i = (y * size + x) * 4;
        pixels[i] = 160; pixels[i + 1] = 220; pixels[i + 2] = 255;
        pixels[i + 3] = Math.round(Math.max(0, 1 - radius) ** 2 * 230);
    }
    const map = new THREE.DataTexture(pixels, size, size);
    map.colorSpace = THREE.SRGBColorSpace;
    map.needsUpdate = true;
    return map;
}

function makeTail(dust, segments) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array((segments + 1) * 6), 3).setUsage(THREE.DynamicDrawUsage));
    const uvs = [];
    const indices = [];
    for (let i = 0; i <= segments; i++) {
        uvs.push(i / segments, 0, i / segments, 1);
        if (i < segments) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    const material = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(dust ? 0xffd49a : 0x69b8ff) }, uActivity: { value: 1 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; uniform float uActivity; varying vec2 vUv;
            void main(){
                float edge=pow(max(0.0,1.0-abs(vUv.y*2.0-1.0)),2.0);
                float fade=pow(1.0-vUv.x,1.4);
                gl_FragColor=vec4(uColor,edge*fade*uActivity*0.8);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }`,
        transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = dust ? 'comet-dust-tail' : 'comet-ion-tail';
    mesh.raycast = () => {};
    mesh.frustumCulled = false; // Bounds change as the tails turn away from the Sun.
    return mesh;
}

export function createHalleyComet({ scene, getCamera, getOrbitTime, getQuality, isHidden }) {
    const object3d = new THREE.Group();
    object3d.name = 'halleys-comet';
    const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), new THREE.MeshStandardMaterial({ color: 0x727c87, roughness: 1 }));
    nucleus.scale.set(1.3, 0.8, 1);
    nucleus.raycast = () => {};
    object3d.add(nucleus);
    const glowMap = makeGlow();
    const coma = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    coma.scale.setScalar(3);
    coma.raycast = () => {};
    object3d.add(coma);
    const hitTarget = new THREE.Mesh(new THREE.SphereGeometry(COMET_HIT_RADIUS, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
    object3d.add(hitTarget);
    scene.add(object3d);
    let quality;
    let tails = [];
    function resize() {
        const next = getQuality();
        if (next === quality) return;
        quality = next;
        for (const tail of tails) { tail.removeFromParent(); tail.geometry.dispose(); tail.material.dispose(); }
        tails = [false, true].map((dust) => makeTail(dust, quality === 'low' ? 12 : 32));
        tails.forEach((tail) => object3d.add(tail));
    }
    resize();
    const point = new THREE.Vector3();
    const world = new THREE.Vector3();
    const view = new THREE.Vector3();
    const side = new THREE.Vector3();
    const axis = new THREE.Vector3();
    function update(dt, { active } = {}) {
        object3d.visible = !active && !isHidden();
        if (!object3d.visible) return;
        const pose = cometPose(getOrbitTime());
        object3d.position.set(pose.position.x, pose.position.y, pose.position.z);
        coma.material.opacity = 0.25 + pose.activity * 0.75;
        coma.scale.setScalar(1 + pose.activity * 2);
        tails.forEach((tail, index) => {
            const dust = index === 1;
            const positions = tail.geometry.attributes.position;
            const segments = positions.count / 2 - 1;
            tail.material.uniforms.uActivity.value = pose.activity;
            axis.set(pose.away.x, pose.away.y, pose.away.z);
            for (let i = 0; i <= segments; i++) {
                const fraction = i / segments;
                const p = cometTailPoint(pose, fraction, dust);
                point.set(p.x, p.y, p.z);
                world.copy(point).add(object3d.position);
                view.subVectors(getCamera().position, world).normalize();
                side.crossVectors(axis, view);
                if (side.lengthSq() < 1e-8) side.crossVectors(axis, THREE.Object3D.DEFAULT_UP);
                side.normalize();
                const width = (dust ? 1.5 : 0.5) * (0.12 + fraction) * pose.activity;
                positions.setXYZ(i * 2, point.x - side.x * width, point.y - side.y * width, point.z - side.z * width);
                positions.setXYZ(i * 2 + 1, point.x + side.x * width, point.y + side.y * width, point.z + side.z * width);
            }
            positions.needsUpdate = true;
        });
    }
    return {
        object3d, hitTarget, update, resize,
        dispose() {
            object3d.removeFromParent();
            object3d.traverse((object) => { object.geometry?.dispose(); object.material?.dispose(); });
            glowMap.dispose();
        },
    };
}
