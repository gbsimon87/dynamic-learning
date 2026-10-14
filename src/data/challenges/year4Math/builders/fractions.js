import { allCells, build, choice, fractionWrong, grid, int, number, order, pick, sequence, shuffle, sort } from '../kit.js';

// Decimals are shown the way a child writes them: 0.5, 0.3, 2.25 — never 0.50.
// Money keeps two places (£2.30), because that is how prices are written.
const dec = hundredths => String(hundredths / 100);
const tenth = tenths => String(tenths / 10);
const money = pence => `£${(pence / 100).toFixed(2)}`;
// The i-th fifth of [low, high], so the five questions in a run never share a value.
const band = (r, i, low, high) => {
  const width = Math.floor((high - low + 1) / 5);
  return low + i * width + int(r, 0, width - 1);
};
const BASE_FRACTIONS = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5]];
const baseFraction = (r, i) => BASE_FRACTIONS[Math.min(8, 2 * i + int(r, 0, 1))];
// Two different, non-zero digits, so each digit names exactly one place.
const twoDigits = (r, i) => {
  const tens = Math.min(9, 2 * i + 1 + int(r, 0, 1));
  let ones = int(r, 1, 8);
  if (ones >= tens) ones += 1;
  return [tens, ones];
};

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  equivalent(l,r,i) {
    const [n,d]=baseFraction(r,i), factor=l===3?int(r,2,Math.floor(12/d)):int(r,2,4);
    if(l===3) return {kind:'fraction',mode:'shade',parts:d*factor,answer:n*factor,prompt:`Shade ${n}/${d} of this bar split into ${d*factor} parts.`};
    if(l===4) {
      const [thing,parts,who,verb]=[['strip of card','sections','Mia','colour'],['garden','beds','Sam','plant'],['window','panes','Ava','paint'],['wall','tiles','Leo','paint'],['cake','slices','Zara','ice']][i];
      return number(`Tom ${verb}s ${n}/${d} of his ${thing}. ${who}'s ${thing} is the same size but has ${d*factor} equal ${parts}. How many ${parts} must ${who} ${verb} to match Tom?`,n*factor,{hint:`Find a fraction equal to ${n}/${d} with ${d*factor} at the bottom.`});
    }
    if(l===2) return i%2
      ? number(`Find the missing denominator: ${n}/${d} = ${n*factor}/?`,d*factor,{hint:`The top was multiplied by ${factor}. Do the same to the bottom.`})
      : number(`Find the missing numerator: ${n}/${d} = ?/${d*factor}`,n*factor,{hint:`The bottom was multiplied by ${factor}. Do the same to the top.`});
    return choice(`Which fraction equals ${n}/${d}?`,`${n*factor}/${d*factor}`,fractionWrong(n*factor,d*factor),r,{visual:{type:'fraction',n,d},rule:'Multiply numerator and denominator by the same number.'});
  },
  hundredths(l,r,i) {
    const n=band(r,i,11,85);
    if(l===3) return order('Order from smallest to largest.',[n,n+1,n+5,n+10],r,x=>`${x}/100`);
    if(l===4) return number(`A strip has 100 equal squares. ${n} are coloured, then 3 more are coloured. How many hundredths are coloured?`,n+3);
    return sequence(l===1?n:n+4,l===1?1:-1,'Fill the numerators. Every fraction has denominator 100.',{captions:['/100','/100','/100','/100','/100'],...(l===1?{rule:'One hundredth is 1 of 100 equal parts. A tenth contains 10 hundredths.'}:{})});
  },
  fractionSets(l,r,i) {
    const d=[3,4,5,8,10][i], n=l===1?1:int(r,2,d-1), group=int(r,4,20), total=d*group;
    if(l===3) return build(`Build a calculation for ${n}/${d} of ${total}.`,['(',String(total),'÷',String(d),')','×',String(n),'=',String(group*n)],r);
    const story=[['seedlings','are planted','are planted'],['stickers','are gold','are gold'],['marbles','are blue','are blue'],['pages in a book','have pictures','have pictures'],['apples in a box','are red','are red']][i];
    return number(l===4?`There are ${total} ${story[0]}. ${n}/${d} of them ${story[1]}. How many ${story[2]}?`:`What is ${n}/${d} of ${total}?`,n*group,l===1?{rule:'Divide by the denominator to find one part.'}:{hint:'Find one part by dividing, then multiply by the numerator.'});
  },
  fractionCalc(l,r,i) {
    const d=[4,5,6,8,10][i], subtract=i%2===1;
    if(l===4) {
      // Story answers stay at or below one whole, given as a whole fraction.
      const answer=subtract?int(r,1,d-2):int(r,2,d-1), b=subtract?int(r,1,d-1-answer):int(r,1,answer-1), first=subtract?answer+b:answer-b;
      const wrong=[`${answer+1}/${d}`,`${answer>1?answer-1:answer+2}/${d}`,`${subtract?(first+b<=d?first+b:first):first-b>0?first-b:first}/${d}`];
      const prompt=pick(r,[0,1])
        ? `A ribbon is ${first}/${d} m long. ${b}/${d} m ${subtract?'is cut off':'is joined on'}. How long is the ribbon now?`
        : `A jug has ${first}/${d} litre of juice. ${b}/${d} litre ${subtract?'is poured out':'is poured in'}. How much juice is in the jug now?`;
      return choice(prompt,`${answer}/${d}`,wrong,r);
    }
    const a=int(r,2,d), b=int(r,1,d-1), top=subtract?a+b:a, answer=subtract?a:a+b, sign=subtract?'−':'+';
    if(l===3) return build('Build the fraction calculation.',[`${top}/${d}`,sign,`${b}/${d}`,'=',`${answer}/${d}`],r);
    if(l===2) {
      const options=[b,b+1,b>1?b-1:b+2].map(x=>`${x}/${d}`);
      return choice(`Find the missing fraction: ${top}/${d} ${sign} ? = ${answer}/${d}`,options[0],options.slice(1),r,{hint:subtract?'How many were taken away?':'How many more were added?'});
    }
    return choice(`${top}/${d} ${sign} ${b}/${d} = ?`,`${answer}/${d}`,[`${answer+1}/${d}`,`${answer+2}/${d}`,subtract?`${top-b}/${d+d}`:`${answer}/${d+d}`],r,{rule:'Keep the denominator. Add or subtract the numerators.'});
  },
  decimal(l,r,i) {
    if(l===1) {
      const n=Math.min(9,2*i+1+int(r,0,1)), near=n===9?8:n+1;
      return choice(pick(r,[`Write ${n}/10 as a decimal.`,`Write ${n} ${n===1?'tenth':'tenths'} as a decimal.`]),tenth(n),[dec(n),String(n),tenth(near)],r,{visual:grid(10,10,allCells(10,10).slice(0,n*10)),rule:'Tenths go in the first place after the decimal point.'});
    }
    if(l===2) {
      const [t,u]=twoDigits(r,i), n=t*10+u, wrong=[dec(u*10+t),tenth(n),dec(n+10)];
      return i%2
        ? choice(`Which decimal is ${t} ${t===1?'tenth':'tenths'} and ${u} ${u===1?'hundredth':'hundredths'}?`,dec(n),wrong,r)
        : choice(`Write ${n}/100 as a decimal.`,dec(n),wrong,r,{visual:grid(10,10,allCells(10,10).slice(0,n))});
    }
    if(l===3) {
      const start=int(r,11,80), values=shuffle(Array.from({length:12},(_,k)=>start+k).filter(x=>x%10),r).slice(0,4);
      const asFraction=new Set(values.filter((_,k)=>k%2));
      return order('Order from smallest to largest.',values,r,x=>asFraction.has(x)?`${x}/100`:dec(x));
    }
    const n=band(r,i,6,99), thing=['leaf','pencil','ruler','scarf','stick'][i];
    return number(`A ${thing} is ${dec(n)} m long. How many hundredths of a metre is that?`,n);
  },
  quarters(l,r,i) {
    const q=int(r,1,3), frac=q===2?'1/2':`${q}/4`, answer=dec(q*25);
    const wrongFor=q=>q===2?['0.12','0.2','0.25']:[`0.${q}4`,`0.${q}`,q===1?'0.75':'0.25'];
    if(l===1) {
      // Five different views of the same three facts, so no two questions in a run match.
      const rule={rule:'1/4 = 0.25, 1/2 = 0.5 and 3/4 = 0.75.'};
      if(i===0) { const n=pick(r,[1,3]); return choice(`What decimal equals ${n}/4?`,dec(n*25),wrongFor(n),r,{visual:{type:'fraction',n,d:4},...rule}); }
      if(i===1) { const half=pick(r,[true,false]); return choice(`What decimal equals ${half?'1/2':'2/4'}?`,'0.5',wrongFor(2),r,{visual:{type:'fraction',n:half?1:2,d:half?2:4},...rule}); }
      if(i===2) return choice(`${frac} of this grid is coloured. What decimal is that?`,answer,wrongFor(q),r,{visual:grid(10,10,allCells(10,10).slice(0,q*25)),...rule});
      if(i===3) return choice(`Which fraction is the same as ${answer}?`,frac,q===2?['1/4','3/4','1/5']:[q===1?'3/4':'1/4','1/2',`${answer[2]}/10`],r,rule);
      return choice(`Which decimal equals ${q*25}/100?`,answer,wrongFor(q),r,rule);
    }
    if(l===2) {
      const w=int(r,1,9);
      if(i===0) return choice(`How much is ${frac} of £1, in pounds?`,money(q*25),wrongFor(q).map(x=>money(Math.round(Number(x)*100))),r);
      if(i===1) return choice(`What decimal equals ${w} ${frac}?`,`${w}${answer.slice(1)}`,wrongFor(q).map(x=>`${w}${x.slice(1)}`),r);
      if(i===2) return choice(`A plank is ${frac} m long. Write its length as a decimal.`,answer,wrongFor(q),r);
      if(i===3) return choice(`A bag of flour weighs ${frac} kg. Write its weight as a decimal.`,answer,wrongFor(q),r);
      return choice(`Which is the same as ${w}${answer.slice(1)}?`,`${w} ${frac}`,[`${w} ${q===2?'1/5':`${answer[2]}/10`}`,`${w+1} ${frac}`,`${w} ${q===2?'1/4':'1/2'}`],r);
    }
    if(l===3) {
      const families={0.25:['1/4','2/8','3/12','5/20','25/100'],0.75:['3/4','6/8','9/12','15/20','75/100']};
      // The halves are chosen by question number, so no two sorts in a run share every card.
      const halves=['1/2','2/4','3/6','4/8','5/10','6/12','10/20','50/100'];
      const cards=[...Object.entries(families).flatMap(([bin,labels])=>shuffle(labels,r).slice(0,2).map(label=>[label,bin])),[halves[i],'0.5'],[halves[i+3],'0.5']];
      return sort('Match each fraction to its decimal.',['0.25','0.5','0.75'],shuffle(cards,r));
    }
    const w=int(r,1,4), p=int(r,2,8);
    return [
      ()=>number(`${frac} of £1 is how many pence?`,q*25),
      ()=>number(`A ribbon is ${w} ${frac} m long. How many centimetres is that?`,w*100+q*25),
      ()=>number(`What is ${frac} of £${p}, in pence?`,p*q*25),
      ()=>number(`A jug holds ${w}${answer.slice(1)} litres. How many millilitres is that?`,w*1000+q*250),
      ()=>number(`A bag of apples weighs ${frac} kg. How many grams is that?`,q*250),
    ][i]();
  },
  decimalDivide(l,r,i) {
    if(l===3) {
      // Mix ÷ 10 and ÷ 100 so the order of the answers is not the order of the starting numbers.
      let tens, hundreds, guard=0;
      do {
        tens=shuffle([1,2,3,4,5,6,7,8,9],r).slice(0,2);
        hundreds=shuffle(Array.from({length:89},(_,k)=>k+11).filter(x=>x%10),r).slice(0,2);
        guard++;
      } while(guard<50 && (new Set([...tens.map(a=>a*10),...hundreds]).size<4 || hundreds.every(h=>tens.every(t=>h>t*10)) || hundreds.every(h=>tens.every(t=>h<t*10))));
      const cards=[...tens.map(a=>({a,div:10,value:a*10})),...hundreds.map(a=>({a,div:100,value:a}))];
      const byValue=new Map(cards.map(c=>[c.value,c]));
      return order('Order the answers from smallest to largest.',cards.map(c=>c.value),r,v=>`${byValue.get(v).a} ÷ ${byValue.get(v).div}`);
    }
    if(l===2) {
      // Ask about one digit by its value: ones/tenths after ÷ 10, tenths/hundredths after ÷ 100.
      const [t,u]=twoDigits(r,i), a=t*10+u, plan=[[10,t,1],[10,u,10],[100,t,10],[100,u,100]][i<4?i:int(r,0,3)];
      const [divisor,digit,per]=plan, result=String(a/divisor), value=String(digit/per);
      return choice(`${a} ÷ ${divisor} = ${result}. What is the value of the ${digit} in ${result}?`,value,[String(digit*10),String(digit),String(digit/10),String(digit/100)].filter(x=>x!==value).slice(0,3),r);
    }
    const a=band(r,i,1,99), divisor=i%2?100:10, other=divisor===10?100:10;
    if(l===4) return i%2
      ? number(`${a} metres of rope is cut into 100 equal pieces. How many centimetres long is each piece?`,a)
      : number(`£${a} is shared equally between 10 friends. How many pence does each friend get?`,a*10);
    return choice(`${a} ÷ ${divisor} = ?`,String(a/divisor),[String(a/other),String(a*10),String(a)],r,{rule:'÷ 10 moves digits one place right; ÷ 100 moves them two places right.'});
  },
  decimalRound(l,r,i) {
    if(l===2) {
      const k=2*i+2+int(r,0,1), right=pick(r,[`${k-1}.${int(r,5,9)}`,`${k}.${int(r,1,4)}`]);
      return choice(`Which number rounds to ${k}?`,right,[`${k-1}.${int(r,1,4)}`,`${k}.${int(r,5,9)}`,`${k+1}.${int(r,1,4)}`],r,{hint:`It must be between ${k-1}.5 and ${k}.4.`});
    }
    if(l===3) {
      const k=int(r,2,9), up=()=>int(r,5,9), down=()=>int(r,1,4);
      const cards=[[`${k-1}.${up()}`,String(k)],[`${k}.${down()}`,String(k)],[`${k}.5`,String(k+1)],[`${k}.${int(r,6,9)}`,String(k+1)],[`${k+1}.${down()}`,String(k+1)]];
      return sort('Sort by the nearest whole number.',[String(k),String(k+1)],shuffle(cards,r));
    }
    const tenths=band(r,i,11,99-(99-11+1)%5);
    const x=tenths%10===0?tenths+1:tenths, value=tenth(x), answer=Math.round(x/10);
    if(l===4) {
      const story=[`A rope is ${value} m long. Round its length to the nearest whole metre.`,`A puppy weighs ${value} kg. Round its weight to the nearest whole kilogram.`,`A bottle holds ${value} litres. Round this to the nearest whole litre.`,`A walk is ${value} km long. Round it to the nearest whole kilometre.`,`A plank is ${value} m long. Round its length to the nearest whole metre.`][i];
      return number(story,answer);
    }
    return number(`Round ${value} to the nearest whole number.`,answer,{rule:'Look at the tenths digit: 5 or more rounds up.'});
  },
  decimalCompare(l,r,i) {
    if(l===1) {
      const w=2*i+int(r,0,1), a=int(r,1,9);
      let b=int(r,1,8);
      if(b>=a) b+=1;
      const left=`${w}.${a}`, right=`${w}.${b}`;
      return choice(`Which sign makes ${left} ___ ${right} true?`,a<b?'<':'>',['<','>','='].filter(s=>s!==(a<b?'<':'>')),r,{rule:'Compare the ones, then the tenths. The bigger tenths digit is the bigger number.'});
    }
    const raw=band(r,i,11,95), n=raw%10?raw:raw+1;
    if(l===2) {
      // Compare a decimal with a fraction in hundredths: change one so both look the same.
      const other=pick(r,[n,n+int(r,1,4),n-int(r,1,4)]), answer=n<other?'<':n>other?'>':'=';
      return choice(`Which sign makes ${dec(n)} ___ ${other}/100 true?`,answer,['<','>','='].filter(s=>s!==answer),r,{hint:`Write ${dec(n)} as hundredths first.`});
    }
    if(l===3) {
      const start=int(r,11,80), values=shuffle(Array.from({length:14},(_,k)=>start+k).filter(x=>x%10),r).slice(0,4);
      return order('Order the decimals from smallest to largest.',values,r,dec);
    }
    let m=n+int(r,2,9);
    if(m%10===0) m+=1;
    const a=n%10===0?n+1:n;
    return number(`Two ribbons measure ${dec(a)} m and ${dec(m)} m. How many hundredths of a metre longer is the second?`,m-a);
  },
  decimalProblems(l,r,i) {
    const paid=pick(r,[500,1000]);
    if(l===1) {
      const price=band(r,i,101,495);
      return number(`A book costs ${money(price)}. You pay with £5. How much change do you get, in pence?`,500-price,{rule:'£5 is 500p. Write the price in pence, then subtract.'});
    }
    if(l===2) {
      // Fraction of a length with real decimals: half or a quarter, answered in centimetres.
      const quarter=i%2===1, step=quarter?4:2, cm=band(r,i,26,325);
      let length=cm-cm%step;
      if(length%10===0) length+=step;
      return quarter
        ? number(`A ribbon is ${dec(length)} m long. A quarter of it is used. How many centimetres are used?`,length/4)
        : number(`A ribbon is ${dec(length)} m long. Half of it is used. How many centimetres are left?`,length/2);
    }
    const items=[['pen','pad'],['drink','sandwich'],['comic','pencil case'],['ball','kite'],['cake','juice']][i];
    const notRound=p=>p%100?p:p+5;
    if(l===3) {
      // A different focus from level 1: add two prices to find a total.
      const first=notRound(band(r,i,105,395));
      let second=notRound(int(r,105,395));
      if(second===first) second+=1;
      return build('Build the calculation for the total cost in pence.',[String(first),'+',String(second),'=',String(first+second)],r,{text:`A ${items[0]} costs ${money(first)} and a ${items[1]} costs ${money(second)}.`});
    }
    if(i%2) {
      // Both lengths are real decimals (never whole metres or whole tenths).
      let length=band(r,i,201,495);
      if(length%10===0) length+=1;
      let share=int(r,25,Math.floor((length-105)/2)), cut=length-2*share;
      if(cut%10===0) { share-=1; cut+=2; }
      return number(`A ribbon is ${dec(length)} m long. ${dec(cut)} m is cut off. The rest is shared equally between 2 friends. How many centimetres does each friend get?`,share);
    }
    const first=notRound(band(r,i,105,paid===500?290:395)), second=notRound(int(r,105,Math.min(395,paid-first-10)));
    return number(`A ${items[0]} costs ${money(first)} and a ${items[1]} costs ${money(second)}. You pay with a £${paid/100} note. How much change do you get, in pence?`,paid-first-second);
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  equivalent: ['Find the equal fraction.','Fill the missing number.','Shade an equal fraction.','Match a friend\'s fraction.'],
  hundredths: ['Count up in hundredths.','Count down in hundredths.','Order hundredths.','Add more hundredths.'],
  fractionSets: ['Find a unit fraction.','Find a non-unit fraction.','Build the fraction calculation.','Solve a fraction story.'],
  fractionCalc: ['Add or subtract the tops.','Find the missing fraction.','Build a fraction sum.','Solve a ribbon or jug problem.'],
  decimal: ['Write tenths as decimals.','Write hundredths as decimals.','Order fractions and decimals.','Metres as hundredths.'],
  quarters: ['Learn the key decimals.','Spot quarters and halves.','Match fraction families.','Change units with quarters.'],
  decimalDivide: ['Divide by 10 or 100.','Find the value of a digit.','Order the mixed answers.','Share money and rope.'],
  decimalRound: ['Round to the nearest whole.','Find a number that rounds.','Sort by rounding.','Round a measurement.'],
  decimalCompare: ['Compare tenths with a sign.','Compare decimals and hundredths.','Order decimals.','Find the difference.'],
  decimalProblems: ['Work out change in pence.','Use part of a ribbon.','Build the total cost.','Solve a two-step problem.'],
};
