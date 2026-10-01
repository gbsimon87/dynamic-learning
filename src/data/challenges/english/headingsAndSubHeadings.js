import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Headings and Sub-headings: "in non-narrative material, using simple
 * organisational devices [for example, headings and sub-headings]";
 * Appendix 2 (Year 3), "Headings and sub-headings to aid presentation".
 *
 *   1 pick     choose the sub-heading for one paragraph (rule shown)
 *   2 match    match three sub-headings to three paragraphs (inferred)
 *   3 spot     tap the sub-heading that does not belong in a text
 *   4 restore  a report with its sub-headings removed: put each one back
 *              (one text, four questions, no gloss)
 *
 * Each text has a heading (its title) and four sections. Every sub-heading is
 * written to fit ITS paragraph only, so a sibling sub-heading is a fair
 * near-miss and never a second right answer.
 */
export const TEXTS = [
  {
    title: "Owls",
    sections: [
      { heading: "What owls look like", text: "Owls have large eyes and soft, fluffy feathers. Their feathers let them fly without making a sound." },
      { heading: "What owls eat", text: "Owls hunt mice, voles and beetles. They swallow small animals whole." },
      { heading: "Where owls live", text: "Many owls nest in hollow trees or old barns. Some live in holes in the ground." },
      { heading: "Baby owls", text: "Baby owls are called owlets. They hatch from eggs and are covered in grey down." },
    ],
  },
  {
    title: "Making a Bird Feeder",
    sections: [
      { heading: "You will need", text: "You will need a pine cone, some string, lard and bird seed." },
      { heading: "What to do", text: "Tie the string to the top of the pine cone. Spread lard over it and roll it in the seed." },
      { heading: "Where to hang it", text: "Hang your feeder from a branch, high enough to keep it safe from cats." },
      { heading: "Which birds will visit", text: "Robins, sparrows and blue tits love to visit bird feeders." },
    ],
  },
  {
    title: "Ancient Egypt",
    sections: [
      { heading: "The River Nile", text: "The River Nile flowed through Egypt. Farmers grew wheat on its rich, muddy banks." },
      { heading: "Pyramids", text: "The pyramids were built as giant tombs for kings. The biggest took about twenty years to build." },
      { heading: "Mummies", text: "The Egyptians dried dead bodies and wrapped them in cloth to make mummies." },
      { heading: "Writing", text: "The Egyptians wrote with picture symbols called hieroglyphs." },
    ],
  },
  {
    title: "Our School",
    sections: [
      { heading: "Our classrooms", text: "There are seven classrooms, one for each year group. Each one has a reading corner." },
      { heading: "The playground", text: "The playground has a climbing frame, a running track and a big field." },
      { heading: "School lunches", text: "Lunch is served in the hall at twelve o’clock. There is always fruit for pudding." },
      { heading: "After-school clubs", text: "You can join football, art or chess club when lessons finish." },
    ],
  },
  {
    title: "Spiders",
    sections: [
      { heading: "A spider’s body", text: "A spider has eight legs and two main parts to its body." },
      { heading: "Spinning webs", text: "Many spiders spin sticky webs from silk that they make inside their bodies." },
      { heading: "What spiders eat", text: "Spiders eat flies and other insects. Some spiders hunt by jumping on their prey." },
      { heading: "Spider eggs", text: "A mother spider lays her eggs in a little bag. Hundreds of tiny spiders hatch out." },
    ],
  },
  {
    title: "Looking After Your Teeth",
    sections: [
      { heading: "Brushing", text: "Brush your teeth twice a day for two minutes, using a small blob of toothpaste." },
      { heading: "Visiting the dentist", text: "The dentist checks that your teeth are healthy. Most people go twice a year." },
      { heading: "Food and drink", text: "Sweets and fizzy drinks can make holes in your teeth. Water and milk are better choices." },
      { heading: "Baby teeth", text: "Your first teeth are called baby teeth. They fall out to make room for bigger ones." },
    ],
  },
  {
    title: "Castles",
    sections: [
      { heading: "Why castles were built", text: "Kings and lords built castles to show how rich and powerful they were." },
      { heading: "Walls and towers", text: "Castle walls were made of thick stone. Guards kept watch from the tall towers." },
      { heading: "The moat", text: "Many castles had a moat, a deep ditch full of water, all the way around them." },
      { heading: "Life in a castle", text: "The lord and lady ate grand feasts in the great hall, and servants cooked in the kitchens." },
    ],
  },
  {
    title: "Frogs",
    sections: [
      { heading: "Frogspawn", text: "In spring, frogs lay their eggs in ponds. The eggs are called frogspawn." },
      { heading: "Tadpoles", text: "Tadpoles have long tails and swim like tiny fish." },
      { heading: "Grown-up frogs", text: "A grown-up frog has no tail. It has strong back legs for jumping." },
      { heading: "What frogs eat", text: "Frogs catch slugs and insects with their long, sticky tongues." },
    ],
  },
  {
    title: "Recycling",
    sections: [
      { heading: "Paper", text: "Old newspapers and cardboard boxes can be made into new paper." },
      { heading: "Plastic", text: "Plastic bottles can be turned into new things, such as fleece jackets." },
      { heading: "Glass", text: "Glass jars can be melted down and made into new jars." },
      { heading: "Food waste", text: "Fruit peel and vegetable scraps can go in a compost bin to feed the soil." },
    ],
  },
  {
    title: "The Seasons",
    sections: [
      { heading: "Spring", text: "Lambs are born and blossom appears on the trees." },
      { heading: "Summer", text: "The days are long and warm, and the sun sets late in the evening." },
      { heading: "Autumn", text: "Leaves turn orange and brown, then drop from the trees." },
      { heading: "Winter", text: "It is cold and dark, and sometimes it snows." },
    ],
  },
];

