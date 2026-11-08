import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { buildCohesiveDevicesAcrossParagraphs } from "../../src/data/challenges/authored/year6/english/cohesive-devices-across-paragraphs.js";
import CohesiveDevicesAcrossParagraphsChallenge1 from "../../src/pages/skills/english/challenges/year6/cohesive-devices-across-paragraphs/CohesiveDevicesAcrossParagraphsChallenge1.jsx";
import CohesiveDevicesAcrossParagraphsChallenge2 from "../../src/pages/skills/english/challenges/year6/cohesive-devices-across-paragraphs/CohesiveDevicesAcrossParagraphsChallenge2.jsx";
import CohesiveDevicesAcrossParagraphsChallenge3 from "../../src/pages/skills/english/challenges/year6/cohesive-devices-across-paragraphs/CohesiveDevicesAcrossParagraphsChallenge3.jsx";
import CohesiveDevicesAcrossParagraphsChallenge4 from "../../src/pages/skills/english/challenges/year6/cohesive-devices-across-paragraphs/CohesiveDevicesAcrossParagraphsChallenge4.jsx";
import { buildEllipsis } from "../../src/data/challenges/authored/year6/english/ellipsis.js";
import EllipsisChallenge1 from "../../src/pages/skills/english/challenges/year6/ellipsis/EllipsisChallenge1.jsx";
import EllipsisChallenge2 from "../../src/pages/skills/english/challenges/year6/ellipsis/EllipsisChallenge2.jsx";
import EllipsisChallenge3 from "../../src/pages/skills/english/challenges/year6/ellipsis/EllipsisChallenge3.jsx";
import EllipsisChallenge4 from "../../src/pages/skills/english/challenges/year6/ellipsis/EllipsisChallenge4.jsx";
import { buildLayoutDevices } from "../../src/data/challenges/authored/year6/english/layout-devices.js";
import LayoutDevicesChallenge1 from "../../src/pages/skills/english/challenges/year6/layout-devices/LayoutDevicesChallenge1.jsx";
import LayoutDevicesChallenge2 from "../../src/pages/skills/english/challenges/year6/layout-devices/LayoutDevicesChallenge2.jsx";
import LayoutDevicesChallenge3 from "../../src/pages/skills/english/challenges/year6/layout-devices/LayoutDevicesChallenge3.jsx";
import LayoutDevicesChallenge4 from "../../src/pages/skills/english/challenges/year6/layout-devices/LayoutDevicesChallenge4.jsx";
import { buildSemicolonsColonsAndDashes } from "../../src/data/challenges/authored/year6/english/semicolons-colons-and-dashes.js";
import SemicolonsColonsAndDashesChallenge1 from "../../src/pages/skills/english/challenges/year6/semicolons-colons-and-dashes/SemicolonsColonsAndDashesChallenge1.jsx";
import SemicolonsColonsAndDashesChallenge2 from "../../src/pages/skills/english/challenges/year6/semicolons-colons-and-dashes/SemicolonsColonsAndDashesChallenge2.jsx";
import SemicolonsColonsAndDashesChallenge3 from "../../src/pages/skills/english/challenges/year6/semicolons-colons-and-dashes/SemicolonsColonsAndDashesChallenge3.jsx";
import SemicolonsColonsAndDashesChallenge4 from "../../src/pages/skills/english/challenges/year6/semicolons-colons-and-dashes/SemicolonsColonsAndDashesChallenge4.jsx";
import { buildPunctuationInLists } from "../../src/data/challenges/authored/year6/english/punctuation-in-lists.js";
import PunctuationInListsChallenge1 from "../../src/pages/skills/english/challenges/year6/punctuation-in-lists/PunctuationInListsChallenge1.jsx";
import PunctuationInListsChallenge2 from "../../src/pages/skills/english/challenges/year6/punctuation-in-lists/PunctuationInListsChallenge2.jsx";
import PunctuationInListsChallenge3 from "../../src/pages/skills/english/challenges/year6/punctuation-in-lists/PunctuationInListsChallenge3.jsx";
import PunctuationInListsChallenge4 from "../../src/pages/skills/english/challenges/year6/punctuation-in-lists/PunctuationInListsChallenge4.jsx";
import { buildBulletPointPunctuation } from "../../src/data/challenges/authored/year6/english/bullet-point-punctuation.js";
import BulletPointPunctuationChallenge1 from "../../src/pages/skills/english/challenges/year6/bullet-point-punctuation/BulletPointPunctuationChallenge1.jsx";
import BulletPointPunctuationChallenge2 from "../../src/pages/skills/english/challenges/year6/bullet-point-punctuation/BulletPointPunctuationChallenge2.jsx";
import BulletPointPunctuationChallenge3 from "../../src/pages/skills/english/challenges/year6/bullet-point-punctuation/BulletPointPunctuationChallenge3.jsx";
import BulletPointPunctuationChallenge4 from "../../src/pages/skills/english/challenges/year6/bullet-point-punctuation/BulletPointPunctuationChallenge4.jsx";
import { buildHyphensToAvoidAmbiguity } from "../../src/data/challenges/authored/year6/english/hyphens-to-avoid-ambiguity.js";
import HyphensToAvoidAmbiguityChallenge1 from "../../src/pages/skills/english/challenges/year6/hyphens-to-avoid-ambiguity/HyphensToAvoidAmbiguityChallenge1.jsx";
import HyphensToAvoidAmbiguityChallenge2 from "../../src/pages/skills/english/challenges/year6/hyphens-to-avoid-ambiguity/HyphensToAvoidAmbiguityChallenge2.jsx";
import HyphensToAvoidAmbiguityChallenge3 from "../../src/pages/skills/english/challenges/year6/hyphens-to-avoid-ambiguity/HyphensToAvoidAmbiguityChallenge3.jsx";
import HyphensToAvoidAmbiguityChallenge4 from "../../src/pages/skills/english/challenges/year6/hyphens-to-avoid-ambiguity/HyphensToAvoidAmbiguityChallenge4.jsx";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

