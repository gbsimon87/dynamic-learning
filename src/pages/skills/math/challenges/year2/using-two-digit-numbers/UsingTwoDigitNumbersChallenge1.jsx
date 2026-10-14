import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { buildAddOnesQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 1 - a two-digit number and 1s, along a line.
 *
 * The first of the four statutory calculation shapes, and the easiest. The run
 * of numbers is on screen so the ones can be counted rather than held. Every
 * question is generated and crosses (or lands on) the next ten.
 */

function UsingTwoDigitNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildAddOnesQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Add the ones."
      render={({ question, submit, locked, index }) => (
        <AddOnes key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function AddOnes({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.start} + {question.add} = ?
      </p>

      <NumberLine
        terms={question.terms}
        gaps={[]}
        values={{}}
        active={null}
        highlight={2}
        onFocusGap={() => {}}
        disabled={locked}
      />

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

export default UsingTwoDigitNumbersChallenge1;
