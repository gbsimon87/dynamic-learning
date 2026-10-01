/**
 * Shared speech-synthesis helpers: one British voice for the whole app.
 *
 * Used by the Solar System page (the planet tour and the constellation
 * explorer) and by the English curriculum challenges (SpeakButton). None of
 * them owns the browser's single speech queue, so each `speak` replaces
 * whatever was being said.
 *
 * Mute stays with each caller rather than living here: the Solar System has
 * its own narration mute, and the challenge kit follows the app-wide sound
 * switch (see SpeakButton). Nothing here plays on its own.
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

/**
 * Speaks `text` and resolves when it has finished, been cancelled or failed,
 * so a caller can, say, re-enable a button. Resolves at once when speech is
 * unsupported.
 */
export function speakAndWait(text, options = {}) {
    return new Promise((resolve) => {
        if (!isNarrationSupported() || !text) {
            resolve();
            return;
        }
        stopNarration();
        const utterance = new window.SpeechSynthesisUtterance(text);
        Object.assign(utterance, VOICE, options);
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
    });
}
