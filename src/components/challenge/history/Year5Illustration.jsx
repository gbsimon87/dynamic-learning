/** Original Year 5 teaching drawings. Captions say they are not photographs or real artefacts. */
export default function Year5Illustration({ scene }) {
  const ink = "var(--ck-text)", panel = "var(--ck-panel)", muted = "var(--ck-muted)";
  const leaves = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
  const drawings = {
    "y5-greece-map": ["Approximate map of Greece: mainland, the Peloponnese, Crete and the coast of Turkey, with Athens, Sparta and Olympia marked", <g key="d">
      <path d="M50 22L150 14L172 58L142 98L152 128L118 146L98 120L68 130L38 92Z" fill={muted} />
      <path d="M100 156L146 154L152 188L120 208L94 186Z" fill={muted} />
      <path d="M268 10H335V235H292L278 150L286 82Z" fill={muted} />
      <ellipse cx="190" cy="226" rx="46" ry="9" fill={muted} />
      <ellipse cx="205" cy="150" rx="9" ry="6" fill={muted} /><ellipse cx="225" cy="120" rx="8" ry="6" fill={muted} />
      <circle cx="152" cy="126" r="5" fill={ink} /><circle cx="124" cy="182" r="5" fill={ink} /><circle cx="108" cy="168" r="5" fill={ink} />
      <text fill={ink} stroke="none" x="160" y="108" fontSize="15" textAnchor="start">Athens</text>
      <text fill={ink} stroke="none" x="160" y="190" fontSize="15" textAnchor="start">Sparta</text>
      <text fill={ink} stroke="none" x="20" y="172" fontSize="15" textAnchor="start">Olympia</text>
      <text fill={ink} stroke="none" x="196" y="212" fontSize="15">Crete</text>
      <text fill={ink} stroke="none" x="226" y="52" fontSize="15">Aegean Sea</text>
      <text fill={ink} stroke="none" x="309" y="130" fontSize="14">Turkey</text></g>],
    "y5-parthenon": ["Drawing of a Greek temple like the Parthenon: steps, six columns and a triangular roof end", <g key="d">
      <path d="M25 205H315V190H35ZM40 190H300V176H50Z" fill={muted} />
      <path d="M45 82L170 24L295 82Z" fill={muted} />
      <rect x="50" y="82" width="240" height="16" fill={muted} />
      {[52, 84, 116, 148, 180, 212, 244, 276].map((x) => <rect key={x} x={x} y="98" width="14" height="78" fill={panel} />)}
      <text fill={ink} stroke="none" x="170" y="232" fontSize="18">A temple for a goddess</text></g>],
    "y5-amphora": ["Drawing of a Greek vase with a band of runners around its body", <g key="d">
      <path d="M140 30H200L196 60Q250 90 244 150Q240 200 205 214H135Q100 200 96 150Q90 90 144 60Z" fill={muted} />
      <path d="M140 38Q92 40 100 82M200 38Q248 40 240 82" fill="none" />
      <rect x="100" y="118" width="140" height="34" fill={panel} />
      <path d="M118 148L126 126L136 148M150 148L158 126L168 148M182 148L190 126L200 148M214 148L222 126L230 148" fill="none" />
      <text fill={ink} stroke="none" x="170" y="238" fontSize="18">Painted pottery is evidence</text></g>],
    "y5-ostrakon": ["Drawing of a broken pottery piece with a made-up name scratched on it, used as a voting slip", <g key="d">
      <path d="M62 70L150 28L262 46L300 110L262 186L170 214L88 178L48 128Z" fill={muted} />
      <text fill={ink} stroke="none" x="172" y="118" fontSize="26">Pheidon</text>
      <path d="M96 138Q130 128 170 140T250 134" fill="none" />
      <text fill={ink} stroke="none" x="170" y="238" fontSize="17">A voting piece with a made-up name</text></g>],
    "y5-olive-wreath": ["Drawing of a ring of olive leaves, the prize at the Olympic Games", <g key="d">
      {leaves.map((angle) => <ellipse key={angle} cx="170" cy="40" rx="8" ry="22" fill={muted} transform={`rotate(${angle} 170 110)`} />)}
      <text fill={ink} stroke="none" x="170" y="108" fontSize="17">Olive</text>
      <text fill={ink} stroke="none" x="170" y="130" fontSize="17">wreath</text></g>],
    "y5-maya-numbers": ["Maya numbers: a shell means zero, a dot means one, a bar means five, and a bar with two dots means seven", <g key="d">
      <ellipse cx="48" cy="84" rx="30" ry="18" fill={muted} /><path d="M26 84Q48 74 70 84M30 92Q48 100 66 92" fill="none" />
      <circle cx="132" cy="84" r="10" fill={ink} />
      <rect x="188" y="76" width="64" height="16" rx="3" fill={ink} />
      <circle cx="288" cy="52" r="10" fill={ink} /><circle cx="312" cy="52" r="10" fill={ink} /><rect x="268" y="76" width="64" height="16" rx="3" fill={ink} />
      <text fill={ink} stroke="none" x="48" y="150" fontSize="30">0</text><text fill={ink} stroke="none" x="132" y="150" fontSize="30">1</text>
      <text fill={ink} stroke="none" x="220" y="150" fontSize="30">5</text><text fill={ink} stroke="none" x="300" y="150" fontSize="30">7</text>
      <text fill={ink} stroke="none" x="170" y="212" fontSize="17">Shell · dot · bar</text></g>],
    "y5-maya-pyramid": ["Drawing of a Maya stepped pyramid with a staircase up the middle and a small temple on top", <g key="d">
      <path d="M30 205H310L292 170H48ZM48 170H292L274 138H66ZM66 138H274L256 106H84ZM84 106H256L238 76H102Z" fill={muted} />
      <rect x="128" y="36" width="84" height="40" fill={panel} /><rect x="156" y="48" width="28" height="28" fill={muted} />
      <path d="M150 205L158 76M190 205L182 76M154 190H186M156 170H184M158 150H182M160 130H180M162 110H178M164 92H176" fill="none" />
      <text fill={ink} stroke="none" x="170" y="232" fontSize="17">Steps up to a temple</text></g>],
    "y5-maya-glyphs": ["Drawing of a folded Maya book with square picture-writing signs on each page", <g key="d">
      <path d="M20 70L90 50L90 170L20 190ZM90 50L160 70L160 190L90 170ZM160 70L230 50L230 170L160 190ZM230 50L300 70L300 190L230 170Z" fill={muted} />
      <rect x="38" y="90" width="34" height="34" rx="8" fill={panel} /><rect x="106" y="86" width="34" height="34" rx="8" fill={panel} />
      <rect x="176" y="100" width="34" height="34" rx="8" fill={panel} /><rect x="250" y="96" width="34" height="34" rx="8" fill={panel} />
      <path d="M44 100H66M44 112H66M112 94H134M112 106H134M182 110H204M182 122H204M256 104H278M256 116H278" fill="none" />
      <text fill={ink} stroke="none" x="160" y="226" fontSize="17">A folded bark-paper book</text></g>],
  };
  const drawing = drawings[scene];
  if (!drawing) return null;
  return <figure className="history-illustration">
    <svg viewBox="0 0 340 245" role="img" aria-label={drawing[0]}>
      <g fill={panel} stroke={ink} strokeWidth="3" strokeLinejoin="round" fontSize="22" textAnchor="middle">{drawing[1]}</g>
    </svg>
    <figcaption>Our teaching drawing. {scene === "y5-greece-map" ? "Approximate positions, not an exact map." : "Not a photograph or an original artefact."}</figcaption>
  </figure>;
}
