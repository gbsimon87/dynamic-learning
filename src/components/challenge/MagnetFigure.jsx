import { useId } from "react";
import { magnetArrangement } from "../../data/challenges/science/magnetModel.js";
import "./science-kit.css";

export default function MagnetFigure({ observation, targets = [] }) {
  const id = useId(), model = magnetArrangement(observation?.pair, observation?.tested);
  if (!model || observation.outcome !== model.outcome) return <p role="status">This magnet model is unavailable. Restart the challenge to try again.</p>;
  const { leftX, rightX, width, ends, outcome } = model;
  const locations = [leftX + 15, leftX + width - 15, rightX + 15, rightX + width - 15];
  return <figure className="science-life-figure"><svg viewBox="0 0 380 210" role="img" aria-labelledby={`${id}-title ${id}-desc`} data-outcome={outcome ?? undefined}>
    <title id={`${id}-title`}>{`${observation.label}: bar magnets and facing poles`}</title><desc id={`${id}-desc`}>{observation.text}</desc>
    <rect className="science-magnet-body" x={leftX} y="70" width={width} height="45" rx="5" /><rect className="science-magnet-body" x={rightX} y="70" width={width} height="45" rx="5" />
    {ends.map((end, i) => <g key={end.id} data-end={end.id} data-pole={end.pole}><text className="science-svg-text" x={locations[i] - 5} y="98">{end.pole}</text><text className="science-svg-text" x={locations[i] - 5} y="50">{targets.find(t => t.id === end.id)?.letter ?? ""}</text></g>)}
    <g className="science-svg-text"><text x={leftX + 5} y="140">Left magnet</text><text x={rightX + 5} y="140">Right magnet</text><text x="140" y="28">Facing ends</text></g>
    <path className="science-line" d={`M${leftX + width - 10} 35 L${leftX + width - 15} 58 M${rightX + 10} 35 L${rightX + 15} 58`} />
    {outcome && <><path className="science-line" d={outcome === "attract" ? "M85 164 H130 L122 158 M130 164 L122 170 M295 164 H250 L258 158 M250 164 L258 170" : "M130 164 H85 L93 158 M85 164 L93 170 M250 164 H295 L287 158 M295 164 L287 170"} /><text className="science-svg-text" x="100" y="199">{outcome === "attract" ? "Attract: pull together" : "Repel: push apart"}</text></>}
  </svg><figcaption>{observation.text}</figcaption>
    {targets.length > 0 && <ul>{targets.map(t => <li key={t.id}><strong>{t.letter}</strong>: {t.text}.</li>)}</ul>}
  </figure>;
}
