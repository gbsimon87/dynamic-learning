import DataTable from "../../../../../components/challenge/DataTable";
import "./Year4ScienceVisual.css";

// Pictorial components, rather than Year 6 circuit symbols. The bulb is always
// drawn unlit: the learner must predict its state from the visible connections.
function Circuit({ closed, switch: hasSwitch }) {
  const description = `A cell with two terminals is wired through a bulb. ${hasSwitch ? `A switch has ${closed ? "touching" : "separated"} contacts.` : closed ? "The wire joins continuously back to the other cell terminal." : "There is a gap in the wire on the right."} All components work.`;
  return <figure className="y4-sci-figure">
    <svg viewBox="0 0 400 240" role="img" aria-label={description}>
      <path className="y4-sci-wire" d="M150 60 H55 V190 H188 M212 190 H340 V150 M250 60 H340 V90" />
      <g className="y4-sci-cell">
        <rect x="160" y="40" width="80" height="40" rx="8" />
        <rect x="150" y="49" width="10" height="22" rx="2" />
        <rect x="240" y="49" width="10" height="22" rx="2" />
        <text x="172" y="67">−</text><text x="220" y="67">+</text>
      </g>
      <text x="200" y="28" textAnchor="middle">Cell</text>
      <text x="76" y="132">Wires</text>
      <path className="y4-sci-glass" d="M183 179 C159 142 241 142 217 179 Z" />
      <path className="y4-sci-filament" d="M188 184 L188 172 L196 178 L204 169 L212 176 L212 184" />
      <rect className="y4-sci-base" x="184" y="179" width="8" height="16" rx="2" />
      <rect className="y4-sci-base" x="208" y="179" width="8" height="16" rx="2" />
      <text x="200" y="231" textAnchor="middle">Bulb</text>
      <path className="y4-sci-wire" d={closed ? "M340 90 V150" : hasSwitch ? "M340 90 L305 143" : "M340 90 V105 M340 135 V150"} />
      {hasSwitch && <><circle className="y4-sci-contact" cx="340" cy="90" r="5" /><circle className="y4-sci-contact" cx="340" cy="150" r="5" /><text x="278" y="171">Switch</text></>}
      {!closed && !hasSwitch && <text x="288" y="125">Gap</text>}
    </svg>
    <figcaption>Picture model with working parts. Trace the connections to predict what happens.</figcaption>
  </figure>;
}

function Cycle() {
  return <figure className="y4-sci-figure">
    <svg viewBox="0 0 400 220" role="img" aria-label="Water-cycle model: Sun warms a lake, water moves upwards as vapour, droplets form in a cloud, rain falls and water collects again.">
      <circle className="y4-sci-sun" cx="65" cy="40" r="23" /><text x="65" y="81" textAnchor="middle">Sun</text>
      <path className="y4-sci-water" d="M35 166 Q100 148 190 170 T365 166 V202 H35Z" />
      <text x="200" y="194" textAnchor="middle">Collected water</text>
      <path className="y4-sci-wire" d="M100 145 V101 M93 111 L100 101 L107 111" />
      <text x="125" y="124">Evaporation</text>
      <path className="y4-sci-cloud" d="M217 73 C192 70 195 39 218 39 C226 12 269 13 277 37 C316 27 336 73 305 79 H217Z" />
      <text x="256" y="96" textAnchor="middle">Condensation</text>
      {[235, 260, 285].map(x => <path key={x} className="y4-sci-rain" d={`M${x} 112 l-6 17 M${x + 7} 139 l-6 17`} />)}
      <text x="310" y="142">Rain</text>
    </svg><figcaption>A simplified repeating cycle. Cloud water includes tiny droplets or ice crystals.</figcaption>
  </figure>;
}

function Digestion() {
  return <figure className="y4-sci-figure y4-sci-digestion">
    <svg viewBox="0 0 400 260" role="img" aria-label="Simplified human digestive route: mouth, oesophagus, stomach, coiled small intestine, then large intestine and waste exit. The large intestine surrounds the small intestine.">
      <path className="y4-sci-body" d="M105 42 Q100 9 130 9 Q162 9 155 43 L173 59 Q191 101 185 223 H76 Q70 101 89 59Z" />
      <path className="y4-sci-organ" d="M122 37 H140 M131 40 V96 Q161 85 165 110 Q172 145 136 140 Q119 136 123 119" />
      <path className="y4-sci-intestine" d="M123 119 Q112 136 126 151 Q162 156 150 166 Q113 163 118 175 Q157 175 150 186 Q125 198 104 190" />
      <path className="y4-sci-large" d="M104 199 V153 Q104 145 113 145 H155 Q164 145 164 154 V195 Q164 207 151 207 H134 V223" />
      {[["Mouth", 140, 37, 36], ["Oesophagus", 132, 72, 73], ["Stomach", 164, 116, 118], ["Small intestine", 150, 175, 168], ["Large intestine", 164, 200, 213], ["Waste exit", 134, 223, 246]].map(([label, x, y, ty]) => <g key={label}><path className="y4-sci-guide" d={`M${x} ${y} L218 ${ty - 5}`} /><text x="223" y={ty}>{label}</text></g>)}
    </svg><figcaption>Diagram model of the route, rather than a picture of an actual body.</figcaption>
  </figure>;
}

export default function Year4ScienceVisual({ question: q }) {
  const v = q.visual;
  return <div className="y4-sci-visual">
    {q.table && <DataTable caption={`Supplied example results — ${q.table.headings[0]}`} columns={q.table.headings.slice(1).map((label, i) => ({ key: `c${i}`, label }))} rows={q.table.rows.map(([label, ...cells]) => ({ label, cells: Object.fromEntries(cells.map((value, i) => [`c${i}`, value])) }))} />}
    {v?.type === "circuit" && <Circuit {...v} />}
    {v?.type === "cycle" && <Cycle />}
    {v?.type === "digestion" && <Digestion />}
    {v?.type === "chain" && <p className="y4-sci-chain" aria-label="Each arrow points from food to the animal eating it">{v.labels.map((label, i) => <span key={label}>{i > 0 && <b aria-hidden="true"> → </b>}{v.hidden ? "?" : label}</span>)}</p>}
  </div>;
}
