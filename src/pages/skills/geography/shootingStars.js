import * as THREE from "three";
import { nextDelay, streakProgress, streakFade, isNearScreenPoint } from "./shootingStarTiming.js";

const TAP_RADIUS_PX = 44;
const TAIL_POINTS = 32;
const TAIL_SPACING = 0.01; // progress along the arc between tail points
const SPARKLE_SECONDS = 0.9;
const SPARKLE_RADIUS_PX = 80;

function makeDotTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function makePoints(count, size, texture) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
        size,
        sizeAttenuation: false, // pixels, so it stays a generous size 2000 units away
        map: texture,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.renderOrder = 999;
    points.visible = false;
    return { points, geometry, material, positions, colors };
}

/**
 * Shooting stars (#8), as a module for solarModules.js. Every 20-40 s one
 * streak (a pooled `Points` tail) crosses the part of the sky the camera is
 * looking at. `tryTap` returns true when a tap lands within 44 px of its head;
 * the star then bursts into a pooled sparkle and the caller shows WISH_LINE.
 * Nothing is allocated per frame. `reducedMotion` is a function returning a
 * boolean; under it, and during the meteor experiment, no streak appears.
 */
export function createShootingStars({ scene, camera, quality, reducedMotion = () => false }) {
    const low = quality === "low";
    // Slower than a real one, so a child has time to tap it.
    const duration = 1.6;
    const texture = makeDotTexture();
    const tail = makePoints(TAIL_POINTS, 16, texture);
    const sparkleCount = low ? 24 : 40;
    const sparkle = makePoints(sparkleCount, 11, texture);
    scene.add(tail.points, sparkle.points);

    const sparkleDirs = new Float32Array(sparkleCount * 2); // unit screen direction
    const sparkleSpeeds = new Float32Array(sparkleCount);
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    const head = new THREE.Vector3();
    const fwd = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const ndc = new THREE.Vector3();
    const centre = new THREE.Vector3();
    const sparkleRight = new THREE.Vector3();
    const sparkleUp = new THREE.Vector3();

    let wait = 6 + Math.random() * 4; // the first one comes soon
    let age = -1; // < 0: no live streak
    let sparkleAge = SPARKLE_SECONDS; // >= SPARKLE_SECONDS: no sparkle
    let sparklePx = 0; // world units per screen pixel at the sparkle

    // A point `dist` units out along a direction inside the current view.
    function viewPoint(out, ox, oy, dist, tanH, tanV) {
        dir.copy(fwd).addScaledVector(right, ox * tanH).addScaledVector(up, oy * tanV).normalize();
        out.copy(camera.position).addScaledVector(dir, dist);
    }

    function spawn() {
        camera.getWorldDirection(fwd);
        right.crossVectors(fwd, camera.up).normalize();
        up.crossVectors(right, fwd).normalize();
        const dist = Math.min(2000, (camera.far || 2500) * 0.8);
        const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
        const tanH = tanV * (camera.aspect || 1);
        const side = Math.random() < 0.5 ? -1 : 1;
        const oy = 0.2 + Math.random() * 0.4;
        const drop = 0.2 + Math.random() * 0.3;
        viewPoint(start, side * (0.25 + Math.random() * 0.35), oy, dist, tanH, tanV);
        viewPoint(end, -side * (0.25 + Math.random() * 0.35), Math.max(-0.6, oy - drop), dist, tanH, tanV);
        age = 0;
    }

    function endStreak() {
        age = -1;
        tail.points.visible = false;
        wait = nextDelay();
    }

    function drawTail(progress, fade) {
        for (let i = 0; i < TAIL_POINTS; i++) {
            const p = Math.max(0, progress - i * TAIL_SPACING);
            head.lerpVectors(start, end, p);
            tail.positions[i * 3] = head.x;
            tail.positions[i * 3 + 1] = head.y;
            tail.positions[i * 3 + 2] = head.z;
            const k = fade * (1 - i / TAIL_POINTS) ** 1.5;
            // warm white: the red and green channels lead the blue
            tail.colors[i * 3] = k;
            tail.colors[i * 3 + 1] = k * 0.92;
            tail.colors[i * 3 + 2] = k * 0.75;
        }
        tail.geometry.attributes.position.needsUpdate = true;
        tail.geometry.attributes.color.needsUpdate = true;
    }

    function headAt(out) {
        return out.lerpVectors(start, end, streakProgress(age, duration));
    }

    function startSparkle(at, rectHeight) {
        centre.copy(at);
        camera.getWorldDirection(fwd);
        sparkleRight.crossVectors(fwd, camera.up).normalize();
        sparkleUp.crossVectors(sparkleRight, fwd).normalize();
        const distance = centre.distanceTo(camera.position);
        sparklePx = (2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / Math.max(1, rectHeight);
        for (let i = 0; i < sparkleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            sparkleDirs[i * 2] = Math.cos(angle);
            sparkleDirs[i * 2 + 1] = Math.sin(angle);
            sparkleSpeeds[i] = 0.35 + Math.random() * 0.65;
        }
        sparkleAge = 0;
        sparkle.points.visible = true;
        updateSparkle(0);
    }

    function updateSparkle(dt) {
        sparkleAge += dt;
        if (sparkleAge >= SPARKLE_SECONDS) {
            sparkle.points.visible = false;
            return;
        }
        const x = sparkleAge / SPARKLE_SECONDS;
        const spread = (1 - (1 - x) * (1 - x)) * SPARKLE_RADIUS_PX * sparklePx; // ease-out
        const fade = (1 - x) * (1 - x);
        for (let i = 0; i < sparkleCount; i++) {
            const r = spread * sparkleSpeeds[i];
            const dx = sparkleDirs[i * 2] * r;
            const dy = sparkleDirs[i * 2 + 1] * r;
            sparkle.positions[i * 3] = centre.x + sparkleRight.x * dx + sparkleUp.x * dy;
            sparkle.positions[i * 3 + 1] = centre.y + sparkleRight.y * dx + sparkleUp.y * dy;
            sparkle.positions[i * 3 + 2] = centre.z + sparkleRight.z * dx + sparkleUp.z * dy;
            // twinkle: each point flickers on its own beat
            const twinkle = 0.6 + 0.4 * Math.sin(sparkleAge * 30 + i * 2.1);
            sparkle.colors[i * 3] = fade * twinkle;
            // golden, so the burst reads as sparks rather than smoke
            sparkle.colors[i * 3 + 1] = fade * twinkle * 0.82;
            sparkle.colors[i * 3 + 2] = fade * twinkle * 0.35;
        }
        sparkle.geometry.attributes.position.needsUpdate = true;
        sparkle.geometry.attributes.color.needsUpdate = true;
    }

    return {
        update(dt, { active = false } = {}) {
            if (sparkleAge < SPARKLE_SECONDS) updateSparkle(dt);
            if (active || reducedMotion()) {
                if (age >= 0) {
                    age = -1;
                    tail.points.visible = false;
                }
                return;
            }
            if (age < 0) {
                wait -= dt;
                if (wait <= 0) spawn();
                else return;
            } else {
                age += dt;
            }
            if (age >= duration) {
                endStreak();
                return;
            }
            drawTail(streakProgress(age, duration), streakFade(age, duration));
            tail.points.visible = true;
        },
        tryTap(clientX, clientY, rect) {
            if (age < 0) return false;
            headAt(head);
            ndc.copy(head).project(camera);
            if (ndc.z > 1) return false; // behind the camera
            const sx = rect.left + ((ndc.x + 1) / 2) * rect.width;
            const sy = rect.top + ((1 - ndc.y) / 2) * rect.height;
            if (!isNearScreenPoint(clientX, clientY, sx, sy, TAP_RADIUS_PX)) return false;
            startSparkle(head, rect.height);
            endStreak();
            return true;
        },
        dispose() {
            scene.remove(tail.points, sparkle.points);
            for (const part of [tail, sparkle]) {
                part.geometry.dispose();
                part.material.dispose();
            }
            texture.dispose();
        },
    };
}
