import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { barParts } from "../../../../../../data/challenges/fractions";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - two names for the same amount.
 *
 * Statutory: "recognise the equivalence of 2/4 and 1/2". Two bars are shown
 * shaded to the same length but cut into different numbers of parts, which is
 * what makes the equivalence visible rather than a rule to memorise.
 *
 * Three questions ask which fraction matches and three ask whether two bars
 * show the same amount, so it cannot be answered by always picking "1/2".
 */

const MATCH = [
  { shown: { numerator: 2, denominator: 4 }, answer: "1/2", options: ["1/2", "1/4", "1/3"] },
  { shown: { numerator: 1, denominator: 2 }, answer: "2/4", options: ["2/4", "3/4", "1/4"] },
];

const SAME = [
  { a: { numerator: 2, denominator: 4 }, b: { numerator: 1, denominator: 2 }, answer: "yes" },
  { a: { numerator: 1, denominator: 4 }, b: { numerator: 1, denominator: 2 }, answer: "no" },
  { a: { numerator: 3, denominator: 4 }, b: { numerator: 1, denominator: 2 }, answer: "no" },
  { a: { numerator: 1, denominator: 2 }, b: { numerator: 2, denominator: 4 }, answer: "yes" },
];

function buildQuestions(rng) {
  const match = MATCH.map((q) => ({
    kind: "match",
    parts: barParts(q.shown),
    answer: q.answer,
    options: shuffle(q.options, rng),
  }));

  const same = shuffle(SAME, rng)
    .slice(0, 4)
    .map((q) => ({
      kind: "same",
      partsA: barParts(q.a),
      partsB: barParts(q.b),
      answer: q.answer,
      options: ["yes", "no"],
    }));

  return shuffle([...match, ...same], rng);
}

function WhatIsAFractionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="2/4 and 1/2 are the same amount."
      render={({ question, submit, locked, index }) => (
        <Equivalence key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Equivalence({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {question.kind === "match" ? (
        <>
          <FractionBar parts={question.parts} label="A coloured bar" />
          <p className="challenge-prompt">
            Which fraction is the same as this?
          </p>
        </>
      ) : (
        <>
          <FractionBar parts={question.partsA} label="The first bar" />
          <FractionBar parts={question.partsB} label="The second bar" />
          <p className="challenge-prompt">
            Do these two bars show the same amount?
          </p>
        </>
      )}

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

export default WhatIsAFractionChallenge2;
