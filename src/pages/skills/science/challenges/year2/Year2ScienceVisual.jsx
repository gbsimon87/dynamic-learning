import "../year1/Year1ScienceVisual.css";
import "./Year2ScienceVisual.css";

/**
 * Read-only diagrams for Year 2 Science, drawn from plain question data
 * (`question.visual`, see src/data/challenges/year2Science/). Natural colours
 * reuse the Year 1 `--y1s-*` tokens. A drawing never prints the word being
 * asked for, and its screen-reader label describes what is visible, not the
 * answer's name.
 */
export default function Year2ScienceVisual({ visual: v }) {
  if (!v) return null;
  return <div className="y2-sci-visual">{draw(v)}</div>;
}

function draw(v) {
  switch (v.type) {
    case "chain": return <FoodChain links={v.links} gap={v.gap} />;
    case "growth": return <Growth stage={v.stage} />;
    case "pots": return <Pots plants={v.plants} />;
    default: return null;
  }
}

const ICONS = {
  grass: "🌿", rabbit: "🐇", fox: "🦊", cow: "🐄", human: "🧑", lettuce: "🥬", snail: "🐌", thrush: "🐦",
  leaves: "🍃", caterpillar: "🐛", "blue tit": "🐦", seeds: "🌾", mouse: "🐁", owl: "🦉", grasshopper: "🦗", frog: "🐸",
};

/** Boxes joined by arrows that mean "is eaten by". A gap is a "?" box. */
function FoodChain({ links, gap }) {
  return <ol className="y2-sci-chain" aria-label="A food chain, in order. Each one is eaten by the next.">
    {links.map((label, i) => {
      const missing = i === gap;
      return <li key={label} className={missing ? "is-missing" : undefined}>
        <span className="y2-sci-link">
          <span className="y2-sci-icon" aria-hidden="true">{missing ? "?" : ICONS[label] ?? ""}</span>
          {missing ? <span className="sr-only">a missing box</span> : <span className="y2-sci-name">{label}</span>}
        </span>
        {i < links.length - 1 && <span className="y2-sci-arrow" aria-hidden="true">→</span>}
      </li>;
    })}
  </ol>;
}

const GROWTH_LABELS = [
  "Something small and round under the soil. Nothing is growing out of it yet.",
  "Something small under the soil, with a tiny root growing down and a tiny shoot growing up.",
  "A small plant just above the soil with two little leaves.",
  "A tall plant with many leaves and a flower at the top.",
];

/** One plant at stage 0 (seed) to 3 (mature, flowering). */
function Growth({ stage }) {
  const top = [190, 156, 110, 54][stage];
  // Early stages are cropped to the soil, so a buried seed is not lost under empty sky.
  const viewTop = [110, 110, 60, 0][stage];
  return <svg className="y2-sci-growth" viewBox={`0 ${viewTop} 300 ${260 - viewTop}`} role="img" aria-label={GROWTH_LABELS[stage]}>
    <rect className="y1-sci-soil" x="20" y="170" width="260" height="84" rx="8" />
    {stage >= 1 && <g className="y1-sci-roots">
      {(stage === 1 ? [[0, 26]] : [[-22, 30], [0, 40], [20, 32]]).map(([dx, dy], i) => <path key={i} d={`M150 206 Q${150 + dx / 2} ${206 + dy / 2} ${150 + dx} ${206 + dy}`} />)}
    </g>}
    {stage >= 1 && <path className="y1-sci-stem" d={`M150 ${stage === 3 ? 206 : 200} L150 ${top}`} />}
    {stage === 2 && <>
      <path className="y1-sci-leaf" d="M150 112 Q126 88 108 104 Q128 122 150 112Z" />
      <path className="y1-sci-leaf" d="M150 112 Q174 88 192 104 Q172 122 150 112Z" />
    </>}
    {stage === 3 && <>
      {[[150, 140, 1], [150, 110, -1], [150, 84, 1]].map(([x, y, side]) => <path key={y} className="y1-sci-leaf" d={`M${x} ${y} Q${x + side * 30} ${y - 30} ${x + side * 62} ${y - 14} Q${x + side * 34} ${y + 12} ${x} ${y}Z`} />)}
      <g transform="translate(150 46)">
        {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} className="y1-sci-petal" cx="0" cy="-16" rx="9" ry="15" transform={`rotate(${a})`} />)}
        <circle className="y1-sci-centre" r="9" />
      </g>
    </>}
    {stage < 3 && <ellipse className="y2-sci-seed" cx="150" cy="206" rx={stage === 2 ? 10 : 16} ry={stage === 2 ? 6 : 10} />}
  </svg>;
}

