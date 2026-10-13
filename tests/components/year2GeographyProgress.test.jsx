import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { useProgress } from "../../src/hooks/useProgress";
import { year2GeographyCurriculum } from "../../src/data/year2GeographyCurriculum";

const fake = vi.hoisted(() => ({ getProgress: vi.fn(), saveProgress: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: fake }));
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };
const category = year2GeographyCurriculum[0], topic = category.topics[0];
const tree = (...completedChallenges) => ({ [category.id]: { topics: { [topic.id]: { completedChallenges } } } });
beforeEach(() => {
  fake.getProgress.mockReset();
  fake.saveProgress.mockReset().mockImplementation(async (childId, year, subject, data) => ({ childId, year, subject, data }));
});
afterEach(cleanup);

it("Year 2 cannot save before hydration or accept another child's delayed load", async () => {
  const oldLoad = deferred(), nextLoad = deferred(); let childId = "y2-review-old-load";
  fake.getProgress.mockImplementation(id => id === "y2-review-old-load" ? oldLoad.promise : nextLoad.promise);
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: childId } }}>{children}</AuthContext.Provider>;
  const { result, rerender } = renderHook(() => useProgress(2, "geography"), { wrapper: Wrapper });
  act(() => result.current.completeChallenge(category.id, topic.id, 1));
  expect(fake.saveProgress).not.toHaveBeenCalled();
  childId = "y2-review-new-load"; rerender();
  await act(async () => oldLoad.resolve({ data: tree(1, 2, 3) }));
  expect(result.current.hydrated).toBe(false);
  await act(async () => nextLoad.resolve({ data: tree(1) }));
  expect(result.current.progress).toEqual(tree(1));
  expect(fake.saveProgress).not.toHaveBeenCalled();
  act(() => result.current.completeChallenge(category.id, topic.id, "2"));
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledWith("y2-review-new-load", 2, "geography", tree(1, 2)));
});

it("Year 2 save acknowledgement cannot replace the incoming profile's progress", async () => {
  const acknowledgement = deferred(); let childId = "y2-review-outgoing";
  fake.getProgress.mockImplementation(async id => ({ data: id === "y2-review-outgoing" ? tree(1) : {} }));
  fake.saveProgress.mockReturnValue(acknowledgement.promise);
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: childId } }}>{children}</AuthContext.Provider>;
  const { result, rerender } = renderHook(() => useProgress(2, "geography"), { wrapper: Wrapper });
  await waitFor(() => expect(result.current.hydrated).toBe(true));
  act(() => result.current.completeChallenge(category.id, topic.id, 2));
  await waitFor(() => expect(fake.saveProgress).toHaveBeenCalledTimes(1));
  childId = "y2-review-incoming"; rerender();
  await waitFor(() => expect(result.current.hydrated && Object.keys(result.current.progress).length === 0).toBe(true));
  await act(async () => acknowledgement.resolve({ data: tree(1, 2) }));
  expect(result.current.progress).toEqual({});
  expect(fake.saveProgress).toHaveBeenCalledTimes(1);
  expect(fake.saveProgress.mock.calls[0].slice(0, 3)).toEqual(["y2-review-outgoing", 2, "geography"]);
});

it("Year 2 read failures remain unwritable until an explicit successful retry", async () => {
  fake.getProgress.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ data: tree(1) });
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: "y2-review-read-retry" } }}>{children}</AuthContext.Provider>;
  const { result } = renderHook(() => useProgress(2, "geography"), { wrapper: Wrapper });
  await waitFor(() => expect(result.current.loadError).toBe(true));
  act(() => result.current.completeChallenge(category.id, topic.id, 2));
  expect(fake.saveProgress).not.toHaveBeenCalled();
  act(() => result.current.retryLoad());
  await waitFor(() => expect(result.current.hydrated).toBe(true));
  expect(result.current.progress).toEqual(tree(1));
  expect(fake.saveProgress).not.toHaveBeenCalled();
});

it("Year 2 remount and replay preserve saved siblings and numeric completions", async () => {
  const sibling = category.topics[1];
  let stored = { [category.id]: { topics: {
    [topic.id]: { completedChallenges: [1], note: "preserve existing metadata" },
    [sibling.id]: { completedChallenges: [1, 2] },
  } } };
  fake.getProgress.mockImplementation(async () => ({ data: stored }));
  fake.saveProgress.mockImplementation(async (childId, year, subject, data) => { stored = data; return { childId, year, subject, data }; });
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: "y2-review-remount" } }}>{children}</AuthContext.Provider>;
  const first = renderHook(() => useProgress(2, "geography"), { wrapper: Wrapper });
  await waitFor(() => expect(first.result.current.hydrated).toBe(true));
  for (const id of ["2", "3", "4"]) act(() => first.result.current.completeChallenge(category.id, topic.id, id));
  await waitFor(() => expect(stored[category.id].topics[topic.id].completedChallenges).toEqual([1, 2, 3, 4]));
  first.unmount();
  const second = renderHook(() => useProgress(2, "geography"), { wrapper: Wrapper });
  await waitFor(() => expect(second.result.current.hydrated).toBe(true));
  expect(second.result.current.isTopicComplete(category.id, topic.id, topic)).toBe(true);
  expect(second.result.current.progress[category.id].topics[sibling.id].completedChallenges).toEqual([1, 2]);
  expect(second.result.current.progress[category.id].topics[topic.id].note).toBe("preserve existing metadata");
  const writes = fake.saveProgress.mock.calls.length;
  act(() => second.result.current.completeChallenge(category.id, topic.id, 4));
  expect(fake.saveProgress).toHaveBeenCalledTimes(writes);
});
