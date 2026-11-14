import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { RewardsContext } from "../../src/context/rewards-context";
import { normaliseRewards } from "../../src/data/rewardsShape";
import Navbar from "../../src/components/ui/Navbar";
import Profiles from "../../src/pages/auth/Profiles";

const fake = vi.hoisted(() => ({ getRewards: vi.fn(), saveRewards: vi.fn(), saveProgress: vi.fn(), loadCandidates: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: fake }));
vi.mock("../../src/data/resumeCandidates", () => ({ loadResumeCandidates: (...args) => fake.loadCandidates(...args) }));

const ada = { _id: "ada", name: "Ada", avatar: "🐼", colour: "--profile-colour-sky" };
const ben = { _id: "ben", name: "Ben", avatar: "🦊", colour: "--profile-colour-mint" };
const today = "2026-11-14";
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
};
const saved = (xp = 100, current = 3) => ({ data: {
  xp, xpBackfilled: true,
  streak: { current, best: current, lastDay: today },
} });

function completedCurriculum(subject, count) {
  const ids = Array.from({ length: count }, (_, i) => i + 1);
  return {
    year: 2, subject, subjectName: subject === "math" ? "Maths" : "English",
    updatedAt: subject === "math" ? today : "2026-11-13",
    curriculum: [{ id: "number", title: "Number", topics: [{ id: "counting", name: "Counting", challenges: ids.map((id) => ({ id, title: `Challenge ${id}` })) }] }],
    progress: { number: { topics: { counting: { completedChallenges: ids } } } },
    isBuilt: () => true,
  };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-14T12:00:00Z"));
  fake.getRewards.mockReset().mockImplementation(async (id) => id === "ada" ? saved() : saved(0, 0));
  fake.loadCandidates.mockReset().mockResolvedValue([]);
  fake.saveRewards.mockReset();
  fake.saveProgress.mockReset();
});
afterEach(() => { vi.useRealTimers(); });

function tree(auth = {}, selectChild = vi.fn()) {
  const activeRewards = normaliseRewards({ ...saved(1000, 25).data, news: { badges: ["new-badge"] } });
  return (
    <AuthContext.Provider value={{ status: "needsChild", children: [ada, ben], selectChild, ...auth }}>
      <RewardsContext.Provider value={{ hydrated: true, rewards: activeRewards, xp: 1000 }}>
        <MemoryRouter initialEntries={["/profiles"]}>
          <Navbar />
          <Routes>
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/curriculum" element={<h1>Learning destination</h1>} />
          </Routes>
        </MemoryRouter>
      </RewardsContext.Provider>
    </AuthContext.Provider>
  );
}
const card = (name) => screen.getByRole("button", { name: new RegExp("^" + name) });

it("shows each child's own level and streak even before a profile is selected", async () => {
  render(tree());
  await waitFor(() => expect(within(card("Ada")).getByText("Level 2")).toBeTruthy());
  expect(within(card("Ada")).getByText("3-day streak")).toBeTruthy();
  expect(within(card("Ben")).getByText("Level 1")).toBeTruthy();
  expect(within(card("Ben")).getByText("No streak yet")).toBeTruthy();
  expect(within(card("Ben")).queryByText("3-day streak")).toBeNull();
  expect(fake.saveRewards).not.toHaveBeenCalled();
  expect(fake.saveProgress).not.toHaveBeenCalled();
});

it("removes all navbar level and streak indicators while preserving trophy news and profile switching", async () => {
  render(tree({ status: "ready", child: ada }));
  await waitFor(() => expect(within(card("Ada")).getByText("Level 2")).toBeTruthy());
  const nav = screen.getByRole("navigation", { name: "Main" });
  expect(nav.textContent).not.toMatch(/🔥|streak|Level|Lv/);
  expect(within(nav).getByRole("link", { name: "Trophy Room, new trophies to see" }).getAttribute("href")).toBe("/trophies");
  const switcher = within(nav).getByTitle("Playing as Ada - tap to switch");
  expect(switcher.getAttribute("href")).toBe("/profiles");
  expect(within(switcher).getByText(ada.avatar)).toBeTruthy();
});

it("waits for saved rewards instead of showing a default level during loading", async () => {
  const pending = deferred();
  fake.getRewards.mockReturnValue(pending.promise);
  render(tree({ children: [ada] }));
  expect(within(card("Ada")).queryByText(/Level|streak/)).toBeNull();
  await act(async () => pending.resolve(saved()));
  expect(within(card("Ada")).getByText("Level 2")).toBeTruthy();
});

