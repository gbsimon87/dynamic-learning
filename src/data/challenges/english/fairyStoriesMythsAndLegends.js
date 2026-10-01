import { findReadingPassage } from "../../english/passagesReading.js";
import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/**
 * Year 3 Fairy Stories, Myths and Legends: "increasing their familiarity
 * with a wide range of books, including fairy stories, myths and legends"
 * and "identifying themes and conventions in a wide range of books".
 *
 *   1 feature   a convention is stated; choose the example that fits it
 *   2 sort      sort one-line story summaries: fairy story, myth or legend
 *   3 tap       tap the sentence of a short retelling that shows a feature
 *   4 passage   a retold tale: what kind it is, its theme, its features
 *
 * Working definitions (the notes and guidance, made concrete):
 *   fairy story  magic, wicked and kind characters, things in threes,
 *                "Once upon a time" … "happily ever after"
 *   myth         gods, or explains how something came to be
 *   legend       a hero who may really have lived (Robin Hood, Arthur)
 * Only clear-cut tales are used. A legend in this bank has no gods and
 * explains nothing; a myth has no "Once upon a time".
 */

export const FEATURE_ITEMS = [
  { prompt: "Fairy stories often begin with a special opening. Which is a fairy story opening?", answer: "Once upon a time, in a land far away…", wrong: ["Dear Grandma, thank you for the card.", "Step 1: Wash your hands."] },
  { prompt: "Fairy stories often begin with a special opening. Which is a fairy story opening?", answer: "Long, long ago, in a dark forest…", wrong: ["Today I went to the dentist.", "Owls hunt at night."] },
  { prompt: "Fairy stories often have a happy ending. Which is a fairy story ending?", answer: "…and they lived happily ever after.", wrong: ["…so remember to wash your hands.", "…Love from Leo."] },
  { prompt: "Fairy stories often have a happy ending. Which is a fairy story ending?", answer: "…and from that day on, the kingdom was happy and peaceful.", wrong: ["…then turn the oven off.", "…and the bus was late again."] },
  { prompt: "In fairy stories, things often come in threes. Which is the title of a fairy story?", answer: "The Three Little Pigs", wrong: ["How to Make a Kite", "All About Sharks"] },
  { prompt: "In fairy stories, things often come in threes. Which is the title of a fairy story?", answer: "Goldilocks and the Three Bears", wrong: ["My Trip to the Zoo", "Dinosaur Facts"] },
  { prompt: "Fairy stories often have a magic object. Which is a magic object?", answer: "a mirror that can talk", wrong: ["a pencil case", "a bus ticket"] },
  { prompt: "Fairy stories often have a magic object. Which is a magic object?", answer: "a lamp with a genie inside", wrong: ["a school bag", "a cup of tea"] },
  { prompt: "Fairy stories often have a magic object. Which is a magic object?", answer: "beans that grow up to the clouds", wrong: ["a bag of crisps", "a pair of wellies"] },
  { prompt: "In fairy stories, animals can often talk. Which sentence is from a fairy story?", answer: "“Who has been eating my porridge?” growled the bear.", wrong: ["Bears sleep through the winter.", "The bear at the zoo ate some fish."] },
  { prompt: "In fairy stories, animals can often talk. Which sentence is from a fairy story?", answer: "“Please let me cross your bridge,” said the little goat.", wrong: ["Goats eat grass and leaves.", "We fed the goats at the farm."] },
  { prompt: "In fairy stories, good usually wins over evil. How does a fairy story usually end?", answer: "The kind hero wins, and the wicked witch is beaten.", wrong: ["The wicked witch wins, and everyone is sad.", "Nobody wins, and the story just stops."] },
  { prompt: "Fairy stories often have kings, queens, witches and giants. Which character belongs in a fairy story?", answer: "a wicked witch", wrong: ["a bus driver", "a dentist"] },
  { prompt: "Fairy stories often have kings, queens, witches and giants. Which character belongs in a fairy story?", answer: "a giant in a castle in the clouds", wrong: ["a lollipop lady", "a football coach"] },
  { prompt: "A myth often explains how something came to be. Which title sounds like a myth?", answer: "How the Tortoise Got Its Cracked Shell", wrong: ["Cinderella", "Robin Hood and Little John"] },
  { prompt: "Myths often have gods in them. Which sentence is from a myth?", answer: "Thor, the god of thunder, swung his mighty hammer.", wrong: ["Once upon a time, a girl lost her glass slipper.", "Robin Hood lived in Sherwood Forest."] },
  { prompt: "A legend is about a hero who may really have lived. Which is a legend?", answer: "Robin Hood, the outlaw who helped the poor", wrong: ["Goldilocks and the Three Bears", "Why the Sea Is Salty"] },
  { prompt: "A legend is about a hero who may really have lived. Which is a legend?", answer: "King Arthur, who pulled a sword from a stone", wrong: ["The Three Little Pigs", "How the Tortoise Got Its Cracked Shell"] },
];

