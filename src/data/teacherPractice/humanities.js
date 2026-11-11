import { YEAR1_HISTORY_TOPICS } from "../challenges/history/year1/index.js";
import { YEAR2_HISTORY_TOPICS } from "../challenges/history/year2/index.js";
import { YEAR4_HISTORY_TOPICS } from "../challenges/history/year4/index.js";
import { YEAR5_HISTORY_TOPICS } from "../challenges/history/year5/index.js";
import { YEAR6_HISTORY_TOPICS } from "../challenges/history/year6/index.js";
import { YEAR3_GEOGRAPHY_TOPICS } from "../challenges/geography/year3/index.js";
import { YEAR3_HISTORY_TOPICS } from "../challenges/history/year3/index.js";
import { paperQuestion, essential, cleanPaperPrompt } from "./paperQuestions.js";

function adapted(subject, topicId, level, template, context) {
  let prompt = cleanPaperPrompt(template.prompt), answer = template.answer, lines = [];
  const kind = template.kind ?? template.type;
  if (kind === "sort") {
    const bins = template.bins.map((bin, index) => typeof bin === "string" ? { id: String(index), label: bin } : bin);
    const cards = template.cards.map(([label, bin]) => ({ label, bin: String(bin) }));
    lines = [`Headings: ${bins.map((bin) => bin.label).join("; ")}`, ...cards.map((card, n) => `${n + 1}. ${card.label}`)];
    answer = cards.map((card) => `${card.label}: ${bins.find((bin) => bin.id === card.bin)?.label}`).join("; ");
    prompt = `${prompt} Write the heading beside each numbered card.`;
  } else if (kind === "order") {
    // The authored labels are in answer order; rotate the pupil list once.
    const labels = template.labels;
    lines = [...labels.slice(1), labels[0]].map((label, n) => `${n + 1}. ${label}`);
    answer = labels.join(" → ");
    prompt = `${prompt} Number the statements in the correct order.`;
  }
  const source = subject === "geography" ? { visual: template.visual ?? context.visual, sources: template.sources ?? [], chart: template.chart } : { story: context.story, visual: template.visual };
  const model = essential(subject === "geography" ? "geography-source" : "history-source", { ...source, taskLines: lines });
  return paperQuestion(subject, topicId, level, prompt, answer, model, "Answer using the supplied source and its stated limits.", { data: { sourceType: kind }, largeWorking: kind === "sort" || kind === "order" });
}
const COURSES = {
  "1:history": YEAR1_HISTORY_TOPICS,
  "2:history": YEAR2_HISTORY_TOPICS,
  "3:geography": YEAR3_GEOGRAPHY_TOPICS,
  "3:history": YEAR3_HISTORY_TOPICS,
  "4:history": YEAR4_HISTORY_TOPICS,
  "5:history": YEAR5_HISTORY_TOPICS,
  "6:history": YEAR6_HISTORY_TOPICS,
};
export function humanitiesPaperPool(subject, topicId, year = 3) {
  const topic = COURSES[`${year}:${subject}`]?.[topicId];
  if (!topic) return [];
  const bank = [];
  for (let level = 1; level <= 4; level++) {
    if (subject === "geography") {
      const lesson = topic.lessons[level - 1];
      for (const template of lesson.bank) { const q = adapted(subject, topicId, level, template, { visual: lesson.notes.visual }); if (q) bank.push(q); }
    } else {
      const plan = topic.levels[level];
      for (const bankName of new Set(plan.rounds)) for (const template of topic.banks[bankName]) { const q = adapted(subject, topicId, level, template, { story: plan.story }); if (q) bank.push(q); }
    }
  }
  return bank;
}
