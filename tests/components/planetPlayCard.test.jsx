import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

vi.mock("../../src/utils/speech", () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock("../../src/components/celebration/sound/player", async (orig) => ({ ...(await orig()), isMuted: vi.fn(() => false) }));

import PlanetPlayCard from "../../src/pages/skills/geography/PlanetPlayCard";
import { PLANET_PLAY } from "../../src/pages/skills/geography/planetPlay";

// The card reads a body's play numbers; these are home's bodies.
const home = (name) => ({ name, play: PLANET_PLAY[name], isHome: name === "Earth" });
import { speak, stopNarrationOf } from "../../src/utils/speech";
import { isMuted } from "../../src/components/celebration/sound/player";

beforeEach(() => {
  vi.clearAllMocks();
  isMuted.mockReturnValue(false);
});

it("renders nothing for a body with no games", () => {
  const { container } = render(<PlanetPlayCard {...home("Phobos")} />);
  expect(container.firstChild).toBeNull();
});

it("shows only the weight game for Earth's Moon", () => {
  render(<PlanetPlayCard {...home("Moon")} />);
  expect(screen.queryByRole("option", { name: /space birthday/ })).toBeNull();
  expect(screen.getByRole("option", { name: /Bix on the scales/ })).toBeTruthy();
});

it("picking 7 on Mars says 3 and reads it aloud", async () => {
  render(<PlanetPlayCard {...home("Mars")} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "age");
  expect(screen.getByRole("group", { name: "How old are you?" })).toBeTruthy();
  await userEvent.click(screen.getByRole("button", { name: "7" }));
  expect(screen.getByText("On Mars you'd be 3!")).toBeTruthy();
  expect(screen.getByText("A year on Mars is 1.9 Earth years long.")).toBeTruthy();
  expect(speak).toHaveBeenCalledWith("On Mars you'd be 3!");
  await userEvent.click(screen.getByRole("button", { name: "Pick another age" }));
  expect(screen.getByRole("button", { name: "4" })).toBeTruthy();
});

it("Jupiter's weight mentions cloud tops, and only one panel is open", async () => {
  render(<PlanetPlayCard {...home("Jupiter")} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "age");
  await userEvent.selectOptions(screen.getByRole("combobox"), "weight");
  expect(screen.getByText(/cloud tops, Bix would weigh 51 kg/)).toBeTruthy();
  expect(screen.getByText("Earth: 20 kg")).toBeTruthy();
  expect(screen.queryByRole("group", { name: "How old are you?" })).toBeNull();
});

it("resets when the body changes", async () => {
  const { rerender } = render(<PlanetPlayCard {...home("Mars")} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "age");
  await userEvent.click(screen.getByRole("button", { name: "7" }));
  rerender(<PlanetPlayCard {...home("Venus")} />);
  expect(screen.queryByText(/you'd be/)).toBeNull();
  expect(screen.getByRole("combobox").value).toBe("");
});

it("stays quiet when sound is off", async () => {
  isMuted.mockReturnValue(true);
  render(<PlanetPlayCard {...home("Mars")} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "weight");
  expect(screen.getByText("On Mars, Bix would weigh 8 kg.")).toBeTruthy();
  expect(speak).not.toHaveBeenCalled();
});

it("on unmount stops only its own sentence, so it cannot cut off the line that closed it", async () => {
  const { unmount } = render(<PlanetPlayCard {...home("Mars")} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "weight");
  unmount();
  expect(stopNarrationOf).toHaveBeenCalledWith("On Mars, Bix would weigh 8 kg.");
});

it("on unmount without having spoken, stops nothing", () => {
  const { unmount } = render(<PlanetPlayCard {...home("Mars")} />);
  unmount();
  expect(stopNarrationOf).toHaveBeenCalledWith(null);
});

it("offers the line-up by size only when asked to, and opens it", async () => {
  const onLineUp = vi.fn();
  const { rerender } = render(<PlanetPlayCard {...home("Earth")} />);
  expect(screen.queryByRole("option", { name: /Compare planet sizes/ })).toBeNull();
  rerender(<PlanetPlayCard {...home("Earth")} onLineUp={onLineUp} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "size");
  expect(onLineUp).toHaveBeenCalledTimes(1);
});

it("TRAPPIST-1 b: a 7-year-old would be 1692, with the year in Earth days", async () => {
  render(<PlanetPlayCard name="TRAPPIST-1 b" play={{ yearInEarthYears: 1.51088 / 365.25, gravity: 1.1, hasSurface: true }} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "age");
  await userEvent.click(screen.getByRole("button", { name: "7" }));
  expect(screen.getByText("On TRAPPIST-1 b you'd be 1692!")).toBeTruthy();
  expect(screen.getByText("A year on TRAPPIST-1 b is 1.5 Earth days long.")).toBeTruthy();
  await userEvent.selectOptions(screen.getByRole("combobox"), "weight");
  expect(screen.getByText("On TRAPPIST-1 b, Bix would weigh 22 kg.")).toBeTruthy();
  expect(screen.getByText("Earth: 20 kg")).toBeTruthy();
});
