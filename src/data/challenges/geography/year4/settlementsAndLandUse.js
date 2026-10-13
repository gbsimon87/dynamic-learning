import { c, lesson, ordered, record, sort, topic } from "./authoring.js";
import { map, PLACES } from "./maps.js";
import { LAKE_MAP } from "../year3/maps.js";
import { count, dist, landGrid, near, pairOf, extreme } from "./settlementsShared.js";

const EX = "Example data: simplified practice grids, not real places.";
// Settlement pattern grids: H homes, F fields, T road.
const PKEY = [{ code: "H", label: "Homes" }, { code: "F", label: "Fields" }, { code: "T", label: "Road" }];
const gA = landGrid("Example A (example data)", ["FFFFF", "FHHHF", "FHHHF", "FFTFF", "FFTFF"], PKEY);
const gB = landGrid("Example B (example data)", ["FFFFF", "HHHHH", "TTTTT", "HHHHH", "FFFFF"], PKEY);
const gC = landGrid("Example C (example data)", ["HFFFF", "FFFHF", "FHFFF", "FFFFH", "FFHFF"], PKEY);
const patterns = pairOf("Three settlement examples (example data)", [gA, gB, gC], [EX, "Each grid is north-up with the same key."]);
const types = record(["A village is small and has a few services.", "A town is larger and has more shops and services.", "A city is larger again, with services such as hospitals and universities.", "Size cut-offs are different in different places."], "Settlement types");

// Land-use sketches (example data).
const LAKE_KEY = [{ code: "F", label: "Farming" }, { code: "H", label: "Homes" }, { code: "R", label: "Recreation" }, { code: "W", label: "Lake" }, { code: "T", label: "Road" }];
const CAMP_KEY = [{ code: "W", label: "Sea" }, { code: "I", label: "Port and industry" }, { code: "H", label: "Homes" }, { code: "T", label: "Road" }, { code: "F", label: "Farming" }];
const WASH_KEY = [{ code: "W", label: "Puget Sound" }, { code: "I", label: "Port" }, { code: "H", label: "Homes" }, { code: "M", label: "Woodland and hills" }, { code: "F", label: "Farming" }];
const LAKE_CELLS = ["FFRWW", "FHRWW", "FHTRW", "FFTFF"], CAMP_CELLS = ["WWWWW", "WIIHH", "WTHHF", "FTFFF"], WASH_CELLS = ["WWHMF", "WIHMF", "WHHMF", "WWHMM"];
const sk = "Example data: a simplified sketch of a made-up place, not a survey.";
const lakeSk = landGrid("Lake District-style sketch (example data)", LAKE_CELLS, LAKE_KEY, [sk]);
const campSk = landGrid("Campania-style sketch (example data)", CAMP_CELLS, CAMP_KEY, [sk]);
const washSk = landGrid("Washington-style sketch (example data)", WASH_CELLS, WASH_KEY, [sk]);
const WASH3 = map("washington", ["Seattle", "Olympia", "Spokane"], ["Seattle and Olympia are near Puget Sound in the west; Spokane is inland."]);

const reasons = record(["People often settle near water, on flat land and beside useful routes.", "Some sites also gave shelter and building materials.", "Several reasons can combine in one place."], "Why settle here?");
const harbour = record(["Naples has a harbour on the coast where boats arrive.", "The harbour is a human-built feature beside the sea."], "Naples harbour");
const seaport = record(["Seattle and Tacoma have container terminals run by the Northwest Seaport Alliance.", "Cargo ships use these seaport terminals."], "Seattle seaport");
const orchard = record(["Dry central Washington valleys such as Yakima grew orchards after large-scale irrigation.", "Irrigation brings river water to dry land."], "Yakima orchards");
const steps = record(["Find the settlement marker on the map.", "Look for nearby water, hills or roads.", "Compare with other places.", "State one supported reason."], "Using evidence");
const link = record(["Keswick lies beside Derwentwater on the Lake District map.", "Naples has a harbour used by boats.", "Seattle has seaport terminals for cargo.", "A land-use map shows how land is used, not why a settlement began."], "Evidence about three settlements");

