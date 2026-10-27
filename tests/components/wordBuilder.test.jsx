import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import WordBuilder from "../../src/pages/skills/english/WordBuilder";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><WordBuilder /></MemoryRouter>);
const options = () => [...document.querySelectorAll(".wb-option")];
const prompt = () => document.querySelector(".free-play-prompt")?.textContent;

it("a wrong choice is crossed out, the right one locks and moves on", () => {
  vi.useFakeTimers();
  game();
  const first = prompt();
  expect(options().length).toBeGreaterThanOrEqual(2);

  fireEvent.click(options()[0]);
  const right = options().find((o) => o.classList.contains("is-right"));
  if (!right) {
    expect(options()[0].classList.contains("is-wrong")).toBe(true);
    expect(options()[0].disabled).toBe(true);
    for (const o of options()) if (!o.disabled) { fireEvent.click(o); if (o.classList.contains("is-right")) break; }
  }
  expect(options().filter((o) => o.classList.contains("is-right"))).toHaveLength(1);
  expect(options().every((o) => o.disabled)).toBe(true);
  act(() => vi.advanceTimersByTime(2000));
  expect(options().every((o) => !o.classList.contains("is-right"))).toBe(true);
  expect(first).toBeTruthy();
});

it("changing level starts a fresh question", () => {
  game();
  for (const name of ["Harder", "Medium", "Easier"]) {
    fireEvent.click(screen.getByRole("button", { name: new RegExp(name) }));
    expect(options().every((o) => !o.disabled && !o.classList.contains("is-wrong"))).toBe(true);
  }
});
