import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import SynonymSafari from "../../src/pages/skills/english/SynonymSafari";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><SynonymSafari /></MemoryRouter>);
const cards = () => [...document.querySelectorAll(".sa-card")];
const word = (card) => card.querySelector(".sa-word").textContent;
const matched = () => document.querySelectorAll(".sa-card.is-matched").length;

/** Group the cards on the board into their synonym pairs by reading the DOM. */
function findPair(first) {
  // Flip candidates until one matches; a wrong flip is timed out between tries.
  for (const other of cards()) {
    if (other === first || other.disabled) continue;
    fireEvent.click(first);
    fireEvent.click(other);
    if (other.classList.contains("is-matched")) return other;
    act(() => vi.advanceTimersByTime(1100));
  }
  throw new Error("no partner found");
}

it("a wrong pair turns back over, a right pair locks, and finishing moves on", () => {
  vi.useFakeTimers();
  game();
  expect(cards()).toHaveLength(6); // Easier: three pairs

  // Try the first card against each other until we see one miss and one match.
  const first = cards()[0];
  let missed = false;
  for (const other of cards().slice(1)) {
    fireEvent.click(first);
    fireEvent.click(other);
    if (other.classList.contains("is-matched")) break;
    missed = true;
    expect(other.classList.contains("is-miss")).toBe(true);
    expect(matched()).toBe(0);
    act(() => vi.advanceTimersByTime(1100));
    expect(document.querySelectorAll(".sa-card.is-up")).toHaveLength(0);
  }
  expect(matched()).toBe(2);
  expect(missed || matched() === 2).toBe(true);

  const before = cards().map(word).join();
  while (cards().some((c) => !c.disabled)) findPair(cards().find((c) => !c.disabled));
  expect(matched()).toBe(6);

  act(() => vi.advanceTimersByTime(2000));
  expect(matched()).toBe(0);
  expect(cards()).toHaveLength(6);
  expect(before).toBeTruthy();
});

it("changing level deals a bigger board and clears the old one", () => {
  vi.useFakeTimers();
  game();
  fireEvent.click(cards()[0]);
  fireEvent.click(document.querySelectorAll(".free-play-level")[2]);
  expect(cards()).toHaveLength(12); // Harder: six pairs
  expect(document.querySelectorAll(".sa-card.is-up")).toHaveLength(0);
});
