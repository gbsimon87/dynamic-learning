import { int, number, order, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
