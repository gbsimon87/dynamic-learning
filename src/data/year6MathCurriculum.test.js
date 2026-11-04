import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { year6MathCurriculum } from './year6MathCurriculum.js';
import { loadCurriculum, countsTowardYear } from './curriculumRegistry.js';
import { TOPIC_KEYS, buildYear6Math, TITLES } from './challenges/year6Math/questions.js';
import { words6 } from './challenges/year6Math/placeValue.js';
import { lintBuild, seededRng, isCorrect, initialResponse, isReady } from './challenges/questionKinds.js';
import { isYear5MathCorrect } from './challenges/year5Math/answers.js';
import { getLesson } from './lessons/index.js';

const topics = year6MathCurriculum.flatMap(c => c.topics);
const numeric = text => Number(String(text).replaceAll(',', '').replace('−', '-').replace('°C', ''));
const solve = q => q.kind === 'order' ? [...q.items].sort((a,b) => a.value-b.value)
  : q.kind === 'sort' ? Object.fromEntries(q.cards.map(c => [c.id, c.bin]))
    : q.kind === 'number' ? String(q.answer) : q.answer;

test('Year 6 Maths registers the approved 49-topic tree, with only the 16-slot pilot built', () => {
  assert.equal(loadCurriculum(6, 'math'), year6MathCurriculum);
  assert.equal(topics.length, 49);
  assert.equal(year6MathCurriculum.length, 9);
  assert.equal(countsTowardYear(6, 'math'), false);
  assert.equal(countsTowardYear(6, 'science'), false);
  assert.deepEqual(TOPIC_KEYS, year6MathCurriculum[0].topics.map(t => t.id));
  const proposal = readFileSync(new URL('../../docs/superpowers/2026-11-04-year6-math-course-build.md', import.meta.url), 'utf8');
  for (const topic of topics) {
    assert.ok(proposal.includes(`\`${topic.id}\``), topic.id);
    assert.deepEqual(topic.challenges.map(c => c.id), [1,2,3,4]);
    for (const level of [1,2,3,4]) {
      const pascal = topic.id.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join('');
      const url = new URL(`../pages/skills/math/challenges/year6/${topic.id}/${pascal}Challenge${level}.jsx`, import.meta.url);
      assert.equal(existsSync(url), TOPIC_KEYS.includes(topic.id), topic.id);
      if (TOPIC_KEYS.includes(topic.id)) {
        const code = readFileSync(url,'utf8');
        assert.ok(code.includes(`topic="${topic.id}" level={${level}}`) && code.includes('onComplete={onComplete}'));
        assert.ok(getLesson('math',6,topic.id,level)?.example);
      } else assert.equal(getLesson('math',6,topic.id,level),null);
    }
  }
});

test('all pilot variants are valid, solvable, distinct and keep givens within Year 6', () => {
  for (const topic of TOPIC_KEYS) {
    assert.deepEqual(lintBuild((l,r) => buildYear6Math(topic,l,r),{ year:6,titles:TITLES,seeds:50,minQuestions:5 }),[],topic);
    for (const level of [1,2,3,4]) for (let seed=1;seed<=50;seed++) {
      const run=buildYear6Math(topic,level,seededRng(seed));
      assert.equal(run.length,5);
      assert.equal(new Set(run.map(q=>q.prompt)).size,5,`${topic}/${level} repeated prompt`);
      for (const q of run) {
        assert.equal(isCorrect(q,initialResponse(q)),false,q.prompt);
        assert.equal(isReady(q,solve(q)),true,q.prompt);
        assert.equal(isYear5MathCorrect(q,solve(q)),true,q.prompt);
        if(q.kind==='number') {
          assert.ok(q.answer>=0 && q.answer<=10000000,q.prompt);
          assert.ok(String(q.answer).length<=q.maxDigits,q.prompt);
          assert.equal(isCorrect(q,String(q.answer+1)),false);
        }
        if(q.kind==='choice') for(const wrong of q.options.filter(o=>o!==q.answer)) assert.equal(isCorrect(q,wrong),false);
        if(q.visual?.type==='line5') {
          assert.ok(q.visual.max-q.visual.min<=50,'number line must have bounded tick count');
          assert.ok(q.visual.marks.every(m=>Number.isFinite(m.value)&&m.value>=q.visual.min&&m.value<=q.visual.max));
        }
        if(q.visual?.type==='place6') assert.ok(Number(q.visual.digits.join(''))<=10000000);
      }
    }
  }
  assert.throws(()=>buildYear6Math('unbuilt',1),RangeError);
  assert.throws(()=>buildYear6Math(TOPIC_KEYS[0],0),RangeError);
});

test('answers follow independently computed visible givens', () => {
  for(let seed=1;seed<=30;seed++) for(const topic of TOPIC_KEYS) for(const level of [1,2,3,4]) {
    for(const q of buildYear6Math(topic,level,seededRng(seed))) {
      if(q.kind==='order') {
        const chosen=q.answer.map(id=>q.items.find(item=>item.id===id));
        assert.deepEqual(chosen.map(c=>numeric(c.label.split(': ').at(-1))), [...chosen].map(c=>c.value).sort((a,b)=>a-b));
      } else if(q.kind==='sort') {
        const unit=numeric(q.prompt.match(/nearest ([\d,]+)/)[1]);
        for(const card of q.cards) {
          const value=numeric(card.label), lower=Math.floor(value/unit)*unit;
          assert.equal(numeric(card.bin), value-lower<unit/2 ? lower : lower+unit);
        }
      } else if(q.prompt.startsWith('Round ') || q.prompt.includes('rounded to the nearest') || q.prompt.includes('Round this number')) {
        const values=q.prompt.match(/[\d,]+/g).map(numeric);
        const [value,unit]=values;
        const lower=Math.floor(value/unit)*unit;
        assert.equal(q.answer,value-lower<unit/2?lower:lower+unit);
      } else if(topic==='negative-numbers-and-intervals') {
        const values=q.prompt.match(/−?\d+/g).map(numeric);
        if(level===1) assert.equal(numeric(q.answer),values[0]+values[1]);
        if(level===2) assert.equal(q.answer,values[0]-values[1]);
        if(level===4 && q.kind==='number') assert.equal(q.answer,values[1]-values[0]);
        if(level===4 && q.kind==='choice') assert.equal(numeric(q.answer),values[0]-values[1]);
      } else if(topic==='place-value-to-ten-million' && level===1) {
        const heads=['ones','tens','hundreds','thousands','ten thousands','hundred thousands','millions','ten millions'];
        const position=heads.indexOf(q.prompt.match(/in the (.+) place/)[1]);
        const given=Number(q.visual.digits.join(''));
        assert.equal(q.answer,Math.floor(given/10**position)%10*10**position);
      } else if(topic==='place-value-problems' && (level===1 || level===4)) {
        const values=q.prompt.match(/[\d,]+/g).map(numeric);
        assert.equal(q.answer,values[0]+values[1]-(values[2]??0));
      }
    }
  }
});

test('British number words cover empty places and the ten-million boundary',()=>{
  assert.equal(words6(10000000),'ten million');
  assert.equal(words6(1000001),'one million and one');
  assert.equal(words6(2001000),'two million, one thousand');
  assert.equal(words6(3050042),'three million, fifty thousand and forty-two');
});
