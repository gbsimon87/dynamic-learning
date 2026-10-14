import { findReadingPassage } from "../../english/passagesReading.js";
import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/**
 * Year 3 Predicting What Happens Next: "predicting what might happen from
 * details stated and implied".
 *
 *   1 predict   read a short opening, choose what will probably happen
 *   2 sort      sort clues to the prediction each one supports
 *   3 clue      tap the one sentence that is the clue for a prediction
 *   4 passage   a story: predict, find the clue, explain
 *
 * The wrong predictions are clearly UNSUPPORTED by the text (or go against
 * it), never "possible too". In level 3 every other sentence is neutral
 * setting, so only one sentence is a clue.
 */

export const PREDICT_ITEMS = [
  { text: "Dark clouds filled the sky. Leo heard a rumble of thunder.", emoji: "⛈️", answer: "It is going to rain.", wrong: ["Leo will put on sun cream.", "Leo will find a lost puppy."] },
  { text: "Priya’s balloon floated higher and higher. Then it drifted towards a prickly holly bush.", emoji: "🎈", answer: "The balloon will pop.", wrong: ["The balloon will turn into a bird.", "Priya will go swimming."] },
  { text: "Ellie carried a full glass of juice across the room. She did not see Biscuit’s ball on the floor in front of her.", emoji: "🧃", answer: "Ellie will trip and spill her juice.", wrong: ["Ellie will start to sing.", "Biscuit will do his homework."] },
  { text: "Zayn’s tummy rumbled. He had not eaten anything since breakfast, and it was nearly teatime.", emoji: "🍽️", answer: "Zayn will look for something to eat.", wrong: ["Zayn will build a snowman.", "Zayn will go to the dentist."] },
  { text: "Amara yawned and rubbed her eyes. It was very late, and her bed looked warm and cosy.", emoji: "🛏️", answer: "Amara will go to sleep.", wrong: ["Amara will run a race.", "Amara will bake a cake."] },
  { text: "Biscuit stood by the door with his lead in his mouth. He wagged his tail and looked up at Ellie.", emoji: "🐕", answer: "Ellie will take Biscuit for a walk.", wrong: ["Biscuit will fall asleep in his basket.", "Biscuit will climb a tree."] },
  { text: "Leo’s ice lolly dripped in the hot sun. He was too busy talking to notice.", emoji: "🍭", answer: "The ice lolly will melt.", wrong: ["The ice lolly will freeze harder.", "Leo will fly a kite."] },
  { text: "Priya tipped her chair back further and further. Her teacher said, “Careful!”", emoji: "🪑", answer: "Priya will fall off her chair.", wrong: ["Priya will win a medal.", "The teacher will start to dance."] },
  { text: "Zayn planted a sunflower seed and watered it every day. He put the pot on a sunny windowsill.", emoji: "🌱", answer: "The seed will grow into a plant.", wrong: ["The seed will turn into a carrot.", "Zayn will throw the pot away."] },
  { text: "Snow had fallen all night. In the morning, Amara pulled on her wellies, gloves and a woolly hat.", emoji: "❄️", answer: "Amara will go outside to play in the snow.", wrong: ["Amara will go for a swim in the sea.", "Amara will go back to bed."] },
  { text: "Leo wrapped a present and wrote a birthday card. Then he put on his party clothes.", emoji: "🎁", answer: "Leo will go to a party.", wrong: ["Leo will go to the dentist.", "Leo will wash the car."] },
  { text: "The wind was very strong. Ellie’s hat was not tied on.", emoji: "💨", answer: "The wind will blow Ellie’s hat away.", wrong: ["Ellie’s hat will get smaller.", "Ellie will plant a tree."] },
  { text: "Amara put the cake in the oven and forgot all about it. Soon, a smell of burning came from the kitchen.", emoji: "🎂", answer: "The cake will be burnt.", wrong: ["The cake will be perfect.", "Amara will go to the beach."] },
  { text: "The baby bird flapped its wings on the edge of the nest. Its mother chirped from a branch nearby.", emoji: "🐦", answer: "The baby bird will try to fly.", wrong: ["The baby bird will swim away.", "The baby bird will dig a hole."] },
  { text: "Priya’s mum put plates, knives and forks on the table. A delicious smell came from the kitchen.", emoji: "🍲", answer: "They will eat dinner.", wrong: ["They will go to bed.", "They will wash the car."] },
  { text: "The traffic light turned green. Dad pressed his foot on the pedal.", emoji: "🚦", answer: "The car will move forward.", wrong: ["The car will turn into a boat.", "Dad will get out and walk home."] },
  { text: "Zayn’s ice skates were laced up and his helmet was on. He stepped onto the ice rink.", emoji: "⛸️", answer: "Zayn will go skating.", wrong: ["Zayn will bake some bread.", "Zayn will go for a swim."] },
];

