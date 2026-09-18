import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { nearMissOptions, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 1 - read a block diagram where one block is one thing.
 *
 * The gentlest slot: the scale goes up in ones, the asked column is
 * underlined, and the blocks can simply be counted. The axis is on screen
 * from the start so a learner gets used to looking at it before it matters.
 */

const SETS = [
  {
    max: 8,
    rows: [
      { label: "Cats", value: 5 },
      { label: "Dogs", value: 7 },
      { label: "Fish", value: 3 },
    ],
    ask: "Dogs",
    unit: "dogs",
  },
  {
    max: 8,
    rows: [
      { label: "Red", value: 6 },
      { label: "Blue", value: 2 },
      { label: "Green", value: 4 },
    ],
    ask: "Green",
    unit: "green cars",
  },
  {
    max: 10,
    rows: [
      { label: "Bus", value: 3 },
      { label: "Car", value: 9 },
      { label: "Bike", value: 6 },
    ],
    ask: "Bike",
    unit: "bikes",
  },
  {
    max: 10,
    rows: [
      { label: "Mon", value: 8 },
      { label: "Tue", value: 4 },
      { label: "Wed", value: 10 },
    ],
    ask: "Mon",
    unit: "books read",
  },
  {
    max: 8,
    rows: [
      { label: "Apples", value: 7 },
      { label: "Pears", value: 5 },
      { label: "Plums", value: 2 },
    ],
    ask: "Pears",
    unit: "pears",
  },
  {
    max: 10,
    rows: [
      { label: "Ava", value: 4 },
      { label: "Ben", value: 8 },
      { label: "Cleo", value: 6 },
    ],
    ask: "Cleo",
    unit: "stickers",
  },
];

function BlockDiagramsChallenge1({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(SETS, Math.random).map((set) => {
        const answer = set.rows.find((row) => row.label === set.ask).value;
        return { ...set, answer, options: nearMissOptions(answer, 4, Math.random) };
      }),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each block stands for 1. Count the blocks."
      render={({ question, submit, locked, index }) => (
        <ReadColumn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadColumn({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <BlockDiagram rows={question.rows} max={question.max} highlight={question.ask} />

      <p className="challenge-prompt">
        How many {question.unit}?
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

export default BlockDiagramsChallenge1;
