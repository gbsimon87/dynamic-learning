import { ask, lesson, pic, topic } from "./authoring.js";
import { visual } from "../year3/authoring.js";

const S = ["y1Oceans", "y1OceanOrSea", "y1NaturalEarth"];
const OCEAN = { Pacific: [-140, 2], Atlantic: [-34, 18], Indian: [76, -22], Arctic: [-20, 80], Southern: [-60, -62] };

export const oceansNamed = pic("world", "The five oceans", "A world map with continents named and oceans labelled. The Pacific is on both the left and right edges. The Atlantic is between the Americas and Europe and Africa. The Indian Ocean is between Africa and Australia. The Arctic Ocean is at the top. The Southern Ocean surrounds Antarctica.",
  ["There are five oceans.", "The Pacific is the biggest ocean.", "Oceans are huge areas of salty water."], { names: true, oceans: true });

const lettered = (n, names) => pic("world", `Ocean map ${n}`, `A world map with continents named. Letters mark oceans. ${names.map((o, i) => `Letter ${"ABC"[i]} is in the ${o} Ocean.`).join(" ")}`,
  ["Continents are named. Oceans have letters."], { names: true, markers: names.map((o, i) => ({ id: "ABC"[i], label: `${o} Ocean`, point: OCEAN[o] })) });
const SETS = [["Pacific", "Atlantic", "Indian"], ["Arctic", "Southern", "Atlantic"], ["Indian", "Pacific", "Southern"]];

// C3 — the same ocean on a globe.
const globe = (n, o, center) => {
  const g = pic("globe", `Globe ${n}`, `A globe turned towards the ${o} Ocean. Letter A is in the ocean.`, [], { center, poles: o === "Arctic" || o === "Southern", markers: [{ id: "A", label: `${o} Ocean`, point: OCEAN[o] }] });
  return visual("record", `Globe and map ${n}`, `${g.alt} ${oceansNamed.alt}`, ["Find the same water on the labelled map."], { maps: [g, oceansNamed] });
};
const GLOBES = [["Pacific", [-150, 0], "Atlantic", "Indian"], ["Atlantic", [-30, 15], "Pacific", "Arctic"], ["Indian", [75, -15], "Pacific", "Southern"],
  ["Arctic", [0, 70], "Southern", "Indian"], ["Southern", [-40, -60], "Arctic", "Atlantic"]];

// C4 — the Pacific at both map edges.
const edges = (n, markers) => pic("world", `Map edges ${n}`, `A world map. ${markers.map(([id, place]) => `Letter ${id} is ${place[1]}.`).join(" ")}`,
  ["A flat map cuts the round Earth open.", "The left and right edges join up."], { names: true, markers: markers.map(([id, place]) => ({ id, label: place[1], point: place[0] })) });
const PW = [[-150, 5], "in the Pacific, at the left edge"], PE = [[165, 5], "in the Pacific, at the right edge"], AT = [[-34, 18], "in the Atlantic"], IN = [[76, -22], "in the Indian Ocean"];
const roundGlobe = pic("globe", "The Pacific on a globe", "A globe turned to the Pacific Ocean. Water stretches from Asia and Australia on one side to the Americas on the other.", ["On a globe, the Pacific is one big ocean."], { center: [-170, 5] });

export const fiveOceans = topic([
  lesson(["There are five oceans.", "Pacific, Atlantic, Indian, Arctic and Southern.", "The Pacific is the biggest."], oceansNamed, ask([
    ["How many oceans are there?", "Five", "Seven", "Two"],
    ["Which ocean is the biggest?", "Pacific", "Arctic", "Indian"],
    ["Which ocean is at the top, near the North Pole?", "Arctic", "Indian", "Southern"],
    ["Which ocean surrounds Antarctica?", "Southern", "Atlantic", "Arctic"],
    ["Which ocean is between Africa and Australia?", "Indian", "Arctic", "Atlantic"],
    ["Which ocean is between the Americas and Africa?", "Atlantic", "Indian", "Arctic"],
    ["Is an ocean bigger than a sea?", "Yes, oceans are huge", "No, seas are bigger", "They are puddles"],
  ], oceansNamed, S, "Read the labels on the map.")),
  lesson(["Letters mark the oceans.", "Use the continent names to help.", "Oceans lie between continents."], oceansNamed,
    SETS.flatMap((names, n) => names.map((o, i) => ({ o, i, n }))).filter(({ o, n }, k, all) => all.findIndex((x) => x.o === o) === k || n === 2).slice(0, 7)
      .map(({ o, i, n }) => ask([[`Map ${n + 1}: which letter marks the ${o} Ocean?`, "ABC"[i], ..."ABC".replace("ABC"[i], "")]], lettered(n + 1, SETS[n]), S, "Which continents is it between?")[0])),
  lesson(["A globe is round like Earth.", "A map is flat.", "The same ocean is on both."], oceansNamed,
    GLOBES.map(([o, center, w1, w2], i) => ask([[`Globe ${i + 1}: which ocean is letter A in?`, o, w1, w2]], globe(i + 1, o, center), S, "Look at the land beside the letter.")[0])
      .concat(ask([["Which ocean is west of South America?", "Pacific", "Arctic", "Indian"], ["Which ocean has ice near the North Pole?", "Arctic", "Indian", "Pacific"]], oceansNamed, S, "Read the labels on the map."))),
  lesson(["A flat map cuts Earth open.", "The Pacific shows at both edges.", "It is still one ocean."], roundGlobe, [
    ...ask([["Letters A and B are in the same ocean. Which?", "Pacific", "Atlantic", "Indian"]], edges(1, [["A", PW], ["B", PE], ["C", AT]]), S, "The two edges of the map join up."),
    ...ask([["Map 2: which two letters mark the Pacific?", "A and C", "A and B", "B and C"]], edges(2, [["A", PW], ["B", IN], ["C", PE]]), S, "Look at the far left and far right."),
    ...ask([["Map 3: which two letters mark the Pacific?", "B and C", "A and B", "A and C"]], edges(3, [["A", AT], ["B", PE], ["C", PW]]), S, "Look at the far left and far right."),
    ...ask([["Map 4: which letter is NOT in the Pacific?", "B", "A", "C"]], edges(4, [["A", PW], ["B", AT], ["C", PE]]), S, "Look at the far left and far right."),
    ...ask([
      ["Why is the Pacific on both edges?", "A flat map cuts Earth open", "There are two Pacifics", "The map is wrong"],
      ["On a globe, how many Pacific Oceans are there?", "One", "Two", "Five"],
    ], roundGlobe, S, "A globe shows Earth round."),
  ]),
]);
