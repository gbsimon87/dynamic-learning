// Helpers for the "How old would I be?" and "How heavy would Bix be?" games
// on the planet info card, plus home's play numbers (read by systems/home.js).
// The games read a body's play numbers, never its name. No React, no DOM.
// Weight is always Bix's, never the child's: it is a sensitive topic at this age.

export const BIX_EARTH_KG = 20;

export const PLANET_PLAY = {
    Mercury: { yearInEarthYears: 0.2408, gravity: 0.38, hasSurface: true },
    Venus: { yearInEarthYears: 0.6152, gravity: 0.91, hasSurface: true },
    Earth: { yearInEarthYears: 1, gravity: 1, hasSurface: true },
    Moon: { gravity: 0.166, hasSurface: true, phrase: "the Moon" },
    Mars: { yearInEarthYears: 1.8809, gravity: 0.38, hasSurface: true },
    Jupiter: { yearInEarthYears: 11.862, gravity: 2.53, hasSurface: false },
    Saturn: { yearInEarthYears: 29.457, gravity: 1.07, hasSurface: false },
    Uranus: { yearInEarthYears: 84.011, gravity: 0.89, hasSurface: false },
    Neptune: { yearInEarthYears: 164.79, gravity: 1.14, hasSurface: false },
    Pluto: { yearInEarthYears: 247.94, gravity: 0.063, hasSurface: true },
};

/** Which games a body supports, from its play numbers (none for most moons). */
export function playFor(play) {
    return {
        age: typeof play?.yearInEarthYears === "number",
        weight: typeof play?.gravity === "number",
    };
}

/** Whole birthdays on that body. Null if the body has no year. */
export function ageOn(play, earthAge) {
    if (typeof play?.yearInEarthYears !== "number" || !Number.isFinite(earthAge) || earthAge < 0) return null;
    // A tiny nudge stops float error turning an exact birthday into one fewer.
    const whole = Math.floor(earthAge / play.yearInEarthYears + 1e-9);
    return { whole, birthdaysYet: whole > 0 };
}

/** `isHome`: the child's own planet, where their age is their age. */
export function ageSentence(name, play, earthAge, { isHome = false } = {}) {
    const age = ageOn(play, earthAge);
    if (!age) return null;
    if (isHome) return `On ${name} you're ${earthAge}, of course!`;
    if (!age.birthdaysYet) return `On ${name} you haven't had your first birthday yet!`;
    return `On ${name} you'd be ${age.whole}!`;
}

/** Years under about five weeks read better in Earth days. */
export function yearLine(name, play, { isHome = false } = {}) {
    const years = play?.yearInEarthYears;
    if (!years || isHome) return null;
    if (years < 0.1) return `A year on ${name} is ${(years * 365.25).toFixed(1)} Earth days long.`;
    return `A year on ${name} is ${years.toFixed(1)} Earth years long.`;
}

/** Bix's weight in whole kg, never below 1. Null for a body without gravity. */
export function weightOn(play) {
    if (typeof play?.gravity !== "number") return null;
    return Math.max(1, Math.round(BIX_EARTH_KG * play.gravity));
}

/** `play.phrase` names bodies that read better with "the" ("the Moon"). */
export function weightSentence(name, play, { isHome = false } = {}) {
    const kg = weightOn(play);
    if (kg === null) return null;
    if (isHome) return `On ${name}, Bix weighs ${BIX_EARTH_KG} kg.`;
    if (!play.hasSurface) {
        return `At ${name}'s cloud tops, Bix would weigh ${kg} kg. There is no ground to stand on!`;
    }
    return `On ${play.phrase ?? name}, Bix would weigh ${kg} kg.`;
}
