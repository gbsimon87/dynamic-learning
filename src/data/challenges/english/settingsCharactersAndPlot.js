import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Settings, Characters and Plot: "in narratives, creating settings,
 * characters and plot". Composition is marked by the app, so every task is a
 * choice, a sort or an order; there is no free writing.
 *
 *   1 setting  choose the sentence that best describes a given setting, with
 *              sights, sounds and smells (rule shown)
 *   2 sort     sort story sentences into setting, character and plot
 *   3 order    put a plot in order: beginning, problem, solution, ending
 *   4 plan     one story with its opening and ending missing: choose the
 *              setting, the character for the role, the problem and the
 *              ending (four questions, no gloss)
 */

/**
 * Level 1. `right` describes THIS setting with the senses; `elsewhere`
 * describes a different place; `character` describes a person, not a place.
 * The hint strikes out `character`.
 */
export const SETTING_ITEMS = [
  { place: "a dark forest at night", emoji: "🌲", right: "Owls hooted and twigs cracked in the cold, dark wood.", elsewhere: "Waves splashed onto the hot, sandy beach.", character: "Leo was a funny boy who loved telling jokes." },
  { place: "a sunny beach", emoji: "🏖️", right: "Seagulls cried above the warm sand, and the air smelt of salt.", elsewhere: "Snow lay thick on the silent mountain.", character: "Priya was brave and would climb anything." },
  { place: "a busy market", emoji: "🛒", right: "Stallholders shouted, and the smell of fresh bread drifted between the stalls.", elsewhere: "The empty classroom was silent and still.", character: "Zayn was quiet and loved drawing." },
  { place: "an old castle", emoji: "🏰", right: "Cold wind whistled through the crumbling stone towers.", elsewhere: "Bright fish darted through the warm sea.", character: "Ellie was kind and always helped others." },
  { place: "a snowy mountain", emoji: "🏔️", right: "Icy snow crunched underfoot, and the wind howled around the peaks.", elsewhere: "Sunflowers swayed in the hot summer field.", character: "Amara was curious and asked lots of questions." },
  { place: "under the sea", emoji: "🐠", right: "Bubbles rose past swaying seaweed and shoals of silver fish.", elsewhere: "Dry sand blew across the empty desert.", character: "Biscuit was a cheeky dog who stole socks." },
  { place: "inside a spaceship", emoji: "🚀", right: "Lights blinked on the control panel, and the engines hummed softly.", elsewhere: "Hens clucked in the muddy farmyard.", character: "Leo had freckles and messy red hair." },
  { place: "a school hall at lunchtime", emoji: "🍕", right: "Chairs scraped, plates clattered and the hall smelt of hot pizza.", elsewhere: "Rain dripped from the leaves of the quiet jungle.", character: "Priya had long black hair and a loud laugh." },
  { place: "a steamy jungle", emoji: "🌴", right: "Parrots screeched, and hot, damp air hung between the giant leaves.", elsewhere: "Frost sparkled on the frozen pond.", character: "Zayn was shy and quiet." },
  { place: "a funfair", emoji: "🎡", right: "Music blared, rides whirled and the air smelt of sweet candyfloss.", elsewhere: "Moonlight shone on the still, silent lake.", character: "Ellie was gentle and never shouted." },
  { place: "a farm in the morning", emoji: "🐄", right: "A cockerel crowed, cows mooed and the smell of hay filled the barn.", elsewhere: "Traffic roared along the busy city street.", character: "Amara wore a bright yellow raincoat." },
  { place: "a hot desert", emoji: "🏜️", right: "The burning sun beat down on the endless golden sand dunes.", elsewhere: "Rain lashed against the lighthouse windows.", character: "Leo was always the first to laugh." },
  { place: "a busy city", emoji: "🏙️", right: "Car horns honked, and crowds hurried past the tall glass buildings.", elsewhere: "A tractor rumbled across the quiet field.", character: "Zayn carried his sketchbook everywhere." },
  { place: "a rainy playground", emoji: "🌧️", right: "Rain drummed on the slide, and puddles filled the empty playground.", elsewhere: "The hot sun shone on the busy beach.", character: "Priya was never scared of anything." },
  { place: "a spooky cave", emoji: "🦇", right: "Water dripped from the rocky roof, and the cave smelt damp and musty.", elsewhere: "Butterflies danced over the sunny meadow.", character: "Biscuit had floppy ears and a waggy tail." },
  { place: "a little bakery", emoji: "🥐", right: "Warm, sweet smells of cakes and fresh bread filled the little shop.", elsewhere: "Waves crashed against the dark rocks.", character: "Ellie had a kind, gentle voice." },
];

