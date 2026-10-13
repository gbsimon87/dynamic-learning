import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

export const SPOTS = ["Spot 1", "Spot 2", "Spot 3"];
export const WIDTHS = { A: [5, 4, 6], B: [9, 8, 10] };
export const COVER = { A: 7, B: 3 };
const sum = (a) => a.reduce((x, y) => x + y, 0);
const EXS = ["example", "g5_dfe"];

const question = record(["A good enquiry asks a question you can observe.", "Example question: how do paths and planted areas differ at two sites?", "Choose a measure you can repeat: path width in hand-spans, or planted cover in ten squares.", "Always work with a grown-up in a suitable place."], "Choosing an enquiry");
const method = record(["Example data, not real fieldwork.", "Method at both sites: measure path width at three spots in hand-spans.", "At both sites, estimate planted cover as squares out of ten.", "Record the same things on paper in a table, then sketch a map."], "Method for two sites");
const plan = visual("plan", "Example sketch plan: Site A and Site B", "North is up. Example data. Site A is in column 2, row 2. Site B is in column 5, row 4. Each square is 10 paces wide. Both sites use the same method.",
  ["Example data: a sketch plan, not a real place.", "Site A is in column 2, row 2; Site B is in column 5, row 4.", "Both sites use the same method. Each square is 10 paces wide."], { origin: [0, 0], size: 6, markers: [{ id: "A", label: "Site A", point: [1.5, 1.5] }, { id: "B", label: "Site B", point: [4.5, 3.5] }] });
const table = visual("table", "Example results table", `Example data, not real fieldwork. Path width in hand-spans: Site A ${WIDTHS.A.join(", ")}; Site B ${WIDTHS.B.join(", ")}. Planted cover out of ten squares: Site A ${COVER.A}; Site B ${COVER.B}.`,
  ["Example data, not real fieldwork. Hand-spans are the unit at both sites.", "Planted cover is squares out of ten at each site."],
  { caption: "Path width in hand-spans at three spots, and planted cover out of ten squares.", columns: ["Site", "Spot 1", "Spot 2", "Spot 3", "Planted cover"], rows: [["Site A", ...WIDTHS.A, `${COVER.A} of 10`], ["Site B", ...WIDTHS.B, `${COVER.B} of 10`]] });
const chart = (site, i, prompt) => ({ kind: "chart", prompt, answer: WIDTHS[site][i], options: [WIDTHS[site][i], WIDTHS[site][i] + 1, WIDTHS[site][i] - 1], chart: { type: "bar", rows: SPOTS.map((label, j) => ({ label, value: WIDTHS[site][j] })), step: 1, max: 10, unit: `Site ${site} path width (hand-spans)` }, visual: table, sources: ["example"], evidence: [table.lines[0]], hint: "Match the labelled bar with the example data." });
const result = record(["Example data, not real fieldwork.", "Site B's path was wider than Site A's path at all three spots.", "Site A had more planted cover: 7 of 10 squares, and Site B had 3.", "Each site had three spots, on one day, in one short visit."], "What the results show");

