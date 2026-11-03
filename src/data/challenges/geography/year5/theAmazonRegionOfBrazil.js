import { c, lesson, ordered, record, sort, topic } from "./authoring.js";
import { letterOf, map } from "./maps.js";
import { climateTable, place } from "../year4/records.js";

const AM = "y5_amazon", POWER = "g1_power", ATLAS = "atlas", LOSS = "y5_amazonLoss";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, AM], "Find the marker list in the evidence, then match the name.");

const places = map("southAmerica", ["Brazil", "Manaus", "Brasilia", "Sao Paulo"], [
  "Brazil is the largest country in South America. Its capital is Brasilia.",
  "Manaus is a large city in the Amazon rainforest, in the north.",
  "Sao Paulo is the largest city in Brazil, in the south-east.",
  "Most of the Amazon rainforest is in Brazil.",
]);
const basin = map("southAmerica", ["Amazon Basin", "Andes Mountains", "Belem", "Manaus"], [
  "The Amazon River begins near the Andes mountains in the west.",
  "It flows east for thousands of kilometres across the Amazon Basin to the Atlantic Ocean.",
  "Belem is a port near the river mouth. Manaus is far inland, on the Rio Negro near its meeting with the Amazon.",
  "The Amazon carries more water than any other river on Earth.",
]);
const table = climateTable(["manaus", "ambleside"], { title: "Manaus (Brazil) and Ambleside (UK), typical months", months: [0, 3, 6, 9] });
const ID = ["manaus", "ambleside"];
const rainRows = place("manaus").months.map((m, i) => ({ label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i], value: m.r }));
const full = climateTable(["manaus"], { title: "Manaus, every month" });
const MAR = place("manaus").months[2].r, FEB = place("manaus").months[1].r, APR = place("manaus").months[3].r;
const AUG = place("manaus").months[7].r;
const chart = { kind: "chart", prompt: "How many millimetres of rain does Manaus typically get in March?", answer: MAR, options: [MAR, APR, FEB], chart: { type: "bar", rows: rainRows, step: 50, max: 300, unit: "Manaus rainfall (mm)" }, visual: full, sources: [POWER], evidence: [full.lines[0]], hint: "Find the bar labelled Mar and read its value." };
const chart2 = { kind: "chart", prompt: "How many millimetres of rain does Manaus typically get in August?", answer: AUG, options: [AUG, place("manaus").months[6].r, place("manaus").months[8].r], chart: { type: "bar", rows: rainRows, step: 50, max: 300, unit: "Manaus rainfall (mm)" }, visual: full, sources: [POWER], evidence: [full.lines[0]], hint: "Find the bar labelled Aug and read its value." };
const hotWarm = (mi) => place("manaus").months[mi].t > place("ambleside").months[mi].t;
if (![0, 3, 6, 9].every(hotWarm)) throw new Error("Manaus should be warmer in every shown month");
const peopleUse = record([
  "Many Indigenous peoples live in the Amazon region, and rivers are the main routes between villages.",
  "Boats carry people and goods along the rivers because few roads cross the forest.",
  "Forest is cleared for cattle ranching, soya farms, roads and mining.",
  "Fewer trees means less habitat for wildlife and less rain-making moisture returned to the air.",
  "Some forest is protected as national parks and Indigenous territories.",
], "People and the rainforest");
const choices = record([
  "Benefit: cleared land can be used to graze cattle or grow crops.",
  "Benefit: farms, mines and roads can bring jobs and income.",
  "Cost: wildlife loses its home, and many species live nowhere else.",
  "Cost: bare soil is washed away faster, so farmland can lose its goodness.",
  "Choice: some farming happens on land cleared long ago, while standing forest is protected.",
], "Benefits and costs of clearing forest");

