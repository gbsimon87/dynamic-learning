// What a planet or moon card shows, built from the system definition. The
// scene and the card tests both use these, so a new system's cards need no
// card code. No Three.js or React here.

function ordinal(order) {
    if (order % 10 === 1 && order !== 11) return `${order}st`;
    if (order % 10 === 2 && order !== 12) return `${order}nd`;
    if (order % 10 === 3 && order !== 13) return `${order}rd`;
    return `${order}th`;
}

export function buildPlanetInfo(system, planet, index) {
    const moons = planet.moons.length;
    return {
        kind: "planet",
        id: planet.id,
        name: planet.name,
        classification: planet.classification ?? `${ordinal(index + 1)} planet from ${system.starPhrase}`,
        moonSummary: moons === 0 ? "No featured moons" : `${moons} featured moon${moons === 1 ? "" : "s"}`,
        narration: planet.tourNarration,
        facts: planet.facts,
        factsHeading: "Did you know?",
        summary: null,
        parentName: null,
        parentId: null,
        closer: planet.closer,
        play: planet.play,
        stats: planet.stats,
        sections: planet.sections,
        lineUp: planet.lineUp,
        // The child's own planet, where their age is their age.
        isHomeWorld: system.home && planet.id === system.flight.startBodyId,
        honesty: system.home ? null : system.scene.honesty,
    };
}

export function buildMoonInfo(system, planet, moon) {
    const id = `${planet.id}/${moon.name}`;
    // Every featured moon has details; the fallbacks only guard a future moon
    // added without them.
    const details = system.moonDetails[id];
    return {
        kind: "moon",
        id,
        name: moon.name,
        classification: details?.label ?? "Moon",
        moonSummary: details?.diameter ?? `${planet.name} system`,
        narration: details?.summary ?? planet.tourNarration,
        summary: details?.summary ?? null,
        facts: details?.facts ?? planet.facts,
        factsHeading: "Did you know?",
        parentName: planet.name,
        parentId: planet.id,
        play: moon.play,
        sections: moon.sections,
        honesty: system.home ? null : system.scene.honesty,
    };
}

// A star with a `card` (systems other than home): same card, no birthday or scales.
export function buildStarInfo(system, star) {
    return {
        kind: "star",
        id: star.id,
        name: star.name,
        classification: star.card.classification,
        moonSummary: star.card.summary ?? "",
        narration: star.card.tourNarration,
        facts: star.card.facts,
        factsHeading: "Did you know?",
        summary: null,
        parentName: null,
        parentId: null,
        closer: star.card.closer,
        play: undefined,
        sections: undefined,
        honesty: system.home ? null : system.scene.honesty,
    };
}
