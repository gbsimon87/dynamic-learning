import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useRewards } from "../../hooks/useRewards";
import { localDay } from "../../data/streak";
import { puzzleForDay, solvedOn } from "../../data/dailyPuzzle";
import { nextMessage } from "../../data/celebrationMessages";
import { playCue, preloadSounds } from "../../components/celebration/sound/player";
import { playEffect } from "../../components/celebration/fx/effects";
import Mascot from "../../components/mascot/Mascot";
import SpeakButton from "../../components/challenge/SpeakButton";
import "./DailyPuzzle.css";

/**
 * The Daily Bix puzzle (`/daily-puzzle`): one puzzle a day, the same on every
 * device (data/dailyPuzzle.js). Ungated like Skills Mode — anyone can play.
 * A child who is signed in collects ONE puzzle star per day, a fixed reward
 * stored in their rewards document; replaying earns nothing more. There is
 * deliberately no puzzle streak: missing a day costs nothing.
 */
export default function DailyPuzzle() {
  const child = useContext(AuthContext)?.child;
  const { hydrated, rewards, solvePuzzle } = useRewards();
  const day = localDay();
  const puzzle = useMemo(() => puzzleForDay(day), [day]);
  const [struck, setStruck] = useState([]);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("");
  const [newStar, setNewStar] = useState(false);
  const focalRef = useRef(null);
  const stopEffectRef = useRef(null);

  useEffect(() => preloadSounds(), []);
  useEffect(() => () => stopEffectRef.current?.(), []);

  const alreadyHad = hydrated && solvedOn(rewards, day);
  const total = rewards?.puzzles?.total ?? 0;

  const choose = (option) => {
    if (solved || struck.includes(option)) return;
    if (option !== puzzle.answer) {
      setStruck((list) => [...list, option]);
      setMessage(nextMessage("wrong"));
      playCue("wrong");
      return;
    }
    setSolved(true);
    setMessage(nextMessage("last"));
    const stored = child ? solvePuzzle(day) : false;
    setNewStar(stored);
    playCue(stored ? "badge" : "correctLast");
    stopEffectRef.current = playEffect(stored ? "confettiStars" : "stars", { origin: focalRef.current });
  };

  const prettyDay = new Date(`${day}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="daily-puzzle">
      <header className="daily-puzzle-head">
        <Mascot className="daily-puzzle-bix" decorative cheerOn={solved ? "solved" : undefined} />
        <div>
          <p className="daily-puzzle-eyebrow">Bix’s puzzle for {prettyDay}</p>
          <h1 className="daily-puzzle-title">{puzzle.title}</h1>
        </div>
      </header>

      <section className="daily-puzzle-card" ref={focalRef}>
        <div className="daily-puzzle-question-row">
          <p className="daily-puzzle-question">{puzzle.question}</p>
          <SpeakButton text={puzzle.speak} compact label="Read the puzzle" />
        </div>

        {puzzle.show && (
          <p className="daily-puzzle-show" aria-label={puzzle.speak}>
            {puzzle.show.map((item, index) => (
              <span key={index} className="daily-puzzle-item">{item}</span>
            ))}
            {puzzle.kind === "next" && <span className="daily-puzzle-item is-blank" aria-hidden="true">?</span>}
          </p>
        )}

        <div className="daily-puzzle-options" role="group" aria-label="Answers">
          {puzzle.options.map((option) => {
            const isStruck = struck.includes(option);
            const isAnswer = solved && option === puzzle.answer;
            return (
              <button
                key={option}
                type="button"
                className={`daily-puzzle-option ${isStruck ? "is-struck" : ""} ${isAnswer ? "is-answer" : ""}`}
                onClick={() => choose(option)}
                disabled={isStruck || solved}
                aria-label={isStruck ? `${option}, not this one` : option}
              >
                {option}
              </button>
            );
          })}
        </div>

        <p className={`daily-puzzle-feedback ${solved ? "is-solved" : ""}`} role="status" aria-live="polite">
          {message}
          {solved && puzzle.explain ? ` ${puzzle.explain}` : ""}
        </p>

        {solved && (
          <div className="daily-puzzle-reward">
            {child && newStar && (
              <p><span aria-hidden="true">⭐</span> You won today’s puzzle star! That’s {total} so far.</p>
            )}
            {child && !newStar && alreadyHad && (
              <p><span aria-hidden="true">⭐</span> You already have today’s star. Come back tomorrow for a new puzzle!</p>
            )}
            {/* The rewards read has not landed (or failed): nothing was stored,
                so never claim the star is already theirs. */}
            {child && !newStar && !alreadyHad && (
              <p>Brilliant solving! We couldn’t save your star just now, so solve it again a bit later to collect it.</p>
            )}
            {!child && (
              <p>
                Pick your profile to collect puzzle stars.{" "}
                <Link to="/profiles">Choose a profile</Link>
              </p>
            )}
            <p className="daily-puzzle-tomorrow">A new puzzle arrives tomorrow.</p>
          </div>
        )}
      </section>

      {child && hydrated && !solved && alreadyHad && (
        <p className="daily-puzzle-note">You solved today’s puzzle already — have another go for fun!</p>
      )}
    </div>
  );
}
