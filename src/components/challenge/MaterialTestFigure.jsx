import { useId } from "react";
import "./science-kit.css";

export default function MaterialTestFigure({ observation }) {
  const id = useId(), sample = observation?.sample;
  if (!sample || typeof sample.attracted !== "boolean") return <p role="status">This sample observation is unavailable. Restart the challenge to try again.</p>;
  const finalX = sample.attracted ? 185 : 260;
  return <figure className="science-life-figure"><svg viewBox="0 0 380 200" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${observation.label}: supplied magnet test`}</title><desc id={`${id}-desc`}>{observation.text}</desc>
    <rect className="science-force-giver" x="45" y="65" width="100" height="50" rx="5" /><text className="science-svg-text" x="57" y="96">Magnet</text>
    <rect className="science-material-start" x="245" y="65" width="30" height="50" /><rect className="science-force-receiver" data-sample={sample.id} data-attracted={String(sample.attracted)} x={finalX - 15} y="65" width="30" height="50" />
    {sample.attracted && <path className="science-line" d="M245 136 H190 L200 130 M190 136 L200 142" />}
    <g className="science-svg-text"><text x="235" y="40">Start</text><text x={finalX - 20} y="170">Final</text></g>
  </svg><figcaption>{observation.text} Outlines represent prepared material pieces, not the original object's shape. The dashed outline marks the starting position; the solid outline marks the recorded final position. This drawing does not measure strength.</figcaption></figure>;
}
