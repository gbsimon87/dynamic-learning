import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { directionBetween } from "../geometry.js";

const KM = (n) => `${n} km`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// Example plans: every marker sits at a square centre, so directions and distances are exact.
const makePlan = (title, scaleKm, features) => {
  const markers = features.map(([label, point], i) => ({ id: String.fromCharCode(65 + i), label, point }));
  const where = markers.map((m) => `${m.id} ${m.label} is in column ${Math.floor(m.point[0]) + 1}, row ${Math.floor(m.point[1]) + 1}.`).join(" ");
  const v = visual("plan", title, `North is up. Columns count from the left and rows from the bottom, starting at 1. ${where} Scale bar: each square is ${scaleKm} km wide.`,
    [`Example plan. Scale bar: each square is ${scaleKm} km wide.`, "North is at the top of the plan.", "Count whole squares along a row or column."], { origin: [0, 0], size: 6, markers });
  return { v, at: Object.fromEntries(features.map(([label, point]) => [label, point])), scaleKm };
};
const A = makePlan("Example plan A: a walking area", 2, [["Windmill", [1.5, 4.5]], ["Bridge", [4.5, 4.5]], ["Pond", [4.5, 1.5]], ["Campsite", [1.5, 1.5]], ["Lookout", [3.5, 3.5]], ["Hut", [1.5, 3.5]], ["Ford", [3.5, 1.5]]]);
const B = makePlan("Example plan B: a village trail", 1, [["Farm", [0.5, 2.5]], ["Church", [4.5, 2.5]], ["Wood", [2.5, 5.5]], ["Lake", [2.5, 0.5]]]);
export const dir = (plan, from, to) => directionBetween(plan.at[from], plan.at[to]);
export const dist = (plan, from, to) => { const [a, b] = [plan.at[from], plan.at[to]]; if (a[0] !== b[0] && a[1] !== b[1]) throw new Error("not in line"); return (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])) * plan.scaleKm; };
const ALL_DIRS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const dirQ = (plan, from, to) => { const ans = dir(plan, from, to); const i = ALL_DIRS.indexOf(ans); return c(`${plan === A ? "Plan A" : "Plan B"}: which direction is the ${to} from the ${from}?`, cap(ans), cap(ALL_DIRS[(i + 4) % 8]), cap(ALL_DIRS[(i + 1) % 8]), plan.v, ["example"], "Move from the first feature to the second. North is up."); };
const distQ = (plan, from, to, w1, w2) => c(`${plan === A ? "Plan A" : "Plan B"}: how far is it from the ${from} to the ${to}?`, KM(dist(plan, from, to)), KM(w1), KM(w2), plan.v, ["example"], "Count the squares, then use the scale bar.");

// Explorer: overview, detail and one thematic layer. Layer markers must sit inside every view extent.
const place = (label, point, id) => ({ id, label, point });
export const LAKE_EXPLORER = visual("explorer", "Map explorer: Lake District, overview and detail",
  "Overview shows the United Kingdom with marker A for the Lake District. Detail shows the Lake District National Park with B Scafell Pike, a mountain, and C Windermere, a lake. Towns layer, detail view only: D Keswick, E Ambleside and F Kendal. Positions: Keswick 54.60 degrees north, 3.13 west; Ambleside 54.43 north, 2.96 west; Kendal 54.33 north, 2.75 west; Windermere 54.35 north, 2.95 west. North is up.",
  ["Overview: United Kingdom, marker A is the Lake District.", "Detail: Lake District National Park, B Scafell Pike (mountain) and C Windermere (lake).", "Towns layer, detail only: D Keswick, E Ambleside, F Kendal.", "Switch views to compare. Zooming changes the drawing, not the real place."],
  { views: [
    { id: "overview", label: "Overview", view: "uk", extentText: "the United Kingdom", markers: [place("Lake District", [-3.1, 54.5], "A")] },
    { id: "detail", label: "Detail", view: "lake", extentText: "the Lake District National Park", markers: [place("Scafell Pike", [-3.21, 54.45], "B"), place("Windermere", [-2.95, 54.35], "C")] },
  ], layers: [{ id: "towns", label: "Towns layer", legend: "towns D Keswick, E Ambleside and F Kendal, shown in the detail view", markers: [{ ...place("Keswick", [-3.13, 54.6], "D"), views: ["detail"] }, { ...place("Ambleside", [-2.96, 54.43], "E"), views: ["detail"] }, { ...place("Kendal", [-2.75, 54.33], "F"), views: ["detail"] }] }] });
