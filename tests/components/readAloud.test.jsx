import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ChallengeShell from "../../src/components/challenge/ChallengeShell";
import { ChallengeContext } from "../../src/components/challenge/challenge-context";
import { readAloudText } from "../../src/components/challenge/readAloud";
import DragToOrder from "../../src/components/challenge/DragToOrder";
import TileBuilder from "../../src/components/challenge/TileBuilder";

const spoken = vi.hoisted(() => []);
vi.mock("../../src/utils/speech", () => ({
  isNarrationSupported: () => true,
  stopNarration: () => {},
  speak: () => {},
  speakAndWait: async (text) => { spoken.push(text); },
}));

function dom(html) {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

describe("reading a Maths question off the screen", () => {
  it("reads the words and options, never pictures, controls or the answer in a label", () => {
    const root = dom(`
      <p>What time does the clock show?</p>
      <svg role="img" aria-label="half past 3"><text>12</text></svg>
      <div style="display:flex"><button class="choice-btn">half past 3</button><button class="choice-btn">3 o'clock</button></div>
      <div class="keypad"><button>1</button></div>
      <button class="submit-btn">Check my answer</button>`);
    expect(readAloudText(root, "Telling the time")).toBe(
      "Telling the time. What time does the clock show? Is it half past 3 or 3 o'clock?"
    );
  });

  it("joins side-by-side cells with commas and reads the gap as a blank", () => {
    const root = dom(`
      <p>Fill the gap.</p>
      <div class="number-line" style="display:flex"><span style="display:block">58</span><span style="display:block">59</span><span class="gap" style="display:block">?</span></div>`);
    expect(readAloudText(root, "")).toBe("Fill the gap. 58, 59, blank.");
  });
});

describe("reading drag-and-build questions", () => {
  it("reads the tiles to build with, never the placeholder or the tiles already placed", () => {
    const tiles = [{ id: "a", label: "3/5" }, { id: "b", label: "+" }, { id: "c", label: "1/5" }];
    const { container } = render(<div><p>Build the sum.</p><TileBuilder tiles={tiles} placed={[]} onChange={() => {}} /></div>);
    expect(readAloudText(container, "Fractions")).toBe("Fractions. Build the sum. The tiles are three fifths, plus and one fifth.");
    const placed = render(<div><p>Build the sum.</p><TileBuilder tiles={tiles} placed={["a"]} onChange={() => {}} /></div>);
    expect(readAloudText(placed.container, "")).toBe("Build the sum. The tiles are three fifths, plus and one fifth.");
  });

  it("reads the cards to order once, as a list, and not a live preview of the child's arrangement", () => {
    const items = [{ id: "a", label: "5" }, { id: "b", label: "16" }, { id: "c", label: "11" }];
    const { container } = render(<div>
      <p>Make a subtraction that is true.</p>
      <p className="statement" data-read-aloud="skip">5 − 16 = 11</p>
      <DragToOrder items={items} onReorder={() => {}} />
    </div>);
    expect(readAloudText(container, "")).toBe("Make a subtraction that is true. The cards are 5, 16 and 11.");
  });

  it("says nothing for cards that are only pictures, and skips a picture of the givens", () => {
    const shapes = [{ id: "a", label: <svg role="img" aria-label="triangle" /> }, { id: "b", label: <svg role="img" aria-label="square" /> }];
    const { container } = render(<div>
      <p>Fewest sides first.</p>
      <figure className="math-question-visual"><figcaption>A picture of the given numbers</figcaption><table><tbody><tr><td>8</td></tr></tbody></table></figure>
      <DragToOrder items={shapes} onReorder={() => {}} />
    </div>);
    expect(readAloudText(container, "")).toBe("Fewest sides first.");
  });
});

describe("the Read it to me button", () => {
  const shell = (context) =>
    render(
      <ChallengeContext.Provider value={context}>
        <ChallengeShell
          title="Times tables"
          questions={[{ text: "6 × 5 = ?" }]}
          onComplete={() => {}}
          render={({ question }) => <p>{question.text}</p>}
        />
      </ChallengeContext.Provider>
    );

  it("appears on Maths and reads the question in words", async () => {
    shell({ year: "2", subject: "math" });
    fireEvent.click(screen.getByRole("button", { name: "Read it to me" }));
    await Promise.resolve();
    expect(spoken.at(-1)).toBe("Times tables. 6 times 5 equals what?");
  });

  it("is absent outside Maths, where challenges place their own", () => {
    shell({ year: "3", subject: "english" });
    expect(screen.queryByRole("button", { name: "Read it to me" })).toBeNull();
    shell(null);
    expect(screen.queryByRole("button", { name: "Read it to me" })).toBeNull();
  });
});

describe("reading a science round", () => {
  it("never reads the feedback line as part of the question", () => {
    const root = dom(`<p>Which part takes in water?</p><p class="challenge-feedback" role="status">Not quite, have another go.</p>`);
    expect(readAloudText(root, "Plants")).not.toMatch(/another go/);
  });

  it("reads a science round's grid children as separate sentences, not one side-by-side row", () => {
    const flat = dom(`<div><p>Look at the plant.</p><p>Which part is it?</p></div>`);
    const grid = dom(`<div class="science-round" style="display:grid"><p>Look at the plant.</p><p>Which part is it?</p></div>`);
    expect(readAloudText(grid, "Plants")).toBe(readAloudText(flat, "Plants"));
  });
});
