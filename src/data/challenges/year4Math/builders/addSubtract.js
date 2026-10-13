import { build, column, int, near, number, shuffle } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
