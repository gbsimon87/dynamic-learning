import { collectedTotal } from '../../../data/freePlay/spaceMathActivities.js';

// Reduced-motion/no-WebGL play retains a spaceship and gates in the world.
export default function SpaceMathFlightView({ state, wave, lane }) {
  const q = state.activity, total = collectedTotal(state.cargo), xs = [60, 180, 300, 420];
  const crystals = (count, x, y, columns = 5) => Array.from({ length: count }, (_, i) =>
    <path key={i} d="M0 -5 L4 0 L0 5 L-4 0 Z" transform={`translate(${x + (i % columns) * 11} ${y - Math.floor(i / columns) * 12})`} className="space-math-crystal" />);
  return <div className="space-math-flight-view">
    <svg viewBox="0 0 480 400" role="img" aria-label={`Spaceship at gate ${wave.options[lane]}. Use left and right to steer, then Fly through.`}>
      <g className="space-math-world-model">
        {q.kind === 'collect' && <>
          <circle cx="240" cy="82" r="58" className="space-math-dock" />
          <text x="240" y="17" textAnchor="middle">Target {q.target} · Cargo {total}</text>
          {crystals(total, 218, 105)}
        </>}
        {q.kind === 'balance' && <>
          <path d="M240 70 L218 145 H262 Z" className="space-math-support" />
          <g transform={`rotate(${Math.max(-10, Math.min(10, (q.base + total - q.a - q.b) * 3))} 240 70)`}>
            <path d="M115 70 H365 M125 70 V125 M355 70 V125 M90 125 H160 M320 125 H390" className="space-math-beam" />
            <text x="125" y="28" textAnchor="middle">{q.a} + {q.b}</text><text x="355" y="28" textAnchor="middle">{q.base} + {total}</text>
            {crystals(q.a + q.b, 103, 115)}{crystals(q.base + total, 333, 115)}
          </g>
        </>}
        {q.kind === 'share' && <>
          <text x="240" y="18" textAnchor="middle">Ship cargo: {q.total - collectedTotal(state.loads)}</text>
          {state.loads.map((n, i) => <g key={i} transform={`translate(${xs[i]} 65)`}>
            <ellipse rx="24" ry="26" className="space-math-alien" /><ellipse cx="-9" cy="-3" rx="5" ry="9" className="space-math-eye" /><ellipse cx="9" cy="-3" rx="5" ry="9" className="space-math-eye" />
            <text y="45" textAnchor="middle">Alien {i + 1}: {n}</text>{crystals(n, -22, 100)}
          </g>)}
        </>}
      </g>
      {wave.options.map((option, i) => <g key={i} className={lane === i ? 'space-math-gate is-selected' : 'space-math-gate'}>
        <path d={`M${xs[i]} 280 V370`} className="space-math-lane-path" />
        <ellipse cx={xs[i]} cy="235" rx="49" ry="40" /><text x={xs[i]} y="240" textAnchor="middle">{option}</text>
      </g>)}
      <g transform={`translate(${xs[lane]} 330)`} className="space-math-ship">
        <path d="M0 -27 C-15 -11 -15 8 -12 18 L12 18 C15 8 15 -11 0 -27 Z" className="space-math-hull" />
        <circle cy="-5" r="6" className="space-math-window" /><path d="M-12 3 L-23 24 L-9 18 M12 3 L23 24 L9 18" className="space-math-fin" />
        <path d="M-6 20 L0 36 L6 20" className="space-math-flame" />
      </g>
    </svg>
  </div>;
}
