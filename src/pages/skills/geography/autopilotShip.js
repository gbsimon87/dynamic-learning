import * as THREE from "three";
import { flightFrame, flightPoint, flightSeconds, planWaypoint } from "./shipFlight.js";
import { flightCameraPose } from "./solarFlightCamera.js";

const UP = new THREE.Vector3(0, 1, 0);
// The ship is about as long as the planet is wide, but never so small it
// vanishes or so big it hides the planet, as shares of the framing distance.
const SIZE = { perRadius: 0.9, min: 0.035, max: 0.07 };
// How far behind the ship the camera chases, in ship lengths.
const CHASE_LENGTHS = 3.2;

export function buildShip(quality) {
    const segments = quality === "low" ? 10 : 18;
    const white = new THREE.MeshStandardMaterial({ color: 0xf4f6fb, roughness: 0.5, metalness: 0.15, emissive: 0x1c1f26 });
    const red = new THREE.MeshStandardMaterial({ color: 0xe8473d, roughness: 0.55, metalness: 0.1, emissive: 0x2a0806 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x7fd4ff, roughness: 0.2, metalness: 0.3, emissive: 0x1f5f8f });
    const metal = new THREE.MeshStandardMaterial({ color: 0x5b6270, roughness: 0.6, metalness: 0.6, emissive: 0x111318 });
    const flameMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa640,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const geometries = [
        new THREE.CylinderGeometry(0.16, 0.18, 0.6, segments),
        new THREE.ConeGeometry(0.16, 0.32, segments),
        new THREE.SphereGeometry(0.075, segments, 12),
        new THREE.BoxGeometry(0.03, 0.24, 0.18),
        new THREE.CylinderGeometry(0.1, 0.13, 0.1, segments),
        new THREE.ConeGeometry(0.1, 0.45, 12, 1, true),
        new THREE.SphereGeometry(0.75, 12, 8),
    ];
    const [bodyGeo, noseGeo, windowGeo, finGeo, nozzleGeo, flameGeo, hitGeo] = geometries;

    // The model points along +Y, nose first, about one unit long.
    const ship = new THREE.Group();
    const parts = [
        [bodyGeo, white, 0, 0, 0],
        [noseGeo, red, 0, 0.46, 0],
        [windowGeo, glass, 0, 0.12, 0.15],
        [nozzleGeo, metal, 0, -0.35, 0],
    ];
    for (const [geometry, material, x, y, z] of parts) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        ship.add(mesh);
    }
    for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(finGeo, red);
        const angle = (i / 3) * Math.PI * 2 + Math.PI;
        fin.position.set(Math.sin(angle) * 0.2, -0.24, Math.cos(angle) * 0.2);
        fin.rotation.y = angle;
        ship.add(fin);
    }
    const flame = new THREE.Mesh(flameGeo, flameMaterial);
    flame.rotation.x = Math.PI;
    flame.position.y = -0.4;
    flame.renderOrder = 2;
    ship.add(flame);
    for (const child of ship.children) child.raycast = () => {};

    // A big invisible ball round the ship, so small fingers can tap it.
    const hitTarget = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
    ship.add(hitTarget);

    return {
        ship,
        flame,
        flameMaterial,
        hitTarget,
        disposables: [...geometries, white, red, glass, metal, flameMaterial, hitTarget.material],
    };
}

/**
 * The autopilot ship (#34). Tapping a planet, picking it in search or the
 * tour flies this ship there on a curve that arcs round the Sun, with the
 * camera chasing it; on arrival the camera is exactly where the old follow
 * camera would frame the planet, so following carries on from there. Between
 * flights the ship hovers beside whatever it last flew to.
 *
 * A module for solarModules.js. It runs after OrbitControls each frame, so
 * while `isFlying()` it owns `camera.position` and `controls.target`; the
 * caller pauses its own follow camera until `onArrive`. Under reduced motion
 * the caller uses `park()` instead, which moves the ship without a flight.
 */
