// Small hand-drawn pictures for the Year 5 Art figures. Each one is drawn in a
// 100 x 70 box, so the same picture works full size and as a card. These are
// simple child-friendly drawings in the style of a work, never copies of it.
const dots = (n, f) => Array.from({ length: n }, (_, i) => f(i));
const TILE = ["roof", "sea", "sun", "leaf", "door"];

export const PICTURES = {
  swirlSky: ["A night sky full of swirling brush strokes over a sleepy village, with a bright moon and stars.", <g key="a">
    <rect className="f-night" width="100" height="70" />
    <circle className="f-sun" cx="82" cy="14" r="7" />
    {[[18, 10], [42, 8], [62, 22], [34, 24], [92, 34]].map(([x, y]) => <circle key={x} className="f-sun" cx={x} cy={y} r="1.8" />)}
    <path className="s-sea nofill" style={{ strokeWidth: 2.6 }} d="M8 30 C14 14 34 18 30 30 S14 36 16 28 M44 24 C50 10 70 14 66 26 S52 32 54 24 M60 42 C66 32 82 36 78 42" />
    <path className="f-leafdark" d="M10 70 C4 50 8 30 13 18 C18 30 22 50 18 70Z" />
    {[[34, 56, 10, 14], [46, 52, 8, 18], [56, 58, 12, 12]].map(([x, y, w, h]) => <g key={x}><rect className="f-stonedark" x={x} y={y} width={w} height={h} /><rect className="f-sun" x={x + 2} y={y + 4} width="2.4" height="3" /></g>)}
  </g>],
  wave: ["A huge curling blue wave with white foam, and a small snowy mountain behind it.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    <path className="f-mountain kk" d="M58 52 L74 28 L92 52Z" /><path className="f-snow" d="M68 36 L74 28 L80 36Z" />
    <path className="f-deep kk" d="M0 70 C0 40 18 14 46 12 C60 12 66 22 58 25 C50 21 40 25 37 34 C35 43 41 50 52 52 L100 56 V70Z" />
    {[[56, 16], [48, 12], [40, 14], [34, 20]].map(([x, y]) => <circle key={x} className="f-foam" cx={x} cy={y} r="3" />)}
    <path className="f-foam" d="M0 62 Q10 56 20 62 T40 62 T60 62 T80 62 T100 62 V70 H0Z" />
  </g>],
  lilies: ["A pond covered with green lily pads and pink water lilies.", <g key="a">
    <rect className="f-sea" width="100" height="70" />
    <path className="s-deep nofill" style={{ strokeWidth: 1.2 }} d="M0 14 Q15 8 30 14 T60 14 T100 14 M0 58 Q20 52 40 58 T80 58 T100 56" />
    {[[24, 46, 15, 6], [60, 30, 17, 7], [82, 54, 12, 5], [38, 18, 11, 5]].map(([x, y, rx, ry]) => <ellipse key={x} className="f-leaf kk" cx={x} cy={y} rx={rx} ry={ry} />)}
    {[[28, 44], [62, 28], [84, 52], [38, 16]].map(([x, y]) => <g key={x}><circle className="f-blossom kk" cx={x} cy={y} r="4" /><circle className="f-sun" cx={x} cy={y} r="1.3" /></g>)}
  </g>],
  cans: ["Four soup cans in a grid, each on a bright coloured background, like a pop art print.", <g key="a">
    {[0, 1, 2, 3].map((i) => { const x = (i % 2) * 50, y = Math.floor(i / 2) * 35; return <g key={i}>
      <rect className={`f-${["sun", "blossom", "sea", "leaflight"][i]}`} x={x} y={y} width="50" height="35" />
      <rect className="f-foam kk" x={x + 16} y={y + 5} width="18" height="26" rx="2" /><rect className="f-roof" x={x + 16} y={y + 12} width="18" height="10" />
      <ellipse className="f-stone kk" cx={x + 25} cy={y + 5} rx="9" ry="2" /></g>; })}
  </g>],
  dots: ["A picture made of lots of tiny dots of different colours.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(60, (i) => <circle key={i} className={`f-${TILE[(i * 7 + Math.floor(i / 10) * 3) % 5]}`} cx={5 + (i % 10) * 10 + (Math.floor(i / 10) % 2) * 3} cy={6 + Math.floor(i / 10) * 11} r="3.2" />)}
  </g>],
  flower: ["A flower painted very close up, with big pink petals filling the whole picture.", <g key="a">
    <rect className="f-leaflight" width="100" height="70" />
    {dots(8, (i) => <ellipse key={i} className="f-blossom kk" cx="50" cy="35" rx="34" ry="11" transform={`rotate(${i * 22.5} 50 35) translate(18 0)`} />)}
    <circle className="f-door kk" cx="50" cy="35" r="9" /><circle className="f-sun" cx="50" cy="35" r="3" />
  </g>],
  grid: ["A grid of thick black lines with blocks of red, blue and yellow and white squares.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    <rect className="f-roof" x="0" y="0" width="30" height="20" /><rect className="f-sea" x="77" y="52" width="23" height="18" /><rect className="f-sun" x="0" y="52" width="30" height="18" /><rect className="f-roof2" x="77" y="0" width="23" height="8" />
    {[30, 77].map((x) => <rect key={x} className="graphite" x={x - 1.5} y="0" width="3" height="70" />)}{[20, 52].map((y) => <rect key={y} className="graphite" x="0" y={y - 1.5} width="100" height="3" />)}
  </g>],
  matchstick: ["Tiny stick-like people walking past tall factory chimneys and rows of houses.", <g key="a">
    <rect className="f-wall" width="100" height="70" />
    {[[6, 26, 16, 36], [26, 14, 12, 48], [44, 30, 20, 32], [70, 20, 14, 42]].map(([x, y, w, h]) => <rect key={x} className="f-stonedark kk" x={x} y={y} width={w} height={h} />)}
    <rect className="f-stonedark kk" x="30" y="4" width="4" height="12" /><rect className="f-stonedark kk" x="74" y="8" width="4" height="14" />
    <rect className="f-stone" x="0" y="62" width="100" height="8" />
    {[12, 30, 48, 62, 80, 90].map((x) => <path key={x} className="ln1 s-ink" style={{ strokeWidth: 1.2 }} d={`M${x} 62 l-2 6 M${x} 62 l2 6 M${x} 56 v6 M${x - 3} 58 l3 -2 l3 2`} />)}
    {[12, 30, 48, 62, 80, 90].map((x) => <circle key={x} className="ink" cx={x} cy="53.5" r="1.8" />)}
  </g>],
  pears: ["A bowl of pears and a jug on a table.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk" y="52" width="100" height="18" />
    <path className="f-sea kk" d="M64 52 C60 40 62 28 70 24 H84 C90 28 92 40 88 52Z" /><path className="ln1 s-ink" d="M88 30 C98 30 98 44 88 44" />
    <path className="f-roof kk" d="M10 46 H48 Q46 58 29 58 Q12 58 10 46Z" />
    {[[20, 38], [30, 36], [40, 39]].map(([x, y]) => <g key={x}><path className="f-leaflight kk" d={`M${x} ${y - 10} C${x - 3} ${y - 6} ${x - 9} ${y} ${x - 8} ${y + 7} C${x - 6} ${y + 13} ${x + 6} ${y + 13} ${x + 8} ${y + 7} C${x + 9} ${y} ${x + 3} ${y - 6} ${x} ${y - 10}Z`} /></g>)}
  </g>],
  blocks: ["Blocks of bright colour with no real objects in them.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    <rect className="f-roof" x="6" y="8" width="38" height="30" /><rect className="f-sun" x="30" y="24" width="34" height="30" opacity=".9" /><rect className="f-sea" x="56" y="6" width="36" height="24" /><rect className="f-door" x="68" y="36" width="26" height="26" /><rect className="f-leaf" x="8" y="46" width="24" height="18" />
  </g>],
  focal: ["A calm grey landscape with one bright red spot that your eye goes to first.", <g key="a">
    <rect className="f-cloud" width="100" height="70" />
    <path className="f-mountain" d="M0 50 L24 22 L46 46 L68 18 L100 50 V70 H0Z" /><rect className="f-stone" y="50" width="100" height="20" />
    <circle className="f-roof kk" cx="62" cy="56" r="6" />
  </g>],
  lightBall: ["A plain ball sitting on a table with a lamp shining on it from the top left. The ball has no shading yet.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk" y="56" width="100" height="14" />
    <circle className="f-foam kk" cx="62" cy="40" r="16" />
    <circle className="f-sun kk" cx="14" cy="14" r="7" />
    {dots(8, (i) => <line key={i} className="ln1 s-sun" style={{ strokeWidth: 1.5 }} x1={14 + Math.cos(i * 0.785) * 10} y1={14 + Math.sin(i * 0.785) * 10} x2={14 + Math.cos(i * 0.785) * 14} y2={14 + Math.sin(i * 0.785) * 14} />)}
    <path className="ln1 s-roof dash" style={{ strokeWidth: 1.8 }} d="M26 24 L46 34" />
  </g>],
  lightPear: ["A pear standing on a table with a lamp to the left of it. The pear has no shadow drawn yet.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk" y="54" width="100" height="16" />
    <path className="f-stonedark kk" d="M12 54 V30 M6 54 H18" /><path className="f-sun kk" d="M4 30 L12 16 L20 30Z" /><path className="ln1 s-sun dash" style={{ strokeWidth: 1.8 }} d="M22 30 L44 40" />
    <path className="f-leaflight kk" d="M66 18 C63 24 56 30 57 40 C58 50 74 50 75 40 C76 30 69 24 66 18Z" /><path className="ln s-trunk" style={{ strokeWidth: 1.6 }} d="M66 18 q2 -4 5 -5" />
  </g>],
  hatch: ["A patch of shading made of lines drawn close together in one direction.", <g key="a">
    <rect className="sheet" width="100" height="70" />{dots(14, (i) => <line key={i} className="gl" x1={14 + i * 5.5} y1="62" x2={26 + i * 5.5} y2="8" />)}
  </g>],
  cross: ["A patch of shading made of two sets of lines that cross over each other.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(14, (i) => <line key={i} className="gl" x1={10 + i * 6} y1="62" x2={24 + i * 6} y2="8" />)}{dots(14, (i) => <line key={`b${i}`} className="gl" x1={90 - i * 6} y1="62" x2={76 - i * 6} y2="8" />)}
  </g>],
  orangeDots: ["An orange with its rough skin shown by lots of tiny dots.", <g key="a">
    <rect className="sheet" width="100" height="70" /><circle className="f-autumn kk" cx="50" cy="38" r="26" /><path className="f-leaf kk" d="M50 12 q10 -8 16 0 q-8 6 -16 0Z" />
    {dots(40, (i) => <circle key={i} className="graphite" cx={50 + Math.cos(i * 2.4) * (4 + (i * 7) % 20)} cy={38 + Math.sin(i * 2.4) * (4 + (i * 7) % 20)} r="1.3" />)}
  </g>],
  faceHigh: ["A drawing of a head where both eyes sit very near the top of the head.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    <ellipse className="f-wall kk" cx="50" cy="36" rx="22" ry="29" />
    {[41, 59].map((x) => <g key={x}><ellipse className="paper kk" cx={x} cy="16" rx="5" ry="3.4" /><circle className="ink" cx={x} cy="16" r="1.8" /></g>)}
    <path className="ln1 s-ink" style={{ strokeWidth: 1.4 }} d="M50 22 V40 M45 41 H55 M41 54 Q50 60 59 54" />
  </g>],
  blend: ["A sunset with soft colours that melt into each other from orange to yellow.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {["roof", "autumn", "autumn", "sun", "sun", "sky"].map((c, i) => <rect key={i} className={`f-${c}`} x="0" y={i * 11.7} width="100" height="12.5" opacity={[0.9, 0.8, 0.55, 0.7, 0.45, 0.6][i]} />)}
  </g>],
  scratchy: ["Rough, scratchy brush marks, like the bark of a tree.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(26, (i) => <path key={i} className="gl" style={{ strokeWidth: 1.1 + (i % 3) * 0.5 }} d={`M${6 + i * 3.6} ${6 + (i * 5) % 12} l${(i % 4) - 1.5} ${46 + (i * 3) % 14}`} />)}
    {dots(8, (i) => <path key={`x${i}`} className="s-trunk nofill" style={{ strokeWidth: 3 }} d={`M${10 + i * 11} ${10 + (i * 9) % 20} l2 ${30 + (i * 7) % 18}`} />)}
  </g>],
  ridged: ["Thick paint on a sunflower picture, with raised ridges where the brush has been.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    {dots(6, (i) => <path key={i} className="f-sun kk" d={`M${10 + i * 2} ${8 + i * 9} q20 -7 40 0 t40 0 v6 q-20 6 -40 0 t-40 0Z`} />)}
    <circle className="f-trunk kk" cx="50" cy="38" r="9" />
  </g>],
  pointDots: ["A picture of a park made from tiny dots of colour.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(70, (i) => <circle key={i} className={`f-${i % 14 < 5 ? "leaf" : i % 14 < 9 ? "sea" : i % 14 < 12 ? "sun" : "roof"}`} cx={5 + (i % 10) * 10 + (Math.floor(i / 10) % 2) * 4} cy={5 + Math.floor(i / 10) * 9} r="2.8" />)}
  </g>],
  blockS: ["A lino block with the letter S carved into it.", <g key="a">
    <rect className="f-wall2 kk" x="14" y="4" width="72" height="62" rx="4" />
    <path className="ln5 s-ink nofill" style={{ strokeWidth: 7 }} d="M64 22 C58 12 36 14 36 26 C36 38 64 34 64 46 C64 58 40 58 34 48" />
  </g>],
  blockHole: ["A lino block with the middle carved away, leaving a hollow square.", <g key="a">
    <rect className="f-wall2 kk" x="14" y="4" width="72" height="62" rx="4" /><rect className="soft kk dash" x="32" y="20" width="36" height="30" rx="3" />
  </g>],
  stencil: ["A piece of card with a star shape cut out of it, lying on paper.", <g key="a">
    <rect className="sheet" width="100" height="70" /><rect className="f-wall2 kk" x="12" y="6" width="76" height="58" rx="3" />
    <path className="paper kk" d="M50 14 L56 29 L72 29 L59 38 L64 54 L50 44 L36 54 L41 38 L28 29 L44 29Z" />
  </g>],
  edition: ["A finished print of a fish on paper, with a pencil number written underneath.", <g key="a">
    <rect className="sheet kk" x="10" y="2" width="80" height="66" rx="3" />
    <path className="f-roof2 kk" d="M24 28 Q42 10 62 28 Q42 46 24 28Z M62 28 L76 16 V40Z" /><circle className="paper" cx="36" cy="26" r="2.4" />
  </g>],
  coil: ["A clay pot built up from rings of rolled clay stacked on top of each other.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    {[[50, 60, 24], [50, 49, 28], [50, 38, 30], [50, 27, 27], [50, 17, 20]].map(([x, y, rx]) => <ellipse key={y} className="f-soil kk" cx={x} cy={y} rx={rx} ry="6.5" />)}
  </g>],
  bubble: ["A clay pot cut in half to show a round pocket of trapped air inside the wall.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    <path className="f-soil kk" d="M26 8 H74 C84 30 80 54 66 64 H34 C20 54 16 30 26 8Z" />
    <circle className="f-foam kk" cx="50" cy="34" r="8" /><circle className="f-foam" cx="38" cy="22" r="2" opacity=".6" />
  </g>],
  mould: ["A jug pouring runny plaster into a two-part mould.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    <rect className="f-stone kk" x="30" y="40" width="56" height="26" rx="3" /><path className="soft kk" d="M44 40 Q58 56 72 40Z" />
    <path className="f-roof2 kk" d="M12 8 H32 L36 24 H8Z" /><path className="ln5 s-foam nofill" style={{ strokeWidth: 3 }} d="M10 24 Q4 34 22 36 Q50 36 56 42" />
  </g>],
  robot: ["A robot built by gluing together cardboard boxes and tubes.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    <rect className="f-wall2 kk" x="34" y="26" width="32" height="28" /><rect className="f-stone kk" x="38" y="8" width="24" height="16" />
    <rect className="f-roof2 kk" x="14" y="28" width="18" height="6" rx="3" /><rect className="f-roof2 kk" x="68" y="28" width="18" height="6" rx="3" />
    <rect className="f-roof2 kk" x="38" y="54" width="8" height="14" rx="3" /><rect className="f-roof2 kk" x="54" y="54" width="8" height="14" rx="3" />
    <circle className="paper kk" cx="44" cy="15" r="2.6" /><circle className="paper kk" cx="56" cy="15" r="2.6" />
  </g>],
  carve: ["A block of stone with a chisel cutting chips away from one corner.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    <path className="f-stone kk" d="M16 56 V26 L34 14 H70 V44 L56 56Z" /><path className="soft kk dash" d="M70 14 L86 8 V30 L70 44" />
    <path className="f-roof kk" d="M72 8 L88 22" style={{ strokeWidth: 3 }} /><circle className="f-stone" cx="82" cy="48" r="3" /><circle className="f-stone" cx="90" cy="52" r="2" />
  </g>],
  model: ["A clay animal being built up by pressing small pieces of clay onto it.", <g key="a">
    <rect className="f-sand" width="100" height="70" />
    <ellipse className="f-soil kk" cx="46" cy="44" rx="24" ry="14" /><circle className="f-soil kk" cx="74" cy="32" r="10" /><rect className="f-soil kk" x="30" y="52" width="7" height="12" /><rect className="f-soil kk" x="50" y="52" width="7" height="12" />
    <circle className="f-soil kk" cx="26" cy="20" r="4" /><path className="ln s-ink" d="M30 24 L36 32" style={{ strokeWidth: 1.5 }} />
  </g>],
  mobile: ["A mobile: balanced shapes hanging from thin strings that move in a breeze.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    <path className="ln1 s-ink" style={{ strokeWidth: 1.4 }} d="M50 0 V10 M18 14 H82 M18 14 V26 M82 14 V30 M50 10 V14 M50 14 V32 M34 40 H66 M34 40 V50 M66 40 V46" />
    <circle className="f-roof kk" cx="18" cy="31" r="6" /><rect className="f-sea kk" x="76" y="30" width="12" height="12" /><path className="f-sun kk" d="M50 32 L58 40 H42Z" />
    <circle className="f-leaf kk" cx="34" cy="54" r="5" /><rect className="f-door kk" x="62" y="46" width="8" height="8" />
  </g>],
  holed: ["A smooth rounded stone-coloured sculpture with a hole right through the middle.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-grass" y="56" width="100" height="14" />
    <path className="f-stone kk" d="M18 56 C12 26 34 8 54 12 C78 14 88 36 78 56Z" /><ellipse className="f-sky kk" cx="50" cy="36" rx="12" ry="14" />
  </g>],
  reclining: ["A smooth reclining figure with big round shapes and a hole through the middle.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-grass" y="56" width="100" height="14" />
    <path className="f-stone kk" d="M6 56 C8 40 26 34 38 40 C44 28 60 32 66 42 C74 36 90 38 94 56Z" /><circle className="f-stone kk" cx="80" cy="30" r="8" />
    <ellipse className="f-sky kk" cx="42" cy="48" rx="7" ry="6" /><ellipse className="f-sky kk" cx="22" cy="50" rx="5" ry="4" />
  </g>],
  angel: ["A giant rusty steel figure standing on a hill, with two huge wings stretched out sideways.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><path className="f-grass" d="M0 70 V58 Q50 44 100 58 V70Z" />
    <path className="f-autumn kk" d="M44 54 V22 H56 V54Z" /><circle className="f-autumn kk" cx="50" cy="16" r="5" />
    <path className="f-autumn kk" d="M44 24 L6 34 L8 38 L44 32Z M56 24 L94 34 L92 38 L56 32Z" />
  </g>],
  bean: ["A huge shiny silver bean-shaped sculpture that reflects the sky and the city.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-stone" y="56" width="100" height="14" />
    <path className="f-stone kk" d="M10 50 C8 28 28 14 50 18 C72 14 92 28 90 50 C76 44 60 52 50 52 C40 52 24 44 10 50Z" />
    <path className="f-foam" d="M20 30 C28 22 38 22 44 24" style={{ opacity: 0.8 }} /><path className="f-leafdark" d="M30 40 h6 v-6 h8 v8 h8 v-4 h6 v8 H30Z" style={{ opacity: 0.55 }} />
  </g>],
  thin: ["A very tall, thin bronze figure standing on a small base.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-stone kk" x="38" y="62" width="24" height="6" />
    <circle className="f-trunk kk" cx="50" cy="9" r="4" /><path className="f-trunk kk" d="M48 13 H52 L53 40 L55 62 H51 L50 44 L49 62 H45 L47 40Z" /><path className="f-trunk kk" d="M48 16 L42 36 M52 16 L58 36" />
  </g>],
  morris: ["Wallpaper with a repeating pattern of green leaves and red flowers.", <g key="a">
    <rect className="f-wall" width="100" height="70" />
    {dots(6, (i) => { const x = 18 + (i % 3) * 32, y = 16 + Math.floor(i / 3) * 36; return <g key={i}>
      <path className="f-leaf kk" d={`M${x} ${y + 12} C${x - 14} ${y} ${x - 6} ${y - 12} ${x} ${y - 12} C${x + 6} ${y - 12} ${x + 14} ${y} ${x} ${y + 12}Z`} />
      <circle className="f-roof kk" cx={x + 12} cy={y + 14} r="5" /><circle className="f-sun" cx={x + 12} cy={y + 14} r="1.8" /></g>; })}
  </g>],
  strawberry: ["Wallpaper with a repeating pattern of red strawberries and small blue birds.", <g key="a">
    <rect className="f-wall" width="100" height="70" />
    {dots(6, (i) => { const x = 16 + (i % 3) * 32, y = 18 + Math.floor(i / 3) * 34; return i % 2 === 0
      ? <g key={i}><path className="f-roof kk" d={`M${x - 8} ${y - 4} Q${x} ${y + 14} ${x + 8} ${y - 4}Z`} /><path className="f-leaf kk" d={`M${x - 6} ${y - 4} l6 -5 l6 5Z`} /></g>
      : <g key={i}><ellipse className="f-roof2 kk" cx={x} cy={y} rx="9" ry="6" /><path className="f-sun kk" d={`M${x + 8} ${y - 2} l7 2 l-7 2Z`} /><circle className="paper" cx={x + 4} cy={y - 2} r="1.5" /></g>; })}
  </g>],
  teapot: ["A teapot painted in bright orange and yellow stripes and zigzags.", <g key="a">
    <rect className="f-wall" width="100" height="70" />
    <path className="f-sun kk" d="M26 28 C26 12 76 12 76 28 V46 C76 62 26 62 26 46Z" /><path className="f-roof kk" d="M28 30 H74 V38 H28Z" /><path className="ln s-autumn nofill" style={{ strokeWidth: 3 }} d="M30 46 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6" />
    <path className="f-sun kk" d="M76 32 C90 28 94 22 92 16 L86 22 C84 26 80 28 76 28Z" /><path className="ln1 s-ink nofill" d="M26 30 C8 26 8 50 26 48" style={{ strokeWidth: 3 }} /><rect className="f-roof kk" x="44" y="8" width="14" height="6" rx="3" />
  </g>],
  chair: ["A tall wooden chair with a very high straight back made of thin slats.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-trunk kk" x="30" y="2" width="5" height="64" /><rect className="f-trunk kk" x="65" y="2" width="5" height="64" />
    {[12, 22, 32].map((y) => <rect key={y} className="f-trunk kk" x="35" y={y} width="30" height="3.5" />)}<rect className="f-trunk kk" x="26" y="42" width="48" height="6" />
    <rect className="f-trunk kk" x="28" y="48" width="4" height="20" /><rect className="f-trunk kk" x="68" y="48" width="4" height="20" />
  </g>],
  mosaic: ["A picture made of lots of small coloured tiles with thin gaps between them.", <g key="a">
    <rect className="f-stonedark" width="100" height="70" />
    {dots(70, (i) => <rect key={i} className={`f-${["sea", "sun", "leaf", "roof", "door"][(i * 3 + Math.floor(i / 10) * 2) % 5]}`} x={2 + (i % 10) * 9.6} y={2 + Math.floor(i / 10) * 9.6} width="8.4" height="8.4" rx="1" />)}
  </g>],
  cushion: ["A square cushion with a pattern stitched onto it, and a needle with thread.", <g key="a">
    <rect className="f-wall" width="100" height="70" /><rect className="f-roof2 kk" x="18" y="8" width="64" height="54" rx="8" />
    <path className="ln s-sun nofill dash" style={{ strokeWidth: 2 }} d="M26 40 Q38 18 50 40 T74 40 M26 50 H74" /><path className="ln1 s-ink nofill" style={{ strokeWidth: 1.4 }} d="M70 14 L90 6 M88 6 q4 6 -2 12" />
  </g>],
  dome: ["A cathedral with a big round dome on top, held up by tall columns.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    <rect className="f-stone kk" x="14" y="58" width="72" height="8" /><rect className="f-stone kk" x="22" y="40" width="56" height="18" />
    {dots(7, (i) => <rect key={i} className="paper kk" x={26 + i * 7.4} y="42" width="3" height="16" />)}
    <rect className="f-stone kk" x="34" y="30" width="32" height="10" /><path className="f-stonedark kk" d="M34 30 C34 8 66 8 66 30Z" /><rect className="f-stone kk" x="48" y="4" width="4" height="8" /><path className="ln s-ink" d="M50 0 V4 M48 2 H52" />
  </g>],
  waveRoof: ["A modern building with a long swooping roof that curves like a wave.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-sea" y="54" width="100" height="16" />
    <path className="f-foam kk" d="M4 50 C20 14 44 14 56 30 C66 44 84 20 96 18 V50Z" /><path className="f-window kk" d="M4 50 H96 V56 H4Z" />
    {[16, 30, 44, 58, 72, 86].map((x) => <line key={x} className="ln1 s-ink" style={{ strokeWidth: 1 }} x1={x} y1="50" x2={x} y2="56" />)}
  </g>],
  towers: ["Tall, rounded towers with holes in them that look like melting stone, with a pointed spire on top.", <g key="a">
    <rect className="f-sky" width="100" height="70" />
    {[[20, 40, 26], [40, 54, 16], [58, 46, 20], [78, 36, 26]].map(([x, h, w]) => <g key={x}>
      <path className="f-stonewarm kk" d={`M${x - w / 3} 70 V${70 - h} C${x - w / 3} ${60 - h} ${x + w / 3} ${60 - h} ${x + w / 3} ${70 - h} V70Z`} />
      <circle className="f-sun" cx={x} cy={80 - h} r="2.6" /><circle className="f-sea" cx={x} cy={90 - h} r="2.2" /><path className="f-roof kk" d={`M${x - 2} ${62 - h} L${x} ${52 - h} L${x + 2} ${62 - h}Z`} /></g>)}
  </g>],
  gherkin: ["A tall pointed glass skyscraper shaped like a pickle, with spiral stripes.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-stone" y="62" width="100" height="8" />
    <path className="f-window kk" d="M50 2 C66 14 74 34 70 62 H30 C26 34 34 14 50 2Z" />
    {[16, 26, 36, 46, 56].map((y, i) => <path key={y} className="ln1 s-deep nofill" style={{ strokeWidth: 1.2 }} d={`M${34 + i * 0.6} ${y + 6} L${68 - i * 0.6} ${y - 4}`} />)}
  </g>],
  sails: ["A harbour building with a row of white sail-shaped roofs standing side by side.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-sea" y="52" width="100" height="18" /><rect className="f-stone kk" x="6" y="48" width="88" height="8" />
    {[[18, 36, 18], [40, 28, 24], [64, 36, 18]].map(([x, h, w], i) => <path key={i} className="f-foam kk" d={`M${x} 48 C${x} ${48 - h} ${x + w} ${48 - h - 4} ${x + w + 4} 48Z`} />)}
  </g>],
  waterfallHouse: ["A house built from flat stacked terraces that stick out over a small waterfall in the woods.", <g key="a">
    <rect className="f-leaflight" width="100" height="70" />
    <path className="f-sea kk" d="M42 26 V70 H58 V26Z" />{[46, 52].map((x) => <line key={x} className="ln1 s-foam" style={{ strokeWidth: 1.2 }} x1={x} y1="30" x2={x} y2="66" />)}
    <rect className="f-wall kk" x="14" y="30" width="72" height="8" /><rect className="f-stone kk" x="26" y="16" width="52" height="14" /><rect className="f-wall kk" x="30" y="8" width="40" height="8" />
    {[32, 46, 60].map((x) => <rect key={x} className="f-window kk" x={x} y="19" width="10" height="8" />)}
    <path className="f-leafdark" d="M0 70 V50 L8 40 L16 52 V70Z M88 70 V46 L95 36 L100 48 V70Z" />
  </g>],
  glassHall: ["A huge hall made of glass and iron, with a curved roof and many window panes.", <g key="a">
    <rect className="f-sky" width="100" height="70" /><rect className="f-stone" y="60" width="100" height="10" />
    <path className="f-window kk" d="M6 60 V34 C6 6 94 6 94 34 V60Z" />
    {[18, 30, 42, 54, 66, 78].map((x) => <line key={x} className="ln1 s-ink" style={{ strokeWidth: 1 }} x1={x} y1="60" x2={x} y2="14" />)}{[28, 40, 52].map((y) => <line key={y} className="ln1 s-ink" style={{ strokeWidth: 1 }} x1="6" y1={y} x2="94" y2={y} />)}
  </g>],
  patternRepeat: ["A repeating pattern of a circle then a square, over and over, in two rows.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(10, (i) => { const x = 10 + (i % 5) * 20, y = 20 + Math.floor(i / 5) * 30; return (i + Math.floor(i / 5)) % 2 === 0 ? <circle key={i} className="f-roof kk" cx={x} cy={y} r="8" /> : <rect key={i} className="f-sea kk" x={x - 8} y={y - 8} width="16" height="16" />; })}
  </g>],
  patternSym: ["A butterfly shape with a dashed line down the middle: the left and right sides match like a mirror.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    <path className="f-blossom kk" d="M50 34 C36 6 8 12 14 34 C18 46 40 44 50 34Z M50 34 C64 6 92 12 86 34 C82 46 60 44 50 34Z" />
    <path className="f-door kk" d="M50 36 C40 40 28 62 36 62 C44 62 50 48 50 36Z M50 36 C60 40 72 62 64 62 C56 62 50 48 50 36Z" />
    <line className="ln1 s-roof dash" style={{ strokeWidth: 1.6 }} x1="50" y1="2" x2="50" y2="68" />
  </g>],
  patternTess: ["Triangles of different colours fitted together in rows with no gaps between them.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(4, (r) => dots(7, (c) => { const x = c * 20 - 10, y = r * 17.5; return <g key={`${r}${c}`}>
      <path className={`f-${TILE[(c + r * 2) % 5]} kk`} d={`M${x} ${y + 17.5} L${x + 10} ${y} L${x + 20} ${y + 17.5}Z`} />
      <path className={`f-${TILE[(c + r * 2 + 2) % 5]} kk`} d={`M${x + 10} ${y} L${x + 30} ${y} L${x + 20} ${y + 17.5}Z`} /></g>; }))}
  </g>],
  patternTex: ["Two textures side by side: a rough bumpy surface on the left and a smooth surface on the right.", <g key="a">
    <rect className="f-stone kk" x="4" y="6" width="44" height="58" /><rect className="f-sky kk" x="52" y="6" width="44" height="58" />
    {dots(14, (i) => <path key={i} className="gl" style={{ strokeWidth: 1.4 }} d={`M${8 + (i % 4) * 10} ${12 + Math.floor(i / 4) * 14} l4 -5 l4 7 l3 -4`} />)}
    <path className="ln1 s-foam nofill" style={{ strokeWidth: 3, opacity: 0.8 }} d="M58 26 Q74 16 90 26 M58 44 Q74 34 90 44" />
  </g>],
  leaves: ["The same leaf shape stamped again and again in two neat rows.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(8, (i) => { const x = 14 + (i % 4) * 24, y = 18 + Math.floor(i / 4) * 30; return <path key={i} className="f-leaf kk" d={`M${x} ${y + 12} C${x - 11} ${y} ${x - 5} ${y - 11} ${x} ${y - 11} C${x + 5} ${y - 11} ${x + 11} ${y} ${x} ${y + 12}Z`} />; })}
  </g>],
  triangles: ["A page covered in triangles that fit together with no gaps.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(3, (r) => dots(6, (c) => { const x = c * 25 - 12.5, y = r * 23.4; return <g key={`${r}${c}`}>
      <path className={`f-${TILE[(c + r) % 5]} kk`} d={`M${x} ${y + 23.4} L${x + 12.5} ${y} L${x + 25} ${y + 23.4}Z`} />
      <path className={`f-${TILE[(c + r + 2) % 5]} kk`} d={`M${x + 12.5} ${y} L${x + 37.5} ${y} L${x + 25} ${y + 23.4}Z`} /></g>; }))}
  </g>],
  fold: ["A folded piece of paper opened out: a cut shape whose left and right sides match, with the fold line dashed down the middle.", <g key="a">
    <rect className="sheet kk" x="10" y="4" width="80" height="62" rx="3" />
    <path className="f-roof kk" d="M50 20 C42 6 22 14 30 30 C34 38 44 46 50 56 C56 46 66 38 70 30 C78 14 58 6 50 20Z" />
    <line className="ln1 s-ink dash" style={{ strokeWidth: 1.6 }} x1="50" y1="6" x2="50" y2="64" />
  </g>],
  rubbing: ["A pencil rubbing of a brick wall, picking up the pattern of the bricks.", <g key="a">
    <rect className="sheet" width="100" height="70" />
    {dots(5, (i) => dots(5, (j) => <rect key={`${i}${j}`} className="soft k1" x={4 + j * 19 - (i % 2) * 9} y={4 + i * 13} width="17" height="11" style={{ strokeWidth: 1 }} />))}
    <path className="gl" d="M10 10 l30 12 M16 6 l30 12 M10 26 l30 12 M16 22 l30 12" style={{ strokeWidth: 2, opacity: 0.6 }} />
    <path className="f-sun kk" d="M72 46 L90 22 L94 26 L78 50Z" />
  </g>],
};

export const PICTURE_KINDS = Object.keys(PICTURES);
