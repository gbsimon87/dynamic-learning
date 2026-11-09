import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, it } from "vitest";
import TeacherBriefings from "../../src/pages/teachers/TeacherBriefings";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";
import { YEAR3_MATH_BRIEFINGS } from "../../src/data/teacherBriefings/year3Math";

function at(path) {
  render(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/teachers/briefings" element={<TeacherBriefings />} />
    <Route path="/teachers/briefings/:year/:subject/:topicId" element={<TeacherBriefings />} />
  </Routes></MemoryRouter>);
}

it("lists Year 3 Maths topics with notes and filters them", async () => {
  const user = userEvent.setup();
  at("/teachers/briefings");
  expect(screen.getAllByText("Teacher notes").length).toBe(Object.keys(YEAR3_MATH_BRIEFINGS).length);
  await user.type(screen.getByLabelText("Find a topic"), "column");
  expect(screen.getByRole("link", { name: "Column Addition" })).toBeTruthy();
  expect(screen.queryByRole("link", { name: "Tenths" })).toBeNull();
  await user.click(screen.getByRole("button", { name: "Year 4" }));
  expect(screen.getByText(/Teacher notes for Year 4 Maths aren't written yet/)).toBeTruthy();
});

it("shows the full briefing with statutory text, misconceptions and Bix's worked examples", () => {
  const notes = YEAR3_MATH_BRIEFINGS["column-subtraction"];
  at("/teachers/briefings/3/math/column-subtraction");
  expect(screen.getByRole("heading", { level: 1, name: "Column Subtraction" })).toBeTruthy();
  expect(screen.getByText(notes.statutory[0])).toBeTruthy();
  expect(screen.getByText(notes.misconceptions[0].mistake)).toBeTruthy();
  expect(screen.getByRole("heading", { name: "How Bix teaches it" })).toBeTruthy();
  expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(4);
});

it("offers Science, History and Geography in every year", async () => {
  const user = userEvent.setup();
  at("/teachers/briefings");
  for (const year of [1, 2, 3, 4, 5, 6]) {
    await user.click(screen.getByRole("button", { name: `Year ${year}` }));
    for (const subject of ["Science", "History", "Geography"]) expect(screen.getByRole("button", { name: subject })).toBeTruthy();
  }
  await user.click(screen.getByRole("button", { name: "History" }));
  expect(screen.getAllByRole("link").length).toBeGreaterThan(10);
});

it("falls back to Bix's examples where notes aren't written, and handles unknown topics", () => {
  at("/teachers/briefings/9/math/nothing");
  expect(screen.getByRole("heading", { name: "Briefing not found" })).toBeTruthy();
});

it("links a briefing to a lesson plan that already has the topic, and the plan links back", async () => {
  const user = userEvent.setup();
  at("/teachers/briefings/3/math/column-subtraction");
  expect(screen.getByRole("link", { name: "Plan lessons for this topic" }).getAttribute("href")).toBe("/teachers/planning?year=3&subject=math&topic=column-subtraction");
  cleanup();

  render(<MemoryRouter initialEntries={["/teachers/planning?year=3&subject=math&topic=column-subtraction"]}><Routes><Route path="/teachers/planning" element={<TeacherPlanning />} /></Routes></MemoryRouter>);
  await user.click(screen.getByRole("button", { name: "Create three-week plan" }));
  const notes = YEAR3_MATH_BRIEFINGS["column-subtraction"];
  const first = screen.getAllByRole("article", { name: /^Lesson / })[0];
  if (!within(first).queryByRole("list", { name: "Teaching sequence" })) await user.click(within(first).getAllByRole("button")[0]);
  expect(within(first).getByText(notes.vocabulary.map((word) => word.term).join(" · "))).toBeTruthy();
  expect(within(first).getByRole("link", { name: /Read the topic briefing/ }).getAttribute("href")).toBe("/teachers/briefings/3/math/column-subtraction");
  expect(within(first).getByText(new RegExp(`^Show this mistake.*${notes.misconceptions[1].mistake.slice(0, 12).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`))).toBeTruthy();
});

it("ignores an unknown topic in the planning link", () => {
  render(<MemoryRouter initialEntries={["/teachers/planning?year=9&subject=math&topic=nothing"]}><Routes><Route path="/teachers/planning" element={<TeacherPlanning />} /></Routes></MemoryRouter>);
  expect(screen.getByRole("button", { name: "Year 3" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByRole("button", { name: "Create three-week plan" })).toBeTruthy();
});
