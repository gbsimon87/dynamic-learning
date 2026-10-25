import { useEffect } from 'react';
import './SolarCameraChoices.css';

const VIEWS = [
  { id: 'behind', label: 'Behind rocket', icon: '🚀' },
  { id: 'cockpit', label: 'Cockpit', icon: '🪟' },
];

export default function SolarCameraChoices({ value = 'behind', onChange, className = '', compact = false }) {
  useEffect(() => {
    const toggleCamera = event => {
      if ((event.code !== 'KeyC' && event.key.toLowerCase() !== 'c') || event.repeat || event.isComposing || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return;
      event.preventDefault();
      onChange?.(value === 'behind' ? 'cockpit' : 'behind');
    };
    window.addEventListener('keydown', toggleCamera, true);
    return () => window.removeEventListener('keydown', toggleCamera, true);
  }, [value, onChange]);

  const choices = compact ? VIEWS.filter(view => view.id !== value) : VIEWS;
  return <div className={`solar-camera-choices ${compact ? 'solar-camera-choices--compact' : ''} ${className}`} role="group" aria-label="Camera view">
    {choices.map(view => <button
      key={view.id}
      type="button"
      aria-pressed={compact ? undefined : value === view.id}
      aria-label={compact ? `Switch to ${view.label} camera` : undefined}
      title={`Switch to ${view.label} camera · C`}
      onClick={() => onChange?.(view.id)}
    ><span aria-hidden="true">{view.icon}</span>{!compact && <> {view.label}</>}</button>)}
  </div>;
}
