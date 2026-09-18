import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - addition can be done in any order; subtraction cannot.
 *
 * Statutory, and previously uncovered by any topic. Each question shows a fact
 * and asks which other calculation gives the same answer. The subtraction
 * questions are the point: 9 - 4 and 4 - 9 are NOT the same, so the swap is
 * offered and is wrong there.
 */

const QUESTIONS = [
  {
    fact: "6 + 3 = 9",
    ask: "Which one also makes 9?",
    options: ["3 + 6", "9 + 3", "6 - 3"],
    answer: "3 + 6",
  },
  {
    fact: "8 + 5 = 13",
    ask: "Which one also makes 13?",
    options: ["5 + 8", "8 - 5", "13 + 5"],
    answer: "5 + 8",
  },
  {
    fact: "12 + 7 = 19",
    ask: "Which one also makes 19?",
    options: ["7 + 12", "19 + 7", "12 - 7"],
    answer: "7 + 12",
  },
  {
    fact: "9 - 4 = 5",
    ask: "Does swapping work here? Which one makes 5?",
    options: ["4 + 1", "4 - 9", "9 + 4"],
    answer: "4 + 1",
  },
  {
    fact: "15 - 6 = 9",
    ask: "Does swapping work here? Which one makes 9?",
    options: ["6 + 3", "6 - 15", "15 + 6"],
    answer: "6 + 3",
  },
  {
    fact: "4 + 10 = 14",
    ask: "Which one also makes 14?",
    options: ["10 + 4", "14 - 4", "4 - 10"],
    answer: "10 + 4",
  },
];

function SolvingNumberProblemsChallenge2({ onComplete }) {
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
      title="Adding can be done in any order. Taking away cannot."
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

export default SolvingNumberProblemsChallenge2;
