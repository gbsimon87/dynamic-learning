import { ask, cards, lesson, pic, sort, topic } from "./authoring.js";
import { visual } from "../year3/authoring.js";

const S = ["y1Drawings", "y1Curriculum"];
const NAME = { beach: "beach", cliff: "cliff", coast: "coast", forest: "forest", hill: "hill", mountain: "mountain", sea: "sea", ocean: "ocean", river: "river", soil: "soil", valley: "valley", vegetation: "plants", city: "city", town: "town", village: "village", factory: "factory", farm: "farm", house: "house", office: "office block", port: "port", harbour: "harbour", shop: "shop" };
const HUMAN = new Set(["city", "town", "village", "factory", "farm", "house", "office", "port", "harbour", "shop"]);

// C1 — unlabelled lettered cards; each card set teaches three words.
const set = (title, names) => cards(title, names.map((s, i) => [s, null, "ABC"[i]]),
  `${names.map((s, i) => `Picture ${"ABC"[i]} shows a ${NAME[s]}.`).join(" ")}`,
  ["Look at each picture.", "Then choose its letter."]);
const SETS = [["beach", "mountain", "house"], ["river", "forest", "shop"], ["cliff", "farm", "hill"], ["factory", "valley", "sea"], ["village", "office", "soil"], ["port", "city", "vegetation"]];
const word = (s) => (["a", "e", "i", "o", "u"].includes(NAME[s][0]) ? `an ${NAME[s]}` : `a ${NAME[s]}`);
const explore = SETS.flatMap((names, i) => ask(names.map((s, j) => {
  const others = [0, 1, 2].filter((k) => k !== j).map((k) => "ABC"[k]);
  return [`Which picture shows ${s === "vegetation" ? "plants growing" : word(s)}?`, "ABC"[j], others[0], others[1]];
}).slice(0, i < 4 ? 3 : 2), set(`Feature pictures, set ${i + 1}`, names), S));

const notesCards = cards("Physical and human features", [["mountain", "Mountain: physical"], ["river", "River: physical"], ["house", "House: human"], ["farm", "Farm: human"]],
  "Four labelled pictures: a mountain and a river are physical features. A house and a farm are human features.",
  ["Physical features are made by nature.", "Human features are made by people."]);

// C2 — two labelled scenes; letters on features.
const coast = (pins) => pic("scene", "A seaside picture",
  `A seaside picture. The sea is on the left, with boats near a harbour wall. Houses stand beside the harbour. A sandy beach is in the middle. A tall rocky cliff is on the right, with a village on top. ${Object.entries(pins).map(([id, f]) => `Letter ${id} marks the ${f}.`).join(" ")}`,
  ["Find each feature in the picture.", "Then read its letter."], { scene: "coast", pins });
const country = (pins) => pic("scene", "A countryside picture",
  `A countryside picture. A snowy mountain is on the left, with a forest below it. A green hill is on the right. Between them is a valley with a river flowing down it. A farm with a red barn and a field of soil are on the right. ${Object.entries(pins).map(([id, f]) => `Letter ${id} marks the ${f}.`).join(" ")}`,
  ["Find each feature in the picture.", "Then read its letter."], { scene: "country", pins });
const town = (pins) => pic("scene", "A town picture",
  `A town picture. A house is on the left, then a shop with a striped awning. A tall office block is in the middle. A tree stands beside a factory with a chimney on the right. A road runs along the front. ${Object.entries(pins).map(([id, f]) => `Letter ${id} marks the ${f}.`).join(" ")}`,
  ["Find each feature in the picture.", "Then read its letter."], { scene: "town", pins });
