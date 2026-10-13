import { ask, cards, lesson, pic, topic } from "./authoring.js";

const S = ["y1Drawings", "y1MapIdea", "y1MapZone"];
const NAME = { building: "building", tree: "tree", pond: "pond", playground: "playground" };
// Layouts: feature → [column 0–2 left to right, row 0 back / 1 front].
const L1 = { building: [0, 0], pond: [1, 1], tree: [2, 0] };
const L2 = { playground: [0, 1], building: [1, 0] };
const L3 = { tree: [0, 0], building: [1, 1], pond: [2, 0] };
const L4 = { pond: [0, 1], tree: [1, 0], building: [2, 1] };
const SIDE = ["on the left", "in the middle", "on the right"];
const describe = (layout) => Object.entries(layout).sort((a, b) => a[1][0] - b[1][0]).map(([f, [c]]) => `the ${NAME[f]} is ${SIDE[c]}`).join(", ");
const views = (title, panels, alt, lines) => pic("views", title, alt, lines, { panels });

// Notes: the same grounds three ways.
const threeWays = views("One place, three ways", [
  { kind: "ground", layout: L1, caption: "From the ground" }, { kind: "aerial", layout: L1, caption: "From above, like a bird" }, { kind: "plan", layout: L1, caption: "A plan" },
], `Three pictures of the same grounds: ${describe(L1)}. One is from the ground, one is an aerial photo from above, and one is a flat plan with labels.`,
["From the ground we see the sides of things.", "From above we see the tops.", "A plan is a simple drawing from above."]);

// C1 — landmarks across two ground-level pictures.
const groundA = views("Two pictures from the ground", [{ kind: "ground", layout: L1, id: "A" }, { kind: "ground", layout: L2, id: "B" }],
  `Picture A: ${describe(L1)}. Picture B: ${describe(L2)}.`, ["A landmark helps us know where we are.", "Look for the same landmark in both pictures."]);

// C2 — the same landmark in an aerial view.
const aerialPins = (layout, pins) => views("From the ground and from above", [{ kind: "ground", layout, caption: "From the ground" }, { kind: "aerial", layout, pins, caption: "From above" }],
  `The ground picture shows: ${describe(layout)}. The view from above has letters: ${Object.entries(pins).map(([id, f]) => `${id} is on the ${NAME[f]}`).join(", ")}.`,
  ["Trees look like round green tops from above.", "A roof looks like a rectangle from above.", "A pond looks like a blue oval."]);
const air1 = aerialPins(L1, { A: "building", B: "pond", C: "tree" });
const air2 = aerialPins(L3, { A: "tree", B: "building", C: "pond" });

// C3 — choose the plan that matches the grounds.
const PLANS = [[L1, L3, L4], [L3, L4, L1], [L4, L1, L3]];
const planMatch = (aerial, plans) => views("Which plan matches?", [{ kind: "aerial", layout: aerial, caption: "From above" }, ...plans.map((layout, i) => ({ kind: "plan", layout, id: "ABC"[i] }))],
  `The view from above shows: ${describe(aerial)}. ${plans.map((layout, i) => `Plan ${"ABC"[i]}: ${describe(layout)}.`).join(" ")}`,
  ["A matching plan has everything in the same place."]);
const matchRows = [];
let n = 1;
for (const target of [L1, L3, L4]) for (const plans of PLANS) {
  if (n > 7) break;
  const i = plans.indexOf(target), others = [0, 1, 2].filter((k) => k !== i).map((k) => "ABC"[k]);
  matchRows.push({ ...ask([[`Grounds ${n}: which plan matches the view from above?`, "ABC"[i], others[0], others[1]]], planMatch(target, plans), S, "Find the building first. Is it in the same place?")[0] });
  n++;
}

// C4 — simple symbols for a map key.
const symbols = cards("Map symbols", [["sym-tree", null, "A"], ["sym-pond", null, "B"], ["sym-house", null, "C"], ["sym-path", null, "D"], ["sym-play", null, "E"], ["sym-gate", null, "F"]],
  "Six map symbols. A: a green circle with a trunk. B: a blue oval with waves. C: a square with a red roof. D: a dashed line. E: a yellow star. F: two posts with bars.",
  ["A symbol is a small picture on a map.", "A good symbol looks a bit like the real thing."]);

export const mapsFromAbove = topic([
  lesson(["We can see a place in different ways.", "From the ground, or from above.", "A landmark helps us find our way."], threeWays, ask([
    ["In picture A, what is on the left?", "The building", "The tree", "The pond"],
    ["In picture A, what is on the right?", "The tree", "The building", "The pond"],
    ["In picture A, what is in the middle?", "The pond", "The tree", "The building"],
    ["In picture B, what is on the left?", "The playground", "The pond", "The tree"],
    ["In picture B, what is in the middle?", "The building", "The pond", "The tree"],
    ["Which landmark is in both pictures?", "The building", "The pond", "The tree"],
    ["Which landmark is only in picture B?", "The playground", "The building", "The pond"],
  ], groundA, S, "Look at each picture from left to right.")),
  lesson(["A bird sees the tops of things.", "An aerial photo is taken from above.", "Find the same landmark from above."], threeWays, [
    ...ask([
      ["From above, which letter is on the tree?", "C", "A", "B"],
      ["From above, which letter is on the pond?", "B", "A", "C"],
      ["From above, which letter is on the building?", "A", "B", "C"],
    ], air1, S, "Match the left, middle and right."),
    ...ask([
      ["Which letter shows the tree's round top?", "A", "B", "C"],
      ["Which letter shows the building's roof?", "B", "A", "C"],
      ["Which letter shows the blue pond?", "C", "A", "B"],
    ], air2, S, "Match the left, middle and right."),
  ]),
  lesson(["A plan is a drawing from above.", "It shows where things are.", "Match the plan to the view."], threeWays, matchRows),
  lesson(["Maps use symbols for features.", "A key tells what each symbol means.", "Choose a clear symbol."], symbols, ask([
    ["Which symbol would you use for a tree?", "A", "B", "E"],
    ["Which symbol would you use for a pond?", "B", "A", "D"],
    ["Which symbol would you use for a house?", "C", "B", "F"],
    ["Which symbol would you use for a path?", "D", "C", "A"],
    ["Which symbol would you use for a gate?", "F", "D", "B"],
    ["Which symbol would you use for a playground?", "E", "C", "A"],
    ["Why do maps use symbols?", "They are quick to draw and read", "They hide the features", "They make maps very big"],
  ], symbols, S, "Which symbol looks a bit like the real thing?")),
]);
