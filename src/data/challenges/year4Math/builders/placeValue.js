import { build, choice, int, near, number, order, pick, roman, sequence, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  count(l,r,i) {
    const step = [6,7,9,25,1000][i], start = l===1 ? 0 : int(r,0,4)*step;
    if (l===3) return order('Put these multiples in increasing order.',[start,start+step,start+3*step,start+5*step],r);
    if (l===4) return number(`A counter starts at ${start}. It jumps forward ${step} each time. Where is it after 4 jumps?`,start+4*step);
    return sequence(start,step,'Fill the missing numbers.',l===1?{rule:`Add ${step} at each jump.`}:{});
  },
  more(l,r) {
    const n=int(r,2,8)*1000+int(r,0,999), sign=pick(r,[-1,1]), answer=n+sign*1000;
    if(l===3) return order('Put these numbers in increasing order.',[n-1000,n,n+1000,n+2000],r);
    const prompt=l===4?`A library has ${n} books. It ${sign===1?'receives':'lends'} 1000 books. How many books are there now?`:`What is 1000 ${sign===1?'more':'less'} than ${n}?`;
    return l===1?near(prompt,answer,r,{rule:'Change the thousands digit by 1.'}):number(prompt,answer);
  },
  negative(l,r) {
    const start=int(r,1,5), answer=start-6;
    if(l===3) return order('Order the temperatures from coldest to warmest.',[-start-2,-start,0,start+1],r,n=>`${n}°C`);
    const prompt=l===4?`It is ${start}°C. It gets 6 degrees colder. What is the new temperature?`:`Count back 6 from ${start}. Where do you land?`;
    return choice(prompt,answer,[answer-1,answer+1,start+6],r,{visual:{type:'numberLine',values:Array.from({length:13},(_,i)=>i-6)},...(l===1?{rule:'Counting back passes through 0, then −1, −2 and so on.'}:{})});
  },
  place(l,r) {
    const digits=[int(r,1,9),int(r,0,9),int(r,0,9),int(r,0,9)], n=Number(digits.join('')), index=int(r,0,3), powers=[1000,100,10,1];
    const visual={type:'place',digits};
    if(l===3) return build('Build the expanded number.',digits.flatMap((d,i)=>i===0?[String(d*powers[i])]:['+',String(d*powers[i])]),r,{visual,maths:{kind:'value',value:n}});
    if(l===4) return number(`A number has ${digits[0]} thousands, ${digits[1]} hundreds, ${digits[2]} tens and ${digits[3]} ones. What is it?`,n);
    const p=`What is the value of the ${['thousands','hundreds','tens','ones'][index]} digit in ${n}?`;
    return l===1?near(p,digits[index]*powers[index],r,{visual,rule:'Each place is worth 10 times the place to its right.'}):number(p,digits[index]*powers[index]);
  },
  compare(l,r) {
    const n=int(r,1001,8500), values=[n,n+10,n+100,n+1000];
    if(l===3) return order('Order from smallest to largest.',values,r);
    if(l===4) return number(`Four towns have ${values.join(', ')} people. How many people live in the largest town?`,n+1000);
    if(l===2) { const m=n+pick(r,[-10,0,10]), answer=n<m?'<':n>m?'>':'='; return choice(`Which sign makes ${n} ___ ${m} true?`,answer,['<','>','='].filter(sign=>sign!==answer),r); }
    return choice(`Which is greater: ${n} or ${n+100}?`,n+100,[n],r,{rule:'Compare thousands first, then hundreds, tens and ones.'});
  },
  represent(l,r) {
    const n=int(r,11,85)*100;
    if(l===3) return order('Order the marked positions.',[n-100,n,n+100,n+200],r);
    const visual={type:'estimate',start:n-100,end:n+100,point:n};
    if(l===4) return number(`A ruler has marks at ${n-100} and ${n+100} mm. What is the mark halfway between them?`,n,{visual});
    return l===1?near('What number is marked halfway along this line?',n,r,{visual,rule:'The spaces on a number line are equal.'}):number('Estimate the number at the middle mark.',n,{visual});
  },
  round(l,r,i) {
    const unit=[10,100,1000,100,10][i], n=int(r,1000,8999), answer=Math.round(n/unit)*unit;
    if(l===3) return sort(`Sort by the nearest ${unit}.`,[String(answer),String(answer+unit)],[[String(answer+1),String(answer)],[String(answer-1),String(answer)],[String(answer+unit+1),String(answer+unit)],[String(answer+unit-1),String(answer+unit)]]);
    const prompt=l===4?`There are ${n} visitors. Round this to the nearest ${unit} for a report.`:`Round ${n} to the nearest ${unit}.`;
    return l===1?choice(prompt,answer,[answer+unit,answer-unit],r,{rule:'Halfway or above rounds up; below halfway rounds down.'}):number(prompt,answer);
  },
  placeProblems(l,r) {
    const a=int(r,1000,6999), b=int(r,1,9)*100;
    if(l===3) return build(`Build ${a} using its place values.`,[Math.floor(a/1000)*1000,Math.floor(a/100)%10*100,Math.floor(a/10)%10*10,a%10].flatMap((value,i)=>i===0?[String(value)]:['+',String(value)]),r,{maths:{kind:'value',value:a}});
    const prompt=`A school has ${a} counters. It receives ${b} more. How many counters now?`;
    return l===1?near(prompt,a+b,r,{rule:'Add the hundreds, then exchange 10 hundreds for 1 thousand if needed.'}):number(prompt,a+b);
  },
  roman(l,r,i) {
    const n=l===1?[4,9,40,50,100][i]:int(r,1,100);
    const rule='Romans used I, V, X, L and C. They had no numeral for zero. Our digits use place value and zero as a placeholder.';
    if(l===3) return order('Order these Roman numerals from smallest to largest.',[n,Math.max(1,n-1),Math.min(100,n+2),Math.max(1,n-3)],r,roman);
    if(l===4) return number(`A clock or stone inscription shows ${roman(n)}. Write its value using our digits.`,n);
    return l===1?near(`What number is ${roman(n)}?`,n,r,{rule}):number(`Write ${roman(n)} using our digits.`,n);
  },
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
