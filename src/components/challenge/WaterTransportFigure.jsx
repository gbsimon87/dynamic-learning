import { useId } from "react";
import "./science-kit.css";

/** Reviewed local SVG. Dye is represented by dots AND words, not colour alone.
 * Stem interior is explicitly a cut-away view; it is not a surface observation. */
export default function WaterTransportFigure({ model = "flower", marks = [], evidence = "" }) {
  const id = useId();
  const rooted = ["rooted", "tree"].includes(model);
  const leafy = ["rooted", "tree", "leafy"].includes(model);
  const flowering = ["rooted", "tree", "flower"].includes(model);
  return <figure className="science-water-figure">
    <svg viewBox="0 0 360 310" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>{rooted ? "Rooted plant" : "Cut stem in water"}</title>
      <desc id={`${id}-description`}>{rooted ? "Roots below soil connect to the stem and parts above ground." : "The cut end of the stem is in the water. No roots are attached. The top is above the water line."} {evidence || "The diagram labels the parts."} Dots mark visible dye in the supplied observation.</desc>
      {rooted ? <><path className="science-soil" d="M15 242H340V305H15Z" /><path className="science-line" d="M160 242L140 290M160 250L185 285M152 263L124 281" /><text x="26" y="280" className="science-svg-text">Roots</text><text x="26" y="230" className="science-svg-text">Soil</text></> : <><path className="science-water-container" d="M112 205V290H208V205" /><path className="science-soil" d="M115 240H205V287H115Z" /><path className="science-line" d="M115 240H205" /><text x="217" y="255" className="science-svg-text">Water</text><text x="217" y="273" className="science-svg-text">+ dye</text><path className="science-line" d="M169 270H215" /><text x="218" y="288" className="science-svg-text">Cut end</text></>}
      <path className={`science-stem ${model === "tree" ? "is-woody" : ""}`} d={`M160 ${rooted ? 242 : 270}V60`} />
      {leafy && <><path className="science-leaf" d="M160 150Q215 99 211 132Q197 153 160 150M160 180Q106 133 115 167Q128 184 160 180" /><text x="225" y="145" className="science-svg-text">Leaves</text></>}
      {flowering && <><g transform="translate(160 50)" className="science-water-bloom">{[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="0" cy="-14" rx="10" ry="16" transform={`rotate(${angle})`} />)}<circle r="9" /></g><text x="220" y="54" className="science-svg-text">{model === "tree" ? "Blossom" : "Flower"}</text></>}
      <text x="22" y="205" className="science-svg-text">{model === "tree" ? "Trunk" : "Stem"}</text>
      {marks.includes("stem") && <g className="science-dye-marks">{[90, 115, 140, 165, 190].map((y) => <circle key={y} cx="160" cy={y} r="5" />)}</g>}
      {marks.includes("flower") && flowering && <g className="science-dye-marks"><circle cx="160" cy="27" r="4" /><circle cx="180" cy="62" r="4" /><circle cx="140" cy="62" r="4" /></g>}
      {marks.includes("leaves") && leafy && <g className="science-dye-marks"><circle cx="181" cy="137" r="4" /><circle cx="197" cy="129" r="4" /><circle cx="132" cy="166" r="4" /></g>}
    </svg>
    <figcaption>{rooted ? "A rooted flowering plant. The soil is shown cut away." : "A cut stem with no roots. Stem sections are shown as an inside view; dots mark dye seen in the observation."} {evidence}</figcaption>
  </figure>;
}
