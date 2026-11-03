import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const DFE = "g5_dfe", EX = "example", RGS = "g5_rgs", FW = "y5_fieldwork";
const SITES = ["Site 1", "Site 2", "Site 3"];
const WIDTH = [2, 4, 7];
const TIMES = { "Site 1": [8, 10, 9], "Site 2": [12, 11, 13], "Site 3": [16, 18, 17] };
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const ex = "Example data, not a real river.";

const plan = record([
  "A fieldwork enquiry starts with a question, such as: does a river get wider as it flows downstream?",
  "A hypothesis is a prediction you can test, such as: the river will be wider at Site 3 than Site 1.",
  "Primary data is collected by you. Secondary data comes from books, maps or websites.",
  "Choose a measure you can repeat, such as width in metres, and use the same method at every site.",
  "Plan safety first: work with a grown-up, stay away from deep or fast water, and wear sensible shoes.",
], "Planning an enquiry");
const results = visual("table", "River results, example data", `${ex} Width in metres: Site 1 ${WIDTH[0]}, Site 2 ${WIDTH[1]}, Site 3 ${WIDTH[2]}. Float timings over 10 metres, in seconds, three tries each: Site 1 ${TIMES["Site 1"].join(", ")}; Site 2 ${TIMES["Site 2"].join(", ")}; Site 3 ${TIMES["Site 3"].join(", ")}.`, [
  `${ex} The same method was used at every site.`, "A float was timed over 10 metres of river, three times at each site.", "A longer time means slower water.",
], { caption: "Channel width and float timings", columns: ["Site", "Width (m)", "Timing 1 (s)", "Timing 2 (s)", "Timing 3 (s)"], rows: SITES.map((s, i) => [s, WIDTH[i], ...TIMES[s]]) });
const widthChart = (i, prompt, opts) => ({ kind: "chart", prompt, answer: WIDTH[i], options: opts, chart: { type: "bar", rows: SITES.map((s, j) => ({ label: s, value: WIDTH[j] })), step: 2, max: 8, unit: "Channel width (m)" }, visual: results, sources: [EX], evidence: [results.lines[0]], hint: `Find the bar labelled ${SITES[i]} and read its value.` });
const present = record([
  "A bar chart compares amounts, such as river width at three sites.",
  "A line graph shows change over time, such as rainfall across a year.",
  "A sketch map shows where you collected data. It needs a title, a key and an arrow showing north.",
  "A tally chart is a quick way to count as you go.",
  "A spreadsheet can store results and draw graphs. A digital map can show your sites.",
], "Ways to present data");
const flows = visual("table", "Pedestrians per 10 minutes, example data", "Example data, not a real street. Number of people passing in 10 minutes at three sites on three days. High Street: Monday 28, Tuesday 31, Wednesday 30. Park Road: Monday 12, Tuesday 95, Wednesday 11. Mill Lane: Monday 5, Tuesday 6, Wednesday 4. On Tuesday a school trip walked along Park Road.", [
  "Example data, not a real street. A school trip walked along Park Road on Tuesday.", "Each site was counted for 10 minutes at the same time of day.", "Only three days were counted.",
], { caption: "People passing in 10 minutes", columns: ["Site", "Monday", "Tuesday", "Wednesday"], rows: [["High Street", 28, 31, 30], ["Park Road", 12, 95, 11], ["Mill Lane", 5, 6, 4]] });

