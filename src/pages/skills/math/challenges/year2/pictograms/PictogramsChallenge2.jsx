import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  mostPopular,
  leastPopular,
  difference,
  shuffle,
} from "../../../../../../data/challenges/statistics";

/**
 * Challenge 2 - ratios of 5 and 10, and nothing highlighted.
 *
 * Harder in two ways at once: the key is no longer 2, so the doubling
 * shortcut fails, and the row to look at has to be found from the question.
 * "Which has the most" can be answered from the picture alone, but "how many
 * more" cannot — that one needs the key twice.
 *
 * Every dataset here has all-different values, so "most" and "fewest" have
 * exactly one right answer.
 */

const SETS = [
  {
    symbol: "🍏",
    ratio: 5,
    rows: [
      { label: "Apples", value: 15 },
      { label: "Pears", value: 25 },
      { label: "Plums", value: 10 },
    ],
    kind: "most",
  },
  {
    symbol: "🚌",
    ratio: 10,
    rows: [
      { label: "Bus", value: 30 },
      { label: "Car", value: 50 },
      { label: "Bike", value: 20 },
    ],
    kind: "fewest",
  },
  {
    symbol: "⭐",
    ratio: 5,
    rows: [
      { label: "Year 1", value: 20 },
      { label: "Year 2", value: 35 },
      { label: "Year 3", value: 10 },
    ],
    kind: "difference",
    pair: ["Year 2", "Year 1"],
  },
  {
    symbol: "🍪",
    ratio: 10,
    rows: [
      { label: "Jar", value: 40 },
      { label: "Tin", value: 20 },
      { label: "Box", value: 60 },
    ],
    kind: "difference",
    pair: ["Box", "Tin"],
  },
  {
    symbol: "🎈",
    ratio: 5,
    rows: [
      { label: "Red", value: 30 },
      { label: "Blue", value: 15 },
      { label: "Gold", value: 20 },
    ],
    kind: "most",
  },
  {
    symbol: "🐝",
    ratio: 10,
    rows: [
      { label: "Hive 1", value: 50 },
      { label: "Hive 2", value: 30 },
      { label: "Hive 3", value: 70 },
    ],
    kind: "difference",
    pair: ["Hive 3", "Hive 1"],
  },
];

function buildQuestion(set, rng) {
  if (set.kind === "difference") {
    const [a, b] = set.pair;
    const answer = difference(set.rows, a, b);
    // Distractors are whole symbols out, plus the classic error of counting
    // the SYMBOL difference and forgetting to use the key.
    const raw = [answer, answer / set.ratio, answer + set.ratio, answer - set.ratio];
    const options = [...new Set(raw.filter((n) => n > 0))].slice(0, 4);
    return {
      ...set,
      prompt: `How many more ${a} than ${b}?`,
      answer,
      options: shuffle(options, rng),
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

function PictogramsChallenge2({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => buildQuestion(set, Math.random)),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the key carefully — it is not always 2."
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
      <PictogramChart rows={question.rows} ratio={question.ratio} symbol={question.symbol} />

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

export default PictogramsChallenge2;
