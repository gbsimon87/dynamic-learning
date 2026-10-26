import { cleanup, render as rtlRender, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import PartsOfFloweringPlantsGame from "../../src/pages/skills/science/challenges/year3/PartsOfFloweringPlantsGame";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(cleanup);
const render = (ui) => rtlRender(ui, { wrapper: MemoryRouter });
import { before, expectScienceLayout } from "./scienceLayoutHelpers";

const play = (Game, level) => render(<Game level={level} onComplete={() => {}} />);

const games = import.meta.glob("../../src/pages/skills/science/challenges/year3/*Game.jsx", { eager: true });
it("every Year 3 science game fills the science layout at every level", () => {
  const failures = [];
  for (const [path, mod] of Object.entries(games)) {
    for (const level of [1, 2, 3, 4]) {
      const { container } = play(mod.default, level);
      try { expectScienceLayout(container); } catch (error) { failures.push(`${path.split("/").pop()} L${level}: ${error.message.split("\n")[0]}`); }
      cleanup();
    }
  }
  expect(failures).toEqual([]);
}, 60000);

it("Parts of flowering plants challenge 4 puts the observation between the prompt and the tiles", () => {
  const { container } = play(PartsOfFloweringPlantsGame, 4);
  const { prompt, check } = expectScienceLayout(container);
  const observation = screen.getByText("Observation card");
  const tile = container.querySelector(".tile-tray-slot");
  expect(before(prompt, observation)).toBe(true);
  expect(before(observation, tile)).toBe(true);
  expect(screen.getByText("Science words").closest("details")).toBeTruthy();
  expect(check.disabled).toBe(true);
  expect(screen.getByText("Use one ending. Tap a placed tile to take it back.")).toBeTruthy();
});
