import { c, lesson, sort, ordered, topic, visual } from "./authoring.js";

// River Journeys: features, a traced route, simple processes and the link to the water cycle.
const RIVER = ["g3_river"];
const EROSION = ["g3_erosion", "g3_river"];
const LINES = ["g3_naturalEarthRivers", "g3_river"];
const COLUMBIA = ["g3_columbia", "g3_naturalEarthRivers"];

const featureLines = [
  "A source is where a river begins.",
  "A tributary is a smaller river that joins a bigger one.",
  "A confluence is where two rivers meet.",
  "The channel is the path the water follows.",
  "The mouth is where a river flows into a sea or lake.",
];
const featuresNamed = visual("river", "Parts of a river", "North is up. The river runs from the hills at the upper left to the sea at the lower right. Numbers mark a source, a tributary, a confluence, a channel and a mouth.", featureLines, { variant: "features", letters: false });
const featuresLetters = visual("river", "River diagram with letters", "A is at the upper left, high in the hills. B is on a short side stream near the top middle. C is where that side stream meets the main river. D is on the main river between C and the sea. E is at the lower right, next to the sea.", featureLines, { variant: "features", letters: true });

const routeLines = ["Arrows show the way the water flows.", "Water flows downhill, from the hills towards the sea.", "A tributary joins the main river at C."];
const route = visual("river", "Tracing a river route", "Arrows point along the main river from the hills at the upper left to the sea at the lower right. A is high in the hills. B is on a side stream that joins the main river at C. D is on the main river below C. E is beside the sea.", routeLines, { variant: "route", letters: true });

const processLines = [
  "Erosion is when moving water wears away rock and soil.",
  "Transport is when a river carries sediment along.",
  "Deposition is when a river drops sediment.",
  "Sediment means pieces of rock, sand and mud.",
  "Fast, steep water can wear away more land.",
  "Slow water drops sediment, so mud and sand build up.",
];
const processes = visual("river", "Erosion, transport and deposition", "A is high in the hills where the river is steep and fast. B is on the middle part of the river, on gentler ground. C is near the mouth where the river is slow and wide.", processLines, { variant: "processes", letters: true });
const processesNamed = { ...processes, title: "River processes along the river", alt: "The river runs from steep hills at the upper left to a slow, wide mouth at the lower right. Erosion, transport and deposition are marked along it.", variant: "processes", letters: false };

const sediment = visual("table", "Sediment records, example data", "Example data for three places on one river. A has large rough stones and fast water. B has small pebbles and sand and medium water speed. C has fine mud and slow water.", ["Example data: not measured on a real river.", "A is high in the hills, B is in the middle and C is near the mouth."], {
  caption: "Example sediment record, A to C", columns: ["Place", "Sediment seen", "Water speed"],
  rows: [["A", "Large rough stones", "Fast"], ["B", "Small pebbles and sand", "Medium"], ["C", "Fine mud", "Slow"]],
});

// Direction of a straight line between two [lon, lat] points, in eight compass words.
const WORDS = ["East", "North-east", "North", "North-west", "West", "South-west", "South", "South-east"];
const heading = (from, to) => {
  const dx = (to[0] - from[0]) * Math.cos(((from[1] + to[1]) / 2) * Math.PI / 180), dy = to[1] - from[1];
  const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
  return WORDS[Math.round(angle / 45) % 8];
};
const mk = (id, label, point) => ({ id, label, point });
const mapOf = (view, title, alt, lines, markers, rivers) => visual("map", title, alt, lines, { view, markers, rivers });

