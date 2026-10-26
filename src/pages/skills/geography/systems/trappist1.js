// TRAPPIST-1: seven rocky planets around a small red star, about 40 light-years
// away. Numbers come from the NASA Exoplanet Archive (Agol et al. 2021 set),
// checked in the build plan's Task 10. Nobody has seen these planets up close,
// so every picture is imagined, and the cards say so.
import { densityGcm3, surfaceGravity, yearInEarthYears } from "./systemMath.js";

const round = (value, places) => Math.round(value * 10 ** places) / 10 ** places;
const REFERENCE_PERIOD = 1.510826; // planet b's year, in days: the scene's quickest spin of the orbit

// width (Earths), mass (Earths), year (days), distance from the star (AU)
const DATA = [
    { letter: "b", width: 1.116, mass: 1.374, days: 1.510826, au: 0.01154 },
    { letter: "c", width: 1.097, mass: 1.308, days: 2.421937, au: 0.0158 },
    { letter: "d", width: 0.788, mass: 0.388, days: 4.049219, au: 0.02227 },
    { letter: "e", width: 0.92, mass: 0.692, days: 6.101013, au: 0.02925 },
    { letter: "f", width: 1.045, mass: 1.039, days: 9.20754, au: 0.03849 },
    { letter: "g", width: 1.129, mass: 1.321, days: 12.352446, au: 0.04683 },
    { letter: "h", width: 0.755, mass: 0.326, days: 18.772866, au: 0.06189 },
];

const LOOKS = {
    b: { kind: "bare-rock", base: 0x3d3a38, accent: 0x6b4a3a },
    c: { kind: "bare-rock", base: 0x4a4440, accent: 0x7a5a45 },
    d: { kind: "rocky", base: 0x8a6a50, accent: 0x5c4535 },
    e: { kind: "rocky", base: 0x6f7f5a, accent: 0x4d5f6f },
    f: { kind: "icy-maybe", base: 0x5f8090, accent: 0x7f6a55 },
    g: { kind: "icy-maybe", base: 0x6f8f88, accent: 0x58704f },
    h: { kind: "icy-maybe", base: 0x7a8a99, accent: 0x5a5f6a },
};

const NARRATION = {
    b: "TRAPPIST-1 b is the closest planet to its star. Its year lasts only one and a half Earth days! Scientists measured it as very hot, about 230 degrees Celsius.",
    c: "TRAPPIST-1 c is a little smaller than Earth. Scientists measured it as hot too, about 107 degrees Celsius, and scientists found no sign of thick air.",
    d: "TRAPPIST-1 d is smaller than Earth and weighs about a third as much. A year here is just four Earth days.",
    e: "TRAPPIST-1 e is in the water zone, where a planet could be not too hot and not too cold for liquid water. Scientists are very curious about it.",
    f: "TRAPPIST-1 f is also in the water zone. From here, the next planet out, g, looks bigger than our Moon does from Earth!",
    g: "TRAPPIST-1 g is the biggest of the seven, a little wider than Earth, and it is in the water zone too.",
    h: "TRAPPIST-1 h is the smallest and the farthest out. It is far enough from its star that it could be cold and icy.",
};

const FACTS = {
    b: [
        "Its year is 1.5 Earth days long. Earth's is 365.",
        "Scientists measured about 230 °C on its sunny side. That is as hot as a very hot oven.",
        "It may have almost no air, like our Moon.",
    ],
    c: [
        "Its year is 2.4 Earth days long.",
        "Scientists measured about 107 °C on its sunny side. Water would boil away.",
        "It is about the same width as Earth.",
    ],
    d: [
        "It weighs about a third as much as Earth, so you would feel light here.",
        "Its year is 4 Earth days long.",
    ],
    e: [
        "It is in the water zone, so liquid water could be possible. Scientists do not know yet.",
        "Its year is 6 Earth days long.",
        "It is a little smaller than Earth, and its pull is a bit weaker.",
    ],
    f: [
        "It is in the water zone. It might even be icy or covered in water. Scientists are still finding out.",
        "From here, planet g can look bigger in the sky than our Moon does from Earth.",
        "Its year is 9 Earth days long.",
    ],
    g: [
        "It is the biggest planet in the system, and in the water zone.",
        "Its year is 12 Earth days long.",
        "It might have lots of water. Nobody knows yet.",
    ],
    h: [
        "It is the smallest planet, about three-quarters of Earth's width.",
        "Its year is 19 Earth days long.",
        "It is farthest from the star, so it could be cold and icy. Scientists are still finding out.",
    ],
};

