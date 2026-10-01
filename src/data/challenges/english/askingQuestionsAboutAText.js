import { findReadingPassage } from "../../english/passagesReading.js";
import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/**
 * Year 3 Asking Questions about a Text: "asking questions to improve their
 * understanding of a text".
 *
 *   1 word      which question word (who, where, when, why, how) does this
 *               piece of information answer?
 *   2 sort      a short text and four questions: does the text answer it,
 *               or not say?
 *   3 tap       tap the part of a sentence that answers a question
 *   4 passage   a story: which question it can answer, which it cannot,
 *               which question would help you understand a part, and an
 *               answer found in the text
 *
 * "Not answered" questions are about things the text never mentions, not
 * things a reader might guess, so the sort has one right answer.
 */

export const QUESTION_WORDS = ["Who", "Where", "When", "Why", "How"];

export const INFO_ITEMS = [
  { info: "at the swimming pool", answer: "Where", wrong: ["When", "Who"] },
  { info: "Leo’s grandma", answer: "Who", wrong: ["Where", "Why"] },
  { info: "on Saturday morning", answer: "When", wrong: ["Where", "How"] },
  { info: "because it was raining", answer: "Why", wrong: ["Who", "When"] },
  { info: "by bus", answer: "How", wrong: ["Who", "When"] },
  { info: "under the bed", answer: "Where", wrong: ["When", "Why"] },
  { info: "after lunch", answer: "When", wrong: ["Who", "How"] },
  { info: "a tall teacher called Mr Green", answer: "Who", wrong: ["When", "Where"] },
  { info: "because she was hungry", answer: "Why", wrong: ["Where", "How"] },
  { info: "by mixing flour, eggs and sugar", answer: "How", wrong: ["Who", "When"] },
  { info: "in the summer holidays", answer: "When", wrong: ["Who", "How"] },
  { info: "in the middle of the forest", answer: "Where", wrong: ["Who", "Why"] },
  { info: "so that he would not be late", answer: "Why", wrong: ["Who", "Where"] },
  { info: "very slowly and carefully", answer: "How", wrong: ["Who", "Where"] },
  { info: "Ellie and her dog", answer: "Who", wrong: ["When", "Why"] },
  { info: "at midnight", answer: "When", wrong: ["Where", "Who"] },
  { info: "on top of the hill", answer: "Where", wrong: ["How", "When"] },
  { info: "because the bridge was broken", answer: "Why", wrong: ["Who", "When"] },
];

/** Level 2: two questions the text answers, two it never mentions. */
export const ANSWERABLE_TEXTS = [
  { text: "Amara visited the farm on Monday. She fed the lambs with a bottle of milk.", yes: ["When did Amara visit the farm?", "What did Amara feed the lambs?"], no: ["Who went with Amara?", "How many lambs were there?"] },
  { text: "Leo lost his football in the park. He found it under a bench.", yes: ["Where did Leo lose his football?", "Where did Leo find his football?"], no: ["What colour is the football?", "Who gave Leo the football?"] },
  { text: "Priya climbed to the top of the climbing wall. She rang the bell at the top.", yes: ["What did Priya climb?", "What did Priya ring?"], no: ["How old is Priya?", "When did Priya climb the wall?"] },
  { text: "Zayn built a model boat out of a plastic bottle. He sailed it on the pond.", yes: ["What did Zayn make his boat from?", "Where did Zayn sail his boat?"], no: ["Who helped Zayn?", "What did Zayn name his boat?"] },
  { text: "Ellie took Biscuit to the vet because he had a sore paw.", yes: ["Why did Ellie take Biscuit to the vet?", "Who took Biscuit to the vet?"], no: ["What is the vet’s name?", "When did they go to the vet?"] },
  { text: "On Friday, the class planted three apple trees in the school field.", yes: ["When did the class plant the trees?", "How many trees did they plant?"], no: ["Who dug the holes?", "Why did they plant apple trees?"] },
  { text: "Grandad made pancakes for breakfast. Leo ate four of them.", yes: ["Who made the pancakes?", "How many pancakes did Leo eat?"], no: ["What did Grandad put on the pancakes?", "Where does Grandad live?"] },
  { text: "The library opens at nine o’clock. Amara borrowed a book about dinosaurs.", yes: ["When does the library open?", "What was Amara’s book about?"], no: ["How many books does the library have?", "Who wrote Amara’s book?"] },
  { text: "Priya’s cat, Tiger, sleeps in a basket by the fire.", yes: ["What is the name of Priya’s cat?", "Where does Tiger sleep?"], no: ["What does Tiger eat?", "How old is Tiger?"] },
  { text: "Zayn went to the beach with his uncle. They looked for crabs in the rock pools.", yes: ["Who did Zayn go to the beach with?", "What did they look for?"], no: ["Did they find any crabs?", "How did they get to the beach?"] },
  { text: "Ellie wore her wellies because the field was muddy.", yes: ["Why did Ellie wear her wellies?", "What did Ellie wear?"], no: ["What colour are Ellie’s wellies?", "Who was with Ellie?"] },
  { text: "The school fair was on Saturday. Leo won a goldfish at the hook-a-duck stall.", yes: ["When was the school fair?", "What did Leo win?"], no: ["What did Leo name his goldfish?", "How much did the game cost?"] },
  { text: "Amara practised the recorder every evening, so she played perfectly in the concert.", yes: ["When did Amara practise?", "What instrument does Amara play?"], no: ["Where was the concert?", "Which song did Amara play?"] },
  { text: "Biscuit chewed Dad’s slipper while everyone was at the shops.", yes: ["What did Biscuit chew?", "Where was everyone?"], no: ["What time did they come home?", "Which shops did they go to?"] },
  { text: "Priya and Zayn made a den in the woods using sticks and an old sheet.", yes: ["Where did they make a den?", "What did they use to make the den?"], no: ["How long did it take?", "Who had the idea?"] },
  { text: "Leo’s train set has a red engine and six carriages.", yes: ["What colour is the engine?", "How many carriages are there?"], no: ["Who gave Leo the train set?", "Where does Leo keep it?"] },
];