export function createAutopilotShip({ scene, camera, controls, quality, reducedMotion = () => false, getCameraView = () => "behind" }) {
    const { ship, flame, flameMaterial, hitTarget, disposables } = buildShip(quality);
    scene.add(ship);

    const targetPosition = new THREE.Vector3();
    const framingDir = new THREE.Vector3(0, 0, 1);
    const sideDir = new THREE.Vector3(1, 0, 0);
    const heading = new THREE.Vector3(0, 1, 0);
    const parkPoint = new THREE.Vector3();
    const flightStart = new THREE.Vector3();
    const cameraStart = new THREE.Vector3();
    const lookStart = new THREE.Vector3();
    const lastPosition = new THREE.Vector3();
    const look = new THREE.Vector3();
    const wantedTurn = new THREE.Quaternion();
    const scratch = new THREE.Vector3();
    const flightCameraPosition = new THREE.Vector3();
    const flightCameraTarget = new THREE.Vector3();
    const blendedCameraPosition = new THREE.Vector3();
    const blendedCameraTarget = new THREE.Vector3();

    let target = null; // the object the ship is flying to or hovering beside
    let targetRadius = 1;
    let getFramingDistance = () => 4;
    let flight = null;
    let size = 0.3;
    let hoverClock = 0;
    let ignition = 0; // the engine burning on the pad before lift-off (#35), 0..1
    let hidden = false;
    let thrust = 0; // 0..1 while flying, for the flame and the warp streaks
    let activeCameraView = getCameraView();
    let viewBlend = null;

    // The camera looks at a planet from between the way the ship came and the
    // Sun, a little from above, so the planet is lit when it arrives.
    function chooseFraming(from) {
        target.getWorldPosition(targetPosition);
        const toSun = scratch.copy(targetPosition).negate().setY(0);
        if (toSun.lengthSq() < 1e-6) toSun.set(0, 0, 1);
        toSun.normalize();
        framingDir.copy(from).sub(targetPosition).setY(0);
        if (framingDir.lengthSq() < 1e-6) framingDir.copy(toSun);
        framingDir.normalize().add(toSun);
        if (framingDir.lengthSq() < 1e-6) framingDir.copy(toSun);
        framingDir.normalize().addScaledVector(UP, 0.35).normalize();
        sideDir.crossVectors(framingDir, UP).normalize();
    }

    // Beside the planet, nearer the camera and up a little, so it shows next
    // to the planet rather than in front of it. Phones held upright are narrow,
    // so there it sits above the planet instead.
    function updateParkPoint(distance) {
        target.getWorldPosition(targetPosition);
        const narrow = Math.min(1, camera.aspect);
        parkPoint.copy(targetPosition)
            .addScaledVector(framingDir, distance * 0.4)
            .addScaledVector(UP, distance * (0.18 - 0.06 * narrow))
            .addScaledVector(sideDir, distance * 0.1 * narrow * narrow);
        return parkPoint;
    }

    function sizeFor(distance) {
        return THREE.MathUtils.clamp(targetRadius * SIZE.perRadius, distance * SIZE.min, distance * SIZE.max);
    }

    function framingPosition(distance, out) {
        target.getWorldPosition(targetPosition);
        return out.copy(targetPosition).addScaledVector(framingDir, distance);
    }

    function land() {
        const { onArrive } = flight;
        flight = null;
        flame.visible = false;
        const distance = getFramingDistance();
        size = sizeFor(distance);
        ship.scale.setScalar(size);
        ship.position.copy(updateParkPoint(distance));
        framingPosition(distance, camera.position);
        controls.target.copy(targetPosition);
        camera.lookAt(targetPosition);
        onArrive();
    }

    flame.visible = false;

    return {
        hitTarget,
        isFlying: () => flight !== null,
        /** How hard the engine is pushing: 0 when not flying, 1 at top speed. */
        thrust: () => (flight ? thrust : 0),
        isBeside: (object3d) => target === object3d && !flight,
        size: () => size,
        /** Where the engine is, in world space: smoke comes from here. */
        nozzle: (out) => ship.localToWorld(out.set(0, -0.45, 0)),
        /** Hides the ship, as when the camera looks back past it (#47). */
        setHidden(value) {
            hidden = value;
        },
        /** Burns the engine on the pad: the ship stands up straight and shakes. */
        ignite(level) {
            ignition = level;
            if (level > 0) heading.copy(UP);
        },

        /** Puts the ship beside `object3d` at once: the start, Reset, and reduced motion. */
        park(object3d, { radius, framingDistance, from = null }) {
            flight = null;
            flame.visible = false;
            target = object3d;
            targetRadius = radius;
            getFramingDistance = typeof framingDistance === "function" ? framingDistance : () => framingDistance;
            // Seen from `from` (the camera, under reduced motion), or else from the Sun's side.
            chooseFraming(from ? from.clone() : object3d.getWorldPosition(scratch).clone().multiplyScalar(0.5));
            size = sizeFor(getFramingDistance());
            ship.scale.setScalar(size);
            ship.position.copy(updateParkPoint(getFramingDistance()));
        },

        /**
         * Flies to `object3d`. Returns false, and does nothing, when the ship
         * is already hovering there. `framingDistance` is read every frame,
         * because the child can zoom while the ship flies.
         */
        flyTo(object3d, { radius, framingDistance, onArrive = () => {} }) {
            if (target === object3d && !flight) return false;
            target = object3d;
            targetRadius = radius;
            ignition = 0;
            getFramingDistance = framingDistance;
            flightStart.copy(ship.position);
            chooseFraming(flightStart);
            const end = updateParkPoint(getFramingDistance());
            flight = {
                age: 0,
                seconds: flightSeconds(flightStart.distanceTo(end)),
                waypoint: planWaypoint(flightStart, end),
                startSize: size,
                onArrive,
            };
            activeCameraView = getCameraView();
            viewBlend = null;
            cameraStart.copy(camera.position);
            lookStart.copy(controls.target);
            lastPosition.copy(flightStart);
            flame.visible = true;
            return true;
        },

        /** The way the camera looks at the planet the ship is beside, as a unit vector. */
        framingDirection: (out) => out.copy(framingDir),

        /** Lands at once, with the camera framing the planet: a drag mid-flight. */
        skip() {
            if (flight) land();
        },

        /** Stops a flight where it is. A ship that has landed keeps hovering. */
        cancel() {
            if (!flight) return;
            flight = null;
            flame.visible = false;
            target = null;
        },

        update(dt, { active }) {
            const cameraView = getCameraView();
            if (!active && flight && cameraView !== activeCameraView) {
                activeCameraView = cameraView;
                viewBlend = { age: 0, view: cameraView, position: camera.position.clone(), target: controls.target.clone() };
            }
            ship.visible = !active && !hidden && !(flight && (cameraView === "cockpit" || viewBlend?.view === "behind"));
            if (active || !target) return;

            if (!flight) {
                // Hover beside the planet, bobbing gently, side-on to the camera.
                hoverClock += dt;
                const distance = getFramingDistance();
                size = THREE.MathUtils.lerp(size, sizeFor(distance), 1 - Math.exp(-4 * dt));
                ship.scale.setScalar(size);
                ship.position.copy(updateParkPoint(distance));
                if (!reducedMotion()) ship.position.y += Math.sin(hoverClock * 1.8) * size * 0.06;
                flame.visible = ignition > 0;
                if (ignition > 0) {
                    flame.scale.set(1, 0.3 + ignition, 1);
                    flameMaterial.opacity = 0.3 + ignition * 0.6;
                    if (!reducedMotion()) {
                        const shake = size * 0.025 * ignition;
                        ship.position.x += (Math.random() - 0.5) * shake;
                        ship.position.z += (Math.random() - 0.5) * shake;
                    }
                    wantedTurn.identity();
                } else {
                    heading.copy(sideDir).addScaledVector(UP, 0.45).normalize();
                    wantedTurn.setFromUnitVectors(UP, heading);
                }
                ship.quaternion.slerp(wantedTurn, 1 - Math.exp(-3 * dt));
                return;
            }

            flight.age += dt;
            if (flight.age >= flight.seconds) {
                land();
                return;
            }
            const frame = flightFrame(flight.age, flight.seconds);
            const distance = getFramingDistance();
            const end = updateParkPoint(distance);
            const point = flightPoint(flightStart, flight.waypoint, end, frame.progress);
            ship.position.set(point.x, point.y, point.z);
            size = THREE.MathUtils.lerp(flight.startSize, sizeFor(distance), frame.progress);
            ship.scale.setScalar(size);

            // Nose along the way it's moving; the flame is longest at top speed.
            scratch.subVectors(ship.position, lastPosition);
            if (scratch.lengthSq() > 1e-10) heading.lerp(scratch.normalize(), 1 - Math.exp(-10 * dt)).normalize();
            lastPosition.copy(ship.position);
            wantedTurn.setFromUnitVectors(UP, heading);
            ship.quaternion.slerp(wantedTurn, 1 - Math.exp(-12 * dt));
            thrust = frame.thrust;
            flame.scale.set(1, 0.4 + thrust * 1.6, 1);
            flameMaterial.opacity = 0.35 + thrust * 0.6;

            // Camera: from where it was, in behind the ship, then round to frame the planet.
            flightCameraPose({
                position: ship.position,
                forward: heading,
                view: cameraView,
                shipScale: size,
                behindDistance: Math.max(size * CHASE_LENGTHS, .15),
                height: Math.max(size * .9, .11),
                lookAhead: Math.max(size * 4, .55),
            }, flightCameraPosition, flightCameraTarget);
            blendedCameraPosition.lerpVectors(cameraStart, flightCameraPosition, frame.chase);
            blendedCameraTarget.lerpVectors(lookStart, flightCameraTarget, frame.chase);
            if (viewBlend) {
                viewBlend.age += dt;
                const transition = THREE.MathUtils.smoothstep(viewBlend.age, 0, .24);
                camera.position.lerpVectors(viewBlend.position, blendedCameraPosition, transition);
                look.lerpVectors(viewBlend.target, blendedCameraTarget, transition);
                if (transition >= 1) viewBlend = null;
            } else {
                camera.position.copy(blendedCameraPosition);
                look.copy(blendedCameraTarget);
            }
            camera.position.lerp(framingPosition(distance, scratch), frame.arrive);
            look.lerp(targetPosition, frame.arrive);
            controls.target.copy(look);
            camera.lookAt(look);
        },

        dispose() {
            ship.removeFromParent();
            for (const item of disposables) item.dispose();
        },
    };
}
