import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildSynonymsAndAntonyms } from "../../src/data/challenges/authored/year6/english/synonyms-and-antonyms.js";
import Challenge1 from "../../src/pages/skills/english/challenges/year6/synonyms-and-antonyms/SynonymsAndAntonymsChallenge1.jsx";
import Challenge2 from "../../src/pages/skills/english/challenges/year6/synonyms-and-antonyms/SynonymsAndAntonymsChallenge2.jsx";
import Challenge3 from "../../src/pages/skills/english/challenges/year6/synonyms-and-antonyms/SynonymsAndAntonymsChallenge3.jsx";
import Challenge4 from "../../src/pages/skills/english/challenges/year6/synonyms-and-antonyms/SynonymsAndAntonymsChallenge4.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));

it("retries a synonym choice, reveals a narrowing hint and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(41));
  const done = vi.fn();
  render(<Challenge1 onComplete={done} />);
  const questions = buildSynonymsAndAntonyms(1, seededRng(41));

  questions.forEach((question, index) => {
    if (index === 0) {
      const wrong = question.options.find(option => option !== question.answer);
      for (let miss = 0; miss < 2; miss += 1) {
        fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
        check();
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
    check();
    check();
    act(() => { vi.advanceTimersByTime(1000); });
  });

  expect(done).toHaveBeenCalledTimes(1);
});

it("completes the sort, sentence-build and odd-one-out slots", () => {
  vi.useFakeTimers();
  [[2, Challenge2], [3, Challenge3], [4, Challenge4]].forEach(([level, Challenge]) => {
    vi.spyOn(Math, "random").mockImplementation(seededRng(level * 29));
    const done = vi.fn();
    const { unmount } = render(createElement(Challenge, { onComplete: done }));
    const questions = buildSynonymsAndAntonyms(level, seededRng(level * 29));

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
        question.answer.split(" ").forEach(word => {
          const tile = within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === word);
          expect(tile, `Tile ${word}`).toBeTruthy();
          fireEvent.click(tile);
        });
      }
      check();
      check();
      act(() => { vi.advanceTimersByTime(1000); });
    });

    expect(done).toHaveBeenCalledTimes(1);
    unmount();
    vi.restoreAllMocks();
  });
});
