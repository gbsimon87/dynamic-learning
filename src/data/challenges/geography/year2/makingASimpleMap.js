import { choices, lesson, record, ordered, topic } from "./authoring.js";
import { schoolPlan } from "./visuals.js";
import { keySort, KEY_SETS, symbolPlan } from "./symbolsAndMapKeys.js";
import { MAP_ACTIVITY } from "./activities.js";
const landmarks = { ...schoolPlan, lines: [...schoolPlan.lines, "Choose visible landmarks such as the building, gate, trees and pond.", "Clouds move; a hidden building cannot be placed from this view."] };
landmarks.alt += " Choose visible landmarks. Clouds move; hidden buildings cannot be placed from this view.";
const routes = record(["Practice school plan: gate below building; trees right of building.", "Pond below trees. The shown path links gate, building and trees.", "Journey: start at gate, go north to building, then east to trees.", "The map needs landmark positions, a key and a start.", "This is supported digital practice, not your own original drawing."]);
routes.maps = [schoolPlan];
export const makingASimpleMap = topic([
  lesson(["Choose useful landmarks you can see.", "A building, gate or pond can help someone navigate.", "Only map the small area shown."], landmarks, choices([
    ["Which landmark can mark where the journey begins?", "Gate", "A moving cloud", "An unseen shop"],
    ["Which shown water feature is a useful landmark?", "Pond", "An unseen ocean", "A moving cloud"],
    ["Which shown building belongs on this map?", "School building", "An unseen factory", "A home in another town"],
    ["Which shown natural feature can help identify a place?", "Trees", "An unseen mountain", "A cloud that has moved"],
    ["Why choose visible landmarks?", "We can place them using evidence", "They reveal every home address", "They predict every day's weather"],
    ["Which pair belongs on this practice-area map?", "Gate and building", "Unseen shop and mountain", "Every building in the country"],
    ["Which feature should we leave out without more evidence?", "A hidden building", "The visible pond", "The visible trees"],
  ], landmarks, ["example"])),
  lesson(["A plan keeps landmarks in their relative positions.", "Look from above: left, right, above and below.", "Check the arrangement before choosing."], schoolPlan, choices([
    ["Which building-and-trees plan matches?", "Building left; trees right", "Building right; trees left", "Both below the pond"],
    ["Which gate-and-building plan matches?", "Gate below building", "Gate above building", "Gate right of trees"],
    ["Which pond-and-trees plan matches?", "Pond below trees", "Pond above trees", "Pond left of building"],
    ["Which gate-and-pond plan matches?", "Gate left; pond right", "Gate right; pond left", "Both above trees"],
    ["Which pair is across the top of the plan?", "Building and trees", "Gate and pond", "Pond and building"],
    ["Which pair is across the bottom of the plan?", "Gate and pond", "Building and trees", "Trees and gate"],
    ["Which full plan description matches?", "Building above gate; trees above pond", "Gate above building; pond above trees", "Building and gate both right of pond"],
  ], schoolPlan, ["example"])),
  lesson(["Choose a clear symbol for each feature.", "Match symbols and meanings to construct a key.", "Use the same key throughout your map."], symbolPlan, KEY_SETS.map((set, i) => keySort(set, i, { ...symbolPlan, maps: [] }))),
  lesson(["A usable map needs landmarks, a key and a route.", "Name the start. Give directions in order.", "Try drawing your own map with a grown-up."], routes, [
    ...choices([
      ["Which route reaches trees from the gate?", "North to building, then east", "East to pond, then south", "South, then west"],
      ["Which journey starts in the right place?", "Begin at the gate", "Begin at an unseen shop", "Begin outside the shown area"],
      ["Which map would help someone follow this route?", "Landmarks in position with a matching key", "Unlabelled shapes in random places", "Only a weather symbol"],
      ["Which first direction takes gate to building?", "North", "South", "East"],
      ["Which next direction takes building to trees?", "East", "West", "South"],
      ["What remains a grown-up activity after digital practice?", "Drawing an original map on paper", "Pretending the app drew your own map", "Marking outdoor work done automatically"],
    ], routes, ["example"]),
    ordered("Order the instructions for this school journey.", ["Start at the gate", "Go north to the building", "Go east to the trees"], routes, ["example"], "Find the start. Use the path and north arrow."),
  ]),
], MAP_ACTIVITY);
