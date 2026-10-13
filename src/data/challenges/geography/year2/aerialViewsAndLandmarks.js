import { c, choices, lesson, sort, topic } from "./authoring.js";
import { aerial, whitbyPhoto, peramuBuilding, peramuPlan, schoolPlan, plan, pair } from "./visuals.js";
const views = pair(whitbyPhoto, aerial, ["Ground photograph: camera near ground level, looking across.", "Aerial photograph: camera above the ground, looking down.", "A plan is a drawn view from above, with symbols."], "Different views of Whitby landmarks");
views.maps.push(schoolPlan);
const church = pair(whitbyPhoto, aerial, ["St Mary's Church is on the hill in the ground photograph.", "It is the church on the left of the aerial photograph.", "The nearby abbey ruins are a different landmark."]);
const peramuViews = pair(peramuBuilding, peramuPlan, ["A walkway connects the photographed building to its neighbours.", "The local plan uses W to mark walkways.", "R marks the river shown beneath the buildings."]);
const aerialPlan = plan("Whitby nearby landmarks — arrangement sketch", [
  { code: "C", label: "St Mary's Church", symbol: "house", x: .7, y: 2 },
  { code: "A", label: "Abbey ruins", symbol: "house", x: 2.7, y: 2 },
  { code: "S", label: "Sea", symbol: "water", x: 2, y: .4 },
], ["The church is left of the abbey in this view.", "Sea lies beyond both landmarks, towards the top of this view.", "The sketch matches this photo's arrangement, not compass directions."], { north: "up", orientationKnown: false, extent: "Landmarks beside the study area; not to scale." });
const arrangement = pair(aerial, aerialPlan, ["Match the visible arrangement, not the colours.", "Church left of abbey; sea beyond both.", "The photograph looks down at an angle; the plan uses symbols."]);
export const aerialViewsAndLandmarks = topic([
  lesson(["Ground photographs look across from near ground level.", "Aerial photographs look down from above the ground.", "A plan is drawn from above using symbols."], views, [
    c("Which view is the harbour-edge photograph?", "Ground photograph", "Aerial photograph", "Drawn plan", whitbyPhoto, ["y2WhitbyPhoto"]),
    c("Which view was taken from an aircraft?", "Aerial photograph", "Ground photograph", "Drawn plan", aerial, ["y2Aerial"]),
    c("Which view uses drawn landmark symbols?", "Plan", "Ground photograph", "Aerial photograph", schoolPlan, ["example"]),
    ...choices([
      ["What makes the aerial photograph different from a plan?", "It is a camera view from above", "It is only drawn symbols", "It has no real buildings"],
      ["What makes the plan different from the photographs?", "It represents features using drawn symbols", "It was taken with a camera", "It shows only building walls"],
      ["Which camera position gives a ground photograph?", "Near ground level", "In an aircraft", "A drawn symbol key"],
      ["Is this angled aerial photograph a vertical plan?", "No, it looks down at an angle", "Yes, every photo is a plan", "Yes, it only uses symbols"],
    ], views, ["y2Aerial", "y2WhitbyPhoto", "example"]),
  ]),
  lesson(["The same landmark can appear in different views.", "Look for matching features and captions.", "Use the view's arrangement to locate them."], church, [
    ...choices([
      ["Which landmark appears in both Whitby photographs?", "St Mary's Church", "A school gate", "A river jetty"],
      ["Where is the church in the aerial photograph?", "Left of the abbey", "In the sea", "Above a school pond"],
      ["Where is the church in the ground photograph?", "On the hill behind buildings", "Below the river", "Inside a shop"],
      ["Are the church and abbey the same landmark?", "No, they are different landmarks", "Yes, exactly the same building", "Neither is visible"],
    ], church, ["y2WhitbyPhoto", "y2Aerial"]),
    ...choices([
      ["Which Peramu plan marker matches the photographed walkway?", "W", "R", "H"],
      ["Which Peramu plan marker matches the water beneath buildings?", "R", "W", "J"],
      ["Which feature is shared by the Peramu photograph and plan?", "Walkway beside river water", "A mountain glacier", "An English abbey"],
    ], peramuViews, ["y2PeramuPhoto", "y2Peramu"]),
  ]),
  lesson(["From above, we can see features and their arrangement.", "Built landmarks are human features; sea water is physical.", "The plan's key names each symbol."], arrangement, [
    ...choices([
      ["Which visible aerial feature is physical?", "Sea water", "Church building", "Abbey walls"],
      ["Which pair of aerial features is built by people?", "Church and abbey", "Sea and coast", "Clouds and water"],
      ["Which plan marker names the church?", "C", "A", "S"],
      ["Which plan marker names the sea?", "S", "A", "C"],
      ["Which plan marker names the abbey?", "A", "C", "S"],
      ["What is to the left of the abbey?", "Church", "A river jetty", "A school building"],
    ], arrangement, ["y2Aerial", "example"]),
    sort("Sort the features seen from above.", ["Human feature", "Physical feature"], [["Church walls", 0], ["Abbey ruins", 0], ["Sea water", 1]], arrangement, ["y2Aerial"]),
  ]),
  lesson(["A matching plan keeps landmarks in their relative positions.", "Match church, abbey and sea to the photograph.", "Then practise with a simple school plan."], arrangement, [
    ...choices([
      ["Which church-and-abbey plan matches the photograph?", "Church left; abbey right", "Church right; abbey left", "Church inside the sea"],
      ["Which sea position matches this view?", "Beyond the church and abbey", "Inside the church", "Between every wall"],
      ["Which plan keeps all three landmarks?", "Church, abbey and sea in shown positions", "Only the sea with no buildings", "Only the church with no water"],
      ["Which plan change would lose the matching arrangement?", "Swap church and abbey positions", "Keep church left of abbey", "Keep sea beyond both"],
    ], arrangement, ["y2Aerial", "example"]),
    ...choices([
      ["Which school arrangement matches its shown plan?", "Building left of trees", "Building right of trees", "Building below the pond"],
      ["Which pond position matches the school plan?", "Below the trees", "Above the building", "Left of the gate"],
      ["Which gate position matches the school plan?", "Below the building", "Above the trees", "Right of the pond"],
    ], schoolPlan, ["example"]),
  ]),
]);
