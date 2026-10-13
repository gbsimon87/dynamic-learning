import { c, lesson, record, sort, topic, visual } from "./authoring.js";
import { map } from "./maps.js";
const features = record(["Mountains and hills are raised land; valleys lie between slopes.", "A coast is where land meets the sea.", "Rivers carry water across land.", "Homes form settlements; fields can be used for farming.", "Woodland contains trees; parks can be used for leisure."]);
const uk = map("uk", ["Lake District","Pennines","River Thames","Whitby"], ["The Lake District has mountains and lakes.", "The Pennines are uplands through northern England.", "The River Thames flows through southern England.", "Whitby is on the North Yorkshire coast."]);
const plan = visual("flow", "Two local plans — example data, October 2026", "Site A: homes, shop, park. Site B: grazing field, woodland, walking path.", ["Site A shows homes, a shop and a park.", "Site B shows a grazing field, woodland and a walking path."], { steps: ["Site A: homes / shop / park", "Site B: field / woods / walking path"] });
const change = record(["Example maps show the same practice site in 2000 and 2020.", "In 2000, plot P held a farm field.", "In 2020, plot P held houses and a road.", "Plot Q remained woodland on both maps.", "The maps show change, but do not explain who decided it."], "Same site, two dates — example data");
export const ukLandscapesAndLandUse = topic([
  lesson(["Physical features include rivers, hills and coasts.", "Land use describes what people do on land.", "A place can have physical and human features."], features, [
    c("What is a coast?", "Where land meets the sea", "Raised land inland", "A group of homes", features, ["atlas"]),
    c("What is a valley?", "Low land between slopes", "The top of every hill", "A town centre", features, ["mountains"]),
    c("Which use matches a grazing field?", "Farming", "A railway station", "A swimming pool", features, ["example"]),
    c("Which feature carries water across land?", "River", "Woodland", "Hill", features, ["water"]),
    c("Which use matches a group of homes?", "Settlement", "Open sea", "Mountain peak", features, ["example"]),
    c("Which land cover contains trees?", "Woodland", "River", "Coast", features, ["example"]),
    sort("Sort these particular features.", ["Physical feature", "Human use"], [["River water",0],["Mountain slope",0],["Farm field",1],["Built homes",1]], features, ["example"]),
  ]),
  lesson(["Find each marker in the map key.", "The map shows selected English landscapes.", "Use the north arrow to compare locations."], uk, [
    c("Which marked area has lakes and mountains?", "Lake District", "River Thames", "Whitby", uk, ["park"]),
    c("Which marked feature is a river?", "River Thames", "Pennines", "Lake District", uk, ["atlas"]),
    c("Which marked town lies on the North Yorkshire coast?", "Whitby", "Lake District", "Pennines", uk, ["atlas"]),
    c("Which river marker is in southern England?", "River Thames", "Pennines", "Whitby", uk, ["atlas"]),
    c("Which marked uplands run through northern England?", "Pennines", "River Thames", "Whitby", uk, ["atlas"]),
    c("Which marker is west of Whitby?", "Lake District", "River Thames", "Whitby", uk, ["atlas"]),
    c("Which pair of features is shown in northern England?", "Lake District and Pennines", "Thames and London", "Thames and Channel", uk, ["atlas"]),
  ]),
  lesson(["These are example plans, not observations of your home.", "Compare the same land-use categories at both sites.", "Paths and parks can support leisure."], plan, [
    c("Which site shows homes?", "Site A", "Site B", "Neither site", plan, ["example"]),
    c("Which site shows a grazing field?", "Site B", "Site A", "Both sites", plan, ["example"]),
    c("Which use is shown by Site A's park?", "Leisure", "Mining", "Sea transport", plan, ["example"]),
    c("Which use is shown by Site B's walking path?", "Leisure", "Cargo port", "City centre homes", plan, ["example"]),
    c("Which site shows woodland?", "Site B", "Site A", "Neither site", plan, ["example"]),
    c("Which activity is supported at both sites?", "Leisure", "Cargo shipping", "Grazing sheep", plan, ["example"]),
    sort("Sort the plan features by site.", ["Site A", "Site B"], [["Shop",0],["Park",0],["Woodland",1],["Grazing field",1]], plan, ["example"]),
  ]),
  lesson(["Compare maps of the same place from different dates.", "Maps can show a change in land use.", "They may not tell us why it changed."], change, [
    c("What changed at plot P?", "Field became houses and a road", "Woodland became a lake", "Houses became a glacier", change, ["example"]),
    c("What use did plot P have in 2000?", "Farming", "Housing", "Airport", change, ["example"]),
    c("What use did plot P have in 2020?", "Settlement and transport", "Only farming", "Open sea", change, ["example"]),
    c("Which plot kept the same land cover?", "Plot Q", "Plot P", "Both changed", change, ["example"]),
    c("Which evidence would help explain the decision?", "Dated planning records", "Only a hill height", "A map of another country", change, ["example"]),
    c("Which conclusion matches both dates?", "Housing replaced one field", "All woodland vanished", "All farming stopped everywhere", change, ["example"]),
    c("What do these maps leave uncertain?", "Who decided the change", "Whether P changed", "Whether Q stayed woodland", change, ["example"]),
  ]),
]);
