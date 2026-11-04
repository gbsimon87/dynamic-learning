import { useEffect, useRef, useState } from 'react';
import { stickVector } from './flightControls.js';

/**
 * The Solar System free-flight joystick and GO button, for the submarine.
 * `onStick(x, y)` takes the clamped stick vector; `onThrust(on)` follows GO.
 * Keyboard users steer from the focused viewing area instead of the joystick.
 */
export default function OceanDriveControls({ onStick, onThrust }) {
  const thumb = useRef(null), stickPointer = useRef(null), thrustPointer = useRef(null);
  const [going, setGoing] = useState(false);
  const thrust = (on) => { setGoing(on); onThrust(on); };
  const centreStick = () => {
    stickPointer.current = null;
    onStick(0, 0);
    if (thumb.current) thumb.current.style.transform = '';
  };
  const releaseRef = useRef(null);
  releaseRef.current = () => { centreStick(); thrustPointer.current = null; thrust(false); };
  useEffect(() => {
    const release = () => releaseRef.current();
    window.addEventListener('blur', release);
    document.addEventListener('visibilitychange', release);
    return () => { window.removeEventListener('blur', release); document.removeEventListener('visibilitychange', release); };
  }, []);
  const move = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = stickVector(e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2, (rect.width - 56) / 2);
    onStick(v.x, v.y);
    if (thumb.current) thumb.current.style.transform = `translate(${v.thumbX}px, ${v.thumbY}px)`;
  };
  const endStick = (e) => { if (stickPointer.current === e.pointerId) centreStick(); };
  const endThrust = (e) => {
    if (thrustPointer.current !== e.pointerId) return;
    thrustPointer.current = null;
    thrust(false);
  };
  return (
    <div className="ocean-explorer__drive">
      <div className="ocean-explorer__stick" role="group" aria-label="Joystick"
        onPointerDown={(e) => { if (stickPointer.current !== null) return; stickPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); move(e); e.preventDefault(); }}
        onPointerMove={(e) => { if (stickPointer.current === e.pointerId) move(e); }}
        onPointerUp={endStick} onPointerCancel={endStick} onLostPointerCapture={endStick}>
        <span ref={thumb} />
      </div>
      <button type="button" className={`ocean-explorer__go${going ? ' is-on' : ''}`} aria-label="Hold GO to move"
        onPointerDown={(e) => { if (thrustPointer.current !== null) return; thrustPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); thrust(true); }}
        onPointerUp={endThrust} onPointerCancel={endThrust} onLostPointerCapture={endThrust}
        onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); thrust(true); } }}
        onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') thrust(false); }}
        onBlur={() => thrust(false)}>GO!</button>
    </div>
  );
}
