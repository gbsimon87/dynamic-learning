import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { lintBuild, seededRng } from "./challenges/questionKinds.js";
import { findUsSpellings } from "./english/textChecks.js";
import { getLesson } from "./lessons/index.js";
import { buildCohesiveDevicesAcrossParagraphs, repeats } from "./challenges/authored/year6/english/cohesive-devices-across-paragraphs.js";
import { buildEllipsis, rows as ellipsisRows } from "./challenges/authored/year6/english/ellipsis.js";
import { buildLayoutDevices, jobs, leaflets } from "./challenges/authored/year6/english/layout-devices.js";
import { buildSemicolonsColonsAndDashes, pairs } from "./challenges/authored/year6/english/semicolons-colons-and-dashes.js";
import { buildPunctuationInLists, lists as punctuationLists } from "./challenges/authored/year6/english/punctuation-in-lists.js";
import { buildBulletPointPunctuation, lists as bulletLists } from "./challenges/authored/year6/english/bullet-point-punctuation.js";
import { buildHyphensToAvoidAmbiguity, rows as hyphenRows } from "./challenges/authored/year6/english/hyphens-to-avoid-ambiguity.js";

const pascal = id => id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");
export const built = [
  ["cohesive-devices-across-paragraphs", buildCohesiveDevicesAcrossParagraphs],
  ["ellipsis", buildEllipsis],
  ["layout-devices", buildLayoutDevices],
  ["semicolons-colons-and-dashes", buildSemicolonsColonsAndDashes],
  ["punctuation-in-lists", buildPunctuationInLists],
  ["bullet-point-punctuation", buildBulletPointPunctuation],
  ["hyphens-to-avoid-ambiguity", buildHyphensToAvoidAmbiguity],
];

test("Year 6 Cohesion, Layout and Punctuation: loaders, lessons, valid distinct British-English questions", () => {
  for (const [id, build] of built) {
    for (const level of [1, 2, 3, 4]) {
      const file = new URL(`../pages/skills/english/challenges/year6/${id}/${pascal(id)}Challenge${level}.jsx`, import.meta.url);
      assert.ok(existsSync(file), file.pathname);
      assert.match(readFileSync(file, "utf8"), /onComplete/);
      assert.ok(getLesson("english", 6, id, level)?.example, `${id} lesson ${level}`);
    }
    assert.deepEqual(lintBuild(build, { year: 6, titles: ["a", "b", "c", "d"], seeds: 30, minQuestions: 5 }), []);
    for (const level of [1, 2, 3, 4]) for (let seed = 1; seed <= 30; seed += 1) {
      const questions = build(level, seededRng(seed));
      assert.equal(questions.length, 5);
      assert.equal(new Set(questions.map(q => [q.prompt, q.text, q.sentence, q.passage?.blocks?.[0]?.text, q.tokens?.join("|"), q.cards?.map(c => c.label).sort().join("|")].join("#"))).size, 5, `${id} L${level} seed ${seed}`);
      assert.deepEqual(findUsSpellings(JSON.stringify(questions)), []);
    }
  }
});

const words = text => new Set(text.toLowerCase().match(/[a-z]{5,}/g) ?? []);
test("Cohesive devices: only the repeating sentence repeats paragraph 1's key phrase or words", () => {
  for (const item of repeats) {
    assert.ok(item.p1.toLowerCase().includes(item.key.toLowerCase()), item.key);
    assert.ok(item.answer.toLowerCase().includes(item.key.toLowerCase()), item.answer);
    const first = words(item.p1);
    for (const wrong of item.wrong) assert.equal([...words(wrong)].filter(word => first.has(word)).length, 0, wrong);
  }
});

test("Ellipsis: the shorter version really is shorter and the left-out word is dropped", () => {
  for (const row of ellipsisRows) {
    assert.ok(row.short.length < row.full.length, row.full);
    assert.ok(row.full.includes(row.left), row.left);
  }
});

test("Layout devices: every job names a device, and every leaflet sub-heading is unique", () => {
  assert.equal(new Set(jobs.map(job => job.card)).size, jobs.length);
  for (const { main, a, b } of leaflets) assert.equal(new Set([main, a[0], b[0]]).size, 3);
});

test("Semi-colons, colons and dashes: two clauses per pair, no comma already present", () => {
  for (const pair of pairs) { assert.ok(!pair.one.includes(","), pair.one); assert.match(pair.two, /\.$/); }
});

test("Lists: colon lists follow a complete clause and semi-colon lists have commas inside every item", () => {
  for (const { kind, text } of punctuationLists) {
    if (kind === "colon") assert.ok(text.indexOf(":") > 10 && text.split(":").length === 2, text);
    else for (const item of text.replace(/\.$/, "").split("; ")) assert.ok(item.replace(/^and /, "").includes(","), item);
  }
});

test("Bullets: every list is consistent in one style", () => {
  for (const { style, lead, items } of bulletLists) {
    assert.ok(lead.endsWith(":"), lead);
    for (const item of items) {
      if (style === "phrases") assert.ok(/^[a-z0-9]/.test(item) && !item.endsWith("."), item);
      else assert.ok(/^[A-Z]/.test(item) && item.endsWith("."), item);
    }
  }
});

test("Hyphens: each sentence contains its own form, and the two forms differ", () => {
  for (const row of hyphenRows) {
    assert.ok(row.sh.toLowerCase().includes(row.hy), row.sh);
    assert.ok(row.su.toLowerCase().includes(row.un), row.su);
    assert.notEqual(row.hy, row.un);
  }
});
