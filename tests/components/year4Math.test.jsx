import { act, fireEvent, render, screen, cleanup, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Year4MathGame from '../../src/pages/skills/math/challenges/year4/Year4MathGame';
import { DataRound } from '../../src/components/challenge/data/DataChallenge';
import Year4MathVisual from '../../src/pages/skills/math/challenges/year4/Year4MathVisual';
import { buildYear4Math, TOPIC_KEYS } from '../../src/data/challenges/year4Math/questions';
import { seededRng } from '../../src/data/challenges/questionKinds';
import { year4MathCurriculum } from '../../src/data/year4MathCurriculum';
import { challengeModules } from '../../src/pages/curriculum/challengeModules';
vi.mock('../../src/utils/speech',()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async()=>{},isNarrationSupported:()=>false}));
vi.mock('../../src/components/celebration/sound/player',async importOriginal=>({...await importOriginal(),playCue:()=>()=>{}}));
vi.mock('../../src/components/celebration/fx/effects',()=>({playEffect:()=>{}}));

it('Vite resolves and React renders all 168 Year 4 challenges',async()=>{
  for(const category of year4MathCurriculum)for(const topic of category.topics)for(let level=1;level<=4;level++){
    const name=topic.id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('');
    const loader=challengeModules[`../skills/math/challenges/year4/${topic.id}/${name}Challenge${level}.jsx`];
    expect(loader).toBeTypeOf('function');
    const {default:Component}=await loader();
    const {container}=render(<Component onComplete={()=>{}}/>);
    expect(container.querySelector('.challenge-container')).toBeTruthy();
    expect(screen.getByRole('button',{name:'Check my answer'})).toBeTruthy();
    cleanup();
  }
},30000);

it('every initial diagram renders in both theme contexts',()=>{
  for(const theme of ['light','dark'])for(const topic of TOPIC_KEYS)for(let level=1;level<=4;level++){
    const questions=buildYear4Math(topic,level,seededRng(11));
    for(const q of questions){
      const {container}=render(<div className={theme}><Year4MathVisual question={q}/></div>);
      if(q.visual)expect(container.querySelector('svg, table, .year4-column, .year4-number-line, .year4-reflection, .clock-face')).toBeTruthy();
      cleanup();
    }
  }
},30000);

it('a four-digit sequence answer is reachable using the touch keypad',()=>{
  const submit=vi.fn();
  render(<DataRound question={{kind:'sequence',prompt:'Fill the gap.',terms:[0,1000,2000,3000],gaps:[2],maxDigits:5}} submit={submit} locked={false} />);
  for(const digit of '2000')fireEvent.click(screen.getByRole('button',{name:digit,exact:true}));
  fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
  expect(submit).toHaveBeenCalledWith(true);
});

it('coordinate plotting retries a wrong answer and completes once after all five correct answers',async()=>{
  vi.useFakeTimers();
  vi.spyOn(Math,'random').mockReturnValue(.35);
  const complete=vi.fn();
  render(<Year4MathGame topic="coordinates" level={3} onComplete={complete}/>);
  try{
    fireEvent.click(screen.getByRole('button',{name:'Plot (0, 0)'}));
    fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
    expect(complete).not.toHaveBeenCalled();
    expect(screen.getByText('Plot the point (2, 2).')).toBeTruthy(); // still on question 1 after the miss
    for(let i=0;i<5;i++){
      fireEvent.click(screen.getByRole('button',{name:'Plot (2, 2)'}));
      fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
      if(i<4)expect(complete).not.toHaveBeenCalled();
      await act(async()=>vi.advanceTimersByTime(1200));
    }
    expect(complete).toHaveBeenCalledTimes(1);
    expect(complete.mock.calls[0][0]).toHaveProperty('combos');
  } finally{vi.useRealTimers();}
});

it('reflection is completed by matching the rendered coloured cells across the mirror',async()=>{
  vi.useFakeTimers();
  vi.spyOn(Math,'random').mockReturnValue(.6);
  const complete=vi.fn();
  render(<Year4MathGame topic="reflect" level={3} onComplete={complete}/>);
  try{
    const group=screen.getByRole('group',{name:'Reflection grid'});
    expect(group.classList.contains('is-horizontal')).toBe(false); // level 3 mirrors left to right
    // Read every coloured source square off the rendered grid (any height) and tap its mirror partner.
    const sources=[...group.children].filter(node=>node.tagName==='SPAN'&&node.classList.contains('is-filled'));
    expect(sources.length).toBeGreaterThan(0);
    for(const square of sources){
      const [,row,col]=/Row (\d+), column (\d+)/.exec(square.getAttribute('aria-label'));
      fireEvent.click(within(group).getByRole('button',{name:`Row ${row}, column ${7-Number(col)}`}));
    }
    expect(screen.queryAllByRole('button',{pressed:true})).toHaveLength(sources.length);
    fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
    expect(screen.getByRole('button',{name:'Check my answer'}).disabled).toBe(true);
    await act(async()=>vi.advanceTimersByTime(1200));
    expect(complete).not.toHaveBeenCalled();
    expect(screen.getByRole('button',{name:'Check my answer'}).disabled).toBe(true); // new, empty round
    expect(screen.queryAllByRole('button',{pressed:true})).toHaveLength(0);
  }finally{vi.useRealTimers();}
});

