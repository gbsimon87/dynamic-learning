import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

/**
 * The 48 Year 2 Geometry and Statistics challenges build their questions
 * from generators on every mount, so each one is mounted several times (new
 * random draws each time) in both themes, to catch a draw the screen cannot
 * render. The generators' answers are checked in their own node tests.
 */
const TOPICS = [
  "2-d-shapes",
  "3-d-shapes",
  "different-shapes",
  "patterns",
  "sequences",
  "quarter-turns-and-half-turns",
  "right-angle-turns",
  "pictograms",
  "tally-charts",
  "block-diagrams",
  "tables",
  "gathering-information-and-using-data",
];

const modules = import.meta.glob("../../src/pages/skills/math/challenges/year2/*/*Challenge*.jsx", { eager: true });
const ours = Object.entries(modules).filter(([path]) => TOPICS.some((topic) => path.includes(`/year2/${topic}/`)));

afterEach(() => {
  document.body.classList.remove("dark");
});

it("mounts all 48 Geometry and Statistics challenges, many draws, both themes", () => {
  expect(ours).toHaveLength(48);
  for (const theme of ["light", "dark"]) {
    document.body.classList.toggle("dark", theme === "dark");
    for (const [path, { default: Challenge }] of ours) {
      for (let draw = 0; draw < 5; draw += 1) {
        render(<Challenge onComplete={vi.fn()} />);
        expect(screen.getByText(/Question 1 of 6/), path).toBeTruthy();
        expect(document.querySelector(".submit-btn"), path).toBeTruthy();
        cleanup();
      }
    }
  }
}, 60000);
