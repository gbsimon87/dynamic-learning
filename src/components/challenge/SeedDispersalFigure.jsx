import "./science-kit.css";
export default function SeedDispersalFigure({ kind, feature = "", evidence = "" }) {
  return <figure className="science-life-figure"><svg viewBox="0 0 300 180" role="img" aria-label={feature || "Schematic seed or fruit example"}>
    {kind === "tuft" && <g className="science-line">{[65,100,150,200,235].map((x) => <path key={x} d={`M150 125 L${x} 35`} />)}<path d="M150 125 V150" /></g>}
    {kind === "wing" && <path className="science-leaf" d="M145 135 Q45 55 55 25 Q190 30 170 125 Z" />}
    {kind === "hooks" && <g className="science-line">{[0,60,120,180,240,300].map((angle) => <path key={angle} transform={`rotate(${angle} 150 90)`} d="M150 65 V35 Q150 15 170 25 Q180 35 166 38" />)}</g>}
    {kind === "float" && <><path className="science-line" d="M20 110 Q40 95 60 110 T100 110 T140 110 T180 110 T220 110 T260 110" /><ellipse className="science-seed-case" cx="150" cy="85" rx="65" ry="35" /><ellipse className="science-seed-shape" cx="150" cy="85" rx="22" ry="14" /></>}
    {kind === "pod" && <><path className="science-seed-case" d="M40 90 Q150 5 260 90 Q150 175 40 90 Z" />{[90,150,210].map((x) => <ellipse className="science-seed-shape" key={x} cx={x} cy="90" rx="13" ry="20" />)}</>}
    {kind === "plain" && <path className="science-line" d="M45 25 H255 M150 25 V65" />}
    {kind === "fruit" && <><circle className="science-seed-case" cx="150" cy="90" r="60" />{[125,175].map((x) => <ellipse className="science-seed-shape" key={x} cx={x} cy="90" rx="10" ry="18" />)}</>}
    {["tuft", "wing", "plain", "hooks"].includes(kind) && <ellipse className="science-seed-shape" cx="150" cy={kind === "tuft" || kind === "wing" ? 140 : 90} rx={kind === "hooks" ? 28 : 15} ry="22" />}
  </svg><figcaption>{feature}{evidence && <p>{evidence}</p>}</figcaption></figure>;
}