/**
 * Level 2. Each prediction has three clues that support it and nothing
 * else in this list. Two predictions are paired per question; pairs listed
 * in `AVOID_PAIRS` share a theme and are never shown together.
 */
export const PREDICTIONS = [
  { id: "rain", label: "🌧️ It is going to rain.", clues: ["Dark clouds are gathering.", "Thunder rumbles in the distance.", "People are opening their umbrellas."] },
  { id: "sleep", label: "😴 Leo is going to fall asleep.", clues: ["Leo yawns and his eyes keep closing.", "Leo snuggles down under his duvet.", "Leo’s head keeps nodding forward."] },
  { id: "party", label: "🎉 There is going to be a party.", clues: ["Balloons are tied to the gate.", "Guests are arriving with presents.", "Party hats are on every chair."] },
  { id: "walk", label: "🐕 Biscuit is going for a walk.", clues: ["Ellie clips on Biscuit’s lead.", "Biscuit waits by the front door, wagging his tail.", "Ellie puts on her walking boots."] },
  { id: "trip", label: "🤕 Zayn is going to trip over.", clues: ["Zayn’s shoelaces are undone and flapping.", "Zayn is running without looking where he is going.", "A skateboard is lying on the path in front of Zayn."] },
  { id: "swim", label: "🏊 Priya is going swimming.", clues: ["Priya packs her goggles and a towel.", "Priya puts on her swimming costume.", "Priya walks towards the pool."] },
  { id: "bake", label: "🧁 Amara is going to bake a cake.", clues: ["Amara weighs out flour and sugar.", "Amara cracks two eggs into a bowl.", "Amara greases a cake tin."] },
  { id: "grow", label: "🌻 The seed is going to grow.", clues: ["The seed is planted in damp soil.", "The pot sits in the warm sunshine.", "Zayn waters the seed every day."] },
  { id: "melt", label: "🍦 The ice cream is going to melt.", clues: ["The ice cream has been left on a hot car seat.", "Drips are running down the cone.", "Leo is too busy talking to lick his ice cream."] },
];

export const AVOID_PAIRS = [["party", "bake"]];

/** Level 3: the sentence at `answer` is the only clue for `prediction`. */
export const CLUE_ITEMS = [
  { prediction: "Leo will be late for school.", answer: 0, sentences: ["Leo looked at his clock and saw that school had started ten minutes ago.", "It was Tuesday morning.", "His school bag was by the door.", "His cat was asleep on the bed."] },
  { prediction: "Biscuit will get muddy.", answer: 2, sentences: ["Ellie let Biscuit out into the garden.", "The grass was very green.", "Biscuit ran straight towards a huge, squelchy puddle.", "A bird sang on the fence."] },
  { prediction: "Priya will win the race.", answer: 1, sentences: ["It was sports day.", "Priya was far ahead of everyone else, and the finish line was close.", "The sun was shining.", "Her family were watching."] },
  { prediction: "Zayn’s tower will fall down.", answer: 3, sentences: ["Zayn built a tower out of blocks.", "He used his favourite colours.", "His sister was reading a book.", "The tower began to wobble from side to side."] },
  { prediction: "Amara will get wet.", answer: 3, sentences: ["Amara walked to the shop.", "She was wearing her new trainers.", "The shop sold sweets and comics.", "Big drops of rain began to fall, and she had no umbrella."] },
  { prediction: "Ellie will find Biscuit under her bed.", answer: 2, sentences: ["Ellie could not find Biscuit anywhere.", "She looked in the kitchen.", "Then she heard a snore coming from under her bed.", "It was nearly dinner time."] },
  { prediction: "The baby will wake up.", answer: 2, sentences: ["Leo’s baby sister was asleep in her cot.", "Dad tiptoed out of the room.", "Then Leo dropped a pile of saucepans with a loud CRASH!", "The kitchen was tidy."] },
  { prediction: "Zayn will need a plaster.", answer: 2, sentences: ["Zayn was playing in the garden.", "He was wearing a red T-shirt.", "He tripped on a stone and grazed his knee.", "His dad was cooking dinner."] },
  { prediction: "The snowman will melt.", answer: 3, sentences: ["Amara and Priya built a snowman.", "They gave him a carrot nose.", "Amara named him Fred.", "The next morning, the sun came out and it was very warm."] },
  { prediction: "Leo will score a goal.", answer: 1, sentences: ["Leo’s team were playing on Saturday.", "Leo had the ball, and the goal in front of him was empty.", "His team wore blue shirts.", "It was a windy afternoon."] },
  { prediction: "Priya will go to the beach.", answer: 0, sentences: ["Priya packed a bucket, a spade and her swimming costume.", "Her favourite colour is green.", "Her brother was reading a comic.", "Mum looked for the car keys."] },
  { prediction: "The milk will spill.", answer: 1, sentences: ["Ellie poured milk into a glass.", "She filled it right to the top and kept on pouring.", "Biscuit was asleep on the rug.", "The kitchen clock ticked."] },
  { prediction: "Amara will plant some seeds.", answer: 1, sentences: ["Amara went into the garden.", "She dug some small holes in the soil and opened a packet of seeds.", "A robin sat on the fence.", "Her gran waved from the window."] },
  { prediction: "Zayn will fall asleep.", answer: 1, sentences: ["Zayn sat in the back of the car.", "His eyes kept closing, and his head drooped onto his chest.", "The radio was playing a song.", "Mum drove past the shops."] },
  { prediction: "Biscuit will eat the sausages.", answer: 2, sentences: ["Dad was cooking sausages for tea.", "The kitchen window was open.", "Biscuit licked his lips and crept towards the plate of sausages.", "Gran phoned to say hello."] },
  { prediction: "Priya’s kite will fly.", answer: 3, sentences: ["Priya took her kite to the hill.", "The kite was shaped like a fish.", "Her friend brought a flask of tea.", "Then a strong wind began to blow."] },
];

