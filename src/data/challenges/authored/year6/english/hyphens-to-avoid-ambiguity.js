import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 punctuation: a hyphen can avoid ambiguity (man-eating shark; re-cover). */
export const RULE = "A hyphen can stop a phrase having two meanings. It joins words that work together as one idea (man-eating shark) and separates a prefix when the word would otherwise mean something else (re-cover, not recover).";

/** hy / un: the hyphenated and unhyphenated forms; mh / mu: what each means; sh / su: a sentence using each. */
export const rows = [
  { hy: "man-eating shark", un: "man eating shark", mh: "a shark that eats people", mu: "a man who is eating a shark", sh: "The lifeguard spotted a man-eating shark.", su: "The man eating shark held a fork." },
  { hy: "dog-eating monster", un: "dog eating monster", mh: "a monster that eats dogs", mu: "a dog that is eating a monster", sh: "The story was about a dog-eating monster.", su: "The dog eating monster looked very proud." },
  { hy: "cat-chasing dog", un: "cat chasing dog", mh: "a dog that chases cats", mu: "a cat that is chasing a dog", sh: "We saw a cat-chasing dog in the park.", su: "We saw a cat chasing dog down the lane." },
  { hy: "small-business owner", un: "small business owner", mh: "someone who owns a small business", mu: "a small person who owns a business", sh: "A small-business owner opened the bakery.", su: "A small business owner reached up to the sign." },
  { hy: "little-used car", un: "little used car", mh: "a car that has hardly been used", mu: "a car that is small and second-hand", sh: "Dad bought a little-used car.", su: "Dad bought a little used car for Gran." },
  { hy: "twenty-odd people", un: "twenty odd people", mh: "about twenty people", mu: "twenty strange people", sh: "Twenty-odd people came to the meeting.", su: "Twenty odd people wore their coats backwards." },
  { hy: "light-blue bag", un: "light blue bag", mh: "a bag that is a pale shade of blue", mu: "a blue bag that does not weigh much", sh: "She carried a light-blue bag.", su: "She carried a light blue bag up the hill." },
  { hy: "bird-watching group", un: "bird watching group", mh: "a group that watches birds", mu: "a bird that is watching a group", sh: "The bird-watching group met at dawn.", su: "The bird watching group from the tree looked puzzled." },
  { hy: "five-pound notes", un: "five pound notes", mh: "notes that are each worth five pounds", mu: "five notes that are each worth one pound", sh: "He gave the cashier two five-pound notes.", su: "He found five pound notes in his coat." },
  { hy: "re-cover", un: "recover", mh: "to cover something again", mu: "to get something back", sh: "We need to re-cover the old sofa.", su: "We hope to recover the lost trophy." },
  { hy: "re-sign", un: "resign", mh: "to sign again", mu: "to leave a job", sh: "The club will re-sign its best player.", su: "The captain will resign from the team." },
  { hy: "re-form", un: "reform", mh: "to form again", mu: "to change something to improve it", sh: "The band will re-form next year.", su: "The council will reform the rules." },
  { hy: "re-dress", un: "redress", mh: "to dress again", mu: "to put right a wrong", sh: "Ella had to re-dress the doll.", su: "The headteacher will redress the unfairness." },
  { hy: "re-treat", un: "retreat", mh: "to treat again", mu: "to move back from danger", sh: "Dad will re-treat the wood with varnish.", su: "The army had to retreat from the hill." },
  { hy: "re-lay", un: "relay", mh: "to lay again", mu: "to pass something on", sh: "The workers will re-lay the carpet.", su: "Please relay the message to Mum." },
];

const hint = "Say both meanings aloud. The hyphen joins words (or a prefix) that belong together, so decide which meaning the writer wants.";
const at = (i, step) => rows[(i + step) % rows.length];
/** The hyphenated sentence with its hyphen removed, keeping any capital letter. */
const unhyphened = row => row.sh.replace(new RegExp(row.hy, "i"), match => (match[0] === match[0].toUpperCase() ? row.un[0].toUpperCase() + row.un.slice(1) : row.un));

const slot1 = rows.map((row, i) => ch(
  `Which sentence is about ${row.mh}?`, row.sh, [row.su, at(i, 4).sh, at(i, 9).su],
  { text: `A hyphen changes the meaning: “${row.hy}” is not the same as “${row.un}”.`, hint },
));

const slot2 = rows.map((row, i) => st(
  `Sort the cards by their meaning: “${row.hy}” or “${row.un}” (set ${i + 1}).`, [`With the hyphen: ${row.hy}`, `Without it: ${row.un}`],
  [[row.mh, 0], [row.sh, 0], [row.mu, 1], [row.su, 1]],
  { hint },
));

const slot3 = rows.map((row, i) => {
  const wantsHyphen = i % 2 === 0;
  const answer = wantsHyphen ? row.sh : row.su;
  const other = wantsHyphen ? row.un : row.hy;
  const inAnswer = answer.replace(/[.]$/, "").toLowerCase().split(" ");
  const more = other.split(" ").filter(word => !inAnswer.includes(word.toLowerCase()));
  return bd(`Build the sentence that means: ${wantsHyphen ? row.mh : row.mu}.`, answer, { more, text: `Choose the spelling with or without the hyphen: “${row.hy}” or “${row.un}”.`, hint });
});

const slot4 = rows.map((row, i) => ch(
  `The writer meant ${row.mh}. Which rewrite makes that meaning clear?`, row.sh, [unhyphened(row), row.su, at(i, 6).sh],
  { passage: { title: "Draft", blocks: [{ type: "p", text: unhyphened(row) }] }, hint },
));

export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildHyphensToAvoidAmbiguity = buildTopic(topic);
