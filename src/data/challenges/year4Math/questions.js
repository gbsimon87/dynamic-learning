// Pure Year 4 Maths banks. Every builder receives its random source.
// Boundaries and topic-to-statutory mappings: docs/curriculum/year-4-maths.md.
import { shuffle } from '../english/shared.js';

export const TITLES = ['Explore the rule', 'Find the pattern', 'Build and arrange', 'Solve a problem'];
const int = (rng, low, high) => low + Math.floor(rng() * (high - low + 1));
const pick = (rng, values) => values[int(rng, 0, values.length - 1)];
const choice = (prompt, answer, wrong, rng, extra = {}) => ({
  kind: 'choice', prompt, answer,
  options: shuffle([...new Set([answer, ...wrong])], rng), ...extra,
});
const number = (prompt, answer, extra = {}) => ({ kind: 'number', prompt, answer, maxDigits: 6, ...extra });
const near = (prompt, answer, rng, extra = {}) => choice(prompt, answer,
  [answer + 1, Math.max(0, answer - 1), answer + 10].filter(n => n !== answer), rng, extra);
const order = (prompt, values, rng, format = String, extra = {}) => {
  const sorted = [...new Set(values)].sort((a,b) => a-b).map((value,i) => ({ id: String(i), label: format(value), value }));
  let items = shuffle(sorted, rng);
  if (items.every((item,i) => item.id === sorted[i].id)) items = [...items.slice(1), items[0]];
  return { kind: 'order', prompt, items, answer: sorted.map(item => item.id), ...extra };
};
const build = (prompt, labels, rng, extra = {}) => ({ kind: 'build', prompt, rule: 'Use all the tiles.',
  tiles: shuffle(labels.map((label,i) => ({ id: String(i), label })), rng),
  answer: labels.join(' '), maths: labels.includes('=') ? { kind: 'equation' } : extra.maths, ...extra });
const sort = (prompt, bins, cards, extra = {}) => ({ kind: 'sort', prompt,
  bins: bins.map(id => ({ id, label: id })),
  cards: cards.map(([label,bin],i) => ({ id: String(i), label, bin })), ...extra });
const sequence = (start, step, prompt, extra = {}) => ({ kind: 'sequence', prompt,
  terms: Array.from({length:5},(_,i) => start+i*step), gaps:[2,4], maxDigits:6, ...extra });
