import "./ScrollableTable.css";

/** Keep native table semantics and cell sizes inside a keyboard-scrollable viewport. */
export default function ScrollableTable({ children, label = "Scrollable table" }) {
  return <div className="scrollable-table" role="region" aria-label={label} tabIndex={0}>
    {children}
  </div>;
}
