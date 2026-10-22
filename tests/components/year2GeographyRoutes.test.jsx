import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import ProblemView from "../../src/pages/curriculum/ProblemView";
import { year2GeographyCurriculum } from "../../src/data/year2GeographyCurriculum";
import { YEAR2_GEOGRAPHY_BUILDERS } from "../../src/data/challenges/geography/year2/index";

const fake = vi.hoisted(() => ({ getProgress: vi.fn(), saveProgress: vi.fn(), award: vi.fn(), refresh: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: { getProgress: fake.getProgress, saveProgress: fake.saveProgress } }));
vi.mock("../../src/hooks/useRewards", () => ({ useRewards: () => ({ award: fake.award, refresh: fake.refresh }) }));
vi.mock("../../src/hooks/useOtherSubjectsProgress", () => ({ useOtherSubjectsProgress: () => [] }));
vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ preloadSounds: () => {}, playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
beforeEach(() => {
  // Exercise normal learner gates, independently of the owner's opt-in local review setting.
  vi.stubEnv("VITE_UNLOCK_ALL", "false");
  fake.getProgress.mockReset().mockResolvedValue(null);
  fake.saveProgress.mockReset().mockImplementation(async (childId, year, subject, data) => ({ childId, year, subject, data }));
  fake.award.mockReset().mockReturnValue(null); fake.refresh.mockClear();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); vi.unstubAllEnvs(); });
const category = year2GeographyCurriculum[0], topic = category.topics[0];
const showRoute = (tail, childId) => render(<AuthContext.Provider value={{ child: { _id: childId, name: "Review learner" } }}>
  <MemoryRouter initialEntries={[`/year/2/geography/problem/${tail}`]}><Routes>
    <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} />
    <Route path="/curriculum/year/2/geography" element={<p>Year 2 topics</p>} />
  </Routes></MemoryRouter>
</AuthContext.Provider>);

it("Year 2 locked, missing and inherited route identifiers never open a run or award progress", async () => {
  for (const [index, tail] of [
    `${category.id}/${topic.id}/2`, `${category.id}/${topic.id}/99`,
    `${category.id}/constructor/1`, `__proto__/${topic.id}/1`,
  ].entries()) {
    const { unmount } = showRoute(tail, `y2-route-denied-${index}`);
    await screen.findByText("Year 2 topics");
    expect(screen.queryByRole("button", { name: "Let's explore!" })).toBeNull();
    expect(fake.saveProgress).not.toHaveBeenCalled();
    expect(fake.award).not.toHaveBeenCalled(); unmount();
  }
});

it("a real Year 2 route saves once after all five answers and opens the next slot", async () => {
  vi.spyOn(Math, "random").mockReturnValue(.375);
  showRoute(`${category.id}/${topic.id}/1`, "y2-route-complete");
  await screen.findByRole("button", { name: "Let's explore!" }, { timeout: 10000 });
  vi.useFakeTimers();
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  const questions = YEAR2_GEOGRAPHY_BUILDERS[topic.id](1, () => .375).questions;
  for (const [index, q] of questions.entries()) {
    if (index === 0) {
      fireEvent.click(screen.getByRole("button", { name: q.options.find(v => v !== q.answer), exact: true }));
      fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
      expect(fake.saveProgress).not.toHaveBeenCalled(); expect(fake.award).not.toHaveBeenCalled();
    }
    fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    if (index < 4) expect(fake.saveProgress).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(1000));
  }
  vi.useRealTimers();
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
  expect(fake.saveProgress.mock.calls[0]).toEqual(["y2-route-complete", "2", "geography", {
    [category.id]: { topics: { [topic.id]: { completedChallenges: [1] } } },
  }]);
  expect(fake.award).toHaveBeenCalledTimes(1);
  expect(fake.award.mock.calls[0][0].earned.some(item => item.level === "year")).toBe(false);
  const next = document.querySelector(`a[href="/year/2/geography/problem/${category.id}/${topic.id}/2"]`);
  expect(next).toBeTruthy(); fireEvent.click(next);
  await screen.findByRole("button", { name: "Let's explore!" }, { timeout: 10000 });
  expect(fake.saveProgress).toHaveBeenCalledTimes(1);
});
