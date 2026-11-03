import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import Challenge from "../../src/pages/curriculum/Challenge";
import LessonFrame from "../../src/components/challenge/lesson/LessonFrame";
import LessonExample from "../../src/components/challenge/lesson/LessonExample";
import { LESSONS, getLesson } from "../../src/data/lessons/index";
import { buildTheSuffixOusQuestions } from "../../src/data/challenges/english/year4TheSuffixOus";
import { buildRootsAndOriginsQuestions } from "../../src/data/challenges/english/year5RootsAndOrigins";
import { buildYear5Math } from "../../src/data/challenges/year5Math/questions";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
afterEach(() => { vi.useRealTimers(); document.body.classList.remove("dark"); });

it("renders all 460 added lesson examples with visible text in both themes", () => {
  const lessons = [LESSONS.english[4], LESSONS.english[5], LESSONS.math[5]].flatMap(topics => Object.values(topics).flat());
  expect(lessons).toHaveLength(460);
  for (const theme of ["light", "dark"]) {
    document.body.classList.toggle("dark", theme === "dark");
    for (const lesson of lessons) {
      const { container } = render(<LessonExample example={lesson.example} />);
      expect(container.querySelector("figure").textContent).toContain(lesson.example.title);
      expect(container.querySelector("figure").children.length).toBeGreaterThan(1);
      if (lesson.example.type === "diagram") expect(screen.getByRole("img").getAttribute("aria-label")).toBe(lesson.example.label);
      cleanup();
    }
  }
}, 30000);

it("keeps the worked diagram available when reopening tips and returns focus to the toggle", () => {
  const lesson = getLesson("math", 5, "reflecting-shapes", 1);
  render(<LessonFrame subjectName="Maths" level={1} lesson={lesson}><h3 className="challenge-title">Question</h3></LessonFrame>);
  expect(screen.getByRole("img", { name: lesson.example.label })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: /Let's go/ }));
  const toggle = screen.getByRole("button", { name: /Bix's tips/ });
  fireEvent.click(toggle);
  expect(screen.getByRole("img", { name: lesson.example.label })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Back to my question" }));
  expect(document.activeElement).toBe(toggle);
  expect(screen.queryByRole("img", { name: lesson.example.label })).toBeNull();
});

it.each([
  { subject: "english", year: 4, topic: "the-suffix-ous", build: () => buildTheSuffixOusQuestions(1, () => .375), check: "Check" },
  { subject: "english", year: 5, topic: "roots-and-origins", build: () => buildRootsAndOriginsQuestions(1, () => .375), check: "Check" },
  { subject: "math", year: 5, topic: "prime-and-composite-numbers", build: () => buildYear5Math("primes", 1, () => .375), check: "Check my answer" },
])("loads Year $year $subject through its real route, retries and completes after the lesson", async ({ subject, year, topic, build, check }) => {
  vi.spyOn(Math, "random").mockReturnValue(.375);
  const done = vi.fn();
  render(<MemoryRouter initialEntries={[`/year/${year}/${subject}/problem/category/${topic}/1`]}><Routes>
    <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<Challenge onComplete={done} />} />
  </Routes></MemoryRouter>);
  const start = await screen.findByRole("button", { name: /Let's go/ });
  expect(screen.getByRole("region", { name: "Bix's tips" })).toBeTruthy();
  expect(done).not.toHaveBeenCalled();
  fireEvent.click(start);
  vi.useFakeTimers();
  const questions = build();
  for (const [i, q] of questions.entries()) {
    expect(screen.getByText(`Question ${i + 1} of ${questions.length}`)).toBeTruthy();
    if (i === 0) {
      const wrong = q.options.find(option => option !== q.answer);
      fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: check }));
      expect(done).not.toHaveBeenCalled();
      expect(screen.getByText(`Question 1 of ${questions.length}`)).toBeTruthy();
      expect(document.querySelector(".feedback")).toBeTruthy();
    }
    fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: check }));
    expect(done).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1000));
  }
  expect(done).toHaveBeenCalledTimes(1);
  expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
});