export const ITALY_EXPLORER = visual("explorer", "Map explorer: Campania, overview and detail",
  "Overview shows Italy with marker A for Rome and marker B for Naples. Detail shows the region of Campania with no other markers. Places layer, detail view only: C Naples, a city, and D Vesuvius, a volcano. North is up.",
  ["Overview: Italy, A is Rome and B is Naples.", "Detail: the region of Campania.", "Places layer, detail only: C Naples (city) and D Vesuvius (volcano).", "Switch views to compare. Zooming changes the drawing, not the real place."],
  { views: [
    { id: "overview", label: "Overview", view: "italy", extentText: "Italy", markers: [place("Rome", [12.5, 41.9], "A"), place("Naples", [14.27, 40.85], "B")] },
    { id: "detail", label: "Detail", view: "campania", extentText: "the region of Campania", markers: [] },
  ], layers: [{ id: "places", label: "Places layer", legend: "C Naples (city) and D Vesuvius (volcano), shown in the detail view", markers: [{ ...place("Naples", [14.27, 40.85], "C"), views: ["detail"] }, { ...place("Vesuvius", [14.43, 40.82], "D"), views: ["detail"] }] }] });

const sources = record(["A map shows places on a flat page. A globe shows the whole Earth's shape.", "An atlas is a book of maps of countries, continents and the world.", "A digital map lets you zoom, switch views and turn layers on or off.", "A local map shows paths and buildings in detail."], "Which source for which job?");
const SRC = ["g5_dfe"], EXS = ["g5_dfe", "atlas", "example"];

