import { useEffect, useRef } from 'react';
import './Beyond.css';

const HOLD_KEYS = new Set(['Space', 'ShiftLeft', 'ShiftRight']);

/**
 * Hold to power the engine through the warp (#113, owner). Letting go never
 * fails the ride: it drifts on slowly (beyondWarpTimeline.js). Space or Shift
 * hold it on a keyboard, as they fly and boost the rocket. Losing the pointer,
 * the window's focus or the page's visibility lets go, so the engine never
 * stays on with no finger down.
 */
export default function BeyondWarpControls({ progress, calm, onHoldChange }) {
  const keys = useRef(new Set());
  const pointer = useRef(null);
  const report = useRef(onHoldChange);
  const holdButton = useRef(null);
  report.current = onHoldChange;

  // The picker that opened the warp has gone; keep keyboard focus on the page.
  useEffect(() => { holdButton.current?.focus(); }, []);

  useEffect(() => {
    const send = () => report.current(keys.current.size > 0 || pointer.current !== null);
    const letGo = () => { keys.current.clear(); pointer.current = null; report.current(false); };
    const down = (event) => {
      if (!HOLD_KEYS.has(event.code)) return;
      event.preventDefault();
      if (event.repeat) return;
      keys.current.add(event.code);
      send();
    };
    const up = (event) => {
      if (!HOLD_KEYS.has(event.code)) return;
      keys.current.delete(event.code);
      send();
    };
    const visibility = () => { if (document.visibilityState === 'hidden') letGo(); };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', letGo);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', letGo);
      document.removeEventListener('visibilitychange', visibility);
      report.current(false);
    };
  }, []);

  const release = (event) => {
    if (pointer.current !== event.pointerId) return;
    pointer.current = null;
    report.current(keys.current.size > 0);
  };
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

  return <div className="beyond-warp" role="group" aria-label="Warp to Beyond">
    <div className="beyond-warp__bar" role="progressbar" aria-label="Warp progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <span style={{ width: `${percent}%` }} />
    </div>
    {calm && <p className="beyond-warp__hint">Hold to fill the bar — we'll get there gently.</p>}
    <button ref={holdButton} type="button" className="beyond-warp__hold" aria-label="Hold to power the engine"
      onPointerDown={(event) => {
        if (pointer.current !== null) return;
        pointer.current = event.pointerId;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.preventDefault();
        report.current(true);
      }}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}
      onContextMenu={(event) => event.preventDefault()}>
      <span aria-hidden="true">🚀</span> Hold to fly
      <span className="beyond-warp__key">Hold Space</span>
    </button>
  </div>;
}
