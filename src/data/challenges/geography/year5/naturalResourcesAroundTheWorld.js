import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const RES = "y5_resources", ATLAS = "atlas", COCOA = "y5_cocoa", ENERGY = "g4_renewable";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, RES], "Find the marker list in the evidence, then match the name.");

const kinds = record([
  "A natural resource is something from nature that people use.",
  "Finite resources, such as coal, oil, gas and metals, will run out because they take millions of years to form.",
  "Renewable resources, such as wind, sunshine and flowing water, are not used up.",
  "Trees and fish can be renewable if people replant and do not take too many.",
], "Kinds of natural resource");
const spread = map("world", ["Saudi Arabia", "Chile", "Norway", "Iceland"], [
  "Saudi Arabia has very large oil fields, in the desert.",
  "Chile has large copper mines in the north. Copper is used in electric wires.",
  "Norway has steep mountains and heavy rain, so it makes most of its electricity from hydropower.",
  "Iceland has hot rock near the surface, so it uses geothermal energy for heating and electricity.",
]);
const table = visual("table", "Where some resources come from", "Oil: Saudi Arabia, used for fuel and plastics. Copper: Chile, used for electric wires. Hydropower: Norway, used for electricity. Geothermal energy: Iceland, used for heating. Cocoa: Ghana and Cote d'Ivoire, used for chocolate. Coffee: Brazil, used for drinks.", [
  "Each example comes from a place with the right rock, rain or climate.", "Cocoa grows only where it is hot and wet all year.", "Coffee also needs warm weather and no hard frost.",
], { caption: "Resource, example place and use", columns: ["Resource", "Example place", "Use"], rows: [["Oil", "Saudi Arabia", "Fuel and plastics"], ["Copper", "Chile", "Electric wires"], ["Hydropower", "Norway", "Electricity"], ["Geothermal energy", "Iceland", "Heating"], ["Cocoa", "Ghana and Cote d'Ivoire", "Chocolate"], ["Coffee", "Brazil", "Drinks"]] });
const why = record([
  "Resources are not spread evenly: where they are depends on rock, rain, climate and height.",
  "The UK has little copper and cannot grow cocoa, so it buys them from other countries.",
  "Moving heavy resources such as oil by ship or pipeline costs money and energy.",
  "Finite resources are running down, so many countries are building more wind and solar power.",
  "Using less, reusing and recycling helps a resource last longer.",
], "Sharing and saving resources");

