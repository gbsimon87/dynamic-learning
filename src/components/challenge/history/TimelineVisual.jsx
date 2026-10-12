import "./history.css";
const BANDS = ["Long, long ago", "Long ago", "About 100 years ago", "When grandparents were young", "Today"];
/** Dates are labels only: no arithmetic or comparing year numbers. */
export default function TimelineVisual({ timeline }) {
  return <figure className={`history-timeline${timeline.bands ? " history-timeline-periods" : ""}`}>
    <figcaption>Oldest on the left → newest on the right</figcaption>
    {timeline.bands && <p className="history-timeline-help">Scroll along to see all the periods.</p>}
    <ol aria-label="Time bands, oldest first" tabIndex={0}>
      {(timeline.bands ?? BANDS).map((band, index) => <li key={band} className={`history-time-band history-time-band-${index}${index === timeline.band ? " history-time-active" : ""}`}>
        <span>{band}</span>
        {index === timeline.band && <strong>{timeline.label}</strong>}
      </li>)}
    </ol>
  </figure>;
}
