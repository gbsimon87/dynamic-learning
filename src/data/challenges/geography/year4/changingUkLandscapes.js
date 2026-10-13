import { c, lesson, sort, ordered, topic, visual } from "./authoring.js";

// Changing UK Landscapes: paired example grids of the same bounded area. All grids are example data.
const EX = ["example"];

const SCENARIOS = {
  coast: {
    name: "Coastal village", from: 1975, to: 2025, rows: 4,
    key: [["F", "Farmland"], ["H", "Homes"], ["T", "Trees"], ["B", "Beach"], ["S", "Sea"], ["P", "Park"]],
    before: ["FFHTBS", "FFHFBS", "FFFFBS", "TTFFBS"],
    after: ["FHHTBS", "FHHPBS", "FFFFSS", "TTTFSS"],
    notes: ["Example note: planning records show new homes were approved in the village.", "Example note: coast measurements show waves wearing the beach back."],
  },
  river: {
    name: "River town", from: 1985, to: 2025, rows: 4,
    key: [["F", "Farmland"], ["H", "Homes"], ["W", "River"], ["I", "Industry"], ["T", "Trees"], ["M", "Meadow"]],
    before: ["FFWFFF", "FHWFFF", "FHWMFT", "FFWMTT"],
    after: ["FFWFFF", "FHWHFF", "FHMWFT", "FFWITT"],
    notes: ["Example note: a council record approves new homes and a small factory.", "Example note: river monitoring shows the channel moved east with no building work."],
  },
  marsh: {
    name: "Estuary village", from: 1995, to: 2025, rows: 4,
    key: [["F", "Farmland"], ["H", "Homes"], ["T", "Trees"], ["S", "Sea"], ["M", "Marsh"]],
    before: ["FFFSS", "FHFSS", "FHFSS", "FFTSS"],
    after: ["FFHMS", "FHHMS", "FHFSS", "FTTSS"],
    notes: ["Example note: a council record approves more homes.", "Example note: surveys show mud building up beside the shore."],
  },
};
const labelOf = (sc, code) => sc.key.find(([k]) => k === code)[1];
const SIZE = (sc) => sc.before[0].length;
const SQUARE_LINES = (sc) => [`Example data: both grids show the same ${SIZE(sc)} by ${sc.rows} square area at the same scale.`, "Each square is about 100 metres across. North is at the top.", "Columns count from the left. Rows count from the top.", "The key letters are the same in both grids."];
const gridAlt = (sc, rows, year) => `${year}, example data. Rows from the top, each listed from the left. ${rows.map((r, i) => `Row ${i + 1}: ${[...r].map((ch) => labelOf(sc, ch)).join(", ")}.`).join(" ")}`;
const grid = (sc, rows, year) => visual("landuse", `${year} (example data)`, gridAlt(sc, rows, year), [`${year} grid, example data.`], { cells: rows, key: sc.key.map(([code, label]) => ({ code, label })) });
const pair = (sc, extra = []) => {
  const a = grid(sc, sc.before, sc.from), b = grid(sc, sc.after, sc.to);
  return visual("record", `${sc.name}: ${sc.from} and ${sc.to}, example data`, `Two example grids of the same area. ${a.alt} ${b.alt}`, [...SQUARE_LINES(sc), ...extra], { maps: [a, b] });
};
const changes = (sc) => {
  const out = [];
  sc.before.forEach((row, y) => [...row].forEach((ch, x) => { const after = sc.after[y][x]; if (ch !== after) out.push({ col: x + 1, row: y + 1, from: ch, to: after }); }));
  return out;
};
const sq = (col, row) => `Column ${col}, row ${row}`;
export const SCENARIO_DATA = SCENARIOS;
export const scenarioChanges = changes;

const coast = SCENARIOS.coast, river = SCENARIOS.river, marsh = SCENARIOS.marsh;
const coastPair = pair(coast), riverPair = pair(river), marshPair = pair(marsh);
const coastNotes = pair(coast, coast.notes), riverNotes = pair(river, river.notes), marshNotes = pair(marsh, marsh.notes);
const changeSq = (sc, from, to) => changes(sc).filter((ch) => ch.from === from && ch.to === to);
const only = (sc, from, to) => { const m = changeSq(sc, from, to); if (m.length !== 1) throw new Error(`${sc.name}: expected one ${from} to ${to}`); return m[0]; };
const countOf = (sc, from, to) => changeSq(sc, from, to).length;

