import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { store } from "../../src/data/store/localStorageStore.js";
import CurriculumJourneySessionProvider from "../../src/components/curriculum/CurriculumJourneySessionProvider";
import CurriculumEntryBoundary from "../../src/components/curriculum/CurriculumEntryBoundary";
import AssessmentView from "../../src/pages/curriculum/AssessmentView";
import CurriculumPage from "../../src/pages/curriculum/CurriculumPage";
import bank from "../../shared/curriculumAssessments/math/year3.js";
import intros from "../../src/data/curriculumIntroductions/math/year3.js";

// The browser-local driver runs the same shared protocol as the API service.
vi.mock("../../src/data/store/index.js", async () => ({ store: (await import("../../src/data/store/localStorageStore.js")).store }));
vi.mock("../../src/data/curriculumJourneyFlag.js", () => ({ CURRICULUM_JOURNEY_ENABLED: true }));

const CHILD = "child-journey";
const QUEST = "number---fractions";
const quest = intros.quests[QUEST];

function Where() { const location = useLocation(); return <span data-testid="where">{location.pathname}{location.search}</span>; }

function renderAt(url, element, path, child = CHILD) {
  return render(<AuthContext.Provider value={{ child: { _id: child } }}>
    <CurriculumJourneySessionProvider key={child}>
      <MemoryRouter initialEntries={[url]}>
        <Routes><Route path={path} element={<>{element}<Where /></>} /></Routes>
      </MemoryRouter>
    </CurriculumJourneySessionProvider>
  </AuthContext.Provider>);
}

const challenge = (topicId = "tenths") => <CurriculumEntryBoundary year={3} subject="math" target="challenge" categoryId={QUEST} topicId={topicId}>
  <p>Challenge content</p></CurriculumEntryBoundary>;
const acknowledged = async () => (await store.getCurriculumJourney(CHILD, 3, "math"))?.data.acknowledged.map((a) => a.scopeId) ?? [];

