import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const SC = "y5_scotland", NEVIS = "y5_benNevis", ATLAS = "atlas", UKS = "ukAreas";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, SC], "Find the marker list in the evidence, then match the name.");

const cities = map("uk", ["Edinburgh", "Glasgow", "Inverness", "Aberdeen"], [
  "Scotland is one of the four nations of the United Kingdom.",
  "Edinburgh is the capital. Glasgow is the largest city.",
  "Inverness is the main city of the Highlands in the north.",
  "Aberdeen is a port on the North Sea coast in the east.",
]);
const physical = map("uk", ["Isle of Skye", "Ben Nevis", "Loch Ness", "Inverness", "Cairngorms"], [
  "Ben Nevis is the highest mountain in the United Kingdom, about 1,345 metres high.",
  "Loch Ness is a long, deep freshwater loch (the Scottish word for lake).",
  "The Isle of Skye is an island off the west coast.",
  "The Cairngorms are a high mountain area in the eastern Highlands.",
]);
const land = record([
  "Steep, rocky hills and cold, wet weather make crop farming hard in much of the Highlands.",
  "Sheep graze the hills, and forests grow timber.",
  "Fast streams and high rainfall feed lochs that are used to make hydroelectric power.",
  "Walkers, climbers and skiers visit for the mountain scenery, so tourism gives many jobs.",
  "Few people live in the Highlands, and they live far apart.",
], "Land use and people in the Highlands");
const people = visual("table", "Highlands and Central Belt compared", "The Highlands have mountains, glens and lochs, few people and jobs in farming, tourism, forestry and hydroelectric power. The Central Belt between Glasgow and Edinburgh has lower land, most of Scotland's people and jobs mainly in services.", [
  "The Central Belt is the lowland between Glasgow and Edinburgh.", "Most Scots live in the Central Belt.", "These are broad patterns; both areas have a mix of land uses.",
], { caption: "Two parts of Scotland compared", columns: ["Feature", "Highlands", "Central Belt"], rows: [["Landscape", "Mountains, glens and lochs", "Lower, flatter land"], ["People", "Few, living far apart", "Most of Scotland's people"], ["Main jobs", "Farming, tourism, forestry, hydropower", "Mostly services in cities"]] });

