import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import TeacherPractice from "../../src/pages/teachers/TeacherPractice";

const at = (path = "/teachers/practice") => render(<MemoryRouter initialEntries={[path]}><TeacherPractice /></MemoryRouter>);
const pupilQuestions = () => [...document.querySelectorAll('.pp-pupil-pages .pp-question-top p')].map((p) => p.textContent);

it("opens a topic from a briefing and makes a worksheet without writing to storage", () => {
  const local = vi.spyOn(localStorage, "setItem");
  const session = vi.spyOn(sessionStorage, "setItem");
  at("/teachers/practice?year=3&subject=math&topic=column-addition");
  expect(screen.getByLabelText("Sheet title").value).toBe("Column Addition");
  expect(pupilQuestions()).toHaveLength(8);
  expect(within(screen.getByRole("list", { name: "Selected practice topics" })).getByText("Column Addition")).toBeTruthy();
  expect(local).not.toHaveBeenCalled(); expect(session).not.toHaveBeenCalled();
});

it("reuses fuzzy search, supports three topics and provides a recovery path for empty results", async () => {
  const user = userEvent.setup(); at();
  await user.type(screen.getByRole("searchbox"), "colum addition");
  expect(screen.getByText("Did you mean one of these?")).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Column Addition" }));
  expect(screen.getByRole("searchbox").value).toBe("");
  await user.type(screen.getByRole("searchbox"), "tenths");
  await user.click(screen.getByRole("button", { name: "Tenths" }));
  expect(screen.getByRole("button", { name: "Place Value in 3-Digit Numbers" }).disabled).toBe(true);
  await user.click(screen.getByRole("button", { name: "Remove topic: Column Addition" }));
  expect(screen.getByRole("button", { name: "Place Value in 3-Digit Numbers" }).disabled).toBe(false);
  await user.type(screen.getByRole("searchbox"), "photosynthesis");
  expect(screen.getByText(/No printable topic matches/)).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Show all topics" }));
  expect(within(screen.getByRole("list", { name: "Available practice topics" })).getAllByRole("button")).toHaveLength(8);
});

it("replaces only one question, moves and removes it, and regenerates the answer numbering", async () => {
  const user = userEvent.setup(); at();
  const before = pupilQuestions();
  await user.click(screen.getByRole("button", { name: "Replace question 2" }));
  const replaced = pupilQuestions();
  expect(replaced[1]).not.toBe(before[1]);
  expect(replaced.filter((_, n) => n !== 1)).toEqual(before.filter((_, n) => n !== 1));
  await user.click(screen.getByRole("button", { name: "Move question 2 up" }));
  const moved = pupilQuestions();
  expect(moved[0]).toBe(replaced[1]); expect(moved[1]).toBe(replaced[0]);
  await user.click(screen.getByRole("button", { name: "Remove question 1" }));
  expect(pupilQuestions()).toHaveLength(7);
  await user.click(screen.getByRole("button", { name: "Answer key", exact: true }));
  const answers = screen.getAllByRole("article", { name: /Answers, page/ });
  const first = within(answers[0]).getAllByRole("listitem")[0];
  expect(within(first).getByText(replaced[0])).toBeTruthy();
  expect(first.querySelector('.pp-answer-number').textContent).toBe("1.");
  expect(document.querySelector('.pp-pupil-pages').hidden).toBe(true);
});

