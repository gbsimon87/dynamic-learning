import * as THREE from "three";
import { warpFrame } from "./warpTimeline.js";
import { createWarpStreaks } from "./warpStreaks.js";

const START_DISTANCE = 6; // the swoop starts this many times further out

/**
 * The warp-in arrival (#1): the page opens at warp speed, with streaks of
 * light rushing past, then the camera swoops in from deep space to the
 * overview. The streaks come from warpStreaks.js, shared with planet flights.
 * The caller checks `shouldPlayWarp` first, and calls `skip()` whenever the
 * child does anything (tap, drag, search, tour, meteor), so the warp never
 * fights them for the camera.
 *
 * A module for solarModules.js; it runs after OrbitControls each frame, so
 * while it is active it owns `camera.position`.
 */
export function createWarpIn({ camera, endPosition, target, quality, onDone = () => {} }) {
    const streaks = createWarpStreaks({ camera, quality });

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
        streaks.hide();
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
            streaks.update(dt, { speed: frame.speed, brightness: frame.streaks });

            camera.position.lerpVectors(start, end, frame.camera)
                .addScaledVector(side, Math.sin(Math.PI * frame.camera) * (1 - frame.camera));
            camera.lookAt(target);
        },
        dispose() {
            streaks.dispose();
        },
    };
}
