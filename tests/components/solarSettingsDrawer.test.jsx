import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import SolarSettingsDrawer from "../../src/pages/skills/geography/SolarSettingsDrawer";
import { DEFAULT_VIEW_SETTINGS } from "../../src/pages/skills/geography/solarViewSettings";

function setup(props = {}) {
  const onChange = vi.fn();
  const onOpenChange = vi.fn();
  const { rerender } = render(<SolarSettingsDrawer settings={DEFAULT_VIEW_SETTINGS} onChange={onChange} open onOpenChange={onOpenChange} {...props} />);
  return { onChange, onOpenChange, rerender };
}

it("is closed by default and shows only the trigger", () => {
  setup({ open: false });
  const trigger = screen.getByRole("button", { name: "My view settings" });
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryAllByRole("switch")).toHaveLength(0);
});

it("trigger asks to open", async () => {
  const { onOpenChange } = setup({ open: false });
  await userEvent.click(screen.getByRole("button", { name: "My view settings" }));
  expect(onOpenChange).toHaveBeenCalledWith(true);
});

it("shows all view switches with the right state and focuses the first", () => {
  setup();
  const state = Object.fromEntries(screen.getAllByRole("switch").map((s) => [s.querySelector(".solar-settings__label").textContent, s.getAttribute("aria-checked")]));
  expect(state).toEqual({ "Orbit lines": "true", "Planet names": "true", "Moon names": "false", "Planet tilt": "true", "Galaxy background": "true", "Sun glow": "true", "Asteroid belt": "true", "Milky Way sky": "false", "Constellations": "false" });
  expect(document.activeElement).toBe(screen.getByRole("switch", { name: /Orbit lines/ }));
  expect(screen.getByRole("region", { name: "My view" })).toBeTruthy();
});

it("clicking a switch calls onChange with the flipped value", async () => {
  const { onChange } = setup();
  await userEvent.click(screen.getByRole("switch", { name: /Moon names/ }));
  expect(onChange).toHaveBeenCalledWith("showMoonLabels", true);
  await userEvent.click(screen.getByRole("switch", { name: /Orbit lines/ }));
  expect(onChange).toHaveBeenCalledWith("showOrbits", false);
});

it("Escape and the close button ask to close", async () => {
  const { onOpenChange } = setup();
  await userEvent.keyboard("{Escape}");
  expect(onOpenChange).toHaveBeenCalledWith(false);
  onOpenChange.mockClear();
  await userEvent.click(screen.getByRole("button", { name: "Close my view settings" }));
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

it("speed buttons show the current preset and ask for a new one", async () => {
  const onSpeedChange = vi.fn();
  setup({ speed: "slow", onSpeedChange });
  const group = screen.getByRole("group", { name: "Planet speed" });
  const pressed = [...group.querySelectorAll("button")].map((b) => [b.textContent.trim(), b.getAttribute("aria-pressed")]);
  expect(pressed).toEqual([["⏸Stop", "false"], ["🐢Slow", "true"], ["🐇Fast", "false"]]);
  await userEvent.click(screen.getByRole("button", { name: "Fast" }));
  expect(onSpeedChange).toHaveBeenCalledWith("fast");
});

it("leaves out the speed row when no handler is given", () => {
  setup();
  expect(screen.queryByRole("group", { name: "Planet speed" })).toBeNull();
});

it("offers Reset Solar System only when given a handler, and calls it", async () => {
  setup();
  expect(screen.queryByRole("button", { name: /Reset Solar System/ })).toBeNull();
  const onReset = vi.fn();
  document.body.innerHTML = "";
  setup({ onReset });
  await userEvent.click(screen.getByRole("button", { name: /Reset Solar System/ }));
  expect(onReset).toHaveBeenCalledTimes(1);
});

it("constellation brightness appears only while constellations are on", async () => {
  const { onChange, rerender } = setup();
  expect(screen.queryByRole("group", { name: "Constellation brightness" })).toBeNull();
  await userEvent.click(screen.getByRole("switch", { name: /Constellations/ }));
  expect(onChange).toHaveBeenCalledWith("constellations", true);
  rerender(<SolarSettingsDrawer settings={{ ...DEFAULT_VIEW_SETTINGS, constellations: true }} onChange={onChange} open onOpenChange={() => {}} />);
  expect(screen.getByRole("group", { name: "Constellation brightness" })).toBeTruthy();
});

it("brightness buttons show the current level and ask for a new one", async () => {
  const { onChange } = setup({ settings: { ...DEFAULT_VIEW_SETTINGS, constellations: true } });
  const group = screen.getByRole("group", { name: "Constellation brightness" });
  const pressed = [...group.querySelectorAll("button")].map((b) => [b.textContent.trim(), b.getAttribute("aria-pressed")]);
  expect(pressed).toEqual([["Faint", "false"], ["Bright", "true"], ["Brightest", "false"]]);
  await userEvent.click(screen.getByRole("button", { name: "Brightest" }));
  expect(onChange).toHaveBeenCalledWith("constellationBrightness", "brightest");
});

it.each([
  ["Planet tilt", "enableTilt"], ["Galaxy background", "skyVisible"],
  ["Sun glow", "sunGlow"], ["Asteroid belt", "asteroidBelt"],
])("%s switches off and reflects the updated scene preference", async (label, key) => {
  const { onChange, rerender } = setup();
  await userEvent.click(screen.getByRole("switch", { name: new RegExp(label) }));
  expect(onChange).toHaveBeenCalledWith(key, false);
  rerender(<SolarSettingsDrawer settings={{ ...DEFAULT_VIEW_SETTINGS, [key]: false }} onChange={onChange} open onOpenChange={() => {}} />);
  expect(screen.getByRole("switch", { name: new RegExp(label) }).getAttribute("aria-checked")).toBe("false");
});
it("Bloom remains a debug-only switch with its own callback", async () => {
  const { rerender, onChange } = setup();
  expect(screen.queryByRole("switch", { name: /Bloom/ })).toBeNull();
  const onBloomChange = vi.fn();
  rerender(<SolarSettingsDrawer settings={DEFAULT_VIEW_SETTINGS} onChange={onChange} open onOpenChange={() => {}} bloom={false} onBloomChange={onBloomChange} />);
  await userEvent.click(screen.getByRole("switch", { name: /Bloom/ }));
  expect(onBloomChange).toHaveBeenCalledWith(true);
  expect(onChange).not.toHaveBeenCalled();
});
