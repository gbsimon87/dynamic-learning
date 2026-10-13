import { ask, cards, lesson, pic, topic } from "./authoring.js";
import { visual } from "../year3/authoring.js";

const S = ["y1UkCountries", "y1NaturalEarth"];
export const NATION_POINTS = { Scotland: [-4.3, 57], England: [-1.5, 52.7], Wales: [-3.7, 52.3], "Northern Ireland": [-6.7, 54.65] };

export const ukNamed = pic("uk", "The United Kingdom",
  "A map of the United Kingdom. Scotland is at the top. England is the biggest part, at the bottom. Wales is to the west of England. Northern Ireland is across the sea, to the west. The Republic of Ireland and France are shown in grey; they are not in the UK. North is up.",
  ["The UK has four countries.", "England, Scotland, Wales and Northern Ireland.", "The Republic of Ireland is not in the UK."], { names: true, neighbours: true });

const lettered = (n, order) => pic("uk", `UK map ${n}`,
  `A UK map with letters and no names. ${order.map((c, i) => `Letter ${"ABCD"[i]} is on ${c}.`).join(" ")} North is up.`,
  ["Each country has a letter.", "Scotland is at the top. Northern Ireland is across the sea."],
  { neighbours: true, markers: order.map((c, i) => ({ id: "ABCD"[i], label: c, point: NATION_POINTS[c] })) });
const map1 = lettered(1, ["Scotland", "England", "Wales", "Northern Ireland"]);
const map2 = lettered(2, ["Wales", "Northern Ireland", "Scotland", "England"]);
const find = (n, v, order) => order.map((c, i) => {
  const wrong = [0, 1, 2, 3].filter((k) => k !== i).slice(0, 2).map((k) => "ABCD"[k]);
  return [`Map ${n}: which letter marks ${c}?`, "ABCD"[i], ...wrong];
});

export const globeUk = pic("globe", "The UK on a globe",
  "A globe showing Europe and Africa. Letter A is on the United Kingdom, in north-west Europe. Letter B is on Africa. Letter C is on Asia.",
  ["The UK is a small group of islands.", "It is in Europe, in the north-west."],
  { center: [10, 35], markers: [{ id: "A", label: "United Kingdom", point: [-2, 54] }, { id: "B", label: "Africa", point: [20, 5] }, { id: "C", label: "Asia", point: [80, 45] }] });

// C3 — one evidenced feature per country, with captions.
const features = cards("A feature from each country", [
  ["hill", "England: fells in the Lake District", "A"], ["island", "Scotland: many islands", "B"],
  ["castle", "Wales: many old castles", "C"], ["causeway", "Northern Ireland: Giant's Causeway coast", "D"],
], "Four captioned pictures. A: hills called fells in England's Lake District. B: one of Scotland's many islands. C: an old castle in Wales. D: stone columns at the Giant's Causeway coast in Northern Ireland.",
["Every country has many different places.", "These are just one example each."]);
const FS = ["y1UkCountries", "park", "y1Islands", "y1Castles", "y1Causeway"];

// C4 — which outline is the whole UK?
const outline = (title, only, alt) => pic("uk", title, alt, [], { only, plain: true });
const UK = ["england", "scotland", "wales", "northernIreland"];
const shapes = (order, n) => {
  const maps = order.map((kind, i) => {
    const t = `Map ${"ABC"[i]}`;
    if (kind === "uk") return outline(t, UK, `${t}: England, Scotland, Wales and Northern Ireland.`);
    if (kind === "gb") return outline(t, UK.slice(0, 3), `${t}: England, Scotland and Wales only. Northern Ireland is missing.`);
    return outline(t, [...UK, "ireland"], `${t}: the UK and the Republic of Ireland together.`);
  });
  return visual("record", `Which shape is the UK? (${n})`, maps.map((m) => m.alt).join(" "), ["The UK includes Northern Ireland.", "The Republic of Ireland is a different country."], { maps });
};
const shapeQs = (n, order) => {
  const v = shapes(order, n), at = (k) => "ABC"[order.indexOf(k)];
  return ask([
    [`Set ${n}: which map shows the whole UK?`, at("uk"), at("gb"), at("ie")],
    [`Set ${n}: which map leaves out Northern Ireland?`, at("gb"), at("uk"), at("ie")],
    [`Set ${n}: which map wrongly adds another country?`, at("ie"), at("uk"), at("gb")],
  ], v, S, "Count the parts. Is Northern Ireland there?");
};

export const fourCountriesOfTheUk = topic([
  lesson(["The UK has four countries.", "England, Scotland, Wales and Northern Ireland.", "Northern Ireland is across the sea."], ukNamed, ask([
    ["How many countries are in the UK?", "Four", "Two", "Seven"],
    ["Which country is at the top of the map?", "Scotland", "Wales", "England"],
    ["Which country is the biggest on the map?", "England", "Wales", "Northern Ireland"],
    ["Which country is next to England, on the west?", "Wales", "Scotland", "Northern Ireland"],
    ["Which UK country is across the sea?", "Northern Ireland", "England", "Wales"],
    ["Which is NOT a UK country?", "France", "Wales", "Scotland"],
    ["Is the Republic of Ireland in the UK?", "No, it is a different country", "Yes, it is", "It is part of Wales"],
  ], ukNamed, S, "Read the names on the map.")),
  lesson(["Letters show where each country is.", "Use the map to find each country.", "The UK is in Europe."], ukNamed, [
    ...ask(find(1, map1, ["Scotland", "England", "Wales", "Northern Ireland"]), map1, S, "Scotland is at the top. Wales is west of England."),
    ...ask(find(2, map2, ["Wales", "Northern Ireland", "Scotland", "England"]), map2, S, "Scotland is at the top. Wales is west of England."),
    ...ask([["Which letter marks the UK on the globe?", "A", "B", "C"]], globeUk, S, "The UK is small, in north-west Europe."),
  ]),
  lesson(["Each country has its own places.", "Read the caption under each picture.", "Match the place to its country."], features, ask([
    ["Which country has fells in the Lake District?", "England", "Wales", "Scotland"],
    ["Which country has the Giant's Causeway?", "Northern Ireland", "Scotland", "England"],
    ["Which picture shows a castle in Wales?", "C", "A", "D"],
    ["Which picture shows one of Scotland's islands?", "B", "C", "A"],
    ["Picture D is in which country?", "Northern Ireland", "Wales", "England"],
    ["Picture C is in which country?", "Wales", "Scotland", "Northern Ireland"],
    ["Does one picture show a whole country?", "No, just one place", "Yes, all of it", "Yes, every town"],
  ], features, FS, "Read the caption under the picture.")),
  lesson(["The UK has four parts.", "Northern Ireland is part of the UK.", "The Republic of Ireland is not."], ukNamed, [
    ...shapeQs(1, ["uk", "gb", "ie"]), ...shapeQs(2, ["gb", "ie", "uk"]), ...shapeQs(3, ["ie", "uk", "gb"]).slice(0, 1),
  ]),
]);