export const KINDS = [
  { id: "fairy", label: "🏰 Fairy story (magic, once upon a time)" },
  { id: "myth", label: "⚡ Myth (gods, or how something came to be)" },
  { id: "legend", label: "🏹 Legend (a hero who may have been real)" },
];

export const SUMMARIES = {
  fairy: [
    "A girl loses a glass slipper at the prince’s ball.",
    "Three billy goats trick a troll who lives under a bridge.",
    "Jack swaps his cow for magic beans and climbs a giant beanstalk.",
    "A princess pricks her finger and sleeps for a hundred years.",
    "Goldilocks tries the porridge, chairs and beds of three bears.",
    "A wolf dresses up as Grandma to trick Little Red Riding Hood.",
    "Two children find a house made of sweets, where a witch lives.",
  ],
  myth: [
    "Persephone goes under the ground each year, and that is why we have winter.",
    "Prometheus steals fire from the gods and gives it to people.",
    "Thor, the god of thunder, makes storms with his hammer.",
    "Arachne boasts to a goddess and is turned into the first spider.",
    "Pandora opens a jar and lets all the troubles out into the world.",
    "Tortoise falls from the sky, and that is how his shell got its cracks.",
    "Maui catches the sun with a rope to make the days longer.",
  ],
  legend: [
    "Robin Hood takes from the rich and gives to the poor of Sherwood Forest.",
    "Young Arthur pulls a sword from a stone and becomes king.",
    "Robin Hood wins a silver arrow at the Sheriff’s archery contest.",
    "Robin Hood and Little John fight with sticks on a narrow bridge.",
    "King Canute sits on the beach and orders the waves to stop.",
    "Robert the Bruce watches a spider try again and again, and decides not to give up.",
    "William Tell shoots an apple off his son’s head with an arrow.",
  ],
};

/** The features level 3 asks about, as the prompt shows them. */
export const FEATURE_ASKS = {
  ending: "Tap the sentence that is a happy fairy story ending.",
  threes: "Tap the sentence with things in threes.",
  good: "Tap the sentence where good wins over evil.",
  magic: "Tap the sentence that names a magic object.",
  talking: "Tap the sentence where an animal talks.",
};

/**
 * Level 3. `asks` maps a feature to the ONE sentence that shows it; a
 * feature that shows in two sentences is not asked about.
 */