export const naturalResourcesAroundTheWorld = topic([
  lesson(["Natural resources come from nature.", "Some are finite and some are renewable.", "Sort the examples."], kinds, [
    c("What is a natural resource?", "Something from nature that people use", "Something only factories make", "A kind of map", kinds, [RES], "Read the first evidence sentence."),
    c("Which resource is finite?", "Oil", "Wind", "Sunshine", kinds, [RES, ENERGY], "Read the second evidence sentence."),
    c("Which resource is renewable?", "Wind", "Coal", "Gas", kinds, [RES, ENERGY], "Read the third evidence sentence."),
    c("Why will finite resources run out?", "They take millions of years to form", "They are made again within a single day", "They are never used by anyone at all", kinds, [RES], "Read the second evidence sentence."),
    c("When can trees be renewable?", "When people replant them", "When people cut them all down", "When no one ever plants", kinds, [RES], "Read the last evidence sentence."),
    c("Which is a renewable energy resource?", "Flowing water", "Coal dug from deep underground", "Oil pumped from beneath the sea", kinds, [RES, ENERGY], "Read the third evidence sentence."),
    c("Which is a finite metal resource?", "Copper", "Wind", "Sunshine", kinds, [RES], "Read the second evidence sentence."),
    sort("Sort each resource into finite or renewable.", ["Finite", "Renewable"], [["Coal", 0], ["Oil", 0], ["Wind", 1], ["Sunshine", 1]], kinds, [RES, ENERGY], "Read the second and third evidence sentences."),
  ]),
  lesson(["Resources are found in particular places.", "Read the labelled countries.", "Match the resource to the place."], spread, [
    c("Which marked country has very large oil fields?", "Saudi Arabia", "Iceland", "Norway", spread, [RES], "Read the first evidence sentence."),
    c("Which marked country has large copper mines?", "Chile", "Norway", "Iceland", spread, [RES], "Read the second evidence sentence."),
    c("What is copper used for in the evidence?", "Electric wires", "Chocolate", "Drinks", spread, [RES], "Read the second evidence sentence."),
    c("Which marked country makes most of its electricity from hydropower?", "Norway", "Saudi Arabia", "Chile", spread, [RES], "Read the third evidence sentence."),
    c("Which marked country uses geothermal energy?", "Iceland", "Saudi Arabia", "Chile", spread, [RES], "Read the last evidence sentence."),
    which(spread, "Chile", ["Saudi Arabia", "Norway"]),
    which(spread, "Iceland", ["Chile", "Norway"]),
    c("Which marked country lies furthest north?", "Iceland", "Norway", "Saudi Arabia", spread, [ATLAS], "Compare degrees north; the largest is furthest north."),
    ordered("Order the markers from north to south.", ["Iceland", "Norway", "Saudi Arabia", "Chile"], spread, [ATLAS], "Start with the largest degrees north."),
  ]),
  lesson(["Read the table of resources.", "Each resource comes from a suitable place.", "Match resource, place and use."], table, [
    c("Which resource comes from Saudi Arabia in the table?", "Oil", "Cocoa", "Coffee", table, [RES], "Read the first row."),
    c("Which place provides coffee in the table?", "Brazil", "Chile", "Iceland", table, [RES], "Read the last row."),
    c("What is the use of cocoa in the table?", "Chocolate", "Heating", "Electric wires", table, [COCOA], "Read the Cocoa row."),
    c("Which resource is used for heating in Iceland?", "Geothermal energy", "Oil", "Copper", table, [RES], "Read the Geothermal row."),
    c("Where does cocoa grow, according to the evidence?", "Where it is hot and wet all year", "Where it is frozen for most of the year", "Where it is dry desert with no rain", table, [COCOA], "Read the second evidence line."),
    c("Which resource is used for electric wires?", "Copper", "Cocoa", "Hydropower", table, [RES], "Read the Copper row."),
    c("Which resource is renewable in the table?", "Hydropower", "Oil", "Copper", table, [RES, ENERGY], "Hydropower uses flowing water."),
    c("Which place provides cocoa in the table?", "Ghana and Cote d'Ivoire", "Saudi Arabia", "Norway", table, [COCOA], "Read the Cocoa row."),
    sort("Sort each resource by whether it is a mineral or fuel, or a crop.", ["Mineral or fuel", "Crop"], [["Oil", 0], ["Copper", 0], ["Cocoa", 1], ["Coffee", 1]], table, [RES], "Crops are grown on farms."),
  ]),
  lesson(["Resources are not shared evenly.", "Countries trade to get what they lack.", "Finite resources need careful use."], why, [
    c("Why are resources not spread evenly?", "They depend on rock, rain, climate and height", "They are spread by hand into every country", "They are created by the lines drawn on maps", why, [RES], "Read the first evidence sentence."),
    c("Why does the UK buy cocoa from other countries?", "It cannot grow cocoa in its climate", "It has the most cocoa in the world", "Cocoa is not wanted", why, [RES, COCOA], "Read the second evidence sentence."),
    c("What does moving heavy resources by ship or pipeline cost?", "Money and energy", "Nothing at all", "Only time", why, [RES], "Read the third evidence sentence."),
    c("Why are many countries building more wind and solar power?", "Finite resources are running down", "Wind and solar run out first", "Coal is renewable", why, [RES, ENERGY], "Read the fourth evidence sentence."),
    c("How does recycling help?", "It helps a resource last longer", "It uses up resources faster", "It makes resources finite", why, [RES], "Read the last evidence sentence."),
    c("Which statement is supported by the evidence?", "Some countries have resources that others lack", "Every country has the same amount of resources", "Resources never move from one place to another", why, [RES], "Read the first and second evidence sentences."),
    c("Which action helps resources last longer?", "Reusing and recycling", "Throwing everything away", "Burning more fuel", why, [RES], "Read the last evidence sentence."),
    c("Which is the best reason countries trade resources?", "Places have different resources and needs", "All places have the same resources and needs", "Trade between countries is not allowed by law", why, [RES], "Think about unequal resources."),
    sort("Sort each action by whether it uses more or fewer resources.", ["Uses fewer resources", "Uses more resources"], [["Reusing a bottle", 0], ["Recycling paper", 0], ["Throwing away working things", 1], ["Leaving lights on all day", 1]], why, [RES], "Think about the last evidence sentence."),
  ]),
]);
