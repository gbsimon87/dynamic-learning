import { allCells, build, choice, decimal, fractionWrong, grid, int, number, order, pick, sequence, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
