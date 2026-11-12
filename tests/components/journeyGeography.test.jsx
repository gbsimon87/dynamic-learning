import { expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import JourneyModel from "../../src/components/curriculum/JourneyModel.jsx";
import { validateJourneyModel } from "../../shared/curriculumJourneyModels.js";

const model = (visual, sources = []) => ({ renderer: "geography", data: { visual: { title: "Supplied map", alt: "A practice map.", lines: [], ...visual }, sources }, alt: "A practice map." });

it("draws original UK country geometry without printing a hidden country name", () => {
  const { container } = render(<JourneyModel model={model({ type: "y1", art: "uk", names: false, markers: [{ id: "A", label: "A", point: [-4.6, 56.55] }] }, ["y1NaturalEarth"])} />);
  expect(container.querySelectorAll(".y1-nation").length).toBe(4);
  expect(container.textContent).not.toContain("Scotland");
  expect(screen.getByText(/Natural Earth/)).toBeTruthy();
});

it("retains map keys and credited bundled-photo evidence", () => {
  const { container } = render(<JourneyModel model={model({ type: "map", view: "world", markers: [{ id: "A", label: "London", point: [-0.13, 51.51] }] })} />);
  expect(container.querySelectorAll("svg path").length).toBeGreaterThan(10);
  expect(screen.getByRole("list", { name: "Map key" }).textContent).toContain("London");
  cleanup();
  render(<JourneyModel model={model({ type: "photo", image: "whitby-harbour" })} />);
  expect(screen.getByRole("img").getAttribute("src")).toMatch(/webp/);
  expect(document.querySelector(".geo-credit").textContent.length).toBeGreaterThan(10);
});

it("renders picture/plan comparisons and rejects private or unusable drawing fields", () => {
  render(<JourneyModel model={model({ type: "y1", art: "views", panels: [{ kind: "ground", id: "A", layout: { building: [0, 1], tree: [2, 0] } }, { kind: "plan", id: "B", layout: { building: [0, 1], tree: [2, 0] } }] })} />);
  expect(document.querySelectorAll(".y1-view")).toHaveLength(2);
  for (const bad of [{ type: "map", view: "world", markers: [], answer: "France" }, { type: "y1", art: "views", panels: [{ kind: "plan", layout: { volcano: [0, 1] } }] }, { type: "photo", image: "https://example.com/a.jpg" }]) {
    expect(() => validateJourneyModel(model(bad))).toThrow("INVALID_MODEL");
  }
});
