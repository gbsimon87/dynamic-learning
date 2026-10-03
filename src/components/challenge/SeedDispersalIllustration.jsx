import { useId, useState } from "react";
import SeedDispersalFigure from "./SeedDispersalFigure";
import { CREDITS, fluent } from "./scienceArt.js";
import "./science-kit.css";

/*
 * Seed Dispersal. A picture shows the seed's FEATURES only, never how it
 * moved: no wind, animals or arrows, because the method must come from the
 * supplied observation. The dandelion tuft, sycamore wing, burr, husked fruit,
 * dry pod and cut fruit are drawn in the shaded style of the rock specimens;
 * no open library draws them clearly (Fluent's coconut is split open, which
 * would contradict "a thick outer case surrounds a seed"). Same props as SeedDispersalFigure, which it
 * falls back to if an image cannot load.
 */
const FLUENT_KINDS = { plain: "chestnut" };

export default function SeedDispersalIllustration(props) {
  const { kind, feature = "", evidence = "" } = props;
  const [failed, setFailed] = useState(false);
  const id = useId().replace(/:/g, "");
  if (failed || !DRAW[kind]) return <SeedDispersalFigure {...props} />;
  const Draw = DRAW[kind];
  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox="0 0 320 220" role="img" aria-label={feature || "Seed or fruit example"} data-seed-kind={kind}>
        <defs>
          <radialGradient id={`${id}-shade`} cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.28" />
          </radialGradient>
          <linearGradient id={`${id}-wing`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" className="science-wing-base" />
            <stop offset="1" className="science-wing-tip" />
          </linearGradient>
          <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="science-water-top" />
            <stop offset="1" className="science-water-bottom" />
          </linearGradient>
        </defs>
        <Draw id={id} onError={() => setFailed(true)} />
      </svg>
      <figcaption>
        {feature}
        {evidence && <p>{evidence}</p>}
        {FLUENT_KINDS[kind] && <span className="science-credit">{CREDITS.fluent}</span>}
      </figcaption>
    </figure>
  );
}

