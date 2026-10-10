import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import FreePlayShell from "../../src/components/skills/FreePlayShell";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

afterEach(() => vi.useRealTimers());

let made = 0;
const makeQuestion = (rng, level) => {
  made += 1;
  return { key: `q${made}`, prompt: `Question ${made} at level ${level}`, speech: "Read me" };
};

function game() {
  render(
    <MemoryRouter>
      <FreePlayShell
        title="Test game"
        makeQuestion={makeQuestion}
        render={({ submit, locked }) => (
          <>
            <button type="button" disabled={locked} onClick={() => submit(true)}>Right</button>
            <button type="button" disabled={locked} onClick={() => submit(false)}>Wrong</button>
          </>
        )}
      />
    </MemoryRouter>
  );
}

const feedback = () => document.querySelector(".free-play-feedback").textContent;
const right = () => {
  fireEvent.click(screen.getByRole("button", { name: "Right" }));
  const text = feedback();
  act(() => vi.advanceTimersByTime(2000));
  return text;
};

it("endless: a miss stays on the question, right moves on, combos and a five-star milestone", () => {
  vi.useFakeTimers();
  made = 0;
  game();
  expect(screen.getByText("Question 1 at level 1")).toBeTruthy();

  fireEvent.click(screen.getByRole("button", { name: "Wrong" }));
  expect(feedback()).toContain("↻");
  expect(screen.getByText("Question 1 at level 1")).toBeTruthy();

  right(); // after a miss: right, but no combo
  expect(screen.getByText("Question 2 at level 1")).toBeTruthy();
  right();
  right();
  const combo = right(); // three right first time in a row
  expect(combo).toContain("🔥");
  const milestone = right(); // the fifth right answer
  expect(milestone).toContain("🌟");
  expect(screen.getByRole("img", { name: /1 star so far/ })).toBeTruthy();
});

it("changing level starts a fresh game at that level", () => {
  vi.useFakeTimers();
  made = 0;
  game();
  right();
  fireEvent.click(screen.getByRole("button", { name: "Harder" }));
  expect(screen.getByText(/at level 3/)).toBeTruthy();
  expect(screen.getByRole("img", { name: /^0 of 5/ })).toBeTruthy();
  expect(feedback()).toBe("");
});
