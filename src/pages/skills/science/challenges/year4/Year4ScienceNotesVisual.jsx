import { YEAR4_SCIENCE_CONCEPTS } from "../../../../../data/lessons/science/year4";
import "./Year4ScienceNotesVisual.css";

export default function Year4ScienceNotesVisual({ topicId }) {
  const concept = YEAR4_SCIENCE_CONCEPTS[topicId];
  if (!concept) return null;
  return <figure className="y4-science-concept" aria-label={concept.title}>
    <figcaption>{concept.title}</figcaption>
    <ol className={concept.flow ? "is-flow" : ""}>
      {concept.cards.map(([icon, label, text]) => <li key={label}>
        <span className="y4-concept-icon" aria-hidden="true">{icon}</span>
        <strong>{label}</strong><span>{text}</span>
      </li>)}
    </ol>
    <p>{concept.note}</p>
  </figure>;
}
