import { useEffect, useRef, useState } from "react";
import { useRewards } from "../../hooks/useRewards";
import { tipPending } from "../../data/intro";
import "./CoachMark.css";

/**
 * A first-visit tip from Bix ("Your stickers live here!"), shown ONCE per
 * child: it is recorded in the rewards document's `tips` the moment it
 * appears (data/intro.js), and stays on screen until "Got it" or the child
 * moves on. Shows nothing before a good rewards read, so a failed read never
 * nags.
 */
export default function CoachMark({ id, children }) {
  const { hydrated, rewards, markTip } = useRewards();
  const [visible, setVisible] = useState(false);
  const decidedRef = useRef(false);

  useEffect(() => {
    if (!hydrated || decidedRef.current) return;
    decidedRef.current = true;
    if (tipPending(rewards, id)) {
      setVisible(true);
      markTip(id);
    }
  }, [hydrated, rewards, id, markTip]);

  if (!visible) return null;

  return (
    <aside className="coach-mark" role="note" aria-label="Tip from Bix">
      <span className="coach-mark-bix" aria-hidden="true">💬</span>
      <p className="coach-mark-text">{children}</p>
      <button type="button" className="coach-mark-close" onClick={() => setVisible(false)}>
        Got it
      </button>
    </aside>
  );
}
