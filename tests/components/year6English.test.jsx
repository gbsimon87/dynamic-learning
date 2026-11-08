import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildAddingEndingsToFer } from "../../src/data/challenges/authored/year6/english/adding-endings-to-fer.js";
import { buildFormalAndInformalVocabulary } from "../../src/data/challenges/authored/year6/english/formal-and-informal-vocabulary.js";
import { buildHyphensInWords } from "../../src/data/challenges/authored/year6/english/hyphens-in-words.js";
import AddingEndingsToFerChallenge1 from "../../src/pages/skills/english/challenges/year6/adding-endings-to-fer/AddingEndingsToFerChallenge1.jsx";
import FormalAndInformalVocabularyChallenge1 from "../../src/pages/skills/english/challenges/year6/formal-and-informal-vocabulary/FormalAndInformalVocabularyChallenge1.jsx";
import HyphensInWordsChallenge1 from "../../src/pages/skills/english/challenges/year6/hyphens-in-words/HyphensInWordsChallenge1.jsx";
import HyphensInWordsChallenge2 from "../../src/pages/skills/english/challenges/year6/hyphens-in-words/HyphensInWordsChallenge2.jsx";
import HyphensInWordsChallenge3 from "../../src/pages/skills/english/challenges/year6/hyphens-in-words/HyphensInWordsChallenge3.jsx";
import HyphensInWordsChallenge4 from "../../src/pages/skills/english/challenges/year6/hyphens-in-words/HyphensInWordsChallenge4.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

it("retries formal-vocabulary answers, reveals a narrowing hint and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(9));
  const done = vi.fn();
  render(<FormalAndInformalVocabularyChallenge1 onComplete={done} />);
  const questions = buildFormalAndInformalVocabulary(1, seededRng(9));

  questions.forEach((question, index) => {
    if (index === 0) {
      const wrong = question.options.find(option => option !== question.answer);
      for (let miss = 0; miss < 2; miss += 1) {
        fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(done).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
  });

  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});

it("shows visible word parts, retries fer-ending spellings and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(17));
  const done = vi.fn();
  render(<AddingEndingsToFerChallenge1 onComplete={done} />);
  const questions = buildAddingEndingsToFer(1, seededRng(17));

  expect(screen.getByText("Word parts given in the question")).toBeTruthy();
  questions.forEach((question, index) => {
    if (index === 0) {
      const wrong = question.options.find(option => option !== question.answer);
      for (let miss = 0; miss < 2; miss += 1) {
        fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    act(() => { vi.advanceTimersByTime(1000); });
  });

  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});

it("shows word parts, retries hyphenated spellings and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(23));
  const done = vi.fn();
  render(<HyphensInWordsChallenge1 onComplete={done} />);
  const questions = buildHyphensInWords(1, seededRng(23));

  expect(screen.getByText("Word parts given in the question")).toBeTruthy();
  questions.forEach((question, index) => {
    if (index === 0) {
      const wrong = question.options.find(option => option !== question.answer);
      for (let miss = 0; miss < 2; miss += 1) {
        fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    act(() => { vi.advanceTimersByTime(1000); });
  });

  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});

it("completes the hyphen sort, tile-build and sentence slots", () => {
  vi.useFakeTimers();
  const slots = [
    [2, HyphensInWordsChallenge2],
    [3, HyphensInWordsChallenge3],
    [4, HyphensInWordsChallenge4],
  ];

  slots.forEach(([level, Challenge]) => {
    vi.spyOn(Math, "random").mockImplementation(seededRng(level * 31));
    const done = vi.fn();
    const { unmount } = render(createElement(Challenge, { onComplete: done }));
    const questions = buildHyphensInWords(level, seededRng(level * 31));

    questions.forEach(question => {
      if (question.kind === "choice") {
        fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
      } else if (question.kind === "sort") {
        const pile = screen.getByRole("group", { name: "Cards to sort" });
        question.cards.forEach(card => {
          fireEvent.click(within(pile).getByRole("button", { name: card.label, exact: true }));
          const bin = question.bins.find(item => item.id === card.bin);
          fireEvent.click(screen.getByRole("button", { name: bin.label, exact: true }));
        });
      } else if (question.kind === "build") {
        const tray = screen.getByRole("group", { name: "Tiles to use" });
        [...question.answer].forEach(letter => {
          const tile = within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === letter);
          expect(tile, `Tile ${letter}`).toBeTruthy();
          fireEvent.click(tile);
        });
      }
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      act(() => { vi.advanceTimersByTime(1000); });
    });

    expect(done).toHaveBeenCalledTimes(1);
    unmount();
    vi.restoreAllMocks();
  });
});
