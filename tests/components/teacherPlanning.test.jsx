import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";
import AppFooter from "../../src/components/ui/AppFooter";
import { getPlanningResources } from "../../src/data/teacherPlanningResources";

function mount() { return render(<MemoryRouter><TeacherPlanning /></MemoryRouter>); }
async function create(user) {
  if (!screen.queryByText(/All eight pupils and results are fictional/)) await user.click(screen.getByRole("button", { name: "Try a sample class" }));
  await user.click(screen.getByRole("button", { name: "Create three-week plan" }));
  await user.click(within(lesson(1)).getByRole("button"));
  await user.click(within(lesson(1)).getByRole("button", { name: "Edit lesson" }));
}
function lesson(number) { return screen.getByRole("article", { name: `Lesson ${number}`, exact: true }); }

it("starts with fictional evidence, preserves completion records and creates an editable draft", async () => {
  localStorage.setItem("dl.progress", "existing learner records");
  const user = userEvent.setup();
  mount();
  await user.click(screen.getByRole("button", { name: "Try a sample class" }));
  expect(screen.getByText(/All eight pupils and results are fictional/)).toBeTruthy();
  expect(screen.getAllByRole("checkbox").filter((checkbox) => checkbox.checked)).toHaveLength(2);
  await user.click(screen.getAllByText("Details")[0]);
  const table = screen.getByRole("table", { name: /Fractions as numbers/ });
  expect(within(table).getByText("Sample pupil H")).toBeTruthy();
  expect(within(table).getByText("Follow up")).toBeTruthy();
  await create(user);
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(15);
  const first = within(lesson(1));
  await user.type(first.getByLabelText("Teacher notes (no pupil names)"), "Use fraction strips.");
  await user.selectOptions(first.getByLabelText("Lesson minutes"), "30");
  expect(first.getByRole("button", { name: /30 min/ }).getAttribute("aria-expanded")).toBe("true");
  expect(localStorage.getItem("dl.progress")).toBe("existing learner records");
});

