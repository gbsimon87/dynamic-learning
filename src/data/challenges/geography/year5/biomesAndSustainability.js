import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const BIO = "g2_nasaBiomes", LAND = "g2_nasaLandChange", SAH = "y5_sahel", PERM = "y5_permafrost", CLIM = "y5_climateChange", SUS = "y5_sustainable", ATLAS = "atlas", FOR = "y5_trees";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, BIO], "Find the marker list in the evidence, then match the name.");

const pressures = map("world", ["Amazon Basin", "Borneo", "Sahel", "Northern Canada"], [
  "Rainforests in the Amazon Basin and Borneo have been cleared for farms, timber and mining.",
  "The Sahel is dry land south of the Sahara desert. Drought and too much grazing can make it more desert-like.",
  "In Northern Canada, tundra ground that was frozen for thousands of years is starting to thaw.",
  "Pressure on a biome can come from people and from a changing climate.",
]);
const trees = record([
  "Trees give homes to wildlife, from insects to monkeys.",
  "Trees take in carbon dioxide from the air as they grow.",
  "Roots hold soil in place, so heavy rain washes less of it away.",
  "Trees release water vapour into the air, which helps clouds form.",
  "A rainforest cannot quickly regrow once it is cleared.",
], "Why forests matter");
const warming = record([
  "Burning coal, oil and gas releases carbon dioxide.",
  "Carbon dioxide traps heat in the air, like a blanket.",
  "More carbon dioxide means Earth warms on average.",
  "Warming melts ice and makes sea levels rise.",
  "Wind and solar power do not release carbon dioxide when they make electricity.",
], "Warming and energy");
const choicesTable = visual("table", "Sustainable choices and their trade-offs", "Protect forest as national park: keeps habitats and carbon stores; limits some farming and logging. Plant new trees after logging: replaces timber and shade; takes years to grow. Build a wind farm: clean electricity; can change views and affect birds. Use buses, bikes and walking: less carbon dioxide; takes planning and safe routes.", [
  "Sustainable means meeting needs today without harming the future.", "Every choice has benefits and trade-offs.", "Decisions work best when people compare the evidence.",
], { caption: "Four choices", columns: ["Choice", "Benefit", "Trade-off"], rows: [["Protect forest as a national park", "Keeps habitats and carbon stores", "Limits some farming and logging"], ["Plant new trees after logging", "Replaces timber and shade", "Takes years to grow"], ["Build a wind farm", "Clean electricity", "Can change views and affect birds"], ["Use buses, bikes and walking", "Less carbon dioxide", "Needs planning and safe routes"]] });

