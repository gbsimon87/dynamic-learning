import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Words in Context: "checking that the text makes sense to them,
 * discussing their understanding, and explaining the meaning of words in
 * context".
 *
 *   1 pick    one sentence, a word with two meanings: choose the one that
 *             fits (the two meanings are shown with pictures)
 *   2 sort    sort four sentences by which meaning the word has (inferred)
 *   3 clue    a harder word, then a sentence that explains it: tap the word
 *             that tells you what it means
 *   4 story   read a short story and say what words mean in it (applied)
 *
 * Every sentence has ONE meaning that fits. "fair" belongs to Homophones and
 * the dictionary words (bank, seal …) to Using a Dictionary, so neither is
 * here.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/**
 * Levels 1 and 2. Each word has two meanings, each with two sentences in
 * which only that meaning makes sense. Every sentence contains the word
 * exactly once, as written in `word`.
 */
export const MULTI_WORDS = [
  {
    word: "bat",
    meanings: [
      { emoji: "🦇", text: "a small animal that flies at night", sentences: ["A bat flew out of the dark cave.", "The bat hung upside down from a branch and slept all day."] },
      { emoji: "🏏", text: "a stick for hitting a ball", sentences: ["Leo hit the ball with his cricket bat.", "Priya swung the bat and the ball flew over the fence."] },
    ],
  },
  {
    word: "bark",
    meanings: [
      { emoji: "🐶", text: "the loud sound a dog makes", sentences: ["Biscuit gave a loud bark when the postman came.", "We heard a bark from the dog next door."] },
      { emoji: "🌳", text: "the rough outside of a tree", sentences: ["The bark on the old oak tree was rough and bumpy.", "A beetle crawled under the bark of the tree."] },
    ],
  },
  {
    word: "match",
    meanings: [
      { emoji: "🔥", text: "a small stick that makes a flame", sentences: ["Grandad struck a match to light the candles.", "Only a grown-up should strike a match."] },
      { emoji: "⚽", text: "a game between two teams", sentences: ["Our team won the football match by two goals.", "Ellie watched the tennis match on TV."] },
    ],
  },
  {
    word: "light",
    meanings: [
      { emoji: "💡", text: "something that shines so you can see", sentences: ["Please switch on the light because it is getting dark.", "The light from the moon shone through the window."] },
      { emoji: "🪶", text: "not heavy", sentences: ["The feather was so light that it floated away.", "Amara’s bag was light because it was empty."] },
    ],
  },
  {
    word: "wave",
    meanings: [
      { emoji: "👋", text: "moving your hand to say hello or goodbye", sentences: ["Let’s wave goodbye to Grandma at the window.", "Zayn gave a big wave from the bus."] },
      { emoji: "🌊", text: "a moving line of water in the sea", sentences: ["A huge wave crashed onto the beach.", "Priya jumped over a wave at the seaside."] },
    ],
  },
  {
    word: "ring",
    meanings: [
      { emoji: "💍", text: "a piece of jewellery worn on a finger", sentences: ["Mum wears a gold ring on her finger.", "Amara found a ring with a red jewel in it."] },
      { emoji: "🔔", text: "the sound a bell or a phone makes", sentences: ["We heard the ring of the doorbell.", "The phone gave a loud ring in the hall."] },
    ],
  },
  {
    word: "park",
    meanings: [
      { emoji: "🛝", text: "a place with grass and trees where people play", sentences: ["We played on the swings at the park.", "Biscuit loves running across the park."] },
      { emoji: "🚗", text: "to stop a car and leave it somewhere", sentences: ["Dad had to park the car outside the shop.", "There was nowhere to park near the school."] },
    ],
  },
  {
    word: "rock",
    meanings: [
      { emoji: "🪨", text: "a big, hard stone", sentences: ["Priya climbed to the top of the big rock.", "Leo sat on a rock by the stream."] },
      { emoji: "👶", text: "to move gently from side to side", sentences: ["Dad will rock the baby to sleep.", "The little boat began to rock in the wind."] },
    ],
  },
  {
    word: "train",
    meanings: [
      { emoji: "🚆", text: "carriages that run along a railway", sentences: ["We took the train to London.", "The train stopped at every station."] },
      { emoji: "🏃", text: "to practise, or teach someone, to get better at something", sentences: ["Leo will train hard for the big race.", "Ellie wants to train Biscuit to sit."] },
    ],
  },
  {
    word: "watch",
    meanings: [
      { emoji: "⌚", text: "a small clock you wear on your wrist", sentences: ["Grandad checked the time on his watch.", "Amara got a new watch with a pink strap."] },
      { emoji: "👀", text: "to look at something for a while", sentences: ["We sat down to watch the film.", "Zayn likes to watch the birds in the garden."] },
    ],
  },
  {
    word: "spring",
    meanings: [
      { emoji: "🌷", text: "the season after winter", sentences: ["The daffodils come out in spring.", "In spring, the lambs are born on the farm."] },
      { emoji: "🌀", text: "a coil of metal that bounces back", sentences: ["The toy jumped up on a metal spring.", "A spring popped out of the old sofa."] },
    ],
  },
  {
    word: "letter",
    meanings: [
      { emoji: "✉️", text: "a written message that you post", sentences: ["Ellie posted a letter to her cousin.", "Priya wrote a thank-you letter to her aunt."] },
      { emoji: "🔤", text: "one of the signs we use to write words, like a or b", sentences: ["The word ‘cat’ starts with the letter c.", "Zayn wrote a capital letter at the start of his name."] },
    ],
  },
  {
    word: "star",
    meanings: [
      { emoji: "⭐", text: "a bright light in the night sky", sentences: ["Amara saw a twinkling star in the sky.", "The first star came out after sunset."] },
      { emoji: "🎤", text: "a famous singer or actor", sentences: ["The pop star sang to a huge crowd.", "Leo got a signed photo from a famous film star."] },
    ],
  },
  {
    word: "duck",
    meanings: [
      { emoji: "🦆", text: "a bird that swims and quacks", sentences: ["A duck swam across the pond.", "The duck quacked at the bread."] },
      { emoji: "🙇", text: "to bend down quickly", sentences: ["Duck, or the ball will hit you!", "Zayn had to duck under the low branch."] },
    ],
  },
  {
    word: "fan",
    meanings: [
      { emoji: "🌬️", text: "a machine that blows air to cool you", sentences: ["It was so hot that Mum switched on the fan.", "The fan whirred and cooled the room."] },
      { emoji: "📣", text: "someone who loves a team or a singer", sentences: ["Leo is a big fan of his football team.", "Every fan in the crowd cheered."] },
    ],
  },
  {
    word: "sink",
    meanings: [
      { emoji: "🚰", text: "a bowl with taps for washing things", sentences: ["Ellie washed the cups in the sink.", "Put the dirty plates by the sink."] },
      { emoji: "⚓", text: "to go down under the water", sentences: ["A stone will sink if you drop it in the pond.", "The toy boat began to sink in the bath."] },
    ],
  },
  {
    word: "kind",
    meanings: [
      { emoji: "😊", text: "nice and helpful to others", sentences: ["Ellie is always kind to animals.", "The kind girl helped me pick up my books."] },
      { emoji: "🗂️", text: "a type or sort", sentences: ["What kind of cake do you like best?", "A robin is a kind of bird."] },
    ],
  },
];

