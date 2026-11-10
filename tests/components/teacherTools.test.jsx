import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, RouterProvider, Routes, createMemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("../../src/components/mascot/Mascot", () => ({ default: () => null }));
import AppFooter from "../../src/components/ui/AppFooter";
import TeacherHub from "../../src/pages/teachers/TeacherHub";
import TeacherReports from "../../src/pages/teachers/TeacherReports";
import ParentGuide from "../../src/seo/ParentGuides";
import { PARENT_EXPLAINERS } from "../../shared/parentExplainers";

afterEach(() => vi.restoreAllMocks());

function at(path, element, pattern) {
  render(<MemoryRouter initialEntries={[path]}><Routes><Route path={pattern ?? path} element={element} /></Routes></MemoryRouter>);
}

it("links every teacher tool from the hub and the footer", () => {
  at("/teachers", <TeacherHub />);
  for (const href of ["/teachers/planning", "/teachers/briefings", "/teachers/reports", "/parent-guides"]) {
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(true);
  }
  render(<MemoryRouter><AppFooter /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Teacher tools" }).getAttribute("href")).toBe("/teachers");
});

it("drafts a report from judgements, rewords it, copies it and clears for the next pupil without storing anything", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue();
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  const setItem = vi.spyOn(Storage.prototype, "setItem");
  at("/teachers/reports", <TeacherReports />);
  const draft = () => screen.getByLabelText("Draft comment", { selector: "textarea" }).value;

  await user.type(screen.getByLabelText(/First name/), "Sam");
  await user.click(screen.getByRole("button", { name: "She" }));
  const maths = screen.getByRole("group", { name: "Maths judgement" });
  await user.click(within(maths).getByRole("button", { name: "Greater depth" }));
  await user.selectOptions(screen.getAllByLabelText("Strength")[0], "Column Addition");
  await user.click(screen.getByRole("button", { name: "Works hard" }));
  expect(draft()).toMatch(/Sam is working at greater depth in Maths|In Maths, Sam is working at greater depth/);
  expect(draft()).toMatch(/column addition/);
  expect(draft()).toMatch(/\bher\b|\bShe\b/);
  expect(draft()).not.toMatch(/English/);

  const before = draft();
  await user.click(screen.getByRole("button", { name: "Reword" }));
  expect(draft()).not.toBe(before);

  await user.click(screen.getByRole("button", { name: "Copy comment" }));
  expect(writeText).toHaveBeenCalledWith(draft());
  expect(screen.getByText(/Copied/)).toBeTruthy();

  await user.selectOptions(screen.getByRole("combobox", { name: "Year group" }), "4");
  expect(screen.getByLabelText(/First name/).value).toBe("Sam");
  expect(within(screen.getByRole("group", { name: "Maths judgement" })).getByRole("button", { name: "Not reported" }).getAttribute("aria-pressed")).toBe("true");
  await user.click(screen.getByRole("button", { name: "Next pupil" }));
  expect(screen.getByLabelText(/First name/).value).toBe("");
  expect(draft()).toMatch(/\[Name\]/);
  expect(screen.getByRole("combobox", { name: "Year group" }).value).toBe("4");
  expect(setItem).not.toHaveBeenCalled();
});

it("keeps a teacher's own edits until they choose to rebuild", async () => {
  const user = userEvent.setup();
  at("/teachers/reports", <TeacherReports />);
  const box = screen.getByLabelText("Draft comment", { selector: "textarea" });
  await user.clear(box);
  await user.type(box, "My own words.");
  await user.click(screen.getByRole("button", { name: "Kind to others" }));
  expect(box.value).toBe("My own words.");
  expect(screen.getByRole("button", { name: "Reword" }).disabled).toBe(true);
  await user.click(screen.getByRole("button", { name: "Rebuild from my choices" }));
  expect(box.value).toMatch(/kind and caring|looks after others/);
});

it("lists parent guides by year", async () => {
  const user = userEvent.setup();
  at("/parent-guides", <ParentGuide />);
  expect(screen.getAllByRole("listitem")).toHaveLength(PARENT_EXPLAINERS.length);
  await user.click(screen.getByRole("button", { name: "Year 1" }));
  const yearOne = PARENT_EXPLAINERS.filter((explainer) => explainer.years.includes(1));
  expect(screen.getAllByRole("listitem")).toHaveLength(yearOne.length);
});

it("shows an explainer's teaching steps, worked example and practice links", async () => {
  const user = userEvent.setup();
  const explainer = PARENT_EXPLAINERS.find((entry) => entry.slug === "column-subtraction");
  at("/parent-guides/column-subtraction", <ParentGuide />, "/parent-guides/:slug");
  expect(screen.getByRole("heading", { level: 1, name: explainer.title })).toBeTruthy();
  expect(screen.getByText(explainer.howWeTeach.steps[0])).toBeTruthy();
  expect(screen.getByText(explainer.howWeTeach.examples[0].title)).toBeTruthy();
  expect(screen.getByText(/Schools teach written methods/)).toBeTruthy();
  for (const link of explainer.practise) expect(screen.getByRole("link", { name: link.label }).getAttribute("href")).toBe(link.to);
  expect(screen.getByRole("link", { name: "Year 3 Maths" }).getAttribute("href")).toBe("/curriculum-guide/year-3-maths");
  expect(screen.getByRole("link", { name: "Parent guides" }).getAttribute("href")).toBe("/parent-guides");
  await user.click(screen.getByText("Share or print this guide"));
  await user.type(screen.getByLabelText(/Note for the printed copy/), "We use this method from Year 3.");
  expect(screen.getByText("A note from your child's teacher")).toBeTruthy();
});

it("shows the not-found page for an unknown parent guide", () => {
  render(<RouterProvider router={createMemoryRouter([{ path: "*", element: <ParentGuide slug="nope" /> }])} />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("We can't find that page");
});
