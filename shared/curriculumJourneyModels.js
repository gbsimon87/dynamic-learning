import { assertJsonData, isRecord, isText, requireJourney } from "./curriculumJourneyData.js";

const integers = (a, min = 0) => Array.isArray(a) && a.every((n) => Number.isSafeInteger(n) && n >= min);
const fields = (data, allowed) => Object.keys(data).every((key) => allowed.includes(key));
const textRows = (rows) => Array.isArray(rows) && rows.length > 0 && rows.length <= 30
  && rows.every((row) => Array.isArray(row) && row.length <= 12 && row.every((cell) => typeof cell === "string" || Number.isFinite(cell)));

const LESSON_SHAPES = {
  equation: (d) => fields(d, ["type", "title", "note", "parts"]) && Array.isArray(d.parts) && d.parts.length >= 3 && d.parts.length <= 15 && d.parts.every((s) => isText(String(s), 30)),
  column: (d) => fields(d, ["type", "title", "note", "top", "bottom", "op", "answer"]) && ["+", "−"].includes(d.op)
    && [d.top, d.bottom, d.answer].every((n) => Number.isSafeInteger(n) && n >= 0),
  steps: (d) => fields(d, ["type", "title", "note", "steps"]) && Array.isArray(d.steps) && d.steps.length >= 2 && d.steps.length <= 5 && d.steps.every((s) => isText(s, 200)),
  jumps: (d) => fields(d, ["type", "title", "note", "terms", "step"]) && Array.isArray(d.terms) && d.terms.length >= 3 && d.terms.length <= 12
    && d.terms.every((s) => isText(String(s), 20)) && (d.step === undefined || isText(d.step, 20)),
  bar: (d) => fields(d, ["type", "title", "note", "bars"]) && Array.isArray(d.bars) && d.bars.length >= 1 && d.bars.length <= 4
    && d.bars.every((b) => isRecord(b) && fields(b, ["parts", "shaded", "label"]) && Number.isInteger(b.parts) && b.parts > 0 && b.parts <= 12
      && Number.isInteger(b.shaded) && b.shaded >= 0 && b.shaded <= b.parts && (b.label === undefined || isText(b.label, 40))),
  groups: (d) => fields(d, ["type", "title", "note", "groups", "label"]) && isText(d.label, 300) && Array.isArray(d.groups) && d.groups.length <= 12
    && d.groups.every((g) => Array.isArray(g) && g.length <= 30 && g.every((s) => isText(s, 20))),
  table: (d) => fields(d, ["type", "title", "note", "headers", "rows"]) && Array.isArray(d.headers) && d.headers.length >= 1 && d.headers.length <= 6
    && d.headers.every((s) => isText(String(s), 80)) && textRows(d.rows) && d.rows.every((r) => r.length === d.headers.length),
  sentence: (d) => fields(d, ["type", "title", "note", "text"]) && isText(d.text, 400) && /\*\*.+?\*\*/.test(d.text),
  fix: (d) => fields(d, ["type", "title", "note", "wrong", "right"]) && isText(d.wrong, 200) && isText(d.right, 200) && d.wrong !== d.right,
  diagram: (d) => isText(d.label, 300) && Object.hasOwn(DIAGRAMS, d.kind) && DIAGRAMS[d.kind](d),
};
const positive = (v) => Number.isFinite(v) && v > 0;
const points = (v) => Array.isArray(v) && v.length >= 3 && v.length <= 12 && v.every((p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite));
const diagram = (extra) => (d) => fields(d, ["type", "title", "note", "kind", "label", ...extra]);
// Mirrors src/data/lessons/lintLessons.js so a model always draws with real numbers.
const DIAGRAMS = {
  rectangle: (d) => diagram(["width", "height", "unit", "cells"])(d) && positive(d.width) && positive(d.height)
    && (!d.cells || Number.isInteger(d.width) && Number.isInteger(d.height)) && (d.unit === undefined || isText(d.unit, 10)),
  angle: (d) => diagram(["degrees"])(d) && positive(d.degrees) && d.degrees < 360,
  polygon: (d) => diagram(["points", "caption"])(d) && points(d.points) && isText(d.caption, 120),
  coordinates: (d) => diagram(["before", "after", "mirror"])(d) && points(d.before) && points(d.after) && [...d.before, ...d.after].flat().every((n) => n >= 0 && n <= 5),
  graph: (d) => diagram(["values", "labels", "step", "unit"])(d) && Array.isArray(d.values) && d.values.length >= 2 && d.values.length <= 8
    && d.values.some(positive) && d.values.every((v) => Number.isFinite(v) && v >= 0) && Array.isArray(d.labels) && d.labels.length === d.values.length
    && d.labels.every((s) => isText(s, 30)) && positive(d.step) && isText(d.unit, 30),
  cuboid: (d) => diagram(["length", "width", "height"])(d) && [d.length, d.width, d.height].every(positive),
  grid: (d) => diagram(["columns", "rows", "shaded"])(d) && [d.columns, d.rows].every((v) => Number.isInteger(v) && v > 0 && v <= 10)
    && Number.isInteger(d.shaded) && d.shaded >= 0 && d.shaded <= d.columns * d.rows,
};
const isLessonExample = (d) => Object.hasOwn(LESSON_SHAPES, d.type) && LESSON_SHAPES[d.type](d);

