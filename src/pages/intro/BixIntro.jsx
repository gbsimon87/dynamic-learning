import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useRewards } from "../../hooks/useRewards";
import { useSoundMuted } from "../../components/celebration/sound/useSoundMuted";
import { playCue, preloadSounds } from "../../components/celebration/sound/player";
import { playEffect } from "../../components/celebration/fx/effects";
import Mascot from "../../components/mascot/Mascot";
import { isNarrationSupported, speak, stopNarration } from "../../utils/speech";
import { destinationFor } from "../../data/signupFlow";
import { getBadge } from "../../data/badges";
import { INTRO_BADGE_ID } from "../../data/intro";
import StarBasket from "./StarBasket";
import "./BixIntro.css";

/**
 * Bix's first-play intro: a 90-second hello where every step is something to
 * DO. Shown once per child (the flag is `intro.done` in the rewards document,
 * see data/intro.js); RequireChild sends a brand-new child here, and a grown-up
 * can replay it from /parent.
 *
 * Steps: hello (by name) → tap Bix → drag the star → the controls a challenge
 * really has → a warm-up nobody can get wrong, with a Met Bix badge → off to
 * the first topic. "Skip" is on every step and also marks the intro done.
 *
 * Every line is visible text first; it is ALSO spoken when the app's sound is
 * on, so the whole thing works with sound off.
 */

const FAVOURITES = [
  { id: "rocket", emoji: "🚀", label: "Rockets" },
  { id: "dino", emoji: "🦖", label: "Dinosaurs" },
  { id: "rainbow", emoji: "🌈", label: "Rainbows" },
];

function lineFor(step, name, extra) {
  switch (step) {
    case "hello":
      return `Hello, ${name}! I'm Bix. I'm so happy you're here!`;
    case "tap":
      return extra.tapped ? "Hee hee! That tickles!" : "Can you tap me? Go on!";
    case "drag":
      return extra.dropped ? "You did it! My star is safe in my basket." : "Can you put the star in my basket?";
    case "controls":
      return "In a challenge, tap Read it to me to hear the question. Tap Curriculum at the top to go back to your topics.";
    case "warmup":
      return extra.picked ? `${extra.picked}? Great choice! Me too!` : "Last one! Which do you like best?";
    case "done":
      return "You're ready! Let's find your first topic.";
    default:
      return "";
  }
}

const STEPS = ["hello", "tap", "drag", "controls", "warmup", "done"];

