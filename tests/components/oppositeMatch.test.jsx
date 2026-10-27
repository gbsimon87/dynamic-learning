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
  render_();
  await screen.findByText(/Score/);
  expect(targets().every((t) => t.disabled)).toBe(true);

  const first = words()[0];
  fireEvent.click(first);
  expect(first.getAttribute("aria-pressed")).toBe("true");

  const wrong = targets()[0];
  fireEvent.click(wrong);
  fireEvent.click(targets()[1]);
  expect(score()).toMatch(/\/ 2$/);

  let matched = 0;
  for (const t of targets()) {
    if (t.disabled) continue;
    fireEvent.click(t);
    if (first.disabled) { matched = 1; break; }
  }
  expect(matched).toBe(1);
  expect(score()).toMatch(/^Score: 1 /);
});
