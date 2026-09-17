import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import {
  applyChange,
  describeChange,
  neighbourStrip,
  moreLessDistractors,
} from "../../../../../../data/challenges/countingMoreAndLess";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - the gentlest slot.
 *
 * The jump is named in words and a strip of neighbours sits above the answer,
 * so a learner who cannot yet do it in their head can count along the line.
 * Only the 1-more and 1-less jumps appear here.
 */

const STARTS = [27, 34, 49, 16, 58, 71];

function buildQuestions(rng) {
  return shuffle(STARTS, rng).map((start, i) => {
    const change = i % 2 === 0 ? 1 : -1;
    const answer = applyChange(start, change);
    const strip = neighbourStrip(start);
    return {
      start,
      change,
      answer,
      strip,
      highlight: strip.indexOf(start),
      options: shuffle([answer, ...moreLessDistractors(start, change, 2)], rng),
    };
  });
}

function CountingMoreAndLessChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the number line to help you."
      render={({ question, submit, locked, index }) => (
        <OneMoreOneLess key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OneMoreOneLess({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        What is {describeChange(question.change)} than {question.start}?
      </p>

      <NumberLine
        terms={question.strip}
        gaps={[]}
        values={{}}
        active={null}
        highlight={question.highlight}
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

export default CountingMoreAndLessChallenge1;
