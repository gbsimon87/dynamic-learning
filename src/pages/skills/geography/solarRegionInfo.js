// Background for the child-facing descriptions:
// https://arxiv.org/abs/1704.05552 (Hungaria orbits)
// https://science.nasa.gov/solar-system/asteroids/facts/
// https://science.nasa.gov/dwarf-planets/ceres/facts/
// https://www.nasa.gov/solar-system/how-the-sun-affects-asteroids-in-our-neighborhood/
// https://science.nasa.gov/solar-system/kuiper-belt/facts/
export const SOLAR_REGIONS = [
    {
        id: "hungaria-group", name: "Hungaria Group", kind: "region", kindLabel: "Asteroid group",
        classification: "Asteroid group", moonSummary: "Inside the main belt",
        summary: "The Hungaria Group is a small gathering of asteroids near the inner edge of the main asteroid belt.",
        facts: [
            "These asteroids travel around the Sun just inside the main asteroid belt.",
            "Their paths are tilted, so they travel above and below the plane of most planets.",
            "An asteroid is a small rocky world that orbits the Sun.",
        ],
        closer: ["Look for the narrow group between Mars and the main belt. Its tilted paths make it stand out from the flatter main belt."],
        relatedBodies: [{ id: "Mars", name: "Mars" }, { id: "asteroid-belt", name: "Main Asteroid Belt" }],
    },
    {
        id: "asteroid-belt", name: "Main Asteroid Belt", kind: "region", kindLabel: "Asteroid belt",
        classification: "Asteroid belt", moonSummary: "Between Mars and Jupiter",
        summary: "The main asteroid belt is a wide region of rocky worlds between Mars and Jupiter.",
        facts: [
            "Most of the Solar System's known asteroids are found here.",
            "The rocks are leftovers from when the Solar System formed.",
            "Ceres, the largest body in the belt, is a dwarf planet.",
        ],
        closer: ["Each asteroid follows its own path around the Sun. There is lots of empty space between the real rocks. Our model makes the rocks larger so you can spot the belt."],
        relatedBodies: [{ id: "Mars", name: "Mars" }, { id: "Jupiter", name: "Jupiter" }],
    },
    ...[["l4", "L4", "ahead of", "Leading swarm"], ["l5", "L5", "behind", "Trailing swarm"]].map(([id, point, direction, location]) => ({
        id: `trojans-${id}`, name: `Trojan Asteroids (${point})`, kind: "region", kindLabel: "Trojan swarm",
        classification: "Trojan asteroids", moonSummary: `${point} · ${location}`,
        summary: `This swarm of asteroids travels ${direction} Jupiter on its journey around the Sun.`,
        facts: [
            `The ${point} swarm stays about 60 degrees ${direction} Jupiter.`,
            "Jupiter has two large Trojan swarms, one ahead and one behind.",
            "The Trojans orbit the Sun, sharing Jupiter's orbital path.",
        ],
        closer: ["The pull of the Sun and Jupiter helps keep these asteroids near two places called Lagrange points. L4 is ahead of Jupiter and L5 is behind it. The asteroids move around these places as they travel around the Sun."],
        relatedBodies: [{ id: "Jupiter", name: "Jupiter" }, { id: `trojans-${id === "l4" ? "l5" : "l4"}`, name: `the ${id === "l4" ? "L5" : "L4"} swarm` }],
    })),
    {
        id: "kuiper-belt", name: "Kuiper Belt", kind: "region", kindLabel: "Icy belt",
        classification: "Belt of icy worlds", moonSummary: "Beyond Neptune",
        summary: "The Kuiper Belt is a broad disk of small icy worlds beyond Neptune.",
        facts: [
            "Pluto is one of the dwarf planets in the Kuiper Belt.",
            "These distant worlds contain rock and frozen materials, including water ice.",
            "The Kuiper Belt holds leftovers from the Solar System's early days.",
        ],
        closer: ["This belt is much farther from the Sun than the main asteroid belt. Its icy worlds spread through a thick disk. Our model enlarges the small bodies so you can see where the belt is."],
        relatedBodies: [{ id: "Neptune", name: "Neptune" }, { id: "Pluto", name: "Pluto" }],
    },
];
