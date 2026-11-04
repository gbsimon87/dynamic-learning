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

it("tap a word then its opposite to match; a wrong tap scores nothing", async () => {
  // Keep warm/cool in the round; choose targets by meaning, not shuffled position.
  vi.spyOn(Math, "random").mockReturnValue(0);
  render_();
  await screen.findByText(/Score/);
  expect(targets().every((t) => t.disabled)).toBe(true);

  const first = words().find((word) => word.textContent === "warm");
  fireEvent.click(first);
  expect(first.getAttribute("aria-pressed")).toBe("true");

  fireEvent.click(screen.getByRole("button", { name: "dry", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "rainy", exact: true }));
  expect(score()).toBe("Score: 0 / 2");
  expect(first.disabled).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "cool", exact: true }));
  expect(first.disabled).toBe(true);
  expect(score()).toBe("Score: 1 / 3");
});
