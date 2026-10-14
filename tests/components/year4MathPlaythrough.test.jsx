import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Year4MathGame from '../../src/pages/skills/math/challenges/year4/Year4MathGame';
import { buildYear4Math, TOPIC_KEYS } from '../../src/data/challenges/year4Math/questions';

vi.mock('../../src/utils/speech',()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async()=>{},isNarrationSupported:()=>false}));
vi.mock('../../src/components/celebration/sound/player',async original=>({...await original(),playCue:()=>()=>{}}));
vi.mock('../../src/components/celebration/fx/effects',()=>({playEffect:()=>{}}));
// jsdom has no layout for drag collision detection. This adapter exercises
// the same reorder callback; physical dragging still needs a real browser.
vi.mock('../../src/components/challenge/DragToOrder',()=>({default:({items,onReorder,disabled})=><div role="group" aria-label="Reorder adapter">{items.map(item=><button key={item.id} disabled={disabled} onClick={()=>onReorder([item,...items.filter(other=>other.id!==item.id)])}>Move {item.id} first</button>)}</div>}));

function solve(q,container) {
  if(q.interaction==='plot') {
    fireEvent.click(screen.getByRole('button',{name:`Plot ${q.answer}`}));
  } else if(q.interaction==='reflection') {
    // Work from the rendered source squares, not the authored answer map.
    const group=screen.getByRole('group',{name:'Reflection grid'});
    const horizontal=group.classList.contains('is-horizontal');
    for(const square of [...group.children].filter(node=>node.tagName==='SPAN'&&node.classList.contains('is-filled'))){
      const [,row,col]=/Row (\d+), column (\d+)/.exec(square.getAttribute('aria-label'));
      const target=horizontal?`Row ${7-Number(row)}, column ${col}`:`Row ${row}, column ${7-Number(col)}`;
      fireEvent.click(within(group).getByRole('button',{name:target}));
    }
  } else if(q.interaction==='chartBuild') {
    for(const row of within(screen.getByRole('table')).getAllByRole('row').slice(1)){
      const label=within(row).getByRole('rowheader').textContent;
      const target=Number(within(row).getByRole('cell').textContent);
      const raise=screen.getByRole('button',{name:`Raise the ${label} bar`});
      act(()=>{for(let value=0;value<target;value+=q.chart.step)fireEvent.click(raise);});
    }
  } else if(q.kind==='choice') {
    fireEvent.click(screen.getByRole('button',{name:String(q.answer),exact:true}));
  } else if(q.kind==='number'||q.kind==='chart') {
    fireEvent.change(screen.getByRole('textbox'),{target:{value:String(q.answer)}});
  } else if(q.kind==='type') {
    act(()=>{for(const letter of q.answer)fireEvent.keyDown(window,{key:letter});});
  } else if(q.kind==='build') {
    const tray=screen.getByRole('group',{name:'Tiles to use'});
    for(const label of q.letters?[...q.answer]:q.answer.split(' ')){
      const tile=within(tray).getAllByRole('button').find(button=>!button.disabled&&button.textContent===label);
      expect(tile,`Tile ${label}`).toBeTruthy();
      fireEvent.click(tile);
    }
  } else if(q.kind==='sort') {
    for(const card of q.cards){
      fireEvent.click(within(screen.getByRole('group',{name:'Cards to sort'})).getByRole('button',{name:card.label,exact:true}));
      const label=q.bins.find(bin=>bin.id===card.bin).label;
      fireEvent.click(screen.getByRole('button',{name:label,exact:true}));
    }
  } else if(q.kind==='order') {
    for(const id of [...q.answer].reverse())fireEvent.click(screen.getByRole('button',{name:`Move ${id} first`}));
  } else if(q.kind==='sequence') {
    const gaps=container.querySelectorAll('button.number-cell.gap');
    for(const [i,index] of q.gaps.entries()){
      fireEvent.click(gaps[i]);
      const keypad=container.querySelector('.keypad');
      act(()=>{for(const digit of String(q.terms[index]))fireEvent.click(within(keypad).getByRole('button',{name:digit,exact:true}));});
    }
  } else if(q.kind==='fraction') {
    for(let i=1;i<=q.answer;i++)fireEvent.click(screen.getByRole('button',{name:`Part ${i} of ${q.parts}`}));
  } else if(q.kind==='clock') {
    const values=container.querySelectorAll('.time-setter-value');
    const hours=(q.time.hour-Number(values[0].textContent)+12)%12;
    const minutes=(q.time.minute-Number(values[1].textContent)+60)%60;
    const hour=screen.getByRole('button',{name:'Hour forward'}),minute=screen.getByRole('button',{name:'1 minute forward'});
    act(()=>{for(let i=0;i<hours;i++)fireEvent.click(hour);for(let i=0;i<minutes;i++)fireEvent.click(minute);});
  } else throw new Error(`Unhandled kind ${q.kind}`);
}

for(const topic of TOPIC_KEYS)it(`${topic}: all four complete five-question runs preserve the completion contract`,async()=>{
  vi.useFakeTimers();
  vi.spyOn(Math,'random').mockReturnValue(.375);
  try {
    for(let level=1;level<=4;level++){
      const complete=vi.fn(),questions=buildYear4Math(topic,level,()=>.375);
      const {container}=render(<Year4MathGame topic={topic} level={level} onComplete={complete}/>);
      for(const q of questions){
        // Prompts may carry **bold** markup, which renders as split <strong> nodes,
        // so match the whole prompt paragraph's text. getByText also proves it is shown once.
        const shown=q.prompt.replace(/\*\*/g,'');
        expect(screen.getByText((_,el)=>el?.classList.contains('challenge-prompt')&&el.textContent===shown)).toBeTruthy();
        expect(screen.getByRole('heading',{level:3}).textContent).not.toBe(shown);
        solve(q,container);
        const check=screen.getByRole('button',{name:'Check my answer'});
        expect(check.disabled,q.prompt).toBe(false);
        fireEvent.click(check);
        expect(check.disabled,`${topic} level ${level}: ${q.prompt}`).toBe(true);
        expect(complete).not.toHaveBeenCalled();
        await act(async()=>vi.advanceTimersByTime(1000));
        if(q!==questions[questions.length-1])expect(complete).not.toHaveBeenCalled();
      }
      expect(complete).toHaveBeenCalledTimes(1);
      expect(complete.mock.calls[0][0]).toHaveProperty('combos');
      fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
      await act(async()=>vi.advanceTimersByTime(1000));
      expect(complete).toHaveBeenCalledTimes(1);
      cleanup();
    }
  } finally {vi.useRealTimers();}
},20000);
