import { useEffect, useRef } from "react";

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/**
 * A scrolling list of years with NOTHING pre-selected — a pre-set adult year
 * would nudge a child to keep it. Keyboard: arrows, Page Up/Down, Home/End,
 * and typing digits jumps ("2" → "20" → "201" → "2013").
 */
export default function YearWheel({ years, value, onChange, onEnter, labelledBy }) {
  const listRef = useRef(null);
  const typed = useRef({ text: "", at: 0 });

  useEffect(() => {
    const list = listRef.current;
    const chosen = list?.querySelector('[aria-selected="true"]');
    if (!list || !chosen) return;
    // Scroll the list only — scrollIntoView would drag the whole page with it.
    const top = chosen.offsetTop - (list.clientHeight - chosen.offsetHeight) / 2;
    list.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [value]);

  const at = value === null || value === undefined ? -1 : years.indexOf(value);
  const pick = (index) => onChange(years[Math.max(0, Math.min(years.length - 1, index))]);

  const onKeyDown = (event) => {
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    const targets = {
      ArrowDown: at + 1,
      ArrowUp: at === -1 ? 0 : at - 1,
      PageDown: at + 5,
      PageUp: Math.max(0, at - 5),
      Home: 0,
      End: years.length - 1,
    };
    if (event.key in targets) {
      event.preventDefault();
      pick(targets[event.key]);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && at !== -1 && onEnter) {
      event.preventDefault();
      onEnter();
      return;
    }
    if (/^\d$/.test(event.key)) {
      const memory = typed.current;
      memory.text = (event.timeStamp - memory.at > 1000 ? "" : memory.text) + event.key;
      memory.at = event.timeStamp;
      const match = years.find((year) => String(year).startsWith(memory.text));
      if (match) onChange(match);
    }
  };

  return (
    <ul
      ref={listRef}
      className="sf-wheel"
      role="listbox"
      tabIndex={0}
      aria-labelledby={labelledBy}
      aria-activedescendant={at === -1 ? undefined : `sf-year-${value}`}
      onKeyDown={onKeyDown}
    >
      {years.map((year) => (
        <li
          key={year}
          id={`sf-year-${year}`}
          role="option"
          aria-selected={year === value}
          className={`sf-wheel-item ${year === value ? "is-chosen" : ""}`}
          onClick={() => onChange(year)}
        >
          {year}
        </li>
      ))}
    </ul>
  );
}
