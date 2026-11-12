import { describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import JourneyModel from "../../src/components/curriculum/JourneyModel.jsx";
import { validateJourneyModel } from "../../shared/curriculumJourneyModels.js";

describe("curriculum geometry models", () => {
  it("places signed coordinates on the right quadrant without printing the coordinate answer", () => {
    const model = { renderer: "cartesian", alt: "Point A on a four-quadrant grid.", data: { min: -5, max: 5, points: [{ label: "A", x: -2, y: 3 }] } };
    const { container } = render(<JourneyModel model={model} />);
    const dot = container.querySelector(".cj-geo-point");
    expect(dot.getAttribute("cx")).toBe("114"); expect(dot.getAttribute("cy")).toBe("86");
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.queryByText("(-2, 3)")).toBeNull();
  });
  it("labels only the supplied radius or diameter, leaving the requested length unknown", () => {
    const { container } = render(<JourneyModel model={{ renderer: "circle", alt: "A circle with a marked length.", data: { given: "radius", value: 6, unit: "cm" } }} />);
    expect(screen.getByText("6 cm")).toBeTruthy(); expect(screen.queryByText("12 cm")).toBeNull();
    expect(container.querySelector(".cj-geo-axis").getAttribute("d")).toBe("M150,125H245");
  });
  it("draws sector proportions with category labels, without calculated percentages", () => {
    const { container } = render(<JourneyModel model={{ renderer: "pie-chart", alt: "Two ways of travelling.", data: { sectors: [{ label: "Walk", value: 3 }, { label: "Cycle", value: 1 }] } }} />);
    const sectors = container.querySelectorAll(".cj-geo-sector");
    expect(sectors).toHaveLength(2);
    expect(sectors[0].getAttribute("d")).toMatch(/A100,100 0 1,1/);
    expect(sectors[1].getAttribute("d")).toMatch(/A100,100 0 0,1/);
    expect(screen.getByText("Walk")).toBeTruthy(); expect(screen.queryByText("75%")).toBeNull();
  });
  it("draws each net square once and rejects duplicate or out-of-grid givens", () => {
    const model = { renderer: "net", alt: "Six connected squares.", data: { cells: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]] } };
    const { container } = render(<JourneyModel model={model} />);
    expect(container.querySelectorAll(".cj-geo-net-square")).toHaveLength(6);
    expect(() => validateJourneyModel({ ...model, data: { cells: Array(6).fill([0, 0]) } })).toThrow("INVALID_MODEL");
    expect(() => validateJourneyModel({ renderer: "cartesian", alt: "Grid", data: { min: -5, max: 5, points: [{ label: "A", x: 6, y: 0 }] } })).toThrow("INVALID_MODEL");
    cleanup();
  });
});
