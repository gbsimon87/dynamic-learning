import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Paragraphs: "organising paragraphs around a theme" and, from
 * Appendix 2 (Year 3), "Introduction to paragraphs as a way to group related
 * material".
 *
 *   1 which    which paragraph does this sentence belong in? (rule shown)
 *   2 sort     sort four sentences into two paragraphs
 *   3 split    tap where the new paragraph should start
 *   4 place    read a two-paragraph text; where does a new sentence go?
 *
 * Each set is one short non-fiction text with two themes. Every sentence is
 * written so it belongs to ONE theme only; paragraphs.test.js checks the
 * mechanics, and the words were chosen so no sentence leans the other way.
 */
export const PARAGRAPH_SETS = [
  {
    title: "Hedgehogs",
    themes: [
      { label: "What hedgehogs eat", sentences: ["Hedgehogs eat beetles, worms and slugs.", "They hunt for their food at night.", "A hedgehog can eat a lot of insects in one night.", "Gardeners like hedgehogs because they eat the slugs on plants."] },
      { label: "Where hedgehogs live", sentences: ["Hedgehogs sleep in nests made of leaves.", "They often hide under hedges or sheds.", "In winter, they hibernate in a cosy nest.", "Some people build little hedgehog houses in their gardens."] },
    ],
  },
  {
    title: "Our School Trip",
    themes: [
      { label: "Getting there", sentences: ["We set off from school at nine o’clock.", "The coach journey took an hour.", "We sang songs all the way there.", "Mrs Khan counted us onto the coach twice."] },
      { label: "At the museum", sentences: ["At the museum, we saw a real dinosaur skeleton.", "A guide showed us some old Roman coins.", "We ate our packed lunches in the museum garden.", "My favourite part was the room full of mummies."] },
    ],
  },
  {
    title: "Penguins",
    themes: [
      { label: "What penguins look like", sentences: ["Penguins have black backs and white fronts.", "Penguins have a hard, pointed beak.", "Emperor penguins have yellow patches on their necks.", "Baby penguins are covered in soft, grey fluff."] },
      { label: "How penguins swim", sentences: ["Penguins cannot fly, but they are excellent swimmers.", "They use their flippers to zoom through the water.", "Some penguins can stay underwater for twenty minutes.", "Their smooth bodies glide easily through the sea."] },
    ],
  },
  {
    title: "Looking After a Puppy",
    themes: [
      { label: "Feeding a puppy", sentences: ["A puppy needs small meals several times a day.", "Always give your puppy fresh water to drink.", "Never feed a puppy chocolate.", "Ask a vet which food is best for your puppy."] },
      { label: "Exercising a puppy", sentences: ["Puppies need short walks every day.", "Playing fetch is good exercise.", "Let your puppy rest after a long game.", "A puppy that runs about every day stays fit."] },
    ],
  },
  {
    title: "A Day at the Seaside",
    themes: [
      { label: "The beach", sentences: ["The beach was covered in soft, golden sand.", "We built a sandcastle with a moat.", "Shells and pebbles lay along the shore.", "Biscuit dug a deep hole in the sand."] },
      { label: "The sea", sentences: ["The sea was cold and sparkly.", "Big waves crashed onto the rocks.", "We paddled at the edge of the water.", "A little boat bobbed far out on the water."] },
    ],
  },
  {
    title: "Volcanoes",
    themes: [
      { label: "What a volcano is", sentences: ["A volcano is an opening in the Earth’s crust.", "Hot melted rock, called magma, lies deep underground.", "When magma comes out of a volcano, it is called lava.", "Volcanoes can be found on land and under the sea."] },
      { label: "Famous volcanoes", sentences: ["Mount Vesuvius is a volcano in Italy.", "It erupted long ago and buried the town of Pompeii.", "Mount Etna, also in Italy, still erupts today.", "Visitors can walk up the side of Mount Vesuvius."] },
    ],
  },
  {
    title: "Honeybees",
    themes: [
      { label: "Worker bees", sentences: ["Worker bees collect nectar from flowers.", "They turn the nectar into honey.", "Some worker bees guard the hive from enemies.", "Worker bees also keep the hive clean."] },
      { label: "The queen bee", sentences: ["Every hive has one queen bee.", "She is bigger than the other bees.", "The queen lays all the eggs in the hive.", "A queen bee can live for several years."] },
    ],
  },
  {
    title: "The Romans in Britain",
    themes: [
      { label: "The Romans arrive", sentences: ["The Romans came to Britain nearly two thousand years ago.", "Their soldiers marched across the land.", "Roman soldiers carried heavy shields and swords.", "The army set up camps as it moved north."] },
      { label: "What the Romans built", sentences: ["The Romans built long, straight roads.", "They made towns with baths and markets.", "Some Roman walls can still be seen today.", "Roman builders used stone, brick and a kind of concrete."] },
    ],
  },
  {
    title: "The Moon and the Sun",
    themes: [
      { label: "The Moon", sentences: ["The Moon travels around the Earth.", "It has no air, so nothing can live there.", "Astronauts first walked on the Moon in 1969.", "The Moon seems to change shape during the month."] },
      { label: "The Sun", sentences: ["The Sun is a star.", "It gives the Earth light and heat.", "Never look straight at the Sun, because it can hurt your eyes.", "The Sun is much bigger than the Earth."] },
    ],
  },
  {
    title: "Plants",
    themes: [
      { label: "What plants need", sentences: ["Plants need water to grow.", "They also need plenty of light.", "Most plants grow best in good soil.", "A plant left in a dark cupboard will soon droop."] },
      { label: "The parts of a plant", sentences: ["The roots hold the plant in the ground.", "The stem carries water up to the leaves.", "Flowers make seeds for new plants.", "Petals are often bright to attract bees."] },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

function whichQuestion(set, rng) {
  const [theme] = sample(set.themes, 1, rng);
  const [sentence] = sample(theme.sentences, 1, rng);
  return {
    kind: "which",
    title: set.title,
    sentence,
    answer: theme.label,
    options: set.themes.map((item) => item.label),
  };
}

function sortQuestion(set, rng) {
  const cards = set.themes.flatMap((theme, themeIndex) =>
    sample(theme.sentences, 2, rng).map((sentence, index) => ({
      id: `${themeIndex}-${index}`,
      label: sentence,
      bin: theme.label,
    }))
  );
  return {
    kind: "sort",
    title: set.title,
    bins: set.themes.map((theme) => ({ id: theme.label, label: theme.label })),
    cards: shuffle(cards, rng),
  };
}

/**
 * Level 3: 2–3 sentences of one theme, then 2–3 of the other. The answer is
 * the gap between them. The first theme's sentences keep their order, so the
 * text reads naturally, and the lengths vary so the gap moves.
 */
export function splitQuestion(set, rng) {
  const [first, second] = shuffle(set.themes, rng);
  const firstCount = 2 + Math.floor(rng() * 2);
  const secondCount = 2 + Math.floor(rng() * 2);
  const a = first.sentences.slice(0, firstCount);
  const b = second.sentences.slice(0, secondCount);
  return {
    kind: "split",
    title: set.title,
    sentences: [...a, ...b],
    answer: a.length,
    themes: [first.label, second.label],
  };
}

/** Level 4: three sentences of each theme as two paragraphs; place the fourth. */
function placeQuestion(set, rng) {
  const [theme] = sample([0, 1], 1, rng);
  const blocks = set.themes.map((item, index) => ({
    type: "p",
    label: `Paragraph ${index + 1}`,
    text: item.sentences.slice(0, 3).join(" "),
  }));
  return {
    kind: "place",
    passage: { title: set.title, kind: "report", blocks },
    sentence: set.themes[theme].sentences[3],
    answer: theme === 0 ? "Paragraph 1" : "Paragraph 2",
    options: ["Paragraph 1", "Paragraph 2"],
  };
}

const BUILDERS = { 1: whichQuestion, 2: sortQuestion, 3: splitQuestion, 4: placeQuestion };

export function buildParagraphQuestions(level, rng) {
  const build = BUILDERS[level];
  if (!build) throw new Error(`no paragraphs level ${level}`);
  return sample(PARAGRAPH_SETS, QUESTIONS_PER_CHALLENGE, rng).map((set) => build(set, rng));
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}