describe("curriculum introductions", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("shows subject → quest → topic before mounting a challenge, then never repeats them", async () => {
    const first = renderAt("/c", challenge("tenths"), "/c");
    expect(await screen.findByRole("heading", { level: 1, name: "Welcome to Year 3 Maths" })).toBeTruthy();
    expect(screen.queryByText("Challenge content")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByRole("heading", { level: 1, name: quest.introduction.title })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Skip this introduction" }));
    expect(await screen.findByRole("heading", { level: 1, name: quest.topics.tenths.title })).toBeTruthy();
    expect(screen.queryByText("Challenge content")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Challenge content")).toBeTruthy();
    expect(await acknowledged()).toEqual(["subject", `quest:${QUEST}`, `topic:${QUEST}:tenths`]);
    first.unmount();

    renderAt("/c", challenge("tenths"), "/c");
    expect(await screen.findByText("Challenge content")).toBeTruthy();
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });

  it("“Go straight to the activity” saves only this entry's scopes in one write", async () => {
    const spy = vi.spyOn(store, "acknowledgeCurriculumIntroductions");
    renderAt("/c", challenge("equivalent-fractions"), "/c");
    fireEvent.click(await screen.findByRole("button", { name: "Go straight to the activity" }));
    expect(await screen.findByText("Challenge content")).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(await acknowledged()).toEqual(["subject", `quest:${QUEST}`, `topic:${QUEST}:equivalent-fractions`]);
  });

  it("a failed save offers retry or continue-for-now, and a failed read never writes", async () => {
    vi.spyOn(store, "acknowledgeCurriculumIntroductions").mockRejectedValueOnce(Object.assign(new Error("x"), { code: "JOURNEY_SAVE_FAILED" }));
    const first = renderAt("/c", challenge("tenths"), "/c");
    fireEvent.click(await screen.findByRole("button", { name: "Continue" }));
    expect(await screen.findByText(/couldn’t save that just now/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Continue for now" }));
    expect(await screen.findByText("Challenge content")).toBeTruthy();
    expect(await acknowledged()).toEqual([]);
    first.unmount();
    vi.restoreAllMocks();

    vi.spyOn(store, "getCurriculumJourney").mockRejectedValue(new Error("offline"));
    const write = vi.spyOn(store, "acknowledgeCurriculumIntroductions");
    renderAt("/c", challenge("tenths"), "/c", "other-child");
    fireEvent.click(await screen.findByRole("button", { name: "Continue for now" }));
    expect(await screen.findByText("Challenge content")).toBeTruthy();
    expect(write).not.toHaveBeenCalled();
  });

  it("an explicit map replay shows an acknowledged intro again, every time, and tidies the URL", async () => {
    await store.acknowledgeCurriculumIntroductions(CHILD, 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] });
    const map = <CurriculumEntryBoundary year={3} subject="math" target="map"><p>Quest map</p></CurriculumEntryBoundary>;
    const first = renderAt(`/m?intro=topic&category=${QUEST}&topic=tenths`, map, "/m");
    expect(await screen.findByRole("heading", { level: 1, name: quest.topics.tenths.title })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await waitFor(() => expect(screen.getByTestId("where").textContent).toBe("/m"));
    expect(screen.getByText("Quest map")).toBeTruthy();
    first.unmount();
    renderAt(`/m?intro=subject`, map, "/m");
    expect(await screen.findByRole("heading", { level: 1, name: "Welcome to Year 3 Maths" })).toBeTruthy();
  });

  it("an invalid replay shows a safe message and writes nothing", async () => {
    const write = vi.spyOn(store, "acknowledgeCurriculumIntroductions");
    renderAt(`/m?intro=topic&category=${QUEST}&topic=not-a-topic`, <CurriculumEntryBoundary year={3} subject="math" target="map"><p>Quest map</p></CurriculumEntryBoundary>, "/m");
    expect(await screen.findByText("That introduction is not available.")).toBeTruthy();
    expect(write).not.toHaveBeenCalled();
  });
});

const answerFor = (prompt) => bank.items.find((item) => item.public.prompt === prompt);

async function answerCurrent({ correct = true } = {}) {
  const prompt = (await screen.findByRole("heading", { level: 2, name: (name) => bank.items.some((i) => i.public.prompt === name) })).textContent;
  const item = answerFor(prompt);
  const input = item.public.input;
  if (!correct || input.kind === "order") {
    fireEvent.click(screen.getByRole("button", { name: "I’m not sure" }));
    return { item, outcome: "skipped" };
  }
  if (input.kind === "number") {
    for (const digit of String(item.scoring.accepted[0])) fireEvent.click(within(screen.getByRole("group", { name: "Number keypad" })).getByRole("button", { name: digit }));
  } else if (input.kind === "choice") {
    const label = input.options.find((o) => o.id === item.scoring.accepted[0]).label;
    fireEvent.click(screen.getByRole("radio", { name: label }));
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  return { item, outcome: "correct" };
}

async function startQuiz() {
  const start = await screen.findByRole("button", { name: "Start the quiz" });
  await waitFor(() => expect(start.disabled).toBe(false));
  fireEvent.click(start);
}

describe("Quest Mastery quiz", () => {
  beforeEach(async () => {
    for (const scopeId of ["subject", `quest:${QUEST}`]) {
      await store.acknowledgeCurriculumIntroductions(CHILD, 3, "math", { acknowledgements: [{ scopeId, contentVersion: 1 }] });
    }
  });

  it("runs start → answers/skips → sections → finish → results, without touching challenge progress", async () => {
    localStorage.setItem("dl.progress", "[]");
    renderAt(`/curriculum/year/3/math/quest/${QUEST}/mastery`, <AssessmentView />, "/curriculum/year/:year/:subject/quest/:categoryId/mastery");
    await startQuiz();
    await waitFor(() => expect(screen.getByTestId("where").textContent).toMatch(/\?session=[0-9a-f-]{36}$/));
    const outcomes = [];
    for (let n = 1; n <= 7; n++) {
      const { outcome } = await answerCurrent({ correct: n !== 2 });
      outcomes.push(outcome);
      const review = await screen.findByRole("status");
      expect(review.textContent).toMatch(outcome === "correct" ? /That’s right!/ : /not sure/);
      fireEvent.click(screen.getByRole("button", { name: n === 7 ? "See how I did" : "Next question" }));
      if (n === 4) fireEvent.click(await screen.findByRole("button", { name: "Keep going" }));
    }
    fireEvent.click(await screen.findByRole("button", { name: "See my results" }));
    const correct = outcomes.filter((o) => o === "correct").length;
    expect(await screen.findByText((_, el) => el?.className === "cj-score" && el.textContent === `${correct} correct out of 7`)).toBeTruthy();
    expect(screen.getByText(`? ${7 - correct} “I’m not sure”`)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Try practising" })).toBeTruthy();
    expect(localStorage.getItem("dl.progress")).toBe("[]");
    const session = JSON.parse(localStorage.getItem("dl.curriculumAssessments"))[0];
    expect(session.status).toBe("completed");
    expect(session.items.map((i) => i.topicId).sort()).toEqual(Object.keys(quest.topics).sort());
  });

  it("resumes at the saved review, and a failed save keeps the answer and retries with the same submission", async () => {
    const view = renderAt(`/curriculum/year/3/math/quest/${QUEST}/mastery`, <AssessmentView />, "/curriculum/year/:year/:subject/quest/:categoryId/mastery");
    await startQuiz();
    await waitFor(() => expect(screen.getByTestId("where").textContent).toMatch(/session=/));
    const url = screen.getByTestId("where").textContent;

    const submit = vi.spyOn(store, "submitCurriculumAssessmentResponse");
    submit.mockRejectedValueOnce(Object.assign(new Error("offline"), { code: "NETWORK" }));
    await answerCurrent({ correct: false });
    expect(await screen.findByText(/couldn’t save your answer/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "I’m not sure" }));
    expect(await screen.findByRole("status")).toBeTruthy();
    expect(submit).toHaveBeenCalledTimes(2);
    expect(submit.mock.calls[1][4].submissionId).toBe(submit.mock.calls[0][4].submissionId);
    const firstPrompt = screen.getByRole("heading", { level: 2 }).textContent;
    view.unmount();

    renderAt(url, <AssessmentView />, "/curriculum/year/:year/:subject/quest/:categoryId/mastery");
    expect(await screen.findByRole("button", { name: "Next question" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(firstPrompt);
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(await screen.findByText("Question 2 of 7")).toBeTruthy();
  });

  it("shows a safe message for an unknown quest and keeps the map link", async () => {
    renderAt(`/curriculum/year/3/math/quest/not-a-quest/mastery`, <AssessmentView />, "/curriculum/year/:year/:subject/quest/:categoryId/mastery");
    expect(await screen.findByText("We couldn’t find that quiz")).toBeTruthy();
  });

  it("never sends a score: the stored outcome comes from the store's own scoring", async () => {
    await act(async () => {
      const started = await store.startCurriculumAssessment(CHILD, 3, "math", { sessionId: crypto.randomUUID(), kind: "quest", categoryId: QUEST });
      expect(started.items.every((item) => item.review === undefined && !("scoring" in item))).toBe(true);
    });
  });
});

describe("subject map with the journey enabled", () => {
  it("adds replay links, a quiz card per built quest and the final test, from one overview request", async () => {
    await store.acknowledgeCurriculumIntroductions(CHILD, 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] });
    const overview = vi.spyOn(store, "getCurriculumAssessmentOverview");
    renderAt("/curriculum/year/3/math", <CurriculumPage />, "/curriculum/year/:year/:subject");
    // The map stays hidden until the pathway content has loaded.
    expect(await screen.findByRole("link", { name: /About this subject/ }, { timeout: 5000 })).toBeTruthy();
    const card = await screen.findByRole("region", { name: "Quest Mastery: Fractions" });
    expect(within(card).getByRole("link", { name: "Try Quest Mastery" }).getAttribute("href")).toBe(`/curriculum/year/3/math/quest/${QUEST}/mastery`);
    expect(screen.getByRole("region", { name: "Year 3 Maths Final Test" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "About this topic: Tenths" }).getAttribute("href")).toBe(`/curriculum/year/3/math?intro=topic&category=${QUEST}&topic=tenths`);
    await waitFor(() => expect(within(card).queryByText("Checking your saved quizzes…")).toBeNull());
    expect(overview).toHaveBeenCalledTimes(1);
  });

  it("an overview failure shows Retry, not “no attempts”", async () => {
    await store.acknowledgeCurriculumIntroductions(CHILD, 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] });
    vi.spyOn(store, "getCurriculumAssessmentOverview").mockRejectedValue(new Error("offline"));
    renderAt("/curriculum/year/3/math", <CurriculumPage />, "/curriculum/year/:year/:subject");
    const card = await screen.findByRole("region", { name: "Quest Mastery: Fractions" }, { timeout: 5000 });
    expect(await within(card).findByText(/couldn’t check your saved quizzes/)).toBeTruthy();
  });
});
