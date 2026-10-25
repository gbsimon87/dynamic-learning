import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createSmallBodyRegions } from "./smallBodyRegions.js";
import { PLANET_ORBITS, orbitPointAt, orbitPosition } from "./planetOrbits.js";
import { advanceWorldTime, createSolarDefaults, createWorldTime } from "./solarSimulation.js";

const planets = Object.fromEntries([
    ["Mars", 39, 0.003], ["Jupiter", 133.33, 0.0015],
    ["Neptune", 770.77, 0.0006], ["Pluto", 1000, 0.0004],
].map(([name, distance, speed]) => [name.toLowerCase(), { distance, speed, orbit: PLANET_ORBITS[name] }]));
const belt = createSolarDefaults().belt;

function setup(quality = "standard") {
    const scene = new THREE.Scene();
    const state = { time: createWorldTime(), visible: true, quality };
    let seed = 42;
    const module = createSmallBodyRegions({
        scene, planets, mainBeltInnerRadius: belt.innerRadius,
        getOrbitTime: () => state.time.orbitTime,
        getQuality: () => state.quality,
        isVisible: () => state.visible,
        rng: () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; },
    });
    const mesh = (name) => scene.getObjectByName(name);
    const positions = (name) => {
        scene.updateMatrixWorld(true);
        const body = mesh(name);
        const matrix = new THREE.Matrix4();
        return Array.from({ length: body.count }, (_, i) => {
            body.getMatrixAt(i, matrix);
            return new THREE.Vector3().setFromMatrixPosition(matrix).applyMatrix4(body.matrixWorld);
        });
    };
    return { scene, state, module, mesh, positions };
}

test("Hungarias occupy the gap inside the main belt; the icy disk extends beyond Neptune through Pluto's region", () => {
    const { module, positions } = setup();
    try {
        for (const point of positions("hungaria-group")) {
            assert.ok(point.length() > planets.mars.distance * (1 + PLANET_ORBITS.Mars.eccentricity));
            assert.ok(point.length() < belt.innerRadius);
        }
        const icyBodies = positions("kuiper-belt");
        for (const point of icyBodies) {
            assert.ok(point.length() > planets.neptune.distance);
            assert.ok(point.length() <= planets.neptune.distance * 50 / 30 + 0.001);
        }
        assert.ok(icyBodies.some((point) => point.length() > planets.pluto.distance * (1 + PLANET_ORBITS.Pluto.eccentricity)));
        // A thick disk all around the Sun, rather than a shell or a single arc.
        for (const x of [-1, 1]) for (const z of [-1, 1]) {
            assert.ok(icyBodies.some((point) => point.x * x > 0 && point.z * z > 0));
        }
        assert.ok(icyBodies.some((point) => point.y > 50));
        assert.ok(icyBodies.some((point) => point.y < -50));
    } finally { module.dispose(); }
});

test("the main belt keeps clear of Mars and the Trojan swarms, including its largest rocks and radial drift", () => {
    const innermost = belt.innerRadius * (1 - belt.eccentricity) - belt.maxSize;
    const outermost = belt.outerRadius * (1 + belt.eccentricity) + belt.maxSize;
    const marsAphelion = planets.mars.distance * (1 + planets.mars.orbit.eccentricity);
    const jupiterPerihelion = planets.jupiter.distance * (1 - planets.jupiter.orbit.eccentricity);
    assert.ok(innermost > marsAphelion);
    assert.ok(outermost < jupiterPerihelion * 0.96 - 0.48);
    assert.ok(belt.minSize > 0 && belt.maxSize >= belt.minSize);
});

