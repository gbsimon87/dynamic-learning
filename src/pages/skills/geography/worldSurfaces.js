// Surface maps for Pluto and the featured moons (Earth's Moon and the
// planets use the Solar System Scope maps loaded in SolarSystem.jsx).
// Sources and licences are listed on /credits. Built by
// scripts/geography-assets/build-moon-maps.mjs: unmapped regions get smooth
// colour plus texture borrowed from mapped areas.

const WORLD_SURFACES = {
    Pluto: "pluto",
    Charon: "charon",
    Phobos: "phobos",
    Deimos: "deimos",
    Io: "io",
    Europa: "europa",
    Ganymede: "ganymede",
    Callisto: "callisto",
    Amalthea: "amalthea",
    Titan: "titan",
    Rhea: "rhea",
    Enceladus: "enceladus",
    Mimas: "mimas",
    Tethys: "tethys",
    Dione: "dione",
    Iapetus: "iapetus",
    Hyperion: "hyperion",
    Phoebe: "phoebe",
    Titania: "titania",
    Oberon: "oberon",
    Umbriel: "umbriel",
    Ariel: "ariel",
    Miranda: "miranda",
    Triton: "triton",
    Nereid: "nereid",
};

// No spacecraft has mapped these whole worlds; their pictures are stand-ins
// recoloured from real cratered maps to each moon's observed colour.
export const STAND_IN_SURFACES = ["Amalthea", "Hyperion", "Nereid"];

export const WORLD_SURFACE_NAMES = Object.keys(WORLD_SURFACES);

export function worldSurfacePath(name) {
    const file = WORLD_SURFACES[name];
    return file ? `/static/worlds/${file}.jpg` : null;
}
