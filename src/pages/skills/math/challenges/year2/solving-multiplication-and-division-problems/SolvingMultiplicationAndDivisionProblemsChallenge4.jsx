import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - two steps, typed.
 *
 * Every story needs a multiplication and a division, or two of one, and the
 * first answer is never the one asked for. Nothing to choose from, so stopping
 * after one step cannot accidentally be right.
 */
const PROBLEMS = [
  { prompt: "There are 4 boxes with 5 cakes in each. The cakes are shared between 10 children. How many cakes each?", answer: 2 },
  { prompt: "A shop has 3 shelves with 10 tins on each. 12 tins are sold. How many are left?", answer: 18 },
  { prompt: "6 children each pick 5 apples. The apples are put into bags of 10. How many bags?", answer: 3 },
  { prompt: "There are 2 rows of 10 chairs. Half the chairs are taken. How many are taken?", answer: 10 },
  { prompt: "A tray holds 5 buns. There are 8 trays. The buns are shared between 4 shops. How many per shop?", answer: 10 },
  { prompt: "9 bags hold 2 marbles each. 4 marbles are lost. How many marbles are left?", answer: 14 },
  { prompt: "5 packs of 10 cards are shared between 5 children. How many cards each?", answer: 10 },
  { prompt: "There are 7 pairs of shoes. 2 shoes are thrown away. How many shoes are left?", answer: 12 },
];

function SolvingMultiplicationAndDivisionProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="This one takes two steps."
      render={({ question, submit, locked, index }) => (
        <TwoStep key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoStep({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
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

export default SolvingMultiplicationAndDivisionProblemsChallenge4;
