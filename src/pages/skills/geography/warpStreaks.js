import * as THREE from "three";

const FAR_Z = -1600;
const NEAR_Z = -8;
const TOP_SPEED = 2400; // units a second at full warp
const STRETCH = 0.07; // streak length per unit of speed

/**
 * Streaks of light rushing past the camera, as at warp speed: one pooled
 * `LineSegments` parented to the camera. The warp-in arrival (#1) and every
 * ship flight to a planet drive it, each with its own `speed` and
 * `brightness` (both 0..1) every frame.
 */
export function createWarpStreaks({ camera, quality }) {
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
    streaks.visible = false;
    camera.add(streaks);

    return {
        update(dt, { speed, brightness }) {
            streaks.visible = brightness > 0;
            if (!streaks.visible) return;
            const units = TOP_SPEED * speed;
            const length = Math.max(1, units * STRETCH);
            for (let i = 0; i < count; i++) {
                z[i] += units * dt;
                if (z[i] > NEAR_Z) z[i] -= NEAR_Z - FAR_Z;
                const k = i * 6;
                positions[k] = positions[k + 3] = xy[i * 2];
                positions[k + 1] = positions[k + 4] = xy[i * 2 + 1];
                positions[k + 2] = z[i];
                positions[k + 5] = z[i] - length;
            }
            geometry.attributes.position.needsUpdate = true;
            material.opacity = brightness;
        },
        hide() {
            streaks.visible = false;
        },
        dispose() {
            camera.remove(streaks);
            geometry.dispose();
            material.dispose();
        },
    };
}