/**
 * Level 3 intruders: sub-headings that name their own subject, so they fit no
 * paragraph of another text. Generic ones ("What to do", "Spring", "Food and
 * drink") are never intruders: "Spring" would fit "In spring, frogs lay
 * their eggs", and "Food and drink" would fit the school lunch paragraph.
 * Owls and the bird feeder are both about birds, so they never swap.
 */
export const INTRUDERS = [
  { heading: "What owls eat", from: "Owls" },
  { heading: "Baby owls", from: "Owls" },
  { heading: "Which birds will visit", from: "Making a Bird Feeder" },
  { heading: "Pyramids", from: "Ancient Egypt" },
  { heading: "Mummies", from: "Ancient Egypt" },
  { heading: "The playground", from: "Our School" },
  { heading: "Spinning webs", from: "Spiders" },
  { heading: "Spider eggs", from: "Spiders" },
  { heading: "Visiting the dentist", from: "Looking After Your Teeth" },
  { heading: "The moat", from: "Castles" },
  { heading: "Walls and towers", from: "Castles" },
  { heading: "Tadpoles", from: "Frogs" },
  { heading: "Frogspawn", from: "Frogs" },
];

const NEVER_SWAP = [["Owls", "Making a Bird Feeder"]];

export function intrudersFor(title) {
  const blocked = new Set([title, ...NEVER_SWAP.filter((pair) => pair.includes(title)).flat()]);
  return INTRUDERS.filter((item) => !blocked.has(item.from));
}

export const QUESTIONS_PER_CHALLENGE = 5;

function pickQuestion(text, rng) {
  const [section] = sample(text.sections, 1, rng);
  const others = sample(text.sections.filter((item) => item !== section), 2, rng);
  return {
    kind: "pick",
    title: text.title,
    paragraph: section.text,
    answer: section.heading,
    struck: others[0].heading,
    options: shuffle([section.heading, ...others.map((item) => item.heading)], rng),
  };
}

/** Level 2: three of the four sections, in their order, as Paragraph 1–3. */
function matchQuestion(text, rng) {
  const keep = new Set(sample([0, 1, 2, 3], 3, rng));
  const sections = text.sections.filter((_, index) => keep.has(index));
  const blocks = sections.map((section, index) => ({ type: "p", label: `Paragraph ${index + 1}`, text: section.text }));
  const bins = sections.map((_, index) => ({ id: `p${index}`, label: `Paragraph ${index + 1}` }));
  const cards = sections.map((section, index) => ({ id: `h${index}`, label: section.heading, bin: `p${index}` }));
  return { kind: "match", passage: { title: text.title, kind: "report", blocks }, bins, cards: shuffle(cards, rng) };
}

/**
 * Level 3: one sub-heading is swapped for a sub-heading from a DIFFERENT
 * text, so it fits none of the paragraphs here.
 */
function spotQuestion(text, rng) {
  const wrongAt = Math.floor(rng() * text.sections.length);
  const [intruder] = sample(intrudersFor(text.title), 1, rng);
  const sections = text.sections.map((section, index) =>
    index === wrongAt ? { heading: intruder.heading, text: section.text } : section
  );
  return { kind: "spot", title: text.title, sections, answer: wrongAt, belongs: text.sections[wrongAt].heading };
}

function restoreQuestions(text, rng) {
  const options = shuffle(text.sections.map((section) => section.heading), rng);
  return text.sections.map((section, step) => ({
    kind: "restore",
    title: text.title,
    sections: text.sections,
    step,
    answer: section.heading,
    options,
  }));
}

export function buildHeadingQuestions(level, rng) {
  if (level === 4) return restoreQuestions(sample(TEXTS, 1, rng)[0], rng);
  const texts = sample(TEXTS, QUESTIONS_PER_CHALLENGE, rng);
  if (level === 1) return texts.map((text) => pickQuestion(text, rng));
  if (level === 2) return texts.map((text) => matchQuestion(text, rng));
  if (level === 3) {
    return texts.map((text) => spotQuestion(text, rng));
  }
  throw new Error(`no headings level ${level}`);
}

export function isMatchCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}
