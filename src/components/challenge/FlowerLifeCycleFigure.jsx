import { useId } from "react";
import "./science-kit.css";

/** Stylised local flower/life-cycle source diagrams. Internal seed cases are
 * explicitly cut away. Dots and labels distinguish pollen from oval seeds. */
export default function FlowerLifeCycleFigure({ phase = "flower", seedCase = "capsule", pollinator = "insect", evidence = "" }) {
  const id = useId();
  const pollinated = ["pollen", "insect", "wind"].includes(phase);
  const seedPhase = ["developing", "seeds"].includes(phase);
  const features = pollinated ? "Three small round dots show transferred pollen on the receiving part." : seedPhase ? "Three oval seeds are shown inside the cut-away seed case." : phase === "flower" ? "No transferred pollen markers or new seeds are shown." : phase === "seed" ? "One existing oval seed is shown." : "A root and shoot are shown.";
  return <figure className="science-life-figure">
    <svg viewBox="0 0 360 290" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>{seedPhase ? `${phase === "developing" ? "Developing" : "Ripe"} ${seedCase}, cut-away view` : phase === "seed" ? "Existing seed" : phase === "seedling" ? "Young plant" : "Flower and pollen"}</title>
      <desc id={`${id}-description`}>{evidence || "Illustration of a flowering-plant life-cycle stage."} {features}</desc>
      {phase === "seed" ? <><ellipse cx="160" cy="180" rx="25" ry="15" className="science-seed-shape" /><text x="202" y="185" className="science-svg-text">Existing seed</text></> : phase === "seedling" ? <><path className="science-soil" d="M35 220H315V270H35Z" /><path className="science-stem" d="M160 220V145" /><path className="science-line" d="M160 220L144 257M160 230L181 250" /><path className="science-leaf" d="M160 172Q115 131 120 156Q135 180 160 172M160 154Q205 110 200 139Q185 163 160 154" /><text x="212" y="166" className="science-svg-text">Young plant</text></> : seedPhase ? <><path className="science-stem" d="M160 265V210" />
        {seedCase === "pod" ? <path className="science-seed-case" d="M130 90Q205 90 190 215Q112 210 130 90Z" /> : seedCase === "fruit" ? <path className="science-seed-case" d="M160 95C95 60 70 200 160 220C250 200 225 60 160 95Z" /> : <ellipse className="science-seed-case" cx="160" cy="157" rx="53" ry="67" />}
        <g className="science-visible-seeds">{[120, 155, 190].map((y) => <ellipse key={y} cx="160" cy={y} rx={phase === "developing" ? 7 : 13} ry={phase === "developing" ? 5 : 9} className="science-seed-shape" />)}</g>
        <text x="227" y="155" className="science-svg-text">Seeds</text><text x="40" y="45" className="science-svg-text">{seedCase} (cut-away view)</text></> : <>
        <path className="science-stem" d="M160 270V165" />
        <g transform="translate(160 132)" className="science-water-bloom">{[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="0" cy="-30" rx="17" ry="37" transform={`rotate(${angle})`} />)}</g>
        <path className="science-line" d="M128 162V119M143 160V127M160 170V109" /><circle cx="128" cy="119" r="7" className="science-pollen-source" /><circle cx="143" cy="127" r="6" className="science-pollen-source" /><path className="science-line" d="M150 109H170" />
        <text x="15" y="228" className="science-svg-text">Pollen-making part</text><path className="science-line" d="M110 208L128 127" />
        <text x="213" y="96" className="science-svg-text">Receiving part</text><path className="science-line" d="M215 103L171 109" />
        {pollinated && <g className="science-transferred-pollen">{[153, 160, 167].map((x) => <circle key={x} cx={x} cy="103" r="3" />)}</g>}
        {phase === "insect" && <>{pollinator === "butterfly" ? <><ellipse cx="52" cy="37" rx="16" ry="21" className="science-seed-case" /><ellipse cx="83" cy="37" rx="16" ry="21" className="science-seed-case" /></> : <><ellipse cx="59" cy="26" rx="12" ry="9" className="science-water-bloom" /><ellipse cx="75" cy="26" rx="12" ry="9" className="science-water-bloom" /></>}<ellipse cx="67" cy="45" rx="20" ry="11" className="science-seed-case" /><path className="science-line" d="M63 34L50 17M70 34L82 17M56 40V51M66 35V56M76 40V51M84 44L92 44" /><text x="15" y="80" className="science-svg-text">{pollinator === "insect" ? "Insect" : pollinator} carrying pollen</text><path className="science-transfer-path" d="M88 45Q148 35 160 94" /></>}
        {phase === "wind" && <><path className="science-transfer-path" d="M25 45Q113 35 160 94M143 80L160 94L164 73" /><text x="25" y="23" className="science-svg-text">Wind carries pollen</text></>}
      </>}
    </svg>
    {evidence && <figcaption>{evidence}</figcaption>}
  </figure>;
}
