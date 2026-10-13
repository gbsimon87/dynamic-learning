import { c, lesson, record, sort, ordered, topic } from "./authoring.js";
import { map } from "./maps.js";
import { climateTable, place } from "./records.js";

const letter = (v, name) => v.markers.find((m) => m.label === name).id;
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letter(v, name)}`, `Marker ${letter(v, others[0])}`, `Marker ${letter(v, others[1])}`, v, ["g1_wa"], "Find the marker list in the evidence, then match the name.");

const cities = map("washington", ["Seattle", "Olympia", "Spokane"], [
  "Washington State is in the north-west USA, beside the Pacific Ocean.",
  "Olympia is the state capital. Seattle is the largest city.",
  "Washington DC is a different place, far away on the east coast.",
  "The Cascade Range runs north to south through the state.",
  "Seattle and Tacoma are ports on Puget Sound.",
]);
const features = map("washington", ["Seattle", "Olympia", "Spokane", "Yakima", "Cascade Range", "Pacific coast"], [
  "Seattle and Olympia lie west of the Cascade Range. Spokane and Yakima lie east of it.",
  "The Yakima Valley is known for apple orchards.",
  "The map also draws the Columbia River.",
], { rivers: ["Columbia"] });

const MI = [0, 3, 6, 9];
const IDS = ["seattle", "spokane"];
const table = climateTable(IDS, { title: "Seattle (coast side) and Spokane (inland)", months: MI });
const nm = (id) => place(id).name;
const mR = (id, i) => place(id).months[i].r;
const pick = (mi, key, dir) => {
  const [a, b] = [...IDS].sort((x, y) => dir * (place(y).months[mi][key] - place(x).months[mi][key]));
  if (place(a).months[mi][key] === place(b).months[mi][key]) throw new Error("tie");
  return [nm(a), nm(b)];
};
const ask = (prompt, mi, key, dir, hint) => { const [a, b] = pick(mi, key, dir); return c(prompt, a, b, "They are equal", table, ["g1_power"], hint); };
const sw = (id) => { const t = place(id).months.map((m) => m.t); return Math.max(...t) - Math.min(...t); };
const wettest = (id) => MI.reduce((best, i) => (mR(id, i) > mR(id, best) ? i : best), MI[0]);
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
if (sw("spokane") === sw("seattle")) throw new Error("tie");
const bigSwing = sw("spokane") > sw("seattle") ? "Spokane" : "Seattle";
const smallSwing = bigSwing === "Spokane" ? "Seattle" : "Spokane";
const chart = { kind: "chart", prompt: "How many millimetres of rain does Seattle typically get in January?", answer: mR("seattle", 0), options: [mR("seattle", 0), mR("seattle", 6), mR("seattle", 3)], chart: { type: "bar", rows: MI.map((i) => ({ label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i], value: mR("seattle", i) })), step: 50, max: 200, unit: "Seattle rainfall (mm)" }, visual: table, sources: ["g1_power"], evidence: [table.lines[0]], hint: "Find the bar labelled Jan and read its value." };

const links = record([
  "West of the Cascade Range the climate is mostly mild and wet.",
  "East of the range the land is much drier. Farms there depend on irrigation.",
  "The Yakima Valley in the drier east is known for apple orchards.",
  "Seattle and Tacoma are ports on Puget Sound in the west.",
  "Olympic National Park: west-facing valleys get 100 to 170 inches of rain a year.",
  "In the rain shadow at Port Angeles, near the park headquarters, only 25 to 30 inches fall.",
], "Landscape and land-use evidence");

export const washingtonState = topic([
  lesson(["Washington State is in the north-west USA.", "Olympia is its capital. Seattle is its largest city.", "Washington DC is somewhere else."], cities, [
    c("What is the capital of Washington State?", "Olympia", "Seattle", "Spokane", cities, ["g1_wa"], "Read the evidence sentence about the capital."),
    c("Which marked city is the largest in Washington State?", "Seattle", "Olympia", "Spokane", cities, ["g1_wa"], "It is the biggest city on the map."),
    c("Is Washington State the same place as Washington DC?", "No, they are different places", "Yes, they are the same", "Yes, DC is a city in the state", cities, ["g1_dc", "g1_wa"], "Check where the evidence puts Washington DC."),
    c("Which ocean lies beside Washington State?", "The Pacific Ocean", "The Atlantic Ocean", "The Arctic Ocean", cities, ["g1_wa", "atlas"], "Read the first evidence sentence."),
    c("Which range runs north to south through the state?", "Cascade Range", "Rocky Mountains", "Appalachian Mountains", cities, ["g1_wa"], "Read the evidence sentence about mountains."),
    c("Which marked city lies furthest east?", "Spokane", "Seattle", "Olympia", cities, ["atlas"], "Compare degrees west; the smallest is furthest east."),
    c("Which marked city lies south-west of Seattle?", "Olympia", "Spokane", "Seattle itself", cities, ["atlas"], "Compare both the degrees north and the degrees west."),
    which(cities, "Spokane", ["Seattle", "Olympia"]),
    sort("Sort each place by whether it is in Washington State.", ["In Washington State", "Not in Washington State"], [["Seattle", 0], ["Olympia", 0], ["Spokane", 0], ["Washington DC", 1]], cities, ["g1_wa", "g1_dc"], "Washington DC is not part of any state."),
  ]),
  lesson(["Read the labelled places and the river.", "Seattle and Olympia are west of the Cascades.", "Spokane and Yakima are east."], features, [
    c("Which marked city lies east of the Cascade Range?", "Spokane", "Seattle", "Olympia", features, ["g1_wa"], "Read the first evidence sentence."),
    c("Which marked city is nearest the Pacific coast side?", "Olympia", "Spokane", "Yakima", features, ["g1_wa"], "Think about which cities lie west of the mountains."),
    c("Which marked place is known for apple orchards?", "Yakima", "Seattle", "Olympia", features, ["g1_wa"], "Find the valley named in the evidence."),
    c("Which river does the map draw?", "Columbia River", "Colorado River", "Mississippi River", features, ["g1_wa"], "Read the last evidence sentence."),
    c("Of Seattle, Olympia and Yakima, which lies furthest north?", "Seattle", "Olympia", "Yakima", features, ["atlas"], "Compare degrees north; the largest is furthest north."),
    c("Of Seattle, Olympia and Yakima, which lies furthest south?", "Yakima", "Seattle", "Olympia", features, ["atlas"], "Compare degrees north; the smallest is furthest south."),
    which(features, "Yakima", ["Seattle", "Spokane"]),
    which(features, "Cascade Range", ["Pacific coast", "Olympia"]),
    sort("Sort each city by its side of the Cascade Range.", ["West of the Cascades", "East of the Cascades"], [["Seattle", 0], ["Olympia", 0], ["Spokane", 1], ["Yakima", 1]], features, ["g1_wa"], "Use the first evidence sentence."),
    ordered("Order the city markers from west to east.", ["Olympia", "Seattle", "Yakima", "Spokane"], features, ["atlas"], "Start with the largest degrees west."),
  ]),
  lesson(["Compare a coast-side city with an inland city.", "Seattle is near Puget Sound. Spokane is further inland.", "Records show typical months, not daily weather."], table, [
    ask("In January, which place is colder?", 0, "t", -1, "Read the January row and find the lower temperature."),
    ask("In July, which place is warmer?", 6, "t", 1, "Read the July row."),
    ask("In January, which place has more rain?", 0, "r", 1, "Compare millimetres in the January row."),
    ask("In July, which place has less rain?", 6, "r", -1, "Compare millimetres in the July row."),
    c("Which place has the bigger temperature change across the year?", bigSwing, smallSwing, "They are equal", table, ["g1_power"], "Compare each column's coolest and warmest months."),
    c("Which shown month is wettest for Seattle?", MONTH_NAMES[wettest("seattle")], "July", "April", table, ["g1_power"], "Only four months are shown. Compare Seattle's rainfall in them."),
    c("Which place has the greater data height?", "Spokane", "Seattle", "They are level", table, ["g1_power"], "Read the data heights in the column headings."),
    c("Which pattern fits Seattle?", "Wet winters and drier summers", "Dry winters and wet summers", "Equal rain every month", table, ["g1_power"], "Compare January with July rainfall."),
    chart,
  ]),
  lesson(["Landscape and climate affect how land is used.", "The Cascade Range separates a wetter west from a drier east.", "The whole state is not rainforest."], links, [
    c("Which claim is NOT supported by the evidence?", "Rain forest covers the whole state", "The east is much drier than the west", "Seattle is a port on Puget Sound", links, ["g1_wa", "g1_hoh"], "Look for the claim about the whole state."),
    c("Why do farms in the drier east need irrigation?", "There is less rain there", "Rain falls there all year", "Puget Sound is too close", links, ["g1_wa"], "Compare the rain in west and east."),
    c("Which land use fits the drier east?", "Irrigated apple orchards", "Ports on Puget Sound", "A rain forest valley", links, ["g1_wa"], "Read the evidence about the Yakima Valley."),
    c("Which land use fits the west beside Puget Sound?", "Ports such as Seattle and Tacoma", "Dry steppe", "Irrigated desert", links, ["g1_wa"], "Find the sentence naming ports."),
    c("What does the Olympic evidence show?", "Rain can differ a lot across the Olympic Peninsula", "Rain falls evenly across the peninsula", "The east is wetter than the west", links, ["g1_olympic"], "Compare 100 to 170 inches with 25 to 30 inches."),
    c("What is the best conclusion about Washington State?", "Its landscapes and land uses vary", "Its west and east are alike", "Its east is wetter than its west", links, ["g1_wa", "g1_olympic"], "Compare the west and east evidence."),
    c("Why is Seattle a good place for a port?", "It is on Puget Sound", "It is beside the Cascade peaks", "It is inland near Spokane", links, ["g1_wa"], "A port needs a sea inlet."),
    sort("Sort each example by whether it fits the wetter west or drier east.", ["Wetter west", "Drier east"], [["Puget Sound ports", 0], ["Olympic west-facing valleys", 0], ["Yakima apple orchards", 1], ["Irrigated farmland", 1]], links, ["g1_wa", "g1_olympic"], "Use the first two evidence sentences."),
  ]),
]);
