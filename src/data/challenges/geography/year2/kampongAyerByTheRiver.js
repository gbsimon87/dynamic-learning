import { choices, lesson, record, sort, topic } from "./authoring.js";
import { peramuPlan, peramuPhoto, peramuBuilding, worldMap, pair } from "./visuals.js";
const locator = worldMap([["Brunei", [114.94, 4.88]], ["Asia", [90, 40]], ["UK", [-2, 54]]],
  ["Brunei is a country in Asia.", "Kampong Ayer is in Brunei, beside the Brunei River.", "Our study is Kampong Peramu and nearby river/walkways.", "Kampong Peramu is one neighbourhood within Kampong Ayer."]);
const buildings = pair(peramuPhoto, peramuBuilding, ["One photograph shows a decorated home; another shows a prayer hall.", "Both buildings stand above river water.", "Buildings in this neighbourhood have different uses."]);
const limits = record(["The official trail shows homes, walkways and boat landing places.", "Walkways connect nearby buildings above the water.", "Boat journeys cross river water.", "Our photographs show a home and a prayer hall.", "The study is one neighbourhood, not all Brunei.", "One view does not show how everyone lives or travels."]);
export const kampongAyerByTheRiver = topic([
  lesson(["Kampong Peramu is a neighbourhood in Kampong Ayer.", "It is in Brunei, in Asia.", "Homes and walkways are beside the Brunei River."], buildings, choices([
    ["Which two building uses are shown?", "Home and prayer hall", "Only factories", "Only offices"],
    ["What is beneath the photographed buildings?", "River water", "Only mountain rock", "Only desert sand"],
    ["Which feature connects nearby buildings?", "Walkway", "A glacier", "A mountain ridge"],
    ["What is a home used for here?", "A place to live", "A whole continent", "An ocean crossing"],
    ["Does every building have the same use?", "No, the photos show different uses", "Yes, all are homes", "Yes, all are shops"],
    ["What do these photographs show?", "Two neighbourhood views", "Every Bruneian home", "Every Asian building"],
    ["Which human feature is visible?", "Built walls and walkways", "River water", "The whole ocean"],
  ], buildings, ["y2Peramu", "y2PeramuPhoto", "y2HomesPhoto"])),
  lesson(["Find Asia, then Brunei, then Kampong Ayer.", "Kampong Peramu is our smaller neighbourhood study.", "The world map and local plan show different areas."], locator, [
    ...choices([
      ["Which continent contains Brunei?", "Asia", "Europe", "Africa"],
      ["Which world marker labels Brunei?", "A", "B", "C"],
      ["What kind of place is Brunei?", "Country", "Continent", "Ocean"],
      ["Which named river is beside Kampong Ayer?", "Brunei River", "River Esk", "River Thames"],
      ["Which is the smallest area in this study?", "Kampong Peramu neighbourhood", "All Asia", "All Brunei"],
    ], locator, ["atlas", "y2Peramu"]),
    ...choices([
      ["Which local marker labels a boat landing place?", "J", "H", "W"],
      ["Which local marker labels the river?", "R", "J", "H"],
    ], peramuPlan, ["y2Peramu"]),
  ]),
  lesson(["Read the plan's key to identify each feature.", "Walkways link homes; boats travel across river water.", "A jetty is a boat landing place."], peramuPlan, [
    ...choices([
      ["Which marker labels homes?", "H", "R", "J"],
      ["Which marker labels walkways?", "W", "H", "R"],
      ["Which feature carries a boat across this area?", "Brunei River", "A roof", "A wall"],
      ["Which feature links the shown homes?", "Walkways", "Mountain slopes", "Ice sheets"],
      ["Where can a boat land on the plan?", "Jetty", "Roof", "Tree"],
      ["What do the plan's water symbols represent?", "River water", "Every home", "A road"],
    ], peramuPlan, ["y2Peramu"]),
    sort("Sort these particular neighbourhood features.", ["Human feature", "Physical feature"], [["Home building", 0], ["Built walkway", 0], ["Jetty structure", 0], ["River water", 1]], peramuPlan, ["y2Peramu"]),
  ]),
  lesson(["Use evidence to describe this neighbourhood.", "People live, meet and travel here.", "One neighbourhood cannot represent all homes in Brunei."], limits, choices([
    ["Which journey is supported by river evidence?", "A boat crossing river water", "A car driving on water", "Walking through every river"],
    ["What can the two building photos tell us?", "Buildings have different uses", "Every building is a home", "Nobody lives here"],
    ["Which claim goes beyond our evidence?", "All Bruneians live above water", "Some shown homes are above water", "Walkways connect nearby buildings"],
    ["Why are walkways useful here?", "They connect buildings above the water", "They stop every boat journey", "They turn rivers into land"],
    ["What does one photograph leave uncertain?", "How everyone in Brunei lives", "Whether its building has walls", "Whether water is visible"],
    ["Which description stays within our study?", "Homes and routes in Kampong Peramu", "Every home in Asia", "All journeys across Brunei"],
    ["Which extra evidence could show another neighbourhood?", "Captioned views of that neighbourhood", "Only the same home photo", "A list of ocean names"],
  ], limits, ["y2Peramu", "y2PeramuPhoto", "y2HomesPhoto"])),
]);