test("both Trojan clouds remain at L4/L5 with Jupiter's actual position, including after complete orbits", () => {
    const { module, positions, state } = setup();
    const point0 = orbitPointAt(1, PLANET_ORBITS.Jupiter, 0);
    const point1 = orbitPointAt(1, PLANET_ORBITS.Jupiter, Math.PI / 2);
    const normal = new THREE.Vector3(point0.x, point0.y, point0.z)
        .cross(new THREE.Vector3(point1.x, point1.y, point1.z)).normalize();
    try {
        for (const time of [0, 600, 3000, 42000]) {
            state.time.orbitTime = time;
            module.update();
            const planet = orbitPosition(planets.jupiter, time);
            const radial = new THREE.Vector3(planet.x, planet.y, planet.z);
            const radius = radial.length();
            radial.normalize();
            const ahead = normal.clone().cross(radial).normalize();
            for (const [id, sign] of [["trojans-l4", 1], ["trojans-l5", -1]]) {
                const point = module.anchors[id].getWorldPosition(new THREE.Vector3());
                assert.ok(Math.abs(Math.atan2(point.dot(ahead), point.dot(radial)) - sign * Math.PI / 3) < 1e-9);
            }
            for (const [name, sign] of [["trojans-l4-leading", 1], ["trojans-l5-trailing", -1]]) {
                let meanAngle = 0;
                const cloud = positions(name);
                for (const point of cloud) {
                    const angle = Math.atan2(point.dot(ahead), point.dot(radial));
                    assert.ok(Math.abs(angle - sign * Math.PI / 3) < 20.01 * Math.PI / 180);
                    const planarRadius = Math.hypot(point.dot(ahead), point.dot(radial));
                    assert.ok(planarRadius > radius * 0.9599 && planarRadius < radius * 1.0401);
                    meanAngle += angle / cloud.length;
                }
                assert.ok(Math.abs(meanAngle - sign * Math.PI / 3) < Math.PI / 180);
            }
        }
    } finally { module.dispose(); }
});

test("the shared clock pauses, changes speed, and restores every region exactly on Reset", () => {
    const { module, state, positions } = setup("low");
    const names = ["hungaria-group", "trojans-l4-leading", "trojans-l5-trailing", "kuiper-belt"];
    const snapshot = () => names.map((name) => positions(name).slice(0, 4).map((point) => point.toArray()));
    try {
        const initial = snapshot();
        state.time = advanceWorldTime(state.time, 10, { orbitSpeedMultiplier: 100, rotationSpeedMultiplier: 1 });
        module.update();
        const moved = snapshot();
        moved.forEach((population, i) => assert.notDeepEqual(population, initial[i]));
        state.time = advanceWorldTime(state.time, 10, { orbitSpeedMultiplier: 100, rotationSpeedMultiplier: 1 }, true);
        module.update();
        assert.deepEqual(snapshot(), moved);
        state.time = createWorldTime();
        module.update();
        assert.deepEqual(snapshot(), initial);
    } finally { module.dispose(); }
});

test("visibility follows the main belt preference and quiet scenes, then catches up with Jupiter on return", () => {
    const { module, state, positions } = setup("low");
    try {
        const before = positions("trojans-l4-leading")[0];
        state.visible = false;
        state.time.orbitTime = 1000;
        module.update();
        assert.equal(module.object3d.visible, false);
        state.visible = true;
        module.update();
        assert.equal(module.object3d.visible, true);
        assert.ok(positions("trojans-l4-leading")[0].distanceTo(before) > 50);
    } finally { module.dispose(); }
});

test("quality changes reduce every population and disposal releases instance buffers and shared resources", () => {
    const { scene, module, state, mesh } = setup();
    const names = ["hungaria-group", "trojans-l4-leading", "trojans-l5-trailing", "kuiper-belt"];
    const original = names.map(mesh);
    const originalAnchors = { ...module.anchors };
    const released = new Set();
    original.forEach((body) => body.addEventListener("dispose", () => released.add(body)));
    let geometriesDisposed = 0;
    let materialsDisposed = 0;
    original[0].geometry.addEventListener("dispose", () => geometriesDisposed++);
    for (const material of new Set(original.map((body) => body.material))) {
        material.addEventListener("dispose", () => materialsDisposed++);
    }
    module.resize();
    assert.equal(mesh(names[0]), original[0]);
    state.quality = "low";
    module.resize();
    names.forEach((name, i) => {
        assert.ok(mesh(name).count < original[i].count);
        assert.equal(original[i].parent, null);
    });
    for (const [id, owner] of Object.entries(originalAnchors)) assert.equal(module.anchors[id], owner);
    assert.equal(released.size, 4);
    assert.equal(geometriesDisposed, 0);
    assert.equal(materialsDisposed, 0);
    const current = names.map(mesh);
    current.forEach((body) => body.addEventListener("dispose", () => released.add(body)));
    module.dispose();
    assert.equal(released.size, 8);
    assert.equal(geometriesDisposed, 1);
    assert.equal(materialsDisposed, 2);
    assert.equal(scene.children.length, 0);
});
