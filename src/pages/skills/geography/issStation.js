import * as THREE from "three";
import { issPosition, issDirection } from "./issOrbit.js";

// Earth's radius is 0.45; the clouds and glow end at 1.12×. The station circles
// just outside that.
const EARTH_RADIUS = 0.45;
const ORBIT_RADIUS = EARTH_RADIUS * 1.45;
// Wingspan is exaggerated about 100× so it reads from the follow camera.
const TRUSS_LENGTH = 0.14;
const HIT_RADIUS = 0.12;

// Deep blue panel with a faint gold grid.
function makePanelTexture() {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#16347a";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#d9b45a";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, size, size);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

/**
 * The International Space Station (#50), built from boxes and cylinders, no
 * asset files. It circles Earth and is a child of Earth's `root`, not its
 * `body`, so it does not spin with the ground and never touches `body.scale`
 * (which the meteor checks).
 *
 * A module for solarModules.js. `getOrbitTime` is the world's orbit clock, so
 * the station stops with the Stop speed. Only `hitTarget` (a generous invisible
 * sphere) can be hit by a raycaster; every visible part ignores rays.
 * `update(dt, { active })` hides the station while the meteor experiment runs.
 */
export function createIss({ earthRoot, getOrbitTime, quality }) {
    const low = quality === "low";
    const radial = low ? 8 : 16;
    const disposables = [];
    const track = (item) => {
        disposables.push(item);
        return item;
    };

    const object3d = new THREE.Group();
    // Inner group is the model; the outer one is only moved.
    const model = new THREE.Group();
    object3d.add(model);

    const addPart = (geometry, material, x, y, z) => {
        const mesh = new THREE.Mesh(track(geometry), material);
        mesh.position.set(x, y, z);
        mesh.raycast = () => {};
        model.add(mesh);
        return mesh;
    };

    const white = track(new THREE.MeshStandardMaterial({
        color: 0xf2f2f2, emissive: 0x555555, roughness: 0.5, metalness: 0.3,
    }));
    const grey = track(new THREE.MeshStandardMaterial({
        color: 0xb8bcc4, emissive: 0x3a3c40, roughness: 0.6, metalness: 0.4,
    }));
    const panelMap = low ? null : track(makePanelTexture());
    const blue = track(new THREE.MeshStandardMaterial({
        color: low ? 0x1c3f94 : 0xffffff,
        map: panelMap,
        emissive: 0x0a1f4a,
        roughness: 0.4,
        metalness: 0.5,
    }));

    // Truss along local X, the way the station travels.
    addPart(new THREE.BoxGeometry(TRUSS_LENGTH, 0.006, 0.006), grey, 0, 0, 0);

    // Pressurised modules along local Z, crossing the truss in the middle.
    const moduleLength = 0.028;
    for (const z of [-0.03, 0, 0.03]) {
        const m = addPart(new THREE.CylinderGeometry(0.0085, 0.0085, moduleLength, radial), white, 0, 0, z);
        m.rotation.x = Math.PI / 2;
    }
    addPart(new THREE.CylinderGeometry(0.006, 0.006, 0.026, radial), white, 0, 0, 0)
        .rotation.z = Math.PI / 2;

    // Four pairs of wings, two at each end of the truss: a panel either side.
    for (const x of [-0.062, -0.04, 0.04, 0.062]) {
        for (const side of [-1, 1]) {
            addPart(new THREE.BoxGeometry(0.02, 0.0015, 0.058), blue, x, 0, side * 0.04);
        }
    }

    // A couple of white radiator panels on the truss, standing up from it.
    for (const x of [-0.016, 0.016]) {
        addPart(new THREE.BoxGeometry(0.014, 0.03, 0.0015), white, x, 0.018, 0);
    }

    // The tap target: invisible, but a material with visible: false still raycasts.
    const hitTarget = new THREE.Mesh(
        track(new THREE.SphereGeometry(HIT_RADIUS, 12, 8)),
        track(new THREE.MeshBasicMaterial({ visible: false })),
    );
    object3d.add(hitTarget);

    earthRoot.add(object3d);

    // Scratch objects, reused every frame.
    const xAxis = new THREE.Vector3();
    const yAxis = new THREE.Vector3();
    const zAxis = new THREE.Vector3();
    const basis = new THREE.Matrix4();

    return {
        object3d,
        hitTarget,
        update(dt, { active } = {}) {
            object3d.visible = !active;
            if (active) return;
            const time = getOrbitTime();
            const p = issPosition(time, ORBIT_RADIUS);
            object3d.position.set(p.x, p.y, p.z);

            // Truss along the direction of travel; panels face the Sun (the
            // origin, so it lies opposite Earth's own position).
            const d = issDirection(time);
            xAxis.set(d.x, d.y, d.z);
            yAxis.copy(earthRoot.position).negate();
            yAxis.addScaledVector(xAxis, -yAxis.dot(xAxis));
            if (yAxis.lengthSq() < 1e-8) yAxis.set(0, 1, 0);
            yAxis.normalize();
            zAxis.crossVectors(xAxis, yAxis);
            basis.makeBasis(xAxis, yAxis, zAxis);
            model.quaternion.setFromRotationMatrix(basis);
        },
        dispose() {
            object3d.removeFromParent();
            for (const item of disposables) item.dispose();
        },
    };
}
