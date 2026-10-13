import { ask, cards, lesson, pic, sort, topic } from "./authoring.js";

const S = ["y1Drawings", "y1Curriculum"];

// C1 — picture cards. Letters only, so the picture is the evidence.
const meetA = cards("Bix's practice school: three pictures", [["school", null, "A"], ["path", null, "B"], ["tree", null, "C"]],
  "Picture A shows a school building with a roof, windows and a door. Picture B shows a path between trees. Picture C shows one big tree.",
  ["A building has walls, a roof and a door.", "A path is a way to walk along.", "A tree has a trunk and leaves."]);
const meetB = cards("Bix's practice school: three more pictures", [["soil", null, "A"], ["playground", null, "B"], ["gate", null, "C"]],
  "Picture A shows brown soil under grass, with a worm. Picture B shows a playground with swings and a slide. Picture C shows a wooden gate.",
  ["Soil is the brown ground that plants grow in.", "A playground has things to play on.", "A gate opens to let people in."]);
const named = cards("Things around a school", [["school", "School building"], ["path", "Path"], ["tree", "Tree"]],
  "Three labelled pictures: a school building, a path and a tree.",
  ["People learn inside the school building.", "People walk along the path.", "A tree grows leaves and branches."]);

// C2 — one practice grounds picture with lettered pins.
const grounds = (pins, title = "Bix's practice school grounds") => pic("scene", title,
  `A practice school grounds picture. The school building is on the left with a flower bed of soil in front. A path leads from the door. Trees and a playground are on the right, with a gate at the far right. ${Object.entries(pins).map(([id, f]) => `Letter ${id} marks the ${f === "soil" ? "soil in the flower bed" : f}.`).join(" ")}`,
  ["This is a practice school, not your school.", "Look for the letters on the picture."], { scene: "school", pins });
const notesGrounds = { ...grounds({}), labels: ["building", "path", "tree", "soil", "gate"], lines: ["The building is on the left.", "Trees and a gate are on the right.", "The path leads away from the door."] };
const g1 = grounds({ A: "building", B: "tree", C: "path" });
const g2 = grounds({ A: "soil", B: "playground", C: "gate" });

// C3 — sort what people made from what grows or is natural.
const sortCard = (items) => cards("Things to sort", items.map(([s, label]) => [s, label]),
  `Three labelled pictures: ${items.map(([, label]) => label).join(", ")}.`,
  ["Made by people: buildings, paths, gates and playgrounds.", "Natural: trees, plants and soil."]);
const SETS = [
  [["school", "School building", 0], ["tree", "Tree", 1], ["soil", "Soil", 1]],
  [["gate", "Gate", 0], ["vegetation", "Plants", 1], ["path", "Path", 0]],
  [["playground", "Playground", 0], ["tree", "Tree", 1], ["gate", "Gate", 0]],
  [["path", "Path", 0], ["soil", "Soil", 1], ["vegetation", "Plants", 1]],
  [["school", "School building", 0], ["vegetation", "Plants", 1], ["playground", "Playground", 0]],
  [["gate", "Gate", 0], ["soil", "Soil", 1], ["tree", "Tree", 1]],
  [["path", "Path", 0], ["tree", "Tree", 1], ["school", "School building", 0]],
];
const madeOrNatural = pic("cards", "Made by people or natural?", "Two groups. Made by people: a school building and a path. Natural: a tree and soil.",
  ["Made by people: buildings, paths, gates and playgrounds.", "Natural: trees, plants and soil."],
  { items: [{ s: "school", label: "Made by people" }, { s: "tree", label: "Natural" }] });

// C4 — planning a grown-up walk.
const walk = cards("Planning a walk with a grown-up", [["school", "One building"], ["path", "One path"], ["tree", "One growing thing"]],
  "A walk plan with three pictures: one building, one path and one growing thing to look for.",
  ["Walk with a grown-up. Stay together.", "Look for one building, one path and one growing thing.", "Draw what you see on paper.", "Bad weather? Look through a window instead."]);

export const AROUND_OUR_SCHOOL_ACTIVITY = {
  summary: "With a grown-up: take a looking walk",
  question: "What can we see around a familiar place?",
  materials: "paper, pencil and a grown-up",
  steps: ["Choose a familiar place with a grown-up. Stay together.", "Find one building, one path and one growing thing.", "Draw them from above. Use two simple symbols.", "Tell your grown-up what you noticed."],
  paper: "Building / path / growing thing. Draw a symbol for each.",
  present: "Show your drawing and explain your symbols.",
  alternative: "Look through a window with a grown-up, or use Bix's practice school picture.",
};

export const aroundOurSchool = topic([
  lesson(["This is Bix's practice school.", "Schools have buildings, paths and trees.", "Look closely at each picture."], named, [
    ...ask([
      ["Which picture shows a building?", "A", "B", "C"],
      ["Which picture shows a path?", "B", "A", "C"],
      ["Which picture shows a tree?", "C", "A", "B"],
    ], meetA, S, "A building has a roof and a door."),
    ...ask([
      ["Which picture shows soil?", "A", "B", "C"],
      ["Which picture shows a playground?", "B", "A", "C"],
      ["Which picture shows a gate?", "C", "A", "B"],
    ], meetB, S, "Soil is brown. Plants grow in it."),
    ...ask([
      ["What do people walk along?", "A path", "A tree", "A roof"],
      ["What grows leaves and branches?", "A tree", "A path", "A door"],
    ], named, S),
  ]),
  lesson(["Bix's school has a building, path and trees.", "Letters show where things are.", "Find each feature on the picture."], notesGrounds, [
    ...ask([
      ["Which letter marks the school building?", "A", "B", "C"],
      ["Which letter marks the tree?", "B", "A", "C"],
      ["Which letter marks the path?", "C", "A", "B"],
    ], g1, S, "Find the picture first. Then read its letter."),
    ...ask([
      ["Which letter marks the soil?", "A", "B", "C"],
      ["Which letter marks the playground?", "B", "A", "C"],
      ["Which letter marks the gate?", "C", "A", "B"],
    ], g2, S, "Find the picture first. Then read its letter."),
    ...ask([["Which side is the school building on?", "The left", "The right", "The middle"]], notesGrounds, S, "Look at where the roof is."),
  ]),
  lesson(["People made buildings, paths and gates.", "Trees, plants and soil are natural.", "Sort each card into a group."], madeOrNatural,
    SETS.map((set, i) => sort(`Group ${i + 1}: made by people or natural?`, ["Made by people", "Natural"], set.map(([, label, bin]) => [label, bin]), sortCard(set), S))),
  lesson(["Walk with a grown-up. Stay together.", "Look for a building, path and growing thing.", "Draw what you see on paper."], walk, ask([
    ["Who should come on your walk?", "A grown-up", "Nobody", "Only a pet"],
    ["Which is a growing thing to look for?", "A tree", "A gate", "A path"],
    ["Which is a building to look for?", "The school", "A puddle", "A bush"],
    ["What can you record on paper?", "A drawing of a tree", "Your home address", "A secret password"],
    ["Bad weather today. What can you do instead?", "Look through a window", "Go out alone", "Stop looking"],
    ["Which helps you record what you see?", "Paper and a pencil", "A football", "A bucket of water"],
    ["What could you look for on the path?", "Where the path leads", "What is for lunch", "Tomorrow's weather"],
  ], walk, S, "Read the walk plan beside the pictures.")),
], AROUND_OUR_SCHOOL_ACTIVITY);
