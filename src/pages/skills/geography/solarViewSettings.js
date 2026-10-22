// "My view" preferences for the 3D Solar System. A per-viewer convenience,
// NOT learner progress: it has its own key and never touches other keys.
export const VIEW_SETTINGS_KEY = "dl.solarView";

export const VIEW_TOGGLES = [
    { key: "showOrbits", label: "Orbit lines", icon: "⭕" },
    { key: "showLabels", label: "Planet names", icon: "🪐" },
    { key: "showMoonLabels", label: "Moon names", icon: "🌙" },
    { key: "milkyWay", label: "Milky Way sky", icon: "🌌" },
    { key: "constellations", label: "Constellations", icon: "✨" },
];

// How strongly the sky's constellations are drawn while "Constellations" is
// on: line opacity, star glow and name-badge opacity.
export const CONSTELLATION_BRIGHTNESS = [
    { key: "faint", label: "Faint", lines: 0.3, stars: 1, names: 0.5 },
    { key: "bright", label: "Bright", lines: 0.55, stars: 1.5, names: 0.75 },
    { key: "brightest", label: "Brightest", lines: 0.85, stars: 2, names: 0.95 },
];

export const DEFAULT_CONSTELLATION_BRIGHTNESS = "bright";

export const DEFAULT_VIEW_SETTINGS = {
    showOrbits: true,
    showLabels: true,
    showMoonLabels: false,
    milkyWay: false,
    constellations: false,
    constellationBrightness: DEFAULT_CONSTELLATION_BRIGHTNESS,
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
const BRIGHTNESS_KEYS = CONSTELLATION_BRIGHTNESS.map((level) => level.key);

// Each key keeps only values of its default's kind; the brightness only a known level.
function pickKnown(source) {
    const out = {};
    if (!source || typeof source !== "object" || Array.isArray(source)) return out;
    for (const key of KNOWN_KEYS) {
        const valid = key === "constellationBrightness"
            ? BRIGHTNESS_KEYS.includes(source[key])
            : typeof source[key] === "boolean";
        if (valid) out[key] = source[key];
    }
    return out;
}

export function loadViewSettings(storage = globalThis.localStorage) {
    try {
        const raw = storage?.getItem(VIEW_SETTINGS_KEY);
        if (!raw) return { ...DEFAULT_VIEW_SETTINGS };
        return { ...DEFAULT_VIEW_SETTINGS, ...pickKnown(JSON.parse(raw)) };
    } catch {
        return { ...DEFAULT_VIEW_SETTINGS };
    }
}

export function saveViewSettings(settings, storage = globalThis.localStorage) {
    try {
        if (!storage) return false;
        storage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(pickKnown(settings)));
        return true;
    } catch {
        return false;
    }
}
