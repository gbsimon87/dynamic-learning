import { useId } from "react";
import { CREDITS, fluent } from "./scienceArt.js";
import "./science-kit.css";

// One picture per soil component. Same meaning as the classic symbols: rock
// particles, once-living remains, air in spaces, water in spaces.
const PICTURE = { mineral: "rock", organic: "fallen_leaf", air: "wind_face", water: "droplet" };

/**
 * What Soil Is Made From: the magnified component cards, with Fluent Emoji
 * pictures in place of the hand-drawn symbols. Same props as
 * SoilCompositionFigure (features are the lettered components shown).
 */
export default function SoilIllustration({ features, sampleId }) {
  const id = useId();
  const columns = 2;
  const rows = Math.ceil(features.length / columns);
  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox={`0 0 320 ${rows * 115 + 20}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{`Soil sample ${sampleId}: magnified component model`}</title>
        <desc id={`${id}-desc`}>{features.map((c) => `${c.letter}: ${c.text}`).join(". ")}</desc>
        {features.map((c, i) => {
          const x = (i % columns) * 150 + 15;
          const y = Math.floor(i / columns) * 115 + 10;
          return (
            <g key={c.id} transform={`translate(${x},${y})`} data-soil-component={c.id}>
              <rect className="science-soil-card" x="0" y="0" width="135" height="100" rx="14" />
              <text className="science-svg-text" x="12" y="24" stroke="none">{c.letter}</text>
              <image href={fluent(PICTURE[c.id])} x="40" y="16" width="70" height="70" />
            </g>
          );
        })}
      </svg>
      <figcaption>
        Sample {sampleId}: supplied magnified notes. These pictures show selected components, not exact sizes or amounts.
        <span className="science-credit">{CREDITS.fluent}</span>
      </figcaption>
      <ul>{features.map((c) => <li key={c.id}><strong>{c.letter}</strong>: {c.text}.</li>)}</ul>
    </figure>
  );
}
