import { bareWord, sample, shuffle } from "./shared.js";

/**
 * Year 3 Time and Cause Words: "using conjunctions, adverbs and prepositions
 * to express time and cause". Appendix 2 (Year 3): conjunctions [when,
 * before, after, while, so, because], adverbs [then, next, soon, therefore],
 * prepositions [before, after, during, in, because of].
 *
 *   1 choose  pick the word that fits (the WHEN and WHY lists are shown)
 *   2 sort    sort sentences: does the word tell us WHEN or WHY? (inferred)
 *   3 order   put a short recount in order, using its time words
 *   4 type    a mini-story with a gap: type the word from the box (no gloss)
 *
 * when, if, because and although belong to the Conjunctions topic, so they
 * are never answers here. Fronted adverbials (and the comma after them) are
 * Year 4: the words sit mid-sentence, or start a sentence plainly ("Then we
 * …"), and no question turns on a comma.
 */
export const TIME_WORDS = ["before", "after", "while", "during", "then", "next", "soon"];
export const CAUSE_WORDS = ["so", "therefore", "because of"];

/** Words that would also signal time or cause; a sort sentence may hold only its own. */
const SIGNAL_WORDS = new Set([...TIME_WORDS, "so", "therefore", "because", "when", "since", "until", "later", "first", "finally", "afterwards"]);

/**
 * Levels 1 and 2. `wrong` is chosen by hand so it clearly does NOT fit: most
 * gaps would take another time word too ("after lunch" beside "before
 * lunch"), so that word is never offered. A distractor is usually a word that
 * cannot sit in that grammatical slot at all (a preposition before a clause,
 * "during she waited"), or a cause word where nothing is caused.
 */
export const CHOOSE_ITEMS = [
  { sentence: "Wash your hands ___ you eat your lunch.", answer: "before", wrong: ["during", "therefore"], type: "time" },
  { sentence: "Biscuit fell asleep ___ the film.", answer: "during", wrong: ["so", "while"], type: "time" },
  { sentence: "Priya read her book ___ she waited for the bus.", answer: "while", wrong: ["during", "next"], type: "time" },
  { sentence: "Leo ate his tea. ___ he did his homework.", answer: "Then", wrong: ["During", "Because of"], type: "time" },
  { sentence: "The bus will be here ___.", answer: "soon", wrong: ["during", "while"], type: "time" },
  { sentence: "We mixed the flour and eggs. ___ we poured the mixture into a tin.", answer: "Next", wrong: ["During", "Because of"], type: "time" },
  { sentence: "Zayn finished his drawing ___ lunch.", answer: "before", wrong: ["while", "so"], type: "time" },
  { sentence: "Amara felt sleepy ___ the long walk.", answer: "after", wrong: ["while", "so"], type: "time" },
  { sentence: "Ellie sang ___ she washed the dishes.", answer: "while", wrong: ["during", "because of"], type: "time" },
  { sentence: "Nobody talked ___ the test.", answer: "during", wrong: ["while", "so"], type: "time" },
  { sentence: "Biscuit barked at the postman. ___ he ran and hid under the table.", answer: "Then", wrong: ["During", "Because of"], type: "time" },
  { sentence: "We will go swimming ___ school today.", answer: "after", wrong: ["while", "so"], type: "time" },
  { sentence: "Look both ways ___ you cross the road.", answer: "before", wrong: ["during", "therefore"], type: "time" },
  { sentence: "Grandma is coming to stay ___.", answer: "soon", wrong: ["during", "while"], type: "time" },
  { sentence: "Leo fell over ___ the race.", answer: "during", wrong: ["while", "so"], type: "time" },
  { sentence: "Plant the seeds. ___ water them every day.", answer: "Next", wrong: ["During", "Because of"], type: "time" },
  { sentence: "Priya stretched her legs ___ she ran the race.", answer: "before", wrong: ["during", "because of"], type: "time" },
  { sentence: "It was cold, ___ we put on our coats.", answer: "so", wrong: ["during", "because of"], type: "cause" },
  { sentence: "The match was stopped ___ the rain.", answer: "because of", wrong: ["so", "while"], type: "cause" },
  { sentence: "The river was deep and ___ dangerous.", answer: "therefore", wrong: ["during", "while"], type: "cause" },
  { sentence: "Leo forgot his umbrella, ___ he got wet.", answer: "so", wrong: ["during", "because of"], type: "cause" },
  { sentence: "The school was closed ___ the snow.", answer: "because of", wrong: ["so", "while"], type: "cause" },
  { sentence: "Zayn practised every day and ___ won the prize.", answer: "therefore", wrong: ["during", "while"], type: "cause" },
  { sentence: "Biscuit was hungry, ___ he ate Leo’s sandwich.", answer: "so", wrong: ["during", "because of"], type: "cause" },
  { sentence: "We could not see the stars ___ the clouds.", answer: "because of", wrong: ["so", "while"], type: "cause" },
  { sentence: "The ice was thin and ___ unsafe to walk on.", answer: "therefore", wrong: ["during", "while"], type: "cause" },
  { sentence: "It started to rain, ___ we went inside.", answer: "so", wrong: ["during", "because of"], type: "cause" },
  { sentence: "The train was late ___ the storm.", answer: "because of", wrong: ["so", "while"], type: "cause" },
  { sentence: "Ellie had a sore throat and ___ could not sing.", answer: "therefore", wrong: ["during", "while"], type: "cause" },
  { sentence: "The shop had run out of bread, ___ we bought rolls instead.", answer: "so", wrong: ["during", "because of"], type: "cause" },
  { sentence: "Amara’s kite flew high ___ the strong wind.", answer: "because of", wrong: ["so", "while"], type: "cause" },
];

