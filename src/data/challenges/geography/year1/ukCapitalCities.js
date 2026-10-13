import { ask, cards, lesson, pic, sort, topic } from "./authoring.js";

const S = ["y1UkCountries", "y1London", "y1Edinburgh", "y1Cardiff", "y1Belfast"];
const CAPITAL = { England: "London", Scotland: "Edinburgh", Wales: "Cardiff", "Northern Ireland": "Belfast" };
const POINT = { London: [-0.13, 51.51], Edinburgh: [-3.19, 55.95], Cardiff: [-3.18, 51.48], Belfast: [-5.93, 54.6] };

const meet = cards("Four capital cities", [
  ["clocktower", "London, England"], ["castle", "Edinburgh, Scotland"], ["stadium", "Cardiff, Wales"], ["cityhall", "Belfast, Northern Ireland"],
], "Four captioned pictures. London, England: a clock tower by a river. Edinburgh, Scotland: a castle on a rock. Cardiff, Wales: a big stadium. Belfast, Northern Ireland: a city hall with a green dome.",
["Each UK country has a capital city.", "A capital is a city.", "Not every city is a capital."]);

const capitalsMap = pic("uk", "UK capital cities", "A UK map with the four countries named. Yellow stars show the capitals: London in south-east England, Edinburgh in southern Scotland, Cardiff in south Wales and Belfast in Northern Ireland.",
  ["Stars show capital cities.", "Each star is in its own country."], { names: true, capitals: "names" });
const lettered = (n, order) => pic("uk", `Capital city map ${n}`,
  `A UK map with the four countries named. Letters mark the capital cities. ${order.map((c, i) => `Letter ${"ABCD"[i]} is ${c}.`).join(" ")}`,
  ["London is in England. Edinburgh is in Scotland.", "Cardiff is in Wales. Belfast is in Northern Ireland."],
  { names: true, markers: order.map((c, i) => ({ id: "ABCD"[i], label: c, point: POINT[c] })) });
const findRows = (n, order) => order.map((c, i) => [`Map ${n}: which letter marks ${c}?`, "ABCD"[i], ..."ABCD".replace("ABCD"[i], "").slice(0, 2)]);
const map1 = lettered(1, ["London", "Edinburgh", "Cardiff", "Belfast"]);
const map2 = lettered(2, ["Belfast", "Cardiff", "London", "Edinburgh"]);

const sorts = [
  [["Scotland", "Wales"], [["Edinburgh", 0], ["Cardiff", 1]]],
  [["England", "Northern Ireland"], [["Belfast", 1], ["London", 0]]],
];

const visit = (n, s, caption) => cards(`Bix's visit ${n}`, [[s, caption]], `One captioned picture: ${caption}`, [caption]);
const VISITS = [
  ["clocktower", "Bix sees a big clock tower in England's capital.", "London, England", "Cardiff, Wales", "Belfast, Northern Ireland", ["y1BigBen"]],
  ["castle", "Bix sees a castle on a rock in Scotland's capital.", "Edinburgh, Scotland", "London, England", "Cardiff, Wales", ["y1EdinburghCastle"]],
  ["stadium", "Bix visits a big stadium in the capital of Wales.", "Cardiff, Wales", "Edinburgh, Scotland", "Belfast, Northern Ireland", ["y1Stadium"]],
  ["cityhall", "Bix sees a city hall with a green dome in Northern Ireland's capital.", "Belfast, Northern Ireland", "London, England", "Edinburgh, Scotland", ["y1CityHall"]],
  ["office", "Bix visits Cardiff, a capital city. Where is Bix?", "Cardiff, Wales", "Belfast, Northern Ireland", "London, England", ["y1Cardiff"]],
  ["town", "Bix visits Belfast, a capital city. Where is Bix?", "Belfast, Northern Ireland", "Edinburgh, Scotland", "Cardiff, Wales", ["y1Belfast"]],
  ["city", "Bix visits Edinburgh, a capital city. Where is Bix?", "Edinburgh, Scotland", "London, England", "Belfast, Northern Ireland", ["y1Edinburgh"]],
];

export const ukCapitalCities = topic([
  lesson(["Each UK country has a capital city.", "A capital is a city.", "Not every city is a capital."], meet, ask([
    ["What is the capital of England?", "London", "Cardiff", "Belfast"],
    ["What is the capital of Scotland?", "Edinburgh", "London", "Cardiff"],
    ["What is the capital of Wales?", "Cardiff", "Edinburgh", "Belfast"],
    ["What is the capital of Northern Ireland?", "Belfast", "London", "Edinburgh"],
    ["A capital is a kind of…", "City", "Mountain", "River"],
    ["Is every city a capital?", "No", "Yes", "Only big ones"],
    ["How many UK capitals are on the cards?", "Four", "One", "Ten"],
  ], meet, S, "Read the caption under each picture.")),
  lesson(["Stars show the capital cities.", "Each capital is in its own country.", "London is the furthest south-east."], capitalsMap, [
    ...ask(findRows(1, ["London", "Edinburgh", "Cardiff", "Belfast"]), map1, S, "Find the country name first. Then find its capital."),
    ...ask(findRows(2, ["Belfast", "Cardiff", "London", "Edinburgh"]), map2, S, "Find the country name first. Then find its capital."),
  ]),
  lesson(["Match each capital to its country.", "London–England. Edinburgh–Scotland.", "Cardiff–Wales. Belfast–Northern Ireland."], capitalsMap, [
    ...ask([
      ["Belfast is the capital of…", "Northern Ireland", "Scotland", "Wales"],
      ["Cardiff is the capital of…", "Wales", "England", "Northern Ireland"],
      ["Edinburgh is the capital of…", "Scotland", "Wales", "England"],
      ["London is the capital of…", "England", "Scotland", "Northern Ireland"],
    ], capitalsMap, S, "Find the star. Which country is it in?"),
    ...sorts.map(([bins, items], i) => sort(`Match ${i + 1}: put each capital with its country.`, bins, items, capitalsMap, S, "Find each star on the map.")),
  ]),
  lesson(["Bix is visiting capital cities.", "Read where Bix is.", "Choose the city and its country."], meet,
    VISITS.map(([s, caption, answer, w1, w2, src], i) => ask([[`Visit ${i + 1}: where is Bix?`, answer, w1, w2]], visit(i + 1, s, caption), [...src, "y1UkCountries"], "Read the caption. Which country is named?")[0])),
]);
for (const [country, city] of Object.entries(CAPITAL)) if (!POINT[city]) throw new Error(`${country} capital missing`);
