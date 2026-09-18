import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { total, difference, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 4 - word problems, typed.
 *
 * Nothing to eliminate: the answer has to be worked out and typed. These are
 * the "totalling and comparing categorical data" questions, which need the
 * key applied to two rows and then added or subtracted — the most steps this
 * topic asks for.
 */

const SETS = [
  {
    symbol: "🍎",
    ratio: 2,
    rows: [
      { label: "Apples", value: 8 },
      { label: "Pears", value: 6 },
      { label: "Plums", value: 4 },
    ],
    kind: "total",
    story: "How many pieces of fruit were sold altogether?",
  },
  {
    symbol: "⭐",
    ratio: 5,
    rows: [
      { label: "Ava", value: 20 },
      { label: "Ben", value: 10 },
      { label: "Cleo", value: 15 },
    ],
    kind: "pair",
    pair: ["Ava", "Ben"],
    story: "How many stars did Ava and Ben get between them?",
  },
  {
    symbol: "🚗",
    ratio: 10,
    rows: [
      { label: "Red", value: 30 },
      { label: "Blue", value: 50 },
      { label: "White", value: 20 },
    ],
    kind: "difference",
    pair: ["Blue", "White"],
    story: "How many more blue cars than white cars?",
  },
  {
    symbol: "🐟",
    ratio: 2,
    rows: [
      { label: "Tank A", value: 12 },
      { label: "Tank B", value: 6 },
      { label: "Tank C", value: 10 },
    ],
    kind: "total",
    story: "How many fish are there altogether?",
  },
  {
    symbol: "🍪",
    ratio: 5,
    rows: [
      { label: "Monday", value: 25 },
      { label: "Tuesday", value: 10 },
      { label: "Friday", value: 15 },
    ],
    kind: "difference",
    pair: ["Monday", "Friday"],
    story: "How many more biscuits on Monday than on Friday?",
  },
  {
    symbol: "🎈",
    ratio: 10,
    rows: [
      { label: "Party 1", value: 40 },
      { label: "Party 2", value: 20 },
      { label: "Party 3", value: 30 },
    ],
    kind: "pair",
    pair: ["Party 2", "Party 3"],
    story: "How many balloons at Party 2 and Party 3 together?",
  },
];

function answerFor(set) {
  if (set.kind === "total") return total(set.rows);
  if (set.kind === "difference") return difference(set.rows, set.pair[0], set.pair[1]);
  const [a, b] = set.pair;
  const valueOf = (label) => set.rows.find((row) => row.label === label).value;
  return valueOf(a) + valueOf(b);
}

function PictogramsChallenge4({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => ({ ...set, answer: answerFor(set) })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work it out and type your answer."
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
      <PictogramChart rows={question.rows} ratio={question.ratio} symbol={question.symbol} />

      <p className="challenge-prompt">{question.story}</p>

      <NumberInput
        value={typed}
        onChange={setTyped}
        disabled={locked}
        label="My answer"
      />

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

export default PictogramsChallenge4;