export default function BixIntro() {
  const auth = useContext(AuthContext);
  const child = auth?.child;
  const name = child?.name ?? "friend";
  const { hydrated, status, finishIntro } = useRewards();
  const [muted] = useSoundMuted();
  const navigate = useNavigate();
  const location = useLocation();

  const [stepIndex, setStepIndex] = useState(0);
  const [tapped, setTapped] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [picked, setPicked] = useState(null);
  const [heard, setHeard] = useState(false);
  const [badge, setBadge] = useState(null);
  const headingRef = useRef(null);
  const badgeRef = useRef(null);
  const finishedRef = useRef(false);
  // Stop functions for running particle effects, cleared on unmount (§9).
  const effectsRef = useRef([]);
  const burst = (name, origin) => effectsRef.current.push(playEffect(name, { origin }));

  const step = STEPS[stepIndex];
  const line = lineFor(step, name, { tapped: tapped > 0, dropped, picked: picked?.label });

  // Where "Let's go" leads: the page the child was heading for, else their
  // first subject for their year, else the curriculum picker.
  const from = location.state?.from?.pathname;
  const destination = from && from !== "/hello" ? from : destinationFor(child) === "/" ? "/curriculum" : destinationFor(child);

  useEffect(() => preloadSounds(), []);

  // Speak each new line when the sound is on. The visible bubble always says it too.
  useEffect(() => {
    if (!muted) speak(line);
  }, [line, muted]);
  useEffect(() => () => {
    stopNarration();
    effectsRef.current.forEach((stop) => stop?.());
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  const finish = useCallback(
    (completed) => {
      if (finishedRef.current && !completed) return [];
      finishedRef.current = true;
      return finishIntro({ completed }) ?? [];
    },
    [finishIntro]
  );

  const next = () => setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));

  const skip = () => {
    finish(false);
    stopNarration();
    navigate(destination, { replace: true });
  };

  const tapBix = () => {
    setTapped((count) => count + 1);
    playCue("correct");
  };

  const onDrop = () => {
    setDropped(true);
    playCue("correct");
    burst("sparkle", headingRef.current);
  };

  const pick = (option) => {
    if (picked) return;
    setPicked(option);
    const awarded = finish(true);
    setBadge(awarded[0] ?? getBadge(INTRO_BADGE_ID));
    playCue("badge");
    // Wait a frame so the badge card exists to burst from.
    window.requestAnimationFrame(() => burst("confettiStars", badgeRef.current));
  };

  const go = () => {
    finish(false);
    stopNarration();
    navigate(destination, { replace: true });
  };

  if (status === "failed") {
    return (
      <div className="bix-intro">
        <div className="bix-intro-card">
          <p className="bix-intro-bubble">Bix can't come out to play just now.</p>
          <Link className="bix-intro-primary" to={destination}>Go to my topics</Link>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="bix-intro" role="status">
        <p className="bix-intro-loading">Getting Bix ready…</p>
      </div>
    );
  }

  let action = null;
  let body = null;
  switch (step) {
    case "hello":
      action = <button type="button" className="bix-intro-primary" onClick={next}>Hello, Bix! <span aria-hidden="true">👋</span></button>;
      break;
    case "tap":
      body = <p className="bix-intro-hint">{tapped > 0 ? `Taps: ${tapped}` : "Tap Bix — he's the big button!"}</p>;
      action = tapped > 0 && <button type="button" className="bix-intro-primary" onClick={next}>Next <span aria-hidden="true">→</span></button>;
      break;
    case "drag":
      body = <StarBasket dropped={dropped} onDrop={onDrop} />;
      action = dropped && <button type="button" className="bix-intro-primary" onClick={next}>Next <span aria-hidden="true">→</span></button>;
      break;
    case "controls":
      body = (
        <ul className="bix-intro-controls">
          <li>
            {isNarrationSupported() ? (
              <button
                type="button"
                className="bix-intro-demo"
                onClick={() => {
                  setHeard(true);
                  speak("This button reads the question to you.");
                }}
              >
                <span aria-hidden="true">🔊</span> Read it to me
              </button>
            ) : (
              <span className="bix-intro-demo is-static"><span aria-hidden="true">🔊</span> Read it to me</span>
            )}
            <span>reads the question out loud.{heard ? " Like that!" : " Try it!"}</span>
          </li>
          <li>
            <span className="bix-intro-demo is-static"><span aria-hidden="true">📚</span> Curriculum</span>
            <span>at the top takes you back to your topics.</span>
          </li>
          <li>
            <span className="bix-intro-demo is-static"><span aria-hidden="true">💡</span> Hint</span>
            <span>Stuck? Have two tries and I'll give you a clue.</span>
          </li>
        </ul>
      );
      action = <button type="button" className="bix-intro-primary" onClick={next}>Got it! <span aria-hidden="true">👍</span></button>;
      break;
    case "warmup":
      body = (
        <>
          <div className="bix-intro-choices" role="group" aria-label="Which do you like best?">
            {FAVOURITES.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`bix-intro-choice ${picked?.id === option.id ? "is-picked" : ""}`}
                aria-pressed={picked?.id === option.id}
                disabled={picked !== null}
                onClick={() => pick(option)}
              >
                <span aria-hidden="true">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
          {badge && (
            <div className="bix-intro-badge" ref={badgeRef} role="status">
              <span className="bix-intro-badge-icon" aria-hidden="true">{badge.icon}</span>
              <span>
                <strong>New badge: {badge.name}!</strong>
                <span className="bix-intro-badge-blurb">It's in your Trophy Room.</span>
              </span>
            </div>
          )}
        </>
      );
      action = picked && <button type="button" className="bix-intro-primary" onClick={next}>Next <span aria-hidden="true">→</span></button>;
      break;
    case "done":
      action = <button type="button" className="bix-intro-primary" onClick={go}>Let's go! <span aria-hidden="true">🚀</span></button>;
      break;
    default:
      break;
  }

  return (
    <div className={`bix-intro bix-intro-step-${step}`}>
      <div className="bix-intro-card">
        <div className="bix-intro-stage">
          {/* Bix's own button cheers on a tap; the wrapper only listens, so the
              tap step can count it. Elsewhere he is decorative: the bubble speaks. */}
          <div className="bix-intro-mascot-wrap" onClick={step === "tap" ? tapBix : undefined}>
            <Mascot
              className={step === "tap" ? "bix-intro-mascot is-tappable" : "bix-intro-mascot"}
              label="Tap Bix"
              decorative={step !== "tap"}
              cheerOn={step === "tap" ? undefined : stepIndex}
            />
          </div>
          <p className="bix-intro-bubble" aria-live="polite">{line}</p>
        </div>

        <div className="bix-intro-panel">
          <h1 ref={headingRef} tabIndex={-1} className="bix-intro-heading">
            {step === "hello" ? `Hi, ${name}!` : step === "done" ? "All set!" : `Step ${stepIndex} of ${STEPS.length - 2}`}
          </h1>
          {body}
          <div className="bix-intro-actions">
            {action}
            {step !== "done" && (
              <button type="button" className="bix-intro-skip" onClick={skip}>
                Skip
              </button>
            )}
            {step === "done" && (
              <Link className="bix-intro-skip" to="/trophies" onClick={() => finish(false)}>
                See my badge <span aria-hidden="true">🏆</span>
              </Link>
            )}
          </div>
          {!muted && isNarrationSupported() && (
            <button type="button" className="bix-intro-repeat" onClick={() => speak(line)}>
              <span aria-hidden="true">🔊</span> Say it again
            </button>
          )}
        </div>
      </div>
      <ol className="bix-intro-dots" aria-hidden="true">
        {STEPS.map((id, index) => (
          <li key={id} className={index <= stepIndex ? "is-done" : ""} />
        ))}
      </ol>
    </div>
  );
}
