// Report comment builder: pure, deterministic templates. Nothing here stores or
// sends pupil data; the page keeps every input in memory only.

export const BANDS = [
  { id: "none", label: "Not reported" },
  { id: "towards", label: "Working towards" },
  { id: "expected", label: "Expected" },
  { id: "greater", label: "Greater depth" },
];

export const PRONOUNS = {
  they: { label: "They", They: "They", they: "they", them: "them", their: "their", Their: "Their", are: "are", have: "have" },
  she: { label: "She", They: "She", they: "she", them: "her", their: "her", Their: "Her", are: "is", have: "has" },
  he: { label: "He", They: "He", they: "he", them: "him", their: "his", Their: "His", are: "is", have: "has" },
};

// Verbs other than are/have only follow {name}, never a pronoun, so every
// sentence agrees whichever pronoun the teacher chooses.
export const BEHAVIOURS = [
  { id: "effort", label: "Works hard", lines: ["{name} works hard in every lesson and always tries {their} best.", "{name} puts real effort into {their} learning and takes pride in {their} work."] },
  { id: "curiosity", label: "Curious", lines: ["{name} is curious about the world and asks thoughtful questions.", "{name} brings real curiosity to lessons and loves finding out more."] },
  { id: "kindness", label: "Kind to others", lines: ["{name} is a kind and caring member of our class.", "{name} looks after others and is a thoughtful friend to {their} classmates."] },
  { id: "independence", label: "Independent", lines: ["{name} works independently and gets started on tasks with confidence.", "{name} can organise {their} own learning and work well without adult help."] },
  { id: "resilience", label: "Resilient", lines: ["{name} keeps going when work is tricky and learns from mistakes.", "{name} shows resilience and does not give up when a task is a challenge."] },
  { id: "participation", label: "Joins in", lines: ["{name} joins in enthusiastically with class discussions.", "{name} shares {their} ideas confidently and listens well to others."] },
  { id: "teamwork", label: "Good team player", lines: ["{name} works well with others and is a helpful partner in group work.", "{name} is a good team player who shares ideas and takes turns fairly."] },
  { id: "focus", label: "Focused", lines: ["{name} listens carefully and concentrates well in lessons.", "{name} stays focused on {their} work and follows instructions carefully."] },
];

export const TARGETS = [
  { id: "reading", label: "Read at home daily", lines: ["Reading at home every day will help {name} keep growing as a reader.", "Daily reading at home, and talking about the books, will help {them} keep making progress."] },
  { id: "times-tables", label: "Practise times tables", lines: ["Regular times tables practice at home will help {them} become quicker and more confident.", "Practising times tables little and often will help {name} recall facts quickly."] },
  { id: "spelling", label: "Practise spellings", lines: ["Practising spellings at home will help {name} use them accurately in {their} writing.", "Learning the weekly spellings will help {them} write with more accuracy."] },
  { id: "presentation", label: "Take care with presentation", lines: ["Taking extra care with handwriting and presentation is a good next step.", "Next year, {name} should take a little more care with the presentation of {their} work."] },
  { id: "confidence", label: "Share ideas more", lines: ["Next year, I would love to see {name} share {their} ideas in class more often.", "{name} has great ideas, and sharing them more often in class is a good next step."] },
  { id: "independence", label: "Work more independently", lines: ["Starting tasks independently, before asking for help, will help {them} next year.", "A good next step for {name} is to try tasks independently before asking for help."] },
];

const OPENINGS = [
  "{name} has had a positive year in Year {year}.",
  "It has been a pleasure to teach {name} in Year {year}.",
  "{name} has made a great start to life in Year {year} and grown in confidence throughout the year.",
];
const CLOSINGS = [
  "Well done on a great year, {name}!",
  "I have really enjoyed teaching {them} this year. Well done, {name}!",
  "{name} should be proud of {their} year. Keep it up!",
];
const BAND_LINES = {
  greater: ["In {subject}, {name} is working at greater depth.", "{name} is working at greater depth in {subject}."],
  expected: ["In {subject}, {name} is working at the expected standard.", "{name} is working at the expected standard in {subject}."],
  towards: ["In {subject}, {name} is working towards the expected standard.", "{name} is working towards the expected standard in {subject}."],
};
const STRENGTH_LINES = [
  "{They} {have} shown real confidence in our work on {topics}.",
  "A particular strength has been {their} work on {topics}.",
];
const NEXT_LINES = [
  "{Their} next step is to build confidence with {topic}.",
  "To keep improving, {name} should continue to practise {topic}.",
];

