import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { climateTable, place } from "./records.js";
import { count, extreme, landGrid, near } from "./settlementsShared.js";

const kinds = record(["Natural resources named here: coal, natural gas, wind, flowing water, building stone and granite.", "Products named here: petrol and bricks, which people make using resources.", "Granite is a rock built from the minerals quartz, feldspar and mica.", "People use water for drinking, cooking, washing and watering crops.", "Coal and natural gas are fossil fuels.", "Wind and flowing water are renewable: nature keeps supplying them.", "Wind turns turbine blades, which turn a generator that makes electricity for homes."], "Resources and products");
const KEY = [{ code: "R", label: "Reservoir" }, { code: "M", label: "Mine" }, { code: "W", label: "Wind farm" }, { code: "H", label: "Homes" }, { code: "F", label: "Fields" }];
const CELLS = ["RRHFF", "RMHFW", "MMHFW", "FFHFW"];
const rmap = landGrid("Example resource map (example data)", CELLS, KEY, ["Example data: a made-up place, not a real region.", "A reservoir stores water."]);
const ct = climateTable(["ambleside", "naples", "seattle", "spokane"], { title: "July and January records for four places", months: [0, 6] });
const jr = (id) => place(id).months[6].r;
const ids = ["ambleside", "naples", "seattle", "spokane"];
const leastJul = extreme(ids, jr, false), mostJul = extreme(["ambleside", "naples", "spokane"], jr);
if (leastJul !== "spokane" || mostJul !== "ambleside" || !(jr("naples") > jr("seattle"))) throw new Error("July rainfall facts changed");
const name = (id) => place(id).name;
const climate = { ...ct, lines: [...ct.lines, "Rain is one part of a water supply; rivers and reservoirs also matter.", "Central Washington's dry land was watered using the Columbia and Yakima irrigation projects."], alt: `${ct.alt} Rain is one part of a water supply; rivers and reservoirs also matter. Central Washington's dry land was watered using the Columbia and Yakima irrigation projects.` };
const RCOLS = ["Region", "Coal", "Wind", "Water"];
const RROWS = [["A", "Little", "Plenty", "Some"], ["B", "Plenty", "Some", "Little"], ["C", "None", "Some", "Plenty"]];
const rtable = visual("table", "Example resource record (example data)", `Example data table of three made-up regions. ${RROWS.map((r) => `Region ${r[0]}: coal ${r[1]}, wind ${r[2]}, water ${r[3]}.`).join(" ")} Made-up regions, not real places.`, ["Example data: three made-up regions, not real places."], { caption: "Example data: how much of each resource three made-up regions have.", columns: RCOLS, rows: RROWS });
const tradeoffs = record(["Wind turbines do not release air or water pollutants, but birds and bats can be hurt by the blades.", "Dams for hydropower can block fish and change river conditions.", "Coal, oil and natural gas are fossil fuels: finite, not replaced soon.", "Resources are not found equally everywhere, so people move them by road, rail or ship.", "Wind is naturally replenished."], "Benefits and trade-offs");
const decide = record(["Example data: a town needs more electricity and has two choices.", "A wind farm would add turbines on hills. A hydropower dam would flood a valley.", "Each choice has benefits and trade-offs.", "Steps: state the need, list the benefits, list the trade-offs, then choose and explain."], "A town's choice (example data)");

