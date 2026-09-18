import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { total, difference, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 4 - word problems off a four-row chart, typed.
 *
 * Four rows rather than three, nothing highlighted, and no options to work
 * backwards from. Two of these ask something a chart does not show directly:
 * how many MORE would be needed to match another row, which is a comparison
 * turned into a missing-number problem.
 */

const SETS = [
  {
    rows: [
      { label: "Cats", value: 7 },
      { label: "Dogs", value: 9 },
      { label: "Fish", value: 4 },
      { label: "Birds", value: 5 },
    ],
    kind: "total",
    story: "How many pets altogether?",
  },
  {
    rows: [
      { label: "Red", value: 12 },
      { label: "Blue", value: 8 },
      { label: "Green", value: 6 },
      { label: "Gold", value: 3 },
    ],
    kind: "difference",
    pair: ["Red", "Green"],
    story: "How many more red than green?",
  },
  {
    rows: [
      { label: "Bus", value: 6 },
      { label: "Car", value: 11 },
      { label: "Bike", value: 4 },
      { label: "Van", value: 2 },
    ],
    kind: "catch-up",
    pair: ["Bike", "Car"],
    story: "How many more bikes would we need to have as many as cars?",
  },
  {
    rows: [
      { label: "Apples", value: 5 },
      { label: "Pears", value: 8 },
      { label: "Plums", value: 3 },
      { label: "Grapes", value: 9 },
    ],
    kind: "pair",
    pair: ["Apples", "Plums"],
    story: "How many apples and plums together?",
  },
  {
    rows: [
      { label: "Sun", value: 9 },
      { label: "Rain", value: 7 },
      { label: "Cloud", value: 6 },
      { label: "Snow", value: 2 },
    ],
    kind: "total",
    story: "How many days were counted altogether?",
  },
  {
    rows: [
      { label: "Ava", value: 4 },
      { label: "Ben", value: 13 },
      { label: "Cleo", value: 8 },
      { label: "Dev", value: 6 },
    ],
    kind: "catch-up",
    pair: ["Dev", "Cleo"],
    story: "How many more stars does Dev need to have as many as Cleo?",
  },
];

function answerFor(set) {
  const valueOf = (label) => set.rows.find((row) => row.label === label).value;
  if (set.kind === "total") return total(set.rows);
  if (set.kind === "difference") return difference(set.rows, set.pair[0], set.pair[1]);
  // "Catch up" is the same subtraction as a difference, asked the other way
  // round - it is worth its own name so the story stays honest.
  if (set.kind === "catch-up") return valueOf(set.pair[1]) - valueOf(set.pair[0]);
  return valueOf(set.pair[0]) + valueOf(set.pair[1]);
}

function TallyChartsChallenge4({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => ({ ...set, answer: answerFor(set) })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the tally chart. Type your answer."
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
      <TallyChart rows={question.rows} />

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

export default TallyChartsChallenge4;
