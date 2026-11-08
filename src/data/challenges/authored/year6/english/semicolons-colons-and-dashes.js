import { ch, pk, st, buildTopic } from "../../../topicBank.js";

/** Year 6 punctuation: a semi-colon, colon or dash marks the boundary between two independent clauses. */
export const RULE = "An independent clause (a group of words that makes sense alone) can be joined to another with a semi-colon (balanced ideas), a colon (the second explains the first) or a dash (a pause or surprise). A comma alone is not enough.";

export const MARKS = {
  semicolon: { name: "semi-colon", mark: ";", role: "two closely related ideas of equal weight" },
  colon: { name: "colon", mark: ":", role: "the second clause explains the first" },
  dash: { name: "dash", mark: " –", role: "a pause or a surprise" },
};

/** Two independent clauses, the mark that suits them, and the closing punctuation. */
export const pairs = [
  { kind: "semicolon", one: "It is raining", two: "I am fed up." },
  { kind: "semicolon", one: "The sun set", two: "the stars appeared." },
  { kind: "semicolon", one: "Leo loves football", two: "Priya prefers netball." },
  { kind: "semicolon", one: "The path was icy", two: "we walked carefully." },
  { kind: "semicolon", one: "Some pupils walk to school", two: "others cycle." },
  { kind: "semicolon", one: "The library was quiet", two: "the playground was noisy." },
  { kind: "colon", one: "The match was cancelled", two: "the pitch was flooded." },
  { kind: "colon", one: "Mia was thrilled", two: "she had won first prize." },
  { kind: "colon", one: "Be careful on the stairs", two: "the floor is wet." },
  { kind: "colon", one: "Zayn was late", two: "his bus had broken down." },
  { kind: "colon", one: "The room fell silent", two: "the headteacher had arrived." },
  { kind: "dash", one: "I opened the box", two: "it was empty." },
  { kind: "dash", one: "The door creaked open", two: "nobody was there." },
  { kind: "dash", one: "We waited for hours", two: "the train never came." },
  { kind: "dash", one: "She looked at the sky", two: "a storm was coming." },
];

const join = ({ kind, one, two }) => (kind === "dash" ? `${one} – ${two}` : `${one}${MARKS[kind].mark} ${two}`);
const spliced = ({ one, two }) => `${one}, ${two}`;
const runOn = ({ one, two }) => `${one} ${two}`;
const misplaced = ({ kind, one, two }) => {
  const words = one.split(" ");
  const last = words.pop();
  return `${words.join(" ")}${kind === "dash" ? " –" : MARKS[kind].mark} ${last} ${two}`;
};
const wrongSet = pair => [spliced(pair), runOn(pair), misplaced(pair)];
export const hint = "Check that each side of the mark could stand alone as a sentence, and that one mark (not a comma) sits exactly between them.";

const slot1 = pairs.map(pair => ch(
  `Which sentence uses a ${MARKS[pair.kind].name} correctly to join two independent clauses?`, join(pair), wrongSet(pair),
  { text: `Use a ${MARKS[pair.kind].name} when you want ${MARKS[pair.kind].role}.`, hint },
));

const slot2 = pairs.map((_, i) => {
  const good = [pairs[i], pairs[(i + 6) % pairs.length]];
  const bad = [pairs[(i + 3) % pairs.length], pairs[(i + 10) % pairs.length]];
  return st(`Sort the sentences: which are correctly joined and which need fixing (set ${i + 1})?`, ["Correctly joined", "Needs fixing"],
    [[join(good[0]), 0], [join(good[1]), 0], [spliced(bad[0]), 1], [runOn(bad[1]), 1]],
    { hint: "A comma between two independent clauses is not strong enough, and with no mark at all they run together." });
});

const slot3 = pairs.map(pair => {
  const tokens = [...pair.one.split(" "), ...pair.two.split(" ")];
  const answer = pair.one.split(" ").length;
  return pk(`Tap the gap where the ${MARKS[pair.kind].name} belongs to join the two independent clauses.`, tokens, answer,
    { mode: "gap", innerGaps: true, text: `The ${MARKS[pair.kind].name} goes exactly between the two clauses.`, hinted: [answer - 1, answer], hint });
});

const relation = { semicolon: "The two ideas are closely related and equally important.", colon: "The second clause explains why or how the first happened.", dash: "The writer wants a pause or a surprise before the second clause." };
const slot4 = pairs.map(pair => ch(
  "Which sentence is punctuated correctly to join the two clauses?", join(pair), wrongSet(pair),
  { text: relation[pair.kind], hint },
));

export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildSemicolonsColonsAndDashes = buildTopic(topic);
