import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { nearMissOptions, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 2 - the scale goes up in twos, and nothing is highlighted.
 *
 * The rule has to be inferred now: only every second line is labelled, and
 * every asked column stops on an ODD number, so its top sits between two
 * labels. A learner who reads the nearest label gets it wrong; a learner who
 * counts the blocks gets it right. That is the whole point of the slot, so
 * the odd value is deliberate rather than incidental.
 *
 * Because nothing is highlighted here, the question has to SAY which column
 * it means. Every `unit` therefore names its own column ("robins" for the
 * Robins column) - a set labelled Mon/Tue/Wed asked about "books read" has
 * no answerable question at all, which is how this slot first shipped.
 */

const SETS = [
  {
    max: 12,
    rows: [
      { label: "Cats", value: 7 },
      { label: "Dogs", value: 10 },
      { label: "Fish", value: 4 },
    ],
    ask: "Cats",
    unit: "cats",
  },
  {
    max: 12,
    rows: [
      { label: "Red", value: 6 },
      { label: "Blue", value: 9 },
      { label: "Green", value: 12 },
    ],
    ask: "Blue",
    unit: "blue cars",
  },
  {
    max: 10,
    rows: [
      { label: "Bus", value: 5 },
      { label: "Car", value: 8 },
      { label: "Bike", value: 2 },
    ],
    ask: "Bus",
    unit: "buses",
  },
  {
    max: 14,
    rows: [
      { label: "Robins", value: 11 },
      { label: "Crows", value: 6 },
      { label: "Pigeons", value: 14 },
    ],
    ask: "Robins",
    unit: "robins",
  },
  {
    max: 12,
    rows: [
      { label: "Apples", value: 8 },
      { label: "Pears", value: 3 },
      { label: "Plums", value: 10 },
    ],
    ask: "Pears",
    unit: "pears",
  },
  {
    max: 14,
    rows: [
      { label: "Cakes", value: 12 },
      { label: "Buns", value: 13 },
      { label: "Tarts", value: 6 },
    ],
    ask: "Buns",
    unit: "buns",
  },
];

const STEP = 2;

function BlockDiagramsChallenge2({ onComplete }) {
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
      title="This scale goes up in 2s. Look carefully!"
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
      <BlockDiagram rows={question.rows} max={question.max} step={STEP} />

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

export default BlockDiagramsChallenge2;