export const theAmazonRegionOfBrazil = topic([
  lesson(["Brazil is the largest country in South America.", "Brasilia is its capital.", "The Amazon rainforest covers much of northern Brazil."], places, [
    c("What is the capital of Brazil?", "Brasilia", "Sao Paulo", "Manaus", places, [AM, ATLAS], "Read the first evidence sentence."),
    c("Which marked city is the largest in Brazil?", "Sao Paulo", "Brasilia", "Manaus", places, [AM], "Read the third evidence sentence."),
    c("Which marked city lies inside the Amazon rainforest?", "Manaus", "Sao Paulo", "Brasilia", places, [AM], "Read the second evidence sentence."),
    c("Which continent is Brazil in?", "South America", "North America", "Africa", places, [AM], "Read the first evidence sentence."),
    c("Which marked city lies furthest north?", "Manaus", "Brasilia", "Sao Paulo", places, [ATLAS], "Compare degrees; the smallest degrees south is furthest north."),
    c("Which marked city lies furthest south?", "Sao Paulo", "Brasilia", "Manaus", places, [ATLAS], "Compare degrees south; the largest is furthest south."),
    which(places, "Brasilia", ["Manaus", "Sao Paulo"]),
    which(places, "Brazil", ["Manaus", "Sao Paulo"]),
    sort("Sort each place by whether it is in Brazil.", ["In Brazil", "Not in Brazil"], [["Manaus", 0], ["Brasilia", 0], ["Sao Paulo", 0], ["Lima", 1]], places, [AM, ATLAS], "Lima is the capital of Peru."),
  ]),
  lesson(["The Amazon River flows from the Andes to the Atlantic.", "It crosses the Amazon Basin.", "Read the labelled places on the map."], basin, [
    c("Which mountains is the Amazon River near its start?", "The Andes", "The Alps", "The Rockies", basin, [AM], "Read the first evidence sentence."),
    c("Which ocean does the Amazon River flow into?", "The Atlantic Ocean", "The Pacific Ocean", "The Indian Ocean", basin, [AM], "Read the second evidence sentence."),
    c("In which direction does the Amazon mainly flow?", "East", "West", "North", basin, [AM], "It flows from the Andes towards the Atlantic."),
    c("Which marked place is a port near the river mouth?", "Belem", "Manaus", "Andes Mountains", basin, [AM], "Read the third evidence sentence."),
    c("What is special about the water carried by the Amazon?", "It carries more water than any other river", "It carries less water than the Thames", "It is frozen all year", basin, [AM], "Read the last evidence sentence."),
    c("Of the four marked places, which lies furthest west?", "Andes Mountains", "Manaus", "Belem", basin, [ATLAS], "Compare degrees west; the largest is furthest west."),
    c("Of the four marked places, which lies furthest east?", "Belem", "Manaus", "Amazon Basin", basin, [ATLAS], "Compare degrees west; the smallest is furthest east."),
    which(basin, "Belem", ["Manaus", "Andes Mountains"]),
    ordered("Order the markers from west to east, following the river.", ["Andes Mountains", "Amazon Basin", "Manaus", "Belem"], basin, [ATLAS], "Start with the largest degrees west."),
  ]),
  lesson(["Read the climate records for Manaus.", "A climate record shows typical months.", "Compare Manaus with a place in the UK."], table, [
    c("In January, which place is warmer?", "Manaus", "Ambleside", "They are equal", table, [POWER], "Read the January row."),
    c("In July, which place is warmer?", "Manaus", "Ambleside", "They are equal", table, [POWER], "Read the July row."),
    c("Which place has more rain in April?", "Manaus", "Ambleside", "They are equal", table, [POWER], "Read the April row and compare millimetres."),
    c("Which place has less rain in July?", "Manaus", "Ambleside", "They are equal", table, [POWER], "Read the July row."),
    c("Which pattern fits Manaus?", "Hot all year, with wet and drier months", "Freezing winters and mild summers", "No rain in any month", table, [POWER], "Compare the four months shown."),
    c("Which pattern fits Manaus temperatures?", "Almost the same in every month", "Very cold in January", "Below freezing in July", table, [POWER], "Compare the four temperatures."),
    c("Which place has the bigger change in temperature across the shown months?", "Ambleside", "Manaus", "They are equal", table, [POWER], "Compare each column's coolest and warmest months."),
    chart,
    chart2,
  ]),
  lesson(["People use the Amazon in different ways.", "Clearing forest has benefits and costs.", "Decisions need evidence."], peopleUse, [
    c("Why are boats important in the Amazon region?", "Few roads cross the forest", "There are no rivers", "Boats cannot float there", peopleUse, [AM], "Read the second evidence sentence."),
    c("Which activity is linked to clearing forest?", "Cattle ranching and soya farming", "Ski resorts and mountain snow parks", "Salt mining and sea-salt farming on the coast", peopleUse, [AM, LOSS], "Read the third evidence sentence."),
    c("What can happen to wildlife when forest is cleared?", "It loses habitat", "It gains more habitat", "It always moves to cities", peopleUse, [AM, LOSS], "Read the fourth evidence sentence."),
    c("Which protection is named in the evidence?", "National parks and Indigenous territories", "Concrete flood walls and sea barriers", "Toll roads and fences around every village", peopleUse, [AM], "Read the last evidence sentence."),
    c("Which statement is supported by the evidence?", "Rivers are routes between villages", "The Amazon has no people", "The whole region is a desert", peopleUse, [AM], "Read the first evidence sentence."),
    c("Which benefit of clearing forest is given?", "Land can graze cattle or grow crops", "Soil is never washed away after the trees go", "Wildlife gains new homes as the trees are cleared", choices, [LOSS], "Read the lines that start with Benefit."),
    c("Which cost of clearing forest is given?", "Bare soil is washed away faster", "Farmland becomes better with every storm", "Wildlife has more room", choices, [LOSS], "Read the lines that start with Cost."),
    c("Which choice reduces harm but still allows farming?", "Farm land cleared long ago and protect standing forest", "Clear all the remaining forest for fast profit", "Stop every person from using any land at all", choices, [LOSS], "Read the line that starts with Choice."),
    sort("Sort each point as a benefit or a cost of clearing forest.", ["Benefit", "Cost"], [["Land for grazing cattle", 0], ["Jobs and income", 0], ["Wildlife loses homes", 1], ["Soil washes away faster", 1]], choices, [LOSS], "Benefits help people; costs cause harm."),
  ]),
]);
