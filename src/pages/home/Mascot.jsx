import { useCallback, useEffect, useRef, useState } from "react";
import "./Mascot.css";

/**
 * Bix — the homepage character.
 *
 * Drawn entirely in CSS so there is no image asset to ship, no layout shift
 * while it loads, and so both themes can restyle it from tokens.
 *
 * Three behaviours:
 *   idle    a slow bob and a periodic blink, handled by CSS keyframes
 *   look    the pupils follow the pointer (fine pointers only — on a touch
 *           screen there is no pointer to follow, and the listener would just
 *           burn battery)
 *   react   a squash-and-stretch bounce plus an emoji burst when tapped
 *
 * All three are switched off under `prefers-reduced-motion`; the character
 * still renders and the button still works, it simply holds still.
 */

const CHEERS = ["⭐", "✨", "🎉", "💫", "🌟", "🎈"];

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

export default function Mascot({ label = "Say hello to Bix" }) {
  const rootRef = useRef(null);
  const frameRef = useRef(0);
  const burstTimer = useRef(0);

  const [burst, setBurst] = useState([]);
  const [reacting, setReacting] = useState(false);

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

  useEffect(() => () => window.clearTimeout(burstTimer.current), []);

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

  return (
    <button
      type="button"
      ref={rootRef}
      className={`mascot ${reacting ? "is-reacting" : ""}`}
      onClick={cheer}
      aria-label={label}
    >
      <span className="mascot-shadow" aria-hidden="true" />

      <span className="mascot-body" aria-hidden="true">
        <span className="mascot-antenna mascot-antenna-left" />
        <span className="mascot-antenna mascot-antenna-right" />

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
    </button>
  );
}
