import { ask, cards, lesson, pic, topic } from "./authoring.js";
import { visual } from "../year3/authoring.js";

const S = ["y1NaturalEarth", "y1OceanOrSea", "y1Coast"];
const WATER = { "North Sea": [1.2, 56], "Irish Sea": [-4.9, 53.9], "English Channel": [-2.6, 50.2], "Atlantic Ocean": [-9, 57] };

// C1 — land, coast and water.
const landSea = cards("Land, coast and water", [["hill", "Land"], ["coast", "Coast"], ["sea", "Water"]],
  "Three labelled pictures. Land: a green hill. Coast: where the sandy land meets the sea. Water: the open sea with a boat.",
  ["Land is the ground we walk on.", "The coast is where land meets the sea."]);
const seaside = (pins) => pic("scene", "A seaside picture", `A seaside picture. The sea is on the left. A sandy beach is where the land meets the sea. A rocky cliff with a village is on the right. ${Object.entries(pins).map(([id, f]) => `Letter ${id} marks the ${f}.`).join(" ")}`,
  ["Water, coast and land are all here."], { scene: "coast", pins });
const s1 = seaside({ A: "sea", B: "beach", C: "village" });

// C2 — waters around the UK, unlabelled with letters.
export const seasNamed = pic("uk", "Seas around the UK", "A UK map with the four countries named. The North Sea is to the east. The Irish Sea is between Great Britain and Ireland. The English Channel is to the south, between England and France. The Atlantic Ocean is to the west.",
  ["The UK is surrounded by water.", "The Atlantic is an ocean, not a sea."], { names: true, seas: true, neighbours: true });
const lettered = (n, order) => pic("uk", `Water map ${n}`,
  `A UK map with the four countries named. Letters mark waters. ${order.map((w, i) => `Letter ${"ABCD"[i]} is the ${w}.`).join(" ")}`,
  ["East: North Sea. South: English Channel.", "Between islands: Irish Sea. West: Atlantic Ocean."],
  { names: true, neighbours: true, markers: order.map((w, i) => ({ id: "ABCD"[i], label: w, point: WATER[w] })) });
const O1 = ["North Sea", "Irish Sea", "English Channel", "Atlantic Ocean"], O2 = ["Atlantic Ocean", "English Channel", "North Sea", "Irish Sea"];
const rows = (n, order) => order.map((w, i) => [`Map ${n}: which letter marks the ${w}?`, "ABCD"[i], ..."ABCD".replace("ABCD"[i], "").slice(0, 2)]);

// C3 — a coastline picture matched to a map letter.
const COASTS = [
  ["cliff", "Whitby, on the east coast of England.", "North Sea"],
  ["beach", "Blackpool, on the north-west coast of England.", "Irish Sea"],
  ["coast", "Brighton, on the south coast of England.", "English Channel"],
  ["island", "The Isle of Lewis, west of Scotland.", "Atlantic Ocean"],
];
const coastPair = (n, [s, caption], map) => visual("record", `Which water is beside this coast? (${n})`, `${caption} ${map.alt}`, [caption, ...map.lines], { maps: [cards("The coast", [[s, caption]], caption), map] });

// C4 — which water is beside a shown coast, on a labelled map.
const PLACES = [["Aberdeen", [-2.1, 57.15], "North Sea", "Irish Sea", "English Channel"], ["Plymouth", [-4.14, 50.37], "English Channel", "North Sea", "Irish Sea"],
  ["Liverpool", [-3, 53.41], "Irish Sea", "North Sea", "English Channel"], ["Lewis", [-6.8, 58.2], "Atlantic Ocean", "English Channel", "Irish Sea"],
  ["Whitby", [-0.61, 54.49], "North Sea", "Atlantic Ocean", "Irish Sea"], ["Brighton", [-0.14, 50.82], "English Channel", "Irish Sea", "Atlantic Ocean"]];
const at = ([place, point]) => pic("uk", `Bix at ${place}`, `A labelled UK map of countries and waters. Star X marks ${place}.`, [`X marks ${place}.`, "Read the water names on the map."],
  { names: true, seas: true, neighbours: true, markers: [{ id: "X", label: place, point }] });

export const seasAroundTheUk = topic([
  lesson(["Land is ground. Water is sea or ocean.", "The coast is where land meets sea.", "The UK has a long coast."], landSea, [
    ...ask([
      ["Where does land meet the sea?", "The coast", "A forest", "A mountain top"],
      ["Which picture shows water?", "Water", "Land", "Coast"],
      ["Which picture shows where land meets sea?", "Coast", "Land", "Water"],
    ], landSea, S, "Read the label under each picture."),
    ...ask([
      ["Which letter marks the water?", "A", "B", "C"],
      ["Which letter marks the coast?", "B", "A", "C"],
      ["Which letter marks land with houses?", "C", "A", "B"],
    ], s1, S, "Water is blue. The coast is where land meets it."),
  ]),
  lesson(["The UK is surrounded by water.", "Seas: North, Irish and English Channel.", "The Atlantic is an ocean."], seasNamed, [
    ...ask(rows(1, O1), lettered(1, O1), S, "East is right. South is at the bottom."),
    ...ask(rows(2, O2), lettered(2, O2), S, "East is right. South is at the bottom."),
  ]),
  lesson(["Each coast faces some water.", "Read where the coast is.", "Then find that water on the map."], seasNamed,
    COASTS.flatMap((coast, i) => {
      const order = i % 2 ? O2 : O1, map = lettered(i % 2 ? 2 : 1, order), k = order.indexOf(coast[2]);
      return ask([[`Coast ${i + 1}: which map letter is the water beside it?`, "ABCD"[k], ..."ABCD".replace("ABCD"[k], "").slice(0, 2)]], coastPair(i + 1, coast, map), S, "East, south, west or between islands?");
    }).concat(ask([
      ["Is the Atlantic a sea or an ocean?", "An ocean", "A sea", "A river"],
      ["Which water is between England and France?", "English Channel", "North Sea", "Atlantic Ocean"],
      ["Which water is on the east side of the UK?", "North Sea", "Irish Sea", "Atlantic Ocean"],
    ], seasNamed, S, "Read the water names on the map."))),
  lesson(["Bix is visiting the coast.", "Find the star on the map.", "Which water is beside it?"], seasNamed,
    PLACES.map((p) => ask([[`Bix is at ${p[0]}. Which water is beside it?`, p[2], p[3], p[4]]], at(p), S, "Find X. Read the nearest water name.")[0])
      .concat(ask([["Which of these is an ocean?", "Atlantic Ocean", "North Sea", "Irish Sea"]], seasNamed, S))),
]);