it("updates pagination and support without changing questions, and retains the teacher's title and instructions", async () => {
  const user = userEvent.setup(); at("/teachers/practice?year=3&subject=math&topic=column-addition");
  await user.clear(screen.getByLabelText("Sheet title")); await user.type(screen.getByLabelText("Sheet title"), "Friday practice");
  await user.clear(screen.getByLabelText("Instructions")); await user.type(screen.getByLabelText("Instructions"), "Show your method.");
  const before = pupilQuestions();
  const pages = document.querySelectorAll('.pp-pupil-pages .pp-page').length;
  for (const label of ["Examples & reminders", "Vocabulary strip", "Extra visual models", "More working space"]) await user.click(screen.getByLabelText(label));
  expect(pupilQuestions()).toEqual(before);
  expect(document.querySelectorAll('.pp-pupil-pages .pp-page').length).toBeGreaterThan(pages);
  expect(screen.getAllByText(/Words to use/)).toHaveLength(1);
  expect(screen.getAllByText(/Worked example ·/)).toHaveLength(1);
  await user.selectOptions(screen.getByLabelText("Questions"), "12");
  expect(pupilQuestions()).toHaveLength(12);
  expect(screen.getByLabelText("Sheet title").value).toBe("Friday practice");
  expect(screen.getByLabelText("Instructions").value).toBe("Show your method.");
  await user.selectOptions(screen.getByLabelText("Question mix"), "application");
  expect(pupilQuestions().every((text) => /column method/i.test(text))).toBe(true);
});

it("prints the chosen content independently from the preview and never puts question answers on the pupil sheet", async () => {
  const user = userEvent.setup(); const print = vi.spyOn(window, "print").mockImplementation(() => {});
  at("/teachers/practice?year=3&subject=math&topic=column-subtraction");
  const questions = pupilQuestions();
  // The pupil view has no answer-value elements. The separate answer collection
  // remains hidden until deliberately previewed, regardless of print choice.
  expect(document.querySelector('.pp-pupil-pages .pp-answer-value')).toBeNull();
  expect(document.querySelector('.pp-answer-pages').hidden).toBe(true);
  await user.click(screen.getByRole("button", { name: "Answer key", exact: true }));
  for (const mode of ["pupil", "answers", "both"]) {
    await user.selectOptions(screen.getByLabelText("Print content"), mode);
    await user.click(screen.getByRole("button", { name: "Print / save PDF" }));
    expect(document.querySelector('.teacher-practice').classList.contains(`pp-print-${mode}`)).toBe(true);
  }
  expect(print).toHaveBeenCalledTimes(3);
  expect(pupilQuestions()).toEqual(questions);
});

it("handles empty sheets and unsupported deep links without crashing", () => {
  at("/teachers/practice?year=6&subject=english&topic=nothing");
  fireEvent.click(screen.getByRole("button", { name: /Remove topic:/ }));
  expect(pupilQuestions()).toHaveLength(0);
  expect(screen.getByRole("button", { name: "Print / save PDF" }).disabled).toBe(true);
  expect(screen.getByRole("heading", { name: "Start with a topic" })).toBeTruthy();
  fireEvent.click(within(screen.getByRole("list", { name: "Available practice topics" })).getAllByRole("button")[0]);
  expect(pupilQuestions()).toHaveLength(8);
});

it("switches search subject without discarding selected topics or the teacher's edits", async () => {
  const user = userEvent.setup(); at();
  await user.clear(screen.getByLabelText("Sheet title")); await user.type(screen.getByLabelText("Sheet title"), "My mixed practice");
  await user.selectOptions(screen.getByLabelText("Subject"), "science");
  await user.type(screen.getByRole("searchbox"), "plants need");
  await user.click(screen.getByRole("button", { name: "What Plants Need to Grow" }));
  expect(within(screen.getByRole("list", { name: "Selected practice topics" })).getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByLabelText("Sheet title").value).toBe("My mixed practice");
  expect(document.querySelector('.pp-paper-kicker').textContent).toMatch(/Maths.*Science/);
  expect(pupilQuestions()).toHaveLength(8);
});

it("opens English dictation with teacher scripts kept out of the pupil pages", async () => {
  const user = userEvent.setup(); at("/teachers/practice?year=3&subject=english&topic=dictation");
  expect(screen.getByLabelText("Subject").value).toBe("english");
  expect(pupilQuestions().length).toBeGreaterThan(0);
  expect(pupilQuestions().every((prompt) => /Listen as your teacher/.test(prompt))).toBe(true);
  expect(document.querySelector('.pp-pupil-pages').textContent).not.toMatch(/Teacher script:/);
  await user.click(screen.getByRole("button", { name: "Answer key", exact: true }));
  expect(screen.getAllByText(/Teacher script:/).length).toBeGreaterThan(0);
});

