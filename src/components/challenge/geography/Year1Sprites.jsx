import { useId } from "react";

/**
 * Year 1 Geography picture library: original flat illustrations, each drawn in a
 * 100 × 100 box with its ground line near y = 86. Every colour is a `--y1-*`
 * class from year1.css, so both themes repaint the art. Sprites are decorative;
 * the visual's alt text and evidence lines carry the meaning.
 */

const Ground = ({ cls = "y1-grass" }) => <path className={cls} d="M0,82 Q50,76 100,82 L100,100 L0,100 Z" />;
const Tree = ({ x = 0, y = 0, s = 1, leaf = "y1-leaf" }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  <rect className="y1-trunk" x="-3" y="-4" width="6" height="18" rx="2" />
  <circle className={leaf} cx="0" cy="-14" r="13" /><circle className={leaf} cx="-8" cy="-6" r="9" /><circle className={leaf} cx="8" cy="-6" r="9" />
</g>;
const Pine = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  <rect className="y1-trunk" x="-2.5" y="-2" width="5" height="10" />
  <path className="y1-leaf-dark" d="M0,-30 L12,-10 L6,-10 L15,2 L-15,2 L-6,-10 L-12,-10 Z" />
</g>;
const House = ({ x = 0, y = 0, s = 1, roof = "y1-roof", wall = "y1-wall" }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  <rect className={wall} x="-14" y="-18" width="28" height="22" />
  <path className={roof} d="M-18,-17 L0,-32 L18,-17 Z" />
  <rect className="y1-door" x="-4" y="-8" width="8" height="12" rx="1" />
  <rect className="y1-window" x="-11" y="-14" width="6" height="6" /><rect className="y1-window" x="5" y="-14" width="6" height="6" />
</g>;
const Waves = ({ y = 0, cls = "y1-foam" }) => <path className={cls} d={`M4,${y} q6,-4 12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0`} />;
const Boat = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  <path className="y1-roof" d="M-12,0 L12,0 L8,6 L-8,6 Z" /><path className="y1-ink-line" d="M0,0 L0,-16" /><path className="y1-cloud" d="M1,-15 L10,-3 L1,-3 Z" />
</g>;
const Cloud = ({ x = 0, y = 0, s = 1, cls = "y1-cloud" }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  <ellipse className={cls} cx="0" cy="0" rx="18" ry="9" /><circle className={cls} cx="-6" cy="-6" r="9" /><circle className={cls} cx="7" cy="-7" r="11" />
</g>;
const Sun = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x},${y}) scale(${s})`}>
  {Array.from({ length: 8 }, (_, i) => <path key={i} className="y1-sun-ray" d="M0,-17 L0,-23" transform={`rotate(${i * 45})`} />)}
  <circle className="y1-sun" r="12" />
</g>;
const Rain = ({ x = 0, y = 0 }) => <g transform={`translate(${x},${y})`}>{[-10, 0, 10, -5, 5].map((dx, i) => <path key={i} className="y1-rain" d={`M${dx},${i > 2 ? 12 : 2} l-3,8`} />)}</g>;
const Flake = ({ x = 0, y = 0, r = 4 }) => <g transform={`translate(${x},${y})`} className="y1-flake">{[0, 60, 120].map((a) => <path key={a} d={`M${-r},0 L${r},0`} transform={`rotate(${a})`} />)}</g>;
const Wind = ({ x = 0, y = 0 }) => <g transform={`translate(${x},${y})`}><path className="y1-wind" d="M0,0 L30,0 q8,0 8,-6 q0,-6 -6,-6" /><path className="y1-wind" d="M-6,10 L40,10 q8,0 8,6 q0,6 -6,6" /><path className="y1-wind" d="M4,-12 L18,-12" /></g>;

const SPRITES = {
  // ——— Physical features ———
  beach: () => <><rect className="y1-sky" width="100" height="100" /><Sun x={80} y={20} s={0.7} /><rect className="y1-sea" y="44" width="100" height="22" /><Waves y={58} /><path className="y1-sand" d="M0,62 Q50,54 100,64 L100,100 L0,100 Z" /><path className="y1-shell" d="M30,80 l5,-6 l5,6 Z" /><circle className="y1-roof" cx="68" cy="82" r="4" /></>,
  cliff: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" y="62" width="100" height="38" /><Waves y={74} /><path className="y1-rock" d="M0,30 L52,30 L58,46 L54,58 L62,72 L58,100 L0,100 Z" /><path className="y1-grass" d="M0,26 L54,26 L52,33 L0,33 Z" /><Cloud x={78} y={22} s={0.8} /></>,
  coast: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" width="100" height="100" y="36" /><Waves y={50} /><Waves y={70} /><path className="y1-sand" d="M0,100 L0,40 Q28,46 36,60 Q44,78 70,84 Q86,88 100,100 Z" /><path className="y1-grass" d="M0,100 L0,52 Q20,58 26,70 Q34,86 60,100 Z" /><Boat x={78} y={56} s={0.9} /></>,
  sea: () => <><rect className="y1-sky" width="100" height="100" /><Sun x={20} y={20} s={0.6} /><rect className="y1-sea" y="40" width="100" height="60" /><Waves y={52} /><Waves y={68} /><Waves y={84} /><Boat x={62} y={48} s={0.8} /></>,
  ocean: () => <><rect className="y1-sea-deep" width="100" height="100" /><Waves y={20} /><Waves y={40} /><Waves y={60} /><Waves y={80} /><path className="y1-whale" d="M22,62 q14,-14 34,-4 q6,-6 10,-2 q-4,2 -6,8 q-18,10 -38,-2 Z" /><path className="y1-foam" d="M40,52 q-2,-8 2,-12 M40,52 q4,-6 8,-6" /></>,
  river: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><path className="y1-grass" d="M0,40 L100,40 L100,100 L0,100 Z" /><path className="y1-water" d="M44,40 Q36,56 50,66 Q66,78 52,100 L80,100 Q90,74 70,62 Q56,52 58,40 Z" /><Tree x={20} y={70} s={0.7} /><Tree x={88} y={56} s={0.55} /><path className="y1-hill" d="M0,40 Q25,22 50,40 Q75,24 100,40 Z" /></>,
  hill: () => <><rect className="y1-sky" width="100" height="100" /><Cloud x={24} y={20} s={0.7} /><path className="y1-hill" d="M-10,100 Q40,20 110,100 Z" /><path className="y1-grass" d="M0,100 L0,86 Q50,80 100,86 L100,100 Z" /><Tree x={38} y={64} s={0.4} /><Tree x={56} y={56} s={0.4} /></>,
  mountain: () => <><rect className="y1-sky" width="100" height="100" /><path className="y1-mountain" d="M0,90 L36,18 L58,56 L72,36 L100,90 Z" /><path className="y1-snow" d="M27,36 L36,18 L45,36 L40,32 L36,38 L31,32 Z" /><path className="y1-snow" d="M67,44 L72,36 L77,44 Z" /><Ground /></>,
  valley: () => <><rect className="y1-sky" width="100" height="100" /><path className="y1-mountain" d="M0,20 L42,92 L0,92 Z" /><path className="y1-mountain" d="M100,16 L58,92 L100,92 Z" /><path className="y1-snow" d="M0,20 L8,34 L0,32 Z" /><path className="y1-grass" d="M30,92 L70,92 L62,76 L38,76 Z" /><path className="y1-water" d="M47,76 L53,76 L56,100 L44,100 Z" /><path className="y1-grass" d="M0,92 L100,92 L100,100 L0,100 Z" /></>,
  forest: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><Pine x={14} y={74} s={0.9} /><Pine x={36} y={68} s={1.1} /><Pine x={60} y={74} s={0.95} /><Pine x={84} y={70} s={1.05} /><Tree x={26} y={88} s={0.7} /><Tree x={72} y={88} s={0.75} /></>,
  soil: () => <><rect className="y1-sky" width="100" height="40" /><path className="y1-grass" d="M0,34 L100,34 L100,42 L0,42 Z" /><rect className="y1-soil" y="42" width="100" height="58" /><path className="y1-soil-dark" d="M10,60 q6,-3 12,0 M60,56 q6,-3 12,0 M30,78 q6,-3 12,0 M74,82 q6,-3 12,0" /><path className="y1-worm" d="M44,62 q6,-6 12,0 t12,0" /><circle className="y1-rock" cx="20" cy="88" r="4" /><path className="y1-leaf" d="M50,34 q-4,-12 -12,-14 q2,10 12,14 Z M50,34 q4,-12 12,-14 q-2,10 -12,14 Z" /></>,
  vegetation: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><path className="y1-leaf" d="M10,86 q-2,-20 6,-30 q2,16 -2,30 Z M20,86 q4,-22 14,-26 q-4,18 -10,26 Z" /><circle className="y1-leaf-dark" cx="56" cy="74" r="14" /><circle className="y1-leaf" cx="70" cy="78" r="11" /><circle className="y1-blossom" cx="54" cy="68" r="3" /><circle className="y1-blossom" cx="66" cy="74" r="3" /><path className="y1-leaf" d="M84,86 l2,-20 l3,20 Z M90,86 l4,-16 l1,16 Z" /><circle className="y1-sun" cx="30" cy="62" r="4" /></>,
  tree: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><Tree x={50} y={76} s={1.9} /></>,
  // ——— Human features ———
  house: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><House x={50} y={80} s={1.8} /></>,
  shop: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><rect className="y1-wall-2" x="16" y="32" width="68" height="50" /><path className="y1-awning" d="M12,36 L88,36 L84,48 L16,48 Z" /><path className="y1-cloud" d="M24,36 L30,48 M40,36 L44,48 M56,36 L56,48 M72,36 L68,48" /><rect className="y1-window" x="22" y="54" width="28" height="22" /><rect className="y1-door" x="58" y="54" width="18" height="28" /><rect className="y1-sign" x="30" y="22" width="40" height="10" rx="3" /></>,
  farm: () => <><rect className="y1-sky" width="100" height="100" /><path className="y1-field" d="M0,58 L100,58 L100,100 L0,100 Z" /><path className="y1-soil-dark" d="M0,70 L100,66 M0,82 L100,78 M0,94 L100,90" /><rect className="y1-barn" x="14" y="34" width="36" height="28" /><path className="y1-roof" d="M10,36 L32,20 L54,36 Z" /><rect className="y1-door" x="26" y="44" width="12" height="18" /><path className="y1-cloud" d="M26,44 L38,62 M38,44 L26,62" /><circle className="y1-wall" cx="74" cy="44" r="8" /><circle className="y1-ink" cx="71" cy="42" r="1.5" /><path className="y1-ink-line" d="M74,52 L74,60 M66,62 L82,62" /></>,
  factory: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><rect className="y1-stone" x="10" y="44" width="80" height="40" /><path className="y1-stone" d="M10,44 L24,32 L24,44 L38,32 L38,44 L52,32 L52,44 Z" /><rect className="y1-stone-dark" x="64" y="14" width="10" height="32" /><Cloud x={78} y={10} s={0.5} cls="y1-smoke" /><rect className="y1-window" x="18" y="56" width="12" height="10" /><rect className="y1-window" x="36" y="56" width="12" height="10" /><rect className="y1-door" x="62" y="60" width="18" height="24" /></>,
  office: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><rect className="y1-glass" x="28" y="10" width="44" height="74" />{[18, 30, 42, 54, 66].map((y) => <g key={y}><rect className="y1-window" x="33" y={y} width="10" height="7" /><rect className="y1-window" x="45" y={y} width="10" height="7" /><rect className="y1-window" x="57" y={y} width="10" height="7" /></g>)}<rect className="y1-door" x="44" y="74" width="12" height="10" /></>,
  harbour: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" y="50" width="100" height="50" /><path className="y1-stone" d="M0,46 L100,46 L100,54 L0,54 Z M0,54 L14,54 L14,100 L0,100 Z M86,54 L100,54 L100,100 L86,100 Z" /><Boat x={38} y={72} s={1} /><Boat x={64} y={82} s={0.9} /><House x={22} y={46} s={0.7} /><House x={46} y={46} s={0.6} roof="y1-roof-2" /><House x={72} y={46} s={0.7} /></>,
  port: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" y="58" width="100" height="42" /><rect className="y1-stone" x="0" y="52" width="58" height="10" /><path className="y1-ink-line" d="M44,52 L44,14 L70,14 M64,14 L64,30" /><rect className="y1-crate" x="58" y="30" width="12" height="10" /><rect className="y1-crate" x="8" y="40" width="12" height="12" /><rect className="y1-crate-2" x="20" y="40" width="12" height="12" /><path className="y1-ship" d="M54,66 L98,66 L92,80 L58,80 Z" /><rect className="y1-crate" x="62" y="58" width="10" height="8" /><rect className="y1-crate-2" x="74" y="58" width="10" height="8" /></>,
  village: () => <><rect className="y1-sky" width="100" height="100" /><path className="y1-hill" d="M-10,70 Q50,40 110,70 L110,100 L-10,100 Z" /><path className="y1-grass" d="M0,82 Q50,76 100,82 L100,100 L0,100 Z" /><House x={22} y={80} s={0.8} /><House x={52} y={74} s={0.7} roof="y1-roof-2" /><House x={78} y={82} s={0.8} /><Tree x={38} y={84} s={0.5} /><path className="y1-ink-line" d="M60,48 L60,34 M56,38 L64,38" /><rect className="y1-stone" x="55" y="48" width="10" height="16" /></>,
  town: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><House x={14} y={84} s={0.8} /><rect className="y1-wall-2" x="26" y="50" width="22" height="34" /><rect className="y1-window" x="30" y="56" width="6" height="6" /><rect className="y1-window" x="38" y="56" width="6" height="6" /><rect className="y1-window" x="30" y="68" width="6" height="6" /><rect className="y1-glass" x="52" y="36" width="18" height="48" /><House x={84} y={84} s={0.8} roof="y1-roof-2" /><Tree x={50} y={92} s={0.4} /></>,
  city: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" />{[[4, 40, 16], [20, 18, 14], [34, 30, 16], [50, 8, 14], [64, 26, 16], [80, 36, 16]].map(([x, y, w], i) => <g key={x}><rect className={i % 2 ? "y1-glass" : "y1-stone"} x={x} y={y} width={w} height={84 - y} />{Array.from({ length: Math.floor((80 - y) / 10) }, (_, j) => <rect key={j} className="y1-window" x={x + 4} y={y + 5 + j * 10} width={w - 8} height="4" />)}</g>)}</>,
  school: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><rect className="y1-wall-2" x="14" y="40" width="72" height="42" /><path className="y1-roof" d="M10,42 L50,22 L90,42 Z" /><circle className="y1-cloud" cx="50" cy="34" r="5" /><path className="y1-ink-line" d="M50,34 L50,31 M50,34 L52,35" /><rect className="y1-door" x="44" y="62" width="12" height="20" /><rect className="y1-window" x="20" y="50" width="14" height="10" /><rect className="y1-window" x="66" y="50" width="14" height="10" /><path className="y1-path" d="M44,82 L56,82 L62,100 L38,100 Z" /></>,
  path: () => <><rect className="y1-sky" width="100" height="30" /><rect className="y1-grass" y="30" width="100" height="70" /><path className="y1-path" d="M44,30 L56,30 L84,100 L16,100 Z" /><path className="y1-path-edge" d="M50,36 L50,44 M50,54 L50,64 M50,76 L50,90" /><Tree x={14} y={56} s={0.6} /><Tree x={86} y={60} s={0.6} /></>,
  road: () => <><rect className="y1-sky" width="100" height="30" /><rect className="y1-grass" y="30" width="100" height="70" /><rect className="y1-road" y="50" width="100" height="30" /><path className="y1-road-line" d="M4,65 L20,65 M32,65 L48,65 M60,65 L76,65 M88,65 L100,65" /></>,
  gate: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><rect className="y1-trunk" x="16" y="40" width="8" height="46" /><rect className="y1-trunk" x="76" y="40" width="8" height="46" /><path className="y1-gate" d="M24,50 L76,50 M24,62 L76,62 M24,74 L76,74 M24,74 L76,50" /></>,
  pond: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><path className="y1-grass" d="M0,50 L100,50 L100,100 L0,100 Z" /><ellipse className="y1-water" cx="50" cy="74" rx="38" ry="16" /><ellipse className="y1-leaf" cx="40" cy="72" rx="6" ry="3" /><path className="y1-leaf-dark" d="M80,64 l2,-14 l2,14 M86,64 l3,-10 l1,10" /></>,
  playground: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-path" y="60" width="100" height="40" /><path className="y1-ink-line" d="M16,86 L28,40 L40,86 M28,40 L60,40 M48,86 L60,40 L72,86" /><path className="y1-ink-line" d="M44,40 L44,70 M52,40 L52,70" /><rect className="y1-roof" x="42" y="70" width="12" height="3" /><path className="y1-slide" d="M74,86 L74,50 L80,50 L96,86 Z" /></>,
  // ——— Weather ———
  sunny: () => <><rect className="y1-sky-sunny" width="100" height="100" /><Sun x={50} y={46} s={1.6} /></>,
  cloudy: () => <><rect className="y1-sky-grey" width="100" height="100" /><Cloud x={38} y={42} s={1.3} /><Cloud x={64} y={64} s={1.1} cls="y1-cloud-grey" /></>,
  rainy: () => <><rect className="y1-sky-grey" width="100" height="100" /><Cloud x={50} y={36} s={1.5} cls="y1-cloud-grey" /><Rain x={40} y={54} /><Rain x={60} y={58} /></>,
  windy: () => <><rect className="y1-sky" width="100" height="100" /><Wind x={14} y={40} /><path className="y1-leaf" d="M70,70 q6,-8 12,0 q-6,6 -12,0 Z" /><path className="y1-leaf" d="M24,78 q6,-8 12,0 q-6,6 -12,0 Z" /></>,
  snowy: () => <><rect className="y1-sky-grey" width="100" height="100" /><Cloud x={50} y={30} s={1.4} /><Flake x={30} y={58} /><Flake x={52} y={66} r={5} /><Flake x={72} y={56} /><Flake x={40} y={80} /><Flake x={66} y={84} /><path className="y1-snow" d="M0,90 Q50,84 100,90 L100,100 L0,100 Z" /></>,
  // ——— Seasons: one tree through the year ———
  spring: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><Tree x={50} y={72} s={1.5} leaf="y1-leaf-light" />{[[42, 46], [56, 42], [62, 56], [38, 58], [50, 34]].map(([x, y]) => <circle key={x} className="y1-blossom" cx={x} cy={y} r="3.5" />)}<circle className="y1-sun" cx="18" cy="88" r="3" /><circle className="y1-blossom" cx="84" cy="88" r="3" /></>,
  summer: () => <><rect className="y1-sky-sunny" width="100" height="100" /><Sun x={84} y={16} s={0.8} /><Ground /><Tree x={46} y={72} s={1.6} leaf="y1-leaf-dark" /></>,
  autumn: () => <><rect className="y1-sky" width="100" height="100" /><Ground /><Tree x={50} y={72} s={1.5} leaf="y1-leaf-autumn" /><path className="y1-leaf-autumn" d="M20,80 q4,-6 8,0 q-4,4 -8,0 Z M74,86 q4,-6 8,0 q-4,4 -8,0 Z M30,64 q4,-6 8,0 q-4,4 -8,0 Z" /></>,
  winter: () => <><rect className="y1-sky-grey" width="100" height="100" /><path className="y1-snow" d="M0,82 Q50,76 100,82 L100,100 L0,100 Z" /><g transform="translate(50,72) scale(1.5)"><rect className="y1-trunk" x="-3" y="-4" width="6" height="18" rx="2" /><path className="y1-branch" d="M0,-4 L0,-26 M0,-14 L-12,-24 M0,-10 L12,-22 M-6,-19 L-10,-30 M6,-17 L10,-28" /></g><Flake x={20} y={30} /><Flake x={80} y={24} /><Flake x={70} y={50} /></>,
  // ——— Hot and cold places ———
  hot: () => <><rect className="y1-sky-sunny" width="100" height="100" /><Sun x={78} y={20} s={0.9} /><path className="y1-leaf-dark" d="M0,100 L0,56 Q20,40 40,56 Q60,36 80,54 Q94,44 100,52 L100,100 Z" /><path className="y1-leaf" d="M0,100 L0,74 Q24,62 46,76 Q70,60 100,72 L100,100 Z" /><path className="y1-water" d="M40,100 Q46,88 60,84 Q72,82 76,100 Z" /></>,
  cold: () => <><rect className="y1-sky-polar" width="100" height="100" /><path className="y1-ice" d="M0,62 L20,40 L34,56 L52,30 L70,52 L84,44 L100,60 L100,100 L0,100 Z" /><rect className="y1-sea-deep" y="78" width="100" height="22" /><path className="y1-ice" d="M14,80 L30,80 L26,88 L18,88 Z M62,84 L80,84 L76,92 L64,92 Z" /><Flake x={20} y={18} /><Flake x={60} y={14} /></>,
  island: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" y="50" width="100" height="50" /><Waves y={80} /><path className="y1-sand" d="M14,66 Q40,40 66,62 Q78,60 88,68 Z" /><path className="y1-hill" d="M22,62 Q42,30 62,60 Z" /><path className="y1-sand" d="M70,82 Q78,74 90,82 Z" /><Cloud x={74} y={22} s={0.7} /></>,
  causeway: () => <><rect className="y1-sky" width="100" height="100" /><rect className="y1-sea" y="56" width="100" height="44" /><Waves y={88} />{[[10, 54], [24, 58], [38, 62], [52, 66], [66, 72], [80, 78]].map(([x, y]) => <g key={x}><rect className="y1-stone-dark" x={x} y={y} width="13" height={100 - y} /><path className="y1-stone" d={`M${x},${y} l3,-4 l7,0 l3,4 Z`} /></g>)}<path className="y1-grass" d="M0,40 L30,40 Q20,52 0,56 Z" /></>,
  // ——— City landmarks (decorative captions only) ———
  clocktower: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><rect className="y1-stone-warm" x="40" y="26" width="20" height="58" /><path className="y1-stone-warm" d="M40,26 L50,8 L60,26 Z" /><circle className="y1-cloud" cx="50" cy="36" r="6" /><path className="y1-ink-line" d="M50,36 L50,32 M50,36 L53,37" /><rect className="y1-stone-warm" x="8" y="60" width="32" height="24" /><rect className="y1-stone-warm" x="60" y="60" width="32" height="24" /><rect className="y1-water" x="0" y="92" width="100" height="8" /></>,
  castle: () => <><rect className="y1-sky" width="100" height="100" /><path className="y1-rock" d="M0,100 L0,70 Q30,56 50,62 Q74,54 100,70 L100,100 Z" /><rect className="y1-stone" x="22" y="34" width="56" height="30" /><path className="y1-stone" d="M22,34 L22,28 L28,28 L28,34 M34,34 L34,28 L40,28 L40,34 M46,34 L46,28 L52,28 L52,34 M58,34 L58,28 L64,28 L64,34 M70,34 L70,28 L78,28 L78,34" /><rect className="y1-stone-dark" x="26" y="18" width="14" height="46" /><rect className="y1-door" x="44" y="48" width="12" height="16" /><path className="y1-flag" d="M33,18 L33,6 L43,9 L33,12" /></>,
  stadium: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-path" /><path className="y1-glass" d="M8,82 L12,50 Q50,38 88,50 L92,82 Z" /><path className="y1-ink-line" d="M14,50 L10,22 M86,50 L90,22 M36,44 L34,18 M64,44 L66,18 M10,22 L36,44 M90,22 L64,44" /><path className="y1-grass" d="M24,76 Q50,70 76,76 L76,82 L24,82 Z" /></>,
  cityhall: () => <><rect className="y1-sky" width="100" height="100" /><Ground cls="y1-grass" /><rect className="y1-stone-warm" x="10" y="50" width="80" height="34" /><rect className="y1-stone-warm" x="38" y="34" width="24" height="18" /><path className="y1-dome" d="M38,34 Q50,8 62,34 Z" /><path className="y1-ink-line" d="M50,14 L50,6" />{[16, 26, 66, 76].map((x) => <rect key={x} className="y1-window" x={x} y="58" width="6" height="12" />)}<rect className="y1-door" x="44" y="64" width="12" height="20" /></>,
  // ——— Map symbols (flat, for keys) ———
  "sym-house": () => <><rect className="y1-paper" width="100" height="100" /><rect className="y1-wall" x="30" y="40" width="40" height="34" /><path className="y1-roof" d="M24,42 L50,20 L76,42 Z" /></>,
  "sym-tree": () => <><rect className="y1-paper" width="100" height="100" /><circle className="y1-leaf" cx="50" cy="42" r="22" /><rect className="y1-trunk" x="46" y="60" width="8" height="20" /></>,
  "sym-pond": () => <><rect className="y1-paper" width="100" height="100" /><ellipse className="y1-water" cx="50" cy="50" rx="34" ry="22" /><path className="y1-foam" d="M30,46 q5,-4 10,0 t10,0 t10,0 M36,58 q5,-4 10,0 t10,0" /></>,
  "sym-path": () => <><rect className="y1-paper" width="100" height="100" /><path className="y1-sym-path" d="M10,50 L90,50" /></>,
  "sym-shop": () => <><rect className="y1-paper" width="100" height="100" /><path className="y1-wall-2" d="M50,18 L82,50 L50,82 L18,50 Z" /></>,
  "sym-gate": () => <><rect className="y1-paper" width="100" height="100" /><path className="y1-sym-gate" d="M30,76 L30,24 M70,76 L70,24 M30,40 L70,40 M30,60 L70,60" /></>,
  "sym-play": () => <><rect className="y1-paper" width="100" height="100" /><path className="y1-sun" d="M50,16 L59,40 L84,40 L64,55 L72,80 L50,65 L28,80 L36,55 L16,40 L41,40 Z" /></>,
  "sym-school": () => <><rect className="y1-paper" width="100" height="100" /><rect className="y1-wall-2" x="22" y="36" width="56" height="40" /><path className="y1-roof" d="M16,38 L50,16 L84,38 Z" /><rect className="y1-door" x="44" y="56" width="12" height="20" /></>,
};

/** One illustration. `label` adds an accessible name only when the sprite stands alone. */
export function Sprite({ name, x = 0, y = 0, size = 100, clip = true }) {
  const id = `y1-clip${useId().replace(/:/g, "")}`;
  const draw = SPRITES[name];
  if (!draw) return null;
  return <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className="y1-sprite">
    {clip && <defs><clipPath id={id}><rect width="100" height="100" rx="12" /></clipPath></defs>}
    <g clipPath={clip ? `url(#${id})` : undefined}>{draw()}</g>
  </svg>;
}

export { Tree, Pine, House, Cloud, Sun, Boat, Waves };
