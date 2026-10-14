import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { BUILDERS, TOPIC_TITLES } from './builders/placeValue.js';
import { seededRng } from '../questionKinds.js';

const SEEDS = Array.from({length:100},(_,i)=>i+1);
const run = (topic,level,seed) => buildYear4Math(topic,level,seededRng(seed));
const key = q => JSON.stringify([q.prompt,q.terms,q.items?.map(x=>x.label).sort(),q.visual,q.tiles?.map(t=>t.label).sort(),q.cards?.map(c=>c.label).sort()]);
const runsDiffer = (topic,level) => new Set(SEEDS.slice(0,10).map(s=>JSON.stringify(run(topic,level,s).map(key).sort()))).size>1;
const num = s => Number(String(s).replace('−','-').replace('°C',''));

test('every place-value builder: no repeated question in a run, runs vary, levels differ',()=>{
  for(const topic of Object.keys(BUILDERS)) for(let level=1;level<=4;level++){
    for(const seed of SEEDS){ const qs=run(topic,level,seed); assert.equal(new Set(qs.map(key)).size,5,`${topic} L${level} seed ${seed}`); }
    assert.ok(runsDiffer(topic,level),`${topic} L${level} identical across seeds`);
  }
  for(const topic of Object.keys(BUILDERS)){
    const shapes=[1,2,3,4].map(l=>run(topic,l,3).map(q=>q.kind+'|'+q.prompt.replace(/\d+/g,'#')).sort().join());
    assert.equal(new Set(shapes).size,4,`${topic}: two levels set the same task`);
  }
});

test('titles: four short titles ending in a full stop for every builder',()=>{
  for(const topic of Object.keys(BUILDERS)){
    assert.equal(TOPIC_TITLES[topic]?.length,4,topic);
    for(const [i,t] of TOPIC_TITLES[topic].entries()){ assert.match(t,/\.$/); assert.ok(t.split(/\s+/).length<=6,t); assert.equal(titleFor(topic,i+1),t); }
  }
});

test('placeProblems level 4 is an applied multi-step problem, unlike level 2',()=>{
  for(const seed of SEEDS) for(const q of run('placeProblems',4,seed)){
    const m=q.prompt.match(/has (\d+) \w+ of 1000 \w+, (\d+) \w+ of 100 and (\d+) loose \w+\. It sells (\d+)/);
    assert.ok(m,q.prompt);
    assert.equal(q.answer,m[1]*1000+m[2]*100+Number(m[3])-m[4]);
  }
  assert.ok(run('placeProblems',2,1).every(q=>/thousands?, 1\d hundreds/.test(q.prompt)));
});

test('compare level 1 varies order and closeness; level 4 asks largest, smallest and difference',()=>{
  let firstRight=0, secondRight=0; const asks=new Set(), maxAt=new Set();
  for(const seed of SEEDS){
    for(const q of run('compare',1,seed)){
      const [, a, b]=q.prompt.match(/(\d+) or (\d+)/).map(Number);
      assert.equal(Math.floor(a/1000),Math.floor(b/1000),'same thousands');
      assert.equal(q.answer,Math.max(a,b));
      if(q.answer===a) firstRight++; else secondRight++;
    }
    for(const q of run('compare',4,seed)){
      const pops=[...q.prompt.matchAll(/([A-Z]\w+) (\d{4})/g)].map(m=>[m[1],Number(m[2])]);
      assert.equal(pops.length,4);
      const values=pops.map(p=>p[1]);
      if(q.kind==='number'){ asks.add('difference'); assert.equal(q.answer,Math.max(...values)-Math.min(...values)); }
      else { const most=/most/.test(q.prompt); asks.add(most?'most':'fewest');
        assert.equal(q.answer,pops.find(p=>p[1]===(most?Math.max:Math.min)(...values))[0]); }
      maxAt.add(values.indexOf(Math.max(...values)));
    }
  }
  assert.ok(firstRight>50&&secondRight>50);
  assert.deepEqual(asks,new Set(['most','fewest','difference']));
  assert.equal(maxAt.size,4,'largest town appears in every position');
});

