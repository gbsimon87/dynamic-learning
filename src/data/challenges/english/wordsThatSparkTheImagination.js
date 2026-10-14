import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith, markedTokens } from "./readingKit.js";

/**
 * Year 3 Words That Spark the Imagination: "discussing words and phrases
 * that capture the reader’s interest and imagination".
 *
 *   1 choose    a gap: pick the vivid word over two plain words that also fit
 *   2 sort      sort phrases by the sense they bring alive: see, hear, feel
 *   3 tap       tap the one vivid word in a sentence (every other word is plain)
 *   4 picture   a sentence with an image (simile, metaphor, personification):
 *               what does the phrase help you imagine?
 *
 * Each level has its own bank, so no sentence is met twice across levels.
 */

/** Level 1: both plain words make a sensible sentence; only one paints a picture. */
export const ITEMS = [
  { sentence: "The stream ___ over the stones.", answer: "babbled", wrong: ["went", "moved"] },
  { sentence: "The stars ___ in the dark sky.", answer: "twinkled", wrong: ["were", "stayed"] },
  { sentence: "The old door ___ as Zayn opened it.", answer: "creaked", wrong: ["moved", "went"] },
  { sentence: "Dry leaves ___ under Leo’s boots.", answer: "crunched", wrong: ["were", "stayed"] },
  { sentence: "The thunder ___ above the hills.", answer: "rumbled", wrong: ["happened", "was"] },
  { sentence: "Rain ___ on the roof.", answer: "drummed", wrong: ["fell", "was"] },
  { sentence: "The hungry lion ___ at the crowd.", answer: "roared", wrong: ["looked", "turned"] },
  { sentence: "Biscuit ___ across the muddy field.", answer: "raced", wrong: ["went", "moved"] },
  { sentence: "Gran’s soup ___ in the pot.", answer: "bubbled", wrong: ["was", "sat"] },
  { sentence: "The tired giant ___ up the hill.", answer: "trudged", wrong: ["walked", "went"] },
  { sentence: "Snowflakes ___ down from the sky.", answer: "drifted", wrong: ["came", "went"] },
  { sentence: "The kitten ___ on the ball of wool.", answer: "pounced", wrong: ["sat", "was"] },
  { sentence: "The fire ___ in the fireplace.", answer: "crackled", wrong: ["was", "stayed"] },
  { sentence: "Leo ___ his hot chocolate.", answer: "slurped", wrong: ["had", "drank"] },
  { sentence: "The bees ___ around the flowers.", answer: "buzzed", wrong: ["were", "went"] },
  { sentence: "A mouse ___ under the cupboard.", answer: "scurried", wrong: ["went", "got"] },
];

/** Level 2: each phrase brings alive one sense. */
export const PHRASES = {
  see: ["a golden sunset", "sparkling frost", "a flash of lightning", "a rainbow of colours", "glittering stars", "bright yellow daffodils", "a dazzling light", "a gleaming silver crown", "flickering candles", "a shiny red apple"],
  hear: ["the rumble of thunder", "a creaking stair", "a dog yapping", "the crunch of footsteps", "bells jingling", "a whispering voice", "a squeaky gate", "waves crashing", "an owl hooting", "a buzzing bee"],
  feel: ["a prickly hedgehog", "freezing fingers", "silky fur", "a scratchy jumper", "sticky honey on my hands", "a soft, fluffy blanket", "warm sand under my toes", "a sharp pinch", "an icy wind on my cheeks", "a rough, bumpy rock"],
};

export const SENSES = [
  { id: "see", label: "👀 See" },
  { id: "hear", label: "👂 Hear" },
  { id: "feel", label: "✋ Feel" },
];

/** Level 3: the [bracketed] word is the only vivid word in the sentence. */
export const TAP_SENTENCES = [
  "The ghost [shrieked] in the attic.",
  "Leo [gobbled] his dinner.",
  "The car [screeched] to a stop.",
  "Amara [tiptoed] past the baby.",
  "The puppy [wriggled] in my arms.",
  "The rocket [zoomed] into space.",
  "The jelly [wobbled] on the plate.",
  "Zayn [splashed] into the pool.",
  "The pirate [snarled] at his crew.",
  "Priya [giggled] at the joke.",
  "The bacon [sizzled] in the pan.",
  "The frog [plopped] into the pond.",
];

