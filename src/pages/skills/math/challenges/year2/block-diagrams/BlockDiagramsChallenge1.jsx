import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildBlockRead } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 1 - read a block diagram where one block is one thing.
 *
 * The gentlest slot: the scale goes up in ones, the asked column is
 * underlined, and the blocks can simply be counted. The axis is on screen
 * from the start so a learner gets used to looking at it before it matters.
 * New data every question, and the near misses are picked at random so the
 * answer is not always in the same place (see buildBlockRead).
 */

function BlockDiagramsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildBlockRead(Math.random), []);

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

export default BlockDiagramsChallenge1;
