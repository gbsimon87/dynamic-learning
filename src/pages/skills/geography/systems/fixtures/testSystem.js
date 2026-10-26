// A made-up system for tests only: it proves the shared code, registry maths
// and suite work with any definition. Never imported by app code, never shown.
export const TEST_SYSTEM = {
    id: "test-system",
    name: "Test System",
    phrase: "the Test System",
    spokenName: "the Test System",
    home: false,
    place: { galaxy: "milky-way", galaxyLabel: "Milky Way" },
    position: { raHours: 6, decDeg: 0, distanceLy: 10 },
    starPhrase: "Test Star",
    stars: [{ id: "test-star", name: "Test Star", spokenName: "Test Star", radius: 2, look: { color: 0xffeeaa, emissive: 0xffeeaa, emissiveIntensity: 0.8 }, light: { color: 0xffeeaa, intensity: 200 } }],
    planets: [
        { id: "test-b", name: "Test b", spokenName: "Test B", kindLabel: "Planet", radius: 0.45, distance: 12, speed: 0.01, tilt: 0, orbit: { eccentricity: 0, inclination: 0, ascendingNode: 0, perihelionLongitude: 0, meanLongitude: 0 }, tidallyLocked: true,
            look: { procedural: { kind: "rocky", base: 0x886655, accent: 0x554433 } }, moons: [], tourNarration: "Test b is the inner test world.", facts: ["Test b is made up for tests."],
            massEarth: 1, radiusEarth: 1, periodDays: 10, play: { yearInEarthYears: 10 / 365.25, gravity: 1, hasSurface: true },
            stats: [{ label: "Density", value: "5.5 g/cm³", compare: "Earth is 5.5", densityGcm3: 5.5 }] },
        { id: "test-c", name: "Test c", spokenName: "Test C", kindLabel: "Planet", radius: 0.3, distance: 20, speed: 0.005, tilt: 0, orbit: { eccentricity: 0.1, inclination: 2, ascendingNode: 10, perihelionLongitude: 20, meanLongitude: 90 },
            look: { procedural: { kind: "icy-maybe", base: 0xaabbcc, accent: 0x778899 } }, moons: [{ name: "Pebble", radius: 0.05, distance: 1, speed: 0.02 }],
            tourNarration: "Test c is the outer test world.", facts: ["Test c is made up too."] },
    ],
    moonDetails: { "test-c/Pebble": { label: "Test moon", diameter: "1 km", summary: "A pretend moon.", facts: ["Pretend."] } },
    tour: { stops: ["test-star", "test-b", "test-c"], finish: "end", finishLabel: "Finish the tour" },
    flight: { edgeRadius: 60, startBodyId: "test-b", clues: [
        { id: "inner", target: "test-b", clue: "Find the inner world.", hint: "Test b.", fact: "Test b is inside." },
        { id: "pebble", target: "test-c/Pebble", clue: "Find the pretend moon.", hint: "Pebble.", fact: "Pebble is pretend." },
    ], badges: [{ stars: 1, name: "Tester", icon: "🧪" }] },
    scene: { camera: { position: [0, 20, 40], target: [0, 0, 0] }, honesty: "This system is pretend.", scaleNote: "Squeezed." },
    welcome: "Welcome to the Test System.",
    mapCard: { starType: "Test star", planetCount: 2, fact: "It only exists in tests." },
    extras: {},
    sources: [{ what: "everything", url: "https://example.org/test-system" }],
};
