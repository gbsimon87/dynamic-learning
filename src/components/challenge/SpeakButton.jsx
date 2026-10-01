import { useEffect, useRef, useState } from "react";
import { useSoundMuted } from "../celebration/sound/useSoundMuted";
import { isNarrationSupported, speakAndWait, stopNarration } from "../../utils/speech.js";
import "./english-kit.css";

/**
 * 🔊 Tap to hear `text` read in the app's British voice.
 *
 * Nothing ever plays on its own: reading is the skill being practised, so a
 * prompt is only spoken when a child asks for it.
 *
 * It follows the app-wide sound switch (the navbar 🔊). While muted the button
 * says so, and tapping it turns sound back on and then speaks, because a child
 * who taps "hear it" wants to hear it. Muting while it speaks stops it.
 *
 * On a device with no speech voice it renders nothing, so a challenge must
 * never depend on it alone (see `isNarrationSupported`).
 */
function SpeakButton({ text, label = "Hear it", compact = false }) {
  const [muted, toggleMuted] = useSoundMuted();
  const [speaking, setSpeaking] = useState(false);
  const requestRef = useRef(0);

  // Leaving the question, or muting, stops the voice mid-sentence.
  useEffect(() => {
    setSpeaking(false);
    return () => {
      requestRef.current += 1;
      stopNarration();
    };
  }, [text]);
  useEffect(() => {
    if (muted) stopNarration();
  }, [muted]);

  if (!isNarrationSupported()) return null;

  const handleClick = async () => {
    if (muted) toggleMuted();
    const request = ++requestRef.current;
    setSpeaking(true);
    await speakAndWait(text);
    if (request === requestRef.current) setSpeaking(false);
  };

  const shown = muted ? `${label} (turns sound on)` : label;

  return (
    <button
      type="button"
      className={`speak-btn ${compact ? "is-compact" : ""} ${speaking ? "is-speaking" : ""}`}
      onClick={handleClick}
      aria-label={shown}
      title={shown}
    >
      <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
      {!compact && <span>{label}</span>}
    </button>
  );
}

export default SpeakButton;
