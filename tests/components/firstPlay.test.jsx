import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { RewardsContext } from "../../src/context/rewards-context";
import { normaliseRewards } from "../../src/data/rewardsShape";
import RequireChild from "../../src/components/RequireChild";
import BrainBreak from "../../src/components/brainBreak/BrainBreak";
import { setBreakMinutes } from "../../src/components/brainBreak/breakSetting";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));

function guardedTree(value, { isLearner = false, childId = "c1" } = {}) {
  return (
    <AuthContext.Provider value={{ status: "ready", isLearner, child: { _id: childId, name: "Ada" } }}>
      <RewardsContext.Provider value={value}>
        <MemoryRouter initialEntries={["/curriculum"]}>
          <Routes>
            <Route element={<RequireChild />}>
              <Route path="/curriculum" element={<p>topics</p>} />
              <Route path="/hello" element={<p>intro</p>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </RewardsContext.Provider>
    </AuthContext.Provider>
  );
}

function guarded(rewards, options) {
  const value = { status: "ready", hydrated: true, rewards: normaliseRewards(rewards), pendingBackfill: 0 };
  return render(guardedTree(value, options));
}

describe("first play", () => {
  it("sends a child who has never played to Bix's intro", () => {
    guarded(null);
    expect(screen.getByText("intro")).toBeTruthy();
  });

  it("lets a child who has played, or has done the intro, straight through", () => {
    guarded({ xp: 10 });
    expect(screen.getByText("topics")).toBeTruthy();
    guarded({ intro: { done: true } });
    expect(screen.getAllByText("topics")).toHaveLength(2);
  });

  it("waits only for the first read: a later re-read never blanks the page (no remount loop)", () => {
    const fresh = normaliseRewards(null);
    const at = (status) => ({ status, hydrated: status === "ready", rewards: fresh, pendingBackfill: null });
    const { rerender } = render(guardedTree(at("loading"), { childId: "loop-child" }));
    expect(screen.queryByText("topics")).toBeNull();
    rerender(guardedTree(at("failed"), { childId: "loop-child" }));
    expect(screen.getByText("topics")).toBeTruthy();
    rerender(guardedTree(at("loading"), { childId: "loop-child" }));
    expect(screen.getByText("topics")).toBeTruthy();
  });

  it("never sends a learner account to the intro", () => {
    guarded(null, { isLearner: true });
    expect(screen.getByText("topics")).toBeTruthy();
  });
});

describe("brain breaks", () => {
  afterEach(() => {
    vi.useRealTimers();
    setBreakMinutes(15);
  });

  const mount = (path = "/skills") =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <BrainBreak />
      </MemoryRouter>
    );

  // Keep "playing": a tap every 30 seconds, so the idle rule never stops the count.
  const play = (minutes) => {
    for (let s = 0; s < minutes * 60; s += 30) {
      fireEvent.pointerDown(window);
      act(() => vi.advanceTimersByTime(30_000));
    }
  };

  it("offers a break after the interval of active play, and Not now restarts the count", () => {
    vi.useFakeTimers();
    setBreakMinutes(10);
    mount();
    play(9.5);
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
    play(1);
    expect(screen.getByText(/Time for a brain break/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
    play(5);
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
  });

  it("does not count time with no taps, and runs a break to the end", () => {
    vi.useFakeTimers();
    setBreakMinutes(10);
    mount();
    act(() => vi.advanceTimersByTime(30 * 60_000));
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
    play(11);
    fireEvent.click(screen.getByRole("button", { name: "Let’s move!" }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /I did it/ }));
    expect(screen.getByText(/Brilliant moving/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Back to playing/ }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("never runs when off, or on a grown-up page", () => {
    vi.useFakeTimers();
    setBreakMinutes(null);
    const { unmount } = mount();
    play(40);
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
    unmount();
    setBreakMinutes(10);
    mount("/parent");
    play(40);
    expect(screen.queryByText(/Time for a brain break/)).toBeNull();
  });
});
