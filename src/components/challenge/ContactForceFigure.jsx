import { useId } from "react";
import "./science-kit.css";

export default function ContactForceFigure({ observation, targets = [] }) {
  const id = useId(), { scene, gap, touching, effect } = observation;
  if (!scene || !Number.isFinite(gap) || gap < 0 || gap > 60 || touching !== (gap === 0)) return <p role="status">This contact model is unavailable. Restart the challenge to try again.</p>;
  const leftEnd = 150, rightStart = leftEnd + gap;
  const letter = role => targets.find(t => t.id === role)?.letter ?? "";
  return <figure className="science-life-figure"><svg viewBox="0 0 380 200" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${observation.label}: touching or gap evidence`}</title><desc id={`${id}-desc`}>{observation.text}</desc>
    <rect className="science-force-giver" x="55" y="65" width="95" height="50" rx="6" /><rect className="science-force-receiver" x={rightStart} y="65" width="100" height="50" rx="6" />
    {scene.kind === "magnetic" && <text className="science-svg-text" x="65" y="95">Magnet</text>}
    <path className="science-line" d={`M${leftEnd} 125 V140 H${rightStart} V125`} />
    <g className="science-svg-text"><text x="80" y="45">{letter("giver")}</text><text x={rightStart + 45} y="45">{letter("receiver")}</text><text x={leftEnd + gap / 2 - 4} y="163">{letter("space")}</text><text x="20" y="190">{effect ? touching ? "Effect observed: bodies touch" : "Magnetic effect: gap remains" : "Before: no noticeable effect recorded"}</text></g>
  </svg><figcaption>{observation.text} This labelled schematic shows the two bodies as boxes; it is not a shape or distance measurement.</figcaption>
    {targets.length > 0 && <ul>{targets.map(t => <li key={t.id}><strong>{t.letter}</strong>: {t.text}.</li>)}</ul>}
  </figure>;
}
