import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import TeacherPlanning from "../../src/pages/teachers/TeacherPlanning";

function mount() { return render(<MemoryRouter><TeacherPlanning /></MemoryRouter>); }
function entry() { return within(screen.getByRole("region", { name: "What does your class need?" })); }
function createButton() { return screen.getByRole("button", { name: /Create three-week plan|Rebuild plan/ }); }
async function openFirstLesson(user) {
  const first = within(screen.getByRole("article", { name: "Lesson 1", exact: true }));
  await user.click(first.getByRole("button"));
  return first;
}
async function search(user, query) {
  const box = entry().getByRole("searchbox", { name: "Search topics" });
  await user.clear(box); await user.type(box, query);
}
async function add(user, query, title, status) {
  await search(user, query);
  await user.click(entry().getByRole("button", { name: `Add: ${title}` }));
  if (status) await user.click(within(entry().getByRole("group", { name: `How is the class doing with ${title}?` })).getByRole("radio", { name: status }));
}

it("applies topics as soon as they are added, confirms fuzzy matches and plans from teacher judgement", async () => {
  const user = userEvent.setup(); const { container } = mount();
  expect(screen.queryByText(/All eight pupils and results are fictional/)).toBeNull();
  expect(createButton().disabled).toBe(true);
  await search(user, "fracions on a number line");
  expect(entry().getByText("Did you mean one of these?")).toBeTruthy();
  await user.click(entry().getByRole("button", { name: "Add: Place fractions on a number line" }));
  expect(createButton().disabled).toBe(false);
  await add(user, "mental addition", "Mentally add and subtract 1, 10 or 100", "Secure");
  expect(screen.getAllByRole("checkbox").filter((checkbox) => checkbox.checked)).toHaveLength(1);
  await user.click(createButton());
  const first = await openFirstLesson(user);
  expect(first.getByRole("list", { name: "Teaching sequence" }).textContent).toContain("interval");
  expect(first.getByRole("list", { name: "Teaching sequence" }).textContent).toContain("three-digit");
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toMatch(/fractions-as-numbers\/[23]$/);
  expect(container.querySelector(".tp-print").textContent).toContain("Teacher judgement");
  expect(container.querySelector(".tp-print").textContent).not.toContain("Fictional sample");
});

it("keeps a teacher's untick when a status changes and disables planning when every topic is removed", async () => {
  const user = userEvent.setup(); mount();
  await add(user, "fractions of amounts", "Find fractions of quantities");
  const tick = screen.getByRole("checkbox", { name: "Include fractions of a set of objects" });
  expect(tick.checked).toBe(true);
  await user.click(tick);
  await user.click(within(entry().getByRole("group", { name: "How is the class doing with Find fractions of quantities?" })).getByRole("radio", { name: "Practise" }));
  expect(screen.getByRole("checkbox", { name: "Include fractions of a set of objects" }).checked).toBe(false);
  await user.click(entry().getByRole("button", { name: "Remove Find fractions of quantities" }));
  expect(createButton().disabled).toBe(true);
  expect(screen.getByText("Add a topic in step 1 first.")).toBeTruthy();
});

it("reviews pasted results, requires uncertain mappings and generates priorities from real class totals", async () => {
  const user = userEvent.setup(); mount();
  await user.click(entry().getByRole("button", { name: "Paste results" }));
  await user.type(entry().getByLabelText("Paste class topic results"), "Topic,Correct,Answered,Expected,Skipped\nFracions of amounts,9,30,30,0\nMental addition,26,30,30,0");
  await user.click(entry().getByRole("button", { name: "Check results" }));
  expect(entry().getByRole("button", { name: "Use these results" }).disabled).toBe(true);
  await user.selectOptions(entry().getByLabelText("Learning focus for row 1"), "quantity-fractions");
  expect(entry().getByLabelText("Learning focus for row 2").value).toBe("mental-place-change");
  await user.click(entry().getByRole("button", { name: "Use these results" }));
  expect(screen.getByRole("checkbox", { name: "Include fractions of a set of objects" }).checked).toBe(true);
  expect(screen.getByRole("checkbox", { name: "Include adding and subtracting ones, tens and hundreds" }).checked).toBe(false);
  expect(screen.getByText("30% correct")).toBeTruthy();
  await user.click(createButton());
  const first = await openFirstLesson(user);
  expect(first.getByRole("link", { name: "Open resource" }).getAttribute("href")).toContain("fractions-of-a-set-of-objects");
  await user.click(first.getByText("Why this lesson?"));
  expect(first.getByText(/9\/30 answered/)).toBeTruthy();
});

it("blocks invalid imports and pending pastes, preserves the current plan and flags it as out of date", async () => {
  const user = userEvent.setup(); mount();
  await add(user, "fractions of amounts", "Find fractions of quantities");
  await user.click(createButton());
  const first = await openFirstLesson(user);
  await user.click(first.getByRole("button", { name: "Edit lesson" }));
  await user.type(first.getByLabelText("Teacher notes (no pupil names)"), "Keep my lesson edits");
  await user.click(entry().getByRole("button", { name: "Paste results" }));
  await user.type(entry().getByLabelText("Paste class topic results"), "Topic,Correct,Answered\nEquivalent fractions,31,30");
  await user.click(entry().getByRole("button", { name: "Check results" }));
  expect(entry().getByRole("alert").textContent).toContain("correct cannot exceed answered");
  expect(createButton().disabled).toBe(true);
  await user.clear(entry().getByLabelText("Paste class topic results"));
  await user.type(entry().getByLabelText("Paste class topic results"), "Topic,Correct,Answered\nEquivalent fractions,9,30");
  await user.click(entry().getByRole("button", { name: "Check results" }));
  expect(screen.getByText("Press “Use these results” in step 1 first.")).toBeTruthy();
  await user.click(entry().getByRole("button", { name: "Use these results" }));
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep my lesson edits");
  expect(screen.getByText(/Your class needs changed/)).toBeTruthy();
  await user.click(createButton());
  await user.click(screen.getByRole("button", { name: "Keep current plan" }));
  expect(first.getByLabelText("Teacher notes (no pupil names)").value).toBe("Keep my lesson edits");
});

it("switching back to topics restores them, and re-pressing the active tab changes nothing", async () => {
  const user = userEvent.setup(); mount();
  await add(user, "fractions of amounts", "Find fractions of quantities");
  await user.click(entry().getByRole("button", { name: "Pick topics" }));
  expect(createButton().disabled).toBe(false);
  await user.click(entry().getByRole("button", { name: "Try a sample class" }));
  expect(screen.getByText(/All eight pupils and results are fictional/)).toBeTruthy();
  await user.click(entry().getByRole("button", { name: "Try a sample class" }));
  expect(createButton().disabled).toBe(false);
  await user.click(entry().getByRole("button", { name: "Pick topics" }));
  expect(screen.queryByText(/All eight pupils and results are fictional/)).toBeNull();
  expect(screen.getByRole("checkbox", { name: "Include fractions of a set of objects" }).checked).toBe(true);
});

it("does not infer pupil groups or write class input to storage, and does not retain data after remount", async () => {
  const user = userEvent.setup();
  const writes = vi.spyOn(Storage.prototype, "setItem");
  const mounted = mount();
  await add(user, "finding halves", "Find fractions of quantities");
  expect(screen.queryByText("Details")).toBeNull();
  expect(screen.queryByText(/^\d+% correct$/)).toBeNull();
  expect(writes).not.toHaveBeenCalled();
  mounted.unmount(); mount();
  expect(createButton().disabled).toBe(true);
});
