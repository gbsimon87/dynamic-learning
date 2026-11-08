import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 grammar: a wider range of cohesive devices to link ideas across paragraphs. */
export const RULE = "A cohesive device (a word or phrase that links ideas) can join paragraphs. Repeat a key word or phrase, or use a linking adverbial such as “on the other hand” (contrast) or “as a consequence” (result).";

/** Paragraph 1, the linking phrase, the rest of paragraph 2's first sentence, and three links that do not fit. */
export const links = [
  { kind: "contrast", p1: "Cats usually sleep for most of the day and stay close to home.", link: "In contrast,", rest: "dogs need long walks and plenty of company.", wrong: ["As a consequence,", "For this reason,", "In the same way,"] },
  { kind: "contrast", p1: "Summer days in the desert are dry and dangerously hot.", link: "On the other hand,", rest: "the nights can be freezing cold.", wrong: ["As a result,", "Therefore,", "In the same way,"] },
  { kind: "contrast", p1: "Online shopping is quick and often cheaper.", link: "On the other hand,", rest: "a real shop lets you try things on before you buy.", wrong: ["As a consequence,", "For this reason,", "Similarly,"] },
  { kind: "contrast", p1: "The old bridge is beautiful and loved by the whole village.", link: "In contrast,", rest: "the new bridge is plain but much safer for lorries.", wrong: ["As a result,", "Therefore,", "Likewise,"] },
  { kind: "contrast", p1: "Reading a book lets you imagine every scene yourself.", link: "By comparison,", rest: "a film shows you the whole story ready-made on the screen.", wrong: ["For this reason,", "As a consequence,", "Likewise,"] },
  { kind: "result", p1: "The river rose higher and higher during the night.", link: "As a consequence,", rest: "several roads in the valley were closed.", wrong: ["On the other hand,", "In contrast,", "Similarly,"] },
  { kind: "result", p1: "The factory stopped dumping waste into the stream.", link: "As a result,", rest: "fish have returned to the water.", wrong: ["In contrast,", "On the other hand,", "Similarly,"] },
  { kind: "result", p1: "Nobody watered the sunflowers all summer.", link: "As a consequence,", rest: "the plants drooped and turned brown.", wrong: ["In contrast,", "On the other hand,", "Likewise,"] },
  { kind: "result", p1: "Leo practised the piano every day for a year.", link: "For this reason,", rest: "he played the whole piece without a mistake.", wrong: ["In contrast,", "On the other hand,", "Similarly,"] },
  { kind: "result", p1: "The school planted thick hedges around the playground.", link: "As a result,", rest: "the noise from the road is much quieter.", wrong: ["On the other hand,", "In contrast,", "Likewise,"] },
];

/** Paragraph 1, the key phrase repeated, the opening that repeats it, and three openings that do not. */
export const repeats = [
  { p1: "The Roman road ran straight across the hills for fifty miles.", key: "Roman road", answer: "The Roman road was built by soldiers who marched along it.", wrong: ["Soldiers built it from stone and gravel.", "Its path was planned by army engineers.", "Frogs lay their eggs in shallow ponds."] },
  { p1: "Pollution is harming the coral reefs around the island.", key: "coral reefs", answer: "Coral reefs shelter thousands of fish and protect the coast.", wrong: ["These fragile habitats shelter thousands of fish.", "They shelter thousands of fish and protect the coast.", "Tourists arrive by boat each summer."] },
  { p1: "Maria trained for the swimming gala every morning before school.", key: "swimming gala", answer: "The swimming gala took place on a bright, windy Saturday.", wrong: ["The big event took place on a bright, windy Saturday.", "It took place on a bright, windy Saturday.", "Dad packed a towel and a flask of soup."] },
  { p1: "A rainforest is home to more kinds of animal than anywhere else.", key: "rainforest", answer: "Every rainforest animal depends on the trees around it.", wrong: ["Every creature there depends on the trees around it.", "Every one of them depends on the trees around it.", "Farmers in the valley grow rice and beans."] },
  { p1: "Our class is writing letters to the mayor about the empty playground.", key: "playground", answer: "The playground has stood bare since the fence fell down in March.", wrong: ["The place has stood bare since the fence fell down in March.", "It has stood bare since the fence fell down in March.", "Ravi wants to ask for new swings."] },
];

const hint = "Read paragraph 1, then ask what paragraph 2 needs to do: show a contrast, show a result, or repeat a key phrase to link back.";
const kindName = { contrast: "a contrast (something different)", result: "a result (something that happened because of it)" };
const para = (label, text) => ({ blocks: [{ type: "p", label, text }] });
const sentenceOf = ({ link, rest }) => `${link} ${rest}`;

const choose = links.map(item => ch(
  `Choose the linking adverbial that begins paragraph 2 and shows ${kindName[item.kind]}.`, item.link, item.wrong,
  { passage: para("Paragraph 1", item.p1), sentence: `___ ${item.rest}`, text: "A linking adverbial at the start of paragraph 2 tells the reader how it connects to paragraph 1.", hint },
)).concat(repeats.map(item => ch(
  "Which sentence begins paragraph 2 and links back by repeating a key word or phrase from paragraph 1?", item.answer, item.wrong,
  { passage: para("Paragraph 1", item.p1), text: `Look for the phrase “${item.key}”. Repeating it tells the reader the new paragraph is still about it.`, hint },
)));

const phrases = {
  contrast: ["On the other hand", "In contrast", "However", "By comparison", "Even so"],
  result: ["As a consequence", "As a result", "For this reason", "Therefore", "Because of this"],
};
const sortSets = Array.from({ length: 15 }, (_, i) => [
  ...[0, 2].map(step => [phrases.contrast[(i + step) % 5], 0]),
  ...[1, 3].map(step => [phrases.result[(i + step * 2) % 5], 1]),
]);
const sort = sortSets.map((cards, i) => st(`Sort the linking phrases by what they show between paragraphs (set ${i + 1}).`, ["Shows a contrast", "Shows a result"], cards, {
  text: "A contrast links two different ideas. A result links a cause to what happened because of it.",
  hint: "Ask whether the second paragraph says something different, or says what happened because of the first.",
}));

const withTiles = (item, extraWrong) => bd(
  `Build the first sentence of paragraph 2. Use a linking adverbial that shows ${kindName[item.kind]}.`, sentenceOf(item),
  { more: [extraWrong.split(" ")[0], extraWrong.split(" ").slice(-1)[0]], passage: para("Paragraph 1", item.p1), text: "Start with the linking adverbial, then add the rest of the sentence.", hint },
);
const build = links.map(item => withTiles(item, item.wrong[0])).concat(repeats.map(item => bd(
  `Build the first sentence of paragraph 2. Repeat the key phrase “${item.key}” to link back.`, item.answer,
  { more: ["It", "They"], passage: para("Paragraph 1", item.p1), text: "Use the repeated phrase as the first words of the new paragraph.", hint },
)));

const apply = links.map(item => ch(
  "Which opening sentence links paragraph 2 to paragraph 1 best?", sentenceOf(item),
  item.wrong.map(wrong => `${wrong} ${item.rest}`),
  { passage: para("Paragraph 1", item.p1), hint },
)).concat(repeats.map(item => ch(
  "Which opening sentence links paragraph 2 to paragraph 1 by repeating a key phrase?", item.answer, item.wrong,
  { passage: para("Paragraph 1", item.p1), hint },
)));

export const topic = { rule: RULE, hint, levels: { 1: choose, 2: sort, 3: build, 4: apply } };
export const buildCohesiveDevicesAcrossParagraphs = buildTopic(topic);
