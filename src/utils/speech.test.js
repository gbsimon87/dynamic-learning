import test from "node:test";
import assert from "node:assert/strict";
import { speak, speakAndWait, stopNarration } from "./speech.js";

test("speech cancellation, replacement and native errors settle callers", async (t) => {
  const original = globalThis.window;
  t.after(() => { stopNarration(); if (original === undefined) delete globalThis.window; else globalThis.window = original; });
  const utterances = [];
  globalThis.window = { SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } }, speechSynthesis: { speak: (utterance) => utterances.push(utterance), cancel: () => {} } };
  const first = speakAndWait("first");
  assert.equal(utterances[0].lang, "en-GB");
  stopNarration();
  await first; // Browser deliberately emits no cancellation event.
  const second = speakAndWait("second");
  const third = speakAndWait("third");
  await second;
  utterances[1].onend(); // Late events must not clear the newer owner.
  stopNarration();
  await third;
  const fourth = speakAndWait("fourth");
  speak("solar system");
  await fourth;
  window.speechSynthesis.speak = () => { throw new Error("voice unavailable"); };
  await speakAndWait("failed");
  window.speechSynthesis.cancel = () => { throw new Error("engine unavailable"); };
  await speakAndWait("failed cancel");
  assert.equal(utterances.length, 5);
});

test("speech resolves immediately when unavailable", async () => {
  await speakAndWait("words");
});
