// Small authoring shorthands; content and evidence stay explicit in each topic.
// The existing History engine owns drawing, randomisation and age limits.
export const story = (lines, picture, pictureLabel) => ({ lines, picture, pictureLabel });
export const photoStory = (lines, image) => ({ lines, image });
export const choice = (prompt, answer, wrong, answeredBy, extra = {}) => ({
  type: "choice", prompt, answer, wrong, answeredBy,
  hint: "Open Bix's story. Find the words that help you.", ...extra,
});
export const sort = (prompt, labels, cards, answeredBy) => ({
  type: "sort", prompt, bins: labels.map((label, i) => ({ id: String(i), label })),
  cards: cards.map(([label, bin]) => [label, String(bin)]), answeredBy,
  hint: "Open Bix's story. Check each card against the story.",
});
export const order = (prompt, labels, answeredBy) => ({
  type: "order", prompt, labels, answeredBy,
  hint: "Open Bix's story. Look for first, next and finally.",
});
export function topic(references, levels) {
  const banks = {}, plans = {};
  levels.forEach(([card, choices, structures = []], i) => {
    const level = i + 1;
    banks[`facts${level}`] = choices;
    const rounds = Array(5 - structures.length).fill(`facts${level}`);
    structures.forEach((structure, j) => {
      const name = `structure${level}_${j}`;
      banks[name] = [structure];
      rounds.splice(j === 0 ? 1 : 3, 0, name);
    });
    plans[level] = { story: card, rounds };
  });
  return { year: 2, references, levels: plans, banks };
}

// An authentic portrait is evidence of appearance, not proof of every action.
// Visible details are checked against the downloaded picture, not its filename.
export function portrait(image, name, feature, evidence, action) {
  const visual = { type: "source", image };
  const c = (p, a, w, e) => choice(p, a, w, e, { visual });
  const card = photoStory([
    `This old photo shows ${name}.`,
    `It shows ${feature}.`,
    "It cannot tell us how this person's voice sounded.",
    `The photo alone cannot prove ${action}.`,
  ], image);
  return [card, [
    c("What kind of source is this?", "a photo", ["a diary", "a map"], "old photo"),
    c("Who does this portrait show?", name, ["William Caxton", "Samuel Pepys"], name),
    c("What detail can you see?", feature, ["a space suit", "a bicycle helmet"], evidence),
    c("What does this photo help us learn?", "what the person looked like", ["how their voice sounded", "everything they did"], "It shows"),
    c("What would help us hear a voice?", "a sound recording", ["this silent photo", "a street map"], "cannot tell us how this person's voice sounded"),
    c("What needs more evidence than this portrait?", action, ["what clothes are shown", "what the person looked like"], "photo alone cannot prove"),
    c("Which claim is safe from this portrait?", "we can see their clothes", ["we know all their thoughts", "we can hear their voice"], "It shows"),
  ]];
}
export const lesson = (lines, picture, label, rows, structure) => [
  story(lines, picture, label),
  rows.map(([p, a, w1, w2, e]) => choice(p, a, [w1, w2], e)),
  structure ? [structure] : [],
];
