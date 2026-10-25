import { useId } from 'react';
import './SolarCockpit.css';

const CYAN = '#7ee8e2';
const AMBER = '#edb86a';

function Screws({ x, y, width, height }) {
  return [[x, y], [x + width, y], [x, y + height], [x + width, y + height]].map(([cx, cy], i) =>
    <g key={i} className="solar-cockpit__screw" transform={`translate(${cx} ${cy})`}>
      <circle r="3.2" /><path d="M-1.5 1.5 1.5-1.5" />
    </g>);
}

function Switches({ x, y, count = 5 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: count }, (_, i) => <g key={i} transform={`translate(${i * 29} 0)`}>
      <rect x="-9" y="-5" width="18" height="27" rx="3" fill="#091722" stroke="#456171" />
      <circle cy="8" r="5" fill="#263d4b" stroke="#76919a" />
      <path d={i % 3 === 1 ? 'M0 8 2 17' : 'M0 8-2-2'} stroke="#c1ced0" strokeWidth="3" strokeLinecap="round" />
      <rect x="-4" y="-13" width="8" height="3" rx="1" fill={i % 3 === 1 ? AMBER : CYAN} />
      <text x="0" y="33" textAnchor="middle" className="solar-cockpit__micro">{['NAV', 'COM', 'AUX', 'SYS', 'RCS'][i % 5]}</text>
    </g>)}
  </g>;
}

function Keypad({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="-7" y="-7" width="75" height="57" rx="4" fill="#111f2b" stroke="#4c6470" />
    {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`translate(${i % 4 * 18} ${Math.floor(i / 4) * 16})`}>
      <rect width="13" height="10" rx="2" fill={i === 3 ? '#a97844' : '#364e5d'} stroke="#7d9299" strokeWidth=".6" />
      <path d="M3 4h7" stroke={i === 3 ? '#ffe2a3' : '#bbd8dc'} strokeWidth="1" />
    </g>)}
  </g>;
}

