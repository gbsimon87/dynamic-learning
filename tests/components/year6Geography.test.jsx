import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import Year6GeographyGame from "../../src/pages/skills/geography/challenges/year6/Year6GeographyGame";
import { YEAR6_GEOGRAPHY_BUILDERS } from "../../src/data/challenges/geography/year6";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const show = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
const modules = import.meta.glob("../../src/pages/skills/geography/challenges/year6/*/*Challenge*.jsx", { eager: true });

it("opens all 64 Year 6 Geography wrappers with illustrated field notes", () => {
  expect(Object.keys(modules)).toHaveLength(64);
  for (const { default: Challenge } of Object.values(modules)) {
    const { unmount } = show(<Challenge onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's field notes" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    unmount();
  }
}, 30000);

it("retries a wrong answer, gives a hint and completes a Year 6 Geography run", async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.375);
  const build = YEAR6_GEOGRAPHY_BUILDERS["managing-rivers"];
  for (const level of [1, 2, 3, 4]) {
    document.body.classList.toggle("dark", level % 2 === 0);
    const done = vi.fn();
    const expected = build(level, () => 0.375).questions;
    const { unmount } = show(<Year6GeographyGame topicId="managing-rivers" level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
    for (const [index, question] of expected.entries()) {
      if (index === 0) {
        const wrong = question.options.find((option) => option !== question.answer);
        for (let attempt = 0; attempt < 2; attempt++) {
          fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
          fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
        }
        expect(screen.getByText("Question 1 of 5")).toBeTruthy();
        expect(document.querySelector(".challenge-hint")).toBeTruthy();
      }
      fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      await act(async () => vi.advanceTimersByTime(1000));
    }
    expect(done).toHaveBeenCalledTimes(1);
    expect(done.mock.calls[0][0]).toHaveProperty("combos");
    unmount();
  }
}, 30000);
