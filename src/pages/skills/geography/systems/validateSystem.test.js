import test from "node:test";
import assert from "node:assert/strict";
import { validateSystem } from "./validateSystem.js";

function minimalSystem(overrides = {}) {
    return {
        id: "mini", name: "Mini", phrase: "Mini", spokenName: "Mini", home: false,
        place: { galaxy: "milky-way", galaxyLabel: "Milky Way" },
        position: { raHours: 1, decDeg: 2, distanceLy: 3 },
        starPhrase: "Mini",
        stars: [{ id: "mini-star", name: "Mini star", spokenName: "Mini star", radius: 2, look: { color: 0xffffff }, light: { color: 0xffffff, intensity: 1 } }],
        planets: [
            { id: "mini-b", name: "Mini b", spokenName: "Mini B", kindLabel: "Planet", radius: 0.4, distance: 10, speed: 0.01, tilt: 0, orbit: { eccentricity: 0, inclination: 0, ascendingNode: 0, perihelionLongitude: 0, meanLongitude: 0 }, look: { procedural: { kind: "rocky" } }, moons: [{ name: "Tiny", radius: 0.1, distance: 1, speed: 0.02 }], tourNarration: "b", facts: ["b"], play: { yearInEarthYears: 0.01, gravity: 1, hasSurface: true } },
        ],
        moonDetails: {},
        tour: { stops: ["mini-b"], finish: "end", finishLabel: "Finish the tour" },
        flight: { edgeRadius: 50, startBodyId: "mini-b", clues: [{ id: "c1", target: "mini-b/Tiny", clue: "c", hint: "h", fact: "f" }], badges: [] },
        scene: { camera: { position: [0, 1, 2], target: [0, 0, 0] }, honesty: null, scaleNote: "squeezed" },
        welcome: null,
        mapCard: { starType: "Star", planetCount: 1, fact: "f" },
        extras: {},
        sources: [{ what: "all", url: "https://example.org" }],
        ...overrides,
    };
}

test("a complete definition has no problems", () => {
    assert.deepEqual(validateSystem(minimalSystem()), []);
});

test("validateSystem reports a missing start body, a clue target that is no body, and a tour stop that is no body", () => {
    const system = minimalSystem({
        flight: { edgeRadius: 50, startBodyId: "nowhere", clues: [{ id: "c1", target: "ghost", clue: "c", hint: "h", fact: "f" }], badges: [] },
        tour: { stops: ["mini-b", "phantom"], finish: "end", finishLabel: "Finish" },
    });
    const problems = validateSystem(system);
    assert.ok(problems.some((p) => p.includes("startBodyId") && p.includes("nowhere")), problems.join("\n"));
    assert.ok(problems.some((p) => p.includes("clue c1") && p.includes("ghost")), problems.join("\n"));
    assert.ok(problems.some((p) => p.includes("tour stop") && p.includes("phantom")), problems.join("\n"));
});

test("extra-provided targets count only when their extra is on", () => {
    const clue = { id: "iss", target: "ISS", clue: "c", hint: "h", fact: "f" };
    const off = minimalSystem({ flight: { edgeRadius: 50, startBodyId: "mini-b", clues: [clue], badges: [] } });
    assert.ok(validateSystem(off).some((p) => p.includes("ISS")));
    const on = minimalSystem({ extras: { iss: { body: "mini-b" } }, flight: { edgeRadius: 50, startBodyId: "mini-b", clues: [clue], badges: [] } });
    assert.deepEqual(validateSystem(on), []);
});

test("missing fields, spoken names, stars and sources are reported", () => {
    const { welcome: _welcome, ...noWelcome } = minimalSystem();
    assert.ok(validateSystem(noWelcome).some((p) => p.includes("welcome")));
    const silent = minimalSystem();
    delete silent.planets[0].spokenName;
    assert.ok(validateSystem(silent).some((p) => p.includes("spokenName") && p.includes("mini-b")));
    assert.ok(validateSystem(minimalSystem({ stars: [] })).some((p) => p.includes("star")));
    assert.ok(validateSystem(minimalSystem({ sources: [] })).some((p) => p.includes("sources")));
    assert.deepEqual(validateSystem(minimalSystem({ home: true, sources: [] })), []);
});