const thamesM = [mk("A", "West end of the Thames line", [-2.05, 51.84]), mk("B", "Middle of the Thames line", [-1.12, 51.58]), mk("C", "East end of the Thames line", [0.38, 51.45])];
const thames = mapOf("uk", "Map: the River Thames line", "North is up. A is at 51.84 degrees north, 2.05 degrees west. B is at 51.58 degrees north, 1.12 degrees west. C is at 51.45 degrees north, 0.38 degrees east. The blue line is the River Thames.", ["The blue line is the River Thames, drawn simply.", "Markers A, B and C sit on the line from west to east."], thamesM, ["Thames"]);
const trentM = [mk("A", "Upstream end of the Trent line", [-2.16, 53.04]), mk("B", "Middle of the Trent line", [-1.26, 52.9]), mk("C", "Downstream end of the Trent line", [-0.71, 53.69])];
const trent = mapOf("uk", "Map: the River Trent line", "North is up. A is at 53.04 degrees north, 2.16 degrees west, at the upstream end. B is at 52.9 degrees north, 1.26 degrees west. C is at 53.69 degrees north, 0.71 degrees west, at the downstream end. The blue line is the River Trent.", ["The blue line is the River Trent, drawn simply.", "Markers A, B and C sit along the line."], trentM, ["Trent"]);
const severnM = [mk("A", "Upstream end of the Severn line", [-3.69, 52.53]), mk("B", "Middle of the Severn line", [-2.79, 52.74]), mk("C", "Downstream end of the Severn line", [-2.39, 51.78])];
const severn = mapOf("uk", "Map: the River Severn line", "North is up. A is at 52.53 degrees north, 3.69 degrees west, at the upstream end. B is at 52.74 degrees north, 2.79 degrees west. C is at 51.78 degrees north, 2.39 degrees west, at the downstream end. The blue line is the River Severn.", ["The blue line is the River Severn, drawn simply.", "Markers A, B and C sit along the line."], severnM, ["Severn"]);
const columbiaM = [mk("A", "Where the line crosses the Canada border", [-117.64, 49.0]), mk("B", "Middle of the Columbia line", [-119.05, 46.22]), mk("C", "Downstream end of the Columbia line", [-123.21, 46.17])];
const columbia = mapOf("washington", "Map: the Columbia River line", "North is up. A is at 49 degrees north, 117.64 degrees west, at the Canada border. B is at 46.22 degrees north, 119.05 degrees west. C is at 46.17 degrees north, 123.21 degrees west, at the downstream end of the drawn line. The blue line is the Columbia River.", ["The blue line is the Columbia River, drawn simply.", "The Columbia begins in Canada and flows to the Pacific Ocean."], columbiaM, ["Columbia"]);

const dirQ = (prompt, v, from, to, sources) => {
  const answer = heading(from, to);
  const i = WORDS.indexOf(answer);
  return c(prompt, answer, WORDS[(i + 4) % 8], WORDS[(i + 2) % 8], v, sources, "Find the two markers. Imagine a line from the first to the second.");
};

const cycleSteps = ["Evaporation: liquid water becomes water vapour", "Condensation: vapour becomes droplets", "Precipitation: water falls as rain or snow", "Collection and runoff: water gathers and flows"];
const cycleLines = [
  "Rivers flow downhill because of gravity.",
  "Rainfall, snowmelt or groundwater can feed a river's source.",
  "Runoff moves across land into rivers and lakes.",
  "The Sun's energy makes water evaporate from seas, lakes and land.",
  "The water cycle has no single starting point.",
  "A river's direction depends on the slope of the land, not on north or south.",
];
const cycle = visual("flow", "Rivers and the water cycle", "On the shown route: evaporation leads to condensation, then precipitation, then collection. Collection includes runoff into rivers and lakes. Collection connects back to evaporation. Water can follow other routes. Rivers flow downhill. The cycle has no single starting point.", cycleLines, { steps: cycleSteps, cycle: true });
const journey = (start, labels) => ({ ...cycle, title: `Route starting with ${start}`, steps: labels, alt: `Start with ${start}. Follow this route: ${labels.join("; then ")}. Water can follow other routes. The cycle has no single starting point.` });
const orderFrom = (start, labels) => ordered(`Order this route, starting with ${start}.`, labels, journey(start, labels), ["water", ...RIVER]);

