import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { afterEach, expect, it, vi } from "vitest";
import ChallengeShell from "../../src/components/challenge/ChallengeShell";
import ScienceRound from "../../src/components/challenge/ScienceRound";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

afterEach(cleanup);

const before = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
const full = (props = {}) => (
  <ScienceRound
    prompt={<p>PROMPT</p>} gloss="Words" figure={<figure>FIGURE</figure>} reference={<p>REFERENCE</p>}
    evidence={<p>EVIDENCE</p>} answerLabel="ANSWER LABEL" hint={<p>HINT</p>}
    check={{ label: "Check", disabled: false, onClick: () => {} }} feedback={<p>FEEDBACK</p>} {...props}
  ><button type="button">ANSWER</button></ScienceRound>
);

it("renders slots in the spec's DOM order", () => {
  render(full());
  const order = ["PROMPT", "FIGURE", "REFERENCE", "EVIDENCE", "ANSWER LABEL", "ANSWER", "HINT"].map((text) => screen.getByText(text));
  order.push(screen.getByRole("button", { name: "Check" }), screen.getByText("FEEDBACK"));
  order.slice(1).forEach((node, i) => expect(before(order[i], node), `${node.textContent} after ${order[i].textContent}`).toBe(true));
});

it("check can be absent and secondary renders after it", () => {
  render(full({ check: null, secondary: <button type="button">Restart</button> }));
  expect(screen.queryByRole("button", { name: "Check" })).toBeNull();
  expect(before(screen.getByText("HINT"), screen.getByRole("button", { name: "Restart" }))).toBe(true);
  expect(before(screen.getByRole("button", { name: "Restart" }), screen.getByText("FEEDBACK"))).toBe(true);
});

it("a round with no figure is a single column", () => {
  const { container } = render(full({ figure: undefined, reference: undefined }));
  const root = container.querySelector(".science-round");
  expect(root.classList.contains("is-single")).toBe(true);
  expect(root.classList.contains("has-figure")).toBe(false);
});

it("a round with a figure has the two-column class", () => {
  const { container } = render(full());
  expect(container.querySelector(".science-round").classList.contains("has-figure")).toBe(true);
});

it("the Science words chip only renders with gloss", () => {
  const { rerender } = render(full());
  expect(screen.getByText("Science words").closest("details")).toBeTruthy();
  rerender(full({ gloss: undefined }));
  expect(screen.queryByText("Science words")).toBeNull();
});

it("Check calls onClick and honours disabled", () => {
  const onClick = vi.fn();
  const { rerender } = render(full({ check: { label: "Check", disabled: true, onClick } }));
  expect(screen.getByRole("button", { name: "Check" }).disabled).toBe(true);
  rerender(full({ check: { label: "Check", disabled: false, onClick } }));
  fireEvent.click(screen.getByRole("button", { name: "Check" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

const shell = (wide) => (
  <ChallengeShell title="T" wide={wide} questions={[1, 2]} onComplete={() => {}}
    render={({ submit, feedback }) => (
      <ScienceRound prompt={<p>P</p>} feedback={feedback} check={{ label: "Check", disabled: false, onClick: () => submit(false) }}>
        <span>A</span>
      </ScienceRound>
    )} />
);

it("a wide ChallengeShell renders feedback once, after Check", () => {
  const { container } = render(shell(true));
  fireEvent.click(screen.getByRole("button", { name: "Check" }));
  const status = screen.getAllByRole("status");
  expect(status).toHaveLength(1);
  expect(before(screen.getByRole("button", { name: "Check" }), status[0])).toBe(true);
  expect(container.querySelector(".challenge-container").classList.contains("is-wide")).toBe(true);
  expect(container.querySelector(".science-round .challenge-feedback")).toBeTruthy();
});

it("a non-wide ChallengeShell keeps its own feedback and no is-wide class", () => {
  const { container } = render(
    <ChallengeShell title="T" questions={[1]} onComplete={() => {}}
      render={({ submit }) => <button type="button" onClick={() => submit(false)}>Go</button>} />,
  );
  expect(container.querySelector(".challenge-container").classList.contains("is-wide")).toBe(false);
  expect(screen.getAllByRole("status")).toHaveLength(1);
  expect(container.querySelector(".science-round")).toBeNull();
});

it("science-round.css uses no colour literals", () => {
  const css = readFileSync("src/components/challenge/science-round.css", "utf8");
  expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/);
});