it('bar construction reads the table and preserves two rapid increments',async()=>{
  vi.useFakeTimers();
  vi.spyOn(Math,'random').mockReturnValue(.35);
  const complete=vi.fn();
  render(<Year4MathGame topic="graphs" level={3} onComplete={complete}/>);
  try{
    const table=screen.getByRole('table');
    const rows=within(table).getAllByRole('row').slice(1);
    for(const row of rows){
      const label=within(row).getByRole('rowheader').textContent;
      const value=Number(within(row).getByRole('cell').textContent);
      const button=screen.getByRole('button',{name:`Raise the ${label} bar`});
      act(()=>{fireEvent.click(button);fireEvent.click(button);});
      const bar=document.querySelector(`.bar-chart-bar[title="${label}: 10"]`);
      expect(bar).toBeTruthy();
      // Values can be as small as 5, so correct an overshoot with the lower control.
      if(value<10)fireEvent.click(screen.getByRole('button',{name:`Lower the ${label} bar`}));
      for(let n=10;n<value;n+=5)fireEvent.click(button);
      expect(document.querySelector(`.bar-chart-bar[title="${label}: ${value}"]`)).toBeTruthy();
    }
    fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
    expect(screen.getByRole('button',{name:'Check my answer'}).disabled).toBe(true);
    await act(async()=>vi.advanceTimersByTime(1200));
    expect(complete).not.toHaveBeenCalled();
  }finally{vi.useRealTimers();}
});

it('clock controls preserve rapid taps and wrap from 59 to 0 and from 12 to 1',()=>{
  const submit=vi.fn();
  render(<DataRound question={{kind:'clock',mode:'set',prompt:'Set 2:01.',time:{hour:2,minute:1},start:{hour:12,minute:59},minuteStep:1}} submit={submit} locked={false} />);
  const hour=screen.getByRole('button',{name:'Hour forward'}),minute=screen.getByRole('button',{name:'1 minute forward'});
  act(()=>{fireEvent.click(hour);fireEvent.click(hour);fireEvent.click(minute);fireEvent.click(minute);});
  fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
  expect(submit).toHaveBeenCalledWith(true);
});

it('plotted D draws all four sides of the rectangle and moves when corrected',()=>{
  const q=buildYear4Math('polygon',3,seededRng(9))[0];
  const {container,rerender}=render(<Year4MathVisual question={q} selected={q.answer}/>);
  const polygon=container.querySelector('polyline');
  const points=polygon.getAttribute('points').split(' ');
  expect(points).toHaveLength(5);
  expect(points[4]).toBe(points[0]);
  expect(container.querySelector('svg').textContent).toContain('D');
  rerender(<Year4MathVisual question={q} selected="(0, 0)"/>);
  expect(container.querySelector('polyline').getAttribute('points')).not.toBe(points.join(' '));
});

it('shape labels wrap as ordinary captions rather than long lines in the SVG',()=>{
  // Level 1 captions each shape with its clue; the parallelogram's clue is the longest.
  let q;
  for(let seed=1;!q&&seed<=200;seed++)q=buildYear4Math('shapes',1,seededRng(seed)).find(q=>q.visual?.shape==='parallelogram');
  expect(q?.visual.property.length).toBeGreaterThan(40);
  const {container}=render(<Year4MathVisual question={q}/>);
  expect(container.querySelector('figcaption').textContent).toBe(q.visual.property);
  expect(container.querySelectorAll('svg text')).toHaveLength(0);
});

it('drawn shape geometry agrees with side, angle and symmetry classifications',()=>{
  const polygons=new Map();
  for(const topic of ['shapes','symmetry'])for(let seed=1;seed<=20;seed++)for(const q of buildYear4Math(topic,1,seededRng(seed))){
    if(polygons.has(q.visual.shape))continue;
    const {container}=render(<Year4MathVisual question={q}/>);
    polygons.set(q.visual.shape,container.querySelector('polygon').getAttribute('points').split(' ').map(point=>point.split(',').map(Number)));
    cleanup();
  }
  const equal=(a,b)=>Math.abs(a-b)<1e-5;
  const lengths=points=>points.map(([x,y],i)=>Math.hypot(x-points[(i+1)%points.length][0],y-points[(i+1)%points.length][1]));
  const equilateral=lengths(polygons.get('equilateral'));
  expect(equilateral.every(n=>equal(n,equilateral[0]))).toBe(true);
  const rhombus=polygons.get('rhombus'),rhombusLengths=lengths(rhombus);
  expect(rhombusLengths.every(n=>equal(n,rhombusLengths[0]))).toBe(true);
  const dot=(rhombus[1][0]-rhombus[0][0])*(rhombus[3][0]-rhombus[0][0])+(rhombus[1][1]-rhombus[0][1])*(rhombus[3][1]-rhombus[0][1]);
  expect(equal(dot,0)).toBe(false);
  // A polygon mirror must pass through its centroid and a vertex or edge midpoint.
  for(const [shape,expected] of [['equilateral',3],['isosceles',1],['scalene',0],['rectangle',2],['square',4],['parallelogram',0],['rhombus',2],['trapezium',1]]){
    const points=polygons.get(shape), centre=[0,1].map(axis=>points.reduce((s,p)=>s+p[axis],0)/points.length);
    const candidates=points.concat(points.map((p,i)=>p.map((v,axis)=>(v+points[(i+1)%points.length][axis])/2)));
    const axes=[];
    for(const candidate of candidates){
      const delta=candidate.map((n,i)=>n-centre[i]), length=Math.hypot(...delta);
      if(length<1e-5)continue;
      const vector=delta.map(n=>n/length);
      if(!points.every(p=>{const relative=p.map((n,i)=>n-centre[i]),projection=relative[0]*vector[0]+relative[1]*vector[1];const reflected=relative.map((n,i)=>2*projection*vector[i]-n+centre[i]);return points.some(other=>Math.hypot(other[0]-reflected[0],other[1]-reflected[1])<1e-5);}))continue;
      if(!axes.some(axis=>Math.abs(axis[0]*vector[0]+axis[1]*vector[1])>1-1e-5))axes.push(vector);
    }
    expect(axes.length,shape).toBe(expected);
  }
});
