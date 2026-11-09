import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";

function mount() { return render(<MemoryRouter><TeacherPlanning /></MemoryRouter>); }
function input() { return within(screen.getByRole("region", { name: "What does your class need?" })); }
function chip(group, name) { return within(screen.getByRole("group", { name: group })).getByRole("button", { name }); }
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

it("keeps unsaved input and plan until a curriculum change is confirmed, then searches and plans Science only", async () => {
  const user = userEvent.setup(); mount();
  await search(user, "perimter");
  await user.click(input().getByRole("button", { name: "Add: Perimeter of 2-D Shapes" }));
  const first = await generate(user);
  await user.click(first.getByRole("button", { name: "Edit lesson" }));
  await user.type(first.getByLabelText("Teacher notes (no pupil names)"), "Keep these edits");
  await user.click(chip("Subject", "Science"));
  expect(screen.getByRole("group", { name: "Change curriculum confirmation" })).toBeTruthy();
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep these edits");
  await user.click(screen.getByRole("button", { name: "Keep current curriculum" }));
  expect(chip("Subject", "Maths").getAttribute("aria-pressed")).toBe("true");
  expect(screen.queryByRole("group", { name: "Change curriculum confirmation" })).toBeNull();
  await user.click(chip("Subject", "Science"));
  await user.click(screen.getByRole("button", { name: "Change curriculum and start again" }));
  expect(chip("Subject", "Science").getAttribute("aria-pressed")).toBe("true");
  expect(screen.queryByRole("article", { name: "Lesson 1", exact: true })).toBeNull();
  expect(input().queryByRole("button", { name: "Try a sample class" })).toBeNull();
  await search(user, "fossils");
  await user.click(input().getByRole("button", { name: "Add: How Fossils Form" }));
  const science = await generate(user);
  expect(science.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/^\/year\/3\/science\//);
  expect(screen.getByLabelText("Plan name").value).toBe("Year 3 science · Three-week teaching plan");
});

it("applies a year and subject in one tap and uses them for search, generation and printed labels", async () => {
  const user = userEvent.setup(); const { container } = mount();
  await user.click(chip("Class year", "Year 4"));
  expect(chip("Class year", "Year 4").getAttribute("aria-pressed")).toBe("true");
  await user.click(chip("Subject", "English"));
  expect(chip("Subject", "English").getAttribute("aria-pressed")).toBe("true");
  await search(user, "fronted adverbeals");
  expect(input().getByText("Did you mean one of these?")).toBeTruthy();
  await user.click(input().getByRole("button", { name: /Add: Fronted Adverbials/i }));
  const first = await generate(user);
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/^\/year\/4\/english\//);
  expect(container.querySelector(".tp-print").textContent).toContain("Year 4 English");
  expect(container.querySelector(".tp-print").textContent).not.toContain("Year 3 Maths");
});