test('represent level 2 is a true estimate on 0–10000 with one clear nearest option',()=>{
  let offMiddle=0;
  for(const seed of SEEDS) for(const q of run('represent',2,seed)){
    const v=q.visual;
    assert.equal(v.start,0); assert.equal(v.end,10000);
    if(v.point!==5000) offMiddle++;
    assert.equal(q.kind,'choice');
    const sorted=[...q.options].sort((a,b)=>Math.abs(a-v.point)-Math.abs(b-v.point));
    assert.equal(sorted[0],q.answer);
    assert.ok(Math.abs(sorted[1]-v.point)-Math.abs(q.answer-v.point)>=1000);
  }
  assert.ok(offMiddle>400);
});

test('negative: level 1 varies step and direction; level 2 is a different task',()=>{
  const steps=new Set(), dirs=new Set();
  for(const seed of SEEDS){
    for(const q of run('negative',1,seed)){
      const [, dir, step, start]=q.prompt.match(/Count (back|on) (\d+) from (−?\d+)/);
      steps.add(step); dirs.add(dir);
      assert.equal(num(q.answer),num(start)+(dir==='on'?1:-1)*Number(step));
      assert.ok(Math.sign(num(start))!==Math.sign(num(q.answer)),'crosses zero');
    }
    for(const q of run('negative',2,seed)){
      assert.equal(q.kind,'number');
      const m=q.prompt.match(/from (−?\d+) to (\d+)/);
      if(m) assert.equal(q.answer,num(m[2])-num(m[1]));
      else { const [, step, land]=q.prompt.match(/back (\d+) and landed on (−?\d+)/); assert.equal(q.answer-Number(step),num(land)); }
    }
  }
  assert.ok(steps.size>=4); assert.deepEqual(dirs,new Set(['back','on']));
});

test('roman: level 3 always has 4 distinct values; level 1 varies its numbers',()=>{
  const seen=new Set();
  for(const seed of SEEDS){
    for(const q of run('roman',3,seed)) assert.equal(new Set(q.items.map(i=>i.value)).size,4);
    for(const q of run('roman',1,seed)) seen.add(q.answer);
  }
  assert.ok(seen.size>15);
});

test('count level 1 starts vary between runs',()=>{
  const starts=new Set();
  for(const seed of SEEDS) for(const q of run('count',1,seed)) starts.add(q.terms[0]);
  assert.ok([...starts].some(s=>s!==0)&&starts.size>10);
});

test('negative level 2 missing-start questions keep both numbers on the −6 to 6 line',()=>{
  for(const seed of SEEDS) for(const q of run('negative',2,seed)){
    const m=q.prompt.match(/back (\d+) and landed on (−?\d+)/);
    if(!m) continue;
    assert.ok(num(m[2])>=-6&&q.answer<=6,q.prompt);
  }
});

test('more and place level 1 offer place-value near-misses, not off-by-ones',()=>{
  for(const seed of SEEDS){
    for(const q of run('more',1,seed)) for(const o of q.options) assert.ok((o-q.answer)%100===0,q.prompt);
    for(const q of run('place',1,seed)){
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options.map(o=>String(o).replace(/0+$/,''))).size,1,'same digit worth 1, 10, 100 or 1000');
    }
  }
});

test('place-value counts use the singular for 1 (1 thousand, 1 ten, 1 one)',()=>{
  for(const seed of SEEDS) for(const topic of ['place','placeProblems']) for(const level of [2,4]) for(const q of run(topic,level,seed))
    assert.doesNotMatch(q.prompt,/\b1 (thousands|hundreds|tens|ones)\b/,q.prompt);
});

test('negative and roman ordering levels finish with a constant random source (no retry loops)',()=>{
  for(const rng of [()=>0,()=>.999999]) for(const topic of ['negative','roman']){
    const qs=buildYear4Math(topic,3,rng);
    for(const q of qs) assert.equal(new Set(q.items.map(i=>i.value)).size,4);
  }
});
