import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR2_HISTORY_BUILDERS } from "../../src/data/challenges/history/year2/index";
import Year2HistoryGame from "../../src/pages/skills/history/challenges/year2/Year2HistoryGame";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
// jsdom has no drag geometry. Real keyboard reordering is checked in Chrome.
vi.mock("../../src/components/challenge/DragToOrder", () => ({ default: ({ items, onReorder, disabled }) => <div>
  {items.map((item) => <button key={item.id} disabled={disabled} onClick={() => onReorder([item, ...items.filter((other) => other.id !== item.id)])}>Move {item.id} first</button>)}
</div> }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const show = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
const modules = import.meta.glob("../../src/pages/skills/history/challenges/year2/*/*Challenge*.jsx", { eager: true });

it("all 68 Year 2 History wrappers open a story and five-round run", () => {
  expect(Object.keys(modules)).toHaveLength(68);
  for (const { default: Challenge } of Object.values(modules)) {
    const { unmount } = show(<Challenge onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    unmount();
  }
}, 30000);

for (const [topicId, build] of Object.entries(YEAR2_HISTORY_BUILDERS)) it(`${topicId}: all four complete runs, with retries and completion payload`, async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.375);
  for (let level = 1; level <= 4; level++) {
    document.body.classList.toggle("dark", level % 2 === 0);
    const done = vi.fn();
    const expected = build(level, () => 0.375).questions;
    const { unmount } = show(<Year2HistoryGame topicId={topicId} level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    for (const [index, q] of expected.entries()) {
      expect(screen.getByText(`Question ${index + 1} of 5`)).toBeTruthy();
      const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      if (q.kind === "choice") {
        if (index === 0) {
          for (let miss = 0; miss < 2; miss++) {
            fireEvent.click(screen.getByRole("button", { name: q.options.find((v) => v !== q.answer), exact: true }));
            check();
          }
          expect(screen.getByText("Question 1 of 5")).toBeTruthy();
          expect(document.querySelector(".challenge-hint")).toBeTruthy();
          expect(done).not.toHaveBeenCalled();
        }
        fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: "📖 Bix's story" }));
        expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
        fireEvent.click(screen.getByRole("button", { name: "📖 Bix's story" }));
      } else if (q.kind === "sort") {
        for (const card of q.cards) {
          fireEvent.click(within(screen.getByRole("group", { name: "Cards to sort" })).getByRole("button", { name: card.label, exact: true }));
          fireEvent.click(screen.getByRole("button", { name: q.bins.find((bin) => bin.id === card.bin).label, exact: true }));
        }
      } else if (q.kind === "order") {
        for (const id of [...q.answer].reverse()) fireEvent.click(screen.getByRole("button", { name: `Move ${id} first` }));
      } else throw new Error(`Unexpected kind ${q.kind}`);
      check();
      expect(done).not.toHaveBeenCalled();
      await act(async () => vi.advanceTimersByTime(1000));
    }
    expect(done).toHaveBeenCalledTimes(1);
    expect(done.mock.calls[0][0]).toHaveProperty("combos");
    await act(async () => vi.advanceTimersByTime(2000));
    expect(done).toHaveBeenCalledTimes(1);
    unmount();
  }
}, 20000);

it("local history has optional, collapsed, untracked grown-up activities", () => {
  for (const topicId of ["memorials-and-blue-plaques", "old-maps-and-photos"]) {
    const { container, unmount } = show(<Year2HistoryGame topicId={topicId} level={4} onComplete={vi.fn()} />);
    expect(screen.getByText("Try with a grown-up (optional)")).toBeTruthy();
    expect(container.querySelector("details").open).toBe(false);
    expect(container.querySelector("details input")).toBeNull();
    unmount();
  }
});

it("practice maps and plaque render their evidence, with original-source labels", () => {
  for (const [topicId, sourceName] of [["old-maps-and-photos", "Old map: house and church on the same street"], ["memorials-and-blue-plaques", "Practice plaque: Florence Nightingale, nurse, lived here"]]) {
    const { unmount } = show(<Year2HistoryGame topicId={topicId} level={3} onComplete={vi.fn()} />);
    expect(screen.getByRole("img", { name: sourceName })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    fireEvent.click(screen.getByRole("button", { name: "📖 Bix's story" }));
    expect(screen.getAllByRole("img", { name: sourceName })).toHaveLength(1);
    unmount();
  }
});
