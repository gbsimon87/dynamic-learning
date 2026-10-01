import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year3EnglishCurriculum } from "../year3EnglishCurriculum.js";
import { year4EnglishCurriculum } from "../year4EnglishCurriculum.js";

test("every approved Years 3–4 English slot has its correctly named default-exported component", () => {
  let count = 0;
  for (const [year, curriculum] of [[3, year3EnglishCurriculum], [4, year4EnglishCurriculum]]) {
    for (const category of curriculum) for (const topic of category.topics) {
      const name = topic.id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
      for (const { id } of topic.challenges) {
        const url = new URL(`../../pages/skills/english/challenges/year${year}/${topic.id}/${name}Challenge${id}.jsx`, import.meta.url);
        assert.ok(existsSync(url), url.pathname);
        const text = readFileSync(url, "utf8");
        assert.match(text, /export default/);
        assert.match(text, new RegExp(`level=\\{${id}\\}`));
        assert.match(text, /onComplete=\{onComplete\}/);
        count++;
      }
    }
  }
  assert.equal(count, 260);
});
