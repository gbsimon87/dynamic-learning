/** A small decorative scene for each subject's start banner; the words around it carry the meaning. */
const SCENES = {
  science: <>
    <circle className="adv-c-sun" cx="262" cy="46" r="24" />
    <ellipse className="adv-line" cx="262" cy="46" rx="44" ry="12" />
    <circle className="adv-c-sea" cx="170" cy="40" r="10" />
    <circle className="adv-c-paper" cx="140" cy="76" r="5" /><circle className="adv-c-paper" cx="214" cy="96" r="4" /><circle className="adv-c-paper" cx="306" cy="98" r="4" />
    <path className="adv-c-grass" d="M60 112 L72 70 H92 L104 112 Z" /><path className="adv-line" d="M70 62 H94 M76 62 V70 M88 62 V70" />
    <circle className="adv-c-paper" cx="80" cy="96" r="4" /><circle className="adv-c-paper" cx="90" cy="88" r="3" />
  </>,
  art: <>
    <path className="adv-c-wall" d="M120 70 C120 30 230 22 262 50 C286 72 262 84 244 80 C224 76 222 100 236 106 C190 124 120 110 120 70 Z" />
    <circle className="adv-c-roof" cx="156" cy="60" r="10" /><circle className="adv-c-sun" cx="188" cy="46" r="10" />
    <circle className="adv-c-sea" cx="222" cy="50" r="10" /><circle className="adv-c-grass" cx="160" cy="92" r="10" />
    <path className="adv-c-trunk" d="M262 112 L300 22" /><path className="adv-c-roof" d="M296 30 L306 10 L310 34 Z" />
  </>,
  music: <>
    {[40, 54, 68, 82, 96].map((y) => <path key={y} className="adv-line" d={`M70 ${y} Q190 ${y - 18} 318 ${y}`} />)}
    <g className="adv-c-roof"><ellipse cx="134" cy="84" rx="9" ry="6" /><path className="adv-stem" d="M142 84 V44" /></g>
    <g className="adv-c-sea"><ellipse cx="190" cy="66" rx="9" ry="6" /><ellipse cx="226" cy="60" rx="9" ry="6" /><path className="adv-stem" d="M198 66 V28 M234 60 V24 M198 28 L234 24" /></g>
    <g className="adv-c-grass"><ellipse cx="282" cy="74" rx="9" ry="6" /><path className="adv-stem" d="M290 74 V36" /></g>
  </>,
  design: <>
    <g className="adv-c-sun"><circle cx="160" cy="66" r="30" />{[0, 45, 90, 135].map((a) => <rect key={a} x="152" y="28" width="16" height="76" rx="4" transform={`rotate(${a} 160 66)`} />)}</g>
    <circle className="adv-c-paper" cx="160" cy="66" r="10" />
    <g className="adv-c-sea"><circle cx="226" cy="88" r="20" />{[0, 60, 120].map((a) => <rect key={a} x="220" y="62" width="12" height="52" rx="3" transform={`rotate(${a} 226 88)`} />)}</g>
    <circle className="adv-c-paper" cx="226" cy="88" r="7" />
    <rect className="adv-c-wall" x="260" y="30" width="22" height="84" rx="4" />
    {[42, 56, 70, 84, 98].map((y) => <path key={y} className="adv-line" d={`M260 ${y} H270`} />)}
  </>,
  pe: <>
    <path className="adv-c-roof" d="M40 120 Q170 40 320 70 V120 Z" />
    <path className="adv-lane" d="M70 120 Q180 58 320 84 M110 120 Q200 76 320 98" />
    <circle className="adv-c-paper" cx="262" cy="40" r="16" />
    <path className="adv-line" d="M250 32 L262 40 L274 32 M262 40 V56 M248 48 L262 56 L276 48" />
    <path className="adv-c-sun" d="M110 30 L116 44 L131 44 L119 53 L124 68 L110 59 L96 68 L101 53 L89 44 L104 44 Z" />
  </>,
  wellbeing: <>
    <circle className="adv-c-sun" cx="262" cy="38" r="20" />
    <path className="adv-c-grass" d="M0 104 Q90 70 200 108 L200 120 L0 120 Z" />
    <path className="adv-c-hill" d="M150 120 Q250 72 320 96 V120 Z" />
    <path className="adv-c-roof" d="M150 56 C150 40 170 36 178 50 C186 36 206 40 206 56 C206 74 178 88 178 88 C178 88 150 74 150 56 Z" />
    <path className="adv-c-leaf" d="M96 84 C96 64 112 56 122 60 C120 74 108 84 96 84 Z" /><path className="adv-line" d="M96 100 V84" />
  </>,
  french: <>
    <path className="adv-c-trunk" d="M244 116 L260 18 L276 116 H266 C266 96 254 96 254 116 Z" />
    <path className="adv-line" d="M250 70 H270 M254 46 H266" />
    <path className="adv-c-sea" d="M60 34 L90 40 L60 52 Z" /><path className="adv-c-paper" d="M100 38 L130 44 L100 56 Z" /><path className="adv-c-roof" d="M140 42 L170 48 L140 60 Z" />
    <path className="adv-line" d="M40 30 Q120 46 200 40" />
    <path className="adv-c-sun" d="M110 96 C120 80 160 80 170 96 C160 108 120 108 110 96 Z" />
  </>,
  computing: <>
    <rect className="adv-c-wall" x="190" y="22" width="120" height="76" rx="10" />
    <rect className="adv-c-night" x="200" y="32" width="100" height="56" rx="4" />
    <path className="adv-code-a" d="M210 46 H250" /><path className="adv-code-b" d="M220 60 H284" /><path className="adv-code-a" d="M220 74 H262" />
    <path className="adv-c-wall" d="M176 106 H324 L314 98 H186 Z" />
    <rect className="adv-c-sea" x="88" y="50" width="56" height="46" rx="12" />
    <circle className="adv-c-paper" cx="106" cy="70" r="7" /><circle className="adv-c-paper" cx="126" cy="70" r="7" />
    <path className="adv-line" d="M116 50 V36" /><circle className="adv-c-sun" cx="116" cy="32" r="6" />
  </>,
};

export default function SubjectScene({ subject }) {
  return <svg className="adv-hero-scene" viewBox="0 0 320 120" aria-hidden="true" focusable="false">{SCENES[subject] ?? SCENES.science}</svg>;
}