/**
 * Level 3. Each recount is in the right order. The first sentence has no
 * time word; every later one has at least one, and the events follow from
 * each other, so only one order makes sense ("Then" and "Next" alone would
 * not decide it, so the content always does too).
 */
export const RECOUNTS = [
  ["Amara and her mum planted some sunflower seeds in a pot.", "Then they watered the seeds and put the pot on the windowsill.", "Soon tiny green shoots poked up through the soil.", "The shoots grew into tall sunflowers during the summer."],
  ["Leo put on his football kit and boots.", "Then he walked to the park with his dad.", "He scored two goals during the match.", "He fell asleep in the car after the match."],
  ["Priya and her grandad weighed the flour, sugar and butter.", "Next they mixed everything together in a big bowl.", "Then they baked the cake in the oven for half an hour.", "They ate a slice each after it had cooled down."],
  ["Biscuit crept into Ellie’s bedroom.", "He grabbed a sock while Ellie was brushing her teeth.", "Then he ran into the garden and buried it under a bush.", "Ellie found her muddy sock under the bush the next day."],
  ["Zayn’s class climbed onto the coach at nine o’clock.", "They sang songs during the journey to the castle.", "Next they explored the old castle towers.", "They had a picnic in the garden after they had explored the towers."],
  ["Ellie’s alarm clock rang at seven o’clock.", "Then she jumped out of bed and got dressed.", "She ate her breakfast before she brushed her teeth.", "Soon it was time to walk to school."],
  ["It snowed all night.", "Leo and Zayn ran outside after breakfast.", "Next they rolled two big snowballs to make a snowman.", "Then they gave the snowman a carrot nose."],
  ["Priya had a warm bath.", "Then she put on her pyjamas.", "Her dad read her a story while she snuggled under the covers.", "Soon she was fast asleep."],
  ["Amara walked to the library with her big brother.", "Then she chose three books about space.", "She read one of them while her brother used the computer.", "They walked home before it got dark."],
  ["Ellie and Biscuit went to the park for a picnic.", "Then dark clouds filled the sky.", "Soon it started to rain.", "They ran home before they got too wet."],
  ["Leo’s family drove to the seaside.", "He built a sandcastle while his sister paddled in the sea.", "Then the tide came in and washed the sandcastle away.", "They ate fish and chips before they drove home."],
  ["Zayn put on an apron and filled a pot with water.", "Next he painted a picture of a dragon.", "He left the picture to dry while he washed his brushes.", "Soon the picture was dry, so he hung it on the wall."],
  ["Priya’s front tooth had been wobbly for days.", "It fell out during lunch.", "She put the tooth under her pillow before she went to sleep.", "She found a shiny coin under her pillow when she woke up."],
  ["Amara packed her swimming costume and towel.", "Then she went to the swimming pool with her mum.", "She swam two lengths during her lesson.", "She had a hot chocolate after her lesson."],
  ["Biscuit chased a squirrel across the park.", "Then Ellie called his name again and again.", "Soon she heard a bark behind a big tree.", "Biscuit came out with a stick, so Ellie threw it for him."],
  ["Leo’s dad mixed eggs, milk and flour to make pancakes.", "Next he poured some of the mixture into a hot pan.", "Then he flipped the pancake high into the air.", "Leo ate the pancake with lemon and sugar after it had cooled a little."],
];

/**
 * Level 4. A two-sentence mini-story with one gap. The answer is one word
 * (so it can be typed); `box` is the answer plus words that clearly do not
 * fit. "because of" may sit in the box as a wrong word, never as an answer.
 */
