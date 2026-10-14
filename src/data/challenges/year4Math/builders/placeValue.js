import { build, choice, int, near, number, order, pick, roman, sequence, shuffle, sort } from '../kit.js';

/**
 * A whole number from the i-th of five equal bands of [low, high], so the five
 * questions in one run (index 0–4) never repeat a number.
 */
const band = (r, i, low, high) => {
  const size = Math.floor((high - low + 1) / 5);
  return int(r, low + i * size, low + (i + 1) * size - 1);
};
const STEPS = [6, 7, 9, 25, 1000];
const TOWNS = ['Ashby', 'Brookfield', 'Carlton', 'Dunmore', 'Elmwood', 'Fairford'];
const lineValues = (low, high) => Array.from({length: high - low + 1}, (_, i) => low + i);
const degrees = n => `${n} ${Math.abs(n) === 1 ? 'degree' : 'degrees'}`;
const minus = n => String(n).replace('-', '−');
/** "1 thousand", "3 thousands", "0 ones": the count with its place name, singular when it is 1. */
const places = (n, name) => `${n} ${n === 1 ? name : `${name}s`}`;

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  count(l,r,i) {
    const step = STEPS[i];
    if (l===1) return sequence(step*int(r,0,6),step,'Fill the missing numbers.',{rule:`Add ${step} at each jump.`});
    if (l===2) {
      const q = sequence(step*int(r,2,12),step,'Find the rule, then fill the gaps.',{gaps:pick(r,[[1,3],[2,4],[1,4],[0,3]])});
      return pick(r,[true,false]) ? {...q, terms:[...q.terms].reverse()} : q;
    }
    if (l===3) {
      const k=int(r,1,6);
      return order(`Put these multiples of ${step} in increasing order.`,[k,k+1,k+3,k+int(r,5,7)].map(m=>m*step),r);
    }
    const start=step*int(r,1,8), jumps=int(r,3,6);
    const story=pick(r,[`A frog starts on ${start}. It jumps forward ${step} each time. Where does it land after ${jumps} jumps?`,`A counter starts at ${start}. It moves on ${step} each turn. Where is it after ${jumps} turns?`]);
    return number(story,start+jumps*step);
  },
  more(l,r) {
    const n=int(r,2,8)*1000+int(r,0,999), sign=pick(r,[-1,1]), answer=n+sign*1000;
    if(l===3) return order('Put these numbers in increasing order.',[n-1000,n,n+1000,n+2000],r);
    const prompt=l===4?`A library has ${n} books. It ${sign===1?'receives':'lends'} 1000 books. How many books are there now?`:`What is 1000 ${sign===1?'more':'less'} than ${n}?`;
    // Near-misses: the wrong way, the hundreds digit changed instead, or 100 out.
    return l===1?choice(prompt,answer,[n-sign*1000,n+sign*100,answer+100*pick(r,[-1,1])],r,{rule:'Change the thousands digit by 1.'}):number(prompt,answer);
  },
  negative(l,r,i) {
    const visual={type:'numberLine',values:lineValues(-6,6)};
    if(l===1) {
      // Count on or back across zero, staying on the −6 to 6 line. Index fixes the step so no two match.
      const step=i+2, back=pick(r,[true,false]);
      const start=back?int(r,Math.max(1,step-6),Math.min(step-1,6)):int(r,Math.max(-6,1-step),Math.min(-1,6-step));
      const answer=back?start-step:start+step;
      const wrongWay=back?start+step:start-step;
      return choice(`Count ${back?'back':'on'} ${step} from ${minus(start)}. Where do you land?`,minus(answer),[answer-1,answer+1,wrongWay].filter(n=>Math.abs(n)<=12).map(minus),r,
        {visual,rule:'Counting back goes left past 0 to −1, −2 and so on. Counting on goes right.'});
    }
    if(l===2) {
      if(i%2===0) {
        const low=-(i/2+1+int(r,0,1)*3), high=int(r,1,6);
        return number(`On a number line, how many steps is it from ${minus(low)} to ${high}?`,high-low,{visual});
      }
      // Keep both the start and the landing number on the −6 to 6 line.
      const step=i===1?int(r,3,5):int(r,6,9), land=int(r,Math.max(-6,1-step),Math.min(-1,6-step)), start=land+step;
      return number(`Bix counted back ${step} and landed on ${minus(land)}. Which number did Bix start on?`,start,{visual});
    }
    if(l===3) {
      // Three different warmer values, drawn without a retry loop so any random source terminates.
      const coldest=-(i*2+1+int(r,0,1)), warmer=shuffle(lineValues(coldest+1,10),r).slice(0,3);
      return order('Order the temperatures from coldest to warmest.',[coldest,...warmer],r,n=>`${minus(n)}°C`);
    }
    const colder=i%2===0, step=i+3;
    const start=colder?int(r,1,step-1):-int(r,1,step-1), answer=colder?start-step:start+step;
    const prompt=colder?`It is ${start}°C in the morning. By night it is ${degrees(step)} colder. What is the temperature now?`
      :`It is ${minus(start)}°C at dawn. By lunchtime it is ${degrees(step)} warmer. What is the temperature now?`;
    const wrongWay=colder?start+step:start-step;
    return choice(prompt,`${minus(answer)}°C`,[answer-1,answer+1,wrongWay,-answer].filter(n=>n!==answer).map(n=>`${minus(n)}°C`),r);
  },
  place(l,r) {
    const digits=[int(r,1,9),int(r,0,9),int(r,0,9),int(r,0,9)], n=Number(digits.join('')), powers=[1000,100,10,1];
    // Ask about a non-zero digit so the options (the digit worth 1, 10, 100 or 1000) are all different.
    const index=pick(r,[0,1,2,3].filter(k=>digits[k]>0));
    const visual={type:'place',digits};
    if(l===3) return build('Build the expanded number.',digits.flatMap((d,i)=>i===0?[String(d*powers[i])]:['+',String(d*powers[i])]),r,{visual,maths:{kind:'value',value:n}});
    if(l===4) return number(`A number has ${places(digits[0],'thousand')}, ${places(digits[1],'hundred')}, ${places(digits[2],'ten')} and ${places(digits[3],'one')}. What is it?`,n);
    const p=`What is the value of the ${['thousands','hundreds','tens','ones'][index]} digit in ${n}?`;
    const value=digits[index]*powers[index];
    return l===1?choice(p,value,powers.map(pw=>digits[index]*pw).filter(v=>v!==value),r,{visual,rule:'Each place is worth 10 times the place to its right.'}):number(p,value);
  },
  compare(l,r,i) {
    if(l===1) {
      // Same thousands; they differ first in the hundreds or the tens.
      const t=band(r,i,1,9)%9+1, h=int(r,0,8), tens=int(r,0,8), o=int(r,0,9);
      const a=t*1000+h*100+tens*10+o;
      const b=pick(r,[true,false])?a+int(r,1,9-h)*100-int(r,0,tens)*10:a+int(r,1,9-tens)*10-int(r,0,o);
      const [x,y]=pick(r,[true,false])?[a,b]:[b,a];
      return choice(`Which is greater: ${x} or ${y}?`,Math.max(a,b),[Math.min(a,b)],r,{rule:'Compare thousands first, then hundreds, tens and ones.'});
    }
    if(l===2) {
      const n=band(r,i,1100,8800), m=n+pick(r,[-100,-10,0,10,100]), answer=n<m?'<':n>m?'>':'=';
      return choice(`Which sign makes ${n} ___ ${m} true?`,answer,['<','>','='].filter(sign=>sign!==answer),r);
    }
    const n=band(r,i,1001,8000);
    if(l===3) return order('Order from smallest to largest.',[n,n+int(r,1,9)*10,n+int(r,1,9)*100+5,n+int(r,1,2)*1000],r);
    const values=shuffle([n,n+int(r,1,9)*10+1,n+int(r,1,9)*100+2,n+1000+int(r,0,99)],r), towns=shuffle(TOWNS,r).slice(0,4);
    const list=towns.map((town,k)=>`${town} ${values[k]}`).join(', ');
    const ask=i%3;
    if(ask===2) return number(`Four towns have these populations: ${list}. How many more people live in the largest town than the smallest?`,Math.max(...values)-Math.min(...values));
    const target=ask===0?Math.max(...values):Math.min(...values);
    return choice(`Four towns have these populations: ${list}. Which town has the ${ask===0?'most':'fewest'} people?`,towns[values.indexOf(target)],towns,r);
  },
  represent(l,r,i) {
    if(l===1) {
      const gap=pick(r,[100,500,1000]), start=band(r,i,1,40)*100, n=start+gap/2;
      return choice('What number is marked halfway along this line?',n,[n-gap/4,n+gap/4,start+gap/10],r,
        {visual:{type:'estimate',start,end:start+gap,point:n},rule:'The spaces on a number line are equal.'});
    }
    if(l===2) {
      // A true estimate: a point anywhere on a 0–10000 line, the nearest 1000 chosen from far-apart options.
      const thousands=Math.min(9,i*2+int(r,1,2)), point=thousands*1000+int(r,-3,3)*100, answer=thousands*1000;
      const wrong=[answer-4000,answer-2000,answer+2000,answer+4000].filter(v=>v>=0&&v<=10000);
      return choice('Which is the best estimate for the marked number?',answer,shuffle(wrong,r).slice(0,3),r,
        {visual:{type:'estimate',start:0,end:10000,point,showMiddle:true}});
    }
    if(l===3) {
      const n=band(r,i,11,85)*100;
      return order('Order the marked positions.',[n-int(r,1,9)*10,n,n+int(r,1,9)*100,n+1000],r);
    }
    const gap=pick(r,[200,400,600,1000]), start=band(r,i,5,45)*100;
    const story=pick(r,[`A ruler has marks at ${start} mm and ${start+gap} mm. What number is halfway between them?`,`A road has signs at ${start} m and ${start+gap} m. A bench is halfway between them. How many metres along is the bench?`]);
    return number(story,start+gap/2,{visual:{type:'estimate',start,end:start+gap,point:start+gap/2}});
  },
  round(l,r,i) {
    const unit=[10,100,1000,100,10][i], n=int(r,1000,8999), answer=Math.round(n/unit)*unit;
    if(l===3) return sort(`Sort by the nearest ${unit}.`,[String(answer),String(answer+unit)],[[String(answer+1),String(answer)],[String(answer-1),String(answer)],[String(answer+unit+1),String(answer+unit)],[String(answer+unit-1),String(answer+unit)]]);
    const prompt=l===4?`There are ${n} visitors. Round this to the nearest ${unit} for a report.`:`Round ${n} to the nearest ${unit}.`;
    return l===1?choice(prompt,answer,[answer+unit,answer-unit],r,{rule:'Halfway or above rounds up; below halfway rounds down.'}):number(prompt,answer);
  },
  placeProblems(l,r,i) {
    const a=band(r,i,1000,6999);
    if(l===1) {
      const b=int(r,1,9)*100, answer=a+b, exchanged=Math.floor(a/100)%10+b/100>=10;
      return choice(`A school has ${a} counters. It gets ${b} more. How many counters now?`,answer,[exchanged?answer-1000:answer+1000,a+b/10,answer+100],r,
        {rule:'Add the hundreds, then exchange 10 hundreds for 1 thousand if needed.'});
    }
    if(l===2) {
      // Regrouping: more than 9 of one place must be exchanged.
      const th=i+1, h=int(r,10,19), t=int(r,0,9), o=int(r,1,9);
      return number(`What number is ${places(th,'thousand')}, ${h} hundreds, ${places(t,'ten')} and ${places(o,'one')}?`,th*1000+h*100+t*10+o);
    }
    if(l===3) return build(`Build ${a} using its place values.`,[Math.floor(a/1000)*1000,Math.floor(a/100)%10*100,Math.floor(a/10)%10*10,a%10].flatMap((value,k)=>k===0?[String(value)]:['+',String(value)]),r,{maths:{kind:'value',value:a}});
    // Applied, multi-step: make the amount from its place-value packs, then change it.
    const [item,big,mid]=pick(r,[['stickers','boxes','packs'],['beads','tubs','bags'],['tickets','rolls','books']]);
    const th=i+3, h=int(r,1,9), ones=int(r,1,9), sold=int(r,1,th-1)*1000;
    return number(`A shop has ${th} ${big} of 1000 ${item}, ${h} ${h===1?mid.replace(/s$/,''):mid} of 100 and ${ones} loose ${ones===1?item.replace(/s$/,''):item}. It sells ${sold} ${item}. How many ${item} are left?`,th*1000+h*100+ones-sold);
  },
  roman(l,r,i) {
    const rule='Romans used I, V, X, L and C. They had no numeral for zero. Our digits use place value and zero as a placeholder.';
    if(l===1) {
      const n=pick(r,[[2,3,4,6,7,8],[9,11,12,14,15,19],[20,24,29,30,39],[40,45,49,50,55,60],[70,90,99,100]][i]);
      return near(`What number is ${roman(n)}?`,n,r,{rule});
    }
    if(l===3) {
      // Four different values from a window of 31, so there are never duplicates.
      const low=band(r,i,1,70);
      return order('Order these Roman numerals from smallest to largest.',shuffle(lineValues(low,low+30),r).slice(0,4),r,roman);
    }
    const n=band(r,i,1,100);
    if(l===4) return number(`${pick(r,['A clock face','An old stone','A book chapter','A film poster'])} shows ${roman(n)}. Write its value using our digits.`,n);
    return number(`Write ${roman(n)} using our digits.`,n);
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  count: ['Count on in multiples.', 'Find the counting rule.', 'Put multiples in order.', 'Solve a jumping problem.'],
  more: ['Change the thousands digit.', 'Type 1000 more or less.', 'Order numbers 1000 apart.', 'Solve a 1000 more story.'],
  negative: ['Count past zero.', 'Find a gap or a start.', 'Order temperatures.', 'Solve a temperature problem.'],
  place: ["Find a digit's value.", "Type a digit's value.", 'Split a number into its parts.', 'Make a number from its parts.'],
  compare: ['Find the greater number.', 'Choose the right sign.', 'Put big numbers in order.', 'Compare town populations.'],
  represent: ['Find the halfway mark.', 'Estimate on a number line.', 'Order numbers on a line.', 'Find the halfway point.'],
  round: ['Choose the rounded number.', 'Type the rounded number.', 'Sort by the nearest one.', 'Round for a report.'],
  placeProblems: ['Add hundreds to a number.', 'Exchange extra hundreds.', 'Build a number from place values.', 'Solve a shop stock problem.'],
  roman: ['Learn the Roman letters.', 'Read a Roman numeral.', 'Order Roman numerals.', 'Read clocks and old stones.'],
};
