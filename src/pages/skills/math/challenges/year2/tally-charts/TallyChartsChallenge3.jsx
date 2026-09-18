import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import { countByCategory, clamp, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 3 - tally a real pile of things.
 *
 * This is what tally charts are FOR: the pile is jumbled, so counting one
 * category means going through it and keeping track — which is the problem a
 * tally chart solves. Objects can be tapped to tick them off while counting,
 * because at six years old losing your place is the whole difficulty.
 *
 * Whole-structure: every row must match before it passes.
 */

/** The tally chart's own cap, and the cap on the +/- control. */
const MAX_MARKS = 20;

const PILES = [
  { categories: ["🍎", "🍐", "🍌"], counts: [5, 3, 4] },
  { categories: ["🐱", "🐶", "🐠"], counts: [4, 6, 2] },
  { categories: ["🔴", "🔵", "🟢"], counts: [7, 2, 5] },
  { categories: ["⭐", "❤️", "🌙"], counts: [3, 5, 6] },
  { categories: ["🚗", "🚌", "🚲"], counts: [6, 4, 3] },
  { categories: ["🌻", "🌷", "🌹"], counts: [2, 7, 4] },
];

function buildQuestions(rng) {
  return shuffle(PILES, rng).map((pile) => {
    // The pile is shuffled, so the categories are not already grouped - that
    // is what makes the counting real work.
    const items = shuffle(
      pile.categories.flatMap((category, i) =>
        Array.from({ length: pile.counts[i] }, () => category)
      ),
      rng
    );
    return { items, categories: pile.categories, targets: countByCategory(items, pile.categories) };
  });
}

function TallyChartsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Tally the pile. Tap a picture to tick it off as you count."
      render={({ question, submit, locked, index }) => (
        <TallyPile key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TallyPile({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(question.categories.map((category) => [category, 0]))
  );

  const rows = question.categories.map((category) => ({
    label: category,
    value: counts[category],
  }));

  const isCorrect = question.targets.every(
    (target) => counts[target.label] === target.value
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

      <TallyChart
        rows={rows}
        max={MAX_MARKS}
        showCounts
        disabled={locked}
        // Functional update from `prev`: a step applied to the rendered value
        // would lose a fast second tap to React's batching.
        onStepCount={(label, step) =>
          setCounts((prev) => ({
            ...prev,
            [label]: clamp(prev[label] + step, 0, MAX_MARKS),
          }))
        }
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my tally chart
      </button>
    </>
  );
}

export default TallyChartsChallenge3;
