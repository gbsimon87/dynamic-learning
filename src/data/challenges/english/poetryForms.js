import { sample, shuffle } from "./shared.js";
import { choiceQuestion } from "./readingKit.js";

/**
 * Year 3 Poetry Forms: "recognising some different forms of poetry [for
 * example, free verse, narrative poetry]".
 *
 *   1 rhyme      a short rhyming verse: tap the word that rhymes with …
 *   2 sort       sort two-line snippets: rhyming, or free verse?
 *   3 story      three poems: which one is a narrative poem (tells a story)?
 *   4 name       one poem: name its form on both counts (narrative or
 *                describing; rhyming or free verse)
 *
 * Every poem is tagged on two separate questions, so no question has two
 * defensible answers: does it tell a story (events in order)? does it rhyme?
 * A narrative poem can rhyme or be free verse, and the options say so.
 */

/** Level 1: AABB verses. `pairs` are the line numbers whose end words rhyme. */
export const RHYMES = [
  { title: "Sun", lines: ["The sun is hot,", "I like it a lot.", "I run and play", "in the sun all day."] },
  { title: "Frog", lines: ["A little green frog", "sat on a log.", "He gave a jump", "and landed with a bump."] },
  { title: "Moon", lines: ["The moon is round,", "it makes no sound.", "It glows up high", "in the dark night sky."] },
  { title: "Snail", lines: ["A slow brown snail", "left a silver trail.", "It climbed the wall", "and did not fall."] },
  { title: "Bus", lines: ["The big red bus", "stops here for us.", "It goes to town", "and up and down."] },
  { title: "Kite", lines: ["My kite flies high", "up in the sky.", "It dips and sways", "on windy days."] },
  { title: "Bee", lines: ["A bumblebee", "flew round a tree.", "It found a flower", "and stayed an hour."] },
  { title: "Fox", lines: ["A fox crept by", "with a twinkling eye.", "He sniffed the ground", "without a sound."] },
  { title: "Snow", lines: ["Soft white snow", "falls down below.", "We build a man", "as fast as we can."] },
  { title: "Drum", lines: ["Bang the drum,", "here we come!", "Stamp your feet", "along the street."] },
  { title: "Cake", lines: ["I baked a cake", "beside the lake.", "A duck ate a slice", "and said, “How nice!”"] },
  { title: "Train", lines: ["The train goes fast,", "the trees rush past.", "It toots its horn", "by fields of corn."] },
  { title: "Hen", lines: ["A little red hen", "counted to ten.", "She laid an egg", "and stood on one leg."] },
  { title: "Star", lines: ["A star so bright", "came out tonight.", "It winks at me", "above the tree."] },
  { title: "Pig", lines: ["A pink fat pig", "began to dig.", "He found a shoe", "and a bone or two."] },
].map((verse) => ({ ...verse, pairs: [[0, 1], [2, 3]] }));

/** Level 2: two-line snippets, shown as "line / line". */
export const SNIPPETS = {
  rhyme: [
    "The wind blew cold / on the hills so old.",
    "A spider spun / her web in the sun.",
    "The owl said “Hoo!” / and off he flew.",
    "My teddy bear / sits on the chair.",
    "The fire is bright / on a winter night.",
    "A crab ran fast / and scuttled past.",
    "Grandad’s shed / is painted red.",
    "Toast and jam / for little Sam.",
    "The bells all ring / to welcome spring.",
    "A mouse so small / ran up the wall.",
  ],
  free: [
    "The bus waits / at the end of the road.",
    "Shells lie / on the wet sand.",
    "Grandma’s garden / smells of mint.",
    "Fog hides / the tops of the trees.",
    "A robin hops / across the frosty lawn.",
    "Steam curls up / from my hot chocolate.",
    "The playground is empty / after the bell.",
    "Pebbles click / under my feet.",
    "Clouds drift / over the quiet field.",
    "My shadow grows long / in the evening sun.",
  ],
};

/** Levels 3 and 4. `story`: events happen in order. `rhyme`: end words rhyme. */
export const POEMS = [
  { title: "The Runaway Hat", story: true, rhyme: true, lines: ["The wind blew off Dad’s hat one day,", "It rolled and tumbled far away.", "It bounced along the busy street,", "And landed at a puppy’s feet."] },
  { title: "Biscuit and the Ball", story: true, rhyme: true, lines: ["Biscuit chased a big red ball,", "Across the yard and past the wall.", "He dropped it down by Ellie’s chair,", "And went to sleep without a care."] },
  { title: "The Snowman", story: true, rhyme: true, lines: ["We built a snowman after tea,", "With Leo, Zayn and little me.", "Next morning, when the sun came round,", "We found his scarf upon the ground."] },
  { title: "The Picnic", story: true, rhyme: true, lines: ["We packed a picnic, Gran and I,", "Beneath a bright blue summer sky.", "But then the rain came pouring down,", "So we ate our sandwiches in town."] },
  { title: "The Paper Boat", story: true, rhyme: false, lines: ["Zayn folded a boat from paper.", "He set it down on the pond.", "It sailed past the reeds", "until Leo caught it."] },
  { title: "The Seed", story: true, rhyme: false, lines: ["Priya planted a seed in a pot.", "Each morning, she gave it water.", "One day, a green shoot appeared.", "She carried it out into the sun."] },
  { title: "The Card", story: true, rhyme: false, lines: ["Ellie made a card for Mum.", "She painted flowers on the front.", "She left it by the kettle.", "Mum found it and smiled."] },
  { title: "The Wobbly Tooth", story: true, rhyme: false, lines: ["Leo’s tooth wobbled all week.", "On Friday, it fell out at lunch.", "He put it under his pillow.", "In the morning, he found a coin."] },
  { title: "Stars", story: false, rhyme: true, lines: ["The stars are bright,", "They shine all night,", "Like silver sparks", "Above the parks."] },
  { title: "The Sea", story: false, rhyme: true, lines: ["The sea is grey, the sea is wide,", "It splashes up the rocky side.", "It sparkles blue on sunny days,", "And sings in soft and sleepy ways."] },
  { title: "The Cat", story: false, rhyme: true, lines: ["The sleepy cat lies on the mat,", "Her fur is soft, her tummy fat.", "Her eyes are closed, her paws are still,", "She dreams beside the windowsill."] },
  { title: "Rain", story: false, rhyme: false, lines: ["Raindrops slide down the glass,", "racing each other", "to the bottom of the window."] },
  { title: "A Leaf", story: false, rhyme: false, lines: ["Green veins spread out", "like roads", "on a tiny map."] },
  { title: "The Station", story: false, rhyme: false, lines: ["Trains rumble past.", "Warm air rushes", "over the empty platform."] },
  { title: "Frost", story: false, rhyme: false, lines: ["White lace", "on every blade of grass.", "The garden holds its breath."] },
];

