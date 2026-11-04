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
const solve = q => q.kind === 'build' ? [...q.answer].reduce((ids, char) => [...ids, q.tiles.find(t => t.label === char && !ids.includes(t.id)).id], []) : q.kind === 'order' ? [...q.items].sort((a,b) => a.value-b.value)
  : q.kind === 'sort' ? Object.fromEntries(q.cards.map(c => [c.id, c.bin]))
    : q.kind === 'number' ? String(q.answer) : q.answer;

test('Year 6 Maths registers the approved 49-topic tree with every slot built', () => {
  assert.equal(loadCurriculum(6, 'math'), year6MathCurriculum);
  assert.equal(topics.length, 49);
  assert.equal(year6MathCurriculum.length, 9);
  assert.equal(countsTowardYear(6, 'math'), false);
  assert.equal(countsTowardYear(6, 'science'), false);
  assert.deepEqual(TOPIC_KEYS, topics.map(t => t.id));
  const proposal = readFileSync(new URL('../../docs/superpowers/2026-11-04-year6-math-course-build.md', import.meta.url), 'utf8');
  for (const topic of topics) {
    assert.ok(proposal.includes(`\`${topic.id}\``), topic.id);
    assert.deepEqual(topic.challenges.map(c => c.id), [1,2,3,4]);
    for (const level of [1,2,3,4]) {
      const pascal = topic.id.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join('');
      const url = new URL(`../pages/skills/math/challenges/year6/${topic.id}/${pascal}Challenge${level}.jsx`, import.meta.url);
      assert.equal(existsSync(url), true, topic.id);
      const code = readFileSync(url,'utf8');
      assert.ok((code.includes(`topic="${topic.id}" level={${level}}`) || code.includes(`topic={"${topic.id}"} level={${level}}`)) && code.includes('onComplete={onComplete}'));
      assert.ok(getLesson('math',6,topic.id,level)?.example);
    }
  }
});

test('all Year 6 Maths variants are valid, solvable and keep givens within Year 6', () => {
  for (const topic of TOPIC_KEYS) {
    assert.deepEqual(lintBuild((l,r) => buildYear6Math(topic,l,r),{ year:6,titles:TITLES,seeds:50,minQuestions:5 }),[],topic);
    for (const level of [1,2,3,4]) for (let seed=1;seed<=50;seed++) {
      const run=buildYear6Math(topic,level,seededRng(seed));
      assert.equal(run.length,5);
      // The pilot promises unique prompts; later topics may reuse instructions with different models.
      if (TOPIC_KEYS.indexOf(topic) < 4) assert.equal(new Set(run.map(q=>q.prompt)).size,5,`${topic}/${level} repeated prompt`);
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
      if(q.kind==='order' && TOPIC_KEYS.indexOf(topic) < 4) {
        const chosen=q.answer.map(id=>q.items.find(item=>item.id===id));
        assert.deepEqual(chosen.map(c=>numeric(c.label.split(': ').at(-1))), [...chosen].map(c=>c.value).sort((a,b)=>a-b));
      } else if(q.kind==='sort') {
        const unit=numeric(q.prompt.match(/nearest ([\d,]+)/)[1]);
        for(const card of q.cards) {
          const value=numeric(card.label), lower=Math.floor(value/unit)*unit;
          assert.equal(numeric(card.bin), value-lower<unit/2 ? lower : lower+unit);
        }
      } else if(TOPIC_KEYS.indexOf(topic) < 4 && (q.prompt.startsWith('Round ') || q.prompt.includes('rounded to the nearest') || q.prompt.includes('Round this number'))) {
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

// Read the visible arithmetic rather than accepting the bank's stored answer.
const fractionValue = text => {
  const [a, b] = text.split('/').map(Number);
  return a / b;
};
const close = (actual, expected, prompt) => assert.ok(Math.abs(Number(actual) - expected) < 1e-9, prompt);

test('new operations, fractions, ratio and geometry answers match their visible quantities', () => {
  for (let seed = 1; seed <= 10; seed++) {
    const run = (topic, level) => buildYear6Math(topic, level, seededRng(seed));
    for (const q of run('order-of-operations', 4)) {
      const [bonus, groups, points] = q.prompt.match(/\d+/g).map(Number);
      assert.equal(q.answer, bonus + groups * points, q.prompt);
    }
    for (const level of [2, 4]) for (const q of run('four-operation-problems', level)) {
      assert.ok(Number.isInteger(q.answer), q.prompt);
      const values = q.prompt.match(/[\d,]+/g).map(numeric);
      assert.equal(q.answer, level === 2 ? values[0] / values[1] : values[0] * values[1] / values[2], q.prompt);
    }
    for (const topic of ['adding-and-subtracting-fractions-and-mixed-numbers', 'multiplying-proper-fractions', 'dividing-fractions-by-whole-numbers']) {
      for (const q of run(topic, 1)) {
        const [left, op, right] = q.prompt.match(/(\d+\/\d+) ([+×÷]) (\d+(?:\/\d+)?)/).slice(1);
        const a = fractionValue(left), b = right.includes('/') ? fractionValue(right) : Number(right);
        close(fractionValue(q.answer), op === '+' ? a + b : op === '×' ? a * b : a / b, q.prompt);
      }
    }
    for (const [topic, level, op] of [
      ['adding-and-subtracting-fractions-and-mixed-numbers', 3, '+'],
      ['multiplying-proper-fractions', 2, '×'],
    ]) for (const q of run(topic, level)) {
      const target = fractionValue(q.prompt.match(/\d+\/\d+/)[0]);
      const value = expression => {
        const [a, b] = expression.split(` ${op} `).map(fractionValue);
        return op === '+' ? a + b : a * b;
      };
      close(value(q.answer), target, q.prompt);
      for (const wrong of q.options.filter(option => option !== q.answer)) {
        if (wrong.includes(` ${op} `)) assert.ok(Math.abs(value(wrong) - target) > 1e-9, wrong);
      }
    }
    for (const q of run('dividing-fractions-by-whole-numbers', 3)) for (const item of q.items) {
      const [a, b, divisor] = item.label.match(/\d+/g).map(Number);
      close(item.value, a / b / divisor, item.label);
    }
    for (const q of run('percentages-of-amounts-and-comparisons', 2)) {
      const [pct, total] = q.prompt.match(/\d+/g).map(Number);
      assert.equal(q.answer, total * pct / 100, q.prompt);
    }
    for (const q of run('equations-with-two-unknowns', 2)) {
      const [total, x] = q.prompt.match(/\d+/g).map(Number);
      assert.equal(q.answer + x, total, q.prompt);
    }
    for (const q of run('3-d-shapes-and-nets', 4)) assert.equal(q.answer, 6, q.prompt);
    for (const q of run('volumes-of-cubes-and-cuboids', 2)) {
      const dimensions = q.prompt.match(/\d+/g).map(Number);
      assert.equal(q.answer, dimensions.reduce((a, b) => a * b, 1), q.prompt);
    }
  }
});