export const mapsAtlasesAndDigitalMapping = topic([
  lesson(["Maps, atlases, globes and digital maps do different jobs.", "A globe shows the Earth's shape.", "A digital map can zoom and switch layers."], sources, [
    c("Which source shows the shape of the whole Earth?", "A globe", "A local map", "A town plan", sources, SRC, "Read the first line of the notes."),
    c("Which source is a book of maps of countries and continents?", "An atlas", "A globe", "A town plan", sources, SRC, "Think about a book you could keep on a shelf."),
    c("Which source lets you zoom and switch layers on or off?", "A digital map", "A paper atlas page", "A globe", sources, SRC, "Read the notes about zooming."),
    c("Which source best shows paths and buildings near a lake?", "A local map", "A world map", "A globe", sources, SRC, "You need a lot of detail."),
    c("Which source best shows where countries in Europe are?", "An atlas", "A town plan", "A walking route card", sources, SRC, "You need many countries on one page."),
    c("Which source helps you compare a mountain and a lake close up?", "A detailed digital map", "A globe of the whole Earth", "A map of the world's oceans", sources, SRC, "Choose the one that shows more detail of a small area."),
    sort("Which source suits each job? Sort the jobs.", ["Atlas or globe", "Local map"], [["See which continent a country is in", 0], ["See the whole world's countries", 0], ["Find a path beside a lake", 1], ["Plan a walk through a village", 1]], sources, SRC, "Think about how much detail each job needs."),
    ordered("Order these maps from the smallest area to the largest area.", ["Plan of a town", "Map of the Lake District", "Map of the United Kingdom", "Map of the world"], record(["A town plan shows a small area.", "A map of the Lake District shows a national park.", "A map of the UK shows four nations.", "A world map shows every continent."], "Maps of different areas"), SRC, "Start with the smallest place."),
  ]),
  lesson(["Read the key, then the scale bar.", "Use north to find directions.", "Count whole squares, then use the scale."], A.v, [
    dirQ(A, "Windmill", "Bridge"),
    dirQ(A, "Campsite", "Lookout"),
    dirQ(A, "Pond", "Campsite"),
    dirQ(B, "Church", "Lake"),
    distQ(A, "Windmill", "Bridge", 3, 9),
    distQ(A, "Bridge", "Pond", 3, 12),
    distQ(B, "Farm", "Church", 3, 5),
    distQ(B, "Wood", "Lake", 4, 6),
    c("Plan A: which of these is directly north of the Campsite?", "Hut", "Ford", "Pond", A.v, ["example"], "Stay in the same column and go up."),
    c("Plan B: which feature is directly south of the Wood?", "Lake", "Farm", "Church", B.v, ["example"], "Stay in the same column and go down."),
    sort("Plan A: sort the features by where they are from the Campsite.", ["North of the Campsite", "East of the Campsite"], [["Hut", 0], ["Windmill", 0], ["Ford", 1], ["Pond", 1]], A.v, ["example"], "Check the column first, then the row."),
    ordered("Plan A: order the bottom-row features from west to east.", ["Campsite", "Ford", "Pond"], A.v, ["example"], "West is on the left."),
  ]),
  lesson(["Use the Overview for the wider place.", "Use Detail for a closer look.", "Turn a layer on to add one kind of marker."], LAKE_EXPLORER, [
    c("Which view shows the whole United Kingdom?", "Overview", "Detail", "Towns layer", LAKE_EXPLORER, EXS, "Check which view names the United Kingdom."),
    c("Which view shows Scafell Pike and Windermere?", "Detail", "Overview", "Neither view", LAKE_EXPLORER, EXS, "Read the markers listed for each view."),
    c("Which button adds Keswick, Ambleside and Kendal?", "Towns layer", "Overview", "Detail", LAKE_EXPLORER, EXS, "Look for the layer that lists towns."),
    c("With towns on in Detail, which town is furthest north?", "Keswick", "Ambleside", "Kendal", LAKE_EXPLORER, EXS, "North is up, so find the highest marker."),
    c("With towns on in Detail, which town is furthest east?", "Kendal", "Keswick", "Ambleside", LAKE_EXPLORER, EXS, "East is to the right."),
    c("Does zooming in make the Lake District bigger in real life?", "No, only the drawing changes", "Yes, the park grows", "Yes, but only in the Detail view", LAKE_EXPLORER, EXS, "Think about what the screen shows and what the place is."),
    c("In the Italy explorer, which layer marker is the volcano?", "D Vesuvius", "C Naples", "A Rome", ITALY_EXPLORER, EXS, "Read the legend for the places layer."),
    c("In the Italy explorer, which view shows Rome?", "Overview", "Detail", "Places layer", ITALY_EXPLORER, EXS, "Check which view lists marker A."),
    sort("Sort the evidence by the view that shows it.", ["Overview", "Detail"], [["Marker A for the Lake District", 0], ["Scafell Pike, a mountain", 1], ["Windermere, a lake", 1], ["Most of the United Kingdom", 0]], LAKE_EXPLORER, EXS, "Read the list of markers for each view."),
  ]),
  lesson(["Start with the question you want to answer.", "Choose the map, view or layer that gives that evidence.", "A layer shows only the places it lists."], LAKE_EXPLORER, [
    c("Which tool answers: where are towns in the Lake District?", "Detail view with Towns layer on", "Overview with the layer off", "A globe without labels", LAKE_EXPLORER, EXS, "You need to see town markers up close."),
    c("Which view helps show where the Lake District sits in the UK?", "Overview", "Detail", "Towns layer alone", LAKE_EXPLORER, EXS, "You need the wider place."),
    c("Which source helps find the continent of a country?", "An atlas", "A town plan", "A walking card", sources, SRC, "Choose a book of maps of countries."),
    c("Which town marker is nearest the Windermere lake marker here?", "Ambleside", "Kendal", "Keswick", LAKE_EXPLORER, EXS, "Compare marker distances on the detail view."),
    c("Which towns does the Towns layer show?", "Keswick, Ambleside and Kendal", "Keswick, Kendal and Windermere", "Kendal, Ambleside and Scafell Pike", LAKE_EXPLORER, EXS, "Read the layer legend."),
    c("Which Campania question needs the Places layer in Detail?", "Where are Naples and Vesuvius?", "Where is Rome in Italy?", "How big is Italy?", ITALY_EXPLORER, EXS, "Find which markers the layer adds."),
    c("Which source helps plan a route past a bridge and a pond?", "A local map", "A globe", "A world atlas page", A.v, ["g5_dfe", "example"], "You need small features such as bridges."),
    ordered("Order the steps of a mapping enquiry.", ["Ask a question", "Choose the map, view or layer", "Read the key and scale", "Write what the evidence shows"], record(["Start with a question.", "Choose a source that can answer it.", "Read keys and scale before choosing an answer.", "Say what the map shows and what it does not."], "Planning with a map"), SRC, "The question comes first."),
  ]),
]);
