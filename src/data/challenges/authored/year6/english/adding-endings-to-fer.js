import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 spelling: Appendix 1, vowel-letter suffixes after -fer. */
export const RULE = "When a vowel-letter ending is added to a word ending in **-fer**, double the r only if the -fer sound is still stressed.";

const forms = [
  ["refer", "ing", "referring", ["refering", "referrring", "reffering"]],
  ["refer", "ed", "referred", ["refered", "referrred", "reffered"]],
  ["refer", "al", "referral", ["referal", "referrral", "refferal"]],
  ["prefer", "ing", "preferring", ["prefering", "preferrring", "preffering"]],
  ["prefer", "ed", "preferred", ["prefered", "preferrred", "preffered"]],
  ["transfer", "ing", "transferring", ["transfering", "transferrring", "transferringg"]],
  ["transfer", "ed", "transferred", ["transfered", "transferrred", "transferredr"]],
  ["refer", "ence", "reference", ["referrence", "referance", "reffrence"]],
  ["refer", "ee", "referee", ["referree", "refferee", "referie"]],
  ["prefer", "ence", "preference", ["preferrence", "preferance", "prefference"]],
  ["transfer", "ence", "transference", ["transferrence", "transferance", "transfference"]],
  ["defer", "ing", "deferring", ["defering", "deferrring", "deffering"]],
  ["defer", "ed", "deferred", ["defered", "deferrred", "deffered"]],
  ["defer", "ence", "deference", ["deferrence", "deferance", "defference"]],
  ["prefer", "ential", "preferential", ["preferrential", "preferencial", "prefferential"]],
];

const visibleParts = (root, suffix) => `Root ‘${root}’ + suffix ‘${suffix}’`;
const spellingHint = "Say the word. Is the **fer** part still the strong beat? If it is, use two r letters; if not, keep the one already in the root.";

const slot1 = forms.map(([root, suffix, answer, wrong, context = "this word"]) => ch(
  `Which spelling correctly joins the root and ending for ${context}?`, answer, wrong,
  { text: visibleParts(root, suffix), visualKind: "wordParts", hint: spellingHint },
));

const doubled = [
  ["refer + ing → referring", 0], ["refer + ed → referred", 0], ["refer + al → referral", 0],
  ["prefer + ing → preferring", 0], ["prefer + ed → preferred", 0],
  ["transfer + ing → transferring", 0], ["transfer + ed → transferred", 0],
  ["defer + ing → deferring", 0], ["defer + ed → deferred", 0],
];
const single = [
  ["refer + ence → reference", 1], ["refer + ee → referee", 1], ["prefer + ence → preference", 1],
  ["transfer + ence → transference", 1], ["defer + ence → deference", 1], ["prefer + ential → preferential", 1],
];
const sortSets = Array.from({ length: 15 }, (_, start) => [
  doubled[start % doubled.length],
  doubled[(start + 2) % doubled.length],
  doubled[(start + 4) % doubled.length],
  single[start % single.length],
  single[(start + 2) % single.length],
  single[(start + 4) % single.length],
]);
const slot2 = sortSets.map((cards, index) => st(
  `Sort these completed words by the spelling choice they needed (set ${index + 1}).`,
  ["Double the r", "Keep one r"], cards,
  { text: "Listen for whether the **fer** part stays stressed after the ending.", hint: "Use the word's strong beat, not the length of the ending. A word such as reference has only the r already in refer." },
));

const slot3 = forms.map(([root, suffix, answer, , context = "this word"]) => bd(
  `Build the completed word from the root and ending for ${context}.`, answer,
  { letters: true, text: visibleParts(root, suffix), visualKind: "wordParts", more: ["r"], hint: "Use the visible root and suffix. Add another r only when the -fer sound keeps its stress." },
));

const applications = [
  ["The librarian is ___ a page in the atlas.", "refer", "ing", "referring"],
  ["Mina ___ the visitor to the office.", "refer", "ed", "referred"],
  ["A doctor wrote a ___ for Sam to see a specialist.", "refer", "al", "referral"],
  ["I am ___ the blue cover to the green one.", "prefer", "ing", "preferring"],
  ["The judges ___ the first design.", "prefer", "ed", "preferred"],
  ["Use the book's ___ to find the map again.", "refer", "ence", "reference"],
  ["The match official is called the ___.", "refer", "ee", "referee"],
  ["The menu shows your ___ for soup or salad.", "prefer", "ence", "preference"],
  ["The museum is ___ the large painting carefully.", "transfer", "ing", "transferring"],
  ["The coach ___ the player to another team.", "transfer", "ed", "transferred"],
  ["The school arranged a ___ to the new class.", "transfer", "ence", "transference"],
  ["The librarian is ___ a reply until tomorrow.", "defer", "ing", "deferring"],
  ["The committee ___ its decision until next week.", "defer", "ed", "deferred"],
  ["Please show ___ when you speak to the visitor.", "defer", "ence", "deference"],
  ["The club gives ___ tickets to regular members.", "prefer", "ential", "preferential"],
];
const slot4 = applications.map(([sentence, root, suffix, answer]) => ({
  kind: "type", sentence, answer, text: visibleParts(root, suffix), visualKind: "wordParts",
  hint: spellingHint,
}));

export const topic = {
  rule: RULE,
  hint: spellingHint,
  levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 },
};

export const buildAddingEndingsToFer = buildTopic(topic);
