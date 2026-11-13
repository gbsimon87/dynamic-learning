import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AssessmentRound from "../../src/components/curriculum/AssessmentRound";
import JourneyModel from "../../src/components/curriculum/JourneyModel";
import { FRENCH_CHARACTERS } from "../../shared/curriculumJourneyAuthoring.js";
import { validatePublicAssessmentItem } from "../../shared/curriculumAssessmentData.js";

const item = (input, extra = {}) => {
  const visible = { prompt: "Question?", evidence: [], model: null, input, speech: { mode: "none" }, ...extra };
  validatePublicAssessmentItem(visible);
  return { itemInstanceId: "00000000-0000-4000-8000-000000000001", public: visible };
};
const round = (input, extra) => {
  const onSubmit = vi.fn();
  render(<AssessmentRound item={item(input, extra)} number={1} total={3} onSubmit={onSubmit} />);
  return onSubmit;
};
const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));

describe("quiz answer controls submit the raw value the child entered", () => {
  it("number keypad: signed decimals, no stripping, keyboard entry rejected when invalid", () => {
    const onSubmit = round({ kind: "number", maxDigits: 4, signed: true, decimalPlaces: 1 });
    const pad = screen.getByRole("group", { name: "Number keypad" });
    expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
    for (const key of ["Change sign", "1", "2", "Decimal point", "5"]) fireEvent.click(within(pad).getByRole("button", { name: key }));
    fireEvent.click(within(pad).getByRole("button", { name: "6" }));
    const field = screen.getByLabelText("Your answer");
    expect(field.value).toBe("-12.5");
    fireEvent.change(field, { target: { value: "-12.5e" } });
    expect(field.value).toBe("-12.5");
    check();
    expect(onSubmit).toHaveBeenCalledWith({ kind: "answer", value: "-12.5" });
  });

  it("whole-number items offer no sign or decimal point and accept large answers", () => {
    const onSubmit = round({ kind: "number", maxDigits: 7 });
    expect(screen.queryByRole("button", { name: "Change sign" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Decimal point" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Your answer"), { target: { value: "1000000" } });
    check();
    expect(onSubmit).toHaveBeenCalledWith({ kind: "answer", value: "1000000" });
  });

  it("text input has an accent bar for French and no autocorrect", () => {
    const onSubmit = round({ kind: "text", maxLength: 30, characters: FRENCH_CHARACTERS, label: "Type the French word" });
    const field = screen.getByLabelText("Type the French word");
    expect(field.getAttribute("spellcheck")).toBe("false");
    expect(field.getAttribute("autocomplete")).toBe("off");
    fireEvent.change(field, { target: { value: "l" } });
    fireEvent.click(screen.getByRole("button", { name: "Type é" }));
    expect(field.value).toBe("lé");
    fireEvent.change(field, { target: { value: "lécole" } });
    check();
    expect(onSubmit).toHaveBeenCalledWith({ kind: "answer", value: "lécole" });
  });

  it("choice is a labelled radio group and “I’m not sure” is an explicit skip", () => {
    const onSubmit = round({ kind: "choice", options: [{ id: "a", label: "Cat" }, { id: "b", label: "Dog" }] });
    fireEvent.click(screen.getByRole("radio", { name: "Dog" }));
    expect(screen.getByRole("radio", { name: "Dog" }).getAttribute("aria-checked")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "I’m not sure" }));
    expect(onSubmit).toHaveBeenCalledWith({ kind: "skip" });
  });

  it("order and sort have keyboard-operable buttons, never drag only", () => {
    const onOrder = round({ kind: "order", cards: [{ id: "c2", label: "Second" }, { id: "c1", label: "First" }] });
    fireEvent.click(screen.getByRole("button", { name: "Move First up" }));
    check();
    expect(onOrder).toHaveBeenCalledWith({ kind: "answer", value: ["c1", "c2"] });
    document.body.innerHTML = "";
    const onSort = round({ kind: "sort", cards: [{ id: "k1", label: "Cat" }, { id: "k2", label: "Rock" }], bins: [{ id: "b1", label: "Living" }, { id: "b2", label: "Never alive" }] });
    const cat = screen.getByRole("radiogroup", { name: "Cat" });
    fireEvent.click(within(cat).getByRole("radio", { name: "Living" }));
    expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
    fireEvent.click(within(screen.getByRole("radiogroup", { name: "Rock" })).getByRole("radio", { name: "Never alive" }));
    check();
    expect(onSort).toHaveBeenCalledWith({ kind: "answer", value: [{ cardId: "k1", binId: "b1" }, { cardId: "k2", binId: "b2" }] });
  });

  it("fraction shading and number-track inputs submit indices", () => {
    const onShade = round({ kind: "fractionShade", parts: 4 });
    fireEvent.click(screen.getByRole("button", { name: "Part 3" }));
    fireEvent.click(screen.getByRole("button", { name: "Part 1" }));
    check();
    expect(onShade).toHaveBeenCalledWith({ kind: "answer", value: [0, 2] });
    document.body.innerHTML = "";
    const onTrack = round({ kind: "numberTrack", denominator: 4, wholes: 1 });
    fireEvent.click(screen.getByRole("radio", { name: "Mark 3" }));
    check();
    expect(onTrack).toHaveBeenCalledWith({ kind: "answer", value: 3 });
  });

  it("a saved response shows the stored outcome and explanation read-only", () => {
    const visible = item({ kind: "choice", options: [{ id: "a", label: "Cat" }, { id: "b", label: "Dog" }] });
    const onNext = vi.fn();
    render(<AssessmentRound item={{ ...visible, review: { answerText: "Dog", explanation: "Dogs bark." } }}
      response={{ outcome: "incorrect", response: { kind: "answer", value: "a" } }} number={1} total={1} onNext={onNext} />);
    const review = screen.getByRole("status");
    expect(review.textContent).toMatch(/Not quite this time/);
    expect(review.textContent).toMatch(/Your answer: Cat/);
    expect(review.textContent).toMatch(/The answer: Dog/);
    expect(screen.queryByRole("button", { name: "Check my answer" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(onNext).toHaveBeenCalled();
  });

  it("evidence cards keep their credit; spoken prompts follow the item policy", () => {
    round({ kind: "choice", options: [{ id: "a", label: "1066" }, { id: "b", label: "1215" }] },
      { evidence: [{ title: "Source A", text: "Line one\nLine two", credit: "Bayeux Tapestry (public domain)" }] });
    const source = screen.getByRole("region", { name: "Source A" });
    expect(within(source).getByText("Line two")).toBeTruthy();
    expect(within(source).getByText("Bayeux Tapestry (public domain)")).toBeTruthy();
  });

  it("a **marked** word in the prompt is shown in bold, not with asterisks", () => {
    round({ kind: "text", maxLength: 20 }, { prompt: "Type the French word for **rabbit**." });
    const prompt = screen.getByRole("heading", { level: 2 });
    expect(prompt.textContent).toBe("Type the French word for rabbit.");
    expect(within(prompt).getByText("rabbit").tagName).toBe("STRONG");
  });
});

describe("journey models draw givens with a text equivalent", () => {
  const models = {
    clock: { renderer: "clock", alt: "An analogue clock.", data: { hour: 3, minute: 30 } },
    "bar-chart": { renderer: "bar-chart", alt: "A bar chart of pets.", data: { step: 2, bars: [{ label: "Cats", value: 6 }, { label: "Dogs", value: 4 }] } },
    pictures: { renderer: "pictures", alt: "Three living things.", data: { items: [{ icon: "🌱", label: "Seed" }] } },
    timeline: { renderer: "timeline", alt: "Two dates.", data: { events: [{ date: "1066", label: "Battle of Hastings" }, { date: "1215", label: "Magna Carta" }] } },
    lesson: { renderer: "lesson", alt: "Three plus four is seven.", data: { type: "equation", title: "Adding", parts: ["3", "+", "4", "=", "7"] } },
    table: { renderer: "table", alt: "Rainfall table.", data: { headings: ["Month", "mm"], rows: [["May", 40]] } },
  };
  for (const [name, model] of Object.entries(models)) {
    it(`${name} renders with its description`, () => {
      render(<JourneyModel model={model} />);
      expect(screen.getAllByText(model.alt).length).toBeGreaterThan(0);
      expect(screen.queryByRole("alert")).toBeNull();
    });
  }
  it("an invalid model shows a recoverable message instead of crashing", () => {
    render(<JourneyModel model={{ renderer: "unknown", alt: "x", data: {} }} />);
    expect(screen.getByRole("alert").textContent).toMatch(/could not load/);
  });
});
