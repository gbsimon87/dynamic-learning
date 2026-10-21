// "My view" preferences for the 3D Solar System. A per-viewer convenience,
// NOT learner progress: it has its own key and never touches other keys.
export const VIEW_SETTINGS_KEY = "dl.solarView";

export const VIEW_TOGGLES = [
    { key: "showOrbits", label: "Orbit lines", icon: "⭕" },
    { key: "showLabels", label: "Planet names", icon: "🪐" },
    { key: "showMoonLabels", label: "Moon names", icon: "🌙" },
];

export const DEFAULT_VIEW_SETTINGS = {
    showOrbits: true,
    showLabels: true,
    showMoonLabels: false,
};

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
