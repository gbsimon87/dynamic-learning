import { buildNumbersQuestions, buildSetQuestions, buildEquivalentQuestions, buildComparingQuestions, fractionText } from "./challenges/year3Fractions.js";
import { buildPlaceChangeQuestions, changeWords } from "./challenges/addingAndSubtractingPlaces.js";
import { makeFractionQuestion } from "./freePlay/fractionFun.js";
import { exampleSpeech } from "./lessons/lessonSpeech.js";

const BUILDERS = {
  "fractions-as-numbers": buildNumbersQuestions,
  "fractions-of-a-set-of-objects": buildSetQuestions,
  "equivalent-fractions": buildEquivalentQuestions,
  "comparing-and-ordering-fractions": buildComparingQuestions,
  "adding-and-subtracting-ones-tens-and-hundreds": buildPlaceChangeQuestions,
};
const f = (value) => fractionText(value.numerator, value.denominator);

// Sample from the real, pure bank, never mount a challenge or its completion shell.
// The view is read-only and has no store, profile, assessment or reward dependency.
export function getResourceExample(resource) {
  if (resource.kind === "skills") {
    const question = makeFractionQuestion(() => 0.5, 1, "name");
    return { question, prompt: question.prompt, answer: question.answer,
      model: { type: "shape", shape: question.shape, parts: question.parts, shaded: question.shaded }, options: question.options, mode: "Easy · Name it" };
  }
  if (resource.detailLevel !== "reviewed") {
    return resource.lesson ? { origin: "lesson", prompt: resource.lesson.title, teachingLines: resource.lesson.lines,
      explanation: resource.lesson.example ? exampleSpeech(resource.lesson.example) : null } : null;
  }
  const builder = BUILDERS[resource.topicId];
  if (!builder) return null;
  const q = builder(resource.challengeId, () => 0.5)[0];
  const base = { question: q };
  if (resource.topicId === "adding-and-subtracting-ones-tens-and-hundreds") {
    const prompt = resource.challengeId === 4 ? q.prompt : resource.challengeId === 3
      ? `Start at ${q.start}. ${q.changes.map((change) => `${change > 0 ? "Add" : "Take away"} ${Math.abs(change)}`).join(", then ")}. Build the answer.`
      : `What is ${changeWords(q.change)} than ${q.start}?`;
    return { ...base, prompt, answer: String(q.answer), options: resource.challengeId === 1 ? q.options : null,
      model: q.picture ? { type: "blocks", blocks: q.picture } : null };
  }
  if (q.type === "read-bar") return { ...base, prompt: "What fraction of the bar is shaded?", answer: fractionText(q.numerator, q.denominator), options: q.options, model: { type: "bars", bars: [{ parts: q.denominator, shaded: q.numerator }] } };
  if (q.type === "track") return { ...base, prompt: `Tap ${fractionText(q.numerator, q.denominator)} on the number line.`, answer: `${q.numerator} equal intervals from zero (${fractionText(q.numerator, q.denominator)}).`, model: { type: "line", denominator: q.denominator, wholes: q.wholes } };
  if (q.type === "mixed-number-story") return { ...base, prompt: `A ribbon is 1 whole metre and ${fractionText(q.numerator - q.denominator, q.denominator)} metre more. How many ${q.denominator}ths of a metre is that altogether?`, answer: String(q.numerator) };
  if (q.type === "select-set") return { ...base, prompt: `Tap ${fractionText(q.numerator, q.denominator)} of these ${q.total} objects.`, answer: `${q.answer} objects`, model: { type: "set", total: q.total, groupSize: q.groupSize } };
  if (q.type === "read-set") return { ...base, prompt: `${q.answer} of these ${q.total} objects are coloured. What fraction is that? Fill in the top number of ?/${q.denominator}.`, answer: `${q.numerator} (${fractionText(q.numerator, q.denominator)})`, model: { type: "set", total: q.total, shaded: q.answer, groupSize: q.total / q.denominator } };
  if (q.type === "set-story") return { ...base, prompt: `There are ${q.total} counters. ${fractionText(q.numerator, q.denominator)} of them are blue. How many are blue?`, answer: String(q.answer), model: { type: "set", total: q.total } };
  if (q.type === "match-bars") return { ...base, prompt: `Which bar shows the same amount as ${f(q.target)}?`, answer: fractionText(q.answer, q.answerDenominator), options: q.options.map(f), model: { type: "bars", bars: [q.target, ...q.options].map((value) => ({ parts: value.denominator, shaded: value.numerator, label: f(value) })) } };
  if (q.type === "shade-equivalent" || q.type === "write-equivalent") return { ...base, prompt: `${f(q.target)} is the same as how many ${q.answerDenominator}ths? ${q.type === "shade-equivalent" ? "Shade the second bar." : "Write the missing top number."}`, answer: `${q.answer} (${fractionText(q.answer, q.answerDenominator)})`, model: { type: "bars", bars: [{ parts: q.target.denominator, shaded: q.target.numerator, label: f(q.target) }, { parts: q.answerDenominator, shaded: 0, label: `?/${q.answerDenominator}` }] } };
  if (q.type === "compare-pair") return { ...base, prompt: "Which fraction is larger?", answer: f(q[q.answer]), options: [f(q.left), f(q.right)], model: { type: "bars", bars: [q.left, q.right].map((value) => ({ parts: value.denominator, shaded: value.numerator, label: f(value) })) } };
  if (q.type === "order-fractions") return { ...base, prompt: "Move the fractions from smallest to largest.", answer: q.ordered.join(" → "), options: q.items.map((item) => item.label) };
  if (q.type === "compare-story") return { ...base, prompt: `Mia has ${f(q.left)} of a cake. Sam has ${f(q.right)}. Who has more cake?`, answer: q.answer === "left" ? "Mia" : "Sam", options: ["Mia", "Sam"] };
  return null;
}