it("keeps edits when settings change, confirms replacement, and creates the requested schedule", async () => {
  const user = userEvent.setup();
  mount(); await create(user);
  await user.type(within(lesson(1)).getByLabelText("Teacher notes (no pupil names)"), "Keep this edit");
  await user.click(within(screen.getByRole("group", { name: "Lessons per week" })).getByRole("radio", { name: "2" }));
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(15);
  await user.click(screen.getByRole("button", { name: "Rebuild plan" }));
  await user.click(screen.getByRole("button", { name: "Keep current plan" }));
  expect(within(lesson(1)).getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep this edit");
  await user.click(screen.getByRole("button", { name: "Rebuild plan" }));
  await user.click(screen.getByRole("button", { name: "Replace plan" }));
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(6);
  await user.click(within(lesson(1)).getByRole("button"));
  await user.click(within(lesson(1)).getByRole("button", { name: "Edit lesson" }));
  expect(within(lesson(1)).getByLabelText("Teacher notes (no pupil names)").value).toBe("");
});

it("adds, reorders, opens and removes existing resources without navigating away", async () => {
  const user = userEvent.setup();
  mount(); await create(user);
  const first = within(lesson(1));
  const skills = getPlanningResources(() => true).find((resource) => resource.kind === "skills");
  await user.selectOptions(first.getByLabelText("Add an existing resource"), skills.id);
  await user.click(first.getByRole("button", { name: "Add resource" }));
  const links = first.getAllByRole("link", { name: "Open resource" });
  expect(links[1].getAttribute("href")).toBe("/skills/fraction-fun");
  expect(links[1].getAttribute("target")).toBe("_blank");
  await user.click(first.getByRole("button", { name: "Move resource 2 earlier" }));
  expect(first.getAllByRole("link", { name: "Open resource" })[0].getAttribute("href")).toBe("/skills/fraction-fun");
  await user.click(first.getByRole("button", { name: "Remove Learn About Fractions" }));
  expect(first.getAllByRole("link", { name: "Open resource" })).toHaveLength(1);
});

it("moves a lesson across weeks with its edits and includes all edited lessons in printable content", async () => {
  const user = userEvent.setup();
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  const { container } = mount(); await create(user);
  await user.type(within(lesson(1)).getByLabelText("Teacher notes (no pupil names)"), "Paper strips and counters");
  await user.click(screen.getByRole("button", { name: "Reorder lessons" }));
  for (let position = 1; position <= 5; position += 1) {
    await user.click(screen.getByRole("button", { name: `Move lesson ${position} later` }));
  }
  const sixth = within(within(screen.getByRole("region", { name: "Week 2" })).getByRole("article", { name: "Lesson 6", exact: true }));
  expect(sixth.getByRole("button", { name: /Model and explore: Fractions as numbers/ }).getAttribute("aria-expanded")).toBe("true");
  await user.click(sixth.getByRole("button", { name: "Edit lesson" }));
  expect(sixth.getByLabelText("Teacher notes (no pupil names)").value).toBe("Paper strips and counters");
  await user.click(screen.getByRole("button", { name: "Print / Save as PDF" }));
  expect(print).toHaveBeenCalledOnce();
  expect(container.querySelectorAll(".tp-print article")).toHaveLength(15);
  expect(container.querySelector(".tp-print").textContent).toContain("Paper strips and counters");
  expect(container.querySelector(".tp-print").textContent).toContain("Week 2 · Lesson 6");
});

it("requires an objective and honestly starts again after an unmount", async () => {
  const user = userEvent.setup();
  const mounted = mount();
  await user.click(screen.getByRole("button", { name: "Try a sample class" }));
  for (const checkbox of screen.getAllByRole("checkbox").filter((input) => input.checked)) await user.click(checkbox);
  expect(screen.getByRole("button", { name: "Create three-week plan" }).disabled).toBe(true);
  expect(screen.getByText("Tick at least one topic in step 2.")).toBeTruthy();
  await user.click(screen.getByRole("checkbox", { name: "Include equivalent fractions" }));
  await create(user);
  await user.click(within(lesson(1)).getByText("Why this lesson?"));
  expect(within(lesson(1)).getByText(/2 of 32 responses available/)).toBeTruthy();
  mounted.unmount(); mount();
  expect(screen.queryByRole("article", { name: "Lesson 1", exact: true })).toBeNull();
});

it("starts with a compact outline, reads one lesson at a time and preserves edits through read and print views", async () => {
  const user = userEvent.setup();
  const { container } = mount();
  await user.click(screen.getByRole("button", { name: "Try a sample class" }));
  await user.click(screen.getByRole("button", { name: "Create three-week plan" }));
  expect(screen.getAllByRole("article", { name: /^Lesson \d+$/ })).toHaveLength(15);
  expect(screen.queryByRole("textbox", { name: "Teaching and worked model" })).toBeNull();
  expect(screen.queryByRole("list", { name: "Teaching sequence" })).toBeNull();
  const first = within(lesson(1));
  await user.click(first.getByRole("button"));
  expect(first.getByRole("list", { name: "Teaching sequence" })).toBeTruthy();
  expect(first.getByRole("link", { name: "Open resource" })).toBeTruthy();
  expect(first.queryByLabelText("Teaching and worked model")).toBeNull();
  expect(first.queryByRole("button", { name: "Move resource 1 later" })).toBeNull();
  await user.click(first.getByRole("button", { name: "Edit lesson" }));
  await user.clear(first.getByLabelText("Teaching and worked model"));
  await user.type(first.getByLabelText("Teaching and worked model"), "Model with a paper strip.");
  await user.type(first.getByLabelText("Teacher notes (no pupil names)"), "Bring counters.");
  await user.click(first.getByRole("button", { name: "Done editing" }));
  expect(first.getByText("Model with a paper strip.")).toBeTruthy();
  expect(first.getByText("Bring counters.")).toBeTruthy();
  await user.click(within(lesson(2)).getByRole("button"));
  expect(first.queryByRole("list", { name: "Teaching sequence" })).toBeNull();
  expect(screen.getAllByRole("list", { name: "Teaching sequence" })).toHaveLength(1);
  await user.click(first.getByRole("button"));
  expect(first.getByText("Model with a paper strip.")).toBeTruthy();
  expect(container.querySelector(".tp-print").textContent).toContain("Model with a paper strip.");
  expect(container.querySelectorAll(".tp-print article")).toHaveLength(15);
});

it("is reached from the footer's Teacher tools hub rather than its own footer link", () => {
  render(<MemoryRouter><AppFooter /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Teacher tools" }).getAttribute("href")).toBe("/teachers");
  expect(screen.queryByRole("link", { name: "Teacher planning preview" })).toBeNull();
});