const POT_WORDS = {
  healthy: "is green and standing up straight",
  pale: "has pale, yellow leaves and a tall, thin stem",
  droopy: "is drooping, and its soil is dry",
};

// A plant grown in the dark is drawn tall, thin and small-leaved as well as
// pale, so it differs from a healthy plant by shape, not colour alone.
const POT_SHAPES = {
  healthy: { stem: (x) => `M${x} 176 L${x} 74`, leaves: (x) => [[x, 150, -1, 1], [x, 124, 1, 1], [x, 98, -1, 1], [x, 80, 1, 1]] },
  pale: { stem: (x) => `M${x} 176 L${x} 40`, leaves: (x) => [[x, 92, 1, 0.6], [x, 56, -1, 0.6]] },
  droopy: { stem: (x) => `M${x} 176 Q${x} 110 ${x + 34} 104`, leaves: (x) => [[x + 8, 132, -1, 1], [x + 4, 150, 1, 1], [x + 34, 104, 1, 1]] },
};

function PotPlant({ x, state, name }) {
  const droopy = state === "droopy";
  const pale = state === "pale";
  const shape = POT_SHAPES[state];
  const leaf = (lx, ly, side, k) => droopy
    ? `M${lx} ${ly} Q${lx + side * 18} ${ly + 6} ${lx + side * 22} ${ly + 30} Q${lx + side * 6} ${ly + 20} ${lx} ${ly}Z`
    : `M${lx} ${ly} Q${lx + side * 22 * k} ${ly - 20 * k} ${lx + side * 40 * k} ${ly - 8 * k} Q${lx + side * 22 * k} ${ly + 8 * k} ${lx} ${ly}Z`;
  return <g data-plant={name} data-state={state}>
    {pale && <path className="y2-sci-pale-stem-edge" d={shape.stem(x)} fill="none" />}
    <path className={pale ? "y2-sci-pale-stem" : "y1-sci-stem"} d={shape.stem(x)} fill="none" />
    {shape.leaves(x).map(([lx, ly, side, k]) => <path key={`${lx}-${ly}`} className={pale ? "y2-sci-pale" : "y1-sci-leaf"} d={leaf(lx, ly, side, k)} />)}
    <path className="y2-sci-pot" d={`M${x - 44} 176 L${x + 44} 176 L${x + 34} 232 L${x - 34} 232Z`} />
    <rect className={droopy ? "y2-sci-dry" : "y1-sci-soil"} x={x - 42} y="170" width="84" height="12" rx="4" />
    {droopy && <path className="y2-sci-crack" d={`M${x - 26} 172 l8 6 l6 -5 M${x + 8} 173 l7 5 l8 -6`} />}
  </g>;
}

/** Two pot plants after a test, labelled Plant A and Plant B. */
function Pots({ plants }) {
  const [a, b] = plants;
  return <svg className="y2-sci-pots" viewBox="0 0 300 270" role="img"
    aria-label={`Two pot plants. Plant A ${POT_WORDS[a]}. Plant B ${POT_WORDS[b]}.`}>
    <PotPlant x={78} state={a} name="A" />
    <PotPlant x={222} state={b} name="B" />
    <text x="78" y="262" textAnchor="middle">Plant A</text>
    <text x="222" y="262" textAnchor="middle">Plant B</text>
  </svg>;
}
