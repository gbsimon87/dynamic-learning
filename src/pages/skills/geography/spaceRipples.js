import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { destinationById } from "./beyondDestinations.js";
import { compileScene } from "./compileScene.js";
import { MAX_RIPPLES, RIPPLE_PACKET, WAVELENGTH, createRipplePool, isTap, mergeFrame } from "./rippleTimeline.js";

export const GRID_LINES = { standard: 96, low: 48 };
const GRID_HALF = 60;
const FOV = 50;
const PAIR_SPREAD = 12; // apart at separation 1, as in beyondDestinations.js
const WAIT_SPIN = 0.6; // radians a second while waiting for the child
const RING_SPEED = 14;
const TAP_AMPLITUDE = 0.7;
const WELL_DEPTH = 3.2;
const WELL_WIDTH = 4.5;
const PORTRAIT_ASPECT = 0.8;
const PORTRAIT_LIFT = 0.2; // share of the screen height the view moves up
const GRID_COLOR = 0x6fd8ff;
const HALO_COLOR = 0xffa040;

const gridVertex = `
#define RIPPLES ${MAX_RIPPLES}
#define PACKET ${RIPPLE_PACKET.toFixed(1)}
#define WAVELENGTH ${WAVELENGTH.toFixed(1)}
#define GRID_HALF ${GRID_HALF.toFixed(1)}
uniform vec4 uRipples[RIPPLES]; // x, z, front, strength
uniform vec4 uWells;            // a.xz, b.xz
uniform vec2 uWellDepth;
uniform float uWellWidth;
varying float vFade;
varying float vLift;
float well(vec2 p, vec2 centre, float depth) {
    vec2 d = p - centre;
    return depth * exp(-dot(d, d) / (uWellWidth * uWellWidth));
}
void main() {
    vec2 p = position.xz;
    float h = 0.0;
    // The same wave shape as createRipplePool().heightAt in rippleTimeline.js.
    for (int i = 0; i < RIPPLES; i++) {
        vec4 r = uRipples[i];
        if (r.w == 0.0) continue;
        float d = distance(p, r.xy);
        float behind = r.z - d;
        if (behind < 0.0 || behind > PACKET) continue;
        h += r.w * sin(behind * 6.2831853 / WAVELENGTH) * exp(-behind / 6.0) / (1.0 + d * 0.03);
    }
    float y = h - well(p, uWells.xy, uWellDepth.x) - well(p, uWells.zw, uWellDepth.y);
    vLift = abs(h);
    vFade = 1.0 - smoothstep(GRID_HALF * 0.55, GRID_HALF, length(p));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x, y, p.y, 1.0);
}`;

const gridFragment = `
uniform vec3 uColor;
uniform float uOpacity;
varying float vFade;
varying float vLift;
void main() {
    // Lines brighten where a ripple lifts them, so the rings read clearly.
    vec3 colour = mix(uColor, vec3(1.0), clamp(vLift * 0.35, 0.0, 0.6));
    gl_FragColor = vec4(colour, uOpacity * vFade * (0.7 + clamp(vLift, 0.0, 1.0) * 0.3));
}`;

function defaultControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    // Drag to look around; the camera never travels (owner: flying comes later).
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = 1.35;
    return controls;
}

function gridGeometry(lines) {
    const positions = [];
    const step = (2 * GRID_HALF) / lines;
    for (let i = 0; i < lines; i++) {
        const c = -GRID_HALF + (2 * GRID_HALF * i) / (lines - 1);
        for (let j = 0; j < lines; j++) {
            const a = -GRID_HALF + j * step, b = a + step;
            positions.push(a, 0, c, b, 0, c, c, 0, a, c, 0, b);
        }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    // The shader moves the lines up and down; keep them from being culled.
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), GRID_HALF * 1.5);
    return geometry;
}

/**
 * Space ripples (#94): two black holes circle in a glowing grid until the
 * child presses "Bring them together". They spiral in, faster and faster,
 * sending rings across the grid, merge in a flash, and the last big ripple
 * rolls out past the camera. Tapping the grid sends a small ring from there.
 * The grid is a picture to help us imagine: real ripples are invisible.
 *
 * Like lineUp.js, it is its own small scene with its own camera, drawn instead
 * of the Solar System. Built on first `open`; `dispose` frees everything.
 */
