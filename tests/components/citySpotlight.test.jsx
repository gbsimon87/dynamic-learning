import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import cities from "../../src/data/cities.json";
import CitySpotlight from "../../src/pages/skills/geography/CitySpotlight";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const game = () => render(<MemoryRouter><CitySpotlight /></MemoryRouter>);
const feedback = () => document.querySelector(".free-play-feedback");
const options = () => [...document.querySelectorAll(".cs-option")];
const shown = () => cities.find((c) => c.image === document.querySelector(".cs-image").getAttribute("src"));
const pick = (name) => fireEvent.click(options().find((b) => b.textContent.replace("✓", "").trim() === name));

it("opens straight on a picture and its choices, with no start screen", () => {
  game();
  expect(screen.queryByText("Start Game")).toBeNull();
  expect(document.querySelector(".cs-image")).toBeTruthy();
  expect(options()).toHaveLength(3); // Easier: three cities
  expect(options().map((b) => b.textContent)).toContain(shown().name);
  expect(document.querySelector(".cs-clue").textContent).toBe(shown().hint);
});

it("a wrong city greys out and can be retried; the right one moves on to a new picture", () => {
  vi.useFakeTimers();
  game();
  const first = shown();

  const wrong = options().find((b) => b.textContent !== first.name);
  fireEvent.click(wrong);
  expect(wrong.disabled).toBe(true);
  expect(wrong.className).toContain("is-wrong");
  expect(options().filter((b) => !b.disabled)).toHaveLength(2);

  pick(first.name);
  expect(options().find((b) => b.textContent.startsWith(first.name)).className).toContain("is-correct");
  expect(feedback().textContent).not.toBe("");

  act(() => vi.advanceTimersByTime(1700));
  expect(shown().name).not.toBe(first.name);
  expect(feedback().textContent).toBe("");
  expect(options().every((b) => !b.disabled && !b.className.includes("is-"))).toBe(true);
});

it("a harder level offers more cities and starts a fresh question", () => {
  game();
  fireEvent.click(screen.getByRole("button", { name: /Harder/ }));
  expect(options()).toHaveLength(6);
  fireEvent.click(screen.getByRole("button", { name: /Medium/ }));
  expect(options()).toHaveLength(4);
});

it("does not name the city in the picture's alt text", () => {
  game();
  expect(document.querySelector(".cs-image").alt).not.toContain(shown().name);
});