export const riverJourneys = topic([
  lesson(["A river begins at its source.", "A tributary joins a bigger river at a confluence.", "The channel carries the water to the mouth."], featuresNamed, [
    c("Which letter marks the source of the river?", "A", "B", "E", featuresLetters, RIVER),
    c("Which letter marks the tributary?", "B", "D", "E", featuresLetters, RIVER),
    c("Which letter marks the confluence?", "C", "B", "E", featuresLetters, RIVER),
    c("Which letter marks the mouth of the river?", "E", "A", "C", featuresLetters, RIVER),
    c("Which word names the path that the water follows?", "Channel", "Source", "Tributary", featuresNamed, RIVER),
    c("What is a tributary?", "A smaller river that joins a bigger one", "The place where a river begins", "A place where a river meets the sea", featuresNamed, RIVER),
    c("Where does a river flow into a sea or lake?", "At its mouth", "At its source", "At a confluence", featuresNamed, RIVER),
    sort("Sort each feature by what happens there.", ["Start of a river", "Joining water", "End of a river"], [["Source", 0], ["Tributary", 1], ["Confluence", 1], ["Mouth", 2]], featuresNamed, RIVER),
  ]),
  lesson(["Follow the arrows from the source towards the mouth.", "Downstream means further along the flow.", "Rivers flow downhill, and not always south."], route, [
    c("Water leaving A first reaches which letter on the main river?", "C", "B", "D", route, RIVER, "Follow the main river from A. B is on the side stream."),
    c("Which letter is furthest downstream?", "E", "A", "C", route, RIVER),
    c("Which letter is furthest upstream on the main river?", "A", "C", "D", route, RIVER),
    c("Water at C flows on to which letter?", "D", "A", "B", route, RIVER),
    c("Which way do the arrows show the water flowing?", "From the hills towards the sea", "From the sea towards the hills", "Only along the side stream", route, RIVER),
    ordered("Order the letters along the main river from the source to the mouth.", ["A", "C", "D", "E"], route, RIVER, "Follow the arrows. Start in the hills."),
    c("Which marker is furthest east on the Thames line?", "C", "A", "B", thames, LINES, "East is to the right on the map."),
    dirQ("Which way does the Thames line run from A to C?", thames, thamesM[0].point, thamesM[2].point, LINES),
    dirQ("In a straight line, which direction is C from A on the Trent map?", trent, trentM[0].point, trentM[2].point, LINES),
    dirQ("In a straight line, which direction is C from A on the Severn map?", severn, severnM[0].point, severnM[2].point, LINES),
    dirQ("In a straight line, which direction is C from B on the Columbia map?", columbia, columbiaM[1].point, columbiaM[2].point, COLUMBIA),
    c("Which marker is nearest the Pacific Ocean on the Columbia line?", "C", "A", "B", columbia, COLUMBIA, "The Pacific coast is on the left of the map."),
  ]),
  lesson(["Steep, fast water wears away land. That is erosion.", "A river carries sediment. That is transport.", "Slow water drops sediment. That is deposition."], processesNamed, [
    c("Which letter is most likely where steep, fast water erodes land?", "A", "B", "C", processes, EROSION),
    c("Which letter is most likely where slow water drops mud and sand?", "C", "A", "B", processes, EROSION),
    c("Which letter is the middle part, where sediment is usually carried along?", "B", "A", "C", processes, EROSION),
    c("What does deposition mean?", "The river drops sediment", "The river wears away rock", "The river begins at a spring", processes, EROSION),
    c("What does erosion mean?", "Moving water wears away land", "A river drops mud", "Two rivers meet", processes, EROSION),
    sort("Sort each example by river process.", ["Erosion", "Transport", "Deposition"], [["Fast water cuts into rock", 0], ["Sand is carried downstream", 1], ["Mud settles as the river slows", 2], ["Water wears away a bank", 0]], processes, EROSION),
    c("Where is the water slowest in the example record?", "C", "A", "B", sediment, ["example", ...EROSION]),
    c("Which place has the largest stones in the example record?", "A", "B", "C", sediment, ["example", ...EROSION]),
    c("What does fine mud at the slowest place suggest?", "Deposition", "Fast erosion", "A river source", sediment, ["example", ...EROSION], "Slow water drops what it carries."),
    ordered("Order the places from fastest water to slowest water.", ["Place A", "Place B", "Place C"], sediment, ["example", ...EROSION], "Read the water speed column."),
  ]),
  lesson(["Rain and snow feed rivers. Rivers carry water onwards.", "Seas, lakes and land lose water by evaporation.", "A cycle has no single starting point."], cycle, [
    c("Why does river water move along the channel?", "It flows downhill because of gravity", "The Sun pushes it along", "Wind always pushes it", cycle, ["water", ...RIVER]),
    c("Which can feed a river's source?", "Rain, snowmelt or groundwater", "Only water from the sea", "Only water from clouds in summer", cycle, ["water", ...RIVER]),
    c("Which statement links rivers to the water cycle?", "Runoff and rivers carry rain towards seas or lakes", "Rivers stop the water cycle", "Rivers make rain without evaporation", cycle, ["water", ...RIVER]),
    c("What can happen to some river water after it reaches the sea?", "It can evaporate and form clouds", "It leaves Earth forever", "It turns into rock", cycle, ["water", ...RIVER]),
    c("Must every river flow south?", "No, it flows downhill", "Yes, south is always downhill", "Yes, rivers follow compass south", cycle, ["water", ...RIVER]),
    c("Which can be a river's mouth?", "A lake", "A hilltop", "A cloud", featuresNamed, RIVER),
    c("Why can this route start at different stages?", "The water cycle has no single starting point", "Rivers start every cycle", "Only the sea starts it", cycle, ["water"]),
    orderFrom("rain falling on hills", ["Rain falls on hills", "Runoff enters a stream", "Streams join a river", "The river reaches the sea"]),
    orderFrom("the river reaching the sea", ["River reaches the sea", "Water evaporates", "Vapour condenses into cloud", "Rain falls"]),
  ]),
]);