const CLOSER = {
    b: ["Because b is so close, its star fills the sky much bigger than our Sun does."],
    c: ["Planets b and c are the two hottest ones, and scientists think neither holds much air."],
    d: ["Planet d is lighter than all the others except h."],
    e: ["Scientists have pointed the James Webb Space Telescope at planets like this one to search for air."],
    f: ["Planets f and g are so close together that g can look bigger than our Moon."],
    g: ["Planets e, f and g make up the water zone."],
    h: ["Planet h's year is the longest here. It takes about 19 Earth days to go once round."],
};

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

function planetFor({ letter, width, mass, days, au }, index) {
    const id = `trappist-1${letter}`;
    const density = densityGcm3(mass, width);
    const stats = [
        { label: "Width", value: `${width} × Earth`, compare: "Earth is 1" },
        { label: "Mass", value: `${mass} × Earth`, compare: "Earth is 1" },
        { label: "Density", value: `${round(density, 1)} g/cm³`, compare: "Earth is 5.5", densityGcm3: density },
        { label: "A year lasts", value: `${round(days, days < 10 ? 1 : 0)} days`, compare: "Earth's lasts 365" },
    ];
    if (letter === "b") stats.push({ label: "Sunny side", value: "about 230 °C", compare: "measured by James Webb" });
    if (letter === "c") stats.push({ label: "Sunny side", value: "about 107 °C", compare: "measured by James Webb" });
    return {
        id,
        name: `TRAPPIST-1 ${letter}`,
        spokenName: `TRAPPIST one ${letter.toUpperCase()}`,
        kindLabel: "Planet",
        classification: `${ORDINALS[index]} planet from TRAPPIST-1`,
        radius: round(0.45 * width, 2),
        distance: round(au * 1000, 1),
        speed: round((0.02 * REFERENCE_PERIOD) / days, 5),
        tilt: 0,
        // Flat, almost circular paths; where each starts is just spread out for the picture.
        orbit: { eccentricity: 0, inclination: 0, ascendingNode: 0, perihelionLongitude: 0, meanLongitude: index * 51.4 },
        tidallyLocked: true,
        moons: [],
        look: { procedural: LOOKS[letter] },
        tourNarration: NARRATION[letter],
        facts: FACTS[letter],
        closer: CLOSER[letter],
        massEarth: mass,
        radiusEarth: width,
        periodDays: days,
        stats,
        play: { yearInEarthYears: yearInEarthYears(days), gravity: round(surfaceGravity(mass, width), 2), hasSurface: true },
    };
}

const planets = DATA.map(planetFor);

