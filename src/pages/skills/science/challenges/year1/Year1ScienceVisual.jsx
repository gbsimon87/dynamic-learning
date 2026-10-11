import "./Year1ScienceVisual.css";

/**
 * Read-only diagrams for Year 1 Science, drawn from plain question data
 * (`question.visual`, see src/data/challenges/year1Science/). A pointed part
 * gets a dot and an arrow; the drawing never prints the part's name, because
 * naming it is the question. Labels for screen readers describe where the
 * arrow is, not what the part is called.
 */
export default function Year1ScienceVisual({ visual: v }) {
  if (!v) return null;
  return <div className="y1-sci-visual">{draw(v)}</div>;
}

function draw(v) {
  switch (v.type) {
    case "plant": return <Plant visual={v} />;
    case "tree": return <Tree visual={v} />;
    case "treePair": return <TreePair evergreenFirst={v.evergreenFirst} />;
    case "body": return <Body point={v.point} />;
    case "days": return <Days rows={v.rows} />;
    default: return null;
  }
}

/** An arrow from the side of the picture to `to`, with a dot on the part. */
function Pointer({ to, from }) {
  const [x2, y2] = to;
  const [x1, y1] = from;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const tipX = x2 - 9 * Math.cos(angle), tipY = y2 - 9 * Math.sin(angle);
  return <g className="y1-sci-pointer" aria-hidden="true">
    <line x1={x1} y1={y1} x2={tipX} y2={tipY} />
    <path d="M-12 -8 L0 0 L-12 8" transform={`translate(${tipX} ${tipY}) rotate(${angle * 180 / Math.PI})`} />
    <circle cx={x2} cy={y2} r="5" />
  </g>;
}

const PLANT_WHERE = {
  flower: "at the whole flower at the top", petal: "at one coloured part of the flower", leaf: "at a flat green part on the stem",
  stem: "at the tall green part between the flower and the soil", roots: "at the thin parts under the soil", bulb: "at the round part under the soil",
};

function Plant({ visual: { point, bulb } }) {
  const base = bulb ? 232 : 220;
  const anchors = { flower: [150, 70], petal: [176, 52], leaf: [192, 140], stem: [150, 128], roots: [bulb ? 157 : 158, bulb ? 274 : 254], bulb: [164, 236] };
  const label = point ? `A flowering plant${bulb ? " growing from a bulb" : ""}. The arrow points ${PLANT_WHERE[point]}.` : `A flowering plant${bulb ? " growing from a bulb" : ""}, with a flower, stem, leaves and roots.`;
  const rootsTop = bulb ? 248 : 220;
  return <svg className="y1-sci-plant" viewBox="0 0 300 300" role="img" aria-label={label}>
    <rect className="y1-sci-soil" x="20" y="220" width="260" height="76" rx="8" />
    <g className="y1-sci-roots">
      {[[-28, 44], [-12, 60], [0, 66], [14, 58], [30, 40]].map(([dx, dy], i) => <path key={i} d={`M150 ${rootsTop} Q${150 + dx / 2} ${rootsTop + dy / 2} ${150 + dx} ${rootsTop + dy - (bulb ? 14 : 0)}`} />)}
    </g>
    {bulb && <path className="y1-sci-bulb" d="M150 222 C128 230 126 248 150 252 C174 248 172 230 150 222Z" />}
    <path className="y1-sci-stem" d={`M150 ${base} L150 84`} />
    <path className="y1-sci-leaf" d="M150 150 Q180 112 214 128 Q186 156 150 150Z" />
    <path className="y1-sci-leaf" d="M150 180 Q118 144 86 160 Q114 188 150 180Z" />
    <g transform="translate(150 70)">
      {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} className={`y1-sci-petal ${point === "petal" && a === 60 ? "is-pointed" : ""}`} cx="0" cy="-20" rx="11" ry="19" transform={`rotate(${a})`} />)}
      <circle className="y1-sci-centre" r="11" />
    </g>
    {point === "flower" && <circle className="y1-sci-ring" cx="150" cy="70" r="46" />}
    {point && <Pointer to={point === "flower" ? [192, 52] : anchors[point]} from={[282, point === "roots" ? 290 : point === "bulb" ? 214 : anchors[point][1] - 26]} />}
  </svg>;
}

