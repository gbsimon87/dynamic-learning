import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router";
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

it("the last Year 3 History run waits for other subjects before it can earn the year", async () => {
  const year = 3, subject = "history";
  const category = loadCurriculum(year, subject).at(-1), topic = category.topics.at(-1);
  const data = completeTree(year, subject);
  data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  let finishReads;
  const pending = new Promise((resolve) => { finishReads = resolve; });
  fake.getProgress.mockImplementation(async (_id, _year, requested) => {
    if (requested !== subject) await pending;
    return { schemaVersion: 1, data: requested === subject ? data : completeTree(year, requested) };
  });
  render(<AuthContext.Provider value={{ child: { _id: "slow-year3-history", name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/${year}/${subject}/problem/${category.id}/${topic.id}/4`]}>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  await waitFor(() => expect(fake.getProgress).toHaveBeenCalledTimes(4));
  await act(async () => {});
  expect(screen.queryByRole("button", { name: "Finish run" })).toBeNull();
  expect(fake.award).not.toHaveBeenCalled();
  expect(fake.saveProgress).not.toHaveBeenCalled();
  await act(async () => { finishReads(); });
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
  expect(fake.award.mock.calls[0][0].earned).toContain("year");
  expect(data[category.id].topics[topic.id].completedChallenges).toEqual([1, 2, 3]);
});

it.each(["failed", "invalid", "array"])("a %s other-subject read is retried before the final History run", async (failure) => {
  const year = 3, subject = "history";
  const category = loadCurriculum(year, subject).at(-1), topic = category.topics.at(-1);
  const data = completeTree(year, subject);
  data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  let retry = false;
  fake.getProgress.mockImplementation(async (_id, _year, requested) => {
    if (requested === "math" && !retry) {
      if (failure === "failed") throw new Error("offline");
      return failure === "array" ? { data: [] } : {};
    }
    return { schemaVersion: 1, data: requested === subject ? data : completeTree(year, requested) };
  });
  render(<AuthContext.Provider value={{ child: { _id: `retry-year3-${failure}`, name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/${year}/${subject}/problem/${category.id}/${topic.id}/4`]}>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  const button = await screen.findByRole("button", { name: "Try again" });
  expect(screen.queryByRole("button", { name: "Finish run" })).toBeNull();
  expect(fake.award).not.toHaveBeenCalled();
  expect(fake.saveProgress).not.toHaveBeenCalled();
  retry = true;
  fireEvent.click(button);
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
  expect(fake.award.mock.calls[0][0].earned).toContain("year");
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
  expect(data[category.id].topics[topic.id].completedChallenges).toEqual([1, 2, 3]);
});

it("an explicitly missing other subject permits History completion without a year award", async () => {
  const category = loadCurriculum(3, "history").at(-1), topic = category.topics.at(-1);
  const data = completeTree(3, "history");
  data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  fake.getProgress.mockImplementation(async (_id, _year, requested) => requested === "math" ? null :
    { data: requested === "history" ? data : completeTree(3, requested) });
  render(<AuthContext.Provider value={{ child: { _id: "year3-unstarted-maths", name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/3/history/problem/${category.id}/${topic.id}/4`]}>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
  expect(fake.award.mock.calls[0][0].earned).toContain("subject");
  expect(fake.award.mock.calls[0][0].earned).not.toContain("year");
});

it.each(["ordinary", "practice", "excluded"])("%s History remains playable while other subjects are loading", async (kind) => {
  const year = kind === "excluded" ? 2 : 3;
  const curriculum = loadCurriculum(year, "history");
  const category = kind === "ordinary" ? curriculum[0] : curriculum.at(-1);
  const topic = kind === "ordinary" ? category.topics[0] : category.topics.at(-1);
  const level = kind === "ordinary" ? 1 : 4;
  const data = kind === "ordinary" ? {} : completeTree(year, "history");
  if (kind === "excluded") data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  fake.getProgress.mockImplementation((_id, _year, requested) => requested === "history" ? Promise.resolve({ data }) : new Promise(() => {}));
  render(<AuthContext.Provider value={{ child: { _id: `history-independent-${kind}`, name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/${year}/history/problem/${category.id}/${topic.id}/${level}`]}>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
  expect(fake.award.mock.calls[0][0].earned).not.toContain("year");
});

it("entering the final History challenge refreshes other subjects completed since the previous run", async () => {
  const curriculum = loadCurriculum(3, "history");
  const first = curriculum[0], firstTopic = first.topics[0];
  const last = curriculum.at(-1), lastTopic = last.topics.at(-1);
  const data = completeTree(3, "history");
  data[first.id].topics[firstTopic.id].completedChallenges = [2, 3, 4];
  data[last.id].topics[lastTopic.id].completedChallenges = [1, 2, 3];
  let mathsDone = false;
  fake.getProgress.mockImplementation(async (_id, _year, requested) => requested === "math" && !mathsDone ? null :
    { data: requested === "history" ? data : completeTree(3, requested) });
  render(<AuthContext.Provider value={{ child: { _id: "refresh-year3-history", name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/3/history/problem/${first.id}/${firstTopic.id}/1`]}>
      <Link to={`/year/3/history/problem/${last.id}/${lastTopic.id}/4`}>Open final run</Link>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
  mathsDone = true;
  fireEvent.click(screen.getByRole("link", { name: "Open final run" }));
  fireEvent.click(await screen.findByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(2));
  expect(fake.award.mock.calls[1][0].earned).toContain("year");
  expect(fake.getProgress.mock.calls.filter((call) => call[2] === "math")).toHaveLength(2);
});

it("a late other-subject read from another profile cannot award the active child's year", async () => {
  const category = loadCurriculum(3, "history").at(-1), topic = category.topics.at(-1);
  const data = completeTree(3, "history");
  data[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  let finishOldReads;
  const pending = new Promise((resolve) => { finishOldReads = resolve; });
  fake.getProgress.mockImplementation(async (id, _year, requested) => {
    if (requested !== "history" && id === "review-child-a") await pending;
    if (id === "review-child-b" && requested === "math") return null;
    return { data: structuredClone(requested === "history" ? data : completeTree(3, requested)) };
  });
  const ui = (id) => <AuthContext.Provider value={{ child: { _id: id, name: "Robin" } }}>
    <MemoryRouter initialEntries={[`/year/3/history/problem/${category.id}/${topic.id}/4`]}>
      <Routes><Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<ProblemView />} /></Routes>
    </MemoryRouter>
  </AuthContext.Provider>;
  const { rerender } = render(ui("review-child-a"));
  await waitFor(() => expect(fake.getProgress).toHaveBeenCalledTimes(4));
  await act(async () => {});
  expect(screen.queryByRole("button", { name: "Finish run" })).toBeNull();
  rerender(ui("review-child-b"));
  await screen.findByRole("button", { name: "Finish run" });
  await act(async () => { finishOldReads(); });
  fireEvent.click(screen.getByRole("button", { name: "Finish run" }));
  await waitFor(() => expect(fake.award).toHaveBeenCalledTimes(1));
  expect(fake.award.mock.calls[0][0].earned).not.toContain("year");
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
  expect(fake.saveProgress.mock.calls[0][0]).toBe("review-child-b");
  expect(data[category.id].topics[topic.id].completedChallenges).toEqual([1, 2, 3]);
});
