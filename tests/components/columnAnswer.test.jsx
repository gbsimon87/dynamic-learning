import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ColumnAnswer from "../../src/components/challenge/ColumnAnswer";
import ColumnMethodGame from "../../src/pages/skills/math/challenges/year3/ColumnMethodGame";
import Year3MulDivGame from "../../src/pages/skills/math/challenges/year3/Year3MulDivGame";
import Year4MathGame from "../../src/pages/skills/math/challenges/year4/Year4MathGame";

const { submit } = vi.hoisted(() => ({ submit: vi.fn() }));
vi.mock("../../src/components/challenge/ChallengeShell", () => ({
  default: ({ questions, render: renderRound }) => renderRound({ question: questions[0], index: 0, submit, locked: false, misses: 0 }),
}));

const tap = digit => fireEvent.click(screen.getByRole("button", { name: digit, exact: true }));
const slot = place => screen.getByRole("button", { name: `${place} of the answer` });

it("fills ones first, preserves zeroes and accepts rapid taps without moving the caret", () => {
  const change = vi.fn();
  render(<ColumnAnswer top={268} bottom={157} operation="add" onChange={change} />);
  expect(slot("ones").getAttribute("aria-pressed")).toBe("true");
  act(() => { for (const digit of "504") tap(digit); });
  expect(slot("ones").textContent).toBe("5");
  expect(slot("tens").textContent).toBe("0");
  expect(slot("hundreds").textContent).toBe("4");
  expect(change).toHaveBeenLastCalledWith("405");
  fireEvent.click(slot("tens"));
  tap("2");
  expect(change).toHaveBeenLastCalledWith("425");
});

it("supports keyboard digits, Backspace, Clear and locked answer boxes", () => {
  const change = vi.fn();
  const props = { top: 268, bottom: 157, operation: "add", onChange: change };
  const { rerender } = render(<ColumnAnswer {...props} />);
  fireEvent.keyDown(slot("ones"), { key: "5" });
  fireEvent.keyDown(slot("ones"), { key: "2" });
  fireEvent.click(screen.getByRole("button", { name: "Delete the last digit" }));
  expect(slot("tens").textContent).toBe("?");
  tap("2"); tap("4");
  expect(change).toHaveBeenLastCalledWith("425");
  rerender(<ColumnAnswer {...props} disabled />);
  expect(slot("ones").disabled).toBe(true);
  fireEvent.keyDown(slot("ones"), { key: "9" });
  expect(change).toHaveBeenLastCalledWith("425");
  rerender(<ColumnAnswer {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(change).toHaveBeenLastCalledWith("");
  expect(slot("ones").getAttribute("aria-pressed")).toBe("true");
  expect(["ones", "tens", "hundreds"].map(place => slot(place).textContent)).toEqual(["?", "?", "?"]);
});

const cases = [
  ...["add", "subtract"].flatMap(operation => [3, 4].map(level => [
    `Year 3 ${operation} level ${level}`, () => <ColumnMethodGame operation={operation} level={level} onComplete={() => {}} />,
  ])),
  ["Year 3 short multiplication", () => <Year3MulDivGame topic="twoDigit" level={3} onComplete={() => {}} />],
  ...[1, 2, 3, 4].map(level => [`Year 4 columns level ${level}`, () => <Year4MathGame topic="columns" level={level} onComplete={() => {}} />]),
  ...[1, 2, 4].map(level => [`Year 4 written multiplication level ${level}`, () => <Year4MathGame topic="written" level={level} onComplete={() => {}} />]),
];

describe.each(cases)("%s", (_name, component) => {
  it("requires every column, rejects wrong answers, and accepts right-to-left entry", () => {
    submit.mockClear();
    const { container } = render(component());
    const rows = container.querySelectorAll(".col-sum-row");
    const read = row => Number([...row.querySelectorAll(".col-sum-cell")].map(cell => cell.textContent.trim()).join(""));
    const a = read(rows[1]), b = read(rows[2]);
    const sign = rows[2].querySelector(".col-sum-sign").textContent;
    const expected = sign === "+" ? a + b : sign === "×" ? a * b : a - b;
    const count = container.querySelectorAll(".col-sum-answer button").length;
    const check = screen.getByRole("button", { name: "Check my answer" });
    expect(check.disabled).toBe(true);
    const wrong = (expected + 1) % (10 ** count);
    for (const digit of String(wrong).padStart(count, "0").split("").reverse()) tap(digit);
    fireEvent.click(check);
    expect(submit).toHaveBeenLastCalledWith(false);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    const keypad = container.querySelector(".keypad");
    for (const digit of String(expected).padStart(count, "0").split("").reverse()) {
      fireEvent.click(within(keypad).getByRole("button", { name: digit, exact: true }));
    }
    fireEvent.click(check);
    expect(submit).toHaveBeenLastCalledWith(true);
  });
});
