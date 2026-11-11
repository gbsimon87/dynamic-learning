import { blockPicture3, partitionStandard } from "../challenges/placeValue3Digit.js";
import { STEPS, sequenceWithin1000 } from "../challenges/countingInMultiples.js";
import { buildPlaceChangeQuestions } from "../challenges/addingAndSubtractingPlaces.js";
import { buildColumnAdditionQuestions } from "../challenges/columnAddition3Digit.js";
import { buildColumnSubtractionQuestions } from "../challenges/columnSubtraction3Digit.js";
import { buildTenthsQuestions, buildSetQuestions } from "../challenges/year3Fractions.js";
export const PILOT_IDS = ["counting-in-multiples-of-4-8-50-and-100", "finding-10-or-100-more-or-less", "place-value-in-3-digit-numbers", "adding-and-subtracting-ones-tens-and-hundreds", "column-addition", "column-subtraction", "tenths", "fractions-of-a-set-of-objects"];

const numbered = (n) => n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;
function question(topicId, kind, mode, prompt, answer, reason, data, model = null) {
  return { id: `${topicId}:${kind}:${JSON.stringify(data)}`, topicId, kind, mode, prompt, answer: String(answer), reason, data, model };
}
export function pilotPracticePool(topicId) {
  if (!PILOT_IDS.includes(topicId)) return [];
  const pool = [];
  const add = (...args) => pool.push(question(topicId, ...args));
  if (topicId === PILOT_IDS[0]) {
    for (const step of STEPS) for (let startIndex = 0; startIndex < 9; startIndex++) {
      const terms = sequenceWithin1000(step, 4, () => startIndex / 12, { reserve: 1 });
      const answer = terms.at(-1) + step;
      add("sequence", "practice", `Count in ${step}s. Write the next number: ${terms.join(", ")}, ____`, answer, `Add ${step} to ${terms.at(-1)}.`, { step, terms }, { type: "sequence", terms: [...terms, "?"] });
      const ordinal = startIndex + 2;
      add("count-story", "application", `Count in ${step}s from 0, without saying 0. What is the ${numbered(ordinal)} number you say? Explain your method.`, ordinal * step, `${ordinal} × ${step} = ${ordinal * step}.`, { step, ordinal });
    }
  } else if (topicId === PILOT_IDS[2]) {
    const values = [146, 263, 408, 359, 705, 382, 617, 890, 524, 731, 208, 964, 572, 306, 819, 450];
    for (const value of values) {
      const blocks = blockPicture3(value);
      add("partition", "practice", `Partition ${value} into hundreds, tens and ones.`, partitionStandard(value).join(" + "), `${blocks.hundreds} hundreds, ${blocks.tens} tens and ${blocks.ones} ones.`, { value }, { type: "blocks", ...blocks });
      add("blocks-story", "application", `A number has ${blocks.hundreds} hundreds, ${blocks.tens} tens and ${blocks.ones} ones. What is the number? Explain the value of its tens digit.`, `${value}; the tens digit is worth ${blocks.tens * 10}`, `${blocks.tens} tens = ${blocks.tens * 10}.`, { value, tensValue: blocks.tens * 10 }, { type: "blocks", ...blocks });
    }
  } else if (topicId === PILOT_IDS[1] || topicId === PILOT_IDS[3]) {
    const originals = [1, 2, 4].flatMap((level) => buildPlaceChangeQuestions(level, () => 0.5));
    const starts = [...new Set(originals.map((q) => q.start))];
    for (const start of starts) for (const change of [-100, -10, ...(topicId === PILOT_IDS[3] ? [-1, 1] : []), 10, 100]) {
      const answer = start + change;
      if (answer < 0 || answer > 1000) continue;
      const operation = change > 0 ? "+" : "−";
      add("place-change", "practice", `Work out ${start} ${operation} ${Math.abs(change)}.`, answer, `${start} ${operation} ${Math.abs(change)} = ${answer}.`, { start, change }, { type: "blocks", ...blockPicture3(start) });
      add("place-story", "application", `There are ${start} books. ${Math.abs(change)} ${change > 0 ? "more arrive" : "are borrowed"}. How many books are there now? Show how you worked it out.`, answer, `${start} ${operation} ${Math.abs(change)} = ${answer}.`, { start, change });
    }
  } else if (topicId === PILOT_IDS[4] || topicId === PILOT_IDS[5]) {
    const adding = topicId === PILOT_IDS[4];
    const builder = adding ? buildColumnAdditionQuestions : buildColumnSubtractionQuestions;
    const operation = adding ? "+" : "−";
    const plans = [1, 2, 3].flatMap((level) => builder(level, () => 0.5));
    const stories = builder(4, () => 0.5);
    for (const { a, b, answer } of plans) {
      add("column", "practice", `Use a column method to work out ${a} ${operation} ${b}.`, answer, adding ? `Check: ${answer} − ${b} = ${a}.` : `Check: ${answer} + ${b} = ${a}.`, { a, b, operation }, { type: "column", a, b, operation });
      const story = stories[pool.length % stories.length];
      const prompt = story.prompt.replace(/\b\d+\b/g, (match) => Number(match) === story.a ? a : Number(match) === story.b ? b : match);
      add("column-story", "application", `${prompt} Show a column method.`, answer, `${a} ${operation} ${b} = ${answer}.`, { a, b, operation });
    }
  } else if (topicId === "tenths") {
    const denominator = buildTenthsQuestions(1, () => 0.5)[0].denominator;
    const numerators = Array.from({ length: denominator - 1 }, (_, n) => n + 1);
    for (const numerator of numerators) {
      add("read-tenths", "practice", "Write the fraction shaded on this bar.", `${numerator}/10`, `${numerator} of 10 equal parts are shaded.`, { numerator, denominator: 10 }, { type: "bar", parts: 10, shaded: numerator, essential: true });
      add("shade-tenths", "practice", `Shade ${numerator}/10 of this bar.`, `${numerator} of 10 parts shaded`, "Each part is one tenth.", { numerator, denominator: 10 }, { type: "bar", parts: 10, shaded: 0, essential: true });
      add("tenths-story", "application", `A ribbon is cut into 10 equal pieces. Sam uses ${numerator}. What fraction is used? What fraction is left?`, `${numerator}/10 used; ${10 - numerator}/10 left`, `The 10 equal pieces make one whole. ${10} − ${numerator} = ${10 - numerator}.`, { numerator, denominator: 10 });
      add("share-tenths", "application", `${numerator} cakes are shared equally between 10 children. What fraction of a cake does each child get? Explain your answer.`, `${numerator}/10`, `Each cake makes 10 equal shares. Each child gets ${numerator} tenths.`, { numerator, denominator: 10 });
    }
  } else if (topicId === PILOT_IDS[7]) {
    // Keep the existing bank's denominators and whole-number sharing structure;
    // enumerate additional 8–20 counter sets rather than retrying random draws.
    const denominators = [...new Set(buildSetQuestions(2, () => 0.5).map((q) => q.denominator))];
    for (const denominator of denominators) for (let total = 8; total <= 20; total++) {
      if (total % denominator) continue;
      for (let numerator = 1; numerator < denominator; numerator++) {
        const answer = total / denominator * numerator;
        const data = { total, numerator, denominator };
        const reason = `${total} ÷ ${denominator} = ${total / denominator}; ${total / denominator} × ${numerator} = ${answer}.`;
        add("fraction-set", "practice", `Find ${numerator}/${denominator} of ${total}.`, answer, reason, data, { type: "counters", total, groupSize: total / denominator });
        add("fraction-story", "application", `There are ${total} counters. ${numerator}/${denominator} of them are blue. How many are blue? Show your method.`, answer, reason, data);
      }
    }
  }
  return [...new Map(pool.map((q) => [q.id, q])).values()];
}