export const designingAFieldworkEnquiry = topic([
  lesson(["Fieldwork begins with a question.", "A hypothesis is a prediction you can test.", "Data you collect yourself is primary data."], plan, [
    c("What does a fieldwork enquiry start with?", "A question", "A graph", "A conclusion", plan, [DFE, FW], "Read the first evidence sentence."),
    c("What is a hypothesis?", "A prediction you can test", "A graph that is finished and labelled", "A list of the kit you need to carry", plan, [FW], "Read the second evidence sentence."),
    c("What is primary data?", "Data you collect yourself", "Data from a website", "Data from a book", plan, [FW], "Read the third evidence sentence."),
    c("What is secondary data?", "Data from books, maps or websites", "Data you collect yourself on the site", "A kind of sketch map with a key", plan, [FW], "Read the third evidence sentence."),
    c("Why use the same method at every site?", "So results can be fairly compared", "So every site looks alike", "So no one needs a plan", plan, [FW], "Read the fourth evidence sentence."),
    c("Which measure can you repeat at every river site?", "Width in metres", "How pretty it looks", "What a visitor feels", plan, [FW], "Choose something you can measure."),
    c("What should you plan before going out?", "Safety", "Only the picnic", "Nothing at all", plan, [FW], "Read the last evidence sentence."),
    c("Who should be with you on fieldwork?", "A grown-up", "A stranger", "No one", plan, [FW], "Read the last evidence sentence."),
    sort("Sort each data source into primary or secondary.", ["Primary data", "Secondary data"], [["Measuring a path yourself", 0], ["Counting people on a street", 0], ["A statistic from a website", 1], ["A map from an atlas", 1]], plan, [FW], "Primary data you collect yourself."),
  ]),
  lesson(["Use the same method at every site.", "Repeat measurements.", "A mean is a fair middle value."], results, [
    widthChart(0, "What was the channel width at Site 1?", [WIDTH[0], WIDTH[1], 3]),
    widthChart(1, "What was the channel width at Site 2?", [WIDTH[1], WIDTH[0], WIDTH[2]]),
    widthChart(2, "What was the channel width at Site 3?", [WIDTH[2], 6, WIDTH[1]]),
    c("Which site had the widest channel?", "Site 3", "Site 1", "Site 2", results, [EX], "Find the biggest width."),
    c("What is the mean float time at Site 1?", `${mean(TIMES["Site 1"])} seconds`, `${mean(TIMES["Site 1"]) + 1} seconds`, `${mean(TIMES["Site 1"]) - 1} seconds`, results, [EX, FW], "Add the three times, then divide by three."),
    c("What is the mean float time at Site 3?", `${mean(TIMES["Site 3"])} seconds`, `${mean(TIMES["Site 3"]) + 1} seconds`, `${mean(TIMES["Site 3"]) - 1} seconds`, results, [EX, FW], "Add the three times, then divide by three."),
    c("At which site was the water slowest?", "Site 3", "Site 1", "Site 2", results, [EX], "A longer float time means slower water."),
    c("Why were three timings taken at each site?", "To check the result and reduce mistakes", "Because one timing is forbidden", "To make the river faster", results, [FW], "Repeating helps you trust the result."),
    ordered("Order the sites from narrowest to widest.", ["Site 1", "Site 2", "Site 3"], results, [EX], "Compare the widths."),
  ]),
  lesson(["Choose the best way to show data.", "A bar chart compares amounts.", "A sketch map needs a key and a north arrow."], present, [
    c("Which graph compares river width at three sites?", "A bar chart", "A line graph over time", "A sketch map only", present, [FW], "Read the first evidence sentence."),
    c("Which graph shows change over time?", "A line graph", "A bar chart", "A tally chart", present, [FW], "Read the second evidence sentence."),
    c("What does a sketch map need?", "A title, a key and a north arrow", "Only a bright colour for each place", "Only the names of the people who visited", present, [FW], "Read the third evidence sentence."),
    c("What is a tally chart good for?", "A quick count as you go", "Showing a river's source", "Drawing a hill", present, [FW], "Read the fourth evidence sentence."),
    c("What can a spreadsheet do?", "Store results and draw graphs", "Walk to the river", "Measure rainfall by itself", present, [FW], "Read the last evidence sentence."),
    c("Which is the best way to show the width at three sites?", "A bar chart", "A pie chart of weather", "A photograph only", present, [FW], "Match the graph to the data."),
    c("Which is the best way to show where the sites were?", "A sketch map with a key", "A table with only numbers in it", "A line graph showing change over time", present, [FW], "Show places on a map."),
    c("Which is the best way to count people passing a gate?", "A tally chart", "A sketch map", "A line graph of height", present, [FW], "Count as you go."),
    sort("Sort each aim into the display that suits it best.", ["Bar chart", "Sketch map"], [["Compare widths at three sites", 0], ["Compare traffic counts", 0], ["Show where sites were", 1], ["Show where a path runs", 1]], present, [FW], "Bar charts compare amounts; maps show places."),
  ]),
  lesson(["Check results before drawing a conclusion.", "An anomaly is a result that does not fit.", "Say what the evidence cannot show."], flows, [
    c("Which result is an anomaly?", "Park Road on Tuesday, 95", "High Street on Monday, 28", "Mill Lane on Wednesday, 4", flows, [EX, FW], "Look for the odd one out and read the evidence."),
    c("Why might Park Road have 95 people on Tuesday?", "A school trip walked along it", "A new shop opened on Mill Lane", "The weather forecast changed", flows, [EX], "Read the first evidence line."),
    c("What should you do with an anomaly?", "Note it, explain it and think about repeating", "Hide it so nobody can see the odd result", "Delete all the other results to match it", flows, [FW], "Do not ignore awkward data."),
    c("Which site is busiest on most days?", "High Street", "Mill Lane", "Park Road", flows, [EX], "Compare the Monday and Wednesday counts."),
    c("Which site is quietest on most days?", "Mill Lane", "High Street", "Park Road", flows, [EX], "Compare the counts."),
    c("Which conclusion is best supported?", "High Street was busiest in this sample", "High Street is busiest in the whole country", "Mill Lane is closed", flows, [EX, FW], "Stay with the evidence you have."),
    c("What limits this enquiry?", "Only three days were counted", "Too many sites were counted", "No numbers were collected", flows, [EX, FW], "Read the last evidence line."),
    c("What would improve the enquiry?", "Count on more days", "Count only on Tuesday", "Use no numbers", flows, [FW], "More data gives a better picture."),
    sort("Sort each point as a strength or a limitation of the enquiry.", ["Strength", "Limitation"], [["Same time of day each time", 0], ["Same method at every site", 0], ["Only three days counted", 1], ["One odd result on Tuesday", 1]], flows, [EX, FW], "Strengths help trust; limitations reduce trust."),
  ]),
], {
  summary: "With a grown-up: try a local fieldwork enquiry",
  question: "Does the number of people passing differ between two streets or paths?",
  steps: [
    "Choose two places with a grown-up. Stay together in a suitable, safe spot away from roads.",
    "Make a hypothesis, such as: more people pass the shop path than the quiet path.",
    "Count people passing for 10 minutes at the same time of day at each place, using tally marks.",
    "Repeat on another day if you can, and note anything unusual, such as an event.",
    "Draw a bar chart and a sketch map with a title, key and north arrow.",
    "Say what your data suggest, what it cannot show and what you would do next.",
  ],
  materials: "paper, a pencil, a clock or timer and a grown-up.",
  paper: "Place 1 / Place 2; tally for each 10-minute count; date and time.",
  present: "Draw a table, a bar chart and a sketch map. Write a conclusion and one limitation.",
  alternative: "use the example data in the challenge, or count vehicles from a window with a grown-up.",
});