export const STORY_ITEMS = [
  { text: "Zayn built a very tall tower of blocks. ___ it wobbled and fell down.", answer: "Then", box: ["During", "Because of"] },
  { text: "Amara’s dog rolled in the mud, ___ she gave him a bath.", answer: "so", box: ["during", "because of"] },
  { text: "The children must be quiet ___ the play. The actors need to hear each other.", answer: "during", box: ["so", "while"] },
  { text: "Leo always checks his bag ___ he leaves for school. He never forgets his lunch.", answer: "before", box: ["during", "because of"] },
  { text: "Priya hummed a tune ___ she tidied her room. She loves music.", answer: "while", box: ["during", "because of"] },
  { text: "Mix the paint with water. ___ paint a big yellow sun.", answer: "Next", box: ["During", "Because of"] },
  { text: "The pond froze ___ the cold night. It was solid ice by the morning.", answer: "during", box: ["so", "while"] },
  { text: "Ellie was very tired ___ the long walk. She went straight to bed.", answer: "after", box: ["while", "so"] },
  { text: "The road was icy and ___ dangerous. Mum drove very slowly.", answer: "therefore", box: ["during", "while"] },
  { text: "Biscuit heard the doorbell, ___ he ran to the door and barked.", answer: "so", box: ["during", "because of"] },
  { text: "Hurry up! The film will start ___.", answer: "soon", box: ["during", "while"] },
  { text: "Wipe your feet ___ you come inside. The floor is clean.", answer: "before", box: ["during", "because of"] },
  { text: "Leo’s shoes were too small, ___ his mum bought him a new pair.", answer: "so", box: ["during", "because of"] },
  { text: "Zayn fell asleep ___ the long car journey. He woke up at the seaside.", answer: "during", box: ["while", "so"] },
  { text: "The caterpillar ate lots of leaves. ___ it made a cosy chrysalis.", answer: "Next", box: ["During", "Because of"] },
  { text: "Amara finished her homework and ___ had time to play.", answer: "therefore", box: ["during", "while"] },
  { text: "The sky grew dark. ___ the first stars came out.", answer: "Soon", box: ["During", "Because of"] },
];

export const QUESTIONS_PER_CHALLENGE = 5;

/** "tells us WHEN" (time) or "tells us WHY" (cause), from the word itself. */
export function typeOf(word) {
  const lower = word.toLowerCase();
  if (TIME_WORDS.includes(lower)) return "time";
  if (CAUSE_WORDS.includes(lower)) return "cause";
  return null;
}

export const fill = (sentence, word) => sentence.replace("___", word);

/** Time and cause words in a sentence ("because of" counts once, as one). */
export function signalWords(sentence) {
  const words = sentence.split(/\s+/).map(bareWord);
  const found = [];
  words.forEach((word, index) => {
    if (word === "because" && words[index + 1] === "of") found.push("because of");
    else if (SIGNAL_WORDS.has(word)) found.push(word);
  });
  return found;
}

function chooseQuestion(item, rng) {
  return {
    kind: "choose",
    sentence: item.sentence,
    answer: item.answer,
    struck: item.wrong[0],
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

/** Level 2: four sentences per question, two WHEN and two WHY, none repeated in a run. */
function buildSortQuestions(rng) {
  const time = sample(CHOOSE_ITEMS.filter((item) => item.type === "time"), QUESTIONS_PER_CHALLENGE * 2, rng);
  const cause = sample(CHOOSE_ITEMS.filter((item) => item.type === "cause"), QUESTIONS_PER_CHALLENGE * 2, rng);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) => {
    const items = [time[index * 2], time[index * 2 + 1], cause[index * 2], cause[index * 2 + 1]];
    const cards = items.map((item, n) => ({
      id: `c${n}`,
      label: fill(item.sentence, item.answer),
      word: item.answer.toLowerCase(),
      bin: item.type,
    }));
    return { kind: "sort", bins: SORT_BINS, cards: shuffle(cards, rng) };
  });
}

export const SORT_BINS = [
  { id: "time", label: "⏰ tells us WHEN" },
  { id: "cause", label: "❓ tells us WHY" },
];

/** A shuffle that is never already the answer. */
export function scrambled(items, rng) {
  let out = shuffle(items, rng);
  for (let tries = 0; tries < 20 && out.every((item, index) => item === items[index]); tries += 1) {
    out = shuffle(items, rng);
  }
  if (out.every((item, index) => item === items[index])) out = [...items.slice(1), items[0]];
  return out;
}

function orderQuestion(recount, rng) {
  const items = recount.map((label, index) => ({ id: `s${index}`, label }));
  return { kind: "order", answer: items.map((item) => item.id), first: recount[0], items: scrambled(items, rng) };
}

function typeQuestion(item, rng) {
  return {
    kind: "type",
    text: item.text,
    answer: item.answer,
    box: shuffle([item.answer, ...item.box], rng),
    hint: `${item.answer[0].toLowerCase()}${" _".repeat(item.answer.length - 1)}`,
  };
}

export function buildTimeAndCauseQuestions(level, rng) {
  if (level === 1) return sample(CHOOSE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => chooseQuestion(item, rng));
  if (level === 2) return buildSortQuestions(rng);
  if (level === 3) return sample(RECOUNTS, QUESTIONS_PER_CHALLENGE, rng).map((recount) => orderQuestion(recount, rng));
  if (level === 4) return sample(STORY_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => typeQuestion(item, rng));
  throw new Error(`no time and cause words level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function isOrderCorrect(question, items) {
  return items.length === question.answer.length && items.every((item, index) => item.id === question.answer[index]);
}
