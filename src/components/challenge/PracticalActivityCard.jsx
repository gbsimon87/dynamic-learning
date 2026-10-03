import "./science-kit.css";

export default function PracticalActivityCard({ activity }) {
  if (!activity) return null;
  return <details className="science-practical">
    <summary>Try with a grown-up (optional)</summary>
    <p><strong>{activity.title}</strong></p>
    <ol>{activity.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    <p>{activity.note}</p>
  </details>;
}