const whatIs = (sc, p, col, row, which) => {
  const code = (which === "before" ? sc.before : sc.after)[row - 1][col - 1];
  const other = (which === "before" ? sc.after : sc.before)[row - 1][col - 1];
  const wrongs = sc.key.map(([k]) => k).filter((k) => k !== code);
  const second = wrongs.find((k) => k !== other) ?? wrongs[0];
  const first = other !== code ? other : wrongs[0];
  return c(`What is in column ${col}, row ${row} in ${which === "before" ? sc.from : sc.to}?`, labelOf(sc, code), labelOf(sc, first), labelOf(sc, second), p, EX, "Count columns from the left and rows from the top.");
};
const whichSquare = (sc, p, from, to, wrongFrom) => {
  const target = only(sc, from, to);
  const wrongs = changes(sc).filter((ch) => !(ch.from === from && ch.to === to)).slice(0, 2);
  return c(`Which square changed from ${labelOf(sc, from)} to ${labelOf(sc, to)}${wrongFrom ?? ""}?`, sq(target.col, target.row), sq(wrongs[0].col, wrongs[0].row), sq(wrongs[1].col, wrongs[1].row), p, EX, "Compare the same square in the two grids.");
};
const OFFSETS = [[-1, 1], [1, 2], [-2, -1], [-1, 2], [1, 3]];
const countQ = (prompt, sc, p, n, k = 0) => c(prompt, n, ...OFFSETS[k % OFFSETS.length].map((d) => (n + d < 0 ? n + 3 : n + d)), p, EX, "Compare the grids square by square.");

const unchangedSquare = (sc, p) => {
  const same = []; sc.before.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === sc.after[y][x]) same.push({ col: x + 1, row: y + 1 }); }));
  const ch = changes(sc);
  return c(`Which square is the same in ${sc.from} and ${sc.to}?`, sq(same[0].col, same[0].row), sq(ch[0].col, ch[0].row), sq(ch[1].col, ch[1].row), p, EX, "Find a square with the same letter in both grids.");
};

const observeSort = (sc, p, cards) => sort(`Sort each ${sc.name.toLowerCase()} statement: observation or explanation.`, ["Observation (shown)", "Possible explanation (not shown)"], cards, p, EX, "Observations can be seen in the grids. Explanations give a reason.");

const enquiry = visual("flow", "Reading dated grids", "Check the dates and the key. Spot the changed squares. Describe what changed. Look for evidence of why it changed.", ["Compare the same area at two dates.", "A grid alone shows what changed, not why."], { steps: ["Check dates and key", "Spot changed squares", "Describe what changed", "Look for evidence of why"] });

