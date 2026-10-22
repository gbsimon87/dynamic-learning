import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

vi.mock("../../src/utils/speech", () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock("../../src/components/celebration/sound/player", async (orig) => ({ ...(await orig()), isMuted: vi.fn(() => false) }));

import PlanetPlayCard from "../../src/pages/skills/geography/PlanetPlayCard";
import { speak, stopNarration } from "../../src/utils/speech";
import { isMuted } from "../../src/components/celebration/sound/player";

beforeEach(() => {
  vi.clearAllMocks();
  isMuted.mockReturnValue(false);
});

it("renders nothing for a body with no games", () => {
  const { container } = render(<PlanetPlayCard bodyName="Phobos" />);
  expect(container.firstChild).toBeNull();
});

it("shows only the weight game for Earth's Moon", () => {
  render(<PlanetPlayCard bodyName="Moon" />);
  expect(screen.queryByRole("button", { name: /How old would I be/ })).toBeNull();
  expect(screen.getByRole("button", { name: /How heavy would Bix be/ })).toBeTruthy();
});

it("picking 7 on Mars says 3 and reads it aloud", async () => {
  render(<PlanetPlayCard bodyName="Mars" />);
  await userEvent.click(screen.getByRole("button", { name: /How old would I be/ }));
  expect(screen.getByRole("group", { name: "How old are you?" })).toBeTruthy();
  await userEvent.click(screen.getByRole("button", { name: "7" }));
  expect(screen.getByText("On Mars you'd be 3!")).toBeTruthy();
  expect(screen.getByText("A year on Mars is 1.9 Earth years long.")).toBeTruthy();
  expect(speak).toHaveBeenCalledWith("On Mars you'd be 3!");
  await userEvent.click(screen.getByRole("button", { name: "Pick another age" }));
  expect(screen.getByRole("button", { name: "4" })).toBeTruthy();
});

it("Jupiter's weight mentions cloud tops, and only one panel is open", async () => {
  render(<PlanetPlayCard bodyName="Jupiter" />);
  await userEvent.click(screen.getByRole("button", { name: /How old would I be/ }));
  await userEvent.click(screen.getByRole("button", { name: /How heavy would Bix be/ }));
  expect(screen.getByText(/cloud tops, Bix would weigh 51 kg/)).toBeTruthy();
  expect(screen.getByText("Earth: 20 kg")).toBeTruthy();
  expect(screen.queryByRole("group", { name: "How old are you?" })).toBeNull();
});

it("resets when the body changes", async () => {
  const { rerender } = render(<PlanetPlayCard bodyName="Mars" />);
  await userEvent.click(screen.getByRole("button", { name: /How old would I be/ }));
  await userEvent.click(screen.getByRole("button", { name: "7" }));
  rerender(<PlanetPlayCard bodyName="Venus" />);
  expect(screen.queryByText(/you'd be/)).toBeNull();
  expect(screen.getByRole("button", { name: /How old would I be/ }).getAttribute("aria-expanded")).toBe("false");
});

it("stays quiet when sound is off", async () => {
  isMuted.mockReturnValue(true);
  render(<PlanetPlayCard bodyName="Mars" />);
  await userEvent.click(screen.getByRole("button", { name: /How heavy would Bix be/ }));
  expect(screen.getByText("On Mars, Bix would weigh 8 kg.")).toBeTruthy();
  expect(speak).not.toHaveBeenCalled();
});

it("stops narration on unmount", () => {
  const { unmount } = render(<PlanetPlayCard bodyName="Mars" />);
  unmount();
  expect(stopNarration).toHaveBeenCalled();
});

it("offers the line-up by size only when asked to, and opens it", async () => {
  const onLineUp = vi.fn();
  const { rerender } = render(<PlanetPlayCard bodyName="Earth" />);
  expect(screen.queryByRole("button", { name: /How big is it really/ })).toBeNull();
  rerender(<PlanetPlayCard bodyName="Earth" onLineUp={onLineUp} />);
  await userEvent.click(screen.getByRole("button", { name: /How big is it really/ }));
  expect(onLineUp).toHaveBeenCalledTimes(1);
});
