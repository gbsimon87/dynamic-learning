import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { year4MathCurriculum } from '../../year4MathCurriculum.js';
import { loadCurriculum } from '../../curriculumRegistry.js';
import { buildLockState } from '../../curriculumLocks.js';
import { completeChallenge } from '../../progressRules.js';
import { buildYear4Math, TOPIC_KEYS, TITLES, roman, titleFor } from './questions.js';
import { lintBuild, seededRng, isCorrect, isReady } from '../questionKinds.js';
import { toKebabCase } from '../../../utils/toKebabCase.js';

const topics=year4MathCurriculum.flatMap(c=>c.topics);
test('all 42 mapped topics are registered with 168 correctly named challenge modules',()=>{
  assert.equal(year4MathCurriculum.length,8);
  assert.equal(topics.length,42);
  assert.equal(new Set(topics.map(t=>t.id)).size,42);
  assert.deepEqual(new Set(topics.map(t=>t.builder)),new Set(TOPIC_KEYS));
  assert.equal(loadCurriculum(4,'math'),year4MathCurriculum);
  const mapping=readFileSync(new URL('../../../../docs/curriculum/year-4-maths.md',import.meta.url),'utf8');
  for(const category of year4MathCurriculum){
    assert.equal(category.id,toKebabCase(category.title));
    for(const topic of category.topics){
      assert.equal(topic.id,toKebabCase(topic.name));
      assert.ok(mapping.includes(`| ${topic.name} |`),topic.name);
      assert.deepEqual(topic.challenges.map(c=>c.id),[1,2,3,4]);
      const pascal=topic.id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('');
      for(const {id} of topic.challenges){
        const path=new URL(`../../../pages/skills/math/challenges/year4/${topic.id}/${pascal}Challenge${id}.jsx`,import.meta.url);
        assert.ok(existsSync(path),String(path));
        const source=readFileSync(path,'utf8');
        assert.match(source,/export default/);
        assert.ok(source.includes(`topic="${topic.builder}" level={${id}}`));
      }
    }
  }
});
for(const topic of TOPIC_KEYS){
  test(`${topic}: four fair, deterministic and answerable banks over 100 seeds`,()=>{
    const builder=(level,rng)=>buildYear4Math(topic,level,rng);
    assert.deepEqual(lintBuild(builder,{titles:TITLES,year:4,seeds:100,minQuestions:5}),[]);
    for(let level=1;level<=4;level++){
      assert.deepEqual(builder(level,seededRng(7)),builder(level,seededRng(7)));
      for(const q of builder(level,seededRng(7))){
        let response;
        switch(q.kind){
          case 'choice':response=q.answer;break;
          case 'number':response=String(q.answer);break;
          case 'type':response=q.answer;break;
          case 'sequence':response={values:Object.fromEntries(q.gaps.map(i=>[i,String(q.terms[i])]))};break;
          case 'sort':response=Object.fromEntries(q.cards.map(c=>[c.id,c.bin]));break;
          case 'order':response=q.answer.map(id=>q.items.find(item=>item.id===id));break;
          case 'build': { const pool=[...q.tiles]; const labels=q.letters?[...q.answer]:q.answer.split(' '); response=labels.map(label=>{const index=pool.findIndex(t=>t.label===label);return pool.splice(index,1)[0].id;}); break; }
          case 'fraction':response=Array.from({length:q.parts},(_,i)=>i<q.answer);break;
          case 'clock':response=q.time;break;
          case 'chart':response=String(q.answer);break;
          default:assert.fail(q.kind);
        }
        assert.ok(isReady(q,response),q.prompt);
        assert.ok(isCorrect(q,response),q.prompt);
        if(q.kind==='number') assert.ok(String(q.answer).length<=q.maxDigits);
        if(q.kind==='sequence') for(const i of q.gaps) assert.ok(String(q.terms[i]).length<=(q.maxDigits??3));
      }
    }
  });
}

test('formal calculation diagrams, grids, reflection and graph answers agree with their visuals',()=>{
  for(let seed=1;seed<=100;seed++) for(let level=1;level<=4;level++) for(const topic of TOPIC_KEYS){
    for(const q of buildYear4Math(topic,level,seededRng(seed))){
      const v=q.visual;
      if(v?.type==='column' && q.kind==='number'){
        const answer=v.op==='+'?v.a+v.b:v.op==='−'?v.a-v.b:v.a*v.b;
        assert.equal(q.answer,answer);
      }
      if(topic==='area'&&q.kind==='number')assert.equal(q.answer+(q.laid??0),new Set(v.cells.map(c=>c.join(','))).size);
      if(topic==='reflect'){
        const expected=new Set(v.cells.map(([x,y])=>v.horizontal?`${x},${5-y}`:`${5-x},${y}`));
        assert.deepEqual(new Set(q.cards.filter(c=>c.bin==='Coloured').map(c=>c.label)),expected);
      }
      if(topic==='polygon'){
        const [a,b,c]=v.points;
        assert.equal(q.answer,`(${a.x+c.x-b.x}, ${a.y+c.y-b.y})`);
      }
      if(v?.type==='coordinates'){
        assert.equal(q.options.filter(x=>x===q.answer).length,1);
        assert.ok(v.points.every(p=>p.x>=0&&p.x<=5&&p.y>=0&&p.y<=5));
      }
      if(v?.type==='line'&&q.kind==='number'){
        const at=[...q.prompt.matchAll(/\d\d:\d\d/g)].map(m=>v.values[v.labels.indexOf(m[0])]);
        assert.equal(q.answer,level===4?Math.abs(at[1]-at[0]):at[0]);
      }
      if(topic==='perimeter'&&q.kind==='number'&&v){
        const points=v.points??(v.cut?[[0,0],[v.w-v.cut.w,0],[v.w-v.cut.w,v.cut.h],[v.w,v.cut.h],[v.w,v.h],[0,v.h]]:[[0,0],[v.w,0],[v.w,v.h],[0,v.h]]);
        assert.equal(q.answer,points.reduce((sum,[x,y],i)=>{const [a,b]=points[(i+1)%points.length];return sum+Math.abs(x-a)+Math.abs(y-b);},0));
      }
    }
  }
});

