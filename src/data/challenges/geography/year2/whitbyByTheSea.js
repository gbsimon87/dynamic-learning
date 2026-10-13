import { choices, lesson, record, sort, topic } from "./authoring.js";
import { aerial, whitbyPhoto, whitbyPlan, ukMap } from "./visuals.js";
const locator = ukMap([["Whitby", [-.62, 54.49]], ["London", [-.12, 51.51]], ["Edinburgh", [-3.19, 55.95]]],
  ["Whitby is in England, in the United Kingdom.", "Our study is the harbour and adjoining town-centre streets.", "Whitby is where the River Esk meets the North Sea."], "Locate Whitby in the UK");
const work = record(["Whitby harbour shelters boats beside the town.", "Fishing boats use the harbour; people work with boats.", "The River Esk reaches the North Sea here.", "Nearby streets have homes and shops.", "A shop serves customers; a home is a place to live.", "These sources describe the harbour area, not all England."]);
export const whitbyByTheSea = topic([
  lesson(["Whitby is a town in England, in the UK.", "We study its harbour and nearby streets.", "Water, homes and shops are close together."], whitbyPhoto, [
    ...choices([
      ["What stands along the harbour edge in this photo?", "Buildings", "Only forest", "Only mountain peaks"],
      ["What is behind the waterfront buildings?", "A hill and church", "A desert dune", "An ice shelf"],
      ["Which human feature can we see?", "Buildings", "River water", "The hill slope"],
      ["What is visible at low tide?", "Mud and a little water", "Only deep snow", "Only a forest"],
      ["Does the photo show every English home?", "No, it shows one view", "Yes, every home", "Yes, every UK town"],
    ], whitbyPhoto, ["y2WhitbyPhoto"]),
    ...choices([
      ["Which country contains Whitby?", "England", "Wales", "Brunei"],
      ["Which small area are we studying?", "Harbour and adjoining streets", "All England", "All the UK"],
    ], locator, ["y2Whitby", "atlas"]),
  ]),
  lesson(["Locate UK, then England, then Whitby.", "The local plan shows our smaller study area.", "A key tells us what each marker means."], locator, [
    ...choices([
      ["Which UK map marker labels Whitby?", "A", "B", "C"],
      ["Which river reaches the sea at Whitby?", "River Esk", "River Thames", "Brunei River"],
      ["Which sea is beside Whitby?", "North Sea", "Irish Sea", "Indian Ocean"],
      ["Which labelled city is south of Whitby?", "London", "Edinburgh", "Neither city"],
    ], locator, ["y2Whitby", "atlas"]),
    ...choices([
      ["Which local marker shows the harbour?", "H", "S", "B"],
      ["Which local marker shows homes?", "B", "R", "H"],
      ["Which local marker shows shops?", "S", "H", "R"],
    ], whitbyPlan, ["y2Whitby"]),
  ]),
  lesson(["Look for human and physical features.", "Aerial photographs are taken from above the ground.", "The nearby church appears in two different views."], aerial, [
    ...choices([
      ["What water can we see in the aerial photo?", "Sea beyond the land", "A swimming pool only", "No water"],
      ["Which aerial feature was built by people?", "Abbey ruins", "Sea water", "The coast itself"],
      ["Which nearby building appears in both photo views?", "St Mary's Church", "A factory chimney", "A school gate"],
      ["Where was the aerial camera?", "Above the ground", "Under the sea", "Inside a shop"],
    ], { ...aerial, maps: [whitbyPhoto], lines: [...aerial.lines, "St Mary's Church appears in both photographs."] }, ["y2Aerial", "y2WhitbyPhoto"]),
    ...choices([
      ["Which local feature is flowing water?", "River Esk", "Shops", "Homes"],
      ["Which local feature is a place to live?", "Homes", "Harbour water", "River Esk"],
    ], whitbyPlan, ["y2Whitby"]),
    sort("Sort the harbour area's particular features.", ["Human feature", "Physical feature"], [["Home building", 0], ["Shop building", 0], ["River water", 1], ["Sea water", 1]], whitbyPlan, ["y2Whitby"]),
  ]),
  lesson(["Water and work can be connected.", "Fishing boats use Whitby's harbour.", "Explain using evidence from our small study area."], work, choices([
    ["Why is a harbour useful for boats?", "It provides shelter beside the town", "It removes every wave everywhere", "It turns water into roads"],
    ["Which work connects directly with harbour water?", "Work with fishing boats", "Growing mountain snow", "Making every home float"],
    ["Which statement matches the source?", "Fishing boats use Whitby harbour", "Nobody works beside water", "All English people go fishing"],
    ["What do the nearby shops do?", "Serve customers", "Make the River Esk flow", "Create the North Sea"],
    ["Which pair links a human and physical feature?", "Boats using harbour water", "Two nearby homes", "Two shop buildings"],
    ["What is a home used for?", "Living in", "Sheltering every boat", "Joining every river"],
    ["Which limit should our explanation include?", "It describes this harbour area", "It describes every English job", "It proves everyone travels by boat"],
  ], work, ["y2Whitby"])),
]);
