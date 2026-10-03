import "./science-kit.css";

/** Authored/adapted information with visible attribution. No HTML or external assets. */
export default function ScienceInformationCard({ title = "Information card", text, sourceLabel }) {
  return <section className="science-observation"><h4>{title}</h4><p>{text}</p>{sourceLabel && <p><small>Source: {sourceLabel}</small></p>}</section>;
}
