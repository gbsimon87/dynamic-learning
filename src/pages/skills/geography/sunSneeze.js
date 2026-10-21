import * as THREE from "three";

const LIFE_SECONDS = 1.8;

function makeDotTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.7)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

/**
 * The Sun's sneeze (#24): a burst of glowing sparks sprays off the side of
 * the Sun facing the camera, curls back under the Sun's pull and fades. One
 * pooled `Points`, so sneezing again allocates nothing. A module for
 * solarModules.js; the caller skips `sneeze()` under reduced motion.
 */
export function createSunSneeze({ scene, sun, camera, quality }) {
    const count = quality === "low" ? 90 : 180;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const texture = makeDotTexture();
    const material = new THREE.PointsMaterial({
        size: 2.6,
        map: texture,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.visible = false;
    scene.add(points);

    const centre = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const side = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const pull = new THREE.Vector3();
    const warm = new THREE.Color();
    let age = LIFE_SECONDS;

    return {
        sneeze() {
            sun.getWorldPosition(centre);
            const radius = sun.scale.x;
            toCamera.subVectors(camera.position, centre).normalize();
            // Spray off to one side of the face we can see, so the flare reads as
            // an arc instead of coming straight at the camera.
            side.set(Math.random() - 0.5, Math.random() * 0.6 + 0.2, Math.random() - 0.5)
                .cross(toCamera).normalize();
            for (let i = 0; i < count; i++) {
                dir.copy(side).multiplyScalar(0.9).addScaledVector(toCamera, 0.5);
                dir.x += (Math.random() - 0.5) * 0.5;
                dir.y += (Math.random() - 0.5) * 0.5;
                dir.z += (Math.random() - 0.5) * 0.5;
                dir.normalize();
                positions.set([centre.x + dir.x * radius, centre.y + dir.y * radius, centre.z + dir.z * radius], i * 3);
                const speed = 14 + Math.random() * 16;
                velocities.set([dir.x * speed, dir.y * speed, dir.z * speed], i * 3);
                warm.setHSL(0.03 + Math.random() * 0.09, 1, 0.42 + Math.random() * 0.15);
                colors.set([warm.r, warm.g, warm.b], i * 3);
            }
            geometry.attributes.color.needsUpdate = true;
            age = 0;
            points.visible = true;
        },
        update(dt) {
            if (age >= LIFE_SECONDS) return;
            age += dt;
            if (age >= LIFE_SECONDS) {
                points.visible = false;
                return;
            }
            const drag = Math.exp(-1.4 * dt);
            for (let i = 0; i < count; i++) {
                const k = i * 3;
                pull.set(centre.x - positions[k], centre.y - positions[k + 1], centre.z - positions[k + 2]).normalize();
                velocities[k] = velocities[k] * drag + pull.x * 7 * dt;
                velocities[k + 1] = velocities[k + 1] * drag + pull.y * 7 * dt;
                velocities[k + 2] = velocities[k + 2] * drag + pull.z * 7 * dt;
                positions[k] += velocities[k] * dt;
                positions[k + 1] += velocities[k + 1] * dt;
                positions[k + 2] += velocities[k + 2] * dt;
            }
            geometry.attributes.position.needsUpdate = true;
            material.opacity = 1 - age / LIFE_SECONDS;
        },
        dispose() {
            scene.remove(points);
            geometry.dispose();
            material.dispose();
            texture.dispose();
        },
    };
}
