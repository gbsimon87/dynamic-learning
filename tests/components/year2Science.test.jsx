import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { year2ScienceCurriculum } from "../../src/data/year2ScienceCurriculum";
import { YEAR2_SCIENCE_BUILDERS } from "../../src/data/challenges/year2Science/index";
import { seededRng } from "../../src/data/challenges/questionKinds";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year2ScienceGame from "../../src/pages/skills/science/challenges/year2/Year2ScienceGame";
import Year2ScienceVisual from "../../src/pages/skills/science/challenges/year2/Year2ScienceVisual";

const voice = vi.hoisted(() => ({ available: false }));
vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => voice.available }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const modules = import.meta.glob("../../src/pages/skills/science/challenges/year2/*/*Challenge*.jsx", { eager: true });
const visuals = (question) => <Year2ScienceVisual visual={question.visual} />;
afterEach(() => { voice.available = false; vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });

it("loads all 76 real challenge components and their first question in both themes", () => {
  expect(Object.keys(modules)).toHaveLength(76);
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

/** Which plant the drawing shows as healthy, read from what was drawn: no pale leaves, no dry soil. */
function healthyFromDrawing() {
  const plants = [...document.querySelectorAll(".y2-sci-pots [data-plant]")];
  const healthy = plants.filter((g) => !g.querySelector(".y2-sci-pale, .y2-sci-dry"));
  expect(plants).toHaveLength(2);
  expect(healthy).toHaveLength(1);
  const name = `Plant ${healthy[0].dataset.plant}`;
  // The screen-reader label must agree with the drawing.
  expect(document.querySelector(".y2-sci-pots").getAttribute("aria-label")).toContain(`${name} is green and standing up straight`);
  return name;
}

it("plays a whole challenge, reading the test plants from the drawing: a wrong answer retries, a hint appears, success completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(5));
  const expected = YEAR2_SCIENCE_BUILDERS["plant-experiments"](1, seededRng(5));
  const done = vi.fn();
  render(<Year2ScienceGame topicId="plant-experiments" level={1} onComplete={done} />);
  let fromDrawing = 0;
  expected.forEach((question, i) => {
    let answer = question.answer;
    if (question.visual?.type === "pots") {
      const healthy = healthyFromDrawing();
      const askedHealthy = question.hint.startsWith("A healthy plant");
      answer = askedHealthy ? healthy : healthy === "Plant A" ? "Plant B" : "Plant A";
      expect(answer).toBe(question.answer);
      fromDrawing++;
    }
    if (i === 0) {
      const wrong = screen.getAllByRole("button").find((b) => b.classList.contains("choice-btn") && b.textContent !== answer);
      for (let miss = 0; miss < 2; miss++) {
        fireEvent.click(wrong);
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(done).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
  });
  expect(fromDrawing).toBeGreaterThan(0);
  expect(done).toHaveBeenCalledTimes(1);
});

it("plays a food-chain challenge from the drawing alone", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(8));
  const done = vi.fn();
  render(<Year2ScienceGame topicId="simple-food-chains" level={1} onComplete={done} />);
  for (let question = 1; question <= 5; question++) {
    const prompt = screen.getByText(/What eats the|What does the|what does the arrow|start of every food chain/i).textContent;
    let answer;
    const links = [...document.querySelectorAll(".y2-sci-chain li")].map((li) => li.querySelector(".y2-sci-name")?.textContent);
    const eats = prompt.match(/What eats the (.+)\?/);
    const eatenBy = prompt.match(/What does the (.+) eat\?/);
    if (eats) answer = links[links.indexOf(eats[1]) + 1];
    else if (eatenBy) answer = links[links.indexOf(eatenBy[1]) - 1];
    else answer = /arrow/.test(prompt) ? "is eaten by" : "a plant";
    expect(answer).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    act(() => { vi.advanceTimersByTime(1000); });
  }
  expect(done).toHaveBeenCalledTimes(1);
});

it("offers Read it to me on Year 2 Science", () => {
  voice.available = true;
  render(<Year2ScienceGame topicId="habitats" level={1} onComplete={vi.fn()} />);
  expect(document.querySelector(".challenge-read-aloud")).toBeTruthy();
});

it("sorts into three bins and types with the real controls", () => {
  const submit = vi.fn();
  const sort = YEAR2_SCIENCE_BUILDERS["living-dead-and-never-alive"](2, seededRng(3)).find((q) => q.kind === "sort");
  render(<DataRound question={sort} renderVisual={visuals} submit={submit} locked={false} hint={false} />);
  for (const card of sort.cards) {
    fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: sort.bins.find((b) => b.id === card.bin).label, exact: true }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
  cleanup();

  const typedQ = YEAR2_SCIENCE_BUILDERS.hygiene(4, seededRng(2)).find((q) => q.kind === "type");
  render(<DataRound question={typedQ} submit={submit} locked={false} hint={false} />);
  for (const letter of typedQ.answer) fireEvent.click(screen.getByRole("button", { name: letter, exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});

it("every generated drawing renders, and a food-chain gap never shows its answer", () => {
  const seen = new Set();
  for (const topic of year2ScienceCurriculum.flatMap((c) => c.topics)) for (const level of [1, 2, 3, 4]) for (const seed of [3, 27]) {
    for (const question of YEAR2_SCIENCE_BUILDERS[topic.id](level, seededRng(seed))) {
      if (!question.visual) continue;
      render(<Year2ScienceVisual visual={question.visual} />);
      const drawing = document.querySelector(".y2-sci-visual");
      expect(drawing.children.length).toBeGreaterThan(0);
      seen.add(question.visual.type);
      if (question.visual.type === "chain") {
        const { links, gap } = question.visual;
        const items = [...drawing.querySelectorAll(".y2-sci-chain li")];
        const shown = [...drawing.querySelectorAll(".y2-sci-name")].map((n) => n.textContent);
        expect(items).toHaveLength(links.length);
        expect(drawing.querySelectorAll(".y2-sci-arrow")).toHaveLength(links.length - 1);
        expect(shown).toHaveLength(links.length - (gap === undefined ? 0 : 1));
        // Every link has a picture: an empty box looks broken.
        items.forEach((li) => expect(li.querySelector(".y2-sci-icon").textContent.trim()).not.toBe(""));
        if (gap !== undefined) {
          expect(shown).not.toContain(question.answer);
          expect(items[gap].classList.contains("is-missing")).toBe(true);
          expect(items[gap].querySelector(".sr-only").textContent).toBe("a missing box");
        }
      }
      if (question.visual.type === "growth") {
        const svg = drawing.querySelector("svg");
        // The label describes what is visible, never the stage's name.
        expect(svg.getAttribute("aria-label").toLowerCase()).not.toContain(question.answer.replace(/^an? /, ""));
        const stage = question.visual.stage;
        expect(svg.querySelectorAll(".y1-sci-stem")).toHaveLength(stage === 0 ? 0 : 1);
        expect(svg.querySelectorAll(".y2-sci-seed")).toHaveLength(stage === 3 ? 0 : 1);
        if (stage === 2) expect(svg.querySelectorAll(".y1-sci-leaf")).toHaveLength(2);
        if (stage === 3) expect(svg.querySelectorAll(".y1-sci-petal")).toHaveLength(6);
      }
      if (question.visual.type === "pots") {
        const plants = [...drawing.querySelectorAll("[data-plant]")];
        expect(plants.map((g) => g.dataset.state)).toEqual(question.visual.plants);
        expect(plants.filter((g) => !g.querySelector(".y2-sci-pale, .y2-sci-dry"))).toHaveLength(1);
      }
      cleanup();
    }
  }
  expect([...seen].sort()).toEqual(["chain", "growth", "pots"]);
}, 20000);
