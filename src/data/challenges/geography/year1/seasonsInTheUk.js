import { ask, cards, lesson, ordered, pic, topic } from "./authoring.js";

const S = ["y1Seasons", "y1Drawings"];
const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];

export const cycle = pic("seasons", "The four seasons", "A circle of four pictures of the same tree with arrows going round: spring with blossom, summer with full green leaves, autumn with orange falling leaves, winter with bare branches. After winter comes spring again.",
  ["The seasons go round and round.", "Spring, summer, autumn, winter, then spring again."]);
const meet = cards("Seasons in the UK", [["spring", "Spring: blossom, longer days"], ["summer", "Summer: longest days, green leaves"], ["autumn", "Autumn: leaves fall"], ["winter", "Winter: shortest days, bare trees"]],
  "Four captioned pictures of one tree. Spring: blossom and longer days. Summer: longest days and green leaves. Autumn: leaves change colour and fall. Winter: shortest days and bare branches.",
  ["It can rain in any season.", "Snow does not come every winter."]);

// C2 — order from a stated start (2–3 cards).
const after = (start, n) => Array.from({ length: n }, (_, i) => SEASONS[(SEASONS.indexOf(start) + i) % 4]);
const orderQs = [
  ...SEASONS.map((start) => ordered(`Start with ${start.toLowerCase()}. Put three seasons in order.`, after(start, 3), cycle, S, `Start with ${start.toLowerCase()}. Follow the arrows.`)),
  ...["Summer", "Winter", "Autumn"].map((start) => ordered(`${start} first. Which season comes next? Order them.`, after(start, 2), cycle, S, "Follow the arrows round the circle.")),
];

// C3 — clues from plants and daylight.
const clue = (n, s, text) => cards(`Clue ${n}`, [[s, text]], `One picture with a clue: ${text}`, [text]);
const CLUES = [
  ["spring", "New blossom is opening on the tree.", "Spring", "Autumn", "Winter"],
  ["autumn", "Orange leaves are falling off the tree.", "Autumn", "Spring", "Summer"],
  ["winter", "The branches are bare. It gets dark early.", "Winter", "Summer", "Spring"],
  ["summer", "Long light evenings and full green leaves.", "Summer", "Winter", "Autumn"],
  ["rainy", "It is raining today.", "It could be any season", "It must be winter", "It must be summer"],
  ["snowy", "Snow is falling.", "Probably winter", "Summer", "Autumn, always"],
  ["winter", "Daylight ends before tea time.", "Winter", "Summer", "Spring"],
];

const watch = cards("Watching one tree", [["spring", "Look in spring"], ["summer", "Look in summer"], ["autumn", "Look in autumn"], ["winter", "Look in winter"]],
  "Four pictures of the same tree, one for each season, drawn from the same place.",
  ["Look at the same place each season.", "Draw what changes and what stays."]);

export const SEASONS_ACTIVITY = {
  summary: "With a grown-up: watch one view through the year",
  question: "How does the same view change with the seasons?",
  materials: "paper, pencil and a grown-up",
  steps: ["Choose a window or safe spot with a grown-up.", "Draw the same tree or view.", "Draw it again next season, from the same place.", "Compare your drawings. What changed?"],
  paper: "Season / date / what the tree looks like / weather today.",
  present: "Put your drawings in order. Tell your grown-up what changed.",
  alternative: "Use pictures of one tree in four seasons with a grown-up.",
};

export const seasonsInTheUk = topic([
  lesson(["The UK has four seasons.", "Spring, summer, autumn and winter.", "They repeat every year."], meet, ask([
    ["Which season has new blossom?", "Spring", "Autumn", "Winter"],
    ["In which season do leaves fall?", "Autumn", "Spring", "Summer"],
    ["Which season has the longest days?", "Summer", "Winter", "Autumn"],
    ["Which season has the shortest days?", "Winter", "Summer", "Spring"],
    ["How many seasons are in a year?", "Four", "Two", "Seven"],
    ["Can it rain in summer?", "Yes, in any season", "No, never", "Only in winter"],
    ["Does it snow every UK winter?", "No, not always", "Yes, every day", "Only in summer"],
  ], meet, S, "Read the caption under each picture.")),
  lesson(["Seasons go round in a circle.", "After winter comes spring again.", "Follow the arrows."], cycle, orderQs),
  lesson(["Plants and daylight give clues.", "Blossom suggests spring. Falling leaves suggest autumn.", "Rain can come any time."], meet,
    CLUES.map(([s, text, a, w1, w2], i) => ask([[`Clue ${i + 1}: which season fits best?`, a, w1, w2]], clue(i + 1, s, text), S, "Match the clue to the season captions.")[0])),
  lesson(["Watch one place all year.", "Look at the same tree each season.", "Draw what changes."], watch, ask([
    ["How can we see seasons change?", "Watch the same tree all year", "Look at a new tree daily", "Close our eyes"],
    ["What makes a fair comparison?", "Same place, same time of day", "A new place each time", "Different trees each time"],
    ["When should you look again?", "Next season", "In one minute", "Never"],
    ["What could you draw each season?", "The same tree", "A different car", "Your dinner"],
    ["Who should help you choose a place?", "A grown-up", "Nobody", "A stranger"],
    ["What might change on the tree?", "Its leaves", "Its name", "Its address"],
    ["Where can you watch from if it's cold?", "A window", "A frozen pond", "A busy road"],
  ], watch, S, "Think about a fair way to compare.")),
], SEASONS_ACTIVITY);