export const changingUkLandscapes = topic([
  lesson(["Both grids show the same area at the same scale.", "Check the dates and the key letters.", "Then compare them fairly."], coastPair, [
    c("Which grid shows the later date?", "The 2025 grid", "The 1975 grid", "They show the same date", coastPair, EX),
    c("What does the letter B stand for in the coastal key?", "Beach", "Barn", "Bay", coastPair, EX),
    c(`How many years separate the two ${river.name.toLowerCase()} grids?`, river.to - river.from, 30, 50, riverPair, EX),
    c("What does the letter M stand for in the estuary key?", "Marsh", "Meadow", "Moor", marshPair, EX),
    c("Why do both grids cover the same area at the same scale?", "So changes can be compared fairly", "So no square can change", "So the dates match", coastPair, EX),
    c("What must stay the same for a fair comparison?", "The area shown and the key", "The number of homes", "The colour of the sea", coastPair, EX),
    c("How big is each square in the grids?", "About 100 metres", "About 1 kilometre", "About 10 metres", coastPair, EX),
    c("Which direction is at the top of each grid?", "North", "South", "East", coastPair, EX),
    sort("Sort each feature by whether it stays the same.", ["Stays the same", "May change"], [["Area covered", 0], ["Scale of squares", 0], ["Key letters", 0], ["Land use in a square", 1], ["Number of Homes squares", 1]], coastPair, EX),
  ]),
  lesson(["Find a square by its column and row.", "Compare the same square at both dates.", "Some squares change and some stay the same."], coastPair, [
    whatIs(coast, coastPair, 2, 1, "after"),
    whatIs(river, riverPair, 3, 3, "before"),
    whatIs(marsh, marshPair, 4, 1, "before"),
    countQ("How many squares changed in the coastal village?", coast, coastPair, changes(coast).length, 0),
    countQ("How many squares changed in the river town?", river, riverPair, changes(river).length, 1),
    whichSquare(coast, coastPair, "F", "P"),
    whichSquare(river, riverPair, "M", "I"),
    whichSquare(marsh, marshPair, "F", "T"),
    countQ("How many coastal Farmland squares became Homes?", coast, coastPair, countOf(coast, "F", "H"), 2),
    unchangedSquare(marsh, marshPair),
  ]),
  lesson(["An observation can be seen in the grids.", "An explanation gives a possible reason.", "The grids alone do not show why."], coastNotes, [
    observeSort(coast, coastNotes, [["Two Farmland squares became Homes", 0], ["More families may have wanted homes", 1], ["The beach is smaller in 2025", 0], ["Waves may have worn the beach away", 1]]),
    observeSort(river, riverNotes, [["Industry appears in column 4, row 4", 0], ["A business may have wanted land by the river", 1], ["In row 3, the river is one square further east", 0], ["Moving water may have shifted the channel", 1]]),
    observeSort(marsh, marshNotes, [["Two Sea squares became Marsh", 0], ["Mud may have built up beside the shore", 1], ["Two Farmland squares became Homes", 0], ["Families may have wanted to live nearby", 1]]),
    c("Which statement is an observation?", `${sq(only(marsh, "F", "T").col, only(marsh, "F", "T").row)} changed from Farmland to Trees`, "People wanted a quieter place to live", "A council chose to make a new plan", marshPair, EX),
    c("Which statement is a possible explanation?", "More families may have wanted homes", "Two squares changed from Farmland to Homes", "The beach has fewer squares in 2025", coastPair, EX),
    c("Can the grids alone prove why Farmland became Homes?", "No, other evidence is needed", "Yes, the grids explain the reason", "Yes, the key states the reason", coastPair, EX),
    c("Which example note gives evidence of why the coastal beach changed?", "Coast measurements show waves wearing the beach", "Planning records show new homes were approved", "The key shows what the letter B means", coastNotes, EX),
    c("Which example note gives evidence of why new homes appeared in the river town?", "A council record approves new homes and a factory", "River monitoring shows the channel moved with no building", "The grids show Industry in column 4, row 4", riverNotes, EX),
  ]),
  lesson(["Human changes come from people building or using land.", "Physical changes come from nature, such as moving water.", "Choose accounts the evidence supports."], riverNotes, [
    c("Which account do the coastal grids support?", "Some Farmland became Homes and some Beach became Sea", "Homes spread across the beach squares", "Most Farmland became Trees", coastPair, EX),
    c("Which change in the coastal village is a physical change?", "Beach became Sea", "Farmland became Homes", "Farmland became a Park", coastNotes, EX),
    c("Which change in the river town is a human change?", "Meadow became Industry", "River became Meadow", "Meadow became River", riverNotes, EX),
    sort("Sort each river town change as human or physical.", ["Human change", "Physical change"], [["Farmland became Homes", 0], ["Meadow became Industry", 0], ["River became Meadow", 1], ["Meadow became River", 1]], riverNotes, EX, "Human changes are built or used by people. Physical changes come from nature."),
    c("Which pair of changes includes one human and one physical change?", "Farmland to Homes; River to Meadow", "Farmland to Homes; Meadow to Industry", "River to Meadow; Meadow to River", riverNotes, EX),
    c("What evidence would help explain why the beach changed?", "Coast measurements over time", "Planning records for new homes", "Farm sale prices", coastNotes, EX),
    c("What evidence would help explain why Farmland became Homes?", "Planning records for new homes", "Wave measurements", "Pebble sizes on the beach", coastNotes, EX),
    c("What do the grids show only partly?", "Why the changes happened", "Which squares changed", "Which dates are shown", coastPair, EX),
    ordered("Order the steps for reading dated grids.", ["Check dates and key", "Spot changed squares", "Describe what changed", "Look for evidence of why"], enquiry, EX, "Start by checking the dates. Look for reasons last."),
  ]),
]);