/**
 * Level 2. A setting sentence describes where or when, and nothing happens in
 * it. A character sentence says what someone is like. A plot sentence is an
 * event: something happens.
 */
export const STORY_SENTENCES = {
  setting: [
    "The forest was dark, cold and silent.",
    "The beach was covered in soft, golden sand.",
    "It was a frosty morning in the middle of winter.",
    "The old house stood alone at the top of a hill.",
    "The cave was damp and smelt musty.",
    "The busy market was full of noise and colour.",
    "It was midnight, and the moon was full.",
    "The classroom was bright and smelt of fresh paint.",
    "The jungle was hot, steamy and full of giant leaves.",
    "The castle had crumbling towers and a deep moat.",
    "The city streets were noisy and crowded.",
    "The garden was full of roses and buzzing bees.",
  ],
  character: [
    "Leo was a funny boy who loved telling jokes.",
    "Priya was brave and would climb anything.",
    "Zayn was quiet and loved drawing.",
    "Ellie was kind and always helped others.",
    "Amara was curious and asked lots of questions.",
    "Biscuit was a cheeky dog who stole socks.",
    "The old wizard had a long white beard and twinkly eyes.",
    "The giant was grumpy and had enormous feet.",
    "The queen was proud and never smiled.",
    "Leo had freckles and messy red hair.",
    "The pirate captain was loud and bossy.",
    "The little mouse was shy and very clever.",
  ],
  plot: [
    "Leo’s kite got stuck at the top of a tall tree.",
    "Biscuit ran off with the birthday cake.",
    "Priya found a secret door behind the bookcase.",
    "The children got lost on the way home.",
    "A storm blew the tent away in the night.",
    "Amara’s rocket landed on a strange planet.",
    "Zayn dropped the key into the river.",
    "Ellie rescued a kitten from the pond.",
    "The magic carpet flew everyone home.",
    "A dragon stole the king’s golden crown.",
    "The bridge broke just as Leo reached the middle.",
    "Priya won the race and lifted the cup.",
    "The lights went out in the middle of the show.",
    "A giant knocked on the castle door.",
  ],
};

export const SORT_BINS = [
  { id: "setting", label: "🏰 Setting" },
  { id: "character", label: "🧒 Character" },
  { id: "plot", label: "💥 Plot" },
];

/**
 * Level 3. Beginning, problem, how it is solved, ending, in that order. Each
 * event needs the one before it, so only one order works.
 */
export const PLOTS = [
  ["Leo took his new kite to the park.", "The wind blew the kite into a tall tree.", "Priya climbed the tree and freed the kite.", "Leo thanked Priya, and they flew the kite together."],
  ["Ellie baked a cake for her grandma’s birthday.", "Biscuit jumped up and knocked the cake on the floor.", "Ellie and her dad quickly baked another cake.", "Grandma blew out the candles on her new cake and smiled."],
  ["Zayn built a sandcastle on the beach.", "The tide came in and waves began to wash the sandcastle away.", "Zayn dug a deep moat to catch the water.", "The sandcastle stayed standing until it was time to go home."],
  ["Amara’s class went on a trip to the woods.", "Amara wandered off and got lost.", "She followed the sound of her teacher’s whistle.", "Everyone cheered when Amara came back."],
  ["Priya planted a seed in a pot and put it in a cupboard.", "The seed did not grow because the cupboard was dark.", "Priya moved the pot onto the sunny windowsill.", "Soon a tall sunflower grew in the pot."],
  ["Leo was the goalkeeper in the big match.", "He hurt his hand and could not carry on.", "Zayn put on the gloves and took his place in goal.", "Zayn saved the last shot, and the team won."],
  ["A little dragon lived alone in a cave.", "The dragon was sad because he had no friends.", "A brave girl came to the cave and played with him.", "The dragon and the girl became best friends."],
  ["Ellie and Biscuit went for a walk by the frozen pond.", "Biscuit ran onto the ice and it cracked.", "Ellie pulled him out with a long branch.", "They went home and dried off by the warm fire."],
  ["The king had a golden crown.", "One night a dragon stole the crown.", "A clever knight tricked the dragon into giving it back.", "The king gave the knight a big reward."],
  ["Amara made a cardboard rocket in the garden.", "It began to rain, and the rocket went soggy.", "She dried it out and covered it in tape.", "Her rocket was ready to play with again the next day."],
  ["Zayn entered a drawing competition.", "He spilt water all over his drawing.", "He started again and drew an even better picture.", "Zayn’s new picture won first prize."],
  ["Priya had a fluffy grey cat called Smudge.", "Smudge climbed onto the shed roof and could not get down.", "Priya’s mum fetched a ladder and lifted Smudge down.", "Smudge curled up on Priya’s lap and purred."],
  ["Leo had a wobbly tooth.", "He could not eat his apple because the tooth hurt.", "His dad gently pulled the tooth out.", "Leo put the tooth under his pillow and smiled."],
  ["Ellie’s class was putting on a play.", "Ellie forgot her words in the middle of the play.", "Amara whispered the words to her from the side of the stage.", "The audience clapped and cheered at the end."],
  ["A little boat sailed out to sea.", "A storm snapped the boat’s mast.", "A friendly whale pushed the boat back to shore.", "The sailors waved goodbye to the whale."],
  ["Zayn and Leo built a den in the woods.", "The wind blew the den down in the night.", "They built it again with stronger branches.", "The new den stayed up all summer."],
];

