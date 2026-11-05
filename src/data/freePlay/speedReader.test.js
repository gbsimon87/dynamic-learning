import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SPEED_READER_LEVELS, speedName, storiesForLevel } from "./speedReader.js";

const stories = JSON.parse(readFileSync(new URL("../stories.json", import.meta.url), "utf8"));

test("there are plenty of stories and every level offers at least four", () => {
  assert.ok(stories.length >= 16);
  for (const level of SPEED_READER_LEVELS) assert.ok(storiesForLevel(level.id, stories).length >= 4, level.id);
});

test("stories are well formed with unique ids and answerable questions", () => {
  const ids = new Set();
  for (const story of stories) {
    assert.ok(!ids.has(story.id), `duplicate ${story.id}`);
    ids.add(story.id);
    assert.ok(story.title && story.emoji && story.text.length > 20, story.id);
    assert.equal(story.questions.length, 3, story.id);
    for (const q of story.questions) {
      assert.equal(new Set(q.options).size, q.options.length, `${story.id}: repeated option`);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, story.id);
    }
  }
});

test("harder levels start faster and use longer stories", () => {
  const avg = (id) => {
    const list = storiesForLevel(id, stories);
    return list.reduce((n, s) => n + s.text.split(/\s+/).length, 0) / list.length;
  };
  assert.ok(avg("medium") > avg("easy"));
  assert.ok(avg("hard") > avg("medium"));
  const [easy, medium, hard] = SPEED_READER_LEVELS;
  assert.ok(easy.wpm < medium.wpm && medium.wpm < hard.wpm);
});

test("speed names grow with the pace", () => {
  assert.deepEqual([60, 100, 150, 250].map(speedName), ["Slow", "Steady", "Fast", "Super"]);
});
