import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { createSubmissionGate } from "../../data/submissionGate";
import { MILESTONE_EVERY } from "../../data/freePlay/feedback";
import SpeakButton from "../challenge/SpeakButton";
import AnswerFeedbackLine from "./AnswerFeedbackLine";
import { useAnswerFeedback } from "./useAnswerFeedback";
import "../challenge/challenge-kit.css";
import "./FreePlayShell.css";

/**
 * The loop for an endless Skills Mode game built on the challenge kit.
 *
 * Unlike ChallengeShell there is no fixed run, no "question 3 of 6", no
 * onComplete and no progress: questions keep coming until the child stops.
 * Skills Mode is ungated and untracked, so nothing here is stored.
 *
 * `makeQuestion(rng, level)`  pure; returns { key, prompt, speech, ... }.
 *                             `key` identifies the question so the same
 *                             one is not dealt twice in a row; `speech` is
 *                             what 🔊 reads (never automatic).
 * `render({ question, submit, locked, level, misses })`
 *                             the interaction. Call `submit(isCorrect)` for
 *                             every attempt, like ChallengeShell's children.
 * `title`, `icon`, `intro`    the page heading.
 *
 * Feedback, combos, sounds and particles come from useAnswerFeedback; the
 * free-play game event is a milestone every five right answers. The level
 * picker (Easier / Medium / Harder) starts a fresh game: new question,
 * combo and count reset — stale state across a mode switch is this
 * codebase's most common bug.
 */

const LEVELS = [
  { id: 1, label: "Easier" },
  { id: 2, label: "Medium" },
  { id: 3, label: "Harder" },
];

const NEXT_DELAY = 1000;
// A milestone's burst and fanfare get a little longer before moving on.
const MILESTONE_DELAY = 1600;

/** A new question, avoiding the one just played. Bounded: six tries. */
function freshQuestion(makeQuestion, level, previous) {
  let question = makeQuestion(Math.random, level);
  for (let tries = 0; tries < 5 && previous && question.key === previous.key; tries += 1) {
    question = makeQuestion(Math.random, level);
  }
  return question;
}

function FreePlayShell({ title, icon, intro, makeQuestion, render, initialLevel = 1 }) {
  const [level, setLevel] = useState(initialLevel);
  const [round, setRound] = useState(() => ({ n: 0, question: makeQuestion(Math.random, initialLevel) }));
  const [locked, setLocked] = useState(false);
  const [misses, setMisses] = useState(0);
  const fb = useAnswerFeedback();

  const timerRef = useRef(null);
  const missedRef = useRef(false);
  const focusPromptRef = useRef(false);
  const promptRef = useRef(null);
  const gateRef = useRef(null);
  if (!gateRef.current) gateRef.current = createSubmissionGate();

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // After moving on, put keyboard focus on the new prompt: the button that
  // was pressed has gone with the old question, and focus left on <body>
  // would send a keyboard user back to the top of the page.
  useEffect(() => {
    if (!focusPromptRef.current) return;
    focusPromptRef.current = false;
    promptRef.current?.focus({ preventScroll: true });
  }, [round.n]);

  const deal = (nextLevel, previous, n) => {
    window.clearTimeout(timerRef.current);
    setRound({ n: n + 1, question: freshQuestion(makeQuestion, nextLevel, previous) });
    setLocked(false);
    setMisses(0);
    missedRef.current = false;
    fb.clear();
  };

  const submit = (isCorrect) => {
    // React batches state: close the gate before a second tap can submit.
    if (!gateRef.current(round.n, isCorrect)) return;

    const out = fb.answer(isCorrect, { firstTry: !missedRef.current });
    if (!isCorrect) {
      missedRef.current = true;
      setMisses((count) => count + 1);
      return;
    }

    setLocked(true);
    const { question, n } = round;
    timerRef.current = window.setTimeout(() => {
      focusPromptRef.current = true;
      deal(level, question, n);
    }, out.milestone ? MILESTONE_DELAY : NEXT_DELAY);
  };

  const changeLevel = (nextLevel) => {
    if (nextLevel === level) return;
    fb.reset();
    setLevel(nextLevel);
    deal(nextLevel, null, round.n);
  };

  const { question } = round;
  // The five pips fill towards the next star, and stay full while a
  // milestone is on screen rather than emptying under the celebration.
  const towards = fb.correct % MILESTONE_EVERY;
  const filled = fb.correct > 0 && towards === 0 && locked ? MILESTONE_EVERY : towards;
  const stars = Math.floor(fb.correct / MILESTONE_EVERY);

  return (
    <div className="free-play-page">
      <header className="free-play-header">
        <Link to="/skills" className="free-play-back">
          <span aria-hidden="true">←</span> All games
        </Link>
        <h1 className="free-play-title">
          {icon && <span aria-hidden="true">{icon} </span>}
          {title}
        </h1>
        {intro && <p className="free-play-intro">{intro}</p>}
      </header>

      <div className="challenge-container free-play">
        <div className="free-play-toolbar">
          <div className="free-play-levels" role="group" aria-label="Choose a level">
            {LEVELS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`free-play-level ${option.id === level ? "is-active" : ""}`}
                aria-pressed={option.id === level}
                onClick={() => changeLevel(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div
            className="free-play-stars"
            role="img"
            aria-label={`${filled} of ${MILESTONE_EVERY} towards the next star${stars ? `, ${stars} ${stars === 1 ? "star" : "stars"} so far` : ""}`}
          >
            {Array.from({ length: MILESTONE_EVERY }, (_, i) => (
              <span key={i} className={`free-play-pip ${i < filled ? "is-filled" : ""}`} />
            ))}
            {stars > 0 && <span className="free-play-star-count">🌟 {stars}</span>}
          </div>
        </div>

        <div className="free-play-prompt-row">
          <p ref={promptRef} tabIndex={-1} className="challenge-prompt free-play-prompt">
            {question.prompt}
          </p>
          <SpeakButton text={question.speech} label="Hear the question" compact />
        </div>

        {/* Keyed per question so a half-built answer never carries over. */}
        <div key={round.n} ref={fb.answerRef} className="free-play-stage">
          {render({ question, submit, locked, level, misses })}
        </div>

        <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      </div>
    </div>
  );
}

export default FreePlayShell;
