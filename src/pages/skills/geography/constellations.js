/**
 * Constellations for the star explorer, in browse order.
 *
 * Coordinates are real J2000 right ascension (hours) and declination (degrees),
 * not hand-drawn chart positions, so constellationProjection.js can both draw
 * the flat chart today and place these stars on a celestial sphere later.
 *
 * lines  — pairs of star ids, so reordering `stars` cannot redraw the figure
 * facts  — the "Did you know?" list, same register as planetData.facts
 */
export const constellations = [
    {
        id: "ursa-major",
        name: "Ursa Major",
        alsoKnownAs: "The Great Bear · The Plough · The Big Dipper",
        description:
            "Ursa Major is one of the easiest star patterns to spot — seven bright stars that look like a giant saucepan. It is part of a much bigger constellation that people have imagined as a great bear for thousands of years.",
        narration:
            "Ursa Major. Seven bright stars make a shape like a giant saucepan, high in the northern sky. Follow the two stars at the end of the pan and they point you straight to the North Star.",
        facts: [
            "The seven bright stars of the Plough are only part of a much larger constellation called the Great Bear.",
            "Dubhe and Merak are called the Pointers — draw a line through them and it takes you straight to the North Star.",
            "Mizar, in the handle, has a tiny companion star called Alcor. People once used the pair to test their eyesight.",
            "From the UK, Ursa Major never sets. It circles the North Star all year round.",
            "The stars only look close together. Dubhe is more than twice as far from us as Megrez, even though they sit side by side in the bowl.",
        ],
        // The bowl, from its outer lip round to the handle join.
        stars: [
            { id: "dubhe", name: "Dubhe", raHours: 11.06213, decDeg: 61.75103, magnitude: 1.79 },
            { id: "merak", name: "Merak", raHours: 11.03069, decDeg: 56.38242, magnitude: 2.37 },
            { id: "phecda", name: "Phecda", raHours: 11.89718, decDeg: 53.69475, magnitude: 2.44 },
            { id: "megrez", name: "Megrez", raHours: 12.25710, decDeg: 57.03261, magnitude: 3.31 },
            { id: "alioth", name: "Alioth", raHours: 12.90049, decDeg: 55.95983, magnitude: 1.77 },
            { id: "mizar", name: "Mizar", raHours: 13.39876, decDeg: 54.92536, magnitude: 2.23 },
            { id: "alkaid", name: "Alkaid", raHours: 13.79234, decDeg: 49.31328, magnitude: 1.86 },
        ],
        lines: [
            ["dubhe", "merak"],
            ["merak", "phecda"],
            ["phecda", "megrez"],
            ["megrez", "dubhe"],
            ["megrez", "alioth"],
            ["alioth", "mizar"],
            ["mizar", "alkaid"],
        ],
    },
];
