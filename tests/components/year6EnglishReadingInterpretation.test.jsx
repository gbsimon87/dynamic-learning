import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildSummarisingAcrossParagraphs } from "../../src/data/challenges/authored/year6/english/summarising-across-paragraphs.js";
import ReadingInterpretationChallenge from "../../src/pages/skills/english/challenges/year6/ReadingInterpretationChallenge.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

function answer(question) {
  if (question.kind === "choice") fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
  if (question.kind === "sort") {
    const pile = screen.getByRole("group", { name: "Cards to sort" });
    question.cards.forEach(card => {
      fireEvent.click(within(pile).getByRole("button", { name: card.label, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: question.bins.find(bin => bin.id === card.bin).label, exact: true }));
    });
  }
  if (question.kind === "build") {
    const tray = screen.getByRole("group", { name: "Tiles to use" });
    question.answer.split(" ").forEach(label => {
      const tile = within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === label);
      expect(tile, `Tile ${label}`).toBeTruthy();
      fireEvent.click(tile);
    });
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  act(() => { vi.advanceTimersByTime(1000); });
}

it("retries with a hint and completes each interpretation interaction", () => {
  vi.useFakeTimers();
  for (const level of [1, 2, 3, 4]) {
    const seed = 420 + level;
    vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
    const done = vi.fn();
    render(createElement(ReadingInterpretationChallenge, { level, build: buildSummarisingAcrossParagraphs, onComplete: done }));
    const built = buildSummarisingAcrossParagraphs(level, seededRng(seed));
    if (level === 1) {
      const wrong = built[0].options.find(option => option !== built[0].answer);
      fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    built.forEach(answer);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
    cleanup(); vi.restoreAllMocks();
  }
});
