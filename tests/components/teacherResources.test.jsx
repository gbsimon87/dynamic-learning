import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";
import { ResourceFinder } from "../../src/pages/teachers/TeacherResources";
import { getPlanningResources } from "../../src/data/teacherPlanningResources";

function finder(resources = getPlanningResources(() => true)) {
  render(<div className="teacher-planning"><ResourceFinder resources={resources} onAdd={() => {}} /></div>);
  return screen;
}

it("offers a fuzzy spelling suggestion without selecting an activity until the teacher confirms it", async () => {
  const user = userEvent.setup(); const view = finder();
  await user.type(view.getByLabelText("Search activities"), "fracions of amounts");
  expect(view.getByText("Did you mean one of these?")).toBeTruthy();
  expect(view.queryAllByRole("article")).toHaveLength(0);
  await user.click(view.getByRole("button", { name: "Find fractions of quantities" }));
  expect(view.getAllByRole("article")).toHaveLength(4);
});

it("clarifies ambiguous classroom language before showing representation-specific activities", async () => {
  const user = userEvent.setup(); const view = finder();
  await user.type(view.getByLabelText("Search activities"), "finding halves");
  expect(view.getByText("Which do you mean?")).toBeTruthy();
  expect(view.queryAllByRole("article")).toHaveLength(0);
  await user.click(view.getByRole("button", { name: "Place fractions on a number line" }));
  expect(view.getAllByRole("article")).toHaveLength(2);
  expect(view.getByText(/no number-line questions specifically about halves/)).toBeTruthy();
  expect(view.queryByRole("article", { name: "Name or shade fractions of shapes" })).toBeNull();
  await user.clear(view.getByLabelText("Search activities"));
  await user.type(view.getByLabelText("Search activities"), "fractions of amounts");
  expect(view.getAllByRole("article")).toHaveLength(4);
  expect(view.getByRole("article", { name: "Name the fraction of a coloured collection" })).toBeTruthy();
});

it("previews a real question and answer without entering a child challenge or writing any stored data", async () => {
  const user = userEvent.setup();
  localStorage.setItem("dl.progress", "keep existing progress");
  const writes = vi.spyOn(Storage.prototype, "setItem");
  const view = finder();
  await user.type(view.getByLabelText("Search activities"), "fractions of quantities");
  const card = within(view.getByRole("article", { name: "Find one equal share of a collection" }));
  await user.click(card.getByText("What this activity covers"));
  expect(card.getByText(/Unit fractions with denominators 2–5/)).toBeTruthy();
  await user.click(card.getByText("Preview example"));
  expect(await card.findByText(/Read-only sample from this activity/)).toBeTruthy();
  expect(card.getByRole("img", { name: /counters.*in groups/ })).toBeTruthy();
  await user.click(card.getByText("Show answer"));
  expect(card.getByText(/^\d+ objects$/)).toBeTruthy();
  expect(card.queryByRole("link")).toBeNull();
  expect(writes).not.toHaveBeenCalled();
  expect(localStorage.getItem("dl.progress")).toBe("keep existing progress");
});

it("adds a searched activity to a lesson, prevents duplicates and flags an objective mismatch", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><TeacherPlanning /></MemoryRouter>);
  await user.click(screen.getByRole("button", { name: "Try a sample class" }));
  await user.click(screen.getByRole("button", { name: "Create three-week plan" }));
  const first = within(screen.getByRole("article", { name: "Lesson 1", exact: true }));
  await user.click(first.getByRole("button"));
  await user.click(first.getByRole("button", { name: "Edit lesson" }));
  await user.click(first.getByText("Search activities for this lesson"));
  await user.type(await first.findByLabelText("Search activities"), "fractions of amounts");
  const card = within(first.getByRole("article", { name: "Find one equal share of a collection" }));
  expect(card.getByText(/Different objective/)).toBeTruthy();
  await user.click(card.getByRole("button", { name: "Add to this lesson" }));
  expect(card.getByRole("button", { name: "Already in this lesson" }).disabled).toBe(true);
  const links = first.getAllByRole("link", { name: "Open resource" });
  expect(links).toHaveLength(2);
  expect(links[1].getAttribute("href")).toContain("/fractions-of-a-set-of-objects/1");
  expect(links[1].getAttribute("target")).toBe("_blank");
  expect(first.getByText("This activity is for a different objective.")).toBeTruthy();
});

it("handles unknown terminology and unavailable resources without recommending another objective", async () => {
  const user = userEvent.setup(); const view = finder(getPlanningResources(() => false));
  await user.type(view.getByLabelText("Search activities"), "long division");
  expect(view.getByText(/No matching activity/)).toBeTruthy();
  expect(view.queryAllByRole("article")).toHaveLength(0);
  await user.click(view.getByRole("button", { name: "Show all topics" }));
  await user.click(view.getByRole("button", { name: "Find fractions of quantities" }));
  expect(view.getByText(/0 activities available/)).toBeTruthy();
  expect(view.queryByRole("button", { name: "Add to this lesson" })).toBeNull();
});
