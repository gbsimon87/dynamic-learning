import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import ReadingNumbers from "../../src/pages/skills/math/ReadingNumbers";
import { numberWords } from "../../src/data/freePlay/readingNumbers";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () =>
  render(
    <MemoryRouter>
      <ReadingNumbers />
    </MemoryRouter>
  );
const mode = (name) => fireEvent.click(screen.getByRole("button", { name: new RegExp(name) }));
const feedback = () => document.querySelector(".free-play-feedback")?.textContent ?? "";
const tiles = () => [...document.querySelectorAll(".rn-tile")];
const click = (name) => fireEvent.click(screen.getByRole("button", { name }));

it("mixed: wrong tiles are crossed out and stay, the right one moves the game on", () => {
  vi.useFakeTimers();
  game();
  expect(tiles()).toHaveLength(4);

  const wrongSoFar = [];
  for (const tile of tiles()) {
    fireEvent.click(tile);
    if (tile.classList.contains("is-right")) break;
    expect(tile.classList.contains("is-wrong")).toBe(true);
    expect(tile.disabled).toBe(true);
    expect(feedback()).toContain("↻");
    wrongSoFar.push(tile);
  }
  expect(tiles().filter((t) => t.classList.contains("is-right"))).toHaveLength(1);
  expect(wrongSoFar.length).toBeLessThan(4);

  // Once right, the other tiles are locked until the next question arrives.
  expect(tiles().every((t) => t.disabled)).toBe(true);
  act(() => vi.advanceTimersByTime(2000));
  expect(tiles().every((t) => !t.disabled && !t.classList.contains("is-right"))).toBe(true);
});

it("mixed never deals a listening question when the device has no voice", () => {
  game();
  for (let i = 0; i < 40; i += 1) {
    mode("Build");
    mode("Mixed");
    expect(document.querySelector(".rn-card-hear")).toBeNull();
  }
});

it("build: dials wrap, show what is built, and accept the number in the words", () => {
  vi.useFakeTimers();
  game();
  mode("Build");
  const digits = () => [...document.querySelectorAll(".rn-dial-digit")].map((el) => el.textContent);
  expect(digits()).toEqual(["0", "0"]);

  click(/Fewer ones/);
  expect(digits()).toEqual(["0", "9"]);
  click(/More ones/);
  expect(digits()).toEqual(["0", "0"]);
  expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);

  // A wrong number is not accepted.
  click(/More ones/);
  const words = document.querySelector(".rn-card-words").textContent;
  const target = Array.from({ length: 20 }, (_, i) => i + 1).find((n) => numberWords(n) === words);
  const wrongFirst = target === 1 ? 2 : 1;
  for (let i = 1; i < wrongFirst; i += 1) click(/More ones/);
  click("Check my answer");
  expect(feedback()).toContain("↻");
  expect(document.querySelector(".free-play-prompt").textContent).toBe("Build this number with the dials.");

  // Now build it properly: tens, then ones.
  const [tens, ones] = [Math.floor(target / 10), target % 10];
  const dialValue = () => Number(digits().join(""));
  while (dialValue() !== tens * 10 + ones) {
    const current = digits().map(Number);
    if (current[0] !== tens) click(/More tens/);
    else click(/More ones/);
  }
  click("Check my answer");
  expect(feedback()).not.toContain("↻");
  expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
  act(() => vi.advanceTimersByTime(2000));
  expect(digits()).toEqual(["0", "0"]); // a new question starts with fresh dials
});

it("switching mode starts a fresh game and the chosen range survives", () => {
  game();
  click("🌳 To 1,000");
  mode("Explore");
  expect(screen.getByRole("button", { name: "🌳 To 1,000" }).getAttribute("aria-pressed")).toBe("true");
  expect(document.querySelectorAll(".rn-dial")).toHaveLength(4);
  mode("Mixed");
  expect(screen.getByRole("button", { name: "🌳 To 1,000" }).getAttribute("aria-pressed")).toBe("true");
  expect(tiles()).toHaveLength(4);
});

it("explore: a dial rewrites the number and its words, and Test me starts a round", () => {
  game();
  mode("Explore");
  const dials = screen.getByRole("group", { name: "Digit dials" });
  const readout = () => document.querySelector(".rn-card-number").textContent;
  const before = readout();

  fireEvent.click(within(dials).getByRole("button", { name: /More ones/ }));
  expect(readout()).not.toBe(before);
  expect(document.querySelector(".rn-parts").textContent.length).toBeGreaterThan(0);
  expect(document.querySelector(".rn-explore-words .rn-card-words").textContent.length).toBeGreaterThan(0);

  click(/Test me/);
  expect(tiles()).toHaveLength(4);
});