/**
 * Level 3. A harder word, then a sentence that explains it. `clue` is the
 * one word in `explain` that means the same; no other word there does.
 */
export const CLUE_ITEMS = [
  { first: "The path was narrow.", word: "narrow", explain: "Only one person at a time could fit on the thin path.", clue: "thin" },
  { first: "Biscuit was famished.", word: "famished", explain: "He was very hungry, so he gulped his dinner down.", clue: "hungry" },
  { first: "The old house was silent.", word: "silent", explain: "It was so quiet that Amara could hear a clock ticking.", clue: "quiet" },
  { first: "The giant was enormous.", word: "enormous", explain: "His head touched the clouds because he was so big.", clue: "big" },
  { first: "Leo felt weary after the long walk.", word: "weary", explain: "He was so tired that he fell asleep on the sofa.", clue: "tired" },
  { first: "The soup was scalding.", word: "scalding", explain: "It was so hot that Zayn had to wait before he could eat it.", clue: "hot" },
  { first: "Priya was furious.", word: "furious", explain: "She was so angry that she stamped her feet.", clue: "angry" },
  { first: "The puppy was timid.", word: "timid", explain: "He was so shy that he hid behind Ellie’s legs.", clue: "shy" },
  { first: "The cave was gloomy.", word: "gloomy", explain: "They needed a torch because it was dark inside.", clue: "dark" },
  { first: "Zayn built a miniature boat.", word: "miniature", explain: "It was so small that it fitted in his hand.", clue: "small" },
  { first: "The cake was delicious.", word: "delicious", explain: "Everyone wanted another slice because it was so tasty.", clue: "tasty" },
  { first: "The wind was fierce.", word: "fierce", explain: "It was so strong that it blew Leo’s hat away.", clue: "strong" },
  { first: "Ellie was elated.", word: "elated", explain: "She was so happy that she danced round the kitchen.", clue: "happy" },
  { first: "The test was simple.", word: "simple", explain: "It was so easy that Amara finished it in five minutes.", clue: "easy" },
  { first: "The road was deserted.", word: "deserted", explain: "Not one car went past on the empty road.", clue: "empty" },
  { first: "The baby was drowsy.", word: "drowsy", explain: "She was so sleepy that her eyes kept closing.", clue: "sleepy" },
  { first: "The castle was ancient.", word: "ancient", explain: "Nobody knew who had built the old castle.", clue: "old" },
  { first: "The pond water was murky.", word: "murky", explain: "It was so muddy that we could not see the bottom.", clue: "muddy" },
];