export const PLOT_STAGES = ["Beginning", "Problem", "Solution", "Ending"];

/**
 * Level 4. The story's middle is given; the questions fill in its setting,
 * a character for a role, its problem and its ending. Wrong options clash
 * with the story (a sunny beach in a thunderstorm) or are not the thing
 * asked for (a character sentence offered as a setting).
 */
export const STORY_PLANS = [
  {
    title: "Biscuit and the Storm",
    middle: "Biscuit hated storms. When the thunder crashed, he whimpered and hid under Ellie’s bed. Ellie lay down on the floor beside him. She stroked his ears and sang his favourite song very softly.",
    questions: [
      { q: "Which sentence would make the best opening setting?", answer: "Rain lashed against the windows of Ellie’s house, and thunder rumbled across the dark sky.", wrong: ["The sun shone brightly over the quiet beach.", "Biscuit was a cheeky dog who stole socks."] },
      { q: "Which sentence best describes Ellie in this story?", answer: "Ellie was kind and gentle.", wrong: ["Ellie was grumpy and bossy.", "Ellie was frightened of dogs."] },
      { q: "What is the problem in this story?", answer: "Biscuit is scared of the thunder.", wrong: ["Ellie has lost her shoe.", "Biscuit is hungry."] },
      { q: "Which ending fits the story best?", answer: "The storm passed, and Biscuit fell asleep on Ellie’s lap.", wrong: ["Biscuit won a gold medal at the Olympics.", "Ellie shouted at Biscuit and shut him outside in the rain."] },
    ],
  },
  {
    title: "The Treasure Map",
    middle: "Priya and Amara found an old map in a bottle. It showed a cross beside the tall rock at the end of the beach. They dug and dug, but the tide was coming in fast. The water was getting closer and closer.",
    questions: [
      { q: "Which sentence would make the best opening setting?", answer: "Seagulls cried above the sandy beach, and waves rolled gently onto the shore.", wrong: ["Snow fell softly on the busy city streets.", "Amara was curious and asked lots of questions."] },
      { q: "Priya keeps digging when the water comes. Which description fits her?", answer: "Priya was brave and never gave up.", wrong: ["Priya was lazy and hated hard work.", "Priya was scared of the sea and stayed at home."] },
      { q: "What is the problem in this story?", answer: "The tide is coming in before they find the treasure.", wrong: ["Priya and Amara cannot find the beach.", "Amara has broken her bicycle."] },
      { q: "Which ending fits the story best?", answer: "Just in time, their spades hit a wooden box, and they carried it up the beach.", wrong: ["They flew to the Moon in a rocket.", "They never found the map."] },
    ],
  },
  {
    title: "Zayn’s Robot",
    middle: "Zayn built a robot from boxes and bottle tops. He called it Bolt. On the day of the science fair, Bolt would not switch on. Zayn checked every wire, but nothing worked.",
    questions: [
      { q: "Which sentence would make the best opening setting?", answer: "The school hall was full of noisy children and tables covered in inventions.", wrong: ["The pirate ship rocked on the stormy sea.", "Zayn was quiet and loved building things."] },
      { q: "Zayn is the one who fixes the robot. Which description fits him?", answer: "Zayn was patient and clever with his hands.", wrong: ["Zayn was clumsy and broke everything he touched.", "Zayn hated building things."] },
      { q: "What is the problem in this story?", answer: "Bolt will not switch on at the science fair.", wrong: ["Zayn cannot find the school.", "Bolt runs away from Zayn."] },
      { q: "Which ending fits the story best?", answer: "Zayn found a loose battery, clicked it back in, and Bolt’s eyes lit up.", wrong: ["Zayn went swimming in the sea instead.", "Bolt turned into a real dinosaur and ate the school."] },
    ],
  },
  {
    title: "The Giant Pumpkin",
    middle: "Leo grew a giant pumpkin for the village show. On the morning of the show, it was too heavy to lift into the wheelbarrow. Leo pushed and pulled, but it would not move.",
    questions: [
      { q: "Which sentence would make the best opening setting?", answer: "Mist drifted over the vegetable patch on a chilly autumn morning.", wrong: ["The spaceship zoomed past the stars.", "Leo was funny and loved telling jokes."] },
      { q: "Leo needs a helper who is very strong. Which description fits?", answer: "Leo’s grandad was big and strong, with huge hands.", wrong: ["Leo’s baby cousin was tiny and still learning to walk.", "Leo’s cat was sleepy and lazy."] },
      { q: "What is the problem in this story?", answer: "The pumpkin is too heavy to move.", wrong: ["The pumpkin is too small for the show.", "Leo has lost his football."] },
      { q: "Which ending fits the story best?", answer: "Together they rolled the pumpkin to the show, and it won first prize.", wrong: ["Leo ate the pumpkin for breakfast on the Moon.", "The pumpkin floated away like a balloon."] },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

function settingQuestion(item, rng) {
  return {
    kind: "setting",
    place: item.place,
    emoji: item.emoji,
    answer: item.right,
    struck: item.character,
    options: shuffle([item.right, item.elsewhere, item.character], rng),
  };
}

/** Level 2: six cards a question, two of each kind, none repeated in a run. */
function buildSortQuestions(rng) {
  const drawn = Object.fromEntries(
    SORT_BINS.map((bin) => [bin.id, sample(STORY_SENTENCES[bin.id], QUESTIONS_PER_CHALLENGE * 2, rng)])
  );
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) => {
    const cards = SORT_BINS.flatMap((bin) =>
      drawn[bin.id].slice(index * 2, index * 2 + 2).map((label, n) => ({ id: `${bin.id}${n}`, label, bin: bin.id }))
    );
    return { kind: "sort", bins: SORT_BINS, cards: shuffle(cards, rng) };
  });
}

/** A shuffle that is never already the answer. */
export function scrambled(items, rng) {
  let out = shuffle(items, rng);
  for (let tries = 0; tries < 20 && out.every((item, index) => item === items[index]); tries += 1) {
    out = shuffle(items, rng);
  }
  if (out.every((item, index) => item === items[index])) out = [...items.slice(1), items[0]];
  return out;
}

function orderQuestion(plot, rng) {
  const items = plot.map((label, index) => ({ id: `e${index}`, label }));
  return { kind: "order", answer: items.map((item) => item.id), first: plot[0], items: scrambled(items, rng) };
}

function planQuestions(plan, rng) {
  return plan.questions.map((item, step) => ({
    kind: "plan",
    title: plan.title,
    middle: plan.middle,
    step,
    q: item.q,
    answer: item.answer,
    struck: item.wrong[0],
    options: shuffle([item.answer, ...item.wrong], rng),
  }));
}

export function buildStoryQuestions(level, rng) {
  if (level === 1) return sample(SETTING_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => settingQuestion(item, rng));
  if (level === 2) return buildSortQuestions(rng);
  if (level === 3) return sample(PLOTS, QUESTIONS_PER_CHALLENGE, rng).map((plot) => orderQuestion(plot, rng));
  if (level === 4) return planQuestions(sample(STORY_PLANS, 1, rng)[0], rng);
  throw new Error(`no settings, characters and plot level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function isOrderCorrect(question, items) {
  return items.length === question.answer.length && items.every((item, index) => item.id === question.answer[index]);
}
