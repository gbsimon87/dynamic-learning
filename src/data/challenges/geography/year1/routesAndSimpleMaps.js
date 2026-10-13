import { ask, cards, lesson, pic, topic } from "./authoring.js";

const S = ["y1MapZone", "y1MapIdea", "y1Drawings"];

// C1 — near/far, left/right from the shown person's own viewpoint.
const view = (n, items) => pic("viewpoint", `What Bix's friend sees ${n}`,
  `Bix's friend stands on a path, facing away from you, so their left is your left. ${items.map((it) => `${it.code}: a ${it.name}, ${it.dist}, on the ${it.side}.`).join(" ")}`,
  ["Bix's friend is facing away from you.", "Near things look big. Far things look small."], { items });
const V1 = view(1, [{ code: "A", s: "tree", name: "tree", side: "left", dist: "near" }, { code: "B", s: "house", name: "house", side: "right", dist: "near" }, { code: "C", s: "mountain", name: "mountain", side: "right", dist: "far" }]);
const V2 = view(2, [{ code: "A", s: "pond", name: "pond", side: "right", dist: "near" }, { code: "B", s: "school", name: "school", side: "left", dist: "far" }, { code: "C", s: "shop", name: "shop", side: "left", dist: "near" }]);

// C2 — compass steps on a grid. Positions are computed, never typed.
const DIR = { up: { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] }, right: { north: [1, 0], east: [0, 1], south: [-1, 0], west: [0, -1] } };
const START = [2, 1];
const move = (north, steps) => steps.reduce(([x, y], d) => [x + DIR[north][d][0], y + DIR[north][d][1]], START);
const FEATS = [["tree", "Tree"], ["pond", "Pond"], ["house", "House"], ["shop", "Shop"], ["gate", "Gate"], ["forest", "Forest"]];
export function compassGrid(n, north, targets) {
  // targets: lists of steps; each gets a lettered feature at its end cell.
  const features = targets.map((steps, i) => ({ code: "ABCD"[i], s: FEATS[i][0], label: FEATS[i][1], at: move(north, steps) }));
  const keys = features.map((f) => f.at.join());
  if (new Set(keys).size !== keys.length || keys.includes(START.join())) throw new Error(`Grid ${n}: features overlap`);
  for (const f of features) if (f.at[0] < 0 || f.at[0] > 4 || f.at[1] < 0 || f.at[1] > 2) throw new Error(`Grid ${n}: feature off the map`);
  return pic("grid", `Compass map ${n}`, `A map with squares. The north arrow points ${north}. Bix's star is in the middle. ${features.map((f) => `${f.code}: a ${f.label.toLowerCase()}, ${f.at[0] - START[0] === 0 ? "" : `${Math.abs(f.at[0] - START[0])} square${Math.abs(f.at[0] - START[0]) > 1 ? "s" : ""} ${f.at[0] > START[0] ? "right" : "left"}`}${f.at[0] !== START[0] && f.at[1] !== START[1] ? " and " : ""}${f.at[1] - START[1] === 0 ? "" : `${Math.abs(f.at[1] - START[1])} square ${f.at[1] > START[1] ? "down" : "up"}`} from the star.`).join(" ")}`,
    [`The north arrow points ${north}.`, "Find N first. Then find E, S and W."], { size: [5, 3], north, start: START, features });
}
const G1 = compassGrid(1, "up", [["east"], ["north"], ["west"], ["south"]]);
const G2 = compassGrid(2, "right", [["east"], ["north"], ["west"]]);
const G3 = compassGrid(3, "up", [["east", "north"], ["west", "south"], ["east", "east"]]);
const stepQ = (n, g, steps, i) => {
  const wrong = g.features.map((f) => f.code).filter((c) => c !== "ABCD"[i]).slice(0, 2);
  const words = steps.length === 1 ? `Go one square ${steps[0]}.` : `Go ${steps[0]}, then ${steps[1]}.`;
  return ask([[`Map ${n}: ${words} Which letter?`, "ABCD"[i], ...wrong]], g, S, `Find ${steps[0][0].toUpperCase()} on the compass first.`)[0];
};

// C3 — reading a key.
const keyMap = (n, items) => pic("grid", `Map with a key ${n}`, `A map with symbols and a key. ${items.map(([code, s, , at]) => `${code}: ${s.replace("sym-", "")} symbol at ${at[0] + 1} across, ${at[1] + 1} down.`).join(" ")} The key says: ${items.map(([, s, label]) => `${s.replace("sym-", "")} symbol means ${label.toLowerCase()}`).join("; ")}.`,
  ["Find the symbol in the key.", "Then find it on the map."],
  { size: [4, 3], north: "up", features: items.map(([code, s, , at]) => ({ code, s, at })), key: items.map(([, s, label]) => ({ s, label })) });
