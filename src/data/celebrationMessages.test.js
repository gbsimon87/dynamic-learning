import test from "node:test";
import assert from "node:assert/strict";
import { MESSAGES, nextMessage, pickMessage } from "./celebrationMessages.js";

test("never repeats the previous line", () => {
  for (const kind of Object.keys(MESSAGES)) {
    let previousId;
    for (let i = 0; i < 40; i++) {
      const message = pickMessage(kind, { name: "Maya", subject: "Maths", year: 2, previousId });
      if (MESSAGES[kind].length > 1) assert.notEqual(message.id, previousId, kind);
      previousId = message.id;
    }
  }
});

test("fills the name, subject and year", () => {
  const always = () => 0.99;
  const year = pickMessage("year", { name: "Maya", year: 3, random: always });
  assert.equal(year.text, "Year 3 champion, Maya!");
  const subject = pickMessage("subject", { name: "Maya", subject: "Maths", random: () => 0 });
  assert.equal(subject.text, "Maths complete!");
});

test("without a name, lines that need one are never chosen", () => {
  for (let i = 0; i < 50; i++) {
    const { text } = pickMessage("challenge", { random: () => i / 50 });
    assert.doesNotMatch(text, /,\s*!|\{name\}/);
  }
});

test("an unknown kind falls back to a challenge line rather than throwing", () => {
  assert.ok(MESSAGES.challenge.includes(pickMessage("nope", { random: () => 0 }).text));
});

test("nextMessage remembers the last line per kind", () => {
  const seen = [nextMessage("correct"), nextMessage("correct"), nextMessage("correct")];
  assert.notEqual(seen[0], seen[1]);
  assert.notEqual(seen[1], seen[2]);
});
