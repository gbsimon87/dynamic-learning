import test from 'node:test';
import assert from 'node:assert/strict';
import { applySceneSettings, moonLabelVisible } from './solarSceneSettings.js';
import { DEFAULT_VIEW_SETTINGS } from './solarViewSettings.js';
import { createSolarDefaults } from './solarSimulation.js';

test('drawer preferences reach scene objects and survive numeric Reset', () => {
    const defaults = createSolarDefaults();
    const skyCalls = [];
    const scene = {
        simulation: { ...defaults.simulation }, glowSettings: { ...defaults.glow },
        beltSettings: { ...defaults.belt }, backgroundSettings: { ...defaults.background },
        sky: { apply: value => skyCalls.push(value) }, asteroidBelt: { mesh: { visible: true } },
    };
    const settings = { ...DEFAULT_VIEW_SETTINGS, enableTilt: false, skyVisible: false, sunGlow: false, asteroidBelt: false, showOrbits: false, showLabels: false, showMoonLabels: true, milkyWay: true };
    applySceneSettings({ ...scene, settings });
    assert.equal(scene.simulation.enableTilt, false);
    assert.equal(scene.simulation.showOrbits, false);
    assert.equal(scene.simulation.showLabels, false);
    assert.equal(scene.simulation.showMoonLabels, true);
    assert.equal(scene.glowSettings.enabled, false);
    assert.equal(scene.beltSettings.enabled, false);
    assert.equal(scene.asteroidBelt.mesh.visible, false);
    assert.equal(scene.backgroundSettings.enabled, false);
    assert.deepEqual(skyCalls.at(-1), { milkyWay: true, skyVisible: false });
    Object.assign(scene.glowSettings, defaults.glow);
    Object.assign(scene.beltSettings, defaults.belt);
    Object.assign(scene.backgroundSettings, defaults.background);
    applySceneSettings({ ...scene, settings });
    assert.equal(scene.glowSettings.enabled, false);
    assert.equal(scene.beltSettings.enabled, false);
    assert.equal(scene.backgroundSettings.enabled, false);
    applySceneSettings({ ...scene, settings: DEFAULT_VIEW_SETTINGS });
    assert.equal(scene.simulation.enableTilt, true);
    assert.equal(scene.glowSettings.enabled, true);
    assert.equal(scene.asteroidBelt.mesh.visible, true);
    assert.deepEqual(skyCalls.at(-1), { milkyWay: false, skyVisible: true });
});

test('Moon names switch shows moon badges in the overview and around the followed planet', () => {
    const overview = { following: false, inFollowedSystem: false, isFollowTarget: false };
    assert.equal(moonLabelVisible({ ...overview, showMoonLabels: true }), true);
    assert.equal(moonLabelVisible({ ...overview, showMoonLabels: false }), false);
    const nearby = { following: true, inFollowedSystem: true, isFollowTarget: false };
    assert.equal(moonLabelVisible({ ...nearby, showMoonLabels: true }), true);
    assert.equal(moonLabelVisible({ ...nearby, showMoonLabels: false }), false);
    assert.equal(moonLabelVisible({ ...nearby, showMoonLabels: false, forced: true }), true, 'a followed moon names its neighbours');
    assert.equal(moonLabelVisible({ ...nearby, inFollowedSystem: false, showMoonLabels: true }), false, 'other planets stay quiet close up');
    assert.equal(moonLabelVisible({ ...nearby, isFollowTarget: true, showMoonLabels: true }), false, 'the followed moon needs no badge');
});
