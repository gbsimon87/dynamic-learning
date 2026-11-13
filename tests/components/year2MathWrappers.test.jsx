import { render, screen, cleanup } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { seededRng } from "../../src/data/challenges/questionKinds";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));

const wrappers = import.meta.glob("../../src/pages/skills/math/challenges/year2/*/*Challenge[1-4].jsx", { eager: true });

it("all 156 Year 2 Maths wrappers mount their first question with no broken interpolations", () => {
  expect(Object.keys(wrappers)).toHaveLength(156);
  for (const seed of [1, 7, 42]) {
    const random = vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
    for (const [path, { default: Challenge }] of Object.entries(wrappers)) {
      const { container } = render(<MemoryRouter><Challenge onComplete={() => {}} /></MemoryRouter>);
      expect(screen.getByText(/Question 1 of \d/), path).toBeTruthy();
      expect(container.textContent, path).not.toMatch(/undefined|NaN|\[object Object\]/);
      cleanup();
    }
    random.mockRestore();
  }
}, 120000);
