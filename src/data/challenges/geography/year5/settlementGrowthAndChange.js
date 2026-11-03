import { c, lesson, ordered, record, sort, topic } from "./authoring.js";
import { count, landGrid, near } from "../year4/settlementsShared.js";

const SET = "g4_siting", EX = "example", GREEN = "y5_brownfield";
const note = "Example data: a simplified sketch of a made-up city, not a real place.";

const sites = record([
  "Early settlers chose places with fresh water, flat land for building and farming, and wood or stone for homes.",
  "A hill or a bend in a river could make a place easier to defend.",
  "A river crossing was a good place for a market, because roads met there.",
  "A hamlet is a few homes. A village is larger, a town larger again, and a city is larger still.",
  "Size cut-offs are different in different countries.",
], "Why places grew");
const KEY = [{ code: "C", label: "Centre: shops and offices" }, { code: "I", label: "Older terraced homes" }, { code: "S", label: "Suburbs with gardens" }, { code: "P", label: "Park" }, { code: "F", label: "Fields" }];
const CELLS = ["FFSFF", "FSISF", "SICIS", "FSISP", "FFSFF"];
const city = landGrid("Example city plan", CELLS, KEY, [note, "Shops and offices are at the centre.", "Older terraced homes surround the centre.", "Suburbs with gardens lie further out.", "Fields lie at the edge of the city."]);
const nI = count(CELLS, "I"), nS = count(CELLS, "S"), nF = count(CELLS, "F"), nP = count(CELLS, "P");
const growth = record([
  "A village beside a river grows when a railway station and factories open.",
  "People move from the countryside to find jobs, so homes spread outwards.",
  "Greenfield land has never been built on. Brownfield land was used before, for example by an old factory.",
  "Building on brownfield land can protect fields.",
  "Many cities have a green belt, a ring of land where building is limited.",
], "Growing settlements");
const choose = record([
  "Reason to move to a city: more jobs, schools and hospitals.",
  "Reason to stay in the countryside: space, quiet and clean air.",
  "New homes help people find places to live, but fields can be lost.",
  "A new bus route can help new homes without making roads busier.",
  "Planners compare evidence from maps, surveys and what local people say.",
], "Choices about where to live and build");