// Every schema admits visible givens only. Neither answer nor scoring fields
// can sneak into a nested public visual by object spreading a private question.
export const JOURNEY_MODEL_VALIDATORS = {
  groups: (d) => fields(d, ["groups", "label"]) && Array.isArray(d.groups) && d.groups.length <= 12
    && d.groups.every((g) => Array.isArray(g) && g.length <= 30 && g.every((s) => isText(s, 50))),
  "fraction-bars": (d) => fields(d, ["bars"]) && Array.isArray(d.bars) && d.bars.length <= 6
    && d.bars.every((b) => isRecord(b) && fields(b, ["parts", "shaded", "label"]) && Number.isInteger(b.parts)
      && b.parts > 0 && b.parts <= 24 && integers(b.shaded) && new Set(b.shaded).size === b.shaded.length && b.shaded.every((i) => i < b.parts)),
  "number-line": (d) => fields(d, ["terms", "label"]) && Array.isArray(d.terms) && d.terms.length >= 2 && d.terms.length <= 20
    && d.terms.every((s) => isText(s, 30)),
  table: (d) => fields(d, ["headings", "rows", "caption"]) && Array.isArray(d.headings) && d.headings.every((s) => isText(s, 100))
    && textRows(d.rows) && d.rows.every((r) => r.length === d.headings.length),
  text: (d) => fields(d, ["title", "lines"]) && Array.isArray(d.lines) && d.lines.length > 0 && d.lines.length <= 8
    && d.lines.every((s) => isText(s, 1000)),
  // Icon cards for subjects whose useful picture is a set of labelled things.
  pictures: (d) => fields(d, ["title", "items"]) && (d.title === undefined || isText(d.title, 120)) && Array.isArray(d.items)
    && d.items.length >= 1 && d.items.length <= 12 && d.items.every((i) => isRecord(i) && fields(i, ["icon", "label"])
      && isText(i.icon, 16) && isText(i.label, 120)),
  // The same worked-example shapes LessonFrame already draws (LessonExample.jsx).
  lesson: (d) => isRecord(d) && isText(d.title, 150) && (d.note === undefined || isText(d.note, 300)) && isLessonExample(d),
  // Analogue clock: hands only; the caption/alt must not state the time in a quiz.
  clock: (d) => fields(d, ["hour", "minute"]) && Number.isInteger(d.hour) && d.hour >= 1 && d.hour <= 12
    && Number.isInteger(d.minute) && d.minute >= 0 && d.minute <= 59,
  "bar-chart": (d) => fields(d, ["title", "unit", "step", "bars"]) && (d.title === undefined || isText(d.title, 120))
    && (d.unit === undefined || isText(d.unit, 40)) && Number.isFinite(d.step) && d.step > 0
    && Array.isArray(d.bars) && d.bars.length >= 2 && d.bars.length <= 8
    && d.bars.every((b) => isRecord(b) && fields(b, ["label", "value"]) && isText(b.label, 30) && Number.isFinite(b.value) && b.value >= 0)
    && Math.max(...d.bars.map((b) => b.value)) / d.step <= 20,
  timeline: (d) => fields(d, ["events"]) && Array.isArray(d.events) && d.events.length >= 2 && d.events.length <= 10
    && d.events.every((e) => isRecord(e) && fields(e, ["date", "label"]) && isText(e.date, 100) && isText(e.label, 300)),
};

export function validateJourneyModel(model) {
  requireJourney(isRecord(model) && fields(model, ["renderer", "data", "alt"]) && isText(model.alt)
    && isRecord(model.data) && Object.hasOwn(JOURNEY_MODEL_VALIDATORS, model.renderer)
    && JOURNEY_MODEL_VALIDATORS[model.renderer](model.data), "INVALID_MODEL");
  assertJsonData(model, 30000);
  return model;
}

export function validateIntroduction(intro) {
  requireJourney(isRecord(intro) && Number.isSafeInteger(intro.version) && intro.version > 0 && isText(intro.title, 150)
    && Array.isArray(intro.learning) && intro.learning.length >= 1 && intro.learning.length <= 3 && intro.learning.every((s) => isText(s, 250))
    && isText(intro.usefulness, 400) && isText(intro.example?.text, 600) && Array.isArray(intro.sources) && intro.sources.length > 0
    && intro.sources.every((s) => isRecord(s) && isText(s.path, 300) && s.path.startsWith("docs/curriculum/") && isText(s.heading, 300)), "INVALID_INTRODUCTION");
  validateJourneyModel(intro.example.model);
  assertJsonData(intro, 30000);
  return intro;
}
