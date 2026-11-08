import { ch, pk, st, buildTopic } from "../../../topicBank.js";

/** Year 6 punctuation: a colon introduces a list; semi-colons separate list items that already contain commas. */
export const RULE = "A colon introduces a list after a complete clause. When the items in a list already contain commas, semi-colons separate the items so the reader can see where each one ends.";

/** Colon lists: a complete clause, a colon, then items. */
export const colonLists = [
  "Pack three things: a torch, a map and a compass.",
  "The recipe needs four ingredients: flour, eggs, milk and butter.",
  "We visited three countries: France, Spain and Italy.",
  "Each pupil brought something healthy: an apple, a banana or some grapes.",
  "The zoo has several big cats: lions, tigers and leopards.",
  "Our team needs four players: a goalkeeper, two defenders and a striker.",
  "Gather the equipment: scissors, glue and coloured paper.",
  "The museum has three galleries: art, science and history.",
];

/** Semi-colon lists: each item already contains a comma. */
export const semicolonLists = [
  "I have friends in Paris, France; Madrid, Spain; and Rome, Italy.",
  "The team included Mia, the captain; Leo, the goalkeeper; and Sam, the striker.",
  "We bought apples, which were red; pears, which were green; and plums, which were purple.",
  "The visitors were Ms Khan, the head; Mr Cole, the caretaker; and Mrs Reed, the cook.",
  "The trip stops at Dover, by the sea; Canterbury, with its cathedral; and London, the capital.",
  "The prizes went to Ellie, for art; Zayn, for maths; and Priya, for music.",
  "Our pets are Biscuit, a dog; Mittens, a cat; and Bubbles, a goldfish.",
];

export const lists = [...colonLists.map(text => ({ kind: "colon", text })), ...semicolonLists.map(text => ({ kind: "semicolon", text }))];

const splitAt = (text, mark) => { const at = text.indexOf(mark); return [text.slice(0, at), text.slice(at + 1).trim()]; };
/** The correct sentence and three common errors. */
const variants = ({ kind, text }) => {
  if (kind === "colon") {
    const [lead, items] = splitAt(text, ":");
    return { right: text, wrong: [`${lead} ${items}`, `${lead}, ${items}`, `${lead}; ${items}`] };
  }
  const all = text.replace(/; /g, ", ");
  const [first, ...rest] = text.split("; ");
  return { right: text, wrong: [all, text.replace(/; /g, ": "), `${first}, ${rest.join("; ")}`] };
};

const hint = "Look at what comes before the list. A complete clause is followed by a colon. If the items contain commas, use semi-colons between the items.";
const intro = { colon: "Use a colon after a complete clause to introduce a list.", semicolon: "The items contain commas, so use semi-colons between the items." };

const draft = ({ kind, text }) => (kind === "colon" ? text.replace(":", "").replace(/\.$/, "") : text.replace(/;/g, "").replace(/\.$/, ""));

const slot1 = lists.map(item => { const v = variants(item); return ch(
  item.kind === "colon" ? "Which sentence uses a colon correctly to introduce the list?" : "Which sentence uses semi-colons correctly to separate the items?",
  v.right, v.wrong, { text: `${intro[item.kind]} Draft: ${draft(item)}.`, hint }); });

const slot2 = lists.map((_, i) => {
  const good = [lists[i], lists[(i + 8) % lists.length]];
  const bad = [lists[(i + 3) % lists.length], lists[(i + 11) % lists.length]];
  return st(`Sort the lists: which are punctuated correctly and which need fixing (set ${i + 1})?`, ["Punctuated correctly", "Needs fixing"],
    [[good[0].text, 0], [good[1].text, 0], [variants(bad[0]).wrong[0], 1], [variants(bad[1]).wrong[1], 1]],
    { hint: "A list after a complete clause needs a colon. Items that contain commas need semi-colons between them." });
});

const slot3 = lists.map(item => {
  const markIndex = item.text.indexOf(item.kind === "colon" ? ":" : ";");
  const tokens = item.text.replace(/[:;]/, "").split(" ");
  const answer = item.text.slice(0, markIndex).split(" ").length;
  return pk(
    item.kind === "colon" ? "Tap the gap where the colon belongs to introduce the list." : "Tap the gap where the first semi-colon belongs between the items.",
    tokens, answer,
    { mode: "gap", innerGaps: true, text: intro[item.kind], hinted: [answer - 1, answer], hint },
  );
});

const slot4 = lists.map(item => { const v = variants(item); return ch(
  "Which version of this note is punctuated correctly?", v.right, v.wrong,
  { passage: { title: "Draft", blocks: [{ type: "p", text: draft(item) }] }, hint }); });

export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildPunctuationInLists = buildTopic(topic);
