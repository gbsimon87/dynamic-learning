import { c, lesson, sort, topic, visual, record } from "./authoring.js";

// Rivers and People: evidenced uses, upstream/downstream reading, a calm case-study record and reasoned choices.
const USES = ["g3_river", "g3_columbia"];
const EX = ["example", "g3_river"];

const useLines = [
  "People use rivers for drinking water, irrigation and transport.",
  "Irrigation means watering crops.",
  "Dams on rivers can produce hydroelectric power.",
  "Dams on the Columbia and its major tributaries produce half of the electricity used in the Pacific Northwest.",
  "A floodplain is flat land beside a river.",
  "A river can rise over its floodplain after heavy rain.",
];
const uses = record(useLines, "Evidence about river uses");
uses.alt = "People use rivers for drinking water, irrigation and transport. Dams on rivers can produce hydroelectric power. Dams on the Columbia and its major tributaries produce half of the electricity used in the Pacific Northwest. A floodplain is flat land beside a river. A river can rise over its floodplain after heavy rain.";

const placeLines = [
  "Example data, not a real river.",
  "Upstream means nearer the source. Downstream means nearer the mouth.",
  "Water flows from A towards E.",
  "A: hill farm. B: village school. C: market town with a drinking-water works.",
  "D: wide fields watered by irrigation. E: port with boats.",
];
const mapRiver = visual("river", "An example river and its settlements", "Example data, not a real river. Arrows point from the hills towards the sea. A is high in the hills, with a hill farm that uses stream water for its animals. B is on a side stream, with a village school. C is where the side stream meets the main river, in a market town with a drinking-water works. D is on the main river below C, beside wide fields watered by irrigation. E is beside the sea, with a port where boats load cargo.", placeLines, { variant: "route", letters: true });

const tableLines = ["Example data: a simple case study of one river.", "Places are listed from the source to the mouth.", "Each place has a main river use and a need."];
const caseTable = visual("table", "Case study record, example data", "Example data. From the source to the mouth: the hill farm uses water for sheep and needs clean stream water. The market town takes drinking water and needs a steady supply. The valley farms use irrigation and need enough water in summer. The port handles boats and needs deep, safe water.", tableLines, {
  caption: "Example case study: one river, four places", columns: ["Place", "Position on river", "Main river use", "Need"],
  rows: [["Hill farm", "Near the source", "Water for sheep", "Clean stream water"], ["Market town", "Middle", "Drinking-water supply", "A steady supply"], ["Valley farms", "Below the town", "Irrigation", "Enough water in summer"], ["Port", "Near the mouth", "Boats and cargo", "Deep, safe water"]],
});
const UNITS = [["Hill farm", 2], ["Market town", 9], ["Valley farms", 7], ["Port", 4]];
const unitsRecord = record(["Example data: units of river water used each day.", "Hill farm 2 units. Market town 9 units. Valley farms 7 units. Port 4 units.", "A unit is a made-up amount for practice."], "Example water use");
const unitChart = (prompt, label, options) => ({ kind: "chart", prompt, answer: UNITS.find(([l]) => l === label)[1], options, chart: { type: "bar", rows: UNITS.map(([l, value]) => ({ label: l, value })), step: 1, max: 10, unit: "Example units of water used" }, visual: unitsRecord, sources: ["example"], evidence: [unitsRecord.lines[1]], hint: "Match the labelled bar with the example record." });

const choiceRecord = (title, lines) => record(lines, title);
const town = choiceRecord("Example choice: town water", ["Example data: a town wants steadier drinking water.", "Option 1 is a reservoir upstream. It gives a steady supply but covers some farmland.", "Option 2 is pumping water straight from the river. It is quick to start, but supply drops in dry weeks."]);
const farm = choiceRecord("Example choice: farm water", ["Example data: farmers need water in summer.", "Option 1 is an irrigation channel. It waters the fields but leaves less water in the river downstream.", "Option 2 is small rainwater tanks. They keep more water in the river but store only a little."]);
const meadow = choiceRecord("Example choice: flood space", ["Example data: a village beside a river wants calmer, safer land.", "Option 1 is a raised bank. It protects homes behind it but gives the river less space.", "Option 2 is an open meadow on the floodplain. It gives the river space but no homes can be built there."]);
const harbour = choiceRecord("Example choice: boats", ["Example data: a port wants to carry more cargo.", "Option 1 is a deeper channel. Bigger boats can come, but it costs money and disturbs the river bed.", "Option 2 is keeping the channel as it is. It costs nothing but only small boats can use it."]);
const thamesPlan = choiceRecord("Real record: the Thames plan", ["Environment Agency record, updated October 2024.", "The Thames between Egham and Teddington is on the largest area of undefended, developed floodplain in England.", "The Agency says a long-term, sustainable plan is needed to manage flood risk.", "Undefended means without flood walls or banks. Developed means built on."]);

