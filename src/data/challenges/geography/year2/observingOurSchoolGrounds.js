import { choices, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { schoolPlan } from "./visuals.js";
import { GROUNDS_ACTIVITY } from "./activities.js";
export const GROUNDS_ROWS = [["Trees", 3, "| | |"], ["Buildings", 1, "|"], ["Gates", 2, "| |"], ["Ponds", 1, "|"]];
const observations = visual("table", "Practice school observation sheet", "Example school grounds: trees 3; buildings 1; gates 2; ponds 1. The plan marks groups or landmarks, not every individual feature.",
  ["Example data, October 2026. These are not your school grounds.", "The plan marks landmark groups; the table counts individual features."],
  { caption: "Example observation sheet — October 2026", columns: ["Feature", "Count", "Tally"], rows: GROUNDS_ROWS, maps: [schoolPlan] });
const observable = record(["We can observe buildings, trees, gates, paths and water.", "Built walls and gates are human features.", "Tree growth and pond water are physical features.", "A tree may be planted by people; name the particular feature.", "We cannot see tomorrow's weather or inside hidden rooms.", "A grown-up helps choose a suitable observation place."]);
const process = record(["First ask which features we can see in familiar grounds.", "Observe from a suitable place with a grown-up.", "Record selected features with tallies on paper.", "Sketch a map with landmarks and a matching key.", "Describe the observed area and what you could not see.", "Digital practice does not certify a real outdoor observation."]);
export const observingOurSchoolGrounds = topic([
  lesson(["Observation means looking carefully at what is visible.", "Notice human and physical features with a grown-up.", "Our screen uses an invented practice school."], observable, choices([
    ["Which feature can we observe from the grounds?", "Visible trees", "Inside a hidden room", "Tomorrow's rainfall"],
    ["Which visible feature was built by people?", "Gate structure", "Pond water", "Tree growth"],
    ["Which particular feature is physical?", "Pond water", "A built wall", "A gate structure"],
    ["Which question can looking at the grounds answer?", "Which features can we see?", "What is inside every hidden room?", "What will rain next year?"],
    ["Who helps choose a suitable observation place?", "A grown-up", "A guess about another town", "Only an unseen map"],
    ["Which feature should be recorded as unseen?", "Inside a hidden room", "Visible trees", "A visible gate"],
    ["What should our observation describe?", "The area we can actually see", "Every school in the country", "All future weather"],
  ], observable, ["example", "y2Curriculum"])),
  lesson(["Read the practice observation sheet and plan together.", "The table counts individual features.", "The plan marks landmarks or groups of features."], observations, choices([
    ["How many trees were recorded?", "3", "1", "2"],
    ["How many buildings were recorded?", "1", "2", "3"],
    ["How many gates were recorded?", "2", "1", "3"],
    ["How many ponds were recorded?", "1", "2", "3"],
    ["Which feature has the greatest recorded count?", "Trees", "Gates", "Buildings"],
    ["Does one tree symbol mean only one individual tree?", "No, the plan can mark a group", "Yes, always exactly one", "It means all trees in England"],
    ["Which features have the same recorded count?", "Buildings and ponds", "Trees and gates", "Trees and ponds"],
  ], observations, ["example"])),
  lesson(["Each tally mark counts one observed feature.", "A map key explains the landmark symbols.", "Keep counting and symbol meanings consistent."], observations, [
    ...choices([
      ["Which tally matches the three recorded trees?", "| | |", "| |", "|"],
      ["Which tally matches the two recorded gates?", "| |", "|", "| | |"],
      ["Which tally matches the one recorded building?", "|", "| |", "| | |"],
      ["Which tally matches the one recorded pond?", "|", "| | |", "| |"],
      ["Which symbol should mean water in the key?", "Wavy lines", "Roofed square", "Shop diamond"],
      ["Which rule makes feature counts consistent?", "One tally mark per observed feature", "Change what one mark means each time", "Count unseen features by guessing"],
    ], observations, ["example"]),
    sort("Match each practice symbol to its feature.", ["Building", "Trees", "Pond"], [["Roofed square", 0], ["Circle with trunk", 1], ["Wavy lines", 2]], observations, ["example"]),
  ]),
  lesson(["Ask a question, observe, record, map and describe.", "Use a grown-up's chosen familiar place.", "Keep records on paper; digital completion is separate."], process, [
    ...choices([
      ["What should happen before recording what is there?", "Observe the visible features", "Guess unseen features", "Mark outdoor work done online"],
      ["What should a sketch map include?", "Landmarks and a matching key", "Only an unexplained colour", "An invented home address"],
      ["What should the final description include?", "What we saw and could not see", "Every school everywhere", "Only guesses about hidden rooms"],
      ["Does completing this run prove outdoor fieldwork happened?", "No, it completes digital practice", "Yes, automatically", "Yes, it collected your location"],
    ], process, ["example"]),
    ordered("Order observe, record, map and describe.", ["Observe features", "Record tallies", "Sketch map and key", "Describe findings"], process, ["example"], "Look first. Describe your findings last."),
    ordered("Order the first three fieldwork steps.", ["Ask what we can see", "Observe with a grown-up", "Record visible features"], process, ["example"], "Choose the question before collecting evidence."),
    ordered("Order the steps after observing.", ["Record observations", "Map landmarks with a key", "Describe the mapped area"], process, ["example"], "Use records to make the map, then describe it."),
  ]),
], GROUNDS_ACTIVITY);
