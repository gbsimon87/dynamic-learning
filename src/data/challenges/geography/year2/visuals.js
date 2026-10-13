import { visual, record } from "./authoring.js";
import { ks1SymbolName } from "./symbolNames.js";

export const CONTINENTS = [
  ["Africa", [20, 2]], ["Antarctica", [10, -78]], ["Asia", [90, 40]],
  ["Europe", [20, 52]], ["North America", [-105, 45]],
  ["South America", [-60, -20]], ["Australia", [134, -25]],
];
export const OCEANS = [
  ["Pacific Ocean", [-145, 0]], ["Atlantic Ocean", [-30, 10]],
  ["Indian Ocean", [75, -25]], ["Arctic Ocean", [0, 82]],
  ["Southern Ocean", [60, -62]],
];
export const worldMap = (places, lines = [], title = "World atlas map") => visual("map", title,
  `North is up. ${places.map(([name], i) => `${"ABCDE"[i]}: ${name}.`).join(" ")}`,
  lines, { view: "world", markers: places.map(([label, point], i) => ({ id: "ABCDE"[i], label, point })) });
export const ukMap = (places, lines, title = "UK atlas map") => ({ ...worldMap(places, lines, title), view: "uk" });
export const globe = visual("globe", "Equator and poles",
  "North Pole is at the top. South Pole is at the bottom. Equator crosses the middle. UK marker 1 is farther north. Brunei marker 2 is near the Equator.",
  ["The Equator is an imaginary line around Earth's middle.", "Brunei is near the Equator. The UK is farther north.", "Places near the Equator are usually warmer than polar areas."],
  { referenceLines: [{ label: "Equator", lat: 0 }], points: [{ label: "UK", lat: 54, lon: -20 }, { label: "Brunei", lat: 5, lon: 75 }] });

// Practice coordinates use x rightwards, y downwards: no numeric grid references.
export function plan(title, features, lines = [], extra = {}) {
  const positions = features.map(f => {
    const horizontal = f.x < 1.5 ? "left" : f.x > 2.5 ? "right" : "middle";
    const vertical = f.y < 1.5 ? "top" : f.y > 2.5 ? "bottom" : "middle";
    const position = horizontal === "middle" && vertical === "middle" ? "centre" : horizontal === "middle" ? vertical : vertical === "middle" ? horizontal : `${vertical} ${horizontal}`;
    return `${f.code}: ${f.label}, ${ks1SymbolName(f.symbol)}. Position: ${position}.`;
  }).join(" ");
  const orientation = extra.orientationKnown === false ? "This arrangement sketch has no assigned compass orientation." : `North is ${extra.north === "right" ? "right" : "up"}.`;
  return visual("ks1", title, `${orientation} ${positions} ${lines.join(" ")}`,
    lines, { variant: "plan", features, north: "up", ...extra });
}
export const SCHOOL_FEATURES = [
  { code: "H", label: "School building", symbol: "house", x: 1, y: 1 },
  { code: "T", label: "Trees", symbol: "tree", x: 3, y: 1 },
  { code: "G", label: "Gate", symbol: "gate", x: 1, y: 3 },
  { code: "P", label: "Pond", symbol: "water", x: 3, y: 3 },
];
export const schoolPlan = plan("Practice school — example plan", SCHOOL_FEATURES,
  ["The building is left of the trees.", "The gate is below the building.", "The pond is below the trees.", "A path joins the gate, building and trees."],
  { paths: [[1, 3, 1, 1], [1, 1, 3, 1]] });
export const key = record(["Square with roof: house or school building.", "Diamond: shop. Circle with trunk: trees.", "Two posts: gate. Wavy lines: water.", "Dashed line: path. Each symbol has one meaning."], "A simple map key");

export const whitbyPlan = plan("Whitby harbour and adjoining streets — simplified plan", [
  { code: "H", label: "Harbour", symbol: "water", x: 2, y: 1.5 },
  { code: "R", label: "River Esk", symbol: "water", x: 2, y: 3 },
  { code: "S", label: "Shops on adjoining streets", symbol: "shop", x: 1, y: 2 },
  { code: "B", label: "Homes by the harbour", symbol: "house", x: 3, y: 2 },
], ["Study: harbour and nearby town-centre streets in Whitby, England.",
  "The River Esk meets the North Sea at Whitby.", "Homes and shops stand beside the harbour.", "A bridge connects streets across the river."],
{ water: "whitby", extent: "Harbour and adjoining town-centre streets; not to scale." });
export const peramuPlan = plan("Kampong Peramu — simplified neighbourhood plan", [
  { code: "H", label: "Homes", symbol: "house", x: 1, y: 1 },
  { code: "W", label: "Walkways", symbol: "path", x: 2, y: 1 },
  { code: "J", label: "Jetty", symbol: "jetty", x: 3, y: 1 },
  { code: "R", label: "Brunei River", symbol: "water", x: 2, y: 3 },
], ["Study: Kampong Peramu and nearby river/walkways within Kampong Ayer.",
  "Kampong Ayer is in Brunei, in Asia.", "Walkways link homes. A jetty is a boat landing place.", "Boats travel across the river. Buildings have different uses."],
{ water: "peramu", paths: [[1, 1, 3, 1]], extent: "Kampong Peramu neighbourhood and adjoining river; not to scale." });

export const photo = (image, title, alt, lines) => visual("photo", title, alt, lines, { image });
export const whitbyPhoto = photo("whitby-harbour", "Whitby harbour — ground photograph",
  "A row of buildings lines the harbour edge. Mud and a little water are visible at low tide. St Mary's Church stands on the hill behind.",
  ["Water and buildings are visible together.", "Buildings stand beside the harbour edge at low tide.", "This photograph shows one view, not every English home."]);
export const peramuPhoto = photo("peramu-homes", "Homes near Kampong Peramu — ground photograph",
  "A decorated home has walls, windows and a railed walkway above water. Supports beneath the walkway are visible.",
  ["This home is above water.", "This photograph shows one neighbourhood view, not all Brunei."]);
export const peramuBuilding = photo("peramu-building", "A neighbourhood building in Kampong Peramu",
  "The prayer hall in Kampong Peramu stands above water, with a roof and a connected walkway. Nearby buildings are visible.",
  ["This building is a prayer hall, not a home.", "A walkway connects buildings above the water."]);
export const aerial = photo("whitby-aerial", "Whitby — aerial photograph, 4 July 2018",
  "A photograph looking down from an aircraft shows the sea, St Mary's Church on the left, abbey ruins in the middle and nearby buildings. It is an oblique aerial view, not a vertical plan.",
  ["The camera is above the ground, looking down at an angle.", "Sea is visible beyond the nearby abbey and church.", "The nearby abbey is an extra landmark outside our harbour study."]);
export const pair = (a, b, lines, title = "Two small places: paired evidence") =>
  visual("record", title, `${a.alt} ${b.alt} ${lines.join(" ")}`, lines, { maps: [a, b] });
export const placePair = pair(whitbyPlan, peramuPlan,
  ["Both small areas have homes, water and routes.", "Whitby's adjoining streets have shops.", "Peramu's plan shows walkways and a river jetty.", "The maps show selected features, not every feature."]);
export const photoPair = pair(whitbyPhoto, peramuPhoto,
  ["Both photographed views show buildings beside water.", "Whitby's photo shows a row of waterfront buildings at low tide.", "Peramu's photo shows homes above river water.", "A single photo cannot show everyone's journeys or homes."]);
