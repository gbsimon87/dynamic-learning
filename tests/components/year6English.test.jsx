import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildAddingEndingsToFer } from "../../src/data/challenges/authored/year6/english/adding-endings-to-fer.js";
import { buildFormalAndInformalVocabulary } from "../../src/data/challenges/authored/year6/english/formal-and-informal-vocabulary.js";
import AddingEndingsToFerChallenge1 from "../../src/pages/skills/english/challenges/year6/adding-endings-to-fer/AddingEndingsToFerChallenge1.jsx";
import FormalAndInformalVocabularyChallenge1 from "../../src/pages/skills/english/challenges/year6/formal-and-informal-vocabulary/FormalAndInformalVocabularyChallenge1.jsx";

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