export const scotlandAndTheHighlands = topic([
  lesson(["Scotland is a nation in the United Kingdom.", "Edinburgh is its capital and Glasgow is its largest city.", "The Highlands are the mountains in the north."], cities, [
    c("Which UK nation contains the Scottish Highlands?", "Scotland", "Wales", "Northern Ireland", cities, [SC, UKS], "Read the first evidence sentence."),
    c("What is the capital of Scotland?", "Edinburgh", "Glasgow", "Inverness", cities, [SC], "Read the second evidence sentence."),
    c("Which marked city is the largest in Scotland?", "Glasgow", "Edinburgh", "Aberdeen", cities, [SC], "It is named in the second evidence sentence."),
    c("Which marked city is the main city of the Highlands?", "Inverness", "Edinburgh", "Glasgow", cities, [SC], "Read the third evidence sentence."),
    c("Which sea lies off the east coast of Scotland?", "The North Sea", "The Irish Sea", "The English Channel", cities, [SC, ATLAS], "Aberdeen is a port on this sea."),
    c("Which marked city lies furthest north?", "Inverness", "Aberdeen", "Edinburgh", cities, [ATLAS], "Compare degrees north; the largest is furthest north."),
    c("Which marked city lies furthest south?", "Edinburgh", "Glasgow", "Inverness", cities, [ATLAS], "Compare degrees north; the smallest is furthest south."),
    which(cities, "Aberdeen", ["Edinburgh", "Glasgow"]),
    sort("Sort each place by whether it is in Scotland.", ["In Scotland", "Not in Scotland"], [["Edinburgh", 0], ["Inverness", 0], ["Glasgow", 0], ["Cardiff", 1]], cities, [SC, UKS], "Cardiff is the capital of Wales."),
  ]),
  lesson(["Read the labelled mountain, loch and island.", "Ben Nevis is the highest mountain in the UK.", "Loch means lake."], physical, [
    c("Which marked place is the highest mountain in the UK?", "Ben Nevis", "Loch Ness", "Isle of Skye", physical, [NEVIS], "Read the first evidence sentence."),
    c("Which marked place is an island?", "Isle of Skye", "Ben Nevis", "Loch Ness", physical, [SC], "Read the third evidence sentence."),
    c("Which marked place is a freshwater loch?", "Loch Ness", "Cairngorms", "Isle of Skye", physical, [SC], "Read the second evidence sentence."),
    c("What does the Scottish word loch mean?", "Lake", "Hill", "Island", physical, [SC], "Read the second evidence sentence."),
    c("Of the five marked places, which lies furthest west?", "Isle of Skye", "Ben Nevis", "Cairngorms", physical, [ATLAS], "Compare degrees west; the largest is furthest west."),
    c("Of the five marked places, which lies furthest east?", "Cairngorms", "Inverness", "Loch Ness", physical, [ATLAS], "Compare degrees west; the smallest is furthest east."),
    c("Of the five marked places, which lies furthest south?", "Ben Nevis", "Cairngorms", "Isle of Skye", physical, [ATLAS], "Compare degrees north; the smallest is furthest south."),
    which(physical, "Cairngorms", ["Loch Ness", "Ben Nevis"]),
    ordered("Order the markers from west to east.", ["Isle of Skye", "Ben Nevis", "Loch Ness", "Inverness", "Cairngorms"], physical, [ATLAS], "Start with the largest degrees west."),
  ]),
  lesson(["Land use depends on the landscape and weather.", "Steep hills suit sheep, trees and tourism.", "Read each evidence line."], land, [
    c("Why is crop farming hard in much of the Highlands?", "The hills are steep and rocky, and the weather is cold and wet", "The land is flat and dry, and the summers are very hot", "The land is covered by cities, so no space is left for farms", land, [SC], "Read the first evidence sentence."),
    c("Which animals graze the Highland hills?", "Sheep", "Camels", "Pigs in huge barns", land, [SC], "Read the second evidence sentence."),
    c("Why can lochs be used to make hydroelectric power?", "Fast streams and high rainfall feed them", "They freeze solid, so the water cannot flow for long", "They are very small and far from any hills or streams", land, [SC], "Read the third evidence sentence."),
    c("Why does tourism give many jobs in the Highlands?", "Visitors come for the mountain scenery", "Visitors come for flat farmland", "No visitors ever come", land, [SC], "Read the fourth evidence sentence."),
    c("Which land use fits the Highlands best?", "Sheep grazing and forestry", "Large wheat fields", "Container ports", land, [SC], "Match each land use to the evidence."),
    c("Which statement about people in the Highlands is supported?", "Few people live there, far apart", "Millions live packed close together", "Nobody has ever lived there", land, [SC], "Read the last evidence sentence."),
    c("What is one reason forests are planted on Highland hills?", "To grow timber on land too steep for crops", "To make the hills flatter so cities can be built", "To stop all the rain from reaching the lochs below", land, [SC], "Think about land that crops cannot use."),
    sort("Sort each activity by whether the evidence links it to the Highlands.", ["Linked in the evidence", "Not linked in the evidence"], [["Sheep grazing", 0], ["Hydroelectric power", 0], ["Mountain tourism", 0], ["Container port", 1]], land, [SC], "Look for each activity in the evidence."),
  ]),
  lesson(["Compare two parts of Scotland.", "Landscape affects where people live and work.", "Say what the evidence can and cannot show."], people, [
    c("Where do most people in Scotland live?", "In the Central Belt", "In the Highland glens", "On the Isle of Skye", people, [SC], "Read the second evidence line."),
    c("Which landscape describes the Highlands?", "Mountains, glens and lochs", "Lower, flatter land", "Only city streets", people, [SC], "Read the Landscape row."),
    c("Which jobs are more typical of the Highlands?", "Farming, tourism, forestry and hydropower", "Mostly shipbuilding, car making and steel in big towns", "Mostly banking, offices and shops in large city centres", people, [SC], "Read the Main jobs row."),
    c("Which is the best reason fewer people live in the Highlands?", "Steep land and a cold, wet climate make living and farming harder", "The Highlands are too close to Glasgow, so no one needs to live there", "Highland weather is always hot and dry, which people avoid", people, [SC], "Link the landscape to the number of people."),
    c("Which claim is NOT supported by the evidence?", "All of Scotland is mountainous", "Most Scots live in the Central Belt", "The Highlands have lochs", people, [SC], "Look for the word all."),
    c("Why does the table say these are broad patterns?", "Both areas have a mix of land uses", "Both areas are exactly the same", "Nobody lives in either area", people, [SC], "Read the third evidence line."),
    c("What would best test whether the pattern holds across Scotland?", "Compare more places in each part", "Look at one photograph only", "Ask one visitor", people, [SC], "A better test uses more evidence."),
    sort("Sort each feature by the part of Scotland it describes best.", ["Highlands", "Central Belt"], [["Mountains and lochs", 0], ["Few people, far apart", 0], ["Most of Scotland's people", 1], ["Mostly services jobs", 1]], people, [SC], "Use the table columns."),
  ]),
]);
