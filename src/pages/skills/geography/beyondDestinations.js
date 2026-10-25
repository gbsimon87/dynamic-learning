// Places beyond the Solar System (#113), reached through the warp. The picker
// reads this list now, and the galaxy map (#108) will read the same list later:
// each entry sits in a galaxy → star system (or event) → bodies hierarchy.
// Owner rule: star systems added here are real ones in the Milky Way; other
// galaxies are only seen from outside. No Three.js here, so it is unit-tested
// in node.
//
// `camera`, `edgeRadius` and `bodies` are in the destination scene's own units.
// They are what free flight will need when a destination turns on `canFly`.

export const PRETEND_SHORTCUT = "Getting here was a pretend space shortcut. Real black holes don't lead anywhere.";

export const BEYOND_DESTINATIONS = [
    {
        id: "space-ripples",
        kind: "event",
        // GW150914 was about 1.3 billion light-years away, in an unknown galaxy.
        place: { galaxy: null, galaxyLabel: "Far beyond our galaxy", system: null },
        name: "Space ripples",
        blurb: "Two black holes spin together and make space wobble.",
        pretendLines: [PRETEND_SHORTCUT],
        ready: true,
        canFly: false,
        camera: { position: [0, 26, 58], target: [0, 0, 0] },
        edgeRadius: 160,
        bodies: [
            { id: "black-hole-a", name: "Black hole", radius: 1.6, position: [-6, 0, 0] },
            { id: "black-hole-b", name: "Black hole", radius: 1.4, position: [6, 0, 0] },
        ],
    },
];

/** Only places that really exist: no "coming soon" cards (owner). */
export function availableDestinations(list = BEYOND_DESTINATIONS) {
    return list.filter((destination) => destination.ready);
}

export function destinationById(id) {
    return BEYOND_DESTINATIONS.find((destination) => destination.id === id) ?? null;
}
