import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["After walking all day, Imani was weary.", "She was very tired.", "She was eager to race.", "She was lost."],
  ["The rabbit vanished into the hedge.", "It disappeared from sight.", "It sat very still.", "It grew larger."],
  ["A narrow path wound through the trees.", "The path bent and turned.", "The path was wide.", "The path was noisy."],
  ["The captain inspected the rope before sailing.", "The captain checked it carefully.", "The captain threw it away.", "The captain made it longer."],
  ["Mina hesitated at the edge of the icy pond.", "Mina paused because she was unsure.", "Mina ran quickly.", "Mina laughed loudly."],
  ["The old bridge was sturdy despite its age.", "The bridge was strong.", "The bridge was colourful.", "The bridge was crowded."],
  ["Leo whispered so he would not disturb the sleeping baby.", "Leo spoke very quietly.", "Leo spoke angrily.", "Leo forgot what to say."],
  ["The village celebrated when the rain finally arrived.", "The villagers were happy about the rain.", "The villagers wanted more sunshine.", "The villagers were leaving."],
  ["A faint bell rang far across the field.", "The bell sound was quiet.", "The bell was broken.", "The bell was nearby."],
  ["The seedlings began to flourish in the warm greenhouse.", "The seedlings grew well.", "The seedlings dried up.", "The seedlings were moved outside."],
  ["Nora peered through the mist for the harbour light.", "Nora looked carefully.", "Nora closed her eyes.", "Nora shouted a warning."],
  ["The museum displayed a rare coin behind glass.", "The coin was unusual and hard to find.", "The coin was made of glass.", "The coin was brand new."],
  ["The thunder rumbled in the distance.", "The thunder made a low sound far away.", "The thunder was silent.", "The thunder was inside the house."],
  ["Sam reluctantly handed over the last biscuit.", "Sam did it unwillingly.", "Sam did it with delight.", "Sam did it by accident."],
  ["The detective noticed a peculiar mark on the door.", "The mark seemed strange.", "The mark was very large.", "The mark was familiar."],
].map(([sentence, answer, ...wrong]) => ({ prompt: `Read “${sentence}”. Which meaning is supported by the context?`, answer, wrong }));

export const { topic, build: buildExploringMeaningInContext } = buildReadingTopic({
  rule: "Use the whole sentence as a clue. A nearby action or description can show what an unfamiliar word means.",
  hint: "Reread the sentence and replace the word with each meaning. Which one keeps the sentence sensible?", items,
});
