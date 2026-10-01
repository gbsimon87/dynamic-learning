import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";
export const ITEMS = [
  {
    "sentence": "The stream ___ over the stones.",
    "answer": "babbled",
    "wrong": [
      "stood",
      "slept"
    ],
    "sense": "hear"
  },
  {
    "sentence": "The stars ___ in the dark sky.",
    "answer": "sparkled",
    "wrong": [
      "rumbled",
      "trudged"
    ],
    "sense": "see"
  },
  {
    "sentence": "Biscuit ___ loudly at the gate.",
    "answer": "barked",
    "wrong": [
      "shone",
      "glittered"
    ],
    "sense": "hear"
  },
  {
    "sentence": "The icy wind made Ellie’s fingers ___.",
    "answer": "tingle",
    "wrong": [
      "glow",
      "sing"
    ],
    "sense": "feel"
  },
  {
    "sentence": "A silver fish ___ beneath the water.",
    "answer": "flashed",
    "wrong": [
      "boomed",
      "crunched"
    ],
    "sense": "see"
  },
  {
    "sentence": "Dry leaves ___ under Leo’s boots.",
    "answer": "crunched",
    "wrong": [
      "glowed",
      "floated"
    ],
    "sense": "hear"
  },
  {
    "sentence": "The soft wool felt ___ against Priya’s cheek.",
    "answer": "fluffy",
    "wrong": [
      "deafening",
      "sparkling"
    ],
    "sense": "feel"
  },
  {
    "sentence": "The lantern ___ in the fog.",
    "answer": "glowed",
    "wrong": [
      "whispered",
      "rattled"
    ],
    "sense": "see"
  },
  {
    "sentence": "The old door ___ as Zayn opened it.",
    "answer": "creaked",
    "wrong": [
      "sparkled",
      "swam"
    ],
    "sense": "hear"
  },
  {
    "sentence": "Warm sand felt ___ beneath Amara’s feet.",
    "answer": "grainy",
    "wrong": [
      "noisy",
      "shiny"
    ],
    "sense": "feel"
  },
  {
    "sentence": "The frost ___ on the grass.",
    "answer": "glittered",
    "wrong": [
      "roared",
      "growled"
    ],
    "sense": "see"
  },
  {
    "sentence": "The thunder ___ above the hills.",
    "answer": "rumbled",
    "wrong": [
      "gleamed",
      "drifted"
    ],
    "sense": "hear"
  },
  {
    "sentence": "The cold stone felt ___ under Ellie’s palm.",
    "answer": "smooth",
    "wrong": [
      "deafening",
      "bright"
    ],
    "sense": "feel"
  },
  {
    "sentence": "A red sail ___ on the horizon.",
    "answer": "gleamed",
    "wrong": [
      "clattered",
      "snored"
    ],
    "sense": "see"
  },
  {
    "sentence": "Rain ___ on the roof.",
    "answer": "drummed",
    "wrong": [
      "sparkled",
      "slept"
    ],
    "sense": "hear"
  }
];
export function buildSparkWordsQuestions(level, rng) {
  if (level === 1) return sample(ITEMS, 5, rng).map((item) => choiceQuestion({
    text: item.sentence, prompt: "Which vivid word fits this picture?", answer: item.answer,
    wrong: item.wrong, hint: "Think about what the thing can do, and which sense the words describe.", rng }));
  if (level === 2) return Array.from({ length: 5 }, () => ({ kind: "sort",
    prompt: "Which sense does each description appeal to?",
    bins: ["see", "hear", "feel"].map((id) => ({ id, label: id })),
    cards: shuffle(["see", "hear", "feel"].flatMap((sense) => sample(ITEMS.filter((i) => i.sense === sense), 2, rng))
      .map((item) => ({ id: item.answer, label: item.sentence.replace("___", item.answer), bin: item.sense })), rng),
    hint: "Imagine being there. Is it something you see, hear or feel against your skin?" }));
  if (level === 3) return sample(ITEMS, 5, rng).map((item) => {
    const tokens = item.sentence.replace("___", item.answer).split(" ");
    const answer = tokens.findIndex((token) => token.replace(/[^a-z]/gi, "") === item.answer);
    return { kind: "pick", prompt: `Tap the vivid word that helps you ${item.sense} the scene.`, tokens, answer,
      hinted: hintedWith(answer, tokens.map((_, i) => i), rng), hint: "Compare the underlined words. Which describes a precise sensation?" };
  });
  if (level === 4) return sample(ITEMS, 5, rng).map((item) => choiceQuestion({
    text: item.sentence.replace("___", item.answer), prompt: `What does “${item.answer}” help you imagine?`,
    answer: { see: "how something looks", hear: "the sound something makes", feel: "how something feels against skin" }[item.sense],
    wrong: ["see", "hear", "feel"].filter((s) => s !== item.sense).map((s) => ({ see: "how something looks", hear: "the sound something makes", feel: "how something feels against skin" }[s])),
    hint: "Picture the moment and think about the sense the word appeals to.", rng }));
  throw new Error(`no imagination level ${level}`);
}