const topics = [
  ["cohesive-devices-across-paragraphs", buildCohesiveDevicesAcrossParagraphs, [CohesiveDevicesAcrossParagraphsChallenge1, CohesiveDevicesAcrossParagraphsChallenge2, CohesiveDevicesAcrossParagraphsChallenge3, CohesiveDevicesAcrossParagraphsChallenge4]],
  ["ellipsis", buildEllipsis, [EllipsisChallenge1, EllipsisChallenge2, EllipsisChallenge3, EllipsisChallenge4]],
  ["layout-devices", buildLayoutDevices, [LayoutDevicesChallenge1, LayoutDevicesChallenge2, LayoutDevicesChallenge3, LayoutDevicesChallenge4]],
  ["semicolons-colons-and-dashes", buildSemicolonsColonsAndDashes, [SemicolonsColonsAndDashesChallenge1, SemicolonsColonsAndDashesChallenge2, SemicolonsColonsAndDashesChallenge3, SemicolonsColonsAndDashesChallenge4]],
  ["punctuation-in-lists", buildPunctuationInLists, [PunctuationInListsChallenge1, PunctuationInListsChallenge2, PunctuationInListsChallenge3, PunctuationInListsChallenge4]],
  ["bullet-point-punctuation", buildBulletPointPunctuation, [BulletPointPunctuationChallenge1, BulletPointPunctuationChallenge2, BulletPointPunctuationChallenge3, BulletPointPunctuationChallenge4]],
  ["hyphens-to-avoid-ambiguity", buildHyphensToAvoidAmbiguity, [HyphensToAvoidAmbiguityChallenge1, HyphensToAvoidAmbiguityChallenge2, HyphensToAvoidAmbiguityChallenge3, HyphensToAvoidAmbiguityChallenge4]],
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
  if (question.kind === "pick") {
    const gaps = question.mode === "gap" ? screen.getAllByRole("button").filter(button => button.getAttribute("aria-label")?.startsWith("The gap")) : [];
    const target = question.mode === "gap"
      ? gaps[question.answer - (question.innerGaps ? 1 : 0)]
      : screen.getByRole("button", { name: question.tokens[question.answer], exact: true });
    fireEvent.click(target);
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  act(() => { vi.advanceTimersByTime(1000); });
}

it("retries each Cohesion, Layout and Punctuation introduction, shows a hint and completes once", () => {
  vi.useFakeTimers();
  topics.forEach(([name, build, [Challenge]], index) => {
    const rng = seededRng(301 + index);
    vi.spyOn(Math, "random").mockImplementation(rng);
    const done = vi.fn();
    render(createElement(Challenge, { onComplete: done }));
    const questions = build(1, seededRng(301 + index));
    const wrong = questions[0].options.find(option => option !== questions[0].answer);
    fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(document.querySelector(".challenge-hint"), `${name} hint`).toBeTruthy();
    questions.forEach(answer);
    expect(done, name).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ combos: expect.any(Number) });
    cleanup(); vi.restoreAllMocks();
  });
});

it("completes the sort, tile-build, tap and application slots of each topic", () => {
  vi.useFakeTimers();
  topics.forEach(([name, build, challenges], topicIndex) => {
    challenges.slice(1).forEach((Challenge, offset) => {
      const level = offset + 2;
      const seed = 411 + topicIndex * 10 + level;
      vi.spyOn(Math, "random").mockImplementation(seededRng(seed));
      const done = vi.fn();
      render(createElement(Challenge, { onComplete: done }));
      build(level, seededRng(seed)).forEach(answer);
      expect(done, `${name} slot ${level}`).toHaveBeenCalledTimes(1);
      cleanup(); vi.restoreAllMocks();
    });
  });
});
