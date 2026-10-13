import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR1_GEOGRAPHY_BUILDERS, YEAR1_GEOGRAPHY_TOPICS } from "../../src/data/challenges/geography/year1/index";
import Year1GeographyGame from "../../src/pages/skills/geography/challenges/year1/Year1GeographyGame";
import GeographyVisual from "../../src/components/challenge/geography/GeographyVisual";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
// jsdom has no drag geometry; this isolates ordering state.
vi.mock("../../src/components/challenge/DragToOrder", () => ({ default: ({ items, onReorder, disabled }) => <div>{items.map(i => <button key={i.id} disabled={disabled} onClick={() => onReorder([i, ...items.filter(j => j.id !== i.id)])}>Move {i.id} first</button>)}</div> }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const show = ui => render(<MemoryRouter>{ui}</MemoryRouter>);
const modules = import.meta.glob("../../src/pages/skills/geography/challenges/year1/*/*Challenge*.jsx", { eager: true });

it("all 48 Year 1 wrappers open a friendly start screen with Bix's notes and a four-round run", () => {
  expect(Object.keys(modules)).toHaveLength(48);
  for (const { default: Wrapper } of Object.values(modules)) {
    const { unmount, container } = show(<Wrapper onComplete={() => {}} />);
    expect(screen.getByRole("region", { name: "Bix's field notes" })).toBeTruthy();
    expect(container.querySelector(".geo-hero .challenge-title")).toBeTruthy();
    expect(container.querySelectorAll(".geo-notes-lines li").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
    expect(screen.getByText("Question 1 of 4")).toBeTruthy();
    unmount();
  }
}, 30000);

it("every Year 1 picture renders its drawing and text equivalent in both themes", () => {
  for (const topic of Object.values(YEAR1_GEOGRAPHY_TOPICS)) for (const lesson of topic.lessons) for (const v of [lesson.notes.visual, ...lesson.bank.map(q => q.visual)]) {
    for (const dark of [false, true]) {
      document.body.classList.toggle("dark", dark);
      const { container, unmount } = show(<GeographyVisual visual={v} />);
      expect(container.querySelector(".geo-visual")).toBeTruthy();
      expect(container.textContent).not.toContain("could not load");
      if (v.type === "y1") expect(container.querySelector(`.y1-art-${v.art}`)).toBeTruthy();
      expect(container.textContent).toContain(v.alt);
      unmount();
    }
  }
}, 30000);

for (const [topicId, build] of Object.entries(YEAR1_GEOGRAPHY_BUILDERS)) it(`${topicId}: four runs, hints, notes state and one completion each`, async () => {
  vi.useFakeTimers(); vi.spyOn(Math, "random").mockReturnValue(.375);
  for (const level of [1, 2, 3, 4]) {
    const done = vi.fn(), expected = build(level, () => .375).questions;
    const { unmount } = show(<Year1GeographyGame topicId={topicId} level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
    for (const [index, q] of expected.entries()) {
      expect(screen.getByText(`Question ${index + 1} of 4`)).toBeTruthy();
      const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      if (q.kind === "choice") {
        if (index === 0) {
          for (let miss = 0; miss < 2; miss++) { fireEvent.click(screen.getByRole("button", { name: String(q.options.find(v => v !== q.answer)), exact: true })); check(); }
          expect(document.querySelector(".challenge-hint")).toBeTruthy();
        }
        const answer = screen.getByRole("button", { name: String(q.answer), exact: true });
        fireEvent.click(answer);
        fireEvent.click(screen.getByRole("button", { name: "📖 Bix's field notes" }));
        fireEvent.click(screen.getByRole("button", { name: "Back to my question" }));
        expect(answer.getAttribute("aria-pressed")).toBe("true");
      } else if (q.kind === "sort") {
        for (const card of q.cards) {
          fireEvent.click(within(screen.getByRole("group", { name: "Cards to sort" })).getByRole("button", { name: card.label, exact: true }));
          fireEvent.click(screen.getByRole("button", { name: q.bins.find(b => b.id === card.bin).label, exact: true }));
        }
      } else if (q.kind === "order") {
        for (const id of [...q.answer].reverse()) fireEvent.click(screen.getByRole("button", { name: `Move ${id} first` }));
      }
      check(); await act(async () => vi.advanceTimersByTime(1000));
    }
    expect(done).toHaveBeenCalledTimes(1);
    unmount();
  }
}, 30000);