const TREE_WHERE = {
  trunk: "at the thick woody part", branch: "at a part growing out from the trunk", leaves: "at the green parts on a branch",
  roots: "at the parts under the ground", fruit: "at a round red thing hanging from a branch", blossom: "at the pink flowers on a branch",
};

function Tree({ visual: { point, fruit, season = "summer" } }) {
  const clumps = [[92, 98, 36], [210, 92, 36], [150, 66, 40]];
  const anchors = { trunk: [150, 214], branch: [184, 124], leaves: [232, 84], roots: [172, 276], fruit: [214, 112], blossom: [226, 80] };
  const label = point ? `A tree${season === "spring" ? " in spring" : ""}. The arrow points ${TREE_WHERE[point]}.` : "A tree with roots, a trunk, branches and leaves.";
  return <svg className="y1-sci-tree" viewBox="0 0 300 310" role="img" aria-label={label}>
    <rect className="y1-sci-soil" x="20" y="250" width="260" height="56" rx="8" />
    <g className="y1-sci-roots">
      {[[-40, 38], [-16, 52], [8, 54], [34, 40]].map(([dx, dy], i) => <path key={i} d={`M150 250 Q${150 + dx / 2} ${250 + dy / 2} ${150 + dx} ${250 + dy}`} />)}
    </g>
    <path className="y1-sci-branch" d="M150 160 L96 104 M150 150 L206 98 M150 150 L150 74" />
    <rect className="y1-sci-trunk" x="136" y="146" width="28" height="106" rx="6" />
    {clumps.map(([x, y, r]) => <circle key={x} className="y1-sci-canopy" cx={x} cy={y} r={r} />)}
    {season === "spring" && clumps.flatMap(([x, y]) => [[-14, -10], [12, -14], [0, 8], [18, 10], [-16, 12]].map(([dx, dy]) => <circle key={`${x}-${dx}-${dy}`} className="y1-sci-blossom" cx={x + dx} cy={y + dy} r="6" />))}
    {fruit && [[78, 112], [104, 86], [214, 112], [196, 82], [150, 84]].map(([x, y]) => <circle key={`${x}-${y}`} className="y1-sci-fruit" cx={x} cy={y} r="8" />)}
    {point && <Pointer to={anchors[point]} from={[288, point === "roots" ? 300 : point === "trunk" ? 186 : anchors[point][1] + 40]} />}
  </svg>;
}

function TreePair({ evergreenFirst }) {
  const evergreen = (x) => <g key={`e${x}`}>
    <rect className="y1-sci-trunk" x={x - 8} y="170" width="16" height="44" rx="3" />
    <path className="y1-sci-conifer" d={`M${x} 40 L${x + 56} 176 L${x - 56} 176Z`} />
  </g>;
  const bare = (x) => <g key={`d${x}`}>
    <rect className="y1-sci-trunk" x={x - 9} y="120" width="18" height="94" rx="4" />
    <path className="y1-sci-branch" d={`M${x} 140 L${x - 44} 84 M${x - 30} 102 L${x - 48} 104 M${x} 128 L${x + 46} 76 M${x + 32} 92 L${x + 54} 96 M${x} 124 L${x + 4} 60`} />
  </g>;
  const [left, right] = evergreenFirst ? [evergreen(80), bare(220)] : [bare(80), evergreen(220)];
  return <svg className="y1-sci-pair" viewBox="0 0 300 250" role="img"
    aria-label={`Two trees in winter. Tree A ${evergreenFirst ? "still has its green needles" : "has bare branches"}. Tree B ${evergreenFirst ? "has bare branches" : "still has its green needles"}.`}>
    <rect className="y1-sci-snow" x="10" y="212" width="280" height="14" rx="6" />
    {left}{right}
    <text x="80" y="246" textAnchor="middle">Tree A</text>
    <text x="220" y="246" textAnchor="middle">Tree B</text>
  </svg>;
}