it("renders geography and history evidence with each question", () => {
  const first = at("/teachers/practice?year=3&subject=geography&topic=volcanoes");
  expect(screen.getByLabelText("Subject").value).toBe("geography");
  expect(document.querySelector('.pp-pupil-pages .pp-source-model')).toBeTruthy();
  first.unmount();
  at("/teachers/practice?year=3&subject=history&topic=how-we-know-about-prehistory");
  expect(screen.getByLabelText("Subject").value).toBe("history");
  expect(document.querySelector('.pp-pupil-pages .pp-source-model')).toBeTruthy();
});

it("changes year and restores that year's edited draft, with the correct paper and answer labels", async () => {
  const user = userEvent.setup(); at();
  await user.clear(screen.getByLabelText("Sheet title")); await user.type(screen.getByLabelText("Sheet title"), "Friday Year 3");
  await user.click(screen.getByRole("button", { name: "Remove question 1" }));
  await user.clear(screen.getByLabelText("Instructions")); await user.type(screen.getByLabelText("Instructions"), "Use tens rods.");
  const year3 = pupilQuestions();
  await user.selectOptions(screen.getByLabelText("Year"), "1");
  expect(document.querySelector('.pp-paper-kicker').textContent).toMatch(/Year 1 · Maths/);
  expect(pupilQuestions()).toHaveLength(8);
  await user.selectOptions(screen.getByLabelText("Subject"), "science");
  const available = screen.getByRole("list", { name: "Available practice topics" });
  await user.click(within(available).getAllByRole("button")[0]);
  expect(within(screen.getByRole("list", { name: "Selected practice topics" })).getAllByRole("listitem")).toHaveLength(2);
  await user.clear(screen.getByLabelText("Instructions")); await user.type(screen.getByLabelText("Instructions"), "Read each card.");
  await user.click(screen.getByLabelText("Vocabulary strip"));
  const year1 = pupilQuestions();
  await user.selectOptions(screen.getByLabelText("Year"), "3");
  expect(screen.getByLabelText("Sheet title").value).toBe("Friday Year 3");
  expect(pupilQuestions()).toEqual(year3);
  expect(screen.getByLabelText("Instructions").value).toBe("Use tens rods.");
  expect(screen.getByLabelText("Vocabulary strip").checked).toBe(false);
  await user.selectOptions(screen.getByLabelText("Year"), "1");
  expect(pupilQuestions()).toEqual(year1);
  expect(screen.getByLabelText("Instructions").value).toBe("Read each card.");
  expect(screen.getByLabelText("Vocabulary strip").checked).toBe(true);
  expect(screen.getByLabelText("Subject").value).toBe("science");
  await user.click(screen.getByRole("button", { name: "Answer key", exact: true }));
  expect(document.querySelector('.pp-answer-pages .pp-paper-kicker').textContent).toMatch(/Year 1.*Teacher answer key/);
});

it.each([1, 2, 4, 5, 6])("opens Year %s English dictation with a separate teacher script", (year) => {
  at(`/teachers/practice?year=${year}&subject=english&topic=${year === 6 ? "year-6-dictation" : "dictation"}`);
  expect(screen.getByLabelText("Year").value).toBe(String(year));
  expect(screen.getByLabelText("Subject").value).toBe("english");
  expect(pupilQuestions()).toHaveLength(8);
  expect(document.querySelector('.pp-pupil-pages').textContent).not.toMatch(/Teacher script:/);
  expect(document.querySelector('.pp-answer-pages').textContent).toMatch(/Teacher script:/);
  expect(document.querySelector('.pp-paper-kicker').textContent).toContain(`Year ${year}`);
});
