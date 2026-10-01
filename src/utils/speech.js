/**
 * Shared speech-synthesis helpers for the Solar System page.
 *
 * The planet tour and the constellation explorer both read short pieces of copy
 * in the same voice. Neither owns the browser's single speech queue, and mute
 * stays with each caller rather than living here, so the two features never
 * need to know about one another.
 */

const VOICE = { lang: "en-GB", rate: 0.95, pitch: 1.02 };

export function isNarrationSupported() {
    return typeof window !== "undefined"
        && typeof window.speechSynthesis?.speak === "function"
        && typeof window.speechSynthesis?.cancel === "function"
        && typeof window.SpeechSynthesisUtterance === "function";
}

export function stopNarration() {
    if (typeof window !== "undefined" && typeof window.speechSynthesis?.cancel === "function") {
        window.speechSynthesis.cancel();
    }
}

export function speak(text, options = {}) {
    if (!isNarrationSupported() || !text) return;
    stopNarration();
    const utterance = new window.SpeechSynthesisUtterance(text);
    Object.assign(utterance, VOICE, options);
    window.speechSynthesis.speak(utterance);
}
