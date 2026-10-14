import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import Challenge from "../../src/pages/curriculum/Challenge";

const loaders = vi.hoisted(() => ({ tenths: vi.fn(), year2: vi.fn() }));
vi.mock("../../src/pages/curriculum/challengeModules", () => ({ challengeModules: {
  "../skills/math/challenges/year3/tenths/TenthsChallenge1.jsx": loaders.tenths,
  "../skills/math/challenges/year2/counting/CountingChallenge1.jsx": loaders.year2,
} }));
beforeEach(() => {
  const game = { default: ({ onComplete }) => <><h3 className="challenge-title">The game</h3><button onClick={() => onComplete({ combos: 0 })}>Finish</button></> };
  loaders.tenths.mockResolvedValue(game);
  loaders.year2.mockResolvedValue(game);
});
function mount(path, onComplete = () => {}) {
  return render(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<Challenge onComplete={onComplete} />} />
  </Routes></MemoryRouter>);
}

it("a challenge with a lesson opens on Bix's tips, then plays and completes as before", async () => {
  const onComplete = vi.fn();
  mount("/year/3/math/problem/number---fractions/tenths/1", onComplete);
  await screen.findByRole("heading", { name: "Read tenths on a bar" });
  expect(screen.getByText("Maths · Challenge 1 of 4")).toBeTruthy();
  expect(screen.getByText("A tenth is 1 of 10 equal parts.")).toBeTruthy();
  expect(screen.queryByText("The game")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: /Let's go/ }));
  expect(await screen.findByText("The game")).toBeTruthy();
  const tips = screen.getByRole("button", { name: /Bix's tips/ });
  fireEvent.click(tips);
  expect(tips.getAttribute("aria-expanded")).toBe("true");
  fireEvent.click(screen.getByRole("button", { name: "Back to my question" }));
  expect(screen.queryByText("Back to my question")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Finish" }));
  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledWith({ combos: 0 });
});

it("a challenge with no lesson starts straight away", async () => {
  mount("/year/2/math/problem/numbers/counting/1");
  expect(await screen.findByText("The game")).toBeTruthy();
  expect(screen.queryByRole("button", { name: /Let's go/ })).toBeNull();
});

it("draws English examples with the key words marked and the fix in words, not colour alone", async () => {
  const { default: LessonExample } = await import("../../src/components/challenge/lesson/LessonExample");
  const { container } = render(<><LessonExample example={{ type: "sentence", title: "Look", text: "We stayed in **because** it rained." }} />
    <LessonExample example={{ type: "fix", title: "Fix it", wrong: "I seen it.", right: "I have seen it." }} /></>);
  expect(container.querySelector("mark").textContent).toBe("because");
  expect(screen.getByText("Not this:")).toBeTruthy();
  expect(screen.getByText("I have seen it.", { exact: false })).toBeTruthy();
});
