import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 spelling: Appendix 1, the Year 6 half of homophones and often-confused words. */
export const RULE = "Some words sound alike or look alike but mean different things. Check the meaning before you choose the spelling.";

// Each pair: two words, a short meaning for each, one sentence for each (with a
// gap that only its own word can fill), and three clue phrases for each word
// that never contain the word itself.
export const PAIRS = [
  { a: "descent", b: "dissent", mA: "going down", mB: "disagreement",
    sA: "The pilot began the slow ___ towards the runway.", sB: "There was one voice of ___ in the vote, and everyone else agreed.",
    cA: ["a slow way down the slope", "a plane’s drop towards the runway", "climbing back down the mountain"],
    cB: ["disagreeing with the plan", "a voice against the vote", "not agreeing with a decision"] },
  { a: "desert", b: "dessert", mA: "a hot, dry place with little rain", mB: "a sweet course at the end of a meal",
    sA: "Camels can walk for days across the hot, dry ___.", sB: "We ate sticky toffee pudding for ___.",
    cA: ["sand dunes and cacti", "land with very little rain", "where camels travel"],
    cB: ["ice cream after dinner", "a sweet pudding", "the last course of a meal"] },
  { a: "draft", b: "draught", mA: "a first attempt at a piece of writing", mB: "a current of cold air",
    sA: "Zara wrote the first ___ of her story.", sB: "A cold ___ blew under the door.",
    cA: ["the first version of an essay", "a rough copy to be improved", "a story before it is edited"],
    cB: ["cold air under a door", "a breeze through a gap", "a chill from an open window"] },
  { a: "farther", b: "father", mA: "a greater distance away", mB: "a male parent",
    sA: "It is ___ to the shops than to the park.", sB: "My ___ drove us to school.",
    cA: ["a greater distance away", "a longer way to go", "more miles to travel"],
    cB: ["a dad", "a male parent", "a man with children"] },
  { a: "past", b: "passed", mA: "the time before now", mB: "handed something on (the past tense of pass)",
    sA: "The bus drove ___ our house without stopping.", sB: "Ravi ___ the salt across the table.",
    cA: ["long ago", "the time before now", "history, not the future"],
    cB: ["handed the ball to a friend", "succeeded in a test", "moved something along a line"] },
  { a: "precede", b: "proceed", mA: "come before", mB: "go on",
    sA: "A small band will ___ the carnival float, marching in front of it.", sB: "Please ___ to the hall when the bell rings.",
    cA: ["come before", "go in front of", "be earlier in a line"],
    cB: ["go on", "continue along the way", "carry on after a stop"] },
  { a: "principal", b: "principle", mA: "most important, or the head of a college", mB: "a basic truth or belief",
    sA: "The ___ of the college welcomed the new students.", sB: "Telling the truth is a ___ that I try to live by.",
    cA: ["the head of a college", "the most important part", "the main reason for something"],
    cB: ["a rule you believe in", "a basic truth", "a belief about right and wrong"] },
  { a: "profit", b: "prophet", mA: "money made from selling for more than you paid", mB: "someone who foretells the future",
    sA: "The stall made a ___ of ten pounds on cakes.", sB: "In the old tale, a ___ warned the king about a flood.",
    cA: ["money gained from selling", "earning more than you spent", "gain from a business deal"],
    cB: ["someone who says what will happen", "a person who foretells the future", "a wise messenger of things to come"] },
  { a: "stationary", b: "stationery", mA: "not moving", mB: "paper, pens and envelopes",
    sA: "The train stood ___ at the platform.", sB: "The shop sells pens, paper and other ___.",
    cA: ["not moving", "parked and still", "a car waiting at a red light"],
    cB: ["envelopes and writing paper", "pens and pencils in a shop", "notepads and cards"] },
  { a: "steal", b: "steel", mA: "to take something that is not yours", mB: "a strong grey metal",
    sA: "It is wrong to ___ things from a shop.", sB: "The bridge was built from strong ___.",
    cA: ["take what is not yours", "rob a shop", "take something without asking"],
    cB: ["a strong metal", "what tall bridges are made of", "a hard grey metal used for knives"] },
  { a: "wary", b: "weary", mA: "careful and on guard", mB: "very tired",
    sA: "The deer was ___ of the strange noise.", sB: "After the long hike, the ___ walkers sat down.",
    cA: ["careful about danger", "cautious and watchful", "on guard"],
    cB: ["very tired", "worn out after a long day", "ready for bed"] },
];

const fill = (sentence, word) => sentence.replace("___", word);
const pairModel = ({ a, b }) => `Word pair: ‘${a}’ and ‘${b}’`;
const pairHint = ({ a, b, mA, mB }) => `${a} means “${mA}”. ${b} means “${mB}”. Which meaning does the sentence need?`;
const sides = PAIRS.flatMap((pair, index) => [
  { pair, index, word: pair.a, partner: pair.b, meaning: pair.mA, sentence: pair.sA, otherSentence: pair.sB, clues: pair.cA },
  { pair, index, word: pair.b, partner: pair.a, meaning: pair.mB, sentence: pair.sB, otherSentence: pair.sA, clues: pair.cB },
]);
// Two words from other pairs, so the options are clearly different words.
const strangers = (index) => [PAIRS[(index + 3) % PAIRS.length].a, PAIRS[(index + 7) % PAIRS.length].b];

const slot1 = sides.map(({ pair, index, word, partner, meaning }) => ch(
  `Which word means “${meaning}”?`, word, [partner, ...strangers(index)],
  { text: pairModel(pair), visualKind: "wordParts", hint: pairHint(pair) },
));

const slot2 = PAIRS.flatMap((pair) => [[0, 1], [1, 2]].map(([from, to], round) => st(
  `Sort these clues under the word they describe (${pair.a} / ${pair.b}, round ${round + 1}).`,
  [pair.a, pair.b],
  [pair.cA[from], pair.cA[to], pair.cB[from], pair.cB[to]].map((clue, i) => [clue, i < 2 ? 0 : 1]),
  { hint: pairHint(pair) },
)));

const slot3 = sides.map(({ pair, word, sentence }) => bd(
  `Build the word that completes the sentence: “${sentence}”`, word,
  { letters: true, more: ["x"], hint: pairHint(pair) },
));

const completes = sides.map(({ pair, index, word, partner, sentence }) => ch(
  "Which word completes the sentence?", word, [partner, ...strangers(index)],
  { sentence, hint: pairHint(pair) },
));
const correctSentence = PAIRS.map((pair) => ch(
  `Only one of these sentences uses “${pair.a}” or “${pair.b}” correctly. Which one?`, fill(pair.sA, pair.a),
  [fill(pair.sA, pair.b), fill(pair.sB, pair.a)],
  { hint: pairHint(pair) },
));
const slot4 = [...completes, ...correctSentence];

export const topic = {
  rule: RULE,
  hint: "Think about what the sentence is saying. Choose the spelling whose meaning fits it.",
  levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 },
};

export const buildConfusingWordPairs = buildTopic(topic);
