import { choices, lesson, record, sort, topic } from "./authoring.js";
import { ukMap } from "./visuals.js";
const countries = ukMap([["England", [-1.5, 52.5]], ["Scotland", [-4, 57]], ["Wales", [-3.8, 52]], ["Northern Ireland", [-6.5, 54.7]]], ["UK countries: England, Scotland, Wales and Northern Ireland.", "Capitals: London, Edinburgh, Cardiff and Belfast, in that order.", "Great Britain is England, Scotland and Wales.", "The Republic of Ireland is not part of the UK."]);
const waters = ukMap([["North Sea", [1.8, 55]], ["Irish Sea", [-4.8, 53.5]], ["English Channel", [-1.5, 50]], ["Atlantic Ocean", [-8, 56]]], ["The North Sea is east of Great Britain.", "The Irish Sea lies between Great Britain and Ireland.", "The English Channel lies south of England.", "The Atlantic is an ocean west of the UK."]);
const landscapes = ukMap([["Whitby coast", [-.62, 54.49]], ["Scafell Pike mountain", [-3.21, 54.45]], ["River Thames", [-.5, 51.45]], ["London city", [-.12, 51.51]]], ["Whitby is beside the sea, on the coast.", "Scafell Pike is a mountain in England.", "The River Thames flows through London.", "London is a city with many buildings."], "Selected UK landscapes");
const vocabulary = record(["Mountain and hill: raised land. Valley: lower land between slopes.", "Forest: a large area of trees. River: flowing water.", "Coast: land beside the sea.", "Homes, shops, offices and factories are built by people.", "A farm grows food or keeps animals.", "A port handles ships; a harbour shelters boats."]);
const examples = record(["Example UK views: Scotland has a mountain and homes.", "Wales has a valley, forest and a farm.", "England has a river, city, factory and office.", "Northern Ireland has a coast, port and harbour.", "These examples do not show every feature in each country.", "A country can have many different landscapes and workplaces."], "Captioned UK examples — teaching data");
export const ukPlacesAndLandscapes = topic([
  lesson(["The UK has four countries and four capital cities.", "Great Britain leaves out Northern Ireland.", "An ocean and seas lie around the UK."], countries, [
    ...choices([
      ["Which capital belongs to England?", "London", "Cardiff", "Belfast"],
      ["Which capital belongs to Scotland?", "Edinburgh", "London", "Cardiff"],
      ["Which capital belongs to Wales?", "Cardiff", "Edinburgh", "Belfast"],
      ["Which capital belongs to Northern Ireland?", "Belfast", "London", "Cardiff"],
      ["Which UK country is outside Great Britain?", "Northern Ireland", "Scotland", "Wales"],
    ], countries, ["atlas", "y2Curriculum"]),
    ...choices([
      ["Which named water is an ocean?", "Atlantic Ocean", "North Sea", "Irish Sea"],
      ["Which named water is south of England?", "English Channel", "Irish Sea", "North Sea"],
      ["Which sea lies east of Great Britain?", "North Sea", "Irish Sea", "English Channel"],
      ["Which sea lies between Great Britain and Ireland?", "Irish Sea", "North Sea", "English Channel"],
    ], waters, ["atlas"]),
  ]),
  lesson(["A coast is land beside the sea.", "The map labels selected UK features.", "Use the key to find each marker."], landscapes, choices([
    ["Which marker labels a coast?", "A", "B", "C"],
    ["Which marker labels a mountain?", "B", "C", "D"],
    ["Which marker labels a river?", "C", "A", "B"],
    ["Which marker labels a city?", "D", "A", "B"],
    ["Which place is beside the sea?", "Whitby", "Scafell Pike", "London"],
    ["Which river flows through the labelled city?", "River Thames", "Scafell Pike", "Whitby coast"],
    ["Which named feature is raised land?", "Scafell Pike", "River Thames", "London city"],
  ], landscapes, ["atlas", "park", "y2Whitby"])),
  lesson(["Physical features include rivers, hills, forests and valleys.", "Human features include homes, farms, factories and offices.", "Name the particular feature you can see."], vocabulary, [
    ...choices([
      ["Which feature is lower land between slopes?", "Valley", "Office", "Mountain"],
      ["Which feature is a large area of trees?", "Forest", "Factory", "Harbour"],
      ["Which workplace grows food or keeps animals?", "Farm", "Office", "Port"],
      ["Which place handles arriving ships?", "Port", "Hill", "Forest"],
      ["Which feature shelters boats?", "Harbour", "Valley", "Office"],
      ["Which pair was built by people?", "Factory and office", "Hill and river", "Coast and mountain"],
    ], vocabulary, ["y2Curriculum"]),
    sort("Sort these particular features.", ["Physical feature", "Human feature"], [["River water", 0], ["Mountain slope", 0], ["Office building", 1], ["Farm building", 1]], vocabulary, ["y2Curriculum"]),
  ]),
  lesson(["Use captions to describe the shown examples.", "One example cannot describe a whole country.", "Different countries can share the same features."], examples, choices([
    ["Which Scotland description matches its example?", "Mountain and homes", "Only water", "No buildings"],
    ["Which Wales description matches its example?", "Valley, forest and farm", "Only offices", "No trees"],
    ["Which England description matches its example?", "River, city and workplaces", "Only mountains", "No water"],
    ["Which Northern Ireland description matches its example?", "Coast, port and harbour", "Only forest", "No boats"],
    ["Does this evidence show every English landscape?", "No, only selected examples", "Yes, every landscape", "Yes, every building"],
    ["What could another Welsh view show?", "Other features as well", "Exactly the same features always", "No human features anywhere"],
    ["Which claim stays within the evidence?", "A harbour is shown in Northern Ireland", "Only Northern Ireland has harbours", "All UK homes are by harbours"],
  ], examples, ["example"])),
]);
