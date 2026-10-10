/**
 * Bix's jokes: told on the homepage ("Tell me a joke", or a long press on
 * Bix) and at the end of a topic or anything bigger.
 *
 * Content, checked like any other content (`bixJokes.test.js`): short enough
 * to read aloud, British spelling, and kind — no put-downs, nothing scary,
 * nothing about real people or brands. Pitched at 6–8 year olds, so each one
 * leans on a word or idea they meet in Key Stage 1 or lower Key Stage 2.
 *
 * `nextJoke` is pure: it takes the ids already told and the randomness, and
 * never repeats a joke until every one has been heard. The caller decides
 * where the told list lives (the Mascot keeps it in sessionStorage — it is a
 * nicety, not learner data, and never goes near progress or rewards).
 */

export const JOKE_KINDS = ["maths", "science", "words"];

export const JOKES = [
  // ===== MATHS =====
  { id: "maths-belt", kind: "maths", setup: "What did the 0 say to the 8?", punchline: "Nice belt!" },
  { id: "maths-ruler", kind: "maths", setup: "Why did the ruler get a gold star?", punchline: "Because it always measured up!" },
  { id: "maths-seven-even", kind: "maths", setup: "How do you make the number seven even?", punchline: "Take away the s!" },
  { id: "maths-pirate-shape", kind: "maths", setup: "What is a pirate's favourite shape?", punchline: "An arrrr-ectangle!" },
  { id: "maths-right-angle", kind: "maths", setup: "Why is a right angle so good at quizzes?", punchline: "Because it's always right!" },
  { id: "maths-halves", kind: "maths", setup: "What did one half say to the other half?", punchline: "Together we make a whole lot of fun!" },
  { id: "maths-odd-socks", kind: "maths", setup: "Why does the number 7 wear odd socks?", punchline: "Because it's an odd number!" },
  { id: "maths-multipliers", kind: "maths", setup: "Which tool is the best at maths?", punchline: "Multi-pliers!" },
  { id: "maths-count-on", kind: "maths", setup: "Why is a calculator such a good friend?", punchline: "You can always count on it!" },
  { id: "maths-cows", kind: "maths", setup: "How do farmers count their cows?", punchline: "With a cow-culator!" },
  { id: "maths-four-eight", kind: "maths", setup: "Why did the two 4s skip lunch?", punchline: "They had already 8!" },
  { id: "maths-clock-seconds", kind: "maths", setup: "What does a clock do when it's hungry?", punchline: "It goes back four seconds!" },
  { id: "maths-three-thirty", kind: "maths", setup: "What did the 3 say when it met a 30?", punchline: "Wow, you've grown ten times bigger!" },
  { id: "maths-fair-square", kind: "maths", setup: "Why are squares so good at sharing?", punchline: "They always play fair and square!" },
  { id: "maths-brave-book", kind: "maths", setup: "Why is a maths book so brave?", punchline: "It's never scared of a problem!" },

  // ===== SCIENCE =====
  { id: "science-sun-school", kind: "science", setup: "Why did the Sun go to school?", punchline: "To get even brighter!" },
  { id: "science-thunderwear", kind: "science", setup: "What do clouds wear under their coats?", punchline: "Thunderwear!" },
  { id: "science-hi-bud", kind: "science", setup: "What did the big flower say to the little flower?", punchline: "Hi, bud!" },
  { id: "science-magnets", kind: "science", setup: "Why do magnets make such good friends?", punchline: "They find each other very attractive!" },
  { id: "science-caterpillar", kind: "science", setup: "Why did the caterpillar take such a long nap?", punchline: "It woke up feeling like a whole new butterfly!" },
  { id: "science-river-bank", kind: "science", setup: "Where do fish keep their money?", punchline: "In the river bank!" },
  { id: "science-snowman", kind: "science", setup: "What do you call a snowman on a hot summer's day?", punchline: "A puddle!" },
  { id: "science-ocean-wave", kind: "science", setup: "What did the sea say to the beach?", punchline: "Nothing — it just waved!" },
  { id: "science-skeleton", kind: "science", setup: "Why are skeletons always so calm?", punchline: "Nothing gets under their skin!" },
  { id: "science-dino-snore", kind: "science", setup: "What do you call a dinosaur that's fast asleep?", punchline: "A dino-snore!" },
  { id: "science-light-bulb", kind: "science", setup: "Why did the light bulb do so well at school?", punchline: "It was very bright!" },
  { id: "science-trees-log-in", kind: "science", setup: "How do trees get on the computer?", punchline: "They log in!" },
  { id: "science-shadow", kind: "science", setup: "Why does your shadow follow you everywhere?", punchline: "It doesn't want to be left in the dark!" },
  { id: "science-rock-music", kind: "science", setup: "What kind of music do rocks like best?", punchline: "Rock music, of course!" },

  // ===== WORDS =====
  { id: "words-envelope", kind: "words", setup: "What starts with E, ends with E and has only one letter in it?", punchline: "An envelope!" },
  { id: "words-a-flower", kind: "words", setup: "Why is the letter A like a flower?", punchline: "Because a B comes after it!" },
  { id: "words-smiles", kind: "words", setup: "What is the longest word in the world?", punchline: "Smiles — there's a mile between the first and last letter!" },
  { id: "words-post", kind: "words", setup: "Which letters are never in the alphabet?", punchline: "The ones in the post!" },
  { id: "words-full-stop", kind: "words", setup: "Why did the full stop go to bed early?", punchline: "It knew the sentence was over!" },
  { id: "words-wrong", kind: "words", setup: "Which word is spelt wrong in every dictionary?", punchline: "Wrong!" },
  { id: "words-rainbow", kind: "words", setup: "What is at the end of a rainbow?", punchline: "The letter w!" },
  { id: "words-march", kind: "words", setup: "What is in the middle of March?", punchline: "The letter r!" },
  { id: "words-tea", kind: "words", setup: "Which letter can you drink?", punchline: "T!" },
  { id: "words-sea", kind: "words", setup: "Which letter is full of fish?", punchline: "C!" },
  { id: "words-spine", kind: "words", setup: "What has a spine but not a single bone?", punchline: "A book!" },
  { id: "words-jacket", kind: "words", setup: "Why did the book feel chilly?", punchline: "It lost its jacket!" },
  { id: "words-thesaurus", kind: "words", setup: "What do you call a dinosaur that knows lots of words?", punchline: "A thesaurus!" },
];

/**
 * Chooses the next joke, never repeating one until the whole pool has been
 * told. Once it has, the cycle starts again — but never with the joke just
 * told, so two in a row are always different.
 *
 * @param {string[]} seenIds  ids told so far this cycle, oldest first
 * @param {() => number} rng  () => [0, 1), injectable for tests
 * @param {Array} pool        defaults to JOKES
 * @returns {{ joke: object, seen: string[] }} the joke and the updated told list
 */
export function nextJoke(seenIds = [], rng = Math.random, pool = JOKES) {
  const seen = new Set(seenIds);
  let fresh = pool.filter((joke) => !seen.has(joke.id));
  let told = seenIds.filter((id) => pool.some((joke) => joke.id === id));

  if (fresh.length === 0) {
    const last = seenIds[seenIds.length - 1];
    fresh = pool.length > 1 ? pool.filter((joke) => joke.id !== last) : pool;
    told = [];
  }

  const index = Math.min(fresh.length - 1, Math.max(0, Math.floor(rng() * fresh.length)));
  const joke = fresh[index];
  return { joke, seen: [...told, joke.id] };
}