export const RETELLINGS = [
  { title: "Jack and the Beanstalk", asks: { ending: 4 }, sentences: ["Once upon a time, Jack lived with his mother in a tiny cottage.", "One day, he swapped their cow for five beans.", "Overnight, a beanstalk grew right up into the clouds.", "Jack climbed it and found a giant’s castle.", "In the end, Jack and his mother lived happily ever after."] },
  { title: "The Three Billy Goats Gruff", asks: { threes: 0, good: 3 }, sentences: ["Long, long ago, three billy goats lived on a hillside.", "A grumpy troll lived under the bridge they had to cross.", "“Who’s that trip-trapping over my bridge?” roared the troll.", "The biggest goat butted the troll into the river.", "From then on, the goats ate the sweet green grass every day."] },
  { title: "Cinderella", asks: { magic: 2, ending: 4 }, sentences: ["Once upon a time, a kind girl called Cinderella worked hard for her unkind stepsisters.", "One night, her fairy godmother appeared.", "With a wave of her magic wand, she turned a pumpkin into a golden coach.", "At the ball, the prince danced with Cinderella until midnight.", "Cinderella married the prince, and they lived happily ever after."] },
  { title: "The Woodcutter and the Fox", asks: { talking: 2, threes: 2 }, sentences: ["Long, long ago, a poor woodcutter went into the forest.", "There, he helped a little fox that was caught in a trap.", "“Thank you,” said the fox. “I will give you three wishes.”", "The woodcutter wished for a warm house to live in.", "His wishes came true, and he was never poor again."] },
  { title: "Little Red Riding Hood", asks: { talking: 2, good: 4 }, sentences: ["Once upon a time, a girl in a red cloak set off to visit her grandma.", "On the way, a wolf stopped her on the path.", "“Where are you going, little girl?” asked the wolf.", "The wolf ran ahead and hid in Grandma’s bed.", "A brave woodcutter chased the wolf away, and Grandma was safe."] },
  { title: "The Magic Porridge Pot", asks: { ending: 4 }, sentences: ["Long, long ago, a girl and her mother had nothing to eat.", "In the woods, an old woman gave the girl a magic pot.", "When the girl said, “Cook, little pot, cook!” it filled with hot porridge.", "When she said, “Stop, little pot!” it stopped.", "The girl and her mother were never hungry again."] },
  { title: "The Three Little Pigs", asks: { talking: 3, good: 4 }, sentences: ["Once upon a time, there were three little pigs.", "The first pig built a house of straw, and the second built a house of sticks.", "The third pig built a strong house of bricks.", "“I’ll huff and I’ll puff and I’ll blow your house down!” shouted the wolf.", "The wolf could not blow down the brick house, and the pigs were safe."] },
  { title: "Sleeping Beauty", asks: { ending: 4 }, sentences: ["Once upon a time, a king and queen had a baby princess.", "An angry fairy put a wicked spell on her.", "When she was sixteen, the princess pricked her finger and fell asleep.", "A hundred years later, a brave prince woke her up.", "They were married, and they lived happily ever after."] },
  { title: "Rapunzel", asks: { ending: 4 }, sentences: ["Once upon a time, a witch locked a girl called Rapunzel in a tall tower.", "The tower had no door and no stairs.", "“Rapunzel, Rapunzel, let down your hair!” called the witch.", "One day, a prince climbed up Rapunzel’s long hair.", "Rapunzel escaped with the prince, and they lived happily ever after."] },
  { title: "The Magic Paintbrush", asks: { magic: 1, good: 3 }, sentences: ["Long, long ago, a poor boy called Ma Liang loved to paint.", "One night, an old man gave him a magic paintbrush.", "Whatever Ma Liang painted with it came to life.", "When a greedy king tried to steal the brush, Ma Liang painted a stormy sea that swept the king away.", "Ma Liang went home and used his brush to help poor people."] },
  { title: "The Frog Prince", asks: { talking: 1 }, sentences: ["Once upon a time, a princess dropped her golden ball into a deep well.", "“I will fetch your ball if you will be my friend,” croaked a frog.", "The princess agreed, so the frog dived down and brought back the ball.", "When the princess kissed the frog, he turned into a prince.", "From that day on, they were the best of friends."] },
];

