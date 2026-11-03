import { VISUAL_TYPES } from "../../../../../data/challenges/year5French/visualTypes.js";
import { Fig, Root, Scene, Emoji, Arrow, Lines, wrap, Bubble } from "../../../year5Pictures/Pictures";
import "./Year5FrenchVisual.css";

// The figure types are also exported here so a frame can read them next to the component.
// eslint-disable-next-line react-refresh/only-export-components
export { VISUAL_TYPES };

/** A crossroads seen from above. The learner stands at the bottom; the roads are not labelled. */
function Junction({ phrase, alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-grass" width="400" height="240" />
    <rect className="y5v-road" x="170" y="0" width="60" height="240" />
    <rect className="y5v-road" x="0" y="70" width="400" height="60" />
    <line className="y5v-road-line" x1="200" y1="0" x2="200" y2="70" />
    <line className="y5v-road-line" x1="200" y1="130" x2="200" y2="240" />
    <line className="y5v-road-line" x1="0" y1="100" x2="170" y2="100" />
    <line className="y5v-road-line" x1="230" y1="100" x2="400" y2="100" />
    <Emoji e="🧍" x="200" y="186" size="46" />
    <text className="y5v-small" x="244" y="190" textAnchor="start">You are here</text>
    {phrase && <Bubble x={92} y={170} text={phrase} tail="br" max={16} />}
  </Fig>;
}

/** "Which day comes after ...?": the word we know, an arrow, and a card with a question mark. */
function Strip({ from, total = 7, at = 0, alt, caption }) {
  const gap = Math.min(40, 340 / total);
  const start = 200 - (gap * (total - 1)) / 2;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-card-hi" x="30" y="40" width="150" height="70" rx="16" />
    <Lines x="105" y="75" lines={wrap(from, 12)} />
    <Arrow x1="186" y1="75" x2="214" y2="75" head={14} />
    <rect className="y5v-card-ask" x="220" y="40" width="150" height="70" rx="16" />
    <text x="295" y="76" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 34 }}>?</text>
    {Array.from({ length: total }, (_, i) => <circle key={i} className={i === at ? "y5v-dot" : "y5v-dot-ring"} cx={start + gap * i} cy="180" r="10" />)}
    <path className="y5v-ink-thin" d={`M${start + gap * at} 160 Q${start + gap * (at + 0.5)} 138 ${start + gap * (at + 1)} 160`} />
    <path className="y5v-ink-thin" d={`M${start + gap * (at + 1) - 6} 152 L${start + gap * (at + 1)} 160 L${start + gap * (at + 1) - 9} 162`} />
  </Fig>;
}

/** A sum with the French number words, and the answer left blank. */
function Calc({ a, b, op = "+", alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-card-hi" x="20" y="50" width="160" height="80" rx="16" />
    <Lines x="100" y="90" lines={wrap(a, 12)} gap={22} />
    <rect className="y5v-card-hi" x="220" y="50" width="160" height="80" rx="16" />
    <Lines x="300" y="90" lines={wrap(b, 12)} gap={22} />
    <text x="200" y="92" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 36 }}>{op}</text>
    <text x="200" y="172" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 34 }}>= ?</text>
  </Fig>;
}

/** Two words joined by a link, with a speaker and a question mark for the joining sound. */
function Liaison({ phrase, alt, caption }) {
  const [first, ...rest] = phrase.split(" ");
  const second = rest.join(" ");
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-card" x="24" y="60" width="156" height="64" rx="14" />
    <text x="102" y="94" textAnchor="middle" dominantBaseline="central">{first}</text>
    <rect className="y5v-card" x="220" y="60" width="156" height="64" rx="14" />
    <text x="298" y="94" textAnchor="middle" dominantBaseline="central">{second}</text>
    <path className="y5v-ink" d="M150 128 Q200 176 250 128" />
    <circle className="y5v-mark-ring" cx="200" cy="170" r="22" />
    <text x="200" y="171" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 28 }}>?</text>
    <Emoji e="🔊" x="200" y="214" size="34" />
  </Fig>;
}

const FIGURES = {
  scene: (v) => <Scene backdrop="plain" banner {...v} />,
  junction: (v) => <Junction {...v} />,
  strip: (v) => <Strip {...v} />,
  calc: (v) => <Calc {...v} />,
  liaison: (v) => <Liaison {...v} />,
};

/**
 * The picture for a Year 5 French question: `question.visual` is `{ type, ...params }`.
 * A picture never shows the English for a French word the question asks about.
 * Returns null when there is nothing to draw.
 */
export default function Year5FrenchVisual({ question }) {
  const v = question?.visual;
  if (!v || !Object.hasOwn(FIGURES, v.type)) return null;
  return <Root name="y5-fr-visual">{FIGURES[v.type](v)}</Root>;
}
