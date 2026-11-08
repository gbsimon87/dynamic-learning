import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";
import AppFooter from "../../src/components/ui/AppFooter";
import { getPlanningResources } from "../../src/data/teacherPlanningResources";

function mount() { return render(<MemoryRouter><TeacherPlanning /></MemoryRouter>); }
async function create(user) { await user.click(screen.getByRole("button", { name: "Create three-week draft" })); }
function lesson(number) { return screen.getByRole("article", { name: `Lesson ${number}`, exact: true }); }

it("starts with fictional evidence, preserves completion records and creates an editable draft", async () => {
  localStorage.setItem("dl.progress", "existing learner records");
  const user = userEvent.setup();
  mount();
  expect(screen.getByText(/All eight pupils and results are fictional/)).toBeTruthy();
  expect(screen.getAllByRole("checkbox").filter((checkbox) => checkbox.checked)).toHaveLength(2);
  await user.click(screen.getAllByText("View fictional pupil responses")[0]);
  const table = screen.getByRole("table", { name: /Fractions as numbers/ });
  expect(within(table).getByText("Sample pupil H")).toBeTruthy();
  expect(within(table).getByText("Follow up")).toBeTruthy();
  await create(user);
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(15);
  const first = within(lesson(1));
  await user.type(first.getByLabelText("Teacher notes (use fictional details only)"), "Use fraction strips.");
  await user.selectOptions(first.getByLabelText("Lesson minutes"), "30");
  expect(first.getByText("Lesson 1 · 30 min")).toBeTruthy();
  expect(localStorage.getItem("dl.progress")).toBe("existing learner records");
});

it("keeps edits when settings change, confirms replacement, and creates the requested schedule", async () => {
  const user = userEvent.setup();
  mount(); await create(user);
  await user.type(within(lesson(1)).getByLabelText("Teacher notes (use fictional details only)"), "Keep this edit");
  await user.selectOptions(screen.getByLabelText("Lessons per week"), "2");
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(15);
  await user.click(screen.getByRole("button", { name: "Review replacement draft" }));
  await user.click(screen.getByRole("button", { name: "Keep current draft" }));
  expect(within(lesson(1)).getByLabelText("Teacher notes (use fictional details only)").value).toBe("Keep this edit");
  await user.click(screen.getByRole("button", { name: "Review replacement draft" }));
  await user.click(screen.getByRole("button", { name: "Replace draft and edits" }));
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(6);
  expect(within(lesson(1)).getByLabelText("Teacher notes (use fictional details only)").value).toBe("");
});

it("adds, reorders, opens and removes existing resources without navigating away", async () => {
  const user = userEvent.setup();
  mount(); await create(user);
  const first = within(lesson(1));
  const resources = getPlanningResources(() => true);
  const skills = resources.find((resource) => resource.kind === "skills");
  await user.selectOptions(first.getByLabelText("Add an existing resource"), skills.id);
  await user.click(first.getByRole("button", { name: "Add resource" }));
  const links = first.getAllByRole("link", { name: "Open resource ↗" });
  expect(links[1].getAttribute("href")).toBe("/skills/fraction-fun");
  expect(links[1].getAttribute("target")).toBe("_blank");
  await user.click(first.getByRole("button", { name: "Move resource 2 earlier" }));
  expect(first.getAllByRole("link", { name: "Open resource ↗" })[0].getAttribute("href")).toBe("/skills/fraction-fun");
  await user.click(first.getByRole("button", { name: "Remove Fraction Fun" }));
  expect(first.getAllByRole("link", { name: "Open resource ↗" })).toHaveLength(1);
});

it("moves a lesson across weeks with its edits and includes all edited lessons in printable content", async () => {
  const user = userEvent.setup();
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  const { container } = mount(); await create(user);
  await user.type(within(lesson(1)).getByLabelText("Teacher notes (use fictional details only)"), "Paper strips and counters");
  for (let position = 1; position <= 5; position += 1) {
    await user.click(screen.getByRole("button", { name: `Move lesson ${position} later` }));
  }
  const weekTwo = screen.getByRole("region", { name: "Week 2" });
  const sixth = within(weekTwo).getByRole("article", { name: "Lesson 6", exact: true });
  await user.click(within(sixth).getByText(/Model and explore: Fractions as numbers/));
  expect(within(sixth).getByLabelText("Teacher notes (use fictional details only)").value).toBe("Paper strips and counters");
  await user.click(screen.getByRole("button", { name: "Print / Save as PDF" }));
  expect(print).toHaveBeenCalledOnce();
  expect(container.querySelectorAll(".tp-print article")).toHaveLength(15);
  expect(container.querySelector(".tp-print").textContent).toContain("Paper strips and counters");
  expect(container.querySelector(".tp-print").textContent).toContain("Week 2 · Lesson 6");
});

it("requires an objective and honestly starts again after an unmount", async () => {
  const user = userEvent.setup();
  const mounted = mount();
  for (const checkbox of screen.getAllByRole("checkbox").filter((input) => input.checked)) await user.click(checkbox);
  expect(screen.getByRole("button", { name: "Create three-week draft" }).disabled).toBe(true);
  await user.click(screen.getByRole("checkbox", { name: "Include equivalent fractions" }));
  await create(user);
  expect(within(lesson(1)).getByText(/Why this lesson: 2 of 32 responses available/)).toBeTruthy();
  mounted.unmount(); mount();
  expect(screen.queryByRole("article", { name: "Lesson 1", exact: true })).toBeNull();
});

it("provides a discoverable preview link from the shared footer", () => {
  render(<MemoryRouter><AppFooter /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Teacher planning preview" }).getAttribute("href")).toBe("/teachers/planning");
});
