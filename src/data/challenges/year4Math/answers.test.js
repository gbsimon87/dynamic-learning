import test from 'node:test';
import assert from 'node:assert/strict';
import { expressionValue, isYear4MathCorrect } from './answers.js';
import { buildYear4Math, TOPIC_KEYS } from './questions.js';
import { seededRng, lintBuild } from '../questionKinds.js';

function idsFor(q, labels) {
  const pool=[...q.tiles];
  return labels.map(label=>{const i=pool.findIndex(tile=>tile.label===label);assert.ok(i>=0,label);return pool.splice(i,1)[0].id;});
}

test('maths tile expressions obey brackets, precedence and fractions without evaluating code',()=>{
  for(const [text,answer] of [['2 + 3 × 4',14],['(2 + 3) × 4',20],['600 ÷ 3',200],['2/4 + 3/4',1.25],['1.20 − 0.25',.95]])assert.equal(expressionValue(text),answer);
  for(const text of ['', '1 2', '(2+3', '2+3)', '2 +', '2 ÷ 0', '2 × × 3', '2=2', 'Math.random()', '1;globalThis.x=1'])assert.equal(expressionValue(text),null,text);
});

test('all mathematical tile banks accept their calculations over 100 seeded builds',()=>{
  for(const topic of TOPIC_KEYS)for(let level=1;level<=4;level++)for(let seed=1;seed<=100;seed++){
    for(const q of buildYear4Math(topic,level,seededRng(seed)).filter(q=>q.kind==='build'&&!q.letters)){
      assert.ok(q.maths,topic);
      const response=idsFor(q,q.answer.split(' '));
      assert.ok(isYear4MathCorrect(q,response),`${topic}: ${q.answer}`);
      assert.equal(isYear4MathCorrect(q,response.slice(1)),false);
      assert.equal(isYear4MathCorrect(q,response.map(()=>response[0])),false);
      assert.equal(isYear4MathCorrect(q,response.map(()=> 'unknown')),false);
    }
  }
});

test('equivalent expanded sums, reversed addends and both inverse checks are valid',()=>{
  const place=buildYear4Math('place',3,seededRng(9))[0], terms=place.answer.split(' ');
  assert.ok(isYear4MathCorrect(place,idsFor(place,[terms[6],'+',terms[4],'+',terms[2],'+',terms[0]])));
  const inverse=buildYear4Math('inverse',3,seededRng(9))[0], [sum,minus,b,equals,a]=inverse.answer.split(' ');
  assert.ok(isYear4MathCorrect(inverse,idsFor(inverse,[sum,minus,a,equals,b])));
  assert.equal(isYear4MathCorrect(inverse,idsFor(inverse,[b,minus,sum,equals,a])),false);
  const written=buildYear4Math('written',3,seededRng(9))[0], [t,plus,o,e,total]=written.answer.split(' ');
  assert.ok(isYear4MathCorrect(written,idsFor(written,[o,plus,t,e,total])));
});

test('perimeter accepts all traversals and addend orders rather than one string',()=>{
  const q=buildYear4Math('perimeter',3,seededRng(3))[0];
  const terms=q.answer.split(' ').filter(label=>label!=='+').reverse();
  const labels=terms.flatMap((term,i)=>i===0?[term]:['+',term]);
  assert.ok(isYear4MathCorrect(q,idsFor(q,labels)));
});

test('numeric tiles accept leading zeroes but reject incomplete and repeated tiles',()=>{
  const q=buildYear4Math('columns',3,seededRng(3))[0];
  const labels=[...q.answer];
  assert.ok(isYear4MathCorrect(q,idsFor(q,labels)));
  assert.equal(isYear4MathCorrect(q,[]),false);
  assert.ok(isYear4MathCorrect({kind:'build',tiles:[{id:'0',label:'0'},{id:'4',label:'4'},{id:'2',label:'2'}],maths:{kind:'digits',value:42}},['0','4','2']));
  assert.equal(isYear4MathCorrect({kind:'number',answer:42},'43'),false);
});

test('banks remain fair at random-source boundaries and reject inherited topic names',()=>{
  for(const topic of TOPIC_KEYS)for(const rng of [()=>0,()=>.999999]){
    assert.deepEqual(lintBuild((l)=>buildYear4Math(topic,l,rng),{seeds:1,year:4,minQuestions:5}),[],topic);
  }
  for(const topic of ['constructor','__proto__','toString','missing'])assert.throws(()=>buildYear4Math(topic,1),RangeError);
  for(const level of [0,5,1.5,NaN])assert.throws(()=>buildYear4Math('place',level),RangeError);
});

test('comparison banks exercise less than, greater than and equal to',()=>{
  for(const topic of ['compare','decimalCompare']){
    const answers=new Set();
    for(let seed=1;seed<=100;seed++) for(const q of buildYear4Math(topic,2,seededRng(seed)))answers.add(q.answer);
    assert.deepEqual(answers,new Set(['<','>','=']));
  }
});

test('later clock levels cover every minute and midnight without starting at the answer',()=>{
  const minutes=new Set();
  let midnight=false;
  for(let seed=1;seed<=100;seed++)for(const q of buildYear4Math('time',3,seededRng(seed))){
    minutes.add(q.time.minute);
    assert.equal(q.minuteStep,1);
    assert.notDeepEqual(q.start,q.time);
    if(q.prompt.includes('00:'))midnight=true;
  }
  assert.equal(minutes.size,60);
  assert.ok(midnight);
});

test('graph differences and derived division facts vary rather than always giving the same answer',()=>{
  for(const [topic,level,filter] of [['graphs',4,()=>true],['data',4,q=>q.ask.op==='difference'],['mental',2,q=>q.prompt.includes('÷')&&!q.prompt.includes('÷ 1')]]){
    const answers=new Set();
    for(let seed=1;seed<=100;seed++) for(const q of buildYear4Math(topic,level,seededRng(seed)).filter(filter))answers.add(q.answer);
    assert.ok(answers.size>=3,`${topic} only offers ${answers.size} answers`);
  }
});

test('division-by-10-and-100 inputs stay one or two digits even at ordered-bank boundaries',()=>{
  for(const rng of [()=>0,()=>.999999,seededRng(7)])for(let level=1;level<=4;level++){
    for(const q of buildYear4Math('decimalDivide',level,rng)){
      const values=q.kind==='order'?q.items.map(item=>Number(item.label.split(' ÷ ')[0])):[Number(q.prompt.match(/\d+/)[0])];
      assert.ok(values.every(n=>n>=1&&n<=99),q.prompt);
    }
  }
});
