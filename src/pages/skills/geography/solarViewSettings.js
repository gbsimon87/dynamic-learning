// "My view" preferences for the 3D Solar System. A per-viewer convenience,
// NOT learner progress: it has its own key and never touches other keys.
export const VIEW_SETTINGS_KEY = "dl.solarView";

export const VIEW_TOGGLES = [
    { key: "showOrbits", label: "Orbit lines", icon: "⭕" },
    { key: "showLabels", label: "Planet names", icon: "🪐" },
    { key: "showMoonLabels", label: "Moon names", icon: "🌙" },
    { key: "milkyWay", label: "Milky Way sky", icon: "🌌" },
];

export const DEFAULT_VIEW_SETTINGS = {
    showOrbits: true,
    showLabels: true,
    showMoonLabels: false,
    milkyWay: false,
};

// Kid-sized time controls (#4). Not saved: a Solar System that is still
// stopped from last time would look broken. `orbit` is the orbit-speed
// multiplier; "pause" freezes orbits and spins.
export const SPEED_PRESETS = [
    { key: "pause", label: "Stop", icon: "⏸", orbit: 1 },
    { key: "slow", label: "Slow", icon: "🐢", orbit: 1 },
    { key: "fast", label: "Fast", icon: "🐇", orbit: 20 },
];

export const DEFAULT_SPEED = "slow";

/** The preset an orbit multiplier matches while running, or null (a grown-up's Tweakpane value). */
export function speedPresetFor(orbitSpeedMultiplier) {
    return SPEED_PRESETS.find((preset) => preset.key !== "pause" && preset.orbit === orbitSpeedMultiplier)?.key ?? null;
}

const KNOWN_KEYS = Object.keys(DEFAULT_VIEW_SETTINGS);

function pickBooleans(source) {
    const out = {};
    if (!source || typeof source !== "object" || Array.isArray(source)) return out;
    for (const key of KNOWN_KEYS) {
        if (typeof source[key] === "boolean") out[key] = source[key];
    }
    return out;
}

export function loadViewSettings(storage = globalThis.localStorage) {
    try {
        const raw = storage?.getItem(VIEW_SETTINGS_KEY);
        if (!raw) return { ...DEFAULT_VIEW_SETTINGS };
        return { ...DEFAULT_VIEW_SETTINGS, ...pickBooleans(JSON.parse(raw)) };
    } catch {
        return { ...DEFAULT_VIEW_SETTINGS };
    }
}

export function saveViewSettings(settings, storage = globalThis.localStorage) {
    try {
        if (!storage) return false;
        storage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(pickBooleans(settings)));
        return true;
    } catch {
        return false;
    }
}
