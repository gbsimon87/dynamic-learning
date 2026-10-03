import { useId } from "react";
import "./science-kit.css";

/** Supplied stopped positions. One coordinate scale (0–60 cm) for every sample. */
export default function SurfaceTravelFigure({ observation }) {
  const id = useId();
  if (!observation?.samples?.length || observation.samples.some(s => !Number.isFinite(s.distance) || s.distance < 0 || s.distance > 60)) return <p role="status">These surface observations are unavailable. Restart the challenge to try again.</p>;
  return <figure className="science-life-figure"><svg viewBox={`0 0 380 ${observation.samples.length * 115 + 35}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${observation.label}: supplied travel distances`}</title><desc id={`${id}-desc`}>{observation.text}</desc>
    {observation.samples.map((s, i) => {
      const y = 40 + i * 115, x = 35 + s.distance * 5;
      return <g key={s.id}><g className="science-svg-text"><text x="25" y={y - 20}>{`Sample ${s.id}: ${s.label}`}</text></g><path className="science-line" d={`M35 ${y + 28} H335`} /><g className="science-surface-travel" data-sample={s.id} data-distance={s.distance} transform={`translate(${x},${y})`}><rect x="-13" y="2" width="26" height="16" rx="3" /><circle cx="-8" cy="23" r="5" /><circle cx="8" cy="23" r="5" /></g>
        {[0, 20, 40, 60].map(mark => <g key={mark} className="science-svg-text"><path className="science-line" d={`M${35 + mark * 5} ${y + 30} V${y + 35}`} /><text x={28 + mark * 5} y={y + 54}>{mark}</text></g>)}<text className="science-svg-text" x="25" y={y + 79}>{`Start: 0 cm; stopped position: ${s.distance} cm`}</text></g>;
    })}
  </svg><figcaption>{observation.text}</figcaption></figure>;
}
