import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const ECO = "y5_economy", EX = "example", COAL = "y5_coalmine", TIN = "y5_tin";
const JOBS = { Primary: 6, Secondary: 14, Tertiary: 80 };

const sectors = record([
  "Economic activity is any work that earns money.",
  "Primary jobs take things from the land or sea: farming, fishing, mining and forestry.",
  "Secondary jobs make things: car factories, bakeries and building.",
  "Tertiary jobs provide services: teaching, nursing, shops, banking and tourism.",
], "Three kinds of job");
const chartVisual = visual("table", "Jobs in the town of Millbrook, example data", `Example data: a made-up town, jobs per 100 workers. Primary ${JOBS.Primary}, secondary ${JOBS.Secondary}, tertiary ${JOBS.Tertiary}.`, [
  "Example data: a made-up town, not a real place.", "Jobs are counted per 100 workers.", "Most jobs in the UK today are in services.",
], { caption: "Jobs per 100 workers in Millbrook", columns: ["Kind of job", "Jobs per 100 workers"], rows: Object.entries(JOBS).map(([k, v]) => [k, v]) });
const bar = (label, prompt, opts) => ({ kind: "chart", prompt, answer: JOBS[label], options: opts, chart: { type: "bar", rows: Object.entries(JOBS).map(([k, v]) => ({ label: k, value: v })), step: 20, max: 100, unit: "Jobs per 100 workers" }, visual: chartVisual, sources: [EX], evidence: [chartVisual.lines[0]], hint: `Find the ${label.toLowerCase()} bar and read its value.` });
const change = record([
  "Long ago, many people in the UK worked in farming, coal mining and factories.",
  "The last deep coal mine in the UK closed in 2015.",
  "South Crofty, the last tin mine in Cornwall, closed in 1998.",
  "Today most people work in services such as shops, hospitals, schools and offices.",
  "Cornwall now has many jobs in tourism, such as hotels, cafes and surf schools.",
], "How jobs have changed");
const places = visual("table", "Why places have different jobs", "A fishing port: fishing and boat repair, because it sits on the coast beside rich fishing seas. Farmland valley: farming, because soil is good and land is flat. Holiday coast: tourism, because of beaches and sunny weather. Big city: offices and shops, because many people and roads meet there.", [
  "The landscape and location can explain the jobs.", "Places change as new ideas and needs appear.", "Each row links a place, a job and a reason.",
], { caption: "Four places, their jobs and reasons", columns: ["Place", "Main jobs", "Reason"], rows: [["Fishing port", "Fishing and boat repair", "On the coast beside rich fishing seas"], ["Farmland valley", "Farming", "Good soil and flat land"], ["Holiday coast", "Tourism", "Beaches and sunny weather"], ["Big city", "Offices and shops", "Many people and roads meet there"]] });

