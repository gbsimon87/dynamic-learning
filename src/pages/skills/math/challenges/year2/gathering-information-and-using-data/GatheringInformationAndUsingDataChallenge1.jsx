import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  countByCategory,
  nearMissOptions,
  shuffle,
} from "../../../../../../data/challenges/statistics";

/**
 * Challenge 1 - count one category in an unsorted pile.
 *
 * The gentlest slot, but the data is raw: nobody has organised it, which is
 * what "ask and answer simple questions by counting the number of objects in
 * each category" is really about. Every other Statistics topic hands the
 * learner a finished chart; here the chart does not exist yet.
 *
 * Objects can be tapped to tick them off while counting, because keeping
 * track in a jumble is the actual difficulty at six years old.
 */

const PILES = [
  { categories: ["🍎", "🍐", "🍌"], counts: [6, 4, 3], ask: "🍎", name: "apples" },
  { categories: ["🐱", "🐶", "🐠"], counts: [5, 7, 2], ask: "🐶", name: "dogs" },
  { categories: ["🔴", "🔵", "🟡"], counts: [4, 8, 3], ask: "🔵", name: "blue counters" },
  { categories: ["⭐", "❤️", "🌙"], counts: [7, 3, 5], ask: "🌙", name: "moons" },
  { categories: ["🚗", "🚌", "🚲"], counts: [8, 3, 6], ask: "🚗", name: "cars" },
  { categories: ["🌻", "🌷", "🌹"], counts: [3, 9, 4], ask: "🌷", name: "tulips" },
];

function buildQuestions(rng) {
  return shuffle(PILES, rng).map((pile) => {
    const items = shuffle(
      pile.categories.flatMap((category, i) =>
        Array.from({ length: pile.counts[i] }, () => category)
      ),
      rng
    );
    const answer = countByCategory(items, pile.categories).find(
      (row) => row.label === pile.ask
    ).value;
    return { ...pile, items, answer, options: nearMissOptions(answer, 4, rng) };
  });
}

function GatheringChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Nobody has sorted these yet. Tap each one as you count it."
      render={({ question, submit, locked, index }) => (
        <CountCategory key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountCategory({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [selected, setSelected] = useState(null);

  return (
    <>
      <SurveyTray
        items={question.items}
        counted={counted}
        disabled={locked}
        onToggle={(index) =>
          setCounted((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
          })
        }
      />

      <p className="challenge-prompt">
        How many <span className="pictogram-symbol">{question.ask}</span> {question.name} are
        there?
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

export default GatheringChallenge1;
