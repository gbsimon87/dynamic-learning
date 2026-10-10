import { useCallback, useEffect, useRef, useState } from "react";
import JokeBubble from "./JokeBubble";
import { jokeAnnouncement, useBixJoke } from "./useBixJoke";
import "./Mascot.css";

/**
 * Bix — the app's character: the homepage hero, the Trophy Room, and the
 * "3 in a row" combo in every challenge.
 *
 * Drawn entirely in CSS so there is no image asset to ship, no layout shift
 * while it loads, and so both themes can restyle it from tokens.
 *
 * Behaviours:
 *   idle    a slow bob and a periodic blink, handled by CSS keyframes
 *   look    the pupils follow the pointer (fine pointers only — on a touch
 *           screen there is no pointer to follow, and the listener would just
 *           burn battery)
 *   react   a squash-and-stretch bounce plus an emoji burst when tapped
 *   secrets five quick taps (non-decorative Bix only) and he sneezes, then
 *           wobbles, then changes hat — in that order, every time. Each shows
 *           a line of text and is announced; no sound is needed. The hat is
 *           kept in memory only, so it is gone after a reload.
 *   jokes   with `jokes` set, a "Tell me a joke" button beside him, and a long
 *           press on Bix himself, tell a joke from `data/bixJokes.js` in a
 *           speech bubble — read aloud only while the app's sound is on
 *
 * Movement is switched off under `prefers-reduced-motion`; the character
 * still renders, the button still works and secrets still show their text and
 * hat, he simply holds still.
 *
 * Props, for use beyond the homepage:
 *   className   sizing from the caller (e.g. "mascot-small")
 *   cheerOn     any value; Bix cheers on his own when he appears with it set,
 *               and again whenever it changes — how the combo line makes him
 *               react without a tap
 *   mood        "idle" (default) or "puzzled" — a head tilt for a wrong answer
 *   decorative  renders him hidden from assistive technology and out of the
 *               tab order, for places where the words already say it all (no
 *               secrets, no jokes)
 *   jokes       opt in to the joke button, the long press and the bubble
 */

const CHEERS = ["⭐", "✨", "🎉", "💫", "🌟", "🎈"];

const LONG_PRESS_MS = 550;
const SECRET_TAPS = 5;
const SECRET_WINDOW_MS = 2500;
const SECRET_SHOWN_MS = 3200;

const SECRETS = ["sneeze", "wobble", "hat"];
/** The hat secret steps through these; `null` is bare-headed again. */
const HATS = [
  { emoji: "🎩", line: "Top hat on!", said: "Bix puts on a top hat." },
  { emoji: "👑", line: "A crown! How royal!", said: "Bix puts on a crown." },
  { emoji: "🧢", line: "Cap on!", said: "Bix puts on a cap." },
  { emoji: "🎓", line: "Graduation hat!", said: "Bix puts on a graduation hat." },
  { emoji: null, line: "Hats off!", said: "Bix takes his hat off." },
];

// Module memory, so the hat and the next secret survive moving between pages
// but never a reload — they are play, not progress, and are never stored.
let secretTurn = 0;
let hatTurn = -1;

