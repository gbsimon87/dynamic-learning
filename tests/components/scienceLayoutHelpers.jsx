import { expect } from "vitest";

export const before = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

// Every science round reads (figure) -> (clue) -> prompt -> answer controls -> Check, inside one ScienceRound,
// so the question always sits directly above its answers.
export function expectScienceLayout(container, { check = "Check" } = {}) {
  const root = container.querySelector(".science-round");
  expect(root, "renders a ScienceRound").toBeTruthy();
  expect(container.querySelector(".challenge-container").classList.contains("is-wide")).toBe(true);
  const prompt = root.querySelector(".science-round-prompt");
  const answer = root.querySelector(".science-round-answer");
  const button = root.querySelector(".submit-btn");
  expect(button, `a "${check}" button`).toBeTruthy();
  expect(before(prompt, answer)).toBe(true);
  expect(before(answer, button)).toBe(true);
  const evidence = root.querySelectorAll(".science-round-evidence");
  expect(evidence.length).toBeLessThanOrEqual(1);
  if (evidence[0]) expect(before(evidence[0], prompt)).toBe(true);
  const stage = root.querySelector(".science-round-stage");
  if (stage) expect(before(stage, prompt)).toBe(true);
  // One feedback line only, and it comes after Check.
  const status = container.querySelectorAll(".challenge-feedback");
  expect(status).toHaveLength(1);
  expect(before(button, status[0])).toBe(true);
  // Nothing from the old flat layout survives next to the round.
  expect(container.querySelector(".science-gloss")).toBeNull();
  return { root, prompt, answer, check: button };
}
