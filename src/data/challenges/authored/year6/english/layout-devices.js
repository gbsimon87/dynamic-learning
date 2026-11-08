import { ch, pk, st, buildTopic } from "../../../topicBank.js";

/** Year 6 grammar: layout devices that structure a text (headings, sub-headings, columns, bullets, tables). */
export const RULE = "Layout devices structure a text for the reader: a heading names the whole text, a sub-heading names one part, bullets list short items, a table lines up facts to compare, and columns split text into strips.";

export const DEVICES = {
  heading: "Heading (names the whole text)",
  subheading: "Sub-heading (names one part)",
  bullets: "Bullet points (a short list)",
  table: "Table (rows and columns to compare)",
  columns: "Columns (text in side-by-side strips)",
};

/** A job for the reader, the device that does it, and a short card label. */
export const jobs = [
  { device: "heading", job: "show the title of a whole page", card: "The title of a whole page" },
  { device: "heading", job: "tell readers what a whole poster is about", card: "What the whole poster is about" },
  { device: "heading", job: "name the whole report at the top", card: "The name of the whole report" },
  { device: "subheading", job: "split a long page into smaller parts, each with its own topic", card: "Starting a new part of a long page" },
  { device: "subheading", job: "mark where the section about feeding begins", card: "Where the feeding section begins" },
  { device: "subheading", job: "introduce the paragraph about tickets underneath the main title", card: "Introducing the tickets paragraph" },
  { device: "bullets", job: "list four things to pack, one on each line, in no special order", card: "Four things to pack" },
  { device: "bullets", job: "list the rules for a game so they are quick to scan", card: "Quick game rules" },
  { device: "bullets", job: "list the items on a shopping list", card: "A shopping list" },
  { device: "table", job: "show the times of three trains to three towns so they can be compared", card: "Train times to compare" },
  { device: "table", job: "compare the prices of three snacks in two shops", card: "Snack prices in two shops" },
  { device: "table", job: "set out the scores of four teams over three rounds in rows and boxes", card: "Scores for four teams" },
  { device: "columns", job: "lay out a school newsletter in narrow strips like a newspaper page", card: "A newsletter like a newspaper" },
  { device: "columns", job: "fit a long article into tall side-by-side strips so each line is short", card: "A long article in strips" },
  { device: "columns", job: "print a guide in narrow strips next to each other", card: "A guide in narrow strips" },
];

/** Leaflets: a main heading plus two sections (each a sub-heading and a paragraph), the second ending in bullets. */
export const leaflets = [
  { main: "Our School Garden", a: ["Planting the seeds", "Each class plants beans and sunflowers in spring."], b: ["What to bring", "a spade", "a watering can", "gloves"] },
  { main: "Visit the Harbour Museum", a: ["Opening times", "The museum opens at ten and closes at four."], b: ["What to see", "old fishing boats", "a lighthouse lamp", "a model ship"] },
  { main: "Cycling Safely", a: ["Check your bike", "Make sure your brakes and tyres work before every ride."], b: ["What to wear", "a helmet", "bright clothes", "sturdy shoes"] },
  { main: "Rainforest Facts", a: ["Where they grow", "Rainforests grow near the equator, where it is warm and wet."], b: ["Animals you might see", "jaguars", "toucans", "tree frogs"] },
  { main: "Join the Chess Club", a: ["When we meet", "We meet in room five every Wednesday after school."], b: ["What you need", "a pencil", "a notebook", "a friendly attitude"] },
  { main: "Baking Fairy Cakes", a: ["Before you start", "Wash your hands and put on an apron."], b: ["Ingredients", "flour", "sugar", "butter"] },
  { main: "Our Trip to the Castle", a: ["Getting there", "The coach leaves the school gate at nine o'clock."], b: ["Packing list", "a packed lunch", "a raincoat", "a water bottle"] },
  { main: "Looking After a Hamster", a: ["Feeding time", "Give your hamster fresh food and water each morning."], b: ["What a hamster needs", "a big cage", "a running wheel", "soft bedding"] },
];

const hint = "Think about what the reader needs to do: find a part, scan a list, compare facts or read narrow lines.";
const labelOf = key => DEVICES[key];
const others = (key, turn) => {
  const rest = Object.keys(DEVICES).filter(k => k !== key);
  return [...rest.slice(turn % 4), ...rest.slice(0, turn % 4)].slice(0, 3);
};

const slot1 = jobs.map((item, i) => ch(
  `A writer needs to ${item.job}. Which layout device helps most?`, labelOf(item.device),
  others(item.device, i).map(labelOf),
  { text: "A layout device is a way of arranging a text so the reader can find and understand things quickly.", hint },
));

const bySort = [["Headings and sub-headings", ["heading", "subheading"]], ["Bullet points", ["bullets"]], ["Tables and columns", ["table", "columns"]]];
const pickCard = (keys, step) => { const pool = jobs.filter(job => keys.includes(job.device)); return pool[step % pool.length]; };
const slot2 = jobs.map((_, i) => st(
  `Sort each job by the layout device that does it best (set ${i + 1}).`, bySort.map(([label]) => label),
  bySort.map(([, keys], bin) => [pickCard(keys, i + bin * 2).card, bin]),
  { hint: "Titles and part-names need headings. Quick lists need bullets. Facts to compare, or narrow strips of text, need a table or columns." },
));

const sectionText = section => (section.length === 2 ? section[1] : section.slice(1).map(item => `• ${item}`).join(" "));
const slot3 = leaflets.flatMap(({ main, a, b }) => [a, b].map(target => {
  const tokens = [main, a[0], sectionText(a), b[0], sectionText(b)];
  const answer = tokens.indexOf(target[0]);
  return pk(
    `This leaflet has a main heading and two sub-headings. Tap the sub-heading that introduces the part about “${target[0].toLowerCase()}”.`,
    tokens, answer,
    { variant: "sentences", text: "The main heading is first. A sub-heading sits above the part it names.", hinted: [answer, 0], hint: "A sub-heading names the part directly underneath it. The main heading names the whole leaflet." },
  );
}));

const bulletBlock = items => items.map(text => ({ type: "p", text: `• ${text}` }));
const slot4 = leaflets.flatMap(({ main, a, b }) => {
  const passage = { title: main, blocks: [
    { type: "h", text: a[0] }, { type: "p", text: a[1] },
    { type: "h", text: b[0] }, ...bulletBlock(b.slice(1)),
  ] };
  return [
    ch(`Which device tells readers where the part about “${b[0].toLowerCase()}” begins?`, `The sub-heading “${b[0]}”`,
      [`The sub-heading “${a[0]}”`, `The bullet points under “${b[0]}”`, `The paragraph under “${a[0]}”`], { passage, hint }),
    ch(`Why did the writer use bullet points under “${b[0]}”?`, "The items are short, so readers can scan them quickly.",
      ["The items must be read in order, like a story.", "Bullet points name the whole leaflet.", "The items are long and need full paragraphs."], { passage, hint }),
  ];
});

export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildLayoutDevices = buildTopic(topic);
