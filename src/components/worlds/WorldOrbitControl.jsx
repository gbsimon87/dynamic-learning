import './WorldOrbitControl.css';

export default function WorldOrbitControl({ name, active = false, onEnter, onLeave, floating = false, reducedMotion = false, className = '', children }) {
  if (!name) return null;
  return <div className={`world-orbit-control${floating ? ' world-orbit-control--floating' : ''}${className ? ` ${className}` : ''}`}>
    {active && <span role="status">Orbiting {name}{reducedMotion ? ' · steady view' : ''}</span>}
    <button type="button" onClick={active ? onLeave : onEnter} aria-label={active ? `Leave orbit around ${name}` : `Orbit ${name}`}>
      <span aria-hidden="true">{active ? '↗' : '◌'}</span> {active ? 'Leave orbit' : `Orbit ${name}`}
    </button>
    {children}
  </div>;
}