const decimal = n => (n / 100).toFixed(2);
export function roman(n) {
  let result = '';
  for (const [value,symbol] of [[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
    while (n >= value) { result += symbol; n -= value; }
  }
  return result;
}
const column = (a,b,op) => ({ type:'column', a, b, op });
const fractionWrong = (n,d) => [`${n+1}/${d}`,`${n}/${d+1}`,`${n+2}/${d}`];
const grid = (width,height,cells) => ({type:'squares',width,height,cells});
const allCells = (w,h) => Array.from({length:w*h},(_,i) => [i%w,Math.floor(i/w)]);
const pointOptions = (x,y) => [`(${x}, ${y})`,`(${y}, ${x})`,`(${x+1}, ${y})`,`(${x}, ${y+1})`];
const position = (prompt,x,y,points = [],extra = {}) => ({kind:'choice',prompt, answer:`(${x}, ${y})`,
  options: [...new Set(pointOptions(x,y))], visual:{ type:'coordinates', points }, ...extra });
const plot = (prompt,x,y,points = [],extra = {}) => ({...position(prompt,x,y,points,extra),
  options: allCells(6,6).map(([a,b])=>`(${a}, ${b})`), interaction:'plot'});

const BUILDERS = {
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
  columns(l,r,i) {
    const subtract=i%2===1;
    const a=l===1?int(r,1,4)*1111:int(r,4000,7999), b=l===1?1111:int(r,1000,3999), answer=subtract?a-b:a+b;
    const visual=column(a,b,subtract?'−':'+');
    if(l===3) {
      const tiles=shuffle([...String(answer),String((answer%10+1)%10)].map((label,i)=>({id:String(i),label})),r);
      return {kind:'build',prompt:'Calculate the full answer. Place its digits from left to right.',tiles,answer:String(answer),letters:true,maths:{kind:'digits',value:answer},visual,hint:'Start calculating at the ones column, exchange when needed, then move left.'};
    }
    const prompt=l===4?`A stadium has ${a} seats. ${subtract?`${b} seats are empty. How many are occupied?`:`Another stand adds ${b} seats. How many seats altogether?`}`:'Calculate using the columns.';
    return number(prompt,answer,{visual,...(l===1?{rule:'Line up thousands, hundreds, tens and ones. Start with the ones column.'}:{}),hint:'Exchange 10 ones for 1 ten, or borrow a ten when subtracting. Continue left.'});
  },
  inverse(l,r,i) {
    const a=int(r,2000,6999), b=int(r,1000,1999), sum=a+b;
    if(l===1) return number(`Estimate ${a} + ${b} by rounding EACH number to the nearest 1000 first.`,Math.round(a/1000)*1000+Math.round(b/1000)*1000,{rule:'Round the inputs before adding.'});
    if(l===3) return build(`Build an inverse check for ${a} + ${b} = ${sum}.`,[String(sum),'−',String(b),'=',String(a)],r);
    if(l===4) return number(`Sam says ${a} + ${b} = ${sum+10}. Check by subtracting ${b}. What is ${sum+10} − ${b}?`,a+10,{hint:'Compare your result with the first number to decide whether Sam was right.'});
    return number(`Check ${a} + ${b} = ${sum}: what is ${sum} − ${i%2?b:a}?`,i%2?a:b);
  },
  addProblems(l,r) {
    const a=int(r,2000,6000), b=int(r,100,900), c=int(r,100,900);
    if(l===3) return build('Build the calculation: start with books, receive more, then lend some.',[String(a),'+',String(b),'−',String(c)],r,{text:`There are ${a} books. Receive ${b} more, then lend ${c}.`,maths:{kind:'value',value:a+b-c}});
    const prompt=`A library has ${a} books. It receives ${b} more, then lends ${c}. How many books remain?`;
    return l===1?near(prompt,a+b-c,r,{rule:'First add the books received, then subtract the books lent.'}):number(prompt,a+b-c);
  },
  tables(l,r,i) {
    const a=l===1?[6,7,9,11,12][i]:int(r,2,12), b=int(r,2,12), product=a*b;
    if(l===3) return sort('Match each fact to its answer.',[String(product),String(a)],[[`${a} × ${b}`,String(product)],[`${product} ÷ ${b}`,String(a)]]);
    if(l===4) return number(`${b} trays each hold ${a} cups. How many cups altogether?`,product);
    const p=l===2?`${product} ÷ ${a} = ?`:`${a} × ${b} = ?`;
    return l===1?near(p,product,r,{rule:'Multiplication and division are inverse operations.'}):number(p,b);
  },
  mental(l,r,i) {
    const a=int(r,2,9), b=int(r,2,9), c=int(r,2,5), scale=l>=2?100:10;
    if(l===3) return build('Build an equivalent calculation by grouping the easy pair.',[String(a),'×',`(${b}`,'×',`${c})`],r,{equation:`${a} × ${b} × ${c}`,maths:{kind:'value',value:a*b*c}});
    if(l===4) return number(`${a} boxes each hold ${b} packs of ${c} stickers. How many stickers?`,a*b*c);
    const cases=[number(`${a*b*scale} ÷ ${a} = ?`,b*scale),number(`${a*scale} × 1 = ?`,a*scale),number(`${a*scale} × 0 = ?`,0),number(`${a*scale} ÷ 1 = ?`,a*scale),number(`${a} × ${b} × ${c} = ?`,a*b*c)];
    return {...cases[i],...(l===1?{rule:'× 1 and ÷ 1 keep the number; × 0 makes zero. You may group factors.'}:{})};
  },
  factors(l,r) {
    const a=int(r,2,9), b=int(r,a+1,12), product=a*b;
    if(l===3) return sort(`Sort the pairs that make ${product}.`,['Factor pair','Not a factor pair'],[[`${a} × ${b}`,'Factor pair'],[`${b} × ${a}`,'Factor pair'],[`${a} × ${b+1}`,'Not a factor pair'],[`${a+1} × ${b}`,'Not a factor pair']]);
    const prompt=l===4?`${product} chairs go into rows of ${a}. How many rows?`:`${a} × ${b} = ${product}. What is ${b} × ${a}?`;
    return l===1?near(prompt,product,r,{rule:'A factor pair multiplies to the number. Swapping factors keeps the product.'}):number(l===2?`Complete the factor pair: ${a} × ? = ${product}.`:prompt,l===2||l===4?b:product);
  },
  written(l,r) {
    const a=l<=2?int(r,12,89):int(r,102,789), b=int(r,2,9), tens=Math.floor(a/10)*10, ones=a%10;
    const visual=column(a,b,'×');
    if(l===3) return build('Complete the partitioned multiplication.',[String(tens*b),'+',String(ones*b),'=',String(a*b)],r,{equation:`${a} × ${b} = (${tens} × ${b}) + (${ones} × ${b})`,visual});
    return number(l===4?`${b} school teams each collect ${a} tokens. How many tokens altogether?`:'Multiply using the written layout.',a*b,{visual,...(l===1?{rule:'Multiply the ones first, exchange if needed, then multiply the tens.'}:{})});
  },
  mulProblems(l,r,i) {
    const a=int(r,3,9), b=int(r,2,8), c=int(r,2,6);
    if(l===3) return build('Build the number of meal choices.',[String(a),'×',String(b),'=',String(a*b)],r,{text:`There are ${a} starters and ${b} main dishes. Choose one of each.`});
    const cases=[number(`${a} sandwich fillings can each go with ${b} types of bread. How many different sandwiches?`,a*b),number(`A ribbon is ${a} cm long. A second ribbon is ${b} times as long. How long is it in cm?`,a*b),number(`${b} packs each hold ${a*10+c} beads. There are ${c} extra beads. How many beads in all?`,b*(a*10+c)+c)];
    return {...cases[i%3],...(l===1?{rule:'For every first choice, count all the second choices.'}:{})};
  },
  equivalent(l,r) {
    const d=pick(r,[2,3,4,5]), n=int(r,1,d-1), factor=l===3?int(r,2,Math.floor(12/d)):int(r,2,4);
    if(l===3) return {kind:'fraction',mode:'shade',parts:d*factor,answer:n*factor,prompt:`Shade ${n}/${d} of this bar split into ${d*factor} parts.`};
    if(l===4) return number(`A strip has ${d*factor} equal sections. ${n}/${d} of the strip is coloured. How many sections are coloured?`,n*factor);
    return choice(`Which fraction equals ${n}/${d}?`,`${n*factor}/${d*factor}`,fractionWrong(n*factor,d*factor),r,{visual:{type:'fraction',n,d},...(l===1?{rule:'Multiply numerator and denominator by the same number.'}:{})});
  },
  hundredths(l,r) {
    const n=int(r,11,89);
    if(l===3) return order('Order from smallest to largest.',[n,n+1,n+5,n+10],r,x=>`${x}/100`);
    if(l===4) return number(`A strip has 100 equal squares. ${n} are coloured, then 3 more are coloured. How many hundredths are coloured?`,n+3);
    return sequence(l===1?n:n+4,l===1?1:-1,'Fill the numerators. Every fraction has denominator 100.',{captions:['/100','/100','/100','/100','/100'],...(l===1?{rule:'One hundredth is 1 of 100 equal parts. A tenth contains 10 hundredths.'}:{})});
  },
  fractionSets(l,r) {
    const d=pick(r,[3,4,5,8,10]), n=l===1?1:int(r,2,d-1), group=int(r,4,20), total=d*group;
    if(l===3) return build(`Build a calculation for ${n}/${d} of ${total}.`,[`(${total}`,'÷',`${d})`,'×',String(n),'=',String(group*n)],r);
    return number(l===4?`There are ${total} seedlings. ${n}/${d} are planted. How many are planted?`:`What is ${n}/${d} of ${total}?`,n*group,l===1?{rule:'Divide by the denominator to find one part.'}:{hint:'Find one part by dividing, then multiply by the numerator.'});
  },
  fractionCalc(l,r,i) {
    const d=pick(r,[4,5,6,8,10]), a=int(r,2,d), b=int(r,1,d-1), subtract=i%2===1, top=subtract?a+b:a, answer=subtract?a:a+b;
    if(l===3) return build('Build the fraction calculation.',[`${top}/${d}`,subtract?'−':'+',`${b}/${d}`,'=',`${answer}/${d}`],r);
    const prompt=l===4?`A ribbon is ${top}/${d} m long. ${subtract?`${b}/${d} m is cut off`:`Another ${b}/${d} m is joined on`}. How long is it now?`:`${top}/${d} ${subtract?'−':'+'} ${b}/${d} = ?`;
    if(l===4) return number(`${prompt} Give the numerator; the denominator stays ${d}.`,answer);
    return choice(prompt,`${answer}/${d}`,fractionWrong(answer,d),r,l===1?{rule:'Keep the denominator. Add or subtract the numerators.'}:{});
  },
  decimal(l,r) {
    const n=l===1?int(r,1,9)*10:int(r,1,99);
    if(l===3) return order('Order these decimals from smallest to largest.',[n,n+1,n+3,n+6],r,decimal);
    if(l===4) return number(`${decimal(n)} m is how many hundredths of a metre?`,n);
    const d=l===1?10:100, numerator=l===1?n/10:n;
    return choice(`Write ${numerator}/${d} as a decimal.`,decimal(n),[decimal(n+1),decimal(n+10),decimal(n*10)],r,{visual:grid(10,10,allCells(10,10).slice(0,n)),...(l===1?{rule:'Tenths use the first decimal place. Hundredths use the second.'}:{})});
  },
  quarters(l,r,i) {
    const n=[1,2,3,1,3][i], answer=n*25;
    if(l===3) { const factor=int(r,1,5); return sort('Match fractions to their decimal equivalents.',['0.25','0.50','0.75'],[[`${factor}/${4*factor}`,'0.25'],[`${2*factor}/${4*factor}`,'0.50'],[`${3*factor}/${4*factor}`,'0.75']]); }
    if(l===4) return number(`${n}/4 of £1 is how many pence?`,answer);
    return choice(`What decimal equals ${n===2?'1/2':`${n}/4`}?`,decimal(answer),['0.25','0.50','0.75','0.40'].filter(x=>x!==decimal(answer)),r,{visual:{type:'fraction',n,d:4},...(l===1?{rule:'1/4 = 0.25, 1/2 = 0.50 and 3/4 = 0.75.'}:{})});
  },
  decimalDivide(l,r,i) {
    const a=int(r,1,l===3?94:99), divisor=i%2?100:10, cents=a*(100/divisor);
    if(l===2 && i%2===0) {
      const digits=[Math.floor(cents/100),Math.floor(cents/10)%10,cents%10], index=i%3, value=digits[index]*[100,10,1][index];
      return choice(`After ${a} ÷ ${divisor}, the answer is ${decimal(cents)}. What is the value of its ${['ones','tenths','hundredths'][index]} digit?`,decimal(value),[decimal(value+1),decimal(value+10),decimal(value+100)],r,{visual:{type:'decimalPlace',digits}});
    }
    if(l===3) return order(`Order the answers after dividing each number by ${divisor}.`,[a,a+1,a+3,a+5],r,n=>`${n} ÷ ${divisor}`);
    if(l===4) return number(`${a} metres is shared into ${divisor} equal lengths. How many hundredths of a metre is each length?`,cents);
    return choice(`${a} ÷ ${divisor} = ?`,decimal(cents),[decimal(cents+1),decimal(cents+10),decimal(cents*10)],r,l===1?{rule:'÷ 10 moves digits one place right; ÷ 100 moves them two places right.'}:{});
  },
  decimalRound(l,r) {
    const tenths=int(r,11,89), answer=Math.round(tenths/10);
    if(l===3) return sort(`Sort by the nearest whole number.`,[String(answer),String(answer+1)],[[`${answer}.2`,String(answer)],[`${answer}.4`,String(answer)],[`${answer}.5`,String(answer+1)],[`${answer}.8`,String(answer+1)]]);
    return number(l===4?`A rope is ${(tenths/10).toFixed(1)} m long. Round its length to the nearest whole metre.`:`Round ${(tenths/10).toFixed(1)} to the nearest whole number.`,answer,l===1?{rule:'Look at the tenths digit: 5 or more rounds up.'}:{});
  },
  decimalCompare(l,r) {
    const n=int(r,11,89), m=n+int(r,1,8);
    if(l===3) return order('Order decimals from smallest to largest.',[n,m,m+2,m+5],r,decimal);
    if(l===4) return number(`Two ribbons measure ${decimal(n)} m and ${decimal(m)} m. How many hundredths of a metre longer is the second?`,m-n);
    const other=n+pick(r,[-1,0,1])*int(r,1,8), answer=n<other?'<':n>other?'>':'=';
    return choice(`Which sign makes ${decimal(n)} ___ ${decimal(other)} true?`,answer,['<','>','='].filter(sign=>sign!==answer),r,l===1?{rule:'Compare ones, then tenths, then hundredths.'}:{});
  },
  decimalProblems(l,r,i) {
    const price=int(r,101,399), paid=500, half=pick(r,[100,200,300,400]);
    if(l===3) return build('Build the change calculation in pence.',[String(paid),'−',String(price),'=',String(paid-price)],r,{text:`A book costs £${decimal(price)}. You pay £5.`});
    if(i%2) return number(`A ribbon is ${decimal(half)} m long. Half is used. How many centimetres remain?`,half/2,l===1?{rule:'1 metre is 100 centimetres. Divide the length by 2.'}:{});
    return number(`A book costs £${decimal(price)}. You pay £5. How much change do you get, in pence?`,paid-price,l===1?{rule:'£5 is 500p. Subtract the cost in pence.'}:{});
  },
  units(l,r,i) {
    const n=int(r,2,9), plans=[['km','m',1000],['m','cm',100],['kg','g',1000],['litres','ml',1000],['hours','minutes',60]], [from,to,factor]=plans[i];
    if(l===3) return sort('Match each measure to its equal measure.',[`${n*factor} ${to}`,`${(n+1)*factor} ${to}`],[[`${n} ${from}`,`${n*factor} ${to}`],[`${n+1} ${from}`,`${(n+1)*factor} ${to}`]]);
    const story=[`A runner completes ${n} laps of 1 km. How far is that in metres?`,`There are ${n} ribbons, each 1 m long. What is their total length in cm?`,`There are ${n} bags, each weighing 1 kg. What is their total mass in g?`,`There are ${n} bottles, each holding 1 litre. What is their total capacity in ml?`,`A club runs ${n} sessions, each lasting 1 hour. How many minutes is that altogether?`][i];
    return number(l===4?story:`Convert ${n} ${from} to ${to}.`,n*factor,l===1?{rule:`1 ${from==='litres'?'litre':from} = ${factor} ${to}.`}:{});
  },
  perimeter(l,r) {
    const w=int(r,4,9), h=int(r,3,7), cut=l>=2?{w:2,h:1}:null, answer=2*(w+h), visual={type:'perimeter',w,h,cut};
    if(l===3) return build('Build the perimeter by adding the outside lengths.',cut?[String(w),'+' ,String(h-1),'+','2','+','1','+',String(w-2),'+',String(h)]:[String(w),'+',String(h),'+',String(w),'+',String(h)],r,{visual,maths:{kind:'value',value:answer}});
    return number(l===4?'This garden fence follows every outside edge. How many metres of fencing are needed?':'Find the perimeter in cm.',answer,{visual,unit:l===4?'m':'cm',...(l===1?{rule:'Perimeter is the total length around the outside.'}:{hint:'Include the two edges of the notch. They replace lengths removed from the top and side.'})});
  },
  area(l,r) {
    const w=int(r,3,6),h=int(r,2,5),cells=allCells(w,h).filter(([x,y])=>l===1||!(x>=w-2&&y===0));
    if(l===3) return sort('Sort by area in square units.',[String(w*h),String(w*(h+1))],[[`${w} × ${h} rectangle`,String(w*h)],[`${w} × ${h+1} rectangle`,String(w*(h+1))]]);
    return number(l===4?'Each square is 1 square metre. What is the area of this floor in square metres?':'Each small square is 1 square unit. What is the area?',cells.length,{visual:grid(w,h,cells),...(l===1?{rule:'Count only the filled squares. Each represents 1 square unit.'}:{})});
  },
  money(l,r,i) {
    const a=int(r,101,399), b=int(r,101,399);
    if(l===3) return order('Order from cheapest to most expensive.',[a,a+5,a+20,a+100],r,n=>`£${decimal(n)}`);
    if(l===2) return number(`A toy costs £${decimal(a)} and a book costs £${decimal(b)}. Round EACH cost to the nearest pound first. Estimate the total in pence.`,(Math.round(a/100)+Math.round(b/100))*100);
    const prompt=i%2?`A jug holds ${a} ml. Add ${b} ml. How many ml now?`:`A toy costs £${decimal(a)} and a book costs £${decimal(b)}. What is the total in pence?`;
    return number(prompt,a+b,l===1?{rule:'Use the same unit before adding. £1 is 100p.'}:{});
  },
  time(l,r,i) {
    const hour=l===1?[12,1,11,6,9][i]:int(r,1,12), minute=int(r,0,l===1?11:59)*(l===1?5:1), pm=r()>.5, h24=(hour%12)+(pm?12:0), display=`${String(h24).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
    const visual={type:'clock',hour,minute};
    if(l===3) return {kind:'clock',mode:'set',time:{hour,minute},start:{hour:hour===12?1:12,minute:0},minuteStep:1,prompt:`Set the analogue clock to ${display}.`};
    if(l===4) return number(`A train leaves at ${display}. How many minutes after midnight is that?`,h24*60+minute);
    return choice(`The clock shows ${pm?'afternoon/evening':'morning'} time${hour===12&&minute===0?pm?' (noon)':' (midnight)':''}. Which 24-hour time matches?`,display,[`${String((h24+12)%24).padStart(2,'0')}:${String(minute).padStart(2,'0')}`,`${String(h24).padStart(2,'0')}:${String((minute+5)%60).padStart(2,'0')}`],r,{visual,...(l===1?{rule:'After noon, add 12 to hours 1–11. Midnight is 00:00; noon is 12:00.'}:{})});
  },
  timeProblems(l,r,i) {
    const n=int(r,2,9), [from,to,factor]=[['hours','minutes',60],['minutes','seconds',60],['years','months',12],['weeks','days',7],['hours','minutes',60]][i];
    if(l===3) { const start=int(r,1,4)*60; return order('Order these durations from shortest to longest.',[start,start+30,start+60,start+120],r,n=>n%60===0?`${n/60} hours`:`${n} minutes`); }
    return number(l===4?`A club meets for ${n} ${from} and ${factor===60?15:1} extra ${to}. How many ${to} altogether?`:`How many ${to} are in ${n} ${from}?`,n*factor+(l===4?(factor===60?15:1):0),l===1?{rule:`1 ${from.slice(0,-1)} = ${factor} ${to}.`}:{});
  },
  shapes(l,r,i) {
    const plans=[['equilateral','Equilateral triangle','3 equal sides'],['isosceles','Isosceles triangle','exactly 2 equal sides'],['scalene','Scalene triangle','no equal sides'],['rhombus','Rhombus','4 equal sides and no right angles'],['trapezium','Trapezium','exactly 1 pair of parallel sides'],['parallelogram','Parallelogram','2 pairs of parallel sides, no right angles and unequal adjacent sides'],['rectangle','Rectangle','4 right angles and unequal adjacent sides'],['square','Square','4 equal sides and 4 right angles']];
    const [shape,answer,property]=plans[(i+int(r,0,3))%plans.length];
    if(l===3) return sort('Classify by number of sides.',['Triangle','Quadrilateral'],shuffle([['Equilateral triangle','Triangle'],['Scalene triangle','Triangle'],['Isosceles triangle','Triangle']],r).slice(0,2).concat(shuffle([['Rhombus','Quadrilateral'],['Parallelogram','Quadrilateral'],['Square','Quadrilateral'],['Rectangle','Quadrilateral'],['Trapezium','Quadrilateral']],r).slice(0,2)));
    if(l===4) return {kind:'type',prompt:`A ${shape==='equilateral'||shape==='isosceles'||shape==='scalene'?'triangle':'quadrilateral'} has ${property}. Type its special name (one word).`,answer:shape,label:'Shape name',maxLength:14,apostrophe:false};
    return choice('Which name matches this shape?',answer,plans.filter(p=>p[1]!==answer).slice(0,3).map(p=>p[1]),r,{visual:{type:'shape',shape,property},...(l===1?{rule:'Use the side lengths and parallel sides to classify shapes.'}:{})});
  },
  angles(l,r,i) {
    const degrees=[30,60,90,120,150][i], answer=degrees<90?'Acute':degrees===90?'Right':'Obtuse';
    if(l===3) { const values=[int(r,20,40),int(r,50,80),int(r,100,130),int(r,140,180)]; return order('Order angles from smallest to largest.',values,r,n=>`${n}°`,{visual:{type:'angleSet',values}}); }
    if(l===4) return sort('Classify the angles.',['Acute','Right','Obtuse'],[[`${int(r,10,80)}°`,'Acute'],['90°','Right'],[`${int(r,100,170)}°`,'Obtuse']]);
    return choice('Classify this angle.',answer,['Acute','Right','Obtuse'].filter(x=>x!==answer),r,{visual:{type:'angle',degrees},...(l===1?{rule:'Acute is smaller than a right angle. Obtuse is bigger than a right angle and smaller than 180°.'}:{})});
  },
  symmetry(l,r,i) {
    const [shape,answer]=[['rectangle',2],['square',4],['equilateral',3],['parallelogram',0],['isosceles',1]][i];
    if(l===3) { const cards=shuffle([['Parallelogram','0'],['Isosceles triangle','1'],['Rectangle','2'],['Equilateral triangle','3'],['Square','4']],r).slice(0,3); return sort('Sort by number of lines of symmetry.',cards.map(([,bin])=>bin),cards); }
    return number(l===4?'This shape is a badge. How many lines divide it into matching reflected halves?':'How many lines of symmetry does this shape have?',answer,{visual:{type:'shape',shape,rotate:i%2?25:0},...(l===1?{rule:'A line of symmetry is a fold where both halves match exactly.'}:{})});
  },
  reflect(l,r) {
    const horizontal=l===2||l===4, cells=allCells(3,3).filter(()=>r()>.5);
    if(!cells.length) cells.push([0,0]);
    if(cells.length===9) cells.pop();
    const originals=cells;
    const targets=cells.map(([x,y])=>horizontal?[x,5-y]:[5-x,y]);
    const width=horizontal?3:6,height=horizontal?6:3;
    const editable=allCells(width,height).filter(([x,y])=>horizontal?y>=3:x>=3);
    return sort(l===4?'Complete this reflected tile pattern. Tap squares to colour or clear them.':'Complete the reflection across the dashed line. Tap the matching squares.', ['Coloured','Empty'],editable.map(([x,y])=>[`${x},${y}`,targets.some(([a,b])=>a===x&&b===y)?'Coloured':'Empty']),{interaction:'reflection',visual:{type:'reflection',width,height,cells:originals,horizontal},...(l===1?{rule:'Match each square at the same distance on the other side of the line.'}:{hint:'Count the squares between each coloured square and the mirror line.'})});
  },
  coordinates(l,r) {
    const x=int(r,0,5),y=int(r,0,5);
    if(l===3||l===4) return plot(l===4?`Place the treasure at (${x}, ${y}).`:`Plot (${x}, ${y}) on the grid.`,x,y);
    return position('What are the coordinates of A?',x,y,[{x,y,label:'A'}],l===1?{rule:'Read x across first, then y up. Write (x, y).'}:{});
  },
  translation(l,r) {
    const x=int(r,1,3),y=int(r,1,3),dx=pick(r,[-1,1,2]),dy=pick(r,[-1,1,2]);
    const prompt=`Move A ${Math.abs(dx)} ${dx>0?'right':'left'} and ${Math.abs(dy)} ${dy>0?'up':'down'}. ${l>=3?'Plot':'Choose'} its new position.`;
    return l>=3?plot(prompt,x+dx,y+dy,[{x,y,label:'A'}]):position(prompt,x+dx,y+dy,[{x,y,label:'A'}],l===1?{rule:'Right increases x; left decreases x. Up increases y; down decreases y.'}:{});
  },
  polygon(l,r) {
    const x=int(r,1,2),y=int(r,1,2),w=int(r,2,3),h=int(r,2,3),points=[{x,y,label:'A'},{x:x+w,y,label:'B'},{x:x+w,y:y+h,label:'C'}];
    return l>=3?plot('Plot D to complete rectangle ABCD.',x,y+h,points,{visual:{type:'coordinates',points,join:true}}):position('Which coordinates complete rectangle ABCD?',x,y+h,points,{visual:{type:'coordinates',points,join:true},...(l===1?{rule:'Opposite sides of a rectangle are equal and parallel.'}:{})});
  },
  graphs(l,r) {
    const base=int(r,1,4)*5, values=[base,base+int(r,1,2)*5,base+int(r,3,6)*5,base+int(r,1,2)*5], labels=['09:00','10:00','11:00','12:00'];
    if(l===3) { const rows=['Monday','Tuesday','Wednesday'].map((label,i)=>({label,value:values[i]})); return sort('Build a bar chart to show the visitor counts in this table.',rows.map(row=>String(row.value)),rows.map(row=>[row.label,String(row.value)]),{interaction:'chartBuild',chart:{rows,step:5},visual:{type:'table',rows}}); }
    if(l===1) return {kind:'chart',prompt:'How many visitors came on Tuesday?',chart:{type:'bar',step:5,rows:['Monday','Tuesday','Wednesday','Thursday'].map((label,i)=>({label,value:values[i]}))},ask:{op:'value',label:'Tuesday'},answer:values[1],maxDigits:6,rule:'Read the bar against the scale. Each scale step is 5 visitors.'};
    return number(l===4?'How many degrees did the temperature rise between 09:00 and 11:00?':'Read the temperature at 11:00 in °C.',l===4?values[2]-values[0]:values[2],{visual:{type:'line',values,labels,unit:'Temperature (°C)'},hint:'Follow the time up to the line, then across to the numbered scale.'});
  },
  data(l,r,i) {
    const a=int(r,2,7)*5,b=a+int(r,1,4)*5,c=b+int(r,1,4)*5,rows=[{label:'Oak',value:a},{label:'Pine',value:b},{label:'Birch',value:c}];
    if(l===3) return order('Order the trees from fewest to most.',[a,b,c],r,n=>rows.find(row=>row.value===n).label,{visual:{type:'table',rows}});
    const chart={type:l===2?'pictogram':'bar',rows,step:5,ratio:5,symbol:'🌳',unit:'trees'};
    const sum=i%2===0,answer=sum?a+b+c:c-a,ask=sum?{op:'total'}:{op:'difference',labels:['Birch','Oak']};
    return {kind:'chart',chart,ask,answer,maxDigits:6,prompt:sum?'How many trees altogether?':'How many more Birch trees than Oak trees?',...(l===1?{rule:'Read the scale, then add the counts or subtract to compare.'}:{})};
  },
};

export const TOPIC_KEYS = Object.keys(BUILDERS);
export function buildYear4Math(topic, level, rng = Math.random) {
  if(!Object.hasOwn(BUILDERS,topic)) throw new RangeError(`Unknown Year 4 Maths topic: ${topic}`);
  if(!Number.isInteger(level)||level<1||level>4) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffle(Array.from({length:5},(_,i)=>BUILDERS[topic](level,rng,i)),rng);
}
