import * as THREE from "three";
import { holdsClock, lookBackPoint, separationDegrees, zoomFov } from "./paleBlueDotView.js";

const TURN_SECONDS = 3;
// The ring round Earth, as a share of the screen's height.
const RING_SHARE = 0.11;

function makeRingTexture(size = 128) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgba(255, 214, 128, 0.95)";
    ctx.lineWidth = size * 0.05;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

/**
 * The Pale Blue Dot (#47), the tour's last leg. The ship flies out past
 * Neptune to `marker`; then `look()` turns the camera back towards the Sun
 * and zooms in like a telephoto lens until Earth is a tiny dot in a sunbeam,
 * circled by a gold ring, as Voyager 1 saw it in 1990.
 *
 * A module for solarModules.js. While `isActive()` it owns the camera from
 * `look()` on; `end()` puts the field of view back. `hidesScenery()` tells the
 * caller to hide labels, orbit lines and the asteroid belt, which would
 * clutter the zoomed view, and `holdsClock()` to stop the world clock.
 */
export function createPaleBlueDot({ scene, camera, controls, getEarthPosition, defaultFov, reducedMotion = () => false }) {
    const marker = new THREE.Object3D();
    scene.add(marker);
    const texture = makeRingTexture();
    const ring = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }));
    ring.renderOrder = 30;
    ring.visible = false;
    ring.raycast = () => {};
    scene.add(ring);

    const earth = new THREE.Vector3();
    const eye = new THREE.Vector3();
    const aim = new THREE.Vector3();
    const startPosition = new THREE.Vector3();
    const startLook = new THREE.Vector3();
    const look = new THREE.Vector3();
    const cameraUp = new THREE.Vector3();
    let phase = "idle"; // idle → flying → turning → looking
    let age = 0;
    let startFov = defaultFov;
    let onLooking = () => {};

    // Where the camera should be and what it should look at, for Earth where it is now.
    function target() {
        getEarthPosition(earth);
        const point = lookBackPoint(earth);
        eye.set(point.x, point.y, point.z);
        // Halfway between the Sun and Earth, so both are in view.
        aim.copy(earth).multiplyScalar(0.5);
        const fov = zoomFov(separationDegrees(earth, point), camera.aspect);
        // On a tall phone the card covers the bottom, so the view sits higher.
        if (camera.aspect < 1) {
            const height = 2 * eye.distanceTo(aim) * Math.tan(THREE.MathUtils.degToRad(fov / 2));
            cameraUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
            aim.addScaledVector(cameraUp, -height * 0.2);
        }
        return fov;
    }

    function arrive() {
        phase = "looking";
        onLooking();
    }

    return {
        marker,
        isActive: () => phase !== "idle",
        hidesScenery: () => phase === "turning" || phase === "looking",
        holdsClock: () => holdsClock(phase),

        /** Starts the leg: put the marker out where the ship should fly to. */
        begin() {
            phase = "flying";
            target();
            marker.position.copy(eye);
        },

        /** Turns round and zooms in on home; `done` runs when Earth is a dot. */
        look(done = () => {}) {
            onLooking = done;
            phase = "turning";
            age = 0;
            startPosition.copy(camera.position);
            startLook.copy(controls.target);
            startFov = camera.fov;
            if (reducedMotion()) age = TURN_SECONDS;
        },

        end() {
            phase = "idle";
            ring.visible = false;
            camera.fov = defaultFov;
            camera.updateProjectionMatrix();
        },

        update(dt) {
            if (phase === "idle") return;
            const fov = target();
            if (phase === "flying") {
                marker.position.copy(eye);
                return;
            }
            let x = 1;
            if (phase === "turning") {
                age += dt;
                x = Math.min(1, age / TURN_SECONDS);
            }
            const eased = x * x * (3 - 2 * x);
            camera.position.lerpVectors(startPosition, eye, eased);
            look.lerpVectors(startLook, aim, Math.min(1, eased * 1.6));
            // Zoom on a log scale, as a lens does.
            camera.fov = Math.exp(THREE.MathUtils.lerp(Math.log(startFov), Math.log(fov), eased * eased));
            camera.updateProjectionMatrix();
            controls.target.copy(look);
            camera.lookAt(look);

            ring.visible = x > 0.8;
            if (ring.visible) {
                ring.position.copy(earth);
                const height = 2 * camera.position.distanceTo(earth) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
                const pulse = reducedMotion() ? 1 : 1 + 0.08 * Math.sin(performance.now() / 300);
                ring.scale.setScalar(height * RING_SHARE * pulse);
                ring.material.opacity = Math.min(1, (x - 0.8) * 5);
            }
            if (phase === "turning" && x >= 1) arrive();
        },

        dispose() {
            marker.removeFromParent();
            ring.removeFromParent();
            ring.material.dispose();
            texture.dispose();
        },
    };
}
