import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { COINS, formatMoney } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - name the coin.
 *
 * Statutory: "recognise and use symbols for pounds (£) and pence (p)". Before
 * combining coins a learner has to know which is which, and that £1 is written
 * with the symbol in front while 50p has it behind.
 */

function buildQuestions(rng) {
  return shuffle(COINS, rng)
    .slice(0, 6)
    .map((coin) => {
      const others = COINS.filter((c) => c !== coin);
      return {
        coin,
        answer: formatMoney(coin),
        options: shuffle(
          [formatMoney(coin), ...shuffle(others, rng).slice(0, 2).map(formatMoney)],
          rng
        ),
      };
    });
}

function StandardUnitsOfMoneyChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
        How do you write a coin worth {question.coin} {question.coin === 1 ? "penny" : "pence"}?
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
