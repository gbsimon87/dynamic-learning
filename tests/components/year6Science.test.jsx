import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR6_SCIENCE_BUILDERS as builders } from "../../src/data/challenges/year6Science/index.js";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year6ScienceGame from "../../src/pages/skills/science/challenges/year6/Year6ScienceGame";
import Year6ScienceVisual from "../../src/pages/skills/science/challenges/year6/Year6ScienceVisual";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const modules = import.meta.glob("../../src/pages/skills/science/challenges/year6/*/*Challenge*.jsx", { eager: true });
const renderVisual = question => <Year6ScienceVisual question={question} />;
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });

it("loads all 96 Year 6 Science challenges on Bix's notes with a picture, then starts the rounds, in both themes", () => {
  expect(Object.keys(modules)).toHaveLength(96);
  for (const theme of ["light", "dark"]) {
    document.body.classList.toggle("dark", theme === "dark");
    for (const { default: Challenge } of Object.values(modules)) {
      render(<Challenge onComplete={vi.fn()} />);
      const notes = screen.getByRole("region", { name: "Bix's notes" });
      expect(notes.querySelector("svg[role='img'], figure")).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      cleanup();
    }
  }
}, 60000);

it("draws circuit diagrams with the right symbols, and never a lit bulb", () => {
  render(renderVisual({ visual: { type: "circuitDiagram", parts: ["cell", "cell", "cell", "lamp", "switchOpen"], alt: "Three cells, a bulb and an open switch." } }));
  expect(screen.getByRole("img", { name: "Three cells, a bulb and an open switch." })).toBeTruthy();
  expect(document.querySelectorAll(".y6v-cell-short")).toHaveLength(3);
  expect(document.querySelectorAll(".y6v-contact")).toHaveLength(2);
  expect(screen.queryByText("Bulb")).toBeNull();
  cleanup();
  render(renderVisual({ visual: { type: "circuitDiagram", parts: ["cell", "lamp"], gap: true, labels: true, alt: "A cell and a bulb with a gap." } }));
  expect(screen.getByText("Gap")).toBeTruthy();
  expect(screen.getByText("Bulb")).toBeTruthy();
});

it("draws the light, shadow and circulation figures, and hides a shadow the question asks about", () => {
  for (const visual of [
    { type: "lightPath", via: "mirror", labels: true, alt: "Light from a torch reflects off a mirror into an eye." },
    { type: "periscope", alt: "A periscope with two mirrors." },
    { type: "shadow", shape: "triangle", hideShadow: true, alt: "A torch shines on a triangle; the screen shows a question mark." },
    { type: "circulation", labels: true, alt: "Blood flows from the heart to the lungs and body and back." },
  ]) {
    render(renderVisual({ visual }));
    expect(screen.getByRole("img", { name: visual.alt })).toBeTruthy();
    cleanup();
  }
  render(renderVisual({ visual: { type: "shadow", shape: "triangle", hideShadow: true, alt: "Hidden shadow." } }));
  expect(screen.getByText("?")).toBeTruthy();
  expect(document.querySelector(".y6v-shadow")).toBeNull();
});

it("plays a circuit-fault round: retries twice, shows a hint, and completes once", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockImplementation(seededRng(7));
  const done = vi.fn();
  render(<Year6ScienceGame topicId="switches-and-circuit-faults" level={1} onComplete={done} />);
  fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
  const questions = builders["switches-and-circuit-faults"](1, seededRng(7));
  questions.forEach((q, index) => {
    if (index === 0) {
      const wrong = screen.getAllByRole("button").find(b => b.classList.contains("choice-btn") && b.textContent !== q.answer);
      for (let miss = 0; miss < 2; miss++) {
        fireEvent.click(wrong);
        fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      }
      expect(screen.getByText("Question 1 of 5")).toBeTruthy();
      expect(document.querySelector(".challenge-hint")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(done).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
  });
  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});

it("accepts a whole sort beside its circuit diagram through the real controls", () => {
  const submit = vi.fn();
  const sort = builders["switches-and-circuit-faults"](3, seededRng(3)).concat(builders["circuit-symbols"](3, seededRng(4))).find(q => q.kind === "sort");
  render(<DataRound question={sort} renderVisual={renderVisual} submit={submit} locked={false} hint={false} />);
  expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
  for (const card of sort.cards) {
    fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: sort.bins.find(b => b.id === card.bin).label, exact: true }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});
