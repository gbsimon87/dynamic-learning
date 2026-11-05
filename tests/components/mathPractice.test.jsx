import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import MathPractice from "../../src/pages/skills/math/MathPractice";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

const setup = () => render(<MemoryRouter><MathPractice /></MemoryRouter>);
const readout = () => document.querySelector(".ap-readout").textContent;
const smallest = () => screen.getByLabelText("Smallest number");
const biggest = () => screen.getByLabelText("Biggest number");

it("starts on addition, 2 numbers, 1 to 10", () => {
  setup();
  expect(screen.getByRole("checkbox", { name: /Addition/ }).checked).toBe(true);
  expect(screen.getByRole("button", { name: "2" }).getAttribute("aria-pressed")).toBe("true");
  expect(readout()).toBe("From 1 to 10");
});

it("quick choices set the number range", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Up to 50" }));
  expect(readout()).toBe("From 1 to 50");
  expect(screen.getByRole("button", { name: "Up to 50" }).getAttribute("aria-pressed")).toBe("true");
  expect(biggest().value).toBe("50");
});

it("the two thumbs never cross: moving one pushes the other", () => {
  setup();
  fireEvent.change(smallest(), { target: { value: "30" } });
  expect(readout()).toBe("From 30 to 30");
  fireEvent.change(biggest(), { target: { value: "5" } });
  expect(readout()).toBe("From 5 to 5");
});

it("keeps one operation on, and only offers mixing with two or more", () => {
  setup();
  const add = screen.getByRole("checkbox", { name: /Addition/ });
  const mix = screen.getByRole("checkbox", { name: /Mix operations/ });
  fireEvent.click(add);
  expect(add.checked).toBe(true);
  expect(mix.disabled).toBe(true);
  fireEvent.click(screen.getByRole("checkbox", { name: /Division/ }));
  expect(mix.disabled).toBe(false);
});

it("Start Practice shows a question; Change settings returns to setup", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Start Practice" }));
  expect(document.querySelector(".ap-question-text").textContent).toMatch(/= \?$/);
  expect(document.querySelectorAll(".ap-option").length).toBeGreaterThan(1);
  fireEvent.click(screen.getByRole("button", { name: "Change settings" }));
  expect(readout()).toBe("From 1 to 10");
});
