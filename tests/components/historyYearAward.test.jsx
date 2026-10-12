import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { loadCurriculum, yearAwardSubjectIds } from "../../src/data/curriculumRegistry";
import ProblemView from "../../src/pages/curriculum/ProblemView";

const fake = vi.hoisted(() => ({ getProgress: vi.fn(), saveProgress: vi.fn(), award: vi.fn(), refresh: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: fake }));
vi.mock("../../src/hooks/useRewards", () => ({ useRewards: () => ({ award: fake.award, refresh: fake.refresh }) }));
vi.mock("../../src/components/celebration/sound/player", () => ({ preloadSounds: () => {} }));
// Exercise the real route, progress hook, subject reads and milestone handler.
// Game correctness and exactly-once callbacks have their own full-run tests.
vi.mock("../../src/pages/curriculum/Challenge", () => ({ default: ({ onComplete }) => <button onClick={() => onComplete({ combos: 1 })}>Finish run</button> }));
vi.mock("../../src/components/celebration/CompletionCelebration", () => ({ default: ({ result }) => <p>{result.earned.join(",")}</p> }));

function completeTree(year, subject) {
  return Object.fromEntries(loadCurriculum(year, subject).map((category) => [category.id, {
    topics: Object.fromEntries(category.topics.map((topic) => [topic.id, { completedChallenges: [1, 2, 3, 4] }])),
  }]));
}

beforeEach(() => {
  fake.getProgress.mockReset();
  fake.saveProgress.mockReset().mockImplementation(async (_id, _year, _subject, data) => ({ data }));
  fake.award.mockReset().mockReturnValue(null);
  fake.refresh.mockReset();
});

for (const [year, subject, earnsYear] of [[4, "history", false], [2, "history", false], [3, "history", true], [4, "science", true]]) {
  it(`Year ${year} ${subject}: finishing the subject ${earnsYear ? "earns" : "does not re-award"} the year when other required subjects are done`, async () => {
    const data = completeTree(year, subject);
    const category = loadCurriculum(year, subject).at(-1), topic = category.topics.at(-1);
    data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
    const otherSubjects = yearAwardSubjectIds(year, subject);
    const stored = Object.fromEntries(otherSubjects.map((other) => [other, completeTree(year, other)]));
    stored[subject] = data;
    const before = structuredClone(stored);
    fake.getProgress.mockImplementation(async (_id, _year, requested) => ({ schemaVersion: 1, data: structuredClone(stored[requested]) }));
    render(<AuthContext.Provider value={{ child: { _id: `award-${year}-${subject}`, name: "Robin" } }}>
      <MemoryRouter initialEntries={[`/year/${year}/${subject}/problem/${category.id}/${topic.id}/4`]}>
        <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
      </MemoryRouter>
    </AuthContext.Provider>);
    await screen.findByRole("button", { name: "Finish run" });
    await waitFor(() => expect(fake.getProgress).toHaveBeenCalledTimes(otherSubjects.length + 1));
    // Let all read promises reach the component before completing the run.
    await act(async () => {});
    fireEvent.click(screen.getByRole("button", { name: "Finish run" }));
    await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
    const earned = fake.award.mock.calls[0][0].earned;
    expect(earned).toContain("subject");
    expect(earned.includes("year")).toBe(earnsYear);
    await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
    expect(fake.saveProgress.mock.calls[0].slice(0, 3)).toEqual([`award-${year}-${subject}`, String(year), subject]);
    expect(fake.saveProgress.mock.calls[0][3][category.id].topics[topic.id].completedChallenges).toEqual([1, 2, 3, 4]);
    expect(stored).toEqual(before);
  });
}