const K1 = keyMap(1, [["A", "sym-tree", "Tree", [0, 0]], ["B", "sym-pond", "Pond", [2, 1]], ["C", "sym-house", "House", [3, 2]], ["D", "sym-play", "Playground", [1, 2]]]);
const K2 = keyMap(2, [["A", "sym-shop", "Shop", [3, 0]], ["B", "sym-gate", "Gate", [0, 2]], ["C", "sym-school", "School", [1, 0]], ["D", "sym-tree", "Tree", [2, 2]]]);

const symbolChoice = cards("Planning a grounds map", [["sym-tree", "Tree"], ["sym-path", "Path"], ["sym-school", "Building"]],
  "Three labelled symbols for a grounds map: a green circle for a tree, a dashed line for a path, a building with a roof.",
  ["Put things that stay still on a map.", "Give each feature its own symbol.", "Add a key and a north arrow."]);

export const MAP_ACTIVITY = {
  summary: "With a grown-up: draw a simple map",
  question: "Can someone follow your map?",
  materials: "paper, pencil and a grown-up",
  steps: ["Choose a small familiar place with a grown-up.", "Draw it from above, like a bird.", "Use a simple symbol for each feature.", "Add a key and a north arrow.", "Draw a route. Ask your grown-up to follow it."],
  paper: "Features / symbols / key / north arrow / route.",
  present: "Explain your key and route to your grown-up.",
  alternative: "Draw a map of a room, or of Bix's practice school.",
};

export const routesAndSimpleMaps = topic([
  lesson(["Near things look big. Far things look small.", "Left and right depend on where you face.", "Bix's friend faces away from you."], V1, [
    ...ask([
      ["Picture 1: what is near, on the left?", "A tree", "A house", "A mountain"],
      ["Picture 1: what is near, on the right?", "A house", "A tree", "A mountain"],
      ["Picture 1: what is far away?", "A mountain", "A tree", "A house"],
      ["Picture 1: is the mountain near or far?", "Far", "Near", "Under the path"],
    ], V1, S, "Big means near. Small means far."),
    ...ask([
      ["Picture 2: what is far away, on the left?", "A school", "A pond", "A shop"],
      ["Picture 2: what is near, on the right?", "A pond", "A school", "A shop"],
      ["Picture 2: is the shop on the left or right?", "Left", "Right", "Straight ahead"],
    ], V2, S, "Use Bix's friend's left and right."),
  ]),
  lesson(["A compass shows North, East, South and West.", "Find the N arrow first.", "North is not always at the top."], G1, [
    stepQ(1, G1, ["east"], 0), stepQ(1, G1, ["north"], 1), stepQ(1, G1, ["west"], 2), stepQ(1, G1, ["south"], 3),
    stepQ(2, G2, ["east"], 0), stepQ(2, G2, ["north"], 1),
    stepQ(3, G3, ["east", "north"], 0), stepQ(3, G3, ["west", "south"], 1),
  ]),
  lesson(["A key tells what symbols mean.", "Find the symbol in the key.", "Then find its letter on the map."], K1, [
    ...ask([
      ["Map 1: which letter is the pond?", "B", "A", "C"],
      ["Map 1: which letter is the house?", "C", "D", "A"],
      ["Map 1: which letter is the playground?", "D", "B", "C"],
      ["Map 1: which letter is the tree?", "A", "B", "D"],
    ], K1, S, "Match the shape in the key."),
    ...ask([
      ["Map 2: which letter is the gate?", "B", "A", "D"],
      ["Map 2: which letter is the shop?", "A", "C", "B"],
      ["Map 2: which letter is the school?", "C", "D", "A"],
    ], K2, S, "Match the shape in the key."),
  ]),
  lesson(["Maps show things that stay still.", "Give each feature its own symbol.", "Add a key and north arrow."], symbolChoice, ask([
    ["Which belongs on a school grounds map?", "The building and paths", "A cloud in the sky", "A car driving past"],
    ["Which is a good symbol for a tree?", "A green circle", "A blue wavy line", "A red star"],
    ["What does a map key do?", "Tells what each symbol means", "Opens a door", "Shows the weather"],
    ["Why add a north arrow?", "To show directions", "To make it pretty", "To show the time"],
    ["Should one symbol mean two things?", "No, one meaning each", "Yes, always", "Only on Mondays"],
    ["Which view should a map use?", "From above", "From underground", "From inside a cupboard"],
    ["Which is best for a path symbol?", "A dashed line", "A big circle", "A tiny star"],
  ], symbolChoice, S, "A map should be clear for someone else.")),
], MAP_ACTIVITY);
