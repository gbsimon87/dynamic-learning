import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import { ThemeContext } from "../../src/context/theme-context";
import OppositeMatch from "../../src/pages/skills/english/OppositeMatch";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

const render_ = () => render(<ThemeContext.Provider value={{ theme: "light" }}><MemoryRouter><OppositeMatch /></MemoryRouter></ThemeContext.Provider>);
const words = () => [...document.querySelectorAll(".word-chip")];
const targets = () => [...document.querySelectorAll(".drop-zone")];
const score = () => document.querySelector(".match-score").textContent;

it.each([
  { random: 0, word: "warm", opposite: "cool" },
  { random: 0.999999, word: "hot", opposite: "cold" },
])("wrong taps score nothing before matching $word with $opposite", async ({ random, word, opposite }) => {
  // Exercise two reproducible shuffle orders, including the correct target first.
  vi.spyOn(Math, "random").mockReturnValue(random);
  render_();
  await screen.findByText(/Score/);
  expect(targets().every((t) => t.disabled)).toBe(true);

  const selected = words().find((button) => button.textContent === word);
  const correct = targets().find((button) => button.textContent === opposite);
  fireEvent.click(selected);
  expect(selected.getAttribute("aria-pressed")).toBe("true");

  for (const [index, wrongWord] of ["dry", "rainy"].entries()) {
    const wrong = targets().find((button) => button.textContent === wrongWord);
    fireEvent.click(wrong);
    expect(score()).toBe(`Score: 0 / ${index + 1}`);
    expect(selected.disabled).toBe(false);
    expect(selected.getAttribute("aria-pressed")).toBe("true");
  }

  fireEvent.click(correct);
  expect(score()).toBe("Score: 1 / 3");
  expect(selected.disabled).toBe(true);
  expect(selected.getAttribute("aria-pressed")).toBe("false");
  expect(targets().every((target) => target.disabled)).toBe(true);

  fireEvent.click(correct);
  expect(score()).toBe("Score: 1 / 3");
});
