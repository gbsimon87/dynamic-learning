import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  total,
  mostPopular,
  leastPopular,
  nearMissOptions,
  shuffle,
} from "../../../../../../data/challenges/statistics";

/**
 * Challenge 2 - read the whole chart, with nothing highlighted.
 *
 * The rule is no longer stated and the row is no longer pointed at, so which
 * row to count has to be worked out from the question. "Most" and "fewest"
 * can be answered by eye; "altogether" cannot — that one needs every row
 * counted and then added, which is where four rows starts to bite.
 *
 * Every dataset has all-different values, so "most" and "fewest" each have
 * exactly one correct answer.
 */

const SETS = [
  {
    rows: [
      { label: "Cats", value: 8 },
      { label: "Dogs", value: 12 },
      { label: "Fish", value: 5 },
    ],
    kind: "most",
  },
  {
    rows: [
      { label: "Red", value: 6 },
      { label: "Blue", value: 3 },
      { label: "Green", value: 9 },
    ],
    kind: "fewest",
  },
  {
    rows: [
      { label: "Bus", value: 4 },
      { label: "Car", value: 7 },
      { label: "Bike", value: 2 },
    ],
    kind: "total",
  },
  {
    rows: [
      { label: "Apples", value: 11 },
      { label: "Pears", value: 6 },
      { label: "Plums", value: 14 },
    ],
    kind: "fewest",
  },
  {
    rows: [
      { label: "Sun", value: 5 },
      { label: "Rain", value: 6 },
      { label: "Cloud", value: 4 },
    ],
    kind: "total",
  },
  {
    rows: [
      { label: "Ava", value: 13 },
      { label: "Ben", value: 7 },
      { label: "Cleo", value: 10 },
    ],
    kind: "most",
  },
];

function buildQuestion(set, rng) {
  if (set.kind === "total") {
    const answer = total(set.rows);
    return {
      ...set,
      prompt: "How many altogether?",
      answer,
      options: nearMissOptions(answer, 4, rng),
    };
  }

  const answer = set.kind === "most" ? mostPopular(set.rows) : leastPopular(set.rows);
  return {
    ...set,
    prompt: set.kind === "most" ? "Which one has the most?" : "Which one has the fewest?",
    answer,
    options: shuffle(
      set.rows.map((row) => row.label),
      rng
    ),
  };
}

function TallyChartsChallenge2({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => buildQuestion(set, Math.random)),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the tally chart to answer the question."
      render={({ question, submit, locked, index }) => (
        <ReadChart key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadChart({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TallyChart rows={question.rows} />

      <p className="challenge-prompt">{question.prompt}</p>

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default TallyChartsChallenge2;