/** A shaded seed, the same look as in Pollination and Seed Formation. */
function Seed({ id, x, y, rx, ry, angle = 0 }) {
  return (
    <g className="science-seed" transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} className="science-seed-body" />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id}-shade)`} />
    </g>
  );
}

const DRAW = {
  /* A dandelion-style seed: a ribbed seed, a long thin stalk and a wide
     umbrella of fine hairs. */
  tuft({ id }) {
    const top = { x: 160, y: 104 };
    const hairs = Array.from({ length: 19 }, (_, i) => -168 + (i * 156) / 18);
    return (
      <g data-feature="tuft">
        <g className="science-tuft-hairs">
          {hairs.map((deg) => {
            const a = (deg * Math.PI) / 180;
            const tip = { x: top.x + Math.cos(a) * 92, y: top.y + Math.sin(a) * 84 };
            const barbs = [0.45, 0.65, 0.85].map((t) => {
              const p = { x: top.x + (tip.x - top.x) * t, y: top.y + (tip.y - top.y) * t };
              return `M${p.x} ${p.y} l${Math.cos(a - 0.5) * 7} ${Math.sin(a - 0.5) * 7} M${p.x} ${p.y} l${Math.cos(a + 0.5) * 7} ${Math.sin(a + 0.5) * 7}`;
            }).join(" ");
            return <path key={deg} d={`M${top.x} ${top.y} L${tip.x} ${tip.y} ${barbs}`} />;
          })}
        </g>
        <path className="science-tuft-stalk" d={`M${top.x} ${top.y} V160`} />
        <Seed id={id} x={160} y={182} rx={7} ry={22} />
        <path className="science-seed-ribs" d="M156 168 V196 M160 164 V200 M164 168 V196" />
      </g>
    );
  },
  /* A sycamore-style winged fruit: a round seed case with one broad, veined wing. */
  wing({ id }) {
    return (
      <g data-feature="wing">
        <path className="science-wing" fill={`url(#${id}-wing)`} d="M96 162 C92 118 150 52 258 34 C284 30 292 54 270 70 C220 108 160 150 118 176 Z" />
        <path className="science-wing-veins" d="M110 160 C150 116 200 76 262 44 M112 164 C160 130 210 98 268 62 M106 156 C134 110 180 66 246 40" />
        <circle className="science-samara-seed" cx="100" cy="170" r="24" />
        <circle cx="100" cy="170" r="24" fill={`url(#${id}-shade)`} />
      </g>
    );
  },
  /* A burr: a round seed case covered in hooked spines. */
  hooks({ id }) {
    const spines = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
    return (
      <g data-feature="hooks">
        <g className="science-burr-spines">
          {spines.map((deg) => {
            const a = (deg * Math.PI) / 180;
            const from = { x: 160 + Math.cos(a) * 40, y: 110 + Math.sin(a) * 40 };
            const tip = { x: 160 + Math.cos(a) * 74, y: 110 + Math.sin(a) * 74 };
            const hook = { x: tip.x + Math.cos(a + 2.2) * 9, y: tip.y + Math.sin(a + 2.2) * 9 };
            return <path key={deg} d={`M${from.x} ${from.y} L${tip.x} ${tip.y} Q${tip.x + Math.cos(a + 1.2) * 8} ${tip.y + Math.sin(a + 1.2) * 8} ${hook.x} ${hook.y}`} />;
          })}
        </g>
        <circle className="science-burr-body" cx="160" cy="110" r="44" />
        <circle cx="160" cy="110" r="44" fill={`url(#${id}-shade)`} />
      </g>
    );
  },
  /* A thick-cased fruit resting in the water of the supplied test. */
  float({ id }) {
    const fibres = [[-30, -20], [-12, -40], [10, -38], [28, -18], [-34, 4], [32, 6], [-20, 26], [16, 30]];
    return (
      <g data-feature="float">
        <g transform="rotate(-14 160 96)">
          <ellipse className="science-husk" cx="160" cy="96" rx="48" ry="56" />
          <ellipse cx="160" cy="96" rx="48" ry="56" fill={`url(#${id}-shade)`} />
          <g className="science-husk-fibres">
            {fibres.map(([dx, dy]) => <path key={`${dx}${dy}`} d={`M${160 + dx} ${96 + dy} q4 8 2 16`} />)}
          </g>
        </g>
        <path fill={`url(#${id}-water)`} opacity="0.85" d="M0 120 Q40 110 80 120 T160 120 T240 120 T320 120 V220 H0Z" />
        <path className="science-water-line" d="M0 120 Q40 110 80 120 T160 120 T240 120 T320 120" />
        <text className="science-svg-text" x="14" y="206">Water test</text>
      </g>
    );
  },
  /* A dry pod, cut away so its seeds show along the middle. */
  pod({ id }) {
    return (
      <g data-feature="pod">
        <path className="science-pod" d="M30 116 C70 66 250 66 292 104 C250 150 70 156 30 116Z" />
        <path className="science-pod-window" d="M70 112 C110 88 220 86 258 104 C220 126 110 132 70 112Z" />
        {[96, 136, 176, 216].map((x) => <Seed key={x} id={id} x={x} y={109} rx={15} ry={11} />)}
        <path className="science-pod-seam" d="M30 116 C70 92 250 86 292 104" />
        <path className="science-pod-stalk" d="M30 116 L12 124" />
        <text className="science-svg-text" x="14" y="200">Dry pod (cut-away view)</text>
      </g>
    );
  },
  /* A smooth seed case hanging below a branch, above the ground. */
  plain({ onError }) {
    return (
      <g data-feature="plain">
        <path className="science-branch" d="M0 30 C80 22 200 40 320 26" />
        <path className="science-pod-stalk" d="M160 32 V64" />
        <image href={fluent("chestnut")} x="122" y="56" width="76" height="76" onError={onError} />
        <path className="science-ground" d="M0 196 H320" />
        {[30, 90, 230, 290].map((x) => <path key={x} className="science-grass" d={`M${x} 196 l-4 -10 M${x} 196 l3 -12 M${x} 196 l8 -8`} />)}
      </g>
    );
  },
  /* A fleshy fruit cut in half, with its seeds inside. */
  fruit({ id }) {
    return (
      <g data-feature="fruit">
        <path className="science-pod-stalk" d="M160 52 C158 40 162 30 168 22" />
        <path className="science-plant-leaf-flat" d="M166 30 C186 14 210 18 214 26 C200 36 182 38 166 30Z" />
        <path className="science-case-skin is-fruit" d="M160 58 C134 40 78 52 76 112 C74 170 116 204 160 204 C204 204 246 170 244 112 C242 52 186 40 160 58Z" />
        <path className="science-case-flesh" d="M160 72 C138 58 94 70 92 114 C90 160 124 188 160 188 C196 188 230 160 228 114 C226 70 182 58 160 72Z" />
        <path className="science-fruit-core" d="M160 94 C178 104 182 134 160 150 C138 134 142 104 160 94Z" />
        <Seed id={id} x={152} y={124} rx={6} ry={11} angle={-14} />
        <Seed id={id} x={168} y={124} rx={6} ry={11} angle={14} />
      </g>
    );
  },
};
