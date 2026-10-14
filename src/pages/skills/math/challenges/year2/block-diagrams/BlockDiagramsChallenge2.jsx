import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildBlockScale } from "../../../../../../data/challenges/statisticsQuestions";

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
 * it means, so every prompt names its column ("How many fish in Tank B?") -
 * a set labelled Mon/Tue/Wed asked about "books read" has no answerable
 * question at all, which is how this slot first shipped. New data every
 * question (see buildBlockScale).
 */

const STEP = 2;

function BlockDiagramsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildBlockScale(Math.random), []);

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

export default BlockDiagramsChallenge2;
