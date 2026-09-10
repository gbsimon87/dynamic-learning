/**
 * Per-moon detail for the info card, keyed by the search index's namespaced id
 * ("<Planet>/<Moon>"). Sourced from NASA science pages and Wikipedia's moon
 * articles; every key here must match a moon in SolarSystem's planetData.
 *
 * label     — the chip that replaces a planet's "nth from the Sun"
 * diameter  — the second chip
 * summary   — one-line lead shown above the facts
 * facts     — the "Did you know?" list
 */
export const moonFacts = {
    "Earth/Moon": {
        label: "Earth's only moon",
        diameter: "3,474 km across",
        summary: "The only world beyond Earth that people have walked on, and the driver of our ocean tides.",
        facts: [
            "The Moon is about a quarter of Earth's width — roughly as wide as the United States.",
            "It orbits at an average distance of 384,399 km (238,854 miles).",
            "Tidal forces locked its rotation, so the same near side always faces us.",
            "The Moon's gravity is the main driver of Earth's ocean tides.",
            "Twelve people walked on the Moon across six Apollo landings, ending in 1972.",
        ],
    },
    "Mars/Phobos": {
        label: "Mars' inner moon",
        diameter: "26 × 23 × 18 km",
        summary: "A lumpy, fast-moving moon that circles closer to its planet than any other moon in the Solar System.",
        facts: [
            "Phobos races around Mars in just 7 hours and 39 minutes.",
            "From the Martian surface it rises in the west and sets in the east twice a day.",
            "It orbits only about 6,000 km (3,700 miles) above Mars.",
            "Stickney, its largest crater, is 9 km (5.6 miles) wide — a huge bite out of a tiny moon.",
            "Phobos drifts about 2 m closer to Mars every 100 years and may break apart in 30–50 million years.",
        ],
    },
    "Mars/Deimos": {
        label: "Mars' outer moon",
        diameter: "12.5 km across",
        summary: "The smaller, smoother and more distant of Mars' two tiny moons.",
        facts: [
            "Deimos measures only about 12.5 km (7.8 miles) across.",
            "It takes just over 30 hours to circle Mars once.",
            "Dust has partly filled its craters, leaving it smoother than Phobos.",
            "Seen from the surface of Mars it looks almost like a bright star.",
            "Asaph Hall discovered it in August 1877 and named it after the Greek figure of dread.",
        ],
    },
    "Jupiter/Io": {
        label: "Jupiter's volcanic moon",
        diameter: "3,643 km across",
        summary: "The most volcanically active world in the Solar System, endlessly squeezed by Jupiter's gravity.",
        facts: [
            "Io has over 400 active volcanoes — more than anywhere else in the Solar System.",
            "Being pulled between Jupiter, Europa and Ganymede heats its insides by friction.",
            "Sulfur compounds paint its surface yellow, red, white, black and green.",
            "Volcanic plumes shoot as high as 500 km (300 miles) above the ground.",
            "Lava resurfaces Io so fast that it has almost no impact craters.",
        ],
    },
    "Jupiter/Europa": {
        label: "Jupiter's ocean moon",
        diameter: "3,100 km across",
        summary: "A cracked ball of ice hiding a salty ocean with more water than all of Earth's seas.",
        facts: [
            "The ocean beneath its ice may hold two to three times the water in Earth's oceans.",
            "Its ice shell is thought to be 10–30 km (6–20 miles) thick.",
            "Europa is the smoothest known object in the Solar System.",
            "Dark streaks called lineae criss-cross the globe where the crust has shifted.",
            "NASA launched Europa Clipper on 14 October 2024 to test whether it could support life.",
        ],
    },
    "Jupiter/Ganymede": {
        label: "Largest moon in the Solar System",
        diameter: "5,270 km across",
        summary: "Bigger than the planet Mercury, and the only moon known to generate its own magnetic field.",
        facts: [
            "At 5,270 km (3,270 miles) wide, Ganymede is larger than Mercury.",
            "It is the only moon in the Solar System with its own magnetic field.",
            "A hidden ocean may hold more water than every ocean on Earth combined.",
            "Dark cratered ground about four billion years old sits beside lighter grooved terrain.",
            "Ganymede circles Jupiter once every 7 days and 3 hours.",
        ],
    },
    "Jupiter/Callisto": {
        label: "Jupiter's cratered moon",
        diameter: "4,821 km across",
        summary: "The most heavily cratered world we know — a surface almost unchanged since the Solar System formed.",
        facts: [
            "Callisto's surface is the oldest and most cratered in the Solar System.",
            "Its cratered plains are about 4.5 billion years old.",
            "Valhalla, its largest impact scar, has rings reaching 1,800 km from the centre.",
            "A salty ocean 150–200 km deep may lie beneath the crust.",
            "Low radiation makes Callisto a favourite candidate for a future crewed base.",
        ],
    },
    "Jupiter/Amalthea": {
        label: "Jupiter's reddest moon",
        diameter: "252 × 146 × 126 km",
        summary: "A small, lumpy, deep-red moon that may be little more than a loose pile of rubble.",
        facts: [
            "Amalthea has the reddest surface in the Solar System, possibly dusted with sulfur from Io.",
            "Its density is only 0.86 g/cm³ — less dense than water.",
            "That lightness suggests it is icy, or a very porous 'rubble pile'.",
            "It whips around Jupiter in just 11 hours and 57 minutes.",
            "Edward Barnard found it in 1892 — the last moon discovered by eye through a telescope.",
        ],
    },
    "Saturn/Titan": {
        label: "Saturn's largest moon",
        diameter: "5,150 km across",
        summary: "The only moon with a thick atmosphere, and the only other world with rivers, lakes and seas.",
        facts: [
            "Titan is 6% wider than Mercury and the second-largest moon in the Solar System.",
            "Its atmosphere is denser than Earth's, with a surface pressure of 1.45 atmospheres.",
            "The air is about 98.6% nitrogen, with most of the rest methane.",
            "Its rain, rivers, lakes and seas are liquid methane and ethane, not water.",
            "The Huygens probe landed here in 2005; NASA's Dragonfly rotorcraft launches in 2028.",
        ],
    },
    "Saturn/Rhea": {
        label: "Saturn's second-largest moon",
        diameter: "1,528 km across",
        summary: "A bright, crater-covered moon built from about three-quarters ice.",
        facts: [
            "Rhea is roughly three-quarters ice and one-quarter rock.",
            "Bright wispy streaks on its trailing side are ice cliffs along cracks in the crust.",
            "In 2010 NASA found a wisp-thin atmosphere of oxygen and carbon dioxide.",
            "It circles Saturn once every 4.5 days.",
            "Giovanni Cassini discovered Rhea in December 1672.",
        ],
    },
    "Saturn/Enceladus": {
        label: "Saturn's geyser moon",
        diameter: "500 km across",
        summary: "A small icy moon firing water into space from a global ocean beneath its shell.",
        facts: [
            "More than 100 geysers near its south pole spray about 200 kg of water per second.",
            "Four great cracks nicknamed the 'tiger stripes' cut across the south polar region.",
            "That spray supplies most of the material in Saturn's E ring.",
            "A global ocean about 26–31 km deep lies beneath the icy crust.",
            "Its fresh clean ice makes Enceladus the most reflective body in the Solar System.",
        ],
    },
    "Saturn/Mimas": {
        label: "Saturn's 'Death Star' moon",
        diameter: "396 km across",
        summary: "A small icy moon dominated by one enormous crater that makes it look like the Death Star.",
        facts: [
            "Herschel crater is 139 km (86 miles) across, on a moon only 396 km wide.",
            "From the right angle Mimas looks strikingly like the Death Star from Star Wars.",
            "It is the smallest known body rounded into a ball by its own gravity.",
            "An ocean may hide beneath an ice shell 24–31 km thick.",
            "William Herschel discovered Mimas in September 1789.",
        ],
    },
    "Saturn/Tethys": {
        label: "Saturn's canyon moon",
        diameter: "1,060 km across",
        summary: "An almost pure ice moon split by a canyon running most of the way around it.",
        facts: [
            "Ithaca Chasma is over 2,000 km long, 100 km wide and 3 km deep.",
            "Odysseus, its largest crater, is about 400 km across.",
            "With a density of 0.98 g/cm³, Tethys is made almost entirely of water ice.",
            "Its surface is one of the most reflective in the Solar System.",
            "Giovanni Cassini discovered Tethys in 1684.",
        ],
    },
    "Saturn/Dione": {
        label: "Saturn's ice-cliff moon",
        diameter: "1,123 km across",
        summary: "Half ice and half rock, wrapped in bright cliffs that Voyager first mistook for wisps.",
        facts: [
            "Voyager saw mysterious bright 'wisps'; Cassini revealed them as towering ice cliffs.",
            "Rock and water ice make up roughly equal shares of Dione's mass.",
            "A liquid salt-water ocean may sit at the base of its 160 km-thick water layer.",
            "Its leading side is evenly cratered while its trailing side carries the cliffs.",
            "Giovanni Cassini discovered Dione in March 1684.",
        ],
    },
    "Saturn/Iapetus": {
        label: "Saturn's two-tone moon",
        diameter: "1,469 km across",
        summary: "One hemisphere is nearly as dark as coal, the other almost as bright as snow.",
        facts: [
            "Its dark side reflects only 3–5% of light while the bright side reflects 50–60%.",
            "A ridge about 1,300 km long and 13 km high circles its equator, giving it a walnut shape.",
            "Iapetus has the most tilted orbit of Saturn's regular moons and takes 79 days to go round.",
            "Cassini discovered it in 1671 but could only ever see it on one side of Saturn.",
            "He worked out in 1705 that one hemisphere is far dimmer than the other.",
        ],
    },
    "Saturn/Hyperion": {
        label: "Saturn's tumbling moon",
        diameter: "361 × 258 × 204 km",
        summary: "A sponge-like moon that tumbles chaotically, so its spin cannot be predicted for long.",
        facts: [
            "Hyperion tumbles chaotically — its spin can't be predicted more than about 30 days ahead.",
            "Deep, sharp-edged craters give it the look of a giant sponge.",
            "It is roughly 42% empty space inside, with a density of just 0.563 g/cm³.",
            "Cassini flew within 500 km (310 miles) of it in September 2005.",
            "Three astronomers found it independently in September 1848.",
        ],
    },
    "Saturn/Phoebe": {
        label: "Saturn's captured moon",
        diameter: "213 km across",
        summary: "A dark, distant moon orbiting backwards — most likely an icy body Saturn captured.",
        facts: [
            "Phoebe orbits Saturn backwards, the opposite way to most moons.",
            "It is probably a captured centaur — an icy body from the Kuiper belt.",
            "Its surface reflects only 8–9% of the light that hits it.",
            "It orbits nearly four times farther out than Iapetus, taking about 18 months.",
            "William Pickering found it in 1899 — the first moon ever discovered from photographs.",
        ],
    },
    "Uranus/Titania": {
        label: "Largest moon of Uranus",
        diameter: "1,578 km across",
        summary: "The biggest Uranian moon, scarred by a canyon running from the equator nearly to the pole.",
        facts: [
            "Titania is the largest moon of Uranus and the eighth largest in the Solar System.",
            "Messina Chasma runs about 1,500 km (930 miles) from the equator almost to the south pole.",
            "It is made of roughly equal amounts of ice and rock.",
            "There are hints of a wisp-thin carbon dioxide atmosphere.",
            "Only Voyager 2 has seen it close up, during its 1986 flyby of Uranus.",
        ],
    },
    "Uranus/Oberon": {
        label: "Outermost major moon of Uranus",
        diameter: "1,523 km across",
        summary: "The most heavily cratered Uranian moon, with an 11 km mountain on its edge.",
        facts: [
            "Oberon is the outermost and second-largest major moon of Uranus.",
            "It is the most heavily cratered of all the Uranian moons.",
            "Voyager images caught a peak about 11 km high near its south-eastern limb.",
            "Mommur Chasma, its largest canyon, stretches 537 km.",
            "William Herschel found it in January 1787, the same day as Titania.",
        ],
    },
    "Uranus/Umbriel": {
        label: "Darkest moon of Uranus",
        diameter: "1,165 km across",
        summary: "The dimmest of Uranus's big moons, marked by one strange bright ring.",
        facts: [
            "Umbriel reflects less than half as much light as Ariel — the darkest Uranian moon.",
            "A bright ring of material sits on the floor of Wunda crater, about 131 km wide.",
            "Its cratered surface has barely changed since the Late Heavy Bombardment.",
            "It circles Uranus once every 4.1 Earth days.",
            "William Lassell discovered it in 1851 and named it after a character by Alexander Pope.",
        ],
    },
    "Uranus/Ariel": {
        label: "Brightest moon of Uranus",
        diameter: "1,158 km across",
        summary: "The brightest and youngest-looking Uranian moon, cut by long canyons and resurfaced from within.",
        facts: [
            "Ariel reflects 53% of the light it receives — the most of any Uranian moon.",
            "Some of its plains look less than 100 million years old.",
            "Kachina Chasma, its longest canyon, runs over 620 km.",
            "Icy 'lava' — perhaps a water and ammonia slush — may have resurfaced parts of it.",
            "William Lassell discovered Ariel in October 1851.",
        ],
    },
    "Uranus/Miranda": {
        label: "Smallest major moon of Uranus",
        diameter: "470 km across",
        summary: "A jumbled patchwork moon carrying what may be the tallest cliff in the Solar System.",
        facts: [
            "Verona Rupes may be the highest cliff in the Solar System, dropping 5–10 km.",
            "Miranda is the smallest and innermost of Uranus's five round moons.",
            "Chevron-shaped features called coronae give it a patchwork look.",
            "It has one of the most extreme and varied landscapes of any known object.",
            "Gerard Kuiper discovered Miranda in February 1948.",
        ],
    },
    "Neptune/Triton": {
        label: "Neptune's largest moon",
        diameter: "2,710 km across",
        summary: "The only large moon that orbits backwards — probably a dwarf planet Neptune captured.",
        facts: [
            "Triton is the only large moon in the Solar System with a retrograde orbit.",
            "It was likely a Kuiper belt dwarf planet captured by Neptune's gravity.",
            "Voyager 2 saw nitrogen geysers throwing plumes up to 8 km high.",
            "Its wrinkled 'cantaloupe terrain' looks like the skin of a melon.",
            "The coldest spot measured there is −235°C (−391°F).",
        ],
    },
    "Neptune/Nereid": {
        label: "Neptune's far-flung moon",
        diameter: "335–345 km across",
        summary: "A small moon on one of the most stretched-out orbits of any moon we know.",
        facts: [
            "Nereid's orbit is wildly stretched, with an eccentricity of 0.75.",
            "It swings from 1.37 million km out to 9.65 million km from Neptune.",
            "One trip around Neptune takes about 360 days — nearly an Earth year.",
            "It may be a captured object, or a moon flung outward when Triton arrived.",
            "Gerard Kuiper discovered Nereid in May 1949.",
        ],
    },
    "Pluto/Charon": {
        label: "Pluto's giant companion",
        diameter: "1,212 km across",
        summary: "Half Pluto's width — so large that the pair swing around a point in empty space between them.",
        facts: [
            "Charon is just over half Pluto's diameter, the largest moon compared with its planet.",
            "The two are locked facing each other, circling a balance point outside Pluto itself.",
            "A big dark red patch caps its north pole, once nicknamed Mordor.",
            "Serenity Chasma runs at least 1,000 km around its equator.",
            "James Christy discovered Charon in 1978; New Horizons flew past in 2015.",
        ],
    },
};