export const riversAndPeople = topic([
  lesson(["Rivers give people water, power and routes for boats.", "Irrigation means watering crops.", "Rivers can also rise over flat land beside them."], uses, [
    c("Which river use gives power to homes and businesses?", "Hydroelectric dams", "Irrigation", "Boat transport", uses, USES),
    c("Which river use helps crops grow in dry fields?", "Irrigation", "Hydroelectric power", "Drinking water", uses, USES),
    c("Which river use moves people or goods by boat?", "Transport", "Irrigation", "Hydroelectric power", uses, USES),
    c("Which river use gives drinking water?", "Water supply", "Boat transport", "Hydroelectric power", uses, USES),
    c("What do the dams on the Columbia help to produce?", "About half of the electricity used in the Pacific Northwest", "All of the electricity in the United States", "Drinking water for every city", uses, USES),
    c("What is a floodplain?", "Flat land beside a river", "The place where a river begins", "A dam that makes electricity", uses, USES),
    c("Which is a possible challenge, not a use?", "A river rising over its floodplain", "Watering crops", "Producing hydroelectric power", uses, USES),
    sort("Sort each item as a use or a possible challenge.", ["Helpful use", "Possible challenge"], [["Watering crops", 0], ["Boat transport", 0], ["Hydroelectric power", 0], ["A river rising over its floodplain", 1]], uses, USES),
  ]),
  lesson(["Upstream is nearer the source. Downstream is nearer the mouth.", "Places along a river can use it differently.", "Read each place from the diagram."], mapRiver, [
    c("Which letter shows the port with boats?", "E", "A", "D", mapRiver, EX),
    c("Which letter shows the drinking-water works?", "C", "A", "E", mapRiver, EX),
    c("Which letter shows the wide fields watered by irrigation?", "D", "B", "C", mapRiver, EX),
    c("Which letter shows the hill farm?", "A", "B", "E", mapRiver, EX),
    c("Which place is furthest downstream?", "The port", "The hill farm", "The village school", mapRiver, EX),
    c("Which place is nearest the source?", "The hill farm", "The market town", "The port", mapRiver, EX),
    c("Is the drinking-water works upstream or downstream of the irrigated fields?", "Upstream of the fields", "Downstream of the fields", "On a different river", mapRiver, EX),
    c("Which place is on the side stream?", "The village school", "The port", "The irrigated fields", mapRiver, EX),
    sort("Sort each place by where it sits compared with the market town.", ["Upstream of the town", "Downstream of the town"], [["Hill farm", 0], ["Irrigated fields", 1], ["Port with boats", 1]], mapRiver, EX),
  ]),
  lesson(["A record can compare different needs.", "Look at each place and its river use.", "Different places can need different things."], caseTable, [
    c("Which place needs deep, safe water for boats?", "Port", "Hill farm", "Market town", caseTable, EX),
    c("Which place is furthest downstream in the record?", "Port", "Hill farm", "Market town", caseTable, EX),
    c("Which place uses the river for irrigation?", "Valley farms", "Market town", "Port", caseTable, EX),
    c("Which place is upstream of the market town?", "Hill farm", "Valley farms", "Port", caseTable, EX),
    c("What does the record show about river needs?", "Different places need different things", "Every place needs the same thing", "Only the port needs water", caseTable, EX),
    c("If the town takes more water, which place might notice first downstream?", "Valley farms", "Hill farm", "Port", caseTable, EX, "Find the next place downstream of the town."),
    unitChart("How many example units does the port use?", "Port", [4, 7, 9]),
    unitChart("How many example units does the market town use?", "Market town", [9, 7, 4]),
    c("Which place uses most water in the example record?", "Market town", "Valley farms", "Hill farm", unitsRecord, ["example"]),
  ]),
  lesson(["Choose actions using both benefits and limits.", "A good choice matches the need in the evidence.", "Flooding is one challenge that planners manage."], town, [
    c("Which option best gives a steady supply in dry weeks?", "Option 1, the reservoir", "Option 2, pumping from the river", "Neither option", town, ["example"]),
    c("Which limit goes with the upstream reservoir?", "It covers some farmland", "Supply drops in dry weeks", "It is only for boats", town, ["example"]),
    c("Which option is quick to start?", "Option 2, pumping", "Option 1, the reservoir", "Both are equally quick", town, ["example"]),
    c("Which limit goes with the irrigation channel?", "Less water stays in the river downstream", "It covers farmland with a lake", "It stops the water cycle", farm, ["example"]),
    c("Which option keeps more water in the river?", "Option 2, rainwater tanks", "Option 1, irrigation channel", "Neither option", farm, ["example"]),
    c("Which option leaves floodplain space free of homes?", "Option 2, the open meadow", "Option 1, the raised bank", "Both options", meadow, ["example"]),
    c("Which option lets only small boats use the river?", "Option 2, keep the channel", "Option 1, a deeper channel", "Both options", harbour, ["example"]),
    c("What kind of land does the Thames record describe?", "Developed floodplain", "Dry hills", "A sandy beach", thamesPlan, ["g3_thamesFlood"]),
    c("What does the Agency say is needed for flood risk?", "A long-term, sustainable plan", "No plan at all", "Only an emergency plan", thamesPlan, ["g3_thamesFlood"]),
    sort("Sort each point about the reservoir and pumping options.", ["Benefit", "Limit"], [["Steady supply", 0], ["Quick to start", 0], ["Covers some farmland", 1], ["Supply drops in dry weeks", 1]], town, ["example"]),
  ]),
]);