export const energyMineralsAndWater = topic([
  lesson(["A resource is a natural material people use.", "Coal, oil and gas are finite. Wind and flowing water are renewable.", "A product is made using resources."], kinds, [
    sort("Sort each item into resource or product.", ["Natural resource", "Made product"], [["Coal", 0], ["Flowing water", 0], ["Petrol", 1], ["Bricks", 1]], kinds, ["g4_minerals", "g4_renewable"], "Ask whether nature supplies it or people make it."),
    c("Which is a fossil fuel?", "Natural gas", "Wind", "Flowing water", kinds, ["g4_renewable"], "Look for the finite energy resource."),
    c("Which energy source is naturally replenished?", "Wind", "Coal", "Natural gas", kinds, ["g4_renewable", "g4_wind"], "Nature keeps supplying it."),
    c("Which resource is used for building walls?", "Building stone", "Wind", "Petrol", kinds, ["g4_minerals"], "Read the first line."),
    c("Granite is a rock built from what?", "Minerals", "Petrol", "Bricks", kinds, ["g4_minerals"], "Read the line about quartz."),
    c("What is water used for in the evidence?", "Drinking, cooking, washing and crops", "Making bricks and petrol", "Powering wind turbines", kinds, ["g4_siting"], "Read the last line."),
    c("Which item is a product made using resources?", "Bricks", "Coal", "Granite", kinds, ["g4_minerals"], "Check the line that names products."),
    ordered("Order how wind can reach homes as electricity.", ["Wind turns the blades", "A generator is turned", "Electricity is made", "Homes use electricity"], kinds, ["g4_wind"], "Start with the wind."),
  ]),
  lesson(["Read the key first.", "This is an example resource map, not a real place.", "Count or compare squares carefully."], rmap, [
    c("Which letter is a mine?", "M", "R", "W", rmap, ["example"], "Check the key."),
    c("How many squares show a wind farm?", ...near(count(CELLS, "W")), rmap, ["example"], "Count each W."),
    c("How many squares show homes?", ...near(count(CELLS, "H")), rmap, ["example"], "Count each H."),
    c("Which resource is in the top-left corner?", "Reservoir", "Mine", "Wind farm", rmap, ["example"], "Row 1, first letter."),
    c("Which resource sits on the east edge in rows 2 to 4?", "Wind farm", "Mine", "Reservoir", rmap, ["example"], "Read the last letter of each row."),
    c("What does a reservoir store?", "Water", "Coal", "Wind", rmap, ["example"], "Read the line below the map title."),
    c("Is this map a real region?", "No, it is example data", "Yes, a real national park", "Yes, a real city", rmap, ["example"], "Check the label."),
    sort("Sort each map item.", ["Natural resource site", "Place people live"], [["Reservoir", 0], ["Mine", 0], ["Wind farm", 0], ["Homes", 1]], rmap, ["example"], "Think about what each item is."),
    ordered("Order row 2 from west to east.", ["Reservoir", "Mine", "Homes", "Fields", "Wind farm"], rmap, ["example"], "Read left to right along the second row."),
  ]),
  lesson(["Compare the same resource in each place.", "Rain is one part of a water supply.", "Rivers and reservoirs also matter."], climate, [
    c("Which place has the least July rainfall?", name(leastJul), "Naples", "Seattle", climate, ["g4_climate"], "Compare the July rows only."),
    c("Which of these has the most July rainfall?", name(mostJul), "Naples", "Spokane", climate, ["g4_climate"], "Compare July rain in mm."),
    c("Which has more July rain of Naples, Seattle and Spokane?", "Naples", "Seattle", "Spokane", climate, ["g4_climate"], "Compare the two July rainfall values in mm."),
    c("Does low rainfall mean there is no water supply?", "No, rivers and irrigation can supply water", "Yes, rain is the only source of water", "Yes, dry places cannot grow crops", climate, ["g4_wsAgri"], "Read the lines about irrigation."),
    c("Which region has no coal?", "Region C", "Region A", "Region B", rtable, ["example"], "Read the coal column."),
    c("Which region has plenty of water but no coal?", "Region C", "Region A", "Region B", rtable, ["example"], "Check two columns."),
    c("Which region has plenty of wind?", "Region A", "Region B", "Region C", rtable, ["example"], "Read the wind column."),
    sort("Sort each use of a resource.", ["Energy use", "Building or farm use"], [["Wind turning a turbine", 0], ["Coal burned for power", 0], ["Stone for walls", 1], ["Water for crops", 1]], kinds, ["g4_wind", "g4_minerals", "g4_siting"], "Ask whether it makes energy."),
    c("Why can three example regions not show equal access everywhere?", "They show only some made-up places", "They show every real place in detail", "They show where real coal is found", rtable, ["example"], "Check the label about made-up regions."),
  ]),
  lesson(["Resources have benefits and trade-offs.", "Renewable does not mean no impact.", "Finite resources can run low."], tradeoffs, [
    c("Which statement about wind power is supported?", "No air pollutants, but birds can be hurt", "Turbines release air pollutants but never hurt wildlife", "Turbines release no pollutants and never hurt wildlife", tradeoffs, ["g4_wind"], "Read the first line."),
    c("Which hydropower trade-off is supported?", "Dams can block fish", "Dams can harm bats and birds", "Dams only change the river's colour", tradeoffs, ["g4_hydro"], "Read the second line."),
    c("Why are coal, oil and gas called finite?", "They are not replaced soon", "They are replaced quickly by nature", "They are found in only one country", tradeoffs, ["g4_renewable"], "Read the third line."),
    c("Why might people move resources between places?", "Resources are not found equally everywhere", "Resources are always found where people live", "Moving resources costs nothing", tradeoffs, ["g4_siting", "example"], "Read the last line."),
    c("Which claim is too strong?", "Renewable energy has no impacts", "Wind and dams both have trade-offs", "Fossil fuels are finite", tradeoffs, ["g4_wind", "g4_hydro"], "Which claim ignores the trade-offs?"),
    sort("Sort each point about energy sources.", ["Benefit", "Trade-off"], [["Turbines release no air pollutants", 0], ["Blades can hurt birds and bats", 1], ["Dams can block fish", 1], ["Wind is naturally replenished", 0]], tradeoffs, ["g4_wind", "g4_hydro", "g4_renewable"], "Ask whether it helps or causes a problem."),
    c("In the town example, what should the town consider?", "Benefits and trade-offs of each choice", "Only which choice is cheaper", "Only which choice is quicker to build", decide, ["g4_wind", "g4_hydro"], "Check what each choice offers and what it costs."),
    c("Which choice would flood a valley?", "A hydropower dam", "A wind farm", "Neither choice", decide, ["g4_hydro"], "Read the second line about the two choices."),
    ordered("Order a careful decision about resources.", ["State the need", "List the benefits", "List the trade-offs", "Choose and explain"], decide, ["example"], "Start with why a choice is needed."),
  ]),
]);
