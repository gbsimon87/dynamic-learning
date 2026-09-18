import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { DOUBLES, double, sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - doubling, with the two equal groups drawn.
 *
 * A double is "the same amount twice", so both groups are on screen and can be
 * counted. This is the gentlest slot: the answer is visible to anyone willing
 * to count the blocks.
 */

function buildQuestions(rng) {
  return shuffle(DOUBLES, rng)
    .slice(0, 6)
    .map((n) => {
      const answer = double(n);
      return {
        n,
        answer,
        options: shuffle([answer, ...sumDistractors(answer, 2)], rng),
      };
    });
}

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Double means the same amount twice."
      render={({ question, submit, locked, index }) => (
        <Double key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Double({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const group = Array.from({ length: question.n }, (_, i) => i);

  return (
    <>
      <p className="challenge-prompt">
        What is double {question.n}?
      </p>

      <div className="blocks" aria-label={`Two groups of ${question.n}`}>
        <div className="blocks-group">
          {group.map((i) => (
            <span key={`a${i}`} className="block-one" />
          ))}
        </div>
        <div className="blocks-group">
          {group.map((i) => (
            <span key={`b${i}`} className="block-one" />
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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge1;