it("shows a genuinely new learner's starting level when no rewards document exists", async () => {
  fake.getRewards.mockResolvedValue(null);
  render(tree({ children: [ada] }));
  await waitFor(() => expect(within(card("Ada")).getByText("Level 1")).toBeTruthy());
  expect(within(card("Ada")).getByText("No streak yet")).toBeTruthy();
  expect(fake.saveRewards).not.toHaveBeenCalled();
  expect(fake.saveProgress).not.toHaveBeenCalled();
});

it("includes legacy XP from all curricula without writing a backfill or flashing level 1", async () => {
  const pending = deferred();
  fake.getRewards.mockResolvedValue({ data: { xp: 100, xpBackfilled: false, streak: { current: 3, lastDay: today } } });
  fake.loadCandidates.mockReturnValue(pending.promise);
  render(tree({ children: [ada] }));
  await waitFor(() => expect(within(card("Ada")).getByText("3-day streak")).toBeTruthy());
  expect(within(card("Ada")).queryByText(/Level/)).toBeNull();
  // 10 Maths completions + 5 English completions = 150 legacy XP, plus 100 saved.
  await act(async () => pending.resolve([completedCurriculum("math", 10), completedCurriculum("english", 5)]));
  expect(within(card("Ada")).getByText("Level 3")).toBeTruthy();
  expect(fake.saveRewards).not.toHaveBeenCalled();
  expect(fake.saveProgress).not.toHaveBeenCalled();
});

it("keeps a failed rewards read unknown without hiding a sibling's saved stats", async () => {
  fake.getRewards.mockImplementation(async (id) => {
    if (id === "ada") throw new Error("offline");
    return saved(250, 7);
  });
  render(tree());
  await waitFor(() => expect(within(card("Ben")).getByText("Level 3")).toBeTruthy());
  expect(within(card("Ben")).getByText("7-day streak")).toBeTruthy();
  expect(within(card("Ada")).queryByText(/Level|streak/)).toBeNull();
  expect(card("Ada").disabled).toBe(false);
  expect(fake.saveRewards).not.toHaveBeenCalled();
});

it("hides an unknown legacy level after a progress read fails but retains the saved streak", async () => {
  fake.getRewards.mockResolvedValue({ data: { xp: 100, xpBackfilled: false, streak: { current: 3, lastDay: today } } });
  fake.loadCandidates.mockRejectedValue(new Error("offline"));
  render(tree({ children: [ada] }));
  await waitFor(() => expect(within(card("Ada")).getByText("3-day streak")).toBeTruthy());
  expect(within(card("Ada")).queryByText(/Level/)).toBeNull();
  expect(fake.saveRewards).not.toHaveBeenCalled();
});

it("shows a saved level even when progress is unavailable, and expires stale streaks through the shared rules", async () => {
  fake.getRewards.mockResolvedValue({ data: { ...saved(100, 10).data, streak: { current: 10, best: 10, lastDay: "2026-11-10", freezes: 0 } } });
  fake.loadCandidates.mockRejectedValue(new Error("offline"));
  render(tree({ children: [ada] }));
  await waitFor(() => expect(within(card("Ada")).getByText("Level 2")).toBeTruthy());
  expect(within(card("Ada")).getByText("No streak yet")).toBeTruthy();
});

it("ignores an outgoing family's delayed reads after the profile list changes", async () => {
  const old = deferred();
  fake.getRewards.mockImplementation(async (id) => id === "ada" ? old.promise : saved(0, 0));
  const view = render(tree({ children: [ada] }));
  view.rerender(tree({ children: [ben] }));
  await waitFor(() => expect(within(card("Ben")).getByText("Level 1")).toBeTruthy());
  await act(async () => old.resolve(saved(1000, 25)));
  expect(screen.queryByRole("button", { name: /^Ada/ })).toBeNull();
  expect(within(card("Ben")).getByText("No streak yet")).toBeTruthy();
  expect(within(card("Ben")).queryByText("25-day streak")).toBeNull();
  expect(fake.saveRewards).not.toHaveBeenCalled();
});

it("keeps the entire profile card usable for selecting a child and entering learning", async () => {
  const user = userEvent.setup();
  const selectChild = vi.fn();
  render(tree({}, selectChild));
  await waitFor(() => expect(within(card("Ben")).getByText("Level 1")).toBeTruthy());
  await user.click(within(card("Ben")).getByText("Level 1"));
  expect(selectChild).toHaveBeenCalledExactlyOnceWith("ben");
  expect(await screen.findByRole("heading", { name: "Learning destination" })).toBeTruthy();
});
