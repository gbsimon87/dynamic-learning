import './SolarOrbitControl.css';

export default function SolarOrbitControl({ name, active = false, onEnter, onLeave, floating = false, reducedMotion = false, children }) {
  if (!name) return null;
  return <div className={`solar-orbit-control${floating ? ' solar-orbit-control--floating' : ''}`}>
    {active && <span role="status">Orbiting {name}{reducedMotion ? ' · steady view' : ''}</span>}
    <button type="button" onClick={active ? onLeave : onEnter} aria-label={active ? `Leave orbit around ${name}` : `Orbit ${name}`}>
      <span aria-hidden="true">{active ? '↗' : '◌'}</span> {active ? 'Leave orbit' : `Orbit ${name}`}
    </button>
    {children}
  </div>;
}
