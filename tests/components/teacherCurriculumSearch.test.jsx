import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";

function mount() { return render(<MemoryRouter><TeacherPlanning /></MemoryRouter>); }
function input() { return within(screen.getByRole("region", { name: "Add your teaching topics" })); }
async function choose(user, group, name) { await user.selectOptions(screen.getByRole("combobox", { name: group, exact: true }), screen.getByRole("option", { name, exact: true })); }
async function search(user, query) { await user.type(input().getByRole("searchbox", { name: "Search topics" }), query); }
async function generate(user) {
  await user.click(screen.getByRole("button", { name: "Create three-week plan" }));
  const first = within(screen.getByRole("article", { name: "Lesson 1", exact: true }));
  await user.click(first.getByRole("button"));
  return first;
}

it("searches the full Year 3 maths course and turns a specific non-pilot lesson match into a plan", async () => {
  const user = userEvent.setup(); mount();
  await search(user, "find missing side");
  const match = input().getByRole("button", { name: "Add: Perimeter of 2-D Shapes" });
  expect(match.textContent).toContain("1 activity");
  await user.click(match);
  const first = await generate(user);
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/perimeter-of-2-d-shapes\/2$/);
  expect(first.getByRole("list", { name: "Teaching sequence" }).textContent).toContain("perimeter");
  expect(screen.queryByText(/All eight pupils and results are fictional/)).toBeNull();
});

it("lets teachers choose a specific activity directly from search results without examining every challenge", async () => {
  const user = userEvent.setup(); mount();
  await search(user, "money");
  await user.click(input().getAllByText("Pick one activity")[0]);
  await user.click(input().getByRole("button", { name: "Use: Work out the change" }));
  const first = await generate(user);
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/money-and-giving-change\/2$/);
  await user.click(first.getByText("Instructions and preview"));
  await user.click(first.getByText("Preview example"));
  expect(await first.findByText(/Existing Bix introduction and worked example/)).toBeTruthy();
  expect(first.getByText("Count on from the price to the money you paid.")).toBeTruthy();
});

it("adds Science to a Maths plan, preserves edits until rebuild and labels both subjects in print and calendar", async () => {
  const user = userEvent.setup(); const { container } = mount();
  await search(user, "perimter");
  await user.click(input().getByRole("button", { name: "Add: Perimeter of 2-D Shapes" }));
  const first = await generate(user);
  await user.click(first.getByRole("button", { name: "Edit lesson" }));
  await user.type(first.getByLabelText("Teacher notes (no pupil names)"), "Keep these edits");
  await user.click(screen.getByText("Plan settings"));
  await choose(user, "Subject", "Science");
  expect(screen.queryByRole("group", { name: "Change curriculum confirmation" })).toBeNull();
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep these edits");
  expect(screen.getByRole("checkbox", { name: "Include perimeter of 2-d shapes" }).checked).toBe(true);
  await search(user, "fossils");
  await user.click(input().getByRole("button", { name: "Add: How Fossils Form" }));
  expect(screen.getAllByRole("checkbox").filter((item) => item.checked)).toHaveLength(2);
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep these edits");
  await user.click(screen.getByRole("button", { name: "Rebuild plan" }));
  await user.click(screen.getByRole("button", { name: "Keep current plan" }));
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep these edits");
  await user.click(screen.getByRole("button", { name: "Rebuild plan" }));
  await user.click(screen.getByRole("button", { name: "Replace plan" }));
  expect(screen.getByLabelText("Plan name").value).toBe("Year 3 maths + science · Three-week teaching plan");
  const print = container.querySelector(".tp-print");
  expect(print.textContent).toContain("Year 3 Maths + Science");
  expect(print.textContent).toContain("/year/3/math/");
  expect(print.textContent).toContain("/year/3/science/");
  const lessons = screen.getAllByRole("article", { name: /^Lesson \d+$/ });
  expect(lessons.some((item) => item.textContent.includes("Science · 45 min"))).toBe(true);
  await user.click(screen.getByRole("button", { name: "Calendar", exact: true }));
  expect(screen.getAllByRole("article", { name: /minutes$/ }).some((item) => within(item).queryByText("Science"))).toBe(true);
});

it("requires confirmation before changing year and preserves the draft when cancelled", async () => {
  const user = userEvent.setup(); mount();
  await search(user, "fossils");
  await choose(user, "Subject", "Science");
  await user.click(input().getByRole("button", { name: "Add: How Fossils Form" }));
  await generate(user);
  await user.click(screen.getByText("Plan settings"));
  await choose(user, "Class year", "Year 4");
  expect(screen.getByRole("group", { name: "Change curriculum confirmation" })).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Keep current curriculum" }));
  expect(screen.getByRole("article", { name: "Lesson 1", exact: true })).toBeTruthy();
  await choose(user, "Class year", "Year 4");
  await user.click(screen.getByRole("button", { name: "Change curriculum and start again" }));
  expect(screen.queryByRole("article", { name: "Lesson 1", exact: true })).toBeNull();
  expect(screen.getByRole("button", { name: "Create three-week plan" }).disabled).toBe(true);
});

it("applies a year and subject in one tap and uses them for search, generation and printed labels", async () => {
  const user = userEvent.setup(); const { container } = mount();
  await choose(user, "Class year", "Year 4");
  expect(screen.getByRole("combobox", { name: "Class year" }).value).toBe("4");
  await choose(user, "Subject", "English");
  expect(screen.getByRole("combobox", { name: "Subject", exact: true }).value).toBe("english");
  await search(user, "fronted adverbeals");
  expect(input().getByText("Did you mean one of these?")).toBeTruthy();
  await user.click(input().getByRole("button", { name: /Add: Fronted Adverbials/i }));
  const first = await generate(user);
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/^\/year\/4\/english\//);
  expect(container.querySelector(".tp-print").textContent).toContain("Year 4 English");
  expect(container.querySelector(".tp-print").textContent).not.toContain("Year 3 Maths");
});


it("imports class results for multiple subjects and retains the review when browsing another subject", async () => {
  const user = userEvent.setup(); mount();
  await user.click(input().getByRole("button", { name: "Paste results" }));
  await user.type(input().getByLabelText("Paste class topic results"), "Topic,Correct,Answered\nPerimeter of 2-D Shapes,9,30\nHow Fossils Form,8,30");
  await user.click(input().getByRole("button", { name: "Check results" }));
  expect(input().getByRole("button", { name: "Use these results" }).disabled).toBe(false);
  await choose(user, "Subject", "Science");
  expect(input().getByLabelText("Paste class topic results").value).toContain("Perimeter");
  await user.click(input().getByRole("button", { name: "Use these results" }));
  expect(screen.getAllByRole("checkbox").filter((item) => item.checked)).toHaveLength(2);
  await generate(user);
  expect(screen.getByLabelText("Plan name").value).toBe("Year 3 maths + science · Three-week teaching plan");
});
