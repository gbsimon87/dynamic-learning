import { findReadingPassage } from "../../english/passagesReading.js";
import { bareWord, sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith, markedTokens } from "./readingKit.js";

/**
 * Year 3 Does It Make Sense?: "checking that the text makes sense to them,
 * discussing their understanding".
 *
 *   1 gap       choose the word that makes a sentence make sense
 *   2 sort      sort four sentences: makes sense / does not make sense
 *   3 tap       tap the one word in a sentence that does not make sense
 *   4 passage   a story with one wrong word and one sentence that does not
 *               belong: find the word, fix it, find the sentence, and say
 *               what happened
 *
 * Every item has exactly ONE problem. The wrong word clashes with several
 * other words in its sentence, so changing any other single word cannot
 * fix it.
 */

export const GAP_ITEMS = [
  { sentence: "Leo put on his ___ because it was raining.", answer: "coat", wrong: ["spoon", "pillow"] },
  { sentence: "Amara brushed her ___ before bed.", answer: "teeth", wrong: ["clouds", "soup"] },
  { sentence: "Biscuit wagged his ___ when Ellie came home.", answer: "tail", wrong: ["book", "spoon"] },
  { sentence: "Priya climbed up the ___ to reach the top bunk.", answer: "ladder", wrong: ["puddle", "carrot"] },
  { sentence: "Zayn used a ___ to draw a picture.", answer: "pencil", wrong: ["banana", "pillow"] },
  { sentence: "The baby was tired, so Dad put him in his ___.", answer: "cot", wrong: ["lunch box", "kettle"] },
  { sentence: "Ellie poured milk on her ___ for breakfast.", answer: "cereal", wrong: ["shoes", "homework"] },
  { sentence: "We need an umbrella because it is ___.", answer: "raining", wrong: ["quiet", "hungry"] },
  { sentence: "Leo kicked the ___ into the net.", answer: "ball", wrong: ["cloud", "soup"] },
  { sentence: "The ice cream melted because the sun was so ___.", answer: "hot", wrong: ["cold", "dark"] },
  { sentence: "Amara could not see in the dark, so she switched on the ___.", answer: "light", wrong: ["oven", "kettle"] },
  { sentence: "Priya was thirsty, so she drank a glass of ___.", answer: "water", wrong: ["sand", "socks"] },
  { sentence: "Zayn wrote a letter and put it in an ___.", answer: "envelope", wrong: ["egg", "ocean"] },
  { sentence: "The bird built its ___ in the tall tree.", answer: "nest", wrong: ["car", "bath"] },
  { sentence: "Ellie’s plant was dry, so she ___ it.", answer: "watered", wrong: ["ate", "posted"] },
  { sentence: "Biscuit barked when the ___ knocked at the door.", answer: "postman", wrong: ["teapot", "cushion"] },
  { sentence: "Leo cut the paper with a pair of ___.", answer: "scissors", wrong: ["socks", "spoons"] },
  { sentence: "At night, the ___ shone in the sky.", answer: "moon", wrong: ["sofa", "carrot"] },
  { sentence: "Amara’s hands were cold, so she put on her ___.", answer: "gloves", wrong: ["sunglasses", "sandals"] },
  { sentence: "Zayn rode his ___ to the park.", answer: "bike", wrong: ["bed", "cupboard"] },
];

/** Level 3. The [bracketed] word is the one that does not make sense. */
export const WRONG_WORD_SENTENCES = [
  "Leo put on his goggles and swimming costume, then dived into the [oven].",
  "Amara poured milk on her cereal and ate it with a [pillow].",
  "Zayn sharpened his pencil and began to [swim] a picture of a castle.",
  "Biscuit dug a hole in the garden and buried his [television].",
  "Ellie looked up at the night sky and counted the twinkling [carrots].",
  "Priya was so thirsty that she drank a whole glass of [sand].",
  "The hungry baby birds opened their beaks and waited for [shoes].",
  "Leo’s ice cream melted because the sun was so [cold].",
  "Mum put the candles on the birthday [sausage] and we sang to Zayn.",
  "Ellie dried her wet hair with a big, fluffy [sandwich].",
  "The firefighters sprayed [jam] on the fire until it went out.",
  "Priya climbed the tall tree and sat on a high [puddle].",
  "Leo kicked the ball past the goalkeeper and into the [teapot].",
  "Zayn put on his wellies and jumped in all the muddy [clouds].",
  "At the library, Ellie borrowed three [bananas] to read.",
  "Biscuit barked when the postman pushed the [elephant] through the letterbox.",
  "The farmer drove his [bathtub] across the field to the barn.",
  "Priya wrapped up warm in her coat, her scarf and her [swimsuit].",
  "Leo used a key to unlock the front [moon].",
];

/**
 * Level 4. Each passage has one wrong word (`word`, in paragraph `wordPara`)
 * and one sentence that does not belong (`odd`, in paragraph `oddPara`).
 */
