import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { stickVector } from './flightControls.js';
import './SolarFlightControls.css';

// The same joystick, GO and Turbo controls in the explorer and practice areas.
export default function SolarRocketControls({ api, disabled = false, boosting = false, focusRef, ref }) {
  const thumb = useRef(null), stickPointer = useRef(null), thrustPointer = useRef(null), boostPointer = useRef(null);
  const [burning, setBurning] = useState(false);
  const release = () => {
    api?.brake(); setBurning(false);
    stickPointer.current = thrustPointer.current = boostPointer.current = null;
    if (thumb.current) thumb.current.style.transform = '';
  };
  useImperativeHandle(ref, () => ({ release }));
  useEffect(() => {
    const reset = () => { api?.brake(); setBurning(false); stickPointer.current = thrustPointer.current = boostPointer.current = null; if (thumb.current) thumb.current.style.transform = ''; };
    window.addEventListener('blur', reset); document.addEventListener('visibilitychange', reset);
    return () => { window.removeEventListener('blur', reset); document.removeEventListener('visibilitychange', reset); api?.brake(); };
  }, [api]);
  useEffect(() => {
    if (disabled) { api?.brake(); setBurning(false); stickPointer.current = thrustPointer.current = boostPointer.current = null; if (thumb.current) thumb.current.style.transform = ''; }
  }, [disabled, api]);
  const move = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = stickVector(e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2, (rect.width - 56) / 2);
    api?.setStick(v.x, v.y);
    if (thumb.current) thumb.current.style.transform = `translate(${v.thumbX}px, ${v.thumbY}px)`;
  };
  const endStick = e => {
    if (stickPointer.current !== e.pointerId) return;
    stickPointer.current = null; api?.setStick(0, 0);
    if (thumb.current) thumb.current.style.transform = '';
  };
  const endThrust = e => {
    if (thrustPointer.current !== e.pointerId) return;
    thrustPointer.current = null; api?.setThrust(false); setBurning(false);
  };
  return (
    <div className="solar-flight__touch-controls">
      <div className="solar-flight__stick" role="group" aria-label="Joystick" aria-disabled={disabled}
        onPointerDown={e => { if (disabled || stickPointer.current !== null) return; stickPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); move(e); e.preventDefault(); focusRef?.current?.focus(); }}
        onPointerMove={e => { if (!disabled && stickPointer.current === e.pointerId) move(e); }}
        onPointerUp={endStick} onPointerCancel={endStick} onLostPointerCapture={endStick}>
        <span ref={thumb} />
      </div>
      <button className={`solar-flight__go${burning && !disabled ? ' is-on' : ''}`} aria-label="Thrust" disabled={disabled}
        onPointerDown={e => { if (thrustPointer.current !== null) return; thrustPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); focusRef?.current?.focus(); api?.setThrust(true); setBurning(true); }}
        onPointerUp={endThrust} onPointerCancel={endThrust} onLostPointerCapture={endThrust}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); api?.setThrust(true); setBurning(true); } }}
        onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') { api?.setThrust(false); setBurning(false); } }}
        onBlur={() => { api?.setThrust(false); setBurning(false); }}>GO!</button>
      <button className={`solar-flight__turbo${boosting ? ' is-on' : ''}`} aria-label="Hold Turbo to boost" title="Hold to boost · Shift" disabled={disabled}
        onPointerDown={e => { if (boostPointer.current !== null) return; boostPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); focusRef?.current?.focus(); api?.setBoost(true); }}
        onPointerUp={e => { if (boostPointer.current === e.pointerId) { boostPointer.current = null; api?.setBoost(false); } }}
        onPointerCancel={() => { boostPointer.current = null; api?.setBoost(false); }}
        onLostPointerCapture={() => { boostPointer.current = null; api?.setBoost(false); }}
        onKeyDown={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) { e.preventDefault(); api?.setBoost(true); } }}
        onKeyUp={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) api?.setBoost(false); }}
        onBlur={() => api?.setBoost(false)}>⚡ Turbo</button>
    </div>
  );
}
