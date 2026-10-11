import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildWhatHappensNext } from "./year1WhatHappensNext.js";
import { checkYear1Build } from "./year1Checks.js";
import { wordCount } from "../../english/textChecks.js";

test("Year 1 WhatHappensNext: short, fair reading at all levels", () => {
  checkYear1Build(buildWhatHappensNext, { titles: TITLES, minQuestions: 3, maxQuestions: 4 });
  assert.ok(BANK.length >= 3);
  assert.throws(() => buildWhatHappensNext(5, () => 0));
  for (const set of BANK) {
    assert.ok(wordCount(set.lines.join(" ")) <= 80);
    assert.equal(set.questions.length, 3);
    assert.equal(new Set(set.order).size, set.order.length);
    for (const q of set.questions) {
      assert.ok(!q.wrong.includes(q.answer));
      assert.ok(set.lines[q.line], q.evidencePrompt);
      assert.ok(q.evidencePrompt && q.evidencePrompt !== "Tap the line that gives the clue.");
    }
  }
  for (const level of [1, 2, 3, 4]) for (const q of buildWhatHappensNext(level, () => 0)) {
    assert.equal(q.speak, q.prompt, "reading speech reads only instructions");
  }
});
