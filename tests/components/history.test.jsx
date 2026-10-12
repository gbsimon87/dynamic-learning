import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildHistoryTopic } from "../../src/data/challenges/history/engine";
import { HISTORY_TEST_TOPIC } from "../../src/data/challenges/history/testTopic";
import { seededRng } from "../../src/data/challenges/questionKinds";
import HistoryChallenge from "../../src/components/challenge/history/HistoryChallenge";
import SourceVisual from "../../src/components/challenge/history/SourceVisual";
import { YEAR1_HISTORY_BUILDERS } from "../../src/data/challenges/history/year1/index";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const build = buildHistoryTopic(HISTORY_TEST_TOPIC);
const show = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const settle = () => act(() => { vi.advanceTimersByTime(1000); });

describe("HistoryChallenge", () => {
  it("opens on Bix's story, then starts the rounds", () => {
    show(<HistoryChallenge build={build} year={1} level={1} onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    expect(screen.getByText("Grandparents had wooden trains.")).toBeTruthy();
    expect(screen.queryByText("Question 1 of 4")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    expect(screen.getByText("Question 1 of 4")).toBeTruthy();
    expect(screen.getByText("Meet it")).toBeTruthy();
  });

  it("keeps the chosen answer while the story opens and closes", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockImplementation(seededRng(4));
    const expected = build(1, seededRng(4)).questions;
    show(<HistoryChallenge build={build} year={1} level={1} onComplete={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    const first = expected[0];
    expect(first.kind).toBe("choice");
    fireEvent.click(screen.getByRole("button", { name: first.answer, exact: true }));
    const toggle = screen.getByRole("button", { name: "📖 Bix's story" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    settle();
    expect(screen.getByText("Question 2 of 4")).toBeTruthy();
  });

  it("draws a source round's photo with its alt text and credit, in both themes", () => {
    for (const theme of ["light", "dark"]) {
      document.body.classList.toggle("dark", theme === "dark");
      const { unmount } = show(<HistoryChallenge build={build} year={1} level={3} onComplete={vi.fn()} />);
      expect(screen.getByRole("img", { name: /holding a drum and two drumsticks/ })).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
      expect(screen.getAllByRole("img", { name: /holding a drum/ }).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Cleveland Museum of Art, CC0/).length).toBeGreaterThan(0);
      unmount();
    }
  });
});

describe("SourceVisual", () => {
  it("an unknown picture shows a note instead of crashing", () => {
    show(<SourceVisual image="no-such-picture" />);
    expect(screen.getByRole("note").textContent).toMatch(/picture could not load/i);
  });

  it("links the credits page", () => {
    show(<SourceVisual image="cma-two-children-with-toys" />);
    const figure = screen.getByRole("figure");
    expect(within(figure).getByRole("link", { name: "All credits" }).getAttribute("href")).toBe("/credits");
  });
});

const challengeModules = import.meta.glob("../../src/pages/skills/history/challenges/year1/*/*Challenge*.jsx", { eager: true });

describe("Year 1 History pilot", () => {
  it("loads all four Toys Then and Now challenges", () => {
    const toys = Object.entries(challengeModules).filter(([path]) => path.includes("/toys-then-and-now/"));
    expect(toys).toHaveLength(4);
    for (const [, { default: Challenge }] of toys) {
      const { unmount } = show(<Challenge onComplete={vi.fn()} />);
      fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
      expect(screen.getByText("Question 1 of 4")).toBeTruthy();
      unmount();
    }
  });

  it("plays challenge 1 through: two misses show the hint, completion fires once", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockImplementation(seededRng(5));
    const expected = YEAR1_HISTORY_BUILDERS["toys-then-and-now"](1, seededRng(5)).questions;
    const done = vi.fn();
    const { default: Challenge } = challengeModules["../../src/pages/skills/history/challenges/year1/toys-then-and-now/ToysThenAndNowChallenge1.jsx"];
    show(<Challenge onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expected.forEach((q, i) => {
      expect(screen.getByText(`Question ${i + 1} of 4`)).toBeTruthy();
      if (q.kind === "choice") {
        if (i === 0) {
          const wrong = q.options.find((o) => o !== q.answer);
          for (let miss = 0; miss < 2; miss++) {
            fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
            check();
          }
          expect(document.querySelector(".challenge-hint")).toBeTruthy();
        }
        fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
      } else {
        for (const card of q.cards) {
          fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
          fireEvent.click(screen.getByRole("button", { name: q.bins.find((b) => b.id === card.bin).label, exact: true }));
        }
      }
      expect(done).not.toHaveBeenCalled();
      check();
      settle();
    });
    expect(done).toHaveBeenCalledTimes(1);
  });
});
