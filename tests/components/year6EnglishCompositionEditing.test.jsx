import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import DataChallenge from "../../src/components/challenge/data/DataChallenge.jsx";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { TITLES } from "../../src/data/challenges/topicBank.js";
import { buildFormalRegisterForAudienceAndPurpose } from "../../src/data/challenges/authored/year6/english/formal-register-for-audience-and-purpose.js";
import { buildPrecisingLongerPassages } from "../../src/data/challenges/authored/year6/english/precising-longer-passages.js";
import { buildPassiveVoiceInWriting } from "../../src/data/challenges/authored/year6/english/passive-voice-in-writing.js";
import { buildSubjunctiveFormsInWriting } from "../../src/data/challenges/authored/year6/english/subjunctive-forms-in-writing.js";
import { buildProofreadingForClarityAndEffect } from "../../src/data/challenges/authored/year6/english/proofreading-for-clarity-and-effect.js";
import { buildYear6Dictation } from "../../src/data/challenges/authored/year6/english/year-6-dictation.js";
import Year6DictationChallenge1 from "../../src/pages/skills/english/challenges/year6/year-6-dictation/Year6DictationChallenge1.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

const banks = [buildFormalRegisterForAudienceAndPurpose, buildPrecisingLongerPassages, buildPassiveVoiceInWriting, buildSubjunctiveFormsInWriting, buildProofreadingForClarityAndEffect];
function solve(q) {
  if (q.kind === "choice") fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
  if (q.kind === "sort") { const pile = screen.getByRole("group", { name: "Cards to sort" }); q.cards.forEach(card => { fireEvent.click(within(pile).getByRole("button", { name: card.label, exact: true })); fireEvent.click(screen.getByRole("button", { name: q.bins.find(bin => bin.id === card.bin).label, exact: true })); }); }
  if (q.kind === "build") { const tray = screen.getByRole("group", { name: "Tiles to use" }); q.answer.split(" ").forEach(label => fireEvent.click(within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === label))); }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  act(() => { vi.advanceTimersByTime(1000); });
}

it("retries with a hint and completes all composition bank slots once", () => {
  vi.useFakeTimers();
  banks.forEach((build, bankIndex) => [1, 2, 3, 4].forEach(level => {
    const seed = 800 + bankIndex * 10 + level;
    vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
    const done = vi.fn(); render(<DataChallenge level={level} build={build} titles={TITLES} onComplete={done} />);
    const questions = build(level, seededRng(seed));
    if (level === 1) { const wrong = questions[0].options.find(option => option !== questions[0].answer); fireEvent.click(screen.getByRole("button", { name: wrong, exact: true })); fireEvent.click(screen.getByRole("button", { name: "Check my answer" })); fireEvent.click(screen.getByRole("button", { name: wrong, exact: true })); fireEvent.click(screen.getByRole("button", { name: "Check my answer" })); expect(document.querySelector(".challenge-hint")).toBeTruthy(); }
    questions.forEach(solve); expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) }); cleanup(); vi.restoreAllMocks();
  }));
});

it("shows Year 6 dictation's sound-off look-cover-write route", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(998));
  render(<Year6DictationChallenge1 onComplete={vi.fn()} />);
  expect(screen.getByRole("group", { name: "Look at the sentence" })).toBeTruthy();
  expect(screen.getByRole("button", { name: /Hide it and answer/ })).toBeTruthy();
  expect(buildYear6Dictation(1, seededRng(998))[0].options).toContain(screen.getByText(/./, { selector: ".dictation-sentence" }).textContent);
});
