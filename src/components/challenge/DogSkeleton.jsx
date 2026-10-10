import { useId } from "react";
import "./science-kit.css";

/**
 * A dog's internal skeleton, side view, drawn for this app (no third-party
 * art, so no credit is needed). Bones are a fixed cream, like the rendered
 * human bones, so the picture reads the same in both themes. Each part the
 * questions ask about carries data-skeleton-part.
 */

// One bone: a dark outline under a cream core, with round ends.
function Bone({ d, width = 7 }) {
  return (
    <>
      <path d={d} fill="none" stroke="#5b4a3a" strokeWidth={width + 3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#f1e6cc" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

const SOLID = { fill: "#f1e6cc", stroke: "#5b4a3a", strokeWidth: 2.5, strokeLinejoin: "round" };

// Back vertebrae along a gentle arch, tallest spines over the shoulders.
const BACK = Array.from({ length: 12 }, (_, i) => {
  const x = 134 + i * 12;
  return { x, y: 96 - Math.round(6 * Math.sin((i / 11) * Math.PI)), spine: Math.max(4, 15 - i * 1.2) };
});
const NECK = [[108, 90], [117, 95], [125, 100]];
const TAIL = [[314, 98, 9], [323, 103, 8], [331, 109, 7], [338, 116, 6], [344, 124, 5], [348, 132, 4]];
const RIBS = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ x: 142 + i * 12, drop: 74 - i * 5 }));

function Leg({ far = false, front }) {
  const shift = far ? 12 : 0;
  const d = front
    ? `M${146 + shift} 146 L${154 + shift} 180 L${151 + shift} 222 L${139 + shift} 231`
    : `M${292 + shift} 112 L${278 + shift} 160 L${300 + shift} 198 L${296 + shift} 226 L${284 + shift} 233`;
  return <g opacity={far ? 0.5 : 1}><Bone d={d} /></g>;
}

export default function DogSkeleton() {
  const id = useId().replace(/:/g, "");
  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox="0 0 360 250" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Dog skeleton</title>
        <desc id={`${id}-desc`}>A dog&apos;s internal skeleton seen from the side: a bony skull around the brain, a backbone running from the neck to the tail, a rib cage around the chest, and four bony legs.</desc>

        <g data-skeleton-part="legs">
          <Leg far front />
          <Leg far front={false} />
        </g>

        <g data-skeleton-part="ribs">
          {RIBS.map(({ x, drop }) => <Bone key={x} width={4} d={`M${x} 104 Q${x - 16} ${104 + drop * 0.6} ${x + 6} ${104 + drop}`} />)}
          <Bone width={5} d="M136 176 Q170 174 214 160" />
        </g>

        <g data-skeleton-part="spine">
          {NECK.map(([x, y]) => <rect key={x} x={x - 4} y={y - 4} width="9" height="8" rx="2" {...SOLID} />)}
          {BACK.map(({ x, y, spine }) => (
            <g key={x}>
              <path d={`M${x + 5} ${y} L${x + 3} ${y - spine}`} stroke="#5b4a3a" strokeWidth="3" strokeLinecap="round" />
              <rect x={x} y={y} width="10" height="9" rx="2" {...SOLID} />
            </g>
          ))}
          {TAIL.map(([x, y, s]) => <rect key={x} x={x - s / 2} y={y - s / 2} width={s} height={s * 0.8} rx="2" {...SOLID} />)}
        </g>

        {/* Shoulder blade and hip bone, joining the legs to the backbone. */}
        <path d="M150 100 L170 104 L152 150 L140 146 Z" {...SOLID} />
        <path d="M272 98 L304 92 L312 106 L294 118 L278 112 Z" {...SOLID} />

        <g data-skeleton-part="legs">
          <Leg front />
          <Leg front={false} />
        </g>

        <g data-skeleton-part="skull">
          {/* Domed braincase, a step down to the long muzzle, then the nose. */}
          <path d="M110 80 Q108 52 82 50 Q64 50 58 64 L28 76 Q16 80 18 92 L56 98 Q88 104 106 94 Q112 88 110 80 Z" {...SOLID} />
          <circle cx="80" cy="70" r="7" fill="#5b4a3a" />
          <path d="M24 99 L58 108 Q86 112 100 101" fill="none" stroke="#5b4a3a" strokeWidth="7" strokeLinecap="round" />
          <path d="M24 99 L58 108 Q86 112 100 101" fill="none" stroke="#f1e6cc" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
      <figcaption>Simplified body diagram. Some structures and details are omitted.</figcaption>
    </figure>
  );
}
