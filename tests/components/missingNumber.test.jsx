import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import FindTheMissingNumber from "../../src/pages/skills/math/FindTheMissingNumber";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

const setup = () => render(<MemoryRouter><FindTheMissingNumber /></MemoryRouter>);

it("offers every step from 1 to 12 and previews the chosen one", () => {
  setup();
  expect(document.querySelectorAll(".mn-steps .free-play-level")).toHaveLength(12);
  expect(screen.getByRole("button", { name: "2" }).getAttribute("aria-pressed")).toBe("true");
  fireEvent.click(screen.getByRole("button", { name: "12" }));
  expect(screen.getByRole("button", { name: "12" }).getAttribute("aria-pressed")).toBe("true");
  expect(document.querySelector(".mn-example").textContent).toBe("Counting by 12: 12, 24, 36, 48, …");
});

it("plays a question and reveals the missing number", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Start Practice" }));
  expect(document.querySelectorAll(".mn-tile")).toHaveLength(4);
  expect(document.querySelectorAll(".mn-tile.is-missing")).toHaveLength(1);
  const options = screen.getAllByRole("button").filter((b) => b.classList.contains("mn-option"));
  expect(options).toHaveLength(4);
  fireEvent.click(options[0]);
  expect(document.querySelector(".mn-option.is-correct")).not.toBeNull();
  expect(document.querySelector(".mn-tile.is-revealed")).not.toBeNull();
});
