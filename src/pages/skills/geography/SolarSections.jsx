import { createContext, useContext, useId, useState } from 'react';
import './SolarSections.css';

const SectionsContext = createContext(null);

/** Compact, exclusive sections. Closed content unmounts its speech/canvas timers. */
export default function SolarSections({ children, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);
  return <SectionsContext.Provider value={{ open, setOpen }}><div className="solar-sections">{children}</div></SectionsContext.Provider>;
}

export function SolarSection({ section, title, children }) {
  const { open, setOpen } = useContext(SectionsContext);
  const id = useId();
  const expanded = open === section;
  return <section className="solar-section">
    <button type="button" className="solar-section__toggle" aria-expanded={expanded} aria-controls={id}
      onClick={() => setOpen(expanded ? null : section)}>
      <span>{title}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span>
    </button>
    {expanded && <div className="solar-section__content" id={id}>{children}</div>}
  </section>;
}
