import { buildCompareQuestions } from "../challenges/comparingNumbers1000.js";
import { buildRepresentQuestions } from "../challenges/representingNumbers.js";
import { buildWordQuestions, numberInWords } from "../challenges/readingAndWritingNumbers1000.js";
import { buildProblemQuestions } from "../challenges/numberAndPlaceValueProblems.js";
import { buildEstimatingQuestions } from "../challenges/estimatingAndChecking.js";
import { buildMissingNumberQuestions } from "../challenges/missingNumber3Digit.js";
import { buildAdditionSubtractionProblems } from "../challenges/additionSubtractionProblems3Digit.js";
import { buildTablesQuestions, buildEightQuestions, buildTwoDigitQuestions, buildScalingQuestions, buildMulDivProblemQuestions } from "../challenges/year3MulDiv.js";
import { paperQuestion, essential, seededPaper, cleanPaperPrompt } from "./paperQuestions.js";

export const NUMBER_BUILDERS = {
  "comparing-and-ordering-numbers-to-1000": buildCompareQuestions,
  "representing-and-estimating-numbers": buildRepresentQuestions,
  "reading-and-writing-numbers-to-1000": buildWordQuestions,
  "number-and-place-value-problems": buildProblemQuestions,
  "estimating-and-checking-answers": buildEstimatingQuestions,
  "missing-number-problems": buildMissingNumberQuestions,
  "addition-and-subtraction-problems": buildAdditionSubtractionProblems,
  "3-and-4-times-tables": buildTablesQuestions,
  "the-8-times-table": buildEightQuestions,
  "multiplying-and-dividing-two-digit-numbers": buildTwoDigitQuestions,
  "scaling-and-correspondence-problems": buildScalingQuestions,
  "multiplication-and-division-problems": buildMulDivProblemQuestions,
};
function adapt(topic, level, q) {
  let prompt = q.prompt, answer = q.answer, model = null, reason = q.working ?? q.expression ?? "";
  if (topic === "comparing-and-ordering-numbers-to-1000") {
    if (level <= 2) prompt = `Write <, > or =: ${q.left} ____ ${q.right}. Explain which place decides.`;
    if (level === 3) prompt = `Order these numbers, ${q.direction === "smallest" ? "smallest" : "largest"} first: ${q.items.map((i) => i.label).join(", ")}.`;
  } else if (topic === "representing-and-estimating-numbers") {
    if (level === 1) { prompt = "What number do these base-ten blocks represent?"; model = essential("blocks", q.picture); }
    if (level === 2) { prompt = "Estimate the number marked A on the number line. Write the nearest multiple of 100."; model = essential("number-line", { min: 0, max: 1000, step: 100, value: q.value, marker: "A" }); answer = Math.round(q.value / 100) * 100; }
    if (level === 3) { prompt = `Draw base-ten blocks to represent ${q.target}. Label the value of each kind of block.`; answer = `${Math.floor(q.target / 100)} hundreds, ${Math.floor(q.target / 10) % 10} tens, ${q.target % 10} ones`; model = essential("drawing-grid", {}); }
  } else if (topic === "reading-and-writing-numbers-to-1000") {
    if (level === 1) prompt = `Write ${q.value} in words.`;
    if (level === 2) prompt = `Write “${q.words}” in numerals.`;
    if (level === 3) { prompt = `Order these number words, smallest first: ${q.items.map((i) => i.label).join("; ")}.`; answer = q.answer.map(numberInWords); }
  } else if (topic === "number-and-place-value-problems") {
    if (level <= 2) prompt = `${q.lines.join(" ")} What number am I?`;
    if (level === 3) prompt = `Use each of these digit cards once to make the ${q.want === "largest" ? "largest" : "smallest"} three-digit number: ${q.items.map((i) => i.label).join(", ")}.`;
  } else if (topic === "estimating-and-checking-answers") {
    const sign = q.operation === "add" ? "+" : "−";
    if (level <= 2) { prompt = `Round each number to the nearest ${q.place}, then estimate ${q.a} ${sign} ${q.b}.`; reason = `${q.roundedA} ${sign} ${q.roundedB} = ${q.answer}.`; }
    else { prompt = `A pupil says ${q.a} ${sign} ${q.b} = ${q.reported}. ${level === 4 ? "Estimate by rounding each number to the nearest 100. Then " : ""}Use the inverse to check the claim. Correct it if needed.`; const exact = q.operation === "add" ? q.a + q.b : q.a - q.b; answer = `${q.isCorrect ? "Correct" : `Incorrect; the answer is ${exact}`}. ${level === 4 ? `Estimate: ${q.estimate}. ` : ""}Inverse check: ${q.reported} ${q.operation === "add" ? "−" : "+"} ${q.b} = ${q.inverse}.`; }
  } else if (topic === "missing-number-problems") {
    if (level === 1) prompt = `Find the missing number: ${q.known} + ____ = ${q.whole}.`;
    if (level === 2) prompt = `Find the missing number: ${q.whole} − ____ = ${q.remainder}.`;
    if (level === 3) prompt = `Find the number that fits both gaps: ____ + ${q.known} = ${q.whole}; ${q.whole} − ${q.known} = ____.`;
  } else if (topic === "addition-and-subtraction-problems") {
    prompt = `${q.prompt} Show your calculations.`;
  } else {
    switch (q.type) {
      case "array-product": prompt = "How many counters are in this array? Write a multiplication statement."; model = essential("array", { rows: q.rows, columns: q.columns }); answer = `${q.rows} × ${q.columns} = ${q.answer}`; break;
      case "eight-recall": case "fact-recall": prompt = `Work out ${q.a} × ${q.b}.`; break;
      case "fact-triangle": prompt = `Find the missing number: ${q.statement}`; break;
      case "double-chain": prompt = `Work out 8 × ${q.other} by doubling: 2 × ${q.other} = ____; 4 × ${q.other} = ____; 8 × ${q.other} = ____.`; answer = `${q.twice}, ${q.fourTimes}, ${q.answer}`; break;
      case "partition": prompt = `Work out ${q.heading}. Show how partitioning helps.`; reason = q.cells.map((c) => `${c.label} = ${c.value}`).join("; "); break;
      case "short-multiplication": prompt = `Use a written method to work out ${q.a} × ${q.b}.`; break;
      case "scale-read": prompt = `${q.subject.short} is ${q.base} ${q.subject.unit}. ${q.subject.tall} is ${q.factor} times ${q.subject.verb}. How long or high is ${q.subject.tall.toLowerCase()}?`; answer = `${q.answer} ${q.subject.unit}`; break;
      case "scale-factor": prompt = `${q.subject.short} is ${q.base} ${q.subject.unit}; ${q.subject.tall} is ${q.big} ${q.subject.unit}. How many times ${q.subject.verb} is ${q.subject.tall.toLowerCase()}?`; break;
      case "correspondence": prompt = `There are ${q.tops.length} different ${q.topName} choices and ${q.bottoms.length} different ${q.bottomName} choices. Choose one of each. How many different ${q.noun} are possible? List the pairs.`; break;
      case "missing-number": prompt = `Find the missing number: ${q.parts.join(" ")}.`; break;
      case "derive-fact": prompt = `Use ${q.known} to work out ${q.derived}. Explain what changed.`; break;
      case "share-groups": case "grouped-division": prompt = `${q.total} counters are shared equally into ${q.groups} groups. How many counters are in each group?`; break;
      default: break;
    }
  }
  return paperQuestion("math", topic, level, prompt && cleanPaperPrompt(prompt), answer, model, reason, { data: q });
}
export function numberPaperPool(topic) {
  const builder = NUMBER_BUILDERS[topic];
  if (!builder) return [];
  const bank = [];
  for (let seed = 1; seed <= 18; seed++) for (let level = 1; level <= 4; level++) {
    for (const q of builder(level, seededPaper(seed * 97 + level))) {
      const adapted = adapt(topic, level, q);
      if (adapted) bank.push(adapted);
    }
  }
  return bank;
}
