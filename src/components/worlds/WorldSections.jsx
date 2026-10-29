import { createContext, useContext, useId, useState } from 'react';
import './WorldSections.css';

const SectionsContext = createContext(null);

/** Compact, exclusive sections. Closed content unmounts its speech/canvas timers. */
export default function WorldSections({ children, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);
  return <SectionsContext.Provider value={{ open, setOpen }}><div className="world-sections">{children}</div></SectionsContext.Provider>;
}

export function WorldSection({ section, title, children }) {
  const { open, setOpen } = useContext(SectionsContext);
  const id = useId();
  const expanded = open === section;
  return <section className="world-section">
    <button type="button" className="world-section__toggle" aria-expanded={expanded} aria-controls={id}
      onClick={() => setOpen(expanded ? null : section)}>
      <span>{title}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span>
    </button>
    {expanded && <div className="world-section__content" id={id}>{children}</div>}
  </section>;
}
