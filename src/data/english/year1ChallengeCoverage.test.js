import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year1EnglishCurriculum } from "../year1EnglishCurriculum.js";

const pascal = (id) => id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");

// Challenge.jsx finds a challenge by its computed path; a misspelt file is
// silently "not yet available". Year 1 challenges draw questions authored as
// data (DataChallenge) from year1<Pascal>.js; Dictation reuses the Year 3 game.
test("every Year 1 English slot has its correctly named default-exported component and builder", () => {
  let count = 0;
  for (const category of year1EnglishCurriculum) for (const topic of category.topics) {
    const name = pascal(topic.id);
    const builder = new URL(`../challenges/english/year1${name}.js`, import.meta.url);
    assert.ok(existsSync(builder), builder.pathname);
    for (const { id } of topic.challenges) {
      const url = new URL(`../../pages/skills/english/challenges/year1/${topic.id}/${name}Challenge${id}.jsx`, import.meta.url);
      assert.ok(existsSync(url), url.pathname);
      const text = readFileSync(url, "utf8");
      assert.match(text, /export default/);
      assert.match(text, new RegExp(`level=\\{${id}\\}`));
      assert.match(text, /onComplete=\{onComplete\}/);
      count++;
    }
  }
  assert.equal(count, 152);
});

test("Year 1 reading never offers answer narration and spelling never needs apostrophes", async () => {
  for (const category of year1EnglishCurriculum) for (const topic of category.topics) {
    if (topic.id === "dictation") continue; // Its memory game dictates sentences intentionally.
    const name = pascal(topic.id);
    const module = await import(`../challenges/english/year1${name}.js`);
    const build = module[`build${name}`];
    for (const level of [1, 2, 3, 4]) for (const q of build(level, () => 0)) {
      // Tricky Words changes from reading (1–2) to spelling (3–4), which may dictate.
      const readingText = category.title.startsWith("Reading") && q.text
        && !(topic.id === "tricky-words" && level >= 3);
      if (q.passage || readingText) {
        assert.equal(q.readTextAloud, false, `${topic.id}/${level}: answer narration`);
        assert.equal(q.speak, q.prompt, `${topic.id}/${level}: instruction speech`);
      }
      if (topic.id === "tricky-words" && level <= 2) assert.equal(q.speak, q.prompt);
      if (q.kind === "type") assert.equal(q.apostrophe, false, `${topic.id}/${level}: apostrophe key`);
    }
  }
});
