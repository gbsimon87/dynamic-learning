import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildActiveAndPassiveVoice } from "../../src/data/challenges/authored/year6/english/active-and-passive-voice.js";
import { buildFormalStructuresAndTheSubjunctive } from "../../src/data/challenges/authored/year6/english/formal-structures-and-the-subjunctive.js";
import { buildExpandedNounPhrasesForInformation } from "../../src/data/challenges/authored/year6/english/expanded-noun-phrases-for-information.js";
import ActiveAndPassiveVoiceChallenge1 from "../../src/pages/skills/english/challenges/year6/active-and-passive-voice/ActiveAndPassiveVoiceChallenge1.jsx";
import FormalStructuresAndTheSubjunctiveChallenge1 from "../../src/pages/skills/english/challenges/year6/formal-structures-and-the-subjunctive/FormalStructuresAndTheSubjunctiveChallenge1.jsx";
import ExpandedNounPhrasesForInformationChallenge1 from "../../src/pages/skills/english/challenges/year6/expanded-noun-phrases-for-information/ExpandedNounPhrasesForInformationChallenge1.jsx";
import ActiveAndPassiveVoiceChallenge2 from "../../src/pages/skills/english/challenges/year6/active-and-passive-voice/ActiveAndPassiveVoiceChallenge2.jsx";
import ActiveAndPassiveVoiceChallenge3 from "../../src/pages/skills/english/challenges/year6/active-and-passive-voice/ActiveAndPassiveVoiceChallenge3.jsx";
import ActiveAndPassiveVoiceChallenge4 from "../../src/pages/skills/english/challenges/year6/active-and-passive-voice/ActiveAndPassiveVoiceChallenge4.jsx";
import FormalStructuresAndTheSubjunctiveChallenge2 from "../../src/pages/skills/english/challenges/year6/formal-structures-and-the-subjunctive/FormalStructuresAndTheSubjunctiveChallenge2.jsx";
import FormalStructuresAndTheSubjunctiveChallenge3 from "../../src/pages/skills/english/challenges/year6/formal-structures-and-the-subjunctive/FormalStructuresAndTheSubjunctiveChallenge3.jsx";
import FormalStructuresAndTheSubjunctiveChallenge4 from "../../src/pages/skills/english/challenges/year6/formal-structures-and-the-subjunctive/FormalStructuresAndTheSubjunctiveChallenge4.jsx";
import ExpandedNounPhrasesForInformationChallenge2 from "../../src/pages/skills/english/challenges/year6/expanded-noun-phrases-for-information/ExpandedNounPhrasesForInformationChallenge2.jsx";
import ExpandedNounPhrasesForInformationChallenge3 from "../../src/pages/skills/english/challenges/year6/expanded-noun-phrases-for-information/ExpandedNounPhrasesForInformationChallenge3.jsx";
import ExpandedNounPhrasesForInformationChallenge4 from "../../src/pages/skills/english/challenges/year6/expanded-noun-phrases-for-information/ExpandedNounPhrasesForInformationChallenge4.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

const topics = [
  ["voice", buildActiveAndPassiveVoice, [ActiveAndPassiveVoiceChallenge1, ActiveAndPassiveVoiceChallenge2, ActiveAndPassiveVoiceChallenge3, ActiveAndPassiveVoiceChallenge4]],
  ["structures", buildFormalStructuresAndTheSubjunctive, [FormalStructuresAndTheSubjunctiveChallenge1, FormalStructuresAndTheSubjunctiveChallenge2, FormalStructuresAndTheSubjunctiveChallenge3, FormalStructuresAndTheSubjunctiveChallenge4]],
  ["noun phrases", buildExpandedNounPhrasesForInformation, [ExpandedNounPhrasesForInformationChallenge1, ExpandedNounPhrasesForInformationChallenge2, ExpandedNounPhrasesForInformationChallenge3, ExpandedNounPhrasesForInformationChallenge4]],
];

function answer(question) {
  if (question.kind === "choice") fireEvent.click(screen.getByRole("button", { name: question.answer, exact: true }));
  if (question.kind === "sort") {
    const pile = screen.getByRole("group", { name: "Cards to sort" });
    question.cards.forEach(card => {
      fireEvent.click(within(pile).getByRole("button", { name: card.label, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: question.bins.find(bin => bin.id === card.bin).label, exact: true }));
    });
  }
  if (question.kind === "build") {
    const tray = screen.getByRole("group", { name: "Tiles to use" });
    question.answer.split(" ").forEach(label => {
      const tile = within(tray).getAllByRole("button").find(button => !button.disabled && button.textContent === label);
      expect(tile, `Tile ${label}`).toBeTruthy();
      fireEvent.click(tile);
    });
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  act(() => { vi.advanceTimersByTime(1000); });
}

it("retries each formal-language introduction, shows a hint and completes once", () => {
  vi.useFakeTimers();
  topics.forEach(([name, build, [Challenge]], index) => {
    const rng = seededRng(71 + index);
    vi.spyOn(Math, "random").mockImplementation(rng);
    const done = vi.fn();
    render(createElement(Challenge, { onComplete: done }));
    const questions = build(1, seededRng(71 + index));
    const wrong = questions[0].options.find(option => option !== questions[0].answer);
    fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(document.querySelector(".challenge-hint"), `${name} hint`).toBeTruthy();
    questions.forEach(answer);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
    cleanup(); vi.restoreAllMocks();
  });
});

it("completes the sort, tile-build and application slots for each formal-language topic", () => {
  vi.useFakeTimers();
  topics.forEach(([name, build, challenges], topicIndex) => {
    challenges.slice(1).forEach((Challenge, offset) => {
      const level = offset + 2;
      const seed = 111 + topicIndex * 10 + level;
      vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
      const done = vi.fn();
      render(createElement(Challenge, { onComplete: done }));
      build(level, seededRng(seed)).forEach(answer);
      expect(done, `${name} slot ${level}`).toHaveBeenCalledTimes(1);
      cleanup(); vi.restoreAllMocks();
    });
  });
});