/**
 * Level 4. Original stories (cast.js characters and pronouns). Each question
 * names a word in the story; `para` is the block it is in, for the hint;
 * `unrelated` is the wrong option the hint takes away.
 */
export const STORIES = [
  {
    id: "park-bat",
    title: "Home Before Dark",
    kind: "story",
    blocks: [
      { type: "p", text: "On Saturday, Ellie and Leo took Biscuit to the park. Leo brought his cricket bat and a soft ball. Biscuit ran in circles and gave a happy bark every time Leo hit the ball." },
      { type: "p", text: "After a while, the sky grew dark and gloomy. Then something surprising happened. A tiny bat swooped low over the pond and up into the trees. Ellie gasped. “Bats only come out when it is nearly night,” she said." },
      { type: "p", text: "Leo looked at his watch. It was nearly six o’clock! They waved to the park keeper and hurried home, with Biscuit trotting ahead of them." },
    ],
    questions: [
      { q: "In the story, what does ‘bark’ mean?", para: 0, answer: "the loud sound a dog makes", wrong: ["the rough outside of a tree"], unrelated: "a kind of ball" },
      { q: "‘A tiny bat swooped low over the pond.’ What is the bat here?", para: 1, answer: "a small animal that flies at night", wrong: ["a stick for hitting a ball"], unrelated: "a kind of bird’s nest" },
      { q: "What does ‘gloomy’ mean in the story?", para: 1, answer: "dark and dull", wrong: ["bright and sunny"], unrelated: "loud and busy" },
      { q: "Leo looked at his ‘watch’. What is a watch here?", para: 2, answer: "a small clock you wear on your wrist", wrong: ["looking at something for a while"], unrelated: "a kind of hat" },
    ],
  },
  {
    id: "big-match",
    title: "The Big Match",
    kind: "story",
    blocks: [
      { type: "p", text: "Priya’s team had a big football match on Sunday. She had practised every evening for weeks, and she felt ready." },
      { type: "p", text: "Before the game, the coach handed out the new kit. It was light and soft, so it was easy to run in. Zayn and Amara had come to cheer. They were Priya’s biggest fans, and they had painted a huge banner with her name on it." },
      { type: "p", text: "The game was fierce. Both teams ran and tackled as hard as they could. Then, just before the end, Priya kicked the ball into the corner of the net. The crowd roared! Priya’s team had won." },
    ],
    questions: [
      { q: "What does ‘match’ mean in the story?", para: 0, answer: "a game between two teams", wrong: ["a small stick that makes a flame"], unrelated: "a kind of football boot" },
      { q: "The kit was ‘light’. What does that mean here?", para: 1, answer: "not heavy", wrong: ["something that shines so you can see"], unrelated: "very dirty" },
      { q: "Zayn and Amara were Priya’s biggest ‘fans’. What are fans here?", para: 1, answer: "people who love and cheer for someone", wrong: ["machines that blow air to cool you"], unrelated: "players on the other team" },
      { q: "‘The game was fierce.’ What does ‘fierce’ mean here?", para: 2, answer: "very hard and strong", wrong: ["slow and gentle"], unrelated: "very short" },
    ],
  },
  {
    id: "rock-pool",
    title: "The Rock Pool",
    kind: "story",
    blocks: [
      { type: "p", text: "In spring, Amara stayed with her grandad by the sea. Every morning, they walked along the beach. The waves crashed onto the sand and then slid back again." },
      { type: "p", text: "One day, they found a rock pool. It was full of tiny crabs and one orange starfish. Amara crouched down to look. The water was so clear that she could see right to the bottom." },
      { type: "p", text: "Later, Grandad wrote a letter to Amara’s mum. Amara added a drawing of the starfish at the bottom. Then they posted it in the red postbox at the end of the lane." },
    ],
    questions: [
      { q: "What does ‘spring’ mean in the story?", para: 0, answer: "the season after winter", wrong: ["a coil of metal that bounces back"], unrelated: "a kind of shell" },
      { q: "Amara ‘crouched’ down. What does crouched mean?", para: 1, answer: "bent her knees to get low", wrong: ["jumped up high"], unrelated: "shouted loudly" },
      { q: "The water was ‘clear’. What does that mean here?", para: 1, answer: "easy to see through", wrong: ["dark and muddy"], unrelated: "very noisy" },
      { q: "What is the ‘letter’ in the story?", para: 2, answer: "a written message that you post", wrong: ["one of the signs we use to write words, like a or b"], unrelated: "a kind of drawing" },
    ],
  },
];