export const settlementGrowthAndChange = topic([
  lesson(["Settlements grow where people need them.", "Water, flat land and routes help.", "Settlements have different sizes."], sites, [
    c("Which resource did early settlers need nearby?", "Fresh water", "A railway", "A supermarket", sites, [SET], "Read the first evidence sentence."),
    c("Why could a hill or river bend help a settlement?", "It was easier to defend", "It made the soil blue", "It stopped all rain", sites, [SET], "Read the second evidence sentence."),
    c("Why was a river crossing a good place for a market?", "Roads met there", "No one ever crossed", "Rivers dried up", sites, [SET], "Read the third evidence sentence."),
    c("Which is the largest type of settlement?", "City", "Hamlet", "Village", sites, [SET], "Read the fourth evidence sentence."),
    c("Which is the smallest type of settlement?", "Hamlet", "City", "Town", sites, [SET], "Read the fourth evidence sentence."),
    c("Do size cut-offs stay the same everywhere?", "No, they differ between countries", "Yes, they are the same in every country", "Yes, but only inside large cities", sites, [SET], "Read the last evidence sentence."),
    c("Why was flat land useful for early settlers?", "For building and farming", "For skiing", "For deep-sea fishing", sites, [SET], "Read the first evidence sentence."),
    ordered("Order the settlements from smallest to largest.", ["Hamlet", "Village", "Town", "City"], sites, [SET], "Start with a few homes."),
  ]),
  lesson(["Land use in a city changes with distance from the centre.", "Shops and offices cluster at the centre.", "Fields lie at the edge."], city, [
    c("What is at the centre of the example city?", "Shops and offices", "Fields", "A park", city, [EX], "Find the C square."),
    c("What surrounds the centre?", "Older terraced homes", "Fields", "Suburbs", city, [EX], "Read the third evidence line."),
    c("What lies at the edge of the city?", "Fields", "Shops and offices", "Older terraced homes", city, [EX], "Read the last evidence line."),
    c("How many squares show older terraced homes?", ...near(nI), city, [EX], "Count the I squares."),
    c("How many squares show suburbs?", ...near(nS), city, [EX], "Count the S squares."),
    c("How many squares show fields?", ...near(nF), city, [EX], "Count the F squares."),
    c("How many squares show the park?", ...near(nP), city, [EX], "Count the P squares."),
    ordered("Order the land uses from the centre outwards.", ["Shops and offices", "Older terraced homes", "Suburbs with gardens", "Fields"], city, [EX], "Start at the centre."),
    sort("Sort each land use by whether it is in the built-up city or on its edge.", ["Built-up city", "Edge of the city"], [["Shops and offices", 0], ["Older terraced homes", 0], ["Suburbs", 0], ["Fields", 1]], city, [EX], "Fields lie at the edge."),
  ]),
  lesson(["Settlements change over time.", "Jobs and transport make towns grow.", "Some land is greenfield; some is brownfield."], growth, [
    c("What can make a village grow?", "A railway station and factories", "Fewer jobs and a closed main road", "A drought that dries up the river", growth, [SET], "Read the first evidence sentence."),
    c("Why do people move from the countryside to a town?", "To find jobs", "To avoid all schools", "To live far from shops", growth, [SET], "Read the second evidence sentence."),
    c("What is greenfield land?", "Land that has never been built on", "Land with an old factory standing on it", "A kind of beach beside a harbour", growth, [GREEN], "Read the third evidence sentence."),
    c("What is brownfield land?", "Land that was used before, for example by an old factory", "Land that has never been built on before", "A bare hilltop with nothing on it", growth, [GREEN], "Read the third evidence sentence."),
    c("How can building on brownfield land help?", "It can protect fields", "It uses up all fields", "It stops all building", growth, [GREEN], "Read the fourth evidence sentence."),
    c("What is a green belt?", "A ring of land where building is limited", "A belt made of green grass for football", "A road that runs all the way round a city", growth, [GREEN], "Read the last evidence sentence."),
    ordered("Order how a settlement might grow.", ["A few homes beside a river", "A village with a market", "A town with a railway and factories", "A city with suburbs"], growth, [SET], "Start with a few homes."),
    sort("Sort each site as greenfield or brownfield.", ["Greenfield", "Brownfield"], [["A meadow", 0], ["A field of wheat", 0], ["An empty old factory site", 1], ["A former railway yard", 1]], growth, [GREEN], "Brownfield land was built on before."),
  ]),
  lesson(["People and planners make choices.", "Every choice has a benefit and a cost.", "Use the evidence."], choose, [
    c("Which is a reason to move to a city?", "More jobs, schools and hospitals", "More fields, farms and open countryside", "Fewer shops, buses and places to work", choose, [SET], "Read the first evidence sentence."),
    c("Which is a reason to stay in the countryside?", "Space, quiet and clean air", "More traffic, shops and busy streets", "Taller buildings and crowded city centres", choose, [SET], "Read the second evidence sentence."),
    c("What can new homes help with?", "Helping people find places to live", "Making every job in the town disappear", "Stopping all travel in and out of town", choose, [SET], "Read the third evidence sentence."),
    c("What might be lost when new homes are built?", "Fields", "All cities", "The sea", choose, [SET], "Read the third evidence sentence."),
    c("How can a new bus route help new homes?", "It can help without making roads busier", "It makes roads closed to all other traffic", "It removes every home from the new estate", choose, [SET], "Read the fourth evidence sentence."),
    c("What evidence do planners compare?", "Maps, surveys and what local people say", "Only one photograph taken on a sunny day", "Only a guess made by a single planner", choose, [SET], "Read the last evidence sentence."),
    c("Which is the best conclusion?", "New homes bring benefits and costs that planners must weigh", "New homes bring only benefits and no costs", "New homes bring only costs and no benefits", choose, [SET], "Avoid all-or-nothing answers."),
    sort("Sort each point as a benefit or a cost of building new homes on fields.", ["Benefit", "Cost"], [["More places to live", 0], ["More jobs in building", 0], ["Fields lost", 1], ["More traffic", 1]], choose, [SET], "Benefits help; costs are drawbacks."),
  ]),
]);
