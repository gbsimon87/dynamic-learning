import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { breakDue, countsTowardsBreak, IDLE_AFTER_MS, nextActivity } from "../../data/brainBreaks";
import { useBreakMinutes } from "./breakSetting";
import { useSoundMuted } from "../celebration/sound/useSoundMuted";
import { playCue } from "../celebration/sound/player";
import { speak, stopNarration } from "../../utils/speech";
import { useModalDialog } from "../ui/useModalDialog";
import "./BrainBreak.css";

/**
 * Brain breaks (data/brainBreaks.js): after a stretch of ACTIVE play — the
 * page visible and a tap or key press in the last minute — Bix offers a short
 * movement break. Mounted once in RootLayout.
 *
 *   idle    counting play time; nothing on screen
 *   offer   a small card at the bottom: "Let's move!" or "Not now". It never
 *           covers the question, so a child mid-answer can finish first.
 *   moving  a dialog with one activity to copy; "Another one!" or "I did it!"
 *   cheer   a well-done line, then back to playing
 *
 * Optional and skippable at every step. "Not now" and finishing both restart
 * the count, so the offer comes back after another full interval. Every line
 * is on screen; it is also spoken when sound is on.
 */

const TICK_MS = 5_000;

export default function BrainBreak() {
  const { pathname } = useLocation();
  const name = useContext(AuthContext)?.child?.name;
  const [minutes] = useBreakMinutes();
  const [muted] = useSoundMuted();
  const [phase, setPhase] = useState("idle");
  const [activity, setActivity] = useState(null);

  const activeRef = useRef(0);
  const lastInputRef = useRef(Date.now());
  const playing = countsTowardsBreak(pathname);

  // Remember the last tap or key press, anywhere on the page.
  useEffect(() => {
    const touched = () => {
      lastInputRef.current = Date.now();
    };
    window.addEventListener("pointerdown", touched, true);
    window.addEventListener("keydown", touched, true);
    return () => {
      window.removeEventListener("pointerdown", touched, true);
      window.removeEventListener("keydown", touched, true);
    };
  }, []);

  // Count active play only while idle, on a play page, with breaks switched on.
  useEffect(() => {
    if (phase !== "idle" || !playing || minutes === null) return undefined;
    const timer = window.setInterval(() => {
      const visible = document.visibilityState !== "hidden";
      if (visible && Date.now() - lastInputRef.current < IDLE_AFTER_MS) activeRef.current += TICK_MS;
      if (breakDue(activeRef.current, minutes)) setPhase("offer");
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [phase, playing, minutes]);

  // An offer left on screen when the child moves to a grown-up page goes away.
  useEffect(() => {
    if (!playing && phase === "offer") setPhase("idle");
  }, [playing, phase]);

  const line =
    phase === "offer"
      ? "Time for a brain break? Let's move for a minute!"
      : phase === "moving"
        ? activity?.text
        : phase === "cheer"
          ? `Brilliant moving${name ? `, ${name}` : ""}! Ready to play again?`
          : "";

  useEffect(() => {
    if (line && !muted) speak(line);
  }, [line, muted]);

  const restart = () => {
    activeRef.current = 0;
    lastInputRef.current = Date.now();
    stopNarration();
    setPhase("idle");
  };

  const start = () => {
    setActivity((last) => nextActivity(last?.id));
    setPhase("moving");
  };

  if (phase === "idle") return null;

  if (phase === "offer") {
    return (
      <aside className="brain-break-offer" aria-label="Brain break">
        <span className="brain-break-offer-icon" aria-hidden="true">🤸</span>
        <p className="brain-break-offer-text">{line}</p>
        <div className="brain-break-offer-actions">
          <button type="button" className="brain-break-primary" onClick={start}>
            Let’s move!
          </button>
          <button type="button" className="brain-break-secondary" onClick={restart}>
            Not now
          </button>
        </div>
      </aside>
    );
  }

  return (
    <BreakDialog
      phase={phase}
      activity={activity}
      line={line}
      onDone={() => {
        playCue("correct");
        setPhase("cheer");
      }}
      onAnother={() => setActivity(nextActivity(activity?.id))}
      onClose={restart}
    />
  );
}

/**
 * The break itself, on the shared modal behaviour (ui/useModalDialog): focus
 * moves in and is trapped, Escape leaves the break, focus returns after.
 */
function BreakDialog({ phase, activity, line, onDone, onAnother, onClose }) {
  const panelRef = useModalDialog(onClose);

  return (
    <div className="brain-break-backdrop">
      <div
        className="brain-break-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Brain break"
        aria-labelledby="brain-break-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <h2 id="brain-break-title" className="brain-break-eyebrow">Brain break</h2>
        {phase === "moving" && activity && (
          <>
            <span className={`brain-break-emoji move-${activity.move}`} aria-hidden="true">
              {activity.emoji}
            </span>
            <p className="brain-break-title" aria-live="polite">
              {activity.text}
            </p>
            <div className="brain-break-actions">
              <button type="button" className="brain-break-primary" onClick={onDone}>
                I did it! <span aria-hidden="true">✅</span>
              </button>
              <button type="button" className="brain-break-secondary" onClick={onAnother}>
                Another one!
              </button>
              <button type="button" className="brain-break-secondary" onClick={onClose}>
                Back to playing
              </button>
            </div>
          </>
        )}
        {phase === "cheer" && (
          <>
            <span className="brain-break-emoji move-jump" aria-hidden="true">🌟</span>
            <p className="brain-break-title" aria-live="polite">
              {line}
            </p>
            <div className="brain-break-actions">
              <button type="button" className="brain-break-primary" onClick={onClose}>
                Back to playing <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
