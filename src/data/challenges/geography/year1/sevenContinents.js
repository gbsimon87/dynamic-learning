import { ask, lesson, pic, topic } from "./authoring.js";
import { visual } from "../year3/authoring.js";

const S = ["y1Continents", "y1NaturalEarth"];
export const CONTINENTS = { africa: ["Africa", [20, 5]], antarctica: ["Antarctica", [30, -80]], asia: ["Asia", [95, 45]], europe: ["Europe", [15, 52]],
  northAmerica: ["North America", [-100, 45]], southAmerica: ["South America", [-60, -15]], australia: ["Australia", [134, -25]] };
const IDS = Object.keys(CONTINENTS);
const name = (id) => CONTINENTS[id][0];

export const worldNamed = pic("world", "The seven continents", "A world map. Each continent has its own colour and name: North America and South America on the left, Europe and Africa in the middle, Asia on the right, Australia at the bottom right and Antarctica along the bottom.",
  ["There are seven continents.", "Some atlases use Oceania for Australia's wider region."], { names: true });

// C1 — one continent in colour; the rest faded.
const only = (id) => pic("world", `Which continent? (${name(id)[0]})`, `A world map with one continent in strong colour and the rest faded. The coloured continent is ${name(id)}.`,
  ["One continent is in strong colour."], { highlight: [id] });
const pick = (id) => { const others = IDS.filter((k) => k !== id); const i = IDS.indexOf(id); return [name(others[i % 6]), name(others[(i + 3) % 6])]; };

// C2 — letters on continents.
const lettered = (n, ids) => pic("world", `Continent map ${n}`, `A world map without names. ${ids.map((id, i) => `Letter ${"ABC"[i]} is on ${name(id)}.`).join(" ")}`,
  ["Use the shapes and places.", "North is up."], { markers: ids.map((id, i) => ({ id: "ABC"[i], label: name(id), point: CONTINENTS[id][1] })) });
const M = [["africa", "europe", "asia"], ["northAmerica", "southAmerica", "antarctica"], ["australia", "asia", "africa"]];

// C3 — the UK within Europe on a globe.
const europeGlobe = (n, markers) => pic("globe", `Globe ${n}: Europe and nearby`, `A globe centred on Europe. Europe is purple. ${markers.map(([id, label]) => `Letter ${id} is on ${label}.`).join(" ")}`,
  ["The UK is in north-west Europe.", "Africa is south of Europe. Asia is east."],
  { center: [15, 40], highlight: ["europe", "africa", "asia"], markers: markers.map(([id, label, point]) => ({ id, label, point })) });
const g1 = europeGlobe(1, [["A", "the United Kingdom", [-2, 54]], ["B", "Africa", [20, 10]], ["C", "Asia", [75, 45]]]);
const g2 = europeGlobe(2, [["A", "Asia", [75, 45]], ["B", "the United Kingdom", [-2, 54]], ["C", "Africa", [20, 10]]]);

// C4 — match a globe view to the world map.
const CENTRE = { africa: [20, 0], asia: [95, 35], europe: [15, 50], northAmerica: [-100, 40], southAmerica: [-60, -20], australia: [134, -25], antarctica: [0, -70] };
const match = (n, id, letters) => {
  const g = pic("globe", `Globe view ${n}`, `A globe turned to show one coloured continent: ${name(id)}.`, [], { center: CENTRE[id], highlight: [id] });
  const map = lettered(`for globe ${n}`, letters);
  return visual("record", `Globe and map ${n}`, `${g.alt} ${map.alt}`, ["Find the same shape on the map."], { maps: [g, map] });
};
const MATCH = [["africa", ["asia", "africa", "southAmerica"]], ["southAmerica", ["southAmerica", "africa", "australia"]], ["australia", ["europe", "northAmerica", "australia"]],
  ["northAmerica", ["northAmerica", "asia", "europe"]], ["asia", ["africa", "asia", "antarctica"]], ["antarctica", ["australia", "southAmerica", "antarctica"]], ["europe", ["europe", "africa", "northAmerica"]]];

export const sevenContinents = topic([
  lesson(["A continent is a huge area of land.", "There are seven continents.", "Each has its own name."], worldNamed,
    IDS.map((id) => ask([[`Which continent is in colour on map ${IDS.indexOf(id) + 1}?`, name(id), ...pick(id)]], only(id), S, "Compare it with the named map.")[0])),
  lesson(["Letters mark continents on this map.", "Look at each shape and place.", "Antarctica is at the very bottom."], worldNamed,
    M.flatMap((ids, n) => ids.map((id, i) => [`Map ${n + 1}: which letter marks ${name(id)}?`, "ABC"[i], ..."ABC".replace("ABC"[i], "")])).slice(0, 7).map((row, k) => ask([row], lettered(Math.floor(k / 3) + 1, M[Math.floor(k / 3)]), S, "Remember where each continent sits.")[0])),
  lesson(["A globe is a round model of Earth.", "The UK is in Europe.", "Africa is south. Asia is east."], g1, [
    ...ask([
      ["Globe 1: which letter marks the UK?", "A", "B", "C"],
      ["Globe 1: which letter is south of Europe?", "B", "A", "C"],
      ["Globe 1: which letter is east of Europe?", "C", "A", "B"],
    ], g1, S, "The UK is a small island in Europe's north-west."),
    ...ask([
      ["Globe 2: which letter marks the UK?", "B", "A", "C"],
      ["Which continent is the UK in?", "Europe", "Africa", "Asia"],
      ["Which continent is just south of Europe?", "Africa", "Asia", "Antarctica"],
    ], g2, S, "The UK is a small island in Europe's north-west."),
  ]),
  lesson(["A globe and a map show the same land.", "Shapes look a little different.", "Colours help us match them."], worldNamed,
    MATCH.map(([id, letters], i) => { const k = letters.indexOf(id); return ask([[`Which map letter matches globe view ${i + 1}?`, "ABC"[k], ..."ABC".replace("ABC"[k], "")]], match(i + 1, id, letters), S, "Match the colour and the shape.")[0]; })),
]);
