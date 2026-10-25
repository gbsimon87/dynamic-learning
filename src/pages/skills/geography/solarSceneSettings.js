/** Apply My view preferences to the existing scene, including after Reset. */
export function applySceneSettings({ settings, simulation, glowSettings, beltSettings, backgroundSettings, sky, asteroidBelt }) {
    Object.assign(simulation, settings);
    glowSettings.enabled = settings.sunGlow;
    beltSettings.enabled = settings.asteroidBelt;
    backgroundSettings.enabled = settings.skyVisible;
    if (asteroidBelt?.mesh) asteroidBelt.mesh.visible = settings.asteroidBelt;
    sky.apply({ milkyWay: settings.milkyWay, skyVisible: settings.skyVisible });
}

/**
 * Whether a moon's name badge shows. "Moon names" in My view shows every
 * moon's name in the overview, and the followed planet's moons when close up;
 * following a moon shows its neighbours' names even with the switch off.
 */
export function moonLabelVisible({ showMoonLabels, forced = false, following, inFollowedSystem, isFollowTarget }) {
    if (isFollowTarget) return false;
    if (!following) return showMoonLabels;
    return (showMoonLabels || forced) && inFollowedSystem;
}
