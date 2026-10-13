import { findUsSpellings, wordCount } from "../english/textChecks.js";

/** Per-year reading limits, matching Geography's (docs/geography-curriculum/shared-design-spec.md §3). */
export const LESSON_AGES = { 1: { lineWords: 10 }, 2: { lineWords: 12 }, 3: { lineWords: 16 }, 4: { lineWords: 18 } };

const TYPES = new Set(["equation", "column", "steps", "jumps", "bar", "groups", "table"]);
const text = (value) => typeof value === "string" && value.trim().length > 0;
const number = (token) => {
  const m = /^(\d+(?:\.\d+)?)(?:\/(\d+))?$/.exec(token);
  return m ? Number(m[1]) / (m[2] ? Number(m[2]) : 1) : null;
};

/** Plain arithmetic only: numbers ("3/10" counts as a fraction) joined by + − × ÷; anything else is not checked. */
function evaluate(tokens) {
  const parts = tokens.flatMap((t) => String(t).trim().split(/\s+/)).filter(Boolean);
  if (parts.length % 2 === 0) return null;
  // × and ÷ first, then + and − from left to right.
  const terms = [number(parts[0])]; const signs = [];
  for (let i = 1; i < parts.length; i += 2) {
    const [op, value] = [parts[i], number(parts[i + 1])];
    if (value === null) return null;
    if (op === "×") terms.push(terms.pop() * value);
    else if (op === "÷") terms.push(terms.pop() / value);
    else if (op === "+" || op === "−" || op === "-") { signs.push(op === "+" ? 1 : -1); terms.push(value); }
    else return null;
  }
  if (terms[0] === null) return null;
  return terms.reduce((sum, term, i) => (i === 0 ? term : sum + signs[i - 1] * term));
}

/** True / false for an all-numeric equation or comparison; null when it holds words or units. */
export function checkEquation(parts) {
  const sides = [[]]; const rel = [];
  for (const part of parts) {
    if (["=", "<", ">"].includes(part)) { rel.push(part); sides.push([]); } else sides.at(-1).push(String(part));
  }
  const values = sides.map(evaluate);
  if (rel.length === 0 || values.some((v) => v === null || !Number.isFinite(v))) return null;
  return rel.every((r, i) => {
    const [a, b] = [values[i], values[i + 1]];
    return r === "=" ? Math.abs(a - b) < 1e-9 : r === "<" ? a < b : a > b;
  });
}

/** @returns {string[]} problems with one subject-year's lessons, keyed by topic id. */
export function lintLessons(lessons, { year, topicIds }) {
  const { lineWords } = LESSON_AGES[year];
  const errors = [];
  const need = (ok, message) => { if (!ok) errors.push(message); };
  const words = (value, at) => {
    need(text(value), `${at}: missing text`);
    if (!text(value)) return;
    need(wordCount(value) <= lineWords, `${at}: over ${lineWords} words`);
    need(findUsSpellings(value).length === 0, `${at}: US spelling ${findUsSpellings(value)}`);
  };
  for (const id of topicIds) need(Array.isArray(lessons[id]) && lessons[id].length === 4, `${id}: needs 4 lessons`);
  for (const id of Object.keys(lessons)) need(topicIds.includes(id), `${id}: not a topic in this year`);
  for (const [id, list] of Object.entries(lessons)) {
    (list ?? []).forEach((lesson, i) => {
      const at = `${id} ${i + 1}`;
      words(lesson?.title, `${at} title`);
      need(text(lesson?.title) && wordCount(lesson.title) <= 6, `${at}: title over 6 words`);
      need(Array.isArray(lesson?.lines) && lesson.lines.length === 3, `${at}: needs 3 lines`);
      (lesson?.lines ?? []).forEach((line, n) => words(line, `${at} line ${n + 1}`));
      const ex = lesson?.example;
      if (!ex) return;
      need(TYPES.has(ex.type), `${at}: unknown example type ${ex.type}`);
      words(ex.title, `${at} example title`);
      if (ex.note !== undefined) words(ex.note, `${at} example note`);
      if (ex.type === "equation") need(Array.isArray(ex.parts) && checkEquation(ex.parts) !== false, `${at}: equation is wrong`);
      if (ex.type === "column") {
        const value = evaluate([String(ex.top), ex.op, String(ex.bottom)]);
        need(["+", "−"].includes(ex.op) && value === Number(ex.answer), `${at}: column sum is wrong`);
      }
      if (ex.type === "jumps") {
        need(Array.isArray(ex.terms) && ex.terms.length >= 3, `${at}: jumps need 3+ terms`);
        const nums = (ex.terms ?? []).map((t) => number(String(t)));
        if (nums.every((n) => n !== null) && text(ex.step)) {
          const step = evaluate(["0", ex.step.slice(0, 1), ex.step.slice(1)]);
          need(nums.slice(1).every((n, k) => Math.abs(n - nums[k] - step) < 1e-9), `${at}: jumps do not match ${ex.step}`);
        }
      }
      if (ex.type === "bar") need(Array.isArray(ex.bars) && ex.bars.every((b) => Number.isInteger(b.parts) && b.parts > 0 && b.parts <= 12 && Number.isInteger(b.shaded) && b.shaded >= 0 && b.shaded <= b.parts), `${at}: bad bar`);
      if (ex.type === "steps") { need(Array.isArray(ex.steps) && ex.steps.length >= 2 && ex.steps.length <= 5, `${at}: 2–5 steps`); (ex.steps ?? []).forEach((s, n) => words(s, `${at} step ${n + 1}`)); }
      if (ex.type === "groups") need(Array.isArray(ex.groups) && ex.groups.every(Array.isArray) && text(ex.label), `${at}: groups need arrays and a label`);
      if (ex.type === "table") need(Array.isArray(ex.headers) && Array.isArray(ex.rows) && ex.rows.every((r) => r.length === ex.headers.length), `${at}: table rows must match headers`);
    });
  }
  return errors;
}
