import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 grammar: ellipsis as a cohesive device (leaving out words the reader can work out). */
export const RULE = "Ellipsis means leaving out words that the reader can work out from what came before. It stops writing repeating itself and links the ideas together.";

/** The full wording, the version with words left out, and the first word that was left out. */
export const rows = [
  { full: "Leo ordered soup and Mia ordered pasta.", short: "Leo ordered soup and Mia, pasta.", left: "ordered" },
  { full: "Ravi packed a torch and Dev packed a map.", short: "Ravi packed a torch and Dev, a map.", left: "packed" },
  { full: "Amara likes swimming and Zayn likes cycling.", short: "Amara likes swimming and Zayn, cycling.", left: "likes" },
  { full: "The first prize was a trophy and the second prize was a medal.", short: "The first prize was a trophy and the second, a medal.", left: "prize" },
  { full: "Priya wanted to paint the fence but Sam did not want to paint the fence.", short: "Priya wanted to paint the fence but Sam did not.", left: "want" },
  { full: "Are you coming to the party? Yes, I am coming to the party.", short: "Are you coming to the party? Yes, I am.", left: "coming" },
  { full: "Mum made the sandwiches and Dad made the soup.", short: "Mum made the sandwiches and Dad, the soup.", left: "made" },
  { full: "Mia can play the flute and Leo can play the flute too.", short: "Mia can play the flute and Leo can too.", left: "play" },
  { full: "Ellie tidied her room because Mum asked her to tidy her room.", short: "Ellie tidied her room because Mum asked her to.", left: "tidy" },
  { full: "Who left the gate open? Zayn left the gate open.", short: "Who left the gate open? Zayn did.", left: "left" },
  { full: "The red team scored three goals and the blue team scored two goals.", short: "The red team scored three goals and the blue team, two.", left: "scored" },
  { full: "I wanted to visit the castle but my brother did not want to visit the castle.", short: "I wanted to visit the castle but my brother did not.", left: "want" },
  { full: "Do you like football? Yes, I do like football.", short: "Do you like football? Yes, I do.", left: "like" },
  { full: "Dad waters the tomatoes in the morning and Gran waters the tomatoes in the evening.", short: "Dad waters the tomatoes in the morning and Gran, in the evening.", left: "waters" },
  { full: "Leo has finished his book but Priya has not finished her book.", short: "Leo has finished his book but Priya has not.", left: "finished" },
];

const hint = "Ask which words the reader can already work out from the first part. Ellipsis leaves those words out and keeps the meaning clear.";
const at = (index, step) => rows[(index + step) % rows.length];

const bare = word => word.replace(/[^A-Za-z0-9']/g, "").toLowerCase();
/** Words of the full sentence that are missing from the shorter one. */
const omittedWords = row => {
  const kept = row.short.split(" ").map(bare);
  return row.full.split(" ").map(bare).filter(word => { const at = kept.indexOf(word); if (at >= 0) { kept.splice(at, 1); return false; } return true; });
};
const slot1 = rows.map(row => {
  const omitted = new Set(omittedWords(row));
  const present = [...new Set(row.short.split(" ").map(bare).filter(word => word && !omitted.has(word)))];
  return ch(`In “${row.short}”, which word has been left out because the reader can work it out?`, row.left,
    present.sort((x, y) => y.length - x.length).slice(0, 3),
    { text: `Full wording: ${row.full}`, hint });
});

const slot2 = rows.map((_, i) => st(
  `Sort the sentences: which use ellipsis and which repeat every word (set ${i + 1})?`,
  ["Ellipsis (words left out)", "Full wording (nothing left out)"],
  [[at(i, 0).short, 0], [at(i, 6).short, 0], [at(i, 3).full, 1], [at(i, 11).full, 1]],
  { hint: "If the second part repeats words from the first part, nothing was left out. If it is shorter but still clear, that is ellipsis." },
));

const slot3 = rows.map(row => bd(
  "Shorten the sentence with ellipsis. Build the version that leaves out the repeated words.", row.short,
  { more: [row.left], text: `Full wording: ${row.full}`, hint },
));

const slot4 = rows.map((row, i) => ch(
  "A writer wants to stop this sentence repeating itself but keep its meaning. Which rewrite uses ellipsis correctly?", row.short,
  [row.full, at(i, 5).short, at(i, 10).short],
  { passage: { title: "Draft", blocks: [{ type: "p", text: row.full }] }, hint },
));

export { omittedWords };
export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildEllipsis = buildTopic(topic);
