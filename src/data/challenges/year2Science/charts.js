import { pick } from "../year1Math/shared.js";
import { chartAnswer } from "../questionKinds.js";

/**
 * Bix's bar charts for Year 2 Science. Each set is Bix's own made-up
 * results, [[label, value], ...], never a claim about every plant or log.
 * The answer is worked out by `chartAnswer`, so a tie can never reach a
 * child (the bank tests fail on a null answer). Keep a chart's axis to ten
 * gridlines or fewer — pass `step` for bigger values — or BarChart's labels
 * overflow the plot (year2Science.test.js checks this).
 */
const toChart = (rng, sets, unit, step) => {
  const rows = pick(rng, sets).map(([label, value]) => ({ label, value }));
  return { type: "bar", rows, unit, ...(step ? { step } : {}) };
};

/** "Which had the most / fewest?" — answered by tapping a bar's label. */
export const extremeChart = ({ sets, unit, step, prompt, op }) => (rng) => {
  const chart = toChart(rng, sets, unit, step);
  const ask = { op };
  return {
    type: "chart", prompt: prompt(op === "most" ? "most" : "fewest"), chart, ask,
    answer: chartAnswer(chart, ask), options: chart.rows.map((r) => r.label),
    hint: op === "most" ? "Find the tallest bar." : "Find the shortest bar.",
  };
};

/** "How many ...?" — read one bar's value and type it on the keypad. */
export const valueChart = ({ sets, unit, prompt, label }) => (rng) => {
  const chart = toChart(rng, sets, unit);
  const asked = label ?? pick(rng, chart.rows).label;
  const ask = { op: "value", label: asked };
  return {
    type: "chart", prompt: prompt(asked), chart, ask, answer: chartAnswer(chart, ask),
    hint: `Find the bar for "${asked}" and read across.`,
  };
};
