import { useEffect, useRef, useState } from 'react';

export const isTypingTarget = target => target?.closest?.('input, textarea, select, [contenteditable="true"]');
/** Resume only when the page really has focus again (never by itself). */
export const resumeWhenFocused = resume => () => { if (!document.hidden && document.hasFocus()) resume(); };

/**
 * Hold Shift or the Turbo button: whatever is flying in closes in three times
 * faster. Letting go, any lock (pause, help, setup) or leaving the window stops it.
 */
export function useSpaceTurbo({ flying, locked, flightApi }) {
  const [turbo, setTurbo] = useState(false);
  const pointer = useRef(null);
  useEffect(() => {
    if (!flying) return undefined;
    const down = e => { if (e.key === 'Shift' && !isTypingTarget(e.target)) setTurbo(true); };
    const up = e => { if (e.key === 'Shift') setTurbo(false); };
    const off = () => setTurbo(false);
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', off);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', off); off(); };
  }, [flying]);
  // A held button misses its pointerup once disabled: drop Turbo whenever input locks.
  useEffect(() => { if (locked) { pointer.current = null; setTurbo(false); } }, [locked]);
  const boosting = flying && turbo && !locked;
  useEffect(() => { flightApi?.setTurbo?.(boosting); }, [boosting, flightApi]);
  const handlers = {
    onPointerDown: e => { if (pointer.current !== null) return; pointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); setTurbo(true); },
    onPointerUp: e => { if (pointer.current === e.pointerId) { pointer.current = null; setTurbo(false); } },
    onPointerCancel: () => { pointer.current = null; setTurbo(false); },
  };
  return { boosting, handlers };
}
