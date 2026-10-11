import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { year1ScienceCurriculum } from "../../src/data/year1ScienceCurriculum";
import { YEAR1_SCIENCE_BUILDERS } from "../../src/data/challenges/year1Science/index";
import { seededRng } from "../../src/data/challenges/questionKinds";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year1ScienceGame from "../../src/pages/skills/science/challenges/year1/Year1ScienceGame";
import Year1ScienceVisual from "../../src/pages/skills/science/challenges/year1/Year1ScienceVisual";

const voice = vi.hoisted(() => ({ available: false }));
vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => voice.available }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const modules = import.meta.glob("../../src/pages/skills/science/challenges/year1/*/*Challenge*.jsx", { eager: true });
const visuals = (question) => <Year1ScienceVisual visual={question.visual} />;
afterEach(() => { voice.available = false; vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });

it("loads all 64 real challenge components and their first question in both themes", () => {
  expect(Object.keys(modules)).toHaveLength(64);
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

// Where each plant arrow points, read back from the drawing's own label.
const PLANT_FROM_LABEL = [
  ["whole flower", "flower"], ["one coloured part", "petal"], ["flat green part", "leaf"],
  ["tall green part", "stem"], ["thin parts under the soil", "roots"], ["round part under the soil", "bulb"],
];

it("plays a whole challenge from the drawings: a wrong answer retries, a hint appears, success completes once", () => {
  vi.useFakeTimers();
  const rng = seededRng(5);
  vi.spyOn(Math, "random").mockImplementation(rng);
  const done = vi.fn();
  render(<Year1ScienceGame topicId="parts-of-a-flowering-plant" level={1} onComplete={done} />);
  for (let question = 1; question <= 5; question++) {
    const label = screen.getAllByRole("img").map((img) => img.getAttribute("aria-label")).find((text) => text?.includes("arrow points"));
    const matches = PLANT_FROM_LABEL.filter(([words]) => label.includes(words));
    expect(matches).toHaveLength(1);
    const answer = matches[0][1];
    if (question === 1) {
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
  }
  expect(done).toHaveBeenCalledTimes(1);
});

it("offers Read it to me on Year 1 Science", () => {
  voice.available = true;
  render(<Year1ScienceGame topicId="the-four-seasons" level={1} onComplete={vi.fn()} />);
  expect(document.querySelector(".challenge-read-aloud")).toBeTruthy();
});

it("sorts, spells and types with the real controls", () => {
  const submit = vi.fn();
  const sort = YEAR1_SCIENCE_BUILDERS["fish-amphibians-reptiles-birds-and-mammals"](3, seededRng(3)).find((q) => q.kind === "sort");
  render(<DataRound question={sort} renderVisual={visuals} submit={submit} locked={false} hint={false} />);
  for (const card of sort.cards) {
    fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: sort.bins.find((b) => b.id === card.bin).label, exact: true }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
  cleanup();

  const spelled = YEAR1_SCIENCE_BUILDERS["parts-of-a-tree"](3, seededRng(4)).find((q) => q.kind === "build");
  render(<DataRound question={spelled} renderVisual={visuals} submit={submit} locked={false} hint={false} />);
  const tray = [...document.querySelectorAll(".tile-builder button")];
  for (const letter of spelled.answer) {
    const tile = tray.find((b) => b.textContent === letter && !b.dataset.used);
    tile.dataset.used = "1";
    fireEvent.click(tile);
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
  cleanup();

  const typedQ = YEAR1_SCIENCE_BUILDERS["our-five-senses"](4, seededRng(2)).find((q) => q.kind === "type");
  render(<DataRound question={typedQ} submit={submit} locked={false} hint={false} />);
  for (const letter of typedQ.answer) fireEvent.click(screen.getByRole("button", { name: letter, exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});

it("every generated drawing renders, with sun boxes matching the hours", () => {
  const seen = new Set();
  for (const topic of year1ScienceCurriculum.flatMap((c) => c.topics)) for (const level of [1, 2, 3, 4]) for (const seed of [3, 27]) {
    for (const question of YEAR1_SCIENCE_BUILDERS[topic.id](level, seededRng(seed))) {
      if (!question.visual) continue;
      render(<Year1ScienceVisual visual={question.visual} />);
      expect(document.querySelector(".y1-sci-visual").children.length).toBeGreaterThan(0);
      seen.add(question.visual.type);
      if (question.visual.point) expect(document.querySelector(".y1-sci-pointer")).toBeTruthy();
      if (question.visual.type === "days") {
        const total = question.visual.rows.reduce((sum, row) => sum + row.light, 0);
        expect(document.querySelectorAll(".y1-sci-hours .is-light").length).toBe(total);
        expect(document.querySelectorAll(".y1-sci-hours span").length).toBe(24 * question.visual.rows.length);
      }
      // The drawing never prints the name it asks for.
      if (question.kind === "choice" && question.visual.point) expect(document.querySelector(".y1-sci-visual").textContent).not.toContain(question.answer);
      cleanup();
    }
  }
  expect([...seen].sort()).toEqual(["body", "days", "plant", "tree", "treePair"]);
}, 20000);
