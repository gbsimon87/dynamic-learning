import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR4_SCIENCE_BUILDERS as builders, YEAR4_SCIENCE_TOPICS as topics } from "../../src/data/challenges/year4Science/index.js";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year4ScienceGame from "../../src/pages/skills/science/challenges/year4/Year4ScienceGame";
import Year4ScienceVisual from "../../src/pages/skills/science/challenges/year4/Year4ScienceVisual";
import { isScienceAnswerCorrect } from "../../src/data/challenges/year4Science/engine.js";
import { before, expectScienceLayout } from "./scienceLayoutHelpers";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const modules = import.meta.glob("../../src/pages/skills/science/challenges/year4/*/*Challenge*.jsx", { eager: true });
const renderVisual = question => <Year4ScienceVisual question={question} />;
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });

it("loads all 80 real challenges with answer controls in both themes", () => {
  expect(Object.keys(modules)).toHaveLength(80);
  for (const theme of ["light", "dark"]) {
    document.body.classList.toggle("dark", theme === "dark");
    for (const { default: Challenge } of Object.values(modules)) {
      render(<Challenge onComplete={vi.fn()} />);
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Check my answer" })).toBeTruthy();
      cleanup();
    }
  }
}, 30000);

it("plays circuit predictions from visible connections, retries twice, hints and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(7));
  const done = vi.fn();
  render(<Year4ScienceGame topicId="complete-and-incomplete-circuits" level={1} onComplete={done} />);
  const questions = builders["complete-and-incomplete-circuits"](1, seededRng(7));
  questions.forEach((q, index) => {
    let answer = q.answer;
    if (q.visual?.type === "circuit") {
      const drawing = screen.getByRole("img").getAttribute("aria-label");
      answer = drawing.includes("gap") ? "The bulb stays off" : "The bulb lights";
    }
    if (index === 0) {
      const wrong = screen.getAllByRole("button").find(b => b.classList.contains("choice-btn") && b.textContent !== answer);
      for (let miss = 0; miss < 2; miss++) {
        fireEvent.click(wrong);
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(done).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
  });
  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});

it("accepts whole classification and sentence responses through the real controls", () => {
  const submit = vi.fn();
  const sort = builders["grouping-living-things"](3, seededRng(6)).find(q => q.kind === "sort");
  render(<DataRound question={sort} renderVisual={renderVisual} submit={submit} locked={false} hint={false} />);
  expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
  for (const card of sort.cards) {
    fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: sort.bins.find(b => b.id === card.bin).label, exact: true }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
  cleanup();
  const build = builders["the-water-cycle"](4, seededRng(2)).find(q => q.kind === "build");
  render(<DataRound question={build} renderVisual={renderVisual} submit={submit} locked={false} hint={false} />);
  for (const label of build.answer.split(" ")) {
    const tile = [...document.querySelectorAll(".tile-tray-slot:not([disabled])")].find(b => b.textContent === label);
    fireEvent.click(tile);
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});

it("renders supplied evidence tables and draws open/closed switch contacts", () => {
  const q = topics["evaporation-and-condensation"].enquiries[0];
  render(<Year4ScienceVisual question={q} />);
  expect(screen.getByRole("table")).toBeTruthy();
  expect(screen.getByText("Warm")).toBeTruthy();
  expect(screen.getByText("32")).toBeTruthy();
  expect(screen.getByText(/Supplied example results/)).toBeTruthy();
  cleanup();
  for (const closed of [false, true]) {
    render(<Year4ScienceVisual question={{ visual: { type: "circuit", closed, switch: true } }} />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("aria-label")).toContain(closed ? "touching" : "separated");
    const paths = [...image.querySelectorAll("path")].map(p => p.getAttribute("d"));
    // The main wires end at separate bulb contacts: no wire bypasses the bulb.
    expect(paths).toContain("M150 60 H55 V190 H188 M212 190 H340 V150 M250 60 H340 V90");
    expect(paths).toContain(closed ? "M340 90 V150" : "M340 90 L305 143");
    expect(document.querySelectorAll(".y4-sci-contact")).toHaveLength(2);
    cleanup();
  }
});

it("accepts a scientifically equivalent sentence through the actual Year 4 game", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(3));
  const questions = builders["switches"](3, seededRng(3));
  expect(questions[2].answer).toBe("A switch opens and closes the circuit.");
  render(<Year4ScienceGame topicId="switches" level={3} onComplete={vi.fn()} />);
  for (const q of questions.slice(0, 2)) {
    for (const card of q.cards) {
      fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: q.bins.find(b => b.id === card.bin).label, exact: true }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    act(() => vi.advanceTimersByTime(1000));
  }
  for (const word of "A switch closes and opens the circuit.".split(" ")) {
    fireEvent.click([...document.querySelectorAll(".tile-tray-slot:not([disabled])")].find(b => b.textContent === word));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  act(() => vi.advanceTimersByTime(1000));
  expect(screen.getByText("Question 4 of 5")).toBeTruthy();
});

it("joins the digestive model through the intestines to the waste exit", () => {
  render(<Year4ScienceVisual question={{ visual: { type: "digestion" } }} />);
  const svg = screen.getByRole("img");
  expect(svg.getAttribute("aria-label")).toContain("large intestine surrounds the small intestine");
  expect(svg.querySelector(".y4-sci-organ").getAttribute("d")).toMatch(/123 119$/);
  expect(svg.querySelector(".y4-sci-intestine").getAttribute("d")).toMatch(/^M123 119.*104 190$/);
  expect(svg.querySelector(".y4-sci-large").getAttribute("d")).toMatch(/^M104 199 V153.*V223$/);
  expect(screen.getByText("Waste exit")).toBeTruthy();
  // The same shared DataRound defaults remain usable outside Year 4.
  expect(isScienceAnswerCorrect({ kind: "choice", answer: "Cell" }, "Cell")).toBe(true);
});

it("all 80 real challenges fill the science layout, with a figure column only when a question has a picture or table", () => {
  const failures = [];
  for (const [path, { default: Challenge }] of Object.entries(modules)) {
    const { container } = render(<Challenge onComplete={vi.fn()} />);
    try {
      const { root, prompt, answer } = expectScienceLayout(container, { check: "Check my answer" });
      expect(screen.getByRole("button", { name: "Check my answer" })).toBeTruthy();
      const stage = root.querySelector(".science-round-stage");
      expect(Boolean(stage)).toBe(root.classList.contains("has-figure"));
      if (stage) expect(before(prompt, stage)).toBe(true);
      expect(before(prompt, answer)).toBe(true);
    } catch (error) { failures.push(`${path.split("/").slice(-2).join("/")}: ${error.message.split("\n")[0]}`); }
    cleanup();
  }
  expect(failures).toEqual([]);
}, 30000);

it("a Year 4 question with a circuit picture puts it in the figure column, before the answers", () => {
  const q = Array.from({ length: 20 }, (_, seed) => seed + 1).flatMap(seed => Object.values(builders).flatMap(build => [1, 2, 3, 4].flatMap(level => build(level, seededRng(seed))))).find(item => item.visual?.type === "circuit");
  expect(q, "some circuit question exists").toBeTruthy();
  const { container } = render(<DataRound layout="science" question={q} submit={() => {}} locked={false} hint={false} feedback={null} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} />);
  const root = container.querySelector(".science-round");
  expect(root.classList.contains("has-figure")).toBe(true);
  expect(root.querySelector(".science-round-stage svg")).toBeTruthy();
  expect(before(root.querySelector(".science-round-stage"), root.querySelector(".science-round-answer"))).toBe(true);
});