export const PASSAGE_SETS = [
  {
    passage: "picnic-in-the-park",
    word: { para: 1, wrong: "ladder", others: ["duck", "crumbs"], fix: "sandwich", fixWrong: ["blanket", "bottle"] },
    odd: { para: 2, sentence: "Leo’s goldfish can play the piano.", others: ["Amara laughed and threw it a few crumbs.", "They put sandwiches, apples and a bottle of juice into a basket."] },
    understand: { q: "Why did Amara and Leo run home?", answer: "It started to rain.", wrong: ["The duck chased them.", "They had finished their juice."], para: 2 },
  },
  {
    passage: "zayns-rocket",
    word: { para: 2, wrong: "soup", others: ["paint", "rocket"], fix: "space", fixWrong: ["bed", "bath"] },
    odd: { para: 1, sentence: "Penguins live at the South Pole.", others: ["Then he taped them to the bottom of the bottle.", "Dad counted down from ten."] },
    understand: { q: "What did Zayn use to make the fins?", answer: "card", wrong: ["sticky tape", "paint"], para: 1 },
  },
  {
    passage: "biscuits-bath",
    word: { para: 1, wrong: "cloud", others: ["water", "bubbles"], fix: "bed", fixWrong: ["teapot", "spoon"] },
    odd: { para: 2, sentence: "A train can travel faster than a bicycle.", others: ["Biscuit did not like baths.", "Biscuit shook himself, and water splashed everywhere."] },
    understand: { q: "Why did Ellie give Biscuit a bath?", answer: "He was covered in mud.", wrong: ["He asked for one.", "It was his birthday."], para: 0 },
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

const fill = (sentence, word) => sentence.replace("___", word);

function gapQuestion(item, rng) {
  return choiceQuestion({
    prompt: "Which word makes the sentence make sense?",
    focus: item.sentence.replace("___", "_____"),
    answer: item.answer,
    wrong: item.wrong,
    hint: "Try each word in the gap and read the whole sentence. Could it really happen?",
    rng,
  });
}

/** Two sentences filled with the right word, two with a wrong one. */
function sortQuestion(rng) {
  const items = sample(GAP_ITEMS, 4, rng);
  const cards = items.map((item, index) => {
    const sense = index < 2;
    const [wrong] = sample(item.wrong, 1, rng);
    return { id: `s${index}`, label: fill(item.sentence, sense ? item.answer : wrong), bin: sense ? "sense" : "nonsense" };
  });
  return {
    kind: "sort",
    prompt: "Read each sentence. Does it make sense?",
    bins: [
      { id: "sense", label: "✅ Makes sense" },
      { id: "nonsense", label: "❌ Does not make sense" },
    ],
    cards: shuffle(cards, rng),
    hint: "Two sentences make sense and two do not. Picture each one: could it really happen?",
  };
}

function wrongWordQuestion(sentence, rng) {
  const { tokens, answer } = markedTokens(sentence);
  const candidates = tokens.map((_, index) => index).filter((index) => bareWord(tokens[index]).length >= 4);
  return {
    kind: "pick",
    prompt: "Tap the word that does not make sense.",
    tokens,
    answer,
    hinted: hintedWith(answer, candidates, rng, 2),
    hint: "It is one of the underlined words. Which one does not fit with the rest of the sentence?",
  };
}

function passageQuestions(set, rng) {
  const passage = findReadingPassage(set.passage);
  const { word, odd, understand } = set;
  return [
    choiceQuestion({
      passage,
      prompt: `One word in paragraph ${word.para + 1} does not make sense. Which word is it?`,
      answer: word.wrong,
      wrong: word.others,
      para: [word.para],
      hint: "Read the paragraph with the box around it, one sentence at a time.",
      rng,
    }),
    choiceQuestion({
      passage,
      prompt: `Which word should go where “${word.wrong}” is?`,
      answer: word.fix,
      wrong: word.fixWrong,
      para: [word.para],
      hint: `Read the sentence again with each word in place of “${word.wrong}”.`,
      rng,
    }),
    choiceQuestion({
      passage,
      prompt: "Which sentence does not belong in this story?",
      answer: odd.sentence,
      wrong: odd.others,
      para: [odd.para],
      hint: "Which sentence is not about what is happening in the story?",
      rng,
    }),
    choiceQuestion({
      passage,
      prompt: understand.q,
      answer: understand.answer,
      wrong: understand.wrong,
      para: [understand.para],
      hint: "The answer is in the paragraph with the box around it.",
      rng,
    }),
  ];
}

export function buildDoesItMakeSenseQuestions(level, rng) {
  if (level === 1) return sample(GAP_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => gapQuestion(item, rng));
  if (level === 2) return Array.from({ length: QUESTIONS_PER_CHALLENGE }, () => sortQuestion(rng));
  if (level === 3) return sample(WRONG_WORD_SENTENCES, QUESTIONS_PER_CHALLENGE, rng).map((s) => wrongWordQuestion(s, rng));
  if (level === 4) return passageQuestions(sample(PASSAGE_SETS, 1, rng)[0], rng);
  throw new Error(`no does-it-make-sense level ${level}`);
}
