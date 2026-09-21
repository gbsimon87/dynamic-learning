/**
 * Constellations for the star explorer, in browse order.
 *
 * Coordinates are real J2000 right ascension (hours), declination (degrees),
 * and apparent magnitude from the HYG v4.1 catalogue. The western stick
 * figures follow Stellarium's sky-culture catalogue; the IAU defines official
 * constellation regions, but it does not prescribe one set of connecting
 * lines.
 *
 * Sources:
 * - https://github.com/astronexus/HYG-Database/tree/main/hyg/CURRENT
 * - https://github.com/Stellarium/stellarium-skycultures/tree/master/western
 *
 * lines  — pairs of star ids, so reordering `stars` cannot redraw the figure
 * label  — false hides a minor star's chart label without hiding the star
 * labelPosition — "below" moves a crowded label beneath its star
 * facts  — the "Did you know?" list, same register as planetData.facts
 */
export const constellations = [
    {
        id: "ursa-major",
        name: "Ursa Major",
        alsoKnownAs: "The Great Bear · home of the Plough (Big Dipper)",
        description:
            "The seven bright stars of the Plough are Ursa Major's best-known part. Follow the fainter stars beyond its bowl and you can trace the Great Bear's head, legs and body too.",
        narration:
            "Ursa Major, the Great Bear. The seven bright stars of the Plough form its back and long tail, while fainter stars complete its head and legs. Follow the two stars at the end of the bowl and they point towards the North Star.",
        facts: [
            "The Plough, also called the Big Dipper, is an asterism: a smaller star pattern inside the much larger Ursa Major constellation.",
            "Dubhe and Merak are called the Pointers — draw a line through them and it leads towards Polaris, the North Star.",
            "Mizar, in the handle, has a companion called Alcor. On a clear night, some people can see both without a telescope.",
            "From the UK, much of Ursa Major can be seen throughout the year as it circles the North Star.",
            "The stars only look close together. They are actually at very different distances from Earth.",
        ],
        stars: [
            { id: "alkaid", name: "Alkaid", raHours: 13.792354, decDeg: 49.313265, magnitude: 1.85 },
            { id: "mizar", name: "Mizar", raHours: 13.398747, decDeg: 54.925362, magnitude: 2.23 },
            { id: "alioth", name: "Alioth", raHours: 12.900472, decDeg: 55.959821, magnitude: 1.76, labelPosition: "below" },
            { id: "megrez", name: "Megrez", raHours: 12.257086, decDeg: 57.032617, magnitude: 3.32 },
            { id: "dubhe", name: "Dubhe", raHours: 11.062155, decDeg: 61.751033, magnitude: 1.81 },
            { id: "merak", name: "Merak", raHours: 11.030677, decDeg: 56.382427, magnitude: 2.34 },
            { id: "phecda", name: "Phecda", raHours: 11.897168, decDeg: 53.694760, magnitude: 2.41, labelPosition: "below" },
            { id: "taiyangshou", name: "Taiyangshou", raHours: 11.767515, decDeg: 47.779406, magnitude: 3.69, label: false },
            { id: "psi-uma", name: "Psi Ursae Majoris", raHours: 11.161062, decDeg: 44.498487, magnitude: 3.00, label: false },
            { id: "tania-borealis", name: "Tania Borealis", raHours: 10.284952, decDeg: 42.914365, magnitude: 3.45 },
            { id: "tania-australis", name: "Tania Australis", raHours: 10.372155, decDeg: 41.499516, magnitude: 3.06, labelPosition: "below" },
            { id: "phi-uma", name: "Phi Ursae Majoris", raHours: 9.868433, decDeg: 54.064332, magnitude: 4.55, label: false },
            { id: "theta-uma", name: "Theta Ursae Majoris", raHours: 9.547715, decDeg: 51.677300, magnitude: 3.17, label: false },
            { id: "alkaphrah", name: "Alkaphrah", raHours: 9.060427, decDeg: 47.156525, magnitude: 3.57, label: false },
            { id: "talitha", name: "Talitha", raHours: 8.986828, decDeg: 48.041826, magnitude: 3.12 },
            { id: "upsilon-uma", name: "Upsilon Ursae Majoris", raHours: 9.849867, decDeg: 59.038735, magnitude: 3.78, label: false },
            { id: "muscida", name: "Muscida", raHours: 8.504431, decDeg: 60.718169, magnitude: 3.35 },
            { id: "23-uma", name: "23 Ursae Majoris", raHours: 9.525453, decDeg: 63.061861, magnitude: 3.65, label: false },
        ],
        lines: [
            ["alkaid", "mizar"], ["mizar", "alioth"], ["alioth", "megrez"],
            ["megrez", "dubhe"], ["dubhe", "merak"], ["merak", "phecda"],
            ["phecda", "megrez"], ["phecda", "taiyangshou"],
            ["taiyangshou", "psi-uma"], ["psi-uma", "tania-borealis"],
            ["psi-uma", "tania-australis"], ["merak", "phi-uma"],
            ["phi-uma", "theta-uma"], ["theta-uma", "alkaphrah"],
            ["theta-uma", "talitha"], ["phi-uma", "upsilon-uma"],
            ["upsilon-uma", "muscida"], ["muscida", "23-uma"], ["23-uma", "dubhe"],
        ],
    },
    {
        id: "ursa-minor",
        name: "Ursa Minor",
        alsoKnownAs: "The Little Bear · the Little Dipper",
        description:
            "Ursa Minor looks like a smaller, fainter ladle. Polaris sits at the very end of its curved handle, almost directly above Earth's North Pole.",
        narration:
            "Ursa Minor, the Little Bear. Polaris, the North Star, shines at the tip of its tail. The whole sky appears to turn around this special star during the night.",
        facts: [
            "Polaris is not the brightest star in the sky, but it is a brilliant guide because it stays in almost the same place all night.",
            "The two bright stars at the far end of the bowl are Kochab and Pherkad. They are sometimes called the Guardians of the Pole.",
            "Ursa Minor can be seen from the UK all year round.",
            "Polaris is actually a system of three stars, although it looks like one point of light to our eyes.",
        ],
        stars: [
            { id: "polaris", name: "Polaris", raHours: 2.529750, decDeg: 89.264109, magnitude: 1.97 },
            { id: "yildun", name: "Yildun", raHours: 17.536918, decDeg: 86.586460, magnitude: 4.35 },
            { id: "epsilon-umi", name: "Epsilon Ursae Minoris", raHours: 16.766159, decDeg: 82.037262, magnitude: 4.21, label: false },
            { id: "zeta-umi", name: "Zeta Ursae Minoris", raHours: 15.734299, decDeg: 77.794493, magnitude: 4.29, label: false },
            { id: "eta-umi", name: "Eta Ursae Minoris", raHours: 16.291791, decDeg: 75.755330, magnitude: 4.95, label: false },
            { id: "pherkad", name: "Pherkad", raHours: 15.345483, decDeg: 71.834016, magnitude: 3.00 },
            { id: "kochab", name: "Kochab", raHours: 14.845105, decDeg: 74.155505, magnitude: 2.07 },
        ],
        lines: [
            ["polaris", "yildun"], ["yildun", "epsilon-umi"],
            ["epsilon-umi", "zeta-umi"], ["zeta-umi", "eta-umi"],
            ["eta-umi", "pherkad"], ["pherkad", "kochab"], ["kochab", "zeta-umi"],
        ],
    },
    {
        id: "cassiopeia",
        name: "Cassiopeia",
        alsoKnownAs: "The Queen · the W constellation",
        description:
            "Five bright stars make Cassiopeia's famous zigzag. Depending on the season and time of night, it can look like a W, an M, or a lopsided crown.",
        narration:
            "Cassiopeia, the Queen. Look for five bright stars making a giant W in the northern sky. As Earth turns, the W circles the North Star and sometimes looks like an M.",
        facts: [
            "Cassiopeia lies on the opposite side of Polaris from the Plough, so one can help you find the other.",
            "Its five-star W is one of the easiest patterns to recognise in the northern sky.",
            "Cassiopeia is visible from the UK throughout the year.",
            "The constellation sits in a bright band of the Milky Way, so binoculars reveal many more stars around it.",
        ],
        stars: [
            { id: "caph", name: "Caph", raHours: 0.152887, decDeg: 59.149780, magnitude: 2.28 },
            { id: "schedar", name: "Schedar", raHours: 0.675116, decDeg: 56.537331, magnitude: 2.24 },
            { id: "cih", name: "Cih", raHours: 0.945143, decDeg: 60.716740, magnitude: 2.15 },
            { id: "ruchbah", name: "Ruchbah", raHours: 1.430216, decDeg: 60.235283, magnitude: 2.66 },
            { id: "segin", name: "Segin", raHours: 1.906584, decDeg: 63.670101, magnitude: 3.35 },
        ],
        lines: [
            ["caph", "schedar"], ["schedar", "cih"],
            ["cih", "ruchbah"], ["ruchbah", "segin"],
        ],
    },
    {
        id: "cygnus",
        name: "Cygnus",
        alsoKnownAs: "The Swan · the Northern Cross",
        description:
            "Cygnus stretches along the Milky Way like a swan in flight. Its brightest stars also form a huge cross, with Deneb at the top and Albireo at the foot.",
        narration:
            "Cygnus, the Swan. Its long neck and wide wings make a shape called the Northern Cross. Bright Deneb marks the swan's tail, while colourful Albireo marks its beak.",
        facts: [
            "Deneb is one point of the Summer Triangle, together with Vega in Lyra and Altair in Aquila.",
            "Albireo looks like one star to the eye, but a small telescope shows a beautiful gold and blue pair.",
            "Cygnus flies along the Milky Way, a cloudy-looking band made from billions of distant stars.",
            "The Northern Cross is easiest to spot on summer and autumn evenings in the UK.",
        ],
        stars: [
            { id: "kappa-cyg", name: "Kappa Cygni", raHours: 19.285040, decDeg: 53.368459, magnitude: 3.80, label: false },
            { id: "iota-cyg", name: "Iota Cygni", raHours: 19.495098, decDeg: 51.729779, magnitude: 3.76, label: false },
            { id: "fawaris", name: "Fawaris", raHours: 19.749574, decDeg: 45.130810, magnitude: 2.86 },
            { id: "sadr", name: "Sadr", raHours: 20.370473, decDeg: 40.256679, magnitude: 2.23 },
            { id: "deneb", name: "Deneb", raHours: 20.690532, decDeg: 45.280338, magnitude: 1.25 },
            { id: "aljanah", name: "Aljanah", raHours: 20.770178, decDeg: 33.970256, magnitude: 2.48 },
            { id: "zeta-cyg", name: "Zeta Cygni", raHours: 21.215607, decDeg: 30.226916, magnitude: 3.21, label: false },
            { id: "mu-cyg", name: "Mu Cygni", raHours: 21.735710, decDeg: 28.742632, magnitude: 4.49, label: false },
            { id: "eta-cyg", name: "Eta Cygni", raHours: 19.938438, decDeg: 35.083424, magnitude: 3.89, label: false },
            { id: "albireo", name: "Albireo", raHours: 19.512023, decDeg: 27.959681, magnitude: 3.05 },
        ],
        lines: [
            ["kappa-cyg", "iota-cyg"], ["iota-cyg", "fawaris"],
            ["fawaris", "sadr"], ["sadr", "deneb"], ["sadr", "aljanah"],
            ["aljanah", "zeta-cyg"], ["zeta-cyg", "mu-cyg"],
            ["sadr", "eta-cyg"], ["eta-cyg", "albireo"],
        ],
    },
    {
        id: "orion",
        name: "Orion",
        alsoKnownAs: "The Hunter",
        description:
            "Orion is easy to recognise by the three evenly spaced stars in his belt. Four brighter stars around them make the Hunter's shoulders and feet.",
        narration:
            "Orion, the Hunter. Start with the three stars in a neat row that make Orion's Belt. Orange Betelgeuse and blue-white Bellatrix mark his shoulders, while Rigel and Saiph mark his feet.",
        facts: [
            "Alnitak, Alnilam and Mintaka make the famous straight line called Orion's Belt.",
            "Betelgeuse is a red supergiant, while Rigel is a much hotter blue-white supergiant.",
            "In the UK, Orion is a wonderful winter constellation and is easiest to see on dark evenings from late autumn to early spring.",
            "Below the belt is Orion's Sword. The fuzzy middle patch is the Orion Nebula, where new stars are being born.",
        ],
        stars: [
            { id: "meissa", name: "Meissa", raHours: 5.585633, decDeg: 9.934158, magnitude: 3.39 },
            { id: "betelgeuse", name: "Betelgeuse", raHours: 5.919529, decDeg: 7.407063, magnitude: 0.45 },
            { id: "bellatrix", name: "Bellatrix", raHours: 5.418851, decDeg: 6.349702, magnitude: 1.64 },
            { id: "alnitak", name: "Alnitak", raHours: 5.679313, decDeg: -1.942572, magnitude: 1.74 },
            { id: "alnilam", name: "Alnilam", raHours: 5.603559, decDeg: -1.201920, magnitude: 1.69, labelPosition: "below" },
            { id: "mintaka", name: "Mintaka", raHours: 5.533445, decDeg: -0.299092, magnitude: 2.25 },
            { id: "saiph", name: "Saiph", raHours: 5.795941, decDeg: -9.669605, magnitude: 2.07 },
            { id: "rigel", name: "Rigel", raHours: 5.242298, decDeg: -8.201640, magnitude: 0.18 },
        ],
        lines: [
            ["meissa", "betelgeuse"], ["meissa", "bellatrix"],
            ["betelgeuse", "bellatrix"], ["betelgeuse", "alnitak"],
            ["bellatrix", "mintaka"], ["alnitak", "alnilam"],
            ["alnilam", "mintaka"], ["alnitak", "saiph"],
            ["mintaka", "rigel"], ["saiph", "rigel"],
        ],
    },
];