export const biomesAndSustainability = topic([
  lesson(["Biomes face pressure from people and climate.", "Rainforests are cleared for farms and timber.", "Dry lands can become more desert-like."], pressures, [
    c("What have rainforests in the Amazon Basin and Borneo been cleared for?", "Farms, timber and mining", "Ski slopes and snow parks", "Ice sheets", pressures, [BIO, LAND], "Read the first evidence sentence."),
    c("What is the Sahel?", "Dry land south of the Sahara desert", "A frozen sea north of the Arctic Circle", "A tropical rainforest on the Equator", pressures, [SAH], "Read the second evidence sentence."),
    c("What can happen to the Sahel when drought and too much grazing combine?", "It can become more desert-like", "It becomes a rainforest", "It freezes", pressures, [SAH], "Read the second evidence sentence."),
    c("What is starting to thaw in Northern Canada?", "Tundra ground that was frozen for thousands of years", "Rainforest soil that was wet for thousands of years", "Desert sand that was dry for thousands of years", pressures, [PERM], "Read the third evidence sentence."),
    c("Which biome is the Sahel closest to?", "Desert", "Tundra", "Rainforest", pressures, [SAH, BIO], "Read what the Sahel is next to."),
    which(pressures, "Borneo", ["Sahel", "Northern Canada"]),
    which(pressures, "Northern Canada", ["Amazon Basin", "Borneo"]),
    c("Which marked place lies furthest north?", "Northern Canada", "Sahel", "Borneo", pressures, [ATLAS], "Compare degrees north; the largest is furthest north."),
    sort("Sort each place by the pressure the evidence describes.", ["Forest clearing", "Drying or thawing land"], [["Amazon Basin", 0], ["Borneo", 0], ["Sahel", 1], ["Northern Canada", 1]], pressures, [BIO, SAH, PERM], "Read the first sentence for forest clearing."),
  ]),
  lesson(["Forests do many jobs.", "Trees shelter wildlife and hold soil.", "They also take in carbon dioxide."], trees, [
    c("What do trees give to wildlife?", "Homes", "Salt", "Sand", trees, [FOR], "Read the first evidence sentence."),
    c("What do trees take in from the air as they grow?", "Carbon dioxide", "Plastic", "Gold", trees, [FOR], "Read the second evidence sentence."),
    c("How do roots help the soil?", "They hold it in place", "They wash it away", "They make it dry", trees, [FOR], "Read the third evidence sentence."),
    c("What do trees release that helps clouds form?", "Water vapour", "Sand", "Wood", trees, [FOR], "Read the fourth evidence sentence."),
    c("Can a cleared rainforest quickly regrow?", "No, it cannot regrow quickly", "Yes, it regrows in a single week", "Yes, it grows back overnight in full", trees, [FOR], "Read the last evidence sentence."),
    c("Why does cutting down trees on a steep slope risk washing soil away?", "Fewer roots hold the soil", "More roots hold the soil", "Rain stops falling", trees, [FOR], "Read the third evidence sentence."),
    c("How does clearing forest link to the water cycle?", "Fewer trees release less water vapour", "More trees release less vapour", "Trees stop all clouds", trees, [FOR], "Read the fourth evidence sentence."),
    sort("Sort each job by whether trees do it for wildlife or for the air and water.", ["For wildlife", "For air and water"], [["Give homes", 0], ["Provide shelter", 0], ["Take in carbon dioxide", 1], ["Release water vapour", 1]], trees, [FOR], "Wildlife needs shelter; air and water are carbon dioxide and vapour."),
  ]),
  lesson(["Burning fossil fuels adds carbon dioxide to the air.", "That warms the planet on average.", "Warming melts ice."], warming, [
    c("What gas does burning coal, oil and gas release?", "Carbon dioxide", "Oxygen only", "Helium", warming, [CLIM], "Read the first evidence sentence."),
    c("What does carbon dioxide do in the air?", "Traps heat like a blanket", "Cools Earth like a fan", "Turns into rain at once", warming, [CLIM], "Read the second evidence sentence."),
    c("What happens when there is more carbon dioxide?", "Earth warms on average", "Earth cools on average", "Nothing ever changes", warming, [CLIM], "Read the third evidence sentence."),
    c("What can warming melt?", "Ice", "Mountains", "Rock", warming, [CLIM], "Read the fourth evidence sentence."),
    c("What happens to sea levels as ice melts and warming continues?", "They rise", "They fall", "They stay exactly the same", warming, [CLIM], "Read the fourth evidence sentence."),
    c("Which power source does not release carbon dioxide while making electricity?", "Wind or solar", "Coal", "Gas", warming, [CLIM], "Read the last evidence sentence."),
    ordered("Order the steps from burning fuel to warming.", ["Fuel is burned", "Carbon dioxide is released", "Heat is trapped in the air", "Earth warms on average"], warming, [CLIM], "Start with burning."),
    sort("Sort each energy source by whether it releases carbon dioxide when burned.", ["Releases carbon dioxide", "Does not release it while making electricity"], [["Coal", 0], ["Oil", 0], ["Wind", 1], ["Solar", 1]], warming, [CLIM], "Read the first and last evidence sentences."),
  ]),
  lesson(["Sustainable means meeting needs without harming the future.", "Every choice has a trade-off.", "Compare before you decide."], choicesTable, [
    c("What does sustainable mean?", "Meeting needs today without harming the future", "Using up everything we can at the same time", "Ignoring nature while building more and more", choicesTable, [SUS], "Read the first evidence line."),
    c("What is the benefit of protecting forest as a national park?", "It keeps habitats and carbon stores", "It builds new roads through the forest", "It allows more logging in the whole area", choicesTable, [SUS], "Read the first row."),
    c("What is the trade-off of planting new trees after logging?", "They take years to grow", "They cannot be planted", "They never need water", choicesTable, [SUS], "Read the second row."),
    c("What is a benefit of a wind farm?", "Clean electricity", "More smoke", "More coal", choicesTable, [SUS, CLIM], "Read the third row."),
    c("What is one trade-off of a wind farm?", "It can change views and affect birds", "It burns coal to make clean electricity", "It needs no space and no materials at all", choicesTable, [SUS], "Read the third row."),
    c("Which choice needs safe routes to work well?", "Using buses, bikes and walking", "Building a wind farm", "Planting trees", choicesTable, [SUS], "Read the fourth row."),
    c("Why do decisions work best when people compare evidence?", "Every choice has benefits and trade-offs", "All choices are identical, so none matters", "Nothing changes whichever choice people make", choicesTable, [SUS], "Read the second evidence line."),
    c("Which choice protects habitats but limits farming?", "Protecting forest as a national park", "Using buses and bikes", "Building a wind farm", choicesTable, [SUS], "Match the benefit and trade-off."),
    sort("Sort each point as a benefit or a trade-off.", ["Benefit", "Trade-off"], [["Clean electricity", 0], ["Less carbon dioxide", 0], ["Takes years to grow", 1], ["Limits some farming", 1]], choicesTable, [SUS], "Benefits help; trade-offs are costs or limits."),
  ]),
]);
