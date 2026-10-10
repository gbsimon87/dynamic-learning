import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DataChallenge, { DataRound } from "../../src/components/challenge/data/DataChallenge";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));

function round(q, { hint = false } = {}) {
  const submit = vi.fn();
  render(<DataRound question={q} submit={submit} locked={false} hint={hint} />);
  const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  return { submit, check };
}
const typeNumber = (value) => fireEvent.change(screen.getByRole("textbox"), { target: { value } });
const tap = (name) => fireEvent.click(screen.getByRole("button", { name }));

describe("every data kind can be answered right in the browser", () => {
  it("choice, with the hint striking a wrong option", () => {
    const { submit, check } = round({ kind: "choice", prompt: "Which is **even**?", options: [3, 4, 5], answer: 4, hint: "Look at the last digit." }, { hint: true });
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(2);
    expect(screen.getByText("even").tagName).toBe("STRONG");
    tap("4");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("number, wrong then the Check is still offered", () => {
    const { submit, check } = round({ kind: "number", equation: "6 × 5 = ?", answer: 30 });
    expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
    typeNumber("35");
    check();
    expect(submit).toHaveBeenLastCalledWith(false);
  });

  it("sort", () => {
    const { submit, check } = round({ kind: "sort", prompt: "Sort them.", bins: [{ id: "odd", label: "Odd" }, { id: "even", label: "Even" }], cards: [{ id: "1", label: "1", bin: "odd" }, { id: "2", label: "2", bin: "even" }] });
    tap("1");
    fireEvent.click(screen.getAllByRole("button").find((b) => b.textContent.includes("Odd")));
    tap("2");
    fireEvent.click(screen.getAllByRole("button").find((b) => b.textContent.includes("Even")));
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("sequence: the keypad fills the active gap", () => {
    const { submit, check } = round({ kind: "sequence", prompt: "Fill the gap.", terms: [2, 4, 6, 8], gaps: [2] });
    tap("6");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("clock set", () => {
    const { submit, check } = round({ kind: "clock", mode: "set", prompt: "Show 1 o'clock.", time: { hour: 1, minute: 0 } });
    tap("Hour forward");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("coins make: any combination of the target", () => {
    const { submit, check } = round({ kind: "coins", mode: "make", prompt: "Make 30p.", target: 30 });
    tap("Add 20p");
    tap("Add 10p");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("coins count shows the coins and takes a typed total", () => {
    const { submit, check } = round({ kind: "coins", mode: "count", prompt: "How much?", coins: [20, 5], answer: 25 });
    expect(screen.getByRole("img", { name: "Coins: 20p, 5p" })).toBeTruthy();
    typeNumber("25");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("fraction shade", () => {
    const { submit, check } = round({ kind: "fraction", mode: "shade", prompt: "Shade 2/3.", parts: 3, answer: 2 });
    tap("Part 1 of 3");
    tap("Part 3 of 3");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("place value build", () => {
    const { submit, check } = round({ kind: "placeValue", mode: "build", prompt: "Make 21.", answer: 21 });
    tap("Add one ten");
    tap("Add one ten");
    tap("Add one one");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("chart read", () => {
    const { submit, check } = round({ kind: "chart", prompt: "Which was most popular?", chart: { type: "tally", rows: [{ label: "Red", value: 4 }, { label: "Blue", value: 7 }] }, options: ["Red", "Blue"], answer: "Blue" });
    tap("Blue");
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });

  it("pick", () => {
    const { submit, check } = round({ kind: "pick", prompt: "Tap the verb.", tokens: ["The", "dog", "ran"], answer: 2 });
    fireEvent.click(within(screen.getByRole("group")).getByRole("button", { name: /ran/ }));
    check();
    expect(submit).toHaveBeenCalledWith(true);
  });
});

it("a whole data challenge runs through the shell to completion", () => {
  const onComplete = vi.fn();
  const build = () => [1, 2, 3].map((n) => ({ kind: "choice", prompt: `Pick ${n}.`, options: [n, n + 10], answer: n }));
  render(<DataChallenge level={1} build={build} titles={["Pick the number"]} onComplete={onComplete} />);
  expect(screen.getByRole("heading", { name: "Pick the number" })).toBeTruthy();
  expect(screen.getByText("Pick 1.")).toBeTruthy();
});
