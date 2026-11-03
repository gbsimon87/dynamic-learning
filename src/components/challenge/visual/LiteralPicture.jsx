import "./question-visuals.css";

/** An object reference, not a reconstruction of a story or its outcome. */
export default function LiteralPicture({ picture, thumbnail = false }) {
  if (!picture) return null;
  const drawing = <svg viewBox="0 0 240 150" className="qv-object" aria-hidden="true" focusable="false"><ObjectDrawing type={picture.type} /></svg>;
  if (thumbnail) return <span className="qv-thumbnail" aria-hidden="true">{drawing}</span>;
  return <figure className="question-visual qv-reference" aria-label={`Picture reference for the word “${picture.word}”`}>
    {drawing}<figcaption>Picture reference: {picture.word}</figcaption>
  </figure>;
}

function ObjectDrawing({ type }) {
  switch (type) {
    case "flower": return <><path d="M120 75V138M120 113Q79 112 83 91Q113 90 120 113M120 125Q159 124 157 102Q128 102 120 125" />{[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="120" cy="40" rx="17" ry="25" transform={`rotate(${angle} 120 65)`} className="qv-object-fill" />)}<circle cx="120" cy="65" r="17" /></>;
    case "tree": return <><path d="M108 140V70H132V140" className="qv-object-fill" /><path d="M120 18C86 8 57 37 70 60C38 70 62 108 95 100C106 120 143 118 153 99C188 112 206 72 176 60C181 30 153 12 120 18Z" className="qv-object-fill" /></>;
    case "seed": return <><ellipse cx="118" cy="96" rx="24" ry="35" transform="rotate(25 118 96)" className="qv-object-fill" /><path d="M120 78Q115 45 141 29M139 30Q111 15 111 41Q124 47 139 30M139 30Q165 19 162 42Q147 46 139 30" /></>;
    case "bird": return <><path d="M59 84L34 57L42 99L70 105M161 58L190 68L162 77M97 113L89 137M129 111L135 137" /><ellipse cx="108" cy="88" rx="57" ry="35" className="qv-object-fill" /><circle cx="147" cy="62" r="27" className="qv-object-fill" /><path d="M83 79Q125 64 133 95Q100 116 83 79" /><circle cx="155" cy="56" r="3" /></>;
    case "bee": return <><ellipse cx="102" cy="45" rx="23" ry="29" /><ellipse cx="140" cy="45" rx="23" ry="29" /><ellipse cx="120" cy="85" rx="50" ry="30" className="qv-object-fill" /><path d="M99 59V111M119 55V115M139 59V111M166 76L182 63M164 93L182 104" /><circle cx="153" cy="78" r="3" /></>;
    case "beetle": return <><path d="M93 66L61 45M88 88H54M92 108L61 131M147 66L179 45M152 88H186M148 108L179 131M108 35L97 19M132 35L143 19" /><ellipse cx="120" cy="87" rx="39" ry="48" className="qv-object-fill" /><ellipse cx="120" cy="40" rx="22" ry="18" /><path d="M120 56V133" /></>;
    case "snail": return <><path d="M45 119Q76 94 149 104L183 85L195 91L186 118Z" className="qv-object-fill" /><circle cx="104" cy="83" r="38" /><path d="M108 107C66 102 75 50 109 57C135 63 125 95 105 88C94 82 100 69 109 74M183 88L179 66M191 89L201 69" /><circle cx="179" cy="64" r="4" /><circle cx="202" cy="67" r="4" /></>;
    case "fish": return <><path d="M70 75L33 45V105Z" className="qv-object-fill" /><ellipse cx="126" cy="75" rx="62" ry="37" className="qv-object-fill" /><path d="M106 42L128 18L149 43M105 108L130 130L146 107M158 48Q143 75 158 101" /><circle cx="173" cy="66" r="4" /></>;
    case "butterfly": return <><path d="M120 64C60 0 12 57 80 84C20 116 75 155 120 97C165 155 220 116 160 84C228 57 180 0 120 64Z" className="qv-object-fill" /><path d="M120 46V113M120 49L103 28M120 49L137 28" /><circle cx="120" cy="51" r="8" /></>;
    case "spider": return <><path d="M96 65L63 38L41 22M91 77L55 65L30 49M91 92L54 106L34 127M99 104L76 124L66 145M144 65L177 38L199 22M149 77L185 65L210 49M149 92L186 106L206 127M141 104L164 124L174 145" /><ellipse cx="120" cy="88" rx="32" ry="37" className="qv-object-fill" /><circle cx="120" cy="45" r="20" /></>;
    case "boat": return <><path d="M33 99H207L183 126H63Z" className="qv-object-fill" /><path d="M120 20V99M112 23L52 90H112ZM128 32L185 90H128ZM24 138Q44 127 64 138T104 138T144 138T184 138T224 138" /></>;
    case "moon": return <><circle cx="120" cy="75" r="55" className="qv-object-fill" /><circle cx="97" cy="55" r="12" /><circle cx="142" cy="87" r="17" /><circle cx="100" cy="106" r="8" /></>;
    case "star": return <path d="M120 12L139 54L186 58L151 89L161 137L120 112L79 137L89 89L54 58L101 54Z" className="qv-object-fill" />;
    case "book": return <><path d="M120 40Q77 15 30 35V119Q79 101 120 126Q161 101 210 119V35Q163 15 120 40Z" className="qv-object-fill" /><path d="M120 40V126M49 55Q80 46 102 59M49 75Q80 66 102 79M138 59Q166 46 191 55M138 79Q166 66 191 75" /></>;
    case "bridge": return <><path d="M22 75H218V123H186C180 73 60 73 54 123H22ZM28 72V44M61 72V44M95 72V44M128 72V44M161 72V44M195 72V44M22 43H218" className="qv-object-fill" /><path d="M20 137Q40 128 60 137T100 137T140 137T180 137T220 137" /></>;
    case "mountain": return <><path d="M15 135L93 20L174 135ZM104 135L167 46L229 135Z" className="qv-object-fill" /><path d="M65 61L83 71L94 56L109 72L121 61M148 73L165 85L183 70" /></>;
    case "ball": return <><circle cx="120" cy="75" r="55" className="qv-object-fill" /><path d="M70 54Q124 75 170 54M67 88Q126 68 172 88M107 23Q82 75 107 127M135 23Q160 75 135 127" /></>;
    case "key": return <><circle cx="75" cy="75" r="31" className="qv-object-fill" /><circle cx="75" cy="75" r="12" /><path d="M106 67H205V96H190V82H171V96H155V82H106Z" className="qv-object-fill" /></>;
    case "drum": return <><path d="M55 47V114C55 144 185 144 185 114V47" className="qv-object-fill" /><ellipse cx="120" cy="47" rx="65" ry="22" /><path d="M55 52L81 118L107 58L133 124L159 58L185 114M58 16L106 30M180 12L134 29" /></>;
    case "guitar": return <><path d="M102 66Q63 39 52 77Q25 103 58 126Q89 149 110 117Q149 110 126 75L164 29L149 17Z" className="qv-object-fill" /><circle cx="91" cy="90" r="13" /><path d="M77 104L154 24M80 108L160 27M146 16L161 5L178 19L165 33ZM64 112L83 124" /></>;
    case "bell": return <><path d="M64 112Q81 95 81 59C81 15 159 15 159 59Q159 95 176 112Z" className="qv-object-fill" /><path d="M102 112Q102 137 120 137Q138 137 138 112M112 27V17H128V27M61 115H179" /></>;
    case "torch": return <><path d="M92 58H148L139 134H101Z" className="qv-object-fill" /><path d="M92 58L76 23H164L148 58ZM113 80H127V98H113Z" /></>;
    case "cell": return <><rect x="35" y="48" width="164" height="55" rx="10" className="qv-object-fill" /><path d="M199 62H213V89H199M74 59V91M59 75H89M156 75H180" /></>;
    case "spoon": return <><ellipse cx="117" cy="43" rx="29" ry="32" className="qv-object-fill" /><path d="M109 74L105 135Q117 146 129 135L125 74" className="qv-object-fill" /></>;
    case "cup": return <><path d="M65 40H165L154 126H77Z" className="qv-object-fill" /><path d="M166 52C212 40 215 105 160 102M56 137H174" /></>;
    case "clock": return <><circle cx="120" cy="75" r="58" /><path d="M120 25V33M120 117V125M70 75H78M162 75H170" /><circle cx="120" cy="75" r="4" /></>;
    case "tooth": return <path d="M69 32C88 12 104 26 120 27C136 26 152 12 171 32C191 60 165 84 159 115C154 142 138 141 132 112C128 93 112 93 108 112C102 141 86 142 81 115C75 84 49 60 69 32Z" className="qv-object-fill" />;
    default: return null;
  }
}
