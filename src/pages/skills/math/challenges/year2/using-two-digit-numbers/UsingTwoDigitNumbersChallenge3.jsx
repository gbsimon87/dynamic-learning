import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildMakeTenQuestions, makesTenFirst } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 3 - adding 3 one-digit numbers.
 *
 * Statutory, and previously uncovered. Rather than asking for the total, this
 * asks for the STRATEGY: drag the two that make ten to the front. That works
 * only because addition can be done in any order, so it also puts the
 * commutativity rule to use.
 *
 * Either order of the ten-pair is accepted - only the pairing matters. Triples
 * are generated, and the third number never makes 10 with either of the pair.
 */

function UsingTwoDigitNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildMakeTenQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the two that make 10."
      render={({ question, submit, locked, index }) => (
        <MakeTen key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MakeTen({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Adding is easier if you make 10 first. Drag the two that make 10 to the
        front.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(makesTenFirst(items.map((item) => item.value)))}
      >
        Check my answer
      </button>
    </>
  );
}

export default UsingTwoDigitNumbersChallenge3;