const near3 = (from, ...to) => extreme(to, (t) => dist(from, t), false);
if (near3("Keswick", "Derwentwater", "Windermere", "Kendal") !== "Derwentwater" || near3("Ambleside", "Windermere", "Kendal", "Keswick") !== "Windermere") throw new Error("lake distances");
const eastMost = extreme(["Seattle", "Olympia", "Spokane"], (p) => PLACES[p][0]);
const northMost = extreme(["Keswick", "Ambleside", "Kendal"], (p) => PLACES[p][1]);
const farEast = extreme(["Seattle", "Spokane", "Yakima", "Olympia"], (p) => PLACES[p][0]);
const WASH4 = map("washington", ["Seattle", "Spokane", "Yakima", "Olympia"], ["The Pacific coast is on the west side of the map."]);

export const settlementsAndLandUse = topic([
  lesson(["A village is small, a town larger and a city larger again.", "Nucleated homes cluster, linear homes follow a road, dispersed homes spread out.", "Size cut-offs differ between places."], patterns, [
    c("Which example has homes in one tight cluster?", "Example A", "Example B", "Example C", patterns, ["example"], "Look for the grid where homes touch each other."),
    c("Which example has homes in lines beside a road?", "Example B", "Example A", "Example C", patterns, ["example"], "Find the grid with a long road row."),
    c("Which example has single homes spread among fields?", "Example C", "Example A", "Example B", patterns, ["example"], "Look for homes that do not touch."),
    c("What is the pattern of Example B called?", "Linear", "Nucleated", "Dispersed", patterns, ["example"], "Think about homes following a route."),
    c("What is the pattern of Example A called?", "Nucleated", "Linear", "Dispersed", patterns, ["example"], "Think about homes gathered at one point."),
    c("Which word describes Example C, where homes are far apart?", "Dispersed", "Nucleated", "Linear", patterns, ["example"], "Think about homes spread out."),
    ordered("Order these settlements from smallest to largest.", ["Village", "Town", "City"], types, ["g4_settlements"], "A city is larger again than a town."),
    sort("Sort each description by settlement type.", ["Village", "City"], [["A few local services", 0], ["Hospitals and universities", 1], ["Smaller than a town", 0], ["Larger than a town", 1]], types, ["g4_settlements"], "Compare size and services with the lines."),
    c("Does one size number separate villages from towns everywhere?", "No, cut-offs differ between places", "Yes, every country uses the same size rule", "Yes, the UK sets one rule for the world", types, ["g4_settlements"], "The evidence says cut-offs are different in different places."),
  ]),
  lesson(["A land-use map colours land by how people use it.", "Read the key first, then find each letter.", "These sketches are example data, not real surveys."], lakeSk, [
    c("How many squares show farming in the Lake District-style sketch?", String(count(LAKE_CELLS, "F")), ...near(count(LAKE_CELLS, "F")).slice(1), lakeSk, ["example"], "Count each F row by row."),
    c("How many squares show port and industry?", String(count(CAMP_CELLS, "I")), ...near(count(CAMP_CELLS, "I")).slice(1), campSk, ["example"], "Find the letter for port and industry in the key."),
    c("How many squares show farming in the Washington-style sketch?", String(count(WASH_CELLS, "F")), ...near(count(WASH_CELLS, "F")).slice(1), washSk, ["example"], "Count each F in all four rows."),
    c("How many squares show homes?", String(count(CAMP_CELLS, "H")), ...near(count(CAMP_CELLS, "H")).slice(1), campSk, ["example"], "Count each H in rows 2 and 3."),
    c("Which land use is in the top-right corner square?", "Farming", "Woodland and hills", "Homes", washSk, ["example"], "Row 1, last letter."),
    c("Which land use is just east of the port squares in row 2?", "Homes", "Sea", "Farming", campSk, ["example"], "Find the two I squares, then step east."),
    c("In the Washington-style sketch, what does M stand for?", "Woodland and hills", "Farming", "Port", washSk, ["example"], "Check the key."),
    c(`Which marker is furthest east?`, eastMost, "Seattle", "Olympia", WASH3, ["atlas", "regions"], "East is to the right on a north-up map.", [WASH3.lines[0]]),
    c("Which settlement marker is furthest north?", northMost, "Ambleside", "Kendal", LAKE_MAP, ["parkBoundary"], "Compare the degrees north in the description."),
    sort("Sort the Campania-style squares by what people do there.", ["People live here", "People work here"], [["Homes", 0], ["Port and industry", 1], ["Farming", 1]], campSk, ["example"], "Think about what each land use is for."),
  ]),
  lesson(["People often settle near water, flat land and routes.", "Some sites also gave shelter and building materials.", "Several reasons can combine in one place."], reasons, [
    c("Which marker is nearest to Keswick?", "Derwentwater", "Windermere", "Kendal", LAKE_MAP, ["parkBoundary", "park"], "Compare how far each marker is from Keswick."),
    c("Which marker is nearest to Ambleside?", "Windermere", "Kendal", "Keswick", LAKE_MAP, ["parkBoundary", "park"], "Compare the degrees north and west."),
    c("Which marker is furthest from the Pacific coast?", farEast, "Seattle", "Olympia", WASH4, ["atlas", "regions"], "The coast is on the west side."),
    c("Which feature helps explain Naples as a place for boat trade?", "Its harbour on the coast", "Its nearby mountain lake", "Its large fishing fleet", harbour, ["naples", "naplesPhoto"], "Think about where boats arrive."),
    c("Which transport link is described near Seattle?", "Seaport terminals for cargo ships", "A lake ferry", "A mountain railway", seaport, ["g4_seaport"], "Read the line about terminals."),
    c("What helped orchards grow in dry Yakima valleys?", "Irrigation water", "Cooler summers", "Stronger winds", orchard, ["g4_orchards", "g4_wsAgri"], "Read what brought river water to dry land."),
    c("Why might people choose flat land for a settlement?", "It is easier to build, farm and travel on", "It is higher, so easier to defend", "It is always nearer to the sea", reasons, ["g4_siting"], "Think about building and moving around."),
    sort("Sort each feature by who made it.", ["Physical feature", "Made by people"], [["Lake", 0], ["Mountain slope", 0], ["Road", 1], ["Harbour wall", 1]], reasons, ["g4_siting"], "Ask whether nature or people made it."),
    ordered("Order the steps for linking a settlement to its site.", ["Find the settlement marker", "Look for water, hills or roads", "Compare with other places", "State one supported reason"], steps, ["example"], "Start with the marker you are studying."),
  ]),
  lesson(["Choose a reason that the evidence supports.", "Settlements often have several reasons.", "Say what the evidence cannot show."], link, [
    c("Which claim about Keswick is best supported?", "Its lakeside site may be one reason it grew", "Its lakeside site is the reason it grew", "Its lakeside site had no effect on it", link, ["parkBoundary", "g4_siting"], "Check which claim the evidence can actually support."),
    c("Which claim about Naples is supported?", "Its harbour links it to boat transport", "Its harbour is the largest port in Italy", "Its harbour is used only by fishing boats", link, ["naples", "naplesPhoto"], "Read what the evidence says about boats."),
    c("Which claim about Seattle is supported?", "It has seaport terminals for cargo", "It has the busiest seaport in the USA", "It has a railway terminal for cargo trains", link, ["g4_seaport"], "Read the line about Seattle."),
    c("What does a land-use map show about a town?", "How land is used, not why it began", "Why it began, not how land is used", "When each building was built", link, ["example"], "Compare what the map records with a history."),
    c("Which reason for choosing a settlement site is given in the evidence?", "A nearby water supply", "A nearby airport", "A nearby theatre", reasons, ["g4_siting"], "Compare each option with the first line."),
    c("Which extra evidence would help explain why Keswick began?", "An old map or written history", "A recent weather forecast", "A modern shop price list", link, ["example"], "Choose evidence from when it began."),
    sort("Sort each statement by evidence.", ["Supported here", "Needs more evidence"], [["Naples has a harbour", 0], ["Seattle has seaport terminals", 0], ["The harbour is the only reason Naples grew", 1], ["Keswick began because of the lake", 1]], link, ["naplesPhoto", "g4_seaport", "g4_siting"], "Compare each card with the evidence lines."),
    c("Which evidence about settlements is about physical geography?", "Keswick lies beside a lake", "Seattle has container terminals", "Naples harbour is used by boats", link, ["parkBoundary", "g4_seaport"], "Which feature was not built by people?"),
  ]),
]);
