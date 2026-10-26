// Every star system a child can visit, kept light: what the galaxy map,
// signposts and travel need. A system's full definition (and its pictures)
// loads only when the child goes there. Adding a system adds one entry here
// (see the add-star-system skill).
import { HOME_SYSTEM } from "./home.js";
import { directionBetween, positionLy } from "./systemMath.js";

export const HOME_SYSTEM_ID = HOME_SYSTEM.id;

function entryFor(system, load) {
    const { id, name, phrase, spokenName, home, place, position, mapCard } = system;
    return { id, name, phrase, spokenName, home, place, position, mapCard, load };
}

export const SYSTEM_REGISTRY = [
    entryFor(HOME_SYSTEM, () => Promise.resolve(HOME_SYSTEM)),
    // Light entry from the small data below; the full definition loads on arrival.
    {
        id: "trappist-1", name: "TRAPPIST-1", phrase: "TRAPPIST-1", spokenName: "TRAPPIST one", home: false,
        place: { galaxy: "milky-way", galaxyLabel: "Milky Way" },
        position: { raHours: 23.1084, decDeg: -5.0435, distanceLy: 40.66 },
        mapCard: { starType: "Ultracool red dwarf", planetCount: 7, fact: "All seven planets would fit inside Mercury's orbit." },
        load: () => import("./trappist1.js").then((module) => module.TRAPPIST_1),
    },
];

export function registryEntry(id) {
    return SYSTEM_REGISTRY.find((entry) => entry.id === id) ?? null;
}

export function loadSystem(id) {
    const entry = registryEntry(id);
    return entry ? entry.load() : Promise.reject(new Error(`No star system called ${id}`));
}

export function otherSystems(id) {
    return SYSTEM_REGISTRY.filter((entry) => entry.id !== id);
}

/**
 * A trip from one system to another, for free flight: where it goes, which
 * way and how far in light-years. `toId` defaults to the first other system
 * (with two systems, the other one). Null when there is nowhere to go.
 */
export function tripDestination(fromId, toId = otherSystems(fromId)[0]?.id, entries = SYSTEM_REGISTRY) {
    const from = entries.find((entry) => entry.id === fromId);
    const to = entries.find((entry) => entry.id === toId);
    if (!from || !to || from === to) return null;
    const a = positionLy(from.position), b = positionLy(to.position);
    return {
        id: to.id, phrase: to.phrase, spokenName: to.spokenName ?? to.phrase, toHome: Boolean(to.home),
        direction: directionBetween(a, b), distanceLy: Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z),
    };
}
