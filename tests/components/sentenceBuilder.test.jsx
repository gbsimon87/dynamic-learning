import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import SentenceBuilder from "../../src/pages/skills/english/SentenceBuilder";
import { sentencesForLevel, tilesFor } from "../../src/data/freePlay/sentenceBuilder";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><SentenceBuilder /></MemoryRouter>);
const bank = () => [...document.querySelectorAll(".sb-bank .sb-tile")];
const placed = () => [...document.querySelectorAll(".sb-slots .sb-tile")];
const check = () => screen.getByText(/Check my sentence/).closest("button");

// The right order for whatever is on screen, found from the level's sentence bank.
const answerFor = (level) => {
  const shown = bank().map((b) => b.textContent).sort().join(" ");
  const sentence = sentencesForLevel(level).find((s) => [...tilesFor(s, level)].sort().join(" ") === shown);
  return tilesFor(sentence, level);
};

it("tapping a word fills the next slot, tapping it again takes it back", () => {
  game();
  const total = bank().length;
  const word = bank()[0].textContent;
  fireEvent.click(bank()[0]);
  expect(placed().map((b) => b.textContent)).toEqual([word]);
  expect(bank()).toHaveLength(total - 1);
  fireEvent.click(placed()[0]);
  expect(placed()).toHaveLength(0);
  expect(bank()).toHaveLength(total);
});

it("a wrong order marks the misplaced words and lets the child fix it; the right order moves on", () => {
  vi.useFakeTimers();
  game();
  expect(check().disabled).toBe(true);
  const answer = answerFor(1);

  // Place everything in reverse: wrong (every sentence has distinct first/last words).
  for (const word of [...answer].reverse()) fireEvent.click(bank().find((b) => b.textContent === word));
  expect(check().disabled).toBe(false);
  fireEvent.click(check());
  expect(document.querySelectorAll(".sb-tile.is-wrong").length).toBeGreaterThan(0);
  expect(placed().every((b) => !b.disabled)).toBe(true);

  // Take everything back and build it properly.
  while (placed().length) fireEvent.click(placed()[0]);
  for (const word of answer) fireEvent.click(bank().find((b) => b.textContent === word));
  fireEvent.click(check());
  expect(document.querySelectorAll(".sb-tile.is-right")).toHaveLength(answer.length);
  expect(placed().every((b) => b.disabled)).toBe(true);

  act(() => vi.advanceTimersByTime(1000));
  expect(placed()).toHaveLength(0);
});

it("changing level deals a fresh, longer sentence", () => {
  game();
  const easy = bank().length;
  fireEvent.click(screen.getByRole("button", { name: /Harder/ }));
  expect(bank().length).toBeGreaterThanOrEqual(7);
  expect(bank().length).toBeGreaterThan(easy);
  expect(placed()).toHaveLength(0);
});
