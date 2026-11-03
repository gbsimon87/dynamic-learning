import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const SC = "y5_scotland", AN = "y5_andalusia", SN = "y5_sierraNevada", ALH = "y5_alhambra", ATLAS = "atlas", OIL = "y5_olive";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, AN], "Find the marker list in the evidence, then match the name.");

const places = map("europe", ["Spain", "Seville", "Malaga", "Granada"], [
  "Andalusia is a region in the south of Spain, in southern Europe.",
  "Seville is the capital of Andalusia.",
  "Malaga is a port and holiday city on the Mediterranean coast.",
  "Granada lies inland, near the Sierra Nevada mountains.",
]);
const physical = map("europe", ["Cordoba", "Cadiz", "Sierra Nevada", "Strait of Gibraltar"], [
  "The Sierra Nevada are high mountains. Mulhacen, at about 3,479 metres, is the highest peak in mainland Spain.",
  "The Guadalquivir is Andalusia's main river. It flows past Cordoba and Seville to the Atlantic coast.",
  "The Strait of Gibraltar is a narrow sea route between Spain and Africa.",
  "Cadiz is a port on the Atlantic coast.",
]);
const use = record([
  "Summers are hot and dry. Winters are mild on the coast.",
  "Little rain falls in summer, so farmers use irrigation water from rivers and reservoirs.",
  "Andalusia grows more olives than any other region of Spain.",
  "Plastic greenhouses near Almeria grow vegetables for export.",
  "Warm, sunny beaches bring millions of tourists to the coast.",
  "The Alhambra, a famous palace in Granada, is a World Heritage Site.",
], "Land use and climate in Andalusia");
const compare = visual("table", "Andalusia and the Highlands compared", "Andalusia has hot dry summers, mountains, a river valley and long coasts, with olives, vegetables and tourism. The Highlands have a cool wet climate, mountains, lochs and sheep farming, forestry, hydropower and tourism.", [
  "Both regions have mountains, coasts and tourism.", "Climate and farming are very different.", "Each row compares the same feature in both places.",
], { caption: "Two regions compared", columns: ["Feature", "Andalusia (Spain)", "Scottish Highlands (UK)"], rows: [["Summer", "Hot and dry", "Cool and often wet"], ["Farming", "Olives, citrus, irrigated vegetables", "Sheep grazing and forestry"], ["Water", "Needs irrigation and reservoirs", "Plenty of rain feeds lochs"], ["Energy", "Large solar farms", "Hydroelectric power"]] });

