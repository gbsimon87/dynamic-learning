import { buildNumbersQuestions, buildEquivalentQuestions, buildArithmeticQuestions, buildComparingQuestions, buildFractionProblemQuestions } from "../challenges/year3Fractions.js";
import { paperQuestion, essential, seededPaper } from "./paperQuestions.js";
const fraction = (f) => `${f.numerator}/${f.denominator}`;
export const FRACTION_BUILDERS = {
  "fractions-as-numbers": buildNumbersQuestions,
  "equivalent-fractions": buildEquivalentQuestions,
  "adding-and-subtracting-fractions": buildArithmeticQuestions,
  "comparing-and-ordering-fractions": buildComparingQuestions,
  "fraction-problems": buildFractionProblemQuestions,
};
function adapt(topic, level, q) {
  let prompt, answer = q.answer, model = null;
  switch (q.type) {
    case "read-bar": prompt = "Write the fraction of this whole that is shaded."; answer = `${q.numerator}/${q.denominator}`; model = essential("bar", { parts: q.denominator, shaded: q.numerator }); break;
    case "track": prompt = `Mark and label ${q.numerator}/${q.denominator} on the number line.`; answer = `${q.numerator} intervals of 1/${q.denominator} from 0`; model = essential("number-line", { min: 0, max: q.wholes, step: 1 / q.denominator, fractional: q.denominator }); break;
    case "mixed-number-story": prompt = `A ribbon is one whole metre and ${q.numerator - q.denominator}/${q.denominator} of a metre long. Write its length as a single fraction of a metre.`; answer = `${q.numerator}/${q.denominator}`; break;
    case "match-bars": case "shade-equivalent": case "write-equivalent":
      prompt = `${level === 3 ? "Shade the empty bar to show an equivalent fraction. Then complete" : "Complete"}: ${fraction(q.target)} = ____/${q.answerDenominator}.`;
      model = essential("fraction-bars", { bars: [{ parts: q.target.denominator, shaded: q.target.numerator }, { parts: q.answerDenominator, shaded: 0 }] });
      answer = `${q.answer}/${q.answerDenominator}`; break;
    case "equation-choice": case "equation-build": case "equation-story": {
      const sign = q.operation === "subtract" ? "−" : "+";
      prompt = level === 4 ? `A jug contains ${q.first}/${q.denominator} litre. ${q.second}/${q.denominator} litre is added. How much is in the jug now?` : `Work out ${q.first}/${q.denominator} ${sign} ${q.second}/${q.denominator}.`;
      answer = `${q.answer}/${q.denominator}`; break;
    }
    case "compare-pair": case "compare-story": prompt = `${q.type === "compare-story" ? "Mia and Sam have equal-sized cakes. Mia has" : "Compare"} ${fraction(q.left)} ${q.type === "compare-story" ? "and Sam has" : "and"} ${fraction(q.right)}. Which fraction is larger? Explain why.`; answer = fraction(q.answer === "left" ? q.left : q.right); model = { type: "fraction-bars", bars: [{ parts: q.left.denominator, shaded: q.left.numerator }, { parts: q.right.denominator, shaded: q.right.numerator }] }; break;
    case "order-fractions": prompt = `Order these fractions, smallest first: ${q.items.map((item) => item.label).join(", ")}.`; answer = q.ordered; break;
    case "problem-set": prompt = `There are ${q.total} beads. ${q.numerator}/${q.denominator} are blue. How many beads are blue?`; break;
    case "problem-add": prompt = `Sam eats ${q.first}/${q.denominator} of a pizza and Ali eats ${q.second}/${q.denominator} of the same pizza. What fraction do they eat altogether?`; answer = `${q.answer}/${q.denominator}`; break;
    case "problem-equivalent": prompt = `A ribbon is ${fraction(q.target)} metre long. Write the same length as a fraction with denominator ${q.answerDenominator}: ____/${q.answerDenominator}.`; answer = `${q.answer}/${q.answerDenominator}`; break;
    case "problem-two-step": prompt = `There is ${q.start}/${q.denominator} of a ribbon. First ${q.usedFirst}/${q.denominator}, then ${q.usedSecond}/${q.denominator} of the original whole ribbon is used. What fraction remains?`; answer = `${q.answer}/${q.denominator}`; break;
    default: return null;
  }
  return paperQuestion("math", topic, level, prompt, answer, model, "Equivalent forms of the same fraction are acceptable unless the question specifies a denominator.", { data: q });
}
export function fractionPaperPool(topic) {
  if (!FRACTION_BUILDERS[topic]) return [];
  return [1, 2, 3, 4].flatMap((level) => FRACTION_BUILDERS[topic](level, seededPaper(level * 41)).map((q) => adapt(topic, level, q)).filter(Boolean));
}
