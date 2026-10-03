import { useId } from "react";
import { FEATURES } from "../../data/challenges/science/skeletonsForSupportAndProtection.js";
import { HUMAN_ANCHORS } from "../../data/skeletonDiagram.js";
import "./science-kit.css";


export default function SkeletonFigure({ animal = "human", pose = "wide", targets = [], named = false, caption = "Simplified body diagram. Some structures and details are omitted." }) {
  const id = useId();
  const human = animal === "human";
  const dog = animal === "dog";
  const description = human ? `Bones inside a human body: rounded skull above curved chest ribs, a backbone down the centre, and long leg bones below the hips. ${targets.map((t) => `${t.label} points to ${FEATURES[t.part]}.`).join(" ")}` : dog ? "A dog's internal skeleton: skull in the head, backbone along the back, rib cage around the chest and four bony legs." : `A ${animal} with a hard covering outside its body, not a bony backbone inside.`;
  const armY = pose === "raised" ? 90 : pose === "lowered" ? 190 : 130;
  return <figure className="science-life-figure"><svg viewBox="0 0 360 320" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>{human ? "Human skeleton" : dog ? "Dog skeleton" : `${animal} outer skeleton`}</title><desc id={`${id}-desc`}>{description}</desc>
    {human ? <g>
      <ellipse className="science-seed-case" cx="180" cy="45" rx="26" ry="30" /><path className="science-line" d="M167 66 H193 M165 75 H195" />
      <g className="science-line" data-skeleton-part="ribs">{[95,106,117,128].map((y) => <path key={y} d={`M180 ${y} Q125 ${y-8} 157 ${y+12} M180 ${y} Q235 ${y-8} 203 ${y+12}`} />)}</g>
      <g className="science-seed-shape" data-skeleton-part="spine">{[82,94,106,118,130,142,154,166].map((y) => <rect key={y} x="176" y={y} width="8" height="9" rx="2" />)}</g>
      <path className="science-line" d={`M157 87 L130 130 L112 ${armY} M203 87 L230 130 L248 ${armY}`} />
      <path className="science-seed-case" d="M155 175 Q180 190 205 175 L197 203 H163 Z" />
      <g className="science-line" data-skeleton-part="legs"><path d="M167 201 L157 250 L153 297 H135 M193 201 L203 250 L207 297 H225" /></g>
      {targets.map((target) => { const anchor = HUMAN_ANCHORS[target.part]; if (!anchor) return null; return <g key={target.id} className="science-callout"><path d={`M${anchor.x} ${anchor.y} L278 ${anchor.y}`} /><circle cx={anchor.x} cy={anchor.y} r="4" /><text className="science-svg-text" x="284" y={anchor.y+5}>{named ? { skull: "Skull", ribs: "Ribs", spine: "Spine", legs: "Legs" }[target.part] : target.label}</text></g>; })}
    </g> : dog ? <g><ellipse className="science-seed-case" cx="75" cy="65" rx="30" ry="23" /><path className="science-line" d="M48 64 H28 V80 H60 M98 76 L125 90 H255 L285 120" /><g className="science-line" data-skeleton-part="ribs">{[135,148,161,174].map((x) => <path key={x} d={`M${x} 90 Q${x+20} 130 ${x} 145`} />)}</g><g className="science-seed-shape" data-skeleton-part="spine">{[120,140,160,180,200,220,240].map((x) => <rect key={x} x={x} y="84" width="12" height="10" rx="2" />)}</g><path className="science-line" data-skeleton-part="legs" d="M125 130 L115 200 H95 M150 139 L145 210 H125 M225 109 L215 200 H195 M249 106 L250 210 H230" /></g> : <g><ellipse className="science-seed-case" cx="180" cy="130" rx="70" ry="50" /><path className="science-line" d="M120 100 L75 70 M115 125 L65 125 M125 155 L80 185 M240 100 L285 70 M245 125 L295 125 M235 155 L280 185" />{animal === "crab" ? <path className="science-line" d="M115 140 L65 160 M245 140 L295 160 M75 70 L50 50 L35 65 M50 50 L55 30 M285 70 L310 50 L325 65 M310 50 L305 30" /> : <><ellipse className="science-seed-case" cx="180" cy="65" rx="30" ry="22" /><path className="science-line" d="M165 47 L145 25 M195 47 L215 25 M180 80 V180" /></>}</g>}
  </svg><figcaption>{caption}</figcaption></figure>;
}
