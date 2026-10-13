import { build, column, int, near, number, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
