import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildCoinNameQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - name the coin.
 *
 * Statutory: "recognise and use symbols for pounds (£) and pence (p)". Before
 * combining coins a learner has to know which is which, and that £1 is written
 * with the symbol in front while 50p has it behind. The wrong options are
 * the real slips: the other symbol, the symbol on the wrong side, or the
 * coin next door.
 */

function StandardUnitsOfMoneyChallenge1({ onComplete }) {
  const questions = useMemo(() => buildCoinNameQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Pence go after the number, pounds go before it."
      render={({ question, submit, locked, index }) => (
        <NameCoin key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameCoin({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        How do you write a coin worth {question.words}?
      </p>

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

export default StandardUnitsOfMoneyChallenge1;
