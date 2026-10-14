import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import TimeSetter from "../../src/components/challenge/TimeSetter";
import { useState } from "react";

const modules = import.meta.glob(
  "../../src/pages/skills/math/challenges/year2/{comparing-measurements,measuring-length-and-height,measuring-temperature,measuring-time,measuring-weight-and-volume,money-problems,standard-units-of-money}/*.jsx",
  { eager: true }
);

it("all 28 Measurement challenges mount with a question and a Check button", () => {
  const entries = Object.entries(modules);
  expect(entries).toHaveLength(28);
  for (const [path, mod] of entries) {
    const Challenge = mod.default;
    const { unmount, container } = render(<MemoryRouter><Challenge onComplete={() => {}} /></MemoryRouter>);
    expect(screen.getByRole("button", { name: "Check my answer" }), path).toBeTruthy();
    if (path.includes("measuring-temperature")) {
      // The −5 / +5 step buttons are controls, not temperatures.
      const shown = container.cloneNode(true);
      shown.querySelectorAll(".scale-step-btn").forEach((b) => b.remove());
      expect(shown.textContent, path).not.toMatch(/[-−]\d/);
    }
    unmount();
  }
});

function CarryHarness() {
  const [time, setTime] = useState({ hour: 12, minute: 0 });
  return (
    <>
      <p data-testid="time">{`${time.hour}:${time.minute}`}</p>
      <TimeSetter hour={time.hour} minute={time.minute} onChange={setTime} carryHour />
    </>
  );
}

it("with carryHour, quarter to 3 is set as 3 o'clock then the long hand back", () => {
  render(<CarryHarness />);
  for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByRole("button", { name: "Hour forward" }));
  expect(screen.getByTestId("time").textContent).toBe("3:0");
  for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByRole("button", { name: "5 minutes back" }));
  expect(screen.getByTestId("time").textContent).toBe("2:45");
  for (let i = 0; i < 3; i += 1) fireEvent.click(screen.getByRole("button", { name: "5 minutes forward" }));
  expect(screen.getByTestId("time").textContent).toBe("3:0");
});