export const economicActivityAndJobs = topic([
  lesson(["Economic activity is work that earns money.", "Jobs fall into three main kinds.", "Primary, secondary and tertiary."], sectors, [
    c("What is economic activity?", "Work that earns money", "A game with no rules", "Staying at home", sectors, [ECO], "Read the first evidence sentence."),
    c("Which kind of job takes things from the land or sea?", "Primary", "Secondary", "Tertiary", sectors, [ECO], "Read the second evidence sentence."),
    c("Which kind of job makes things?", "Secondary", "Primary", "Tertiary", sectors, [ECO], "Read the third evidence sentence."),
    c("Which kind of job provides a service?", "Tertiary", "Primary", "Secondary", sectors, [ECO], "Read the last evidence sentence."),
    c("Which is a primary job?", "Fishing", "Teaching", "Baking in a factory", sectors, [ECO], "It takes something from the sea."),
    c("Which is a secondary job?", "Building a house", "Nursing", "Farming wheat", sectors, [ECO], "It makes something."),
    c("Which is a tertiary job?", "Teaching", "Coal mining", "Car making", sectors, [ECO], "It provides a service."),
    sort("Sort each job into primary or secondary.", ["Primary", "Secondary"], [["Farming", 0], ["Fishing", 0], ["Making cars", 1], ["Baking bread in a factory", 1]], sectors, [ECO], "Primary takes from nature; secondary makes things."),
    sort("Sort each job into tertiary or primary.", ["Tertiary", "Primary"], [["Nursing", 0], ["Banking", 0], ["Forestry", 1], ["Mining", 1]], sectors, [ECO], "Tertiary provides a service."),
  ]),
  lesson(["Read a table of jobs.", "Millbrook is a made-up town.", "Compare the three kinds of job."], chartVisual, [
    bar("Primary", "How many jobs per 100 workers are primary in Millbrook?", [JOBS.Primary, JOBS.Secondary, 8]),
    bar("Secondary", "How many jobs per 100 workers are secondary in Millbrook?", [JOBS.Secondary, JOBS.Primary, 18]),
    bar("Tertiary", "How many jobs per 100 workers are tertiary in Millbrook?", [JOBS.Tertiary, 70, 90]),
    c("Which kind of job is most common in Millbrook?", "Tertiary", "Primary", "Secondary", chartVisual, [EX], "Find the tallest bar."),
    c("Which kind of job is least common in Millbrook?", "Primary", "Tertiary", "Secondary", chartVisual, [EX], "Find the shortest bar."),
    c("How many more tertiary than secondary jobs per 100 workers?", "66", "6", "94", chartVisual, [EX], "Subtract secondary from tertiary."),
    c("What do the three numbers add up to?", "100", "80", "20", chartVisual, [EX], "Add all three values."),
    c("What does the evidence say about most UK jobs today?", "They are in services", "They are in farming", "They are in mining", chartVisual, [ECO], "Read the last evidence line."),
    sort("Sort each job into the Millbrook bar it belongs to.", ["Tertiary", "Secondary"], [["Teacher", 0], ["Shop assistant", 0], ["Factory worker", 1], ["Builder", 1]], chartVisual, [ECO], "Services are tertiary; making things is secondary."),
  ]),
  lesson(["Jobs change over time.", "Some jobs fade as others grow.", "Read the timeline."], change, [
    c("In which year did the last deep coal mine in the UK close?", "2015", "1995", "1800", change, [COAL], "Read the second evidence sentence."),
    c("Which was the last tin mine in Cornwall?", "South Crofty", "Kellingley", "Ironbridge", change, [TIN], "Read the third evidence sentence."),
    c("In which year did South Crofty close?", "1998", "2015", "1850", change, [TIN], "Read the third evidence sentence."),
    c("Which kind of job is most common in the UK today?", "Services", "Coal mining", "Tin mining", change, [ECO], "Read the fourth evidence sentence."),
    c("Which kind of work did many UK people do long ago?", "Farming, coal mining and factory work", "Only banking and working in offices", "Only teaching and nursing in schools and hospitals", change, [ECO], "Read the first evidence sentence."),
    c("Which jobs have grown in Cornwall?", "Tourism jobs", "Tin mining jobs", "Coal mining jobs", change, [TIN], "Read the last evidence sentence."),
    c("Which statement is supported by the evidence?", "The UK has moved from mining towards services", "The UK has never had any kind of mine", "Everyone in the UK now works in coal mines", change, [ECO], "Compare long ago with today."),
    ordered("Order the events from earliest to latest.", ["South Crofty tin mine closes (1998)", "Last deep coal mine closes (2015)"], change, [COAL, TIN], "Compare the years in the evidence."),
    sort("Sort each job by whether it has grown or fallen in the UK.", ["Fallen", "Grown"], [["Coal mining", 0], ["Tin mining", 0], ["Tourism", 1], ["Hospital work", 1]], change, [ECO], "Read the timeline."),
  ]),
  lesson(["Place can explain jobs.", "Landscape and location matter.", "Match place, job and reason."], places, [
    c("Why does a fishing port have fishing jobs?", "It is on the coast beside rich fishing seas", "It is far inland with no sea nearby", "It has no boats, harbours or fishing nets", places, [ECO], "Read the fishing port row."),
    c("Why does a farmland valley have farming jobs?", "It has good soil and flat land", "It is covered in ice for most of the year", "It has bare rock and no soil at all", places, [ECO], "Read the farmland valley row."),
    c("Why does a holiday coast have tourism jobs?", "Beaches and sunny weather attract visitors", "It has no visitors, beaches or hotels", "It is always under water, so nobody goes", places, [ECO], "Read the holiday coast row."),
    c("Why does a big city have many offices and shops?", "Many people and roads meet there", "No one lives there, so shops stay empty", "It has no roads, so no one can reach it", places, [ECO], "Read the big city row."),
    c("Which place most likely has boat repair jobs?", "Fishing port", "Farmland valley", "Big city", places, [ECO], "Read the Main jobs column."),
    c("Which place most likely has hotels and cafes?", "Holiday coast", "Fishing port", "Farmland valley", places, [ECO], "Think about tourism."),
    c("Which statement is supported by the evidence?", "The landscape and location can explain the jobs", "Jobs never depend on the place at all", "All places have exactly the same jobs", places, [ECO], "Read the first evidence line."),
    c("What might happen to jobs if a port's fish stocks fall?", "Fishing jobs may fall and other jobs may grow", "Nothing ever changes in a place over time", "All jobs must grow when fish stocks fall", places, [ECO], "Places change as needs appear."),
    sort("Sort each job by the place it fits best.", ["Fishing port", "Farmland valley"], [["Fishing", 0], ["Boat repair", 0], ["Farming", 1], ["Picking crops", 1]], places, [ECO], "Match job to place."),
  ]),
]);
