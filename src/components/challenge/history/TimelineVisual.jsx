import "./history.css";
const BANDS = ["Long, long ago", "Long ago", "About 100 years ago", "When grandparents were young", "Today"];
/** Dates are labels only: no arithmetic or comparing year numbers. */
export default function TimelineVisual({ timeline }) {
  return <figure className="history-timeline">
    <figcaption>Oldest on the left → newest on the right</figcaption>
    <ol aria-label="Time bands, oldest first">
      {BANDS.map((band, index) => <li key={band} className={index === timeline.band ? "history-time-active" : undefined}>
        <span>{band}</span>
        {index === timeline.band && <strong>{timeline.label}</strong>}
      </li>)}
    </ol>
  </figure>;
}
