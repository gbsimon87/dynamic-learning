import { c, choices, lesson, ordered, topic, visual } from "./authoring.js";
import { plan } from "./visuals.js";
export const DIRECTIONS = ["north", "east", "south", "west"];
export const compass = north => visual("ks1", `Four directions — north points ${north}`,
  north === "up" ? "North is up, east right, south down, west left." : "North is right, east down, south left, west up.",
  ["Use the north arrow. There are four directions here."], { variant: "compass", features: [], north });
const positions = [[2, 1], [3, 2], [2, 3], [1, 2]];
export const directionPlan = (i, rotated = false) => {
  const [x, y] = positions[i];
  return plan(`Direction map ${i + 1}${rotated ? " — rotated" : ""}`, [{ code: "A", label: "Start", symbol: "gate", x: 2, y: 2 }, { code: "B", label: "Tree", symbol: "tree", x, y }],
    ["Describe Tree from Start. Use the north arrow."], { north: rotated ? "right" : "up" });
};
export const ROUTES = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 1, 2], [1, 0, 3], [2, 1, 0]];
const steps = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const nearFar = plan("Near and far — practice map", [
  { code: "A", label: "Start", symbol: "gate", x: 1, y: 2 },
  { code: "T", label: "Tree", symbol: "tree", x: 2, y: 2 },
  { code: "H", label: "Home", symbol: "house", x: 4, y: 2 },
], ["All three landmarks lie along the same straight path.", "Tree is one step from Start. Home is three steps away."], { paths: [[1, 2, 4, 2]] });
export function routePlan(route, i) {
  let x = 2, y = 2; const paths = [];
  route.forEach(d => { const nx = x + steps[d][0], ny = y + steps[d][1]; paths.push([x, y, nx, ny]); x = nx; y = ny; });
  const lines = [`Start at A. ${route.map((d, j) => `Step ${j + 1}: ${DIRECTIONS[d]}.`).join(" ")}`, "The dashed route reaches B."];
  return plan(`Route ${i + 1} — example map`, [{ code: "A", label: "Start", symbol: "gate", x: 2, y: 2 }, { code: "B", label: "Finish", symbol: "house", x, y }], lines, { paths });
}
export const compassDirectionsAndRoutes = topic([
  lesson(["North, east, south and west are four directions.", "Use the north arrow before reading a map.", "A map can turn while its directions stay labelled."], compass("up"), [
    ...choices([
      ["Which direction is at the top?", "north", "south", "east"],
      ["Which direction is at the right?", "east", "north", "west"],
      ["Which direction is at the bottom?", "south", "north", "east"],
      ["Which direction is at the left?", "west", "east", "south"],
    ], compass("up"), ["example"]),
    ...choices([
      ["Turned compass: which direction is at the right?", "north", "east", "west"],
      ["Turned compass: which direction is at the bottom?", "east", "south", "north"],
      ["Turned compass: which direction is at the top?", "west", "north", "south"],
    ], compass("right"), ["example"]),
  ]),
  lesson(["Describe a feature from a named starting place.", "Compare its position with the north arrow.", "Left and right describe positions on the page."], directionPlan(0), [
    ...DIRECTIONS.map((name, i) => c(`Map ${i + 1}: which direction is Tree from Start?`, name, DIRECTIONS[(i + 1) % 4], DIRECTIONS[(i + 2) % 4], directionPlan(i), ["example"])),
    ...[0, 1, 2].map(i => c(`Rotated map ${i + 1}: where is Tree from Start?`, DIRECTIONS[(i + 3) % 4], DIRECTIONS[i], DIRECTIONS[(i + 1) % 4], directionPlan(i, true), ["example"])),
    c("Map 2: which page position is Tree from Start?", "Right", "Left", "Below", directionPlan(1), ["example"]),
    c("Map 4: which page position is Tree from Start?", "Left", "Right", "Above", directionPlan(3), ["example"]),
    c("Which landmark is nearer Start on this path?", "Tree", "Home", "Both equally near", nearFar, ["example"]),
    c("Which landmark is farther from Start on this path?", "Home", "Tree", "Both equally far", nearFar, ["example"]),
  ]),
  lesson(["Follow a route one step at a time.", "Begin at A. Read the numbered steps.", "Order the steps before checking your route."], routePlan(ROUTES[0], 0), ROUTES.map((route, i) => ordered(`Route ${i + 1}: put the journey steps in order.`, ["Start at A", ...route.map((d, j) => `Step ${j + 1}: go ${DIRECTIONS[d]}`)], routePlan(route, i), ["example"], "Find Start, then read the numbered steps."))),
  lesson(["A good route tells someone where to begin.", "Choose directions matching the visible steps.", "Check the destination before finishing."], routePlan(ROUTES[1], 1), ROUTES.map((route, i) => c(`Route ${i + 1}: which directions reach B from A?`, route.map(d => DIRECTIONS[d]).join(", then "), [...route].reverse().map(d => DIRECTIONS[d]).join(", then "), route.map(d => DIRECTIONS[(d + 2) % 4]).join(", then "), routePlan(route, i), ["example"], "Read the first step before the next."))),
]);
