import { findPassage } from "../../english/passages.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Characters' Feelings: "drawing inferences such as inferring
 * characters' feelings, thoughts and motives from their actions, and
 * justifying inferences with evidence".
 *
 *   1 feeling   read 2–3 sentences, pick the feeling (shown with emoji)
 *   2 action    pick the sentence that SHOWS a given feeling
 *   3 evidence  tap the sentence in a short passage that shows the feeling
 *   4 passage   four questions on one longer story: feeling, evidence,
 *               motive, how the feeling changes
 *
 * Wrong options are chosen by hand so they clearly do NOT fit. A feeling that
 * also fits ("happy" beside "proud") is left out, never offered as wrong.
 */
export const FEELINGS = {
  happy: "😊", sad: "😢", angry: "😠", scared: "😨", excited: "🤩",
  nervous: "😬", proud: "😌", surprised: "😲", worried: "😟", bored: "🥱",
  embarrassed: "😳", sleepy: "😴", cross: "😤",
};

export const FEELING_TEXTS = [
  { text: "Zayn’s tower of blocks fell down for the third time. He kicked the floor and folded his arms.", answer: "angry", wrong: ["excited", "proud"] },
  { text: "Priya stood at the top of the high slide. Her knees shook and she gripped the rail tightly.", answer: "scared", wrong: ["bored", "proud"] },
  { text: "Leo opened the box and found the football boots he had wanted all year. He jumped up and down, shouting, “Yes!”", answer: "excited", wrong: ["sad", "scared"] },
  { text: "Ellie’s best friend moved to another town. Ellie sat by the window and a tear rolled down her cheek.", answer: "sad", wrong: ["excited", "angry"] },
  { text: "Amara’s painting won first prize. She held it up high and grinned at everyone.", answer: "proud", wrong: ["bored", "scared"] },
  { text: "It was Zayn’s first day at a new school. He held his dad’s hand tightly and his tummy felt full of butterflies.", answer: "nervous", wrong: ["bored", "angry"] },
  { text: "Biscuit had been inside all day with nothing to do. He yawned and flopped down on the rug.", answer: "bored", wrong: ["scared", "proud"] },
  { text: "Leo walked in, and everyone jumped out and shouted, “Surprise!” Leo’s mouth fell open.", answer: "surprised", wrong: ["bored", "angry"] },
  { text: "Ellie could not find Biscuit anywhere. She ran from room to room, calling his name.", answer: "worried", wrong: ["bored", "proud"] },
  { text: "Priya tripped on stage and the whole hall giggled. Her cheeks went bright red and she wanted to hide.", answer: "embarrassed", wrong: ["proud", "excited"] },
  { text: "Amara scored the winning goal. Her team lifted her onto their shoulders and cheered.", answer: "happy", wrong: ["sad", "scared"] },
  { text: "Zayn’s little brother ripped his best drawing in half. Zayn’s face went red and he stamped his feet.", answer: "angry", wrong: ["proud", "bored"] },
  { text: "The thunder crashed and the lights went out. Biscuit whimpered and hid under the bed.", answer: "scared", wrong: ["excited", "proud"] },
  { text: "Ellie’s grandma came to stay. Ellie ran to the door, laughing, and gave her a big hug.", answer: "happy", wrong: ["angry", "bored"] },
  { text: "Leo had practised his spellings every night. When he got full marks, he sat up tall and smiled.", answer: "proud", wrong: ["scared", "sad"] },
  { text: "Amara heard a strange scratching noise in the dark attic. She held her breath and did not move.", answer: "scared", wrong: ["happy", "bored"] },
  { text: "The class was going to the seaside tomorrow. Priya could not stop talking about it and could hardly sleep.", answer: "excited", wrong: ["sad", "angry"] },
];

