import { LEARNING_NEEDS } from "./teacherResourceCatalogue.js";

export const NEED_STATUSES = [
  { id: "teach", label: "Needs teaching", short: "Teach" }, { id: "consolidate", label: "Needs practice", short: "Practise" },
  { id: "retrieve", label: "Confident — brief retrieval", short: "Secure" }, { id: "check", label: "Not checked yet", short: "Not sure" },
];
const LABELS = { teach: "Teaching priority", consolidate: "Consolidate", retrieve: "Retrieval practice", check: "Check first" };

// Import question-response counts, never pupil names or inferred pupil groups.
// CSV (including quoted commas/newlines) and spreadsheet TSV are both supported.
export function parseTopicResults(text) {
  if (!text.trim()) return { rows: [], errors: ["Paste a header and at least one topic row."] };
  if (text.length > 20000) return { rows: [], errors: ["Paste at most 20,000 characters at a time."] };
  const delimiter = text.split(/\r?\n/, 1)[0].includes("\t") ? "\t" : ",";
  const records = []; let row = []; let cell = ""; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i += 1; }
      else quoted = !quoted;
    } else if (!quoted && (char === delimiter || char === "\n")) {
      row.push(cell.trim()); cell = "";
      if (char === "\n") { records.push(row); row = []; }
    } else if (char !== "\r" || quoted) cell += char;
  }
  if (quoted) return { rows: [], errors: ["A quoted cell is missing its closing quote."] };
  row.push(cell.trim()); records.push(row);
  const nonempty = records.filter((record) => record.some((value) => value));
  if (nonempty.length < 2 || nonempty.length > 51) return { rows: [], errors: ["Include a header and between 1 and 50 topic rows."] };
  const headers = nonempty[0].map((value) => value.toLowerCase().replace(/^\uFEFF/, "").trim());
  if (new Set(headers).size !== headers.length || headers.some((header) => !["topic", "correct", "answered", "expected", "skipped"].includes(header)) || ["topic", "correct", "answered"].some((header) => !headers.includes(header))) {
    return { rows: [], errors: ["Use columns Topic, Correct, Answered; optionally Expected and Skipped. Counts are question responses, not percentages or pupil scores."] };
  }
  const errors = [];
  const rows = nonempty.slice(1).map((record, index) => {
    const line = index + 2;
    if (record.length !== headers.length) { errors.push(`Row ${line}: the number of cells must match the header.`); return null; }
    const data = Object.fromEntries(headers.map((header, i) => [header, record[i]]));
    if (!data.topic || data.topic.length > 160) errors.push(`Row ${line}: enter a topic of 1–160 characters.`);
    const counts = {};
    for (const key of ["correct", "answered", "expected", "skipped"]) {
      const value = data[key];
      if ((value === undefined || value === "") && ["expected", "skipped"].includes(key)) { counts[key] = null; continue; }
      if (!/^\d+$/.test(value ?? "") || Number(value) > 100000) errors.push(`Row ${line}: ${key} must be a whole count between 0 and 100,000.`);
      counts[key] = Number(value);
    }
    if (counts.correct > counts.answered) errors.push(`Row ${line}: correct cannot exceed answered.`);
    if (counts.expected !== null && counts.expected < counts.answered + (counts.skipped ?? 0)) errors.push(`Row ${line}: expected cannot be smaller than answered plus skipped.`);
    return { id: `row-${line}`, topic: data.topic, ...counts };
  }).filter(Boolean);
  return { rows: errors.length ? [] : rows, errors };
}

