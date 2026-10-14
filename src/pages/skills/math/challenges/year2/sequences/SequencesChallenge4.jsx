import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildArrangeLine } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 4 - arrange a line from clues.
 *
 * Several position words at once, given out of order, each one constraining
 * the answer. Two lines of three, then four lines of four, and some clues
 * only say who an animal is next to (see buildArrangeLine).
 */

function SequencesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildArrangeLine(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Follow all the instructions."
      render={({ question, submit, locked, index }) => (
        <ArrangeLine key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ArrangeLine({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">{question.clue}</p>

      <p className="challenge-prompt">Drag them into the right order.</p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.order[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default SequencesChallenge4;
