import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import { countByCategory, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 3 - organise the pile into a block diagram.
 *
 * The full journey in one screen: raw data in, chart out. This is the
 * "record, interpret, collate, organise" sentence from the guidance, and it
 * is the only place in the category where a learner does the whole thing
 * rather than one step of it.
 *
 * Whole-structure: all four columns must be right at once.
 */

const PILES = [
  { categories: ["🍎", "🍐", "🍌", "🍇"], counts: [6, 3, 8, 4] },
  { categories: ["🐱", "🐶", "🐠", "🐦"], counts: [5, 9, 2, 6] },
  { categories: ["🔴", "🔵", "🟡", "🟢"], counts: [7, 2, 5, 3] },
  { categories: ["⭐", "❤️", "🌙", "☀️"], counts: [4, 8, 6, 2] },
  { categories: ["🚗", "🚌", "🚲", "🚚"], counts: [9, 4, 6, 3] },
  { categories: ["🌻", "🌷", "🌹", "🌼"], counts: [3, 7, 5, 8] },
];

const MAX = 10;

function buildQuestions(rng) {
  return shuffle(PILES, rng).map((pile) => {
    const items = shuffle(
      pile.categories.flatMap((category, i) =>
        Array.from({ length: pile.counts[i] }, () => category)
      ),
      rng
    );
    return {
      items,
      categories: pile.categories,
      targets: countByCategory(items, pile.categories),
    };
  });
}

function GatheringChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Turn the pile into a block diagram."
      render={({ question, submit, locked, index }) => (
        <BuildFromPile key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildFromPile({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [values, setValues] = useState(() =>
    Object.fromEntries(question.categories.map((category) => [category, 0]))
  );

  const rows = question.categories.map((category) => ({
    label: category,
    value: values[category],
  }));

  const isCorrect = question.targets.every(
    (target) => values[target.label] === target.value
  );

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

      <p className="challenge-prompt">Tap a block to set how tall each column is.</p>

      <BlockDiagram
        rows={rows}
        max={MAX}
        disabled={locked}
        onSetValue={(label, next) => setValues((prev) => ({ ...prev, [label]: next }))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my block diagram
      </button>
    </>
  );
}

export default GatheringChallenge3;
