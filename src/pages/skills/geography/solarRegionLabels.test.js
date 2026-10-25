import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createSolarRegionLabels } from "./solarRegionLabels.js";
import { SOLAR_REGIONS } from "./solarRegionInfo.js";
import { createSmallBodyRegions } from "./smallBodyRegions.js";
import { PLANET_ORBITS } from "./planetOrbits.js";
import { createSolarDefaults } from "./solarSimulation.js";

function setup() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 5000);
    camera.position.set(0, 1000, 0);
    camera.up.set(0, 0, -1);
    camera.lookAt(0, 0, 0);
    const anchors = {};
    for (const [id, x, z] of [["hungaria-group", -400, 200], ["trojans-l4", -400, -200], ["trojans-l5", 400, -200], ["kuiper-belt", 400, 250]]) {
        anchors[id] = new THREE.Object3D();
        anchors[id].position.set(x, 0, z);
        scene.add(anchors[id]);
    }
    const state = { visible: true, obstacles: [], viewport: { width: 2000, height: 1000 } };
    const selected = [];
    const module = createSolarRegionLabels({
        scene, camera, anchors,
        makeLabel(name) {
            const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture() }));
            label.userData.aspect = name.length * 0.35 + 0.6;
            return label;
        },
        getViewport: () => state.viewport,
        getBeltSettings: () => createSolarDefaults().belt,
        isVisible: () => state.visible,
        getObstacles: () => state.obstacles,
        onSelect: entry => selected.push(entry),
    });
    module.update();
    const targetFor = id => scene.getObjectByName(`${id}-label-hit`);
    function click(id, verticalPixels = 0) {
        scene.updateMatrixWorld(true);
        const point = targetFor(id).position.clone().project(camera);
        point.y += 2 * verticalPixels / state.viewport.height;
        const ray = new THREE.Raycaster();
        ray.setFromCamera(point, camera);
        const hits = ray.intersectObjects(module.hitTargets.filter(target => target.visible), false);
        return module.select(hits[0]?.object);
    }
    return { scene, camera, anchors, state, selected, module, click, targetFor };
}

test("raycasting every region badge selects its own information-card data", () => {
    const t = setup();
    try {
        for (const region of SOLAR_REGIONS) {
            assert.equal(t.targetFor(region.id).visible, true, region.name);
            assert.equal(t.click(region.id), true, region.name);
            assert.equal(t.selected.at(-1), region);
            assert.equal(t.selected.at(-1).kind, "region");
            assert.ok(region.facts.length > 0 && region.closer.length > 0);
        }
        assert.equal(t.module.select(new THREE.Object3D()), false);
    } finally { t.module.dispose(); }
});

test("the label's larger tap area works beyond the visible badge", () => {
    const t = setup();
    try {
        // A 26px badge ends at 13px. Its 44px target still accepts this tap.
        assert.equal(t.click("asteroid-belt", 18), true);
        assert.equal(t.selected.at(-1).id, "asteroid-belt");
        assert.equal(t.click("asteroid-belt", 30), false);
    } finally { t.module.dispose(); }
});

test("phone and desktop layouts keep a readable badge and a finger-sized target", () => {
    const t = setup();
    try {
        for (const owner of Object.values(t.anchors)) owner.position.x = 10000;
        for (const [width, height] of [[390, 844], [1440, 900]]) {
            t.state.viewport = { width, height };
            t.camera.aspect = width / height;
            t.camera.updateProjectionMatrix();
            t.module.update();
            assert.equal(t.click("asteroid-belt", 18), true);
            assert.equal(t.click("asteroid-belt", 30), false);
        }
    } finally { t.module.dispose(); }
});

test("the real inner-belt anchors are visible and selectable from the default phone and desktop overview", () => {
    const t = setup();
    const planets = Object.fromEntries([
        ["Mars", 39, 0.003], ["Jupiter", 133.33, 0.0015], ["Neptune", 770.77, 0.0006], ["Pluto", 1000, 0.0004],
    ].map(([name, distance, speed]) => [name.toLowerCase(), { distance, speed, orbit: PLANET_ORBITS[name] }]));
    const regions = createSmallBodyRegions({ scene: t.scene, planets, mainBeltInnerRadius: createSolarDefaults().belt.innerRadius, getOrbitTime: () => 0, getQuality: () => "low", isVisible: () => true });
    try {
        t.camera.position.set(0, 72, 128);
        t.camera.up.set(0, 1, 0);
        t.camera.lookAt(0, 0, 0);
        for (const [id, owner] of Object.entries(regions.anchors)) owner.getWorldPosition(t.anchors[id].position);
        for (const [width, height] of [[390, 844], [1440, 900]]) {
            t.state.viewport = { width, height };
            t.camera.aspect = width / height;
            t.camera.updateProjectionMatrix();
            t.module.update();
            for (const id of ["asteroid-belt", "hungaria-group"]) assert.equal(t.click(id), true, `${id} at ${width}px`);
        }
    } finally { t.module.dispose(); regions.dispose(); }
});

test("hidden scenery and labels cannot be selected, then reappear when enabled", () => {
    const t = setup();
    try {
        t.state.visible = false;
        t.module.update();
        for (const region of SOLAR_REGIONS) {
            assert.equal(t.scene.getObjectByName(`${region.id}-label`).visible, false);
            assert.equal(t.module.select(t.targetFor(region.id)), false);
            assert.equal(t.click(region.id), false);
        }
        assert.equal(t.selected.length, 0);
        t.state.visible = true;
        t.module.update();
        assert.equal(t.click("kuiper-belt"), true);
    } finally { t.module.dispose(); }
});

test("planet labels win overlaps; offscreen and rear-facing badges have no active tap targets", () => {
    const t = setup();
    try {
        const point = t.targetFor("asteroid-belt").position.clone().project(t.camera);
        t.state.obstacles = [{ x: (point.x + 1) * 1000, y: (1 - point.y) * 500, halfWidth: 100, halfHeight: 20 }];
        t.anchors["hungaria-group"].position.x = 10000;
        t.anchors["kuiper-belt"].position.y = 2000;
        t.module.update();
        for (const id of ["asteroid-belt", "hungaria-group", "kuiper-belt"]) {
            assert.equal(t.targetFor(id).visible, false, id);
            assert.equal(t.module.select(t.targetFor(id)), false);
        }
        assert.equal(t.click("trojans-l4"), true);
    } finally { t.module.dispose(); }
});

test("labels release their textures and materials on disposal", () => {
    const t = setup();
    let textures = 0, materials = 0;
    for (const region of SOLAR_REGIONS) {
        const label = t.scene.getObjectByName(`${region.id}-label`);
        label.material.map.addEventListener("dispose", () => textures++);
        label.material.addEventListener("dispose", () => materials++);
    }
    t.module.hitTargets[0].material.addEventListener("dispose", () => materials++);
    t.module.dispose();
    assert.equal(textures, 5);
    assert.equal(materials, 6);
    assert.equal(t.scene.getObjectByName("solar-region-labels"), undefined);
    assert.equal(t.module.select(t.module.hitTargets[0]), false);
});
