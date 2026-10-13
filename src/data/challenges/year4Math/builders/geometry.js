import { allCells, choice, int, number, order, shuffle, sort } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