/** Level 4: a sentence with an image, and what the image helps you picture. */
export const IMAGES = [
  { text: "The wind howled like a hungry wolf all night.", phrase: "howled like a hungry wolf", answer: "a loud, wild wind", wrong: ["a gentle breeze", "a real wolf in the garden"] },
  { text: "Snow lay like a thick white blanket over the town.", phrase: "like a thick white blanket", answer: "deep snow covering everything", wrong: ["a blanket left outside", "a few small snowflakes"] },
  { text: "Leo’s legs turned to jelly when he walked on stage.", phrase: "legs turned to jelly", answer: "Leo felt wobbly and nervous", wrong: ["Leo ate some jelly", "Leo felt strong and calm"] },
  { text: "The classroom was as quiet as a mouse.", phrase: "as quiet as a mouse", answer: "the room was very quiet", wrong: ["the room was full of mice", "the room was very noisy"] },
  { text: "The sun was a golden coin in the sky.", phrase: "a golden coin", answer: "a round, shining sun", wrong: ["money falling from the sky", "a dark, cloudy sky"] },
  { text: "Her eyes sparkled like stars when she opened the present.", phrase: "sparkled like stars", answer: "she was very happy and excited", wrong: ["her eyes were sore", "it was night time"] },
  { text: "The old house groaned in the storm.", phrase: "groaned", answer: "the house made creaking noises", wrong: ["someone in the house was ill", "the house was silent"] },
  { text: "After the swim, Zayn was as cold as ice.", phrase: "as cold as ice", answer: "Zayn was very cold", wrong: ["Zayn was made of ice", "Zayn was warm and cosy"] },
  { text: "The giant’s footsteps shook the ground like thunder.", phrase: "like thunder", answer: "loud, heavy footsteps", wrong: ["a real thunderstorm", "soft, quiet steps"] },
  { text: "The leaves danced in the autumn wind.", phrase: "danced", answer: "leaves blowing and swirling", wrong: ["leaves at a party", "leaves lying still"] },
];

export const QUESTIONS_PER_CHALLENGE = 5;

function chooseQuestion(item, rng) {
  return choiceQuestion({
    text: item.sentence,
    prompt: "Which word paints the best picture?",
    answer: item.answer,
    wrong: item.wrong,
    hint: "All three words fit. Which one lets you hear or see exactly how it happened?",
    rng,
  });
}

function sortQuestion(round, rng) {
  const cards = SENSES.flatMap(({ id }) => round[id].map((label, i) => ({ id: `${id}-${i}`, label, bin: id })));
  return {
    kind: "sort",
    prompt: "Does each phrase help you see it, hear it or feel it?",
    bins: SENSES,
    cards: shuffle(cards, rng),
    hint: "Imagine you are there. Would you use your eyes, your ears or your skin?",
  };
}

function tapQuestion(sentence, rng) {
  const { tokens, answer } = markedTokens(sentence);
  return {
    kind: "pick",
    prompt: "Tap the word that helps you picture exactly what happens.",
    tokens,
    answer,
    hinted: hintedWith(answer, tokens.map((_, i) => i), rng),
    hint: "One of the underlined words tells you exactly how it happened.",
  };
}

function imageQuestion(item, rng) {
  return choiceQuestion({
    text: item.text,
    prompt: `What does “${item.phrase}” help you imagine?`,
    answer: item.answer,
    wrong: item.wrong,
    hint: "The writer is not being exact. Close your eyes and picture it. What is it really like?",
    rng,
  });
}

export function buildSparkWordsQuestions(level, rng) {
  if (level === 1) return sample(ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => chooseQuestion(item, rng));
  if (level === 2) {
    const drawn = Object.fromEntries(SENSES.map(({ id }) => [id, sample(PHRASES[id], 2 * QUESTIONS_PER_CHALLENGE, rng)]));
    return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, i) =>
      sortQuestion(Object.fromEntries(SENSES.map(({ id }) => [id, drawn[id].slice(2 * i, 2 * i + 2)])), rng)
    );
  }
  if (level === 3) return sample(TAP_SENTENCES, QUESTIONS_PER_CHALLENGE, rng).map((sentence) => tapQuestion(sentence, rng));
  if (level === 4) return sample(IMAGES, QUESTIONS_PER_CHALLENGE, rng).map((item) => imageQuestion(item, rng));
  throw new Error(`no imagination level ${level}`);
}
