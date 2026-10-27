import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { ThemeContext } from "../../src/context/theme-context";
import SentenceBuilder from "../../src/pages/skills/english/SentenceBuilder";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const start = () => {
  render(<ThemeContext.Provider value={{ theme: "light" }}><MemoryRouter><SentenceBuilder /></MemoryRouter></ThemeContext.Provider>);
  fireEvent.click(screen.getByText("Start"));
};
const bank = () => [...document.querySelectorAll(".word-bank .word-chip")];
const built = () => [...document.querySelectorAll(".sentence-area .word-chip")];
const check = () => screen.getByText("Check");

it("tapping a word moves it into the sentence, tapping it again takes it back", () => {
  start();
  const total = bank().length;
  const word = bank()[0].textContent;
  fireEvent.click(bank()[0]);
  expect(built().map((b) => b.textContent)).toEqual([word]);
  expect(bank()).toHaveLength(total - 1);
  fireEvent.click(built()[0]);
  expect(built()).toHaveLength(0);
  expect(bank()).toHaveLength(total);
});

it("Check unlocks once every word is placed and marks the sentence", () => {
  vi.useFakeTimers();
  start();
  expect(check().disabled).toBe(true);
  while (bank().length) fireEvent.click(bank()[0]);
  expect(check().disabled).toBe(false);
  fireEvent.click(check());
  expect(built().every((b) => b.disabled)).toBe(true);
  act(() => vi.advanceTimersByTime(2000));
  expect(built()).toHaveLength(0);
});
