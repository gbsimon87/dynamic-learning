import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { double, half, relatedFactTo100 } from "../../../../../../data/challenges/additionAndSubtraction";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the related facts up to 100.
 *
 * Statutory: "derive and use related facts up to 100". Each question shows the
 * small fact the learner already knows and asks for the one ten times bigger,
 * so this is reasoning from a known fact rather than a new calculation.
 *
 * The last two mix in doubling and halving of tens, which is the same move.
 */

const PAIRS = [
  [3, 7],
  [4, 6],
  [2, 8],
  [5, 5],
  [1, 9],
];

function buildQuestions(rng) {
  const derived = shuffle(PAIRS, rng).map(([a, b]) => {
    const fact = relatedFactTo100(a, b);
    return {
      known: `${a} + ${b} = ${a + b}`,
      prompt: `So what is ${fact.a} + ${fact.b}?`,
      answer: fact.total,
    };
  });

  const tens = shuffle(
    [
      { known: "double 3 = 6", prompt: "So what is double 30?", answer: double(30) },
      { known: "half of 8 = 4", prompt: "So what is half of 80?", answer: half(80) },
      { known: "double 4 = 8", prompt: "So what is double 40?", answer: double(40) },
    ],
    rng
  );

  return [...derived.slice(0, 4), ...tens.slice(0, 2)];
}

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the fact you already know."
      render={({ question, submit, locked, index }) => (
        <RelatedFact key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function RelatedFact({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.known}</p>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge4;
