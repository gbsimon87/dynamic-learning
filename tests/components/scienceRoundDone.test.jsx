import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ComparingAndGroupingRocksGame from "../../src/pages/skills/science/challenges/year3/ComparingAndGroupingRocksGame";
import ForcesEnquiryRound from "../../src/components/challenge/ForcesEnquiryRound";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
vi.mock("../../src/hooks/useForcesEnquiry.js", () => ({
  useForcesEnquiry: () => ({ state: { stage: "done", seen: [], observation: 0, record: {}, setup: {}, conclusion: [] }, dispatch: () => {}, updateConclusion: () => {} }),
}));

afterEach(cleanup);

it("a finished enquiry shows no leftover Check button during the success pause", () => {
  const question = { title: "T", setup: "S", stages: [], recordCards: [], correctConclusionIds: ["a"], tiles: [] };
  render(<ForcesEnquiryRound question={question} submit={() => {}} locked hint={false} feedback={null} validateRecord={() => true} renderObservation={() => null} />);
  expect(screen.queryByRole("button", { name: /^Check/ })).toBeNull();
});

it("the rocks investigation offers no restart button while the fair plan is still being chosen", () => {
  render(<ComparingAndGroupingRocksGame level={4} onComplete={() => {}} />);
  expect(screen.getByRole("button", { name: "Check comparison plan" })).toBeTruthy();
  expect(screen.queryByRole("button", { name: "Restart this investigation" })).toBeNull();
});
