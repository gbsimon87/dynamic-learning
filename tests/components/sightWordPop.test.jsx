import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import SightWordPop from "../../src/pages/skills/english/SightWordPop";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><SightWordPop /></MemoryRouter>);
const bubbles = () => [...document.querySelectorAll(".swp-bubble")];
const target = () => document.querySelector(".swp-target-word").textContent;
const wait = (ms) => act(() => { vi.advanceTimersByTime(ms); });

it("starts from a level, pops the target for a point and ignores other words", () => {
  vi.useFakeTimers();
  game();
  expect(screen.getAllByRole("radio")).toHaveLength(3);
  fireEvent.click(screen.getByRole("radio", { name: /Medium/ }));
  expect(screen.getByText(/Find 10 words in 50 seconds/)).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: /Start/ }));

  // Wait until a wrong bubble and a target bubble have both appeared.
  for (let i = 0; i < 20 && !(bubbles().some((b) => b.textContent !== target()) && bubbles().some((b) => b.textContent === target())); i++) wait(1050);

  const wrong = bubbles().find((b) => b.textContent !== target());
  fireEvent.click(wrong);
  expect(document.querySelector(".swp-stat:nth-child(2)").textContent).toContain("0/10");

  fireEvent.click(bubbles().find((b) => b.textContent === target()));
  expect(document.querySelector(".swp-stat:nth-child(2)").textContent).toContain("1/10");
});

it("ends when time runs out and a level change resets the game", () => {
  vi.useFakeTimers();
  game();
  fireEvent.click(screen.getByRole("button", { name: /Start/ }));
  wait(61000);
  expect(screen.getByText(/Time's up/)).toBeTruthy();
  expect(screen.getByRole("img", { name: /stars/ })).toBeTruthy();

  fireEvent.click(screen.getByRole("button", { name: /Change level/ }));
  expect(screen.getAllByRole("radio")).toHaveLength(3);
  fireEvent.click(screen.getByRole("button", { name: /Start/ }));
  expect(document.querySelector(".swp-stat:nth-child(2)").textContent).toContain("0/8");
  expect(bubbles()).toHaveLength(0);
});
