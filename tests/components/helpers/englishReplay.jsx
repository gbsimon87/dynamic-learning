import { act, fireEvent, render, within } from "@testing-library/react";
import { expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { seededRng } from "../../../src/data/challenges/questionKinds";

/**
 * Side-by-side replay for moving an English game onto EnglishPracticeGame.
 * Run it from a temporary test while the old game still exists, passing the
 * old game and a component that renders EnglishPracticeGame with the topic's
 * practice builder. Once it passes, replace the old game with a thin
 * EnglishPracticeGame wrapper and add a `playThrough` test for it.
 *
 * Both versions mount with the same seeded Math.random and receive the same
 * taps: two wrong answers (feedback, then the hint), then the right one. After
 * every step the visible text and each button's name and enabled state must
 * match, and both must complete with the same payload.
 *
 * `bank(level, rng)` returns the topic's bank questions, so the replay knows
 * the answers. Drivers cover choice/pick, sort, build and type rounds.
 */
export async function replayParity({ Old, New, bank, levels = [1, 2, 3, 4], seeds = [1, 2, 3] }) {
  vi.useFakeTimers();
  try {
    for (const level of levels) for (const seed of seeds) await replayOne({ Old, New, bank, level, seed });
  } finally {
    vi.useRealTimers();
  }
}

function mount(Component, level, seed) {
  vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
  const done = vi.fn();
  const view = render(<MemoryRouter><Component level={level} onComplete={done} /></MemoryRouter>);
  vi.mocked(Math.random).mockRestore();
  return { view, done, at: within(view.container) };
}

// The shell never repeats its last encouragement line, and that memory is
// shared by both sides, so feedback is compared by its state, not its words.
const snapshot = ({ view, at }) => ({
  text: [...view.container.querySelectorAll(".challenge-feedback")].reduce(
    (text, el) => text.replace(el.textContent, `[feedback ${el.className}]`), view.container.textContent).replace(/\s+/g, " ").trim(),
  structure: [...view.container.querySelectorAll("*")].filter((el) => !el.closest(".challenge-feedback"))
    .map((el) => `${el.tagName.toLowerCase()}${el.classList.length ? "." + [...el.classList].sort().join(".") : ""}${el.getAttribute("aria-live") ? "[live]" : ""}`).join(" "),
  buttons: at.queryAllByRole("button").map((b) => `${b.getAttribute("aria-label") ?? b.textContent.trim()}${b.disabled ? " (disabled)" : ""}`),
});

async function replayOne({ Old, New, bank, level, seed }) {
  const questions = bank(level, seededRng(seed));
  const sides = [mount(Old, level, seed), mount(New, level, seed)];
  const same = (step) => {
    const [a, b] = sides.map(snapshot);
    expect(b.text, `level ${level}, seed ${seed}, ${step}: text`).toBe(a.text);
    expect(b.buttons, `level ${level}, seed ${seed}, ${step}: buttons`).toEqual(a.buttons);
    expect(b.structure, `level ${level}, seed ${seed}, ${step}: structure`).toBe(a.structure);
  };
  for (const [i, q] of questions.entries()) {
    same(`question ${i + 1} shown`);
    // A partial answer: one tile, card or letter, so readiness rules are compared too.
    for (const step of q.kind === "build" ? [1, 2] : [1]) {
      for (const side of sides) partial(side.at, q);
      same(`question ${i + 1} partial answer ${step}`);
    }
    for (const attempt of ["first wrong", "second wrong"]) {
      for (const side of sides) answer(side.at, q, false);
      same(`question ${i + 1} ${attempt} entered`);
      for (const side of sides) fireEvent.click(side.at.getByRole("button", { name: "Check" }));
      same(`question ${i + 1} ${attempt} checked`);
      await act(async () => vi.advanceTimersByTime(1500));
      same(`question ${i + 1} after ${attempt}`);
    }
    for (const side of sides) answer(side.at, q, true);
    same(`question ${i + 1} right entered`);
    for (const side of sides) fireEvent.click(side.at.getByRole("button", { name: "Check" }));
    same(`question ${i + 1} right checked`);
    await act(async () => vi.advanceTimersByTime(1500));
  }
  expect(sides[1].done.mock.calls, `level ${level}, seed ${seed}: completion`).toEqual(sides[0].done.mock.calls);
  expect(sides[0].done).toHaveBeenCalledTimes(1);
  for (const side of sides) side.view.unmount();
}

/** Clear any earlier attempt, then enter a right or wrong answer. */
function answer(at, q, right) {
  if (q.kind === "sort") {
    for (const placed of at.queryAllByRole("button", { name: /Tap to take it out$/ })) fireEvent.click(placed);
    const binLabel = (id) => q.bins.find((bin) => bin.id === id).label;
    q.cards.forEach((card, i) => {
      const bin = right || i > 0 ? card.bin : q.bins.find((b) => b.id !== card.bin).id;
      fireEvent.click(at.getByRole("button", { name: card.label }));
      fireEvent.click(at.getByRole("button", { name: binLabel(bin) }));
    });
  } else if (q.kind === "build") {
    for (const placed of at.queryAllByRole("button", { name: /tap to take it back$/ })) fireEvent.click(placed);
    const answerTiles = [];
    let rest = q.answer;
    while (rest) {
      const tile = q.tiles.find((t) => rest.startsWith(t.label) && !answerTiles.includes(t) && (rest === t.label || q.tiles.some((u) => rest.slice(t.label.length).startsWith(u.label))));
      answerTiles.push(tile);
      rest = rest.slice(tile.label.length);
    }
    // Spare tiles if there are any; otherwise every tile in a wrong order.
    const spare = q.tiles.filter((t) => !answerTiles.includes(t)).slice(0, 2);
    const wrong = spare.length > 1 ? spare : spare.length ? [spare[0], answerTiles[0]] : [...answerTiles.slice(1), answerTiles[0]];
    if (!spare.length && wrong.map((t) => t.label).join("") === q.answer) wrong.reverse();
    for (const tile of right ? answerTiles : wrong) fireEvent.click(at.getAllByRole("button", { name: tile.label }).find((b) => !b.disabled));
  } else if (q.kind === "type") {
    for (let i = 0; i < 20; i++) {
      const del = at.queryByRole("button", { name: "Delete the last letter" });
      if (!del || del.disabled) break;
      fireEvent.click(del);
    }
    for (const letter of right ? q.answer.toLowerCase() : "zz") fireEvent.click(at.getByRole("button", { name: letter }));
  } else {
    const option = right ? q.answer : q.options.filter((o) => o !== q.answer).at(-1);
    fireEvent.click(at.getByRole("button", { name: String(option) }));
  }
}

function partial(at, q) {
  if (q.kind === "build") {
    const tray = at.getByRole("group", { name: "Tiles to use" });
    const next = within(tray).getAllByRole("button").find((b) => !b.disabled);
    if (next) fireEvent.click(next);
  }
  else if (q.kind === "type") fireEvent.click(at.getByRole("button", { name: q.answer[0].toLowerCase() }));
  else if (q.kind === "sort") {
    fireEvent.click(at.getByRole("button", { name: q.cards[0].label }));
    fireEvent.click(at.getByRole("button", { name: q.bins.find((bin) => bin.id === q.cards[0].bin).label }));
  }
}

/**
 * One version alone: every question takes a wrong answer (feedback, no hint),
 * a second wrong answer (the hint appears), then the right one; the run must
 * complete exactly once, with the combo payload.
 */
export async function playThrough({ Game, bank, levels = [1, 2, 3, 4], seeds = [1, 2] }) {
  vi.useFakeTimers();
  try {
    for (const level of levels) for (const seed of seeds) {
      const side = mount(Game, level, seed);
      for (const [i, q] of bank(level, seededRng(seed)).entries()) {
        const where = `level ${level}, seed ${seed}, question ${i + 1}`;
        for (const miss of [1, 2]) {
          answer(side.at, q, false);
          fireEvent.click(side.at.getByRole("button", { name: "Check" }));
          await act(async () => vi.advanceTimersByTime(1500));
          expect(Boolean(side.at.queryByRole("note")), `${where}: hint after ${miss} misses`).toBe(miss >= 2);
        }
        answer(side.at, q, true);
        fireEvent.click(side.at.getByRole("button", { name: "Check" }));
        await act(async () => vi.advanceTimersByTime(1500));
      }
      expect(side.done, `level ${level}, seed ${seed}`).toHaveBeenCalledTimes(1);
      expect(side.done.mock.calls[0][0], `level ${level}, seed ${seed}`).toHaveProperty("combos");
      side.view.unmount();
    }
  } finally {
    vi.useRealTimers();
  }
}