/** "🦇 a small animal that flies at night": a ChoiceGrid label. */
export function meaningLabel(meaning) {
  return `${meaning.emoji} ${meaning.text}`;
}

function pickQuestion(entry, rng) {
  const [meaningIndex] = sample([0, 1], 1, rng);
  const meaning = entry.meanings[meaningIndex];
  const [sentence] = sample(meaning.sentences, 1, rng);
  return {
    kind: "pick",
    word: entry.word,
    sentence,
    answer: meaningLabel(meaning),
    options: shuffle(entry.meanings.map(meaningLabel), rng),
  };
}

function sortQuestion(entry, rng) {
  const cards = entry.meanings.flatMap((meaning, bin) =>
    meaning.sentences.map((sentence, index) => ({ id: `${bin}-${index}`, label: sentence, bin: `m${bin}` }))
  );
  return {
    kind: "sort",
    word: entry.word,
    bins: entry.meanings.map((meaning, bin) => ({ id: `m${bin}`, label: meaningLabel(meaning) })),
    cards: shuffle(cards, rng),
  };
}

/** Level 3: the explaining sentence is tapped; the hint underlines three words. */
function clueQuestion(item, rng) {
  const tokens = tokenise(item.explain);
  const answerIndex = tokens.findIndex((token) => bareWord(token) === item.clue);
  const others = tokens.map((_, index) => index).filter((index) => index !== answerIndex && bareWord(tokens[index]).length > 2);
  return {
    kind: "clue",
    word: item.word,
    first: item.first,
    tokens,
    answerIndex,
    clue: item.clue,
    hinted: new Set([answerIndex, ...sample(others, 2, rng)]),
  };
}

export function buildWordsInContextQuestions(level, rng) {
  if (level === 1) return sample(MULTI_WORDS, QUESTIONS_PER_CHALLENGE, rng).map((entry) => pickQuestion(entry, rng));
  if (level === 2) return sample(MULTI_WORDS, QUESTIONS_PER_CHALLENGE, rng).map((entry) => sortQuestion(entry, rng));
  if (level === 3) return sample(CLUE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => clueQuestion(item, rng));
  if (level === 4) {
    const [story] = sample(STORIES, 1, rng);
    const passage = { title: story.title, kind: story.kind, blocks: story.blocks };
    return story.questions.map((item) => ({
      kind: "story",
      passage,
      q: item.q,
      para: item.para,
      answer: item.answer,
      unrelated: item.unrelated,
      options: shuffle([item.answer, ...item.wrong, item.unrelated], rng),
    }));
  }
  throw new Error(`no words in context level ${level}`);
}

/** Level 2: every sentence is in the bin of its meaning. */
export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}
