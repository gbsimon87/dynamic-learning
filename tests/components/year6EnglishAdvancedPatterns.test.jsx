import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildTheLetterStringOugh } from "../../src/data/challenges/authored/year6/english/the-letter-string-ough.js";
import { buildConfusingWordPairs } from "../../src/data/challenges/authored/year6/english/confusing-word-pairs.js";
import { buildYear6WordListPart1 } from "../../src/data/challenges/authored/year6/english/year-6-word-list-part-1.js";
import { buildYear6WordListPart2 } from "../../src/data/challenges/authored/year6/english/year-6-word-list-part-2.js";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

const loaders = import.meta.glob("../../src/pages/skills/english/challenges/year6/*/*Challenge[1-4].jsx", { eager: true });
const topics = [
  ["the-letter-string-ough", "TheLetterStringOugh", buildTheLetterStringOugh],
  ["confusing-word-pairs", "ConfusingWordPairs", buildConfusingWordPairs],
  ["year-6-word-list-part-1", "Year6WordListPart1", buildYear6WordListPart1],
  ["year-6-word-list-part-2", "Year6WordListPart2", buildYear6WordListPart2],
];
const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));

function answer(question) {
  if (question.kind === "choice") {
    fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
  } else if (question.kind === "sort") {
    const pile = screen.getByRole("group", { name: "Cards to sort" });
    question.cards.forEach(card => {
      fireEvent.click(within(pile).getByRole("button", { name: card.label, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: question.bins.find(bin => bin.id === card.bin).label, exact: true }));
    });
  } else if (question.kind === "build") {
    const tray = screen.getByRole("group", { name: "Tiles to use" });
    [...question.answer].forEach(letter => {
      const tile = within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === letter);
      expect(tile, `Tile ${letter}`).toBeTruthy();
      fireEvent.click(tile);
    });
  } else if (question.kind === "type") {
    [...question.answer].forEach(letter => fireEvent.click(screen.getByRole("button", { name: letter, exact: true })));
  } else {
    throw new Error(`unplayed kind ${question.kind}`);
  }
}

it.each(topics.flatMap(([id, pascal, build]) => [1, 2, 3, 4].map(level => [id, pascal, build, level])))(
  "%s slot %i completes once with the shell's payload",
  (id, pascal, build, level) => {
    vi.useFakeTimers();
    const seed = level * 37 + id.length;
    vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
    const Challenge = loaders[`../../src/pages/skills/english/challenges/year6/${id}/${pascal}Challenge${level}.jsx`].default;
    const done = vi.fn();
    render(createElement(Challenge, { onComplete: done }));
    const questions = build(level, seededRng(seed));

    questions.forEach((question, index) => {
      if (index === 0 && question.kind === "choice") {
        const wrong = question.options.find(option => option !== question.answer);
        for (let miss = 0; miss < 2; miss += 1) {
          fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
          check();
        }
        expect(screen.getByText("Question 1 of 5")).toBeTruthy();
        expect(document.querySelector(".challenge-hint")).toBeTruthy();
      }
      answer(question);
      check();
      check();
      act(() => { vi.advanceTimersByTime(1000); });
    });

    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
  },
);

it("shows the rhyme word and spelling chunks as visible givens", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(5));
  const Ough = loaders["../../src/pages/skills/english/challenges/year6/the-letter-string-ough/TheLetterStringOughChallenge1.jsx"].default;
  render(createElement(Ough, { onComplete: () => {} }));
  expect(screen.getByText("Word parts given in the question")).toBeTruthy();
  cleanup();
  const Pairs = loaders["../../src/pages/skills/english/challenges/year6/confusing-word-pairs/ConfusingWordPairsChallenge1.jsx"].default;
  render(createElement(Pairs, { onComplete: () => {} }));
  expect(screen.getByText("Word parts given in the question")).toBeTruthy();
});