function Dial({ x, y, label, angle = -40 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r="26" fill="#0b1721" stroke="#82949a" strokeWidth="2" />
    <circle r="22" fill="#122a35" stroke="#3c5963" />
    {Array.from({ length: 13 }, (_, i) => <path key={i} d="M0-18v4" transform={`rotate(${-135 + i * 22.5})`} stroke={i > 9 ? AMBER : '#9abdc3'} strokeWidth={i % 3 ? 1 : 2} />)}
    <path d="M0 4V-15" transform={`rotate(${angle})`} stroke={CYAN} strokeWidth="2" />
    <circle r="3" fill="#c0d3d5" />
    <text y="40" textAnchor="middle" className="solar-cockpit__micro">{label}</text>
  </g>;
}

/** Decorative instruments only: no extra hit targets or animation loop. */
export default function SolarCockpit() {
  const id = useId().replaceAll(':', '');
  const paint = name => `url(#${id}-${name})`;
  return <div className="solar-cockpit" aria-hidden="true">
    <div className="solar-cockpit__window">
      <span className="solar-cockpit__strut solar-cockpit__strut--left" />
      <span className="solar-cockpit__strut solar-cockpit__strut--right" />
      <span className="solar-cockpit__glass-glint" />
    </div>
    <div className="solar-cockpit__overhead">
      <span>ENVIRONMENT</span><i /><i /><i /><b />
      <span>CABIN PRESSURE</span><em>101.3</em><b /><i /><i />
    </div>
    <div className="solar-cockpit__dashboard">
      <svg className="solar-cockpit__instruments" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <linearGradient id={`${id}-shell`} x2="0" y2="1">
            <stop stopColor="#516f80" /><stop offset=".08" stopColor="#223e51" /><stop offset=".45" stopColor="#152a3b" /><stop offset="1" stopColor="#091522" />
          </linearGradient>
          <linearGradient id={`${id}-metal`} x2="0" y2="1">
            <stop stopColor="#6b8793" /><stop offset=".06" stopColor="#324e5f" /><stop offset=".5" stopColor="#243c4d" /><stop offset="1" stopColor="#142737" />
          </linearGradient>
          <linearGradient id={`${id}-bezel`} x2="0" y2="1">
            <stop stopColor="#83999e" /><stop offset=".12" stopColor="#3e5865" /><stop offset=".85" stopColor="#233d4c" /><stop offset="1" stopColor="#67818a" />
          </linearGradient>
          <linearGradient id={`${id}-screen`} x2=".3" y2="1">
            <stop stopColor="#0e303c" /><stop offset="1" stopColor="#04121d" />
          </linearGradient>
          <linearGradient id={`${id}-glass`} x2="1" y2="1">
            <stop stopColor="#b6f6ff" stopOpacity=".13" /><stop offset=".5" stopColor="#b6f6ff" stopOpacity="0" />
          </linearGradient>
          <pattern id={`${id}-grid`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#5aa6ad" strokeOpacity=".16" strokeWidth=".8" />
          </pattern>
          <pattern id={`${id}-grain`} width="6" height="4" patternUnits="userSpaceOnUse">
            <path d="M0 .5H6" stroke="#c3e6ee" strokeOpacity=".025" />
          </pattern>
        </defs>

        {/* Padded glare shield, machined deck and two recessed equipment bays. */}
        <path d="M0 77 172 31Q800-24 1428 31L1600 77V260H0Z" fill="#06101b" stroke="#07121d" strokeWidth="9" />
        <path d="M0 88 172 43Q800-7 1428 43L1600 88V260H0Z" fill={paint('shell')} stroke="#678491" strokeWidth="1.5" />
        <path d="M20 82 178 38Q800-12 1422 38L1580 82" fill="none" stroke="#85c9d8" strokeWidth="2" />
        <path d="M29 86 180 44Q800-4 1420 44L1571 86" fill="none" stroke="#091723" strokeWidth="6" />
        <path d="M0 99 172 54Q800 5 1428 54L1600 99V260H0Z" fill={paint('grain')} />
        <path d="M55 106 200 65H570V236H97Z" fill={paint('metal')} stroke="#637e8b" />
        <path d="M1030 65H1400L1545 106 1503 236H1030Z" fill={paint('metal')} stroke="#637e8b" />
        <path d="M79 118 112 218M1521 118 1488 218" stroke="#b5cbd0" strokeOpacity=".2" />
        <Screws x={197} y={77} width={359} height={145} />
        <Screws x={1044} y={77} width={359} height={145} />
        <text x="211" y="57" className="solar-cockpit__label">01 / NAVIGATION</text>
        <text x="1190" y="57" className="solar-cockpit__label">03 / PROPULSION</text>

        {/* Navigation display: orbital plot, coordinates and tactile bezel keys. */}
        <g transform="translate(211 87)">
          <rect width="226" height="108" rx="6" fill={paint('bezel')} stroke="#07141e" strokeWidth="3" />
          <rect x="8" y="8" width="210" height="88" rx="2" fill={paint('screen')} stroke="#05101a" strokeWidth="3" />
          <rect x="9" y="9" width="208" height="86" fill={paint('grid')} />
          <text x="16" y="20" className="solar-cockpit__display-label">ORBITAL TRAJECTORY</text>
          <text x="166" y="20" className="solar-cockpit__micro" fill={CYAN}>NAV / OK</text>
          <g fill="none" stroke="#5a9b9f" strokeWidth=".7">
            <ellipse cx="99" cy="58" rx="67" ry="22" transform="rotate(-18 99 58)" />
            <ellipse cx="99" cy="58" rx="43" ry="14" transform="rotate(-18 99 58)" />
            <path d="M22 58H176M99 29V88" strokeDasharray="2 4" />
          </g>
          <path d="m32 76 31-10 29-9 26 2 20-20 36-8" fill="none" stroke={CYAN} strokeWidth="1.8" />
          <circle cx="138" cy="39" r="3" fill="#d1fff2" /><circle cx="99" cy="58" r="3" fill={AMBER} />
          <path d="m170 27 8 3-6 5Z" fill={CYAN} />
          <text x="16" y="89" className="solar-cockpit__micro">VECTOR 028.4</text>
          <text x="142" y="89" className="solar-cockpit__micro">LOCAL / SOL</text>
          <rect x="9" y="9" width="208" height="86" fill={paint('glass')} />
          {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={25 + i * 32} y="100" width="18" height="3" rx="1" fill={i === 1 ? CYAN : '#718a94'} />)}
        </g>
        <Keypad x={462} y={100} />
        <Switches x={232} y={215} count={7} />
        <Dial x={493} y={185} label="O₂ / CABIN" angle={30} />

        {/* Primary flight instruments sit in a raised central binnacle. */}
        <path d="M584 55Q800 30 1016 55L1041 220H559Z" fill="#081522" stroke="#0b1a26" strokeWidth="6" />
        <path d="M591 59Q800 36 1009 59L1026 210H574Z" fill={paint('metal')} stroke="#7796a2" />
        <text x="800" y="58" textAnchor="middle" className="solar-cockpit__label">BIX / ORBITAL FLIGHT DECK</text>
        <Screws x={597} y={73} width={406} height={122} />
        <g transform="translate(800 125)">
          <circle r="57" fill={paint('bezel')} stroke="#07141f" strokeWidth="4" />
          <circle r="49" fill="#0b2433" stroke="#91aeb4" />
          <path d="M-45 0a45 45 0 0 1 90 0Z" fill="#194758" />
          <path d="M-45 0a45 45 0 0 0 90 0Z" fill="#243b44" />
          <circle r="44" fill={paint('glass')} stroke="#698f97" strokeWidth=".6" />
          {[-30, -15, 0, 15, 30].map((y, i) => <g key={y}>
            <path d={`M${i % 2 ? -10 : -20} ${y}H${i % 2 ? 10 : 20}`} stroke="#adced0" strokeWidth=".8" />
            {y !== 0 && <text x="25" y={y + 2} className="solar-cockpit__micro">{Math.abs(y)}</text>}
          </g>)}
          <path d="m-29-2 17 0 6 6h12l6-6h17M0-8v8" fill="none" stroke={AMBER} strokeWidth="2.5" />
          {Array.from({ length: 19 }, (_, i) => <path key={i} d="M0-53v4" transform={`rotate(${-90 + i * 10})`} stroke="#d2e3e3" strokeWidth={i % 3 ? .7 : 1.8} />)}
          <path d="m0-47-4 6h8Z" fill={AMBER} />
          <text y="36" textAnchor="middle" className="solar-cockpit__micro">ATTITUDE / LEVEL</text>
        </g>
        <g transform="translate(655 119)">
          <rect x="-37" y="-42" width="74" height="88" rx="5" fill={paint('bezel')} stroke="#0b1924" strokeWidth="2" />
          <rect x="-31" y="-36" width="62" height="76" rx="2" fill={paint('screen')} />
          <text y="-25" textAnchor="middle" className="solar-cockpit__micro">PROXIMITY</text>
          <circle r="23" fill={paint('grid')} stroke="#62b7b4" strokeWidth=".8" />
          <circle r="13" fill="none" stroke="#427d83" strokeWidth=".8" />
          <path d="M-23 0H23M0-23V23M0 0 17-17" stroke="#5aa9a8" strokeWidth=".7" />
          <path d="M0 0 17-17A24 24 0 0 1 23 0Z" fill="#6dd7be" fillOpacity=".19" />
          <circle cx="12" cy="-10" r="2" fill={CYAN} /><circle cx="-9" cy="15" r="1.5" fill={AMBER} />
          <text y="34" textAnchor="middle" className="solar-cockpit__micro">SCAN / CLEAR</text>
        </g>
        <g transform="translate(944 119)">
          <rect x="-37" y="-42" width="74" height="88" rx="5" fill={paint('bezel')} stroke="#0b1924" strokeWidth="2" />
          <rect x="-31" y="-36" width="62" height="76" rx="2" fill={paint('screen')} />
          <text y="-25" textAnchor="middle" className="solar-cockpit__micro">SYSTEMS</text>
          {['LIFE', 'HULL', 'FUEL', 'COMM'].map((label, i) => <g key={label} transform={`translate(-25 ${-10 + i * 12})`}>
            <text className="solar-cockpit__micro">{label}</text>
            <rect x="23" y="-5" width="26" height="4" fill="#243d45" />
            <rect x="23" y="-5" width={24 - i * 2} height="4" fill={i === 2 ? AMBER : CYAN} />
          </g>)}
        </g>
        <text x="800" y="194" textAnchor="middle" className="solar-cockpit__micro">INERTIAL GUIDANCE • SYSTEMS NOMINAL</text>
        <path d="M725 185H690M875 185H910" stroke="#728e97" />
        <circle cx="677" cy="184" r="2" fill={CYAN} /><circle cx="923" cy="184" r="2" fill={CYAN} />

        {/* Engine monitor, guarded switches and pressure gauges. */}
        <g transform="translate(1065 87)">
          <rect width="215" height="108" rx="6" fill={paint('bezel')} stroke="#07141e" strokeWidth="3" />
          <rect x="8" y="8" width="199" height="88" rx="2" fill={paint('screen')} stroke="#05101a" strokeWidth="3" />
          <text x="16" y="21" className="solar-cockpit__display-label">ENGINE DIAGNOSTICS</text>
          {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${25 + i * 29} 31)`}>
            {Array.from({ length: 8 }, (_, j) => <rect key={j} y={49 - j * 6} width="12" height="4" rx=".5" fill={j < [5, 7, 6, 6, 7, 5][i] ? (j > 5 ? AMBER : CYAN) : '#29454d'} />)}
            <text x="6" y="62" textAnchor="middle" className="solar-cockpit__micro">{`0${i + 1}`}</text>
          </g>)}
          <rect x="9" y="9" width="197" height="86" fill={paint('glass')} />
          {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={22 + i * 31} y="100" width="18" height="3" rx="1" fill={i === 4 ? CYAN : '#718a94'} />)}
        </g>
        <Dial x={1330} y={115} label="POWER" angle={42} />
        <Dial x={1404} y={129} label="THERMAL" angle={-28} />
        <Switches x={1084} y={215} count={6} />
        <g transform="translate(1305 185)">
          <rect width="48" height="38" rx="4" fill="#101d28" stroke="#67808b" />
          <rect x="7" y="6" width="34" height="21" rx="3" fill="#9b5448" stroke="#e5a184" />
          <path d="M13 8v16M35 8v16M13 10H35" fill="none" stroke="#f4c2a0" strokeWidth="2" />
          <text x="24" y="34" textAnchor="middle" className="solar-cockpit__micro">RESERVE</text>
        </g>
        <g transform="translate(1381 184)">
          <circle cx="12" cy="17" r="16" fill="#0c1924" stroke="#8298a1" />
          <circle cx="12" cy="17" r="11" fill="#3b5261" stroke="#5f7b87" strokeDasharray="2 2" strokeWidth="3" />
          <path d="M12 17 15 8" stroke="#dbe9df" strokeWidth="2" />
          <text x="12" y="44" textAnchor="middle" className="solar-cockpit__micro">TRIM</text>
        </g>

        {/* Side ventilation, grab rails and the twin throttle pedestal. */}
        {[0, 1].map(side => <g key={side} transform={side ? 'translate(1600 0) scale(-1 1)' : undefined}>
          <path d="M26 141 88 124 107 231 44 231Z" fill="#0a1824" stroke="#506878" />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`m${37 + i * 1.6} ${151 + i * 8} 44-9`} stroke="#314d5e" strokeWidth="4" />)}
          <path d="m127 131 13 74" stroke="#050e17" strokeWidth="12" strokeLinecap="round" />
          <path d="m127 130 13 72" stroke="#78929d" strokeWidth="7" strokeLinecap="round" />
          <path d="m126 131 12 69" stroke="#b6cbd1" strokeWidth="1" />
        </g>)}
        <path d="M671 212Q800 192 929 212L969 260H631Z" fill={paint('metal')} stroke="#8ba5ae" strokeWidth="1.5" />
        <path d="M679 217Q800 202 921 217" fill="none" stroke="#0c1c29" strokeWidth="4" />
        <rect x="748" y="217" width="104" height="39" rx="4" fill="#071720" stroke="#617e87" strokeWidth="2" />
        <text x="800" y="230" textAnchor="middle" className="solar-cockpit__micro">FLIGHT CONTROL</text>
        {[0, 1, 2, 3].map(i => <g key={i}>
          <rect x={759 + i * 23} y="239" width="13" height="8" rx="2" fill={i === 1 ? AMBER : CYAN} fillOpacity=".8" />
          <path d={`M${762 + i * 23} 242h7`} stroke="#e3fff3" strokeWidth=".8" />
        </g>)}
        {[697, 885].map((x, i) => <g key={x} transform={`translate(${x} 220)`}>
          <rect x="-16" width="33" height="40" rx="6" fill="#0b1a26" stroke="#65818d" />
          <path d="M0 5V38" stroke="#030c13" strokeWidth="7" />
          <path d="M0 10V29" stroke="#8ba7b0" strokeWidth="4" />
          <rect x="-12" y={i ? 14 : 11} width="24" height="11" rx="3" fill={paint('bezel')} stroke="#bac9c9" />
          <path d={`M-8 ${i ? 17 : 14}H8M-8 ${i ? 20 : 17}H8`} stroke="#0c1e2b" />
          <path d="M-22 8h3m-3 8h3m-3 8h3m-3 8h3" stroke="#a1b7bb" />
        </g>)}
      </svg>
    </div>
  </div>;
}