export const localFieldworkEnquiry = topic([
  lesson(["Fieldwork means observing, measuring and recording.", "Choose something you can see or measure.", "Use the same method at each site."], question, [
    c("Which question could you answer by observing two sites?", "How do path widths differ at two sites?", "Which site looks nicest?", "What is a visitor thinking?", question, EXS, "Choose something you can see or measure."),
    c("Which measure suits comparing path widths at two sites?", "Hand-spans at the same spots", "A guess at how nice it looks", "The weather forecast", question, EXS, "You need a repeatable unit."),
    c("Which measure suits comparing planted cover at two sites?", "Squares covered out of ten", "How noisy the site is", "How many benches there are", question, EXS, "You need a count you can compare."),
    c("Why use the same unit at both sites?", "So the results can be compared", "So both sites look alike", "So nobody has to write results", question, EXS, "Think about fair comparison."),
    c("Who should be with you on real fieldwork?", "A grown-up", "A friend, with no grown-up", "A stranger met on site", question, EXS, "Choose the safe option."),
    c("Where should you record your results for this task?", "On paper", "In a photo of the site", "On a map app showing your location", question, EXS, "No address or photograph is needed."),
    sort("Which notes are observable? Sort them.", ["Observable", "Not observable"], [["Width of a path in hand-spans", 0], ["Squares covered by plants", 0], ["What a passer-by is thinking", 1], ["Which site is the best", 1]], question, EXS, "Can you see it or measure it?"),
    ordered("Order the planning steps, starting with the enquiry question.", ["Ask the enquiry question", "Choose sites and a measure", "Record a table and sketch map", "Draw a graph"], question, EXS, "Start with the question."),
  ]),
  lesson(["Compare two sites in the same way.", "Keep units, spots and times the same.", "Record a table and a sketch map."], plan, [
    c("Which site is further north on the sketch plan?", "Site B", "Site A", "They are level", plan, ["example"], "North is up."),
    c("Which site is further east on the sketch plan?", "Site B", "Site A", "They are level", plan, ["example"], "East is to the right."),
    c("How many squares east of Site A is Site B?", "3 squares", "2 squares", "4 squares", plan, ["example"], "Compare the column numbers."),
    c("How many spots are measured at each site?", "Three", "One", "Five", method, EXS, "Read the method."),
    c("Which unit measures path width at both sites?", "Hand-spans", "Squares out of ten", "Minutes", method, EXS, "Read the method."),
    c("Which unit shows planted cover at both sites?", "Squares out of ten", "Hand-spans", "Paces", method, EXS, "Read the method."),
    c("Where do you write the results first?", "In a table on paper", "In a photo of the site", "On a sketch map only", method, EXS, "Read the last line of the method."),
    sort("Sort the method parts.", ["Same at both sites", "Written down for each site"], [["Unit of measure", 0], ["Number of spots", 0], ["Path widths", 1], ["Planted cover", 1]], method, EXS, "Which parts must match, and which are results?"),
    ordered("Order the recording steps in the method.", ["Choose three spots", "Measure path width", "Estimate planted cover", "Write results in a table"], method, EXS, "Measuring comes before writing results."),
  ]),
  lesson(["Read the map, table and graph together.", "The data are labelled example data.", "Match each bar to its spot."], table, [
    chart("A", 1, "Site A graph: how wide was the path at Spot 2?"),
    chart("A", 2, "Site A graph: how wide was the path at Spot 3?"),
    chart("B", 0, "Site B graph: how wide was the path at Spot 1?"),
    chart("B", 2, "Site B graph: how wide was the path at Spot 3?"),
    c("What was the total of Site A's three path widths?", `${sum(WIDTHS.A)} hand-spans`, `${sum(WIDTHS.A) - 1} hand-spans`, `${sum(WIDTHS.A) + 1} hand-spans`, table, EXS, "Add the three numbers for Site A."),
    c("Which site had more planted cover?", "Site A", "Site B", "They had the same", table, EXS, "Compare squares out of ten."),
    c("At which spot was Site B's path widest?", "Spot 3", "Spot 1", "Spot 2", table, EXS, "Find the biggest number in Site B's row."),
    c("Which statement matches the table?", "Site B's path was wider at all three spots", "Site A's path was wider at Spot 1", "Both sites had equal cover", table, EXS, "Check each spot."),
  ]),
  lesson(["A conclusion must match the evidence.", "Small samples and short visits limit conclusions.", "One more observation could test the result."], result, [
    c("Which conclusion is supported by the example data?", "At these spots, Site B's path was wider", "Site A has the widest paths of any site", "Wide paths cause less planting", result, EXS, "Stay with the sampled spots."),
    c("Which limit does the example data have?", "Only three spots at each site", "It compared ten sites on ten days", "It used a different unit at each site", result, EXS, "Read the last line."),
    c("Which next step would improve the evidence?", "Measure more spots or another day", "Delete the lowest numbers", "Guess the missing spots", result, EXS, "Choose more evidence."),
    c("Why might another day give different results?", "Planting and path use can change", "Hand-spans change size by day", "The sketch map moves", result, EXS, "Think about change over time."),
    c("A grown-up helps make a digital chart. Which labels does it need?", "A title, units and site names", "Colours and a picture of the site", "The author's address and school", result, EXS, "Readers need to know what the bars mean."),
    c("Which statement stays within the three spots measured?", "Site B's path was wider at these three spots", "Site B's paths are wider in other places too", "Wide paths mean fewer plants elsewhere", result, EXS, "Check which claim uses only the evidence in the table."),
    c("Does the example data prove what real fieldwork would find?", "No, it is practice data", "Yes, it was measured outdoors", "Yes, it was checked by experts", result, EXS, "Read the first line."),
    ordered("Order the enquiry from question to conclusion.", ["Ask a question", "Record a table and sketch map", "Draw and read a graph", "State a conclusion and its limit"], result, EXS, "Evidence comes before the conclusion."),
  ]),
], {
  summary: "With a grown-up: try a local fieldwork enquiry",
  question: "How do paths and planted areas differ at two familiar sites?",
  steps: [
    "Choose two comparable observation areas with a grown-up. Stay together in a suitable place.",
    "Use the same method and units at both: measure path width in paces or hand-spans, and estimate planted cover.",
    "Measure path width at three spots at each site. Measure only safe features.",
    "Record a table and a sketch map with a key. Tally what you see.",
    "Draw a graph of your measurements. A grown-up can help make a digital chart on their own device.",
    "Describe your sample limit and one useful repeat observation, such as another site or another day.",
  ],
  materials: "paper, a pencil, a ruler or your hand-spans, and a grown-up.",
  paper: "Site A / Site B; path width at three spots; planted cover out of ten squares.",
  present: "Draw a table, a sketch map with a key and a bar graph. Say what you noticed and what you still do not know.",
  alternative: "observe through a window with a grown-up, or use a tabletop map or the example plan.",
});
