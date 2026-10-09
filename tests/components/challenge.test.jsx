import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router";
import Challenge from "../../src/pages/curriculum/Challenge";

const loaders = vi.hoisted(() => ({ one: vi.fn(), two: vi.fn() }));
vi.mock("../../src/pages/curriculum/challengeModules", () => ({ challengeModules: {
  "../skills/math/challenges/year2/counting/CountingChallenge1.jsx": loaders.one,
  "../skills/math/challenges/year2/counting/CountingChallenge2.jsx": loaders.two,
} }));
beforeEach(() => { loaders.one.mockReset(); loaders.two.mockReset(); vi.spyOn(console, "error").mockImplementation(() => {}); });
afterEach(() => vi.useRealTimers());
function Harness() {
  const navigate = useNavigate();
  return <><button onClick={() => navigate("/year/2/math/problem/numbers/counting/2")}>Next route</button><Challenge onComplete={() => {}} /></>;
}
function mount(id = 1) {
  return render(<MemoryRouter initialEntries={[`/year/2/math/problem/numbers/counting/${id}`]}><Routes>
    <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<Harness />} />
    <Route path="/curriculum/year/:year/:subject" element={<p>Topic picker</p>} />
  </Routes></MemoryRouter>);
}
it("failed fetch stays on the challenge and can retry successfully", async () => {
  loaders.one.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ default: () => <p>Loaded game</p> });
  mount();
  await screen.findByText(/couldn.t load this challenge/);
  expect(screen.queryByText(/not yet available/)).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  await screen.findByText("Loaded game");
  expect(loaders.one).toHaveBeenCalledTimes(2);
});
it("a registered next route clears the previous route's failure", async () => {
  loaders.one.mockRejectedValue(new Error("offline"));
  loaders.two.mockResolvedValue({ default: () => <p>Second game</p> });
  mount();
  await screen.findByText(/couldn.t load this challenge/);
  fireEvent.click(screen.getByRole("button", { name: "Next route" }));
  await screen.findByText("Second game");
  expect(screen.queryByText(/couldn.t load/)).toBeNull();
});
it("only an unregistered module counts down to the topic picker", async () => {
  vi.useFakeTimers();
  mount(9);
  expect(screen.getByText(/not yet available/)).toBeTruthy();
  for (let i = 0; i < 3; i++) await act(async () => vi.advanceTimersByTime(1000));
  vi.useRealTimers();
  await waitFor(() => expect(screen.getByText("Topic picker")).toBeTruthy());
});
