import { SPACE_MATH_MODES } from '../../../data/freePlay/spaceMathActivities.js';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';

// Pieces shared by every Space Arithmetic mode: the mode tiles, the one-screen
// setup card, the icon tools and Turbo. Words stay short; Hear reads the rest.

/** Four big mode tiles: an icon and one short word each. */
export function SpaceModeTiles({ mode, onChange }) {
  return <div className="space-mode-tiles" role="group" aria-label="Maths mode">
    {SPACE_MATH_MODES.map(m => <button key={m.id} type="button" className="skill-btn space-mode-tile" aria-label={m.title} title={m.title}
      aria-pressed={mode === m.id} onClick={() => { if (mode !== m.id) onChange(m.id); }}>
      <span className="space-mode-icon" aria-hidden="true">{m.icon}</span>
      <span className="space-mode-name" aria-hidden="true">{m.short}</span>
    </button>)}
  </div>;
}

/**
 * The setup card: back, the mode's name and Hear, the mode tiles, that mode's
 * few choices, then Start fixed at the bottom. It fits the screen without scrolling.
 */
export function SpaceSetupShell({ mode, onModeChange, onBack, className = '', badge = null, onStart, children }) {
  const info = SPACE_MATH_MODES.find(m => m.id === mode) ?? SPACE_MATH_MODES[0];
  return <section className={`space-arithmetic solar-arithmetic-panel is-setup ${className}`.trim()} aria-label="Space Arithmetic">
    <header className="space-arithmetic-bar">
      <button className="skill-btn space-arithmetic-back" onClick={onBack} aria-label="Back to Solar System">←</button>
      <h1 className="space-setup-title"><span aria-hidden="true">{info.icon} </span>{info.title}</h1>
      {badge}
      <SpeakButton compact text={`${info.title}. ${info.how}`} label="Hear how to play" />
      <SpaceModeTiles mode={mode} onChange={onModeChange} />
    </header>
    <div className="space-arithmetic-setup-body">
      {children}
    </div>
    <footer className="space-arithmetic-setup-foot">
      <button className="skill-btn space-arithmetic-start" onClick={onStart}><span aria-hidden="true">🚀 </span>Start flight</button>
    </footer>
  </section>;
}

/**
 * Show me, Pause/Resume and Settings as three icon buttons (named for screen
 * readers). While help is open the 💡 button closes it, so help adds no row.
 */
export function SpaceTools({ helpRef, locked, paused, helpOpen = false, onHelp, onPause, onResume, onSettings }) {
  const icon = (label, glyph, props) => <button className="skill-btn space-tool" aria-label={label} title={label} {...props}><span aria-hidden="true">{glyph}</span></button>;
  return <div className="space-arithmetic-tools">
    {helpOpen
      ? icon('Close help', '💡', { ref: helpRef, disabled: paused, onClick: onHelp, className: 'skill-btn space-tool is-on' })
      : icon('Show me', '💡', { ref: helpRef, disabled: locked, onClick: onHelp })}
    {paused ? icon('Resume', '▶', { onClick: onResume, className: 'skill-btn space-tool is-resume' }) : icon('Pause', '⏸', { onClick: onPause })}
    {icon('Settings', '⚙️', { onClick: onSettings })}
  </div>;
}
/** Hold to fly faster: `turbo` comes from `useSpaceTurbo`. */
export function TurboButton({ turbo, disabled }) {
  return <button className={`skill-btn space-arithmetic-turbo${turbo.boosting ? ' is-on' : ''}`} aria-label="Hold Turbo to fly faster" title="Hold to fly faster · Shift" disabled={disabled} {...turbo.handlers}>
    <span aria-hidden="true">⚡</span><span className="space-turbo-word" aria-hidden="true">Turbo</span>
  </button>;
}
