import { c, lesson, record, sort, ordered, topic } from "./authoring.js";
import { map } from "./maps.js";
import { MONTHS, climateTable, place } from "./records.js";

const letter = (v, name) => v.markers.find((m) => m.label === name).id;
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letter(v, name)}`, `Marker ${letter(v, others[0])}`, `Marker ${letter(v, others[1])}`, v, ["atlas"], "Find the marker list in the evidence, then match the name.");

const countries = map("southAmerica", ["Brazil", "Peru", "Chile", "Argentina"], [
  "South America is a continent with many countries.",
  "Brazil is in the east. Peru and Chile touch the Pacific Ocean.",
  "Chile is long and narrow along the Pacific coast.",
  "Argentina lies to the east of Chile.",
]);
const places = map("southAmerica", ["Brasilia", "Lima", "Santiago", "Buenos Aires", "Amazon Basin", "Andes Mountains", "Pampas"], [
  "Brasilia is a city in Brazil. Lima is a city in Peru.",
  "Santiago is a city in Chile. Buenos Aires is a city in Argentina.",
  "The Amazon Basin is the huge area drained by the Amazon River.",
  "The Andes Mountains are a long mountain range. The Pampas are grassland.",
]);

// Climate evidence computed from NASA POWER records.
const IDS = ["manaus", "quito", "buenosaires"];
const MI = [0, 2, 6, 9];
const table = climateTable(IDS, { title: "Amazon, Andes and Pampas example places", months: MI });
const nm = (id) => place(id).name;
const extreme = (mi, key, dir) => {
  const sorted = [...IDS].sort((a, b) => dir * (place(b).months[mi][key] - place(a).months[mi][key]));
  if (place(sorted[0]).months[mi][key] === place(sorted[1]).months[mi][key]) throw new Error("tie");
  return sorted;
};
const ask = (prompt, mi, key, dir, hint) => { const s = extreme(mi, key, dir); return c(prompt, nm(s[0]), nm(s[1]), nm(s[2]), table, ["g1_power"], hint); };
const range = (id) => { const t = place(id).months.map((m) => m.t); return Math.max(...t) - Math.min(...t); };
const bySwing = [...IDS].sort((a, b) => range(b) - range(a));
if (range(bySwing[0]) === range(bySwing[1])) throw new Error("tie");
const byHeight = [...IDS].sort((a, b) => place(b).elevationM - place(a).elevationM);
const mT = (id, i) => place(id).months[i].t, mR = (id, i) => place(id).months[i].r;
const chartRows = IDS.map((id) => ({ label: nm(id), value: mR(id, 2) }));
const chart = { kind: "chart", prompt: "How many millimetres of rain does Manaus typically get in March?", answer: mR("manaus", 2), options: [mR("manaus", 2), mR("quito", 2), mR("buenosaires", 2)], chart: { type: "bar", rows: chartRows, step: 50, max: 300, unit: "March rainfall (mm)" }, visual: table, sources: ["g1_power"], evidence: [table.lines[0]], hint: "Find the tall bar labelled Manaus and match its value." };

const swing = record([
  `Manaus, in the Amazon Basin, is ${mT("manaus", 0)}°C in January and ${mT("manaus", 6)}°C in July, with rain every month.`,
  `Quito, in the Andes, is near the equator (${Math.abs(place("quito").lat).toFixed(1)}° S). Its model cell has a data height of ${place("quito").elevationM} m and about ${mT("quito", 0)}°C all year.`,
  `Buenos Aires, on the Pampas, is ${mT("buenosaires", 0)}°C in January and ${mT("buenosaires", 6)}°C in July.`,
  "The Andes run through seven countries. The Amazon Basin covers eight countries and French Guiana.",
  "The Pampas cover parts of Argentina, Uruguay and Brazil.",
  "These are single model grid cells. They do not describe a whole region.",
], "Evidence from three South American places");

export const southAmericanCountriesAndCities = topic([
  lesson(["South America is a continent with many countries.", "We study Brazil, Peru, Chile and Argentina.", "Chile is long and narrow beside the Pacific Ocean."], countries, [
    c("What is South America?", "A continent with many countries", "A country in Brazil", "A city beside the Pacific", countries, ["atlas"], "It is the biggest of the three kinds of place."),
    which(countries, "Peru", ["Brazil", "Chile"]),
    which(countries, "Argentina", ["Chile", "Peru"]),
    c("Which marked country lies furthest east?", "Brazil", "Peru", "Chile", countries, ["atlas"], "Compare degrees west; the smaller number is further east."),
    c("Which marked country is long and narrow beside the Pacific?", "Chile", "Brazil", "Argentina", countries, ["atlas"], "Read the evidence sentence about Pacific coast shapes."),
    c("Which marked country lies furthest south?", "Chile", "Peru", "Brazil", countries, ["atlas"], "The largest degrees south is furthest south."),
    c("Which marked country lies furthest west?", "Peru", "Chile", "Brazil", countries, ["atlas"], "Compare degrees west; the larger number is further west."),
    sort("Sort each country by continent.", ["In South America", "Not in South America"], [["Brazil", 0], ["Peru", 0], ["Argentina", 0], ["Canada", 1], ["Mexico", 1]], countries, ["atlas", "g1_na", "g1_m49"], "Think about which places are in North America."),
  ]),
  lesson(["Read cities and physical regions on the map.", "Brasilia, Lima, Santiago and Buenos Aires are cities.", "The Andes and Pampas are physical regions."], places, [
    c("Which marked city is in Peru?", "Lima", "Santiago", "Brasilia", places, ["atlas"], "The evidence lists each city's country."),
    c("Which marked city is in Chile?", "Santiago", "Lima", "Buenos Aires", places, ["atlas"], "Read the second evidence sentence."),
    c("Which marked city lies furthest north?", "Lima", "Santiago", "Buenos Aires", places, ["atlas"], "Compare degrees; the smallest degrees south is further north."),
    c("Which marked city lies furthest east?", "Brasilia", "Lima", "Santiago", places, ["atlas"], "Compare degrees west; the smallest is further east."),
    c("Which marked region is a long mountain range?", "Andes Mountains", "Pampas", "Amazon Basin", places, ["g1_andes"], "Find the range in the last evidence sentence."),
    c("Which marked region is grassland?", "Pampas", "Amazon Basin", "Andes Mountains", places, ["g1_pampas"], "Read the last evidence sentence."),
    which(places, "Buenos Aires", ["Brasilia", "Lima"]),
    ordered("Order the city markers from furthest west to furthest east.", ["Lima", "Santiago", "Buenos Aires", "Brasilia"], places, ["atlas"], "Start with the largest degrees west."),
    sort("Sort each marker into city or physical region.", ["City", "Physical region"], [["Lima", 0], ["Andes Mountains", 1], ["Santiago", 0], ["Pampas", 1], ["Amazon Basin", 1]], places, ["atlas"], "Cities have homes and streets. Regions are natural areas."),
  ]),
  lesson(["Compare three places from different landscapes.", "Manaus is in the Amazon Basin. Quito is in the Andes.", "Buenos Aires is on the Pampas grassland."], table, [
    ask("In July, which place is warmest?", 6, "t", 1, "Read the July row and compare temperatures."),
    ask("In July, which place is coolest?", 6, "t", -1, "Read the July row and find the smallest temperature."),
    ask("In March, which place has the most rain?", 2, "r", 1, "Compare the rainfall in millimetres in the March row."),
    ask("In July, which place has the least rain?", 6, "r", -1, "Compare rainfall in the July row; smallest wins."),
    ask("In January, which place is warmest?", 0, "t", 1, "Read the January row."),
    c("Which place has the biggest change in temperature across the year?", nm(bySwing[0]), nm(bySwing[1]), nm(bySwing[2]), table, ["g1_power"], "Compare each column's coolest and warmest months."),
    c("Which place has the greatest data height in the table?", nm(byHeight[0]), nm(byHeight[1]), nm(byHeight[2]), table, ["g1_power"], "Read the data heights in the column headings."),
    chart,
  ]),
  lesson(["South America has many climates and landscapes.", "The Andes and Amazon Basin cross country borders.", "One description cannot fit the whole continent."], swing, [
    c("Which claim is supported by this evidence?", "South America has more than one landscape", "The Amazon Basin lies wholly inside Brazil", "Quito and Manaus have the same temperatures", swing, ["g1_power"], "Compare Manaus, Quito and Buenos Aires."),
    c("Which fact shows an environmental region crossing borders?", "The Andes run through seven countries", "Lima is a city in Peru", "Chile is long and narrow", swing, ["g1_andes"], "Find a region found in more than one country."),
    c("What does Quito show about mountains?", "High ground can be cool near the equator", "Mountains are hotter than coasts", "Quito is colder than Buenos Aires in July", swing, ["g1_power"], "Read Quito's latitude and temperature."),
    c("Which description fits Buenos Aires on the Pampas?", "Warm in January and cool in July", "Cool in January and warm in July", "Warm in both January and July", swing, ["g1_power", "g1_pampas"], "Compare the January and July temperatures."),
    c("Which description fits Manaus in the Amazon Basin?", "Warm all year with rain every month", "Warm all year with a rainless season", "Cool all year with heavy rain", swing, ["g1_power"], "Read the Manaus sentence."),
    c("Why can one landscape not describe South America?", "Basin, mountain and grassland examples differ", "The examples share one temperature pattern", "Landscapes stop at country borders", swing, ["g1_power", "g1_andes", "g1_pampas"], "Compare what the three places show."),
    c("Which grassland region crosses three countries?", "The Pampas", "The Andes", "The Amazon Basin", swing, ["g1_pampas"], "Check the last two evidence sentences."),
    sort("Sort each claim by whether the evidence supports it.", ["Supported", "Not supported"], [["The Andes cross several countries", 0], ["The Pampas are grassland", 0], ["All South America is rainforest", 1], ["Every place is hot all year", 1]], swing, ["g1_power", "g1_andes", "g1_pampas"], "Check each claim against the evidence."),
  ]),
]);
