import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildCountBlocksQuestions, tensOf, onesOf } from "../../../../../../data/challenges/placeValue";

/**
 * Challenge 1 - the number is drawn before it is written.
 *
 * Tens are rods and ones are single blocks, so "4 tens and 7 ones" is
 * something the learner can see and count rather than recall. Numbers are
 * generated each time; the other column's digit is always a wrong option.
 */

function PlaceValueChallenge1({ onComplete }) {
  const questions = useMemo(() => buildCountBlocksQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count the blocks."
      render={({ question, submit, locked, index }) => (
        <CountBlocks key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountBlocks({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        How many {question.asksTens ? "tens" : "ones"} are in {question.value}?
      </p>

      <div className="blocks" aria-label={`${tensOf(question.value)} tens and ${onesOf(question.value)} ones`}>
        <div className="blocks-group">
          {question.picture.tens.map((i) => (
            <span key={`t${i}`} className="block-ten" />
          ))}
        </div>
        <div className="blocks-group">
          {question.picture.ones.map((i) => (
            <span key={`o${i}`} className="block-one" />
          ))}
        </div>
      </div>

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

export default PlaceValueChallenge1;