export function compileClassEvidence(entries, source = "teacher", { needs: catalogueNeeds = LEARNING_NEEDS, resources = [] } = {}) {
  if (!["teacher", "class-results"].includes(source) || !entries.length || entries.length > catalogueNeeds.length) throw new RangeError("Add at least one different learning need from the selected curriculum.");
  if (new Set(entries.map((entry) => entry.needId)).size !== entries.length) throw new RangeError("Each learning focus can appear once. Combine repeated results before importing.");
  const needs = entries.map((entry) => {
    const need = catalogueNeeds.find((candidate) => candidate.id === entry.needId);
    if (!need) throw new RangeError("Confirm a learning focus from the selected curriculum for every row.");
    if (entry.resourceIds && (!Array.isArray(entry.resourceIds) || !entry.resourceIds.length || new Set(entry.resourceIds).size !== entry.resourceIds.length || entry.resourceIds.some((id) => !resources.some((resource) => resource.id === id && resource.available && resource.needIds.includes(need.id))))) throw new RangeError("Choose available challenges belonging to this learning focus.");
    let priority = entry.priority;
    let reason;
    let accuracy = null; let coverage = null; let missing = null;
    if (source === "teacher") {
      const status = NEED_STATUSES.find((candidate) => candidate.id === priority);
      if (!status) throw new RangeError("Choose how the class is doing for every learning need.");
      reason = `Teacher judgement: ${need.title} — ${status.label.toLowerCase()}. No assessment scores supplied.`;
    } else {
      const { correct, answered, expected = null, skipped = null } = entry;
      if (![correct, answered].every((n) => Number.isInteger(n) && n >= 0 && n <= 100000) || correct > answered || [expected, skipped].some((n) => n !== null && (!Number.isInteger(n) || n < 0 || n > 100000)) || (expected !== null && expected < answered + (skipped ?? 0))) throw new RangeError("Review the question-response counts before using these results.");
      accuracy = answered ? correct / answered : null;
      coverage = expected ? answered / expected : expected === 0 ? 0 : null;
      missing = expected !== null && skipped !== null ? expected - answered - skipped : null;
      priority = answered < 2 || (coverage !== null && coverage < 0.75) ? "check" : accuracy < 0.6 ? "teach" : accuracy < 0.8 ? "consolidate" : "retrieve";
      reason = `${need.title}: ${correct}/${answered} answered question responses correct. ${coverage === null ? "Coverage not supplied; check that these results represent the class." : `${answered}/${expected} expected responses answered.`} ${LABELS[priority]}. Class totals do not identify individual pupil needs.`;
    }
    return { needId: need.id, objectiveId: need.objectiveId, title: need.title, resourceIds: entry.resourceIds ? [...entry.resourceIds] : null, priority, reason, accuracy, coverage, missing,
      correct: source === "teacher" ? null : entry.correct, answered: source === "teacher" ? null : entry.answered,
      expected: source === "teacher" ? null : entry.expected ?? null, skipped: source === "teacher" ? null : entry.skipped ?? null };
  });
  return [...new Set(needs.map((need) => need.objectiveId))].map((objectiveId) => {
    const group = needs.filter((need) => need.objectiveId === objectiveId);
    // Keep a weak representation visible even when another has stronger results.
    const priority = ["teach", "consolidate", "check", "retrieve"].find((value) => group.some((need) => need.priority === value));
    const sum = (key) => group.every((need) => need[key] !== null) ? group.reduce((total, need) => total + need[key], 0) : null;
    const correct = sum("correct"), answered = sum("answered"), expected = sum("expected");
    return { objectiveId, source, needs: group, needIds: group.map((need) => need.needId), priority, label: LABELS[priority], reason: group.map((need) => need.reason).join(" "),
      correct, answered, incorrect: answered === null ? null : answered - correct,
      accuracy: answered ? correct / answered : null, coverage: expected ? answered / expected : expected === 0 ? 0 : null,
      skipped: sum("skipped"), missing: sum("missing"), distribution: [] };
  });
}

// These are teaching prompts, not new question banks. They narrow the existing
// objective's plan when a teacher has confirmed a particular representation.
export function teachingForNeed(needId, objective) {
  const custom = {
    "shape-fractions": {
      teach: "Agree what counts as one whole. Divide equal-sized shapes into equal parts and connect shaded parts to numerator and denominator.",
      practical: "Fold equal-sized paper shapes into halves and quarters. Shade a named fraction, then explain how many equal parts make the whole.",
      checkpoint: "Show a new equally divided shape. Ask pupils to name the shaded fraction and explain both numbers.",
      support: "Start with halves of the same-sized whole; count all parts and shaded parts separately.",
      stretch: "Draw two different shapes showing the same fraction and explain why the parts must be equal.",
    },
    "number-line-fractions": {
      teach: "Mark zero and one, agree the whole interval and divide it into equal jumps. Count intervals rather than tick marks to locate a fraction.",
      practical: "Build a floor number line from zero to one. Place thirds, quarters and fifths by counting equal intervals from zero.",
      checkpoint: "Use a new number line with equal intervals. Ask pupils to locate a fraction and explain how they counted.",
      support: "Mark zero and one clearly and model counting the equal intervals together.",
      stretch: "Extend the line to two and explain the position of a fraction greater than one.",
    },
    "beyond-one": {
      teach: "Count equal fractional intervals through one whole and beyond. Connect one whole plus extra parts to a single fraction.",
      practical: "Use thirds or quarters on a zero-to-two number line and equal-length strips to show one whole plus more parts.",
      checkpoint: "Ask pupils to represent a new fraction greater than one and explain how many parts make one whole.",
      support: "Label one whole and keep the size of each fractional part unchanged beyond it.",
      stretch: "Describe the same length as one whole plus a fraction and as a total number of fractional parts.",
    },
    "compare-unit": {
      teach: "Use equal-sized wholes to compare unit fractions. Show why more equal parts make each individual part smaller.",
      practical: "Compare one half, one third and one quarter using equal-length strips. Ask pupils to justify which is larger.",
      checkpoint: "Compare a fresh pair of unit fractions and ask for a same-whole diagram to justify the choice.",
    },
    "compare-same": {
      teach: "Compare fractions of equal-sized wholes with the same denominator. Connect a larger numerator to more same-sized pieces.",
      practical: "Build two fifths and four fifths with matching strips. Compare other pairs sharing a denominator.",
      checkpoint: "Ask pupils to compare a new same-denominator pair and explain using equal-sized pieces.",
      stretch: "Explain a comparison with matching denominators without drawing, then check it with a diagram.",
    },
    "order-fractions": {
      teach: "Keep the denominator fixed and compare the numerators. Explain how pairwise comparisons help order three fractions.",
      practical: "Arrange two sixths, three sixths and five sixths from smallest to largest and justify the sequence using matching strips.",
      checkpoint: "Order a fresh set of three fractions sharing a denominator and explain each position.",
      stretch: "Insert another fraction with the same denominator into an ordered set and justify its position.",
    },
  };
  return { ...objective, ...custom[needId] };
}
