/**
 * One quality tier for every Solar System effect, so new effects can switch
 * themselves down on phones and tablets. The rule is the one the meteor
 * experiment has always used: narrow screens or touch-first devices get "low".
 */
const TIERS = new Set(["low", "standard"]);

export function detectQuality({ width, coarsePointer, override = null }) {
    if (TIERS.has(override)) return override;
    return width < 720 || coarsePointer ? "low" : "standard";
}

/**
 * Grown-up testing switches read from the address bar:
 * `?debug` shows the frame-time readout and the bloom controls,
 * `bloom=1` turns bloom on at load, and `quality=low|standard` forces a tier.
 */
export function readDebugFlags(search) {
    const params = new URLSearchParams(search);
    const quality = params.get("quality");
    return {
        debug: params.has("debug"),
        bloom: params.get("bloom") === "1",
        quality: TIERS.has(quality) ? quality : null,
    };
}