test('Roman numerals round-trip all values from I to C including subtractive notation',()=>{
  const values={I:1,V:5,X:10,L:50,C:100};
  for(let n=1;n<=100;n++){
    const letters=[...roman(n)];
    assert.equal(letters.reduce((sum,c,i)=>sum+(values[c]<(values[letters[i+1]]??0)?-values[c]:values[c]),0),n);
  }
  assert.equal(roman(49),'XLIX');
  assert.equal(roman(99),'XCIX');
});

test('new pathway gates in sequence, completes, reloads and replays without duplicates',()=>{
  const curriculum=year4MathCurriculum, isBuilt=()=>true;
  let progress={};
  let locks=buildLockState({curriculum,progress,isBuilt});
  assert.equal(locks.filter(c=>!c.locked).length,1);
  assert.equal(locks[0].topics.filter(t=>!t.locked).length,1);
  assert.equal(locks[0].topics[0].challenges.filter(c=>!c.locked).length,1);
  for(const category of curriculum) for(const topic of category.topics) for(const challenge of topic.challenges){
    locks=buildLockState({curriculum,progress,isBuilt});
    assert.equal(locks.find(c=>c.id===category.id).topics.find(t=>t.id===topic.id).challenges.find(c=>c.id===challenge.id).locked,false);
    progress=completeChallenge(progress,category.id,topic.id,String(challenge.id));
    assert.equal(completeChallenge(progress,category.id,topic.id,challenge.id),progress);
    progress=JSON.parse(JSON.stringify(progress));
  }
  assert.ok(buildLockState({curriculum,progress,isBuilt}).every(c=>c.complete));
});

test('applied stories recompute from the numbers and units the learner reads',()=>{
  for(let seed=1;seed<=100;seed++) for(const topic of ['count','more','negative','addProblems','mulProblems','fractionSets','fractionCalc','decimalProblems','money','timeProblems']){
    for(const q of buildYear4Math(topic,4,seededRng(seed))){
      const ns=q.prompt.match(/\d+/g).map(Number);
      let expected;
      if(topic==='count')expected=ns[0]+ns[1]*ns[2];
      if(topic==='more')expected=ns[0]+(q.prompt.includes('receives')?1:-1)*1000;
      if(topic==='negative'){const start=Number(q.prompt.match(/It is (−?\d+)°C/)[1].replace('−','-')), end=start+(q.prompt.includes('warmer')?1:-1)*ns[1];expected=`${String(end).replace('-','−')}°C`;}
      if(topic==='addProblems')expected=q.prompt.includes('trip')?ns[0]+ns[1]-ns[2]:q.prompt.includes('less')?2*ns[0]-ns[1]:q.prompt.includes('further')?2*ns[0]+ns[1]:ns[0]-ns[1]-ns[2];
      if(topic==='mulProblems')expected=q.prompt.includes('both')?ns[0]+ns[0]*ns[1]:q.prompt.includes('more')?ns[0]*(ns[1]+ns[2]):ns[0]*ns[1]+(q.prompt.includes('extra')?ns[2]:0);
      if(topic==='fractionSets')expected=ns[0]/ns[2]*ns[1];
      if(topic==='fractionCalc')expected=`${ns[0]+(/cut off|poured out/.test(q.prompt)?-1:1)*ns[2]}/${ns[1]}`;
      if(topic==='decimalProblems'){
        const amounts=[...q.prompt.matchAll(/(\d+\.\d+)/g)].map(m=>Math.round(Number(m[1])*100));
        expected=q.prompt.includes('ribbon')?(amounts[0]-amounts[1])/2:Number(q.prompt.match(/£(\d+) note/)[1])*100-amounts[0]-amounts[1];
      }
      if(topic==='money'){const c=q.calc;expected=c.op==='change'?c.note*100-c.spend[0]-c.spend[1]:c.op==='left'?c.whole-c.spend[0]-c.spend[1]:c.op==='add'?c.parts[0]+c.parts[1]:c.parts[0]*c.parts[1];}
      if(topic==='timeProblems'){
        const factor=/\b(hours?|seconds?)\b/.test(q.prompt)?60:/\byears?\b/.test(q.prompt)?12:7;
        expected=ns[0]*factor+ns[1];
      }
      assert.equal(q.answer,expected,`${topic}: ${q.prompt}`);
    }
  }
});

test('no question repeats its challenge title as the prompt, so a sentence never shows twice',()=>{
  // The title heads the ChallengeShell; the prompt (and any rule line) sits right under it.
  const plain=text=>String(text??'').replace(/\*\*/g,'').trim().toLowerCase();
  for(const topic of TOPIC_KEYS)for(let level=1;level<=4;level++){
    const title=plain(titleFor(topic,level));
    assert.ok(title,`${topic} level ${level} has a title`);
    for(let seed=1;seed<=60;seed++)for(const q of buildYear4Math(topic,level,seededRng(seed))){
      assert.notEqual(plain(q.prompt),title,`${topic} level ${level} prompt repeats its title: ${q.prompt}`);
      if(q.rule)assert.notEqual(plain(q.rule),title,`${topic} level ${level} rule repeats its title: ${q.rule}`);
    }
  }
});
