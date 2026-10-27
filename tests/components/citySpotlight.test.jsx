import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import cities from "../../src/data/cities.json";
import CitySpotlight from "../../src/pages/skills/geography/CitySpotlight";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

const feedback = () => document.querySelector(".free-play-feedback");

it("has at least 50 cities, each with a picture, a hint and a unique name", () => {
  expect(cities.length).toBeGreaterThanOrEqual(50);
  expect(new Set(cities.map((c) => c.name)).size).toBe(cities.length);
  expect(cities.every((c) => c.image && c.hint)).toBe(true);
});

const shown = () => cities.find((c) => c.image === document.querySelector(".cityImage").getAttribute("src"));
const pick = (name) => fireEvent.click(screen.getByRole("button", { name }));
const text = () => document.querySelector(".score").textContent;

it("clears the cheer when the next picture appears", () => {
  vi.useFakeTimers();
  render(<CitySpotlight />);
  fireEvent.click(screen.getByText("Start Game"));

  const first = shown();
  pick(first.name);
  expect(feedback().textContent).not.toBe("");

  act(() => vi.advanceTimersByTime(1600));
  expect(shown().name).not.toBe(first.name);
  expect(feedback().textContent).toBe("");
});

it("plays every city, scores each answer and finishes", () => {
  vi.useFakeTimers();
  render(<CitySpotlight />);
  fireEvent.click(screen.getByText("Start Game"));
  expect(text()).toBe("Score: 0 / 0");

  const seen = new Set();
  for (let i = 0; i < cities.length; i++) {
    const city = shown();
    seen.add(city.name);
    pick(i % 2 === 0 ? city.name : screen.getAllByRole("button").find((b) => b.className.includes("optionBtn") && b.textContent !== city.name).textContent);
    act(() => vi.advanceTimersByTime(1600));
  }
  expect(seen.size).toBe(cities.length);
  expect(screen.getByText(/Finished/)).toBeTruthy();
  expect(text()).toBe(`Score: ${Math.ceil(cities.length / 2)} / ${cities.length}`);
});

it("does not name the city in the picture's alt text", () => {
  render(<CitySpotlight />);
  fireEvent.click(screen.getByText("Start Game"));
  expect(document.querySelector(".cityImage").alt).not.toContain(shown().name);
});
