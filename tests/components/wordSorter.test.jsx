import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import WordSorter from "../../src/pages/skills/english/WordSorter";
import { wordsFor } from "../../src/data/freePlay/wordSorter";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><WordSorter /></MemoryRouter>);
const tiles = () => [...document.querySelectorAll(".ws-tile")];
const box = (type) => document.querySelector(`.ws-box.ws-${type}`);
const typeOf = (word) => ["noun", "verb", "adjective", "adverb"].find((t) => wordsFor(3, t).includes(word));

it("a wrong box keeps the word in the bank, the right box takes it, and sorting everything moves on", () => {
  vi.useFakeTimers();
  game();
  const total = tiles().length;
  expect(total).toBe(6); // Easier: 3 nouns + 3 verbs
  expect(document.querySelectorAll(".ws-box")).toHaveLength(2);

  const first = tiles()[0];
  const word = first.textContent;
  const wrong = typeOf(word) === "noun" ? "verb" : "noun";
  fireEvent.click(first);
  fireEvent.click(box(wrong));
  expect(tiles()).toHaveLength(total);
  expect(box(wrong).classList.contains("is-shaking")).toBe(true);

  while (tiles().length) {
    const tile = tiles()[0];
    fireEvent.click(tile);
    fireEvent.click(box(typeOf(tile.textContent)));
  }
  expect(document.querySelectorAll(".ws-chip")).toHaveLength(total);

  const before = [...document.querySelectorAll(".ws-chip")].map((c) => c.textContent).sort().join();
  act(() => vi.advanceTimersByTime(2000));
  expect(tiles()).toHaveLength(total);
  expect(document.querySelectorAll(".ws-chip")).toHaveLength(0);
  expect(before).toBeTruthy();
});

it("each level adds boxes and starts a fresh round", () => {
  game();
  fireEvent.click(screen.getByRole("button", { name: /Medium/ }));
  expect(document.querySelectorAll(".ws-box")).toHaveLength(3);
  expect(tiles()).toHaveLength(6);

  fireEvent.click(screen.getByRole("button", { name: /Harder/ }));
  expect(document.querySelectorAll(".ws-box")).toHaveLength(4);
  expect(tiles()).toHaveLength(8);
  expect(document.querySelectorAll(".ws-chip")).toHaveLength(0);

  fireEvent.click(screen.getByRole("button", { name: /Easier/ }));
  expect(document.querySelectorAll(".ws-box")).toHaveLength(2);
});
