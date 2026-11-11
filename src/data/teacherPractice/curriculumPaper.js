import { CURRICULUM_PAPER_BUILDERS } from "./curriculumBuilders.js";
import { paperQuestion, essential, seededPaper, cleanPaperPrompt } from "./paperQuestions.js";
import { year2MathPaperPool } from "./year2Math.js";

const plain = (value) => String(value ?? "").replace(/\*\*/g, "");
const label = (item) => plain(item?.label ?? item?.value ?? item);
const textLines = (passage) => (passage?.blocks ?? passage?.paragraphs ?? []).flatMap((block) => typeof block === "string" ? [block] : block.text ? [`${block.label ? `${block.label}: ` : ""}${block.text}`] : block.lines ?? []);
const sorted = (items) => [...items].sort((a, b) => label(a).localeCompare(label(b), "en", { numeric: true }));

/** Translate the shared interactive question contract into an answerable written task.
 * Only pupil-facing evidence enters the model. Answers, hints and speech scripts stay out.
 */
export function adaptCurriculumQuestion(topic, level, q) {
  let prompt = q.prompt ?? "", answer = q.answer, model = null, teacherScript = null;
  const lines = [q.rule, q.text, q.context, q.sentence, ...[q.equation ?? []].flat(), ...textLines(q.passage)].filter(Boolean).map(plain);
  const reason = [];
  if (topic.topicId.includes("dictation")) {
    teacherScript = q.text;
    if (!teacherScript) return null;
    prompt = "Listen as your teacher reads a sentence. Write it with correct spelling and punctuation.";
    answer = teacherScript;
    lines.length = 0;
    reason.push(`Teacher script: read “${teacherScript}” aloud, then repeat it in short phrases.`);
  } else {
    if (q.interaction === "reflection") {
      prompt = "Complete the reflection by shading squares across the dashed mirror line.";
      answer = q.cards.filter((card) => card.bin === q.bins[0].id).map((card) => {
        const [x, y] = card.label.split(",").map(Number);
        return `row ${y + 1}, column ${x + 1}`;
      }).join("; ");
      reason.push("Shade these squares, counting rows from the top and columns from the left. Keep the supplied half unchanged.");
    } else if (q.kind === "sort") {
      const cards = sorted(q.cards);
      lines.push(`Headings: ${q.bins.map(label).join("; ")}`, ...cards.map((card, n) => `${n + 1}. ${label(card)}`));
      answer = cards.map((card) => `${label(card)}: ${label(q.bins.find((bin) => bin.id === card.bin))}`).join("; ");
      prompt = `${prompt || "Sort the cards."} Write the heading beside each numbered card.`;
    } else if (q.kind === "order") {
      lines.push(...sorted(q.items).map((item, n) => `${n + 1}. ${label(item)}`));
      answer = q.answer.map((id) => label(q.items.find((item) => item.id === id))).join(" → ");
      prompt = `${prompt || "Put the items in order."} Number the items in the requested order.`;
    } else if (q.kind === "pick") {
      const tokens = q.tokens.map(plain);
      lines.push(...(q.variant === "sentences" ? tokens.map((token, n) => `${n + 1}. ${token}`) : [tokens.join(q.innerGaps ? "" : " ")]));
      answer = q.tokens[q.answer];
    } else if (q.kind === "sequence") {
      lines.push(q.terms.map((term, n) => `${q.captions?.[n] ? `${q.captions[n]}: ` : ""}${q.gaps.includes(n) ? "____" : term}`).join(" → "));
      answer = q.gaps.map((gap) => `${q.captions?.[gap] ?? `Gap ${q.gaps.indexOf(gap) + 1}`}: ${q.terms[gap]}`).join("; ");
    } else if (q.kind === "build") {
      if (q.tiles) lines.push(`Tiles: ${sorted(q.tiles).map(label).join(" · ")}`);
      prompt ||= q.sentence ? "Complete the sentence using the tiles." : "Arrange the tiles to make the requested word or sentence.";
      if (q.alternatives?.length) reason.push(`Also accept: ${q.alternatives.join(" / ")}`);
      else if (topic.subject !== "math") reason.push("Accept equivalent wording that meets the task and preserves its meaning.");
    } else if (q.kind === "clock") {
      model = essential("clock", q.mode === "set" ? { blank: true } : { ...q.time });
      if (q.mode === "set") {
        prompt = `${prompt} Draw the hands on the clock.`;
        answer = `${q.time.hour}:${String(q.time.minute).padStart(2, "0")}; hour hand part-way towards the next hour when minutes are past the hour.`;
      }
    } else if (q.kind === "fraction") {
      const shaded = Array.isArray(q.shaded) ? q.shaded.length : q.shaded ?? 0;
      model = essential("bar", { parts: q.parts, shaded: q.mode === "shade" ? 0 : shaded });
      if (q.mode === "shade") answer = `Shade ${q.answer} of the ${q.parts} equal parts.`;
    } else if (q.kind === "placeValue") {
      if (q.mode === "build") {
        prompt = `${prompt} Draw tens rods and ones cubes${q.columns?.includes("hundreds") ? ", and hundreds squares" : ""}.`;
        answer = `${Math.floor(q.answer / 100) ? `${Math.floor(q.answer / 100)} hundreds, ` : ""}${Math.floor(q.answer / 10) % 10} tens and ${q.answer % 10} ones.`;
      } else model = essential("blocks", { hundreds: q.blocks.hundreds ?? 0, tens: q.blocks.tens ?? 0, ones: q.blocks.ones ?? 0 });
    }
    if (q.options && q.kind !== "clock") lines.push(`Choices: ${sorted(q.options).map(label).join(" / ")}`);
    if (!prompt && q.sentence) prompt = "Complete the sentence correctly.";
    if (!prompt && q.before !== undefined) { prompt = "Complete the gap."; lines.push(`${q.before}____${q.after ?? ""}`); }

  }
  if (!prompt || answer === undefined || answer === null) return null;
  const visual = teacherScript ? null : q.visual;
  const picture = !teacherScript && !visual && q.picture ? { symbol: q.picture, label: q.pictureLabel ?? "Picture clue" } : null;
  if (!model && (lines.length || visual || picture || q.table || q.chart)) model = essential("curriculum-source", {
    year: topic.year, subject: topic.subject, title: q.passage?.title ?? "Read and answer", lines: [...new Set(lines)],
    ...(visual ? { visual } : {}), ...(picture ? { picture } : {}), ...(q.table ? { table: q.table } : {}), ...(q.chart ? { chart: q.chart } : {}), ...(q.unit ? { unit: q.unit } : {}),
  });
  if (q.interaction === "setAngle") prompt = prompt.replace("Use the buttons to move the arm.", "Use a ruler and protractor.");
  if (q.interaction === "plot") prompt += " Mark the point on the grid.";
  prompt = plain(cleanPaperPrompt(prompt)).replace(/\bClick\b/gi, "Mark").replace(/\bSet the analogue clock\b/gi, "Draw the analogue clock").replace(/\s*\(set \d+\)/g, "");
  if (topic.subject === "math" && q.unit && typeof answer === "number") answer = `${answer} ${q.unit}`;
  return paperQuestion(topic.subject, topic.id, level, prompt, answer, model, reason.join(" "), { teacherScript, largeWorking: ["sort", "order", "build"].includes(q.kind), data: { sourceKind: q.kind } });
}

export function curriculumPaperPool(topic) {
  if (topic.year === 2 && topic.subject === "math") return year2MathPaperPool(topic);
  const build = CURRICULUM_PAPER_BUILDERS[`${topic.year}:${topic.subject}:${topic.topicId}`];
  if (!build) throw new RangeError(`No paper adapter for ${topic.id}`);
  const pool = [];
  for (let seed = 1; seed <= 8; seed++) for (let level = 1; level <= 4; level++) {
    for (const q of build(level, seededPaper(seed * 173 + level))) {
      const item = adaptCurriculumQuestion(topic, level, q);
      if (item) pool.push(item);
    }
  }
  return pool;
}
