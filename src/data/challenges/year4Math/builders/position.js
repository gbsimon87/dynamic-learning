import { int, pick, plot, position } from '../kit.js';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
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
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {};