/** Level 4: four questions on one retold tale. */
export const PASSAGE_SETS = [
  {
    passage: "elves-and-the-shoemaker",
    questions: [
      { q: "What kind of story is this?", answer: "a fairy story", wrong: ["a myth", "a legend"], para: 0 },
      { q: "Which words show that this is a fairy story?", answer: "Once upon a time", wrong: ["In the morning", "At midnight"], para: 0 },
      { q: "Which thing happens three times?", answer: "Shoes appear on the table.", wrong: ["The shoemaker buys a cow.", "The elves sing a song."], para: 1 },
      { q: "What does this story teach us?", answer: "Being kind brings good things.", wrong: ["It is fine to be greedy.", "You should always stay up late."], para: 2 },
    ],
  },
  {
    passage: "tortoise-shell",
    questions: [
      { q: "What kind of story is this?", answer: "a myth", wrong: ["a fairy story", "a legend"], para: 2 },
      { q: "What does this myth explain?", answer: "why a tortoise’s shell has cracks", wrong: ["why birds can sing", "how the sky was made"], para: 2 },
      { q: "Which words tell you that the story explains something?", answer: "that is why, to this day", wrong: ["When the world was new", "At the feast"], para: 2 },
      { q: "What lesson does Tortoise learn?", answer: "Being greedy gets you into trouble.", wrong: ["Birds are always unkind.", "Flying is easy."], para: 1 },
    ],
  },
  {
    passage: "persephone",
    questions: [
      { q: "What kind of story is this?", answer: "a myth", wrong: ["a fairy story", "a legend"], para: 0 },
      { q: "What does this myth explain?", answer: "why we have winter and spring", wrong: ["why the sea is salty", "how spiders learnt to spin"], para: 2 },
      { q: "Which words show that this is a myth?", answer: "the goddess Demeter", wrong: ["One day", "more than anything"], para: 0 },
      { q: "Why did nothing grow?", answer: "Demeter was too sad to care for the plants.", wrong: ["There was no rain.", "Persephone picked all the flowers."], para: 1 },
    ],
  },
  {
    passage: "robin-hood-silver-arrow",
    questions: [
      { q: "What kind of story is this?", answer: "a legend", wrong: ["a fairy story", "a myth"], para: 0 },
      { q: "Which words tell you that Robin Hood may have been a real person?", answer: "Some people say he was a real man", wrong: ["with a silver arrow as the prize", "wearing a ragged cloak"], para: 0 },
      { q: "Why did the Sheriff hold the contest?", answer: "to trap Robin Hood", wrong: ["to give money to the poor", "to find a new sheriff"], para: 1 },
      { q: "Who is the hero of this legend?", answer: "Robin Hood", wrong: ["the Sheriff of Nottingham", "the Sheriff’s men"], para: 2 },
    ],
  },
  {
    passage: "sword-in-the-stone",
    questions: [
      { q: "What kind of story is this?", answer: "a legend", wrong: ["a fairy story", "a myth"], para: 2 },
      { q: "What did the words on the stone say?", answer: "whoever pulls this sword out shall be king", wrong: ["only knights may touch this stone", "the sword belongs to the giant"], para: 0 },
      { q: "Why was everyone amazed?", answer: "A boy pulled out the sword when strong knights could not.", wrong: ["The stone began to talk.", "Arthur broke the sword in half."], para: 2 },
      { q: "Which words tell you this story is a legend?", answer: "Some people believe that King Arthur really lived", wrong: ["Many strong knights tried", "England had no king"], para: 2 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

function featureQuestion(item, rng) {
  return choiceQuestion({
    prompt: item.prompt,
    answer: item.answer,
    wrong: item.wrong,
    hint: "Read the first sentence again: it tells you what to look for.",
    rng,
  });
}

/** One summary of each kind, so every box gets one card. */
function sortQuestion(picks, rng) {
  const cards = KINDS.map((kind) => ({ id: kind.id, label: picks[kind.id], bin: kind.id }));
  return {
    kind: "sort",
    prompt: "Put each story in the right box.",
    bins: KINDS,
    cards: shuffle(cards, rng),
    hint: "One story goes in each box. Look for gods, for magic, and for a hero who may have been real.",
  };
}

function retellingQuestion(story, rng) {
  const features = Object.keys(story.asks);
  const [feature] = sample(features, 1, rng);
  const answer = story.asks[feature];
  return {
    kind: "pick",
    variant: "sentences",
    feature,
    prompt: `${story.title}: ${FEATURE_ASKS[feature]}`,
    tokens: story.sentences,
    answer,
    hinted: hintedWith(answer, story.sentences.map((_, index) => index), rng, 1),
    hint: "It is one of the two underlined sentences.",
  };
}

export function buildFairyStoriesQuestions(level, rng) {
  if (level === 1) return sample(FEATURE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => featureQuestion(item, rng));
  if (level === 2) {
    const drawn = Object.fromEntries(KINDS.map((kind) => [kind.id, sample(SUMMARIES[kind.id], QUESTIONS_PER_CHALLENGE, rng)]));
    return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) =>
      sortQuestion(Object.fromEntries(KINDS.map((kind) => [kind.id, drawn[kind.id][index]])), rng)
    );
  }
  if (level === 3) return sample(RETELLINGS, QUESTIONS_PER_CHALLENGE, rng).map((story) => retellingQuestion(story, rng));
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
        hint: "Look again at the paragraph with the box around it.",
        rng,
      })
    );
  }
  throw new Error(`no fairy stories level ${level}`);
}