/**
 * Level 3. A sentence in chunks; `asks` maps a question to the ONE chunk
 * that answers it.
 */
export const CHUNKED_SENTENCES = [
  { chunks: ["Leo", "played football", "in the park", "on Saturday", "because it was sunny."], asks: [["Who played football?", 0], ["Where did Leo play football?", 2], ["When did Leo play football?", 3], ["Why did Leo play football outside?", 4]] },
  { chunks: ["After school,", "Amara", "walked", "to the library", "to return her book."], asks: [["When did Amara walk to the library?", 0], ["Who walked to the library?", 1], ["Where did Amara walk to?", 3], ["Why did Amara go to the library?", 4]] },
  { chunks: ["In the kitchen,", "Zayn", "mended the broken vase", "with strong glue."], asks: [["Where did Zayn mend the vase?", 0], ["Who mended the vase?", 1], ["How did Zayn mend the vase?", 3]] },
  { chunks: ["On Monday,", "Priya", "went to the dentist", "because her tooth hurt."], asks: [["When did Priya go to the dentist?", 0], ["Who went to the dentist?", 1], ["Why did Priya go to the dentist?", 3]] },
  { chunks: ["Ellie", "found Biscuit", "behind the shed", "at teatime."], asks: [["Who found Biscuit?", 0], ["Where did Ellie find Biscuit?", 2], ["When did Ellie find Biscuit?", 3]] },
  { chunks: ["Grandma", "travelled to London", "by train", "for Leo’s birthday."], asks: [["Who travelled to London?", 0], ["How did Grandma travel to London?", 2], ["Why did Grandma go to London?", 3]] },
  { chunks: ["At midnight,", "an owl", "hooted", "from the top of the oak tree."], asks: [["When did the owl hoot?", 0], ["Where did the owl hoot from?", 3]] },
  { chunks: ["Zayn and Leo", "built a snowman", "in the garden", "after breakfast."], asks: [["Who built a snowman?", 0], ["Where did they build the snowman?", 2], ["When did they build the snowman?", 3]] },
  { chunks: ["The cat", "hid", "under the car", "because of the loud fireworks."], asks: [["Where did the cat hide?", 2], ["Why did the cat hide?", 3]] },
  { chunks: ["In the summer,", "Amara’s family", "went", "to Scotland", "in their old blue van."], asks: [["When did Amara’s family go to Scotland?", 0], ["Who went to Scotland?", 1], ["Where did Amara’s family go?", 3], ["How did Amara’s family travel?", 4]] },
];

