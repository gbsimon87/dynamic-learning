import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { total, difference, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 4 - word problems off a four-column diagram, typed.
 *
 * Four columns, a scale in twos, and no options. One question asks for the
 * two smallest added together, which cannot be answered without first
 * deciding which two those are — a sort and a sum in one.
 */

const SETS = [
  {
    max: 12,
    rows: [
      { label: "Cats", value: 5 },
      { label: "Dogs", value: 9 },
      { label: "Fish", value: 2 },
      { label: "Birds", value: 6 },
    ],
    kind: "total",
    story: "How many pets altogether?",
  },
  {
    max: 12,
    rows: [
      { label: "Red", value: 11 },
      { label: "Blue", value: 7 },
      { label: "Green", value: 4 },
      { label: "Gold", value: 2 },
    ],
    kind: "difference",
    pair: ["Red", "Blue"],
    story: "How many more red cars than blue cars?",
  },
  {
    max: 10,
    rows: [
      { label: "Mon", value: 3 },
      { label: "Tue", value: 8 },
      { label: "Wed", value: 5 },
      { label: "Thu", value: 10 },
    ],
    kind: "two-smallest",
    story: "Add together the two days with the fewest books.",
  },
  {
    max: 14,
    rows: [
      { label: "Apples", value: 6 },
      { label: "Pears", value: 13 },
      { label: "Plums", value: 9 },
      { label: "Grapes", value: 4 },
    ],
    kind: "pair",
    pair: ["Apples", "Grapes"],
    story: "How many apples and grapes together?",
  },
  {
    max: 14,
    rows: [
      { label: "Sun", value: 12 },
      { label: "Rain", value: 5 },
      { label: "Cloud", value: 8 },
      { label: "Snow", value: 3 },
    ],
    kind: "difference",
    pair: ["Sun", "Cloud"],
    story: "How many more sunny days than cloudy days?",
  },
  {
    max: 12,
    rows: [
      { label: "Ava", value: 7 },
      { label: "Ben", value: 2 },
      { label: "Cleo", value: 11 },
      { label: "Dev", value: 4 },
    ],
    kind: "two-smallest",
    story: "Add together the two children with the fewest stickers.",
  },
];

const STEP = 2;

function answerFor(set) {
  const valueOf = (label) => set.rows.find((row) => row.label === label).value;
  if (set.kind === "total") return total(set.rows);
  if (set.kind === "difference") return difference(set.rows, set.pair[0], set.pair[1]);
  if (set.kind === "two-smallest") {
    // All four values differ in every "two-smallest" set above, so which two
    // are smallest is never ambiguous.
    const sorted = [...set.rows].sort((a, b) => a.value - b.value);
    return sorted[0].value + sorted[1].value;
  }
  return valueOf(set.pair[0]) + valueOf(set.pair[1]);
}

function BlockDiagramsChallenge4({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => ({ ...set, answer: answerFor(set) })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the block diagram. Type your answer."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [typed, setTyped] = useState("");

  return (
    <>
      <BlockDiagram rows={question.rows} max={question.max} step={STEP} />

      <p className="challenge-prompt">{question.story}</p>

      <NumberInput value={typed} onChange={setTyped} disabled={locked} label="My answer" />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || typed === ""}
        onClick={() => submit(Number(typed) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default BlockDiagramsChallenge4;
