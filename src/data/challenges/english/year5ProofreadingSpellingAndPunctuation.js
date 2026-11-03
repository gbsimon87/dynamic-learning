import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/** Proofreading Spelling and Punctuation: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Proofreading (checking for mistakes) means reading slowly, one sentence at a time, for spelling, punctuation, and word choice.";
// Each fix names the one wrong token in its sentence, the right replacement and a believable second slip.
export const BANK = [
  {
    title: "The Science Club",
    sentences: [
      "On Wednesday, the science club met in the hall, where Mr Hughes had set out four experiments.",
      "Amara, who loves volcanoes, chose the one with vinegar and baking soda.",
      "Leo wanted to know wether the mixture would fizz more with warm water.",
      "Priya wrote down the temperatur of the water each time.",
      "They all agreed the results were extremely interesting",
      "Zayn (who had been quiet all afternoon) suggested a bigger test next week.",
      "Mr Hughes said it was a marvellous idea; Ellie promised to bring the equipement.",
      "By five o’clock, the club had cleared up and gone home."
    ],
    fixes: [
      { sentence: 2, wrong: "wether", right: "whether", slip: "wheather", kind: "spelling" },
      { sentence: 3, wrong: "temperatur", right: "temperature", slip: "temprature", kind: "spelling" },
      { sentence: 4, wrong: "interesting", right: "interesting.", slip: "interesting,", kind: "punctuation" },
      { sentence: 6, wrong: "equipement.", right: "equipment.", slip: "equiptment.", kind: "spelling" },
    ]
  },
  {
    title: "The Rescue at the Pond",
    sentences: [
      "It was a bright Saturday morning when Ellie and Biscuit walked to the pond.",
      "Biscuit, who is always curios, ran straight to the edge.",
      "Suddenly a small duckling got stuck between two rocks.",
      "Ellie knelt down and gently lifted the duckling out.",
      "She had never seen such a tiny creature before",
      "The duckling’s mother quacked loudly, and it hurried back to her.",
      "Priya, who had been fishing nearby, clapped and cheered.",
      "Nobody could belive how calm Biscuit had been.",
      "That afternoon, Ellie told her mum about the adventure; she was very proud."
    ],
    fixes: [
      { sentence: 4, wrong: "before", right: "before.", slip: "before,", kind: "punctuation" },
      { sentence: 7, wrong: "belive", right: "believe", slip: "beleive", kind: "spelling" },
      { sentence: 1, wrong: "curios,", right: "curious,", slip: "curius,", kind: "spelling" },
      { sentence: 2, wrong: "Suddenly", right: "Suddenly,", slip: "Suddenly;", kind: "punctuation" }
    ]
  },
  {
    title: "The Class Debate",
    sentences: [
      "Last Friday, Year 5 held a debate about whether school should start later.",
      "Amara spoke first, and her arguement was clear, calm and very convincing.",
      "Leo disagreed, saying that earlier starts leave more time for after-school clubs.",
      "Zayn (who was timing the speeches) rang a small bell after two minutes.",
      "Priya asked the audience too put up their hands if they agreed.",
      "The teacher was suprised by how many pupils had changed their minds.",
      "In the end, the vote was close; the later start won by two votes.",
      "Everyone agreed that a good debate was a great way to learn"
    ],
    fixes: [
      { sentence: 4, wrong: "too", right: "to", slip: "two", kind: "word choice" },
      { sentence: 5, wrong: "suprised", right: "surprised", slip: "surprized", kind: "spelling" },
      { sentence: 7, wrong: "learn", right: "learn.", slip: "learn,", kind: "punctuation" },
      { sentence: 1, wrong: "arguement", right: "argument", slip: "arguemant", kind: "spelling" }
    ]
  },
  {
    title: "The Night Walk",
    sentences: [
      "The torchlight swung across the path as the group set of.",
      "Mr Okoye, our guide, pointed out a bat swooping overhead.",
      "Leo had never been out so late before, and his heart thumped.",
      "Amara whispered, “Did you hear that owl”",
      "Priya shone her torch into the hedge, where two bright eyes gleamed.",
      "It was only a hedgehog, snufling through the leaves.",
      "Zayn laughed quietly and said he was no longer afraid of hedgehogs.",
      "Their was a bright crescent moon above the woods when they turned back."
    ],
    fixes: [
      { sentence: 3, wrong: "owl”", right: "owl?”", slip: "owl.”", kind: "punctuation" },
      { sentence: 5, wrong: "snufling", right: "snuffling", slip: "snufffling", kind: "spelling" },
      { sentence: 7, wrong: "Their", right: "There", slip: "They’re", kind: "word choice" },
      { sentence: 0, wrong: "of.", right: "off.", slip: "offe.", kind: "word choice" }
    ]
  }
];

function describe(fix) {
  return fix.kind === "spelling" ? "spelling" : fix.kind === "word choice" ? "word choice" : "punctuation";
}

export function buildProofreadingSpellingAndPunctuationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no proofreading level ${level}`);
  const [set] = sample(BANK, 1, rng);
  const passage = { title: set.title, blocks: [
    { type: "p", text: set.sentences.slice(0, 4).join(" ") },
    { type: "p", text: set.sentences.slice(4).join(" ") },
  ] };
  const fixed = new Set(set.fixes.map((f) => f.sentence));
  const hint = "Check the highlighted sentence. Look at each word, the punctuation marks and the end mark.";
  return set.fixes.slice(0, 4).map((fix) => {
    const sentence = set.sentences[fix.sentence];
    if (level === 2) {
      const clean = set.sentences.filter((_, index) => !fixed.has(index));
      return {
        kind: "sort", rule: RULE, prompt: `${RULE} Sort the sentences: correct or needs fixing?`,
        bins: [{ id: "right", label: "Correct" }, { id: "wrong", label: "Needs fixing" }],
        cards: shuffle([
          ...sample(clean, 2, rng).map((label, index) => ({ id: `r${index}`, label, bin: "right" })),
          ...sample(set.fixes, 2, rng).map((f, index) => ({ id: `w${index}`, label: set.sentences[f.sentence], bin: "wrong" })),
        ], rng),
        hint: "Two sentences need fixing. Check spelling, word choice and punctuation.",
      };
    }
    if (level === 3) {
      const tokens = sentence.split(" ");
      const answer = tokens.findIndex((token) => token === fix.wrong);
      return {
        kind: "pick", rule: RULE, tokens, answer, prompt: `${RULE} Tap the word with an error in its ${describe(fix)}.`,
        hinted: hintedWith(answer, tokens.map((_, i) => i), rng),
        hint: "Compare the underlined words. Which one needs fixing for the check named in the question?",
      };
    }
    return choiceQuestion({
      passage: level === 4 ? passage : undefined, text: level === 1 ? sentence : undefined,
      prompt: `${level === 1 ? `${RULE} ` : ""}In “${sentence}”, which change fixes the ${describe(fix)} error?`,
      answer: fix.right, wrong: [fix.wrong, fix.slip],
      para: [fix.sentence < 4 ? 0 : 1], hint, rng,
    });
  });
}
