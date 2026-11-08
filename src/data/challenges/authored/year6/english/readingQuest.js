import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/**
 * Shared, deliberately text-first question shape for Year 6 reading. The
 * evidence is visible in each prompt; learners are never asked to guess a
 * hidden character feeling or author intention.
 */
export function createReadingBank({ rule, hint, items }) {
  const supported = (item) => item.answer;
  const extraTile = (item) => item.wrong[0].split(" ").find(word => !item.answer.split(" ").includes(word)) ?? "not";
  return {
    rule,
    hint,
    levels: {
      1: items.map(item => ch(item.prompt, supported(item), item.wrong, { hint: item.hint ?? hint })),
      2: items.map(item => st(`Sort the responses using this evidence: ${item.prompt}`, ["Supported by the text", "Not supported by the text"], [
        [supported(item), 0], ...item.wrong.slice(0, 2).map(wrong => [wrong, 1]),
      ], { hint: item.hint ?? hint })),
      3: items.map(item => bd(`Build the response that the evidence supports. ${item.prompt}`, supported(item), {
        more: [extraTile(item)], hint: item.hint ?? hint,
      })),
      4: items.map(item => ch(`Read carefully, then choose the best response. ${item.prompt}`, supported(item), item.wrong, { hint: item.hint ?? hint })),
    },
  };
}

export function buildReadingTopic(config) {
  const topic = createReadingBank(config);
  return { topic, build: buildTopic(topic) };
}
