import ScrollableTable from '../../../../../components/ui/ScrollableTable';
import Year4MathVisual from '../year4/Year4MathVisual';
import MathQuestionVisual from '../../../../../components/challenge/visual/MathQuestionVisual';
import { AngleDiagram, CellsEstimate, Cuboid, FractionBars, GridDiagram, HundredGrid, LineGraph, Net, NumberLine5, RectDiagonal, RectDiagram, Rectilinear, SharedAngles, Solid } from './Year5Diagrams';

const PLACE_HEADS = ['Millions', 'Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
const COLUMN_HEADS = ['M', 'HTh', 'TTh', 'Th', 'H', 'T', 'O'];

/** Anything Year 4 can draw (shapes, clocks, and so on) is drawn by Year 4; everything new is drawn here. */
export default function Year5MathVisual({ question: q, selected, onPoint, disabled }) {
  const v = q.visual;
  if (!v) return <MathQuestionVisual question={q} />;
  switch (v.type) {
    case 'place':
      return <ScrollableTable><table className="year5-table"><thead><tr>{PLACE_HEADS.slice(-v.digits.length).map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody><tr>{v.digits.map((d, i) => <td key={i}>{d}</td>)}</tr></tbody></table></ScrollableTable>;
    case 'decimalPlace': {
      const heads = ['Ones', 'Tenths', 'Hundredths', 'Thousandths'].slice(0, v.digits.length);
      return <ScrollableTable><table className="year5-table"><thead><tr>{heads.map((h, i) => [i === 1 ? <th key="dot" aria-hidden="true" className="year5-dot" /> : null, <th key={h} scope="col">{h}</th>])}</tr></thead>
        <tbody><tr>{v.digits.map((d, i) => [i === 1 ? <td key="dot" aria-hidden="true" className="year5-dot">.</td> : null, <td key={i}>{d}</td>])}</tr></tbody></table></ScrollableTable>;
    }
    case 'column': {
      const n = Math.max(String(v.a).length, String(v.b).length, 4), pad = String(v.a).padStart(n, ' '), padB = String(v.b).padStart(n, ' ');
      return <div className="year5-column" style={{ '--n': n }} role="img" aria-label={`${v.a} ${v.op} ${v.b}, lined up in place-value columns`}>
        <div className="year5-column-row year5-column-labels">{COLUMN_HEADS.slice(-n).map(h => <span key={h}>{h}</span>)}</div>
        <div className="year5-column-row">{pad.split('').map((d, i) => <span key={i}>{d.trim() || ' '}</span>)}</div>
        <div className="year5-column-row year5-column-second"><span className="year5-column-op">{v.op}</span>{padB.split('').map((d, i) => <span key={i}>{d.trim() || ' '}</span>)}</div>
      </div>;
    }
    case 'busStop':
      return <div className="year5-busstop" role="img" aria-label={`${v.dividend} divided by ${v.divisor}, in the short division bus stop layout`}>
        <span className="year5-busstop-divisor">{v.divisor}</span>
        <span className="year5-busstop-dividend">{String(v.dividend).split('').map((d, i) => <span key={i}>{d}</span>)}</span>
      </div>;
    case 'line5': return <NumberLine5 min={v.min} max={v.max} marks={v.marks} />;
    case 'bars': return <FractionBars rows={v.rows} />;
    case 'hundredGrid': return <HundredGrid n={v.n} />;
    case 'rect': return <RectDiagram w={v.w} h={v.h} unit={v.unit} labels={v.labels} />;
    case 'rectilinear': return <Rectilinear points={v.points} labels={v.labels} unit={v.unit} />;
    case 'cellsEst': return <CellsEstimate width={v.width} height={v.height} full={v.full} part={v.part} />;
    case 'cubes': return <Cuboid l={v.l} w={v.w} h={v.h} grid label={`A cuboid made of ${v.l} by ${v.w} by ${v.h} one-centimetre cubes. The cubes you can see have lines drawn on them.`} />;
    case 'solid': return <Solid shape={v.shape} dims={v.dims} />;
    case 'net': return <Net shape={v.shape} />;
    case 'angle5': return <AngleDiagram degrees={v.degrees} from={v.from} protractor={v.protractor} label={v.protractor ? 'An angle with a protractor behind it' : undefined} />;
    case 'lineAngles': return <SharedAngles parts={v.parts} total={180} />;
    case 'pointAngles': return <SharedAngles parts={v.parts} total={360} />;
    case 'rectDiag': return <RectDiagonal angle={v.angle} />;
    case 'grid5': return <GridDiagram size={v.size} shapes={v.shapes} mirror={v.mirror} selected={selected} missing={v.missing} onPoint={onPoint} disabled={disabled} />;
    case 'lineGraph': return <LineGraph title={v.title} labels={v.labels} axis={v.axis} step={v.step} series={v.series} />;
    case 'table5':
      return <ScrollableTable label={v.title}><table className="year5-table"><caption>{v.title}</caption>
        <thead><tr>{v.headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
        <tbody>{v.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}</tr>)}</tbody></table></ScrollableTable>;
    default: return <Year4MathVisual question={q} />;
  }
}
