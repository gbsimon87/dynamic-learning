import { ask, cards, lesson, pic, sort, topic } from "./authoring.js";

const S = ["y1Equator", "y1NorthPole", "y1SouthPole", "y1Climate"];

export const globeLines = pic("globe", "Equator and poles", "A globe. The North Pole is at the top. The South Pole is at the bottom. A dashed red line called the Equator goes around the middle.",
  ["The Equator is an imaginary line around Earth's middle.", "The North Pole is at the top. The South Pole is at the bottom."], { center: [20, 0], equator: true, poles: true });
const zones = pic("globe", "Warm and cold areas", "A globe with the Equator and poles. A yellow band shows broadly warm areas near the Equator. White caps show cold areas near the poles.",
  ["Places near the Equator are usually warm.", "Places near the poles are usually cold.", "This is a pattern, not a rule for everywhere."], { center: [20, 0], equator: true, poles: true, zones: true });

// C1 — the three reference places.
const ref = (n, order) => pic("globe", `Globe letters ${n}`, `A globe. ${order.map(([id, what]) => `Letter ${id} is on ${what}.`).join(" ")}`, ["Top, middle and bottom of the globe."],
  { center: [20, 0], equator: true, markers: order.map(([id, , point]) => ({ id, label: id, point })) });
const NP = ["the North Pole", "North Pole", [0, 88]], EQ = ["the Equator", "Equator", [20, 0]], SP = ["the South Pole", "South Pole", [0, -88]];
const r1 = ref(1, [["A", NP[0], NP[2]], ["B", EQ[0], EQ[2]], ["C", SP[0], SP[2]]]);
const r2 = ref(2, [["A", SP[0], SP[2]], ["B", NP[0], NP[2]], ["C", EQ[0], EQ[2]]]);

// C2 — example warm and cold places on a globe.
const places = (n, list) => pic("globe", `Warm or cold? Globe ${n}`, `A globe with warm and cold areas shaded. ${list.map(([id, label]) => `Letter ${id} is ${label}.`).join(" ")}`,
  ["Yellow band: usually warm, near the Equator.", "White caps: usually cold, near the poles."],
  { center: [-20, 10], equator: true, poles: true, zones: true, markers: list.map(([id, label, point]) => ({ id, label, point })) });
const p1 = places(1, [["A", "in the Amazon rainforest, near the Equator", [-62, -3]], ["B", "in Greenland, near the North Pole", [-40, 74]], ["C", "in Antarctica, near the South Pole", [-30, -78]]]);
const p2 = places(2, [["A", "in Antarctica, near the South Pole", [-30, -78]], ["B", "in Africa, near the Equator", [20, 2]], ["C", "in the Arctic, near the North Pole", [-10, 82]]]);

// C3 — sort labelled scenes.
const SORTS = [
  [["Rainforest near the Equator", 0], ["Ice near the South Pole", 1], ["Frozen Arctic sea", 1]],
  [["Hot sunny beach near the Equator", 0], ["Snow and ice in Antarctica", 1]],
  [["Warm forest near the Equator", 0], ["Ice near the North Pole", 1], ["Hot rainforest river", 0]],
  [["Polar ice with icebergs", 1], ["Sunny island near the Equator", 0]],
  [["Ice sheet in Antarctica", 1], ["Warm sea near the Equator", 0], ["Arctic snow", 1]],
  [["Hot jungle near the Equator", 0], ["Freezing North Pole", 1]],
  [["Cold, icy Greenland", 1], ["Warm Amazon rainforest", 0]],
];
const scenePics = cards("Warm places and cold places", [["hot", "Warm, near the Equator"], ["cold", "Cold, near a pole"]],
  "Two labelled pictures. Warm near the Equator: green rainforest and sunshine. Cold near a pole: ice, snow and icy sea.",
  ["Near the Equator: usually warm.", "Near the poles: usually cold."]);

export const hotAndColdPlaces = topic([
  lesson(["The Equator goes around Earth's middle.", "The North Pole is at the top.", "The South Pole is at the bottom."], globeLines, [
    ...ask([
      ["Globe 1: which letter marks the North Pole?", "A", "B", "C"],
      ["Globe 1: which letter is on the Equator?", "B", "A", "C"],
      ["Globe 1: which letter marks the South Pole?", "C", "A", "B"],
    ], r1, S, "Top, middle or bottom?"),
    ...ask([
      ["Globe 2: which letter marks the North Pole?", "B", "A", "C"],
      ["Globe 2: which letter is on the Equator?", "C", "A", "B"],
    ], r2, S, "Top, middle or bottom?"),
    ...ask([
      ["Is the Equator painted on the ground?", "No, it is imaginary", "Yes, in red", "Yes, in the sea"],
      ["Which pole is in Antarctica?", "South Pole", "North Pole", "Equator"],
    ], globeLines, S, "Read the globe labels."),
  ]),
  lesson(["Near the Equator is usually warm.", "Near the poles is usually cold.", "Find warm and cold places."], zones, [
    ...ask([
      ["Globe 1: which letter is near the Equator?", "A", "B", "C"],
      ["Globe 1: which letter is near the North Pole?", "B", "A", "C"],
      ["Globe 1: which letter is likely warmest?", "A", "B", "C"],
    ], p1, S, "Warm places are near the Equator."),
    ...ask([
      ["Globe 2: which letter is near the Equator?", "B", "A", "C"],
      ["Globe 2: which letter is near the South Pole?", "A", "B", "C"],
      ["Globe 2: which letter is likely warmest?", "B", "A", "C"],
    ], p2, S, "Warm places are near the Equator."),
  ]),
  lesson(["Warm places: near the Equator.", "Cold places: near the poles.", "Sort each card."], scenePics,
    SORTS.map((items, i) => sort(`Group ${i + 1}: warm or cold place?`, ["Warm, near the Equator", "Cold, near a pole"], items, cards("Places to sort", items.map(([label, bin]) => [bin ? "cold" : "hot", label]), `Labelled pictures: ${items.map(([l]) => l).join(", ")}.`, ["Read each label."]), S))),
  lesson(["Distance from the Equator matters.", "Far from it is usually colder.", "Not every place follows the pattern."], zones, ask([
    ["Why is Antarctica so cold?", "It is far from the Equator", "It is near the Equator", "It is in the Pacific"],
    ["Why are rainforests near the Equator warm?", "They are close to the Equator", "They are near a pole", "They are in the Arctic"],
    ["Where is it usually colder?", "Near a pole", "Near the Equator", "In a rainforest"],
    ["Is every place in Africa hot?", "No, some places are cooler", "Yes, every single place", "Africa is always icy"],
    ["The UK is between Equator and pole. It is…", "Not as hot or cold", "Hotter than the Equator", "Colder than the poles"],
    ["Which is closest to the Equator?", "A rainforest in Brazil", "Greenland", "The South Pole"],
    ["Which place is far from the Equator?", "The North Pole", "The Amazon rainforest", "Central Africa"],
  ], zones, S, "Near the Equator: warm. Near a pole: cold.")),
]);