/** Level 4: four questions on one story. */
export const PASSAGE_SETS = [
  {
    passage: "missing-carrots",
    questions: [
      { q: "Which question does the story answer?", answer: "Who was taking the carrots?", wrong: ["How old is Amara?", "What colour is Gran’s shed?"], para: 2 },
      { q: "Which question does the story NOT answer?", answer: "What did Gran do about the rabbit?", wrong: ["How many carrots went missing on Monday?", "Where did Amara hide?"], para: 2 },
      { q: "Amara found a fluffy white tuft on the fence. Which question would help you understand why it matters?", answer: "Which animal might the white tuft come from?", wrong: ["What is Amara’s favourite colour?", "What time does Gran eat breakfast?"], para: 1 },
      { q: "When did Amara see the thief?", answer: "as the sun went down", wrong: ["early in the morning", "at lunchtime"], para: 2 },
    ],
  },
  {
    passage: "zayns-volcano",
    questions: [
      { q: "Which question does the story answer?", answer: "What did Zayn make the volcano out of?", wrong: ["Who is Zayn’s teacher?", "How long did the paint take to dry?"], para: 0 },
      { q: "Which question does the story NOT answer?", answer: "Why does vinegar make foam?", wrong: ["What did Zayn win?", "What colour was the foam?"], para: 2 },
      { q: "A reader is not sure what “lava” means. Which question would help them?", answer: "What comes out of a real volcano?", wrong: ["What did Zayn have for lunch?", "How many people were at the fair?"], para: 2 },
      { q: "Why did everyone clap?", answer: "The foam poured out like lava.", wrong: ["Zayn sang a song.", "The volcano fell over."], para: 2 },
    ],
  },
  {
    passage: "priyas-sunflower",
    questions: [
      { q: "Which question does the story answer?", answer: "When did Priya plant the seed?", wrong: ["Where did Priya buy the seed?", "What did Priya name her sunflower?"], para: 0 },
      { q: "Which question does the story NOT answer?", answer: "How much water did Priya give it each day?", wrong: ["Who helped Priya move the plant?", "How tall did the sunflower grow?"], para: 1 },
      { q: "A reader is surprised that the flower turned to face the sun. Which question would help them find out more?", answer: "Why do sunflowers turn to face the sun?", wrong: ["What colour is Priya’s front door?", "Where does Dad keep the tape measure?"], para: 2 },
      { q: "How tall was the sunflower in August?", answer: "two metres", wrong: ["two centimetres", "ten metres"], para: 2 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

function infoQuestion(item, rng) {
  return choiceQuestion({
    prompt: "Which question word does this answer?",
    focus: `“${item.info}”`,
    answer: item.answer,
    wrong: item.wrong,
    hint: "Is it a person (who), a place (where), a time (when), a reason (why) or the way something is done (how)?",
    rng,
  });
}

function sortQuestion(item, rng) {
  const cards = [
    ...item.yes.map((label, index) => ({ id: `yes-${index}`, label, bin: "yes" })),
    ...item.no.map((label, index) => ({ id: `no-${index}`, label, bin: "no" })),
  ];
  return {
    kind: "sort",
    text: item.text,
    prompt: "Can you find the answer to each question in the text?",
    bins: [
      { id: "yes", label: "✅ The text tells us" },
      { id: "no", label: "❓ The text does not say" },
    ],
    cards: shuffle(cards, rng),
    hint: "Two questions are answered and two are not. For each one, point to the words that answer it. No words? The text does not say.",
  };
}

function chunkQuestion(item, rng) {
  const [[q, answer]] = sample(item.asks, 1, rng);
  return {
    kind: "pick",
    prompt: `${q} Tap the part of the sentence that answers it.`,
    tokens: item.chunks,
    answer,
    hinted: hintedWith(answer, item.chunks.map((_, index) => index), rng, 1),
    hint: `Look at the question word: “${q.split(" ")[0]}”. It is one of the two underlined parts.`,
  };
}

export function buildAskingQuestionsQuestions(level, rng) {
  if (level === 1) return sample(INFO_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => infoQuestion(item, rng));
  if (level === 2) return sample(ANSWERABLE_TEXTS, QUESTIONS_PER_CHALLENGE, rng).map((item) => sortQuestion(item, rng));
  if (level === 3) return sample(CHUNKED_SENTENCES, QUESTIONS_PER_CHALLENGE, rng).map((item) => chunkQuestion(item, rng));
  if (level === 4) {
    const [set] = sample(PASSAGE_SETS, 1, rng);
    const passage = findReadingPassage(set.passage);
    return set.questions.map((item) =>
      choiceQuestion({
        passage,
        prompt: item.q,
        answer: item.answer,
        wrong: item.wrong,
        // A "NOT" question has no paragraph to point at; its hint says how to work it out.
        para: /\bNOT\b/.test(item.q) ? undefined : [item.para],
        hint: /\bNOT\b/.test(item.q)
          ? "Two of these questions ARE answered in the story. Find their answers, and the one left over is not answered."
          : "Read the paragraph with the box around it. Can you point to the words that help?",
        rng,
      })
    );
  }
  throw new Error(`no asking questions level ${level}`);
}
