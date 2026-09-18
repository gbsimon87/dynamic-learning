import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { pictogramOptions, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 1 - read a pictogram where one symbol stands for two.
 *
 * The gentlest slot: the key is on screen, the ratio is always 2, and the
 * asked row is highlighted so there is no hunting. All the question wants is
 * "count the symbols, then double".
 */

const SETS = [
  {
    symbol: "🍎",
    rows: [
      { label: "Class 1", value: 8 },
      { label: "Class 2", value: 6 },
      { label: "Class 3", value: 10 },
    ],
    ask: "Class 3",
    unit: "apples",
  },
  {
    symbol: "⚽",
    rows: [
      { label: "Monday", value: 4 },
      { label: "Tuesday", value: 10 },
      { label: "Wednesday", value: 6 },
    ],
    ask: "Monday",
    unit: "goals",
  },
  {
    symbol: "📕",
    rows: [
      { label: "Amy", value: 12 },
      { label: "Ben", value: 6 },
      { label: "Cara", value: 8 },
    ],
    ask: "Amy",
    unit: "books",
  },
  {
    symbol: "🌻",
    rows: [
      { label: "Red pot", value: 6 },
      { label: "Blue pot", value: 14 },
      { label: "Green pot", value: 4 },
    ],
    ask: "Blue pot",
    unit: "flowers",
  },
  {
    symbol: "🐟",
    rows: [
      { label: "Tank A", value: 10 },
      { label: "Tank B", value: 4 },
      { label: "Tank C", value: 8 },
    ],
    ask: "Tank C",
    unit: "fish",
  },
  {
    symbol: "🚗",
    rows: [
      { label: "Car park", value: 16 },
      { label: "Driveway", value: 6 },
      { label: "Street", value: 10 },
    ],
    ask: "Street",
    unit: "cars",
  },
];

const RATIO = 2;

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const answer = set.rows.find((row) => row.label === set.ask).value;
    return { ...set, answer, options: pictogramOptions(answer, RATIO, 4, rng) };
  });
}

function PictogramsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each picture stands for 2. Use the key!"
      render={({ question, submit, locked, index }) => (
        <ReadRow key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadRow({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PictogramChart
        rows={question.rows}
        ratio={RATIO}
        symbol={question.symbol}
        highlight={question.ask}
      />

      <p className="challenge-prompt">
        How many {question.unit} for <strong>{question.ask}</strong>?
      </p>

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

export default PictogramsChallenge1;
