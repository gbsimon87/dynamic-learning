import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR4_HISTORY_BUILDERS } from "../../src/data/challenges/history/year4/index";
import Year4HistoryGame from "../../src/pages/skills/history/challenges/year4/Year4HistoryGame";
import HistoryChallenge from "../../src/components/challenge/history/HistoryChallenge";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
// jsdom has no drag geometry. Real keyboard reordering is checked in Chrome.
vi.mock("../../src/components/challenge/DragToOrder", () => ({ default: ({ items, onReorder, disabled }) => <div>
  {items.map((item) => <button key={item.id} disabled={disabled} onClick={() => onReorder([item, ...items.filter((other) => other.id !== item.id)])}>Move {item.id} first</button>)}
</div> }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const show = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
const modules = import.meta.glob("../../src/pages/skills/history/challenges/year4/*/*Challenge*.jsx", { eager: true });

it("all 72 Year 4 History wrappers open a story and five-round run", () => {
  expect(Object.keys(modules)).toHaveLength(72);
  for (const { default: Challenge } of Object.values(modules)) {
    const { unmount } = show(<Challenge onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    unmount();
  }
}, 30000);

for (const [topicId, build] of Object.entries(YEAR4_HISTORY_BUILDERS)) it(`${topicId}: all four complete runs, with retries and completion payload`, async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.375);
  for (let level = 1; level <= 4; level++) {
    document.body.classList.toggle("dark", level % 2 === 0);
    const done = vi.fn();
    const expected = build(level, () => 0.375).questions;
    const { unmount } = show(<Year4HistoryGame topicId={topicId} level={level} onComplete={done} />);
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


it("Year 4 timeline connects earlier periods and source drawings render once on reopening", () => {
  for (const level of [2, 3]) {
    const { unmount } = show(<Year4HistoryGame topicId="anglo-saxon-kingdoms" level={level} onComplete={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    fireEvent.click(screen.getByRole("button", { name: "📖 Bix's story" }));
    if (level === 2) {
      expect(screen.getAllByRole("list", { name: "Time bands, oldest first" })).toHaveLength(1);
      expect(screen.getByText("Earlier: Stone Age → Bronze Age → Iron Age → Roman Britain")).toBeTruthy();
      expect(screen.getByText("Edward · AD 1042–1066", { selector: ".history-time-band span" })).toBeTruthy();
    } else {
      expect(screen.getAllByRole("img", { name: /Approximate kingdom positions/ })).toHaveLength(1);
      expect(screen.getByText(/Our teaching drawing/)).toBeTruthy();
    }
    unmount();
  }
});

it("rapid correct taps cannot skip rounds or duplicate completion, and leaving cancels completion", async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.375);
  const topicId = "the-raid-on-lindisfarne", level = 3;
  const questions = YEAR4_HISTORY_BUILDERS[topicId](level, () => 0.375).questions;
  for (const abandon of [false, true]) {
    const done = vi.fn();
    const { unmount } = show(<Year4HistoryGame topicId={topicId} level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    for (const [index, q] of questions.entries()) {
      expect(screen.getByText(`Question ${index + 1} of 5`)).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
      const check = screen.getByRole("button", { name: "Check my answer" });
      for (let tap = 0; tap < 8; tap++) fireEvent.click(check);
      expect(done).not.toHaveBeenCalled();
      if (abandon && index === questions.length - 1) unmount();
      await act(async () => vi.advanceTimersByTime(1000));
    }
    await act(async () => vi.advanceTimersByTime(10000));
    expect(done).toHaveBeenCalledTimes(abandon ? 0 : 1);
    unmount();
  }
});

it("wrong sorting and chronology stay playable and do not complete", async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.375);
  for (const level of [1, 2]) {
    const topicId = "the-raid-on-lindisfarne";
    const run = YEAR4_HISTORY_BUILDERS[topicId](level, () => 0.375).questions;
    const done = vi.fn();
    const { unmount } = show(<Year4HistoryGame topicId={topicId} level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    fireEvent.click(screen.getByRole("button", { name: run[0].answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    await act(async () => vi.advanceTimersByTime(1000));
    const q = run[1];
    if (q.kind === "sort") {
      for (const card of q.cards) {
        fireEvent.click(within(screen.getByRole("group", { name: "Cards to sort" })).getByRole("button", { name: card.label, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: q.bins.find((bin) => bin.id !== card.bin).label, exact: true }));
      }
    } else {
      for (const id of q.answer) fireEvent.click(screen.getByRole("button", { name: `Move ${id} first` }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    await act(async () => vi.advanceTimersByTime(2000));
    expect(screen.getByText("Question 2 of 5")).toBeTruthy();
    expect(done).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(false);
    unmount();
  }
});

it("story and question strings render as text, including markup-shaped input", () => {
  const payload = '<img src=x onerror="window.historyInjected=true">';
  const build = () => ({ story: { lines: [payload], picture: "🔎", pictureLabel: payload }, questions: [
    { kind: "choice", prompt: payload, options: [payload, "Another answer", "A third answer"], answer: payload },
  ] });
  const { container } = show(<HistoryChallenge build={build} year={4} level={1} onComplete={vi.fn()} />);
  expect(screen.getByText(payload)).toBeTruthy();
  expect(container.querySelector("img[src='x']")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
  expect(screen.getByRole("button", { name: payload, exact: true })).toBeTruthy();
  expect(container.querySelector("img[src='x']")).toBeNull();
  expect(window.historyInjected).toBeUndefined();
});
