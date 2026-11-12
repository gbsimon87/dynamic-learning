import { describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import JourneyModel from "../../src/components/curriculum/JourneyModel.jsx";
import { validateJourneyModel } from "../../shared/curriculumJourneyModels.js";

const show = (data, alt = "Supplied science observation.") => render(<JourneyModel model={{ renderer: "science", data, alt }} />);

describe("curriculum science observation models", () => {
  it("points to a plant structure without naming the requested part", () => {
    show({ type: "plant", point: "roots" }, "A plant with an arrow below the soil.");
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/thin parts under the soil/);
    expect(screen.queryByText(/^roots$/i)).toBeNull();
  });
  it("keeps a missing food-chain word out of the public model and renders a gap", () => {
    const model = { renderer: "science", data: { type: "chain", links: ["grass", "?", "fox"], gap: 1 }, alt: "A food chain with its middle box missing." };
    const { container } = render(<JourneyModel model={model} />);
    expect(container.querySelectorAll(".is-missing")).toHaveLength(1);
    expect(container.textContent).not.toContain("rabbit");
    expect(() => validateJourneyModel({ ...model, data: { type: "chain", links: ["grass", "rabbit", "fox"], gap: 1 } })).toThrow("INVALID_MODEL");
  });
  it("draws pots from the supplied observations and rejects unsupported states", () => {
    const { container } = show({ type: "pots", plants: ["pale", "healthy"] });
    expect(container.querySelector('[data-plant="A"]').getAttribute("data-state")).toBe("pale");
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/Plant A has pale/);
    expect(() => validateJourneyModel({ renderer: "science", data: { type: "pots", plants: ["wilting", "healthy"] }, alt: "Pots" })).toThrow("INVALID_MODEL");
  });
  it("draws pole arrangements without calculating a tested magnet outcome for the child", () => {
    const { container } = show({ type: "magnet", left: "N", right: "S" });
    expect(container.querySelectorAll("[data-pole]")).toHaveLength(4);
    expect(container.querySelector("[data-outcome]")).toBeNull();
    expect(container.textContent).not.toMatch(/Attract:|Repel:/);
    expect(container.textContent).toMatch(/No movement or tested outcome/);
  });
  it("keeps circuit state and muscle-action explanations unknown while drawing the givens", () => {
    const circuit = show({ type: "circuit", closed: false, switch: true });
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/separated/);
    expect(circuit.container.textContent).not.toMatch(/bulb will light|bulb will not light/i);
    cleanup();
    const arm = show({ type: "arm", pose: "bent" });
    expect(arm.container.textContent).toContain("Front muscle");
    expect(arm.container.textContent).not.toMatch(/contract|relax/);
  });
  it("retains native water-path evidence, seeds, skeleton and fossil cutaway context", () => {
    for (const data of [{ type: "waterTransport", model: "flower", marks: ["stem"] }, { type: "seed", kind: "hooks" },
      { type: "skeleton", animal: "dog" }, { type: "fossil", kind: "shell", phase: "burial" }]) {
      const { container } = show(data);
      expect(container.querySelector("svg")).toBeTruthy();
      expect(container.querySelector('[role="alert"]')).toBeNull();
      cleanup();
    }
  });
  it("shows an observed shadow without printing a numeric answer and bounds unsupported geometries", () => {
    const data = { type: "shadow", source: 0, object: 30, screen: 60, height: 4, on: true, blocks: true };
    const { container } = show(data);
    expect(container.querySelector(".science-shadow-mark")).toBeTruthy();
    expect(container.textContent).not.toContain("8 cm");
    expect(() => validateJourneyModel({ renderer: "science", data: { ...data, object: 0 }, alt: "Setup" })).toThrow("INVALID_MODEL");
  });
});
