import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 spelling: Appendix 1, conventional hyphenated prefix forms. */
export const RULE = "A hyphen is a short joining line inside some words. In these familiar forms, it shows where a prefix joins the base word.";

const words = [
  ["co", "ordinate", "co-ordinate", "The two teams will ___ their plans."],
  ["co", "operate", "co-operate", "The groups need to ___ to finish the project."],
  ["co", "own", "co-own", "The cousins ___ the small boat."],
  ["co", "author", "co-author", "Mina will ___ the class booklet with Sam."],
  ["co", "exist", "co-exist", "Different plants can ___ in the same garden."],
  ["re", "enter", "re-enter", "Please ___ the hall quietly after the fire drill."],
  ["re", "elect", "re-elect", "The club voted to ___ its captain."],
  ["re", "examine", "re-examine", "The scientist will ___ the sample."],
  ["re", "emerge", "re-emerge", "The moon will ___ from behind the cloud."],
  ["re", "enact", "re-enact", "The class will ___ a scene from the story."],
  ["pre", "existing", "pre-existing", "The architect worked around a ___ wall."],
  ["pre", "empt", "pre-empt", "The organiser made a plan to ___ delays."],
  ["de", "ice", "de-ice", "Workers need to ___ the path before school opens."],
  ["anti", "inflammatory", "anti-inflammatory", "The label describes an ___ medicine."],
  ["non", "existent", "non-existent", "The map showed a ___ road by mistake."],
];

const model = (prefix, base) => `Prefix ‘${prefix}’ + base word ‘${base}’`;
const hint = "Read the prefix and the base word separately. Put one hyphen exactly where those two parts join.";
const otherForms = (index) => [1, 5, 10].map(offset => words[(index + offset) % words.length][2]);

const slot1 = words.map(([prefix, base, answer], index) => ch(
  `Which spelling joins prefix ‘${prefix}’ and base word ‘${base}’?`, answer, otherForms(index),
  { text: model(prefix, base), visualKind: "wordParts", hint },
));

const families = {
  co: words.slice(0, 5),
  re: words.slice(5, 10),
  other: words.slice(10),
};
const sortSets = Array.from({ length: 15 }, (_, index) => [
  ...[families.co[index % 5], families.co[(index + 2) % 5]].map(([, , word]) => [word, 0]),
  ...[families.re[index % 5], families.re[(index + 2) % 5]].map(([, , word]) => [word, 1]),
  ...[families.other[index % 5], families.other[(index + 2) % 5]].map(([, , word]) => [word, 2]),
]);
const slot2 = sortSets.map((cards, index) => st(
  `Sort these familiar hyphenated spellings by their prefix (set ${index + 1}).`,
  ["Starts with co-", "Starts with re-", "Another prefix"], cards,
  { hint: "Read the letters before the hyphen first. They make the prefix." },
));

const slot3 = words.map(([prefix, base, answer]) => bd(
  `Build the conventional spelling for prefix ‘${prefix}’ and base word ‘${base}’.`, answer,
  { letters: true, more: ["x"], text: model(prefix, base), visualKind: "wordParts", hint },
));

const slot4 = words.map(([prefix, base, answer, sentence], index) => ch(
  `Which spelling of ‘${prefix}’ + ‘${base}’ completes the sentence?`, answer, otherForms(index),
  { sentence, text: model(prefix, base), visualKind: "wordParts", hint },
));

export const topic = {
  rule: RULE,
  hint,
  levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 },
};

export const buildHyphensInWords = buildTopic(topic);
