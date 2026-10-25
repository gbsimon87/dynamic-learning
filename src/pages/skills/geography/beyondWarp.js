import * as THREE from "three";
import { createWarpRide, homeRideFrame } from "./beyondWarpTimeline.js";
import { createWarpStreaks } from "./warpStreaks.js";
import { compileScene } from "./compileScene.js";

const FOV = 60;
const DOORWAY_DISTANCE = 80;
const TUNNEL_LENGTH = 240;
const PURPLE = 0x8a5cff;
const BLUE = 0x3fa9ff;

const tunnelVertex = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const tunnelFragment = (twists) => `
uniform float uTime;
uniform float uSwirl;
uniform vec3 uPurple;
uniform vec3 uBlue;
varying vec2 vUv;
void main() {
    // Spiral bands twisting down the tunnel and turning over time.
    float band = sin((vUv.x * ${twists.toFixed(1)} + vUv.y * 9.0) * 6.2831853 - uTime * 3.0) * 0.5 + 0.5;
    vec3 colour = mix(uPurple, uBlue, band);
    float ends = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
    gl_FragColor = vec4(colour, uSwirl * (0.2 + 0.6 * band * band) * ends);
}`;

/**
 * The warp to Beyond (#113): a black-hole doorway grows ahead of the rocket,
 * the rocket falls in, and a purple-blue swirl with the light streaks from
 * warpStreaks.js rushes past until a soft flash. The doorway is a pretend
 * shortcut; real black holes don't lead anywhere.
 *
 * Like lineUp.js, it is its own small scene and camera, drawn instead of the
 * Solar System. It is handed the rocket (`makeRocket` returns buildShip()'s
 * `{ ship, flame, disposables }`) rather than building one, so later Beyond
 * work can hand it whichever ship the child flies. "out" moves only as fast as
 * the child holds the engine; "home" plays by itself.
 */
