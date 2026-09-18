import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - multiplying can be done in any order; dividing cannot.
 *
 * Statutory. The multiplication questions reward swapping; the division
 * questions punish it, and the swap is always offered so the rule has to be
 * known rather than guessed from the shape of the options.
 */

const QUESTIONS = [
  { fact: "3 × 5 = 15", ask: "Which one also makes 15?", options: ["5 × 3", "15 × 3", "15 ÷ 3"], answer: "5 × 3" },
  { fact: "4 × 10 = 40", ask: "Which one also makes 40?", options: ["10 × 4", "40 × 10", "40 ÷ 10"], answer: "10 × 4" },
  { fact: "20 ÷ 5 = 4", ask: "Careful — which one also makes 4?", options: ["20 ÷ 5", "5 ÷ 20", "4 ÷ 20"], answer: "20 ÷ 5" },
  { fact: "6 × 2 = 12", ask: "Which one also makes 12?", options: ["2 × 6", "12 ÷ 2", "12 × 2"], answer: "2 × 6" },
  { fact: "30 ÷ 10 = 3", ask: "Careful — which one also makes 3?", options: ["30 ÷ 10", "10 ÷ 30", "3 ÷ 30"], answer: "30 ÷ 10" },
  { fact: "7 × 5 = 35", ask: "Which one also makes 35?", options: ["5 × 7", "35 ÷ 7", "35 × 5"], answer: "5 × 7" },
];

function ConnectingMultiplicationAndDivisionChallenge2({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(QUESTIONS, Math.random).map((q) => ({
        ...q,
        options: shuffle(q.options, Math.random),
      })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Swapping works for × but not for ÷."
      render={({ question, submit, locked, index }) => (
        <SameAnswer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SameAnswer({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.fact}</p>
      <p className="challenge-prompt">{question.ask}</p>

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

export default ConnectingMultiplicationAndDivisionChallenge2;