export const andalusiaInSpain = topic([
  lesson(["Andalusia is a region in southern Spain.", "Seville is its capital.", "Spain is a country in Europe."], places, [
    c("Which country contains the region of Andalusia?", "Spain", "Italy", "Portugal", places, [AN], "Read the first evidence sentence."),
    c("What is the capital of Andalusia?", "Seville", "Malaga", "Granada", places, [AN], "Read the second evidence sentence."),
    c("Which continent is Andalusia in?", "Europe", "Africa", "South America", places, [AN], "Read the first evidence sentence."),
    c("Which sea lies off the coast near Malaga?", "The Mediterranean Sea", "The Baltic Sea", "The North Sea", places, [AN], "Read the third evidence sentence."),
    c("Which marked city lies furthest east?", "Granada", "Seville", "Malaga", places, [ATLAS], "Compare degrees west; the smallest is furthest east."),
    c("Which marked city lies furthest west?", "Seville", "Granada", "Malaga", places, [ATLAS], "Compare degrees west; the largest is furthest west."),
    which(places, "Granada", ["Seville", "Malaga"]),
    which(places, "Spain", ["Seville", "Malaga"]),
    sort("Sort each place by whether it is in Andalusia.", ["In Andalusia", "Not in Andalusia"], [["Seville", 0], ["Malaga", 0], ["Granada", 0], ["Madrid", 1]], places, [AN], "Madrid is the capital of Spain, in the centre."),
  ]),
  lesson(["Read the labelled mountains, strait and port.", "The Strait of Gibraltar separates Spain from Africa.", "The Guadalquivir is the main river."], physical, [
    c("Which marked place is a range of high mountains?", "Sierra Nevada", "Cadiz", "Strait of Gibraltar", physical, [SN], "Read the first evidence sentence."),
    c("Which marked place is a narrow sea route to Africa?", "Strait of Gibraltar", "Cordoba", "Sierra Nevada", physical, [AN], "Read the third evidence sentence."),
    c("Where does the Guadalquivir flow to?", "The Atlantic coast", "The North Sea", "The Baltic Sea", physical, [AN], "Read the second evidence sentence."),
    c("Which marked place is a port on the Atlantic coast?", "Cadiz", "Cordoba", "Sierra Nevada", physical, [AN], "Read the last evidence sentence."),
    c("Of the four marked places, which lies furthest north?", "Cordoba", "Cadiz", "Sierra Nevada", physical, [ATLAS], "Compare degrees north; the largest is furthest north."),
    c("Of the four marked places, which lies furthest south?", "Strait of Gibraltar", "Cadiz", "Cordoba", physical, [ATLAS], "Compare degrees north; the smallest is furthest south."),
    c("Of the four marked places, which lies furthest east?", "Sierra Nevada", "Cordoba", "Cadiz", physical, [ATLAS], "Compare degrees west; the smallest is furthest east."),
    which(physical, "Cadiz", ["Cordoba", "Sierra Nevada"]),
    ordered("Order the markers from west to east.", ["Cadiz", "Strait of Gibraltar", "Cordoba", "Sierra Nevada"], physical, [ATLAS], "Start with the largest degrees west."),
  ]),
  lesson(["Climate shapes how land is used.", "Hot dry summers mean farms need irrigation.", "Sunny coasts attract tourists."], use, [
    c("Why do Andalusian farmers use irrigation?", "Little rain falls in summer", "Rain falls every day", "The land is frozen", use, [AN], "Read the second evidence sentence."),
    c("Which crop does Andalusia grow more of than any other Spanish region?", "Olives", "Bananas", "Rice only", use, [AN, OIL], "Read the third evidence sentence."),
    c("What do plastic greenhouses near Almeria grow?", "Vegetables for export", "Pine trees", "Cotton for clothes only", use, [AN], "Read the fourth evidence sentence."),
    c("Why do tourists visit the Andalusian coast?", "Warm, sunny beaches", "Deep winter snow", "Thick rainforest", use, [AN], "Read the fifth evidence sentence."),
    c("What is the Alhambra?", "A famous palace in Granada", "A river in Seville", "A mountain peak", use, [ALH], "Read the last evidence sentence."),
    c("Which description of Andalusian summers is supported?", "Hot and dry", "Cold and snowy", "Cool and wet", use, [AN], "Read the first evidence sentence."),
    c("Which land use fits the dry, sunny climate best?", "Olive groves", "Peat bogs", "Glaciers", use, [AN], "Think about hot dry summers."),
    sort("Sort each use of land by whether the evidence links it to farming or tourism.", ["Farming", "Tourism"], [["Olive groves", 0], ["Plastic greenhouses", 0], ["Beach resorts", 1], ["Palace visits", 1]], use, [AN, ALH], "Farming grows food; tourism serves visitors."),
  ]),
  lesson(["Compare Andalusia with the Highlands.", "Both are regions with mountains and coasts.", "Climate leads to different land uses."], compare, [
    c("Which summer description fits Andalusia?", "Hot and dry", "Cool and often wet", "Freezing", compare, [AN], "Read the Summer row."),
    c("Which farming fits the Scottish Highlands?", "Sheep grazing and forestry", "Olives and citrus", "Irrigated vegetables", compare, [AN, SC], "Read the Farming row."),
    c("Which region needs irrigation and reservoirs?", "Andalusia", "The Highlands", "Both need exactly the same", compare, [AN], "Read the Water row."),
    c("Which energy source is in the table for the Highlands?", "Hydroelectric power", "Large solar farms", "Coal mining", compare, [AN, SC], "Read the Energy row."),
    c("Which feature do both regions share?", "Mountains and tourism", "Hot dry summers", "Olive groves", compare, [AN, SC], "Read the first evidence line."),
    c("Why do the two regions use water differently?", "Andalusia has dry summers and the Highlands get plenty of rain", "Andalusia gets heavy snow and the Highlands stay hot and dry", "Both places are close to the Equator, so they match exactly", compare, [AN, SC], "Link climate to water."),
    c("Which statement is best supported by the table?", "Similar landscapes can have different climates and land uses", "All European regions share the same climate and farming", "Mountains always lead to sheep farming and hydroelectric power", compare, [AN], "Avoid claims about all places."),
    sort("Sort each feature by the region it describes.", ["Andalusia", "Scottish Highlands"], [["Hot, dry summers", 0], ["Irrigated vegetables", 0], ["Lochs feed hydropower", 1], ["Sheep grazing", 1]], compare, [AN, SC], "Use the table columns."),
  ]),
]);