/** One burst = six emoji fired along evenly spaced angles. */
function makeBurst() {
  const id = Date.now();
  return CHEERS.map((emoji, index) => ({
    key: `${id}-${index}`,
    emoji,
    angle: (index / CHEERS.length) * 360 + Math.random() * 20 - 10,
    distance: 70 + Math.random() * 50,
  }));
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function nextSecret() {
  const kind = SECRETS[secretTurn % SECRETS.length];
  secretTurn += 1;

  if (kind === "sneeze") {
    return { kind, line: "Ah… ah… ACHOO!", icon: "🤧", said: "Ah… ah… ACHOO! Bix sneezed." };
  }
  if (kind === "wobble") {
    return { kind, line: "Wibble, wobble!", icon: "🌀", said: "Wibble, wobble! Bix wobbles." };
  }
  hatTurn = (hatTurn + 1) % HATS.length;
  const hat = HATS[hatTurn];
  return { kind, line: hat.line, icon: hat.emoji ?? "👋", said: hat.said, hat: hatTurn };
}

export default function Mascot({
  label = "Say hello to Bix",
  className = "",
  cheerOn,
  decorative = false,
  mood = "idle",
  jokes = false,
}) {
  const rootRef = useRef(null);
  const frameRef = useRef(0);
  const burstTimer = useRef(0);
  const secretTimer = useRef(0);
  const pressTimer = useRef(0);
  const longPressed = useRef(false);
  const tapsRef = useRef([]);
  const jokeButtonRef = useRef(null);
  const jokeActionRef = useRef(null);
  const focusActionRef = useRef(false);

  const [burst, setBurst] = useState([]);
  const [reacting, setReacting] = useState(false);
  const [secret, setSecret] = useState(null);
  const [hatIndex, setHatIndex] = useState(() => hatTurn);

  const telling = jokes && !decorative;
  const { joke, revealed, tell, reveal, close } = useBixJoke();
  const hat = decorative ? null : HATS[hatIndex]?.emoji ?? null;

  // Pupils follow the pointer. Written straight to CSS custom properties rather
  // than through state so a mousemove never re-renders the tree.
  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? false;
    if (!fine || prefersReducedMotion()) return undefined;

    const onMove = (event) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const node = rootRef.current;
        if (!node) return;

        const box = node.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Clamp to the eye's travel, so the pupils never leave the white.
        const reach = Math.min(distance, 220) / 220;

        node.style.setProperty("--pupil-x", `${(dx / distance) * reach * 26}%`);
        node.style.setProperty("--pupil-y", `${(dy / distance) * reach * 26}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => () => {
    window.clearTimeout(burstTimer.current);
    window.clearTimeout(secretTimer.current);
    window.clearTimeout(pressTimer.current);
  }, []);

  const cheer = useCallback(() => {
    if (prefersReducedMotion()) return;

    setReacting(true);
    setBurst(makeBurst());

    window.clearTimeout(burstTimer.current);
    burstTimer.current = window.setTimeout(() => {
      setReacting(false);
      setBurst([]);
    }, 1000);
  }, []);

  // With `cheerOn` set, Bix cheers as he appears and again each time it
  // changes. Without it (the homepage) he waits to be tapped.
  useEffect(() => {
    if (cheerOn !== undefined) cheer();
  }, [cheerOn, cheer]);

  const playSecret = () => {
    const next = nextSecret();
    if (next.hat !== undefined) setHatIndex(next.hat);
    // The bounce is the secret's turn; a squash on top would fight it.
    window.clearTimeout(burstTimer.current);
    setReacting(false);
    setBurst([]);
    setSecret({ ...next, key: Date.now() });
    window.clearTimeout(secretTimer.current);
    secretTimer.current = window.setTimeout(() => setSecret(null), SECRET_SHOWN_MS);
  };

  const handleTap = () => {
    if (longPressed.current) {
      // The press already told a joke; its release is not also a tap.
      longPressed.current = false;
      return;
    }
    if (decorative) {
      cheer();
      return;
    }
    const now = Date.now();
    const taps = [...tapsRef.current.filter((at) => now - at < SECRET_WINDOW_MS), now];
    if (taps.length >= SECRET_TAPS) {
      tapsRef.current = [];
      playSecret();
      return;
    }
    tapsRef.current = taps;
    cheer();
  };

  // ===== JOKES =====
  const startJoke = useCallback(() => {
    focusActionRef.current = true;
    tell();
  }, [tell]);

  const endJoke = useCallback(() => {
    close();
    // Back to the button that opened it, unless focus has gone elsewhere.
    const active = document.activeElement;
    if (!active || active === document.body || active.closest?.(".mascot-joke-bubble")) {
      jokeButtonRef.current?.focus();
    }
  }, [close]);

  // A new joke puts focus on its "Tell me!" button, so a keyboard user can
  // carry straight on. Runs after the bubble has rendered.
  useEffect(() => {
    if (joke && focusActionRef.current) {
      focusActionRef.current = false;
      jokeActionRef.current?.focus();
    }
  }, [joke]);

  // Escape closes the bubble wherever focus is.
  useEffect(() => {
    if (!joke) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") endJoke();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [joke, endJoke]);

  const cancelPress = () => window.clearTimeout(pressTimer.current);
  const pressHandlers = telling
    ? {
        onPointerDown: (event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          longPressed.current = false;
          cancelPress();
          pressTimer.current = window.setTimeout(() => {
            longPressed.current = true;
            startJoke();
          }, LONG_PRESS_MS);
        },
        onPointerUp: cancelPress,
        onPointerLeave: cancelPress,
        onPointerCancel: cancelPress,
        // A held finger would otherwise open the browser's own menu.
        onContextMenu: (event) => event.preventDefault(),
      }
    : {};

  const announcement = joke ? jokeAnnouncement(joke, revealed) : secret?.said ?? "";

  const bix = (
    <button
      type="button"
      ref={rootRef}
      className={[
        "mascot",
        className,
        `is-${mood}`,
        reacting ? "is-reacting" : "",
        secret ? `is-${secret.kind}` : "",
        hat ? "has-hat" : "",
      ].filter(Boolean).join(" ")}
      onClick={handleTap}
      {...pressHandlers}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <span className="mascot-shadow" aria-hidden="true" />

      <span className="mascot-body" aria-hidden="true">
        <span className="mascot-antenna mascot-antenna-left" />
        <span className="mascot-antenna mascot-antenna-right" />
        {hat && <span key={hat} className="mascot-hat">{hat}</span>}

        <span className="mascot-face">
          <span className="mascot-eye">
            <span className="mascot-pupil" />
          </span>
          <span className="mascot-eye">
            <span className="mascot-pupil" />
          </span>
        </span>

        <span className="mascot-cheek mascot-cheek-left" />
        <span className="mascot-cheek mascot-cheek-right" />
        <span className="mascot-mouth" />
      </span>

      <span className="mascot-burst" aria-hidden="true">
        {burst.map((piece) => (
          <span
            key={piece.key}
            style={{
              "--burst-angle": `${piece.angle}deg`,
              "--burst-distance": `${piece.distance}px`,
            }}
          >
            {piece.emoji}
          </span>
        ))}
      </span>

      {secret && (
        <span key={secret.key} className="mascot-secret" aria-hidden="true">
          {secret.line} <span>{secret.icon}</span>
        </span>
      )}
    </button>
  );

  // Decorative Bix says nothing, so needs no live region.
  if (decorative) return bix;

  const announcer = (
    <span className="sr-only" aria-live="polite">
      {announcement}
    </span>
  );

  if (!telling) {
    return (
      <>
        {bix}
        {announcer}
      </>
    );
  }

  return (
    <div className="mascot-joker">
      <div className="mascot-joker-figure">
        {bix}
        <button
          type="button"
          ref={jokeButtonRef}
          className="mascot-joke-button"
          onClick={startJoke}
        >
          <span aria-hidden="true">😄</span> Tell me a joke
        </button>
      </div>

      {joke && (
        <JokeBubble
          joke={joke}
          revealed={revealed}
          onReveal={reveal}
          onAnother={tell}
          onClose={endJoke}
          actionRef={jokeActionRef}
        />
      )}

      {announcer}
    </div>
  );
}