export const ACTION_ITEMS = [
  { who: "Ellie", feeling: "nervous", right: "Ellie bit her nails and her hands felt sweaty.", wrong: ["Ellie danced around the kitchen, singing loudly.", "Ellie yawned and rested her head on the desk."] },
  { who: "Leo", feeling: "excited", right: "Leo bounced on his toes and could not stop grinning.", wrong: ["Leo hung his head and walked away slowly.", "Leo hid behind the sofa, shaking."] },
  { who: "Priya", feeling: "sad", right: "Priya’s eyes filled with tears and she looked at the floor.", wrong: ["Priya punched the air and cheered.", "Priya laughed so much her tummy hurt."] },
  { who: "Zayn", feeling: "angry", right: "Zayn slammed the door and shouted, “It’s not fair!”", wrong: ["Zayn hugged his friend and smiled.", "Zayn curled up and fell asleep."] },
  { who: "Amara", feeling: "proud", right: "Amara held up her certificate so everyone could see it.", wrong: ["Amara sniffed and hid her face in her hands.", "Amara shivered and hid behind the door."] },
  { who: "Biscuit", feeling: "scared", right: "Biscuit’s ears went flat and he trembled under the table.", wrong: ["Biscuit wagged his tail and fetched his ball.", "Biscuit snored in his basket."] },
  { who: "Leo", feeling: "bored", right: "Leo sighed, stared out of the window and tapped his pencil.", wrong: ["Leo leapt up and shouted, “Hooray!”", "Leo’s knees shook as he hid in the cupboard."] },
  { who: "Ellie", feeling: "surprised", right: "Ellie gasped and her eyebrows shot up.", wrong: ["Ellie yawned and closed her eyes.", "Ellie stamped her foot crossly."] },
  { who: "Priya", feeling: "worried", right: "Priya kept looking at the door, wondering why her mum was so late.", wrong: ["Priya skipped happily down the path.", "Priya fell asleep on the sofa."] },
  { who: "Zayn", feeling: "happy", right: "Zayn whistled a tune and smiled at everyone he passed.", wrong: ["Zayn sniffed and wiped his eyes.", "Zayn clenched his fists and glared."] },
  { who: "Amara", feeling: "embarrassed", right: "Amara’s face turned pink and she covered it with her hands.", wrong: ["Amara stood on the table and took a bow.", "Amara yawned and stretched."] },
  { who: "Biscuit", feeling: "excited", right: "Biscuit spun in circles and barked when he saw his lead.", wrong: ["Biscuit lay still with his head on his paws.", "Biscuit hid under the bed, shaking."] },
  { who: "Leo", feeling: "scared", right: "Leo pulled the covers over his head and held his breath.", wrong: ["Leo laughed and clapped his hands.", "Leo sighed and looked at the clock."] },
  { who: "Ellie", feeling: "angry", right: "Ellie scowled, crossed her arms and refused to speak.", wrong: ["Ellie giggled and told a joke.", "Ellie shivered and hid behind her dad."] },
  { who: "Priya", feeling: "proud", right: "Priya smiled to herself as she looked at the wall she had built.", wrong: ["Priya cried because her wall fell down.", "Priya ran away from the wall, screaming."] },
  { who: "Amara", feeling: "excited", right: "Amara counted down the days and ticked each one off on the calendar.", wrong: ["Amara groaned and pulled a face.", "Amara hid in her room and cried."] },
];

/**
 * Level 3. Only the `answer` sentence shows the character's feeling; the
 * others are setting and plot. The evidence moves around the passage so the
 * position never gives it away.
 */
export const EVIDENCE_ITEMS = [
  { who: "Leo", feeling: "nervous", answer: 2, sentences: ["It was the day of the school play.", "Leo peeped through the curtain at the crowd.", "His hands were shaking and his mouth felt dry.", "The music began to play."] },
  { who: "Amara", feeling: "excited", answer: 2, sentences: ["Amara’s family packed the car for the holiday.", "The boot was full of bags and buckets.", "Amara bounced in her seat and asked, “Are we nearly there?”", "Dad started the engine."] },
  { who: "Priya", feeling: "sad", answer: 1, sentences: ["Rain was pouring down on the trampoline.", "Priya slumped against the window with a heavy sigh.", "Her boots stood by the door, still dry.", "It was going to rain all day."] },
  { who: "Zayn", feeling: "proud", answer: 2, sentences: ["Zayn had spent all week on his rocket model.", "He carried it into class.", "When his teacher praised it, he stood up straight and beamed.", "The bell rang for lunch."] },
  { who: "Ellie", feeling: "scared", answer: 3, sentences: ["The wood was dark and quiet.", "An owl hooted somewhere above.", "The path led down to the river.", "Ellie’s heart thumped and she grabbed her brother’s arm."] },
  { who: "Biscuit", feeling: "happy", answer: 1, sentences: ["Ellie came home from school.", "Biscuit wagged his tail so hard that his whole body wiggled.", "She hung her bag on its hook.", "Then she went to make a snack."] },
  { who: "Leo", feeling: "angry", answer: 2, sentences: ["Leo’s sister borrowed his bike without asking.", "She left it out in the rain.", "Leo’s face went red and he shouted, “That’s mine!”", "The bike was covered in mud."] },
  { who: "Amara", feeling: "surprised", answer: 2, sentences: ["Amara opened her lunch box.", "Inside was a tiny note from her gran.", "Amara’s eyes went wide and she gasped.", "There was also an apple and a sandwich."] },
  { who: "Zayn", feeling: "worried", answer: 3, sentences: ["Zayn’s alarm had not gone off.", "The school trip bus was leaving at nine.", "His shoes were by the bed.", "He chewed his sleeve and stared at the clock."] },
  { who: "Priya", feeling: "embarrassed", answer: 3, sentences: ["Priya walked into class.", "Everyone turned to look at her.", "She had odd socks on, one red and one green.", "Priya’s cheeks burned and she wished she could disappear."] },
  { who: "Ellie", feeling: "bored", answer: 2, sentences: ["The car journey was very long.", "The road went past fields and more fields.", "Ellie sighed, slid down in her seat and counted the lamp posts.", "Mum turned on the radio."] },
  { who: "Leo", feeling: "happy", answer: 3, sentences: ["Leo’s team had a football match.", "The score was one all.", "In the last minute, the ball went in.", "Leo ran round the pitch with his arms in the air, laughing."] },
  { who: "Amara", feeling: "sad", answer: 2, sentences: ["Amara’s goldfish, Bubbles, had died.", "She buried him under the apple tree.", "Amara could not stop crying all afternoon.", "Her mum made her a cup of hot chocolate."] },
  { who: "Zayn", feeling: "excited", answer: 1, sentences: ["A parcel arrived for Zayn.", "Zayn tore off the paper and whooped with joy.", "Inside was a new box of paints.", "The box had twenty colours."] },
  { who: "Biscuit", feeling: "scared", answer: 2, sentences: ["It was Bonfire Night.", "Fireworks banged and fizzed in the sky.", "Biscuit hid behind the sofa, shaking.", "The sky turned pink and gold."] },
  { who: "Priya", feeling: "nervous", answer: 1, sentences: ["Priya’s swimming test was today.", "Her tummy did flips and she took a big breath.", "She stood at the edge of the deep end.", "The water was blue and still."] },
];

