import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { map } from "./maps.js";
import { climateTable, place } from "./records.js";
import { extreme, pairOf } from "./settlementsShared.js";

const LAKE_MAP = map("lake", ["Keswick", "Ambleside", "Kendal", "Windermere", "Scafell Pike", "Derwentwater"], ["The outlined area is the Lake District National Park.", "Kendal is nearby, outside the park boundary."]);
const CAMPANIA_MAP = map("campania", ["Naples", "Vesuvius"], ["The outlined area is Campania, a region within Italy.", "Naples and Vesuvius are two places within this region."]);
const WASH_MAP = map("washington", ["Seattle", "Spokane", "Olympia"], ["The outlined area is Washington State in the USA, not Washington, DC."]);
const where = pairOf("The three study regions", [LAKE_MAP, CAMPANIA_MAP, WASH_MAP], ["The Lake District National Park is in England, in the UK.", "Campania is an administrative region of Italy.", "Washington State is in the USA, in North America.", "The Lake District and Campania are in Europe."]);

const COLS = ["Matching dimension", "Lake District (England)", "Campania (Italy)", "Washington State (USA)"];
const ROWS = [["Continent", "Europe", "Europe", "North America"], ["High land", "Scafell Pike", "Vesuvius", "Cascade Range"], ["Water", "Windermere and Derwentwater", "Coast and Naples harbour", "Puget Sound"], ["Work in the evidence", "Farming and tourism", "Farming and port activity", "Farming and seaports"], ["Settlement marker", "Keswick", "Naples", "Seattle"]];
const alt = `Evidence table with three regions. ${ROWS.map((r) => `${r[0]}: Lake District ${r[1]}; Campania ${r[2]}; Washington State ${r[3]}.`).join(" ")}`;
const evidence = visual("table", "Regional evidence table", alt, ["Each row compares the same dimension in all three regions.", "The table gives sampled evidence, not everything about each region."], { caption: "Matching evidence for three regions.", columns: COLS, rows: ROWS });

const ids = ["ambleside", "naples", "seattle", "spokane"];
const ct = climateTable(ids, { title: "January and July records for four places", months: [0, 6] });
const extra = ["Ambleside is in the Lake District, Naples is in Campania, and Seattle and Spokane are in Washington State.", "Seattle and Spokane are different places in the same state."];
const climate = { ...ct, lines: [...ct.lines, ...extra], alt: `${ct.alt} ${extra.join(" ")}` };
const t = (id, m) => place(id).months[m].t, r = (id, m) => place(id).months[m].r;
const warmJul = extreme(["ambleside", "naples", "seattle"], (id) => t(id, 6));
const coldJan = extreme(ids.filter((i) => i !== "seattle"), (id) => t(id, 0), false);
if (warmJul !== "naples" || coldJan !== "spokane" || !(r("spokane", 6) < r("seattle", 6)) || !(r("naples", 6) < r("ambleside", 6)) || !(t("seattle", 6) > t("ambleside", 6)) || !(place("spokane").elevationM > place("ambleside").elevationM && place("ambleside").elevationM > place("seattle").elevationM)) throw new Error("climate facts changed");
const summary = record(["Lake District: lakes, mountains such as Scafell Pike, farming and tourism.", "Campania: Vesuvius, Naples harbour, farming and port activity.", "Washington State: Cascade Range, Puget Sound, irrigated orchards and seaports.", "Seattle and Spokane have different climate records, so one place does not describe a state.", "Each region is large and varies inside."], "Three regions: evidence summary");
const method = record(["A complete comparison names all three regions.", "It uses matching evidence for each region.", "It includes human and physical evidence.", "It states a limit."], "Comparing three regions");

