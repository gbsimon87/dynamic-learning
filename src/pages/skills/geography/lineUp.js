import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { framingFor, framingForAll, lineUpLayout } from "./lineUpLayout.js";

const FOV = 50;
// The camera starts on the chosen planet, waits, then pulls back to show them all.
const PULL_BACK_DELAY = 0.9;
const PULL_BACK_SECONDS = 2.8;
// The camera looks at the row level with it, so Saturn's rings are tipped
// towards it, or they'd be seen edge-on and vanish.
const RING_TIP = THREE.MathUtils.degToRad(24);
const SATURN_TILT = THREE.MathUtils.degToRad(15);

/**
 * The line-up by size (#62): the eight planets and Pluto side by side at
 * their true sizes, with the edge of a giant Sun behind them. It is its own
 * small scene with its own camera, drawn instead of the Solar System while
 * it's open, so nothing in the real scene has to move. Drag slides along the
 * row; pinch or scroll zooms.
 *
 * A module for solarModules.js. Built on first `open`, using the real
 * planets' materials. `getSky` returns the real scene, so the line-up has the
 * same sky behind it.
 */
export function createLineUp({ renderer, getSky, names, materialFor, sunMaterial, makeRings, makeLabel, reducedMotion = () => false }) {
    const layout = lineUpLayout(names);
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 2000);
    let scene = null;
    let controls = null;
    let active = false;
    let glide = null; // { age, from, to } while pulling back
    const bodies = [];
    let labels = [];
    const disposables = [];

    function build() {
        scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 0.45));
        // Lit from the front and a little from the Sun's side.
        const light = new THREE.DirectionalLight(0xffffff, 2.2);
        light.position.set(-40, 25, 60);
        scene.add(light);

        const planetGeometry = new THREE.SphereGeometry(1, 64, 40);
        const sunGeometry = new THREE.SphereGeometry(1, 128, 64);
        disposables.push(planetGeometry, sunGeometry);

        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.scale.setScalar(layout.sun.radius);
        sun.position.x = layout.sun.x;
        scene.add(sun);

        for (const body of layout.bodies) {
            const group = new THREE.Group();
            group.position.x = body.x;
            const mesh = new THREE.Mesh(planetGeometry, materialFor(body.name));
            mesh.scale.setScalar(body.radius);
            group.add(mesh);
            if (body.name === "Saturn") {
                const rings = makeRings(body.radius);
                // createSaturnRings lays them flat (rotation.x = 90°).
                rings.rotation.x -= RING_TIP;
                rings.rotation.y = SATURN_TILT;
                group.add(rings);
                rings.traverse((child) => {
                    if (child.geometry) disposables.push(child.geometry);
                    if (child.material) disposables.push(child.material);
                });
            }
            scene.add(group);
            bodies.push({ ...body, mesh });
        }

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableRotate = false;
        controls.screenSpacePanning = true;
        controls.enableDamping = true;
        controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
        controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
        controls.minDistance = 3;
        controls.enabled = false;
        // The child takes over: stop pulling back.
        controls.addEventListener("start", () => { glide = null; });
    }

    function place({ x, distance }) {
        camera.position.set(x, 0, distance);
        controls.target.set(x, 0, 0);
        camera.lookAt(controls.target);
    }

    function setLabels(selected) {
        for (const label of labels) {
            label.removeFromParent();
            label.material.map?.dispose();
            label.material.dispose();
        }
        labels = bodies.map((body) => {
            const label = makeLabel(body.name, body.name === selected ? "#ffd27f" : "#ffffff");
            label.userData.baseScale = label.scale.clone();
            label.userData.radius = body.radius;
            // Room before it would run into a neighbour's label.
            const neighbours = bodies.filter((other) => other !== body).map((other) => Math.abs(other.x - body.x));
            label.userData.room = Math.min(...neighbours);
            label.position.x = body.x;
            scene.add(label);
            return label;
        });
    }

    return {
        isActive: () => active,

        /** Opens the line-up framed on `name`, then pulls back to show them all. */
        open(name) {
            if (!scene) build();
            setLabels(name);
            const body = bodies.find((item) => item.name === name) ?? bodies[2];
            const { clientWidth, clientHeight } = renderer.domElement;
            if (clientWidth > 0 && clientHeight > 0) this.resize({ width: clientWidth, height: clientHeight });
            const all = framingForAll(layout, camera.aspect, FOV);
            controls.maxDistance = all.distance * 1.4;
            // Pulling back from the planet to the whole row is the "whoa": Earth
            // turns into a dot beside Jupiter. Under reduced motion it starts there.
            if (reducedMotion()) place(all);
            else {
                place(framingFor(body, camera.aspect, FOV));
                glide = { age: 0, from: framingFor(body, camera.aspect, FOV), to: all };
            }
            active = true;
            controls.enabled = true;
        },

        close() {
            active = false;
            glide = null;
            if (controls) controls.enabled = false;
        },

        render() {
            const sky = getSky();
            scene.background = sky.background;
            scene.backgroundIntensity = sky.backgroundIntensity;
            scene.backgroundRotation.copy(sky.backgroundRotation);
            renderer.render(scene, camera);
        },

        update(dt) {
            if (!active) return;
            if (glide) {
                glide.age += dt;
                const x = THREE.MathUtils.clamp((glide.age - PULL_BACK_DELAY) / PULL_BACK_SECONDS, 0, 1);
                const eased = x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
                place({
                    x: THREE.MathUtils.lerp(glide.from.x, glide.to.x, eased),
                    // Pull back on a log scale, so it doesn't rush the first part.
                    distance: Math.exp(THREE.MathUtils.lerp(Math.log(glide.from.distance), Math.log(glide.to.distance), eased)),
                });
                if (x >= 1) glide = null;
            }
            if (!reducedMotion()) for (const body of bodies) body.mesh.rotation.y += dt * 0.15;
            controls.update();
            // Labels stay the same size on screen. One that would run into its
            // neighbour's hides until the child zooms in.
            const labelScale = (camera.position.z - controls.target.z) * 0.015;
            for (const label of labels) {
                label.scale.copy(label.userData.baseScale).multiplyScalar(labelScale);
                label.position.y = -(label.userData.radius + label.scale.y * 0.8);
                label.visible = label.scale.x < label.userData.room * 0.95;
            }
            // Keep the row in view: no sliding off into empty space.
            const { target } = controls;
            const clampedX = THREE.MathUtils.clamp(target.x, layout.left - 6, layout.right + 4);
            const clampedY = THREE.MathUtils.clamp(target.y, -15, 15);
            if (clampedX !== target.x || clampedY !== target.y) {
                camera.position.x += clampedX - target.x;
                camera.position.y += clampedY - target.y;
                target.set(clampedX, clampedY, 0);
            }
        },

        resize({ width, height }) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        },

        dispose() {
            controls?.dispose();
            for (const label of labels) {
                label.material.map?.dispose();
                label.material.dispose();
            }
            for (const item of disposables) item.dispose();
        },
    };
}
