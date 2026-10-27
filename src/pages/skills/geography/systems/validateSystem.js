/**
 * Checks a star system definition: the one data module per system that the
 * scene, tour, cards, flight, travel and galaxy map all read. Returns a list
 * of problems, empty when the definition is complete.
 *
 * Shape (field names every system uses):
 *   id, name, phrase ("the Solar System" / "TRAPPIST-1"), spokenName, home,
 *   place { galaxy, galaxyLabel }, position { raHours, decDeg, distanceLy },
 *   starPhrase ("the Sun"), stars [{ id, name, spokenName, radius, look, light, card? }],
 *   planets [{ id, name, spokenName, kindLabel, classification?, radius, distance,
 *     speed, orbit?, tilt, tidallyLocked?, hasRings?, look, moons, tourNarration,
 *     facts, closer?, play?, stats?, sections?, lineUp? }],
 *   moonDetails { "<planetId>/<moonName>": {...} },
 *   tour { stops, finish, finishLabel },
 *   flight { edgeRadius, startBodyId, clues, chapters?, badges }: a clue may have
 *     `then` (a second step) and `question` { text, options (2–3), answer, why };
 *     chapters [{ id, name, icon, promise, clueIds }] must use every clue.
 *   scene { camera, honesty, scaleNote }, welcome, mapCard, extras, sources.
 */

import { SYSTEM_REGISTRY } from "./registry.js";

const REQUIRED = ["id", "name", "phrase", "spokenName", "home", "place", "position", "starPhrase", "stars", "planets",
    "moonDetails", "tour", "flight", "scene", "welcome", "mapCard", "extras", "sources"];

// Flight targets that only exist when a home extra builds them.
const EXTRA_TARGETS = { ISS: "iss", "asteroid-belt": "asteroidBelt", "halleys-comet": "comet",
    Ceres: "namedAsteroids", Vesta: "namedAsteroids", Psyche: "namedAsteroids", Bennu: "namedAsteroids" };

export function validateSystem(system) {
    const problems = [];
    for (const key of REQUIRED) {
        if (!(key in system)) problems.push(`missing field: ${key}`);
    }
    const stars = system.stars ?? [];
    const planets = system.planets ?? [];
    if (stars.length === 0) problems.push("needs at least one star");

    const ids = [];
    for (const body of [...stars, ...planets]) {
        ids.push(body.id);
        if (!body.spokenName) problems.push(`missing spokenName on ${body.id}`);
        // Cards read "closer" as a list of paragraphs, and facts as a list.
        const closer = body.closer ?? body.card?.closer;
        if (closer !== undefined && !Array.isArray(closer)) problems.push(`closer on ${body.id} must be a list of paragraphs`);
        const facts = body.facts ?? body.card?.facts;
        if (facts !== undefined && !Array.isArray(facts)) problems.push(`facts on ${body.id} must be a list`);
    }
    for (const planet of planets) {
        for (const moon of planet.moons ?? []) ids.push(`${planet.id}/${moon.name}`);
        for (const key of ["eccentricity", "inclination", "ascendingNode", "perihelionLongitude", "meanLongitude"]) {
            if (typeof planet.orbit?.[key] !== "number") problems.push(`orbit.${key} on ${planet.id} must be a number`);
        }
        const play = planet.play;
        if (play) {
            for (const key of ["gravity", "yearInEarthYears"]) {
                if (key in play && typeof play[key] !== "number") problems.push(`play.${key} on ${planet.id} must be a number`);
            }
        }
    }
    const seen = new Set();
    for (const id of ids) {
        if (seen.has(id)) problems.push(`duplicate body id: ${id}`);
        seen.add(id);
    }

    const extras = system.extras ?? {};
    // "sign:<id>" is the signpost to another registered system (systems/signposts.js).
    const signTo = (id) => id?.startsWith("sign:") && id.slice(5) !== system.id && SYSTEM_REGISTRY.some((entry) => entry.id === id.slice(5));
    const isTarget = (id) => seen.has(id) || Boolean(EXTRA_TARGETS[id] && extras[EXTRA_TARGETS[id]]) || signTo(id);

    const flight = system.flight ?? {};
    if (!seen.has(flight.startBodyId)) problems.push(`flight.startBodyId is no body: ${flight.startBodyId}`);
    const clueIds = new Set();
    for (const clue of flight.clues ?? []) {
        for (const step of clue.then ? [clue, clue.then] : [clue]) {
            if (clueIds.has(step.id)) problems.push(`duplicate clue id: ${step.id}`);
            clueIds.add(step.id);
            if (!isTarget(step.target)) problems.push(`clue ${step.id} targets no body: ${step.target}`);
            const question = step.question;
            if (!question) continue;
            if (!Array.isArray(question.options) || question.options.length < 2 || question.options.length > 3) problems.push(`question on ${step.id} needs 2 or 3 options`);
            if (!question.options?.includes(question.answer)) problems.push(`question on ${step.id}: answer ${question.answer} is not an option`);
            if (!question.text || !question.why) problems.push(`question on ${step.id} needs text and why`);
        }
    }
    if (flight.chapters) {
        const inChapter = new Set(flight.chapters.flatMap((chapter) => chapter.clueIds));
        for (const chapter of flight.chapters) {
            for (const id of chapter.clueIds) if (!flight.clues.some((clue) => clue.id === id)) problems.push(`chapter ${chapter.id} lists no clue: ${id}`);
        }
        for (const clue of flight.clues ?? []) if (!inChapter.has(clue.id)) problems.push(`clue ${clue.id} is in no chapter`);
    }
    for (const stop of system.tour?.stops ?? []) {
        if (!seen.has(stop)) problems.push(`tour stop is no body: ${stop}`);
    }
    if (!system.home && !(system.sources?.length > 0)) problems.push("needs sources for its numbers");
    return problems;
}