const locate = (place, pins, makeV) => {
  const v = makeV(pins);
  return ask(Object.entries(pins).map(([id, f]) => {
    const others = Object.keys(pins).filter((k) => k !== id);
    return [`In the ${place} picture, which letter is the ${f}?`, id, others[0], others[1]];
  }), v, S, "Find the feature first. Then read its letter.");
};
const notesScenes = visual("record", "Two places to explore", "Two labelled pictures. A seaside with sea, beach and cliff. A countryside with mountain, river and forest.",
  ["Seaside: sea, beach, cliff and harbour.", "Countryside: mountain, river, forest and farm."],
  { maps: [{ ...coast({}), labels: ["sea", "beach", "cliff"] }, { ...country({}), labels: ["mountain", "river", "forest"] }] });

// C3 — sort into human or physical.
const SORTS = [
  [["beach", 1], ["shop", 0], ["river", 1]], [["factory", 0], ["forest", 1], ["house", 0]], [["hill", 1], ["farm", 0], ["sea", 1]],
  [["port", 0], ["cliff", 1], ["office", 0]], [["valley", 1], ["village", 0], ["mountain", 1]], [["city", 0], ["ocean", 1], ["town", 0]],
  [["soil", 1], ["harbour", 0], ["vegetation", 1]],
];
const cap = (s) => NAME[s][0].toUpperCase() + NAME[s].slice(1);
const sortCards = (items) => cards("Features to sort", items.map(([s]) => [s, cap(s)]),
  `Three labelled pictures: ${items.map(([s]) => NAME[s]).join(", ")}.`,
  ["Human features are made by people.", "Physical features are made by nature."]);
for (const items of SORTS) for (const [s, bin] of items) if (HUMAN.has(s) !== (bin === 0)) throw new Error(`Sort key mismatch: ${s}`);

// C4 — simple similarities between two scenes.
const pair = (a, b, title) => visual("record", title, `${a.alt} ${b.alt}`, ["Look at both pictures.", "What can you see in both?"], { maps: [a, b] });
const coastCountry = pair(coast({}), country({}), "Seaside and countryside");
const coastTown = pair(coast({}), town({}), "Seaside and town");
const countryTown = pair(country({}), town({}), "Countryside and town");

export const humanAndPhysicalFeatures = topic([
  lesson(["Physical features are made by nature.", "Human features are made by people.", "Let's name some features!"], notesCards, explore),
  lesson(["Here are two places.", "Each has many features.", "Letters show where features are."], notesScenes, [
    ...locate("seaside", { A: "sea", B: "beach", C: "cliff" }, coast),
    ...locate("seaside", { A: "harbour", B: "village", C: "beach" }, coast).slice(0, 2),
    ...locate("countryside", { A: "mountain", B: "river", C: "forest" }, country),
    ...locate("countryside", { A: "valley", B: "farm", C: "hill" }, country),
    ...locate("town", { A: "house", B: "shop", C: "factory" }, town),
  ]),
  lesson(["Is it made by people? It is human.", "Is it made by nature? It is physical.", "Sort each card."], notesCards,
    SORTS.map((items, i) => sort(`Group ${i + 1}: human or physical?`, ["Human feature", "Physical feature"], items.map(([s, bin]) => [cap(s), bin]), sortCards(items), S))),
  lesson(["Two places can be alike.", "Look for features in both pictures.", "Choose what is the same."], coastCountry, [
    ...ask([
      ["Seaside and countryside: what do both have?", "Water", "A factory", "A tall mountain"],
      ["What does the seaside have that the countryside lacks?", "A beach", "Water", "A mountain"],
      ["What does the countryside have that the seaside lacks?", "A mountain", "Water", "A beach"],
    ], coastCountry, S, "Look for the feature in both pictures."),
    ...ask([
      ["Seaside and town: what do both have?", "Buildings", "A cliff", "A factory"],
      ["What does the town have that the seaside lacks?", "A factory", "Houses", "Sky"],
    ], coastTown, S, "Look for the feature in both pictures."),
    ...ask([
      ["Countryside and town: what do both have?", "Trees", "The sea", "A cliff"],
      ["Which is a human feature in both pictures?", "A building", "A river", "A mountain"],
    ], countryTown, S, "Look for the feature in both pictures."),
  ]),
]);