export const FORM_NAMES = {
  "story-rhyme": "a narrative poem that rhymes",
  "story-free": "a narrative poem in free verse",
  "describe-rhyme": "a rhyming poem that describes something",
  "describe-free": "free verse that describes something",
};

export const formOf = (poem) => `${poem.story ? "story" : "describe"}-${poem.rhyme ? "rhyme" : "free"}`;

const bare = (token) => token.replace(/[^a-z’']/gi, "").toLowerCase();
const poemBlocks = (poem) => poem.lines.map((text) => ({ type: "line", text }));

function rhymeQuestion(verse, rng) {
  const [pair] = sample(verse.pairs, 1, rng);
  const [from, to] = shuffle(pair, rng);
  const lines = verse.lines.map((text) => text.split(" "));
  const ends = lines.map((line, l) => `${l}:${line.length - 1}`);
  const answer = ends[to];
  const given = bare(lines[from][lines[from].length - 1]);
  const others = ends.filter((end) => end !== answer && end !== ends[from]);
  return {
    kind: "lines",
    title: verse.title,
    prompt: `Tap the word that rhymes with “${given}”.`,
    lines,
    answer,
    hinted: shuffle([answer, ...sample(others, 1, rng)], rng),
    hint: `Rhymes are often at the ends of lines. Say each end word with “${given}”. Which sounds the same at the end?`,
  };
}

function sortQuestion(rhymes, frees, rng) {
  const cards = [
    ...rhymes.map((label, i) => ({ id: `rhyme-${i}`, label, bin: "rhyme" })),
    ...frees.map((label, i) => ({ id: `free-${i}`, label, bin: "free" })),
  ];
  return {
    kind: "sort",
    prompt: "Each card is two lines. Do the last words sound the same?",
    bins: [
      { id: "rhyme", label: "🔔 Rhymes" },
      { id: "free", label: "🍃 Free verse (no rhyme)" },
    ],
    cards: shuffle(cards, rng),
    hint: "Read the last word of each line out loud. Do they end with the same sound?",
  };
}

function storyQuestion(narrative, rng) {
  const others = [
    ...sample(POEMS.filter((poem) => !poem.story && poem.rhyme), 1, rng),
    ...sample(POEMS.filter((poem) => !poem.story && !poem.rhyme), 1, rng),
  ];
  const shown = shuffle([narrative, ...others], rng);
  return choiceQuestion({
    passage: { kind: "poem", blocks: shown.flatMap((poem) => [{ type: "h", text: poem.title }, ...poemBlocks(poem)]) },
    prompt: "Which poem is a narrative poem? It tells a story.",
    answer: narrative.title,
    wrong: others.map((poem) => poem.title),
    hint: "In a narrative poem, one thing happens, then another, then another. The other two describe one thing.",
    rng,
  });
}

function nameQuestion(poem, rng) {
  const answer = FORM_NAMES[formOf(poem)];
  return choiceQuestion({
    passage: { kind: "poem", title: poem.title, blocks: poemBlocks(poem) },
    prompt: "What kind of poem is this?",
    answer,
    wrong: Object.values(FORM_NAMES).filter((name) => name !== answer),
    hint: "Ask two questions. Does it tell a story, with things happening in order? Do the line endings rhyme?",
    rng,
  });
}

export const QUESTIONS_PER_CHALLENGE = 5;

export function buildPoetryFormsQuestions(level, rng) {
  if (level === 1) return sample(RHYMES, QUESTIONS_PER_CHALLENGE, rng).map((verse) => rhymeQuestion(verse, rng));
  if (level === 2) {
    const rhymes = sample(SNIPPETS.rhyme, 2 * QUESTIONS_PER_CHALLENGE, rng);
    const frees = sample(SNIPPETS.free, 2 * QUESTIONS_PER_CHALLENGE, rng);
    return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, i) =>
      sortQuestion(rhymes.slice(2 * i, 2 * i + 2), frees.slice(2 * i, 2 * i + 2), rng)
    );
  }
  if (level === 3) {
    return sample(POEMS.filter((poem) => poem.story), QUESTIONS_PER_CHALLENGE, rng).map((poem) => storyQuestion(poem, rng));
  }
  if (level === 4) return sample(POEMS, QUESTIONS_PER_CHALLENGE, rng).map((poem) => nameQuestion(poem, rng));
  throw new Error(`no poetry forms level ${level}`);
}