// Proper nouns that stay capitalised when a topic title is used in a sentence.
// Drawn from the built curriculum's topic titles; extend it when a new topic
// title brings another name, place, period or language.
const PROPER = new Set(("UK OS I Britain British England English Scotland Scots Ireland Wales Europe European French Spain Russia Brazil Belize Australia Americas American Caribbean "
  + "London Whitby Jarrow Florence Athens Sparta Greece Greek Greeks Egypt Egyptian Egyptians Nile Amazon Andalusia Kampong Ayer Rome Roman Romans Viking Vikings Anglo-Saxon Anglo-Saxons Norman Normans "
  + "Maya Chichen Itza Persians Celts Celtic Stonehenge Skara Brae Sutton Hoo Lindisfarne Jorvik Parthenon Danegeld Hadrian Christianity Olympic Olympics "
  + "Victoria Elizabeth Edward Alfred Athelstan Cnut Claudius Julius Caesar Boudica Bede Venerable Confessor Columbus Christopher Caxton Cavell Edith Emily Davison Mary Seacole Florence Nightingale "
  + "Neil Armstrong Rosa Parks Tim Berners-Lee William Wright Washington Tutankhamun Peel Palmer Alexander Magna Carta Queen King Great Fire Equator Earth Moon "
  + "January February March April May June July August September October November December Monday Tuesday Wednesday Thursday Friday Saturday Sunday").split(/\s+/));
// Names whose second word is only capitalised as part of the name.
const PROPER_PHRASES = ["Bonfire Night", "Remembrance Day", "Hadrian's Wall", "Roman Empire", "River Nile", "North American", "South American", "Olympic Games", "Stone Age", "Bronze Age", "Iron Age", "Wright Brothers", "Scottish Highlands", "the Highlands", "Washington State"];
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A topic title written for the middle of a sentence: "Column Addition" → "column addition". */
export function topicPhrase(title) {
  const phrase = String(title).trim().split(/\s+/).map((word) => {
    const core = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").replace(/['’]s$/u, "");
    if (/\d/.test(core)) return core.includes("-") ? word.toLowerCase() : word;
    if ((core.length > 1 && core === core.toUpperCase()) || PROPER.has(core)) return word;
    if (core.includes("-") && core.split("-").every((part) => PROPER.has(part))) return word;
    return word.toLowerCase();
  }).join(" ");
  return PROPER_PHRASES.reduce((text, name) => text.replace(new RegExp(`\\b${escape(name)}\\b`, "gi"), name), phrase);
}

export function subjectPhrase(name) {
  return String(name).replace(/\s*&\s*/g, " and ");
}

const listPhrase = (items) => items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
const pick = (lines, variant, offset) => lines[(variant + offset) % lines.length];
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export function fill(template, { name, pronoun = "they", ...values }) {
  const words = PRONOUNS[pronoun] ?? PRONOUNS.they;
  const shown = String(name ?? "").trim() || "[Name]";
  return sentence(template.replace(/\{(\w+)\}/g, (match, key) => key === "name" ? shown : key in values ? values[key] : key in words && key !== "label" ? words[key] : match));
}

/**
 * Builds the editable draft. `subjects` is [{ name, band, strengths: [topic titles], nextStep }].
 * `variant` rotates every sentence slot independently so "Reword" changes the
 * whole comment, not one line.
 */
export function buildReport({ name = "", pronoun = "they", year, subjects = [], behaviours = [], target = null, variant = 0 }) {
  const ctx = { name, pronoun, year: String(year) };
  const v = Math.max(0, Math.floor(Number(variant) || 0));
  const opening = [fill(pick(OPENINGS, v, 0), ctx), ...behaviours.map((id) => BEHAVIOURS.find((b) => b.id === id)).filter(Boolean).map((b, i) => fill(pick(b.lines, v, i + 1), ctx))];
  const subjectParagraphs = subjects.filter((subject) => subject.band && subject.band !== "none" && BAND_LINES[subject.band]).map((subject, i) => {
    const values = { ...ctx, subject: subjectPhrase(subject.name) };
    const lines = [fill(pick(BAND_LINES[subject.band], v, i), values)];
    const strengths = [...new Set((subject.strengths ?? []).filter(Boolean))].map(topicPhrase);
    if (strengths.length) lines.push(fill(pick(STRENGTH_LINES, v, i + 1), { ...values, topics: listPhrase(strengths) }));
    if (subject.nextStep) lines.push(fill(pick(NEXT_LINES, v, i), { ...values, topic: topicPhrase(subject.nextStep) }));
    return lines.join(" ");
  });
  const targetLine = TARGETS.find((t) => t.id === target);
  const closing = [targetLine ? fill(pick(targetLine.lines, v, 0), ctx) : null, fill(pick(CLOSINGS, v, 2), ctx)].filter(Boolean);
  return [opening.join(" "), ...subjectParagraphs, closing.join(" ")].join("\n\n");
}

export function countReport(text) {
  const trimmed = String(text).trim();
  return { characters: String(text).length, words: trimmed ? trimmed.split(/\s+/).length : 0 };
}
