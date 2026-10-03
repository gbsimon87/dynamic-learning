import { useId } from "react";
import { reflectionPath } from "../../data/challenges/science/reflectedLight.js";
import "./science-kit.css";

/** One selected source → surface → eye path. It does not depict an image or all scattered rays. */
export default function ReflectionFigure({ observation, targets }) {
  const id = useId(), geometry = reflectionPath();
  const letter = role => targets.find(t => t.id === role)?.letter ?? "";
  return <figure className="science-life-figure"><svg viewBox="0 0 360 225" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${observation.label}: selected reflection path`}</title>
    <desc id={`${id}-desc`}>{targets.map(t => `${t.letter}: ${t.text}`).join(". ")}. Arrows go from the lamp to the surface, then from the surface to the eye. This drawing shows no reflected image.</desc>
    <defs><marker id={`${id}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth"><path className="science-reflection-arrow" d="M0 0 L7 3.5 L0 7 Z" /></marker></defs>
    <g className="science-line"><rect x="38" y="132" width="32" height="36" rx="5" /><path d="M45 168 V180 H63 M70 140 L77 134 M70 156 L77 162" /></g>
    <rect className="science-seed-case" x="125" y="67" width="110" height="13" rx="3" />
    {!observation.surface.clear && <path className="science-line" d="M130 70 L143 75 L153 70 M205 70 L213 75 L225 70" />}
    <g className="science-line"><path d="M278 150 Q291 134 309 150 Q291 166 278 150 Z" /><circle cx="290" cy="150" r="5" /></g>
    <path className="science-reflection-ray" data-ray="source-to-surface" d={geometry.incoming} markerEnd={`url(#${id}-arrow)`} />
    <path className="science-reflection-ray" data-ray="surface-to-eye" d={geometry.outgoing} markerEnd={`url(#${id}-arrow)`} />
    <g className="science-svg-text"><text x="40" y="207">{letter("source")}</text><text x="175" y="45">{letter("surface")}</text><text x="290" y="207">{letter("eye")}</text></g>
  </svg><figcaption>{observation.text} This schematic shows one selected source → surface → eye path, not all the light or a reflected image. Image clarity comes from the supplied observation notes, not this path drawing.</figcaption>
    <ul>{targets.map(t => <li key={t.id}><strong>{t.letter}</strong>: {t.text}.</li>)}</ul>
  </figure>;
}