export function createSpaceRipples({ renderer, quality = "standard", reducedMotion = () => false, onChange = () => {}, createControls = defaultControls }) {
    const destination = destinationById("space-ripples");
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 2000);
    const pool = createRipplePool();
    const raycaster = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pointer = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const disposables = [];
    let scene = null;
    let controls = null;
    let lines = 0;
    let grid = null;
    let holes = [];
    let flash = null;
    let active = false;
    let stage = "waiting";
    let waitAngle = 0;
    let mergeT = 0;
    let clock = 0;
    let down = null;
    const pressed = new Set(); // pointers on the screen; two or more is a pinch, not a tap

    function own(item) {
        disposables.push(item);
        return item;
    }

    function blackHole(radius) {
        const group = new THREE.Group();
        group.add(new THREE.Mesh(own(new THREE.SphereGeometry(radius, 32, 16)), own(new THREE.MeshBasicMaterial({ color: 0x000000 }))));
        // A glowing ring so children can see them. The real pair had no bright
        // discs; the "picture to help us imagine" label covers this.
        const halo = new THREE.Group();
        const glow = (inner, outer, opacity) => halo.add(new THREE.Mesh(
            own(new THREE.RingGeometry(radius * inner, radius * outer, 48)),
            own(new THREE.MeshBasicMaterial({ color: HALO_COLOR, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })),
        ));
        glow(1.08, 1.35, 1);
        glow(1.35, 2.2, 0.3);
        group.add(halo);
        group.userData.halo = halo;
        scene.add(group);
        return group;
    }

    function build() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x02030a);

        const starCount = quality === "low" ? 600 : 1500;
        const stars = new Float32Array(starCount * 3);
        const direction = new THREE.Vector3();
        for (let i = 0; i < starCount; i++) {
            direction.randomDirection().multiplyScalar(500).toArray(stars, i * 3);
        }
        const starGeometry = own(new THREE.BufferGeometry());
        starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(stars, 3));
        scene.add(new THREE.Points(starGeometry, own(new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.7 }))));

        lines = GRID_LINES[quality] ?? GRID_LINES.standard;
        const uniforms = {
            uRipples: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4()) },
            uWells: { value: new THREE.Vector4() },
            uWellDepth: { value: new THREE.Vector2() },
            uWellWidth: { value: WELL_WIDTH },
            uColor: { value: new THREE.Color(GRID_COLOR) },
            uOpacity: { value: 0.75 },
        };
        grid = new THREE.LineSegments(own(gridGeometry(lines)), own(new THREE.ShaderMaterial({
            uniforms, vertexShader: gridVertex, fragmentShader: gridFragment,
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        })));
        scene.add(grid);

        holes = destination.bodies.map((body) => blackHole(body.radius));

        flash = new THREE.Mesh(own(new THREE.SphereGeometry(1, 24, 12)), own(new THREE.MeshBasicMaterial({
            color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
        })));
        flash.visible = false;
        scene.add(flash);

        controls = createControls(camera, renderer.domElement);
        controls.enabled = false;
    }

    function setStage(next) {
        stage = next;
        onChange({ stage });
    }

    function addRing(x, z, amplitude, keep = false) {
        const calm = reducedMotion();
        pool.add({ x, z, amplitude: calm ? amplitude * 0.5 : amplitude, speed: calm ? RING_SPEED * 0.6 : RING_SPEED, keep });
    }

    function placePair(angle, separation, merged) {
        const half = (PAIR_SPREAD / 2) * separation;
        const [a, b] = holes;
        const sink = -WELL_DEPTH * 0.55;
        a.position.set(Math.cos(angle) * half, sink, Math.sin(angle) * half);
        b.position.set(-Math.cos(angle) * half, sink * 0.85, -Math.sin(angle) * half);
        a.scale.setScalar(merged ? 1.5 : 1);
        b.visible = !merged;
        const { uWells, uWellDepth } = grid.material.uniforms;
        uWells.value.set(a.position.x, a.position.z, b.position.x, b.position.z);
        uWellDepth.value.set(merged ? WELL_DEPTH * 1.5 : WELL_DEPTH, merged ? 0 : WELL_DEPTH * 0.85);
    }

    return {
        get scene() { return scene; },
        camera,
        get gridLineCount() { return lines; },

        /** Builds and compiles during the warp, so arriving doesn't stutter. */
        prepare() {
            if (!scene) build();
            compileScene(renderer, scene, camera);
        },

        open() {
            if (!scene) build();
            stage = "waiting";
            waitAngle = 0;
            mergeT = 0;
            pool.clear();
            camera.position.fromArray(destination.camera.position);
            controls.target.fromArray(destination.camera.target);
            camera.lookAt(controls.target);
            controls.enabled = true;
            active = true;
            onChange({ stage });
        },

        close() {
            active = false;
            down = null;
            pressed.clear();
            if (controls) controls.enabled = false;
        },

        isActive: () => active,
        stage: () => stage,
        rippleCount: () => pool.list().length,
        ripples: () => pool.list(),

        bringTogether() {
            if (!active || stage !== "waiting") return;
            mergeT = 0;
            setStage("merging");
        },

        replay() {
            if (!active || stage !== "settled") return;
            stage = "waiting";
            this.bringTogether();
        },

        update(dt) {
            if (!active) return;
            const calm = reducedMotion();
            clock += dt;
            let angle = waitAngle, separation = 1, merged = false, wobble = 0, flashLevel = 0;
            if (stage === "waiting") {
                waitAngle += dt * WAIT_SPIN * (calm ? 0.5 : 1);
                angle = waitAngle;
            } else if (stage === "merging") {
                const previous = mergeT;
                mergeT += dt;
                const frame = mergeFrame(mergeT, calm, previous);
                // The merge's big ring is kept however fast the child taps.
                if (frame.emitRing) addRing(0, 0, frame.ringStrength, frame.merged);
                angle = waitAngle + frame.angle;
                ({ separation, merged, wobble } = frame);
                flashLevel = frame.flash;
                if (frame.done) {
                    waitAngle = angle;
                    setStage("settled");
                }
            } else {
                waitAngle += dt * WAIT_SPIN * 0.5;
                angle = waitAngle;
                merged = true;
                separation = 0;
            }
            placePair(angle, separation, merged);

            pool.update(dt);
            const waves = pool.waves();
            grid.material.uniforms.uRipples.value.forEach((slot, i) => {
                const wave = waves[i];
                if (wave) slot.set(wave.x, wave.z, wave.front, wave.strength);
                else slot.set(0, 0, 0, 0);
            });

            flash.visible = flashLevel > 0.01;
            flash.scale.setScalar(2 + flashLevel * 14);
            flash.material.opacity = flashLevel * 0.9;

            controls.update();
            // The last big ripple rolls past the camera: a gentle wobble.
            if (wobble > 0) camera.rotateZ(Math.sin(clock * 18) * 0.025 * wobble);
            camera.updateMatrixWorld();
            for (const hole of holes) hole.userData.halo.quaternion.copy(camera.quaternion);
        },

        render() {
            if (scene) renderer.render(scene, camera);
        },

        resize({ width, height }) {
            if (!width || !height) return;
            camera.aspect = width / height;
            // On a tall phone the card fills the bottom of the screen, so lift
            // the view and keep the black holes in the top third.
            if (camera.aspect < PORTRAIT_ASPECT) camera.setViewOffset(width, height, 0, height * PORTRAIT_LIFT, width, height);
            else camera.clearViewOffset();
            camera.updateProjectionMatrix();
        },

        pointerDown(event) {
            if (!active) return;
            // The first finger of a new touch: any finger whose lift we missed is gone.
            if (event.isPrimary) pressed.clear();
            pressed.add(event.pointerId);
            down = pressed.size === 1 ? { x: event.clientX, y: event.clientY, time: event.timeStamp ?? performance.now() } : null;
        },

        /** The browser took the touch over (a scroll or pinch): forget it. */
        pointerCancel(event) {
            pressed.delete(event.pointerId);
            down = null;
        },

        /** True when a tap landed on the grid and sent out a ring. */
        pointerUp(event, rect) {
            pressed.delete(event.pointerId);
            if (!active || !down) return false;
            const tap = isTap(down, { x: event.clientX, y: event.clientY, time: event.timeStamp ?? performance.now() });
            down = null;
            if (!tap) return false;
            pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
            camera.updateMatrixWorld();
            raycaster.setFromCamera(pointer, camera);
            if (!raycaster.ray.intersectPlane(ground, hit)) return false;
            if (Math.abs(hit.x) > GRID_HALF || Math.abs(hit.z) > GRID_HALF) return false;
            addRing(hit.x, hit.z, TAP_AMPLITUDE);
            return true;
        },

        dispose() {
            active = false;
            // OrbitControls.dispose() resets the shared canvas to touch-action
            // "auto", which would hand the Solar System's drag and pinch back to
            // the browser. Keep whatever the canvas had.
            const canvasStyle = renderer.domElement?.style;
            const touchAction = canvasStyle?.touchAction;
            controls?.dispose();
            if (canvasStyle) canvasStyle.touchAction = touchAction;
            controls = null;
            for (const item of disposables.splice(0)) item.dispose();
            scene?.clear();
        },
    };
}
