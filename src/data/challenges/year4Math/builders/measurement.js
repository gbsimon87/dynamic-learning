import { allCells, build, choice, decimal, grid, int, number, order, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
