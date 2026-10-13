import { choices, lesson, ordered, record, topic, visual } from "./authoring.js";
import { plan } from "./visuals.js";
import { LOCAL_ACTIVITY } from "./activities.js";
export const LOCAL_ROWS = [["Trees", 4, 2], ["Buildings", 2, 3], ["Paths", 1, 1]];
const route = plan("Familiar-route practice map — example area", [
  { code: "A", label: "Start gate / Point A", symbol: "gate", x: 1, y: 3 },
  { code: "T", label: "Tree landmark", symbol: "tree", x: 1, y: 1 },
  { code: "B", label: "Shop / Point B", symbol: "shop", x: 3, y: 1 },
], ["Begin at A. Go north to T, then east to B.", "A grown-up chooses a suitable familiar route.", "This invented plan is not a map of your local area."], { paths: [[1, 3, 1, 1], [1, 1, 3, 1]] });
const question = record(["Observe from suitable places with a grown-up.", "Ask: how many trees and buildings can we see here?", "Use the same feature categories at both observation points.", "Compare similar viewing areas at both points.", "Do not guess what is inside buildings or go alone.", "A window view with a grown-up is another option.", "Record unsure when a feature's use is unclear."]);
const points = visual("table", "Two observation points — example data", "Example counts: Point A trees 4, buildings 2, paths 1. Point B trees 2, buildings 3, paths 1. Similar viewing areas and the same categories were used.",
  ["Example observation data, October 2026. Not your local area.", "The same categories and similar viewing areas were used.", "Only these two points were observed."],
  { caption: "Example counts at two points, October 2026", columns: ["Feature", "Point A", "Point B"], rows: LOCAL_ROWS, maps: [route] });
const findings = { ...points, lines: [...points.lines, "Map key: two posts = gate; circle with trunk = trees.", "Diamond = shop. Dashed line = route.", "Only two small viewing areas were observed, not a whole town."] };
findings.alt += " Key: two posts gate; circle with trunk trees; diamond shop; dashed line route. Only two small viewing areas were observed.";
export const exploringOurLocalArea = topic([
  lesson(["Choose a question you can answer by looking.", "Explore familiar places with a grown-up.", "Record only visible features in your observation area."], question, choices([
    ["Which local question can we answer by looking?", "How many trees can we see?", "What is inside every locked building?", "What happens here next year?"],
    ["Which second local question is observable?", "Which buildings are visible here?", "Who lives in every house?", "Where does every resident travel?"],
    ["Who chooses a suitable familiar route?", "A grown-up with you", "A child going alone", "A random address online"],
    ["What makes the two observations easier to compare?", "Same categories and similar viewing areas", "Different categories with no record", "Guessing hidden features"],
    ["Which is a useful accessible alternative?", "A window view with a grown-up", "Going alone beside water", "Uploading your home location"],
    ["Which feature belongs in a visible-feature tally?", "A tree we can see", "A guessed hidden room", "An unknown distant building"],
    ["What should we do when a feature's use is unclear?", "Record unsure rather than guessing", "Invent who lives there", "Assume all buildings are shops"],
  ], question, ["example", "y2Curriculum"])),
  lesson(["Follow the practice route from its named start.", "Use the north arrow and labelled landmarks.", "This map represents an invented example area."], route, [
    ...choices([
      ["Which marker starts the route?", "A", "B", "T"],
      ["Which direction takes A to T?", "North", "South", "East"],
      ["Which direction takes T to B?", "East", "West", "South"],
      ["Which landmark ends the route?", "Shop", "Start gate", "Tree"],
      ["Which landmark comes between start and finish?", "Tree", "Shop", "A pond"],
      ["Which route matches the displayed path?", "Gate, tree, shop", "Gate, shop, tree", "Shop, gate, tree"],
    ], route, ["example"]),
    ordered("Order the three landmarks along the route.", ["Start gate", "Tree landmark", "Shop"], route, ["example"], "Begin at A and trace the dashed line."),
  ]),
  lesson(["Compare the same feature row at both points.", "Counts can differ, or they can be equal.", "These observations cover only two small viewing areas."], points, choices([
    ["Which point recorded more trees?", "Point A", "Point B", "Both equal"],
    ["Which point recorded more buildings?", "Point B", "Point A", "Both equal"],
    ["Which feature count is equal at both points?", "Paths", "Trees", "Buildings"],
    ["How many trees were recorded at Point A?", "4", "2", "3"],
    ["How many buildings were recorded at Point B?", "3", "2", "4"],
    ["How many more trees were at A than B?", "2", "1", "4"],
    ["Which statement fits these two points?", "A has more trees; B more buildings", "B has more trees; A more buildings", "Every count is the same"],
  ], points, ["example"])),
  lesson(["Use a map and key to present your findings.", "Support your account with recorded observations.", "Two points cannot describe every part of a town."], findings, choices([
    ["Which short account matches the record?", "A had 4 trees; B had 2", "Both had 4 trees", "B had 4 trees; A had 2"],
    ["Which second finding matches the record?", "B had 3 buildings; A had 2", "A had 3 buildings; B had 2", "Both had no buildings"],
    ["Which key matches the shown shop?", "Diamond means shop", "Wavy lines mean shop", "Tree circle means shop"],
    ["Which map helps someone follow the observed route?", "Gate, tree and shop with a key", "Only unlabelled colours", "Only tomorrow's weather"],
    ["Which limit belongs in our account?", "Only two viewing areas were observed", "Every street in town was observed", "Every resident's journey was recorded"],
    ["What could improve our knowledge of the local area?", "Observe another point with a grown-up", "Guess every unseen street", "Assume all points are identical"],
    ["Which account keeps practice and real fieldwork separate?", "Example counts prepare us for observing", "Finishing this quiz proves a real walk", "The app collected our home location"],
  ], findings, ["example"])),
], LOCAL_ACTIVITY);
