import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import TimesTablesRace from "../../src/pages/skills/math/TimesTablesRace";
import { SKILL_GROUPS } from "../../shared/skillsCatalog.js";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const renderGame = () => render(<MemoryRouter><TimesTablesRace /></MemoryRouter>);
const press = (name) => fireEvent.click(screen.getByRole("button", { name }));
const prompt = () => screen.getByRole("heading", { level: 2 }).textContent.match(/(\d+) × (\d+)/).slice(1).map(Number);
const type = (number) => [...String(number)].forEach((digit) => fireEvent.click(screen.getByRole("button", { name: digit })));
const advance = (ms) => act(() => { vi.advanceTimersByTime(ms); });

function answerRight(a, b) {
  type(a * b);
  press("Check");
  advance(700);
}

it("is listed on the Skills hub", () => {
  const maths = SKILL_GROUPS.find((group) => group.name === "Maths");
  expect(maths.games.some((game) => game.to === "/skills/times-tables")).toBe(true);
});

it("a round: wrong tries cost 3s, right answers advance, results list the miss", () => {
  renderGame();
  press("Finish the race");
  press("Clear");
  press("2 times table");
  press("Start!");
  expect(document.activeElement).toBe(screen.getByLabelText("Your answer"));
  expect(prompt().includes(2)).toBe(true);

  let [a, b] = prompt();
  type(a * b + 1);
  press("Check");
  expect(screen.getByRole("status").textContent).not.toBe("");
  expect(screen.getByText("Question 1 of 10")).toBeTruthy();
  answerRight(a, b);
  expect(screen.getByText("Question 2 of 10")).toBeTruthy();
  expect(document.activeElement).toBe(screen.getByLabelText("Your answer"));

  for (let i = 0; i < 9; i += 1) {
    [a, b] = prompt();
    answerRight(a, b);
  }
  const results = screen.getByRole("region", { name: "Results" });
  expect(within(results).getByText(/Done in/)).toBeTruthy();
  expect(within(results).getByText(/includes \+3\.0s/)).toBeTruthy();
  expect(within(results).getByText("Wrong tries").nextSibling.textContent).toBe("1");
  expect(within(results).getByText(/missed 1 time\)/)).toBeTruthy();
  expect(screen.getByRole("button", { name: "Practise my tricky ones" })).toBeTruthy();
});

it("a physical keyboard types the answer and Enter checks it", () => {
  renderGame();
  press("Finish the race");
  press("Start!");
  const [a, b] = prompt();
  [...String(a * b)].forEach((key) => fireEvent.keyDown(document.body, { key }));
  fireEvent.keyDown(document.body, { key: "Enter" });
  advance(700);
  expect(screen.getByText("Question 2 of 10")).toBeTruthy();
});

it("the countdown ends when time runs out and counts the right answers", () => {
  renderGame();
  expect(screen.getByRole("button", { name: "Beat the clock" }).getAttribute("aria-pressed")).toBe("true");
  press("30 seconds");
  press("Start!");
  expect(screen.getByRole("timer").textContent).toContain("30s");

  const [a, b] = prompt();
  answerRight(a, b);
  expect(screen.getByText("1 right")).toBeTruthy();
  advance(30000);
  const results = screen.getByRole("region", { name: "Results" });
  expect(within(results).getByText("1 right in 30 seconds")).toBeTruthy();
});

it("tapping tiles picks any mix of tables, and Start waits for at least one", () => {
  renderGame();
  expect(screen.getByText("You picked the 2, 5 and 10 times tables.")).toBeTruthy();
  press("Clear");
  expect(screen.getByRole("button", { name: "Start!" }).disabled).toBe(true);
  expect(screen.getByText("Tap at least one times table.")).toBeTruthy();
  press("3 times table");
  press("9 times table");
  expect(screen.getByRole("button", { name: "9 times table" }).getAttribute("aria-pressed")).toBe("true");
  press("3 times table");
  expect(screen.getByText("You picked the 9 times table.")).toBeTruthy();
  press("Finish the race");
  press("Start!");
  for (let i = 0; i < 5; i += 1) {
    const [a, b] = prompt();
    expect(a === 9 || b === 9).toBe(true);
    answerRight(a, b);
  }
});

it("changing the tables starts clean", () => {
  renderGame();
  press("Finish the race");
  press("Start!");
  const [a, b] = prompt();
  answerRight(a, b);
  press("Stop");
  press("Change tables");
  expect(screen.getByRole("region", { name: "Choose your game" })).toBeTruthy();
  press("Start!");
  expect(screen.getByText("Question 1 of 10")).toBeTruthy();
  expect(screen.getByRole("timer").textContent).toContain("0.");
});