export const comparingThreeRegions = topic([
  lesson(["We compare the Lake District, Campania and Washington State.", "The Lake District is in England; Campania is in Italy.", "Washington State is in the USA, in North America."], where, [
    c("Which part of the UK contains the Lake District?", "England", "Scotland", "Wales", where, ["parkBoundary", "ukAreas"], "Read the line about the National Park."),
    c("Which country contains Campania?", "Italy", "Spain", "France", where, ["regions"], "Read the line about Campania."),
    c("Which country contains Washington State?", "The USA", "Canada", "Mexico", where, ["atlas", "regions"], "Read the line about Washington State."),
    c("Which region is in North America?", "Washington State", "Campania", "Lake District", where, ["atlas"], "Check the continent in the lines."),
    c("Which two regions are in Europe?", "Lake District and Campania", "Campania and Washington State", "Lake District and Washington State", where, ["atlas", "regions"], "Find the two regions outside North America."),
    sort("Sort each place by continent.", ["Europe", "North America"], [["Lake District", 0], ["Campania", 0], ["Naples", 0], ["Seattle", 1]], where, ["atlas", "regions"], "Think about the region each place is in."),
    c("Is Washington State the same place as Washington, DC?", "No, they are different places", "Yes, the same place", "Yes, but smaller", where, ["atlas"], "Read the line about the outlined area."),
    c("What kind of area is Campania within Italy?", "An administrative region", "A country", "A city", where, ["regions"], "Campania is inside Italy."),
  ]),
  lesson(["Read across a row to compare one dimension.", "Read down a column to study one region.", "The table gives sampled evidence only."], evidence, [
    c("Which region's high land is the Cascade Range?", "Washington State", "Campania", "Lake District", evidence, ["g4_wsAgri"], "Read the high land row."),
    c("Which region's high land is Vesuvius?", "Campania", "Lake District", "Washington State", evidence, ["vesuvius"], "Read the high land row."),
    c("Which row names Keswick, Naples and Seattle?", "Settlement marker", "Water", "Continent", evidence, ["parkBoundary", "naples", "g4_seaport"], "These are three towns or cities."),
    c("Which region's work includes seaports?", "Washington State", "Lake District", "None of them", evidence, ["g4_seaport"], "Read the work row."),
    c("Which regions are in Europe?", "Lake District and Campania", "Campania and Washington State", "All three regions", evidence, ["atlas"], "Read the continent row."),
    c("Which row names Puget Sound?", "Water", "High land", "Work in the evidence", evidence, ["atlas"], "Puget Sound is a body of water."),
    c("Which work appears in all three regions?", "Farming", "Seaports", "Tourism", evidence, ["parkWork", "farming", "g4_wsAgri"], "Read all three entries in the work row."),
    c("Which water evidence is named for Campania?", "Coast and Naples harbour", "Windermere", "Puget Sound", evidence, ["naplesPhoto"], "Read the water row."),
  ]),
  lesson(["Compare the same months and measures.", "Look for similarities and differences.", "Places in one region can differ."], climate, [
    c("Which has the warmest July of Ambleside, Naples and Seattle?", "Naples", "Seattle", "Ambleside", climate, ["g4_climate"], "Compare July temperatures."),
    c("Which place has the coldest January of Ambleside, Naples and Spokane?", "Spokane", "Naples", "Ambleside", climate, ["g4_climate"], "Look for the lowest January value."),
    c("Which is driest in July of Seattle, Spokane and Naples?", "Spokane", "Seattle", "Naples", climate, ["g4_climate"], "Compare July rainfall in mm."),
    c("Which has the wettest July of Naples, Seattle and Ambleside?", "Ambleside", "Naples", "Seattle", climate, ["g4_climate"], "Compare July rainfall in mm."),
    c("Which is warmest in July of Ambleside, Seattle and Spokane?", "Spokane", "Seattle", "Ambleside", climate, ["g4_climate"], "Compare July temperatures."),
    c("What does the Seattle and Spokane difference show?", "Climate can vary within one region", "Climate is the same across Washington State", "Seattle and Spokane are in different states", climate, ["g4_climate"], "Both places are in the same state."),
    c("Which place has the highest data height of Seattle, Spokane and Ambleside?", "Spokane", "Ambleside", "Seattle", climate, ["g4_climate"], "Read the data height lines."),
    sort("Sort each statement by what the evidence shows.", ["Similarity in our evidence", "Difference in our evidence"], [["High land in all three", 0], ["Farming in all three", 0], ["Vesuvius is named only in Campania", 1], ["Port activity or seaports in two regions", 1]], evidence, ["vesuvius", "parkWork", "g4_seaport"], "Compare each card with the table."),
  ]),
  lesson(["A strong comparison names all three regions.", "It uses human and physical evidence.", "It states a limit."], summary, [
    c("Which comparison covers all three regions with human and physical evidence?", "Compares all three, using high land, water and work", "Compares two regions, using weather only", "Compares one region, using farming only", summary, ["parkWork", "farming", "g4_seaport"], "Check how many regions and kinds of evidence it uses."),
    c("Which limit should a comparison state?", "Regions are large and vary inside", "The three regions have the same area", "Each region has one climate everywhere", summary, ["example", "g4_climate"], "Think about what a few places cannot show."),
    c("Why does Seattle's record not describe all Washington State?", "Spokane, in the same state, differs", "Spokane is in a different state", "Seattle's record covers a longer time", summary, ["g4_climate", "example"], "Read the line about Seattle and Spokane."),
    c("Which claim is too strong?", "All three regions have identical weather", "Farming appears in all three regions", "Each region has high land", summary, ["g4_climate"], "Which claim ignores differences?"),
    c("Which extra evidence would make the comparison fairer?", "Records from the same months in more places", "One photo of a single street", "A flag for each country", summary, ["g4_climate", "example"], "Choose matching evidence from several places."),
    sort("Sort each item by type of evidence.", ["Physical", "Human"], [["Cascade Range", 0], ["Vesuvius", 0], ["Seaport", 1], ["Irrigated orchards", 1]], summary, ["g4_orchards", "g4_seaport", "vesuvius"], "Ask whether nature or people made it."),
    c("Which feature belongs in a complete comparison?", "Human and physical evidence", "A ranked winner", "One region's weather only", method, ["example"], "Check the list of what a complete comparison needs."),
    ordered("Order the steps of a three-region comparison.", ["Name the three regions", "Choose matching evidence", "Compare similarities and differences", "State a limit"], method, ["example"], "Start by naming the regions."),
  ]),
]);
