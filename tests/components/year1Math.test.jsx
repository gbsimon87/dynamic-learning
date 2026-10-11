import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { year1MathCurriculum } from "../../src/data/year1MathCurriculum";
import { YEAR1_MATH_BUILDERS } from "../../src/data/challenges/year1Math/index";
import { seededRng } from "../../src/data/challenges/questionKinds";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year1MathGame from "../../src/pages/skills/math/challenges/year1/Year1MathGame";
import Year1MathVisual from "../../src/pages/skills/math/challenges/year1/Year1MathVisual";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const modules = import.meta.glob("../../src/pages/skills/math/challenges/year1/*/*Challenge*.jsx", { eager: true });
const visuals = question => <Year1MathVisual visual={question.visual} />;
afterEach(() => { vi.useRealTimers(); document.body.classList.remove("dark"); });

it("loads all 128 real challenge components and their first question", () => {
  expect(Object.keys(modules)).toHaveLength(128);
  for (const theme of ["light", "dark"]) {
    document.body.classList.toggle("dark", theme === "dark");
    for (const { default: Challenge } of Object.values(modules)) {
      render(<Challenge onComplete={vi.fn()} />);
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Check my answer" })).toBeTruthy();
      expect(screen.getByRole("heading")).toBeTruthy();
      cleanup();
    }
  }
}, 20000);

it("retries wrong answers, shows the hint, locks success, and completes once with combos", () => {
  vi.useFakeTimers();
  const done = vi.fn();
  render(<Year1MathGame topicId="counting-objects" level={1} onComplete={done} />);
  for (let question = 1; question <= 5; question++) {
    const count = document.querySelectorAll(".y1-counter").length;
    if (question === 1) {
      const wrong = screen.getAllByRole("button").find(b => b.classList.contains("choice-btn") && b.textContent !== String(count));
      fireEvent.click(wrong);
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      expect(screen.getByText("Touch each picture once as you count.")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: String(count), exact: true }));
    const check = screen.getByRole("button", { name: "Check my answer" });
    fireEvent.click(check);
    expect(check.disabled).toBe(true);
    fireEvent.click(check);
    expect(done).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
  }
  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: 1 });
});

it("every generated drawing can render, with named shapes and measured values", () => {
  const seen = new Set();
  for (const topic of year1MathCurriculum.flatMap(c => c.topics)) for (const level of [1, 2, 3, 4]) {
    const questions = YEAR1_MATH_BUILDERS[topic.id](level, seededRng(27));
    for (const question of questions) {
      if (!question.visual) continue;
      render(<Year1MathVisual visual={question.visual} />);
      expect(document.querySelector(".y1-math-visual").children.length).toBeGreaterThan(0);
      seen.add(question.visual.type);
      if (question.visual.type === "objects") {
        const total = question.visual.groups.reduce((sum, group) => sum + group.count, 0);
        expect(document.querySelectorAll(".y1-counter").length).toBe(total);
      }
      if (question.visual.type === "groups") expect(document.querySelectorAll(".array-dot").length).toBe(question.visual.rows * question.visual.columns);
      if (question.visual.type === "turn" && question.visual.showEnd) expect(document.querySelectorAll(".y1-turn-arc").length).toBe(question.visual.quarters);
      if (question.visual.type === "shapes") expect(screen.getAllByRole("img")).toHaveLength(question.visual.shapes.length);
      if (question.visual.type === "ruler") {
        const object = document.querySelector(".y1-measured-object");
        const track = document.querySelector(".scale-track");
        const pointer = track.querySelector(".scale-pointer");
        expect(object.parentElement).toBe(track);
        if (question.visual.vertical) expect(object.style.height).toBe(pointer.style.bottom);
        else expect(object.style.width).toBe(pointer.style.left);
      }
      cleanup();
    }
  }
  expect(seen.has("ruler")).toBe(true);
  expect(seen.has("instrument")).toBe(true);
}, 20000);

it("matches all shape families without exposing a name on labelled cards", () => {
  const q = YEAR1_MATH_BUILDERS["recognising-2-d-shapes"](3, seededRng(8))[0];
  const submit = vi.fn();
  render(<DataRound question={q} renderVisual={visuals} submit={submit} locked={false} hint={false} />);
  for (const card of q.cards) {
    fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: card.bin, exact: true }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenCalledWith(true);
});

it("sets half-past hands and shades a quarter using the real controls", () => {
  const submit = vi.fn();
  const q = { kind: "clock", mode: "set", time: { hour: 1, minute: 30 }, start: { hour: 12, minute: 0 }, minuteStep: 30, prompt: "Show half past 1." };
  render(<DataRound question={q} submit={submit} locked={false} hint={false} />);
  fireEvent.click(screen.getByRole("button", { name: "Hour forward" }));
  fireEvent.click(screen.getByRole("button", { name: "30 minutes forward" }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
  cleanup();
  render(<DataRound question={{ kind: "fraction", mode: "shade", parts: 4, answer: 1, prompt: "Shade one quarter." }} submit={submit} locked={false} hint={false} />);
  fireEvent.click(screen.getByRole("button", { name: "Part 3 of 4" }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});
