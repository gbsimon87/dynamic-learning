// Small hand-drawn pictures for the Year 5 Design and Technology figures. Each
// is drawn in a 100 x 70 box so it works full size and as a card.
const dots = (n, f) => Array.from({ length: n }, (_, i) => f(i));
const gearShape = (cx, cy, r, teeth, cls) => <g key={`${cx}${cy}`}>
  {dots(teeth, (i) => <rect key={i} className={`${cls} kk`} x={cx - 2.4} y={cy - r - 4} width="4.8" height="6" transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`} />)}
  <circle className={`${cls} kk`} cx={cx} cy={cy} r={r} /><circle className="paper kk" cx={cx} cy={cy} r={r / 4} />
</g>;

export const PICTURES = {
  laptopBag: ["A zipped padded bag with a laptop sticking out of the top.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="28" y="10" width="44" height="14" rx="2" />
    <path className="f-roof2 kk" d="M16 26 H84 V62 Q84 66 80 66 H20 Q16 66 16 62Z" /><path className="ln1 s-foam dash" style={{ strokeWidth: 1.6 }} d="M22 34 H78 M22 58 H78" /><path className="ln s-ink nofill" d="M38 26 C38 14 62 14 62 26" style={{ strokeWidth: 2 }} />
  </g>],
  toddlerToy: ["A toy for toddlers: three big soft rings stacked on a pole.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk kk" x="46" y="8" width="8" height="56" rx="3" /><ellipse className="f-roof kk" cx="50" cy="58" rx="26" ry="8" /><ellipse className="f-sun kk" cx="50" cy="44" rx="20" ry="7" /><ellipse className="f-sea kk" cx="50" cy="31" rx="14" ry="6" /><circle className="f-leaf kk" cx="50" cy="12" r="6" />
  </g>],
  lunchbox: ["A lunch box holding a sandwich, with a drink bottle that is leaking onto it.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-sea kk" x="10" y="36" width="50" height="28" rx="4" /><path className="f-wall2 kk" d="M18 36 L36 18 L54 36Z" />
    <rect className="f-roof2 kk" x="68" y="14" width="14" height="40" rx="4" transform="rotate(14 75 34)" />
    {[[70, 58], [78, 64], [66, 66]].map(([x, y]) => <path key={x} className="f-window kk" d={`M${x} ${y - 4} q3 4 0 6 q-3 -2 0 -6Z`} />)}
  </g>],
  cardChair: ["A small chair made from folded and glued card, a quick model.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="f-wall2 kk" d="M30 10 H62 V36 H30Z" /><path className="f-wall2 kk" d="M26 36 H68 L76 46 H34Z" /><path className="f-wall2 kk" d="M34 46 H76 V50 H34Z M34 50 V64 H40 V50 M70 50 V64 H76 V50" />
  </g>],
  tv: ["A television with a bright screen standing on a small table.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stonedark kk" x="14" y="10" width="72" height="44" rx="5" /><rect className="f-window kk" x="20" y="16" width="60" height="32" rx="2" /><path className="f-sun kk" d="M38 24 L38 40 L56 32Z" />
    <rect className="f-trunk kk" x="30" y="56" width="40" height="6" />
  </g>],
  roadSigns: ["Two road signs on poles: a triangle warning sign and a round blue sign.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-stone kk" x="26" y="30" width="3" height="40" /><rect className="f-stone kk" x="72" y="30" width="3" height="40" />
    <path className="f-foam kk" d="M27 6 L44 36 H10Z" style={{ stroke: "var(--v-roof)", strokeWidth: 4 }} /><path className="ink" d="M26 16 h3 v10 h-3Z" /><circle className="f-roof2 kk" cx="73" cy="22" r="14" /><path className="ln s-foam nofill" d="M66 22 H80 M74 16 L80 22 L74 28" style={{ strokeWidth: 3 }} />
  </g>],
  ship: ["A big iron steamship with a tall funnel and puffing smoke, sailing on the sea.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-sea" y="48" width="100" height="22" />
    <path className="f-stonedark kk" d="M8 40 H92 L82 56 H20Z" /><rect className="f-wall kk" x="30" y="30" width="36" height="10" /><rect className="f-roof kk" x="44" y="14" width="10" height="16" />
    <circle className="f-cloud" cx="58" cy="10" r="5" /><circle className="f-cloud" cx="68" cy="6" r="4" /><path className="ln1 s-ink" d="M20 40 V20 M80 40 V24" style={{ strokeWidth: 1.5 }} />
  </g>],
  vacuum: ["An upright vacuum cleaner with a clear dust container and no bag.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-window kk" x="38" y="26" width="24" height="26" rx="6" /><rect className="f-roof kk" x="36" y="50" width="28" height="8" rx="3" /><path className="f-roof kk" d="M20 62 H80 L74 58 H26Z" />
    <path className="ln s-ink nofill" d="M50 26 V12 H62 M62 12 L72 6" style={{ strokeWidth: 3 }} /><circle className="f-stone kk" cx="30" cy="64" r="4" /><circle className="f-stone kk" cx="70" cy="64" r="4" />
  </g>],
  codeCard: ["A card with neat rows of punched holes, like an early computer programme.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-wall2 kk" x="12" y="10" width="76" height="50" rx="3" />
    {dots(24, (i) => <rect key={i} className="paper kk" x={20 + (i % 8) * 8.4} y={18 + Math.floor(i / 8) * 13} width="5" height="7" opacity={(i * 5) % 7 < 3 ? 1 : 0.15} />)}
  </g>],
  browser: ["A web browser window with an address bar and a globe made of crossing lines.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-foam kk" x="8" y="8" width="84" height="54" rx="4" /><rect className="f-stone kk" x="8" y="8" width="84" height="10" rx="4" /><rect className="paper kk" x="14" y="10" width="50" height="6" rx="3" />
    <circle className="f-sea kk" cx="50" cy="40" r="16" /><path className="ln1 s-foam nofill" style={{ strokeWidth: 1.4 }} d="M34 40 H66 M50 24 V56 M40 28 Q50 40 40 52 M60 28 Q50 40 60 52" />
  </g>],
  annotated: ["A sketch of a mug with a note and an arrow pointing to its handle.", <g key="a">
    <rect className="sheet" width="100" height="70" /><path className="gl" d="M18 22 H46 V54 Q46 62 38 62 H26 Q18 62 18 54Z M46 28 Q60 28 60 40 Q60 52 46 50" /><path className="gl" d="M62 40 L78 22 M78 22 l-6 1 M78 22 l-1 6" />
  </g>],
  fabricPattern: ["Paper pattern pieces laid on a piece of fabric, ready to be cut out.", <g key="a">
    <rect className="f-roof2 kk" width="100" height="70" /><path className="paper kk" d="M12 12 H40 L46 30 H12Z" /><path className="paper kk" d="M54 14 Q80 8 88 30 Q74 40 54 34Z" /><path className="paper kk" d="M14 40 H44 V62 H14Z" /><path className="ln1 s-ink dash" d="M54 48 H88 M54 56 H80" style={{ strokeWidth: 1.4 }} />
  </g>],
  clamp: ["A piece of wood held still on a bench by a G-clamp.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk kk" x="6" y="52" width="88" height="10" /><rect className="f-wall2 kk" x="26" y="38" width="46" height="14" />
    <path className="ln s-ink nofill" d="M64 24 H80 V62 H64" style={{ strokeWidth: 5 }} /><path className="ln s-ink nofill" d="M72 24 V38" style={{ strokeWidth: 3 }} /><circle className="f-roof kk" cx="72" cy="22" r="5" />
  </g>],
  cutAway: ["A saw cutting a piece of wood, with an arrow showing the saw moving away from the person's hand.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-wall2 kk" x="10" y="44" width="70" height="12" /><circle className="f-wall kk" cx="14" cy="34" r="6" />
    <path className="f-stone kk" d="M30 28 L60 38 L58 42 L28 32Z" /><rect className="f-trunk kk" x="56" y="34" width="14" height="8" rx="3" />
    <path className="ln s-roof nofill" d="M86 24 H56 M62 18 L54 24 L62 30" style={{ strokeWidth: 3 }} />
  </g>],
  goggles: ["A pair of clear safety goggles with a strap.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="ln s-ink nofill" d="M4 36 H16 M84 36 H96" style={{ strokeWidth: 5 }} /><rect className="f-window kk" x="14" y="22" width="30" height="26" rx="10" /><rect className="f-window kk" x="56" y="22" width="30" height="26" rx="10" /><path className="ln s-ink nofill" d="M44 34 H56" style={{ strokeWidth: 4 }} />
  </g>],
  adult: ["A tall adult figure beside a smaller child figure, with a question mark above the child.", <g key="a">
    <rect className="f-wall" width="100" height="70" />
    {[[34, 62, 0.64], [70, 62, 0.4]].map(([x, y, s]) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`} className="ln s-ink"><circle className="f-wall2 k" cx="0" cy="-75" r="9" /><path className="nofill" style={{ strokeWidth: 5 }} d="M0 -65 V-34 M0 -60 L-14 -40 M0 -60 L14 -40 M0 -34 L-14 0 M0 -34 L14 0" /></g>)}
    <path className="f-sun kk" d="M62 6 h16 v10 h-9 l-4 5 v-5 h-3Z" /><circle className="ink" cx="66" cy="11" r="1" /><circle className="ink" cx="70" cy="11" r="1" /><circle className="ink" cx="74" cy="11" r="1" />
  </g>],
  copingSaw: ["A coping saw: a D-shaped frame with a handle and a very thin blade.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="ln s-ink nofill" d="M16 14 H80 M16 56 H80 M16 14 C2 14 2 56 16 56" style={{ strokeWidth: 3 }} /><line className="ln1 s-ink" x1="80" y1="14" x2="80" y2="56" style={{ strokeWidth: 1.2 }} />
    <path className="f-trunk kk" d="M80 28 H96 V42 H80Z" />{dots(8, (i) => <path key={i} className="ln1 s-ink" d={`M${82 + (i % 4) * 2} ${16 + i * 5} l2 2`} style={{ strokeWidth: 0.8 }} />)}
  </g>],
  benchHook: ["A bench hook: a flat board with a block on each side that holds wood steady for sawing.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-wall2 kk" x="8" y="22" width="84" height="34" rx="2" /><rect className="f-trunk kk" x="14" y="14" width="10" height="16" /><rect className="f-trunk kk" x="76" y="48" width="10" height="16" /><rect className="f-sand kk" x="30" y="30" width="46" height="14" />
  </g>],
  trySquare: ["A try square: a thick handle with a thin metal blade at a right angle, with small ruler marks.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk kk" x="14" y="10" width="14" height="52" rx="2" /><rect className="f-stone kk" x="28" y="10" width="62" height="10" />
    {dots(10, (i) => <line key={i} className="ln1 s-ink" x1={34 + i * 5.5} y1="10" x2={34 + i * 5.5} y2={i % 2 ? 15 : 18} style={{ strokeWidth: 1 }} />)}
  </g>],
  sandpaper: ["A sheet of rough sandpaper wrapped round a small block.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-sand kk" x="10" y="22" width="80" height="30" rx="3" />
    {dots(40, (i) => <circle key={i} className="f-soil" cx={14 + (i % 10) * 8.2 + (Math.floor(i / 10) % 2) * 3} cy={27 + Math.floor(i / 10) * 7} r="1.2" />)}
  </g>],
  glueTape: ["A glue bottle and a roll of sticky tape.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="f-foam kk" d="M16 26 H40 V62 H16Z" /><path className="f-roof kk" d="M20 8 H36 L40 26 H16Z" /><rect className="f-sun kk" x="20" y="38" width="16" height="14" />
    <circle className="f-sun kk" cx="70" cy="40" r="20" /><circle className="paper kk" cx="70" cy="40" r="9" /><path className="f-sun kk" d="M88 52 H98 V58 H84Z" />
  </g>],
  stitching: ["Two pieces of fabric joined by a line of stitches, with a needle and thread.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-roof2 kk" x="8" y="14" width="40" height="44" /><rect className="f-roof kk" x="52" y="14" width="40" height="44" />
    <path className="ln s-sun nofill dash" d="M50 12 V60" style={{ strokeWidth: 3 }} /><path className="ln1 s-ink nofill" d="M60 8 L84 34" style={{ strokeWidth: 1.5 }} />
  </g>],
  nutBolt: ["A bolt passing through two metal plates, held by a hexagon-shaped nut.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="14" y="26" width="72" height="8" /><rect className="f-stone kk" x="14" y="36" width="72" height="8" />
    <rect className="f-stonedark kk" x="46" y="8" width="8" height="52" /><path className="f-stonedark kk" d="M36 10 L42 4 H58 L64 10 L58 16 H42Z" /><path className="f-stonedark kk" d="M38 48 L44 42 H56 L62 48 L56 54 H44Z" />
  </g>],
  nailScrew: ["A nail and a screw, each pushed into a block of wood.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-wall2 kk" x="8" y="38" width="84" height="26" /><path className="f-stonedark kk" d="M26 8 H38 V12 H33 V46 H31 V12 H26Z" />
    <path className="f-stonedark kk" d="M64 10 H78 V14 H73 V46 H69 V14 H64Z" />{[22, 28, 34, 40].map((y) => <path key={y} className="ln1 s-ink" d={`M69 ${y} l4 -2`} style={{ strokeWidth: 1 }} />)}
  </g>],
  braceFrame: ["A square frame made of four sticks with one diagonal stick across it, so it cannot fold.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="nofill s-trunk" x="24" y="10" width="52" height="50" style={{ strokeWidth: 5 }} /><path className="ln s-roof nofill" d="M24 60 L76 10" style={{ strokeWidth: 5 }} />
    {[[24, 10], [76, 10], [24, 60], [76, 60]].map(([x, y]) => <circle key={`${x}${y}`} className="f-stone kk" cx={x} cy={y} r="3.4" />)}
  </g>],
  foldCard: ["A flat sheet of card bending in the middle, next to a sheet folded into zigzags that stays straight.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="f-wall2 kk" d="M6 40 Q20 54 34 50 L36 56 Q20 60 4 46Z" /><path className="f-wall2 kk" d="M52 30 L58 44 L64 30 L70 44 L76 30 L82 44 L88 30 V36 L82 50 L76 36 L70 50 L64 36 L58 50 L52 36Z" />
  </g>],
  forces: ["A column being squeezed from above by two arrows pointing in, and a rope being pulled apart by two arrows pointing out.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="16" y="26" width="16" height="32" /><path className="ln s-roof nofill" d="M24 4 V22 M18 16 L24 24 L30 16" style={{ strokeWidth: 3 }} />
    <path className="ln s-trunk nofill" d="M50 40 H92" style={{ strokeWidth: 5 }} /><path className="ln s-roof nofill" d="M50 40 H42 M46 34 L40 40 L46 46 M92 40 H100 M96 34 L102 40 L96 46" style={{ strokeWidth: 3 }} />
  </g>],
  base: ["Two towers of blocks: a tall narrow tower beside a wide-based tower that is just as tall.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="6" y="62" width="88" height="3" />
    {dots(5, (i) => <rect key={i} className="f-sun kk" x="16" y={52 - i * 10} width="12" height="10" />)}
    {[[48, 52, 40], [54, 42, 28], [60, 32, 16]].map(([x, y, w]) => <rect key={y} className="f-sea kk" x={x} y={y} width={w} height="10" />)}
  </g>],
  towerTall: ["A tall thin tower of blocks on a narrow base, leaning over and about to fall.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="10" y="62" width="80" height="3" />
    <g transform="rotate(10 50 62)">{dots(6, (i) => <rect key={i} className="f-roof kk" x="43" y={52 - i * 9.5} width="14" height="9.5" />)}</g>
  </g>],
  frameFolds: ["A square frame being pushed at the corner so it folds sideways into a slanted shape.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="nofill s-trunk" d="M20 60 H64 L84 10 H40Z" style={{ strokeWidth: 5 }} /><path className="ln s-roof nofill dash" d="M20 60 V10 H60 V60Z" style={{ strokeWidth: 1.5 }} />
    <path className="ln s-roof nofill" d="M98 8 L86 12 M90 6 L98 8 L96 14" style={{ strokeWidth: 3 }} />
  </g>],
  plank: ["A heavy rock sitting on the end of a long plank, with a hand ready to push down on the other end.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-grass" y="56" width="100" height="14" /><path className="f-wall2 kk" d="M6 52 L94 40 V46 L6 58Z" />
    <path className="f-stone kk" d="M10 52 L12 34 L26 28 L36 38 L34 52Z" /><path className="ln s-roof nofill" d="M84 8 V30 M78 24 L84 32 L90 24" style={{ strokeWidth: 3 }} />
  </g>],
  spade: ["A spade pushed into the ground, lifting a scoop of soil on its blade.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-soil" y="54" width="100" height="16" /><path className="ln s-trunk nofill" d="M80 4 L40 36" style={{ strokeWidth: 5 }} /><path className="f-stone kk" d="M30 34 L50 30 L54 42 L36 54Z" />
    <path className="f-soil kk" d="M26 30 Q34 20 46 26 L36 36Z" /><path className="ln s-roof nofill" d="M92 14 L84 26 M82 18 L84 28 L92 24" style={{ strokeWidth: 3 }} />
  </g>],
  wheelbarrow: ["A wheelbarrow with a load of soil in the tray, a wheel at the front and handles at the back.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-grass" y="60" width="100" height="10" /><path className="f-roof2 kk" d="M26 22 H66 L58 44 H34Z" /><path className="f-soil kk" d="M30 22 Q46 8 62 22Z" />
    <path className="ln s-trunk nofill" d="M60 36 L96 28 M34 40 L20 60" style={{ strokeWidth: 4 }} /><circle className="f-stonedark kk" cx="26" cy="54" r="10" /><circle className="paper kk" cx="26" cy="54" r="3" />
  </g>],
  gearsMeshed: ["Two gears with teeth that fit together, one small and one large.", <g key="a">
    <rect className="f-wall" width="100" height="70" />{gearShape(32, 36, 14, 10, "f-sun")}{gearShape(68, 36, 22, 16, "f-roof2")}
  </g>],
  pulleyBelt: ["Two pulley wheels of different sizes joined by a belt: a small wheel on the left and a large wheel on the right.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="ln s-ink nofill" d="M30 24 L60 8 M30 50 L60 62" style={{ strokeWidth: 2.5 }} /><circle className="f-sun kk" cx="26" cy="37" r="13" /><circle className="f-roof2 kk" cx="66" cy="35" r="27" /><circle className="paper kk" cx="26" cy="37" r="3" /><circle className="paper kk" cx="66" cy="35" r="4" />
  </g>],
  camFollower: ["An egg-shaped cam on a turning shaft with a rod resting on top of it, called the follower.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><ellipse className="f-roof kk" cx="50" cy="46" rx="20" ry="14" transform="rotate(-20 50 46)" /><circle className="ink" cx="50" cy="46" r="3" />
    <rect className="f-stone kk" x="44" y="6" width="12" height="22" /><rect className="f-stone kk" x="36" y="26" width="28" height="4" />
  </g>],
  pulleyBucket: ["A rope running over a wheel at the top, with a bucket hanging from one end and a hand pulling the other end.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="ln s-ink nofill" d="M50 4 V12" style={{ strokeWidth: 3 }} /><circle className="f-stone kk" cx="50" cy="20" r="10" /><circle className="ink" cx="50" cy="20" r="2" />
    <path className="ln s-trunk nofill" d="M40 20 V44 M60 20 V56" style={{ strokeWidth: 2 }} /><path className="f-roof2 kk" d="M30 44 H50 L47 58 H33Z" /><circle className="f-wall2 kk" cx="60" cy="60" r="5" />
  </g>],
  section: ["A product cut in half so you can see inside: a battery and a bulb sitting in a hollow box.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="f-stone kk" d="M10 10 H90 V62 H10Z" />{dots(7, (i) => <line key={i} className="ln1 s-ink" x1={12 + i * 4} y1="10" x2={4 + i * 4 + 8} y2="18" style={{ strokeWidth: 0.8 }} />)}
    <rect className="paper kk" x="18" y="18" width="64" height="36" /><rect className="f-roof kk" x="24" y="34" width="22" height="14" rx="2" /><circle className="f-sun kk" cx="64" cy="34" r="9" /><path className="ln s-ink nofill" d="M46 41 H56 M64 43 V50" style={{ strokeWidth: 1.4 }} />
  </g>],
  exploded: ["An exploded diagram: the lid, the middle and the base of a box drawn apart, joined by dashed lines to show how they fit.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="ln s-ink dash nofill" d="M50 4 V66" style={{ strokeWidth: 1.5 }} />
    <rect className="f-roof kk" x="28" y="6" width="44" height="12" rx="3" /><rect className="f-sun kk" x="32" y="26" width="36" height="16" /><rect className="f-roof2 kk" x="26" y="52" width="48" height="12" rx="3" />
  </g>],
  net: ["A flat net made of six squares in a cross shape that folds up into a cube, with dashed fold lines.", <g key="a">
    <rect className="f-wall" width="100" height="70" />{[[38, 2], [38, 20], [38, 38], [38, 56]].map(([x, y]) => <rect key={y} className="f-wall2 kk" x={x} y={y} width="18" height={y === 56 ? 12 : 18} />)}
    <rect className="f-wall2 kk" x="20" y="20" width="18" height="18" /><rect className="f-wall2 kk" x="56" y="20" width="18" height="18" />
    <path className="ln1 s-roof dash nofill" d="M38 20 H56 M38 38 H56 M38 20 V38 M56 20 V38" style={{ strokeWidth: 1 }} />
  </g>],
  handWash: ["A tap running water over a pair of hands covered in soap bubbles.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><path className="f-stone kk" d="M30 6 H60 V14 H42 V22 H34 V14 H30Z" /><path className="f-window" d="M38 24 q-4 10 0 16 q4 -6 0 -16Z" />
    <ellipse className="f-wall2 kk" cx="46" cy="52" rx="26" ry="10" />{[[34, 48], [48, 44], [58, 52], [40, 56]].map(([x, y]) => <circle key={x} className="f-foam kk" cx={x} cy={y} r="4" />)}
  </g>],
  rawApart: ["Two chopping boards kept apart: raw red meat on one, fresh vegetables on the other, with a dashed line between them.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-wall2 kk" x="6" y="16" width="38" height="40" rx="4" /><rect className="f-wall2 kk" x="56" y="16" width="38" height="40" rx="4" />
    <path className="f-roof kk" d="M14 30 Q24 22 34 30 Q38 42 24 46 Q12 44 14 30Z" /><circle className="f-leaf kk" cx="68" cy="34" r="7" /><circle className="f-roof kk" cx="82" cy="44" r="6" />
    <path className="ln s-ink dash nofill" d="M50 8 V62" style={{ strokeWidth: 2 }} />
  </g>],
  fridge: ["A tall fridge with a door handle and a snowflake on the front, showing it keeps food cold.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-foam kk" x="28" y="4" width="44" height="62" rx="5" /><line className="ln s-ink" x1="28" y1="26" x2="72" y2="26" style={{ strokeWidth: 2 }} /><rect className="f-stone kk" x="62" y="12" width="4" height="10" /><rect className="f-stone kk" x="62" y="32" width="4" height="16" />
    <path className="ln s-sea nofill" d="M44 46 V60 M38 53 H50 M40 48 L48 58 M48 48 L40 58" style={{ strokeWidth: 2 }} />
  </g>],
  hotPan: ["A pan on a cooker ring with steam rising from the food, showing it is piping hot.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stonedark kk" x="8" y="56" width="84" height="10" /><path className="f-stone kk" d="M24 34 H70 V52 Q70 56 66 56 H28 Q24 56 24 52Z" /><path className="ln s-ink nofill" d="M70 38 H94" style={{ strokeWidth: 5 }} />
    <path className="ln s-ink nofill" d="M34 28 q-6 -8 0 -14 q6 -6 0 -10 M48 28 q-6 -8 0 -14 q6 -6 0 -10 M60 28 q-6 -8 0 -14 q6 -6 0 -10" style={{ strokeWidth: 2, opacity: 0.6 }} /><ellipse className="f-roof" cx="47" cy="38" rx="20" ry="3" />
  </g>],
};
export const PICTURE_KINDS = Object.keys(PICTURES);
