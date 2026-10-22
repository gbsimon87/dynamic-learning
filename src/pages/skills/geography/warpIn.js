import * as THREE from "three";
import { warpFrame } from "./warpTimeline.js";

const FAR_Z = -1600;
const NEAR_Z = -8;
const TOP_SPEED = 2400; // units a second at full warp
const STRETCH = 0.07; // streak length per unit of speed
const START_DISTANCE = 6; // the swoop starts this many times further out

/**
 * The warp-in arrival (#1): the page opens at warp speed, with streaks of
 * light rushing past, then the camera swoops in from deep space to the
 * overview. The streaks are one pooled `LineSegments` parented to the camera.
 * The caller checks `shouldPlayWarp` first, and calls `skip()` whenever the
 * child does anything (tap, drag, search, tour, meteor), so the warp never
 * fights them for the camera.
 *
 * A module for solarModules.js; it runs after OrbitControls each frame, so
 * while it is active it owns `camera.position`.
 */
export function createWarpIn({ camera, endPosition, target, quality, onDone = () => {} }) {
    const count = quality === "low" ? 160 : 320;
    const xy = new Float32Array(count * 2);
    const z = new Float32Array(count);
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
        // A tunnel round the view axis, clear of the middle of the screen.
        const angle = Math.random() * Math.PI * 2;
        const radius = 18 + Math.random() * 110;
        xy[i * 2] = Math.cos(angle) * radius;
        xy[i * 2 + 1] = Math.sin(angle) * radius;
        z[i] = FAR_Z + Math.random() * (NEAR_Z - FAR_Z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
        color: 0xcfe2ff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const streaks = new THREE.LineSegments(geometry, material);
    streaks.frustumCulled = false;
    streaks.renderOrder = 998;
    camera.add(streaks);

    const end = endPosition.clone();
    const start = end.clone().sub(target).multiplyScalar(START_DISTANCE).add(target);
    // Swing in from one side, so it reads as a swoop rather than a zoom.
    const side = new THREE.Vector3().crossVectors(end.clone().sub(target), camera.up).setLength(end.distanceTo(target) * 1.5);
    let age = 0;
    let active = true;
    camera.position.copy(start);
    camera.lookAt(target);

    function finish() {
        if (!active) return;
        active = false;
        streaks.visible = false;
        camera.position.copy(end);
        camera.lookAt(target);
        onDone();
    }

    return {
        isActive: () => active,
        skip: finish,
        update(dt) {
            if (!active) return;
            age += dt;
            const frame = warpFrame(age);
            if (frame.done) {
                finish();
                return;
            }
            const speed = TOP_SPEED * frame.speed;
            const length = Math.max(1, speed * STRETCH);
            for (let i = 0; i < count; i++) {
                z[i] += speed * dt;
                if (z[i] > NEAR_Z) z[i] -= NEAR_Z - FAR_Z;
                const k = i * 6;
                positions[k] = positions[k + 3] = xy[i * 2];
                positions[k + 1] = positions[k + 4] = xy[i * 2 + 1];
                positions[k + 2] = z[i];
                positions[k + 5] = z[i] - length;
            }
            geometry.attributes.position.needsUpdate = true;
            material.opacity = frame.streaks;
            streaks.visible = frame.streaks > 0;

            camera.position.lerpVectors(start, end, frame.camera)
                .addScaledVector(side, Math.sin(Math.PI * frame.camera) * (1 - frame.camera));
            camera.lookAt(target);
        },
        dispose() {
            camera.remove(streaks);
            geometry.dispose();
            material.dispose();
        },
    };
}