test("duplicate body ids and non-numeric play values are reported", () => {
    const twin = minimalSystem();
    twin.planets.push({ ...twin.planets[0] });
    assert.ok(validateSystem(twin).some((p) => p.includes("duplicate") && p.includes("mini-b")));
    const odd = minimalSystem();
    odd.planets[0].play = { gravity: "heavy", hasSurface: true };
    assert.ok(validateSystem(odd).some((p) => p.includes("gravity")));
});

test("closer and facts must be lists", () => {
    const wrong = minimalSystem();
    wrong.planets[0].closer = "one string";
    wrong.planets[0].facts = "one string";
    const problems = validateSystem(wrong);
    assert.ok(problems.some((p) => p.includes("closer")));
    assert.ok(problems.some((p) => p.includes("facts")));
});

test("a planet without orbit elements is reported", () => {
    const flat = minimalSystem();
    delete flat.planets[0].orbit;
    assert.ok(validateSystem(flat).some((p) => p.includes("orbit.eccentricity") && p.includes("mini-b")));
});

test("a sign clue counts only when it points to another known system", () => {
    const base = minimalSystem();
    const withSign = (target) => ({ ...base, flight: { ...base.flight, clues: [...base.flight.clues, { id: "sign", target, clue: "c", hint: "h", fact: "f" }] } });
    assert.deepEqual(validateSystem(withSign("sign:solar-system")), []);
    assert.deepEqual(validateSystem(withSign("sign:nowhere")), ["clue sign targets no body: sign:nowhere"]);
    assert.deepEqual(validateSystem(withSign("sign:mini")), ["clue sign targets no body: sign:mini"]);
});

test("asteroid clue targets need the namedAsteroids extra", () => {
    const clue = { id: "ceres", target: "Ceres", clue: "c", hint: "h", fact: "f" };
    const flight = { edgeRadius: 50, startBodyId: "mini-b", clues: [clue], badges: [] };
    assert.ok(validateSystem(minimalSystem({ flight })).some((p) => p.includes("Ceres")));
    assert.deepEqual(validateSystem(minimalSystem({ flight, extras: { namedAsteroids: true } })), []);
});

test("second steps, questions and chapters are checked", () => {
    const good = { id: "c1", target: "mini-b", clue: "c", hint: "h", fact: "f",
        question: { text: "q", options: ["A", "B"], answer: "A", why: "w" },
        then: { id: "c1b", target: "mini-b/Tiny", clue: "c", hint: "h", fact: "f" } };
    const flight = (clues, chapters) => ({ edgeRadius: 50, startBodyId: "mini-b", clues, badges: [], ...(chapters ? { chapters } : {}) });
    assert.deepEqual(validateSystem(minimalSystem({ flight: flight([good], [{ id: "all", name: "All", icon: "🚀", promise: "p", clueIds: ["c1"] }]) })), []);
    const problems = validateSystem(minimalSystem({ flight: flight([
        { ...good, then: { ...good.then, target: "ghost" } },
        { ...good, id: "c2", then: undefined, question: { text: "q", options: ["A"], answer: "Z", why: "w" } },
        { ...good, id: "c3", then: { ...good.then, id: "c1b" } },
    ], [{ id: "x", name: "X", icon: "🚀", promise: "p", clueIds: ["c1", "nope"] }]) }));
    const has = (text) => assert.ok(problems.some((p) => p.includes(text)), `${text}\n${problems.join("\n")}`);
    has("clue c1b targets no body: ghost");
    has("question on c2 needs 2 or 3 options");
    has("question on c2: answer Z is not an option");
    has("duplicate clue id: c1b");
    has("chapter x lists no clue: nope");
    has("clue c2 is in no chapter");
});
