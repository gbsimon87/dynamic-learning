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
 *   flight { edgeRadius, startBodyId, clues, badges },
 *   scene { camera, honesty, scaleNote }, welcome, mapCard, extras, sources.
 */

import { SYSTEM_REGISTRY } from "./registry.js";

const REQUIRED = ["id", "name", "phrase", "spokenName", "home", "place", "position", "starPhrase", "stars", "planets",
    "moonDetails", "tour", "flight", "scene", "welcome", "mapCard", "extras", "sources"];

// Flight targets that only exist when a home extra builds them.
const EXTRA_TARGETS = { ISS: "iss", "asteroid-belt": "asteroidBelt", "halleys-comet": "comet" };

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
    for (const clue of flight.clues ?? []) {
        if (!isTarget(clue.target)) problems.push(`clue ${clue.id} targets no body: ${clue.target}`);
    }
    for (const stop of system.tour?.stops ?? []) {
        if (!seen.has(stop)) problems.push(`tour stop is no body: ${stop}`);
    }
    if (!system.home && !(system.sources?.length > 0)) problems.push("needs sources for its numbers");
    return problems;
}