/**
 * Level 4: one story, four questions. `para` is the paragraph the answer
 * lives in, which the hint highlights.
 */
export const PASSAGE_SETS = [
  {
    passage: "lost-kite",
    questions: [
      { q: "How did Leo feel when the kite first flew?", answer: "excited", wrong: ["worried", "bored"], para: 0 },
      { q: "Which words show how Leo felt when the kite flew away?", answer: "Leo’s shoulders drooped", wrong: ["Leo whooped", "Leo’s face lit up"], para: 1 },
      { q: "Why did Amara run into the woods?", answer: "to find Leo’s kite", wrong: ["to hide from Leo", "to fly her own kite"], para: 2 },
      { q: "How did Leo feel at the end?", answer: "grateful and happy", wrong: ["angry with Amara", "still sad about his kite"], para: 2 },
    ],
  },
  {
    passage: "priyas-song",
    questions: [
      { q: "How did Priya feel all afternoon?", answer: "nervous", wrong: ["bored", "angry"], para: 0 },
      { q: "Why did Priya keep practising the song?", answer: "she was worried about singing on her own", wrong: ["she was bored and had nothing to do", "her grandad told her to stop"], para: 0 },
      { q: "What helped Priya feel braver on the stage?", answer: "her grandad’s thumbs up", wrong: ["the hall going dark", "forgetting the song"], para: 1 },
      { q: "Which words show that Priya felt proud at the end?", answer: "Priya smiled so widely that her cheeks ached", wrong: ["her legs felt wobbly", "her tummy felt fluttery"], para: 2 },
    ],
  },
  {
    passage: "missing-sock",
    questions: [
      { q: "How did Ellie feel when she could not find her sock?", answer: "cross", wrong: ["proud", "sleepy"], para: 0 },
      { q: "Which words tell you she felt that way?", answer: "stamping her foot", wrong: ["she crept outside", "gave Biscuit a pat"], para: 0 },
      { q: "Why did Biscuit drop the sock at Ellie’s feet?", answer: "he thought he had found something special", wrong: ["he was scared of Ellie", "he wanted to go to sleep"], para: 2 },
      { q: "How did Ellie feel at the end?", answer: "she thought it was funny", wrong: ["she was furious with Biscuit", "she was frightened of Biscuit"], para: 2 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

const withEmoji = (feeling) => `${FEELINGS[feeling] ?? ""} ${feeling}`.trim();

function feelingQuestion(item, rng) {
  return {
    kind: "feeling",
    text: item.text,
    answer: withEmoji(item.answer),
    options: shuffle([item.answer, ...item.wrong].map(withEmoji), rng),
  };
}

function actionQuestion(item, rng) {
  return {
    kind: "action",
    who: item.who,
    feeling: item.feeling,
    emoji: FEELINGS[item.feeling],
    answer: item.right,
    options: shuffle([item.right, ...item.wrong], rng),
  };
}

function evidenceQuestion(item) {
  return { kind: "evidence", who: item.who, feeling: item.feeling, sentences: item.sentences, answer: item.answer };
}

export function buildFeelingsQuestions(level, rng) {
  if (level === 1) return sample(FEELING_TEXTS, QUESTIONS_PER_CHALLENGE, rng).map((item) => feelingQuestion(item, rng));
  if (level === 2) return sample(ACTION_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => actionQuestion(item, rng));
  if (level === 3) return sample(EVIDENCE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map(evidenceQuestion);
  if (level === 4) {
    const [set] = sample(PASSAGE_SETS, 1, rng);
    const passage = findPassage(set.passage);
    return set.questions.map((item) => ({
      kind: "passage",
      passage,
      q: item.q,
      answer: item.answer,
      para: item.para,
      options: shuffle([item.answer, ...item.wrong], rng),
    }));
  }
  throw new Error(`no characters' feelings level ${level}`);
}