export const TRAPPIST_1 = {
    id: "trappist-1",
    name: "TRAPPIST-1",
    phrase: "TRAPPIST-1",
    spokenName: "TRAPPIST one",
    home: false,
    place: { galaxy: "milky-way", galaxyLabel: "Milky Way" },
    position: { raHours: 23.1084, decDeg: -5.0435, distanceLy: 40.66 },
    starPhrase: "TRAPPIST-1",
    stars: [{
        id: "TRAPPIST-1",
        name: "TRAPPIST-1",
        spokenName: "TRAPPIST one",
        radius: 3,
        look: { color: 0xff7a4d, emissive: 0xff6a3a, emissiveIntensity: 0.9 },
        light: { color: 0xffa070, intensity: 300 },
        card: {
            classification: "Ultracool red dwarf star",
            summary: "A small, dim red star",
            tourNarration: "This is TRAPPIST-1, a small red star, only a little wider than Jupiter. Seven planets circle it, all closer than Mercury is to our Sun!",
            facts: [
                "It is only a little wider than Jupiter.",
                "It weighs about 9% as much as our Sun.",
                "Its surface is about 2,560 K, less than half as hot as the Sun's (about 5,770 K).",
                "It often lets off flares, like our Sun does, but much dimmer overall.",
            ],
            closer: ["Because the star is so dim, its planets can huddle close and still not be roasted."],
        },
    }],
    planets,
    moonDetails: {},
    tour: { stops: ["TRAPPIST-1", ...planets.map((planet) => planet.id)], finish: "end", finishLabel: "Finish the tour" },
    flight: {
        edgeRadius: 180,
        startBodyId: "trappist-1e",
        clues: [
            { id: "t1-star", target: "TRAPPIST-1", clue: "Find the small red star that all seven planets circle.", hint: "It is in the middle, glowing red.", fact: "TRAPPIST-1 is only a little wider than Jupiter." },
            { id: "t1-b", target: "trappist-1b", clue: "Find the planet closest to the star. Its year lasts 1.5 Earth days!", hint: "It is the innermost world.", fact: "Planet b goes round its star in just 1.5 Earth days." },
            { id: "t1-c", target: "trappist-1c", clue: "Find the second planet from the star. Scientists measured it as very hot.", hint: "It is next to the innermost world.", fact: "Planet c's sunny side is about 107 °C." },
            { id: "t1-d", target: "trappist-1d", clue: "Find the third planet, the one that is lighter than Earth.", hint: "It is smaller than Earth.", fact: "Planet d weighs about a third as much as Earth." },
            { id: "t1-e", target: "trappist-1e", clue: "Find the fourth planet. It is in the water zone!", hint: "It is the middle of the three water-zone planets.", fact: "Planet e is in the water zone." },
            { id: "t1-f", target: "trappist-1f", clue: "Find the planet that might be icy, and sees g bigger than our Moon.", hint: "It is the fifth planet.", fact: "From f, planet g can look bigger than our Moon." },
            { id: "t1-g", target: "trappist-1g", clue: "Find the biggest planet in the system.", hint: "It is the sixth one out.", fact: "Planet g is the biggest of the seven." },
            { id: "t1-h", target: "trappist-1h", clue: "Find the smallest planet, farthest from the star.", hint: "It is the last one.", fact: "Planet h takes about 19 Earth days to go round." },
            { id: "t1-water-e", target: "trappist-1e", clue: "Find a planet where liquid water might be possible.", hint: "There are three. Pick the middle one!", fact: "Planets e, f and g are in the water zone." },
            { id: "t1-water-f", target: "trappist-1f", clue: "Find the water-zone planet that is next to the biggest planet.", hint: "It is the fifth planet.", fact: "Planet f may be icy or covered in water." },
            { id: "t1-water-g", target: "trappist-1g", clue: "Find a water-zone planet that is a little wider than Earth.", hint: "It is the outermost water-zone planet.", fact: "Planet g is the widest planet of the seven." },
            { id: "t1-sign-home", target: "sign:solar-system", clue: "Find the sign pointing home.", hint: "Fly out towards the edge and look for the green sign.", fact: "Our Sun is out that way, about 41 light-years from here. From TRAPPIST-1 it looks like a faint star." },
            { id: "t1-hot-b", target: "trappist-1b", clue: "Find a planet so hot that scientists think it has almost no air.", hint: "It is the closest to the star.", fact: "Scientists measured about 230 °C on b's sunny side." },
        ],
        badges: [
            { stars: 1, name: "First discovery", icon: "🌟" },
            { stars: 5, name: "Red Star Scout", icon: "🔴" },
            { stars: 10, name: "TRAPPIST Pilot", icon: "🚀" },
        ],
    },
    scene: {
        camera: { position: [0, 45, 85], target: [0, 0, 0] },
        honesty: "Nobody has seen these planets up close. This is a picture to help us imagine.",
        scaleNote: "Sizes, distances and speeds are squeezed and sped up.",
    },
    welcome: "Welcome to TRAPPIST-1, about 40 light-years from home! Seven rocky planets circle this little red star.",
    mapCard: { starType: "Ultracool red dwarf", planetCount: 7, fact: "All seven planets would fit inside Mercury's orbit." },
    extras: {},
    sources: [
        { what: "Planet sizes, masses, years and distances (Agol et al. 2021)", url: "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1" },
        { what: "Seven planets, the water zone and the star", url: "https://science.nasa.gov/exoplanets/trappist1" },
        { what: "Planet b's sunny-side temperature (Greene et al. 2023)", url: "https://esawebb.org/news/weic2309/" },
        { what: "Planet c's sunny-side temperature (Zieba et al. 2023)", url: "https://arxiv.org/abs/2306.10150" },
    ],
};
