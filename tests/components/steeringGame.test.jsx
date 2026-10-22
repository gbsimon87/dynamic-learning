import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

const game = vi.hoisted(() => ({
  setStyle: vi.fn(),
  newRound: vi.fn(),
  goAgain: vi.fn(),
  setThrust: vi.fn(),
  setStick: vi.fn(),
  tap: vi.fn(),
  resize: vi.fn(),
  getState: vi.fn(),
  resultsText: vi.fn(() => "Steering playtest"),
  dispose: vi.fn(),
}));
let onChange;

vi.mock("../../src/pages/skills/geography/steeringFlight.js", () => ({
  createSteeringGame: vi.fn((options) => {
    onChange = options.onChange;
    return game;
  }),
}));

import SteeringGame from "../../src/pages/skills/geography/SteeringGame.jsx";

const state = (style = "A") => ({
  style,
  target: { name: "RED", hex: 0xff4d4d, css: "#ff4d4d" },
  done: false,
  progress: { done: 0, total: 5 },
  toast: null,
  notes: { A: { rows: [], doneCount: 0, doneSeconds: 0 }, B: { rows: [], doneCount: 0, doneSeconds: 0 } },
});

beforeEach(() => {
  vi.clearAllMocks();
  game.getState.mockReturnValue(state());
});

it("shows the style buttons, target, joystick and GO!", () => {
  render(<SteeringGame onClose={vi.fn()} />);
  expect(screen.getByRole("button", { name: "A: Joystick" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByRole("button", { name: "B: Tap to go" }).getAttribute("aria-pressed")).toBe("false");
  expect(screen.getByText("Fly to the RED planet!")).toBeTruthy();
  expect(screen.getByRole("group", { name: "Joystick" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Thrust" })).toBeTruthy();
});

it("Back and Escape both call onClose", async () => {
  const onClose = vi.fn();
  render(<SteeringGame onClose={onClose} />);
  await userEvent.click(screen.getByRole("button", { name: /Back/ }));
  expect(onClose).toHaveBeenCalledTimes(1);
  await userEvent.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalledTimes(2);
});

it("switching to B tells the game and hides the joystick and GO!", async () => {
  game.setStyle.mockImplementation((st) => onChange(state(st)));
  render(<SteeringGame onClose={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: "B: Tap to go" }));
  expect(game.setStyle).toHaveBeenCalledWith("B");
  expect(screen.queryByRole("group", { name: "Joystick" })).toBeNull();
  expect(screen.queryByRole("button", { name: "Thrust" })).toBeNull();
  expect(screen.getByText(/Tap a planet/)).toBeTruthy();
});

it("Notes opens the panel with the buttons", async () => {
  render(<SteeringGame onClose={vi.fn()} />);
  const notes = screen.getByRole("button", { name: "Notes" });
  expect(notes.getAttribute("aria-expanded")).toBe("false");
  await userEvent.click(notes);
  expect(notes.getAttribute("aria-expanded")).toBe("true");
  expect(screen.getByText("Notes for the grown-up")).toBeTruthy();
  await userEvent.click(screen.getByRole("button", { name: "New round" }));
  expect(game.newRound).toHaveBeenCalled();
});

it("Copy results asks the game for its summary text", async () => {
  render(<SteeringGame onClose={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: "Notes" }));
  await userEvent.click(screen.getByRole("button", { name: "Copy results" }));
  expect(game.resultsText).toHaveBeenCalled();
});

it("finishing shows Go again, and disposing happens on unmount", async () => {
  game.getState.mockReturnValue({ ...state(), target: null, done: true });
  const { unmount } = render(<SteeringGame onClose={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: "Go again" }));
  expect(game.goAgain).toHaveBeenCalled();
  unmount();
  expect(game.dispose).toHaveBeenCalled();
});
