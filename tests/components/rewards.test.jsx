import { act, renderHook, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { RewardsContext } from "../../src/context/rewards-context";
import { RewardsProvider } from "../../src/context/RewardsContext";

const fake = vi.hoisted(() => ({ getRewards: vi.fn(), saveRewards: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: fake }));
vi.mock("../../src/data/resumeCandidates", () => ({ loadResumeCandidates: async () => [] }));
const input = { today: "2026-10-09", at: "2026-10-09T12:00:00Z", firstTime: true, earned: ["challenge"], year: 2, subject: "math" };
beforeEach(() => { fake.getRewards.mockReset(); fake.saveRewards.mockReset().mockImplementation(async (_id, data) => ({ data })); });
it("queues an award until hydration and never saves a default over existing rewards", async () => {
  let resolve;
  fake.getRewards.mockReturnValue(new Promise((done) => { resolve = done; }));
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: "queued-reward-child" } }}><RewardsProvider>{children}</RewardsProvider></AuthContext.Provider>;
  const { result } = renderHook(() => useContext(RewardsContext), { wrapper: Wrapper });
  act(() => result.current.award(input));
  expect(fake.saveRewards).not.toHaveBeenCalled();
  await act(async () => resolve({ data: { xp: 100, xpBackfilled: true, badges: [{ id: "existing" }] } }));
  await waitFor(() => expect(fake.saveRewards).toHaveBeenCalledTimes(1));
  expect(fake.saveRewards.mock.calls[0][1].badges.map((badge) => badge.id)).toContain("existing");
  expect(result.current.xp).toBe(110);
});
it("child switching ignores the outgoing read and never writes across profiles", async () => {
  let resolveOld;
  let child = "old-reward-child";
  fake.getRewards.mockImplementation((id) => id === "old-reward-child" ? new Promise((done) => { resolveOld = done; }) : Promise.resolve({ data: { xp: 20, xpBackfilled: true } }));
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: child } }}><RewardsProvider>{children}</RewardsProvider></AuthContext.Provider>;
  const { result, rerender } = renderHook(() => useContext(RewardsContext), { wrapper: Wrapper });
  child = "new-reward-child";
  rerender();
  await waitFor(() => expect(result.current.status).toBe("ready"));
  await act(async () => resolveOld({ data: { xp: 999, xpBackfilled: true } }));
  expect(result.current.xp).toBe(20);
  expect(fake.saveRewards).not.toHaveBeenCalled();
});
it("read failure blocks writes; retry drains the queued run against saved rewards", async () => {
  fake.getRewards.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ data: { xp: 40, xpBackfilled: true } });
  const Wrapper = ({ children }) => <AuthContext.Provider value={{ child: { _id: "failed-reward-child" } }}><RewardsProvider>{children}</RewardsProvider></AuthContext.Provider>;
  const { result } = renderHook(() => useContext(RewardsContext), { wrapper: Wrapper });
  await waitFor(() => expect(result.current.status).toBe("failed"));
  expect(fake.saveRewards).not.toHaveBeenCalled();
  act(() => result.current.award(input));
  await waitFor(() => expect(result.current.status).toBe("ready"));
  expect(result.current.xp).toBe(50);
  expect(fake.saveRewards.mock.calls[0][0]).toBe("failed-reward-child");
});
