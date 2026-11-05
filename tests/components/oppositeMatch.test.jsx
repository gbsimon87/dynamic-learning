import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import OppositeMatch from "../../src/pages/skills/english/OppositeMatch";
import { pairsForLevel } from "../../src/data/freePlay/opposites";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><OppositeMatch /></MemoryRouter>);
const column = (name) => [...document.querySelectorAll(`.om-column[aria-label="${name}"] .om-tile`)];
const tile = (name, word) => column(name).find((t) => t.textContent.replace("✓", "") === word);
const bank = pairsForLevel(3);
const opposite = (word) => {
  const pair = bank.find(([a, b]) => a === word || b === word);
  return pair[0] === word ? pair[1] : pair[0];
};

it("a wrong tap keeps the word chosen, a right one locks the pair, and finishing moves on", () => {
  vi.useFakeTimers();
  game();
  expect(column("Words")).toHaveLength(3); // Easier: three pairs
  expect(column("Opposites")).toHaveLength(3);

  const first = column("Words")[0];
  const word = first.textContent;
  fireEvent.click(first);
  expect(first.getAttribute("aria-pressed")).toBe("true");

  const wrong = column("Opposites").find((t) => t.textContent !== opposite(word));
  fireEvent.click(wrong);
  expect(wrong.classList.contains("is-shaking")).toBe(true);
  expect(wrong.disabled).toBe(false);
  expect(first.getAttribute("aria-pressed")).toBe("true");
  expect(document.querySelectorAll(".is-matched")).toHaveLength(0);

  const before = column("Words").map((t) => t.textContent).sort().join();
  fireEvent.click(tile("Opposites", opposite(word)));
  expect(first.disabled).toBe(true);
  expect(document.querySelectorAll(".is-matched")).toHaveLength(2);

  while (column("Words").some((t) => !t.disabled)) {
    const next = column("Words").find((t) => !t.disabled);
    fireEvent.click(next);
    fireEvent.click(tile("Opposites", opposite(next.textContent)));
  }
  expect(document.querySelectorAll(".is-matched")).toHaveLength(6);

  act(() => vi.advanceTimersByTime(2000));
  expect(document.querySelectorAll(".is-matched")).toHaveLength(0);
  expect(column("Words")).toHaveLength(3);
  expect(before).toBeTruthy();
});

it("a match can start from either column", () => {
  game();
  const rightWord = column("Opposites")[0];
  fireEvent.click(rightWord);
  fireEvent.click(tile("Words", opposite(rightWord.textContent)));
  expect(document.querySelectorAll(".is-matched")).toHaveLength(2);
});

it("tapping another word in the same column switches the choice", () => {
  game();
  const [a, b] = column("Words");
  fireEvent.click(a);
  fireEvent.click(b);
  expect(a.getAttribute("aria-pressed")).toBe("false");
  expect(b.getAttribute("aria-pressed")).toBe("true");
});

it("each level adds pairs and starts a fresh round", () => {
  game();
  fireEvent.click(screen.getByRole("button", { name: /Medium/ }));
  expect(column("Words")).toHaveLength(4);
  fireEvent.click(screen.getByRole("button", { name: /Harder/ }));
  expect(column("Words")).toHaveLength(5);
  expect(document.querySelectorAll(".is-matched")).toHaveLength(0);
  fireEvent.click(screen.getByRole("button", { name: /Easier/ }));
  expect(column("Opposites")).toHaveLength(3);
});
