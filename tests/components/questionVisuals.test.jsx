import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import MathQuestionVisual from "../../src/components/challenge/visual/MathQuestionVisual";
import EnglishQuestionVisual from "../../src/components/challenge/visual/EnglishQuestionVisual";
import ItemPicture from "../../src/components/challenge/visual/ItemPicture";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import Year4ScienceVisual from "../../src/pages/skills/science/challenges/year4/Year4ScienceVisual";
import { YEAR4_SCIENCE_BUILDERS } from "../../src/data/challenges/year4Science/index";
import { seededRng } from "../../src/data/challenges/questionKinds";

afterEach(() => document.body.classList.remove("dark"));

it.each(["light", "dark"])("draws question quantities in %s mode without revealing the computed answer", theme => {
  document.body.classList.toggle("dark", theme === "dark");
  render(<MathQuestionVisual question={{ prompt: "18 + 7 = ?", answer: 25 }} />);
  expect(screen.getByRole("img").getAttribute("aria-label")).toContain("unknown whole");
  expect(screen.queryByText("25")).toBeNull();
  expect(screen.getByText("18")).toBeTruthy();
  expect(screen.getByText("7")).toBeTruthy();
  expect(screen.getByText("?")).toBeTruthy();
  cleanup();
  render(<MathQuestionVisual question={{ prompt: "2 3/4 = ?/4" }} />);
  expect(screen.getByRole("img").getAttribute("aria-label")).toContain("2 3/4");
  expect(document.querySelectorAll(".qv-fraction")).toHaveLength(3);
  expect(document.querySelectorAll(".qv-fraction .is-filled")).toHaveLength(11);
});

it("renders given word parts and a literal reference without reading hidden answers", () => {
  render(<EnglishQuestionVisual question={{ text: "The root ‘aqua’ means water.", answer: "aquarium" }} />);
  expect(screen.getByText("aqua")).toBeTruthy();
  expect(screen.queryByText("aquarium")).toBeNull();
  expect(screen.getByLabelText("Word or meaning to work out").textContent).toBe("?");
  cleanup();
  render(<EnglishQuestionVisual question={{ sentence: "The ___ floated past the bridge.", answer: "boat" }} />);
  expect(screen.getByRole("figure").getAttribute("aria-label")).toContain("bridge");
  expect(screen.queryByText(/boat/)).toBeNull();
});

it("shows the supplied key as branches and keeps incorrect choices retryable", () => {
  const q = YEAR4_SCIENCE_BUILDERS["classification-keys"](4, seededRng(3)).find(q => q.kind === "choice" && q.visual?.type === "classificationKey");
  expect(q).toBeTruthy();
  const submit = vi.fn();
  render(<DataRound question={q} renderVisual={q => <Year4ScienceVisual question={q} />} submit={submit} locked={false} hint={false} layout="science" illustrate />);
  expect(screen.getByRole("figure", { name: "The supplied classification key as a branching diagram" })).toBeTruthy();
  for (const name of ["robin", "beetle", "snail", "earthworm"]) expect(screen.getByText(name, { exact: true })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: q.options.find(option => option !== q.answer), exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(false);
  fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});

it("pictured sorting cards keep their pictures, labels and validation after moving", () => {
  const q = { kind: "sort", bins: [{ id: "small", label: "Less than half" }, { id: "big", label: "More than half" }], cards: [
    { id: "a", label: "1/3", bin: "small" }, { id: "b", label: "3/4", bin: "big" },
  ] };
  const submit = vi.fn();
  render(<DataRound question={q} submit={submit} locked={false} hint={false} illustrate />);
  const picture = screen.getByRole("button", { name: "1/3", exact: true }).querySelector("svg").outerHTML;
  fireEvent.click(screen.getByRole("button", { name: "1/3", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Less than half", exact: true }));
  expect(screen.getByRole("button", { name: /1\/3, in Less than half/ }).querySelector("svg").outerHTML).toBe(picture);
  fireEvent.click(screen.getByRole("button", { name: "3/4", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "More than half", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(submit).toHaveBeenLastCalledWith(true);
});

it("pictured choices preserve accessible names and lock during the success pause", () => {
  render(<DataRound question={{ kind: "choice", prompt: "Which tooth?", options: ["Incisors", "Canines", "Molars"], answer: "Molars" }} submit={vi.fn()} locked hint={false} illustrate />);
  for (const name of ["Incisors", "Canines", "Molars"]) {
    const button = screen.getByRole("button", { name, exact: true });
    expect(button.disabled).toBe(true);
    expect(button.querySelector("svg")).toBeTruthy();
  }
});

it("uses different tooth outlines and supplies real geometry for named shape cards", () => {
  const { container } = render(<><ItemPicture label="Incisors" /><ItemPicture label="Canines" /><ItemPicture label="Molars" /><ItemPicture label="Regular hexagon" /></>);
  expect(new Set([...container.querySelectorAll("path")].map(path => path.getAttribute("d"))).size).toBe(3);
  expect(container.querySelector("polygon").getAttribute("points").split(" ")).toHaveLength(6);
});

it("plots the supplied evidence without changing or replacing its table", () => {
  render(<Year4ScienceVisual question={{ table: { headings: ["Material", "Melting temperature (°C)"], rows: [["A", 15], ["B", 42], ["C", 68]] } }} />);
  expect(screen.getByRole("table")).toBeTruthy();
  expect(screen.getByRole("img").getAttribute("aria-label")).toContain("A: 15; B: 42; C: 68");
  expect([...document.querySelectorAll(".bar-chart-bar")].map(bar => bar.getAttribute("title"))).toEqual(["A: 15", "B: 42", "C: 68"]);
});
