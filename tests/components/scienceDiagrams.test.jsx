import { render as rtlRender, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";
import MuscleMapFigure from "../../src/components/challenge/MuscleMapFigure";
import FossilLayersIllustration from "../../src/components/challenge/FossilLayersIllustration";
import SkeletonIllustration from "../../src/components/challenge/SkeletonIllustration";
import FlowerLifeCycleIllustration from "../../src/components/challenge/FlowerLifeCycleIllustration";

// Captions link to /credits through the router.
const render = (ui) => rtlRender(ui, { wrapper: MemoryRouter });

it("each muscle-map view names only the muscles it colours, with a visible label", () => {
  const { container } = render(<MuscleMapFigure />);
  const titles = [...container.querySelectorAll("svg > title")].map((node) => node.textContent);
  expect(titles[0]).toMatch(/^Front of a body\. Coloured muscles: front of the upper arm\.$/);
  expect(titles[1]).toMatch(/^Back of a body\. Coloured muscles: back of the upper arm\.$/);
  expect(screen.getByText("Front")).toBeTruthy();
  expect(screen.getByText("Back")).toBeTruthy();
});

it("the leaf account draws no water, but the shell account does", () => {
  const water = (kind) => render(<FossilLayersIllustration kind={kind} phase="life" description="" />).container.querySelector('path[fill^="url(#"][fill$="-water)"]');
  expect(water("leaf")).toBeNull();
  expect(water("shell")).not.toBeNull();
});

it("the dog card draws its skeleton", () => {
  render(<SkeletonIllustration animal="dog" />);
  expect(screen.getByRole("img", { name: /Dog skeleton/ })).toBeTruthy();
});

it("the hoverfly picture is captioned as a fly", () => {
  render(<FlowerLifeCycleIllustration phase="insect" pollinator="hoverfly" />);
  expect(screen.getByText("Fly carrying pollen")).toBeTruthy();
});