const BODY_ANCHORS = {
  hair: [134, 25], head: [159, 37], eye: [132, 52], ear: [160, 57], nose: [120, 64], mouth: [120, 76],
  neck: [120, 94], shoulder: [152, 106], arm: [164, 128], elbow: [175, 150], hand: [186, 194],
  leg: [137, 222], knee: [138, 250], foot: [148, 306],
};
const BODY_WHERE = {
  hair: "the top of the head", head: "the whole round top part of the body", eye: "a part of the face above the nose",
  ear: "the side of the head", nose: "the middle of the face", mouth: "the lower part of the face", neck: "between the head and the body",
  shoulder: "the top of the arm, at the side of the body", arm: "the long part between the shoulder and the hand",
  elbow: "where the arm bends", hand: "the end of the arm", leg: "the long part between the body and the knee", knee: "where the leg bends", foot: "the end of the leg",
};

// Arms (shoulder, elbow, hand) and legs (hip, knee, ankle), drawn as an outline and a fill.
const LIMBS = "M85 108 L65 150 L55 190 M155 108 L175 150 L185 190 M106 196 L102 250 L100 298 M134 196 L138 250 L140 298";

function Body({ point }) {
  const fromLeft = point === "nose" || point === "mouth";
  const [ax, ay] = BODY_ANCHORS[point] ?? [0, 0];
  return <svg className="y1-sci-body" viewBox="0 0 240 330" role="img" aria-label={`A child standing. The arrow points to ${BODY_WHERE[point]}.`}>
    <g className="y1-sci-figure">
      {["y1-sci-limb", "y1-sci-limb-fill"].map((cls) => <g key={cls} className={cls}>
        <path d={LIMBS} />
      </g>)}
      <circle cx="55" cy="196" r="9" /><circle cx="185" cy="196" r="9" />
      <ellipse cx="92" cy="305" rx="15" ry="8" /><ellipse cx="148" cy="305" rx="15" ry="8" />
      <rect x="84" y="100" width="72" height="98" rx="18" />
      <rect x="112" y="84" width="16" height="20" />
      <path d="M88 57 a7 9 0 1 0 0 1 M152 57 a7 9 0 1 1 0 1" />
      <circle cx="120" cy="55" r="32" />
    </g>
    <path className="y1-sci-hair" d="M90 46 Q92 16 120 18 Q150 16 151 46 Q140 30 120 31 Q100 30 90 46Z" />
    <circle className="y1-sci-ink" cx="108" cy="52" r="3.5" /><circle className="y1-sci-ink" cx="132" cy="52" r="3.5" />
    <path className="y1-sci-line" d="M120 58 L117 66 L122 67 M110 75 Q120 83 130 75" />
    {point === "head" && <circle className="y1-sci-ring" cx="120" cy="52" r="42" />}
    {point && <Pointer to={[ax, ay]} from={fromLeft ? [12, ay + 30] : [230, ay + (ay > 280 ? -26 : 26)]} />}
  </svg>;
}

/** Days as 24 one-hour boxes in two rows of twelve; daylight sits around midday. */
function Days({ rows }) {
  return <div className="y1-sci-days">
    {rows.map(({ label, light }) => {
      const start = 12 - light / 2;
      const hours = Array.from({ length: 24 }, (_, h) => h >= start && h < start + light);
      // Each box is announced on its own, so a screen-reader user counts them as a sighted child does.
      return <figure key={label} className="y1-sci-day">
        <figcaption>{label}</figcaption>
        <div className="y1-sci-hours" role="list" aria-label={`${label}, one box per hour`}>
          {hours.map((isLight, h) => <span key={h} role="listitem" aria-label={isLight ? "sun box" : "dark box"} className={isLight ? "is-light" : "is-dark"}>{isLight ? "☀" : ""}</span>)}
        </div>
      </figure>;
    })}
  </div>;
}