export function createBeyondWarp({ renderer, quality = "standard", reducedMotion = () => false, makeRocket, onFrame = () => {}, onDone = () => {} }) {
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 2000);
    const disposables = [];
    let scene = null;
    let streaks = null;
    let rocket = null;
    let rocketGroup = null;
    let doorway = null;
    let tunnel = null;
    let flash = null;
    let active = false;
    let direction = "out";
    let ride = null;
    let homeT = 0;
    let holding = false;
    let clock = 0;

    function own(item) {
        disposables.push(item);
        return item;
    }

    function build() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x05020f);
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const light = new THREE.DirectionalLight(0xc9b8ff, 1.8);
        light.position.set(2, 3, 4);
        scene.add(light);

        const starCount = quality === "low" ? 200 : 400;
        const stars = new Float32Array(starCount * 3);
        const direction3 = new THREE.Vector3();
        for (let i = 0; i < starCount; i++) direction3.randomDirection().multiplyScalar(300).toArray(stars, i * 3);
        const starGeometry = own(new THREE.BufferGeometry());
        starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(stars, 3));
        scene.add(new THREE.Points(starGeometry, own(new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: false }))));

        // The doorway: a black hole with a purple-blue glow, straight ahead.
        doorway = new THREE.Group();
        doorway.add(new THREE.Mesh(own(new THREE.SphereGeometry(2, 32, 16)), own(new THREE.MeshBasicMaterial({ color: 0x000000 }))));
        const ring = new THREE.Mesh(own(new THREE.RingGeometry(2.1, 3.6, 64)), own(new THREE.MeshBasicMaterial({
            color: PURPLE, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
        })));
        doorway.add(ring);
        doorway.name = "beyond-doorway";
        doorway.position.set(0, 0, -DOORWAY_DISTANCE);
        scene.add(doorway);

        const low = quality === "low";
        tunnel = new THREE.Mesh(
            own(new THREE.CylinderGeometry(9, 9, TUNNEL_LENGTH, low ? 24 : 64, 1, true)),
            own(new THREE.ShaderMaterial({
                uniforms: { uTime: { value: 0 }, uSwirl: { value: 0 }, uPurple: { value: new THREE.Color(PURPLE) }, uBlue: { value: new THREE.Color(BLUE) } },
                vertexShader: tunnelVertex,
                fragmentShader: tunnelFragment(low ? 3 : 5),
                transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
            })),
        );
        tunnel.name = "beyond-tunnel";
        tunnel.visible = false;
        tunnel.rotation.x = Math.PI / 2;
        tunnel.position.z = -TUNNEL_LENGTH / 2 + 10;
        scene.add(tunnel);

        rocket = makeRocket();
        rocketGroup = new THREE.Group();
        rocketGroup.name = "beyond-rocket";
        rocket.ship.rotation.x = -Math.PI / 2; // the model points along +Y; fly towards -Z
        rocketGroup.add(rocket.ship);
        rocketGroup.position.set(0, -0.35, 0);
        rocketGroup.scale.setScalar(0.8);
        scene.add(rocketGroup);

        camera.position.set(0, 0.25, 2.6);
        camera.lookAt(0, 0, -10);
        scene.add(camera);
        streaks = createWarpStreaks({ camera, quality });

        flash = new THREE.Mesh(own(new THREE.PlaneGeometry(10, 10)), own(new THREE.MeshBasicMaterial({
            color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
        })));
        flash.position.z = -1;
        flash.renderOrder = 999;
        flash.visible = false;
        camera.add(flash);
    }

    function show(frame, dt) {
        // Reduced motion: no looming zoom; the doorway waits calmly ahead.
        doorway.visible = frame.calm || frame.progress < 0.25;
        doorway.scale.setScalar(frame.calm ? 1 : 1 + frame.doorway * 16);
        tunnel.visible = frame.swirl > 0.001;
        tunnel.material.uniforms.uSwirl.value = frame.swirl;
        tunnel.material.uniforms.uTime.value = clock;
        if (frame.calm) rocketGroup.rotation.z *= Math.exp(-dt * 6);
        else rocketGroup.rotation.z += dt * frame.swirl * 0.6;
        rocket.flame.visible = direction === "home" || holding || frame.progress > 0;
        rocket.flame.scale.y = direction === "home" || holding ? 1.3 : 0.5;
        streaks.update(dt, { speed: frame.streakSpeed, brightness: frame.streakBrightness });
        flash.visible = frame.flash > 0.01;
        flash.material.opacity = frame.flash;
    }

    return {
        camera,
        get scene() { return scene; },

        /** Builds and compiles ahead of the ride, so the first frames don't stutter. */
        prepare() {
            if (!scene) build();
            compileScene(renderer, scene, camera);
        },

        start(next) {
            if (!scene) build();
            direction = next;
            ride = createWarpRide({ reducedMotion });
            homeT = 0;
            holding = false;
            rocketGroup.rotation.z = 0;
            active = true;
        },

        /** Ends a ride straight away, without `onDone` (Reset, leaving the page). */
        stop() {
            active = false;
            holding = false;
            streaks?.hide();
        },

        setHolding(next) {
            holding = Boolean(next);
        },

        isActive: () => active,

        update(dt) {
            if (!active) return;
            clock += dt;
            let frame;
            if (direction === "out") frame = ride.step(dt, holding);
            else {
                homeT += dt;
                frame = homeRideFrame(homeT, reducedMotion());
            }
            show(frame, dt);
            onFrame(frame);
            if (frame.done) {
                active = false;
                holding = false;
                streaks.hide();
                onDone(direction);
            }
        },

        render() {
            if (scene) renderer.render(scene, camera);
        },

        resize({ width, height }) {
            if (!width || !height) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        },

        dispose() {
            active = false;
            streaks?.dispose();
            streaks = null;
            if (flash) camera.remove(flash);
            for (const item of rocket?.disposables ?? []) item.dispose();
            rocket = null;
            for (const item of disposables.splice(0)) item.dispose();
            scene?.clear();
        },
    };
}
