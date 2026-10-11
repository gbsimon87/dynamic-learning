import ClockFace from '../../../../../components/challenge/ClockFace';

const shapePoints = {
  equilateral:'150,35 60,190.884572681 240,190.884572681', isosceles:'150,35 90,191 210,191',
  scalene:'70,35 90,191 260,191', rhombus:'150,55 250,125 150,195 50,125',
  trapezium:'100,70 200,70 250,190 50,190', rectangle:'60,75 240,75 240,175 60,175',
  square:'75,50 225,50 225,200 75,200', parallelogram:'100,75 250,75 200,175 50,175',
};
function Frame({ label, children, viewBox='0 0 300 250' }) {
  return <svg className="year4-diagram" role="img" aria-label={label} viewBox={viewBox}>{children}</svg>;
}
function Angle({ degrees, x=150, y=170, length=100 }) {
  const rad=degrees*Math.PI/180;
  return <g><path className="year4-stroke" d={`M ${x+length} ${y} L ${x} ${y} L ${x+length*Math.cos(rad)} ${y-length*Math.sin(rad)}`} />
    <path className="year4-stroke" d={`M ${x+30} ${y} A 30 30 0 0 0 ${x+30*Math.cos(rad)} ${y-30*Math.sin(rad)}`} /></g>;
}
export default function Year4MathVisual({ question:q, selected, onPoint, coloured={}, onSquare, disabled }) {
  const v=q.visual;
  if(!v) return null;
  if(v.type==='clock') return <ClockFace hour={v.hour} minute={v.minute} />;
  if(v.type==='column') return <div className="year4-column" aria-label={`${v.a} ${v.op} ${v.b}, aligned in place-value columns`}>
    <div className="year4-column-labels">{['Th','H','T','O'].map(label=><span key={label}>{label}</span>)}</div>
    <div className="year4-column-row">{String(v.a).padStart(4,' ').split('').map((digit,i)=><span key={i}>{digit.trim()||'\u00a0'}</span>)}</div>
    <div className="year4-column-row year4-column-second"><span className="year4-column-operation">{v.op}</span>{String(v.b).padStart(4,' ').split('').map((digit,i)=><span key={i}>{digit.trim()||'\u00a0'}</span>)}</div>
    <div className="year4-column-answer">?</div>
  </div>;
  if(v.type==='decimalPlace') return <table className="year4-table"><thead><tr>{['Ones','Tenths','Hundredths'].map(label=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody><tr>{v.digits.map((d,i)=><td key={i}>{d}</td>)}</tr></tbody></table>;
  if(v.type==='place') return <table className="year4-table"><thead><tr>{['Thousands','Hundreds','Tens','Ones'].map(label=><th key={label}>{label}</th>)}</tr></thead><tbody><tr>{v.digits.map((d,i)=><td key={i}>{d}</td>)}</tr></tbody></table>;
  if(v.type==='numberLine') return <div className="year4-number-line-scroll"><Frame label="Number line with equal steps through zero" viewBox="0 0 520 90"><path className="year4-stroke" d="M 20 30 H 500"/>{v.values.map((n,i)=><g key={n}><path className="year4-stroke" d={`M ${20+i*40} 22 V 38`}/><text x={20+i*40} y="67">{n}</text></g>)}</Frame></div>;
  if(v.type==='estimate') return <Frame label={`Equal number line from ${v.start} to ${v.end}; a point halfway`} viewBox="0 0 300 100"><path className="year4-stroke" d="M 25 40 H 275 M 25 30 V 50 M 150 30 V 50 M 275 30 V 50"/><circle cx="150" cy="40" r="6" className="year4-fill"/><text x="25" y="75">{v.start}</text><text x="275" y="75">{v.end}</text></Frame>;
  if(v.type==='fraction') return <Frame label={`Bar with ${v.n} of ${v.d} equal parts shaded`} viewBox="0 0 300 80">{Array.from({length:v.d},(_,i)=><rect key={i} x={10+i*280/v.d} y="10" width={280/v.d} height="55" className={i<v.n?'year4-filled-square':'year4-empty-square'} />)}</Frame>;
  if(v.type==='squares') return <Frame label="Square grid; count the coloured squares" viewBox={`0 0 ${v.width*25+10} ${v.height*25+10}`}>
    {Array.from({length:v.width*v.height},(_,i)=>{const x=i%v.width,y=Math.floor(i/v.width);return <rect key={i} x={5+x*25} y={5+y*25} width="25" height="25" className={v.cells.some(([a,b])=>a===x&&b===y)?'year4-filled-square':'year4-empty-square'} />;})}</Frame>;
  if(v.type==='shape') return <figure className="year4-figure"><Frame label={v.property?`Shape with ${v.property}`:'Shape to examine'}><polygon points={shapePoints[v.shape]} transform={`rotate(${v.rotate??0} 150 125)`} className="year4-empty-square" /></Frame>{v.property&&<figcaption>{v.property}</figcaption>}</figure>;
  if(v.type==='angle') return <Frame label={`Angle of ${v.degrees} degrees`}><Angle degrees={v.degrees}/><text x="200" y="220">{v.degrees}°</text></Frame>;
  if(v.type==='angleSet') return <Frame label="Four angles to compare" viewBox="0 0 600 220">{v.values.map((degrees,i)=><g key={degrees}><Angle degrees={degrees} x={i*150+65} y={140} length={60}/><text x={i*150+75} y="190">{degrees}°</text></g>)}</Frame>;
  if(v.type==='perimeter') {
    const {w,h,cut}=v, scale=22,x=40,y=30;
    const points=cut?`${x},${y} ${x+(w-cut.w)*scale},${y} ${x+(w-cut.w)*scale},${y+cut.h*scale} ${x+w*scale},${y+cut.h*scale} ${x+w*scale},${y+h*scale} ${x},${y+h*scale}`:`${x},${y} ${x+w*scale},${y} ${x+w*scale},${y+h*scale} ${x},${y+h*scale}`;
    const unit=q.unit??'cm';
    return <Frame label={`Rectilinear shape, overall width ${w} ${unit}, height ${h} ${unit}${cut?`, top-right notch ${cut.w} by ${cut.h} ${unit}`:''}`}><polygon points={points} className="year4-empty-square"/><text x={x+w*scale/2} y={y+h*scale+30}>{w} {unit}</text><text x="20" y={y+h*scale/2}>{h}</text>{cut&&<><text x={x+(w-cut.w/2)*scale} y={y+cut.h*scale+20}>{cut.w}</text><text x={x+(w-cut.w)*scale-12} y={y+cut.h*scale/2+5}>{cut.h}</text></>}</Frame>;
  }
  if(v.type==='table') return <table className="year4-table"><thead><tr><th>Item</th><th>Count</th></tr></thead><tbody>{v.rows.map(row=><tr key={row.label}><th scope="row">{row.label}</th><td>{row.value}</td></tr>)}</tbody></table>;
  if(v.type==='line') {
    const max=Math.ceil(Math.max(...v.values)/5)*5, y=value=>190-value/max*140;
    return <Frame label={`Time graph. ${v.unit}. Numbered vertical scale in steps of 5.`} viewBox="0 0 360 270">
      {Array.from({length:max/5+1},(_,i)=><g key={i}><path className="year4-gridline" d={`M 50 ${y(i*5)} H 320`}/><text x="30" y={y(i*5)+5}>{i*5}</text></g>)}
      <text x="185" y="20" className="year4-small-label">{v.unit}</text><path className="year4-stroke" d="M 50 45 V 190 H 320"/>
      <polyline className="year4-stroke" points={v.values.map((value,i)=>`${60+i*80},${y(value)}`).join(' ')} />
      {v.values.map((value,i)=><g key={v.labels[i]}><circle className="year4-fill" cx={60+i*80} cy={y(value)} r="5"/><text x={60+i*80} y="220" className="year4-small-label">{v.labels[i]}</text></g>)}<text x="185" y="252">Time</text></Frame>;
  }
  if(v.type==='coordinates') {
    const selectedMatch=/^\((\d), (\d)\)$/.exec(selected??'');
    const selectedPoint=selectedMatch?{x:Number(selectedMatch[1]),y:Number(selectedMatch[2]),label:v.join?'D':'B'}:null;
    const points=selectedPoint?[...v.points,selectedPoint]:v.points;
    const joined=v.join&&selectedPoint?[...points,points[0]]:points;
    return <div className="year4-coordinate-scroll"><div className="year4-coordinate-wrap"><Frame label="Coordinate grid. x increases right, y increases up. Equal steps from 0 to 5." viewBox="0 0 360 360">
      {Array.from({length:6},(_,i)=><g key={i}><path className="year4-gridline" d={`M ${55+i*50} 40 V 290 M 55 ${290-i*50} H 305`} /><text x={55+i*50} y="318">{i}</text><text x="28" y={295-i*50}>{i}</text></g>)}<text x="335" y="298">x</text><text x="55" y="25">y</text>
      <path className="year4-stroke" d="M 55 40 V 290 H 305"/>
      {v.join&&<polyline className="year4-stroke" points={joined.map(p=>`${55+p.x*50},${290-p.y*50}`).join(' ')} />}
      {points.map(p=><g key={p.label}><circle cx={55+p.x*50} cy={290-p.y*50} r="7" className="year4-fill"/><text x={55+p.x*50+13} y={280-p.y*50}>{p.label}</text></g>)}
    </Frame>{onPoint&&<div className="year4-point-buttons">{Array.from({length:36},(_,i)=>{const x=i%6,y=5-Math.floor(i/6),value=`(${x}, ${y})`;return <button key={value} type="button" aria-label={`Plot ${value}`} aria-pressed={selected===value} disabled={disabled} onClick={()=>onPoint(value)}>{selected===value?'●':'·'}</button>;})}</div>}</div></div>;
  }
  if(v.type==='reflection') return <div className="year4-reflection-scroll"><div className={`year4-reflection ${v.horizontal?'is-horizontal':''}`} style={{gridTemplateColumns:`repeat(${v.width}, minmax(44px, 1fr))`}} role="group" aria-label="Reflection grid">
    {Array.from({length:v.width*v.height},(_,i)=>{const x=i%v.width,y=Math.floor(i/v.width),id=`${x},${y}`,fixed=v.horizontal?y<3:x<3,filled=fixed?v.cells.some(([a,b])=>a===x&&b===y):Boolean(coloured[id]), mirror=v.horizontal?y===2:x===2;
      return fixed?<span key={id} className={`year4-cell ${filled?'is-filled':''} ${mirror?'mirror-edge':''}`} aria-label={`Row ${y+1}, column ${x+1}: ${filled?'coloured':'empty'}`} />:<button key={id} type="button" className={`year4-cell ${filled?'is-filled':''}`} aria-label={`Row ${y+1}, column ${x+1}`} aria-pressed={filled} disabled={disabled} onClick={()=>onSquare(id)} />;
    })}</div></div>;
  return null;
}