/** Level 4: four questions on one story. `para` is the hint's paragraph. */
export const PASSAGE_SETS = [
  {
    passage: "the-tree-house",
    questions: [
      { q: "What do you think Priya and Zayn will do next?", answer: "Use the sheet to make a roof.", wrong: ["Go swimming in the sea.", "Plant some flowers."], para: 2 },
      { q: "Which clue tells you that rain is coming?", answer: "Grey clouds were rolling in", wrong: ["the strongest branch", "an old blue sheet"], para: 1 },
      { q: "What do you think Zayn will use the hammer and nails for?", answer: "to fix the roof onto the tree house", wrong: ["to build a boat", "to mend his bike"], para: 2 },
      { q: "Zayn says, “We need to hurry.” Why?", answer: "He can see that it is going to rain.", wrong: ["He is late for school.", "He is hungry."], para: 1 },
    ],
  },
  {
    passage: "the-sandcastle",
    questions: [
      { q: "What do you think will happen to the sandcastle?", answer: "The sea will wash it away.", wrong: ["It will grow taller.", "It will turn into a real castle."], para: 2 },
      { q: "Which clue tells you the sea is coming closer?", answer: "Each wave came a little closer", wrong: ["four towers", "a wall made of shells"], para: 1 },
      { q: "Which clue in the last paragraph tells you something is about to happen?", answer: "a big wave was rolling towards the shore", wrong: ["Leo stood back", "the best sandcastle ever"], para: 2 },
      { q: "Do Leo and Amara know the sea is coming?", answer: "No, they are too busy to notice.", wrong: ["Yes, they are watching the waves.", "Yes, Leo is pointing at the sea."], para: 1 },
    ],
  },
  {
    passage: "the-birthday-cake",
    questions: [
      { q: "What do you think Biscuit will do next?", answer: "He will try to eat the cake.", wrong: ["He will hang up balloons.", "He will go upstairs to sleep."], para: 2 },
      { q: "Which clue tells you Biscuit wants the cake?", answer: "stretched up towards the table", wrong: ["Mum went into the garden", "put on her party dress"], para: 2 },
      { q: "Why does it matter that the kitchen is empty?", answer: "No one is there to stop Biscuit.", wrong: ["The kitchen needs cleaning.", "Biscuit is scared of the dark."], para: 1 },
      { q: "Where did Mum put the cake?", answer: "on the kitchen table", wrong: ["in the garden", "upstairs"], para: 0 },
    ],
  },
  {
    passage: "the-puddle",
    questions: [
      { q: "What do you think will happen next?", answer: "Leo will splash mud on Amara’s trainers.", wrong: ["Amara will buy new trainers.", "The puddles will freeze."], para: 2 },
      { q: "Which clue tells you Leo might splash Amara?", answer: "heading straight for the biggest puddle", wrong: ["Amara hopped carefully", "They cost a lot of money"], para: 2 },
      { q: "Why did Amara hop around the puddles?", answer: "She wanted to keep her trainers clean.", wrong: ["She was playing hopscotch.", "She had hurt her foot."], para: 1 },
      { q: "How do you think Mum will feel if the trainers get muddy?", answer: "cross", wrong: ["delighted", "sleepy"], para: 0 },
    ],
  },
  {
    passage: "the-ice-lolly",
    questions: [
      { q: "What do you think will happen to the ice lolly?", answer: "It will melt and drip everywhere.", wrong: ["It will freeze even harder.", "It will turn bright blue."], para: 2 },
      { q: "Which clue tells you the lolly is melting?", answer: "A pink drip ran down the stick", wrong: ["They chatted about football", "a strawberry ice lolly"], para: 2 },
      { q: "Why has Zayn not eaten his lolly?", answer: "He is busy talking to Priya.", wrong: ["He does not like strawberry.", "He gave it to Priya."], para: 1 },
      { q: "Where did Zayn buy the lolly?", answer: "from the van at the park", wrong: ["from a shop in town", "from Priya"], para: 0 },
    ],
  },
  {
    passage: "the-paint-pot",
    questions: [
      { q: "What do you think will happen next?", answer: "Biscuit’s tail will knock over the paint.", wrong: ["Biscuit will paint a picture.", "Priya will go to the seaside."], para: 2 },
      { q: "Which clue tells you the paint is in danger?", answer: "getting closer and closer to the pot of paint", wrong: ["a picture of the sea", "trotted into the room"], para: 2 },
      { q: "Why does Biscuit’s tail start to wag?", answer: "He is happy to see Priya.", wrong: ["He is scared of the paint.", "He wants to go outside."], para: 1 },
      { q: "Where was the pot of paint?", answer: "on the floor beside Priya", wrong: ["on the kitchen table", "in the garden"], para: 0 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

const avoided = (a, b) => AVOID_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

function predictQuestion(item, rng) {
  return choiceQuestion({
    emoji: item.emoji,
    text: item.text,
    prompt: "What will probably happen next?",
    answer: item.answer,
    wrong: item.wrong,
    hint: "Find the clues in the text. Which answer do the clues point to?",
    rng,
  });
}

/**
 * Five different pairs for a run, using every prediction before any is
 * used twice, so the same clues do not keep coming back.
 */
function sortPairs(rng) {
  for (;;) {
    const order = shuffle(PREDICTIONS, rng);
    const pairs = [];
    for (let index = 0; index + 1 < order.length; index += 2) pairs.push([order[index], order[index + 1]]);
    const last = order[order.length - 1];
    if (order.length % 2) pairs.push([last, sample(order.slice(0, -1), 1, rng)[0]]);
    const picked = pairs.slice(0, QUESTIONS_PER_CHALLENGE);
    if (picked.every(([a, b]) => !avoided(a.id, b.id))) return picked;
  }
}

function sortQuestion(pair, rng) {
  const cards = pair.flatMap((prediction) =>
    sample(prediction.clues, 2, rng).map((clue, index) => ({ id: `${prediction.id}-${index}`, label: clue, bin: prediction.id }))
  );
  return {
    kind: "sort",
    prompt: "Which prediction does each clue support?",
    bins: pair.map((prediction) => ({ id: prediction.id, label: prediction.label })),
    cards: shuffle(cards, rng),
    hint: "Two clues go with each prediction. Ask: does this clue make me think that will happen?",
  };
}

function clueQuestion(item, rng) {
  return {
    kind: "pick",
    variant: "sentences",
    prompt: `Prediction: ${item.prediction} Tap the sentence that gives the clue.`,
    tokens: item.sentences,
    answer: item.answer,
    hinted: hintedWith(item.answer, item.sentences.map((_, index) => index), rng, 1),
    hint: "It is one of the two underlined sentences. Which one makes you think the prediction will come true?",
  };
}

export function buildPredictingQuestions(level, rng) {
  if (level === 1) return sample(PREDICT_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => predictQuestion(item, rng));
  if (level === 2) return sortPairs(rng).map((pair) => sortQuestion(pair, rng));
  if (level === 3) return sample(CLUE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => clueQuestion(item, rng));
  if (level === 4) {
    const [set] = sample(PASSAGE_SETS, 1, rng);
    const passage = findReadingPassage(set.passage);
    return set.questions.map((item) =>
      choiceQuestion({
        passage,
        prompt: item.q,
        answer: item.answer,
        wrong: item.wrong,
        para: [item.para],
        hint: "Look for clues in the paragraph with the box around it.",
        rng,
      })
    );
  }
  throw new Error(`no predicting level ${level}`);
}
